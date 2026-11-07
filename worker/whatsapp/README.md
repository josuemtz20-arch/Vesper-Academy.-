# Bot de WhatsApp (Cloudflare Worker + WhatsApp Cloud API + Claude)

Contesta solo el WhatsApp de la academia (55 3569 9899) como asesor de
admisiones: precios, planes, cursos, horarios, examen de nivel. Cuando el
cliente quiere inscribirse/pagar, pide "asesor", se queja o el bot no sabe,
**le avisa que un asesor le escribe y se calla 24 h con ese número** para que
tú sigas la charla.

```
Cliente ─► WhatsApp/Meta ─► webhook (este Worker, firma verificada) ─► Claude
Cliente ◄─ WhatsApp/Meta ◄─ Graph API ◄──────────────────────────────┘
```

- Datos del negocio: constante `KNOWLEDGE` en `vesper-whatsapp-bot.js`.
  **Si cambias un precio en la web, cámbialo ahí también.**
- Memoria: últimos 14 mensajes por número; se borra tras 7 días sin actividad.
- Costo: Haiku 4.5, ~0.002–0.005 USD por respuesta. Topes: 40 respuestas por
  número/día y 1500 en total/día. Pon además un límite de gasto en la consola
  de Anthropic. Las respuestas de WhatsApp dentro de las 24 h desde que el
  cliente escribe **no las cobra Meta**.

## Antes de empezar: el número

La Cloud API usa el número de la academia. Dos opciones:

1. **Coexistencia (recomendada):** conectas el número que ya usas en la app
   *WhatsApp Business* (versión reciente). Sigues viendo y contestando desde el
   teléfono; cuando contestas tú, el bot se calla con ese cliente (evento
   `smb_message_echoes`). Se elige en el registro ("conectar tu app de
   WhatsApp Business existente").
2. **Número nuevo / migrado:** el número deja de funcionar en la app y solo lo
   maneja la API. Necesitarías otra herramienta para contestar a mano. No lo
   hagas con el número principal si no estás seguro.

## Alta en Meta (una vez)

1. https://developers.facebook.com → *Mis apps* → **Crear app** → tipo
   *Business* → agrega el producto **WhatsApp**. Te pide (o crea) un
   *Business Portfolio*.
2. WhatsApp → *Configuración de la API* → **Agregar número de teléfono** y
   conecta el de la academia (opción de coexistencia si quieres seguir con la app).
3. **Token permanente:** business.facebook.com → Configuración del negocio →
   *Usuarios del sistema* → crea uno (Admin) → *Asignar activos*: la app y la
   cuenta de WhatsApp → **Generar token** con permisos
   `whatsapp_business_messaging` y `whatsapp_business_management`, sin
   caducidad. (El token temporal del panel dura 24 h: no lo uses.)
4. App secret: *Configuración de la app → Básica → Clave secreta de la app*.

## Despliegue

```bash
npm install -g wrangler
wrangler login
cd worker/whatsapp
wrangler secret put ANTHROPIC_API_KEY   # tu key de Anthropic
wrangler secret put WA_TOKEN            # token permanente (paso 3)
wrangler secret put WA_APP_SECRET       # app secret (paso 4)
wrangler secret put WA_VERIFY_TOKEN     # invéntalo (ej. una frase larga)
wrangler deploy                          # imprime la URL del Worker
```

## Conectar el webhook

Panel de la app → WhatsApp → **Configuración** → *Webhook* → Editar:

- URL de devolución: la URL que imprimió `wrangler deploy`
- Token de verificación: el mismo `WA_VERIFY_TOKEN`
- **Suscríbete** a `messages` (y a `smb_message_echoes` si usas coexistencia).

Prueba: escribe al número desde otro teléfono. Ver en vivo: `wrangler tail`
(las líneas `HANDOFF <número>` son las charlas que te tocan a ti).

## Ajustes

- Pausa, topes y versión de Graph: `[vars]` en `wrangler.toml`.
- Palabras que piden asesor: `HANDOFF_RE`. Textos fijos: `MSG_*`.
- Tono y reglas: `SYSTEM`.

## Limitaciones honestas

- No escucha audios ni ve imágenes: pide que lo escriban (o "asesor").
- No te notifica aparte de los handoffs: los ves en la app (coexistencia) o en
  `wrangler tail`.
- Las políticas de Meta permiten IA para atención a clientes del propio
  negocio (este caso); no permiten usar el número como chatbot de IA general,
  por eso el bot se niega a temas ajenos a la academia.
