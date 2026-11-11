/* ============================================================
 * vesper_adaptive.js — Lecciones adaptativas de Vesper (drop-in).
 *
 * Personaliza cada leccion segun:
 *   1) el perfil de onboarding (localStorage "vesper_profile":
 *      { name, goal, topics, styles, level 0-5, ... })
 *   2) un quiz corto de calibracion al inicio de la sesion (warm-up),
 *      que ajusta la dificultad de esa sesion.
 *
 * USO: incluye <script src="vesper_adaptive.js"></script>.
 *   VESPER_ADAPTIVE.getProfile()                 -> perfil o null
 *   VESPER_ADAPTIVE.warmupBank(levelBand, n)     -> [preguntas] de calibracion
 *   VESPER_ADAPTIVE.scoreWarmup(answers)         -> { ratio, calibration }
 *   VESPER_ADAPTIVE.adaptLesson(lesson, ctx)     -> copia adaptada de la leccion
 *   VESPER_ADAPTIVE.recommendOrder(order, L)     -> orden del indice personalizado
 *   VESPER_ADAPTIVE.personalize(text)            -> sustituye {name} y similares
 *
 * localStorage: "vesper_session" guarda la calibracion del dia.
 * ============================================================ */
window.VESPER_ADAPTIVE = (function () {
  var PROFILE_KEY = "vesper_profile";
  var SESSION_KEY = "vesper_session";

  /* nivel 0-5 (onboarding) -> banda CEFR usada por las lecciones */
  var BANDS = ["A1", "A1", "A2", "B1", "B2", "C1"];
  function levelToBand(lv) { lv = Math.max(0, Math.min(5, lv | 0)); return BANDS[lv]; }
  function bandRank(b) { return ["A1", "A2", "B1", "B2", "C1"].indexOf((b || "A1").toUpperCase()); }

  function getProfile() {
    try {
      var p = JSON.parse(localStorage.getItem(PROFILE_KEY) || "null");
      if (p && typeof p === "object") return p;
    } catch (e) {}
    return null;
  }
  function profileLevel() {
    var p = getProfile();
    return p && typeof p.level === "number" ? p.level : 1;
  }
  function profileStyles() {
    var p = getProfile();
    return (p && Array.isArray(p.styles)) ? p.styles : [];
  }

  /* ---------- Quiz de calibracion (warm-up) ----------
     Bancos cortos por banda. skill: grammar | vocab | reading.    */
  var WARMUP = {
    A1: [
      { q: "She ___ a teacher.", options: ["is", "are", "am"], correct: 0, skill: "grammar" },
      { q: "Choose the plural: one box, two ___", options: ["boxs", "boxes", "box"], correct: 1, skill: "grammar" },
      { q: "What is the opposite of \"big\"?", options: ["small", "tall", "fast"], correct: 0, skill: "vocab" },
      { q: "I ___ coffee every morning.", options: ["drinks", "drink", "drinking"], correct: 1, skill: "grammar" },
      { q: "\"Apple\" is a kind of...", options: ["animal", "fruit", "color"], correct: 1, skill: "vocab" }
    ],
    A2: [
      { q: "Yesterday I ___ to the park.", options: ["go", "went", "gone"], correct: 1, skill: "grammar" },
      { q: "She is ___ than her brother.", options: ["tall", "taller", "tallest"], correct: 1, skill: "grammar" },
      { q: "Pick the synonym of \"happy\":", options: ["glad", "tired", "angry"], correct: 0, skill: "vocab" },
      { q: "There ___ some milk in the fridge.", options: ["are", "is", "be"], correct: 1, skill: "grammar" },
      { q: "We ___ watching TV right now.", options: ["are", "is", "do"], correct: 0, skill: "grammar" }
    ],
    B1: [
      { q: "If it rains, we ___ at home.", options: ["stay", "will stay", "stayed"], correct: 1, skill: "grammar" },
      { q: "I have ___ finished my homework.", options: ["yet", "already", "since"], correct: 1, skill: "grammar" },
      { q: "Choose: a person who flies planes is a ___", options: ["pilot", "driver", "sailor"], correct: 0, skill: "vocab" },
      { q: "She told me she ___ tired.", options: ["is", "was", "be"], correct: 1, skill: "grammar" },
      { q: "The book ___ by millions of people.", options: ["read", "was read", "reads"], correct: 1, skill: "grammar" }
    ],
    B2: [
      { q: "By the time we arrived, the film ___ started.", options: ["has", "had", "have"], correct: 1, skill: "grammar" },
      { q: "If I ___ you, I would apologise.", options: ["am", "were", "was being"], correct: 1, skill: "grammar" },
      { q: "Choose the best word: a strong, lasting ___ of trust.", options: ["bond", "band", "bend"], correct: 0, skill: "vocab" },
      { q: "He denied ___ the email.", options: ["to send", "sending", "sent"], correct: 1, skill: "grammar" },
      { q: "Not only ___ late, but he also forgot the keys.", options: ["he was", "was he", "he is"], correct: 1, skill: "grammar" }
    ],
    C1: [
      { q: "Seldom ___ such dedication.", options: ["we see", "do we see", "we do see"], correct: 1, skill: "grammar" },
      { q: "The proposal was met with ___ enthusiasm.", options: ["scarce", "scant", "scanty"], correct: 1, skill: "vocab" },
      { q: "Had I known, I ___ differently.", options: ["would act", "would have acted", "had acted"], correct: 1, skill: "grammar" },
      { q: "Her argument was both cogent and ___.", options: ["compelling", "compulsive", "complacent"], correct: 0, skill: "vocab" },
      { q: "___ being tired, she finished the report.", options: ["Despite", "Although", "However"], correct: 0, skill: "grammar" }
    ]
  };

  function shuffleN(arr, n) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return (n && n < a.length) ? a.slice(0, n) : a;
  }
  /* Devuelve n preguntas de calibracion para una banda dada */
  function warmupBank(band, n) {
    band = WARMUP[band] ? band : "A1";
    return shuffleN(WARMUP[band], n || 3);
  }

  /* answers: [{ correct:bool, skill }]  -> calibracion -1/0/+1 + skills debiles */
  function scoreWarmup(answers) {
    var total = answers.length || 1;
    var ok = answers.filter(function (a) { return a && a.correct; }).length;
    var ratio = ok / total;
    var calibration = 0;
    if (ratio >= 0.85) calibration = 1;       // domina: sube dificultad
    else if (ratio <= 0.4) calibration = -1;  // flojea: baja dificultad
    var weak = {};
    answers.forEach(function (a) { if (a && !a.correct && a.skill) weak[a.skill] = (weak[a.skill] || 0) + 1; });
    var result = { ratio: ratio, correct: ok, total: total, calibration: calibration, weak: weak, ts: Date.now() };
    try { localStorage.setItem(SESSION_KEY, JSON.stringify(result)); } catch (e) {}
    return result;
  }
  function getSession() {
    try {
      var s = JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
      /* valida frescura: misma jornada (12h) */
      if (s && Date.now() - (s.ts || 0) < 12 * 3600 * 1000) return s;
    } catch (e) {}
    return null;
  }

  /* clona superficial+ejercicios */
  function clone(obj) { return JSON.parse(JSON.stringify(obj)); }

  /*
   * adaptLesson(lesson, ctx)
   * Devuelve una COPIA de la lección con sus ejercicios en el orden y la
   * cantidad en que se escribieron, más targetBand.
   *
   * Hasta 2026-11-11 reordenaba los ejercicios por tipo/dificultad y, si el
   * calentamiento salía flojo, recortaba el 30 % más "difícil". Eso rompía
   * las lecciones: una lectura quedaba con las preguntas antes del texto, y
   * el modo "fácil" quitaba justo los ejercicios de producción y de audio,
   * que es donde se aprende. Una lección es una secuencia: se respeta.
   * (La adaptación real al nivel la hacen el mapa y el repaso espaciado.)
   */
  function adaptLesson(lesson, ctx) {
    if (!lesson || !lesson.exercises) return lesson;
    ctx = ctx || {};
    var lv = (typeof ctx.level === "number") ? ctx.level : profileLevel();
    var out = clone(lesson);
    out.adapted = false;            /* nada cambió: no se anuncia "Adaptada para ti" */
    out.targetBand = levelToBand(lv);
    return out;
  }

  /* ---------- Orden del indice personalizado ----------
     Acerca las lecciones de la banda del usuario; mantiene el resto. */
  function recommendOrder(order, L) {
    var p = getProfile();
    if (!p || !L) return order;
    var band = levelToBand(typeof p.level === "number" ? p.level : 1);
    var target = bandRank(band);
    var interests = Array.isArray(p.topics) ? p.topics : [];
    var withMeta = order.map(function (id, idx) {
      var l = L[id] || {};
      var r = bandRank(l.level);
      var dist = (r < 0) ? 99 : Math.abs(r - target);
      /* afinidad por interes: 0 si el tema esta entre los intereses, si no 1 */
      var topicMatch = (l.topic && interests.indexOf(l.topic) >= 0) ? 0 : 1;
      return { id: id, idx: idx, dist: dist, topicMatch: topicMatch };
    });
    /* primero cercania de nivel, luego coincidencia de interes, luego orden original */
    withMeta.sort(function (a, b) {
      return a.dist - b.dist || a.topicMatch - b.topicMatch || a.idx - b.idx;
    });
    return withMeta.map(function (o) { return o.id; });
  }

  /* ---------- Personalizacion de texto ---------- */
  function personalize(text) {
    if (text == null) return text;
    var p = getProfile();
    var name = (p && p.name) ? String(p.name).trim() : "";
    return String(text).replace(/\{name\}/g, name || "").replace(/\s{2,}/g, " ").trim();
  }
  function greeting() {
    var p = getProfile();
    var name = (p && p.name) ? String(p.name).trim() : "";
    return name ? ("Hola, " + name + "!") : "Hola!";
  }

  return {
    getProfile: getProfile, profileLevel: profileLevel, profileStyles: profileStyles,
    levelToBand: levelToBand, bandRank: bandRank,
    warmupBank: warmupBank, scoreWarmup: scoreWarmup, getSession: getSession,
    adaptLesson: adaptLesson, recommendOrder: recommendOrder,
    personalize: personalize, greeting: greeting
  };
})();
