# Aceptación de Términos y Aviso de Privacidad — reglas y despliegue

Este cambio deja registrada, con fecha y versión, la aceptación de los
documentos legales por cada alumno (requisito para empezar a cobrar).

## Qué hace el sitio ahora

1. **Registro (login.html).** El formulario "Crear cuenta" tiene una casilla
   obligatoria: *"He leído y acepto los Términos y Condiciones y el Aviso de
   Privacidad"*. Sin marcarla no se puede crear la cuenta.
2. **Constancia inmediata.** Al crear la cuenta, `vesper_auth.js`
   (`recordTosAcceptance`) escribe `tos_acceptances/{uid}` en la base
   `teachermanuals` con:
   - `email` — correo del alumno (minúsculas)
   - `tosVersion` — versión aceptada (`CONFIG.legalVersion`, hoy `v1.0-2026-07-23`)
   - `tosAcceptedAt` — fecha/hora de la aceptación, puesta por el
     **servidor** de Firestore (`REQUEST_TIME`), no por el reloj del
     dispositivo del alumno.
   Las reglas hacen este doc **inmutable** (ni el alumno puede editarlo) y
   validan que la fecha sea "ahora" (±10 min), no una inventada.
3. **Espejo en students/.** El doc `students/{correo}` lo crea el admin al
   aprobar al alumno, DESPUÉS del registro; por eso los campos
   `tosAcceptedAt`/`tosVersion` no pueden escribirse ahí en el momento de
   aceptar. La primera vez que el alumno entra ya aprobado,
   `syncTosToStudentDoc` copia esos dos campos a su doc de `students/`.
   Las reglas solo permiten copiar EXACTAMENTE los valores de su
   constancia — nunca se puede fabricar una aceptación retroactiva, y el
   alumno sigue sin poder crear/alterar su doc de acceso.

## Qué tienes que publicar

Consola de Firebase → Firestore → base **`teachermanuals`** → pestaña
**Reglas** → pega el contenido actualizado de `firestore.rules` → Publicar.
(Los bloques nuevos son `tos_acceptances/{uid}` y el `allow update` extra
dentro de `students/{email}`.)

## ⚠️ Cuidado con el script de altas (`_scripts/upload_manuals.py`)

Si el script escribe `students/{correo}` con un PATCH **sin
`updateMask`**, el PATCH reemplaza el documento completo y borraría los
campos `tosAcceptedAt`/`tosVersion` ya espejados. Opciones:

- Usa `?updateMask.fieldPaths=...` con solo los campos que el script
  gestiona (name, level, sid, group…), o
- No hagas nada: el espejo se auto-repara — en el siguiente inicio de
  sesión del alumno los campos se copian de nuevo desde su constancia
  (que es permanente).

## Cuando cambies los documentos legales

1. Edita `aviso-de-privacidad.html` / `terminos-y-condiciones.html` /
   `politica-de-reembolsos.html` y sube el número de versión y la fecha de
   vigencia visibles al inicio de cada documento.
2. Actualiza `legalVersion` en `vesper_auth.js` (CONFIG) para que las
   nuevas aceptaciones queden registradas contra la nueva versión.
3. Los alumnos existentes conservan su constancia de la versión anterior;
   si el cambio es relevante, avísales por correo (compromiso de los
   propios documentos). Un flujo de re-aceptación dentro del campus puede
   añadirse cuando haga falta (por ejemplo, junto con el checkout de pago).
