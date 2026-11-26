# Liga semanal real (Firestore)

La liga semanal funciona **sin cuenta** con rivales simulados. Con sesión
verificada, el alumno compite en una **división real** de su liga (Bronce,
Plata, Oro, Zafiro, Diamante, Soberana): alumnos reales de esa división más rivales de
práctica que rellenan hasta 15. Mientras las reglas nuevas no estén
publicadas, el código se queda en la tabla global de siempre (no se rompe
nada).

## Modelo de datos

Base de datos: `teachermanuals` (la misma que usa `vesper_sync.js`).

```
leagues/{weekId}/members/{uid}  ->  { alias, xp, ts, div?, tier? }
league_place/{uid}              ->  { tier, div, week, last?, ts }
```

- `weekId` ej. `2026-W48` (semana ISO; `vesper_league.js` → `weekId()`).
- `members/{uid}`: cada quien escribe SOLO su entrada. `alias` es el que el
  alumno pone en Configuración o un código anónimo `Estudiante#NNNN`.
  **Nunca se guarda el correo.** `div` (≤20 caracteres, ej. `plata-1`) y
  `tier` (0–5) son opcionales: los clientes viejos en caché siguen
  escribiendo `{ alias, xp, ts }`.
- `league_place/{uid}`: la colocación. `tier` 0–5, `div` ej. `plata-1`,
  `week` = semana para la que vale, `last` = resultado de la semana anterior
  `{ week, rank, fromTier, result: "up"|"down"|"stay"|"idle", div }`. La
  escribe **solo** `_scripts/league_admin.py` con la cuenta de servicio.
  Sin datos personales.

## Ligas

| idx | id | nombre | `sembrar` (mejor semana) | `CLOUD_RATE` |
|---|---|---|---|---|
| 0 | `bronce` | Liga Bronce | < 100 | 0.45 |
| 1 | `plata` | Liga Plata | 100–299 | 1.3 |
| 2 | `oro` | Liga Oro | 300–599 | 3 |
| 3 | `zafiro` | Liga Zafiro | 600–999 | 5.3 |
| 4 | `diamante` | Liga Diamante | 1000–1499 | 8.6 |
| 5 | `soberana` | Liga Soberana (El Soberano del Saber, C2) | ≥ 1500 | 13 |

Soberana se agregó el 2026-11-25 arriba de Diamante: no tiene zona de
ascenso (antes eso lo tenía Diamante). Los índices 0–4 no cambiaron, así que
quien ya estaba colocado en Diamante sigue en `diamante-N` con tier 4; solo
llega a Soberana ganando su división en `cerrar` (o con `sembrar --forzar`).
Para subir de Diamante hay que quedar 3º, unos 1340–1940 XP, por eso
`cerrar` tiene `--tope-xp-diamante` (2500) aparte de `--tope-xp` (1500).

## Reglas (en `firestore.rules`)

- `league_place/{uid}`: lee solo el dueño (`signedIn()` y uid propio);
  nadie escribe desde el cliente (`write: if false`).
- `leagues/{week}/members/{uid}`: lo de antes (XP que no baja, +600 por
  escritura, 3000 la primera, 20000 por semana, solo campos conocidos) más
  `leagueDivOk()`: si vienen `div` y `tier`, van juntos y deben coincidir
  con `league_place/{uid}`; si el alumno no tiene colocación, solo
  `bronce-1` / `0`. Así nadie se muda a una división más fácil.
- Compatible con la rama `propuesta/liga-inscritos` (cambia `signedIn()` por
  `isStudentUser()` en `leagueDocOk` y en la lectura): se fusiona sin
  conflicto.

Pruebas: `python _scripts/test_league_rules.py` (casos de divisiones y
colocación) y `python _scripts/check_rules.py` (todo). Ambas necesitan el
rol "Firebase Rules Admin" en la cuenta de servicio.

## Qué hace el cliente

`vesper_league_cloud.js`:

- `fetchPlacement()` lee `league_place/{uid}` una vez por sesión
  (sessionStorage, 3 h). **403** = reglas nuevas sin publicar → todo como
  antes (tabla global, escritura sin `div`). **404** = sin colocar →
  `bronce-1`, tier 0. **200** = su colocación.
- `pushScore()` añade `div` y `tier` solo si la colocación se leyó con
  200/404. Si la escritura da 403 (colocación vieja en caché), la relee y
  reintenta una vez.
- `fetchBoard(week, div)` lee la división con `runQuery` y filtro
  `div == X` (nunca `listDocuments`, que da 403 en esta base).

`vesper_league.js`:

- `board()` → `{ mode: "cloud"|"local"|"global", tier, tiers, div, rows,
  me, gapUp, leadOver, endsInMs, result, realCount }`. Los rivales de
  práctica se siembran con la semilla `week + ":" + div` y las tasas
  `CLOUD_RATE` (calibradas a los cortes de `sembrar`).
- `standings()`, `myRank()` y `tier()` siguen siendo síncronos; con sesión y
  colocación, el tier local es el de la nube.
- `pendingClose` (en `board()`): la colocación es de la semana pasada y aún
  no trae su resultado (`cerrar` no ha corrido); la app dice "Calculando los
  resultados de la semana pasada…" sin prometer hora.
