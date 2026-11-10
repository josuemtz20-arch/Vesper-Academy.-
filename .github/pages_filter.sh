#!/usr/bin/env bash
# Copia los archivos rastreados por git a la carpeta destino ($1), menos los
# internos. Lo usa .github/workflows/pages.yml; también sirve para probar en
# local:  bash .github/pages_filter.sh _site_prueba
set -euo pipefail
OUT="${1:?uso: pages_filter.sh CARPETA_DESTINO}"

# Archivos que están en git pero NO se publican (regex sobre la ruta):
#   .git*, .github/        plomería del repo (el .gitignore lista todo el sitio)
#   *.md, *.rules (raíz)   reglas de Firestore y documentos internos
#   worker/                código y despliegue del proxy del chat
#   twa-manifest.json      configuración de compilación de la app Android
#   assets/**/*.txt        guiones de audio y notas sueltas
INTERNOS='^(\.git|\.github/|worker/|[^/]+\.md$|[^/]+\.rules$|twa-manifest\.json$|assets/.*\.txt$)'

rm -rf "$OUT"
mkdir -p "$OUT"
git ls-files -z | grep -zvE "$INTERNOS" | xargs -0 cp --parents -t "$OUT"

# Lo que el sitio necesita sí o sí.
for f in index.html leccion.html sw.js CNAME .nojekyll .well-known/assetlinks.json robots.txt; do
  [ -e "$OUT/$f" ] || { echo "FALTA en el sitio: $f" >&2; exit 1; }
done
# Y lo que no debe salir nunca.
if ls -A "$OUT" | grep -qE '^(firestore\.rules|README\.md|worker|\.gitignore)$'; then
  echo "Se coló un archivo interno en $OUT" >&2; exit 1
fi

echo "Sitio armado en $OUT: $(find "$OUT" -type f | wc -l) archivos" \
     "($(git ls-files | grep -cE "$INTERNOS") internos fuera)."
