# Vesper Academy

Sitio de una academia de inglés (proyecto escolar), servido como **estático**
por GitHub Pages en `vesperacademy.com`. Es una PWA (manifiestos + service
worker) con datos y control de acceso en **Firebase / Firestore**.

Este README es el **mapa del repo**: qué página es cuál y con qué scripts
funciona. Los nombres mezclan español e inglés por historia; usa esta tabla para
no editar el archivo equivocado.

## Modelo de seguridad (importante)

Todo el "candado" en HTML/JS es **cosmético**: al ser un sitio estático,
cualquiera puede ver el código fuente. La seguridad **real** vive en
`firestore.rules` (reglas del lado del servidor). Consecuencias:

- La **clave web de Firebase** en `vesper_auth.js` es **pública a propósito**
  (así funcionan las apps web de Firebase); no es un secreto filtrado.
- Manuales, libros, exámenes y calificaciones están protegidos por reglas de
  Firestore, no por el gate del navegador.
- **Integridad de calificaciones:** los intentos de examen (`exam_results`) los
  escribe el propio alumno al autocalificarse, así que son **práctica**. La nota
  de registro de Exámenes/Lecciones la **confirma el profesor**
  (`gradebook.examsGrade` / `lessonsGrade`) y `computeFinal` usa solo datos del
  profesor. Ver `FIRESTORE_EXAM_RESULTS_RULES.md` y `FIRESTORE_GRADEBOOK_RULES.md`.

## Acceso / allowlist

La **fuente de verdad** del acceso es la allowlist en Firestore
(`students/{correo}`, `teachers/{correo}`). Se gestiona con la herramienta local
`_scripts/upload_manuals.py` (queda **fuera del repo público** por la
`.gitignore`; es tooling de admin). La lista de hashes `approvedEmailHashes` en
`vesper_auth.js` es solo **respaldo legado** si Firestore no responde. Ver
`access_admin.html`.

## Páginas principales

| Página | Qué es | Scripts / datos clave |
|---|---|---|
| `index.html` | Landing de marketing | inline |
| `login.html` | Acceso (Firebase Auth) | `vesper_auth.js` |
| `leccion.html` | **App de lecciones gratis** (español, sin cuenta, la PWA principal) | `vesper_lessons.js`, `vesper_content_pack.js`, `vesper_expansion*.js`, `vesper_themes_pack*.js`, `vesper_toefl_pack.js`, `vesper_levels_pack.js`, `vesper_boss_exams.js`, `vesper_level_exams.js`, `vesper_vocab_dens.js` + módulos del motor |
| `lesson.html` | **Reproductor de lecciones de la audioteca** (inglés) — NO confundir con `leccion.html`; se llega desde `audio_library.html` | `vesper_basics_lesson_data.js`, `vesper_reading_data.js`, `vesper_custom_transcripts.js`, `vesper_audio_data.js`, `vesper_lesson_images.js`, `vesper_covers.js` |
| `vesper_engine.html` | Generador de prompt del tutor (herramienta del profesor) | `vesper_engine_data.js` |
| `materiales.html` | Portal del alumno (tras login) | `vesper_nav.js` |
| `exam.html` | Examen por curso (login-gated; claves en Firestore) | — |
| `examen-ingles-gratis.html` | Landing SEO del examen gratis | — |
| `book_placement.html` | Examen de ubicación (sin cuenta) | inline |
| `portal_profesores.html` | Portal del profesor | `vesper_auth.js` |
| `portal_calificaciones.html` | Resultados de exámenes (profe) | `vesper_results.js` |
| `portal_boleta.html` | Boleta / captura de notas (profe) | `vesper_gradebook.js` |
| `mi_boleta.html` | Boleta del alumno | `vesper_gradebook.js` |
| `manual.html` / `libro.html` | Lector de manuales / libros (Firestore) | `vesper_auth.js` |
| `access_admin.html` | Herramienta de administración de accesos | `vesper_auth.js` |

> **Nota de nombres duplicados:** `leccion.html`≠`lesson.html`,
> `mi_boleta.html`≠`portal_boleta.html` (alumno vs profesor),
> `exam.html`≠`examen-ingles-gratis.html` (examen real vs landing SEO).

## PWA

Dos manifiestos, a propósito: `manifest_lecciones.webmanifest`
(`start_url: leccion.html`, la app del alumno — la usan `index.html`,
`leccion/chat/liga/tienda/configuracion` y el TWA de `twa-manifest.json`) y
`manifest.webmanifest` (`start_url: vesper_engine.html`, la herramienta del
profesor). El service worker es `sw.js`: al cambiar cualquier archivo de su
lista `CORE` hay que invalidar el cache, pero **eso ya no se hace a mano** —
`python _scripts/preflight.py --fix` reescribe el sufijo de `CACHE_VERSION`
(el sha256 del contenido de `CORE`) y el hook `pre-push` lo verifica.

## `.gitignore`

Modelo de **whitelist**: por defecto todo es privado; solo se publican los
archivos con `!/…`. Los generadores (`*.py`), bancos de datos con claves de
respuesta, `_scripts/` y `_archive/` quedan **locales a propósito**.
