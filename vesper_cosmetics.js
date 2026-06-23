/* ============================================================
 * vesper_cosmetics.js — Desbloqueo de cosméticos de Vesper.
 *
 * Define QUÉ progreso desbloquea cada color (skin) y cada accesorio
 * de la mascota. El "qué está desbloqueado" se calcula EN VIVO desde
 * VesperProgress (localStorage: vesperProgress) — no se persiste un
 * set aparte. Solo se guarda qué desbloqueos ya se "celebraron", para
 * no repetir la animación (localStorage: vesper_cosmetics_seen).
 *
 * Las definiciones visuales (nombre/color/SVG) viven en vesper_theme.js
 * (SKINS / ACCESSORIES). Aquí solo viven los REQUISITOS.
 *
 * USO: incluye <script src="vesper_cosmetics.js"></script> DESPUÉS de
 *   vesper_progress.js. Fail-open: si VesperProgress no está, todo
 *   cuenta como desbloqueado (no rompe la app).
 *
 *   VESPER_COSMETICS.isUnlocked("skin"|"acc", id) -> bool
 *   VESPER_COSMETICS.unlocked()  -> { skins:[ids], accessories:[ids] }
 *   VESPER_COSMETICS.reqLabel("skin"|"acc", id) -> texto del requisito
 *   VESPER_COSMETICS.pending()   -> [{kind,id}] recién desbloqueados (sin celebrar)
 *   VESPER_COSMETICS.markSeen()  -> marca todo lo actual como celebrado
 * ============================================================ */
