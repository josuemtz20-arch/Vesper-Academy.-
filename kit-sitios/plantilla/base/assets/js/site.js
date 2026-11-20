/* Comportamiento común: menú móvil, enlace activo, animación de entrada y
   registro del service worker (offline). Sin dependencias. */
(function () {
  "use strict";
  document.documentElement.classList.add("js");

  var toggle = document.querySelector(".nav-toggle");
  var links = document.getElementById("navlinks");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  var actual = document.body.getAttribute("data-pagina");
  document.querySelectorAll(".nav-links a").forEach(function (a) {
    if (a.getAttribute("href") === actual) a.setAttribute("aria-current", "page");
  });

  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -10% 0px" });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("in"); });
  }

  /* En localhost no se registra: así los cambios se ven al recargar. */
  if ("serviceWorker" in navigator && !/^(localhost|127\.0\.0\.1)$/.test(location.hostname)) {
    navigator.serviceWorker.register("sw.js").catch(function () {});
  }
})();
