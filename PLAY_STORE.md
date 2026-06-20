# Publicar "Vesper Academy — Lecciones" en Google Play

Esta guía empaqueta la PWA de lecciones (`leccion.html`) como una app Android
usando **TWA (Trusted Web Activity)** con **Bubblewrap**, y la sube a la
Google Play Store. No se reescribe nada: la app Android abre directamente el
sitio `https://vesperacademy.com/leccion.html` a pantalla completa, sin barra
de navegador.

## 0. Qué ya está listo en este repo

- `manifest_lecciones.webmanifest` — manifest PWA válido e instalable
  (con `id`, `display: standalone`, iconos 192/512 + maskable).
- `leccion.html` — registra el service worker (`sw.js`, offline) y muestra el
  botón **"Instalar app"** cuando el navegador ofrece la instalación.
- `twa-manifest.json` — configuración de Bubblewrap (raíz del repo).
- `.well-known/assetlinks.json` — Digital Asset Links (falta pegar la huella
  SHA-256 de tu clave de firma; ver paso 4).

> El package Android configurado es **`com.vesperacademy.lecciones`**.
> Si quieres otro, cámbialo en `twa-manifest.json` (`packageId`) y en
> `.well-known/assetlinks.json` (`package_name`).

## 1. Requisitos en tu máquina

- **Node.js 18+** y npm
- **JDK 17** (Bubblewrap descarga el resto del Android SDK la primera vez)
- Una cuenta de **Google Play Console** (pago único de 25 USD)

```bash
npm install -g @bubblewrap/cli
```

## 2. Generar el proyecto Android

Desde la raíz del repo (usa el `twa-manifest.json` ya incluido):

```bash
bubblewrap init --manifest ./twa-manifest.json
```

Acepta los valores que muestra (vienen de `twa-manifest.json`). Cuando pregunte
por la **clave de firma (keystore)**, deja que cree una nueva
`android.keystore` con alias `android`. **Guarda esa keystore y su contraseña
en un lugar seguro: sin ella no podrás volver a actualizar la app.**

## 3. Compilar el App Bundle (.aab)

```bash
bubblewrap build
```

Genera `app-release-bundle.aab` (lo que se sube a Play) y `app-release-signed.apk`
(para probar en un teléfono con `adb install`).

## 4. Conectar la app con el dominio (Digital Asset Links)

Para que la app abra **sin barra de URL**, el sitio debe declarar que confía en
la app. Obtén la huella SHA-256 de tu clave de firma:

```bash
keytool -list -v -keystore ./android.keystore -alias android
```

Copia el valor `SHA256:` (ej. `AB:CD:...`) y pégalo en
`.well-known/assetlinks.json`, reemplazando
`REEMPLAZAR_CON_LA_HUELLA_SHA256_DE_TU_CLAVE_DE_FIRMA`.

> **Importante:** Si activas **Play App Signing** (recomendado y por defecto),
> Google re-firma la app con *su* clave. Entonces debes usar la huella SHA-256
> que aparece en **Play Console → Configuración → Integridad de la app →
> Firma de apps**, NO la de tu keystore local. Puedes incluir ambas huellas
> en el array `sha256_cert_fingerprints`.

Haz commit y push del `assetlinks.json` actualizado. Como el sitio se sirve por
GitHub Pages con `.nojekyll`, la carpeta `.well-known/` se publica tal cual en
`https://vesperacademy.com/.well-known/assetlinks.json`. Verifícalo abriendo esa
URL en el navegador.

## 5. Subir a Google Play Console

1. Crea una app nueva en [Play Console](https://play.google.com/console).
2. Sube `app-release-bundle.aab` en una pista (empieza por **Pruebas internas**).
3. Completa la ficha de la tienda: nombre, descripción, **icono 512×512**
   (`assets/images/app_icon_512.png`), **gráfico destacado 1024×500** y al menos
   2 capturas de teléfono.
4. Rellena los cuestionarios obligatorios: clasificación de contenido,
   seguridad de datos, público objetivo, etc.
5. Envía a revisión. Tras la aprobación, promueve de pruebas internas a
   **Producción**.

## 6. Actualizaciones futuras

1. Cambia el contenido web (se refleja al instante; la app sólo carga el sitio).
2. Para subir una versión nueva del binario, incrementa `appVersionCode`
   (y `appVersionName`) en `twa-manifest.json`, luego:
   ```bash
   bubblewrap update   # sincroniza con el twa-manifest
   bubblewrap build
   ```
3. Sube el nuevo `.aab` a Play Console.

## Notas

- `android.keystore` y los `.aab`/`.apk` generados **no** deben subirse al
  repo (ya están en `.gitignore`).
- iOS no permite TWA: en iPhone/iPad los usuarios "instalan" la PWA con
  *Compartir → Añadir a pantalla de inicio* (el sitio ya lo soporta).
