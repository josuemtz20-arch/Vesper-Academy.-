/* ============================================================
 * vesper_league.js — Liga semanal competitiva (estilo Duolingo).
 *
 * Dos modos:
 *  - SIN sesión (o si la nube no responde): liga simulada local, como antes.
 *    Compites contra 14 rivales simulados cuyo XP crece de forma constante
 *    durante la semana. Tu XP es REAL. Al cerrar la semana ISO, los 3
 *    primeros suben de liga y los 3 últimos bajan.
 *  - CON sesión: la nube (vesper_league_cloud.js) dice en qué liga y
 *    división estás (league_place/{uid}, la escribe _scripts/league_admin.py).
 *    La tabla de tu división son los alumnos REALES de esa división más
 *    rivales de práctica que rellenan hasta 15 (semilla week + ":" + div, la
 *    misma que usa league_admin.py al cerrar la semana). Cada fila lleva
 *    real:true/false. Mientras las reglas nuevas no estén publicadas (403),
 *    se queda la tabla global de siempre (mode "global").
 *
 * window.VESPER_LEAGUE:
 *   addXp(n)        -> suma XP de la semana (devuelve tu XP semanal)
 *   standings()     -> [{ name, xp, isMe, rank }] ordenado (síncrono: tu
 *                      división de la nube si board() ya la cargó en esta
 *                      página; si no, la liga simulada)
 *   myRank()        -> tu posición (1..N), de la misma tabla que standings()
 *   tier()          -> { idx, id, name, icon } liga actual (con sesión y
 *                      colocación, la de la nube)
 *   board()         -> Promise con el resumen para la interfaz (ver board())
 *   localBoard()    -> el mismo resumen, síncrono, de la liga simulada (para
 *                      pintar al instante mientras board() espera a la nube)
 *   projection(n)   -> { mode, rank, tier } si sumaras n XP, sin red (o null)
 *   seenResult()    -> marca visto el resultado de la semana anterior
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
    { id: "diamante", name: "Liga Diamante", icon: "💠", rate: 24 },
    /* 6ª liga (2026-11-25): la de El Soberano del Saber, mundo C2 */
    { id: "soberana", name: "Liga Soberana", icon: "👑", rate: 33 }
  ];
  /* XP/hora base de los rivales de práctica en las divisiones REALES.
     Calibradas a los cortes de league_admin.py sembrar (Bronce <100, Plata
     100–299, Oro 300–599, Zafiro 600–999, Diamante 1000–1499, Soberana
     ≥1500): al cierre, el rival típico de cada liga cae dentro de su franja.
     Soberana 13: su 3er peor rival cierra hacia 1300 (~0.87 del corte, como
     Diamante con 866/1000), así que quedarse pide jugar a nivel Soberana. Con las `rate` de la
     liga local, un rival de Bronce cierra con 340–1180 XP y ningún alumno
     real (30–760 XP por semana desde julio) ascendería nunca.
     Debe ser IGUAL a CLOUD_RATE de _scripts/league_admin.py
     (_scripts/test_league_parity.py lo comprueba). */
  var CLOUD_RATE = [0.45, 1.3, 3, 5.3, 8.6, 13];

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

  /* cloud: semana en la que la nube colocó al alumno (esa semana no se cierra
     en local); seenCloud: semana del último resultado de la nube ya visto */
  function defaults() { return { week: null, tier: 0, myXp: 0, bots: [], last: null, cloud: null, seenCloud: null }; }
  function load() {
    try { var raw = localStorage.getItem(KEY); if (!raw) return defaults();
      var s = JSON.parse(raw), d = defaults(); for (var k in d) if (!(k in s)) s[k] = d[k]; return s;
    } catch (e) { return defaults(); }
  }
  function save(s) { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {} }

  /* siembra SIZE-1 rivales con semilla `seedKey` y XP/hora base `base`.
     Liga local: seedKey = week + ":" + tierIdx. División real: seedKey =
     week + ":" + div. Las dos usan CLOUD_RATE[tier] (2026-11-25): con
     TIERS[].rate el rival más flojo de Bronce cerraba con ~430 XP y nadie
     subía nunca en la liga local. Los rivales se guardan al empezar la
     semana (ensureWeek), así que quien ya tiene la semana en curso sigue con
     los suyos y el cambio le llega la semana siguiente, sin saltos. */
  function seedBots(tierIdx, seedKey, base) {
    var r = rng(seedFromStr(seedKey));
    if (base == null) base = CLOUD_RATE[tierIdx] != null ? CLOUD_RATE[tierIdx] : CLOUD_RATE[0];
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
     re-siembra rivales si cambió la semana ISO. Si esa semana la colocó la
     nube, el ascenso lo decide league_admin.py cerrar, no este dispositivo. */
  function ensureWeek(s) {
    var now = new Date();
    var wk = isoWeek(now);
    if (s.week === wk) return s;
    /* cerrar semana anterior si existía */
    if (s.week && s.cloud !== s.week) {
      var prevRank = rankOf(s, true);   /* rank con XP final estimado de la semana cerrada */
      var promoted = prevRank <= PROMOTE && s.tier < TIERS.length - 1;
      var relegated = prevRank > SIZE - RELEGATE && s.tier > 0;
      if (promoted) s.tier += 1;
      else if (relegated) s.tier -= 1;
      s.last = { promoted: promoted, relegated: relegated, rank: prevRank, tier: s.tier };
    }
    s.week = wk;
    s.myXp = 0;
    s.bots = seedBots(s.tier, wk + ":" + s.tier);
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

  /* ---- división real (nube) ----
     Tabla pura y determinista. league_admin.py cerrar hace EXACTAMENTE lo
     mismo con hours = 168 (_scripts/test_league_parity.py lo compara con
     node). reals: [{ uid, name, xp }]. Orden: XP de mayor a menor; en
     empate el rival de práctica va antes que el alumno (como en la liga
     local) y entre alumnos decide el uid. Ascienden los 3 primeros (salvo
     en Soberana, la más alta) y descienden los 3 últimos (salvo en Bronce). */
  function divisionTable(week, div, tierIdx, reals, hours, myUid) {
    var nBots = Math.max(0, SIZE - reals.length);
    var bots = seedBots(tierIdx, week + ":" + div, CLOUD_RATE[tierIdx]).slice(0, nBots);
    var rows = reals.map(function (r) {
      return { uid: String(r.uid || ""), name: r.name, xp: Math.max(0, Math.round(r.xp || 0)),
               isMe: !!myUid && r.uid === myUid, real: true };
    }).concat(bots.map(function (b) {
      return { uid: "", name: b.name, xp: botXp(b, hours), isMe: false, real: false };
    }));
    rows.sort(function (a, b) {
      if (b.xp !== a.xp) return b.xp - a.xp;
      if (a.real !== b.real) return a.real ? 1 : -1;
      if (a.real) return a.uid < b.uid ? -1 : (a.uid > b.uid ? 1 : 0);
      return 0;
    });
    var n = rows.length;
    for (var i = 0; i < n; i++) {
      var rk = i + 1;
      rows[i].rank = rk;
      rows[i].zone = (rk <= PROMOTE && tierIdx < TIERS.length - 1) ? "up"
                   : ((rk > n - RELEGATE && tierIdx > 0) ? "down" : "");
    }
    return rows;
  }
  function tierOf(idx) {
    if (!TIERS[idx]) idx = 0;
    var t = TIERS[idx];
    return { idx: idx, id: t.id, name: t.name, icon: t.icon };
  }

  function cloudApi() {
    var c = window.VESPER_LEAGUE_CLOUD;
    return (c && c.signedIn && c.signedIn()) ? c : null;
  }

  /* colocación leída de la nube (200 o 404): el tier local pasa a ser el de
     la nube y el resultado de la semana anterior queda como lastResult()
     mientras no se haya visto. 403/error: no toca nada. */
  function syncPlacement(p) {
    if (!p || (p.status !== "ok" && p.status !== "none")) return;
    var s = ensureWeek(load());
    var changed = false;
    if (s.tier !== p.tier) { s.tier = p.tier; s.bots = seedBots(s.tier, s.week + ":" + s.tier); changed = true; }
    if (s.cloud !== s.week) { s.cloud = s.week; changed = true; }
    var L = p.last;
    if (L && L.week && s.seenCloud !== L.week && !(s.last && s.last.week === L.week)) {
      s.last = { promoted: L.result === "up", relegated: L.result === "down", rank: L.rank,
                 tier: p.tier, fromTier: L.fromTier, week: L.week };
      changed = true;
    }
    if (changed) save(s);
  }

  /* última división de la nube que board() cargó en esta página, para que
     standings()/myRank() sigan siendo síncronos: { week, div, tier, uid, alias, reals } */
  var cloudBoard = null;

  function cloudRows(cb, s) {
    var reals = [], mine = null, i;
    for (i = 0; i < cb.reals.length; i++) {
      var r = { uid: cb.reals[i].uid, name: cb.reals[i].name, xp: cb.reals[i].xp };
      if (r.uid === cb.uid) mine = r;
      reals.push(r);
    }
    /* tu XP local puede ir por delante de la nube (la subida tiene rebote) */
    var localXp = (s.week === cb.week) ? (s.myXp || 0) : 0;
    if (mine) mine.xp = Math.max(mine.xp, localXp);
    else reals.push({ uid: cb.uid, name: cb.alias || "Tú", xp: localXp });
    return divisionTable(cb.week, cb.div, cb.tier, reals, hoursElapsed(false), cb.uid);
  }

  /* ---- API pública ---- */
  function standings() {
    var s = ensureWeek(load());
    if (cloudBoard && cloudBoard.week === s.week && cloudApi()) {
      return cloudRows(cloudBoard, s).map(function (r) {
        return { name: r.isMe ? "Tú" : r.name, xp: r.xp, isMe: r.isMe, rank: r.rank };
      });
    }
    return tableRows(s, false);
  }
  function myRank() {
    var rows = standings();
    for (var i = 0; i < rows.length; i++) if (rows[i].isMe) return rows[i].rank;
    return SIZE;
  }
  function weekId() { return isoWeek(new Date()); }
  function addXp(n) {
    var s = ensureWeek(load());
    s.myXp = Math.max(0, (s.myXp || 0) + (n || 0));
    save(s);
    /* leaderboard real: si hay sesión verificada, espeja tu XP semanal a la nube */
    try {
      var c = cloudApi();
      if (c) {
        c.pushScore(s.week, s.myXp);
        if (c.fetchPlacement) c.fetchPlacement().then(syncPlacement, function () {});
      }
    } catch (e) {}
    return s.myXp;
  }
  /* tabla global en vivo (forma vieja, la usan liga.html y el cajón del
     mapa): con sesión, la nube; si no, resuelve null y el llamador cae a
     standings(). */
  function liveStandings() {
    try {
      var c = cloudApi();
      if (c) return c.fetchBoard(weekId());
    } catch (e) {}
    return Promise.resolve(null);
  }

  /* Resumen para la interfaz (datos, sin HTML):
     { mode: "cloud" | "local" | "global",
       tier: {idx,id,name,icon}, tiers: TIERS, div: "plata-1" | null,
       rows: [{ rank, name, xp, isMe, real, zone: "up" | "down" | "" }],
       me: { rank, xp }, gapUp, leadOver, endsInMs,
       result: { result: "up"|"down"|"stay", rank, fromTier, toTier } | null,
       realCount }
     cloud  = tu división real (con colocación de la nube).
     global = reglas nuevas aún sin publicar: la tabla única de siempre, sin
              zonas (nadie asciende con ella).
     local  = sin sesión o sin red: la liga simulada.
     gapUp    = XP que te faltan para entrar a la zona de ascenso (0 si ya
                estás o si no hay ascenso: Soberana, o modo global).
     leadOver = tu ventaja sobre el primero fuera de la zona (0 si no estás).
     result   = resultado de la semana anterior aún no visto; seenResult()
                lo marca visto.
     realCount= filas de personas reales, tú incluido. */
  function summarize(mode, tierIdx, div, rows) {
    var me = null, i;
    for (i = 0; i < rows.length; i++) if (rows[i].isMe) me = rows[i];
    var hasUp = mode !== "global" && tierIdx < TIERS.length - 1;
    var gapUp = 0, leadOver = 0;
    if (me && hasUp && rows.length > PROMOTE) {
      if (me.rank > PROMOTE) {
        var target = rows[PROMOTE - 1];
        /* empatar basta solo contra un alumno de uid mayor; contra un rival
           de práctica (o uid menor) hay que pasarlo por 1 */
        var tieWins = target.real && me.uid && target.uid && me.uid < target.uid;
        gapUp = Math.max(0, target.xp - me.xp + (tieWins ? 0 : 1));
      } else {
        leadOver = Math.max(0, me.xp - rows[PROMOTE].xp);
      }
    }
    var realCount = 0;
    for (i = 0; i < rows.length; i++) if (rows[i].real) realCount++;
    return {
      mode: mode, tier: tierOf(tierIdx), tiers: TIERS, div: div || null,
      rows: rows.map(function (r) {
        return { rank: r.rank, name: r.name, xp: r.xp, isMe: !!r.isMe, real: !!r.real, zone: r.zone || "" };
      }),
      me: me ? { rank: me.rank, xp: me.xp } : { rank: rows.length, xp: 0 },
      gapUp: gapUp, leadOver: leadOver, endsInMs: weekEndsInMs(),
      result: pendingResult(), realCount: realCount
    };
  }
  function localBoard() {
    var s = ensureWeek(load());
    var rows = tableRows(s, false).map(function (r) {
      return { rank: r.rank, name: r.name, xp: r.xp, isMe: r.isMe, real: r.isMe, uid: "",
               zone: (r.rank <= PROMOTE && s.tier < TIERS.length - 1) ? "up"
                   : ((r.rank > SIZE - RELEGATE && s.tier > 0) ? "down" : "") };
    });
    return summarize("local", s.tier, null, rows);
  }
  function board() {
    var c = cloudApi();
    if (!c || !c.fetchPlacement) return Promise.resolve(localBoard());
    var wk = weekId();
    return c.fetchPlacement().then(function (p) {
      if (p && p.status === "old") {
        return c.fetchBoard(wk).then(function (rows) {
          if (!rows || !rows.length) return localBoard();
          var s = ensureWeek(load());
          return summarize("global", s.tier, null, rows.map(function (r) {
            return { rank: r.rank, name: r.alias, xp: r.xp, isMe: r.isMe, real: true, uid: r.uid, zone: "" };
          }));
        });
      }
      if (!p || (p.status !== "ok" && p.status !== "none")) return localBoard();
      syncPlacement(p);
      return c.fetchBoard(wk, p.div).then(function (rows) {
        if (!rows) return localBoard();
        cloudBoard = { week: wk, div: p.div, tier: p.tier, uid: c.uid(), alias: c.aliasOf(),
          reals: rows.map(function (r) { return { uid: r.uid, name: r.alias, xp: r.xp }; }) };
        saveSnap(cloudBoard);
        var out = summarize("cloud", p.tier, p.div, cloudRows(cloudBoard, ensureWeek(load())));
        /* la colocación es de la semana pasada y aún no trae su resultado:
           league_admin.py cerrar no ha corrido (se corre el lunes) */
        var prev = isoWeek(new Date(Date.now() - 7 * 86400000));
        out.pendingClose = p.status === "ok" && p.week === prev && !(p.last && p.last.week === prev);
        return out;
      });
    }).catch(function () { return localBoard(); });
  }

  /* Foto de la última división que board() cargó, en sessionStorage (por
     pestaña, como la colocación): la pantalla de resultado de la lección la
     usa para decir tu puesto sin pedir nada a la red. */
  var SNAP_KEY = "vesper_league_snap", SNAP_TTL = 6 * 3600000;
  function saveSnap(cb) {
    try { sessionStorage.setItem(SNAP_KEY, JSON.stringify({ week: cb.week, div: cb.div, tier: cb.tier, uid: cb.uid,
      alias: cb.alias, reals: cb.reals, at: Date.now() })); } catch (e) {}
  }
  function readSnap() {
    try { return JSON.parse(sessionStorage.getItem(SNAP_KEY) || "null"); } catch (e) { return null; }
  }
  /* projection(n): tu puesto si sumas n XP ahora, sin red.
     { mode: "cloud"|"local", rank, tier } o null si no hay dato fiable:
     con una cuenta en este aparato (VesperCuenta.ns) sólo vale la foto de su
     división de esta semana; sin cuenta, la liga simulada. */
  function projection(n) {
    var s = ensureWeek(load()), add = Math.max(0, n || 0), i, rows;
    var ns = (window.VesperCuenta && VesperCuenta.ns) ? (VesperCuenta.ns() || "") : "";
    var snap = readSnap();
    var t = { week: s.week, myXp: (s.myXp || 0) + add, bots: s.bots };
    if (ns) {
      if (!snap || snap.week !== s.week || snap.uid !== ns || !(Date.now() - (snap.at || 0) < SNAP_TTL)) return null;
      /* lo de la nube puede ir por delante de este aparato (otro teléfono):
         se suma sobre el mayor de los dos */
      var cloudMine = 0;
      for (i = 0; i < (snap.reals || []).length; i++) if (snap.reals[i].uid === snap.uid) cloudMine = snap.reals[i].xp || 0;
      t.myXp = Math.max(s.myXp || 0, cloudMine) + add;
      rows = cloudRows(snap, t);
      for (i = 0; i < rows.length; i++) if (rows[i].isMe) return { mode: "cloud", rank: rows[i].rank, tier: tierOf(snap.tier) };
      return null;
    }
    rows = tableRows(t, false);
    for (i = 0; i < rows.length; i++) if (rows[i].isMe) return { mode: "local", rank: rows[i].rank, tier: tierOf(s.tier) };
    return null;
  }

  function pendingResult() {
    var L = load().last;
    if (!L || L.rank == null) return null;
    var to = L.tier;
    var from = (L.fromTier != null) ? L.fromTier : (L.promoted ? to - 1 : (L.relegated ? to + 1 : to));
    return { result: L.promoted ? "up" : (L.relegated ? "down" : "stay"), rank: L.rank, fromTier: from, toTier: to };
  }
  function seenResult() {
    var s = load();
    if (s.last && s.last.week) s.seenCloud = s.last.week;
    s.last = null;
    save(s);
  }

  function tier() { var s = ensureWeek(load()); return tierOf(s.tier); }
  function promotionZone() { return PROMOTE; }
  function relegationZone() { return RELEGATE; }
  function size() { return SIZE; }
  function weekEndsInMs() { return Math.max(0, weekEnd(new Date()) - new Date()); }
  function lastResult() { var s = ensureWeek(load()); return s.last || null; }
  function clearLast() { seenResult(); }

  /* Punto de extensión histórico (sin uso). */
  var cloudHook = null;

  /* vesper_league_cloud.js avisa cuando lee la colocación (al iniciar sesión) */
  try {
    window.addEventListener("vesper-league-place", function (e) {
      try { syncPlacement(e.detail); } catch (err) {}
    });
  } catch (e) {}

  return { addXp: addXp, standings: standings, liveStandings: liveStandings, myRank: myRank, tier: tier,
    weekId: weekId, promotionZone: promotionZone, relegationZone: relegationZone, size: size,
    weekEndsInMs: weekEndsInMs, lastResult: lastResult, clearLast: clearLast,
    board: board, localBoard: localBoard, seenResult: seenResult, projection: projection,
    TIERS: TIERS, cloudHook: cloudHook,
    /* para _scripts/test_league_parity.py (paridad con league_admin.py) */
    _test: { rng: rng, seedFromStr: seedFromStr, seedBots: seedBots, botXp: botXp,
             divisionTable: divisionTable, CLOUD_RATE: CLOUD_RATE } };
})();
