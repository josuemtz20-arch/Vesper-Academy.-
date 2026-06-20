/* =====================================================================
 * VESPER · THEMES PACK 2  (más temas A1-B1 + listening temático B2-C2)
 * ---------------------------------------------------------------------
 * Continúa vesper_themes_pack.js con temas nuevos:
 *   - A1: La casa            (vocab + listening)
 *   - A2: Salud y el cuerpo  (vocab + listening)
 *   - B1: Tecnología y medios(vocab + listening)
 * y añade LISTENING TEMÁTICO para los niveles altos (más largo y con
 * preguntas de idea principal, detalle, actitud e inferencia):
 *   - B2: reunión de trabajo · informativo de noticias
 *   - C1: psicología (sesgos) · debate tecnología y sociedad
 *   - C2: ética (dilema del tranvía) · debate sobre ayuda al desarrollo
 *
 * El listening usa el renderer `listening` de leccion.html (voz/TTS; sin
 * archivos de audio). Se fusiona via VESPER_THEMES_PACK2.merge(); la
 * progresión por nivel la gestiona vesper_path.js.
 * ===================================================================== */
window.VESPER_THEMES_PACK2 = (function () {

  var L = {

    /* ========================= A1 · LA CASA ========================= */

    "lvl-a1-vocab-house": {
      lessonId: "lvl-a1-vocab-house", level: "A1", track: "Vocabulario", topic: "home", skill: "vocab",
      title: "Tema: la casa", xpReward: 32, mascotState: "explaining",
      explanation: {
        body: "Vocabulario A1 de la casa: las habitaciones y los muebles. Aprende dónde haces cada cosa (cocinar, dormir...). (Asocia, clasifica y completa.)",
        examples: [
          { en: "I sleep in the bedroom.", es: "Duermo en el dormitorio." },
          { en: "kitchen, bedroom, bathroom, garden", es: "cocina, dormitorio, baño, jardín" }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Une la palabra con su traducción.", pairs: [
          { l: "kitchen", r: "cocina" }, { l: "bedroom", r: "dormitorio" },
          { l: "bathroom", r: "baño" }, { l: "garden", r: "jardín" }
        ] },
        { type: "categorize", instruction: "¿Es una habitación o un mueble?", buckets: [
          { id: "r", label: "Room" }, { id: "f", label: "Furniture" } ], items: [
          { t: "kitchen", bucket: "r" }, { t: "bed", bucket: "f" },
          { t: "bathroom", bucket: "r" }, { t: "sofa", bucket: "f" },
          { t: "bedroom", bucket: "r" }, { t: "table", bucket: "f" } ] },
        { type: "multiple_choice", question: "Where do you cook?", options: ["bedroom", "kitchen", "bathroom"], correctIndex: 1, explanation: "Se cocina en la cocina (kitchen)." },
        { type: "fill_blank", sentence: "I sleep in the ___.", answers: ["bedroom"], hint: "La habitación para dormir.", explanation: "bedroom = dormitorio." },
        { type: "translate", prompt: "Traduce: \"Hay una mesa en la cocina.\"", answers: ["there is a table in the kitchen"], explanation: "There is a table in the kitchen." }
      ]
    },

    "lvl-a1-listen-house": {
      lessonId: "lvl-a1-listen-house", level: "A1", track: "Listening", topic: "home", skill: "listening",
      title: "Tema: visita a una casa", xpReward: 34, mascotState: "explaining",
      explanation: {
        body: "Escucha A1: alguien enseña su casa. Oirás las habitaciones y los muebles. Reproduce el audio y responde. (Escucha qué hay en cada sala.)",
        examples: [
          { en: "This is the living room.", es: "Este es el salón." },
          { en: "My favourite room is the kitchen.", es: "Mi habitación favorita es la cocina." }
        ]
      },
      exercises: [
        { type: "listening",
          text: "Welcome to my house! This is the living room. There is a big sofa and a television. My favourite room is the kitchen, because I love cooking.",
          question: "What is the speaker's favourite room?", options: ["the living room", "the kitchen", "the bathroom"], correctIndex: 1, explanation: "\"My favourite room is the kitchen...\"" },
        { type: "listening",
          text: "There are two bedrooms upstairs and a small bathroom.",
          question: "How many bedrooms are there?", options: ["one", "two", "three"], correctIndex: 1, explanation: "\"There are two bedrooms upstairs...\"" },
        { type: "true_false", statement: "There is a television in the living room.", answer: true, explanation: "\"There is a big sofa and a television.\"" },
        { type: "multiple_choice", question: "Why does the speaker like the kitchen?", options: ["because it is big", "because they love cooking", "because it has a sofa"], correctIndex: 1, explanation: "\"...because I love cooking.\"" }
      ]
    },

    /* ==================== A2 · SALUD Y EL CUERPO ==================== */

    "lvl-a2-vocab-health": {
      lessonId: "lvl-a2-vocab-health", level: "A2", track: "Vocabulario", topic: "health", skill: "vocab",
      title: "Tema: salud y el cuerpo", xpReward: 42, mascotState: "explaining",
      explanation: {
        body: "Vocabulario A2 del cuerpo y la salud. Aprende partes del cuerpo y síntomas (fever, cough, headache) para ir al médico. (Asocia, clasifica y completa.)",
        examples: [
          { en: "I have a headache.", es: "Me duele la cabeza." },
          { en: "head, stomach, fever, medicine", es: "cabeza, estómago, fiebre, medicina" }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Une la palabra con su traducción.", pairs: [
          { l: "head", r: "cabeza" }, { l: "stomach", r: "estómago" },
          { l: "fever", r: "fiebre" }, { l: "medicine", r: "medicina" }
        ] },
        { type: "categorize", instruction: "¿Es una parte del cuerpo o un síntoma?", buckets: [
          { id: "b", label: "Body part" }, { id: "s", label: "Symptom" } ], items: [
          { t: "arm", bucket: "b" }, { t: "headache", bucket: "s" },
          { t: "leg", bucket: "b" }, { t: "cough", bucket: "s" },
          { t: "hand", bucket: "b" }, { t: "sore throat", bucket: "s" } ] },
        { type: "multiple_choice", question: "You have a high temperature. You have a ___.", options: ["fever", "leg", "hand"], correctIndex: 0, explanation: "Temperatura alta = fiebre (fever)." },
        { type: "fill_blank", sentence: "The doctor gave me some ___ for my cough.", answers: ["medicine"], hint: "Lo que tomas cuando estás enfermo.", explanation: "medicine = medicina." },
        { type: "translate", prompt: "Traduce: \"Me duele la cabeza.\"", answers: ["i have a headache", "my head hurts"], explanation: "I have a headache." }
      ]
    },

    "lvl-a2-listen-doctor": {
      lessonId: "lvl-a2-listen-doctor", level: "A2", track: "Listening", topic: "health", skill: "listening",
      title: "Tema: en el médico", xpReward: 44, mascotState: "explaining",
      explanation: {
        body: "Escucha A2 en la consulta del médico. Oirás al paciente describir síntomas y al médico dar consejos. (Escucha qué le pasa y qué debe hacer.)",
        examples: [
          { en: "I don't feel well.", es: "No me siento bien." },
          { en: "Take this medicine twice a day.", es: "Toma esta medicina dos veces al día." }
        ]
      },
      exercises: [
        { type: "listening",
          text: "Good morning, doctor. — What's the problem? — I don't feel well. I have a sore throat and a headache, and I'm very tired.",
          question: "What's the matter with the patient?", options: ["a sore throat and a headache", "a broken leg", "a stomachache"], correctIndex: 0, explanation: "\"...a sore throat and a headache...\"" },
        { type: "listening",
          text: "You have a cold. Drink lots of water, rest, and take this medicine twice a day.",
          question: "How often should the patient take the medicine?", options: ["once a day", "twice a day", "three times a day"], correctIndex: 1, explanation: "\"...take this medicine twice a day.\"" },
        { type: "multiple_choice", question: "What does the doctor say the patient has?", options: ["a cold", "the flu", "an allergy"], correctIndex: 0, explanation: "\"You have a cold.\"" },
        { type: "true_false", statement: "The doctor tells the patient to rest.", answer: true, explanation: "\"...rest, and take this medicine...\"" }
      ]
    },

    /* ================== B1 · TECNOLOGÍA Y MEDIOS ================== */

    "lvl-b1-vocab-tech": {
      lessonId: "lvl-b1-vocab-tech", level: "B1", track: "Vocabulario", topic: "tech", skill: "vocab",
      title: "Tema: tecnología y medios", xpReward: 52, mascotState: "explaining",
      explanation: {
        body: "Vocabulario B1 de tecnología: dispositivos y acciones (download, upload, install). Distingue el aparato de lo que haces con él. (Asocia, clasifica y traduce.)",
        examples: [
          { en: "I forgot my password.", es: "Olvidé mi contraseña." },
          { en: "download, upload, screen, update", es: "descargar, subir, pantalla, actualizar" }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Une la palabra con su traducción.", pairs: [
          { l: "download", r: "descargar" }, { l: "password", r: "contraseña" },
          { l: "screen", r: "pantalla" }, { l: "update", r: "actualizar" }
        ] },
        { type: "categorize", instruction: "¿Es un dispositivo o una acción?", buckets: [
          { id: "d", label: "Device" }, { id: "a", label: "Action" } ], items: [
          { t: "laptop", bucket: "d" }, { t: "download", bucket: "a" },
          { t: "smartphone", bucket: "d" }, { t: "upload", bucket: "a" },
          { t: "tablet", bucket: "d" }, { t: "install", bucket: "a" } ] },
        { type: "multiple_choice", question: "A secret word to log in is a ___.", options: ["screen", "password", "browser"], correctIndex: 1, explanation: "password = contraseña." },
        { type: "fill_blank", sentence: "Please ___ the app to the latest version.", answers: ["update"], hint: "Ponerlo al día.", explanation: "update = actualizar." },
        { type: "translate", prompt: "Traduce: \"Olvidé mi contraseña.\"", answers: ["i forgot my password"], explanation: "I forgot my password." }
      ]
    },

    "lvl-b1-listen-podcast": {
      lessonId: "lvl-b1-listen-podcast", level: "B1", track: "Listening", topic: "tech", skill: "listening",
      title: "Tema: podcast de tecnología", xpReward: 54, mascotState: "explaining",
      explanation: {
        body: "Escucha B1: un podcast con consejos sobre seguridad digital. Sigue el tema, capta los detalles y el consejo extra. (Atiende a las recomendaciones del presentador.)",
        examples: [
          { en: "A strong password should be long.", es: "Una contraseña segura debe ser larga." },
          { en: "Turn on two-factor authentication.", es: "Activa la verificación en dos pasos." }
        ]
      },
      exercises: [
        { type: "listening",
          text: "Hi and welcome to Tech Tips. Today's tip is about passwords. A strong password should be long and mix letters, numbers and symbols. Never use the same password for every account.",
          question: "What is today's tip about?", options: ["buying a laptop", "creating strong passwords", "downloading apps"], correctIndex: 1, explanation: "El consejo de hoy trata sobre contraseñas seguras." },
        { type: "listening",
          text: "And here's a bonus tip: turn on two-factor authentication. It sends a code to your phone, so even if someone knows your password, they can't log in.",
          question: "What does two-factor authentication do?", options: ["makes passwords shorter", "sends a code to your phone for extra security", "deletes your account"], correctIndex: 1, explanation: "\"It sends a code to your phone...\" para más seguridad." },
        { type: "multiple_choice", question: "According to the podcast, a strong password should...", options: ["be short and simple", "mix letters, numbers and symbols", "be the same everywhere"], correctIndex: 1, explanation: "\"...mix letters, numbers and symbols.\"" },
        { type: "true_false", statement: "The speaker recommends using the same password for every account.", answer: false, explanation: "\"Never use the same password for every account.\"" }
      ]
    },

    /* ============ B2 · LISTENING TEMÁTICO (trabajo / noticias) ============ */

    "lvl-b2-listen-meeting": {
      lessonId: "lvl-b2-listen-meeting", level: "B2", track: "TOEFL · Listening", topic: "work", skill: "listening",
      title: "Listening: reunión de trabajo", xpReward: 62, mascotState: "explaining",
      explanation: {
        body: "Escucha B2 en una reunión de trabajo. Capta el tema de la agenda, las instrucciones y el tono. En este nivel también se evalúa la actitud del ponente. (Distingue el dato de la intención.)",
        examples: [
          { en: "The main item on the agenda is...", es: "El punto principal del orden del día es..." },
          { en: "Please keep your comments brief.", es: "Por favor, sean breves en sus comentarios." }
        ]
      },
      exercises: [
        { type: "listening",
          text: "Thanks everyone for joining today's meeting. The main item on the agenda is the launch of our new app. Sales have been slower than expected, so we need to discuss how to improve our marketing.",
          question: "What is the main topic of the meeting?", options: ["hiring new staff", "improving marketing for the new app", "moving to a new office"], correctIndex: 1, explanation: "El punto principal es mejorar el marketing de la nueva app." },
        { type: "listening",
          text: "Marta will present the budget, and then we'll open the floor for suggestions. Please keep your comments brief, as we only have thirty minutes.",
          question: "What does the speaker ask people to do?", options: ["speak for a long time", "keep their comments brief", "leave the meeting"], correctIndex: 1, explanation: "\"Please keep your comments brief...\"" },
        { type: "multiple_choice", question: "Why are they discussing marketing?", options: ["sales were slower than expected", "the app is already finished", "the budget is too big"], correctIndex: 0, explanation: "\"Sales have been slower than expected...\"" },
        { type: "multiple_choice", question: "What is the speaker's tone?", options: ["relaxed and informal", "focused and businesslike", "angry and rude"], correctIndex: 1, explanation: "Estructura la agenda y pide brevedad: tono profesional y centrado." },
        { type: "true_false", statement: "The meeting will last about thirty minutes.", answer: true, explanation: "\"...we only have thirty minutes.\"" }
      ]
    },

    "lvl-b2-listen-news": {
      lessonId: "lvl-b2-listen-news", level: "B2", track: "TOEFL · Listening", topic: "society", skill: "listening",
      title: "Listening: informativo de noticias", xpReward: 62, mascotState: "explaining",
      explanation: {
        body: "Escucha B2 de un informativo. Capta la noticia principal, los puntos de vista a favor y en contra, y los datos concretos. (Identifica quién apoya y quién se preocupa.)",
        examples: [
          { en: "In tonight's headlines...", es: "En los titulares de esta noche..." },
          { en: "Supporters say... while critics worry...", es: "Los partidarios dicen... mientras los críticos temen..." }
        ]
      },
      exercises: [
        { type: "listening",
          text: "Good evening. In tonight's headlines: the city council has approved a new plan to expand the cycling network. Over the next two years, more than fifty kilometres of bike lanes will be added across the city.",
          question: "What has the city council approved?", options: ["a new shopping centre", "an expansion of the cycling network", "higher taxes"], correctIndex: 1, explanation: "\"...a new plan to expand the cycling network.\"" },
        { type: "listening",
          text: "Supporters say the plan will reduce traffic and pollution, while some local businesses worry about losing parking spaces.",
          question: "What concern do some local businesses have?", options: ["losing parking spaces", "higher rents", "fewer online customers"], correctIndex: 0, explanation: "\"...worry about losing parking spaces.\"" },
        { type: "multiple_choice", question: "How long will the project take?", options: ["two years", "fifty years", "six months"], correctIndex: 0, explanation: "\"Over the next two years...\"" },
        { type: "true_false", statement: "Supporters believe the plan will reduce pollution.", answer: true, explanation: "\"Supporters say the plan will reduce traffic and pollution...\"" }
      ]
    },

    /* ========= C1 · LISTENING TEMÁTICO (psicología / sociedad) ========= */

    "lvl-c1-listen-psychology": {
      lessonId: "lvl-c1-listen-psychology", level: "C1", track: "TOEFL · Listening", topic: "study", skill: "listening",
      title: "Listening: psicología (sesgos)", xpReward: 66, mascotState: "explaining",
      explanation: {
        body: "Escucha C1: una lecture de psicología sobre los sesgos cognitivos. Capta la definición, el ejemplo y el matiz crítico del profesor. (Distingue el concepto del comentario.)",
        examples: [
          { en: "a systematic deviation from rationality", es: "una desviación sistemática de la racionalidad" },
          { en: "being intelligent does not make you immune", es: "ser inteligente no te hace inmune" }
        ]
      },
      exercises: [
        { type: "listening",
          text: "Today we'll look at the concept of cognitive bias, the systematic ways in which our thinking deviates from rationality. A classic example is confirmation bias: our tendency to notice and remember information that supports what we already believe.",
          question: "What is the lecture mainly about?", options: ["how human memory is stored", "cognitive bias, and confirmation bias in particular", "techniques for studying"], correctIndex: 1, explanation: "Define el sesgo cognitivo y se centra en el de confirmación." },
        { type: "listening",
          text: "Importantly, being intelligent does not make you immune. In fact, clever people are often better at constructing arguments to justify conclusions they already hold.",
          question: "What point does the professor make about intelligent people?", options: ["they never show bias", "they may be better at justifying their existing beliefs", "they have a worse memory"], correctIndex: 1, explanation: "\"...better at constructing arguments to justify conclusions they already hold.\"" },
        { type: "multiple_choice", question: "'Confirmation bias' is the tendency to...", options: ["change your mind easily", "favour information that supports your existing beliefs", "forget important facts"], correctIndex: 1, explanation: "Es la tendencia a fijarnos en lo que confirma lo que ya creemos." },
        { type: "multiple_choice", question: "What can be inferred from the lecture?", options: ["bias affects people regardless of intelligence", "only uneducated people are biased", "bias is always harmless"], correctIndex: 0, explanation: "Si la inteligencia no protege, el sesgo afecta a todos." },
        { type: "true_false", statement: "The professor says intelligence makes people immune to bias.", answer: false, explanation: "\"...being intelligent does not make you immune.\"" }
      ]
    },

    "lvl-c1-listen-tech-society": {
      lessonId: "lvl-c1-listen-tech-society", level: "C1", track: "TOEFL · Listening", topic: "society", skill: "listening",
      title: "Listening: debate sobre teletrabajo", xpReward: 66, mascotState: "explaining",
      explanation: {
        body: "Escucha C1: un seminario que debate el teletrabajo. Capta los argumentos a favor y en contra y reconoce que el ponente presenta ambas caras. (Distingue ventaja de inconveniente.)",
        examples: [
          { en: "Proponents argue that...", es: "Los partidarios sostienen que..." },
          { en: "Critics point to the erosion of team spirit.", es: "Los críticos señalan la erosión del espíritu de equipo." }
        ]
      },
      exercises: [
        { type: "listening",
          text: "In this seminar we're debating remote work. Proponents argue it offers flexibility and cuts commuting time, which can improve both productivity and wellbeing.",
          question: "What is one argument FOR remote work?", options: ["it increases commuting", "it offers flexibility and saves commuting time", "it reduces salaries"], correctIndex: 1, explanation: "\"...flexibility and cuts commuting time...\"" },
        { type: "listening",
          text: "Critics, however, point to the erosion of team spirit and the difficulty of mentoring junior staff who never meet their colleagues in person.",
          question: "What concern do critics raise?", options: ["higher office rents", "weaker team spirit and harder mentoring", "too many meetings"], correctIndex: 1, explanation: "\"...the erosion of team spirit and the difficulty of mentoring...\"" },
        { type: "multiple_choice", question: "What is the seminar debating?", options: ["remote work", "office design", "salary levels"], correctIndex: 0, explanation: "El tema es el teletrabajo (remote work)." },
        { type: "multiple_choice", question: "'Erosion of team spirit' means team spirit is...", options: ["growing stronger", "gradually weakening", "completely unchanged"], correctIndex: 1, explanation: "'Erosion' = desgaste/debilitamiento gradual." },
        { type: "true_false", statement: "The speaker presents only the advantages of remote work.", answer: false, explanation: "Presenta argumentos a favor (proponents) y en contra (critics)." }
      ]
    },

    /* ========= C2 · LISTENING TEMÁTICO (ética / desarrollo) ========= */

    "lvl-c2-listen-ethics": {
      lessonId: "lvl-c2-listen-ethics", level: "C2", track: "TOEFL · Listening", topic: "study", skill: "listening",
      title: "Listening: ética (el dilema del tranvía)", xpReward: 74, mascotState: "explaining",
      explanation: {
        body: "Escucha C2: un seminario de filosofía moral. El ponente plantea un dilema, señala una inconsistencia y extrae una conclusión sutil. Capta el argumento, no solo los hechos. (Sigue el razonamiento hasta la tesis.)",
        examples: [
          { en: "Most people say they would pull the lever.", es: "La mayoría dice que tiraría de la palanca." },
          { en: "This inconsistency fascinates philosophers.", es: "Esta inconsistencia fascina a los filósofos." }
        ]
      },
      exercises: [
        { type: "listening",
          text: "Consider the famous trolley problem. A runaway trolley will kill five people unless you divert it onto a side track, where it will kill one. Most people say they would pull the lever. Yet when asked to push a single person to their death to achieve the same outcome, most refuse.",
          question: "What puzzle does the speaker describe?", options: ["the trolley problem", "the prisoner's dilemma", "a mathematical theorem"], correctIndex: 0, explanation: "Describe el clásico 'trolley problem'." },
        { type: "listening",
          text: "This inconsistency fascinates philosophers, because the numerical outcome is identical. It suggests our moral judgments are driven not purely by consequences, but by intuitions about action, intention and physical contact.",
          question: "What does the inconsistency suggest about moral judgments?", options: ["they depend only on the numbers", "they are shaped by intuitions, not just consequences", "they are always perfectly rational"], correctIndex: 1, explanation: "Sugiere que pesan intuiciones (acción, intención, contacto), no solo las consecuencias." },
        { type: "multiple_choice", question: "The speaker's main point is that human morality...", options: ["is perfectly logical", "is influenced by factors beyond pure outcomes", "does not really exist"], correctIndex: 1, explanation: "La moral humana se ve influida por más que los resultados." },
        { type: "multiple_choice", question: "An 'inconsistency' is...", options: ["a lack of logical agreement", "a strong proof", "a type of trolley"], correctIndex: 0, explanation: "Inconsistencia = falta de coherencia lógica." },
        { type: "true_false", statement: "According to the talk, most people would push a person to save five.", answer: false, explanation: "\"...most refuse\" cuando hay que empujar a alguien." }
      ]
    },

    "lvl-c2-listen-development": {
      lessonId: "lvl-c2-listen-development", level: "C2", track: "TOEFL · Listening", topic: "society", skill: "listening",
      title: "Listening: debate sobre la ayuda al desarrollo", xpReward: 74, mascotState: "explaining",
      explanation: {
        body: "Escucha C2: un debate sobre la ayuda exterior. El ponente contrasta posturas, resiste los eslóganes simples y matiza cuándo funciona la ayuda. Capta la postura y los matices. (No confundas el ejemplo con la tesis.)",
        examples: [
          { en: "Advocates contend that... Skeptics counter that...", es: "Los defensores sostienen que... Los escépticos replican que..." },
          { en: "The truth resists simple slogans.", es: "La verdad se resiste a los eslóganes simples." }
        ]
      },
      exercises: [
        { type: "listening",
          text: "Our topic today is foreign aid. Advocates contend that well-targeted aid has eradicated diseases and lifted millions out of poverty. Skeptics counter that poorly designed aid can foster dependency and prop up corrupt governments.",
          question: "What is the debate about?", options: ["foreign aid", "the stock market", "international tourism"], correctIndex: 0, explanation: "El tema es la ayuda exterior (foreign aid)." },
        { type: "listening",
          text: "The truth, as so often, resists simple slogans. The evidence suggests that aid works best when it is transparent, locally led, and tied to measurable outcomes rather than political convenience.",
          question: "According to the speaker, when does aid work best?", options: ["when it is secret and centralised", "when it is transparent, locally led and tied to measurable outcomes", "when it supports any government in power"], correctIndex: 1, explanation: "\"...transparent, locally led, and tied to measurable outcomes...\"" },
        { type: "multiple_choice", question: "What is the speaker's overall stance?", options: ["aid is always beneficial", "aid is always harmful", "aid can work under the right conditions"], correctIndex: 2, explanation: "Postura matizada: funciona bajo ciertas condiciones." },
        { type: "multiple_choice", question: "To 'foster dependency' means to...", options: ["encourage reliance on others", "put an end to all reliance", "reduce corruption"], correctIndex: 0, explanation: "'Foster dependency' = fomentar la dependencia." },
        { type: "true_false", statement: "The speaker says the issue can be summed up in a simple slogan.", answer: false, explanation: "\"The truth... resists simple slogans.\"" }
      ]
    }

  };

  /* Orden de aparición dentro de cada mundo (se anexa al final de cada
     escalera de destreza; la progresión real la calcula vesper_path.js). */
  var ORDER = [
    /* A1 */ "lvl-a1-vocab-house", "lvl-a1-listen-house",
    /* A2 */ "lvl-a2-vocab-health", "lvl-a2-listen-doctor",
    /* B1 */ "lvl-b1-vocab-tech", "lvl-b1-listen-podcast",
    /* B2 */ "lvl-b2-listen-meeting", "lvl-b2-listen-news",
    /* C1 */ "lvl-c1-listen-psychology", "lvl-c1-listen-tech-society",
    /* C2 */ "lvl-c2-listen-ethics", "lvl-c2-listen-development"
  ];

  /* Fusiona estas lecciones en el catálogo principal (VESPER_LESSONS). */
  function merge(targetL, targetOrder) {
    targetL = targetL || (window.VESPER_LESSONS = window.VESPER_LESSONS || {});
    targetOrder = targetOrder || (window.VESPER_LESSONS_ORDER = window.VESPER_LESSONS_ORDER || []);
    ORDER.forEach(function (id) {
      if (!targetL[id]) { targetL[id] = L[id]; }
      if (targetOrder.indexOf(id) < 0) targetOrder.push(id);
    });
    return { L: targetL, order: targetOrder };
  }

  return { lessons: L, order: ORDER, merge: merge };
})();
