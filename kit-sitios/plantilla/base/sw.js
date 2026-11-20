/* Service worker: precarga CORE y sirve stale-while-revalidate.
   CACHE_VERSION NO se sube a mano: `python3 _scripts/preflight.py --fix`
   reescribe el sufijo con el hash del contenido de CORE y avisa si alguna
   entrada de CORE no existe (el install se la tragaría en silencio). */
"use strict";
var CACHE_VERSION = "{{NOMBRE_CORTO_SLUG}}-v1-00000000";
var CORE = [
{{CORE}}
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_VERSION).then(function (cache) {
      /* cache:"reload" salta el caché HTTP (GitHub Pages manda max-age=600):
         sin eso se precachean archivos viejos bajo la versión nueva. */
      return Promise.all(CORE.map(function (url) {
        return cache.add(new Request(url, { cache: "reload" })).catch(function () {});
      }));
    }).then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys.map(function (k) { if (k !== CACHE_VERSION) return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

function offlinePage() {
  var html = '<!DOCTYPE html><html lang="{{IDIOMA}}"><head><meta charset="utf-8">' +
    '<meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex">' +
    '<title>{{T_SIN_CONEXION}}</title><style>body{font-family:system-ui;display:grid;place-items:center;min-height:100vh;margin:0;' +
    'background:{{COLOR_FONDO}};color:{{COLOR_TEXTO}};text-align:center;padding:16px}button{padding:.7em 1.3em;border-radius:99px;border:0;' +
    'background:{{COLOR_PRIMARIO}};color:#fff;font-weight:600}</style></head><body><div><h1>{{T_SIN_CONEXION}}</h1>' +
    '<button type="button" onclick="location.reload()">{{T_REINTENTAR}}</button></div>' +
    '<script>addEventListener("online",function(){location.reload()})<\/script></body></html>';
  /* 200 a propósito: una app TWA de Play Store se cierra con 404/5xx. */
  return new Response(html, { status: 200, headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" } });
}

self.addEventListener("fetch", function (event) {
  var req = event.request;
  if (req.method !== "GET") return;
  var url = new URL(req.url);
  if (url.origin !== self.location.origin) return;              /* terceros: siempre red */
  if (req.headers.has("range") || req.destination === "video") return; /* la Cache API no admite 206 */
  if (/^(localhost|127\.0\.0\.1)$/.test(url.hostname)) return;   /* en desarrollo manda la red */

  if (req.mode === "navigate") {
    /* Páginas: red primero (contenido fresco), caché si no hay red. */
    event.respondWith(
      fetch(req).then(function (res) {
        if (res.ok) { var copy = res.clone(); caches.open(CACHE_VERSION).then(function (c) { c.put(req, copy); }); }
        return res;
      }).catch(function () {
        return caches.match(req, { ignoreSearch: true }).then(function (hit) { return hit || offlinePage(); });
      })
    );
    return;
  }

  /* Recursos: stale-while-revalidate. */
  event.respondWith(
    caches.match(req, { ignoreSearch: true }).then(function (hit) {
      var net = fetch(req).then(function (res) {
        if (res.ok && res.type === "basic") { var copy = res.clone(); caches.open(CACHE_VERSION).then(function (c) { c.put(req, copy); }); }
        return res;
      }).catch(function () { return hit; });
      return hit || net;
    })
  );
});
