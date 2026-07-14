# Recibir los leads del examen diagnóstico (Firestore)

El examen de nivelación público (`book_placement.html`) es **anónimo y sin
registro**. Al terminar, cada persona deja su nombre y su correo o WhatsApp, y
la página intenta:

1. Guardar el resultado en Firestore (colección `placement_results`) — el
   respaldo confiable para que la academia vea **todos** los leads.
2. Enviar un aviso por correo a `contacto@vesperacademy.com` vía FormSubmit
   (canal externo).

## ⚠️ El bug que impedía recibir leads

En las reglas publicadas **no existía ninguna regla para `placement_results`**.
En Firestore, toda colección sin regla explícita se **deniega por defecto**, así
que **cada intento de guardar un lead era rechazado** y solo quedaba en el
`localStorage` del propio visitante (inservible para la academia). La regla de
abajo lo corrige.

## Modelo de datos

Un documento por intento (id autogenerado), creado por un visitante **sin
sesión** (`request.auth == null`):

```
placement_results/{autoId} -> {
  name, email, phone, level, levelName,
  correct: int, total: int, skipped: int,
  scores: map, origin, createdAt: timestamp
}
```

Base de datos: la misma que usa el resto del sitio (`vesper_auth.js`).

## Regla a añadir

Dentro de `match /databases/{database}/documents { ... }`:

```
match /placement_results/{id} {
  // ALTA anónima (el examen no requiere sesión) con validación de forma
  // + al menos un dato de contacto, para frenar registros vacíos/spam.
  allow create: if request.resource.data.name is string
                && request.resource.data.name.size() > 0
                && request.resource.data.name.size() <= 120
                && request.resource.data.level is string
                && request.resource.data.level.size() <= 20
                && request.resource.data.correct is int
                && request.resource.data.total is int
                && request.resource.data.correct >= 0
                && request.resource.data.total >= 0
                && request.resource.data.correct <= request.resource.data.total
                && request.resource.data.email is string
                && request.resource.data.email.size() <= 200
                && request.resource.data.phone is string
                && request.resource.data.phone.size() <= 60
                && (request.resource.data.email.size() > 0
                    || request.resource.data.phone.size() > 0);
  // LECTURA: solo profesores y el admin (los leads traen datos de contacto).
  allow read:   if request.auth != null && (
                   exists(/databases/$(database)/documents/teachers/$(request.auth.token.email))
                   || request.auth.token.email == "josuemtz20@gmail.com"
                );
  allow update, delete: if false;
}
```

**Publica las reglas** (consola de Firebase → Firestore → pestaña Reglas →
pegar → Publicar, o `firebase deploy --only firestore:rules`). Tiene efecto
inmediato. Sin este paso, el arreglo del repositorio **no** cambia nada en
producción: el archivo `firestore.rules` es solo la referencia.

## Cómo ver los leads

- **Consola de Firebase** → Firestore → colección `placement_results`. Ahí
  aparece cada persona que terminó el examen (nombre, contacto, nivel, aciertos,
  fecha y origen `?src=`).
- El "historial general" que se muestra dentro de `book_placement.html` lee sin
  token, así que a los visitantes anónimos solo les muestra su propio resultado
  guardado en su dispositivo (comportamiento correcto de privacidad).

## Privacidad

`create` es anónimo por necesidad (el examen no pide cuenta), pero `read` está
restringido a profesores/admin: los datos de contacto de los prospectos **no**
quedan expuestos por la API pública. Los intentos son inmutables (sin
`update`/`delete`).

## El correo (FormSubmit) es un canal aparte

Que no llegaran los correos tiene una segunda causa, **independiente** de esta
regla: el aviso a `contacto@vesperacademy.com` sale por
`formsubmit.co`. Verifica en ese buzón:

1. **Activación**: la primera vez, FormSubmit envía un correo de confirmación
   con un enlace que hay que abrir **una sola vez**. Hasta que se abre, retiene
   los envíos. Busca "FormSubmit" en la bandeja y en **spam**.
2. **Spam**: revisa que los avisos no estén cayendo en correo no deseado; marca
   como "no es spam" y añade el remitente a contactos.

Con la regla publicada, aunque el correo falle, **ningún lead se pierde**:
todos quedan en `placement_results`.
