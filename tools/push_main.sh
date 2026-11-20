#!/usr/bin/env bash
# Publica la rama actual en main (= vesperacademy.com) de forma segura:
#
#   1. REVISA: árbol limpio, sin marcadores de conflicto, JS con sintaxis
#      válida, lecciones validadas, CACHE_VERSION al día y nada interno
#      colándose al sitio. Si algo falla, NO se publica.
#   2. RESPALDA: crea el tag respaldo/main-AAAAMMDD-HHMMSS apuntando al main
#      de ANTES y lo sube. Si algo sale mal, se vuelve a ese punto.
#   3. PUBLICA: push a main (solo avance rápido; nunca reescribe historia).
#   4. AVISA: el workflow .github/workflows/notify-push.yml manda la
#      notificación al escritorio al recibir el push.
#
# Uso:   bash tools/push_main.sh          (pide confirmación tras mostrar el diff)
#        bash tools/push_main.sh --yes    (sin pregunta; para sesiones de Claude)
#
# Volver al respaldo si algo salió mal (deshace con un commit, no borra nada):
#   git fetch origin --tags
#   git checkout -b revertir origin/main
#   git revert --no-edit respaldo/main-AAAAMMDD-HHMMSS..origin/main
#   bash tools/push_main.sh
set -euo pipefail
cd "$(git rev-parse --show-toplevel)"

YES=0; [ "${1:-}" = "--yes" ] && YES=1
rojo(){ printf '\033[31m✗ %s\033[0m\n' "$*" >&2; exit 1; }
ok(){ printf '\033[32m✓\033[0m %s\n' "$*"; }

echo "== 1. Revisión"
[ -z "$(git status --porcelain)" ] || rojo "Hay cambios sin commit. Haz commit o descártalos primero."

git fetch -q origin main --tags
BASE=$(git rev-parse origin/main)
HEAD_SHA=$(git rev-parse HEAD)
[ "$BASE" != "$HEAD_SHA" ] || rojo "No hay nada nuevo: HEAD ya es origin/main."
git merge-base --is-ancestor "$BASE" HEAD \
  || rojo "Tu rama no contiene el main actual. Corre: git merge origin/main (resuelve y vuelve a intentar)."
ok "avance rápido sobre origin/main ($(git rev-parse --short "$BASE"))"

CAMBIADOS=$(git diff --name-only --diff-filter=AMR "$BASE" HEAD)
if [ -n "$CAMBIADOS" ] && echo "$CAMBIADOS" | xargs -d '\n' grep -lE '^(<<<<<<<|>>>>>>>)( |$)' 2>/dev/null; then
  rojo "Marcadores de conflicto en los archivos de arriba."
fi
ok "sin marcadores de conflicto"

MALOS=0
while IFS= read -r f; do
  case "$f" in
    *.js) node --check "$f" 2>/dev/null || node --input-type=module --check < "$f" 2>/dev/null || { echo "  sintaxis: $f" >&2; MALOS=1; } ;;
    *.mjs) node --check "$f" 2>/dev/null || { echo "  sintaxis: $f" >&2; MALOS=1; } ;;
  esac
done <<< "$CAMBIADOS"
[ $MALOS = 0 ] || rojo "Errores de sintaxis en JS."
ok "sintaxis JS"

node tools/check_lessons.mjs >/dev/null || { node tools/check_lessons.mjs | tail -20; rojo "El validador de lecciones falló."; }
ok "lecciones"

node tools/check_sw_version.mjs >/dev/null || { node tools/check_sw_version.mjs; rojo "CACHE_VERSION desactualizado."; }
ok "CACHE_VERSION de sw.js"

TMP=$(mktemp -d); trap 'rm -rf "$TMP"' EXIT
bash .github/pages_filter.sh "$TMP/site" >/dev/null
FUGAS=$(cd "$TMP/site" && find . -type f \( -name '*.rules' -o -path './worker/*' -o -path './.claude/*' -o -path './tools/*' -o -path './.github/*' \) | head -5)
[ -z "$FUGAS" ] || rojo "Archivos internos se publicarían: $FUGAS"
ok "nada interno en el sitio publicado"

echo
echo "== Lo que se va a publicar"
git log --oneline --no-merges "$BASE"..HEAD | head -40
git diff --stat "$BASE" HEAD | tail -1

if [ $YES = 0 ]; then
  printf '\n¿Publicar en vesperacademy.com? [s/N] '
  read -r r; [ "$r" = "s" ] || [ "$r" = "S" ] || rojo "Cancelado."
fi

echo
echo "== 2. Respaldo"
TAG="respaldo/main-$(date -u +%Y%m%d-%H%M%S)"
git tag -a "$TAG" "$BASE" -m "main antes de publicar $(git rev-parse --short HEAD)"
git push -q origin "refs/tags/$TAG"
ok "respaldo $TAG -> $(git rev-parse --short "$BASE")"

echo
echo "== 3. Publicar"
git push origin HEAD:main
ok "main = $(git rev-parse --short HEAD). El aviso llega al escritorio en ~1 min."
echo "   Si algo salió mal: ver las instrucciones de 'Volver al respaldo' arriba de este script (tag $TAG)."
