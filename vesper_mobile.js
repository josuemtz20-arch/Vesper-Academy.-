/* ============================================================
 * vesper_mobile.js — Interacciones de la edición móvil (#m-app).
 *
 * Solo se inicializa cuando la misma puerta de vesper_mobile.css está
 * abierta: (pointer: coarse) and (max-width: 820px). En un escritorio
 * con ratón este archivo no engancha un solo evento, no calcula nada y
 * no toca el DOM — la portada de siempre queda exactamente igual.
 *
 * Menú, rail de niveles, barajas (cursos/planes: toque, puntos y
 * deslizamiento), FAQ, formulario plegable, barra fija y año del pie.
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
    var setSheet = function (open) {
      if (!sheet || !burger) return;
      sheet.classList.toggle("is-open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      burger.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
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
    /* Geometría: la carta activa al frente; las vecinas desplazadas,
       escaladas y giradas. Un solo cálculo para cualquier baraja. */
    function layout(deck, idx) {
      var cards = all(".m-card", deck);
      if (!cards.length) return;
      var cw = cards[0].offsetWidth || 196;
      var plans = deck.dataset.kind === "plans";
      /* margen izquierdo: 16px en un teléfono; centrado si la pantalla es ancha */
      var gutter = Math.max(16, Math.round((deck.clientWidth - 560) / 2) + 16);
      var strip = Math.max(46, Math.min(56, Math.round((deck.clientWidth - gutter * 2 - cw) / (cards.length - 1))));
      var cur = gutter;
      cards.forEach(function (card, i) {
        var a = Math.abs(i - idx), left = cur;
        cur += (i === idx ? cw : strip);
        card.style.left = left + "px";
        card.style.transform = a === 0 ? "translateY(-6px) scale(1)"
          : "scale(" + (plans ? ".86" : ".82") + ") rotate(" + (i < idx ? -3 : 3) + "deg)";
        card.style.zIndex = a === 0 ? "60" : String(10 + i);
        card.style.opacity = a === 0 ? "1"
          : String(Math.max(plans ? 0.72 : 0.66, 1 - a * (plans ? 0.08 : 0.1)));
        card.classList.toggle("is-active", a === 0);
        card.setAttribute("aria-current", a === 0 ? "true" : "false");
        card.tabIndex = 0;
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

    var decks = all(".m-deck");
    decks.forEach(function (deck) {
      var cards = all(".m-card", deck);
      cards.forEach(function (card, i) {
        on(card, "click", function () {
          /* primer toque: traer la carta al frente. Segundo toque sobre la
             carta que ya está al frente: entrar. Así nadie navega sin querer. */
          if (Number(deck.dataset.idx) === i && card.dataset.href) { window.location.href = card.dataset.href; return; }
          layout(deck, i);
        });
      });
      all(".m-dots button", deck.parentNode).forEach(function (b, i) {
        on(b, "click", function () { layout(deck, i); });
      });
      /* deslizar con el dedo también mueve la baraja */
      var x0 = null;
      on(deck, "touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
      on(deck, "touchend", function (e) {
        if (x0 === null) return;
        var dx = e.changedTouches[0].clientX - x0, i = Number(deck.dataset.idx || 0);
        if (Math.abs(dx) > 40) layout(deck, Math.min(cards.length - 1, Math.max(0, i + (dx < 0 ? 1 : -1))));
        x0 = null;
      });
      layout(deck, Number(deck.dataset.start || 0));
    });

    /* al girar la pantalla la geometría se recalcula */
    var rt;
    on(window, "resize", function () {
      clearTimeout(rt);
      rt = setTimeout(function () {
        decks.forEach(function (d) { layout(d, Number(d.dataset.idx || 0)); });
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
            btn.disabled = false; btn.textContent = "Quiero que me contacten";
            if (msg) msg.textContent = "No pudimos enviarlo. Escríbenos a contacto@vesperacademy.com.";
          });
      });
    }

    /* ---------- 6. Año del pie ---------- */
    all(".m-year").forEach(function (el) { el.textContent = new Date().getFullYear(); });

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
  }
})();
