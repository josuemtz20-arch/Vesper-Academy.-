---
name: firebase-acceso
description: >
  Área privada en un sitio estático con Firebase Auth + allowlist en Firestore + reglas de seguridad.
  Úsala para login, dar o quitar acceso, proteger páginas o datos, escribir/revisar firestore.rules, roles
  (admin/miembro) o cuando alguien diga "que solo X pueda ver Y".
---

# Acceso con Firebase

## Modelo de seguridad (lo más importante)
- `assets/js/acceso.js` es **solo la puerta de la interfaz**: el código es público y se salta con DevTools.
- La seguridad real es `firestore.rules`. Lo privado se guarda en Firestore y se carga tras el login;
  **nunca** en el HTML o JS publicado (ni respuestas, ni listas de correos, ni precios internos).
- La `apiKey` web de Firebase es pública a propósito: no es un secreto filtrado.

## Flujo
1. Registro (correo + contraseña) → correo de verificación.
2. Acceso a página protegida = sesión + `emailVerified` + documento `miembros/{correo}`.
3. Dar acceso = crear `miembros/{correo}` (campo `rol`). Efecto inmediato, sin desplegar.

## Reglas
- Empieza con `match /{document=**} { allow read, write: if false; }` y abre por colección.
- `signedIn()` exige `email_verified`: sin eso, alguien sin verificar usa su idToken directo contra la REST API.
- Datos por usuario bajo `usuarios/{uid}` comparando `request.auth.uid`.
- Valida tipo y tamaño de lo que escribe el cliente (`request.resource.data`).
- Lo que el usuario se autocalifica (puntajes, progreso) es práctica, no registro oficial; lo oficial lo
  escribe el staff o un servidor.
- Prueba las reglas con el emulador o el Rules Playground antes de publicar; compara con lo que está
  en producción antes de afirmar qué está vivo.

## Configuración
Consola → Authentication: Email/Password y dominio en *Authorized domains*. Firestore → Reglas → pegar
`firestore.rules`. Pon la config real en `acceso.js` (mientras diga `PEGAR` el sitio queda abierto y lo avisa).
La CSP de cada página ya permite gstatic/firestore/identitytoolkit; si añades otro servicio, amplíala.
