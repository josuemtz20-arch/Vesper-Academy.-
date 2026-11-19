# Rendimiento web (sobre todo en teléfonos lentos)

## Índice
1. Medir primero
2. Objetivos
3. Animaciones y CPU en reposo (la causa nº 1 de "se traba")
4. Modo ligero automático
5. JavaScript
6. CSS
7. Imágenes y video
8. Fuentes
9. Caché, Service Worker y entrega
10. Casos reales (Vesper Academy, 2026-11)

---

## 1. Medir primero

```bash
node .claude/skills/web-development/scripts/perf_probe.js http://localhost:8000/ index.html app.html
```
Reporta por página: FCP, LCP, CLS, nº y total de tareas largas, tiempo de
script/estilo/layout, **CPU en reposo** (lo que gasta la página quieta) y
errores. Emula Pixel 5 con CPU x6 (≈ Android de gama baja) y red 3G rápida.

Herramientas complementarias: Lighthouse (`npx lighthouse URL --form-factor=mobile`),
DevTools → Performance con "CPU 6x slowdown", `document.getAnimations()` en
consola para ver qué anima, PageSpeed Insights para datos reales de campo (CrUX).

## 2. Objetivos (móvil, percentil 75)

| Métrica | Bueno |
|---|---|
| LCP (pintura del elemento principal) | < 2.5 s |
| INP (respuesta a la interacción) | < 200 ms |
| CLS (saltos de diseño) | < 0.1 |
| CPU en reposo | < 5 % |
| JS inicial (gzip) | < 170 KB idealmente; cada 100 KB cuesta ~1 s de parseo en gama baja |

## 3. Animaciones y CPU en reposo

Síntoma: la app "se mueve lento", se calienta el teléfono o baja la batería
aunque nadie la toque. Causa típica: decenas de `animation: … infinite`
corriendo a la vez, muchas fuera de pantalla.

Diagnóstico en consola:
```js
document.getAnimations().map(a => [a.animationName, a.effect.target]).length
```

Reglas:
- **Solo `transform` y `opacity`** en animaciones continuas (van en el
  compositor). Animar `filter`, `box-shadow`, `background-position`,
  `width/height/top/left` repinta cada cuadro: evítalo en bucles infinitos.
  Para un "brillo que late", anima la `opacity` de un `::after` que ya tiene
  la sombra, en lugar de animar la sombra.
- **Pausa lo que no se ve.** Observa los elementos animados con
  `IntersectionObserver` y pausa sus animaciones infinitas al salir de
  pantalla:
  ```js
  const io = new IntersectionObserver(es => es.forEach(e => {
    for (const a of e.target.getAnimations({ subtree: true })) {
      if (a.effect.target !== e.target) continue;
      if (a.effect.getComputedTiming().iterations !== Infinity) continue;
      e.isIntersecting ? a.play() : a.pause();
    }
  }), { rootMargin: "120px" });
  // animationstart burbujea: un listener en <head> descubre todo lo que anima
  document.addEventListener("animationstart", e => io.observe(e.target), true);
  ```
  (Versión completa, que solo reanuda lo que pausó y respeta indicadores de
  carga: `vesper_prefs.js` de Vesper Academy.)
- `backdrop-filter: blur()` es carísimo en GPU débiles: úsalo poco y nunca en
  capas grandes que se desplazan.
- `will-change` solo en lo que va a animar ya; cada uno crea una capa y
  consume memoria.
- Respeta `prefers-reduced-motion` y ofrece un ajuste propio.
- `content-visibility: auto` + `contain-intrinsic-size` en secciones largas
  bajo el pliegue: el navegador no las pinta hasta que se acercan.

## 4. Modo ligero automático

Detecta equipos débiles y quita decoración, no funcionalidad:
```js
const n = navigator, weak =
  (n.connection && n.connection.saveData) ||
  (n.deviceMemory && n.deviceMemory <= 2) ||
  (n.hardwareConcurrency && n.hardwareConcurrency <= 2);
```
Además, mide los fps reales tras cargar (2 s con `requestAnimationFrame`;
si el promedio de cuadro > 40 ms → < 25 fps) y recuerda la decisión unos días
para que el modo no vaya y venga. En modo ligero: pausa animaciones
decorativas, quita `backdrop-filter`, usa imágenes fijas en vez de WebP/GIF
animados, sin confeti. Deja siempre un selector manual
(Automático / Ligero / Completo).

