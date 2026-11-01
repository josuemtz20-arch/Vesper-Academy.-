/* ============================================================
 * vesper_expansion.js — Expansión de contenido de Vesper (2026).
 *
 * ~29 lecciones nuevas (A1–C2) en todas las destrezas + una pista
 * profesional ("Inglés profesional" / Business), reutilizando los
 * tipos de ejercicio que ya soporta el motor de leccion.html:
 *   multiple_choice · word_order · true_false · fill_blank
 *   translate · matching · listening · categorize · reading
 *
 * Patrón idéntico a vesper_content_pack.js: expone
 *   window.VESPER_EXPANSION = { lessons, order, merge }
 * y se fusiona en VESPER_LESSONS via VESPER_EXPANSION.merge().
 *
 * Ningún lessonId colisiona con los packs existentes
 * (vesper_lessons.js · vesper_activities.js · vesper_content_pack.js).
 * Las lecciones de listening NO traen 'audio' (sin MP3): el motor usa
 * la voz natural del dispositivo (Web Speech API).
 * ============================================================ */
window.VESPER_EXPANSION = (function () {
  var L = {

    /* ==================================================================
     * A1 — fundamentos
     * ================================================================== */
    "voc-a1-numbers": {
      lessonId: "voc-a1-numbers", level: "A1", track: "Vocabulario", topic: "numbers", skill: "vocab",
      title: "Números 1–100", xpReward: 40, mascotState: "explaining",
      nextLessonId: "voc-a1-family",
      explanation: {
        body: "Los números son la base de precios, horas y edades. 1–12 son palabras únicas; del 13 al 19 terminan en -teen; las decenas (20, 30...) terminan en -ty. Cuidado: thirteen (13) vs thirty (30). (Aprende a contar en inglés.)",
        examples: [
          { en: "I have thirteen books.", es: "Tengo trece libros." },
          { en: "She is thirty years old.", es: "Ella tiene treinta años." },
          { en: "It costs forty-five dollars.", es: "Cuesta cuarenta y cinco dólares." }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Une el número con su palabra en inglés.", pairs: [
          { l: "15", r: "fifteen" }, { l: "40", r: "forty" }, { l: "12", r: "twelve" }, { l: "90", r: "ninety" } ],
          explanation: "15 = fifteen, 40 = forty (sin la 'u'), 12 = twelve, 90 = ninety." },
        { type: "multiple_choice", question: "How do you write 30?", options: ["thirteen", "thirty", "threety"],
          correctIndex: 1, explanation: "30 = thirty. 'thirteen' es 13." },
        { type: "fill_blank", sentence: "I am ___ years old. (21)", answers: ["twenty-one", "twenty one"],
          hint: "decena + unidad con guion.", explanation: "21 = twenty-one." },
        { type: "true_false", statement: "'Forty' is spelled with a 'u' (fourty).", answer: false,
          explanation: "Se escribe FORTY, sin 'u', aunque four sí la lleve." },
        { type: "categorize", instruction: "¿-teen (13–19) o -ty (decenas)?", buckets: [
          { id: "teen", label: "-teen" }, { id: "ty", label: "-ty" } ], items: [
          { t: "sixteen", bucket: "teen" }, { t: "eighty", bucket: "ty" }, { t: "nineteen", bucket: "teen" }, { t: "fifty", bucket: "ty" } ] },
        { type: "translate", prompt: "Traduce: \"Cuesta cuarenta y cinco dólares.\"",
          answers: ["it costs forty-five dollars", "it costs forty five dollars"],
          explanation: "It costs forty-five dollars." }
      ]
    },

    "voc-a1-family": {
      lessonId: "voc-a1-family", level: "A1", track: "Vocabulario", topic: "family", skill: "vocab",
      title: "La familia", xpReward: 40, mascotState: "explaining",
      nextLessonId: "gram-a1-plurals",
      explanation: {
        body: "Hablar de tu familia es de lo primero que necesitas. mother/father (formal), mum/dad (informal), brother, sister, son, daughter. El posesivo 's marca pertenencia: \"my sister's name\". (Vocabulario de familia.)",
        examples: [
          { en: "This is my brother.", es: "Este es mi hermano." },
          { en: "Her mother is a teacher.", es: "Su madre es profesora." },
          { en: "I have two sisters.", es: "Tengo dos hermanas." }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Une la palabra con su traducción.", pairs: [
          { l: "daughter", r: "hija" }, { l: "father", r: "padre" }, { l: "wife", r: "esposa" }, { l: "uncle", r: "tío" } ],
          explanation: "daughter = hija, father = padre, wife = esposa, uncle = tío." },
        { type: "multiple_choice", question: "Your mother's mother is your...", options: ["grandmother", "aunt", "niece"],
          correctIndex: 0, explanation: "La madre de tu madre es tu grandmother (abuela)." },
        { type: "fill_blank", sentence: "My ___ has two children: me and my brother. (mamá)",
          answers: ["mother", "mum", "mom"], hint: "mother / mum.", explanation: "mother (formal) o mum/mom (informal)." },
        { type: "word_order", words: ["This", "is", "my", "sister"], correctOrder: ["This", "is", "my", "sister"],
          hint: "This is + posesivo + sustantivo." },
        { type: "true_false", statement: "'Parents' means only the mother.", answer: false,
          explanation: "'Parents' = los padres (madre y padre). 'Relatives' = parientes." },
        { type: "translate", prompt: "Traduce: \"Tengo dos hermanas.\"",
          answers: ["i have two sisters"], explanation: "I have two sisters." }
      ]
    },

    "gram-a1-plurals": {
      lessonId: "gram-a1-plurals", level: "A1", track: "Gramática", topic: "grammar", skill: "grammar",
      title: "El plural de los sustantivos", xpReward: 45, mascotState: "explaining",
      nextLessonId: "gram-a1-there-is",
      explanation: {
        body: "La mayoría de plurales se forman con -s: book → books. Tras -s, -ss, -sh, -ch, -x añadimos -es: box → boxes. La -y tras consonante cambia a -ies: city → cities. Hay irregulares: man → men, child → children. (Cómo formar plurales.)",
        examples: [
          { en: "one car, two cars", es: "un coche, dos coches" },
          { en: "one watch, two watches", es: "un reloj, dos relojes" },
          { en: "one child, three children", es: "un niño, tres niños" }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "Plural of 'box'?", options: ["boxs", "boxies", "boxes"],
          correctIndex: 2, explanation: "Tras -x añadimos -es: boxes." },
        { type: "fill_blank", sentence: "I see three ___ in the park. (child)", answers: ["children"],
          hint: "Es irregular.", explanation: "child → children (irregular)." },
        { type: "categorize", instruction: "¿El plural lleva -s o -es?", buckets: [
          { id: "s", label: "+ -s" }, { id: "es", label: "+ -es" } ], items: [
          { t: "dog", bucket: "s" }, { t: "dish", bucket: "es" }, { t: "table", bucket: "s" }, { t: "glass", bucket: "es" } ] },
        { type: "multiple_choice", question: "Plural of 'city'?", options: ["citys", "cities", "cityes"],
          correctIndex: 1, explanation: "-y tras consonante → -ies: cities." },
        { type: "true_false", statement: "The plural of 'man' is 'mans'.", answer: false,
          explanation: "Es irregular: man → men." },
        { type: "translate", prompt: "Traduce: \"Tengo dos relojes.\"",
          answers: ["i have two watches"], explanation: "watch → watches. I have two watches." }
      ]
    },

    "gram-a1-there-is": {
      lessonId: "gram-a1-there-is", level: "A1", track: "Gramática", topic: "grammar", skill: "grammar",
      title: "There is / There are", xpReward: 45, mascotState: "explaining",
      nextLessonId: "voc-a2-weather",
      explanation: {
        body: "Usamos there is (singular) y there are (plural) para decir que algo existe. Negativo: there isn't / there aren't. Pregunta: Is there...? / Are there...? Con incontables usamos there is: \"There is some water.\" (Expresar existencia.)",
        examples: [
          { en: "There is a book on the table.", es: "Hay un libro en la mesa." },
          { en: "There are two cats in the garden.", es: "Hay dos gatos en el jardín." },
          { en: "Is there a bank near here?", es: "¿Hay un banco cerca de aquí?" }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "___ a cat under the chair.", options: ["There is", "There are", "There be"],
          correctIndex: 0, explanation: "Singular (a cat) → there is." },
        { type: "fill_blank", sentence: "___ three apples in the bowl.", answers: ["there are", "There are"],
          hint: "Plural → there are.", explanation: "Plural (three apples) → there are." },
        { type: "word_order", words: ["Is", "there", "a", "bank", "here"], correctOrder: ["Is", "there", "a", "bank", "here"],
          hint: "En preguntas: Is there...?" },
        { type: "true_false", statement: "We say 'There are a problem'.", answer: false,
          explanation: "Singular → 'There is a problem'." },
        { type: "multiple_choice", question: "Negative: '___ any milk.'", options: ["There aren't", "There not", "There isn't"],
          correctIndex: 2, explanation: "milk es incontable → there isn't." },
        { type: "translate", prompt: "Traduce: \"Hay dos gatos en el jardín.\"",
          answers: ["there are two cats in the garden"], explanation: "There are two cats in the garden." }
      ]
    },

    /* ==================================================================
     * A2 — confianza
     * ================================================================== */
    "voc-a2-weather": {
      lessonId: "voc-a2-weather", level: "A2", track: "Vocabulario", topic: "weather", skill: "vocab",
      title: "El clima y las estaciones", xpReward: 45, mascotState: "explaining",
      nextLessonId: "gram-a2-comparatives",
      explanation: {
        body: "Para hablar del clima usamos It's + adjetivo: It's sunny / cloudy / rainy / windy / cold / hot. Las estaciones: spring, summer, autumn (UK) / fall (US), winter. \"What's the weather like?\" = ¿Qué tiempo hace? (Hablar del clima.)",
        examples: [
          { en: "It's sunny and warm today.", es: "Hoy está soleado y cálido." },
          { en: "In winter it's very cold.", es: "En invierno hace mucho frío." },
          { en: "What's the weather like in spring?", es: "¿Qué tiempo hace en primavera?" }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Une el clima con su traducción.", pairs: [
          { l: "rainy", r: "lluvioso" }, { l: "windy", r: "ventoso" }, { l: "cloudy", r: "nublado" }, { l: "snowy", r: "nevado" } ],
          explanation: "rainy = lluvioso, windy = ventoso, cloudy = nublado, snowy = nevado." },
        { type: "fill_blank", sentence: "It's ___ today, so take an umbrella. (lluvioso)", answers: ["rainy", "raining"],
          hint: "Necesitas paraguas...", explanation: "It's rainy / It's raining." },
        { type: "multiple_choice", question: "Which season comes after summer?", options: ["spring", "autumn", "winter"],
          correctIndex: 1, explanation: "Tras el verano viene el otoño: autumn (UK) / fall (US)." },
        { type: "categorize", instruction: "¿Calor o frío?", buckets: [
          { id: "hot", label: "Calor" }, { id: "cold", label: "Frío" } ], items: [
          { t: "hot", bucket: "hot" }, { t: "freezing", bucket: "cold" }, { t: "warm", bucket: "hot" }, { t: "chilly", bucket: "cold" } ] },
        { type: "true_false", statement: "\"What's the weather like?\" asks about the weather.", answer: true,
          explanation: "Sí: significa ¿Qué tiempo hace?" },
        { type: "translate", prompt: "Traduce: \"En invierno hace mucho frío.\"",
          answers: ["in winter it's very cold", "in winter it is very cold"],
          explanation: "In winter it's very cold." }
      ]
    },

    "gram-a2-comparatives": {
      lessonId: "gram-a2-comparatives", level: "A2", track: "Gramática", topic: "grammar", skill: "grammar",
      title: "Comparativos y superlativos", xpReward: 50, mascotState: "explaining",
      nextLessonId: "gram-a2-going-to",
      explanation: {
        body: "Adjetivos cortos: + -er (comparativo) y the + -est (superlativo): big → bigger → the biggest. Adjetivos largos: more / the most: expensive → more expensive → the most expensive. Irregulares: good → better → the best; bad → worse → the worst. Comparamos con 'than'. (Comparar cosas.)",
        examples: [
          { en: "A train is faster than a bike.", es: "Un tren es más rápido que una bici." },
          { en: "This is the most interesting book.", es: "Este es el libro más interesante." },
          { en: "Her English is better than mine.", es: "Su inglés es mejor que el mío." }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "A car is ___ than a bike.", options: ["fast", "faster", "the fastest"],
          correctIndex: 1, explanation: "Comparativo de adjetivo corto: fast → faster ... than." },
        { type: "fill_blank", sentence: "This is the ___ restaurant in town. (good, superlativo)", answers: ["best"],
          hint: "good es irregular.", explanation: "good → the best." },
        { type: "multiple_choice", question: "Comparative of 'expensive'?", options: ["more expensive", "most expensive", "expensiver"],
          correctIndex: 0, explanation: "Adjetivo largo → more expensive." },
        { type: "word_order", words: ["She", "is", "taller", "than", "me"], correctOrder: ["She", "is", "taller", "than", "me"],
          hint: "comparativo + than." },
        { type: "true_false", statement: "The comparative of 'bad' is 'badder'.", answer: false,
          explanation: "Es irregular: bad → worse." },
        { type: "translate", prompt: "Traduce: \"Su inglés es mejor que el mío.\"",
          answers: ["her english is better than mine", "his english is better than mine"],
          explanation: "Her/His English is better than mine." }
      ]
    },

    "gram-a2-going-to": {
      lessonId: "gram-a2-going-to", level: "A2", track: "Gramática", topic: "grammar", skill: "grammar",
      title: "Futuro: 'going to'", xpReward: 50, mascotState: "explaining",
      nextLessonId: "read-a2-invitation",
      explanation: {
        body: "Usamos be + going to + verbo para planes e intenciones futuras y predicciones con evidencia. \"I'm going to study tonight.\" Pregunta: Are you going to...? Negativo: I'm not going to... Con 'will' expresamos decisiones del momento; con 'going to', planes ya pensados. (Hablar del futuro.)",
        examples: [
          { en: "I'm going to visit my aunt on Sunday.", es: "Voy a visitar a mi tía el domingo." },
          { en: "Look at those clouds! It's going to rain.", es: "¡Mira esas nubes! Va a llover." },
          { en: "Are you going to come to the party?", es: "¿Vas a venir a la fiesta?" }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "I ___ going to call her later.", options: ["is", "are", "am"],
          correctIndex: 2, explanation: "Con 'I' usamos am: I am going to." },
        { type: "fill_blank", sentence: "They ___ going to move to London. (be)", answers: ["are"],
          hint: "they → are.", explanation: "They are going to move." },
        { type: "word_order", words: ["She", "is", "going", "to", "travel"], correctOrder: ["She", "is", "going", "to", "travel"],
          hint: "subject + be + going to + verbo." },
        { type: "true_false", statement: "'Going to' is used for future plans and intentions.", answer: true,
          explanation: "Correcto: planes, intenciones y predicciones con evidencia." },
        { type: "multiple_choice", question: "Look at the sky! It ___ rain.", options: ["is going to", "going to", "will to"],
          correctIndex: 0, explanation: "Predicción con evidencia → is going to rain." },
        { type: "translate", prompt: "Traduce: \"¿Vas a venir a la fiesta?\"",
          answers: ["are you going to come to the party"], explanation: "Are you going to come to the party?" }
      ]
    },

    "read-a2-invitation": {
      lessonId: "read-a2-invitation", level: "A2", track: "Lectura", topic: "communication", skill: "reading",
      title: "Lectura: An invitation", xpReward: 45, mascotState: "explaining",
      nextLessonId: "gram-b1-passive",
      explanation: {
        body: "Vas a leer una invitación informal y responder preguntas. Fíjate en quién escribe, cuándo es el evento y qué pide. Lee con calma; puedes releer las veces que quieras. (Lee el mensaje y responde.)",
        examples: [
          { en: "Would you like to come?", es: "¿Te gustaría venir?" },
          { en: "Let me know if you can make it.", es: "Avísame si puedes asistir." }
        ]
      },
      exercises: [
        { type: "reading", title: "A birthday party",
          passage: "Hi Sam,\n\nI'm having a small birthday party next Saturday at my house. It starts at 7 p.m. There will be pizza and music, so don't eat too much before!\n\nCan you bring some drinks? Let me know if you can come.\n\nSee you soon,\nLucy",
          questions: [
            { q: "When is the party?", options: ["Friday at 7", "Saturday at 7 p.m.", "Sunday at 8"],
              correctIndex: 1, explanation: "\"next Saturday... It starts at 7 p.m.\"" },
            { q: "What does Lucy ask Sam to bring?", options: ["Pizza", "Music", "Some drinks"],
              correctIndex: 2, explanation: "\"Can you bring some drinks?\"" },
            { q: "Where is the party?", options: ["At Lucy's house", "At a restaurant", "At the park"],
              correctIndex: 0, explanation: "\"a small birthday party... at my house.\"" }
          ] },
        { type: "multiple_choice", question: "How do you accept an invitation?", options: ["I'm afraid I can't come.", "I'd love to, thanks!", "Maybe never."],
          correctIndex: 1, explanation: "\"I'd love to\" acepta con gusto." },
        { type: "fill_blank", sentence: "Let me ___ if you can come. (avisar)", answers: ["know"],
          hint: "Let me know.", explanation: "Let me know = avísame." }
      ]
    },

    /* ==================================================================
     * B1 — independencia
     * ================================================================== */
    "gram-b1-passive": {
      lessonId: "gram-b1-passive", level: "B1", track: "Grammar", topic: "grammar", skill: "grammar",
      title: "The passive voice", xpReward: 55, mascotState: "explaining",
      nextLessonId: "gram-b1-relative",
      explanation: {
        body: "The passive puts the focus on the action, not on who does it: be + past participle. \"The letter was sent yesterday.\" We use 'by' to mention the agent: \"...was written by Ana.\" It's useful when the agent is obvious or unknown.",
        examples: [
          { en: "English is spoken here." },
          { en: "The house was built in 1990." },
          { en: "The report will be finished tomorrow." }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "Passive of 'They make cars here'?", options: ["Cars are made here.", "Cars make here.", "Cars is made here."],
          correctIndex: 0, explanation: "be + past participle: cars ARE MADE here." },
        { type: "fill_blank", sentence: "The window ___ broken last night. (be, past)", answers: ["was"],
          hint: "singular, past.", explanation: "The window was broken." },
        { type: "word_order", words: ["The", "book", "was", "written", "by", "her"],
          correctOrder: ["The", "book", "was", "written", "by", "her"], hint: "subject + was + past participle + by + agent." },
        { type: "true_false", statement: "In the passive we use 'by' to introduce who does the action.", answer: true,
          explanation: "Yes: ...was painted BY Picasso." },
        { type: "multiple_choice", question: "Choose the passive: ...", options: ["Somebody stole my bike.", "My bike stole.", "My bike was stolen."],
          correctIndex: 2, explanation: "My bike was stolen (be + past participle)." },
        { type: "translate", prompt: "Rewrite in the passive: People speak English here.",
          answers: ["english is spoken here"], explanation: "English is spoken here." }
      ]
    },

    "gram-b1-relative": {
      lessonId: "gram-b1-relative", level: "B1", track: "Grammar", topic: "grammar", skill: "grammar",
      title: "Relative clauses", xpReward: 55, mascotState: "explaining",
      nextLessonId: "use-b1-collocations",
      explanation: {
        body: "Relative pronouns join information: who (people), which (things), that (both), where (places), whose (possession). \"The man who lives here is a doctor.\" In defining (essential) relative clauses we don't use commas.",
        examples: [
          { en: "That's the woman who helped me." },
          { en: "This is the book which I told you about." },
          { en: "It's the city where I was born." }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "The person ___ called you is my boss.", options: ["which", "who", "where"],
          correctIndex: 1, explanation: "People → who." },
        { type: "fill_blank", sentence: "This is the house ___ I grew up. (lugar)", answers: ["where"],
          hint: "lugar → where.", explanation: "...the house where I grew up." },
        { type: "multiple_choice", question: "The car ___ broke down was new.", options: ["which", "whose", "who"],
          correctIndex: 0, explanation: "Things → which (or that)." },
        { type: "matching", instruction: "Match each relative pronoun with its use.", pairs: [{"l":"who","r":"people"},{"l":"which","r":"things"},{"l":"where","r":"places"},{"l":"whose","r":"possession"}],
          explanation: "who = people, which = things, where = places, whose = possession." },
        { type: "true_false", statement: "'Whose' shows possession.", answer: true,
          explanation: "Yes: \"the girl whose dog ran away\" = the girl's dog ran away." },
        { type: "translate", prompt: "Join with a relative pronoun: That's the woman. She helped me.",
          answers: ["that's the woman who helped me","that is the woman who helped me","that's the woman that helped me","that is the woman that helped me"],
          explanation: "That's the woman who helped me." }
      ]
    },

    "use-b1-collocations": {
      lessonId: "use-b1-collocations", level: "B1", track: "Use of English", topic: "vocabulary", skill: "use",
      title: "Collocations with make / do", xpReward: 50, mascotState: "explaining",
      nextLessonId: "read-b1-email-formal",
      explanation: {
        body: "Make and do are confusing because both can translate as the same verb in Spanish. make = create or produce (make a decision, make a mistake, make money). do = carry out tasks or activities (do homework, do the dishes, do exercise). Learn the combinations (collocations) as chunks; don't translate them word for word.",
        examples: [
          { en: "I need to make a decision." },
          { en: "She does her homework every day." },
          { en: "Don't make a mistake." }
        ]
      },
      exercises: [
        { type: "categorize", instruction: "make or do?", buckets: [
          { id: "make", label: "make" }, { id: "do", label: "do" } ], items: [
          { t: "a mistake", bucket: "make" }, { t: "the dishes", bucket: "do" }, { t: "money", bucket: "make" }, { t: "exercise", bucket: "do" }, { t: "a decision", bucket: "make" }, { t: "homework", bucket: "do" } ] },
        { type: "fill_blank", sentence: "Can you ___ me a favour?", answers: ["do"],
          hint: "do a favour.", explanation: "do someone a favour (a fixed collocation)." },
        { type: "multiple_choice", question: "I always ___ my best at work.", options: ["make", "take", "do"],
          correctIndex: 2, explanation: "do your best (collocation)." },
        { type: "true_false", statement: "We say 'make a mistake', not 'do a mistake'.", answer: true,
          explanation: "Correct: make a mistake." },
        { type: "multiple_choice", question: "They want to ___ progress.", options: ["do", "make", "give"],
          correctIndex: 1, explanation: "make progress (collocation)." },
        { type: "translate", prompt: "Rewrite with make or do: I need to decide.",
          answers: ["i need to make a decision"], explanation: "I need to make a decision." }
      ]
    },

    "read-b1-email-formal": {
      lessonId: "read-b1-email-formal", level: "B1", track: "Reading", topic: "communication", skill: "reading",
      title: "Reading: A formal email", xpReward: 50, mascotState: "explaining",
      nextLessonId: "lis-b1-podcast-tips",
      explanation: {
        body: "A formal email starts with \"Dear [name]\", states the reason clearly and closes with \"Kind regards\". It uses 'Please' and avoids very informal language. Read one and answer the questions.",
        examples: [
          { en: "I am writing to enquire about..." },
          { en: "I look forward to hearing from you." }
        ]
      },
      exercises: [
        { type: "reading", title: "Booking confirmation",
          passage: "Dear Ms Carter,\n\nThank you for your email. I am writing to confirm your reservation for two nights, from 14 to 16 May. Breakfast is included and check-in is from 2 p.m.\n\nIf you need to cancel, please let us know at least 48 hours in advance.\n\nKind regards,\nThe Riverside Hotel",
          questions: [
            { q: "How many nights is the reservation?", options: ["One", "Two", "Three"],
              correctIndex: 1, explanation: "\"for two nights, from 14 to 16 May\"." },
            { q: "What time can guests check in?", options: ["From 2 p.m.", "From 12 p.m.", "From 6 p.m."],
              correctIndex: 0, explanation: "\"check-in is from 2 p.m.\"" },
            { q: "How early must you cancel?", options: ["24 hours", "1 week", "48 hours"],
              correctIndex: 2, explanation: "\"at least 48 hours in advance\"." }
          ] },
        { type: "multiple_choice", question: "Which is a formal closing?", options: ["Cheers!", "Kind regards", "See ya"],
          correctIndex: 1, explanation: "'Kind regards' is formal." },
        { type: "fill_blank", sentence: "I look forward to ___ from you.", answers: ["hearing"],
          hint: "look forward to + -ing.", explanation: "I look forward to hearing from you." }
      ]
    },

    "lis-b1-podcast-tips": {
      lessonId: "lis-b1-podcast-tips", level: "B1", track: "Listening", topic: "study", skill: "listening",
      title: "Listening: Study tips", xpReward: 50, mascotState: "explaining",
      nextLessonId: "gram-b2-reported",
      explanation: {
        body: "You will hear short tips for studying English. Don't try to understand every word: catch the main idea and the key words. You can replay the audio and slow it down.",
        examples: [
          { en: "Listen a little every day." },
          { en: "Don't be afraid of mistakes." }
        ]
      },
      exercises: [
        { type: "listening", text: "My best tip is simple: study a little every day instead of a lot once a week. Short, regular practice works much better for your memory.", "audio": "assets/audio/app/b1_0f7af12197.mp3",
          question: "What is the main tip?", options: ["Study a little every day", "Never study", "Study a lot once a week"],
          correctIndex: 0, explanation: "\"study a little every day instead of a lot once a week\"." },
        { type: "listening", text: "Also, watch videos with subtitles in English, not in your language. It helps you connect sounds with words.", "audio": "assets/audio/app/b1_33c7d0c7be.mp3",
          question: "Which subtitles does the speaker recommend?", options: ["No subtitles", "In your language", "In English"],
          correctIndex: 2, explanation: "\"subtitles in English, not in your language\"." },
        { type: "true_false", statement: "The speaker says you should be afraid of mistakes.", answer: false,
          explanation: "The speaker recommends the opposite: practise without being afraid of mistakes." },
        { type: "fill_blank", sentence: "Short, regular ___ works better for memory.", answers: ["practice", "practise"],
          hint: "A noun: the act of doing something regularly.", explanation: "practice (noun, US & UK) / practise (verb, UK)." }
      ]
    },

    /* ==================================================================
     * B2 — fluidez
     * ================================================================== */
    "gram-b2-reported": {
      lessonId: "gram-b2-reported", level: "B2", track: "Grammar", topic: "grammar", skill: "grammar",
      title: "Reported speech", xpReward: 60, mascotState: "explaining",
      nextLessonId: "use-b2-markers",
      explanation: {
        body: "To report what someone said, tenses usually move one step back: present simple → past simple; will → would; can → could. Pronouns and time expressions also change (today → that day). \"She said (that) she was tired.\"",
        examples: [
          { en: "\"I am busy.\" → He said he was busy." },
          { en: "\"I will call you.\" → She said she would call me." },
          { en: "\"I can swim.\" → He said he could swim." }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "\"I am tired.\" → She said she ___ tired.", options: ["is", "was", "were"],
          correctIndex: 1, explanation: "present → past: is → was." },
        { type: "fill_blank", sentence: "\"I will help.\" → He said he ___ help. (will → ?)", answers: ["would"],
          hint: "will moves back to...", explanation: "will → would." },
        { type: "multiple_choice", question: "\"I can drive.\" → She said she ___ drive.", options: ["could", "can", "will"],
          correctIndex: 0, explanation: "can → could." },
        { type: "true_false", statement: "In reported speech, tenses usually move one step back.", answer: true,
          explanation: "Yes: 'backshift' is the general rule." },
        { type: "word_order", words: ["He", "said", "he", "was", "hungry"],
          correctOrder: ["He", "said", "he", "was", "hungry"], hint: "He said (that) he was..." },
        { type: "translate", prompt: "Report it: \"I'll call you,\" she told me. → She said…",
          answers: ["she said she would call me","she said that she would call me","he said he would call me"],
          explanation: "She/He said she/he would call me." }
      ]
    },

    "use-b2-markers": {
      lessonId: "use-b2-markers", level: "B2", track: "Use of English", topic: "writing", skill: "use",
      title: "Discourse markers", xpReward: 55, mascotState: "explaining",
      nextLessonId: "voc-b2-work",
      explanation: {
        body: "Discourse markers organise ideas and make you sound fluent. Contrast: however, although, despite. Addition: moreover, in addition. Result: therefore, as a result. Example: for instance. 'However' and 'therefore' are followed by a comma.",
        examples: [
          { en: "It was raining; however, we went out." },
          { en: "The plan is risky. Therefore, we need a backup." },
          { en: "Despite the cost, it's worth it." }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "It's expensive; ___, the quality is great.", options: ["however", "because", "so that"],
          correctIndex: 0, explanation: "Contrast → however." },
        { type: "categorize", instruction: "Contrast or result?", buckets: [
          { id: "c", label: "Contrast" }, { id: "r", label: "Result" } ], items: [
          { t: "however", bucket: "c" }, { t: "therefore", bucket: "r" }, { t: "although", bucket: "c" }, { t: "as a result", bucket: "r" } ] },
        { type: "fill_blank", sentence: "___ the rain, the match continued.", answers: ["despite", "Despite"],
          hint: "despite + noun.", explanation: "Despite the rain... (despite + noun, no 'of')." },
        { type: "true_false", statement: "'Although' and 'despite' are followed by the same structure.", answer: false,
          explanation: "although + clause (subject + verb); despite + noun / -ing." },
        { type: "multiple_choice", question: "We had no map. ___, we got lost.", options: ["Moreover", "For instance", "As a result"],
          correctIndex: 2, explanation: "Result → As a result." },
        { type: "translate", prompt: "Link the ideas with 'Therefore': The plan is risky. We need a backup.",
          answers: ["the plan is risky. therefore, we need a backup","the plan is risky therefore we need a backup","the plan is risky therefore we need a backup plan","the plan is risky therefore we need a plan b"],
          explanation: "The plan is risky. Therefore, we need a backup." }
      ]
    },

    "voc-b2-work": {
      lessonId: "voc-b2-work", level: "B2", track: "Vocabulary", topic: "work", skill: "vocab",
      title: "Work vocabulary", xpReward: 55, mascotState: "explaining",
      nextLessonId: "read-b2-opinion",
      explanation: {
        body: "The world of work has its own vocabulary: apply for a job, a deadline (the latest time to finish), a salary (money you earn), to be promoted (get a higher position), staff (the people who work somewhere), a meeting. Many are fixed collocations: meet a deadline, give a presentation.",
        examples: [
          { en: "I applied for a new job." },
          { en: "We have to meet the deadline." },
          { en: "She was promoted to manager." }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Match each term with its meaning.", pairs: [{"l":"deadline","r":"the latest time to finish"},{"l":"salary","r":"fixed pay for a job"},{"l":"staff","r":"the people who work for a company"},{"l":"skills","r":"abilities you have learned"}],
          explanation: "deadline, salary, staff and skills are key work words." },
        { type: "fill_blank", sentence: "I want to ___ for that job. (solicitar)", answers: ["apply"],
          hint: "apply for.", explanation: "apply for a job." },
        { type: "multiple_choice", question: "To 'meet a deadline' means to...", options: ["miss the date", "finish on time", "cancel the work"],
          correctIndex: 1, explanation: "meet a deadline = finish on time." },
        { type: "categorize", instruction: "Good or bad news at work?", buckets: [
          { id: "pos", label: "Good news" }, { id: "neg", label: "Bad news" } ], items: [
          { t: "get a promotion", bucket: "pos" }, { t: "get fired", bucket: "neg" }, { t: "a pay rise", bucket: "pos" }, { t: "miss a deadline", bucket: "neg" } ] },
        { type: "true_false", statement: "'To be promoted' means to get a higher position.", answer: true,
          explanation: "Yes: to move up to a higher position." },
        { type: "translate", prompt: "Rewrite with a collocation: We have to finish the project by the agreed date. (We have to … the deadline.)",
          answers: ["we have to meet the deadline"], explanation: "We have to meet the deadline." }
      ]
    },

    "read-b2-opinion": {
      lessonId: "read-b2-opinion", level: "B2", track: "Reading", topic: "society", skill: "reading",
      title: "Reading: Remote work", xpReward: 55, mascotState: "explaining",
      nextLessonId: "use-c1-nominalisation",
      explanation: {
        body: "You will read an opinion piece about remote work. Identify the writer's position and the arguments for and against. Distinguish facts from opinions.",
        examples: [
          { en: "On the one hand... on the other hand..." },
          { en: "In my view, the benefits outweigh the costs." }
        ]
      },
      exercises: [
        { type: "reading", title: "Working from home",
          passage: "Remote work has changed how we live. On the one hand, employees save time and money by not commuting, and many feel more productive at home. On the other hand, some people miss the social contact of an office and find it hard to separate work from personal life.\n\nIn my view, the best solution is a hybrid model: a few days at home and a few in the office. This way, companies keep the benefits of both worlds.",
          questions: [
            { q: "What is one advantage mentioned?", options: ["More commuting", "Saving time and money", "Less productivity at home"],
              correctIndex: 1, explanation: "\"save time and money by not commuting\"." },
            { q: "What is a disadvantage mentioned?", options: ["Shorter weeks", "Higher salaries", "Missing social contact"],
              correctIndex: 2, explanation: "\"some people miss the social contact\"." },
            { q: "What does the writer prefer?", options: ["A hybrid model", "Only office", "Only home"],
              correctIndex: 0, explanation: "\"the best solution is a hybrid model\"." }
          ] },
        { type: "multiple_choice", question: "\"The benefits outweigh the costs\" means the benefits are...", options: ["smaller", "greater", "equal"],
          correctIndex: 1, explanation: "outweigh = be greater or more important than." },
        { type: "fill_blank", sentence: "On the one hand... on the ___ hand.", answers: ["other"],
          hint: "A fixed expression.", explanation: "on the other hand = introduces the opposite point of view." }
      ]
    },

    /* ==================================================================
     * C1 — dominio
     * ================================================================== */
    "use-c1-nominalisation": {
      lessonId: "use-c1-nominalisation", level: "C1", track: "Use of English", topic: "academic", skill: "use",
      title: "Nominalisation", xpReward: 60, mascotState: "explaining",
      nextLessonId: "voc-c1-academic",
      explanation: {
        body: "Nominalisation turns verbs or adjectives into nouns for a more formal, compact style, typical of academic English. \"They decided quickly\" → \"Their quick decision...\". It makes a text more impersonal and dense with information.",
        examples: [
          { en: "decide → decision" },
          { en: "They reduced costs → The reduction of costs" },
          { en: "It is important to analyse → The analysis is important" }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Match each verb/adjective with its noun.", pairs: [
          { l: "analyse", r: "analysis" }, { l: "decide", r: "decision" }, { l: "able", r: "ability" }, { l: "grow", r: "growth" } ],
          explanation: "analyse→analysis, decide→decision, able→ability, grow→growth." },
        { type: "multiple_choice", question: "Nominalise: 'They failed.' →", options: ["Their failure", "They failure", "Fail of them"],
          correctIndex: 0, explanation: "fail → failure: 'Their failure...'." },
        { type: "fill_blank", sentence: "The ___ of the project pleased investors. (succeed → ?)", answers: ["success"],
          hint: "succeed → ...", explanation: "succeed → success." },
        { type: "true_false", statement: "Nominalisation tends to make writing more formal and impersonal.", answer: true,
          explanation: "Yes: it is typical of academic register." },
        { type: "multiple_choice", question: "Which is the noun form of 'improve'?", options: ["improval", "improvation", "improvement"],
          correctIndex: 2, explanation: "improve → improvement." },
        { type: "translate", prompt: "Nominalise: \"They reduced costs.\" → Write the noun phrase starting with 'The…'",
          answers: ["the reduction of costs","the reduction in costs","the cost reduction","their reduction of costs"],
          explanation: "The reduction of/in costs." }
      ]
    },

    "voc-c1-academic": {
      lessonId: "voc-c1-academic", level: "C1", track: "Vocabulary", topic: "academic", skill: "vocab",
      title: "Academic vocabulary", xpReward: 60, mascotState: "explaining",
      nextLessonId: "read-c1-analysis",
      explanation: {
        body: "Academic English prefers precise verbs: demonstrate (show with evidence), indicate (point to), highlight (draw attention to), undermine (weaken), comprise (consist of). Using the exact verb gives your writing authority.",
        examples: [
          { en: "The data demonstrate a clear trend." },
          { en: "These results highlight a problem." },
          { en: "This finding undermines the theory." }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Match each verb with its meaning.", pairs: [{"l":"demonstrate","r":"show with evidence"},{"l":"highlight","r":"draw attention to"},{"l":"undermine","r":"gradually weaken"},{"l":"comprise","r":"consist of"}],
          explanation: "demonstrate, highlight, undermine, comprise: high-register verbs." },
        { type: "multiple_choice", question: "The evidence ___ that the plan works.", options: ["indicates", "indicate", "indication"],
          correctIndex: 0, explanation: "indicates (third person singular): shows / suggests." },
        { type: "fill_blank", sentence: "The team ___ five researchers. (consists of)", answers: ["comprises"],
          hint: "comprise (no 'of').", explanation: "The team comprises five researchers." },
        { type: "categorize", instruction: "Formal or informal?", buckets: [
          { id: "f", label: "Formal" }, { id: "i", label: "Informal" } ], items: [
          { t: "demonstrate", bucket: "f" }, { t: "show off", bucket: "i" }, { t: "indicate", bucket: "f" }, { t: "kind of", bucket: "i" } ] },
        { type: "true_false", statement: "'Undermine' has a negative meaning.", answer: true,
          explanation: "Yes: it means to weaken something gradually." },
        { type: "translate", prompt: "Make it academic with 'demonstrate': The data shows a clear trend.",
          answers: ["the data demonstrate a clear trend", "the data demonstrates a clear trend"],
          explanation: "The data demonstrate a clear trend." }
      ]
    },

    "read-c1-analysis": {
      lessonId: "read-c1-analysis", level: "C1", track: "Reading", topic: "science", skill: "reading",
      title: "Reading: Critical reading", xpReward: 60, mascotState: "explaining",
      nextLessonId: "voc-c2-idioms",
      explanation: {
        body: "At C1 understanding is not enough: you need to infer the writer's attitude and distinguish claims from evidence. Read the text and notice the tone and the hedging ('may', 'tends to').",
        examples: [
          { en: "The author suggests, rather than states, that..." },
          { en: "The tone is cautious." }
        ]
      },
      exercises: [
        { type: "reading", title: "The limits of multitasking",
          passage: "Many people believe they can do several tasks at once, yet research tends to suggest otherwise. What we call 'multitasking' is often rapid switching between tasks, and each switch carries a small cost in time and accuracy. The effect may seem trivial, but across a working day these costs accumulate.\n\nThis does not mean multitasking is always harmful. For simple, automatic activities, the cost is negligible. The problem arises mainly with tasks that demand sustained attention.",
          questions: [
            { q: "What does the writer say 'multitasking' usually is?", options: ["Doing several tasks truly at the same time", "Rapid switching between tasks", "Avoiding tasks"],
              correctIndex: 1, explanation: "\"often rapid switching between tasks\"." },
            { q: "When is the cost negligible?", options: ["For complex tasks", "Never", "For simple, automatic activities"],
              correctIndex: 2, explanation: "\"For simple, automatic activities, the cost is negligible.\"" },
            { q: "What is the writer's overall tone?", options: ["Cautious and balanced", "Dismissive", "Absolutely certain"],
              correctIndex: 0, explanation: "It uses 'tends to' and 'may' → a cautious, balanced tone." }
          ] },
        { type: "multiple_choice", question: "\"Costs accumulate\" means they...", options: ["disappear", "add up over time", "stay the same"],
          correctIndex: 1, explanation: "accumulate = build up, add up over time." },
        { type: "fill_blank", sentence: "The problem arises with tasks that demand ___ attention. (continuous, long-lasting)", answers: ["sustained"],
          hint: "An adjective from the text.", explanation: "sustained attention = attention kept up over a long time." }
      ]
    },

    /* ==================================================================
     * C2 — maestría
     * ================================================================== */
    "voc-c2-idioms": {
      lessonId: "voc-c2-idioms", level: "C2", track: "Vocabulary", topic: "idioms", skill: "vocab",
      title: "Advanced idioms", xpReward: 65, mascotState: "explaining",
      nextLessonId: "use-c2-hedging",
      tipo: "aprende",
      explanation: {
        body: "Idioms give you native-like naturalness: to bite the bullet (face something difficult), to cut corners (do something badly to save time or money), the ball is in your court (it's your turn to decide), to be on the same page (agree, understand each other). They can't be translated word for word.",
        examples: [
          { en: "Let's bite the bullet and start." },
          { en: "Don't cut corners on safety." },
          { en: "The ball is in your court now." }
        ],
        sections: [
          {
            "kind": "intro",
            "body": "At C2 being correct is not enough: you need to sound natural. Idioms are fixed phrases whose meaning doesn't come from the individual words; using them well, in the right context, is one of the hallmarks of expert-level English."
          },
          {
            "kind": "regla",
            "body": "Learn them as chunks, with their preposition and their register. Almost all are informal or neutral: in a formal email or an essay, the direct word is better (to bite the bullet → to face the problem). Don't translate them literally or change them: a half-remembered idiom sounds worse than not using one."
          },
          {
            "kind": "vocab",
            "items": [
              {
                "en": "to bite the bullet",
                "es": "to face something difficult or unpleasant"
              },
              {
                "en": "to cut corners",
                "es": "to do something badly to save time or money"
              },
              {
                "en": "the ball is in your court",
                "es": "it's your turn to decide or act"
              },
              {
                "en": "to be on the same page",
                "es": "to agree, to understand each other"
              },
              {
                "en": "to go the extra mile",
                "es": "to make more effort than is expected"
              },
              {
                "en": "to call it a day",
                "es": "to stop working for today"
              }
            ]
          },
          {
            "kind": "expresiones",
            "items": [
              {
                "en": "Let's bite the bullet and tell the client.",
                "es": "face a hard conversation"
              },
              {
                "en": "Before we start, let's make sure we're on the same page.",
                "es": "check that everyone agrees"
              },
              {
                "en": "I've sent my offer — the ball is in your court.",
                "es": "now you decide"
              },
              {
                "en": "It's late; let's call it a day.",
                "es": "stop working for today"
              }
            ]
          },
          {
            "kind": "ejemplos",
            "items": [
              {
                "en": "They cut corners on the renovation, and now the roof leaks."
              },
              {
                "en": "She always goes the extra mile for her students."
              },
              {
                "en": "We disagreed at first, but now we're on the same page."
              }
            ]
          },
          {
            "kind": "errores",
            "items": [
              {
                "no": "Let's bite the ball.",
                "si": "Let's bite the bullet.",
                "pq": "Idioms are fixed: changing one word breaks them."
              },
              {
                "no": "He cut the corners.",
                "si": "He cut corners.",
                "pq": "No article: to cut corners."
              },
              {
                "no": "The ball is in your side.",
                "si": "The ball is in your court.",
                "pq": "It's court (as in a tennis court), not side."
              },
              {
                "no": "We are in the same page.",
                "si": "We are on the same page.",
                "pq": "The preposition is on."
              },
              {
                "no": "In conclusion, the government should bite the bullet.",
                "si": "In conclusion, the government should confront the issue.",
                "pq": "In a formal essay the idiom sounds too colloquial."
              }
            ]
          },
          {
            "kind": "resumen",
            "body": "Learn the whole idiom, with its preposition and its context, and keep it for informal or neutral registers. If in doubt, the direct word never fails."
          },
          {
            "kind": "puente",
            "body": "Your turn: a few exercises to fix them in your memory."
          }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Match each idiom with its meaning.", pairs: [{"l":"bite the bullet","r":"face something unpleasant"},{"l":"cut corners","r":"do it badly to save time or money"},{"l":"on the same page","r":"in agreement"},{"l":"the ball is in your court","r":"it's your turn to act"}],
          explanation: "Four frequent idioms in high-register English." },
        { type: "multiple_choice", question: "If you 'cut corners', you...", options: ["do excellent work", "do something badly to save time/money", "turn left"],
          correctIndex: 1, explanation: "cut corners = do a poor job to save time or money." },
        { type: "fill_blank", sentence: "We're all on the same ___. (we agree)", answers: ["page"],
          hint: "on the same ...", explanation: "on the same page = in agreement." },
        { type: "true_false", statement: "'The ball is in your court' means it's your turn to act.", answer: true,
          explanation: "Yes: it's your turn to decide or act." },
        { type: "multiple_choice", question: "'To bite the bullet' means to...", options: ["eat quickly", "give up", "face something difficult"],
          correctIndex: 2, explanation: "To face something difficult or unpleasant." },
        { type: "translate", prompt: "Use an idiom: I've done my part. Now it's your turn to decide.",
          answers: ["the ball is in your court now", "the ball is in your court"],
          explanation: "The ball is in your court (now)." }
      ]
    },

    "use-c2-hedging": {
      lessonId: "use-c2-hedging", level: "C2", track: "Use of English", topic: "academic", skill: "use",
      title: "Hedging", xpReward: 65, mascotState: "explaining",
      nextLessonId: "read-c2-rhetoric",
      explanation: {
        body: "Hedging softens claims so you sound precise and careful, which is key in academic and professional writing. Tools: may/might, tend to, appear to, it seems that, to some extent, arguably. \"This may suggest...\" is more defensible than \"This proves...\".",
        examples: [
          { en: "This may indicate a wider trend." },
          { en: "The results appear to support the theory." },
          { en: "Arguably, the policy was a mistake." }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "Which sentence is more cautious (hedged)?", options: ["This may support the theory.", "This proves the theory.", "This is the theory."],
          correctIndex: 0, explanation: "'may support' hedges the claim; it avoids sounding too absolute." },
        { type: "categorize", instruction: "Hedged or categorical?", buckets: [
          { id: "h", label: "Hedged" }, { id: "c", label: "Categorical" } ], items: [
          { t: "It seems that...", bucket: "h" }, { t: "It is certain that...", bucket: "c" }, { t: "tends to...", bucket: "h" }, { t: "always proves...", bucket: "c" } ] },
        { type: "fill_blank", sentence: "The data ___ to suggest a link. (parece)", answers: ["appears", "appear", "seems", "seem"],
          hint: "appear/seem to suggest.", explanation: "The data appear/seem to suggest a link." },
        { type: "true_false", statement: "Hedging makes claims sound more careful and defensible.", answer: true,
          explanation: "Yes: it reduces the risk of over-generalising." },
        { type: "multiple_choice", question: "Choose a hedging word.", options: ["definitely", "arguably", "obviously"],
          correctIndex: 1, explanation: "'arguably' hedges; the others are emphatic." },
        { type: "translate", prompt: "Hedge this claim with 'may' or 'might': This indicates a wider trend.",
          answers: ["this may indicate a wider trend", "this might indicate a wider trend"],
          explanation: "This may/might indicate a wider trend." }
      ]
    },

    "read-c2-rhetoric": {
      lessonId: "read-c2-rhetoric", level: "C2", track: "Reading", topic: "language", skill: "reading",
      title: "Reading: Tone and rhetoric", xpReward: 65, mascotState: "explaining",
      nextLessonId: "biz-b1-emails",
      explanation: {
        body: "At C2 you read between the lines: irony, emphasis and rhetorical purpose. Notice how the writer uses rhetorical questions and contrasts to persuade, not just to inform.",
        examples: [
          { en: "Is this really progress?" },
          { en: "The writer is being ironic." }
        ]
      },
      exercises: [
        { type: "reading", title: "A smarter world?",
          passage: "Our devices promise to make life simpler. We can order dinner, summon a car and answer a hundred messages without leaving the sofa. And yet, have we ever felt busier? Each tool that 'saves' time seems to fill the space it creates with new demands.\n\nNone of this is an argument against technology. It is, rather, an invitation to ask a harder question: not what our tools can do for us, but what we want them to do.",
          questions: [
            { q: "What is the purpose of the question 'have we ever felt busier?'", options: ["To request information", "To start a survey", "To make the reader reflect (rhetorical)"],
              correctIndex: 2, explanation: "It's a rhetorical question meant to make the reader reflect." },
            { q: "What is the writer's stance on technology?", options: ["Not against it, but questioning how we use it", "Strongly against it", "Indifferent"],
              correctIndex: 0, explanation: "\"None of this is an argument against technology... an invitation to ask a harder question\"." },
            { q: "The phrase 'tools that save time' uses quotation marks to...", options: ["quote an expert", "signal irony/doubt about 'save'", "mark a title"],
              correctIndex: 1, explanation: "The quotation marks signal irony or doubt about the verb 'save'." }
          ] },
        { type: "multiple_choice", question: "A 'rhetorical question' is asked mainly to...", options: ["get a precise, factual answer from the listener", "create an effect or make a point", "test memory"],
          correctIndex: 1, explanation: "It aims for effect or persuasion, not a literal answer." },
        { type: "fill_blank", sentence: "The writer's tone is gently ___. (disapproving)", answers: ["critical"],
          hint: "An adjective from the word \"criticism\".", explanation: "The tone is subtly critical." }
      ]
    },

    /* ==================================================================
     * INGLÉS PROFESIONAL (Business) — B1 → C1
     * ================================================================== */
    "biz-b1-emails": {
      lessonId: "biz-b1-emails", level: "B1", track: "Business English", topic: "business", skill: "use",
      title: "Business: work emails", xpReward: 55, mascotState: "explaining",
      nextLessonId: "biz-b1-phone",
      explanation: {
        body: "An effective work email is clear and short. Opening: \"Hi [name], I hope you're well.\" Get to the point: \"I'm writing about...\". Polite request: \"Could you please...?\". Closing: \"Best regards\". Avoid long, vague messages.",
        examples: [
          { en: "I'm writing to follow up on our meeting." },
          { en: "Could you please send me the file?" },
          { en: "Please find attached the report." }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "Polite request in an email:", options: ["Send me the file now.", "I want the file.", "Could you please send me the file?"],
          correctIndex: 2, explanation: "'Could you please...?' is polite and professional." },
        { type: "fill_blank", sentence: "Please find ___ the report. (included with this email)", answers: ["attached"],
          hint: "find attached.", explanation: "Please find attached = the document is included with this email." },
        { type: "categorize", instruction: "Opening or closing?", buckets: [
          { id: "o", label: "Opening" }, { id: "c", label: "Closing" } ], items: [
          { t: "I hope you're well", bucket: "o" }, { t: "Best regards", bucket: "c" }, { t: "I'm writing about", bucket: "o" }, { t: "Looking forward to your reply", bucket: "c" } ] },
        { type: "true_false", statement: "Long, vague emails are best in business.", answer: false,
          explanation: "No: clear and short is best." },
        { type: "multiple_choice", question: "Best subject line for a meeting request?", options: ["Meeting request: Friday 10 a.m.", "Important!!!", "Hello"],
          correctIndex: 0, explanation: "Specific and clear: topic + when." },
        { type: "translate", prompt: "Write the opening line of a follow-up email about our meeting, using 'follow up on'. (I'm writing to…)",
          answers: ["i'm writing to follow up on our meeting", "i am writing to follow up on our meeting"],
          explanation: "I'm writing to follow up on our meeting." }
      ]
    },

    "biz-b1-phone": {
      lessonId: "biz-b1-phone", level: "B1", track: "Business English", topic: "business", skill: "use",
      title: "Business: phone calls", xpReward: 55, mascotState: "explaining",
      nextLessonId: "biz-b2-meetings",
      explanation: {
        body: "On the phone we use fixed phrases. Introduce yourself: \"Hello, this is Ana from Sales.\" Ask for someone: \"Could I speak to...?\" Ask someone to wait: \"Hold on, please.\" Take a message: \"Can I take a message?\"",
        examples: [
          { en: "Hello, this is Ana speaking." },
          { en: "Could I speak to Mr Lee, please?" },
          { en: "I'll put you through." }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "How do you introduce yourself on the phone?", options: ["I am Ana.", "This is Ana speaking.", "Here Ana."],
          correctIndex: 1, explanation: "On the phone: 'This is Ana speaking.'" },
        { type: "matching", instruction: "Match each phrase with its function.", pairs: [{"l":"Hold on, please","r":"ask someone to wait"},{"l":"Can I take a message?","r":"offer to note a message"},{"l":"I'll put you through","r":"transfer the call"},{"l":"Could I speak to...?","r":"ask for someone"}],
          explanation: "Standard telephone phrases." },
        { type: "fill_blank", sentence: "Could I ___ to the manager, please? (hablar)", answers: ["speak"],
          hint: "speak to.", explanation: "Could I speak to...?" },
        { type: "true_false", statement: "'I'll put you through' means you will transfer the call.", answer: true,
          explanation: "Yes: to connect or transfer the call." },
        { type: "multiple_choice", question: "The line is busy. You say:", options: ["I don't know.", "Go away.", "The line is engaged, can you call back?"],
          correctIndex: 2, explanation: "'engaged / busy' = the person is on another call; you offer to call back." },
        { type: "translate", prompt: "Ask politely to talk to Mr Lee on the phone, starting 'Could I…'",
          answers: ["could i speak to mr lee, please", "could i speak to mr lee please"],
          explanation: "Could I speak to Mr Lee, please?" }
      ]
    },

    "biz-b2-meetings": {
      lessonId: "biz-b2-meetings", level: "B2", track: "Business English", topic: "business", skill: "use",
      title: "Business: meetings", xpReward: 60, mascotState: "explaining",
      nextLessonId: "biz-b2-presentations",
      explanation: {
        body: "In meetings you need clear functions. Give an opinion: \"In my opinion... / I think we should...\". Agree: \"I agree / Good point.\" Disagree tactfully: \"I see your point, but...\". Interrupt: \"Sorry to interrupt, but...\". Suggest: \"Why don't we...?\"",
        examples: [
          { en: "I see your point, but I'd suggest a different approach." },
          { en: "Shall we move on to the next item?" },
          { en: "Let's table that for now." }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "Polite way to disagree:", options: ["I see your point, but...", "No way.", "You're wrong."],
          correctIndex: 0, explanation: "'I see your point, but...' disagrees tactfully." },
        { type: "categorize", instruction: "Agreeing or disagreeing?", buckets: [
          { id: "a", label: "Agreeing" }, { id: "d", label: "Disagreeing" } ], items: [
          { t: "Absolutely.", bucket: "a" }, { t: "I'm not so sure about that.", bucket: "d" }, { t: "Good point.", bucket: "a" }, { t: "I'm afraid I disagree.", bucket: "d" } ] },
        { type: "fill_blank", sentence: "Shall we ___ on to the next item? (pasar)", answers: ["move"],
          hint: "move on.", explanation: "move on to = pasar a." },
        { type: "true_false", statement: "'Sorry to interrupt, but...' is a polite way to break in.", answer: true,
          explanation: "Yes: it interrupts politely." },
        { type: "multiple_choice", question: "To suggest an idea you can say:", options: ["It's impossible.", "Do it.", "Why don't we try X?"],
          correctIndex: 2, explanation: "'Why don't we...?' makes a gentle suggestion." },
        { type: "translate", prompt: "As the chair, suggest going to the next topic, starting 'Shall we…'",
          answers: ["shall we move on to the next item","shall we move on to the next point","shall we move on to the next topic"],
          explanation: "Shall we move on to the next item?" }
      ]
    },

    "biz-b2-presentations": {
      lessonId: "biz-b2-presentations", level: "B2", track: "Business English", topic: "business", skill: "use",
      title: "Business: presentations", xpReward: 60, mascotState: "explaining",
      nextLessonId: "biz-c1-negotiation",
      explanation: {
        body: "A good presentation is structured with signposting. Start: \"Today I'll talk about...\". Change point: \"Let's move on to...\". Emphasise: \"The key point is...\". Close: \"To sum up...\". These phrases guide your audience.",
        examples: [
          { en: "First, I'll outline the problem." },
          { en: "As you can see on this slide..." },
          { en: "To sum up, we recommend option B." }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Match each phrase with its stage.", pairs: [{"l":"Today I'll talk about","r":"introduction"},{"l":"Let's move on to","r":"transition"},{"l":"The key point is","r":"emphasis"},{"l":"To sum up","r":"conclusion"}],
          explanation: "Signposting phrases for each stage." },
        { type: "multiple_choice", question: "Which phrase closes a presentation?", options: ["First of all,", "To sum up,", "By the way,"],
          correctIndex: 1, explanation: "'To sum up' summarises and closes." },
        { type: "fill_blank", sentence: "As you can ___ on this slide, sales rose.", answers: ["see"],
          hint: "As you can see.", explanation: "As you can see = look at the evidence on the slide." },
        { type: "true_false", statement: "Signposting helps the audience follow your structure.", answer: true,
          explanation: "Yes: it shows the audience where you are in the talk." },
        { type: "multiple_choice", question: "To invite questions at the end:", options: ["I'm happy to take any questions.", "Stop talking.", "No questions."],
          correctIndex: 0, explanation: "A polite way to open the floor to questions." },
        { type: "translate", prompt: "Close your presentation with a signposting phrase and recommend option B.",
          answers: ["to sum up, we recommend option b","to sum up we recommend option b","in conclusion we recommend option b","to conclude we recommend option b","to summarise we recommend option b","to summarize we recommend option b","in summary we recommend option b"],
          explanation: "To sum up, we recommend option B." }
      ]
    },

    "biz-c1-negotiation": {
      lessonId: "biz-c1-negotiation", level: "C1", track: "Business English", topic: "business", skill: "use",
      title: "Business: negotiation", xpReward: 65, mascotState: "explaining",
      explanation: {
        body: "Negotiating in English requires diplomatic, conditional language. Propose: \"We'd be willing to... if...\". Set conditions: \"If you could..., we could...\". Resist gently: \"That might be difficult for us.\" Close: \"I think we have a deal.\"",
        examples: [
          { en: "If you can lower the price, we'll order more." },
          { en: "We'd be willing to compromise on the deadline." },
          { en: "That's not quite what we had in mind." }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "Most diplomatic way to refuse:", options: ["No.", "That might be difficult for us.", "Never."],
          correctIndex: 1, explanation: "'That might be difficult' rejects the offer gently." },
        { type: "fill_blank", sentence: "If you could deliver earlier, we ___ increase the order. (could)", answers: ["could", "would"],
          hint: "conditional: if + could..., we could/would...", explanation: "We could/would increase the order." },
        { type: "categorize", instruction: "Concession or pressure?", buckets: [
          { id: "g", label: "Concession" }, { id: "p", label: "Pressure" } ], items: [
          { t: "We could be flexible on this", bucket: "g" }, { t: "That's our final offer", bucket: "p" }, { t: "We're willing to compromise", bucket: "g" }, { t: "Take it or leave it", bucket: "p" } ] },
        { type: "true_false", statement: "Conditional language ('if... would') is common in negotiations.", answer: true,
          explanation: "Yes: it lets you offer and ask at the same time, tactfully." },
        { type: "multiple_choice", question: "To confirm an agreement:", options: ["I think we have a deal.", "Maybe later.", "I don't care."],
          correctIndex: 0, explanation: "'I think we have a deal' closes the agreement." },
        { type: "translate", prompt: "Make a conditional offer: a lower price → we order more. (If you…)",
          answers: ["if you can lower the price, we'll order more","if you lower the price we will order more","if you can lower the price we'll order more","if you lower the price we'll order more","if you can lower the price we will order more","if you could lower the price we would order more","if you could lower the price we'd order more"],
          explanation: "If you can lower the price, we'll order more." }
      ]
    }

  };

  var ORDER = [
    /* A1 */ "voc-a1-numbers", "voc-a1-family", "gram-a1-plurals", "gram-a1-there-is",
    /* A2 */ "voc-a2-weather", "gram-a2-comparatives", "gram-a2-going-to", "read-a2-invitation",
    /* B1 */ "gram-b1-passive", "gram-b1-relative", "use-b1-collocations", "read-b1-email-formal", "lis-b1-podcast-tips",
    /* B2 */ "gram-b2-reported", "use-b2-markers", "voc-b2-work", "read-b2-opinion",
    /* C1 */ "use-c1-nominalisation", "voc-c1-academic", "read-c1-analysis",
    /* C2 */ "voc-c2-idioms", "use-c2-hedging", "read-c2-rhetoric",
    /* Inglés profesional */ "biz-b1-emails", "biz-b1-phone", "biz-b2-meetings", "biz-b2-presentations", "biz-c1-negotiation"
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
