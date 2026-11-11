# Activar la boleta de calificaciones (Firestore)

La boleta (`portal_boleta.html`) muestra **una fila por alumno registrado**:
la lista sale de la colección `roster/` (todos los alumnos dados de alta,
con su **nombre**). Todo lo que cuenta para la calificación lo captura el
profesor: el **registro de cada clase** (asistencia, tarea y rúbrica, en
`daily_progress`) y las **evaluaciones** (parciales y examen final, en
`gradebook`). Los intentos de `exam_results` se muestran como práctica y no
cuentan. Mientras las reglas no estén publicadas, la boleta funciona en
**modo lectura** (aviso, sin guardar); no se rompe nada.

> **Reglas completas:** el archivo canónico es `_scripts/firestore.rules`
> (local, no publicado). Pégalo COMPLETO en la consola de Firebase →
> Firestore → base `teachermanuals` → Reglas → Publicar. Este documento solo
> explica el modelo.

## Grupos y privacidad (2026-07-07)

- Cada alumno pertenece a **un grupo** (`students/{correo}.group`) y cada
  profesor tiene una **lista de grupos** (`teachers/{correo}.groups`). Las
  reglas solo dejan a un profesor leer alumnos/resultados/boletas **de sus
  grupos**; un profesor sin `groups` no ve a nadie. El admin ve todo.
- Los **correos de los alumnos no son visibles para los profesores**. Todo
  lo que toca el profesor está indexado por `sid`: un hash opaco del correo
  (`sha256("vesper-sid-v1|" + correo)` recortado a 20 hex), el mismo cálculo
  en `upload_manuals.py::sid_of()` y en `vesper_gradebook.js::mySid()`.
- Los intentos nuevos de `exam_results` llevan `sid` + `group` y **ya no
  guardan el correo**. Los intentos viejos (con correo, sin grupo) solo los
  ven su dueño y el admin.

## Modelo de datos

```
roster/{sid} -> {            // espejo SIN correo de la allowlist (lo escribe
  name:      string,         //   upload_manuals.py: add-student / set-group /
  level:     int,            //   sync-roster). Es la base del roster de la
  levelName: string,         //   boleta: el profesor ve NOMBRES, nunca correos.
  group:     string,
  updatedAt: timestamp
}

gradebook/{sid} -> {         // evaluaciones capturadas por el profesor
  quiz1, quiz2, quiz3: int,  // 0..100 parciales (opcionales; borrar = quitar el campo)
  finalExam: int,            // 0..100 examen final (clase 20)
  notes: string,             // comentario que el alumno ve en su boleta (máx. 500)
  alias: string, studentUid: string,
  updatedAt: timestamp, updatedBy: string,
  // Modelo anterior: ya no se escriben, se leen como respaldo si el
  // componente nuevo no tiene datos.
  examsGrade, lessonsGrade, participacion: int
}

daily_progress/{sid} -> {    // registro por clase (20 clases)
  days: {
    "1": {
      _activo: true,         // se pasó lista a este alumno ese día
      att: "P"|"R"|"F"|"J",  // presente, retardo, falta, justificada
      hw: 0|1|2,             // tarea: no entregó, incompleta, entregada (sin campo = no hubo)
      r: { participacion, speaking, listening, reading,
           writing, gramatica, vocabulario: 1..4 }   // solo lo calificado
    }, ...
  },
  alias: string, studentUid: string,
  updatedAt: timestamp, updatedBy: string
}
```

Los días guardados con el modelo anterior (`{_activo, aspecto:false}`, 16
aspectos ✓/✗) se convierten al leer (`legacyDay` en `vesper_gradebook.js`) y
se reescriben en el formato nuevo la próxima vez que se guarda ese alumno.

Base de datos: `teachermanuals` (la misma que `exam_results`).

## Quién lee / escribe qué

- `roster/`: **escribe** solo el admin (script). **Lee** el admin (todo) y
  cada profesor **con filtro `group == <uno de sus grupos>`** (la regla
  exige que el grupo del doc esté en sus `groups`).
