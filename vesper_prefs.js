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
 *     En "auto" se activa si el equipo tiene <=2 GB de RAM, <=2 núcleos,
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
      if (n.hardwareConcurrency && n.hardwareConcurrency <= 2) return true;
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
     suben y no queremos que el modo vaya y venga. */
  function probeFps() {
    if (!window.requestAnimationFrame || get().perfMode !== "auto" || isLite()) return;
    if (document.visibilityState && document.visibilityState !== "visible") return;
    var frames = 0, start = 0, last = 0, worst = 0;
    function tick(t) {
      if (!start) { start = last = t; }
      else { frames++; worst = Math.max(worst, t - last); last = t; }
      if (t - start < 2000) { requestAnimationFrame(tick); return; }
      if (document.visibilityState && document.visibilityState !== "visible") return;
      var avg = (last - start) / Math.max(1, frames);
      if (avg > 40) {
        try { localStorage.setItem(AUTO_KEY, JSON.stringify({ lite: true, t: Date.now(), fps: Math.round(1000 / avg) })); } catch (e) {}
        apply();
      }
    }
    requestAnimationFrame(tick);
  }

  /* ---------- Rendimiento: guardián de animaciones infinitas ----------
     Escucha animationstart (burbujea; se registra en <head>, antes de que
     exista el <body>) y observa cada elemento animado. Solo toca animaciones
     con iteraciones infinitas y solo reanuda las que pausó él. */
  var guard = (function () {
    if (!window.IntersectionObserver || !window.Element || !Element.prototype.getAnimations || !window.WeakMap) return null;
    var seen = typeof Set === "function" ? new Set() : null;
    if (!seen) return null;
    var visible = new WeakMap();
    var paused = new WeakMap();
    /* los indicadores de carga siguen girando aunque esté en modo ligero */
    var KEEP = /spin|load|rotat|progress|typing|dots/i;
    var io = new IntersectionObserver(function (entries) {
      for (var i = 0; i < entries.length; i++) {
        var en = entries[i], el = en.target;
        if (!el.isConnected) { io.unobserve(el); seen["delete"](el); visible["delete"](el); continue; }
        visible.set(el, en.isIntersecting);
        sync(el);
      }
    }, { rootMargin: "120px" });
    function infinite(a) {
      try { return a.effect && a.effect.getComputedTiming().iterations === Infinity; } catch (e) { return false; }
    }
    function sync(el) {
      var list;
      try { list = el.getAnimations({ subtree: true }); } catch (e) { return; }
      var vis = visible.get(el) !== false, lite = isLite();
      for (var i = 0; i < list.length; i++) {
        var a = list[i];
        if (!a.effect || a.effect.target !== el || !infinite(a)) continue;
        var run = vis && !(lite && !KEEP.test(a.animationName || ""));
        if (run) { if (paused.get(a) && a.playState === "paused") { paused["delete"](a); a.play(); } }
        else if (a.playState === "running") { paused.set(a, true); a.pause(); }
      }
    }
    function track(el) {
      if (!el || el.nodeType !== 1) return;
      if (seen.has(el)) { sync(el); return; }
      seen.add(el);
      io.observe(el);
    }
    document.addEventListener("animationstart", function (e) { track(e.target); }, true);
    return {
      resyncAll: function () { seen.forEach(function (el) { sync(el); }); }
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
