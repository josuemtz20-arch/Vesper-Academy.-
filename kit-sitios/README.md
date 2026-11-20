# kit-sitios

Fábrica de sitios web estáticos con todo lo aprendido en Vesper Academy, automatizado.
Un `sitio.json` → un sitio completo, listo para GitHub Pages.

## Uso rápido
```bash
cp sitio.ejemplo.json mi-sitio.json      # edita nombre, dominio, páginas, colores, módulos
```
```bash
python3 scripts/crear_sitio.py mi-sitio.json --salida ../mi-sitio --git
```
```bash
python3 -m http.server 8000 --directory ../mi-sitio
```
O abre esta carpeta con Claude Code y pide: *"crea un sitio para …"* (skill `nuevo-sitio`).

Requisitos: Python 3.8+. Opcional: Pillow (`pip install pillow`) para generar íconos PNG y `og.png`.

## Qué genera
| Siempre | Opcional (`modulos` en sitio.json) |
|---|---|
| Páginas con SEO completo (title, description, canonical, OG, JSON-LD), menú, pie, CSP | `firebase`: login, allowlist `miembros/`, páginas `protegida`, `firestore.rules` |
| Diseño con tokens (claro/oscuro), responsive, animación accesible | `ia`: Cloudflare Worker con la API de Claude (key oculta, límites por IP) + `chat.js` |
| PWA: manifest, íconos, service worker offline con versión por hash | `play_store`: `twa-manifest.json` + `.well-known/assetlinks.json` |
| `sitemap.xml`, `robots.txt`, `404.html`, `CNAME`, aviso de privacidad | |
| Deploy a GitHub Pages filtrando archivos internos + reintento | |
| `_scripts/preflight.py` (corre también en CI), `CLAUDE.md`, skills en `.claude/skills/` | |

## Skills (`.claude/skills/`)
Propias, destiladas de Vesper: `nuevo-sitio` (orquestador, solo en el kit), `sitio-estatico-pages`,
`pwa-offline`, `seo-landing`, `firebase-acceso`, `proxy-ia-worker`, `app-play-store`, `preflight`.
Replicadas de tu cuenta: `smart-edit`, `skill-creator`, `deep-research`.
Del catálogo de Anthropic (Apache 2.0, con su LICENSE): `frontend-design`, `theme-factory`.

No se copiaron (no sirven para sitios o dependen de herramientas de la app): docx, pdf, pptx, xlsx,
docs, google-workspace, morning, import-memory, chrome-browser, built-in-browser, computer-use.

## Conectores de tu cuenta que complementan el kit
- **GitHub**: crear el repo y subir el sitio generado.
- **Canva / Adobe Express / Higgsfield**: logo, `og.png`, fotos e íconos reales (el kit genera
  versiones provisionales con la inicial).

## Estructura
```
kit-sitios/
├── .claude/skills/        skills (se copian al sitio generado, menos nuevo-sitio)
├── plantilla/base/        archivos de todo sitio ({{PLACEHOLDERS}})
├── plantilla/firebase|worker|twa/   módulos opcionales
├── scripts/crear_sitio.py generador
├── scripts/preflight.py   revisión (se copia a _scripts/ del sitio)
└── sitio.ejemplo.json     configuración de ejemplo
```
