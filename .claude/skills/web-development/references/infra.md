# Seguridad de red e infraestructura

## Índice
1. Cifrado en tránsito (TLS/HTTPS/HSTS)
2. Cifrado en reposo
3. Cabeceras de seguridad HTTP (valores listos)
4. Dónde configurar cabeceras (nginx, Express, Django, Laravel, Cloudflare, estático)
5. WAF y protección DDoS
6. Auditoría de dependencias y cadena de suministro
7. Respaldos
8. Monitoreo

---

## 1. Cifrado en tránsito

- HTTPS en todo (Let's Encrypt / certificado del proveedor). TLS 1.2 mínimo,
  1.3 preferido; desactiva TLS 1.0/1.1 y cifrados débiles.
- Redirección 301 de `http://` → `https://` en el borde.
- **HSTS:** `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`.
  Empieza con `max-age=300` para probar; súbelo cuando todo subdominio sirva
  HTTPS. `preload` (hstspreload.org) es difícil de revertir: solo cuando
  estés seguro.
- Conexiones internas también cifradas: app ↔ BD (`sslmode=require`),
  app ↔ Redis (TLS), servicios entre sí.
- Verifica con `scripts/check_headers.sh` y SSL Labs (objetivo: A/A+).

## 2. Cifrado en reposo

- Activa el cifrado del disco/volumen y de la BD gestionada (RDS, Cloud SQL,
  Supabase lo traen).
- Campos especialmente sensibles (documentos de identidad, tokens de terceros,
  datos de salud): cifrado a nivel de aplicación con AES-256-GCM o
  libsodium, llave en KMS, nunca junto a los datos.
- Respaldos cifrados también.
- Contraseñas **no** se cifran: se hashean (Argon2id, ver `appsec.md`).

## 3. Cabeceras de seguridad HTTP

| Cabecera | Valor recomendado | Mitiga |
|---|---|---|
| `Content-Security-Policy` | ver abajo | XSS, inyección de scripts, clickjacking (`frame-ancestors`) |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains` | degradación a HTTP |
| `X-Content-Type-Options` | `nosniff` | MIME sniffing |
| `X-Frame-Options` | `DENY` (legado; usa también `frame-ancestors`) | clickjacking |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | fuga de URLs |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=(), payment=()` (abre solo lo que uses) | abuso de APIs del navegador |
| `Cross-Origin-Opener-Policy` | `same-origin` (o `same-origin-allow-popups` con login por popup) | ataques entre ventanas |
| `Cross-Origin-Resource-Policy` | `same-origin` en APIs | lectura cruzada de recursos |
| Quitar | `X-Powered-By`, `Server` con versión | huellas del stack |

### CSP de partida (estricta, con nonce)
```
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'nonce-{RANDOM_POR_PETICION}' 'strict-dynamic';
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  img-src 'self' data: https:;
  connect-src 'self' https://api.tudominio.com;
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self';
  object-src 'none';
  upgrade-insecure-requests
```
- Despliega primero como `Content-Security-Policy-Report-Only` con
  `report-to`, revisa violaciones una semana, luego actívala.
- Evita `'unsafe-inline'` en `script-src`: mueve handlers inline
  (`onclick=`) a `addEventListener`. En sitios estáticos sin nonce, usa
  hashes `'sha256-…'` de los scripts inline.
- Firebase/Google necesitan sus dominios en `script-src`/`connect-src`/`frame-src`
  (`*.googleapis.com`, `*.firebaseapp.com`, `www.gstatic.com`).
- Scripts de CDN con **SRI**: `<script src="…" integrity="sha384-…" crossorigin="anonymous">`.

## 4. Dónde configurarlas

**nginx**
```nginx
server {
  listen 443 ssl http2;
  ssl_protocols TLSv1.2 TLSv1.3;
  add_header Strict-Transport-Security "max-age=63072000; includeSubDomains" always;
  add_header X-Content-Type-Options "nosniff" always;
  add_header X-Frame-Options "DENY" always;
  add_header Referrer-Policy "strict-origin-when-cross-origin" always;
  add_header Permissions-Policy "camera=(), microphone=(), geolocation=()" always;
  add_header Content-Security-Policy "default-src 'self'; frame-ancestors 'none'; object-src 'none'; base-uri 'self'" always;
  server_tokens off;
}
server { listen 80; return 301 https://$host$request_uri; }
```
**Express/Fastify:** `helmet` (`@fastify/helmet`) con CSP configurada.
**Django:** `SECURE_SSL_REDIRECT=True`, `SECURE_HSTS_SECONDS`,
`SESSION_COOKIE_SECURE=True`, `CSRF_COOKIE_SECURE=True`,
`SECURE_CONTENT_TYPE_NOSNIFF=True`, `X_FRAME_OPTIONS="DENY"`, `django-csp`;
`python manage.py check --deploy`.
**Laravel:** middleware propio o `spatie/laravel-csp`; `APP_DEBUG=false`.
**Next.js:** `headers()` en `next.config.js` o middleware (CSP con nonce).
**Cloudflare:** Rules → Transform Rules → *Modify Response Header*, o un Worker.
**GitHub Pages / estático puro:** no hay cabeceras propias. Opciones:
`<meta http-equiv="Content-Security-Policy" content="…">` en cada página
(sin `frame-ancestors`/`report-uri`), o Cloudflare delante (recomendado:
cabeceras + WAF + caché). Netlify/Vercel/Cloudflare Pages aceptan un
archivo `_headers` / `vercel.json`.

## 5. WAF y protección DDoS

- **Cloudflare** (plan gratis ya da DDoS L3/L4/L7 básico, caché, Bot Fight
  Mode; WAF administrado y rate limiting avanzado en planes de pago),
  **AWS WAF + Shield**, **Google Cloud Armor**, **Azure Front Door**.
- Configura: reglas administradas OWASP, rate limiting en `/login`,
  `/register`, `/api/*`; desafío (Turnstile/captcha) ante bots; bloqueo por
  país solo si tiene sentido de negocio.
- Oculta la IP de origen (solo acepta tráfico del proxy: firewall o
  Cloudflare Tunnel / Authenticated Origin Pulls).
- El WAF **no** sustituye el código seguro: es una capa más.

## 6. Auditoría de dependencias y cadena de suministro

- Lockfile siempre en git; instala con `npm ci` / `pip install -r` con hashes /
  `composer install`.
- Auditoría en CI y periódica (`scripts/audit_deps.sh`):
  `npm audit --omit=dev`, `pip-audit`, `composer audit`, `govulncheck ./...`,
  o multi-lenguaje con `osv-scanner` / Snyk.
- Dependabot o Renovate para actualizaciones automáticas (incluye GitHub Actions).
- Antes de añadir una dependencia: ¿mantenida?, ¿descargas reales?, ¿tamaño?,
  ¿la necesito o son 10 líneas propias? Ojo con typosquatting.
- Fija versiones exactas de CDNs y añade SRI.

## 7. Respaldos

- Regla **3-2-1**: 3 copias, 2 medios distintos, 1 fuera de sitio (otra
  cuenta/región). Al menos una **inmutable** o aislada (protege de ransomware
  y de un borrado con credenciales robadas).
- Automatizados y cifrados: snapshots diarios + PITR (point-in-time
  recovery) en Postgres gestionado; `pg_dump` programado como extra.
- Define RPO (cuánto dato puedes perder) y RTO (cuánto tardas en volver).
- **Prueba la restauración** al menos cada trimestre en un entorno aparte.
  Un respaldo no probado no es un respaldo.
- Firestore: exportaciones programadas a un bucket (`gcloud firestore export`)
  con retención y acceso restringido.

## 8. Monitoreo

- Uptime externo (UptimeRobot, Better Stack), errores de frontend y backend
  (Sentry), métricas (latencia p95, tasa de 5xx).
- Alertas a un canal que alguien lea; registros centralizados con retención.
- Revisión de accesos de la cuenta cloud/hosting: MFA para todo el equipo,
  mínimos privilegios, sin cuentas compartidas.
