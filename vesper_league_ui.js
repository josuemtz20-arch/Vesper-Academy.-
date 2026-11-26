/* ============================================================
 * vesper_league_ui.js — pinta la liga semanal (diseño "Liga v2", aprobado
 * el 2026-11-25; demo en _propuestas/liga-v2/demo.html).
 *
 * La usan el cajón de la liga en leccion.html (leccion_app.js, need("league"))
 * y liga.html. Es pura: sólo lee `data` y escribe HTML; no pide red ni toca
 * localStorage. Los estilos son .wlg-* en assets/css/leccion.css.
 *
 * window.VESPER_LEAGUE_UI:
 *   render(el, data, opt) -> pinta dentro de `el` (reemplaza su contenido)
 *   tick(el)              -> refresca sólo la cuenta regresiva (cada minuto)
 *   tierArt(tier, opt)    -> <img> (o icono) del emblema de un tier, para
 *                            el chip del HUD y la burbuja
 *
 * data = VESPER_LEAGUE.board():
 *   { mode:"cloud"|"local"|"global", tier:{idx,id,name,icon}, tiers:[...5],
 *     rows:[{rank,name,xp,isMe,real,zone:"up"|"down"|""}], me:{rank,xp},
 *     gapUp, leadOver, endsInMs, result:{result,rank,fromTier,toTier}|null,
 *     realCount }
 *   global = reglas nuevas aún sin publicar: la tabla única de todos los
 *            alumnos, sin zonas ni rivales de práctica.
 * opt = { cat(expr) -> url, tierArt: "assets/images/league/" (carpeta de
 *         tier_<id>.webp; sin ella, el icono SVG o el emoji), loginHref,
 *         goLabel, loading: true mientras la nube aún no responde,
 *         xpPerLesson: XP de una lección típica (45 por defecto) }
 * data.pendingClose = la semana pasada aún no se cierra en la nube.
 * ============================================================ */
