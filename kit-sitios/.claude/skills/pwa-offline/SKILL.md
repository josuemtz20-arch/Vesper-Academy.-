---
name: pwa-offline
description: >
  Hacer el sitio instalable y usable sin conexión: manifest.webmanifest, íconos, service worker con CORE,
  versión de caché por hash y página offline. Úsala al añadir archivos que deban abrir offline, cuando "el
  cambio no se ve" (caché vieja), al tocar sw.js o al preparar la app para Play Store.
---

# PWA y offline

## Piezas
- `manifest.webmanifest`: `id`, `name`, `short_name`, `start_url`, `scope`, `display: standalone`,
  `theme_color`, íconos 192/512 `any` + 512 `maskable` (el logo dentro del 80 % central).
- `sw.js`: precarga `CORE`; páginas = red primero con respaldo de caché; recursos = stale-while-revalidate.
- `assets/js/site.js` registra el SW (no en localhost).

## Reglas
- **Nunca subas `CACHE_VERSION` a mano.** `python3 _scripts/preflight.py --fix` reescribe el sufijo con el
  hash del contenido de CORE y marca error si una entrada de CORE no existe (el install se la tragaría en silencio).
- Archivo nuevo que debe abrir sin red → añádelo a `CORE`. Lo pesado (audio, video, PDFs) NO va en CORE.
- No interceptes terceros (Firebase, APIs, CDNs): `url.origin !== self.location.origin → return`.
- No caches peticiones `Range`/video: la Cache API no admite 206 y Safari deja de reproducir.
- En localhost el SW no intercepta: evita el clásico "edité el JS y no cambia nada".
- La página offline responde **200**: una TWA de Play Store se cierra con 404/5xx.
- Área privada: no metas páginas protegidas en CORE (quedarían en caché de un dispositivo compartido).

## "No veo mi cambio"
1. ¿Corriste `preflight --fix` y subiste? 2. DevTools → Application → Service Workers → Update.
3. Pages tarda ~1 min tras el deploy y su caché HTTP 10 min (por eso los `?v=`).
