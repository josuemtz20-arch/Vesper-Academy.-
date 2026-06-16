/* ============================================================
 * vesper_persona.js — Personalidad y comportamiento de Vesper (drop-in).
 *
 * Convierte las PREFERENCIAS del alumno (panel "Configuracion") en:
 *   1) un SYSTEM PROMPT dinamico para el tutor IA Vesper (copiable, y
 *      compatible con el Vesper Engine) — VESPER_PERSONA.systemPrompt()
 *   2) una VISTA PREVIA en vivo de un mensaje de Vesper que cambia segun
 *      los ajustes — VESPER_PERSONA.previewMessage()
 *   3) ganchos de comportamiento que usa leccion.html:
 *        line(kind)      -> frase de la mascota en el tono/idioma elegidos
 *        showSpanish()   -> si se muestra el apoyo en espanol
 *        correctionMode()-> 'instant' | 'end' | 'major'
 *        explainOnCorrect() -> si se explica tambien al acertar
 *        personalize(t)  -> sustituye {name}/{callMe}
 *
 * Las preferencias se guardan dentro del MISMO objeto localStorage
 * "vesper_profile" que escribe onboarding.html (no lo pisa: solo agrega
 * campos), bajo la clave anidada "vesper". Asi el motor adaptativo
 * (vesper_adaptive.js) sigue leyendo name/level/styles/topics igual.
 *
 * USO: <script src="vesper_persona.js"></script> (tras vesper_adaptive.js).
 * Emite el evento "vesper:persona" al cambiar (para refrescar vistas).
 * ============================================================ */