window.VESPER_LEAGUE_UI = (function () {
  "use strict";

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function short(name) { return String(name || "").replace(/^Liga\s+/, ""); }
  function ord(n) { return n + "º"; }
  function plural(n, one, many) { return n + " " + (n === 1 ? one : many); }

  var SVG = {
    glass: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 3h10M7 21h10M8 3c0 5 8 6 8 9s-8 4-8 9M16 3c0 5-8 6-8 9s8 4 8 9"/><path d="M10 18.5h4" stroke-width="2.6"/></svg>',
    lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2.5"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg>',
    up: '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M6 2.5 10.5 9h-9z" fill="currentColor"/></svg>',
    down: '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M6 9.5 1.5 3h9z" fill="currentColor"/></svg>',
    go: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h13"/><path d="m12 5 7 7-7 7"/></svg>',
    star: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l2.2 7.3 7.3 2.2-7.3 2.2L12 21.5l-2.2-7.3L2.5 12l7.3-2.2z" fill="currentColor"/></svg>',
    pen: '<svg class="wlg-pen" viewBox="0 0 150 9" fill="none" aria-hidden="true"><path d="M2 6.5C22 2.5 41 8.8 62 5.4S104 2.2 122 5.6c9 1.7 17 1.2 26-1.4" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/></svg>'
  };

  function countdown(ms) {
    ms = Math.max(0, ms || 0);
    var d = Math.floor(ms / 86400000), h = Math.floor((ms % 86400000) / 3600000), m = Math.floor((ms % 3600000) / 60000);
    /* la semana ya terminó y la página sigue abierta: el cierre lo hace
       league_admin.py (el lunes) y no tiene hora fija; no se promete una */
    if (ms <= 0) return { txt: "Calculando resultados…", urgent: false };
    if (d > 0) return { txt: "Termina en " + d + " d " + h + " h", urgent: false };
    if (h > 0) return { txt: "Termina en " + h + " h " + m + " min", urgent: true };
    return { txt: "Termina en " + Math.max(1, m) + " min", urgent: true };
  }

  /* emblema de la liga: la imagen tier_<id>.webp si hay carpeta (el diseño
     final aún no está elegido: el archivo se reemplaza con el mismo nombre);
     si no, el medallón SVG de vesper_icons.js o el emoji. */
  function tierArt(t, opt) {
    t = t || {};
    var dir = opt && opt.tierArt;
    if (dir && t.id)
      return '<img class="wlg-art" src="' + esc(dir + "tier_" + t.id + ".webp") + '" alt="" decoding="async" width="256" height="256">';
    var ICN = window.VESPER_ICN;
    return ICN && ICN.tier ? ICN.tier(t.id) : '<span class="wlg-emoji">' + esc(t.icon || "") + '</span>';
  }
  function tierById(tiers, id) {
    for (var i = 0; i < tiers.length; i++) if (tiers[i].id === id || i === id) return tiers[i];
    return null;
  }

  /* ---- 1. cabecera + escalera de las 5 ligas ---- */
  function head(d, o) {
    var cd = countdown(d.endsInMs), glob = d.mode === "global";
    var ey = glob ? "Liga global · esta semana"
      : d.mode === "cloud" ? "Liga semanal"
      : (o.loading ? "Liga semanal · cargando tu división…" : "Liga de práctica · sin sesión");
    var ladder = glob ? "" : '<ol class="wlg-ladder" aria-label="Divisiones de la liga">' + d.tiers.map(function (t, i) {
      var st = i < d.tier.idx ? "past" : (i === d.tier.idx ? "now" : "lock");
      return '<li class="wlg-rung is-' + st + '"' + (st === "now" ? ' aria-current="step"' : "") + '>'
        + '<span class="wlg-rung__m">' + tierArt(t, o) + (st === "lock" ? '<i class="wlg-rung__lk">' + SVG.lock + '</i>' : "") + '</span>'
        + '<span class="wlg-rung__n">' + esc(short(t.name)) + '</span>'
        + '<span class="sr-only">' + (st === "now" ? " (tu liga)" : st === "lock" ? " (bloqueada)" : " (superada)") + '</span></li>';
    }).join("") + '</ol>';
    return '<header class="wlg-head">'
      + '<div class="wlg-head__row">'
      +   '<span class="wlg-head__medal">' + tierArt(d.tier, o) + '</span>'
      +   '<div class="wlg-head__tx">'
      +     '<span class="wlg-ey">' + esc(ey) + '</span>'
      +     '<h2 class="wlg-title" id="wdrawerT">' + esc(glob ? "Todos los alumnos" : d.tier.name) + '</h2>'
      +     SVG.pen
      +   '</div>'
      + '</div>'
      + '<p class="wlg-clock' + (cd.urgent ? " is-urgent" : "") + '" data-wlg-ends="' + (Date.now() + Math.max(0, d.endsInMs || 0)) + '">'
      +   SVG.glass + '<span class="wlg-clock__t">' + esc(cd.txt) + '</span></p>'
      + '<p class="wlg-mix">' + mixLine(d) + '</p>'
      + (d.pendingClose && !glob ? '<p class="wlg-pend">Calculando los resultados de la semana pasada…</p>' : "")
      + ladder
      + '</header>';
  }

  /* quién hay en la tabla, dicho arriba y sin letra chica */
  function mixLine(d) {
    var total = d.rows.length;
    if (d.mode === "global") return "<b>" + plural(total, "alumno de Vesper", "alumnos de Vesper") + "</b> · sin rivales de práctica";
    if (d.mode !== "cloud") return "Liga de práctica: <b>todos son rivales de práctica</b>";
    var real = Math.max(1, d.realCount || 1);
    return "<b>" + plural(real, "alumno de Vesper", "alumnos de Vesper") + "</b> · " + plural(total - real, "rival de práctica", "rivales de práctica");
  }
  /* XP de una lección típica: la mediana de xpReward de los bancos de
     leccion.html es 54 y se aprueba con 70 %+, así que unas 45 XP. "Una
     lección más" sólo se promete si alcanza con margen (85 % de eso). */
  var XP_LESSON = 45;
  function lessonsFor(gap, o) {
    var per = o.xpPerLesson || XP_LESSON;
    if (gap <= Math.round(per * 0.85)) return 1;
    return Math.max(2, Math.ceil(gap / per));
  }

  /* ---- 2. resultado de la semana pasada, con Vesper ---- */
  function resultCard(d, o) {
    var r = d.result; if (!r || d.mode === "global") return "";
    var from = tierById(d.tiers, r.fromTier) || d.tier, to = tierById(d.tiers, r.toTier) || d.tier;
    var k = r.result === "up" ? "up" : (r.result === "down" ? "down" : "stay");
    var C = {
      up:   { img: "streak",    h: "¡Subiste a " + to.name + "!", s: "Quedaste " + ord(r.rank) + " en " + short(from.name) + ".", v: "¡Eso es! " + short(to.name) + " te queda bien." },
      down: { img: "incorrect", h: "Bajaste a " + to.name,       s: "Quedaste " + ord(r.rank) + " en " + short(from.name) + ".", v: "Pasa. Esta semana la recuperamos." },
      stay: { img: "correct",   h: "Te mantienes en " + to.name, s: "Quedaste " + ord(r.rank) + " la semana pasada.",          v: "Firme. Ahora, a por el podio." }
    }[k];
    var path = k === "stay" ? "" : '<span class="wlg-res__path" aria-hidden="true"><span>' + tierArt(from, o) + '</span>'
      + (k === "up" ? SVG.up : SVG.down) + '<span>' + tierArt(to, o) + '</span></span>';
    return '<section class="wlg-res is-' + k + '" aria-label="Resultado de la semana pasada">'
      + '<img class="wlg-res__cat" src="' + esc(o.cat(C.img)) + '" alt="" width="132" height="132" decoding="async">'
      + '<div class="wlg-res__tx">'
      +   '<span class="wlg-res__ey">Semana pasada</span>'
      +   '<h3 class="wlg-res__h">' + esc(C.h) + '</h3>'
      +   '<p class="wlg-res__s">' + esc(C.s) + '</p>'
      +   path
      +   '<p class="wlg-res__v">' + esc(C.v) + '</p>'
      + '</div></section>';
  }

  /* ---- 3. línea de estado (lo único que hay que leer) ---- */
  function status(d, o, withCat) {
    var rows = d.rows, me = null, i, firstSafe = null, lastUp = null;
    for (i = 0; i < rows.length; i++) {
      if (rows[i].isMe) me = rows[i];
      if (rows[i].zone === "up") lastUp = rows[i];
      if (rows[i].zone !== "down" && !rows[i].isMe) firstSafe = rows[i];
    }
    if (!me) return "";
    var top = d.tier.idx >= d.tiers.length - 1, k, h, s = "", v, img, pct = null;
    if (!me.xp) {
      k = "zero"; img = "welcome";
      h = "Aún no sumas XP esta semana";
      s = "Cada lección suma: con la primera empiezas a subir.";
      v = "¿Empezamos?";
    } else if (d.mode === "global") {
      k = "mid"; img = "explaining";
      h = "Vas " + ord(me.rank) + " de " + rows.length + " esta semana";
      s = "Esta tabla junta a todos los alumnos con sesión; aún no sube ni baja de liga.";
      v = "Cada lección cuenta.";
    } else if (me.zone === "up") {
      k = "up"; img = "streak";
      h = "Vas en zona de ascenso · " + plural(d.leadOver || 0, "XP", "XP") + " de ventaja";
      s = top ? "Defiendes la cima de Diamante." : "Si la semana cerrara hoy, pasarías a " + (d.tiers[d.tier.idx + 1] || d.tier).name + ".";
      v = "¡No aflojes!";
    } else if (me.zone === "down") {
      k = "down"; img = "incorrect";
      var need = firstSafe ? Math.max(1, firstSafe.xp - me.xp + 1) : 1, kd = lessonsFor(need, o);
      h = kd === 1 ? "Zona de descenso: una lección y sales" : "Zona de descenso: te faltan " + need + " XP para salir";
      s = kd === 1 ? "Te faltan " + need + " XP para quedar a salvo." : "Unas " + kd + " lecciones.";
      v = "Tú puedes salir de ahí.";
      pct = firstSafe && firstSafe.xp ? me.xp / (firstSafe.xp + 1) : 0;
    } else {
      k = "mid"; img = "explaining";
      if (top || !lastUp) { h = "Vas " + ord(me.rank) + " en " + short(d.tier.name); s = "Es la liga más alta: aquí sólo se defiende el puesto."; v = "Bien sostenido."; }
      else {
        var ku = lessonsFor(d.gapUp || 0, o);
        h = "Vas " + ord(me.rank) + " · te faltan " + (d.gapUp || 0) + " XP para la zona de ascenso";
        s = "El " + ord(lastUp.rank) + " lugar lleva " + lastUp.xp + " XP.";
        v = ku === 1 ? "Una lección más y entras." : "Unas " + ku + " lecciones y entras.";
        pct = me.xp / (me.xp + (d.gapUp || 0) || 1);
      }
    }
    var bar = pct == null ? "" : '<span class="wlg-st__bar" role="img" aria-label="' + Math.round(pct * 100) + ' % del camino"><i style="width:' + Math.max(6, Math.min(100, Math.round(pct * 100))) + '%"></i></span>';
    /* con la ficha de la semana pasada (Vesper grande) la tarjeta va sin su
       gato: un solo Vesper grande a la vez */
    return '<section class="wlg-st is-' + k + (withCat ? "" : " is-nocat") + '" aria-live="polite">'
      + (withCat ? '<img class="wlg-st__cat" src="' + esc(o.cat(img)) + '" alt="" width="64" height="64" decoding="async">' : "")
      + '<div class="wlg-st__tx"><p class="wlg-st__h">' + esc(h) + '</p>'
      + (s ? '<p class="wlg-st__s">' + esc(s) + '</p>' : "") + bar
      + '<p class="wlg-st__v">' + esc(v) + '</p></div></section>';
  }

  /* ---- 4. la tabla, con líneas de ascenso y descenso ---- */
  function board(d) {
    var rows = d.rows, nUp = 0, nDown = 0, i, h = "";
    for (i = 0; i < rows.length; i++) { if (rows[i].zone === "up") nUp++; if (rows[i].zone === "down") nDown++; }
    var seenDown = false;
    for (i = 0; i < rows.length; i++) {
      var r = rows[i], real = r.isMe || r.real;
      if (r.zone === "down" && !seenDown) {
        seenDown = true;
        h += '<li class="wlg-sep is-down" role="presentation"><span>' + SVG.down + 'Bajan ' + (nDown === 1 ? "el último" : "los " + nDown + " últimos") + '</span></li>';
      }
      var nm = r.isMe ? "Tú" : (r.name || "Estudiante");
      var ini = r.isMe ? SVG.star : esc(String(nm).replace(/[^A-Za-zÁÉÍÓÚÑáéíóúñÜü]/g, "").charAt(0).toUpperCase() || "?");
      h += '<li class="wlg-row' + (r.zone ? " is-" + r.zone : "") + (r.isMe ? " is-me" : "") + (real ? " is-real" : " is-bot") + '"'
        + (r.isMe ? ' aria-current="true"' : "") + ' style="--i:' + i + '">'
        + '<span class="wlg-row__rk">' + (r.zone === "up" ? SVG.up : r.zone === "down" ? SVG.down : "") + r.rank + '</span>'
        + '<span class="wlg-av" aria-hidden="true">' + ini + '</span>'
        + '<span class="wlg-row__nm"><span class="wlg-row__t">' + esc(nm) + '</span>'
        +   (r.isMe ? "" : real ? '<span class="sr-only">, alumno de Vesper</span>'
                                : '<span class="wlg-tag"><span class="sr-only">, rival de </span>práctica</span>') + '</span>'
        + '<span class="wlg-row__xp">' + r.xp + '<small> XP</small></span></li>';
      if (r.zone === "up" && (!rows[i + 1] || rows[i + 1].zone !== "up")) {
        h += '<li class="wlg-sep is-up" role="presentation"><span>' + SVG.up + 'Suben ' + (nUp === 1 ? "el primero" : "los " + nUp + " primeros") + '</span></li>';
      }
    }
    return '<ol class="wlg-board" aria-label="Clasificación de esta semana">' + h + '</ol>';
  }

  /* ---- 5. honestidad: quién es real y quién es de práctica ---- */
  function legend(d, o) {
    var total = d.rows.length;
    if (d.mode === "global") {
      return "";
    }
    var real = d.mode === "cloud" ? Math.max(1, d.realCount || 1) : 1;
    var note = "";
    if (d.mode !== "cloud") {
      if (!o.loading) note = '<div class="wlg-note"><img src="' + esc(o.cat("welcome")) + '" alt="" width="52" height="52" decoding="async">'
        + '<p>Tu XP se guarda sólo en este aparato. Entra con tu cuenta para competir con alumnos de Vesper.</p>'
        + '<a class="wlg-link" href="' + esc(o.loginHref || "login.html") + '">Iniciar sesión</a></div>';
    } else if (real <= 2) {
      note = '<div class="wlg-note"><img src="' + esc(o.cat("explaining")) + '" alt="" width="52" height="52" decoding="async">'
        + '<p>' + (real === 1 ? "Por ahora eres el único alumno de Vesper en esta división." : "Por ahora son " + real + " alumnos de Vesper en esta división.")
        + ' Los rivales de práctica la completan hasta ' + total + ' mientras llegan más.</p></div>';
    }
    return '<footer class="wlg-legend">'
      + '<p class="wlg-key"><span><i class="wlg-av is-real" aria-hidden="true">A</i>Alumno de Vesper</span>'
      + '<span><i class="wlg-av is-bot" aria-hidden="true">R</i>Rival de práctica</span></p>'
      + note
      + '<details class="wlg-faq"><summary>¿Qué es un rival de práctica?</summary>'
      + '<p>Un compañero simulado que suma XP a un ritmo parecido al de tu liga. Rellena la división hasta ' + total
      + ' para que siempre haya con quién competir. Tu XP sí es real: lo sumas con cada lección.</p></details>'
      + '</footer>';
  }

  function render(el, data, opt) {
    if (!el || !data) return;
    var o = {
      cat: (opt && opt.cat) || function (e) { return "assets/images/mascot/vesper_cat_" + e + ".webp"; },
      tierArt: opt && opt.tierArt, loginHref: opt && opt.loginHref,
      goLabel: opt && opt.goLabel, loading: !!(opt && opt.loading), xpPerLesson: opt && opt.xpPerLesson
    };
    var mode = data.mode === "cloud" || data.mode === "global" ? data.mode : "local";
    var d = {
      mode: mode,
      tier: data.tier || { idx: 0, id: "bronce", name: "Liga Bronce" },
      tiers: data.tiers || [],
      rows: data.rows || [],
      gapUp: data.gapUp, leadOver: data.leadOver, endsInMs: data.endsInMs,
      result: data.result || null, realCount: data.realCount, pendingClose: !!data.pendingClose
    };
    var hasRes = !!d.result && mode !== "global";
    el.innerHTML = '<div class="wlg-root" data-mode="' + mode + '">'
      + '<div class="wlg-scroll">'
      +   head(d, o) + resultCard(d, o) + status(d, o, !hasRes) + board(d) + legend(d, o)
      + '</div>'
      + '<div class="wlg-foot"><button class="wlg-go" type="button" data-drawer-go="forja">'
      +   esc(o.goLabel || "Sumar XP en la Forja") + SVG.go + '</button></div>'
      + '</div>';
  }

  function tick(el) {
    var c = el && el.querySelector("[data-wlg-ends]"); if (!c) return;
    var cd = countdown(+c.getAttribute("data-wlg-ends") - Date.now());
    c.querySelector(".wlg-clock__t").textContent = cd.txt;
    c.classList.toggle("is-urgent", cd.urgent);
  }

  return { render: render, tick: tick, tierArt: tierArt };
})();
