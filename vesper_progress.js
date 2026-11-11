/* ============================================================
 * vesper_progress.js — Account-free streak + XP store (localStorage).
 * window.VesperProgress API:
 *   getState()                       -> { xp, streak, lastDay, days, completed, shields, achievements, dayCounts, goalTarget }
 *   completeLesson(lessonId, xp, opts) -> { xp, streak, isNewDay, milestone, newShield, shields, newAchievements, dailyGoal }
 *   addXp(n)                         -> new total xp
 *   weekGrid()                       -> [{ label, key, active, isToday }] (last 7 days)
 *   unlock(id)                       -> true if achievement newly unlocked
 *   achievementsState()              -> [{ id, cat, tier, name, desc, secret, hint, unlocked, date, cur, goal }]
 *   dailyGoal()                      -> { target, progress, met }
 *   setGoal(n)                       -> new target
 *   bump(stat, n, mode)              -> ids newly unlocked (stats counter: "forja", "maxCombo"…)
 *   check(ctx)                       -> ids newly unlocked (retroactive evaluation)
 *   ACHIEVEMENTS / CATEGORIES        -> catalog [{ id, cat, tier, metric, goal, name, desc }]
 * Streak = consecutive calendar days with >=1 completed lesson.
 * A shield is earned every 7 days of streak (milestone).
 * Optional cloud sync (when logged in) is a no-op-safe hook for later.
 * ============================================================ */
