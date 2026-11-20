#!/usr/bin/env python3
"""Genera un sitio web estático completo a partir de un sitio.json.

    python3 scripts/crear_sitio.py sitio.json --salida ../mi-sitio [--git] [--forzar]

Qué sale: páginas con SEO completo, menú, pie, diseño con tokens (claro/oscuro),
PWA (manifest + service worker offline), sitemap/robots/404/CNAME, aviso de
privacidad, despliegue a GitHub Pages filtrando archivos internos, preflight,
CLAUDE.md y las skills del kit dentro de .claude/skills. Módulos opcionales:
Firebase (login + allowlist + reglas), proxy de IA (Cloudflare Worker) y app
de Play Store (TWA).

Solo usa la biblioteca estándar de Python 3.8+.
"""
import argparse
import datetime
import hashlib
import html
import json
import re
import shutil
import subprocess
import sys
from pathlib import Path

KIT = Path(__file__).resolve().parent.parent
PLANTILLA = KIT / "plantilla"
SKILLS_KIT = KIT / ".claude" / "skills"
SKILLS_SOLO_KIT = {"nuevo-sitio"}  # no tiene sentido dentro del sitio generado

FIREBASE_SDK = "10.12.2"

TEXTOS = {
    "es": {
        "T_SALTAR": "Saltar al contenido", "T_MENU": "Abrir menú",
        "T_PRIVACIDAD": "Aviso de privacidad", "T_404": "Esta página no existe",
        "T_INICIO": "Volver al inicio", "T_SIN_CONEXION": "Sin conexión",
        "T_REINTENTAR": "Reintentar", "T_ENTRAR": "Entrar",
        "T_CONTRASENA": "Contraseña", "T_CREAR_CUENTA": "Crear cuenta",
        "T_VERIFICA": "Te enviamos un correo: verifica tu cuenta y vuelve a entrar.",
        "T_SIN_ACCESO": "Tu cuenta aún no tiene acceso. Escríbenos para activarla.",
        "LOCALE": "es_MX",
    },
    "en": {
        "T_SALTAR": "Skip to content", "T_MENU": "Open menu",
        "T_PRIVACIDAD": "Privacy policy", "T_404": "This page does not exist",
        "T_INICIO": "Back to home", "T_SIN_CONEXION": "You are offline",
        "T_REINTENTAR": "Retry", "T_ENTRAR": "Sign in",
        "T_CONTRASENA": "Password", "T_CREAR_CUENTA": "Create account",
        "T_VERIFICA": "We sent you an email: verify your account and sign in again.",
        "T_SIN_ACCESO": "Your account has no access yet. Contact us to enable it.",
        "LOCALE": "en_US",
    },
}

# Variables que ya son HTML/JS y no se escapan.
CRUDAS = {"NAV", "CONTENIDO", "HEAD_EXTRA", "CORE", "JSON_LD", "TARJETAS",
          "PAGINAS_PUBLICAS", "CSP", "README_EXTRA", "FUENTES_URL", "CLASE"}

PLACEHOLDER = re.compile(r"\{\{([A-Z0-9_]+)\}\}")


def render(texto, vars_, origen="?"):
    def sub(m):
        k = m.group(1)
        if k not in vars_:
            raise SystemExit(f"Falta la variable {{{{{k}}}}} en {origen}")
        v = str(vars_[k])
        return v if k in CRUDAS else html.escape(v, quote=True)
    return PLACEHOLDER.sub(sub, texto)


def slug(s):
    s = s.lower()
    for a, b in zip("áéíóúüñ", "aeiouun"):
        s = s.replace(a, b)
    return re.sub(r"[^a-z0-9]+", "-", s).strip("-") or "sitio"


def falla(msg):
    raise SystemExit("ERROR: " + msg)


