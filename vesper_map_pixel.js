/* ============================================================
   VESPER · MAPA PIXEL (2026-11-02)
   ------------------------------------------------------------
   Segunda piel del mapa de leccion.html: la de un juego de
   estrategia en pixel art (pasto en mosaico, camino de tierra,
   placas de nodo con canto), pero con la vida de Vesper: es de
   tarde, los faroles y las ventanas están encendidos, el camino
   andado se vuelve de oro con las huellas del gato, y el gato y
   los guardianes son los de siempre, pixelados en vivo desde su
   retrato (así cualquier pelaje o accesorio sale también en pixel).

   Todo se dibuja aquí, en código: cero imágenes nuevas. Una sola
   escala para todo el mundo: 1 pixel lógico = PX (3) pixeles CSS.

   Es OPCIONAL (decisión del dueño, 2026-11-02): el mapa base es el
   ilustrado (vesper_map_illus.js). Se elige en configuracion.html
   (Estilo del mapa) o con ?mapa=pixel; se recuerda en localStorage
   "vesper_map_style". leccion_app.js pregunta on().
   ============================================================ */
window.VESPER_MAPPX = (function () {
  "use strict";
  var PX = 3, KEY = "vesper_map_style";

  function on() {
    /* estilo Minimalista (vesper_style.js): el mapa va sin decorado, sobre la
       piel base en CSS, que vesper_minimal.css aplana */
    if (document.documentElement.getAttribute("data-vesper-style") === "minimal") return false;
    try {
      var q = /[?&]mapa=(pixel|grabado|ilustrado)\b/.exec(location.search);
      if (q) localStorage.setItem(KEY, q[1]);
      /* opcional: sólo quien lo elige en Configuración > Vestir a Vesper >
         Estilo del mapa (el base es el ilustrado) */
      return localStorage.getItem(KEY) === "pixel";
    } catch (e) { return false; }
  }

  /* ---------- color ---------- */
  function hex(c) {
    c = String(c || "").trim();
    var m = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(c);
    if (m) {
      var h = m[1]; if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
      return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16), 255];
    }
    m = /rgba?\(([^)]+)\)/.exec(c);
    if (m) {
      var p = m[1].split(/[ ,/]+/).filter(Boolean).map(parseFloat);
      return [p[0] | 0, p[1] | 0, p[2] | 0, p.length > 3 ? Math.round(p[3] * 255) : 255];
    }
    return [201, 168, 76, 255];
  }
  function mix(a, b, t) { return [Math.round(a[0] + (b[0] - a[0]) * t), Math.round(a[1] + (b[1] - a[1]) * t), Math.round(a[2] + (b[2] - a[2]) * t), 255]; }
  function css(c) { return c[3] === 255 ? "rgb(" + c[0] + "," + c[1] + "," + c[2] + ")" : "rgba(" + c[0] + "," + c[1] + "," + c[2] + "," + (c[3] / 255).toFixed(2) + ")"; }
  function rootVar(name, fb) {
    try { var v = getComputedStyle(document.documentElement).getPropertyValue(name); return v && v.trim() ? v.trim() : fb; } catch (e) { return fb; }
  }
  /* determinista: el mapa no "baila" entre re-pintados */
  function h2(x, y, s) { var n = Math.sin(x * 127.1 + y * 311.7 + (s || 0) * 74.7) * 43758.5453; return n - Math.floor(n); }

  var INK = hex("#14122a"), WHITE = [255, 255, 255, 255], BLACK = [0, 0, 0, 255];
  function gold() { return hex(rootVar("--gold", "#C9A84C")); }

  /* ---------- paletas de cada mundo ----------
     grass/dark/light = suelo; road* = la tierra del camino; l/L/k = follaje;
     r/R/h = tejados y estandartes (el acento del mundo); a/A = cristales. */
  var WORLD = {
    A1: { kind: "grass", base: "#3f5a3c", dark: "#30472f", light: "#53704a", tuft: "#62804f", flowers: ["#f0b45a", "#f5f2eb", "#e88a4a"],
          road: "#c9a26a", roadDark: "#a07a48", roadEdge: "#6e4e2c", roadLight: "#e2c48e",
          l: "#4f7a43", L: "#355a33", k: "#79a35a", r: "#b8643a", R: "#8a4426", h: "#d9895a" },
    A2: { kind: "grass", base: "#2f5236", dark: "#23412b", light: "#3f6a44", tuft: "#4e7f4c", flowers: ["#f5f2eb", "#e0574f", "#f0d264"],
          road: "#b58c5a", roadDark: "#8f6a3f", roadEdge: "#5a3f24", roadLight: "#d1ab78",
          l: "#3e7a45", L: "#28552f", k: "#66a05a", r: "#7a5a3a", R: "#5a3f26", h: "#a07a50" },
    B1: { kind: "stone", base: "#43546c", dark: "#34435a", light: "#55688a", tuft: "#4f7a5a", flowers: ["#9fd0f0", "#f5f2eb"],
          road: "#b9c2cf", roadDark: "#939eaf", roadEdge: "#4a5468", roadLight: "#dde3ea",
          l: "#4a7a58", L: "#33573f", k: "#6e9f72", r: "#3d86b0", R: "#2b607f", h: "#6fb0d6" },
    B2: { kind: "rock", base: "#5a4d3e", dark: "#473c30", light: "#6e5f4c", tuft: "#7b6a50", flowers: ["#e8c47a", "#c98a4a"],
          road: "#cfab74", roadDark: "#a8875a", roadEdge: "#5e4a30", roadLight: "#e6c994",
          l: "#5a6e44", L: "#3f4e30", k: "#7d9158", r: "#a8762e", R: "#7a5520", h: "#d29c4e" },
    C1: { kind: "night", base: "#262046", dark: "#1d1838", light: "#332b5c", tuft: "#3d3470", flowers: ["#f3e2ab", "#ffffff", "#b9a8ff"],
          road: "#8a7fd0", roadDark: "#6a5fb0", roadEdge: "#2e2660", roadLight: "#bfb6ff",
          l: "#5a4fa0", L: "#3e3578", k: "#8277c8", r: "#6a5fa8", R: "#4c4383", h: "#9a8fd8" },
    C2: { kind: "grass", base: "#234a46", dark: "#1a3a37", light: "#2f5e58", tuft: "#3b766c", flowers: ["#9ff0d8", "#f3e2ab", "#f5f2eb"],
          road: "#cdb98a", roadDark: "#a8946a", roadEdge: "#4a4026", roadLight: "#e6d6a8",
          l: "#3f8a74", L: "#2a6152", k: "#62b096", r: "#3fa08a", R: "#2b7061", h: "#78d0b8" }
  };
  function pal(lv) { return WORLD[lv] || WORLD.A1; }

  /* ---------- lienzo ---------- */
  function canvas(w, h) { var c = document.createElement("canvas"); c.width = w; c.height = h; return c; }
  function put(img, w, x, y, c) {
    if (x < 0 || y < 0 || x >= w) return;
    var i = (y * w + x) * 4; if (i < 0 || i + 3 >= img.data.length) return;
    var a = (c[3] == null ? 255 : c[3]) / 255;
    if (a >= 1) { img.data[i] = c[0]; img.data[i + 1] = c[1]; img.data[i + 2] = c[2]; img.data[i + 3] = 255; return; }
    img.data[i] = Math.round(img.data[i] * (1 - a) + c[0] * a);
    img.data[i + 1] = Math.round(img.data[i + 1] * (1 - a) + c[1] * a);
    img.data[i + 2] = Math.round(img.data[i + 2] * (1 - a) + c[2] * a);
    img.data[i + 3] = Math.max(img.data[i + 3], Math.round(a * 255));
  }

  /* ---------- suelo en mosaico (64x64 lógicos, se repite sin costura) ---------- */
  var _ground = {};
  function groundUrl(lv) {
    if (_ground[lv]) return _ground[lv];
    var P = pal(lv), N = 64, cv = canvas(N, N), cx = cv.getContext("2d"), im = cx.createImageData(N, N);
    var base = hex(P.base), dark = hex(P.dark), light = hex(P.light), tuft = hex(P.tuft);
    var x, y, r, s = lv.charCodeAt(0) * 7 + lv.charCodeAt(1);
    function W(x, y, c) { put(im, N, ((x % N) + N) % N, ((y % N) + N) % N, c); }
    for (y = 0; y < N; y++) for (x = 0; x < N; x++) {
      r = h2(x, y, s);
      W(x, y, r < 0.10 ? dark : (r > 0.955 ? light : base));
    }
    var i, k;
    if (P.kind === "stone") {
      /* plaza empedrada: losas de 8x6 a tresbolillo, con musgo en las juntas */
      for (y = 0; y < N; y++) for (x = 0; x < N; x++) {
        var row = Math.floor(y / 6), off = (row % 2) * 4, cxl = (x + off) % 8, cyl = y % 6;
        if (cxl === 0 || cyl === 0) W(x, y, h2(x, y, s + 3) < 0.18 ? tuft : dark);
        else if (cxl === 1 && cyl === 1) W(x, y, light);
        else { var tone = h2(Math.floor((x + off) / 8), row, s + 9); if (tone < 0.3) W(x, y, mix(base, dark, 0.35)); else if (tone > 0.8) W(x, y, mix(base, light, 0.4)); }
      }
    } else if (P.kind === "night") {
      /* el firmamento: el suelo ES el cielo, con estrellas y alguna cruz */
      for (i = 0; i < 26; i++) {
        x = Math.floor(h2(i, 1, s) * N); y = Math.floor(h2(i, 2, s) * N);
        W(x, y, h2(i, 3, s) < 0.5 ? hex(P.flowers[0]) : mix(light, WHITE, 0.4));
        if (i % 7 === 0) { var st = hex(P.flowers[1]); W(x - 1, y, st); W(x + 1, y, st); W(x, y - 1, st); W(x, y + 1, st); W(x, y, WHITE); }
      }
    } else if (P.kind === "rock") {
      /* ladera: grietas y guijarros */
      for (i = 0; i < 14; i++) {
        x = Math.floor(h2(i, 4, s) * N); y = Math.floor(h2(i, 5, s) * N);
        var len = 3 + Math.floor(h2(i, 6, s) * 5);
        for (k = 0; k < len; k++) W(x + k, y + (h2(i, k, s) < 0.4 ? 1 : 0) * (k % 2), dark);
      }
      for (i = 0; i < 18; i++) {
        x = Math.floor(h2(i, 7, s) * N); y = Math.floor(h2(i, 8, s) * N);
        W(x, y, light); W(x + 1, y, light); W(x, y + 1, dark); W(x + 1, y + 1, dark);
      }
    }
    if (P.kind !== "night") {
      /* matas de pasto en "v" (luz arriba-izquierda, como todo el mundo) */
      var nT = P.kind === "grass" ? 34 : 10;
      for (i = 0; i < nT; i++) {
        x = Math.floor(h2(i, 9, s) * N); y = Math.floor(h2(i, 10, s) * N);
        W(x, y, tuft); W(x + 2, y, tuft); W(x + 1, y + 1, tuft); W(x, y + 1, dark); W(x + 2, y + 1, dark);
      }
      /* flores sueltas: pocas, para que el camino siga siendo lo que se lee */
      /* casi todas de un pixel y en tono apagado; sólo una de cada cuatro
         es una flor entera en cruz (si no, el pasto parecía nevado) */
      var nF = P.kind === "grass" ? 7 : 3;
      for (i = 0; i < nF; i++) {
        x = Math.floor(h2(i, 11, s) * N); y = Math.floor(h2(i, 12, s) * N);
        var fc = mix(hex(P.flowers[i % P.flowers.length]), base, 0.28);
        if (i % 4 === 0) { W(x, y - 1, fc); W(x - 1, y, fc); W(x + 1, y, fc); W(x, y + 1, fc); W(x, y, mix(hex("#f3e2ab"), base, 0.2)); }
        else { W(x, y, fc); W(x + 1, y + 1, dark); }
      }
    }
    cx.putImageData(im, 0, 0);
    return (_ground[lv] = cv.toDataURL("image/png"));
  }

  /* ---------- sprites ----------
     Una letra = un color. "." transparente, "z" sombra en el suelo.
     o = contorno en el navy de Vesper (no negro: así el pixel art es
     de la casa). Luz siempre desde arriba a la izquierda. */
  var SPR = {
    tree: [
      "....ooooooo....",
      "..ooklllllloo..",
      ".oklkllllllllo.",
      ".okkllllllLllo.",
      "oklllllllllLLlo",
      "olllllkllllLLLo",
      "olllllllllLLLLo",
      "olLllllllLLLLLo",
      ".oLLlllLLLLLLo.",
      ".oLLLLLLLLLLLo.",
      "..ooLLLLLLLoo..",
      "....ooTttoo....",
      "......Tto......",
      "......Tto......",
      "......Tto......",
      ".....oTTto.....",
      "....zzzzzzz...."],
    pine: [
      "......o......",
      ".....oko.....",
      "....oklLo....",
      "...oklllLo...",
      "....oklLo....",
      "...okllLLo...",
      "..okllllLLo..",
      "...okllLLo...",
      "..okllllLLo..",
      ".okllllllLLo.",
      "..oklllLLLo..",
      ".okllllllLLLo",
      "okllllllLLLLo",
      "ooooooooooooo",
      ".....oTo.....",
      ".....oTo.....",
      "....zzzzz...."],
    bush: [
      "...oooo.ooo...",
      "..okkllolllo..",
      ".okllllllklLo.",
      "oklllfllllllLo",
      "olllllllLlflLo",
      "olLlllllLLLLLo",
      ".oLLLLLLLLLLo.",
      "..oooooooooo..",
      "...zzzzzzzz..."],
    lantern: [
      "...o...",
      "..ogo..",
      ".ooooo.",
      ".oyyyo.",
      ".oycyo.",
      ".oyyyo.",
      ".ooooo.",
      "..oGo..",
      "..ono..",
      "..ono..",
      "..ono..",
      "..ono..",
      "..ono..",
      "..ono..",
      "..ono..",
      "..ono..",
      "..ono..",
      "..ono..",
      ".onnno.",
      "ooooooo",
      ".zzzzz."],
    house: [
      "......oooooo......",
      ".....orrrrrro.....",
      "....orhrrrrrro....",
      "...orhrrrrrrrRo...",
      "..orhrrrrrrrrRRo..",
      ".orrrrrrrrrrrRRRo.",
      "oooooooooooooooooo",
      ".oeeeeeeeeeeeeEEo.",
      ".oeooooeeeeooooEo.",
      ".oeoyyoooooooyyoEo",
      ".oeoycootTooycoEo.",
      ".oeoooootToooooEo.",
      ".oeeeeeotgoeeeeEo.",
      ".oeeeeeotToeeeEEo.",
      ".oooooooooooooooo.",
      "..zzzzzzzzzzzzzz.."],
    well: [
      "..oooooooooo..",
      "..oTttttttTo..",
      "...o......o...",
      "...t......t...",
      "...t..oo..t...",
      ".oootoggotooo.",
      "oswswswswswswo",
      "osSbbbbbbbbSso",
      "oswsSwswsSwsso",
      "oSsSwSsSwsSsSo",
      ".oSSSSSSSSSSo.",
      "..oooooooooo..",
      "...zzzzzzzz..."],
    mushroom: [
      ".oooo......",
      "oxcxxo.ooo.",
      "oxxxco.oxco",
      "oooooo.oooo",
      "..oco..oco.",
      "..oco..oco.",
      ".zzzzzzzzz."],
    rock: [
      "....oooo....",
      "..oowwsso...",
      ".owwssssSo..",
      "owsssssSSSo.",
      "osssssSSSSSo",
      "oSsSSSSSSSSo",
      ".oooooooooo.",
      "..zzzzzzzz.."],
    sign: [
      ".oooooooooo.",
      "otttttttttTo",
      "otcctctcttTo",
      "otttttttttTo",
      ".oooooooooo.",
      ".....oto....",
      ".....oto....",
      ".....oto....",
      ".....oto....",
      ".....oto....",
      "....oTTto...",
      "...zzzzzz..."],
    crystal: [
      "....oo....",
      "...ohao...",
      "...ohao...",
      "..ohaaAo..",
      "..ohaaAo..",
      ".ohhaaAAo.",
      ".ohaaaAAo.",
      "ohhaaaAAAo",
      "ohaaaaAAAo",
      "ohaaaaAAAo",
      ".ohaaaAAo.",
      "..oaaAAo..",
      "...oooo...",
      "..zzzzzz.."],
    star: [
      "...y...",
      "...y...",
      "..yyy..",
      "yyycyyy",
      "..yyy..",
      "...y...",
      "...y..."],
    planet: [
      ".....oooooo.....",
      "...oohaaaaaoo...",
      "..ohhaaaaaaaAo..",
      ".ohaaaaaaaaaAAo.",
      "ggohaaaaaaaaAAog",
      "oGggggggggggggGo",
      ".ooaaaaaaaaAAoo.",
      "..oaaaaaaaAAAo..",
      "...ooAAAAAAoo...",
      ".....oooooo....."],
    tower: [
      ".....o......",
      ".....oaa....",
      ".....oaaa...",
      ".....o......",
      ".....oo.....",
      "....orro....",
      "...orhrRo...",
      "..orhrrRRo..",
      ".orhrrrRRRo.",
      "oooooooooooo",
      ".owswswswSo.",
      ".oswsoyosSo.",
      ".owsoyyoSSo.",
      ".oswoooosSo.",
      ".owswswswSo.",
      ".oswswswsSo.",
      ".owsoyosSSo.",
      ".oswsooosSo.",
      ".owswswswSo.",
      ".oswsooosSo.",
      ".owsotTosSo.",
      ".oswotTosSo.",
      "oooooooooooo",
      ".zzzzzzzzzz."],
    flag: [
      "g.........",
      "oooooooooo",
      "oohaaaaaao",
      "oohaaaaaao",
      "oohaagaaao",
      "oohagggaao",
      "oohaagaaao",
      "oohaaaaaao",
      "oohaaaaaao",
      "ooaaaoaaao",
      "ooao..oao.",
      "ooo....oo.",
      "o.........",
      "o.........",
      "o.........",
      "o.........",
      "oo........",
      "zzz......."],
    flowers: [
      ".f....f...",
      "fyf..fyf.f",
      ".f.l..f.fy",
      ".lk.l.lk.f",
      "kllkllkllk"],
    fence: [
      ".o....o....o...",
      "oto..oto..oto..",
      "otoooototooto..",
      "ottttttttttttTo",
      "otoooototooto..",
      "ottttttttttttTo",
      "oto..oto..oto..",
      "oTo..oTo..oTo..",
      "zzzzzzzzzzzzzz."],
    chest: [
      "..oooooooo..",
      ".otttttttTo.",
      "otttttttttTo",
      "oggggggggggo",
      "otttogotttTo",
      "otttooottTTo",
      "otttttttTTTo",
      "oggggggggggo",
      "oooooooooooo",
      ".zzzzzzzzzz."]
  };
  /* qué hay en cada mundo (se reparten en orden por el sendero) */
  var SETS = {
    A1: ["house", "flowers", "lantern", "tree", "bush", "fence", "well", "tree", "flowers", "lantern", "bush", "tree"],
    A2: ["pine", "mushroom", "pine", "rock", "sign", "bush", "pine", "flowers", "lantern", "pine", "mushroom", "tree"],
    B1: ["house", "tree", "lantern", "tower", "bush", "flowers", "house", "lantern", "fence", "tree"],
    B2: ["rock", "pine", "flag", "rock", "tower", "pine", "lantern", "rock", "pine"],
    C1: ["planet", "star", "crystal", "rock", "star", "crystal", "star", "planet", "crystal"],
    C2: ["tower", "tree", "flag", "crystal", "bush", "chest", "lantern", "tree", "flowers"]
  };
  /* lo que da luz: el CSS le pone halo y un latido a dos tiempos */
  var GLOWS = { lantern: 1, star: 1, crystal: 1, house: 1 };

  var _spr = {};
  function sprite(name, lv) {
    var key = name + "|" + lv + "|" + rootVar("--gold", "");
    if (_spr[key]) return _spr[key];
    var rows = SPR[name]; if (!rows) return null;
    var P = pal(lv), G = gold();
    var C = {
      o: INK, z: [10, 8, 30, 80],
      g: G, G: mix(G, INK, 0.35), y: hex("#ffe08a"), c: hex("#fff6d8"),
      n: hex("#2a2a52"), e: hex("#d8cdb0"), E: hex("#a99c7a"),
      t: hex("#7a5432"), T: hex("#553820"),
      s: hex("#8a8aa2"), S: hex("#5d5d78"), w: hex("#b4b4c8"), b: hex("#3f86b8"),
      x: hex("#d8524a"),
      l: hex(P.l), L: hex(P.L), k: hex(P.k), f: hex(P.flowers[0]),
      r: hex(P.r), R: hex(P.R), h: hex(P.h),
      a: hex(P.h), A: hex(P.r)
    };
    if (lv === "C1") { C.s = hex("#6a5f9a"); C.S = hex("#463c78"); C.w = hex("#9a8fd0"); }
    var W = 0, H = rows.length, i, j;
    for (i = 0; i < H; i++) W = Math.max(W, rows[i].length);
    var cv = canvas(W, H), cx = cv.getContext("2d"), im = cx.createImageData(W, H);
    for (j = 0; j < H; j++) for (i = 0; i < W; i++) {
      var ch = rows[j].charAt(i); if (!ch || ch === ".") continue;
      var col = C[ch]; if (col) put(im, W, i, j, col);
    }
    cx.putImageData(im, 0, 0);
    return (_spr[key] = { src: cv.toDataURL("image/png"), w: W, h: H, glow: !!GLOWS[name] });
  }

  /* Capa de decorado con la MISMA forma que la del mapa grabado (.wprops > img
     con top en %), para que placeProps() de leccion_app.js esquive rótulos y
     nodos igual que antes. Las cajas son el sprite a escala entera: nada de
     object-fit, que estiraría los pixeles de forma desigual. */
  function propsLayer(lv, nStops, trnd) {
    var set = SETS[lv] || SETS.A1;
    /* más denso que el grabado: aquí el decorado es lo que hace "mundo".
       placeProps() retira lo que no quepa, así que pedir de más es seguro. */
    var N = Math.max(14, Math.round((nStops || 0) * 2.1));
    var h = '<div class="wprops wpx-props" aria-hidden="true">';
    for (var i = 0; i < N; i++) {
      var side = (i % 2) ? "R" : "L";
      var top = ((i + 0.5) / N) * 100 + (trnd(i + 3) - 0.5) * (60 / N);
      top = Math.max(1, Math.min(95, top));
      var nm = set[(i + Math.floor(i / set.length)) % set.length];
      var sp = sprite(nm, lv); if (!sp) continue;
      var big = PX;
      var flip = ((i >> 1) % 2 && nm !== "sign" && nm !== "flag") ? "transform:scaleX(-1);" : "";
      /* en pantallas anchas la capa se estira a toda la isla (widen), así
         que las piezas se reparten también hacia dentro, no sólo al borde */
      var off = Math.round(trnd(i + 21) * (window.innerWidth >= 560 ? 34 : 9));
      h += '<img src="' + sp.src + '" alt="" decoding="async"' + (sp.glow ? ' data-glow="' + nm + '"' : '')
        + ' style="top:' + top.toFixed(2) + '%;' + (side === "L" ? "left" : "right") + ':' + off + '%;' + flip
        + 'width:' + (sp.w * big) + 'px;height:' + (sp.h * big) + 'px;animation-delay:-' + (trnd(i + 31) * 3).toFixed(2) + 's">';
    }
    return h + '</div>';
  }

  /* En móvil el mapa (340px) ocupa toda la isla; en escritorio la isla
     mide el doble y el decorado se quedaba en la franja central. Se
     estira la capa hasta los bordes de la isla antes de placeProps(). */
  function widen(map) {
    var pr = map.querySelector(".wpx-props"), sky = map.closest(".wsky");
    if (!pr || !sky) return;
    var extra = Math.max(0, Math.floor((sky.clientWidth - map.clientWidth) / 2) - 6);
    pr.style.left = -extra + "px"; pr.style.right = -extra + "px";
  }

  /* ---------- placas de nodo (SVG nítido, generado con los colores del tema) ---------- */
  function plateSvg(N, o) {
    var cut = o.cut || 3, side = o.side || 3, px = [], x, y;
    function inside(x, y) {
      if (x < 0 || y < 0 || x >= N || y >= N) return false;
      var X = N - 1 - x, Y = N - 1 - y;
      return x + y >= cut && X + y >= cut && x + Y >= cut && X + Y >= cut;
    }
    function edge(x, y) { return !inside(x - 1, y) || !inside(x + 1, y) || !inside(x, y - 1) || !inside(x, y + 1); }
    for (y = 0; y < N; y++) for (x = 0; x < N; x++) {
      if (!inside(x, y)) continue;
      var c;
      if (edge(x, y)) c = o.line;
      else if (y >= N - 1 - side) c = (y === N - 1 - side) ? o.seam : o.side_c;
      else if (o.rim && (edge(x - 1, y) || edge(x + 1, y) || edge(x, y - 1))) c = o.rim;
      else if (edge(x, y - 1) || (o.rim && edge(x, y - 2)) || edge(x - 1, y) || (o.rim && edge(x - 2, y))) c = o.hl;
      else c = (h2(x, y, N) < 0.06) ? o.speck : o.face;
      px.push([x, y, c]);
    }
    /* pixeles sueltos -> tiras horizontales: un SVG de ~1-2 KB en vez de 500 rects */
    var out = "", run = null;
    px.forEach(function (p) {
      if (run && run.y === p[1] && run.c === p[2] && run.x + run.w === p[0]) { run.w++; return; }
      if (run) out += '<rect x="' + run.x + '" y="' + run.y + '" width="' + run.w + '" height="1" fill="' + run.c + '"/>';
      run = { x: p[0], y: p[1], w: 1, c: p[2] };
    });
    if (run) out += '<rect x="' + run.x + '" y="' + run.y + '" width="' + run.w + '" height="1" fill="' + run.c + '"/>';
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + N + ' ' + N + '" shape-rendering="crispEdges">' + out + '</svg>';
    return "url('data:image/svg+xml," + encodeURIComponent(svg) + "')";
  }
  var _vars = {};
  /* Variables CSS de las placas para ESTE mundo y ESTE tema */
  function vars(lv, t) {
    var G = gold(), key = lv + "|" + css(G) + "|" + (t && t.accent);
    if (_vars[key]) return _vars[key];
    var acc = hex((t && t.accent) || "#c5a059"), accInk = hex((t && t.accentInk) || "#8a6a2a");
    var L = css(INK);
    function P(face, sideC, hl, extra) {
      return Object.assign({ line: L, face: css(face), side_c: css(sideC), seam: css(mix(sideC, INK, 0.45)), hl: css(hl), speck: css(mix(face, WHITE, 0.12)) }, extra || {});
    }
    var navy = hex("#2c2c58"), navyS = hex("#1b1b3a");
    var stone = hex("#58587a"), stoneS = hex("#3a3a52");
    var v = ""
      + "--pxp-done:" + plateSvg(22, P(G, mix(G, INK, 0.42), mix(G, WHITE, 0.42))) + ";"
      + "--pxp-open:" + plateSvg(22, P(navy, navyS, mix(navy, WHITE, 0.16), { rim: css(mix(G, INK, 0.15)) })) + ";"
      + "--pxp-cur:" + plateSvg(26, P(hex("#33336a"), navyS, mix(navy, WHITE, 0.22), { rim: css(G), cut: 4 })) + ";"
      + "--pxp-lock:" + plateSvg(22, P(stone, stoneS, mix(stone, WHITE, 0.14))) + ";"
      + "--pxp-mini:" + plateSvg(20, P(acc, accInk, mix(acc, WHITE, 0.3))) + ";"
      + "--pxp-mini-done:" + plateSvg(20, P(G, mix(G, INK, 0.42), mix(G, WHITE, 0.42))) + ";"
      + "--pxp-boss:" + plateSvg(32, P(hex("#23234a"), navyS, mix(navy, WHITE, 0.16), { rim: css(acc), cut: 5, side: 4 })) + ";"
      + "--pxp-boss-ready:" + plateSvg(32, P(hex("#23234a"), navyS, mix(navy, WHITE, 0.16), { rim: css(G), cut: 5, side: 4 })) + ";"
      + "--pxp-boss-won:" + plateSvg(32, P(G, mix(G, INK, 0.42), mix(G, WHITE, 0.42), { cut: 5, side: 4 })) + ";"
      + "--pxp-ground:url('" + groundUrl(lv) + "');";
    return (_vars[key] = v);
  }

  /* ---------- glifos de nodo en pixel (heredan currentColor) ---------- */
  var GLY = {
    completed: ["........##", ".......##.", "##....##..", ".##..##...", "..####....", "...##....."],
    open:      ["#.....", "##....", "###...", "####..", "#####.", "####..", "###...", "##....", "#....."],
    locked:    ["..###..", ".#...#.", ".#...#.", "#######", "###.###", "###.###", "#######"],
    crest:     ["#######", "#.....#", "#..#..#", "#.###.#", "#..#..#", ".#...#.", "..#.#..", "...#..."]
  };
  function glyph(state) {
    var g = GLY[state] || GLY.open, W = 0, out = "", y, x;
    for (y = 0; y < g.length; y++) {
      W = Math.max(W, g[y].length);
      for (x = 0; x < g[y].length; x++) if (g[y].charAt(x) === "#") {
        var s = x; while (x + 1 < g[y].length && g[y].charAt(x + 1) === "#") x++;
        out += '<rect x="' + s + '" y="' + y + '" width="' + (x - s + 1) + '" height="1"/>';
      }
    }
    return '<svg class="wglyph wpx-glyph" viewBox="0 0 ' + W + ' ' + g.length + '" width="' + (W * PX) + '" height="' + (g.length * PX) + '" fill="currentColor" shape-rendering="crispEdges" aria-hidden="true">' + out + '</svg>';
  }

  /* ---------- el camino ----------
     Se dibuja en un lienzo a 1/3 de resolución y el navegador lo agranda
     sin suavizar: bordes de pixel de verdad. Muestrea la misma curva que
     mide el avatar (.wtrail-line), así que el gato sigue pisando el camino.
     Lo ya andado es de ladrillo dorado con las huellas del gato. */
  function paintRoad(map, travelled) {
    var cvs = map.querySelector(".wpx-road"), line = map.querySelector(".wtrail-line");
    if (!cvs || !line || !line.getTotalLength) return;
    var lv = map.getAttribute("data-world") || "A1", P = pal(lv);
    var Wc = map.clientWidth, Hc = map.clientHeight;
    var w = Math.ceil(Wc / PX), h = Math.ceil(Hc / PX);
    if (w < 4 || h < 4) return;
    cvs.width = w; cvs.height = h;
    cvs.style.width = (w * PX) + "px"; cvs.style.height = (h * PX) + "px";
    var cx = cvs.getContext("2d"), im = cx.createImageData(w, h);
    var total = line.getTotalLength(), R = 6.2, RR = R + 1.3;
    var dist = new Float32Array(w * h), arc = new Float32Array(w * h), i, x, y;
    dist.fill(99);
    for (var L = 0; L <= total; L += 1.4) {
      var p = line.getPointAtLength(L), px0 = p.x / PX, py0 = p.y / PX;
      var x0 = Math.max(0, Math.floor(px0 - RR - 1)), x1 = Math.min(w - 1, Math.ceil(px0 + RR + 1));
      var y0 = Math.max(0, Math.floor(py0 - RR - 1)), y1 = Math.min(h - 1, Math.ceil(py0 + RR + 1));
      for (y = y0; y <= y1; y++) for (x = x0; x <= x1; x++) {
        var dx = x + 0.5 - px0, dy = y + 0.5 - py0, d = Math.sqrt(dx * dx + dy * dy), k = y * w + x;
        if (d < dist[k]) { dist[k] = d; arc[k] = L; }
      }
    }
    var road = hex(P.road), rDark = hex(P.roadDark), rEdge = hex(P.roadEdge), rLight = hex(P.roadLight);
    var G = gold(), Gd = mix(G, INK, 0.38), Gl = mix(G, WHITE, 0.35), shade = [10, 8, 30, 70];
    for (y = 0; y < h; y++) for (x = 0; x < w; x++) {
      var k2 = y * w + x, d2 = dist[k2];
      if (d2 > RR + 1) continue;
      if (d2 > RR) { if (y > 0 && dist[k2 - w] <= RR) put(im, w, x, y, shade); continue; }   /* sombra bajo el borde */
      if (d2 > R) { put(im, w, x, y, rEdge); continue; }
      var done = arc[k2] <= travelled + 0.5;
      if (done) {
        /* ladrillo: hiladas de 2, juntas cada 4, a tresbolillo */
        var mortar = (y % 3 === 0) || (((x + (Math.floor(y / 3) % 2) * 2) % 5) === 0);
        put(im, w, x, y, mortar ? Gd : (h2(x, y, 5) < 0.12 ? Gl : G));
        if (d2 > R - 1) put(im, w, x, y, Gd);
      } else {
        var r = h2(x, y, 2);
        put(im, w, x, y, r < 0.08 ? rDark : (r > 0.93 ? rLight : road));
        if (d2 > R - 1.1 && h2(x, y, 9) < 0.5) put(im, w, x, y, rDark);
      }
    }
    /* guijarros en la tierra pendiente */
    for (L = 6; L < total; L += 9) {
      if (L <= travelled) continue;
      var q = line.getPointAtLength(L), ox = (h2(L, 1, 3) - 0.5) * 2 * (R - 2), oy = (h2(L, 2, 3) - 0.5) * 2 * (R - 2);
      x = Math.round(q.x / PX + ox); y = Math.round(q.y / PX + oy);
      put(im, w, x, y, rLight); put(im, w, x + 1, y, rDark);
    }
    /* huellas del gato sobre el oro, alternando pata izquierda y derecha */
    var PAW = [".#.#.", "#...#", ".###.", ".###."], side2 = 1;
    for (L = 10; L < travelled - 8; L += 22) {
      var a = line.getPointAtLength(L), b = line.getPointAtLength(Math.min(total, L + 2));
      var tx = b.x - a.x, ty = b.y - a.y, tl = Math.sqrt(tx * tx + ty * ty) || 1, nx = -ty / tl, ny = tx / tl;
      var cxp = Math.round(a.x / PX + nx * 2.2 * side2) - 2, cyp = Math.round(a.y / PX + ny * 2.2 * side2) - 2;
      side2 = -side2;
      for (y = 0; y < PAW.length; y++) for (x = 0; x < 5; x++) if (PAW[y].charAt(x) === "#") put(im, w, cxp + x, cyp + y, Gd);
    }
    cx.putImageData(im, 0, 0);
  }

  /* ---------- retratos pixelados en vivo ----------
     El gato del mapa (con su pelaje y accesorio) y el guardián se
     reducen a `cells` pixeles, se les da contorno navy y se muestran
     a escala PX. Las imágenes son del mismo origen, así que el lienzo
     no queda "contaminado". */
  function pixelate(img, cells, opts) {
    if (!img || img.dataset.pxDone === img.getAttribute("src")) return;
    opts = opts || {};
    var go = function () {
      try {
        var nw = img.naturalWidth, nh = img.naturalHeight; if (!nw || !nh) return;
        var cw = cells, ch = Math.max(1, Math.round(cells * (opts.cover ? 1 : nh / nw)));
        if (opts.aspect) ch = Math.round(cells / opts.aspect);
        var cv = canvas(cw, ch), cx = cv.getContext("2d");
        cx.imageSmoothingEnabled = true; cx.imageSmoothingQuality = "high";
        if (opts.cover) {
          var s = Math.max(cw / nw, ch / nh), dw = nw * s, dh = nh * s;
          cx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
        } else if (opts.aspect) {
          var s2 = Math.max(cw / nw, ch / nh), dw2 = nw * s2, dh2 = nh * s2;
          cx.drawImage(img, (cw - dw2) / 2, (ch - dh2) / 2, dw2, dh2);
        } else cx.drawImage(img, 0, 0, cw, ch);
        var im = cx.getImageData(0, 0, cw, ch), d = im.data, n = cw * ch, i;
        var lv = opts.levels || 7, step = 255 / (lv - 1);
        var solid = new Uint8Array(n);
        for (i = 0; i < n; i++) {
          var a = d[i * 4 + 3];
          if (a < 110) { d[i * 4 + 3] = 0; continue; }
          solid[i] = 1; d[i * 4 + 3] = 255;
          for (var c = 0; c < 3; c++) d[i * 4 + c] = Math.round(Math.round(d[i * 4 + c] / step) * step);
        }
        if (opts.outline) {
          for (var y = 0; y < ch; y++) for (var x = 0; x < cw; x++) {
            var k = y * cw + x; if (solid[k]) continue;
            if ((x > 0 && solid[k - 1]) || (x < cw - 1 && solid[k + 1]) || (y > 0 && solid[k - cw]) || (y < ch - 1 && solid[k + cw])) {
              d[k * 4] = INK[0]; d[k * 4 + 1] = INK[1]; d[k * 4 + 2] = INK[2]; d[k * 4 + 3] = 255;
            }
          }
        }
        cx.putImageData(im, 0, 0);
        var orig = img.getAttribute("src");
        img.dataset.pxSrc = orig;
        img.src = cv.toDataURL("image/png");
        img.dataset.pxDone = img.getAttribute("src");
        img.classList.add("is-px");
      } catch (e) { /* imagen de otro origen o sin decodificar: se queda como está */ }
    };
    if (img.complete && img.naturalWidth) go(); else img.addEventListener("load", go, { once: true });
  }

  return { on: on, PX: PX, vars: vars, ground: groundUrl, propsLayer: propsLayer, widen: widen, glyph: glyph, paintRoad: paintRoad, pixelate: pixelate, sprite: sprite };
})();
