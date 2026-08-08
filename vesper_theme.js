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
    /* Vespertina: la paleta de la portada. cream/paper/line son literalmente
       --va-night / --va-dusk / --va-twilight, así que el hub queda del mismo
       tono que las bandas de noche de index.html.
       OJO con goldDp: en un tema OSCURO tiene que ser más CLARO que gold, no
       más oscuro. buildVars() mapea --gold2 = goldDp sin mirar `dark`, y --gold2
       es el color de todas las micro-etiquetas en versalitas. Con el #a8843d
       "oro profundo" de los temas claros esto caería a 4.38:1 sobre paper —
       falla AA. Con #dcc173 da 8.65:1. */
    vespertina: {
      name: "Vespertina", emoji: "✦", dark: true,
      ink: "#EDE7D6", gold: "#C9A84C", goldLt: "#f3e2ab", goldDp: "#dcc173",
      success: "#41C595", error: "#E07065",
      cream: "#14122a", paper: "#1f2342", muted: "#b3b0c9", line: "#3a3a63"
    },
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
      /* gold era #2f86c5: 4.14:1 contra su propio ink, o sea un boton dorado
         con texto oscuro encima no llegaba a AA. Aclarado a 4.63:1. El oro
         de texto pequeno no sale de aqui sino de --gold-ink, que buildVars
         fija en #7a5e12 para los temas claros. */
      ink: "#10222e", gold: "#3a8fcb", goldLt: "#4f9fd6", goldDp: "#236699",
      success: "#1f9e8a", error: "#c0392b",
      /* muted era #5d7689: 4.32:1 sobre su propio cream, por debajo del 4.5
         que pide AA para texto pequeno. Oscurecido a 5.08:1. */
      cream: "#eef5fa", paper: "#ffffff", muted: "#516b7e", line: "#d8e4ee"
    },
    nebula: {
      name: "Nebulosa", emoji: "🪐", dark: true,
      /* goldDp era #8f63e0: 3.95:1 sobre su propio paper, o sea fallaba AA en
         cada micro-etiqueta que usa --gold2. Aclarado a 5.49:1. */
      ink: "#efeafb", gold: "#b58cff", goldLt: "#caaaff", goldDp: "#a482ec",
      success: "#46c79b", error: "#e0708a",
      cream: "#150f24", paper: "#221a38", muted: "#a497c4", line: "#352a52"
    }
  };
  var THEME_ORDER = ["vespertina", "classic", "midnight", "ivory", "sunset", "forest", "ocean", "nebula"];

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
         viewBox "0 0 50 50" alineado al RETRATO de Vesper (la imagen llena el
         cuadro), no a una silueta de cuerpo entero.

         GEOMETRÍA MEDIDA sobre assets/images/mascot/vesper_cat.png (512px, se
         divide por 10.24 para pasar al box de 50):
           punta de oreja izq. y=7.0 · der. y=9.8 · coronilla y=13.5
           ojo izq. centro (18.8, 23.5) · ojo der. (30.7, 24.5) · ~5 x 3.7 c/u
           barbilla y~32 · camisa/cuello blanco y=35..46 · centro de cara x~25.5

         Las coordenadas anteriores estaban calibradas a mano a otra silueta y
         no cuadraban con este arte: el moño y la bufanda iban a y~29-37 (la
         BARBILLA del gato, no el cuello) y la lente derecha a cx=33, 2,3
         unidades fuera del ojo. Ahora cada pieza va sobre el rasgo medido.

         Paleta de marca (oro/navy). NO reciben el hue-rotate del color del
         skin, para que el accesorio conserve su tono.

         Los degradados llevan id con sufijo propio ("vaG<acc>"): el selector
         pinta los 8 accesorios A LA VEZ en la misma página y unos ids
         repetidos harían que el primero se robara el relleno de los demás. */
  var GOLD = "#C9A84C", GOLD_HI = "#EFD489", GOLD_LO = "#9A7C2E", NAVY = "#1B1B2F", NAVY_HI = "#3A3A5E";

  function grad(id, x1, y1, x2, y2, stops) {
    var s = "";
    for (var i = 0; i < stops.length; i++) s += '<stop offset="' + stops[i][0] + '" stop-color="' + stops[i][1] + '"/>';
    return '<linearGradient id="' + id + '" x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2
      + '" gradientUnits="userSpaceOnUse">' + s + '</linearGradient>';
  }
  /* overflow visible: el gorro de mago y la corona salen del box a propósito */
  function accSvg(inner) {
    return '<svg viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" fill="none" style="overflow:visible">' + inner + '</svg>';
  }

  var ACCESSORIES = {
    none: { name: "Sin accesorio", svg: "" },

    /* Moño — al cuello de la camisa (y 37-45), no a la barbilla */
    bowtie: { name: "Moño", svg: accSvg(
      '<defs>' + grad("vaGbt", 25, 36, 25, 45, [[0, GOLD_HI], [.55, GOLD], [1, GOLD_LO]]) + '</defs>'
      + '<g stroke="' + NAVY + '" stroke-width="1.15" stroke-linejoin="round">'
      + '<path d="M25.4 40.6c-3.8-2.8-6.5-4-8.7-4.2-.6 2.1-.6 6.4 0 8.5 2.2-.2 4.9-1.5 8.7-4.3z" fill="url(#vaGbt)"/>'
      + '<path d="M25.4 40.6c3.8-2.8 6.5-4 8.7-4.2.6 2.1.6 6.4 0 8.5-2.2-.2-4.9-1.5-8.7-4.3z" fill="url(#vaGbt)"/>'
      + '<rect x="23" y="38" width="4.8" height="5.2" rx="1.5" fill="' + NAVY + '"/></g>'
      + '<g stroke="rgba(255,255,255,.5)" stroke-width=".8" stroke-linecap="round">'
      + '<path d="M21.6 39.2c-1.5.3-2.8.7-3.9 1.2"/><path d="M29.2 39.2c1.5.3 2.8.7 3.9 1.2"/></g>'
      + '<path class="vacc-shine" d="M24 39.4h2.8" stroke="rgba(255,255,255,.55)" stroke-width=".9" stroke-linecap="round"/>'
    ) },

    /* Birrete — copa ceñida a la coronilla (y 13.5) + tabla y borla */
    cap: { name: "Birrete", svg: accSvg(
      '<defs>' + grad("vaGcpB", 26, 12, 26, 19, [[0, NAVY_HI], [1, NAVY]])
      + grad("vaGcpT", 10, 5, 42, 17, [[0, "#4A4A78"], [.5, "#33335A"], [1, "#23233F"]])
      + grad("vaGcpG", 26, 11, 26, 23, [[0, GOLD_HI], [1, GOLD_LO]]) + '</defs>'
      + '<path d="M17.4 12.6v5c5.7 3.4 11.4 3.4 17.2 0v-5z" fill="url(#vaGcpB)" stroke="' + NAVY + '" stroke-width="1"/>'
      + '<path d="M10 11.2 26 5l16 6.2L26 17.4z" fill="url(#vaGcpT)" stroke="' + NAVY + '" stroke-width="1" stroke-linejoin="round"/>'
      + '<path d="M10 11.2 26 5l16 6.2" stroke="rgba(255,255,255,.3)" stroke-width=".85" stroke-linejoin="round"/>'
      + '<g class="vacc-tassel">'
      + '<path d="M41.6 11.5c.7 3.5.3 6.4-1.2 8.7" stroke="url(#vaGcpG)" stroke-width="1.5" stroke-linecap="round"/>'
      + '<circle cx="40.2" cy="21.4" r="2.1" fill="url(#vaGcpG)" stroke="' + GOLD_LO + '" stroke-width=".55"/></g>'
    ) },

    /* Gafas — lentes centradas en los ojos MEDIDOS, con su ligera inclinación */
    glasses: { name: "Gafas", svg: accSvg(
      '<defs>' + grad("vaGgl", 15, 19, 35, 29, [[0, "rgba(255,255,255,.32)"], [1, "rgba(255,255,255,.05)"]]) + '</defs>'
      + '<circle cx="18.8" cy="23.5" r="5" fill="url(#vaGgl)"/>'
      + '<circle cx="30.7" cy="24.5" r="5" fill="url(#vaGgl)"/>'
      + '<g stroke="' + NAVY + '" stroke-width="1.9" stroke-linecap="round">'
      + '<circle cx="18.8" cy="23.5" r="5"/><circle cx="30.7" cy="24.5" r="5"/>'
      + '<path d="M23.8 23.7c.7-.5 1.5-.4 2 .2"/>'
      + '<path d="M13.9 22.2 10.2 20.7"/><path d="M35.7 23.4l3.8-1.2"/></g>'
      + '<g stroke="rgba(255,255,255,.8)" stroke-width="1.05" stroke-linecap="round">'
      + '<path class="vacc-shine" d="M16.4 21.3c.7-.7 1.5-1.1 2.4-1.2"/>'
      + '<path class="vacc-shine d2" d="M28.3 22.3c.7-.7 1.5-1.1 2.4-1.2"/></g>'
    ) },

    /* Sombrero de mago — ala apoyada en la coronilla, cono con caída */
    wizard: { name: "Sombrero de mago", svg: accSvg(
      '<defs>' + grad("vaGwzC", 18, 0, 34, 16, [[0, "#4A4788"], [.55, "#332F63"], [1, "#221F45"]])
      + grad("vaGwzB", 11, 13, 41, 19, [[0, "#332F63"], [.5, "#403B76"], [1, "#221F45"]]) + '</defs>'
      + '<path d="M27-2.4c-.6 5.9 1.4 12.4 4.8 17.6-4 1.6-9.2 1.6-13.2 0C22 10 24.8 4 27-2.4z" fill="url(#vaGwzC)" stroke="' + NAVY + '" stroke-width="1" stroke-linejoin="round"/>'
      + '<path d="M11.6 15.4c0-1.8 6.4-3.2 14.4-3.2s14.4 1.4 14.4 3.2-6.4 3.6-14.4 3.6-14.4-1.8-14.4-3.6z" fill="url(#vaGwzB)" stroke="' + NAVY + '" stroke-width="1"/>'
      + '<path d="M19.2 13.4c4.5 1 9.3 1 13.8 0" stroke="' + GOLD + '" stroke-width="1.5" stroke-linecap="round"/>'
      + '<path class="vacc-twinkle" d="M27 4.2l.9 2 2 .9-2 .9-.9 2-.9-2-2-.9 2-.9z" fill="' + GOLD_HI + '"/>'
      + '<path class="vacc-twinkle d2" d="M23.2 9.6l.6 1.3 1.3.6-1.3.6-.6 1.3-.6-1.3-1.3-.6 1.3-.6z" fill="' + GOLD + '"/>'
    ) },

    /* Bufanda — vuelta sobre los hombros (y 36-44) + caída que se balancea */
    scarf: { name: "Bufanda", svg: accSvg(
      '<defs>' + grad("vaGsf", 15, 36, 35, 47, [[0, GOLD_HI], [.5, GOLD], [1, GOLD_LO]]) + '</defs>'
      + '<path d="M15.4 36.4c6.6 4.7 13.4 4.7 20 0v4.6c-6.6 4.7-13.4 4.7-20 0z" fill="url(#vaGsf)" stroke="' + NAVY + '" stroke-width="1.1" stroke-linejoin="round"/>'
      + '<g class="vacc-sway"><path d="M29.2 40.6 34.8 50.4h-5.4l-3.2-9.2z" fill="url(#vaGsf)" stroke="' + NAVY + '" stroke-width="1.1" stroke-linejoin="round"/></g>'
      + '<g stroke="rgba(27,27,47,.3)" stroke-width=".7" stroke-linecap="round">'
      + '<path d="M19 38.3v3.9"/><path d="M23 39.5v4"/><path d="M27.4 39.5v4"/><path d="M31.6 38.3v3.9"/></g>'
    ) },

    /* Aureola — flotando sobre las orejas (punta más alta y=7) */
    halo: { name: "Aureola", svg: accSvg(
      '<defs><radialGradient id="vaGhlA" cx="26" cy="4" r="13" gradientUnits="userSpaceOnUse">'
      + '<stop offset=".5" stop-color="rgba(239,212,137,0)"/><stop offset="1" stop-color="rgba(239,212,137,.45)"/></radialGradient>'
      + grad("vaGhlR", 15, 4, 37, 6, [[0, GOLD_LO], [.5, GOLD_HI], [1, GOLD_LO]]) + '</defs>'
      + '<g class="vacc-halo">'
      + '<ellipse cx="26" cy="4" rx="12.6" ry="4.2" fill="url(#vaGhlA)"/>'
      + '<ellipse cx="26" cy="4" rx="10.6" ry="3.2" stroke="url(#vaGhlR)" stroke-width="2.5"/>'
      + '<ellipse cx="26" cy="3.5" rx="10.6" ry="3.2" stroke="rgba(255,255,255,.42)" stroke-width=".75"/></g>'
    ) },

    /* Corona — apoyada entre las orejas, sobre la coronilla (y 13.5) */
    crown: { name: "Corona", svg: accSvg(
      '<defs>' + grad("vaGcr", 26, 2, 26, 16, [[0, GOLD_HI], [.5, GOLD], [1, GOLD_LO]]) + '</defs>'
      + '<g stroke="' + NAVY + '" stroke-width="1.15" stroke-linejoin="round">'
      + '<path d="M15.4 11.4V4.2l5.3 4.4L26 2.2l5.3 6.4 5.3-4.4v7.2c-7 1.8-14.2 1.8-21.2 0z" fill="url(#vaGcr)"/>'
      + '<path d="M15.4 11.2c7 2.1 14.2 2.1 21.2 0v3.5c-7 2.1-14.2 2.1-21.2 0z" fill="url(#vaGcr)"/></g>'
      + '<g fill="' + NAVY + '"><circle cx="26" cy="2" r="1.5"/><circle cx="15.4" cy="4" r="1.1"/><circle cx="36.6" cy="4" r="1.1"/></g>'
      + '<g class="vacc-shine" fill="rgba(255,255,255,.6)">'
      + '<circle cx="21.2" cy="12.6" r=".9"/><circle cx="26" cy="13.1" r="1"/><circle cx="30.8" cy="12.6" r=".9"/></g>'
    ) }
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

  /* ---- Accesorios HORNEADOS en el modelo ----------------------------------
     Cada combinación pelaje + accesorio tiene su PROPIA imagen, con el
     accesorio dibujado sobre ese pelaje concreto: la corona se apoya dentro
     de la melena del león, el birrete esquiva los cuernos del dragón y la
     patilla de las gafas pasa por detrás de la oreja. Antes se superponía el
     SVG sobre el PNG del gato y, hiciera lo que hiciera con las coordenadas,
     siempre se leía como una calcomanía encima: el sombrero flotaba sobre la
     melena en vez de hundirse en ella.

     Existen los 42 archivos (6 pelajes x 7 accesorios) en
     assets/images/mascot/skins/<pelaje>_<accesorio>.png. El SVG de
     ACCESSORIES queda como ICONO y como respaldo si algún día falta uno. */
  function bakedSrc(pelaje, acc) {
    if (!acc || acc === "none") return null;
    if (!PELAJES[pelaje] || !ACCESSORIES[acc]) return null;
    return MASCOT_DIR + "skins/" + pelaje + "_" + acc + ".png";
  }

  /* Qué hay que pintar para una combinación. Devuelve una sola imagen cuando
     está horneada; si no, la del pelaje y el SVG para superponer.
     `tint`: sólo el gato original recibe el tinte de color (--vc-filter);
     los pelajes de animal traen sus propios colores. */
  function look(pelaje, acc) {
    pelaje = PELAJES[pelaje] ? pelaje : "classic";
    acc = ACCESSORIES[acc] ? acc : "none";
    var baked = bakedSrc(pelaje, acc);
    return {
      img: baked || PELAJES[pelaje].img,
      fallback: PELAJES[pelaje].img,
      svg: baked ? "" : ((ACCESSORIES[acc] && ACCESSORIES[acc].svg) || ""),
      baked: !!baked,
      pelaje: pelaje,
      accessory: acc,
      tint: pelaje === "classic"
    };
  }

  /* ---- helpers de color ---- */
  function clampHex(h) { return /^#([0-9a-f]{6})$/i.test(h) ? h : "#000000"; }
  function rgba(hex, a) {
    hex = clampHex(hex);
    var n = parseInt(hex.slice(1), 16);
    return "rgba(" + ((n >> 16) & 255) + "," + ((n >> 8) & 255) + "," + (n & 255) + "," + a + ")";
  }

  /* Tema por omisión. Es "vespertina" para que el alumno que nunca eligió tema
     vea la misma identidad de noche que la portada. read() NO persiste, así que
     esto sólo alcanza a quien no ha tocado el selector: el que ya escogió
     "Clasico Oro" (o cualquier otro) lo conserva. */
  var DEFAULT_THEME = "vespertina";

  /* ---- Migración de una sola vez al estrenar "vespertina" ----
     El problema: `theme:"classic"` guardado NO prueba que alguien eligiera
     "Clasico Oro". read() no persiste nunca, pero setSkin/setAccessory/setPelaje
     hacen write(read()), o sea que quien sólo cambió el PELAJE de su gato se
     llevó `theme:"classic"` de propina, sin haber tocado el selector de temas.
     Esos son los que hay que mover: para ellos "classic" era el predeterminado
     viejo, no una preferencia.
     Regla, deliberadamente estrecha:
       · sin marca de migración Y theme === "classic"  -> pasa a vespertina
       · cualquier otro tema guardado (medianoche, marfil, oceano…) -> intacto,
         eso sí fue una elección explícita
     Se estampa `v` para que no vuelva a correr, así que quien reelija "Clasico
     Oro" después de esto lo conserva para siempre. */
  var STATE_V = 2;

  function migrate(s) {
    if (!s || s.v >= STATE_V) return s;
    if (s.theme === "classic") s.theme = DEFAULT_THEME;
    s.v = STATE_V;
    try { localStorage.setItem(STORE, JSON.stringify(s)); } catch (e) {}
    return s;
  }

  function read() {
    try {
      var raw = localStorage.getItem(STORE);
      var s = JSON.parse(raw || "{}");
      /* Sólo migramos si ya HABÍA algo guardado: sin nada, el default ya manda. */
      if (raw) s = migrate(s);
      return {
        theme: THEMES[s.theme] ? s.theme : DEFAULT_THEME,
        skin: SKINS[s.skin] ? s.skin : "gold",
        accessory: ACCESSORIES[s.accessory] ? s.accessory : "none",
        pelaje: PELAJES[s.pelaje] ? s.pelaje : "classic",
        v: STATE_V
      };
    } catch (e) { return { theme: DEFAULT_THEME, skin: "gold", accessory: "none", pelaje: "classic", v: STATE_V }; }
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
      /* Texto/glifo SOBRE una superficie de oro. Oscuro en los dos modos:
         --ink no vale, porque en tema oscuro es claro y claro-sobre-oro da
         ~1.8:1. En tema oscuro el tono mas oscuro del tema es su cream. */
      "--on-gold": t.dark ? t.cream : t.ink,
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
    var t = THEMES[state.theme] || THEMES[DEFAULT_THEME];
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
    /* Señal claro/oscuro para CSS que no puede leer `dark` del tema. La usa
       `.va-display` en vesper_tokens.css: un didone necesita eje óptico bajo y
       más peso sobre fondo claro, y lo contrario sobre fondo oscuro. */
    if (root.classList) root.classList[t.dark ? "add" : "remove"]("vesper-dark");
    if (window.matchMedia) {
      var meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute("content", t.dark ? t.cream : t.ink);
    }
    api.current = state;
    try {
      window.dispatchEvent(new CustomEvent("vesper:appearance", { detail: state }));
    } catch (e) {}
  }

  /* ---------- animación de los accesorios ----------
     Va en su propia hoja SIEMPRE inyectada (no sólo con el selector): los
     accesorios se pintan también sobre el gato del mapa en leccion.html, y
     ahí nadie llama a injectPickerCSS. Sólo se animan opacity/transform.
     transform-box:fill-box es obligatorio — sin él, transform-origin en un
     nodo SVG se resuelve contra el viewport del <svg> y la pieza sale
     volando en vez de girar sobre su propio anclaje. */
  function injectAccCSS() {
    if (typeof document === "undefined" || document.getElementById("vesper-acc-css")) return;
    var css = [
      ".vacc-shine{animation:vacc-shine 3.4s ease-in-out infinite}",
      ".vacc-shine.d2{animation-delay:1.2s}",
      "@keyframes vacc-shine{0%,100%{opacity:.32}50%{opacity:1}}",
      ".vacc-halo{transform-box:fill-box;transform-origin:50% 50%;animation:vacc-halo 4.2s ease-in-out infinite}",
      "@keyframes vacc-halo{0%,100%{transform:translateY(.5px);opacity:.9}50%{transform:translateY(-1.1px);opacity:1}}",
      ".vacc-sway{transform-box:fill-box;transform-origin:45% 0%;animation:vacc-sway 3.8s ease-in-out infinite}",
      ".vacc-tassel{transform-box:fill-box;transform-origin:92% 4%;animation:vacc-sway 3.2s ease-in-out infinite}",
      "@keyframes vacc-sway{0%,100%{transform:rotate(-3.5deg)}50%{transform:rotate(3.5deg)}}",
      ".vacc-twinkle{transform-box:fill-box;transform-origin:50% 50%;animation:vacc-twinkle 2.6s ease-in-out infinite}",
      ".vacc-twinkle.d2{animation-delay:1.1s}",
      "@keyframes vacc-twinkle{0%,100%{opacity:.35;transform:scale(.8)}50%{opacity:1;transform:scale(1.15)}}",
      "@media(prefers-reduced-motion:reduce){.vacc-shine,.vacc-halo,.vacc-sway,.vacc-tassel,.vacc-twinkle{animation:none}}",
      ".vesper-reduce-motion .vacc-shine,.vesper-reduce-motion .vacc-halo,.vesper-reduce-motion .vacc-sway,"
        + ".vesper-reduce-motion .vacc-tassel,.vesper-reduce-motion .vacc-twinkle{animation:none}"
    ].join("\n");
    var el = document.createElement("style"); el.id = "vesper-acc-css"; el.textContent = css;
    (document.head || document.documentElement).appendChild(el);
  }

  /* Vista previa de un accesorio PUESTO sobre Vesper.
     Antes el selector pintaba el SVG suelto en un cuadro crema: como las
     piezas están calibradas a la cabeza del gato (el moño va a y=40 de 50),
     suelto se veía descentrado o cortado y no se entendía qué eras. Con el
     retrato debajo se ve exactamente lo que te vas a poner. Usa el pelaje
     activo para que la prueba sea la de tu gato. */
  function accessoryPreview(id) {
    var st = read();
    var lk = look(st.pelaje, id);
    return '<span class="vt-accfig"><img src="' + lk.img + '" alt="" loading="lazy"'
      + (lk.tint ? ' class="vt-tint"' : "") + '>' + lk.svg + '</span>';
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
      /* accesorios: se previsualizan PUESTOS sobre el retrato de Vesper.
         Fondo navy (el gato es PNG con alpha) para que el oro se lea. */
      ".vt-accsw{position:relative;height:70px;display:flex;align-items:center;justify-content:center;margin-bottom:6px;"
        + "border-radius:9px;background:radial-gradient(115% 100% at 50% 4%,#2f2f52,#1B1B2F);overflow:hidden}",
      ".vt-accfig{position:relative;display:block;width:64px;height:64px}",
      ".vt-accfig img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain}",
      ".vt-accfig img.vt-tint{filter:var(--vc-filter,none)}",
      ".vt-accfig svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible;"
        + "filter:drop-shadow(0 1px 1px rgba(10,9,24,.55))}",
      ".vt-card.on .vt-accsw{box-shadow:inset 0 0 0 1px var(--gold,#C9A84C)}",
      ".vt-accsw .vt-none{color:rgba(237,231,214,.7);font-size:1.2rem}",
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
      ".vt-fab{position:fixed;right:16px;bottom:16px;z-index:9998;width:52px;height:52px;border-radius:50%;border:none;cursor:pointer;background:var(--gold,#C9A84C);color:var(--on-gold,#1B1B2F);font-size:1.3rem;box-shadow:0 6px 18px rgba(0,0,0,.22);display:flex;align-items:center;justify-content:center}",
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
      var sw = accessoryPreview(id);
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
    /* las miniaturas de accesorio llevan el gato DEBAJO: si cambias de
       aspecto (pelaje) hay que repintarlas o seguirían probándose sobre el
       gato anterior. */
    function refreshAccPreviews() {
      if (!accBox) return;
      var cards = accBox.querySelectorAll("[data-acc]");
      for (var i = 0; i < cards.length; i++) {
        var sw = cards[i].querySelector(".vt-accsw");
        if (sw) sw.innerHTML = accessoryPreview(cards[i].getAttribute("data-acc"));
      }
    }
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
      c.classList.add("on"); say(""); refreshAccPreviews();
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
    accessoryPreview: accessoryPreview,
    look: look, bakedSrc: bakedSrc,
    renderPicker: renderPicker, wirePicker: wirePicker, mountFloat: mountFloat
  };

  /* auto-aplica al cargar. injectAccCSS va aquí (y no en injectPickerCSS)
     porque el mapa de leccion.html pinta el accesorio sin abrir el selector. */
  if (typeof document !== "undefined") {
    injectAccCSS();
    apply(read());
  }
  return api;
})();
