/* ============================================================
 * vesper_learner.js — Lo que el tutor IA sabe del alumno (drop-in).
 *
 * Lee lo que la app ya guarda en este dispositivo y lo resume para el
 * system prompt del chat, para que Vesper practique con los errores reales
 * del alumno y no con ejemplos genéricos:
 *   - localStorage["vesper_srs"]      fallos de las lecciones (vesper_srs.js)
 *   - localStorage["vesperProgress"]  lecciones hechas y racha (vesper_progress.js)
 *   - localStorage["vesper_writing"]  revisiones de escritura del chat (este módulo)
 * No depende de que esos scripts estén cargados: solo lee su JSON.
 *
 * El texto va dentro del system que manda el navegador, y el Worker lo corta
 * a MAX_SYSTEM_CHARS (4000). La persona mide ~1100, así que este bloque se
 * queda por debajo de MAX_CONTEXT (1400) para que nunca se coma los
 * guardrails ni la persona.
 *
 * window.VESPER_LEARNER:
 *   contextPrompt()        -> bloque "## What you know..." en inglés, o ""
 *   weakItems(n)           -> [{ q, answer, rule, level, misses, due }] más fallados
 *   dueCount()             -> nº de fallos que tocan repaso hoy
 *   saveWriting(review)    -> guarda una revisión { level, scores, errors:[{type}] }
 *   writingHistory()       -> revisiones guardadas (máx. 10, la última al final)
 * ============================================================ */
