/* ==========================================================================
   VESPER - Escribir sobre el libro (vesper_book_board.js)
   --------------------------------------------------------------------------
   El alumno responde los ejercicios ENCIMA de la propia hoja del libro, con
   herramientas al estilo Canva: cajas de texto que se mueven, se ensanchan y
   se formatean (fuente, tamano, color, fondo, negrita, cursiva, subrayado,
   tachado, alineacion), formas para marcar respuestas (circulo, rectangulo,
   linea, flecha, palomita, tache), lapiz, resaltador, subrayado recto y
   notas. Nada se abre aparte: el libro sigue siendo el libro.

   Lo inyecta libro.html en el documento del libro (que se crea con
   document.write, asi que aqui no hay ni Firebase ni el resto de la pagina
   anfitriona: este archivo no depende de nada).

   DECISIONES QUE EXPLICAN EL RESTO
   1. Una capa POR HOJA. Las hojas son `.page` en los libros generados y
      `.vpb-page` en los de Canva (Core Basics). Si un libro no trae hojas, la
      capa va sobre el libro entero.
   2. Los lienzos (lapiz, resaltador) van POR TRAMOS de 2048 px de alto y
      solo existen los que estan cerca de la pantalla. Hay libros con UNA
      `.page` de 60 000 px: un lienzo asi se queda en blanco, sin error.
      Textos y formas NO son lienzo: son elementos (HTML y SVG), asi se
      pueden seleccionar, mover y formatear, e imprimen nitidos.
   3. Todo se guarda en coordenadas NORMALIZADAS (0..1 sobre el ancho y el
      alto de su hoja) y los tamanos en px sobre una hoja de 800 px. El libro
      se re-maqueta (movil, escritorio, impresion) y la respuesta no se
      despega de su hueco.
   4. Deshacer / rehacer guardan una FOTO de la hoja antes de cada cambio.
      Con objetos que se mueven, se formatean y se borran, "quitar el ultimo
      trazo" ya no alcanza.
   5. Se guarda en localStorage por libro. Son las respuestas del alumno
      sobre SU copia: no viajan a Firestore ni se comparten.
   ========================================================================== */
