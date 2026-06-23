/* ============================================================
 * vesper_theme.js — Motor de apariencia de Vesper (drop-in).
 *
 * Da a la app varios "modelos" visuales seleccionables (temas de color
 * para toda la interfaz) y skins de la mascota Vesper. La eleccion se
 * guarda en localStorage y se aplica en vivo, sin recargar.
 *
 * USO: incluye <script src="vesper_theme.js"></script> en cualquier pagina.
 *   - Se auto-aplica el tema/skin guardado al cargar.
 *   - VESPER_THEME.setTheme(id) / setSkin(id)  -> cambia y persiste.
 *   - VESPER_THEME.renderPicker()              -> HTML del panel de eleccion.
 *   - VESPER_THEME.mountFloat()                -> boton flotante (paleta) + panel.
 *
 * Mapea TANTO los tokens de la app de lecciones (--ink, --gold, --cream,
 * --paper, --muted, --line, --success, --error, *-tint) COMO los del sitio
 * (--navy, --gold, --cream, --white, --muted, --border, --text...), asi el
 * mismo tema funciona en leccion.html, onboarding.html e index.html.
 *
 * localStorage: "vesper_appearance" = { theme:"classic", skin:"gold" }
 * ============================================================ */
window.VESPER_THEME = (function () {
  var STORE = "vesper_appearance";

  /* ---- Temas: cada uno define la paleta base. Las variantes oscuras
         marcan dark:true para ajustar color-scheme y sombras. ---- */
  var THEMES = {
    classic: {
      name: "Clasico Oro", emoji: "👑", dark: false,
      ink: "#1B1B2F", gold: "#C9A84C", goldLt: "#dcc173", goldDp: "#a8843d",
      success: "#2D9E75", error: "#C0392B",
      cream: "#FBF8F1", paper: "#ffffff", muted: "#5d6470", line: "#ece7da"
    },
    midnight: {
      name: "Medianoche", emoji: "🌙", dark: true,
      ink: "#ECEAF5", gold: "#D8B65A", goldLt: "#e7cd84", goldDp: "#b9963f",
      success: "#41C595", error: "#E07065",
      cream: "#11111c", paper: "#1d1d2c", muted: "#9a9ab4", line: "#2d2d42"
    },
    ivory: {
      name: "Marfil", emoji: "🤍", dark: false,
      ink: "#23202b", gold: "#b8923f", goldLt: "#cba85e", goldDp: "#977630",
      success: "#2D9E75", error: "#C0392B",
      cream: "#ffffff", paper: "#faf8f4", muted: "#6f6a76", line: "#ece7da"
    },
    sunset: {
      name: "Atardecer", emoji: "🌇", dark: false,
      ink: "#2b1d22", gold: "#e0833f", goldLt: "#ee9d5e", goldDp: "#bd6526",
      success: "#3a9e7a", error: "#c0392b",
      cream: "#fdf3ec", paper: "#fff8f3", muted: "#7a655c", line: "#f0ddd0"
    },
    forest: {
      name: "Bosque", emoji: "🌿", dark: false,
      ink: "#16241c", gold: "#3f9e6b", goldLt: "#5cb585", goldDp: "#2e7a50",
      success: "#2d9e75", error: "#c0392b",
      cream: "#f1f6f0", paper: "#ffffff", muted: "#5f7268", line: "#dde8df"
    },
    ocean: {
      name: "Oceano", emoji: "🌊", dark: false,
      ink: "#10222e", gold: "#2f86c5", goldLt: "#4f9fd6", goldDp: "#236699",
      success: "#1f9e8a", error: "#c0392b",
      cream: "#eef5fa", paper: "#ffffff", muted: "#5d7689", line: "#d8e4ee"
    },
    nebula: {
      name: "Nebulosa", emoji: "🪐", dark: true,
      ink: "#efeafb", gold: "#b58cff", goldLt: "#caaaff", goldDp: "#8f63e0",
      success: "#46c79b", error: "#e0708a",
      cream: "#150f24", paper: "#221a38", muted: "#a497c4", line: "#352a52"
    }
  };
  var THEME_ORDER = ["classic", "midnight", "ivory", "sunset", "forest", "ocean", "nebula"];

  /* ---- Skins de mascota: recolorean el aro/borde y aplican un filtro
         sutil al PNG para variar el "modelo" sin arte extra. ---- */
  var SKINS = {
    gold:   { name: "Dorado",  ring: "#C9A84C", glow: "rgba(201,168,76,.45)",  filter: "hue-rotate(0deg)" },
    rose:   { name: "Rosa",    ring: "#dd8aa9", glow: "rgba(221,138,169,.45)", filter: "hue-rotate(-35deg) saturate(1.05)" },
    mint:   { name: "Menta",   ring: "#5cc4a0", glow: "rgba(92,196,160,.45)",  filter: "hue-rotate(70deg) saturate(1.05)" },
    sky:    { name: "Cielo",   ring: "#5aa6e0", glow: "rgba(90,166,224,.45)",  filter: "hue-rotate(140deg) saturate(1.05)" },
    violet: { name: "Violeta", ring: "#9a7fd0", glow: "rgba(154,127,208,.45)", filter: "hue-rotate(200deg) saturate(1.05)" },
    ember:  { name: "Brasa",   ring: "#e0834f", glow: "rgba(224,131,79,.45)",  filter: "hue-rotate(-12deg) saturate(1.25)" }
  };
  var SKIN_ORDER = ["gold", "rose", "mint", "sky", "violet", "ember"];

  /* ---- Accesorios: vestimenta SVG superpuesta sobre el gato. Cada SVG usa
         viewBox "0 0 50 50" alineado a un avatar de 50x50 (la cabeza queda en
         el tercio superior-centro). Paleta de marca (oro/navy); NO se le aplica
         el hue-rotate del color para que el accesorio conserve su tono. ---- */
  var GOLD = "#C9A84C", NAVY = "#1B1B2F";
  /* Coordenadas calibradas a la silueta de vesper_cat.png (box 50x50):
     cabeza y~8-22 centro x~26; cara/ojos y~18-26; cuello y~31-33 x~25. */
  var ACCESSORIES = {
    none: { name: "Sin accesorio", svg: "" },
    bowtie: { name: "Moño", svg:
      '<svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg"><g stroke="' + NAVY + '" stroke-width="1.4" stroke-linejoin="round">'
      + '<path d="M26 33 L17 29 V37 Z" fill="' + GOLD + '"/><path d="M26 33 L35 29 V37 Z" fill="' + GOLD + '"/>'
      + '<rect x="23.4" y="30.4" width="5.2" height="5.2" rx="1.3" fill="' + NAVY + '"/></g></svg>' },
    cap: { name: "Birrete", svg:
      '<svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg"><g stroke-linejoin="round">'
      + '<path d="M17 13 V18 Q26 22 35 18 V13" fill="' + NAVY + '"/>'
      + '<path d="M10 11 L26 5 L42 11 L26 17 Z" fill="' + NAVY + '"/>'
      + '<path d="M42 11 V19" stroke="' + GOLD + '" stroke-width="1.6"/><circle cx="42" cy="20.4" r="2" fill="' + GOLD + '"/></g></svg>' },
    glasses: { name: "Gafas", svg:
      '<svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke="' + NAVY + '" stroke-width="2.1">'
      + '<circle cx="20.5" cy="22" r="5"/><circle cx="33" cy="22" r="5"/><path d="M25.5 22 h2.5"/>'
      + '<path d="M15.5 21 l-3.2 -1.2"/><path d="M38 21 l3.2 -1.2"/></g></svg>' },
    wizard: { name: "Sombrero de mago", svg:
      '<svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg"><g stroke="' + NAVY + '" stroke-width="1.4" stroke-linejoin="round">'
      + '<path d="M26 -5 L36 15 H16 Z" fill="#3c3a6e"/><path d="M12 15 H40 V18 H12 Z" fill="#2a2850"/>'
      + '<path d="M26 3 l1.6 3.4 -1.6 3.4 -1.6 -3.4 z" fill="' + GOLD + '" stroke="none"/></g></svg>' },
    scarf: { name: "Bufanda", svg:
      '<svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg"><g stroke="' + NAVY + '" stroke-width="1.3" stroke-linejoin="round">'
      + '<path d="M16 31 Q26 37 36 31 V35 Q26 41 16 35 Z" fill="' + GOLD + '"/>'
      + '<path d="M30 34 L34 44 L29.5 44.6 L27.5 35 Z" fill="' + GOLD + '"/></g></svg>' },
    halo: { name: "Aureola", svg:
      '<svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg"><ellipse cx="26" cy="5.5" rx="11" ry="3.4" fill="none" stroke="' + GOLD + '" stroke-width="2.6"/></svg>' },
    crown: { name: "Corona", svg:
      '<svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg"><g stroke="' + NAVY + '" stroke-width="1.5" stroke-linejoin="round">'
      + '<path d="M14 14 L14 5 L20 9.5 L26 2 L32 9.5 L38 5 L38 14 Z" fill="' + GOLD + '"/>'
      + '<circle cx="26" cy="2.5" r="1.7" fill="' + NAVY + '"/></g></svg>' }
  };
  var ACCESSORY_ORDER = ["none", "bowtie", "cap", "glasses", "wizard", "scarf", "halo", "crown"];

  /* ---- Pelajes: apariencias COMPLETAS (imagen real del gato), generadas con
         IA a partir de Vesper. classic = el gato original (+ color del skin).
         Los demás reemplazan la imagen y NO reciben el tinte de color. ---- */
  var MASCOT_DIR = "assets/images/mascot/";
  var PELAJES = {
    classic: { name: "Vesper",     img: MASCOT_DIR + "vesper_cat.png" },
    gray:    { name: "Gris",       img: MASCOT_DIR + "skins/gray.png" },
    calico:  { name: "Multicolor", img: MASCOT_DIR + "skins/calico.png" },
    lion:    { name: "León",       img: MASCOT_DIR + "skins/lion.png" },
    cosmic:  { name: "Cósmico",    img: MASCOT_DIR + "skins/cosmic.png" },
    dragon:  { name: "Dragón",     img: MASCOT_DIR + "skins/dragon.png" }
  };
  var PELAJE_ORDER = ["classic", "gray", "calico", "lion", "cosmic", "dragon"];

  /* ---- helpers de color ---- */
  function clampHex(h) { return /^#([0-9a-f]{6})$/i.test(h) ? h : "#000000"; }
  function rgba(hex, a) {
    hex = clampHex(hex);
    var n = parseInt(hex.slice(1), 16);
    return "rgba(" + ((n >> 16) & 255) + "," + ((n >> 8) & 255) + "," + (n & 255) + "," + a + ")";
  }

  function read() {
    try {
      var s = JSON.parse(localStorage.getItem(STORE) || "{}");
      return {
        theme: THEMES[s.theme] ? s.theme : "classic",
        skin: SKINS[s.skin] ? s.skin : "gold",
        accessory: ACCESSORIES[s.accessory] ? s.accessory : "none",
        pelaje: PELAJES[s.pelaje] ? s.pelaje : "classic"
      };
    } catch (e) { return { theme: "classic", skin: "gold", accessory: "none", pelaje: "classic" }; }
  }
  function write(state) { try { localStorage.setItem(STORE, JSON.stringify(state)); } catch (e) {} }

  function buildVars(t, sk) {
    var tintA = t.dark ? .20 : .14;
    var v = {
      /* tokens app de lecciones */
      "--ink": t.ink, "--gold": t.gold, "--success": t.success, "--error": t.error,
      "--cream": t.cream, "--paper": t.paper, "--muted": t.muted, "--line": t.line,
      "--gold-tint": rgba(t.gold, tintA), "--ok-tint": rgba(t.success, t.dark ? .18 : .12),
      "--no-tint": rgba(t.error, t.dark ? .18 : .10),
      /* a11y: oro-texto accesible sobre la superficie del tema (oscuro en temas claros,
         claro en temas oscuros) + anillo de foco visible por tema (WCAG 1.4.3/1.4.11/2.4.7) */
      "--gold-ink": t.dark ? t.gold : "#7a5e12",
      "--focus": t.dark ? t.goldLt : "#8a6d1f",
      "--shadow": t.dark ? "0 6px 22px rgba(0,0,0,.45)" : "0 6px 22px rgba(27,27,47,.08)",
      /* tokens del sitio / onboarding */
      "--navy": t.dark ? t.paper : t.ink, "--navy2": t.dark ? t.line : "#2c2c4a",
      "--navy3": t.cream, "--text": t.ink, "--gold-lt": t.goldLt, "--gold-light": t.goldLt,
      "--gold2": t.goldDp, "--gold-deep": t.goldDp, "--white": t.paper, "--border": t.line,
      /* skin de mascota */
      "--vc-ring": sk.ring, "--vc-glow": sk.glow, "--vc-filter": sk.filter
    };
    return v;
  }

  function apply(state) {
    state = state || read();
    var t = THEMES[state.theme] || THEMES.classic;
    var sk = SKINS[state.skin] || SKINS.gold;
    var vars = buildVars(t, sk);
    var lines = [":root{"];
    for (var k in vars) lines.push(k + ":" + vars[k] + ";");
    lines.push("color-scheme:" + (t.dark ? "dark" : "light") + ";");
    lines.push("}");
    /* aplica el aro/filtro del skin a la mascota (vesper_mascot + fallback) */
    lines.push(".vc-img,.mascot-img,.fb-cat{border-color:var(--vc-ring)!important;filter:var(--vc-filter)}");
    lines.push(".vc-img{box-shadow:0 0 0 4px var(--vc-glow)}");

    var el = document.getElementById("vesper-theme-vars");
    if (!el) {
      el = document.createElement("style");
      el.id = "vesper-theme-vars";
      (document.head || document.documentElement).appendChild(el);
    }
    el.textContent = lines.join("\n");
    var root = document.documentElement;
    root.setAttribute("data-vesper-theme", state.theme);
    root.setAttribute("data-vesper-skin", state.skin);
    if (window.matchMedia) {
      var meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute("content", t.dark ? t.cream : t.ink);
    }
    api.current = state;
    try {
      window.dispatchEvent(new CustomEvent("vesper:appearance", { detail: state }));
    } catch (e) {}
  }

  /* ---------- UI: panel de eleccion ---------- */
  function injectPickerCSS() {
    if (document.getElementById("vesper-theme-css")) return;
    var css = [
      ".vt-panel{font-family:Inter,system-ui,sans-serif;color:var(--ink,#1B1B2F)}",
      ".vt-h{font-weight:700;font-size:.78rem;text-transform:uppercase;letter-spacing:.06em;color:var(--muted,#6b6b76);margin:14px 0 8px}",
      ".vt-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(96px,1fr));gap:10px}",
      ".vt-card{cursor:pointer;border:2px solid var(--line,#ece7da);border-radius:14px;padding:8px;background:var(--paper,#fff);text-align:center;transition:transform .15s ease,border-color .15s ease}",
      ".vt-card:active{transform:scale(.96)}",
      ".vt-card.on{border-color:var(--gold,#C9A84C)}",
      ".vt-sw{height:30px;border-radius:9px;margin-bottom:6px;display:flex;overflow:hidden;border:1px solid rgba(0,0,0,.08)}",
      ".vt-sw span{flex:1}",
      ".vt-nm{font-size:.78rem;font-weight:600}",
      ".vt-skins{display:flex;flex-wrap:wrap;gap:10px}",
      ".vt-skin{cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:5px;font-size:.72rem;font-weight:600;color:var(--muted,#6b6b76)}",
      ".vt-dot{width:40px;height:40px;border-radius:50%;border:3px solid #fff;box-shadow:0 0 0 2px var(--line,#ece7da);transition:box-shadow .15s ease}",
      ".vt-skin.on .vt-dot{box-shadow:0 0 0 3px var(--gold,#C9A84C)}",
      ".vt-skin.on{color:var(--ink,#1B1B2F)}",
      /* accesorios (cards con SVG) */
      ".vt-accsw{height:42px;display:flex;align-items:center;justify-content:center;margin-bottom:6px;border-radius:9px;background:var(--cream,#FBF8F1)}",
      ".vt-accsw svg{width:38px;height:38px}",
      ".vt-accsw .vt-none{color:var(--muted,#6b6b76);font-size:1.2rem}",
      /* pelajes (apariencias completas con miniatura) */
      ".vt-pelsw{height:60px;display:flex;align-items:center;justify-content:center;margin-bottom:6px;border-radius:9px;background:var(--cream,#FBF8F1);overflow:hidden}",
      ".vt-pelsw img{height:58px;width:auto;object-fit:contain}",
      /* estado bloqueado (skins y accesorios) */
      ".vt-card.locked,.vt-skin.locked{opacity:.5;cursor:not-allowed}",
      ".vt-card{position:relative}.vt-skin{position:relative}",
      ".vt-lock{position:absolute;top:3px;right:5px;font-size:.82rem;line-height:1;filter:grayscale(.2)}",
      ".vt-skin .vt-lock{top:-2px;right:-2px}",
      ".vt-note{font-size:.8rem;color:var(--muted,#6b6b76);margin:10px 0 0;min-height:1.1em}",
      /* boton flotante + modal */
      ".vt-fab{position:fixed;right:16px;bottom:16px;z-index:9998;width:52px;height:52px;border-radius:50%;border:none;cursor:pointer;background:var(--gold,#C9A84C);color:var(--ink,#1B1B2F);font-size:1.3rem;box-shadow:0 6px 18px rgba(0,0,0,.22);display:flex;align-items:center;justify-content:center}",
      ".vt-fab:active{transform:scale(.94)}",
      ".vt-modal{position:fixed;inset:0;z-index:9999;background:rgba(10,10,20,.5);display:flex;align-items:flex-end;justify-content:center;opacity:0;pointer-events:none;transition:opacity .2s ease}",
      ".vt-modal.show{opacity:1;pointer-events:auto}",
      ".vt-sheet{background:var(--cream,#FBF8F1);width:100%;max-width:520px;max-height:84vh;overflow:auto;border-radius:20px 20px 0 0;padding:18px 18px 26px;transform:translateY(20px);transition:transform .22s ease}",
      ".vt-modal.show .vt-sheet{transform:none}",
      ".vt-top{display:flex;align-items:center;justify-content:space-between;margin-bottom:4px}",
      ".vt-top h3{font-family:'Inria Serif',Georgia,serif;margin:0;font-size:1.25rem;color:var(--ink,#1B1B2F)}",
      ".vt-x{background:none;border:none;font-size:1.5rem;cursor:pointer;color:var(--muted,#6b6b76);line-height:1}",
      "@media(min-width:560px){.vt-modal{align-items:center}.vt-sheet{border-radius:20px}}"
    ].join("\n");
    var el = document.createElement("style"); el.id = "vesper-theme-css"; el.textContent = css;
    (document.head || document.documentElement).appendChild(el);
  }

  /* ¿está desbloqueado este cosmético? (consulta VESPER_COSMETICS; fail-open) */
  function unlockedFor(kind, id) {
    try { if (window.VESPER_COSMETICS && VESPER_COSMETICS.isUnlocked) return !!VESPER_COSMETICS.isUnlocked(kind, id); } catch (e) {}
    return true;
  }
  function reqLabelFor(kind, id) {
    try { if (window.VESPER_COSMETICS && VESPER_COSMETICS.reqLabel) return VESPER_COSMETICS.reqLabel(kind, id); } catch (e) {}
    return "Bloqueado";
  }

  function renderPicker() {
    injectPickerCSS();
    var cur = read();
    var themeCards = THEME_ORDER.map(function (id) {
      var t = THEMES[id];
      return '<div class="vt-card' + (cur.theme === id ? " on" : "") + '" data-theme="' + id + '">'
        + '<div class="vt-sw"><span style="background:' + t.cream + '"></span>'
        + '<span style="background:' + t.gold + '"></span>'
        + '<span style="background:' + t.ink + '"></span></div>'
        + '<div class="vt-nm">' + t.emoji + " " + t.name + '</div></div>';
    }).join("");
    var skinDots = SKIN_ORDER.map(function (id) {
      var s = SKINS[id];
      var locked = !unlockedFor("skin", id);
      return '<div class="vt-skin' + (cur.skin === id ? " on" : "") + (locked ? " locked" : "")
        + '" data-skin="' + id + '"' + (locked ? ' title="' + reqLabelFor("skin", id) + '" aria-disabled="true"' : "") + '>'
        + '<div class="vt-dot" style="background:' + s.ring + '"></div>' + s.name
        + (locked ? '<span class="vt-lock" aria-hidden="true">&#128274;</span>' : "") + '</div>';
    }).join("");
    var accCards = ACCESSORY_ORDER.map(function (id) {
      var a = ACCESSORIES[id];
      var locked = !unlockedFor("acc", id);
      var sw = a.svg || '<span class="vt-none">&#8212;</span>';
      return '<div class="vt-card' + (cur.accessory === id ? " on" : "") + (locked ? " locked" : "")
        + '" data-acc="' + id + '"' + (locked ? ' title="' + reqLabelFor("acc", id) + '" aria-disabled="true"' : "") + '>'
        + '<div class="vt-accsw">' + sw + '</div><div class="vt-nm">' + a.name + '</div>'
        + (locked ? '<span class="vt-lock" aria-hidden="true">&#128274;</span>' : "") + '</div>';
    }).join("");
    var pelCards = PELAJE_ORDER.map(function (id) {
      var p = PELAJES[id];
      var locked = !unlockedFor("pelaje", id);
      return '<div class="vt-card' + (cur.pelaje === id ? " on" : "") + (locked ? " locked" : "")
        + '" data-pelaje="' + id + '"' + (locked ? ' title="' + reqLabelFor("pelaje", id) + '" aria-disabled="true"' : "") + '>'
        + '<div class="vt-pelsw"><img src="' + p.img + '" alt="" loading="lazy"></div><div class="vt-nm">' + p.name + '</div>'
        + (locked ? '<span class="vt-lock" aria-hidden="true">&#128274;</span>' : "") + '</div>';
    }).join("");
    return '<div class="vt-panel">'
      + '<div class="vt-h">Tema de la app</div><div class="vt-grid" data-vt-themes>' + themeCards + '</div>'
      + '<div class="vt-h">Aspecto de Vesper</div><div class="vt-grid" data-vt-pelajes>' + pelCards + '</div>'
      + '<div class="vt-h">Color de Vesper</div><div class="vt-skins" data-vt-skins>' + skinDots + '</div>'
      + '<div class="vt-h">Accesorios de Vesper</div><div class="vt-grid" data-vt-accs>' + accCards + '</div>'
      + '<p class="vt-note" data-vt-note aria-live="polite"></p>'
      + '</div>';
  }

  function wirePicker(scope) {
    scope = scope || document;
    var themeBox = scope.querySelector("[data-vt-themes]");
    var skinBox = scope.querySelector("[data-vt-skins]");
    var accBox = scope.querySelector("[data-vt-accs]");
    var pelBox = scope.querySelector("[data-vt-pelajes]");
    var note = scope.querySelector("[data-vt-note]");
    function say(msg) { if (note) note.textContent = msg || ""; }
    if (themeBox) themeBox.addEventListener("click", function (e) {
      var c = e.target.closest("[data-theme]"); if (!c) return;
      api.setTheme(c.getAttribute("data-theme"));
      var on = themeBox.querySelector(".vt-card.on"); if (on) on.classList.remove("on");
      c.classList.add("on"); say("");
    });
    if (pelBox) pelBox.addEventListener("click", function (e) {
      var c = e.target.closest("[data-pelaje]"); if (!c) return;
      var id = c.getAttribute("data-pelaje");
      if (c.classList.contains("locked")) { say("Aspecto bloqueado — " + reqLabelFor("pelaje", id)); return; }
      api.setPelaje(id);
      var on = pelBox.querySelector(".vt-card.on"); if (on) on.classList.remove("on");
      c.classList.add("on"); say("");
    });
    if (skinBox) skinBox.addEventListener("click", function (e) {
      var c = e.target.closest("[data-skin]"); if (!c) return;
      var id = c.getAttribute("data-skin");
      if (c.classList.contains("locked")) { say("Color bloqueado — " + reqLabelFor("skin", id)); return; }
      api.setSkin(id);
      var on = skinBox.querySelector(".vt-skin.on"); if (on) on.classList.remove("on");
      c.classList.add("on");
      say(read().pelaje !== "classic" ? "El color se aplica al aspecto “Vesper” clásico." : "");
    });
    if (accBox) accBox.addEventListener("click", function (e) {
      var c = e.target.closest("[data-acc]"); if (!c) return;
      var id = c.getAttribute("data-acc");
      if (c.classList.contains("locked")) { say("Accesorio bloqueado — " + reqLabelFor("acc", id)); return; }
      api.setAccessory(id);
      var on = accBox.querySelector(".vt-card.on"); if (on) on.classList.remove("on");
      c.classList.add("on"); say("");
    });
  }

  /* boton flotante (paleta) que abre un panel modal */
  function mountFloat(opts) {
    opts = opts || {};
    if (document.getElementById("vt-fab")) return;
    injectPickerCSS();
    var fab = document.createElement("button");
    fab.id = "vt-fab"; fab.className = "vt-fab"; fab.type = "button";
    fab.setAttribute("aria-label", "Apariencia"); fab.innerHTML = "🎨";
    var modal = document.createElement("div");
    modal.className = "vt-modal"; modal.id = "vt-modal";
    modal.innerHTML = '<div class="vt-sheet"><div class="vt-top"><h3>Apariencia</h3>'
      + '<button class="vt-x" aria-label="Cerrar">&times;</button></div>'
      + '<p style="margin:.2em 0 .4em;color:var(--muted,#6b6b76);font-size:.9rem">Elige el modelo visual y el skin de Vesper. Se guarda en este dispositivo.</p>'
      + renderPicker() + '</div>';
    document.body.appendChild(fab); document.body.appendChild(modal);
    function open() { modal.classList.add("show"); }
    function close() { modal.classList.remove("show"); }
    fab.onclick = open;
    modal.addEventListener("click", function (e) {
      if (e.target === modal || e.target.closest(".vt-x")) close();
    });
    wirePicker(modal);
  }

  var api = {
    themes: THEMES, themeOrder: THEME_ORDER, skins: SKINS, skinOrder: SKIN_ORDER,
    accessories: ACCESSORIES, accessoryOrder: ACCESSORY_ORDER,
    pelajes: PELAJES, pelajeOrder: PELAJE_ORDER,
    current: null,
    get: read,
    apply: apply,
    setTheme: function (id) { if (!THEMES[id]) return; var s = read(); s.theme = id; write(s); apply(s); },
    setSkin: function (id) { if (!SKINS[id]) return; var s = read(); s.skin = id; write(s); apply(s); },
    setAccessory: function (id) { if (!ACCESSORIES[id]) return; var s = read(); s.accessory = id; write(s); apply(s); },
    setPelaje: function (id) { if (!PELAJES[id]) return; var s = read(); s.pelaje = id; write(s); apply(s); },
    set: function (theme, skin) { var s = read(); s.theme = theme; s.skin = skin; write(s); apply(s); },
    renderPicker: renderPicker, wirePicker: wirePicker, mountFloat: mountFloat
  };

  /* auto-aplica al cargar */
  if (typeof document !== "undefined") {
    apply(read());
  }
  return api;
})();
