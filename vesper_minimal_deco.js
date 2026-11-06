/* ============================================================
 * vesper_minimal_deco.js — Láminas del estilo Minimalista fuera del mapa.
 *
 * vesper_style.js lo carga SÓLO con html[data-vesper-style="minimal"].
 * El mapa (leccion.html) pinta sus láminas él mismo en leccion_app.js; aquí
 * se decoran las páginas que arman su HTML a su manera:
 *   - audio_library.html  cabecera (tres grabados del oído) y una lámina por
 *                         colección
 *   - materiales.html     cabecera (los tres grabados del mundo del alumno) y
 *                         una lámina por libro en lugar del icono genérico
 *
 * Las láminas son las de las lecciones (assets/images/lessons/theme_*.jpg)
 * recortadas como máscara por _scripts/minimal_marks/make_line_marks.py en
 * assets/images/lessons/line/<tema>.webp; vesper_minimal.css las pinta con
 * el oro del tema sobre su tono más oscuro (sección 15).
 *
 * Las tarjetas se crean con JS y se rehacen al filtrar, así que un
 * MutationObserver decora lo que vaya apareciendo; cada nodo se marca con
 * data-mk para no decorarlo dos veces.
 * ============================================================ */
(function () {
  "use strict";
  var root = document.documentElement;
  if (root.getAttribute("data-vesper-style") !== "minimal") return;

  var DIR = "assets/images/lessons/line/";
  function mk(key, cls) {
    var u = DIR + key + ".webp";
    return '<i class="mk' + (cls ? " " + cls : "") + '" style="-webkit-mask-image:url(' + u + ');mask-image:url(' + u + ')"></i>';
  }
  function plate(key, cls) {
    return '<span class="mplate' + (cls ? " " + cls : "") + '" aria-hidden="true">' + mk(key) + '</span>';
  }
  function band(keys, cls) {
    return '<div class="mband' + (cls ? " " + cls : "") + '" aria-hidden="true">'
      + mk(keys[0], "mband__x") + mk(keys[1], "mband__a") + mk(keys[2], "mband__b")
      + mk(keys[3], "mband__c") + mk(keys[4], "mband__x")
      + '<span class="mband__rule"></span>'
      + '<span class="mband__st" style="left:9%;top:22%">&#10022;</span>'
      + '<span class="mband__st is-sm" style="left:31%;top:12%">&#10022;</span>'
      + '<span class="mband__st is-sm" style="right:27%;top:18%">&#10022;</span>'
      + '<span class="mband__st" style="right:8%;top:30%">&#10022;</span>'
      + '</div>';
  }

  /* los mismos cinco grabados por mundo que la cabecera del mapa (el
     teléfono enseña los tres del centro) */
  var WORLD = [
    ["food", "home", "family", "morning", "celebration"],
    ["map", "weather", "nature", "animals", "leisure"],
    ["city", "map", "globe", "travel", "phone"],
    ["mail", "career", "business", "finance", "negotiation"],
    ["science", "time", "future", "mind", "space"],
    ["philosophy", "literature", "storybook", "fantasy", "history"]
  ];
  function level() {
    try {
      var p = JSON.parse(localStorage.getItem("vesper_profile") || "null");
      var n = p && p.level != null ? parseInt(p.level, 10) : 0;
      return isNaN(n) ? 0 : Math.max(0, Math.min(5, n));
    } catch (e) { return 0; }
  }

  /* biblioteca de audio: una lámina por colección (data-col de la tarjeta) */
  var COL = {
    "diag": "diagnostic",
    "basics:1": "home", "basics:2": "morning", "basics:3": "history", "basics:4": "writing",
    "level:1": "leisure", "level:2": "news", "level:3": "debate",
    "level:4": "literature", "level:5": "ai", "level:6": "cinema",
    "bizpath:b1": "mail", "business": "business", "bizpath:c1": "negotiation",
    "political": "diplomacy", "cert": "time"
  };
  /* portal del alumno: una lámina por libro (libro.html?id=…) */
  var BOOK = {
    core_basics_lvl1: "home", core_basics_lvl2: "morning", core_basics_lvl3: "history", core_basics_lvl4: "writing",
    core_practice_lvl1: "retro", core_practice_lvl2: "mystery", core_practice_lvl3: "debate",
    core_practice_lvl4: "storybook", core_practice_lvl5: "ai", core_practice_lvl6: "cinema",
    core_grammar_lvl1: "education", core_grammar_lvl2: "literature", core_grammar_lvl3: "philosophy",
    cert_prep_b1: "heritage", cert_prep_b2: "achievement", cert_prep_c1: "sports", cert_prep: "time",
    exam_prep: "mind", exam_prep_vol2: "news",
    corporate_b1: "mail", corporate_b2: "business", corporate_c1: "negotiation",
    cci1: "fitness", daily_life_vol0: "conversation", daily_life_vol1: "food", daily_life_vol2: "finance",
    cabin_crew: "travel", political_english: "diplomacy", diagnostic_advanced: "diagnostic"
  };

  function decorate() {
    var i, n;
    /* cabecera de la biblioteca de audio: tocadiscos, guitarra, teléfono */
    var ah = document.getElementById("ahero");
    if (ah && !ah.hasAttribute("data-mk")) {
      ah.setAttribute("data-mk", "1");
      ah.insertAdjacentHTML("afterbegin", band(["news", "phone", "retro", "music", "conversation"], "mband--hero"));
    }
    /* cabecera del portal: el mundo del nivel del alumno */
    var intro = document.querySelector("main .intro");
    if (intro && !intro.hasAttribute("data-mk")) {
      intro.setAttribute("data-mk", "1");
      intro.insertAdjacentHTML("afterbegin", band(WORLD[level()], "mband--hero"));
    }
    /* colecciones */
    var cards = document.querySelectorAll(".col-card[data-col]:not([data-mk])");
    for (i = 0; i < cards.length; i++) {
      n = cards[i]; n.setAttribute("data-mk", "1");
      var key = COL[n.getAttribute("data-col")];
      var art = n.querySelector(".cc-art");
      /* en "Más adelante" (fichas mini, bloqueadas) la lámina pálida ocupa el
         lugar del número: pálido = todavía no, como en el mapa */
      if (key && art) { art.insertAdjacentHTML("beforeend", plate(key, "cc-pl")); n.classList.add("has-pl"); }
    }
    /* libros del portal */
    var books = document.querySelectorAll('a.card[href*="libro.html?id="]:not([data-mk])');
    for (i = 0; i < books.length; i++) {
      n = books[i]; n.setAttribute("data-mk", "1");
      var m = /[?&]id=([a-z0-9_]+)/.exec(n.getAttribute("href") || "");
      var bk = m && BOOK[m[1]], ic = n.querySelector(".cic");
      if (bk && ic) { ic.classList.add("mplate", "cic--pl"); ic.innerHTML = mk(bk); }
    }
    /* acceso "Dress Vesper": su retrato se oculta en minimalista y dejaba el
       cuadro vacío; va el maniquí de sastre */
    var cat = document.querySelector(".qn-ic--cat:not([data-mk])");
    if (cat) { cat.setAttribute("data-mk", "1"); cat.insertAdjacentHTML("beforeend", mk("fashion", "qn-mk")); }
  }

  var queued = false;
  function soon() {
    if (queued) return; queued = true;
    (window.requestAnimationFrame || setTimeout)(function () { queued = false; decorate(); });
  }
  function start() {
    decorate();
    try { new MutationObserver(soon).observe(document.body, { childList: true, subtree: true }); } catch (e) {}
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
