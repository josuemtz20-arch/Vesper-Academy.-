/* ============================================================
   VESPER · MAPA ILUSTRADO (2026-11-02)
   ------------------------------------------------------------
   Tercera piel del mapa de leccion.html, en el MISMO lenguaje que
   los gatos (vesper_cat_*, tone_*, guardianes): ilustración vectorial
   de caricatura, contorno navy, sombreado plano en dos tonos, oro de
   marca. Cada mundo trae su suelo, su decorado y un banner con Vesper
   dentro del mundo, generados en Higgsfield (gpt_image_2_5) usando
   los gatos como referencia de estilo y recortados con
   _scripts/map_illus/process.py.

   Lo que se dibuja en código: el camino (tres trazos SVG sobre la
   misma curva que mide el avatar) y los nodos (stickers en CSS).

   Es el mapa BASE desde 2026-11-02: lo ve quien no haya elegido otro.
   El grabado y el pixel se eligen en configuracion.html (Estilo del
   mapa) o con ?mapa=grabado | ?mapa=pixel; se recuerda en
   localStorage "vesper_map_style".
   ============================================================ */
window.VESPER_MAPIL = (function () {
  "use strict";
  var KEY = "vesper_map_style", DIR = "assets/images/map/il/";

  function on() {
    try {
      var q = /[?&]mapa=(ilustrado|pixel|grabado)\b/.exec(location.search);
      if (q) localStorage.setItem(KEY, q[1]);
      /* es el mapa BASE (decisión del dueño, 2026-11-02): lo ve todo el que
         no haya elegido expresamente "grabado" o "pixel" */
      var v = localStorage.getItem(KEY);
      return v !== "grabado" && v !== "pixel";
    } catch (e) { return true; }
  }

  /* El decorado de cada mundo: [archivo, ancho y alto naturales, alto en
     pantalla (px, móvil), ¿da luz?]. El alto en pantalla es lo que hace
     que una casa pese más que una seta: las láminas salen todas a 300px. */
  var PROPS = {
    A1: [["a1_1", 243, 300, 90], ["a1_2", 89, 300, 84, 1], ["a1_3", 299, 300, 58], ["a1_4", 246, 300, 92],
         ["a1_5", 222, 300, 70], ["a1_6", 300, 259, 50], ["a1_7", 300, 290, 56], ["a1_8", 300, 275, 54]],
    A2: [["a2_1", 173, 300, 94], ["a2_2", 260, 300, 54], ["a2_3", 300, 273, 56], ["a2_4", 171, 300, 72],
         ["a2_5", 300, 289, 56], ["a2_6", 300, 222, 46], ["a2_7", 214, 300, 78, 1], ["a2_8", 287, 300, 58]],
    B1: [["b1_1", 195, 300, 88], ["b1_2", 122, 300, 102], ["b1_3", 89, 300, 84, 1], ["b1_4", 232, 300, 80],
         ["b1_5", 296, 300, 62], ["b1_6", 257, 300, 70], ["b1_7", 201, 300, 54], ["b1_8", 189, 300, 64, 1]],
    B2: [["b2_1", 266, 300, 84], ["b2_2", 181, 300, 92], ["b2_3", 112, 300, 88], ["b2_4", 163, 300, 102, 1],
         ["b2_5", 300, 264, 54], ["b2_6", 300, 287, 56, 1], ["b2_7", 253, 300, 60], ["b2_8", 300, 204, 46]],
    C1: [["c1_1", 300, 230, 60], ["c1_2", 202, 300, 86], ["c1_3", 265, 300, 62], ["c1_4", 225, 300, 66, 1],
         ["c1_5", 252, 300, 80], ["c1_6", 265, 300, 46, 1], ["c1_7", 223, 300, 78], ["c1_8", 300, 287, 56]],
    C2: [["c2_1", 208, 300, 100, 1], ["c2_2", 126, 300, 88], ["c2_3", 188, 300, 72, 1], ["c2_4", 270, 300, 60],
         ["c2_5", 172, 300, 70], ["c2_6", 91, 300, 84, 1], ["c2_7", 222, 300, 66, 1], ["c2_8", 247, 300, 58, 1]]
  };
  /* el color de la tierra del camino en cada mundo (el oro de lo andado
     sale del tema activo, --gold) */
  var ROAD = {
    A1: ["#d9b77e", "#f0d7a4"], A2: ["#bf955f", "#dcb886"], B1: ["#c4c9d4", "#e4e7ee"],
    B2: ["#d3ad76", "#ecd09e"], C1: ["#9e94e2", "#cbc4ff"], C2: ["#d8c48e", "#f0e2b4"]
  };

  function abs(u) { try { return new URL(u, location.href).href; } catch (e) { return u; } }

  /* variables del mundo: suelo y camino. La url va ABSOLUTA: una url()
     dentro de una variable se resolvería contra la hoja de estilos. */
  function vars(lv) {
    var r = ROAD[lv] || ROAD.A1;
    return "--il-ground:url('" + abs(DIR + "ground_" + lv.toLowerCase() + ".webp") + "');"
      + "--il-road:" + r[0] + ";--il-road-hi:" + r[1] + ";";
  }
  function banner(lv) { return DIR + "banner_" + lv.toLowerCase() + ".jpg"; }

  /* Misma forma que la capa grabada (.wprops > img con top en %), para que
     placeProps() de leccion_app.js siga esquivando rótulos y nodos. */
  function propsLayer(lv, nStops, trnd) {
    var set = PROPS[lv] || PROPS.A1, wide = window.innerWidth >= 560;
    var N = Math.max(12, Math.round((nStops || 0) * 1.7)), k = wide ? 1.25 : 1, maxW = wide ? 120 : 82;
    var h = '<div class="wprops wil-props" aria-hidden="true">';
    for (var i = 0; i < N; i++) {
      var side = (i % 2) ? "R" : "L";
      var top = ((i + 0.5) / N) * 100 + (trnd(i + 3) - 0.5) * (60 / N);
      top = Math.max(1, Math.min(95, top));
      var p = set[(i + Math.floor(i / set.length)) % set.length];
      var H = p[3] * k, W = H * p[1] / p[2];
      if (W > maxW) { H = H * maxW / W; W = maxW; }
      var flip = ((i >> 1) % 2) ? "transform:scaleX(-1);" : "";
      var off = Math.round(trnd(i + 21) * (wide ? 30 : 5));
      h += '<img src="' + DIR + p[0] + '.webp" alt="" loading="lazy" decoding="async"' + (p[4] ? ' data-glow="1"' : '')
        + ' style="top:' + top.toFixed(2) + '%;' + (side === "L" ? "left" : "right") + ':' + off + '%;' + flip
        + 'width:' + Math.round(W) + 'px;height:' + Math.round(H) + 'px;animation-delay:-' + (trnd(i + 31) * 4).toFixed(2) + 's">';
    }
    return h + '</div>';
  }

  /* En escritorio la isla mide el doble que el mapa (340px): la capa de
     decorado se estira hasta los bordes antes de placeProps(). */
  function widen(map) {
    var pr = map.querySelector(".wil-props"), sky = map.closest(".wsky");
    if (!pr || !sky) return;
    var extra = Math.max(0, Math.floor((sky.clientWidth - map.clientWidth) / 2) - 8);
    pr.style.left = -extra + "px"; pr.style.right = -extra + "px";
  }

  return { on: on, vars: vars, banner: banner, propsLayer: propsLayer, widen: widen };
})();
