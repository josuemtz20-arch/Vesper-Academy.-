/* ============================================================
 * vesper_style.js — Estilo de la app: "Con diseño" o "Minimalista".
 *
 * Es un eje APARTE del tema de color (vesper_theme.js):
 *   - "diseno"  (por defecto): la app de siempre. Este archivo no toca nada.
 *   - "minimal": quita la atmósfera (escenas, ilustraciones, degradados,
 *     sombras, brillos, decorado del mapa) y deja contenido, tipografía y
 *     una sola tinta de acento. Trae tres variantes:
 *       papel     — blanco y negro, claro. Lo más limpio.
 *       grafito   — negro y gris, oscuro. Para la noche.
 *       editorial — crema y navy con titulares en serif. El más "Vesper".
 *
 * Se incluye SÍNCRONO en <head> (antes de pintar) para que no haya parpadeo:
 *     <script src="vesper_style.js"></script>
 * En minimal: pone html[data-vesper-style="minimal"][data-vesper-min="<var>"],
 * inyecta los tokens de la variante (con !important: le ganan al :root que
 * siembran las páginas y al que inyecta vesper_theme.js) y carga
 * assets/css/vesper_minimal.css, que vive al final del <head>.
 *
 * localStorage "vesper_appearance" (el mismo objeto que vesper_theme.js):
 *   { ..., style: "diseno" | "minimal", minimal: "papel" | "grafito" | "editorial" }
 *
 * API: VESPER_STYLE.get() · isMinimal() · isDark() · set(style, variant)
 *      · variants · order. Emite "vesper:style" al cambiar.
 * ============================================================ */
