/* ============================================================
 * vesper_mascot.js — "Vesper Cat": mascota configurable + animada (drop-in).
 *
 * USO: incluye este <script> en cualquier pagina. Luego:
 *   VESPER_MASCOT.render(state, opts)  -> string HTML de la mascota (con burbuja + fx)
 *   VESPER_MASCOT.play(rootEl, state)  -> (re)dispara la animacion de un mascot ya montado
 *   VESPER_MASCOT.get(state)           -> { name, image, line }  (compatibilidad)
 * El CSS se inyecta solo (una vez). Respeta prefers-reduced-motion.
 *
 * ESTADOS: welcome, explaining, idle, thinking, correct, incorrect,
 *          streak_alive, streak_broken, milestone.
 *
 * ARTE: la imagen canonica es assets/images/mascot/vesper_cat.png.
 *   - Mientras no exista, cada estado usa esa ruta y cae (onerror) al gato
 *     anterior assets/images/virtual_class_happy_cat.png, asi nunca se rompe.
 *   - Para arte real por expresion: deja PNGs en assets/images/mascot/
 *     (p.ej. vesper_correct.png, vesper_sad.png) y apunta cada state.image.
 *     Se publican solos por el whitelist (!/assets/). Ver README.txt ahi.
 * ============================================================ */
