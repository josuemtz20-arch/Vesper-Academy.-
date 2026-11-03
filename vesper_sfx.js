/* ============================================================
 * vesper_sfx.js — Efectos de sonido + haptics compartidos.
 *
 * Todo se genera con WebAudio (sin archivos, 0 KB extra, funciona offline).
 * Un AudioContext singleton con resume() para la política de autoplay.
 *
 * Preferencias (las guarda configuracion.html en el perfil, las lee VESPER_PREFS):
 *   soundFx   bool     interruptor general (también apaga la vibración)
 *   sfxVolume 0..100   volumen de los efectos (por defecto 60)
 *   sfxPack   "clasico" | "suave" | "arcade"   estilo de sonido
 *   sfxTap    bool     clic al tocar una opción (APAGADO por defecto)
 *
 * Reglas anti-molestia:
 *   - Notas cortas (<0.5 s), volumen moderado y un compresor final para que
 *     dos cues encimados no se sumen en un golpe fuerte.
 *   - Cada cue tiene un tiempo mínimo entre repeticiones (dobles toques,
 *     rebotes de render) y no suena con la pestaña en segundo plano.
 *   - El tap está apagado por defecto y es casi subliminal.
 *   - Cada estilo tiene melodías y timbre propios (ver CUES), no solo un filtro.
 *   - La vibración se omite con "reducir movimiento".
 *
 * window.VESPER_SFX:
 *   correct() wrong()              acierto / error
 *   tap()                          elegir una opción (si sfxTap)
 *   pair() miss()                  emparejar: pareja correcta / pareja errónea
 *   combo(n)                       racha de aciertos (sube con n)
 *   start()                        empieza la lección
 *   heartloss() lastheart()        perder vida / te queda la última
 *   complete() fanfare() fail()    superada / perfecta / no superada
 *   streak()                       primer día sumado a la racha
 *   achievement() levelup() coin() logro / escudo-ascenso / compra
 *   preview(pack)                  muestra un estilo (para Configuración)
 *   PACKS                          ids de estilos disponibles
 * ============================================================ */
