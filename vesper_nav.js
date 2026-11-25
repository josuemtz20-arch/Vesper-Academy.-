/* ============================================================
   VESPER ACADEMY — Barra de navegación del alumno (persistente)
   ------------------------------------------------------------
   Una sola "columna vertebral" de navegación para el portal del
   alumno. Reemplaza los headers "atrás" ad-hoc de cada página por
   una barra de pestañas inferior consistente:

       Home · Learn · Listen · Grades · Profile (en inglés; el español va en title)

   Cómo se usa: añade  <script src="vesper_nav.js"></script>  a la
   página del alumno. El script se auto-inyecta al final del <body>,
   marca la pestaña activa según el archivo actual y no toca nada más.

   DISEÑO «CONSTELACIÓN + VESPER» (2026-11-20, arena opción E, elegida
   por Josue: «se veía muy generada con IA»; la anterior era navy con
   iconos genéricos y una cápsula dorada):
   - La barra es una franja de cielo. Los iconos SON las estrellas: una
     línea punteada de constelación los une por detrás. Apagados = trazo
     tenue; el activo se enciende en oro con halo, tres destellitos y sus
     detalles dorados (la puerta, la cinta, el micrófono, el sello, los
     ojos del camafeo). La etiqueta activa va escrita a mano (Caveat).
   - Vesper (arte real) asoma 24 px por encima del filo sobre la pestaña
     activa. Al cambiar de página recuerda la pestaña anterior
     (sessionStorage) y se agacha, se desliza y vuelve a asomar en la
     nueva. Con movimiento reducido salta directo.
   - Colores: por defecto, cielo nocturno fijo (como la barra navy de
     antes), porque algunas páginas no cargan vesper_theme.js y sus
     tokens son claros y parciales. Donde vesper_theme.js marca
     <html data-vesper-theme>, la barra toma los tokens del tema: cielo
     en los temas oscuros, carta celeste en papel en los claros.
   - Móvil: barra inferior completa (66 px). Escritorio: píldora de 540 px.
   - Reserva espacio al final del <body> (barra + lo que asoma el gato)
     y sube los flotantes conocidos por encima.
   - Defensivo: si por error se incluye en una página que no es del
     alumno, no hace nada.
   Prototipo y capturas: _propuestas/arena-2026-11-20-tabbar/opcion-e/
   ============================================================ */
