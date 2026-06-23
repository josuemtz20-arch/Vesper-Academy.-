/* ============================================================
 * vesper_league.js — Liga semanal competitiva (estilo Duolingo).
 *
 * MVP de cliente, account-free: compites contra "rivales" simulados cuyo XP
 * crece de forma constante durante la semana (igual que Duolingo pre-siembra
 * las ligas). Tu XP es REAL: se suma con cada lección que completas. Al cerrar
 * la semana ISO, los 3 primeros suben de liga y los últimos bajan; los rivales
 * se vuelven a sembrar según la nueva liga.
 *
 * Honesto: es motivación local, no un ranking global. Un backend (Firestore)
 * podría reemplazar a los bots más adelante (ver VESPER_LEAGUE.cloudHook).
 *
 * window.VESPER_LEAGUE:
 *   addXp(n)        -> suma XP de la semana (devuelve tu XP semanal)
 *   standings()     -> [{ name, xp, isMe, rank }] ordenado
 *   myRank()        -> tu posición (1..N)
 *   tier()          -> { idx, id, name, icon } liga actual
 *   TIERS           -> catálogo de ligas
 *   promotionZone() -> nº de plazas que ascienden
 *   relegationZone()-> nº de plazas que descienden
 *   weekEndsInMs()  -> ms hasta el cierre semanal
 *   lastResult()    -> { promoted, relegated, rank } de la semana anterior (o null)
 * ============================================================ */
