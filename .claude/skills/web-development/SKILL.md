---
name: web-development
description: Desarrollo web full-stack con seguridad y rendimiento de producción. Úsala al crear, revisar, optimizar o desplegar cualquier sitio o app web — frontend (HTML, CSS, JavaScript/TypeScript, React, Vue, Angular, Next.js, SSR/SSG), backend (Node.js, Python Django/FastAPI, PHP Laravel, Go), bases de datos (PostgreSQL, MySQL, MongoDB, Redis), Git y CI/CD, seguridad de aplicación (OWASP Top 10, validación, XSS, inyección SQL, autenticación, bcrypt/Argon2, JWT, cookies, MFA, IDOR, secretos, CSRF, CORS) e infraestructura (HTTPS/HSTS, cabeceras CSP, WAF, DDoS, auditoría de dependencias, respaldos). También cuando el sitio "va lento", "se traba en el teléfono", hay que mejorar Core Web Vitals, o pedir una revisión de seguridad o un checklist antes de publicar.
---

# Desarrollo web: stack, seguridad y rendimiento

Objetivo: que lo que se entrega funcione, sea **seguro por defecto** y sea
**rápido en un teléfono barato**, no solo en la laptop del desarrollador.

## Cómo trabajar

1. **Ubica el contexto antes de proponer nada.** Lee el repo: ¿es estático
   (GitHub Pages, Netlify, S3) o tiene servidor? ¿Qué framework, qué base de
   datos, dónde se despliega, quién controla las cabeceras HTTP? Las
   recomendaciones cambian por completo según esto (ver "Sitios estáticos").
2. **Mide antes de optimizar.** Nunca "optimices" a ciegas. Usa
   `scripts/perf_probe.js` (Playwright con CPU x6 y red 3G) y anota la línea
   base. Repite tras cada cambio y reporta números, no impresiones.
3. **Seguridad en el servidor, siempre.** Todo control en el navegador es
   cosmético. Validación, autorización y límites se repiten en el backend
   (o en reglas tipo Firestore/RLS si no hay backend propio).
4. **Cambios pequeños y verificables.** Cada cambio con su prueba: test,
   captura, medición o `curl`. Si algo no se pudo verificar, dilo.
5. **Sé franco.** Si el diseño del usuario tiene un hueco de seguridad o una
   decisión que no escala, dilo directo con la alternativa concreta.

## Referencias (cárgalas según la tarea)

| Tarea | Archivo |
|---|---|
| Elegir stack, estructura de proyecto, SSR/SSG/CSR, BD, Git, CI/CD | `references/stack.md` |
| Código seguro: OWASP Top 10, validación, XSS/SQLi, auth, sesiones, IDOR, secretos, CSRF/CORS | `references/appsec.md` |
| HTTPS/HSTS, cabeceras (CSP...), WAF/DDoS, dependencias, respaldos, logs | `references/infra.md` |
| Lentitud, Core Web Vitals, animaciones, imágenes, JS/CSS, fuentes, modo ligero | `references/performance.md` |

Scripts listos para usar:

- `scripts/perf_probe.js URL [URL...]` — FCP, LCP, CLS, tareas largas, CPU en
  reposo, bytes y errores con CPU x6 + 3G en un Pixel 5 emulado.
- `scripts/check_headers.sh https://sitio` — revisa HTTPS, HSTS, CSP y demás
  cabeceras de seguridad y dice qué falta.
- `scripts/audit_deps.sh` — corre el auditor que corresponda (npm, pip,
  composer, go) en el proyecto actual.

## Decisiones por defecto (si el usuario no indica otra cosa)

- **Frontend:** HTML semántico + CSS moderno + TypeScript. Framework solo si
  hay estado complejo o muchas vistas: **Next.js** (React) si importa el SEO
  o hay contenido público; **Vite + React/Vue** para apps detrás de login.
  Sitio de contenido → SSG (Astro/Next export). No metas React para una landing.
- **Backend:** Node.js + Fastify/NestJS si el equipo es JS; **FastAPI** para
  APIs Python y ML; **Django** si se necesita admin/ORM/auth incluidos;
  **Laravel** en hosting PHP; **Go** para servicios de alto rendimiento.
