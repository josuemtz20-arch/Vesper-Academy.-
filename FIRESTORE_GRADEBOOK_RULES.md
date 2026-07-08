# Activar la boleta de calificaciones (Firestore)

La boleta (`portal_boleta.html`) muestra **una fila por alumno registrado**:
la lista sale de la colección `roster/` (todos los alumnos dados de alta,
con su **nombre**), Exámenes y Lecciones se calculan solos con los intentos
guardados en `exam_results`, y la **Participación** la captura el profesor
(colecciones `gradebook` y `daily_progress`). Mientras las reglas no estén
publicadas, la boleta funciona en **modo lectura** (aviso, sin guardar); no
se rompe nada.

> **Reglas completas:** el archivo canónico es `_scripts/firestore.rules`
> (local, no publicado). Pégalo COMPLETO en la consola de Firebase →
> Firestore → base `teachermanuals` → Reglas → Publicar. Este documento solo
> explica el modelo.

> **🔒 Correo verificado obligatorio (2026-07-08):** toda regla que confíe en
> `request.auth.token.email` debe exigir además
> `request.auth.token.email_verified == true`. Sin eso, un atacante puede crear
> una cuenta con el correo (aún no registrado) de un profesor y ESCRIBIR
> calificaciones, o con el de un alumno y leer su boleta. Verifica que
> `_scripts/firestore.rules` incluya este check antes de publicar (la
> referencia `firestore.rules` del repo ya lo trae).

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

gradebook/{sid} -> {         // parte manual capturada por el profesor
  participacion: int,        // 0..100 (opcional; validada si está presente)
  examsGrade:    int,        // 0..100 nota de EXÁMENES confirmada (opcional)
  lessonsGrade:  int,        // 0..100 nota de LECCIONES confirmada (opcional)
  notes: string, alias: string, studentUid: string,
  updatedAt: timestamp, updatedBy: string
}

daily_progress/{sid} -> {    // rúbrica del curso (20 días × aspectos, ✓/✗)
  days: { "1": {...}, ... "20": {...} },
  alias: string, studentUid: string,
  updatedAt: timestamp, updatedBy: string
}
```

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

## Cálculo de la final

Promedio ponderado (Exámenes 50 % · Lecciones 30 % · Participación 20 %,
`vesper_gradebook.js` → `WEIGHTS`) usando **solo datos capturados por el
profesor** (`examsGrade`, `lessonsGrade`, `participacion`). Los promedios de
práctica (derivados de `exam_results`, autocalificación del alumno) se
muestran como referencia pero **no** entran en la final. Criterios faltantes
se excluyen y los pesos se renormalizan. Aprueba con ≥ 70 (`PASS_THRESHOLD`).
El promedio de la rúbrica diaria (✓=100, ✗=0) alimenta la Participación.
