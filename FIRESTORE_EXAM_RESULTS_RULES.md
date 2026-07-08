# Activar el registro central de calificaciones (Firestore)

Los exámenes de la plataforma (exámenes de mundo / *boss*, nivelación y
lecciones) se autocalifican y **siempre** guardan el intento en el dispositivo
del alumno (`localStorage`, clave `vesper_exam_results_v1`), así funciona **sin
cuenta**. Para que esos resultados se centralicen en la nube y el **profesor**
los consulte en `portal_calificaciones.html`, hay que publicar una regla de
seguridad en Firestore. Mientras no se publique, el código degrada solo a
local (no se rompe nada): el panel del profesor muestra un aviso.

## Modelo de datos

Colección de nivel superior, un documento por intento (id automático):

```
exam_results/{autoId}  ->  {
  studentUid: string,   // request.auth.uid (dueño del intento)
  alias:      string,   // alias del alumno (estilo liga)
  sid:        string,   // id OPACO del alumno (hash del correo; ver roster/)
  group:      string,   // grupo del alumno al momento del intento
  examType:   string,   // "boss" | "placement" | "lesson"
  examId:     string,   // "boss:B1" | "placement" | id de lección
  level:      string,   // nivel CEFR
  score:      int,      // aciertos
  total:      int,      // nº de preguntas
  percent:    int,      // 0..100
  passed:     bool,
  threshold:  int,      // % de aprobación usado
  detail:     array<map>, // por pregunta: { q, type, correct }
  createdAt:  timestamp,
  clientTs:   string
}
```

Base de datos: `teachermanuals` (la misma que usa `vesper_sync.js` y
`vesper_league_cloud.js`).

- `studentUid` = `request.auth.uid`: cada alumno **crea** solo sus propios
  intentos. Los intentos son **inmutables** (no se editan ni borran desde el
  cliente).
- El admin lee todo; cada **profesor** solo lee los intentos cuyo `group`
  está en su lista `teachers/{correo}.groups`.

## Privacidad (2026-07-07)

Los intentos **ya no guardan el correo** del alumno: llevan `sid` (hash opaco
del correo, el mismo id de `roster/{sid}`) y `group`. El profesor identifica
al alumno por su **nombre** (vía `roster/`) y nunca ve correos; además solo
puede leer intentos de **sus grupos** (lo garantiza la regla). Los intentos
viejos que sí guardaron correo quedan visibles solo para su dueño y el admin
(no tienen `group`). Un alumno anónimo (sin cuenta) no sube nada a la nube;
solo queda en su dispositivo.

## Regla a añadir

En las reglas de Firestore de la base `teachermanuals`, dentro de
`match /databases/{database}/documents { ... }`:

```
match /exam_results/{id} {
  // el alumno crea SOLO sus propios intentos, y deben ser internamente
  // coherentes: score<=total, percent cuadra con score/total (±1 por redondeo),
  // y examType es uno conocido. Ver firestore.rules para la versión canónica.
  // 🔒 email_verified: exige correo VERIFICADO (Firebase deja crear cuentas
  //    con correos ajenos sin verificar; ver nota de seguridad en firestore.rules).
  allow create: if request.auth != null
                && request.auth.token.email_verified == true
                && request.resource.data.studentUid == request.auth.uid
                && request.resource.data.score is int
                && request.resource.data.total is int
                && request.resource.data.percent is int
                && request.resource.data.score >= 0
                && request.resource.data.total >= 0
                && request.resource.data.score <= request.resource.data.total
                && request.resource.data.percent >= 0
                && request.resource.data.percent <= 100
                && (
                     (request.resource.data.total == 0 && request.resource.data.percent == 0)
                     || (request.resource.data.total > 0
                         && request.resource.data.percent * request.resource.data.total
                            >= (request.resource.data.score * 100) - request.resource.data.total
                         && request.resource.data.percent * request.resource.data.total
                            <= (request.resource.data.score * 100) + request.resource.data.total)
                   )
                && request.resource.data.examType in ["lesson", "exam", "boss", "placement"];

  // lee: el dueño, el admin, o un profesor DEL GRUPO del intento
  // (teacherSeesGroup: helper definido en firestore.rules — compara
  // resource.data.group contra teachers/{correo}.groups; el helper y el
  // check del admin deben exigir también email_verified == true)
  allow read:   if request.auth != null && (
                   resource.data.studentUid == request.auth.uid
                   || (request.auth.token.email_verified == true
                       && request.auth.token.email == "josuemtz20@gmail.com")
                   || teacherSeesGroup(resource.data.group)
                );

  // intentos inmutables: el profe solo consulta
  allow update, delete: if false;
}
```

