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
 * Las reglas CSS viven en assets/css/vesper_tokens.css.
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
    autoplayAudio: true,
    freezeStreak: false
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
  }

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

  window.VESPER_PREFS = {
    get: get,
    apply: apply,
    soundEnabled: function () { return !!get().soundFx; },
    autoplayEnabled: function () { return !!get().autoplayAudio; },
    freezeStreak: function () { return !!get().freezeStreak; }
  };
})();
