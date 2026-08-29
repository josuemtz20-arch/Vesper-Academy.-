/* ==========================================================================
   VESPER · Pizarra sobre el libro (vesper_book_board.js)
   --------------------------------------------------------------------------
   Lleva las herramientas de la Pizarra Virtual (/whiteboard/) DENTRO del libro
   del alumno: subrayar, escribir a mano y pegar notas encima de la propia
   hoja, sin sacar al alumno del libro ni convertir el libro en una imagen.

   Lo inyecta libro.html en el documento del libro (que se crea con
   document.write, asi que aqui no hay ni Firebase ni el resto de la pagina
   anfitriona: este archivo no depende de nada).

   TRES DECISIONES QUE EXPLICAN EL RESTO
   1. Una capa POR HOJA (.page), no una capa gigante. Un libro son decenas de
      hojas y varios miles de pixeles de alto; un solo lienzo de esa altura se
      sale del limite de textura de los navegadores moviles y se queda en
      negro.
   2. Los trazos se guardan en coordenadas NORMALIZADAS (0..1 sobre el ancho y
      el alto de su hoja), nunca en pixeles. El libro se re-maqueta al cambiar
      de movil a escritorio, al ampliar el texto o al imprimir: en pixeles, el
      subrayado se despega de la palabra: en fracciones, no.
   3. Se guarda en localStorage por libro. Son apuntes del alumno sobre SU
      copia, no contenido del curso: no viajan a Firestore ni se comparten.
   ========================================================================== */
