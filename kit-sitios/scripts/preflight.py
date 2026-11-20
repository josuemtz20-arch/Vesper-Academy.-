#!/usr/bin/env python3
"""Revisión antes de publicar un sitio estático.

    python3 _scripts/preflight.py          # solo revisa (lo corre el workflow)
    python3 _scripts/preflight.py --fix    # además actualiza ?v= y CACHE_VERSION

Errores (salida 1): enlaces/recursos locales rotos, HTML sin lang/title/
description/viewport/canonical, placeholders {{...}} sin llenar, entradas del
sitemap que no existen, entradas de CORE del service worker que no existen,
?v= o CACHE_VERSION desactualizados (sin --fix).
Avisos: páginas indexables fuera del sitemap, descripciones fuera de 50-160,
assetlinks.json con la huella de ejemplo, varios <h1>.
"""
import argparse
import hashlib
import re
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse

IGNORAR = re.compile(r"^(\.git|\.claude|_scripts|worker|node_modules|_site)")
PLACEHOLDER = re.compile(r"\{\{[A-Z0-9_]+\}\}")
VERSIONADO = re.compile(r'((?:href|src)=")([^"?#]+\.(?:css|js))\?v=([0-9a-zA-Z]+)(")')


class Pagina(HTMLParser):
    def __init__(self):
        super().__init__()
        self.refs, self.meta, self.h1 = [], {}, 0
        self.lang = self.title = self.canonical = None
        self._en_title = False

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "html":
            self.lang = a.get("lang")
        elif tag == "title":
            self._en_title = True
        elif tag == "h1":
            self.h1 += 1
        elif tag == "meta" and a.get("name"):
            self.meta[a["name"].lower()] = a.get("content", "")
        elif tag == "link" and a.get("rel") == "canonical":
            self.canonical = a.get("href")
        for k in ("href", "src"):
            if a.get(k) and not (tag == "link" and a.get("rel") in ("canonical", "preconnect")):
                self.refs.append(a[k])

    def handle_endtag(self, tag):
        if tag == "title":
            self._en_title = False

    def handle_data(self, data):
        if self._en_title:
            self.title = (self.title or "") + data


