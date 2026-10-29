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
| `RL_GLOBAL_PER_DAY` | 5000 | mensajes/día en total (freno de mano del costo) |

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
| `RL_*` | variable | no | `[vars]` en `wrangler.toml` |

## Seguridad

- La API key vive **solo** en el secreto del Worker. Nunca la pongas en el repo,
  en `chat.html`, ni en `wrangler.toml`.
- CORS restringido a tu dominio solo frena el uso desde navegadores ajenos; el
  saldo lo protegen los límites por IP, el tope global y Turnstile.
- Pon además un **límite de gasto mensual** en la consola de Anthropic
  (Settings → Limits): es la última red si algo falla aquí.
