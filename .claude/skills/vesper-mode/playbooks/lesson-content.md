# Lesson content

Para `leccion.html` (packs `vesper_lessons.js`, `vesper_content_pack.js`, `vesper_expansion*.js`, `vesper_themes_pack*.js`, `vesper_toefl_pack.js`, `vesper_levels_pack.js`, `vesper_advanced_pack.js`).

1. Lee el esquema en la cabecera de `vesper_lessons.js`. Copia la forma de una lección existente del mismo `tipo` y nivel.
2. Elige el pack correcto por tema/nivel. Un id nuevo va también en el `ORDER` de ese pack, o queda inalcanzable.
3. Audio: toda ruta `audio` debe existir en `assets/audio/` y estar publicada (whitelist en `.gitignore`).
4. Revisa el inglés como profesor: nivel CEFR correcto, una sola respuesta correcta, distractores plausibles, explicación en español clara.
5. Corre `node tools/check_lessons.mjs`. Debe salir sin errores. Si encontraste un tipo de error que no detecta, agrégale la comprobación.
6. Abre la lección en `leccion.html` y complétala entera, incluida una respuesta incorrecta.
7. Si cambiaste muchas lecciones, hazlo con un script y deja el script, no edites a mano 50 veces.
