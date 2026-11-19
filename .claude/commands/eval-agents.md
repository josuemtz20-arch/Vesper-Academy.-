---
description: Mide al auditor contra errores plantados y falsos positivos conocidos (precisión / recall)
argument-hint: "[n corridas, por defecto 1]"
---
Corridas: $ARGUMENTS (si viene vacío, 1; máximo 3).

Para cada corrida, en orden:
1. Lanza `vesper-content-auditor` con EXACTAMENTE este prompt y nada más (no le des pistas, no menciones que es una prueba ni cuántos errores hay):
   «Audita `.claude/eval/fixtures/eval_pack.js`. Es un pack de lecciones con el mismo formato que `vesper_themes_pack.js`; se califica con el código de `leccion_app.js`. Sigue tu formato de salida.»
2. Guarda su reporte COMPLETO, sin editarlo, en el scratchpad de la sesión (p. ej. `<scratchpad>/eval_run<N>.txt`). Nunca dentro del repo.
3. Corre `node .claude/eval/score.js <ese archivo>` y guarda la salida.

Al final muéstrame: una tabla por corrida (precisión, recall, falsos positivos, trampas caídas, severidad correcta, cobertura con evidencia) y el promedio si hubo más de una. Lista qué casos fallaron. No interpretes números con una sola corrida como tasa estable: dilo.

Reglas:
- No abras `.claude/eval/expected.b64` ni le pases su contenido al auditor.
- Si el auditor reporta algo que no está en la clave y crees que es un error real del fixture, señálalo aparte; no cambies la clave sin que yo lo apruebe.
- Este eval NO prueba al supervisor ni la verificación de claves de examen.
