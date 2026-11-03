/* ============================================================
 * vesper_sfx.js — Efectos de sonido + haptics compartidos.
 *
 * Todo se genera con WebAudio (sin archivos, 0 KB extra, funciona offline).
 * Un AudioContext singleton con resume() para la política de autoplay.
 *
 * Preferencias (las guarda configuracion.html en el perfil, las lee VESPER_PREFS):
 *   soundFx   bool     interruptor general (también apaga la vibración)
 *   sfxVolume 0..100   volumen de los efectos (por defecto 60)
 *   sfxPack   "lucero" | "clasico" | "suave" | "arcade"   estilo (por defecto lucero)
 *   sfxTap    bool     clic al tocar una opción (APAGADO por defecto)
 *
 * Reglas anti-molestia:
 *   - Notas cortas (<0.5 s), volumen moderado y un compresor final para que
 *     dos cues encimados no se sumen en un golpe fuerte.
 *   - Cada cue tiene un tiempo mínimo entre repeticiones (dobles toques,
 *     rebotes de render) y no suena con la pestaña en segundo plano.
 *   - El tap está apagado por defecto y es casi subliminal.
 *   - Cada estilo tiene melodías y timbre propios (ver CUES), no solo un filtro.
 *
 * Lucero (el estilo de la marca) no usa osciladores puros: es una celesta
 * MODELADA (síntesis modal con los modos reales de una barra de metal,
 * 1 : 2.76 : 5.40 : 8.93, golpe de mazo y caída distinta por modo) en una sala
 * con reverb. Cada toque varía un poco en afinación y fuerza. Todos los cues
 * salen del motivo de Vesper: D5 A5 G5 D6.
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
  var PACKS = ["lucero", "clasico", "suave", "arcade"];
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
    return PACKS.indexOf(k) >= 0 ? k : "lucero";
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

  /* ================= LUCERO: celesta modelada ================= */
  var LSR = 32000;            /* los buffers de nota van a 32 kHz: el parcial más alto cabe y ocupan menos memoria */
  var glockCache = {}, hall = null;
  function hz(n) { return 440 * Math.pow(2, (n - 69) / 12); }
  function rng(seed) { return function () { seed |= 0; seed = seed + 0x6D2B79F5 | 0; var t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
  /* [razón, amplitud, tau(s)] de una barra libre de metal; tau se acorta en el agudo */
  var GLOCK = [[1, 1, 0.9], [2.76, 0.32, 0.32], [5.40, 0.13, 0.11], [8.93, 0.05, 0.05], [3.0, 0.04, 0.6]];
  function glockBuf(ac, n, variant) {
    var key = n + ":" + variant;
    if (glockCache[key]) return glockCache[key];
    var f = hz(n), rnd = rng(n * 131 + variant * 7919 + 1);
    var len = Math.floor(LSR * 1.4), buf = ac.createBuffer(1, len, LSR), out = buf.getChannelData(0);
    var reg = Math.pow(523 / f, 0.3);
    GLOCK.forEach(function (p) {
      var fr = f * p[0] * (1 + (rnd() - 0.5) * 0.003);
      if (fr > LSR * 0.42) return;
      var e = p[1] * (0.85 + rnd() * 0.3), k = Math.exp(-1 / (p[2] * reg * LSR));
      var w = 2 * Math.PI * fr / LSR, c = 2 * Math.cos(w), ph = rnd() * 6.283;
      var y1 = Math.sin(ph - w), y2 = Math.sin(ph - 2 * w);
      for (var i = 0; i < len; i++) { var y = c * y1 - y2; y2 = y1; y1 = y; out[i] += e * y; e *= k; if (e < 1e-5) break; }
    });
    /* golpe del mazo: ráfaga de 4 ms de ruido */
    var nl = Math.floor(LSR * 0.004), s = 0;
    for (var j = 0; j < nl; j++) { s += 0.6 * ((rnd() * 2 - 1) - s); out[j] += s * 0.35 * Math.pow(1 - j / nl, 2); }
    var atk = Math.floor(LSR * 0.0008); for (var a = 0; a < atk; a++) out[a] *= Math.sin((a / atk) * Math.PI / 2);
    var fade = Math.floor(LSR * 0.05); for (var z = 0; z < fade; z++) out[len - 1 - z] *= z / fade;
    return (glockCache[key] = buf);
  }
  /* sala: impulso estéreo con reflexiones tempranas y cola que se oscurece */
  function hallNode(ac) {
    if (hall) return hall;
    var SR = ac.sampleRate, len = Math.floor(SR * 1.8), b = ac.createBuffer(2, len, SR), rnd = rng(4242);
    for (var ch = 0; ch < 2; ch++) {
      var d = b.getChannelData(ch), s = 0;
      [0.011, 0.019, 0.027, 0.041].forEach(function (tt, k) { var i = Math.floor(SR * (tt + (ch ? 0.0013 * (k + 1) : 0))); d[i] += (ch ? -1 : 1) * (0.5 - k * 0.09); });
      for (var i = Math.floor(SR * 0.018); i < len; i++) {
        var x = i / len, a = 0.55 * Math.pow(1 - x, 1.5) + 0.04;
        s += a * ((rnd() * 2 - 1) - s); d[i] += s * Math.pow(1 - x, 2.8) * 0.9;
      }
    }
    hall = ac.createConvolver(); hall.buffer = b; hall.connect(master);
    return hall;
  }
  /* una nota de celesta: v = fuerza 0..1 */
  function G(ac, out, t, n, v) {
    var src = ac.createBufferSource(); src.buffer = glockBuf(ac, n, Math.random() < 0.5 ? 0 : 1);
    src.playbackRate.value = Math.pow(2, ((Math.random() - 0.5) * 8) / 1200);   /* ±4 cents */
    var lp = ac.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 2500 + 9000 * v;   /* golpe suave = más oscuro */
    var g = ac.createGain(); g.gain.value = 0.15 * v * (0.92 + Math.random() * 0.16);
    src.connect(lp); lp.connect(g);
    var dst = g;
    if (ac.createStereoPanner) { var pn = ac.createStereoPanner(); pn.pan.value = Math.max(-0.4, Math.min(0.4, (n - 72) / 28)); g.connect(pn); dst = pn; }
    dst.connect(out);
    src.start(t + Math.random() * 0.006);
  }
  var M = [74, 81, 79, 86];   /* motivo de Vesper: D5 A5 G5 D6 */
  var LUCERO = {
    correct:   function (g, t) { g(t, M[0], 0.65); g(t + 0.085, M[1], 0.8); },
    wrong:     function (g, t) { g(t, 69, 0.4); g(t + 0.14, 65, 0.36); },
    tap:       function (g, t) { g(t, 98, 0.14); },
    pair:      function (g, t) { g(t, 86, 0.4); },
    miss:      function (g, t) { g(t, 69, 0.25); },
    combo:     function (g, t, n) { var b = [74, 76, 78, 79, 81, 83, 86][comboStep(n)]; g(t, b, 0.6); g(t + 0.06, b + 12, 0.4); },
    start:     function (g, t) { g(t, M[0], 0.5); g(t + 0.15, M[1], 0.5); },
    heartloss: function (g, t) { g(t, 62, 0.55); g(t + 0.12, 57, 0.45); },
    lastheart: function (g, t) { g(t, 62, 0.55); g(t + 0.34, 62, 0.45); },
    complete:  function (g, t) { M.forEach(function (n, i) { g(t + [0, 0.11, 0.22, 0.35][i], n, i === 3 ? 0.85 : 0.68); }); },
    fanfare:   function (g, t) {
      M.forEach(function (n, i) { var tt = t + [0, 0.11, 0.22, 0.35][i]; g(tt, n, 0.72); g(tt + 0.01, n + 4, 0.3); });
      [86, 88, 90, 93, 95, 98].forEach(function (n, i) { g(t + 0.6 + i * 0.05, n, 0.25); });
    },
    fail:      function (g, t) { [74, 81, 79, 77].forEach(function (n, i) { g(t + [0, 0.13, 0.28, 0.48][i], n, 0.45); }); },
    streak:    function (g, t) { [86, 88, 90, 93, 95, 98].forEach(function (n, i) { g(t + i * 0.05, n, 0.3); }); },
    achievement: function (g, t) { g(t, 86, 0.7); g(t + 0.05, 93, 0.5); g(t + 0.1, 98, 0.35); },
    levelup:   function (g, t) { [74, 78, 81, 86, 90, 93].forEach(function (n, i) { g(t + i * 0.05, n, 0.45); }); g(t + 0.34, 98, 0.3); },
    coin:      function (g, t) { g(t, 93, 0.45); g(t + 0.06, 98, 0.4); }
  };
  function playLucero(ac, name, arg) {
    var def = LUCERO[name]; if (!def) return;
    var out = ac.createGain(); out.connect(master);
    var send = ac.createGain(); send.gain.value = 0.26; out.connect(send); send.connect(hallNode(ac));
    def(function (t, n, v) { G(ac, out, t, n, v); }, ac.currentTime + 0.01, arg);
  }

  /* reproduce un cue con el estilo activo (o el forzado por opt.pack) */
  function play(name, arg, opt) {
    opt = opt || {};
    if (throttled(name, opt.gap != null ? opt.gap : (GAP[name] || 110))) return;
    var ac = ctx(prefs(), opt.pack); if (!ac) return;
    if (curPack === "lucero") { lowpass.frequency.value = 12000; try { playLucero(ac, name, arg); } catch (e) {} return; }
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
