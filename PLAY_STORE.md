# Publicar Vesper Academy en Google Play

La app Android es una **TWA (Trusted Web Activity)**: un envoltorio que abre
`https://vesperacademy.com/leccion.html` a pantalla completa, sin barra de
navegador. Todo el contenido sigue viviendo en el sitio, así que cada push a
`main` actualiza la app sin pasar por Play. Solo hay que subir un `.aab` nuevo
cuando cambia el envoltorio (ícono, nombre, versión, atajos).

- Paquete Android: **`com.vesperacademy.lecciones`** (no se puede cambiar
  después de la primera subida).
- Configuración del envoltorio: `twa-manifest.json`.
- Manifest web de la app: `manifest_lecciones.webmanifest`.
- Textos de la ficha, respuestas de Seguridad de datos e imágenes:
  `_marketing/play_store/` (local, no se publica).

## Estado (2026-11-02)

Listo en el repo:

- [x] PWA instalable: manifest con `id`, íconos 192/512 + maskable, service worker.
- [x] **Eliminar cuenta** dentro de la app y en la web: `eliminar-cuenta.html`
      (enlazada desde el modal de cuenta y desde el aviso de privacidad).
      Borra la cuenta de Firebase y `progress/{uid}`, quita el alias de la liga
      y, si se marca, el progreso del dispositivo. Las calificaciones y los
      resultados de examen se conservan como registro escolar (lo dice la página).
- [x] **Reportar respuestas de la IA** en `chat.html` y `entrevista.html`
      (requisito de Play para apps con IA generativa). El reporte pasa por el
      Worker (`/report`, con límite por IP) y llega a Firestore `app_events`
      con `event == "ai_report"`; revisarlos de vez en cuando.
- [x] Atajos del ícono: Lecciones, Tutor IA, Liga.
- [x] Ficha: ícono 512, gráfico 1024×500, 5 capturas 1080×1920, textos.

Pendiente (lo tiene que hacer el dueño):

- [ ] **Aviso de privacidad**: llenar los `[...]` en amarillo (nombre o razón
      social, domicilio, responsable de datos, plazo de conservación). Play
      revisa que la política esté completa.
- [ ] **Cuenta de Play Console** (pago único de 25 USD). Si es cuenta
      **personal** creada después de nov-2023, Google exige una **prueba
      cerrada con al menos 12 testers durante 14 días seguidos** antes de dejar
      publicar en Producción. Una cuenta de **organización** (necesita número
      D-U-N-S) no tiene ese requisito.
- [ ] Generar el `.aab` y la clave de firma (paso 1).
- [ ] Pegar la huella SHA-256 en `.well-known/assetlinks.json` (paso 2).
- [ ] Decidir el público objetivo (ver `ficha.md`).

## 1. Generar el paquete Android

Esta máquina no tiene Node ni Java, así que hay dos caminos:

**A. PWABuilder (sin instalar nada, recomendado para la primera vez)**

1. Abre https://www.pwabuilder.com y escribe `https://vesperacademy.com/leccion.html`.
2. *Package for stores → Android → Google Play*.
3. Opciones: Package ID `com.vesperacademy.lecciones`, nombre
   `Vesper Academy — Inglés`, nombre corto `Vesper`, versión `1.0.0` / código `1`,
   *Signing key: Create new*.
4. Descarga el zip. Trae el `.aab`, un `.apk` de prueba, la **clave de firma**
   (`signing.keystore` + `signing-key-info.txt`) y un `assetlinks.json`.

**B. Bubblewrap en local (usa el `twa-manifest.json` del repo)**

```bash
winget install OpenJS.NodeJS.LTS Microsoft.OpenJDK.17
```

```bash
npm install -g @bubblewrap/cli
```

```bash
bubblewrap init --manifest https://vesperacademy.com/manifest_lecciones.webmanifest
```

```bash
bubblewrap build
```

Usa siempre la versión más reciente de la herramienta: Play rechaza los
paquetes cuyo `targetSdkVersion` se quedó atrás.

