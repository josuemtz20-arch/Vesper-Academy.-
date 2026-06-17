/* ============================================================
 * vesper_expansion2.js — Segunda expansión de contenido (2026).
 *
 * 32 lecciones nuevas (A1–C2) en todas las destrezas + más pista
 * profesional ("Inglés profesional" / Business), reforzando los
 * niveles más flojos (C1/C2). Reutiliza SOLO los tipos de ejercicio
 * que ya soporta el motor de leccion.html:
 *   multiple_choice · word_order · true_false · fill_blank
 *   translate · matching · listening · categorize · reading
 *
 * Patrón idéntico a vesper_expansion.js: expone
 *   window.VESPER_EXPANSION2 = { lessons, order, merge }
 * y se fusiona en VESPER_LESSONS via VESPER_EXPANSION2.merge().
 *
 * Todos los lessonId llevan prefijo "x2-" → cero colisión con los
 * packs existentes. Listening sin 'audio' (el motor usa Web Speech API).
 * ============================================================ */
window.VESPER_EXPANSION2 = (function () {
  var L = {

    /* ==================================================================
     * A1 / A2 — fundamentos
     * ================================================================== */
    "x2-voc-a1-food": {
      lessonId: "x2-voc-a1-food", level: "A1", track: "Vocabulario", topic: "food", skill: "vocab",
      title: "Comida y bebida", xpReward: 40, mascotState: "explaining",
      nextLessonId: "x2-voc-a1-body",
      explanation: {
        body: "Pedir comida es de lo más útil al viajar. Sustantivos contables: an apple, two eggs. Incontables: bread, water, rice (no llevan plural). Con incontables usamos some: \"some water\". (Vocabulario básico de comida.)",
        examples: [
          { en: "I'd like some bread, please.", es: "Quisiera algo de pan, por favor." },
          { en: "She eats two eggs for breakfast.", es: "Ella come dos huevos en el desayuno." },
          { en: "Can I have a glass of water?", es: "¿Me das un vaso de agua?" }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Une la comida con su traducción.", pairs: [
          { l: "bread", r: "pan" }, { l: "cheese", r: "queso" }, { l: "apple", r: "manzana" }, { l: "water", r: "agua" } ],
          explanation: "bread = pan, cheese = queso, apple = manzana, water = agua." },
        { type: "categorize", instruction: "¿Contable (a/an, plural) o incontable (some)?", buckets: [
          { id: "c", label: "Contable" }, { id: "u", label: "Incontable" } ], items: [
          { t: "egg", bucket: "c" }, { t: "rice", bucket: "u" }, { t: "banana", bucket: "c" }, { t: "milk", bucket: "u" } ] },
        { type: "fill_blank", sentence: "I'd like ___ water, please.", answers: ["some"],
          hint: "incontable.", explanation: "Con incontables usamos 'some': some water." },
        { type: "multiple_choice", question: "Which is countable?", options: ["sugar", "an orange", "rice"],
          correctIndex: 1, explanation: "'an orange' es contable; sugar y rice son incontables." },
        { type: "translate", prompt: "Traduce: \"Como dos huevos.\"",
          answers: ["i eat two eggs"], explanation: "I eat two eggs." }
      ]
    },

    "x2-voc-a1-body": {
      lessonId: "x2-voc-a1-body", level: "A1", track: "Vocabulario", topic: "body", skill: "vocab",
      title: "El cuerpo", xpReward: 40, mascotState: "explaining",
      nextLessonId: "x2-voc-a1-clothes",
      explanation: {
        body: "Las partes del cuerpo aparecen al ir al médico o describir a alguien. head, eyes, nose, mouth, hand, leg, foot. Plurales irregulares importantes: foot → feet, tooth → teeth. (Partes del cuerpo.)",
        examples: [
          { en: "My head hurts.", es: "Me duele la cabeza." },
          { en: "She has blue eyes.", es: "Ella tiene los ojos azules." },
          { en: "I have two feet.", es: "Tengo dos pies." }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Une la parte del cuerpo con su traducción.", pairs: [
          { l: "hand", r: "mano" }, { l: "eye", r: "ojo" }, { l: "leg", r: "pierna" }, { l: "mouth", r: "boca" } ],
          explanation: "hand = mano, eye = ojo, leg = pierna, mouth = boca." },
        { type: "multiple_choice", question: "Plural of 'foot'?", options: ["foots", "feet", "feets"],
          correctIndex: 1, explanation: "foot → feet (irregular)." },
        { type: "fill_blank", sentence: "I brush my ___ every morning. (dientes)", answers: ["teeth"],
          hint: "tooth → ?", explanation: "tooth → teeth (irregular)." },
        { type: "true_false", statement: "'Hair' usually takes a plural -s in English (hairs).", answer: false,
          explanation: "El pelo en general es incontable: 'my hair is long'." },
        { type: "translate", prompt: "Traduce: \"Me duele la cabeza.\"",
          answers: ["my head hurts", "i have a headache"], explanation: "My head hurts. / I have a headache." }
      ]
    },

    "x2-voc-a1-clothes": {
      lessonId: "x2-voc-a1-clothes", level: "A1", track: "Vocabulario", topic: "clothes", skill: "vocab",
      title: "La ropa", xpReward: 40, mascotState: "explaining",
      nextLessonId: "x2-gram-a1-possessives",
      explanation: {
        body: "Para comprar ropa o describir a la gente: shirt, trousers, dress, shoes, jacket. Usamos wear (llevar puesto) y put on (ponerse). Algunas prendas son siempre plurales: trousers, jeans, glasses. (Vocabulario de ropa.)",
        examples: [
          { en: "He's wearing a blue shirt.", es: "Lleva una camisa azul." },
          { en: "I need new shoes.", es: "Necesito zapatos nuevos." },
          { en: "Put on your jacket, it's cold.", es: "Ponte la chaqueta, hace frío." }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Une la prenda con su traducción.", pairs: [
          { l: "shirt", r: "camisa" }, { l: "shoes", r: "zapatos" }, { l: "dress", r: "vestido" }, { l: "hat", r: "sombrero" } ],
          explanation: "shirt = camisa, shoes = zapatos, dress = vestido, hat = sombrero." },
        { type: "multiple_choice", question: "She ___ a red dress today.", options: ["is wearing", "wears on", "is putting"],
          correctIndex: 0, explanation: "'is wearing' = lleva puesto ahora mismo." },
        { type: "true_false", statement: "'Trousers' is always plural in English.", answer: true,
          explanation: "Sí: trousers, jeans, glasses van en plural." },
        { type: "fill_blank", sentence: "It's cold. Put ___ your coat.", answers: ["on"],
          hint: "put ___ = ponerse.", explanation: "put on = ponerse una prenda." },
        { type: "translate", prompt: "Traduce: \"Necesito zapatos nuevos.\"",
          answers: ["i need new shoes"], explanation: "I need new shoes." }
      ]
    },

    "x2-gram-a1-possessives": {
      lessonId: "x2-gram-a1-possessives", level: "A1", track: "Gramática", topic: "grammar", skill: "grammar",
      title: "Posesivos: my, your, his, her", xpReward: 45, mascotState: "explaining",
      nextLessonId: "x2-gram-a2-prepositions-place",
      explanation: {
        body: "Los adjetivos posesivos van antes del sustantivo y no cambian con el plural: my, your, his, her, its, our, their. \"his\" para él, \"her\" para ella. No confundas his/her (depende del dueño, no del objeto). (Adjetivos posesivos.)",
        examples: [
          { en: "This is my car.", es: "Este es mi coche." },
          { en: "Her name is Ana.", es: "Su nombre es Ana." },
          { en: "Their house is big.", es: "Su casa (de ellos) es grande." }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "Tom loves ___ dog. (Tom = chico)", options: ["her", "his", "its"],
          correctIndex: 1, explanation: "Tom es 'él' → his dog." },
        { type: "fill_blank", sentence: "Ana and I clean ___ room. (nuestro)", answers: ["our"],
          hint: "we → ?", explanation: "we → our (nuestro)." },
        { type: "word_order", words: ["This", "is", "her", "book"], correctOrder: ["This", "is", "her", "book"],
          hint: "posesivo antes del sustantivo." },
        { type: "true_false", statement: "Possessive adjectives add -s for plural nouns (mys cars).", answer: false,
          explanation: "No cambian: 'my cars', no 'mys'." },
        { type: "translate", prompt: "Traduce: \"Su nombre (de ella) es Ana.\"",
          answers: ["her name is ana"], explanation: "Her name is Ana." }
      ]
    },

    "x2-gram-a2-prepositions-place": {
      lessonId: "x2-gram-a2-prepositions-place", level: "A2", track: "Gramática", topic: "grammar", skill: "grammar",
      title: "Preposiciones de lugar", xpReward: 45, mascotState: "explaining",
      nextLessonId: "x2-gram-a2-adverbs-frequency",
      explanation: {
        body: "Para decir dónde está algo: in (dentro), on (sobre una superficie), under (debajo), next to (al lado), between (entre), behind (detrás), in front of (delante). \"The keys are on the table.\" (Preposiciones de lugar.)",
        examples: [
          { en: "The cat is under the chair.", es: "El gato está debajo de la silla." },
          { en: "The bank is next to the café.", es: "El banco está al lado del café." },
          { en: "Your phone is in the bag.", es: "Tu teléfono está en la bolsa." }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "The book is ___ the table (surface).", options: ["in", "on", "under"],
          correctIndex: 1, explanation: "Sobre una superficie → on the table." },
        { type: "fill_blank", sentence: "The shop is ___ the bank and the café. (entre)", answers: ["between"],
          hint: "entre dos cosas.", explanation: "between = entre (dos)." },
        { type: "matching", instruction: "Une la preposición con su significado.", pairs: [
          { l: "under", r: "debajo" }, { l: "behind", r: "detrás" }, { l: "next to", r: "al lado" }, { l: "in front of", r: "delante" } ],
          explanation: "under = debajo, behind = detrás, next to = al lado, in front of = delante." },
        { type: "true_false", statement: "We say 'in the table' to mean on its surface.", answer: false,
          explanation: "Superficie → 'on the table', no 'in'." },
        { type: "translate", prompt: "Traduce: \"El gato está debajo de la silla.\"",
          answers: ["the cat is under the chair"], explanation: "The cat is under the chair." }
      ]
    },

    "x2-gram-a2-adverbs-frequency": {
      lessonId: "x2-gram-a2-adverbs-frequency", level: "A2", track: "Gramática", topic: "grammar", skill: "grammar",
      title: "Adverbios de frecuencia", xpReward: 45, mascotState: "explaining",
      nextLessonId: "x2-voc-a2-time-dates",
      explanation: {
        body: "always (100%), usually, often, sometimes, rarely, never (0%). Van ANTES del verbo principal, pero DESPUÉS del verbo to be: \"I always study\" / \"She is always late\". (Adverbios de frecuencia.)",
        examples: [
          { en: "I always drink coffee.", es: "Siempre tomo café." },
          { en: "He is never late.", es: "Él nunca llega tarde." },
          { en: "We sometimes go to the cinema.", es: "A veces vamos al cine." }
        ]
      },
      exercises: [
        { type: "word_order", words: ["She", "always", "reads", "at", "night"],
          correctOrder: ["She", "always", "reads", "at", "night"], hint: "adverbio antes del verbo principal." },
        { type: "multiple_choice", question: "Correct order with 'to be'?", options: ["He always is happy", "He is always happy", "Always he is happy"],
          correctIndex: 1, explanation: "Tras 'be' el adverbio va después: He is always happy." },
        { type: "fill_blank", sentence: "I ___ eat meat; I'm vegetarian. (0%)", answers: ["never"],
          hint: "0% de frecuencia.", explanation: "never = nunca (0%)." },
        { type: "categorize", instruction: "¿Frecuencia alta o baja?", buckets: [
          { id: "hi", label: "Alta" }, { id: "lo", label: "Baja" } ], items: [
          { t: "always", bucket: "hi" }, { t: "rarely", bucket: "lo" }, { t: "usually", bucket: "hi" }, { t: "never", bucket: "lo" } ] },
        { type: "translate", prompt: "Traduce: \"Él nunca llega tarde.\"",
          answers: ["he is never late"], explanation: "He is never late." }
      ]
    },

    "x2-voc-a2-time-dates": {
      lessonId: "x2-voc-a2-time-dates", level: "A2", track: "Vocabulario", topic: "time", skill: "vocab",
      title: "La hora y las fechas", xpReward: 45, mascotState: "explaining",
      nextLessonId: "x2-read-a2-daily",
      explanation: {
        body: "Para la hora: \"It's half past seven\" (7:30), \"a quarter to nine\" (8:45), \"a quarter past ten\" (10:15). Preposiciones: at + hora, on + día, in + mes/año. \"at 6, on Monday, in July\". (La hora y las fechas.)",
        examples: [
          { en: "The meeting is at 9 o'clock.", es: "La reunión es a las 9." },
          { en: "Her birthday is on Friday.", es: "Su cumpleaños es el viernes." },
          { en: "It's half past two.", es: "Son las dos y media." }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "How do you say 7:30?", options: ["half to seven", "half past seven", "seven and half"],
          correctIndex: 1, explanation: "7:30 = half past seven." },
        { type: "fill_blank", sentence: "The class starts ___ 8 o'clock.", answers: ["at"],
          hint: "preposición + hora.", explanation: "at + hora exacta: at 8 o'clock." },
        { type: "categorize", instruction: "¿Qué preposición de tiempo?", buckets: [
          { id: "at", label: "at" }, { id: "on", label: "on" }, { id: "in", label: "in" } ], items: [
          { t: "6 o'clock", bucket: "at" }, { t: "Monday", bucket: "on" }, { t: "July", bucket: "in" }, { t: "the weekend", bucket: "at" } ] },
        { type: "true_false", statement: "We say 'in Monday' for days.", answer: false,
          explanation: "Días → on: 'on Monday'." },
        { type: "translate", prompt: "Traduce: \"La reunión es a las nueve.\"",
          answers: ["the meeting is at nine", "the meeting is at nine o'clock"], explanation: "The meeting is at nine (o'clock)." }
      ]
    },

    "x2-read-a2-daily": {
      lessonId: "x2-read-a2-daily", level: "A2", track: "Lectura", topic: "dailylife", skill: "reading",
      title: "Lectura: A new job", xpReward: 50, mascotState: "explaining",
      nextLessonId: "x2-gram-b1-second-conditional",
      explanation: {
        body: "En esta lectura corta practicas el present simple y el vocabulario de rutina y trabajo. Lee con calma y fíjate en las horas y los lugares. (Comprensión lectora A2.)",
        examples: [
          { en: "He starts work at eight.", es: "Empieza a trabajar a las ocho." },
          { en: "She works in an office.", es: "Ella trabaja en una oficina." }
        ]
      },
      exercises: [
        { type: "reading", title: "Daniel's first week",
          passage: "Daniel has a new job in a bookshop in the city centre. He starts work at nine o'clock and finishes at five.\n\nEvery morning he takes the bus because there is no parking near the shop. At work, he helps customers find books and puts new books on the shelves.\n\nDaniel likes his job, but he is always tired on Friday. At the weekend he sleeps late and meets his friends.",
          questions: [
            { q: "Where does Daniel work?", options: ["In an office", "In a bookshop", "In a café"], correctIndex: 1, explanation: "\"a new job in a bookshop\"." },
            { q: "How does he go to work?", options: ["By car", "By bike", "By bus"], correctIndex: 2, explanation: "\"he takes the bus\"." },
            { q: "When is he always tired?", options: ["On Monday", "On Friday", "At the weekend"], correctIndex: 1, explanation: "\"he is always tired on Friday\"." }
          ] },
        { type: "true_false", statement: "Daniel finishes work at nine o'clock.", answer: false,
          explanation: "Empieza a las nueve y termina a las cinco." },
        { type: "multiple_choice", question: "What does Daniel do at the weekend?", options: ["He works", "He sleeps late and meets friends", "He drives to the shop"],
          correctIndex: 1, explanation: "\"he sleeps late and meets his friends\"." }
      ]
    },

    /* ==================================================================
     * B1 / B2 — intermedio
     * ================================================================== */
    "x2-gram-b1-second-conditional": {
      lessonId: "x2-gram-b1-second-conditional", level: "B1", track: "Gramática", topic: "grammar", skill: "grammar",
      title: "Segundo condicional", xpReward: 50, mascotState: "explaining",
      nextLessonId: "x2-gram-b1-used-to",
      explanation: {
        body: "El segundo condicional habla de situaciones imaginarias o improbables: If + past simple, would + infinitivo. \"If I had money, I would travel.\" Con el verbo be, se usa 'were' para todas las personas: \"If I were you...\". (Hipótesis presentes/futuras.)",
        examples: [
          { en: "If I won the lottery, I would buy a house.", es: "Si ganara la lotería, compraría una casa." },
          { en: "If I were you, I'd study more.", es: "Yo que tú, estudiaría más." },
          { en: "She would help if she had time.", es: "Ayudaría si tuviera tiempo." }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "If I ___ rich, I would travel.", options: ["am", "were", "will be"],
          correctIndex: 1, explanation: "2º condicional: If + past (were)." },
        { type: "fill_blank", sentence: "If she had time, she ___ help. (would)", answers: ["would help"],
          hint: "would + infinitivo.", explanation: "would help." },
        { type: "word_order", words: ["If", "I", "were", "you,", "I", "would", "wait"],
          correctOrder: ["If", "I", "were", "you,", "I", "would", "wait"], hint: "If + past, would + infinitivo." },
        { type: "true_false", statement: "The 2nd conditional talks about real, likely situations.", answer: false,
          explanation: "Habla de situaciones imaginarias o improbables." },
        { type: "translate", prompt: "Traduce: \"Si tuviera dinero, viajaría.\"",
          answers: ["if i had money, i would travel", "if i had money i would travel"], explanation: "If I had money, I would travel." }
      ]
    },

    "x2-gram-b1-used-to": {
      lessonId: "x2-gram-b1-used-to", level: "B1", track: "Gramática", topic: "grammar", skill: "grammar",
      title: "used to: hábitos del pasado", xpReward: 50, mascotState: "explaining",
      nextLessonId: "x2-use-b1-phrasal-verbs-2",
      explanation: {
        body: "\"used to + infinitivo\" describe hábitos o estados del pasado que ya no ocurren: \"I used to smoke\" (antes fumaba, ya no). En negativo e interrogativo se pierde la -d: \"I didn't use to...\", \"Did you use to...?\". (Hábitos del pasado.)",
        examples: [
          { en: "I used to live in Madrid.", es: "Antes vivía en Madrid." },
          { en: "She didn't use to like coffee.", es: "Antes no le gustaba el café." },
          { en: "Did you use to play football?", es: "¿Antes jugabas al fútbol?" }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "Negative form?", options: ["I didn't used to", "I didn't use to", "I usedn't"],
          correctIndex: 1, explanation: "En negativo se pierde la -d: didn't use to." },
        { type: "fill_blank", sentence: "I ___ play tennis, but I stopped years ago.", answers: ["used to"],
          hint: "hábito pasado.", explanation: "used to play." },
        { type: "true_false", statement: "'I used to live there' means I live there now.", answer: false,
          explanation: "Significa que vivía antes, ya no." },
        { type: "translate", prompt: "Traduce: \"Antes vivía en Madrid.\"",
          answers: ["i used to live in madrid"], explanation: "I used to live in Madrid." },
        { type: "word_order", words: ["She", "used", "to", "have", "long", "hair"],
          correctOrder: ["She", "used", "to", "have", "long", "hair"], hint: "used to + infinitivo." }
      ]
    },

    "x2-use-b1-phrasal-verbs-2": {
      lessonId: "x2-use-b1-phrasal-verbs-2", level: "B1", track: "Uso del inglés", topic: "grammar", skill: "use",
      title: "Phrasal verbs cotidianos", xpReward: 50, mascotState: "explaining",
      nextLessonId: "x2-read-b1-travel",
      explanation: {
        body: "Los phrasal verbs son verbo + partícula con un significado propio: get up (levantarse), turn off (apagar), look for (buscar), give up (rendirse), find out (averiguar). Muy comunes en el inglés hablado. (Phrasal verbs frecuentes.)",
        examples: [
          { en: "I get up at seven.", es: "Me levanto a las siete." },
          { en: "Turn off the light, please.", es: "Apaga la luz, por favor." },
          { en: "Don't give up!", es: "¡No te rindas!" }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Une el phrasal verb con su significado.", pairs: [
          { l: "get up", r: "levantarse" }, { l: "look for", r: "buscar" }, { l: "give up", r: "rendirse" }, { l: "find out", r: "averiguar" } ],
          explanation: "get up = levantarse, look for = buscar, give up = rendirse, find out = averiguar." },
        { type: "multiple_choice", question: "Please ___ the TV; it's late. (apagar)", options: ["turn off", "turn on", "look after"],
          correctIndex: 0, explanation: "turn off = apagar." },
        { type: "fill_blank", sentence: "I'm ___ my keys. Have you seen them? (buscar)", answers: ["looking for"],
          hint: "buscar.", explanation: "look for = buscar." },
        { type: "true_false", statement: "'Give up' means to continue trying.", answer: false,
          explanation: "give up = rendirse, dejar de intentar." },
        { type: "translate", prompt: "Traduce: \"Me levanto a las siete.\"",
          answers: ["i get up at seven"], explanation: "I get up at seven." }
      ]
    },

    "x2-read-b1-travel": {
      lessonId: "x2-read-b1-travel", level: "B1", track: "Lectura", topic: "travel", skill: "reading",
      title: "Lectura: Slow travel", xpReward: 55, mascotState: "explaining",
      nextLessonId: "x2-gram-b2-third-conditional",
      explanation: {
        body: "Texto sobre una forma de viajar más tranquila. Practica inferir el significado por contexto y localizar información específica. (Comprensión lectora B1.)",
        examples: [
          { en: "Instead of rushing, they stay longer.", es: "En vez de correr, se quedan más tiempo." }
        ]
      },
      exercises: [
        { type: "reading", title: "Slow travel",
          passage: "More and more people are choosing 'slow travel'. Instead of visiting five cities in a week, they stay in one place for several days.\n\nSlow travellers often rent a flat, cook their own food, and talk to local people. They say this helps them understand a culture better than a quick tour.\n\nIt is also cheaper and better for the planet, because they take fewer flights. For many, the goal is not to see everything, but to feel at home in a new place.",
          questions: [
            { q: "What do slow travellers do?", options: ["Visit many cities fast", "Stay longer in one place", "Only take guided tours"], correctIndex: 1, explanation: "\"they stay in one place for several days\"." },
            { q: "Why is slow travel better for the planet?", options: ["They take fewer flights", "They walk everywhere", "They never eat out"], correctIndex: 0, explanation: "\"they take fewer flights\"." },
            { q: "What is the main goal for many slow travellers?", options: ["To see everything", "To feel at home in a new place", "To save time"], correctIndex: 1, explanation: "\"to feel at home in a new place\"." }
          ] },
        { type: "true_false", statement: "Slow travel is more expensive than fast tourism, according to the text.", answer: false,
          explanation: "El texto dice que es más barato (\"cheaper\")." },
        { type: "multiple_choice", question: "The word 'rush' in the text is closest to...", options: ["relax", "hurry", "pay"],
          correctIndex: 1, explanation: "rush = correr, ir con prisa." }
      ]
    },

    "x2-gram-b2-third-conditional": {
      lessonId: "x2-gram-b2-third-conditional", level: "B2", track: "Gramática", topic: "grammar", skill: "grammar",
      title: "Tercer condicional", xpReward: 55, mascotState: "explaining",
      nextLessonId: "x2-gram-b2-future-continuous",
      explanation: {
        body: "El tercer condicional habla del pasado imaginario (arrepentimientos): If + past perfect, would have + participio. \"If I had studied, I would have passed.\" Nos referimos a algo que NO ocurrió. (Hipótesis del pasado.)",
        examples: [
          { en: "If I had known, I would have called you.", es: "Si lo hubiera sabido, te habría llamado." },
          { en: "She would have come if you had asked.", es: "Habría venido si se lo hubieras pedido." },
          { en: "If we hadn't left early, we would have missed the train.", es: "Si no hubiéramos salido temprano, habríamos perdido el tren." }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "If I had studied, I ___ passed.", options: ["would have", "would", "had"],
          correctIndex: 0, explanation: "3er condicional: would have + participio." },
        { type: "fill_blank", sentence: "If you ___ told me, I would have helped. (past perfect)", answers: ["had"],
          hint: "If + past perfect.", explanation: "If you had told me..." },
        { type: "true_false", statement: "The 3rd conditional refers to things that really happened.", answer: false,
          explanation: "Se refiere a un pasado imaginario que NO ocurrió." },
        { type: "word_order", words: ["If", "I", "had", "known,", "I", "would", "have", "stayed"],
          correctOrder: ["If", "I", "had", "known,", "I", "would", "have", "stayed"], hint: "If + past perfect, would have + participio." },
        { type: "translate", prompt: "Traduce: \"Si lo hubiera sabido, te habría llamado.\"",
          answers: ["if i had known, i would have called you", "if i had known i would have called you"], explanation: "If I had known, I would have called you." }
      ]
    },

    "x2-gram-b2-future-continuous": {
      lessonId: "x2-gram-b2-future-continuous", level: "B2", track: "Gramática", topic: "grammar", skill: "grammar",
      title: "Future continuous", xpReward: 55, mascotState: "explaining",
      nextLessonId: "x2-use-b2-connectors",
      explanation: {
        body: "\"will be + -ing\" describe una acción en curso en un momento futuro: \"This time tomorrow, I'll be flying to Rome.\" También se usa para planes educados: \"Will you be using the car tonight?\". (Futuro continuo.)",
        examples: [
          { en: "At 8 pm I'll be watching the match.", es: "A las 8 estaré viendo el partido." },
          { en: "This time next week we'll be relaxing on the beach.", es: "La semana que viene estaremos descansando en la playa." },
          { en: "Will you be joining us later?", es: "¿Te unirás a nosotros más tarde?" }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "This time tomorrow, I ___ to London.", options: ["will fly", "will be flying", "am flying"],
          correctIndex: 1, explanation: "Acción en curso en el futuro → will be flying." },
        { type: "fill_blank", sentence: "Don't call at 9 — I ___ (have) dinner then.", answers: ["will be having", "'ll be having"],
          hint: "will be + -ing.", explanation: "I'll be having dinner." },
        { type: "true_false", statement: "'Will you be using the car?' is a polite way to ask about plans.", answer: true,
          explanation: "Sí, el future continuous suena más educado para preguntar por planes." },
        { type: "translate", prompt: "Traduce: \"A las ocho estaré viendo el partido.\"",
          answers: ["at eight i'll be watching the match", "at 8 i'll be watching the match", "at eight i will be watching the match"],
          explanation: "At eight I'll be watching the match." }
      ]
    },

    "x2-use-b2-connectors": {
      lessonId: "x2-use-b2-connectors", level: "B2", track: "Uso del inglés", topic: "grammar", skill: "use",
      title: "Conectores de contraste y causa", xpReward: 55, mascotState: "explaining",
      nextLessonId: "x2-use-b2-word-formation",
      explanation: {
        body: "Conectar ideas con precisión sube tu nivel. Contraste: although/though + frase, despite/in spite of + sustantivo o -ing, however (entre frases). Causa: because + frase, because of + sustantivo, due to. \"Despite the rain, we went out.\" (Conectores B2.)",
        examples: [
          { en: "Although it was late, she kept working.", es: "Aunque era tarde, siguió trabajando." },
          { en: "Despite the noise, he slept well.", es: "A pesar del ruido, durmió bien." },
          { en: "The flight was cancelled due to the storm.", es: "El vuelo se canceló debido a la tormenta." }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "___ the rain, we enjoyed the trip.", options: ["Although", "Despite", "Because"],
          correctIndex: 1, explanation: "'Despite' + sustantivo (the rain). 'Although' necesita una frase." },
        { type: "fill_blank", sentence: "___ it was expensive, we bought it. (aunque)", answers: ["Although", "Though"],
          hint: "+ frase completa.", explanation: "Although/Though + sujeto + verbo." },
        { type: "categorize", instruction: "¿Conector de contraste o de causa?", buckets: [
          { id: "con", label: "Contraste" }, { id: "cau", label: "Causa" } ], items: [
          { t: "however", bucket: "con" }, { t: "because of", bucket: "cau" }, { t: "although", bucket: "con" }, { t: "due to", bucket: "cau" } ] },
        { type: "true_false", statement: "'Because of' is followed by a full sentence.", answer: false,
          explanation: "'because of' va con sustantivo; 'because' con frase." },
        { type: "translate", prompt: "Traduce: \"A pesar del ruido, durmió bien.\"",
          answers: ["despite the noise, he slept well", "despite the noise he slept well", "in spite of the noise he slept well"],
          explanation: "Despite the noise, he slept well." }
      ]
    },

    "x2-use-b2-word-formation": {
      lessonId: "x2-use-b2-word-formation", level: "B2", track: "Uso del inglés", topic: "grammar", skill: "use",
      title: "Formación de palabras", xpReward: 55, mascotState: "explaining",
      nextLessonId: "x2-read-b2-environment",
      explanation: {
        body: "Muchos exámenes piden transformar una palabra. Sufijos comunes: -ness (happy → happiness), -tion (decide → decision), -ful/-less (care → careful/careless), -ly (quick → quickly, adverbio). Reconocer el sufijo te dice la categoría (sustantivo, adjetivo, adverbio). (Word formation B2.)",
        examples: [
          { en: "happy → happiness (noun)", es: "feliz → felicidad (sustantivo)" },
          { en: "care → careful / careless", es: "cuidado → cuidadoso / descuidado" },
          { en: "quick → quickly (adverb)", es: "rápido → rápidamente (adverbio)" }
        ]
      },
      exercises: [
        { type: "fill_blank", sentence: "Her ___ surprised everyone. (kind → noun)", answers: ["kindness"],
          hint: "-ness.", explanation: "kind → kindness (sustantivo)." },
        { type: "multiple_choice", question: "Adjective form of 'danger'?", options: ["dangerly", "dangerous", "dangerness"],
          correctIndex: 1, explanation: "danger → dangerous (adjetivo)." },
        { type: "categorize", instruction: "¿La palabra es sustantivo o adjetivo?", buckets: [
          { id: "n", label: "Sustantivo" }, { id: "adj", label: "Adjetivo" } ], items: [
          { t: "decision", bucket: "n" }, { t: "useful", bucket: "adj" }, { t: "freedom", bucket: "n" }, { t: "creative", bucket: "adj" } ] },
        { type: "true_false", statement: "Adding '-ly' usually makes an adverb (quick → quickly).", answer: true,
          explanation: "Sí, -ly suele formar adverbios." },
        { type: "fill_blank", sentence: "He drove ___ in the rain. (careful → adverb)", answers: ["carefully"],
          hint: "-ly.", explanation: "careful → carefully." }
      ]
    },

    "x2-read-b2-environment": {
      lessonId: "x2-read-b2-environment", level: "B2", track: "Lectura", topic: "science", skill: "reading",
      title: "Lectura: Urban gardens", xpReward: 58, mascotState: "explaining",
      nextLessonId: "x2-lis-b2-meeting",
      explanation: {
        body: "Texto de divulgación sobre huertos urbanos. Practica identificar la idea principal y distinguir hechos de opiniones. (Comprensión lectora B2.)",
        examples: [
          { en: "Rooftops are being turned into gardens.", es: "Las azoteas se están convirtiendo en huertos." }
        ]
      },
      exercises: [
        { type: "reading", title: "Gardens in the city",
          passage: "In many crowded cities, empty rooftops and small plots are being turned into community gardens. Local residents grow vegetables, herbs and flowers together.\n\nThese gardens do more than provide food. They cool the air in summer, support bees and other insects, and give people a green space to relax and meet neighbours.\n\nSome city councils now support the idea, offering tools and water. Critics argue the gardens are too small to feed a city, but supporters say their real value is social and environmental, not just agricultural.",
          questions: [
            { q: "What is the main topic?", options: ["Building skyscrapers", "Community gardens in cities", "Selling vegetables abroad"], correctIndex: 1, explanation: "El texto trata de huertos comunitarios urbanos." },
            { q: "According to the text, the gardens...", options: ["only provide food", "do more than provide food", "harm insects"], correctIndex: 1, explanation: "\"These gardens do more than provide food\"." },
            { q: "What do supporters say is the real value?", options: ["Feeding the whole city", "Social and environmental value", "Making money"], correctIndex: 1, explanation: "\"their real value is social and environmental\"." }
          ] },
        { type: "true_false", statement: "Everyone in the text agrees the gardens can feed an entire city.", answer: false,
          explanation: "Los críticos dicen que son demasiado pequeños para alimentar una ciudad." },
        { type: "multiple_choice", question: "Which is an OPINION from the text?", options: ["Gardens cool the air", "Their real value is social", "Residents grow vegetables"],
          correctIndex: 1, explanation: "\"their real value is social\" es una opinión de los partidarios." }
      ]
    },

    "x2-lis-b2-meeting": {
      lessonId: "x2-lis-b2-meeting", level: "B2", track: "Listening", topic: "business", skill: "listening",
      title: "Listening: A team update", xpReward: 55, mascotState: "explaining",
      nextLessonId: "x2-voc-c1-idioms",
      explanation: {
        body: "Escucharás una breve actualización de equipo. Fíjate en las cifras y en quién hace qué. Usa el botón de audio para oírlo con la voz del dispositivo. (Comprensión auditiva B2.)",
        examples: [
          { en: "Sales are up by ten percent.", es: "Las ventas subieron un diez por ciento." }
        ]
      },
      exercises: [
        { type: "listening", text: "Good morning, everyone. Quick update: sales are up by ten percent this month, mainly thanks to the new website. Marketing will share the full report on Friday, and I'd like each team to send me their goals by Wednesday.",
          question: "By how much are sales up?", options: ["Five percent", "Ten percent", "Twenty percent"], correctIndex: 1,
          explanation: "\"sales are up by ten percent\"." },
        { type: "listening", text: "Good morning, everyone. Quick update: sales are up by ten percent this month, mainly thanks to the new website. Marketing will share the full report on Friday, and I'd like each team to send me their goals by Wednesday.",
          question: "When should teams send their goals?", options: ["By Wednesday", "On Friday", "Today"], correctIndex: 0,
          explanation: "\"send me their goals by Wednesday\"." },
        { type: "multiple_choice", question: "What helped sales grow?", options: ["A new website", "A new office", "Lower prices"],
          correctIndex: 0, explanation: "\"thanks to the new website\"." },
        { type: "true_false", statement: "Marketing will share the report on Monday.", answer: false,
          explanation: "Será el viernes (\"on Friday\")." }
      ]
    },

    /* ==================================================================
     * C1 / C2 — avanzado
     * ================================================================== */
    "x2-voc-c1-idioms": {
      lessonId: "x2-voc-c1-idioms", level: "C1", track: "Vocabulario", topic: "idioms", skill: "vocab",
      title: "Idioms para fluidez", xpReward: 60, mascotState: "explaining",
      nextLessonId: "x2-voc-c1-awl",
      explanation: {
        body: "Los idioms hacen tu inglés natural. 'Hit the books' (ponerse a estudiar), 'under the weather' (pachucho), 'a piece of cake' (muy fácil), 'cost an arm and a leg' (carísimo), 'on the same page' (de acuerdo). Su significado no es literal. (Expresiones idiomáticas C1.)",
        examples: [
          { en: "The exam was a piece of cake.", es: "El examen fue pan comido." },
          { en: "I'm feeling under the weather today.", es: "Hoy me siento pachucho." },
          { en: "That car cost an arm and a leg.", es: "Ese coche costó un riñón." }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Une el idiom con su significado.", pairs: [
          { l: "a piece of cake", r: "muy fácil" }, { l: "under the weather", r: "indispuesto" }, { l: "hit the books", r: "ponerse a estudiar" }, { l: "cost an arm and a leg", r: "ser carísimo" } ],
          explanation: "Significados figurados, no literales." },
        { type: "multiple_choice", question: "If something 'costs an arm and a leg', it is...", options: ["very cheap", "very expensive", "free"],
          correctIndex: 1, explanation: "Significa muy caro." },
        { type: "fill_blank", sentence: "We finally agree — we're on the same ___.", answers: ["page"],
          hint: "on the same ___.", explanation: "on the same page = de acuerdo." },
        { type: "true_false", statement: "'Hit the books' means to throw your books away.", answer: false,
          explanation: "Significa ponerse a estudiar en serio." },
        { type: "translate", prompt: "Traduce con un idiom: \"El examen fue muy fácil.\"",
          answers: ["the exam was a piece of cake", "the test was a piece of cake"], explanation: "The exam was a piece of cake." }
      ]
    },

    "x2-voc-c1-awl": {
      lessonId: "x2-voc-c1-awl", level: "C1", track: "Vocabulario", topic: "academic", skill: "vocab",
      title: "Vocabulario académico", xpReward: 60, mascotState: "explaining",
      nextLessonId: "x2-use-c1-cleft",
      explanation: {
        body: "El inglés académico usa verbos y sustantivos precisos: analyse, indicate, significant, approach, factor, consequently. \"The data indicate a significant trend.\" Aprenderlos mejora tus textos formales y exámenes. (Academic Word List.)",
        examples: [
          { en: "The results indicate a clear pattern.", es: "Los resultados indican un patrón claro." },
          { en: "This factor is highly significant.", es: "Este factor es muy significativo." },
          { en: "We adopted a new approach.", es: "Adoptamos un nuevo enfoque." }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Une la palabra académica con su sinónimo común.", pairs: [
          { l: "indicate", r: "show" }, { l: "significant", r: "important" }, { l: "sufficient", r: "enough" }, { l: "obtain", r: "get" } ],
          explanation: "Versiones formales de palabras cotidianas." },
        { type: "fill_blank", sentence: "The study ___ that prices rose. (mostró, formal)", answers: ["indicated", "showed"],
          hint: "verbo académico.", explanation: "indicated = mostró/indicó (formal)." },
        { type: "multiple_choice", question: "Which is the most formal/academic?", options: ["a lot of", "loads of", "a significant amount of"],
          correctIndex: 2, explanation: "'a significant amount of' es el registro académico." },
        { type: "true_false", statement: "'Consequently' means 'for example'.", answer: false,
          explanation: "consequently = por consiguiente (resultado), no 'por ejemplo'." },
        { type: "translate", prompt: "Traduce: \"Los resultados indican un patrón claro.\"",
          answers: ["the results indicate a clear pattern"], explanation: "The results indicate a clear pattern." }
      ]
    },

    "x2-use-c1-cleft": {
      lessonId: "x2-use-c1-cleft", level: "C1", track: "Uso del inglés", topic: "grammar", skill: "use",
      title: "Cleft sentences (énfasis)", xpReward: 60, mascotState: "explaining",
      nextLessonId: "x2-use-c1-discourse-markers",
      explanation: {
        body: "Las cleft sentences enfatizan una parte de la frase. Con 'It': \"It was John who broke it.\" Con 'What': \"What I need is a holiday.\" Permiten resaltar información sin cambiar el significado básico. (Estructuras enfáticas C1.)",
        examples: [
          { en: "It was the rain that ruined the trip.", es: "Fue la lluvia lo que arruinó el viaje." },
          { en: "What surprised me was her honesty.", es: "Lo que me sorprendió fue su honestidad." },
          { en: "It's you that I trust.", es: "Es a ti a quien confío." }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "Choose the cleft sentence emphasising 'Maria'.", options: ["Maria called me.", "It was Maria who called me.", "Maria, she called me."],
          correctIndex: 1, explanation: "It + be + X + who/that... es la estructura cleft." },
        { type: "fill_blank", sentence: "___ I really want is some peace and quiet.", answers: ["What"],
          hint: "cleft con 'What'.", explanation: "What I want is... (cleft con What)." },
        { type: "word_order", words: ["It", "was", "music", "that", "saved", "me"],
          correctOrder: ["It", "was", "music", "that", "saved", "me"], hint: "It + was + X + that..." },
        { type: "true_false", statement: "Cleft sentences are used to add emphasis.", answer: true,
          explanation: "Sí, resaltan una parte concreta de la oración." },
        { type: "translate", prompt: "Traduce: \"Lo que necesito es vacaciones.\"",
          answers: ["what i need is a holiday", "what i need is a vacation", "what i need are holidays"],
          explanation: "What I need is a holiday." }
      ]
    },

    "x2-use-c1-discourse-markers": {
      lessonId: "x2-use-c1-discourse-markers", level: "C1", track: "Uso del inglés", topic: "grammar", skill: "use",
      title: "Discourse markers", xpReward: 60, mascotState: "explaining",
      nextLessonId: "x2-read-c1-tech",
      explanation: {
        body: "Los marcadores del discurso organizan ideas y matizan: 'on the other hand' (por otro lado), 'as a result' (como resultado), 'in fact' (de hecho), 'to be honest' (siendo sincero), 'having said that' (dicho esto). Dan fluidez y cohesión. (Discourse markers C1.)",
        examples: [
          { en: "The plan is risky. Having said that, it could work.", es: "El plan es arriesgado. Dicho esto, podría funcionar." },
          { en: "On the other hand, prices are lower.", es: "Por otro lado, los precios son más bajos." },
          { en: "In fact, the opposite is true.", es: "De hecho, ocurre lo contrario." }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "Which marker introduces a CONTRAST?", options: ["as a result", "on the other hand", "in addition"],
          correctIndex: 1, explanation: "'on the other hand' presenta un contraste." },
        { type: "fill_blank", sentence: "It rained all day. ___, the match was cancelled. (resultado)", answers: ["As a result", "Consequently"],
          hint: "consecuencia.", explanation: "As a result / Consequently = como resultado." },
        { type: "categorize", instruction: "¿El marcador añade, contrasta o concluye?", buckets: [
          { id: "add", label: "Añade" }, { id: "con", label: "Contrasta" }, { id: "fin", label: "Concluye" } ], items: [
          { t: "moreover", bucket: "add" }, { t: "however", bucket: "con" }, { t: "in conclusion", bucket: "fin" }, { t: "to sum up", bucket: "fin" } ] },
        { type: "true_false", statement: "'To be honest' softens or frames a personal opinion.", answer: true,
          explanation: "Sí, introduce una opinión sincera o matizada." },
        { type: "translate", prompt: "Traduce: \"De hecho, ocurre lo contrario.\"",
          answers: ["in fact, the opposite is true", "in fact the opposite is true"], explanation: "In fact, the opposite is true." }
      ]
    },

    "x2-read-c1-tech": {
      lessonId: "x2-read-c1-tech", level: "C1", track: "Lectura", topic: "tech", skill: "reading",
      title: "Lectura: The attention economy", xpReward: 64, mascotState: "explaining",
      nextLessonId: "x2-lis-c1-lecture",
      explanation: {
        body: "Texto argumentativo sobre la economía de la atención. Practica identificar la postura del autor, el tono y las inferencias. (Comprensión lectora analítica C1.)",
        examples: [
          { en: "Our attention has become a product.", es: "Nuestra atención se ha convertido en un producto." }
        ]
      },
      exercises: [
        { type: "reading", title: "The attention economy",
          passage: "We often assume that free apps are gifts from generous companies. In reality, when a service is free, our attention is the product being sold.\n\nEvery notification, autoplay video and infinite scroll is carefully designed to keep us looking a little longer, because more time means more advertising revenue. The technology is not neutral; it is engineered to be hard to put down.\n\nNone of this makes the apps useless. The point is simply that we should use them deliberately, deciding when and why we open them, rather than letting their design decide for us.",
          questions: [
            { q: "What is the author's main claim?", options: ["Free apps are pure gifts", "Our attention is the real product", "Technology is completely neutral"], correctIndex: 1, explanation: "\"our attention is the product being sold\"." },
            { q: "The author's tone is best described as...", options: ["Alarmed and hopeless", "Critical but balanced", "Completely enthusiastic"], correctIndex: 1, explanation: "Critica el diseño pero reconoce utilidad: tono crítico pero equilibrado." },
            { q: "What does the author recommend?", options: ["Deleting all apps", "Using apps deliberately", "Ignoring the problem"], correctIndex: 1, explanation: "\"we should use them deliberately\"." }
          ] },
        { type: "true_false", statement: "The author thinks the apps are useless.", answer: false,
          explanation: "\"None of this makes the apps useless.\"" },
        { type: "multiple_choice", question: "'Engineered to be hard to put down' suggests the design is...", options: ["accidental", "intentional", "broken"],
          correctIndex: 1, explanation: "'engineered' implica intencional, diseñado a propósito." }
      ]
    },

    "x2-lis-c1-lecture": {
      lessonId: "x2-lis-c1-lecture", level: "C1", track: "Listening", topic: "science", skill: "listening",
      title: "Listening: A mini-lecture", xpReward: 60, mascotState: "explaining",
      nextLessonId: "x2-voc-c2-collocations",
      explanation: {
        body: "Escucharás el inicio de una breve charla académica. Sigue el hilo del argumento y la señalización ('first', 'however'). (Comprensión auditiva C1.)",
        examples: [
          { en: "Today I'll outline two key ideas.", es: "Hoy esbozaré dos ideas clave." }
        ]
      },
      exercises: [
        { type: "listening", text: "Good afternoon. Today I'll focus on sleep. First, sleep is not wasted time: the brain uses it to store memories and repair itself. However, modern habits, especially screens at night, delay sleep and reduce its quality. The main message is that protecting your sleep is one of the cheapest ways to improve your health.",
          question: "What is the lecture mainly about?", options: ["Exercise", "Sleep and health", "Healthy food"], correctIndex: 1,
          explanation: "\"Today I'll focus on sleep\"." },
        { type: "listening", text: "Good afternoon. Today I'll focus on sleep. First, sleep is not wasted time: the brain uses it to store memories and repair itself. However, modern habits, especially screens at night, delay sleep and reduce its quality. The main message is that protecting your sleep is one of the cheapest ways to improve your health.",
          question: "According to the speaker, what harms sleep?", options: ["Reading books", "Screens at night", "Morning coffee"], correctIndex: 1,
          explanation: "\"especially screens at night\"." },
        { type: "multiple_choice", question: "The word 'however' signals...", options: ["an example", "a contrast", "a conclusion"],
          correctIndex: 1, explanation: "'however' introduce un contraste." },
        { type: "true_false", statement: "The speaker says sleep is wasted time.", answer: false,
          explanation: "\"sleep is not wasted time\"." }
      ]
    },

    "x2-voc-c2-collocations": {
      lessonId: "x2-voc-c2-collocations", level: "C2", track: "Vocabulario", topic: "academic", skill: "vocab",
      title: "Collocations avanzadas", xpReward: 65, mascotState: "explaining",
      nextLessonId: "x2-use-c2-formality",
      explanation: {
        body: "Las collocations son combinaciones naturales de palabras. Decimos 'make a decision' (no 'do'), 'a deeply rooted belief', 'a foregone conclusion', 'pose a threat', 'bear in mind'. Usarlas bien es lo que distingue a un hablante C2. (Collocations C2.)",
        examples: [
          { en: "We need to make a difficult decision.", es: "Tenemos que tomar una decisión difícil." },
          { en: "This poses a serious threat.", es: "Esto supone una grave amenaza." },
          { en: "Bear in mind the deadline.", es: "Ten en cuenta la fecha límite." }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "Which verb collocates with 'a decision'?", options: ["do", "make", "take a"],
          correctIndex: 1, explanation: "'make a decision' es la collocation correcta." },
        { type: "matching", instruction: "Une para formar collocations naturales.", pairs: [
          { l: "pose", r: "a threat" }, { l: "bear", r: "in mind" }, { l: "draw", r: "a conclusion" }, { l: "meet", r: "a deadline" } ],
          explanation: "pose a threat, bear in mind, draw a conclusion, meet a deadline." },
        { type: "fill_blank", sentence: "Please ___ in mind that prices may change.", answers: ["bear", "keep"],
          hint: "bear/keep ___ in mind.", explanation: "bear/keep in mind = tener en cuenta." },
        { type: "true_false", statement: "'Heavy rain' is a natural collocation in English.", answer: true,
          explanation: "Sí: heavy rain (no 'strong rain')." },
        { type: "translate", prompt: "Traduce: \"Esto supone una grave amenaza.\"",
          answers: ["this poses a serious threat"], explanation: "This poses a serious threat." }
      ]
    },

    "x2-use-c2-formality": {
      lessonId: "x2-use-c2-formality", level: "C2", track: "Uso del inglés", topic: "grammar", skill: "use",
      title: "Registro y formalidad", xpReward: 65, mascotState: "explaining",
      nextLessonId: "x2-use-c2-inversion",
      explanation: {
        body: "Dominar el registro es clave en C2: saber pasar de informal a formal. 'get' → 'obtain/receive'; 'ask for' → 'request'; 'help' → 'assist'; 'a lot of problems' → 'numerous issues'. El registro formal evita phrasal verbs y contracciones. (Registro C2.)",
        examples: [
          { en: "Informal: I need to get the report.  Formal: I need to obtain the report.", es: "Conseguir → obtener." },
          { en: "Informal: Can you help me?  Formal: Could you assist me?", es: "Ayudar → asistir." }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Une el verbo informal con su equivalente formal.", pairs: [
          { l: "get", r: "obtain" }, { l: "ask for", r: "request" }, { l: "help", r: "assist" }, { l: "need", r: "require" } ],
          explanation: "Versiones formales de verbos cotidianos." },
        { type: "multiple_choice", question: "Which sentence is the most formal?", options: ["Can you send it ASAP?", "Could you please send it at your earliest convenience?", "Send it now!"],
          correctIndex: 1, explanation: "Educada, sin abreviaturas ni imperativos secos." },
        { type: "categorize", instruction: "¿Registro formal o informal?", buckets: [
          { id: "f", label: "Formal" }, { id: "i", label: "Informal" } ], items: [
          { t: "I regret to inform you", bucket: "f" }, { t: "gonna", bucket: "i" }, { t: "furthermore", bucket: "f" }, { t: "kinda", bucket: "i" } ] },
        { type: "true_false", statement: "Formal English generally avoids contractions like 'don't'.", answer: true,
          explanation: "Sí, en registro formal se prefiere 'do not'." },
        { type: "translate", prompt: "Pasa a formal: \"Can you help me?\"",
          answers: ["could you assist me", "could you please assist me", "would you assist me"], explanation: "Could you assist me?" }
      ]
    },

    "x2-use-c2-inversion": {
      lessonId: "x2-use-c2-inversion", level: "C2", track: "Uso del inglés", topic: "grammar", skill: "use",
      title: "Inversión enfática", xpReward: 65, mascotState: "explaining",
      nextLessonId: "x2-read-c2-argument",
      explanation: {
        body: "Tras expresiones negativas al inicio de la frase, invertimos sujeto y auxiliar: 'Never have I seen...', 'Not only did she win, but...', 'Rarely do we find...'. Da un tono enfático y formal. (Inversión C2.)",
        examples: [
          { en: "Never have I seen such a mess.", es: "Nunca había visto semejante desorden." },
          { en: "Not only did he apologise, but he also paid.", es: "No solo se disculpó, sino que además pagó." },
          { en: "Seldom do we get a second chance.", es: "Rara vez tenemos una segunda oportunidad." }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "Choose the correct inversion.", options: ["Never I have seen this", "Never have I seen this", "Never seen I have this"],
          correctIndex: 1, explanation: "Negativo al inicio → auxiliar + sujeto: Never have I seen." },
        { type: "fill_blank", sentence: "Not only ___ she sing, but she also dances. (auxiliar)", answers: ["does"],
          hint: "presente simple → does.", explanation: "Not only does she sing..." },
        { type: "word_order", words: ["Rarely", "do", "we", "see", "such", "talent"],
          correctOrder: ["Rarely", "do", "we", "see", "such", "talent"], hint: "Rarely + auxiliar + sujeto." },
        { type: "true_false", statement: "Inversion after a negative adverbial makes the sentence more emphatic.", answer: true,
          explanation: "Sí, aporta énfasis y formalidad." },
        { type: "translate", prompt: "Traduce con inversión: \"Nunca había visto algo así.\"",
          answers: ["never have i seen anything like this", "never had i seen anything like this", "never have i seen such a thing"],
          explanation: "Never have I seen anything like this." }
      ]
    },

    "x2-read-c2-argument": {
      lessonId: "x2-read-c2-argument", level: "C2", track: "Lectura", topic: "philosophy", skill: "reading",
      title: "Lectura: Progress and doubt", xpReward: 68, mascotState: "explaining",
      nextLessonId: "x2-biz-b1-interview",
      explanation: {
        body: "Texto denso de opinión. Practica distinguir la tesis de las concesiones, y captar la ironía y el matiz. (Comprensión lectora analítica C2.)",
        examples: [
          { en: "Progress is not the same as improvement.", es: "El progreso no es lo mismo que la mejora." }
        ]
      },
      exercises: [
        { type: "reading", title: "Progress and doubt",
          passage: "It is tempting to treat progress as an unstoppable force that always leaves us better off. Yet history suggests a more uncomfortable truth: change and improvement are not synonyms.\n\nEvery new technology solves certain problems while quietly creating others, and the people who benefit are rarely the same as those who pay the price. To question progress is not to long for the past; it is to insist that we choose our future rather than stumble into it.\n\nThe sceptic, then, is not the enemy of progress but its most useful ally — the one who asks, before we celebrate, what exactly we have gained, and at whose expense.",
          questions: [
            { q: "What is the author's central thesis?", options: ["Progress always improves life", "Change and improvement are not the same", "The past was better"], correctIndex: 1, explanation: "\"change and improvement are not synonyms\"." },
            { q: "How does the author view the sceptic?", options: ["As an enemy of progress", "As its most useful ally", "As irrelevant"], correctIndex: 1, explanation: "\"not the enemy of progress but its most useful ally\"." },
            { q: "'At whose expense' invites the reader to consider...", options: ["who pays the cost of progress", "how fast progress is", "where progress happens"], correctIndex: 0, explanation: "Pregunta quién paga el precio del progreso." }
          ] },
        { type: "true_false", statement: "The author argues we should return to the past.", answer: false,
          explanation: "\"To question progress is not to long for the past\"." },
        { type: "multiple_choice", question: "The author's attitude to 'progress' is best described as...", options: ["uncritical praise", "thoughtful scepticism", "total rejection"],
          correctIndex: 1, explanation: "Cuestiona el progreso sin rechazarlo: escepticismo reflexivo." }
      ]
    },

    /* ==================================================================
     * Inglés profesional (Business)
     * ================================================================== */
    "x2-biz-b1-interview": {
      lessonId: "x2-biz-b1-interview", level: "B1", track: "Inglés profesional", topic: "business", skill: "use",
      title: "La entrevista de trabajo", xpReward: 55, mascotState: "explaining",
      nextLessonId: "x2-biz-b1-smalltalk",
      explanation: {
        body: "En una entrevista, prepara respuestas a preguntas típicas: \"Tell me about yourself\", \"What are your strengths?\", \"Why do you want this job?\". Habla de logros con verbos de acción: managed, improved, led. Sé concreto y positivo. (Inglés para entrevistas.)",
        examples: [
          { en: "I have five years of experience in marketing.", es: "Tengo cinco años de experiencia en marketing." },
          { en: "My greatest strength is problem-solving.", es: "Mi mayor fortaleza es resolver problemas." },
          { en: "I improved sales by 20%.", es: "Mejoré las ventas un 20%." }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "Best answer to 'What are your strengths?'", options: ["I don't know.", "I'm good at teamwork and meeting deadlines.", "Nothing special."],
          correctIndex: 1, explanation: "Concreto y positivo, con ejemplos de fortalezas." },
        { type: "matching", instruction: "Une la pregunta con una buena respuesta.", pairs: [
          { l: "Tell me about yourself", r: "I'm a designer with 4 years' experience." },
          { l: "Why this job?", r: "Your company's values match mine." },
          { l: "A weakness?", r: "I'm learning to delegate more." },
          { l: "Salary?", r: "I'm flexible and open to discussion." } ],
          explanation: "Respuestas concretas, honestas y positivas." },
        { type: "fill_blank", sentence: "I ___ a team of five people. (lideré, verbo de acción)", answers: ["led", "managed"],
          hint: "verbo de acción en pasado.", explanation: "led / managed a team." },
        { type: "true_false", statement: "It's good to speak badly about your previous employer in an interview.", answer: false,
          explanation: "Evita hablar mal de empleos anteriores; suena poco profesional." },
        { type: "translate", prompt: "Traduce: \"Tengo cinco años de experiencia.\"",
          answers: ["i have five years of experience", "i have 5 years of experience"], explanation: "I have five years of experience." }
      ]
    },

    "x2-biz-b1-smalltalk": {
      lessonId: "x2-biz-b1-smalltalk", level: "B1", track: "Inglés profesional", topic: "business", skill: "use",
      title: "Small talk en la oficina", xpReward: 52, mascotState: "explaining",
      nextLessonId: "x2-biz-b2-reports",
      explanation: {
        body: "El small talk rompe el hielo antes de las reuniones. Temas seguros: el fin de semana, el tiempo, viajes, proyectos. \"How was your weekend?\", \"Any plans for the holidays?\". Evita temas delicados (sueldo, política, religión). (Conversación profesional ligera.)",
        examples: [
          { en: "How was your weekend?", es: "¿Qué tal el fin de semana?" },
          { en: "Did you have a good trip?", es: "¿Tuviste un buen viaje?" },
          { en: "It's been really busy lately, hasn't it?", es: "Ha habido mucho trabajo últimamente, ¿verdad?" }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "Which is GOOD small talk at work?", options: ["How much do you earn?", "How was your weekend?", "Why are you single?"],
          correctIndex: 1, explanation: "El fin de semana es un tema seguro y amable." },
        { type: "categorize", instruction: "¿Tema seguro o tema a evitar en el trabajo?", buckets: [
          { id: "ok", label: "Seguro" }, { id: "no", label: "Evitar" } ], items: [
          { t: "the weather", bucket: "ok" }, { t: "your salary", bucket: "no" }, { t: "weekend plans", bucket: "ok" }, { t: "politics", bucket: "no" } ] },
        { type: "fill_blank", sentence: "A: How was your weekend? B: Great, thanks. ___ you? (¿y tú?)", answers: ["And", "How about"],
          hint: "devolver la pregunta.", explanation: "\"And you?\" / \"How about you?\"" },
        { type: "true_false", statement: "Returning the question ('And you?') keeps small talk friendly.", answer: true,
          explanation: "Sí, mantiene la conversación equilibrada y cordial." },
        { type: "translate", prompt: "Traduce: \"¿Qué tal el fin de semana?\"",
          answers: ["how was your weekend"], explanation: "How was your weekend?" }
      ]
    },

    "x2-biz-b2-reports": {
      lessonId: "x2-biz-b2-reports", level: "B2", track: "Inglés profesional", topic: "business", skill: "use",
      title: "Redactar un informe", xpReward: 58, mascotState: "explaining",
      nextLessonId: "x2-biz-c1-customer-emails",
      explanation: {
        body: "Un informe profesional es claro y estructurado: Introduction, Findings, Conclusion, Recommendations. Usa lenguaje objetivo y la voz pasiva cuando importa el resultado: \"The data were analysed\". Frases útiles: \"This report aims to...\", \"It is recommended that...\". (Inglés para informes.)",
        examples: [
          { en: "This report aims to assess customer satisfaction.", es: "Este informe pretende evaluar la satisfacción del cliente." },
          { en: "The findings suggest a clear trend.", es: "Los resultados sugieren una tendencia clara." },
          { en: "It is recommended that we update the website.", es: "Se recomienda actualizar el sitio web." }
        ]
      },
      exercises: [
        { type: "word_order", words: ["This", "report", "aims", "to", "evaluate", "the", "results"],
          correctOrder: ["This", "report", "aims", "to", "evaluate", "the", "results"], hint: "Frase introductoria típica de informe." },
        { type: "matching", instruction: "Une la sección con su contenido.", pairs: [
          { l: "Introduction", r: "purpose of the report" }, { l: "Findings", r: "the data and results" }, { l: "Conclusion", r: "what it all means" }, { l: "Recommendations", r: "suggested actions" } ],
          explanation: "Estructura estándar de un informe." },
        { type: "multiple_choice", question: "Most appropriate for a formal report?", options: ["Things went pretty well I guess.", "The results were largely positive.", "It was awesome!"],
          correctIndex: 1, explanation: "Objetivo y formal: 'The results were largely positive.'" },
        { type: "fill_blank", sentence: "It is ___ that the team meets weekly. (se recomienda)", answers: ["recommended"],
          hint: "It is ___ that...", explanation: "It is recommended that..." },
        { type: "true_false", statement: "Reports usually mix in jokes and slang to sound friendly.", answer: false,
          explanation: "Un informe mantiene un tono objetivo y formal." }
      ]
    },

    "x2-biz-c1-customer-emails": {
      lessonId: "x2-biz-c1-customer-emails", level: "C1", track: "Inglés profesional", topic: "business", skill: "use",
      title: "Emails a clientes difíciles", xpReward: 62, mascotState: "explaining",
      nextLessonId: null,
      explanation: {
        body: "Responder a una queja requiere tacto. Reconoce el problema, discúlpate con medida, ofrece una solución y cierra con cortesía. Suaviza con lenguaje diplomático: \"I understand your frustration\", \"I do apologise for the inconvenience\", \"We would be happy to...\". (Emails de atención al cliente.)",
        examples: [
          { en: "Thank you for bringing this to our attention.", es: "Gracias por hacérnoslo saber." },
          { en: "I do apologise for the inconvenience caused.", es: "Lamento las molestias ocasionadas." },
          { en: "We would be happy to offer you a full refund.", es: "Estaríamos encantados de ofrecerle un reembolso completo." }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "Best opening for a complaint reply?", options: ["You're wrong about this.", "Thank you for bringing this to our attention.", "Calm down, please."],
          correctIndex: 1, explanation: "Reconoce y agradece el contacto con tacto." },
        { type: "matching", instruction: "Une la función con la frase diplomática.", pairs: [
          { l: "Apologise", r: "I do apologise for the inconvenience." },
          { l: "Empathise", r: "I understand your frustration." },
          { l: "Offer a solution", r: "We would be happy to replace the item." },
          { l: "Close politely", r: "Please don't hesitate to contact me." } ],
          explanation: "Estructura de una respuesta a quejas." },
        { type: "fill_blank", sentence: "I do ___ for the delay in our reply. (disculparse)", answers: ["apologise", "apologize"],
          hint: "verbo de disculpa.", explanation: "I do apologise/apologize for..." },
        { type: "true_false", statement: "In a complaint reply, it's best to blame the customer.", answer: false,
          explanation: "Nunca culpes al cliente; reconoce y ofrece solución." },
        { type: "translate", prompt: "Traduce: \"Lamento las molestias.\"",
          answers: ["i apologise for the inconvenience", "i apologize for the inconvenience", "i do apologise for the inconvenience"],
          explanation: "I apologise for the inconvenience." }
      ]
    }

  };

  var ORDER = [
    /* A1/A2 */ "x2-voc-a1-food", "x2-voc-a1-body", "x2-voc-a1-clothes", "x2-gram-a1-possessives",
    "x2-gram-a2-prepositions-place", "x2-gram-a2-adverbs-frequency", "x2-voc-a2-time-dates", "x2-read-a2-daily",
    /* B1/B2 */ "x2-gram-b1-second-conditional", "x2-gram-b1-used-to", "x2-use-b1-phrasal-verbs-2", "x2-read-b1-travel",
    "x2-gram-b2-third-conditional", "x2-gram-b2-future-continuous", "x2-use-b2-connectors", "x2-use-b2-word-formation",
    "x2-read-b2-environment", "x2-lis-b2-meeting",
    /* C1/C2 */ "x2-voc-c1-idioms", "x2-voc-c1-awl", "x2-use-c1-cleft", "x2-use-c1-discourse-markers",
    "x2-read-c1-tech", "x2-lis-c1-lecture", "x2-voc-c2-collocations", "x2-use-c2-formality",
    "x2-use-c2-inversion", "x2-read-c2-argument",
    /* Inglés profesional */ "x2-biz-b1-interview", "x2-biz-b1-smalltalk", "x2-biz-b2-reports", "x2-biz-c1-customer-emails"
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