(function (global) {
  "use strict";

  var TOOLS = { TEXT:"text", SHAPE:"shape", PEN:"pen", MARKER:"marker",
                UNDERLINE:"underline", NOTE:"note", ERASER:"eraser" };
  var QUICK = ["#1e5fa8", "#1B1B2F", "#C0392B", "#2D9E75", "#C9A84C"];
  var PALETTE = ["#1B1B2F", "#5b6170", "#ffffff", "#1e5fa8", "#0ea5e9", "#6d4aff",
                 "#C0392B", "#e8590c", "#C9A84C", "#f5c400", "#2D9E75", "#d63384"];
  var HIGHLIGHTS = ["#fff3a3", "#c9f2d0", "#cfe6ff", "#ffd6e4", "#ffe2c2", "#e6dcff"];
  var SIZES = [2, 4, 8];
  var FONTS = [
    { id:"sys",     name:"Normal",    css:"'Segoe UI','Helvetica Neue',Arial,system-ui,sans-serif" },
    { id:"hand",    name:"A mano",    css:"'Caveat',cursive",                     g:"Caveat:wght@500;700" },
    { id:"school",  name:"Escolar",   css:"'Patrick Hand',cursive",               g:"Patrick+Hand" },
    { id:"round",   name:"Redonda",   css:"'Nunito',sans-serif",                  g:"Nunito:ital,wght@0,500;0,800;1,500" },
    { id:"serif",   name:"Cl\u00e1sica", css:"'Merriweather',Georgia,serif",      g:"Merriweather:ital,wght@0,400;0,700;1,400" },
    { id:"elegant", name:"Elegante",  css:"'Playfair Display',Georgia,serif",     g:"Playfair+Display:ital,wght@0,500;0,700;1,500" },
    { id:"title",   name:"Titular",   css:"'Oswald',Impact,sans-serif",           g:"Oswald:wght@400;600" },
    { id:"marker",  name:"Plum\u00f3n", css:"'Permanent Marker',cursive",         g:"Permanent+Marker" },
    { id:"mono",    name:"M\u00e1quina", css:"'Courier Prime','Courier New',monospace", g:"Courier+Prime:ital,wght@0,400;0,700;1,400" }
  ];
  var SHAPES = [
    { k:"ellipse", name:"C\u00edrculo" }, { k:"rect", name:"Rect\u00e1ngulo" },
    { k:"line", name:"L\u00ednea" }, { k:"arrow", name:"Flecha" },
    { k:"check", name:"Palomita" }, { k:"cross", name:"Tache" }
  ];
  var REF_W = 800;                 // ancho de referencia de grosores y letra
  var TILE = 2048;                 // alto maximo de cada lienzo (px CSS)
  var SEL = "#6d4aff";             // color de seleccion (marco y asas)
  var PREFS = "vesper_book_board_prefs";
  var MAX_HISTORY = 60;

  var state = {
    bookId:"libro", on:false, hidden:false,
    tool:TOOLS.TEXT, shape:"ellipse", color:QUICK[0], size:SIZES[1],
    text:{ f:"sys", s:21, c:QUICK[0] },     // estilo de la proxima caja
    data:{ pages:{} },   // { "<i>": { strokes:[], notes:[], texts:[], shapes:[] } }
    layers:[], saveT:null, sel:null, editTok:null,
    undo:[], redo:[]
  };

  /* ── almacenamiento ─────────────────────────────────────────────── */
  function key() { return "vesper_book_notes:" + state.bookId; }
  function load() {
    try {
      var raw = localStorage.getItem(key());
      var d = raw ? JSON.parse(raw) : null;
      if (d && d.pages) state.data = d;
    } catch (e) { /* modo privado o cuota: se escribe igual, no se guarda */ }
    try {
      var p = JSON.parse(localStorage.getItem(PREFS) || "null");
      if (p) {
        for (var k in TOOLS) if (TOOLS[k] === p.tool) state.tool = p.tool;
        if (typeof p.color === "string" && /^#[0-9a-f]{6}$/i.test(p.color)) state.color = p.color;
        if (SIZES.indexOf(p.size) >= 0) state.size = p.size;
        if (SHAPES.some(function (s) { return s.k === p.shape; })) state.shape = p.shape;
        if (p.text && typeof p.text === "object") {
          if (fontById(p.text.f)) state.text.f = p.text.f;
          if (p.text.s >= 8 && p.text.s <= 120) state.text.s = p.text.s;
          if (/^#[0-9a-f]{6}$/i.test(p.text.c || "")) state.text.c = p.text.c;
        }
      }
    } catch (e) {}
  }
  function save() {
    clearTimeout(state.saveT);
    state.saveT = setTimeout(function () {
      try { localStorage.setItem(key(), JSON.stringify(state.data)); }
      catch (e) { flash("No hay espacio para guardar tus respuestas"); }
    }, 400);
  }
  function savePrefs() {
    try {
      localStorage.setItem(PREFS, JSON.stringify({ tool:state.tool, color:state.color,
        size:state.size, shape:state.shape, text:state.text }));
    } catch (e) {}
  }
  function pageData(i) {
    var k = String(i);
    var p = state.data.pages[k];
    if (!p) p = state.data.pages[k] = {};
    if (!p.strokes) p.strokes = [];
    if (!p.notes) p.notes = [];
    if (!p.texts) p.texts = [];
    if (!p.shapes) p.shapes = [];
    return p;
  }
  // Para pintar: no crea la entrada de la hoja si no existe (si no, abrir
  // un libro de 100 hojas guardaria 100 hojas vacias).
  var EMPTY = { strokes:[], notes:[], texts:[], shapes:[] };
  function peek(i) {
    var p = state.data.pages[String(i)];
    if (!p) return EMPTY;
    return { strokes:p.strokes || [], notes:p.notes || [], texts:p.texts || [], shapes:p.shapes || [] };
  }
  function hasAnything() {
    return Object.keys(state.data.pages).some(function (k) {
      var p = state.data.pages[k];
      return (p.strokes && p.strokes.length) || (p.notes && p.notes.length) ||
             (p.texts && p.texts.length) || (p.shapes && p.shapes.length);
    });
  }
  function fontById(id) {
    for (var i = 0; i < FONTS.length; i++) if (FONTS[i].id === id) return FONTS[i];
    return null;
  }
  function clone(o) { return JSON.parse(JSON.stringify(o)); }

  /* ── historial: una foto de la hoja antes de cada cambio ─────────── */
  function begin(i) { return { i:i, before:JSON.stringify(pageData(i)) }; }
  function end(tok) {
    if (!tok) return;
    if (JSON.stringify(pageData(tok.i)) !== tok.before) {
      state.undo.push(tok);
      if (state.undo.length > MAX_HISTORY) state.undo.shift();
      state.redo = [];
      refreshHistoryButtons();
    }
    save();
  }
  function mutate(i, fn) { var t = begin(i); fn(); end(t); }
  // Un cambio de formato sobre la caja que se esta escribiendo va dentro de
  // esa misma sesion de edicion; sobre cualquier otra cosa, es su propio paso.
  function change(layer, fn) {
    if (state.editTok && state.editTok.i === layer.index) { fn(); save(); }
    else mutate(layer.index, fn);
  }
  function travel(from, to, label) {
    closeEditing();
    var tok = from.pop();
    if (!tok) { flash("No hay nada que " + label); return; }
    to.push({ i:tok.i, before:JSON.stringify(pageData(tok.i)) });
    state.data.pages[String(tok.i)] = JSON.parse(tok.before);
    var layer = state.layers[tok.i];
    if (layer) rerenderPage(layer);
    save();
    refreshHistoryButtons();
    if (layer) {
      var r = layer.page.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) flash("Hecho en la hoja " + (tok.i + 1));
    }
  }
  function undo() { travel(state.undo, state.redo, "deshacer"); }
  function redo() { travel(state.redo, state.undo, "rehacer"); }

  /* ── estilos ─────────────────────────────────────────────────────
     Todo lleva el prefijo vbb- y !important donde el CSS del libro puede
     pisarlo: las pieles traen reglas muy amplias (`[style*="width"]
     {max-width:100%}`, `.page :not(i){font-family:...!important}`). Lo que
     un libro no debe tocar nunca (letra y color de las respuestas) va EN
     LINEA con !important, que es lo unico que le gana a eso.

     Y NADA de aqui lleva la clase `.no-print`: libro.html inyecta
     `.no-print:not(.vm-chip){display:none!important}` para tapar la
     navegacion propia de cada libro, y se llevaria por delante esta barra.
     Lo de no imprimir la interfaz lo resuelve el @media print de mas abajo. */
  var CSS = [
    ".vbb-hit{position:absolute!important;inset:0;z-index:6;pointer-events:none;margin:0!important;",
      "max-width:none!important;background:transparent!important}",
    "body.vbb-on .vbb-hit{pointer-events:auto}",
    // Lapiz, resaltador, subrayado, formas y borrador se comen el gesto (si
    // no, dibujar hace scroll). Texto y notas NO: el alumno tiene que poder
    // seguir bajando por el libro con el dedo; un toque sin arrastre es el
    // que pone la caja.
    "body.vbb-on.vbb-draw .vbb-hit{touch-action:none;cursor:crosshair}",
    "body.vbb-on.vbb-type .vbb-hit{touch-action:auto;cursor:text}",
    ".vbb-cv{position:absolute!important;left:0;z-index:6;pointer-events:none;margin:0!important;",
      "max-width:none!important}",
    "body.vbb-hidden .vbb-cv,body.vbb-hidden .vbb-note,body.vbb-hidden .vbb-txt,",
      "body.vbb-hidden .vbb-shape{display:none!important}",
    "body.vbb-on.vbb-draw{-webkit-user-select:none;user-select:none}",

    /* Objetos (texto y formas). Con las herramientas cerradas no reciben
       toques: el libro se lee y sus audios se pulsan como siempre. Con el
       lapiz o el resaltador en la mano tampoco: se dibuja por encima. */
    ".vbb-obj{pointer-events:none}",
    "body.vbb-on.vbb-type .vbb-txt,body.vbb-on.vbb-pick .vbb-txt,body.vbb-on.vbb-erase .vbb-txt{pointer-events:auto}",
    ".vbb-shape svg{position:absolute;left:0;top:0;width:100%;height:100%;overflow:visible;pointer-events:none}",
    ".vbb-hitp{pointer-events:none}",
    "body.vbb-on.vbb-type .vbb-hitp,body.vbb-on.vbb-pick .vbb-hitp,body.vbb-on.vbb-erase .vbb-hitp{pointer-events:stroke;cursor:move}",
    "body.vbb-on.vbb-type .vbb-hitp.vbb-fillhit,body.vbb-on.vbb-pick .vbb-hitp.vbb-fillhit,",
      "body.vbb-on.vbb-erase .vbb-hitp.vbb-fillhit{pointer-events:all}",
    "body.vbb-on.vbb-erase .vbb-hitp,body.vbb-on.vbb-erase .vbb-txt{cursor:pointer}",
    "body.vbb-on .vbb-shape.vbb-sel{pointer-events:auto;cursor:move;touch-action:none}",

    /* Caja de texto: sin marco, como tinta sobre la hoja. La linea de base
       de la primera fila queda donde se toco: el alumno toca la raya. */
    ".vbb-txt{position:absolute!important;z-index:7;margin:0!important;padding:0!important;",
      "background:transparent!important;border:0!important;box-sizing:border-box}",
    "body.vbb-on .vbb-txt:not(.vbb-editing){touch-action:none;cursor:move}",
    ".vbb-in{display:block;min-width:14px;min-height:1.2em;margin:0!important;padding:1px 5px!important;",
      "font-size:inherit!important;line-height:1.2!important;letter-spacing:0!important;text-indent:0!important;",
      "white-space:pre-wrap!important;overflow-wrap:anywhere;",
      "border:1.5px dashed transparent;border-radius:4px;outline:none;box-sizing:border-box;",
      "-webkit-print-color-adjust:exact;print-color-adjust:exact}",
    ".vbb-txt.vbb-editing .vbb-in{cursor:text;-webkit-user-select:text;user-select:text}",
    "body.vbb-on .vbb-txt:hover .vbb-in{border-color:rgba(109,74,255,.45)}",
    ".vbb-txt.vbb-sel .vbb-in{border:1.5px solid " + SEL + "!important}",
    ".vbb-in:empty:before{content:attr(data-ph);opacity:.45;font-weight:500}",
    "body.vbb-on.vbb-erase .vbb-txt:hover .vbb-in{border-color:#C0392B!important}",

    /* Asas (de texto y de formas) */
    ".vbb-h{position:absolute;display:none;z-index:2;box-sizing:border-box;touch-action:none;",
      "pointer-events:auto;-webkit-user-select:none;user-select:none}",
    ".vbb-sel>.vbb-h{display:block}",
    ".vbb-h-pt{width:14px;height:14px;margin:-7px 0 0 -7px;border-radius:50%;background:#fff;",
      "border:2px solid " + SEL + ";box-shadow:0 1px 4px rgba(0,0,0,.25)}",
    ".vbb-h-pt[data-h=tl],.vbb-h-pt[data-h=br]{cursor:nwse-resize}",
    ".vbb-h-pt[data-h=tr],.vbb-h-pt[data-h=bl]{cursor:nesw-resize}",
    ".vbb-h-pt[data-h=p1],.vbb-h-pt[data-h=p2]{cursor:crosshair}",
    ".vbb-h-w{right:-6px;top:50%;width:9px;height:24px;margin-top:-12px;border-radius:5px;background:#fff;",
      "border:2px solid " + SEL + ";cursor:ew-resize;box-shadow:0 1px 4px rgba(0,0,0,.25)}",
    ".vbb-h-move{left:0;top:-30px;width:26px;height:26px;border-radius:50%;background:" + SEL + ";",
      "color:#fff;cursor:move;box-shadow:0 2px 6px rgba(0,0,0,.3)}",
    ".vbb-h-move svg{width:16px;height:16px;margin:5px;fill:none;stroke:#fff;stroke-width:2;",
      "stroke-linecap:round;stroke-linejoin:round;display:block}",
    ".vbb-shape.vbb-sel{outline:1.5px solid " + SEL + ";outline-offset:5px}",
    ".vbb-shape.vbb-line.vbb-sel{outline:none}",
    ".vbb-shape{position:absolute!important;z-index:7;margin:0!important;padding:0!important;",
      "max-width:none!important;box-sizing:border-box}",

    /* Nota adhesiva */
    ".vbb-note{position:absolute;z-index:8;width:190px;min-height:64px;padding:10px 12px 12px;",
      "background:#ffe9a8;color:#3a3325;border-radius:3px 12px 3px 3px;",
      "box-shadow:0 6px 18px rgba(27,27,47,.24);font:400 13px/1.5 Inter,system-ui,sans-serif;",
      "white-space:pre-wrap;overflow-wrap:break-word;-webkit-user-select:text;user-select:text}",
    "body.vbb-on.vbb-draw:not(.vbb-erase) .vbb-note{pointer-events:none}",
    ".vbb-note:focus-within{outline:2px solid #C9A84C;outline-offset:1px}",
    ".vbb-note [contenteditable]{outline:none}",
    ".vbb-note .vbb-note-x{position:absolute;top:2px;right:4px;width:20px;height:20px;border:none;",
      "background:none;color:#8a7c4e;font:700 15px/1 sans-serif;cursor:pointer;border-radius:50%}",
    ".vbb-note .vbb-note-x:hover{background:rgba(0,0,0,.10);color:#3a3325}",
    ".vbb-note .vbb-note-grip{position:absolute;top:2px;left:5px;color:#b0a06a;font:700 13px/1 sans-serif;",
      "cursor:grab;touch-action:none}",

    /* Boton flotante: dice lo que hace. */
    ".vbb-fab{position:fixed!important;right:14px;bottom:22px;z-index:99999;",
      "display:flex;align-items:center;gap:8px;height:46px;padding:0 18px 0 14px;margin:0!important;",
      "background:#1B1B2F;color:#f3e2ab;border:1px solid rgba(201,168,76,.55);border-radius:999px;",
      "box-shadow:0 8px 24px rgba(0,0,0,.34);cursor:pointer;",
      "font:600 14px/1 Inter,system-ui,sans-serif;transition:background .16s}",
    ".vbb-fab:hover{background:#2c2c4a}",
    ".vbb-fab svg{width:19px;height:19px;fill:none;stroke:currentColor;stroke-width:1.8;",
      "stroke-linecap:round;stroke-linejoin:round}",

    /* Barra de herramientas */
    ".vbb-bar{position:fixed!important;right:14px;top:50%;transform:translateY(-50%);z-index:99999;",
      "display:none;flex-direction:column;gap:5px;padding:8px;margin:0!important;",
      "max-height:calc(100vh - 24px);overflow-y:auto;scrollbar-width:none;",
      "background:rgba(27,27,47,.96);border:1px solid rgba(201,168,76,.32);border-radius:14px;",
      "box-shadow:0 16px 44px rgba(0,0,0,.44);font-family:Inter,system-ui,sans-serif}",
    "body.vbb-on .vbb-bar{display:flex}",
    ".vbb-bar button,.vbb-ctx button{display:flex;align-items:center;justify-content:center;",
      "background:transparent;border:1px solid transparent;border-radius:9px;color:#b9b5cd;",
      "cursor:pointer;padding:0;margin:0;font-family:inherit;transition:color .15s,background .15s,border-color .15s}",
    ".vbb-bar button{width:40px;height:36px;flex:0 0 auto}",
    ".vbb-bar button:hover,.vbb-ctx button:hover{color:#f5f2eb;background:rgba(255,255,255,.08)}",
    ".vbb-bar button.on,.vbb-ctx button.on{color:#f3e2ab;background:rgba(201,168,76,.18);border-color:rgba(201,168,76,.42)}",
    ".vbb-bar button:disabled{opacity:.3;cursor:default;background:transparent}",
    ".vbb-bar svg,.vbb-ctx svg,.vbb-pop svg{width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:1.7;",
      "stroke-linecap:round;stroke-linejoin:round}",
    ".vbb-aa{font:700 15px/1 Georgia,serif;letter-spacing:.5px}",
    ".vbb-sep{height:1px;background:rgba(255,255,255,.14);margin:2px 4px;flex:0 0 auto}",
    ".vbb-colors{display:grid;grid-template-columns:repeat(2,1fr);gap:5px;padding:2px 3px;justify-items:center}",
    ".vbb-sw{width:16px;height:16px;border-radius:50%;cursor:pointer;display:block;position:relative;",
      "box-shadow:inset 0 0 0 1px rgba(255,255,255,.3);border:0;padding:0;margin:0;flex:0 0 auto}",
    ".vbb-sw.on{box-shadow:0 0 0 2px #C9A84C}",
    // Las muestras son <button>: sin esto heredan el tamano y la esquina de
    // los botones de la barra y salen como cuadros grandes.
    ".vbb-bar .vbb-sw{width:18px!important;height:18px!important;border-radius:50%!important;",
      "border:0!important;padding:0!important}",
    ".vbb-bar .vbb-sw.on{box-shadow:0 0 0 2px #C9A84C!important}",
    ".vbb-pop .vbb-sw{border-radius:50%!important;border:0;padding:0}",
    ".vbb-pop .vbb-sw.on{box-shadow:0 0 0 2px #C9A84C,inset 0 0 0 1px rgba(0,0,0,.2)}",
    ".vbb-rainbow{background:conic-gradient(#f44,#fc3,#3c6,#39f,#a4f,#f44)!important;overflow:hidden}",
    ".vbb-rainbow input{position:absolute;inset:0;opacity:0;width:100%;height:100%;cursor:pointer;border:0;padding:0}",
    ".vbb-sizes{display:flex;justify-content:center;align-items:center;gap:6px;padding:3px 2px}",
    ".vbb-sizes i{border-radius:50%;background:#b9b5cd;cursor:pointer;display:block;opacity:.6}",
    ".vbb-sizes i.on{background:#f3e2ab;opacity:1}",

    /* Barra contextual (la del objeto seleccionado) */
    ".vbb-ctx{position:fixed!important;z-index:100000;display:none;align-items:center;gap:3px;padding:5px;",
      "margin:0!important;background:rgba(27,27,47,.97);border:1px solid rgba(201,168,76,.32);border-radius:12px;",
      "box-shadow:0 12px 34px rgba(0,0,0,.4);font:500 13px/1 Inter,system-ui,sans-serif;color:#e9e6f4;",
      "white-space:nowrap;-webkit-user-select:none;user-select:none}",
    ".vbb-ctx.on{display:flex}",
    ".vbb-ctx button{height:32px;min-width:32px;padding:0 6px;font-size:14px}",
    ".vbb-ctx .vbb-font{min-width:112px;justify-content:space-between;gap:8px;color:#f5f2eb;",
      "border-color:rgba(255,255,255,.18);font-size:15px}",
    ".vbb-ctx .vbb-vs{width:1px;align-self:stretch;background:rgba(255,255,255,.14);margin:3px 3px}",
    ".vbb-ctx input.vbb-num{width:38px;height:28px;box-sizing:border-box;text-align:center;border-radius:7px;",
      "border:1px solid rgba(255,255,255,.2);background:rgba(255,255,255,.06);color:#f5f2eb;",
      "font:600 13px/1 Inter,system-ui,sans-serif;margin:0;padding:0}",
    ".vbb-ctx .vbb-A{display:flex;flex-direction:column;align-items:center;gap:2px;font:700 15px/1 Georgia,serif}",
    ".vbb-ctx .vbb-A b{display:block;width:18px;height:4px;border-radius:2px}",
    ".vbb-ctx .vbb-fmt{font:700 15px/1 Georgia,serif;width:32px}",

    /* Desplegable (fuentes, colores, formas) */
    ".vbb-pop{position:fixed!important;z-index:100001;display:none;padding:8px;margin:0!important;",
      "background:#23233b;border:1px solid rgba(201,168,76,.32);border-radius:12px;",
      "box-shadow:0 16px 40px rgba(0,0,0,.45);color:#e9e6f4;font:500 13px/1.2 Inter,system-ui,sans-serif;",
      "max-height:60vh;overflow-y:auto}",
    ".vbb-pop.on{display:block}",
    ".vbb-pop .vbb-fontopt{display:block;width:100%;text-align:left;padding:8px 12px;border:0;border-radius:8px;",
      "background:transparent;color:#f5f2eb;font-size:18px;cursor:pointer;margin:0}",
    ".vbb-pop .vbb-fontopt:hover,.vbb-pop .vbb-fontopt.on{background:rgba(201,168,76,.18)}",
    ".vbb-pop .vbb-grid{display:grid;grid-template-columns:repeat(6,22px);gap:8px;padding:2px}",
    ".vbb-pop .vbb-grid .vbb-sw{width:22px;height:22px}",
    ".vbb-pop .vbb-lbl{font-size:11px;letter-spacing:.06em;text-transform:uppercase;opacity:.6;margin:8px 2px 6px}",
    ".vbb-pop .vbb-lbl:first-child{margin-top:0}",
    ".vbb-pop .vbb-none{background:#fff!important;overflow:hidden}",
    ".vbb-pop .vbb-none:after{content:'';position:absolute;left:-2px;right:-2px;top:50%;height:2px;",
      "background:#C0392B;transform:rotate(-45deg)}",
    ".vbb-pop .vbb-shapes{display:grid;grid-template-columns:repeat(3,44px);gap:6px}",
    ".vbb-pop .vbb-shapes button{width:44px;height:40px;border-radius:9px;border:1px solid transparent;",
      "background:transparent;color:#d9d5ea;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0;margin:0}",
    ".vbb-pop .vbb-shapes button:hover,.vbb-pop .vbb-shapes button.on{background:rgba(201,168,76,.18);",
      "border-color:rgba(201,168,76,.42);color:#f3e2ab}",
    ".vbb-pop .vbb-shapes svg{width:24px;height:24px}",

    /* Aviso */
    ".vbb-flash{position:fixed!important;left:50%;bottom:80px;transform:translateX(-50%);z-index:100002;",
      "background:rgba(27,27,47,.95);color:#f5f2eb;border:1px solid rgba(201,168,76,.4);",
      "border-radius:999px;padding:9px 16px;font:600 12px/1.3 Inter,system-ui,sans-serif;",
      "box-shadow:0 10px 30px rgba(0,0,0,.4);opacity:0;transition:opacity .2s;pointer-events:none;",
      "max-width:calc(100vw - 40px);text-align:center}",
    ".vbb-flash.on{opacity:1}",

    /* Al imprimir / guardar en PDF: las respuestas SI salen; la interfaz, no. */
    "@media print{.vbb-fab,.vbb-bar,.vbb-ctx,.vbb-pop,.vbb-flash,.vbb-note-x,.vbb-note-grip,.vbb-h,.vbb-hit{display:none!important}",
      ".vbb-cv{position:absolute!important}",
      ".vbb-in{border-color:transparent!important}",
      ".vbb-in:empty{display:none!important}",
      ".vbb-shape{outline:none!important}",
      ".vbb-note{box-shadow:none!important;-webkit-print-color-adjust:exact;print-color-adjust:exact}}",

    "@media (max-width:600px){.vbb-fab{bottom:18px;right:12px}",
      ".vbb-bar{top:auto;bottom:10px;right:8px;left:8px;transform:none;flex-direction:row;flex-wrap:wrap;",
      "justify-content:center;max-width:none;max-height:none;overflow:visible}",
      ".vbb-bar button{width:36px;height:34px}",
      ".vbb-bar .vbb-sep{width:1px;height:auto;margin:4px 2px}",
      ".vbb-colors{grid-template-columns:repeat(6,1fr);align-items:center}",
      // En el movil la barra del objeto va arriba: abajo la tapa el teclado.
      ".vbb-ctx{left:8px!important;right:8px!important;top:8px!important;overflow-x:auto;scrollbar-width:none}",
      ".vbb-pop{left:8px!important;right:8px!important;top:58px!important}",
      ".vbb-flash{bottom:150px}}"
  ].join("");

  var ICONS = {
    write:'<path d="M4 20h4L20 8a2.55 2.55 0 0 0-3.6-3.6L4 16.8z"/><path d="m14.6 6.4 3.6 3.6"/><path d="M13 20h7"/>',
    pen:'<path d="M4 20c2.5-1 3.5-4 6-4s2 3 4.5 3 3-3 5.5-4"/><path d="M4 11c2-3 5-6 7-6 1.6 0 1.2 2.4-1 4.6"/>',
    marker:'<path d="M6 15.5 15.4 6a2.6 2.6 0 0 1 3.7 3.7L9.6 19H6z"/><path d="M3.5 21.5h8"/>',
    underline:'<path d="M7 4v7a5 5 0 0 0 10 0V4"/><path d="M4.5 20.5h15"/>',
    eraser:'<path d="M8.6 19.5 3.9 14.8a1.8 1.8 0 0 1 0-2.6l8.3-8.3a1.8 1.8 0 0 1 2.6 0l4.9 4.9a1.8 1.8 0 0 1 0 2.6l-7.6 7.6z"/><path d="M21 19.5h-8.4"/>',
    note:'<path d="M4 5.6A1.6 1.6 0 0 1 5.6 4h12.8A1.6 1.6 0 0 1 20 5.6V14l-6 6H5.6A1.6 1.6 0 0 1 4 18.4z"/><path d="M20 14h-4.4A1.6 1.6 0 0 0 14 15.6V20"/>',
    undo:'<path d="M4 9.5h9.2A5.8 5.8 0 0 1 13.2 21H8.5"/><path d="M7.8 5.2 3.6 9.5l4.2 4.3"/>',
    redo:'<path d="M20 9.5h-9.2A5.8 5.8 0 0 0 10.8 21h4.7"/><path d="m16.2 5.2 4.2 4.3-4.2 4.3"/>',
    trash:'<path d="M4.5 6.6h15M9.4 6.6V4.8h5.2v1.8"/><path d="M6.6 6.6 7.4 20a1.4 1.4 0 0 0 1.4 1.3h6.4A1.4 1.4 0 0 0 16.6 20l.8-13.4"/>',
    eye:'<path d="M2.2 12S5.9 5.6 12 5.6 21.8 12 21.8 12 18.1 18.4 12 18.4 2.2 12 2.2 12z"/><circle cx="12" cy="12" r="3"/>',
    x:'<path d="m6.5 6.5 11 11M17.5 6.5l-11 11"/>',
    copy:'<rect x="8.5" y="8.5" width="12" height="12" rx="2"/><path d="M15.5 8.5V5a1.5 1.5 0 0 0-1.5-1.5H5A1.5 1.5 0 0 0 3.5 5v9A1.5 1.5 0 0 0 5 15.5h3.5"/>',
    move:'<path d="M12 3v18M3 12h18"/><path d="m9 6 3-3 3 3M9 18l3 3 3-3M6 9l-3 3 3 3M18 9l3 3-3 3"/>',
    chev:'<path d="m7 10 5 5 5-5"/>',
    minus:'<path d="M6 12h12"/>', plus:'<path d="M6 12h12M12 6v12"/>',
    hl:'<path d="m9 15 7.5-7.5a2.1 2.1 0 0 0-3-3L6 12l-1 4z"/><path d="M4 21h16" stroke-width="3.2"/>',
    fill:'<path d="m6 11 6-6 7 7-6 6z"/><path d="M5 12h13"/><path d="M20 17.5a1.5 1.5 0 1 1-3 0c0-1 1.5-2.8 1.5-2.8s1.5 1.8 1.5 2.8z"/>',
    al_left:'<path d="M4 6h16M4 10h10M4 14h16M4 18h10"/>',
    al_center:'<path d="M4 6h16M7 10h10M4 14h16M7 18h10"/>',
    al_right:'<path d="M4 6h16M10 10h10M4 14h16M10 18h10"/>',
    s_ellipse:'<ellipse cx="12" cy="12" rx="9" ry="6.5"/>',
    s_rect:'<rect x="3.5" y="6" width="17" height="12" rx="1.5"/>',
    s_line:'<path d="M4 18 20 6"/>',
    s_arrow:'<path d="M4 18 20 6"/><path d="M12.5 6H20v7.5"/>',
    s_check:'<path d="m4 12.5 5 5L20 6.5"/>',
    s_cross:'<path d="m6 6 12 12M18 6 6 18"/>'
  };
  function svg(name) { return '<svg viewBox="0 0 24 24" aria-hidden="true">' + ICONS[name] + "</svg>"; }

  /* ── avisos ─────────────────────────────────────────────────────── */
  var flashEl, flashT;
  function flash(msg, ms) {
    if (!flashEl) {
      flashEl = document.createElement("div");
      flashEl.className = "vbb-flash";
      flashEl.setAttribute("role", "status");
      document.body.appendChild(flashEl);
    }
    flashEl.textContent = msg;
    flashEl.classList.add("on");
    clearTimeout(flashT);
    flashT = setTimeout(function () { flashEl.classList.remove("on"); }, ms || 2200);
  }

  /* ── fuentes ────────────────────────────────────────────────────── */
  var fontsLoaded = false;
  function loadFonts() {
    if (fontsLoaded) return;
    fontsLoaded = true;
    var fam = FONTS.filter(function (f) { return f.g; }).map(function (f) { return "family=" + f.g; });
    var l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?" + fam.join("&") + "&display=swap";
    (document.head || document.body).appendChild(l);
  }

  /* ── capas por hoja ─────────────────────────────────────────────── */
  function findPages() {
    var sels = [".vpb-page", ".page"];
    for (var s = 0; s < sels.length; s++) {
      var list = document.querySelectorAll(sels[s]);
      if (list.length) return Array.prototype.slice.call(list);
    }
    var one = document.querySelector(".book-container") || document.body;
    return one ? [one] : [];
  }

  function ensureLayer(page, i) {
    if (page.__vbb) return page.__vbb;
    var cs = getComputedStyle(page);
    if (cs.position === "static") page.style.position = "relative";
    var hit = document.createElement("div");
    hit.className = "vbb-hit";
    page.appendChild(hit);
    var layer = { page:page, index:i, hit:hit, tiles:{}, w:0, h:0 };
    page.__vbb = layer;
    state.layers[i] = layer;
    measure(layer);
    bindLayer(layer);
    renderNotes(layer);
    renderTexts(layer);
    renderShapes(layer);
    return layer;
  }

  function measure(layer) {
    var w = layer.page.clientWidth, h = layer.page.clientHeight;
    var changed = (w !== layer.w || h !== layer.h);
    layer.w = w; layer.h = h;
    // Letra y grosores escalan con el ancho de la hoja.
    if (w) layer.page.style.setProperty("--vbb-k", String(w / REF_W));
    if (changed) {
      Object.keys(layer.tiles).forEach(function (t) { dropTile(layer, +t); });
      ownEls(layer, "vbb-shape").forEach(function (el) { layoutShape(layer, el); });
    }
    return changed;
  }
  function ownEls(layer, cls) {
    return Array.prototype.filter.call(layer.page.getElementsByClassName(cls), function (n) {
      return n.parentNode === layer.page;
    });
  }
  function rerenderPage(layer) {
    select(null);
    draw(layer);
    renderNotes(layer);
    renderTexts(layer);
    renderShapes(layer);
    syncTiles();
  }

  /* ── lienzos por tramo, solo cerca de la pantalla ───────────────── */
  function needsInk(layer) {
    return state.on || peek(layer.index).strokes.length > 0;
  }
  function dropTile(layer, t) {
    var tile = layer.tiles[t];
    if (!tile) return;
    tile.cv.width = tile.cv.height = 0;      // devuelve la memoria ya (iOS)
    tile.cv.remove();
    delete layer.tiles[t];
  }
  function makeTile(layer, t) {
    var top = t * TILE, th = Math.min(TILE, layer.h - top);
    if (th <= 0 || !layer.w) return null;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var cv = document.createElement("canvas");
    cv.className = "vbb-cv";
    cv.width = Math.round(layer.w * dpr);
    cv.height = Math.round(th * dpr);
    cv.style.top = top + "px";
    cv.style.width = layer.w + "px";
    cv.style.height = th + "px";
    layer.page.insertBefore(cv, layer.hit);
    var tile = { cv:cv, ctx:cv.getContext("2d"), top:top, h:th, dpr:dpr };
    layer.tiles[t] = tile;
    drawTile(layer, tile);
    return tile;
  }
  function syncTiles() {
    var vh = window.innerHeight || 800;
    var lo = -vh, hi = vh * 2;            // una pantalla de margen a cada lado
    state.layers.forEach(function (layer) {
      if (!layer) return;
      if (!layer.w || !layer.h) measure(layer);
      var r = layer.page.getBoundingClientRect();
      var ink = needsInk(layer) && !state.hidden;
      var n = Math.ceil(layer.h / TILE);
      for (var t = 0; t < n; t++) {
        var top = r.top + t * TILE, bottom = top + TILE;
        var near = ink && bottom > lo && top < hi;
        if (near && !layer.tiles[t]) makeTile(layer, t);
        else if (!near && layer.tiles[t]) dropTile(layer, t);
      }
      Object.keys(layer.tiles).forEach(function (k) { if (+k >= n) dropTile(layer, +k); });
    });
  }
  var syncQueued = false;
  function queueSync() {
    if (syncQueued) return;
    syncQueued = true;
    (window.requestAnimationFrame || setTimeout)(function () { syncQueued = false; syncTiles(); placeCtx(); });
  }

  function strokeBox(s, layer) {
    var y0 = Infinity, y1 = -Infinity;
    for (var i = 0; i < s.pts.length; i++) {
      var y = s.pts[i][1] * layer.h;
      if (y < y0) y0 = y;
      if (y > y1) y1 = y;
    }
    var pad = s.w * (layer.w / REF_W) * 4 + 2;
    return [y0 - pad, y1 + pad];
  }
  function drawTile(layer, tile) {
    var c = tile.ctx;
    c.setTransform(tile.dpr, 0, 0, tile.dpr, 0, -tile.top * tile.dpr);
    c.clearRect(0, tile.top, layer.w, tile.h);
    var scale = layer.w / REF_W;
    peek(layer.index).strokes.forEach(function (s) {
      if (!s.pts || !s.pts.length) return;
      var b = strokeBox(s, layer);
      if (b[1] < tile.top || b[0] > tile.top + tile.h) return;
      c.save();
      c.strokeStyle = s.c;
      c.globalAlpha = (s.t === "m") ? .32 : 1;
      c.lineWidth = Math.max(1, s.w * scale * (s.t === "m" ? 4 : s.t === "u" ? .8 : 1));
      c.lineCap = "round"; c.lineJoin = "round";
      c.beginPath();
      c.moveTo(s.pts[0][0] * layer.w, s.pts[0][1] * layer.h);
      for (var i = 1; i < s.pts.length; i++) c.lineTo(s.pts[i][0] * layer.w, s.pts[i][1] * layer.h);
      if (s.pts.length === 1) c.lineTo(s.pts[0][0] * layer.w + .1, s.pts[0][1] * layer.h);
      c.stroke();
      c.restore();
    });
  }
  // Redibuja solo los tramos que toca la franja [y0, y1] (px de la hoja).
  function draw(layer, y0, y1) {
    if (y0 == null) { y0 = -Infinity; y1 = Infinity; }
    Object.keys(layer.tiles).forEach(function (k) {
      var tile = layer.tiles[k];
      if (y1 < tile.top || y0 > tile.top + tile.h) return;
      drawTile(layer, tile);
    });
  }

  /* ── eventos sobre la hoja (lo que no cae sobre un objeto) ──────── */
  function ptIn(layer, e) {
    var r = layer.hit.getBoundingClientRect();
    return [(e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height];
  }
  function bindLayer(layer) {
    var cur = null, down = null, shape = null, tok = null;
    layer.hit.addEventListener("pointerdown", function (e) {
      if (!state.on || state.hidden) return;
      if (e.button != null && e.button > 0) return;
      var p = ptIn(layer, e);
      if (state.tool === TOOLS.TEXT || state.tool === TOOLS.NOTE) {
        // Se decide al soltar: si el dedo se movio, era scroll, no un toque.
        down = { x:e.clientX, y:e.clientY, p:p };
        return;
      }
      e.preventDefault();
      try { layer.hit.setPointerCapture(e.pointerId); } catch (err) {}
      tok = begin(layer.index);
      if (state.tool === TOOLS.ERASER) { erase(layer, p); layer.erasing = true; return; }
      if (state.tool === TOOLS.SHAPE) {
        shape = newShape(state.shape, p);
        shape.p0 = p;
        pageData(layer.index).shapes.push(shape.obj);
        shape.el = mountShape(layer, shape.obj);
        return;
      }
      if (!Object.keys(layer.tiles).length) syncTiles();
      var t = state.tool === TOOLS.MARKER ? "m" : state.tool === TOOLS.UNDERLINE ? "u" : "p";
      cur = { t:t, c:state.color, w:state.size, pts:[p], ts:Date.now() };
      pageData(layer.index).strokes.push(cur);
      var y = p[1] * layer.h;
      draw(layer, y - 40, y + 40);
    });
    layer.hit.addEventListener("pointermove", function (e) {
      if (!state.on) return;
      if (layer.erasing) { erase(layer, ptIn(layer, e)); return; }
      var p = ptIn(layer, e);
      if (shape) { dragNewShape(layer, shape, p); return; }
      if (!cur) return;
      e.preventDefault();
      var prev = cur.pts[cur.pts.length - 1];
      if (cur.t === "u") {
        // Subrayado recto: de donde se empezo a donde esta el dedo. Si casi
        // es horizontal, se endereza del todo (se subraya un renglon).
        var a = cur.pts[0];
        var dy = Math.abs((p[1] - a[1]) * layer.h), dx = Math.abs((p[0] - a[0]) * layer.w);
        if (dy < Math.max(10, dx * .12)) p = [p[0], a[1]];
        cur.pts = [a, p];
        draw(layer, Math.min(prev[1], p[1], a[1]) * layer.h - 40, Math.max(prev[1], p[1], a[1]) * layer.h + 40);
        return;
      }
      cur.pts.push(p);
      // Solo el tramo del ultimo segmento: en una `.page` de 60 000 px
      // redibujar la hoja entera en cada movimiento se nota.
      var ya = prev[1] * layer.h, yb = p[1] * layer.h;
      draw(layer, Math.min(ya, yb) - 40, Math.max(ya, yb) + 40);
    });
    function finish(e) {
      if (layer.erasing) { layer.erasing = false; }
      if (shape) {
        finishNewShape(layer, shape);
        var sh = shape; shape = null;
        end(tok); tok = null;
        select({ kind:"shape", obj:sh.obj, el:sh.el, layer:layer });
        return;
      }
      if (cur) { cur = null; }
      if (tok) { end(tok); tok = null; }
      if (down && e.type === "pointerup") {
        var moved = Math.abs(e.clientX - down.x) + Math.abs(e.clientY - down.y) > 10;
        var p = down.p;
        down = null;
        if (!moved) {
          // El toque que crea la caja no debe robarle el foco al soltar.
          e.preventDefault();
          if (state.tool === TOOLS.TEXT) addText(layer, p);
          else mutate(layer.index, function () { addNote(layer, p); });
        }
      }
      if (e.type !== "pointerup") down = null;
    }
    // En el movil, tras el pointerup llega un mousedown de compatibilidad que
    // manda el foco al <body>: la caja recien creada se quedaria sin foco,
    // vacia, y se borraria sola.
    layer.hit.addEventListener("mousedown", function (e) {
      if (state.on && (state.tool === TOOLS.TEXT || state.tool === TOOLS.NOTE)) e.preventDefault();
    });
    layer.hit.addEventListener("pointerup", finish);
    layer.hit.addEventListener("pointercancel", finish);
  }

  // Borra el trazo ENTERO que se toca, no un trocito: en un libro se subraya
  // por palabras, y media raya suelta se ve peor que ninguna.
  function erase(layer, p) {
    var d = pageData(layer.index);
    var tol = 10 / layer.w;              // ~10 px de radio, en fracciones
    for (var i = d.strokes.length - 1; i >= 0; i--) {
      var pts = d.strokes[i].pts;
      // El subrayado recto son dos puntos: se mira tambien el segmento.
      if (pts.length === 2) {
        var ax = pts[0][0], ay = pts[0][1] * layer.h / layer.w, bx = pts[1][0], by = pts[1][1] * layer.h / layer.w;
        var px = p[0], py = p[1] * layer.h / layer.w, vx = bx - ax, vy = by - ay;
        var L = vx * vx + vy * vy, u = L ? Math.max(0, Math.min(1, ((px - ax) * vx + (py - ay) * vy) / L)) : 0;
        var qx = ax + u * vx - px, qy = ay + u * vy - py;
        if (qx * qx + qy * qy < tol * tol) { killStroke(layer, d, i); continue; }
      }
      for (var j = 0; j < pts.length; j++) {
        var dx = pts[j][0] - p[0], dy = (pts[j][1] - p[1]) * (layer.h / layer.w);
        if (dx * dx + dy * dy < tol * tol) { killStroke(layer, d, i); break; }
      }
    }
  }
  function killStroke(layer, d, i) {
    var b = strokeBox(d.strokes[i], layer);
    d.strokes.splice(i, 1);
    draw(layer, b[0], b[1]);
  }

  /* ── arrastres genericos ────────────────────────────────────────── */
  // Llama a onMove(dxFrac, dyFrac, e) mientras se arrastra (solo si de verdad
  // hubo arrastre) y a onEnd(moved, e) al soltar.
  function dragger(target, layer, e, onMove, onEnd, threshold) {
    var r = layer.page.getBoundingClientRect();
    var x0 = e.clientX, y0 = e.clientY, moved = false, th = threshold == null ? 4 : threshold;
    try { target.setPointerCapture(e.pointerId); } catch (err) {}
    function mv(ev) {
      if (ev.pointerId !== e.pointerId) return;
      var dx = ev.clientX - x0, dy = ev.clientY - y0;
      if (!moved && Math.abs(dx) + Math.abs(dy) < th) return;
      moved = true;
      ev.preventDefault();
      onMove(dx / r.width, dy / r.height, ev);
      placeCtx();
    }
    function up(ev) {
      if (ev.pointerId !== e.pointerId) return;
      target.removeEventListener("pointermove", mv);
      target.removeEventListener("pointerup", up);
      target.removeEventListener("pointercancel", up);
      onEnd(moved, ev);
      placeCtx();
    }
    target.addEventListener("pointermove", mv);
    target.addEventListener("pointerup", up);
    target.addEventListener("pointercancel", up);
  }
  function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

  /* ── cajas de texto ─────────────────────────────────────────────── */
  function renderTexts(layer) {
    ownEls(layer, "vbb-txt").forEach(function (n) { n.remove(); });
    peek(layer.index).texts.forEach(function (t) { mountText(layer, t); });
  }
  function addText(layer, p) {
    closeEditing();
    var d = state.text;
    var t = { x:p[0], y:p[1], text:"", c:d.c, s:d.s, f:d.f, ts:Date.now() };
    // La foto se toma ANTES de crearla: si se queda vacia y se borra sola,
    // el historial no registra nada.
    state.editTok = begin(layer.index);
    pageData(layer.index).texts.push(t);
    var el = mountText(layer, t);
    startEdit(el);
  }
  function placeText(el, t) {
    el.style.left = (t.x * 100) + "%";
    el.style.top = (t.y * 100) + "%";
    if (t.w) {
      el.style.width = (t.w * 100) + "%";
      el.style.setProperty("max-width", "none", "important");
    } else {
      el.style.width = "";
      el.style.setProperty("max-width", Math.max(8, (1 - t.x) * 100 - 1) + "%", "important");
    }
  }
  // En linea y con !important: las pieles de los libros traen reglas como
  // `.page :not(i){font-family:... !important}`, que le ganan a cualquier
  // hoja de estilos nuestra por especificidad. Al estilo en linea, no.
  function styleText(el, t) {
    var f = fontById(t.f) || FONTS[0];
    var fs = "calc(var(--vbb-k, 1) * " + (t.s || 21) + "px)";
    el.style.setProperty("font-size", fs, "important");
    // La primera linea se apoya en el punto tocado: se sube una linea.
    el.style.setProperty("margin-top", "-1.08em", "important");
    var s = el.__vbbEd.style;
    s.setProperty("color", t.c || "#1e5fa8", "important");
    s.setProperty("font-size", fs, "important");
    s.setProperty("font-family", f.css, "important");
    s.setProperty("font-weight", t.b ? "700" : "500", "important");
    s.setProperty("font-style", t.i ? "italic" : "normal", "important");
    var deco = (t.u ? "underline " : "") + (t.st ? "line-through" : "");
    s.setProperty("text-decoration", deco.trim() || "none", "important");
    s.setProperty("text-align", t.al || "left", "important");
    s.setProperty("background-color", t.hl || "transparent", "important");
    if (f.g) loadFonts();
  }
  function removeText(layer, t, el) {
    var arr = pageData(layer.index).texts, at = arr.indexOf(t);
    if (at >= 0) arr.splice(at, 1);
    if (el) el.remove();
    if (state.sel && state.sel.obj === t) select(null);
  }
  function textEl(layer, t) {
    var hit = null;
    ownEls(layer, "vbb-txt").forEach(function (n) { if (n.__vbbText === t) hit = n; });
    return hit;
  }
  function mountText(layer, t) {
    var el = document.createElement("div");
    el.className = "vbb-txt vbb-obj";
    el.__vbbText = t;
    el.__vbbLayer = layer;

    var mv = document.createElement("span");
    mv.className = "vbb-h vbb-h-move";
    mv.title = "Arrastra para mover";
    mv.innerHTML = svg("move");
    el.appendChild(mv);
    var wh = document.createElement("span");
    wh.className = "vbb-h vbb-h-w";
    wh.title = "Arrastra para hacer la caja m\u00e1s ancha o angosta";
    el.appendChild(wh);

    var ed = document.createElement("div");
    ed.className = "vbb-in";
    ed.spellcheck = false;
    ed.setAttribute("data-ph", "Escribe aqu\u00ed");
    ed.setAttribute("aria-label", "Tu respuesta");
    ed.textContent = t.text || "";
    el.appendChild(ed);
    el.__vbbEd = ed;
    placeText(el, t);
    styleText(el, t);

    function read() {
      var s = (ed.innerText != null ? ed.innerText : ed.textContent) || "";
      return s.replace(/\u00a0/g, " ").replace(/\n$/, "");
    }
    el.__vbbRead = read;

    ed.addEventListener("focus", function () { editState(el); });
    ed.addEventListener("input", function () {
      t.text = read();
      // Un <br> suelto que dejan algunos navegadores al borrar todo impide
      // que vuelva a salir el "Escribe aqui".
      if (!t.text && ed.innerHTML) ed.innerHTML = "";
      save();
      placeCtx();
    });
    ed.addEventListener("blur", function () {
      setTimeout(function () {
        // closeEditing() ya pudo cerrarla: no se cierra dos veces (la segunda
        // se llevaria la sesion de la caja nueva).
        if (document.activeElement === ed || !el.classList.contains("vbb-editing")) return;
        stopEdit(el);
      }, 0);
    });
    ed.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { e.preventDefault(); ed.blur(); return; }
      // Salto de linea como <br>, no como <div>: un <div> nuevo dentro de la
      // hoja se lleva la letra del libro (`.page :not(i)`) hasta que se
      // vuelva a pintar.
      if (e.key === "Enter") {
        e.preventDefault();
        if (!document.execCommand("insertLineBreak")) document.execCommand("insertText", false, "\n");
      }
    });
    // Pegar como texto plano: el libro es HTML con estilos.
    ed.addEventListener("paste", function (e) {
      var cd = e.clipboardData || window.clipboardData;
      if (!cd) return;
      e.preventDefault();
      var s = cd.getData("text/plain") || cd.getData("Text") || "";
      if (!document.execCommand || !document.execCommand("insertText", false, s)) ed.textContent += s;
      t.text = read(); save();
    });

    // Tocar la caja: con el borrador, la quita. Si no se esta escribiendo en
    // ella, arrastrar la mueve y un toque sin arrastre entra a escribir.
    el.addEventListener("pointerdown", function (e) {
      if (!state.on || e.target === mv || e.target === wh || mv.contains(e.target)) return;
      if (state.tool === TOOLS.ERASER) {
        e.preventDefault(); e.stopPropagation();
        mutate(layer.index, function () { removeText(layer, t, el); });
        return;
      }
      if (el.classList.contains("vbb-editing")) return;
      e.preventDefault();
      var tok = null, tx = t.x, ty = t.y;
      dragger(el, layer, e, function (dx, dy) {
        if (!tok) { tok = begin(layer.index); select({ kind:"text", obj:t, el:el, layer:layer }); }
        t.x = clamp(tx + dx, 0, .98); t.y = clamp(ty + dy, 0, 1);
        placeText(el, t);
      }, function (moved, ev) {
        if (moved) { end(tok); return; }
        startEdit(el, ev.clientX, ev.clientY);
      });
    });
    mv.addEventListener("pointerdown", function (e) {
      e.preventDefault(); e.stopPropagation();
      var tok = null, tx = t.x, ty = t.y;
      dragger(mv, layer, e, function (dx, dy) {
        if (!tok) tok = state.editTok ? null : begin(layer.index);
        t.x = clamp(tx + dx, 0, .98); t.y = clamp(ty + dy, 0, 1);
        placeText(el, t);
      }, function (moved) {
        if (moved) { if (tok) end(tok); else save(); }
        if (el.classList.contains("vbb-editing")) ed.focus();
      }, 0);
    });
    wh.addEventListener("pointerdown", function (e) {
      e.preventDefault(); e.stopPropagation();
      var tok = null, w0 = t.w || (el.offsetWidth / layer.w);
      dragger(wh, layer, e, function (dx) {
        if (!tok) tok = state.editTok ? null : begin(layer.index);
        t.w = clamp(w0 + dx, .04, 1 - t.x);
        placeText(el, t);
      }, function (moved) {
        if (moved) { if (tok) end(tok); else save(); }
        if (el.classList.contains("vbb-editing")) ed.focus();
      }, 0);
    });

    layer.page.appendChild(el);
    return el;
  }
  // Deja la caja en modo escritura. Se llama al enfocar Y a mano desde
  // startEdit: si la ventana no tiene el foco, el evento focus no llega.
  function editState(el) {
    var t = el.__vbbText, layer = el.__vbbLayer;
    if (!el.classList.contains("vbb-editing")) {
      el.classList.add("vbb-editing");
      el.__vbbEd.contentEditable = "true";
      if (!state.editTok) state.editTok = begin(layer.index);
    }
    select({ kind:"text", obj:t, el:el, layer:layer }, true);
  }
  function startEdit(el, x, y) {
    var ed = el.__vbbEd;
    ed.contentEditable = "true";
    try { ed.focus({ preventScroll:true }); } catch (err) { ed.focus(); }
    editState(el);
    // El cursor donde se toco (como en Canva), o al final.
    var r = null;
    if (x != null) {
      if (document.caretRangeFromPoint) r = document.caretRangeFromPoint(x, y);
      else if (document.caretPositionFromPoint) {
        var cp = document.caretPositionFromPoint(x, y);
        if (cp) { r = document.createRange(); r.setStart(cp.offsetNode, cp.offset); }
      }
    }
    if (!r || !ed.contains(r.startContainer)) {
      r = document.createRange(); r.selectNodeContents(ed); r.collapse(false);
    }
    r.collapse(true);
    var s = window.getSelection();
    s.removeAllRanges(); s.addRange(r);
  }
  function stopEdit(el) {
    var t = el.__vbbText, layer = el.__vbbLayer, ed = el.__vbbEd;
    el.classList.remove("vbb-editing");
    ed.contentEditable = "false";
    t.text = el.__vbbRead();
    if (!t.text.trim()) removeText(layer, t, el);
    var tok = state.editTok;
    state.editTok = null;
    if (tok) end(tok); else save();
  }
  function closeEditing() {
    var a = document.activeElement;
    if (a && a.classList && a.classList.contains("vbb-in")) {
      a.blur();
      var el = a.parentNode;
      if (el && el.classList.contains("vbb-editing")) stopEdit(el);
    }
  }

  /* ── formas ─────────────────────────────────────────────────────── */
  function isLine(k) { return k === "line" || k === "arrow"; }
  function newShape(k, p) {
    var o = isLine(k)
      ? { k:k, x1:p[0], y1:p[1], x2:p[0], y2:p[1] }
      : { k:k, x:p[0], y:p[1], w:0, h:0 };
    o.c = state.color; o.sw = state.size; o.ts = Date.now();
    if (k === "check") o.c = state.color === QUICK[0] ? "#2D9E75" : state.color;
    if (k === "cross") o.c = state.color === QUICK[0] ? "#C0392B" : state.color;
    return { obj:o };
  }
  function dragNewShape(layer, sh, p) {
    var o = sh.obj, a = sh.p0;
    if (isLine(o.k)) { o.x2 = p[0]; o.y2 = p[1]; }
    else {
      o.x = Math.min(a[0], p[0]); o.y = Math.min(a[1], p[1]);
      o.w = Math.abs(p[0] - a[0]); o.h = Math.abs(p[1] - a[1]);
    }
    layoutShape(layer, sh.el);
  }
  // Un toque sin arrastre pone la forma a un tamano util, centrada en el toque.
  function finishNewShape(layer, sh) {
    var o = sh.obj, a = sh.p0, W = layer.w, H = layer.h;
    if (isLine(o.k)) {
      if (Math.abs(o.x2 - o.x1) * W < 8 && Math.abs(o.y2 - o.y1) * H < 8) {
        o.x1 = a[0] - 60 / W; o.x2 = a[0] + 60 / W; o.y2 = o.y1;
      }
    } else if (o.w * W < 8 && o.h * H < 8) {
      var bw = (o.k === "check" || o.k === "cross") ? 40 : 120, bh = (o.k === "check" || o.k === "cross") ? 40 : 56;
      o.w = bw / W; o.h = bh / H; o.x = a[0] - o.w / 2; o.y = a[1] - o.h / 2;
    }
    layoutShape(layer, sh.el);
  }
  function renderShapes(layer) {
    ownEls(layer, "vbb-shape").forEach(function (n) { n.remove(); });
    peek(layer.index).shapes.forEach(function (s) { mountShape(layer, s); });
  }
  function shapeEl(layer, s) {
    var hit = null;
    ownEls(layer, "vbb-shape").forEach(function (n) { if (n.__vbbShape === s) hit = n; });
    return hit;
  }
  function mountShape(layer, s) {
    var el = document.createElement("div");
    el.className = "vbb-shape vbb-obj" + (isLine(s.k) ? " vbb-line" : "");
    el.__vbbShape = s;
    el.__vbbLayer = layer;
    var hs = isLine(s.k) ? ["p1", "p2"] : ["tl", "tr", "bl", "br"];
    hs.forEach(function (h) {
      var hd = document.createElement("span");
      hd.className = "vbb-h vbb-h-pt";
      hd.setAttribute("data-h", h);
      hd.addEventListener("pointerdown", function (e) { resizeShape(layer, el, h, e); });
      el.appendChild(hd);
    });
    layer.page.appendChild(el);
    layoutShape(layer, el);

    el.addEventListener("pointerdown", function (e) {
      if (!state.on || (e.target.classList && e.target.classList.contains("vbb-h"))) return;
      e.preventDefault(); e.stopPropagation();
      if (state.tool === TOOLS.ERASER) {
        mutate(layer.index, function () { removeShape(layer, s, el); });
        return;
      }
      closeEditing();
      select({ kind:"shape", obj:s, el:el, layer:layer });
      var tok = null, o0 = clone(s);
      dragger(el, layer, e, function (dx, dy) {
        if (!tok) tok = begin(layer.index);
        if (isLine(s.k)) {
          s.x1 = o0.x1 + dx; s.x2 = o0.x2 + dx; s.y1 = o0.y1 + dy; s.y2 = o0.y2 + dy;
        } else { s.x = o0.x + dx; s.y = o0.y + dy; }
        layoutShape(layer, el);
      }, function (moved) { if (moved) end(tok); });
    });
    return el;
  }
  function resizeShape(layer, el, h, e) {
    e.preventDefault(); e.stopPropagation();
    var s = el.__vbbShape, tok = begin(layer.index), r = layer.page.getBoundingClientRect();
    var right = s.x + s.w, bottom = s.y + s.h, min = 6 / layer.w;
    dragger(e.target, layer, e, function (dx, dy, ev) {
      var px = (ev.clientX - r.left) / r.width, py = (ev.clientY - r.top) / r.height;
      if (h === "p1") { s.x1 = px; s.y1 = py; }
      else if (h === "p2") { s.x2 = px; s.y2 = py; }
      else {
        if (h.indexOf("l") >= 0) { s.x = Math.min(px, right - min); s.w = right - s.x; }
        else s.w = Math.max(min, px - s.x);
        if (h.indexOf("t") >= 0) { s.y = Math.min(py, bottom - min); s.h = bottom - s.y; }
        else s.h = Math.max(min, py - s.y);
      }
      layoutShape(layer, el);
    }, function () { end(tok); }, 0);
  }
  function removeShape(layer, s, el) {
    var arr = pageData(layer.index).shapes, at = arr.indexOf(s);
    if (at >= 0) arr.splice(at, 1);
    if (el) el.remove();
    if (state.sel && state.sel.obj === s) select(null);
  }
  // La geometria va en pixeles reales de la hoja (se recalcula al
  // re-maquetar), no en un viewBox estirado: asi el grosor y la punta de la
  // flecha no se deforman cuando la forma es alargada.
  function layoutShape(layer, el) {
    var s = el.__vbbShape, W = layer.w || 1, H = layer.h || 1;
    var k = W / REF_W, sw = Math.max(1.2, (s.sw || 4) * k * .9), c = s.c || "#1e5fa8";
    var bx, by, bw, bh, d = "", fillHit = false, extra = "";
    if (isLine(s.k)) {
      bx = Math.min(s.x1, s.x2); by = Math.min(s.y1, s.y2);
      bw = Math.abs(s.x2 - s.x1); bh = Math.abs(s.y2 - s.y1);
      var ax = (s.x1 - bx) * W, ay = (s.y1 - by) * H, cx = (s.x2 - bx) * W, cy = (s.y2 - by) * H;
      d = "M" + ax + " " + ay + "L" + cx + " " + cy;
      if (s.k === "arrow") {
        var ang = Math.atan2(cy - ay, cx - ax), L = Math.max(10, sw * 4.2), sp = .45;
        d += "M" + (cx - L * Math.cos(ang - sp)) + " " + (cy - L * Math.sin(ang - sp)) +
             "L" + cx + " " + cy +
             "L" + (cx - L * Math.cos(ang + sp)) + " " + (cy - L * Math.sin(ang + sp));
      }
      var hds = el.querySelectorAll(".vbb-h-pt");
      if (hds[0]) { hds[0].style.left = ax + "px"; hds[0].style.top = ay + "px"; }
      if (hds[1]) { hds[1].style.left = cx + "px"; hds[1].style.top = cy + "px"; }
    } else {
      bx = s.x; by = s.y; bw = s.w; bh = s.h;
      var w = bw * W, h = bh * H;
      if (s.k === "rect") d = "M0 0H" + w + "V" + h + "H0Z";
      else if (s.k === "ellipse") {
        d = "M0 " + h / 2 + "A" + w / 2 + " " + h / 2 + " 0 1 0 " + w + " " + h / 2 +
            "A" + w / 2 + " " + h / 2 + " 0 1 0 0 " + h / 2 + "Z";
      } else if (s.k === "check") {
        d = "M" + w * .06 + " " + h * .55 + "L" + w * .38 + " " + h * .88 + "L" + w * .94 + " " + h * .1;
      } else if (s.k === "cross") {
        d = "M" + w * .12 + " " + h * .12 + "L" + w * .88 + " " + h * .88 +
            "M" + w * .88 + " " + h * .12 + "L" + w * .12 + " " + h * .88;
      }
      fillHit = !!s.fill;
      var pos = { tl:[0, 0], tr:[w, 0], bl:[0, h], br:[w, h] };
      Array.prototype.forEach.call(el.querySelectorAll(".vbb-h-pt"), function (hd) {
        var q = pos[hd.getAttribute("data-h")];
        hd.style.left = q[0] + "px"; hd.style.top = q[1] + "px";
      });
      if ((s.k === "check" || s.k === "cross")) sw *= 1.5;
    }
    el.style.left = (bx * 100) + "%";
    el.style.top = (by * 100) + "%";
    el.style.width = (bw * W) + "px";
    el.style.height = (bh * H) + "px";
    var fill = (s.fill && !isLine(s.k)) ? c : "none";
    var old = el.querySelector("svg");
    if (old) old.remove();
    var ns = "http://www.w3.org/2000/svg";
    var g = document.createElementNS(ns, "svg");
    g.setAttribute("aria-hidden", "true");
    g.innerHTML =
      '<path d="' + d + '" fill="' + fill + '" fill-opacity=".22" stroke="' + c + '" stroke-width="' + sw +
        '" stroke-linecap="round" stroke-linejoin="round"/>' + extra +
      '<path class="vbb-hitp' + (fillHit ? " vbb-fillhit" : "") + '" d="' + d +
        '" fill="transparent" stroke="transparent" stroke-width="' + Math.max(16, sw + 12) + '"/>';
    el.insertBefore(g, el.firstChild);
  }

  /* ── seleccion y barra contextual ───────────────────────────────── */
  var ctx, pop;
  function select(sel, keepFocus) {
    var prev = state.sel;
    if (prev && sel && prev.obj === sel.obj) {
      state.sel = sel;
      buildCtx(); placeCtx();
      return;
    }
    if (prev && prev.el) prev.el.classList.remove("vbb-sel");
    state.sel = sel;
    closePop();
    if (!sel) {
      if (!keepFocus) closeEditing();
      ctx.classList.remove("on");
      return;
    }
    sel.el.classList.add("vbb-sel");
    buildCtx();
    placeCtx();
  }
  function placeCtx() {
    var sel = state.sel;
    if (!sel || !ctx.classList.contains("on")) return;
    if (!sel.el.isConnected) { select(null); return; }
    if (window.innerWidth <= 600) { ctx.style.left = ctx.style.top = ""; return; }
    var r = sel.el.getBoundingClientRect(), cw = ctx.offsetWidth, ch = ctx.offsetHeight;
    var top = r.top - ch - 40;                       // encima (deja sitio al asa de mover)
    if (top < 8) top = r.bottom + 14;
    if (top + ch > window.innerHeight - 8) top = Math.max(8, window.innerHeight - ch - 8);
    var left = clamp(r.left + r.width / 2 - cw / 2, 8, Math.max(8, window.innerWidth - cw - 70));
    ctx.style.left = left + "px";
    ctx.style.top = top + "px";
  }

  function cbtn(html, tip, fn, cls) {
    var b = document.createElement("button");
    b.type = "button"; b.title = tip; b.setAttribute("aria-label", tip);
    b.innerHTML = html;
    if (cls) b.className = cls;
    b.addEventListener("click", function (e) {
      e.stopPropagation();
      if (pop.__anchor !== b) closePop();
      fn(b, e);
    });
    ctx.appendChild(b);
    return b;
  }
  function vsep() { var s = document.createElement("span"); s.className = "vbb-vs"; ctx.appendChild(s); }

  // Aplica un cambio al objeto seleccionado, lo repinta y recuerda el estilo
  // para la siguiente caja (en Canva la caja nueva sale como la ultima).
  function applySel(fn) {
    var sel = state.sel;
    if (!sel) return;
    change(sel.layer, function () { fn(sel.obj); });
    if (sel.kind === "text") {
      placeText(sel.el, sel.obj); styleText(sel.el, sel.obj);
      state.text = { f:sel.obj.f || "sys", s:sel.obj.s || 21, c:sel.obj.c || state.text.c };
      savePrefs();
      if (sel.el.classList.contains("vbb-editing")) sel.el.__vbbEd.focus();
    } else layoutShape(sel.layer, sel.el);
    buildCtx(); placeCtx();
  }

  function buildCtx() {
    var sel = state.sel;
    ctx.innerHTML = "";
    if (!sel) return;
    var o = sel.obj;
    if (sel.kind === "text") {
      var f = fontById(o.f) || FONTS[0];
      var fb = cbtn("<span>" + f.name + "</span>" + svg("chev"), "Fuente", function (b) {
        openPop(b, function (p) {
          FONTS.forEach(function (ff) {
            var x = document.createElement("button");
            x.type = "button";
            x.className = "vbb-fontopt" + (ff.id === (o.f || "sys") ? " on" : "");
            x.textContent = ff.name;
            x.style.setProperty("font-family", ff.css, "important");
            x.addEventListener("click", function () { closePop(); applySel(function (t) { t.f = ff.id; }); });
            p.appendChild(x);
          });
        });
      }, "vbb-font");
      fb.firstChild.style.setProperty("font-family", f.css, "important");
      vsep();
      cbtn(svg("minus"), "Letra m\u00e1s chica", function () { applySel(function (t) { t.s = stepSize(t.s || 21, -1); }); });
      var num = document.createElement("input");
      num.className = "vbb-num"; num.type = "text"; num.inputMode = "numeric";
      num.value = Math.round(o.s || 21); num.title = "Tama\u00f1o de letra";
      num.addEventListener("change", function () {
        var v = parseInt(num.value, 10);
        if (v) applySel(function (t) { t.s = clamp(v, 8, 120); });
      });
      num.addEventListener("keydown", function (e) { if (e.key === "Enter") num.blur(); });
      ctx.appendChild(num);
      cbtn(svg("plus"), "Letra m\u00e1s grande", function () { applySel(function (t) { t.s = stepSize(t.s || 21, 1); }); });
      vsep();
      cbtn('<span class="vbb-A">A<b style="background:' + (o.c || "#1e5fa8") + '"></b></span>', "Color de letra", function (b) {
        openPop(b, function (p) { paletteInto(p, "Color de letra", PALETTE, o.c, function (c) { applySel(function (t) { t.c = c; }); }, true); });
      });
      cbtn(svg("hl"), "Fondo del texto (resaltar)", function (b) {
        openPop(b, function (p) {
          paletteInto(p, "Fondo del texto", [""].concat(HIGHLIGHTS), o.hl || "", function (c) {
            applySel(function (t) { if (c) t.hl = c; else delete t.hl; });
          }, true);
        });
      }, o.hl ? "on" : "");
      vsep();
      [["b", "B", "Negrita", "font-weight:800"], ["i", "I", "Cursiva", "font-style:italic"],
       ["u", "U", "Subrayado", "text-decoration:underline"], ["st", "S", "Tachado", "text-decoration:line-through"]]
        .forEach(function (q) {
          cbtn('<span style="' + q[3] + '">' + q[1] + "</span>", q[2], function () {
            applySel(function (t) { if (t[q[0]]) delete t[q[0]]; else t[q[0]] = 1; });
          }, "vbb-fmt" + (o[q[0]] ? " on" : ""));
        });
      var al = o.al || "left", nextAl = { left:"center", center:"right", right:"left" }[al];
      cbtn(svg("al_" + al), "Alineaci\u00f3n", function () {
        applySel(function (t) { if (nextAl === "left") delete t.al; else t.al = nextAl; });
      });
    } else {
      cbtn('<span class="vbb-sw" style="background:' + (o.c || "#1e5fa8") + ';width:18px;height:18px"></span>', "Color", function (b) {
        openPop(b, function (p) { paletteInto(p, "Color", PALETTE, o.c, function (c) { applySel(function (s) { s.c = c; }); }, true); });
      });
      if (o.k === "rect" || o.k === "ellipse") {
        cbtn(svg("fill"), "Relleno", function () {
          applySel(function (s) { if (s.fill) delete s.fill; else s.fill = 1; });
        }, o.fill ? "on" : "");
      }
      vsep();
      cbtn(svg("minus"), "L\u00ednea m\u00e1s delgada", function () { applySel(function (s) { s.sw = clamp((s.sw || 4) - 1, 1, 24); }); });
      var n2 = document.createElement("input");
      n2.className = "vbb-num"; n2.type = "text"; n2.inputMode = "numeric";
      n2.value = o.sw || 4; n2.title = "Grosor";
      n2.addEventListener("change", function () {
        var v = parseInt(n2.value, 10);
        if (v) applySel(function (s) { s.sw = clamp(v, 1, 24); });
      });
      n2.addEventListener("keydown", function (e) { if (e.key === "Enter") n2.blur(); });
      ctx.appendChild(n2);
      cbtn(svg("plus"), "L\u00ednea m\u00e1s gruesa", function () { applySel(function (s) { s.sw = clamp((s.sw || 4) + 1, 1, 24); }); });
    }
    vsep();
    cbtn(svg("copy"), "Duplicar (Ctrl+D)", duplicateSel);
    cbtn(svg("trash"), "Borrar (Supr)", deleteSel);
    ctx.classList.add("on");
  }
  function stepSize(s, dir) {
    var step = s < 20 ? 1 : s < 40 ? 2 : 4;
    return clamp(Math.round(s + dir * step), 8, 120);
  }

  function paletteInto(p, label, colors, current, pick, custom) {
    var l = document.createElement("div");
    l.className = "vbb-lbl"; l.textContent = label;
    p.appendChild(l);
    var g = document.createElement("div");
    g.className = "vbb-grid";
    colors.forEach(function (c) {
      var i = document.createElement("button");
      i.type = "button";
      i.className = "vbb-sw" + (c ? "" : " vbb-none") + ((c || "") === (current || "") ? " on" : "");
      if (c) i.style.background = c;
      i.title = c ? c : "Sin fondo";
      i.addEventListener("click", function () { closePop(); pick(c); });
      g.appendChild(i);
    });
    if (custom) g.appendChild(customColor(current, function (c) { pick(c); }));
    p.appendChild(g);
  }
  function customColor(current, pick) {
    var w = document.createElement("label");
    w.className = "vbb-sw vbb-rainbow";
    w.title = "Otro color";
    var inp = document.createElement("input");
    inp.type = "color";
    inp.value = /^#[0-9a-f]{6}$/i.test(current || "") ? current : "#1e5fa8";
    inp.addEventListener("change", function () { pick(inp.value); });
    w.appendChild(inp);
    return w;
  }

  function openPop(anchor, fill) {
    if (pop.classList.contains("on") && pop.__anchor === anchor) { closePop(); return; }
    pop.innerHTML = "";
    fill(pop);
    pop.__anchor = anchor;
    pop.classList.add("on");
    if (window.innerWidth <= 600) { pop.style.left = pop.style.top = ""; return; }
    var r = anchor.getBoundingClientRect(), pw = pop.offsetWidth, ph = pop.offsetHeight;
    var top = r.bottom + 6;
    if (top + ph > window.innerHeight - 8) top = Math.max(8, r.top - ph - 6);
    var left = clamp(r.left, 8, window.innerWidth - pw - 8);
    // Junto a la barra lateral, el desplegable sale a su izquierda.
    if (state.bar.contains(anchor)) { left = r.left - pw - 10; top = clamp(r.top, 8, window.innerHeight - ph - 8); }
    pop.style.left = left + "px";
    pop.style.top = top + "px";
  }
  function closePop() {
    if (!pop) return;
    pop.classList.remove("on");
    pop.__anchor = null;
  }

  function duplicateSel() {
    var sel = state.sel;
    if (!sel) return;
    closeEditing();
    var o = clone(sel.obj), dx = 16 / sel.layer.w, dy = 16 / sel.layer.h, el;
    o.ts = Date.now();
    mutate(sel.layer.index, function () {
      if (sel.kind === "text") {
        o.x = clamp(o.x + dx, 0, .98); o.y = clamp(o.y + dy, 0, 1);
        pageData(sel.layer.index).texts.push(o);
        el = mountText(sel.layer, o);
      } else {
        if (isLine(o.k)) { o.x1 += dx; o.x2 += dx; o.y1 += dy; o.y2 += dy; }
        else { o.x += dx; o.y += dy; }
        pageData(sel.layer.index).shapes.push(o);
        el = mountShape(sel.layer, o);
      }
    });
    select({ kind:sel.kind, obj:o, el:el, layer:sel.layer });
  }
  function deleteSel() {
    var sel = state.sel;
    if (!sel) return;
    if (sel.kind === "text") {
      var editing = sel.el.classList.contains("vbb-editing");
      // Si se estaba escribiendo, la sesion de edicion ya tiene la foto de
      // antes: borrar cierra esa sesion y queda como un solo paso.
      if (editing && state.editTok) {
        removeText(sel.layer, sel.obj, sel.el);
        var tok = state.editTok; state.editTok = null; end(tok);
        return;
      }
      mutate(sel.layer.index, function () { removeText(sel.layer, sel.obj, sel.el); });
    } else {
      mutate(sel.layer.index, function () { removeShape(sel.layer, sel.obj, sel.el); });
    }
  }
  function nudge(dx, dy) {
    var sel = state.sel;
    if (!sel) return;
    var fx = dx / sel.layer.w, fy = dy / sel.layer.h;
    mutate(sel.layer.index, function () {
      var o = sel.obj;
      if (sel.kind === "text") { o.x += fx; o.y += fy; placeText(sel.el, o); }
      else {
        if (isLine(o.k)) { o.x1 += fx; o.x2 += fx; o.y1 += fy; o.y2 += fy; }
        else { o.x += fx; o.y += fy; }
        layoutShape(sel.layer, sel.el);
      }
    });
    placeCtx();
  }

  /* ── notas ──────────────────────────────────────────────────────── */
  function renderNotes(layer) {
    ownEls(layer, "vbb-note").forEach(function (n) { n.remove(); });
    peek(layer.index).notes.forEach(function (n) { mountNote(layer, n); });
  }
  function addNote(layer, p) {
    var n = { x:p[0], y:p[1], text:"", ts:Date.now() };
    pageData(layer.index).notes.push(n);
    mountNote(layer, n, true);
  }
  function mountNote(layer, n, focus) {
    var el = document.createElement("div");
    el.className = "vbb-note";
    el.style.left = (n.x * 100) + "%";
    el.style.top = (n.y * 100) + "%";
    el.innerHTML = '<span class="vbb-note-grip" title="Arrastra para mover">&#9776;</span>' +
                   '<button class="vbb-note-x" title="Borrar nota" type="button">&times;</button>';
    var body = document.createElement("div");
    body.contentEditable = "true";
    body.style.marginTop = "12px";
    body.textContent = n.text || "";
    body.addEventListener("input", function () { n.text = body.textContent; save(); });
    el.appendChild(body);

    el.querySelector(".vbb-note-x").addEventListener("click", function () {
      mutate(layer.index, function () {
        var arr = pageData(layer.index).notes, at = arr.indexOf(n);
        if (at >= 0) arr.splice(at, 1);
        el.remove();
      });
    });
    // Arrastre por el asa: el cuerpo es editable, asi que arrastrar desde el
    // texto seleccionaria en vez de mover.
    var grip = el.querySelector(".vbb-note-grip");
    grip.addEventListener("pointerdown", function (e) {
      e.preventDefault();
      var tok = null, x0 = n.x, y0 = n.y;
      dragger(grip, layer, e, function (dx, dy) {
        if (!tok) tok = begin(layer.index);
        n.x = clamp(x0 + dx, 0, .94); n.y = clamp(y0 + dy, 0, .97);
        el.style.left = (n.x * 100) + "%";
        el.style.top = (n.y * 100) + "%";
      }, function (moved) { if (moved) end(tok); }, 0);
    });

    layer.page.appendChild(el);
    if (focus) { body.focus(); }
  }

  /* ── interfaz ───────────────────────────────────────────────────── */
  var toolBtns = {}, histBtns = {};
  function build() {
    var st = document.createElement("style");
    st.textContent = CSS;
    (document.head || document.body).appendChild(st);

    var fab = document.createElement("button");
    fab.type = "button";
    fab.className = "vbb-fab";
    fab.title = "Escribe tus respuestas encima del libro";
    fab.innerHTML = svg("write") + "<span>Escribir</span>";
    fab.addEventListener("click", function () { toggle(true); });
    document.body.appendChild(fab);
    state.fab = fab;

    ctx = document.createElement("div");
    ctx.className = "vbb-ctx";
    ctx.setAttribute("role", "toolbar");
    ctx.setAttribute("aria-label", "Formato del elemento seleccionado");
    pop = document.createElement("div");
    pop.className = "vbb-pop";
    // Tocar las barras no debe quitarle el foco a la caja en la que se
    // escribe: asi el formato se le aplica a ella. (Los <input> si lo toman.)
    [ctx, pop].forEach(function (x) {
      x.addEventListener("mousedown", function (e) { if (!/^(INPUT|LABEL)$/.test(e.target.tagName)) e.preventDefault(); });
      document.body.appendChild(x);
    });

    var bar = document.createElement("div");
    bar.className = "vbb-bar";
    bar.setAttribute("role", "toolbar");
    bar.setAttribute("aria-label", "Escribir sobre el libro");
    bar.addEventListener("mousedown", function (e) { if (!/^(INPUT|LABEL)$/.test(e.target.tagName)) e.preventDefault(); });
    document.body.appendChild(bar);
    state.bar = bar;

    function btn(html, tip, fn, tool) {
      var b = document.createElement("button");
      b.type = "button"; b.title = tip; b.setAttribute("aria-label", tip);
      b.innerHTML = html;
      if (tool) { b.dataset.tool = tool; toolBtns[tool] = b; }
      b.addEventListener("click", function (e) { e.stopPropagation(); fn(b); });
      bar.appendChild(b);
      return b;
    }
    function sep() { var s = document.createElement("div"); s.className = "vbb-sep"; bar.appendChild(s); }

    btn('<span class="vbb-aa">Aa</span>', "Texto: toca donde va la respuesta y escribe",
        function () { setTool(TOOLS.TEXT); }, TOOLS.TEXT);
    btn(svg("s_" + state.shape), "Formas: c\u00edrculo, rect\u00e1ngulo, l\u00ednea, flecha, palomita, tache", function (b) {
      setTool(TOOLS.SHAPE);
      openPop(b, function (p) {
        var g = document.createElement("div");
        g.className = "vbb-shapes";
        SHAPES.forEach(function (s) {
          var x = document.createElement("button");
          x.type = "button"; x.title = s.name; x.setAttribute("aria-label", s.name);
          x.className = s.k === state.shape ? "on" : "";
          x.innerHTML = svg("s_" + s.k);
          x.addEventListener("click", function () {
            state.shape = s.k; savePrefs();
            toolBtns[TOOLS.SHAPE].innerHTML = svg("s_" + s.k);
            closePop();
            flash("Arrastra sobre la hoja para dibujar " + s.name.toLowerCase());
          });
          g.appendChild(x);
        });
        p.appendChild(g);
      });
    }, TOOLS.SHAPE);
    btn(svg("pen"), "Escribir a mano", function () { setTool(TOOLS.PEN); }, TOOLS.PEN);
    btn(svg("marker"), "Resaltar", function () { setTool(TOOLS.MARKER); }, TOOLS.MARKER);
    btn(svg("underline"), "Subrayar con l\u00ednea recta", function () { setTool(TOOLS.UNDERLINE); }, TOOLS.UNDERLINE);
    btn(svg("note"), "Pegar una nota", function () { setTool(TOOLS.NOTE); }, TOOLS.NOTE);
    btn(svg("eraser"), "Borrador: toca un trazo, texto o forma", function () { setTool(TOOLS.ERASER); }, TOOLS.ERASER);
    sep();

    var colors = document.createElement("div");
    colors.className = "vbb-colors";
    function markColor() {
      Array.prototype.forEach.call(colors.children, function (x) {
        x.classList.toggle("on", x.__c === state.color);
      });
    }
    function pickColor(c) {
      state.color = c; savePrefs(); markColor();
      var sel = state.sel;
      if (sel) applySel(function (o) { o.c = c; });
      else { state.text.c = c; savePrefs(); }
    }
    QUICK.forEach(function (c) {
      var i = document.createElement("button");
      i.type = "button";
      i.className = "vbb-sw";
      i.style.background = c;
      i.title = "Color";
      i.__c = c;
      i.addEventListener("click", function (e) { e.stopPropagation(); pickColor(c); });
      colors.appendChild(i);
    });
    colors.appendChild(customColor(state.color, pickColor));
    bar.appendChild(colors);
    markColor();

    var sizes = document.createElement("div");
    sizes.className = "vbb-sizes";
    SIZES.forEach(function (s) {
      var i = document.createElement("i");
      i.style.width = i.style.height = (s + 4) + "px";
      i.title = "Grosor del l\u00e1piz";
      i.className = s === state.size ? "on" : "";
      i.addEventListener("click", function () {
        state.size = s; savePrefs();
        sizes.querySelectorAll("i").forEach(function (x) { x.classList.toggle("on", x === i); });
      });
      sizes.appendChild(i);
    });
    bar.appendChild(sizes);
    sep();

    histBtns.undo = btn(svg("undo"), "Deshacer (Ctrl+Z)", undo);
    histBtns.redo = btn(svg("redo"), "Rehacer (Ctrl+Y)", redo);
    btn(svg("eye"), "Ocultar / mostrar tus respuestas", function () {
      state.hidden = !state.hidden;
      document.body.classList.toggle("vbb-hidden", state.hidden);
      select(null);
      syncTiles();
      flash(state.hidden ? "Respuestas ocultas" : "Respuestas visibles");
    });
    btn(svg("trash"), "Borrar TODO lo que escribiste en este libro", clearAll);
    sep();
    btn(svg("x"), "Terminar (tus respuestas se quedan guardadas)", function () { toggle(false); });

    setTool(state.tool);
    refreshHistoryButtons();
  }
  function refreshHistoryButtons() {
    if (histBtns.undo) histBtns.undo.disabled = !state.undo.length;
    if (histBtns.redo) histBtns.redo.disabled = !state.redo.length;
  }

  function setTool(t) {
    state.tool = t;
    savePrefs();
    var typing = (t === TOOLS.TEXT || t === TOOLS.NOTE);
    document.body.classList.toggle("vbb-type", typing);
    document.body.classList.toggle("vbb-draw", !typing);
    document.body.classList.toggle("vbb-pick", t === TOOLS.SHAPE);
    document.body.classList.toggle("vbb-erase", t === TOOLS.ERASER);
    Object.keys(toolBtns).forEach(function (k) { toolBtns[k].classList.toggle("on", k === t); });
    if (t !== TOOLS.SHAPE) closePop();
    if (t !== TOOLS.TEXT && t !== TOOLS.SHAPE && state.sel) select(null);
  }

  function clearAll() {
    if (!hasAnything()) { flash("Todav\u00eda no has escrito nada en este libro"); return; }
    if (!confirm("\u00bfBorrar TODO lo que escribiste en este libro? No se puede deshacer.")) return;
    select(null);
    state.data = { pages:{} };
    state.undo = []; state.redo = [];
    refreshHistoryButtons();
    state.layers.forEach(function (l) { if (l) rerenderPage(l); });
    save();
    flash("Libro limpio");
  }

  function toggle(on) {
    state.on = on;
    document.body.classList.toggle("vbb-on", on);
    state.fab.style.display = on ? "none" : "";     // la barra ocupa su sitio
    if (on) {
      if (state.hidden) {
        state.hidden = false;
        document.body.classList.remove("vbb-hidden");
      }
      loadFonts();
      mountAll();
      setTool(state.tool);
      flash(state.tool === TOOLS.TEXT
        ? "Toca el espacio del ejercicio y escribe tu respuesta"
        : "Escribe, dibuja o marca sobre el libro", 3200);
    } else {
      select(null);
      closeEditing();
      flash("Tus respuestas se quedan guardadas en este libro");
    }
    syncTiles();
  }

  function mountAll() {
    findPages().forEach(function (p, i) { ensureLayer(p, i); });
  }

  /* ── teclado ────────────────────────────────────────────────────── */
  function onKey(e) {
    if (!state.on) return;
    var a = document.activeElement;
    var typing = a && (a.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName));
    var mod = e.ctrlKey || e.metaKey, k = e.key;
    if (k === "Escape") { closePop(); if (!typing) select(null); return; }
    if (typing) return;
    if (mod && (k === "z" || k === "Z")) { e.preventDefault(); if (e.shiftKey) redo(); else undo(); return; }
    if (mod && (k === "y" || k === "Y")) { e.preventDefault(); redo(); return; }
    if (!state.sel) return;
    if (k === "Delete" || k === "Backspace") { e.preventDefault(); deleteSel(); return; }
    if (mod && (k === "d" || k === "D")) { e.preventDefault(); duplicateSel(); return; }
    if (k === "Enter" && state.sel.kind === "text") { e.preventDefault(); startEdit(state.sel.el); return; }
    var n = e.shiftKey ? 10 : 1;
    if (k === "ArrowLeft") { e.preventDefault(); nudge(-n, 0); }
    else if (k === "ArrowRight") { e.preventDefault(); nudge(n, 0); }
    else if (k === "ArrowUp") { e.preventDefault(); nudge(0, -n); }
    else if (k === "ArrowDown") { e.preventDefault(); nudge(0, n); }
  }

  /* ── arranque ───────────────────────────────────────────────────── */
  function init(opts) {
    opts = opts || {};
    state.bookId = String(opts.bookId || "libro").slice(0, 60);
    load();
    build();

    // Tocar fuera de lo seleccionado (y de las barras) suelta la seleccion.
    document.addEventListener("pointerdown", function (e) {
      var t = e.target;
      if (!t || !t.closest) return;
      if (t.closest(".vbb-pop")) return;
      if (!t.closest(".vbb-ctx")) {
        var anchor = pop.__anchor;
        if (!(anchor && anchor.contains(t))) closePop();
      }
      if (t.closest(".vbb-obj,.vbb-ctx,.vbb-bar")) return;
      if (state.sel) select(null);
    }, true);
    document.addEventListener("keydown", onKey);

    // Las hojas se re-miden cuando el libro cambia de alto: imagenes que
    // acaban de cargar, ampliar el texto, girar el movil o abrir el dialogo
    // de impresion. Sin esto el subrayado sale desplazado de su parrafo.
    var relayout = function () {
      state.layers.forEach(function (l) { if (l) measure(l); });
      syncTiles();
      placeCtx();
    };
    window.addEventListener("resize", relayout);
    window.addEventListener("load", relayout);
    window.addEventListener("scroll", queueSync, { passive:true });
    if (window.ResizeObserver) {
      var ro = new ResizeObserver(function () { relayout(); });
      // Observar el <body> basta: cualquier re-maquetado del libro le cambia
      // el alto, y observar cada hoja en un libro largo cuesta mas de lo que
      // ahorra.
      ro.observe(document.body);
    }
    // Al imprimir hacen falta TODOS los tramos, no solo los de la pantalla.
    window.addEventListener("beforeprint", function () {
      select(null);
      if (state.hidden) return;
      state.layers.forEach(function (l) {
        if (!l || !peek(l.index).strokes.length) return;
        measure(l);
        for (var t = 0; t < Math.ceil(l.h / TILE); t++) if (!l.tiles[t]) makeTile(l, t);
      });
    });
    window.addEventListener("afterprint", queueSync);

    // Si el alumno ya habia escrito en este libro, sus respuestas se montan
    // solas al abrirlo: tienen que estar ahi antes de que las busque.
    if (hasAnything()) {
      var fancy = Object.keys(state.data.pages).some(function (k) {
        return (state.data.pages[k].texts || []).some(function (t) { return t.f && t.f !== "sys"; });
      });
      if (fancy) loadFonts();
      mountAll(); syncTiles();
    }
  }

  global.VesperBookBoard = { init:init, toggle:toggle };
})(window);