- **Datos:** **PostgreSQL** por defecto (relacional, JSONB, RLS). Redis para
  caché, colas y límites de peticiones. MongoDB solo si el modelo es de
  verdad documental y sin relaciones fuertes.
- **Auth:** no la escribas desde cero si hay opción gestionada (Auth.js,
  Lucia-style libs, Django auth, Laravel Breeze/Fortify, Firebase Auth,
  Supabase, Auth0/Clerk). Si es propia: Argon2id, cookies de sesión
  `HttpOnly; Secure; SameSite=Lax`, MFA (TOTP o passkeys/WebAuthn).
- **CI/CD:** GitHub Actions con lint + tests + build + auditoría de
  dependencias + escaneo de secretos en cada PR; despliegue solo desde `main`.

## Sitios estáticos (GitHub Pages y similares)

Límites reales que hay que decir al usuario:

- **No se pueden poner cabeceras HTTP** (CSP, HSTS propio, X-Frame-Options,
  Permissions-Policy). Opciones: `<meta http-equiv="Content-Security-Policy">`
  (cubre CSP salvo `frame-ancestors`, `report-uri` y `sandbox`), o poner
  **Cloudflare delante** (Transform Rules / Workers para cabeceras, WAF,
  caché, protección DDoS).
- **Todo el JS es público.** Claves "públicas" (Firebase web key, Stripe
  publishable) están bien; secretos de servidor **nunca** van al cliente.
  La autorización vive en reglas del lado del servidor (Firestore Rules,
  Supabase RLS) o en una función serverless.
- **No hay paso de build salvo que lo pongas.** Minifica JS/CSS en el
  workflow de despliegue, no en el repo (ver `references/performance.md`).
- GitHub Pages ya sirve HTTPS y comprime con gzip; activa "Enforce HTTPS".

## Checklist antes de publicar

**Funciona**
- [ ] Sin errores en consola en las páginas principales (móvil y escritorio).
- [ ] Flujos críticos probados de punta a punta (registro, login, pago, la
      acción principal de la app).
- [ ] 404 y estado sin conexión con mensaje útil.

**Seguro** (detalle en `references/appsec.md` e `infra.md`)
- [ ] Toda entrada validada en servidor con esquema (zod/pydantic/FormRequest).
- [ ] Consultas parametrizadas / ORM; cero SQL armado con strings.
- [ ] Salida escapada; nada de `innerHTML` con datos del usuario sin sanear.
- [ ] Contraseñas con Argon2id/bcrypt; límites de intentos; MFA disponible.
- [ ] Cada endpoint verifica que el usuario es dueño del recurso (anti-IDOR).
- [ ] Cookies `HttpOnly; Secure; SameSite`; CSRF cubierto; CORS con lista
      explícita de orígenes (nunca `*` con credenciales).
- [ ] Cero secretos en el repo (`gitleaks`/secret scanning en CI).
- [ ] HTTPS forzado + HSTS; CSP, `X-Content-Type-Options`, `frame-ancestors`.
- [ ] Dependencias auditadas sin críticas abiertas; Dependabot activo.
- [ ] Respaldos automáticos **y una restauración probada**.

**Rápido** (detalle en `references/performance.md`)
- [ ] LCP < 2.5 s, CLS < 0.1, INP < 200 ms en móvil con 3G/CPU x4–x6.
- [ ] CPU en reposo < 5 %: animaciones infinitas pausadas fuera de pantalla.
- [ ] JS/CSS minificados; imágenes a su tamaño de pantalla (WebP/AVIF).
- [ ] `width`/`height` en imágenes y `loading="lazy"` bajo el pliegue.
- [ ] Scripts con `defer`; nada de JS bloqueante que no sea imprescindible.

## Formato de entrega

Al terminar, reporta en este orden y corto: qué cambió, la medición
antes/después (o la verificación hecha), riesgos o cosas que no se pudieron
probar, y lo que queda pendiente con prioridad. Sin relleno.