window.VESPER_LEAGUE = (function () {
  var KEY = "vesper_league";
  var SIZE = 15;                 /* participantes por liga */
  var PROMOTE = 3, RELEGATE = 3; /* plazas de ascenso / descenso */

  var TIERS = [
    { id: "bronce",   name: "Liga Bronce",   icon: "🥉", rate: 5 },
    { id: "plata",    name: "Liga Plata",    icon: "🥈", rate: 8 },
    { id: "oro",      name: "Liga Oro",      icon: "🥇", rate: 12 },
    { id: "zafiro",   name: "Liga Zafiro",   icon: "💎", rate: 17 },
    { id: "diamante", name: "Liga Diamante", icon: "💠", rate: 24 }
  ];

  var NAMES = ["Luna", "Mateo", "Sofía", "Diego", "Valentina", "Hiro", "Aiko", "Noah", "Emma", "Liam",
    "Camila", "Lucas", "Mía", "Bruno", "Chloé", "Iván", "Nora", "Théo", "Yuki", "Paula",
    "Marco", "Elif", "Omar", "Sara", "Kai", "Lía", "Dante", "Nina", "Pablo", "Zoe"];

  function pad(n) { return (n < 10 ? "0" : "") + n; }
  /* semana ISO 8601: devuelve "YYYY-Www" */
  function isoWeek(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    var day = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - day);
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    var wk = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    return d.getUTCFullYear() + "-W" + pad(wk);
  }
  /* lunes 00:00 local de la semana de `now` (inicio) y su fin (lunes siguiente) */
  function weekStart(now) {
    now = now || new Date();
    var day = now.getDay() || 7;     /* 1..7, lunes=1 */
    var s = new Date(now.getFullYear(), now.getMonth(), now.getDate() - (day - 1));
    s.setHours(0, 0, 0, 0);
    return s;
  }
  function weekEnd(now) { var s = weekStart(now); return new Date(s.getTime() + 7 * 86400000); }

  /* PRNG determinista por semilla (mulberry32) para sembrar rivales estables */
  function rng(seed) {
    return function () {
      seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
      var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function seedFromStr(s) { var h = 2166136261, i; for (i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }

  function defaults() { return { week: null, tier: 0, myXp: 0, bots: [], last: null }; }
  function load() {
    try { var raw = localStorage.getItem(KEY); if (!raw) return defaults();
      var s = JSON.parse(raw), d = defaults(); for (var k in d) if (!(k in s)) s[k] = d[k]; return s;
    } catch (e) { return defaults(); }
  }
  function save(s) { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {} }

  /* siembra SIZE-1 rivales con tasas de XP/hora propias de la liga */
  function seedBots(tierIdx, week) {
    var r = rng(seedFromStr(week + ":" + tierIdx));
    var base = TIERS[tierIdx] ? TIERS[tierIdx].rate : 6;
    var used = {}, bots = [], i;
    for (i = 0; i < SIZE - 1; i++) {
      var nm;
      do { nm = NAMES[Math.floor(r() * NAMES.length)]; } while (used[nm] && Object.keys(used).length < NAMES.length);
      used[nm] = 1;
      /* tasa individual: 40%..140% de la tasa base de la liga */
      var rate = base * (0.4 + r() * 1.0);
      bots.push({ name: nm, rate: Math.round(rate * 100) / 100, jit: Math.floor(r() * 30) });
    }
    return bots;
  }

  /* avanza al periodo actual: cierra la semana previa (asciende/desciende) y
     re-siembra rivales si cambió la semana ISO. */
  function ensureWeek(s) {
    var now = new Date();
    var wk = isoWeek(now);
    if (s.week === wk) return s;
    /* cerrar semana anterior si existía */
    if (s.week) {
      var prevRank = rankOf(s, true);   /* rank con XP final estimado de la semana cerrada */
      var promoted = prevRank <= PROMOTE && s.tier < TIERS.length - 1;
      var relegated = prevRank > SIZE - RELEGATE && s.tier > 0;
      if (promoted) s.tier += 1;
      else if (relegated) s.tier -= 1;
      s.last = { promoted: promoted, relegated: relegated, rank: prevRank, tier: s.tier };
    }
    s.week = wk;
    s.myXp = 0;
    s.bots = seedBots(s.tier, wk);
    save(s);
    return s;
  }

  /* XP actual de un bot: tasa * horas transcurridas en la semana (tope 168h) + jitter */
  function botXp(b, hours) { return Math.max(0, Math.round(b.rate * hours + b.jit)); }
  function hoursElapsed(full) {
    if (full) return 168;
    var now = new Date(), s = weekStart(now);
    var h = (now - s) / 3600000;
    return Math.max(0, Math.min(168, h));
  }

  function tableRows(s, full) {
    var hours = hoursElapsed(full);
    var rows = (s.bots || []).map(function (b) { return { name: b.name, xp: botXp(b, hours), isMe: false }; });
    rows.push({ name: "Tú", xp: s.myXp || 0, isMe: true });
    rows.sort(function (a, b) { if (b.xp !== a.xp) return b.xp - a.xp; return a.isMe ? 1 : -1; });
    for (var i = 0; i < rows.length; i++) rows[i].rank = i + 1;
    return rows;
  }
  function rankOf(s, full) {
    var rows = tableRows(s, full);
    for (var i = 0; i < rows.length; i++) if (rows[i].isMe) return rows[i].rank;
    return SIZE;
  }

  /* ---- API pública ---- */
  function standings() { var s = ensureWeek(load()); return tableRows(s, false); }
  function myRank() { var s = ensureWeek(load()); return rankOf(s, false); }
  function addXp(n) { var s = ensureWeek(load()); s.myXp = Math.max(0, (s.myXp || 0) + (n || 0)); save(s); return s.myXp; }
  function tier() { var s = ensureWeek(load()); var t = TIERS[s.tier] || TIERS[0]; return { idx: s.tier, id: t.id, name: t.name, icon: t.icon }; }
  function promotionZone() { return PROMOTE; }
  function relegationZone() { return RELEGATE; }
  function size() { return SIZE; }
  function weekEndsInMs() { return Math.max(0, weekEnd(new Date()) - new Date()); }
  function lastResult() { var s = ensureWeek(load()); return s.last || null; }
  function clearLast() { var s = load(); s.last = null; save(s); }

  /* Punto de extensión para un leaderboard real (Firestore) en el futuro:
     si existe window.VESPER_LEAGUE_CLOUD, se podría delegar standings()/addXp(). */
  var cloudHook = null;

  return { addXp: addXp, standings: standings, myRank: myRank, tier: tier,
    promotionZone: promotionZone, relegationZone: relegationZone, size: size,
    weekEndsInMs: weekEndsInMs, lastResult: lastResult, clearLast: clearLast,
    TIERS: TIERS, cloudHook: cloudHook };
})();