window.VESPER_MASCOT = (function () {
  var BASE = "assets/images/mascot/";
  var CANON = BASE + "vesper_cat.png";                       // imagen principal (ponla aqui)
  var FALLBACK = "assets/images/virtual_class_happy_cat.png"; // respaldo si falta la principal
  /* variantes de expresion del gato de marca (IA, Higgsfield); si falta el
     archivo, el onerror cae a CANON y luego al FALLBACK historico. */
  var EXImg = {
    welcome:    BASE + "vesper_cat_welcome.webp",
    correct:    BASE + "vesper_cat_correct.webp",
    incorrect:  BASE + "vesper_cat_incorrect.webp",
    correcting: BASE + "vesper_cat_correcting.webp",
    explaining: BASE + "vesper_cat_explaining.webp",
    streak:     BASE + "vesper_cat_streak.webp"
  };

  // state -> { image, anim, fx, lines[] }
  var STATES = {
    welcome:       { image: EXImg.welcome, anim: "wave", fx: "",       lines: ["Hola, soy Vesper. Listo para aprender?", "Que bueno verte. Empecemos!", "Una leccion corta y vamos creciendo."] },
    explaining:    { image: EXImg.explaining, anim: "float", fx: "",   lines: ["Lee con calma y mira los ejemplos.", "Esto es mas facil de lo que parece.", "Fijate en el patron de la regla."] },
    idle:          { image: CANON, anim: "float",     fx: "",         lines: ["Aqui estoy cuando me necesites.", "Tomate tu tiempo."] },
    thinking:      { image: CANON, anim: "tilt",      fx: "",         lines: ["Mmm... piensa con cuidado.", "Tu puedes con esta."] },
    correct:       { image: EXImg.correct, anim: "bounce", fx: "sparkle", lines: ["Perfecto!", "Excelente, asi se hace.", "Lo tienes!"] },
    incorrect:     { image: EXImg.incorrect, anim: "shake", fx: "",    lines: ["Casi! Mira la explicacion.", "Tranquilo, equivocarse tambien ensena.", "Vuelve a intentarlo en la proxima."] },
    correcting:    { image: EXImg.correcting, anim: "tilt", fx: "",    lines: ["La respuesta correcta es esta.", "Mira, asi se dice.", "Quedate con esta y sigue."] },
    streak_alive:  { image: EXImg.streak, anim: "pump", fx: "flame",  lines: ["Tu racha sigue viva!", "Un dia mas sumado. Sigue asi.", "La constancia es tu superpoder."] },
    streak_broken: { image: CANON, anim: "dim",       fx: "",         lines: ["Empezamos una racha nueva. Vamos!", "Hoy es un gran dia para volver.", "Cada racha empieza con un dia."] },
    milestone:     { image: EXImg.correct, anim: "celebrate", fx: "confetti", lines: ["Increible! Lograste algo grande.", "Eso merece un escudo. Felicidades!", "Que orgullo, sigue brillando."] }
  };

  function pick(a) { return (a && a.length) ? a[Math.floor(Math.random() * a.length)] : ""; }
  function st(state) { return STATES[state] || STATES.idle || {}; }
  function escapeHtml(t) { return ("" + (t == null ? "" : t)).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  function imgTag(s, anim) {
    /* 1er fallo: cae al gato canonico de marca; 2o fallo: respaldo historico */
    return '<img class="vc-img vc-anim-' + anim + '" alt="Vesper Cat" src="' + (s.image || CANON) + '"'
      + ' data-canon="' + CANON + '"'
      + ' onerror="if(!this.dataset.f){this.dataset.f=1;this.src=this.getAttribute(\'data-canon\');}else{this.onerror=null;this.src=\'' + FALLBACK + '\';}">';
  }
  function fxHtml(fx) {
    var I = window.VESPER_ICN || {};
    var sp = I.sparkle || "", st = I.star || "", fl = I.flame || "";
    if (fx === "sparkle") return '<span class="vc-fx vc-sparkle">' + sp + '</span><span class="vc-fx vc-sparkle d2">' + sp + '</span>';
    if (fx === "confetti") return '<span class="vc-fx vc-confetti">' + st + '</span><span class="vc-fx vc-confetti d2">' + st + '</span><span class="vc-fx vc-confetti d3">' + sp + '</span>';
    if (fx === "flame") return '<span class="vc-fx vc-flame">' + fl + '</span>';
    return "";
  }

  var api = {
    name: "Vesper Cat",
    basePath: BASE, canonical: CANON, fallback: FALLBACK, states: STATES,

    /* HTML completo de la mascota.
       opts: { line: string|false (false oculta la burbuja), size: 'sm'|'md'|'lg' } */
    render: function (state, opts) {
      opts = opts || {};
      var s = st(state);
      var size = opts.size || "md";
      var line = (opts.line === false) ? "" : (opts.line != null ? opts.line : pick(s.lines));
      var anim = s.anim || "float";
      return '<div class="vesper-mascot vc-' + size + '" data-state="' + state + '">'
        + '<div class="vc-stage">' + imgTag(s, anim) + fxHtml(s.fx) + '</div>'
        + (line ? '<div class="vc-bubble">' + escapeHtml(line) + '</div>' : '')
        + '</div>';
    },

    /* (re)dispara la animacion en un mascot ya renderizado (para replays) */
    play: function (root, state) {
      if (!root) return;
      var img = root.querySelector(".vc-img"); if (!img) return;
      var s = st(state), anim = "vc-anim-" + (s.anim || "float");
      img.className = (img.className.replace(/vc-anim-\S+/g, "").trim() + " vc-img").replace(/\s+/g, " ").trim();
      void img.offsetWidth; // reflow -> permite re-ejecutar la animacion
      img.classList.add(anim);
      var stage = root.querySelector(".vc-stage");
      if (stage) {
        var olds = stage.querySelectorAll(".vc-fx");
        for (var i = 0; i < olds.length; i++) olds[i].parentNode.removeChild(olds[i]);
        stage.insertAdjacentHTML("beforeend", fxHtml(s.fx));
      }
      root.setAttribute("data-state", state);
    },

    /* accesor simple (compatibilidad con codigo anterior) */
    get: function (state) {
      var s = st(state);
      return { name: this.name, image: s.image || CANON, line: pick(s.lines) };
    },

    injectCSS: function () { injectCSS(); }
  };

  function injectCSS() {
    if (typeof document === "undefined" || document.getElementById("vesper-mascot-css")) return;
    var css = [
      ".vesper-mascot{display:flex;flex-direction:column;align-items:center;gap:8px}",
      ".vc-stage{position:relative;display:inline-block;line-height:0}",
      ".vc-img{border-radius:50%;object-fit:cover;background:rgba(201,168,76,.14);border:2px solid #C9A84C;display:block}",
      ".vc-sm .vc-img{width:46px;height:46px}",
      ".vc-md .vc-img{width:84px;height:84px}",
      ".vc-lg .vc-img{width:120px;height:120px}",
      ".vc-bubble{background:rgba(201,168,76,.14);border-radius:14px;padding:9px 13px;font-size:.95rem;max-width:300px;text-align:center;color:#1B1B2F;animation:vc-fade .3s ease}",
      ".vc-fx{position:absolute;font-size:1.15rem;pointer-events:none;z-index:2;color:#C9A84C}",
      ".vc-fx svg{width:1.05em;height:1.05em;display:block}",
      ".vc-flame svg{color:#C9A84C}",
      ".vc-sparkle{top:-6px;right:-6px;animation:vc-twinkle 1s ease-out infinite}",
      ".vc-sparkle.d2{top:auto;bottom:-4px;left:-6px;right:auto;animation-delay:.5s}",
      ".vc-confetti{top:-10px;left:46%;animation:vc-rise 1.2s ease-out forwards}",
      ".vc-confetti.d2{left:18%;animation-delay:.15s}",
      ".vc-confetti.d3{left:74%;animation-delay:.3s}",
      ".vc-flame{bottom:-4px;right:-4px;animation:vc-soft 1.4s ease-in-out infinite}",
      ".vc-anim-float{animation:vc-float 3s ease-in-out infinite}",
      ".vc-anim-tilt{animation:vc-tilt 3s ease-in-out infinite}",
      ".vc-anim-pulse{animation:vc-soft 2s ease-in-out infinite}",
      ".vc-anim-wave{transform-origin:60% 92%;animation:vc-wave 1.05s ease-in-out 2}",
      ".vc-anim-pump{transform-origin:50% 95%;animation:vc-pump .62s cubic-bezier(.3,.82,.4,1) 3}",
      ".vc-anim-bounce{animation:vc-bounce .7s cubic-bezier(.28,.84,.42,1)}",
      ".vc-anim-shake{animation:vc-shake .5s ease}",
      ".vc-anim-celebrate{animation:vc-celebrate .9s ease}",
      ".vc-anim-dim{filter:grayscale(.7);opacity:.7}",
      "@keyframes vc-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}",
      "@keyframes vc-tilt{0%,100%{transform:rotate(-4deg)}50%{transform:rotate(4deg)}}",
      "@keyframes vc-soft{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}",
      "@keyframes vc-wave{0%{transform:rotate(0)}15%{transform:rotate(-11deg)}35%{transform:rotate(7deg)}55%{transform:rotate(-9deg)}75%{transform:rotate(5deg)}100%{transform:rotate(0)}}",
      "@keyframes vc-pump{0%{transform:translateY(0) scale(1)}28%{transform:translateY(-13px) scale(1.07)}55%{transform:translateY(0) scale(.97)}78%{transform:translateY(-5px) scale(1.02)}100%{transform:translateY(0) scale(1)}}",
      "@keyframes vc-bounce{0%{transform:translateY(0) scale(1)}30%{transform:translateY(-14px) scale(1.08)}55%{transform:translateY(0) scale(.97)}75%{transform:translateY(-6px) scale(1.02)}100%{transform:translateY(0) scale(1)}}",
      "@keyframes vc-shake{0%,100%{transform:translateX(0)}20%{transform:translateX(-8px)}40%{transform:translateX(8px)}60%{transform:translateX(-6px)}80%{transform:translateX(6px)}}",
      "@keyframes vc-celebrate{0%{transform:scale(1) rotate(0)}30%{transform:scale(1.15) rotate(-6deg)}60%{transform:scale(1.05) rotate(6deg)}100%{transform:scale(1) rotate(0)}}",
      "@keyframes vc-twinkle{0%{opacity:0;transform:scale(.6)}50%{opacity:1;transform:scale(1.1)}100%{opacity:0;transform:scale(.6)}}",
      "@keyframes vc-rise{0%{opacity:0;transform:translateY(6px) scale(.8)}30%{opacity:1}100%{opacity:0;transform:translateY(-26px) scale(1.1)}}",
      "@keyframes vc-fade{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:none}}",
      "@media (prefers-reduced-motion: reduce){.vc-anim-float,.vc-anim-tilt,.vc-anim-pulse,.vc-anim-wave,.vc-anim-pump,.vc-anim-bounce,.vc-anim-shake,.vc-anim-celebrate,.vc-fx{animation:none!important}}"
    ].join("\n");
    var el = document.createElement("style");
    el.id = "vesper-mascot-css";
    el.textContent = css;
    (document.head || document.documentElement).appendChild(el);
  }
  injectCSS();

  return api;
})();
