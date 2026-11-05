/* ============================================================
 * vesper_app_mode.js — "Modo app": la misma web, sin admin ni ventas.
 * ------------------------------------------------------------
 * Vesper se publica en Google Play como TWA (com.vesperacademy.lecciones)
 * y más adelante en iOS dentro de un WKWebView. La app abre el dominio
 * entero, así que esta es la ÚNICA función que decide "esto corre como
 * app" y lo que cambia en ese modo:
 *
 *   - index.html y las landings de marketing  -> se va a leccion.html
 *   - planes.html y las páginas de admin/escuela -> "Disponible solo en la web"
 *   - links a esas páginas y a WhatsApp, y todo lo marcado .web-only -> ocultos
 *
 * Cómo se detecta (basta una):
 *   1. display-mode standalone / fullscreen / minimal-ui (PWA instalada, TWA)
 *   2. navigator.standalone (iPhone, "Agregar a inicio")
 *   3. document.referrer = android-app://com.vesperacademy.lecciones (TWA)
 *   4. "VesperApp/" en el user agent  <- la envoltura de iOS debe ponerlo
 *      (WKWebViewConfiguration.applicationNameForUserAgent = "VesperApp/1.0")
 *   5. ?vesper_app=1 en la URL de arranque (respaldo para cualquier envoltura)
 * Al detectarlo se recuerda en sessionStorage: el referrer de la TWA solo
 * viene en la primera página. sessionStorage es por pestaña, así que no se
 * contagia a Chrome normal aunque la TWA comparta su almacenamiento.
 * ?vesper_app=0 borra ese recuerdo (solo para pruebas).
 *
 * Va como PRIMER <script> del <head>: así una página bloqueada se detiene
 * (window.stop) antes de que corra su puerta de login o sus lecturas.
 * OJO: esto decide solo qué PANTALLA se ve. Los datos los siguen
 * protegiendo las reglas de Firestore.
 * ============================================================ */
