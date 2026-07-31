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

    /* ---------- 3. Rieles de cartas (cursos y planes) ----------
       Las cartas ya no se solapan ni se posicionan a mano: van una al lado
       de la otra y el arrastre lo hace el navegador. Aquí solo se escucha
       ese arrastre para saber cuál quedó centrada y sincronizar el panel
       de detalle, los puntos, el contador y el enlace de la sección. */

    var BORDE = 20; /* mismo valor que el scroll-padding-left del riel */

    /* posición del borde izquierdo de una carta dentro del riel, sin depender
       de offsetParent (el riel ya no es position:relative) */
    function izquierda(deck, card) {
      return card.getBoundingClientRect().left - deck.getBoundingClientRect().left + deck.scrollLeft;
    }

    function cartaElegida(deck, cards) {
      /* En el tope derecho la última carta ya no puede llegar al borde
         izquierdo, así que por cercanía saldría siempre la penúltima y el
         contador nunca marcaría la última. Al final del riel, la última. */
      if (deck.scrollLeft >= deck.scrollWidth - deck.clientWidth - 4) return cards.length - 1;
      var ref = deck.scrollLeft + BORDE, best = 0, bd = Infinity;
      cards.forEach(function (c, i) {
        var d = Math.abs(izquierda(deck, c) - ref);
        if (d < bd) { bd = d; best = i; }
      });
      return best;
    }

    /* Pinta el estado de un índice dado. Separado de la detección para que un
       clic en un punto surta efecto aunque el desplazamiento suave aún no haya
       terminado (o el navegador no lo anime). */
    function aplicar(deck, cards, idx, force) {
      if (!force && String(idx) === deck.dataset.idx) return;
      deck.dataset.idx = String(idx);
      var host = deck.parentNode;
      cards.forEach(function (c, i) {
        c.classList.toggle("is-active", i === idx);
        c.setAttribute("aria-current", i === idx ? "true" : "false");
      });
      all("[data-detail]", host).forEach(function (el) { el.hidden = Number(el.dataset.detail) !== idx; });
      all(".m-dots button", host).forEach(function (b, i) {
        b.classList.toggle("is-on", i === idx);
        b.setAttribute("aria-current", i === idx ? "true" : "false");
      });
      var pad = function (n) { return (n < 10 ? "0" : "") + n; };
      var count = host.querySelector(".m-count");
      if (count) count.textContent = pad(idx + 1) + " / " + pad(cards.length);
      /* el botón de la sección sigue a la carta centrada (planes.html#grupal, …) */
      var follow = host.querySelector("[data-follow]");
      if (follow && cards[idx].dataset.href) follow.setAttribute("href", cards[idx].dataset.href);
    }

    function irA(deck, cards, i, suave) {
      var card = cards[i];
      if (!card) return;
      var x = izquierda(deck, card) - BORDE;
      x = Math.max(0, Math.min(x, deck.scrollWidth - deck.clientWidth));
      if (suave && deck.scrollTo) deck.scrollTo({ left: x, behavior: "smooth" });
      else deck.scrollLeft = x;
    }

    all(".m-deck").forEach(function (deck) {
      var cards = all(".m-card", deck);
      if (!cards.length) return;

      /* Estrangulado por reloj, no por requestAnimationFrame: rAF no es fiable
         cuando la pestaña no compone cuadros y el resalte se quedaba clavado.
         Esto refresca cada 60 ms como mucho y SIEMPRE remata al final. */
      var ultimo = 0, temp = null;
      var refrescar = function () {
        ultimo = Date.now(); temp = null;
        aplicar(deck, cards, cartaElegida(deck, cards));
      };
      on(deck, "scroll", function () {
        clearTimeout(temp);
        if (Date.now() - ultimo > 60) refrescar();
        else temp = setTimeout(refrescar, 60);
      }, { passive: true });

      all(".m-dots button", deck.parentNode).forEach(function (b, i) {
        on(b, "click", function () { irA(deck, cards, i, true); aplicar(deck, cards, i); });
      });
      /* al girar la pantalla, recolocar la que estuviera elegida */
      var rt;
      on(window, "resize", function () {
        clearTimeout(rt);
        rt = setTimeout(function () { irA(deck, cards, Number(deck.dataset.idx || 0), false); }, 150);
      }, { passive: true });
      /* arranque: la carta que marque data-start (el plan popular, p.ej.) */
      var ini = Number(deck.dataset.start || 0);
      irA(deck, cards, ini, false);
      aplicar(deck, cards, ini, true);
    });

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
  }
})();
