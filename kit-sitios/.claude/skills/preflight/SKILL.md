---
name: preflight
description: >
  Revisión automática antes de commit/publicar: enlaces rotos, metadatos SEO, sitemap, service worker,
  versiones ?v= y placeholders. Úsala antes de cada commit, cuando el workflow falle en "Revisar el sitio"
  o cuando el usuario pregunte si el sitio está listo.
---

# Preflight

```bash
python3 _scripts/preflight.py --fix
```
- `--fix` actualiza `?v=<hash>` de CSS/JS locales y `CACHE_VERSION` del SW. Sin `--fix` (como en CI) solo
  revisa y falla si algo está desactualizado: así nunca se publica un SW con caché vieja.
- Salida 1 = errores: enlace/recurso local roto, falta lang/title/description/viewport/canonical, placeholder
  `{{...}}`, entrada de sitemap o de CORE inexistente.
- Avisos: página indexable fuera del sitemap, description fuera de 50–160, varios `<h1>`, íconos u og.png
  faltantes, huella de assetlinks sin poner.

## Flujo
1. Corre con `--fix`. 2. Corrige cada ERROR en su origen (no lo silencies quitando la comprobación).
3. Revisa avisos y di al usuario los que dependen de él. 4. Commit incluyendo los archivos que `--fix` tocó.

Para ver la página de verdad: `python3 -m http.server 8000` + Playwright a 1280 y 390 px, sin errores de consola.
