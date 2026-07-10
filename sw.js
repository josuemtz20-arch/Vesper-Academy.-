/* ============================================================
   VESPER ACADEMY — Service Worker (Vesper Engine PWA)
   ------------------------------------------------------------
   App offline-first para el Vesper Engine Y las lecciones gratis:
   cachea ambos cascarones (HTML, datos, auth, mascota e iconos)
   para que abran sin conexión. El resto del sitio (manuales,
   audio, Firestore) sigue yendo siempre a la red.
   Sube CACHE_VERSION al cambiar cualquiera de estos archivos.
   ============================================================ */
"use strict";

var CACHE_VERSION = "vesper-v70";
var CORE = [
  /* Vesper Engine shell */
  "vesper_engine.html",
  "vesper_engine_data.js",
  "vesper_auth.js",
  "vesper_nav.js",
  "vesper_identity.js",
  "manifest.webmanifest",
  /* Lecciones gratis (sin cuenta; offline tras la primera visita) */
  "leccion.html",
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
  "vesper_toefl_pack.js",
  "vesper_boss_exams.js",
  "vesper_level_exams.js",
  "vesper_vocab_dens.js",
  "vesper_prefs.js",
  "vesper_analytics.js",
  "assets/css/vesper_tokens.css",
  "vesper_mascot.js",
  "vesper_theme.js",
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
  "assets/images/mascot/skins/dragon.png",
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
      /* addAll falla en bloque si un recurso falla; lo hacemos tolerante */
      return Promise.all(CORE.map(function (url) {
        return cache.add(url).catch(function () { /* ignora recursos ausentes */ });
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

self.addEventListener("fetch", function (event) {
  var req = event.request;
  if (req.method !== "GET") return;

  var url = new URL(req.url);

  /* Nunca interceptar Firebase/Firestore/Google ni terceros: siempre red. */
  if (url.origin !== self.location.origin) return;
  if (/firebase|firestore|googleapis|gstatic/.test(url.href)) return;

  /* Navegaciones (abrir la app): red primero, cae al cache. */
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req).catch(function () {
        /* sin conexión: sirve la página cacheada si la tenemos; si no, el hogar
           del alumno (lecciones), que es adonde llega la mayoría. Solo si eso
           tampoco está cacheado caemos al motor. */
        return caches.match(req).then(function (c) {
          return c || caches.match("leccion.html").then(function (l) {
            return l || caches.match("vesper_engine.html");
          });
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
