/* ============================================================
   VESPER ACADEMY — Service Worker (Vesper Engine PWA)
   ------------------------------------------------------------
   App offline-first para el Vesper Engine Y las lecciones gratis:
   cachea ambos cascarones (HTML, datos, auth, mascota e iconos)
   para que abran sin conexión. El resto del sitio (manuales,
   audio, Firestore) sigue yendo siempre a la red.

   CACHE_VERSION ya NO se sube a mano: el sufijo es el sha256 del contenido
   de CORE y lo reescribe `python _scripts/preflight.py --fix`, que ademas
   verifica que cada entrada de CORE exista y este publicada (el install de
   abajo las traga en silencio si fallan). El prefijo "vesper-vNN" se queda
   como etiqueta legible.
   ============================================================ */
"use strict";

var CACHE_VERSION = "vesper-v110-8db661dc";
var CORE = [
  /* Comunes. El Vesper Engine (herramienta del profesor) ya no se precarga
     en el teléfono de cada alumno: se guarda la primera vez que el profesor
     lo abre con red (ver la parte de navegaciones abajo) y desde ahí funciona sin conexión. */
  "vesper_app_mode.js",
  "vesper_auth.js",
  "vesper_nav.js",
  "vesper_identity.js",
  "manifest.webmanifest",
  /* Lecciones gratis (sin cuenta; offline tras la primera visita) */
  "leccion.html",
  "leccion_app.js",
  "assets/css/leccion.css",
  "chat.html",
  "configuracion.html",
  "perfil.html",
  "vesper_lessons.js",
  "vesper_activities.js",
  "vesper_content_pack.js",
  "vesper_expansion.js",
  "vesper_expansion2.js",
  "vesper_expansion3.js",
  "vesper_levels_pack.js",
  "vesper_themes_pack.js",
  "vesper_themes_pack2.js",
  "vesper_themes_pack3.js",
  "vesper_advanced_pack.js",
  "vesper_toefl_pack.js",
  "vesper_boss_questions.js",
  "vesper_level_questions.js",
  "vesper_vocab_dens.js",
  "vesper_vocab_more.js",
  "vesper_forja.js",
  "vesper_prefs.js",
  "vesper_analytics.js",
  "assets/css/vesper_tokens.css",
  /* Edición móvil de la portada (solo pinta en táctiles <=820px) */
  "assets/css/vesper_mobile.css",
  "vesper_mobile.js",
  "vesper_mascot.js",
  "vesper_theme.js",
  "vesper_style.js",
  "vesper_minimal_deco.js",
  "assets/css/vesper_minimal.css",
  "vesper_tour.js",
  "vesper_adaptive.js",
  "vesper_persona.js",
  "vesper_path.js",
  "vesper_progress.js",
  "vesper_cosmetics.js",
  "vesper_sync.js",
  /* Engagement (comparativa Duolingo): repaso espaciado, economía y liga */
  "vesper_srs.js",
  "vesper_economy.js",
  "vesper_league.js",
  "vesper_league_cloud.js",
  "vesper_results.js",
  "vesper_sfx.js",
  "vesper_icons.js",
  "vesper_opticons.js",
  "tienda.html",
  "liga.html",
  "manifest_lecciones.webmanifest",
  "assets/images/mascot/vesper_cat.png",
  /* expresiones reactivas de la mascota (se animan al acertar/fallar/racha…) */
  "assets/images/mascot/vesper_cat_correct.webp",
  "assets/images/mascot/vesper_cat_incorrect.webp",
  "assets/images/mascot/vesper_cat_streak.webp",
  "assets/images/mascot/vesper_cat_welcome.webp",
  "assets/images/mascot/vesper_cat_explaining.webp",
  "assets/images/mascot/vesper_cat_correcting.webp",
  "assets/images/virtual_class_happy_cat.png",
  /* Pelajes (apariencias completas de Vesper, generadas con IA) */
  "assets/images/mascot/skins/gray.png",
  "assets/images/mascot/skins/calico.png",
  "assets/images/mascot/skins/lion.png",
  "assets/images/mascot/skins/cosmic.png",
  "assets/images/mascot/skins/flame.png",
  /* iconos compartidos */
  "assets/images/va_isotype.svg",
  "assets/images/app_icon_192.png",
  "assets/images/app_icon_512.png",
  "assets/images/apple_touch_icon.png",
  "assets/images/favicon_32.png"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_VERSION).then(function (cache) {
      /* addAll falla en bloque si un recurso falla; lo hacemos tolerante.
         cache:"reload" salta el caché HTTP del navegador (GitHub Pages manda
         max-age=600): sin eso, un alumno que abrió la app hace <10 min
         precachea el JS VIEJO bajo la versión nueva y no ve el cambio. */
      return Promise.all(CORE.map(function (url) {
        return cache.add(new Request(url, { cache: "reload" })).catch(function () { /* ignora recursos ausentes */ });
      }));
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) {
        if (k !== CACHE_VERSION) return caches.delete(k);
      }));
    }).then(function () { return self.clients.claim(); })
  );
});

/* Aviso de "sin conexión" para una navegación que falló y no tiene copia
   guardada. Conserva la URL pedida: "Reintentar" recarga esa misma página, y
   se recarga sola cuando vuelve la red. Ofrece las lecciones solo si están
   descargadas. Responde 200 a propósito: la app de Play Store (TWA) se cierra
   si una navegación devuelve 404/5xx. */
