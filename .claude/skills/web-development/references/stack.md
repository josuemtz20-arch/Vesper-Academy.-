# Stack de desarrollo

## Índice
1. Frontend
2. Backend
3. Bases de datos
4. Git, ramas y CI/CD
5. Estructura de proyecto de referencia

---

## 1. Frontend

### Base (siempre)
- **HTML5 semántico:** `header/nav/main/section/article/footer`, un `h1` por
  página, `button` para acciones y `a` para navegación, `label` en cada input.
  Es accesibilidad, SEO y menos JS a la vez.
- **CSS3 moderno:** variables (`--color-*`), `grid`/`flex`, `clamp()` para
  tipografía fluida, `@media (prefers-reduced-motion)` y
  `(prefers-color-scheme)`, `:focus-visible`. Evita frameworks CSS pesados
  si el sitio es pequeño; Tailwind es buena opción con purga en build.
- **JavaScript / TypeScript:** TypeScript en todo proyecto que vaya a crecer
  (`"strict": true`). Módulos ES, `defer` en `<script>`, nada de librerías
  para lo que el navegador ya hace (`fetch`, `IntersectionObserver`,
  `dialog`, `structuredClone`).

### ¿Framework? Criterio rápido
| Situación | Elección |
|---|---|
| Landing / sitio informativo | HTML+CSS o **Astro** (SSG, cero JS por defecto) |
| Blog / docs / catálogo con SEO | **Next.js** (SSG/ISR) o Astro |
| App con login, mucho estado, dashboards | **Vite + React** o **Vue 3**; Next.js si también hay partes públicas |
| Equipo enterprise, formularios complejos, DI | **Angular** |
| Contenido que cambia por usuario y necesita SEO | **Next.js SSR** (App Router, Server Components) |

**Modos de renderizado**
- **CSR** (solo cliente): rápido de desarrollar, malo para SEO y para
  teléfonos lentos (todo el trabajo en el dispositivo).
- **SSR** (servidor por petición): HTML listo, SEO bueno; requiere servidor
  y cuidado con caché.
- **SSG** (en build): lo más rápido y barato; contenido estático.
- **ISR / revalidación:** SSG que se regenera cada N segundos o bajo demanda.

**Estado y datos:** estado del servidor con TanStack Query / SWR (caché,
reintentos, invalidación); estado de UI local con `useState`/Pinia/Zustand.
No metas Redux por defecto.

**Enrutamiento:** el del framework (Next App Router, Vue Router, Angular
Router). Rutas protegidas se validan **también** en el servidor.

---

## 2. Backend

Responsabilidades: recibir peticiones, validar, aplicar reglas de negocio y
permisos, hablar con la BD y con servicios externos, responder con errores
consistentes.

| Opción | Cuándo | Piezas clave |
|---|---|---|
| **Node.js** (Fastify / NestJS / Express) | Equipo JS/TS, tiempo real, BFF de un frontend React | zod para validar, Prisma/Drizzle, helmet, pino |
| **Python FastAPI** | APIs modernas, ML/IA, tipado con pydantic, OpenAPI automático | pydantic v2, SQLAlchemy 2, Alembic, uvicorn |
| **Python Django** | Producto con admin, auth, ORM y migraciones incluidos | DRF, django-environ, `SECURE_*` settings |
| **PHP Laravel** | Hosting PHP, productividad alta, colas y auth listas | Eloquent, FormRequest, Sanctum, Horizon |
| **Go** | Alto rendimiento, binario único, microservicios | net/http o chi, sqlc/pgx, context timeouts |
| **Serverless** (Cloud Functions, Lambda, Workers) | Sitios estáticos que necesitan 2–3 endpoints seguros | Secretos en el gestor del proveedor |

Reglas comunes:
- Validación con esquema en la frontera (ver `appsec.md`).
- Errores: código HTTP correcto + cuerpo `{ error: { code, message } }`; nunca
  stack traces al cliente.
- Timeouts en toda llamada externa; reintentos con backoff solo si es idempotente.
- Configuración por variables de entorno (12-factor), validadas al arrancar.
- Logs estructurados (JSON) con id de petición; sin contraseñas, tokens ni PII.
- Health check (`/healthz`) y apagado ordenado.

---

## 3. Bases de datos

| Motor | Úsalo para | Notas |
|---|---|---|
| **PostgreSQL** | Default para casi todo: usuarios, pedidos, relaciones | JSONB, índices parciales, **Row Level Security**, PITR |
| **MySQL / MariaDB** | Hosting que solo ofrece MySQL, ecosistema PHP | InnoDB, `utf8mb4` |
| **MongoDB** | Documentos realmente flexibles, sin joins fuertes | Valida con JSON Schema; cuidado con inyección de operadores (`$ne`) |
| **Redis** | Caché, sesiones, colas, rate limiting, leaderboards | No es la fuente de verdad; define TTL y política de expulsión |
| **Firestore / Supabase** | Apps sin backend propio | La seguridad vive en Rules / RLS: pruébalas con el emulador |

Buenas prácticas: migraciones versionadas (Prisma/Alembic/Laravel
migrations), índices según las consultas reales (`EXPLAIN ANALYZE`), usuario
de BD con mínimos privilegios (la app no es `superuser`), conexiones con TLS,
pool de conexiones, respaldos + restauración probada (ver `infra.md`).

---

## 4. Git, ramas y CI/CD

**Git**
- Ramas cortas desde `main`; PR con revisión; `main` protegida (sin push
  directo, checks obligatorios).
- Commits pequeños con mensaje que explique el *porqué*.
- `.gitignore` desde el día uno: `.env*`, `node_modules/`, `dist/`, llaves,
  dumps de BD. Si un secreto llegó a git: **rótalo**; borrarlo del historial
  no basta.

**Pipeline mínimo (GitHub Actions)**
```yaml
name: ci
on: [pull_request, push]
permissions: { contents: read }
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: npm }
      - run: npm ci
      - run: npm run lint
      - run: npm test -- --ci
      - run: npm run build
      - run: npm audit --audit-level=high --omit=dev
  secrets:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with: { fetch-depth: 0 }
      - uses: gitleaks/gitleaks-action@v2
        env: { GITHUB_TOKEN: "${{ secrets.GITHUB_TOKEN }}" }
```
- Despliegue en un job separado, solo desde `main`, con `environment`
  protegido y secretos del entorno (no del repo).
- Fija versiones de acciones (idealmente por SHA) y da a cada workflow los
  `permissions` mínimos.
- Dependabot (`.github/dependabot.yml`) para npm/pip/composer y para las
  propias GitHub Actions.

---

## 5. Estructura de proyecto de referencia

```
app/
├─ src/            # código (frontend o backend)
├─ tests/          # unit + integración; e2e con Playwright
├─ public/         # estáticos servidos tal cual
├─ scripts/        # tareas de mantenimiento
├─ .env.example    # nombres de variables, SIN valores reales
├─ .github/workflows/
└─ README.md       # cómo correr, probar y desplegar
```
