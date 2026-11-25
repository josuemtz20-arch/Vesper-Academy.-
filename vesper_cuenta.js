/* ============================================================
 * vesper_cuenta.js — Un registro de progreso por cuenta en el dispositivo.
 *
 * DEBE ser el PRIMER <script> de cada página que lee o escribe progreso:
 * los módulos leen localStorage al cargar, antes de que Firebase sepa quién
 * es el usuario.
 *
 * Cómo funciona
 * -------------
 * 1. Espacio por cuenta. Las claves del ALUMNO (lista CLAVES_ALUMNO) se leen
 *    y escriben bajo "vesper@<uid>:<clave>". Los módulos no cambian: este
 *    archivo envuelve Storage.prototype.getItem/setItem/removeItem solo para
 *    window.localStorage y solo para esas claves. Las preferencias del
 *    dispositivo (tema, estilo de mapa, tours, voz…) no se tocan.
 *    Sin sesión, el espacio es el de INVITADO = las claves de siempre, sin
 *    prefijo. Por eso no hay migración: lo que ya existe es el invitado.
 * 2. La carrera de la carga. Cada página arranca con el último uid activo
 *    (clave de dispositivo vesper_cuenta_activa). Cuando onAuthStateChanged
 *    dice otra cosa (vesper_auth.js llama a _conectar), se cambia de
 *    espacio: si la página aún no leyó nada del alumno, en vivo; si ya leyó,
 *    se congelan sus escrituras (para que el estado en memoria de A no caiga
 *    en el registro de B) y se recarga la página, salvo que ya esté
 *    navegando a otra.
 * 3. Invitado -> cuenta UNA sola vez. La primera cuenta que inicia sesión
 *    en el dispositivo se lleva el registro de invitado (se mueve y se
 *    vacía) y queda anotada en vesper_cuenta_invitado. Ninguna otra cuenta
 *    lo vuelve a recibir.
 * 4. Nube para lo que antes nunca salía del dispositivo (window.VesperCuenta
 *    .nube): Forja, repaso (SRS), economía + cosméticos vistos y las
 *    respuestas escritas en cada libro. Documentos del dueño en
 *    progress/{uid}/datos/{forja|srs|economia} y progress/{uid}/libros/{id}.
 *    Racha, XP y estrellas siguen yendo por vesper_sync.js a progress/{uid}.
 *    Cuota: solo se sube si el contenido cambió (huella), con rebote largo y
 *    un mínimo entre subidas; se baja una vez por sesión del navegador.
 * ============================================================ */
