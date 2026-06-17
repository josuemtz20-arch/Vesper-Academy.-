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
        { type: "multiple_choice", question: "Your mother's mother is your...", options: ["aunt", "grandmother", "niece"],
          correctIndex: 1, explanation: "La madre de tu madre es tu grandmother (abuela)." },
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
        { type: "multiple_choice", question: "Plural of 'box'?", options: ["boxs", "boxes", "boxies"],
          correctIndex: 1, explanation: "Tras -x añadimos -es: boxes." },
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
        { type: "multiple_choice", question: "Negative: '___ any milk.'", options: ["There isn't", "There aren't", "There not"],
          correctIndex: 0, explanation: "milk es incontable → there isn't." },
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
        { type: "multiple_choice", question: "Comparative of 'expensive'?", options: ["expensiver", "more expensive", "most expensive"],
          correctIndex: 1, explanation: "Adjetivo largo → more expensive." },
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
        { type: "multiple_choice", question: "I ___ going to call her later.", options: ["am", "is", "are"],
          correctIndex: 0, explanation: "Con 'I' usamos am: I am going to." },
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
            { q: "Where is the party?", options: ["At a restaurant", "At Lucy's house", "At the park"],
              correctIndex: 1, explanation: "\"a small birthday party... at my house.\"" }
          ] },
        { type: "multiple_choice", question: "How do you accept an invitation?", options: ["I'm afraid I can't.", "I'd love to, thanks!", "Maybe never."],
          correctIndex: 1, explanation: "\"I'd love to\" acepta con gusto." },
        { type: "fill_blank", sentence: "Let me ___ if you can come. (avisar)", answers: ["know"],
          hint: "Let me know.", explanation: "Let me know = avísame." }
      ]
    },

    /* ==================================================================
     * B1 — independencia
     * ================================================================== */
    "gram-b1-passive": {
      lessonId: "gram-b1-passive", level: "B1", track: "Gramática", topic: "grammar", skill: "grammar",
      title: "La voz pasiva", xpReward: 55, mascotState: "explaining",
      nextLessonId: "gram-b1-relative",
      explanation: {
        body: "La pasiva pone el foco en la acción, no en quién la hace: be + participio pasado. \"The letter was sent yesterday.\" Usamos 'by' para mencionar al agente: \"...was written by Ana.\" Útil cuando el agente es obvio o desconocido. (Activa → pasiva.)",
        examples: [
          { en: "English is spoken here.", es: "Aquí se habla inglés." },
          { en: "The house was built in 1990.", es: "La casa fue construida en 1990." },
          { en: "The report will be finished tomorrow.", es: "El informe se terminará mañana." }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "Passive of 'They make cars here'?", options: ["Cars are made here.", "Cars make here.", "Cars is made here."],
          correctIndex: 0, explanation: "be + participio: cars ARE MADE here." },
        { type: "fill_blank", sentence: "The window ___ broken last night. (be, pasado)", answers: ["was"],
          hint: "singular, pasado.", explanation: "The window was broken." },
        { type: "word_order", words: ["The", "book", "was", "written", "by", "her"],
          correctOrder: ["The", "book", "was", "written", "by", "her"], hint: "sujeto + was + participio + by + agente." },
        { type: "true_false", statement: "In the passive we use 'by' to introduce who does the action.", answer: true,
          explanation: "Sí: ...was painted BY Picasso." },
        { type: "multiple_choice", question: "Choose the passive: ...", options: ["Somebody stole my bike.", "My bike was stolen.", "My bike stole."],
          correctIndex: 1, explanation: "My bike was stolen (be + participio)." },
        { type: "translate", prompt: "Traduce: \"Aquí se habla inglés.\"",
          answers: ["english is spoken here"], explanation: "English is spoken here." }
      ]
    },

    "gram-b1-relative": {
      lessonId: "gram-b1-relative", level: "B1", track: "Gramática", topic: "grammar", skill: "grammar",
      title: "Oraciones de relativo", xpReward: 55, mascotState: "explaining",
      nextLessonId: "use-b1-collocations",
      explanation: {
        body: "Los pronombres relativos unen información: who (personas), which (cosas), that (ambos), where (lugares), whose (posesión). \"The man who lives here is a doctor.\" En las relativas especificativas (esenciales) no usamos comas. (Conectar ideas con relativos.)",
        examples: [
          { en: "That's the woman who helped me.", es: "Esa es la mujer que me ayudó." },
          { en: "This is the book which I told you about.", es: "Este es el libro del que te hablé." },
          { en: "It's the city where I was born.", es: "Es la ciudad donde nací." }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "The person ___ called you is my boss.", options: ["which", "who", "where"],
          correctIndex: 1, explanation: "Personas → who." },
        { type: "fill_blank", sentence: "This is the house ___ I grew up. (lugar)", answers: ["where"],
          hint: "lugar → where.", explanation: "...the house where I grew up." },
        { type: "multiple_choice", question: "The car ___ broke down was new.", options: ["who", "which", "whose"],
          correctIndex: 1, explanation: "Cosas → which (o that)." },
        { type: "matching", instruction: "Une el relativo con su uso.", pairs: [
          { l: "who", r: "personas" }, { l: "which", r: "cosas" }, { l: "where", r: "lugares" }, { l: "whose", r: "posesión" } ],
          explanation: "who=personas, which=cosas, where=lugares, whose=posesión." },
        { type: "true_false", statement: "'Whose' shows possession.", answer: true,
          explanation: "Sí: \"the girl whose dog ran away\" = cuyo perro." },
        { type: "translate", prompt: "Traduce: \"Esa es la mujer que me ayudó.\"",
          answers: ["that's the woman who helped me", "that is the woman who helped me"],
          explanation: "That's the woman who helped me." }
      ]
    },

    "use-b1-collocations": {
      lessonId: "use-b1-collocations", level: "B1", track: "Uso del inglés", topic: "vocabulary", skill: "use",
      title: "Colocaciones con make / do", xpReward: 50, mascotState: "explaining",
      nextLessonId: "read-b1-email-formal",
      explanation: {
        body: "make y do confunden porque ambos se traducen como 'hacer'. make = crear/producir (make a decision, make a mistake, make money). do = realizar tareas/actividades (do homework, do the dishes, do exercise). Memoriza las combinaciones (colocaciones), no las traduzcas literalmente. (make vs do.)",
        examples: [
          { en: "I need to make a decision.", es: "Necesito tomar una decisión." },
          { en: "She does her homework every day.", es: "Ella hace los deberes cada día." },
          { en: "Don't make a mistake.", es: "No cometas un error." }
        ]
      },
      exercises: [
        { type: "categorize", instruction: "¿make o do?", buckets: [
          { id: "make", label: "make" }, { id: "do", label: "do" } ], items: [
          { t: "a mistake", bucket: "make" }, { t: "the dishes", bucket: "do" }, { t: "money", bucket: "make" }, { t: "exercise", bucket: "do" }, { t: "a decision", bucket: "make" }, { t: "homework", bucket: "do" } ] },
        { type: "fill_blank", sentence: "Can you ___ me a favour? (hacer)", answers: ["do"],
          hint: "do a favour.", explanation: "do someone a favour (colocación fija)." },
        { type: "multiple_choice", question: "I always ___ my best at work.", options: ["make", "do", "take"],
          correctIndex: 1, explanation: "do your best (colocación)." },
        { type: "true_false", statement: "We say 'make a mistake', not 'do a mistake'.", answer: true,
          explanation: "Correcto: make a mistake." },
        { type: "multiple_choice", question: "They want to ___ progress.", options: ["do", "make", "give"],
          correctIndex: 1, explanation: "make progress (colocación)." },
        { type: "translate", prompt: "Traduce: \"Necesito tomar una decisión.\"",
          answers: ["i need to make a decision"], explanation: "I need to make a decision." }
      ]
    },

    "read-b1-email-formal": {
      lessonId: "read-b1-email-formal", level: "B1", track: "Lectura", topic: "communication", skill: "reading",
      title: "Lectura: A formal email", xpReward: 50, mascotState: "explaining",
      nextLessonId: "lis-b1-podcast-tips",
      explanation: {
        body: "Un email formal empieza con \"Dear [nombre]\", expone el motivo con claridad y cierra con \"Kind regards\". Usa 'Please' y evita lenguaje muy coloquial. Vas a leer uno y responder preguntas. (Comprensión + registro formal.)",
        examples: [
          { en: "I am writing to enquire about...", es: "Le escribo para preguntar sobre..." },
          { en: "I look forward to hearing from you.", es: "Quedo a la espera de su respuesta." }
        ]
      },
      exercises: [
        { type: "reading", title: "Booking confirmation",
          passage: "Dear Ms Carter,\n\nThank you for your email. I am writing to confirm your reservation for two nights, from 14 to 16 May. Breakfast is included and check-in is from 2 p.m.\n\nIf you need to cancel, please let us know at least 48 hours in advance.\n\nKind regards,\nThe Riverside Hotel",
          questions: [
            { q: "How many nights is the reservation?", options: ["One", "Two", "Three"],
              correctIndex: 1, explanation: "\"for two nights, from 14 to 16 May\"." },
            { q: "What time can guests check in?", options: ["From 12 p.m.", "From 2 p.m.", "From 6 p.m."],
              correctIndex: 1, explanation: "\"check-in is from 2 p.m.\"" },
            { q: "How early must you cancel?", options: ["24 hours", "48 hours", "1 week"],
              correctIndex: 1, explanation: "\"at least 48 hours in advance\"." }
          ] },
        { type: "multiple_choice", question: "Which is a formal closing?", options: ["Cheers!", "Kind regards", "See ya"],
          correctIndex: 1, explanation: "'Kind regards' es formal." },
        { type: "fill_blank", sentence: "I look forward to ___ from you. (oír)", answers: ["hearing"],
          hint: "look forward to + -ing.", explanation: "I look forward to hearing from you." }
      ]
    },

    "lis-b1-podcast-tips": {
      lessonId: "lis-b1-podcast-tips", level: "B1", track: "Listening", topic: "study", skill: "listening",
      title: "Listening: Study tips", xpReward: 50, mascotState: "explaining",
      nextLessonId: "gram-b2-reported",
      explanation: {
        body: "Escucharás consejos cortos para estudiar inglés. No intentes entender cada palabra: capta la idea principal y las palabras clave. Puedes repetir el audio y bajar la velocidad. (Listening de ideas clave.)",
        examples: [
          { en: "Listen a little every day.", es: "Escucha un poco cada día." },
          { en: "Don't be afraid of mistakes.", es: "No tengas miedo a los errores." }
        ]
      },
      exercises: [
        { type: "listening", text: "My best tip is simple: study a little every day instead of a lot once a week. Short, regular practice works much better for your memory.",
          question: "What is the main tip?", options: ["Study a lot once a week", "Study a little every day", "Never study"],
          correctIndex: 1, explanation: "\"study a little every day instead of a lot once a week\"." },
        { type: "listening", text: "Also, watch videos with subtitles in English, not in your language. It helps you connect sounds with words.",
          question: "Which subtitles does the speaker recommend?", options: ["In your language", "In English", "No subtitles"],
          correctIndex: 1, explanation: "\"subtitles in English, not in your language\"." },
        { type: "true_false", statement: "The speaker says you should be afraid of mistakes.", answer: false,
          explanation: "Recomienda lo contrario: practicar sin miedo a equivocarse." },
        { type: "fill_blank", sentence: "Short, regular ___ works better for memory. (práctica)", answers: ["practice", "practise"],
          hint: "práctica (sustantivo).", explanation: "practice (US) / practise (verbo UK)." }
      ]
    },

    /* ==================================================================
     * B2 — fluidez
     * ================================================================== */
    "gram-b2-reported": {
      lessonId: "gram-b2-reported", level: "B2", track: "Gramática", topic: "grammar", skill: "grammar",
      title: "Estilo indirecto (reported speech)", xpReward: 60, mascotState: "explaining",
      nextLessonId: "use-b2-markers",
      explanation: {
        body: "Para contar lo que alguien dijo, los tiempos verbales retroceden un paso: present simple → past simple; will → would; can → could. También cambian pronombres y expresiones de tiempo (today → that day). \"She said (that) she was tired.\" (Reportar lo que se dijo.)",
        examples: [
          { en: "\"I am busy.\" → He said he was busy.", es: "\"Estoy ocupado.\" → Dijo que estaba ocupado." },
          { en: "\"I will call you.\" → She said she would call me.", es: "\"Te llamaré.\" → Dijo que me llamaría." },
          { en: "\"I can swim.\" → He said he could swim.", es: "\"Sé nadar.\" → Dijo que sabía nadar." }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "\"I am tired.\" → She said she ___ tired.", options: ["is", "was", "were"],
          correctIndex: 1, explanation: "present → past: is → was." },
        { type: "fill_blank", sentence: "\"I will help.\" → He said he ___ help. (will → ?)", answers: ["would"],
          hint: "will retrocede a...", explanation: "will → would." },
        { type: "multiple_choice", question: "\"I can drive.\" → She said she ___ drive.", options: ["can", "could", "will"],
          correctIndex: 1, explanation: "can → could." },
        { type: "true_false", statement: "In reported speech, tenses usually move one step back.", answer: true,
          explanation: "Sí: el 'backshift' es la regla general." },
        { type: "word_order", words: ["He", "said", "he", "was", "hungry"],
          correctOrder: ["He", "said", "he", "was", "hungry"], hint: "He said (that) he was..." },
        { type: "translate", prompt: "Reporta: \"Te llamaré.\" → Dijo que me llamaría.",
          answers: ["she said she would call me", "he said he would call me"],
          explanation: "She/He said she/he would call me." }
      ]
    },

    "use-b2-markers": {
      lessonId: "use-b2-markers", level: "B2", track: "Uso del inglés", topic: "writing", skill: "use",
      title: "Conectores del discurso", xpReward: 55, mascotState: "explaining",
      nextLessonId: "voc-b2-work",
      explanation: {
        body: "Los conectores organizan ideas y dan fluidez. Contraste: however, although, despite. Adición: moreover, in addition. Resultado: therefore, as a result. Ejemplo: for instance. 'However' y 'therefore' van seguidos de coma. (Conectar argumentos.)",
        examples: [
          { en: "It was raining; however, we went out.", es: "Llovía; sin embargo, salimos." },
          { en: "The plan is risky. Therefore, we need a backup.", es: "El plan es arriesgado. Por tanto, necesitamos un plan B." },
          { en: "Despite the cost, it's worth it.", es: "A pesar del coste, vale la pena." }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "It's expensive; ___, the quality is great.", options: ["however", "because", "so that"],
          correctIndex: 0, explanation: "Contraste → however." },
        { type: "categorize", instruction: "¿Contraste o resultado?", buckets: [
          { id: "c", label: "Contraste" }, { id: "r", label: "Resultado" } ], items: [
          { t: "however", bucket: "c" }, { t: "therefore", bucket: "r" }, { t: "although", bucket: "c" }, { t: "as a result", bucket: "r" } ] },
        { type: "fill_blank", sentence: "___ the rain, the match continued. (a pesar de)", answers: ["despite", "Despite"],
          hint: "despite + sustantivo.", explanation: "Despite the rain... (despite + sustantivo, sin 'of')." },
        { type: "true_false", statement: "'Although' and 'despite' are followed by the same structure.", answer: false,
          explanation: "although + oración (sujeto+verbo); despite + sustantivo/-ing." },
        { type: "multiple_choice", question: "We had no map. ___, we got lost.", options: ["Moreover", "As a result", "For instance"],
          correctIndex: 1, explanation: "Resultado → As a result." },
        { type: "translate", prompt: "Traduce: \"El plan es arriesgado. Por tanto, necesitamos un plan B.\"",
          answers: ["the plan is risky. therefore, we need a backup", "the plan is risky therefore we need a backup"],
          explanation: "The plan is risky. Therefore, we need a backup." }
      ]
    },

    "voc-b2-work": {
      lessonId: "voc-b2-work", level: "B2", track: "Vocabulario", topic: "work", skill: "vocab",
      title: "Vocabulario del trabajo", xpReward: 55, mascotState: "explaining",
      nextLessonId: "read-b2-opinion",
      explanation: {
        body: "El mundo laboral tiene su vocabulario: apply for a job (solicitar), a deadline (fecha límite), a salary (sueldo), to be promoted (ascender), staff (personal), a meeting (reunión). Muchos son colocaciones fijas: meet a deadline, give a presentation. (Léxico profesional.)",
        examples: [
          { en: "I applied for a new job.", es: "Solicité un nuevo trabajo." },
          { en: "We have to meet the deadline.", es: "Tenemos que cumplir la fecha límite." },
          { en: "She was promoted to manager.", es: "Fue ascendida a gerente." }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Une el término con su traducción.", pairs: [
          { l: "deadline", r: "fecha límite" }, { l: "salary", r: "sueldo" }, { l: "staff", r: "personal" }, { l: "skills", r: "habilidades" } ],
          explanation: "deadline=fecha límite, salary=sueldo, staff=personal, skills=habilidades." },
        { type: "fill_blank", sentence: "I want to ___ for that job. (solicitar)", answers: ["apply"],
          hint: "apply for.", explanation: "apply for a job." },
        { type: "multiple_choice", question: "To 'meet a deadline' means to...", options: ["miss the date", "finish on time", "cancel the work"],
          correctIndex: 1, explanation: "meet a deadline = terminar a tiempo." },
        { type: "categorize", instruction: "¿Positivo o negativo en el trabajo?", buckets: [
          { id: "pos", label: "Positivo" }, { id: "neg", label: "Negativo" } ], items: [
          { t: "get a promotion", bucket: "pos" }, { t: "get fired", bucket: "neg" }, { t: "a pay rise", bucket: "pos" }, { t: "miss a deadline", bucket: "neg" } ] },
        { type: "true_false", statement: "'To be promoted' means to get a higher position.", answer: true,
          explanation: "Sí: ascender a un puesto superior." },
        { type: "translate", prompt: "Traduce: \"Tenemos que cumplir la fecha límite.\"",
          answers: ["we have to meet the deadline"], explanation: "We have to meet the deadline." }
      ]
    },

    "read-b2-opinion": {
      lessonId: "read-b2-opinion", level: "B2", track: "Lectura", topic: "society", skill: "reading",
      title: "Lectura: Remote work", xpReward: 55, mascotState: "explaining",
      nextLessonId: "use-c1-nominalisation",
      explanation: {
        body: "Leerás un texto de opinión sobre el teletrabajo. Identifica la postura del autor y los argumentos a favor y en contra. Distingue hechos de opiniones. (Comprensión de un texto argumentativo.)",
        examples: [
          { en: "On the one hand... on the other hand...", es: "Por un lado... por otro lado..." },
          { en: "In my view, the benefits outweigh the costs.", es: "En mi opinión, los beneficios superan los costes." }
        ]
      },
      exercises: [
        { type: "reading", title: "Working from home",
          passage: "Remote work has changed how we live. On the one hand, employees save time and money by not commuting, and many feel more productive at home. On the other hand, some people miss the social contact of an office and find it hard to separate work from personal life.\n\nIn my view, the best solution is a hybrid model: a few days at home and a few in the office. This way, companies keep the benefits of both worlds.",
          questions: [
            { q: "What is one advantage mentioned?", options: ["More commuting", "Saving time and money", "Less productivity"],
              correctIndex: 1, explanation: "\"save time and money by not commuting\"." },
            { q: "What is a disadvantage mentioned?", options: ["Missing social contact", "Higher salaries", "Shorter weeks"],
              correctIndex: 0, explanation: "\"some people miss the social contact\"." },
            { q: "What does the writer prefer?", options: ["Only office", "Only home", "A hybrid model"],
              correctIndex: 2, explanation: "\"the best solution is a hybrid model\"." }
          ] },
        { type: "multiple_choice", question: "\"The benefits outweigh the costs\" means the benefits are...", options: ["smaller", "greater", "equal"],
          correctIndex: 1, explanation: "outweigh = pesar más / ser mayores." },
        { type: "fill_blank", sentence: "On the one hand... on the ___ hand. (otro)", answers: ["other"],
          hint: "expresión fija.", explanation: "on the other hand = por otro lado." }
      ]
    },

    /* ==================================================================
     * C1 — dominio
     * ================================================================== */
    "use-c1-nominalisation": {
      lessonId: "use-c1-nominalisation", level: "C1", track: "Uso del inglés", topic: "academic", skill: "use",
      title: "Nominalización", xpReward: 60, mascotState: "explaining",
      nextLessonId: "voc-c1-academic",
      explanation: {
        body: "La nominalización convierte verbos o adjetivos en sustantivos para un estilo más formal y compacto, típico del inglés académico. \"They decided quickly\" → \"Their quick decision...\". Hace el texto más impersonal y denso en información. (Estilo formal.)",
        examples: [
          { en: "decide → decision", es: "decidir → decisión" },
          { en: "They reduced costs → The reduction of costs", es: "Redujeron costes → La reducción de costes" },
          { en: "It is important to analyse → The analysis is important", es: "Es importante analizar → El análisis es importante" }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Une el verbo/adjetivo con su sustantivo.", pairs: [
          { l: "analyse", r: "analysis" }, { l: "decide", r: "decision" }, { l: "able", r: "ability" }, { l: "grow", r: "growth" } ],
          explanation: "analyse→analysis, decide→decision, able→ability, grow→growth." },
        { type: "multiple_choice", question: "Nominalise: 'They failed.' →", options: ["Their failure", "They failure", "Fail of them"],
          correctIndex: 0, explanation: "fail → failure: 'Their failure...'." },
        { type: "fill_blank", sentence: "The ___ of the project pleased investors. (succeed → ?)", answers: ["success"],
          hint: "succeed → ...", explanation: "succeed → success." },
        { type: "true_false", statement: "Nominalisation tends to make writing more formal and impersonal.", answer: true,
          explanation: "Sí: es típica del registro académico." },
        { type: "multiple_choice", question: "Which is the noun form of 'improve'?", options: ["improvement", "improvation", "improval"],
          correctIndex: 0, explanation: "improve → improvement." },
        { type: "translate", prompt: "Nominaliza: \"Redujeron los costes.\" → \"La reducción de costes...\"",
          answers: ["the reduction of costs", "the reduction in costs"],
          explanation: "The reduction of/in costs." }
      ]
    },

    "voc-c1-academic": {
      lessonId: "voc-c1-academic", level: "C1", track: "Vocabulario", topic: "academic", skill: "vocab",
      title: "Léxico académico", xpReward: 60, mascotState: "explaining",
      nextLessonId: "read-c1-analysis",
      explanation: {
        body: "El inglés académico prefiere verbos precisos: demonstrate (mostrar con pruebas), indicate (señalar), highlight (destacar), undermine (socavar), comprise (componerse de). Usar el verbo exacto da autoridad a tu texto. (Vocabulario de registro alto.)",
        examples: [
          { en: "The data demonstrate a clear trend.", es: "Los datos demuestran una tendencia clara." },
          { en: "These results highlight a problem.", es: "Estos resultados destacan un problema." },
          { en: "This finding undermines the theory.", es: "Este hallazgo socava la teoría." }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Une el verbo con su significado.", pairs: [
          { l: "demonstrate", r: "mostrar con pruebas" }, { l: "highlight", r: "destacar" }, { l: "undermine", r: "socavar" }, { l: "comprise", r: "componerse de" } ],
          explanation: "demonstrate, highlight, undermine, comprise." },
        { type: "multiple_choice", question: "The evidence ___ that the plan works.", options: ["indicates", "indicate", "indication"],
          correctIndex: 0, explanation: "indicates (3ª persona): señala/indica." },
        { type: "fill_blank", sentence: "The team ___ five researchers. (componerse de)", answers: ["comprises"],
          hint: "comprise (sin 'of').", explanation: "The team comprises five researchers." },
        { type: "categorize", instruction: "¿Formal o informal?", buckets: [
          { id: "f", label: "Formal" }, { id: "i", label: "Informal" } ], items: [
          { t: "demonstrate", bucket: "f" }, { t: "show off", bucket: "i" }, { t: "indicate", bucket: "f" }, { t: "kind of", bucket: "i" } ] },
        { type: "true_false", statement: "'Undermine' has a negative meaning.", answer: true,
          explanation: "Sí: debilitar/socavar algo." },
        { type: "translate", prompt: "Traduce: \"Los datos demuestran una tendencia clara.\"",
          answers: ["the data demonstrate a clear trend", "the data demonstrates a clear trend"],
          explanation: "The data demonstrate a clear trend." }
      ]
    },

    "read-c1-analysis": {
      lessonId: "read-c1-analysis", level: "C1", track: "Lectura", topic: "science", skill: "reading",
      title: "Lectura: Critical reading", xpReward: 60, mascotState: "explaining",
      nextLessonId: "voc-c2-idioms",
      explanation: {
        body: "En C1 no basta con entender: hay que inferir la actitud del autor y distinguir afirmación de evidencia. Lee este texto y fíjate en el tono y en las matizaciones ('may', 'tends to'). (Lectura crítica.)",
        examples: [
          { en: "The author suggests, rather than states, that...", es: "El autor sugiere, más que afirma, que..." },
          { en: "The tone is cautious.", es: "El tono es cauto." }
        ]
      },
      exercises: [
        { type: "reading", title: "The limits of multitasking",
          passage: "Many people believe they can do several tasks at once, yet research tends to suggest otherwise. What we call 'multitasking' is often rapid switching between tasks, and each switch carries a small cost in time and accuracy. The effect may seem trivial, but across a working day these costs accumulate.\n\nThis does not mean multitasking is always harmful. For simple, automatic activities, the cost is negligible. The problem arises mainly with tasks that demand sustained attention.",
          questions: [
            { q: "What does the writer say 'multitasking' usually is?", options: ["Doing tasks truly at once", "Rapid switching between tasks", "Avoiding tasks"],
              correctIndex: 1, explanation: "\"often rapid switching between tasks\"." },
            { q: "When is the cost negligible?", options: ["For simple, automatic activities", "For complex tasks", "Never"],
              correctIndex: 0, explanation: "\"For simple, automatic activities, the cost is negligible.\"" },
            { q: "What is the writer's overall tone?", options: ["Absolutely certain", "Cautious and balanced", "Dismissive"],
              correctIndex: 1, explanation: "Usa 'tends to', 'may' → tono cauto y matizado." }
          ] },
        { type: "multiple_choice", question: "\"Costs accumulate\" means they...", options: ["disappear", "add up over time", "stay the same"],
          correctIndex: 1, explanation: "accumulate = acumularse, sumarse." },
        { type: "fill_blank", sentence: "The problem arises with tasks that demand ___ attention. (sostenida)", answers: ["sustained"],
          hint: "sustained.", explanation: "sustained attention = atención sostenida." }
      ]
    },

    /* ==================================================================
     * C2 — maestría
     * ================================================================== */
    "voc-c2-idioms": {
      lessonId: "voc-c2-idioms", level: "C2", track: "Vocabulario", topic: "idioms", skill: "vocab",
      title: "Modismos avanzados", xpReward: 65, mascotState: "explaining",
      nextLessonId: "use-c2-hedging",
      explanation: {
        body: "Los modismos dan naturalidad nativa. to bite the bullet (afrontar algo difícil), to cut corners (hacer las cosas mal por ahorrar), the ball is in your court (te toca a ti decidir), to be on the same page (estar de acuerdo). No se traducen literalmente. (Expresiones idiomáticas.)",
        examples: [
          { en: "Let's bite the bullet and start.", es: "Afrontémoslo y empecemos." },
          { en: "Don't cut corners on safety.", es: "No escatimes en seguridad." },
          { en: "The ball is in your court now.", es: "Ahora te toca a ti decidir." }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Une el modismo con su significado.", pairs: [
          { l: "bite the bullet", r: "afrontar algo difícil" }, { l: "cut corners", r: "hacer mal por ahorrar" }, { l: "on the same page", r: "estar de acuerdo" }, { l: "the ball is in your court", r: "te toca decidir" } ],
          explanation: "Cuatro modismos frecuentes en registro alto." },
        { type: "multiple_choice", question: "If you 'cut corners', you...", options: ["do excellent work", "do something badly to save time/money", "turn left"],
          correctIndex: 1, explanation: "cut corners = hacer chapuzas para ahorrar." },
        { type: "fill_blank", sentence: "We're all on the same ___. (acuerdo)", answers: ["page"],
          hint: "on the same ...", explanation: "on the same page = de acuerdo." },
        { type: "true_false", statement: "'The ball is in your court' means it's your turn to act.", answer: true,
          explanation: "Sí: te toca a ti decidir/actuar." },
        { type: "multiple_choice", question: "'To bite the bullet' means to...", options: ["give up", "face something difficult", "eat quickly"],
          correctIndex: 1, explanation: "Afrontar algo difícil o desagradable." },
        { type: "translate", prompt: "Traduce: \"Ahora te toca a ti decidir.\"",
          answers: ["the ball is in your court now", "the ball is in your court"],
          explanation: "The ball is in your court (now)." }
      ]
    },

    "use-c2-hedging": {
      lessonId: "use-c2-hedging", level: "C2", track: "Uso del inglés", topic: "academic", skill: "use",
      title: "Matización (hedging)", xpReward: 65, mascotState: "explaining",
      nextLessonId: "read-c2-rhetoric",
      explanation: {
        body: "El 'hedging' suaviza afirmaciones para sonar preciso y prudente, clave en escritura académica y profesional. Recursos: may/might, tend to, appear to, it seems that, to some extent, arguably. \"This may suggest...\" es más defendible que \"This proves...\". (Cautela académica.)",
        examples: [
          { en: "This may indicate a wider trend.", es: "Esto podría indicar una tendencia más amplia." },
          { en: "The results appear to support the theory.", es: "Los resultados parecen apoyar la teoría." },
          { en: "Arguably, the policy was a mistake.", es: "Podría argumentarse que la política fue un error." }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "Which sentence is more cautious (hedged)?", options: ["This proves the theory.", "This may support the theory.", "This is the theory."],
          correctIndex: 1, explanation: "'may support' matiza; evita afirmar con rotundidad." },
        { type: "categorize", instruction: "¿Matizado (hedged) o categórico?", buckets: [
          { id: "h", label: "Matizado" }, { id: "c", label: "Categórico" } ], items: [
          { t: "It seems that...", bucket: "h" }, { t: "It is certain that...", bucket: "c" }, { t: "tends to...", bucket: "h" }, { t: "always proves...", bucket: "c" } ] },
        { type: "fill_blank", sentence: "The data ___ to suggest a link. (parece)", answers: ["appears", "appear", "seems", "seem"],
          hint: "appear/seem to suggest.", explanation: "The data appear/seem to suggest a link." },
        { type: "true_false", statement: "Hedging makes claims sound more careful and defensible.", answer: true,
          explanation: "Sí: reduce el riesgo de generalizar en exceso." },
        { type: "multiple_choice", question: "Choose a hedging word.", options: ["definitely", "arguably", "obviously"],
          correctIndex: 1, explanation: "'arguably' matiza; los otros son enfáticos." },
        { type: "translate", prompt: "Traduce (matizado): \"Esto podría indicar una tendencia más amplia.\"",
          answers: ["this may indicate a wider trend", "this might indicate a wider trend"],
          explanation: "This may/might indicate a wider trend." }
      ]
    },

    "read-c2-rhetoric": {
      lessonId: "read-c2-rhetoric", level: "C2", track: "Lectura", topic: "language", skill: "reading",
      title: "Lectura: Tone and rhetoric", xpReward: 65, mascotState: "explaining",
      nextLessonId: "biz-b1-emails",
      explanation: {
        body: "En C2 se lee 'entre líneas': ironía, énfasis y propósito retórico. Fíjate en cómo el autor usa preguntas retóricas y contrastes para persuadir, no solo para informar. (Lectura retórica.)",
        examples: [
          { en: "Is this really progress?", es: "¿Es esto realmente progreso?" },
          { en: "The writer is being ironic.", es: "El autor está siendo irónico." }
        ]
      },
      exercises: [
        { type: "reading", title: "A smarter world?",
          passage: "Our devices promise to make life simpler. We can order dinner, summon a car and answer a hundred messages without leaving the sofa. And yet, have we ever felt busier? Each tool that 'saves' time seems to fill the space it creates with new demands.\n\nNone of this is an argument against technology. It is, rather, an invitation to ask a harder question: not what our tools can do for us, but what we want them to do.",
          questions: [
            { q: "What is the purpose of the question 'have we ever felt busier?'", options: ["To request information", "To make the reader reflect (rhetorical)", "To start a survey"],
              correctIndex: 1, explanation: "Es una pregunta retórica para provocar reflexión." },
            { q: "What is the writer's stance on technology?", options: ["Strongly against it", "Not against it, but questioning how we use it", "Indifferent"],
              correctIndex: 1, explanation: "\"None of this is an argument against technology... an invitation to ask a harder question\"." },
            { q: "The phrase 'tools that save time' uses quotation marks to...", options: ["quote an expert", "signal irony/doubt about 'save'", "mark a title"],
              correctIndex: 1, explanation: "Las comillas marcan ironía/duda sobre el verbo 'save'." }
          ] },
        { type: "multiple_choice", question: "A 'rhetorical question' is asked mainly to...", options: ["get a factual answer", "create an effect or make a point", "test memory"],
          correctIndex: 1, explanation: "Busca efecto/persuasión, no una respuesta literal." },
        { type: "fill_blank", sentence: "The writer's tone is gently ___. (crítico)", answers: ["critical"],
          hint: "critical.", explanation: "El tono es sutilmente crítico." }
      ]
    },

    /* ==================================================================
     * INGLÉS PROFESIONAL (Business) — B1 → C1
     * ================================================================== */
    "biz-b1-emails": {
      lessonId: "biz-b1-emails", level: "B1", track: "Inglés profesional", topic: "business", skill: "use",
      title: "Profesional: Emails de trabajo", xpReward: 55, mascotState: "explaining",
      nextLessonId: "biz-b1-phone",
      explanation: {
        body: "Un email de trabajo eficaz es claro y breve. Apertura: \"Hi [name], I hope you're well.\" Motivo directo: \"I'm writing about...\". Petición cortés: \"Could you please...?\". Cierre: \"Best regards\". Evita textos largos y ambiguos. (Escribir emails profesionales.)",
        examples: [
          { en: "I'm writing to follow up on our meeting.", es: "Escribo para dar seguimiento a nuestra reunión." },
          { en: "Could you please send me the file?", es: "¿Podrías enviarme el archivo, por favor?" },
          { en: "Please find attached the report.", es: "Adjunto encontrará el informe." }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "Polite request in an email:", options: ["Send me the file now.", "Could you please send me the file?", "I want the file."],
          correctIndex: 1, explanation: "'Could you please...?' es cortés y profesional." },
        { type: "fill_blank", sentence: "Please find ___ the report. (adjunto)", answers: ["attached"],
          hint: "find attached.", explanation: "Please find attached = adjunto encontrará." },
        { type: "categorize", instruction: "¿Apertura o cierre de email?", buckets: [
          { id: "o", label: "Apertura" }, { id: "c", label: "Cierre" } ], items: [
          { t: "I hope you're well", bucket: "o" }, { t: "Best regards", bucket: "c" }, { t: "I'm writing about", bucket: "o" }, { t: "Looking forward to your reply", bucket: "c" } ] },
        { type: "true_false", statement: "Long, vague emails are best in business.", answer: false,
          explanation: "No: lo mejor es claro y breve." },
        { type: "multiple_choice", question: "Best subject line for a meeting request?", options: ["Hello", "Meeting request: Friday 10 a.m.", "Important!!!"],
          correctIndex: 1, explanation: "Específico y claro: tema + cuándo." },
        { type: "translate", prompt: "Traduce: \"Escribo para dar seguimiento a nuestra reunión.\"",
          answers: ["i'm writing to follow up on our meeting", "i am writing to follow up on our meeting"],
          explanation: "I'm writing to follow up on our meeting." }
      ]
    },

    "biz-b1-phone": {
      lessonId: "biz-b1-phone", level: "B1", track: "Inglés profesional", topic: "business", skill: "use",
      title: "Profesional: Llamadas telefónicas", xpReward: 55, mascotState: "explaining",
      nextLessonId: "biz-b2-meetings",
      explanation: {
        body: "Al teléfono usamos fórmulas fijas. Presentarte: \"Hello, this is Ana from Sales.\" Preguntar por alguien: \"Could I speak to...?\" Pedir que esperen: \"Hold on, please.\" Tomar un mensaje: \"Can I take a message?\" (Inglés telefónico.)",
        examples: [
          { en: "Hello, this is Ana speaking.", es: "Hola, le habla Ana." },
          { en: "Could I speak to Mr Lee, please?", es: "¿Podría hablar con el Sr. Lee, por favor?" },
          { en: "I'll put you through.", es: "Le paso con él/ella." }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "How do you introduce yourself on the phone?", options: ["I am Ana.", "This is Ana speaking.", "Here Ana."],
          correctIndex: 1, explanation: "Al teléfono: 'This is Ana speaking.'" },
        { type: "matching", instruction: "Une la frase con su función.", pairs: [
          { l: "Hold on, please", r: "pedir esperar" }, { l: "Can I take a message?", r: "tomar un mensaje" }, { l: "I'll put you through", r: "pasar la llamada" }, { l: "Could I speak to...?", r: "preguntar por alguien" } ],
          explanation: "Fórmulas telefónicas estándar." },
        { type: "fill_blank", sentence: "Could I ___ to the manager, please? (hablar)", answers: ["speak"],
          hint: "speak to.", explanation: "Could I speak to...?" },
        { type: "true_false", statement: "'I'll put you through' means you will transfer the call.", answer: true,
          explanation: "Sí: pasar/transferir la llamada." },
        { type: "multiple_choice", question: "The line is busy. You say:", options: ["The line is engaged, can you call back?", "Go away.", "I don't know."],
          correctIndex: 0, explanation: "'engaged/busy' = ocupada; ofreces volver a llamar." },
        { type: "translate", prompt: "Traduce: \"¿Podría hablar con el Sr. Lee, por favor?\"",
          answers: ["could i speak to mr lee, please", "could i speak to mr lee please"],
          explanation: "Could I speak to Mr Lee, please?" }
      ]
    },

    "biz-b2-meetings": {
      lessonId: "biz-b2-meetings", level: "B2", track: "Inglés profesional", topic: "business", skill: "use",
      title: "Profesional: Reuniones", xpReward: 60, mascotState: "explaining",
      nextLessonId: "biz-b2-presentations",
      explanation: {
        body: "En reuniones necesitas funciones claras. Opinar: \"In my opinion... / I think we should...\". Acordar: \"I agree / Good point.\" Discrepar con tacto: \"I see your point, but...\". Interrumpir: \"Sorry to interrupt, but...\". Proponer: \"Why don't we...?\" (Participar en reuniones.)",
        examples: [
          { en: "I see your point, but I'd suggest a different approach.", es: "Entiendo tu punto, pero sugeriría otro enfoque." },
          { en: "Shall we move on to the next item?", es: "¿Pasamos al siguiente punto?" },
          { en: "Let's table that for now.", es: "Dejemos eso para más adelante." }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "Polite way to disagree:", options: ["You're wrong.", "I see your point, but...", "No way."],
          correctIndex: 1, explanation: "'I see your point, but...' discrepa con tacto." },
        { type: "categorize", instruction: "¿De acuerdo o en desacuerdo?", buckets: [
          { id: "a", label: "De acuerdo" }, { id: "d", label: "En desacuerdo" } ], items: [
          { t: "Absolutely.", bucket: "a" }, { t: "I'm not so sure about that.", bucket: "d" }, { t: "Good point.", bucket: "a" }, { t: "I'm afraid I disagree.", bucket: "d" } ] },
        { type: "fill_blank", sentence: "Shall we ___ on to the next item? (pasar)", answers: ["move"],
          hint: "move on.", explanation: "move on to = pasar a." },
        { type: "true_false", statement: "'Sorry to interrupt, but...' is a polite way to break in.", answer: true,
          explanation: "Sí: interrumpe educadamente." },
        { type: "multiple_choice", question: "To suggest an idea you can say:", options: ["Why don't we try X?", "Do it.", "It's impossible."],
          correctIndex: 0, explanation: "'Why don't we...?' propone con suavidad." },
        { type: "translate", prompt: "Traduce: \"¿Pasamos al siguiente punto?\"",
          answers: ["shall we move on to the next item", "shall we move on to the next point"],
          explanation: "Shall we move on to the next item?" }
      ]
    },

    "biz-b2-presentations": {
      lessonId: "biz-b2-presentations", level: "B2", track: "Inglés profesional", topic: "business", skill: "use",
      title: "Profesional: Presentaciones", xpReward: 60, mascotState: "explaining",
      nextLessonId: "biz-c1-negotiation",
      explanation: {
        body: "Una buena presentación se estructura con 'signposting' (señales). Empezar: \"Today I'll talk about...\". Pasar de punto: \"Let's move on to...\". Destacar: \"The key point is...\". Cerrar: \"To sum up...\". Estas frases guían a tu audiencia. (Presentar con claridad.)",
        examples: [
          { en: "First, I'll outline the problem.", es: "Primero, plantearé el problema." },
          { en: "As you can see on this slide...", es: "Como pueden ver en esta diapositiva..." },
          { en: "To sum up, we recommend option B.", es: "En resumen, recomendamos la opción B." }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Une la frase con su momento.", pairs: [
          { l: "Today I'll talk about", r: "introducción" }, { l: "Let's move on to", r: "transición" }, { l: "The key point is", r: "énfasis" }, { l: "To sum up", r: "conclusión" } ],
          explanation: "Frases de 'signposting' por fase." },
        { type: "multiple_choice", question: "Which phrase closes a presentation?", options: ["To sum up,", "First of all,", "By the way,"],
          correctIndex: 0, explanation: "'To sum up' resume y cierra." },
        { type: "fill_blank", sentence: "As you can ___ on this slide, sales rose. (ver)", answers: ["see"],
          hint: "As you can see.", explanation: "As you can see = como pueden ver." },
        { type: "true_false", statement: "Signposting helps the audience follow your structure.", answer: true,
          explanation: "Sí: orienta sobre dónde estás en la charla." },
        { type: "multiple_choice", question: "To invite questions at the end:", options: ["I'm happy to take any questions.", "Stop talking.", "No questions."],
          correctIndex: 0, explanation: "Fórmula cortés para abrir el turno de preguntas." },
        { type: "translate", prompt: "Traduce: \"En resumen, recomendamos la opción B.\"",
          answers: ["to sum up, we recommend option b", "to sum up we recommend option b"],
          explanation: "To sum up, we recommend option B." }
      ]
    },

    "biz-c1-negotiation": {
      lessonId: "biz-c1-negotiation", level: "C1", track: "Inglés profesional", topic: "business", skill: "use",
      title: "Profesional: Negociación", xpReward: 65, mascotState: "explaining",
      explanation: {
        body: "Negociar en inglés exige lenguaje diplomático y condicional. Proponer: \"We'd be willing to... if...\". Condicionar: \"If you could..., we could...\". Resistir con suavidad: \"That might be difficult for us.\" Cerrar: \"I think we have a deal.\" (Negociar con tacto.)",
        examples: [
          { en: "If you can lower the price, we'll order more.", es: "Si bajan el precio, pediremos más." },
          { en: "We'd be willing to compromise on the deadline.", es: "Estaríamos dispuestos a ceder en el plazo." },
          { en: "That's not quite what we had in mind.", es: "No es exactamente lo que teníamos en mente." }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "Most diplomatic way to refuse:", options: ["No.", "That might be difficult for us.", "Never."],
          correctIndex: 1, explanation: "'That might be difficult' rechaza suavemente." },
        { type: "fill_blank", sentence: "If you could deliver earlier, we ___ increase the order. (could)", answers: ["could", "would"],
          hint: "condicional: if + could..., we could/would...", explanation: "We could/would increase the order." },
        { type: "categorize", instruction: "¿Concesión o presión?", buckets: [
          { id: "g", label: "Concesión" }, { id: "p", label: "Presión" } ], items: [
          { t: "We could be flexible on this", bucket: "g" }, { t: "That's our final offer", bucket: "p" }, { t: "We're willing to compromise", bucket: "g" }, { t: "Take it or leave it", bucket: "p" } ] },
        { type: "true_false", statement: "Conditional language ('if... would') is common in negotiations.", answer: true,
          explanation: "Sí: permite ofrecer y pedir a la vez con tacto." },
        { type: "multiple_choice", question: "To confirm an agreement:", options: ["I think we have a deal.", "Maybe later.", "I don't care."],
          correctIndex: 0, explanation: "'I think we have a deal' cierra el acuerdo." },
        { type: "translate", prompt: "Traduce: \"Si bajan el precio, pediremos más.\"",
          answers: ["if you can lower the price, we'll order more", "if you lower the price we will order more", "if you can lower the price we'll order more"],
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
