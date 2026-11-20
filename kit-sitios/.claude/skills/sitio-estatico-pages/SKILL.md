---
name: sitio-estatico-pages
description: >
  Publicar y mantener un sitio estático en GitHub Pages con dominio propio: workflow de Actions que filtra
  archivos internos, reintento del deploy, CNAME/DNS, 404, caché de Pages. Úsala al configurar el
  despliegue, cuando un deploy falle, al añadir archivos que no deben publicarse o al conectar un dominio.
---

# Sitio estático en GitHub Pages

## Arquitectura
- Sin build: lo que está en git es el sitio. `.github/workflows/pages.yml` en cada push a `main`:
  preflight → `pages_filter.sh _site` → upload → deploy (con un reintento).
- **Lo que no se publica** se decide en `INTERNOS` de `.github/pages_filter.sh` (regex sobre la ruta).
  Docs `.md`, `firestore.rules`, `worker/`, `_scripts/`, `.claude/`, `sitio.json` quedan en git pero no en
  el sitio. Al añadir un archivo interno nuevo, amplía la regex y la comprobación final del script.
- Probar el filtro sin publicar: `bash .github/pages_filter.sh _site_prueba`.

## Gotchas aprendidos
- `upload-pages-artifact@v3`, no v4: v4 descarta archivos ocultos y rompe `.well-known/assetlinks.json`.
- `deploy-pages` a veces se queda en `syncing_files` y vence a los 10 min (máximo de GitHub). Es lentitud
  de GitHub: el workflow espera 60 s y redepliega el mismo artefacto. No subas el timeout: se ignora.
- Pages manda `Cache-Control: max-age=600`. CSS/JS con `?v=<hash>` (lo pone `preflight --fix`) para que
  el cambio se vea al instante; el SW usa `cache: "reload"` al precargar.
- `404.html` se sirve desde cualquier ruta: usa rutas absolutas (`/assets/...`) solo ahí.
- `.nojekyll` evita que Jekyll ignore carpetas con `_`.

## Dominio
1. `CNAME` en la raíz con el dominio (sin https).
2. DNS: `A` del dominio raíz → 185.199.108.153 / .109.153 / .110.153 / .111.153; `CNAME www → <usuario>.github.io`.
3. Settings → Pages: Source = GitHub Actions, Custom domain, Enforce HTTPS (tarda hasta 24 h en emitir el certificado).

## Seguridad
Todo lo publicado es público. Nada de secretos, listas de correos ni respuestas de examen en el repo
publicado; eso va en Firestore con reglas o en un Worker.
