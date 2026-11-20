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
Mientras exista, ese correo es admin pase lo que pase en `roles/` (si alguien
tomara esa cuenta, no habría forma de quitarle el admin desde `roles/`). Hay
un `TODO(seguridad)` en `firestore.rules` para retirarlo; ver **Retirar el
bootstrap** abajo. **No lo borres antes de crear el doc de `roles/`.**

## Quién lee / escribe qué

- `roles/`: cada quien **lee** su propio rol; **escribe** solo el admin y solo
  con uno de los tres valores conocidos. Desde 2026-11-20 el doc solo admite
  `role`, `name`, `email`, `createdAt`, `updatedAt`, `updatedBy` (textos
  ≤ 120/200). Si `school_admin.py set-role` escribe otro campo, añádelo a la
  regla o el script recibirá 403.
- `courses/` y `periods/`: **lee** solo gente de la escuela, `schoolUser()`
  = alumno de `students/`, profesor de `teachers/` o staff (2026-11-20; antes
  cualquier cuenta verificada, y cualquiera puede registrarse). Hoy solo los
  lee `portal_escuela.html` (staff). **Escribe** admin o coordinador.
- `groups/`: **leen** el staff, los profesores del grupo (`groupId` en sus
  `teachers.groups`) y los alumnos cuyo grupo actual es ese (para ver horario
  y enlace de clase); **escribe** el staff. `courseId`, `periodId` y `status`
  son obligatorios. `meetUrl`, si viene, debe ser `""` o empezar con
  `https://` (≤ 300); lo mismo `students/{correo}.classMeetUrl`
  (materiales.html). Así nadie guarda un `javascript:` que luego se pinta
  como enlace. Ojo: con PATCH + `updateMask` la regla ve el doc ya fusionado,
  así que un grupo/alumno que hoy tenga un enlace sin `https://` no se podrá
  editar hasta corregir ese campo en el mismo guardado.
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

## Publicar y comprobar qué reglas están vivas

La base es **`teachermanuals`** (no `(default)`, que no existe en el proyecto).

**Consola:** Firebase → proyecto `vesper-academy` → Firestore Database →
selector de base arriba: `teachermanuals` → pestaña **Reglas** → pegar
`firestore.rules` COMPLETO → **Publicar**. En esa misma pestaña, el historial
(icono de reloj, a la izquierda del editor) muestra la fecha de cada versión
publicada y deja compararlas con la actual.

**CLI** (firebase-tools ≥ 13). El repo no trae `firebase.json`; crea uno
local (no lo subas si no quieres) con solo esta base:

```json
{ "firestore": [ { "database": "teachermanuals", "rules": "firestore.rules" } ] }
```

```
firebase login
firebase deploy --only firestore:rules --project vesper-academy
```

**Qué ruleset está vivo** (API de reglas; hace falta un usuario o service
account con *Firebase Rules Viewer/Admin*):

```
TOKEN=$(gcloud auth print-access-token)
# release de la base teachermanuals -> nombre del ruleset y fecha
curl -s -H "Authorization: Bearer $TOKEN" \
  https://firebaserules.googleapis.com/v1/projects/vesper-academy/releases/cloud.firestore/teachermanuals
# contenido de ese ruleset (rulesetName = projects/vesper-academy/rulesets/<id>)
curl -s -H "Authorization: Bearer $TOKEN" \
  https://firebaserules.googleapis.com/v1/<rulesetName> | python3 -c \
  'import sys,json; print(json.load(sys.stdin)["source"]["files"][0]["content"])' > vivo.rules
diff vivo.rules firestore.rules && echo "lo vivo = el repo"
```

## Retirar el bootstrap (cuando ya funcione roles/)

1. Con las reglas actuales publicadas (aún con `bootstrapAdmin()`), crea el
   doc del admin: `python _scripts/school_admin.py set-role josuemtz20@gmail.com admin`
   — o en la consola: Firestore → `teachermanuals` → colección `roles` →
   *Agregar documento*, ID = `josuemtz20@gmail.com` (exacto, en minúsculas),
   campo `role` (string) = `admin`, opcional `name` (string).
2. Comprueba que existe: consola → `roles/josuemtz20@gmail.com` con
   `role: "admin"`, o
   `curl -s -H "Authorization: Bearer $TOKEN" https://firestore.googleapis.com/v1/projects/vesper-academy/databases/teachermanuals/documents/roles/josuemtz20@gmail.com`.
3. (Recomendado) Crea un **segundo** admin con otra cuenta tuya verificada
   (`set-role otro@correo admin`), por si pierdes la primera.
4. En `firestore.rules`: borra la función `bootstrapAdmin()` y su TODO, y
   deja `function isAdmin() { return hasRole("admin"); }`.
5. Publica (pasos de arriba) y, ya publicado, entra a `portal_escuela.html`
   con la cuenta del fundador: si carga cursos y grupos, `roles/` funciona.
   Si ves 403, vuelve a publicar la versión anterior desde el historial de la
   consola (pestaña Reglas) y revisa el paso 1.
6. `vesper_auth.js` (`adminEmail`) y `portal_escuela.html` (`isFounder`) aún
   tratan ese correo como admin en la interfaz; es solo la puerta visual
   (sin reglas no ve datos), pero puedes quitarlo en el mismo cambio.
