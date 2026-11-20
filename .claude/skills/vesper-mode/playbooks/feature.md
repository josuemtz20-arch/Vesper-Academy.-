# Feature

1. Objetivo en una línea y el alcance mínimo que lo cumple. Si el pedido es grande, propón la primera rebanada útil.
2. Busca dónde ya vive algo parecido (página, módulo `vesper_*.js`) y extiéndelo. Un archivo nuevo solo si no hay dónde.
3. Nombra la forma de los datos: qué se guarda, dónde (localStorage, Firestore, archivo de datos) y quién puede escribirlo.
4. Si toca Firestore, sigue también `firestore-rules`. Si toca el chat o exámenes, `worker`.
5. Implementa. Usa los tokens de `vesper_theme.js` y respeta el modo minimalista de `vesper_style.js`. Textos en español para alumnos de `leccion.html`.
6. Archivo nuevo en la raíz: agrega `!/archivo` a `.gitignore`; si es público y lo usa la PWA, agrégalo a `CORE` en `sw.js`; si es interno, a `INTERNOS` en `.github/pages_filter.sh`.
7. Verifica en navegador real: móvil y escritorio, con y sin sesión, tema claro y oscuro. Corre `node tools/check_lessons.mjs`.
8. Reporte: qué cambia para el alumno, qué se verificó, qué falta.