> **La clave de firma no se puede perder.** Guarda el keystore y su contraseña
> fuera del repo (gestor de contraseñas + una copia en la nube privada). Con
> Play App Signing Google puede reponer la clave de subida, pero cuesta días.
> Nunca subas `*.keystore`, `*.aab` ni `*.apk` al repo.

## 2. Conectar la app con el dominio (Digital Asset Links)

Sin esto la app se abre con una barra de URL arriba y Google la puede rechazar.

1. Sube el `.aab` a Play Console (pista de **Prueba interna**).
2. Copia la huella de *Play Console → Prueba y lanzamiento → Configuración →
   Integridad de la app → Firma de apps → Certificado de la clave de firma de
   apps → SHA-256*.
3. Pégala en `.well-known/assetlinks.json` en lugar de
   `REEMPLAZAR_CON_LA_HUELLA_SHA256_DE_TU_CLAVE_DE_FIRMA`. Si también quieres
   probar el `.apk` firmado por ti, añade la huella de tu clave de subida como
   segundo elemento del array.
4. Push a `main` y comprueba
   https://vesperacademy.com/.well-known/assetlinks.json.
5. Verifica con
   https://developers.google.com/digital-asset-links/tools/generator.

## 3. Play Console

1. **Crear app**: nombre `Vesper Academy — Inglés`, idioma español
   (Latinoamérica), App, Gratis.
2. **Ficha principal**: copia los textos e imágenes de `_marketing/play_store/`.
3. **Contenido de la app** (Política → Contenido de la app):
   - Política de privacidad: `https://vesperacademy.com/aviso-de-privacidad.html`
   - Eliminación de cuenta: `https://vesperacademy.com/eliminar-cuenta.html`
   - Seguridad de los datos, clasificación de contenido y público objetivo:
     respuestas sugeridas en `ficha.md`.
   - Anuncios: **No** contiene anuncios.
   - Contenido generado por IA: **Sí** (el tutor Vesper).
4. **Prueba interna** → instala desde el enlace de testers y revisa la lista
   de abajo.
5. **Prueba cerrada** (12+ testers, 14 días si la cuenta es personal).
6. **Producción** → enviar a revisión.

### Qué revisar en el teléfono antes de enviar

- Abre sin barra de URL (si sale, falla `assetlinks.json`).
- Modo avión: las lecciones ya visitadas siguen abriendo (service worker).
- Crear cuenta → verificar correo → **Eliminar mi cuenta** funciona de punta a punta.
- El botón atrás de Android vuelve dentro de la app, no la cierra de golpe.
- Audio de las lecciones y micrófono del chat (el primer uso pide permiso).
- Los enlaces que salen del dominio (WhatsApp, YouTube) abren fuera de la app.

## 4. Riesgos de revisión que conviene mirar

- **Pagos**: `planes.html` muestra precios de los cursos y lleva a WhatsApp.
  Son clases en vivo con profesor, que en principio no exigen la facturación
  de Google Play, pero si un revisor lo ve como venta de contenido digital
  puede pedir cambios. La salida segura es ocultar precios y botones de compra
  cuando la página corre dentro de la app (`document.referrer` empieza por
  `android-app://com.vesperacademy.lecciones`).
- **Calidad de la TWA**: Play baja de calificación las apps que son "solo un
  sitio web". Ayuda que la app abra directo en las lecciones (no en la
  landing) y que todo lo de la barra inferior funcione dentro de la app.

## 5. Actualizaciones

- Contenido: push a `main`, como siempre. La app lo toma al abrirse.
- Envoltorio: sube `appVersionCode` (+1) y `appVersionName` en
  `twa-manifest.json`, regenera el `.aab` con la **misma clave** y súbelo.

## Notas

- iOS no admite TWA. En iPhone se instala la PWA con *Compartir → Añadir a
  pantalla de inicio*.
- El `.gitignore` es una whitelist: cualquier archivo nuevo en la raíz que deba
  publicarse hay que nombrarlo ahí (`eliminar-cuenta.html` ya lo está).
