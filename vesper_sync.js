/* ============================================================
 * vesper_sync.js — Sync opcional de progreso (racha + XP) a la nube.
 *
 * Las lecciones funcionan SIN cuenta (localStorage, vesper_progress.js).
 * Si el alumno inicia sesion (Firebase Auth, email+contrasena, verificado),
 * su progreso se espeja en Firestore (coleccion progress/{uid}) y se fusiona
 * entre dispositivos. Reutiliza window.VesperAuth (config + initFirebase).
 *
 * Servidor: documento self-scoped progress/{uid} en la base "teachermanuals".
 * REQUIERE publicar la regla progress/{uid} de _scripts/firestore.rules.
 * Sin esa regla (o sin verificar el correo) el sync degrada a solo-local.
 * ============================================================ */
(function () {
  "use strict";
  if (!window.VesperAuth || !window.VesperAuth.isConfigured) return; // sin Firebase -> solo local

  var VA = window.VesperAuth;
  var DB_ID = "teachermanuals";
  var projectId = VA.config.firebase.projectId;
  var authInst = null, currentUser = null, pushTimer = null;

  function fsBase(uid) {
    return "https://firestore.googleapis.com/v1/projects/" + projectId +
           "/databases/" + DB_ID + "/documents/progress/" + uid;
  }

  /* Estrellas por lección: viven aparte (vesper_path.js) pero viajan en el
     mismo documento para que el mapa se vea igual en todos los dispositivos. */
  var SCORE_KEY = "vesper_lesson_scores";
  function loadScores() { try { return JSON.parse(localStorage.getItem(SCORE_KEY) || "{}") || {}; } catch (e) { return {}; } }
  /* une puntuaciones remotas con las locales (gana la mejor) */
  function mergeScores(remote) {
    var s = loadScores(), changed = false;
    for (var k in (remote || {})) { if (typeof s[k] !== "number" || remote[k] > s[k]) { s[k] = remote[k]; changed = true; } }
    if (changed) { try { localStorage.setItem(SCORE_KEY, JSON.stringify(s)); } catch (e) {} }
  }

  /* ---- codificacion tipada de Firestore REST para nuestro estado ----
     OJO: el PATCH sin updateMask REEMPLAZA el documento entero; todo lo que
     no se escriba aquí se borra de la nube. Por eso van todos los campos. */
  function toFs(s) {
    s = s || {};
    function mapBool(o) { var f = {}; for (var k in o) { if (o[k]) f[k] = { booleanValue: true }; } return { mapValue: { fields: f } }; }
    function mapStr(o) { var f = {}; for (var k in o) { f[k] = { stringValue: String(o[k]) }; } return { mapValue: { fields: f } }; }
    function mapInt(o) { var f = {}; for (var k in o) { f[k] = { integerValue: String(Math.round(o[k] || 0)) }; } return { mapValue: { fields: f } }; }
    function mapBoss(o) {
      var f = {};
      for (var k in o) {
        var b = o[k] || {};
        f[k] = { mapValue: { fields: { pct: { integerValue: String(Math.round(b.pct || 0)) },
                                        date: b.date ? { stringValue: String(b.date) } : { nullValue: null } } } };
      }
      return { mapValue: { fields: f } };
    }
    return { fields: {
      xp: { integerValue: String(s.xp || 0) },
      streak: { integerValue: String(s.streak || 0) },
      shields: { integerValue: String(s.shields || 0) },
      lastDay: s.lastDay ? { stringValue: s.lastDay } : { nullValue: null },
      days: mapBool(s.days || {}),
      completed: mapStr(s.completed || {}),
      bosses: mapBoss(s.bosses || {}),            // jefes vencidos = mundos A2–C2 abiertos
      achievements: mapStr(s.achievements || {}),
      dayCounts: mapInt(s.dayCounts || {}),
      goalTarget: { integerValue: String(s.goalTarget || 0) },
      stats: mapInt(s.stats || {}),               // contadores de logros (perfectas, Forja, combo…)
      scores: mapInt(loadScores())
    } };
  }
  function fromFs(fields) {
    fields = fields || {};
    function mapOf(v) { return (v && v.mapValue && v.mapValue.fields) || {}; }
    function readBool(v) { var o = {}, f = mapOf(v); for (var k in f) { if (f[k].booleanValue) o[k] = true; } return o; }
    function readStr(v) { var o = {}, f = mapOf(v); for (var k in f) { o[k] = f[k].stringValue || ""; } return o; }
    function readInt(v) { var o = {}, f = mapOf(v); for (var k in f) { o[k] = parseInt(f[k].integerValue || "0", 10); } return o; }
    function readBoss(v) {
      var o = {}, f = mapOf(v);
      for (var k in f) { var b = mapOf(f[k]); o[k] = { pct: parseInt((b.pct || {}).integerValue || "0", 10), date: (b.date || {}).stringValue || null }; }
      return o;
    }
    return {
      xp: parseInt((fields.xp || {}).integerValue || "0", 10),
      streak: parseInt((fields.streak || {}).integerValue || "0", 10),
      shields: parseInt((fields.shields || {}).integerValue || "0", 10),
      lastDay: (fields.lastDay || {}).stringValue || null,
      days: readBool(fields.days),
      completed: readStr(fields.completed),
      bosses: readBoss(fields.bosses),
      achievements: readStr(fields.achievements),
      dayCounts: readInt(fields.dayCounts),
      goalTarget: parseInt((fields.goalTarget || {}).integerValue || "0", 10) || 0,
      stats: readInt(fields.stats),
      scores: readInt(fields.scores)
    };
  }
  /* estado local completo y actual (nunca el que pasó el llamador: puede venir vacío) */
  function localState() { return (window.VesperProgress && VesperProgress.getState) ? VesperProgress.getState() : {}; }

  /* ---- REST ---- */
  function pull(uid, token) {
    return fetch(fsBase(uid), { headers: { "Authorization": "Bearer " + token } })
      .then(function (r) { return r.json().then(function (j) { return { status: r.status, body: j }; }); });
  }
  function pushDoc(uid, token, state) {
    return fetch(fsBase(uid), {
      method: "PATCH",
      headers: { "Authorization": "Bearer " + token, "Content-Type": "application/json" },
      body: JSON.stringify(toFs(state))
    }).then(function (r) { return r.status; });
  }

  /* ---- al iniciar sesion: traer -> fusionar -> guardar nube ----
     La regla de progress/{uid} (2026-11) rechaza un guardado que BAJE el XP
     o pierda logros/jefes/lecciones de la nube. Por eso: (1) mientras la
     primera fusión no termina, los push esperan (si no, el estado local sin
     fusionar pisaba la nube); (2) si un push rebota con 403 —otro
     dispositivo avanzó—, se vuelve a traer, fusionar y guardar una vez. */
  var syncReady = false, pushPending = false, syncing = false;

  /* ---- De quién son los datos de este dispositivo ----
     OWNER_KEY guarda el uid de la cuenta con la que se sincronizó el progreso
     local. Sirve para dos cosas:
       · al CERRAR sesión se borra el progreso local de esa cuenta (ya está en
         la nube): el siguiente que use el dispositivo empieza limpio;
       · si entra OTRA cuenta y aún hay datos de la anterior, se borran ANTES
         de fusionar. Antes se quedaban y se mezclaban en la cuenta nueva.
     El progreso hecho sin cuenta (sin dueño) sí se conserva y se adopta al
     iniciar sesión: es el caso "practiqué gratis y luego me registré". */
  var OWNER_KEY = "vesper_data_owner";
  var ACCOUNT_KEYS = ["vesperProgress", "vesper_lesson_scores", "vesper_lesson_rev", "vesper_srs", "vesper_forja",
    "vesper_economy", "vesper_league", "vesper_exam_results_v1", "vesper_entrevistas", "vesper_last_continue",
    "vesper_last", "vesper_vocab_known", "vesper_practice_v1", "vesper_session"];
  function owner() { try { return localStorage.getItem(OWNER_KEY) || ""; } catch (e) { return ""; } }
  function setOwner(uid) { try { if (uid) localStorage.setItem(OWNER_KEY, uid); else localStorage.removeItem(OWNER_KEY); } catch (e) {} }
  function wipeAccountData() {
    try {
      ACCOUNT_KEYS.forEach(function (k) { localStorage.removeItem(k); });
      var drop = [];
      for (var i = 0; i < localStorage.length; i++) { var k = localStorage.key(i); if (k && k.indexOf("vesper_league_sent_") === 0) drop.push(k); }
      drop.forEach(function (k) { localStorage.removeItem(k); });
    } catch (e) {}
    setOwner("");
  }

  /* reintentos: 30 s, 1 min, 2 min, 5 min, 10 min, y al volver la conexión */
  var RETRY_MS = [30000, 60000, 120000, 300000, 600000], retryN = 0, retryTimer = null;
  function scheduleRetry(fn) {
    clearTimeout(retryTimer);
    if (retryN >= RETRY_MS.length) return;
    retryTimer = setTimeout(function () { if (currentUser) fn(); }, RETRY_MS[retryN++]);
  }
  try {
    window.addEventListener("online", function () {
      if (!currentUser) return;
      retryN = 0;
      if (!syncReady) doSync(currentUser); else if (pushPending) { pushPending = false; schedulePush(); }
    });
  } catch (e) {}

  function doSync(user, done) {
    if (syncing) return;
    syncing = true;
    setStatus("syncing");
    /* si mientras tanto se cerró la sesión o entró otra cuenta, esta fusión ya
       no vale: aplicarla volvería a escribir en el dispositivo los datos de
       quien acaba de salir */
    function stale() { return !currentUser || currentUser.uid !== user.uid; }
    function finish(st) {
      syncing = false;
      if (stale()) return;
      /* solo una fusión que LLEGÓ a la nube deja listo el canal de guardado;
         si falló se reintenta sola (antes quedaba en "Error de sync" hasta
         recargar la página) */
      if (st === 200) { syncReady = true; retryN = 0; clearTimeout(retryTimer); setOwner(user.uid); }
      else if (st !== 403) scheduleRetry(function () { doSync(user); });
      setStatus(st === 200 ? "synced" : (st === 403 ? "rule" : (st === "offline" ? "offline" : "error")));
      if (done) done(st);
      if (pushPending && st === 200) { pushPending = false; schedulePush(); }
    }
    user.getIdToken().then(function (token) {
      pull(user.uid, token).then(function (res) {
        if (stale()) { syncing = false; return; }
        if (res.status === 200) {
          var remote = fromFs((res.body || {}).fields);
          mergeScores(remote.scores);
          var merged = (window.VesperProgress && VesperProgress.merge) ? VesperProgress.merge(remote) : remote;
          refreshUI();
          pushDoc(user.uid, token, merged).then(finish, function () { finish("error"); });
        } else if (res.status === 404) {
          pushDoc(user.uid, token, localState()).then(finish, function () { finish("error"); });
        } else { finish(res.status === 403 ? 403 : "error"); }
      }).catch(function () { finish("offline"); });
    }).catch(function () { finish("error"); });
  }

  /* push con rebote: lo llaman vesper_progress (lección, jefe, logro, meta) y
     vesper_persona. Ignora el argumento y lee el estado local al disparar: así
     un push() sin estado no vacía la nube y siempre va lo más reciente. */
  function schedulePush() {
    if (!currentUser) return;
    if (!syncReady || syncing) { pushPending = true; return; }
    clearTimeout(pushTimer);
    setStatus("syncing");
    pushTimer = setTimeout(function () {
      var user = currentUser; if (!user) return;
      user.getIdToken().then(function (token) {
        pushDoc(user.uid, token, localState()).then(function (st) {
          if (st === 403) { doSync(user); return; }   /* la nube va adelante: fusiona y reintenta */
          if (st === 200) { retryN = 0; setStatus("synced"); }
          else { setStatus("error"); scheduleRetry(schedulePush); }
        }, function () { setStatus("offline"); scheduleRetry(schedulePush); });
      }).catch(function () { setStatus("error"); scheduleRetry(schedulePush); });
    }, 1200);
  }

  window.VESPER_SYNC = { push: schedulePush, openAuth: openModal, signedIn: function () { return !!currentUser; },
    mountChip: function (slot) { if (chip && slot && chip.parentNode !== slot) slot.appendChild(chip); } };

  /* ============================ UI ============================ */
  function injectCSS() {
    if (document.getElementById("vsync-css")) return;
    var css = [
      /* En el flujo, no fijo: arriba a la derecha tapaba un botón del
         encabezado del hub y, al desplazarse, tarjetas y nodos del mapa. */
      ".vsync-chip{position:static;display:inline-flex;align-items:center;gap:6px;",
      "background:#fff;border:1px solid #ece7da;border-radius:999px;padding:7px 13px;font:600 12px/1 Inter,system-ui,sans-serif;",
      "color:#1B1B2F;box-shadow:0 4px 14px rgba(27,27,47,.12);cursor:pointer}",
      ".vsync-chip .dot{width:8px;height:8px;border-radius:50%;background:#C9A84C}",
      ".vsync-chip.ok .dot{background:#2D9E75}.vsync-chip.warn .dot{background:#C0392B}",
      /* Teléfono: arriba a la derecha se montaba sobre el engrane y los iconos
         del saludo. Abajo a la izquierda, encima de la barra de pestañas, no
         tapa controles; y mientras sincroniza o ya sincronizó se reduce al
         punto de color (el texto sigue en aria-label). "Guardar progreso" y los avisos sí conservan su
         texto, porque piden una acción. */
      "@media(max-width:600px){.vsync-chip{top:auto;right:auto;left:12px;bottom:calc(74px + env(safe-area-inset-bottom));",
      "padding:6px 11px;font-size:11.5px}",
      ".vsync-chip.quiet{width:30px;height:30px;padding:0;justify-content:center}.vsync-chip.quiet .lbl{display:none}}",
      ".vsync-overlay{position:fixed;inset:0;z-index:9001;background:rgba(27,27,47,.55);display:none;align-items:center;justify-content:center;padding:18px}",
      ".vsync-overlay.show{display:flex}",
      ".vsync-modal{background:#fff;border-radius:16px;max-width:380px;width:100%;padding:22px;box-shadow:0 20px 60px rgba(0,0,0,.3);font-family:Inter,system-ui,sans-serif;color:#1B1B2F}",
      ".vsync-modal h3{font-family:'Inria Serif',Georgia,serif;margin:0 0 6px;font-size:1.25rem}",
      ".vsync-modal p{margin:.3em 0;color:#6b6b76;font-size:.9rem}",
      ".vsync-modal input{width:100%;padding:11px 12px;margin-top:9px;border:1.5px solid #ece7da;border-radius:10px;font:1rem Inter,system-ui,sans-serif}",
      ".vsync-btn{display:block;width:100%;margin-top:10px;padding:12px;border:none;border-radius:11px;font:600 1rem Inter,system-ui,sans-serif;cursor:pointer}",
      ".vsync-btn.gold{background:#C9A84C;color:#1B1B2F}.vsync-btn.ink{background:#1B1B2F;color:#fff}.vsync-btn.ghost{background:transparent;border:1.5px solid #ece7da;color:#1B1B2F}",
      ".vsync-msg{margin-top:10px;font-size:.85rem;min-height:1.1em}.vsync-msg.err{color:#C0392B}.vsync-msg.ok{color:#2D9E75}",
      ".vsync-del{margin:12px 0 0;text-align:center;font-size:.8rem}.vsync-del a{color:#8a8578}",
      ".vsync-x{float:right;border:none;background:none;font-size:1.3rem;cursor:pointer;color:#6b6b76;line-height:1}"
    ].join("");
    var el = document.createElement("style"); el.id = "vsync-css"; el.textContent = css;
    (document.head || document.documentElement).appendChild(el);
  }

  var chip, overlay, modal;
  function buildUI() {
    injectCSS();
    chip = document.createElement("button");
    chip.className = "vsync-chip";
    chip.innerHTML = '<span class="dot"></span><span class="lbl">Guardar progreso</span>';
    chip.onclick = openModal;
    overlay = document.createElement("div");
    overlay.className = "vsync-overlay";
    modal = document.createElement("div");
    modal.className = "vsync-modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-labelledby", "vsync-title");
    document.addEventListener("keydown", onModalKey, true);   /* en captura: antes que otros atajos de la página */
    overlay.appendChild(modal);
    overlay.addEventListener("click", function (e) { if (e.target === overlay) closeModal(); });
    /* El chip lo coloca la página con VESPER_SYNC.mountChip(hueco); sin
       hueco (pantallas de lección) no se muestra. El modal sí va al body. */
    function mount() { document.body.appendChild(overlay); }
    if (document.body) mount(); else document.addEventListener("DOMContentLoaded", mount);
  }

  function setChip(label, kind) {
    if (!chip) return;
    chip.querySelector(".lbl").textContent = label;
    chip.className = "vsync-chip" + (kind === "ok" ? " ok" : (kind === "warn" ? " warn" : ""))
      + (kind === "ok" || kind === "busy" ? " quiet" : "");
    chip.setAttribute("aria-label", label);
    chip.title = label;
  }
  function setStatus(s) {
    if (s === "synced") setChip("Sincronizado", "ok");
    else if (s === "syncing") setChip("Sincronizando…", "busy");
    else if (s === "rule") setChip("Activa la nube", "warn");
    else if (s === "offline") setChip("Sin conexión", "warn");
    else if (s === "error") setChip("Error de sync", "warn");
  }

  function esc(t) { return ("" + (t == null ? "" : t)).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  /* El modal es un diálogo de verdad: role="dialog" + aria-modal, título
     enlazado, foco dentro al abrir, Tab atrapado, Esc cierra y el foco vuelve
     a quien lo abrió. Antes era un <div> que un lector de pantalla no
     anunciaba y del que el teclado se salía hacia la página de atrás. */
  var lastFocus = null;
  function focusables() {
    return [].slice.call(modal.querySelectorAll("button, input, a[href]")).filter(function (el) { return !el.disabled && el.getClientRects().length > 0; });
  }
  function onModalKey(e) {
    if (!overlay.classList.contains("show")) return;
    if (e.key === "Escape" || e.key === "Esc") { e.preventDefault(); closeModal(); return; }
    if (e.key !== "Tab") return;
    var f = focusables(); if (!f.length) return;
    var first = f[0], last = f[f.length - 1], act = document.activeElement;
    if (e.shiftKey && (act === first || !modal.contains(act))) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && (act === last || !modal.contains(act))) { e.preventDefault(); first.focus(); }
  }
  function focusModal() {
    var el = modal.querySelector("input") || modal.querySelector(".vsync-btn") || modal.querySelector(".vsync-x");
    if (el) { try { el.focus(); } catch (e) {} }
  }
  function openModal() {
    if (!overlay.classList.contains("show")) lastFocus = document.activeElement;
    renderModal(); overlay.classList.add("show"); focusModal();
  }
  function closeModal() {
    overlay.classList.remove("show");
    if (lastFocus && lastFocus.focus) { try { lastFocus.focus(); } catch (e) {} }
    lastFocus = null;
  }

  function renderModal() {
    var u = authInst && authInst.currentUser;
    if (u && u.emailVerified) {
      modal.innerHTML = '<button class="vsync-x" aria-label="Cerrar">&times;</button>'
        + '<h3 id="vsync-title">Progreso en la nube</h3>'
        + '<p>Sesión: <b>' + esc(u.email) + '</b></p>'
        + '<p>Tus mundos desbloqueados, lecciones, racha y XP se sincronizan automáticamente en todos tus dispositivos.</p>'
        + '<button class="vsync-btn ghost" data-act="signout">Cerrar sesión</button>'
        + '<p class="vsync-del"><a href="eliminar-cuenta.html">Eliminar mi cuenta</a></p>';
    } else if (u && !u.emailVerified) {
      modal.innerHTML = '<button class="vsync-x" aria-label="Cerrar">&times;</button>'
        + '<h3 id="vsync-title">Verifica tu correo</h3>'
        + '<p>Te enviamos un enlace a <b>' + esc(u.email) + '</b>. Ábrelo para activar la sincronización.</p>'
        + '<button class="vsync-btn gold" data-act="resend">Reenviar verificación</button>'
        + '<button class="vsync-btn ghost" data-act="signout">Usar otra cuenta</button>'
        + '<div class="vsync-msg" role="status" aria-live="polite"></div>';
    } else {
      modal.innerHTML = '<button class="vsync-x" aria-label="Cerrar">&times;</button>'
        + '<h3 id="vsync-title">Guarda tu progreso</h3>'
        + '<p>Crea una cuenta (opcional) para sincronizar tu racha y XP entre dispositivos. Las lecciones siguen siendo gratis y sin cuenta.</p>'
        + '<input type="email" id="vsync-email" placeholder="tu@correo.com" autocomplete="email" aria-label="Correo electrónico">'
        + '<input type="password" id="vsync-pass" placeholder="Contraseña (mín. 8)" autocomplete="current-password" aria-label="Contraseña, mínimo 8 caracteres">'
        + '<button class="vsync-btn ink" data-act="login">Entrar</button>'
        + '<button class="vsync-btn gold" data-act="register">Crear cuenta</button>'
        + '<div class="vsync-msg" role="status" aria-live="polite"></div>';
    }
    modal.querySelector(".vsync-x").onclick = closeModal;
    var btns = modal.querySelectorAll("[data-act]");
    for (var i = 0; i < btns.length; i++) btns[i].onclick = onAction;
  }

  function msg(text, kind) { var m = modal.querySelector(".vsync-msg"); if (m) { m.textContent = text || ""; m.className = "vsync-msg" + (kind ? " " + kind : ""); } }

  function onAction(e) {
    var act = e.currentTarget.getAttribute("data-act");
    if (!authInst) { msg("Conectando con el servicio…", "err"); return; }
    if (act === "signout") {
      /* último guardado antes de salir: al cerrar sesión se borra lo local */
      var out = function () { authInst.signOut().then(closeModal); };
      var cu0 = currentUser;
      if (!cu0) { out(); return; }
      cu0.getIdToken().then(function (tk) { return pushDoc(cu0.uid, tk, localState()); }).then(out, out);
      return;
    }
    if (act === "resend") { var cu = authInst.currentUser; if (cu) cu.sendEmailVerification().then(function () { msg("Enviado. Revisa tu correo.", "ok"); }).catch(function (er) { msg(humanErr(er), "err"); }); return; }
    var email = (modal.querySelector("#vsync-email") || {}).value || "";
    var pass = (modal.querySelector("#vsync-pass") || {}).value || "";
    if (!email || !pass) { msg("Escribe tu correo y contraseña.", "err"); return; }
    if (act === "register" && (pass.length < 8 || !/[a-zA-Z]/.test(pass) || !/[0-9]/.test(pass))) { msg("La contraseña debe tener 8+ caracteres con letras y números.", "err"); return; }
    msg(act === "register" ? "Creando cuenta…" : "Entrando…", null);
    var op = act === "register"
      ? authInst.createUserWithEmailAndPassword(email, pass).then(function (cred) { return cred.user.sendEmailVerification(); }).then(function () { msg("Cuenta creada. Revisa tu correo para verificarla.", "ok"); })
      : authInst.signInWithEmailAndPassword(email, pass).then(function () { msg("¡Listo!", "ok"); setTimeout(closeModal, 600); });
    op.catch(function (er) { msg(humanErr(er), "err"); });
  }

  function humanErr(er) {
    var c = (er && er.code) || "";
    if (c.indexOf("wrong-password") >= 0 || c.indexOf("invalid-credential") >= 0) return "Correo o contraseña incorrectos.";
    if (c.indexOf("user-not-found") >= 0) return "No existe una cuenta con ese correo.";
    if (c.indexOf("email-already-in-use") >= 0) return "Ese correo ya tiene cuenta. Pulsa Entrar.";
    if (c.indexOf("invalid-email") >= 0) return "Correo no válido.";
    if (c.indexOf("weak-password") >= 0) return "Contraseña demasiado débil.";
    if (c.indexOf("too-many-requests") >= 0) return "Demasiados intentos. Espera un momento.";
    return "No se pudo completar. Inténtalo de nuevo.";
  }

  function setSignedIn(user) { setStatus("synced"); if (overlay && overlay.classList.contains("show")) renderModal(); }
  function setUnverified(user) { setChip("Verifica tu correo", "warn"); if (overlay && overlay.classList.contains("show")) renderModal(); }
  function setSignedOut() { setChip("Guardar progreso", null); if (overlay && overlay.classList.contains("show")) renderModal(); }
  function refreshUI() { /* hook para que la pantalla de racha se repinte si está visible */ if (typeof window.VESPER_ON_SYNC === "function") { try { window.VESPER_ON_SYNC(); } catch (e) {} } }

  /* ============================ arranque ============================ */
  buildUI();
  VA.initFirebase().then(function (auth) {
    authInst = auth;
    auth.onAuthStateChanged(function (user) {
      currentUser = (user && user.emailVerified) ? user : null;
      syncReady = false; retryN = 0; clearTimeout(retryTimer);
      var was = owner();
      if (user && user.emailVerified) {
        /* datos de OTRA cuenta en el dispositivo: fuera antes de fusionar */
        if (was && was !== user.uid) { wipeAccountData(); refreshUI(); }
        setSignedIn(user); doSync(user);
      }
      else if (user && !user.emailVerified) { setUnverified(user); }
      else {
        /* cierre de sesión: el progreso de esa cuenta ya está en la nube */
        if (was) { wipeAccountData(); refreshUI(); }
        setSignedOut();
      }
    });
  }).catch(function () { /* sin red a Firebase: queda solo-local, el chip invita a guardar */ });
})();
