---
name: app-play-store
description: >
  Publicar el sitio como app Android en Google Play con una TWA (Trusted Web Activity): twa-manifest,
  assetlinks.json, firma, requisitos de la ficha y de políticas. Úsala cuando el usuario quiera "subir la
  app a Play Store", generar el .aab o la app abra con barra de navegador.
---

# App Android (TWA)

La app es un envoltorio que abre el sitio a pantalla completa: cada push a `main` actualiza la app sin
pasar por Play. Solo se sube un `.aab` nuevo si cambia el envoltorio (ícono, nombre, versión, atajos).

## Requisitos previos (el preflight avisa de los que faltan)
- PWA instalable: manifest con `id`, íconos 192/512 + maskable, service worker.
- `package_id` definitivo (`com.dominio.app`): **no se puede cambiar** tras la primera subida.
- Aviso de privacidad completo (sin `[COMPLETAR]`) y, si hay cuentas, página/función para **eliminar la cuenta**.
- Con IA generativa: forma de reportar respuestas.

## Generar el paquete
- **PWABuilder** (sin instalar nada): pwabuilder.com → URL del sitio → Android → Google Play → usa el
  mismo package id → descarga `.aab`, `.apk` y la **clave de firma**.
- **Bubblewrap**: `npm i -g @bubblewrap/cli`, `bubblewrap init --manifest <URL>/manifest.webmanifest`,
  `bubblewrap build`. Usa la versión más reciente (Play rechaza `targetSdkVersion` viejos).

## Enlace de dominio (si falla, la app muestra barra de URL)
Pega la huella SHA-256 de la clave de **firma de Play** (Play Console → Integridad de la app) en
`.well-known/assetlinks.json` y publica. El workflow usa upload-pages-artifact@v3 para no perder `.well-known`.

## Cuenta de Play Console
Pago único 25 USD. Cuenta **personal** nueva: prueba cerrada con ≥ 12 testers durante 14 días antes de
Producción. Cuenta de **organización** (D-U-N-S) no tiene ese requisito.

## Nunca
La clave `.keystore` y su contraseña fuera de git (ya están en `.gitignore`). Si se pierde, sin Play App
Signing no se puede actualizar la app.
