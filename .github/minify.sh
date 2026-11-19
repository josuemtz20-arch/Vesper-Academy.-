#!/usr/bin/env bash
# Minifica el JS y el CSS del sitio YA ARMADO ($1, normalmente _site/).
# Lo usa .github/workflows/pages.yml después de pages_filter.sh; el repo se
# queda legible y solo se publica la versión compacta.
#
# Por qué: leccion.html baja ~1.6 MB de JS y 290 KB de CSS. Minificado pesa
# ~35 % menos ya comprimido (leccion_app.js: 118 KB -> 77 KB gzip; leccion.css:
# 71 KB -> 45 KB) y el teléfono tarda menos en parsearlo.
#
# Seguro con scripts clásicos (no módulos): esbuild NO renombra los nombres
# globales de nivel superior, solo los locales, así que las funciones que unas
# páginas llaman de otros scripts siguen existiendo. No se toca la sintaxis
# (sin --target): lo que corre hoy corre igual.
#
# Si un archivo falla al minificar se publica el original y se avisa: nunca
# rompe el despliegue por un archivo.
#
# Probar en local:  bash .github/pages_filter.sh _site_prueba && bash .github/minify.sh _site_prueba
set -euo pipefail
OUT="${1:?uso: minify.sh CARPETA_DEL_SITIO}"
ESBUILD_VERSION="0.24.0"

# Instala esbuild en una carpeta temporal (fuera del sitio publicado).
TOOLS="$(mktemp -d)"
npm install --prefix "$TOOLS" --no-save --no-audit --no-fund --silent "esbuild@${ESBUILD_VERSION}" >/dev/null
ESBUILD="$TOOLS/node_modules/.bin/esbuild"

antes=0; despues=0; fallos=0
while IFS= read -r -d '' f; do
  case "$f" in *.min.js|*.min.css) continue ;; esac
  tmp="$f.min.tmp"
  case "$f" in *.css) loader=css ;; *) loader=js ;; esac
  # --legal-comments=inline: conserva solo los comentarios /*! ... */ y @license
  # (p. ej. el aviso CC BY 4.0 de Font Awesome en las hojas de iconos); el resto
  # de comentarios propios se elimina.
  if "$ESBUILD" --minify --loader="$loader" --legal-comments=inline --log-level=error < "$f" > "$tmp"; then
    a=$(stat -c %s "$f"); b=$(stat -c %s "$tmp")
    if [ "$b" -gt 0 ] && [ "$b" -lt "$a" ]; then
      mv "$tmp" "$f"; antes=$((antes + a)); despues=$((despues + b))
    else
      rm -f "$tmp"
    fi
  else
    rm -f "$tmp"; fallos=$((fallos + 1))
    echo "::warning::No se pudo minificar $f; se publica el original."
  fi
done < <(find "$OUT" -type f \( -name '*.js' -o -name '*.css' \) -not -path '*/.well-known/*' -print0)

rm -rf "$TOOLS"
echo "Minificado: $((antes / 1024)) KB -> $((despues / 1024)) KB (sin comprimir). Fallos: $fallos."