- La liga local (sin sesión) usa también `CLOUD_RATE` desde 2026-11-25 (con
  `TIERS[].rate` nadie ascendía); el cambio llega a cada quien en su siguiente
  semana, porque los rivales se guardan al empezarla.
- `projection(n)`: el puesto si sumaras n XP, sin red (liga local o la foto
  de la división que el cajón cargó en esa pestaña). Lo usa la pantalla de
  resultado de la lección.

## Operación (cada semana)

```
python _scripts/league_admin.py estado                     # cómo van las divisiones
python _scripts/league_admin.py cerrar --semana 2026-W48   # en seco: qué pasaría
python _scripts/league_admin.py cerrar --semana 2026-W48 --aplicar
```

`cerrar` se corre el **lunes** (la semana ya terminó): ranking final con los
rivales a 168 h, suben los 3 primeros y bajan los 3 últimos de cada
división, y escribe la colocación de la semana siguiente con divisiones de
hasta 15 balanceadas. Quien no jugó conserva su liga. Es idempotente.
La paridad del ranking con la app se prueba con
`python _scripts/test_league_parity.py`.

Primera vez (después de publicar las reglas y ANTES del cliente, ver abajo):

```
python _scripts/league_admin.py sembrar              # en seco
python _scripts/league_admin.py sembrar --aplicar
```

Opciones de `sembrar` (los valores por defecto no cambian): `--criterio mediana`
(mediana de las semanas con XP en vez de la mejor), `--bajar-uno` (una liga
menos) y `--una-division` (todos en una sola división de una sola liga
mientras haya pocos activos). `cerrar` no asciende a nadie con más de
`--tope-xp` (1500 por defecto) en la semana, avisa de las entradas cuyo
`div` falta o no coincide con su colocación, y no reescribe a quien lleva más
de una semana sin jugar si su división sigue existiendo.

## Orden para publicar (revisado 2026-11-25)

1. **Reglas** (`firestore.rules`). Los clientes publicados siguen funcionando:
   escriben sin `div`, que se sigue aceptando.
2. **`sembrar --aplicar`, el lunes temprano** (antes de que se juegue la
   semana). Así, cuando llegue el cliente nuevo, cada alumno ya tiene su
   división desde el primer día. Si el cliente saliera antes, todos leerían
   404 y empezarían la semana en `bronce-1`; al sembrar a mitad de semana su
   entrada quedaría en otra división que su colocación (el cliente se
   recupera releyendo tras un 403, pero la tabla de esa semana sale rara).
3. **Cliente**: `vesper_league.js`, `vesper_league_cloud.js`,
   `vesper_league_ui.js`, `leccion_app.js`, `assets/css/leccion.css`,
   `liga.html`, `eliminar-cuenta.html`, con `python _scripts/preflight.py
   --fix` (CACHE_VERSION de `sw.js` y los `?v=` de `liga.html`). Si saliera
   antes que las reglas, leería 403 en `league_place` y se quedaría en la
   tabla global (sin romper nada).
4. Desde entonces, `cerrar` cada lunes.

Soberana (2026-11-25): primero las reglas (`tier` 0–5), luego el cliente, y
solo entonces un `cerrar` que pueda subir a alguien de Diamante. Con las
reglas o el cliente viejos, una colocación `tier: 5` / `soberana-N` se lee
como "sin colocar" (bronce-1) y sus escrituras dan 403. Mientras nadie real
llegue a Diamante (hoy el máximo semanal es 762) no hay prisa.

## Pendiente (fase 2 y huecos conocidos)

- **Fase 2: `div` y `tier` obligatorios.** Hoy son opcionales para no romper
  a los clientes viejos en caché. Cuando los service workers se hayan
  renovado (unas semanas después de publicar el cliente; `cerrar` avisa de
  las entradas sin `div`, y cuando dejen de salir ya se puede), quitar en
  `leagueDivOk` la rama `(!('div' in d) && !('tier' in d))`. Ojo: entonces
  `eliminar-cuenta.html` ya no puede borrar `div`/`tier` para anonimizar;
  tendría que mandar el `div`/`tier` de la colocación junto con el alias.
- **Inflar el XP a mano.** Con un idToken y un PATCH a mano, un alumno puede
  subir su XP semanal hasta los topes de la regla (600 por escritura, 20 000
  a la semana) sin hacer lecciones: la regla no sabe cuántas hizo. Los topes
  y el `--tope-xp` de `cerrar` limitan el daño (no asciende), pero la tabla
  de esa semana sí lo muestra. Cerrarlo de verdad pediría que el XP lo
  escriba el servidor (el Worker) al calificar.

## Privacidad

La tabla expone, a otros usuarios autenticados, solo el **alias**, el
**XP semanal** y la división. `league_place` solo lo lee su dueño. No se
expone el correo ni ningún otro dato del perfil.

## Limpieza (opcional)

Cada semana crea documentos nuevos bajo `leagues/{weekId}`. Se pueden podar
semanas viejas sin afectar el progreso del alumno (que vive en
`progress/{uid}` y en localStorage). `league_place/{uid}` no se borra al
eliminar la cuenta (no tiene datos personales, pero queda el uid).
