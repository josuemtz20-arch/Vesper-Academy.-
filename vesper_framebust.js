/* Anti-clickjacking de las páginas de administración, profesores y material
   de clase (access_admin, portal_*, manual, libro). GitHub Pages no deja
   mandar X-Frame-Options ni frame-ancestors (en un <meta> CSP se ignora), así
   que se hace aquí: si otra página nos mete en un <iframe>, se intenta salir
   al nivel superior y, como los navegadores bloquean esa salida sin un toque
   del usuario, además se oculta todo: dentro del marco no hay nada que
   pulsar. Va como archivo (no en línea) para que no dependa de
   'unsafe-inline' en la CSP. Se carga SIN defer, justo después de la CSP. */
(function () {
  "use strict";
  if (window.top === window.self) return;
  document.documentElement.style.display = "none";
  try { window.top.location = window.self.location.href; } catch (e) { /* bloqueado: queda oculta */ }
})();
