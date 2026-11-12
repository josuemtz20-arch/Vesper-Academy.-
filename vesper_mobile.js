/* ============================================================
 * vesper_mobile.js — Interacciones de la edición móvil (#m-app).
 *
 * Solo se inicializa cuando la misma puerta de vesper_mobile.css está
 * abierta: (pointer: coarse) and (max-width: 820px). En un escritorio
 * con ratón este archivo no engancha un solo evento, no calcula nada y
 * no toca el DOM — la portada de siempre queda exactamente igual.
 *
 * Portada D «La mezcla» (2026-11-12): menú «Más», metas que traen su
 * curso, la ruta que se enciende al bajar, la pestaña de la sección que
 * se lee y la regla de un solo botón dorado por pantalla (secciones 1,
 * 8 y 9). Las secciones 2 a 7 atienden piezas de la edición anterior
 * (rail de niveles, barajas, FAQ, formulario, barra fija): si no están
 * en el marcado no enganchan nada.
 * Sin dependencias; respeta prefers-reduced-motion vía CSS.
 * ============================================================ */
(function () {
  "use strict";

  var MQ = "(pointer: coarse) and (max-width: 820px)";
  var app = document.getElementById("m-app");
  if (!app || !window.matchMedia) return;

  var mq = window.matchMedia(MQ);
  var started = false;

  function boot() {
    if (started || !mq.matches) return;
    started = true;
    init();
  }
  /* Si el aparato entra en la puerta más tarde (girar la pantalla), se
     inicializa entonces. Nunca se desmonta: una vez montado no estorba. */
  if (mq.addEventListener) mq.addEventListener("change", boot);
  else if (mq.addListener) mq.addListener(boot);
  boot();

  function init() {
    var on = function (el, ev, fn, opt) { if (el) el.addEventListener(ev, fn, opt); };
    var all = function (sel, root) { return Array.prototype.slice.call((root || app).querySelectorAll(sel)); };

    /* ---------- 1. Menú (hoja) ---------- */
    var sheet = app.querySelector(".m-sheet");
    var burger = app.querySelector(".m-burger");
    var conEtiqueta = !!burger && burger.hasAttribute("aria-label");
    var setSheet = function (open) {
      if (!sheet || !burger) return;
      sheet.classList.toggle("is-open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      /* solo si el botón nació sin texto visible (icono suelto); la pestaña
         «Más» se llama por su texto y aria-expanded dice el estado */
      if (conEtiqueta) burger.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
      /* el fondo no debe desplazarse por debajo del menú abierto */
      document.body.classList.toggle("m-locked", open);
    };
    on(burger, "click", function () { setSheet(!sheet.classList.contains("is-open")); });
    all(".m-sheet a").forEach(function (a) { on(a, "click", function () { setSheet(false); }); });
    on(sheet, "click", function (e) { if (e.target === sheet) setSheet(false); });
    on(document, "keydown", function (e) {
      if (e.key === "Escape" && sheet && sheet.classList.contains("is-open")) { setSheet(false); burger.focus(); }
    });

    /* ---------- 2. Rail de niveles ---------- */
    var levels = all(".m-lvl");
    levels.forEach(function (btn) {
      on(btn, "click", function () {
        var open = btn.classList.contains("is-open");
        levels.forEach(function (b) { b.classList.remove("is-open"); b.setAttribute("aria-expanded", "false"); });
        if (!open) { btn.classList.add("is-open"); btn.setAttribute("aria-expanded", "true"); }
      });
    });

    /* ---------- 3. Barajas (cursos y planes) ---------- */
    /* Carrusel nativo con scroll-snap (vesper_mobile.css). Aquí solo se
       decide cuál es la carta del frente —la más cercana al margen
       izquierdo— y se sincroniza el panel de detalle, los puntos, el
       contador y el botón que sigue a la carta. Deslizar es del navegador. */
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    function padStart(deck) { return parseFloat(getComputedStyle(deck).paddingLeft) || 0; }
    function nearest(deck) {
      var x = deck.scrollLeft + padStart(deck), best = 0, d = Infinity;
      all(".m-card", deck).forEach(function (c, i) {
        var k = Math.abs(c.offsetLeft - x);
        if (k < d) { d = k; best = i; }
      });
      return best;
    }
    function mark(deck, idx) {
      var cards = all(".m-card", deck);
      if (!cards.length) return;
      cards.forEach(function (card, i) {
        card.classList.toggle("is-active", i === idx);
        card.setAttribute("aria-current", i === idx ? "true" : "false");
      });
      /* panel de detalle asociado (descripción / ventajas / contador / puntos) */
      var host = deck.parentNode;
      all("[data-detail]", host).forEach(function (el) {
        el.hidden = Number(el.dataset.detail) !== idx;
      });
      all(".m-dots button", host).forEach(function (b, i) { b.classList.toggle("is-on", i === idx); });
      var pad = function (n) { return (n < 10 ? "0" : "") + n; };
      var count = host.querySelector(".m-count");
      if (count) count.textContent = pad(idx + 1) + " / " + pad(cards.length);
      /* el botón de la sección sigue a la carta elegida (planes.html#grupal, …) */
      var follow = host.querySelector("[data-follow]");
      if (follow && cards[idx].dataset.href) follow.setAttribute("href", cards[idx].dataset.href);
      deck.dataset.idx = String(idx);
    }
    function goTo(deck, idx, instant) {
      var card = all(".m-card", deck)[idx];
      if (!card) return;
      var left = card.offsetLeft - padStart(deck);
      if (deck.scrollTo) deck.scrollTo({ left: left, behavior: (instant || reduce.matches) ? "auto" : "smooth" });
      else deck.scrollLeft = left;
      mark(deck, idx);
    }

    var decks = all(".m-deck");
    decks.forEach(function (deck) {
      var cards = all(".m-card", deck);
      cards.forEach(function (card, i) {
        on(card, "click", function () {
          /* primer toque: traer la carta al frente. Segundo toque sobre la
             carta que ya está al frente: entrar. Así nadie navega sin querer. */
          if (Number(deck.dataset.idx) === i && card.dataset.href) { window.location.href = card.dataset.href; return; }
          goTo(deck, i);
        });
      });
      all(".m-dots button", deck.parentNode).forEach(function (b, i) {
        on(b, "click", function () { goTo(deck, i); });
      });
      /* al deslizar, cuando el scroll se asienta se marca la carta más cercana */
      var st;
      on(deck, "scroll", function () {
        clearTimeout(st);
        st = setTimeout(function () {
          var n = nearest(deck);
          if (n !== Number(deck.dataset.idx)) mark(deck, n);
        }, 90);
      }, { passive: true });
      goTo(deck, Number(deck.dataset.start || 0), true);
    });

    /* al girar la pantalla la carta activa vuelve a su sitio */
    var rt;
    on(window, "resize", function () {
      clearTimeout(rt);
      rt = setTimeout(function () {
        decks.forEach(function (d) { goTo(d, Number(d.dataset.idx || 0), true); });
      }, 150);
    }, { passive: true });

    /* ---------- 4. FAQ ---------- */
    all(".m-faq button").forEach(function (btn) {
      on(btn, "click", function () {
        var item = btn.parentNode, open = item.classList.toggle("is-open");
        btn.setAttribute("aria-expanded", open ? "true" : "false");
      });
    });

    /* ---------- 5. Formulario plegable ---------- */
    var disclose = app.querySelector(".m-disclose");
    var form = app.querySelector(".m-form");
    on(disclose, "click", function () {
      var open = form.classList.toggle("is-open");
      disclose.setAttribute("aria-expanded", open ? "true" : "false");
      if (open) { var first = form.querySelector("input"); if (first) first.focus(); }
    });

    /* Envío por AJAX a formsubmit.co (igual que la portada de escritorio) */
    if (form && form.tagName === "FORM") {
      on(form, "submit", function (e) {
        e.preventDefault();
        var btn = form.querySelector("button"), msg = app.querySelector(".m-formmsg");
        btn.disabled = true; btn.textContent = "Enviando…";
        fetch(form.action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } })
          .then(function (r) {
            if (!r.ok) throw new Error("http " + r.status);
            form.classList.remove("is-open");
            if (msg) msg.textContent = "¡Gracias! Un asesor te contactará en menos de 24 horas.";
          })
          .catch(function () {
            btn.disabled = false; btn.textContent = "Quiero que me escriban";
            if (msg) msg.textContent = "No pudimos enviarlo. Escríbenos a contacto@vesperacademy.com.";
          });
      });
    }

    /* ---------- 6. Año del pie ---------- */
    all(".m-year").forEach(function (el) { el.textContent = new Date().getFullYear(); });

    /* ---------- 6b. WhatsApp: no enseñar un enlace muerto ----------
       Mientras el href siga con el número de relleno, el botón se quita y
       el CTA ocupa la barra entera. En cuanto se ponga el número real
       aparece solo, sin tocar nada más. */
    var wa = app.querySelector(".m-dock__wa");
    if (wa && /\/520{6,}$/.test(wa.getAttribute("href") || "")) wa.remove();

    /* ---------- 7. Barra de acción fija ---------- */
    var dock = app.querySelector(".m-dock");
    if (dock) {
      var ticking = false, shown = false;
      var check = function () {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(function () {
          var s = window.scrollY > 260;
          if (s !== shown) { shown = s; dock.classList.toggle("is-on", s); }
          ticking = false;
        });
      };
      window.addEventListener("scroll", check, { passive: true });
      check();
    }

    /* ---------- 8. Portada D · Metas: tocar una trae su curso ---------- */
    var metas = all(".m-metas button"), cursos = all(".m-resp .m-curso");
    metas.forEach(function (btn, i) {
      on(btn, "click", function () {
        metas.forEach(function (b, j) {
          b.classList.toggle("is-on", j === i);
          b.setAttribute("aria-pressed", j === i ? "true" : "false");
        });
        cursos.forEach(function (c, j) { c.hidden = j !== i; });
        /* qué meta eligen los visitantes: sirve para saber qué curso jala más */
        try { if (window.VA && VA.track) VA.track("meta_curso", { meta: btn.getAttribute("data-meta") || String(i) }); } catch (e) {}
      });
    });

    /* ---------- 9. Portada D · Ruta, pestañas y un solo botón dorado ----------
       Una sola medición por cuadro (rAF) para las tres cosas:
       · la línea de la ruta se enciende hasta donde va la lectura (--p) y
         termina en la estrella de llegada (--fin); cada parada alcanzada
         prende su nodo;
       · la pestaña de la sección que se está leyendo queda marcada;
       · el botón del examen de las pestañas baja a contorno mientras haya en
         pantalla un botón dorado del contenido ([data-cta]).
       Con scroll y no con IntersectionObserver: es un cálculo barato y así
       se comporta igual en renderizadores sin composición. */
    var ruta = app.querySelector(".m-paradas");
    var barra = app.querySelector(".m-tabs");
    var tabs = all(".m-tabs [data-tab]");
    var tabCta = app.querySelector(".m-tabs__cta");
    var ctas = all("[data-cta]");
    if (ruta || barra) {
      var pend = false, finPrev = -1;
      var medir = function () {
        pend = false;
        var vh = window.innerHeight, corte = vh * 0.58;
        if (ruta) {
          var fin = ruta.lastElementChild ? ruta.lastElementChild.offsetHeight - 12 : 0;
          if (fin !== finPrev) { finPrev = fin; ruta.style.setProperty("--fin", fin + "px"); }
          ruta.style.setProperty("--p", Math.max(0, Math.round(corte - ruta.getBoundingClientRect().top - 14)) + "px");
          all(".m-parada", ruta).forEach(function (li) {
            li.classList.toggle("is-on", li.getBoundingClientRect().top < corte);
          });
        }
        var aqui = "";
        tabs.forEach(function (a) {
          var sec = document.getElementById(a.getAttribute("data-tab"));
          if (!sec) return;
          var q = sec.getBoundingClientRect();
          if (q.top < vh * 0.5 && q.bottom > vh * 0.3) aqui = a.getAttribute("data-tab");
        });
        tabs.forEach(function (a) {
          var es = a.getAttribute("data-tab") === aqui;
          a.classList.toggle("is-aqui", es);
          if (es) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
        });
        if (tabCta) {
          var bajo = barra ? barra.offsetHeight : 0;
          var hay = ctas.some(function (c) {
            var q = c.getBoundingClientRect();
            return q.height > 0 && q.bottom > 8 && q.top < vh - bajo - 8;
          });
          tabCta.classList.toggle("is-off", hay);
        }
      };
      var pedir = function () { if (!pend) { pend = true; requestAnimationFrame(medir); } };
      window.addEventListener("scroll", pedir, { passive: true });
      window.addEventListener("resize", pedir, { passive: true });
      window.addEventListener("load", medir);
      medir();
    }
  }
})();
