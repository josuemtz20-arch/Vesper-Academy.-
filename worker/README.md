# Vesper Chat Proxy (Cloudflare Worker)

Proxy mínimo que conecta el chat de la app (`chat.html`) con la API de Claude
(Anthropic) **ocultando la API key**. El sitio de Vesper es estático (GitHub
Pages), así que no puede guardar una key secreta; este Worker la guarda como
secreto del lado del servidor y reenvía las peticiones.

```
chat.html  ──POST {system, messages}──►  Worker (key secreta)  ──►  api.anthropic.com
        ◄────────── stream SSE ──────────  (CORS)  ◄── stream SSE ──
```

## Qué hace

- Recibe `POST` con `{ system, messages }` desde `chat.html` (más `proCode`,
  `session` y `turnstileToken`, opcionales).
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
| 3 | Tope **global** diario (todas las IPs juntas) | Durable Object `RateLimiter` ("global") | `503` + `Retry-After`, `code: "busy"` |

Límites por defecto (constante `RATE_DEFAULTS`; se cambian sin tocar código con
`[vars]` en `wrangler.toml` o en el panel; `0` desactiva ese límite):

| Variable | Defecto | Qué cuenta |
|----------|---------|------------|
| `RL_FREE_PER_MIN` | 12 | mensajes/minuto por IP, nivel gratis |
| `RL_FREE_PER_DAY` | 200 | mensajes/día por IP, nivel gratis |
| `RL_PRO_PER_MIN` | 30 | mensajes/minuto por IP, con código Pro válido |
| `RL_PRO_PER_DAY` | 1000 | mensajes/día por IP, con código Pro válido |
| `RL_GLOBAL_PER_DAY` | 2000 | mensajes/día en total (freno de mano del costo) |

Además, antes de llamar a Claude el Worker recorta la entrada (2026-11):
`MAX_SYSTEM_CHARS` 4000, `MAX_MESSAGE_CHARS` 3000 por mensaje y
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
el Worker deja pasar y lo registra en los logs (`wrangler tail`), para no tumbar
el chat; `max_tokens` fijo sigue acotando el costo por mensaje. Si `siteverify`
no responde, en cambio, **no** deja pasar (sería saltarse el reto).

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

1. Panel de Cloudflare → **Turnstile** → *Add widget*.
   - Hostnames: `vesperacademy.com`, `www.vesperacademy.com` (y `localhost`
     si quieres probar en local).
   - Widget mode: **Invisible** o **Managed** (el chat usa
     `appearance: "interaction-only"`: solo muestra una casilla si Cloudflare
     duda).
2. Copia la **site key** (pública) en `TURNSTILE_SITE_KEY` de `../chat.html`.
3. Guarda la **secret key** como secreto del Worker:
   ```bash
   cd worker
   wrangler secret put TURNSTILE_SECRET
   # opcional: clave propia para firmar la sesión de 1 h (si no, usa TURNSTILE_SECRET)
   wrangler secret put SESSION_SECRET
   ```
4. Publica `chat.html` (git push) **antes o a la vez** que el secreto: con
   `TURNSTILE_SECRET` puesto y sin site key en la página, el chat responde
   "Verificación de seguridad pendiente".

La CSP de `chat.html` ya permite `https://challenges.cloudflare.com` (script,
iframe y conexión). Sin `TURNSTILE_SECRET` el Worker no exige reto y el chat
funciona como antes, solo con los límites de uso.

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
  -d '{"system":"You are Vesper, a friendly English tutor.","messages":[{"role":"user","content":"Hi"}]}'
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

`FIREBASE_SA` es el JSON de una cuenta de servicio con permiso de escribir en
Firestore. Lo ideal es una cuenta SOLO para esto (rol "Cloud Datastore User"),
no la de administración: si alguien la robara del Worker, no tendría más.

Pruebas: `wrangler dev` con `EXAM_DEV=1` en `worker/.dev.vars` (no escribe en
Firestore) y luego

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

## WhatsApp: agente en modo borrador (2026-11)

`whatsapp_agent.js` redacta respuestas a los mensajes de WhatsApp con Claude y
la base de conocimiento `whatsapp_kb.md`. **No envía nada solo**: una persona
revisa, edita y envía cada borrador desde `wa_bandeja.html`.

```
Cliente ─► Meta ─► POST /wa/webhook (firma HMAC) ─► DO WaThread (espera 20 s)
        ─► Claude redacta {reply|escalate} ─► Firestore wa_threads/{número}
        ─► wa_bandeja.html ─► POST /wa/send ─► API de WhatsApp ─► Cliente
```

### Lo que hay que hacer en Meta (una vez)

1. Cuenta de **Meta Business** verificada y una app en developers.facebook.com
   con el producto **WhatsApp**.
2. Dar de alta el número en la **WhatsApp Cloud API**. Antes de migrar el
   55 3569 9899, revisa si en tu región se puede seguir usando en la app de
   WhatsApp Business a la vez ("coexistencia"); si no, el número deja de
   funcionar en la app.
3. Crear un **token permanente** (usuario del sistema con permiso
   `whatsapp_business_messaging`). El token temporal de 24 h no sirve.
4. Webhook: URL `https://patient-feather-4364.josuemtz20.workers.dev/wa/webhook`,
   token de verificación = el mismo texto que `WA_VERIFY_TOKEN`, y suscribir el
   campo **messages**.

### Secretos y despliegue

```bash
cd worker
wrangler secret put WA_TOKEN            # token permanente de Meta
wrangler secret put WA_APP_SECRET       # App settings → Basic → App secret
wrangler secret put WA_VERIFY_TOKEN     # un texto largo que inventes
wrangler secret put WA_PHONE_NUMBER_ID  # id del número (no el teléfono)
wrangler secret put WA_ADMINS           # tu correo (si no tienes doc en roles/)
wrangler deploy                         # crea el DO WaThread (migración v3)
```

Necesita también `ANTHROPIC_API_KEY` y `FIREBASE_SA` (ya existen).
Opcional: `WA_NOTIFY_URL` (por ejemplo `https://ntfy.sh/<tema-secreto>`) para
recibir un aviso en el teléfono cuando hay un borrador. El aviso no lleva datos
del cliente.

### Quién entra a la bandeja

Sesión con correo verificado **y** `roles/{correo}.role` = `admin` o
`coordinator`, o el correo en `WA_ADMINS`. La colección `wa_threads` no tiene
regla en `firestore.rules`, así que el navegador no puede leerla: todo pasa
por el Worker con la cuenta de servicio.

### Límites y costos

- Modelo `claude-opus-5-5` con salida estructurada. Si el modelo rechaza un
  mensaje, el servidor reintenta con otro modelo (`fallbacks: "default"`).
- Topes de borradores con IA: 25 por conversación al día y 500 al día en total
  (`RL_WA_PER_THREAD_DAY`, `RL_WA_GLOBAL_DAY`). Al llegar al tope el mensaje
  pasa a "Necesita persona".
- Audios, imágenes y documentos no se mandan a Claude: van directo a
  "Necesita persona".
- WhatsApp solo deja contestar con texto libre **dentro de las 24 h** después
  del último mensaje del cliente. Pasado eso, la bandeja bloquea el envío.

### Antes de activarlo

`whatsapp_kb.md` es lo único que el agente da por cierto. Hoy tiene ~36
`[FALTA]` (precio del Club, horarios por grupo, formas de pago, reembolsos,
fechas de inicio…). Cada pregunta sobre esos datos se escala a una persona.
Llénalos y vuelve a desplegar. **La promo del Buen Fin vence el 30 de nov:
bórrala del archivo después de esa fecha.**
