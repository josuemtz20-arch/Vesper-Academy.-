# Modelo escolar en Firestore (roles, cursos, periodos, grupos, inscripciones)

Hasta ahora la "escuela" vivía en tres cadenas sueltas: `students/{correo}.group`,
`teachers/{correo}.groups` y `roster/{sid}.group`. Funcionaba para la boleta,
pero no había forma de saber **qué** curso da un grupo, **cuándo**, **quién** lo
imparte, ni de conservar el historial de un alumno cuando cambia de nivel.
Además el único admin era un correo escrito a mano en las reglas.

Este documento describe las cinco colecciones nuevas, quién puede leer y
escribir cada una, y el orden para activarlas. La operación se hace con
`_scripts/school_admin.py` (local, no publicado); las reglas completas están
en `_scripts/firestore.rules` (copia pública en `firestore.rules`).

> **Compatibilidad:** el id de grupo es **la misma cadena** que ya vive en
> `students.group`, `roster.group` y `teachers.groups`. Los portales del
> profesor, la boleta y los resultados siguen funcionando sin cambiar una línea.

## Modelo de datos

```
roles/{correo} -> {            // quién manda. Reemplaza al correo fijo.
  role: "admin" | "coordinator" | "teacher",
  name: string, updatedAt: timestamp
}

courses/{courseId} -> {        // QUÉ se enseña. Un curso por libro del alumno
  name: string,                //   (mismo id que studentbooks/ y manuals/).
  desc, category, family,      //   family = basics | practice | grammar | ...
  level: "A0" | "B1-B2" ...,   //   Lo siembra seed-courses desde el catálogo
  lessonCount: int,            //   local; hours/price/notes se editan a mano
  bookId, manualId: string,    //   con set-course y NO se pisan al re-sembrar.
  hours: int, price: string, notes: string,
  active: bool, createdAt, updatedAt
}

periods/{periodId} -> {        // CUÁNDO. Ciclo, bimestre o cohorte.
  name: string,                //   ej. periods/2026-otono
  startDate, endDate: "AAAA-MM-DD",
  status: "planned" | "active" | "closed",
  createdAt, updatedAt
}

groups/{groupId} -> {          // UN grupo concreto = curso + periodo + profes.
  name: string,                //   groupId es la cadena que ya usaban los
  courseId: string,            //   portales (ej. "grupo-a").
  periodId: string,
  teachers: [correo, ...],     //   espejo de teachers/{correo}.groups (el
  schedule: [{day:"lun", start:"18:00", end:"19:30"}, ...],   // script los
  meetUrl: string,             //   mantiene en sincronía)
  capacity: int,
  status: "planned" | "active" | "closed",
  migrated: bool, createdAt, updatedAt
}

enrollments/{sid}__{groupId} -> {   // HISTORIAL: un doc por alumno × grupo.
  sid: string,                 //   Nunca se pisa: al cambiar de grupo el
  groupId, courseId, periodId, //   anterior queda como "moved".
  name: string,                //   (sin correo, igual que roster/)
  status: "active" | "moved" | "completed" | "dropped",
  enrolledAt, endedAt: timestamp | null,
  migrated: bool, updatedAt
}
```

Base de datos: `teachermanuals` (la misma que todo lo demás).

## Roles

| Rol | Puede | No puede |
|---|---|---|
| `admin` | Todo: contenido, operación, roles | — |
| `coordinator` | Alumnos, profesores, roster, cursos, periodos, grupos, inscripciones, boletas, rúbricas, leer resultados y leads | Subir manuales, libros o exámenes; asignar roles; borrar inscripciones |
| `teacher` | Informativo. Lo que un profesor ve lo sigue decidiendo `teachers/{correo}` y su lista `groups` | — |

**Bootstrap:** el correo del fundador entra como admin aunque `roles/` esté
vacío (`bootstrapAdmin()` en las reglas). Es la red para no quedarse fuera.
Cuando `roles/` ya tenga un admin verificado, se puede borrar esa función y
dejar `isAdmin() = hasRole("admin")`.