window.VESPER_LEARNER = (function () {
  "use strict";
  var MAX_CONTEXT = 1400;
  var WRITING_KEY = "vesper_writing";
  var WRITING_MAX = 10;

  function read(key) {
    try { var v = JSON.parse(localStorage.getItem(key) || "null"); return v && typeof v === "object" ? v : null; }
    catch (e) { return null; }
  }
  function clip(s, n) {
    s = String(s == null ? "" : s).replace(/\s+/g, " ").trim();
    return s.length > n ? s.slice(0, n - 1) + "…" : s;
  }
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function today() { var d = new Date(); return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }

  /* Pasa un ejercicio fallado a "qué se preguntó" + "qué era lo correcto". */
  function describe(ex) {
    if (!ex || !ex.type) return null;
    var q = "", a = "";
    var opts = Array.isArray(ex.options) ? ex.options : null;
    var ans = Array.isArray(ex.answers) ? ex.answers[0] : ex.answer;
    switch (ex.type) {
      case "multiple_choice":
      case "listening":
        q = ex.type === "listening" ? (ex.text ? "Listening: \"" + ex.text + "\" — " : "") + (ex.question || "") : (ex.question || "");
        a = opts && ex.correctIndex != null ? opts[ex.correctIndex] : (ans || "");
        break;
      case "fill_blank":
        q = ex.sentence || ""; a = ans || ""; break;
      case "translate":
      case "type_answer":
        q = ex.prompt || ex.question || ""; a = ans || ""; break;
      case "word_order":
        q = "Put in order: " + (ex.words || []).join(" / ");
        a = Array.isArray(ex.correctOrder) ? ex.correctOrder.join(" ") : "";
        break;
      case "true_false":
        q = "True or false: " + (ex.statement || ""); a = ex.answer ? "true" : "false"; break;
      case "find_error":
        q = "Find the mistake: " + (ex.segments || []).map(function (s) { return typeof s === "string" ? s : (s && s.u) || ""; }).join("");
        a = ex.correction || ""; break;
      case "speak":
        q = "Say: " + (ex.text || ex.answer || ex.prompt || ""); a = ""; break;
      default:
        /* matching / categorize: la explicación lleva el peso */
        q = ex.instruction || ex.question || ex.type; a = "";
    }
    q = clip(q, 110);
    if (!q) return null;
    return { q: q, answer: clip(a, 60), rule: clip(ex.explanation || ex.hint || "", 110) };
  }

  function weakItems(n) {
    var s = read("vesper_srs"), out = [], t = today();
    if (!s || !s.items) return out;
    for (var id in s.items) {
      var it = s.items[id];
      if (!it || !it.ex) continue;
      var d = describe(it.ex);
      if (!d) continue;
      d.level = it.level || "";
      d.misses = it.misses || 1;
      d.due = (it.due || t) <= t;
      d.seen = it.lastSeen || it.added || "";
      out.push(d);
    }
    /* más fallados primero; a igualdad, el más reciente */
    out.sort(function (a, b) { return (b.misses - a.misses) || (a.seen < b.seen ? 1 : a.seen > b.seen ? -1 : 0); });
    return out.slice(0, n || 5);
  }

  function dueCount() {
    var s = read("vesper_srs"), n = 0, t = today();
    if (!s || !s.items) return 0;
    for (var id in s.items) { var it = s.items[id]; if (it && it.ex && (it.due || t) <= t) n++; }
    return n;
  }

  function progressLine() {
    var p = read("vesperProgress");
    if (!p) return "";
    var c = p.completed || {}, n = 0, levels = {};
    for (var k in c) {
      if (/^(review:|shield:)/.test(k)) continue;
      n++;
      var m = /^(A1|A2|B1|B2|C1|C2)/i.exec(k);
      if (m) levels[m[1].toUpperCase()] = 1;
    }
    if (!n) return "";
    var bits = [n + " lesson" + (n === 1 ? "" : "s") + " completed in the app"];
    var lv = Object.keys(levels).sort();
    if (lv.length) bits.push("levels worked on: " + lv.join(", "));
    /* la racha guardada solo vale si la última lección fue hoy o ayer */
    var y = new Date(); y.setDate(y.getDate() - 1);
    var yKey = y.getFullYear() + "-" + pad(y.getMonth() + 1) + "-" + pad(y.getDate());
    if (p.streak > 1 && (p.lastDay === today() || p.lastDay === yKey)) bits.push("current streak " + p.streak + " days");
    return bits.join("; ") + ".";
  }

  /* ---------- Revisiones de escritura ---------- */
  function writingHistory() {
    var w = read(WRITING_KEY);
    return w && Array.isArray(w.list) ? w.list : [];
  }
  function saveWriting(r) {
    if (!r) return;
    var list = writingHistory();
    list.push({
      ts: Date.now(), level: r.level || "?", scores: r.scores || {},
      errors: (r.errors || []).map(function (e) { return { type: clip(e.type, 30) }; }).slice(0, 5)
    });
    try { localStorage.setItem(WRITING_KEY, JSON.stringify({ list: list.slice(-WRITING_MAX) })); } catch (e) {}
  }
  /* Tipos de error que se repiten en 2+ revisiones (lo que de verdad hay que trabajar). */
  function recurringWriting() {
    var cnt = {};
    writingHistory().forEach(function (r) {
      var seen = {};
      (r.errors || []).forEach(function (e) {
        var t = String(e.type || "").toLowerCase().trim();
        if (t && !seen[t]) { seen[t] = 1; cnt[t] = (cnt[t] || 0) + 1; }
      });
    });
    return Object.keys(cnt).filter(function (t) { return cnt[t] >= 2; })
      .sort(function (a, b) { return cnt[b] - cnt[a]; }).slice(0, 4);
  }

  /* ---------- Bloque para el system prompt ---------- */
  function contextPrompt() {
    var items = weakItems(5), prog = progressLine(), wr = writingHistory(), rec = recurringWriting();
    if (!items.length && !prog && !wr.length) return "";
    var L = ["## What you know about this student (from their activity in the Vesper app)"];
    if (prog) L.push("- " + prog);
    if (wr.length) {
      var last = wr[wr.length - 1];
      L.push("- Last writing review in this chat: level " + last.level + "." + (rec.length ? " Recurring writing mistakes: " + rec.join(", ") + "." : ""));
    }
    var HOW = "How to use this: it is private context, not something to recite. When the student asks what to practise, says hi without a plan, or makes a related mistake, build a quick NEW exercise on ONE of these weak points (never repeat the exact item) and explain the rule briefly. Never make them feel bad about past mistakes.";
    if (items.length) {
      /* mete ítems mientras quepan en MAX_CONTEXT (los más fallados primero) */
      var head = "- Exercises they got WRONG in their lessons (most missed first):";
      var used = L.join("\n").length + head.length + HOW.length + 2, lines = [];
      items.forEach(function (it) {
        var line = "  - " + (it.level ? "[" + it.level + "] " : "") + "\"" + it.q + "\"";
        if (it.answer) line += " → correct: \"" + it.answer + "\"";
        if (it.misses > 1) line += " (missed " + it.misses + "×)";
        if (it.rule) line += ". Rule: " + it.rule;
        if (used + line.length + 1 <= MAX_CONTEXT) { lines.push(line); used += line.length + 1; }
      });
      if (lines.length) { L.push(head); L = L.concat(lines); }
    }
    L.push(HOW);
    var txt = L.join("\n");
    return txt.slice(0, MAX_CONTEXT);
  }

  return { contextPrompt: contextPrompt, weakItems: weakItems, dueCount: dueCount,
    saveWriting: saveWriting, writingHistory: writingHistory };
})();
