/* ============================================================
 * vesper_content_pack.js — Gran expansión de contenido de Vesper.
 *
 * ~19 lecciones nuevas (A1–B2) en TODAS las destrezas:
 *   reading (nuevo)  · listening · grammar · vocab · use
 *
 * Tipos de ejercicio usados (compatibles con el motor de leccion.html):
 *   multiple_choice · word_order · true_false · fill_blank · matching
 *   listening · categorize · translate · reading (pasaje + preguntas)
 *
 * El tipo "reading" es nuevo:
 *   { type:"reading", title, passage:"p1\n\np2", questions:[
 *       { q, options:[...], correctIndex, explanation } ] }
 *
 * Las lecciones de "listening" NO traen 'audio' (no hay MP3 para ellas):
 * el motor usa la voz natural del dispositivo. En cuanto se agreguen
 * archivos a assets/audio basta con poner 'audio' en cada ejercicio.
 *
 * Se fusiona en VESPER_LESSONS via VESPER_CONTENT_PACK.merge().
 * ============================================================ */
window.VESPER_CONTENT_PACK = (function () {
  var L = {

    /* ===================== READING (Lectura) ===================== */
    "read-a1-my-day": {
      lessonId: "read-a1-my-day", level: "A1", track: "Lectura", topic: "dailylife", skill: "reading",
      title: "Lectura: A day with Mia", xpReward: 40, mascotState: "explaining",
      nextLessonId: "read-a2-email",
      explanation: {
        body: "Vas a leer un texto corto y responder preguntas de comprensión. Lee con calma; puedes volver a leer las veces que quieras. (Lee el pasaje y responde.)",
        examples: [
          { en: "Read the text, then answer.", es: "Lee el texto y luego responde." },
          { en: "You can re-read anytime.", es: "Puedes releer cuando quieras." }
        ]
      },
      exercises: [
        { type: "reading", title: "A day with Mia",
          passage: "Mia is a nurse. She lives in a small town near the sea.\n\nEvery morning she gets up at six o'clock and drinks a cup of tea. She goes to the hospital by bike because she likes fresh air.\n\nAt work, Mia helps doctors and talks to patients. She finishes at four in the afternoon. After work, she walks on the beach with her dog, Coco.",
          questions: [
            { q: "What is Mia's job?", options: ["She is a teacher.", "She is a nurse.", "She is a doctor."], correctIndex: 1, explanation: "The text says: \"Mia is a nurse.\"" },
            { q: "How does she go to the hospital?", options: ["By bus", "By car", "By bike"], correctIndex: 2, explanation: "\"She goes to the hospital by bike.\"" },
            { q: "What does she do after work?", options: ["She walks on the beach.", "She cooks dinner.", "She watches TV."], correctIndex: 0, explanation: "\"After work, she walks on the beach with her dog.\"" }
          ] },
        { type: "true_false", statement: "Mia gets up at seven o'clock.", answer: false, explanation: "She gets up at six o'clock." },
        { type: "matching", instruction: "Une la palabra del texto con su traducción.", pairs: [
          { l: "nurse", r: "enfermera" }, { l: "town", r: "pueblo" },
          { l: "beach", r: "playa" }, { l: "bike", r: "bicicleta" }
        ] },
        { type: "fill_blank", sentence: "Mia drinks a cup of ___ in the morning.", answers: ["tea"], hint: "Está en el texto.", explanation: "\"...drinks a cup of tea.\"" },
        { type: "multiple_choice", question: "Coco is Mia's...", options: ["cat", "dog", "friend"], correctIndex: 1, explanation: "\"...with her dog, Coco.\"" },
        { type: "translate", prompt: "Traduce: \"Ella vive cerca del mar.\"",
          answers: ["she lives near the sea", "she lives close to the sea"], explanation: "She lives near the sea." }
      ]
    },

    "read-a2-email": {
      lessonId: "read-a2-email", level: "A2", track: "Lectura", topic: "dailylife", skill: "reading",
      title: "Lectura: An email to a friend", xpReward: 42, mascotState: "explaining",
      nextLessonId: "read-b1-article",
      explanation: {
        body: "Los correos informales usan saludos como \"Hi\" y despedidas como \"See you soon\". Lee el correo y fíjate en los detalles. (Lee el email y responde.)",
        examples: [
          { en: "Hi Sam, how are you?", es: "Hola Sam, ¿cómo estás?" },
          { en: "See you soon!", es: "¡Nos vemos pronto!" }
        ]
      },
      exercises: [
        { type: "reading", title: "An email from Laura",
          passage: "Hi Sam,\n\nThank you for your message! I'm having a great time in Madrid. The weather is sunny and the food is amazing.\n\nYesterday I visited a famous museum and walked around the old city. Tomorrow I'm going to take a day trip to Toledo with my cousin.\n\nI'll be back on Sunday. Do you want to meet for coffee next week?\n\nSee you soon,\nLaura",
          questions: [
            { q: "Where is Laura?", options: ["In Toledo", "In Madrid", "At home"], correctIndex: 1, explanation: "\"I'm having a great time in Madrid.\"" },
            { q: "What did she do yesterday?", options: ["She visited a museum.", "She went to Toledo.", "She met Sam."], correctIndex: 0, explanation: "\"Yesterday I visited a famous museum...\"" },
            { q: "When will she be back?", options: ["On Saturday", "On Sunday", "Next week"], correctIndex: 1, explanation: "\"I'll be back on Sunday.\"" }
          ] },
        { type: "multiple_choice", question: "Laura is going to Toledo with her...", options: ["friend", "sister", "cousin"], correctIndex: 2, explanation: "\"...a day trip to Toledo with my cousin.\"" },
        { type: "true_false", statement: "The weather in Madrid is rainy.", answer: false, explanation: "\"The weather is sunny.\"" },
        { type: "fill_blank", sentence: "Laura wants to meet Sam for ___ next week.", answers: ["coffee", "a coffee"], hint: "Está al final del correo.", explanation: "\"...meet for coffee next week?\"" },
        { type: "word_order", words: ["I", "had", "a", "great", "time"], correctOrder: ["I", "had", "a", "great", "time"], hint: "Empieza con el sujeto \"I\"." },
        { type: "translate", prompt: "Traduce: \"Nos vemos pronto.\"",
          answers: ["see you soon"], explanation: "See you soon." }
      ]
    },

    "read-b1-article": {
      lessonId: "read-b1-article", level: "B1", track: "Lectura", topic: "tech", skill: "reading",
      title: "Lectura: Working from home", xpReward: 48, mascotState: "explaining",
      nextLessonId: "read-b2-story",
      explanation: {
        body: "Vas a leer un artículo corto con una idea principal y detalles. Busca pros y contras y la opinión del autor. (Lee el artículo y responde.)",
        examples: [
          { en: "the main idea", es: "la idea principal" },
          { en: "pros and cons", es: "ventajas y desventajas" }
        ]
      },
      exercises: [
        { type: "reading", title: "Working from home",
          passage: "Ten years ago, almost everyone travelled to an office every day. Today, millions of people work from home, at least part of the week.\n\nThere are clear advantages. Workers save time and money because they don't commute, and many say they feel more relaxed. Companies can also save money on big offices.\n\nHowever, working from home is not perfect. Some people feel lonely, and it can be hard to switch off at the end of the day. Experts say the best solution may be a mix: a few days at home and a few days in the office.",
          questions: [
            { q: "What is the main topic of the article?", options: ["How to find a job", "The good and bad sides of working from home", "Why offices are closing"], correctIndex: 1, explanation: "The text discusses advantages and disadvantages of remote work." },
            { q: "According to the text, one advantage is that workers...", options: ["earn more money", "save time on commuting", "never feel lonely"], correctIndex: 1, explanation: "\"Workers save time and money because they don't commute.\"" },
            { q: "What solution do experts suggest?", options: ["Always work in the office", "Always work from home", "A mix of home and office"], correctIndex: 2, explanation: "\"...the best solution may be a mix.\"" }
          ] },
        { type: "matching", instruction: "Une la palabra con su significado.", pairs: [
          { l: "commute", r: "viajar al trabajo" }, { l: "advantage", r: "ventaja" },
          { l: "lonely", r: "solo/a" }, { l: "switch off", r: "desconectar" }
        ] },
        { type: "true_false", statement: "The article says working from home is perfect.", answer: false, explanation: "\"...working from home is not perfect.\"" },
        { type: "fill_blank", sentence: "Some people feel ___ when they work alone at home.", answers: ["lonely"], hint: "Adjetivo del texto.", explanation: "\"Some people feel lonely...\"" },
        { type: "multiple_choice", question: "Who can also save money, according to the text?", options: ["Companies", "Governments", "Schools"], correctIndex: 0, explanation: "\"Companies can also save money on big offices.\"" },
        { type: "translate", prompt: "Traduce: \"Yo trabajo desde casa dos días a la semana.\"",
          answers: ["i work from home two days a week", "i work from home twice a week"], explanation: "I work from home two days a week." }
      ]
    },

    "read-b2-story": {
      lessonId: "read-b2-story", level: "B2", track: "Lectura", topic: "society", skill: "reading",
      title: "Lectura: The lost wallet", xpReward: 52, mascotState: "explaining",
      explanation: {
        body: "Un texto narrativo con un pequeño giro. Fíjate en el orden de los hechos y en cómo se siente el personaje. (Lee la historia y responde.)",
        examples: [
          { en: "the twist", es: "el giro" },
          { en: "how the character feels", es: "cómo se siente el personaje" }
        ]
      },
      exercises: [
        { type: "reading", title: "The lost wallet",
          passage: "On her way to work, Carla noticed a brown wallet lying on the pavement. She looked around, but the street was empty. Inside, she found some cash, a few cards and a photo of a smiling family.\n\nAlthough she was in a hurry, Carla decided to hand the wallet in at the nearest police station. She didn't expect anything in return.\n\nTwo weeks later, a letter arrived. The owner, a retired teacher, thanked her warmly and invited her to dinner. To her surprise, he turned out to be her neighbour from the flat upstairs.",
          questions: [
            { q: "Where did Carla find the wallet?", options: ["At work", "On the pavement", "At the police station"], correctIndex: 1, explanation: "\"...a brown wallet lying on the pavement.\"" },
            { q: "What did Carla do with the wallet?", options: ["She kept the money.", "She left it there.", "She handed it in at a police station."], correctIndex: 2, explanation: "\"...decided to hand the wallet in at the nearest police station.\"" },
            { q: "What was the surprise at the end?", options: ["The owner was her upstairs neighbour.", "The wallet was empty.", "The owner was a police officer."], correctIndex: 0, explanation: "\"...he turned out to be her neighbour from the flat upstairs.\"" }
          ] },
        { type: "multiple_choice", question: "The phrase \"in a hurry\" means...", options: ["with a lot of time", "in a rush", "feeling sad"], correctIndex: 1, explanation: "\"In a hurry\" = con prisa." },
        { type: "true_false", statement: "Carla expected a reward for returning the wallet.", answer: false, explanation: "\"She didn't expect anything in return.\"" },
        { type: "matching", instruction: "Une la expresión con su significado.", pairs: [
          { l: "hand in", r: "entregar" }, { l: "in return", r: "a cambio" },
          { l: "turn out", r: "resultar (ser)" }, { l: "retired", r: "jubilado/a" }
        ] },
        { type: "fill_blank", sentence: "The owner was a ___ teacher.", answers: ["retired"], hint: "Ya no trabaja.", explanation: "\"The owner, a retired teacher...\"" },
        { type: "translate", prompt: "Traduce: \"Ella decidió entregar la cartera.\"",
          answers: ["she decided to hand in the wallet", "she decided to hand the wallet in"], explanation: "She decided to hand in the wallet." }
      ]
    },

    /* ===================== LISTENING ===================== */
    "lis-a1-intro": {
      lessonId: "lis-a1-intro", level: "A1", track: "Listening", topic: "dailylife", skill: "listening",
      title: "Escucha: presentarse", xpReward: 36, mascotState: "explaining",
      nextLessonId: "lis-a2-directions",
      explanation: {
        body: "Escucha frases para presentarse: nombre, país y trabajo. Toca el botón para oír y, si necesitas, usa \"Más lento\". (Comprensión auditiva A1.)",
        examples: [
          { en: "Hello, I'm Tom.", es: "Hola, soy Tom." },
          { en: "I'm from Canada.", es: "Soy de Canadá." }
        ]
      },
      exercises: [
        { type: "listening", text: "Hello, my name is David.", question: "¿Qué escuchaste?",
          options: ["Hello, my name is David.", "Hello, my game is David.", "Yellow, my name is David."], correctIndex: 0 },
        { type: "listening", text: "I am from Mexico.", question: "¿De dónde es la persona?",
          options: ["De México", "De Brasil", "De España"], correctIndex: 0 },
        { type: "listening", text: "I am a teacher.", question: "¿Cuál es su trabajo?",
          options: ["Profesor/a", "Doctor/a", "Estudiante"], correctIndex: 0 },
        { type: "listening", text: "Nice to meet you.", question: "¿Qué significa lo que oíste?",
          options: ["Mucho gusto", "Hasta luego", "Lo siento"], correctIndex: 0 },
        { type: "true_false", statement: "El audio decía: \"I am a teacher.\"", answer: true, explanation: "Sí: teacher = profesor/a." },
        { type: "listening", text: "Where are you from?", question: "Escribe lo que escuchaste:",
          answers: ["where are you from"], explanation: "Where are you from?" }
      ]
    },

    "lis-a2-directions": {
      lessonId: "lis-a2-directions", level: "A2", track: "Listening", topic: "travel", skill: "listening",
      title: "Escucha: dar direcciones", xpReward: 40, mascotState: "explaining",
      nextLessonId: "lis-b1-voicemail",
      explanation: {
        body: "Escucha indicaciones para llegar a un lugar: turn left, turn right, go straight. Fíjate en los giros. (Comprensión auditiva A2.)",
        examples: [
          { en: "Turn left at the corner.", es: "Gira a la izquierda en la esquina." },
          { en: "Go straight on.", es: "Sigue recto." }
        ]
      },
      exercises: [
        { type: "listening", text: "Turn left at the traffic lights.", question: "¿Qué debes hacer?",
          options: ["Girar a la izquierda", "Girar a la derecha", "Seguir recto"], correctIndex: 0 },
        { type: "listening", text: "The bank is next to the supermarket.", question: "¿Dónde está el banco?",
          options: ["Al lado del supermercado", "Enfrente del parque", "Detrás de la escuela"], correctIndex: 0 },
        { type: "listening", text: "Go straight on for two blocks.", question: "¿Cuántas cuadras sigues recto?",
          options: ["Dos", "Tres", "Cinco"], correctIndex: 0 },
        { type: "listening", text: "It's on your right.", question: "¿Dónde está?",
          options: ["A tu derecha", "A tu izquierda", "Detrás de ti"], correctIndex: 0 },
        { type: "matching", instruction: "Une la instrucción con su traducción.", pairs: [
          { l: "turn right", r: "gira a la derecha" }, { l: "go straight", r: "sigue recto" },
          { l: "next to", r: "al lado de" }, { l: "opposite", r: "enfrente de" }
        ] },
        { type: "listening", text: "Excuse me, how do I get to the station?", question: "Escribe lo que escuchaste:",
          answers: ["excuse me how do i get to the station"], explanation: "Excuse me, how do I get to the station?" }
      ]
    },

    "lis-b1-voicemail": {
      lessonId: "lis-b1-voicemail", level: "B1", track: "Listening", topic: "business", skill: "listening",
      title: "Escucha: un mensaje de voz", xpReward: 46, mascotState: "explaining",
      nextLessonId: "lis-b2-interview",
      explanation: {
        body: "Escucha mensajes más largos con varios datos: hora, lugar y motivo. Usa \"Más lento\" si lo necesitas. (Comprensión auditiva B1.)",
        examples: [
          { en: "I'm calling about the meeting.", es: "Llamo por la reunión." },
          { en: "Could you call me back?", es: "¿Podrías devolverme la llamada?" }
        ]
      },
      exercises: [
        { type: "listening", text: "Hi, this is Anna. I'm calling about tomorrow's meeting.", question: "¿Por qué llama Anna?",
          options: ["Por la reunión de mañana", "Por una factura", "Por un viaje"], correctIndex: 0 },
        { type: "listening", text: "The meeting has been moved to three o'clock.", question: "¿A qué hora es ahora la reunión?",
          options: ["A las tres", "A las dos", "A las cinco"], correctIndex: 0 },
        { type: "listening", text: "Please bring the sales report with you.", question: "¿Qué debes llevar?",
          options: ["El informe de ventas", "Tu pasaporte", "El almuerzo"], correctIndex: 0 },
        { type: "listening", text: "Could you call me back before five, please?", question: "¿Antes de qué hora debes llamar?",
          options: ["Antes de las cinco", "Antes de las nueve", "Después de las cinco"], correctIndex: 0 },
        { type: "true_false", statement: "Anna pidió que lleves el informe de ventas.", answer: true, explanation: "\"Please bring the sales report.\"" },
        { type: "listening", text: "Thanks, talk to you soon.", question: "Escribe lo que escuchaste:",
          answers: ["thanks talk to you soon"], explanation: "Thanks, talk to you soon." }
      ]
    },

    "lis-b2-interview": {
      lessonId: "lis-b2-interview", level: "B2", track: "Listening", topic: "business", skill: "listening",
      title: "Escucha: una entrevista", xpReward: 50, mascotState: "explaining",
      explanation: {
        body: "Escucha fragmentos de una entrevista de trabajo. Atiende a opiniones, razones y matices. (Comprensión auditiva B2.)",
        examples: [
          { en: "What are your strengths?", es: "¿Cuáles son tus fortalezas?" },
          { en: "I'd say my main strength is teamwork.", es: "Diría que mi mayor fortaleza es el trabajo en equipo." }
        ]
      },
      exercises: [
        { type: "listening", text: "I'd say my main strength is solving problems under pressure.", question: "¿Cuál es su mayor fortaleza?",
          options: ["Resolver problemas bajo presión", "Hablar idiomas", "Llegar temprano"], correctIndex: 0 },
        { type: "listening", text: "In my previous job, I led a team of eight people.", question: "¿A cuántas personas dirigía?",
          options: ["A ocho", "A dos", "A dieciocho"], correctIndex: 0 },
        { type: "listening", text: "I'm looking for a role with more responsibility.", question: "¿Qué busca la persona?",
          options: ["Un puesto con más responsabilidad", "Un salario menor", "Menos horas"], correctIndex: 0 },
        { type: "listening", text: "Honestly, I sometimes take on too much work.", question: "¿Qué admite como debilidad?",
          options: ["Que a veces asume demasiado trabajo", "Que llega tarde", "Que no habla inglés"], correctIndex: 0 },
        { type: "matching", instruction: "Une la expresión con su significado.", pairs: [
          { l: "strength", r: "fortaleza" }, { l: "weakness", r: "debilidad" },
          { l: "take on", r: "asumir" }, { l: "role", r: "puesto/rol" }
        ] },
        { type: "listening", text: "Could you tell me about the team I would join?", question: "Escribe lo que escuchaste:",
          answers: ["could you tell me about the team i would join"], explanation: "Could you tell me about the team I would join?" }
      ]
    },

    /* ===================== GRAMMAR ===================== */
    "gram-a1-articles": {
      lessonId: "gram-a1-articles", level: "A1", track: "Core Grammar", topic: "grammar", skill: "grammar",
      title: "Artículos: a / an / the", xpReward: 38, mascotState: "explaining",
      nextLessonId: "gram-a2-past-simple",
      explanation: {
        body: "Usamos \"a\" antes de sonido consonante (a car) y \"an\" antes de sonido vocal (an apple). \"the\" es para algo específico o ya conocido. (a/an para algo general; the para algo específico.)",
        examples: [
          { en: "I have a dog.", es: "Tengo un perro." },
          { en: "She is an engineer.", es: "Ella es ingeniera." },
          { en: "Close the door, please.", es: "Cierra la puerta, por favor." }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "Choose: I want ___ apple.", options: ["a", "an", "the"], correctIndex: 1, explanation: "\"apple\" empieza con sonido vocal -> an." },
        { type: "multiple_choice", question: "Choose: She has ___ car.", options: ["a", "an", "the"], correctIndex: 0, explanation: "\"car\" empieza con sonido consonante -> a." },
        { type: "fill_blank", sentence: "Please open ___ window. (la que ya conocemos)", answers: ["the"], hint: "Algo específico -> the.", explanation: "\"the window\" = una ventana concreta." },
        { type: "categorize", instruction: "¿a o an?", buckets: [
          { id: "a", label: "a" }, { id: "an", label: "an" }
        ], items: [
          { t: "umbrella", bucket: "an" }, { t: "house", bucket: "a" },
          { t: "orange", bucket: "an" }, { t: "book", bucket: "a" }
        ] },
        { type: "true_false", statement: "Usamos \"an\" antes de \"hour\" (la 'h' es muda).", answer: true, explanation: "El sonido es vocal -> an hour." },
        { type: "word_order", words: ["She", "is", "an", "artist"], correctOrder: ["She", "is", "an", "artist"], hint: "artista empieza con sonido vocal." },
        { type: "translate", prompt: "Traduce: \"Tengo un perro.\"",
          answers: ["i have a dog", "i've got a dog", "i have got a dog"], explanation: "I have a dog." }
      ]
    },

    "gram-a2-past-simple": {
      lessonId: "gram-a2-past-simple", level: "A2", track: "Core Grammar", topic: "grammar", skill: "grammar",
      title: "Pasado simple", xpReward: 44, mascotState: "explaining",
      nextLessonId: "gram-b1-present-perfect",
      explanation: {
        body: "El pasado simple habla de acciones terminadas. Regulares: add -ed (worked). Irregulares cambian (go -> went). En negativo y preguntas usamos did: I didn't go / Did you go? (Acciones del pasado ya terminadas.)",
        examples: [
          { en: "I worked yesterday.", es: "Trabajé ayer." },
          { en: "She went to London.", es: "Ella fue a Londres." },
          { en: "Did you see the film?", es: "¿Viste la película?" }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "Past of \"go\":", options: ["goed", "went", "gone"], correctIndex: 1, explanation: "\"go\" es irregular -> went." },
        { type: "fill_blank", sentence: "Yesterday I ___ (watch) a great film.", answers: ["watched"], hint: "Regular: + -ed.", explanation: "watch -> watched." },
        { type: "multiple_choice", question: "Choose the negative: \"She ___ come to the party.\"", options: ["didn't", "doesn't", "isn't"], correctIndex: 0, explanation: "Pasado negativo: didn't + verbo base." },
        { type: "word_order", words: ["Did", "you", "call", "her", "?"], correctOrder: ["Did", "you", "call", "her", "?"], hint: "Pregunta en pasado: Did + sujeto + verbo." },
        { type: "categorize", instruction: "¿Verbo regular o irregular?", buckets: [
          { id: "reg", label: "Regular" }, { id: "irr", label: "Irregular" }
        ], items: [
          { t: "play -> played", bucket: "reg" }, { t: "eat -> ate", bucket: "irr" },
          { t: "study -> studied", bucket: "reg" }, { t: "buy -> bought", bucket: "irr" }
        ] },
        { type: "true_false", statement: "En \"Did you go?\" el verbo va en pasado (went).", answer: false, explanation: "Tras \"did\" el verbo va en base: Did you go?" },
        { type: "translate", prompt: "Traduce: \"Ella fue a Londres.\"",
          answers: ["she went to london"], explanation: "She went to London." }
      ]
    },

    "gram-b1-present-perfect": {
      lessonId: "gram-b1-present-perfect", level: "B1", track: "Core Grammar", topic: "grammar", skill: "grammar",
      title: "Present perfect: for / since / ever", xpReward: 48, mascotState: "explaining",
      nextLessonId: "gram-b2-conditionals",
      explanation: {
        body: "Present perfect = have/has + participio. Lo usamos para experiencias (Have you ever...?) y para algo que empezó en el pasado y sigue ahora. Usa for + periodo y since + punto de inicio. (Conecta pasado y presente.)",
        examples: [
          { en: "I have lived here for five years.", es: "He vivido aquí cinco años." },
          { en: "She has worked here since 2020.", es: "Ella trabaja aquí desde 2020." },
          { en: "Have you ever been to Japan?", es: "¿Alguna vez has estado en Japón?" }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "Choose: I have known him ___ ten years.", options: ["since", "for", "ago"], correctIndex: 1, explanation: "for + periodo de tiempo (ten years)." },
        { type: "multiple_choice", question: "Choose: She has lived here ___ 2019.", options: ["for", "since", "during"], correctIndex: 1, explanation: "since + punto de inicio (2019)." },
        { type: "fill_blank", sentence: "Have you ___ eaten sushi? (alguna vez)", answers: ["ever"], hint: "experiencia: Have you ever...?", explanation: "Have you ever eaten...?" },
        { type: "multiple_choice", question: "Participle of \"see\":", options: ["saw", "seen", "seed"], correctIndex: 1, explanation: "see - saw - seen." },
        { type: "categorize", instruction: "¿for o since?", buckets: [
          { id: "for", label: "for" }, { id: "since", label: "since" }
        ], items: [
          { t: "three weeks", bucket: "for" }, { t: "Monday", bucket: "since" },
          { t: "a long time", bucket: "for" }, { t: "2010", bucket: "since" }
        ] },
        { type: "true_false", statement: "\"I have finished\" describes a completed action with a present result.", answer: true, explanation: "El present perfect conecta la acción con el ahora." },
        { type: "translate", prompt: "Traduce: \"He vivido aquí cinco años.\"",
          answers: ["i have lived here for five years", "i've lived here for five years"], explanation: "I have lived here for five years." }
      ]
    },

    "gram-b2-conditionals": {
      lessonId: "gram-b2-conditionals", level: "B2", track: "Core Grammar", topic: "grammar", skill: "grammar",
      title: "Condicionales (0, 1 y 2)", xpReward: 54, mascotState: "explaining",
      explanation: {
        body: "Zero: hechos (If you heat ice, it melts). First: futuro real (If it rains, I'll stay home). Second: hipotético (If I had money, I would travel). El second usa pasado + would. (If + condición, resultado.)",
        examples: [
          { en: "If you heat ice, it melts.", es: "Si calientas hielo, se derrite." },
          { en: "If it rains, I will stay home.", es: "Si llueve, me quedaré en casa." },
          { en: "If I were rich, I would travel.", es: "Si fuera rico, viajaría." }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "First conditional: \"If it rains, I ___ at home.\"", options: ["stay", "will stay", "would stay"], correctIndex: 1, explanation: "First conditional: if + presente, will + verbo." },
        { type: "multiple_choice", question: "Second conditional: \"If I ___ you, I would say no.\"", options: ["am", "were", "will be"], correctIndex: 1, explanation: "Second conditional usa \"were\" para todas las personas." },
        { type: "fill_blank", sentence: "If you mix blue and yellow, you ___ green. (hecho)", answers: ["get", "make"], hint: "Zero conditional: presente + presente.", explanation: "Zero conditional: ...you get green." },
        { type: "categorize", instruction: "¿Real (1st) o hipotético (2nd)?", buckets: [
          { id: "first", label: "1st (real)" }, { id: "second", label: "2nd (hipotético)" }
        ], items: [
          { t: "If I have time, I'll call you.", bucket: "first" },
          { t: "If I won the lottery, I'd buy a house.", bucket: "second" },
          { t: "If she studies, she'll pass.", bucket: "first" },
          { t: "If I were taller, I'd play basketball.", bucket: "second" }
        ] },
        { type: "true_false", statement: "En el second conditional usamos \"will\" en la parte del resultado.", answer: false, explanation: "Usamos \"would\", no \"will\": I would travel." },
        { type: "word_order", words: ["If", "I", "had", "time,", "I", "would", "help"], correctOrder: ["If", "I", "had", "time,", "I", "would", "help"], hint: "Second conditional: If + pasado, would + verbo." },
        { type: "translate", prompt: "Traduce: \"Si llueve, me quedaré en casa.\"",
          answers: ["if it rains i will stay home", "if it rains i'll stay home", "if it rains i will stay at home", "if it rains i'll stay at home"], explanation: "If it rains, I'll stay home." }
      ]
    },

    /* ===================== VOCAB ===================== */
    "voc-a1-body": {
      lessonId: "voc-a1-body", level: "A1", track: "Vocabulario", topic: "dailylife", skill: "vocab",
      title: "El cuerpo y los colores", xpReward: 34, mascotState: "explaining",
      nextLessonId: "voc-a2-health",
      explanation: {
        body: "Partes del cuerpo (head, hand, eye) y colores (red, blue, green). Para describir: \"She has blue eyes.\" (Vocabulario básico de cuerpo y colores.)",
        examples: [
          { en: "I have two hands.", es: "Tengo dos manos." },
          { en: "Her eyes are green.", es: "Sus ojos son verdes." }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Une la parte del cuerpo con su traducción.", pairs: [
          { l: "head", r: "cabeza" }, { l: "hand", r: "mano" },
          { l: "eye", r: "ojo" }, { l: "foot", r: "pie" }
        ] },
        { type: "matching", instruction: "Une el color con su traducción.", pairs: [
          { l: "red", r: "rojo" }, { l: "blue", r: "azul" },
          { l: "green", r: "verde" }, { l: "black", r: "negro" }
        ] },
        { type: "multiple_choice", question: "We see with our...", options: ["ears", "eyes", "nose"], correctIndex: 1, explanation: "eyes = ojos (para ver)." },
        { type: "fill_blank", sentence: "Grass is ___.", answers: ["green"], hint: "Color del césped.", explanation: "Grass is green." },
        { type: "categorize", instruction: "¿Parte del cuerpo o color?", buckets: [
          { id: "body", label: "Cuerpo" }, { id: "color", label: "Color" }
        ], items: [
          { t: "arm", bucket: "body" }, { t: "yellow", bucket: "color" },
          { t: "leg", bucket: "body" }, { t: "white", bucket: "color" }
        ] },
        { type: "translate", prompt: "Traduce: \"Sus ojos son azules.\"",
          answers: ["her eyes are blue", "his eyes are blue"], explanation: "Her/His eyes are blue." }
      ]
    },

    "voc-a2-health": {
      lessonId: "voc-a2-health", level: "A2", track: "Vocabulario", topic: "dailylife", skill: "vocab",
      title: "Salud y el médico", xpReward: 40, mascotState: "explaining",
      nextLessonId: "voc-b1-money",
      explanation: {
        body: "En el médico decimos los síntomas con \"I have a...\": I have a headache, a cold, a fever. Consejos con should: You should rest. (Vocabulario de salud y consejos con should.)",
        examples: [
          { en: "I have a headache.", es: "Tengo dolor de cabeza." },
          { en: "You should drink water.", es: "Deberías beber agua." }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Une el síntoma con su traducción.", pairs: [
          { l: "headache", r: "dolor de cabeza" }, { l: "cough", r: "tos" },
          { l: "fever", r: "fiebre" }, { l: "sore throat", r: "dolor de garganta" }
        ] },
        { type: "fill_blank", sentence: "You ___ see a doctor. (consejo)", answers: ["should"], hint: "consejo = should + verbo.", explanation: "You should see a doctor." },
        { type: "multiple_choice", question: "\"I have a cold\" means...", options: ["Tengo frío", "Estoy resfriado", "Tengo hambre"], correctIndex: 1, explanation: "have a cold = estar resfriado." },
        { type: "true_false", statement: "\"You shouldn't smoke\" is good health advice.", answer: true, explanation: "shouldn't = no deberías." },
        { type: "listening", text: "I have a terrible headache.", question: "¿Qué le pasa?",
          options: ["Dolor de cabeza", "Dolor de pies", "Tos"], correctIndex: 0 },
        { type: "translate", prompt: "Traduce: \"Deberías descansar.\"",
          answers: ["you should rest", "you should take a rest"], explanation: "You should rest." }
      ]
    },

    "voc-b1-money": {
      lessonId: "voc-b1-money", level: "B1", track: "Vocabulario", topic: "business", skill: "vocab",
      title: "Dinero y banco", xpReward: 46, mascotState: "explaining",
      nextLessonId: "voc-b2-environment",
      explanation: {
        body: "Vocabulario de dinero: save (ahorrar), spend (gastar), borrow (pedir prestado), lend (prestar), afford (poder permitirse). (Verbos clave para hablar de dinero.)",
        examples: [
          { en: "I save 10% of my salary.", es: "Ahorro el 10% de mi salario." },
          { en: "I can't afford a new car.", es: "No puedo permitirme un coche nuevo." }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Une el verbo con su significado.", pairs: [
          { l: "save", r: "ahorrar" }, { l: "spend", r: "gastar" },
          { l: "borrow", r: "pedir prestado" }, { l: "lend", r: "prestar" }
        ] },
        { type: "multiple_choice", question: "Choose: I can't ___ a holiday this year.", options: ["afford", "spend", "save"], correctIndex: 0, explanation: "afford = poder permitirse." },
        { type: "fill_blank", sentence: "Can I ___ your pen? (pedirte prestado)", answers: ["borrow"], hint: "borrow = pedir prestado.", explanation: "borrow (from someone)." },
        { type: "true_false", statement: "\"Lend\" means to give something for a short time.", answer: true, explanation: "lend = prestar (algo por un tiempo)." },
        { type: "categorize", instruction: "¿Entra o sale el dinero?", buckets: [
          { id: "in", label: "Entra (income)" }, { id: "out", label: "Sale (expense)" }
        ], items: [
          { t: "salary", bucket: "in" }, { t: "rent", bucket: "out" },
          { t: "bonus", bucket: "in" }, { t: "bills", bucket: "out" }
        ] },
        { type: "translate", prompt: "Traduce: \"Ahorro dinero cada mes.\"",
          answers: ["i save money every month", "i save money each month"], explanation: "I save money every month." }
      ]
    },

    "voc-b2-environment": {
      lessonId: "voc-b2-environment", level: "B2", track: "Vocabulario", topic: "society", skill: "vocab",
      title: "Medio ambiente", xpReward: 50, mascotState: "explaining",
      explanation: {
        body: "Vocabulario ambiental: pollution (contaminación), recycle (reciclar), waste (residuos/desperdiciar), renewable (renovable), climate change (cambio climático). (Habla del medio ambiente con naturalidad.)",
        examples: [
          { en: "We should reduce plastic waste.", es: "Deberíamos reducir los residuos plásticos." },
          { en: "Solar power is renewable.", es: "La energía solar es renovable." }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Une la palabra con su significado.", pairs: [
          { l: "pollution", r: "contaminación" }, { l: "waste", r: "residuos" },
          { l: "renewable", r: "renovable" }, { l: "recycle", r: "reciclar" }
        ] },
        { type: "multiple_choice", question: "Opposite of \"renewable\":", options: ["reusable", "non-renewable", "recyclable"], correctIndex: 1, explanation: "non-renewable = no renovable." },
        { type: "fill_blank", sentence: "We must ___ paper, glass and plastic.", answers: ["recycle"], hint: "Separar para reusar.", explanation: "recycle = reciclar." },
        { type: "true_false", statement: "Wind power is a renewable energy source.", answer: true, explanation: "La energía eólica es renovable." },
        { type: "categorize", instruction: "¿Renovable o no renovable?", buckets: [
          { id: "ren", label: "Renovable" }, { id: "non", label: "No renovable" }
        ], items: [
          { t: "solar", bucket: "ren" }, { t: "coal", bucket: "non" },
          { t: "wind", bucket: "ren" }, { t: "oil", bucket: "non" }
        ] },
        { type: "translate", prompt: "Traduce: \"Deberíamos reducir los residuos plásticos.\"",
          answers: ["we should reduce plastic waste"], explanation: "We should reduce plastic waste." }
      ]
    },

    /* ===================== USE OF ENGLISH ===================== */
    "use-a2-prepositions": {
      lessonId: "use-a2-prepositions", level: "A2", track: "Uso del inglés", topic: "dailylife", skill: "use",
      title: "Preposiciones de tiempo: in / on / at", xpReward: 40, mascotState: "explaining",
      nextLessonId: "use-b1-phrasal-verbs",
      explanation: {
        body: "at para horas (at 7), on para días y fechas (on Monday), in para meses, años y partes del día (in July, in the morning). (in/on/at de tiempo.)",
        examples: [
          { en: "The class starts at nine.", es: "La clase empieza a las nueve." },
          { en: "I was born in 1998.", es: "Nací en 1998." },
          { en: "We meet on Friday.", es: "Nos vemos el viernes." }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "Choose: The meeting is ___ Monday.", options: ["in", "on", "at"], correctIndex: 1, explanation: "on + días de la semana." },
        { type: "multiple_choice", question: "Choose: I get up ___ 6:30.", options: ["in", "on", "at"], correctIndex: 2, explanation: "at + hora." },
        { type: "fill_blank", sentence: "My birthday is ___ June.", answers: ["in"], hint: "in + meses.", explanation: "in June." },
        { type: "categorize", instruction: "¿in, on o at?", buckets: [
          { id: "in", label: "in" }, { id: "on", label: "on" }, { id: "at", label: "at" }
        ], items: [
          { t: "the morning", bucket: "in" }, { t: "Sunday", bucket: "on" },
          { t: "night", bucket: "at" }, { t: "2025", bucket: "in" }
        ] },
        { type: "true_false", statement: "We say \"at the weekend\" (British English).", answer: true, explanation: "En inglés británico: at the weekend." },
        { type: "translate", prompt: "Traduce: \"Nos vemos el viernes.\"",
          answers: ["see you on friday", "we meet on friday", "i'll see you on friday"], explanation: "See you on Friday." }
      ]
    },

    "use-b1-phrasal-verbs": {
      lessonId: "use-b1-phrasal-verbs", level: "B1", track: "Uso del inglés", topic: "dailylife", skill: "use",
      title: "Phrasal verbs comunes", xpReward: 46, mascotState: "explaining",
      nextLessonId: "use-b2-linkers",
      explanation: {
        body: "Los phrasal verbs combinan verbo + partícula y cambian de sentido: get up (levantarse), turn on (encender), give up (rendirse), look for (buscar). (verbo + partícula = nuevo significado.)",
        examples: [
          { en: "Please turn off the lights.", es: "Por favor apaga las luces." },
          { en: "Don't give up!", es: "¡No te rindas!" }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Une el phrasal verb con su significado.", pairs: [
          { l: "get up", r: "levantarse" }, { l: "turn on", r: "encender" },
          { l: "give up", r: "rendirse" }, { l: "look for", r: "buscar" }
        ] },
        { type: "multiple_choice", question: "Choose: Can you ___ the TV? It's too loud.", options: ["turn off", "turn up", "look after"], correctIndex: 0, explanation: "turn off = apagar." },
        { type: "fill_blank", sentence: "I'm ___ for my keys. I can't find them.", answers: ["looking"], hint: "look for = buscar.", explanation: "I'm looking for my keys." },
        { type: "true_false", statement: "\"Give up\" means to continue trying.", answer: false, explanation: "give up = rendirse, dejar de intentar." },
        { type: "categorize", instruction: "¿Separable (turn it on) o no?", buckets: [
          { id: "sep", label: "Separable" }, { id: "insep", label: "Inseparable" }
        ], items: [
          { t: "turn on", bucket: "sep" }, { t: "look for", bucket: "insep" },
          { t: "switch off", bucket: "sep" }, { t: "look after", bucket: "insep" }
        ] },
        { type: "translate", prompt: "Traduce: \"No te rindas.\"",
          answers: ["don't give up", "do not give up"], explanation: "Don't give up." }
      ]
    },

    "use-b2-linkers": {
      lessonId: "use-b2-linkers", level: "B2", track: "Uso del inglés", topic: "society", skill: "use",
      title: "Conectores: although, however, despite", xpReward: 52, mascotState: "explaining",
      explanation: {
        body: "Para contraste: although + frase (Although it was late, we went out). however va con punto/punto y coma (... . However, ...). despite + sustantivo o -ing (Despite the rain, ...). (Conectores de contraste.)",
        examples: [
          { en: "Although it was cold, we walked.", es: "Aunque hacía frío, caminamos." },
          { en: "Despite the rain, the match continued.", es: "A pesar de la lluvia, el partido siguió." }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "Choose: ___ it was raining, we went for a walk.", options: ["Although", "Despite", "However"], correctIndex: 0, explanation: "Although + frase completa (sujeto + verbo)." },
        { type: "multiple_choice", question: "Choose: ___ the rain, we went for a walk.", options: ["Although", "Despite", "Because"], correctIndex: 1, explanation: "Despite + sustantivo (the rain)." },
        { type: "fill_blank", sentence: "The plan was risky. ___, we decided to try it.", answers: ["however"], hint: "Va al inicio, tras punto.", explanation: "However, we decided to try it." },
        { type: "true_false", statement: "We can say \"Despite of the rain...\".", answer: false, explanation: "Es \"despite the rain\" (sin 'of'); con 'of' sería \"in spite of\"." },
        { type: "categorize", instruction: "¿Va seguido de frase o de sustantivo/-ing?", buckets: [
          { id: "clause", label: "+ frase" }, { id: "noun", label: "+ sustantivo/-ing" }
        ], items: [
          { t: "although", bucket: "clause" }, { t: "despite", bucket: "noun" },
          { t: "even though", bucket: "clause" }, { t: "in spite of", bucket: "noun" }
        ] },
        { type: "translate", prompt: "Traduce: \"Aunque estaba cansado, terminó el trabajo.\"",
          answers: ["although he was tired he finished the work", "even though he was tired he finished the work", "although he was tired, he finished the work"], explanation: "Although he was tired, he finished the work." }
      ]
    }
  };

  var ORDER = [
    /* A1 */ "read-a1-my-day", "lis-a1-intro", "gram-a1-articles", "voc-a1-body",
    /* A2 */ "read-a2-email", "lis-a2-directions", "gram-a2-past-simple", "voc-a2-health", "use-a2-prepositions",
    /* B1 */ "read-b1-article", "lis-b1-voicemail", "gram-b1-present-perfect", "voc-b1-money", "use-b1-phrasal-verbs",
    /* B2 */ "read-b2-story", "lis-b2-interview", "gram-b2-conditionals", "voc-b2-environment", "use-b2-linkers"
  ];

  /* Fusiona estas lecciones en el catalogo principal (VESPER_LESSONS). */
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
