/* ============================================================
   VESPER ACADEMY — Barra de navegación del alumno (persistente)
   ------------------------------------------------------------
   Una sola "columna vertebral" de navegación para el portal del
   alumno. Reemplaza los headers "atrás" ad-hoc de cada página por
   una barra de pestañas inferior consistente:

       Inicio · Aprender · Audio · Boleta · Perfil

   Cómo se usa: añade  <script src="vesper_nav.js"></script>  a la
   página del alumno. El script se auto-inyecta al final del <body>,
   marca la pestaña activa según el archivo actual y no toca nada más.

   - Colores por tokens con respaldo (var(--navy)/var(--gold)), así
     se ve bien también con los temas oscuros de leccion.html.
   - Móvil: barra inferior completa. Escritorio: píldora flotante.
   - Reserva espacio al final del <body> y sube los elementos
     flotantes conocidos (FAB de chat, chip de "Cerrar sesión") por
     encima de la barra para que no se solapen.
   - Defensivo: si por error se incluye en una página que no es del
     alumno, no hace nada.
   ============================================================ */
(function () {
  "use strict";

  /* Destinos de la barra. href = archivo; match = archivos que
     marcan esta pestaña como activa. */
  var TABS = [
    { id: "inicio",   label: "Inicio",   href: "materiales.html",
      match: ["materiales.html", "libro.html"],
      icon: '<path d="M3 11l9-8 9 8"/><path d="M5 10v10h5v-6h4v6h5V10"/>' },
    { id: "aprender", label: "Aprender", href: "leccion.html",
      match: ["leccion.html", "chat.html", "liga.html", "lesson.html"],
      icon: '<path d="M22 10L12 5 2 10l10 5 10-5z"/><path d="M6 12v5c0 1 2.7 3 6 3s6-2 6-3v-5"/>' },
    { id: "audio",    label: "Audio",    href: "audio_library.html",
      match: ["audio_library.html"],
      icon: '<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="2.5" y="13.5" width="4" height="6.5" rx="1.3"/><rect x="17.5" y="13.5" width="4" height="6.5" rx="1.3"/>' },
    { id: "boleta",   label: "Boleta",   href: "mi_boleta.html",
      match: ["mi_boleta.html"],
      icon: '<rect x="5" y="3.5" width="14" height="17" rx="2.2"/><path d="M9 3.5V6h6V3.5"/><path d="M8.5 11h7M8.5 15h4.5"/>' },
    { id: "perfil",   label: "Perfil",   href: "perfil.html",
      match: ["perfil.html", "configuracion.html", "apariencia.html", "tienda.html", "onboarding.html"],
      icon: '<circle cx="12" cy="8" r="3.6"/><path d="M4.5 20c0-3.7 3.4-5.6 7.5-5.6s7.5 1.9 7.5 5.6"/>' }
  ];

  /* Solo actuamos en páginas conocidas del alumno. */
  var KNOWN = {};
  TABS.forEach(function (t) { t.match.forEach(function (m) { KNOWN[m] = true; }); });

  var page = (location.pathname.split("/").pop() || "index.html").toLowerCase() || "index.html";
  if (!KNOWN[page]) return;

  function activeId() {
    for (var i = 0; i < TABS.length; i++) {
      if (TABS[i].match.indexOf(page) !== -1) return TABS[i].id;
    }
    return null;
  }

  function injectStyles() {
    if (document.getElementById("vsp-nav-style")) return;
    var css = document.createElement("style");
    css.id = "vsp-nav-style";
    css.textContent = [
      /* Superficie: navy del tema con respaldo; borde superior dorado. */
      "#vsp-tabbar{position:fixed;left:0;right:0;bottom:0;z-index:9997;",
        "display:flex;justify-content:space-around;align-items:stretch;",
        "background:var(--navy,#1B1B2F);border-top:1px solid rgba(197,160,89,.5);",
        "padding-bottom:env(safe-area-inset-bottom);",
        "font-family:'Inter',system-ui,-apple-system,'Segoe UI',sans-serif;",
        "box-shadow:0 -6px 22px rgba(0,0,0,.22);transition:opacity .2s ease}",
      /* Oculta la barra mientras se escribe (no pelear con el teclado). */
      "#vsp-tabbar.vsp-hidden{opacity:0;pointer-events:none}",
      "#vsp-tabbar a{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;",
        "padding:9px 4px 8px;text-decoration:none;color:rgba(245,242,235,.62);",
        "font-size:.66rem;font-weight:600;letter-spacing:.02em;line-height:1;",
        "-webkit-tap-highlight-color:transparent;transition:color .16s,transform .16s;position:relative}",
      "#vsp-tabbar a svg{width:23px;height:23px;fill:none;stroke:currentColor;stroke-width:1.9;",
        "stroke-linecap:round;stroke-linejoin:round;display:block}",
      "#vsp-tabbar a:hover{color:rgba(245,242,235,.9)}",
      "#vsp-tabbar a.on{color:var(--gold,#c5a059)}",
      "#vsp-tabbar a.on::before{content:'';position:absolute;top:0;width:26px;height:3px;border-radius:0 0 3px 3px;",
        "background:var(--gold,#c5a059)}",
      "#vsp-tabbar a.on span{font-weight:700}",
      /* Espacio al final para que el contenido no quede tapado. */
      "#vsp-nav-spacer{height:calc(60px + env(safe-area-inset-bottom));width:100%}",
      /* Sube los flotantes conocidos por encima de la barra:
         FAB de chat, botón instalar PWA y el chip de cerrar sesión. */
      ".vchat-nudge,#install-btn{bottom:calc(72px + env(safe-area-inset-bottom))!important}",
      ".vsp-logout-chip{bottom:calc(72px + env(safe-area-inset-bottom))!important}",
      /* El FAB de apariencia (vesper_theme.js) va abajo-IZQUIERDA: así no se
         encima con la burbuja de chat ni con el chip de sesión (abajo-derecha). */
      ".vt-fab{bottom:calc(72px + env(safe-area-inset-bottom))!important;left:16px!important;right:auto!important}",
      /* Escritorio: píldora flotante centrada. */
      "@media(min-width:768px){",
        "#vsp-tabbar{left:50%;right:auto;transform:translateX(-50%);bottom:18px;",
          "width:min(540px,92vw);border:1px solid rgba(197,160,89,.4);border-radius:18px;",
          "padding-bottom:0;box-shadow:0 12px 34px rgba(0,0,0,.34)}",
        "#vsp-tabbar a{padding:11px 4px}",
        "#vsp-tabbar a.on::before{top:0;border-radius:0 0 3px 3px}",
        /* La píldora de escritorio es más alta; sube un poco los flotantes para
           que la burbuja de chat no roce su esquina. */
        ".vchat-nudge,.vt-fab,#install-btn,.vsp-logout-chip{bottom:88px!important}",
        "#vsp-nav-spacer{height:96px}}",
      "@media(prefers-reduced-motion:reduce){#vsp-tabbar a{transition:none}}"
    ].join("");
    (document.head || document.documentElement).appendChild(css);
  }

  function render() {
    if (document.getElementById("vsp-tabbar")) return;
    injectStyles();

    var act = activeId();
    var nav = document.createElement("nav");
    nav.id = "vsp-tabbar";
    nav.setAttribute("aria-label", "Navegación del alumno");
    nav.innerHTML = TABS.map(function (t) {
      var on = t.id === act;
      return '<a href="' + t.href + '"' + (on ? ' class="on" aria-current="page"' : "") + '>' +
        '<svg viewBox="0 0 24 24" aria-hidden="true">' + t.icon + '</svg>' +
        '<span>' + t.label + '</span></a>';
    }).join("");

    var spacer = document.createElement("div");
    spacer.id = "vsp-nav-spacer";
    spacer.setAttribute("aria-hidden", "true");

    document.body.appendChild(spacer);
    document.body.appendChild(nav);

    /* Ocultar la barra al escribir: en móvil, un tab bar fijo pelea con el
       teclado y el compositor (chat) o los ejercicios de escribir. */
    function isText(el) {
      if (!el) return false;
      if (el.isContentEditable) return true;
      var tag = el.tagName;
      if (tag === "TEXTAREA") return true;
      if (tag === "INPUT") return /^(text|search|email|url|tel|password|number|)$/i.test(el.type || "");
      return false;
    }
    document.addEventListener("focusin", function (e) {
      if (isText(e.target)) nav.classList.add("vsp-hidden");
    });
    document.addEventListener("focusout", function (e) {
      if (isText(e.target)) nav.classList.remove("vsp-hidden");
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
})();
