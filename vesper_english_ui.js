/* =====================================================================
 * VESPER · ENGLISH UI  (lo que comparten las páginas "inglés al frente")
 * ---------------------------------------------------------------------
 * Lo usan materiales.html (hub del alumno) y audio_library.html.
 *
 *   VesperEN.phase()        "morning" 5–11 h · "afternoon" 12–18 h · "evening"
 *   VesperEN.greet()        ["Good morning", "buenos días"] según la hora
 *   VesperEN.levelIndex()   0..5 desde vesper_profile.level (0 si no hay)
 *   VesperEN.worldKey(i)    0..5 → "a1".."c2"
 *   VesperEN.art(key)       ruta de la escena de Vesper por el mundo para
 *                           esa clave y la hora actual:
 *                           assets/images/hub/world_<key>[_morning|_afternoon].jpg
 *                           (la de noche no lleva sufijo y es el respaldo)
 *   VesperEN.applyArt()     repinta todo lo marcado con data-world:
 *                             <img data-world="a1">           → src
 *                             <x data-world-bg="a1|level">    → --hero-art
 *                           "level" = la escena del nivel del alumno.
 *                           Se llama solo al cargar y cada 5 min, así la
 *                           lámina cambia si la página sigue abierta.
 *   VesperEN.renderPhrase(box)  llena una tarjeta de "Phrase of the day"
 *                           (marcado: #ph-term, #ph-ex, #ph-es, #ph-tip,
 *                           #ph-play dentro de box). Datos en
 *                           vesper_phrase_day.js, que debe cargar antes.
 *
 * Sin dependencias. Si falla algo, el HTML ya trae la escena de noche y la
 * tarjeta de la frase sale oculta: nada queda roto ni vacío.
 * ===================================================================== */
window.VesperEN = (function () {
  "use strict";
  var KEYS = ["a1", "a2", "b1", "b2", "c1", "c2"];

  function phase(d) {
    var h = (d || new Date()).getHours();
    return h >= 5 && h < 12 ? "morning" : h >= 12 && h < 19 ? "afternoon" : "evening";
  }
  function greet(d) {
    var p = phase(d);
    return p === "morning" ? ["Good morning", "buenos días"]
         : p === "afternoon" ? ["Good afternoon", "buenas tardes"]
         : ["Good evening", "buenas noches"];
  }
  function levelIndex() {
    try {
      var pr = JSON.parse(localStorage.getItem("vesper_profile") || "null");
      if (pr && typeof pr.level === "number") return Math.max(0, Math.min(5, Math.round(pr.level)));
    } catch (e) {}
    return 0;
  }
  function worldKey(i) { return KEYS[Math.max(0, Math.min(5, i | 0))]; }
  function art(key, d) {
    var p = phase(d);
    return "assets/images/hub/world_" + key + (p === "evening" ? "" : "_" + p) + ".jpg";
  }

  var lastPhase = null;
  /* onlyIfChanged: el reloj de 5 min sólo repinta cuando cambia la franja;
     cualquier otra llamada repinta siempre (puede haber marcado nuevo). */
  function applyArt(onlyIfChanged) {
    var p = phase();
    if (onlyIfChanged === true && p === lastPhase) return;
    lastPhase = p;
    Array.prototype.forEach.call(document.querySelectorAll("img[data-world]"), function (img) {
      var src = art(img.getAttribute("data-world"));
      if (img.getAttribute("src") !== src) img.setAttribute("src", src);
    });
    Array.prototype.forEach.call(document.querySelectorAll("[data-world-bg]"), function (el) {
      var k = el.getAttribute("data-world-bg");
      if (k === "level") k = worldKey(levelIndex());
      el.style.setProperty("--hero-art", 'url("' + art(k) + '")');
    });
  }

  function esc(t) {
    return String(t).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function renderPhrase(box) {
    var D = window.VESPER_PHRASE_DAY;
    if (!D || !box) return;
    var L = ["A1", "A2", "B1", "B2", "C1", "C2"], lvl = L[levelIndex()];
    var list = D[lvl] || D.A1;
    if (!list || !list.length) return;
    /* Una frase por día del año: estable todo el día, distinta mañana. */
    var now = new Date(), start = new Date(now.getFullYear(), 0, 0);
    var k = Math.floor((now - start) / 864e5) % list.length, it = list[k];
    var q = function (sel) { return box.querySelector(sel); };
    var hl = it.hl || it.t, en = it.en, i = en.toLowerCase().indexOf(hl.toLowerCase());
    q("#ph-term").textContent = it.t;
    q("#ph-ex").innerHTML = i < 0 ? esc(en)
      : esc(en.slice(0, i)) + "<mark>" + esc(en.slice(i, i + hl.length)) + "</mark>" + esc(en.slice(i + hl.length));
    q("#ph-es").textContent = it.es;
    var tip = q("#ph-tip");
    if (tip) { if (it.tip) tip.textContent = it.tip; else tip.remove(); }
    box.hidden = false;

    var btn = q("#ph-play"), au = null;
    var src = "assets/audio/phrase/" + lvl + "_" + (k + 1 < 10 ? "0" : "") + (k + 1) + ".mp3";
    function on(v) { btn.classList.toggle("is-on", v); }
    /* Si el MP3 no carga (sin red y sin caché), la voz del navegador lo lee:
       peor sonido, pero el botón nunca queda mudo. */
    function speak() {
      try {
        var s = window.speechSynthesis; if (!s) return on(false);
        s.cancel(); var u = new SpeechSynthesisUtterance(en); u.lang = "en-US"; u.rate = 0.9;
        u.onend = u.onerror = function () { on(false); }; on(true); s.speak(u);
      } catch (e) { on(false); }
    }
    btn.addEventListener("click", function () {
      if (au && !au.paused) { au.pause(); au.currentTime = 0; return on(false); }
      if (!au) {
        au = new Audio(src);
        au.addEventListener("ended", function () { on(false); });
        au.addEventListener("pause", function () { on(false); });
      }
      on(true);
      var pr = au.play();
      if (pr && pr.catch) pr.catch(function () { au = null; speak(); });
      try {
        if (window.VA && VA.track) VA.track("phrase_play", { page: location.pathname.split("/").pop(), level: lvl, n: k + 1 });
      } catch (e) {}
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", function () { applyArt(); });
  else applyArt();
  setInterval(function () { applyArt(true); }, 5 * 60 * 1000);

  return { phase: phase, greet: greet, levelIndex: levelIndex, worldKey: worldKey,
           art: art, applyArt: applyArt, renderPhrase: renderPhrase };
})();