function offlinePage() {
  var scope = self.registration.scope;
  var lessons = new URL("leccion.html", scope).pathname;
  var logo = new URL("assets/images/va_isotype.svg", scope).pathname;
  return caches.match("leccion.html").then(function (hasLessons) {
    var html =
      '<!DOCTYPE html><html lang="es"><head><meta charset="utf-8">' +
      '<meta name="viewport" content="width=device-width, initial-scale=1">' +
      '<meta name="robots" content="noindex">' +
      '<meta name="theme-color" content="#15152b">' +
      "<title>Sin conexión | Vesper Academy</title><style>" +
      "body{margin:0;min-height:100vh;min-height:100dvh;display:flex;align-items:center;" +
      "justify-content:center;padding:24px 16px;box-sizing:border-box;background:#15152b;" +
      "color:#f5efe2;font:16px/1.5 Inter,system-ui,-apple-system,Segoe UI,Roboto,sans-serif;" +
      "text-align:center}main{max-width:380px}img{display:block;margin:0 auto 18px;opacity:.9}" +
      "h1{font-size:1.35rem;margin:0 0 10px;color:#d9bd84}p{margin:0 0 12px;color:#d8d2c4}" +
      ".a{display:flex;flex-wrap:wrap;gap:12px;justify-content:center;margin-top:22px}" +
      ".b{display:inline-flex;align-items:center;justify-content:center;min-height:48px;" +
      "padding:0 22px;border-radius:999px;border:1.5px solid #d9bd84;background:#d9bd84;" +
      "color:#15152b;font-family:inherit;font-size:1rem;font-weight:700;line-height:1;" +
      "text-decoration:none;cursor:pointer}" +
      ".b.l{background:transparent;color:#f5efe2}" +
      ".b:focus-visible{outline:3px solid #fff;outline-offset:3px}" +
      "</style></head><body><main>" +
      '<img src="' + logo + '" alt="" width="64" height="64">' +
      "<h1>No pudimos cargar esta página</h1>" +
      "<p>Revisa tu conexión a internet y vuelve a intentar.</p>" +
      '<p style="font-size:.88rem;opacity:.8">Si tu internet funciona, el sitio puede ' +
      "estar fallando: prueba de nuevo en unos minutos.</p>" +
      '<div class="a"><button class="b" type="button" onclick="location.reload()">Reintentar</button>' +
      (hasLessons ? '<a class="b l" href="' + lessons + '">Abrir mis lecciones</a>' : "") +
      "</div></main>" +
      '<script>addEventListener("online",function(){location.reload()})<\/script>' +
      "</body></html>";
    return new Response(html, {
      status: 200,
      headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" }
    });
  });
}

self.addEventListener("fetch", function (event) {
  var req = event.request;
  if (req.method !== "GET") return;

  var url = new URL(req.url);

  /* Nunca interceptar Firebase/Firestore/Google ni terceros: siempre red. */
  if (url.origin !== self.location.origin) return;
  if (/firebase|firestore|googleapis|gstatic/.test(url.href)) return;

  /* El vídeo va SIEMPRE por red, sin pasar por aquí. <video> pide rangos y
     eso rompe este handler por los dos lados: cache.put() lanza con una
     respuesta 206 (la Cache API no admite parciales) y devolver un 200
     entero a una petición Range deja a Safari sin reproducir. La portada no
     registra el SW, pero leccion.html sí lo hace en el ámbito raíz, así que
     el alumno que ya usó la app vuelve a la portada con el SW mandando. */
  if (req.destination === "video" || req.headers.has("range") ||
      /\.(mp4|webm|m4v|mov)$/i.test(url.pathname)) return;

  /* En desarrollo la red manda. El handler de abajo es stale-while-revalidate:
     sirve el cache y refresca detrás, o sea que al editar un vesper_*.js en
     local la recarga sigue mostrando el archivo viejo y el cambio parece "no
     hacer nada" hasta desregistrar el SW a mano. Aquí eso se acaba. En
     producción no cambia absolutamente nada: solo aplica a localhost. */
  if (url.hostname === "localhost" || url.hostname === "127.0.0.1" ||
      url.hostname === "[::1]" || url.hostname === "::1") {
    event.respondWith(
      fetch(req).catch(function () { return caches.match(req); })
    );
    return;
  }

  /* Navegaciones (abrir la app): red primero, cae al cache. */
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req).then(function (res) {
        /* el motor del profesor: se guarda al abrirlo, para usarlo sin red */
        if (res && res.ok && /\/vesper_engine\.html$/.test(url.pathname)) {
          var copy = res.clone();
          caches.open(CACHE_VERSION).then(function (c) { c.put("vesper_engine.html", copy); });
        }
        return res;
      }).catch(function () {
        /* La red falló: sin internet, o el sitio no responde (caído, DNS mal
           apuntado, certificado vencido: para fetch() es el mismo rechazo).
           Se sirve la copia guardada de ESA MISMA página y nada más.
           Antes, cualquier página sin copia caía a leccion.html: con el
           sitio fuera de línea la portada, el portal del alumno y la
           biblioteca de audio "abrían en lecciones" y la avería quedaba
           disfrazada. Ahora, si no hay copia, se dice que no hay conexión.
           ignoreSearch: las páginas son cascarones estáticos, así que
           leccion.html?id=… o chat.html?src=shortcut abren su propia copia. */
        return caches.match(req, { ignoreSearch: true }).then(function (c) {
          return c || offlinePage();
        });
      })
    );
    return;
  }

  /* Recursos del cascaron: cache primero, refresca en segundo plano. */
  event.respondWith(
    caches.match(req).then(function (cached) {
      var network = fetch(req).then(function (res) {
        if (res && res.ok) {
          var copy = res.clone();
          caches.open(CACHE_VERSION).then(function (c) { c.put(req, copy); });
        }
        return res;
      }).catch(function () { return cached; });
      return cached || network;
    })
  );
});