## 5. JavaScript

- `defer` en todos los `<script>` que no sean imprescindibles antes de pintar;
  `async` para independientes (analítica).
- **Minifica en el despliegue** (esbuild es instantáneo):
  ```bash
  npx esbuild@0.24.0 archivo.js --minify --legal-comments=none > out.js
  ```
  Con scripts clásicos (no módulos) esbuild no renombra los globales de nivel
  superior, así que no rompe llamadas entre archivos. Valida igual: carga
  todas las páginas antes/después y compara errores de consola.
- Divide por ruta (code splitting / `import()` dinámico); carga bajo demanda
  lo que no se usa en la primera pantalla (editores, gráficos, mapas).
- Datos grandes (bancos de preguntas, transcripciones) como JSON que se pide
  cuando se necesita, no como JS que se parsea al arrancar.
- Tareas largas (> 50 ms): trocéalas (`scheduler.yield()` / `setTimeout(0)`),
  evita layouts forzados (leer `getBoundingClientRect` y luego escribir
  estilos dentro del mismo bucle).
- Listeners de `scroll`/`resize`: `{ passive: true }` y agrupados con
  `requestAnimationFrame`; mejor aún, `IntersectionObserver`/`ResizeObserver`.

## 6. CSS

- Minifica en el despliegue (esbuild `--loader=css --minify`).
- Una hoja enorme global se recalcula en cada cambio de clase: separa por
  página y elimina reglas muertas (PurgeCSS / coverage de DevTools).
- Selectores simples; evita `*` con propiedades caras salvo en modos
  especiales (reduce-motion, ligero).

## 7. Imágenes y video

- Sirve al tamaño mostrado × 2 (DPR). Un avatar de 84 px no necesita un
  archivo de 1024 px.
- WebP (o AVIF) con calidad 75–82; JPEG progresivo q≈80 si hay que mantener
  formato. Con Python: `Image.save(p, "WEBP", quality=80, method=6)`.
- `width`/`height` siempre (evita CLS), `loading="lazy"` y `decoding="async"`
  bajo el pliegue, `fetchpriority="high"` en la imagen LCP.
- `srcset`/`sizes` para imágenes que cambian de tamaño entre móvil y escritorio.
- Video de fondo: `muted playsinline preload="none"` con `poster`; no lo
  autorreproduzcas en `saveData`.

## 8. Fuentes

- Máximo 2–3 familias; pide solo los pesos usados; `display=swap`.
- `preconnect` a `fonts.gstatic.com`; mejor aún, autoaloja las WOFF2.
- Fuentes de fallback ajustadas (`size-adjust`) para que el cambio no mueva el
  layout.

## 9. Caché, Service Worker y entrega

- Recursos con hash en el nombre → `Cache-Control: max-age=31536000, immutable`.
  HTML → `no-cache`. (GitHub Pages fija `max-age=600`; usa `?v=hash` para
  forzar actualización.)
- Service Worker: precachea solo el cascarón; stale-while-revalidate para JS/CSS;
  versiona el caché y bórralo en `activate`. No caches respuestas 206 (video).
- Compresión: Brotli > gzip (Cloudflare/Netlify/Vercel lo hacen).
- CDN delante del origen (Cloudflare) para latencia y caché en el borde.

## 10. Casos reales (Vesper Academy, 2026-11)

Medido con `perf_probe.js` (CPU x6) en `leccion.html`:

| Cambio | Resultado |
|---|---|
| 42 animaciones infinitas activas en el mapa | 57 % de CPU en reposo |
| Pausar las que están fuera de pantalla | 32 % |
| + pausar las que animan `filter`/`box-shadow` | 16 % |
| Modo ligero (todas las decorativas en pausa) | 0 % |
| Minificar JS/CSS en el deploy | leccion_app.js 118→77 KB gzip; leccion.css 71→45 KB |
| Gato de respaldo 1024 px/711 KB mostrado a 84 px → 256 px | 22 KB |
| Retratos PNG 512 px opacos (~280 KB) → WebP q82 | ~25 KB cada uno |