(function () {
  "use strict";

  /* Destinos de la barra. href = archivo; match = archivos que marcan
     esta pestaña como activa. dy = ligero desnivel para que la línea se
     lea como constelación y no como regla. En los iconos, .h = trama
     fina de grabado; .acc / .acc-line = detalle que se enciende en oro. */
  var TABS = [
    { id: "inicio",   label: "Home",     es: "Inicio",   href: "materiales.html", dy: 1, members: true,
      match: ["materiales.html", "libro.html"],
      /* Casita con chimenea; se enciende la luz de la puerta */
      icon: '<path d="M3.5 12 12 5l8.5 7"/><path d="M5.8 10.4V20.5h12.4V10.4"/><path class="acc" d="M10.2 20.5v-4.6a1.8 1.8 0 0 1 3.6 0v4.6z"/>' +
            '<path d="M15.6 7.6V4.5h2v4.8"/><path class="h" d="M6.6 12.3 12 7.9l5.4 4.4"/><path class="h acc-line" d="M7.6 14.5h1.6M7.6 16.5h1.6M14.8 14.5h1.6M14.8 16.5h1.6"/>' },
    { id: "aprender", label: "Learn",    es: "Aprender", href: "leccion.html", dy: -2,
      match: ["leccion.html", "chat.html", "entrevista.html", "liga.html", "lesson.html"],
      /* Libro abierto; se enciende la cinta */
      icon: '<path d="M12 6.8C9.6 5.3 6.2 5 3 5.8v12.8c3.2-.8 6.6-.5 9 1 2.4-1.5 5.8-1.8 9-1V5.8c-3.2-.8-6.6-.5-9 1z"/><path d="M12 6.8v12.8"/>' +
            '<path class="h" d="M5 9c1.9-.3 3.6-.1 5 .5M5 11.6c1.9-.3 3.6-.1 5 .5M5 14.2c1.9-.3 3.6-.1 5 .5"/>' +
            '<path class="h" d="M14 12.1c1.4-.6 3.1-.8 5-.5M14 14.7c1.4-.6 3.1-.8 5-.5"/><path class="acc" d="M16.6 5.4v6.2l1.1-.9 1.1.9V5.3z"/>' },
    { id: "audio",    label: "Listen",   es: "Audio",    href: "audio_library.html", dy: 2, members: true,
      match: ["audio_library.html"],
      /* Audífonos de profesor de Vesper; se enciende el micrófono */
      icon: '<path d="M5 13.4V12a7 7 0 0 1 14 0v1.4"/><path class="h" d="M6.7 12a5.3 5.3 0 0 1 10.6 0"/>' +
            '<path d="M3.7 13.2h2.5v6H3.7a.9.9 0 0 1-.9-.9v-4.2a.9.9 0 0 1 .9-.9z"/><path d="M20.3 13.2h-2.5v6h2.5a.9.9 0 0 0 .9-.9v-4.2a.9.9 0 0 0-.9-.9z"/>' +
            '<path class="h" d="M4.4 14.5v3.4M19.6 14.5v3.4"/><path d="M6.2 18.2c.9 1.8 2.9 2.5 5.3 2.4"/>' +
            '<ellipse class="acc" cx="12.9" cy="20.5" rx="1.4" ry="1.05"/>' },
    { id: "boleta",   label: "Grades",   es: "Boleta",   href: "mi_boleta.html", dy: -1, members: true,
      match: ["mi_boleta.html"],
      /* Hoja con sello de lacre; se enciende el sello */
      icon: '<path d="M6 3.5h8.8l3.7 3.7v13.3H6z"/><path d="M14.8 3.5v3.7h3.7"/>' +
            '<path class="h" d="M8.4 9.2h5.4M8.4 11.6h7.4M8.4 14h3.4"/>' +
            '<path class="acc-line" d="M12.4 18.6 11.6 21.4M14.8 18.6l.8 2.8"/><circle class="acc" cx="13.6" cy="16.6" r="2.3"/>' },
    { id: "perfil",   label: "Profile",  es: "Perfil",   href: "perfil.html", dy: 1,
      match: ["perfil.html", "configuracion.html", "apariencia.html", "tienda.html", "onboarding.html"],
      /* Camafeo con el busto de Vesper; se encienden el marco y sus ojos ámbar */
      icon: '<ellipse cx="12" cy="12" rx="7.6" ry="9.2"/><ellipse class="h acc-line" cx="12" cy="12" rx="6.2" ry="7.8"/>' +
            '<path d="M9.2 8.9 9.4 5.9l1.7 1.4h1.8l1.7-1.4.2 3c.5 2.5-.8 4.3-2.8 4.3s-3.3-1.8-2.8-4.3z"/>' +
            '<circle class="acc" cx="10.9" cy="9.7" r=".55"/><circle class="acc" cx="13.1" cy="9.7" r=".55"/>' +
            '<path d="M7.7 18.5c.6-2.4 2.2-3.6 4.3-3.6s3.7 1.2 4.3 3.6"/><path d="M10.7 15 12 17.1l1.3-2.1"/>' }
  ];

  /* Tres destellitos (solo se ven en el astro encendido). */
  var GLINT = '<svg class="tb-glint" viewBox="0 0 46 46" aria-hidden="true">' +
    '<path d="M6 7c.2 1.6.6 2.3 2.6 2.6C6.6 9.9 6.2 10.6 6 12.2 5.8 10.6 5.4 9.9 3.4 9.6 5.4 9.3 5.8 8.6 6 7z"/>' +
    '<path d="M40 4.5c.15 1.3.5 1.9 2.1 2.1-1.6.2-1.95.8-2.1 2.1-.15-1.3-.5-1.9-2.1-2.1 1.6-.2 1.95-.8 2.1-2.1z"/>' +
    '<path d="M41.5 33c.2 1.6.6 2.3 2.6 2.6-2 .3-2.4 1-2.6 2.6-.2-1.6-.6-2.3-2.6-2.6 2-.3 2.4-1 2.6-2.6z"/></svg>';

  var CAT_IMG = "assets/images/mascot/vesper_cat_welcome.webp";
  var LAST_KEY = "vsp-last-tab";

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

  /* Pestañas de alumno inscrito (members:true): Home, Listen y Grades.
     Quien entra gratis (sin cuenta, sin verificar o sin estar en la allowlist
     de students/) las ve con candado; al tocarlas sale un aviso en vez de
     rebotar a un login sin explicación. Learn y Profile quedan abiertos.
     Es cosmético: el acceso real lo siguen cuidando vesper_auth.js (redirige
     en esas páginas) y las reglas de Firestore.
     · En las páginas protegidas ya hay sesión aprobada: nunca hay candado.
     · En las públicas se arranca con lo último que se supo (MEMBER_KEY, para
       que a un alumno no le parpadeen candados) y se confirma con Firebase.
     · chat.html no carga vesper_auth.js: ahí solo vale lo último que se supo. */
  var MEMBER_KEY = "vesper_student_ok";
  function isPublicPage() {
    var A = window.VesperAuth;
    if (!A || !A.config) return true;
    return (A.config.publicPages || []).indexOf(page) !== -1;
  }
  function memberCached() {
    try { return localStorage.getItem(MEMBER_KEY) === "1"; } catch (e) { return false; }
  }
  function rememberMember(ok) {
    try { if (ok) localStorage.setItem(MEMBER_KEY, "1"); else localStorage.removeItem(MEMBER_KEY); } catch (e) {}
  }
  function watchMembership(onChange) {
    var A = window.VesperAuth;
    if (!A || !A.isConfigured || !A.initFirebase || !A.isApprovedUser) return;
    A.initFirebase().then(function (auth) {
      auth.onAuthStateChanged(function (u) {
        if (!u || !u.emailVerified) { rememberMember(false); onChange(false); return; }
        A.isApprovedUser(u).then(function (ok) { rememberMember(!!ok); onChange(!!ok); },
                                 function () {});
      });
    }).catch(function () {});
  }

  var LOCK = '<svg class="tb-lock" viewBox="0 0 12 12" aria-hidden="true"><rect x="2.2" y="5.2" width="7.6" height="5.6" rx="1.3"/>' +
    '<path d="M3.9 5.2V3.9a2.1 2.1 0 0 1 4.2 0v1.3"/></svg>';

  function setLocked(nav, locked) {
    var links = nav.querySelectorAll("a[data-members]");
    for (var i = 0; i < links.length; i++) {
      var a = links[i], t = a.getAttribute("data-label"), es = a.getAttribute("data-es");
      a.classList.toggle("locked", locked);
      if (locked) {
        a.setAttribute("aria-disabled", "true");
        a.setAttribute("aria-label", t + " · " + es + " (solo alumnos inscritos)");
        a.title = es + " · solo alumnos inscritos";
      } else {
        a.removeAttribute("aria-disabled");
        a.setAttribute("aria-label", t + " · " + es);
        a.title = es;
      }
    }
    if (!locked) closeLockNote();
  }

  /* El aviso al tocar una pestaña con candado. */
  var noteEl = null;
  function closeLockNote() {
    if (noteEl) { noteEl.remove(); noteEl = null; }
  }
  function openLockNote(a) {
    closeLockNote();
    var es = a.getAttribute("data-es");
    noteEl = document.createElement("div");
    noteEl.id = "vsp-lock-note";
    noteEl.setAttribute("role", "dialog");
    noteEl.setAttribute("aria-labelledby", "vsp-lock-title");
    noteEl.innerHTML =
      '<button type="button" class="ln-x" aria-label="Cerrar">&times;</button>' +
      '<p class="ln-k" lang="en">Students only</p>' +
      '<p class="ln-t" id="vsp-lock-title">' + es + ' es para alumnos inscritos</p>' +
      '<p class="ln-d">Inicio, Audio y Boleta se abren cuando te inscribes en Vesper Academy. ' +
        'Mientras, puedes practicar en Learn y ver tu Perfil.</p>' +
      '<div class="ln-b"><a class="ln-in" href="login.html">Ya soy alumno · Entrar</a>' +
        '<a class="ln-more" href="index.html">Conocer los cursos</a></div>';
    document.body.appendChild(noteEl);
    noteEl.querySelector(".ln-x").onclick = closeLockNote;
    noteEl.querySelector(".ln-in").focus();
  }
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeLockNote(); });
  document.addEventListener("click", function (e) {
    if (noteEl && !noteEl.contains(e.target) &&
        !(e.target.closest && e.target.closest("#vsp-tabbar a.locked"))) closeLockNote();
  });

  /* La etiqueta activa va en Caveat (la letra de Vesper). Varias páginas no
     la cargan; se pide solo con las letras de las cinco etiquetas. */
  function ensureCaveat() {
    var links = document.querySelectorAll('link[href*="fonts.googleapis.com"]');
    for (var i = 0; i < links.length; i++) if (/Caveat/.test(links[i].href)) return;
    var l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap&text=HomeLearnListenGradesProfile";
    (document.head || document.documentElement).appendChild(l);
  }

  var STARS = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='190' height='66'%3E%3Cg%3E%3Ccircle cx='14' cy='44' r='.7' opacity='.8'/%3E%3Ccircle cx='47' cy='60' r='.6' opacity='.5'/%3E%3Ccircle cx='71' cy='6' r='.8' opacity='.7'/%3E%3Ccircle cx='103' cy='50' r='.6' opacity='.8'/%3E%3Ccircle cx='128' cy='62' r='.7' opacity='.5'/%3E%3Ccircle cx='151' cy='8' r='.6' opacity='.7'/%3E%3Ccircle cx='179' cy='52' r='.8' opacity='.6'/%3E%3Ccircle cx='33' cy='4' r='.5' opacity='.7'/%3E%3C/g%3E%3C/svg%3E\") repeat-x 0 0";

  function injectStyles() {
    if (document.getElementById("vsp-nav-style")) return;
    var css = document.createElement("style");
    css.id = "vsp-nav-style";
    css.textContent = [
      /* Paleta propia de la barra. Por defecto, cielo nocturno fijo. */
      "#vsp-tabbar{--tb-c1:#14122a;--tb-c2:#1f2342;--tb-ink:#EDE7D6;--tb-fg:#b3b0c9;--tb-gold:#C9A84C;--tb-gold-ink:#C9A84C;",
        "--tb-on:color-mix(in srgb,var(--tb-gold-ink) 72%,var(--tb-ink));",
        "--tb-star:color-mix(in srgb,var(--tb-gold) 60%,var(--tb-ink));",
        "--tb-thread:color-mix(in srgb,var(--tb-star) 45%,transparent);",
        "--tb-dust:color-mix(in srgb,var(--tb-star) 55%,transparent);",
        "--tb-halo:color-mix(in srgb,var(--tb-gold) 34%,transparent);",
        "--tb-edge:color-mix(in srgb,var(--tb-gold) 38%,transparent)}",
      /* Con vesper_theme.js activo, la barra sigue al tema (8 temas). */
      "html[data-vesper-theme] #vsp-tabbar{--tb-c1:var(--cream,#14122a);--tb-c2:var(--paper,#1f2342);--tb-ink:var(--ink,#EDE7D6);",
        "--tb-fg:var(--muted,#b3b0c9);--tb-gold:var(--gold,#C9A84C);--tb-gold-ink:var(--gold-ink,var(--gold,#C9A84C))}",

      "#vsp-tabbar{position:fixed;left:0;right:0;bottom:0;z-index:9997;display:flex;align-items:stretch;",
        "padding-bottom:env(safe-area-inset-bottom);",
        "background:linear-gradient(180deg,var(--tb-c1) 0%,color-mix(in srgb,var(--tb-c1) 45%,var(--tb-c2)) 62%,color-mix(in srgb,var(--tb-c1) 84%,var(--tb-gold)) 100%);",
        "border-top:1px solid var(--tb-edge);box-shadow:0 -8px 24px color-mix(in srgb,var(--tb-ink) 10%,transparent);",
        "font-family:'Inter',system-ui,-apple-system,'Segoe UI',sans-serif;transition:opacity .2s ease}",
      /* Estrellitas quietas del cielo (máscara pintada con el color del tema). */
      "#vsp-tabbar::before{content:'';position:absolute;inset:0;border-radius:inherit;pointer-events:none;background:var(--tb-dust);",
        "-webkit-mask:" + STARS + ";mask:" + STARS + "}",
      /* Oculta la barra mientras se escribe (no pelear con el teclado). */
      "#vsp-tabbar.vsp-hidden{opacity:0;pointer-events:none}",

      /* El hilo de la constelación (lo dibuja drawThread). */
      "#vsp-tabbar .tb-thread{position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none;overflow:visible}",
      "#vsp-tabbar .tb-thread line{stroke:var(--tb-thread);stroke-width:1.4;stroke-dasharray:.1 3.4;stroke-linecap:round}",

      "#vsp-tabbar a{flex:1;position:relative;min-width:0;min-height:66px;display:flex;flex-direction:column;align-items:center;",
        "padding:10px 2px 6px;text-decoration:none;color:var(--tb-fg);box-sizing:border-box;",
        "-webkit-tap-highlight-color:transparent;transition:color .16s}",
      "#vsp-tabbar a[hidden]{display:none}",
      "#vsp-tabbar a:hover{color:var(--tb-ink)}",
      "#vsp-tabbar a:focus-visible{outline:3px solid var(--tb-gold);outline-offset:-5px;border-radius:14px}",

      /* Cada icono es un astro: apagado = trazo tenue; encendido = oro con halo. */
      "#vsp-tabbar .tb-ico{position:relative;width:26px;height:26px;flex:none;transform:translateY(var(--dy,0px))}",
      "#vsp-tabbar .tb-ico::before{content:'';position:absolute;inset:-13px;border-radius:50%;",
        "background:radial-gradient(circle,var(--tb-halo) 0%,color-mix(in srgb,var(--tb-halo) 35%,transparent) 45%,transparent 70%);",
        "opacity:0;transition:opacity .25s}",
      "#vsp-tabbar .tb-ico svg.ic{position:relative;display:block;width:26px;height:26px;fill:none;stroke:currentColor;stroke-width:1.3;",
        "stroke-linecap:round;stroke-linejoin:round;opacity:.72;transition:opacity .2s}",
      "#vsp-tabbar .tb-ico svg .h{stroke-width:.7;opacity:.75}",
      "#vsp-tabbar .tb-ico svg .acc{fill:transparent;transition:fill .25s,stroke .25s}",
      "#vsp-tabbar a:hover .tb-ico svg.ic{opacity:1}",
      "#vsp-tabbar a:active .tb-ico{transform:translateY(var(--dy,0px)) scale(.92)}",
      "#vsp-tabbar a.on .tb-ico{color:var(--tb-on)}",
      "#vsp-tabbar a.on .tb-ico::before{opacity:1}",
      "#vsp-tabbar a.on .tb-ico svg.ic{opacity:1;stroke-width:1.4;filter:drop-shadow(0 0 3px var(--tb-halo))}",
      "#vsp-tabbar a.on .tb-ico svg .acc{fill:var(--tb-gold);stroke:var(--tb-gold)}",
      "#vsp-tabbar a.on .tb-ico svg .acc-line{stroke:var(--tb-gold);opacity:1}",
      "#vsp-tabbar .tb-glint{position:absolute;left:50%;top:50%;width:46px;height:46px;margin:-23px 0 0 -23px;fill:var(--tb-on);",
        "opacity:0;transform:scale(.6) rotate(-20deg);transition:opacity .25s,transform .35s cubic-bezier(.3,1.6,.5,1);pointer-events:none}",
      "#vsp-tabbar a.on .tb-glint{opacity:.9;transform:none}",

      /* Etiquetas: Inter pequeño; la activa, escrita a mano por Vesper en oro. */
      "#vsp-tabbar .tb-lbl{height:18px;display:flex;align-items:center;margin-top:3px;white-space:nowrap;",
        "font-size:.66rem;font-weight:600;letter-spacing:.04em;line-height:1}",
      "#vsp-tabbar a.on .tb-lbl{color:var(--tb-on);font-family:Caveat,'Segoe Print',cursive;font-size:1.18rem;font-weight:700;letter-spacing:0;",
        "transform:rotate(-3deg) translateY(-1px)}",

      /* Vesper asoma por encima del filo: la ventana .tb-cat recorta justo en
         el borde, así que al agacharse desaparece detrás de la barra. */
      "#vsp-tabbar .tb-cat{position:absolute;left:0;top:-1px;width:44px;height:24px;overflow:hidden;pointer-events:none;z-index:2;",
        "transform:translate(var(--cx,0px),-100%);transition:transform .42s cubic-bezier(.45,.05,.3,1)}",
      "#vsp-tabbar .tb-cat .head{position:absolute;left:0;top:0;width:44px;height:28px;",
        "background:url(" + CAT_IMG + ") no-repeat;background-size:61px 61px;background-position:-10.4px -7.7px;",
        "filter:drop-shadow(0 -1px 0 var(--tb-gold)) drop-shadow(1px 0 0 var(--tb-gold)) drop-shadow(-1px 0 0 var(--tb-gold));",
        "transition:transform .28s cubic-bezier(.3,1.6,.5,1) .05s}",
      "#vsp-tabbar.vsp-moving .tb-cat .head{transform:translateY(100%);transition:transform .14s ease-in}",

      /* Espacio al final: barra (66) + lo que asoma el gato (24) + aire. */
      "#vsp-nav-spacer{height:calc(98px + env(safe-area-inset-bottom));width:100%}",
      /* Sube los flotantes conocidos por encima de la barra y del gato:
         FAB de chat, botón instalar PWA y el chip de cerrar sesión. */
      ".vchat-nudge,#install-btn{bottom:calc(98px + env(safe-area-inset-bottom))!important}",
      ".vsp-logout-chip{bottom:calc(98px + env(safe-area-inset-bottom))!important}",
      /* El FAB de apariencia (vesper_theme.js) va abajo-IZQUIERDA: así no se
         encima con la burbuja de chat ni con el chip de sesión (abajo-derecha). */
      ".vt-fab{bottom:calc(98px + env(safe-area-inset-bottom))!important;left:16px!important;right:auto!important}",
      /* Teléfono: los flotantes tapaban texto y botones de las tarjetas.
         "Cerrar sesión" vive en Perfil y la apariencia en Perfil › Apariencia. */
      "@media(max-width:767px){.vsp-logout-chip,.vt-fab{display:none!important}}",
      /* Escritorio: la misma franja como píldora centrada (sin overflow:hidden
         para no cortar al gato). */
      "@media(min-width:768px){",
        "#vsp-tabbar{left:50%;right:auto;transform:translateX(-50%);bottom:18px;width:min(540px,92vw);",
          "border:1px solid var(--tb-edge);border-radius:20px;padding-bottom:0;",
          "box-shadow:0 14px 34px color-mix(in srgb,#0a081e 30%,transparent)}",
        ".vchat-nudge,.vt-fab,#install-btn,.vsp-logout-chip{bottom:116px!important}",
        "#vsp-nav-spacer{height:122px}}",
      /* Pestañas con candado (visitante gratis): apagadas, con un candadito dorado. */
      "#vsp-tabbar .tb-lock{position:absolute;right:-7px;bottom:-4px;width:13px;height:13px;padding:1.5px;border-radius:50%;",
        "background:var(--tb-c1);fill:none;stroke:var(--tb-gold);stroke-width:1.3;stroke-linecap:round;display:none}",
      "#vsp-tabbar a.locked .tb-lock{display:block}",
      "#vsp-tabbar a.locked .tb-ico svg.ic{opacity:.38}",
      "#vsp-tabbar a.locked .tb-lbl{opacity:.55}",
      "#vsp-tabbar a.locked:hover{color:var(--tb-fg)}",
      /* Aviso al tocar una pestaña con candado: tarjeta sobre la barra. */
      "#vsp-lock-note{position:fixed;left:12px;right:12px;bottom:calc(84px + env(safe-area-inset-bottom));z-index:9998;",
        "max-width:420px;margin:0 auto;padding:16px 18px;border-radius:16px;box-sizing:border-box;",
        "background:#1f2342;color:#EDE7D6;border:1px solid rgba(201,168,76,.45);box-shadow:0 18px 40px rgba(10,8,30,.4);",
        "font-family:'Inter',system-ui,-apple-system,'Segoe UI',sans-serif}",
      "#vsp-lock-note .ln-k{margin:0;font-family:Caveat,'Segoe Print',cursive;font-size:1.2rem;font-weight:700;color:#C9A84C}",
      "#vsp-lock-note .ln-t{margin:2px 0 6px;padding-right:24px;font-size:1rem;font-weight:700;line-height:1.3}",
      "#vsp-lock-note .ln-d{margin:0 0 12px;font-size:.86rem;line-height:1.45;color:#c9c5dc}",
      "#vsp-lock-note .ln-b{display:flex;flex-wrap:wrap;gap:8px}",
      "#vsp-lock-note .ln-b a{flex:1 1 auto;text-align:center;padding:10px 12px;border-radius:10px;font-size:.86rem;font-weight:600;text-decoration:none}",
      "#vsp-lock-note .ln-in{background:#C9A84C;color:#14122a}",
      "#vsp-lock-note .ln-more{border:1px solid rgba(237,231,214,.35);color:#EDE7D6}",
      "#vsp-lock-note .ln-b a:focus-visible,#vsp-lock-note .ln-x:focus-visible{outline:3px solid #C9A84C;outline-offset:2px}",
      "#vsp-lock-note .ln-x{position:absolute;top:6px;right:8px;width:32px;height:32px;border:0;background:none;color:#b3b0c9;font-size:1.4rem;cursor:pointer}",
      "@media(min-width:768px){#vsp-lock-note{bottom:120px}}",
      /* Movimiento reducido: sin deslizar ni agacharse; el gato salta directo. */
      "@media(prefers-reduced-motion:reduce){#vsp-tabbar,#vsp-tabbar *,#vsp-tabbar *::before{transition:none!important}",
        "#vsp-tabbar.vsp-moving .tb-cat .head{transform:none}}",
      ".vesper-reduce-motion #vsp-tabbar,.vesper-reduce-motion #vsp-tabbar *,.vesper-reduce-motion #vsp-tabbar *::before{transition:none!important}",
      ".vesper-reduce-motion #vsp-tabbar.vsp-moving .tb-cat .head{transform:none}"
    ].join("");
    (document.head || document.documentElement).appendChild(css);
  }

  /* La constelación: tramos punteados de astro a astro, sin cruzar los
     iconos (se cortan 19 px antes de cada centro). */
  function drawThread(nav) {
    var svg = nav.querySelector(".tb-thread"), nb = nav.getBoundingClientRect(), pts = [];
    var icos = nav.querySelectorAll("a:not([hidden]) .tb-ico");
    for (var k = 0; k < icos.length; k++) {
      var r = icos[k].getBoundingClientRect();
      pts.push({ x: r.left + r.width / 2 - nb.left - nav.clientLeft, y: r.top + r.height / 2 - nb.top - nav.clientTop });
    }
    var out = "", gap = 19;
    for (var i = 0; i < pts.length - 1; i++) {
      var a = pts[i], b = pts[i + 1], dx = b.x - a.x, dy = b.y - a.y, d = Math.sqrt(dx * dx + dy * dy);
      if (d <= gap * 2) continue;
      var ux = dx / d, uy = dy / d;
      out += '<line x1="' + (a.x + ux * gap).toFixed(1) + '" y1="' + (a.y + uy * gap).toFixed(1) +
        '" x2="' + (b.x - ux * gap).toFixed(1) + '" y2="' + (b.y - uy * gap).toFixed(1) + '"/>';
    }
    svg.innerHTML = out;
  }

  function reduced() {
    return document.documentElement.classList.contains("vesper-reduce-motion") ||
      !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }

  /* Coloca a Vesper sobre una pestaña. Con animate: se agacha detrás de la
     barra, se desliza y vuelve a asomar. */
  var tid = 0;
  function catX(nav, a) {
    var cat = nav.querySelector(".tb-cat");
    return a.offsetLeft + a.offsetWidth / 2 - cat.offsetWidth / 2;
  }
  function placeCat(nav, a, animate) {
    var cat = nav.querySelector(".tb-cat");
    if (!a || a.hidden) { cat.style.visibility = "hidden"; return; }
    cat.style.visibility = "";
    var x = catX(nav, a);
    clearTimeout(tid);
    if (!animate || reduced()) {
      nav.classList.remove("vsp-moving");
      cat.style.transition = "none";
      cat.style.setProperty("--cx", x + "px");
      void cat.offsetWidth;
      cat.style.transition = "";
      return;
    }
    nav.classList.add("vsp-moving");
    tid = setTimeout(function () {
      cat.style.setProperty("--cx", x + "px");
      tid = setTimeout(function () { nav.classList.remove("vsp-moving"); }, 380);
    }, 120);
  }

  function store(get, val) {
    try {
      if (get) return sessionStorage.getItem(LAST_KEY);
      sessionStorage.setItem(LAST_KEY, val);
    } catch (e) {}
    return null;
  }

  function render() {
    if (document.getElementById("vsp-tabbar")) return;
    injectStyles();
    ensureCaveat();

    var act = activeId();
    var nav = document.createElement("nav");
    nav.id = "vsp-tabbar";
    nav.setAttribute("aria-label", "Navegación del alumno");
    /* Candado solo en páginas públicas; la pestaña de la página actual nunca. */
    var gated = isPublicPage();
    var startLocked = gated && !memberCached();
    nav.innerHTML = '<svg class="tb-thread" aria-hidden="true"></svg>' + TABS.map(function (t) {
      var on = t.id === act;
      /* La etiqueta va en INGLÉS (es lo que se enseña); el español queda en
         title y aria-label para quien aún no la reconoce. */
      return '<a href="' + t.href + '" data-id="' + t.id + '" title="' + t.es + '" aria-label="' + t.label + ' · ' + t.es + '"' +
        (on ? ' class="on" aria-current="page"' : "") +
        (t.id === "boleta" ? ' data-tab="boleta"' : "") +
        (t.members && !on ? ' data-members data-label="' + t.label + '" data-es="' + t.es + '"' : "") + '>' +
        '<span class="tb-ico" style="--dy:' + t.dy + 'px">' + GLINT + '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true">' + t.icon + '</svg>' +
        (t.members && !on ? LOCK : "") + '</span>' +
        '<span class="tb-lbl" lang="en">' + t.label + '</span></a>';
    }).join("") + '<span class="tb-cat" aria-hidden="true"><span class="head"></span></span>';

    var spacer = document.createElement("div");
    spacer.id = "vsp-nav-spacer";
    spacer.setAttribute("aria-hidden", "true");

    document.body.appendChild(spacer);
    document.body.appendChild(nav);

    var current = nav.querySelector("a.on");
    /* Mientras Vesper camina, un relayout (fuentes, resize) no lo teletransporta. */
    var walking = false;
    function layout() { drawThread(nav); if (!walking) placeCat(nav, current, false); }

    /* Vesper camina desde la pestaña de la página anterior. Espera a que
       carguen las fuentes (Caveat cambia el ancho de la etiqueta) o 400 ms. */
    var prevId = store(true);
    var prev = prevId && prevId !== act ? nav.querySelector('a[data-id="' + prevId + '"]') : null;
    drawThread(nav);
    if (prev && !prev.hidden && current && !reduced()) {
      walking = true;
      placeCat(nav, prev, false);
      var started = false;
      var walk = function () {
        if (started) return;
        started = true;
        requestAnimationFrame(function () {
          drawThread(nav);
          placeCat(nav, current, true);
          setTimeout(function () { walking = false; layout(); }, 700);
        });
      };
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(walk);
      setTimeout(walk, 400);
    } else {
      placeCat(nav, current, false);
    }
    if (act) store(false, act);

    if (document.fonts && document.fonts.ready) document.fonts.ready.then(layout);
    window.addEventListener("resize", layout);
    setLocked(nav, startLocked);
    /* En las públicas pone/quita candados; en las protegidas solo recuerda. */
    watchMembership(function (ok) { if (gated) setLocked(nav, !ok); });
    nav.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest("a.locked");
      if (!a) return;
      e.preventDefault();
      openLockNote(a);
    });

    /* Ocultar la barra al escribir: en móvil, un tab bar fijo pelea con el
       teclado y el compositor (chat) o los ejercicios de escribir.
       Dos límites, porque tal cual estaba se pasaba de listo:
         · Sólo donde hay teclado en pantalla. En un escritorio con ratón no hay
           teclado que estorbe y la barra desaparecía por nada.
         · [data-vsp-keep-nav] permite renunciar. Lo usa el buscador del hub: es
           un combobox con lista de resultados, o sea exactamente el momento en
           el que el alumno más necesita seguir viendo a dónde puede ir. */
    var tienePantallaTactil = !window.matchMedia ||
      window.matchMedia("(hover: none) and (pointer: coarse)").matches;

    function isText(el) {
      if (!el) return false;
      if (el.hasAttribute && el.hasAttribute("data-vsp-keep-nav")) return false;
      if (el.isContentEditable) return true;
      var tag = el.tagName;
      if (tag === "TEXTAREA") return true;
      if (tag === "INPUT") return /^(text|search|email|url|tel|password|number|)$/i.test(el.type || "");
      return false;
    }
    document.addEventListener("focusin", function (e) {
      if (tienePantallaTactil && isText(e.target)) nav.classList.add("vsp-hidden");
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
