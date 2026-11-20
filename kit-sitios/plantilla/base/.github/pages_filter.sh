#!/usr/bin/env bash
# Copia los archivos rastreados por git a $1, menos los internos.
set -euo pipefail
OUT="${1:?uso: pages_filter.sh CARPETA_DESTINO}"

# En git pero NO se publican:
#   .git*, .github/, .claude/, _scripts/   plomería y herramientas
#   *.md y *.rules en la raíz                documentos y reglas de Firestore
#   worker/                                  código del proxy (Cloudflare)
#   twa-manifest.json, sitio.json            configuración de compilación
INTERNOS='^(\.git|\.github/|\.claude/|_scripts/|worker/|[^/]+\.md$|[^/]+\.rules$|twa-manifest\.json$|sitio\.json$)'

rm -rf "$OUT"; mkdir -p "$OUT"
git ls-files -z | grep -zvE "$INTERNOS" | xargs -0 cp --parents -t "$OUT"

for f in index.html sw.js .nojekyll robots.txt sitemap.xml 404.html; do
  [ -e "$OUT/$f" ] || { echo "FALTA en el sitio: $f" >&2; exit 1; }
done
if ls -A "$OUT" | grep -qE '^(firestore\.rules|README\.md|CLAUDE\.md|worker|_scripts|\.claude|sitio\.json)$'; then
  echo "Se coló un archivo interno en $OUT" >&2; exit 1
fi
echo "Sitio armado en $OUT: $(find "$OUT" -type f | wc -l) archivos."