def h8(data):
    return hashlib.sha256(data).hexdigest()[:8]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--fix", action="store_true")
    ap.add_argument("--raiz", default=str(Path(__file__).resolve().parent.parent))
    a = ap.parse_args()
    raiz = Path(a.raiz).resolve()
    errores, avisos = [], []

    archivos = [p for p in raiz.rglob("*") if p.is_file()
                and not IGNORAR.match(p.relative_to(raiz).as_posix())]
    htmls = [p for p in archivos if p.suffix == ".html"]

    # Placeholders sin llenar en archivos de texto publicables
    for p in archivos:
        if p.suffix in (".html", ".js", ".css", ".json", ".webmanifest", ".xml", ".txt") or p.name == "CNAME":
            t = p.read_text(encoding="utf-8", errors="replace")
            for m in set(PLACEHOLDER.findall(t)):
                errores.append(f"{p.relative_to(raiz)}: placeholder sin llenar {m}")

    indexables = set()
    for p in htmls:
        rel = p.relative_to(raiz).as_posix()
        texto = p.read_text(encoding="utf-8")

        # ?v= con el hash real del archivo
        def bump(m):
            destino = (raiz / m.group(2).lstrip("/")) if m.group(2).startswith("/") else (p.parent / m.group(2))
            if not destino.exists():
                return m.group(0)
            nuevo = h8(destino.read_bytes())
            if nuevo != m.group(3):
                if not a.fix:
                    errores.append(f"{rel}: {m.group(2)}?v={m.group(3)} desactualizado (corre con --fix)")
                return m.group(1) + m.group(2) + "?v=" + nuevo + m.group(4)
            return m.group(0)
        nuevo_texto = VERSIONADO.sub(bump, texto)
        if a.fix and nuevo_texto != texto:
            p.write_text(nuevo_texto, encoding="utf-8")
            texto = nuevo_texto

        pg = Pagina()
        pg.feed(texto)
        noindex = "noindex" in pg.meta.get("robots", "")
        if not pg.lang:
            errores.append(f"{rel}: <html> sin lang")
        if not (pg.title or "").strip():
            errores.append(f"{rel}: sin <title>")
        if "viewport" not in pg.meta:
            errores.append(f"{rel}: sin meta viewport")
        if not noindex:
            indexables.add(rel)
            d = pg.meta.get("description", "")
            if not d:
                errores.append(f"{rel}: sin meta description")
            elif not 50 <= len(d) <= 170:
                avisos.append(f"{rel}: description de {len(d)} caracteres (ideal 50-160)")
            if not pg.canonical:
                errores.append(f"{rel}: sin link canonical")
            if pg.h1 != 1:
                avisos.append(f"{rel}: {pg.h1} <h1> (debe haber exactamente uno)")

        for ref in pg.refs:
            u = urlparse(ref)
            if u.scheme or ref.startswith(("#", "//", "mailto:", "tel:", "data:", "javascript:")):
                continue
            ruta = u.path
            if not ruta:
                continue
            destino = (raiz / ruta.lstrip("/")) if ruta.startswith("/") else (p.parent / ruta)
            if ruta.endswith("/"):
                destino = destino / "index.html"
            if not destino.exists():
                errores.append(f"{rel}: enlace roto → {ref}")

    # Sitemap
    sm = raiz / "sitemap.xml"
    en_sitemap = set()
    if sm.exists():
        for loc in re.findall(r"<loc>([^<]+)</loc>", sm.read_text(encoding="utf-8")):
            ruta = urlparse(loc).path.lstrip("/") or "index.html"
            en_sitemap.add(ruta)
            if not (raiz / ruta).exists():
                errores.append(f"sitemap.xml: {loc} no existe")
        for rel in sorted(indexables - en_sitemap - {"404.html"}):
            avisos.append(f"{rel}: indexable pero no está en sitemap.xml")
    else:
        errores.append("falta sitemap.xml")

    # Service worker
    sw = raiz / "sw.js"
    if sw.exists():
        t = sw.read_text(encoding="utf-8")
        bloque = re.search(r"var CORE = \[(.*?)\];", t, re.S)
        core = re.findall(r'"([^"]+)"', re.sub(r"/\*.*?\*/", "", bloque.group(1), flags=re.S)) if bloque else []
        dig = hashlib.sha256()
        for c in core:
            f = raiz / c
            if not f.exists():
                errores.append(f"sw.js: CORE incluye {c}, que no existe")
            else:
                dig.update(c.encode() + b"\0" + f.read_bytes())
        m = re.search(r'var CACHE_VERSION = "([^"]+)-([0-9a-f]{8})";', t)
        if not m:
            errores.append('sw.js: CACHE_VERSION debe tener la forma "nombre-vN-xxxxxxxx"')
        elif m.group(2) != dig.hexdigest()[:8]:
            if a.fix:
                sw.write_text(t.replace(m.group(0), f'var CACHE_VERSION = "{m.group(1)}-{dig.hexdigest()[:8]}";'),
                              encoding="utf-8")
            else:
                errores.append("sw.js: CACHE_VERSION desactualizado (corre con --fix)")

    # Íconos del manifest e imagen para redes
    import json
    mf = raiz / "manifest.webmanifest"
    if mf.exists():
        for ic in json.loads(mf.read_text(encoding="utf-8")).get("icons", []):
            if not (raiz / ic["src"].split("?")[0]).exists():
                avisos.append(f"manifest.webmanifest: falta el ícono {ic['src']} (la app no será instalable)")
    if not (raiz / "assets" / "images" / "og.png").exists():
        avisos.append("falta assets/images/og.png (1200x630): las páginas se verán sin imagen al compartirlas")

    al = raiz / ".well-known" / "assetlinks.json"
    if al.exists() and "REEMPLAZAR" in al.read_text(encoding="utf-8"):
        avisos.append(".well-known/assetlinks.json: falta la huella SHA-256 real (la app abrirá con barra de navegador)")

    for x in avisos:
        print("aviso:", x)
    for x in errores:
        print("ERROR:", x)
    print(f"preflight: {len(htmls)} páginas, {len(errores)} errores, {len(avisos)} avisos"
          + (" (--fix aplicado)" if a.fix else ""))
    sys.exit(1 if errores else 0)


if __name__ == "__main__":
    main()
