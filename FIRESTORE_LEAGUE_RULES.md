# Activar el leaderboard real de la liga (Firestore)

La liga semanal funciona **sin cuenta** con rivales simulados. Para que los
usuarios con sesión verificada compitan en una **tabla real**, hay que publicar
una regla de seguridad en Firestore. Mientras no se publique, el código degrada
solo a la liga simulada (no se rompe nada).

## Modelo de datos

Colección por semana ISO, un documento por usuario (self-scoped):

```
leagues/{weekId}/members/{uid}  ->  { alias: string, xp: int, ts: string }
```

- `weekId` ej. `2026-W26` (lo calcula `vesper_league.js` → `weekId()`).
- `uid` = `request.auth.uid` (cada quien solo escribe su propia entrada).
- `alias` = el alias que el alumno pone en Configuración, o un código anónimo
  `Estudiante#NNNN` derivado del uid. **Nunca se guarda el correo.**

Base de datos: `teachermanuals` (la misma que usa `vesper_sync.js`).

## Regla a añadir

En las reglas de Firestore de la base `teachermanuals`, dentro de
`match /databases/{database}/documents { ... }`:

> **No copies una regla de este documento.** La versión que estaba aquí
> (`allow write` con solo `xp is int`) dejaba que cualquiera con sesión se
> pusiera primero de la tabla y borrara su entrada. La regla vigente está en
> `firestore.rules` (bloque `match /leagues/{week}/members/{uid}` y
> `leagueDocOk`): solo `{alias, xp, ts}` con tamaños acotados, el XP no baja,
> sube como mucho 600 por escritura y 20 000 por semana, y no se puede borrar.
> Publica siempre el archivo `firestore.rules` completo.

Publica las reglas (consola de Firebase → Firestore → Reglas, o
`firebase deploy --only firestore:rules`). Tiene efecto inmediato.

## Privacidad

La tabla expone, a otros usuarios autenticados, solo el **alias** y el **XP
semanal**. El alias es editable y por defecto anónimo. No se expone el correo
ni ningún otro dato del perfil.

## Limpieza (opcional)

Cada semana crea documentos nuevos bajo `leagues/{weekId}`. Si quieres podar
semanas viejas, borra subcolecciones `leagues/{weekId}` antiguas con una
función programada o manualmente; no afecta al progreso del alumno (que vive en
`progress/{uid}` y en localStorage).
