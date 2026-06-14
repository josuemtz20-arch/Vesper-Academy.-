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
        { type: "listening", text: "I have lunch at noon.", question: "Que escuchaste?",
          options: ["I have lunch at noon.", "I had lunch at nine.", "I love lunch and moon."], correctIndex: 0 },
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
      lessonId: "act-a1-food", level: "A1", track: "Practica", topic: "dailylife", skill: "vocab",
      title: "Comida y restaurante", xpReward: 35, mascotState: "explaining",
      explanation: {
        body: "Para pedir usamos \"I'd like...\" (me gustaria) y \"Can I have...?\". Contamos comida con a/an y some. (Para pedir comida con cortesia se usa I'd like o Can I have.)",
        examples: [
          { en: "I'd like a coffee, please.", es: "Quisiera un cafe, por favor." },
          { en: "Can I have the menu?", es: "Me da el menu?" },
          { en: "We have some water.", es: "Tenemos un poco de agua." }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Une la comida con su traduccion.", pairs: [
          { l: "apple", r: "manzana" }, { l: "bread", r: "pan" },
          { l: "egg", r: "huevo" }, { l: "water", r: "agua" }
        ] },
        { type: "multiple_choice", question: "Polite order: \"___ a tea, please.\"", options: ["I want", "I'd like", "Give"], correctIndex: 1, explanation: "\"I'd like\" es la forma cortes." },
        { type: "fill_blank", sentence: "Can I ___ the bill, please?", answers: ["have"], hint: "Can I have...?", explanation: "\"Can I have the bill?\" = la cuenta, por favor." },
        { type: "true_false", statement: "\"The bill\" means \"la cuenta\" in a restaurant.", answer: true, explanation: "The bill / the check = la cuenta." },
        { type: "categorize", instruction: "Bebida o comida?", buckets: [
          { id: "drink", label: "Bebida" }, { id: "food", label: "Comida" }
        ], items: [
          { t: "coffee", bucket: "drink" }, { t: "juice", bucket: "drink" },
          { t: "sandwich", bucket: "food" }, { t: "salad", bucket: "food" }
        ] },
        { type: "listening", text: "Can I have the menu, please?", question: "Que pidio la persona?",
          options: ["El menu", "La cuenta", "Un cafe"], correctIndex: 0 },
        { type: "translate", prompt: "Traduce: \"Quisiera un cafe, por favor.\"",
          answers: ["i'd like a coffee please", "i would like a coffee please", "id like a coffee please"], explanation: "I'd like a coffee, please." }
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
        { type: "listening", text: "It's a quarter past seven.", question: "Que hora es?",
          options: ["7:15", "7:45", "6:15"], correctIndex: 0 },
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
        { type: "listening", text: "Your flight is delayed by two hours.", question: "Que pasa con el vuelo?",
          options: ["Esta retrasado dos horas", "Sale a tiempo", "Fue cancelado"], correctIndex: 0 },
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
        { type: "multiple_choice", question: "Ask the price: \"___ is it?\"", options: ["How many", "How much", "How long"], correctIndex: 1, explanation: "How much = cuanto (precio)." },
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
        { type: "listening", text: "My brother is tall and friendly.", question: "Como es el hermano?",
          options: ["Alto y amable", "Bajo y serio", "Alto y enojado"], correctIndex: 0 },
        { type: "translate", prompt: "Traduce: \"Tengo dos hermanas.\"",
          answers: ["i have got two sisters", "i have two sisters", "i've got two sisters"], explanation: "I have got two sisters." }
      ]
    },

    /* ---------------- B1 · Trabajo ---------------- */
    "act-b1-work": {
      lessonId: "act-b1-work", level: "B1", track: "Practica", topic: "business", skill: "use",
      title: "Trabajo y carrera", xpReward: 45, mascotState: "explaining",
      explanation: {
        body: "En contextos laborales: apply for a job, attend a meeting, meet a deadline, give feedback. Para experiencia usamos present perfect: I have worked here for three years. (Vocabulario y present perfect para experiencia laboral.)",
        examples: [
          { en: "I have worked here for three years.", es: "He trabajado aqui tres anos." },
          { en: "We need to meet the deadline.", es: "Necesitamos cumplir el plazo." },
          { en: "She applied for a new job.", es: "Ella solicito un nuevo empleo." }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Une la expresion con su significado.", pairs: [
          { l: "deadline", r: "fecha limite" }, { l: "meeting", r: "reunion" },
          { l: "salary", r: "salario" }, { l: "skills", r: "habilidades" }
        ] },
        { type: "fill_blank", sentence: "I have worked here ___ three years.", answers: ["for"], hint: "for + periodo de tiempo.", explanation: "for + duracion (three years)." },
        { type: "multiple_choice", question: "Choose: She has ___ for the manager position.", options: ["applied", "apply", "applying"], correctIndex: 0, explanation: "Present perfect: has + participio (applied)." },
        { type: "true_false", statement: "\"Meet a deadline\" means to finish on time.", answer: true, explanation: "Meet a deadline = cumplir el plazo." },
        { type: "listening", text: "We have a meeting at nine tomorrow.", question: "Cuando es la reunion?",
          options: ["Manana a las nueve", "Hoy a las nueve", "Manana a las cinco"], correctIndex: 0 },
        { type: "categorize", instruction: "Positivo o negativo en el trabajo?", buckets: [
          { id: "pos", label: "Positivo" }, { id: "neg", label: "Negativo" }
        ], items: [
          { t: "get a promotion", bucket: "pos" }, { t: "meet the deadline", bucket: "pos" },
          { t: "miss a deadline", bucket: "neg" }, { t: "get fired", bucket: "neg" }
        ] },
        { type: "translate", prompt: "Traduce: \"He trabajado aqui tres anos.\"",
          answers: ["i have worked here for three years", "i've worked here for three years"], explanation: "I have worked here for three years." }
      ]
    },

    /* ---------------- B1 · Tecnologia ---------------- */
    "act-b1-tech": {
      lessonId: "act-b1-tech", level: "B1", track: "Practica", topic: "tech", skill: "vocab",
      title: "Tecnologia e internet", xpReward: 44, mascotState: "explaining",
      explanation: {
        body: "Verbos de tecnologia: download, upload, install, update, log in. Usa used to para habitos del pasado: I used to use a flip phone. (Vocabulario tech y 'used to' para el pasado.)",
        examples: [
          { en: "I need to update the app.", es: "Necesito actualizar la app." },
          { en: "She uploaded the file.", es: "Ella subio el archivo." },
          { en: "We used to use maps on paper.", es: "Antes usabamos mapas en papel." }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Une el verbo con su accion.", pairs: [
          { l: "download", r: "descargar" }, { l: "upload", r: "subir" },
          { l: "install", r: "instalar" }, { l: "log in", r: "iniciar sesion" }
        ] },
        { type: "fill_blank", sentence: "I ___ to use a flip phone years ago.", answers: ["used"], hint: "used to + verbo = solia.", explanation: "used to = habito pasado." },
        { type: "multiple_choice", question: "Opposite of \"download\":", options: ["upload", "update", "unplug"], correctIndex: 0, explanation: "Upload = subir; download = descargar." },
        { type: "true_false", statement: "\"Update\" means to make software newer.", answer: true, explanation: "Update = actualizar a una version nueva." },
        { type: "listening", text: "Please update the app before you log in.", question: "Que debes hacer primero?",
          options: ["Actualizar la app", "Borrar la app", "Apagar el telefono"], correctIndex: 0 },
        { type: "categorize", instruction: "Hardware o software?", buckets: [
          { id: "hw", label: "Hardware" }, { id: "sw", label: "Software" }
        ], items: [
          { t: "keyboard", bucket: "hw" }, { t: "screen", bucket: "hw" },
          { t: "browser", bucket: "sw" }, { t: "operating system", bucket: "sw" }
        ] },
        { type: "translate", prompt: "Traduce: \"Necesito actualizar la app.\"",
          answers: ["i need to update the app", "i have to update the app"], explanation: "I need to update the app." }
      ]
    },

    /* ---------------- B2 · Conversacion y opinion ---------------- */
    "act-b2-opinion": {
      lessonId: "act-b2-opinion", level: "B2", track: "Practica", topic: "society", skill: "use",
      title: "Dar tu opinion", xpReward: 50, mascotState: "explaining",
      explanation: {
        body: "Para opinar con matices: \"I reckon...\", \"As far as I'm concerned...\", \"I'd argue that...\". Para acuerdo/desacuerdo: \"I see your point, but...\". (Conectores y expresiones para debatir con naturalidad.)",
        examples: [
          { en: "As far as I'm concerned, it's worth it.", es: "En lo que a mi respecta, vale la pena." },
          { en: "I see your point, but I disagree.", es: "Entiendo tu punto, pero no estoy de acuerdo." },
          { en: "I'd argue that it's too risky.", es: "Yo diria que es demasiado arriesgado." }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Une la expresion con su funcion.", pairs: [
          { l: "I reckon...", r: "dar opinion" }, { l: "On the other hand...", r: "contraste" },
          { l: "I totally agree", r: "acuerdo fuerte" }, { l: "I'm not so sure", r: "duda" }
        ] },
        { type: "fill_blank", sentence: "I see your ___, but I disagree.", answers: ["point"], hint: "see your point = entender tu punto.", explanation: "\"See your point\" = entender tu argumento." },
        { type: "multiple_choice", question: "Most formal way to introduce an opinion:", options: ["As far as I'm concerned", "I reckon", "I guess"], correctIndex: 0, explanation: "\"As far as I'm concerned\" es la mas formal." },
        { type: "true_false", statement: "\"On the other hand\" introduces a contrasting idea.", answer: true, explanation: "Introduce un contraste/otra perspectiva." },
        { type: "categorize", instruction: "Acuerdo o desacuerdo?", buckets: [
          { id: "agree", label: "Acuerdo" }, { id: "disagree", label: "Desacuerdo" }
        ], items: [
          { t: "I couldn't agree more", bucket: "agree" }, { t: "Absolutely", bucket: "agree" },
          { t: "I'm afraid I disagree", bucket: "disagree" }, { t: "That's not how I see it", bucket: "disagree" }
        ] },
        { type: "translate", prompt: "Traduce: \"Entiendo tu punto, pero no estoy de acuerdo.\"",
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
        { type: "listening", text: "My name is Anna.", question: "Que escuchaste?",
          options: ["My name is Anna.", "My game is honor.", "My name is Hannah."], correctIndex: 0 },
        { type: "listening", text: "I live in a small town.", question: "Donde vive?",
          options: ["En un pueblo pequeño", "En una ciudad grande", "En una granja"], correctIndex: 0 },
        { type: "listening", text: "She has two children.", question: "Cuantos hijos tiene?",
          options: ["Dos", "Tres", "Ninguno"], correctIndex: 0 },
        { type: "true_false", statement: "El audio decía: \"She has two children.\"", answer: true, explanation: "Asi es: two children = dos hijos." },
        { type: "listening", text: "I get up at six.", question: "Escribe lo que escuchaste:",
          answers: ["i get up at six"], explanation: "I get up at six." },
        { type: "listening", text: "Thank you very much.", question: "Que significa lo que oiste?",
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
        { type: "listening", text: "We are going to the beach on Saturday.", question: "Cuando van a la playa?",
          options: ["El sábado", "El domingo", "El viernes"], correctIndex: 0 },
        { type: "listening", text: "The train leaves at half past ten.", question: "A que hora sale el tren?",
          options: ["10:30", "10:15", "11:30"], correctIndex: 0 },
        { type: "listening", text: "Can you help me, please?", question: "Que escuchaste?",
          options: ["Can you help me, please?", "Can you call me, please?", "Can you tell me, please?"], correctIndex: 0 },
        { type: "listening", text: "I would like a table for two.", question: "Escribe lo que escuchaste:",
          answers: ["i would like a table for two", "i'd like a table for two"], explanation: "I would like a table for two." },
        { type: "true_false", statement: "El audio pedía una mesa para cuatro personas.", answer: false, explanation: "Era \"a table for two\" = para dos." },
        { type: "listening", text: "The museum is closed on Mondays.", question: "Cuando cierra el museo?",
          options: ["Los lunes", "Los domingos", "Nunca"], correctIndex: 0 }
      ]
    },

    /* ---------------- B1 · Listening ---------------- */
    "lis-b1-news": {
      lessonId: "lis-b1-news", level: "B1", track: "Listening", topic: "society", skill: "listening",
      title: "Escucha: anuncios e instrucciones", xpReward: 45, mascotState: "explaining",
      explanation: {
        body: "Escucha anuncios e instrucciones más largos y responde. Fíjate en los detalles: horas, lugares y acciones. (Comprensión auditiva nivel B1.)",
        examples: [
          { en: "The meeting has been moved to Friday.", es: "La reunión se cambió al viernes." },
          { en: "Please turn off your phones.", es: "Por favor, apaguen sus teléfonos." }
        ]
      },
      exercises: [
        { type: "listening", text: "The flight to London has been delayed by one hour.", question: "Que pasa con el vuelo a Londres?",
          options: ["Se retrasó una hora", "Fue cancelado", "Salió antes"], correctIndex: 0 },
        { type: "listening", text: "Please remember to bring your passport tomorrow.", question: "Que debes recordar?",
          options: ["Traer el pasaporte", "Traer dinero", "Llegar tarde"], correctIndex: 0 },
        { type: "listening", text: "The meeting has been moved to Friday morning.", question: "Cuando es la reunion ahora?",
          options: ["Viernes por la mañana", "Lunes por la tarde", "Jueves por la noche"], correctIndex: 0 },
        { type: "listening", text: "Could you call me back later, please?", question: "Escribe lo que escuchaste:",
          answers: ["could you call me back later please"], explanation: "Could you call me back later, please?" },
        { type: "true_false", statement: "El anuncio pedía apagar los teléfonos.", answer: false, explanation: "Ese ejemplo era de la explicación, no del audio anterior." },
        { type: "listening", text: "Tickets are available online from Monday.", question: "Desde cuando hay entradas online?",
          options: ["Desde el lunes", "Desde el viernes", "Solo en taquilla"], correctIndex: 0 }
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
