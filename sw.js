/* ============================================================
   VESPER ACADEMY — Service Worker (Vesper Engine PWA)
   ------------------------------------------------------------
   App offline-first SOLO para el motor: cachea el cascaron del
   Vesper Engine (HTML, datos del currículo, auth e iconos) para
   que la app instalada abra sin conexión. El resto del sitio
   (manuales, audio, Firestore) sigue yendo siempre a la red.
   Sube CACHE_VERSION al cambiar cualquiera de estos archivos.
   ============================================================ */
"use strict";

var CACHE_VERSION = "vesper-engine-v1";
var CORE = [
  "vesper_engine.html",
  "vesper_engine_data.js",
  "vesper_auth.js",
  "manifest.webmanifest",
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

  /* Navegaciones (abrir la app): red primero, cae al cache del motor. */
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req).catch(function () {
        return caches.match("vesper_engine.html");
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
