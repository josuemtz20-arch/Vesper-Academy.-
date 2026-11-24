# Seguridad en el código (AppSec)

Basado en el **OWASP Top 10 (2025)** y el OWASP ASVS. Regla de oro: el
cliente es territorio enemigo; todo se valida y autoriza en el servidor.

## Índice
1. Mapa OWASP Top 10 → qué hacer
2. Validación y sanitización (SQLi, XSS, inyección)
3. Autenticación y sesiones
4. Autorización (IDOR / control de acceso)
5. Gestión de secretos
6. CSRF y CORS
7. Límites, errores y registros
8. Revisión rápida de un PR
9. Casos reales (Vesper Academy, 2026-11-23): cosecha de claves, cerrar ante fallas, cuerpos sin tope

---

## 1. OWASP Top 10 (2025) → acción concreta

| # | Riesgo | Qué hacer en el código |
|---|---|---|
| A01 | Broken Access Control | Verificar dueño/rol en **cada** endpoint; denegar por defecto; anti-IDOR (§4) |
| A02 | Security Misconfiguration | Cabeceras, debug apagado en prod, CORS estricto, buckets privados (`infra.md`) |
| A03 | Software Supply Chain Failures | Lockfiles, `npm ci`, auditoría, Dependabot, SRI en CDNs, acciones fijadas |
| A04 | Cryptographic Failures | TLS en todo, Argon2id para contraseñas, cifrar datos sensibles en reposo |
| A05 | Injection | Consultas parametrizadas, escapar salida, nunca `eval`/shell con input |
| A06 | Insecure Design | Modelado de amenazas, límites de negocio (montos, cantidades), rate limits |
| A07 | Authentication Failures | MFA, bloqueo progresivo, sesiones que expiran y se invalidan |
| A08 | Software or Data Integrity Failures | Firmar/verificar webhooks y artefactos; no deserializar datos no confiables |
| A09 | Security Logging & Alerting Failures | Registrar logins, fallos de permiso y cambios críticos; alertar |
| A10 | Mishandling of Exceptional Conditions | Fallar cerrado; errores genéricos al cliente; manejar timeouts y nulos |

---

## 2. Validación y sanitización

**Valida en ambos lados, confía solo en el servidor.** El frontend valida para
la UX; el backend valida para la seguridad. Usa **listas de lo permitido**
(tipo, longitud, formato, rango), no listas negras.

```ts
// Node/TS con zod
import { z } from "zod";
const Signup = z.object({
  email: z.string().email().max(254),
  name: z.string().trim().min(1).max(80),
  age: z.coerce.number().int().min(13).max(120),
});
app.post("/signup", async (req, reply) => {
  const r = Signup.safeParse(req.body);
  if (!r.success) return reply.code(400).send({ error: { code: "invalid_input" } });
  // r.data está tipado y limpio
});
```
```python
# FastAPI con pydantic
from pydantic import BaseModel, EmailStr, Field
class Signup(BaseModel):
    email: EmailStr
    name: str = Field(min_length=1, max_length=80)
    age: int = Field(ge=13, le=120)
```
Laravel: `FormRequest` con `rules()`; Django: `forms`/DRF serializers.

### Inyección SQL
```ts
// MAL: concatenar
db.query(`SELECT * FROM users WHERE email = '${email}'`);
// BIEN: parámetros
db.query("SELECT * FROM users WHERE email = $1", [email]);
```
ORMs (Prisma, SQLAlchemy, Eloquent, Django ORM) parametrizan por ti, **salvo**
en `raw`/`whereRaw`/`extra()`: ahí también parámetros. Nombres de columna u
orden dinámicos → mapéalos contra una lista permitida.
MongoDB: valida tipos para evitar `{"$ne": null}` en lugar de un string.

### XSS
- Inserta texto con `textContent`, nunca `innerHTML` con datos del usuario.
- React/Vue/Angular escapan por defecto; los peligrosos son
  `dangerouslySetInnerHTML`, `v-html`, `[innerHTML]`, `bypassSecurityTrust*`.
- Si necesitas HTML del usuario (editor rico): sanéalo con **DOMPurify**
  (cliente) o **bleach/nh3** (Python), y aun así ponle CSP.