- `gradebook/` y `daily_progress/`: **escriben** el admin y los profesores
  del grupo del alumno (el grupo se resuelve contra `roster/{sid}.group`).
  **Lee** además el propio alumno: su `sid` está en `students/{correo}.sid`
  y la regla compara (`ownSid() == sid`).
- Los portales del profesor **no listan** `gradebook`/`daily_progress`
  completos: leen el roster (por grupos) y luego un `batchGet` con esos
  sids — así la regla por-documento siempre es demostrable.
- El alumno (`mi_boleta.html`): GET directo a `gradebook/{su sid}` +
  `runQuery` de `exam_results` filtrado por `studentUid == uid`. Nada extra
  que publicar.

## Alta y operación (script admin)

```
python _scripts/upload_manuals.py add-student correo@x.com --name "Ana" --level Basico --group grupo-a
python _scripts/upload_manuals.py set-group correo@x.com grupo-a
python _scripts/upload_manuals.py add-teacher profe@x.com --groups grupo-a grupo-b
python _scripts/upload_manuals.py set-teacher-groups profe@x.com grupo-a
python _scripts/upload_manuals.py sync-roster   # backfill: puebla roster/ y sid
                                                # para alumnos ya registrados
```

Tras cambiar de modelo hay que ejecutar **una vez** `sync-roster` y asignar
`--group`/`set-group` a cada alumno y `set-teacher-groups` a cada profesor.

## Cálculo de la calificación

Todo vive en `vesper_gradebook.js` (bloque CONFIGURACIÓN y `computeGrade`).

| Componente | Peso | De dónde sale |
|---|---|---|
| Asistencia | 10 % | Pase de lista. Retardo = media asistencia; justificada no cuenta |
| Tareas | 15 % | Marca diaria: entregada 100, incompleta 50, no entregó 0 |
| Desempeño en clase | 25 % | Rúbrica de 7 criterios en 4 niveles (100 / 85 / 70 / 50); cada criterio pesa igual |
| Parciales | 20 % | Promedio de los parciales capturados (hasta 3) |
| Examen final | 30 % | Clase 20 |

- La rúbrica **no arranca en perfecto**: lo que el profesor no calificó no
  cuenta. El día que el alumno faltó no se evalúa desempeño.
- Un componente sin datos se excluye y los pesos se renormalizan, pero la nota
  es un **avance** con su cobertura (% ya evaluado). Solo hay Aprobado o
  Reprobado (mínimo 70, `PASS_THRESHOLD`) cuando existe el examen final.
- Alertas "en riesgo": avance menor a 70, o asistencia menor a 80 %
  (`MIN_ATTENDANCE`) con al menos dos faltas. No reprueban por sí solas.
- La práctica de la app (`exam_results`) se muestra como referencia y nunca
  entra en el cálculo.

## Fechas del curso

`COURSE_START` (hoy `"2026-11-23"`) es la clase 1. Las 20 clases se cuentan
en días hábiles saltando lo que esté en `NO_CLASS`; del 23 de noviembre al
18 de diciembre de 2026 no hay festivos. Es una sola fecha para todos los
grupos y la boleta guarda **un documento por alumno, no por ciclo**: antes de
arrancar el ciclo siguiente hay que archivar o vaciar `gradebook/` y
`daily_progress/` y cambiar `COURSE_START`.

## Reglas

Las reglas publicadas ya aceptan los campos nuevos (solo validan
`participacion`, `examsGrade` y `lessonsGrade` cuando vienen), así que **no
hay que republicar nada**. Si quieres que el servidor valide también las
evaluaciones nuevas, añade en `match /gradebook/{sid}` una condición por
campo, igual a las que ya existen:

```
&& (!("finalExam" in request.resource.data)
    || (request.resource.data.finalExam is int
        && request.resource.data.finalExam >= 0
        && request.resource.data.finalExam <= 100))
```

(y lo mismo para `quiz1`, `quiz2` y `quiz3`). Compila con
`python _scripts/check_rules.py` antes de publicar.
