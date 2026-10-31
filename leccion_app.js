/* leccion_app.js — la app de lecciones gratis (leccion.html).
 * Salio del <script> en linea el 2026-10-29 para que el navegador la
 * guarde en cache. Se carga con defer, despues de los bancos de
 * lecciones; examenes, Forja, tour y liga se piden bajo demanda (need()). */
(function () {
  var qs = new URLSearchParams(location.search);
  var id = qs.get("id");
  if (window.VESPER_ACTIVITIES && VESPER_ACTIVITIES.merge) VESPER_ACTIVITIES.merge(window.VESPER_LESSONS, window.VESPER_LESSONS_ORDER);
  if (window.VESPER_CONTENT_PACK && VESPER_CONTENT_PACK.merge) VESPER_CONTENT_PACK.merge(window.VESPER_LESSONS, window.VESPER_LESSONS_ORDER);
  if (window.VESPER_EXPANSION && VESPER_EXPANSION.merge) VESPER_EXPANSION.merge(window.VESPER_LESSONS, window.VESPER_LESSONS_ORDER);
  if (window.VESPER_EXPANSION2 && VESPER_EXPANSION2.merge) VESPER_EXPANSION2.merge(window.VESPER_LESSONS, window.VESPER_LESSONS_ORDER);
  if (window.VESPER_EXPANSION3 && VESPER_EXPANSION3.merge) VESPER_EXPANSION3.merge(window.VESPER_LESSONS, window.VESPER_LESSONS_ORDER);
  if (window.VESPER_TOEFL_PACK && VESPER_TOEFL_PACK.merge) VESPER_TOEFL_PACK.merge(window.VESPER_LESSONS, window.VESPER_LESSONS_ORDER);
  if (window.VESPER_LEVELS_PACK && VESPER_LEVELS_PACK.merge) VESPER_LEVELS_PACK.merge(window.VESPER_LESSONS, window.VESPER_LESSONS_ORDER);
  if (window.VESPER_THEMES_PACK && VESPER_THEMES_PACK.merge) VESPER_THEMES_PACK.merge(window.VESPER_LESSONS, window.VESPER_LESSONS_ORDER);
  if (window.VESPER_THEMES_PACK2 && VESPER_THEMES_PACK2.merge) VESPER_THEMES_PACK2.merge(window.VESPER_LESSONS, window.VESPER_LESSONS_ORDER);
  if (window.VESPER_THEMES_PACK3 && VESPER_THEMES_PACK3.merge) VESPER_THEMES_PACK3.merge(window.VESPER_LESSONS, window.VESPER_LESSONS_ORDER);
  var L = window.VESPER_LESSONS || {};
  var ORDER = window.VESPER_LESSONS_ORDER || Object.keys(L);
  var A = window.VESPER_ADAPTIVE || null;
  var PATH = window.VESPER_PATH || null;
  var DENS = window.VESPER_VOCAB_DENS || null;
  var _denCache = null;
  function densData() { if (!_denCache && DENS && DENS.build) _denCache = DENS.build(L, ORDER); return _denCache || {}; }
  var PERS = window.VESPER_PERSONA || null;
  var M = window.VESPER_MASCOT;
  var P = window.VesperProgress;
  var app = document.getElementById("app");
  /* dentro de una lección no hay pestañas: sólo la lección (ver leccion.css, TACTO) */
  if (id) document.body.classList.add("in-lesson");

  /* ---- modulos bajo demanda ----
     Para pintar el inicio y el mapa no hacen falta los examenes, la Forja, el
     paseo guiado ni la liga, y entre todos pesan ~250 KB. Llegan cuando se usan
     (el enrutador del final los pide antes de despachar) o en reposo, tras pintar
     el mapa. Cada grupo se carga en orden: level_exams completa a boss_exams. */
  var LAZY = {
    exams: ["vesper_boss_exams.js", "vesper_level_exams.js"],
    forja: ["vesper_forja.js"],
    tour: ["vesper_tour.js"],
    league: ["vesper_league.js", "vesper_league_cloud.js"]
  };
  var _lazy = {};
  function loadScript(src) {
    return new Promise(function (ok, ko) {
      var el = document.createElement("script");
      el.src = src; el.onload = ok; el.onerror = ko;
      document.head.appendChild(el);
    });
  }
  function need(name) {
    if (!_lazy[name]) {
      _lazy[name] = LAZY[name].reduce(function (p, src) {
        return p.then(function () { return loadScript(src); });
      }, Promise.resolve());
      _lazy[name].catch(function () { delete _lazy[name]; });   /* sin red: se reintenta luego */
    }
    return _lazy[name];
  }
  function whenIdle(fn) {
    if (window.requestIdleCallback) requestIdleCallback(fn, { timeout: 4000 }); else setTimeout(fn, 1200);
  }
  /* lo opcional espera a que termine la carga: no compite con el mapa por la red */
  function afterLoad(fn) {
    if (document.readyState === "complete") whenIdle(fn);
    else window.addEventListener("load", function () { whenIdle(fn); });
  }

  var lesson = null, baseLesson = null, profile = (A && A.getProfile) ? A.getProfile() : null;
  var exIdx = 0, results = [], earnedXp = 0;
  var combo = 0, maxCombo = 0;   /* aciertos consecutivos dentro de la lección (Fase A) */

  function esc(s) {
    return ("" + (s == null ? "" : s)).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  /* ---- anuncios para lectores de pantalla ----
     Región viva pequeña y dedicada. Se limpia antes de escribir para que dos
     mensajes iguales seguidos ("Correcto" dos veces) sí se vuelvan a anunciar. */
  var _srEl = null;
  function announce(msg) {
    if (!msg) return;
    if (!_srEl) _srEl = document.getElementById("sr-announce");
    if (!_srEl) return;
    _srEl.textContent = "";
    setTimeout(function () { if (_srEl) _srEl.textContent = msg; }, 60);
  }

  /* show(html) es el ÚNICO punto donde se escribe la pantalla.
     Al reemplazar innerHTML el foco caía a <body>: quien usa teclado volvía al
     principio del documento en cada paso y quien usa lector de pantalla no se
     enteraba de que la pantalla había cambiado. Ahora movemos el foco al título
     de la pantalla nueva, que es lo que la anuncia. */
  function show(html) {
    app.innerHTML = html;
    window.scrollTo(0, 0);
    focusScreen();
  }
  function focusScreen() {
    var h = app.querySelector("h1, h2, [data-screen-title]");
    if (!h) h = app.querySelector(".card, .wrap") || app;
    try {
      if (!h.hasAttribute("tabindex")) h.setAttribute("tabindex", "-1");
      h.focus({ preventScroll: true });
    } catch (e) { try { h.focus(); } catch (e2) {} }
    window.scrollTo(0, 0);
  }

  /* tipo de lección: "aprende" (enseña con secciones ricas) o "practica"
     (ejercita). Campo opcional en los datos: sin campo = práctica, así las
     lecciones existentes no cambian. */
  function tipoOf(l) { return (l && l.tipo === "aprende") ? "aprende" : "practica"; }
  function tipoChip(l) {
    var ap = tipoOf(l) === "aprende";
    return '<span class="tipo-chip ' + (ap ? "t-aprende" : "t-practica") + '">' + (ap ? "Aprende" : "Pr&aacute;ctica") + '</span>';
  }

  /* ---- Embudo: medición + CTA al examen de nivel (book_placement.html) ---- */
  function track(ev, props) { try { if (window.VA) VA.track(ev, props || {}); } catch (e) {} }
  function goLead(src) {
    if (window.VA) { VA.goPlacement(src); return; }
    location.href = "book_placement.html?src=" + encodeURIComponent(src || "leccion");
  }
  /* icono de birrete (clase real / nivel) — oscuro sobre el medallón dorado */
  var CTA_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4 2.5 8.2 12 12.4l9.5-4.2z"/><path d="M5.5 10v4.2c0 1.5 2.9 2.8 6.5 2.8s6.5-1.3 6.5-2.8V10"/><path d="M21.5 8.2v5.1"/></svg>';
  function placementCard(src, opts) {
    opts = opts || {};
    var t = opts.title || "¿Listo para hablar inglés de verdad?";
    var s = opts.sub || "Haz tu examen de nivel gratis y un profesor te arma un plan.";
    var cls = opts.compact ? "pcta pcta--mini" : "pcta";
    return '<button class="' + cls + '" type="button" data-cta-src="' + esc(src) + '">'
      + '<span class="pcta__ic">' + CTA_ICON + '</span>'
      + '<span class="pcta__tx"><span class="pcta__t">' + esc(t) + '</span>'
      + '<span class="pcta__s">' + esc(s) + '</span></span>'
      + '<span class="pcta__go">&rarr;</span></button>';
  }
  function bindCta() {
    each("[data-cta-src]", function (b) {
      b.onclick = function () { goLead(b.getAttribute("data-cta-src")); };
    });
  }

  function mascot(state, line, size) {
    if (window.VESPER_MASCOT && VESPER_MASCOT.render) {
      return VESPER_MASCOT.render(state, { line: (line != null ? line : undefined), size: size || "md" });
    }
    return '<div class="mascot"><img class="mascot-img" src="assets/images/virtual_class_happy_cat.png" alt="Vesper Cat">'
      + (line ? '<div class="bubble">' + esc(line) + '</div>' : '') + '</div>';
  }
  function topbar(pct, extra) {
    /* la barra era un div decorativo: sin role ni valor, quien no la ve no
       sabía cuánto le falta. Y "Salir" no decía a dónde. */
    var back = id ? "Salir de la lección y volver al mapa" : "Volver al inicio";
    /* dentro de una lección se SALE (X), fuera se vuelve (flecha) */
    var glyph = id
      ? '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>'
      : '&#8592;';
    return '<div class="topbar"><a class="back" href="' + (id ? 'leccion.html' : 'index.html') + '" aria-label="' + back + '">' + glyph + '</a>'
      + '<div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + Math.round(pct) + '"'
      + ' aria-label="Progreso de la lección">'
      + '<div class="bar" style="width:' + pct + '%"></div></div>' + (extra || '') + '</div>';
  }
  /* feedbackBox(ok, explanation, wrongFallback)
     - explanation: el "por que" del ejercicio (se muestra al fallar siempre y
       al acertar si la persona pidio retro explicativa: explainOnCorrect).
     - wrongFallback: texto solo-al-fallar (p.ej. "Respuesta: ...").
     - la frase de la mascota sale en el TONO elegido (VESPER_PERSONA.line). */
  /* efecto de sonido de acierto/error. Ahora delega en el módulo compartido
     VESPER_SFX (sonidos más cálidos + haptics). Conserva la firma playFx(ok)
     para no tocar las llamadas existentes desde feedbackBox. Si el módulo no
     cargó, cae a un beep WebAudio local (degradación). */
  var _actx = null;
  function playFx(ok) {
    if (window.VESPER_SFX) { try { ok ? VESPER_SFX.correct() : VESPER_SFX.wrong(); return; } catch (e) {} }
    try {
      if (window.VESPER_PREFS && !VESPER_PREFS.soundEnabled()) return;
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      _actx = _actx || new AC();
      if (_actx.state === "suspended") { try { _actx.resume(); } catch (e) {} }
      var t = _actx.currentTime;
      var notes = ok ? [660, 990] : [300, 200];
      notes.forEach(function (f, i) {
        var o = _actx.createOscillator(), g = _actx.createGain();
        o.type = "sine"; o.frequency.value = f;
        var t0 = t + i * 0.09;
        g.gain.setValueAtTime(0.0001, t0);
        g.gain.exponentialRampToValueAtTime(0.12, t0 + 0.01);
        g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.16);
        o.connect(g); g.connect(_actx.destination);
        o.start(t0); o.stop(t0 + 0.18);
      });
    } catch (e) {}
  }
  /* atajo seguro para disparar un cue con nombre del módulo de sonido */
  function sfx(name, arg) { try { if (window.VESPER_SFX && VESPER_SFX[name]) VESPER_SFX[name](arg); } catch (e) {} }
  /* icono SVG de marca por nombre, en línea (envuelto en .ei para alinear y
     escalar con el texto). "" si el set no cargó. */
  function ic(name) {
    var s = (window.VESPER_ICN && VESPER_ICN[name]) ? VESPER_ICN[name] : "";
    return s ? '<span class="ei">' + s + '</span>' : "";
  }

  /* lluvia de confeti DOM, ligera y autolimpiable. Respeta prefers-reduced-motion
     (en ese caso el CSS la oculta). n = nº de piezas. */
  function burstConfetti(n) {
    try {
      if (window.matchMedia && matchMedia("(prefers-reduced-motion:reduce)").matches) return;
      n = n || 24;
      /* la paleta de la marca: oros y cremas del lucero, no arcoíris */
      var cols = ["#C9A84C", "#f3e2ab", "#dcc173", "#f5f2eb", "#a8843d", "#e9d39a"];
      var box = document.createElement("div"); box.className = "confetti";
      var html = "", i;
      for (i = 0; i < n; i++) {
        var left = Math.round(Math.random() * 100);
        var delay = Math.round(Math.random() * 240);
        var dur = 1500 + Math.round(Math.random() * 900);
        var col = cols[i % cols.length];
        html += '<i style="left:' + left + '%;background:' + col + ';--cf-dur:' + dur
          + 'ms;animation-delay:' + delay + 'ms"></i>';
      }
      box.innerHTML = html;
      document.body.appendChild(box);
      setTimeout(function () { if (box.parentNode) box.parentNode.removeChild(box); }, 2900);
    } catch (e) {}
  }

  function feedbackBox(ok, explanation, wrongFallback) {
    playFx(ok);
    var state = ok ? "correct" : "incorrect";
    var line = (PERS && PERS.line) ? PERS.line(state) : "";
    if (!line) line = (window.VESPER_MASCOT ? VESPER_MASCOT.get(state).line : (ok ? "Bien!" : "Casi..."));
    var showExp = (PERS && PERS.explainOnCorrect) ? (!ok || PERS.explainOnCorrect()) : !ok;
    var detail = ok ? (showExp ? (explanation || "") : "") : (explanation || wrongFallback || "");
    var cat = (window.VESPER_MASCOT && VESPER_MASCOT.render)
      ? VESPER_MASCOT.render(state, { size: "sm", line: false })
      : '<img class="fb-cat" src="assets/images/virtual_class_happy_cat.png" alt="">';
    return '<div class="fbbox ' + (ok ? "ok" : "no") + '">' + cat
      + '<div><b>' + (ok ? "¡Correcto!" : "Incorrecto") + '</b><div class="muted">' + esc(line) + '</div>'
      + (detail ? '<div class="explain">' + esc(detail) + '</div>' : '') + '</div></div>';
  }
  function shuffle(arr, avoid) {
    for (var k = 0; k < 10; k++) {
      for (var i = arr.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = arr[i]; arr[i] = arr[j]; arr[j] = t; }
      if (!avoid || arr.join(" ") !== avoid.join(" ")) break;
    }
    return arr;
  }
  /* Orden en pantalla de las opciones, barajado en cada intento: sin esto,
     "toca siempre la segunda" aprobaba lecciones. Cada botón conserva su
     índice original en data-i, así que calificar (correctIndex) y mostrar
     "Era: ..." no cambian. */
  function optOrder(n) { var a = []; for (var i = 0; i < n; i++) a.push(i); return shuffle(a); }

  /* ---------- INDEX / HUB progresivo (no ?id=) ---------- */
  function toast(msg) {
    var t = byId("toast"); if (!t) return;
    t.textContent = msg; t.classList.add("show");
    clearTimeout(t._h); t._h = setTimeout(function () { t.classList.remove("show"); }, 1900);
  }

  /* ---------- Mapa de mundos (HUB estilo videojuego) ---------- */
  /* la liga semanal (tier + tu puesto), tappable. Se pinta en su hueco del HUD
     cuando vesper_league.js ya llegó (se pide en reposo, tras el mapa). */
  function fillLeagueTile() {
    var slot = byId("leagueTile");
    if (!slot || !window.VESPER_LEAGUE || !VESPER_LEAGUE.tier) return;
    try {
      var lt = VESPER_LEAGUE.tier(), lr = VESPER_LEAGUE.myRank();
      var lic = (window.VESPER_ICN ? VESPER_ICN.tier(lt.id) : (lt.icon || ""));
      var a = document.createElement("a");
      a.className = "hstat hstat--link"; a.href = "liga.html";
      var tierName = lt.name.replace(/^Liga\s+/, "");
      a.setAttribute("aria-label", "Liga de práctica " + tierName + " (rivales simulados), puesto " + lr);
      a.title = "Liga semanal de práctica: compites con rivales simulados";
      a.innerHTML = '<span class="hstat__ic hstat__ic--badge">' + lic + '</span>'
        + '<span class="hstat__tx"><span class="hstat__v">' + lr + 'º</span><span class="hstat__l">' + esc(tierName) + '</span><span class="hstat__sub">práctica</span></span>';
      slot.replaceWith(a);
    } catch (e) {}
  }
  function hudHtml(st, dg, hello, info) {
    info = info || {};
    /* tarjetas de estadística (icono de marca + valor + etiqueta) */
    var tiles = '<div class="hstat"><span class="hstat__ic">' + HUB_ICN.flame + '</span>'
      + '<span class="hstat__tx"><span class="hstat__v">' + (st.streak || 0) + '</span><span class="hstat__l">Racha</span></span></div>'
      + '<div class="hstat"><span class="hstat__ic">' + HUB_ICN.star + '</span>'
      + '<span class="hstat__tx"><span class="hstat__v">' + (st.xp || 0) + '</span><span class="hstat__l">XP</span></span></div>';
    /* en lugar de la meta diaria: la liga semanal (tier + tu puesto), tappable */
    /* La liga compite contra rivales simulados: antes de la primera lección
       el "15º Bronce" solo confundía. Sale cuando ya hay XP. */
    if ((st.xp || 0) > 0) tiles += '<span id="leagueTile" hidden></span>';
    if (st.shields || 0) {
      tiles += '<div class="hstat"><span class="hstat__ic">' + HUB_ICN.shield + '</span>'
        + '<span class="hstat__tx"><span class="hstat__v">' + st.shields + '</span><span class="hstat__l">Escudos</span></span></div>';
    }
    var idLine = info.band
      ? '<span class="hub-lvl">Nivel ' + esc(info.band) + (info.bandTag ? ' · ' + esc(info.bandTag) : '') + '</span>'
      : '<p class="hub-sub">Elige tu aventura, paso a paso.</p>';
    var hv = currentLook();   /* su Vesper de verdad, para el botón del guardarropa */
    /* Cabecera ligera (2026-10-30). El dueño: "está muy cargada, la gente no
       va a entender cómo funciona". Tenía saludo + gato + cuatro botones +
       píldora de nivel + chip de nube + tres tarjetas: diez cosas antes de la
       lección. Ahora son tres renglones. Lo que se fue no se perdió:
       el chat ya flota abajo a la derecha, Ajustes vive en el dock, y el
       guardarropa ES el retrato (con su pincel, para que se lea que se toca).
       La nube calla cuando todo va bien: el chip sólo se ve si hay problema. */
    return '<header class="hub-hero hub-hero--lite">'
      + '<div class="hub-hero__top">'
      + '<a class="hub-me" href="configuracion.html#apariencia" aria-label="Vestir a Vesper" title="Vestir a Vesper">'
      + '<img src="' + hv.src + '" alt="" decoding="async"' + (hv.animal ? '' : ' class="is-tinted"') + '>'
      + '<span class="hub-me__pen" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h4L19 9l-4-4L4 16z"/><path d="m13.5 6.5 4 4"/></svg></span></a>'
      + '<div class="hub-hero__id"><h1 class="hub-hello">' + esc(hello) + '</h1>'
      + '<div class="hub-idrow">' + idLine + '<span class="hub-sync" id="syncSlot"></span></div></div>'
      + '<button class="hub-ic" id="searchToggle" type="button" aria-label="Buscar lecciones" aria-controls="hubSearch" aria-expanded="false" title="Buscar">' + HUB_ICN.search + '</button>'
      + '</div>'
      + '<div class="hub-stats3">' + tiles + '</div>'
      + '</header>';
  }

  /* cada mundo (nivel) = ilustración + nombre + identidad temática (acento, atmósfera, partículas)
     + jefe (Guardián del mundo: examen mixto que abre el siguiente nivel). */
  var WORLD_THEME = {
    A1: { file: "assets/images/map/banner_a1.jpg",           worldName: "El Hogar",             accent:"#C07A33", accentInk:"#8f5722", accentSoft:"rgba(192,122,51,.15)", glow:"rgba(192,122,51,.40)", ambientName:"hearth",    ambientN:7,  mapN:3, boss:{ name:"El Centinela del Hogar",  pass:85 }, biome:["cottage","bush","lantern","pine","bush"] },
    A2: { file: "assets/images/map/banner_a2.jpg",           worldName: "El Sendero",           accent:"#5E8A4E", accentInk:"#3f6234", accentSoft:"rgba(94,138,78,.15)",  glow:"rgba(94,138,78,.38)",  ambientName:"trail",     ambientN:7,  mapN:4, boss:{ name:"El Guardián del Sendero", pass:85 }, biome:["pine","pine","bush","mushroom","fern"] },
    B1: { file: "assets/images/map/banner_b1.jpg",           worldName: "El Horizonte",         accent:"#3D86B0", accentInk:"#2b607f", accentSoft:"rgba(61,134,176,.15)", glow:"rgba(61,134,176,.34)", ambientName:"skyline",   ambientN:9,  mapN:3, boss:{ name:"El Vigía del Horizonte",  pass:85 }, biome:["building","building","lamp","tower","rock"] },
    B2: { file: "assets/images/map/banner_b2.jpg",           worldName: "La Torre",             accent:"#A8762E", accentInk:"#7a5520", accentSoft:"rgba(168,118,46,.15)", glow:"rgba(168,118,46,.42)", ambientName:"ascent",    ambientN:6,  mapN:3, boss:{ name:"El Heraldo de la Torre",  pass:88 }, biome:["crag","rock","crag","banner","pine"] },
    C1: { file: "assets/images/map/banner_c1.jpg",           worldName: "El Firmamento",        accent:"#6A5FA8", accentInk:"#4c4383", accentSoft:"rgba(106,95,168,.16)", glow:"rgba(106,95,168,.40)", ambientName:"starfield", ambientN:10, mapN:6, boss:{ name:"El Custodio del Firmamento", pass:90 }, biome:["star4","planet","crystal","star4"] },
    C2: { file: "assets/images/map/banner_c2.jpg",           worldName: "El Castillo del Saber",accent:"#3FA08A", accentInk:"#2b7061", accentSoft:"rgba(63,160,138,.16)", glow:"rgba(63,160,138,.36)", ambientName:"aurora",    ambientN:7,  mapN:2, boss:{ name:"El Soberano del Saber",   pass:92 }, biome:["spire","banner","crystal","pine"] }
  };
  /* Fondo del relieve de la isla. Es la lámina de tema (una foto suave que sólo
     se ve al 20 % y enmascarada), NO el banner: si ambos comparten archivo, la
     misma imagen sale dos veces en la pantalla. */
  var WORLD_TERRAIN = {
    A1: "assets/images/lessons/theme_home.jpg",   A2: "assets/images/lessons/theme_nature.jpg",
    B1: "assets/images/lessons/theme_city.jpg",   B2: "assets/images/lessons/theme_business.jpg",
    C1: "assets/images/lessons/theme_space.jpg",  C2: "assets/images/lessons/theme_fantasy.jpg"
  };
  var WORLD_TAG = { A1: "Principiante", A2: "Básico", B1: "Intermedio", B2: "Intermedio alto", C1: "Avanzado", C2: "Maestría" };
  /* nombre corto de mundo para la cinta selectora (C2 abreviado para no desbordar) */
  var WORLD_SHORT = { A1: "El Hogar", A2: "El Sendero", B1: "El Horizonte", B2: "La Torre", C1: "El Firmamento", C2: "El Castillo" };
  /* iconos SVG de marca para el hero (estadísticas + acciones) — sin emojis */
  var HUB_ICN = {
    flame:  '<svg class="ic-flame" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13 2c.4 2.9-1.1 4.4-2.6 5.9C9 9.3 8 10.9 8 13a4.5 4.5 0 0 0 9 0c0-1.4-.5-2.6-1.3-3.6-.3.9-1 1.5-1.9 1.7 1-2.3.3-4.9-1.8-7.1z"/><path class="ic-flame__core" d="M12 12.4c-1 .6-1.5 1.5-1.5 2.5a1.8 1.8 0 0 0 3.6 0c0-.8-.4-1.5-1.1-2-.2.5-.6.8-1 .9.3-.5.3-.9 0-1.3z" fill="#fff" opacity=".5"/></svg>',
    star:   '<svg class="ic-star" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 3.4l2.5 5 5.5.6-4.1 3.7 1.1 5.4L12 16.9l-5 2.6 1.1-5.4-4.1-3.7 5.5-.6z"/><circle class="ic-star__tw" cx="18.6" cy="5.8" r="1.5" fill="#fff"/></svg>',
    shield: '<svg class="ic-shield" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.5l7 2.6v5.4c0 4.9-3.2 7.9-7 9.5-3.8-1.6-7-4.6-7-9.5V5.1z"/><path class="ic-shield__gl" d="M8.6 7.2l3-1.1M8.2 9.8l5-1.9" stroke="#fff" stroke-width="1.1" stroke-linecap="round" fill="none" opacity="0"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>',
    chat:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.5 8.5 0 0 1-12.2 7.7L3 21l1.9-5.6A8.5 8.5 0 1 1 21 11.5z"/></svg>',
    gear:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 13a7.7 7.7 0 0 0 0-2l2-1.5-2-3.4-2.3 1a7.7 7.7 0 0 0-1.7-1l-.4-2.5h-4l-.4 2.5a7.7 7.7 0 0 0-1.7 1l-2.3-1-2 3.4 2 1.5a7.7 7.7 0 0 0 0 2l-2 1.5 2 3.4 2.3-1a7.7 7.7 0 0 0 1.7 1l.4 2.5h4l.4-2.5a7.7 7.7 0 0 0 1.7-1l2.3 1 2-3.4z"/></svg>'
  };
  /* iconos SVG de marca para los logros (reemplazan emojis); van oscuros sobre el medallón dorado */
  var ACH_ICON = {
    /* Primeros pasos — huella de gato */
    "first-lesson": '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><ellipse cx="6.6" cy="11" rx="1.7" ry="2.2"/><ellipse cx="10" cy="8" rx="1.8" ry="2.4"/><ellipse cx="14" cy="8" rx="1.8" ry="2.4"/><ellipse cx="17.4" cy="11" rx="1.7" ry="2.2"/><path d="M12 12.4c-2.5 0-4.4 1.9-4.4 3.9 0 1.5 1.1 2.5 2.6 2.5.9 0 1.4-.4 1.8-.4s.9.4 1.8.4c1.5 0 2.6-1 2.6-2.5 0-2-1.9-3.9-4.4-3.9z"/></svg>',
    /* Tomando ritmo — huellas (pasos) */
    "lessons-5": '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M9 3.4c1.4 0 2.3 1.7 2.3 3.7 0 1.5-.6 2.7-1.7 2.9-1.1.2-2-.8-2.2-2.4C7.2 5.9 7.6 3.4 9 3.4z"/><path d="M7.5 12.1c1.3-.2 2 .6 2 1.6 0 .8-.6 1.3-1.6 1.3-.9 0-1.7-.5-1.7-1.3 0-.7.5-1.5 1.3-1.6z"/><path d="M15 9.3c1.4 0 2.3 1.7 2.3 3.7 0 1.5-.6 2.7-1.7 2.9-1.1.2-2-.8-2.2-2.4-.2-1.7.2-4.2 1.6-4.2z"/><path d="M13.5 18c1.3-.2 2 .6 2 1.6 0 .8-.6 1.3-1.6 1.3-.9 0-1.7-.5-1.7-1.3 0-.7.5-1.5 1.3-1.6z"/></svg>',
    /* En marcha — figura corriendo */
    "lessons-25": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="14.6" cy="4.4" r="1.9"/><path d="M13.9 7.3 10.4 9.2l1.8 3.1 3.3 1.4M12.4 12.3l-2.5 2.9L6.9 16.4M15.5 10.6l3.4 2.5M9.7 8.7 6.9 8.1"/></svg>',
    /* Imparable — cohete */
    "lessons-50": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2.6c2.7 1.5 4.1 4.4 4.1 7.8 0 1.4-.3 2.6-.5 3.4H8.4c-.2-.8-.5-2-.5-3.4 0-3.4 1.4-6.3 4.1-7.8z"/><circle cx="12" cy="9.4" r="1.5"/><path d="M8.5 13.6 6.4 16.2l3 .3M15.5 13.6l2.1 2.6-3 .3M10.4 17.3v2.4M13.6 17.3v2.4"/></svg>',
    /* Centurión — medalla con estrella y cintas */
    "lessons-100": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8.6 3.5l2.2 5M15.4 3.5l-2.2 5"/><circle cx="12" cy="14.6" r="5.4"/><path d="M12 11.9l.9 1.9 2 .2-1.5 1.4.5 2-1.9-1-1.9 1 .5-2-1.5-1.4 2-.2z" fill="currentColor" stroke="none"/></svg>',
    /* Sin errores — diana */
    "perfect": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="8.4"/><circle cx="12" cy="12" r="4.7"/><circle cx="12" cy="12" r="1.4" fill="currentColor"/></svg>',
    /* Meta del día — check en círculo */
    "goal-met": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8.4"/><path d="M8 12.2l2.7 2.7L16 9.2"/></svg>',
    /* Una semana — llama */
    "streak-7": '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13 2c.4 2.9-1.1 4.4-2.6 5.9C9 9.3 8 10.9 8 13a4.5 4.5 0 0 0 9 0c0-1.4-.5-2.6-1.3-3.6-.3.9-1 1.5-1.9 1.7 1-2.3.3-4.9-1.8-7.1z"/></svg>',
    /* Un mes entero — calendario */
    "streak-30": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="5.5" width="16" height="15" rx="2.5"/><path d="M4 9.6h16M8 3.4v4M16 3.4v4"/><path d="M8.4 13h2.2M13.4 13h2.2M8.4 16.6h2.2M13.4 16.6h2.2"/></svg>',
    /* Maestría — trofeo */
    "trophy": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 4.5h10v4a5 5 0 0 1-10 0z"/><path d="M7 6.2H4.6v1.4A3.4 3.4 0 0 0 8 11M17 6.2h2.4v1.4A3.4 3.4 0 0 1 16 11"/><path d="M12 13.5v2.7M9 20h6M10.2 20l.5-3.8h2.6l.5 3.8"/></svg>',
    /* respaldo — estrella */
    "_default": '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 3.4l2.5 5 5.5.6-4.1 3.7 1.1 5.4L12 16.9l-5 2.6 1.1-5.4-4.1-3.7 5.5-.6z"/></svg>'
  };
  function achIcon(id) {
    if (id && id.indexOf("master:") === 0) return ACH_ICON.trophy;
    return ACH_ICON[id] || ACH_ICON._default;
  }
  var WORLD_UMBRAL = { A1: "Umbral del Hogar", A2: "Mojón del Sendero", B1: "Arco del Horizonte", B2: "Pórtico de la Torre", C1: "Portal del Firmamento", C2: "Sello del Castillo" };
  var BOSS_AVATAR = "assets/images/mascot/vesper_cat.png";
  /* ¿está desbloqueado este cosmético? (fail-open si no hay VESPER_COSMETICS) */
  function unlockedCos(kind, id) {
    try {
      if (window.VESPER_COSMETICS && VESPER_COSMETICS.isUnlocked) return !!VESPER_COSMETICS.isUnlocked(kind, id);
    } catch (e) {}
    return true;
  }
  /* Aspecto del gato del mapa: pelaje + accesorio en UNA sola imagen ya
     horneada (VESPER_THEME.look). Antes se superponía el SVG del accesorio
     sobre el PNG y, por bien calibrado que estuviera, se leía pegado encima:
     el sombrero flotaba sobre la melena del león en vez de hundirse en ella.
     Devuelve {src, svg, animal, pelaje}: animal=true cuando NO es el Vesper
     clásico, que es lo que decide si recibe el tinte de color (--vc-filter).
     Respeta los bloqueos: lo no desbloqueado no se pinta. */
  function currentLook() {
    try {
      if (window.VESPER_THEME && VESPER_THEME.get && VESPER_THEME.look) {
        var st = VESPER_THEME.get();
        var pel = (st.pelaje && st.pelaje !== "classic" && unlockedCos("pelaje", st.pelaje)) ? st.pelaje : "classic";
        var acc = (st.accessory && st.accessory !== "none" && unlockedCos("acc", st.accessory)) ? st.accessory : "none";
        var lk = VESPER_THEME.look(pel, acc);
        return { src: lk.img, svg: lk.svg, animal: pel !== "classic", pelaje: pel };
      }
    } catch (e) {}
    return { src: BOSS_AVATAR, svg: "", animal: false, pelaje: "classic" };
  }
  /* etiqueta visual para un cosmético recién desbloqueado {kind:"skin"|"acc"|"pelaje",id} */
  function cosmeticLabel(c) {
    try {
      if (c.kind === "skin" && window.VESPER_THEME && VESPER_THEME.skins) {
        var s = VESPER_THEME.skins[c.id];
        return { name: "Color: " + (s ? s.name : c.id),
          ic: '<span class="cos-dot" style="background:' + (s ? s.ring : "#C9A84C") + '"></span>' };
      }
      if (c.kind === "acc" && window.VESPER_THEME && VESPER_THEME.accessories) {
        var a = VESPER_THEME.accessories[c.id];
        return { name: (a ? a.name : c.id),
          ic: (a && a.svg) ? '<span class="cos-svg">' + a.svg + '</span>' : ic('sparkle') };
      }
      if (c.kind === "pelaje" && window.VESPER_THEME && VESPER_THEME.pelajes) {
        var pj = VESPER_THEME.pelajes[c.id];
        return { name: "Aspecto: " + (pj ? pj.name : c.id),
          ic: (pj && pj.img) ? '<span class="cos-pel"><img src="' + pj.img + '" alt=""></span>' : ic('paw') };
      }
    } catch (e) {}
    return { name: c.id, ic: "&#11088;" };
  }
  /* metadatos del jefe de un nivel, con defaults si el mundo no declara boss */
  function bossMeta(lv) { var t = WORLD_THEME[lv] || {}; var b = t.boss || {}; return { name: b.name || "El Guardián", subtitle: t.worldName || lv, pass: b.pass || 85 }; }

  /* ===== Iconos de marca =====================================================
     CONTRATO DEL SISTEMA DE DISEÑO (claude.ai/design › Componentes › Iconos):
     trazo y NO relleno, stroke-width 1.5, currentColor, viewBox 24, y el
     tamaño se pide en em para que escale con el texto.

     Antes cada icono del mapa iba por libre — 1.9, 2 y hasta 3 de grosor, y
     el "play" era un triángulo MACIZO — así que al lado de los iconos del
     resto del sitio se leían toscos y de otra familia. Ahora los cinco
     glifos comparten el mismo pulso de línea que el sprite del sistema.
     ========================================================================= */
  var SKILL_ICONS = {
    /* libro abierto (i-book del sistema) */
    grammar:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 5.2A1.7 1.7 0 0 1 4.7 3.5h5.6A1.7 1.7 0 0 1 12 5.2v14a1.4 1.4 0 0 0-1.4-1.4H3z"/><path d="M21 5.2a1.7 1.7 0 0 0-1.7-1.7h-5.6A1.7 1.7 0 0 0 12 5.2v14a1.4 1.4 0 0 1 1.4-1.4H21z"/></svg>',
    /* fichas de vocabulario (i-grid del sistema) */
    vocab:     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3.5" y="3.5" width="7" height="7" rx="1.6"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.6"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.6"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.6"/></svg>',
    /* pliego con renglones */
    reading:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3.5h7.6L18 7.9V20.5H6z"/><path d="M13.4 3.5v4.6H18"/><path d="M9 12.4h6M9 15.6h6"/></svg>',
    /* auriculares (i-audio del sistema) */
    listening: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="2.5" y="13.5" width="4" height="7" rx="1.6"/><rect x="17.5" y="13.5" width="4" height="7" rx="1.6"/><path d="M9.5 9.5v5M12 7.5v9M14.5 10.5v3"/></svg>',
    /* dos bocadillos (i-speech del sistema) */
    use:       '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6.5A2.5 2.5 0 0 1 5.5 4h7A2.5 2.5 0 0 1 15 6.5v3A2.5 2.5 0 0 1 12.5 12H8l-3.2 2.6a.4.4 0 0 1-.65-.31V12H5.5A2.5 2.5 0 0 1 3 9.5z"/><path d="M9 15.2a2.5 2.5 0 0 0 2.4 1.8h4.1l3.2 2.6a.4.4 0 0 0 .65-.31V17h.15A2.5 2.5 0 0 0 22 14.5v-3A2.5 2.5 0 0 0 19.5 9H18"/></svg>'
  };
  function skillIcon(sk) { return '<span class="skill-ic" aria-hidden="true">' + (SKILL_ICONS[sk] || "") + '</span>'; }
  /* glifo de estado del nodo de lección.
     - completada: la palomita entre dos ramas de laurel (sello de conquista,
       no un simple tic suelto perdido dentro del medallón);
     - disponible: el play EN CONTORNO (i-play), no macizo;
     - bloqueada: candado grabado, sin el punto relleno que lo emborronaba. */
  function nodeGlyph(state) {
    var o = '<svg class="wglyph" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">';
    if (state === "completed") {
      /* Sólo la palomita, bien plantada. Probé a rodearla de dos ramas de
         laurel y a 28px las ramas se leían como un par de paréntesis: "(v)".
         El medallón ya es un aro, y el aro de oro con su velo es lo que dice
         "conquistada"; al glifo le basta con confirmarlo. */
      return o + '<path d="m6.6 12.3 3.5 3.6 7.3-7.8"/></svg>';
    }
    if (state === "locked") {
      return o + '<rect x="5.6" y="10.8" width="12.8" height="9" rx="2.2"/>'
        + '<path d="M8.8 10.8V8.2a3.2 3.2 0 0 1 6.4 0v2.6"/>'
        + '<path d="M12 14.2v2.2"/></svg>';
    }
    return o + '<path d="M8 5.4v13.2l11-6.6z"/></svg>';
  }
  /* escudo SVG (jefe) — reemplaza el emoji 🛡️ (i-shield del sistema) */
  function shieldSvg(cls) { return '<svg class="' + (cls || "") + '" viewBox="0 0 24 26" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2.8l8 3v6.2c0 4.5-3.3 8.5-8 9.8-4.7-1.3-8-5.3-8-9.8V5.8z"/><path d="m8.8 12.4 2.6 2.6 4.4-4.8"/></svg>'; }

  /* Retrato temático del guardián de cada mundo (SVG, hereda el color del
     acento del mundo via .boss-emblem). C2 es un caballero, como el resto
     evoca el tema de su mundo: hogar, sendero, horizonte, torre, firmamento. */
  var BOSS_ART = {
    /* A1 · El Centinela del Hogar — guardián con farol */
    A1: '<circle cx="60" cy="60" r="53" stroke-opacity=".18"/>'
      + '<circle cx="58" cy="44" r="13"/>'
      + '<path d="M32 99c2-19 11-29 26-29s24 10 26 29" stroke-opacity=".95"/>'
      + '<path d="M46 63q12 8 24 0" stroke-opacity=".45"/>'
      + '<path d="M72 86c6-1 11-4 14-9" stroke-opacity=".7"/>'
      + '<path d="M82 60h16M85 60v3M95 60v3"/>'
      + '<rect x="82" y="63" width="16" height="19" rx="2.5"/>'
      + '<line x1="90" y1="63" x2="90" y2="82" stroke-opacity=".4"/>'
      + '<circle cx="90" cy="73" r="4" fill="currentColor" stroke="none" fill-opacity=".85"/>',
    /* A2 · El Guardián del Sendero — encapuchado con bastón de hoja */
    A2: '<circle cx="60" cy="60" r="53" stroke-opacity=".18"/>'
      + '<path d="M44 50a15 14 0 0 1 30 0v4a15 16 0 0 1-30 0z"/>'
      + '<path d="M42 50c2-15 9-22 17-22s15 7 17 22" stroke-opacity=".7"/>'
      + '<path d="M34 100c2-20 11-30 25-30s23 10 25 30"/>'
      + '<path d="M86 26v64" stroke-opacity=".85"/>'
      + '<path d="M86 46c-10-1-16-8-16-16 10-1 16 6 16 16M86 40c9-1 14-7 14-15-9 1-14 7-14 15" fill="currentColor" stroke="none" fill-opacity=".22"/>'
      + '<path d="M86 46c-10-1-16-8-16-16 10-1 16 6 16 16M86 40c9-1 14-7 14-15-9 1-14 7-14 15"/>',
    /* B1 · El Vigía del Horizonte — vigía con catalejo */
    B1: '<circle cx="60" cy="60" r="53" stroke-opacity=".18"/>'
      + '<circle cx="50" cy="44" r="13"/>'
      + '<path d="M28 99c2-19 11-29 24-29 4 0 8 1 11 4" stroke-opacity=".95"/>'
      + '<path d="M68 80c6-2 11-5 14-10" stroke-opacity=".7"/>'
      + '<rect x="76" y="56" width="24" height="10" rx="5" transform="rotate(-30 88 61)"/>'
      + '<path d="M96 46l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="currentColor" stroke="none" fill-opacity=".85"/>',
    /* B2 · El Heraldo de la Torre — heraldo con estandarte */
    B2: '<circle cx="60" cy="60" r="53" stroke-opacity=".18"/>'
      + '<circle cx="54" cy="44" r="12"/>'
      + '<path d="M30 100c2-19 11-29 24-29s22 10 24 29"/>'
      + '<path d="M86 22v70" stroke-opacity=".85"/>'
      + '<circle cx="86" cy="20" r="3" fill="currentColor" stroke="none"/>'
      + '<path d="M86 28h24l-7 10 7 10H86z" fill="currentColor" stroke="none" fill-opacity=".22"/>'
      + '<path d="M86 28h24l-7 10 7 10H86"/>',
    /* C1 · El Custodio del Firmamento — figura astral con estrellas */
    C1: '<circle cx="60" cy="60" r="53" stroke-opacity=".18"/>'
      + '<circle cx="60" cy="48" r="12"/>'
      + '<path d="M34 100c2-20 11-30 26-30s24 10 26 30"/>'
      + '<path d="M28 46a32 20 0 0 1 64 0" stroke-opacity=".35"/>'
      + '<path d="M60 18l2.6 6.4 6.4 2.6-6.4 2.6L60 36l-2.6-6.4-6.4-2.6 6.4-2.6z" fill="currentColor" stroke="none"/>'
      + '<g fill="currentColor" stroke="none"><circle cx="32" cy="44" r="2"/><circle cx="88" cy="44" r="2"/><circle cx="42" cy="26" r="1.5"/><circle cx="78" cy="26" r="1.5"/></g>'
      + '<path d="M54 84l6 7 6-7" stroke-opacity=".45"/>',
    /* C2 · El Soberano del Saber — CABALLERO con yelmo (visera en cruz) y penacho */
    C2: '<circle cx="60" cy="60" r="53" stroke-opacity=".18"/>'
      + '<path d="M61 14c12 1 17 9 13 19" stroke-opacity=".75"/>'
      + '<path d="M61 14c-3 6-3 12 2 16" stroke-opacity=".5"/>'
      + '<path d="M43 44c0-9 8-15 17-15s17 6 17 15v9c0 7-6 12-17 12s-17-5-17-12z"/>'
      + '<path d="M60 33v28" stroke-width="3.2"/>'
      + '<path d="M47 48h26" stroke-width="3.2"/>'
      + '<g fill="currentColor" stroke="none"><circle cx="53" cy="60" r="1.5"/><circle cx="60" cy="61" r="1.5"/><circle cx="67" cy="60" r="1.5"/></g>'
      + '<path d="M30 101c2-16 14-23 30-23s28 7 30 23"/>'
      + '<path d="M38 88q22-10 44 0" stroke-opacity=".4"/>'
  };
  function bossArt(lv) {
    var inner = BOSS_ART[lv] || shieldSvg();
    if (inner === shieldSvg()) return inner;
    return '<svg class="boss-art" viewBox="0 0 120 120" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + inner + '</svg>';
  }
  /* retratos de guardianes (IA, uno por mundo); cae al SVG bossArt temático si falta el PNG */
  var BOSS_PORTRAIT = {
    A1: "assets/images/guardians/guardian_a1.png", A2: "assets/images/guardians/guardian_a2.png",
    B1: "assets/images/guardians/guardian_b1.png", B2: "assets/images/guardians/guardian_b2.png",
    C1: "assets/images/guardians/guardian_c1.png", C2: "assets/images/guardians/guardian_c2.png"
  };
  /* el onerror corre en scope global (este script es un IIFE): se expone en window; respaldo = bossArt */
  window.__vbossFallback = function (img, lv) { try { if (img) img.outerHTML = bossArt(lv); } catch (e) {} };
  function bossPortrait(lv) {
    var src = BOSS_PORTRAIT[lv];
    if (!src) return bossArt(lv);
    return '<img class="boss-photo" src="' + src + '" alt="" loading="lazy" decoding="async" onerror="window.__vbossFallback(this,\'' + lv + '\')">';
  }
  /* style inline con las 3 variables del mundo (acento/soft/glow) */
  /* accentInk = variante oscura del acento, legible como TEXTO o como fondo
     de chip con texto blanco (>=5.5:1). El acento normal solo vale para
     trazos, glows y superficies grandes. */
  function worldVars(t) { return '--w-accent:' + t.accent + ';--w-accent-soft:' + t.accentSoft + ';--w-glow:' + t.glow + ';--w-accent-ink:' + (t.accentInk || t.accent) + ';'; }
  /* capa ambiental reutilizable (N partículas <i>); mapMod=true para la del mapa */
  function ambLayer(n, mapMod) { var dots = ""; for (var i = 0; i < n; i++) dots += "<i></i>"; return '<div class="wamb' + (mapMod ? ' wamb--map' : '') + '" aria-hidden="true">' + dots + '</div>'; }

  /* offset-x serpenteante por parada (da la curva al sendero) */
  function dxFor(k) { return Math.round(64 * Math.sin(k * 0.85)); }
  /* ¿reducir movimiento? (preferencia del SO o ajuste de Configuración) */
  function reduceMotion() {
    try {
      if (document.documentElement.classList.contains("vesper-reduce-motion")) return true;
      return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    } catch (e) { return false; }
  }
  /* pseudo-aleatorio determinista (estable entre re-medidas/resize) */
  function trnd(i) { var x = Math.sin(i * 127.1 + 17.3) * 43758.5453; return x - Math.floor(x); }
  /* una pieza de paisaje (kind) como <g> SVG escalado/posicionado. La parte viva
     (follaje, banderas, humo, haz) va en sub-grupos con clase (.sway/.flag/.smoke/
     .beam) para animarse SIN tocar el transform de colocación. depth='far'|'near'
     da perspectiva atmosférica; delay desfasa el balanceo de forma determinista.
     Paleta navy: cuerpos oscuros, acento del mundo en follaje/tejados, oro en luces. */
  function terrainProp(px, py, sc, kind, depth, delay) {
    var cls = "prop " + kind + (depth ? " " + depth : "");
    var open = '<g class="' + cls + '" transform="translate(' + px.toFixed(1) + ' ' + py.toFixed(1) + ') scale(' + sc.toFixed(2) + ')">';
    var dl = (delay != null) ? ' style="animation-delay:-' + delay.toFixed(2) + 's"' : '';
    function sway(inner) { return '<g class="sway"' + dl + '>' + inner + '</g>'; }
    var sh = '<ellipse class="sh" cx="0" cy="3" rx="10" ry="3"/>';
    switch (kind) {
      case "pine":     return open + '<ellipse class="sh" cx="0" cy="7" rx="11" ry="3.2"/>'
        + sway('<rect class="tk" x="-1.7" y="2" width="3.4" height="8"/><path class="lf2" d="M0 -6 L9 9 L-9 9 Z"/><path class="lf2" d="M0 -14 L7.5 3 L-7.5 3 Z"/><path class="lf" d="M0 -22 L6 -4 L-6 -4 Z"/>') + '</g>';
      case "bush":     return open + '<ellipse class="sh" cx="0" cy="5" rx="12" ry="3.2"/>'
        + sway('<circle class="lf" cx="-5.5" cy="1" r="6.5"/><circle class="lf" cx="5.5" cy="1" r="6.5"/><circle class="lf2" cx="0" cy="-4.5" r="7.5"/><circle class="lf2" cx="-2" cy="-1" r="4"/>') + '</g>';
      case "rock":     return open + '<ellipse class="sh" cx="0" cy="3" rx="10" ry="3"/><path class="rk" d="M-9 4 L-5 -6 L3 -8 L9 -1 L8 4 Z"/><path class="rk2" d="M-5 -6 L1 -3 L9 -1"/></g>';
      case "cottage":  return open + '<ellipse class="sh" cx="0" cy="8" rx="13" ry="3.2"/><rect class="bdy" x="-9" y="-6" width="18" height="14"/><path class="lf" d="M-11 -6 L0 -18 L11 -6 Z"/><rect class="tk" x="4.5" y="-16" width="3.4" height="7"/><rect class="win" x="-4" y="-2" width="7" height="7" rx="1"/></g>';
      case "lantern":  return open + '<ellipse class="sh" cx="0" cy="7" rx="5" ry="2"/><rect class="tk" x="-1" y="-5" width="2" height="12"/><circle class="glow" cx="0" cy="-8" r="5.2"/><circle class="win" cx="0" cy="-8" r="2.4"/></g>';
      case "mushroom": return open + '<ellipse class="sh" cx="0" cy="5" rx="7" ry="2"/>'
        + sway('<rect class="stem" x="-2" y="-1" width="4" height="6"/><path class="lf" d="M-9 -1 A9 8 0 0 1 9 -1 Z"/><circle class="dot" cx="-3.5" cy="-3.5" r="1.4"/><circle class="dot" cx="3" cy="-3" r="1.1"/>') + '</g>';
      case "fern":     return open + '<ellipse class="sh" cx="0" cy="4" rx="8" ry="2"/>'
        + sway('<path class="ln" d="M0 5 C-9 0 -9 -9 -2 -11"/><path class="ln" d="M0 5 C9 0 9 -9 2 -11"/><path class="ln2" d="M0 5 L0 -10"/>') + '</g>';
      case "building": return open + '<ellipse class="sh" cx="0" cy="8" rx="11" ry="3"/><rect class="bdy" x="-8" y="-27" width="16" height="34"/><rect class="bdy" x="-8" y="-30" width="16" height="3"/>'
        + '<rect class="win" x="-5" y="-23" width="3" height="3"/><rect class="win" x="2" y="-23" width="3" height="3"/><rect class="win" x="-5" y="-16" width="3" height="3"/><rect class="win" x="2" y="-16" width="3" height="3"/><rect class="win" x="-5" y="-9" width="3" height="3"/><rect class="win" x="2" y="-9" width="3" height="3"/><rect class="win" x="-5" y="-2" width="3" height="3"/><rect class="win" x="2" y="-2" width="3" height="3"/></g>';
      case "tower":    return open + '<ellipse class="sh" cx="0" cy="8" rx="8" ry="2.6"/><rect class="bdy" x="-5" y="-22" width="10" height="29"/><rect class="bdy" x="-6.5" y="-25" width="3" height="3.5"/><rect class="bdy" x="-1.5" y="-25" width="3" height="3.5"/><rect class="bdy" x="3.5" y="-25" width="3" height="3.5"/><rect class="win" x="-2" y="-15" width="4" height="5" rx="1"/></g>';
      case "lamp":     return open + '<ellipse class="sh" cx="0" cy="7" rx="4" ry="2"/><path class="ln" d="M0 7 L0 -9 Q0 -12 3 -12"/><circle class="glow" cx="4" cy="-11" r="4"/><circle class="win" cx="4" cy="-11" r="1.9"/></g>';
      case "crag":     return open + '<ellipse class="sh" cx="0" cy="4" rx="12" ry="3"/><path class="rk" d="M-12 5 L-3 -11 L1 -4 L6 -16 L12 5 Z"/><path class="rk2" d="M-3 -11 L1 -4 L6 -16"/></g>';
      case "banner":   return open + '<ellipse class="sh" cx="0" cy="8" rx="3" ry="1.6"/><rect class="tk" x="-0.8" y="-13" width="1.6" height="21"/>'
        + '<path class="flag" d="M0.8 -13 L12 -10 L0.8 -6 Z"/></g>';
      case "star4":    return open + '<path class="spark" d="M0 -10 L2.2 -2.2 L10 0 L2.2 2.2 L0 10 L-2.2 2.2 L-10 0 L-2.2 -2.2 Z"/></g>';
      case "planet":   return open + '<circle class="lf" cx="0" cy="0" r="6.5"/><ellipse class="ring" cx="0" cy="0" rx="12" ry="3.6" transform="rotate(-18)"/><circle class="gem" cx="-2.5" cy="-2" r="1.6"/></g>';
      case "crystal":  return open + '<ellipse class="sh" cx="0" cy="8" rx="5" ry="2"/><path class="gem" d="M0 -12 L5.5 -2 L2 9 L-2 9 L-5.5 -2 Z"/><path class="gem2" d="M0 -12 L0 9 M-5.5 -2 L5.5 -2"/></g>';
      case "spire":    return open + '<ellipse class="sh" cx="0" cy="7" rx="6" ry="2"/><rect class="bdy" x="-5" y="-13" width="10" height="20"/><path class="lf" d="M-6 -13 L0 -24 L6 -13 Z"/><rect class="win" x="-1.7" y="-7" width="3.4" height="5" rx="1"/><rect class="tk" x="-0.6" y="-30" width="1.2" height="7"/><path class="flag" d="M0.6 -30 L7 -28 L0.6 -25 Z"/></g>';
      /* ---- héroes (un gran motivo firmado por mundo) ---- */
      case "hero_cottage": return open + '<ellipse class="sh" cx="0" cy="13" rx="23" ry="5"/><rect class="bdy" x="-15" y="-10" width="30" height="23"/><path class="lf" d="M-18 -10 L0 -29 L18 -10 Z"/><rect class="tk" x="8" y="-27" width="4.6" height="11"/><circle class="smoke" cx="10.3" cy="-28" r="2.8"/><rect class="win" x="-11" y="-4" width="7" height="8" rx="1"/><rect class="win" x="4" y="-4" width="7" height="8" rx="1"/><rect class="rk" x="-2.5" y="1" width="5" height="12"/></g>';
      case "hero_oak":     return open + '<ellipse class="sh" cx="0" cy="15" rx="20" ry="5"/><rect class="tk" x="-3.6" y="-4" width="7.2" height="19"/>'
        + sway('<circle class="lf2" cx="-11" cy="-11" r="11"/><circle class="lf2" cx="11" cy="-11" r="11"/><circle class="lf" cx="0" cy="-22" r="13"/><circle class="lf" cx="-6" cy="-13" r="9"/><circle class="lf" cx="7" cy="-14" r="8"/>')
        + '<circle class="glow" cx="9" cy="-1" r="3.6"/><circle class="win" cx="9" cy="-1" r="1.7"/></g>';
      case "hero_lighthouse": return open + '<ellipse class="sh" cx="0" cy="17" rx="15" ry="4.5"/><path class="bdy" d="M-7 17 L-5 -14 L5 -14 L7 17 Z"/><rect class="rk" x="-6" y="-1" width="12" height="3"/><rect class="rk" x="-6.5" y="9" width="13" height="3"/><rect class="bdy" x="-5.5" y="-23" width="11" height="9"/><path class="lf" d="M-6.5 -23 L0 -30 L6.5 -23 Z"/><g class="beam"><path class="beamray" d="M0 -18.5 L36 -31 L36 -6 Z"/></g><circle class="glow" cx="0" cy="-18.5" r="4.2"/><circle class="win" cx="0" cy="-18.5" r="2.1"/></g>';
      case "hero_tower":   return open + '<ellipse class="sh" cx="0" cy="19" rx="15" ry="4.5"/><rect class="bdy" x="-8" y="-22" width="16" height="41"/><rect class="bdy" x="-10" y="-26" width="3.6" height="5"/><rect class="bdy" x="-1.8" y="-26" width="3.6" height="5"/><rect class="bdy" x="6.4" y="-26" width="3.6" height="5"/><rect class="win" x="-3" y="-15" width="6" height="7" rx="1"/><rect class="win" x="-3" y="-1" width="6" height="7" rx="1"/><rect class="tk" x="-0.7" y="-38" width="1.4" height="13"/><path class="flag" d="M0.7 -38 L12 -34.5 L0.7 -31 Z"/></g>';
      case "hero_planet":  return open + '<circle class="lf" cx="0" cy="0" r="13"/><ellipse class="ring" cx="0" cy="0" rx="23" ry="6.8" transform="rotate(-20)"/><circle class="gem" cx="-5" cy="-4" r="3.2"/><circle class="gem" cx="4" cy="3" r="2"/><circle class="gem" cx="19" cy="-13" r="2.6"/><path class="spark" d="M-17 15 L-16 12 L-13 11 L-16 10 L-17 7 L-18 10 L-21 11 L-18 12 Z"/></g>';
      case "hero_castle":  return open + '<ellipse class="sh" cx="0" cy="17" rx="25" ry="5"/><rect class="bdy" x="-18" y="-6" width="36" height="23"/><rect class="bdy" x="-18" y="-14" width="9" height="10"/><rect class="bdy" x="9" y="-14" width="9" height="10"/><rect class="bdy" x="-5" y="-21" width="10" height="17"/><path class="gem" d="M-13.5 -14 L-13.5 -23 L-9 -23 L-9 -14 Z"/><path class="gem" d="M9 -14 L9 -23 L13.5 -23 L13.5 -14 Z"/><path class="lf" d="M-5.5 -21 L0 -30 L5.5 -21 Z"/><rect class="win" x="-2" y="-15" width="4" height="5"/><rect class="win" x="-15" y="-1" width="4" height="5"/><rect class="win" x="11" y="-1" width="4" height="5"/><rect class="tk" x="-0.6" y="-36" width="1.2" height="8"/><path class="flag" d="M0.6 -36 L9 -33.5 L0.6 -31 Z"/></g>';
      default:         return open + sh + '<circle class="lf" cx="0" cy="0" r="5"/></g>';
    }
  }

  /* El generador de terreno (terrainSvgInner + sideMass + silStyle +
     HERO_KIND) se retiró: sembraba ~834 formas SVG y 52 KB de marcado
     por trazado, y a la opacidad a la que se pintaba no se leía como
     paisaje sino como ruido recortado en los márgenes. Lo sustituye la
     lámina grabada del mundo (.wmotif). terrainProp SIGUE vivo: de él
     cuelga biomeMotif, la miniatura que recibe al entrar en la lección. */
  /* mini-escena del bioma (3 piezas) para recibirte al empezar una lección del mundo */
  function biomeMotif(lv) {
    var th = WORLD_THEME[lv]; var b = (th && th.biome && th.biome.length) ? th.biome : ["pine", "bush", "rock"];
    var u = []; for (var i = 0; i < b.length && u.length < 3; i++) { if (u.indexOf(b[i]) < 0) u.push(b[i]); }
    while (u.length < 3) u.push(b[u.length % b.length]);
    var inner = terrainProp(-22, 6, 1.05, u[0]) + terrainProp(0, 9, 1.4, u[1]) + terrainProp(22, 6, 1.0, u[2]);
    return '<svg class="biome-motif terr" viewBox="-40 -30 80 44" width="100" height="55" aria-hidden="true" style="' + worldVars(th || {}) + '">' + inner + '</svg>';
  }
  /* aplica/quita la identidad del mundo (acento) al reproductor de lección, vía #app */
  function applyLessonTheme(level) {
    if (!app || !PATH) { return; }
    var lv = PATH.normLevel(level), th = WORLD_THEME[lv];
    if (!th) { clearLessonTheme(); return; }
    app.setAttribute("data-world", lv);
    app.style.setProperty("--w-accent", th.accent);
    app.style.setProperty("--w-accent-soft", th.accentSoft);
    app.style.setProperty("--w-glow", th.glow);
  }
  function clearLessonTheme() {
    if (!app) return;
    app.removeAttribute("data-world");
    app.style.removeProperty("--w-accent");
    app.style.removeProperty("--w-accent-soft");
    app.style.removeProperty("--w-glow");
  }
  /* cinta de mundo (nombre + motivo del bioma) que recibe al empezar una lección */
  function lessonWorldBanner(level) {
    if (!PATH) return "";
    var lv = PATH.normLevel(level), th = WORLD_THEME[lv];
    if (!th) return "";
    var n = PATH.LEVELS.indexOf(lv) + 1;
    return '<div class="lesson-world" style="' + worldVars(th) + '">' + biomeMotif(lv)
      + '<div class="lw-tx"><span class="lw-ey">Mundo ' + n + ' &middot; ' + lv + '</span>'
      + '<span class="lw-nm">' + esc(th.worldName) + '</span></div></div>';
  }

  /* ----- Sendero 2D (medir-y-dibujar): tras pintar el mapa, mide el centro real
     de cada nodo [data-stop] dentro de #wmap, traza una curva suave que los une
     (SVG decorativo) + calzada + paisaje, y coloca al avatar (gato) sobre el nodo
     actual. El avatar "camina" al nuevo nodo con offset-path cuando data-prev != data-cur.
     Como mide el DOM real, queda alineado aunque cambien lecciones o ancho. ----- */
  function paintTrail() {
    var map = byId("wmap"); if (!map) return;
    var svg = map.querySelector(".wtrail");
    var avatar = map.querySelector(".wavatar");
    var stops = map.querySelectorAll("[data-stop]");
    if (!svg || !stops.length) return;
    var mb = map.getBoundingClientRect();
    var W = map.clientWidth || mb.width, H = map.clientHeight || mb.height, pts = [], i;
    if (W < 80) { requestAnimationFrame(paintTrail); return; }   // aún sin layout: reintenta
    for (i = 0; i < stops.length; i++) {
      var btn = stops[i].querySelector(".wbtn") || stops[i];
      var r = btn.getBoundingClientRect();
      pts.push([ r.left - mb.left + r.width / 2, r.top - mb.top + r.height / 2 ]);
    }
    function seg(a, b) {
      var my = ((a[1] + b[1]) / 2).toFixed(1);
      return " C" + a[0].toFixed(1) + " " + my + " " + b[0].toFixed(1) + " " + my + " " + b[0].toFixed(1) + " " + b[1].toFixed(1);
    }
    var d = "M" + pts[0][0].toFixed(1) + " " + pts[0][1].toFixed(1);
    for (i = 1; i < pts.length; i++) d += seg(pts[i - 1], pts[i]);
    svg.setAttribute("viewBox", "0 0 " + W + " " + H);
    svg.setAttribute("width", W); svg.setAttribute("height", H);
    var paths = svg.querySelectorAll("path");
    for (i = 0; i < paths.length; i++) paths[i].setAttribute("d", d);
    if (!avatar) return;

    /* longitud de arco acumulada en cada nodo => offset-distance exacto.
       OJO: mide la veta dorada (.wtrail-line), NO la última <path> — esa es
       ahora la cuenta-cometa y robaría la medición del avatar. */
    var line = svg.querySelector(".wtrail-line") || paths[paths.length - 1], lens = [0];
    if (line.getTotalLength) {
      var tmp = line.cloneNode(false), pre = "M" + pts[0][0].toFixed(1) + " " + pts[0][1].toFixed(1);
      svg.appendChild(tmp);
      for (i = 1; i < pts.length; i++) { pre += seg(pts[i - 1], pts[i]); tmp.setAttribute("d", pre); lens.push(tmp.getTotalLength()); }
      svg.removeChild(tmp);
    } else { for (i = 1; i < pts.length; i++) lens.push(i); }
    var total = lens[lens.length - 1] || 1;
    function pctAt(idx) { idx = Math.max(0, Math.min(lens.length - 1, idx)); return (lens[idx] / total) * 100; }

    var cur = parseInt(map.getAttribute("data-cur"), 10); if (isNaN(cur)) cur = 0;
    var prev = parseInt(map.getAttribute("data-prev"), 10);
    /* trecho ANDADO en oro macizo: mismo "d" que el resto, pero el trazo se
       corta con dasharray a la longitud de arco del nodo actual. Antes la veta
       dorada cubría el camino entero y no distinguías lo hecho de lo que falta.
       Si el gato está en la primera parada no hay nada recorrido: se oculta
       (un dash de 0 con linecap:round pintaría un punto suelto). */
    var done = svg.querySelector(".wtrail-done");
    if (done) {
      var travelled = lens[Math.max(0, Math.min(lens.length - 1, cur))] || 0;
      done.setAttribute("stroke-dasharray", travelled.toFixed(1) + " 99999");
      done.style.display = travelled > 1 ? "" : "none";
    }
    var canOffset = !!(window.CSS && CSS.supports && CSS.supports("offset-path", 'path("M0 0")'));
    var animate = !isNaN(prev) && prev !== cur && !reduceMotion();

    if (canOffset) {
      avatar.style.setProperty("offset-path", 'path("' + d + '")');
      if (animate) {
        avatar.style.setProperty("transition", "none");
        avatar.style.setProperty("offset-distance", pctAt(prev) + "%");
        void avatar.offsetWidth;
        avatar.style.setProperty("transition", "offset-distance 1s ease-in-out");
        requestAnimationFrame(function () { avatar.style.setProperty("offset-distance", pctAt(cur) + "%"); });
      } else {
        avatar.style.setProperty("transition", "none");
        avatar.style.setProperty("offset-distance", pctAt(cur) + "%");
      }
    } else {
      /* fallback sin offset-path: centra con margen (deja libre transform para el bob) */
      avatar.style.margin = "-25px 0 0 -25px";
      var place = function (idx) { avatar.style.left = pts[idx][0] + "px"; avatar.style.top = pts[idx][1] + "px"; };
      if (animate) {
        place(prev); void avatar.offsetWidth;
        avatar.style.transition = "left 1s ease-in-out, top 1s ease-in-out";
        requestAnimationFrame(function () { place(cur); });
      } else { avatar.style.transition = "none"; place(cur); }
    }
    map.removeAttribute("data-prev");
    placeProps(map);
    applyParallax();                                  // estado inicial de la profundidad por scroll
  }
  /* ---- el decorado no pisa rótulos ----
     Los huecos de PROP_SLOTS van en % del alto del mapa, y el mapa cambia de
     alto según cuántas lecciones se despliegan: con 15 paradas el pozo caía
     encima de "Listening 0/7" y el seto sobre "Vocabulario". Aquí, ya con el
     layout real, cada pieza que choca con un rótulo, un nodo o el gato se
     desliza arriba/abajo hasta un hueco libre; si no hay ninguno cerca, se
     retira. Mide cajas fijas (ver propsLayer), así que no espera a las imágenes. */
  var _propsFontsHooked = false;
  function placeProps(map) {
    var imgs = map.querySelectorAll(".wprops img");
    if (!imgs.length) return;
    /* Inter/Inria llegan después del primer pintado y los rótulos cambian
       de alto al llegar: se recoloca una vez más con las fuentes ya puestas. */
    if (!_propsFontsHooked && document.fonts && document.fonts.ready) {
      _propsFontsHooked = true;
      document.fonts.ready.then(function () { var m = byId("wmap"); if (m) placeProps(m); });
    }
    var mb = map.getBoundingClientRect(), H = map.clientHeight, PAD = 8, i, j;
    function rel(el) {
      var r = el.getBoundingClientRect();
      return { l: r.left - mb.left - PAD, t: r.top - mb.top - PAD, r: r.right - mb.left + PAD, b: r.bottom - mb.top + PAD };
    }
    function hit(a, b) { return a.l < b.r && a.r > b.l && a.t < b.b && a.b > b.t; }
    var obst = [];
    var els = map.querySelectorAll(".wtitle, .wlabel, .wcheck, .wbtn, .wstars, .wstart, .wavatar");
    for (i = 0; i < els.length; i++) if (els[i].offsetParent) obst.push(rel(els[i]));
    var placed = [];
    var STEPS = [0, 14, -14, 28, -28, 42, -42, 56, -56, 70, -70, 84, -84, 100, -100, 120, -120, 140, -140];
    for (i = 0; i < imgs.length; i++) {
      var im = imgs[i];
      im.style.display = "";
      if (im.dataset.top) im.style.top = im.dataset.top; else im.dataset.top = im.style.top;
      var base = rel(im), hgt = base.b - base.t, ok = false;
      for (j = 0; j < STEPS.length && !ok; j++) {
        var c = { l: base.l, r: base.r, t: base.t + STEPS[j], b: base.b + STEPS[j] };
        if (c.t + PAD < 0 || c.b - PAD > H) continue;
        var free = true, k;
        for (k = 0; k < obst.length && free; k++) if (hit(c, obst[k])) free = false;
        /* entre piezas, aire de sobra: dos planetas a 20px uno del otro
           se leían como un montón, no como paisaje */
        for (k = 0; k < placed.length && free; k++) if (hit({ l: c.l - 20, r: c.r + 20, t: c.t - 44, b: c.b + 44 }, placed[k])) free = false;
        if (free) {
          ok = true; placed.push(c);
          if (STEPS[j]) im.style.top = (c.t + PAD) + "px";
        }
      }
      if (!ok) im.style.display = "none";
    }
  }
  var _trailResizeBound = false;
  function bindTrailResize() {
    if (_trailResizeBound) return; _trailResizeBound = true;
    var t = null;
    window.addEventListener("resize", function () { clearTimeout(t); t = setTimeout(function () {
      var m = byId("wmap"); if (m) { m.removeAttribute("data-prev"); paintTrail(); }
    }, 160); });
  }
  /* ---- profundidad al hacer scroll: rezaga las masas laterales (.wsil) ~0.12x.
     rAF-gated, una lectura + una escritura de transform por frame; nulo bajo
     reduced-motion (y la CSS .wsil{transform:none!important} lo refuerza). ---- */
  var _parRaf = 0, _parallaxBound = false;
  function applyParallax() {
    var map = byId("wmap"); if (!map) return;
    var sil = map.querySelector(".wsil"); if (!sil) return;
    if (reduceMotion()) { sil.style.transform = ""; return; }
    var scrolled = -map.getBoundingClientRect().top; if (scrolled < 0) scrolled = 0;
    sil.style.transform = "translate3d(0," + (scrolled * 0.12).toFixed(1) + "px,0)";
  }
  function bindParallax() {
    if (_parallaxBound) return; _parallaxBound = true;
    window.addEventListener("scroll", function () {
      if (_parRaf) return;
      _parRaf = requestAnimationFrame(function () { _parRaf = 0; applyParallax(); });
    }, { passive: true });
  }

  function worldBanner(selLevel, built) {
    var t = WORLD_THEME[selLevel]; if (!t) return "";
    var pr = PATH.levelProgress(selLevel, built);
    var n = PATH.LEVELS.indexOf(selLevel) + 1;
    return '<section class="world-banner" data-world="' + selLevel + '" style="' + worldVars(t) + '" aria-label="Mundo ' + n + ': ' + esc(t.worldName) + '">'
      + '<img class="world-banner__img" src="' + t.file + '" alt="" aria-hidden="true" decoding="async">'
      + ambLayer(t.ambientN)
      + '<div class="world-banner__body">'
      + '<span class="world-banner__eyebrow">Mundo ' + n + ' &middot; ' + selLevel + '</span>'
      + '<h2 class="world-banner__title">' + esc(t.worldName) + '</h2>'
      + '<div class="world-banner__meta">'
      + '<span class="world-banner__badge">' + selLevel + '</span>'
      + '<span>' + (WORLD_TAG[selLevel] || "") + '</span>'
      + '<span class="world-banner__bar"><i style="width:' + pr.pct + '%"></i></span>'
      + '<span>' + pr.done + '/' + pr.total + '</span>'
      + '</div></div>'
      + '<img class="world-banner__logo" src="assets/images/vesper_logo_inverted.png" alt="Vesper Academy" decoding="async">'
      + '</section>';
  }

  /* Selector de mundos en UNA fila de seis fichas (2026-10-30). Antes era
     encabezado + subtítulo + contador + cinta con scroll lateral + botón
     "Ver los N mundos que faltan", y justo debajo el banner repetía el
     nombre del mundo. El dueño: "tiene demasiadas cosas, la gente se va a
     confundir". Ahora cada ficha es sólo su código y su avance; el nombre
     lo dice el banner, y los bloqueados son un candado pequeño, no una
     tarjeta que grita "Bloqueado" cinco veces. */
  function worldsRibbon(built, selLevel) {
    var lockSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="10.7" width="14" height="9" rx="2.2"/><path d="M8 10.7V7.7a4 4 0 0 1 8 0v3"/></svg>';
    var chkSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.6l4.6 4.6L19 7.4"/></svg>';
    var html = PATH.LEVELS.map(function (lv) {
      var pr = PATH.levelProgress(lv, built), t = WORLD_THEME[lv] || {};
      var nm = WORLD_SHORT[lv] || t.worldName || lv, tag = WORLD_TAG[lv] || "";
      var done = pr.done, total = pr.total, pct = pr.pct, complete = total > 0 && done >= total;
      /* desbloqueado si: A1, ya venciste al jefe del mundo anterior, este mundo ya
         tiene avance propio (desbloqueo suave), o es el mundo seleccionado. */
      var reachable = PATH.regionUnlocked(lv, built) || lv === selLevel;
      var vars = '--w-accent:' + (t.accent || '#c5a059')
        + ';--w-accent-soft:' + (t.accentSoft || 'var(--gold-tint)')
        + ';--w-glow:' + (t.glow || 'rgba(197,160,89,.30)')
        + ';--pct:' + pct;
      var ring = '<span class="w-ring" aria-hidden="true"><span class="w-ring-hole"><span class="w-code">' + lv + '</span></span></span>';
      if (!reachable) {
        return '<button class="world locked" type="button" data-locked-world="1" style="' + vars + '"'
          + ' aria-label="Mundo ' + lv + ', ' + esc(nm) + ', ' + esc(tag) + '. Bloqueado: vence al guardián del mundo anterior para entrar.">'
          + ring + '<span class="w-lk">' + lockSvg + '</span></button>';
      }
      var sel = lv === selLevel;
      var stateTxt = complete ? 'Dominado, 100% completado'
        : (done > 0 ? done + ' de ' + total + ' lecciones, ' + pct + ' por ciento'
                    : total + ' lecciones, sin empezar');
      var pcLine = complete ? '<span class="w-done">' + chkSvg + '</span>' : '<span class="w-pc">' + done + '/' + total + '</span>';
      return '<button class="world' + (sel ? ' on' : '') + (complete ? ' complete' : '') + '" type="button" data-lvl="' + lv + '" style="' + vars + '"'
        + (sel ? ' aria-current="true"' : '')
        + ' aria-label="Mundo ' + lv + ', ' + esc(nm) + ', ' + esc(tag) + '. ' + stateTxt + (sel ? '. Seleccionado' : '') + '.">'
        + ring + pcLine + '</button>';
    }).join("");
    return '<div class="worlds worlds--lite" role="group" aria-label="Mundos: niveles A1 a C2">' + html + '</div>';
  }

  function worldsSection(built, selLevel) {
    return '<section class="worlds-sec worlds-sec--lite" aria-label="Selección de mundo">'
      + worldsRibbon(built, selLevel) + '</section>';
  }

  /* mapa: id de lección -> índice de parada en el render actual (para animar al avatar);
     AVATAR_LESSON = id de la lección donde descansa el gato (o "boss:NIVEL" si el mundo está listo). */
  var TRAIL_STOPS = {}, _indexFirst = true, AVATAR_LESSON = null;
  /* ¿el sendero muestra el mundo entero o sólo hasta donde llega la persona? */
  var _mapExpanded = false;

  function nodeHtml(lid, built, currentId, dx, stop) {
    var l = L[lid]; if (!l) return "";
    var stt = PATH.status(lid, built);
    var n = l.exercises ? l.exercises.length : 0;
    var glyph, attr, cls = "wbtn", wrapCls = "wnode", aria, label = "", stars = "", dis = "";
    if (stt === "completed") {
      cls += " completed"; wrapCls += " done"; glyph = nodeGlyph("completed"); attr = 'data-go="' + esc(lid) + '"';
      var sc = PATH.getScore(lid), s = PATH.stars(sc != null ? sc : 70), sh = '<span class="wstars" aria-hidden="true">';
      for (var i = 0; i < 3; i++) sh += (i < s ? "&#9733;" : '<span class="off">&#9733;</span>');
      stars = sh + "</span>";
      aria = l.title + " — completado" + (sc != null ? ", " + sc + " por ciento" : "");
    } else if (stt === "open") {
      cls += " open"; glyph = nodeGlyph("open"); attr = 'data-go="' + esc(lid) + '"';
      if (lid === currentId) {
        cls += " is-current";
        label = '<span class="wlabel">' + (Object.keys(built.completed).length ? "Continuar" : "Empieza") + '</span>';
      }
      aria = l.title + " — desbloqueado, " + n + " ejercicios, " + (l.xpReward || 0) + " XP";
    } else {
      cls += " locked"; wrapCls += " locked"; glyph = nodeGlyph("locked"); attr = 'data-locked="1"'; dis = ' aria-disabled="true"';
      aria = l.title + " — bloqueado, completa la lección anterior";
    }
    return '<div class="' + wrapCls + '" data-stop="' + stop + '" style="--dx:' + dx + 'px">' + label
      + '<button class="' + cls + '" ' + attr + ' aria-label="' + esc(aria) + '"' + dis + '>' + glyph + '</button>'
      + stars + '<span class="wtitle">' + esc(l.title) + '</span></div>';
  }

  /* mini-reto por destreza (repaso) — subordinado al Guardián del mundo */
  function castleHtml(selLevel, sk, built, dx, stop) {
    var meta = PATH.SKILLS[sk], rid = "review:" + selLevel + ":" + sk;
    var stt = P ? P.getState() : {};
    var mastered = !!((stt.achievements || {})["master:" + selLevel + ":" + sk]);
    var rsc = PATH.getScore(rid);
    var aria = "Mini-reto de " + meta.label + (mastered ? ", superado" + (rsc != null ? ", mejor " + rsc + " por ciento" : "") : ", desafío de destreza disponible");
    var crest = '<svg class="wcrest" viewBox="0 0 28 30" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true">'
      + '<path d="M14 2.4l9.6 3.7v7.7c0 6.6-4.8 10.6-9.6 13.4-4.8-2.8-9.6-6.8-9.6-13.4V6.1z"/><path d="m10.2 14.4 3 3 5.6-5.8"/></svg>';
    return '<div class="wnode mini' + (mastered ? " done" : "") + '" data-stop="' + stop + '" style="--dx:' + dx + 'px">'
      + '<span class="wlabel mini-lb">Mini-reto</span>'
      + '<button class="wbtn castle mini' + (mastered ? " completed" : "") + '" data-go="' + esc(rid) + '" aria-label="' + esc(aria) + '">' + crest + '</button>'
      + '<span class="wtitle">' + esc(meta.label) + (rsc != null ? ' · ' + rsc + '%' : '') + '</span></div>';
  }

  /* Guardián del mundo: 3 estados — locked / ready / conquered */
  function bossNodeHtml(selLevel, built, dx, stop) {
    var bm = bossMeta(selLevel);
    var available = PATH.bossUnlocked(selLevel, built);   // el jefe siempre se puede enfrentar
    var passed = !!(P && P.bossPassed && P.bossPassed(selLevel));
    var bid = "boss:" + selLevel;
    var beacon = '<svg class="wbeacon" viewBox="0 0 32 34" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true">'
      + '<path class="beam" d="M16 5.6 18.8 1.4M16 5.6 13.2 1.4M16 5.6l5.6-1.2M16 5.6l-5.6-1.2"/>'
      + '<circle cx="16" cy="7.4" r="2.2"/>'
      + '<path d="M12 31h8M12.8 31l1.4-12h3.6l1.4 12M12 19h8l-1-4.4h-6z"/></svg>';
    var cls = "wbtn boss", attr, label, title, aria;
    if (passed) {
      cls += " conquered"; attr = 'data-go="' + bid + '"';
      label = '<span class="wlabel boss-lb">Umbral superado</span>';
      title = bm.name; aria = bm.name + ", guardián vencido. Repetir el examen.";
    } else if (available) {
      cls += " ready"; attr = 'data-go="' + bid + '"';
      label = '<span class="wlabel boss-lb">El Guardián</span>';
      title = bm.name; aria = bm.name + ", examen del mundo disponible. Véncelo para abrir el siguiente nivel (no hace falta terminar las lecciones).";
    } else {
      cls += " locked"; attr = 'data-locked-boss="1"';
      label = '<span class="wlabel boss-lb">Jefe del mundo</span>';
      title = bm.name; aria = bm.name + ", bloqueado.";
    }
    return '<div class="wnode wboss-node' + (passed ? " done" : "") + '" data-stop="' + stop + '" style="--dx:' + dx + 'px">'
      + label + '<button class="' + cls + '" ' + attr + ' aria-label="' + esc(aria) + '">'
      + (BOSS_PORTRAIT[selLevel] ? '<img class="boss-node-photo" src="' + BOSS_PORTRAIT[selLevel] + '" alt="" loading="lazy" decoding="async" onerror="window.__vbossFallback(this,\'' + selLevel + '\')">' : beacon)
      + '</button>'
      + '<span class="wtitle">' + esc(title) + '</span>'
      + (passed ? '<span class="wbridge" aria-hidden="true"></span>' : '') + '</div>';
  }

  /* ===== El decorado del mundo ==============================================
     Piezas ilustradas (casa, farol, pino, torre, cristal…) generadas en el
     estilo grabado de la marca —navy con filete de oro— y recortadas a WEBP
     transparente por _scripts/slice_map_props.py.

     Vienen a sustituir a las ~834 formas que el generador de terreno sembraba
     por los márgenes: aquéllas se pintaban al 20 % de opacidad y salían medio
     recortadas por el borde, así que no leían como paisaje sino como ruido.
     Éstas son DOCE, van a tamaño real y a plena opacidad, y están colocadas a
     mano para que no pisen ni el sendero ni los rótulos.
     ========================================================================= */
  var WORLD_PROPS = {
    A1: ["p_a1_1", "p_a1_2", "p_a1_3", "p_a1_4", "p_a1_5"],   /* casa, farol, seto, árbol, pozo */
    A2: ["p_a2_1", "p_a2_2", "p_a2_3", "p_a2_4", "p_a2_5"],   /* pino, setas, roca, poste, helecho */
    B1: ["p_b1_1", "p_b1_2", "p_b1_4", "p_b1_5"],             /* casa, reloj, torre, topiario */
    B2: ["p_b2_1", "p_b2_2", "p_b2_3", "p_b2_4"],             /* rascacielos, obelisco, cima, arco */
    C1: ["p_c1_1", "p_c1_2", "p_c1_4", "p_c1_5"],             /* planeta, cristales, estrella, rosa */
    C2: ["p_c2_1", "p_c2_2", "p_c2_3", "p_c2_4"]              /* torreón, arco, cristal, cofre */
  };
  /* Los huecos: alto en % del mapa, margen, sangrado en % y CAJA en px.
     La caja se da como máximo de ancho Y de alto, no como ancho a secas: las
     piezas van de 52x200 (el farol) a 200x110 (el banco), así que fijando sólo
     el ancho el farol salía de 220px de alto y se comía la pantalla. Con una
     caja, cada pieza se ajusta dentro conservando su proporción y todas pesan
     lo mismo en la composición.

     El mapa mide 340 y los nodos vagan ±64 desde el centro, así que a cada
     lado queda una franja de ~76px: de ahí que ninguna caja pase de 84. */
  var PROP_SLOTS = [
    { t:  7, s: "L", o: 0, w: 84, h: 78 }, { t: 14, s: "R", o: 1, w: 62, h: 88 },
    { t: 21, s: "L", o: 2, w: 58, h: 58 }, { t: 29, s: "R", o: 0, w: 78, h: 76 },
    { t: 37, s: "L", o: 1, w: 72, h: 82 }, { t: 45, s: "R", o: 3, w: 54, h: 56 },
    { t: 53, s: "L", o: 0, w: 82, h: 80 }, { t: 61, s: "R", o: 1, w: 66, h: 70 },
    { t: 69, s: "L", o: 3, w: 56, h: 58 }, { t: 77, s: "R", o: 0, w: 76, h: 78 },
    { t: 85, s: "L", o: 1, w: 62, h: 66 }, { t: 93, s: "R", o: 2, w: 58, h: 62 }
  ];
  /* Doce huecos fijos alcanzaban para un mapa corto, pero el sendero mide
     de 15 a 50 paradas: con el mundo desplegado quedaban tramos de una
     pantalla entera sin nada. Ahora los huecos salen del largo real —una
     pieza cada ~1,15 paradas, alternando lados— y las tallas recorren
     PROP_SLOTS. Las piezas repetidas se reflejan una sí y otra no para que
     el mismo farol no se lea como un sello. */
  function propsLayer(lv, nStops) {
    var set = WORLD_PROPS[lv];
    if (!set || !set.length) return "";
    var N = Math.max(PROP_SLOTS.length, Math.round((nStops || 0) * 1.15));
    var h = '<div class="wprops" aria-hidden="true">';
    for (var i = 0; i < N; i++) {
      var s = PROP_SLOTS[i % PROP_SLOTS.length];
      var side = (i % 2) ? "R" : "L";
      var top = ((i + 0.5) / N) * 100 + (trnd(i + 3) - 0.5) * (60 / N);
      top = Math.max(1, Math.min(95, top));
      /* el desfase evita que la misma pieza caiga siempre en el mismo lado */
      var f = set[(i + Math.floor(i / set.length)) % set.length];
      var flip = (Math.floor(i / set.length) % 2) ? "transform:scaleX(-1);" : "";
      /* La caja va FIJA (width/height + object-fit:contain), no como máximo:
         así mide lo mismo antes de que la imagen lazy llegue, el mapa no salta
         al cargar y placeProps() puede esquivar rótulos desde el primer pintado. */
      h += '<img src="assets/images/map/' + f + '.webp" alt="" loading="lazy" decoding="async"'
        + ' style="top:' + top.toFixed(2) + '%;' + (side === "L" ? "left" : "right") + ':' + s.o + '%;' + flip
        + 'width:' + s.w + 'px;height:' + s.h + 'px;object-position:' + (side === "L" ? "left" : "right") + ' center">';
    }
    return h + '</div>';
  }
  /* Vida entre las piezas: un polvo de estrellas que titila (dos capas de
     fondo, cero nodos) y luciérnagas del color del mundo, tantas como pida
     el largo del sendero, con posición determinista para que no bailen
     entre re-pintados. */
  function glowLayer(nStops) {
    var n = Math.max(6, Math.round((nStops || 0) * 0.7)), h = '<div class="wglow" aria-hidden="true"><b></b><b></b>';
    for (var i = 0; i < n; i++) {
      var side = trnd(i * 2 + 1) < 0.5, x = side ? 2 + trnd(i + 11) * 20 : 78 + trnd(i + 11) * 20;
      h += '<i style="top:' + (((i + trnd(i + 5)) / n) * 100).toFixed(1) + '%;left:' + x.toFixed(1) + '%;'
        + 'animation-delay:-' + (trnd(i + 7) * 9).toFixed(1) + 's;animation-duration:' + (7 + trnd(i + 9) * 6).toFixed(1) + 's"></i>';
    }
    return h + '</div>';
  }

  function worldMap(selLevel, built) {
    var g = built.levels[selLevel];
    var banner = worldBanner(selLevel, built);
    if (!g || !g.total) return banner + '<p class="muted" style="text-align:center;margin:24px 0">Próximamente más lecciones en este mundo.</p>';
    var worldNo = PATH.LEVELS.indexOf(selLevel) + 1;
    /* "continuar" LOCAL del mundo: primera lección abierta (desbloqueada y sin completar)
       en el orden de render — ahí descansa el gato (no el continue global, que puede
       apuntar a otro nivel). */
    var localCurId = null;
    PATH.SKILL_ORDER.forEach(function (sk) {
      var ids = g.bySkill[sk]; if (!ids) return;
      ids.forEach(function (id) { if (!localCurId && PATH.status(id, built) === "open") localCurId = id; });
    });
    /* ---- pliegue del sendero ----------------------------------------
       Un mundo trae hasta 47 lecciones y para quien empieza 42 están
       bloqueadas: el mapa medía 7.300px y la única lección jugable caía
       fuera de pantalla. Por defecto dibujamos sólo hasta el grupo de
       destreza donde está la persona; el resto se ofrece con un botón.

       Se pliega ANTES de generar, no con CSS: paintTrail() mide el rect
       de cada [data-stop] y data-cur es un índice dentro de esa lista,
       así que ocultar nodos ya renderizados descuadraría sendero y gato.
       Al generar menos paradas, si/curStop/TRAIL_STOPS siguen cuadrando. */
    /* Dentro de cada destreza sólo dibujamos hasta un poco más allá de donde
       llega la persona: lo alcanzado + LOOKAHEAD candados como zanahoria. Una
       destreza totalmente bloqueada no se dibuja. Así el sendero pasa de 47
       paradas a ~15 sin dejar de ser continuo. */
    var LOOKAHEAD = 2, hiddenN = 0, nChecks = 0;
    var si = 0, curStop = -1, parts = "";
    TRAIL_STOPS = {};
    PATH.SKILL_ORDER.forEach(function (sk) {
      var ids = g.bySkill[sk]; if (!ids || !ids.length) return;
      var meta = PATH.SKILLS[sk];
      var doneN = ids.filter(function (id) { return built.completed[id]; }).length;

      var vis = ids;
      if (!_mapExpanded) {
        var lastReach = -1, k;
        for (k = 0; k < ids.length; k++) if (PATH.status(ids[k], built) !== "locked") lastReach = k;
        if (lastReach < 0) { hiddenN += ids.length; return; }   /* destreza aún fuera de alcance */
        vis = ids.slice(0, Math.min(ids.length, lastReach + 1 + LOOKAHEAD));
        hiddenN += ids.length - vis.length;
      }

      nChecks++;
      var ckPct = ids.length ? Math.round((doneN / ids.length) * 100) : 0;
      parts += '<div class="wcheck" role="separator" aria-label="' + esc(meta.label) + ', ' + doneN + ' de ' + ids.length + ' completadas">'
        + '<span class="ck-ic" aria-hidden="true">' + (SKILL_ICONS[sk] || "") + '</span>' + esc(meta.label)
        + '<span class="ct">' + doneN + '/' + ids.length + '</span>'
        + '<span class="ck-bar" aria-hidden="true"><i style="width:' + ckPct + '%"></i></span></div>';
      vis.forEach(function (id) {
        if (id === localCurId) curStop = si;
        TRAIL_STOPS[id] = si;
        parts += nodeHtml(id, built, localCurId, dxFor(si), si); si++;
      });
      if (ids.length >= 2 && doneN === ids.length) { parts += castleHtml(selLevel, sk, built, dxFor(si), si); si++; }
    });
    if (!parts) return banner + '<p class="muted" style="text-align:center;margin:24px 0">Próximamente más lecciones en este mundo.</p>';
    /* Guardián del mundo: siempre la última parada del sendero */
    var bossStop = si;
    parts += bossNodeHtml(selLevel, built, dxFor(si), si); si++;
    TRAIL_STOPS["boss:" + selLevel] = bossStop;
    if (curStop < 0) curStop = bossStop;            // mundo completo => el gato espera junto al jefe
    AVATAR_LESSON = localCurId || ("boss:" + selLevel);
    var t = WORLD_THEME[selLevel] || {};
    /* El terreno de la isla NO puede ser el mismo archivo que el banner: al
       repetir la misma lámina arriba (cabecera) y abajo (fondo de la isla) se
       veía como dos imágenes encimadas. Cada superficie lleva la suya. */
    var terrainSrc = WORLD_TERRAIN[selLevel] || "";
    /* absoluta: una url() dentro de una variable CSS se resuelve contra la hoja
       que la usa (assets/css/leccion.css), no contra la página */
    var terrain = terrainSrc ? (";--w-terrain:url(" + new URL(terrainSrc, location.href).href + ")") : "";
    var startPennant = '<div class="wstart" aria-hidden="true"><span>' + (WORLD_UMBRAL[selLevel] || ('Mundo ' + worldNo)) + '</span></div>';
    var pj = currentLook();
    /* worldVars también en .wsky: el resplandor del horizonte y el color de
       la noche viven ahí, y .wsky es PADRE de .wisland, así que no heredaba
       el acento del mundo (se quedaba en el oro por defecto en los 6). */
    var scene = '<div class="wsky" style="' + worldVars(t) + '">'
      + '<div class="wisland" data-world="' + selLevel + '" style="' + worldVars(t) + terrain + '">'
      + '<div class="watmo" aria-hidden="true"></div>'
      + '<div class="wmap" id="wmap" data-world="' + selLevel + '" data-cur="' + curStop + '" style="' + worldVars(t) + '">'
      /* El paisaje: TRES hitos grabados repartidos a lo largo del recorrido,
         sacados de las láminas que ya ilustran ese mundo y recortados a
         máscara alfa, así que el color lo pone el acento y no el archivo.
         Sustituye a las ~834 formas SVG que el generador sembraba por los
         márgenes: allí eran casitas a medio recortar, aquí son lugares por
         los que pasas. Tres elementos en lugar de ochocientos. */
      + '<div class="wscape" aria-hidden="true"><i></i><i></i><i></i></div>'
      + glowLayer(si + nChecks) + propsLayer(selLevel, si + nChecks)
      /* Sendero: tres trazos, no siete. .wtrail-bed es la calzada (le da
         cuerpo al camino), .wtrail-line la ruta que falta —y la que MIDE el
         avatar con offset-path—, .wtrail-done la pisa en oro hasta el nodo
         actual. Se fueron road/tex/glow (la misma "d" pintada tres veces más)
         y la cuenta-cometa, que animaba un drop-shadow en bucle infinito. */
      + '<svg class="wtrail" aria-hidden="true" focusable="false" preserveAspectRatio="none"><path class="wtrail-bed"/><path class="wtrail-line"/><path class="wtrail-done"/></svg>'
      + '<div class="wavatar' + (pj.animal ? ' has-pelaje' : '') + '" data-pelaje="' + pj.pelaje + '" aria-hidden="true">'
      + '<img class="wcat" src="' + pj.src + '" alt="" decoding="async">'
      + '<span class="wacc">' + pj.svg + '</span><span class="wfx" aria-hidden="true"></span></div>'
      + ambLayer(t.mapN || 3, true) + startPennant + parts
      + '</div></div></div>';
    /* el botón vive FUERA de .wmap: no lleva data-stop y no entra en la medición */
    var moreBtn = hiddenN > 0
      ? '<div class="wmore"><button class="wmore__btn" type="button" id="mapMore">'
        + 'Ver las ' + hiddenN + ' lecciones restantes de este mundo'
        + '<span class="wmore__sub">Se desbloquean conforme avanzas</span></button></div>'
      : "";
    return banner + scene + moreBtn;
  }

  /* ============================================================
     RECINTO TEMÁTICO DE VOCABULARIO ("ramas")
     ============================================================ */
  /* ilustración SVG de la estructura por tipo (casa, cueva, torre…) */
  var DEN_STRUCT = {
    house: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M10 30 32 12l22 18"/><path d="M15 28v22h34V28"/><rect x="27" y="38" width="10" height="12"/><rect x="19" y="31" width="7" height="6"/><rect x="38" y="31" width="7" height="6"/></svg>',
    cave: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M6 52c0-20 12-34 26-34s26 14 26 34"/><path d="M22 52c0-9 4.5-15 10-15s10 6 10 15"/><path d="M14 33l5 3M50 33l-5 3M32 22v6"/></svg>',
    harbor: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M32 10v30"/><circle cx="32" cy="16" r="4"/><path d="M18 34c0 9 6 14 14 14s14-5 14-14"/><path d="M12 34h10M42 34h10M8 52h48"/></svg>',
    tower: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M22 22h20v30H22z"/><path d="M20 22l3-8 3 4 3-6 3 6 3-4 3 6 3-4 3 8"/><rect x="28" y="40" width="8" height="12"/><path d="M27 30h10"/></svg>',
    observatory: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M14 50a18 18 0 0 1 36 0z"/><path d="M40 22l10-6M44 24l8 2"/><circle cx="36" cy="24" r="3"/><path d="M8 50h48"/></svg>',
    castle: '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M14 26v26h36V26"/><path d="M14 26v-6h6v4h6v-4h6v4h6v-4h6v6"/><rect x="27" y="38" width="10" height="14"/><path d="M22 32h6M36 32h6"/></svg>'
  };
  /* iconos SVG por rama (clave semántica -> glifo); respaldo genérico */
  var BRANCH_ICN = {
    pot:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 10h16l-1.4 8.2a2 2 0 0 1-2 1.8H7.4a2 2 0 0 1-2-1.8z"/><path d="M3 10h18M9 6c0-1.2 1-1.6 1.5-2M14 6c0-1.2 1-1.6 1.5-2"/></svg>',
    sofa:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 11V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3"/><path d="M3 12a2 2 0 0 1 2 2v3h14v-3a2 2 0 0 1 2-2 2 2 0 0 1 0 4v3H3v-3a2 2 0 0 1 0-4z"/></svg>',
    bed:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18V8M3 13h18v5M21 18v-4a2 2 0 0 0-2-2H9v3"/><circle cx="6.5" cy="10.5" r="1.6"/></svg>',
    leaf:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M5 19c0-9 6-14 15-14 0 9-6 14-15 14z"/><path d="M5 19c3-5 6-7 11-9"/></svg>',
    compass:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/></svg>',
    bag:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8h12l1 12H5z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>',
    drop:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3c4 5 6 8 6 11a6 6 0 0 1-12 0c0-3 2-6 6-11z"/></svg>',
    bolt:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L4 14h6l-1 8 9-12h-6z"/></svg>',
    anchor:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="2.4"/><path d="M12 7.4V21M5 13a7 7 0 0 0 14 0M5 13H3m16 0h2"/></svg>',
    flame:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 2c.4 2.9-1.1 4.4-2.6 5.9C9 9.3 8 10.9 8 13a4.5 4.5 0 0 0 9 0c0-1.4-.5-2.6-1.3-3.6-.3.9-1 1.5-1.9 1.7 1-2.3.3-4.9-1.8-7.1z"/></svg>',
    globe:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18"/></svg>',
    chat:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.5 8.5 0 0 1-12.2 7.7L3 21l1.9-5.6A8.5 8.5 0 1 1 21 11.5z"/></svg>',
    briefcase:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7.5" width="18" height="12" rx="2"/><path d="M9 7.5V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1.5M3 12h18"/></svg>',
    book:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5.5A2 2 0 0 1 6 4h13v15H6a2 2 0 0 0-2 2z"/><path d="M19 19v3H6a2 2 0 0 1-2-2"/></svg>',
    gear:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 13a7.7 7.7 0 0 0 0-2l2-1.5-2-3.4-2.3 1a7.7 7.7 0 0 0-1.7-1l-.4-2.5h-4l-.4 2.5a7.7 7.7 0 0 0-1.7 1l-2.3-1-2 3.4 2 1.5a7.7 7.7 0 0 0 0 2l-2 1.5 2 3.4 2.3-1a7.7 7.7 0 0 0 1.7 1l.4 2.5h4l.4-2.5a7.7 7.7 0 0 0 1.7-1l2.3 1 2-3.4z"/></svg>',
    link:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M9 15l6-6M10 6l1-1a4 4 0 0 1 6 6l-1 1M14 18l-1 1a4 4 0 0 1-6-6l1-1"/></svg>',
    star:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3.4l2.5 5 5.5.6-4.1 3.7 1.1 5.4L12 16.9l-5 2.6 1.1-5.4-4.1-3.7 5.5-.6z"/></svg>',
    eye:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="2.8"/></svg>',
    scroll:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4h11a2 2 0 0 1 2 2v11M6 4a2 2 0 0 0-2 2v2h4M8 20h9a2 2 0 0 0 2-2"/><path d="M8 4v14a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-2h4"/></svg>',
    spark:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8z"/></svg>',
    crown:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8l3 9h10l3-9-5 4-3-6-3 6z"/><path d="M6 20h12"/></svg>',
    scepter:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M8 16L18 6"/><circle cx="19" cy="5" r="2.4"/><path d="M5 21l4-4M6 16l2 2"/></svg>',
    gem:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M6 4h12l3 5-9 11L3 9z"/><path d="M3 9h18M9 4l3 16M15 4l-3 16"/></svg>',
    feather:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M19 5a6 6 0 0 0-8 0L5 11v8M5 19l9-9M8 16h6"/></svg>',
    family:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="7" r="2.6"/><circle cx="16" cy="7" r="2.6"/><path d="M3.5 19v-1.5a4 4 0 0 1 4-4h1a4 4 0 0 1 4 4V19M12.5 19v-1.5a4 4 0 0 1 4-4h0a4 4 0 0 1 4 4V19"/></svg>'
  };
  function branchIcon(k) { return '<span aria-hidden="true">' + (BRANCH_ICN[k] || BRANCH_ICN.spark) + '</span>'; }
  var DEN_STRUCT_NAME = { house:"la casa", cave:"la cueva", harbor:"el puerto", tower:"la torre", observatory:"el observatorio", castle:"el castillo" };
  /* emblemas temáticos (IA, Higgsfield) — uno por mundo; cae al SVG de estructura si falta el archivo */
  var DEN_EMBLEM = {
    A1: "assets/images/vocab/den_a1.webp", A2: "assets/images/vocab/den_a2.webp",
    B1: "assets/images/vocab/den_b1.webp", B2: "assets/images/vocab/den_b2.webp",
    C1: "assets/images/vocab/den_c1.webp", C2: "assets/images/vocab/den_c2.webp"
  };
  /* onerror en scope global (IIFE): respaldo = SVG de la estructura */
  window.__vdenFallback = function (img, structure) {
    try { if (img) { var p = img.parentNode; img.outerHTML = DEN_STRUCT[structure] || ""; if (p) p.classList.add("is-svg"); } } catch (e) {}
  };
  function denEmblemImg(level, structure) {
    var src = DEN_EMBLEM[level];
    if (!src) return DEN_STRUCT[structure] || "";
    return '<img class="den-emblem__img" src="' + src + '" alt="" loading="lazy" decoding="async" onerror="window.__vdenFallback(this,\'' + structure + '\')">';
  }
  /* emblemas por SALA (gato de Vesper temático, generados con Higgsfield).
     clave = "NIVEL-idSala"; si falta el archivo, cae al glifo SVG de la rama. */
  var BRANCH_EMBLEM = {
    "A1-kitchen":1,"A1-living":1,"A1-bedroom":1,"A1-bathroom":1,"A1-garden":1,"A1-family":1,
    "A2-entrance":1,"A2-market":1,"A2-spring":1,"A2-depths":1,"A2-camp":1,"A2-echoes":1,
    "B1-dock":1,"B1-lighthouse":1,"B1-warehouse":1,"B1-deck":1,"B1-bridge":1,"B1-galley":1,
    "B2-hall":1,"B2-library":1,"B2-workshop":1,"B2-balcony":1,"B2-vault":1,"B2-studio":1,
    "C1-dome":1,"C1-telescope":1,"C1-archive":1,"C1-aurora":1,"C1-nebula":1,"C1-comet":1,
    "C2-gate":1,"C2-throne":1,"C2-vault":1,"C2-spire":1,"C2-sanctum":1,"C2-courtyard":1
  };
  /* emblemas de las salas de DESBORDE ("Más …", auto-generadas por cubo temático).
     El id de la sala es "more-<cubo>" o "more-<cubo>-<n>"; todos los trozos del mismo
     cubo comparten emblema. Dos capas: (1) por CUBO (uno por tema, reusado en todos los
     mundos — archivo more_<cubo>.webp); (2) override por NIVEL para los mundos más
     inmersivos (more_<nivel>_<cubo>.webp). Sin archivo -> glifo SVG. */
  var MORE_BUCKET_EMBLEM = {
    verbs:1, phrases:1, food:1, nature:1, travel:1, work:1,
    tech:1, people:1, body:1, time:1, other:1
  };
  var MORE_LEVEL_EMBLEM = { "C1-phrases":1, "C1-other":1, "A2-nature":1 };
  /* cubo temático de una sala de desborde: "more-other-2" -> "other" */
  function moreBucket(branchId) { return String(branchId).replace(/^more-/, "").replace(/-\d+$/, ""); }
  /* onerror en scope global (IIFE): respaldo = glifo SVG de la rama */
  window.__vbranchFallback = function (img, iconKey) {
    try { if (img) { var p = img.parentNode; img.outerHTML = (BRANCH_ICN[iconKey] || BRANCH_ICN.spark);
      if (p) { p.classList.remove("has-img"); p.classList.add("is-svg"); } } } catch (e) {}
  };
  /* archivo webp del emblema de una sala (curada o de desborde), o "" si no hay */
  function branchEmblemSrc(level, branchId) {
    if (BRANCH_EMBLEM[level + "-" + branchId])
      return "assets/images/vocab/branch_" + String(level).toLowerCase() + "_" + branchId + ".webp";
    if (/^more-/.test(branchId)) {
      var b = moreBucket(branchId);
      if (MORE_LEVEL_EMBLEM[level + "-" + b])
        return "assets/images/vocab/more_" + String(level).toLowerCase() + "_" + b + ".webp";
      if (MORE_BUCKET_EMBLEM[b])
        return "assets/images/vocab/more_" + b + ".webp";
    }
    return "";
  }
  function branchHasImg(level, branchId) { return !!branchEmblemSrc(level, branchId); }
  function branchEmblemHtml(level, branchId, iconKey) {
    var src = branchEmblemSrc(level, branchId);
    if (!src) return branchIcon(iconKey);
    return '<img class="branch-emblem__img" src="' + src + '" alt="" loading="lazy" decoding="async"'
      + ' onerror="window.__vbranchFallback(this,\'' + iconKey + '\')">';
  }
  /* consejos que Vesper rota mientras explica cada tarjeta de vocabulario */
  var DECK_TIPS = [
    "Tócala para escucharla y repítela en voz alta.",
    "Imagina una escena con la palabra para recordarla.",
    "Cúbrela con el dedo y trata de recordar el significado.",
    "Úsala hoy en una frase tuya."
  ];
  /* B1+: Vesper explica en inglés (aprendizaje monolingüe) */
  var DECK_TIPS_EN = [
    "Say it aloud and picture when you'd use it.",
    "Try to use it in your own sentence today.",
    "Notice its tone and how formal it feels.",
    "Link it to a word you already know."
  ];
  /* a partir de B1 la tarjeta se explica en inglés en vez de traducirse */
  var ENG_LEVELS = { B1: 1, B2: 1, C1: 1, C2: 1 };
  /* etiqueta de categoría gramatical (cómo se usa la palabra) */
  var POS_LABEL = {
    noun:   { es: "sustantivo", en: "noun" },
    verb:   { es: "verbo",      en: "verb" },
    adj:    { es: "adjetivo",   en: "adjective" },
    adv:    { es: "adverbio",   en: "adverb" },
    prep:   { es: "preposición", en: "preposition" },
    conn:   { es: "conector",   en: "connector" },
    phrase: { es: "expresión",  en: "phrase" },
    idiom:  { es: "modismo",    en: "idiom" }
  };
  function posLabel(pos, eng) {
    var p = POS_LABEL[pos]; if (!p) return "";
    return eng ? p.en : p.es;
  }

  /* tarjetas "ya las sé": persistencia local por nivel|palabra */
  var DEN_KNOWN_KEY = "vesper_vocab_known";
  function knownMap() { try { return JSON.parse(localStorage.getItem(DEN_KNOWN_KEY) || "{}") || {}; } catch (e) { return {}; } }
  function saveKnown(m) { try { localStorage.setItem(DEN_KNOWN_KEY, JSON.stringify(m)); } catch (e) {} }
  function cardKey(lv, en) { return lv + "|" + ("" + en).toLowerCase().replace(/^to\s+/, ""); }
  function branchProgress(lv, br) {
    var m = knownMap(), n = 0;
    br.cards.forEach(function (c) { if (m[cardKey(lv, c.en)]) n++; });
    return { done: n, total: br.cards.length };
  }
  function denProgress(den) {
    var done = 0, total = 0;
    den.branches.forEach(function (br) { var p = branchProgress(den.level, br); done += p.done; total += p.total; });
    return { done: done, total: total, pct: total ? Math.round(100 * done / total) : 0 };
  }

  /* ===== Burbujas flotantes de Vocabulario y Forja (2026-10-30) ===========
     Primero fueron botones fijos del dock; luego pestañas ancladas a las
     curvas del sendero. El dueño: que "vayan junto con el scrolleo", como
     las burbujas de chat de Messenger. Así que son dos burbujas fijas a un
     borde de la pantalla: salen con un pop cuando el mapa entra a la vista
     y se esconden al volver arriba (no tapan el saludo ni la lección).
     Se arrastran y, al soltarlas, se pegan al borde más cercano; la posición
     se recuerda en este dispositivo. La Forja lleva su contador de
     pendientes como globito rojo. Al tocarlas abren el cajón desde su lado. */
  var TAB_ART = { forja: "assets/images/map/tab_forja.webp" };
  var HEADS_KEY = "vesper_heads";
  window.__vforjaGlyph = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9h11l3-2h2v4h-2l-3 1v2a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3v-1H4z"/><path d="M8 20h8M12 17v3"/></svg>';
  function headsHtml(selLevel) {
    var d = densData()[selLevel], hasDen = !!(d && d.branches && d.branches.length);
    var FJ = window.VESPER_FORJA, due = FJ ? FJ.dueCount() : 0;
    var h = "";
    if (hasDen) h += '<button class="vhead" type="button" data-tab="vocab" aria-haspopup="dialog" aria-label="' + esc("Vocabulario de " + d.name) + '">'
      + '<span class="vhead__ic">' + denEmblemImg(selLevel, d.structure) + '</span><span class="vhead__lb">Vocabulario</span></button>';
    h += '<button class="vhead" type="button" data-tab="forja" aria-haspopup="dialog" aria-label="La Forja: práctica sin final' + (due ? ", " + due + " pendientes" : "") + '">'
      + '<span class="vhead__ic"><img src="' + TAB_ART.forja + '" alt="" decoding="async" onerror="this.outerHTML=window.__vforjaGlyph"></span>'
      + '<span class="vhead__lb">Forja</span>' + (due ? '<em>' + (due > 99 ? "99+" : due) + '</em>' : "") + '</button>';
    return '<div class="vheads" id="vheads" role="group" aria-label="Práctica extra" style="' + worldVars(WORLD_THEME[selLevel] || {}) + '">' + h + '</div>';
  }
  function headsPos() {
    try { var o = JSON.parse(localStorage.getItem(HEADS_KEY) || "null"); if (o && (o.side === "l" || o.side === "r")) return o; } catch (e) {}
    return { side: "r", y: 0.42 };
  }
  /* coloca la pila contra su borde; y es fracción del alto útil */
  function headsPlace(el, pos) {
    var M = 16, top = 76, bottom = 160;                  /* margen: el rótulo es más ancho que la burbuja */
    var W = window.innerWidth, H = window.innerHeight, w = el.offsetWidth, h = el.offsetHeight;
    var span = Math.max(0, H - top - bottom - h);
    el.style.left = (pos.side === "l" ? M : W - w - M) + "px";
    el.style.top = Math.round(top + span * Math.max(0, Math.min(1, pos.y))) + "px";
    el.setAttribute("data-side", pos.side);
  }
  /* visibles sólo con el mapa en pantalla */
  function headsSync() {
    var el = byId("vheads"), sky = document.querySelector(".wsky");
    if (!el) return;
    var on = false;
    if (sky && !byId("wdrawer")) {
      var r = sky.getBoundingClientRect(), H = window.innerHeight;
      on = r.top < H * 0.55 && r.bottom > H * 0.45;
    }
    if (on !== el.classList.contains("on")) el.classList.toggle("on", on);
  }
  var _headsBound = false, _headsRaf = 0;
  function bindHeads(selLevel) {
    var el = byId("vheads"); if (!el) return;
    var pos = headsPos();
    el.classList.add("still");                          /* sin animar la primera colocación */
    headsPlace(el, pos);
    requestAnimationFrame(function () { el.classList.remove("still"); });
    var drag = null, moved = false;
    el.addEventListener("pointerdown", function (e) {
      if (e.button) return;
      var r = el.getBoundingClientRect();
      drag = { id: e.pointerId, dx: e.clientX - r.left, dy: e.clientY - r.top, x0: e.clientX, y0: e.clientY };
      moved = false;
    });
    el.addEventListener("pointermove", function (e) {
      if (!drag || e.pointerId !== drag.id) return;
      if (!moved && Math.abs(e.clientX - drag.x0) + Math.abs(e.clientY - drag.y0) < 8) return;
      if (!moved) { moved = true; el.classList.add("drag"); try { el.setPointerCapture(e.pointerId); } catch (x) {} }
      el.style.left = (e.clientX - drag.dx) + "px";
      el.style.top = (e.clientY - drag.dy) + "px";
    });
    function drop(e) {
      if (!drag || e.pointerId !== drag.id) return;
      drag = null;
      if (!moved) return;
      el.classList.remove("drag");
      var r = el.getBoundingClientRect(), H = window.innerHeight;
      var span = Math.max(1, H - 76 - 160 - r.height);
      pos = { side: (r.left + r.width / 2) < window.innerWidth / 2 ? "l" : "r", y: Math.max(0, Math.min(1, (r.top - 76) / span)) };
      try { localStorage.setItem(HEADS_KEY, JSON.stringify(pos)); } catch (x) {}
      headsPlace(el, pos);
    }
    el.addEventListener("pointerup", drop);
    el.addEventListener("pointercancel", drop);
    each("#vheads .vhead", function (b) {
      b.onclick = function (e) {
        if (moved) { moved = false; e.preventDefault(); return; }   /* fue un arrastre, no un toque */
        el.classList.remove("on");
        openDrawer(b.getAttribute("data-tab"), pos.side, selLevel, b);
      };
    });
    headsSync();
    if (_headsBound) return; _headsBound = true;
    window.addEventListener("scroll", function () {
      if (_headsRaf) return;
      _headsRaf = requestAnimationFrame(function () { _headsRaf = 0; headsSync(); });
    }, { passive: true });
    window.addEventListener("resize", function () {
      var h = byId("vheads"); if (h) { h.classList.add("still"); headsPlace(h, headsPos()); h.classList.remove("still"); headsSync(); }
    });
  }
  function forjaSubline() {
    var FJ = window.VESPER_FORJA;
    if (!FJ) return "Rondas nuevas cada vez, sin final";
    var due = FJ.dueCount(), rounds = FJ.roundsToday();
    if (due > 0) return "Tienes " + due + " ejercicio" + (due === 1 ? "" : "s") + " listo" + (due === 1 ? "" : "s") + " para volver";
    if (rounds > 0) return "Llevas " + rounds + " ronda" + (rounds === 1 ? "" : "s") + " hoy · récord " + FJ.bestToday() + " aciertos";
    return "Rondas nuevas cada vez, sin final";
  }
  function drawerBody(kind, selLevel) {
    var go = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h13"/><path d="m12 5 7 7-7 7"/></svg>';
    if (kind === "vocab") {
      var d = densData()[selLevel], pr = denProgress(d);
      return '<div class="wdrawer__art">' + denEmblemImg(selLevel, d.structure) + '</div>'
        + '<span class="wdrawer__ey">Vocabulario</span>'
        + '<h2 class="wdrawer__t" id="wdrawerT">' + esc(d.name) + '</h2>'
        + '<p class="wdrawer__p">' + d.branches.length + ' salas con tarjetas y actividades, agrupadas por tema. Entra a la que quieras: no hace falta seguir un orden.</p>'
        + '<div class="wdrawer__bar" role="img" aria-label="' + pr.done + ' de ' + pr.total + ' tarjetas dominadas"><i style="width:' + pr.pct + '%"></i></div>'
        + '<p class="wdrawer__ct"><b>' + pr.done + '</b> de ' + pr.total + ' tarjetas dominadas</p>'
        + '<button class="wdrawer__go" type="button" data-drawer-go="vocab">Explorar vocabulario' + go + '</button>';
    }
    var modes = [["escucha", "Escucha"], ["vocab", "Vocabulario"], ["gramatica", "Gramática"]];
    return '<div class="wdrawer__art"><img src="' + TAB_ART.forja + '" alt="" decoding="async" onerror="this.outerHTML=window.__vforjaGlyph"></div>'
      + '<span class="wdrawer__ey">Práctica sin final</span>'
      + '<h2 class="wdrawer__t" id="wdrawerT">La Forja</h2>'
      + '<p class="wdrawer__p">Cada ronda se arma con ejercicios distintos de todo lo que ya viste. Lo que fallas vuelve pronto; lo que dominas se espacia.</p>'
      + '<p class="wdrawer__ct">' + esc(forjaSubline()) + '</p>'
      + '<button class="wdrawer__go" type="button" data-drawer-go="forja">Practicar' + go + '</button>'
      + '<p class="wdrawer__or">o sólo una destreza:</p>'
      + '<div class="wdrawer__modes">' + modes.map(function (m) {
          return '<button type="button" data-drawer-go="forja:' + m[0] + '">' + m[1] + '</button>';
        }).join("") + '</div>';
  }
  var _drawerFrom = null;
  function openDrawer(kind, side, selLevel, from) {
    closeDrawer(true);
    _drawerFrom = from || null;
    var x = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>';
    var wrap = document.createElement("div");
    wrap.className = "wdrawer-veil"; wrap.id = "wdrawer";
    wrap.setAttribute("style", worldVars(WORLD_THEME[selLevel] || {}));
    wrap.innerHTML = '<aside class="wdrawer wdrawer--' + side + '" role="dialog" aria-modal="true" aria-labelledby="wdrawerT" data-kind="' + kind + '">'
      + '<button class="wdrawer__x" type="button" aria-label="Cerrar">' + x + '</button>'
      + drawerBody(kind, selLevel) + '</aside>';
    document.body.appendChild(wrap);
    void wrap.offsetWidth;
    wrap.classList.add("on");
    wrap.onclick = function (e) { if (e.target === wrap) closeDrawer(); };
    wrap.querySelector(".wdrawer__x").onclick = function () { closeDrawer(); };
    each("#wdrawer [data-drawer-go]", function (b) {
      b.onclick = function () {
        var g = b.getAttribute("data-drawer-go");
        if (g === "vocab") { closeDrawer(true); renderDen(selLevel); }
        else location.search = "?id=" + encodeURIComponent(g);
      };
    });
    document.addEventListener("keydown", drawerKeys, true);
    try { wrap.querySelector(".wdrawer__go").focus({ preventScroll: true }); } catch (e) {}
    track("side_tab_open", { tab: kind, level: selLevel });
  }
  function drawerKeys(e) {
    var w = byId("wdrawer"); if (!w) return;
    if (e.key === "Escape") { e.preventDefault(); closeDrawer(); return; }
    if (e.key !== "Tab") return;
    var f = w.querySelectorAll("button"); if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
  function closeDrawer(instant) {
    var w = byId("wdrawer"); if (!w) return;
    document.removeEventListener("keydown", drawerKeys, true);
    w.id = ""; w.classList.remove("on");
    if (instant || reduceMotion()) { w.remove(); headsSync(); }
    else setTimeout(function () { w.remove(); headsSync(); }, 280);
    if (_drawerFrom && !instant) try { _drawerFrom.focus({ preventScroll: true }); } catch (e) {}
    _drawerFrom = null;
  }


  /* ---- dock fijo del mapa ----
     Siempre sobre la barra de pestañas: el repaso (si hay pendientes), volver
     a mi lección y Ajustes (el engranaje del saludo quedaba fuera de pantalla
     en cuanto el hub abre sobre la lección actual, ver jumpToCurrent).
     Vocabulario y Forja salieron de aquí el 2026-10-30: ahora son pestañas
     flotantes que siguen el scroll (headsHtml). Con tres botones el dock va a
     la izquierda y deja libre la esquina de la burbuja del chat, que antes
     tapaba "Ajustes". */
  var DOCK_ICN = {
    srs: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12a8 8 0 1 0 2.4-5.7L4 8.6"/><path d="M4 4v4.6h4.6M12 8v4l3 2"/></svg>',
    me: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z"/><circle cx="12" cy="10" r="2.4"/></svg>'
  };
  function dockHtml(selLevel, srsDue) {
    var b = "";
    if (srsDue > 0)
      b += '<button type="button" data-dock="srs" aria-label="Repaso de errores, ' + srsDue + ' pendientes">' + DOCK_ICN.srs + '<span>Repaso</span><em>' + srsDue + '</em></button>';
    b += '<button type="button" data-dock="me" aria-label="Ir a mi lección actual en el mapa">' + DOCK_ICN.me + '<span>Mi lección</span></button>';
    b += '<button type="button" data-dock="cfg" aria-label="Configuración">' + HUB_ICN.gear + '<span>Ajustes</span></button>';
    return '<nav class="wdock on" id="wdock" aria-label="Atajos de práctica" data-world="' + esc(selLevel) + '">' + b + '</nav>'
      + '<div class="wdock-spacer" aria-hidden="true"></div>';
  }
  /* centra la lección actual. smooth=false para la entrada: el alumno
     aterriza ya en su sitio, sin ver pasar el saludo. */
  function jumpToCurrent(smooth) {
    var a = document.querySelector("#wmap .wbtn.is-current") || document.querySelector("#wmap .wavatar");
    if (!a) return false;
    a.scrollIntoView({ behavior: smooth && !reduceMotion() ? "smooth" : "auto", block: "center" });
    return true;
  }
  /* Al abrir el hub: tras trazar el sendero, salta a la lección actual.
     Fuentes e imágenes que llegan después mueven el layout; se re-centra
     cuando terminan, salvo que el alumno ya se haya movido por su cuenta. */
  function landOnCurrent() {
    if (!jumpToCurrent(false)) return;
    var moved = false, evs = ["wheel", "touchstart", "keydown", "mousedown"];
    var stop = function () { moved = true; evs.forEach(function (e) { window.removeEventListener(e, stop, true); }); };
    evs.forEach(function (e) { window.addEventListener(e, stop, { capture: true, passive: true }); });
    var again = function () { if (!moved) jumpToCurrent(false); };
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(again, function () {});
    if (document.readyState !== "complete") window.addEventListener("load", again, { once: true });
    setTimeout(stop, 4000);
  }
  function bindDock(selLevel) {
    var dock = byId("wdock"); if (!dock) return;
    each("#wdock [data-dock]", function (b) {
      b.onclick = function () {
        var k = b.getAttribute("data-dock");
        if (k === "srs") location.search = "?id=review:srs";
        else if (k === "cfg") location.href = "configuracion.html";
        else {
          jumpToCurrent(true);
          var cur = document.querySelector("#wmap .wbtn.is-current"); if (cur) try { cur.focus({ preventScroll: true }); } catch (e) {}
        }
      };
    });
  }

  /* vista principal del recinto: cabecera temática + ramas */
  function renderDen(selLevel) {
    clearLessonTheme();
    var d = densData()[selLevel];
    if (!d) { renderIndex(selLevel); return; }
    var t = WORLD_THEME[selLevel] || {};
    var pr = denProgress(d);
    var back = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>';
    var doneBadge = '<span class="bdone" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.6l4.6 4.6L19 7.4"/></svg></span>';
    var branches = d.branches.map(function (br, i) {
      var bp = branchProgress(selLevel, br), pct = bp.total ? Math.round(100 * bp.done / bp.total) : 0;
      var done = bp.total && bp.done >= bp.total;
      var hasImg = branchHasImg(selLevel, br.id);
      return '<button class="branch' + (done ? ' done' : '') + '" type="button" data-branch="' + esc(br.id) + '"'
        + ' aria-label="Sala ' + (i + 1) + ': ' + esc(br.name) + ', ' + bp.done + ' de ' + bp.total + ' tarjetas dominadas">'
        + '<span class="branch__ic' + (hasImg ? ' has-img' : '') + '">' + branchEmblemHtml(selLevel, br.id, br.icon) + (done ? doneBadge : "") + '</span>'
        + '<span class="branch__bd"><span class="branch__nm"><span class="branch__no">' + (i + 1) + '</span>' + esc(br.name) + '</span>'
        + '<span class="branch__hint">' + (br.hint ? esc(br.hint) + ' · ' : "") + br.cards.length + ' tarjetas</span>'
        + '<span class="branch__meta"><span class="branch__bar"><i style="width:' + pct + '%"></i></span>'
        + '<span class="branch__ct">' + bp.done + '/' + bp.total + '</span></span></span>'
        + '<span class="branch__go">' + (done ? "&#10003;" : "&#8250;") + '</span></button>';
    }).join("");
    show('<div class="wrap">'
      + '<div class="den" data-struct="' + esc(d.structure) + '" style="' + worldVars(t) + '">'
      + '<div class="den-top"><button class="den-back" id="denBack" type="button" aria-label="Volver al mapa">' + back + '</button>'
      + '<div class="muted" style="font-size:.85rem">Mundo ' + (PATH.LEVELS.indexOf(selLevel) + 1) + ' · ' + esc(selLevel) + '</div></div>'
      + '<header class="den-head">'
      + '<div class="den-head__in">'
      + '<span class="den-head__eyebrow">Recinto de ' + esc(DEN_STRUCT_NAME[d.structure] || "vocabulario") + '</span>'
      + '<h1 class="den-head__ttl">' + esc(d.name) + '</h1>'
      + '<p class="den-head__intro">' + esc(d.intro) + '</p>'
      + '<div class="den-head__stats">'
      + '<span class="den-stat"><b>' + d.branches.length + '</b><span>salas</span></span>'
      + '<span class="den-stat"><b>' + pr.total + '</b><span>palabras</span></span>'
      + '<span class="den-stat"><b>' + pr.pct + '%</b><span>dominado</span></span></div>'
      + '<div class="den-head__bar"><i style="width:' + pr.pct + '%"></i></div>'
      + '</div>'
      + '<div class="den-emblem">' + denEmblemImg(selLevel, d.structure) + '</div>'
      + '</header>'
      + '<div class="den-tree">' + branches + '</div>'
      + '<div class="den-review"><button class="btn btn-gold den-review__btn" id="denMix" type="button" aria-label="Repaso mezclado de todo el mundo ' + esc(selLevel) + '">'
      + '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 3h5v5M4 20l16.5-16.5M21 16v5h-5M15 15l6 6M4 4l5 5"/></svg>'
      + 'Repaso mezclado del mundo</button>'
      + '<p class="den-review__hint">Mezcla palabras de todas las salas · ' + pr.total + ' en total</p></div>'
      + '</div><div class="hub-toast" id="toast"></div></div>');
    byId("denBack").onclick = function () { renderIndex(selLevel); };
    each(".branch[data-branch]", function (b) {
      b.onclick = function () { openBranch(selLevel, b.getAttribute("data-branch")); };
    });
    var mix = byId("denMix"); if (mix) mix.onclick = function () { denMixedReview(selLevel); };
    gateAnims();
  }

  /* sala abierta: mazo de tarjetas con volteo + audio + "ya la sé" */
  function openBranch(selLevel, branchId) {
    var d = densData()[selLevel]; if (!d) return renderDen(selLevel);
    var br = null; d.branches.forEach(function (x) { if (x.id === branchId) br = x; });
    if (!br || !br.cards.length) return renderDen(selLevel);
    var idx = 0;
    var back = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>';
    var sayIc = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5L6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18 6a8 8 0 0 1 0 12"/></svg>';
    var prevIc = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 6l-6 6 6 6"/></svg>';
    var nextIc = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg>';
    var flipIc = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 8a8 8 0 0 1 14-4l2 2M20 6V2M20 16a8 8 0 0 1-14 4l-2-2M4 18v4"/></svg>';
    var hasPractice = br.practice && L[br.practice];
    var hasImg = branchHasImg(selLevel, br.id);
    var t = WORLD_THEME[selLevel] || {};
    show('<div class="wrap"><div class="den deck-wrap" data-struct="' + esc(d.structure) + '" style="' + worldVars(t) + '">'
      + '<div class="den-top"><button class="den-back" id="deckBack" type="button" aria-label="Volver a las ramas">' + back + '</button>'
      + (hasImg ? '<span class="branch__ic has-img" style="width:42px;height:42px">' + branchEmblemHtml(selLevel, br.id, br.icon) + '</span>' : '')
      + '<div style="min-width:0"><div style="font-weight:700">' + esc(br.name) + '</div>'
      + '<div class="muted" style="font-size:.82rem">' + esc(d.name) + '</div></div></div>'
      + '<div class="deck"><div class="deck-progress"><span class="dp-bar"><i id="dpFill"></i></span><span class="dp-ct" id="dpCt"></span></div>'
      + '<div class="deck-card" id="deckCard"><div class="dc-inner">'
      + '<div class="dc-face dc-front"><span class="dc-tag">English</span><span class="dc-word" id="dcEn"></span>'
      + '<span class="dc-pos" id="dcPos"></span>'
      + '<button class="dc-say" id="sayEn" type="button" aria-label="Escuchar">' + sayIc + '</button>'
      + '<span class="dc-hint">' + flipIc + ' Toca para ver el significado</span></div>'
      + '<div class="dc-face dc-back"><span class="dc-tag" id="dcBackTag">Español</span><span class="dc-word" id="dcEs"></span>'
      + '<button class="dc-trans" id="dcTrans" type="button" hidden>ver traducción</button>'
      + '<span class="dc-trans-es" id="dcTransEs" hidden></span>'
      + '<button class="dc-say" id="sayEn2" type="button" aria-label="Escuchar en inglés">' + sayIc + '</button>'
      + '<span class="dc-hint">' + flipIc + ' Toca para volver</span></div>'
      + '</div></div>'
      + '<div class="deck-explain"><div class="de-cat">' + mascot("explaining", false, "sm") + '</div>'
      + '<p class="deck-explain__tip" id="deckTip"></p></div>'
      + '<div class="deck-ctrls"><button class="dnav" id="dPrev" type="button" aria-label="Anterior">' + prevIc + '</button>'
      + '<button class="dknow" id="dKnow" type="button"></button>'
      + '<button class="dnav" id="dNext" type="button" aria-label="Siguiente">' + nextIc + '</button></div>'
      + '<div class="deck-actions"><button class="btn btn-gold" id="dQuiz" type="button">Poner a prueba</button>'
      + '<button class="btn btn-ghost" id="dType" type="button">Escribir</button>'
      + '<button class="btn btn-ghost" id="dMatch" type="button">Emparejar</button>'
      + (hasPractice ? '<button class="btn btn-ghost" id="dPractice" type="button">Practicar en la lección</button>' : "")
      + '</div></div></div><div class="hub-toast" id="toast"></div></div>');

    var card = byId("deckCard");
    function curCard() { return br.cards[idx]; }
    function render() {
      card.classList.remove("flipped");
      var c = curCard();
      byId("dcEn").textContent = c.en;
      var engLvl = !!ENG_LEVELS[selLevel];
      var useEng = engLvl && !!c.def;
      var posTx = posLabel(c.pos, engLvl);
      var dcPos = byId("dcPos");
      if (dcPos) { dcPos.textContent = posTx; dcPos.style.display = posTx ? "" : "none"; }
      var dcEs = byId("dcEs"), backTag = byId("dcBackTag"), trans = byId("dcTrans"), transEs = byId("dcTransEs");
      if (useEng) {
        dcEs.textContent = c.def; dcEs.classList.add("is-def");
        if (backTag) backTag.textContent = "In English";
        if (trans) { trans.hidden = false; trans.textContent = "ver traducción"; }
        if (transEs) { transEs.hidden = true; transEs.textContent = c.es; }
      } else {
        dcEs.textContent = c.es; dcEs.classList.remove("is-def");
        if (backTag) backTag.textContent = "Español";
        if (trans) trans.hidden = true;
        if (transEs) transEs.hidden = true;
      }
      byId("dpCt").textContent = (idx + 1) + " / " + br.cards.length;
      byId("dpFill").style.width = Math.round(100 * (idx + 1) / br.cards.length) + "%";
      byId("dPrev").disabled = idx === 0;
      byId("dNext").disabled = idx === br.cards.length - 1;
      var m = knownMap(), on = !!m[cardKey(selLevel, c.en)];
      var kb = byId("dKnow");
      kb.classList.toggle("on", on);
      kb.textContent = on ? "✓ Ya la sé" : "Marcar como sabida";
      var tip = byId("deckTip");
      if (tip) {
        var posNote = posTx ? ' <i class="deck-pos">(' + esc(posTx) + ')</i>' : '';
        if (useEng) tip.innerHTML = '<b>' + esc(c.en) + '</b>' + posNote + ' — ' + esc(c.def) + ' ' + DECK_TIPS_EN[idx % DECK_TIPS_EN.length];
        else tip.innerHTML = '<b>' + esc(c.en) + '</b>' + posNote + ' se dice <b>' + esc(c.es) + '</b>. ' + DECK_TIPS[idx % DECK_TIPS.length];
      }
    }
    card.onclick = function (e) { if (e.target.closest(".dc-say") || e.target.closest(".dc-trans")) return; card.classList.toggle("flipped"); };
    byId("sayEn").onclick = function (e) { e.stopPropagation(); speak(curCard().en); };
    byId("sayEn2").onclick = function (e) { e.stopPropagation(); speak(curCard().en); };
    var dcTransBtn = byId("dcTrans");
    if (dcTransBtn) dcTransBtn.onclick = function (e) {
      e.stopPropagation();
      var t = byId("dcTransEs"); if (!t) return;
      t.hidden = !t.hidden;
      this.textContent = t.hidden ? "ver traducción" : "ocultar traducción";
    };
    byId("dPrev").onclick = function () { if (idx > 0) { idx--; render(); } };
    byId("dNext").onclick = function () { if (idx < br.cards.length - 1) { idx++; render(); } };
    byId("dKnow").onclick = function () {
      var c = curCard(), m = knownMap(), k = cardKey(selLevel, c.en);
      if (m[k]) delete m[k]; else m[k] = 1;
      saveKnown(m); render();
      if (m[k] && idx < br.cards.length - 1) { setTimeout(function () { idx++; render(); }, 220); }
    };
    byId("deckBack").onclick = function () { renderDen(selLevel); };
    byId("dQuiz").onclick = function () { denQuiz(selLevel, br); };
    byId("dType").onclick = function () { denTyping(selLevel, br); };
    byId("dMatch").onclick = function () { denMatch(selLevel, br); };
    if (hasPractice) byId("dPractice").onclick = function () { location.search = "?id=" + encodeURIComponent(br.practice); };
    render();
  }

  /* mini-actividad: elige el significado correcto (de la rama) */
  function denQuiz(selLevel, br) {
    var d = densData()[selLevel];
    var pool = br.cards.slice();
    var qs = pool.slice();
    /* baraja y limita a 8 preguntas */
    for (var i = qs.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var tmp = qs[i]; qs[i] = qs[j]; qs[j] = tmp; }
    qs = qs.slice(0, Math.min(8, qs.length));
    var allEs = pool.map(function (c) { return c.es; });
    var qi = 0, correct = 0;
    var t = WORLD_THEME[selLevel] || {};
    var back = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>';
    function shell(inner) {
      show('<div class="wrap"><div class="den" data-struct="' + esc(d.structure) + '" style="' + worldVars(t) + '">'
        + '<div class="den-top"><button class="den-back" id="qBack" type="button" aria-label="Volver al mazo">' + back + '</button>'
        + '<div style="font-weight:700">' + esc(br.name) + ' · prueba</div></div>'
        + '<div class="den-quiz">' + inner + '</div></div><div class="hub-toast" id="toast"></div></div>');
      var qb = byId("qBack"); if (qb) qb.onclick = function () { openBranch(selLevel, br.id); };
    }
    function step() {
      if (qi >= qs.length) return finish();
      var c = qs[qi];
      /* 3 distractores + la correcta */
      var opts = [c.es], guard = 0;
      while (opts.length < Math.min(4, allEs.length) && guard < 50) {
        var cand = allEs[Math.floor(Math.random() * allEs.length)];
        if (opts.indexOf(cand) < 0) opts.push(cand);
        guard++;
      }
      for (var i = opts.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var tmp = opts[i]; opts[i] = opts[j]; opts[j] = tmp; }
      var pct = Math.round(100 * qi / qs.length);
      shell('<div class="dq-bar"><i style="width:' + pct + '%"></i></div>'
        + '<div class="dq-sub">Pregunta ' + (qi + 1) + ' de ' + qs.length + '</div>'
        + '<div class="dq-q">' + esc(c.en) + '</div>'
        + '<div class="dq-sub">¿Qué significa en español?</div>'
        + '<div class="dq-opts">' + opts.map(function (o, k) {
            return '<button class="dq-opt" type="button" data-k="' + k + '" data-es="' + esc(o) + '">' + esc(o) + '</button>';
          }).join("") + '</div>'
        + '<div class="dq-react" id="dqReact" aria-live="polite"></div>');
      each(".dq-opt", function (b) {
        b.onclick = function () {
          var chosen = b.getAttribute("data-es"), good = chosen === c.es;
          each(".dq-opt", function (x) {
            x.disabled = true;
            if (x.getAttribute("data-es") === c.es) x.classList.add("right");
            else if (x === b) x.classList.add("wrong");
          });
          /* Vesper reacciona: acierto -> "correct"; error -> "correcting" (te corrige) */
          var rc = byId("dqReact");
          if (rc) rc.innerHTML = '<div class="dq-react__in ' + (good ? "ok" : "no") + '">'
            + mascot(good ? "correct" : "correcting", false, "sm")
            + '<div class="dq-react__tx"><b>' + (good ? "¡Correcto!" : "Te corrijo") + '</b>'
            + '<span>«' + esc(c.en) + '» = «' + esc(c.es) + '»</span></div></div>';
          if (good) { correct++; var m = knownMap(); m[cardKey(selLevel, c.en)] = 1; saveKnown(m); }
          setTimeout(function () { qi++; step(); }, good ? 760 : 1500);
        };
      });
    }
    function finish() {
      var pct = qs.length ? Math.round(100 * correct / qs.length) : 0;
      var msg = pct >= 80 ? "¡Excelente! Dominas esta rama." : pct >= 50 ? "¡Bien! Repasa las que fallaste." : "Sigue practicando con las tarjetas.";
      shell('<div style="text-align:center;padding:8px 4px">' + mascot(pct >= 80 ? "milestone" : "explaining", false, "md")
        + '<h1 style="font-family:\'Inria Serif\',Georgia,serif">' + correct + ' / ' + qs.length + '</h1>'
        + '<p class="muted">' + esc(msg) + '</p>'
        + '<div class="deck-actions" style="justify-content:center">'
        + '<button class="btn btn-ghost" id="qAgain" type="button">Otra vez</button>'
        + '<button class="btn btn-gold" id="qDone" type="button">Volver a la sala</button></div></div>');
      byId("qAgain").onclick = function () { denQuiz(selLevel, br); };
      byId("qDone").onclick = function () { openBranch(selLevel, br.id); };
    }
    step();
  }

  /* mini-actividad: ESCRIBIR — ves el español y escribes la palabra en inglés */
  function denTyping(selLevel, br) {
    var d = densData()[selLevel];
    var pool = br.cards.slice();
    for (var i = pool.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var tmp = pool[i]; pool[i] = pool[j]; pool[j] = tmp; }
    var qs = pool.slice(0, Math.min(8, pool.length));
    var qi = 0, correct = 0;
    var t = WORLD_THEME[selLevel] || {};
    var back = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>';
    function norm(s) { return ("" + s).toLowerCase().trim().replace(/^to\s+/, "").replace(/[.!?]+$/, ""); }
    function shell(inner) {
      show('<div class="wrap"><div class="den" data-struct="' + esc(d.structure) + '" style="' + worldVars(t) + '">'
        + '<div class="den-top"><button class="den-back" id="qBack" type="button" aria-label="Volver al mazo">' + back + '</button>'
        + '<div style="font-weight:700">' + esc(br.name) + ' · escribir</div></div>'
        + '<div class="den-quiz">' + inner + '</div></div><div class="hub-toast" id="toast"></div></div>');
      var qb = byId("qBack"); if (qb) qb.onclick = function () { openBranch(selLevel, br.id); };
    }
    function step() {
      if (qi >= qs.length) return finish();
      var c = qs[qi];
      var pct = Math.round(100 * qi / qs.length);
      var hint = norm(c.en).charAt(0).toUpperCase();
      shell('<div class="dq-bar"><i style="width:' + pct + '%"></i></div>'
        + '<div class="dq-sub">Palabra ' + (qi + 1) + ' de ' + qs.length + '</div>'
        + '<div class="dq-q">' + esc(c.es) + '</div>'
        + '<div class="dq-sub">Escríbela en inglés (empieza por «' + esc(hint) + '»)</div>'
        + '<input class="dtype-in" id="dtIn" type="text" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="tu respuesta…">'
        + '<div class="dtype-row"><button class="btn btn-ghost" id="dtSkip" type="button">No la sé</button>'
        + '<button class="btn btn-gold" id="dtChk" type="button">Comprobar</button></div>'
        + '<div class="dq-react" id="dqReact" aria-live="polite"></div>');
      var inp = byId("dtIn"); if (inp) inp.focus();
      function judge(skip) {
        var val = inp ? inp.value : "";
        var good = !skip && norm(val) === norm(c.en);
        if (inp) inp.disabled = true;
        byId("dtChk").disabled = true; byId("dtSkip").disabled = true;
        var rc = byId("dqReact");
        if (rc) rc.innerHTML = '<div class="dq-react__in ' + (good ? "ok" : "no") + '">'
          + mascot(good ? "correct" : "correcting", false, "sm")
          + '<div class="dq-react__tx"><b>' + (good ? "¡Correcto!" : "Te corrijo") + '</b>'
          + '<span>«' + esc(c.es) + '» = «' + esc(c.en) + '»</span></div></div>';
        if (good) { correct++; var m = knownMap(); m[cardKey(selLevel, c.en)] = 1; saveKnown(m); }
        speak(c.en);
        setTimeout(function () { qi++; step(); }, good ? 900 : 1700);
      }
      byId("dtChk").onclick = function () { judge(false); };
      byId("dtSkip").onclick = function () { judge(true); };
      if (inp) inp.addEventListener("keydown", function (e) { if (e.key === "Enter") { e.preventDefault(); judge(false); } });
    }
    function finish() {
      var pct = qs.length ? Math.round(100 * correct / qs.length) : 0;
      var msg = pct >= 80 ? "¡Excelente ortografía!" : pct >= 50 ? "¡Bien! Repasa las que fallaste." : "Sigue practicando con las tarjetas.";
      shell('<div style="text-align:center;padding:8px 4px">' + mascot(pct >= 80 ? "milestone" : "explaining", false, "md")
        + '<h1 style="font-family:\'Inria Serif\',Georgia,serif">' + correct + ' / ' + qs.length + '</h1>'
        + '<p class="muted">' + esc(msg) + '</p>'
        + '<div class="deck-actions" style="justify-content:center">'
        + '<button class="btn btn-ghost" id="qAgain" type="button">Otra vez</button>'
        + '<button class="btn btn-gold" id="qDone" type="button">Volver a la sala</button></div></div>');
      byId("qAgain").onclick = function () { denTyping(selLevel, br); };
      byId("qDone").onclick = function () { openBranch(selLevel, br.id); };
    }
    step();
  }

  /* mini-actividad: EMPAREJAR — une cada palabra inglesa con su significado */
  function denMatch(selLevel, br) {
    var d = densData()[selLevel];
    function shuffle(a) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var tmp = a[i]; a[i] = a[j]; a[j] = tmp; } return a; }
    var pool = shuffle(br.cards.slice());
    var rounds = pool.slice(0, Math.min(6, pool.length));
    var t = WORLD_THEME[selLevel] || {};
    var back = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>';
    var left = shuffle(rounds.map(function (c, ix) { return { k: ix, txt: c.en }; }));
    var right = shuffle(rounds.map(function (c, ix) { return { k: ix, txt: c.es }; }));
    var matched = 0, mistakes = 0, selEn = null;
    function render() {
      var lhtml = left.map(function (o) { return '<button class="dm-item" type="button" data-side="en" data-k="' + o.k + '">' + esc(o.txt) + '</button>'; }).join("");
      var rhtml = right.map(function (o) { return '<button class="dm-item" type="button" data-side="es" data-k="' + o.k + '">' + esc(o.txt) + '</button>'; }).join("");
      show('<div class="wrap"><div class="den" data-struct="' + esc(d.structure) + '" style="' + worldVars(t) + '">'
        + '<div class="den-top"><button class="den-back" id="qBack" type="button" aria-label="Volver al mazo">' + back + '</button>'
        + '<div style="font-weight:700">' + esc(br.name) + ' · emparejar</div></div>'
        + '<div class="den-quiz"><div class="dq-sub">Toca una palabra en inglés y luego su significado.</div>'
        + '<div class="dmatch"><div class="dmatch__col">' + lhtml + '</div><div class="dmatch__col">' + rhtml + '</div></div>'
        + '<div class="dq-react" id="dqReact" aria-live="polite" style="margin-top:14px"></div>'
        + '</div></div><div class="hub-toast" id="toast"></div></div>');
      byId("qBack").onclick = function () { openBranch(selLevel, br.id); };
      each(".dm-item", function (b) {
        b.onclick = function () {
          if (b.classList.contains("matched")) return;
          var side = b.getAttribute("data-side"), k = +b.getAttribute("data-k");
          if (side === "en") {
            each(".dm-item[data-side=en]", function (x) { x.classList.remove("sel"); });
            b.classList.add("sel"); selEn = { k: k, el: b };
            speak(rounds[k].en);
            return;
          }
          if (!selEn) return;
          if (selEn.k === k) {
            selEn.el.classList.remove("sel"); selEn.el.classList.add("matched");
            b.classList.add("matched"); matched++;
            var m = knownMap(); m[cardKey(selLevel, rounds[k].en)] = 1; saveKnown(m);
            selEn = null;
            if (matched >= rounds.length) setTimeout(finish, 360);
          } else {
            mistakes++;
            var bad = b, prev = selEn.el; selEn = null;
            bad.classList.add("wrong"); prev.classList.add("wrong"); prev.classList.remove("sel");
            setTimeout(function () { bad.classList.remove("wrong"); prev.classList.remove("wrong"); }, 560);
          }
        };
      });
    }
    function finish() {
      var msg = mistakes === 0 ? "¡Perfecto, sin errores!" : mistakes <= 2 ? "¡Muy bien!" : "¡Bien! Repite para afinar.";
      show('<div class="wrap"><div class="den" data-struct="' + esc(d.structure) + '" style="' + worldVars(t) + '">'
        + '<div class="den-top"><button class="den-back" id="qBack" type="button" aria-label="Volver al mazo">' + back + '</button>'
        + '<div style="font-weight:700">' + esc(br.name) + ' · emparejar</div></div>'
        + '<div class="den-quiz" style="text-align:center;padding:8px 4px">' + mascot(mistakes === 0 ? "milestone" : "correct", false, "md")
        + '<h1 style="font-family:\'Inria Serif\',Georgia,serif">' + rounds.length + ' pares</h1>'
        + '<p class="muted">' + esc(msg) + (mistakes ? ' ' + mistakes + ' error' + (mistakes > 1 ? 'es' : '') + '.' : '') + '</p>'
        + '<div class="deck-actions" style="justify-content:center">'
        + '<button class="btn btn-ghost" id="qAgain" type="button">Otra vez</button>'
        + '<button class="btn btn-gold" id="qDone" type="button">Volver a la sala</button></div>'
        + '</div></div><div class="hub-toast" id="toast"></div></div>');
      byId("qBack").onclick = function () { openBranch(selLevel, br.id); };
      byId("qAgain").onclick = function () { denMatch(selLevel, br); };
      byId("qDone").onclick = function () { openBranch(selLevel, br.id); };
    }
    render();
  }

  /* REPASO MEZCLADO: opción múltiple con palabras de TODAS las salas del mundo */
  function denMixedReview(selLevel) {
    var d = densData()[selLevel]; if (!d) return renderDen(selLevel);
    var pool = [], seen = {};
    d.branches.forEach(function (br) {
      br.cards.forEach(function (c) {
        var k = ("" + c.en).toLowerCase().replace(/^to\s+/, "");
        if (!seen[k]) { seen[k] = 1; pool.push(c); }
      });
    });
    if (!pool.length) return renderDen(selLevel);
    var qs = pool.slice();
    for (var i = qs.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var tmp = qs[i]; qs[i] = qs[j]; qs[j] = tmp; }
    qs = qs.slice(0, Math.min(12, qs.length));
    var allEs = pool.map(function (c) { return c.es; });
    var qi = 0, correct = 0;
    var t = WORLD_THEME[selLevel] || {};
    var back = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 6l-6 6 6 6"/></svg>';
    function shell(inner) {
      show('<div class="wrap"><div class="den" data-struct="' + esc(d.structure) + '" style="' + worldVars(t) + '">'
        + '<div class="den-top"><button class="den-back" id="qBack" type="button" aria-label="Volver al recinto">' + back + '</button>'
        + '<div style="font-weight:700">' + esc(d.name) + ' · repaso</div></div>'
        + '<div class="den-quiz">' + inner + '</div></div><div class="hub-toast" id="toast"></div></div>');
      var qb = byId("qBack"); if (qb) qb.onclick = function () { renderDen(selLevel); };
    }
    function step() {
      if (qi >= qs.length) return finish();
      var c = qs[qi];
      var opts = [c.es], guard = 0;
      while (opts.length < Math.min(4, allEs.length) && guard < 80) {
        var cand = allEs[Math.floor(Math.random() * allEs.length)];
        if (opts.indexOf(cand) < 0) opts.push(cand); guard++;
      }
      for (var i = opts.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var tmp = opts[i]; opts[i] = opts[j]; opts[j] = tmp; }
      var pct = Math.round(100 * qi / qs.length);
      shell('<div class="dq-bar"><i style="width:' + pct + '%"></i></div>'
        + '<div class="dq-sub">Pregunta ' + (qi + 1) + ' de ' + qs.length + '</div>'
        + '<div class="dq-q">' + esc(c.en) + '</div>'
        + '<div class="dq-sub">¿Qué significa en español?</div>'
        + '<div class="dq-opts">' + opts.map(function (o) {
            return '<button class="dq-opt" type="button" data-es="' + esc(o) + '">' + esc(o) + '</button>';
          }).join("") + '</div>'
        + '<div class="dq-react" id="dqReact" aria-live="polite"></div>');
      each(".dq-opt", function (b) {
        b.onclick = function () {
          var chosen = b.getAttribute("data-es"), good = chosen === c.es;
          each(".dq-opt", function (x) {
            x.disabled = true;
            if (x.getAttribute("data-es") === c.es) x.classList.add("right");
            else if (x === b) x.classList.add("wrong");
          });
          var rc = byId("dqReact");
          if (rc) rc.innerHTML = '<div class="dq-react__in ' + (good ? "ok" : "no") + '">'
            + mascot(good ? "correct" : "correcting", false, "sm")
            + '<div class="dq-react__tx"><b>' + (good ? "¡Correcto!" : "Te corrijo") + '</b>'
            + '<span>«' + esc(c.en) + '» = «' + esc(c.es) + '»</span></div></div>';
          if (good) { correct++; var m = knownMap(); m[cardKey(selLevel, c.en)] = 1; saveKnown(m); }
          setTimeout(function () { qi++; step(); }, good ? 700 : 1400);
        };
      });
    }
    function finish() {
      var pct = qs.length ? Math.round(100 * correct / qs.length) : 0;
      var msg = pct >= 80 ? "¡Dominas este mundo!" : pct >= 50 ? "¡Bien! Sigue repasando." : "Repasa las salas y vuelve a intentarlo.";
      shell('<div style="text-align:center;padding:8px 4px">' + mascot(pct >= 80 ? "milestone" : "explaining", false, "md")
        + '<h1 style="font-family:\'Inria Serif\',Georgia,serif">' + correct + ' / ' + qs.length + '</h1>'
        + '<p class="muted">' + esc(msg) + '</p>'
        + '<div class="deck-actions" style="justify-content:center">'
        + '<button class="btn btn-ghost" id="qAgain" type="button">Otra vez</button>'
        + '<button class="btn btn-gold" id="qDone" type="button">Volver al recinto</button></div></div>');
      byId("qAgain").onclick = function () { denMixedReview(selLevel); };
      byId("qDone").onclick = function () { renderDen(selLevel); };
    }
    step();
  }

  /* ---- RENDIMIENTO: pausa animaciones de bloques fuera de pantalla ---- */
  var _animObs = null;
  function gateAnims() {
    if (reduceMotion()) return;
    if (!("IntersectionObserver" in window)) return;
    if (!_animObs) {
      _animObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { en.target.classList.toggle("va-paused", !en.isIntersecting); });
      }, { rootMargin: "120px 0px" });
    } else { _animObs.disconnect(); }
    each(".wmap, .world-banner, .den-tree, .den-head", function (el) { _animObs.observe(el); });
  }

  /* Vitrina de logros (ganados + bloqueados), plegable. */
  function buildTrophyShelf() {
    if (!P || !P.achievementsState) return "";
    var list = P.achievementsState();
    var total = list.length;
    var earned = list.filter(function (a) { return a.unlocked; }).length;
    var pct = total ? Math.round(100 * earned / total) : 0;
    var lockSvg = '<svg class="medal__lk" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="10.7" width="14" height="9" rx="2.2"/><path d="M8 10.7V7.7a4 4 0 0 1 8 0v3"/></svg>';
    var trophySvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 4.5h10v4a5 5 0 0 1-10 0z"/><path d="M7 6.2H4.6v1.4A3.4 3.4 0 0 0 8 11M17 6.2h2.4v1.4A3.4 3.4 0 0 1 16 11"/><path d="M12 13.5v2.7M9 20h6M10.2 20l.5-3.8h2.6l.5 3.8"/></svg>';
    var chev = '<svg class="logros__chev" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';
    /* desbloqueados primero (manteniendo el orden del catálogo) */
    var sorted = list.slice().sort(function (a, b) { return (b.unlocked ? 1 : 0) - (a.unlocked ? 1 : 0); });
    var medals = sorted.map(function (a) {
      return '<div class="medal' + (a.unlocked ? ' on' : '') + '" title="' + esc(a.name + (a.desc ? ' — ' + a.desc : '')) + '">'
        + '<span class="medal__disc" aria-hidden="true">' + (a.unlocked ? achIcon(a.id) : lockSvg) + '</span>'
        + '<span class="medal__nm">' + esc(a.name) + '</span></div>';
    }).join("");
    return '<details class="logros">'
      + '<summary class="logros__sum" aria-label="Logros: ' + earned + ' de ' + total + ' desbloqueados">'
      + '<span class="logros__ic">' + trophySvg + '</span>'
      + '<span class="logros__h"><span class="logros__ttl">Logros</span>'
      + '<span class="logros__bar" aria-hidden="true"><i style="width:' + pct + '%"></i></span></span>'
      + '<span class="logros__count">' + earned + '/' + total + '</span>' + chev
      + '</summary>'
      + '<div class="logros__grid">' + medals + '</div></details>';
  }

  /* Selector de exámenes de nivel (A1–C2). Se abre desde el hub (?id=exams). */
  function renderExamPicker() {
    clearLessonTheme();
    var levels = (PATH && PATH.LEVELS) ? PATH.LEVELS : ["A1", "A2", "B1", "B2", "C1", "C2"];
    var avail = window.VESPER_LEVEL_EXAMS || {};
    var cards = levels.map(function (lv) {
      var bank = avail[lv];
      var n = (bank && bank.exercises) ? bank.exercises.length : 0;
      if (!n) return "";
      var pass = (bank && bank.pass) ? bank.pass : 70;
      return '<button class="card lcard" data-exam="' + esc(lv) + '">'
        + '<div class="lcard-top"><span class="pill">' + esc(lv) + '</span><span class="track">Examen de nivel</span></div>'
        + '<h2>Examen ' + esc(lv) + '</h2>'
        + '<div class="muted">' + n + ' ejercicios &middot; aprobar con ' + pass + '%</div></button>';
    }).join("");
    show('<div class="wrap">'
      + '<div class="hero">' + mascot("welcome", "Elige el examen de nivel que quieres presentar.") + '</div>'
      + '<h1>Examen de nivel</h1>'
      + '<p class="muted" style="margin:-6px 0 14px">Evaluación completa por nivel: gramática, vocabulario, uso del inglés, lectura y listening. Tu resultado queda registrado para tu profesor.</p>'
      + '<div class="grid">' + cards + '</div>'
      + '<div style="margin-top:18px"><a class="btn btn-ghost" href="leccion.html">&larr; Volver a lecciones</a></div>'
      + '</div>');
    each("[data-exam]", function (b) { b.onclick = function () { location.search = "?id=exam:" + encodeURIComponent(b.getAttribute("data-exam")); }; });
  }

  /* ---- ¿qué sigue? ------------------------------------------------
     Antes el hub abría con un saludo, tres ceros, un anuncio y seis
     mundos de los que cinco decían "Bloqueado"; la única lección que
     se podía tocar quedaba a 1.068px de scroll, fuera de pantalla.
     nextUp() resuelve la siguiente acción real y nextStepCard() la
     pone arriba del todo, que es la respuesta a "¿y ahora qué hago?". */
  function nextUp(built, selLevel) {
    var g = built.levels[selLevel];
    if (!g || !g.total) return null;
    var found = null;
    PATH.SKILL_ORDER.forEach(function (sk) {
      var ids = g.bySkill[sk]; if (!ids || found) return;
      ids.forEach(function (id) {
        if (found) return;
        if (PATH.status(id, built) === "open") found = { id: id, skill: sk };
      });
    });
    if (found) {
      var l = L[found.id] || {};
      return {
        id: found.id,
        title: l.title || found.id,
        n: l.exercises ? l.exercises.length : 0,
        xp: l.xpReward || 0,
        tipo: tipoOf(l),
        skill: (PATH.SKILLS[found.skill] || {}).label || "",
        isBoss: false,
        fresh: !Object.keys(built.completed || {}).length
      };
    }
    /* mundo terminado: lo que sigue es el Guardián */
    var bm = bossMeta(selLevel);
    return { id: "boss:" + selLevel, title: bm.name, n: 0, xp: 0, tipo: "practica", skill: "", isBoss: true, pass: bm.pass, fresh: false };
  }

  function nextStepCard(built, selLevel) {
    var nx = nextUp(built, selLevel);
    if (!nx) return "";
    var t = WORLD_THEME[selLevel] || {};
    var verb = nx.isBoss ? "Enfrentar al Guardián" : (nx.fresh ? "Empezar" : "Continuar");
    var eyebrow = nx.fresh ? "Tu primera lección" : (nx.isBoss ? "Prueba final del mundo" : "Continúa donde te quedaste");
    var meta = nx.isBoss
      ? 'Necesitas ' + nx.pass + '% para vencerlo'
      : (nx.n + ' ejercicio' + (nx.n === 1 ? "" : "s") + ' &middot; unos ' + Math.max(2, Math.round(nx.n * 0.7)) + ' min &middot; +' + nx.xp + ' XP');
    return '<section class="nextstep" style="' + worldVars(t) + '" aria-labelledby="nextstep-t">'
      + '<span class="nextstep__ey">' + esc(eyebrow) + '</span>'
      + '<h2 class="nextstep__t" id="nextstep-t">' + esc(nx.title) + '</h2>'
      + '<p class="nextstep__meta">' + (nx.skill ? '<span class="nextstep__sk">' + esc(nx.skill) + '</span>' : "") + meta + '</p>'
      + '<button class="nextstep__go" type="button" data-go="' + esc(nx.id) + '">' + verb
      + '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h13"/><path d="m12 5 7 7-7 7"/></svg></button>'
      + '</section>';
  }

  /* ---- primera visita: traducir el mundo temático ------------------
     El hub habla de mundos, guardianes, senderos, rachas y XP sin
     explicar ninguno. Para quien llega nuevo eso es ruido, no tema.
     Se muestra una vez y se puede cerrar. */
  /* ---- el paseo guiado ("cómo funciona esto") ----------------------
     Antes esto era una tarjeta de viñetas: explicaba mundo / sendero /
     Guardián / XP en texto, ANTES de que vieras la pantalla y sin
     señalar nada. Había que emparejar cada palabra con un dibujo a
     ojo. Ahora las mismas cuatro ideas se cuentan encima de los
     elementos de verdad, con el foco de luz sobre cada uno
     (vesper_tour.js). Se lanza solo la primera vez y queda un botón
     para repetirlo, que antes no existía: si cerrabas el primer, no
     había forma de volver a leerlo. */
  var TOUR_KEY = "leccion-hub-v1";
  var PRIMER_KEY = "vesper_leccion_primer";        /* legado: quien ya cerró el primer no recibe el paseo automático */
  function tourSeen() {
    try {
      if (localStorage.getItem("vesper_tour_" + TOUR_KEY) === "1") return true;   /* = VESPER_TOUR.seen() */
      return localStorage.getItem(PRIMER_KEY) === "1";
    } catch (e) { return true; }
  }
  /* Paseo corto (3 pasos): lo que sale solo la primera vez. Antes eran los 11
     del paseo completo, de entrada y antes de la primera lección; ahora el
     completo queda en el botón «Cómo funciona», que el tercer paso señala. */
  function tourStepsShort(selLevel) {
    var wt = WORLD_THEME[selLevel] || {};
    var wname = wt.worldName || "este mundo";
    return [
      { el: ".nextstep", pad: 10,
        title: "Empieza siempre por aquí",
        text: "Soy Vesper. Esta tarjeta es tu siguiente paso: púlsala y te llevo a la lección que te toca. Si algún día no sabes qué hacer, vuelve aquí." },
      { el: ".wbtn.is-current", shape: "circle", pad: 12,
        title: "Este es tu camino",
        text: "Estás en " + wname + ", el mundo de tu nivel. El círculo luminoso es tu lección de ahora; al final del sendero te espera el Guardián, que abre el mundo siguiente." },
      { el: "#tourGo", pad: 8,
        title: "El resto, cuando quieras",
        text: "La racha, el chat conmigo, el vocabulario y el Guardián: «Cómo funciona» te los enseña uno por uno. ¡Ahora vamos a tu lección!" }
    ];
  }
  function tourSteps(selLevel) {
    var wt = WORLD_THEME[selLevel] || {};
    var wname = wt.worldName || "este mundo";
    return [
      { el: null,
        title: "Te enseño esto en un minuto",
        text: "Soy Vesper. Voy a señalarte una por una las cosas que necesitas para moverte por aquí. Puedes salir cuando quieras." },
      { el: ".nextstep", pad: 10,
        title: "Empieza siempre por aquí",
        text: "Esta tarjeta es tu siguiente paso. Si algún día no sabes qué hacer, pulsa este botón y ya está: te lleva a la lección que te toca." },
      { el: ".hub-stats3", pad: 10,
        title: "Tu racha y tu XP",
        text: "La racha son los días seguidos que practicas; el XP, los puntos que ganas en cada lección. No desbloquean el curso: miden tu constancia (y te consiguen accesorios)." },
      /* La cabecera ya no tiene icono de chat: queda el botón flotante. Este
         paseo sólo sale desde «Cómo funciona», mucho después de que el botón
         haya entrado; si aun así no está, el paso sale centrado. */
      { el: ".vchat-fab", shape: "circle", pad: 10,
        title: "Puedes hablar conmigo",
        text: "Este botón abre el chat. Escríbeme o háblame en voz alta y practicamos inglés de verdad: preguntas, dudas de gramática o una conversación suelta. No hay lección que aprobar." },
      { el: ".worlds", pad: 8,
        title: "Un mundo = un nivel",
        text: "Ahora estás en " + wname + ". Hay seis mundos, del más básico (A1) al más avanzado (C2); tócalos aquí para cambiar de uno a otro." },
      { el: ".vheads.on", pad: 10,
        title: "Dos burbujas que te acompañan",
        text: "Mientras recorres el mapa flotan a un lado: Vocabulario (tarjetas por temas) y la Forja (práctica sin final con lo que ya viste). Tócalas cuando quieras, o arrástralas al otro borde si te estorban." },
      { el: ".wbtn.is-current", shape: "circle", pad: 12,
        title: "Aquí estás tú",
        text: "El círculo grande y luminoso es tu lección de ahora. El camino dorado que llega hasta él es lo que ya llevas andado; lo que sigue en gris con el borde punteado todavía no está abierto." },
      { el: ".wcheck", pad: 8,
        title: "El sendero va por destrezas",
        text: "Estos carteles agrupan las lecciones por lo que entrenan: vocabulario, gramática, escucha… La barra te dice cuánto llevas de ese grupo." },
      { el: ".wbtn.boss", pad: 12,
        title: "El Guardián del mundo",
        text: "Al final de cada mundo hay un examen con su propio personaje. Vencerlo abre el mundo siguiente — y no hace falta terminar todas las lecciones para intentarlo." },
      { el: ".wavatar", shape: "circle", pad: 14,
        title: "Y este soy yo, contigo",
        text: "Camino por el sendero hasta donde te has quedado. Según avanzas vas soltando colores, aspectos y accesorios para mí: puedes cambiármelos cuando quieras." },
      { el: null,
        title: "Listo, ya sabes leer el mapa",
        text: "Si se te olvida algo, el botón «Cómo funciona» te trae otra vez este paseo. ¡Vamos a tu lección!" }
    ];
  }
  function tourBarHtml() {
    return '<div class="tourbar">'
      + '<button class="tourbar__btn" type="button" id="tourGo">'
      + '<span class="tourbar__ic" aria-hidden="true">' + (window.VESPER_ICN ? (VESPER_ICN.compass || VESPER_ICN.star || "") : "") + '</span>'
      + '<span class="tourbar__tx"><b>¿Cómo funciona el mapa?</b></span>'
      + '</button></div>';
  }
  /* No arranques el paseo encima de otra puerta bloqueante: la del nombre
     obligatorio (vesper_name_gate.js) y el velo de la sesión (vsp-splash)
     tapan la pantalla, así que el foco de luz señalaría a ciegas y los dos
     diálogos se pelearían por el foco del teclado. En ese caso el paseo
     espera: sigue sin marcarse como visto y saldrá en la siguiente carga.  */
  function prefersNoTour() {
    return !!(document.getElementById("vesper-name-gate") || document.getElementById("vsp-splash"));
  }
  /* lanza el paseo; devuelve false si no hay nada que señalar todavía */
  var _tourLevel = null;                            /* mundo pintado ahora mismo (lo fija renderIndex) */
  /* full: el paseo completo (botón «Cómo funciona»); sin él, el corto */
  function startTour(full) {
    if (!window.VESPER_TOUR) { need("tour").then(function () { startTour(full); }, function () {}); return true; }
    return VESPER_TOUR.start(full ? tourSteps(_tourLevel) : tourStepsShort(_tourLevel), {
      key: TOUR_KEY,
      onEnd: function () {
        try { localStorage.setItem(PRIMER_KEY, "1"); } catch (e) {}
        var go = document.querySelector(".nextstep__go");
        if (go && go.focus) go.focus();
        var bar = byId("tourGo");
        if (bar) {
          var sub = bar.querySelector(".tourbar__tx span");
          if (sub) sub.textContent = "El paseo completo por el mapa";
        }
      }
    });
  }

  function renderIndex(selLevel) {
    clearLessonTheme();
    _tourLevel = selLevel;                          /* el paseo nombra el mundo que estás viendo */
    var st = P ? P.getState() : { streak: 0, xp: 0, shields: 0 };
    var dg = (P && P.dailyGoal) ? P.dailyGoal() : null;
    var trophyHtml = buildTrophyShelf();
    var hello = (A && profile) ? A.greeting() : "Hola!";
    /* fallback simple si no hay motor de ruta */
    if (!PATH) {
      var cards = ORDER.map(function (k) {
        var l = L[k]; if (!l) return "";
        return '<button class="card lcard" data-go="' + esc(k) + '"><div class="lcard-top"><span class="pill">' + esc(l.level)
          + '</span><span class="track">' + esc(l.track) + '</span></div><h2>' + esc(l.title) + '</h2>'
          + '<div class="muted">' + (l.exercises ? l.exercises.length : 0) + ' ejercicios &middot; +' + (l.xpReward || 0) + ' XP</div></button>';
      }).join("");
      show('<div class="wrap"><div class="hero">' + mascot("welcome", hello) + '</div><h1>Lecciones gratis</h1><div class="grid">' + cards + '</div></div>');
      each("[data-go]", function (b) { b.onclick = function () { location.search = "?id=" + encodeURIComponent(b.getAttribute("data-go")); }; });
      return;
    }

    var built = PATH.build(L, ORDER);
    if (!selLevel) {
      var band = (A && profile) ? A.levelToBand(A.profileLevel()) : null;
      if (band && built.levels[band] && built.levels[band].total && PATH.regionUnlocked(band, built)) selLevel = band;
      else {
        /* primer mundo DESBLOQUEADO aún sin completar; si el siguiente está bloqueado
           (falta vencer su jefe), nos quedamos en el último desbloqueado (donde brilla el Guardián). */
        for (var i = 0; i < PATH.LEVELS.length; i++) {
          var lv = PATH.LEVELS[i], gg = built.levels[lv];
          if (!gg.total) continue;
          if (!PATH.regionUnlocked(lv, built)) break;   // bloqueado: detente en el anterior
          selLevel = lv;
          if (gg.done < gg.total) break;                 // incompleto y desbloqueado: aquí nos quedamos
        }
        if (!selLevel) selLevel = PATH.LEVELS[0];
      }
    }

    /* el mapa de mundos (renderWorlds + worldMap) reemplaza continuar/pestañas/secciones */

    /* buscador + filtros (ahora detrás del botón 🔍 del HUD) */
    var skillChips = PATH.SKILL_ORDER.map(function (sk) {
      var m = PATH.SKILLS[sk];
      return '<button class="fchip" type="button" aria-pressed="false" data-skill="' + sk + '">' + skillIcon(sk) + ' ' + esc(m.label) + '</button>';
    }).join("");
    var searchUI = '<div class="hub-search" id="hubSearch" hidden>'
      + '<div class="srch"><span class="srch-ic" aria-hidden="true">' + HUB_ICN.search + '</span>'
      + '<label class="sr-only" for="lessonSearch">Buscar lecciones por título, tema o nivel</label>'
      + '<input id="lessonSearch" type="search" inputmode="search" autocomplete="off" role="searchbox"'
      + ' aria-controls="searchResults" placeholder="Buscar lección, tema o nivel…"></div>'
      + '<div class="filter-row" role="group" aria-label="Filtrar por destreza">'
      + '<button class="fchip on" type="button" aria-pressed="true" data-skill="all">Todas</button>' + skillChips + '</div>'
      + '<div class="filter-row" role="group" aria-label="Filtrar por estado">'
      + '<button class="fchip on" type="button" aria-pressed="true" data-state="all">Todas</button>'
      + '<button class="fchip" type="button" aria-pressed="false" data-state="open">Pendientes</button>'
      + '<button class="fchip" type="button" aria-pressed="false" data-state="completed">Completadas</button></div>'
      + '<div class="filter-row" role="group" aria-label="Filtrar por tipo de lección">'
      + '<button class="fchip on" type="button" aria-pressed="true" data-tipo="all">Todas</button>'
      + '<button class="fchip" type="button" aria-pressed="false" data-tipo="aprende">Aprende</button>'
      + '<button class="fchip" type="button" aria-pressed="false" data-tipo="practica">Pr&aacute;ctica</button></div></div>';

    var heroBand = (A && profile && A.profileLevel) ? A.levelToBand(A.profileLevel()) : null;
    var heroInfo = { band: heroBand, bandTag: heroBand ? (WORLD_TAG[heroBand] || "") : "" };
    /* la liga ahora vive en el HUD (en lugar de la meta diaria); aquí solo el repaso */
    var srsDue = (window.VESPER_SRS && VESPER_SRS.dueCount) ? VESPER_SRS.dueCount() : 0;
    var examBanner = '<button class="hub-card" id="examGo" type="button">'
      + '<span class="hc-ic" aria-hidden="true">🎓</span>'
      + '<span class="hc-tx"><b>Examen de nivel</b><span>Evalúa tu dominio de A1 a C2</span></span>'
      + '<span class="hc-cta">Presentar &rarr;</span></button>';
    /* Orden del hub, de más a menos urgente para quien aprende:
       1) qué hago ahora  2) dónde estoy (mundos)  3) el mapa  4) todo lo
       demás. El anuncio del examen de nivel baja al final: es venta, no
       aprendizaje. Las tarjetas de Repaso y Forja que iban aquí se fueron
       (2026-10-30): el repaso ya está en el dock con su contador, y la Forja
       y el vocabulario asoman como pestañas en los huecos del sendero. */
    show('<div class="wrap">'
      + hudHtml(st, dg, hello, heroInfo)
      + nextStepCard(built, selLevel)
      + worldsSection(built, selLevel)
      + tourBarHtml()
      + searchUI
      + '<div id="searchResults" class="search-results" aria-live="polite" hidden></div>'
      + '<div id="levelView">' + worldMap(selLevel, built) + '</div>'
      + trophyHtml
      + examBanner
      + placementCard("leccion-hub")
      + dockHtml(selLevel, srsDue)
      + headsHtml(selLevel)
      + '<div class="hub-toast" id="toast"></div>');

    bindCta();
    if (_indexFirst) track("hub_view", { level: selLevel });
    var examGo = byId("examGo"); if (examGo) examGo.onclick = function () { location.search = "?id=exams"; };
    each(".world[data-lvl]", function (b) { b.onclick = function () { _mapExpanded = false; renderIndex(b.getAttribute("data-lvl")); }; });
    each(".world[data-locked-world]", function (b) { b.onclick = function () { toast("Vence al guardián del mundo anterior para desbloquearlo"); }; });
    bindDock(selLevel);
    bindHeads(selLevel);
    each("[data-go]", function (b) { b.onclick = function () { location.search = "?id=" + encodeURIComponent(b.getAttribute("data-go")); }; });
    each("[data-locked]", function (b) { b.onclick = function () { toast("Completa la lección anterior para desbloquear"); }; });
    each("[data-locked-boss]", function (b) { b.onclick = function () { toast("Completa todas las lecciones del mundo para enfrentar al guardián"); }; });
    var mapMore = byId("mapMore");
    if (mapMore) mapMore.onclick = function () {
      _mapExpanded = true;
      renderIndex(selLevel);
      announce("Mostrando el mundo completo");
    };
    var tourGo = byId("tourGo");
    if (tourGo) tourGo.onclick = function () {
      if (!startTour(true)) toast("El paseo necesita el mapa cargado");
    };

    /* ---- avatar: traza el sendero y decide si "camina" tras completar una lección ---- */
    (function () {
      var map = byId("wmap"); if (!map) return;
      var curId = AVATAR_LESSON, prevId = null;     // dónde descansa el gato en este mundo
      try { prevId = sessionStorage.getItem("vesper_last_continue"); } catch (e) {}
      if (_indexFirst && prevId && prevId !== curId && built.completed[prevId] && TRAIL_STOPS[prevId] != null) {
        map.setAttribute("data-prev", TRAIL_STOPS[prevId]);   // sólo en carga fresca, no al cambiar de pestaña
      }
      try { sessionStorage.setItem("vesper_last_continue", curId || ""); } catch (e) {}
      /* mide tras el layout (doble rAF): evita medir el sendero antes de tiempo.
         El guardia W<80 en paintTrail reintenta solo si aún no hay layout. */
      var land = _indexFirst && (tourSeen() || prefersNoTour());   // el paseo guiado arranca arriba
      requestAnimationFrame(function () { requestAnimationFrame(function () {
        paintTrail();
        if (land) landOnCurrent();
      }); });
      bindTrailResize();
      bindParallax();
    })();
    /* la cinta de mundos abre con el mundo elegido a la vista (centrado),
       no siempre con A1 pegado a la izquierda */
    (function () {
      var strip = app.querySelector(".worlds"), on = strip && strip.querySelector(".world.on");
      if (!on || strip.scrollWidth <= strip.clientWidth) return;
      var d = on.getBoundingClientRect().left - strip.getBoundingClientRect().left;
      strip.scrollLeft = Math.max(0, strip.scrollLeft + d - (strip.clientWidth - on.offsetWidth) / 2);
    })();
    /* ---- paseo guiado la primera vez ----
       Va DESPUÉS de paintTrail: el foco de luz mide el rect de los nodos, y
       antes de trazar el sendero el gato y el Guardián aún no están en su
       sitio. El margen extra deja además que asiente el scroll restaurado. */
    if (_indexFirst && !tourSeen() && !prefersNoTour()) {
      setTimeout(function () {
        if (!window.VESPER_TOUR || !VESPER_TOUR.active()) startTour();
      }, 620);
    }
    _indexFirst = false;
    /* el chip de la nube vive en el encabezado (no flota); la liga, si ya llegó */
    if (window.VESPER_SYNC && VESPER_SYNC.mountChip) VESPER_SYNC.mountChip(byId("syncSlot"));
    fillLeagueTile();
    gateAnims();

    /* ---- lógica de búsqueda/filtros (sólo actualiza #searchResults) ---- */
    function searchCard(lid) {
      var l = L[lid]; if (!l) return "";
      var stt = PATH.status(lid, built);
      var badge, attr, cls = "lcard2";
      if (stt === "completed") { cls += " completed"; badge = "&#10003;"; attr = 'data-go="' + esc(lid) + '"'; }
      else if (stt === "open") { badge = "&#9654;"; attr = 'data-go="' + esc(lid) + '"'; }
      else { cls += " locked"; badge = ic('lock'); attr = 'data-locked="1"'; }
      var sk = PATH.skillOf(l), m = PATH.SKILLS[sk] || { label: "", icon: "" };
      return '<button class="' + cls + '" ' + attr + '>'
        + '<span class="lc-badge">' + badge + '</span>'
        + '<span class="lc-body"><span class="lc-ttl">' + esc(l.title) + '</span>'
        + '<span class="lc-sub" style="display:block;margin-top:3px"><span class="lc-lvl">' + esc(l.level) + '</span>'
        + skillIcon(sk) + ' ' + esc(m.label) + ' ' + tipoChip(l) + '</span></span>'
        + '<span class="lc-go">' + (stt === "locked" ? "" : "&#8250;") + '</span></button>';
    }
    var fSkill = "all", fState = "all", fTipo = "all", fQuery = "", fTimer = null;
    function applyFilter() {
      var active = !!fQuery.trim() || fSkill !== "all" || fState !== "all" || fTipo !== "all";
      var lvView = byId("levelView"), res = byId("searchResults");
      if (!res) return;
      if (!active) { if (lvView) lvView.hidden = false; res.hidden = true; res.innerHTML = ""; return; }
      if (lvView) lvView.hidden = true;
      res.hidden = false;
      var q = fQuery.trim().toLowerCase();
      var hits = built.order.filter(function (id) {
        var l = L[id]; if (!l) return false;
        if (fSkill !== "all" && PATH.skillOf(l) !== fSkill) return false;
        if (fTipo !== "all" && tipoOf(l) !== fTipo) return false;
        var stt = PATH.status(id, built);
        if (fState === "completed" && stt !== "completed") return false;
        if (fState === "open" && stt === "completed") return false;
        if (q) {
          var hay = (l.title + " " + (l.track || "") + " " + (l.level || "") + " " + (l.topic || "")).toLowerCase();
          if (hay.indexOf(q) < 0) return false;
        }
        return true;
      });
      if (!hits.length) {
        res.innerHTML = '<p class="search-empty">Sin resultados. Prueba otra palabra o quita un filtro.</p>';
        return;
      }
      res.innerHTML = '<div class="muted" style="margin:0 2px 8px;font-size:.85rem">' + hits.length
        + (hits.length === 1 ? ' lección' : ' lecciones') + '</div>'
        + '<div class="lgrid">' + hits.map(searchCard).join("") + '</div>';
      each("#searchResults [data-go]", function (b) { b.onclick = function () { location.search = "?id=" + encodeURIComponent(b.getAttribute("data-go")); }; });
      each("#searchResults [data-locked]", function (b) { b.onclick = function () { toast("Completa la lección anterior para desbloquear"); }; });
    }
    var inp = byId("lessonSearch");
    if (inp) inp.oninput = function () { fQuery = inp.value; clearTimeout(fTimer); fTimer = setTimeout(applyFilter, 150); };
    each("#hubSearch [data-skill]", function (b) {
      b.onclick = function () {
        fSkill = b.getAttribute("data-skill");
        each("#hubSearch [data-skill]", function (x) { var on = x === b; x.classList.toggle("on", on); x.setAttribute("aria-pressed", on ? "true" : "false"); });
        applyFilter();
      };
    });
    each("#hubSearch [data-state]", function (b) {
      b.onclick = function () {
        fState = b.getAttribute("data-state");
        each("#hubSearch [data-state]", function (x) { var on = x === b; x.classList.toggle("on", on); x.setAttribute("aria-pressed", on ? "true" : "false"); });
        applyFilter();
      };
    });
    each("#hubSearch [data-tipo]", function (b) {
      b.onclick = function () {
        fTipo = b.getAttribute("data-tipo");
        each("#hubSearch [data-tipo]", function (x) { var on = x === b; x.classList.toggle("on", on); x.setAttribute("aria-pressed", on ? "true" : "false"); });
        applyFilter();
      };
    });

    /* abre/cierra el cajón de búsqueda; al cerrar, limpia filtros y vuelve al mapa */
    function resetSearch() {
      fQuery = ""; fSkill = "all"; fState = "all"; fTipo = "all";
      var si = byId("lessonSearch"); if (si) si.value = "";
      each("#hubSearch [data-skill]", function (x) { var on = x.getAttribute("data-skill") === "all"; x.classList.toggle("on", on); x.setAttribute("aria-pressed", on ? "true" : "false"); });
      each("#hubSearch [data-state]", function (x) { var on = x.getAttribute("data-state") === "all"; x.classList.toggle("on", on); x.setAttribute("aria-pressed", on ? "true" : "false"); });
      each("#hubSearch [data-tipo]", function (x) { var on = x.getAttribute("data-tipo") === "all"; x.classList.toggle("on", on); x.setAttribute("aria-pressed", on ? "true" : "false"); });
      applyFilter();
    }
    var sTog = byId("searchToggle");
    if (sTog) sTog.onclick = function () {
      var box = byId("hubSearch"); if (!box) return;
      var willOpen = box.hidden;
      box.hidden = !willOpen;
      sTog.setAttribute("aria-expanded", willOpen ? "true" : "false");
      if (willOpen) { var fi = byId("lessonSearch"); if (fi) setTimeout(function () { fi.focus(); }, 30); }
      else resetSearch();
    };

    /* burbuja flotante: "Vesper te escribe" para destacar el chat */
    mountChatNudge();

    /* aviso suave si quedan cosméticos desbloqueados sin estrenar (p.ej. por
       cambio de día/racha). Las lecciones/jefes ya celebran en renderStreak. */
    try {
      var cosPend = (window.VESPER_COSMETICS && VESPER_COSMETICS.pending) ? VESPER_COSMETICS.pending() : [];
      if (cosPend.length) { toast("¡Nuevo aspecto de Vesper desbloqueado! Elígelo en Configuración"); VESPER_COSMETICS.markSeen(); }
    } catch (e) {}
  }

  /* ---------- Burbuja de chat flotante (Vesper "te manda un mensaje") ---------- */
  function mountChatNudge() {
    if (byId("vchatNudge")) return;                 // ya montada en esta carga
    var seen = false;
    try { seen = sessionStorage.getItem("vesper_chat_nudge") === "seen"; } catch (e) {}
    var rm = reduceMotion();
    /* En móvil NO auto-abrimos el globo: taparía el mapa/contenido ("encimado").
       Mostramos solo el botón flotante con su punto; el alumno lo toca para abrir. */
    var small = (window.innerWidth || document.documentElement.clientWidth || 0) < 560;
    var catImg = (window.VESPER_MASCOT && VESPER_MASCOT.canonical) || "assets/images/mascot/vesper_cat.png";
    var fb = (window.VESPER_MASCOT && VESPER_MASCOT.fallback) || "assets/images/virtual_class_happy_cat.png";
    var msg = "¡Hola! Soy Vesper. ¿Practicamos tu inglés? Pregúntame lo que quieras.";

    var n = document.createElement("div");
    n.className = "vchat-nudge";
    n.id = "vchatNudge";
    n.innerHTML =
        '<div class="vchat-pop" id="vchatPop" role="group" aria-label="Mensaje de Vesper" hidden>'
      +   '<button class="vchat-x" type="button" aria-label="Cerrar mensaje de Vesper">&times;</button>'
      +   '<div class="vchat-name"><i></i>Vesper · en línea</div>'
      +   '<div class="vchat-body" aria-live="polite"><div class="vchat-typing" aria-hidden="true"><i></i><i></i><i></i></div></div>'
      + '</div>'
      + '<a class="vchat-fab" href="chat.html" aria-label="Abrir chat con Vesper">'
      +   '<img src="' + catImg + '" alt="" loading="lazy" decoding="async" onerror="this.onerror=null;this.src=\'' + fb + '\'">'
      +   '<span class="vchat-dot" aria-hidden="true">1</span>'
      + '</a>';
    document.body.appendChild(n);
    document.body.classList.add("has-chat-nudge");

    var pop = byId("vchatPop");
    var body = n.querySelector(".vchat-body");
    var dot = n.querySelector(".vchat-dot");
    var msgHtml = '<p class="vchat-msg">' + esc(msg) + '</p>'
      + '<a class="vchat-cta" href="chat.html">Hablar con Vesper'
      + '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h13M12 6l6 6-6 6"/></svg></a>';

    function markSeen() { try { sessionStorage.setItem("vesper_chat_nudge", "seen"); } catch (e) {} }
    function showMsg() { if (body) body.innerHTML = msgHtml; }
    function openPop() {
      if (!pop) return;
      pop.hidden = false;
      requestAnimationFrame(function () { n.classList.add("show-pop"); });
      if (rm) { showMsg(); return; }
      clearTimeout(n._t3);
      n._t3 = setTimeout(showMsg, 1250);           // primero "escribiendo...", luego el mensaje
    }
    function dismiss() {
      n.classList.remove("show-pop");
      clearTimeout(n._t3);
      setTimeout(function () { if (pop) pop.hidden = true; }, 260);
      if (dot) dot.hidden = true;
      markSeen();
    }
    var xb = n.querySelector(".vchat-x");
    if (xb) xb.onclick = function (e) { e.preventDefault(); e.stopPropagation(); dismiss(); };
    var fab = n.querySelector(".vchat-fab");
    if (fab) fab.addEventListener("click", markSeen);
    if (pop) pop.addEventListener("click", function (ev) { if (ev.target.closest("a")) markSeen(); });
    /* A 390 px la burbuja fija tapaba botones al desplazarse por el mapa
       («Ver más lecciones», el banner del mundo). Solo se ve arriba del hub;
       más abajo el chat sigue a un toque en el icono del encabezado. */
    function onScroll() { n.classList.toggle("away", (window.scrollY || window.pageYOffset || 0) > 160); }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    if (rm) {                                       // sin animación: muestra botón y, si es nuevo, el mensaje estático
      n.classList.add("show-fab");
      if (seen && dot) dot.hidden = true;
      if (!seen && !small) { showMsg(); n._t2 = setTimeout(openPop, 120); }
      else if (seen && dot) dot.hidden = true;      // móvil sin ver: deja solo el punto de aviso
      return;
    }
    n._t1 = setTimeout(function () { n.classList.add("show-fab"); }, seen ? 250 : 650);
    if (!seen) {
      n.classList.add("wiggle");
      if (!small) n._t2 = setTimeout(openPop, 1650); // móvil: solo botón + punto, sin globo que tape el mapa
    } else if (dot) {
      dot.hidden = true;                            // ya visto: solo el botón, sin globo ni punto
    }
  }

  /* ---------- COVER ---------- */
  function renderCover() {
    applyLessonTheme(lesson.level);
    track("lesson_start", { id: lesson.lessonId, level: lesson.level, type: lesson.isBoss ? "boss" : (lesson.isReview ? "review" : "lesson") });
    if (lesson.isBoss) { renderBossCover(); return; }
    var line = (A ? A.personalize("Vamos con: " + lesson.title) : "Vamos con: " + lesson.title);
    show('<div class="wrap">' + topbar(6) + '<div class="card center">'
      + lessonWorldBanner(lesson.level)
      + mascot("welcome", line)
      + '<div class="lcard-top center-row"><span class="pill">' + esc(lesson.level) + '</span><span class="track">' + esc(lesson.track) + '</span>'
      + ((lesson.isExam || lesson.isReview || lesson.srsReview) ? '' : tipoChip(lesson)) + '</div>'
      + '<h1>' + esc(lesson.title) + '</h1>'
      + (lesson.adapted ? '<div class="adapt-badge">' + ic('sparkle') + ' ' + esc(lesson.adaptNote) + '</div>' : '')
      + '<p class="muted">' + lesson.exercises.length + ' ejercicios &middot; +' + (lesson.xpReward || 0) + ' XP</p>'
      + '<button class="btn btn-gold" id="start">Empezar</button></div></div>');
    byId("start").onclick = renderExplanation;
  }

  /* ============================================================
     EL DUELO — el examen del Guardián se juega como pelea de jefe.

     La regla de siempre (pass% para vencerlo) traducida a vida:
       · el Guardián aguanta `need` golpes = aciertos que exige el pass%;
       · Vesper aguanta `lives` = errores que aún dejan aprobar + 1.
     En cuanto uno de los dos cae, la pelea termina: con need aciertos
     ya está aprobado, y con lives errores ya no se puede. Por eso el
     resultado se califica sobre lo contestado (renderFeedback): el
     veredicto es el mismo que habría dado el examen completo.
     El estado se DERIVA de results[], así reintentar lo reinicia solo.
     ============================================================ */
  var BOSS_LINES = {
    A1: { intro: "Nadie cruza este umbral sin saber decir quién es. ¿Tú sí?", hurt: "¡Uf! Esa sí la sabías.", hit: "Esa no. Mi farol sigue encendido.", low: "Mi farol… se apaga…", win: "Pasa. Este hogar ya es tuyo.", lose: "Vuelve cuando tu inglés tenga más luz." },
    A2: { intro: "El sendero es largo. ¿Tienes piernas para él?", hurt: "Buen paso. No me lo esperaba.", hit: "Tropezaste. El camino no perdona.", low: "Me… desvío…", win: "El sendero es tuyo. Sigue caminando.", lose: "Descansa y vuelve. El camino espera." },
    B1: { intro: "Desde aquí veo tus errores antes de que los cometas.", hurt: "Esa no la vi venir.", hit: "Esa la vi venir de lejos.", low: "Se me nubla el horizonte…", win: "Mira lejos: el horizonte ya es tuyo.", lose: "Aún no ves tan lejos como yo." },
    B2: { intro: "Cada piso de esta torre es una regla. ¿Subes?", hurt: "Un piso menos.", hit: "Te resbalaste en la escalera.", low: "La torre… tiembla…", win: "Proclamo tu nombre desde lo alto.", lose: "La torre sigue en pie. Tú también: vuelve." },
    C1: { intro: "Las estrellas no se le dan a cualquiera.", hurt: "Brillas más de lo que esperaba.", hit: "Una estrella menos para ti.", low: "Mi cielo… se apaga…", win: "El firmamento te reconoce.", lose: "Aún te falta cielo. Vuelve de noche." },
    C2: { intro: "Llegaste lejos. Demuestra que mereces quedarte.", hurt: "Impresionante. Otra vez.", hit: "Un soberano no perdona imprecisiones.", low: "¿Será… que sabes más que yo?", win: "Toma la corona. El saber es tuyo.", lose: "El trono sigue ocupado. Por ahora." }
  };
  function bossLine(k) { var L = BOSS_LINES[lesson.bossLevel] || BOSS_LINES.A1; return L[k] || ""; }
  function battleState() {
    var total = lesson.exercises.length, pass = bossMeta(lesson.bossLevel).pass;
    var need = Math.max(1, Math.ceil(total * pass / 100 - 1e-9));
    var lives = Math.max(1, total - need + 1), hits = 0, misses = 0, i;
    for (i = 0; i < results.length; i++) { if (results[i] === true) hits++; else if (results[i] === false) misses++; }
    return { total: total, need: need, lives: lives, hits: hits, misses: misses,
      over: hits >= need ? "win" : (misses >= lives ? "lose" : "") };
  }
  var HEART_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.5s-7.5-4.6-9.3-9.4C1.4 7.6 3.6 4.5 6.9 4.5c2 0 3.6 1.1 5.1 3 1.5-1.9 3.1-3 5.1-3 3.3 0 5.5 3.1 4.2 6.6-1.8 4.8-9.3 9.4-9.3 9.4z"/></svg>';
  function duelHearts(b) {
    var h = "", i;
    for (i = 0; i < b.lives; i++) h += '<i class="dh-heart' + (i >= b.lives - b.misses ? " lost" : "") + '">' + HEART_SVG + '</i>';
    return h;
  }
  function duelSay(b) {
    if (exIdx === 0) return bossLine("intro");
    if (b.need - b.hits <= 1) return bossLine("low");
    return results[exIdx - 1] ? bossLine("hurt") : bossLine("hit");
  }
  /* la arena: HUD (corazones de Vesper · vida del Guardián) + escenario
     con el paisaje del mundo de fondo. Se pinta en cada ejercicio con el
     estado previo a contestar; battleStrike() la anima al verificar. */
  function duelHtml() {
    var lv = lesson.bossLevel, b = battleState(), t = WORLD_THEME[lv] || {}, bm = bossMeta(lv);
    var hp = Math.round(100 * (b.need - b.hits) / b.need);
    var me = currentLook();
    var bg = t.file ? 'background-image:linear-gradient(180deg,rgba(14,12,31,.2),rgba(14,12,31,.78)),url(' + t.file + ');' : "";
    return '<section class="duel" id="duel" data-lv="' + lv + '" style="' + worldVars(t) + '" aria-label="Duelo contra ' + esc(bm.name) + '">'
      + '<div class="duel-hud">'
      +   '<div class="dh dh-me"><span class="dh-nm">Vesper</span><span class="dh-hearts" role="img" aria-label="Vesper aguanta ' + (b.lives - b.misses) + ' errores más">' + duelHearts(b) + '</span></div>'
      +   '<div class="dh dh-foe"><span class="dh-nm">' + esc(bm.name) + '</span>'
      +     '<span class="dh-hp" role="img" aria-label="Al guardián le quedan ' + (b.need - b.hits) + ' golpes"><i style="width:' + hp + '%"></i><b>' + (b.need - b.hits) + '</b></span></div>'
      + '</div>'
      + '<div class="duel-stage" style="' + bg + '">'
      +   '<div class="duel-fighter duel-me" aria-hidden="true"><img src="' + esc(me.src || BOSS_AVATAR) + '" alt="" decoding="async" onerror="this.onerror=null;this.src=\'' + BOSS_AVATAR + '\'"></div>'
      +   '<div class="duel-bolt" aria-hidden="true"></div><div class="duel-wave" aria-hidden="true"></div>'
      +   '<div class="duel-fighter duel-foe" aria-hidden="true">' + bossPortrait(lv) + '</div>'
      +   '<p class="duel-say" aria-hidden="true">' + esc(duelSay(b)) + '</p>'
      +   '<div class="duel-dmg" aria-hidden="true"></div><div class="duel-stamp" aria-hidden="true"></div>'
      + '</div></section>';
  }
  /* el golpe: lo dispara setVerifyNext (el punto común de los 11 renderers).
     struckAt evita que un renderer que verifique dos veces golpee dos veces. */
  var struckAt = -1;
  function battleStrike() {
    if (!lesson || !lesson.isBoss || struckAt === exIdx || typeof results[exIdx] !== "boolean") return;
    struckAt = exIdx;
    var d = byId("duel"); if (!d) return;
    var ok = results[exIdx], b = battleState(), rm = reduceMotion();
    var q = function (sel) { return d.querySelector(sel); };
    var say = q(".duel-say"), dmg = q(".duel-dmg"), stamp = q(".duel-stamp");
    d.classList.remove("strike-me", "strike-foe");
    void d.offsetWidth;                                  /* reinicia la animación */
    d.classList.add(ok ? "strike-me" : "strike-foe");
    setTimeout(function () {
      if (ok) {
        var bar = q(".dh-hp i"), num = q(".dh-hp b");
        if (bar) bar.style.width = Math.round(100 * (b.need - b.hits) / b.need) + "%";
        if (num) num.textContent = b.need - b.hits;
        if (dmg) { dmg.textContent = combo >= 2 ? "¡Combo ×" + (combo + 1) + "!" : "¡Golpe!"; dmg.className = "duel-dmg on foe"; }
        sfx("combo", b.hits);
      } else {
        var hs = d.querySelectorAll(".dh-heart:not(.lost)");
        if (hs.length) hs[hs.length - 1].classList.add("lost", "breaking");
        if (dmg) { dmg.textContent = "¡Auch!"; dmg.className = "duel-dmg on me"; }
      }
      if (say) {
        say.textContent = b.over === "win" ? bossLine("win") : (b.over === "lose" ? bossLine("lose")
          : (ok ? (b.need - b.hits <= 1 ? bossLine("low") : bossLine("hurt")) : bossLine("hit")));
        say.classList.remove("pop"); void say.offsetWidth; say.classList.add("pop");
      }
      if (b.over) {
        d.classList.add(b.over === "win" ? "ko-foe" : "ko-me");
        if (stamp) stamp.textContent = b.over === "win" ? "¡Vencido!" : "Vesper cayó";
        announce(b.over === "win" ? "¡Guardián vencido!" : "Vesper cayó. El guardián gana esta vez.");
        if (b.over === "win") burstConfetti(30);
      }
    }, rm ? 0 : 330);
  }

  /* "Vesper cayó en la pregunta 2 de 8: 0 golpes de los 7 que pedía" */
  function duelLoseNote(correct, answered) {
    var b = battleState();
    return 'Vesper cayó en la pregunta ' + answered + ' de ' + b.total + ' &middot; acertaste '
      + correct + ' de los ' + b.need + ' golpes que pedía (' + bossMeta(lesson.bossLevel).pass + '%)';
  }
  /* portada del Guardián: un "VS" de videojuego con las reglas dichas en vida */
  function renderBossCover() {
    var lv = lesson.bossLevel, bm = bossMeta(lv), t = WORLD_THEME[lv] || {}, b = battleState(), me = currentLook();
    var bg = t.file ? 'background-image:linear-gradient(180deg,rgba(14,12,31,.3),rgba(14,12,31,.93) 62%),url(' + t.file + ');' : "";
    show('<div class="wrap">' + topbar(6) + '<div class="card center boss-cover vs-cover" style="' + worldVars(t) + bg + '">'
      + '<span class="boss-eyebrow">Examen del mundo &middot; ' + esc(lesson.level) + '</span>'
      + '<div class="vs-row" aria-hidden="true">'
      +   '<div class="vs-side vs-me"><img src="' + esc(me.src || BOSS_AVATAR) + '" alt="" onerror="this.onerror=null;this.src=\'' + BOSS_AVATAR + '\'"><span class="vs-nm">Vesper</span></div>'
      +   '<div class="vs-mark">VS</div>'
      +   '<div class="vs-side vs-foe">' + bossPortrait(lv) + '<span class="vs-nm">' + esc(t.worldName || lv) + '</span></div>'
      + '</div>'
      + '<h1>' + esc(bm.name) + '</h1>'
      + '<p class="vs-say">«' + esc(bossLine("intro")) + '»</p>'
      + '<ul class="vs-rules">'
      +   '<li><b>' + b.need + '</b><span>aciertos lo derriban</span></li>'
      +   '<li><b>' + b.lives + '</b><span>' + (b.lives === 1 ? 'error y Vesper cae' : 'errores y Vesper cae') + '</span></li>'
      +   '<li><b>' + b.total + '</b><span>preguntas de todo el mundo</span></li>'
      + '</ul>'
      + '<p class="sr-only">Necesitas ' + bm.pass + '% para vencerlo y abrir el mundo siguiente.</p>'
      + '<button class="btn btn-gold" id="start">¡A pelear!</button>'
      + '<button class="btn btn-ghost" id="bk">Volver al mapa</button></div></div>');
    /* el briefing ya está en la portada: directo a la pelea */
    byId("start").onclick = function () { exIdx = 0; results = []; renderExercise(); };
    byId("bk").onclick = function () { location.search = ""; };
  }

  /* ---------- EXPLANATION ---------- */
  /* lista en/es reutilizable (ejemplos, expresiones) */
  function enEsList(items, showEs) {
    return '<ul class="examples">' + (items || []).map(function (e) {
      return '<li><span class="en">' + esc(e.en) + '</span>'
        + (showEs && e.es ? '<span class="es">' + esc(e.es) + '</span>' : '') + '</li>';
    }).join("") + '</ul>';
  }
  /* una sección rica de lección "Aprende". Kinds: intro | regla | vocab |
     expresiones | ejemplos | errores | resumen | puente. Cualquier kind
     desconocido cae a párrafo simple (los datos nunca rompen la pantalla). */
  var APR_TITLE = { regla: "La regla", vocab: "Vocabulario clave", expresiones: "Expresiones útiles",
                    ejemplos: "Ejemplos", errores: "Errores comunes", resumen: "En resumen" };
  function aprSection(s, showEs) {
    var k = s.kind || "intro";
    var ey = (k !== "intro" && k !== "puente")
      ? '<div class="apr-ey">' + esc(s.title || APR_TITLE[k] || "") + '</div>' : "";
    var inner;
    if (k === "regla") inner = '<div class="apr-rule">' + esc(s.body || "") + '</div>';
    else if (k === "vocab") inner = '<ul class="apr-vocab">' + (s.items || []).map(function (w) {
      return '<li><span class="en">' + esc(w.en) + '</span>'
        + (w.ipa ? '<span class="ipa">/' + esc(w.ipa) + '/</span>' : '')
        + (showEs && w.es ? '<span class="es">' + esc(w.es) + '</span>' : '') + '</li>';
    }).join("") + '</ul>';
    else if (k === "expresiones" || k === "ejemplos") inner = enEsList(s.items, showEs);
    else if (k === "errores") inner = '<ul class="apr-err">' + (s.items || []).map(function (e) {
      return '<li><span class="no">' + esc(e.no) + '</span><span class="si">' + esc(e.si) + '</span>'
        + (showEs && e.pq ? '<span class="pq">' + esc(e.pq) + '</span>' : '') + '</li>';
    }).join("") + '</ul>';
    else if (k === "resumen") inner = '<div class="apr-sum">' + esc(s.body || "") + '</div>';
    else if (k === "puente") inner = '<div class="apr-bridge">' + ic('sparkle') + esc(s.body || "Ahora practícalo tú. ¡Vamos a los ejercicios!") + '</div>';
    else inner = '<p class="body">' + esc(s.body || "") + '</p>';
    return '<div class="apr-sec">' + ey + inner + '</div>';
  }
  function renderExplanation() {
    var ex = lesson.explanation || {};
    var showEs = !PERS || PERS.showSpanish();   /* mezcla de idioma: oculta el ES si eligio "Solo ingles" */
    var secs = ex.sections;
    if (secs && secs.length) {
      /* lección "Aprende": páginas de enseñanza por secciones ricas */
      show('<div class="wrap">' + topbar(22) + '<div class="card">'
        + mascot(lesson.mascotState || "explaining")
        + '<div class="lcard-top">' + tipoChip(lesson) + '</div>'
        + '<h2>' + esc(lesson.title) + '</h2>'
        + secs.map(function (s) { return aprSection(s, showEs); }).join("")
        + '<button class="btn btn-gold" id="cont" style="margin-top:18px">Practicar &rarr;</button></div></div>');
    } else {
      show('<div class="wrap">' + topbar(22) + '<div class="card">'
        + mascot(lesson.mascotState || "explaining")
        + '<h2>Explicacion</h2><p class="body">' + esc(ex.body || "") + '</p>'
        + ((ex.examples || []).length ? enEsList(ex.examples, showEs) : '')
        + '<button class="btn btn-gold" id="cont">Continuar</button></div></div>');
    }
    byId("cont").onclick = function () { exIdx = 0; results = []; renderExercise(); };
  }

  /* ---------- EXERCISES ---------- */
  function renderExercise() {
    if (exIdx === 0) { combo = 0; maxCombo = 0; runT0 = Date.now(); struckAt = -1; }   /* arranque/reintento: combo y reloj a cero */
    var total = lesson.exercises.length;
    var pct = 22 + Math.round(58 * (exIdx / total));
    var ex = lesson.exercises[exIdx];
    if (ex.type === "multiple_choice") renderMCQ(ex, pct, total);
    else if (ex.type === "word_order") renderWordOrder(ex, pct, total);
    else if (ex.type === "true_false") renderTrueFalse(ex, pct, total);
    else if (ex.type === "fill_blank") renderFillBlank(ex, pct, total);
    else if (ex.type === "translate" || ex.type === "type_answer") renderTranslate(ex, pct, total);
    else if (ex.type === "matching") renderMatching(ex, pct, total);
    else if (ex.type === "listening") renderListening(ex, pct, total);
    else if (ex.type === "categorize") renderCategorize(ex, pct, total);
    else if (ex.type === "reading") renderReading(ex, pct, total);
    else if (ex.type === "find_error") renderFindError(ex, pct, total);
    else if (ex.type === "speak") renderSpeak(ex, pct, total);
    else advance();
  }
  /* la tarjeta "Tiempo" del final mide la ronda desde el primer ejercicio */
  var runT0 = 0;
  function fmtRun() {
    var secs = runT0 ? Math.max(1, Math.round((Date.now() - runT0) / 1000)) : 0;
    return Math.floor(secs / 60) + ":" + ("0" + (secs % 60)).slice(-2);
  }
  /* las tres tarjetas del final: XP · tiempo · precisión. Los números se
     cuentan hacia arriba (countUp) salvo con movimiento reducido. */
  function statTiles(xp, pct) {
    return '<div class="lc-stats' + (xp == null ? ' lc-miss' : '') + '">'
      + '<div class="lc-stat lc-xp"><span class="lc-k">XP</span><b class="lc-v"' + (xp != null ? ' data-count="' + xp + '" data-pre="+"' : '') + '>' + (xp != null ? '+' + xp : '&mdash;') + '</b></div>'
      + '<div class="lc-stat lc-time"><span class="lc-k">Tiempo</span><b class="lc-v">' + fmtRun() + '</b></div>'
      + '<div class="lc-stat lc-acc"><span class="lc-k">Precisión</span><b class="lc-v" data-count="' + pct + '" data-post="%">' + pct + '%</b></div>'
      + '</div>';
  }
  function countUp() {
    if (reduceMotion()) return;
    each(".lc-v[data-count]", function (el) {
      var to = +el.getAttribute("data-count"), pre = el.getAttribute("data-pre") || "", post = el.getAttribute("data-post") || "";
      var t0 = null, dur = 700;
      function step(t) {
        if (t0 == null) t0 = t;
        var k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3);
        el.textContent = pre + Math.round(to * e) + post;
        if (k < 1) requestAnimationFrame(step);
      }
      el.textContent = pre + "0" + post;
      requestAnimationFrame(step);
    });
  }
  function advance() {
    /* punto único: results[exIdx] ya está fijado por el renderer. Actualiza combo
       y dispara un pequeño festejo cada 3 aciertos seguidos. */
    var wasOk = !!results[exIdx];
    if (wasOk) { combo++; if (combo > maxCombo) maxCombo = combo; if (combo >= 3 && combo % 3 === 0) { burstConfetti(14); sfx("combo", combo); } }
    else combo = 0;
    /* La Forja: califica el ítem generado (Leitner propio). No toca el bloque
       SRS de abajo a propósito: como la Forja no es isBoss ni srsReview, los
       fallos también entran en VESPER_SRS.record() y se repasan gratis. */
    try {
      if (window.VESPER_FORJA && lesson.forjaIds) VESPER_FORJA.grade(lesson.forjaIds[exIdx], wasOk);
    } catch (e) {}
    /* SRS: en repaso, califica el ítem; en lecciones normales, registra el fallo. */
    try {
      if (window.VESPER_SRS) {
        if (lesson.srsReview && lesson.srsIds) VESPER_SRS.grade(lesson.srsIds[exIdx], wasOk);
        else if (!wasOk && !lesson.isBoss) VESPER_SRS.record(lesson.lessonId, lesson.exercises[exIdx], { level: lesson.level });
      }
    } catch (e) {}
    /* Vidas (modo desafío, opcional): un fallo resta corazón. */
    var blocked = false;
    if (!wasOk && window.VESPER_ECONOMY && VESPER_ECONOMY.livesActive && VESPER_ECONOMY.livesActive()) {
      VESPER_ECONOMY.loseHeart();
      sfx("heartloss");
      if (VESPER_ECONOMY.hearts() <= 0) blocked = true;
    }
    exIdx++;
    if (blocked) { renderNoHearts(); return; }
    if (lesson.isBoss && battleState().over) { renderFeedback(); return; }
    if (exIdx < lesson.exercises.length) renderExercise(); else renderFeedback();
  }
  function resumeRun() {
    if (exIdx < lesson.exercises.length) renderExercise(); else renderFeedback();
  }
  /* Pantalla "sin vidas" (solo en modo desafío). Recarga con gemas o espera. */
  function renderNoHearts() {
    var E = window.VESPER_ECONOMY;
    var secs = E ? E.secsToNextHeart() : 0;
    var mins = Math.max(1, Math.ceil(secs / 60));
    var cost = 50, canBuy = E && E.gems() >= cost;
    show('<div class="wrap">' + topbar(86) + '<div class="card center">'
      + mascot("incorrect", "Te quedaste sin vidas. Recupera fuerzas y vuelve.")
      + '<div class="flame">' + ic('heartBroken') + '</div>'
      + '<h1>Sin vidas</h1>'
      + '<p class="muted">Una vida nueva en ~' + mins + ' min &middot; ' + ic('gem') + ' ' + (E ? E.gems() : 0) + '</p>'
      + (canBuy ? '<button class="btn btn-gold" id="buyH">Recargar vidas (50 ' + ic('gem') + ')</button>' : '')
      + '<button class="btn btn-ghost" id="backHome">Salir al mapa</button>'
      + '<p class="hint" style="margin-top:10px">Puedes desactivar el modo desafío en Configuración.</p>'
      + '</div></div>');
    var bh = byId("buyH");
    if (bh) bh.onclick = function () { var r = E.buy("hearts"); if (r.ok) resumeRun(); else toast2(r.msg); };
    byId("backHome").onclick = function () { location.search = ""; };
  }
  function toast2(msg) { try { alert(msg); } catch (e) {} }
  function comboChip() {
    if (combo < 2) return "";
    return '<div class="combo-chip" role="status" aria-label="' + combo + ' aciertos seguidos">' + ic('flame') + ' <b>' + combo + '</b> seguidas</div>';
  }
  function econStrip() {
    var E = window.VESPER_ECONOMY; if (!E) return "";
    var ICN = window.VESPER_ICN;
    var gemIc = ICN ? ICN.gem : "";
    var html = '<span class="econ-gems"><span class="ei">' + gemIc + '</span>' + E.gems() + '</span>';
    if (E.livesActive && E.livesActive()) {
      var h = E.hearts(), mx = E.maxHearts(), hh = "", i;
      for (i = 0; i < mx; i++) hh += '<span class="ei">' + (ICN ? (i < h ? ICN.heart : ICN.heartEmpty) : "") + '</span>';
      html += '<span class="econ-hearts" aria-label="' + h + ' de ' + mx + ' vidas">' + hh + '</span>';
    }
    return '<div class="econ-strip">' + html + '</div>';
  }
  function exHeader(pct, total) {
    /* las gemas/vidas viven en la misma fila que la barra (X · barra · gemas) */
    return topbar(pct, econStrip()) + (lesson.isBoss ? duelHtml() : "") + comboChip() + exNum(total);
  }
  /* "Ejercicio 3 de 8" como constelación: una estrella por ejercicio que se
     enciende (oro) o se queda rota (error) — el lucero que da nombre a Vesper. */
  function exNum(total) {
    var st = "", i;
    if (total <= 16) for (i = 0; i < total; i++) {
      st += '<i class="' + (i < exIdx ? (results[i] ? "ok" : "no") : (i === exIdx ? "now" : "")) + '"></i>';
    }
    return '<div class="exnum">' + (st ? '<span class="constel" aria-hidden="true">' + st + '</span>' : '')
      + '<span>Ejercicio ' + (exIdx + 1) + ' de ' + total + '</span></div>';
  }
  function renderMCQ(ex, pct, total) {
    var opts = optOrder(ex.options.length).map(function (i) {
      return '<button class="opt" type="button" aria-pressed="false" data-i="' + i + '" lang="en">' + esc(ex.options[i]) + '</button>';
    }).join("");
    show('<div class="wrap">' + exHeader(pct, total) + '<div class="card">'
      + '<h2 lang="en">' + esc(ex.question || "Elige la opcion correcta") + '</h2>'
      + '<div class="opts" role="group" aria-label="Opciones de respuesta">' + opts + '</div><div id="fb"></div>'
      + '<button class="btn" id="verify" disabled aria-describedby="verify-hint">Verificar</button>'
      + '<span class="sr-only" id="verify-hint">Elige una opción para poder verificar.</span></div></div>');
    var sel = -1, done = false;
    var optEls = document.querySelectorAll(".opt");
    each(".opt", function (b) {
      b.onclick = function () {
        if (done) return;
        sel = +b.getAttribute("data-i");
        pickOne(optEls, b);
        byId("verify").disabled = false;
      };
    });
    byId("verify").onclick = function () {
      if (done) { advance(); return; }
      done = true;
      var ok = sel === ex.correctIndex;
      lockChoices(optEls,
        function (el) { return +el.getAttribute("data-i") === ex.correctIndex; },
        function (el) { return +el.getAttribute("data-i") === sel; });
      results[exIdx] = ok;
      byId("fb").innerHTML = feedbackBox(ok, ex.explanation || "", "Era: " + ex.options[ex.correctIndex]);
      announceResult(ok, ok ? "" : "La respuesta era " + ex.options[ex.correctIndex]);
      setVerifyNext(this, total);
    };
  }

  /* ---------- FIND THE ERROR (TOEFL: written expression) ----------
     Oracion partida en `segments`: las cadenas son texto fijo; los objetos
     {u:"..."} son las partes subrayadas (candidatas A, B, C, D...). El
     alumno toca la subrayada con el error. `correctIndex` apunta al orden
     de la candidata erronea; `correction` (opcional) muestra el arreglo. */
  function renderFindError(ex, pct, total) {
    var letters = ["A", "B", "C", "D", "E", "F"];
    var ci = 0;
    var html = (ex.segments || []).map(function (seg) {
      if (typeof seg === "string") return esc(seg);
      var i = ci++;
      return '<button class="fe-seg" data-i="' + i + '" aria-label="Opcion ' + letters[i] + ': ' + esc(seg.u) + '">'
        + '<sup class="fe-lab" aria-hidden="true">' + letters[i] + '</sup>' + esc(seg.u) + '</button>';
    }).join("");
    show('<div class="wrap">' + exHeader(pct, total) + '<div class="card">'
      + '<h2>' + esc(ex.question || "Encuentra el error") + '</h2>'
      + '<p class="hint">' + ic('bulb') + '' + esc(ex.hint || "Toca la parte subrayada que contiene el error gramatical.") + '</p>'
      + '<div class="fe-sentence">' + html + '</div><div id="fb"></div>'
      + '<button class="btn" id="verify" disabled>Verificar</button></div></div>');
    var sel = -1, done = false;
    var segEls = document.querySelectorAll(".fe-seg");
    each(".fe-seg", function (b) {
      b.onclick = function () {
        if (done) return;
        sel = +b.getAttribute("data-i");
        for (var x = 0; x < segEls.length; x++) segEls[x].classList.remove("sel");
        b.classList.add("sel");
        byId("verify").disabled = false;
      };
    });
    byId("verify").onclick = function () {
      if (done) { advance(); return; }
      done = true;
      var ok = sel === ex.correctIndex;
      for (var x = 0; x < segEls.length; x++) {
        var i = +segEls[x].getAttribute("data-i");
        segEls[x].classList.add("locked");
        if (i === ex.correctIndex) segEls[x].classList.add("correct");
        if (i === sel && !ok) segEls[x].classList.add("wrong");
      }
      results[exIdx] = ok;
      var fix = ex.correction ? ("Corrección: " + ex.correction) : "";
      var detail = ex.explanation ? (ex.explanation + (fix ? " — " + fix : "")) : fix;
      byId("fb").innerHTML = feedbackBox(ok, detail, "El error estaba en la opción " + letters[ex.correctIndex] + ".");
      setVerifyNext(this, total);
    };
  }

  function renderWordOrder(ex, pct, total) {
    var bank = shuffle(ex.words.slice(), ex.correctOrder).map(function (t) { return { t: t }; });
    var answer = [];
    var done = false;
    show('<div class="wrap">' + exHeader(pct, total) + '<div class="card">'
      + '<h2>Ordena las palabras</h2>'
      + (ex.hint ? '<p class="hint">' + ic('bulb') + '' + esc(ex.hint) + '</p>' : '')
      + '<div class="answer" id="answer" aria-label="Tu respuesta"></div>'
      + '<div class="bank" id="bank"></div><div id="fb"></div>'
      + '<button class="btn" id="verify" disabled>Verificar</button></div></div>');

    function draw() {
      var ans = byId("answer"), bk = byId("bank");
      ans.innerHTML = answer.length
        ? answer.map(function (w, i) { return '<button class="chip placed' + (w.cls || "") + '" data-a="' + i + '">' + esc(w.t) + '</button>'; }).join("")
        : '<span class="ph">Toca las palabras en orden...</span>';
      bk.innerHTML = bank.map(function (w, i) { return '<button class="chip" data-b="' + i + '">' + esc(w.t) + '</button>'; }).join("");
      if (!done) {
        each("#answer [data-a]", function (c) { c.onclick = function () { var i = +c.getAttribute("data-a"); bank.push(answer[i]); answer.splice(i, 1); draw(); }; });
        each("#bank [data-b]", function (c) { c.onclick = function () { var i = +c.getAttribute("data-b"); answer.push(bank[i]); bank.splice(i, 1); draw(); }; });
      }
      byId("verify").disabled = done ? false : (answer.length !== ex.words.length);
    }
    draw();

    byId("verify").onclick = function () {
      if (done) { advance(); return; }
      done = true;
      var ok = true;
      for (var i = 0; i < answer.length; i++) {
        if (answer[i].t === ex.correctOrder[i]) answer[i].cls = " correct";
        else { answer[i].cls = " wrong"; ok = false; }
      }
      results[exIdx] = ok;
      draw();
      byId("fb").innerHTML = feedbackBox(ok, "", "Orden correcto: " + ex.correctOrder.join(" "));
      setVerifyNext(this, total);
    };
  }

  /* ---------- shared helpers for typed/new activities ---------- */
  function norm(s) {
    return ("" + (s == null ? "" : s)).toLowerCase()
      .replace(/[’‘'`]/g, "")
      .replace(/[.,!?;:¿¡"]/g, " ")
      .replace(/\s+/g, " ").trim();
  }
  /* --- Voz natural: elige la mejor voz neural disponible en el dispositivo --- */
  var _voiceCache = null, _bestVoice = null;
  function loadVoices() {
    try {
      if (!window.speechSynthesis) return [];
      _voiceCache = speechSynthesis.getVoices() || [];
      _bestVoice = pickBestVoice(_voiceCache);
      return _voiceCache;
    } catch (e) { return []; }
  }
  function pickBestVoice(voices) {
    if (!voices || !voices.length) return null;
    var en = voices.filter(function (v) { return /^en(-|_|$)/i.test(v.lang || ""); });
    if (!en.length) en = voices;
    /* Prioridad: voces neurales/naturales modernas (no roboticas) */
    var prefs = [
      /natural/i, /neural/i, /\bgoogle\b/i, /microsoft .*online/i, /\bsiri\b/i,
      /\b(samantha|aria|jenny|guy|libby|sonia|ryan|emma|ava|allison|nathan)\b/i,
      /\b(en-US|en-GB)\b/i
    ];
    for (var p = 0; p < prefs.length; p++) {
      var m = en.filter(function (v) { return prefs[p].test(v.name || "") || prefs[p].test(v.voiceURI || ""); });
      /* prefiere en-US/en-GB dentro del match */
      var us = m.filter(function (v) { return /en-?US/i.test(v.lang || ""); });
      if (us.length) return us[0];
      if (m.length) return m[0];
    }
    var anyUS = en.filter(function (v) { return /en-?US/i.test(v.lang || ""); });
    return anyUS[0] || en[0];
  }
  if (window.speechSynthesis) {
    loadVoices();
    try { speechSynthesis.onvoiceschanged = loadVoices; } catch (e) {}
  }
  function speak(text, audioPath, rate) {
    if (audioPath) {
      try {
        var a = new Audio(audioPath);
        a.playbackRate = rate ? Math.max(0.5, Math.min(1, rate / 0.92)) : 1;
        a.play().catch(function () { speakTTS(text, rate); });
        a.onerror = function () { speakTTS(text, rate); };
        return;
      } catch (e) { /* cae a TTS */ }
    }
    speakTTS(text, rate);
  }
  function speakTTS(text, rate) {
    try {
      if (window.speechSynthesis) {
        if (!_voiceCache) loadVoices();
        var u = new SpeechSynthesisUtterance(text);
        if (_bestVoice) { u.voice = _bestVoice; u.lang = _bestVoice.lang || "en-US"; }
        else { u.lang = "en-US"; }
        u.rate = rate || 0.92; u.pitch = 1;
        speechSynthesis.cancel(); speechSynthesis.speak(u);
      }
    } catch (e) {}
  }
  function setVerifyNext(btn, total) {
    var over = "";
    if (lesson && lesson.isBoss) { battleStrike(); over = battleState().over; }
    btn.textContent = over === "win" ? "¡Reclamar la victoria!" : (over ? "Ver resultados" : ((exIdx + 1 < total) ? "Siguiente" : "Ver resultados"));
  }

  /* ============================================================
     SEMÁNTICA COMPARTIDA DE LOS EJERCICIOS

     Las opciones eran <button class="opt"> cuyo único estado era una
     clase CSS: quien usa lector de pantalla no oía que había elegido
     una opción, ni cuál era la correcta al verificar — el resultado
     se comunicaba SOLO por color. Estos tres helpers lo arreglan de
     una vez para todos los renderers.
     ============================================================ */

  /* selección exclusiva dentro de un grupo (elegir != confirmar, por eso
     aria-pressed de botón y no radio: no cambiamos el modelo de teclado) */
  function pickOne(els, chosen) {
    for (var i = 0; i < els.length; i++) {
      var on = els[i] === chosen;
      els[i].classList.toggle("sel", on);
      els[i].setAttribute("aria-pressed", on ? "true" : "false");
    }
  }

  /* tras verificar: congela el grupo y dice en palabras qué fue cada opción */
  function lockChoices(els, isCorrectFn, isChosenFn) {
    for (var i = 0; i < els.length; i++) {
      var el = els[i], good = isCorrectFn(el, i), mine = isChosenFn(el, i);
      el.classList.add("locked");
      el.setAttribute("aria-disabled", "true");
      if (good) el.classList.add("correct");
      if (mine && !good) el.classList.add("wrong");
      var tag = good ? "Respuesta correcta" : (mine ? "Tu respuesta, incorrecta" : null);
      if (tag) el.insertAdjacentHTML("beforeend", '<span class="sr-only"> (' + tag + ')</span>');
    }
  }

  /* el veredicto, dicho en voz alta para quien no ve el color */
  function announceResult(ok, detail) {
    announce((ok ? "Correcto. " : "Incorrecto. ") + (detail || ""));
  }

  /* ---------- SPEAKING (reconocimiento de voz) ----------
     ex: { text: "frase en inglés a decir", es: "traducción/pista", audio?: <ruta del mp3> }
     Usa Web Speech API (SpeechRecognition). Si no hay soporte, degrada a
     "escucha y repite" con autoevaluación honesta. */
  function levDist(a, b) {
    var m = a.length, n = b.length; if (!m) return n; if (!n) return m;
    var prev = [], cur = [], i, j;
    for (j = 0; j <= n; j++) prev[j] = j;
    for (i = 1; i <= m; i++) {
      cur[0] = i;
      for (j = 1; j <= n; j++) {
        var cost = a.charAt(i - 1) === b.charAt(j - 1) ? 0 : 1;
        cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
      }
      for (j = 0; j <= n; j++) prev[j] = cur[j];
    }
    return prev[n];
  }
  function speechSim(said, target) {
    var a = norm(said), b = norm(target);
    if (!a || !b) return 0;
    return 1 - levDist(a, b) / Math.max(a.length, b.length);
  }
  function renderSpeak(ex, pct, total) {
    var target = ex.text || ex.answer || ex.prompt || "";
    var showEs = (!PERS || PERS.showSpanish()) && ex.es;
    var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    show('<div class="wrap">' + exHeader(pct, total) + '<div class="card">'
      + '<h2>Dilo en voz alta</h2>'
      + '<div class="speak-target"><span class="en">' + esc(target) + '</span>'
      + (showEs ? '<span class="es">' + esc(ex.es) + '</span>' : '') + '</div>'
      + '<div class="speak-row">'
      + '<button class="btn btn-ghost" id="hear">' + ic('speaker') + ' Escuchar</button>'
      + '<button class="btn btn-ghost" id="slow">' + ic('rewind') + ' Más lento</button></div>'
      + (SR
          ? '<button class="btn mic-btn" id="mic">' + ic('mic') + ' Toca y habla</button><div class="heard" id="heard"></div>'
          : '<p class="hint">' + ic('bulb') + 'Tu navegador no reconoce voz. Escucha y repite en voz alta; luego confírmalo tú.</p>')
      + '<div id="fb"></div>'
      + '<button class="btn" id="verify"' + (SR ? ' disabled' : '') + '>' + (SR ? 'Verificar' : 'Lo dije bien') + '</button>'
      + (SR ? '<button class="btn btn-ghost" id="skip">No puedo hablar ahora</button>' : '')
      + '</div></div>');
    byId("hear").onclick = function () { speak(target, ex.audio, 0.92); };
    byId("slow").onclick = function () { speak(target, ex.audio, 0.62); };

    var done = false, ok = false;
    function settle(result, heardTxt) {
      if (done) return; done = true;
      ok = result;
      results[exIdx] = ok;
      var h = byId("heard");
      if (h && heardTxt != null) h.innerHTML = '<span class="muted">Te escuché:</span> “' + esc(heardTxt) + '”';
      byId("fb").innerHTML = feedbackBox(ok, ex.explanation || ("Modelo: " + target), "Inténtalo: " + target);
      var v = byId("verify"); v.disabled = false;
      setVerifyNext(v, total);
      v.onclick = function () { advance(); };
      var mic = byId("mic"); if (mic) { mic.disabled = true; mic.classList.remove("rec"); }
      var sk = byId("skip"); if (sk) sk.style.display = "none";
    }

    if (SR) {
      var rec = null, listening = false;
      byId("mic").onclick = function () {
        if (done || listening) return;
        try {
          rec = new SR(); rec.lang = "en-US"; rec.interimResults = false; rec.maxAlternatives = 3;
        } catch (e) { settle(false, null); return; }
        listening = true; this.classList.add("rec"); this.textContent = "Escuchando…";
        var self = this;
        rec.onresult = function (e2) {
          var best = "", bestSim = 0, r = e2.results[0], k;
          for (k = 0; k < r.length; k++) {
            var s = speechSim(r[k].transcript, target);
            if (s > bestSim) { bestSim = s; best = r[k].transcript; }
          }
          settle(bestSim >= 0.7, best);
        };
        rec.onerror = function () { listening = false; self.classList.remove("rec"); self.innerHTML = ic('mic') + ' Reintentar'; };
        rec.onend = function () { listening = false; if (!done) { self.classList.remove("rec"); self.innerHTML = ic('mic') + ' Reintentar'; } };
        try { rec.start(); } catch (e) { settle(false, null); }
      };
      byId("skip").onclick = function () { settle(true, null); };   /* sin penalizar: autoevaluación honesta */
      byId("verify").onclick = function () { if (done) advance(); };
    } else {
      /* sin reconocimiento: autoevaluación */
      byId("verify").onclick = function () { settle(true, null); byId("verify").onclick = function () { advance(); }; };
    }
  }

  /* ---------- TRUE / FALSE ---------- */
  function renderTrueFalse(ex, pct, total) {
    show('<div class="wrap">' + exHeader(pct, total) + '<div class="card">'
      + '<h2>Verdadero o falso?</h2>'
      + '<div class="statement" lang="en">' + esc(ex.statement) + '</div>'
      + '<div class="tf-row" role="group" aria-label="Verdadero o falso">'
      + '<button class="tf-btn" type="button" aria-pressed="false" data-v="1">Verdadero</button>'
      + '<button class="tf-btn" type="button" aria-pressed="false" data-v="0">Falso</button></div>'
      + '<div id="fb"></div><button class="btn" id="verify" disabled aria-describedby="verify-hint">Verificar</button>'
      + '<span class="sr-only" id="verify-hint">Elige verdadero o falso para poder verificar.</span></div></div>');
    var sel = -1, done = false;
    var btns = document.querySelectorAll(".tf-btn");
    each(".tf-btn", function (b) {
      b.onclick = function () {
        if (done) return;
        sel = +b.getAttribute("data-v");
        pickOne(btns, b);
        byId("verify").disabled = false;
      };
    });
    byId("verify").onclick = function () {
      if (done) { advance(); return; }
      done = true;
      var ok = (sel === 1) === (!!ex.answer);
      lockChoices(btns,
        function (el) { return (+el.getAttribute("data-v") === 1) === (!!ex.answer); },
        function (el) { return +el.getAttribute("data-v") === sel; });
      results[exIdx] = ok;
      byId("fb").innerHTML = feedbackBox(ok, ex.explanation || "", "Respuesta: " + (ex.answer ? "Verdadero" : "Falso"));
      announceResult(ok, ok ? "" : "Era " + (ex.answer ? "verdadero" : "falso"));
      setVerifyNext(this, total);
    };
  }

  /* ---------- FILL IN THE BLANK ---------- */
  function renderFillBlank(ex, pct, total) {
    var parts = ("" + (ex.sentence || "___")).split("___");
    var answers = ex.answers || (ex.answer != null ? [ex.answer] : []);
    show('<div class="wrap">' + exHeader(pct, total) + '<div class="card">'
      + '<h2>Completa la frase</h2>'
      + (ex.hint ? '<p class="hint">' + ic('bulb') + '' + esc(ex.hint) + '</p>' : '')
      + '<p class="fb-sentence">' + esc(parts[0])
      + '<input id="blank" class="type-input" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" inputmode="text"> '
      + esc(parts.slice(1).join("___")) + '</p>'
      + '<div id="fb"></div><button class="btn" id="verify" disabled>Verificar</button></div></div>');
    var done = false, inp = byId("blank");
    inp.oninput = function () { byId("verify").disabled = !inp.value.trim(); };
    inp.onkeydown = function (e) { if (e.key === "Enter" && !byId("verify").disabled) byId("verify").click(); };
    inp.focus();
    byId("verify").onclick = function () {
      if (done) { advance(); return; }
      done = true; inp.disabled = true;
      var val = norm(inp.value);
      var ok = answers.some(function (a) { return norm(a) === val; });
      inp.classList.add(ok ? "correct" : "wrong");
      results[exIdx] = ok;
      byId("fb").innerHTML = feedbackBox(ok, ex.explanation || "", "Respuesta: " + (answers[0] || ""));
      setVerifyNext(this, total);
    };
  }

  /* ---------- TRANSLATE / TYPE ANSWER ---------- */
  function renderTranslate(ex, pct, total) {
    var answers = ex.answers || [];
    show('<div class="wrap">' + exHeader(pct, total) + '<div class="card">'
      + '<h2>Tu turno</h2><p class="body">' + esc(ex.prompt || "Traduce la frase") + '</p>'
      + '<input id="trans" class="type-input" placeholder="Escribe en ingles..." autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false">'
      + '<div id="fb"></div><button class="btn" id="verify" disabled>Verificar</button></div></div>');
    var done = false, inp = byId("trans");
    inp.oninput = function () { byId("verify").disabled = !inp.value.trim(); };
    inp.onkeydown = function (e) { if (e.key === "Enter" && !byId("verify").disabled) byId("verify").click(); };
    inp.focus();
    byId("verify").onclick = function () {
      if (done) { advance(); return; }
      done = true; inp.disabled = true;
      var val = norm(inp.value);
      var ok = answers.some(function (a) { return norm(a) === val; });
      inp.classList.add(ok ? "correct" : "wrong");
      results[exIdx] = ok;
      byId("fb").innerHTML = feedbackBox(ok, ex.explanation || "", "Sugerencia: " + (answers[0] || ""));
      setVerifyNext(this, total);
    };
  }

  /* ---------- MATCHING ---------- */
  function renderMatching(ex, pct, total) {
    var pairs = ex.pairs || [];
    var lefts = pairs.map(function (p, i) { return { t: p.l, p: i }; });
    var rights = shuffle(pairs.map(function (p, i) { return { t: p.r, p: i }; }));
    var leftHtml = lefts.map(function (o) { return '<button class="match-item" data-side="l" data-p="' + o.p + '">' + esc(o.t) + '</button>'; }).join("");
    var rightHtml = rights.map(function (o) { return '<button class="match-item" data-side="r" data-p="' + o.p + '">' + esc(o.t) + '</button>'; }).join("");
    show('<div class="wrap">' + exHeader(pct, total) + '<div class="card">'
      + '<h2>Emparejar</h2>'
      + '<p class="hint">' + ic('bulb') + '' + esc(ex.instruction || "Toca una palabra y luego su pareja.") + '</p>'
      + '<div class="match-cols"><div>' + leftHtml + '</div><div>' + rightHtml + '</div></div>'
      + '<div id="fb"></div><button class="btn" id="verify" disabled>Empareja todo</button></div></div>');
    var selEl = null, matched = 0, errors = 0, done = false;
    function clearSel() { if (selEl) selEl.classList.remove("sel"); selEl = null; }
    each(".match-item", function (b) {
      b.onclick = function () {
        if (done || b.classList.contains("done")) return;
        var side = b.getAttribute("data-side");
        if (side === "l") {
          if (selEl && selEl.getAttribute("data-side") === "l") clearSel();
          selEl = b; b.classList.add("sel"); return;
        }
        if (!selEl) { return; }
        var lp = +selEl.getAttribute("data-p"), rp = +b.getAttribute("data-p");
        if (lp === rp) {
          selEl.classList.remove("sel"); selEl.classList.add("done"); b.classList.add("done");
          selEl = null; matched++;
          if (matched === pairs.length) {
            done = true;
            results[exIdx] = errors === 0;
            byId("fb").innerHTML = feedbackBox(errors === 0, "", "Lo lograste con " + errors + " intento(s) de mas.");
            var v = byId("verify"); v.disabled = false; setVerifyNext(v, total);
          }
        } else {
          errors++;
          var bad = b; bad.classList.add("bad"); var ls = selEl; if (ls) ls.classList.add("bad");
          clearSel();
          setTimeout(function () { bad.classList.remove("bad"); if (ls) ls.classList.remove("bad"); }, 420);
        }
      };
    });
    byId("verify").onclick = function () { if (done) advance(); };
  }

  /* ---------- LISTENING ---------- */
  function renderListening(ex, pct, total) {
    var hasOpts = Array.isArray(ex.options);
    var qHtml;
    if (hasOpts) {
      qHtml = '<p class="body">' + esc(ex.question || "Que escuchaste?") + '</p>'
        + '<div class="opts">' + optOrder(ex.options.length).map(function (i) { return '<button class="opt" data-i="' + i + '">' + esc(ex.options[i]) + '</button>'; }).join("") + '</div>';
    } else {
      qHtml = '<p class="body">' + esc(ex.question || "Escribe lo que escuchaste") + '</p>'
        + '<input id="ltype" class="type-input" placeholder="Escribe en ingles..." autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false">';
    }
    show('<div class="wrap">' + exHeader(pct, total) + '<div class="card">'
      + '<h2>Escucha</h2>'
      + '<div class="listen-controls"><button class="listen-play" id="play"><span class="ic">' + ic('speaker') + '</span> Reproducir</button>'
      + '<button class="listen-slow" id="playslow">' + ic('rewind') + ' Más lento</button></div>'
      + '<div class="listen-note">Toca para escuchar. Puedes repetir las veces que quieras.</div>'
      + qHtml + '<div id="fb"></div><button class="btn" id="verify" disabled>Verificar</button></div></div>');
    byId("play").onclick = function () { speak(ex.text, ex.audio); };
    byId("playslow").onclick = function () { speak(ex.text, ex.audio, 0.62); };
    /* autoplay del audio si la preferencia está activa (Configuración → Sonido) */
    if (!window.VESPER_PREFS || VESPER_PREFS.autoplayEnabled()) {
      setTimeout(function () { try { speak(ex.text, ex.audio); } catch (e) {} }, 350);
    }
    var done = false;
    if (hasOpts) {
      var sel = -1, optEls = document.querySelectorAll(".opt");
      each(".opt", function (b) {
        b.onclick = function () {
          if (done) return;
          sel = +b.getAttribute("data-i");
          for (var x = 0; x < optEls.length; x++) optEls[x].classList.remove("sel");
          b.classList.add("sel"); byId("verify").disabled = false;
        };
      });
      byId("verify").onclick = function () {
        if (done) { advance(); return; }
        done = true;
        var ok = sel === ex.correctIndex;
        for (var x = 0; x < optEls.length; x++) {
          var i = +optEls[x].getAttribute("data-i"); optEls[x].classList.add("locked");
          if (i === ex.correctIndex) optEls[x].classList.add("correct");
          if (i === sel && !ok) optEls[x].classList.add("wrong");
        }
        results[exIdx] = ok;
        byId("fb").innerHTML = feedbackBox(ok, ex.explanation || "", "Era: " + ex.options[ex.correctIndex]);
        setVerifyNext(this, total);
      };
    } else {
      var answers = ex.answers || [ex.text];
      var inp = byId("ltype");
      inp.oninput = function () { byId("verify").disabled = !inp.value.trim(); };
      inp.onkeydown = function (e) { if (e.key === "Enter" && !byId("verify").disabled) byId("verify").click(); };
      byId("verify").onclick = function () {
        if (done) { advance(); return; }
        done = true; inp.disabled = true;
        var val = norm(inp.value);
        var ok = answers.some(function (a) { return norm(a) === val; });
        inp.classList.add(ok ? "correct" : "wrong");
        results[exIdx] = ok;
        byId("fb").innerHTML = feedbackBox(ok, "", "Era: " + (ex.text || answers[0] || ""));
        setVerifyNext(this, total);
      };
    }
  }

  /* ---------- CATEGORIZE ---------- */
  function renderCategorize(ex, pct, total) {
    var buckets = ex.buckets || [];
    var items = (ex.items || []).map(function (it, i) { return { t: it.t, bucket: it.bucket, i: i, at: null }; });
    var sel = null, done = false;
    show('<div class="wrap">' + exHeader(pct, total) + '<div class="card">'
      + '<h2>Clasifica</h2>'
      + '<p class="hint">' + ic('bulb') + '' + esc(ex.instruction || "Toca una palabra y luego su grupo.") + '</p>'
      + '<div class="cat-pool" id="pool"></div>'
      + '<div class="cat-buckets" id="buckets"></div>'
      + '<div id="fb"></div><button class="btn" id="verify" disabled>Verificar</button></div></div>');

    function tk(it, cls) { return '<button class="cat-tk' + (cls || "") + '" data-i="' + it.i + '">' + esc(it.t) + '</button>'; }
    function draw() {
      var pool = byId("pool"), bx = byId("buckets");
      var loose = items.filter(function (o) { return o.at === null; });
      pool.innerHTML = loose.length ? loose.map(function (o) { return tk(o, sel === o.i ? " sel" : ""); }).join("")
        : '<span class="muted" style="font-size:.85rem">Todo clasificado ' + ic('checkCircle') + '</span>';
      bx.innerHTML = buckets.map(function (b) {
        var inside = items.filter(function (o) { return o.at === b.id; }).map(function (o) { return tk(o, o.cls || ""); }).join("");
        return '<div class="cat-bucket' + (sel !== null ? " active" : "") + '" data-b="' + b.id + '"><h4>' + esc(b.label) + '</h4>' + inside + '</div>';
      }).join("");
      if (!done) {
        each("#pool [data-i]", function (c) { c.onclick = function () { var i = +c.getAttribute("data-i"); sel = (sel === i ? null : i); draw(); }; });
        each(".cat-bucket [data-i]", function (c) { c.onclick = function () { var i = +c.getAttribute("data-i"); items[i].at = null; sel = i; draw(); }; });
        each("#buckets [data-b]", function (c) { c.onclick = function () { if (sel === null) return; items[sel].at = c.getAttribute("data-b"); sel = null; draw(); }; });
      }
      byId("verify").disabled = done ? false : items.some(function (o) { return o.at === null; });
    }
    draw();
    byId("verify").onclick = function () {
      if (done) { advance(); return; }
      done = true; sel = null;
      var ok = true;
      items.forEach(function (o) { if (o.at === o.bucket) o.cls = " correct"; else { o.cls = " wrong"; ok = false; } });
      draw();
      results[exIdx] = ok;
      byId("fb").innerHTML = feedbackBox(ok, "", "Revisa los que estan en rojo.");
      setVerifyNext(this, total);
    };
  }

  /* ---------- READING (pasaje + preguntas de comprension) ---------- */
  function renderReading(ex, pct, total) {
    var qs2 = ex.questions || [];
    var paras = Array.isArray(ex.passage) ? ex.passage : ("" + (ex.passage || "")).split(/\n{2,}|\n/);
    var passageHtml = paras.filter(function (p) { return ("" + p).trim(); })
      .map(function (p) { return '<p>' + esc(p) + '</p>'; }).join("");
    var qHtml = qs2.map(function (q, qi) {
      var opts = optOrder((q.options || []).length).map(function (i) {
        return '<button class="opt" data-q="' + qi + '" data-i="' + i + '">' + esc(q.options[i]) + '</button>';
      }).join("");
      return '<div class="rq" data-qwrap="' + qi + '">'
        + '<div class="rq-num">Pregunta ' + (qi + 1) + ' de ' + qs2.length + '</div>'
        + '<div class="rq-q">' + esc(q.q || "Elige la opcion correcta") + '</div>'
        + '<div class="opts">' + opts + '</div><div class="rq-fb" id="rfb-' + qi + '"></div></div>';
    }).join("");
    show('<div class="wrap">' + exHeader(pct, total) + '<div class="card">'
      + '<span class="read-tag">' + ic('book') + ' Lectura</span>'
      + (ex.title ? '<h2>' + esc(ex.title) + '</h2>' : '<h2>Lee y responde</h2>')
      + '<div class="passage">' + passageHtml + '</div>'
      + qHtml + '<div id="fb"></div>'
      + '<button class="btn" id="verify" disabled>Verificar</button></div></div>');

    var picks = qs2.map(function () { return -1; });
    var done = false;
    each(".opt", function (b) {
      b.onclick = function () {
        if (done) return;
        var qi = +b.getAttribute("data-q"), i = +b.getAttribute("data-i");
        picks[qi] = i;
        var group = document.querySelectorAll('.opt[data-q="' + qi + '"]');
        for (var x = 0; x < group.length; x++) group[x].classList.remove("sel");
        b.classList.add("sel");
        byId("verify").disabled = picks.some(function (p) { return p < 0; });
      };
    });
    byId("verify").onclick = function () {
      if (done) { advance(); return; }
      done = true;
      var allOk = true;
      qs2.forEach(function (q, qi) {
        var group = document.querySelectorAll('.opt[data-q="' + qi + '"]');
        var ok = picks[qi] === q.correctIndex;
        if (!ok) allOk = false;
        for (var x = 0; x < group.length; x++) {
          var i = +group[x].getAttribute("data-i");
          group[x].classList.add("locked");
          if (i === q.correctIndex) group[x].classList.add("correct");
          if (i === picks[qi] && !ok) group[x].classList.add("wrong");
        }
        byId("rfb-" + qi).innerHTML = feedbackBox(ok, q.explanation || "", "Era: " + (q.options[q.correctIndex] || ""));
      });
      results[exIdx] = allOk;
      setVerifyNext(this, total);
    };
  }

  /* ---------- FEEDBACK / XP ---------- */
  var lastPerfect = false, masteryUnlocked = false;
  var PASS_PCT = 70;
  /* Detalle por pregunta para el registro central de calificaciones:
     texto + tipo + acierto. Reusa lesson.exercises[] + results[]. */
  function examDetail() {
    return (lesson.exercises || []).slice(0, lesson.isBoss ? results.length : undefined).map(function (ex, i) {
      ex = ex || {};
      var q = ex.question || ex.sentence || ex.statement || ex.prompt || ex.title
              || (ex.words ? ex.words.join(" ") : "") || "";
      return { q: q, type: ex.type || "", skill: ex.skill || "", correct: !!results[i] };
    });
  }

  function renderFeedback() {
    /* el duelo puede terminar antes: se califica lo contestado (ver EL DUELO) */
    var total = lesson.isBoss ? Math.max(1, Math.min(lesson.exercises.length, results.length)) : lesson.exercises.length;
    var correct = results.filter(Boolean).length;
    var pct = Math.round(100 * correct / Math.max(1, total));
    var perfect = correct === total;
    lastPerfect = perfect;
    if (lesson.isBoss) { renderBossResult(correct, total, pct); return; }
    if (lesson.isExam) { renderExamResult(correct, total, pct); return; }
    if (lesson.isForja) { renderForjaResult(correct, total, pct); return; }
    /* Lecciones normales: hay que acertar >=70% para superarlas, ganar XP y
       desbloquear la siguiente. Por debajo se ofrece reintentar (no completa).
       Los repasos ("boss") conservan su lógica propia (>=80% = maestría). */
    if (!lesson.isReview && !lesson.srsReview && pct < PASS_PCT) { renderRetry(correct, total, pct); return; }
    var baseXp = Math.max(5, Math.round((lesson.xpReward || 0) * correct / Math.max(1, total)));
    /* bonus por mejor combo de la sesión: +5% por cada acierto seguido sobre 2, tope +50% */
    var comboBonus = maxCombo >= 3 ? Math.round(baseXp * Math.min(0.5, (maxCombo - 2) * 0.05)) : 0;
    earnedXp = baseXp + comboBonus;
    /* boost de XP comprado en la tienda (un solo uso) */
    var boost = (window.VESPER_ECONOMY && VESPER_ECONOMY.consumeXpBoost) ? VESPER_ECONOMY.consumeXpBoost() : 0;
    if (boost > 1) earnedXp = Math.round(earnedXp * boost);
    track("lesson_complete", { id: lesson.lessonId, level: lesson.level, pct: pct, type: lesson.srsReview ? "srs" : (lesson.isReview ? "review" : "lesson") });
    /* toda lección superada se celebra; la perfecta, con más */
    if (perfect) { burstConfetti(44); sfx("fanfare"); } else { burstConfetti(22); sfx("complete"); }
    if (PATH && PATH.setScore && lesson.lessonId) PATH.setScore(lesson.lessonId, pct);
    /* Registro central de la calificación de la lección (solo superadas, para
       no llenar el panel de intentos abandonados). No debe romper la pantalla.
       Los exámenes de nivel se registran aparte, en renderExamResult. */
    try {
      if (window.VESPER_RESULTS) VESPER_RESULTS.record({
        examType: "lesson", examId: lesson.lessonId, level: lesson.level,
        score: correct, total: total, percent: pct,
        threshold: PASS_PCT, passed: pct >= PASS_PCT, detail: examDetail()
      });
    } catch (e) {}
    /* repaso aprobado (>=80%) -> desbloquea maestría de la destreza */
    masteryUnlocked = false;
    if (lesson.isReview && pct >= 80 && P && P.unlock) {
      masteryUnlocked = P.unlock("master:" + lesson.reviewLevel + ":" + lesson.reviewSkill);
    }
    var head = lesson.srsReview
      ? "Repaso completado"
      : (lesson.isReview
          ? (pct >= 80 ? "¡Repaso superado!" : "Sigue practicando")
          : (perfect ? "¡Lección perfecta!" : "¡Lección completada!"));
    var cheer = perfect ? "Ni un solo error. Brillas." : "Un paso más en tu camino.";
    show('<div class="wrap lc-done">' + topbar(100) + '<div class="card center">'
      + mascot((perfect || (lesson.isReview && pct >= 80)) ? "milestone" : "correct", cheer)
      + '<h1 class="lc-title">' + head + '</h1>'
      + statTiles(earnedXp, pct)
      + (comboBonus > 0 ? '<div class="xp-bonus">' + ic('flame') + ' +' + comboBonus + ' XP por ' + maxCombo + ' seguidas</div>' : '')
      + '<p class="muted">' + correct + ' de ' + total + ' correctos</p>'
      + '<button class="btn btn-gold" id="cont">Continuar</button></div></div>');
    countUp();
    byId("cont").onclick = renderStreak;
  }

  /* No alcanzó el umbral: no cuenta como superada (sin XP ni desbloqueo).
     Ofrece reintentar la misma lección desde el primer ejercicio. */
  function renderRetry(correct, total, pct) {
    show('<div class="wrap lc-done">' + topbar(86) + '<div class="card center">'
      + mascot("incorrect", "¡Casi! Repasa y vuelve a intentarlo.")
      + '<h1 class="lc-title">Te faltó poco</h1>'
      + statTiles(null, pct)
      + '<p class="muted">' + correct + ' de ' + total + ' correctos &middot; necesitas ' + PASS_PCT + '% para continuar</p>'
      + '<button class="btn btn-gold" id="retry">Reintentar</button>'
      + '<button class="btn btn-ghost" id="backHome">Ver todas las lecciones</button></div></div>');
    byId("retry").onclick = function () { track("lesson_retry", { id: lesson.lessonId, level: lesson.level, pct: pct }); exIdx = 0; results = []; earnedXp = 0; renderExercise(); };
    byId("backHome").onclick = function () { location.search = ""; };
  }

  /* ---------- RESULTADO DEL JEFE (victoria / derrota) ---------- */
  function renderBossResult(correct, total, pct) {
    var bm = bossMeta(lesson.bossLevel);
    /* Registro central del intento (aprobado o reprobado) para el panel del
       profesor. Nunca debe romper la pantalla de resultado. */
    try {
      if (window.VESPER_RESULTS) VESPER_RESULTS.record({
        examType: "boss", examId: lesson.lessonId, level: lesson.bossLevel,
        score: correct, total: total, percent: pct,
        threshold: bm.pass, passed: pct >= bm.pass, detail: examDetail()
      });
    } catch (e) {}
    if (pct < bm.pass) {
      earnedXp = 0;
      track("boss_fail", { level: lesson.bossLevel, pct: pct });
      show('<div class="wrap">' + topbar(86) + '<div class="card center">'
        + '<div class="boss-emblem boss-gloat" aria-hidden="true">' + bossPortrait(lesson.bossLevel) + '<span class="duel-seal lose">Ganó él</span></div>'
        + '<p class="vs-say">«' + esc(bossLine("lose")) + '»</p>'
        + '<h1 class="lc-title">Esta vez no</h1>'
        + '<p class="muted">' + duelLoseNote(correct, total) + '</p>'
        + mascot("incorrect", "Lo vi todo. La próxima lo tumbamos juntos.", "sm")
        + '<button class="btn btn-gold" id="retry">Revancha</button>'
        + '<button class="btn btn-ghost" id="backHome">Ver lecciones</button></div></div>');
      byId("retry").onclick = function () { track("boss_retry", { level: lesson.bossLevel, pct: pct }); exIdx = 0; results = []; earnedXp = 0; renderBossCover(); };
      byId("backHome").onclick = function () { location.search = ""; };
      return;
    }
    earnedXp = Math.max(20, lesson.xpReward || 60);
    track("boss_win", { level: lesson.bossLevel, pct: pct });
    sfx("fanfare");
    if (PATH && PATH.setScore) PATH.setScore(lesson.lessonId, pct);
    if (P && P.passBoss) P.passBoss(lesson.bossLevel, pct);
    var idxLv = PATH.LEVELS.indexOf(lesson.bossLevel);
    var nextLv = (idxLv >= 0 && idxLv + 1 < PATH.LEVELS.length) ? PATH.LEVELS[idxLv + 1] : null;
    var unlockHtml = nextLv
      ? '<div class="boss-unlock">' + ic('unlock') + ' ¡Mundo ' + nextLv + ' desbloqueado!</div>'
      : '<div class="boss-unlock">' + ic('crown') + ' ¡Has dominado el último mundo!</div>';
    show('<div class="wrap lc-done">' + topbar(100) + '<div class="card center">'
      + '<div class="boss-emblem boss-beaten" aria-hidden="true">' + bossPortrait(lesson.bossLevel) + '<span class="duel-seal">Vencido</span></div>'
      + '<p class="vs-say">«' + esc(bossLine("win")) + '»</p>'
      + '<h1 class="lc-title">¡Guardián vencido!</h1>'
      + statTiles(earnedXp, pct)
      + '<p class="muted">' + correct + ' de ' + total + ' golpes acertados</p>'
      + unlockHtml
      + placementCard("leccion-boss-" + lesson.bossLevel, {
          title: "Vas en serio. ¿Lo llevas a una clase real?",
          sub: "Examen de nivel gratis + un profesor que te lleve a hablar."
        })
      + '<button class="btn btn-gold" id="cont">Continuar</button></div></div>');
    bindCta();
    countUp();
    byId("cont").onclick = renderStreak;
  }

  /* ---------- RESULTADO DEL EXAMEN DE NIVEL (aprobado / reprobado) ----------
     Calificación PRELIMINAR automática: veredicto claro + desglose por destreza.
     Registra el intento (siempre) y, si aprueba, otorga XP y continúa la racha;
     si reprueba, ofrece reintentar sin XP. */
  function renderExamResult(correct, total, pct) {
    var pass = lesson.examPass || PASS_PCT;
    var passed = pct >= pass;
    lastPerfect = (correct === total);
    earnedXp = passed ? Math.max(20, Math.round((lesson.xpReward || 60) * correct / Math.max(1, total))) : 0;
    track("exam_complete", { level: lesson.examLevel, pct: pct, passed: passed });
    if (PATH && PATH.setScore && lesson.lessonId) PATH.setScore(lesson.lessonId, pct);
    /* registro central (siempre, aprobado o reprobado) */
    try {
      if (window.VESPER_RESULTS) VESPER_RESULTS.record({
        examType: "exam", examId: "exam:" + lesson.examLevel, level: lesson.level,
        score: correct, total: total, percent: pct,
        threshold: pass, passed: passed, detail: examDetail()
      });
    } catch (e) {}
    /* desglose preliminar por destreza */
    var bySkill = {};
    (lesson.exercises || []).forEach(function (ex, i) {
      var sk = (ex && ex.skill) || "otro";
      if (!bySkill[sk]) bySkill[sk] = { c: 0, t: 0 };
      bySkill[sk].t++; if (results[i]) bySkill[sk].c++;
    });
    var SK_LABEL = { grammar: "Gramática", vocab: "Vocabulario", use: "Uso del inglés", reading: "Lectura", listening: "Listening", otro: "Otros" };
    var rows = ["grammar", "vocab", "use", "reading", "listening", "otro"].filter(function (s) { return bySkill[s]; }).map(function (s) {
      var b = bySkill[s], p = Math.round(100 * b.c / Math.max(1, b.t));
      return '<div style="display:flex;justify-content:space-between;gap:12px;padding:7px 2px;border-bottom:1px solid var(--line,#ece7da);font-size:.9rem">'
        + '<span>' + SK_LABEL[s] + '</span><span style="color:var(--muted,#6b6b76)"><b style="color:var(--ink,#1B1B2F)">' + b.c + '/' + b.t + '</b> &middot; ' + p + '%</span></div>';
    }).join("");
    var verdict = passed ? "Aprobado" : "Reprobado";
    var vStyle = passed
      ? "background:#e7f4ec;color:#2d7a4f;border:2px solid #2d7a4f"
      : "background:#f7e7e7;color:#b03a3a;border:2px solid #b03a3a";
    if (passed) { burstConfetti(40); sfx("fanfare"); } else { sfx("complete"); }
    show('<div class="wrap">' + topbar(92) + '<div class="card center">'
      + mascot(passed ? "milestone" : "incorrect", passed ? "¡Examen de nivel aprobado!" : "Aún no alcanzas el nivel. ¡Sigue practicando!")
      + '<div style="display:inline-block;margin:6px auto 4px;padding:8px 22px;border-radius:999px;font:800 1.05rem/1 Inter,system-ui,sans-serif;letter-spacing:1.5px;text-transform:uppercase;' + vStyle + '">' + verdict + '</div>'
      + '<h1>' + pct + '%</h1>'
      + '<p class="muted">' + correct + ' de ' + total + ' correctos &middot; necesitas ' + pass + '% para aprobar</p>'
      + '<div class="xpbar"><div class="xpfill" style="width:' + pct + '%' + (passed ? '' : ';background:var(--error)') + '"></div></div>'
      + (passed ? '<div class="xp-bonus" style="margin-top:8px">' + ic('flame') + ' +' + earnedXp + ' XP</div>' : '')
      + '<div style="margin:16px auto 4px;text-align:left;max-width:300px">'
        + '<div style="font:700 .72rem/1 Inter,system-ui,sans-serif;letter-spacing:1px;text-transform:uppercase;color:var(--muted,#6b6b76);margin-bottom:4px">Desglose por destreza</div>'
        + rows + '</div>'
      + '<p class="muted" style="font-size:.76rem;margin-top:12px">Resultado preliminar automático. Tu profesor puede confirmarlo con una evaluación oral.</p>'
      + (passed
          ? '<button class="btn btn-gold" id="cont">Continuar</button>'
          : '<button class="btn btn-gold" id="retry">Reintentar examen</button><button class="btn btn-ghost" id="backHome">Ver lecciones</button>')
      + '</div></div>');
    if (passed) {
      byId("cont").onclick = renderStreak;
    } else {
      byId("retry").onclick = function () { track("exam_retry", { level: lesson.examLevel, pct: pct }); exIdx = 0; results = []; earnedXp = 0; renderExercise(); };
      byId("backHome").onclick = function () { location.search = ""; };
    }
  }

  /* ---------- STREAK ---------- */
  function renderStreak() {
    var info = P ? P.completeLesson(lesson.lessonId, earnedXp, { perfect: lastPerfect })
                 : { streak: 1, xp: earnedXp, milestone: false, shields: 0, newAchievements: [], dailyGoal: null };
    /* premio de gemas por avanzar (economía): proporcional al XP + extra por lección perfecta */
    var gemReward = 0;
    try {
      if (window.VESPER_ECONOMY && VESPER_ECONOMY.award) {
        gemReward = Math.max(1, Math.round((earnedXp || 0) / 10)) + (lastPerfect ? 5 : 0) + (info.milestone ? 10 : 0);
        VESPER_ECONOMY.award(gemReward);
      }
    } catch (e) {}
    /* liga semanal: tu XP real cuenta para el ranking */
    leagueAddXp(earnedXp || 0);
    var grid = P ? P.weekGrid() : [];
    var cells = grid.map(function (d) {
      return '<div class="day' + (d.active ? " on" : "") + (d.isToday ? " today" : "") + '"><span>' + d.label + '</span><i>' + (d.active ? ic('flame') : "&middot;") + '</i></div>';
    }).join("");
    var shields = "";
    for (var i = 0; i < (info.shields || 0); i++) shields += ic('shieldLn');
    var mstate = info.milestone ? "milestone" : (info.streak > 0 ? "streak_alive" : "streak_broken");
    var hasNext = lesson.nextLessonId && L[lesson.nextLessonId];

    /* meta diaria */
    var dg = info.dailyGoal, goalHtml = "";
    if (dg) {
      var gp = Math.min(100, Math.round(100 * dg.progress / Math.max(1, dg.target)));
      goalHtml = '<div class="goal-card' + (dg.met ? ' met' : '') + '">' + ic('target') + ' Meta diaria '
        + '<b>' + Math.min(dg.progress, dg.target) + '/' + dg.target + '</b>'
        + '<div class="goal-bar"><i style="width:' + gp + '%"></i></div>'
        + (dg.met ? '<span class="goal-done">Meta cumplida! ' + ic('sparkle') + '</span>' : '<span class="muted" style="font-size:.82rem">Te falta ' + Math.max(0, dg.target - dg.progress) + '</span>')
        + '</div>';
    }

    /* logros recién desbloqueados (incluye maestría de repaso) */
    var ach = (info.newAchievements || []).slice();
    if (masteryUnlocked) ach.push("master:" + lesson.reviewLevel + ":" + lesson.reviewSkill);
    var achHtml = "";
    if (ach.length && P && P.achievementsState) {
      var all = P.achievementsState(), byId2 = {};
      all.forEach(function (a) { byId2[a.id] = a; });
      achHtml = '<div class="ach-pop">' + ach.map(function (id) {
        var a = byId2[id] || { icon: "", name: id };
        return '<div class="ach-badge"><span class="ab-ic">' + achIcon(a.id) + '</span><span class="ab-tx"><b>Logro desbloqueado</b><span>' + esc(a.name) + '</span></span></div>';
      }).join("") + '</div>';
    }

    /* cosméticos recién desbloqueados (color/accesorio de Vesper por progreso) */
    var cosHtml = "";
    try {
      var cosNew = (window.VESPER_COSMETICS && VESPER_COSMETICS.pending) ? VESPER_COSMETICS.pending() : [];
      if (cosNew.length) {
        cosHtml = '<div class="ach-pop">' + cosNew.slice(0, 4).map(function (c) {
          var lab = cosmeticLabel(c);
          return '<div class="ach-badge"><span class="ab-ic">' + lab.ic + '</span><span class="ab-tx"><b>Nuevo aspecto de Vesper</b><span>' + esc(lab.name) + '</span></span></div>';
        }).join("")
        + '<a class="cos-cta" href="configuracion.html#apariencia">Póntelo ahora &rarr;</a></div>';
        VESPER_COSMETICS.markSeen();
      }
    } catch (e) {}

    /* sonido de la pantalla de racha: escudo nuevo > logro/cosmético
       (cosHtml ya refleja los cosméticos recién desbloqueados) */
    if (info.milestone) sfx("levelup");
    else if (ach.length || cosHtml) sfx("achievement");

    show('<div class="wrap">' + topbar(100) + '<div class="card center">'
      + mascot(mstate)
      + '<div class="flame">' + ic('flame') + '</div>'
      + '<h1>' + info.streak + ' ' + (info.streak === 1 ? "dia" : "dias") + ' de racha</h1>'
      + (shields ? '<div class="shields">' + shields + '</div>' : '')
      + '<div class="week">' + cells + '</div>'
      + goalHtml
      + achHtml
      + cosHtml
      + '<div class="stat-row"><div class="stat">&#11088; <b>' + info.xp + '</b> XP total</div>'
      + (gemReward > 0 ? '<div class="stat">' + ic('gem') + ' <b>+' + gemReward + '</b> gemas</div>' : '')
      + '</div>'
      + (info.milestone ? '<div class="milestone">' + ic('trophy') + ' Nuevo escudo de racha!</div>' : '')
      + placementCard("leccion-leccion", {
          compact: true,
          title: "¿Y si lo llevas a una clase real?",
          sub: "Tu examen de nivel es gratis. Un profesor te arma el plan."
        })
      + '<p class="streak-acct">o guarda tu progreso en todos tus dispositivos: <a href="#" id="nudge-account">crea una cuenta</a> (opcional)</p>'
      + (hasNext ? '<button class="btn btn-gold" id="nextL">Siguiente leccion &rarr;</button>'
                   + '<button class="btn btn-ghost" id="moreL2">Ver todas las lecciones</button>'
                 : '<button class="btn btn-gold" id="moreL">Ver todas las lecciones</button>')
      + '</div></div>');
    bindCta();
    var na = byId("nudge-account"); if (na) na.onclick = function (e) { e.preventDefault(); if (window.VESPER_SYNC && VESPER_SYNC.openAuth) VESPER_SYNC.openAuth(); else location.href = "login.html"; };
    var nx = byId("nextL"); if (nx) nx.onclick = function () { location.search = "?id=" + encodeURIComponent(lesson.nextLessonId); };
    var ml = byId("moreL"); if (ml) ml.onclick = function () { location.search = ""; };
    var ml2 = byId("moreL2"); if (ml2) ml2.onclick = function () { location.search = ""; };
  }

  /* ---------- ADAPTIVE START (warm-up + personalizacion) ---------- */
  function buildAdapted() {
    if (A && A.adaptLesson && profile) {
      lesson = A.adaptLesson(baseLesson, { session: (A.getSession ? A.getSession() : null) });
    } else {
      lesson = baseLesson;
    }
    injectSpeaking(lesson);
  }

  /* Inserta UN ejercicio de speaking al final de las lecciones normales,
     derivado de los ejemplos de la explicación (frase en inglés + traducción).
     Siempre se puede saltar sin penalizar, así que es seguro inyectarlo.
     Se omite en jefes, repasos y si la lección ya trae speaking. */
  function injectSpeaking(ls) {
    try {
      if (!ls || ls.isBoss || ls.isReview || ls.srsReview) return;
      var exs = ls.exercises || [];
      if (!exs.length) return;
      for (var i = 0; i < exs.length; i++) if (exs[i].type === "speak") return;
      var ex = (ls.explanation && ls.explanation.examples) || [];
      var cand = null;
      for (var j = 0; j < ex.length; j++) {
        var en = ex[j] && ex[j].en;
        if (en && en.split(/\s+/).length >= 2 && en.length <= 60) { cand = ex[j]; break; }
      }
      if (!cand) return;
      ls.exercises = exs.concat([{ type: "speak", text: cand.en, es: cand.es || "",
        explanation: "Practica la pronunciación repitiendo el modelo. Lo importante es soltarte." }]);
    } catch (e) {}
  }

  function startLesson() {
    /* Rastreador ligero para el héroe "Hoy" del portal (materiales.html):
       recuerda la última lección real (no exámenes/boss). */
    try {
      if (baseLesson && baseLesson.title && !baseLesson.isBoss && !baseLesson.isReview) {
        localStorage.setItem("vesper_last", JSON.stringify({
          href: "leccion.html", title: baseLesson.title, kind: "leccion", ts: Date.now()
        }));
      }
    } catch (e) {}
    var sess = (A && A.getSession) ? A.getSession() : null;
    var calibrate = A && profile && !sess && baseLesson.exercises && baseLesson.exercises.length >= 3;
    if (calibrate) { renderWarmup(); }
    else { buildAdapted(); renderCover(); }
  }

  /* ---------- REVIEW ("boss") quiz: lección sintética ---------- */
  function buildReviewLesson(rid) {
    if (!PATH) return null;
    var p = rid.split(":"), lv = p[1], sk = p[2];
    var meta = (PATH.SKILLS && PATH.SKILLS[sk]) || { label: sk };
    var built = PATH.build(L, ORDER), gg = built.levels[lv];
    if (!gg) return null;
    var ids = (gg.bySkill[sk] || []).filter(function (x) { return built.completed[x]; });
    if (ids.length < 2) return null;
    var pool = [];
    ids.forEach(function (lid) {
      var l = L[lid]; if (!l || !l.exercises || !l.exercises.length) return;
      var ex = shuffle(l.exercises.slice());
      pool = pool.concat(ex.slice(0, 2)); /* hasta 2 por lección */
    });
    shuffle(pool);
    var picked = pool.slice(0, Math.min(10, pool.length));
    return {
      lessonId: rid, level: lv, track: "Repaso", isReview: true, reviewLevel: lv, reviewSkill: sk,
      title: "Repaso: " + meta.label + " " + lv,
      explanation: {
        body: "Pon a prueba todo lo que aprendiste en " + meta.label + " (" + lv + "). Son preguntas mezcladas de tus lecciones completadas. Necesitas 80% para la maestría. (Repaso general de la destreza.)",
        examples: []
      },
      exercises: picked, xpReward: 20 + 5 * ids.length, mascotState: "thinking", nextLessonId: null
    };
  }

  /* ============================================================
   * LA FORJA — práctica sin final (vesper_forja.js)
   * Las rondas se arman en tiempo de ejecución, así que "Otra ronda"
   * reconstruye EN LA PÁGINA: navegar con location.search volvería a
   * parsear los once paquetes de lecciones en cada ronda.
   * ============================================================ */
  var _forjaOpts = null;

  var FORJA_MODES = {
    mixto:     { title: "La Forja",             gens: null,                          body: "Práctica sin final: cada ronda se arma con ejercicios distintos, sacados de todo lo que has visto. Lo que fallas vuelve pronto; lo que dominas se espacia." },
    escucha:   { title: "La Forja · Escucha",   gens: ["b4"],                        body: "Sólo oído: escucha la palabra y elige cuál era. Puedes repetir el audio las veces que quieras." },
    vocab:     { title: "La Forja · Vocabulario", gens: ["b1", "b2", "b3", "b4", "a3", "a6"], body: "Vocabulario en las dos direcciones: reconocerlo y también producirlo de memoria." },
    gramatica: { title: "La Forja · Gramática", gens: ["a1", "a2", "a4", "a5", "a7"], body: "Estructura y uso: elige, juzga si la frase está bien escrita y ordena las palabras." }
  };

  function forjaBuild() {
    if (!window.VESPER_FORJA) return null;
    try { return VESPER_FORJA.buildSession(_forjaOpts || {}); } catch (e) { return null; }
  }

  function forjaEmpty() {
    show('<div class="wrap"><div class="card center">' + mascot("thinking", "La Forja aún no tiene material.")
      + '<h1>Forja no disponible</h1>'
      + '<p class="muted">Necesito algo de contenido para forjar ejercicios nuevos. Prueba con otro modo o vuelve tras un par de lecciones.</p>'
      + '<a class="btn btn-gold" href="leccion.html">Ver lecciones</a></div></div>');
  }

  /* arranca una ronda nueva sin recargar la página */
  function forjaRound(withCover) {
    var built = forjaBuild();
    if (!built || !built.exercises || !built.exercises.length) { forjaEmpty(); return; }
    baseLesson = built; lesson = built;
    exIdx = 0; results = []; earnedXp = 0; combo = 0; maxCombo = 0;
    if (withCover) renderCover(); else renderExercise();
  }

  function renderForjaResult(correct, total, pct) {
    /* XP: proporcional a los aciertos, con el mismo bonus de combo del
       motor y un decaimiento por ronda para que la liga no se pueda
       farmear repitiendo rondas toda la tarde. */
    var rounds = VESPER_FORJA.roundsToday();          /* rondas YA cerradas hoy */
    var decay = rounds < 3 ? 1 : (rounds < 6 ? 0.6 : 0.3);
    var baseXp = Math.max(5, correct * 2);
    var comboBonus = maxCombo >= 3 ? Math.round(baseXp * Math.min(0.5, (maxCombo - 2) * 0.05)) : 0;
    earnedXp = Math.round((baseXp + comboBonus) * decay);
    var boost = (window.VESPER_ECONOMY && VESPER_ECONOMY.consumeXpBoost) ? VESPER_ECONOMY.consumeXpBoost() : 0;
    if (boost > 1) earnedXp = Math.round(earnedXp * boost);

    var perfect = correct === total;
    var info = null;
    /* La PRIMERA ronda del día cuenta como lección para la racha; las
       siguientes sólo suman XP. Nunca las dos cosas por la misma ronda. */
    try {
      if (P && rounds === 0) info = P.completeLesson("review:forja", earnedXp, { perfect: perfect });
      else if (P) P.addXp(earnedXp);
    } catch (e) {}
    leagueAddXp(earnedXp || 0);
    try { if (window.VESPER_ECONOMY && VESPER_ECONOMY.award) VESPER_ECONOMY.award(Math.max(1, Math.round(earnedXp / 10))); } catch (e) {}

    var tally = VESPER_FORJA.noteRound(correct);      /* cierra la ronda */
    track("forja_round", { mode: lesson.forjaMode, pct: pct, round: tally.rounds });
    if (perfect) { burstConfetti(40); sfx("fanfare"); } else { sfx("complete"); }

    var head = perfect ? "¡Ronda perfecta!" : (pct >= 70 ? "¡Buena ronda!" : "Ronda terminada");
    var due = VESPER_FORJA.dueCount();
    show('<div class="wrap">' + topbar(86) + '<div class="card center">'
      + mascot(perfect ? "milestone" : "correct", head)
      + '<h1>+' + earnedXp + ' XP</h1>'
      + (comboBonus > 0 && decay === 1 ? '<div class="xp-bonus">' + ic('flame') + ' +' + comboBonus + ' XP por combo de x' + maxCombo + '</div>' : "")
      + '<p class="muted">' + correct + ' de ' + total + ' correctos &middot; ' + pct + '%</p>'
      + '<div class="xpbar"><div class="xpfill" style="width:' + pct + '%"></div></div>'
      + '<p class="muted">Ronda ' + tally.rounds + ' de hoy &middot; tu récord hoy: ' + tally.best + ' aciertos</p>'
      + (info && info.streak ? '<p class="muted">' + ic('flame') + ' Racha de ' + info.streak + ' día' + (info.streak === 1 ? "" : "s") + '</p>' : "")
      + (decay < 1 ? '<p class="muted">Las rondas extra de hoy dan menos XP, pero cuentan igual para tu repaso.</p>' : "")
      + (due > 0 ? '<p class="muted">' + due + ' ejercicio' + (due === 1 ? "" : "s") + ' te esperan para volver a repasar.</p>' : "")
      + '<button class="btn btn-gold" id="forjaAgain">Otra ronda</button>'
      + '<button class="btn btn-ghost" id="backHome">Volver al inicio</button></div></div>');
    byId("forjaAgain").onclick = function () { forjaRound(false); };
    byId("backHome").onclick = function () { location.search = ""; };
  }

  /* ---------- BOSS ("Guardián del mundo"): examen mixto de TODAS las destrezas ---------- */
  function buildBossExam(level) {
    if (!PATH) return null;
    level = PATH.normLevel ? PATH.normLevel(level) : level;
    var bm = bossMeta(level);
    /* Banco dedicado del jefe: preguntas NUEVAS (palabras y contextos
       distintos a las lecciones). En C1/C2, formato TOEFL pero corto. Se
       muestrea en cada intento para dar variedad. */
    var bank = window.VESPER_BOSS_EXAMS && window.VESPER_BOSS_EXAMS[level];
    if (bank && bank.exercises && bank.exercises.length >= 5) {
      var SIZE = ({ A1: 8, A2: 8, B1: 8, B2: 9, C1: 11, C2: 13 })[level] || 8;
      var all = bank.exercises.slice(), pickedB;
      if (bank.toefl) {
        /* TOEFL corto: garantiza 1 lectura + 1 listening y completa con el resto */
        var rd = shuffle(all.filter(function (e) { return e.type === "reading"; })).slice(0, 1);
        var ls = shuffle(all.filter(function (e) { return e.type === "listening"; })).slice(0, 1);
        var rest = shuffle(all.filter(function (e) { return e.type !== "reading" && e.type !== "listening"; }));
        pickedB = rd.concat(ls).concat(rest).slice(0, SIZE);
      } else {
        pickedB = shuffle(all).slice(0, SIZE);
      }
      shuffle(pickedB);
      return {
        lessonId: "boss:" + level, level: level, track: "Examen del mundo", isBoss: true, bossLevel: level,
        title: bm.name + " · " + level,
        explanation: {
          body: "Demuestra tu dominio de " + level + ". "
            + (bank.toefl ? "Examen al estilo TOEFL (versión corta), con preguntas nuevas de lectura, listening y estructura. "
                          : "Preguntas nuevas, con palabras y contextos distintos a los de las lecciones. ")
            + "Necesitas " + bm.pass + "% para vencer al guardián y abrir el siguiente mundo.",
          examples: []
        },
        exercises: pickedB, xpReward: 70, mascotState: "thinking", nextLessonId: null
      };
    }
    /* Fallback (sin banco): arma el examen desde las lecciones del mundo. */
    var built = PATH.build(L, ORDER), gg = built.levels[level];
    if (!gg) return null;
    var pool = [];
    /* Dificultad por nivel: los mundos avanzados (B2/C1/C2) son más largos y
       eligen los ejercicios más exigentes; los básicos, variados. */
    var hard = (["B2", "C1", "C2"].indexOf(level) >= 0);
    var EXAM_SIZE = ({ B2: 12, C1: 13, C2: 14 })[level] || 12;
    var WEIGHT = { find_error: 5, reading: 5, word_order: 4, translate: 4, type_answer: 4,
                   fill_blank: 3, multiple_choice: 3, categorize: 3, listening: 2, true_false: 1, matching: 1 };
    function exW(e) { return WEIGHT[e.type] || 2; }
    /* El jefe es un examen libre: preguntas de TODAS las lecciones del nivel
       (1 por lección). En niveles altos se toma la pregunta más difícil de
       cada lección. */
    PATH.SKILL_ORDER.forEach(function (sk) {
      (gg.bySkill[sk] || []).forEach(function (lid) {
        var l = L[lid]; if (!l || !l.exercises || !l.exercises.length) return;
        var exs = l.exercises.slice();
        if (hard) { exs.sort(function (a, b) { return exW(b) - exW(a); }); pool.push(exs[0]); }
        else { pool.push(shuffle(exs)[0]); }
      });
    });
    var picked;
    if (hard) {
      pool.sort(function (a, b) { return exW(b) - exW(a); });   // las más difíciles primero
      picked = []; var seen = {}, TYPE_CAP = { reading: 2 };
      for (var i = 0; i < pool.length && picked.length < EXAM_SIZE; i++) {
        var tp = pool[i].type, cap = TYPE_CAP[tp] || 4;          // variedad: máx por tipo
        if ((seen[tp] || 0) >= cap) continue;
        seen[tp] = (seen[tp] || 0) + 1;
        picked.push(pool[i]);
      }
      /* si los topes dejaron el examen corto, rellena con lo que quede (sin más lecturas) */
      for (var j = 0; j < pool.length && picked.length < EXAM_SIZE; j++) {
        if (picked.indexOf(pool[j]) < 0 && pool[j].type !== "reading") picked.push(pool[j]);
      }
    } else {
      shuffle(pool);
      picked = pool.slice(0, Math.min(EXAM_SIZE, pool.length));
    }
    if (picked.length < 5) return null;   // material insuficiente
    shuffle(picked);                       // orden de presentación variado
    return {
      lessonId: "boss:" + level, level: level, track: "Examen del mundo", isBoss: true, bossLevel: level,
      title: bm.name + " · " + level,
      explanation: {
        body: "Demuestra tu dominio de " + level + ". Son preguntas mezcladas de todas las destrezas del mundo (no hace falta terminar las lecciones). Necesitas " + bm.pass + "% para vencer al guardián y abrir el siguiente mundo.",
        examples: []
      },
      exercises: picked, xpReward: 60, mascotState: "thinking", nextLessonId: null
    };
  }

  /* ---------- EXAMEN DE NIVEL: evaluación formal y completa de un nivel ----------
     A diferencia del jefe (corto y muestreado), el examen de nivel presenta TODO
     el banco de ese nivel (vesper_level_exams.js), ordenado por destreza
     (gramática → vocabulario → uso → lectura → listening). No es isBoss: corre
     por la vía normal de renderFeedback y se registra como examType "exam". */
  function buildLevelExam(level) {
    if (!PATH) return null;
    level = PATH.normLevel ? PATH.normLevel(level) : level;
    var bank = window.VESPER_LEVEL_EXAMS && window.VESPER_LEVEL_EXAMS[level];
    if (!bank || !bank.exercises || bank.exercises.length < 5) return null;
    var pass = bank.pass || 70;
    var SKILL_RANK = { grammar: 0, vocab: 1, use: 2, reading: 3, listening: 4 };
    /* orden estable por destreza, conservando el orden de autoría dentro de cada una */
    var exs = bank.exercises.map(function (e, i) { return { e: e, i: i }; });
    exs.sort(function (a, b) {
      var ra = (a.e.skill in SKILL_RANK) ? SKILL_RANK[a.e.skill] : 9;
      var rb = (b.e.skill in SKILL_RANK) ? SKILL_RANK[b.e.skill] : 9;
      return (ra - rb) || (a.i - b.i);
    });
    var ordered = exs.map(function (x) { return x.e; });
    return {
      lessonId: "exam:" + level, level: level, track: "Examen de nivel",
      isExam: true, examLevel: level, examPass: pass,
      title: "Examen de nivel · " + level,
      explanation: {
        body: "Evaluación completa del nivel " + level + ": gramática, vocabulario, uso del inglés, "
          + "lectura y listening. Son " + ordered.length + " ejercicios. Necesitas " + pass
          + "% para aprobar. Tu resultado queda registrado para tu profesor.",
        examples: []
      },
      exercises: ordered, xpReward: 80, mascotState: "thinking", nextLessonId: null
    };
  }

  /* quiz corto de calibracion al inicio de la sesion */
  function renderWarmup() {
    var band = A.levelToBand(A.profileLevel());
    var qs2 = A.warmupBank(band, 3);
    var idx = 0, ans = [];
    function step() {
      if (idx >= qs2.length) { finishWarm(); return; }
      var q = qs2[idx];
      var dots = qs2.map(function (_, i) { return '<span class="warm-dot' + (i <= idx ? " on" : "") + '"></span>'; }).join("");
      var opts = optOrder(q.options.length).map(function (i) { return '<button class="opt" data-i="' + i + '">' + esc(q.options[i]) + '</button>'; }).join("");
      show('<div class="wrap">' + topbar(6 + idx * 4) + '<div class="card center">'
        + mascot("thinking", A.greeting() + " Calibremos la sesion en 3 toques.") + '</div>'
        + '<div class="card"><div class="exnum">Calibracion &middot; ' + (idx + 1) + ' de ' + qs2.length + '</div>'
        + '<h2>' + esc(q.q) + '</h2><div class="opts">' + opts + '</div>'
        + '<div style="text-align:center;margin-top:10px">' + dots + '</div></div></div>');
      each(".opt", function (b) {
        b.onclick = function () {
          var i = +b.getAttribute("data-i");
          ans.push({ correct: i === q.correct, skill: q.skill });
          idx++; step();
        };
      });
    }
    function finishWarm() {
      var r = A.scoreWarmup(ans);
      buildAdapted();
      var msg = r.calibration > 0 ? "Vas muy bien: subimos el reto."
        : (r.calibration < 0 ? "Reforzamos lo basico, con calma." : "Listo, ajusto la leccion a tu nivel.");
      show('<div class="wrap">' + topbar(18) + '<div class="card center">'
        + mascot(r.calibration >= 0 ? "correct" : "explaining", msg)
        + '<h1>Sesion lista</h1>'
        + '<p class="muted">' + r.correct + ' de ' + r.total + ' en la calibracion</p>'
        + '<button class="btn btn-gold" id="go">Empezar leccion</button></div></div>');
      byId("go").onclick = renderCover;
    }
    step();
  }

  function leagueAddXp(xp) {
    need("league").then(function () {
      try { if (window.VESPER_LEAGUE && VESPER_LEAGUE.addXp) VESPER_LEAGUE.addXp(xp); } catch (e) {}
    }, function () {});
  }

  /* ---------- helpers ---------- */
  function byId(x) { return document.getElementById(x); }
  function each(sel, fn) { var n = document.querySelectorAll(sel); for (var i = 0; i < n.length; i++) fn(n[i]); }

  /* ---------- boot ---------- */
  if (!L || !Object.keys(L).length) {
    show('<div class="wrap"><div class="card center">' + mascot("thinking", "Algo falló al cargar tus lecciones.")
      + '<h1>Sin lecciones</h1><p class="muted">No se cargaron los datos. Suele ser un problema momentáneo de conexión.</p>'
      + '<button class="btn btn-gold" id="reloadL">Reintentar</button>'
      + '<a class="btn btn-ghost" href="index.html">Ir al inicio</a></div></div>');
    track("lessons_load_fail", {});
    byId("reloadL").onclick = function () { location.reload(); };
    return;
  }
  /* Sin la paleta flotante (VESPER_THEME.mountFloat): a 390 px tapaba el
     selector de mundos y el banner, y el encabezado del hub ya tiene su
     propio botón «Vestir a Vesper». */
  var wants = [];
  if (id === "exams" || /^(boss|exam):/.test(id || "")) wants.push("exams");
  if (id === "forja" || (id || "").indexOf("forja:") === 0) wants.push("forja");
  Promise.all(wants.map(need)).then(route, route);
  if (!id) afterLoad(function () {
    need("league").then(fillLeagueTile, function () {});
    need("forja").then(function () { refreshForjaCard(); }, function () {});
  });

  /* tras llegar vesper_forja.js: los conteos reales en la tarjeta del hub */
  function refreshForjaCard() {
    var FJ = window.VESPER_FORJA, el = byId("forjaGo");
    if (!FJ || !el) return;
    var sub = el.querySelector(".hc-tx span"); if (!sub) return;
    var due = FJ.dueCount(), rounds = FJ.roundsToday();
    if (due > 0) sub.textContent = "Tienes " + due + " ejercicio" + (due === 1 ? "" : "s") + " listo" + (due === 1 ? "" : "s") + " para volver";
    else if (rounds > 0) sub.textContent = "Llevas " + rounds + " ronda" + (rounds === 1 ? "" : "s") + " hoy · récord " + FJ.bestToday() + " aciertos";
  }

  function route() {
  if (!id) { renderIndex(); return; }
  if (id === "exams") { renderExamPicker(); return; }
  if (id === "review:srs") {
    baseLesson = (window.VESPER_SRS && VESPER_SRS.buildReviewLesson) ? VESPER_SRS.buildReviewLesson() : null;
    if (!baseLesson || !baseLesson.exercises.length) {
      show('<div class="wrap"><div class="card center">' + mascot("correct", "¡Sin errores pendientes!")
        + '<h1>Nada que repasar</h1><p class="muted">Cuando falles ejercicios aparecerán aquí para repasarlos.</p>'
        + '<a class="btn btn-gold" href="leccion.html">Ver lecciones</a></div></div>');
      return;
    }
    lesson = baseLesson;
    renderCover();
    return;
  }
  if (id.indexOf("review:") === 0) {
    baseLesson = buildReviewLesson(id);
    if (!baseLesson || !baseLesson.exercises.length) {
      show('<div class="wrap"><div class="card center">' + mascot("thinking", "Aún no hay repaso disponible.")
        + '<h1>Repaso no disponible</h1><p class="muted">Completa al menos 2 lecciones de esta destreza.</p>'
        + '<a class="btn btn-gold" href="leccion.html">Ver lecciones</a></div></div>');
      return;
    }
    lesson = baseLesson;
    renderCover();
    return;
  }
  if (id.indexOf("boss:") === 0) {
    baseLesson = buildBossExam(id.split(":")[1]);
    if (!baseLesson || !baseLesson.exercises.length) {
      show('<div class="wrap"><div class="card center">' + mascot("thinking", "El guardián aún no aparece.")
        + '<h1>Jefe no disponible</h1><p class="muted">Completa las lecciones del mundo para enfrentar al guardián.</p>'
        + '<a class="btn btn-gold" href="leccion.html">Ver lecciones</a></div></div>');
      return;
    }
    lesson = baseLesson;
    renderCover();
    return;
  }
  /* La Forja: ?id=forja[:<modo>][:<NIVEL>]  ·  ?id=forja:audit (autotest) */
  if (id === "forja" || id.indexOf("forja:") === 0) {
    if (!window.VESPER_FORJA) { forjaEmpty(); return; }
    var fparts = id.split(":");
    if (fparts[1] === "audit") {
      var rep;
      try { rep = VESPER_FORJA.audit(400); } catch (e) { rep = { error: e.message, stack: e.stack }; }
      show('<div class="wrap"><div class="card"><h1>Forja · auditoría</h1>'
        + '<pre id="auditOut" style="white-space:pre-wrap;font-size:12px;line-height:1.5;overflow-x:auto">'
        + esc(JSON.stringify(rep, null, 1)) + '</pre></div></div>');
      window.__forjaAudit = rep;
      return;
    }
    var fmode = "mixto", flevel = null, fi;
    for (fi = 1; fi < fparts.length; fi++) {
      if (FORJA_MODES[fparts[fi]]) fmode = fparts[fi];
      else if (/^[ABC][12]$/i.test(fparts[fi])) flevel = fparts[fi].toUpperCase();
    }
    var fcfg = FORJA_MODES[fmode];
    _forjaOpts = { mode: fmode, gens: fcfg.gens, level: flevel,
                   title: fcfg.title + (flevel ? (" · " + flevel) : ""), body: fcfg.body };
    forjaRound(true);
    return;
  }
  if (id.indexOf("exam:") === 0) {
    baseLesson = buildLevelExam(id.split(":")[1]);
    if (!baseLesson || !baseLesson.exercises.length) {
      show('<div class="wrap"><div class="card center">' + mascot("thinking", "Ese examen aún no está disponible.")
        + '<h1>Examen no disponible</h1><p class="muted">Aún no hay examen para ese nivel.</p>'
        + '<a class="btn btn-gold" href="leccion.html">Ver lecciones</a></div></div>');
      return;
    }
    lesson = baseLesson;
    renderCover();
    return;
  }
  baseLesson = L[id];
  if (!baseLesson) {
    show('<div class="wrap"><div class="card center">' + mascot("incorrect", "No encuentro esa leccion.")
      + '<h1>Leccion no encontrada</h1>'
      + '<p class="muted">Puede que este tema viva en tu libro. Ábrelo desde tus materiales y busca la lección ahí.</p>'
      + '<a class="btn btn-gold" href="materiales.html">Ir a mis materiales</a>'
      + '<a class="btn btn-ghost" href="leccion.html">Ver lecciones</a></div></div>');
    return;
  }
  lesson = baseLesson;
  startLesson();
  }
})();

  /* PWA: registra el service worker (offline) solo en http/https, no en file:// */
  if ("serviceWorker" in navigator && location.protocol.indexOf("http") === 0) {
    window.addEventListener("load", function () {
      navigator.serviceWorker.register("sw.js").catch(function () { /* sin SW: sigue funcionando online */ });
    });
  }

  /* Descargar como app: boton "Instalar app" que aparece cuando el navegador ofrece la instalacion (PWA) */
  (function () {
    var deferred = null;
    var btn = document.getElementById("install-btn");
    if (!btn) return;

    /* Ya corriendo como app instalada (o TWA de la Play Store): no mostrar nada */
    var standalone = window.matchMedia && window.matchMedia("(display-mode: standalone)").matches;
    if (standalone || navigator.standalone || document.referrer.indexOf("android-app://") === 0) return;

    window.addEventListener("beforeinstallprompt", function (e) {
      e.preventDefault();
      deferred = e;
      btn.classList.add("show");
    });

    btn.addEventListener("click", function () {
      if (!deferred) return;
      deferred.prompt();
      deferred.userChoice.then(function () {
        deferred = null;
        btn.classList.remove("show");
      });
    });

    window.addEventListener("appinstalled", function () {
      deferred = null;
      btn.classList.remove("show");
    });
  })();
