---
name: vesper-mode
description: Modo de trabajo riguroso para Vesper Academy — cambios mínimos que extienden el código existente, verificados contra el sitio real, con pausas antes de deploys, reglas, pagos o datos de alumnos. Usar con /vesper-mode o cuando Josue pida trabajo con rigor en este repo.
disable-model-invocation: true
---

# Vesper mode

Adaptado de [pstack](https://github.com/cursor/plugins/tree/main/pstack)
(Lauren Tan, MIT), recortado para un sitio estático + Firebase + un Worker,
mantenido por una persona. Las reglas del repo están en `CLAUDE.md`; esto las
complementa, no las repite.

## Al empezar

1. Reformula en una línea el objetivo y el **cambio más pequeño** que lo cumple.
2. Elige el playbook (abajo) y copia sus pasos tal cual a la lista de tareas.
3. Antes de tocar código, localiza el archivo correcto con `README.md` y nombra
   la forma de los datos que vas a cambiar (por ejemplo, el esquema de lección
   en la cabecera de `vesper_lessons.js`).

## Principios

Cada uno dice cuándo aplica. En el reporte final, nombra el que cambió una
decisión y qué cambió.

- **Extiende primero.** Siempre. Si el código existente puede crecer para
  resolverlo, crece. Reescribir requiere que Josue lo pida.
- **El cambio más pequeño.** Al dimensionar un diff: nada de capas,
  abstracciones ni archivos nuevos que no se ganen su lugar. Borrar código
  muerto que estorba al cambio sí vale; limpiar "de paso", no.
- **Arregla la causa, no el síntoma.** Al depurar, sigue el síntoma hasta el
  primer lugar donde el sistema se equivocó. Un `try/catch` o un `if` que
  esconde el error no es un arreglo.
- **Ataca la premisa.** Si dos arreglos que comparten una suposición fallaron,
  escribe la suposición y pruébala directo antes de un tercero.
- **Disciplina de fronteras.** Valida en los bordes (respuesta de Firestore,
  `localStorage`, request al Worker, input del alumno); confía en los datos
  internos ya validados.
- **Modela el dominio.** Lógica con muchos estados o ramas (progreso, ligas,
  economía, inscripciones): usa una tabla, un registro o una máquina de
  estados, no condicionales regados entre archivos.
- **Operaciones idempotentes.** Scripts de admin, migraciones y sync: correr
  dos veces debe dejar el mismo resultado. Primero modo plan, luego `--apply`.
- **Construye la palanca.** Si vas a revisar o cambiar muchas lecciones o
  páginas, escribe el script que lo hace o lo comprueba (ver
  `tools/check_lessons.mjs`) en vez de hacerlo a mano.
- **Experiencia primero.** En decisiones de producto, elige lo que sirve al
  alumno (móvil, lento, en español) sobre lo cómodo de implementar.
- **Demuéstralo.** Antes de decir "listo", verifica contra el artefacto real:
  la página abierta, el validador corrido, la regla probada. Etiqueta cada
  afirmación como medida, inferida o suposición. No le pases a Josue una
  comprobación que tú puedes correr.

## Autonomía

Procede sin preguntar con todo lo reversible en una rama, y al terminar
publica en `main` con `tools/push_main.sh` (playbook `ship`). Pausa con la lista
de `CLAUDE.md` (push forzado o revertir `main`, reglas, `wrangler`, pagos, legal, datos de
alumnos, borrados). "No" es una respuesta válida: si una idea o un alcance
extra no se gana su lugar, dilo.

## Playbooks

Abre `playbooks/<nombre>.md`:

| Tarea | Playbook |
|---|---|
| Algo se rompió o se ve mal | `bug-fix` |
| Función o pantalla nueva, o ampliar una | `feature` |
| Agregar o corregir lecciones, ejercicios, audio | `lesson-content` |
| Cambiar `firestore.rules` o el modelo de datos | `firestore-rules` |
| Cambiar el prompt del tutor Vesper o sus guardrails | `tutor-prompt` |
| Cambiar el Worker (chat proxy, calificador de exámenes) | `worker` |
| Subir a producción | `ship` |

Si ninguno encaja, sigue el más cercano y di cuál y por qué.

## Reporte final

Frases cortas. Primero, qué cambia para el alumno o para Josue. Después,
qué se verificó y cómo, qué no, y el siguiente paso si hay uno.
