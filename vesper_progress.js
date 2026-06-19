/* ============================================================
 * vesper_progress.js — Account-free streak + XP store (localStorage).
 * window.VesperProgress API:
 *   getState()                       -> { xp, streak, lastDay, days, completed, shields, achievements, dayCounts, goalTarget }
 *   completeLesson(lessonId, xp, opts) -> { xp, streak, isNewDay, milestone, newShield, shields, newAchievements, dailyGoal }
 *   addXp(n)                         -> new total xp
 *   weekGrid()                       -> [{ label, key, active, isToday }] (last 7 days)
 *   unlock(id)                       -> true if achievement newly unlocked
 *   achievementsState()              -> [{ id, name, icon, desc, unlocked, date }]
 *   dailyGoal()                      -> { target, progress, met }
 *   setGoal(n)                       -> new target
 *   ACHIEVEMENTS                     -> catalog [{ id, name, icon, desc }]
 * Streak = consecutive calendar days with >=1 completed lesson.
 * A shield is earned every 7 days of streak (milestone).
 * Optional cloud sync (when logged in) is a no-op-safe hook for later.
 * ============================================================ */
window.VesperProgress = (function () {
  var KEY = "vesperProgress";
  var DAY_LABELS = ["D", "L", "M", "X", "J", "V", "S"]; // Sun..Sat (es)
  var DEFAULT_GOAL = 3;

  /* Catálogo de logros. Los de "skill mastery" se desbloquean desde leccion.html
     vía unlock("master:<NIVEL>:<skill>"); aquí solo viven los nombres bonitos. */
  var ACHIEVEMENTS = [
    { id: "first-lesson", name: "Primeros pasos", icon: "🐾", desc: "Completa tu primera lección." },
    { id: "lessons-5", name: "Tomando ritmo", icon: "🚶", desc: "Completa 5 lecciones." },
    { id: "lessons-25", name: "En marcha", icon: "🏃", desc: "Completa 25 lecciones." },
    { id: "lessons-50", name: "Imparable", icon: "🚀", desc: "Completa 50 lecciones." },
    { id: "lessons-100", name: "Centurión", icon: "💯", desc: "Completa 100 lecciones." },
    { id: "perfect", name: "Sin errores", icon: "🎯", desc: "Termina una lección sin fallos." },
    { id: "goal-met", name: "Meta del día", icon: "✅", desc: "Cumple tu meta diaria." },
    { id: "streak-7", name: "Una semana", icon: "🔥", desc: "Mantén una racha de 7 días." },
    { id: "streak-30", name: "Un mes entero", icon: "🗓️", desc: "Mantén una racha de 30 días." }
  ];
  /* Nombres legibles para los logros dinámicos de dominio por destreza. */
  var SKILL_NAMES = { grammar: "Gramática", vocab: "Vocabulario", reading: "Lectura", listening: "Listening", use: "Uso del inglés" };
  function masteryMeta(id) {
    var p = id.split(":"); // master:A1:grammar
    var lv = p[1] || "", sk = SKILL_NAMES[p[2]] || p[2] || "";
    return { id: id, name: "Maestría: " + sk + " " + lv, icon: "🏆", desc: "Aprueba el repaso de " + sk + " (" + lv + ")." };
  }
  function metaFor(id) {
    for (var i = 0; i < ACHIEVEMENTS.length; i++) if (ACHIEVEMENTS[i].id === id) return ACHIEVEMENTS[i];
    if (id.indexOf("master:") === 0) return masteryMeta(id);
    return { id: id, name: id, icon: "⭐", desc: "" };
  }

  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function dayKey(d) { d = d || new Date(); return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
  function parseKey(k) { var p = k.split("-"); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function dayDiff(aKey, bKey) { return Math.round((parseKey(bKey) - parseKey(aKey)) / 86400000); }

  /* ¿"Congelar racha" activado? Se guarda en vesper_profile.vesper.freezeStreak
     (Configuración). Lee directo de localStorage para no depender del orden de
     carga de scripts; usa VESPER_PREFS si está disponible. */
  function freezeStreakOn() {
    try { if (window.VESPER_PREFS && VESPER_PREFS.freezeStreak) return !!VESPER_PREFS.freezeStreak(); } catch (e) {}
    try {
      var prof = JSON.parse(localStorage.getItem("vesper_profile") || "null");
      return !!(prof && prof.vesper && prof.vesper.freezeStreak);
    } catch (e) {}
    return false;
  }

  function defaults() { return { xp: 0, streak: 0, lastDay: null, days: {}, completed: {}, shields: 0, achievements: {}, dayCounts: {}, goalTarget: DEFAULT_GOAL, bosses: {} }; }

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return defaults();
      var s = JSON.parse(raw);
      var d = defaults();
      for (var k in d) { if (!(k in s)) s[k] = d[k]; }
      return s;
    } catch (e) { return defaults(); }
  }

  function save(s) {
    try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) { /* private mode / quota: degrade silently */ }
  }

  function getState() { return load(); }

  function addXp(n) { var s = load(); s.xp += (n || 0); save(s); return s.xp; }

  /* nº de lecciones reales completadas (excluye repasos "review:..." y jefes "boss:..."). */
  function lessonCount(s) {
    var n = 0;
    for (var k in s.completed) { if (k.indexOf("review:") !== 0 && k.indexOf("boss:") !== 0) n++; }
    return n;
  }

  /* Evalúa logros genéricos sobre el estado actual; marca los nuevos y
     devuelve la lista de ids recién desbloqueados. */
  function evalAchievements(s, ctx) {
    ctx = ctx || {};
    var unlocked = [];
    function tryUnlock(id, cond) {
      if (cond && !s.achievements[id]) { s.achievements[id] = dayKey(); unlocked.push(id); }
    }
    var count = lessonCount(s);
    tryUnlock("first-lesson", count >= 1);
    tryUnlock("lessons-5", count >= 5);
    tryUnlock("lessons-25", count >= 25);
    tryUnlock("lessons-50", count >= 50);
    tryUnlock("lessons-100", count >= 100);
    tryUnlock("perfect", !!ctx.perfect);
    tryUnlock("streak-7", s.streak >= 7);
    tryUnlock("streak-30", s.streak >= 30);
    tryUnlock("goal-met", ctx.goalMet);
    return unlocked;
  }

  function goalInfo(s, today) {
    var target = s.goalTarget || DEFAULT_GOAL;
    var progress = (s.dayCounts && s.dayCounts[today]) || 0;
    return { target: target, progress: progress, met: progress >= target };
  }

  function completeLesson(lessonId, xpEarned, opts) {
    opts = opts || {};
    var s = load();
    var today = dayKey();
    var isNewDay = s.lastDay !== today;

    if (!s.lastDay) {
      s.streak = 1;
    } else {
      var dd = dayDiff(s.lastDay, today);
      if (dd === 0) { /* already counted today: keep streak */ }
      else if (dd === 1) { s.streak += 1; }
      else if (dd > 1) {
        // missed one or more days. Con "congelar racha" activado, la racha no se
        // rompe: el regreso cuenta como continuación. Si no, se reinicia.
        if (freezeStreakOn()) { s.streak += 1; }
        else { s.streak = 1; }
      }
      // dd < 0 (clock moved back): leave streak as-is
    }

    s.lastDay = today;
    s.days[today] = true;
    s.dayCounts[today] = (s.dayCounts[today] || 0) + 1;
    s.xp += (xpEarned || 0);
    if (lessonId) s.completed[lessonId] = today;

    var newShield = false, milestone = false;
    if (s.streak > 0 && s.streak % 7 === 0) {
      var earned = Math.floor(s.streak / 7);
      if (earned > s.shields) { s.shields = earned; newShield = true; milestone = true; }
    }

    var dg = goalInfo(s, today);
    var newAchievements = evalAchievements(s, { perfect: !!opts.perfect, goalMet: dg.met });

    save(s);
    syncIfLoggedIn(s); // optional, safe no-op until accounts are wired
    return { xp: s.xp, streak: s.streak, isNewDay: isNewDay, milestone: milestone, newShield: newShield,
      shields: s.shields, newAchievements: newAchievements, dailyGoal: dg };
  }

  /* Desbloqueo puntual desde otras páginas (p.ej. maestría por destreza).
     Devuelve true solo si es nuevo. */
  function unlock(id) {
    if (!id) return false;
    var s = load();
    if (s.achievements[id]) return false;
    s.achievements[id] = dayKey();
    save(s);
    return true;
  }

  function dailyGoal() { var s = load(); return goalInfo(s, dayKey()); }
  function setGoal(n) { var s = load(); s.goalTarget = Math.max(1, Math.min(20, parseInt(n, 10) || DEFAULT_GOAL)); save(s); return s.goalTarget; }

  /* ---- Jefes de nivel ("boss") ----
     Registra que el jefe de un mundo (NIVEL CEFR) fue superado y desbloquea el
     siguiente mundo. Guarda la mejor puntuación. Devuelve true si se guardó. */
  function passBoss(level, pct) {
    if (!level) return false;
    var s = load();
    if (!s.bosses) s.bosses = {};
    pct = Math.max(0, Math.min(100, Math.round(pct || 0)));
    var cur = s.bosses[level];
    if (!cur || pct > cur.pct) { s.bosses[level] = { pct: pct, date: dayKey() }; save(s); }
    return true;
  }
  function bossPassed(level) { var s = load(); return !!(s.bosses && s.bosses[level]); }

  /* Estado completo de logros para pintar la vitrina (ganados + bloqueados). */
  function achievementsState() {
    var s = load();
    var seen = {}, out = [];
    ACHIEVEMENTS.forEach(function (a) {
      seen[a.id] = true;
      out.push({ id: a.id, name: a.name, icon: a.icon, desc: a.desc, unlocked: !!s.achievements[a.id], date: s.achievements[a.id] || null });
    });
    /* logros dinámicos ya ganados (maestrías) que no están en el catálogo fijo */
    for (var id in s.achievements) {
      if (seen[id]) continue;
      var m = metaFor(id);
      out.push({ id: id, name: m.name, icon: m.icon, desc: m.desc, unlocked: true, date: s.achievements[id] });
    }
    return out;
  }

  function weekGrid() {
    var s = load();
    var today = new Date();
    var out = [];
    for (var i = 6; i >= 0; i--) {
      var d = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);
      var key = dayKey(d);
      out.push({ label: DAY_LABELS[d.getDay()], key: key, active: !!s.days[key], isToday: i === 0 });
    }
    return out;
  }

  /* Optional cloud sync hook. Intentionally inert for the account-free MVP:
     when optional accounts are wired, this can push `s` to a self-scoped
     Firestore doc (progress/{uid}) only if a verified user is present. */
  function syncIfLoggedIn(s) {
    try {
      if (window.VESPER_SYNC && typeof window.VESPER_SYNC.push === "function") {
        window.VESPER_SYNC.push(s);
      }
    } catch (e) { /* never block local progress on a sync error */ }
  }

  function recomputeStreak(days, lastDay) {
    if (!lastDay || !days || !days[lastDay]) return 0;
    var n = 0, d = parseKey(lastDay);
    while (days[dayKey(d)]) { n++; d = new Date(d.getFullYear(), d.getMonth(), d.getDate() - 1); }
    return n;
  }

  /* Fusiona un estado remoto (de la nube) con el local; guarda y devuelve el resultado.
     XP/shields = máximo; days = unión; completed = la fecha más reciente por lección;
     streak = recalculada sobre la unión de días (evita inflar la racha). */
  function merge(remote) {
    var s = load(); remote = remote || {};
    var days = {}, completed = {}, achievements = {}, dayCounts = {}, bosses = {}, k;
    for (k in (s.days || {})) days[k] = true;
    for (k in (remote.days || {})) days[k] = true;
    for (k in (s.completed || {})) completed[k] = s.completed[k];
    for (k in (remote.completed || {})) { if (!completed[k] || remote.completed[k] > completed[k]) completed[k] = remote.completed[k]; }
    for (k in (s.achievements || {})) achievements[k] = s.achievements[k];
    for (k in (remote.achievements || {})) { if (!achievements[k] || remote.achievements[k] < achievements[k]) achievements[k] = remote.achievements[k]; }
    for (k in (s.dayCounts || {})) dayCounts[k] = s.dayCounts[k];
    for (k in (remote.dayCounts || {})) { if ((remote.dayCounts[k] || 0) > (dayCounts[k] || 0)) dayCounts[k] = remote.dayCounts[k]; }
    /* jefes: une por NIVEL — conserva mayor pct; fecha más antigua entre las disponibles */
    for (k in (s.bosses || {})) bosses[k] = s.bosses[k];
    for (k in (remote.bosses || {})) {
      var rb = remote.bosses[k];
      if (!bosses[k]) bosses[k] = rb;
      else bosses[k] = { pct: Math.max(bosses[k].pct || 0, rb.pct || 0),
                         date: (bosses[k].date && rb.date) ? (bosses[k].date < rb.date ? bosses[k].date : rb.date) : (bosses[k].date || rb.date) };
    }
    var lastDay = s.lastDay || null;
    if (remote.lastDay && (!lastDay || remote.lastDay > lastDay)) lastDay = remote.lastDay;
    var merged = {
      xp: Math.max(s.xp || 0, remote.xp || 0),
      streak: 0,
      lastDay: lastDay,
      days: days,
      completed: completed,
      shields: Math.max(s.shields || 0, remote.shields || 0),
      achievements: achievements,
      dayCounts: dayCounts,
      goalTarget: s.goalTarget || remote.goalTarget || DEFAULT_GOAL,
      bosses: bosses
    };
    merged.streak = recomputeStreak(days, lastDay);
    save(merged);
    return merged;
  }

  return { getState: getState, completeLesson: completeLesson, addXp: addXp, weekGrid: weekGrid, merge: merge,
    unlock: unlock, dailyGoal: dailyGoal, setGoal: setGoal, passBoss: passBoss, bossPassed: bossPassed,
    achievementsState: achievementsState, ACHIEVEMENTS: ACHIEVEMENTS };
})();
