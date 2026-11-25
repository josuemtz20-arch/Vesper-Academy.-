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

  var ns = rget(ACTIVA) || "";
  if (ns && !uidValido(ns)) ns = "";
  var tocado = false;          /* ¿la página ya leyó algo del alumno? */
  var congelado = false;       /* recarga pendiente: no se escribe nada del alumno */
  var oyentes = [];

  SP.getItem = function (k) {
    if (this === ls && esAlumno(k)) { tocado = true; return rawGet.call(this, claveEn(ns, k)); }
    return rawGet.apply(this, arguments);
  };
  SP.setItem = function (k, v) {
    if (this === ls && esAlumno(k)) {
      if (congelado) return;
      var real = claveEn(ns, k), antes = rawGet.call(this, real);
      rawSet.call(this, real, v);               /* deja pasar QuotaExceededError, como siempre */
      if (antes !== String(v)) avisar(k);
      return;
    }
    return rawSet.apply(this, arguments);
  };
  SP.removeItem = function (k) {
    if (this === ls && esAlumno(k)) {
      if (congelado) return;
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
  function reclamarInvitado(uid) {
    if (rget(RECLAMO)) return false;
    if (!rset(RECLAMO, uid)) return false;
    clavesDe("").forEach(function (c) {
      var v = rget(c.real);
      var destino = claveEn(uid, c.clave);
      if (v !== null && rget(destino) === null) rset(destino, v);
      rdel(c.real);
    });
    return true;
  }

  var recargando = false;
  function recargar() {
    if (recargando) return true;
    recargando = true;
    /* tope anti-bucle: 3 recargas en 20 s y se deja de insistir */
    var ahora = Date.now(), hist = [];
    try { hist = JSON.parse(sessionStorage.getItem("vesper_cuenta_recargas") || "[]") || []; } catch (e) {}
    hist = hist.filter(function (t) { return ahora - t < 20000; });
    if (hist.length >= 3) { recargando = false; return false; }
    hist.push(ahora);
    try { sessionStorage.setItem("vesper_cuenta_recargas", JSON.stringify(hist)); } catch (e) {}
    var saliendo = false;
    window.addEventListener("beforeunload", function () { saliendo = true; });
    /* el «Cerrar sesión» de las páginas navega a login.html justo después */
    setTimeout(function () { if (!saliendo) location.reload(); }, 300);
    return true;
  }

  /* Cambia al registro de `uid` ("" = invitado). Lo llama vesper_auth.js en
     cada onAuthStateChanged; es idempotente. */
  function cambiar(uid) {
    uid = uidValido(uid) ? uid : "";
    if (FIJA) return ns;
    if (uid === ns && uid === (rget(ACTIVA) || "")) return ns;
    if (uid) reclamarInvitado(uid);
    if (uid) rset(ACTIVA, uid); else rdel(ACTIVA);
    if ((rget(ACTIVA) || "") !== uid) return ns;   /* almacenamiento roto: no recargar en bucle */
    if (uid === ns) return ns;
    if (!tocado) { ns = uid; return ns; }
    congelado = true;
    if (!recargar()) { congelado = false; ns = uid; }  /* tope de recargas: cambia en vivo */
    return ns;
  }

  /* Borra del dispositivo el registro de una cuenta (eliminar-cuenta.html). */
  function olvidar(uid) {
    if (!uidValido(uid)) return 0;
    var lista = clavesDe(uid);
    lista.forEach(function (c) { rdel(c.real); });
    if (rget(ACTIVA) === uid) rdel(ACTIVA);
    if (ns === uid) { ns = ""; }
    return lista.length;
  }

  /* ====================== nube (lo nuevo) ======================
     Documento: { json: "<JSON de { clave: valorCrudo }>", t: <ms de la última
     escritura local> }. Un string acotado en vez de mapas tipados: la regla
     mide su tamaño de un vistazo y el dueño es el único que lo lee. */
  var DB = "teachermanuals";
  var GRUPOS = {
    forja:    { claves: ["vesper_forja"], max: 300000, cada: 10 * 60000 },
    srs:      { claves: ["vesper_srs"], max: 300000, cada: 10 * 60000 },
    economia: { claves: ["vesper_economy", "vesper_cosmetics_seen"], max: 20000, cada: 2 * 60000 }
  };
  var LIBRO_PFX = "vesper_book_notes:", LIBRO_MAX = 250000, LIBRO_CADA = 10 * 60000;
  var REBOTE = 90000;           /* espera tras el último cambio antes de subir */

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
  function guardarMeta(uid, m) { rset(metaKey(uid), JSON.stringify(m)); }

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
  function cadaGrupo(g) { return g.indexOf("libro:") === 0 ? LIBRO_CADA : GRUPOS[g].cada; }
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

  function url(uid, g) {
    var b = "https://firestore.googleapis.com/v1/projects/" + (base || "vesper-academy") +
            "/databases/" + DB + "/documents/progress/" + encodeURIComponent(uid);
    if (g.indexOf("libro:") === 0) return b + "/libros/" + encodeURIComponent(g.slice(6));
    return b + "/datos/" + g;
  }
  function usuario() { return nubeAuth && nubeAuth.currentUser; }
  /* uid con nube: sesión verificada y página en su propio registro */
  function uidNube() {
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
    libro: function (a, b) {
      a = J(a, {}); b = J(b, {});
      var pa = a.pages || {}, pb = b.pages || {}, pages = {}, k;
      function n(p) { p = p || {}; return (p.strokes || []).length + (p.notes || []).length + (p.texts || []).length + (p.shapes || []).length; }
      for (k in pb) pages[k] = pb[k];
      for (k in pa) if (!pages[k] || n(pa[k]) >= n(pages[k])) pages[k] = pa[k];
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
  function subir(uid, g, forzar) {
    if (!uid || uid !== uidNube()) return Promise.resolve("sin-nube");
    var m = leerMeta(uid), mg = m.g[g] || {};
    if (!mg.bajado) return Promise.resolve("espera-bajada");   /* nunca subir sin haber fusionado antes */
    var o = localDe(uid, g), h = huella(normal(g, o));
    if (h === mg.h) return Promise.resolve("igual");
    if (!mg.h && !Object.keys(o).length) return Promise.resolve("vacio");   /* no crear documentos vacíos */
    var json = JSON.stringify(o);
    if (json.length > maxGrupo(g)) return Promise.resolve("grande");   /* se queda solo en el dispositivo */
    var falta = (mg.s || 0) + cadaGrupo(g) - Date.now();
    if (!forzar && falta > 0) { programar(uid, g, falta + 500); return Promise.resolve("luego"); }
    if (enVuelo[g]) return enVuelo[g];
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
    if (timers[g]) return;
    timers[g] = setTimeout(function () { timers[g] = null; subir(uid, g); }, ms);
  }

  /* cambio local en una clave con nube: anota la hora y programa la subida */
  oyentes.push(function (k, uidAct) {
    var g = grupoDe(k);
    if (!g || !uidAct) return;
    var m = leerMeta(uidAct); m.g[g] = m.g[g] || {};
    m.g[g].t = Date.now();
    guardarMeta(uidAct, m);
    if (uidAct === uidNube()) programar(uidAct, g, REBOTE);
  });

  /* Reconciliar un grupo con la nube:
     - primera vez de esta cuenta en el dispositivo: fusión (unión);
     - después: gana lo más reciente (t). */
  function reconciliar(uid, g, primera) {
    return bajar(uid, g).then(function (res) {
      var m = leerMeta(uid); m.g[g] = m.g[g] || {};
      if (res.estado === 404) {
        m.g[g].bajado = 1; guardarMeta(uid, m);
        return "nube-vacia";
      }
      if (res.estado !== 200) return "http-" + res.estado;
      var local = localDe(uid, g), mg = m.g[g];
      var hn = huella(normal(g, res.datos));
      if (primera) {
        var f = fusionar(g, local, res.datos);
        escribirLocal(uid, g, f);
        mg.h = hn; mg.t = Math.max(mg.t || 0, res.t);
      } else if (res.t > (mg.t || 0) && hn !== huella(normal(g, local))) {
        escribirLocal(uid, g, res.datos);          /* otro dispositivo va adelante */
        mg.h = hn; mg.t = res.t;
      } else if (!mg.h) { mg.h = hn; }
      mg.bajado = 1;
      guardarMeta(uid, m);
      return "ok";
    }).then(function (st) {
      if (st === "ok" || st === "nube-vacia") return subir(uid, g, true).then(function () { return st; });
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
    var m = leerMeta(uid);
    /* «primera» por grupo: un reintento tras un fallo parcial no vuelve a
       sumar las gemas de un grupo que ya se fusionó */
    bajando = Promise.all(Object.keys(GRUPOS).map(function (g) { return reconciliar(uid, g, !(m.g[g] || {}).bajado); }))
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
  function libro(bookId) {
    var uid = uidNube();
    bookId = String(bookId || "").slice(0, 60);
    if (!uid || !bookId) return Promise.resolve("sin-nube");
    var g = "libro:" + bookId;
    var marca = "vesper_nube_libro:" + uid + ":" + bookId;
    try { if (sessionStorage.getItem(marca) === "1") return subir(uid, g); } catch (e) {}   /* ya se bajó: sube lo pendiente */
    var mg = leerMeta(uid).g[g] || {};
    return reconciliar(uid, g, !mg.bajado).then(function (st) {
      if (st === "ok" || st === "nube-vacia") { try { sessionStorage.setItem(marca, "1"); } catch (e) {} }
      return st;
    });
  }

  /* subir lo pendiente al ocultar la página (respeta el mínimo entre subidas:
     lo que no sube aquí queda marcado y sube en la próxima carga) */
  function vaciar() {
    var uid = uidNube();
    if (!uid) return;
    var m = leerMeta(uid);
    for (var g in m.g) { if (timers[g]) { clearTimeout(timers[g]); timers[g] = null; } subir(uid, g); }
  }
  function enganchar() {
    try {
      document.addEventListener("visibilitychange", function () { if (document.visibilityState === "hidden") vaciar(); });
    } catch (e) {}
  }
  enganchar();

  var nube = {
    bajarTodo: bajarTodo,
    libro: libro,
    subir: function (g, forzar) { return subir(uidNube(), g, forzar); },
    vaciar: vaciar,
    /* libro.html: el documento del libro sustituye a la página (document.write) */
    token: function (tk, uid) { if (tk && uidValido(uid)) tokenFijo = { token: tk, uid: uid }; },
    _meta: function (uid) { return leerMeta(uid || ns); }
  };

  /* Lo llama vesper_auth.js al crear la instancia de Firebase Auth. */
  var conectado = false;
  function _conectar(auth, projectId) {
    if (projectId) base = projectId;
    if (conectado || !auth) return;
    conectado = true;
    nubeAuth = auth;
    auth.onAuthStateChanged(function (user) {
      cambiar(user ? user.uid : "");
      if (user && user.emailVerified && user.uid === ns) bajarTodo();
    });
  }

  window.VesperCuenta = {
    ns: function () { return ns; },
    activa: function () { return rget(ACTIVA) || ""; },
    reclamadoPor: function () { return rget(RECLAMO) || ""; },
    recargando: function () { return congelado; },
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
