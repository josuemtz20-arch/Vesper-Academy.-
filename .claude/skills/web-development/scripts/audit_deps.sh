#!/usr/bin/env bash
# audit_deps.sh — audita dependencias según lo que haya en el proyecto actual.
# Uso: bash audit_deps.sh [carpeta]
set -uo pipefail
cd "${1:-.}"
found=0
if [ -f package-lock.json ] || [ -f package.json ]; then found=1; echo "== npm"; npm audit --omit=dev --audit-level=moderate || true; fi
if [ -f pnpm-lock.yaml ]; then found=1; echo "== pnpm"; pnpm audit --prod || true; fi
if [ -f yarn.lock ]; then found=1; echo "== yarn"; yarn npm audit --environment production 2>/dev/null || yarn audit --groups dependencies || true; fi
if [ -f requirements.txt ] || [ -f pyproject.toml ]; then found=1; echo "== pip-audit"; (command -v pip-audit >/dev/null || pip install -q pip-audit) && pip-audit || true; fi
if [ -f composer.lock ]; then found=1; echo "== composer"; composer audit || true; fi
if [ -f go.mod ]; then found=1; echo "== govulncheck"; (command -v govulncheck >/dev/null || go install golang.org/x/vuln/cmd/govulncheck@latest) && govulncheck ./... || true; fi
# Scripts de CDN sin versión fija o sin SRI en HTML
if ls ./*.html >/dev/null 2>&1; then
  echo "== Scripts externos en HTML (versión fija + integrity recomendados)"
  grep -HnoE '<script[^>]+src="https?://[^"]+"[^>]*>' ./*.html | grep -v 'integrity=' | sed 's/^/  sin SRI: /' | head -20
fi
[ "$found" = 0 ] && echo "No hay manifiesto de dependencias aquí (package.json, requirements.txt, composer.lock, go.mod)."
echo "Siguiente paso: osv-scanner -r . (multi-lenguaje) o Snyk para un informe completo."
