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

- Recibe `POST` con `{ system, messages }` desde `chat.html`.
- Añade `x-api-key` (secreto) y reenvía a `https://api.anthropic.com/v1/messages`
  en modo streaming.
- **Fija** el modelo y `max_tokens` en el servidor (no confía en el cliente),
  valida el origen (CORS) y acota el tamaño del historial.
- **Añade siempre los guardrails** (constante `GUARDRAILS`) al final del system
  prompt: mantienen a Vesper dentro del aprendizaje de inglés y evitan contenido
  dañino o "cancelable", incluso si alguien manipula el navegador o llama al
  proxy directamente. Como se imponen del lado del servidor, no se pueden saltar.
- Devuelve el stream SSE tal cual al navegador.

## Requisitos

- Una cuenta de Cloudflare (el plan gratuito basta).
- Una API key de Anthropic — https://console.anthropic.com/
- Node.js instalado.

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

# 4. Despliega
wrangler deploy
#   -> copia la URL que imprime, p. ej.
#      https://vesper-chat-proxy.<tu-subdominio>.workers.dev
```

## Conectar el chat

Pega esa URL en la constante `PROXY_URL` de `../chat.html`:

```js
var PROXY_URL = "https://vesper-chat-proxy.<tu-subdominio>.workers.dev";
```

Confirma también que tu dominio está en `ALLOWED_ORIGINS` dentro de
`vesper-chat-proxy.js` (ya incluye `vesperacademy.com`).

## Desarrollo local

```bash
wrangler dev          # levanta el Worker en http://localhost:8787
```

Apunta temporalmente `PROXY_URL` a `http://localhost:8787` mientras pruebas.
`localhost` y `127.0.0.1` ya están permitidos en CORS para desarrollo.

## Probar el proxy directamente

```bash
curl -N -X POST "https://vesper-chat-proxy.<tu-subdominio>.workers.dev" \
  -H "Origin: https://vesperacademy.com" \
  -H "Content-Type: application/json" \
  -d '{"system":"You are Vesper, a friendly English tutor.","messages":[{"role":"user","content":"Hi"}]}'
```

Debe devolver una secuencia de eventos `data: {...}` (SSE) con el texto.

## Ajustes

En `vesper-chat-proxy.js`:

- `MODEL_FREE` — `claude-haiku-4-5` (nivel gratis, para todos).
- `MODEL_PRO` — `claude-sonnet-4-6` (nivel Pro, con código).
- `MAX_TOKENS_FREE` / `MAX_TOKENS_PRO` — `512` / `768` (respuestas más cortas = menos costo).

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
- `MAX_TOKENS` — tope de salida por respuesta.
- `MAX_MESSAGES` — turnos de historial que se conservan.
- `ALLOWED_ORIGINS` — dominios autorizados a usar el proxy.
- `GUARDRAILS` — límites de tema y seguridad de Vesper (ámbito = solo inglés,
  sin contenido dañino, apto para todas las edades). Edítalo si quieres ajustar
  la severidad.

## Seguridad

- La API key vive **solo** en el secreto del Worker. Nunca la pongas en el repo,
  en `chat.html`, ni en `wrangler.toml`.
- CORS restringido a tu dominio evita que terceros usen tu proxy (y tu saldo).
- Mejoras futuras recomendadas para tráfico público: rate limiting por IP y/o un
  captcha (Cloudflare Turnstile).
