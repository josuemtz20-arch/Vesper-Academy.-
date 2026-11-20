#!/usr/bin/env bash
# check_headers.sh — revisa HTTPS y cabeceras de seguridad de un sitio.
# Uso: bash check_headers.sh https://ejemplo.com
set -uo pipefail
URL="${1:?uso: check_headers.sh https://sitio}"
HOST=$(echo "$URL" | sed -E 's#^https?://([^/]+).*#\1#')

echo "== Redirección HTTP -> HTTPS"
loc=$(curl -sS -o /dev/null -w '%{http_code} %{redirect_url}' "http://$HOST/" || true)
case "$loc" in 30[18]\ https://*) echo "  OK  $loc" ;; *) echo "  FALTA  http:// no redirige a https:// ($loc)" ;; esac

H=$(curl -sS -D - -o /dev/null "$URL" | tr -d '\r')
[ -z "$H" ] && { echo "No se pudo conectar a $URL"; exit 1; }
echo "== Cabeceras de $URL"
check() { # nombre, patrón esperado (regex), consejo
  local v; v=$(echo "$H" | grep -i "^$1:" | head -1 | cut -d' ' -f2-)
  if [ -z "$v" ]; then echo "  FALTA  $1  -> $3"
  elif [ -n "$2" ] && ! echo "$v" | grep -qiE "$2"; then echo "  REVISAR $1: $v  -> $3"
  else echo "  OK  $1: ${v:0:100}"; fi
}
check "Strict-Transport-Security" "max-age=([3-9][0-9]{6,}|[1-9][0-9]{7,})" "max-age>=31536000; includeSubDomains"
check "Content-Security-Policy" "default-src|script-src" "define al menos default-src y script-src; frame-ancestors 'none'"
check "X-Content-Type-Options" "nosniff" "nosniff"
check "X-Frame-Options" "deny|sameorigin" "DENY (o frame-ancestors en la CSP)"
check "Referrer-Policy" "" "strict-origin-when-cross-origin"
check "Permissions-Policy" "" "camera=(), microphone=(), geolocation=()"
check "Cross-Origin-Opener-Policy" "" "same-origin"
for leak in Server X-Powered-By; do
  v=$(echo "$H" | grep -i "^$leak:" | cut -d' ' -f2-)
  [ -n "$v" ] && echo "  INFO  $leak expone: $v (quítalo o sin versión)"
done
if echo "$H" | grep -qi '^server: GitHub.com'; then
  echo "  NOTA  GitHub Pages no permite cabeceras propias: usa <meta http-equiv=\"Content-Security-Policy\"> o Cloudflare delante."
fi
echo "== Cookies"
echo "$H" | grep -i '^set-cookie:' | while read -r c; do
  miss=""; for f in HttpOnly Secure SameSite; do echo "$c" | grep -qi "$f" || miss="$miss $f"; done
  echo "  ${miss:+FALTA$miss en: }${miss:-OK: }${c:12:80}"
done
