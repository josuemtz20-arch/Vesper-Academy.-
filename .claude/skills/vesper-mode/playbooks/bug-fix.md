# Bug fix

1. Reproduce: anota pasos exactos, página, dispositivo (móvil/escritorio), con o sin sesión. Si no se reproduce, no arregles: reporta qué probaste.
2. Localiza el archivo con `README.md` (ojo con los nombres duplicados).
3. Rastrea hasta la causa raíz: el primer punto donde el estado se volvió incorrecto. Escríbelo en una frase.
4. Si es dato de lección y el validador no lo atrapó, agrega primero la comprobación a `tools/check_lessons.mjs` y confirma que falla.
5. Arregla con el cambio más pequeño, extendiendo el código existente.
6. Verifica: repite el paso 1 y confirma que ya no pasa; corre `node tools/check_lessons.mjs`; revisa que no rompiste la página vecina que comparte el script.
7. Si tocaste un archivo de `CORE` en `sw.js`, corre `python _scripts/preflight.py --fix` (o di que falta).
8. Reporte: causa, arreglo, cómo se verificó.