(function () {
  "use strict";
  /* libro.html reinyecta este archivo tras document.write, que borra los
     oyentes del documento: solo se vuelven a enganchar */
  if (window.VesperCuenta) { if (window.VesperCuenta._enganchar) window.VesperCuenta._enganchar(); return; }

  var ls = null;
  try { ls = window.localStorage; ls.getItem("vesper_cuenta_activa"); } catch (e) { ls = null; }
  var SP = window.Storage && Storage.prototype;
  if (!ls || !SP) { window.VesperCuenta = null; return; }   /* sin almacenamiento: nada que separar */

  /* <script src="vesper_cuenta.js" data-fija="1">: la página no cambia de
     registro sola (eliminar-cuenta.html entra con contraseña para borrar la
     cuenta: no debe llevarse el registro de invitado). */
  var FIJA = false;
  try { FIJA = !!(document.currentScript && document.currentScript.getAttribute("data-fija") === "1"); } catch (e) {}

  var rawGet = SP.getItem, rawSet = SP.setItem, rawRemove = SP.removeItem;
  function rget(k) { try { return rawGet.call(ls, k); } catch (e) { return null; } }
  function rset(k, v) { try { rawSet.call(ls, k, v); return true; } catch (e) { return false; } }
  function rdel(k) { try { rawRemove.call(ls, k); } catch (e) {} }

  var ACTIVA = "vesper_cuenta_activa";        /* uid de la última sesión vista ("" = invitado) */
  var RECLAMO = "vesper_cuenta_invitado";     /* uid que se llevó el registro de invitado */
  var PREFIJO = "vesper@";                    /* empieza por "vesper": la limpieza total de eliminar-cuenta lo alcanza */

  /* Claves del alumno. Lo que no está aquí es del dispositivo (vesper_appearance,
     vesper_map_style, vesper_tour_*, vesper_voice, vesper_heads, vesper_perf_*,
     vesper_boleta_tache/puntos, vesper_book_board_prefs, vesper_cues_open,
     vesper_entrevista_prefs, vesper_chat_tts, analítica, vesper_lead…) o es
     personal y ya se borra al cerrar sesión (PERSONAL_KEYS de vesper_auth.js:
     vesper_profile, vesper_chat_history, vesper_pro_code, vesper_student_ok,
     vesper_exam_pending). */
  var CLAVES_ALUMNO = {
    "vesperProgress": 1,            /* XP, racha, logros, jefes (vesper_progress.js) */
    "vesper_lesson_scores": 1,      /* estrellas por lección (vesper_path.js) */
    "vesper_lesson_rev": 1,
    "vesper_forja": 1,
    "vesper_srs": 1,
    "vesper_economy": 1,
    "vesper_cosmetics_seen": 1,
    "vesper_league": 1,
    "vesper_streak": 1,             /* racha del hub de materiales */
    "vesper_last": 1,               /* «sigue donde te quedaste» */
    "vesper_boleta_summary": 1,
    "vesper_audio_recent": 1,
    "vesper_prof_recent": 1,
    "vesper_vocab_known": 1,
    "vesper_practice_v1": 1,
    "vesper_session": 1,            /* calibración del día (vesper_adaptive.js) */
    "vesper_exam_results_v1": 1,
    "vesper_placement_history_v1": 1,
    "vesper_entrevistas": 1,
    "vesperOralInterview": 1
  };
  var PREFIJOS_ALUMNO = ["vesper_book_notes:", "vesper_league_sent_"];

  function esAlumno(k) {
    if (typeof k !== "string") return false;
    if (CLAVES_ALUMNO[k] === 1) return true;
    for (var i = 0; i < PREFIJOS_ALUMNO.length; i++) if (k.indexOf(PREFIJOS_ALUMNO[i]) === 0) return true;
    return false;
  }
  function uidValido(u) { return typeof u === "string" && /^[A-Za-z0-9_-]{1,128}$/.test(u); }
  function claveEn(uid, k) { return uid ? PREFIJO + uid + ":" + k : k; }

  var BORRADAS = "vesper_cuenta_borradas";   /* uids eliminados en este dispositivo: nunca revivir su registro */
  function borrada(uid) {
    if (!uid) return false;
    try { return (JSON.parse(rget(BORRADAS) || "[]") || []).indexOf(uid) >= 0; } catch (e) { return false; }
  }
  var ns = rget(ACTIVA) || "";
  if (ns && (!uidValido(ns) || borrada(ns))) ns = "";
  var tocado = false;          /* ¿la página ya leyó algo del alumno? */
  var congelado = false;       /* recarga pendiente: no se escribe nada del alumno */
  var oyentes = [];

  SP.getItem = function (k) {
    if (this === ls && esAlumno(k)) { tocado = true; return rawGet.call(this, claveEn(ns, k)); }
    return rawGet.apply(this, arguments);
  };
  SP.setItem = function (k, v) {
    if (this === ls && esAlumno(k)) {
      if (congelado || borrada(ns)) return;
      var real = claveEn(ns, k), antes = rawGet.call(this, real);
      rawSet.call(this, real, v);               /* deja pasar QuotaExceededError, como siempre */
      if (antes !== String(v)) avisar(k);
      return;
    }
    return rawSet.apply(this, arguments);
  };
  SP.removeItem = function (k) {
    if (this === ls && esAlumno(k)) {
      if (congelado || borrada(ns)) return;
      var real = claveEn(ns, k);
      if (rawGet.call(this, real) === null) return;
      rawRemove.call(this, real);
      avisar(k);
      return;
    }
    return rawRemove.apply(this, arguments);
  };
  function avisar(k) {
    for (var i = 0; i < oyentes.length; i++) { try { oyentes[i](k, ns); } catch (e) {} }
  }

  /* claves crudas de un espacio: [{ real, clave }] */
  function clavesDe(uid) {
    var out = [], i, k;
    try {
      for (i = 0; i < ls.length; i++) {
        k = ls.key(i);
        if (!k) continue;
        if (uid) {
          var p = PREFIJO + uid + ":";
          if (k.indexOf(p) === 0) out.push({ real: k, clave: k.slice(p.length) });
        } else if (esAlumno(k)) out.push({ real: k, clave: k });
      }
    } catch (e) {}
    return out;
  }

  /* Invitado -> primera cuenta. La cuenta gana si ya tuviera algo (no debería:
     su espacio nace aquí). */
  /* PENDIENTE DE JOSUE (punto de enganche, una línea): hoy el invitado pasa a
     la primera cuenta, sea cual sea. Para que solo pase a un alumno con correo
     verificado y nunca desde páginas de profesor, cambia el return por:
       return !!(user && user.emailVerified) && !/^(portal_|vesper_engine|manual|access_admin)/.test(PAGINA);
     Si devuelve false no se marca nada: la siguiente cuenta que sí cumpla se lo lleva. */
  var PAGINA = (location.pathname.split("/").pop() || "index.html");
  function puedeReclamar(uid, user) { return true; }

  function reclamarInvitado(uid, user) {
    if (rget(RECLAMO)) return false;
    if (!puedeReclamar(uid, user)) return false;
    if (!rset(RECLAMO, uid)) return false;
    clavesDe("").forEach(function (c) {
      var v = rget(c.real);
      var destino = claveEn(uid, c.clave);
      if (v !== null && rget(destino) === null) rset(destino, v);
      rdel(c.real);
    });
    return true;
  }

  /* ¿la página ya va a otra? La pone saliendo() justo antes de un
     location.href (los «Cerrar sesión» de vesper_auth.js), y pagehide /
     beforeunload como respaldo. En iOS no hay beforeunload: sin la bandera,
     la recarga podía ganarle a la navegación pedida. */
  var saliendoFlag = false;
  function marcarSalida() { saliendoFlag = true; }
  function enganchar() {
    try {
      document.addEventListener("visibilitychange", function () { if (document.visibilityState === "hidden") vaciar("ocultar"); });
      window.addEventListener("pagehide", function () { saliendoFlag = true; });
      window.addEventListener("beforeunload", function () { saliendoFlag = true; });
    } catch (e) {}
  }

  var recargando = false;
  function avisoRecarga() {
    function pinta() {
      if (document.getElementById("vsp-cuenta-aviso")) return;
      var d = document.createElement("div");
      d.id = "vsp-cuenta-aviso";
      d.setAttribute("role", "alert");
      d.style.cssText = "position:fixed;left:12px;right:12px;bottom:12px;z-index:2147483647;" +
        "background:#1B1B2F;color:#f5f2eb;border:1px solid #C9A84C;border-radius:12px;padding:12px 14px;" +
        "font:14px/1.4 Inter,system-ui,sans-serif;box-shadow:0 8px 24px rgba(0,0,0,.35)";
      var t = document.createElement("span");
      t.textContent = "Cambiaste de cuenta en este dispositivo. Para no mezclar el progreso, esta página dejó de guardar. ";
      var b = document.createElement("button");
      b.type = "button";
      b.textContent = "Recargar";
      b.style.cssText = "margin-left:8px;min-height:36px;padding:6px 12px;border:0;border-radius:8px;" +
        "background:#C9A84C;color:#1B1B2F;font-weight:700;cursor:pointer";
      b.onclick = function () { location.reload(); };
      d.appendChild(t); d.appendChild(b);
      (document.body || document.documentElement).appendChild(d);
    }
    if (document.body) pinta(); else document.addEventListener("DOMContentLoaded", pinta);
  }
  function recargar() {
    if (recargando) return true;
    recargando = true;
    /* tope anti-bucle: 3 recargas en 20 s. Al tope sigue congelada (sin
       escribir nada del alumno) y pide recargar a mano: nunca se cambia en
       vivo con el estado de otra cuenta en memoria. */
    var ahora = Date.now(), hist = [];
    try { hist = JSON.parse(sessionStorage.getItem("vesper_cuenta_recargas") || "[]") || []; } catch (e) {}
    hist = hist.filter(function (t) { return ahora - t < 20000; });
    if (hist.length >= 3) { avisoRecarga(); return false; }
    hist.push(ahora);
    try { sessionStorage.setItem("vesper_cuenta_recargas", JSON.stringify(hist)); } catch (e) {}
    setTimeout(function () { if (!saliendoFlag) location.reload(); }, 300);
    return true;
  }

  /* Cambia al registro de `uid` ("" = invitado). Lo llama vesper_auth.js en
     cada onAuthStateChanged; es idempotente. */
  var personales = [];          /* PERSONAL_KEYS de vesper_auth.js (las pasa _conectar) */
  function cambiar(uid, user) {
    uid = uidValido(uid) ? uid : "";
    if (FIJA) return ns;
    var antes = rget(ACTIVA) || "";
    if (uid === ns && uid === antes) return ns;
    /* de una cuenta X a otra Y sin pasar por «Cerrar sesión»: perfil, chat y
       código Pro eran de X. Del invitado a la primera cuenta NO se borran (el
       perfil del onboarding es de quien acaba de crear la cuenta). */
    var previa = antes || ns;
    if (uid && previa && previa !== uid) personales.forEach(function (k) { rdel(k); });
    if (uid) reclamarInvitado(uid, user);
    if (uid) rset(ACTIVA, uid); else rdel(ACTIVA);
    if ((rget(ACTIVA) || "") !== uid) return ns;   /* almacenamiento roto: no recargar en bucle */
    if (uid === ns) return ns;
    if (!tocado) { ns = uid; return ns; }
    congelado = true;
    recargar();
    return ns;
  }

  /* Otra pestaña cambió de cuenta (o borró esta). Lo necesitan sobre todo las
     páginas sin vesper_auth.js (tienda, configuración, chat, entrevista,
     portada, app), que si no seguirían en la cuenta con que abrieron. */
  try {
    window.addEventListener("storage", function (e) {
      if (FIJA || congelado) return;
      if (e.key !== ACTIVA && e.key !== null && e.key !== BORRADAS) return;
      var nueva = rget(ACTIVA) || "";
      if (borrada(nueva)) nueva = "";
      if (nueva === ns && !borrada(ns)) return;
      if (!tocado) { ns = nueva; return; }
      congelado = true;
      recargar();
    });
  } catch (e) {}

  /* Borra del dispositivo el registro de una cuenta (eliminar-cuenta.html). */
  function olvidar(uid) {
    if (!uidValido(uid)) return 0;
    var lista = clavesDe(uid);
    lista.forEach(function (c) { rdel(c.real); });
    var b = [];
    try { b = JSON.parse(rget(BORRADAS) || "[]") || []; } catch (e) {}
    if (b.indexOf(uid) < 0) { b.push(uid); rset(BORRADAS, JSON.stringify(b.slice(-20))); }
    if (rget(ACTIVA) === uid) rdel(ACTIVA);
    if (ns === uid) { ns = ""; }
    return lista.length;
  }

  /* ====================== nube (lo nuevo) ======================
     Documento: { json: "<JSON de { clave: valorCrudo }>", t: <ms de la última
     escritura local> }. Un string acotado en vez de mapas tipados: la regla
     mide su tamaño de un vistazo y el dueño es el único que lo lee. */
  var DB = "teachermanuals";
  /* Cuándo se sube (cuota por byte): al ocultar la página (con un piso de
     PISO_OCULTAR para que cambiar de pestaña no escriba cada vez), al cerrar
     sesión (forzado) y, con la página abierta, como mucho cada CADA. Nunca si
     el contenido no cambió. */
  var CADA = 30 * 60000, PISO_OCULTAR = 60000;
  var GRUPOS = {
    forja:    { claves: ["vesper_forja"], max: 300000 },
    srs:      { claves: ["vesper_srs"], max: 300000 },
    economia: { claves: ["vesper_economy", "vesper_cosmetics_seen"], max: 20000 }
  };
  var LIBRO_PFX = "vesper_book_notes:", LIBRO_MAX = 250000;
  var LIBRO_ID = /^[A-Za-z0-9_-]{1,60}$/;     /* igual que la regla de libros/{libro} */
  /* Repaso (SRS): cada ítem guarda el ejercicio ENTERO, y también entran los
     que genera la Forja al vuelo (no están en ningún banco), así que no se
     puede subir solo una referencia y reconstruirlo en otro dispositivo. A la
     nube van los SRS_NUBE ítems más urgentes; el dispositivo conserva todos. */
  var SRS_NUBE = 40;

  var nubeAuth = null, tokenFijo = null;   /* tokenFijo: libro.html (document.write) */
  var base = null;

  function grupoDe(k) {
    if (k.indexOf(LIBRO_PFX) === 0) return "libro:" + k.slice(LIBRO_PFX.length);
    for (var g in GRUPOS) if (GRUPOS[g].claves.indexOf(k) >= 0) return g;
    return null;
  }
  function metaKey(uid) { return PREFIJO + uid + ":__nube"; }
  function leerMeta(uid) {
    var m = null;
    try { m = JSON.parse(rget(metaKey(uid)) || "null"); } catch (e) {}
    if (!m || typeof m !== "object") m = {};
    if (!m.g) m.g = {};
    return m;
  }
  function guardarMeta(uid, m) { if (!congelado && !borrada(uid)) rset(metaKey(uid), JSON.stringify(m)); }

  function huella(s) {
    var h = 5381;
    for (var i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0;
    return (h >>> 0).toString(36) + "." + s.length;
  }
  function clavesGrupo(g) {
    if (g.indexOf("libro:") === 0) return [LIBRO_PFX + g.slice(6)];
    return GRUPOS[g].claves;
  }
  function maxGrupo(g) { return g.indexOf("libro:") === 0 ? LIBRO_MAX : GRUPOS[g].max; }
  function cadaGrupo(modo) { return modo === "ocultar" ? PISO_OCULTAR : CADA; }
  /* { clave: valorCrudo } del registro local de uid */
  function localDe(uid, g) {
    var o = {};
    clavesGrupo(g).forEach(function (k) { var v = rget(claveEn(uid, k)); if (v !== null) o[k] = v; });
    return o;
  }
  /* lo que entra en la huella: los corazones llenos reescriben lastRefill en
     cada lectura (vesper_economy.js) y eso no es un cambio que valga subir */
  function normal(g, o) {
    if (g !== "economia" || !o.vesper_economy) return JSON.stringify(o);
    try {
      var e = JSON.parse(o.vesper_economy);
      if (e && e.hearts >= 5) { delete e.lastRefill; }
      var c = {}; for (var k in o) c[k] = o[k];
      c.vesper_economy = JSON.stringify(e);
      return JSON.stringify(c);
    } catch (x) { return JSON.stringify(o); }
  }

  /* lo que viaja a la nube (el repaso, recortado a los más urgentes) */
  function paraNube(g, o) {
    if (g !== "srs" || !o.vesper_srs) return o;
    try {
      var s = JSON.parse(o.vesper_srs), ids = Object.keys((s && s.items) || {});
      if (ids.length <= SRS_NUBE) return o;
      ids.sort(function (a, b) {
        var A = s.items[a], B = s.items[b];
        if ((A.box || 0) !== (B.box || 0)) return (A.box || 0) - (B.box || 0);     /* caja baja primero */
        if ((A.due || "") !== (B.due || "")) return (A.due || "") < (B.due || "") ? -1 : 1;
        return (B.misses || 0) - (A.misses || 0);
      });
      var it = {};
      ids.slice(0, SRS_NUBE).forEach(function (id) { it[id] = s.items[id]; });
      var c = {}, r = {}, k;
      for (k in s) c[k] = s[k];
      c.items = it;
      for (k in o) r[k] = o[k];
      r.vesper_srs = JSON.stringify(c);
      return r;
    } catch (e) { return o; }
  }
  function huellaDe(g, o) { return huella(normal(g, paraNube(g, o))); }

  function url(uid, g) {
    var b = "https://firestore.googleapis.com/v1/projects/" + (base || "vesper-academy") +
            "/databases/" + DB + "/documents/progress/" + encodeURIComponent(uid);
    if (g.indexOf("libro:") === 0) return b + "/libros/" + encodeURIComponent(g.slice(6));
    return b + "/datos/" + g;
  }
  function usuario() { return nubeAuth && nubeAuth.currentUser; }
  /* uid con nube: sesión verificada y página en su propio registro */
  function uidNube() {
    if (FIJA || congelado || borrada(ns)) return "";   /* eliminar-cuenta.html / página por recargar */
    var u = usuario();
    if (u && u.emailVerified && u.uid === ns) return ns;
    if (!u && tokenFijo && tokenFijo.uid === ns) return ns;
    return "";
  }
  function token() {
    var u = usuario();
    if (u && u.emailVerified) return u.getIdToken();
    if (tokenFijo) return Promise.resolve(tokenFijo.token);
    return Promise.reject(new Error("sin sesion"));
  }

  /* ---- fusiones (solo la primera vez que una cuenta se baja en este
     dispositivo: lo local es el invitado recién reclamado o juego sin red) ---- */
  function J(s, d) { try { var v = JSON.parse(s); return v == null ? d : v; } catch (e) { return d; } }
  var FUSION = {
    vesper_forja: function (a, b) {
      a = J(a, {}); b = J(b, {});
      if (a.v !== b.v) return JSON.stringify(a.v ? a : b);
      var it = {}, k, gen = {};
      for (k in (b.items || {})) it[k] = b.items[k];
      for (k in (a.items || {})) if (!it[k] || (a.items[k].n || 0) >= (it[k].n || 0)) it[k] = a.items[k];
      for (k in (b.gen || {})) gen[k] = b.gen[k];
      for (k in (a.gen || {})) if (!gen[k] || (a.gen[k].o || 0) >= (gen[k].o || 0)) gen[k] = a.gen[k];
      var r = { v: a.v, items: it, gen: gen };
      if ((a.day || "") === (b.day || "")) { r.day = a.day; r.rounds = Math.max(a.rounds || 0, b.rounds || 0); r.best = Math.max(a.best || 0, b.best || 0); }
      else { var n = (a.day || "") > (b.day || "") ? a : b; r.day = n.day; r.rounds = n.rounds || 0; r.best = n.best || 0; }
      for (k in a) if (!(k in r)) r[k] = a[k];
      return JSON.stringify(r);
    },
    vesper_srs: function (a, b) {
      a = J(a, {}); b = J(b, {});
      var it = {}, k;
      for (k in (b.items || {})) it[k] = b.items[k];
      for (k in (a.items || {})) {
        var x = a.items[k], y = it[k];
        if (!y || (x.lastSeen || "") > (y.lastSeen || "") ||
            ((x.lastSeen || "") === (y.lastSeen || "") && (x.misses || 0) >= (y.misses || 0))) it[k] = x;
      }
      var r = {}; for (k in b) r[k] = b[k]; for (k in a) r[k] = a[k];
      r.items = it;
      return JSON.stringify(r);
    },
    vesper_economy: function (a, b) {
      a = J(a, {}); b = J(b, {});
      return JSON.stringify({
        gems: (a.gems || 0) + (b.gems || 0),          /* lo local nunca subió: se suma */
        hearts: Math.max(a.hearts || 0, b.hearts || 0),
        lastRefill: Math.max(a.lastRefill || 0, b.lastRefill || 0) || Date.now(),
        challenge: !!(a.challenge || b.challenge),
        xpBoost: Math.max(a.xpBoost || 0, b.xpBoost || 0)
      });
    },
    vesper_cosmetics_seen: function (a, b) {
      var u = {}, out = [];
      [].concat(J(a, []) || [], J(b, []) || []).forEach(function (x) { if (!u[x]) { u[x] = 1; out.push(x); } });
      return JSON.stringify(out);
    },
    /* libro: por hoja, une trazos, notas, textos y figuras (sin repetir los
       idénticos). Así lo escrito en dos dispositivos no se pierde. */
    libro: function (a, b) {
      a = J(a, {}); b = J(b, {});
      var pa = a.pages || {}, pb = b.pages || {}, pages = {}, k;
      function une(x, y) {
        var out = [], vistos = {};
        (x || []).concat(y || []).forEach(function (e) {
          var h = JSON.stringify(e);
          if (!vistos[h]) { vistos[h] = 1; out.push(e); }
        });
        return out;
      }
      for (k in pb) pages[k] = pb[k];
      for (k in pa) {
        if (!pages[k]) { pages[k] = pa[k]; continue; }
        var x = pa[k] || {}, y = pages[k] || {}, z = {}, c;
        for (c in y) z[c] = y[c];
        for (c in x) z[c] = x[c];
        ["strokes", "notes", "texts", "shapes"].forEach(function (c2) { z[c2] = une(x[c2], y[c2]); });
        pages[k] = z;
      }
      var r = {}; for (k in b) r[k] = b[k]; for (k in a) r[k] = a[k];
      r.pages = pages;
      return JSON.stringify(r);
    }
  };
  function fusionar(g, local, nubeO) {
    var out = {};
    clavesGrupo(g).forEach(function (k) {
      var a = local[k], b = nubeO[k];
      if (a == null) { if (b != null) out[k] = b; return; }
      if (b == null) { out[k] = a; return; }
      var f = g.indexOf("libro:") === 0 ? FUSION.libro : FUSION[k];
      try { out[k] = f ? f(a, b) : a; } catch (e) { out[k] = a; }
    });
    return out;
  }
  function escribirLocal(uid, g, o) {
    clavesGrupo(g).forEach(function (k) {
      if (o[k] != null) rset(claveEn(uid, k), o[k]);
    });
  }

  function bajar(uid, g) {
    return token().then(function (tk) {
      return fetch(url(uid, g), { headers: { "Authorization": "Bearer " + tk } });
    }).then(function (r) {
      if (r.status === 404) return { estado: 404 };
      if (r.status !== 200) return { estado: r.status };
      return r.json().then(function (j) {
        var f = (j && j.fields) || {};
        var obj = J((f.json || {}).stringValue || "{}", {});
        return { estado: 200, datos: obj && typeof obj === "object" ? obj : {},
                 t: parseInt((f.t || {}).integerValue || "0", 10) || 0 };
      });
    });
  }

  var timers = {}, enVuelo = {};
  /* modo: "forzar" (cerrar sesión, primera bajada) | "ocultar" | nada (periódica) */
  function subir(uid, g, modo) {
    if (modo === true) modo = "forzar";
    if (!uid || uid !== uidNube()) return Promise.resolve("sin-nube");
    var m = leerMeta(uid), mg = m.g[g] || {};
    if (!mg.bajado) return Promise.resolve("espera-bajada");   /* nunca subir sin haber fusionado antes */
    var o = localDe(uid, g), h = huellaDe(g, o);
    if (h === mg.h) return Promise.resolve("igual");
    if (!mg.h && !Object.keys(o).length) return Promise.resolve("vacio");   /* no crear documentos vacíos */
    var json = JSON.stringify(paraNube(g, o));
    if (json.length > maxGrupo(g)) return Promise.resolve("grande");   /* se queda solo en el dispositivo */
    var falta = (mg.s || 0) + cadaGrupo(modo) - Date.now();
    if (modo !== "forzar" && falta > 0) { programar(uid, g, falta + 500); return Promise.resolve("luego"); }
    /* ya hay una subida en camino: la forzada espera y vuelve a mirar (la
       que va en camino puede llevar un estado anterior) */
    if (enVuelo[g]) return modo === "forzar" ? enVuelo[g].then(function () { return subir(uid, g, modo); }) : enVuelo[g];
    var t = mg.t || Date.now();
    enVuelo[g] = token().then(function (tk) {
      return fetch(url(uid, g), {
        method: "PATCH",
        headers: { "Authorization": "Bearer " + tk, "Content-Type": "application/json" },
        body: JSON.stringify({ fields: { json: { stringValue: json }, t: { integerValue: String(t) } } })
      });
    }).then(function (r) {
      enVuelo[g] = null;
      if (!r.ok) return "http-" + r.status;
      var m2 = leerMeta(uid); m2.g[g] = m2.g[g] || {};
      m2.g[g].h = h; m2.g[g].s = Date.now(); m2.g[g].t = t;
      guardarMeta(uid, m2);
      return "subido";
    }, function () { enVuelo[g] = null; return "sin-red"; });
    return enVuelo[g];
  }
  function programar(uid, g, ms) {
    if (timers[g] || ms > 2147483000) return;
    timers[g] = setTimeout(function () { timers[g] = null; subir(uid, g); }, ms);
  }

  /* cambio local en una clave con nube: anota la hora y programa la subida */
  oyentes.push(function (k, uidAct) {
    var g = grupoDe(k);
    if (!g || !uidAct) return;
    var m = leerMeta(uidAct); m.g[g] = m.g[g] || {};
    m.g[g].t = Date.now();
    guardarMeta(uidAct, m);
    if (uidAct === uidNube()) subir(uidAct, g);     /* periódica: sube o programa para dentro de <= CADA */
  });

  /* Reconciliar un grupo con la nube:
     - primera vez de esta cuenta en el dispositivo: fusión (unión);
     - después: gana lo más reciente (t). */
  function reconciliar(uid, g, opts) {
    opts = opts || {};
    return bajar(uid, g).then(function (res) {
      if (uid !== uidNube()) return "sin-nube";
      var m = leerMeta(uid); m.g[g] = m.g[g] || {};
      /* el libro ya montó su pizarrón con lo local: la copia que llega tarde
         no se aplica en silencio. Queda sin «bajado» (nada sube, así que la
         nube no se pisa con lo viejo) y la próxima apertura fusiona. */
      if (opts.tarde && opts.tarde()) {
        m.g[g].bajado = 0; guardarMeta(uid, m);
        return "tarde";
      }
      /* «primera» se lee DESPUÉS del fetch: otra pestaña pudo fusionar
         mientras tanto, y fusionar dos veces sumaría las gemas dos veces */
      var primera = !m.g[g].bajado;
      if (res.estado === 404) {
        m.g[g].bajado = 1; if (!m.g[g].s) m.g[g].s = Date.now(); guardarMeta(uid, m);
        return "nube-vacia";
      }
      if (res.estado !== 200) return "http-" + res.estado;
      var local = localDe(uid, g), mg = m.g[g];
      var hn = huellaDe(g, res.datos);
      if (primera) {
        var f = fusionar(g, local, res.datos);
        escribirLocal(uid, g, f);
        mg.h = hn; mg.t = Math.max(mg.t || 0, res.t);
      } else if (res.t > (mg.t || 0) && hn !== huellaDe(g, local)) {
        /* otro dispositivo va adelante. El repaso de la nube está recortado:
           se une (no se reemplaza) para no perder lo que solo vive aquí */
        escribirLocal(uid, g, g === "srs" ? fusionar(g, local, res.datos) : res.datos);
        mg.h = hn; mg.t = res.t;
      } else if (!mg.h) { mg.h = hn; }
      mg.bajado = 1;
      if (!mg.s) mg.s = Date.now();     /* la periódica cuenta sus 30 min desde aquí */
      guardarMeta(uid, m);
      return "ok";
    }).then(function (st) {
      if (st === "ok" || st === "nube-vacia") return subir(uid, g, "forzar").then(function () { return st; });
      return st;
    }, function () { return "sin-red"; });
  }

  var sesionBajada = {}, bajando = null;
  function bajarTodo() {
    var uid = uidNube();
    if (!uid) return Promise.resolve("sin-nube");
    if (bajando) return bajando;                  /* una sola bajada a la vez */
    var marca = "vesper_nube_bajada:" + uid;
    var hecho = false;
    try { hecho = sessionStorage.getItem(marca) === "1"; } catch (e) {}
    if (hecho || sesionBajada[uid]) {
      /* ya se bajó en esta sesión: solo se sube lo pendiente */
      return Promise.all(Object.keys(GRUPOS).map(function (g) { return subir(uid, g); })).then(function () { return "pendientes"; });
    }
    sesionBajada[uid] = true;
    /* «primera» por grupo (se decide en reconciliar): un reintento tras un
       fallo parcial no vuelve a sumar las gemas de un grupo ya fusionado */
    bajando = Promise.all(Object.keys(GRUPOS).map(function (g) { return reconciliar(uid, g); }))
      .then(function (r) {
        var ok = r.every(function (x) { return x === "ok" || x === "nube-vacia"; });
        if (ok) {
          var m2 = leerMeta(uid); m2.bajado = 1; guardarMeta(uid, m2);
          try { sessionStorage.setItem(marca, "1"); } catch (e) {}
        } else { sesionBajada[uid] = false; }
        bajando = null;
        return ok ? "ok" : r.join(",");
      }, function () { bajando = null; sesionBajada[uid] = false; return "error"; });
    return bajando;
  }

  /* El libro: se baja al abrirlo, una vez por sesión del navegador. */
  /* opts.tarde(): true si el pizarrón ya se montó (libro.html, tope de 4 s) */
  function libro(bookId, opts) {
    var uid = uidNube();
    bookId = String(bookId || "");
    if (!uid || !LIBRO_ID.test(bookId)) return Promise.resolve("sin-nube");
    var g = "libro:" + bookId;
    var marca = "vesper_nube_libro:" + uid + ":" + bookId;
    try { if (sessionStorage.getItem(marca) === "1") return subir(uid, g); } catch (e) {}   /* ya se bajó: sube lo pendiente */
    return reconciliar(uid, g, opts).then(function (st) {
      if (st === "ok" || st === "nube-vacia") { try { sessionStorage.setItem(marca, "1"); } catch (e) {} }
      return st;
    });
  }

  /* subir lo pendiente. "ocultar": al esconder la página (piso de 60 s; lo
     que no sube queda marcado y sube después); "forzar": al cerrar sesión. */
  function vaciar(modo) {
    if (modo === true) modo = "forzar";
    var uid = uidNube();
    if (!uid) return Promise.resolve([]);
    var m = leerMeta(uid), gs = Object.keys(GRUPOS), g;
    for (g in m.g) if (gs.indexOf(g) < 0) gs.push(g);
    return Promise.all(gs.map(function (g) {
      if (timers[g]) { clearTimeout(timers[g]); timers[g] = null; }
      return subir(uid, g, modo || "ocultar");
    }));
  }
  enganchar();

  var nube = {
    bajarTodo: bajarTodo,
    libro: libro,
    subir: function (g, modo) { return subir(uidNube(), g, modo); },
    vaciar: vaciar,
    /* libro.html: el documento del libro sustituye a la página (document.write) */
    token: function (tk, uid) { if (tk && uidValido(uid)) tokenFijo = { token: tk, uid: uid }; },
    _meta: function (uid) { return leerMeta(uid || ns); }
  };

  /* Lo llama vesper_auth.js al crear la instancia de Firebase Auth. */
  var conectado = false;
  function _conectar(auth, projectId, claves) {
    if (projectId) base = projectId;
    if (claves && claves.length) personales = claves.slice();
    if (conectado || !auth) return;
    conectado = true;
    nubeAuth = auth;
    auth.onAuthStateChanged(function (user) {
      cambiar(user ? user.uid : "", user);
      if (user && user.emailVerified && user.uid === ns) bajarTodo();
    });
  }

  window.VesperCuenta = {
    ns: function () { return ns; },
    activa: function () { return rget(ACTIVA) || ""; },
    reclamadoPor: function () { return rget(RECLAMO) || ""; },
    recargando: function () { return congelado; },
    saliendo: marcarSalida,
    borrada: borrada,
    esAlumno: esAlumno,
    cambiar: cambiar,
    olvidar: olvidar,
    claves: function (uid) { return clavesDe(uid || ""); },
    raw: { get: rget, set: rset, remove: rdel },
    nube: nube,
    _conectar: _conectar,
    _enganchar: enganchar
  };
})();
