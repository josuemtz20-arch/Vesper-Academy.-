---
name: nuevo-sitio
description: >
  Crea un sitio web nuevo completo y listo para publicar con el generador del kit (scripts/crear_sitio.py).
  Úsala cuando el usuario pida "haz un sitio", "crea una página web para X", "nuevo sitio", "landing para mi
  negocio", "replica lo de Vesper para otro proyecto" o similar. Produce HTML/CSS/JS estático con SEO, PWA,
  despliegue a GitHub Pages, preflight y, opcionalmente, login con Firebase, chat de IA y app de Play Store.
---

# Nuevo sitio (orquestador)

## 1. Brief (pregunta solo lo que falte; no más de una ronda)
Obligatorio: **nombre**, **dominio**, **qué es y para quién** (→ descripción), **correo de contacto**.
Útil: idioma (es/en), eslogan, colores de marca, páginas que necesita, llamada a la acción principal.
Módulos (pregunta solo si el negocio lo sugiere):
- `firebase` → área privada con login (alumnos, clientes, socios).
- `ia` → chat/asistente con Claude a través de un Worker (cuesta saldo de API: dilo).
- `play_store` → app Android que envuelve el sitio (TWA).

Si el usuario no tiene colores ni fuentes: usa `theme-factory` o `frontend-design` para proponer una
paleta con carácter. Nunca dejes los colores por defecto sin decirlo.

## 2. Escribe `sitio.json`
Parte de `sitio.ejemplo.json` (raíz del kit). Reglas que el generador valida:
- `paginas[0]` es `index.html`; nombres `minusculas-con-guiones.html`; `login/privacidad/404` reservados.
- Cada página: `titulo` (≤ 60 car., marca al final), `descripcion` (50–160 car., única), `h1`.
- `menu` en las páginas que van en la navegación.
- `secciones[]` con `titulo`, `texto`, `tarjetas[]`. Escribe copy REAL y específico del negocio, no relleno.
- `protegida: true` solo con el módulo `firebase`.

## 3. Genera
```bash
python3 scripts/crear_sitio.py sitio.json --salida ../<carpeta-del-sitio> --git
```
Si falla, el mensaje dice qué falta en `sitio.json`. Al final corre solo el preflight.

## 4. Pule (aquí está la calidad; el generador solo da el esqueleto)
- Aplica `frontend-design` a la portada: hero con identidad, no una plantilla genérica.
- Contenido extra por página siguiendo `seo-landing`.
- Sustituye `assets/images/og.png` e íconos por arte real si el usuario lo tiene.
- `privacidad.html` tiene `[COMPLETAR]`: avísalo, es requisito legal y de Play Store.
- Verifica en navegador (Playwright) a 1280 px y 390 px, sin errores de consola.
- `python3 _scripts/preflight.py --fix` → 0 errores.

## 5. Entrega
Pasos que solo el dueño puede hacer, y nada más: crear repo, Pages = GitHub Actions, DNS,
reglas de Firebase, `wrangler secret put`, cuenta de Play Console. Están en el README generado.
