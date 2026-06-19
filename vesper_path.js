/* ============================================================
 * vesper_path.js — Ruta de aprendizaje progresiva (estilo Test-English).
 *
 * Organiza las lecciones por NIVEL (A1..C1) y DESTREZA (gramatica,
 * vocabulario, listening, use of english), con desbloqueo progresivo:
 * dentro de cada escalera (nivel + destreza) una leccion se abre cuando
 * la anterior esta completada. Guarda la mejor puntuacion por leccion
 * para mostrar estrellas y "continuar donde lo dejaste".
 *
 * USO: incluye <script src="vesper_path.js"></script> (tras vesper_progress.js).
 *   VESPER_PATH.build(L, ORDER)        -> estructura agrupada + estado
 *   VESPER_PATH.status(id, built)      -> "completed" | "open" | "locked"
 *   VESPER_PATH.continueLesson(built)  -> id de la proxima leccion sugerida
 *   VESPER_PATH.levelProgress(lv,built)-> { done, total, pct }
 *   VESPER_PATH.setScore(id, pct)      -> guarda la mejor puntuacion (0-100)
 *   VESPER_PATH.getScore(id) / stars(pct)
 *
 * localStorage: "vesper_lesson_scores" = { lessonId: bestPct }
 * ============================================================ */
window.VESPER_PATH = (function () {
  var LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"];
  var SCORE_KEY = "vesper_lesson_scores";

  var SKILLS = {
    grammar:   { label: "Gramática",        icon: "📘", order: 0 },
    vocab:     { label: "Vocabulario",      icon: "🗂️", order: 1 },
    reading:   { label: "Lectura",          icon: "📖", order: 2 },
    listening: { label: "Listening",        icon: "🎧", order: 3 },
    use:       { label: "Uso del inglés",   icon: "✍️", order: 4 }
  };
  var SKILL_ORDER = ["grammar", "vocab", "reading", "listening", "use"];

  var LEVEL_COLORS = { A1: "#4aa3df", A2: "#2ecc71", B1: "#e67e22", B2: "#a569bd", C1: "#c0392b", C2: "#1B1B2F" };
  function levelColor(lv) { return LEVEL_COLORS[normLevel(lv)] || "#C9A84C"; }

  function normLevel(lv) {
    lv = ("" + (lv || "")).toUpperCase().replace("+", "").trim();
    if (LEVELS.indexOf(lv) >= 0) return lv;
    var c = lv.charAt(0);
    return c === "A" ? "A1" : c === "B" ? "B1" : c === "C" ? "C1" : "A1";
  }

  /* clasifica una leccion en una destreza */
  function skillOf(l) {
    if (!l) return "use";
    if (l.skill && SKILLS[l.skill]) return l.skill;
    var track = ("" + (l.track || "")).toLowerCase();
    if (track.indexOf("grammar") >= 0 || track.indexOf("gramát") >= 0 || track.indexOf("gramat") >= 0) return "grammar";
    var ex = l.exercises || [];
    if (!ex.length) return "use";
    var read = ex.filter(function (e) { return e.type === "reading"; }).length;
    if (read >= 1) return "reading";
    var listen = ex.filter(function (e) { return e.type === "listening"; }).length;
    if (listen >= Math.ceil(ex.length / 2)) return "listening";
    var vocab = ex.filter(function (e) { return e.type === "matching" || e.type === "categorize"; }).length;
    if (vocab >= Math.ceil(ex.length / 2)) return "vocab";
    return "use";
  }

  function completedMap() {
    try {
      if (window.VesperProgress && window.VesperProgress.getState) {
        return window.VesperProgress.getState().completed || {};
      }
    } catch (e) {}
    return {};
  }

  /* construye la estructura agrupada + indices de secuencia para el desbloqueo */
  function build(L, ORDER) {
    L = L || {}; ORDER = ORDER || Object.keys(L);
    var levels = {};
    LEVELS.forEach(function (lv) { levels[lv] = { lessons: [], bySkill: {}, done: 0, total: 0 }; });
    var seqIndex = {}, seqKey = {}, order = [];
    ORDER.forEach(function (id) {
      var l = L[id]; if (!l) return;
      var lv = normLevel(l.level); if (!levels[lv]) return;
      var sk = skillOf(l);
      order.push(id);
      levels[lv].lessons.push(id);
      (levels[lv].bySkill[sk] = levels[lv].bySkill[sk] || []).push(id);
      var key = lv + "|" + sk;
      (seqIndex[key] = seqIndex[key] || []).push(id);
      seqKey[id] = key;
    });
    var comp = completedMap();
    LEVELS.forEach(function (lv) {
      levels[lv].total = levels[lv].lessons.length;
      levels[lv].done = levels[lv].lessons.filter(function (id) { return comp[id]; }).length;
    });
    return { levels: levels, seqIndex: seqIndex, seqKey: seqKey, order: order, completed: comp };
  }

  function isCompleted(id, b) { return !!(b && b.completed && b.completed[id]); }

  function isUnlocked(id, b) {
    if (!b) return true;
    if (b.completed[id]) return true;
    var key = b.seqKey[id]; if (!key) return true;
    var seq = b.seqIndex[key] || [];
    var pos = seq.indexOf(id);
    if (pos <= 0) return true;               // primera de su escalera: siempre abierta
    return !!b.completed[seq[pos - 1]];       // se abre al completar la anterior
  }

  function status(id, b) {
    return isCompleted(id, b) ? "completed" : (isUnlocked(id, b) ? "open" : "locked");
  }

  /* primera leccion abierta y sin completar (continuar donde lo dejaste) */
  function continueLesson(b) {
    if (!b) return null;
    for (var i = 0; i < b.order.length; i++) {
      var id = b.order[i];
      if (!b.completed[id] && isUnlocked(id, b)) return id;
    }
    return null;
  }

  function levelProgress(lv, b) {
    lv = normLevel(lv);
    var L = (b && b.levels && b.levels[lv]) ? b.levels[lv] : { done: 0, total: 0 };
    var pct = L.total ? Math.round(100 * L.done / L.total) : 0;
    return { done: L.done, total: L.total, pct: pct };
  }

  /* ---- puntuaciones / estrellas ---- */
  function loadScores() {
    try { return JSON.parse(localStorage.getItem(SCORE_KEY) || "{}") || {}; } catch (e) { return {}; }
  }
  function getScore(id) { var s = loadScores(); return typeof s[id] === "number" ? s[id] : null; }
  function setScore(id, pct) {
    if (!id) return;
    pct = Math.max(0, Math.min(100, Math.round(pct)));
    var s = loadScores();
    if (typeof s[id] !== "number" || pct > s[id]) {
      s[id] = pct;
      try { localStorage.setItem(SCORE_KEY, JSON.stringify(s)); } catch (e) {}
    }
  }
  function stars(pct) {
    if (pct == null) return 0;
    if (pct >= 90) return 3;
    if (pct >= 70) return 2;
    return 1;
  }

  /* ---- Regiones / Jefes de nivel ("boss") ----
     Un mundo (NIVEL) está "completo" cuando todas sus lecciones están hechas;
     ahí se habilita el jefe. El siguiente mundo se desbloquea al superar el jefe
     del anterior. Desbloqueo SUAVE: un mundo con progreso propio (done>0) también
     queda abierto, para no atrapar a usuarios con avance previo. */
  function regionComplete(lv, b) {
    lv = normLevel(lv);
    var g = b && b.levels && b.levels[lv];
    return !!(g && g.total && g.done >= g.total);
  }
  function bossUnlocked(lv, b) { return regionComplete(lv, b); }
  function regionUnlocked(lv, b) {
    lv = normLevel(lv);
    var i = LEVELS.indexOf(lv);
    if (i <= 0) return true;                       // A1 siempre abierto
    var prev = LEVELS[i - 1];
    var passed = !!(window.VesperProgress && window.VesperProgress.bossPassed && window.VesperProgress.bossPassed(prev));
    var hasProgress = !!(b && b.levels && b.levels[lv] && b.levels[lv].done > 0);
    return passed || hasProgress;
  }

  return {
    LEVELS: LEVELS, SKILLS: SKILLS, SKILL_ORDER: SKILL_ORDER,
    levelColor: levelColor, normLevel: normLevel, skillOf: skillOf,
    build: build, isCompleted: isCompleted, isUnlocked: isUnlocked, status: status,
    continueLesson: continueLesson, levelProgress: levelProgress,
    regionComplete: regionComplete, bossUnlocked: bossUnlocked, regionUnlocked: regionUnlocked,
    getScore: getScore, setScore: setScore, stars: stars
  };
})();