window.VESPER_PERSONA = (function () {
  var PROFILE_KEY = "vesper_profile";

  /* ---------- Vocabularios de opciones (id, label ES, y copy) ---------- */

  /* Tono / personalidad. Cada tono define:
     - persona: parrafo para el system prompt (en ingles, voz de instruccion)
     - emoji + label para la UI
     - micro: frases cortas de la mascota por situacion (en ingles base) */
  var TONES = {
    friendly: {
      label: "Amigable", emoji: "😊",
      persona: "Be warm, encouraging and approachable, like a kind friend who happens to be an expert. Use a relaxed, supportive voice and plenty of reassurance.",
      micro: {
        welcome: "Hi {callMe}! Lovely to see you. Ready when you are 😊",
        correct: "Yes! Nicely done, {callMe}.",
        incorrect: "No worries — let's look at this together.",
        milestone: "Look at you go, {callMe}! I'm proud of you."
      }
    },
    professional: {
      label: "Profesional", emoji: "🎯",
      persona: "Be clear, precise and composed, like an experienced private tutor. Stay polite and focused; favour accuracy and structure over small talk.",
      micro: {
        welcome: "Good to see you, {callMe}. Let's get to work.",
        correct: "Correct. Well executed.",
        incorrect: "Not quite. Here is the accurate form.",
        milestone: "Strong progress, {callMe}. Your accuracy is improving."
      }
    },
    motivating: {
      label: "Motivador", emoji: "🔥",
      persona: "Be an energetic coach. Push the student to give their best, celebrate effort loudly, and frame every mistake as a rep that makes them stronger.",
      micro: {
        welcome: "Let's go, {callMe}! Today we level up 🔥",
        correct: "BOOM! That's exactly it, {callMe}!",
        incorrect: "Close! Shake it off — one more rep and you've got this.",
        milestone: "Unstoppable, {callMe}! Keep that streak alive!"
      }
    },
    fun: {
      label: "Divertido", emoji: "🎉",
      persona: "Be playful and witty. Use light humour, the occasional emoji, and make learning feel like a game — without ever mocking the student.",
      micro: {
        welcome: "Hey {callMe}! Plot twist: today English is actually fun 🎉",
        correct: "Ka-ching! 🪙 That's a keeper, {callMe}.",
        incorrect: "Oof, wrong door! 😄 Let's try the other one.",
        milestone: "Achievement unlocked, {callMe}! 🏆"
      }
    },
    strict: {
      label: "Exigente", emoji: "📐",
      persona: "Be demanding and disciplined, like a rigorous exam coach. Hold a high bar, expect precision, and do not let errors slide — but stay respectful and fair.",
      micro: {
        welcome: "Let's begin, {callMe}. Focus — we have work to do.",
        correct: "Correct. That is the standard I expect.",
        incorrect: "No. Look again carefully and fix it properly.",
        milestone: "Acceptable progress, {callMe}. Keep the discipline."
      }
    }
  };
  var TONE_ORDER = ["friendly", "professional", "motivating", "fun", "strict"];

  /* Estilo de ensenanza */
  var TEACHING = {
    stepbystep:     { label: "Paso a paso",   emoji: "🪜", prompt: "Teach step by step: break every concept into small, ordered pieces, check understanding before moving on, and build up gradually.", flavor: "paso a paso" },
    immersive:      { label: "Inmersivo",      emoji: "🌊", prompt: "Teach immersively: stay in English as much as possible, use context and examples instead of translations, and let meaning emerge from use.", flavor: "por inmersión" },
    conversational: { label: "Conversacional", emoji: "💬", prompt: "Teach through conversation: keep a natural back-and-forth, ask questions, and weave grammar and vocabulary into real dialogue rather than lectures.", flavor: "conversando" },
    errorbased:     { label: "Por errores",    emoji: "🔍", prompt: "Teach from the student's own mistakes: notice patterns in their errors, explain the rule behind each one, and give targeted practice to fix it.", flavor: "a partir de tus errores" }
  };
  var TEACHING_ORDER = ["stepbystep", "immersive", "conversational", "errorbased"];

  /* Mezcla de idioma */
  var LANGMIX = {
    en:        { label: "Solo inglés",        emoji: "🇬🇧", prompt: "Communicate ONLY in English. Do not translate to Spanish; if something is hard, rephrase it in simpler English.", es: false },
    en_es:     { label: "Inglés con apoyo",   emoji: "🇬🇧·🇪🇸", prompt: "Teach in English, but when something is difficult give a short clarification or translation in Spanish, then return to English.", es: "support" },
    bilingual: { label: "Bilingüe",           emoji: "🌎", prompt: "Move freely between English and Spanish to make the student comfortable, gradually shifting more weight to English as they grow.", es: "full" }
  };
  var LANGMIX_ORDER = ["en", "en_es", "bilingual"];

  /* Ritmo */
  var PACE = {
    slow:     { label: "Pausado",    emoji: "🐢", prompt: "Go at a calm, detailed pace: take your time, repeat key ideas, and never rush the student." },
    balanced: { label: "Equilibrado", emoji: "⚖️", prompt: "Keep a balanced pace: thorough but moving, with enough practice to consolidate each point." },
    fast:     { label: "Dinámico",   emoji: "⚡", prompt: "Keep a brisk, dynamic pace: be concise, cover more ground, and keep the energy high." }
  };
  var PACE_ORDER = ["slow", "balanced", "fast"];

  /* Estilo de correccion */
  var CORRECTION = {
    instant: { label: "Al instante",        emoji: "⚡", mode: "instant", prompt: "Correct mistakes immediately, the moment they happen, and briefly explain why." },
    end:     { label: "Al final",           emoji: "📋", mode: "end",     prompt: "Let the student finish their thought or exercise first, then review the mistakes together at the end." },
    major:   { label: "Solo lo importante", emoji: "🎯", mode: "major",   prompt: "Only correct mistakes that break communication or matter for the current goal; let minor slips pass to protect fluency and confidence." }
  };
  var CORRECTION_ORDER = ["instant", "end", "major"];

  /* Areas de enfoque (multi) */
  var FOCUS = {
    grammar:       { label: "Gramática",     emoji: "🧱", prompt: "grammatical accuracy" },
    vocab:         { label: "Vocabulario",   emoji: "🗂️", prompt: "building useful vocabulary" },
    conversation:  { label: "Conversación",  emoji: "💬", prompt: "speaking and conversation" },
    pronunciation: { label: "Pronunciación", emoji: "🗣️", prompt: "pronunciation and clear sounds" },
    comprehension: { label: "Comprensión",   emoji: "🎧", prompt: "listening and reading comprehension" }
  };
  var FOCUS_ORDER = ["grammar", "vocab", "conversation", "pronunciation", "comprehension"];

  /* Nivel CEFR (modo manual). El motor adaptativo usa level 0-5; aqui
     guardamos tambien la etiqueta CEFR para el prompt y la UI. */
  var CEFR = ["A0", "A1", "A2", "B1", "B2", "C1", "C2"];
  /* CEFR -> level 0-5 del onboarding (C2 cae en 5, como C1, para compat) */
  function cefrToLevel(c) { var i = CEFR.indexOf(("" + c).toUpperCase()); return i < 0 ? 1 : Math.min(5, i); }
  function levelToCefr(n) { n = Math.max(0, Math.min(6, n | 0)); return CEFR[n] || "A1"; }
  /* nota: level 0->A1 segun BANDS adaptativo; mantenemos esa correspondencia
     en modo adaptativo y dejamos que el modo manual fije un CEFR explicito. */

  var GOAL_LABEL = {
    work: "su trabajo y carrera", travel: "viajar y la vida diaria",
    exam: "aprobar un examen", study: "sus estudios",
    social: "conversar y hacer amigos", aviation: "inglés de aviación"
  };
  var TOPIC_LABEL = {
    dailylife: "vida diaria", travel: "viajes y cultura", business: "negocios y oficina",
    tech: "tecnología y futuro", arts: "arte y literatura", popculture: "cine y cultura pop",
    society: "sociedad y mundo", science: "ciencia y naturaleza"
  };

  /* ---------- Defaults ---------- */
  var DEFAULTS = {
    callMe: "",                 /* como te llama Vesper (por defecto, el nombre) */
    tone: "friendly",
    teaching: "stepbystep",
    langMix: "en_es",
    pace: "balanced",
    correction: "instant",
    focus: [],                  /* areas de enfoque (ids de FOCUS) */
    levelMode: "adaptive",      /* 'manual' | 'adaptive' */
    cefr: "",                   /* solo en modo manual: A0..C2 */
    dailyGoal: { type: "lessons", value: 1 },  /* type: 'lessons' | 'min' */
    reminders: { on: false, time: "19:00" }
  };

  /* ---------- Lectura / escritura del perfil ---------- */
  function readProfile() {
    try {
      var p = JSON.parse(localStorage.getItem(PROFILE_KEY) || "null");
      if (p && typeof p === "object") return p;
    } catch (e) {}
    return {};
  }
  function writeProfile(p) {
    try { localStorage.setItem(PROFILE_KEY, JSON.stringify(p)); } catch (e) {}
  }

  /* persona efectiva = DEFAULTS + lo guardado en profile.vesper, mas
     callMe que cae al name del onboarding si no se fijo. */
  function get() {
    var prof = readProfile();
    var v = (prof.vesper && typeof prof.vesper === "object") ? prof.vesper : {};
    var out = {};
    for (var k in DEFAULTS) out[k] = clone(DEFAULTS[k]);
    for (var k2 in v) if (v[k2] != null) out[k2] = v[k2];
    out.name = prof.name || "";
    if (!out.callMe) out.callMe = prof.name || "";
    /* nivel: en adaptativo se deriva del onboarding; en manual del cefr */
    out.level = (typeof prof.level === "number") ? prof.level : 1;
    out.goal = prof.goal || null;
    out.topics = Array.isArray(prof.topics) ? prof.topics : [];
    return out;
  }

  /* guarda un patch dentro de profile.vesper (no pisa name/goal/etc.) */
  function set(patch) {
    var prof = readProfile();
    prof.vesper = (prof.vesper && typeof prof.vesper === "object") ? prof.vesper : {};
    for (var k in patch) prof.vesper[k] = patch[k];
    /* si en modo manual cambia el CEFR, refleja un level numerico compatible */
    if (patch.cefr) prof.level = cefrToLevel(patch.cefr);
    /* callMe vacio = usa el nombre; si fijan name aqui, respétalo en el perfil */
    if (patch.name != null) prof.name = patch.name;
    prof.ts = nowTs();   /* marca de tiempo para un futuro last-write-wins en sync */
    writeProfile(prof);
    emit();
    /* sincroniza opcionalmente si hay sesion (no bloquea) */
    try { if (window.VESPER_SYNC && window.VESPER_SYNC.push) window.VESPER_SYNC.push(); } catch (e) {}
    return get();
  }

  function emit() {
    try { window.dispatchEvent(new CustomEvent("vesper:persona", { detail: get() })); } catch (e) {}
  }
  function clone(x) { return (x && typeof x === "object") ? JSON.parse(JSON.stringify(x)) : x; }
  function nowTs() { try { return Date.now(); } catch (e) { return 0; } }

  /* ---------- Helpers de nivel / etiquetas ---------- */
  function cefrOf(p) {
    p = p || get();
    if (p.levelMode === "manual" && p.cefr) return p.cefr;
    /* adaptativo: usa la banda del motor adaptativo si esta disponible */
    try {
      if (window.VESPER_ADAPTIVE && window.VESPER_ADAPTIVE.levelToBand) {
        return window.VESPER_ADAPTIVE.levelToBand(p.level);
      }
    } catch (e) {}
    return levelToCefr(p.level);
  }
  function callMeOf(p) { p = p || get(); return (p.callMe || p.name || "").trim(); }

  /* ---------- Sustitucion de texto ---------- */
  function personalize(text, p) {
    if (text == null) return text;
    p = p || get();
    var who = callMeOf(p);
    return String(text)
      .replace(/\{callMe\}/g, who)
      .replace(/\{name\}/g, who)
      .replace(/\s+([,.!?;:])/g, "$1")    /* quita el espacio antes de , . ! ? ; : */
      .replace(/,\s*([.!?])/g, "$1")      /* ", ." -> "." cuando el nombre va vacio */
      .replace(/(^|[([])\s*,\s*/g, "$1")  /* coma huérfana al inicio o tras un paréntesis */
      .replace(/\s{2,}/g, " ")
      .trim();
  }

  /* ---------- SYSTEM PROMPT dinamico ---------- */
  function systemPrompt(p) {
    p = p || get();
    var name = callMeOf(p);
    var addr = name || "the student";
    var tone = TONES[p.tone] || TONES.friendly;
    var teach = TEACHING[p.teaching] || TEACHING.stepbystep;
    var lang = LANGMIX[p.langMix] || LANGMIX.en_es;
    var pace = PACE[p.pace] || PACE.balanced;
    var corr = CORRECTION[p.correction] || CORRECTION.instant;
    var cefr = cefrOf(p);
    var levelLine = (p.levelMode === "manual")
      ? ("Keep activities at CEFR level " + cefr + " unless the student asks otherwise.")
      : ("The student is around CEFR level " + cefr + "; adapt the difficulty up or down based on how they perform.");
    var focusLine = "";
    if (p.focus && p.focus.length) {
      var fs = p.focus.map(function (f) { return (FOCUS[f] || {}).prompt; }).filter(Boolean);
      if (fs.length >= 4) focusLine = "Cover all skills, but weight practice slightly toward " + joinList(fs.slice(0, 3)) + ".";
      else if (fs.length) focusLine = "Give extra attention to " + joinList(fs) + ".";
    }
    var goalEn = enGoal(p.goal);
    var goalLine = goalEn ? ("Their main reason for learning is " + goalEn + ".") : "";
    var topicEn = (p.topics || []).map(function (t) { return enTopic(t); }).filter(Boolean);
    var topicLine = topicEn.length ? ("When you can, use examples about " + joinList(topicEn) + ".") : "";

    var L = [];
    L.push("You are Vesper, a warm and elegant AI English tutor at Vesper Academy.");
    L.push(name ? ("You are teaching " + name + ". Always address them by name.")
                : "You are teaching an adult learner of English.");
    L.push("");
    L.push("## Your personality");
    L.push(tone.persona);
    L.push("");
    L.push("## How to teach");
    L.push("- " + teach.prompt);
    L.push("- " + pace.prompt);
    L.push("- " + levelLine);
    if (focusLine) L.push("- " + focusLine);
    if (goalLine) L.push("- " + goalLine);
    if (topicLine) L.push("- " + topicLine);
    L.push("");
    L.push("## Language");
    L.push(lang.prompt);
    if (p.teaching === "immersive" && lang.es !== false)
      L.push("(If the immersion guidance above and this Language setting ever differ, follow this Language setting.)");
    L.push("");
    L.push("## Corrections");
    L.push(corr.prompt);
    if (explainOnCorrect(p))
      L.push("When the student answers correctly, briefly confirm WHY it is right, not only that it is.");
    L.push("");
    L.push("## Always");
    L.push("- Make " + addr + " feel capable and motivated; celebrate real progress.");
    L.push("- Keep replies focused and not too long. End by inviting the next small step.");
    return L.join("\n");
  }

  function joinList(arr) {
    arr = arr.filter(Boolean);
    if (arr.length <= 1) return arr.join("");
    if (arr.length === 2) return arr[0] + " and " + arr[1];
    return arr.slice(0, -1).join(", ") + " and " + arr[arr.length - 1];
  }
  function enGoal(g) {
    var m = { work: "their work and career", travel: "travel and everyday life", exam: "passing an English exam", study: "their studies", social: "talking and making friends", aviation: "aviation English" };
    return m[g] || null;
  }
  function enTopic(t) {
    var m = { dailylife: "daily life", travel: "travel and culture", business: "business and the office", tech: "technology and the future", arts: "art and literature", popculture: "film and pop culture", society: "society and the world", science: "science and nature" };
    return m[t] || null;
  }

  /* ---------- VISTA PREVIA en vivo ---------- */
  /* Construye un mensaje de ejemplo de Vesper que cambia con el tono, la
     mezcla de idioma, el estilo de ensenanza y la correccion. */
  function previewMessage(p) {
    p = p || get();
    var tone = TONES[p.tone] || TONES.friendly;
    var teach = TEACHING[p.teaching] || TEACHING.stepbystep;
    var who = callMeOf(p);

    /* 1) saludo segun tono */
    var greet = personalize(tone.micro.welcome, p);

    /* 2) propuesta de la leccion con sabor del estilo de ensenanza */
    var topic = "past simple";
    var offerEN = {
      stepbystep:     "Today we'll practise the " + topic + ", one small step at a time.",
      immersive:      "Today we'll dive into the " + topic + " — listen, notice the pattern, and try it with me.",
      conversational: "Today let's just chat and pick up the " + topic + " as we go.",
      errorbased:     "Today we'll fix those little " + topic + " slips from last time and make them stick."
    }[p.teaching] || ("Today we'll work on the " + topic + ".");

    /* 3) cierre segun estilo de correccion */
    var corrEN = {
      instant: "If you slip, I'll catch it right away and show you why.",
      end:     "Say it your way first — we'll polish the details at the end.",
      major:   "Don't worry about tiny mistakes; just keep the ideas flowing."
    }[p.correction] || "";

    /* 4) apoyo en espanol segun la mezcla de idioma */
    var es = (LANGMIX[p.langMix] || {}).es;
    var esClause = "";
    if (es === "support") {
      esClause = " (No te preocupes: si algo se complica te lo aclaro en español y seguimos " + teach.flavor + ".)";
    } else if (es === "full") {
      esClause = " Vamos " + teach.flavor + ", y si quieres lo repasamos en español cuando lo necesites.";
    }

    var paceEN = { slow: "We'll take it slowly.", balanced: "", fast: "We'll keep a brisk pace." }[p.pace] || "";
    var body = offerEN + (paceEN ? " " + paceEN : "") + (corrEN ? " " + corrEN : "");
    return { greet: greet, body: body + esClause, who: who };
  }

  /* ---------- Ganchos de comportamiento para leccion.html ---------- */
  /* frase corta de la mascota por situacion, en el tono elegido + idioma */
  function line(kind, p) {
    p = p || get();
    var tone = TONES[p.tone] || TONES.friendly;
    var base = (tone.micro && tone.micro[kind]) ? tone.micro[kind] : "";
    base = personalize(base, p);
    return base;
  }
  function showSpanish(p) { p = p || get(); return (LANGMIX[p.langMix] || {}).es !== false; }
  function correctionMode(p) { p = p || get(); return (CORRECTION[p.correction] || CORRECTION.instant).mode; }
  /* explica tambien al acertar cuando el alumno quiere detalle (paso a paso o
     correccion al instante) y no eligio el modo "solo lo importante". */
  function explainOnCorrect(p) {
    p = p || get();
    if (p.correction === "major") return false;
    return p.teaching === "stepbystep" || p.correction === "instant";
  }

  /* ---------- API ---------- */
  return {
    /* vocabularios (para construir la UI del panel) */
    TONES: TONES, TONE_ORDER: TONE_ORDER,
    TEACHING: TEACHING, TEACHING_ORDER: TEACHING_ORDER,
    LANGMIX: LANGMIX, LANGMIX_ORDER: LANGMIX_ORDER,
    PACE: PACE, PACE_ORDER: PACE_ORDER,
    CORRECTION: CORRECTION, CORRECTION_ORDER: CORRECTION_ORDER,
    FOCUS: FOCUS, FOCUS_ORDER: FOCUS_ORDER,
    CEFR: CEFR, GOAL_LABEL: GOAL_LABEL, TOPIC_LABEL: TOPIC_LABEL,
    DEFAULTS: DEFAULTS,
    /* estado */
    get: get, set: set, defaults: function () { return clone(DEFAULTS); },
    cefrOf: cefrOf, callMeOf: callMeOf, cefrToLevel: cefrToLevel,
    /* salidas */
    systemPrompt: systemPrompt, previewMessage: previewMessage,
    personalize: personalize,
    /* ganchos */
    line: line, showSpanish: showSpanish, correctionMode: correctionMode,
    explainOnCorrect: explainOnCorrect
  };
})();
