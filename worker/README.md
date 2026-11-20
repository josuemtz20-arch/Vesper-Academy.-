# Vesper Chat Proxy (Cloudflare Worker)

Proxy mínimo que conecta el chat de la app (`chat.html`) con la API de Claude
(Anthropic) **ocultando la API key**. El sitio de Vesper es estático (GitHub
Pages), así que no puede guardar una key secreta; este Worker la guarda como
secreto del lado del servidor y reenvía las peticiones.

```
chat.html  ──POST {persona, messages}──►  Worker (key secreta)  ──►  api.anthropic.com
        ◄────────── stream SSE ──────────  (CORS)  ◄── stream SSE ──
```

## Qué hace

- Recibe `POST` con `{ persona, messages }` desde `chat.html` y
  `entrevista.html` (más `proCode`, `session` y `turnstileToken`, opcionales).
- **Arma el system prompt en el servidor** (`persona_prompt.js`). `persona`
  trae solo valores de listas cerradas (`mode: "chat"|"interview"`, tono,
  nivel CEFR, enfoque, temas, puesto…) más tres textos cortos saneados
  (nombre ≤24, puesto "otro" ≤60, vacante pegada ≤1200 entre comillas
  triples como dato). Un valor desconocido = `400 bad_persona`. Antes el
  navegador mandaba un `system` libre y cualquiera podía usar el proxy como
  IA genérica. Las plantillas son copia de `vesper_persona.js` y
  `vesper_entrevista.js`: si cambias una frase del tutor, cámbiala aquí.
- **Compatibilidad (una versión):** un cliente viejo que manda `system` sin
  `persona` no recibe error: su `system` se ignora y obtiene el tutor
  estándar (`DEFAULT_SYSTEM`). Quitar ese respaldo en la siguiente versión.
- **Valida el historial:** debe empezar con `user`, alternar estrictamente
  `user`/`assistant` y terminar con `user`; si no, `400 bad_messages`.
- En el reporte de la entrevista (`step: "scores"|"fixes"`) envuelve cada
  respuesta del alumno en `<candidate_answer>…</candidate_answer>` y le dice
  al modelo que es dato, nunca instrucción.
- Añade `x-api-key` (secreto) y reenvía a `https://api.anthropic.com/v1/messages`
  en modo streaming.
- **Fija** el modelo y `max_tokens` en el servidor (no confía en el cliente)
  y acota el tamaño del historial.