window.VESPER_STYLE = (function () {
  "use strict";
  var STORE = "vesper_appearance";
  var CSS_HREF = "assets/css/vesper_minimal.css";

  var VARIANTS = {
    papel: {
      name: "Papel", desc: "Blanco y negro. Lo más limpio.", dark: false,
      cream: "#FAFAF8", paper: "#FFFFFF", ink: "#111111", muted: "#646464",
      line: "#E6E4DF", accent: "#111111", onAccent: "#FFFFFF", accentInk: "#111111",
      success: "#1E7A55", error: "#B3261E", tint: "rgba(17,17,17,.05)"
    },
    grafito: {
      name: "Grafito", desc: "Negro y gris. Para estudiar de noche.", dark: true,
      cream: "#0E0E10", paper: "#17171A", ink: "#EDEDED", muted: "#A0A0A7",
      line: "#2B2B30", accent: "#EDEDED", onAccent: "#0E0E10", accentInk: "#EDEDED",
      success: "#4CC38A", error: "#F2726B", tint: "rgba(237,237,237,.07)"
    },
    editorial: {
      name: "Editorial", desc: "Crema, navy y titulares en serif.", dark: false,
      cream: "#F3EFE6", paper: "#FBF9F4", ink: "#1B1B2F", muted: "#5C5A66",
      line: "#E0D9CA", accent: "#1B1B2F", onAccent: "#FBF9F4", accentInk: "#7A5E12",
      success: "#1E7A55", error: "#B3261E", tint: "rgba(27,27,47,.05)"
    }
  };
  var ORDER = ["papel", "grafito", "editorial"];

  function read() {
    var s = {};
    try { s = JSON.parse(localStorage.getItem(STORE) || "{}") || {}; } catch (e) {}
    try {
      var q = /[?&]estilo=(diseno|papel|grafito|editorial)\b/.exec(location.search);
      if (q) { s.style = q[1] === "diseno" ? "diseno" : "minimal"; if (q[1] !== "diseno") s.minimal = q[1]; write(s); }
    } catch (e) {}
    return {
      style: s.style === "minimal" ? "minimal" : "diseno",
      minimal: VARIANTS[s.minimal] ? s.minimal : "papel"
    };
  }
  function write(patch) {
    try {
      var cur = JSON.parse(localStorage.getItem(STORE) || "{}") || {};
      for (var k in patch) cur[k] = patch[k];
      localStorage.setItem(STORE, JSON.stringify(cur));
    } catch (e) {}
  }

  function vars(v) {
    var d = v.dark;
    var map = {
      /* app de lecciones + motor de temas */
      "--ink": v.ink, "--text": v.ink, "--gold": v.accent, "--gold-lt": v.accent, "--gold-light": v.accent,
      "--gold2": v.accentInk, "--gold-deep": v.accentInk, "--gold-ink": v.accentInk, "--on-gold": v.onAccent,
      "--success": v.success, "--error": v.error, "--cream": v.cream, "--paper": v.paper, "--white": v.paper,
      "--muted": v.muted, "--line": v.line, "--border": v.line, "--hair": v.line,
      "--gold-tint": v.tint, "--ok-tint": d ? "rgba(76,195,138,.14)" : "rgba(30,122,85,.08)",
      "--no-tint": d ? "rgba(242,114,107,.14)" : "rgba(179,38,30,.07)",
      "--focus": v.ink, "--shadow": "none", "--sh": "none", "--sh-dusk": "none",
      /* superficies "oscuras" del sitio: en minimal son la tarjeta normal */
      "--navy": v.paper, "--navy2": v.line, "--navy3": v.cream,
      "--on-night": v.ink, "--on-night-soft": v.muted,
      /* tokens base (vesper_tokens.css) */
      "--va-ink": v.ink, "--va-gold": v.accent, "--va-cream": v.cream, "--va-paper": v.paper,
      "--va-muted": v.muted, "--va-line": v.line, "--va-night": v.cream, "--va-dusk": v.paper,
      "--va-twilight": v.line, "--va-star": v.accent, "--va-hairline": v.line,
      "--va-on-night": v.ink, "--va-on-night-soft": v.muted, "--va-focus": v.ink,
      "--va-shadow": "none", "--va-shadow-lg": "none", "--va-shadow-dusk": "none",
      "--va-grad-dusk": "none", "--va-glow-gold": "none", "--va-gold-tint": v.tint,
      /* mundos del mapa: un solo acento */
      "--w-accent": v.accent,
      /* mascota: sin aro de color */
      "--vc-ring": v.line, "--vc-glow": "transparent", "--vc-filter": "none",
      /* propios de minimal */
      "--m-bg": v.cream, "--m-card": v.paper, "--m-ink": v.ink, "--m-muted": v.muted,
      "--m-line": v.line, "--m-accent": v.accent, "--m-on-accent": v.onAccent, "--m-tint": v.tint,
      "--m-head": v === VARIANTS.editorial ? '"Inria Serif", "Fraunces", Georgia, serif' : 'Inter, system-ui, -apple-system, "Segoe UI", sans-serif',
      "--m-head-w": v === VARIANTS.editorial ? "700" : "650",
      "--m-head-ls": v === VARIANTS.editorial ? "-.005em" : "-.022em"
    };
    var out = [];
    for (var k in map) out.push(k + ":" + map[k] + " !important;");
    out.push("color-scheme:" + (d ? "dark" : "light") + " !important;");
    return 'html[data-vesper-style="minimal"]{' + out.join("") + "}";
  }

  function ensureLink() {
    var l = document.getElementById("vesper-minimal-css");
    if (!l) {
      l = document.createElement("link");
      l.id = "vesper-minimal-css"; l.rel = "stylesheet"; l.href = CSS_HREF;
      (document.head || document.documentElement).appendChild(l);
    }
    return l;
  }
  /* las páginas declaran su <style> DESPUÉS de este script: se mueve la hoja
     (y los tokens) al final del <head> para ganar también por orden. */
  function moveLast() {
    var h = document.head; if (!h) return;
    var a = document.getElementById("vesper-minimal-vars"), b = document.getElementById("vesper-minimal-css");
    if (a) h.appendChild(a);
    if (b) h.appendChild(b);
  }

  function apply(state) {
    state = state || read();
    var root = document.documentElement;
    var on = state.style === "minimal";
    var tag = document.getElementById("vesper-minimal-vars");
    if (!on) {
      root.removeAttribute("data-vesper-style");
      root.removeAttribute("data-vesper-min");
      if (tag) tag.textContent = "";
      /* devuelve el claro/oscuro al tema de color */
      try { if (window.VESPER_THEME && VESPER_THEME.apply) VESPER_THEME.apply(); } catch (e) {}
    } else {
      var v = VARIANTS[state.minimal];
      root.setAttribute("data-vesper-style", "minimal");
      root.setAttribute("data-vesper-min", state.minimal);
      if (!tag) {
        tag = document.createElement("style"); tag.id = "vesper-minimal-vars";
        (document.head || document.documentElement).appendChild(tag);
      }
      tag.textContent = vars(v);
      ensureLink();
      if (root.classList) root.classList[v.dark ? "add" : "remove"]("vesper-dark");
      var meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute("content", v.cream);
    }
    api.current = state;
    try { window.dispatchEvent(new CustomEvent("vesper:style", { detail: state })); } catch (e) {}
  }

  var api = {
    variants: VARIANTS, order: ORDER, current: null,
    get: read,
    isMinimal: function () { return read().style === "minimal"; },
    isDark: function () { var s = read(); return s.style === "minimal" && VARIANTS[s.minimal].dark; },
    apply: apply,
    set: function (style, variant) {
      var patch = { style: style === "minimal" ? "minimal" : "diseno" };
      if (variant && VARIANTS[variant]) patch.minimal = variant;
      write(patch);
      apply();
    }
  };

  apply();
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", moveLast);
  /* otra pestaña cambió el estilo */
  try { window.addEventListener("storage", function (e) { if (e.key === STORE) apply(); }); } catch (e) {}
  return api;
})();