window.VESPER_SFX = (function () {
  var PACKS = ["clasico", "suave", "arcade"];
  var actx = null, master = null, lowpass = null, curPack = null;

  function prefs() {
    try { if (window.VESPER_PREFS && VESPER_PREFS.get) return VESPER_PREFS.get(); } catch (e) {}
    return {};
  }
  function soundOn(p) { return (p || prefs()).soundFx !== false; }
  function volume(p) {
    var v = Number((p || prefs()).sfxVolume);
    if (!isFinite(v)) v = 60;
    return Math.max(0, Math.min(100, v)) / 100;
  }
  function packOf(p) {
    var k = (p || prefs()).sfxPack;
    return PACKS.indexOf(k) >= 0 ? k : "clasico";
  }
  function reduceMotion() {
    try { if (window.VESPER_PREFS && VESPER_PREFS.get && VESPER_PREFS.get().reduceMotion) return true; } catch (e) {}
    try { return !!(window.matchMedia && matchMedia("(prefers-reduced-motion:reduce)").matches); } catch (e) {}
    return false;
  }

  /* cadena: notas -> master (volumen) -> [lowpass en "suave"] -> compresor -> salida */
  function ctx(p, packOverride) {
    if (!soundOn(p)) return null;
    try { if (document.hidden) return null; } catch (e) {}
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    if (!actx) {
      actx = new AC();
      var comp = actx.createDynamicsCompressor();
      comp.threshold.value = -18; comp.knee.value = 12; comp.ratio.value = 6;
      comp.attack.value = 0.003; comp.release.value = 0.15;
      lowpass = actx.createBiquadFilter();
      lowpass.type = "lowpass"; lowpass.Q.value = 0.5;
      master = actx.createGain();
      master.connect(lowpass); lowpass.connect(comp); comp.connect(actx.destination);
    }
    if (actx.state === "suspended") { try { var r = actx.resume(); if (r && r.catch) r.catch(function () {}); } catch (e) {} }
    curPack = packOverride || packOf(p);
    /* curva perceptual: el 50% del slider suena a "la mitad", no casi igual */
    var v = volume(p);
    master.gain.value = v * v * 1.6;
    return v > 0 ? actx : null;
  }

  /* Cada estilo tiene SUS PROPIAS melodías y timbre (no solo otro filtro):
     clasico = arpegios seno/triángulo (el original)
     suave   = mazo de marimba: fundamental + parcial ~4x que se apaga rápido,
               pocas notas, registro medio, filtro cálido
     arcade  = 8-bit: onda cuadrada, notas staccato y barridos de tono */
  var VOICE = {
    clasico: { type: "sine",   peak: 0.12, atk: 0.008, lp: 12000 },
    suave:   { type: "sine",   peak: 0.10, atk: 0.004, lp: 5000, mallet: true },
    arcade:  { type: "square", peak: 0.075, atk: 0.002, lp: 7000 }
  };

  function tone(ac, n, t0) {
    var v = VOICE[curPack] || VOICE.clasico;
    var dur = n.d || 0.16, pk = n.peak || v.peak;
    var o = ac.createOscillator(), g = ac.createGain();
    o.type = n.type || v.type;
    o.frequency.setValueAtTime(n.f, t0);
    if (n.slide) o.frequency.exponentialRampToValueAtTime(n.slide, t0 + dur);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(pk, t0 + v.atk);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g); g.connect(master);
    o.start(t0); o.stop(t0 + dur + 0.03);
    if (v.mallet) {   /* el "toc" de la tecla de madera */
      var o2 = ac.createOscillator(), g2 = ac.createGain();
      o2.type = "sine"; o2.frequency.value = n.f * 3.98;
      g2.gain.setValueAtTime(0.0001, t0);
      g2.gain.exponentialRampToValueAtTime(pk * 0.35, t0 + 0.002);
      g2.gain.exponentialRampToValueAtTime(0.0001, t0 + Math.min(0.08, dur * 0.3));
      o2.connect(g2); g2.connect(master);
      o2.start(t0); o2.stop(t0 + 0.12);
    }
  }

  /* anti-rebote por cue: ignora repeticiones dentro de minGap ms */
  var last = {};
  function throttled(name, minGap) {
    var now = Date.now();
    if (last[name] && now - last[name] < minGap) return true;
    last[name] = now; return false;
  }

  function comboStep(n) { return Math.min(6, Math.max(0, (n || 3) - 3)); }

  /* ---- melodías por estilo: cada cue devuelve [{ f, t, d, type, peak, slide }] ---- */
  var CUES = {
    clasico: {
      correct:   function () { return [{ f: 523, d: 0.14 }, { f: 659, t: 0.08, d: 0.14 }, { f: 784, t: 0.16, d: 0.22, peak: 0.13 }]; },
      wrong:     function () { return [{ f: 330, d: 0.16, type: "triangle", peak: 0.09 }, { f: 262, t: 0.10, d: 0.22, type: "triangle", peak: 0.09 }]; },
      tap:       function () { return [{ f: 1046, d: 0.035, type: "triangle", peak: 0.035 }]; },
      pair:      function () { return [{ f: 784, d: 0.08, type: "triangle", peak: 0.06 }, { f: 1046, t: 0.05, d: 0.10, peak: 0.06 }]; },
      miss:      function () { return [{ f: 294, d: 0.10, type: "triangle", peak: 0.06 }]; },
      combo:     function (n) { var b = 660 + comboStep(n) * 70; return [{ f: b, d: 0.10, type: "triangle", peak: 0.09 }, { f: b * 1.5, t: 0.07, d: 0.14, peak: 0.10 }]; },
      start:     function () { return [{ f: 392, d: 0.12, peak: 0.08 }, { f: 587, t: 0.09, d: 0.20, peak: 0.09 }]; },
      heartloss: function () { return [{ f: 220, d: 0.18, type: "triangle", peak: 0.11 }, { f: 165, t: 0.06, d: 0.24, type: "triangle", peak: 0.09 }]; },
      lastheart: function () { return [{ f: 220, d: 0.12, type: "triangle", peak: 0.11 }, { f: 220, t: 0.18, d: 0.16, type: "triangle", peak: 0.09 }, { f: 165, t: 0.18, d: 0.22, type: "triangle", peak: 0.07 }]; },
      complete:  function () { return [{ f: 523, d: 0.13 }, { f: 698, t: 0.10, d: 0.13 }, { f: 880, t: 0.20, d: 0.24, peak: 0.13 }]; },
      fanfare:   function () { return [{ f: 523, d: 0.13 }, { f: 659, t: 0.10, d: 0.13 }, { f: 784, t: 0.20, d: 0.13 }, { f: 1047, t: 0.30, d: 0.30, peak: 0.14 }, { f: 784, t: 0.30, d: 0.30, peak: 0.06, type: "triangle" }]; },
      fail:      function () { return [{ f: 392, d: 0.16, type: "triangle", peak: 0.08 }, { f: 311, t: 0.13, d: 0.30, type: "triangle", peak: 0.08 }]; },
      streak:    function () { return [{ f: 587, d: 0.10, type: "triangle", peak: 0.08 }, { f: 880, t: 0.07, d: 0.12, peak: 0.09 }, { f: 1175, t: 0.14, d: 0.22, peak: 0.07 }]; },
      achievement: function () { return [{ f: 880, d: 0.12, type: "triangle", peak: 0.10 }, { f: 1319, t: 0.06, d: 0.20, peak: 0.10 }]; },
      levelup:   function () { return [{ f: 440, d: 0.10 }, { f: 587, t: 0.08, d: 0.10 }, { f: 740, t: 0.16, d: 0.12 }, { f: 988, t: 0.24, d: 0.26, peak: 0.13 }]; },
      coin:      function () { return [{ f: 988, d: 0.08, type: "square", peak: 0.06 }, { f: 1319, t: 0.06, d: 0.16, type: "square", peak: 0.07 }]; }
    },
    suave: {
      correct:   function () { return [{ f: 587, d: 0.35 }, { f: 880, t: 0.11, d: 0.45 }]; },
      wrong:     function () { return [{ f: 262, d: 0.30, peak: 0.12 }, { f: 220, t: 0.14, d: 0.38, peak: 0.11 }]; },
      tap:       function () { return [{ f: 1175, d: 0.045, peak: 0.04 }]; },
      pair:      function () { return [{ f: 698, d: 0.22, peak: 0.08 }]; },
      miss:      function () { return [{ f: 196, d: 0.16, peak: 0.08 }]; },
      combo:     function (n) { var f = [587, 659, 784, 880, 988, 1175, 1319][comboStep(n)]; return [{ f: f, d: 0.25, peak: 0.10 }, { f: f * 1.5, t: 0.08, d: 0.30, peak: 0.08 }]; },
      start:     function () { return [{ f: 440, d: 0.25, peak: 0.09 }]; },
      heartloss: function () { return [{ f: 175, d: 0.40, peak: 0.13 }]; },
      lastheart: function () { return [{ f: 175, d: 0.25, peak: 0.13 }, { f: 175, t: 0.24, d: 0.35, peak: 0.11 }]; },
      complete:  function () { return [{ f: 523, d: 0.35 }, { f: 659, t: 0.12, d: 0.35 }, { f: 784, t: 0.24, d: 0.55 }]; },
      fanfare:   function () { return [{ f: 523, d: 0.30 }, { f: 659, t: 0.11, d: 0.30 }, { f: 784, t: 0.22, d: 0.30 }, { f: 1047, t: 0.34, d: 0.65, peak: 0.14 }, { f: 659, t: 0.34, d: 0.65, peak: 0.07 }]; },
      fail:      function () { return [{ f: 330, d: 0.35, peak: 0.10 }, { f: 262, t: 0.16, d: 0.55, peak: 0.10 }]; },
      streak:    function () { return [{ f: 784, d: 0.30, peak: 0.10 }, { f: 1175, t: 0.10, d: 0.45, peak: 0.09 }]; },
      achievement: function () { return [{ f: 1047, d: 0.30, peak: 0.09 }, { f: 1568, t: 0.09, d: 0.45, peak: 0.08 }]; },
      levelup:   function () { return [{ f: 392, d: 0.25 }, { f: 523, t: 0.09, d: 0.25 }, { f: 659, t: 0.18, d: 0.25 }, { f: 784, t: 0.27, d: 0.55 }]; },
      coin:      function () { return [{ f: 1319, d: 0.20, peak: 0.09 }, { f: 1760, t: 0.07, d: 0.35, peak: 0.08 }]; }
    },
    arcade: {
      correct:   function () { return [{ f: 660, d: 0.05 }, { f: 990, t: 0.05, d: 0.05 }, { f: 1320, t: 0.10, d: 0.11 }]; },
      wrong:     function () { return [{ f: 330, slide: 110, d: 0.26 }]; },
      tap:       function () { return [{ f: 1500, d: 0.02, peak: 0.025 }]; },
      pair:      function () { return [{ f: 1000, slide: 1700, d: 0.07, peak: 0.04 }]; },
      miss:      function () { return [{ f: 180, d: 0.07, peak: 0.04 }]; },
      combo:     function (n) { var b = 500 + comboStep(n) * 90; return [{ f: b, slide: b * 2.2, d: 0.12 }]; },
      start:     function () { return [{ f: 523, d: 0.06 }, { f: 784, t: 0.07, d: 0.10 }]; },
      heartloss: function () { return [{ f: 440, slide: 110, d: 0.30, peak: 0.055 }]; },
      lastheart: function () { return [{ f: 220, d: 0.07 }, { f: 220, t: 0.13, d: 0.07 }, { f: 165, t: 0.26, d: 0.14 }]; },
      complete:  function () { return [{ f: 523, d: 0.06 }, { f: 659, t: 0.07, d: 0.06 }, { f: 784, t: 0.14, d: 0.06 }, { f: 1047, t: 0.21, d: 0.16 }]; },
      fanfare:   function () { return [{ f: 523, d: 0.06 }, { f: 659, t: 0.07, d: 0.06 }, { f: 784, t: 0.14, d: 0.06 }, { f: 1047, t: 0.21, d: 0.08 }, { f: 784, t: 0.31, d: 0.06 }, { f: 1047, t: 0.38, d: 0.26 }]; },
      fail:      function () { return [{ f: 392, d: 0.09 }, { f: 330, t: 0.11, d: 0.09 }, { f: 262, t: 0.22, d: 0.20 }]; },
      streak:    function () { return [{ f: 600, slide: 1800, d: 0.18 }]; },
      achievement: function () { return [{ f: 1319, d: 0.05 }, { f: 1568, t: 0.05, d: 0.05 }, { f: 2093, t: 0.10, d: 0.12, peak: 0.04 }]; },
      levelup:   function () { return [{ f: 300, slide: 1200, d: 0.24 }, { f: 1200, t: 0.26, d: 0.12 }]; },
      coin:      function () { return [{ f: 988, d: 0.06 }, { f: 1319, t: 0.06, d: 0.20 }]; }
    }
  };

  /* reproduce un cue con el estilo activo (o el forzado por opt.pack) */
  function play(name, arg, opt) {
    opt = opt || {};
    if (throttled(name, opt.gap != null ? opt.gap : (GAP[name] || 110))) return;
    var ac = ctx(prefs(), opt.pack); if (!ac) return;
    var v = VOICE[curPack] || VOICE.clasico;
    lowpass.frequency.value = v.lp;
    var def = (CUES[curPack] && CUES[curPack][name]) || CUES.clasico[name];
    var base = ac.currentTime + 0.005;
    def(arg).forEach(function (n) { tone(ac, n, base + (n.t || 0)); });
  }
  var GAP = { tap: 60, pair: 80, miss: 80, start: 800, complete: 600, fanfare: 600, fail: 600,
    streak: 600, achievement: 600, levelup: 600 };

  function buzz(pattern) {
    try {
      if (!soundOn() || reduceMotion()) return;
      if (navigator && navigator.vibrate) navigator.vibrate(pattern);
    } catch (e) {}
  }

  /* ---- API ---- */
  function correct(opt) { play("correct", null, opt); if (!opt) buzz(20); }
  function wrong()      { play("wrong");      buzz([30, 40, 30]); }
  function tap()        { if (!prefs().sfxTap) return; play("tap"); }
  function pair()       { play("pair");       buzz(10); }
  function miss()       { play("miss"); }
  function combo(n)     { play("combo", n);   buzz(15); }
  function start()      { play("start"); }
  function heartloss()  { play("heartloss");  buzz([40, 30, 60]); }
  function lastheart()  { play("lastheart");  buzz([40, 80, 40]); }
  function complete()   { play("complete");   buzz([20, 30, 20]); }
  function fanfare()    { play("fanfare");    buzz([25, 40, 25, 40, 60]); }
  function fail()       { play("fail");       buzz(30); }
  function streak()     { play("streak");     buzz(20); }
  function achievement(){ play("achievement"); buzz(30); }
  function levelup()    { play("levelup");    buzz([20, 30, 20, 50]); }
  function coin()       { play("coin");       buzz(15); }
  /* muestra de un estilo (Configuración): acierto y luego error, sin vibrar,
     para que la diferencia entre estilos se note de verdad */
  var previewT = null;
  function preview(pack) {
    pack = PACKS.indexOf(pack) >= 0 ? pack : undefined;
    last.correct = 0; last.wrong = 0;
    play("correct", null, { pack: pack, gap: 0 });
    clearTimeout(previewT);
    previewT = setTimeout(function () { play("wrong", null, { pack: pack, gap: 0 }); }, 650);
  }

  return { PACKS: PACKS, correct: correct, wrong: wrong, tap: tap, pair: pair, miss: miss, combo: combo,
    start: start, heartloss: heartloss, lastheart: lastheart, complete: complete, fanfare: fanfare,
    fail: fail, streak: streak, achievement: achievement, levelup: levelup, coin: coin,
    preview: preview, buzz: buzz };
})();
