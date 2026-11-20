# {{NOMBRE}}

{{DESCRIPCION}}

- Sitio estático en GitHub Pages → `{{URL}}`
- Probar en local: `python3 -m http.server 8000` y abrir http://localhost:8000
- Revisar antes de publicar: `python3 _scripts/preflight.py --fix`
- Publicar: push a `main` (workflow `.github/workflows/pages.yml`).

## Primer despliegue (una sola vez)
1. Crea el repo en GitHub y sube esta carpeta a `main`.
2. Settings → Pages → Source = **GitHub Actions**.
3. Settings → Pages → Custom domain = `{{DOMINIO}}` y activa *Enforce HTTPS*.
4. En tu proveedor DNS: `CNAME www → <usuario>.github.io` y para el dominio raíz
   registros `A` a 185.199.108.153, .109.153, .110.153, .111.153.
5. Sustituye `assets/images/og.png` (1200×630) y los íconos PNG 192/512/maskable.
{{README_EXTRA}}
