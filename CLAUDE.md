# CLAUDE.md — Vesper Academy

Guía para agentes de IA trabajando en este repositorio. Lee esto antes de tocar cualquier archivo.

---

## Lo más importante: el `.gitignore` usa whitelist

```
/*             ← Todo está ignorado por defecto
!index.html    ← Solo se publica lo que está explícitamente listado
!vesper_auth.js
...
```

**Regla de oro:** Si añades un archivo nuevo al repo y quieres que se publique, debes agregarlo explícitamente al `.gitignore`. Si no, git lo ignorará aunque esté en el directorio.

**Nunca agregues al repo:** manuales de profesor (`*_manual.pdf`), claves de respuestas, scripts Python (`*.py`), `exam.html`, ni archivos de la carpeta `_scripts/` o `_archive/`. Esos se quedan locales a propósito.

---

## Archivos de datos: NO editar a mano

Estos archivos son auto-generados por scripts Python que viven solo en la máquina local del dueño del repo. Editarlos a mano rompe la siguiente regeneración:

- `vesper_audio_data.js`
- `vesper_reading_data.js`
- `vesper_basics_audio_data.js`
- `vesper_basics_lesson_data.js`
- `vesper_custom_transcripts.js`
- `vesper_covers.js`
- `vesper_lesson_images.js`
- `vesper_engine_data.js`

Si el usuario te pide modificar el **contenido** de lecciones, audios o libros, la respuesta correcta es regenerar el archivo con el script Python, no editar el `.js` directamente (a menos que sea un fix puntual urgente y el usuario lo apruebe explícitamente).

---

## Firebase: ya está integrado, no lo "instales"

Firebase se carga como CDN en `vesper_auth.js`:
```js
loadScript("https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js")
```

No hay `package.json`, no hay `node_modules`, no hay build. El proyecto es HTML + JS vanilla puro. No hagas `npm init`, no agregues bundlers, no instales dependencias.

---

## Cómo funciona la autenticación

`vesper_auth.js` se carga en el `<head>` de cada página protegida. Verifica sesión contra Firebase Auth y comprueba que el hash SHA-256 del correo esté en `approvedEmailHashes`.

Para dar acceso a alguien nuevo:
1. Ve a `access_admin.html` → genera el hash del correo
2. Agrega el hash a `approvedEmailHashes` en `vesper_auth.js`
3. Si es docente, también agrega su entrada en `teachers`
4. Commit + push

Las páginas públicas (no requieren login) están en `CONFIG.publicPages`:
```
index.html, login.html, access_admin.html, book_placement.html, onboarding.html
```

---

## Ramas y despliegue

- `main` → GitHub Pages → `vesperacademy.com` (producción)
- Las ramas `claude/*` son ramas de trabajo; los cambios llegan a producción via PR a `main`
- No hay CI/CD, no hay build step. Push a `main` = deploy inmediato

---

## Assets y tamaños

- 204 MP3 en `assets/audio/` — no los regeneres ni reemplaces sin instrucción explícita
- 61 JPG en `assets/images/lessons/` — portadas de lección generadas con IA
- No subas imágenes sin comprimir; el repo ya pesa considerable por los MP3

---

## Vesper Engine PWA

`vesper_engine.html` es instalable como app. Si modificas cualquiera de estos archivos, sube `CACHE_VERSION` en `sw.js`:
- `vesper_engine.html`
- `vesper_engine_data.js`
- `vesper_auth.js`
- `manifest.webmanifest`
- Cualquier icono en `assets/images/`

---

## Patrones de código

- Vanilla JS, sin transpilación, sin módulos ES. Usa `var`, `function`, y callbacks para mantener consistencia con el resto del código.
- Los estilos van inline o en el `<style>` del mismo HTML. No hay CSS global de página (excepto `assets/css/`).
- No rompas la compatibilidad con Safari móvil — la plataforma tiene usuarios en iPhone.
