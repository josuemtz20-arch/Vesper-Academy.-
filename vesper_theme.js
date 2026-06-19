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
    gold:   { name: "Dorado",  ring: "#C9A84C", glow: "rgba(201,168,76,.45)",  filter: "none" },
    rose:   { name: "Rosa",    ring: "#dd8aa9", glow: "rgba(221,138,169,.45)", filter: "hue-rotate(-35deg) saturate(1.05)" },
    mint:   { name: "Menta",   ring: "#5cc4a0", glow: "rgba(92,196,160,.45)",  filter: "hue-rotate(70deg) saturate(1.05)" },
    sky:    { name: "Cielo",   ring: "#5aa6e0", glow: "rgba(90,166,224,.45)",  filter: "hue-rotate(140deg) saturate(1.05)" },
    violet: { name: "Violeta", ring: "#9a7fd0", glow: "rgba(154,127,208,.45)", filter: "hue-rotate(200deg) saturate(1.05)" },
    ember:  { name: "Brasa",   ring: "#e0834f", glow: "rgba(224,131,79,.45)",  filter: "hue-rotate(-12deg) saturate(1.25)" }
  };
  var SKIN_ORDER = ["gold", "rose", "mint", "sky", "violet", "ember"];

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
      return { theme: THEMES[s.theme] ? s.theme : "classic", skin: SKINS[s.skin] ? s.skin : "gold" };
    } catch (e) { return { theme: "classic", skin: "gold" }; }
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
      return '<div class="vt-skin' + (cur.skin === id ? " on" : "") + '" data-skin="' + id + '">'
        + '<div class="vt-dot" style="background:' + s.ring + '"></div>' + s.name + '</div>';
    }).join("");
    return '<div class="vt-panel">'
      + '<div class="vt-h">Tema de la app</div><div class="vt-grid" data-vt-themes>' + themeCards + '</div>'
      + '<div class="vt-h">Skin de Vesper</div><div class="vt-skins" data-vt-skins>' + skinDots + '</div>'
      + '</div>';
  }

  function wirePicker(scope) {
    scope = scope || document;
    var themeBox = scope.querySelector("[data-vt-themes]");
    var skinBox = scope.querySelector("[data-vt-skins]");
    if (themeBox) themeBox.addEventListener("click", function (e) {
      var c = e.target.closest("[data-theme]"); if (!c) return;
      api.setTheme(c.getAttribute("data-theme"));
      var on = themeBox.querySelector(".vt-card.on"); if (on) on.classList.remove("on");
      c.classList.add("on");
    });
    if (skinBox) skinBox.addEventListener("click", function (e) {
      var c = e.target.closest("[data-skin]"); if (!c) return;
      api.setSkin(c.getAttribute("data-skin"));
      var on = skinBox.querySelector(".vt-skin.on"); if (on) on.classList.remove("on");
      c.classList.add("on");
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
    current: null,
    get: read,
    apply: apply,
    setTheme: function (id) { if (!THEMES[id]) return; var s = read(); s.theme = id; write(s); apply(s); },
    setSkin: function (id) { if (!SKINS[id]) return; var s = read(); s.skin = id; write(s); apply(s); },
    set: function (theme, skin) { var s = { theme: theme, skin: skin }; write(s); apply(s); },
    renderPicker: renderPicker, wirePicker: wirePicker, mountFloat: mountFloat
  };

  /* auto-aplica al cargar */
  if (typeof document !== "undefined") {
    apply(read());
  }
  return api;
})();
