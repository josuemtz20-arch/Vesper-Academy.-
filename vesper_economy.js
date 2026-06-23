/* ============================================================
 * vesper_economy.js — Vidas (corazones) + gemas + tienda.
 *
 * OPCIONAL por diseño: el "modo desafío" (vidas) está APAGADO por defecto
 * para preservar el ADN sin presión de Vesper (reintentos infinitos). Las
 * gemas SÍ se ganan siempre (progreso), pero solo importan si activas la
 * tienda/vidas. Todo en localStorage["vesper_economy"]; degrada en silencio.
 *
 * window.VESPER_ECONOMY:
 *   gems()                  -> nº de gemas
 *   award(n)                -> suma gemas (devuelve total)
 *   spend(n)                -> resta si alcanza (bool)
 *   hearts()                -> corazones actuales (aplica regeneración)
 *   maxHearts()             -> tope (5)
 *   loseHeart()             -> resta 1 corazón
 *   refillHearts()          -> llena corazones
 *   secsToNextHeart()       -> segundos hasta el próximo corazón (0 si lleno)
 *   livesActive()           -> ¿modo desafío activo?
 *   setChallenge(bool)      -> activa/desactiva modo desafío (y llena corazones)
 *   buy(itemId)             -> compra de tienda -> { ok, msg }
 *   STORE                   -> catálogo [{ id, name, icon, cost, desc }]
 * ============================================================ */
window.VESPER_ECONOMY = (function () {
  var KEY = "vesper_economy";
  var MAX_HEARTS = 5;
  var REGEN_MS = 30 * 60 * 1000;   /* 1 corazón cada 30 min */

  var STORE = [
    { id: "hearts", name: "Recarga de vidas", icon: "❤️", cost: 50, desc: "Rellena tus 5 corazones al instante." },
    { id: "freeze", name: "Congelar racha", icon: "🛡️", cost: 100, desc: "Protege tu racha un día de descanso." },
    { id: "xpboost", name: "Boost de XP (×2)", icon: "⚡", cost: 80, desc: "Doble XP en tu próxima lección." }
  ];

  function defaults() { return { gems: 0, hearts: MAX_HEARTS, lastRefill: Date.now(), challenge: false, xpBoost: 0 }; }
  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return defaults();
      var s = JSON.parse(raw), d = defaults();
      for (var k in d) { if (!(k in s)) s[k] = d[k]; }
      return s;
    } catch (e) { return defaults(); }
  }
  function save(s) { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {} }

  /* aplica la regeneración de corazones por tiempo transcurrido */
  function regen(s) {
    if (s.hearts >= MAX_HEARTS) { s.lastRefill = Date.now(); return s; }
    var now = Date.now();
    var gained = Math.floor((now - (s.lastRefill || now)) / REGEN_MS);
    if (gained > 0) {
      s.hearts = Math.min(MAX_HEARTS, s.hearts + gained);
      s.lastRefill = (s.hearts >= MAX_HEARTS) ? now : (s.lastRefill + gained * REGEN_MS);
    }
    return s;
  }

  function gems() { return load().gems || 0; }
  function award(n) { var s = load(); s.gems = Math.max(0, (s.gems || 0) + (n || 0)); save(s); return s.gems; }
  function spend(n) { var s = load(); if ((s.gems || 0) < n) return false; s.gems -= n; save(s); return true; }

  function maxHearts() { return MAX_HEARTS; }
  function hearts() { var s = regen(load()); save(s); return s.hearts; }
  function loseHeart() { var s = regen(load()); if (s.hearts >= MAX_HEARTS) s.lastRefill = Date.now(); s.hearts = Math.max(0, s.hearts - 1); save(s); return s.hearts; }
  function refillHearts() { var s = load(); s.hearts = MAX_HEARTS; s.lastRefill = Date.now(); save(s); return s.hearts; }
  function secsToNextHeart() {
    var s = regen(load()); save(s);
    if (s.hearts >= MAX_HEARTS) return 0;
    var elapsed = Date.now() - (s.lastRefill || Date.now());
    return Math.max(0, Math.ceil((REGEN_MS - elapsed) / 1000));
  }

  function livesActive() { return !!load().challenge; }
  function setChallenge(on) {
    var s = load(); s.challenge = !!on;
    if (on) { s.hearts = MAX_HEARTS; s.lastRefill = Date.now(); }
    save(s);
    return s.challenge;
  }

  /* boost de XP de un solo uso (lo consume leccion.html al terminar) */
  function xpBoost() { return load().xpBoost || 0; }
  function consumeXpBoost() { var s = load(); var b = s.xpBoost || 0; if (b > 0) { s.xpBoost = 0; save(s); } return b; }

  /* activa "congelar racha" en el perfil (mismo flag que lee vesper_progress) */
  function enableFreeze() {
    try {
      var prof = JSON.parse(localStorage.getItem("vesper_profile") || "null") || {};
      prof.vesper = prof.vesper || {};
      prof.vesper.freezeStreak = true;
      localStorage.setItem("vesper_profile", JSON.stringify(prof));
      return true;
    } catch (e) { return false; }
  }

  function itemById(id) { for (var i = 0; i < STORE.length; i++) if (STORE[i].id === id) return STORE[i]; return null; }
  function buy(id) {
    var it = itemById(id);
    if (!it) return { ok: false, msg: "Artículo no disponible." };
    if (gems() < it.cost) return { ok: false, msg: "Te faltan gemas." };
    if (id === "hearts" && hearts() >= MAX_HEARTS) return { ok: false, msg: "Ya tienes todas tus vidas." };
    if (!spend(it.cost)) return { ok: false, msg: "Te faltan gemas." };
    if (id === "hearts") refillHearts();
    else if (id === "freeze") enableFreeze();
    else if (id === "xpboost") { var s = load(); s.xpBoost = 2; save(s); }
    return { ok: true, msg: it.name + " activado." };
  }

  return { gems: gems, award: award, spend: spend, hearts: hearts, maxHearts: maxHearts,
    loseHeart: loseHeart, refillHearts: refillHearts, secsToNextHeart: secsToNextHeart,
    livesActive: livesActive, setChallenge: setChallenge, xpBoost: xpBoost, consumeXpBoost: consumeXpBoost,
    buy: buy, STORE: STORE };
})();
