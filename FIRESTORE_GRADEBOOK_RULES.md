# Activar la boleta de calificaciones (Firestore)

La boleta (`portal_boleta.html`) muestra **una fila por alumno** con la misma
tabla para todos los niveles (A1–C2): Exámenes y Lecciones se calculan solos
con los intentos ya guardados en `exam_results`, y la **Participación** la
captura el profesor. Esa parte manual vive en una colección nueva,
`gradebook`, que necesita su propia regla de seguridad. Mientras no se
publique, la boleta funciona en **modo lectura** (muestra un aviso y no deja
guardar la participación); no se rompe nada.

## Modelo de datos

Colección de nivel superior, **un documento por alumno** (id = correo en
minúsculas, igual que la allowlist `students/{correo}`):

```
gradebook/{correo}  ->  {
  participacion: int,     // 0..100, capturada por el profesor
  notes:         string,  // notas libres del profesor (opcional)
  alias:         string,  // alias del alumno (para mostrarlo en el roster)
  studentUid:    string,  // uid informativo (el join real es por correo)
  updatedAt:     timestamp,
  updatedBy:     string   // correo del profesor que guardó
}
```

Base de datos: `teachermanuals` (la misma que `exam_results`).

- **Escriben** solo los profesores (allowlist `teachers/{correo}`) o el admin.
  La regla valida `participacion` int 0..100.
- **Leen** el propio alumno (solo su doc), los profesores y el admin.
- El roster de la boleta se deriva de `exam_results` + `gradebook`; **no**
  hace falta relajar la regla de `students/`.

## Regla a añadir

En las reglas de Firestore de la base `teachermanuals`, dentro de
`match /databases/{database}/documents { ... }` (ya incluida en
`firestore.rules` de este repo):

```
match /gradebook/{email} {
  // lee: el propio alumno (su doc), un profesor o el admin
  allow read:  if request.auth != null && (
                 request.auth.token.email == email
                 || exists(/databases/$(database)/documents/teachers/$(request.auth.token.email))
                 || request.auth.token.email == "josuemtz20@gmail.com"
               );
  // escribe: SOLO profesores/admin, con participacion int 0..100
  allow write: if request.auth != null
               && (exists(/databases/$(database)/documents/teachers/$(request.auth.token.email))
                   || request.auth.token.email == "josuemtz20@gmail.com")
               && request.resource.data.participacion is int
               && request.resource.data.participacion >= 0
               && request.resource.data.participacion <= 100;
}
```

Y el bloque de **progreso diario** (rúbrica del curso: 20 días × aspectos,
✓/✗ por celda), en la misma colección de reglas:

```
match /daily_progress/{email} {
  // lee: el propio alumno (su doc), un profesor o el admin
  allow read:  if request.auth != null && (
                 request.auth.token.email == email
                 || exists(/databases/$(database)/documents/teachers/$(request.auth.token.email))
                 || request.auth.token.email == "josuemtz20@gmail.com"
               );
  // escribe: SOLO profesores/admin
  allow write: if request.auth != null
               && (exists(/databases/$(database)/documents/teachers/$(request.auth.token.email))
                   || request.auth.token.email == "josuemtz20@gmail.com");
}
```

Documento `daily_progress/{correo}`:

```
daily_progress/{correo}  ->  {
  days: {                    // mapa día -> aspectos evaluados ese día (bool)
    "1": { asistencia, puntualidad, material, tarea, participacion, actitud,
           trabajo_clase, uso_ingles, speaking, pronunciacion, fluidez,
           listening, reading, writing, gramatica, vocabulario },
    "2": { ... }, ... "20": { ... }
  },
  alias:      string,
  studentUid: string,
  updatedAt:  timestamp,
  updatedBy:  string
}
```

La lista de aspectos vive en `vesper_gradebook.js` (`DAILY_ASPECTS`); añadir o
quitar aspectos es editar esa lista, la regla no valida campos concretos del
mapa `days`. El promedio de la rúbrica (✓=100, ✗=0; celdas sin marcar no
cuentan) se convierte automáticamente en la **Participación** de la boleta.

Publica las reglas (consola de Firebase → Firestore → base `teachermanuals` →
Reglas, o `firebase deploy --only firestore:rules`). Tiene efecto inmediato.

> **Casing del correo:** igual que el resto de allowlists, el doc id es el
> correo en **minúsculas**. `vesper_gradebook.js` ya normaliza antes de
> escribir; para la lectura del alumno, `request.auth.token.email` debe
> coincidir con el id (registra los correos en minúsculas).

## Cómo se llena / se lee

- **Profesor:** `portal_boleta.html` → escribe con `VESPER_GRADEBOOK.saveGrade`
  (PATCH con `updateMask`, upsert: crea el doc la primera vez). El guardado es
  automático al capturar el número (debounce ~0.8 s, icono de estado por fila).
- **Lectura del profe:** `runQuery` sobre toda la colección `gradebook`;
  Firestore solo la devuelve si la regla garantiza acceso a todos los docs,
  por eso un alumno normal recibe 403 y la boleta le muestra el aviso de
  "solo profesores". No hace falta índice compuesto.
- **Alumno (`mi_boleta.html`):** cada alumno consulta su propia boleta con la
  MISMA regla: GET directo a `gradebook/{su correo}` (`fetchMyGrade`) y un
  `runQuery` de `exam_results` filtrado por `studentUid == uid` (`fetchMine`,
  sin `orderBy` para no requerir índice compuesto). No hay que publicar nada
  adicional.
- **Cálculo de la final:** promedio ponderado (Exámenes 50 % · Lecciones 30 % ·
  Participación 20 %, configurable en `vesper_gradebook.js` → `WEIGHTS`);
  si a un alumno le falta un criterio, se renormalizan los pesos con los que
  sí tiene (la falta de datos no cuenta como cero). Aprueba con ≥ 70
  (`PASS_THRESHOLD`).
