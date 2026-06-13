# Vesper Academy

Plataforma educativa de inglés publicada en **GitHub Pages** → [vesperacademy.com](https://vesperacademy.com).

Sitio estático sin framework ni build step. Todo el front es HTML + JS vanilla. El estado persiste en **Firebase** (Auth + Firestore).

---

## Mapa de páginas

| Página | Ruta | Acceso |
|---|---|---|
| Landing | `index.html` | Pública |
| Login | `login.html` | Pública |
| Bienvenida alumno | `onboarding.html` | Pública |
| Examen de nivelación | `book_placement.html` | Público |
| Hub de materiales | `materiales.html` | Alumno aprobado |
| Biblioteca de audio | `audio_library.html` | Alumno aprobado |
| Visor de lección | `lesson.html` | Alumno aprobado |
| Visor de libro | `libro.html?id=<book_id>` | Alumno aprobado |
| Portal de profesores | `portal_profesores.html` | Docente aprobado |
| Visor de manual | `manual.html` | Docente aprobado |
| Vesper Engine (PWA) | `vesper_engine.html` | Docente aprobado |
| Admin hashes | `access_admin.html` | Pública (solo genera hashes) |

---

## Arquitectura

```
vesperacademy.com (GitHub Pages)
│
├── vesper_auth.js          ← Carga Firebase Auth, verifica sesión en cada página protegida
│
├── Datos de contenido (auto-generados, NO editar a mano):
│   ├── vesper_audio_data.js          ← VESPER_DATA      (lecciones de audio, cursos avanzados)
│   ├── vesper_reading_data.js        ← VESPER_READING   (transcripciones de lectura)
│   ├── vesper_basics_audio_data.js   ← BASICS_DATA      (cursos Basics)
│   ├── vesper_basics_lesson_data.js  ← BASICS_LESSONS   (vocabulario Basics)
│   ├── vesper_custom_transcripts.js  ← CUSTOM_TRANSCRIPTS
│   ├── vesper_covers.js              ← VesperCovers     (portadas de libros)
│   ├── vesper_lesson_images.js       ← VESPER_LESSON_ART (imágenes de lección)
│   └── vesper_engine_data.js         ← VesperEngine     (syllabus para el motor de prompts)
│
└── Firebase (Firestore)
    ├── studentbooks/   ← PDFs de libros (solo cuentas aprobadas pueden leer)
    └── manuals/        ← PDFs de manuales de profesor (solo docentes aprobados)
```

Los libros y manuales **no están en el repo**. Viven en Firestore con reglas server-side. Se resuben con `_scripts/upload_manuals.py` (local).

---

## Control de acceso

Flujo completo:

1. El visitante llega a cualquier página protegida.
2. `vesper_auth.js` carga Firebase Auth vía CDN.
3. Si no hay sesión → redirige a `login.html`.
4. Si hay sesión pero el correo no está en `approvedEmailHashes` → redirige con `?pending=1`.
5. Si está aprobado → muestra la página + chip de "Cerrar sesión".

**Para dar acceso a un alumno nuevo:**
1. Abre `access_admin.html` (genera el hash SHA-256 del correo).
2. Agrega el hash a `approvedEmailHashes` en `vesper_auth.js`.
3. Haz commit + push.

**Para dar acceso a un docente nuevo:**
1. Genera ambos hashes en `access_admin.html` (correo + contraseña del maestro).
2. Agrega las dos entradas en `vesper_auth.js` → sección `approvedEmailHashes` y `teachers`.
3. Haz commit + push.

---

## Libros disponibles (`libro.html?id=`)

| ID | Título aprox. |
|---|---|
| `core_basics_lvl1` – `lvl4` | Core Basics niveles 1–4 |
| `core_grammar_lvl1` – `lvl3` | Core Grammar niveles 1–3 |
| `core_practice_lvl1` – `lvl6` | Core Practice niveles 1–6 |
| `daily_life_vol0` – `vol2` | Daily Life volúmenes 0–2 |
| `exam_prep`, `exam_prep_vol2` | Exam Prep |
| `diagnostic_advanced` | Diagnóstico avanzado |
| `cabin_crew` | Cabin Crew English |
| `cci1` | CCI nivel 1 |
| `political_english` | Political English |

---

## Assets

- `assets/audio/` — 204 MP3 de lecciones + 2 de examen
- `assets/images/lessons/` — 61 JPG (portadas de lección, generadas con IA)
- `assets/images/` — Iconos PWA (SVG + PNG) y favicon

---

## PWA (Vesper Engine)

`vesper_engine.html` es instalable como app. `sw.js` cachea solo el cascarón del Engine para uso offline. Si cambias cualquiera de los archivos cacheados, sube `CACHE_VERSION` en `sw.js`.

---

## Publicar cambios

```bash
git add <archivos>
git commit -m "descripción del cambio"
git push origin main
```

GitHub Pages despliega automáticamente desde `main`. No hay CI ni build step.

---

## Scripts locales (no están en el repo)

Los archivos `*.js` de datos son auto-generados. Los scripts viven solo en local:

| Script | Genera |
|---|---|
| `export_reading_data.py` | `vesper_reading_data.js` |
| `build_basics_lesson_data.py` | `vesper_basics_lesson_data.js` |
| `build_custom_transcripts.py` | `vesper_custom_transcripts.js` |
| `upload_manuals.py` | (sube PDFs a Firestore) |

Si necesitas regenerar un archivo de datos, ejecuta el script correspondiente en local y haz commit del `.js` resultante.
