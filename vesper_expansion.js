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
      lessonId: "gram-a1-plurals", level: "A1", track: "Expresiones", topic: "social", skill: "use", tipo: "aprende", title: "Disculparse: sorry y excuse me", rev: 2, xpReward: 45, mascotState: "explaining",
      nextLessonId: "gram-a1-there-is",
      explanation: {
        body: "Episodio 2 · Sam rompe la taza favorita de Mia. ¡Uy! Aprende a pedir perdón y a responder cuando alguien se disculpa. Sorry = perdón / lo siento (cuando haces algo mal): I'm sorry, I'm so sorry. Excuse me = disculpe / con permiso (para llamar la atención o para pasar): Excuse me, where is the bank? Para responder: That's OK. / No problem. / Don't worry.",
        examples: [
          { en: "Oh no! I'm so sorry, Mia. I broke your mug.", es: "¡Ay, no! Lo siento mucho, Mia. Rompí tu taza." },
          { en: "Don't worry. It's OK.", es: "No te preocupes. Está bien." },
          { en: "I can buy a new one.", es: "Puedo comprar una nueva." },
          { en: "No problem, Sam. Accidents happen!", es: "No pasa nada, Sam. ¡Los accidentes pasan!" }
        ],
        sections: [
          { kind: "intro", body: "Episodio 2 · Sam rompe la taza favorita de Mia. ¡Uy! Aprende a pedir perdón y a responder cuando alguien se disculpa." },
          {
            kind: "regla",
            body: "Sorry = perdón / lo siento (cuando haces algo mal): I'm sorry, I'm so sorry. Excuse me = disculpe / con permiso (para llamar la atención o para pasar): Excuse me, where is the bank? Para responder: That's OK. / No problem. / Don't worry."
          },
          {
            kind: "vocab",
            items: [
              { en: "sorry", ipa: "ˈsɒri", es: "perdón / lo siento" },
              { en: "excuse me", ipa: "ɪkˈskjuːz miː", es: "disculpe / con permiso" },
              { en: "late", ipa: "leɪt", es: "tarde" },
              { en: "break (broke)", ipa: "breɪk", es: "romper (rompí)" },
              { en: "mistake", ipa: "mɪˈsteɪk", es: "error" },
              { en: "accident", ipa: "ˈæksɪdənt", es: "accidente" },
              { en: "mug", ipa: "mʌɡ", es: "taza (grande)" },
              { en: "again", ipa: "əˈɡen", es: "otra vez" }
            ]
          },
          {
            kind: "expresiones",
            items: [
              { en: "I'm so sorry!", es: "¡Lo siento mucho!" },
              { en: "That's OK.", es: "Está bien. / No pasa nada." },
              { en: "Don't worry.", es: "No te preocupes." },
              { en: "Sorry I'm late.", es: "Perdón por llegar tarde." }
            ]
          },
          {
            kind: "ejemplos",
            items: [
              { en: "Sam: Oh no! I'm so sorry, Mia. I broke your mug.", es: "Sam: ¡Ay, no! Lo siento mucho, Mia. Rompí tu taza." },
              { en: "Mia: Don't worry. It's OK.", es: "Mia: No te preocupes. Está bien." },
              { en: "Sam: I can buy a new one.", es: "Sam: Puedo comprar una nueva." },
              { en: "Mia: No problem, Sam. Accidents happen!", es: "Mia: No pasa nada, Sam. ¡Los accidentes pasan!" }
            ]
          },
          {
            kind: "errores",
            items: [
              { no: "Excuse me, I broke your mug.", si: "Sorry, I broke your mug.", pq: "Para pedir perdón por algo malo usa sorry." },
              { no: "I'm sorry for late.", si: "Sorry I'm late.", pq: "Se dice Sorry I'm late." },
              { no: "No worry.", si: "Don't worry.", pq: "La frase correcta es Don't worry." }
            ]
          },
          { kind: "resumen", body: "Sorry: cuando haces algo mal. Excuse me: para llamar la atención o pasar. Respuestas: That's OK. / No problem. / Don't worry." },
          { kind: "puente", body: "Ayuda a Sam a disculparse... ¡y a Mia a responder!" }
        ]
      },
      exercises: [
        {
          type: "categorize", instruction: "¿Qué dices: sorry o excuse me?",
          buckets: [{ id: "sorry", label: "Sorry" }, { id: "excuse", label: "Excuse me" }],
          items: [
            { t: "Rompes un vaso.", bucket: "sorry" },
            { t: "Llegas tarde.", bucket: "sorry" },
            { t: "Pisas a alguien.", bucket: "sorry" },
            { t: "Quieres pasar por una puerta llena de gente.", bucket: "excuse" },
            { t: "Preguntas una dirección a un desconocido.", bucket: "excuse" },
            { t: "Llamas al mesero.", bucket: "excuse" }
          ]
        },
        { type: "listening", text: "Excuse me, is this your bag?", question: "¿Qué pregunta?", options: ["Si la bolsa es suya", "Dónde está el banco", "Qué hora es"], correctIndex: 0 },
        {
          type: "multiple_choice", question: "Tu amigo dice: \"Sorry I'm late.\" Respondes:", options: ["That's OK.", "You're welcome.", "Nice to meet you."], correctIndex: 0,
          explanation: "That's OK = no pasa nada."
        },
        { type: "fill_blank", sentence: "Don't ___. It's OK.", answers: ["worry"], hint: "No te preocupes.", explanation: "Don't worry. It's OK." },
        { type: "word_order", words: ["late", "Sorry", "I'm"], correctOrder: ["Sorry", "I'm", "late"], hint: "Perdón por llegar tarde." },
        { type: "true_false", statement: "\"Excuse me\" sirve para llamar la atención de alguien.", answer: true, explanation: "Sí: Excuse me, where is the station?" },
        { type: "speak", text: "I'm so sorry! I broke your mug.", es: "¡Lo siento mucho! Rompí tu taza." },
        { type: "translate", prompt: "Traduce: \"No te preocupes.\"", answers: ["don't worry", "do not worry"], explanation: "Don't worry." }
      ]
    },

    "gram-a1-there-is": {
      lessonId: "gram-a1-there-is", level: "A1", track: "Expresiones", topic: "social", skill: "use", tipo: "aprende", title: "¿Perdón? Pedir que repitan", rev: 2, xpReward: 45, mascotState: "explaining",
      nextLessonId: "voc-a2-weather",
      explanation: {
        body: "Episodio 3 · La vecina, la señora Park, habla muy rápido y Sam no entiende nada. Aprende a pedir que repitan, que hablen más despacio o que deletreen una palabra. Pide con amabilidad: Sorry? / Can you repeat that, please? / Can you speak more slowly, please? Para una palabra: How do you spell that? / What does \"bin\" mean? Para decir que no entiendes: Sorry, I don't understand.",
        examples: [
          { en: "The bins go out on Tuesday night, OK?", es: "Los botes salen el martes en la noche, ¿vale?" },
          { en: "Sorry, can you speak more slowly, please?", es: "Perdón, ¿puede hablar más despacio, por favor?" },
          { en: "The bins. On Tuesday.", es: "Los botes. El martes." },
          { en: "What does \"bins\" mean?", es: "¿Qué significa \"bins\"?" }
        ],
        sections: [
          { kind: "intro", body: "Episodio 3 · La vecina, la señora Park, habla muy rápido y Sam no entiende nada. Aprende a pedir que repitan, que hablen más despacio o que deletreen una palabra." },
          {
            kind: "regla",
            body: "Pide con amabilidad: Sorry? / Can you repeat that, please? / Can you speak more slowly, please? Para una palabra: How do you spell that? / What does \"bin\" mean? Para decir que no entiendes: Sorry, I don't understand."
          },
          {
            kind: "vocab",
            items: [
              { en: "repeat", ipa: "rɪˈpiːt", es: "repetir" },
              { en: "slowly", ipa: "ˈsləʊli", es: "despacio" },
              { en: "spell", ipa: "spel", es: "deletrear" },
              { en: "mean", ipa: "miːn", es: "significar" },
              { en: "understand", ipa: "ˌʌndəˈstænd", es: "entender" },
              { en: "word", ipa: "wɜːd", es: "palabra" },
              { en: "neighbour", ipa: "ˈneɪbə", es: "vecino/a" },
              { en: "bin", ipa: "bɪn", es: "bote de basura" }
            ]
          },
          {
            kind: "expresiones",
            items: [
              { en: "Sorry, can you repeat that?", es: "Perdón, ¿puede repetirlo?" },
              { en: "Can you speak more slowly, please?", es: "¿Puede hablar más despacio, por favor?" },
              { en: "How do you spell it?", es: "¿Cómo se escribe?" },
              { en: "What does it mean?", es: "¿Qué significa?" }
            ]
          },
          {
            kind: "ejemplos",
            items: [
              { en: "Mrs Park: The bins go out on Tuesday night, OK?", es: "Sra. Park: Los botes salen el martes en la noche, ¿vale?" },
              { en: "Sam: Sorry, can you speak more slowly, please?", es: "Sam: Perdón, ¿puede hablar más despacio, por favor?" },
              { en: "Mrs Park: The bins. On Tuesday.", es: "Sra. Park: Los botes. El martes." },
              { en: "Sam: What does \"bins\" mean?", es: "Sam: ¿Qué significa \"bins\"?" },
              { en: "Mrs Park: Rubbish bins! For the rubbish!", es: "Sra. Park: ¡Los botes de basura! ¡Para la basura!" }
            ]
          },
          {
            kind: "errores",
            items: [
              { no: "Repeat!", si: "Can you repeat that, please?", pq: "Solo \"Repeat!\" suena a orden." },
              { no: "What means \"bin\"?", si: "What does \"bin\" mean?", pq: "La pregunta lleva does + mean." },
              { no: "I don't understand nothing.", si: "Sorry, I don't understand.", pq: "En inglés no se usa doble negación." }
            ]
          },
          { kind: "resumen", body: "Sorry? / Can you repeat that? / Can you speak more slowly? / How do you spell it? / What does ... mean? Siempre con please y tono amable." },
          { kind: "puente", body: "Ayuda a Sam a entender a la señora Park." }
        ]
      },
      exercises: [
        {
          type: "matching", instruction: "Une cada frase con su significado.",
          pairs: [
            { l: "Can you repeat that?", r: "¿Puede repetirlo?" },
            { l: "How do you spell it?", r: "¿Cómo se escribe?" },
            { l: "What does it mean?", r: "¿Qué significa?" },
            { l: "I don't understand.", r: "No entiendo." }
          ]
        },
        { type: "listening", text: "My name is Ngozi. N, G, O, Z, I.", question: "¿Cómo se escribe su nombre?", options: ["Ngozi", "Ngosi", "Nkozi"], correctIndex: 0 },
        {
          type: "find_error",
          segments: [{ u: "What" }, " ", { u: "does" }, " \"bin\" ", { u: "means" }, "?"],
          correctIndex: 2, correction: "mean", explanation: "Después de does, el verbo va sin -s: What does \"bin\" mean?", question: "Encuentra el error"
        },
        {
          type: "multiple_choice", question: "El mesero habla muy rápido y no entiendes. Dices:",
          options: ["Can you speak more slowly, please?", "Can you speak more quickly, please?", "Speak, please!"], correctIndex: 0, explanation: "slowly = despacio."
        },
        { type: "fill_blank", sentence: "Sorry, can you ___ that, please?", answers: ["repeat"], hint: "repetir", explanation: "Can you repeat that, please?" },
        { type: "word_order", words: ["name", "How", "your", "do", "spell", "you"], correctOrder: ["How", "do", "you", "spell", "your", "name"], hint: "¿Cómo se escribe tu nombre?" },
        { type: "speak", text: "Sorry, can you speak more slowly, please?", es: "Perdón, ¿puede hablar más despacio, por favor?" },
        { type: "true_false", statement: "\"What does it mean?\" significa \"¿Qué significa?\".", answer: true, explanation: "mean = significar." }
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
      lessonId: "gram-a2-comparatives", level: "A2", track: "Gramática", topic: "grammar", skill: "grammar", tipo: "aprende", title: "Too y enough", rev: 2, xpReward: 50, mascotState: "explaining",
      nextLessonId: "gram-a2-going-to",
      explanation: {
        body: "Mia y Sam buscan un sofá para el piso. Este es demasiado caro, aquel no es lo bastante grande... Para decir que algo es excesivo o suficiente usas too y enough. too + adjetivo = demasiado (hay un problema): It's too expensive. adjetivo + enough = lo bastante / suficientemente: It's big enough. not + adjetivo + enough: It isn't big enough. Con sustantivos, enough va antes: We have enough money. ¡Cuidado con el orden!",
        examples: [
          { en: "Look at this sofa! — Mia: It's too expensive.", es: "¡Mira este sofá! — Mia: Es demasiado caro." },
          { en: "And this one? — Mia: It isn't big enough for three people.", es: "¿Y este? — Mia: No es lo bastante grande para tres personas." },
          { en: "This one is cheap and comfortable.", es: "Este es barato y cómodo." },
          { en: "Perfect! But do we have enough space?", es: "¡Perfecto! Pero, ¿tenemos suficiente espacio?" }
        ],
        sections: [
          { kind: "intro", body: "Mia y Sam buscan un sofá para el piso. Este es demasiado caro, aquel no es lo bastante grande... Para decir que algo es excesivo o suficiente usas too y enough." },
          {
            kind: "regla",
            body: "too + adjetivo = demasiado (hay un problema): It's too expensive. adjetivo + enough = lo bastante / suficientemente: It's big enough. not + adjetivo + enough: It isn't big enough. Con sustantivos, enough va antes: We have enough money. ¡Cuidado con el orden!"
          },
          {
            kind: "vocab",
            items: [
              { en: "too", ipa: "tuː", es: "demasiado" },
              { en: "enough", ipa: "ɪˈnʌf", es: "suficiente / lo bastante" },
              { en: "expensive", ipa: "ɪkˈspensɪv", es: "caro" },
              { en: "cheap", ipa: "tʃiːp", es: "barato" },
              { en: "big", ipa: "bɪɡ", es: "grande" },
              { en: "small", ipa: "smɔːl", es: "pequeño" },
              { en: "comfortable", ipa: "ˈkʌmftəbəl", es: "cómodo" },
              { en: "space", ipa: "speɪs", es: "espacio" }
            ]
          },
          {
            kind: "expresiones",
            items: [
              { en: "It's too expensive for me.", es: "Es demasiado caro para mí." },
              { en: "Is it big enough?", es: "¿Es lo bastante grande?" },
              { en: "We don't have enough space.", es: "No tenemos suficiente espacio." },
              { en: "That's perfect!", es: "¡Es perfecto!" }
            ]
          },
          {
            kind: "ejemplos",
            items: [
              { en: "Sam: Look at this sofa! — Mia: It's too expensive.", es: "Sam: ¡Mira este sofá! — Mia: Es demasiado caro." },
              { en: "Sam: And this one? — Mia: It isn't big enough for three people.", es: "Sam: ¿Y este? — Mia: No es lo bastante grande para tres personas." },
              { en: "Sam: This one is cheap and comfortable.", es: "Sam: Este es barato y cómodo." },
              { en: "Mia: Perfect! But do we have enough space?", es: "Mia: ¡Perfecto! Pero, ¿tenemos suficiente espacio?" }
            ]
          },
          {
            kind: "errores",
            items: [
              { no: "It's enough big.", si: "It's big enough.", pq: "enough va después del adjetivo." },
              { no: "It's too much expensive.", si: "It's too expensive.", pq: "Con adjetivos se usa solo too." },
              { no: "We don't have money enough.", si: "We don't have enough money.", pq: "enough va antes del sustantivo." }
            ]
          },
          { kind: "resumen", body: "too + adjetivo (demasiado). adjetivo + enough (lo bastante). enough + sustantivo (suficiente). Not ... enough = no lo bastante." },
          { kind: "puente", body: "Ayuda a Mia y Sam a elegir su sofá." }
        ]
      },
      exercises: [
        {
          type: "multiple_choice", question: "I can't buy it. It's ___.", options: ["too expensive", "expensive enough", "enough expensive"], correctIndex: 0,
          explanation: "Hay un problema (el precio): too expensive."
        },
        { type: "fill_blank", sentence: "I can't reach the top shelf. I'm not tall ___.", answers: ["enough"], hint: "adjetivo + ___", explanation: "I'm not tall enough." },
        {
          type: "find_error",
          segments: ["This room ", { u: "is" }, " ", { u: "enough big" }, " ", { u: "for" }, " two beds."],
          correctIndex: 1, correction: "big enough", explanation: "enough va después del adjetivo: big enough.", question: "Encuentra el error"
        },
        {
          type: "listening", text: "These shoes are too small. Do you have a bigger size?", question: "¿Cuál es el problema?", options: ["Los zapatos son muy pequeños", "Son muy caros", "No le gusta el color"],
          correctIndex: 0
        },
        {
          type: "categorize", instruction: "¿Hay un problema o está bien?",
          buckets: [{ id: "problem", label: "Hay un problema" }, { id: "ok", label: "Está bien" }],
          items: [
            { t: "too hot", bucket: "problem" },
            { t: "too late", bucket: "problem" },
            { t: "not big enough", bucket: "problem" },
            { t: "warm enough", bucket: "ok" },
            { t: "big enough", bucket: "ok" },
            { t: "cheap enough", bucket: "ok" }
          ]
        },
        { type: "word_order", words: ["chairs", "We", "enough", "don't", "have"], correctOrder: ["We", "don't", "have", "enough", "chairs"], hint: "enough + sustantivo" },
        {
          type: "matching", instruction: "Une cada adjetivo con su opuesto.",
          pairs: [{ l: "expensive", r: "cheap" }, { l: "big", r: "small" }, { l: "heavy", r: "light" }, { l: "comfortable", r: "uncomfortable" }]
        },
        { type: "translate", prompt: "Traduce: \"Es demasiado caro.\"", answers: ["it's too expensive", "it is too expensive"], explanation: "It's too expensive." }
      ]
    },

    "gram-a2-going-to": {
      lessonId: "gram-a2-going-to", level: "A2", track: "Gramática", topic: "grammar", skill: "grammar", tipo: "aprende", title: "Pasado continuo: ¿qué estabas haciendo?", rev: 2, xpReward: 50,
      mascotState: "explaining", nextLessonId: "read-a2-invitation",
      explanation: {
        body: "¿Qué estabas haciendo anoche a las ocho? Para describir una acción que estaba en progreso en un momento del pasado usas el pasado continuo. was / were + verbo-ing. I / he / she / it was working; you / we / they were working. Negativo: wasn't / weren't. Pregunta: What were you doing? Se usa mucho con at + hora (At 8 p.m. I was watching TV) y para describir una escena.",
        examples: [
          { en: "What were you doing at midnight? It was very noisy!", es: "¿Qué estaban haciendo a medianoche? ¡Había mucho ruido!" },
          { en: "Sorry! I was playing the guitar.", es: "¡Perdón! Estaba tocando la guitarra." },
          { en: "I wasn't at home. I was working at the hospital.", es: "Yo no estaba en casa. Estaba trabajando en el hospital." },
          { en: "Well, I was trying to sleep!", es: "¡Pues yo estaba intentando dormir!" }
        ],
        sections: [
          { kind: "intro", body: "¿Qué estabas haciendo anoche a las ocho? Para describir una acción que estaba en progreso en un momento del pasado usas el pasado continuo." },
          {
            kind: "regla",
            body: "was / were + verbo-ing. I / he / she / it was working; you / we / they were working. Negativo: wasn't / weren't. Pregunta: What were you doing? Se usa mucho con at + hora (At 8 p.m. I was watching TV) y para describir una escena."
          },
          {
            kind: "vocab",
            items: [
              { en: "was", ipa: "wɒz", es: "estaba (I, he, she, it)" },
              { en: "were", ipa: "wɜː", es: "estaba(n) (you, we, they)" },
              { en: "wasn't", ipa: "ˈwɒzənt", es: "no estaba" },
              { en: "weren't", ipa: "wɜːnt", es: "no estaban" },
              { en: "at that time", ipa: "æt ðæt taɪm", es: "en ese momento" },
              { en: "last night", ipa: "lɑːst naɪt", es: "anoche" },
              { en: "midnight", ipa: "ˈmɪdnaɪt", es: "medianoche" },
              { en: "noisy", ipa: "ˈnɔɪzi", es: "ruidoso" }
            ]
          },
          {
            kind: "expresiones",
            items: [
              { en: "What were you doing?", es: "¿Qué estabas haciendo?" },
              { en: "I was just...", es: "Solo estaba..." },
              { en: "At that time, I was...", es: "En ese momento, yo estaba..." },
              { en: "Sorry, I was sleeping.", es: "Perdón, estaba durmiendo." }
            ]
          },
          {
            kind: "ejemplos",
            items: [
              { en: "Mrs Park: What were you doing at midnight? It was very noisy!", es: "Sra. Park: ¿Qué estaban haciendo a medianoche? ¡Había mucho ruido!" },
              { en: "Sam: Sorry! I was playing the guitar.", es: "Sam: ¡Perdón! Estaba tocando la guitarra." },
              { en: "Mia: I wasn't at home. I was working at the hospital.", es: "Mia: Yo no estaba en casa. Estaba trabajando en el hospital." },
              { en: "Mrs Park: Well, I was trying to sleep!", es: "Sra. Park: ¡Pues yo estaba intentando dormir!" }
            ]
          },
          {
            kind: "errores",
            items: [
              { no: "I was watch TV.", si: "I was watching TV.", pq: "was / were + verbo-ing." },
              { no: "They was sleeping.", si: "They were sleeping.", pq: "you / we / they usan were." },
              { no: "What you were doing?", si: "What were you doing?", pq: "En preguntas, were va antes del sujeto." }
            ]
          },
          { kind: "resumen", body: "was / were + -ing = acción en progreso en el pasado. I / he / she / it → was. you / we / they → were. Pregunta: What were you doing?" },
          { kind: "puente", body: "¿Qué estaba haciendo cada uno? Practica." }
        ]
      },
      exercises: [
        { type: "fill_blank", sentence: "At 8 p.m. I ___ watching TV.", answers: ["was"], hint: "I → was / were", explanation: "I was watching TV." },
        { type: "multiple_choice", question: "What ___ you doing at midnight?", options: ["were", "was", "did"], correctIndex: 0, explanation: "you → were: What were you doing?" },
        {
          type: "find_error",
          segments: ["We ", { u: "was" }, " ", { u: "having" }, " dinner ", { u: "at" }, " nine."],
          correctIndex: 0, correction: "were", explanation: "Con we se usa were: We were having dinner.", question: "Encuentra el error"
        },
        {
          type: "listening", text: "Yesterday at five, I was cooking and my sister was doing her homework.", question: "¿Qué hacía la hermana?", options: ["Hacía su tarea", "Cocinaba", "Dormía"],
          correctIndex: 0
        },
        { type: "word_order", words: ["guitar", "Sam", "the", "was", "playing"], correctOrder: ["Sam", "was", "playing", "the", "guitar"], hint: "was + -ing" },
        {
          type: "categorize", instruction: "¿Was o were?",
          buckets: [{ id: "was", label: "was" }, { id: "were", label: "were" }],
          items: [{ t: "I", bucket: "was" }, { t: "she", bucket: "was" }, { t: "the dog", bucket: "was" }, { t: "we", bucket: "were" }, { t: "they", bucket: "were" }, { t: "you", bucket: "were" }]
        },
        { type: "true_false", statement: "\"I was sleeping\" significa \"estaba durmiendo\".", answer: true, explanation: "was + sleeping = estaba durmiendo." },
        { type: "translate", prompt: "Traduce: \"¿Qué estabas haciendo?\"", answers: ["what were you doing", "what were you up to"], explanation: "What were you doing?" }
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
      lessonId: "gram-b1-passive", level: "B1", track: "Grammar", topic: "grammar", skill: "grammar", tipo: "aprende", title: "Might, may, could: guessing about the present", rev: 2, xpReward: 55,
      mascotState: "explaining", nextLessonId: "gram-b1-relative",
      explanation: {
        body: "It's 9:30 and Daniel isn't at the office yet. Where is he? When we aren't sure about something in the present, we use might, may or could to speculate. might / may / could + base verb = it's possible: He might be in traffic. She may be ill. It could be the printer. Negative guess: might not / may not (NOT couldn't, which means 'impossible'): He might not know. For actions in progress: might + be + -ing: He might be sleeping. If you're sure, use must (sure it's true) or can't (sure it's false).",
        examples: [
          { en: "It's 9:30. Where's Daniel?" },
          { en: "He might be stuck in traffic. There's a train strike today." },
          { en: "Or he may be ill. He looked tired yesterday." },
          { en: "He could be working from home. Let me check the team chat." }
        ],
        sections: [
          { kind: "intro", body: "It's 9:30 and Daniel isn't at the office yet. Where is he? When we aren't sure about something in the present, we use might, may or could to speculate." },
          {
            kind: "regla",
            body: "might / may / could + base verb = it's possible: He might be in traffic. She may be ill. It could be the printer. Negative guess: might not / may not (NOT couldn't, which means 'impossible'): He might not know. For actions in progress: might + be + -ing: He might be sleeping. If you're sure, use must (sure it's true) or can't (sure it's false)."
          },
          {
            kind: "vocab",
            items: [
              { en: "might", ipa: "maɪt", es: "possibly (we are not sure)" },
              { en: "may", ipa: "meɪ", es: "possibly (a little more formal)" },
              { en: "could", ipa: "kʊd", es: "it is one possibility" },
              { en: "maybe / perhaps", ipa: "ˈmeɪbi / pəˈhæps", es: "possibly (adverb, often at the start)" },
              { en: "probably", ipa: "ˈprɒbəbli", es: "very likely" },
              { en: "stuck in traffic", es: "unable to move because of heavy traffic" },
              { en: "run late", es: "be later than planned" },
              { en: "I bet", es: "I'm fairly sure (informal)" }
            ]
          },
          {
            kind: "expresiones",
            items: [
              { en: "He might be stuck in traffic.", es: "a possible explanation" },
              { en: "I'm not sure, but...", es: "introduce a guess" },
              { en: "It could be...", es: "suggest one possibility" },
              { en: "I bet he's...", es: "an informal, confident guess" }
            ]
          },
          {
            kind: "ejemplos",
            items: [
              { en: "Priya: It's 9:30. Where's Daniel?" },
              { en: "Tom: He might be stuck in traffic. There's a train strike today." },
              { en: "Carmen: Or he may be ill. He looked tired yesterday." },
              { en: "Priya: He could be working from home. Let me check the team chat." }
            ]
          },
          {
            kind: "errores",
            items: [
              { no: "He might is late.", si: "He might be late.", pq: "might + base verb (be), never is." },
              { no: "He maybe is in a meeting.", si: "Maybe he's in a meeting. / He may be in a meeting.", pq: "maybe (one word) is an adverb; may be (two words) is a verb." },
              { no: "He couldn't know. (= possibly he doesn't know)", si: "He might not know.", pq: "couldn't means it's impossible; for a negative guess use might not / may not." }
            ]
          },
          { kind: "resumen", body: "might / may / could + base verb for guesses about now. might not / may not for negative guesses. must = sure it's true; can't = sure it's false." },
          { kind: "puente", body: "Help the team work out where Daniel is." }
        ]
      },
      exercises: [
        {
          type: "multiple_choice", question: "Daniel isn't answering his phone. He ___ be in a meeting.", options: ["might", "maybe", "can"], correctIndex: 0,
          explanation: "might + base verb for a present guess. Maybe is an adverb, so 'He maybe be' is wrong."
        },
        {
          type: "categorize", instruction: "How sure is the speaker?",
          buckets: [{ id: "sure", label: "Sure" }, { id: "possible", label: "Only possible" }],
          items: [
            { t: "She must be at home. Her car is outside.", bucket: "sure" },
            { t: "That can't be Tom. He's in Madrid.", bucket: "sure" },
            { t: "It's definitely the printer.", bucket: "sure" },
            { t: "She might be at home.", bucket: "possible" },
            { t: "It could be the printer.", bucket: "possible" },
            { t: "He may not know yet.", bucket: "possible" }
          ]
        },
        {
          type: "find_error",
          segments: ["Where's Priya? She ", { u: "might" }, " ", { u: "is" }, " in ", { u: "the" }, " kitchen."],
          correctIndex: 1, correction: "be", explanation: "After might, use the base verb: She might be in the kitchen.", question: "Find the mistake"
        },
        { type: "fill_blank", sentence: "Take an umbrella. It ___ rain later.", answers: ["might", "may", "could"], hint: "A possibility, not a certainty.", explanation: "might / may / could all work here." },
        {
          type: "listening", text: "I'm not sure where the keys are. They might be in the car.", question: "Where are the keys?", options: ["Possibly in the car", "Definitely in the car", "Not in the car"],
          correctIndex: 0
        },
        { type: "word_order", words: ["home", "He", "from", "might", "working", "be"], correctOrder: ["He", "might", "be", "working", "from", "home"], hint: "might + be + -ing" },
        { type: "true_false", statement: "\"Maybe\" and \"may be\" are used in the same way.", answer: false, explanation: "Maybe is an adverb (Maybe he's ill). May be is modal + verb (He may be ill)." },
        { type: "translate", prompt: "Rewrite using MIGHT: \"Perhaps she is at the gym.\"", answers: ["she might be at the gym", "she might be in the gym"], explanation: "She might be at the gym." }
      ]
    },

    "gram-b1-relative": {
      lessonId: "gram-b1-relative", level: "B1", track: "Grammar", topic: "grammar", skill: "grammar", tipo: "aprende", title: "Indirect questions: Could you tell me...?", rev: 2, xpReward: 55,
      mascotState: "explaining", nextLessonId: "use-b1-collocations",
      explanation: {
        body: "On her first day, Carmen needs a lot of information. Instead of asking \"Where is the meeting room?\", she asks \"Could you tell me where the meeting room is?\" Indirect questions sound more polite, especially with people you don't know well. Start with a polite phrase: Could you tell me... / Do you know... / I was wondering... Then use statement word order (subject + verb) and no do / does / did: Where is the printer? → Could you tell me where the printer is? What time does it start? → Do you know what time it starts? For yes/no questions, use if or whether: Is he in? → Do you know if he's in?",
        examples: [
          { en: "Sorry to bother you, but could you tell me where the meeting room is?" },
          { en: "Of course. It's on the second floor, on the left." },
          { en: "And do you know if Priya is in today?" },
          { en: "I was also wondering when my badge will be ready." }
        ],
        sections: [
          {
            kind: "intro",
            body: "On her first day, Carmen needs a lot of information. Instead of asking \"Where is the meeting room?\", she asks \"Could you tell me where the meeting room is?\" Indirect questions sound more polite, especially with people you don't know well."
          },
          {
            kind: "regla",
            body: "Start with a polite phrase: Could you tell me... / Do you know... / I was wondering... Then use statement word order (subject + verb) and no do / does / did: Where is the printer? → Could you tell me where the printer is? What time does it start? → Do you know what time it starts? For yes/no questions, use if or whether: Is he in? → Do you know if he's in?"
          },
          {
            kind: "vocab",
            items: [
              { en: "indirect question", es: "a polite question inside another phrase" },
              { en: "wonder", ipa: "ˈwʌndə", es: "want to know something" },
              { en: "whether", ipa: "ˈweðə", es: "if (introduces two possibilities)" },
              { en: "polite", ipa: "pəˈlaɪt", es: "showing good manners" },
              { en: "direct", ipa: "daɪˈrekt", es: "going straight to the point" },
              { en: "reception", ipa: "rɪˈsepʃən", es: "the front desk of a building" },
              { en: "extension", ipa: "ɪkˈstenʃən", es: "an internal phone number in an office" },
              { en: "badge", ipa: "bædʒ", es: "a card that shows who you are and lets you in" }
            ]
          },
          {
            kind: "expresiones",
            items: [
              { en: "Could you tell me where...?", es: "a polite request for information" },
              { en: "Do you know if...?", es: "ask a yes/no question politely" },
              { en: "I was wondering whether...", es: "very polite, slightly formal" },
              { en: "Sorry to bother you, but...", es: "a polite opener before a question" }
            ]
          },
          {
            kind: "ejemplos",
            items: [
              { en: "Carmen: Sorry to bother you, but could you tell me where the meeting room is?" },
              { en: "Receptionist: Of course. It's on the second floor, on the left." },
              { en: "Carmen: And do you know if Priya is in today?" },
              { en: "Carmen: I was also wondering when my badge will be ready." }
            ]
          },
          {
            kind: "errores",
            items: [
              { no: "Could you tell me where is the station?", si: "Could you tell me where the station is?", pq: "In indirect questions, the verb goes after the subject." },
              { no: "Do you know what time does it start?", si: "Do you know what time it starts?", pq: "Don't use do / does / did in the indirect part." },
              { no: "Do you know is he here?", si: "Do you know if he's here?", pq: "Yes/no questions need if or whether." }
            ]
          },
          { kind: "resumen", body: "Polite opener + question word (or if / whether) + subject + verb. No do / does / did and no inversion: Do you know where she lives?" },
          { kind: "puente", body: "Help Carmen find her way around on her first day." }
        ]
      },
      exercises: [
        {
          type: "word_order", words: ["is", "Could", "lift", "you", "the", "tell", "where", "me"], correctOrder: ["Could", "you", "tell", "me", "where", "the", "lift", "is"],
          hint: "Statement word order after 'where'."
        },
        {
          type: "multiple_choice", question: "Do you know ___?",
          options: ["what time the train leaves", "what time does the train leave", "what time leaves the train"], correctIndex: 0, explanation: "Statement order, no does: what time the train leaves."
        },
        {
          type: "find_error",
          segments: ["Could you ", { u: "tell" }, " me ", { u: "where" }, " ", { u: "is the station" }, "?"],
          correctIndex: 2, correction: "the station is", explanation: "Subject before verb: where the station is.", question: "Find the mistake"
        },
        { type: "fill_blank", sentence: "Do you know ___ the shop is open on Sundays?", answers: ["if", "whether"], hint: "A yes/no question.", explanation: "if / whether introduce yes/no questions." },
        {
          type: "listening", text: "Excuse me, could you tell me how much this jacket costs?", question: "What does the customer want to know?",
          options: ["The price of a jacket", "Where the jackets are", "If the shop is open"], correctIndex: 0
        },
        {
          type: "categorize", instruction: "Direct or indirect question?",
          buckets: [{ id: "direct", label: "Direct" }, { id: "indirect", label: "Indirect" }],
          items: [
            { t: "Where is reception?", bucket: "direct" },
            { t: "What time does it start?", bucket: "direct" },
            { t: "Is Priya in?", bucket: "direct" },
            { t: "Do you know where reception is?", bucket: "indirect" },
            { t: "Could you tell me what time it starts?", bucket: "indirect" },
            { t: "I was wondering if Priya is in.", bucket: "indirect" }
          ]
        },
        { type: "speak", text: "Sorry to bother you, but could you tell me where the meeting room is?" },
        {
          type: "translate", prompt: "Make it indirect, starting with \"Do you know\": \"Where does Daniel sit?\"", answers: ["do you know where daniel sits", "do you know where daniel's desk is"],
          explanation: "Do you know where Daniel sits?"
        }
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
          hint: "look forward to + -ing.", explanation: "I look forward to hearing from you." },
        {
          type: "multiple_choice", question: "In the email, \"in advance\" means...", options: ["before the date", "after the date", "on the same day"], correctIndex: 0,
          explanation: "in advance = before something happens."
        },
        { type: "true_false", statement: "Guests have to pay extra for breakfast.", answer: false, explanation: "\"Breakfast is included.\"" },
        {
          type: "find_error",
          segments: ["I am ", { u: "writing" }, " to ", { u: "confirming" }, " ", { u: "your" }, " reservation."],
          correctIndex: 1, correction: "confirm", explanation: "to + base verb: I am writing to confirm...", question: "Find the mistake"
        }
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
      lessonId: "gram-b2-reported", level: "B2", track: "Functional English", topic: "customer", skill: "use", tipo: "aprende", title: "Handling formal complaints", rev: 2, xpReward: 60,
      mascotState: "explaining", nextLessonId: "use-b2-markers",
      explanation: {
        body: "Episode 5 · Carmen has been promoted to customer experience lead. Her first task: an angry email from a customer whose boat tour was cancelled without warning. Learn the language of formal complaints and how to respond professionally. A formal complaint: state the problem and the facts (I am writing to complain about...), describe the impact (As a result, ...), and request action (I would appreciate a full refund). A professional reply has four steps: thank and apologise (Thank you for bringing this to our attention. We sincerely apologise...), show you understand, explain what happened without making excuses, and offer a concrete solution (As a goodwill gesture, we would like to offer...).",
        examples: [
          { en: "I am writing to complain about the boat tour I booked for 12 June." },
          { en: "The tour was cancelled without any warning, which I find unacceptable." },
          { en: "Thank you for bringing this to our attention, and please accept our sincere apologies." },
          { en: "As a goodwill gesture, we would like to offer you a full refund and a 20% discount on your next booking." }
        ],
        sections: [
          {
            kind: "intro",
            body: "Episode 5 · Carmen has been promoted to customer experience lead. Her first task: an angry email from a customer whose boat tour was cancelled without warning. Learn the language of formal complaints and how to respond professionally."
          },
          {
            kind: "regla",
            body: "A formal complaint: state the problem and the facts (I am writing to complain about...), describe the impact (As a result, ...), and request action (I would appreciate a full refund). A professional reply has four steps: thank and apologise (Thank you for bringing this to our attention. We sincerely apologise...), show you understand, explain what happened without making excuses, and offer a concrete solution (As a goodwill gesture, we would like to offer...)."
          },
          {
            kind: "vocab",
            items: [
              { en: "complain about", es: "say formally that something is wrong" },
              { en: "compensation", ipa: "ˌkɒmpənˈseɪʃən", es: "something given to make up for a problem" },
              { en: "unacceptable", ipa: "ˌʌnəkˈseptəbəl", es: "too bad to be allowed" },
              { en: "appreciate", ipa: "əˈpriːʃieɪt", es: "be grateful for" },
              { en: "resolve", ipa: "rɪˈzɒlv", es: "find a solution to a problem" },
              { en: "goodwill gesture", es: "something offered to show good intentions, not because you must" },
              { en: "escalate", ipa: "ˈeskəleɪt", es: "pass a problem to a higher level of authority" },
              { en: "acknowledge", ipa: "əkˈnɒlɪdʒ", es: "accept that something is true or has happened" }
            ]
          },
          {
            kind: "expresiones",
            items: [
              { en: "I am writing to complain about...", es: "open a formal complaint" },
              { en: "I would appreciate it if you could...", es: "make a formal request" },
              { en: "Thank you for bringing this to our attention.", es: "a professional opening to a reply" },
              { en: "As a goodwill gesture, we would like to offer...", es: "offer compensation" }
            ]
          },
          {
            kind: "ejemplos",
            items: [
              { en: "Customer: I am writing to complain about the boat tour I booked for 12 June." },
              { en: "Customer: The tour was cancelled without any warning, which I find unacceptable." },
              { en: "Carmen: Thank you for bringing this to our attention, and please accept our sincere apologies." },
              { en: "Carmen: As a goodwill gesture, we would like to offer you a full refund and a 20% discount on your next booking." }
            ]
          },
          {
            kind: "errores",
            items: [
              { no: "I write to complain about...", si: "I am writing to complain about...", pq: "This fixed formal opening uses the present continuous." },
              { no: "We apologise for the inconvenient.", si: "We apologise for the inconvenience.", pq: "inconvenience is the noun." },
              { no: "I would appreciate if you could reply.", si: "I would appreciate it if you could reply.", pq: "appreciate needs the object 'it' here." }
            ]
          },
          { kind: "resumen", body: "Complaint: problem + impact + request. Reply: thank + apologise → show understanding → explain (no excuses) → concrete solution." },
          { kind: "puente", body: "Help Carmen deal with her first formal complaint." }
        ]
      },
      exercises: [
        {
          type: "reading", title: "A complaint",
          passage: "Dear Lumen Travel,\n\nI am writing to complain about the boat tour I booked through your app for 12 June. When my family and I arrived at the harbour, we were told that the tour had been cancelled the day before. Nobody had informed us.\n\nAs a result, we lost a whole morning of our holiday and had to pay for a taxi back to the hotel. I find this completely unacceptable.\n\nI would appreciate it if you could refund the full cost of the tour and the taxi. I look forward to your reply.\n\nYours faithfully,\nHelen Marsh",
          questions: [
            {
              q: "What is Helen's main complaint?",
              options: ["Nobody told her the tour was cancelled.", "The tour was too expensive.", "The boat was dirty."], correctIndex: 0,
              explanation: "...the tour had been cancelled the day before. Nobody had informed us."
            },
            {
              q: "What does she ask for?",
              options: ["A refund for the tour and the taxi", "A new tour on another day", "An apology from the boat captain"], correctIndex: 0, explanation: "...refund the full cost of the tour and the taxi."
            },
            {
              q: "What is the tone of the email?", options: ["Formal and firm", "Friendly and relaxed", "Rude and aggressive"], correctIndex: 0,
              explanation: "Formal phrases (I am writing to..., Yours faithfully) and a clear demand."
            }
          ]
        },
        {
          type: "categorize", instruction: "Which part of a professional reply is it?",
          buckets: [{ id: "apol", label: "Apology" }, { id: "expl", label: "Explanation" }, { id: "sol", label: "Solution" }],
          items: [
            { t: "Please accept our sincere apologies.", bucket: "apol" },
            { t: "We are very sorry for the trouble this caused.", bucket: "apol" },
            { t: "The tour was cancelled due to high winds.", bucket: "expl" },
            { t: "Unfortunately, our partner did not update the booking system.", bucket: "expl" },
            { t: "We will refund the full amount within five days.", bucket: "sol" },
            { t: "As a goodwill gesture, we would like to offer you a discount.", bucket: "sol" }
          ]
        },
        {
          type: "multiple_choice", question: "Which is the most appropriate opening for a reply to a complaint?",
          options: ["Thank you for bringing this to our attention.", "Calm down, it wasn't our fault.", "Hi Helen! Sorry, these things happen."], correctIndex: 0,
          explanation: "Professional, polite and neutral."
        },
        {
          type: "matching", instruction: "Match each word with its meaning.",
          pairs: [
            { l: "compensation", r: "something given to make up for a problem" },
            { l: "escalate", r: "pass a problem to a higher authority" },
            { l: "resolve", r: "find a solution to a problem" },
            { l: "acknowledge", r: "accept that something has happened" },
            { l: "unacceptable", r: "too bad to be allowed" }
          ]
        },
        {
          type: "find_error",
          segments: ["I would ", { u: "appreciate" }, " ", { u: "if" }, " you could ", { u: "reply" }, " by Friday."],
          correctIndex: 1, correction: "it if", explanation: "appreciate it if...: I would appreciate it if you could reply by Friday.", question: "Find the mistake"
        },
        { type: "fill_blank", sentence: "I am ___ to complain about the service I received on Monday.", answers: ["writing"], hint: "A fixed formal opening.", explanation: "I am writing to complain about..." },
        { type: "speak", text: "Thank you for bringing this to our attention. Please accept our sincere apologies." },
        {
          type: "translate",
          prompt: "Make this formal, starting with \"I would appreciate it\": \"Give me my money back.\"",
          answers: ["i would appreciate it if you could give me my money back", "i would appreciate it if you could refund my money", "i would appreciate it if you could give me a refund", "i would appreciate it if you could refund me"],
          explanation: "I would appreciate it if you could give me a refund."
        }
      ]
    },

    "use-b2-markers": {
      lessonId: "use-b2-markers", level: "B2", track: "Functional English", topic: "work", skill: "use", tipo: "aprende", title: "Disagreeing diplomatically", rev: 2, xpReward: 55, mascotState: "explaining",
      nextLessonId: "voc-b2-work",
      explanation: {
        body: "Episode 6 · Lumen Travel's CEO wants to launch the new app in two weeks. Carmen and Daniel think it's too soon, but how do you disagree with your boss's boss? Learn to disagree diplomatically: soften, give reasons and suggest alternatives. Soften the disagreement: I'm not sure I agree... / I take your point, but... / I can see why you'd say that; however, ... Use tentative language: might, could, perhaps, a bit (It might be a bit risky). Focus on facts, not people: The data suggests... (not 'You're wrong'). Offer an alternative: Would it be possible to...? / What if we...? Show respect even when you disagree: That's an interesting idea, but...",
        examples: [
          { en: "I want the app in the stores in two weeks." },
          { en: "I take your point; speed matters. However, I have some reservations about the timing." },
          { en: "The latest tests suggest there are still a few serious bugs. Launching now might be a bit risky." },
          { en: "Would it be possible to launch a beta version first and the full version in a month?" }
        ],
        sections: [
          {
            kind: "intro",
            body: "Episode 6 · Lumen Travel's CEO wants to launch the new app in two weeks. Carmen and Daniel think it's too soon, but how do you disagree with your boss's boss? Learn to disagree diplomatically: soften, give reasons and suggest alternatives."
          },
          {
            kind: "regla",
            body: "Soften the disagreement: I'm not sure I agree... / I take your point, but... / I can see why you'd say that; however, ... Use tentative language: might, could, perhaps, a bit (It might be a bit risky). Focus on facts, not people: The data suggests... (not 'You're wrong'). Offer an alternative: Would it be possible to...? / What if we...? Show respect even when you disagree: That's an interesting idea, but..."
          },
          {
            kind: "vocab",
            items: [
              { en: "diplomatic", ipa: "ˌdɪpləˈmætɪk", es: "careful to avoid upsetting people" },
              { en: "tentative", ipa: "ˈtentətɪv", es: "not certain or forceful" },
              { en: "reservation", ipa: "ˌrezəˈveɪʃən", es: "a doubt about a plan" },
              { en: "concern", ipa: "kənˈsɜːn", es: "a worry" },
              { en: "alternative", ipa: "ɔːlˈtɜːnətɪv", es: "another possible choice" },
              { en: "risky", ipa: "ˈrɪski", es: "involving a possibility of danger or failure" },
              { en: "take someone's point", es: "accept that someone has a good argument" },
              { en: "push back", es: "resist a plan or idea (informal, business)" }
            ]
          },
          {
            kind: "expresiones",
            items: [
              { en: "I take your point, but...", es: "accept the argument, then disagree" },
              { en: "I have some reservations about...", es: "express doubt formally" },
              { en: "Would it be possible to...?", es: "suggest an alternative politely" },
              { en: "I'm not sure that's the best approach.", es: "soft disagreement" }
            ]
          },
          {
            kind: "ejemplos",
            items: [
              { en: "CEO: I want the app in the stores in two weeks." },
              { en: "Carmen: I take your point; speed matters. However, I have some reservations about the timing." },
              { en: "Daniel: The latest tests suggest there are still a few serious bugs. Launching now might be a bit risky." },
              { en: "Carmen: Would it be possible to launch a beta version first and the full version in a month?" }
            ]
          },
          {
            kind: "errores",
            items: [
              { no: "You're wrong, that's a bad idea.", si: "I'm not sure that's the best approach.", pq: "Criticise the idea gently, not the person." },
              { no: "I take your point, and I disagree completely.", si: "I take your point, but I see it slightly differently.", pq: "Use 'but' to contrast, and soften with 'slightly'." },
              { no: "It will be a disaster.", si: "It might be a bit risky.", pq: "Tentative language (might, a bit) sounds more diplomatic." }
            ]
          },
          { kind: "resumen", body: "Soften (I take your point, but...) + tentative language (might, a bit) + facts (the data suggests...) + alternative (Would it be possible to...?)." },
          { kind: "puente", body: "Help Carmen and Daniel push back without upsetting the CEO." }
        ]
      },
      exercises: [
        {
          type: "listening",
          text: "I can see why you'd say that. However, the numbers suggest we might need more time.", question: "How does the speaker disagree?",
          options: ["Politely, using data", "Angrily", "They don't disagree"], correctIndex: 0
        },
        {
          type: "multiple_choice", question: "Which response is the most diplomatic?",
          options: ["I have some reservations about the budget.", "This budget is ridiculous.", "No way. We can't do that."], correctIndex: 0, explanation: "Formal, tentative and focused on the issue."
        },
        {
          type: "categorize", instruction: "Diplomatic or too direct?",
          buckets: [{ id: "dip", label: "Diplomatic" }, { id: "direct", label: "Too direct" }],
          items: [
            { t: "I take your point, but...", bucket: "dip" },
            { t: "It might be a bit risky.", bucket: "dip" },
            { t: "Would it be possible to wait?", bucket: "dip" },
            { t: "That's a terrible idea.", bucket: "direct" },
            { t: "You don't understand.", bucket: "direct" },
            { t: "We're definitely not doing that.", bucket: "direct" }
          ]
        },
        {
          type: "matching", instruction: "Match each word with its meaning.",
          pairs: [
            { l: "reservation", r: "a doubt about a plan" },
            { l: "tentative", r: "not certain or forceful" },
            { l: "alternative", r: "another possible choice" },
            { l: "diplomatic", r: "careful to avoid upsetting people" },
            { l: "push back", r: "resist a plan or idea" }
          ]
        },
        { type: "fill_blank", sentence: "I take your ___, but I think we need more data.", answers: ["point"], hint: "accept someone's argument", explanation: "I take your point, but..." },
        { type: "word_order", words: ["month", "Would", "a", "it", "wait", "be", "to", "possible"], correctOrder: ["Would", "it", "be", "possible", "to", "wait", "a", "month"], hint: "A polite alternative." },
        { type: "true_false", statement: "In a business context, \"push back\" means to accept a plan immediately.", answer: false, explanation: "To push back means to resist or question a plan." },
        { type: "speak", text: "I take your point. However, I have some reservations about the timing." },
        {
          type: "translate", prompt: "Make this more diplomatic using \"might\" and \"a bit\": \"This plan is risky.\"",
          answers: ["this plan might be a bit risky", "the plan might be a bit risky", "this might be a bit risky"], explanation: "This plan might be a bit risky."
        }
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
          hint: "A fixed expression.", explanation: "on the other hand = introduces the opposite point of view." },
        {
          type: "matching", instruction: "Match each word from the text with its meaning.",
          pairs: [{ l: "commute", r: "travel regularly between home and work" }, { l: "productive", r: "achieving a lot" }, { l: "hybrid", r: "a mix of two different things" }, { l: "separate", r: "keep apart" }]
        },
        { type: "true_false", statement: "The writer thinks everyone should work from home every day.", answer: false, explanation: "The writer prefers a hybrid model." },
        {
          type: "translate", prompt: "Rewrite using \"In my view\": \"I think a hybrid model is the best solution.\"",
          answers: ["in my view a hybrid model is the best solution", "in my view the best solution is a hybrid model"], explanation: "In my view, a hybrid model is the best solution."
        }
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
      lessonId: "voc-c1-academic", level: "C1", track: "Vocabulary", topic: "personality", skill: "vocab", tipo: "aprende", title: "Describing personality with nuance", rev: 2, xpReward: 60,
      mascotState: "explaining", nextLessonId: "read-c1-analysis",
      explanation: {
        body: "'Nice', 'friendly' and 'bad' won't get you far in a reference letter or a character analysis. Learn adjectives that describe personality precisely, and notice their connotation: is the word positive, negative or neutral? Many adjectives come in pairs with a similar meaning but a different connotation: thrifty (positive) vs stingy (negative); assertive vs pushy; self-assured vs arrogant. Use modifiers to fine-tune: remarkably conscientious, slightly abrasive, at times overbearing. Useful collocations: deeply conscientious, painfully shy, refreshingly candid.",
        examples: [
          { en: "She is remarkably conscientious and never misses a detail." },
          { en: "He can come across as aloof, but he's just shy." },
          { en: "Our new manager is assertive without being overbearing." },
          { en: "To be fair to her, her candid feedback improved the project." }
        ],
        sections: [
          {
            kind: "intro",
            body: "'Nice', 'friendly' and 'bad' won't get you far in a reference letter or a character analysis. Learn adjectives that describe personality precisely, and notice their connotation: is the word positive, negative or neutral?"
          },
          {
            kind: "regla",
            body: "Many adjectives come in pairs with a similar meaning but a different connotation: thrifty (positive) vs stingy (negative); assertive vs pushy; self-assured vs arrogant. Use modifiers to fine-tune: remarkably conscientious, slightly abrasive, at times overbearing. Useful collocations: deeply conscientious, painfully shy, refreshingly candid."
          },
          {
            kind: "vocab",
            items: [
              { en: "conscientious", ipa: "ˌkɒnʃiˈenʃəs", es: "careful to do things well and thoroughly" },
              { en: "meticulous", ipa: "məˈtɪkjələs", es: "paying great attention to detail" },
              { en: "abrasive", ipa: "əˈbreɪsɪv", es: "rude and unkind in a way that upsets people" },
              { en: "assertive", ipa: "əˈsɜːtɪv", es: "confident and direct about what you want" },
              { en: "overbearing", ipa: "ˌəʊvəˈbeərɪŋ", es: "trying to control other people too much" },
              { en: "candid", ipa: "ˈkændɪd", es: "honest and direct, even when it's uncomfortable" },
              { en: "resilient", ipa: "rɪˈzɪliənt", es: "able to recover quickly from difficulties" },
              { en: "aloof", ipa: "əˈluːf", es: "unfriendly and distant" }
            ]
          },
          {
            kind: "expresiones",
            items: [
              { en: "She's refreshingly candid.", es: "honest in a positive way" },
              { en: "He can come across as a bit abrasive.", es: "soften a negative description" },
              { en: "remarkably resilient", es: "a strong positive collocation" },
              { en: "To be fair to him, ...", es: "balance a criticism" }
            ]
          },
          {
            kind: "ejemplos",
            items: [
              { en: "She is remarkably conscientious and never misses a detail." },
              { en: "He can come across as aloof, but he's just shy." },
              { en: "Our new manager is assertive without being overbearing." },
              { en: "To be fair to her, her candid feedback improved the project." }
            ]
          },
          {
            kind: "errores",
            items: [
              { no: "He is very sympathetic: he always smiles and jokes.", si: "He is very friendly / likeable.", pq: "sympathetic means showing understanding of someone's problems, not 'nice'." },
              { no: "She's sensible to criticism.", si: "She's sensitive to criticism.", pq: "sensitive = easily hurt; sensible = practical and reasonable." },
              { no: "He is very educated: he always says please.", si: "He is very polite / well-mannered.", pq: "educated means having had a good education, not polite." }
            ]
          },
          { kind: "resumen", body: "Choose the word with the right connotation (thrifty vs stingy), add a modifier (remarkably, slightly) and watch out for false friends (sympathetic, sensible, educated)." },
          { kind: "puente", body: "Describe people precisely and fairly." }
        ]
      },
      exercises: [
        {
          type: "matching", instruction: "Match each adjective with its meaning.",
          pairs: [
            { l: "conscientious", r: "careful to do things well and thoroughly" },
            { l: "meticulous", r: "paying great attention to detail" },
            { l: "abrasive", r: "rude in a way that upsets people" },
            { l: "overbearing", r: "trying to control others too much" },
            { l: "candid", r: "honest and direct" },
            { l: "resilient", r: "able to recover quickly from difficulties" }
          ]
        },
        {
          type: "categorize", instruction: "Positive or negative connotation?",
          buckets: [{ id: "pos", label: "Positive" }, { id: "neg", label: "Negative" }],
          items: [
            { t: "thrifty", bucket: "pos" },
            { t: "assertive", bucket: "pos" },
            { t: "self-assured", bucket: "pos" },
            { t: "candid", bucket: "pos" },
            { t: "stingy", bucket: "neg" },
            { t: "pushy", bucket: "neg" },
            { t: "arrogant", bucket: "neg" },
            { t: "aloof", bucket: "neg" }
          ]
        },
        {
          type: "multiple_choice", question: "Ana checks every figure twice. She is extremely ___.", options: ["meticulous", "aloof", "abrasive"], correctIndex: 0,
          explanation: "meticulous = paying great attention to detail."
        },
        { type: "fill_blank", sentence: "Despite losing her job twice, she bounced back quickly. She's very ___.", answers: ["resilient"], hint: "able to recover quickly", explanation: "resilient" },
        {
          type: "listening", text: "To be fair to him, he can come across as aloof, but he's actually just quite shy.", question: "What does the speaker think?",
          options: ["He seems cold but isn't really.", "He is rude and unfriendly.", "He is very confident."], correctIndex: 0
        },
        {
          type: "find_error",
          segments: ["She is ", { u: "very" }, " ", { u: "sensible" }, " to criticism, so give feedback ", { u: "gently" }, "."],
          correctIndex: 1, correction: "sensitive", explanation: "sensitive = easily hurt or upset.", question: "Find the mistake"
        },
        { type: "true_false", statement: "\"Sympathetic\" in English means \"nice and friendly\".", answer: false, explanation: "It means showing understanding of someone's problems." },
        {
          type: "translate", prompt: "Rewrite with a more positive word: \"He is stingy with money.\"",
          answers: ["he is thrifty with money", "he's thrifty with money", "he is careful with money", "he's careful with money", "he is frugal with money", "he's frugal with money", "he is frugal", "he's frugal"],
          explanation: "He is thrifty with money."
        }
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
          hint: "An adjective from the text.", explanation: "sustained attention = attention kept up over a long time." },
        {
          type: "multiple_choice", question: "In the text, \"trivial\" is closest in meaning to...", options: ["unimportant", "harmful", "complicated"], correctIndex: 0,
          explanation: "trivial = small and unimportant."
        },
        { type: "true_false", statement: "The writer claims that multitasking is always harmful.", answer: false, explanation: "\"This does not mean multitasking is always harmful.\"" },
        {
          type: "find_error",
          segments: ["Each switch ", { u: "carry" }, " a small cost in ", { u: "time" }, " and ", { u: "accuracy" }, "."],
          correctIndex: 0, correction: "carries", explanation: "Each + singular verb: each switch carries.", question: "Find the mistake"
        }
      ]
    },

    /* ==================================================================
     * C2 — maestría
     * ================================================================== */
    "voc-c2-idioms": {
      lessonId: "voc-c2-idioms", level: "C2", track: "Vocabulary", topic: "idioms", skill: "vocab", tipo: "aprende", title: "Advanced idioms for work and debate", rev: 2, xpReward: 65, mascotState: "explaining",
      nextLessonId: "use-c2-hedging",
      explanation: {
        body: "At C2, being correct is not enough: you need to sound natural. Idioms are fixed phrases whose meaning doesn't come from the individual words. This lesson gives you twelve idioms you will hear constantly in meetings, the news and opinion pieces. Learn them as chunks, with their preposition and their register. Almost all are informal or neutral: in a formal essay, the direct word is better (bite the bullet → confront the problem). Don't translate them literally or change a word: a half-remembered idiom sounds worse than none. Many are metaphors from sport (move the goalposts, the ball is in your court) and war (bite the bullet).",
        examples: [
          { en: "Let's address the elephant in the room: the budget has run out." },
          { en: "Every company seems to be jumping on the AI bandwagon." },
          { en: "Just as we met the target, management moved the goalposts." },
          { en: "The prototype failed the test, so it's back to the drawing board." }
        ],
        sections: [
          {
            kind: "intro",
            body: "At C2, being correct is not enough: you need to sound natural. Idioms are fixed phrases whose meaning doesn't come from the individual words. This lesson gives you twelve idioms you will hear constantly in meetings, the news and opinion pieces."
          },
          {
            kind: "regla",
            body: "Learn them as chunks, with their preposition and their register. Almost all are informal or neutral: in a formal essay, the direct word is better (bite the bullet → confront the problem). Don't translate them literally or change a word: a half-remembered idiom sounds worse than none. Many are metaphors from sport (move the goalposts, the ball is in your court) and war (bite the bullet)."
          },
          {
            kind: "vocab",
            items: [
              { en: "bite the bullet", es: "face something difficult or unpleasant" },
              { en: "cut corners", es: "do something badly to save time or money" },
              { en: "the ball is in your court", es: "it's your turn to decide or act" },
              { en: "be on the same page", es: "agree; understand each other" },
              { en: "go the extra mile", es: "make more effort than is expected" },
              { en: "the elephant in the room", es: "an obvious problem that nobody wants to discuss" },
              { en: "jump on the bandwagon", es: "join something because it is popular" },
              { en: "move the goalposts", es: "change the rules unfairly during a process" }
            ]
          },
          {
            kind: "expresiones",
            items: [
              { en: "It's a double-edged sword.", es: "it has both advantages and disadvantages" },
              { en: "That's par for the course.", es: "that's normal and expected (often negative)" },
              { en: "It's back to the drawing board.", es: "we have to start again" },
              { en: "You have to read between the lines.", es: "find the hidden meaning" }
            ]
          },
          {
            kind: "ejemplos",
            items: [
              { en: "Let's address the elephant in the room: the budget has run out." },
              { en: "Every company seems to be jumping on the AI bandwagon." },
              { en: "Just as we met the target, management moved the goalposts." },
              { en: "The prototype failed the test, so it's back to the drawing board." }
            ]
          },
          {
            kind: "errores",
            items: [
              { no: "Let's bite the ball.", si: "Let's bite the bullet.", pq: "Idioms are fixed: changing one word breaks them." },
              { no: "We are in the same page.", si: "We are on the same page.", pq: "The preposition is on." },
              { no: "In conclusion, the government should bite the bullet.", si: "In conclusion, the government should confront the issue.", pq: "In a formal essay the idiom sounds too colloquial." }
            ]
          },
          {
            kind: "resumen",
            body: "12 idioms: bite the bullet, cut corners, the ball is in your court, on the same page, go the extra mile, the elephant in the room, jump on the bandwagon, move the goalposts, a double-edged sword, par for the course, back to the drawing board, read between the lines. Keep them for informal and neutral registers."
          },
          { kind: "puente", body: "Your turn: fix them in your memory." }
        ]
      },
      exercises: [
        {
          type: "matching", instruction: "Match each idiom with its meaning.",
          pairs: [
            { l: "bite the bullet", r: "face something unpleasant" },
            { l: "cut corners", r: "do something badly to save time or money" },
            { l: "the ball is in your court", r: "it's your turn to act" },
            { l: "on the same page", r: "in agreement" },
            { l: "the elephant in the room", r: "an obvious problem nobody mentions" },
            { l: "move the goalposts", r: "change the rules unfairly" }
          ]
        },
        {
          type: "reading", title: "An email from the project lead",
          passage: "Hi team,\n\nLet's address the elephant in the room: the launch date is no longer realistic. The client has moved the goalposts twice this month, and we've been working weekends to keep up. I know everyone has gone the extra mile, and I'm grateful.\n\nI'd rather bite the bullet now and ask for a new date than cut corners on testing. I've sent the client a proposal, so the ball is in their court.\n\nThanks,\nJo",
          questions: [
            {
              q: "What is \"the elephant in the room\"?", options: ["The unrealistic launch date", "The client's new office", "Working at weekends"], correctIndex: 0,
              explanation: "...the launch date is no longer realistic."
            },
            {
              q: "What does Jo refuse to do?",
              options: ["Reduce the quality of testing to save time", "Ask for a new date", "Thank the team"], correctIndex: 0, explanation: "I'd rather ... than cut corners on testing."
            },
            { q: "Who has to act next?", options: ["The client", "Jo", "The testing team"], correctIndex: 0, explanation: "the ball is in their court" }
          ]
        },
        {
          type: "matching", instruction: "More idioms: match each one with its meaning.",
          pairs: [
            { l: "go the extra mile", r: "make more effort than expected" },
            { l: "jump on the bandwagon", r: "join something because it's popular" },
            { l: "a double-edged sword", r: "something with advantages and disadvantages" },
            { l: "par for the course", r: "normal and expected" },
            { l: "back to the drawing board", r: "time to start again" },
            { l: "read between the lines", r: "find the hidden meaning" }
          ]
        },
        {
          type: "multiple_choice", question: "Social media is a ___: it connects people, but it can also isolate them.", options: ["double-edged sword", "piece of cake", "blessing in disguise"], correctIndex: 0,
          explanation: "advantages and disadvantages = a double-edged sword."
        },
        {
          type: "find_error",
          segments: ["We need to make sure we're all ", { u: "in" }, " ", { u: "the same" }, " ", { u: "page" }, " before the meeting."],
          correctIndex: 0, correction: "on", explanation: "The idiom is 'on the same page'.", question: "Find the mistake"
        },
        { type: "fill_blank", sentence: "Delays on this kind of project are par for the ___, unfortunately.", answers: ["course"], hint: "normal and expected", explanation: "par for the course" },
        {
          type: "true_false", statement: "To \"move the goalposts\" means to make a task easier for everyone.", answer: false, explanation: "It means to change the rules unfairly, usually making things harder."
        },
        {
          type: "translate", prompt: "Use an idiom: \"The plan failed, so we have to start again from the beginning.\"",
          answers: ["it's back to the drawing board", "it is back to the drawing board", "we have to go back to the drawing board", "back to the drawing board"], explanation: "It's back to the drawing board."
        }
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
          hint: "An adjective from the word \"criticism\".", explanation: "The tone is subtly critical." },
        {
          type: "multiple_choice", question: "In the text, \"summon a car\" most nearly means...", options: ["call for a car to come", "buy a car", "repair a car"], correctIndex: 0,
          explanation: "summon = order someone or something to come."
        },
        {
          type: "true_false",
          statement: "The writer suggests that time-saving tools may actually create new demands on our time.", answer: true,
          explanation: "\"Each tool that 'saves' time seems to fill the space it creates with new demands.\""
        },
        {
          type: "fill_blank",
          sentence: "Each tool that \"saves\" time seems to fill the ___ it creates with new demands.", answers: ["space"], hint: "A word from the first paragraph.",
          explanation: "...fill the space it creates..."
        }
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
