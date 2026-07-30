/* ============================================================
 * vesper_tour.js — Paseo guiado (coachmarks) con Vesper.
 *
 * POR QUÉ EXISTE: el hub de lecciones habla de mundos, senderos,
 * guardianes, destrezas, racha y XP. Antes eso se "explicaba" con
 * una tarjeta de viñetas (el primer) que se leía ANTES de ver la
 * pantalla y no señalaba nada: había que adivinar qué era cada
 * cosa. Este módulo apunta a los elementos de verdad, uno a uno,
 * con Vesper contándolo.
 *
 * USO:
 *   VESPER_TOUR.start([
 *     { el: null, title: "...", text: "..." },          // ficha centrada
 *     { el: ".wbtn.is-current", title: "...", text: "...", shape: "circle" },
 *     ...
 *   ], { key: "leccion-v1", onEnd: fn, startAt: 0 });
 *
 *   VESPER_TOUR.seen(key)  -> ¿ya lo vio?
 *   VESPER_TOUR.reset(key) -> lo vuelve a marcar como no visto
 *   VESPER_TOUR.active()   -> ¿hay un paseo abierto?
 *
 * Los pasos cuyo `el` no existe en la página SE SALTAN solos, así
 * que el llamador puede pedir pasos opcionales sin comprobar nada.
 *
 * Accesibilidad: role="dialog" aria-modal, el foco entra en la
 * ficha y queda atrapado, Esc sale, flechas/Enter navegan, cada
 * paso se anuncia. Con prefers-reduced-motion (o la clase
 * .vesper-reduce-motion) no hay transiciones ni latidos.
 * ============================================================ */
