/* ============================================================
 * vesper_activities.js — Banco ampliado de actividades de Vesper.
 *
 * Lecciones tematicas (vida diaria, comida, viajes, trabajo, tech...)
 * que estrenan los nuevos tipos de ejercicio del motor de lecciones:
 *   true_false   { statement, answer:bool, explanation }
 *   fill_blank   { sentence:"I ___ here.", answers:[...], hint?, explanation? }
 *   matching     { pairs:[{l,r}], instruction?, explanation? }
 *   listening    { text, audio?, question?, options?, correctIndex? | answers? }
 *   translate    { prompt, answers:[...], explanation? }   (escribir respuesta)
 *   categorize   { instruction, buckets:[{id,label}], items:[{t,bucket}] }
 *   multiple_choice / word_order  (compatibles con el motor base)
 *
 * Se fusionan en VESPER_LESSONS via VESPER_ACTIVITIES.merge(). Cada
 * leccion lleva 'topic' y 'level' para que el motor adaptativo las
 * ordene segun el perfil del usuario.
 * ============================================================ */
window.VESPER_ACTIVITIES = (function () {
  var L = {
    /* ---------------- A1 · Vida diaria ---------------- */
    "act-a1-daily-routine": {
      lessonId: "act-a1-daily-routine", level: "A1", track: "Practica", topic: "dailylife", skill: "use",
      title: "Rutina diaria", xpReward: 35, mascotState: "explaining",
      explanation: {
        body: "Usamos el present simple para hablar de rutinas: I get up, I have breakfast, I go to work. Con he/she/it agregamos -s: she gets up. (Para rutinas usamos el presente simple.)",
        examples: [
          { en: "I get up at seven.", es: "Me levanto a las siete." },
          { en: "She has breakfast at home.", es: "Ella desayuna en casa." },
          { en: "We go to bed late.", es: "Nos acostamos tarde." }
        ]
      },
      exercises: [
        { type: "true_false", statement: "\"I get up\" means \"me levanto\".", answer: true, explanation: "\"Get up\" = levantarse." },
        { type: "fill_blank", sentence: "She ___ breakfast at eight.", answers: ["has"], hint: "he/she/it -> have se vuelve has.", explanation: "Con she usamos \"has\"." },
        { type: "multiple_choice", question: "Choose: I ___ to work by bus.", options: ["go", "goes", "going"], correctIndex: 0, explanation: "Con \"I\" el verbo no lleva -s." },
        { type: "matching", instruction: "Une cada accion con su traduccion.", pairs: [
          { l: "wake up", r: "despertarse" }, { l: "have lunch", r: "almorzar" },
          { l: "go to bed", r: "ir a la cama" }, { l: "take a shower", r: "ducharse" }
        ], explanation: "Verbos de rutina muy comunes." },
        { type: "listening", text: "I have lunch at noon.", "audio": "assets/audio/app/a1_e7c2fbadb5.mp3", question: "Que escuchaste?",
          options: ["I love lunch and moon.", "I had lunch at nine.", "I have lunch at noon."], correctIndex: 2 },
        { type: "categorize", instruction: "Clasifica: manana o noche?", buckets: [
          { id: "am", label: "Manana" }, { id: "pm", label: "Noche" }
        ], items: [
          { t: "wake up", bucket: "am" }, { t: "have breakfast", bucket: "am" },
          { t: "go to bed", bucket: "pm" }, { t: "have dinner", bucket: "pm" }
        ] },
        { type: "translate", prompt: "Traduce al ingles: \"Me levanto a las siete.\"",
          answers: ["i get up at seven", "i wake up at seven"], explanation: "I get up at seven." }
      ]
    },

    /* ---------------- A1 · Comida ---------------- */
    "act-a1-food": {
      lessonId: "act-a1-food", level: "A1", track: "Expresiones", topic: "food", skill: "use", tipo: "aprende", title: "En la cafetería: pedir algo", rev: 2, xpReward: 35, mascotState: "explaining",
      explanation: {
        body: "Episodio 1 · Sam es el nuevo compañero de piso de Mia. Hoy ella lo lleva a su cafetería favorita. Aprende a pedir comida y bebida con educación. Para pedir: I'd like + cosa (I'd like a tea) o Can I have + cosa? (Can I have a sandwich, please?). Agrega please. El mesero pregunta: Anything else? Para pagar: How much is it? Can I pay by card?",
        examples: [
          { en: "Hi! What can I get you?", es: "¡Hola! ¿Qué les sirvo?" },
          { en: "I'd like a tea and a muffin, please.", es: "Quisiera un té y un panquecito, por favor." },
          { en: "Can I have a coffee and a sandwich?", es: "¿Me da un café y un sándwich?" },
          { en: "Sure. Anything else?", es: "Claro. ¿Algo más?" }
        ],
        sections: [
          { kind: "intro", body: "Episodio 1 · Sam es el nuevo compañero de piso de Mia. Hoy ella lo lleva a su cafetería favorita. Aprende a pedir comida y bebida con educación." },
          {
            kind: "regla",
            body: "Para pedir: I'd like + cosa (I'd like a tea) o Can I have + cosa? (Can I have a sandwich, please?). Agrega please. El mesero pregunta: Anything else? Para pagar: How much is it? Can I pay by card?"
          },
          {
            kind: "vocab",
            items: [
              { en: "a coffee", ipa: "ə ˈkɒfi", es: "un café" },
              { en: "a tea", ipa: "ə tiː", es: "un té" },
              { en: "orange juice", ipa: "ˈɒrɪndʒ dʒuːs", es: "jugo de naranja" },
              { en: "a sandwich", ipa: "ə ˈsænwɪdʒ", es: "un sándwich" },
              { en: "a muffin", ipa: "ə ˈmʌfɪn", es: "un panquecito / una magdalena" },
              { en: "water", ipa: "ˈwɔːtə", es: "agua" },
              { en: "the bill", ipa: "ðə bɪl", es: "la cuenta" },
              { en: "a table for two", ipa: "ə ˈteɪbəl fə tuː", es: "una mesa para dos" }
            ]
          },
          {
            kind: "expresiones",
            items: [
              { en: "I'd like a coffee, please.", es: "Quisiera un café, por favor." },
              { en: "Can I have...?", es: "¿Me da...?" },
              { en: "Anything else?", es: "¿Algo más?" },
              { en: "How much is it?", es: "¿Cuánto es?" }
            ]
          },
          {
            kind: "ejemplos",
            items: [
              { en: "Waiter: Hi! What can I get you?", es: "Mesero: ¡Hola! ¿Qué les sirvo?" },
              { en: "Mia: I'd like a tea and a muffin, please.", es: "Mia: Quisiera un té y un panquecito, por favor." },
              { en: "Sam: Can I have a coffee and a sandwich?", es: "Sam: ¿Me da un café y un sándwich?" },
              { en: "Waiter: Sure. Anything else?", es: "Mesero: Claro. ¿Algo más?" },
              { en: "Sam: No, thanks. How much is it?", es: "Sam: No, gracias. ¿Cuánto es?" }
            ]
          },
          {
            kind: "errores",
            items: [
              { no: "I want a coffee.", si: "I'd like a coffee, please.", pq: "I want suena brusco al pedir; I'd like es más amable." },
              { no: "Give me a water.", si: "Can I have a water, please?", pq: "Pide con Can I have...? y please." },
              { no: "How much costs?", si: "How much is it?", pq: "Para preguntar el precio: How much is it?" }
            ]
          },
          { kind: "resumen", body: "Pedir: I'd like... / Can I have...? + please. Te preguntan: Anything else? Pagar: How much is it? / Can I pay by card?" },
          { kind: "puente", body: "Ahora te toca pedir en la cafetería con Mia y Sam." }
        ]
      },
      exercises: [
        {
          type: "reading", title: "At the café",
          passage: "Waiter: Hi! What can I get you?\nMia: I'd like a tea and a muffin, please.\nSam: Can I have a coffee and a sandwich?\nWaiter: Sure. Anything else?\nSam: No, thanks. How much is it?\nWaiter: That's eleven dollars, please.",
          questions: [
            { q: "¿Qué pide Mia?", options: ["Un té y un panquecito", "Un café y un sándwich", "Un jugo de naranja"], correctIndex: 0, explanation: "Mia: I'd like a tea and a muffin." },
            { q: "¿Cuánto pagan?", options: ["11 dólares", "7 dólares", "12 dólares"], correctIndex: 0, explanation: "That's eleven dollars = son once dólares." }
          ]
        },
        {
          type: "multiple_choice", question: "Para pedir con educación dices:", options: ["I'd like a tea, please.", "Give me tea.", "I want tea now."], correctIndex: 0,
          explanation: "I'd like... please es la forma amable."
        },
        { type: "fill_blank", sentence: "Can I ___ a sandwich, please?", answers: ["have", "get"], hint: "¿Me da...? = Can I ___...?", explanation: "Can I have a sandwich, please?" },
        {
          type: "matching", instruction: "Une cada frase con su significado.",
          pairs: [
            { l: "Anything else?", r: "¿Algo más?" },
            { l: "How much is it?", r: "¿Cuánto es?" },
            { l: "The bill, please.", r: "La cuenta, por favor." },
            { l: "A table for two, please.", r: "Una mesa para dos, por favor." }
          ]
        },
        { type: "word_order", words: ["please", "I'd", "juice", "like", "orange", "an"], correctOrder: ["I'd", "like", "an", "orange", "juice", "please"], hint: "Empieza con I'd like." },
        { type: "listening", text: "That's six dollars fifty, please.", question: "¿Cuánto es?", options: ["$6.50", "$7.50", "$16.50"], correctIndex: 0 },
        { type: "speak", text: "I'd like a coffee, please.", es: "Quisiera un café, por favor.", explanation: "Di la frase con tono amable. Please al final suena natural." },
        {
          type: "translate", prompt: "Traduce: \"¿Me da un agua, por favor?\"",
          answers: ["can i have a water please", "can i have some water please", "can i get a water please", "could i have a water please"], explanation: "Can I have a water, please?"
        }
      ]
    },

    /* ---------------- A1 · Numeros y la hora ---------------- */
    "act-a1-time": {
      lessonId: "act-a1-time", level: "A1", track: "Practica", topic: "dailylife", skill: "vocab",
      title: "Numeros y la hora", xpReward: 30, mascotState: "explaining",
      explanation: {
        body: "Para la hora: It's seven o'clock, It's half past eight (8:30), It's a quarter to nine (8:45). (La hora se dice con o'clock, half past, quarter to/past.)",
        examples: [
          { en: "It's three o'clock.", es: "Son las tres." },
          { en: "It's half past six.", es: "Son las seis y media." },
          { en: "It's a quarter to ten.", es: "Son las diez menos cuarto." }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Une el numero con la palabra.", pairs: [
          { l: "12", r: "twelve" }, { l: "15", r: "fifteen" },
          { l: "20", r: "twenty" }, { l: "30", r: "thirty" }
        ] },
        { type: "fill_blank", sentence: "It's half ___ eight. (8:30)", answers: ["past"], hint: "y media = half past.", explanation: "Half past eight = ocho y media." },
        { type: "multiple_choice", question: "8:45 in English is...", options: ["a quarter past nine", "a quarter to nine", "half past eight"], correctIndex: 1, explanation: "Quarter to nine = nueve menos cuarto." },
        { type: "true_false", statement: "\"o'clock\" is used for exact hours (3:00, 5:00).", answer: true, explanation: "o'clock solo en horas en punto." },
        { type: "listening", text: "It's a quarter past seven.", "audio": "assets/audio/app/a1_c0cbe049a6.mp3", question: "Que hora es?",
          options: ["6:15", "7:45", "7:15"], correctIndex: 2 },
        { type: "translate", prompt: "Traduce: \"Son las tres.\"",
          answers: ["it's three o'clock", "its three o'clock", "it is three o'clock"], explanation: "It's three o'clock." }
      ]
    },

    /* ---------------- A2 · Viajes ---------------- */
    "act-a2-travel": {
      lessonId: "act-a2-travel", level: "A2", track: "Practica", topic: "travel", skill: "vocab",
      title: "Viajes y aeropuerto", xpReward: 40, mascotState: "explaining",
      explanation: {
        body: "En el aeropuerto: check in, boarding pass, gate, departure, arrival. Para pedir direcciones: \"How do I get to...?\". (Vocabulario de viaje y como pedir indicaciones.)",
        examples: [
          { en: "Where is the gate?", es: "Donde esta la puerta?" },
          { en: "How do I get to the station?", es: "Como llego a la estacion?" },
          { en: "My flight is delayed.", es: "Mi vuelo esta retrasado." }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Une el termino con su significado.", pairs: [
          { l: "gate", r: "puerta de embarque" }, { l: "luggage", r: "equipaje" },
          { l: "delay", r: "retraso" }, { l: "arrival", r: "llegada" }
        ] },
        { type: "fill_blank", sentence: "How do I ___ to the airport?", answers: ["get"], hint: "get to = llegar a.", explanation: "How do I get to...? = Como llego a...?" },
        { type: "multiple_choice", question: "At check-in they give you a...", options: ["boarding pass", "menu", "ticket office"], correctIndex: 0, explanation: "Boarding pass = pase de abordar." },
        { type: "true_false", statement: "\"Delayed\" means the flight is on time.", answer: false, explanation: "Delayed = retrasado, no a tiempo." },
        { type: "listening", text: "Your flight is delayed by two hours.", "audio": "assets/audio/app/a2_fe7f8e63b1.mp3", question: "Que pasa con el vuelo?",
          options: ["Fue cancelado", "Esta retrasado dos horas", "Sale a tiempo"], correctIndex: 1 },
        { type: "categorize", instruction: "Salida o llegada?", buckets: [
          { id: "dep", label: "Salida" }, { id: "arr", label: "Llegada" }
        ], items: [
          { t: "departure gate", bucket: "dep" }, { t: "boarding", bucket: "dep" },
          { t: "baggage claim", bucket: "arr" }, { t: "passport control", bucket: "arr" }
        ] },
        { type: "translate", prompt: "Traduce: \"Donde esta la puerta de embarque?\"",
          answers: ["where is the gate", "where's the gate", "where is the boarding gate"], explanation: "Where is the gate?" }
      ]
    },

    /* ---------------- A2 · Compras ---------------- */
    "act-a2-shopping": {
      lessonId: "act-a2-shopping", level: "A2", track: "Practica", topic: "dailylife", skill: "use",
      title: "Compras", xpReward: 38, mascotState: "explaining",
      explanation: {
        body: "Para comprar: \"How much is it?\", \"Can I try it on?\", \"It's too expensive.\" Usa this/these para cerca y that/those para lejos. (Frases para ir de compras y demostrativos.)",
        examples: [
          { en: "How much is this shirt?", es: "Cuanto cuesta esta camisa?" },
          { en: "Can I try these on?", es: "Me los puedo probar?" },
          { en: "It's too expensive.", es: "Es demasiado caro." }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "Ask the price: \"___ is it?\"", options: ["How many", "How long", "How much"], correctIndex: 2, explanation: "How much = cuanto (precio)." },
        { type: "fill_blank", sentence: "Can I try ___ shoes on? (lejos)", answers: ["those"], hint: "plural + lejos = those.", explanation: "Those = esos/aquellos (plural, lejos)." },
        { type: "matching", instruction: "Une el adjetivo con su opuesto.", pairs: [
          { l: "cheap", r: "expensive" }, { l: "big", r: "small" },
          { l: "new", r: "old" }, { l: "open", r: "closed" }
        ] },
        { type: "true_false", statement: "\"It's too expensive\" means it costs little.", answer: false, explanation: "Too expensive = demasiado caro." },
        { type: "categorize", instruction: "this/these (cerca) o that/those (lejos)?", buckets: [
          { id: "near", label: "Cerca" }, { id: "far", label: "Lejos" }
        ], items: [
          { t: "this", bucket: "near" }, { t: "these", bucket: "near" },
          { t: "that", bucket: "far" }, { t: "those", bucket: "far" }
        ] },
        { type: "translate", prompt: "Traduce: \"Cuanto cuesta?\"",
          answers: ["how much is it", "how much is this", "how much does it cost"], explanation: "How much is it?" }
      ]
    },

    /* ---------------- A2 · Familia ---------------- */
    "act-a2-family": {
      lessonId: "act-a2-family", level: "A2", track: "Practica", topic: "dailylife", skill: "vocab",
      title: "Familia y descripciones", xpReward: 36, mascotState: "explaining",
      explanation: {
        body: "Para describir personas usamos have got / has got y adjetivos: She has got brown eyes. He is tall and friendly. (Para describir usamos have/has got + adjetivos.)",
        examples: [
          { en: "I have got two sisters.", es: "Tengo dos hermanas." },
          { en: "She has got long hair.", es: "Ella tiene el pelo largo." },
          { en: "He is tall and kind.", es: "El es alto y amable." }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Une el familiar con su traduccion.", pairs: [
          { l: "brother", r: "hermano" }, { l: "aunt", r: "tia" },
          { l: "grandfather", r: "abuelo" }, { l: "cousin", r: "primo/a" }
        ] },
        { type: "fill_blank", sentence: "She ___ got green eyes.", answers: ["has"], hint: "he/she/it -> has got.", explanation: "She has got... = ella tiene." },
        { type: "multiple_choice", question: "Opposite of \"tall\":", options: ["short", "long", "small"], correctIndex: 0, explanation: "Short = bajo (personas)." },
        { type: "true_false", statement: "\"Friendly\" describes personality, not height.", answer: true, explanation: "Friendly = amable (personalidad)." },
        { type: "listening", text: "My brother is tall and friendly.", "audio": "assets/audio/app/a2_6844e23fcb.mp3", question: "Como es el hermano?",
          options: ["Bajo y serio", "Alto y enojado", "Alto y amable"], correctIndex: 2 },
        { type: "translate", prompt: "Traduce: \"Tengo dos hermanas.\"",
          answers: ["i have got two sisters", "i have two sisters", "i've got two sisters"], explanation: "I have got two sisters." }
      ]
    },

    /* ---------------- B1 · Trabajo ---------------- */
    "act-b1-work": {
      lessonId: "act-b1-work", level: "B1", track: "Practice", topic: "business", skill: "use",
      title: "Work and careers", xpReward: 45, mascotState: "explaining",
      explanation: {
        body: "Useful work collocations: apply for a job, attend a meeting, meet a deadline, give feedback. To talk about work experience we use the present perfect: I have worked here for three years.",
        examples: [
          { en: "I have worked here for three years." },
          { en: "We need to meet the deadline." },
          { en: "She applied for a new job." }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Match each word with its meaning.", pairs: [{"l":"deadline","r":"the latest time to finish something"},{"l":"meeting","r":"people getting together to discuss"},{"l":"salary","r":"money you earn every month"},{"l":"skills","r":"things you are good at doing"}] },
        { type: "fill_blank", sentence: "I have worked here ___ three years.", answers: ["for"], hint: "for + a period of time.", explanation: "for + duration (three years)." },
        { type: "multiple_choice", question: "Choose: She has ___ for the manager position.", options: ["applying", "applied", "apply"], correctIndex: 1, explanation: "Present perfect: has + past participle (applied)." },
        { type: "true_false", statement: "\"Meet a deadline\" means to finish on time.", answer: true, explanation: "To meet a deadline = to finish something on time." },
        { type: "listening", text: "We have a meeting at nine tomorrow.", "audio": "assets/audio/app/b1_2c0756b24d.mp3", question: "When is the meeting?",
          options: ["Tomorrow at nine","Today at nine","Tomorrow at five"], correctIndex: 0 },
        { type: "categorize", instruction: "Good news or bad news at work?", buckets: [{"id":"pos","label":"Good news"},{"id":"neg","label":"Bad news"}], items: [
          { t: "get a promotion", bucket: "pos" }, { t: "meet the deadline", bucket: "pos" },
          { t: "miss a deadline", bucket: "neg" }, { t: "get fired", bucket: "neg" }
        ] },
        { type: "translate", prompt: "Rewrite using 'for': I started working here three years ago, and I still work here.",
          answers: ["i have worked here for three years", "i've worked here for three years"], explanation: "I have worked here for three years." }
      ]
    },

    /* ---------------- B1 · Tecnologia ---------------- */
    "act-b1-tech": {
      lessonId: "act-b1-tech", level: "B1", track: "Practice", topic: "tech", skill: "vocab",
      title: "Technology and the internet", xpReward: 44, mascotState: "explaining",
      explanation: {
        body: "Tech verbs: download, upload, install, update, log in. Use used to for past habits that have stopped: I used to use a flip phone.",
        examples: [
          { en: "I need to update the app." },
          { en: "She uploaded the file." },
          { en: "We used to use maps on paper." }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Match each verb with what it means.", pairs: [{"l":"download","r":"copy a file from the internet"},{"l":"upload","r":"send a file to the internet"},{"l":"install","r":"put a program on a device"},{"l":"log in","r":"enter your account"}] },
        { type: "fill_blank", sentence: "I ___ to use a flip phone years ago.", answers: ["used"], hint: "used to + verb = a past habit.", explanation: "used to = a habit in the past that is not true now." },
        { type: "multiple_choice", question: "Opposite of \"download\":", options: ["upload", "update", "unplug"], correctIndex: 0, explanation: "Upload = send to the internet; download = get from the internet." },
        { type: "true_false", statement: "\"Update\" means to make software newer.", answer: true, explanation: "To update = to install the newest version." },
        { type: "listening", text: "Please update the app before you log in.", "audio": "assets/audio/app/b1_62911b52fc.mp3", question: "What should you do first?",
          options: ["Delete the app","Update the app","Turn off the phone"], correctIndex: 1 },
        { type: "categorize", instruction: "Hardware or software?", buckets: [
          { id: "hw", label: "Hardware" }, { id: "sw", label: "Software" }
        ], items: [
          { t: "keyboard", bucket: "hw" }, { t: "screen", bucket: "hw" },
          { t: "browser", bucket: "sw" }, { t: "operating system", bucket: "sw" }
        ] },
        { type: "translate", prompt: "Rewrite using 'need': It's necessary for me to update the app.",
          answers: ["i need to update the app", "i have to update the app"], explanation: "I need to update the app." }
      ]
    },

    /* ---------------- B2 · Conversacion y opinion ---------------- */
    "act-b2-opinion": {
      lessonId: "act-b2-opinion", level: "B2", track: "Practice", topic: "society", skill: "use",
      title: "Giving your opinion", xpReward: 50, mascotState: "explaining",
      explanation: {
        body: "To give a nuanced opinion: \"I reckon...\", \"As far as I'm concerned...\", \"I'd argue that...\". To agree or disagree politely: \"I see your point, but...\". These expressions help you debate naturally.",
        examples: [
          { en: "As far as I'm concerned, it's worth it." },
          { en: "I see your point, but I disagree." },
          { en: "I'd argue that it's too risky." }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Match each expression with its function.", pairs: [{"l":"I reckon...","r":"giving an opinion"},{"l":"On the other hand...","r":"contrasting"},{"l":"I totally agree","r":"strong agreement"},{"l":"I'm not so sure","r":"doubt"}] },
        { type: "fill_blank", sentence: "I see your ___, but I disagree.", answers: ["point"], hint: "see your point = understand your argument.", explanation: "\"I see your point\" = I understand your argument." },
        { type: "multiple_choice", question: "Most formal way to introduce an opinion:", options: ["I guess", "I reckon", "As far as I'm concerned"], correctIndex: 2, explanation: "\"As far as I'm concerned\" is the most formal option." },
        { type: "true_false", statement: "\"On the other hand\" introduces a contrasting idea.", answer: true, explanation: "It introduces a contrast or another perspective." },
        { type: "categorize", instruction: "Agreeing or disagreeing?", buckets: [{"id":"agree","label":"Agreeing"},{"id":"disagree","label":"Disagreeing"}], items: [
          { t: "I couldn't agree more", bucket: "agree" }, { t: "Absolutely", bucket: "agree" },
          { t: "I'm afraid I disagree", bucket: "disagree" }, { t: "That's not how I see it", bucket: "disagree" }
        ] },
        { type: "translate", prompt: "Say it more politely, using 'see' and 'point': \"You're wrong. I disagree.\"",
          answers: ["i see your point but i disagree", "i see your point, but i disagree", "i understand your point but i disagree"], explanation: "I see your point, but I disagree." }
      ]
    },

    /* ---------------- A1 · Listening ---------------- */
    "lis-a1-everyday": {
      lessonId: "lis-a1-everyday", level: "A1", track: "Listening", topic: "dailylife", skill: "listening",
      title: "Escucha: frases del día a día", xpReward: 35, mascotState: "explaining",
      explanation: {
        body: "Vamos a entrenar el oído con frases muy comunes. Toca el botón para escuchar (puedes repetir) y elige o escribe lo que oíste. (Entrena tu comprensión auditiva con frases cotidianas.)",
        examples: [
          { en: "Listen and choose.", es: "Escucha y elige." },
          { en: "You can repeat the audio.", es: "Puedes repetir el audio." }
        ]
      },
      exercises: [
        { type: "listening", text: "My name is Anna.", "audio": "assets/audio/app/a1_5ef915488a.mp3", question: "Que escuchaste?",
          options: ["My name is Anna.", "My game is honor.", "My name is Hannah."], correctIndex: 0 },
        { type: "listening", text: "I live in a small town.", "audio": "assets/audio/app/a1_f230e7057c.mp3", question: "Donde vive?",
          options: ["En una ciudad grande", "En una granja", "En un pueblo pequeño"], correctIndex: 2 },
        { type: "listening", text: "She has two children.", "audio": "assets/audio/app/a1_a104434c1d.mp3", question: "Cuantos hijos tiene?",
          options: ["Ninguno", "Dos", "Tres"], correctIndex: 1 },
        { type: "true_false", statement: "El audio decía: \"She has two children.\"", answer: true, explanation: "Asi es: two children = dos hijos." },
        { type: "listening", text: "I get up at six.", "audio": "assets/audio/app/a1_3d24a87a25.mp3", question: "Escribe lo que escuchaste:",
          answers: ["i get up at six"], explanation: "I get up at six." },
        { type: "listening", text: "Thank you very much.", "audio": "assets/audio/app/a1_c11ca9c2fe.mp3", question: "Que significa lo que oiste?",
          options: ["Muchas gracias", "De nada", "Lo siento"], correctIndex: 0 }
      ]
    },

    /* ---------------- A2 · Listening ---------------- */
    "lis-a2-plans": {
      lessonId: "lis-a2-plans", level: "A2", track: "Listening", topic: "dailylife", skill: "listening",
      title: "Escucha: planes y lugares", xpReward: 40, mascotState: "explaining",
      explanation: {
        body: "Escucha frases sobre planes, lugares y tiempo. Algunas piden elegir y otras escribir lo que oíste. (Comprensión auditiva nivel A2.)",
        examples: [
          { en: "We're going to the cinema tonight.", es: "Vamos al cine esta noche." },
          { en: "The shop closes at nine.", es: "La tienda cierra a las nueve." }
        ]
      },
      exercises: [
        { type: "listening", text: "We are going to the beach on Saturday.", "audio": "assets/audio/app/a2_586d38dd89.mp3", question: "Cuando van a la playa?",
          options: ["El sábado", "El domingo", "El viernes"], correctIndex: 0 },
        { type: "listening", text: "The train leaves at half past ten.", "audio": "assets/audio/app/a2_e166dc361d.mp3", question: "A que hora sale el tren?",
          options: ["10:15", "10:30", "11:30"], correctIndex: 1 },
        { type: "listening", text: "Can you help me, please?", "audio": "assets/audio/app/a2_0a56bf1838.mp3", question: "Que escuchaste?",
          options: ["Can you call me, please?", "Can you tell me, please?", "Can you help me, please?"], correctIndex: 2 },
        { type: "listening", text: "I would like a table for two.", "audio": "assets/audio/app/a2_82f4a70894.mp3", question: "Escribe lo que escuchaste:",
          answers: ["i would like a table for two", "i'd like a table for two"], explanation: "I would like a table for two." },
        { type: "true_false", statement: "El audio pedía una mesa para cuatro personas.", answer: false, explanation: "Era \"a table for two\" = para dos." },
        { type: "listening", text: "The museum is closed on Mondays.", "audio": "assets/audio/app/a2_b17eaa795f.mp3", question: "Cuando cierra el museo?",
          options: ["Los lunes", "Los domingos", "Nunca"], correctIndex: 0 }
      ]
    },

    /* ---------------- B1 · Listening ---------------- */
    "lis-b1-news": {
      lessonId: "lis-b1-news", level: "B1", track: "Listening", topic: "society", skill: "listening",
      title: "Listening: announcements and instructions", xpReward: 45, mascotState: "explaining",
      explanation: {
        body: "Listen to longer announcements and instructions and answer. Pay attention to the details: times, places and actions.",
        examples: [
          { en: "The meeting has been moved to Friday." },
          { en: "Please turn off your phones." }
        ]
      },
      exercises: [
        { type: "listening", text: "The flight to London has been delayed by one hour.", "audio": "assets/audio/app/b1_a71685cffe.mp3", question: "What happened to the flight to London?",
          options: ["It was cancelled because of the storm","It left early","It was delayed by an hour"], correctIndex: 2 },
        { type: "listening", text: "Please remember to bring your passport tomorrow.", "audio": "assets/audio/app/b1_b188e315b5.mp3", question: "What must you remember?",
          options: ["To bring money","To bring your passport","To arrive late"], correctIndex: 1 },
        { type: "listening", text: "The meeting has been moved to Friday morning.", "audio": "assets/audio/app/b1_022f548bed.mp3", question: "When is the meeting now?",
          options: ["Friday morning","Monday afternoon","Thursday evening"], correctIndex: 0 },
        { type: "listening", text: "Could you call me back later, please?", "audio": "assets/audio/app/b1_5caaccb985.mp3", question: "Write what you heard:",
          answers: ["could you call me back later please"], explanation: "Could you call me back later, please?" },
        { type: "true_false", statement: "In the previous audio, the speaker asked you to call back later.", answer: true, explanation: "Yes: \"Could you call me back later, please?\"" },
        { type: "listening", text: "Tickets are available online from Monday.", "audio": "assets/audio/app/b1_37bb865102.mp3", question: "Since when have tickets been available online?",
          options: ["Since Monday","Since Friday","Only at the box office"], correctIndex: 0 }
      ]
    }
  };

  var ORDER = [
    "act-a1-daily-routine", "act-a1-food", "act-a1-time", "lis-a1-everyday",
    "act-a2-travel", "act-a2-shopping", "act-a2-family", "lis-a2-plans",
    "act-b1-work", "act-b1-tech", "lis-b1-news", "act-b2-opinion"
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