## Quién lee / escribe qué

- `roles/`: cada quien **lee** su propio rol; **escribe** solo el admin y solo
  con uno de los tres valores conocidos.
- `courses/` y `periods/`: **lee** cualquier usuario con sesión (es el
  catálogo, no tiene claves); **escribe** admin o coordinador.
- `groups/`: **leen** el staff, los profesores del grupo (`groupId` en sus
  `teachers.groups`) y los alumnos cuyo grupo actual es ese (para ver horario
  y enlace de clase); **escribe** el staff. `courseId`, `periodId` y `status`
  son obligatorios.
- `enrollments/`: **leen** el staff, los profesores del grupo (query
  `groupId == <suyo>`) y el propio alumno (query `sid == <suyo>`); **crea y
  actualiza** el staff con `sid`, `groupId` y `status` válidos; **borra** solo
  el admin.
- `students/` y `teachers/`: ahora también las **escribe el coordinador**
  (dar de alta es operación escolar). Cada quien sigue leyendo su propio doc.
- Todo lo demás (manuales, libros, exámenes, roster, boleta, resultados,
  liga, progreso, telemetría, leads) conserva su comportamiento; donde antes
  decía "el correo del admin" ahora dice `isAdmin()` o `isStaff()`.

## Activación (una vez)

1. **Prueba las reglas** sin publicar: `python _scripts/check_rules.py`.
   Requiere que el service account tenga el rol *Firebase Rules Admin*
   (Google Cloud → IAM); sin él la API responde 403.
2. **Publica** `_scripts/firestore.rules` completo: consola de Firebase →
   Firestore → base `teachermanuals` → Reglas → Publicar.
3. `python _scripts/school_admin.py set-role josuemtz20@gmail.com admin`
4. `python _scripts/school_admin.py seed-courses --apply`
5. `python _scripts/school_admin.py add-period 2026-otono --name "Otoño 2026" --start 2026-09-15 --end 2026-12-12 --status active`
6. `python _scripts/school_admin.py migrate-groups --period 2026-otono` (muestra el
   plan) y luego `--apply` (o `--group <id> --apply` para ir grupo por grupo).
   Después `set-group <grupo> --course <id> --name "..."` para cada grupo migrado.

## Operación diaria

```
school_admin.py add-group basics1-lun --course core_basics_lvl1 --period 2026-otono \
    --name "Core Basics 1 · Lunes" --teachers profe@x.com \
    --schedule "lun 18:00-19:30" "mie 18:00-19:30" --meet https://meet.google.com/xxx --capacity 8
school_admin.py enroll alumno@x.com basics1-lun        # lo inscribe y lo vuelve su grupo actual
school_admin.py unenroll alumno@x.com basics1-lun --status completed
school_admin.py history alumno@x.com
school_admin.py list-groups --period 2026-otono
```

`enroll` hace tres cosas: crea la inscripción (o la reactiva), marca como
`moved` cualquier otra inscripción activa del alumno, y sincroniza
`students.group` + `roster.group` para que la boleta y las reglas vean el grupo
nuevo. Si el alumno tiene acceso por curso (`students.books`), añade el libro
del curso. `unenroll --status dropped` además le quita el grupo actual;
`--status completed` lo conserva hasta que se inscriba en el siguiente.

## Lo que esto habilita (puntos siguientes)

- Panel de administración web: ya hay entidades y un rol `coordinator` para
  quien lo use.
- Horario y enlace de clase por grupo: `groups.schedule` y `groups.meetUrl`,
  legibles por el alumno.
- Asistencia por sesión y cierre de ciclo: la asistencia colgará de
  `groups/{id}` y la nota final de `enrollments/{sid}__{groupId}`, sin pisar
  la boleta al cambiar de nivel.