window.VesperProgress = (function () {
  var KEY = "vesperProgress";
  var DAY_LABELS = ["D", "L", "M", "X", "J", "V", "S"]; // Sun..Sat (es)
  var DEFAULT_GOAL = 3;

  /* Catálogo de logros (2026-11). Cada uno se evalúa sobre una MÉTRICA que
     se deriva del estado guardado (lecciones, días, jefes…) o de un contador
     en s.stats; así los alumnos que ya llevaban camino reciben, al volver,
     los logros que ya se habían ganado. tier: bronze|silver|gold|legend.
     secret: no se revela nombre ni descripción hasta ganarlo (solo la pista).
     Los de "skill mastery" se desbloquean desde leccion.html vía
     unlock("master:<NIVEL>:<skill>") y se pintan aparte. */
  var CATEGORIES = [
    { id: "camino",     name: "El sendero" },
    { id: "racha",      name: "La llama" },
    { id: "precision",  name: "Garra precisa" },
    { id: "constancia", name: "Constancia" },
    { id: "estrellas",  name: "Estrellas" },
    { id: "mundos",     name: "Mundos y exámenes" },
    { id: "repaso",     name: "Forja y maestría" },
    { id: "secretos",   name: "Secretos de Vesper" }
  ];
  function A(id, cat, tier, metric, goal, name, desc, icon, extra) {
    var o = { id: id, cat: cat, tier: tier, metric: metric, goal: goal, name: name, desc: desc, icon: icon };
    if (extra) for (var k in extra) o[k] = extra[k];
    return o;
  }
  var ACHIEVEMENTS = [
    /* El sendero: lecciones completadas */
    A("first-lesson", "camino", "bronze", "lessons", 1,   "Primeros pasos",      "Completa tu primera lección.", "🐾"),
    A("lessons-5",    "camino", "bronze", "lessons", 5,   "Tomando ritmo",       "Completa 5 lecciones.", "🐾"),
    A("lessons-10",   "camino", "bronze", "lessons", 10,  "Gato curioso",        "Completa 10 lecciones.", "🐱"),
    A("lessons-25",   "camino", "silver", "lessons", 25,  "En marcha",           "Completa 25 lecciones.", "🛤️"),
    A("lessons-50",   "camino", "silver", "lessons", 50,  "Imparable",           "Completa 50 lecciones.", "🚀"),
    A("lessons-100",  "camino", "gold",   "lessons", 100, "Centurión",           "Completa 100 lecciones.", "🏅"),
    A("lessons-200",  "camino", "legend", "lessons", 200, "Leyenda del sendero", "Completa 200 lecciones.", "👑"),
    /* La llama: racha (mejor racha histórica) y escudos */
    A("streak-3",   "racha", "bronze", "streak", 3,   "Chispa",             "Estudia 3 días seguidos.", "✨"),
    A("streak-7",   "racha", "silver", "streak", 7,   "Una semana",         "Mantén una racha de 7 días.", "🔥"),
    A("streak-14",  "racha", "silver", "streak", 14,  "Quincena encendida", "Mantén una racha de 14 días.", "🔥"),
    A("streak-30",  "racha", "gold",   "streak", 30,  "Un mes entero",      "Mantén una racha de 30 días.", "🗓️"),
    A("streak-100", "racha", "legend", "streak", 100, "Llama eterna",       "Mantén una racha de 100 días.", "🔥"),
    A("shield-3",   "racha", "gold",   "shields", 3,  "Muralla felina",     "Reúne 3 escudos de racha.", "🛡️"),
    /* Garra precisa: lecciones perfectas y combos */
    A("perfect",    "precision", "bronze", "perfect", 1,  "Sin errores",   "Termina una lección sin fallos.", "🎯"),
    A("perfect-10", "precision", "silver", "perfect", 10, "Ojo de gato",   "Termina 10 lecciones sin fallos.", "👁️"),
    A("perfect-50", "precision", "gold",   "perfect", 50, "Garra certera", "Termina 50 lecciones sin fallos.", "🐾"),
    A("combo-5",    "precision", "bronze", "combo", 5,    "Ronroneo",      "Encadena 5 aciertos seguidos.", "😺"),
    A("combo-10",   "precision", "silver", "combo", 10,   "Salto felino",  "Encadena 10 aciertos seguidos (en una lección larga, la Forja o un duelo).", "⚡"),
    /* Constancia: meta diaria y hábito */
    A("goal-met", "constancia", "bronze", "goalDays", 1,    "Meta del día",      "Cumple tu meta diaria.", "🚩"),
    A("goal-7",   "constancia", "silver", "goalDays", 7,    "Siete metas",       "Cumple tu meta diaria 7 días.", "✅"),
    A("goal-30",  "constancia", "gold",   "goalDays", 30,   "Disciplina felina", "Cumple tu meta diaria 30 días.", "🐈‍⬛"),
    A("day-5",    "constancia", "silver", "dayMax", 5,      "Maratón gatuno",    "Completa 5 lecciones en un mismo día.", "⏱️"),
    A("days-15",  "constancia", "silver", "activeDays", 15, "Vecino de Vesper",  "Estudia en 15 días distintos.", "🏠"),
    /* Estrellas: XP total (Vesper es el lucero de la tarde) */
    A("xp-100",   "estrellas", "bronze", "xp", 100,   "Primer destello",     "Reúne 100 XP.", "✨"),
    A("xp-1000",  "estrellas", "silver", "xp", 1000,  "Estrella vespertina", "Reúne 1,000 XP.", "⭐"),
    A("xp-5000",  "estrellas", "gold",   "xp", 5000,  "Constelación",        "Reúne 5,000 XP.", "🌌"),
    A("xp-20000", "estrellas", "legend", "xp", 20000, "Lucero de Vesper",    "Reúne 20,000 XP.", "🌙"),
    /* Mundos y exámenes: guardianes de cada mundo + exámenes de nivel */
    A("boss-A1", "mundos", "silver", "boss:A1", 1, "Hogar defendido",        "Vence al Centinela del Hogar (A1).", "🏡"),
    A("boss-A2", "mundos", "silver", "boss:A2", 1, "Sendero abierto",        "Vence al Guardián del Sendero (A2).", "🪧"),
    A("boss-B1", "mundos", "gold",   "boss:B1", 1, "Más allá del horizonte", "Vence al Vigía del Horizonte (B1).", "🌅"),
    A("boss-B2", "mundos", "gold",   "boss:B2", 1, "Cima de la Torre",       "Vence al Heraldo de la Torre (B2).", "🗼"),
    A("boss-C1", "mundos", "gold",   "boss:C1", 1, "Dueño del firmamento",   "Vence al Custodio del Firmamento (C1).", "🪐"),
    A("boss-C2", "mundos", "legend", "boss:C2", 1, "Soberano del Saber",     "Vence al Soberano del Saber (C2).", "🏰"),
    A("boss-perfect", "mundos", "gold", "bossPerfect", 1, "Victoria impecable", "Vence a un guardián sin fallar ni un golpe.", "⚔️"),
    A("exam-1",   "mundos", "silver", "exams", 1,   "Certificado felino", "Aprueba un examen de nivel.", "📜"),
    A("exam-3",   "mundos", "gold",   "exams", 3,   "Trotamundos",        "Aprueba exámenes de 3 niveles distintos.", "🌍"),
    A("exam-adv", "mundos", "legend", "examAdv", 1, "Mente avanzada",     "Aprueba el examen de nivel C1 o C2.", "🎓"),
    /* Forja y maestría */
    A("master-1", "repaso", "silver", "masteries", 1, "Maestría",            "Aprueba un repaso de destreza con 80% o más.", "🏆"),
    A("master-5", "repaso", "gold",   "masteries", 5, "Gran maestro",        "Consigue 5 maestrías de destreza.", "🏆"),
    A("forja-1",  "repaso", "bronze", "forja", 1,     "Aprendiz de la Forja", "Termina tu primera ronda en la Forja.", "⚒️"),
    A("forja-10", "repaso", "silver", "forja", 10,    "Herrero",             "Termina 10 rondas en la Forja.", "🔨"),
    A("forja-50", "repaso", "gold",   "forja", 50,    "Maestro forjador",    "Termina 50 rondas en la Forja.", "⚒️"),
    /* Secretos de Vesper: se descubren jugando */
    A("night-owl",  "secretos", "bronze", "night", 1,    "Gato nocturno",   "Completa una lección entre las 10 p. m. y las 5 a. m.", "🌙", { secret: true, hint: "Los gatos ven en la oscuridad…" }),
    A("early-bird", "secretos", "bronze", "early", 1,    "Lucero del alba", "Completa una lección antes de las 8 a. m.", "🌅", { secret: true, hint: "Hay una estrella que brilla al amanecer…" }),
    A("weekend",    "secretos", "bronze", "weekend", 1,  "Fin de semana felino", "Estudia un sábado o un domingo.", "😴", { secret: true, hint: "Ni la siesta del domingo lo detiene." }),
    A("comeback",   "secretos", "silver", "comeback", 1, "Siete vidas",     "Vuelve a estudiar tras 3 días o más sin hacerlo.", "❤️", { secret: true, hint: "Un gato siempre cae de pie." }),
    A("styled",     "secretos", "bronze", "styled", 1,   "Gato elegante",   "Viste a Vesper con un aspecto nuevo.", "👔", { secret: true, hint: "A Vesper le encanta estrenar." })
  ];
  /* Nombres legibles para los logros dinámicos de dominio por destreza. */
  var SKILL_NAMES = { grammar: "Gramática", vocab: "Vocabulario", reading: "Lectura", listening: "Listening", use: "Uso del inglés" };
  function masteryMeta(id) {
    var p = id.split(":"); // master:A1:grammar
    var lv = p[1] || "", sk = SKILL_NAMES[p[2]] || p[2] || "";
    return { id: id, cat: "repaso", tier: "silver", dynamic: true, name: "Maestría: " + sk + " " + lv, icon: "🏆", desc: "Aprueba el repaso de " + sk + " (" + lv + ")." };
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
/* ---- Protecciones de racha: se GASTAN ----
     Hay dos, y cada una cubre UN día sin practicar:
       · congelación: se compra en la tienda (máx. 2 guardadas);
       · escudo: se gana cada 7 días de racha.
     Antes "Congelar racha" era una bandera permanente (la racha no se rompía
     nunca más, pagaras o no) y los escudos solo se contaban. El total de
     escudos GANADOS sigue en s.shields (lo usan los logros y la nube, donde
     nunca baja); los usados se llevan aparte, en el perfil del dispositivo. */
  function readProf() {
    try { return JSON.parse(localStorage.getItem("vesper_profile") || "null") || {}; } catch (e) { return {}; }
  }
  function writeProf(p) { try { localStorage.setItem("vesper_profile", JSON.stringify(p)); } catch (e) {} }
  function protections(s) {
    var p = readProf(), v = p.vesper || {};
    /* bandera vieja: vale por una congelación, una sola vez */
    if (v.freezeStreak === true) {
      v.freezes = Math.max(1, v.freezes || 0); delete v.freezeStreak; p.vesper = v; writeProf(p);
    }
    var used = Math.max(0, v.shieldsUsed || 0);
    return { freezes: Math.max(0, v.freezes || 0), shields: Math.max(0, ((s && s.shields) || 0) - used) };
  }
  /* gasta una protección (congelación antes que escudo). Devuelve cuál, o "" */
  function spendProtection(s) {
    var have = protections(s), p = readProf();
    p.vesper = p.vesper || {};
    if (have.freezes > 0) { p.vesper.freezes = have.freezes - 1; writeProf(p); return "freeze"; }
    if (have.shields > 0) { p.vesper.shieldsUsed = (p.vesper.shieldsUsed || 0) + 1; writeProf(p); return "shield"; }
    return "";
  }

  function defaults() { return { xp: 0, streak: 0, lastDay: null, days: {}, completed: {}, shields: 0, achievements: {}, dayCounts: {}, goalTarget: DEFAULT_GOAL, bosses: {}, stats: {} }; }

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
  /* { freezes, shields } disponibles ahora mismo */
  function streakProtection() { return protections(load()); }

  function addXp(n) { var s = load(); s.xp += (n || 0); save(s); return s.xp; }

  /* nº de lecciones reales completadas (excluye repasos "review:...", jefes "boss:..." y exámenes "exam:..."). */
  function lessonCount(s) {
    var n = 0;
    for (var k in s.completed) { if (k.indexOf("review:") !== 0 && k.indexOf("boss:") !== 0 && k.indexOf("exam:") !== 0) n++; }
    return n;
  }

  /* racha más larga sobre el historial de días (retroactiva) */
  function longestRun(days) {
    var keys = Object.keys(days || {}).filter(function (k) { return days[k]; }).sort();
    var best = 0, run = 0, prev = null;
    keys.forEach(function (k) {
      run = (prev && dayDiff(prev, k) === 1) ? run + 1 : 1;
      if (run > best) best = run;
      prev = k;
    });
    return best;
  }
  /* ¿algún hueco de 3+ días entre dos días de estudio? ("Siete vidas") */
  function hadComeback(days) {
    var keys = Object.keys(days || {}).filter(function (k) { return days[k]; }).sort();
    for (var i = 1; i < keys.length; i++) if (dayDiff(keys[i - 1], keys[i]) > 3) return true;
    return false;
  }

  /* Todas las métricas de logros, derivadas del estado. */
  function metrics(s) {
    var st = s.stats || {}, k, m = {};
    var goal = s.goalTarget || DEFAULT_GOAL;
    var goalDays = 0, dayMax = 0, weekend = 0, activeDays = 0, exams = 0, examAdv = 0, masteries = 0;
    for (k in (s.dayCounts || {})) {
      var c = s.dayCounts[k] || 0;
      if (c >= goal) goalDays++;
      if (c > dayMax) dayMax = c;
    }
    for (k in (s.days || {})) {
      if (!s.days[k]) continue;
      activeDays++;
      var wd = parseKey(k).getDay();
      if (wd === 0 || wd === 6) weekend++;
    }
    for (k in (s.completed || {})) {
      if (k.indexOf("exam:") === 0) { exams++; if (k === "exam:C1" || k === "exam:C2") examAdv = 1; }
    }
    for (k in (s.achievements || {})) if (k.indexOf("master:") === 0) masteries++;
    var bosses = s.bosses || {}, bossPerfect = 0;
    ["A1", "A2", "B1", "B2", "C1", "C2"].forEach(function (lv) {
      m["boss:" + lv] = bosses[lv] ? 1 : 0;
      if (bosses[lv] && bosses[lv].pct >= 100) bossPerfect = 1;
    });
    m.lessons = lessonCount(s);
    m.streak = Math.max(s.streak || 0, st.bestStreak || 0, longestRun(s.days));
    m.shields = s.shields || 0;
    m.perfect = Math.max(st.perfect || 0, (s.achievements || {}).perfect ? 1 : 0);
    m.combo = st.maxCombo || 0;
    m.goalDays = Math.max(goalDays, (s.achievements || {})["goal-met"] ? 1 : 0);
    m.dayMax = dayMax;
    m.activeDays = activeDays;
    m.xp = s.xp || 0;
    m.bossPerfect = bossPerfect;
    m.exams = exams;
    m.examAdv = examAdv;
    m.masteries = masteries;
    m.forja = st.forja || 0;
    m.night = st.night || 0;
    m.early = st.early || 0;
    m.weekend = weekend;
    m.comeback = Math.max(st.comeback || 0, hadComeback(s.days) ? 1 : 0);
    m.styled = st.styled || 0;
    return m;
  }

  /* Evalúa todo el catálogo sobre el estado actual; marca los nuevos y
     devuelve la lista de ids recién desbloqueados (en orden de catálogo). */
  function evalAchievements(s) {
    var m = metrics(s), unlocked = [];
    ACHIEVEMENTS.forEach(function (a) {
      if (!s.achievements[a.id] && (m[a.metric] || 0) >= a.goal) {
        /* el jefe guarda su fecha: el logro retroactivo lleva la de la victoria */
        var bd = a.metric.indexOf("boss:") === 0 && s.bosses && s.bosses[a.metric.slice(5)];
        s.achievements[a.id] = (bd && bd.date) || dayKey();
        unlocked.push(a.id);
      }
    });
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
    var protectedBy = "";

    if (!s.lastDay) {
      s.streak = 1;
    } else {
      var dd = dayDiff(s.lastDay, today);
      if (dd === 0) { /* already counted today: keep streak */ }
      else if (dd === 1) { s.streak += 1; }
      else if (dd > 1) {
        // Faltó uno o más días. Si faltó exactamente UNO y queda una protección,
        // se gasta y la racha continúa; con más días, o sin protección, se reinicia.
        protectedBy = (dd === 2) ? spendProtection(s) : "";
        if (protectedBy) { s.streak += 1; }
        else { s.streak = 1; }
      }
      // dd < 0 (clock moved back): leave streak as-is
    }

    /* contadores para logros */
    if (!s.stats) s.stats = {};
    var stt = s.stats, hr = new Date().getHours();
    if (s.lastDay && dayDiff(s.lastDay, today) > 3) stt.comeback = 1;
    if (opts.perfect) stt.perfect = (stt.perfect || 0) + 1;
    if ((opts.combo || 0) > (stt.maxCombo || 0)) stt.maxCombo = opts.combo;
    if (hr >= 22 || hr < 5) stt.night = 1;
    else if (hr < 8) stt.early = 1;

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

    if (s.streak > (stt.bestStreak || 0)) stt.bestStreak = s.streak;

    var dg = goalInfo(s, today);
    var newAchievements = evalAchievements(s);

    save(s);
    syncIfLoggedIn(s); // optional, safe no-op until accounts are wired
    return { xp: s.xp, streak: s.streak, isNewDay: isNewDay, milestone: milestone, newShield: newShield,
      shields: protections(s).shields, protectedBy: protectedBy,
      newAchievements: newAchievements, dailyGoal: dg };
  }

  /* Desbloqueo puntual desde otras páginas (p.ej. maestría por destreza).
     Devuelve true solo si es nuevo. */
  function unlock(id) {
    if (!id) return false;
    var s = load();
    if (s.achievements[id]) return false;
    s.achievements[id] = dayKey();
    save(s);
    syncIfLoggedIn(s);
    return true;
  }

  /* Suma (o sube al máximo, mode "max") un contador de s.stats y evalúa.
     Devuelve los ids de logros recién desbloqueados. */
  function bump(stat, n, mode) {
    var s = load();
    if (!s.stats) s.stats = {};
    n = (n == null) ? 1 : n;
    if (mode === "max") { if (n > (s.stats[stat] || 0)) s.stats[stat] = n; }
    else s.stats[stat] = (s.stats[stat] || 0) + n;
    var fresh = evalAchievements(s);
    save(s); syncIfLoggedIn(s);
    return fresh;
  }
  /* Evaluación retroactiva (al abrir el mapa). ctx.styled: lleva un aspecto
     no predeterminado. Solo guarda si algo cambió. */
  function check(ctx) {
    ctx = ctx || {};
    var s = load(), dirty = false;
    if (!s.stats) s.stats = {};
    if (ctx.styled && !s.stats.styled) { s.stats.styled = 1; dirty = true; }
    var fresh = evalAchievements(s);
    if (fresh.length || dirty) { save(s); if (fresh.length) syncIfLoggedIn(s); }
    return fresh;
  }

  function dailyGoal() { var s = load(); return goalInfo(s, dayKey()); }
  function setGoal(n) { var s = load(); s.goalTarget = Math.max(1, Math.min(20, parseInt(n, 10) || DEFAULT_GOAL)); save(s); syncIfLoggedIn(s); return s.goalTarget; }

  /* ---- Jefes de nivel ("boss") ----
     Registra que el jefe de un mundo (NIVEL CEFR) fue superado y desbloquea el
     siguiente mundo. Guarda la mejor puntuación. Devuelve true si se guardó. */
  function passBoss(level, pct) {
    if (!level) return false;
    var s = load();
    if (!s.bosses) s.bosses = {};
    pct = Math.max(0, Math.min(100, Math.round(pct || 0)));
    var cur = s.bosses[level];
    if (!cur || pct > cur.pct) { s.bosses[level] = { pct: pct, date: dayKey() }; save(s); syncIfLoggedIn(s); }
    return true;
  }
  function bossPassed(level) { var s = load(); return !!(s.bosses && s.bosses[level]); }

  /* Estado completo de logros para pintar la vitrina (ganados + bloqueados).
     Cada uno: { id, cat, tier, name, desc, icon, secret, hint, unlocked, date,
     cur, goal }. Las maestrías ganadas van al final con dynamic:true. */
  function achievementsState() {
    var s = load(), m = metrics(s);
    var seen = {}, out = [];
    ACHIEVEMENTS.forEach(function (a) {
      seen[a.id] = true;
      var got = !!s.achievements[a.id];
      out.push({ id: a.id, cat: a.cat, tier: a.tier, name: a.name, icon: a.icon, desc: a.desc,
        secret: !!a.secret, hint: a.hint || "", unlocked: got, date: s.achievements[a.id] || null,
        goal: a.goal, cur: got ? a.goal : Math.min(a.goal, m[a.metric] || 0) });
    });
    /* logros dinámicos ya ganados (maestrías) que no están en el catálogo fijo */
    for (var id in s.achievements) {
      if (seen[id]) continue;
      var mt = metaFor(id);
      out.push({ id: id, cat: mt.cat || "repaso", tier: mt.tier || "silver", dynamic: true, name: mt.name, icon: mt.icon,
        desc: mt.desc, secret: false, hint: "", unlocked: true, date: s.achievements[id], goal: 1, cur: 1 });
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
    /* contadores de logros: máximo por clave */
    var stats = {};
    for (k in (s.stats || {})) stats[k] = s.stats[k] || 0;
    for (k in (remote.stats || {})) { if ((remote.stats[k] || 0) > (stats[k] || 0)) stats[k] = remote.stats[k]; }
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
      bosses: bosses,
      stats: stats
    };
    merged.streak = recomputeStreak(days, lastDay);
    save(merged);
    return merged;
  }

  return { getState: getState, streakProtection: streakProtection, completeLesson: completeLesson, addXp: addXp, weekGrid: weekGrid, merge: merge,
    unlock: unlock, dailyGoal: dailyGoal, setGoal: setGoal, passBoss: passBoss, bossPassed: bossPassed,
    achievementsState: achievementsState, ACHIEVEMENTS: ACHIEVEMENTS, CATEGORIES: CATEGORIES,
    bump: bump, check: check };
})();
