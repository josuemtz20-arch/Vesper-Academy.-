# {{NOMBRE}} — instrucciones para Claude

Sitio **estático** (HTML/CSS/JS sin build) publicado en GitHub Pages en
`{{DOMINIO}}`. Generado con `kit-sitios`; la configuración original está en
`sitio.json`.

## Reglas
- Edición quirúrgica (skill `smart-edit`): no reescribas archivos enteros.
- Antes de cada commit: `python3 _scripts/preflight.py --fix` (sube la versión
  del caché del SW, revisa enlaces rotos, metadatos SEO y sitemap). Si falla,
  no se publica: el workflow lo corre también.
- Página nueva: sigue la skill `seo-landing` (title, description, canonical,
  OG, entrada en `sitemap.xml`, enlace en el menú de TODAS las páginas).
- Archivo nuevo que deba funcionar offline: añádelo a `CORE` en `sw.js`.
- Archivo interno (docs, scripts, claves): que coincida con `INTERNOS` en
  `.github/pages_filter.sh` o se publicará.
- La seguridad real va en el servidor (reglas de Firestore, Worker). Todo lo
  del navegador es público y saltable.
- Nada de secretos en el repo: API keys en `wrangler secret put`, keystores
  fuera de git.

## Skills de este proyecto (`.claude/skills/`)
smart-edit · sitio-estatico-pages · pwa-offline · seo-landing ·
firebase-acceso · proxy-ia-worker · app-play-store · preflight