- **Frena el abuso** (cada mensaje cuesta saldo de Anthropic) — ver
  [Control de abuso](#control-de-abuso).
- **Añade siempre los guardrails** (constante `GUARDRAILS`) al final del system
  prompt: mantienen a Vesper dentro del aprendizaje de inglés y evitan contenido
  dañino o "cancelable", incluso si alguien manipula el navegador o llama al
  proxy directamente. Como se imponen del lado del servidor, no se pueden saltar.
- Devuelve el stream SSE tal cual al navegador.

## Control de abuso

El header `Origin` (CORS) **no protege el saldo**: cualquiera lo escribe a mano
con `curl -H "Origin: https://vesperacademy.com"`. Se conserva porque impide que
otras webs usen el proxy desde el navegador de sus visitantes, pero las
barreras reales son estas, en orden:

| # | Barrera | Dónde | Respuesta si falla |
|---|---------|-------|--------------------|
| 1 | Límite **por IP** (`CF-Connecting-IP`) por minuto y por día UTC | Durable Object `RateLimiter` | `429` + `Retry-After`, `code: "rate_limited"` |
| 2 | **Turnstile** (opcional): reto invisible validado contra `siteverify`; tras uno válido el Worker entrega una sesión firmada (HMAC, ligada a la IP, 1 h) en `X-Vesper-Session` | secreto `TURNSTILE_SECRET` | `401`, `code: "turnstile_required"` |
| 3 | Tope **global** diario (todas las IPs juntas), uno gratis y otro Pro | Durable Object `RateLimiter` ("global" / "global-pro") | `503` + `Retry-After`, `code: "busy"` |

Además, **candado del código Pro:** cada código equivocado cuenta en
`pro-fail:<IP>:<hora>`. Pasados `RL_PRO_CODE_FAILS_PER_HOUR` (5), esa IP no
puede probar códigos el resto de la hora: ni el correcto vale (si valiera, la
respuesta Pro delataría el acierto). No da error: el mensaje sale en gratis,
así un alumno con un código viejo guardado sigue practicando.

Límites por defecto (constante `RATE_DEFAULTS`; se cambian sin tocar código con
`[vars]` en `wrangler.toml` o en el panel; `0` desactiva ese límite):

| Variable | Defecto | Qué cuenta |
|----------|---------|------------|
| `RL_FREE_PER_MIN` | 12 | mensajes/minuto por IP, nivel gratis |
| `RL_FREE_PER_DAY` | 200 | mensajes/día por IP, nivel gratis |
| `RL_PRO_PER_MIN` | 30 | mensajes/minuto por IP, con código Pro válido |
| `RL_PRO_PER_DAY` | 1000 | mensajes/día por IP, con código Pro válido |
| `RL_GLOBAL_PER_DAY` | 2000 | mensajes/día en total, nivel gratis (freno de mano del costo) |
| `RL_PRO_GLOBAL_PER_DAY` | 1000 | mensajes/día en total, nivel Pro (cupo aparte: el abuso en gratis no deja sin chat a quien paga) |
| `RL_PRO_CODE_FAILS_PER_HOUR` | 5 | códigos Pro equivocados por IP y por hora |

Además, antes de llamar a Claude el Worker recorta la entrada (2026-11):
`MAX_MESSAGE_CHARS` 3000 por mensaje y
`MAX_INPUT_CHARS` 20000 en total (descarta los mensajes más viejos). Con
Haiku 4.5 eso deja el peor caso en ~0.01 USD por mensaje. El tope **duro** de
gasto no es este Worker: ponlo en la consola de Anthropic (*Settings → Limits*).

> Un salón de clases detrás de un mismo router comparte **una** IP pública. Si
> das clase con el chat a un grupo grande, sube `RL_FREE_PER_DAY` o da a esos
> alumnos el código Pro (contador aparte y con más margen).

**Por qué Durable Object y no KV:** KV es eventualmente consistente (dos
peticiones simultáneas pueden leer el mismo contador) y en el plan gratuito
solo admite ~1000 escrituras al día; contar cada mensaje lo agotaría. Un
Durable Object procesa en serie las llamadas a una misma clave, así que el
conteo es exacto. Las instancias se limpian solas al terminar el día (alarma).

**Degradación:** si el Durable Object no responde (incidencia de Cloudflare),
los contadores **por IP** dejan pasar y lo registran en los logs (`wrangler
tail`), para no tumbar el chat. Los topes **globales** fallan **cerrado**: sin
contador no se llama a Claude (`503 busy`, "vuelve en un minuto"), porque son
el freno de mano del costo. El candado del código Pro también falla cerrado
(todo va como gratis). Si `siteverify` no responde, tampoco deja pasar.

## Requisitos

- Una cuenta de Cloudflare (el plan gratuito basta; los Durable Objects con
  backend SQLite están incluidos en él).
- Una API key de Anthropic — https://console.anthropic.com/
- Node.js instalado.

## Qué Worker está en producción

`chat.html` apunta a `https://patient-feather-4364.josuemtz20.workers.dev/`, y
desde el 2026-10-29 `wrangler.toml` dice `name = "patient-feather-4364"`
(antes decía `vesper-chat-proxy`). `wrangler deploy` publica con el nombre de
`wrangler.toml`, así que ahora **reemplaza el código del Worker vivo**: la URL
no cambia, los secretos que ya tenga se conservan y no hay que tocar
`chat.html`.

Antes del primer despliegue, mira en el panel de Cloudflare → Workers & Pages
qué código corre hoy en `patient-feather-4364` y si existe además un Worker
`vesper-chat-proxy` (sobra: bórralo, o al menos su secreto `ANTHROPIC_API_KEY`).

## Despliegue (una vez)

```bash
# 1. Instala wrangler (CLI de Cloudflare Workers)
npm install -g wrangler

# 2. Inicia sesión en Cloudflare (abre el navegador)
wrangler login

# 3. Desde esta carpeta (worker/), guarda la API key como SECRETO
cd worker
wrangler secret put ANTHROPIC_API_KEY
#   -> pega tu key de Anthropic cuando lo pida (no se guarda en el repo)

# 4. Despliega (crea también el Durable Object RateLimiter por la
#    migración "v1" de wrangler.toml; no hay que crear nada más a mano)
wrangler deploy
#   -> copia la URL que imprime, p. ej.
#      https://vesper-chat-proxy.<tu-subdominio>.workers.dev
```

Si el Worker ya existía, el mismo `wrangler deploy` aplica la migración y
activa los límites; los secretos que ya tenía se conservan.

## Activar Turnstile (recomendado)

La site key se configura en **un solo lugar**: la variable
`TURNSTILE_SITE_KEY` del Worker. Cuando el Worker exige el reto, responde
`401 {"code":"turnstile_required","sitekey":"…"}`; `chat.html` y
`vesper_entrevista.js` aprenden la key de ahí (la recuerdan en el
dispositivo: `vesper_ts_sitekey`), resuelven el reto invisible, reintentan y
reciben la sesión firmada `X-Vesper-Session` (1 h, ligada a la IP). Ya no hay
que pegar nada en las páginas.

1. Panel de Cloudflare → **Turnstile** → *Add widget*.
   - Hostnames: `vesperacademy.com` y `www.vesperacademy.com` (más
     `localhost` / `127.0.0.1` si quieres probar en local).
   - Widget mode: **Invisible** o **Managed** (las páginas usan
     `appearance: "interaction-only"`: solo muestran una casilla si
     Cloudflare duda).
2. En `wrangler.toml` descomenta `[vars]` y la línea `TURNSTILE_SITE_KEY`, y
   pega la **site key** (pública). Si ya usas variables en el panel, ponla
   ahí en su lugar (Settings → Variables, tipo *Text*).
3. Guarda la **secret key** y despliega:
   ```bash
   cd worker
   wrangler secret put TURNSTILE_SECRET
   # opcional: clave propia para firmar la sesión de 1 h (si no, usa TURNSTILE_SECRET)
   wrangler secret put SESSION_SECRET
   wrangler deploy
   ```
   El orden importa poco: sin `TURNSTILE_SECRET` el Worker no exige reto
   (aunque ya tenga la site key) y el chat funciona como hoy, solo con los
   límites de uso. Con el secreto y **sin** `TURNSTILE_SITE_KEY` el chat
   respondería "Verificación de seguridad pendiente": pon las dos juntas.
4. Comprueba: el `curl` de abajo debe dar `401` con `sitekey`, y el chat en
   el sitio debe seguir respondiendo (la primera vez tarda ~1 s más).

La CSP de `chat.html` y `entrevista.html` ya permite
`https://challenges.cloudflare.com` (script, iframe y conexión). Para
apagarlo, borra el secreto: las páginas olvidan la key solas en cuanto el
Worker deja de pedir el reto.

## Conectar el chat

Pega la URL del Worker en la constante `PROXY_URL` de `../chat.html`:

```js
var PROXY_URL = "https://vesper-chat-proxy.<tu-subdominio>.workers.dev";
```

Si cambias la URL, actualízala también en `connect-src` de la
`Content-Security-Policy` de `chat.html` (la etiqueta `<meta>` al inicio del
`<head>`; `_scripts/apply_csp.py` la regenera en todas las páginas), o el
navegador bloqueará la conexión.

Confirma también que tu dominio está en `ALLOWED_ORIGINS` dentro de
`vesper-chat-proxy.js` (ya incluye `vesperacademy.com`).

## Desarrollo local

```bash
wrangler dev          # levanta el Worker en http://localhost:8787
```

Apunta temporalmente `PROXY_URL` a `http://localhost:8787` mientras pruebas.
`localhost` y `127.0.0.1` ya están permitidos en CORS para desarrollo. En
`wrangler dev` los Durable Objects funcionan en local.

## Probar el proxy directamente

```bash
curl -N -X POST "https://vesper-chat-proxy.<tu-subdominio>.workers.dev" \
  -H "Origin: https://vesperacademy.com" \
  -H "Content-Type: application/json" \
  -d '{"persona":{"mode":"chat"},"messages":[{"role":"user","content":"Hi"}]}'
```

Sin Turnstile debe devolver una secuencia de eventos `data: {...}` (SSE). Con
`TURNSTILE_SECRET` puesto debe devolver `401 {"code":"turnstile_required"}`:
esa es la prueba de que un curl ya no gasta saldo. Repetido más de
`RL_FREE_PER_MIN` veces en un minuto debe devolver `429`.

Para ver los rechazos en vivo: `wrangler tail`.

## Ajustes

En `vesper-chat-proxy.js`:

- `MODEL_FREE` — `claude-haiku-4-5` (nivel gratis, para todos).
- `MODEL_PRO` — `claude-sonnet-4-6` (nivel Pro, con código).
- `MAX_TOKENS_FREE` / `MAX_TOKENS_PRO` — `512` / `768` (respuestas más cortas = menos costo).
- `MAX_MESSAGES` — turnos de historial que se conservan.
- `RATE_DEFAULTS` — límites de uso (ver arriba; mejor cambiarlos con `[vars]`).
- `SESSION_TTL_S` — vigencia de la sesión tras Turnstile (1 h).
- `ALLOWED_ORIGINS` — dominios autorizados en CORS.
- `GUARDRAILS` — límites de tema y seguridad de Vesper (ámbito = solo inglés,
  sin contenido dañino, apto para todas las edades). Edítalo si quieres ajustar
  la severidad.

En `persona_prompt.js`: las plantillas del tutor (chat) y de la entrevista, y
los vocabularios aceptados (`TONES`, `TOPICS`, `ROLES`…). Un tono, tema o
puesto nuevo en las páginas tiene que agregarse también aquí, o el Worker
responde `400 bad_persona`.

## Nivel Pro (Sonnet con código) — opcional

El chat tiene dos niveles: **gratis** (Haiku, para todos) y **Pro** (Sonnet, para
alumnos/pago). El nivel Pro se desbloquea con un **código** que el alumno escribe en
el chat (botón de la insignia arriba a la derecha). El Worker valida ese código
contra un **secreto**; nunca confía en el cliente.

Para activarlo, define el secreto `PRO_CODE`:

```bash
cd worker
wrangler secret put PRO_CODE
#   -> escribe el código que quieras, p. ej.  VESPER-PRO-2026
```

O en el panel: tu Worker → **Settings → Variables and Secrets** → añade `PRO_CODE`.

- **Entregar acceso:** dale ese código a los alumnos / a quien pague.
- **Revocar a todos:** cambia el secreto `PRO_CODE` (rotación). Los códigos viejos
  dejan de funcionar y vuelven a Haiku.
- **Si NO defines `PRO_CODE`:** no pasa nada — todo el mundo usa Haiku (gratis).

## Secretos y bindings (resumen)

| Nombre | Tipo | Obligatorio | Cómo |
|--------|------|-------------|------|
| `ANTHROPIC_API_KEY` | secreto | sí | `wrangler secret put ANTHROPIC_API_KEY` |
| `RATE_LIMITER` | Durable Object | sí (ya en `wrangler.toml`) | se crea con `wrangler deploy` |
| `TURNSTILE_SECRET` | secreto | recomendado | `wrangler secret put TURNSTILE_SECRET` |
| `TURNSTILE_SITE_KEY` | variable (pública) | sí, si hay `TURNSTILE_SECRET` | `[vars]` en `wrangler.toml` |
| `SESSION_SECRET` | secreto | no | `wrangler secret put SESSION_SECRET` |
| `PRO_CODE` | secreto | no | `wrangler secret put PRO_CODE` |
| `FIREBASE_SA` | secreto | sí, para guardar notas de exámenes | ver "Exámenes" |
| `EXAM_ATTEMPTS` | Durable Object | sí (ya en `wrangler.toml`) | se crea con `wrangler deploy` (migración v2) |
| `RL_*` | variable | no | `[vars]` en `wrangler.toml` |

## Exámenes calificados en el servidor (2026-11)

Los exámenes de nivel (A1–C2) y los jefes de mundo de `leccion.html` ya no
traen las respuestas en el sitio. Las califica este Worker (`exam_grader.js`,
rutas `/exam/start`, `/exam/answer`, `/exam/finish`), que además guarda la nota
en Firestore (`exam_results`, con `gradedBy: "worker"`). Las reglas rechazan
esas notas si llegan desde el navegador.

- **Examen de nivel = a ciegas.** `/exam/answer` solo responde
  `{ok:true, first}`: ni si estuvo bien ni la clave. La nota y el desglose por
  destreza (`skills`) llegan en `/exam/finish`. El **jefe** sí devuelve
  `correct` + `reveal` en cada respuesta (es práctica de juego).
- **Exámenes por curso (`exam.html`).** También los califica el Worker:
  `/exam/course/start {examId, idToken}` lee `exams/{id}` de Firestore con la
  cuenta de servicio, revisa el acceso (igual que `studentBookAllowed()` de
  las reglas, o profesor/admin) y devuelve las preguntas **sin** `answer`;
  `/exam/course/finish {attemptId, idToken, answers}` califica y guarda
  (`examType "exam"`, `examId "exam:<curso>"`). La clave del intento queda en
  el Durable Object, nunca en el navegador. Writing/Speaking no se manda: lo
  evalúa el profesor. Las reglas ya no dejan al alumno leer `exams/`.
- **Solo guarda quien abrió el intento.** `start` recibe el `idToken`; el uid
  queda en el intento y `finish` solo guarda si el `idToken` de ese momento es
  del mismo uid (`why: "session_mismatch"` si no).
- **Tope de intentos calificados** (examen de nivel y por curso; el jefe no):
  por defecto 3 por cuenta y examen cada 7 días (`EXAM_CAP_MAX/DAYS`,
  `COURSE_EXAM_CAP_MAX/DAYS` en `[vars]`, ver `wrangler.toml`). Pasado el tope
  se devuelve la nota con `saved:false, why:"attempt_cap"`. El contador es una
  instancia más del DO `EXAM_ATTEMPTS` (`cap:<uid>:<kind>:<nivel|curso>`): sin
  binding ni migración nuevos.
- **Riesgo que queda:** sin sesión se puede practicar sin límite de cuenta
  (solo el límite por IP), y la nota final es un oráculo: alguien paciente
  podría deducir la clave cambiando una respuesta por intento. Lo frena el
  límite por IP de `/exam/start`; bájalo (`RL_EXAM_START_PER_DAY`) si hiciera
  falta. Ninguna de esas notas de práctica se guarda.

- **Fuente con claves (privada):** `_scripts/exams/vesper_*_exams.src.js`. Se
  editan ahí; nunca los `vesper_*_exams.js` de la raíz, que son generados.
- **Generar:** `node _scripts/exams/split_exams.js` escribe los dos archivos
  públicos y `worker/exam_keys.json` (fuera de git; `wrangler deploy` lo
  empaqueta y falla si no existe). Preflight (H) avisa si algo quedó viejo.
- **Versión:** sitio y Worker deben llevar la misma `VESPER_EXAM_VERSION`; si
  no, el examen pide recargar. Cada cambio de preguntas = generar, `wrangler
  deploy` y luego `git push`, en ese orden.

Despliegue (desde `worker/`, PowerShell):

```powershell
node ..\_scripts\exams\split_exams.js
Get-Content ..\_scripts\service_account.json -Raw | wrangler secret put FIREBASE_SA
wrangler deploy
```

**Orden cuando cambian Worker, sitio y reglas a la vez** (como el examen a
ciegas + los exámenes por curso): 1) `wrangler deploy` (las rutas nuevas son
aditivas y el `exam.html` viejo sigue leyendo `exams/` por su cuenta),
2) `git push` del sitio (el `exam.html` nuevo ya usa `/exam/course/*`),
3) publicar `firestore.rules` (quita la lectura de `exams/` al alumno y las
notas de examen desde el navegador). Publicar las reglas antes que el sitio
deja sin examen a quien tenga el `exam.html` viejo.

`FIREBASE_SA` es el JSON de una cuenta de servicio con permiso de escribir en
Firestore. Lo ideal es una cuenta SOLO para esto (rol "Cloud Datastore User"),
no la de administración: si alguien la robara del Worker, no tendría más.

Pruebas sin wrangler (banco y Google falsos; no necesita `exam_keys.json`):

```bash
node worker/test_exam_grader.mjs
```

Con `wrangler dev` y `EXAM_DEV=1` en `worker/.dev.vars` (no escribe en
Firestore; el idToken `dev:<correo>` o `dev:<correo>#<uid>` simula la sesión),
luego

```bash
node ../_scripts/exams/test_worker_exams.js --root ..
python ../_scripts/exams/e2e_exams.py --root .. exam:A1 boss:C1
```

## Seguridad

- La API key vive **solo** en el secreto del Worker. Nunca la pongas en el repo,
  en `chat.html`, ni en `wrangler.toml`.
- CORS restringido a tu dominio solo frena el uso desde navegadores ajenos; el
  saldo lo protegen los límites por IP, el tope global y Turnstile.
- Pon además un **límite de gasto mensual** en la consola de Anthropic
  (Settings → Limits): es la última red si algo falla aquí.
