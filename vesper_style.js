/* ============================================================
 * vesper_style.js — Estilo de la app: "Con diseño" o "Minimalista".
 *
 * Es un eje APARTE del tema de color (vesper_theme.js):
 *   - "diseno"  (por defecto): la app de siempre. Este archivo no toca nada.
 *   - "minimal": quita la atmósfera (escenas, ilustraciones, degradados,
 *     sombras, brillos, decorado del mapa), el mapa pasa a ser una LISTA y
 *     Vocabulario / Forja vuelven a ser fichas del hub.
 *
 * Los COLORES no cambian: el minimalista usa la paleta de Vesper que tenga
 * elegida el alumno (Vespertina, Clásico Oro, Medianoche…), porque esos
 * tokens ya los lee cada sección de las lecciones. Así el cambio es de
 * estructura y adorno, no de identidad.
 *
 * Se incluye SÍNCRONO en <head> (antes de pintar) para que no haya parpadeo:
 *     <script src="vesper_style.js"></script>
 * En minimal pone html[data-vesper-style="minimal"] y carga
 * assets/css/vesper_minimal.css al final del <head>.
 *
 * localStorage "vesper_appearance" (el mismo objeto que vesper_theme.js):
 *   { ..., style: "diseno" | "minimal" }
 * Prueba rápida: ?estilo=minimal | ?estilo=diseno
 *
 * API: VESPER_STYLE.get() · isMinimal() · set(style). Emite "vesper:style".
 * ============================================================ */
window.VESPER_STYLE = (function () {
  "use strict";
  var STORE = "vesper_appearance";
  var CSS_HREF = "assets/css/vesper_minimal.css";

  function write(patch) {
    try {
      var cur = JSON.parse(localStorage.getItem(STORE) || "{}") || {};
      for (var k in patch) cur[k] = patch[k];
      localStorage.setItem(STORE, JSON.stringify(cur));
    } catch (e) {}
  }
  function read() {
    var s = {};
    try { s = JSON.parse(localStorage.getItem(STORE) || "{}") || {}; } catch (e) {}
    try {
      var q = /[?&]estilo=([a-z]+)\b/.exec(location.search);
      if (q) { s.style = q[1] === "diseno" ? "diseno" : "minimal"; write({ style: s.style }); }
    } catch (e) {}
    return { style: s.style === "minimal" ? "minimal" : "diseno" };
  }

  function ensureLink() {
    if (document.getElementById("vesper-minimal-css")) return;
    var l = document.createElement("link");
    l.id = "vesper-minimal-css"; l.rel = "stylesheet"; l.href = CSS_HREF;
    (document.head || document.documentElement).appendChild(l);
  }
  /* las páginas declaran su <style> DESPUÉS de este script: la hoja se mueve
     al final del <head> para ganar también por orden de cascada. */
  function moveLast() {
    var h = document.head, l = document.getElementById("vesper-minimal-css");
    if (h && l) h.appendChild(l);
  }

  function apply(state) {
    state = state || read();
    var root = document.documentElement;
    if (state.style === "minimal") { root.setAttribute("data-vesper-style", "minimal"); ensureLink(); }
    else root.removeAttribute("data-vesper-style");
    api.current = state;
    try { window.dispatchEvent(new CustomEvent("vesper:style", { detail: state })); } catch (e) {}
  }

  var api = {
    current: null,
    get: read,
    isMinimal: function () { return read().style === "minimal"; },
    apply: apply,
    set: function (style) { write({ style: style === "minimal" ? "minimal" : "diseno" }); apply(); }
  };

  apply();
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", moveLast);
  try { window.addEventListener("storage", function (e) { if (e.key === STORE) apply(); }); } catch (e) {}
  return api;
})();
