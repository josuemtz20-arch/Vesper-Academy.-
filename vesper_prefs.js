/* ============================================================
 * vesper_prefs.js — Aplicador de preferencias de accesibilidad y sonido.
 *
 * Lee las preferencias del alumno (guardadas por configuracion.html /
 * vesper_persona.js dentro de localStorage "vesper_profile" → .vesper) y
 * las APLICA en cada página, sin depender de que vesper_persona.js esté
 * cargado. Debe incluirse lo antes posible en <head> para evitar flash:
 *     <script src="vesper_prefs.js"></script>
 *
 * Aplica en <html>:
 *   - data-text-scale = "md" | "lg" | "xl"   (tamaño de texto)
 *   - clase .vesper-hc                         (alto contraste)
 *   - clase .vesper-reduce-motion              (menos animación)
 *   - clase .vesper-lite                       (modo ligero: equipos lentos)
 * Las reglas CSS viven en assets/css/vesper_tokens.css.
 *
 * RENDIMIENTO (perfMode = "auto" | "lite" | "full"):
 *   - En TODOS los equipos, las animaciones infinitas cuyo elemento está
 *     fuera de pantalla se pausan (IntersectionObserver) y vuelven al verse.
 *     En el mapa de leccion.html eso solo bajaba el CPU en reposo ~45 %.
 *   - Modo ligero: además pausa la decoración infinita visible, quita
 *     backdrop-filter y los sprites animados (leccion_app.js lo consulta).
 *     En "auto" se activa si el equipo tiene <=2 GB de RAM,
 *     Ahorro de datos, o si tras cargar se miden <25 fps (se recuerda 14 días).
 *
 * Expone window.VESPER_PREFS con lecturas baratas para leccion.html:
 *   soundEnabled()   -> bool (efectos de sonido)
 *   autoplayEnabled()-> bool (autoplay de audio en listening)
 *   freezeStreak()   -> bool (racha congelada)
 *   get()            -> objeto de preferencias resueltas
 *   apply()          -> re-aplica al DOM
 * Se re-aplica solo al evento "vesper:persona" (cambios en Configuración).
 * ============================================================ */
