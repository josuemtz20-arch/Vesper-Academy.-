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

  /* ---- codificacion tipada de Firestore REST para nuestro estado ---- */
  function toFs(s) {
    s = s || {};
    function mapBool(o) { var f = {}; for (var k in o) { if (o[k]) f[k] = { booleanValue: true }; } return { mapValue: { fields: f } }; }
    function mapStr(o) { var f = {}; for (var k in o) { f[k] = { stringValue: String(o[k]) }; } return { mapValue: { fields: f } }; }
    return { fields: {
      xp: { integerValue: String(s.xp || 0) },
      streak: { integerValue: String(s.streak || 0) },
      shields: { integerValue: String(s.shields || 0) },
      lastDay: s.lastDay ? { stringValue: s.lastDay } : { nullValue: null },
      days: mapBool(s.days || {}),
      completed: mapStr(s.completed || {})
    } };
  }
  function fromFs(fields) {
    fields = fields || {};
    function readBool(v) { var o = {}, f = (v && v.mapValue && v.mapValue.fields) || {}; for (var k in f) { if (f[k].booleanValue) o[k] = true; } return o; }
    function readStr(v) { var o = {}, f = (v && v.mapValue && v.mapValue.fields) || {}; for (var k in f) { o[k] = f[k].stringValue || ""; } return o; }
    return {
      xp: parseInt((fields.xp || {}).integerValue || "0", 10),
      streak: parseInt((fields.streak || {}).integerValue || "0", 10),
      shields: parseInt((fields.shields || {}).integerValue || "0", 10),
      lastDay: (fields.lastDay || {}).stringValue || null,
      days: readBool(fields.days),
      completed: readStr(fields.completed)
    };
  }

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

  /* ---- al iniciar sesion: traer -> fusionar -> guardar nube ---- */
  function doSync(user) {
    setStatus("syncing");
    user.getIdToken().then(function (token) {
      pull(user.uid, token).then(function (res) {
        if (res.status === 200) {
          var remote = fromFs((res.body || {}).fields);
          var merged = (window.VesperProgress && VesperProgress.merge) ? VesperProgress.merge(remote) : remote;
          refreshUI();
          pushDoc(user.uid, token, merged).then(function (st) { setStatus(st === 200 ? "synced" : (st === 403 ? "rule" : "error")); });
        } else if (res.status === 404) {
          var local = (window.VesperProgress && VesperProgress.getState) ? VesperProgress.getState() : {};
          pushDoc(user.uid, token, local).then(function (st) { setStatus(st === 200 ? "synced" : (st === 403 ? "rule" : "error")); });
        } else if (res.status === 403) {
          setStatus("rule");
        } else { setStatus("error"); }
      }).catch(function () { setStatus("offline"); });
    }).catch(function () { setStatus("error"); });
  }

  /* push con rebote: lo llama vesper_progress.completeLesson via window.VESPER_SYNC.push */
  function schedulePush(state) {
    if (!currentUser) return;
    clearTimeout(pushTimer);
    setStatus("syncing");
    pushTimer = setTimeout(function () {
      currentUser.getIdToken().then(function (token) {
        pushDoc(currentUser.uid, token, state).then(function (st) { setStatus(st === 200 ? "synced" : (st === 403 ? "rule" : "error")); });
      }).catch(function () { setStatus("error"); });
    }, 1200);
  }

  window.VESPER_SYNC = { push: schedulePush, openAuth: openModal, signedIn: function () { return !!currentUser; } };

  /* ============================ UI ============================ */
  function injectCSS() {
    if (document.getElementById("vsync-css")) return;
    var css = [
      ".vsync-chip{position:fixed;top:10px;right:10px;z-index:9000;display:inline-flex;align-items:center;gap:6px;",
      "background:#fff;border:1px solid #ece7da;border-radius:999px;padding:7px 13px;font:600 12px/1 Inter,system-ui,sans-serif;",
      "color:#1B1B2F;box-shadow:0 4px 14px rgba(27,27,47,.12);cursor:pointer}",
      ".vsync-chip .dot{width:8px;height:8px;border-radius:50%;background:#C9A84C}",
      ".vsync-chip.ok .dot{background:#2D9E75}.vsync-chip.warn .dot{background:#C0392B}",
      ".vsync-overlay{position:fixed;inset:0;z-index:9001;background:rgba(27,27,47,.55);display:none;align-items:center;justify-content:center;padding:18px}",
      ".vsync-overlay.show{display:flex}",
      ".vsync-modal{background:#fff;border-radius:16px;max-width:380px;width:100%;padding:22px;box-shadow:0 20px 60px rgba(0,0,0,.3);font-family:Inter,system-ui,sans-serif;color:#1B1B2F}",
      ".vsync-modal h3{font-family:'Inria Serif',Georgia,serif;margin:0 0 6px;font-size:1.25rem}",
      ".vsync-modal p{margin:.3em 0;color:#6b6b76;font-size:.9rem}",
      ".vsync-modal input{width:100%;padding:11px 12px;margin-top:9px;border:1.5px solid #ece7da;border-radius:10px;font:1rem Inter,system-ui,sans-serif}",
      ".vsync-btn{display:block;width:100%;margin-top:10px;padding:12px;border:none;border-radius:11px;font:600 1rem Inter,system-ui,sans-serif;cursor:pointer}",
      ".vsync-btn.gold{background:#C9A84C;color:#1B1B2F}.vsync-btn.ink{background:#1B1B2F;color:#fff}.vsync-btn.ghost{background:transparent;border:1.5px solid #ece7da;color:#1B1B2F}",
      ".vsync-msg{margin-top:10px;font-size:.85rem;min-height:1.1em}.vsync-msg.err{color:#C0392B}.vsync-msg.ok{color:#2D9E75}",
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
    overlay.appendChild(modal);
    overlay.addEventListener("click", function (e) { if (e.target === overlay) closeModal(); });
    function mount() { document.body.appendChild(chip); document.body.appendChild(overlay); }
    if (document.body) mount(); else document.addEventListener("DOMContentLoaded", mount);
  }

  function setChip(label, kind) {
    if (!chip) return;
    chip.querySelector(".lbl").textContent = label;
    chip.className = "vsync-chip" + (kind === "ok" ? " ok" : (kind === "warn" ? " warn" : ""));
  }
  function setStatus(s) {
    if (s === "synced") setChip("Sincronizado", "ok");
    else if (s === "syncing") setChip("Sincronizando…", null);
    else if (s === "rule") setChip("Activa la nube", "warn");
    else if (s === "offline") setChip("Sin conexión", "warn");
    else if (s === "error") setChip("Error de sync", "warn");
  }

  function esc(t) { return ("" + (t == null ? "" : t)).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function openModal() { renderModal(); overlay.classList.add("show"); }
  function closeModal() { overlay.classList.remove("show"); }

  function renderModal() {
    var u = authInst && authInst.currentUser;
    if (u && u.emailVerified) {
      modal.innerHTML = '<button class="vsync-x" aria-label="Cerrar">&times;</button>'
        + '<h3>Progreso en la nube</h3>'
        + '<p>Sesión: <b>' + esc(u.email) + '</b></p>'
        + '<p>Tu racha y XP se sincronizan automáticamente en todos tus dispositivos.</p>'
        + '<button class="vsync-btn ghost" data-act="signout">Cerrar sesión</button>';
    } else if (u && !u.emailVerified) {
      modal.innerHTML = '<button class="vsync-x" aria-label="Cerrar">&times;</button>'
        + '<h3>Verifica tu correo</h3>'
        + '<p>Te enviamos un enlace a <b>' + esc(u.email) + '</b>. Ábrelo para activar la sincronización.</p>'
        + '<button class="vsync-btn gold" data-act="resend">Reenviar verificación</button>'
        + '<button class="vsync-btn ghost" data-act="signout">Usar otra cuenta</button>'
        + '<div class="vsync-msg"></div>';
    } else {
      modal.innerHTML = '<button class="vsync-x" aria-label="Cerrar">&times;</button>'
        + '<h3>Guarda tu progreso</h3>'
        + '<p>Crea una cuenta (opcional) para sincronizar tu racha y XP entre dispositivos. Las lecciones siguen siendo gratis y sin cuenta.</p>'
        + '<input type="email" id="vsync-email" placeholder="tu@correo.com" autocomplete="email">'
        + '<input type="password" id="vsync-pass" placeholder="Contraseña (mín. 8)" autocomplete="current-password">'
        + '<button class="vsync-btn ink" data-act="login">Entrar</button>'
        + '<button class="vsync-btn gold" data-act="register">Crear cuenta</button>'
        + '<div class="vsync-msg"></div>';
    }
    modal.querySelector(".vsync-x").onclick = closeModal;
    var btns = modal.querySelectorAll("[data-act]");
    for (var i = 0; i < btns.length; i++) btns[i].onclick = onAction;
  }

  function msg(text, kind) { var m = modal.querySelector(".vsync-msg"); if (m) { m.textContent = text || ""; m.className = "vsync-msg" + (kind ? " " + kind : ""); } }

  function onAction(e) {
    var act = e.currentTarget.getAttribute("data-act");
    if (!authInst) { msg("Conectando con el servicio…", "err"); return; }
    if (act === "signout") { authInst.signOut().then(closeModal); return; }
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
      if (user && user.emailVerified) { setSignedIn(user); doSync(user); }
      else if (user && !user.emailVerified) { setUnverified(user); }
      else { setSignedOut(); }
    });
  }).catch(function () { /* sin red a Firebase: queda solo-local, el chip invita a guardar */ });
})();
