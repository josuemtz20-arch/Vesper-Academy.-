---
name: seo-landing
description: >
  Crear o mejorar páginas para que posicionen y conviertan: title, description, canonical, Open Graph,
  JSON-LD, sitemap, enlazado interno y estructura de una landing SEO por intención de búsqueda. Úsala al
  crear cualquier página nueva, landing de servicio/curso/producto o al revisar SEO.
---

# Páginas y landings SEO

## Checklist por página (el preflight valida lo marcado con *)
- `<html lang>`* · `<title>`* ≤ 60 car., palabra clave primero, marca al final (`Curso de X | Marca`).
- `meta description`* 50–160 car., única, con beneficio + llamada a la acción.
- `link rel=canonical`* con URL absoluta · exactamente un `<h1>`.
- OG: `og:title`, `og:description`, `og:url`, `og:image` (1200×630) · `twitter:card`.
- JSON-LD del tipo correcto (`Organization`, `LocalBusiness`, `Course`, `Product`, `FAQPage`…).
- Entrada en `sitemap.xml` (con `lastmod`) y enlace desde el menú o desde páginas relacionadas.
- Páginas privadas/utilitarias: `<meta name="robots" content="noindex">` y fuera del sitemap.

## Landing por intención (una búsqueda = una página)
Ej.: "examen de inglés gratis", "inglés para call center". Estructura:
1. Hero: H1 = la búsqueda en lenguaje natural + promesa concreta + 1 CTA.
2. Para quién es / problema que resuelve.
3. Qué incluye (tarjetas) con datos específicos, no adjetivos.
4. Prueba: cifras, testimonios reales (nunca inventados), garantías.
5. FAQ con las objeciones reales (+ JSON-LD `FAQPage`).
6. CTA final repetido.

## Errores a evitar
- Descripciones duplicadas entre páginas. - Contenido delgado (< 300 palabras útiles) en landings.
- Texto clave dentro de imágenes. - Enlaces internos rotos (el preflight los detecta).
- Prometer cosas que el negocio no cumple: el copy debe poder sostenerse.
