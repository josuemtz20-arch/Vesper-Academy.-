# Vesper Academy — instrucciones para Claude

Antes de editar, lee `README.md`: es el mapa de qué archivo es qué
(`leccion.html` ≠ `lesson.html`, `mi_boleta.html` ≠ `portal_boleta.html`).
Para trabajo con rigor usa `/vesper-mode`.

## Reglas que no se negocian

- **Extiende, no reemplaces.** Mejora el código que ya existe con el cambio
  más pequeño que resuelva el problema. No reescribas una página, sección o
  módulo desde cero salvo que Josue lo pida explícitamente.
- **`main` = producción.** Cada push a `main` publica vesperacademy.com
  (`.github/workflows/pages.yml`). Trabaja en una rama y abre PR.
- **`.gitignore` es una whitelist.** Todo archivo nuevo en la raíz queda
  ignorado hasta que agregues su línea `!/archivo`. Si creas un archivo y
  `git status` no lo muestra, es esto.
- **Lo que está en git no es lo que se sirve.** `.github/pages_filter.sh`
  quita `*.md`, `*.rules`, `worker/`, `.claude/`, `tools/`. Un archivo interno
  nuevo que deba quedar fuera del sitio va en `INTERNOS`.
- **La seguridad real vive en `firestore.rules`.** Los candados en HTML/JS
  son cosméticos. Nunca confíes en el cliente para acceso, notas o pagos.
- **Secretos.** La API key de Anthropic vive solo en los secretos del Worker
  (`wrangler secret put`). La clave web de Firebase en `vesper_auth.js` es
  pública a propósito. Nunca pongas claves de respuesta de exámenes en
  archivos publicados: la fuente vive en `_scripts/exams/` (local).
- **Archivos generados no se editan a mano:** `vesper_*_exams.js` (de
  `split_exams.js`), `vesper_book_index.js`, y el sufijo de `CACHE_VERSION`
  en `sw.js` (lo escribe `python _scripts/preflight.py --fix`).

## Pausa y pide confirmación antes de

- Push o merge a `main` (es un deploy).
- Publicar reglas de Firestore o correr scripts de `_scripts/` con `--apply`.
- `wrangler deploy` o `wrangler secret put`.
- Cualquier cosa con pagos (Stripe/Conekta), facturación (CFDI/SAT), textos
  legales (aviso de privacidad, términos, reembolsos) o datos de alumnos.
- Borrar archivos, lecciones o colecciones.

Todo lo demás (leer, editar en rama, correr validadores) procede sin preguntar.

## Verificar antes de decir "listo"

- Lecciones: `node tools/check_lessons.mjs` (también corre en CI antes de publicar).
- Si tocaste un archivo de la lista `CORE` de `sw.js`: `python _scripts/preflight.py --fix`.
- UI: ábrela y mírala (móvil y escritorio). "Compila" no es verificar.
- Si algo no se pudo verificar, dilo y por qué.

## Marca

Inria Serif (títulos), Inter (texto), Dark Knight `#1B1B2F`, oro `#C9A84C`.
Hay varias paletas elegibles por el alumno: usa los tokens de `vesper_theme.js`
(no colores fijos), y `vesper_style.js` para el eje "con diseño" / "minimalista".