(function () {
  "use strict";

  var ANDROID_REFERRER = "android-app://com.vesperacademy.lecciones";
  var FLAG = "vesper_app";
  var HOME = "leccion.html";

  /* Páginas que la app nunca muestra. */
  var WEB_ONLY = {
    "planes.html": "plans",
    "portal_escuela.html": "admin",
    "access_admin.html": "admin",
    "portal_calendario.html": "admin"
  };
  /* Marketing: en la app no existe; se cae al mapa de lecciones. */
  var TO_HOME = {
    "": 1, "index.html": 1,
    "curso-ingles-general.html": 1, "curso-club-conversacion.html": 1,
    "curso-ingles-corporativo.html": 1, "curso-certificacion.html": 1,
    "examen-ingles-gratis.html": 1, "ingles-para-call-center.html": 1
  };

  function mq(q) {
    try { return !!(window.matchMedia && window.matchMedia(q).matches); } catch (e) { return false; }
  }

  function detect() {
    var qs = location.search || "";
    if (/[?&]vesper_app=0(&|$)/.test(qs)) { try { sessionStorage.removeItem(FLAG); } catch (e) {} }
    var on = /[?&]vesper_app=1(&|$)/.test(qs) ||
      mq("(display-mode: standalone)") || mq("(display-mode: fullscreen)") ||
      mq("(display-mode: minimal-ui)") || mq("(display-mode: window-controls-overlay)") ||
      window.navigator.standalone === true ||
      String(document.referrer || "").indexOf(ANDROID_REFERRER) === 0 ||
      /\bVesperApp\//.test(navigator.userAgent || "");
    if (!on) { try { on = sessionStorage.getItem(FLAG) === "1"; } catch (e) {} }
    if (on) { try { sessionStorage.setItem(FLAG, "1"); } catch (e) {} }
    return on;
  }

  function fileOf(pathname) {
    return decodeURIComponent(String(pathname || "").split("/").pop() || "").toLowerCase();
  }

  var isApp = detect();
  var page = fileOf(location.pathname);
  if (page === "" && location.pathname !== "/") page = "(carpeta)";   /* whiteboard/ no es la portada */

  /* Qué hacer con un link a `href`: "home" (reescribir a leccion.html),
     "hide" (página bloqueada o WhatsApp) o null (dejarlo). */
  function linkAction(href) {
    if (!href) return null;
    if (/^(mailto:|tel:|javascript:|#)/i.test(href)) return null;
    var u;
    try { u = new URL(href, location.href); } catch (e) { return null; }
    if (/(^|\.)wa\.me$|whatsapp\.com$/i.test(u.hostname)) return "hide";
    if (u.origin !== location.origin) return null;
    var f = fileOf(u.pathname);
    if (WEB_ONLY[f]) return "hide";
    if (f === "") return u.pathname === "/" ? "home" : null;   /* "/" sí, "whiteboard/" no */
    return TO_HOME[f] ? "home" : null;
  }

  window.VesperApp = {
    isApp: isApp,
    page: page,
    /* true si en la app este link no debe existir */
    isBlockedHref: function (href) { return isApp && linkAction(href) === "hide"; }
  };

  if (!isApp) return;

  var root = document.documentElement;
  root.classList.add("vesper-app");

  /* ---------- páginas que la app no muestra ---------- */
  function stopPage() { try { window.stop(); } catch (e) {} }

  if (TO_HOME[page]) {
    stopPage();
    location.replace(HOME);
    return;
  }

  if (WEB_ONLY[page]) {
    root.classList.add("vesper-app-blocked");
    stopPage();
    var kind = WEB_ONLY[page];
    var title = "Disponible solo en la web";
    var text = kind === "plans"
      ? "Los planes y precios se consultan en vesperacademy.com desde el navegador."
      : "Esta sección es para la dirección de la escuela. Ábrela desde una computadora en vesperacademy.com.";
    var html =
      '<main style="min-height:100vh;min-height:100dvh;display:flex;align-items:center;justify-content:center;' +
      'padding:24px 16px;box-sizing:border-box;background:#15152b;color:#f5efe2;' +
      'font:16px/1.5 Inter,system-ui,-apple-system,Segoe UI,Roboto,sans-serif;text-align:center">' +
      '<div style="max-width:360px">' +
      '<img src="assets/images/va_isotype.svg" alt="" width="64" height="64" style="display:block;margin:0 auto 18px;opacity:.9">' +
      '<h1 style="font-size:1.35rem;margin:0 0 10px;color:#d9bd84">' + title + "</h1>" +
      '<p style="margin:0 0 22px;color:#d8d2c4">' + text + "</p>" +
      '<a href="' + HOME + '" style="display:inline-flex;align-items:center;justify-content:center;min-height:48px;' +
      'padding:0 22px;border-radius:999px;background:#d9bd84;color:#15152b;font-weight:700;text-decoration:none">' +
      "Volver a mis lecciones</a></div></main>";
    var paint = function () {
      var b = document.body;
      if (!b) { b = document.createElement("body"); root.appendChild(b); }
      if (b.getAttribute("data-vesper-web-only") === "1") return;
      b.setAttribute("data-vesper-web-only", "1");
      b.style.margin = "0";
      b.innerHTML = html;
    };
    paint();
    document.addEventListener("DOMContentLoaded", function () {
      var b = document.body;
      if (b && b.getAttribute("data-vesper-web-only") !== "1") paint();
    });
    return;
  }

  /* ---------- el resto de la app: ocultar y reescribir links ---------- */
  var css =
    "html.vesper-app .web-only," +
    'html.vesper-app a[href*="planes.html"],' +
    'html.vesper-app a[href*="portal_escuela.html"],' +
    'html.vesper-app a[href*="access_admin.html"],' +
    'html.vesper-app a[href*="portal_calendario.html"],' +
    'html.vesper-app a[href*="wa.me/"],' +
    'html.vesper-app a[href*="whatsapp.com"]{display:none!important}';
  var st = document.createElement("style");
  st.id = "vesper-app-mode-css";
  st.textContent = css;
  (document.head || root).appendChild(st);

  function fix(scope) {
    if (!scope || !scope.querySelectorAll) return;
    var list = scope.querySelectorAll("a[href]");
    for (var i = 0; i < list.length; i++) fixOne(list[i]);
    if (scope.tagName === "A" && scope.hasAttribute("href")) fixOne(scope);
  }
  function fixOne(a) {
    var act = linkAction(a.getAttribute("href"));
    if (act === "home") a.setAttribute("href", HOME);
    else if (act === "hide") a.classList.add("web-only");
  }

  /* Red de seguridad: un link que se haya escapado (pintado tarde, href
     cambiado por código) tampoco navega. */
  document.addEventListener("click", function (ev) {
    var t = ev.target;
    var a = t && t.closest ? t.closest("a[href]") : null;
    if (!a) return;
    var act = linkAction(a.getAttribute("href"));
    if (act === "home") { ev.preventDefault(); location.href = HOME; }
    else if (act === "hide") { ev.preventDefault(); }
  }, true);

  function start() {
    fix(document);
    if (!window.MutationObserver) return;
    new MutationObserver(function (recs) {
      for (var i = 0; i < recs.length; i++) {
        var r = recs[i];
        if (r.type === "attributes") { if (r.target.tagName === "A") fixOne(r.target); continue; }
        for (var j = 0; j < r.addedNodes.length; j++) {
          if (r.addedNodes[j].nodeType === 1) fix(r.addedNodes[j]);
        }
      }
    }).observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ["href"] });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