def cargar_config(ruta):
    try:
        c = json.loads(Path(ruta).read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as e:
        falla(f"no pude leer {ruta}: {e}")
    for k in ("nombre", "dominio", "correo_contacto", "descripcion"):
        if not c.get(k):
            falla(f"sitio.json necesita '{k}'")
    c["dominio"] = re.sub(r"^https?://|/.*$", "", c["dominio"].strip().lower())
    c.setdefault("idioma", "es")
    if c["idioma"] not in TEXTOS:
        falla(f"idioma '{c['idioma']}' no soportado ({', '.join(TEXTOS)})")
    c.setdefault("nombre_corto", c["nombre"][:12])
    c.setdefault("eslogan", "")
    c.setdefault("colores", {})
    c.setdefault("fuentes", {})
    c.setdefault("modulos", {})
    c.setdefault("paginas", [])
    if not c["paginas"] or c["paginas"][0].get("archivo") != "index.html":
        falla("la primera página de 'paginas' debe ser index.html")
    vistos = set()
    for p in c["paginas"]:
        a = p.get("archivo", "")
        if not re.fullmatch(r"[a-z0-9\-]+\.html", a):
            falla(f"archivo de página inválido: '{a}' (usa minúsculas-con-guiones.html)")
        if a in vistos or a in ("login.html", "privacidad.html", "404.html"):
            falla(f"página repetida o reservada: {a}")
        vistos.add(a)
        if not p.get("titulo") or not p.get("descripcion"):
            falla(f"{a}: necesita 'titulo' y 'descripcion' (SEO)")
        if not 50 <= len(p["descripcion"]) <= 170:
            print(f"aviso: {a}: la descripción mide {len(p['descripcion'])} caracteres (ideal 50-160)")
    return c


def csp(c):
    m = c["modulos"]
    script = ["'self'", "'unsafe-inline'"]
    connect = ["'self'"]
    frame = ["'self'"]
    if m.get("firebase"):
        pid = m["firebase"]["project_id"]
        script.append("https://www.gstatic.com")
        connect += ["https://firestore.googleapis.com", "https://identitytoolkit.googleapis.com",
                    "https://securetoken.googleapis.com", f"https://{pid}.firebaseapp.com"]
        frame.append(f"https://{pid}.firebaseapp.com")
    if m.get("ia"):
        connect.append(m["ia"]["worker_url"].rstrip("/"))
    return "; ".join([
        "default-src 'self'",
        "script-src " + " ".join(script),
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "font-src 'self' data: https://fonts.gstatic.com",
        "img-src 'self' data: blob: https:",
        "connect-src " + " ".join(connect),
        "frame-src " + " ".join(frame),
        "worker-src 'self'", "manifest-src 'self'", "object-src 'none'",
        "base-uri 'self'", "form-action 'self'", "upgrade-insecure-requests",
    ])


def seccion_html(s, i, base):
    tarjetas = "\n".join(
        render((base / "_tarjeta.html").read_text(), {"TITULO": t.get("titulo", ""), "TEXTO": t.get("texto", "")})
        for t in s.get("tarjetas", [])
    )
    return render((base / "_seccion.html").read_text(), {
        "TITULO": s.get("titulo", ""), "TEXTO": s.get("texto", ""),
        "TARJETAS": tarjetas, "CLASE": " alt" if i % 2 == 0 else "",
    })


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("config", help="ruta a sitio.json")
    ap.add_argument("--salida", required=True, help="carpeta donde se crea el sitio")
    ap.add_argument("--forzar", action="store_true", help="sobrescribir si la carpeta ya existe")
    ap.add_argument("--git", action="store_true", help="git init + primer commit en main")
    a = ap.parse_args()

    c = cargar_config(a.config)
    out = Path(a.salida).resolve()
    if out.exists() and any(out.iterdir()):
        if not a.forzar:
            falla(f"{out} ya existe y no está vacía (usa --forzar para sobrescribir)")
        if (out / ".git").exists():
            falla(f"{out} es un repo git: no lo sobrescribo. Bórralo tú o usa otra carpeta.")
        shutil.rmtree(out)
    out.mkdir(parents=True, exist_ok=True)

    m = c["modulos"]
    col = c["colores"]
    fuentes = c["fuentes"]
    f_tit = fuentes.get("titulos", "Fraunces")
    f_txt = fuentes.get("texto", "Inter")
    fam = lambda f: f.replace(" ", "+")
    url = "https://" + c["dominio"]
    hoy = datetime.date.today().isoformat()

    v = dict(TEXTOS[c["idioma"]])
    v.update({
        "NOMBRE": c["nombre"], "NOMBRE_CORTO": c["nombre_corto"],
        "NOMBRE_CORTO_SLUG": slug(c["nombre_corto"]), "INICIAL": c["nombre"][:1].upper(),
        "DOMINIO": c["dominio"], "URL": url, "IDIOMA": c["idioma"],
        "DESCRIPCION": c["descripcion"], "ESLOGAN": c["eslogan"],
        "CORREO_CONTACTO": c["correo_contacto"], "ANIO": datetime.date.today().year,
        "COLOR_PRIMARIO": col.get("primario", "#3b2f8f"), "COLOR_ACENTO": col.get("acento", "#c8902a"),
        "COLOR_FONDO": col.get("fondo", "#fbf8f1"), "COLOR_TEXTO": col.get("texto", "#1c1a2e"),
        "FUENTE_TITULOS": f_tit, "FUENTE_TEXTO": f_txt,
        "FUENTES_URL": html.escape(
            f"https://fonts.googleapis.com/css2?family={fam(f_tit)}:wght@500;700"
            f"&family={fam(f_txt)}:wght@400;500;600;700&display=swap"),
        "CSP": html.escape(csp(c)), "VERSION": "0", "README_EXTRA": "",
    })

    base = PLANTILLA / "base"

    # --- Archivos fijos de la plantilla base
    for src in base.rglob("*"):
        if src.is_dir() or src.name.startswith("_") or src.name.endswith(".contenido"):
            continue
        rel = src.relative_to(base)
        dst = out / rel
        dst.parent.mkdir(parents=True, exist_ok=True)
        if src.name in ("sw.js",):
            continue  # se escribe al final, con CORE
        dst.write_text(render(src.read_text(encoding="utf-8"), v, str(rel)), encoding="utf-8")
    (out / ".github" / "pages_filter.sh").chmod(0o755)

    # --- Módulos
    readme_extra = []
    paginas_publicas = [p["archivo"] for p in c["paginas"] if not p.get("protegida")] + ["privacidad.html"]
    head_proteccion = ""
    if m.get("firebase"):
        fb = m["firebase"]
        for k in ("project_id", "api_key", "app_id", "correo_admin"):
            if not fb.get(k):
                falla(f"modulos.firebase necesita '{k}' (usa \"PEGAR\" si aún no lo tienes)")
        v.update({"FIREBASE_PROJECT_ID": fb["project_id"], "FIREBASE_API_KEY": fb["api_key"],
                  "FIREBASE_APP_ID": fb["app_id"], "CORREO_ADMIN": fb["correo_admin"].lower(),
                  "PAGINAS_PUBLICAS": ", ".join(json.dumps(x) for x in paginas_publicas)})
        sdk = f"https://www.gstatic.com/firebasejs/{FIREBASE_SDK}"
        head_proteccion = "\n".join([
            f'<script src="{sdk}/firebase-app-compat.js"></script>',
            f'<script src="{sdk}/firebase-auth-compat.js"></script>',
            f'<script src="{sdk}/firebase-firestore-compat.js"></script>',
            '<script src="assets/js/acceso.js?v=0"></script>',
        ])
        copiar_modulo("firebase", out, v)
        readme_extra.append(
            "\n## Firebase (acceso)\n"
            "1. Consola de Firebase → Authentication → activa *Email/Password* y añade "
            f"`{c['dominio']}` en *Authorized domains*.\n"
            "2. Firestore → Reglas → pega `firestore.rules` completo → Publicar.\n"
            "3. Para dar acceso: crea el documento `miembros/{correo}` (campo `rol`: "
            "`\"miembro\"` o `\"admin\"`).\n")
    if m.get("ia"):
        ia = m["ia"]
        if not ia.get("worker_url"):
            falla("modulos.ia necesita 'worker_url' (https://<nombre>.<cuenta>.workers.dev)")
        v.update({"WORKER_URL": ia["worker_url"], "IA_MODELO": ia.get("modelo", "claude-haiku-5-5"),
                  "WORKER_NOMBRE": ia.get("worker_nombre", slug(c["nombre_corto"]) + "-ia")})
        copiar_modulo("worker", out, v)
        readme_extra.append(
            "\n## Proxy de IA (Cloudflare Worker)\n"
            "```bash\ncd worker && npx wrangler deploy && npx wrangler secret put ANTHROPIC_API_KEY\n```\n"
            "Cliente: `assets/js/chat.js` (`Chat.enviar(historial, system, onTexto)`). "
            "Ajusta modelo, límites y guardrails en `worker/proxy.js`.\n")
    if m.get("play_store"):
        ps = m["play_store"]
        if not ps.get("package_id"):
            falla("modulos.play_store necesita 'package_id' (ej. com.midominio.app; no se puede cambiar después)")
        v["PACKAGE_ID"] = ps["package_id"]
        copiar_modulo("twa", out, v)
        readme_extra.append(
            "\n## App Android (Play Store)\nVer skill `app-play-store`. Paquete: "
            f"`{ps['package_id']}`. Pega la huella SHA-256 de tu clave en "
            "`.well-known/assetlinks.json`.\n")
    v["README_EXTRA"] = "".join(readme_extra)
    (out / "README.md").write_text(render((base / "README.md").read_text(encoding="utf-8"), v, "README.md"),
                                   encoding="utf-8")

    # --- Páginas
    paginas = list(c["paginas"])
    paginas.append({"archivo": "privacidad.html", "titulo": f"{v['T_PRIVACIDAD']} | {c['nombre']}",
                    "h1": v["T_PRIVACIDAD"], "descripcion": f"{v['T_PRIVACIDAD']} de {c['nombre']}: "
                    f"qué datos recogemos, para qué y cómo ejercer tus derechos.",
                    "_contenido": base / "privacidad.html.contenido"})
    if m.get("firebase"):
        paginas.append({"archivo": "login.html", "titulo": f"{v['T_ENTRAR']} | {c['nombre']}",
                        "h1": v["T_ENTRAR"], "descripcion": f"{v['T_ENTRAR']} a tu cuenta de {c['nombre']}.",
                        "_contenido": PLANTILLA / "firebase" / "login.html.contenido",
                        "_sitemap": False, "_head": head_proteccion, "_noindex": True})

    nav = "\n".join(
        f'      <a href="{html.escape(p["archivo"])}">{html.escape(p["menu"])}</a>'
        for p in paginas if p.get("menu"))
    cta_def = c.get("cta", {})
    json_ld = json.dumps({
        "@context": "https://schema.org", "@type": c.get("tipo_schema", "Organization"),
        "name": c["nombre"], "url": url + "/", "description": c["descripcion"],
        "email": c["correo_contacto"], "logo": url + "/assets/images/icon.svg",
    }, ensure_ascii=False).replace("</", "<\\/")

    plantilla_pagina = (base / "_pagina.html").read_text(encoding="utf-8")
    for p in paginas:
        if "_contenido" in p:
            contenido = render(p["_contenido"].read_text(encoding="utf-8"), v, p["archivo"])
        else:
            contenido = "\n".join(seccion_html(s, i, base) for i, s in enumerate(p.get("secciones", [])))
        head = p.get("_head", head_proteccion if p.get("protegida") else "")
        if p.get("_noindex") or p.get("protegida"):
            head = '<meta name="robots" content="noindex">\n' + head
        cta = p.get("cta", cta_def)
        pv = dict(v, **{
            "ARCHIVO": p["archivo"], "TITULO": p["titulo"], "H1": p.get("h1", p["titulo"]),
            "DESCRIPCION_PAGINA": p["descripcion"],
            "URL_PAGINA": url + "/" + ("" if p["archivo"] == "index.html" else p["archivo"]),
            "NAV": nav, "CONTENIDO": contenido, "HEAD_EXTRA": head, "JSON_LD": json_ld,
            "CTA_URL": cta.get("url", "#contacto"), "CTA_TEXTO": cta.get("texto", "Contáctanos"),
        })
        (out / p["archivo"]).write_text(render(plantilla_pagina, pv, p["archivo"]), encoding="utf-8")

    # --- Sitemap
    entradas = []
    for p in paginas:
        if p.get("_sitemap") is False or p.get("protegida"):
            continue
        loc = url + "/" + ("" if p["archivo"] == "index.html" else p["archivo"])
        pri = "1.0" if p["archivo"] == "index.html" else "0.8"
        entradas.append(f"  <url>\n    <loc>{loc}</loc>\n    <lastmod>{hoy}</lastmod>\n"
                        f"    <priority>{pri}</priority>\n  </url>")
    (out / "sitemap.xml").write_text(
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        + "\n".join(entradas) + "\n</urlset>\n", encoding="utf-8")

    # --- Service worker (CORE = lo que debe abrir sin conexión)
    core = [p["archivo"] for p in paginas if not p.get("protegida")]
    core += ["manifest.webmanifest", "assets/css/tokens.css", "assets/css/site.css",
             "assets/js/site.js", "assets/images/icon.svg"]
    v["CORE"] = ",\n".join(f'  "{x}"' for x in core)
    (out / "sw.js").write_text(render((base / "sw.js").read_text(encoding="utf-8"), v, "sw.js"), encoding="utf-8")

    # --- Íconos PNG y og.png (requiere Pillow; si no está, el preflight avisa)
    imagenes(out, v)

    # --- Herramientas dentro del sitio: preflight + skills + config
    (out / "_scripts").mkdir(exist_ok=True)
    shutil.copy2(KIT / "scripts" / "preflight.py", out / "_scripts" / "preflight.py")
    for sk in SKILLS_KIT.iterdir():
        if sk.is_dir() and sk.name not in SKILLS_SOLO_KIT:
            shutil.copytree(sk, out / ".claude" / "skills" / sk.name, dirs_exist_ok=True)
    shutil.copy2(a.config, out / "sitio.json")

    # --- Versiones ?v= y CACHE_VERSION reales
    r = subprocess.run([sys.executable, str(out / "_scripts" / "preflight.py"), "--fix", "--raiz", str(out)])
    if r.returncode != 0:
        falla("el preflight del sitio recién generado falló (arriba el detalle)")

    if a.git:
        subprocess.run(["git", "init", "-q", "-b", "main"], cwd=out, check=True)
        subprocess.run(["git", "add", "-A"], cwd=out, check=True)
        subprocess.run(["git", "commit", "-q", "-m", f"{c['nombre']}: sitio inicial generado con kit-sitios"],
                       cwd=out, check=True)

    print(f"\nListo: {out}")
    print("Siguiente: python3 -m http.server 8000 --directory " + str(out))


def imagenes(out, v):
    try:
        from PIL import Image, ImageDraw, ImageFont
    except ImportError:
        print("aviso: sin Pillow (pip install pillow) no genero icon_192/512/maskable ni og.png: créalos a mano")
        return
    def fuente(tam):
        for f in ("DejaVuSerif-Bold.ttf", "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf", "Georgia Bold.ttf"):
            try:
                return ImageFont.truetype(f, tam)
            except OSError:
                pass
        return ImageFont.load_default()
    prim, fondo = v["COLOR_PRIMARIO"], v["COLOR_FONDO"]
    d = out / "assets" / "images"
    for nombre, lado, margen in (("icon_192.png", 192, 0), ("icon_512.png", 512, 0), ("icon_maskable_512.png", 512, 1)):
        im = Image.new("RGB", (lado, lado), prim)
        dr = ImageDraw.Draw(im)
        tam = int(lado * (0.42 if margen else 0.55))  # maskable: dentro de la zona segura (80 %)
        dr.text((lado / 2, lado / 2), v["INICIAL"], font=fuente(tam), fill="#ffffff", anchor="mm")
        im.save(d / nombre)
    og = Image.new("RGB", (1200, 630), prim)
    dr = ImageDraw.Draw(og)
    dr.text((80, 260), v["NOMBRE"], font=fuente(84), fill="#ffffff", anchor="ls")
    dr.text((80, 350), v["ESLOGAN"] or v["DOMINIO"], font=fuente(40), fill=fondo, anchor="ls")
    og.save(d / "og.png")


def copiar_modulo(nombre, out, v):
    raiz = PLANTILLA / nombre
    for src in raiz.rglob("*"):
        if src.is_dir() or src.name.endswith(".contenido"):
            continue
        rel = src.relative_to(raiz)
        dst = out / rel
        dst.parent.mkdir(parents=True, exist_ok=True)
        dst.write_text(render(src.read_text(encoding="utf-8"), v, f"{nombre}/{rel}"), encoding="utf-8")


if __name__ == "__main__":
    main()