- URLs de usuario en `href`/`src`: permite solo `https:` (bloquea `javascript:`).
- Plantillas de servidor: deja el auto-escape activado (`{{ }}` en Blade,
  Jinja, Django). `{!! !!}`/`|safe` solo con contenido confiable.
- **CSP** como segunda línea de defensa (`infra.md`).

### Otros vectores de inyección
- Comandos del sistema: nunca `exec(string)`; usa APIs con array de argumentos.
- Rutas de archivo: normaliza y verifica que queden dentro del directorio base
  (path traversal); nombres de archivo subidos se regeneran en servidor.
- Subidas: valida tipo real (magic bytes), tamaño máximo, guarda fuera del
  webroot o en bucket privado, sirve con `Content-Disposition: attachment`.
- SSRF: si el servidor descarga URLs dadas por el usuario, lista permitida de
  hosts y bloqueo de IPs privadas/metadata (169.254.169.254).

---

## 3. Autenticación y sesiones

### Contraseñas
- **Argon2id** (preferido) o **bcrypt** (coste ≥ 12). Nunca MD5/SHA-1/SHA-256 a pelo.
  ```ts
  import argon2 from "argon2";
  const hash = await argon2.hash(pw, { type: argon2.argon2id, memoryCost: 19456, timeCost: 2, parallelism: 1 });
  const ok = await argon2.verify(hash, pw);
  ```
  Python: `argon2-cffi` (`PasswordHasher()`); Django: `Argon2PasswordHasher`
  primero en `PASSWORD_HASHERS`; Laravel: `'driver' => 'argon2id'`.
- Mínimo 8 caracteres (12+ recomendado), sin reglas absurdas de composición;
  rechaza contraseñas filtradas (API k-anonymity de Have I Been Pwned).
- Mismo mensaje para "usuario no existe" y "contraseña incorrecta".
- Rate limit + bloqueo progresivo por cuenta **y** por IP.

### Sesiones
- **Preferido para apps web:** sesión en servidor + cookie
  `Set-Cookie: sid=…; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=…`.
  Prefijo `__Host-` cuando sea posible (obliga Secure, Path=/ y sin Domain).
- Regenera el id de sesión al iniciar sesión y al subir privilegios.
- Expiración por inactividad y absoluta; "cerrar sesión" invalida en servidor.

### JWT (si se usan)
- Access token corto (5–15 min) + refresh token rotativo, guardado en cookie
  `HttpOnly` (no en `localStorage`: XSS lo roba).
- Fija el algoritmo al verificar (`algorithms: ["RS256"]` o `HS256` con
  secreto fuerte); valida `exp`, `iss`, `aud`. Rechaza `alg: none`.
- Lista de revocación o versión de token por usuario para cerrar sesiones.

### MFA
- TOTP (apps autenticadoras) o, mejor, **passkeys/WebAuthn** (resistentes a
  phishing). SMS solo como último recurso.
- Códigos de recuperación de un solo uso, guardados con hash.
- Exige re-autenticación para acciones sensibles (cambiar email, contraseña,
  retirar dinero).

---

## 4. Autorización (anti-IDOR)

IDOR = el usuario cambia `/api/orders/123` por `/api/orders/124` y ve un
pedido ajeno. Se evita **filtrando por dueño en la consulta**, no ocultando
botones.

```ts
// MAL
const order = await db.order.findUnique({ where: { id } });
// BIEN: el dueño forma parte de la condición
const order = await db.order.findFirst({ where: { id, userId: session.userId } });
if (!order) return reply.code(404).send(); // 404, no 403: no confirma que existe
```
- Denegar por defecto; middleware/policies centralizadas (Laravel Policies,
  Django permissions, CASL/Casbin en Node).
- Roles verificados en servidor en cada petición, nunca desde un campo que
  manda el cliente (`isAdmin: true` en el body).
- IDs no secuenciales (UUID) ayudan, pero **no sustituyen** la verificación.
- Sin backend propio: Firestore Rules / Supabase RLS con
  `request.auth.uid == resource.data.ownerId` y tests con el emulador.