window.VESPER_COSMETICS = (function () {
  var SEEN_KEY = "vesper_cosmetics_seen";

  /* ---- Requisitos de desbloqueo ----
     Tipos de req:
       { type:"free" }                     -> siempre disponible (por defecto)
       { type:"lessons", n }               -> nº de lecciones reales completadas
       { type:"xp", n }                    -> XP total acumulado
       { type:"boss", level }              -> Guardián del mundo NIVEL vencido
       { type:"achievement", id }          -> logro concreto desbloqueado
     (la racha usa los logros permanentes "streak-7"/"streak-30")        */
  var SKIN_REQS = {
    gold:   { type: "free" },
    sky:    { type: "lessons", n: 5 },
    rose:   { type: "boss", level: "A1" },
    mint:   { type: "achievement", id: "streak-7" },
    ember:  { type: "xp", n: 1000 },
    violet: { type: "boss", level: "B1" }
  };
  var ACC_REQS = {
    none:    { type: "free" },
    bowtie:  { type: "boss", level: "A2" },
    cap:     { type: "lessons", n: 25 },
    glasses: { type: "achievement", id: "perfect" },
    wizard:  { type: "boss", level: "B2" },
    scarf:   { type: "achievement", id: "streak-30" },
    halo:    { type: "achievement", id: "lessons-100" },
    crown:   { type: "boss", level: "C2" }
  };
  /* Pelajes = apariencias completas (imagen real del gato, no filtro de color).
     Tier "premium": grandes hitos de lecciones / XP / racha. */
  var PELAJE_REQS = {
    classic: { type: "free" },
    gray:    { type: "lessons", n: 25 },
    calico:  { type: "lessons", n: 50 },
    lion:    { type: "lessons", n: 100 },
    cosmic:  { type: "xp", n: 3000 },
    dragon:  { type: "achievement", id: "streak-30" }
  };

  /* nombres cortos de mundo para los textos de requisito */
  var WORLD_NAME = {
    A1: "el Hogar", A2: "el Sendero", B1: "el Horizonte",
    B2: "la Torre", C1: "el Firmamento", C2: "el Castillo del Saber"
  };

  function reqsFor(kind) { return kind === "skin" ? SKIN_REQS : (kind === "pelaje" ? PELAJE_REQS : ACC_REQS); }

  function P() { return window.VesperProgress; }

  /* nº de lecciones reales (excluye repasos "review:" y jefes "boss:") */
  function lessonCount(s) {
    var n = 0, c = (s && s.completed) || {};
    for (var k in c) { if (k.indexOf("review:") !== 0 && k.indexOf("boss:") !== 0) n++; }
    return n;
  }

  function meets(req, s) {
    if (!req) return true;
    switch (req.type) {
      case "free": return true;
      case "lessons": return lessonCount(s) >= (req.n || 0);
      case "xp": return ((s && s.xp) || 0) >= (req.n || 0);
      case "boss": return !!(s && s.bosses && s.bosses[req.level]);
      case "achievement": return !!(s && s.achievements && s.achievements[req.id]);
    }
    return true;
  }

  function state() { try { return P() ? P().getState() : null; } catch (e) { return null; } }

  function isUnlocked(kind, id) {
    var req = reqsFor(kind)[id];
    if (!req) return true;                 // sin requisito conocido -> libre
    var s = state();
    if (!s) return true;                   // fail-open: sin progreso, todo visible
    return meets(req, s);
  }

  function unlocked() {
    var s = state();
    var out = { skins: [], accessories: [], pelajes: [] };
    for (var sk in SKIN_REQS) { if (!s || meets(SKIN_REQS[sk], s)) out.skins.push(sk); }
    for (var ac in ACC_REQS) { if (!s || meets(ACC_REQS[ac], s)) out.accessories.push(ac); }
    for (var pl in PELAJE_REQS) { if (!s || meets(PELAJE_REQS[pl], s)) out.pelajes.push(pl); }
    return out;
  }

  function reqLabel(kind, id) {
    var req = reqsFor(kind)[id];
    if (!req || req.type === "free") return "Disponible desde el inicio";
    switch (req.type) {
      case "lessons": return "Completa " + req.n + " lecciones";
      case "xp": return "Alcanza " + req.n + " XP";
      case "boss": return "Vence al Guardián de " + (WORLD_NAME[req.level] || req.level) + " (" + req.level + ")";
      case "achievement":
        if (req.id === "streak-7") return "Mantén una racha de 7 días";
        if (req.id === "streak-30") return "Mantén una racha de 30 días";
        if (req.id === "perfect") return "Termina una lección sin fallos";
        if (req.id === "lessons-100") return "Completa 100 lecciones";
        return "Consigue un logro";
    }
    return "";
  }

  /* ---- celebración (diff contra lo ya visto) ----
     Solo cuentan los NO-"free" (nadie "desbloquea" el color/accesorio inicial).
     Primera vez (clave ausente): se siembra en silencio con lo ya desbloqueado,
     para que un usuario con progreso previo NO reciba una avalancha retroactiva
     al estrenar la función. */
  function currentKeys() {
    var u = unlocked(), keys = [];
    u.skins.forEach(function (id) { if (SKIN_REQS[id] && SKIN_REQS[id].type !== "free") keys.push("skin:" + id); });
    u.accessories.forEach(function (id) { if (ACC_REQS[id] && ACC_REQS[id].type !== "free") keys.push("acc:" + id); });
    (u.pelajes || []).forEach(function (id) { if (PELAJE_REQS[id] && PELAJE_REQS[id].type !== "free") keys.push("pelaje:" + id); });
    return keys;
  }
  function loadSeen() {
    try { var r = localStorage.getItem(SEEN_KEY); return r ? (JSON.parse(r) || []) : null; } catch (e) { return null; }
  }
  function saveSeen(arr) { try { localStorage.setItem(SEEN_KEY, JSON.stringify(arr)); } catch (e) {} }

  function pending() {
    var cur = currentKeys();
    var seen = loadSeen();
    if (seen === null) { saveSeen(cur); return []; }  // siembra silenciosa
    var set = {}; seen.forEach(function (k) { set[k] = true; });
    return cur.filter(function (k) { return !set[k]; }).map(function (k) {
      var p = k.split(":"); return { kind: p[0], id: p[1] };
    });
  }
  function markSeen() {
    var cur = currentKeys();
    var seen = loadSeen() || [];
    var set = {}; seen.forEach(function (k) { set[k] = true; });
    cur.forEach(function (k) { set[k] = true; });
    saveSeen(Object.keys(set));
  }

  return {
    skinReqs: SKIN_REQS, accessoryReqs: ACC_REQS, pelajeReqs: PELAJE_REQS,
    isUnlocked: isUnlocked, unlocked: unlocked, reqLabel: reqLabel,
    pending: pending, markSeen: markSeen
  };
})();