(function () {
  var PROFILE_KEY = "vesper_profile";

  var DEFAULTS = {
    textScale: "md",
    highContrast: false,
    reduceMotion: false,
    soundFx: true,
    sfxVolume: 60,       /* 0..100 */
    sfxPack: "madera",   /* madera | lucero | clasico | suave | arcade (vesper_sfx.js) */
    sfxTap: false,       /* clic al tocar opciones: apagado por defecto */
    autoplayAudio: true,
    freezeStreak: false,
    perfMode: "auto"     /* auto | lite | full */
  };

  function readVesper() {
    try {
      var p = JSON.parse(localStorage.getItem(PROFILE_KEY) || "null");
      if (p && typeof p === "object" && p.vesper && typeof p.vesper === "object") return p.vesper;
    } catch (e) {}
    return {};
  }

  /* preferencias resueltas = DEFAULTS + lo guardado */
  function get() {
    var v = readVesper();
    var out = {};
    for (var k in DEFAULTS) {
      out[k] = (v[k] != null) ? v[k] : DEFAULTS[k];
    }
    /* sanea textScale */
    if (out.textScale !== "lg" && out.textScale !== "xl") out.textScale = "md";
    if (out.perfMode !== "lite" && out.perfMode !== "full") out.perfMode = "auto";
    return out;
  }

  function apply() {
    var el = document.documentElement;
    if (!el) return;
    var pref = get();
    /* tamaño de texto */
    if (pref.textScale === "md") { if (el.removeAttribute) el.removeAttribute("data-text-scale"); }
    else { el.setAttribute("data-text-scale", pref.textScale); }
    /* alto contraste */
    toggleClass(el, "vesper-hc", !!pref.highContrast);
    /* reducir movimiento (preferencia explícita, además del media query) */
    toggleClass(el, "vesper-reduce-motion", !!pref.reduceMotion);
    /* modo ligero */
    var lite = pref.perfMode === "lite" || (pref.perfMode === "auto" && autoLite());
    toggleClass(el, "vesper-lite", lite);
    if (guard) guard.resyncAll();
  }

  /* ---------- Rendimiento: detección del modo ligero ---------- */
  var AUTO_KEY = "vesper_perf_auto";          /* {lite:true, t:ms} si los fps salieron bajos */
  var AUTO_TTL = 14 * 864e5;
  function weakHardware() {
    try {
      var n = navigator, c = n.connection;
      if (c && c.saveData) return true;
      if (n.deviceMemory && n.deviceMemory <= 2) return true;
      /* hardwareConcurrency no sirve: WebKit antiguo de iOS lo limita a 2 */
    } catch (e) {}
    return false;
  }
  function measuredLite() {
    try {
      var m = JSON.parse(localStorage.getItem(AUTO_KEY) || "null");
      return !!(m && m.lite && Date.now() - m.t < AUTO_TTL);
    } catch (e) { return false; }
  }
  function autoLite() { return weakHardware() || measuredLite(); }
  function isLite() {
    var el = document.documentElement;
    return !!(el && el.classList && el.classList.contains("vesper-lite"));
  }

  /* Mide los fps reales una vez cargada la página (2 s, pestaña visible).
     Solo en "auto" y si aún no está en ligero: con el ligero activo los fps
     suben y no queremos que el modo vaya y venga.
     Robusto: se aborta (sin guardar nada) si hay un hueco > 250 ms entre
     frames (bloqueo puntual) o si la pestaña cambia de visibilidad; usa la
     mediana del intervalo (>40 ms = lento) y exige DOS cargas de página
     lentas distintas (contador pendiente en localStorage) antes de guardar. */
  var PEND_KEY = "vesper_perf_pend";
  function probeFps() {
    if (!window.requestAnimationFrame || get().perfMode !== "auto" || isLite()) return;
    if (document.visibilityState && document.visibilityState !== "visible") return;
    var start = 0, last = 0, gaps = [], aborted = false;
    function onVis() { aborted = true; }
    document.addEventListener("visibilitychange", onVis);
    function done() { document.removeEventListener("visibilitychange", onVis); }
    function tick(t) {
      if (aborted || (document.visibilityState && document.visibilityState !== "visible")) { done(); return; }
      if (!start) { start = last = t; }
      else {
        if (t - last > 250) { done(); return; }   /* bloqueo puntual: no es lentitud sostenida */
        gaps.push(t - last); last = t;
      }
      if (t - start < 2000) { requestAnimationFrame(tick); return; }
      done();
      gaps.sort(function (a, b) { return a - b; });
      var med = gaps[Math.floor(gaps.length / 2)];
      try {
        if (med > 40) {
          /* pendiente {n,t}: solo vale si tiene < 24 h; un valor antiguo o plano cuenta como caducado */
          var pend = null, now = Date.now();
          try { pend = JSON.parse(localStorage.getItem(PEND_KEY)); } catch (e2) { pend = null; }
          if (pend && typeof pend === "object" && pend.n >= 1 && now - pend.t >= 0 && now - pend.t < 86400000) {
            localStorage.removeItem(PEND_KEY);
            localStorage.setItem(AUTO_KEY, JSON.stringify({ lite: true, t: Date.now(), fps: Math.round(1000 / med) }));
            apply();
          } else { localStorage.setItem(PEND_KEY, JSON.stringify({ n: 1, t: now })); }
        } else { localStorage.removeItem(PEND_KEY); }
      } catch (e) {}
    }
    requestAnimationFrame(tick);
  }

  /* ---------- Rendimiento: guardián de animaciones infinitas ----------
     Escucha animationstart (burbujea; se registra en <head>, antes de que
     exista el <body>) y observa cada elemento animado. NO usa
     Animation.pause()/play() (eso anula para siempre el animation-play-state
     del CSS del autor): alterna la clase .va-off en el elemento, cuya regla
     inyectada pone animation-play-state:paused. Quitar la clase devuelve el
     control al CSS del autor. La clase pausa TODAS las animaciones del
     elemento (y de ::before/::after); por eso se omiten los elementos con
     animaciones finitas mezcladas con infinitas (más seguro: no congelar
     una animación de una sola vez que otro código espera terminar). */
  var guard = (function () {
    if (!window.IntersectionObserver || !window.Element || !Element.prototype.getAnimations || !window.WeakMap) return null;
    var seen = typeof Set === "function" ? new Set() : null;
    if (!seen) return null;
    try {
      var st = document.createElement("style");
      st.textContent = ".va-off,.va-off::before,.va-off::after{animation-play-state:paused!important}";
      (document.head || document.documentElement).appendChild(st);
    } catch (e) { return null; }
    var visible = new WeakMap();
    var tracks = 0;
    /* los indicadores de carga siguen girando aunque esté en modo ligero */
    var KEEP = /spin|load|rotat|progress|typing|dots/i;
    var io = new IntersectionObserver(function (entries) {
      for (var i = 0; i < entries.length; i++) {
        var en = entries[i], el = en.target;
        if (!el.isConnected) { drop(el); continue; }
        visible.set(el, en.isIntersecting);
        sync(el);
      }
    }, { rootMargin: "120px" });
    function drop(el) { io.unobserve(el); seen["delete"](el); visible["delete"](el); }
    /* barrido barato: olvida elementos que salieron del DOM */
    function sweep() {
      var gone = [];
      seen.forEach(function (el) { if (!el.isConnected) gone.push(el); });
      for (var i = 0; i < gone.length; i++) drop(gone[i]);
    }
    function infinite(a) {
      try { return a.effect && a.effect.getComputedTiming().iterations === Infinity; } catch (e) { return false; }
    }
    function sync(el) {
      var list;
      try { list = el.getAnimations({ subtree: true }); } catch (e) { return; }
      var vis = visible.get(el) !== false, lite = isLite();
      var inf = 0, keep = 0, mixed = false;
      for (var i = 0; i < list.length; i++) {
        var a = list[i];
        if (!a.effect || a.effect.target !== el) continue;
        if (!infinite(a)) { mixed = true; continue; }
        inf++;
        if (KEEP.test(a.animationName || "")) keep++;
      }
      /* sin infinitas, o con animaciones finitas mezcladas: no tocar */
      var off = !mixed && inf > 0 && (!vis || (lite && keep === 0));
      toggleClass(el, "va-off", off);
    }
    function track(el) {
      if (!el || el.nodeType !== 1) return;
      if (seen.has(el)) { sync(el); return; }
      seen.add(el);
      io.observe(el);
      if (++tracks % 50 === 0) sweep();
    }
    document.addEventListener("animationstart", function (e) { track(e.target); }, true);
    return {
      resyncAll: function () { sweep(); seen.forEach(function (el) { sync(el); }); }
    };
  })();

  function toggleClass(el, cls, on) {
    if (el.classList) { el.classList[on ? "add" : "remove"](cls); return; }
    /* fallback muy antiguo */
    var c = (" " + (el.className || "") + " ").replace(" " + cls + " ", " ");
    el.className = (on ? c + cls : c).replace(/\s+/g, " ").trim();
  }

  /* aplica cuanto antes (el <html> ya existe al ejecutarse en <head>) */
  apply();

  /* re-aplica cuando Configuración cambia las preferencias */
  try { window.addEventListener("vesper:persona", apply); } catch (e) {}

  if (document.readyState === "complete") setTimeout(probeFps, 1500);
  else window.addEventListener("load", function () { setTimeout(probeFps, 1500); });

  window.VESPER_PREFS = {
    get: get,
    apply: apply,
    lite: isLite,
    soundEnabled: function () { return !!get().soundFx; },
    autoplayEnabled: function () { return !!get().autoplayAudio; },
    freezeStreak: function () { return !!get().freezeStreak; }
  };
})();