- Mass assignment: whitelist de campos editables (`$fillable`, DTOs, `pick`).

---

## 5. Gestión de secretos

- Nunca en el repo ni en el bundle del frontend. Variables de entorno
  (`.env` local, ignorado) + `.env.example` con nombres sin valores.
- Producción: gestor de secretos (GitHub Environments secrets, AWS Secrets
  Manager, GCP Secret Manager, Doppler, Vault). Rotación periódica.
- Valida al arrancar que existan (falla rápido si falta uno).
- CI: `gitleaks` o GitHub secret scanning + push protection.
- Si un secreto se filtró: **rotarlo primero**, luego limpiar historial.
- Distingue claves públicas por diseño (Firebase web API key, Stripe
  `pk_…`, reCAPTCHA site key) de secretos reales (`sk_…`, service accounts,
  contraseñas de BD). Las públicas se protegen con reglas/restricciones de
  dominio, no escondiéndolas.

---

## 6. CSRF y CORS

### CSRF
Aplica cuando la auth va en cookies.
- `SameSite=Lax` (o `Strict`) en la cookie de sesión: bloquea la mayoría.
- Token anti-CSRF en formularios y peticiones que cambian estado (Django y
  Laravel lo traen; Express: `csrf-csrf` double-submit).
- Nunca cambies estado con `GET`.
- Verifica `Origin`/`Sec-Fetch-Site` en peticiones mutantes como defensa extra.

### CORS
- Lista explícita de orígenes; refleja el `Origin` solo si está en la lista.
- **Nunca** `Access-Control-Allow-Origin: *` junto con credenciales.
- Limita métodos y cabeceras; `Vary: Origin`.
```ts
const ALLOWED = new Set(["https://miapp.com", "https://admin.miapp.com"]);
app.register(cors, { origin: (o, cb) => cb(null, !o || ALLOWED.has(o)), credentials: true });
```
CORS **no** es una medida de autenticación: protege al navegador del usuario,
no a tu API de un `curl`.

---

## 7. Límites, errores y registros

- Rate limiting por IP y por usuario (login, registro, recuperar contraseña,
  endpoints caros). Redis o el del proxy/WAF.
- Tamaño máximo de body y de subida; timeouts de petición.
- Errores: mensaje genérico al cliente, detalle en logs internos.
- Registra: inicios de sesión (éxito/fallo), cambios de contraseña/MFA,
  denegaciones de permiso, acciones de admin. Sin secretos ni PII innecesaria.
- Alertas ante picos de 401/403/500.

---

## 8. Revisión rápida de un PR (busca esto)

```bash
# Patrones peligrosos (ajusta a tu stack)
rg -n "innerHTML|outerHTML|insertAdjacentHTML|dangerouslySetInnerHTML|v-html|bypassSecurityTrust" src
rg -n "eval\(|new Function\(|child_process|exec\(|shell=True|os\.system" src
rg -n "SELECT .*\$\{|\" \+ .*WHERE|whereRaw|\.raw\(|extra\(" src
rg -n "Access-Control-Allow-Origin.*\*|origin: *true|cors\(\)" src
rg -n "(api[_-]?key|secret|password|token)\s*[:=]\s*['\"][^'\"]{8,}" -i .
rg -n "jwt\.decode\(|algorithms.*none|verify=False|rejectUnauthorized: *false" src
```
Para cada endpoint nuevo pregunta: ¿quién puede llamarlo? ¿valida la
entrada? ¿filtra por dueño? ¿qué pasa si lo llaman 1000 veces por minuto?
¿qué le enseña su respuesta a quien la repite muchas veces? ¿y qué hace si
se cae lo que lo protege (contador, base de datos): abre o cierra?

---

## 9. Casos reales (Vesper Academy, 2026-11-23)

Auditoría del Worker (`worker/vesper-chat-proxy.js`, `worker/exam_grader.js`)
y de `firestore.rules`. Cada punto es un patrón que vale para cualquier sitio.

