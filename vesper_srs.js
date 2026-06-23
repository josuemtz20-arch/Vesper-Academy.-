/* ============================================================
 * vesper_srs.js — Repaso espaciado de errores (Leitner / SM-2 lite).
 *
 * Captura los ejercicios que el alumno FALLA en cualquier lección y los
 * reagenda en cajas con intervalos crecientes. Cuando hay ítems vencidos,
 * arma una "lección de repaso" sintética (objeto-lección self-contained que
 * leccion.html ya sabe pintar con sus renderers existentes).
 *
 * Account-free: todo vive en localStorage["vesper_srs"]. Degrada en silencio.
 *
 * window.VESPER_SRS:
 *   record(lessonId, ex, meta)   -> registra un fallo (caja 0, vence hoy)
 *   grade(id, ok)                -> promueve (ok) o reinicia (fallo) un ítem
 *   dueCount()                   -> nº de ítems vencidos hoy
 *   total()                      -> nº de ítems en seguimiento
 *   buildReviewLesson(max)       -> objeto-lección de repaso (o null si no hay)
 *   getState()                   -> estado crudo (debug)
 * ============================================================ */
window.VESPER_SRS = (function () {
  var KEY = "vesper_srs";
  /* intervalos por caja (nº de aciertos seguidos): días hasta el próximo repaso */
  var INTERVALS = [0, 1, 3, 7, 16, 30];
  var GRADUATE_BOX = INTERVALS.length;   /* alcanzar esta caja = dominado (se retira) */
  var MAX_LESSON = 12;

  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function dayKey(d) { d = d || new Date(); return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
  function addDays(key, n) {
    var p = key.split("-"), d = new Date(+p[0], +p[1] - 1, +p[2]);
    d.setDate(d.getDate() + n);
    return dayKey(d);
  }

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      var s = raw ? JSON.parse(raw) : null;
      if (!s || typeof s !== "object") return { items: {} };
      if (!s.items) s.items = {};
      return s;
    } catch (e) { return { items: {} }; }
  }
  function save(s) { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {} }

  /* id estable a partir del contenido del ejercicio (para no duplicar el mismo
     fallo y poder reconciliar entre sesiones). Hash corto tipo djb2. */
  function hashEx(ex) {
    var str = "";
    try { str = JSON.stringify(ex); } catch (e) { str = "" + (ex && ex.question); }
    var h = 5381, i;
    for (i = 0; i < str.length; i++) h = ((h << 5) + h + str.charCodeAt(i)) | 0;
    return (h >>> 0).toString(36);
  }

  /* tipos de ejercicio que el motor de repaso puede re-renderizar tal cual */
  var REPLAYABLE = { multiple_choice: 1, word_order: 1, true_false: 1, fill_blank: 1,
    translate: 1, type_answer: 1, matching: 1, listening: 1, categorize: 1, find_error: 1, speak: 1 };

  function record(lessonId, ex, meta) {
    if (!ex || !ex.type || !REPLAYABLE[ex.type]) return;     /* reading u otros largos: no se repasan */
    meta = meta || {};
    var s = load();
    var id = (lessonId || "?") + "#" + hashEx(ex);
    var today = dayKey();
    var cur = s.items[id];
    if (cur) { cur.box = 0; cur.due = today; cur.misses = (cur.misses || 0) + 1; cur.lastSeen = today; }
    else {
      s.items[id] = { ex: ex, lessonId: lessonId || null, skill: meta.skill || null, level: meta.level || null,
        box: 0, due: today, misses: 1, added: today, lastSeen: today };
    }
    save(s);
  }

  function grade(id, ok) {
    if (!id) return;
    var s = load(); var it = s.items[id];
    if (!it) return;
    var today = dayKey();
    it.lastSeen = today;
    if (ok) {
      it.box = (it.box || 0) + 1;
      if (it.box >= GRADUATE_BOX) { delete s.items[id]; save(s); return; }   /* dominado: se retira */
      it.due = addDays(today, INTERVALS[it.box] || 1);
    } else {
      it.box = 0; it.due = today; it.misses = (it.misses || 0) + 1;
    }
    save(s);
  }

  function dueList() {
    var s = load(), today = dayKey(), out = [];
    for (var id in s.items) {
      var it = s.items[id];
      if (!it || !it.ex) continue;
      if ((it.due || today) <= today) out.push({ id: id, it: it });
    }
    /* primero los más atrasados / con más fallos */
    out.sort(function (a, b) {
      if (a.it.due !== b.it.due) return a.it.due < b.it.due ? -1 : 1;
      return (b.it.misses || 0) - (a.it.misses || 0);
    });
    return out;
  }

  function dueCount() { return dueList().length; }
  function total() { var s = load(), n = 0; for (var k in s.items) n++; return n; }

  /* Construye una lección de repaso con los ítems vencidos. Devuelve también
     `srsIds` en paralelo a `exercises` para que leccion.html pueda calificar
     cada ítem (grade) tras responderlo. lessonId usa el prefijo "review:" para
     no contar como lección nueva en el progreso. */
  function buildReviewLesson(max) {
    var due = dueList();
    if (!due.length) return null;
    due = due.slice(0, Math.max(1, Math.min(max || MAX_LESSON, due.length)));
    var exercises = [], srsIds = [];
    due.forEach(function (d) { exercises.push(d.it.ex); srsIds.push(d.id); });
    return {
      lessonId: "review:srs", level: (due[0].it.level || "A1"), track: "Repaso", title: "Repaso de errores",
      srsReview: true, srsIds: srsIds,
      explanation: {
        body: "Vuelve a enfrentar los ejercicios que fallaste. Los que aciertes hoy se reagendan más adelante; los que vuelvas a fallar regresan pronto. Sin presión: practica a tu ritmo.",
        examples: []
      },
      exercises: exercises, xpReward: 10 + 2 * exercises.length, mascotState: "thinking", nextLessonId: null
    };
  }

  function getState() { return load(); }

  return { record: record, grade: grade, dueCount: dueCount, total: total,
    buildReviewLesson: buildReviewLesson, getState: getState };
})();
