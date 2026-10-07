/*
 * vesper_contact.js — Contacto directo por WhatsApp en las páginas públicas.
 *
 * Pinta un botón flotante (abajo a la derecha) que abre un chat con la
 * academia. El número vive AQUÍ y en los pies de página escritos a mano;
 * si cambia, búscalo en todo el repo: 5535699899.
 *
 * En index.html la edición móvil (#m-app) ya trae su propio botón de
 * WhatsApp en la barra fija, así que ahí el flotante se esconde bajo la
 * misma puerta que usa vesper_mobile.css.
 */
(function () {
  "use strict";
  var NUMBER = "525535699899";             // +52 55 3569 9899
  var MSG = "Hola, vengo de vesperacademy.com y quiero información sobre los cursos de inglés.";
  var MQ = "(pointer: coarse) and (max-width: 820px)";

  window.VESPER_WA = {
    number: NUMBER,
    display: "55 3569 9899",
    url: function (text) {
      return "https://wa.me/" + NUMBER + "?text=" + encodeURIComponent(text || MSG);
    }
  };

  function mount() {
    if (document.querySelector(".v-wa-float")) return;
    var css =
      ".v-wa-float{position:fixed;right:20px;bottom:20px;z-index:900;display:flex;align-items:center;gap:10px;" +
      "padding:12px 18px 12px 14px;border-radius:999px;background:#25D366;color:#fff !important;" +
      "font:600 15px/1.1 system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;text-decoration:none !important;" +
      "box-shadow:0 6px 20px rgba(0,0,0,.22);transition:transform .15s ease,box-shadow .15s ease}" +
      ".v-wa-float:hover{transform:translateY(-2px);box-shadow:0 10px 26px rgba(0,0,0,.28)}" +
      ".v-wa-float:focus-visible{outline:3px solid #fff;outline-offset:2px}" +
      ".v-wa-float svg{width:24px;height:24px;flex:none;fill:currentColor}" +
      "@media (max-width:600px){.v-wa-float{padding:14px;right:16px;bottom:16px}.v-wa-float span{display:none}}" +
      "@media print{.v-wa-float{display:none !important}}";
    if (document.getElementById("m-app")) css += "@media " + MQ + "{.v-wa-float{display:none !important}}";
    var st = document.createElement("style");
    st.textContent = css;
    document.head.appendChild(st);

    var a = document.createElement("a");
    a.className = "v-wa-float";
    a.href = window.VESPER_WA.url();
    a.target = "_blank";
    a.rel = "noopener";
    a.setAttribute("aria-label", "Escríbenos por WhatsApp al 55 3569 9899");
    a.innerHTML =
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2m0 18.15a8.2 8.2 0 0 1-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23a8.2 8.2 0 0 1 8.24 8.24c0 4.54-3.7 8.23-8.24 8.23m4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.54.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.16 0-.43.06-.65.31-.22.25-.85.83-.85 2.03s.87 2.35.99 2.51c.12.17 1.71 2.61 4.15 3.66.58.25 1.03.4 1.39.51.58.19 1.11.16 1.53.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.17-.47-.29"/></svg>' +
      "<span>WhatsApp</span>";
    a.addEventListener("click", function () {
      try { if (window.VA) window.VA.track("whatsapp_click", { page: location.pathname }); } catch (e) {}
    });
    document.body.appendChild(a);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount);
  else mount();
})();
