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
      lessonId: "x2-voc-a1-food", level: "A1", track: "Expresiones", topic: "social", skill: "use", tipo: "aprende", title: "Saludar y despedirse", rev: 2, xpReward: 40, mascotState: "explaining",
      nextLessonId: "x2-voc-a1-body",
      explanation: {
        body: "Episodio 4 · Es el cumpleaños de Mia y Sam conoce a sus amigos. Aprende a saludar, presentar a alguien y despedirte. Saludos: Hi / Hello (siempre), Good morning (mañana), Good afternoon (tarde), Good evening (noche, al llegar). Good night es solo para despedirse o antes de dormir. Presentar: This is Sam. Responder: Nice to meet you. — Nice to meet you too. Despedidas: Bye! / See you later! / See you tomorrow!",
        examples: [
          { en: "Good evening, everyone! This is Sam, my new flatmate.", es: "¡Buenas noches a todos! Él es Sam, mi nuevo compañero de piso." },
          { en: "Hi, Sam! Nice to meet you.", es: "¡Hola, Sam! Mucho gusto." },
          { en: "Nice to meet you too.", es: "Igualmente." },
          { en: "It's late. Good night, everyone!", es: "Es tarde. ¡Buenas noches a todos!" }
        ],
        sections: [
          { kind: "intro", body: "Episodio 4 · Es el cumpleaños de Mia y Sam conoce a sus amigos. Aprende a saludar, presentar a alguien y despedirte." },
          {
            kind: "regla",
            body: "Saludos: Hi / Hello (siempre), Good morning (mañana), Good afternoon (tarde), Good evening (noche, al llegar). Good night es solo para despedirse o antes de dormir. Presentar: This is Sam. Responder: Nice to meet you. — Nice to meet you too. Despedidas: Bye! / See you later! / See you tomorrow!"
          },
          {
            kind: "vocab",
            items: [
              { en: "hello / hi", ipa: "həˈləʊ / haɪ", es: "hola" },
              { en: "good morning", ipa: "ɡʊd ˈmɔːnɪŋ", es: "buenos días" },
              { en: "good afternoon", ipa: "ɡʊd ˌɑːftəˈnuːn", es: "buenas tardes" },
              { en: "good evening", ipa: "ɡʊd ˈiːvnɪŋ", es: "buenas noches (al llegar)" },
              { en: "good night", ipa: "ɡʊd naɪt", es: "buenas noches (al irte)" },
              { en: "goodbye / bye", ipa: "ɡʊdˈbaɪ / baɪ", es: "adiós" },
              { en: "see you later", ipa: "siː juː ˈleɪtə", es: "nos vemos luego" },
              { en: "nice to meet you", ipa: "naɪs tə miːt juː", es: "mucho gusto" }
            ]
          },
          {
            kind: "expresiones",
            items: [
              { en: "This is my friend...", es: "Te presento a mi amigo/a..." },
              { en: "Nice to meet you too.", es: "Igualmente, mucho gusto." },
              { en: "How are you? — Fine, thanks.", es: "¿Cómo estás? — Bien, gracias." },
              { en: "See you soon!", es: "¡Nos vemos pronto!" }
            ]
          },
          {
            kind: "ejemplos",
            items: [
              { en: "Mia: Good evening, everyone! This is Sam, my new flatmate.", es: "Mia: ¡Buenas noches a todos! Él es Sam, mi nuevo compañero de piso." },
              { en: "Ana: Hi, Sam! Nice to meet you.", es: "Ana: ¡Hola, Sam! Mucho gusto." },
              { en: "Sam: Nice to meet you too.", es: "Sam: Igualmente." },
              { en: "Sam: It's late. Good night, everyone!", es: "Sam: Es tarde. ¡Buenas noches a todos!" }
            ]
          },
          {
            kind: "errores",
            items: [
              { no: "Good night! (al llegar a una fiesta)", si: "Good evening! / Hi!", pq: "Good night solo se usa al despedirte." },
              { no: "Nice to know you.", si: "Nice to meet you.", pq: "Al conocer a alguien se dice meet." },
              { no: "I present you Sam.", si: "This is Sam.", pq: "Para presentar a alguien: This is..." }
            ]
          },
          { kind: "resumen", body: "Llegar: Hi / Good morning / Good afternoon / Good evening. Presentar: This is... → Nice to meet you. Irte: Bye / See you later / Good night." },
          { kind: "puente", body: "¡A la fiesta! Saluda, presenta y despídete." }
        ]
      },
      exercises: [
        {
          type: "categorize", instruction: "¿Saludo o despedida?",
          buckets: [{ id: "greet", label: "Saludo" }, { id: "bye", label: "Despedida" }],
          items: [
            { t: "Hello!", bucket: "greet" },
            { t: "Good morning!", bucket: "greet" },
            { t: "Good evening!", bucket: "greet" },
            { t: "Good night!", bucket: "bye" },
            { t: "See you later!", bucket: "bye" },
            { t: "Goodbye!", bucket: "bye" }
          ]
        },
        {
          type: "multiple_choice", question: "Llegas a una cena a las 8 de la noche. Dices:", options: ["Good evening!", "Good night!", "Goodbye!"], correctIndex: 0,
          explanation: "Al llegar en la noche: Good evening."
        },
        { type: "listening", text: "Hi, I'm Ana. Nice to meet you!", question: "¿Qué respondes?", options: ["Nice to meet you too.", "Good night.", "See you later."], correctIndex: 0 },
        { type: "word_order", words: ["Sam", "This", "friend", "is", "my"], correctOrder: ["This", "is", "my", "friend", "Sam"], hint: "Para presentar: This is..." },
        { type: "fill_blank", sentence: "Nice to ___ you.", answers: ["meet"], hint: "conocer (a alguien por primera vez)", explanation: "Nice to meet you." },
        {
          type: "matching", instruction: "Une cada frase con su significado.",
          pairs: [{ l: "Good morning", r: "Buenos días" }, { l: "See you later", r: "Nos vemos luego" }, { l: "Good night", r: "Buenas noches (al irte)" }, { l: "Nice to meet you", r: "Mucho gusto" }]
        },
        { type: "speak", text: "Nice to meet you too.", es: "Igualmente, mucho gusto." },
        { type: "translate", prompt: "Traduce: \"Nos vemos mañana.\"", answers: ["see you tomorrow", "i'll see you tomorrow"], explanation: "See you tomorrow." }
      ]
    },

    "x2-voc-a1-body": {
      lessonId: "x2-voc-a1-body", level: "A1", track: "Vocabulario", topic: "freetime", skill: "vocab", tipo: "aprende", title: "Hobbies y tiempo libre", rev: 2, xpReward: 40, mascotState: "explaining",
      nextLessonId: "x2-voc-a1-clothes",
      explanation: {
        body: "¿Qué haces en tu tiempo libre? Con estas palabras puedes hablar de tus pasatiempos y preguntar por los de otras personas. Ojo con el verbo: play + deportes con pelota, videojuegos e instrumentos (play football, play the guitar); go + actividad en -ing (go swimming, go shopping); do + otras actividades (do yoga, do karate).",
        examples: [
          { en: "What do you do in your free time?", es: "¿Qué haces en tu tiempo libre?" },
          { en: "I take photos of the sea. And you?", es: "Tomo fotos del mar. ¿Y tú?" },
          { en: "I play the guitar and I go swimming on Sundays.", es: "Toco la guitarra y voy a nadar los domingos." },
          { en: "That sounds fun!", es: "¡Suena divertido!" }
        ],
        sections: [
          { kind: "intro", body: "¿Qué haces en tu tiempo libre? Con estas palabras puedes hablar de tus pasatiempos y preguntar por los de otras personas." },
          {
            kind: "regla",
            body: "Ojo con el verbo: play + deportes con pelota, videojuegos e instrumentos (play football, play the guitar); go + actividad en -ing (go swimming, go shopping); do + otras actividades (do yoga, do karate)."
          },
          {
            kind: "vocab",
            items: [
              { en: "play football", ipa: "pleɪ ˈfʊtbɔːl", es: "jugar fútbol" },
              { en: "go swimming", ipa: "gəʊ ˈswɪmɪŋ", es: "ir a nadar" },
              { en: "read books", ipa: "riːd bʊks", es: "leer libros" },
              { en: "watch films", ipa: "wɒtʃ fɪlmz", es: "ver películas" },
              { en: "play the guitar", ipa: "pleɪ ðə ɡɪˈtɑː", es: "tocar la guitarra" },
              { en: "do yoga", ipa: "duː ˈjəʊɡə", es: "hacer yoga" },
              { en: "go shopping", ipa: "gəʊ ˈʃɒpɪŋ", es: "ir de compras" },
              { en: "take photos", ipa: "teɪk ˈfəʊtəʊz", es: "tomar fotos" }
            ]
          },
          {
            kind: "expresiones",
            items: [
              { en: "What do you do in your free time?", es: "¿Qué haces en tu tiempo libre?" },
              { en: "In my free time, I...", es: "En mi tiempo libre, yo..." },
              { en: "Do you want to play?", es: "¿Quieres jugar?" },
              { en: "That sounds fun!", es: "¡Suena divertido!" }
            ]
          },
          {
            kind: "ejemplos",
            items: [
              { en: "Sam: What do you do in your free time?", es: "Sam: ¿Qué haces en tu tiempo libre?" },
              { en: "Mia: I take photos of the sea. And you?", es: "Mia: Tomo fotos del mar. ¿Y tú?" },
              { en: "Sam: I play the guitar and I go swimming on Sundays.", es: "Sam: Toco la guitarra y voy a nadar los domingos." },
              { en: "Mia: That sounds fun!", es: "Mia: ¡Suena divertido!" }
            ]
          },
          {
            kind: "errores",
            items: [
              { no: "I play yoga.", si: "I do yoga.", pq: "Con yoga se usa do." },
              { no: "I go to swimming.", si: "I go swimming.", pq: "go + actividad en -ing, sin to." },
              { no: "I make photos.", si: "I take photos.", pq: "Las fotos se toman con take, no con make." }
            ]
          },
          { kind: "resumen", body: "play + pelota, videojuegos e instrumentos. go + -ing. do + yoga, karate y otras actividades. Fotos: take photos." },
          { kind: "puente", body: "Ahora practica el vocabulario y cuenta qué haces tú en tu tiempo libre." }
        ]
      },
      exercises: [
        {
          type: "matching", instruction: "Une cada actividad con su significado.",
          pairs: [
            { l: "play football", r: "jugar fútbol" },
            { l: "go swimming", r: "ir a nadar" },
            { l: "read books", r: "leer libros" },
            { l: "watch films", r: "ver películas" },
            { l: "take photos", r: "tomar fotos" },
            { l: "do yoga", r: "hacer yoga" }
          ]
        },
        {
          type: "categorize", instruction: "¿Va con play, go o do?",
          buckets: [{ id: "play", label: "play" }, { id: "go", label: "go" }, { id: "do", label: "do" }],
          items: [
            { t: "football", bucket: "play" },
            { t: "video games", bucket: "play" },
            { t: "the guitar", bucket: "play" },
            { t: "swimming", bucket: "go" },
            { t: "shopping", bucket: "go" },
            { t: "yoga", bucket: "do" },
            { t: "karate", bucket: "do" }
          ]
        },
        { type: "multiple_choice", question: "I ___ photos of the beach.", options: ["take", "make", "do"], correctIndex: 0, explanation: "Fotos: take photos." },
        {
          type: "listening", text: "On Saturdays I go shopping with my sister, and on Sundays I read books.", question: "¿Qué hace los domingos?", options: ["Lee libros", "Va de compras", "Juega fútbol"],
          correctIndex: 0
        },
        { type: "fill_blank", sentence: "Sam plays ___ guitar every evening.", answers: ["the"], hint: "Los instrumentos suelen llevar artículo.", explanation: "play the guitar" },
        { type: "true_false", statement: "\"Go swimming\" significa \"ir a nadar\".", answer: true, explanation: "go + -ing = ir a hacer una actividad." },
        { type: "speak", text: "What do you do in your free time?", es: "¿Qué haces en tu tiempo libre?" },
        { type: "translate", prompt: "Traduce: \"Hago yoga los lunes.\"", answers: ["i do yoga on mondays", "i do yoga on monday", "i do yoga every monday"], explanation: "I do yoga on Mondays." }
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
        { type: "multiple_choice", question: "She ___ a red dress today.", options: ["is putting", "wears on", "is wearing"],
          correctIndex: 2, explanation: "'is wearing' = lleva puesto ahora mismo." },
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
        { type: "multiple_choice", question: "The book is ___ the table (surface).", options: ["on", "in", "under"],
          correctIndex: 0, explanation: "Sobre una superficie → on the table." },
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
        { type: "multiple_choice", question: "Correct order with 'to be'?", options: ["He always is happy", "Always he is happy", "He is always happy"],
          correctIndex: 2, explanation: "Tras 'be' el adverbio va después: He is always happy." },
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
            { q: "How does he go to work?", options: ["By bus", "By bike", "By car"], correctIndex: 0, explanation: "\"he takes the bus\"." },
            { q: "When is he always tired?", options: ["At the weekend", "On Monday", "On Friday"], correctIndex: 2, explanation: "\"he is always tired on Friday\"." }
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
      lessonId: "x2-gram-b1-second-conditional", level: "B1", track: "Grammar", topic: "grammar", skill: "grammar", tipo: "aprende", title: "Question tags: You're new, aren't you?", rev: 2, xpReward: 50,
      mascotState: "explaining", nextLessonId: "x2-gram-b1-used-to",
      explanation: {
        body: "Carmen is new at Lumen Travel, and her colleagues keep saying things like \"You're from Mexico, aren't you?\" These short questions at the end of a sentence are question tags. They keep a conversation going. Positive sentence → negative tag: You're new, aren't you? Negative sentence → positive tag: You don't drink coffee, do you? Repeat the same auxiliary (be, do, have, can, will...). If there is no auxiliary, use do / does / did: She works here, doesn't she? Special cases: I'm late, aren't I? Let's go, shall we? Falling intonation = you expect agreement; rising intonation = a real question.",
        examples: [
          { en: "You're the new designer, aren't you?" },
          { en: "Yes, I am. I started on Monday." },
          { en: "You're from Mexico, aren't you? — Carmen: That's right, from Guadalajara." },
          { en: "You haven't met Priya yet, have you? Come on, I'll introduce you." }
        ],
        sections: [
          {
            kind: "intro",
            body: "Carmen is new at Lumen Travel, and her colleagues keep saying things like \"You're from Mexico, aren't you?\" These short questions at the end of a sentence are question tags. They keep a conversation going."
          },
          {
            kind: "regla",
            body: "Positive sentence → negative tag: You're new, aren't you? Negative sentence → positive tag: You don't drink coffee, do you? Repeat the same auxiliary (be, do, have, can, will...). If there is no auxiliary, use do / does / did: She works here, doesn't she? Special cases: I'm late, aren't I? Let's go, shall we? Falling intonation = you expect agreement; rising intonation = a real question."
          },
          {
            kind: "vocab",
            items: [
              { en: "question tag", es: "a short question added to the end of a sentence" },
              { en: "auxiliary", ipa: "ɔːɡˈzɪliəri", es: "a helping verb such as be, do, have or will" },
              { en: "intonation", ipa: "ˌɪntəˈneɪʃən", es: "the rise and fall of your voice" },
              { en: "colleague", ipa: "ˈkɒliːɡ", es: "a person you work with" },
              { en: "confirm", ipa: "kənˈfɜːm", es: "check that something is true" },
              { en: "small talk", es: "light, friendly conversation" },
              { en: "new starter", es: "someone who has just joined a company" },
              { en: "introduce", ipa: "ˌɪntrəˈdjuːs", es: "tell people each other's names when they first meet" }
            ]
          },
          {
            kind: "expresiones",
            items: [
              { en: "You're new here, aren't you?", es: "start a friendly conversation" },
              { en: "It's cold today, isn't it?", es: "classic small talk" },
              { en: "You haven't met Priya, have you?", es: "offer to introduce someone" },
              { en: "Let's grab a coffee, shall we?", es: "make a friendly suggestion" }
            ]
          },
          {
            kind: "ejemplos",
            items: [
              { en: "Tom: You're the new designer, aren't you?" },
              { en: "Carmen: Yes, I am. I started on Monday." },
              { en: "Tom: You're from Mexico, aren't you? — Carmen: That's right, from Guadalajara." },
              { en: "Tom: You haven't met Priya yet, have you? Come on, I'll introduce you." }
            ]
          },
          {
            kind: "errores",
            items: [
              { no: "You're new, isn't it?", si: "You're new, aren't you?", pq: "The tag repeats the same verb and subject: you are → aren't you?" },
              { no: "She works here, isn't she?", si: "She works here, doesn't she?", pq: "The present simple has no auxiliary, so use does / doesn't." },
              { no: "You don't like tea, don't you?", si: "You don't like tea, do you?", pq: "Negative sentence → positive tag." }
            ]
          },
          { kind: "resumen", body: "Positive sentence + negative tag; negative sentence + positive tag. Same auxiliary and subject. No auxiliary? Use do / does / did. I'm... → aren't I? Let's... → shall we?" },
          { kind: "puente", body: "Try some small talk with Carmen's new colleagues." }
        ]
      },
      exercises: [
        {
          type: "matching", instruction: "Match each sentence with its tag.",
          pairs: [
            { l: "You're new,", r: "aren't you?" },
            { l: "She can drive,", r: "can't she?" },
            { l: "They didn't call,", r: "did they?" },
            { l: "He works here,", r: "doesn't he?" },
            { l: "We've met before,", r: "haven't we?" }
          ]
        },
        { type: "multiple_choice", question: "Carmen speaks Spanish, ___?", options: ["doesn't she", "isn't she", "don't she"], correctIndex: 0, explanation: "Present simple with she → doesn't she?" },
        {
          type: "find_error",
          segments: ["You ", { u: "don't" }, " like ", { u: "spicy" }, " food, ", { u: "don't you" }, "?"],
          correctIndex: 2, correction: "do you", explanation: "Negative sentence → positive tag: You don't like spicy food, do you?", question: "Find the mistake"
        },
        { type: "fill_blank", sentence: "I'm late again, ___ I?", answers: ["aren't"], hint: "A special case with I am.", explanation: "I'm late, aren't I?" },
        {
          type: "listening", text: "It's a lovely day, isn't it?", question: "What is the speaker doing?",
          options: ["Making small talk and expecting agreement", "Asking for the weather forecast", "Complaining about the weather"], correctIndex: 0
        },
        {
          type: "categorize", instruction: "Which kind of tag does each sentence need?",
          buckets: [{ id: "pos", label: "Positive tag (do you? / is it?)" }, { id: "neg", label: "Negative tag (don't you? / isn't it?)" }],
          items: [
            { t: "You don't eat meat, ...", bucket: "pos" },
            { t: "It isn't far, ...", bucket: "pos" },
            { t: "She hasn't finished, ...", bucket: "pos" },
            { t: "You like jazz, ...", bucket: "neg" },
            { t: "It's expensive, ...", bucket: "neg" },
            { t: "They've left, ...", bucket: "neg" }
          ]
        },
        { type: "speak", text: "You're from Mexico, aren't you?", explanation: "Use falling intonation on the tag: you're checking something you already believe." },
        {
          type: "translate", prompt: "Add a question tag: \"Daniel will be at the meeting.\"", answers: ["daniel will be at the meeting won't he", "he will be at the meeting won't he"],
          explanation: "Daniel will be at the meeting, won't he?"
        }
      ]
    },

    "x2-gram-b1-used-to": {
      lessonId: "x2-gram-b1-used-to", level: "B1", track: "Grammar", topic: "grammar", skill: "grammar",
      title: "used to: past habits", xpReward: 50, mascotState: "explaining",
      nextLessonId: "x2-use-b1-phrasal-verbs-2",
      explanation: {
        body: "\"used to + infinitive\" describes past habits or states that no longer happen: \"I used to smoke\" (I smoked before, but not now). In negatives and questions the -d disappears: \"I didn't use to...\", \"Did you use to...?\".",
        examples: [
          { en: "I used to live in Madrid." },
          { en: "She didn't use to like coffee." },
          { en: "Did you use to play football?" }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "Negative form?", options: ["I didn't used to", "I usedn't", "I didn't use to"],
          correctIndex: 2, explanation: "In the negative the -d disappears: didn't use to." },
        { type: "fill_blank", sentence: "I ___ play tennis, but I stopped years ago.", answers: ["used to"],
          hint: "A past habit.", explanation: "used to play." },
        { type: "true_false", statement: "'I used to live there' means I live there now.", answer: false,
          explanation: "It means I lived there before, but not now." },
        { type: "translate", prompt: "Rewrite with 'used to': I lived in Madrid in the past, but I don't live there now.",
          answers: ["i used to live in madrid"], explanation: "I used to live in Madrid." },
        { type: "word_order", words: ["She", "used", "to", "have", "long", "hair"],
          correctOrder: ["She", "used", "to", "have", "long", "hair"], hint: "used to + infinitive." }
      ]
    },

    "x2-use-b1-phrasal-verbs-2": {
      lessonId: "x2-use-b1-phrasal-verbs-2", level: "B1", track: "Functional English", topic: "customer", skill: "use", tipo: "aprende", title: "Complaining politely (and handling complaints)", rev: 2,
      xpReward: 50, mascotState: "explaining", nextLessonId: "x2-read-b1-travel",
      explanation: {
        body: "Episode 1 · It's Carmen's second week at Lumen Travel, and her new laptop keeps crashing. Later, she answers a call from an unhappy customer. Today you learn both sides: how to complain politely and how to respond. To complain: start softly (I'm afraid there's a problem with... / I'm sorry to say this, but...), explain the facts, then ask for action (Could you look into it? / I'd like a refund, please). To respond: apologise and show you understand (I'm really sorry about that. I can see why you're upset.), then offer a solution (I'll sort it out right away. / Let me check what happened.).",
        examples: [
          { en: "Hi, I'm afraid there's a problem with my laptop. It keeps crashing." },
          { en: "Oh no, sorry about that. Let me look into it." },
          { en: "I booked a hotel through your app, but the booking has disappeared!" },
          { en: "I'm really sorry for the inconvenience. I'll sort it out right away." }
        ],
        sections: [
          {
            kind: "intro",
            body: "Episode 1 · It's Carmen's second week at Lumen Travel, and her new laptop keeps crashing. Later, she answers a call from an unhappy customer. Today you learn both sides: how to complain politely and how to respond."
          },
          {
            kind: "regla",
            body: "To complain: start softly (I'm afraid there's a problem with... / I'm sorry to say this, but...), explain the facts, then ask for action (Could you look into it? / I'd like a refund, please). To respond: apologise and show you understand (I'm really sorry about that. I can see why you're upset.), then offer a solution (I'll sort it out right away. / Let me check what happened.)."
          },
          {
            kind: "vocab",
            items: [
              { en: "complaint", ipa: "kəmˈpleɪnt", es: "a statement that something is wrong or not good enough" },
              { en: "refund", ipa: "ˈriːfʌnd", es: "money given back to a customer" },
              { en: "faulty", ipa: "ˈfɔːlti", es: "not working correctly" },
              { en: "replace", ipa: "rɪˈpleɪs", es: "give a new one instead of a broken one" },
              { en: "sort out", es: "solve a problem" },
              { en: "look into", es: "investigate" },
              { en: "inconvenience", ipa: "ˌɪnkənˈviːniəns", es: "trouble or difficulty caused to someone" },
              { en: "keep (doing)", es: "continue to happen again and again" }
            ]
          },
          {
            kind: "expresiones",
            items: [
              { en: "I'm afraid there's a problem with...", es: "a polite way to start a complaint" },
              { en: "It keeps crashing.", es: "describe a repeated problem" },
              { en: "I'm really sorry about that.", es: "apologise sincerely" },
              { en: "I'll sort it out right away.", es: "promise quick action" }
            ]
          },
          {
            kind: "ejemplos",
            items: [
              { en: "Carmen: Hi, I'm afraid there's a problem with my laptop. It keeps crashing." },
              { en: "Technician: Oh no, sorry about that. Let me look into it." },
              { en: "Customer: I booked a hotel through your app, but the booking has disappeared!" },
              { en: "Carmen: I'm really sorry for the inconvenience. I'll sort it out right away." }
            ]
          },
          {
            kind: "errores",
            items: [
              { no: "I want my money back now!", si: "I'd like a refund, please.", pq: "Say clearly what you want, but politely." },
              { no: "The laptop keeps to crash.", si: "The laptop keeps crashing.", pq: "keep + -ing describes a repeated action." },
              { no: "Sorry for the inconvenient.", si: "Sorry for the inconvenience.", pq: "inconvenience is the noun; inconvenient is the adjective." }
            ]
          },
          { kind: "resumen", body: "Complain: soft opener + facts + request. Respond: apologise + show understanding + solution. Useful verbs: sort out, look into, replace, refund." },
          { kind: "puente", body: "Now you're on both sides of the counter." }
        ]
      },
      exercises: [
        {
          type: "listening",
          text: "I'm afraid the heating in my room isn't working. Could you send someone to look at it?", question: "What does the guest want?",
          options: ["Someone to fix the heating", "A different hotel", "A refund"], correctIndex: 0
        },
        {
          type: "categorize", instruction: "Who says it: the customer or the company?",
          buckets: [{ id: "cust", label: "Customer" }, { id: "comp", label: "Company" }],
          items: [
            { t: "I'd like a refund, please.", bucket: "cust" },
            { t: "It keeps crashing.", bucket: "cust" },
            { t: "This isn't what I ordered.", bucket: "cust" },
            { t: "Let me look into it.", bucket: "comp" },
            { t: "I'll sort it out right away.", bucket: "comp" },
            { t: "Sorry for the inconvenience.", bucket: "comp" }
          ]
        },
        {
          type: "multiple_choice", question: "Which is the most polite way to complain?",
          options: ["I'm afraid my order hasn't arrived yet. Could you check it for me?", "Where's my order? This is ridiculous.", "You lost my order again."], correctIndex: 0,
          explanation: "A soft opener + facts + a polite request."
        },
        {
          type: "matching", instruction: "Match each word with its meaning.",
          pairs: [
            { l: "refund", r: "money given back to a customer" },
            { l: "faulty", r: "not working correctly" },
            { l: "replace", r: "give a new one instead of a broken one" },
            { l: "look into", r: "investigate" },
            { l: "sort out", r: "solve a problem" }
          ]
        },
        {
          type: "find_error",
          segments: ["My phone ", { u: "keeps" }, " ", { u: "to switch" }, " off, so ", { u: "could" }, " you replace it?"],
          correctIndex: 1, correction: "switching", explanation: "keep + -ing: My phone keeps switching off.", question: "Find the mistake"
        },
        {
          type: "fill_blank", sentence: "I'm really sorry for the ___. We'll send you a new one today.", answers: ["inconvenience", "trouble", "delay"], hint: "A noun for the problem you caused.",
          explanation: "Sorry for the inconvenience."
        },
        { type: "speak", text: "I'm afraid there's a problem with my laptop. It keeps crashing." },
        {
          type: "translate", prompt: "Make this request more polite, starting with \"Could\": \"Change my room.\"",
          answers: ["could you change my room please", "could you change my room", "could i change my room please", "could i change rooms please", "could i change rooms"],
          explanation: "Could you change my room, please?"
        }
      ]
    },

    "x2-read-b1-travel": {
      lessonId: "x2-read-b1-travel", level: "B1", track: "Reading", topic: "travel", skill: "reading", title: "Reading: Slow travel", xpReward: 55, mascotState: "explaining",
      nextLessonId: "x2-gram-b2-third-conditional",
      explanation: { body: "A text about a calmer way to travel. Practise guessing meaning from context and finding specific information.", examples: [{ en: "Instead of rushing, they stay longer." }] },
      exercises: [
        {
          type: "reading", title: "Slow travel",
          passage: "More and more people are choosing 'slow travel'. Instead of visiting five cities in a week, they stay in one place for several days.\n\nSlow travellers often rent a flat, cook their own food, and talk to local people. They say this helps them understand a culture better than a quick tour.\n\nIt is also cheaper and better for the planet, because they take fewer flights. For many, the goal is not to see everything, but to feel at home in a new place.",
          questions: [
            {
              q: "What do slow travellers do?",
              options: ["Visit many cities fast", "Stay longer in one place", "Only take guided tours of famous sights"], correctIndex: 1, explanation: "\"they stay in one place for several days\"."
            },
            { q: "Why is slow travel better for the planet?", options: ["They take fewer flights", "They walk everywhere", "They never eat out"], correctIndex: 0, explanation: "\"they take fewer flights\"." },
            {
              q: "What is the main goal for many slow travellers?", options: ["To see everything", "To save time", "To feel at home in a new place"], correctIndex: 2,
              explanation: "\"to feel at home in a new place\"."
            }
          ]
        },
        { type: "true_false", statement: "Slow travel is more expensive than fast tourism, according to the text.", answer: false, explanation: "The text says it is cheaper (\"cheaper\")." },
        {
          type: "multiple_choice", question: "In the text, the word \"goal\" is closest in meaning to...", options: ["aim", "problem", "price"], correctIndex: 0,
          explanation: "goal = aim, the thing you want to achieve."
        },
        { type: "fill_blank", sentence: "Slow travellers often rent a ___ and cook their own food.", answers: ["flat", "apartment"], hint: "A place to live for a few days.", explanation: "...rent a flat..." },
        {
          type: "matching", instruction: "Match each word from the text with its meaning.",
          pairs: [{ l: "flat", r: "an apartment" }, { l: "local", r: "from the area where you are" }, { l: "culture", r: "the customs and way of life of a group" }, { l: "planet", r: "the Earth" }]
        },
        {
          type: "listening", text: "For many, the goal is not to see everything, but to feel at home in a new place.", question: "What is the main idea?",
          options: ["Feeling at home matters more than seeing everything", "Seeing everything is the goal", "Travelling is too expensive"], correctIndex: 0
        }
      ]
    },

    "x2-gram-b2-third-conditional": {
      lessonId: "x2-gram-b2-third-conditional", level: "B2", track: "Grammar", topic: "grammar", skill: "grammar", tipo: "aprende", title: "Past modals: should have, could have, must have", rev: 2, xpReward: 55,
      mascotState: "explaining", nextLessonId: "x2-gram-b2-future-continuous",
      explanation: {
        body: "The client presentation went badly. The projector failed, the slides had typos and the client left early. Now the team is looking back: what should they have done? What might have happened? Past modals help you criticise, regret and speculate about the past. modal + have + past participle. Criticism or regret: should have / shouldn't have (We should have tested the projector). An option you didn't take: could have (We could have used a laptop instead). Past speculation: might / may / could have (He might have missed the email); must have = almost sure it's true (She must have been tired); can't / couldn't have = almost sure it's not true (He can't have seen it; he was on holiday).",
        examples: [
          { en: "We should have rehearsed the presentation at least once." },
          { en: "And we could have brought a backup laptop." },
          { en: "The client left early. He must have been bored." },
          { en: "Or he might have had another meeting. Anyway, it could have been worse!" }
        ],
        sections: [
          {
            kind: "intro",
            body: "The client presentation went badly. The projector failed, the slides had typos and the client left early. Now the team is looking back: what should they have done? What might have happened? Past modals help you criticise, regret and speculate about the past."
          },
          {
            kind: "regla",
            body: "modal + have + past participle. Criticism or regret: should have / shouldn't have (We should have tested the projector). An option you didn't take: could have (We could have used a laptop instead). Past speculation: might / may / could have (He might have missed the email); must have = almost sure it's true (She must have been tired); can't / couldn't have = almost sure it's not true (He can't have seen it; he was on holiday)."
          },
          {
            kind: "vocab",
            items: [
              { en: "in hindsight", es: "looking back now, with more knowledge" },
              { en: "typo", ipa: "ˈtaɪpəʊ", es: "a small mistake in typing" },
              { en: "rehearse", ipa: "rɪˈhɜːs", es: "practise before a performance" },
              { en: "backup", ipa: "ˈbækʌp", es: "an extra copy kept in case the first one fails" },
              { en: "blame", ipa: "bleɪm", es: "say someone is responsible for something bad" },
              { en: "let (someone) down", es: "disappoint someone" },
              { en: "go wrong", es: "stop working or happening as planned" },
              { en: "at least", es: "used to say something is less bad than it could be" }
            ]
          },
          {
            kind: "expresiones",
            items: [
              { en: "We should have checked.", es: "criticism of what you did" },
              { en: "You shouldn't have worried.", es: "it wasn't necessary" },
              { en: "It could have been worse.", es: "look on the positive side" },
              { en: "She must have forgotten.", es: "a confident guess about the past" }
            ]
          },
          {
            kind: "ejemplos",
            items: [
              { en: "Priya: We should have rehearsed the presentation at least once." },
              { en: "Daniel: And we could have brought a backup laptop." },
              { en: "Tom: The client left early. He must have been bored." },
              { en: "Carmen: Or he might have had another meeting. Anyway, it could have been worse!" }
            ]
          },
          {
            kind: "errores",
            items: [
              { no: "We should tested it.", si: "We should have tested it.", pq: "Past modals need have + past participle." },
              { no: "He must have went home.", si: "He must have gone home.", pq: "Use the past participle (gone), not the past simple." },
              { no: "She can't have be there.", si: "She can't have been there.", pq: "have + past participle (been)." }
            ]
          },
          { kind: "resumen", body: "should(n't) have = criticism / regret. could have = an option you didn't take. might / may / could have = maybe. must have = almost sure yes. can't have = almost sure no." },
          { kind: "puente", body: "Join the team's post-presentation review." }
        ]
      },
      exercises: [
        {
          type: "multiple_choice", question: "The lights are off and nobody answers the door. They ___ gone out.", options: ["must have", "should have", "can't have"], correctIndex: 0,
          explanation: "Strong evidence → must have."
        },
        {
          type: "categorize", instruction: "What is the speaker doing?",
          buckets: [{ id: "crit", label: "Criticising / regretting" }, { id: "spec", label: "Speculating" }],
          items: [
            { t: "We should have left earlier.", bucket: "crit" },
            { t: "You shouldn't have shouted.", bucket: "crit" },
            { t: "I could have studied more.", bucket: "crit" },
            { t: "She might have missed the bus.", bucket: "spec" },
            { t: "He must have been tired.", bucket: "spec" },
            { t: "They can't have finished already.", bucket: "spec" }
          ]
        },
        {
          type: "find_error",
          segments: ["You ", { u: "should" }, " ", { u: "have tell" }, " me ", { u: "about" }, " the meeting!"],
          correctIndex: 1, correction: "have told", explanation: "should have + past participle: You should have told me.", question: "Find the mistake"
        },
        {
          type: "fill_blank", sentence: "Daniel can't ___ seen the email. He was on a plane all day.", answers: ["have"], hint: "can't + ___ + past participle",
          explanation: "can't have seen = almost sure he didn't see it."
        },
        {
          type: "listening", text: "I can't find my keys. I might have left them at the office.", question: "What does the speaker think?",
          options: ["The keys are possibly at the office", "The keys are definitely at the office", "Someone stole the keys"], correctIndex: 0
        },
        {
          type: "reading", title: "Presentation review",
          passage: "What went wrong: The projector failed after five minutes, and there were three typos on the first slide. The client left before the Q&A.\n\nWhat we should have done: rehearsed the day before, brought a backup laptop and asked someone to proofread the slides.\n\nWhat went well: Carmen's demo of the app was clear, and the client asked for a follow-up email. It could have been much worse!",
          questions: [
            {
              q: "Which action does the team regret NOT doing?", options: ["Rehearsing the presentation", "Inviting the client", "Showing the demo"], correctIndex: 0,
              explanation: "We should have rehearsed the day before."
            },
            {
              q: "What does \"It could have been much worse\" suggest?",
              options: ["Some things went well despite the problems.", "The client was very angry.", "The presentation was cancelled."], correctIndex: 0,
              explanation: "The demo was clear and the client wants a follow-up."
            }
          ]
        },
        {
          type: "word_order", words: ["laptop", "We", "backup", "should", "a", "have", "brought"], correctOrder: ["We", "should", "have", "brought", "a", "backup", "laptop"],
          hint: "should + have + past participle"
        },
        {
          type: "translate", prompt: "Rewrite using \"must have\": \"I'm sure she forgot about the meeting.\"",
          answers: ["she must have forgotten about the meeting", "she must have forgotten the meeting"], explanation: "She must have forgotten about the meeting."
        }
      ]
    },

    "x2-gram-b2-future-continuous": {
      lessonId: "x2-gram-b2-future-continuous", level: "B2", track: "Grammar", topic: "grammar", skill: "grammar",
      title: "Future continuous", xpReward: 55, mascotState: "explaining",
      nextLessonId: "x2-use-b2-connectors",
      explanation: {
        body: "\"will be + -ing\" describes an action in progress at a moment in the future: \"This time tomorrow, I'll be flying to Rome.\" It is also used to ask politely about plans: \"Will you be using the car tonight?\".",
        examples: [
          { en: "At 8 pm I'll be watching the match." },
          { en: "This time next week we'll be relaxing on the beach." },
          { en: "Will you be joining us later?" }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "This time tomorrow, I ___ to London.", options: ["will fly", "am flying", "will be flying"],
          correctIndex: 2, explanation: "An action in progress in the future → will be flying." },
        { type: "fill_blank", sentence: "Don't call at 9 — I ___ (have) dinner then.", answers: ["will be having", "'ll be having"],
          hint: "will be + -ing.", explanation: "I'll be having dinner." },
        { type: "true_false", statement: "'Will you be using the car?' is a polite way to ask about plans.", answer: true,
          explanation: "Yes, the future continuous sounds more polite when asking about plans." },
        { type: "translate", prompt: "Describe an action in progress at 8 pm, using 'be watching': My plan tonight: the match starts at 7:30 and ends at 9:30. (At eight…)",
          answers: ["at eight i'll be watching the match","at 8 i'll be watching the match","at eight i will be watching the match","at 8 i will be watching the match","at eight pm i'll be watching the match","at 8 pm i'll be watching the match"],
          explanation: "At eight I'll be watching the match." }
      ]
    },

    "x2-use-b2-connectors": {
      lessonId: "x2-use-b2-connectors", level: "B2", track: "Functional English", topic: "work", skill: "use", tipo: "aprende", title: "Interrupting and holding the floor", rev: 2, xpReward: 55,
      mascotState: "explaining", nextLessonId: "x2-use-b2-word-formation",
      explanation: {
        body: "Episode 7 · In the brainstorming meeting, Tom talks non-stop, Daniel mumbles, and Carmen can't get a word in. Learn how to interrupt politely, ask people to expand on their ideas and keep your turn when others try to interrupt you. Interrupt politely: Sorry to interrupt, but... / Can I just come in here? / If I could just add something... Ask someone to expand: Could you elaborate on that? / What exactly do you mean by...? / Could you give us an example? Hold the floor: If I could just finish... / Bear with me for a second. Return to an earlier point: Going back to what Daniel said... / To get back to the main point...",
        examples: [
          { en: "...and then we could add music, and videos, and maybe a chatbot, and..." },
          { en: "Sorry to interrupt, Tom, but can I just come in here?" },
          { en: "Sure, go ahead." },
          { en: "Going back to what Daniel said earlier, could you elaborate on the offline mode, Daniel?" }
        ],
        sections: [
          {
            kind: "intro",
            body: "Episode 7 · In the brainstorming meeting, Tom talks non-stop, Daniel mumbles, and Carmen can't get a word in. Learn how to interrupt politely, ask people to expand on their ideas and keep your turn when others try to interrupt you."
          },
          {
            kind: "regla",
            body: "Interrupt politely: Sorry to interrupt, but... / Can I just come in here? / If I could just add something... Ask someone to expand: Could you elaborate on that? / What exactly do you mean by...? / Could you give us an example? Hold the floor: If I could just finish... / Bear with me for a second. Return to an earlier point: Going back to what Daniel said... / To get back to the main point..."
          },
          {
            kind: "vocab",
            items: [
              { en: "interrupt", ipa: "ˌɪntəˈrʌpt", es: "stop someone while they are speaking" },
              { en: "elaborate (on)", ipa: "ɪˈlæbəreɪt", es: "give more details" },
              { en: "hold the floor", es: "keep the right to speak" },
              { en: "get a word in", es: "manage to say something when others are talking a lot" },
              { en: "bear with me", es: "be patient with me for a moment" },
              { en: "digress", ipa: "daɪˈɡres", es: "move away from the main subject" },
              { en: "brainstorm", ipa: "ˈbreɪnstɔːm", es: "a group discussion to produce ideas" },
              { en: "on track", es: "following the planned direction" }
            ]
          },
          {
            kind: "expresiones",
            items: [
              { en: "Sorry to interrupt, but...", es: "a polite interruption" },
              { en: "Could you elaborate on that?", es: "ask for more detail" },
              { en: "If I could just finish...", es: "keep your turn" },
              { en: "Going back to what you said...", es: "return to an earlier point" }
            ]
          },
          {
            kind: "ejemplos",
            items: [
              { en: "Tom: ...and then we could add music, and videos, and maybe a chatbot, and..." },
              { en: "Carmen: Sorry to interrupt, Tom, but can I just come in here?" },
              { en: "Tom: Sure, go ahead." },
              { en: "Carmen: Going back to what Daniel said earlier, could you elaborate on the offline mode, Daniel?" }
            ]
          },
          {
            kind: "errores",
            items: [
              { no: "Stop, I want to talk.", si: "Sorry to interrupt, but could I add something?", pq: "Signal politely that you want to speak." },
              { no: "Can you elaborate that?", si: "Can you elaborate on that?", pq: "elaborate needs 'on' before an object." },
              { no: "Wait me, I didn't finish.", si: "If I could just finish...", pq: "Use a polite fixed phrase to hold the floor." }
            ]
          },
          { kind: "resumen", body: "Interrupt: Sorry to interrupt, but... / Can I just come in here? Expand: Could you elaborate on that? Hold the floor: If I could just finish... Return: Going back to..." },
          { kind: "puente", body: "Help Carmen get a word in at the brainstorm." }
        ]
      },
      exercises: [
        {
          type: "categorize", instruction: "What is the speaker doing?",
          buckets: [{ id: "int", label: "Interrupting" }, { id: "exp", label: "Asking for more detail" }, { id: "hold", label: "Holding the floor" }],
          items: [
            { t: "Sorry to interrupt, but...", bucket: "int" },
            { t: "Can I just come in here?", bucket: "int" },
            { t: "Could you elaborate on that?", bucket: "exp" },
            { t: "Could you give us an example?", bucket: "exp" },
            { t: "If I could just finish...", bucket: "hold" },
            { t: "Bear with me for a second.", bucket: "hold" }
          ]
        },
        {
          type: "listening", text: "Sorry, if I could just finish this point; it's important for the budget.", question: "What does the speaker want?",
          options: ["To keep speaking", "To end the meeting", "To ask a question"], correctIndex: 0
        },
        {
          type: "multiple_choice", question: "Your colleague's idea is interesting but vague. You say:", options: ["Could you elaborate on that?", "Can you elaborate that?", "Elaborate, please."],
          correctIndex: 0, explanation: "elaborate on + object, inside a polite question."
        },
        {
          type: "find_error",
          segments: ["Could you ", { u: "elaborate" }, " that idea ", { u: "a little" }, " ", { u: "more" }, "?"],
          correctIndex: 0, correction: "elaborate on", explanation: "elaborate needs 'on' before an object: elaborate on that idea.", question: "Find the mistake"
        },
        {
          type: "matching", instruction: "Match each expression with its meaning.",
          pairs: [
            { l: "digress", r: "move away from the main subject" },
            { l: "elaborate", r: "give more details" },
            { l: "bear with me", r: "be patient with me for a moment" },
            { l: "on track", r: "following the planned direction" },
            { l: "get a word in", r: "manage to speak when others talk a lot" }
          ]
        },
        { type: "fill_blank", sentence: "Sorry to ___, but I think we're running out of time.", answers: ["interrupt"], hint: "stop someone while they are speaking", explanation: "Sorry to interrupt, but..." },
        { type: "speak", text: "Sorry to interrupt, but can I just come in here?" },
        {
          type: "translate",
          prompt: "Rewrite to return to an earlier point, starting with \"Going back\": \"Let's talk about Daniel's idea again.\"",
          answers: ["going back to daniel's idea", "going back to what daniel said", "going back to daniel's point"], explanation: "Going back to Daniel's idea..."
        }
      ]
    },

    "x2-use-b2-word-formation": {
      lessonId: "x2-use-b2-word-formation", level: "B2", track: "Use of English", topic: "grammar", skill: "use",
      title: "Word formation", xpReward: 55, mascotState: "explaining",
      nextLessonId: "x2-read-b2-environment",
      explanation: {
        body: "Many exams ask you to transform a word. Common suffixes: -ness (happy → happiness), -tion (decide → decision), -ful/-less (care → careful/careless), -ly (quick → quickly, adverb). The suffix tells you the word class (noun, adjective, adverb).",
        examples: [
          { en: "happy → happiness (noun)" },
          { en: "care → careful / careless" },
          { en: "quick → quickly (adverb)" }
        ]
      },
      exercises: [
        { type: "fill_blank", sentence: "Her ___ surprised everyone. (kind → noun)", answers: ["kindness"],
          hint: "-ness.", explanation: "kind → kindness (noun)." },
        { type: "multiple_choice", question: "Adjective form of 'danger'?", options: ["dangerly", "dangerous", "dangerness"],
          correctIndex: 1, explanation: "danger → dangerous (adjective)." },
        { type: "categorize", instruction: "Is the word a noun or an adjective?", buckets: [
          { id: "n", label: "Noun" }, { id: "adj", label: "Adjective" } ], items: [
          { t: "decision", bucket: "n" }, { t: "useful", bucket: "adj" }, { t: "freedom", bucket: "n" }, { t: "creative", bucket: "adj" } ] },
        { type: "true_false", statement: "Adding '-ly' usually makes an adverb (quick → quickly).", answer: true,
          explanation: "Yes, -ly usually forms adverbs." },
        { type: "fill_blank", sentence: "He drove ___ in the rain. (careful → adverb)", answers: ["carefully"],
          hint: "-ly.", explanation: "careful → carefully." }
      ]
    },

    "x2-read-b2-environment": {
      lessonId: "x2-read-b2-environment", level: "B2", track: "Reading", topic: "science", skill: "reading",
      title: "Reading: Urban gardens", xpReward: 58, mascotState: "explaining",
      nextLessonId: "x2-lis-b2-meeting",
      explanation: {
        body: "A popular-science text about urban gardens. Practise identifying the main idea and distinguishing facts from opinions.",
        examples: [
          { en: "Rooftops are being turned into gardens." }
        ]
      },
      exercises: [
        { type: "reading", title: "Gardens in the city",
          passage: "In many crowded cities, empty rooftops and small plots are being turned into community gardens. Local residents grow vegetables, herbs and flowers together.\n\nThese gardens do more than provide food. They cool the air in summer, support bees and other insects, and give people a green space to relax and meet neighbours.\n\nSome city councils now support the idea, offering tools and water. Critics argue the gardens are too small to feed a city, but supporters say their real value is social and environmental, not just agricultural.",
          questions: [
            { q: "What is the main topic?", options: ["Community gardens in cities", "Building skyscrapers", "Selling vegetables abroad"], correctIndex: 0, explanation: "The text is about community gardens in cities." },
            { q: "According to the text, the gardens...", options: ["harm insects", "only provide food", "do more than provide food"], correctIndex: 2, explanation: "\"These gardens do more than provide food\"." },
            { q: "What do supporters say is the real value?", options: ["Feeding the whole city", "Social and environmental value", "Making money"], correctIndex: 1, explanation: "\"their real value is social and environmental\"." }
          ] },
        { type: "true_false", statement: "Everyone in the text agrees the gardens can feed an entire city.", answer: false,
          explanation: "Critics say they are too small to feed a whole city." },
        { type: "multiple_choice", question: "Which is an OPINION from the text?", options: ["Their real value is social", "Residents grow vegetables in shared plots", "Gardens cool the air"],
          correctIndex: 0, explanation: "\"Their real value is social\" is an opinion held by supporters." },
        {
          type: "multiple_choice", question: "In the text, \"plots\" refers to...", options: ["small areas of land", "stories", "secret plans"], correctIndex: 0,
          explanation: "A plot of land is a small piece of ground."
        },
        {
          type: "find_error",
          segments: ["Critics ", { u: "argues" }, " that the gardens ", { u: "are" }, " too small to ", { u: "feed" }, " a city."],
          correctIndex: 0, correction: "argue", explanation: "Plural subject (critics) → argue.", question: "Find the mistake"
        },
        {
          type: "fill_blank", sentence: "These gardens do more than ___ food.", answers: ["provide", "produce", "give"], hint: "A verb from the second paragraph.",
          explanation: "These gardens do more than provide food."
        }
      ]
    },

    "x2-lis-b2-meeting": {
      lessonId: "x2-lis-b2-meeting", level: "B2", track: "Listening", topic: "business", skill: "listening",
      title: "Listening: A team update", xpReward: 55, mascotState: "explaining",
      nextLessonId: "x2-voc-c1-idioms",
      explanation: {
        body: "You will hear a short team update. Pay attention to the numbers and to who does what. Use the audio button to hear it with your device's voice.",
        examples: [
          { en: "Sales are up by ten percent." }
        ]
      },
      exercises: [
        { type: "listening", text: "Good morning, everyone. Quick update: sales are up by ten percent this month, mainly thanks to the new website. Marketing will share the full report on Friday, and I'd like each team to send me their goals by Wednesday.", "audio": "assets/audio/app/b2_6932f3aac4.mp3",
          question: "By how much are sales up?", options: ["Twenty percent", "Five percent", "Ten percent"], correctIndex: 2,
          explanation: "\"sales are up by ten percent\"." },
        { type: "listening", text: "Good morning, everyone. Quick update: sales are up by ten percent this month, mainly thanks to the new website. Marketing will share the full report on Friday, and I'd like each team to send me their goals by Wednesday.", "audio": "assets/audio/app/b2_6932f3aac4.mp3",
          question: "When should teams send their goals?", options: ["By Wednesday", "On Friday", "Today"], correctIndex: 0,
          explanation: "\"send me their goals by Wednesday\"." },
        { type: "multiple_choice", question: "What helped sales grow?", options: ["A new office", "A new website", "Lower prices on every product"],
          correctIndex: 1, explanation: "\"thanks to the new website\"." },
        { type: "true_false", statement: "Marketing will share the report on Monday.", answer: false,
          explanation: "It will be on Friday (\"on Friday\")." }
      ]
    },

    /* ==================================================================
     * C1 / C2 — avanzado
     * ================================================================== */
    "x2-voc-c1-idioms": {
      lessonId: "x2-voc-c1-idioms", level: "C1", track: "Functional English", topic: "work", skill: "use", tipo: "aprende", title: "Chairing a discussion", rev: 2, xpReward: 60, mascotState: "explaining",
      nextLessonId: "x2-voc-c1-awl",
      explanation: {
        body: "You're chairing a meeting with eight people, two strong opinions and forty minutes. Your job is to open, keep everyone on track, bring in quiet voices, stop people talking over each other and close with clear actions. Here's the language good chairs use. Open: Shall we make a start? The aim of today's meeting is to... Manage turns: Let's hear from Ana first. / Raj, what's your view? / Let's not all talk at once. Keep on track: I'm afraid we're drifting off the point. / Can we park that for now? Move on: In the interest of time, let's move on to... Summarise and close: So, to sum up, we've agreed that... / Who's going to take that on? / Let's wrap up there.",
        examples: [
          { en: "Shall we make a start? The aim of today's meeting is to agree on the budget." },
          { en: "Let's not all talk at once. Ana, you first, then Raj." },
          { en: "That's an important issue, but can we park it for now and come back to it next week?" },
          { en: "So, to sum up, we've reached a consensus on option B. Raj, can you take that action point?" }
        ],
        sections: [
          {
            kind: "intro",
            body: "You're chairing a meeting with eight people, two strong opinions and forty minutes. Your job is to open, keep everyone on track, bring in quiet voices, stop people talking over each other and close with clear actions. Here's the language good chairs use."
          },
          {
            kind: "regla",
            body: "Open: Shall we make a start? The aim of today's meeting is to... Manage turns: Let's hear from Ana first. / Raj, what's your view? / Let's not all talk at once. Keep on track: I'm afraid we're drifting off the point. / Can we park that for now? Move on: In the interest of time, let's move on to... Summarise and close: So, to sum up, we've agreed that... / Who's going to take that on? / Let's wrap up there."
          },
          {
            kind: "vocab",
            items: [
              { en: "chair", ipa: "tʃeə", es: "lead a meeting" },
              { en: "agenda", ipa: "əˈdʒendə", es: "a list of points to discuss in a meeting" },
              { en: "item", ipa: "ˈaɪtəm", es: "one point on an agenda" },
              { en: "drift off the point", es: "move away from the topic" },
              { en: "park (an issue)", es: "leave it to discuss later" },
              { en: "wrap up", es: "finish" },
              { en: "action point", es: "a task someone agrees to do after a meeting" },
              { en: "consensus", ipa: "kənˈsensəs", es: "general agreement" }
            ]
          },
          {
            kind: "expresiones",
            items: [
              { en: "Shall we make a start?", es: "open the meeting" },
              { en: "Can we park that for now?", es: "postpone a topic" },
              { en: "Let's hear from... first.", es: "manage turns" },
              { en: "So, to sum up, ...", es: "summarise decisions" }
            ]
          },
          {
            kind: "ejemplos",
            items: [
              { en: "Shall we make a start? The aim of today's meeting is to agree on the budget." },
              { en: "Let's not all talk at once. Ana, you first, then Raj." },
              { en: "That's an important issue, but can we park it for now and come back to it next week?" },
              { en: "So, to sum up, we've reached a consensus on option B. Raj, can you take that action point?" }
            ]
          },
          {
            kind: "errores",
            items: [
              { no: "We begin? (to open)", si: "Shall we make a start?", pq: "Use a fixed, polite opening." },
              { no: "Stop talking, Raj.", si: "Thanks, Raj. Let's hear from Ana now.", pq: "Thank the speaker before handing over the turn." },
              { no: "We have a consensus agreement.", si: "We've reached a consensus.", pq: "consensus already means agreement; 'reach a consensus' is the collocation." }
            ]
          },
          { kind: "resumen", body: "Open (Shall we make a start?) → manage turns (Let's hear from...) → keep on track (Can we park that?) → close (To sum up... / Who's taking that on?)." },
          { kind: "puente", body: "Take the chair and keep the meeting moving." }
        ]
      },
      exercises: [
        {
          type: "categorize", instruction: "Which stage of the meeting is it?",
          buckets: [{ id: "open", label: "Opening" }, { id: "manage", label: "Managing" }, { id: "close", label: "Closing" }],
          items: [
            { t: "Shall we make a start?", bucket: "open" },
            { t: "The aim of today's meeting is...", bucket: "open" },
            { t: "Let's hear from Ana first.", bucket: "manage" },
            { t: "Can we park that for now?", bucket: "manage" },
            { t: "So, to sum up, ...", bucket: "close" },
            { t: "Let's wrap up there.", bucket: "close" }
          ]
        },
        {
          type: "multiple_choice", question: "Two people are talking at the same time. As chair, you say:",
          options: ["Let's not all talk at once. Ana first, then Raj.", "Be quiet, both of you!", "Whatever. Next item."], correctIndex: 0, explanation: "Firm but polite, with a clear order of turns."
        },
        {
          type: "listening",
          text: "I'm afraid we're drifting off the point. Can we park that and get back to the budget?", question: "What does the chair want?",
          options: ["To return to the main topic", "To end the meeting", "To discuss the new topic in detail"], correctIndex: 0
        },
        {
          type: "matching", instruction: "Match each word with its meaning.",
          pairs: [
            { l: "agenda", r: "a list of points to discuss in a meeting" },
            { l: "consensus", r: "general agreement" },
            { l: "action point", r: "a task someone agrees to do after a meeting" },
            { l: "wrap up", r: "finish" },
            { l: "park", r: "leave an issue to discuss later" }
          ]
        },
        {
          type: "find_error",
          segments: ["We ", { u: "have" }, " ", { u: "reached" }, " ", { u: "a consensus agreement" }, " on the budget."],
          correctIndex: 2, correction: "a consensus", explanation: "consensus already means agreement: We have reached a consensus.", question: "Find the mistake"
        },
        {
          type: "word_order", words: ["on", "In", "move", "the", "let's", "interest", "time", "of"], correctOrder: ["In", "the", "interest", "of", "time", "let's", "move", "on"],
          hint: "A chair's phrase for moving on."
        },
        { type: "speak", text: "Shall we make a start? The aim of today's meeting is to agree on the budget." },
        {
          type: "translate",
          prompt: "Rephrase as a chair, starting with \"Can we park\": \"Let's talk about the office move another day.\"",
          answers: ["can we park the office move for now", "can we park the office move", "can we park that for now", "can we park the office move until next week"],
          explanation: "Can we park the office move for now?"
        }
      ]
    },

    "x2-voc-c1-awl": {
      lessonId: "x2-voc-c1-awl", level: "C1", track: "Vocabulary", topic: "academic", skill: "vocab", tipo: "aprende", title: "Verbs of cause and change", rev: 2, xpReward: 60, mascotState: "explaining",
      nextLessonId: "x2-use-c1-cleft",
      explanation: {
        body: "Reports, essays and news articles are full of cause and effect: a decision triggers a protest, a new tax curbs spending, a heatwave exacerbates a drought. Precise verbs like these make your writing sharper than 'cause', 'make worse' or 'reduce'. Make worse: exacerbate, aggravate, compound. Make less severe: alleviate, mitigate, ease. Start or cause: trigger, spark, prompt, give rise to. Limit or slow: curb, restrict, hinder. Rise or fall: soar, surge / plummet, dwindle. Watch the grammar: trigger something (no preposition), give rise to something, result in (= cause) vs result from (= be caused by).",
        examples: [
          { en: "The price rise triggered a wave of protests." },
          { en: "The new rules aim to curb air pollution in city centres." },
          { en: "Cutting staff only exacerbated the delays." },
          { en: "Planting trees can help mitigate the effects of heatwaves." }
        ],
        sections: [
          {
            kind: "intro",
            body: "Reports, essays and news articles are full of cause and effect: a decision triggers a protest, a new tax curbs spending, a heatwave exacerbates a drought. Precise verbs like these make your writing sharper than 'cause', 'make worse' or 'reduce'."
          },
          {
            kind: "regla",
            body: "Make worse: exacerbate, aggravate, compound. Make less severe: alleviate, mitigate, ease. Start or cause: trigger, spark, prompt, give rise to. Limit or slow: curb, restrict, hinder. Rise or fall: soar, surge / plummet, dwindle. Watch the grammar: trigger something (no preposition), give rise to something, result in (= cause) vs result from (= be caused by)."
          },
          {
            kind: "vocab",
            items: [
              { en: "trigger", ipa: "ˈtrɪɡə", es: "cause something to start suddenly" },
              { en: "curb", ipa: "kɜːb", es: "control or limit something harmful" },
              { en: "exacerbate", ipa: "ɪɡˈzæsəbeɪt", es: "make a bad situation worse" },
              { en: "mitigate", ipa: "ˈmɪtɪɡeɪt", es: "make something less harmful or serious" },
              { en: "alleviate", ipa: "əˈliːvieɪt", es: "make pain or a problem less severe" },
              { en: "hinder", ipa: "ˈhɪndə", es: "make progress difficult" },
              { en: "give rise to", es: "cause something to happen or exist" },
              { en: "dwindle", ipa: "ˈdwɪndəl", es: "become gradually smaller in number or amount" }
            ]
          },
          {
            kind: "expresiones",
            items: [
              { en: "The decision sparked widespread protests.", es: "cause a sudden reaction" },
              { en: "measures to curb inflation", es: "limit something harmful" },
              { en: "This merely compounded the problem.", es: "made it even worse" },
              { en: "to mitigate the risks", es: "reduce possible harm" }
            ]
          },
          {
            kind: "ejemplos",
            items: [
              { en: "The price rise triggered a wave of protests." },
              { en: "The new rules aim to curb air pollution in city centres." },
              { en: "Cutting staff only exacerbated the delays." },
              { en: "Planting trees can help mitigate the effects of heatwaves." }
            ]
          },
          {
            kind: "errores",
            items: [
              { no: "The heat exacerbated the drought worse.", si: "The heat exacerbated the drought.", pq: "exacerbate already means 'make worse'." },
              { no: "The policy resulted from higher prices. (= caused them)", si: "The policy resulted in higher prices.", pq: "result in = cause; result from = be caused by." },
              { no: "The scandal triggered to a crisis.", si: "The scandal triggered a crisis.", pq: "trigger takes a direct object, with no preposition." }
            ]
          },
          { kind: "resumen", body: "Worse: exacerbate, compound. Better: alleviate, mitigate. Start: trigger, spark, give rise to. Limit: curb, hinder. Fall: dwindle, plummet." },
          { kind: "puente", body: "Describe causes and effects like a journalist." }
        ]
      },
      exercises: [
        {
          type: "matching", instruction: "Match each verb with its meaning.",
          pairs: [
            { l: "trigger", r: "cause something to start suddenly" },
            { l: "curb", r: "control or limit something harmful" },
            { l: "exacerbate", r: "make a bad situation worse" },
            { l: "mitigate", r: "make something less harmful" },
            { l: "hinder", r: "make progress difficult" },
            { l: "dwindle", r: "become gradually smaller" }
          ]
        },
        {
          type: "categorize", instruction: "Does the verb make the situation better or worse?",
          buckets: [{ id: "better", label: "Better" }, { id: "worse", label: "Worse" }],
          items: [
            { t: "alleviate", bucket: "better" },
            { t: "mitigate", bucket: "better" },
            { t: "ease", bucket: "better" },
            { t: "curb (pollution)", bucket: "better" },
            { t: "exacerbate", bucket: "worse" },
            { t: "aggravate", bucket: "worse" },
            { t: "compound", bucket: "worse" },
            { t: "hinder", bucket: "worse" }
          ]
        },
        {
          type: "multiple_choice", question: "Painkillers can ___ the symptoms, but they don't cure the disease.", options: ["alleviate", "exacerbate", "trigger"], correctIndex: 0,
          explanation: "alleviate = make less severe."
        },
        {
          type: "find_error",
          segments: ["The new tax ", { u: "triggered" }, " ", { u: "to" }, " a wave of ", { u: "protests" }, "."],
          correctIndex: 1, correction: "(delete 'to')", explanation: "trigger takes a direct object: The new tax triggered a wave of protests.", question: "Find the mistake"
        },
        {
          type: "fill_blank", sentence: "Over the decades, the village population has ___ from 2,000 to just 300.", answers: ["dwindled", "fallen", "declined", "shrunk", "decreased"],
          hint: "become gradually smaller", explanation: "has dwindled"
        },
        {
          type: "reading", title: "Reservoir at record low",
          passage: "Water levels in the reservoir have dwindled to their lowest point in thirty years. Experts say the crisis was triggered by an unusually dry winter and exacerbated by a sharp rise in demand from new housing.\n\nThe council has introduced measures to curb water use, including a hosepipe ban, and hopes that a new pipeline will help alleviate shortages by next summer.",
          questions: [
            {
              q: "What made the crisis worse?", options: ["Higher demand from new housing", "The hosepipe ban", "The new pipeline"], correctIndex: 0,
              explanation: "...exacerbated by a sharp rise in demand from new housing."
            },
            { q: "What is the purpose of the hosepipe ban?", options: ["To limit water use", "To start the crisis", "To build a pipeline"], correctIndex: 0, explanation: "measures to curb water use" },
            { q: "\"Dwindled\" in the first sentence means:", options: ["gradually decreased", "suddenly increased", "stayed the same"], correctIndex: 0, explanation: "dwindle = become gradually smaller." }
          ]
        },
        {
          type: "listening", text: "Experts warn that cutting the budget could hinder progress on the project.", question: "What could happen?",
          options: ["The project could slow down", "The project could finish early", "The budget could increase"], correctIndex: 0
        },
        {
          type: "translate", prompt: "Rewrite using \"exacerbated\": \"The strike made the traffic problems worse.\"",
          answers: ["the strike exacerbated the traffic problems", "the strike exacerbated traffic problems"], explanation: "The strike exacerbated the traffic problems."
        }
      ]
    },

    "x2-use-c1-cleft": {
      lessonId: "x2-use-c1-cleft", level: "C1", track: "Functional English", topic: "work", skill: "use", tipo: "aprende", title: "Giving feedback and softening criticism", rev: 2, xpReward: 60,
      mascotState: "explaining", nextLessonId: "x2-use-c1-discourse-markers",
      explanation: {
        body: "You've been asked to review a colleague's report. It has good ideas, but it's far too long and the data is out of date. How do you say that without demoralising them? Constructive feedback is specific, balanced and focused on the work, not the person. Start with genuine positives (What works really well is... / I particularly liked...). Frame problems tentatively and specifically: I wonder if... / It might be worth... / One thing you could consider is... Focus on impact: The length may make it harder for the board to find the key points. End with support and next steps: Happy to talk it through. Avoid absolutes (always, never, terrible) and a 'but' straight after praise: 'and' or a new sentence works better.",
        examples: [
          { en: "What works really well is the clear structure of your argument." },
          { en: "It might be worth cutting the introduction to half a page." },
          { en: "I wonder if the 2019 figures still reflect the market." },
          { en: "Overall, it's a strong draft, and I'm happy to talk it through on Thursday." }
        ],
        sections: [
          {
            kind: "intro",
            body: "You've been asked to review a colleague's report. It has good ideas, but it's far too long and the data is out of date. How do you say that without demoralising them? Constructive feedback is specific, balanced and focused on the work, not the person."
          },
          {
            kind: "regla",
            body: "Start with genuine positives (What works really well is... / I particularly liked...). Frame problems tentatively and specifically: I wonder if... / It might be worth... / One thing you could consider is... Focus on impact: The length may make it harder for the board to find the key points. End with support and next steps: Happy to talk it through. Avoid absolutes (always, never, terrible) and a 'but' straight after praise: 'and' or a new sentence works better."
          },
          {
            kind: "vocab",
            items: [
              { en: "constructive", ipa: "kənˈstrʌktɪv", es: "intended to help or improve" },
              { en: "feedback", ipa: "ˈfiːdbæk", es: "comments on how well someone has done something" },
              { en: "demoralise", ipa: "dɪˈmɒrəlaɪz", es: "make someone lose confidence" },
              { en: "specific", ipa: "spəˈsɪfɪk", es: "clear and exact" },
              { en: "actionable", ipa: "ˈækʃənəbəl", es: "able to be acted on" },
              { en: "overlook", ipa: "ˌəʊvəˈlʊk", es: "fail to notice" },
              { en: "streamline", ipa: "ˈstriːmlaɪn", es: "make simpler and more efficient" },
              { en: "digest", ipa: "daɪˈdʒest", es: "take in and understand information" }
            ]
          },
          {
            kind: "expresiones",
            items: [
              { en: "What works really well is...", es: "highlight a strength" },
              { en: "It might be worth -ing...", es: "suggest an improvement" },
              { en: "I wonder if we could...", es: "a soft, collaborative suggestion" },
              { en: "Happy to talk it through.", es: "offer support" }
            ]
          },
          {
            kind: "ejemplos",
            items: [
              { en: "What works really well is the clear structure of your argument." },
              { en: "It might be worth cutting the introduction to half a page." },
              { en: "I wonder if the 2019 figures still reflect the market." },
              { en: "Overall, it's a strong draft, and I'm happy to talk it through on Thursday." }
            ]
          },
          {
            kind: "errores",
            items: [
              { no: "Your report is terrible and too long.", si: "The report could be more concise.", pq: "Criticise the work, not the person, and avoid extreme words." },
              {
                no: "Good job, but the data is wrong.", si: "The analysis is strong, and updating the data would make it even more convincing.",
                pq: "'But' cancels the praise; link with 'and' and make the point actionable."
              },
              { no: "You always miss deadlines.", si: "The last two reports arrived after the deadline. Is there anything that would help?", pq: "Be specific and avoid 'always' and 'never'." }
            ]
          },
          { kind: "resumen", body: "Positive first → specific, tentative suggestion (It might be worth... / I wonder if...) → focus on impact → offer support." },
          { kind: "puente", body: "Write feedback that people actually want to receive." }
        ]
      },
      exercises: [
        {
          type: "reading", title: "Feedback on a draft",
          passage: "Hi Lena,\n\nThanks for sharing the draft. What works really well is the case study in section 2: it brings the problem to life.\n\nA couple of thoughts. At 30 pages, the report might be hard for the board to digest, so it might be worth moving the technical detail to an appendix. I also wonder if the 2019 market figures still reflect the current situation; updated numbers would make your argument even stronger.\n\nOverall, it's a strong piece of work. Happy to talk it through on Thursday if that helps.\n\nBest,\nMarco",
          questions: [
            { q: "What does Marco praise?", options: ["The case study", "The length of the report", "The 2019 figures"], correctIndex: 0, explanation: "What works really well is the case study in section 2." },
            {
              q: "What does Marco suggest about the technical detail?", options: ["Moving it to an appendix", "Deleting it completely", "Expanding it"], correctIndex: 0,
              explanation: "...it might be worth moving the technical detail to an appendix."
            },
            { q: "What is the overall tone?", options: ["Supportive and constructive", "Angry and critical", "Indifferent"], correctIndex: 0, explanation: "Praise, tentative suggestions and an offer of help." }
          ]
        },
        {
          type: "categorize", instruction: "Constructive or destructive?",
          buckets: [{ id: "con", label: "Constructive" }, { id: "des", label: "Destructive" }],
          items: [
            { t: "It might be worth adding a summary.", bucket: "con" },
            { t: "What works really well is the opening.", bucket: "con" },
            { t: "I wonder if the chart could be simpler.", bucket: "con" },
            { t: "This is a mess.", bucket: "des" },
            { t: "You never listen to feedback.", bucket: "des" },
            { t: "Nice, but it's all wrong.", bucket: "des" }
          ]
        },
        {
          type: "multiple_choice", question: "Which is the best way to point out a problem?",
          options: ["One thing you could consider is shortening section 3.", "Section 3 is far too long, as usual.", "Why is section 3 so boring?"], correctIndex: 0,
          explanation: "Tentative, specific and actionable."
        },
        {
          type: "matching", instruction: "Match each word with its meaning.",
          pairs: [
            { l: "constructive", r: "intended to help or improve" },
            { l: "actionable", r: "able to be acted on" },
            { l: "demoralise", r: "make someone lose confidence" },
            { l: "overlook", r: "fail to notice" },
            { l: "streamline", r: "make simpler and more efficient" }
          ]
        },
        { type: "fill_blank", sentence: "It might be ___ moving the details to an appendix.", answers: ["worth"], hint: "It might be ___ + -ing", explanation: "It might be worth moving..." },
        {
          type: "listening",
          text: "Overall, it's a strong draft, and I think a shorter introduction would make it even better.", question: "What does the speaker think?",
          options: ["The draft is good but could be improved", "The draft should be rewritten", "The introduction is perfect"], correctIndex: 0
        },
        { type: "speak", text: "What works really well is the clear structure. It might be worth shortening the introduction." },
        {
          type: "translate",
          prompt: "Soften this criticism, starting with \"It might be worth\": \"Cut the introduction.\"",
          answers: ["it might be worth cutting the introduction", "it might be worth shortening the introduction", "it might be worth cutting down the introduction"],
          explanation: "It might be worth cutting the introduction."
        }
      ]
    },

    "x2-use-c1-discourse-markers": {
      lessonId: "x2-use-c1-discourse-markers", level: "C1", track: "Use of English", topic: "grammar", skill: "use",
      title: "Discourse markers", xpReward: 60, mascotState: "explaining",
      nextLessonId: "x2-read-c1-tech",
      explanation: {
        body: "Discourse markers organise ideas and add nuance: 'on the other hand' (introduces a contrast), 'as a result' (introduces a consequence), 'in fact' (adds a surprising truth), 'to be honest' (frames a sincere opinion), 'having said that' (adds a reservation). They give fluency and cohesion.",
        examples: [
          { en: "The plan is risky. Having said that, it could work." },
          { en: "On the other hand, prices are lower." },
          { en: "In fact, the opposite is true." }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "Which marker introduces a CONTRAST?", options: ["on the other hand", "in addition", "as a result"],
          correctIndex: 0, explanation: "'on the other hand' introduces a contrast." },
        { type: "fill_blank", sentence: "It rained all day. ___, the match was cancelled. (result)", answers: ["As a result", "Consequently"],
          hint: "A consequence.", explanation: "As a result / Consequently = this is the consequence." },
        { type: "categorize", instruction: "Does the marker add, contrast or conclude?", buckets: [
          { id: "add", label: "Adds" }, { id: "con", label: "Contrasts" }, { id: "fin", label: "Concludes" } ], items: [
          { t: "moreover", bucket: "add" }, { t: "however", bucket: "con" }, { t: "in conclusion", bucket: "fin" }, { t: "to sum up", bucket: "fin" } ] },
        { type: "true_false", statement: "'To be honest' softens or frames a personal opinion.", answer: true,
          explanation: "Yes, it introduces a sincere or softened opinion." },
        { type: "translate", prompt: "Correct a false belief with 'In fact': People think it's true, but the opposite is true.",
          answers: ["in fact, the opposite is true","in fact the opposite is true","in fact it is the opposite","in fact the opposite is the case"], explanation: "In fact, the opposite is true." }
      ]
    },

    "x2-read-c1-tech": {
      lessonId: "x2-read-c1-tech", level: "C1", track: "Reading", topic: "tech", skill: "reading",
      title: "Reading: The attention economy", xpReward: 64, mascotState: "explaining",
      nextLessonId: "x2-lis-c1-lecture",
      explanation: {
        body: "An argumentative text about the attention economy. Practise identifying the writer's position, tone and inferences.",
        examples: [
          { en: "Our attention has become a product." }
        ]
      },
      exercises: [
        { type: "reading", title: "The attention economy",
          passage: "We often assume that free apps are gifts from generous companies. In reality, when a service is free, our attention is the product being sold.\n\nEvery notification, autoplay video and infinite scroll is carefully designed to keep us looking a little longer, because more time means more advertising revenue. The technology is not neutral; it is engineered to be hard to put down.\n\nNone of this makes the apps useless. The point is simply that we should use them deliberately, deciding when and why we open them, rather than letting their design decide for us.",
          questions: [
            { q: "What is the author's main claim?", options: ["Free apps are pure gifts", "Technology is completely neutral", "Our attention is the real product"], correctIndex: 2, explanation: "\"our attention is the product being sold\"." },
            { q: "The author's tone is best described as...", options: ["Critical but balanced", "Completely enthusiastic", "Alarmed and hopeless"], correctIndex: 0, explanation: "The writer criticises the design but recognises its usefulness: critical but balanced." },
            { q: "What does the author recommend?", options: ["Deleting all apps", "Using apps deliberately", "Ignoring the problem"], correctIndex: 1, explanation: "\"we should use them deliberately\"." }
          ] },
        { type: "true_false", statement: "The author thinks the apps are useless.", answer: false,
          explanation: "\"None of this makes the apps useless.\"" },
        { type: "multiple_choice", question: "'Engineered to be hard to put down' suggests the design is...", options: ["accidental", "intentional", "broken"],
          correctIndex: 1, explanation: "'engineered' implies it is intentional, designed on purpose." },
        {
          type: "multiple_choice", question: "\"Advertising revenue\" means...",
          options: ["money earned from adverts", "the cost of making adverts", "a list of advertisers"], correctIndex: 0, explanation: "revenue = income."
        },
        {
          type: "matching", instruction: "Match each word from the text with its meaning.",
          pairs: [
            { l: "deliberately", r: "intentionally, after thinking about it" },
            { l: "neutral", r: "not supporting any side" },
            { l: "infinite scroll", r: "content that keeps loading as you scroll" },
            { l: "revenue", r: "income, especially of a company" }
          ]
        },
        {
          type: "translate",
          prompt: "Combine using \"rather than\": \"We should decide when to open apps. We shouldn't let their design decide for us.\"",
          answers: ["we should decide when to open apps rather than let their design decide for us", "we should decide when to open apps rather than letting their design decide for us"],
          explanation: "We should decide when to open apps rather than let their design decide for us."
        }
      ]
    },

    "x2-lis-c1-lecture": {
      lessonId: "x2-lis-c1-lecture", level: "C1", track: "Listening", topic: "science", skill: "listening",
      title: "Listening: A mini-lecture", xpReward: 60, mascotState: "explaining",
      nextLessonId: "x2-voc-c2-collocations",
      explanation: {
        body: "You will hear the start of a short academic talk. Follow the argument and the signposting ('first', 'however').",
        examples: [
          { en: "Today I'll outline two key ideas." }
        ]
      },
      exercises: [
        { type: "listening", text: "Good afternoon. Today I'll focus on sleep. First, sleep is not wasted time: the brain uses it to store memories and repair itself. However, modern habits, especially screens at night, delay sleep and reduce its quality. The main message is that protecting your sleep is one of the cheapest ways to improve your health.", "audio": "assets/audio/app/c1_8ab9bbe1a6.mp3",
          question: "What is the lecture mainly about?", options: ["Healthy food and balanced diets", "Exercise", "Sleep and health"], correctIndex: 2,
          explanation: "\"Today I'll focus on sleep\"." },
        { type: "listening", text: "Good afternoon. Today I'll focus on sleep. First, sleep is not wasted time: the brain uses it to store memories and repair itself. However, modern habits, especially screens at night, delay sleep and reduce its quality. The main message is that protecting your sleep is one of the cheapest ways to improve your health.", "audio": "assets/audio/app/c1_8ab9bbe1a6.mp3",
          question: "According to the speaker, what harms sleep?", options: ["Reading books", "Screens at night", "Morning coffee"], correctIndex: 1,
          explanation: "\"especially screens at night\"." },
        { type: "multiple_choice", question: "The word 'however' signals...", options: ["a contrast", "an example", "a conclusion"],
          correctIndex: 0, explanation: "'however' introduces a contrast." },
        { type: "true_false", statement: "The speaker says sleep is wasted time.", answer: false,
          explanation: "\"sleep is not wasted time\"." }
      ]
    },

    "x2-voc-c2-collocations": {
      lessonId: "x2-voc-c2-collocations", level: "C2", track: "Vocabulary", topic: "academic", skill: "vocab",
      title: "Advanced collocations", xpReward: 65, mascotState: "explaining",
      nextLessonId: "x2-use-c2-formality",
      explanation: {
        body: "Collocations are natural word combinations. We say 'make a decision' (not 'do'), 'a deeply rooted belief', 'a foregone conclusion', 'pose a threat', 'bear in mind'. Using them well is what sets a C2 speaker apart.",
        examples: [
          { en: "We need to make a difficult decision." },
          { en: "This poses a serious threat." },
          { en: "Bear in mind the deadline." }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "Which verb collocates with 'a decision'?", options: ["do", "take a", "make"],
          correctIndex: 2, explanation: "'make a decision' is the correct collocation." },
        { type: "matching", instruction: "Match the words to form natural collocations.", pairs: [
          { l: "pose", r: "a threat" }, { l: "bear", r: "in mind" }, { l: "draw", r: "a conclusion" }, { l: "meet", r: "a deadline" } ],
          explanation: "pose a threat, bear in mind, draw a conclusion, meet a deadline." },
        { type: "fill_blank", sentence: "Please ___ in mind that prices may change.", answers: ["bear", "keep"],
          hint: "bear/keep ___ in mind.", explanation: "bear / keep in mind = remember, take into account." },
        { type: "true_false", statement: "'Heavy rain' is a natural collocation in English.", answer: true,
          explanation: "Yes: heavy rain (not 'strong rain')." },
        { type: "translate", prompt: "Rewrite with the collocation 'pose a threat': This is seriously dangerous.",
          answers: ["this poses a serious threat","this poses a very serious threat"], explanation: "This poses a serious threat." }
      ]
    },

    "x2-use-c2-formality": {
      lessonId: "x2-use-c2-formality", level: "C2", track: "Grammar", topic: "grammar", skill: "grammar", tipo: "aprende", title: "Concessive clauses: much as, try as I might", rev: 2, xpReward: 65,
      mascotState: "explaining", nextLessonId: "x2-use-c2-inversion",
      explanation: {
        body: "\"Much as I admire her work, I can't support this project.\" \"Strange as it may seem, the plan worked.\" \"Try as she might, she couldn't open the door.\" These elegant concessive structures express contrast with more style than 'although'. They belong to sophisticated writing and formal speech. Adjective / adverb + as (or though) + subject + verb: Strange as it may seem, ... / Tired though he was, he kept going. Much as + clause (= although ... very much): Much as I'd like to help, I can't. Verb + as + subject + might / may (= however hard...): Try as they might, they couldn't win. However + adjective / adverb + subject + verb: However hard she tried, ... No matter how / what: No matter how carefully you plan, something goes wrong. Don't add 'but' to the main clause: the structure already expresses contrast.",
        examples: [
          { en: "Much as I admire her work, I can't support this project." },
          { en: "Strange as it may seem, the cheaper model performed better." },
          { en: "Try as he might, he couldn't remember her name." },
          { en: "The plan was successful, albeit more expensive than expected." }
        ],
        sections: [
          {
            kind: "intro",
            body: "\"Much as I admire her work, I can't support this project.\" \"Strange as it may seem, the plan worked.\" \"Try as she might, she couldn't open the door.\" These elegant concessive structures express contrast with more style than 'although'. They belong to sophisticated writing and formal speech."
          },
          {
            kind: "regla",
            body: "Adjective / adverb + as (or though) + subject + verb: Strange as it may seem, ... / Tired though he was, he kept going. Much as + clause (= although ... very much): Much as I'd like to help, I can't. Verb + as + subject + might / may (= however hard...): Try as they might, they couldn't win. However + adjective / adverb + subject + verb: However hard she tried, ... No matter how / what: No matter how carefully you plan, something goes wrong. Don't add 'but' to the main clause: the structure already expresses contrast."
          },
          {
            kind: "vocab",
            items: [
              { en: "concessive", ipa: "kənˈsesɪv", es: "expressing contrast with what is expected" },
              { en: "much as", es: "although (very much)" },
              { en: "try as one might", es: "however hard one tries" },
              { en: "strange as it may seem", es: "although it seems strange" },
              { en: "notwithstanding", ipa: "ˌnɒtwɪθˈstændɪŋ", es: "despite (formal)" },
              { en: "albeit", ipa: "ɔːlˈbiːɪt", es: "although (before an adjective or phrase)" },
              { en: "for all (his faults)", es: "despite (all his faults)" },
              { en: "no matter how", es: "however much; it makes no difference how" }
            ]
          },
          {
            kind: "expresiones",
            items: [
              { en: "Much as I'd like to, ...", es: "an emphatic, polite refusal" },
              { en: "Strange as it may seem, ...", es: "introduce a surprising fact" },
              { en: "Try as I might, ...", es: "describe a failed effort" },
              { en: "However tempting it may be, ...", es: "resist a temptation" }
            ]
          },
          {
            kind: "ejemplos",
            items: [
              { en: "Much as I admire her work, I can't support this project." },
              { en: "Strange as it may seem, the cheaper model performed better." },
              { en: "Try as he might, he couldn't remember her name." },
              { en: "The plan was successful, albeit more expensive than expected." }
            ]
          },
          {
            kind: "errores",
            items: [
              { no: "As strange it may seem, ...", si: "Strange as it may seem, ...", pq: "The adjective comes first, before as." },
              { no: "Much as I like him, but I don't trust him.", si: "Much as I like him, I don't trust him.", pq: "Don't add but: much as already shows contrast." },
              { no: "However I tried hard, I failed.", si: "However hard I tried, I failed.", pq: "However + adjective / adverb comes first." }
            ]
          },
          { kind: "resumen", body: "Adj + as + clause · Much as + clause · Try as + subject + might · However + adj + clause · albeit + adj. Never add 'but' afterwards." },
          { kind: "puente", body: "Add elegance to your contrasts." }
        ]
      },
      exercises: [
        {
          type: "multiple_choice", question: "___ as it may seem, the experiment worked on the first attempt.", options: ["Strange", "Strangely", "However strange"], correctIndex: 0,
          explanation: "Adjective + as + clause: Strange as it may seem."
        },
        {
          type: "find_error",
          segments: [{ u: "Much as" }, " I enjoy his company, ", { u: "but" }, " I find him ", { u: "exhausting" }, "."],
          correctIndex: 1, correction: "(delete 'but')", explanation: "Much as already expresses the contrast.", question: "Find the mistake"
        },
        { type: "fill_blank", sentence: "Try as she ___, she couldn't persuade the board.", answers: ["might", "may"], hint: "however hard she tried", explanation: "Try as she might, ..." },
        {
          type: "categorize", instruction: "Correct or incorrect?",
          buckets: [{ id: "ok", label: "Correct" }, { id: "wrong", label: "Incorrect" }],
          items: [
            { t: "Tired as she was, she kept working.", bucket: "ok" },
            { t: "However hard I try, I can't do it.", bucket: "ok" },
            { t: "Much as I'd like to come, I can't.", bucket: "ok" },
            { t: "As tired she was, she kept working.", bucket: "wrong" },
            { t: "However I try hard, I can't do it.", bucket: "wrong" },
            { t: "Much as I'd like to come, but I can't.", bucket: "wrong" }
          ]
        },
        { type: "word_order", words: ["disagree", "Much", "I", "as", "him", "I", "admire"], correctOrder: ["Much", "as", "I", "admire", "him", "I", "disagree"], hint: "Much as + clause, main clause." },
        {
          type: "listening", text: "Much as I'd love to join you, I'm afraid I have a deadline tomorrow.", question: "What does the speaker mean?",
          options: ["They would like to join but can't.", "They don't want to join.", "They will join after the deadline."], correctIndex: 0
        },
        {
          type: "matching", instruction: "Match each structure with its meaning.",
          pairs: [
            { l: "Much as I like it, ...", r: "Although I like it a lot, ..." },
            { l: "Try as I might, ...", r: "However hard I tried, ..." },
            { l: "Strange as it seems, ...", r: "Although it seems strange, ..." },
            { l: "..., albeit slowly", r: "..., although slowly" }
          ]
        },
        {
          type: "translate",
          prompt: "Rewrite starting with \"Much as\": \"Although I respect your opinion, I disagree.\"",
          answers: ["much as i respect your opinion i disagree", "much as i respect your opinion i have to disagree", "much as i respect your opinion i must disagree"],
          explanation: "Much as I respect your opinion, I disagree."
        },
        {
          type: "translate",
          prompt: "Rewrite starting with \"Try as\": \"However hard they tried, they couldn't find the error.\"",
          answers: ["try as they might they couldn't find the error", "try as they might they could not find the error", "try as they may they couldn't find the error"],
          explanation: "Try as they might, they couldn't find the error."
        }
      ]
    },

    "x2-use-c2-inversion": {
      lessonId: "x2-use-c2-inversion", level: "C2", track: "Functional English", topic: "debate", skill: "use", tipo: "aprende", title: "Conceding and countering in debate", rev: 2, xpReward: 65,
      mascotState: "explaining", nextLessonId: "x2-read-c2-argument",
      explanation: {
        body: "In a high-level debate, simply disagreeing isn't persuasive. Skilled speakers concede a point first, showing they've understood the other side, and then counter it: \"Granted, the policy is expensive. That said, the cost of doing nothing is far higher.\" This lesson gives you the moves. Concede: Granted, ... / Admittedly, ... / It's true that... / I'll grant you that... / There's some truth in... Counter: That said, ... / Even so, ... / Be that as it may, ... / Nonetheless, ... / This overlooks the fact that... Present the strongest form of the other view first: it makes your counterargument more credible. And don't concede too much: a concession is one step back before a step forward.",
        examples: [
          { en: "Granted, a four-day week may not suit every industry. That said, the trials so far have been remarkably positive." },
          { en: "Admittedly, the scheme is expensive; nonetheless, the long-term savings are considerable." },
          { en: "I'll grant you that the data is limited, but it all points in the same direction." },
          { en: "Be that as it may, the argument overlooks the impact on small businesses." }
        ],
        sections: [
          {
            kind: "intro",
            body: "In a high-level debate, simply disagreeing isn't persuasive. Skilled speakers concede a point first, showing they've understood the other side, and then counter it: \"Granted, the policy is expensive. That said, the cost of doing nothing is far higher.\" This lesson gives you the moves."
          },
          {
            kind: "regla",
            body: "Concede: Granted, ... / Admittedly, ... / It's true that... / I'll grant you that... / There's some truth in... Counter: That said, ... / Even so, ... / Be that as it may, ... / Nonetheless, ... / This overlooks the fact that... Present the strongest form of the other view first: it makes your counterargument more credible. And don't concede too much: a concession is one step back before a step forward."
          },
          {
            kind: "vocab",
            items: [
              { en: "concede", ipa: "kənˈsiːd", es: "accept that part of an argument is true" },
              { en: "counter", ipa: "ˈkaʊntə", es: "reply with an opposing argument" },
              { en: "granted", ipa: "ˈɡrɑːntɪd", es: "it is true (introducing a concession)" },
              { en: "admittedly", ipa: "ədˈmɪtɪdli", es: "it must be admitted that" },
              { en: "be that as it may", es: "even if that is true" },
              { en: "nonetheless", ipa: "ˌnʌnðəˈles", es: "despite what has just been said" },
              { en: "overlook", ipa: "ˌəʊvəˈlʊk", es: "fail to consider" },
              { en: "steelman", ipa: "ˈstiːlmæn", es: "present the strongest version of an opposing view" }
            ]
          },
          {
            kind: "expresiones",
            items: [
              { en: "Granted, ... That said, ...", es: "a concession followed by a counterargument" },
              { en: "I'll grant you that, but...", es: "a conversational concession" },
              { en: "Be that as it may, ...", es: "a formal counter" },
              { en: "That argument overlooks the fact that...", es: "expose a weakness" }
            ]
          },
          {
            kind: "ejemplos",
            items: [
              { en: "Granted, a four-day week may not suit every industry. That said, the trials so far have been remarkably positive." },
              { en: "Admittedly, the scheme is expensive; nonetheless, the long-term savings are considerable." },
              { en: "I'll grant you that the data is limited, but it all points in the same direction." },
              { en: "Be that as it may, the argument overlooks the impact on small businesses." }
            ]
          },
          {
            kind: "errores",
            items: [
              {
                no: "Granted that the plan is expensive.",
                si: "Granted, the plan is expensive. / Granted that the plan is expensive, it is still worth it.", pq: "'Granted that...' needs a main clause after it."
              },
              { no: "Be that as it might, ...", si: "Be that as it may, ...", pq: "This is a fixed expression." },
              {
                no: "Admittedly, the data is limited. Admittedly, we should act.", si: "Admittedly, the data is limited. Nevertheless, we should act.",
                pq: "Admittedly introduces a concession; you need a contrast word to counter."
              }
            ]
          },
          { kind: "resumen", body: "Concede (Granted / Admittedly / I'll grant you that) → counter (That said / Be that as it may / Nonetheless / This overlooks...). Steelman first, then strike." },
          { kind: "puente", body: "Take the floor and win the argument fairly." }
        ]
      },
      exercises: [
        {
          type: "categorize", instruction: "Concession or counter?",
          buckets: [{ id: "concede", label: "Concession" }, { id: "counter", label: "Counter" }],
          items: [
            { t: "Granted, ...", bucket: "concede" },
            { t: "Admittedly, ...", bucket: "concede" },
            { t: "I'll grant you that...", bucket: "concede" },
            { t: "There's some truth in that.", bucket: "concede" },
            { t: "That said, ...", bucket: "counter" },
            { t: "Be that as it may, ...", bucket: "counter" },
            { t: "Nonetheless, ...", bucket: "counter" },
            { t: "This overlooks the fact that...", bucket: "counter" }
          ]
        },
        {
          type: "multiple_choice",
          question: "Admittedly, nuclear power carries risks. ___, it produces almost no carbon emissions.", options: ["Nonetheless", "Granted", "Admittedly"], correctIndex: 0,
          explanation: "After the concession, a counter word: nonetheless."
        },
        {
          type: "listening",
          text: "I'll grant you that the policy is unpopular. Even so, it's the only realistic option we have.", question: "What is the speaker's position?",
          options: ["They support the policy despite its unpopularity.", "They oppose the policy.", "They think the policy is popular."], correctIndex: 0
        },
        {
          type: "find_error",
          segments: [{ u: "Be that as it might" }, ", the proposal ", { u: "overlooks" }, " ", { u: "several" }, " key risks."],
          correctIndex: 0, correction: "Be that as it may", explanation: "The fixed expression is 'Be that as it may'.", question: "Find the mistake"
        },
        {
          type: "matching", instruction: "Match each word with its meaning.",
          pairs: [
            { l: "concede", r: "accept that part of an argument is true" },
            { l: "overlook", r: "fail to consider" },
            { l: "steelman", r: "present the strongest version of an opposing view" },
            { l: "nonetheless", r: "despite what has just been said" },
            { l: "admittedly", r: "it must be admitted that" }
          ]
        },
        {
          type: "reading", title: "From a debate on remote work",
          passage: "Granted, remote work has made some teams feel isolated, and admittedly, not every job can be done from a kitchen table. Be that as it may, the critics overlook the fact that commuting costs the average worker over two hundred hours a year.\n\nMoreover, several studies suggest that productivity has, if anything, increased. That said, I would not argue for a purely remote model; the strongest case is for flexibility.",
          questions: [
            {
              q: "What does the speaker concede?",
              options: ["Some remote teams feel isolated.", "Commuting is cheap.", "Productivity has fallen."], correctIndex: 0, explanation: "Granted, remote work has made some teams feel isolated."
            },
            {
              q: "What is the speaker's final position?",
              options: ["Flexible working is best.", "Everyone should work remotely.", "Everyone should return to the office."], correctIndex: 0, explanation: "...the strongest case is for flexibility."
            },
            {
              q: "What is the function of \"Be that as it may\"?",
              options: ["To introduce a counterargument", "To add another concession", "To conclude the speech"], correctIndex: 0, explanation: "It turns from the concessions to the counterargument."
            }
          ]
        },
        { type: "speak", text: "Granted, the plan is expensive. That said, the cost of doing nothing is far higher." },
        {
          type: "translate",
          prompt: "Combine using \"Admittedly ... nonetheless\": \"The course is difficult. It is worth doing.\"",
          answers: ["admittedly the course is difficult nonetheless it is worth doing", "admittedly the course is difficult but nonetheless it is worth doing", "admittedly the course is difficult nonetheless it's worth doing"],
          explanation: "Admittedly, the course is difficult; nonetheless, it is worth doing."
        }
      ]
    },

    "x2-read-c2-argument": {
      lessonId: "x2-read-c2-argument", level: "C2", track: "Reading", topic: "philosophy", skill: "reading",
      title: "Reading: Progress and doubt", xpReward: 68, mascotState: "explaining",
      nextLessonId: "x2-biz-b1-interview",
      explanation: {
        body: "A dense opinion text. Practise distinguishing the thesis from the concessions, and catching irony and nuance.",
        examples: [
          { en: "Progress is not the same as improvement." }
        ]
      },
      exercises: [
        { type: "reading", title: "Progress and doubt",
          passage: "It is tempting to treat progress as an unstoppable force that always leaves us better off. Yet history suggests a more uncomfortable truth: change and improvement are not synonyms.\n\nEvery new technology solves certain problems while quietly creating others, and the people who benefit are rarely the same as those who pay the price. To question progress is not to long for the past; it is to insist that we choose our future rather than stumble into it.\n\nThe sceptic, then, is not the enemy of progress but its most useful ally — the one who asks, before we celebrate, what exactly we have gained, and at whose expense.",
          questions: [
            { q: "What is the author's central thesis?", options: ["Progress always improves life", "Change and improvement are not the same", "The past was better"], correctIndex: 1, explanation: "\"change and improvement are not synonyms\"." },
            { q: "How does the author view the sceptic?", options: ["As an enemy of progress", "As irrelevant", "As its most useful ally"], correctIndex: 2, explanation: "\"not the enemy of progress but its most useful ally\"." },
            { q: "'At whose expense' invites the reader to consider...", options: ["who pays the cost of progress", "how fast progress is", "where progress happens"], correctIndex: 0, explanation: "It asks who pays the price of progress." }
          ] },
        { type: "true_false", statement: "The author argues we should return to the past.", answer: false,
          explanation: "\"To question progress is not to long for the past\"." },
        { type: "multiple_choice", question: "The author's attitude to 'progress' is best described as...", options: ["uncritical praise of every new idea", "thoughtful scepticism", "total rejection"],
          correctIndex: 1, explanation: "The writer questions progress without rejecting it: thoughtful scepticism." },
        {
          type: "multiple_choice", question: "\"Change and improvement are not synonyms\" means...",
          options: ["change does not always make things better", "change and improvement are opposites", "improvement is impossible"], correctIndex: 0, explanation: "Change can be neutral or even negative."
        },
        {
          type: "matching", instruction: "Match each word from the text with its meaning.",
          pairs: [
            { l: "synonym", r: "a word with the same meaning as another" },
            { l: "sceptic", r: "a person who questions accepted ideas" },
            { l: "ally", r: "someone who supports you" },
            { l: "stumble into", r: "arrive somewhere by accident, without planning" }
          ]
        },
        {
          type: "find_error",
          segments: ["Every new technology ", { u: "solve" }, " certain problems while quietly ", { u: "creating" }, " ", { u: "others" }, "."],
          correctIndex: 0, correction: "solves", explanation: "Every + singular verb: every technology solves.", question: "Find the mistake"
        }
      ]
    },

    /* ==================================================================
     * Inglés profesional (Business)
     * ================================================================== */
    "x2-biz-b1-interview": {
      lessonId: "x2-biz-b1-interview", level: "B1", track: "Business English", topic: "business", skill: "use",
      title: "The job interview", xpReward: 55, mascotState: "explaining",
      nextLessonId: "x2-biz-b1-smalltalk",
      explanation: {
        body: "In an interview, prepare answers to typical questions: \"Tell me about yourself\", \"What are your strengths?\", \"Why do you want this job?\". Talk about achievements with action verbs: managed, improved, led. Be specific and positive.",
        examples: [
          { en: "I have five years of experience in marketing." },
          { en: "My greatest strength is problem-solving." },
          { en: "I improved sales by 20%." }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "Best answer to 'What are your strengths?'", options: ["Nothing special.", "I don't know.", "I'm good at teamwork and meeting deadlines."],
          correctIndex: 2, explanation: "Specific and positive, with examples of strengths." },
        { type: "matching", instruction: "Match each question with a good answer.", pairs: [
          { l: "Tell me about yourself", r: "I'm a designer with 4 years' experience." },
          { l: "Why this job?", r: "Your company's values match mine." },
          { l: "A weakness?", r: "I'm learning to delegate more." },
          { l: "Salary?", r: "I'm flexible and open to discussion." } ],
          explanation: "Specific, honest and positive answers." },
        { type: "fill_blank", sentence: "I ___ a team of five people. (was the leader of)", answers: ["led", "managed"],
          hint: "An action verb in the past.", explanation: "led / managed a team." },
        { type: "true_false", statement: "It's good to speak badly about your previous employer in an interview.", answer: false,
          explanation: "Avoid criticising previous jobs; it sounds unprofessional." },
        { type: "translate", prompt: "Rewrite with 'experience': I have done this kind of job for five years.",
          answers: ["i have five years of experience","i have 5 years of experience","i've got five years of experience","i have five years' experience","i have five years experience"], explanation: "I have five years of experience." }
      ]
    },

    "x2-biz-b1-smalltalk": {
      lessonId: "x2-biz-b1-smalltalk", level: "B1", track: "Business English", topic: "business", skill: "use",
      title: "Small talk at the office", xpReward: 52, mascotState: "explaining",
      nextLessonId: "x2-biz-b2-reports",
      explanation: {
        body: "Small talk breaks the ice before meetings. Safe topics: the weekend, the weather, travel, projects. \"How was your weekend?\", \"Any plans for the holidays?\". Avoid sensitive topics (salary, politics, religion).",
        examples: [
          { en: "How was your weekend?" },
          { en: "Did you have a good trip?" },
          { en: "It's been really busy lately, hasn't it?" }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "Which is GOOD small talk at work?", options: ["How was your weekend?", "How much do you earn?", "Why are you single?"],
          correctIndex: 0, explanation: "The weekend is a safe, friendly topic." },
        { type: "categorize", instruction: "Safe topic or one to avoid at work?", buckets: [
          { id: "ok", label: "Safe" }, { id: "no", label: "Avoid" } ], items: [
          { t: "the weather", bucket: "ok" }, { t: "your salary", bucket: "no" }, { t: "weekend plans", bucket: "ok" }, { t: "politics", bucket: "no" } ] },
        { type: "fill_blank", sentence: "A: How was your weekend? B: Great, thanks. ___ you?", answers: ["And", "How about"],
          hint: "Return the question.", explanation: "\"And you?\" / \"How about you?\"" },
        { type: "true_false", statement: "Returning the question ('And you?') keeps small talk friendly.", answer: true,
          explanation: "Yes, it keeps the conversation balanced and friendly." },
        { type: "translate", prompt: "It's Monday. Ask a colleague about their Saturday and Sunday.",
          answers: ["how was your weekend"], explanation: "How was your weekend?" }
      ]
    },

    "x2-biz-b2-reports": {
      lessonId: "x2-biz-b2-reports", level: "B2", track: "Business English", topic: "business", skill: "use",
      title: "Writing a report", xpReward: 58, mascotState: "explaining",
      nextLessonId: "x2-biz-c1-customer-emails",
      explanation: {
        body: "A professional report is clear and structured: Introduction, Findings, Conclusion, Recommendations. Use objective language and the passive voice when the result matters: \"The data were analysed\". Useful phrases: \"This report aims to...\", \"It is recommended that...\".",
        examples: [
          { en: "This report aims to assess customer satisfaction." },
          { en: "The findings suggest a clear trend." },
          { en: "It is recommended that we update the website." }
        ]
      },
      exercises: [
        { type: "word_order", words: ["This", "report", "aims", "to", "evaluate", "the", "results"],
          correctOrder: ["This", "report", "aims", "to", "evaluate", "the", "results"], hint: "A typical opening sentence for a report." },
        { type: "matching", instruction: "Match each section with its content.", pairs: [
          { l: "Introduction", r: "purpose of the report" }, { l: "Findings", r: "the data and results" }, { l: "Conclusion", r: "what it all means" }, { l: "Recommendations", r: "suggested actions" } ],
          explanation: "The standard structure of a report." },
        { type: "multiple_choice", question: "Most appropriate for a formal report?", options: ["Things went pretty well I guess.", "The results were largely positive.", "It was awesome!"],
          correctIndex: 1, explanation: "Objective and formal: 'The results were largely positive.'" },
        { type: "fill_blank", sentence: "It is ___ that the team meets weekly. (formal advice)", answers: ["recommended"],
          hint: "It is ___ that...", explanation: "It is recommended that..." },
        { type: "true_false", statement: "Reports usually mix in jokes and slang to sound friendly.", answer: false,
          explanation: "A report keeps an objective, formal tone." }
      ]
    },

    "x2-biz-c1-customer-emails": {
      lessonId: "x2-biz-c1-customer-emails", level: "C1", track: "Business English", topic: "business", skill: "use",
      title: "Emails to difficult customers", xpReward: 62, mascotState: "explaining",
      nextLessonId: null,
      explanation: {
        body: "Replying to a complaint requires tact. Acknowledge the problem, apologise appropriately, offer a solution and close politely. Soften your message with diplomatic language: \"I understand your frustration\", \"I do apologise for the inconvenience\", \"We would be happy to...\".",
        examples: [
          { en: "Thank you for bringing this to our attention." },
          { en: "I do apologise for the inconvenience caused." },
          { en: "We would be happy to offer you a full refund." }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "Best opening for a complaint reply?", options: ["You're wrong about this.", "Thank you for bringing this to our attention.", "Calm down, please."],
          correctIndex: 1, explanation: "It acknowledges the issue and thanks the customer, tactfully." },
        { type: "matching", instruction: "Match each function with the diplomatic phrase.", pairs: [
          { l: "Apologise", r: "I do apologise for the inconvenience." },
          { l: "Empathise", r: "I understand your frustration." },
          { l: "Offer a solution", r: "We would be happy to replace the item." },
          { l: "Close politely", r: "Please don't hesitate to contact me." } ],
          explanation: "The structure of a reply to a complaint." },
        { type: "fill_blank", sentence: "I do ___ for the delay in our reply. (say sorry)", answers: ["apologise", "apologize"],
          hint: "A verb for saying sorry.", explanation: "I do apologise/apologize for..." },
        { type: "true_false", statement: "In a complaint reply, it's best to blame the customer.", answer: false,
          explanation: "Never blame the customer; acknowledge and offer a solution." },
        { type: "translate", prompt: "Say sorry formally for the trouble the customer had, using 'inconvenience'.",
          answers: ["i apologise for the inconvenience","i apologize for the inconvenience","i do apologise for the inconvenience","i do apologize for the inconvenience","we apologise for the inconvenience","we apologize for the inconvenience","i'm sorry for the inconvenience","i am sorry for the inconvenience"],
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