> La versión canónica y completa (incluidos los helpers `teacherSeesGroup`,
> `ownSid` y los bloques `roster`, `gradebook`, `daily_progress`) vive en
> `_scripts/firestore.rules` — pega ESE archivo completo al publicar.

Publica las reglas (consola de Firebase → Firestore → Reglas, o
`firebase deploy --only firestore:rules`). Tiene efecto inmediato.

> **⚠️ Integridad — estos intentos son PRÁCTICA, no la nota oficial.** Los
> exámenes se autocalifican en el navegador y es el propio alumno quien escribe
> `exam_results` con su token, así que un alumno decidido puede fabricar un
> intento internamente coherente (p. ej. `score:10,total:10,percent:100`). Las
> validaciones de arriba bloquean las falsificaciones burdas, pero **no
> convierten esto en evaluación confiable**. Por eso la boleta ya **no** deriva
> la calificación de aquí: los promedios de `exam_results` se muestran como
> *práctica* y la nota de registro de Exámenes/Lecciones la **confirma el
> profesor** (`gradebook.examsGrade` / `gradebook.lessonsGrade`, ver
> `FIRESTORE_GRADEBOOK_RULES.md`). Para una nota 100 % a prueba de manipulación
> haría falta calificar del lado del servidor (Cloud Function / Admin SDK), que
> requiere el plan Blaze de Firebase.
>
> **Claves de respuesta:** la colección `exams/{id}` (donde viven las claves) es
> legible por cualquier alumno de la allowlist. Si esto te importa para la
> integridad del examen, separa la clave en un subdocumento legible solo por
> profesores/admin, o califica del lado del servidor.

> **🔒 Importante — correo verificado:** toda regla que confíe en
> `request.auth.token.email` (o en `exists(...teachers/$(...email))`) debe exigir
> además `request.auth.token.email_verified == true`. Sin eso, cualquiera puede
> crear con la API pública de Firebase una cuenta con el correo de un
> profesor/alumno aún no registrado (sin verificarlo) y pasar la regla. El
> cliente ya exige correo verificado en todos sus flujos, así que añadirlo a las
> reglas no rompe nada. Ver la cabecera de `firestore.rules`.

> **Importante — casing del correo:** los documentos de la allowlist se llavean
> con el **correo en minúsculas** (igual que `fsDocExists` en `vesper_auth.js`).
> El token de Firebase (`request.auth.token.email`) suele venir tal cual lo
> registró el usuario. Mantén los doc id de `teachers/{correo}` en minúsculas y
> registra a los profesores con el correo en minúsculas para que
> `exists(.../teachers/$(request.auth.token.email))` coincida.

## Nota sobre la consulta del profesor

El **admin** hace un `runQuery` sobre toda la colección ordenado por
`createdAt` descendente (un solo campo: sin índice compuesto). Un **profesor**
no puede consultar la colección completa (su regla depende del `group` de cada
doc), así que `vesper_results.js::fetchAll` lanza una query filtrada
`where group == <g>` por cada uno de sus grupos (sin `orderBy`, para no exigir
índice compuesto) y ordena en el cliente. Un alumno normal recibe `null` y el
panel le muestra el aviso de "solo profesores".

## Lecturas / cómo se llena

- **Exámenes de mundo (boss):** `leccion.html` → `renderBossResult` registra el
  intento (aprobado **y** reprobado) con `VESPER_RESULTS.record(...)`.
- **Lecciones:** `leccion.html` → `renderFeedback` registra las lecciones
  superadas.
- **Nivelación:** `book_placement.html` → `showResults` registra el resultado
  **solo si el alumno tiene sesión verificada** (el lead anónimo sigue yendo a
  `placement_results`, como antes).