(function (global) {
  "use strict";

  var TOOLS = { PEN:"pen", MARKER:"marker", ERASER:"eraser", NOTE:"note" };
  var COLORS = ["#1B1B2F", "#C0392B", "#1e5fa8", "#2D9E75", "#C9A84C"];
  var SIZES = [2, 4, 8];
  // Ancho de referencia: el grosor guardado son pixeles sobre una hoja de
  // 800 px, y se reescala con la hoja real. Asi un subrayado hecho en el
  // movil no sale como una brocha en el proyector.
  var REF_W = 800;

  var state = {
    bookId:"libro", on:false, hidden:false,
    tool:TOOLS.MARKER, color:COLORS[1], size:SIZES[1],
    data:{ pages:{} },          // { "<i>": { strokes:[], notes:[] } }
    pages:[], saveT:null
  };

  /* ── almacenamiento ─────────────────────────────────────────────── */
  function key() { return "vesper_book_notes:" + state.bookId; }
  function load() {
    try {
      var raw = localStorage.getItem(key());
      var d = raw ? JSON.parse(raw) : null;
      if (d && d.pages) state.data = d;
    } catch (e) { /* modo privado o cuota: se dibuja igual, no se guarda */ }
  }
  function save() {
    clearTimeout(state.saveT);
    state.saveT = setTimeout(function () {
      try { localStorage.setItem(key(), JSON.stringify(state.data)); }
      catch (e) { flash("No hay espacio para guardar los apuntes"); }
    }, 500);
  }
  function pageData(i) {
    var k = String(i);
    if (!state.data.pages[k]) state.data.pages[k] = { strokes:[], notes:[] };
    return state.data.pages[k];
  }
  function hasAnything() {
    return Object.keys(state.data.pages).some(function (k) {
      var p = state.data.pages[k];
      return (p.strokes && p.strokes.length) || (p.notes && p.notes.length);
    });
  }

  /* ── estilos ─────────────────────────────────────────────────────
     Todo lleva el prefijo vbb- y !important donde el CSS del libro puede
     pisarlo: las pieles de los libros traen reglas muy amplias
     (`[style*="width"]{max-width:100%}`) que ya han estirado chips
     flotantes antes.

     Y NADA de aqui lleva la clase `.no-print`: libro.html inyecta
     `.no-print:not(.vm-chip){display:none!important}` para tapar la
     navegacion propia de cada libro, y se llevaria por delante esta barra.
     Lo de no imprimir la interfaz lo resuelve el @media print de mas abajo. */
  var CSS = [
    ".vbb-cv{position:absolute;inset:0;z-index:6;pointer-events:none;touch-action:auto}",
    "body.vbb-on .vbb-cv{pointer-events:auto;touch-action:none;cursor:crosshair}",
    "body.vbb-hidden .vbb-cv,body.vbb-hidden .vbb-note{display:none!important}",
    "body.vbb-on{-webkit-user-select:none;user-select:none}",

    /* Nota adhesiva */
    ".vbb-note{position:absolute;z-index:7;width:190px;min-height:64px;padding:10px 12px 12px;",
      "background:#ffe9a8;color:#3a3325;border-radius:3px 12px 3px 3px;",
      "box-shadow:0 6px 18px rgba(27,27,47,.24);font:400 13px/1.5 Inter,system-ui,sans-serif;",
      "white-space:pre-wrap;overflow-wrap:break-word}",
    ".vbb-note:focus{outline:2px solid #C9A84C;outline-offset:1px}",
    ".vbb-note .vbb-note-x{position:absolute;top:2px;right:4px;width:20px;height:20px;border:none;",
      "background:none;color:#8a7c4e;font:700 15px/1 sans-serif;cursor:pointer;border-radius:50%}",
    ".vbb-note .vbb-note-x:hover{background:rgba(0,0,0,.10);color:#3a3325}",
    ".vbb-note .vbb-note-grip{position:absolute;top:2px;left:5px;color:#b0a06a;font:700 13px/1 sans-serif;cursor:grab}",

    /* Boton flotante */
    ".vbb-fab{position:fixed!important;right:14px;top:50%;transform:translateY(-50%);z-index:99999;",
      "width:46px;height:46px;display:flex;align-items:center;justify-content:center;",
      "background:#1B1B2F;color:#e8c987;border:1px solid rgba(201,168,76,.5);border-radius:50%;",
      "box-shadow:0 6px 20px rgba(0,0,0,.34);cursor:pointer;opacity:.9;transition:opacity .16s,background .16s}",
    ".vbb-fab:hover{opacity:1;background:#2c2c4a}",
    ".vbb-fab.on{background:#C9A84C;color:#1B1B2F;border-color:#C9A84C}",
    ".vbb-fab svg{width:21px;height:21px;fill:none;stroke:currentColor;stroke-width:1.7;",
      "stroke-linecap:round;stroke-linejoin:round}",

    /* Barra */
    ".vbb-bar{position:fixed!important;right:14px;top:50%;transform:translateY(-50%);z-index:99999;",
      "display:none;flex-direction:column;gap:6px;padding:9px;",
      "background:rgba(27,27,47,.96);border:1px solid rgba(201,168,76,.32);border-radius:14px;",
      "box-shadow:0 16px 44px rgba(0,0,0,.44);font-family:Inter,system-ui,sans-serif}",
    "body.vbb-on .vbb-bar{display:flex}",
    ".vbb-bar button{width:40px;height:38px;display:flex;align-items:center;justify-content:center;",
      "background:transparent;border:1px solid transparent;border-radius:9px;color:#b9b5cd;",
      "cursor:pointer;padding:0;transition:color .15s,background .15s,border-color .15s}",
    ".vbb-bar button:hover{color:#f5f2eb;background:rgba(255,255,255,.08)}",
    ".vbb-bar button.on{color:#f3e2ab;background:rgba(201,168,76,.18);border-color:rgba(201,168,76,.42)}",
    ".vbb-bar button svg{width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:1.7;",
      "stroke-linecap:round;stroke-linejoin:round}",
    ".vbb-sep{height:1px;background:rgba(255,255,255,.14);margin:2px 4px}",
    ".vbb-colors{display:grid;grid-template-columns:repeat(2,1fr);gap:5px;padding:2px 3px}",
    ".vbb-colors i{width:16px;height:16px;border-radius:50%;cursor:pointer;display:block;",
      "box-shadow:inset 0 0 0 1px rgba(255,255,255,.3)}",
    ".vbb-colors i.on{box-shadow:0 0 0 2px #C9A84C}",
    ".vbb-sizes{display:flex;justify-content:center;gap:6px;padding:3px 2px}",
    ".vbb-sizes i{border-radius:50%;background:#b9b5cd;cursor:pointer;display:block;opacity:.6}",
    ".vbb-sizes i.on{background:#f3e2ab;opacity:1}",

    /* Aviso */
    ".vbb-flash{position:fixed!important;left:50%;bottom:74px;transform:translateX(-50%);z-index:99999;",
      "background:rgba(27,27,47,.95);color:#f5f2eb;border:1px solid rgba(201,168,76,.4);",
      "border-radius:999px;padding:9px 16px;font:600 12px/1 Inter,system-ui,sans-serif;",
      "box-shadow:0 10px 30px rgba(0,0,0,.4);opacity:0;transition:opacity .2s;pointer-events:none}",
    ".vbb-flash.on{opacity:1}",

    /* Al imprimir / guardar en PDF: los apuntes SI salen (son del alumno y
       para eso los ha hecho); la interfaz, no. */
    "@media print{.vbb-fab,.vbb-bar,.vbb-flash,.vbb-note-x,.vbb-note-grip{display:none!important}",
      ".vbb-cv{position:absolute!important}",
      ".vbb-note{box-shadow:none!important;-webkit-print-color-adjust:exact;print-color-adjust:exact}}",

    "@media (max-width:600px){.vbb-fab{top:auto;bottom:96px;transform:none}",
      ".vbb-bar{top:auto;bottom:96px;transform:none;flex-direction:row;flex-wrap:wrap;max-width:calc(100vw - 28px)}",
      ".vbb-bar .vbb-sep{width:1px;height:auto;margin:4px 2px}",
      ".vbb-colors{grid-template-columns:repeat(5,1fr)}}"
  ].join("");

  var ICONS = {
    board:'<path d="M2.5 4h19v12.5h-19z"/><path d="M12 16.5V20M8 20h8"/>',
    pen:'<path d="M4 20h4L20 8a2.55 2.55 0 0 0-3.6-3.6L4 16.8z"/><path d="m14.6 6.4 3.6 3.6"/>',
    marker:'<path d="M6 15.5 15.4 6a2.6 2.6 0 0 1 3.7 3.7L9.6 19H6z"/><path d="M3.5 21.5h8"/>',
    eraser:'<path d="M8.6 19.5 3.9 14.8a1.8 1.8 0 0 1 0-2.6l8.3-8.3a1.8 1.8 0 0 1 2.6 0l4.9 4.9a1.8 1.8 0 0 1 0 2.6l-7.6 7.6z"/><path d="M21 19.5h-8.4"/>',
    note:'<path d="M4 5.6A1.6 1.6 0 0 1 5.6 4h12.8A1.6 1.6 0 0 1 20 5.6V14l-6 6H5.6A1.6 1.6 0 0 1 4 18.4z"/><path d="M20 14h-4.4A1.6 1.6 0 0 0 14 15.6V20"/>',
    undo:'<path d="M4 9.5h9.2A5.8 5.8 0 0 1 13.2 21H8.5"/><path d="M7.8 5.2 3.6 9.5l4.2 4.3"/>',
    trash:'<path d="M4.5 6.6h15M9.4 6.6V4.8h5.2v1.8"/><path d="M6.6 6.6 7.4 20a1.4 1.4 0 0 0 1.4 1.3h6.4A1.4 1.4 0 0 0 16.6 20l.8-13.4"/>',
    eye:'<path d="M2.2 12S5.9 5.6 12 5.6 21.8 12 21.8 12 18.1 18.4 12 18.4 2.2 12 2.2 12z"/><circle cx="12" cy="12" r="3"/>',
    x:'<path d="m6.5 6.5 11 11M17.5 6.5l-11 11"/>'
  };
  function svg(name) { return '<svg viewBox="0 0 24 24" aria-hidden="true">' + ICONS[name] + "</svg>"; }

  /* ── avisos ─────────────────────────────────────────────────────── */
  var flashEl, flashT;
  function flash(msg) {
    if (!flashEl) {
      flashEl = document.createElement("div");
      flashEl.className = "vbb-flash";
      document.body.appendChild(flashEl);
    }
    flashEl.textContent = msg;
    flashEl.classList.add("on");
    clearTimeout(flashT);
    flashT = setTimeout(function () { flashEl.classList.remove("on"); }, 2000);
  }

  /* ── capas por hoja ─────────────────────────────────────────────── */
  function findPages() {
    var list = document.querySelectorAll(".page");
    if (list.length) return Array.prototype.slice.call(list);
    // Libros sin .page (o carcasas de Canva a medio cargar): se anota sobre
    // el contenedor del libro, que sigue siendo un bloque con altura propia.
    var one = document.querySelector(".book-container") || document.body;
    return one ? [one] : [];
  }

  function ensureLayer(page, i) {
    if (page.__vbb) return page.__vbb;
    var cs = getComputedStyle(page);
    if (cs.position === "static") page.style.position = "relative";
    var cv = document.createElement("canvas");
    cv.className = "vbb-cv";
    page.appendChild(cv);
    var layer = { page:page, index:i, cv:cv, ctx:cv.getContext("2d") };
    page.__vbb = layer;
    sizeLayer(layer);
    bindLayer(layer);
    renderNotes(layer);
    return layer;
  }

  function sizeLayer(layer) {
    var w = layer.page.clientWidth, h = layer.page.clientHeight;
    if (!w || !h) return;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    layer.w = w; layer.h = h;
    layer.cv.width = Math.round(w * dpr);
    layer.cv.height = Math.round(h * dpr);
    layer.cv.style.width = w + "px";
    layer.cv.style.height = h + "px";
    layer.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    draw(layer);
  }

  function draw(layer) {
    var c = layer.ctx;
    if (!c || !layer.w) return;
    c.clearRect(0, 0, layer.w, layer.h);
    var scale = layer.w / REF_W;
    pageData(layer.index).strokes.forEach(function (s) {
      if (!s.pts || s.pts.length < 1) return;
      c.save();
      c.strokeStyle = s.c;
      c.globalAlpha = (s.t === "m") ? .32 : 1;
      c.lineWidth = Math.max(1, s.w * scale * (s.t === "m" ? 4 : 1));
      c.lineCap = "round"; c.lineJoin = "round";
      c.beginPath();
      c.moveTo(s.pts[0][0] * layer.w, s.pts[0][1] * layer.h);
      for (var i = 1; i < s.pts.length; i++) c.lineTo(s.pts[i][0] * layer.w, s.pts[i][1] * layer.h);
      if (s.pts.length === 1) c.lineTo(s.pts[0][0] * layer.w + .1, s.pts[0][1] * layer.h);
      c.stroke();
      c.restore();
    });
  }

  /* ── dibujo ─────────────────────────────────────────────────────── */
  function bindLayer(layer) {
    var cur = null;
    function pt(e) {
      var r = layer.cv.getBoundingClientRect();
      return [(e.clientX - r.left) / r.width, (e.clientY - r.top) / r.height];
    }
    layer.cv.addEventListener("pointerdown", function (e) {
      if (!state.on || state.hidden) return;
      var p = pt(e);
      if (state.tool === TOOLS.NOTE) { addNote(layer, p); return; }
      if (state.tool === TOOLS.ERASER) { erase(layer, p); layer.erasing = true; return; }
      e.preventDefault();
      try { layer.cv.setPointerCapture(e.pointerId); } catch (err) {}
      cur = { t:state.tool === TOOLS.MARKER ? "m" : "p", c:state.color, w:state.size, pts:[p] };
      pageData(layer.index).strokes.push(cur);
      draw(layer);
    });
    layer.cv.addEventListener("pointermove", function (e) {
      if (!state.on) return;
      if (layer.erasing) { erase(layer, pt(e)); return; }
      if (!cur) return;
      e.preventDefault();
      cur.pts.push(pt(e));
      draw(layer);
    });
    function end() {
      if (layer.erasing) { layer.erasing = false; save(); }
      if (cur) { cur = null; save(); }
    }
    layer.cv.addEventListener("pointerup", end);
    layer.cv.addEventListener("pointercancel", end);
    layer.cv.addEventListener("pointerleave", end);
  }

  // Borra el trazo ENTERO que se toca, no un trocito: en un libro se subraya
  // por palabras, y media raya suelta se ve peor que ninguna.
  function erase(layer, p) {
    var d = pageData(layer.index);
    var tol = 10 / layer.w;              // ~10 px de radio, en fracciones
    for (var i = d.strokes.length - 1; i >= 0; i--) {
      var pts = d.strokes[i].pts;
      for (var j = 0; j < pts.length; j++) {
        var dx = pts[j][0] - p[0], dy = (pts[j][1] - p[1]) * (layer.h / layer.w);
        if (dx * dx + dy * dy < tol * tol) { d.strokes.splice(i, 1); break; }
      }
    }
    draw(layer);
  }

  /* ── notas ──────────────────────────────────────────────────────── */
  function renderNotes(layer) {
    Array.prototype.forEach.call(layer.page.querySelectorAll(".vbb-note"), function (n) { n.remove(); });
    pageData(layer.index).notes.forEach(function (n, i) { mountNote(layer, n, i); });
  }
  function addNote(layer, p) {
    var n = { x:p[0], y:p[1], text:"" };
    pageData(layer.index).notes.push(n);
    mountNote(layer, n, pageData(layer.index).notes.length - 1, true);
    save();
  }
  function mountNote(layer, n, i, focus) {
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
      var arr = pageData(layer.index).notes;
      var at = arr.indexOf(n);
      if (at >= 0) arr.splice(at, 1);
      el.remove(); save();
    });

    // Arrastre por el asa: el cuerpo es editable, asi que arrastrar desde el
    // texto seleccionaria en vez de mover.
    var grip = el.querySelector(".vbb-note-grip"), drag = null;
    grip.addEventListener("pointerdown", function (e) {
      e.preventDefault();
      var r = layer.page.getBoundingClientRect();
      drag = { r:r };
      try { grip.setPointerCapture(e.pointerId); } catch (err) {}
    });
    grip.addEventListener("pointermove", function (e) {
      if (!drag) return;
      n.x = Math.max(0, Math.min(.94, (e.clientX - drag.r.left) / drag.r.width));
      n.y = Math.max(0, Math.min(.97, (e.clientY - drag.r.top) / drag.r.height));
      el.style.left = (n.x * 100) + "%";
      el.style.top = (n.y * 100) + "%";
    });
    grip.addEventListener("pointerup", function () { if (drag) { drag = null; save(); } });

    layer.page.appendChild(el);
    if (focus) { body.focus(); }
  }

  /* ── interfaz ───────────────────────────────────────────────────── */
  function build() {
    var st = document.createElement("style");
    st.textContent = CSS;
    document.head ? document.head.appendChild(st) : document.body.appendChild(st);

    var fab = document.createElement("button");
    fab.type = "button";
    fab.className = "vbb-fab";
    fab.title = "Anotar sobre el libro";
    fab.setAttribute("aria-label", "Anotar sobre el libro");
    fab.innerHTML = svg("board");
    fab.addEventListener("click", function () { toggle(!state.on); });
    document.body.appendChild(fab);
    state.fab = fab;

    var bar = document.createElement("div");
    bar.className = "vbb-bar";
    bar.setAttribute("role", "toolbar");
    bar.setAttribute("aria-label", "Herramientas de anotacion");
    document.body.appendChild(bar);

    function btn(name, tip, fn, tool) {
      var b = document.createElement("button");
      b.type = "button"; b.title = tip; b.setAttribute("aria-label", tip);
      b.innerHTML = svg(name);
      if (tool) b.dataset.tool = tool;
      b.addEventListener("click", fn);
      bar.appendChild(b);
      return b;
    }
    function sep() { var s = document.createElement("div"); s.className = "vbb-sep"; bar.appendChild(s); }

    btn("marker", "Resaltar", function () { setTool(TOOLS.MARKER); }, TOOLS.MARKER);
    btn("pen", "Escribir a mano", function () { setTool(TOOLS.PEN); }, TOOLS.PEN);
    btn("note", "Pegar una nota", function () { setTool(TOOLS.NOTE); }, TOOLS.NOTE);
    btn("eraser", "Borrar trazos", function () { setTool(TOOLS.ERASER); }, TOOLS.ERASER);
    sep();

    var colors = document.createElement("div");
    colors.className = "vbb-colors";
    COLORS.forEach(function (c) {
      var i = document.createElement("i");
      i.style.background = c;
      i.title = "Color";
      i.className = c === state.color ? "on" : "";
      i.addEventListener("click", function () {
        state.color = c;
        colors.querySelectorAll("i").forEach(function (x) { x.classList.toggle("on", x === i); });
      });
      colors.appendChild(i);
    });
    bar.appendChild(colors);

    var sizes = document.createElement("div");
    sizes.className = "vbb-sizes";
    SIZES.forEach(function (s) {
      var i = document.createElement("i");
      i.style.width = i.style.height = (s + 4) + "px";
      i.title = "Grosor";
      i.className = s === state.size ? "on" : "";
      i.addEventListener("click", function () {
        state.size = s;
        sizes.querySelectorAll("i").forEach(function (x) { x.classList.toggle("on", x === i); });
      });
      sizes.appendChild(i);
    });
    bar.appendChild(sizes);
    sep();

    btn("undo", "Deshacer el ultimo trazo", undo);
    btn("eye", "Ocultar / mostrar los apuntes", function () {
      state.hidden = !state.hidden;
      document.body.classList.toggle("vbb-hidden", state.hidden);
      flash(state.hidden ? "Apuntes ocultos" : "Apuntes visibles");
    });
    btn("trash", "Borrar TODOS los apuntes de este libro", clearAll);
    sep();
    btn("x", "Cerrar las herramientas", function () { toggle(false); });

    state.bar = bar;
    setTool(state.tool);
  }

  function setTool(t) {
    state.tool = t;
    state.bar.querySelectorAll("button[data-tool]").forEach(function (b) {
      b.classList.toggle("on", b.dataset.tool === t);
    });
  }

  // Deshacer sobre la hoja que se esta mirando: en un libro de 90 hojas,
  // deshacer "lo ultimo del documento" seria deshacer algo que no se ve.
  function undo() {
    var mid = window.innerHeight / 2, best = null, bestD = Infinity;
    state.pages.forEach(function (p) {
      if (!p.__vbb) return;
      var r = p.getBoundingClientRect();
      var d = Math.abs((r.top + r.bottom) / 2 - mid);
      if (r.bottom > 0 && r.top < window.innerHeight && d < bestD) { bestD = d; best = p.__vbb; }
    });
    if (!best) return;
    var d = pageData(best.index);
    if (!d.strokes.length) { flash("No hay nada que deshacer en esta hoja"); return; }
    d.strokes.pop(); draw(best); save();
  }

  function clearAll() {
    if (!hasAnything()) { flash("Este libro no tiene apuntes"); return; }
    if (!confirm("Borrar todos tus apuntes de este libro? No se puede deshacer.")) return;
    state.data = { pages:{} };
    state.pages.forEach(function (p) {
      if (!p.__vbb) return;
      draw(p.__vbb); renderNotes(p.__vbb);
    });
    save();
    flash("Apuntes borrados");
  }

  function toggle(on) {
    state.on = on;
    document.body.classList.toggle("vbb-on", on);
    state.fab.classList.toggle("on", on);
    state.fab.style.display = on ? "none" : "";     // la barra ocupa su sitio
    if (on) {
      if (state.hidden) {
        state.hidden = false;
        document.body.classList.remove("vbb-hidden");
      }
      mountAll();
      flash("Resalta, escribe o pega notas sobre el libro");
    }
  }

  function mountAll() {
    state.pages = findPages();
    state.pages.forEach(function (p, i) { ensureLayer(p, i); });
  }

  /* ── arranque ───────────────────────────────────────────────────── */
  function init(opts) {
    opts = opts || {};
    state.bookId = String(opts.bookId || "libro").slice(0, 60);
    load();
    build();

    // Las hojas se re-miden cuando el libro cambia de alto: imagenes que
    // acaban de cargar, ampliar el texto, girar el movil o abrir el dialogo
    // de impresion. Sin esto el subrayado sale desplazado de su parrafo.
    var relayout = function () {
      state.pages.forEach(function (p) { if (p.__vbb) { sizeLayer(p.__vbb); } });
    };
    window.addEventListener("resize", relayout);
    window.addEventListener("load", relayout);
    window.addEventListener("beforeprint", relayout);
    if (window.ResizeObserver) {
      var ro = new ResizeObserver(relayout);
      // Observar el <body> basta: cualquier re-maquetado del libro le cambia
      // el alto, y observar cada hoja en un libro largo cuesta mas de lo que
      // ahorra.
      ro.observe(document.body);
    }

    // Si el alumno ya habia anotado este libro, las capas se montan solas al
    // abrirlo: sus apuntes tienen que estar ahi antes de que los busque.
    if (hasAnything()) { mountAll(); }
  }

  global.VesperBookBoard = { init:init, toggle:toggle };
})(window);
