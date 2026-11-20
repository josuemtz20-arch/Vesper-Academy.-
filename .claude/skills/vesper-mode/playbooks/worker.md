# Worker

`worker/` es el proxy del chat y el calificador de exámenes en Cloudflare. Detalles en `worker/README.md`.

1. Lee `worker/README.md` (control de abuso, secretos, exámenes).
2. Nunca muevas lógica de seguridad, modelo, `max_tokens` ni guardrails al cliente.
3. El `name` de `wrangler.toml` es el Worker vivo; no lo cambies.
4. Cambio de preguntas de examen: edita `_scripts/exams/*.src.js`, corre `node _scripts/exams/split_exams.js`, `wrangler deploy`, y después `git push`, en ese orden. Sitio y Worker con la misma `VESPER_EXAM_VERSION`.
5. Prueba local con `wrangler dev` contra un caso normal, uno con límite excedido (429) y uno sin Turnstile si está activo.
6. **PAUSA.** Pide confirmación antes de `wrangler deploy` o `wrangler secret put`.