**Una respuesta que se repite es un oráculo.** El examen de nivel tiene un
banco fijo y chico (26–31 preguntas). Primero el Worker devolvía la clave al
contestar: un intento de práctica la revelaba y el segundo sacaba 100. Luego
devolvía solo ✓/✗, y con 3–4 intentos (todo A, todo B…) se reconstruía igual.
Lo que quedó:
- `/exam/answer` responde `{recorded, first}`: ni la clave ni si acertó.
- `/exam/finish` da la nota y un resumen por habilidad, sin detalle por
  pregunta. El detalle se guarda en el servidor para los profesores.
- **Hueco que sigue abierto (revisado 2026-11-23):** el documento de
  `exam_results` guarda `detail` con `correct` por pregunta, y la regla de
  lectura deja al alumno leer el suyo. Con cuenta verificada, 4 intentos
  (todo A, B, C, D) y leer sus 4 documentos saca la clave en un día, dentro
  del tope de 12. El código lo anota como riesgo residual
  (`exam_grader.js`, antes de `publicResult`). Cerrarlo: no guardar `correct`
  en el examen de nivel, o mover `detail` a un documento que solo lee el
  personal. Lección general: lo que le quitas a la respuesta del servidor,
  quítaselo también a lo que el usuario puede leer de la base de datos.
- La nota final sigue siendo un oráculo lento (cambiar una respuesta por
  intento), así que hay tope de intentos: 12 al día por cuenta y 20 al día por
  IP sin sesión. Ojo: una escuela o un CGNAT de celular comparten IP.

**El servidor elige, el cliente pinta.** En los exámenes de jefe el Worker
sortea las preguntas en `/exam/start` y devuelve los `ids`; los que mande el
cliente se ignoran. Si el cliente escoge, escoge las que ya vio.

**El intento tiene dueño.** `/exam/start` guarda el uid del token y
`/exam/finish` solo guarda la nota si la cierra esa misma cuenta. Antes,
abrir sin sesión y cerrar con sesión saltaba el tope diario por cuenta.

**Abrir o cerrar ante una falla se decide por ruta.** Si el contador (Durable
Object) se cae:
- En el **chat** se deja pasar y se registra: el costo ya lo acota
  `max_tokens` y tumbar el chat es peor.
- En `/exam/*`, `/book/open` y `/doc/get` se **cierra**: ahí el contador es el
  único tope contra la cosecha y contra el gasto. Responde `503` +
  `Retry-After` con `code: "unavailable"`, no `429`: "no disponible" y "vas muy
  rápido" son cosas distintas y el cliente las trata distinto.
- Lo que dependa de esa ruta necesita su plan B: libros y manuales vuelven a
  leer de Firestore si `/doc/get` o `/book/open` no dan `200`.
- Un verificador externo caído (`siteverify` del captcha) **nunca** deja pasar.

**Revisar `Content-Length` no es poner tope al cuerpo.** Un cuerpo *chunked*
no trae esa cabecera, y `request.text()` lo lee completo antes de medirlo.
`readCapped()` lee el stream por trozos, corta en cuanto pasa del tope
(`413`) y cancela el lector. El tope se mide en caracteres; el corte en bytes
es 4× ese número, así que nunca corta un cuerpo válido.

**Una identidad, una forma.** `firestore.rules` comparaba el correo del token
tal cual en `roles/`, `students/` y `teachers/`, mientras el cliente y el
Worker lo pasaban a minúsculas: con una mayúscula en el token, reglas y
cliente leían documentos distintos. Ahora todo pasa por `myEmail()`
(`.lower()`). Normaliza en **una** función y úsala en todas partes.

**Escribe el riesgo que aceptas.** `/book/page` no cuenta peticiones a
propósito (sería una llamada más al contador por página). El control es la
firma HMAC de `/book/open`: vale 2 h para ese libro y esa versión, y en ese
tiempo quien tenga el enlace baja sus páginas. Está escrito en el código y en
`worker/README.md`, para que nadie lo "arregle" ni lo crea más seguro de lo que es.

**Orden de despliegue.** Si el Worker cambia el contrato (deja de mandar la
clave, empieza a mandar `ids`), primero se publica el sitio que entiende la
respuesta nueva, y el Worker 1–2 días después, cuando los service workers ya
se actualizaron.