window.VESPER_TOUR = (function () {
  var SEEN_PREFIX = "vesper_tour_";
  var state = null;              // { steps, i, key, onEnd, nodes... }

  function reduceMotion() {
    try {
      if (document.documentElement.classList.contains("vesper-reduce-motion")) return true;
      return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    } catch (e) { return false; }
  }
  function esc(s) {
    return ("" + (s == null ? "" : s)).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  /* ---------- Vesper de la ficha ----------
     Se pinta con el aspecto y el accesorio que la persona haya elegido:
     el guía es SU gato, no un genérico. Si vesper_theme.js no está,
     cae al retrato canónico. */
  function catFigure() {
    var img = "assets/images/mascot/vesper_cat.png", accSvg = "", tint = true;
    try {
      var T = window.VESPER_THEME;
      if (T && T.get) {
        var s = T.get();
        var pel = T.pelajes && T.pelajes[s.pelaje];
        if (pel && pel.img && s.pelaje !== "classic") { img = pel.img; tint = false; }
        var unlocked = true;
        if (window.VESPER_COSMETICS && VESPER_COSMETICS.isUnlocked && s.accessory && s.accessory !== "none") {
          unlocked = !!VESPER_COSMETICS.isUnlocked("acc", s.accessory);
        }
        var acc = T.accessories && T.accessories[s.accessory];
        if (acc && acc.svg && unlocked) accSvg = acc.svg;
      }
    } catch (e) {}
    return '<span class="vtour-cat" aria-hidden="true">'
      + '<img class="vtour-cat__img' + (tint ? " vtour-cat__img--tint" : "") + '" src="' + img + '" alt="">'
      + accSvg + '</span>';
  }

  function injectCSS() {
    if (document.getElementById("vesper-tour-css")) return;
    var css = [
      /* capa que bloquea la interacción; el agujero va encima y es decorativo */
      ".vtour-block{position:fixed;inset:0;z-index:10040;background:transparent;cursor:default}",
      /* el foco de luz: un rect con una sombra enorme que oscurece TODO lo demás.
         Animar top/left/width/height hace que el foco "viaje" de un paso al otro. */
      ".vtour-hole{position:fixed;z-index:10041;pointer-events:none;border-radius:14px;",
      "  box-shadow:0 0 0 9999px rgba(10,9,24,.74),0 0 0 2px var(--gold,#C9A84C),0 0 22px 4px rgba(201,168,76,.45);",
      "  transition:top .44s cubic-bezier(.32,.72,.28,1),left .44s cubic-bezier(.32,.72,.28,1),",
      "             width .44s cubic-bezier(.32,.72,.28,1),height .44s cubic-bezier(.32,.72,.28,1),border-radius .3s ease}",
      ".vtour-hole--circle{border-radius:50%}",
      /* sin objetivo (intro/cierre): sólo oscurece, sin marco ni halo */
      ".vtour-hole--none{box-shadow:0 0 0 9999px rgba(10,9,24,.8);border-radius:0}",
      /* latido del marco, para que el ojo encuentre el objetivo */
      ".vtour-ring{position:fixed;z-index:10042;pointer-events:none;border-radius:14px;border:2px solid var(--gold,#C9A84C);",
      "  opacity:0;animation:vtour-ping 1.9s ease-out infinite;",
      "  transition:top .44s cubic-bezier(.32,.72,.28,1),left .44s cubic-bezier(.32,.72,.28,1),",
      "             width .44s cubic-bezier(.32,.72,.28,1),height .44s cubic-bezier(.32,.72,.28,1)}",
      ".vtour-ring--circle{border-radius:50%}",
      "@keyframes vtour-ping{0%{opacity:.85;transform:scale(1)}70%{opacity:0;transform:scale(1.14)}100%{opacity:0;transform:scale(1.14)}}",
      /* la ficha */
      ".vtour-card{position:fixed;z-index:10043;width:min(340px,calc(100vw - 28px));",
      "  background:linear-gradient(180deg,var(--navy2,#2c2c4a),var(--navy,#1B1B2F));color:#EDE7D6;",
      "  border:1px solid var(--gold,#C9A84C);border-radius:18px;padding:15px 16px 13px;",
      "  box-shadow:0 18px 44px rgba(8,7,20,.6);font-family:Inter,system-ui,-apple-system,sans-serif;",
      "  animation:vtour-in .3s cubic-bezier(.2,.7,.3,1.1) both}",
      "@keyframes vtour-in{from{opacity:0;transform:translateY(8px) scale(.985)}to{opacity:1;transform:none}}",
      /* pico que apunta al objetivo */
      ".vtour-card::after{content:'';position:absolute;width:12px;height:12px;background:var(--navy2,#2c2c4a);",
      "  border-left:1px solid var(--gold,#C9A84C);border-top:1px solid var(--gold,#C9A84C);transform:rotate(45deg)}",
      ".vtour-card[data-side='below']::after{top:-7px;left:var(--arrow,50%);margin-left:-6px}",
      ".vtour-card[data-side='above']::after{bottom:-7px;left:var(--arrow,50%);margin-left:-6px;transform:rotate(225deg)}",
      ".vtour-card[data-side='center']::after{display:none}",
      ".vtour-head{display:flex;align-items:flex-start;gap:11px;margin-bottom:8px}",
      /* Vesper: el mismo cuadro 1:1 que usa el avatar del mapa, así el
         accesorio (calibrado a ese cuadro) cae en su sitio */
      ".vtour-cat{position:relative;flex:0 0 auto;width:54px;height:54px}",
      ".vtour-cat img,.vtour-cat svg{position:absolute;inset:0;width:100%;height:100%}",
      ".vtour-cat img{object-fit:contain}",
      ".vtour-cat__img--tint{filter:var(--vc-filter,none)}",
      ".vtour-cat svg{overflow:visible;filter:drop-shadow(0 1px 1px rgba(10,9,24,.5))}",
      ".vtour-bob{animation:vtour-bob 2.8s ease-in-out infinite}",
      "@keyframes vtour-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}",
      ".vtour-t{margin:1px 0 0;font-family:'Inria Serif',Georgia,serif;font-size:1.12rem;line-height:1.2;color:#EDE7D6}",
      ".vtour-ey{display:block;font-size:.6rem;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:var(--gold,#C9A84C)}",
      ".vtour-x{font-size:.95rem;line-height:1.45;margin:0 0 11px;color:rgba(237,231,214,.9)}",
      ".vtour-foot{display:flex;align-items:center;gap:10px}",
      ".vtour-dots{display:flex;gap:5px;flex:1;flex-wrap:wrap}",
      ".vtour-dot{width:7px;height:7px;border-radius:50%;background:rgba(237,231,214,.28);transition:background .2s ease,transform .2s ease}",
      ".vtour-dot.on{background:var(--gold,#C9A84C);transform:scale(1.25)}",
      ".vtour-dot.done{background:rgba(201,168,76,.6)}",
      ".vtour-btn{font:inherit;font-size:.88rem;font-weight:700;cursor:pointer;border-radius:999px;padding:8px 15px;border:1px solid transparent}",
      ".vtour-btn--go{background:var(--gold,#C9A84C);color:var(--on-gold,#1B1B2F);border-color:var(--gold,#C9A84C)}",
      ".vtour-btn--go:hover{filter:brightness(1.06)}",
      ".vtour-btn--ghost{background:transparent;color:rgba(237,231,214,.8);border-color:rgba(237,231,214,.28);padding:8px 12px}",
      ".vtour-btn--ghost:hover{color:#EDE7D6;border-color:rgba(237,231,214,.5)}",
      ".vtour-skip{position:absolute;top:9px;right:11px;background:none;border:none;color:rgba(237,231,214,.6);",
      "  font:inherit;font-size:.76rem;cursor:pointer;padding:3px 5px;border-radius:8px}",
      ".vtour-skip:hover{color:#EDE7D6}",
      ".vtour-card :focus-visible{outline:2px solid var(--gold,#C9A84C);outline-offset:2px}",
      /* quieto: sin viaje del foco, sin latido, sin bob */
      "@media(prefers-reduced-motion:reduce){",
      "  .vtour-hole,.vtour-ring,.vtour-card{transition:none!important;animation:none!important}",
      "  .vtour-ring{opacity:.9}.vtour-bob{animation:none}}",
      ".vesper-reduce-motion .vtour-hole,.vesper-reduce-motion .vtour-ring,.vesper-reduce-motion .vtour-card{transition:none!important;animation:none!important}",
      ".vesper-reduce-motion .vtour-ring{opacity:.9}",
      ".vesper-reduce-motion .vtour-bob{animation:none}"
    ].join("\n");
    var el = document.createElement("style");
    el.id = "vesper-tour-css";
    el.textContent = css;
    (document.head || document.documentElement).appendChild(el);
  }

  function seen(key) {
    try { return localStorage.getItem(SEEN_PREFIX + key) === "1"; } catch (e) { return true; }
  }
  function markSeen(key) {
    try { localStorage.setItem(SEEN_PREFIX + key, "1"); } catch (e) {}
  }
  function reset(key) {
    try { localStorage.removeItem(SEEN_PREFIX + key); } catch (e) {}
  }

  function resolve(sel) {
    if (!sel) return null;
    if (typeof sel !== "string") return sel;           // ya es un Element
    try { return document.querySelector(sel); } catch (e) { return null; }
  }

  /* ¿el elemento está pintado? Un objetivo con display:none mide 0 y el foco
     de luz se quedaría en una esquina apuntando a nada: eso vale como "no
     existe" y el paso se salta.
     Medir la caja NO basta: el botón flotante del chat (.vchat-fab) ocupa sus
     62px desde que se monta, pero entra con opacity:0 hasta que le ponen
     .show-fab. Un elemento así mide, así que pasaría el filtro y acabaríamos
     iluminando un hueco vacío. Por eso también miramos lo calculado. */
  function visible(el) {
    if (!el || !el.getBoundingClientRect) return false;
    var r = el.getBoundingClientRect();
    if (r.width <= 1 || r.height <= 1) return false;
    try {
      var cs = getComputedStyle(el);
      if (cs.visibility === "hidden" || cs.display === "none") return false;
      if (parseFloat(cs.opacity) < 0.05) return false;
    } catch (e) {}
    return true;
  }

  function place() {
    if (!state) return;
    var st = state.steps[state.i];
    var el = st._el;
    var hole = state.hole, ring = state.ring, card = state.card;
    var vw = window.innerWidth, vh = window.innerHeight;

    if (!el) {
      /* ficha centrada, sin marco */
      hole.className = "vtour-hole vtour-hole--none";
      hole.style.cssText += ";top:50%;left:50%;width:0;height:0";
      ring.style.display = "none";
      card.setAttribute("data-side", "center");
      card.style.left = Math.round((vw - card.offsetWidth) / 2) + "px";
      card.style.top = Math.round((vh - card.offsetHeight) / 2) + "px";
      return;
    }

    var pad = st.pad == null ? 8 : st.pad;
    var r = el.getBoundingClientRect();
    var t = r.top - pad, l = r.left - pad, w = r.width + pad * 2, h = r.height + pad * 2;
    var circle = st.shape === "circle";

    hole.className = "vtour-hole" + (circle ? " vtour-hole--circle" : "");
    hole.style.top = t + "px"; hole.style.left = l + "px";
    hole.style.width = w + "px"; hole.style.height = h + "px";
    ring.style.display = "";
    ring.className = "vtour-ring" + (circle ? " vtour-ring--circle" : "");
    ring.style.top = t + "px"; ring.style.left = l + "px";
    ring.style.width = w + "px"; ring.style.height = h + "px";

    /* debajo si cabe, si no encima; el pico apunta al centro del objetivo */
    var cw = card.offsetWidth, ch = card.offsetHeight, GAP = 14;
    var below = t + h + GAP + ch <= vh - 8;
    var top = below ? (t + h + GAP) : (t - GAP - ch);
    if (top < 8) top = 8;
    if (top + ch > vh - 8) top = Math.max(8, vh - 8 - ch);
    var left = r.left + r.width / 2 - cw / 2;
    left = Math.max(10, Math.min(left, vw - cw - 10));
    card.setAttribute("data-side", below ? "below" : "above");
    card.style.left = Math.round(left) + "px";
    card.style.top = Math.round(top) + "px";
    var ax = r.left + r.width / 2 - left;
    card.style.setProperty("--arrow", Math.max(14, Math.min(ax, cw - 14)) + "px");
  }

  function render() {
    if (!state) return;
    var st = state.steps[state.i];
    var last = state.i === state.steps.length - 1;
    var dots = "";
    for (var k = 0; k < state.steps.length; k++) {
      dots += '<span class="vtour-dot' + (k === state.i ? " on" : (k < state.i ? " done" : "")) + '"></span>';
    }
    state.card.innerHTML =
      (last ? "" : '<button class="vtour-skip" type="button" data-tour="skip">Saltar</button>')
      + '<div class="vtour-head">' + catFigure().replace('class="vtour-cat"', 'class="vtour-cat vtour-bob"')
      + '<div><span class="vtour-ey">Paso ' + (state.i + 1) + ' de ' + state.steps.length + '</span>'
      + '<h2 class="vtour-t" id="vtour-title">' + esc(st.title) + '</h2></div></div>'
      + '<p class="vtour-x">' + esc(st.text) + '</p>'
      + '<div class="vtour-foot"><span class="vtour-dots" aria-hidden="true">' + dots + '</span>'
      + (state.i > 0 ? '<button class="vtour-btn vtour-btn--ghost" type="button" data-tour="back">Atrás</button>' : '')
      + '<button class="vtour-btn vtour-btn--go" type="button" data-tour="next">'
      + (last ? "¡Entendido!" : "Siguiente") + '</button></div>';

    /* mide DESPUÉS de escribir (la altura de la ficha cambia con el texto) */
    place();
    var go = state.card.querySelector('[data-tour="next"]');
    if (go) go.focus();
    if (state.live) state.live.textContent = st.title + ". " + st.text;
  }

  /* lleva el objetivo a la vista y espera a que el scroll pare: si medimos
     antes, el foco de luz se dibuja donde el elemento ESTABA.
     La espera corre con requestAnimationFrame, que el navegador CONGELA en
     una pestaña de fondo; sin red de seguridad, un paseo que se quede en
     segundo plano no volvería a pintar nunca. Por eso el bucle compite con
     un setTimeout (los temporizadores sí siguen corriendo) y `done` está
     blindado para ejecutarse una sola vez. */
  function scrollTo(el, done) {
    var called = false;
    function once() {
      if (called) return; called = true;
      /* Si el scroll suave no llegó a su destino (pestaña de fondo, un gesto
         del usuario que lo interrumpe, scroll-behavior anulado), el objetivo
         sigue fuera de la pantalla y el foco de luz señalaría al vacío. Antes
         de pintar, corrige de golpe: un salto seco es mejor que apuntar a nada. */
      if (el) {
        var rr = el.getBoundingClientRect(), vh = window.innerHeight;
        var fits = rr.height <= vh - 24;                    /* si no cabe, no hay encuadre que lo arregle */
        var offscreen = rr.bottom < 0 || rr.top > vh;
        var clipped = fits && (rr.top < 0 || rr.bottom > vh);
        if (offscreen || clipped) {
          try { el.scrollIntoView({ block: "center", behavior: "auto" }); } catch (e) {
            try { el.scrollIntoView(); } catch (e2) {}
          }
        }
      }
      done();
    }
    if (!el) return once();
    var r = el.getBoundingClientRect();
    var margin = 120;
    if (r.top >= margin && r.bottom <= window.innerHeight - margin) return once();
    try {
      el.scrollIntoView({ block: "center", behavior: reduceMotion() ? "auto" : "smooth" });
    } catch (e) { try { el.scrollIntoView(); } catch (e2) {} }
    if (reduceMotion()) return once();
    setTimeout(once, 700);                       // red de seguridad: sin frames, seguimos
    var last = null, still = 0, tries = 0;
    (function wait() {
      if (called) return;
      var y = window.pageYOffset;
      if (y === last) { still++; } else { still = 0; last = y; }
      if (still >= 3 || ++tries > 40) return once();
      requestAnimationFrame(wait);
    })();
  }

  function show(i) {
    if (!state) return;
    state.i = Math.max(0, Math.min(state.steps.length - 1, i));
    var st = state.steps[state.i];
    st._el = resolve(st.el);
    if (st._el && !visible(st._el)) st._el = null;
    scrollTo(st._el, function () {
      if (!state) return;
      render();
      if (typeof st.onShow === "function") { try { st.onShow(st._el); } catch (e) {} }
    });
  }

  function next() {
    if (!state) return;
    if (state.i >= state.steps.length - 1) return end(true);
    show(state.i + 1);
  }
  function back() { if (state && state.i > 0) show(state.i - 1); }

  function end(completed) {
    if (!state) return;
    var s = state; state = null;
    if (s.key) markSeen(s.key);
    document.removeEventListener("keydown", s.onKey, true);
    window.removeEventListener("resize", s.onMove);
    window.removeEventListener("scroll", s.onMove, true);
    [s.block, s.hole, s.ring, s.card, s.live].forEach(function (n) {
      if (n && n.parentNode) n.parentNode.removeChild(n);
    });
    if (s.prevFocus && s.prevFocus.focus) { try { s.prevFocus.focus(); } catch (e) {} }
    if (typeof s.onEnd === "function") { try { s.onEnd(!!completed); } catch (e) {} }
  }

  function start(steps, opts) {
    opts = opts || {};
    if (state) end(false);
    if (!steps || !steps.length) return false;
    injectCSS();

    /* descarta los pasos cuyo objetivo no existe en esta pantalla; los pasos
       sin `el` (intro/cierre) siempre valen */
    var usable = steps.filter(function (s) {
      if (!s.el) return true;
      var el = resolve(s.el);
      return !!(el && visible(el));
    });
    if (!usable.length) return false;

    var block = document.createElement("div"); block.className = "vtour-block";
    var hole = document.createElement("div"); hole.className = "vtour-hole";
    var ring = document.createElement("div"); ring.className = "vtour-ring";
    var card = document.createElement("div");
    card.className = "vtour-card";
    card.setAttribute("role", "dialog");
    card.setAttribute("aria-modal", "true");
    card.setAttribute("aria-labelledby", "vtour-title");
    var live = document.createElement("div");
    live.setAttribute("role", "status");
    live.setAttribute("aria-live", "polite");
    live.style.cssText = "position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)";

    state = {
      steps: usable, i: 0, key: opts.key || "", onEnd: opts.onEnd,
      block: block, hole: hole, ring: ring, card: card, live: live,
      prevFocus: document.activeElement
    };

    state.onMove = function () { place(); };
    state.onKey = function (e) {
      if (!state) return;
      var k = e.key;
      if (k === "Escape") { e.preventDefault(); e.stopPropagation(); return end(false); }
      if (k === "ArrowRight") { e.preventDefault(); e.stopPropagation(); return next(); }
      if (k === "ArrowLeft") { e.preventDefault(); e.stopPropagation(); return back(); }
      if (k === "Tab") {
        /* foco atrapado en la ficha: fuera de ella no hay nada operable */
        var f = state.card.querySelectorAll("button");
        if (!f.length) return;
        var first = f[0], lastEl = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); lastEl.focus(); }
        else if (!e.shiftKey && document.activeElement === lastEl) { e.preventDefault(); first.focus(); }
        else if (state.card.contains(document.activeElement) === false) { e.preventDefault(); first.focus(); }
      }
    };

    card.addEventListener("click", function (e) {
      var b = e.target.closest ? e.target.closest("[data-tour]") : null;
      if (!b) return;
      var a = b.getAttribute("data-tour");
      if (a === "next") next();
      else if (a === "back") back();
      else if (a === "skip") end(false);
    });
    /* clic fuera = salir (gesto habitual); no avanza, para no saltarse pasos sin querer */
    block.addEventListener("click", function () { end(false); });

    document.body.appendChild(block);
    document.body.appendChild(hole);
    document.body.appendChild(ring);
    document.body.appendChild(card);
    document.body.appendChild(live);
    document.addEventListener("keydown", state.onKey, true);
    window.addEventListener("resize", state.onMove);
    window.addEventListener("scroll", state.onMove, true);

    show(opts.startAt || 0);
    return true;
  }

  return {
    start: start, end: end, seen: seen, markSeen: markSeen, reset: reset,
    active: function () { return !!state; }
  };
})();
