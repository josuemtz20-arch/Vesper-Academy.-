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
    if (actx.state === "suspended") { try { actx.resume(); } catch (e) {} }
    curPack = packOverride || packOf(p);
    /* curva perceptual: el 50% del slider suena a "la mitad", no casi igual */
    var v = volume(p);
    master.gain.value = v * v * 1.6;
    lowpass.frequency.value = curPack === "suave" ? 1700 : 12000;
    return v > 0 ? actx : null;
  }

  /* cómo cada estilo transforma una nota */
  var STYLE = {
    clasico: { type: null,     peak: 1.00, dur: 1.00, atk: 0.008, shift: 1 },
    suave:   { type: "sine",   peak: 0.85, dur: 1.25, atk: 0.022, shift: 0.75 },
    arcade:  { type: "square", peak: 0.38, dur: 0.70, atk: 0.002, shift: 1 }
  };

  function tone(ac, freq, t0, dur, type, peak) {
    var s = STYLE[curPack] || STYLE.clasico;
    var o = ac.createOscillator(), g = ac.createGain();
    o.type = s.type || type || "sine";
    o.frequency.value = freq;
    dur = dur * s.dur;
    var pk = (peak || 0.12) * s.peak;
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(pk, t0 + s.atk);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g); g.connect(master);
    o.start(t0); o.stop(t0 + dur + 0.03);
  }

  /* anti-rebote por cue: ignora repeticiones dentro de minGap ms */
  var last = {};
  function throttled(name, minGap) {
    var now = Date.now();
    if (last[name] && now - last[name] < minGap) return true;
    last[name] = now; return false;
  }

  /* secuencia: [{ f, t, d, type, peak }] (t relativo). En "suave" se baja una
     cuarta todo el acorde (intervalos intactos) salvo que quede demasiado grave
     para el altavoz de un teléfono. */
  function seq(name, notes, opt) {
    opt = opt || {};
    if (throttled(name, opt.gap || 110)) return;
    var p = prefs();
    var ac = ctx(p, opt.pack); if (!ac) return;
    var s = STYLE[curPack] || STYLE.clasico;
    var lowest = Math.min.apply(null, notes.map(function (n) { return n.f; }));
    var k = (s.shift !== 1 && lowest * s.shift >= 200) ? s.shift : 1;
    var base = ac.currentTime + 0.005;
    notes.forEach(function (n) { tone(ac, n.f * k, base + (n.t || 0), n.d || 0.16, n.type, n.peak); });
  }

  function buzz(pattern) {
    try {
      if (!soundOn() || reduceMotion()) return;
      if (navigator && navigator.vibrate) navigator.vibrate(pattern);
    } catch (e) {}
  }

  /* ---- cues (Hz) ---- */
  function correct(opt) {
    seq("correct", [{ f: 523, t: 0, d: 0.14 }, { f: 659, t: 0.08, d: 0.14 }, { f: 784, t: 0.16, d: 0.22, peak: 0.13 }], opt);
    if (!opt) buzz(20);
  }
  function wrong() {
    seq("wrong", [{ f: 330, t: 0, d: 0.16, type: "triangle", peak: 0.09 }, { f: 262, t: 0.10, d: 0.22, type: "triangle", peak: 0.09 }]);
    buzz([30, 40, 30]);
  }
  function tap() {
    var p = prefs();
    if (!p.sfxTap) return;
    seq("tap", [{ f: 1046, t: 0, d: 0.035, type: "triangle", peak: 0.035 }], { gap: 60 });
  }
  function pair() {
    seq("pair", [{ f: 784, t: 0, d: 0.08, type: "triangle", peak: 0.06 }, { f: 1046, t: 0.05, d: 0.10, peak: 0.06 }], { gap: 80 });
    buzz(10);
  }
  function miss() {
    seq("miss", [{ f: 294, t: 0, d: 0.10, type: "triangle", peak: 0.06 }], { gap: 80 });
  }
  function combo(n) {
    var step = Math.min(6, Math.max(0, (n || 3) - 3));
    var b = 660 + step * 70;
    seq("combo", [{ f: b, t: 0, d: 0.10, type: "triangle", peak: 0.09 }, { f: b * 1.5, t: 0.07, d: 0.14, peak: 0.10 }]);
    buzz(15);
  }
  function start() {   /* dos notas abiertas: "vamos" */
    seq("start", [{ f: 392, t: 0, d: 0.12, peak: 0.08 }, { f: 587, t: 0.09, d: 0.20, peak: 0.09 }], { gap: 800 });
  }
  function heartloss() {
    seq("heartloss", [{ f: 220, t: 0, d: 0.18, type: "triangle", peak: 0.11 }, { f: 165, t: 0.06, d: 0.24, type: "triangle", peak: 0.09 }]);
    buzz([40, 30, 60]);
  }
  function lastheart() { /* aviso: dos latidos graves, no alarma */
    seq("lastheart", [{ f: 220, t: 0, d: 0.12, type: "triangle", peak: 0.11 }, { f: 220, t: 0.18, d: 0.16, type: "triangle", peak: 0.09 },
                      { f: 165, t: 0.18, d: 0.22, type: "triangle", peak: 0.07 }]);
    buzz([40, 80, 40]);
  }
  function complete() {
    seq("complete", [{ f: 523, t: 0, d: 0.13 }, { f: 698, t: 0.10, d: 0.13 }, { f: 880, t: 0.20, d: 0.24, peak: 0.13 }], { gap: 600 });
    buzz([20, 30, 20]);
  }
  function fanfare() {
    seq("fanfare", [{ f: 523, t: 0, d: 0.13 }, { f: 659, t: 0.10, d: 0.13 }, { f: 784, t: 0.20, d: 0.13 },
         { f: 1047, t: 0.30, d: 0.30, peak: 0.14 }, { f: 784, t: 0.30, d: 0.30, peak: 0.06, type: "triangle" }], { gap: 600 });
    buzz([25, 40, 25, 40, 60]);
  }
  function fail() {    /* no superada: menor, suave y corto. Ánimo, no castigo */
    seq("fail", [{ f: 392, t: 0, d: 0.16, type: "triangle", peak: 0.08 }, { f: 311, t: 0.13, d: 0.30, type: "triangle", peak: 0.08 }], { gap: 600 });
    buzz(30);
  }
  function streak() {  /* chispa cálida: la racha sumó un día */
    seq("streak", [{ f: 587, t: 0, d: 0.10, type: "triangle", peak: 0.08 }, { f: 880, t: 0.07, d: 0.12, peak: 0.09 },
                   { f: 1175, t: 0.14, d: 0.22, peak: 0.07 }], { gap: 600 });
    buzz(20);
  }
  function achievement() {
    seq("achievement", [{ f: 880, t: 0, d: 0.12, type: "triangle", peak: 0.10 }, { f: 1319, t: 0.06, d: 0.20, peak: 0.10 }], { gap: 600 });
    buzz(30);
  }
  function levelup() {
    seq("levelup", [{ f: 440, t: 0, d: 0.10 }, { f: 587, t: 0.08, d: 0.10 }, { f: 740, t: 0.16, d: 0.12 },
         { f: 988, t: 0.24, d: 0.26, peak: 0.13 }], { gap: 600 });
    buzz([20, 30, 20, 50]);
  }
  function coin() {
    seq("coin", [{ f: 988, t: 0, d: 0.08, type: "square", peak: 0.06 }, { f: 1319, t: 0.06, d: 0.16, type: "square", peak: 0.07 }]);
    buzz(15);
  }
  /* muestra de un estilo (Configuración): el acierto, sin vibrar */
  function preview(pack) {
    last.correct = 0;
    correct({ pack: PACKS.indexOf(pack) >= 0 ? pack : undefined, gap: 0 });
  }

  return { PACKS: PACKS, correct: correct, wrong: wrong, tap: tap, pair: pair, miss: miss, combo: combo,
    start: start, heartloss: heartloss, lastheart: lastheart, complete: complete, fanfare: fanfare,
    fail: fail, streak: streak, achievement: achievement, levelup: levelup, coin: coin,
    preview: preview, buzz: buzz };
})();
