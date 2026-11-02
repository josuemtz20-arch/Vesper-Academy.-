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
            { q: "Where is Laura?", options: ["In Madrid", "In Toledo", "At home"], correctIndex: 0, explanation: "\"I'm having a great time in Madrid.\"" },
            { q: "What did she do yesterday?", options: ["She went to Toledo.", "She met Sam.", "She visited a museum."], correctIndex: 2, explanation: "\"Yesterday I visited a famous museum...\"" },
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
      lessonId: "read-b1-article", level: "B1", track: "Reading", topic: "tech", skill: "reading",
      title: "Reading: Working from home", xpReward: 48, mascotState: "explaining",
      nextLessonId: "read-b2-story",
      explanation: {
        body: "You will read a short article with a main idea and supporting details. Look for the pros and cons and the writer's opinion.",
        examples: [
          { en: "the main idea" },
          { en: "pros and cons" }
        ]
      },
      exercises: [
        { type: "reading", title: "Working from home",
          passage: "Ten years ago, almost everyone travelled to an office every day. Today, millions of people work from home, at least part of the week.\n\nThere are clear advantages. Workers save time and money because they don't commute, and many say they feel more relaxed. Companies can also save money on big offices.\n\nHowever, working from home is not perfect. Some people feel lonely, and it can be hard to switch off at the end of the day. Experts say the best solution may be a mix: a few days at home and a few days in the office.",
          questions: [
            { q: "What is the main topic of the article?", options: ["How to find a job", "The good and bad sides of working from home", "Why offices are closing"], correctIndex: 1, explanation: "The text discusses advantages and disadvantages of remote work." },
            { q: "According to the text, one advantage is that workers...", options: ["save time on commuting", "never feel lonely", "earn more money"], correctIndex: 0, explanation: "\"Workers save time and money because they don't commute.\"" },
            { q: "What solution do experts suggest?", options: ["Always work in the office", "Always work from home", "A mix of home and office"], correctIndex: 2, explanation: "\"...the best solution may be a mix.\"" }
          ] },
        { type: "matching", instruction: "Match each word with its meaning.", pairs: [{"l":"commute","r":"travel to and from work"},{"l":"advantage","r":"a good point"},{"l":"lonely","r":"sad because you are alone"},{"l":"switch off","r":"stop thinking about work"}] },
        { type: "true_false", statement: "The article says working from home is perfect.", answer: false, explanation: "\"...working from home is not perfect.\"" },
        { type: "fill_blank", sentence: "Some people feel ___ when they work alone at home.", answers: ["lonely"], hint: "An adjective from the text.", explanation: "\"Some people feel lonely...\"" },
        { type: "multiple_choice", question: "Who can also save money, according to the text?", options: ["Companies", "Governments", "Schools"], correctIndex: 0, explanation: "\"Companies can also save money on big offices.\"" },
        { type: "translate", prompt: "Say how often, starting 'I work from home…': I work at home on Mondays and Thursdays.",
          answers: ["i work from home two days a week", "i work from home twice a week"], explanation: "I work from home two days a week." }
      ]
    },

    "read-b2-story": {
      lessonId: "read-b2-story", level: "B2", track: "Reading", topic: "society", skill: "reading",
      title: "Reading: The lost wallet", xpReward: 52, mascotState: "explaining",
      explanation: {
        body: "A short story with a small twist. Pay attention to the order of events and to how the character feels.",
        examples: [
          { en: "the twist" },
          { en: "how the character feels" }
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
        { type: "multiple_choice", question: "The phrase \"in a hurry\" means...", options: ["with a lot of time", "in a rush", "feeling sad"], correctIndex: 1, explanation: "\"In a hurry\" = rushing, without much time." },
        { type: "true_false", statement: "Carla expected a reward for returning the wallet.", answer: false, explanation: "\"She didn't expect anything in return.\"" },
        { type: "matching", instruction: "Match each expression with its meaning.", pairs: [{"l":"hand in","r":"give to someone in authority"},{"l":"in return","r":"as an exchange"},{"l":"turn out","r":"prove to be in the end"},{"l":"retired","r":"no longer working because of age"}] },
        { type: "fill_blank", sentence: "The owner was a ___ teacher.", answers: ["retired"], hint: "He doesn't work any more.", explanation: "\"The owner, a retired teacher...\"" },
        { type: "translate", prompt: "Rewrite with the phrasal verb 'hand in': She decided to take the wallet to the police station and give it to them.",
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
        { type: "listening", text: "Hello, my name is David.", "audio": "assets/audio/app/a1_ad6aa879c6.mp3", question: "¿Qué escuchaste?",
          options: ["Hello, my name is David.", "Hello, my game is David.", "Yellow, my name is David."], correctIndex: 0 },
        { type: "listening", text: "I am from Mexico.", "audio": "assets/audio/app/a1_a8a45ca3c6.mp3", question: "¿De dónde es la persona?",
          options: ["De España", "De Brasil", "De México"], correctIndex: 2 },
        { type: "listening", text: "I am a teacher.", "audio": "assets/audio/app/a1_baf17ebd14.mp3", question: "¿Cuál es su trabajo?",
          options: ["Estudiante", "Profesor/a", "Doctor/a"], correctIndex: 1 },
        { type: "listening", text: "Nice to meet you.", "audio": "assets/audio/app/a1_5f3519c078.mp3", question: "¿Qué significa lo que oíste?",
          options: ["Mucho gusto", "Hasta luego", "Lo siento"], correctIndex: 0 },
        { type: "true_false", statement: "El audio decía: \"I am a teacher.\"", answer: true, explanation: "Sí: teacher = profesor/a." },
        { type: "listening", text: "Where are you from?", "audio": "assets/audio/app/a1_7f3ae9f273.mp3", question: "Escribe lo que escuchaste:",
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
        { type: "listening", text: "Turn left at the traffic lights.", "audio": "assets/audio/app/a2_111e2395f9.mp3", question: "¿Qué debes hacer?",
          options: ["Girar a la derecha", "Seguir recto", "Girar a la izquierda"], correctIndex: 2 },
        { type: "listening", text: "The bank is next to the supermarket.", "audio": "assets/audio/app/a2_5514bd3ff1.mp3", question: "¿Dónde está el banco?",
          options: ["Al lado del supermercado", "Enfrente del parque", "Detrás de la escuela"], correctIndex: 0 },
        { type: "listening", text: "Go straight on for two blocks.", "audio": "assets/audio/app/a2_c71ef865c8.mp3", question: "¿Cuántas cuadras sigues recto?",
          options: ["Tres", "Dos", "Cinco"], correctIndex: 1 },
        { type: "listening", text: "It's on your right.", "audio": "assets/audio/app/a2_e480d5faf6.mp3", question: "¿Dónde está?",
          options: ["A tu derecha", "A tu izquierda", "Detrás de ti"], correctIndex: 0 },
        { type: "matching", instruction: "Une la instrucción con su traducción.", pairs: [
          { l: "turn right", r: "gira a la derecha" }, { l: "go straight", r: "sigue recto" },
          { l: "next to", r: "al lado de" }, { l: "opposite", r: "enfrente de" }
        ] },
        { type: "listening", text: "Excuse me, how do I get to the station?", "audio": "assets/audio/app/a2_dc7773f912.mp3", question: "Escribe lo que escuchaste:",
          answers: ["excuse me how do i get to the station"], explanation: "Excuse me, how do I get to the station?" }
      ]
    },

    "lis-b1-voicemail": {
      lessonId: "lis-b1-voicemail", level: "B1", track: "Listening", topic: "business", skill: "listening",
      title: "Listening: a voicemail", xpReward: 46, mascotState: "explaining",
      nextLessonId: "lis-b2-interview",
      explanation: {
        body: "Listen to longer messages with several details: time, place and reason. Use \"Slower\" if you need it.",
        examples: [
          { en: "I'm calling about the meeting." },
          { en: "Could you call me back?" }
        ]
      },
      exercises: [
        { type: "listening", text: "Hi, this is Anna. I'm calling about tomorrow's meeting.", "audio": "assets/audio/app/b1_64520496be.mp3", question: "Why is Anna calling?",
          options: ["About a bill you forgot to pay","About a trip","About tomorrow's meeting"], correctIndex: 2 },
        { type: "listening", text: "The meeting has been moved to three o'clock.", "audio": "assets/audio/app/b1_8c6355d8fa.mp3", question: "What time is the meeting now?",
          options: ["At two in the afternoon","At three","At five"], correctIndex: 1 },
        { type: "listening", text: "Please bring the sales report with you.", "audio": "assets/audio/app/b1_47f6725655.mp3", question: "What should you bring?",
          options: ["The sales report","Your passport and a photo","Lunch"], correctIndex: 0 },
        { type: "listening", text: "Could you call me back before five, please?", "audio": "assets/audio/app/b1_08f76abb7a.mp3", question: "You should call back before what time?",
          options: ["After five, at the office","Before nine","Before five"], correctIndex: 2 },
        { type: "true_false", statement: "Anna asked you to bring the sales report.", answer: true, explanation: "\"Please bring the sales report.\"" },
        { type: "listening", text: "Thanks, talk to you soon.", "audio": "assets/audio/app/b1_04550cfc6c.mp3", question: "Write what you heard:",
          answers: ["thanks talk to you soon"], explanation: "Thanks, talk to you soon." }
      ]
    },

    "lis-b2-interview": {
      lessonId: "lis-b2-interview", level: "B2", track: "Listening", topic: "business", skill: "listening",
      title: "Listening: a job interview", xpReward: 50, mascotState: "explaining",
      explanation: {
        body: "Listen to parts of a job interview. Focus on opinions, reasons and nuance.",
        examples: [
          { en: "What are your strengths?" },
          { en: "I'd say my main strength is teamwork." }
        ]
      },
      exercises: [
        { type: "listening", text: "I'd say my main strength is solving problems under pressure.", "audio": "assets/audio/app/b2_f9d9284495.mp3", question: "What is the candidate's main strength?",
          options: ["Solving problems under pressure","Speaking several languages fluently","Arriving early"], correctIndex: 0 },
        { type: "listening", text: "In my previous job, I led a team of eight people.", "audio": "assets/audio/app/b2_d47112c317.mp3", question: "How many people did they lead?",
          options: ["Eighteen","Eight","Two"], correctIndex: 1 },
        { type: "listening", text: "I'm looking for a role with more responsibility.", "audio": "assets/audio/app/b2_2dbec279f6.mp3", question: "What is the candidate looking for?",
          options: ["Fewer hours","A lower salary","A role with more responsibility"], correctIndex: 2 },
        { type: "listening", text: "Honestly, I sometimes take on too much work.", "audio": "assets/audio/app/b2_9b6472731d.mp3", question: "What weakness do they admit?",
          options: ["They sometimes take on too much work","They arrive late","They don't speak English"], correctIndex: 0 },
        { type: "matching", instruction: "Match each word with its meaning.", pairs: [{"l":"strength","r":"something you are very good at"},{"l":"weakness","r":"something you need to improve"},{"l":"take on","r":"accept a task or responsibility"},{"l":"role","r":"a job or position"}] },
        { type: "listening", text: "Could you tell me about the team I would join?", "audio": "assets/audio/app/b2_a5585fb70a.mp3", question: "Write what you heard:",
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
        { type: "multiple_choice", question: "Past of \"go\":", options: ["goed", "gone", "went"], correctIndex: 2, explanation: "\"go\" es irregular -> went." },
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
      lessonId: "gram-b1-present-perfect", level: "B1", track: "Grammar", topic: "grammar", skill: "grammar", tipo: "aprende", title: "Present perfect or past simple?", rev: 2, xpReward: 48,
      mascotState: "explaining", nextLessonId: "gram-b2-conditionals",
      explanation: {
        body: "Carmen has worked in three countries. She moved to Manchester in March. Why do these two sentences use different tenses? The key is time: is it finished, or connected to now? Past simple = a finished time, stated or clear from context: I moved here in March. I saw her yesterday. Present perfect (have / has + past participle) = no specific time, connected to now: I've worked in three countries (experience). I've lost my badge (result now). She's lived here since March (still true). yesterday, last week, in 2020, ago → past simple. ever, never, yet, already, just, so far, since → present perfect. Questions with When...? → past simple.",
        examples: [{ en: "Have you ever been to Scotland, Carmen?" }, { en: "No, I haven't. But I went to London last weekend." }, { en: "Did you like it?" }, { en: "I loved it! I've already booked another trip." }],
        sections: [
          {
            kind: "intro",
            body: "Carmen has worked in three countries. She moved to Manchester in March. Why do these two sentences use different tenses? The key is time: is it finished, or connected to now?"
          },
          {
            kind: "regla",
            body: "Past simple = a finished time, stated or clear from context: I moved here in March. I saw her yesterday. Present perfect (have / has + past participle) = no specific time, connected to now: I've worked in three countries (experience). I've lost my badge (result now). She's lived here since March (still true). yesterday, last week, in 2020, ago → past simple. ever, never, yet, already, just, so far, since → present perfect. Questions with When...? → past simple."
          },
          {
            kind: "vocab",
            items: [
              { en: "ever", ipa: "ˈevə", es: "at any time in your life" },
              { en: "never", ipa: "ˈnevə", es: "at no time" },
              { en: "already", ipa: "ɔːlˈredi", es: "before now, sooner than expected" },
              { en: "yet", ipa: "jet", es: "up to now (in questions and negatives)" },
              { en: "just", ipa: "dʒʌst", es: "a very short time ago" },
              { en: "ago", ipa: "əˈɡəʊ", es: "before now (with a past time)" },
              { en: "so far", es: "up to this moment" },
              { en: "recently", ipa: "ˈriːsəntli", es: "not long ago" }
            ]
          },
          {
            kind: "expresiones",
            items: [
              { en: "Have you ever...?", es: "ask about life experiences" },
              { en: "I've just...", es: "share very recent news" },
              { en: "So far, so good.", es: "everything is fine up to now" },
              { en: "When did you...?", es: "ask for the specific time (past simple)" }
            ]
          },
          {
            kind: "ejemplos",
            items: [
              { en: "Daniel: Have you ever been to Scotland, Carmen?" },
              { en: "Carmen: No, I haven't. But I went to London last weekend." },
              { en: "Daniel: Did you like it?" },
              { en: "Carmen: I loved it! I've already booked another trip." }
            ]
          },
          {
            kind: "errores",
            items: [
              { no: "I have seen him yesterday.", si: "I saw him yesterday.", pq: "With a finished time (yesterday), use the past simple." },
              { no: "When have you arrived?", si: "When did you arrive?", pq: "When asks for a specific time, so use the past simple." },
              { no: "I live here since 2022.", si: "I've lived here since 2022.", pq: "For a situation that started in the past and continues, use the present perfect with since / for." }
            ]
          },
          { kind: "resumen", body: "Finished time → past simple (yesterday, ago, in 2020). No time or connected to now → present perfect (ever, yet, already, just, since, for)." },
          { kind: "puente", body: "Find out about Carmen's year in Manchester." }
        ]
      },
      exercises: [
        {
          type: "reading", title: "Carmen's year",
          passage: "Carmen moved to Manchester in March. Since then, she has made a lot of new friends, and she has learned to love the rain... almost.\n\nLast month she went to Edinburgh with Daniel and Tom. She hasn't been to Wales yet, but she has already planned a trip there for the spring.",
          questions: [
            { q: "When did Carmen move to Manchester?", options: ["In March", "Last month", "In the spring"], correctIndex: 0, explanation: "Carmen moved to Manchester in March (finished time → past simple)." },
            {
              q: "Which statement is true?",
              options: ["She hasn't visited Wales so far.", "She went to Wales last month.", "She has never left Manchester."], correctIndex: 0, explanation: "She hasn't been to Wales yet."
            },
            {
              q: "Why does the text say \"has made a lot of new friends\"?",
              options: ["It's a result that continues up to now.", "It happened at a specific finished time.", "It's a future plan."], correctIndex: 0,
              explanation: "Present perfect: connected to now (since March)."
            }
          ]
        },
        {
          type: "categorize", instruction: "Which tense goes with each time expression?",
          buckets: [{ id: "ps", label: "Past simple" }, { id: "pp", label: "Present perfect" }],
          items: [
            { t: "yesterday", bucket: "ps" },
            { t: "two weeks ago", bucket: "ps" },
            { t: "in 2019", bucket: "ps" },
            { t: "last Friday", bucket: "ps" },
            { t: "ever", bucket: "pp" },
            { t: "yet", bucket: "pp" },
            { t: "so far", bucket: "pp" },
            { t: "since March", bucket: "pp" }
          ]
        },
        {
          type: "multiple_choice", question: "Oh no! I ___ my keys. I can't get into my flat!", options: ["'ve lost", "was losing", "have been lose"], correctIndex: 0,
          explanation: "A past action with a result now: I've lost my keys."
        },
        {
          type: "find_error",
          segments: ["We ", { u: "have visited" }, " Rome ", { u: "two years ago" }, " and ", { u: "loved" }, " it."],
          correctIndex: 0, correction: "visited",
          explanation: "With 'two years ago' (a finished time), use the past simple: We visited Rome.", question: "Find the mistake"
        },
        { type: "fill_blank", sentence: "___ you ever tried Mexican street food?", answers: ["Have"], hint: "Life experience question.", explanation: "Have you ever tried...?" },
        {
          type: "listening", text: "I've just finished the report. I sent it to Priya five minutes ago.", question: "When did the speaker send the report?", options: ["Five minutes ago", "Yesterday", "Not yet"],
          correctIndex: 0
        },
        { type: "word_order", words: ["yet", "Have", "report", "you", "the", "finished"], correctOrder: ["Have", "you", "finished", "the", "report", "yet"], hint: "yet goes at the end." },
        {
          type: "translate", prompt: "Rewrite using FOR: \"Carmen started working here six months ago.\"",
          answers: ["carmen has worked here for six months", "carmen has been working here for six months", "carmen has worked here for 6 months", "carmen has been working here for 6 months"],
          explanation: "Carmen has worked here for six months."
        }
      ]
    },

    "gram-b2-conditionals": {
      lessonId: "gram-b2-conditionals", level: "B2", track: "Core Grammar", topic: "grammar", skill: "grammar",
      title: "Conditionals (0, 1 and 2)", xpReward: 54, mascotState: "explaining",
      explanation: {
        body: "Zero: general facts (If you heat ice, it melts). First: a real future possibility (If it rains, I'll stay home). Second: an imaginary situation (If I had money, I would travel). The second conditional uses the past simple + would.",
        examples: [
          { en: "If you heat ice, it melts." },
          { en: "If it rains, I will stay home." },
          { en: "If I were rich, I would travel." }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "First conditional: \"If it rains, I ___ at home.\"", options: ["stay", "will stay", "would stay"], correctIndex: 1, explanation: "First conditional: if + present simple, will + verb." },
        { type: "multiple_choice", question: "Second conditional: \"If I ___ you, I would say no.\"", options: ["were", "am", "will be"], correctIndex: 0, explanation: "The second conditional uses \"were\" for all persons." },
        { type: "fill_blank", sentence: "If you mix blue and yellow, you ___ green. (hecho)", answers: ["get", "make"], hint: "Zero conditional: present + present.", explanation: "Zero conditional: ...you get green." },
        { type: "categorize", instruction: "Real (1st) or imaginary (2nd)?", buckets: [
          { id: "first", label: "1st (real)" }, { id: "second", label: "2nd (imaginary)" }
        ], items: [
          { t: "If I have time, I'll call you.", bucket: "first" },
          { t: "If I won the lottery, I'd buy a house.", bucket: "second" },
          { t: "If she studies, she'll pass.", bucket: "first" },
          { t: "If I were taller, I'd play basketball.", bucket: "second" }
        ] },
        { type: "true_false", statement: "In the second conditional we use \"will\" in the result clause.", answer: false, explanation: "We use \"would\", not \"will\": I would travel." },
        { type: "word_order", words: ["If", "I", "had", "time,", "I", "would", "help"], correctOrder: ["If", "I", "had", "time,", "I", "would", "help"], hint: "Second conditional: If + past simple, would + verb." },
        { type: "translate", prompt: "Join the ideas with 'If' (first conditional): It might rain. In that case, I will stay at home.",
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
        { type: "multiple_choice", question: "We see with our...", options: ["ears", "nose", "eyes"], correctIndex: 2, explanation: "eyes = ojos (para ver)." },
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
        { type: "listening", text: "I have a terrible headache.", "audio": "assets/audio/app/a2_623d8de483.mp3", question: "¿Qué le pasa?",
          options: ["Dolor de cabeza", "Dolor de pies", "Tos"], correctIndex: 0 },
        { type: "translate", prompt: "Traduce: \"Deberías descansar.\"",
          answers: ["you should rest", "you should take a rest"], explanation: "You should rest." }
      ]
    },

    "voc-b1-money": {
      lessonId: "voc-b1-money", level: "B1", track: "Vocabulary", topic: "business", skill: "vocab",
      title: "Money and banking", xpReward: 46, mascotState: "explaining",
      nextLessonId: "voc-b2-environment",
      explanation: {
        body: "Money verbs: save (keep money for later), spend (use money to buy things), borrow (take something you will give back), lend (give something that will come back to you), afford (have enough money for something).",
        examples: [
          { en: "I save 10% of my salary." },
          { en: "I can't afford a new car." }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Match each verb with its meaning.", pairs: [{"l":"save","r":"keep money for the future"},{"l":"spend","r":"use money to buy things"},{"l":"borrow","r":"take something and give it back later"},{"l":"lend","r":"give something that will be returned"}] },
        { type: "multiple_choice", question: "Choose: I can't ___ a holiday this year.", options: ["save", "spend", "afford"], correctIndex: 2, explanation: "afford = have enough money for something." },
        { type: "fill_blank", sentence: "Can I ___ your pen? (pedirte prestado)", answers: ["borrow"], hint: "borrow = pedir prestado.", explanation: "borrow (from someone)." },
        { type: "true_false", statement: "\"Lend\" means to give something for a short time.", answer: true, explanation: "lend = give something to someone for a period of time." },
        { type: "categorize", instruction: "Money in or money out?", buckets: [
          { id: "in", label: "Money in (income)" }, { id: "out", label: "Money out (expense)" }
        ], items: [
          { t: "salary", bucket: "in" }, { t: "rent", bucket: "out" },
          { t: "bonus", bucket: "in" }, { t: "bills", bucket: "out" }
        ] },
        { type: "translate", prompt: "Rewrite using 'save': Every month, I keep some of my money instead of spending it.",
          answers: ["i save money every month", "i save money each month"], explanation: "I save money every month." }
      ]
    },

    "voc-b2-environment": {
      lessonId: "voc-b2-environment", level: "B2", track: "Vocabulary", topic: "society", skill: "vocab",
      title: "The environment", xpReward: 50, mascotState: "explaining",
      explanation: {
        body: "Environmental vocabulary: pollution (dirty air, water or land), recycle (use materials again), waste (rubbish; or to use something badly), renewable (that never runs out), climate change (long-term change in the planet's weather).",
        examples: [
          { en: "We should reduce plastic waste." },
          { en: "Solar power is renewable." }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Match each word with its meaning.", pairs: [{"l":"pollution","r":"harmful substances in air or water"},{"l":"waste","r":"things we throw away"},{"l":"renewable","r":"naturally replaced, never runs out"},{"l":"recycle","r":"process materials to use again"}] },
        { type: "multiple_choice", question: "Opposite of \"renewable\":", options: ["reusable", "non-renewable", "recyclable"], correctIndex: 1, explanation: "non-renewable = it will run out one day." },
        { type: "fill_blank", sentence: "We must ___ paper, glass and plastic.", answers: ["recycle"], hint: "Separate it so it can be used again.", explanation: "recycle = process materials so they can be used again." },
        { type: "true_false", statement: "Wind power is a renewable energy source.", answer: true, explanation: "Wind energy is renewable: it never runs out." },
        { type: "categorize", instruction: "Renewable or non-renewable?", buckets: [
          { id: "ren", label: "Renewable" }, { id: "non", label: "Non-renewable" }
        ], items: [
          { t: "solar", bucket: "ren" }, { t: "coal", bucket: "non" },
          { t: "wind", bucket: "ren" }, { t: "oil", bucket: "non" }
        ] },
        { type: "translate", prompt: "Give advice with 'should' and 'reduce': There is far too much plastic waste.",
          answers: ["we should reduce plastic waste"], explanation: "We should reduce plastic waste." }
      ]
    },

    /* ===================== USE OF ENGLISH ===================== */
    "use-a2-prepositions": {
      lessonId: "use-a2-prepositions", level: "A2", track: "Expresiones", topic: "phone", skill: "use", tipo: "aprende", title: "Llamar por teléfono", rev: 2, xpReward: 40, mascotState: "explaining",
      nextLessonId: "use-b1-phrasal-verbs",
      explanation: {
        body: "Episodio 6 · Sam llama al restaurante donde quiere trabajar, pero el gerente no está. Aprende las frases clave para hablar por teléfono. Al llamar te presentas con this is: Hello, this is Sam (no \"I am Sam\"). Para pedir a alguien: Can I speak to Mr Lee, please? Si no está: I'm afraid he isn't here. Can I take a message? Tú puedes decir: Can I leave a message? / Could you ask him to call me back?",
        examples: [
          { en: "Good morning, Luigi's Restaurant.", es: "Buenos días, Restaurante Luigi's." },
          { en: "Hello, this is Sam Green. Can I speak to Mr Lee, please?", es: "Hola, habla Sam Green. ¿Puedo hablar con el señor Lee, por favor?" },
          { en: "I'm afraid he isn't here. Can I take a message?", es: "Me temo que no está. ¿Quiere dejar un recado?" },
          { en: "Yes, please. Can you ask him to call me back?", es: "Sí, por favor. ¿Le puede pedir que me devuelva la llamada?" }
        ],
        sections: [
          { kind: "intro", body: "Episodio 6 · Sam llama al restaurante donde quiere trabajar, pero el gerente no está. Aprende las frases clave para hablar por teléfono." },
          {
            kind: "regla",
            body: "Al llamar te presentas con this is: Hello, this is Sam (no \"I am Sam\"). Para pedir a alguien: Can I speak to Mr Lee, please? Si no está: I'm afraid he isn't here. Can I take a message? Tú puedes decir: Can I leave a message? / Could you ask him to call me back?"
          },
          {
            kind: "vocab",
            items: [
              { en: "call", ipa: "kɔːl", es: "llamar" },
              { en: "call back", ipa: "kɔːl bæk", es: "devolver la llamada" },
              { en: "message", ipa: "ˈmesɪdʒ", es: "mensaje / recado" },
              { en: "leave a message", es: "dejar un recado" },
              { en: "take a message", es: "tomar un recado" },
              { en: "hold on", ipa: "həʊld ɒn", es: "esperar (sin colgar)" },
              { en: "hang up", ipa: "hæŋ ʌp", es: "colgar" },
              { en: "phone number", ipa: "fəʊn ˈnʌmbə", es: "número de teléfono" }
            ]
          },
          {
            kind: "expresiones",
            items: [
              { en: "Hello, this is Sam.", es: "Hola, habla Sam." },
              { en: "Can I speak to..., please?", es: "¿Puedo hablar con..., por favor?" },
              { en: "Hold on a moment, please.", es: "Un momento, por favor." },
              { en: "Can you ask him to call me back?", es: "¿Le puede pedir que me devuelva la llamada?" }
            ]
          },
          {
            kind: "ejemplos",
            items: [
              { en: "Waitress: Good morning, Luigi's Restaurant.", es: "Mesera: Buenos días, Restaurante Luigi's." },
              { en: "Sam: Hello, this is Sam Green. Can I speak to Mr Lee, please?", es: "Sam: Hola, habla Sam Green. ¿Puedo hablar con el señor Lee, por favor?" },
              { en: "Waitress: I'm afraid he isn't here. Can I take a message?", es: "Mesera: Me temo que no está. ¿Quiere dejar un recado?" },
              { en: "Sam: Yes, please. Can you ask him to call me back?", es: "Sam: Sí, por favor. ¿Le puede pedir que me devuelva la llamada?" }
            ]
          },
          {
            kind: "errores",
            items: [
              { no: "Hello, I am Sam. (al teléfono)", si: "Hello, this is Sam.", pq: "Al teléfono te presentas con this is." },
              { no: "Wait me a moment.", si: "Hold on a moment, please.", pq: "wait no lleva me; al teléfono se dice hold on." },
              { no: "Can you call me again back?", si: "Can you call me back?", pq: "Devolver la llamada = call back." }
            ]
          },
          { kind: "resumen", body: "Hello, this is... · Can I speak to...? · I'm afraid he / she isn't here · Can I take / leave a message? · Could you ask him / her to call me back?" },
          { kind: "puente", body: "Ahora haz tú la llamada de Sam." }
        ]
      },
      exercises: [
        {
          type: "reading", title: "A phone call",
          passage: "Waitress: Good morning, Luigi's Restaurant.\nSam: Hello, this is Sam Green. Can I speak to Mr Lee, please?\nWaitress: I'm afraid he isn't here. Can I take a message?\nSam: Yes, please. Can you ask him to call me back? It's about the job.\nWaitress: Of course. What's your number?\nSam: It's 555 0192. Thanks. Bye!",
          questions: [
            { q: "¿Con quién quiere hablar Sam?", options: ["Con el señor Lee", "Con la mesera", "Con Mia"], correctIndex: 0, explanation: "Can I speak to Mr Lee?" },
            { q: "¿Por qué llama Sam?", options: ["Por un trabajo", "Para reservar una mesa", "Para quejarse"], correctIndex: 0, explanation: "It's about the job." }
          ]
        },
        {
          type: "multiple_choice", question: "Contestas el teléfono de la oficina y tu jefa no está. Dices:",
          options: ["I'm afraid she isn't here. Can I take a message?", "She is not. Bye.", "Call later!"], correctIndex: 0, explanation: "Es la forma cortés y completa."
        },
        {
          type: "matching", instruction: "Une cada frase con su significado.",
          pairs: [
            { l: "Hold on a moment.", r: "Un momento." },
            { l: "Can I leave a message?", r: "¿Puedo dejar un recado?" },
            { l: "I'll call you back.", r: "Te devuelvo la llamada." },
            { l: "Who's calling, please?", r: "¿De parte de quién?" }
          ]
        },
        { type: "fill_blank", sentence: "Hello, ___ is Sam. Can I speak to Mr Lee?", answers: ["this"], hint: "Al teléfono te presentas con...", explanation: "Hello, this is Sam." },
        { type: "listening", text: "Hi, it's Ana. Please call me back on 555 0148.", question: "¿Cuál es su número?", options: ["555 0148", "555 0184", "555 1048"], correctIndex: 0 },
        { type: "word_order", words: ["message", "Can", "a", "I", "leave"], correctOrder: ["Can", "I", "leave", "a", "message"], hint: "¿Puedo dejar un recado?" },
        { type: "speak", text: "Hello, this is Sam. Can I speak to Mr Lee, please?", es: "Hola, habla Sam. ¿Puedo hablar con el señor Lee, por favor?" },
        {
          type: "translate", prompt: "Traduce: \"¿Puedo hablar con Ana, por favor?\"",
          answers: ["can i speak to ana please", "could i speak to ana please", "can i talk to ana please", "may i speak to ana please"], explanation: "Can I speak to Ana, please?"
        }
      ]
    },

    "use-b1-phrasal-verbs": {
      lessonId: "use-b1-phrasal-verbs", level: "B1", track: "Use of English", topic: "dailylife", skill: "use",
      title: "Common phrasal verbs", xpReward: 46, mascotState: "explaining",
      nextLessonId: "use-b2-linkers",
      explanation: {
        body: "Phrasal verbs combine a verb + a particle, and the meaning changes: get up (leave your bed), turn on (start a device), give up (stop trying), look for (try to find).",
        examples: [
          { en: "Please turn off the lights." },
          { en: "Don't give up!" }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Match each phrasal verb with its meaning.", pairs: [{"l":"get up","r":"leave your bed"},{"l":"turn on","r":"start a machine or light"},{"l":"give up","r":"stop trying"},{"l":"look for","r":"try to find"}] },
        { type: "multiple_choice", question: "Choose: Can you ___ the TV? It's too loud.", options: ["look after", "turn up", "turn off"], correctIndex: 2, explanation: "turn off = apagar." },
        { type: "fill_blank", sentence: "I'm ___ for my keys. I can't find them.", answers: ["looking"], hint: "look for = buscar.", explanation: "I'm looking for my keys." },
        { type: "true_false", statement: "\"Give up\" means to continue trying.", answer: false, explanation: "give up = stop trying." },
        { type: "categorize", instruction: "Separable (turn it on) or not?", buckets: [
          { id: "sep", label: "Separable" }, { id: "insep", label: "Inseparable" }
        ], items: [
          { t: "turn on", bucket: "sep" }, { t: "look for", bucket: "insep" },
          { t: "switch off", bucket: "sep" }, { t: "look after", bucket: "insep" }
        ] },
        { type: "translate", prompt: "Encourage a friend with a negative command and a phrasal verb that means 'stop trying'.",
          answers: ["don't give up", "do not give up"], explanation: "Don't give up." }
      ]
    },

    "use-b2-linkers": {
      lessonId: "use-b2-linkers", level: "B2", track: "Use of English", topic: "society", skill: "use",
      title: "Linkers: although, however, despite", xpReward: 52, mascotState: "explaining",
      explanation: {
        body: "For contrast: although + clause (Although it was late, we went out). However starts a new sentence or follows a semicolon (... . However, ...). Despite + noun or -ing (Despite the rain, ...).",
        examples: [
          { en: "Although it was cold, we walked." },
          { en: "Despite the rain, the match continued." }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "Choose: ___ it was raining, we went for a walk.", options: ["Although", "Despite", "However"], correctIndex: 0, explanation: "Although + a full clause (subject + verb)." },
        { type: "multiple_choice", question: "Choose: ___ the rain, we went for a walk.", options: ["Although", "Despite", "Because"], correctIndex: 1, explanation: "Despite + noun (the rain)." },
        { type: "fill_blank", sentence: "The plan was risky. ___, we decided to try it.", answers: ["however"], hint: "It goes at the start, after a full stop.", explanation: "However, we decided to try it." },
        { type: "true_false", statement: "We can say \"Despite of the rain...\".", answer: false, explanation: "It's \"despite the rain\" (no 'of'); with 'of' it would be \"in spite of\"." },
        { type: "categorize", instruction: "Followed by a clause or by a noun/-ing?", buckets: [
          { id: "clause", label: "+ clause" }, { id: "noun", label: "+ noun / -ing" }
        ], items: [
          { t: "although", bucket: "clause" }, { t: "despite", bucket: "noun" },
          { t: "even though", bucket: "clause" }, { t: "in spite of", bucket: "noun" }
        ] },
        { type: "translate", prompt: "Join the sentences with 'Although': He was tired. He finished the work.",
          answers: ["although he was tired he finished the work", "even though he was tired he finished the work", "although he was tired, he finished the work"], explanation: "Although he was tired, he finished the work." }
      ]
    },

    /* ===================== RELLENO: 2ª lección por destreza ===================== */
    "read-a1-market": {
      lessonId: "read-a1-market", level: "A1", track: "Lectura", topic: "dailylife", skill: "reading",
      title: "Lectura: Saturday market", xpReward: 38, mascotState: "explaining",
      explanation: { body: "Otro texto corto para practicar lectura. Lee con calma y responde. (Lee y responde.)",
        examples: [{ en: "Read and answer.", es: "Lee y responde." }] },
      exercises: [
        { type: "reading", title: "Saturday market",
          passage: "Every Saturday, Ben goes to the market in the main square. He likes it because the fruit is fresh and cheap.\n\nThis morning he bought apples, two big tomatoes and some bread. The baker, an old friend, gave him a free cookie.\n\nBen doesn't have a car, so he carries everything in a green bag. On the way home, he always stops to feed the birds in the park.",
          questions: [
            { q: "When does Ben go to the market?", options: ["Every morning", "Every Sunday", "Every Saturday"], correctIndex: 2, explanation: "\"Every Saturday, Ben goes to the market.\"" },
            { q: "Why does he like the market?", options: ["It is far away", "The fruit is fresh and cheap", "It is very big"], correctIndex: 1, explanation: "\"...the fruit is fresh and cheap.\"" },
            { q: "What does he do on the way home?", options: ["He feeds the birds.", "He buys a car.", "He calls the baker."], correctIndex: 0, explanation: "\"...he always stops to feed the birds.\"" }
          ] },
        { type: "true_false", statement: "Ben has a car.", answer: false, explanation: "\"Ben doesn't have a car.\"" },
        { type: "matching", instruction: "Une la palabra con su traducción.", pairs: [
          { l: "market", r: "mercado" }, { l: "fresh", r: "fresco" }, { l: "cheap", r: "barato" }, { l: "bag", r: "bolsa" } ] },
        { type: "fill_blank", sentence: "Ben carries everything in a green ___.", answers: ["bag"], hint: "Está en el texto.", explanation: "\"...in a green bag.\"" },
        { type: "multiple_choice", question: "The baker gave Ben a free...", options: ["apple", "cookie", "tomato"], correctIndex: 1, explanation: "\"...gave him a free cookie.\"" },
        { type: "translate", prompt: "Traduce: \"La fruta es fresca y barata.\"",
          answers: ["the fruit is fresh and cheap"], explanation: "The fruit is fresh and cheap." }
      ]
    },

    "use-a1-can": {
      lessonId: "use-a1-can", level: "A1", track: "Uso del inglés", topic: "dailylife", skill: "use",
      title: "Can: habilidad y permiso", xpReward: 36, mascotState: "explaining",
      explanation: { body: "Usamos \"can\" para habilidad (I can swim) y permiso (Can I go?). El negativo es can't. Tras can va el verbo en base, sin 'to'. (can = poder/saber hacer / pedir permiso.)",
        examples: [{ en: "I can speak English.", es: "Sé hablar inglés." }, { en: "Can I open the window?", es: "¿Puedo abrir la ventana?" }] },
      exercises: [
        { type: "multiple_choice", question: "Choose: She ___ swim very well.", options: ["cans", "can to", "can"], correctIndex: 2, explanation: "can + verbo base, sin -s ni 'to'." },
        { type: "fill_blank", sentence: "___ I use your phone, please?", answers: ["can", "could"], hint: "Pedir permiso.", explanation: "Can/Could I...? = ¿Puedo...?" },
        { type: "true_false", statement: "The negative of \"can\" is \"can't\".", answer: true, explanation: "can -> can't (cannot)." },
        { type: "multiple_choice", question: "Choose: We ___ find the keys. (no es posible)", options: ["can't", "can", "can to"], correctIndex: 0, explanation: "can't = no poder." },
        { type: "word_order", words: ["I", "can", "play", "guitar"], correctOrder: ["I", "can", "play", "guitar"], hint: "Sujeto + can + verbo." },
        { type: "translate", prompt: "Traduce: \"¿Puedo abrir la ventana?\"",
          answers: ["can i open the window", "could i open the window"], explanation: "Can I open the window?" }
      ]
    },

    "read-a2-review": {
      lessonId: "read-a2-review", level: "A2", track: "Lectura", topic: "dailylife", skill: "reading",
      title: "Lectura: A film review", xpReward: 42, mascotState: "explaining",
      explanation: { body: "Las reseñas dan una opinión con razones y una recomendación. Busca la opinión y por qué. (Lee la reseña.)",
        examples: [{ en: "I really recommend it.", es: "Lo recomiendo mucho." }] },
      exercises: [
        { type: "reading", title: "A film review",
          passage: "Last night I watched \"The Long Road\", a new adventure film. The story is simple: a young woman travels across the country to find her sister.\n\nThe acting is excellent and the music is beautiful. However, the film is a bit too long, and the ending is not very surprising.\n\nAll in all, I enjoyed it. If you like quiet, emotional films, I really recommend it. I'd give it four stars out of five.",
          questions: [
            { q: "What kind of film is it?", options: ["A comedy", "An adventure film", "A horror film"], correctIndex: 1, explanation: "\"...a new adventure film.\"" },
            { q: "What does the writer criticise?", options: ["The acting", "The music", "The length and the ending"], correctIndex: 2, explanation: "\"...a bit too long, and the ending is not very surprising.\"" },
            { q: "Does the writer recommend it?", options: ["Yes, for fans of emotional films", "No, not at all", "Only for children"], correctIndex: 0, explanation: "\"If you like quiet, emotional films, I really recommend it.\"" }
          ] },
        { type: "true_false", statement: "The writer gives the film five stars.", answer: false, explanation: "\"...four stars out of five.\"" },
        { type: "matching", instruction: "Une la palabra con su traducción.", pairs: [
          { l: "acting", r: "actuación" }, { l: "ending", r: "final" }, { l: "recommend", r: "recomendar" }, { l: "review", r: "reseña" } ] },
        { type: "fill_blank", sentence: "The film is a bit too ___.", answers: ["long"], hint: "Crítica del texto.", explanation: "\"...a bit too long.\"" },
        { type: "translate", prompt: "Traduce: \"Lo recomiendo mucho.\"",
          answers: ["i really recommend it", "i recommend it a lot"], explanation: "I really recommend it." }
      ]
    },

    "read-b1-blog": {
      lessonId: "read-b1-blog", level: "B1", track: "Reading", topic: "travel", skill: "reading",
      title: "Reading: A travel blog", xpReward: 46, mascotState: "explaining",
      explanation: { body: "A travel blog post with experiences and tips. Pay attention to the details and to the writer's recommendation.",
        examples: [{ en: "My top tip is..." }] },
      exercises: [
        { type: "reading", title: "Three days in Lisbon",
          passage: "I've just come back from three amazing days in Lisbon, and I can't wait to share my experience.\n\nOn the first day, I got lost in the narrow streets of the old town, which was actually the best part. The local food is fantastic and surprisingly affordable. I especially loved the little pastry shops on every corner.\n\nMy top tip is to buy a public transport card. The famous yellow trams get very crowded, so try to travel early in the morning. Don't forget comfortable shoes — the city is full of hills!",
          questions: [
            { q: "How long was the writer's trip?", options: ["One week", "Three days", "Three weeks"], correctIndex: 1, explanation: "\"...three amazing days in Lisbon.\"" },
            { q: "What does the writer say was the best part?", options: ["Getting lost in the old town", "The hotels", "The airport"], correctIndex: 0, explanation: "\"...I got lost in the narrow streets... the best part.\"" },
            { q: "What is the writer's top tip?", options: ["Travel at night", "Avoid the food", "Buy a transport card"], correctIndex: 2, explanation: "\"My top tip is to buy a public transport card.\"" }
          ] },
        { type: "true_false", statement: "The writer says the food was very expensive.", answer: false, explanation: "\"...surprisingly affordable.\"" },
        { type: "matching", instruction: "Match each word with its meaning.", pairs: [{"l":"crowded","r":"full of people"},{"l":"affordable","r":"not too expensive"},{"l":"narrow","r":"not wide"},{"l":"tip","r":"a useful piece of advice"}] },
        { type: "fill_blank", sentence: "The yellow trams get very ___ in the day.", answers: ["crowded"], hint: "Lots of people.", explanation: "\"...trams get very crowded.\"" },
        { type: "translate", prompt: "Rewrite as a negative command with 'forget': Remember to bring comfortable shoes.",
          answers: ["don't forget comfortable shoes", "do not forget comfortable shoes"], explanation: "Don't forget comfortable shoes." }
      ]
    },

    "voc-b2-feelings": {
      lessonId: "voc-b2-feelings", level: "B2", track: "Vocabulary", topic: "society", skill: "vocab",
      title: "Emotions and nuance", xpReward: 48, mascotState: "explaining",
      explanation: { body: "More precise adjectives of emotion: thrilled (extremely happy and excited), anxious (worried and nervous), frustrated (annoyed because you can't do something), relieved (happy because a worry has gone). They raise the level of your vocabulary.",
        examples: [{ en: "I was thrilled with the news." }, { en: "She felt relieved after the exam." }] },
      exercises: [
        { type: "matching", instruction: "Match each adjective with its meaning.", pairs: [{"l":"thrilled","r":"extremely happy and excited"},{"l":"anxious","r":"worried and nervous"},{"l":"frustrated","r":"annoyed because you can't succeed"},{"l":"relieved","r":"calm because a worry has gone"}] },
        { type: "multiple_choice", question: "After passing the test, she felt...", options: ["relieved", "anxious", "frustrated"], correctIndex: 0, explanation: "relieved = calm again after a worry has gone." },
        { type: "fill_blank", sentence: "I was absolutely ___ to win the prize. (very happy)", answers: ["thrilled", "delighted"], hint: "Stronger than 'happy'.", explanation: "thrilled / delighted = extremely happy." },
        { type: "true_false", statement: "\"Frustrated\" describes a positive feeling.", answer: false, explanation: "frustrated = annoyed because you can't succeed (negative)." },
        { type: "categorize", instruction: "Positive or negative emotion?", buckets: [
          { id: "pos", label: "Positive" }, { id: "neg", label: "Negative" } ], items: [
          { t: "thrilled", bucket: "pos" }, { t: "delighted", bucket: "pos" }, { t: "anxious", bucket: "neg" }, { t: "frustrated", bucket: "neg" } ] },
        { type: "translate", prompt: "Rewrite with a precise adjective, starting 'She felt…': After the exam, her worry finally disappeared.",
          answers: ["she felt relieved after the exam", "she felt relieved after the test"], explanation: "She felt relieved after the exam." }
      ]
    },

    "read-b2-science": {
      lessonId: "read-b2-science", level: "B2", track: "Reading", topic: "tech", skill: "reading",
      title: "Reading: The science of sleep", xpReward: 52, mascotState: "explaining",
      explanation: { body: "A popular-science article with facts and a conclusion. Distinguish facts from recommendations.",
        examples: [{ en: "Experts recommend..." }] },
      exercises: [
        { type: "reading", title: "The science of sleep",
          passage: "We spend about a third of our lives asleep, yet many of us treat sleep as a luxury rather than a necessity. Scientists now agree that this is a serious mistake.\n\nDuring deep sleep, the brain clears out waste products and strengthens new memories. People who sleep badly for long periods are more likely to suffer from poor concentration and a weaker immune system.\n\nExperts recommend keeping a regular schedule and avoiding screens before bed. The blue light from phones can trick the brain into thinking it is still daytime, making it harder to fall asleep.",
          questions: [
            { q: "What is the main message of the text?", options: ["Sleep is a luxury we can skip", "Sleep is a necessity, not a luxury", "Screens improve sleep"], correctIndex: 1, explanation: "\"...a serious mistake\" to treat sleep as a luxury." },
            { q: "According to the text, what happens during deep sleep?", options: ["The body grows taller", "Nothing important", "The brain clears waste and strengthens memories"], correctIndex: 2, explanation: "\"...the brain clears out waste products and strengthens new memories.\"" },
            { q: "Why is blue light a problem?", options: ["It tricks the brain into thinking it is daytime", "It saves battery", "It is too dim"], correctIndex: 0, explanation: "\"...trick the brain into thinking it is still daytime.\"" }
          ] },
        { type: "true_false", statement: "The text says poor sleep can weaken the immune system.", answer: true, explanation: "\"...a weaker immune system.\"" },
        { type: "matching", instruction: "Match each word with its meaning.", pairs: [{"l":"necessity","r":"something you need"},{"l":"waste","r":"material that is no longer useful"},{"l":"schedule","r":"a plan of times"},{"l":"immune","r":"protected from disease"}] },
        { type: "fill_blank", sentence: "Experts recommend keeping a regular ___.", answers: ["schedule"], hint: "A fixed timetable.", explanation: "\"...a regular schedule.\"" },
        { type: "translate", prompt: "Rewrite using 'spend' and 'a third': One out of every three hours of our lives, we are asleep.",
          answers: ["we spend a third of our lives asleep", "we spend a third of our life sleeping", "we spend a third of our lives sleeping"], explanation: "We spend a third of our lives asleep." }
      ]
    },

    "lis-b2-podcast": {
      lessonId: "lis-b2-podcast", level: "B2", track: "Listening", topic: "society", skill: "listening",
      title: "Listening: a podcast", xpReward: 50, mascotState: "explaining",
      explanation: { body: "Listen to parts of a podcast with opinions and data. Use \"Slower\" if you need it.",
        examples: [{ en: "In today's episode..." }] },
      exercises: [
        { type: "listening", text: "In today's episode, we explore why cities are getting greener.", "audio": "assets/audio/app/b2_78b4239d01.mp3", question: "What is the episode about?",
          options: ["Family recipes from around the world","Why cities are becoming greener","Sports"], correctIndex: 1 },
        { type: "listening", text: "Studies suggest that parks improve people's mental health.", "audio": "assets/audio/app/b2_3987c1ee0b.mp3", question: "What do studies suggest?",
          options: ["Parks improve people's mental health","Parks are too expensive for most cities to build","People hate parks"], correctIndex: 0 },
        { type: "listening", text: "However, not everyone has equal access to green spaces.", "audio": "assets/audio/app/b2_fe5b2a011d.mp3", question: "What problem is mentioned?",
          options: ["The lack of trees along the main streets","The price of transport","Unequal access to green spaces"], correctIndex: 2 },
        { type: "listening", text: "We'll be back next week with another episode.", "audio": "assets/audio/app/b2_2b12da6ce3.mp3", question: "When will the podcast be back?",
          options: ["Next week","Tomorrow at the same time","Never"], correctIndex: 0 },
        { type: "true_false", statement: "The podcast says everyone has equal access to parks.", answer: false, explanation: "\"...not everyone has equal access.\"" },
        { type: "listening", text: "Thanks for listening, and see you next time.", "audio": "assets/audio/app/b2_35eace2eb8.mp3", question: "Write what you heard:",
          answers: ["thanks for listening and see you next time"], explanation: "Thanks for listening, and see you next time." }
      ]
    },

    /* ===================== C1 (avanzado) ===================== */
    "read-c1-habits": {
      lessonId: "read-c1-habits", level: "C1", track: "Reading", topic: "society", skill: "reading",
      title: "Reading: The power of habits", xpReward: 56, mascotState: "explaining",
      nextLessonId: "read-c1-work",
      explanation: { body: "An argumentative text with abstract vocabulary. Identify the thesis, the evidence and the nuance.",
        examples: [{ en: "It is widely assumed that..." }] },
      exercises: [
        { type: "reading", title: "The power of habits",
          passage: "It is widely assumed that willpower is the key to changing our behaviour. In reality, research increasingly suggests that habits — not sheer determination — shape most of what we do.\n\nA habit is essentially a loop: a cue triggers a routine, which delivers a reward. Once this loop is firmly established, the brain stops making conscious decisions and runs on autopilot. This is why breaking a bad habit by willpower alone so often fails.\n\nThe most effective approach, paradoxically, is not to fight the habit but to redesign it. By keeping the same cue and reward while deliberately swapping the routine, people stand a far better chance of lasting change.",
          questions: [
            { q: "What is the writer's main claim?", options: ["Willpower alone explains behaviour", "Habits, more than willpower, shape behaviour", "Behaviour cannot be changed"], correctIndex: 1, explanation: "\"...habits — not sheer determination — shape most of what we do.\"" },
            { q: "According to the text, a habit loop consists of...", options: ["thought, word, action", "morning, noon, night", "cue, routine, reward"], correctIndex: 2, explanation: "\"...a cue triggers a routine, which delivers a reward.\"" },
            { q: "What does the writer recommend?", options: ["Redesigning the routine while keeping cue and reward", "Ignoring habits completely", "Fighting habits with pure willpower"], correctIndex: 0, explanation: "\"...redesign it... swapping the routine.\"" }
          ] },
        { type: "true_false", statement: "The writer believes willpower alone reliably breaks habits.", answer: false, explanation: "\"...breaking a bad habit by willpower alone so often fails.\"" },
        { type: "matching", instruction: "Match each word with its meaning.", pairs: [{"l":"willpower","r":"the ability to control yourself"},{"l":"cue","r":"a signal that triggers an action"},{"l":"routine","r":"the usual sequence of actions"},{"l":"reward","r":"something good you get for doing something"}] },
        { type: "fill_blank", sentence: "Once the loop is established, the brain runs on ___.", answers: ["autopilot"], hint: "Without conscious decisions.", explanation: "\"...runs on autopilot.\"" },
        { type: "multiple_choice", question: "\"Sheer determination\" is closest in meaning to...", options: ["mild interest", "pure willpower", "good luck"], correctIndex: 1, explanation: "sheer = pure, nothing but." },
        { type: "translate", prompt: "Rewrite impersonally, starting 'It is widely assumed…': Most people assume that willpower is the key.",
          answers: ["it is widely assumed that willpower is the key", "it's widely assumed that willpower is the key"], explanation: "It is widely assumed that willpower is the key." }
      ]
    },

    "read-c1-work": {
      lessonId: "read-c1-work", level: "C1", track: "Reading", topic: "business", skill: "reading",
      title: "Reading: The four-day week", xpReward: 56, mascotState: "explaining",
      explanation: { body: "An opinion text with counter-arguments. Distinguish the claim, the concession and the conclusion.",
        examples: [{ en: "Critics argue that..." }] },
      exercises: [
        { type: "reading", title: "The four-day week",
          passage: "The idea of a four-day working week, once dismissed as wishful thinking, is gaining serious traction. Several large-scale trials have reported that employees are happier and, crucially, no less productive.\n\nCritics argue that the model cannot be applied universally; a hospital or a factory cannot simply close for an extra day. There is some truth to this. Yet supporters counter that flexibility, rather than a rigid template, is the real lesson.\n\nWhatever the outcome, the debate has forced organisations to ask a long-overdue question: are we measuring work by hours logged, or by results delivered?",
          questions: [
            { q: "How is the four-day week described now?", options: ["As wishful thinking only", "As gaining serious traction", "As already universal"], correctIndex: 1, explanation: "\"...is gaining serious traction.\"" },
            { q: "What do critics argue?", options: ["It is illegal", "It always lowers productivity", "It cannot apply to every workplace"], correctIndex: 2, explanation: "\"...cannot be applied universally...\"" },
            { q: "What question has the debate raised?", options: ["Whether to measure work by hours or by results", "How to pay less", "How to close hospitals"], correctIndex: 0, explanation: "\"...by hours logged, or by results delivered?\"" }
          ] },
        { type: "true_false", statement: "The trials found employees were much less productive.", answer: false, explanation: "\"...no less productive.\"" },
        { type: "matching", instruction: "Match each expression with its meaning.", pairs: [{"l":"gain traction","r":"become more popular or accepted"},{"l":"wishful thinking","r":"believing what you want to be true"},{"l":"trial","r":"a test of how well something works"},{"l":"long-overdue","r":"should have happened much earlier"}] },
        { type: "fill_blank", sentence: "Supporters say ___, not a rigid template, is the real lesson.", answers: ["flexibility"], hint: "The opposite of rigid.", explanation: "\"...flexibility... is the real lesson.\"" },
        { type: "translate", prompt: "Rewrite in the passive: Critics argue that companies cannot apply the model universally. (Critics argue that the model…)",
          answers: ["critics argue that the model cannot be applied universally", "critics argue the model cannot be applied universally"], explanation: "Critics argue that the model cannot be applied universally." }
      ]
    },

    "lis-c1-lecture": {
      lessonId: "lis-c1-lecture", level: "C1", track: "Listening", topic: "society", skill: "listening",
      title: "Listening: a talk", xpReward: 54, mascotState: "explaining",
      nextLessonId: "lis-c1-debate",
      explanation: { body: "Listen to parts of an academic talk with abstract ideas.",
        examples: [{ en: "Let me begin by challenging a common assumption." }] },
      exercises: [
        { type: "listening", text: "Let me begin by challenging a common assumption.", "audio": "assets/audio/app/c1_7ca4dabcc1.mp3", question: "How does the talk begin?",
          options: ["By challenging a common assumption","With an apology","With a joke"], correctIndex: 0 },
        { type: "listening", text: "Contrary to popular belief, multitasking actually reduces our efficiency.", "audio": "assets/audio/app/c1_2ddc7b69f3.mp3", question: "What does the speaker say about multitasking?",
          options: ["It doesn't change productivity","It improves efficiency","It reduces efficiency"], correctIndex: 2 },
        { type: "listening", text: "The evidence, while not conclusive, is certainly compelling.", "audio": "assets/audio/app/c1_b578c87bf3.mp3", question: "How does the speaker describe the evidence?",
          options: ["Boring","Convincing, though not conclusive","False"], correctIndex: 1 },
        { type: "listening", text: "I'll come back to that point in a moment.", "audio": "assets/audio/app/c1_deae96e756.mp3", question: "What will the speaker do with that point?",
          options: ["Come back to it in a moment","Ignore it","Repeat it three times at the end of the class"], correctIndex: 0 },
        { type: "true_false", statement: "The speaker says multitasking improves efficiency.", answer: false, explanation: "\"...multitasking actually reduces our efficiency.\"" },
        { type: "listening", text: "To sum up, our priorities shape our attention.", "audio": "assets/audio/app/c1_69b3a015f2.mp3", question: "Write what you heard:",
          answers: ["to sum up our priorities shape our attention"], explanation: "To sum up, our priorities shape our attention." }
      ]
    },

    "lis-c1-debate": {
      lessonId: "lis-c1-debate", level: "C1", track: "Listening", topic: "society", skill: "listening",
      title: "Listening: a debate", xpReward: 54, mascotState: "explaining",
      explanation: { body: "Listen to contributions to a debate with agreement, disagreement and nuance.",
        examples: [{ en: "With all due respect, I have to disagree." }] },
      exercises: [
        { type: "listening", text: "With all due respect, I have to disagree with the previous speaker.", "audio": "assets/audio/app/c1_ba3e1512bd.mp3", question: "What is the speaker doing?",
          options: ["Asking about the previous topic","Politely disagreeing","Agreeing"], correctIndex: 1 },
        { type: "listening", text: "You raise a valid point, but you're overlooking the cost.", "audio": "assets/audio/app/c1_5ca76168d7.mp3", question: "What does the speaker say is being overlooked?",
          options: ["Time","Place","Cost"], correctIndex: 2 },
        { type: "listening", text: "Let's not lose sight of the bigger picture here.", "audio": "assets/audio/app/c1_6c67874dfe.mp3", question: "What should we not lose sight of?",
          options: ["The bigger picture","The clock","The microphone"], correctIndex: 0 },
        { type: "listening", text: "I'm inclined to agree, up to a point.", "audio": "assets/audio/app/c1_fa458b8034.mp3", question: "What is the speaker's position?",
          options: ["Agrees, up to a point","Completely against","Has no opinion"], correctIndex: 0 },
        { type: "matching", instruction: "Match each expression with its function or meaning.", pairs: [{"l":"I have to disagree","r":"disagreeing"},{"l":"You raise a valid point","r":"conceding"},{"l":"the bigger picture","r":"the overall situation"},{"l":"up to a point","r":"partly, not completely"}] },
        { type: "listening", text: "Could we please return to the main issue?", "audio": "assets/audio/app/c1_60c10a8c83.mp3", question: "Write what you heard:",
          answers: ["could we please return to the main issue"], explanation: "Could we please return to the main issue?" }
      ]
    },

    "voc-c1-collocations": {
      lessonId: "voc-c1-collocations", level: "C1", track: "Vocabulary", topic: "business", skill: "vocab",
      title: "Common collocations", xpReward: 54, mascotState: "explaining",
      nextLessonId: "voc-c1-idioms",
      explanation: { body: "Collocations are words that naturally go together: make a decision, take responsibility, raise awareness, meet a deadline. Sounding natural depends on them.",
        examples: [{ en: "We need to raise awareness." }, { en: "She took full responsibility." }] },
      exercises: [
        { type: "multiple_choice", question: "Choose: We have to ___ a decision today.", options: ["take", "do", "make"], correctIndex: 2, explanation: "make a decision (no 'do/take')." },
        { type: "multiple_choice", question: "Choose: The campaign aims to ___ awareness.", options: ["rise", "raise", "grow"], correctIndex: 1, explanation: "raise awareness = make people know more about an issue." },
        { type: "matching", instruction: "Match each verb with its collocation.", pairs: [{"l":"make","r":"a decision"},{"l":"take","r":"responsibility"},{"l":"meet","r":"a deadline"},{"l":"pay","r":"attention"}] },
        { type: "fill_blank", sentence: "Please ___ attention to the details.", answers: ["pay"], hint: "pay attention.", explanation: "pay attention = concentrate on something." },
        { type: "categorize", instruction: "make or do?", buckets: [
          { id: "make", label: "make" }, { id: "do", label: "do" } ], items: [
          { t: "a mistake", bucket: "make" }, { t: "progress", bucket: "make" }, { t: "homework", bucket: "do" }, { t: "research", bucket: "do" } ] },
        { type: "translate", prompt: "Rewrite with a collocation using 'take': She accepted that the whole problem was her fault and dealt with it.",
          answers: ["she took full responsibility", "he took full responsibility"], explanation: "She took full responsibility." }
      ]
    },

    "voc-c1-idioms": {
      lessonId: "voc-c1-idioms", level: "C1", track: "Vocabulary", topic: "work", skill: "vocab", tipo: "aprende", title: "Phrasal verbs for work and discussion", rev: 2, xpReward: 54, mascotState: "explaining",
      explanation: {
        body: "At C1, phrasal verbs move beyond 'get up' and 'turn on'. In meetings and emails you'll hear people iron out problems, come up against obstacles and brush up on their skills. These verbs are frequent, natural and often more vivid than their formal equivalents. Many have a formal synonym: iron out = resolve; come up against = encounter; brush up on = revise; put forward = propose; follow up on = pursue; play down = minimise; rule out = exclude; bring forward = move to an earlier date. Three-part verbs keep both particles together before the object: brush up on your French. Separable verbs can split with a noun but must split with a pronoun: rule it out (NOT rule out it).",
        examples: [
          { en: "We still need to iron out a few details before we sign." },
          { en: "The project came up against strong local opposition." },
          { en: "I'm brushing up on my German before the trip to Berlin." },
          { en: "The meeting has been brought forward to Monday." }
        ],
        sections: [
          {
            kind: "intro",
            body: "At C1, phrasal verbs move beyond 'get up' and 'turn on'. In meetings and emails you'll hear people iron out problems, come up against obstacles and brush up on their skills. These verbs are frequent, natural and often more vivid than their formal equivalents."
          },
          {
            kind: "regla",
            body: "Many have a formal synonym: iron out = resolve; come up against = encounter; brush up on = revise; put forward = propose; follow up on = pursue; play down = minimise; rule out = exclude; bring forward = move to an earlier date. Three-part verbs keep both particles together before the object: brush up on your French. Separable verbs can split with a noun but must split with a pronoun: rule it out (NOT rule out it)."
          },
          {
            kind: "vocab",
            items: [
              { en: "iron out", es: "solve small problems or differences" },
              { en: "come up against", es: "face a difficulty" },
              { en: "brush up on", es: "improve a skill you haven't used for a while" },
              { en: "put forward", es: "suggest an idea for discussion" },
              { en: "follow up on", es: "take further action on something" },
              { en: "play down", es: "make something seem less important" },
              { en: "rule out", es: "decide that something is not possible" },
              { en: "bring forward", es: "move to an earlier date or time" }
            ]
          },
          {
            kind: "expresiones",
            items: [
              { en: "We need to iron out a few details.", es: "solve minor problems" },
              { en: "Let's not rule anything out yet.", es: "keep options open" },
              { en: "I'll follow up on that tomorrow.", es: "promise further action" },
              { en: "They're playing down the risks.", es: "someone is minimising a problem" }
            ]
          },
          {
            kind: "ejemplos",
            items: [
              { en: "We still need to iron out a few details before we sign." },
              { en: "The project came up against strong local opposition." },
              { en: "I'm brushing up on my German before the trip to Berlin." },
              { en: "The meeting has been brought forward to Monday." }
            ]
          },
          {
            kind: "errores",
            items: [
              { no: "We need to rule out it.", si: "We need to rule it out.", pq: "With a pronoun, separable phrasal verbs must split." },
              { no: "I need to brush up my skills on.", si: "I need to brush up on my skills.", pq: "In three-part verbs, keep both particles together before the object." },
              { no: "The meeting was brought forward to Friday. (= later)", si: "The meeting was put back / postponed to Friday.", pq: "bring forward = earlier; put back = later." }
            ]
          },
          { kind: "resumen", body: "iron out, come up against, brush up on, put forward, follow up on, play down, rule out, bring forward. Pronouns go in the middle of separable verbs: rule it out." },
          { kind: "puente", body: "Sound natural in meetings and emails." }
        ]
      },
      exercises: [
        {
          type: "matching", instruction: "Match each phrasal verb with its meaning.",
          pairs: [
            { l: "iron out", r: "solve small problems or differences" },
            { l: "come up against", r: "face a difficulty" },
            { l: "brush up on", r: "improve a skill you haven't used for a while" },
            { l: "play down", r: "make something seem less important" },
            { l: "rule out", r: "decide that something is not possible" },
            { l: "bring forward", r: "move to an earlier date" }
          ]
        },
        {
          type: "multiple_choice", question: "The police haven't ___ the possibility of foul play.", options: ["ruled out", "played down", "ironed out"], correctIndex: 0,
          explanation: "rule out = decide something is not possible."
        },
        {
          type: "word_order", words: ["details", "We", "few", "still", "a", "need", "out", "to", "iron"], correctOrder: ["We", "still", "need", "to", "iron", "out", "a", "few", "details"],
          hint: "iron out + object"
        },
        {
          type: "find_error",
          segments: ["Before the interview, I ", { u: "brushed" }, " ", { u: "up my French on" }, " ", { u: "for a week" }, "."],
          correctIndex: 1, correction: "up on my French", explanation: "Keep both particles together before the object: brushed up on my French.", question: "Find the mistake"
        },
        { type: "fill_blank", sentence: "Several ideas were put ___ at the meeting, but none was accepted.", answers: ["forward"], hint: "suggest an idea for discussion", explanation: "put forward" },
        {
          type: "listening", text: "The government is playing down the risks, but experts are worried.", question: "What is the government doing?",
          options: ["Making the risks seem smaller", "Explaining the risks in detail", "Removing the risks"], correctIndex: 0
        },
        { type: "true_false", statement: "To \"bring forward\" a meeting means to move it to a later date.", answer: false, explanation: "bring forward = earlier; put back / postpone = later." },
        {
          type: "translate", prompt: "Rewrite using a phrasal verb and \"it\": \"We can't exclude that option.\"",
          answers: ["we can't rule it out", "we cannot rule it out", "we can't rule that out", "we cannot rule that out"], explanation: "We can't rule it out."
        }
      ]
    },

    "use-c1-inversion": {
      lessonId: "use-c1-inversion", level: "C1", track: "Grammar", topic: "grammar", skill: "grammar", tipo: "aprende", title: "Ellipsis and substitution", rev: 2, xpReward: 56, mascotState: "explaining",
      nextLessonId: "use-c1-register",
      explanation: {
        body: "Fluent speakers avoid repeating words. \"Are you coming tonight?\" \"I hope so.\" \"She can't swim, but her brother can.\" Ellipsis (leaving words out) and substitution (replacing them with so, one, do...) make your English cohesive and natural. Substitution: one / ones replace countable nouns (I prefer the blue one). do / does / did replace verb phrases (She works harder than I do). so / not replace whole clauses after think, hope, expect, suppose, be afraid: I hope so / I hope not / I'm afraid not. Ellipsis: leave out words after auxiliaries and modals (He said he'd call, and he did. / I can't come, but Tom can.), after to (I'd like to, but I can't) and in linked clauses (She cooked and cleaned). In casual speech, the start of a question often drops: (Have you) Seen Tom?",
        examples: [
          { en: "\"Will the meeting finish on time?\" \"I doubt it, but I hope so.\"" },
          { en: "\"Which laptop do you want?\" \"The lighter one.\"" },
          { en: "She said she would finish the report, and she did." },
          { en: "\"Can you join us?\" \"I'd love to, but I'm afraid I can't.\"" }
        ],
        sections: [
          {
            kind: "intro",
            body: "Fluent speakers avoid repeating words. \"Are you coming tonight?\" \"I hope so.\" \"She can't swim, but her brother can.\" Ellipsis (leaving words out) and substitution (replacing them with so, one, do...) make your English cohesive and natural."
          },
          {
            kind: "regla",
            body: "Substitution: one / ones replace countable nouns (I prefer the blue one). do / does / did replace verb phrases (She works harder than I do). so / not replace whole clauses after think, hope, expect, suppose, be afraid: I hope so / I hope not / I'm afraid not. Ellipsis: leave out words after auxiliaries and modals (He said he'd call, and he did. / I can't come, but Tom can.), after to (I'd like to, but I can't) and in linked clauses (She cooked and cleaned). In casual speech, the start of a question often drops: (Have you) Seen Tom?"
          },
          {
            kind: "vocab",
            items: [
              { en: "ellipsis", ipa: "ɪˈlɪpsɪs", es: "leaving out words that are understood from context" },
              { en: "substitution", ipa: "ˌsʌbstɪˈtjuːʃən", es: "replacing a word or phrase with a shorter one" },
              { en: "cohesion", ipa: "kəʊˈhiːʒən", es: "the way the parts of a text are linked" },
              { en: "redundant", ipa: "rɪˈdʌndənt", es: "unnecessary because already said" },
              { en: "antecedent", ipa: "ˌæntɪˈsiːdənt", es: "the earlier word that a later word refers to" },
              { en: "recoverable", ipa: "rɪˈkʌvərəbəl", es: "able to be understood from context" },
              { en: "reference", ipa: "ˈrefərəns", es: "a link to something mentioned earlier" },
              { en: "repetition", ipa: "ˌrepəˈtɪʃən", es: "saying the same thing again" }
            ]
          },
          {
            kind: "expresiones",
            items: [
              { en: "I hope so. / I hope not.", es: "replace a whole clause" },
              { en: "I'm afraid not.", es: "a polite negative answer" },
              { en: "I'd love to, but I can't.", es: "ellipsis after to" },
              { en: "So do I. / Neither can she.", es: "short agreement with substitution" }
            ]
          },
          {
            kind: "ejemplos",
            items: [
              { en: "\"Will the meeting finish on time?\" \"I doubt it, but I hope so.\"" },
              { en: "\"Which laptop do you want?\" \"The lighter one.\"" },
              { en: "She said she would finish the report, and she did." },
              { en: "\"Can you join us?\" \"I'd love to, but I'm afraid I can't.\"" }
            ]
          },
          {
            kind: "errores",
            items: [
              { no: "I think yes.", si: "I think so.", pq: "Use so to replace a clause after think, hope, expect." },
              { no: "I don't hope so.", si: "I hope not.", pq: "With hope and be afraid, the negative is 'not'." },
              { no: "I like the red car and the blue car one.", si: "I like the red car and the blue one.", pq: "one replaces the noun; don't repeat it." }
            ]
          },
          { kind: "resumen", body: "one / ones for nouns; do / does / did for verb phrases; so / not for clauses. Leave out what the listener can recover from context." },
          { kind: "puente", body: "Cut the repetition and sound more natural." }
        ]
      },
      exercises: [
        {
          type: "multiple_choice", question: "\"Is it going to rain tomorrow?\" \"I hope ___.\" (you don't want rain)", options: ["not", "no", "don't"], correctIndex: 0,
          explanation: "hope + not for a negative: I hope not."
        },
        { type: "fill_blank", sentence: "These shoes are too small. Do you have any bigger ___?", answers: ["ones"], hint: "Replace a plural countable noun.", explanation: "bigger ones = bigger shoes" },
        {
          type: "find_error",
          segments: ["\"Will he be late?\" \"I ", { u: "don't" }, " ", { u: "hope" }, " ", { u: "so" }, ".\""],
          correctIndex: 0, correction: "I hope not.", explanation: "With hope, the negative is 'I hope not', not 'I don't hope so'.", question: "Find the mistake"
        },
        {
          type: "categorize", instruction: "Substitution or ellipsis?",
          buckets: [{ id: "sub", label: "Substitution (a word replaces others)" }, { id: "ell", label: "Ellipsis (words are left out)" }],
          items: [
            { t: "I think so.", bucket: "sub" },
            { t: "The red one, please.", bucket: "sub" },
            { t: "He works harder than I do.", bucket: "sub" },
            { t: "I can't swim, but Tom can.", bucket: "ell" },
            { t: "I'd like to, but I'm busy.", bucket: "ell" },
            { t: "Seen my keys anywhere?", bucket: "ell" }
          ]
        },
        {
          type: "listening", text: "Are you coming to the party on Friday? I'm afraid not. I'm working.", question: "What does \"I'm afraid not\" mean here?",
          options: ["I'm not coming.", "I'm scared of parties.", "I don't know yet."], correctIndex: 0
        },
        {
          type: "matching", instruction: "Match each reply with its meaning.",
          pairs: [
            { l: "I hope so.", r: "I hope that will happen." },
            { l: "I hope not.", r: "I hope that won't happen." },
            { l: "So do I.", r: "I also do that." },
            { l: "Neither do I.", r: "I don't do that either." }
          ]
        },
        {
          type: "translate",
          prompt: "Shorten using substitution: \"Priya likes the new design, and Daniel likes the new design too.\"",
          answers: ["priya likes the new design and so does daniel", "priya likes the new design and daniel does too", "priya likes the new design and daniel does as well"],
          explanation: "Priya likes the new design, and so does Daniel."
        },
        {
          type: "translate",
          prompt: "Shorten using ellipsis: \"I wanted to go to the concert, but I couldn't go to the concert.\"",
          answers: ["i wanted to go to the concert but i couldn't", "i wanted to go to the concert but i could not", "i wanted to go but i couldn't", "i wanted to go but i could not"],
          explanation: "I wanted to go to the concert, but I couldn't."
        }
      ]
    },

    "use-c1-register": {
      lessonId: "use-c1-register", level: "C1", track: "Functional English", topic: "work", skill: "use", tipo: "aprende", title: "Handling questions after a presentation", rev: 2, xpReward: 56,
      mascotState: "explaining",
      explanation: {
        body: "Your presentation went well; now comes the Q&A. Some questions are easy, some are hostile and some you simply can't answer. Learn the language to welcome questions, check what is being asked, buy time and deal with difficult questions confidently. Welcome: That's a good question. / Thanks for raising that. Check: If I understand you correctly, you're asking whether... / Are you asking about X or Y? Buy time: That's an interesting point; let me think about that for a second. Don't know: I don't have the figures to hand, but I'll get back to you by Friday. Off-topic or hostile: That's slightly outside the scope of today's talk, but I'm happy to discuss it afterwards. / I can see why you might think that; however, the data shows... Close: Does that answer your question?",
        examples: [
          { en: "Thanks for raising that. If I understand you correctly, you're asking about the cost per user." },
          { en: "I don't have the exact figures to hand, but I'll get back to you by Friday." },
          { en: "That's slightly outside the scope of today's talk, but I'm happy to discuss it afterwards." },
          { en: "I can see why you might think that; however, our trial showed the opposite. Does that answer your question?" }
        ],
        sections: [
          {
            kind: "intro",
            body: "Your presentation went well; now comes the Q&A. Some questions are easy, some are hostile and some you simply can't answer. Learn the language to welcome questions, check what is being asked, buy time and deal with difficult questions confidently."
          },
          {
            kind: "regla",
            body: "Welcome: That's a good question. / Thanks for raising that. Check: If I understand you correctly, you're asking whether... / Are you asking about X or Y? Buy time: That's an interesting point; let me think about that for a second. Don't know: I don't have the figures to hand, but I'll get back to you by Friday. Off-topic or hostile: That's slightly outside the scope of today's talk, but I'm happy to discuss it afterwards. / I can see why you might think that; however, the data shows... Close: Does that answer your question?"
          },
          {
            kind: "vocab",
            items: [
              { en: "Q&A", ipa: "ˌkjuː ən ˈeɪ", es: "a session for questions and answers" },
              { en: "to hand", es: "available and close by" },
              { en: "get back to someone", es: "reply later with information" },
              { en: "scope", ipa: "skəʊp", es: "the range of things a subject covers" },
              { en: "hostile", ipa: "ˈhɒstaɪl", es: "unfriendly and aggressive" },
              { en: "raise (a point)", es: "mention something for discussion" },
              { en: "follow-up", ipa: "ˈfɒləʊ ʌp", es: "an action that continues something earlier" },
              { en: "rephrase", ipa: "ˌriːˈfreɪz", es: "say again in different words" }
            ]
          },
          {
            kind: "expresiones",
            items: [
              { en: "If I understand you correctly, ...", es: "check the question" },
              { en: "That's slightly outside the scope of today's talk.", es: "deflect politely" },
              { en: "I'll get back to you on that.", es: "promise to answer later" },
              { en: "Does that answer your question?", es: "check the questioner is satisfied" }
            ]
          },
          {
            kind: "ejemplos",
            items: [
              { en: "Thanks for raising that. If I understand you correctly, you're asking about the cost per user." },
              { en: "I don't have the exact figures to hand, but I'll get back to you by Friday." },
              { en: "That's slightly outside the scope of today's talk, but I'm happy to discuss it afterwards." },
              { en: "I can see why you might think that; however, our trial showed the opposite. Does that answer your question?" }
            ]
          },
          {
            kind: "errores",
            items: [
              { no: "I don't know. (and stop)", si: "I don't have that information to hand, but I'll get back to you.", pq: "Admit it, then promise a follow-up." },
              { no: "Your question is wrong.", si: "I think the data tells a slightly different story.", pq: "Disagree with the idea, not the person." },
              { no: "I'll get back to you about.", si: "I'll get back to you on that.", pq: "get back to someone on / about something needs an object." }
            ]
          },
          { kind: "resumen", body: "Welcome → check → answer (or buy time / promise a follow-up / deflect politely) → check satisfaction." },
          { kind: "puente", body: "Survive the Q&A with confidence." }
        ]
      },
      exercises: [
        {
          type: "categorize", instruction: "What is the presenter doing?",
          buckets: [{ id: "check", label: "Checking the question" }, { id: "time", label: "Buying time" }, { id: "defer", label: "Promising a later answer" }, { id: "deflect", label: "Deflecting politely" }],
          items: [
            { t: "If I understand you correctly, ...", bucket: "check" },
            { t: "Are you asking about the cost or the timeline?", bucket: "check" },
            { t: "Let me think about that for a second.", bucket: "time" },
            { t: "That's an interesting point. Let me just think.", bucket: "time" },
            { t: "I'll get back to you on that by Friday.", bucket: "defer" },
            { t: "I don't have the figures to hand, but I'll email them.", bucket: "defer" },
            { t: "That's slightly outside the scope of today's talk.", bucket: "deflect" },
            { t: "I'm happy to discuss that after the session.", bucket: "deflect" }
          ]
        },
        {
          type: "listening",
          text: "That's a fair question. I don't have the numbers to hand, but I'll send them to everyone after the session.", question: "What will the presenter do?",
          options: ["Send the numbers later", "Answer immediately", "Ignore the question"], correctIndex: 0
        },
        {
          type: "multiple_choice", question: "Someone asks a question you don't understand. You say:",
          options: ["Sorry, could you rephrase that? Are you asking about the cost or the timeline?", "That's a strange question.", "Next question, please."], correctIndex: 0,
          explanation: "Ask for a rephrase and offer options to narrow it down."
        },
        {
          type: "matching", instruction: "Match each word with its meaning.",
          pairs: [
            { l: "scope", r: "the range of things a subject covers" },
            { l: "hostile", r: "unfriendly and aggressive" },
            { l: "to hand", r: "available and close by" },
            { l: "follow-up", r: "an action that continues something earlier" },
            { l: "rephrase", r: "say again in different words" }
          ]
        },
        {
          type: "find_error",
          segments: ["I ", { u: "will" }, " get back ", { u: "to you" }, " ", { u: "about" }, " by Friday."],
          correctIndex: 2, correction: "about it / on that", explanation: "get back to someone about something: the phrase needs an object.", question: "Find the mistake"
        },
        {
          type: "fill_blank", sentence: "Thanks for ___ that point. It's an important one.", answers: ["raising", "mentioning", "bringing up"], hint: "mention something for discussion",
          explanation: "Thanks for raising that point."
        },
        { type: "speak", text: "That's a good question. If I understand you correctly, you're asking about the cost per user." },
        {
          type: "translate",
          prompt: "Rephrase politely, starting with \"That's slightly outside\": \"Your question has nothing to do with my talk.\"",
          answers: ["that's slightly outside the scope of my talk", "that's slightly outside the scope of today's talk", "that's slightly outside the scope of this talk", "that is slightly outside the scope of my talk", "that is slightly outside the scope of today's talk"],
          explanation: "That's slightly outside the scope of today's talk."
        }
      ]
    }
  };

  var ORDER = [
    /* A1 */ "read-a1-my-day", "read-a1-market", "lis-a1-intro", "gram-a1-articles", "voc-a1-body", "use-a1-can",
    /* A2 */ "read-a2-email", "read-a2-review", "lis-a2-directions", "gram-a2-past-simple", "voc-a2-health", "use-a2-prepositions",
    /* B1 */ "read-b1-article", "read-b1-blog", "lis-b1-voicemail", "gram-b1-present-perfect", "voc-b1-money", "use-b1-phrasal-verbs",
    /* B2 */ "read-b2-story", "read-b2-science", "lis-b2-interview", "lis-b2-podcast", "gram-b2-conditionals", "voc-b2-environment", "voc-b2-feelings", "use-b2-linkers",
    /* C1 */ "read-c1-habits", "read-c1-work", "lis-c1-lecture", "lis-c1-debate", "voc-c1-collocations", "voc-c1-idioms", "use-c1-inversion", "use-c1-register"
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
