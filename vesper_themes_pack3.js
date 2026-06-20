/* =====================================================================
 * VESPER · THEMES PACK 3  (continúa la expansión: básicos + avanzados)
 * ---------------------------------------------------------------------
 * Básicos (vocab + listening por tema):
 *   - A1: La ciudad y los lugares
 *   - A2: Los trabajos
 *   - B1: Deporte y tiempo libre
 * Avanzados (reading temático + vocabulario; con algún find_error):
 *   - B2: la "gig economy"      + colocaciones make/do
 *   - C1: inteligencia artificial + describir tendencias/datos
 *   - C2: la filosofía de la felicidad + matices y connotación
 *
 * Reutiliza los renderers de leccion.html: reading · listening ·
 * multiple_choice · fill_blank · true_false · matching · categorize ·
 * translate · find_error. Se fusiona via VESPER_THEMES_PACK3.merge();
 * la progresión por nivel la gestiona vesper_path.js.
 * ===================================================================== */
window.VESPER_THEMES_PACK3 = (function () {

  var L = {

    /* ===================== A1 · LA CIUDAD ===================== */

    "lvl-a1-vocab-city": {
      lessonId: "lvl-a1-vocab-city", level: "A1", track: "Vocabulario", topic: "city", skill: "vocab",
      title: "Tema: la ciudad y los lugares", xpReward: 32, mascotState: "explaining",
      explanation: {
        body: "Vocabulario A1 de lugares de la ciudad: parque, escuela, tienda, hospital. Aprende dónde haces cada cosa. (Asocia, clasifica y completa.)",
        examples: [
          { en: "I borrow books at the library.", es: "Saco libros en la biblioteca." },
          { en: "park, school, shop, hospital", es: "parque, escuela, tienda, hospital" }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Une la palabra con su traducción.", pairs: [
          { l: "park", r: "parque" }, { l: "school", r: "escuela" },
          { l: "shop", r: "tienda" }, { l: "hospital", r: "hospital" }
        ] },
        { type: "categorize", instruction: "¿Es un lugar cerrado o al aire libre?", buckets: [
          { id: "in", label: "Indoor" }, { id: "out", label: "Outdoor" } ], items: [
          { t: "school", bucket: "in" }, { t: "park", bucket: "out" },
          { t: "shop", bucket: "in" }, { t: "playground", bucket: "out" },
          { t: "library", bucket: "in" }, { t: "beach", bucket: "out" } ] },
        { type: "multiple_choice", question: "Where do you borrow books?", options: ["park", "library", "shop"], correctIndex: 1, explanation: "Se sacan libros en la biblioteca (library)." },
        { type: "fill_blank", sentence: "I buy bread at the ___.", answers: ["shop", "supermarket", "bakery"], hint: "Donde compras cosas.", explanation: "shop/supermarket = tienda/supermercado." },
        { type: "translate", prompt: "Traduce: \"El parque está cerca de la escuela.\"", answers: ["the park is near the school"], explanation: "The park is near the school." }
      ]
    },

    "lvl-a1-listen-city": {
      lessonId: "lvl-a1-listen-city", level: "A1", track: "Listening", topic: "city", skill: "listening",
      title: "Tema: por la ciudad", xpReward: 34, mascotState: "explaining",
      explanation: {
        body: "Escucha A1: alguien pregunta por lugares de la ciudad. Reproduce el audio y descubre dónde están y cuándo abren. (Escucha el lugar y la hora.)",
        examples: [
          { en: "Is there a supermarket near here?", es: "¿Hay un supermercado cerca?" },
          { en: "It's open from nine to five.", es: "Abre de nueve a cinco." }
        ]
      },
      exercises: [
        { type: "listening",
          text: "Excuse me, is there a supermarket near here? — Yes, there's one next to the park, just two minutes away.",
          question: "Where is the supermarket?", options: ["next to the park", "inside the school", "far away"], correctIndex: 0, explanation: "\"...next to the park...\"" },
        { type: "listening",
          text: "The library is open from nine to five, Monday to Friday.",
          question: "When does the library close?", options: ["at nine", "at five", "on Sunday"], correctIndex: 1, explanation: "\"...from nine to five...\": cierra a las cinco." },
        { type: "true_false", statement: "There is a supermarket near the park.", answer: true, explanation: "\"...there's one next to the park...\"" },
        { type: "multiple_choice", question: "How far is the supermarket?", options: ["two minutes", "two hours", "two days"], correctIndex: 0, explanation: "\"...just two minutes away.\"" }
      ]
    },

    /* ===================== A2 · LOS TRABAJOS ===================== */

    "lvl-a2-vocab-jobs": {
      lessonId: "lvl-a2-vocab-jobs", level: "A2", track: "Vocabulario", topic: "work", skill: "vocab",
      title: "Tema: los trabajos", xpReward: 42, mascotState: "explaining",
      explanation: {
        body: "Vocabulario A2 de profesiones. Aprende nombres de trabajos y dónde se realizan. (Asocia, clasifica y traduce.)",
        examples: [
          { en: "My brother is a teacher.", es: "Mi hermano es profesor." },
          { en: "teacher, nurse, chef, driver", es: "profesor, enfermero, cocinero, conductor" }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Une el trabajo con su traducción.", pairs: [
          { l: "teacher", r: "profesor" }, { l: "nurse", r: "enfermero" },
          { l: "chef", r: "cocinero" }, { l: "driver", r: "conductor" }
        ] },
        { type: "categorize", instruction: "¿Trabaja normalmente dentro o fuera?", buckets: [
          { id: "in", label: "Works indoors" }, { id: "out", label: "Works outdoors" } ], items: [
          { t: "teacher", bucket: "in" }, { t: "farmer", bucket: "out" },
          { t: "nurse", bucket: "in" }, { t: "builder", bucket: "out" },
          { t: "waiter", bucket: "in" }, { t: "gardener", bucket: "out" } ] },
        { type: "multiple_choice", question: "A person who cooks in a restaurant is a ___.", options: ["chef", "doctor", "pilot"], correctIndex: 0, explanation: "chef = cocinero." },
        { type: "fill_blank", sentence: "A ___ helps sick people in a hospital.", answers: ["nurse", "doctor"], hint: "Trabaja en el hospital.", explanation: "nurse/doctor = enfermero/médico." },
        { type: "translate", prompt: "Traduce: \"Mi hermana es médica.\"", answers: ["my sister is a doctor"], explanation: "My sister is a doctor." }
      ]
    },

    "lvl-a2-listen-jobs": {
      lessonId: "lvl-a2-listen-jobs", level: "A2", track: "Listening", topic: "work", skill: "listening",
      title: "Tema: hablar del trabajo", xpReward: 44, mascotState: "explaining",
      explanation: {
        body: "Escucha A2: alguien habla de su trabajo y su horario. Capta qué hace, dónde y cuándo. (Atiende a la profesión y al horario.)",
        examples: [
          { en: "I work in a hospital.", es: "Trabajo en un hospital." },
          { en: "I usually work at night.", es: "Suelo trabajar de noche." }
        ]
      },
      exercises: [
        { type: "listening",
          text: "Hi, I'm Sara. I work in a hospital. I help doctors and take care of patients. I usually work at night.",
          question: "What is Sara's job?", options: ["she is a teacher", "she is a nurse", "she is a chef"], correctIndex: 1, explanation: "Ayuda a los médicos y cuida pacientes: es enfermera." },
        { type: "listening",
          text: "I love my job, but the hours are difficult because I often work at night.",
          question: "Why does Sara find her job difficult?", options: ["the pay is low", "she works at night", "it is far from home"], correctIndex: 1, explanation: "\"...the hours are difficult because I often work at night.\"" },
        { type: "multiple_choice", question: "Where does Sara work?", options: ["in a school", "in a hospital", "in a restaurant"], correctIndex: 1, explanation: "\"I work in a hospital.\"" },
        { type: "true_false", statement: "Sara works during the day.", answer: false, explanation: "Trabaja de noche ('at night')." }
      ]
    },

    /* ================= B1 · DEPORTE Y TIEMPO LIBRE ================= */

    "lvl-b1-vocab-sport": {
      lessonId: "lvl-b1-vocab-sport", level: "B1", track: "Vocabulario", topic: "sport", skill: "vocab",
      title: "Tema: deporte y tiempo libre", xpReward: 52, mascotState: "explaining",
      explanation: {
        body: "Vocabulario B1 de deporte y ocio, con las colocaciones clave: play (deportes con pelota/equipo), go (actividades en -ing) y do (otras actividades). (Asocia, clasifica y traduce.)",
        examples: [
          { en: "play football, go swimming, do yoga", es: "jugar al fútbol, ir a nadar, hacer yoga" },
          { en: "team, coach, match, gym", es: "equipo, entrenador, partido, gimnasio" }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Une la palabra con su traducción.", pairs: [
          { l: "gym", r: "gimnasio" }, { l: "team", r: "equipo" },
          { l: "coach", r: "entrenador" }, { l: "match", r: "partido" }
        ] },
        { type: "categorize", instruction: "¿Qué verbo lo acompaña: play, go o do?", buckets: [
          { id: "p", label: "play" }, { id: "g", label: "go" }, { id: "d", label: "do" } ], items: [
          { t: "football", bucket: "p" }, { t: "swimming", bucket: "g" },
          { t: "yoga", bucket: "d" }, { t: "basketball", bucket: "p" },
          { t: "cycling", bucket: "g" }, { t: "gymnastics", bucket: "d" } ] },
        { type: "multiple_choice", question: "We ___ football every Saturday.", options: ["play", "go", "do"], correctIndex: 0, explanation: "Deportes con pelota/equipo: 'play football'." },
        { type: "fill_blank", sentence: "I ___ swimming twice a week. (play / go / do)", answers: ["go"], hint: "Actividades en -ing.", explanation: "Con actividades en -ing: 'go swimming'." },
        { type: "translate", prompt: "Traduce: \"Ella juega al tenis los fines de semana.\"", answers: ["she plays tennis at the weekend", "she plays tennis on weekends", "she plays tennis at weekends"], explanation: "She plays tennis at the weekend." }
      ]
    },

    "lvl-b1-listen-hobbies": {
      lessonId: "lvl-b1-listen-hobbies", level: "B1", track: "Listening", topic: "sport", skill: "listening",
      title: "Tema: aficiones y tiempo libre", xpReward: 54, mascotState: "explaining",
      explanation: {
        body: "Escucha B1: alguien habla de su afición. Capta cuál es, con qué frecuencia la practica y qué ventaja e inconveniente menciona. (Atiende a la frecuencia y a los matices.)",
        examples: [
          { en: "I'm really into rock climbing.", es: "Me encanta la escalada." },
          { en: "The only downside is the cost.", es: "El único inconveniente es el coste." }
        ]
      },
      exercises: [
        { type: "listening",
          text: "So, what do you do in your free time? — I'm really into rock climbing. I go to an indoor climbing centre twice a week, and once a month I climb outdoors if the weather is good.",
          question: "What is the speaker's hobby?", options: ["swimming", "rock climbing", "painting"], correctIndex: 1, explanation: "\"I'm really into rock climbing.\"" },
        { type: "listening",
          text: "It keeps me fit, and I love the feeling of reaching the top. The only downside is that good equipment is quite expensive.",
          question: "What does the speaker say is the only downside?", options: ["it is dangerous", "the equipment is expensive", "it takes too much time"], correctIndex: 1, explanation: "\"The only downside is that good equipment is quite expensive.\"" },
        { type: "multiple_choice", question: "How often does the speaker climb indoors?", options: ["once a month", "twice a week", "every day"], correctIndex: 1, explanation: "\"...twice a week...\" en el centro cubierto." },
        { type: "true_false", statement: "The speaker thinks the equipment is cheap.", answer: false, explanation: "Dice que el buen equipo es bastante caro ('quite expensive')." }
      ]
    },

    /* ============ B2 · GIG ECONOMY (reading + vocab) ============ */

    "lvl-b2-read-gig": {
      lessonId: "lvl-b2-read-gig", level: "B2", track: "TOEFL · Reading", topic: "work", skill: "reading",
      title: "Reading: the gig economy", xpReward: 62, mascotState: "explaining",
      explanation: {
        body: "Lectura B2 sobre el mundo laboral actual. Identifica la idea principal, los argumentos a favor y en contra, el vocabulario en contexto y una inferencia. (Distingue lo que dice el texto de tu opinión.)",
        examples: [
          { en: "short-term contracts and freelance work", es: "contratos temporales y trabajo autónomo" },
          { en: "flexibility comes at a cost", es: "la flexibilidad tiene un precio" }
        ]
      },
      exercises: [
        { type: "reading", title: "Working in the Gig Economy",
          passage: "The 'gig economy' refers to a labour market based on short-term contracts and freelance work rather than permanent jobs. Driven by digital platforms, it allows people to work as drivers, delivery riders or online freelancers whenever they choose.\n\nSupporters praise the flexibility: workers can set their own hours and combine several sources of income. For students, parents and people seeking extra cash, this freedom can be genuinely valuable.\n\nCritics, however, warn that flexibility often comes at the cost of security. Gig workers rarely receive paid holidays, sick pay or pensions, and their income can be unpredictable. As the sector grows, governments are under increasing pressure to decide whether these workers should be treated as employees or as independent contractors.",
          questions: [
            { q: "What is the passage mainly about?", options: ["how to start a delivery company", "the gig economy and its advantages and drawbacks", "why permanent jobs no longer exist", "how digital platforms make money"], correctIndex: 1, explanation: "Define la gig economy y contrasta ventajas e inconvenientes." },
            { q: "According to the passage, what do gig workers rarely receive?", options: ["any income at all", "paid holidays, sick pay or pensions", "access to digital platforms", "short-term contracts"], correctIndex: 1, explanation: "\"...rarely receive paid holidays, sick pay or pensions...\"" },
            { q: "In context, \"flexibility comes at the cost of security\" means flexibility...", options: ["is always free", "is gained by giving up security", "increases job security", "has no disadvantages"], correctIndex: 1, explanation: "Se gana flexibilidad pero se pierde seguridad." },
            { q: "Why does the author mention students and parents?", options: ["to prove the gig economy is bad", "as examples of people for whom flexibility can be valuable", "to criticise digital platforms", "to explain how pensions work"], correctIndex: 1, explanation: "Son ejemplos de quienes valoran esa flexibilidad (función retórica)." },
            { q: "What can be inferred about governments?", options: ["they ignore the gig economy", "they face growing pressure to regulate the status of gig workers", "they have already solved the problem", "they want to ban digital platforms"], correctIndex: 1, explanation: "\"...under increasing pressure to decide whether these workers should be treated as employees...\"" }
          ] },
        { type: "find_error", question: "Encuentra el error.",
          segments: ["Gig workers ", { u: "rarely" }, " ", { u: "receives" }, " ", { u: "paid" }, " ", { u: "holidays" }, "."],
          correctIndex: 1, correction: "receive (workers = plural)",
          explanation: "El sujeto 'workers' es plural: el verbo es 'receive', no 'receives'." },
        { type: "multiple_choice", question: "In the text, an \"independent contractor\" is someone who...", options: ["is a permanent employee", "works for themselves rather than as an employee", "owns a digital platform", "never gets paid"], correctIndex: 1, explanation: "Un autónomo/contratista independiente trabaja por su cuenta, no como empleado." },
        { type: "true_false", statement: "According to the passage, gig workers always have a predictable income.", answer: false, explanation: "\"...their income can be unpredictable.\"" }
      ]
    },

    "lvl-b2-vocab-collocations": {
      lessonId: "lvl-b2-vocab-collocations", level: "B2", track: "TOEFL · Vocabulary", topic: "work", skill: "vocab",
      title: "Vocabulary: colocaciones make / do", xpReward: 60, mascotState: "explaining",
      explanation: {
        body: "Las colocaciones son combinaciones naturales de palabras. En B2 conviene dominar make vs do y verbos como meet a deadline o take responsibility. (Asocia, clasifica y completa con la palabra exacta.)",
        examples: [
          { en: "make a decision / do research", es: "tomar una decisión / hacer investigación" },
          { en: "meet a deadline", es: "cumplir un plazo" }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Une las palabras que van juntas.", pairs: [
          { l: "make", r: "a decision" }, { l: "do", r: "research" },
          { l: "take", r: "responsibility" }, { l: "meet", r: "a deadline" }
        ] },
        { type: "categorize", instruction: "¿Va con 'make' o con 'do'?", buckets: [
          { id: "m", label: "make" }, { id: "d", label: "do" } ], items: [
          { t: "a mistake", bucket: "m" }, { t: "homework", bucket: "d" },
          { t: "progress", bucket: "m" }, { t: "business", bucket: "d" },
          { t: "an effort", bucket: "m" }, { t: "harm", bucket: "d" } ] },
        { type: "multiple_choice", question: "We need to ___ a decision quickly.", options: ["make", "do", "take"], correctIndex: 0, explanation: "Colocación: 'make a decision'." },
        { type: "fill_blank", sentence: "I have to ___ a deadline on Friday. (cumplir)", answers: ["meet"], hint: "meet ___ deadline.", explanation: "'meet a deadline' = cumplir un plazo." },
        { type: "translate", prompt: "Traduce: \"Cometí un error.\"", answers: ["i made a mistake"], explanation: "I made a mistake." }
      ]
    },

    /* ===== C1 · INTELIGENCIA ARTIFICIAL (reading + vocab) ===== */

    "lvl-c1-read-ai": {
      lessonId: "lvl-c1-read-ai", level: "C1", track: "TOEFL · Reading", topic: "tech", skill: "reading",
      title: "Reading: artificial intelligence", xpReward: 70, mascotState: "explaining",
      explanation: {
        body: "Lectura C1 sobre IA. Atiende al razonamiento del autor: capacidades, riesgos (sesgos, opacidad) y la conclusión sobre transparencia. Resuelve preguntas de detalle, propósito, vocabulario, inferencia y paráfrasis. (Localiza la evidencia exacta.)",
        examples: [
          { en: "machine learning", es: "aprendizaje automático" },
          { en: "absorb and amplify biases", es: "absorber y amplificar sesgos" }
        ]
      },
      exercises: [
        { type: "reading", title: "The Promise and Peril of AI",
          passage: "Artificial intelligence has moved from science fiction into everyday life. Systems that recommend films, translate languages or detect diseases in medical scans now rely on machine learning, in which algorithms improve by analysing vast amounts of data.\n\nYet this power raises difficult questions. Because such systems learn from historical data, they can absorb and even amplify the biases contained in it; a hiring algorithm trained on past decisions may quietly reproduce old prejudices. Moreover, the most advanced models are so complex that even their designers cannot always explain why a particular decision was made.\n\nFor this reason, many researchers argue that progress in AI must be matched by progress in transparency and accountability. The challenge is not merely to build systems that work, but systems whose reasoning we can trust and, when necessary, contest.",
          questions: [
            { q: "What is the main purpose of the passage?", options: ["to explain how to program an algorithm", "to discuss both the power and the risks of AI", "to argue that AI should be banned", "to describe the history of science fiction"], correctIndex: 1, explanation: "Presenta capacidades y riesgos, y aboga por transparencia." },
            { q: "According to the passage, how do machine-learning systems improve?", options: ["by following fixed rules", "by analysing vast amounts of data", "by copying science fiction", "by reducing their complexity"], correctIndex: 1, explanation: "\"...algorithms improve by analysing vast amounts of data.\"" },
            { q: "In context, \"amplify\" the biases means to...", options: ["remove the biases", "make the biases stronger", "hide the biases", "measure the biases"], correctIndex: 1, explanation: "'Amplify' = aumentar/intensificar." },
            { q: "Why does the author mention a hiring algorithm?", options: ["to recommend it to companies", "to give an example of how AI can reproduce old prejudices", "to prove AI is always fair", "to explain how to get a job"], correctIndex: 1, explanation: "Ejemplifica cómo la IA puede reproducir prejuicios pasados." },
            { q: "Which best paraphrases: \"systems whose reasoning we can trust and, when necessary, contest\"?", options: ["systems we must obey without question", "systems whose decisions we can rely on and also challenge when needed", "systems that never make decisions", "systems that cannot be understood"], correctIndex: 1, explanation: "Sistemas fiables que además podamos cuestionar cuando haga falta." }
          ] },
        { type: "find_error", question: "Encuentra el error.",
          segments: ["The most advanced models are so complex that even their designers ", { u: "cannot" }, " always ", { u: "explains" }, " ", { u: "why" }, " a decision ", { u: "was made" }, "."],
          correctIndex: 1, correction: "explain (tras 'cannot', forma base)",
          explanation: "Tras un modal como 'cannot' el verbo va en forma base: 'explain'." },
        { type: "multiple_choice", question: "In the passage, \"accountability\" is closest in meaning to...", options: ["speed", "responsibility for one's actions", "complexity", "profit"], correctIndex: 1, explanation: "'Accountability' = rendición de cuentas, responsabilidad." },
        { type: "true_false", statement: "According to the passage, designers can always explain every decision made by advanced AI models.", answer: false, explanation: "\"...cannot always explain why a particular decision was made.\"" }
      ]
    },

    "lvl-c1-vocab-trends": {
      lessonId: "lvl-c1-vocab-trends", level: "C1", track: "TOEFL · Vocabulary", topic: "study", skill: "vocab",
      title: "Vocabulary: describir tendencias", xpReward: 66, mascotState: "explaining",
      explanation: {
        body: "Para hablar de datos y gráficos en C1 necesitas verbos de tendencia: rise/soar (subir), fall/plummet (bajar), fluctuate (oscilar), peak (alcanzar un máximo). Distingue la intensidad y la dirección. (Asocia, clasifica y completa.)",
        examples: [
          { en: "Sales soared / plummeted.", es: "Las ventas se dispararon / se desplomaron." },
          { en: "Prices fluctuated all year.", es: "Los precios fluctuaron todo el año." }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Une el verbo con su traducción.", pairs: [
          { l: "rise", r: "subir" }, { l: "decline", r: "disminuir" },
          { l: "fluctuate", r: "fluctuar" }, { l: "peak", r: "alcanzar el máximo" }
        ] },
        { type: "categorize", instruction: "¿La tendencia sube, baja o no tiene dirección clara?", buckets: [
          { id: "u", label: "Up" }, { id: "d", label: "Down" }, { id: "n", label: "No clear direction" } ], items: [
          { t: "soar", bucket: "u" }, { t: "plummet", bucket: "d" },
          { t: "fluctuate", bucket: "n" }, { t: "surge", bucket: "u" },
          { t: "drop", bucket: "d" }, { t: "remain stable", bucket: "n" } ] },
        { type: "multiple_choice", question: "Choose the strongest word for a big, fast increase: \"Prices ___ after the news.\"", options: ["soared", "edged up", "stayed the same"], correctIndex: 0, explanation: "'Soared' = se dispararon (subida grande y rápida)." },
        { type: "fill_blank", sentence: "Sales reached a ___ in December and then fell. (máximo)", answers: ["peak"], hint: "El punto más alto.", explanation: "'reach a peak' = alcanzar el máximo." },
        { type: "translate", prompt: "Traduce (académico): \"Las ventas aumentaron de forma constante.\"", answers: ["sales rose steadily", "sales increased steadily"], explanation: "Sales rose steadily." }
      ]
    },

    /* ===== C2 · FILOSOFÍA DE LA FELICIDAD (reading + vocab) ===== */

    "lvl-c2-read-happiness": {
      lessonId: "lvl-c2-read-happiness", level: "C2", track: "TOEFL · Reading", topic: "study", skill: "reading",
      title: "Reading: the philosophy of happiness", xpReward: 78, mascotState: "explaining",
      explanation: {
        body: "Lectura C2 sobre la felicidad. El autor distingue conceptos (hedonia vs eudaimonia), presenta evidencia y matiza su conclusión. Atiende a las distinciones finas y a los distractores que exageran el texto. (Identifica qué afirma y qué NO.)",
        examples: [
          { en: "the relentless pursuit of pleasure", es: "la búsqueda incesante del placer" },
          { en: "self-defeating", es: "contraproducente" }
        ]
      },
      exercises: [
        { type: "reading", title: "What Makes a Good Life?",
          passage: "For centuries, philosophers have debated what it means to live a good life. The ancient Greeks distinguished between hedonia, the pleasure of feeling good, and eudaimonia, a deeper sense of flourishing that comes from living in accordance with one's values.\n\nModern psychology has revived this distinction. Studies suggest that the relentless pursuit of pleasure often proves self-defeating: the more people chase momentary happiness, the more elusive it becomes. By contrast, those who devote themselves to meaningful goals, even difficult ones, frequently report greater long-term satisfaction.\n\nThis does not mean that pleasure is worthless or that suffering is noble. Rather, it suggests that a life organised solely around feeling good may be less fulfilling than one that also makes room for purpose, connection and the occasional discomfort that growth requires.",
          questions: [
            { q: "What is the central idea of the passage?", options: ["pleasure should always be avoided", "a meaningful life may be more fulfilling than one aimed only at pleasure", "the ancient Greeks were always right", "happiness is impossible to achieve"], correctIndex: 1, explanation: "Distingue placer y sentido, y sugiere que el sentido aporta más satisfacción duradera." },
            { q: "According to the passage, what is the difference between hedonia and eudaimonia?", options: ["they are exactly the same", "hedonia is feeling good; eudaimonia is flourishing through living by one's values", "hedonia is suffering; eudaimonia is pleasure", "both refer only to wealth"], correctIndex: 1, explanation: "Hedonia = placer; eudaimonia = florecer viviendo conforme a los valores." },
            { q: "In context, \"self-defeating\" means the pursuit of pleasure...", options: ["always succeeds", "undermines its own goal", "is morally wrong", "is very cheap"], correctIndex: 1, explanation: "'Self-defeating' = contraproducente: socava su propio objetivo." },
            { q: "What does the author concede in the final paragraph?", options: ["that pleasure is worthless", "that pleasure is not worthless and suffering is not noble", "that growth never requires discomfort", "that purpose does not matter"], correctIndex: 1, explanation: "Matiza: ni el placer es inútil ni el sufrimiento es noble." },
            { q: "Which can be inferred from the passage?", options: ["chasing momentary happiness guarantees it", "meaning and purpose contribute to long-term satisfaction", "discomfort should always be avoided", "values are irrelevant to happiness"], correctIndex: 1, explanation: "Quienes persiguen metas con sentido reportan mayor satisfacción duradera." }
          ] },
        { type: "find_error", question: "Encuentra el error.",
          segments: ["The more people ", { u: "chase" }, " momentary happiness, the more ", { u: "elusive" }, " ", { u: "it" }, " ", { u: "become" }, "."],
          correctIndex: 3, correction: "becomes ('it' es singular)",
          explanation: "El sujeto 'it' es singular: el verbo es 'becomes', no 'become'." },
        { type: "multiple_choice", question: "In the passage, \"elusive\" describes something that is...", options: ["easy to catch", "hard to achieve or grasp", "extremely cheap", "clearly visible"], correctIndex: 1, explanation: "'Elusive' = esquivo, difícil de alcanzar." },
        { type: "true_false", statement: "The author claims that suffering is noble and pleasure is worthless.", answer: false, explanation: "Dice explícitamente lo contrario: ni el placer es inútil ni el sufrimiento es noble." }
      ]
    },

    "lvl-c2-vocab-nuance": {
      lessonId: "lvl-c2-vocab-nuance", level: "C2", track: "TOEFL · Vocabulary", topic: "study", skill: "vocab",
      title: "Vocabulary: matices y connotación", xpReward: 74, mascotState: "explaining",
      explanation: {
        body: "En C2 importa el matiz: dos palabras pueden significar lo mismo pero tener connotación positiva o negativa (thrifty vs stingy). Domina adjetivos precisos como meticulous, candid, ambivalent o pragmatic. (Asocia, clasifica por connotación y completa.)",
        examples: [
          { en: "thrifty (positive) vs stingy (negative)", es: "ahorrador (positivo) vs tacaño (negativo)" },
          { en: "a candid, pragmatic answer", es: "una respuesta sincera y pragmática" }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Une el adjetivo con su definición.", pairs: [
          { l: "meticulous", r: "very careful and precise" },
          { l: "candid", r: "honest and direct" },
          { l: "ambivalent", r: "having mixed feelings" },
          { l: "pragmatic", r: "practical, realistic" }
        ] },
        { type: "categorize", instruction: "¿Connotación positiva o negativa?", buckets: [
          { id: "p", label: "Positive" }, { id: "n", label: "Negative" } ], items: [
          { t: "thrifty", bucket: "p" }, { t: "stingy", bucket: "n" },
          { t: "confident", bucket: "p" }, { t: "arrogant", bucket: "n" },
          { t: "curious", bucket: "p" }, { t: "nosy", bucket: "n" } ] },
        { type: "multiple_choice", question: "Someone who is ___ has mixed feelings about something.", options: ["ambivalent", "enthusiastic", "certain"], correctIndex: 0, explanation: "'Ambivalent' = ambivalente, con sentimientos encontrados." },
        { type: "fill_blank", sentence: "She gave a ___ answer: honest and direct. (sincero)", answers: ["candid", "frank"], hint: "Honesto y directo.", explanation: "'candid/frank' = sincero, franco." },
        { type: "translate", prompt: "Traduce: \"Es un enfoque pragmático.\"", answers: ["it's a pragmatic approach", "it is a pragmatic approach"], explanation: "It's a pragmatic approach." }
      ]
    }

  };

  /* Orden de aparición dentro de cada mundo (se anexa al final de cada
     escalera de destreza; la progresión real la calcula vesper_path.js). */
  var ORDER = [
    /* A1 */ "lvl-a1-vocab-city", "lvl-a1-listen-city",
    /* A2 */ "lvl-a2-vocab-jobs", "lvl-a2-listen-jobs",
    /* B1 */ "lvl-b1-vocab-sport", "lvl-b1-listen-hobbies",
    /* B2 */ "lvl-b2-read-gig", "lvl-b2-vocab-collocations",
    /* C1 */ "lvl-c1-read-ai", "lvl-c1-vocab-trends",
    /* C2 */ "lvl-c2-read-happiness", "lvl-c2-vocab-nuance"
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
