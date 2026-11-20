---
name: proxy-ia-worker
description: >
  Chat o asistente con la API de Claude en un sitio estático, usando un Cloudflare Worker que esconde la
  API key, fija modelo y límites y frena el abuso. Úsala para añadir un chat/tutor/asistente IA, ajustar
  límites o guardrails, desplegar el Worker o investigar consumo de saldo.
---

# Proxy de IA (Cloudflare Worker)

```
navegador ──POST {system, messages}──► Worker (secreto ANTHROPIC_API_KEY) ──► api.anthropic.com
          ◄────────────── stream SSE ──────────────────────────────────────────
```

## Lo que impone el servidor (no el navegador)
Modelo, `max_tokens`, tamaño del historial, guardrails al final del system prompt, límite por IP
(minuto/día) y tope global diario, en `worker/proxy.js`. El cliente (`assets/js/chat.js`) no decide nada de eso.

## Por qué así
- Un sitio estático no puede guardar secretos: la key va en `npx wrangler secret put ANTHROPIC_API_KEY`.
- **CORS no protege el saldo**: `curl -H "Origin: ..."` lo falsifica. Las barreras reales son los límites
  por IP + tope global (Durable Object `RateLimiter`). Si hay abuso: Cloudflare Turnstile antes del chat.
- El `name` de `wrangler.toml` ES el Worker vivo: cambiarlo crea otro Worker y deja el viejo abierto con la key.

## Despliegue
```bash
cd worker && npx wrangler deploy
```
```bash
npx wrangler secret put ANTHROPIC_API_KEY
```
Pon la URL resultante en `modulos.ia.worker_url` (o directo en `assets/js/chat.js`) y en la CSP (`connect-src`).

## Modelo
Por defecto el más barato y rápido de la familia actual (Haiku). Para dudas de modelos, precios o
parámetros, consulta la skill `claude-api` en vez de responder de memoria.

## Producto
Si la app va a Play Store con IA generativa: botón para **reportar respuestas** (requisito de Google).
