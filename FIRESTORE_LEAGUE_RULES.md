# Activar el leaderboard real de la liga (Firestore)

La liga semanal funciona **sin cuenta** con rivales simulados. Para que los
alumnos y profesores de la allowlist (sesión verificada) compitan en una
**tabla real**, hay que publicar
una regla de seguridad en Firestore. Mientras no se publique, el código degrada
solo a la liga simulada (no se rompe nada).

## Modelo de datos

Colección por semana ISO, un documento por usuario (self-scoped):

```
leagues/{weekId}/members/{uid}  ->  { alias: string, xp: int, ts: timestamp }
```

- `weekId` ej. `2026-W26` (lo calcula `vesper_league.js` → `weekId()`).
- `uid` = `request.auth.uid` (cada quien solo escribe su propia entrada).
- `alias` = el alias que el alumno pone en Configuración, o un código anónimo
  `Estudiante#NNNN` derivado del uid. **Nunca se guarda el correo.**
- `ts` = hora del **servidor** de la última escritura. Hasta el 2026-11-20 era
  un texto que ponía el navegador.

Base de datos: `teachermanuals` (la misma que usa `vesper_sync.js`).

## Regla (2026-11-20)

La regla completa vive en `firestore.rules` (`leagueDocOk` y
`match /leagues/{week}/members/{uid}`). Resumen:

- **Leer y escribir:** solo gente de la escuela, `schoolUser()` = alumno de
  `students/`, profesor de `teachers/` o staff. Una cuenta verificada que no
  está en la allowlist (cualquiera puede registrarse desde leccion.html) ya no
  entra: `fetchBoard()` recibe 403 y liga.html pinta la liga simulada.
- **Forma:** solo `{ alias, xp, ts }`; `alias` ≤ 40, `xp` int 0..20000
  (`LEAGUE_WEEK_MAX`).
- **`ts == request.time`** en cada create/update: la hora la pone el servidor.
  Por REST eso solo se logra con `documents:commit` y la transformación
  `REQUEST_TIME`; `vesper_league_cloud.js` manda:

  ```json
  { "writes": [{
      "update": { "name": "projects/<p>/databases/teachermanuals/documents/leagues/<week>/members/<uid>",
                  "fields": { "alias": {"stringValue": "…"}, "xp": {"integerValue": "…"} } },
      "updateTransforms": [{ "fieldPath": "ts", "setToServerValue": "REQUEST_TIME" }]
  }] }
  ```
- **Intervalo:** un update solo pasa si `request.time > ts + 30 s`. El
  cliente espera 31 s desde su última escritura buena (y al menos el rebote de
  1.2 s). Si un update rebota (otro dispositivo escribió hace poco), reintenta
  una vez tras el intervalo; si vuelve a fallar, deja de intentarlo en esa
  página. Lo pendiente sube con el siguiente XP.
- **Topes por escritura:** create ≤ 3000 (`LEAGUE_FIRST_MAX`); update nunca
  baja y sube ≤ 600 (`LEAGUE_STEP`). Con el intervalo, llegar de 3000 a 20000
  cuesta al menos ~15 min de escrituras seguidas.
- Docs viejos con `ts` de texto: su primer update nuevo se acepta sin esperar y
  ya deja `ts` como timestamp.
- Nadie borra (`delete: false`).

Publica las reglas (consola de Firebase → Firestore → base `teachermanuals`
→ Reglas, o `firebase deploy --only firestore:rules`; ver
FIRESTORE_SCHOOL_RULES.md, "Publicar y comprobar"). Tiene efecto inmediato.
**Publica las reglas y el `vesper_league_cloud.js` nuevo juntos:** el cliente
viejo (PATCH con `ts` de texto) ya no pasa la regla nueva y su liga se queda
quieta (no rompe nada más) hasta que el service worker sirva el archivo nuevo.

## Privacidad

La tabla expone, a la gente de la escuela (allowlist y staff), solo el **alias** y el **XP
semanal**. El alias es editable y por defecto anónimo. No se expone el correo
ni ningún otro dato del perfil.

## Limpieza (opcional)

Cada semana crea documentos nuevos bajo `leagues/{weekId}`. Si quieres podar
semanas viejas, borra subcolecciones `leagues/{weekId}` antiguas con una
función programada o manualmente; no afecta al progreso del alumno (que vive en
`progress/{uid}` y en localStorage).
