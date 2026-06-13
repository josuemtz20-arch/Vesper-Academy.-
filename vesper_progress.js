/* ============================================================
 * vesper_progress.js — Account-free streak + XP store (localStorage).
 * window.VesperProgress API:
 *   getState()                     -> { xp, streak, lastDay, days, completed, shields }
 *   completeLesson(lessonId, xp)   -> { xp, streak, isNewDay, milestone, newShield, shields }
 *   addXp(n)                       -> new total xp
 *   weekGrid()                     -> [{ label, key, active, isToday }] (last 7 days)
 * Streak = consecutive calendar days with >=1 completed lesson.
 * A shield is earned every 7 days of streak (milestone).
 * Optional cloud sync (when logged in) is a no-op-safe hook for later.
 * ============================================================ */
window.VesperProgress = (function () {
  var KEY = "vesperProgress";
  var DAY_LABELS = ["D", "L", "M", "X", "J", "V", "S"]; // Sun..Sat (es)

  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function dayKey(d) { d = d || new Date(); return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
  function parseKey(k) { var p = k.split("-"); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function dayDiff(aKey, bKey) { return Math.round((parseKey(bKey) - parseKey(aKey)) / 86400000); }

  function defaults() { return { xp: 0, streak: 0, lastDay: null, days: {}, completed: {}, shields: 0 }; }

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

  function completeLesson(lessonId, xpEarned) {
    var s = load();
    var today = dayKey();
    var isNewDay = s.lastDay !== today;

    if (!s.lastDay) {
      s.streak = 1;
    } else {
      var dd = dayDiff(s.lastDay, today);
      if (dd === 0) { /* already counted today: keep streak */ }
      else if (dd === 1) { s.streak += 1; }
      else if (dd > 1) { s.streak = 1; } // missed a day -> reset
      // dd < 0 (clock moved back): leave streak as-is
    }

    s.lastDay = today;
    s.days[today] = true;
    s.xp += (xpEarned || 0);
    if (lessonId) s.completed[lessonId] = today;

    var newShield = false, milestone = false;
    if (s.streak > 0 && s.streak % 7 === 0) {
      var earned = Math.floor(s.streak / 7);
      if (earned > s.shields) { s.shields = earned; newShield = true; milestone = true; }
    }

    save(s);
    syncIfLoggedIn(s); // optional, safe no-op until accounts are wired
    return { xp: s.xp, streak: s.streak, isNewDay: isNewDay, milestone: milestone, newShield: newShield, shields: s.shields };
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
    var days = {}, completed = {}, k;
    for (k in (s.days || {})) days[k] = true;
    for (k in (remote.days || {})) days[k] = true;
    for (k in (s.completed || {})) completed[k] = s.completed[k];
    for (k in (remote.completed || {})) { if (!completed[k] || remote.completed[k] > completed[k]) completed[k] = remote.completed[k]; }
    var lastDay = s.lastDay || null;
    if (remote.lastDay && (!lastDay || remote.lastDay > lastDay)) lastDay = remote.lastDay;
    var merged = {
      xp: Math.max(s.xp || 0, remote.xp || 0),
      streak: 0,
      lastDay: lastDay,
      days: days,
      completed: completed,
      shields: Math.max(s.shields || 0, remote.shields || 0)
    };
    merged.streak = recomputeStreak(days, lastDay);
    save(merged);
    return merged;
  }

  return { getState: getState, completeLesson: completeLesson, addXp: addXp, weekGrid: weekGrid, merge: merge };
})();
