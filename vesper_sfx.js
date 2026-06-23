/* ============================================================
 * vesper_sfx.js — Efectos de sonido + haptics compartidos.
 *
 * Centraliza el audio de feedback (antes solo había un playFx de acierto/error
 * en leccion.html). Genera todo con WebAudio (sin archivos): un AudioContext
 * singleton, con resume() para la política de autoplay. Respeta la preferencia
 * "Efectos de sonido" (VESPER_PREFS.soundEnabled); si VESPER_PREFS no existe,
 * asume activado. La vibración va LIGADA al mismo toggle de sonido y se omite
 * si el usuario pidió "reducir movimiento".
 *
 * window.VESPER_SFX:
 *   correct()      acierto (arpegio mayor ascendente)
 *   wrong()        error (dos notas descendentes suaves)
 *   combo(n)       racha de combo (destello que sube con n)
 *   complete()     lección superada
 *   fanfare()      lección perfecta / jefe vencido
 *   achievement()  logro / cosmético desbloqueado
 *   levelup()      nuevo escudo / ascenso de liga
 *   coin()         compra en la tienda
 *   heartloss()    perder vida
 * ============================================================ */
window.VESPER_SFX = (function () {
  var actx = null;

  function soundOn() {
    try { if (window.VESPER_PREFS && VESPER_PREFS.soundEnabled) return !!VESPER_PREFS.soundEnabled(); } catch (e) {}
    return true;   /* sin prefs: por defecto suena */
  }
  function reduceMotion() {
    try { if (window.VESPER_PREFS && VESPER_PREFS.get) return !!VESPER_PREFS.get().reduceMotion; } catch (e) {}
    try { return !!(window.matchMedia && matchMedia("(prefers-reduced-motion:reduce)").matches); } catch (e) {}
    return false;
  }
  function ctx() {
    if (!soundOn()) return null;
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    actx = actx || new AC();
    if (actx.state === "suspended") { try { actx.resume(); } catch (e) {} }
    return actx;
  }

  /* una nota con envolvente suave (ataque ~8ms, caída exponencial) */
  function tone(ac, freq, t0, dur, type, peak) {
    var o = ac.createOscillator(), g = ac.createGain();
    o.type = type || "sine";
    o.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(peak || 0.12, t0 + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g); g.connect(ac.destination);
    o.start(t0); o.stop(t0 + dur + 0.02);
  }
  /* secuencia de notas: [{ f, t, d, type, peak }] (t relativo al inicio) */
  function seq(notes) {
    var ac = ctx(); if (!ac) return;
    var base = ac.currentTime;
    notes.forEach(function (n) { tone(ac, n.f, base + (n.t || 0), n.d || 0.16, n.type, n.peak); });
  }

  /* vibración: ligada al sonido, omitida con reducir movimiento */
  function buzz(pattern) {
    try {
      if (!soundOn() || reduceMotion()) return;
      if (navigator && navigator.vibrate) navigator.vibrate(pattern);
    } catch (e) {}
  }

  /* ---- cues ---- (notas en Hz; timbres cálidos sine/triangle) */
  function correct() {  /* C5 E5 G5 — triada mayor ascendente */
    seq([{ f: 523, t: 0, d: 0.14 }, { f: 659, t: 0.08, d: 0.14 }, { f: 784, t: 0.16, d: 0.22, peak: 0.13 }]);
    buzz(20);
  }
  function wrong() {    /* descenso suave, triangle (menos áspero que el pitido viejo) */
    seq([{ f: 330, t: 0, d: 0.16, type: "triangle", peak: 0.10 }, { f: 247, t: 0.10, d: 0.22, type: "triangle", peak: 0.10 }]);
    buzz([30, 40, 30]);
  }
  function combo(n) {   /* destello que sube de tono con el combo */
    var step = Math.min(6, Math.max(0, (n || 3) - 3));
    var base = 660 + step * 70;
    seq([{ f: base, t: 0, d: 0.10, type: "triangle", peak: 0.10 },
         { f: base * 1.5, t: 0.07, d: 0.14, peak: 0.11 }]);
    buzz(15);
  }
  function complete() { /* jingle breve de lección superada */
    seq([{ f: 523, t: 0, d: 0.13 }, { f: 698, t: 0.10, d: 0.13 }, { f: 880, t: 0.20, d: 0.24, peak: 0.13 }]);
    buzz([20, 30, 20]);
  }
  function fanfare() {  /* arpegio triunfal (perfecta / jefe) */
    seq([{ f: 523, t: 0, d: 0.13 }, { f: 659, t: 0.10, d: 0.13 }, { f: 784, t: 0.20, d: 0.13 },
         { f: 1047, t: 0.30, d: 0.30, peak: 0.14 }, { f: 784, t: 0.30, d: 0.30, peak: 0.06, type: "triangle" }]);
    buzz([25, 40, 25, 40, 60]);
  }
  function achievement() { /* brillo (dos armónicos altos) */
    seq([{ f: 880, t: 0, d: 0.12, type: "triangle", peak: 0.10 },
         { f: 1319, t: 0.06, d: 0.20, peak: 0.11 }]);
    buzz(30);
  }
  function levelup() {  /* barrido ascendente */
    seq([{ f: 440, t: 0, d: 0.10 }, { f: 587, t: 0.08, d: 0.10 }, { f: 740, t: 0.16, d: 0.12 },
         { f: 988, t: 0.24, d: 0.26, peak: 0.13 }]);
    buzz([20, 30, 20, 50]);
  }
  function coin() {     /* ka-ching corto */
    seq([{ f: 988, t: 0, d: 0.08, type: "square", peak: 0.07 },
         { f: 1319, t: 0.06, d: 0.16, type: "square", peak: 0.08 }]);
    buzz(15);
  }
  function heartloss() { /* golpe grave */
    seq([{ f: 196, t: 0, d: 0.18, type: "triangle", peak: 0.12 },
         { f: 147, t: 0.06, d: 0.24, type: "triangle", peak: 0.10 }]);
    buzz([40, 30, 60]);
  }

  return { correct: correct, wrong: wrong, combo: combo, complete: complete, fanfare: fanfare,
    achievement: achievement, levelup: levelup, coin: coin, heartloss: heartloss, buzz: buzz };
})();
