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
          text: "Excuse me, is there a supermarket near here? — Yes, there's one next to the park, just two minutes away.", "audio": "assets/audio/app/a1_623c0f53db.mp3",
          question: "Where is the supermarket?", options: ["next to the park", "inside the school", "far away"], correctIndex: 0, explanation: "\"...next to the park...\"" },
        { type: "listening",
          text: "The library is open from nine to five, Monday to Friday.", "audio": "assets/audio/app/a1_491446f65f.mp3",
          question: "When does the library close?", options: ["at nine", "on Sunday", "at five"], correctIndex: 2, explanation: "\"...from nine to five...\": cierra a las cinco." },
        { type: "true_false", statement: "There is a supermarket near the park.", answer: true, explanation: "\"...there's one next to the park...\"" },
        { type: "multiple_choice", question: "How far is the supermarket?", options: ["two hours", "two minutes", "two days"], correctIndex: 1, explanation: "\"...just two minutes away.\"" }
      ]
    },

    /* ===================== A2 · LOS TRABAJOS ===================== */

    "lvl-a2-vocab-jobs": {
      lessonId: "lvl-a2-vocab-jobs", level: "A2", track: "Expresiones", topic: "social", skill: "use", tipo: "aprende", title: "Pedir y ofrecer ayuda", rev: 2, xpReward: 42, mascotState: "explaining",
      explanation: {
        body: "Episodio 10 · La señora Park llega con muchas bolsas y Sam le ofrece ayuda. Más tarde, Sam necesita a Mia en la cocina. Aprende a pedir y ofrecer ayuda. Pedir ayuda: Can you help me, please? / Could you + verbo? (más cortés) / Can you give me a hand? Ofrecer ayuda: Can I help you? / Do you need a hand? / Shall I + verbo? (Shall I carry that?) / I'll + verbo. Responder: Yes, please. That's very kind of you. / No, thanks. I'm fine.",
        examples: [
          { en: "Good morning, Mrs Park! Do you need a hand?", es: "¡Buenos días, señora Park! ¿Necesita ayuda?" },
          { en: "Oh yes, please. These bags are very heavy.", es: "Ay, sí, por favor. Estas bolsas pesan mucho." },
          { en: "Shall I carry them upstairs for you?", es: "¿Se las subo?" },
          { en: "That's very kind of you, Sam. Thank you!", es: "Es muy amable de tu parte, Sam. ¡Gracias!" }
        ],
        sections: [
          { kind: "intro", body: "Episodio 10 · La señora Park llega con muchas bolsas y Sam le ofrece ayuda. Más tarde, Sam necesita a Mia en la cocina. Aprende a pedir y ofrecer ayuda." },
          {
            kind: "regla",
            body: "Pedir ayuda: Can you help me, please? / Could you + verbo? (más cortés) / Can you give me a hand? Ofrecer ayuda: Can I help you? / Do you need a hand? / Shall I + verbo? (Shall I carry that?) / I'll + verbo. Responder: Yes, please. That's very kind of you. / No, thanks. I'm fine."
          },
          {
            kind: "vocab",
            items: [
              { en: "help", ipa: "help", es: "ayudar" },
              { en: "need", ipa: "niːd", es: "necesitar" },
              { en: "carry", ipa: "ˈkæri", es: "cargar" },
              { en: "lift", ipa: "lɪft", es: "levantar" },
              { en: "kind", ipa: "kaɪnd", es: "amable" },
              { en: "upstairs", ipa: "ˌʌpˈsteəz", es: "arriba (en otro piso)" },
              { en: "recipe", ipa: "ˈresəpi", es: "receta" },
              { en: "give someone a hand", es: "echarle una mano a alguien" }
            ]
          },
          {
            kind: "expresiones",
            items: [
              { en: "Do you need a hand?", es: "¿Necesitas ayuda?" },
              { en: "Shall I carry that for you?", es: "¿Te lo llevo?" },
              { en: "Could you help me with...?", es: "¿Me podrías ayudar con...?" },
              { en: "That's very kind of you.", es: "Es muy amable de tu parte." }
            ]
          },
          {
            kind: "ejemplos",
            items: [
              { en: "Sam: Good morning, Mrs Park! Do you need a hand?", es: "Sam: ¡Buenos días, señora Park! ¿Necesita ayuda?" },
              { en: "Mrs Park: Oh yes, please. These bags are very heavy.", es: "Sra. Park: Ay, sí, por favor. Estas bolsas pesan mucho." },
              { en: "Sam: Shall I carry them upstairs for you?", es: "Sam: ¿Se las subo?" },
              { en: "Mrs Park: That's very kind of you, Sam. Thank you!", es: "Sra. Park: Es muy amable de tu parte, Sam. ¡Gracias!" }
            ]
          },
          {
            kind: "errores",
            items: [
              { no: "Shall I to carry it?", si: "Shall I carry it?", pq: "Shall I + verbo sin to." },
              { no: "Do you need hand?", si: "Do you need a hand?", pq: "La expresión es need / give a hand." },
              { no: "You can help me?", si: "Can you help me?", pq: "En preguntas, can va primero." }
            ]
          },
          { kind: "resumen", body: "Pedir: Can / Could you help me? · Can you give me a hand? Ofrecer: Can I help you? · Do you need a hand? · Shall I...? · I'll... Responder: Yes, please / No, thanks." },
          { kind: "puente", body: "Ofrece y pide ayuda como Sam y la señora Park." }
        ]
      },
      exercises: [
        {
          type: "matching", instruction: "Une cada pregunta con la respuesta lógica.",
          pairs: [
            { l: "Can I help you? (en una tienda)", r: "No, thanks. I'm just looking." },
            { l: "Could you pass the salt, please?", r: "Here you are." },
            { l: "Shall I open the window?", r: "Yes, please. It's hot in here." },
            { l: "Could you help me with this recipe?", r: "Sure. What do you need?" }
          ]
        },
        {
          type: "listening", text: "Excuse me, could you help me? I can't find the train station.", question: "¿Qué necesita?",
          options: ["Encontrar la estación de tren", "Comprar un boleto", "Cargar su maleta"], correctIndex: 0
        },
        {
          type: "multiple_choice", question: "Ves a una persona con una maleta muy pesada. Dices:", options: ["Shall I carry that for you?", "Carry that for me!", "Do you carry that?"], correctIndex: 0,
          explanation: "Shall I...? sirve para ofrecer ayuda."
        },
        {
          type: "find_error",
          segments: [{ u: "Shall" }, " I ", { u: "to help" }, " you with ", { u: "the" }, " bags?"],
          correctIndex: 1, correction: "help", explanation: "Shall I + verbo sin to: Shall I help you?", question: "Encuentra el error"
        },
        { type: "fill_blank", sentence: "That's very ___ of you. Thank you!", answers: ["kind", "nice"], hint: "amable", explanation: "That's very kind of you." },
        {
          type: "categorize", instruction: "¿Pide ayuda u ofrece ayuda?",
          buckets: [{ id: "ask", label: "Pide ayuda" }, { id: "offer", label: "Ofrece ayuda" }],
          items: [
            { t: "Could you help me?", bucket: "ask" },
            { t: "Can you give me a hand?", bucket: "ask" },
            { t: "I need some help.", bucket: "ask" },
            { t: "Shall I do it?", bucket: "offer" },
            { t: "Do you need a hand?", bucket: "offer" },
            { t: "Can I help you?", bucket: "offer" }
          ]
        },
        { type: "speak", text: "Do you need a hand? Shall I carry that?", es: "¿Necesitas ayuda? ¿Te lo llevo?" },
        {
          type: "translate", prompt: "Traduce: \"¿Me podrías ayudar, por favor?\"",
          answers: ["could you help me please", "can you help me please", "could you help me", "can you help me"], explanation: "Could you help me, please?"
        }
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
          text: "Hi, I'm Sara. I work in a hospital. I help doctors and take care of patients. I usually work at night.", "audio": "assets/audio/app/a2_e7b669767a.mp3",
          question: "What is Sara's job?", options: ["she is a teacher", "she is a chef", "she is a nurse"], correctIndex: 2, explanation: "Ayuda a los médicos y cuida pacientes: es enfermera." },
        { type: "listening",
          text: "I love my job, but the hours are difficult because I often work at night.", "audio": "assets/audio/app/a2_c68f6b0e20.mp3",
          question: "Why does Sara find her job difficult?", options: ["the pay is low", "she works at night", "it is far from home"], correctIndex: 1, explanation: "\"...the hours are difficult because I often work at night.\"" },
        { type: "multiple_choice", question: "Where does Sara work?", options: ["in a hospital", "in a school", "in a restaurant"], correctIndex: 0, explanation: "\"I work in a hospital.\"" },
        { type: "true_false", statement: "Sara works during the day.", answer: false, explanation: "Trabaja de noche ('at night')." }
      ]
    },

    /* ================= B1 · DEPORTE Y TIEMPO LIBRE ================= */

    "lvl-b1-vocab-sport": {
      lessonId: "lvl-b1-vocab-sport", level: "B1", track: "Vocabulary", topic: "sport", skill: "vocab",
      title: "Topic: sport and free time", xpReward: 52, mascotState: "explaining",
      explanation: {
        body: "B1 vocabulary for sport and leisure, with the key collocations: play (ball and team sports), go (-ing activities) and do (other activities).",
        examples: [
          { en: "play football, go swimming, do yoga" },
          { en: "team, coach, match, gym" }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Match each word with its meaning.", pairs: [{"l":"gym","r":"a place to exercise with machines"},{"l":"team","r":"a group of players"},{"l":"coach","r":"a person who trains athletes"},{"l":"match","r":"a game between two teams"}] },
        { type: "categorize", instruction: "Which verb goes with it: play, go or do?", buckets: [
          { id: "p", label: "play" }, { id: "g", label: "go" }, { id: "d", label: "do" } ], items: [
          { t: "football", bucket: "p" }, { t: "swimming", bucket: "g" },
          { t: "yoga", bucket: "d" }, { t: "basketball", bucket: "p" },
          { t: "cycling", bucket: "g" }, { t: "gymnastics", bucket: "d" } ] },
        { type: "multiple_choice", question: "We ___ football every Saturday.", options: ["play", "go", "do"], correctIndex: 0, explanation: "Ball and team sports: 'play football'." },
        { type: "fill_blank", sentence: "I ___ swimming twice a week. (play / go / do)", answers: ["go"], hint: "-ing activities.", explanation: "With -ing activities: 'go swimming'." },
        { type: "translate", prompt: "Use the right verb (play / go / do): Tennis is her hobby every Saturday and Sunday. → She…", answers: ["she plays tennis at the weekend","she plays tennis on weekends","she plays tennis at weekends","she plays tennis every weekend","she plays tennis on the weekend","she plays tennis on saturdays and sundays","she plays tennis every saturday and sunday"], explanation: "She plays tennis at the weekend." }
      ]
    },

    "lvl-b1-listen-hobbies": {
      lessonId: "lvl-b1-listen-hobbies", level: "B1", track: "Listening", topic: "sport", skill: "listening",
      title: "Topic: hobbies and free time", xpReward: 54, mascotState: "explaining",
      explanation: {
        body: "B1 listening: someone talks about their hobby. Catch what it is, how often they do it, and the advantage and disadvantage they mention. Pay attention to frequency and nuance.",
        examples: [
          { en: "I'm really into rock climbing." },
          { en: "The only downside is the cost." }
        ]
      },
      exercises: [
        { type: "listening",
          text: "So, what do you do in your free time? — I'm really into rock climbing. I go to an indoor climbing centre twice a week, and once a month I climb outdoors if the weather is good.", "audio": "assets/audio/app/b1_28b1b56dc8.mp3",
          question: "What is the speaker's hobby?", options: ["swimming", "painting", "rock climbing"], correctIndex: 2, explanation: "\"I'm really into rock climbing.\"" },
        { type: "listening",
          text: "It keeps me fit, and I love the feeling of reaching the top. The only downside is that good equipment is quite expensive.", "audio": "assets/audio/app/b1_2c8852eaa1.mp3",
          question: "What does the speaker say is the only downside?", options: ["it is dangerous", "the equipment is expensive", "it takes too much time every single weekend"], correctIndex: 1, explanation: "\"The only downside is that good equipment is quite expensive.\"" },
        { type: "multiple_choice", question: "How often does the speaker climb indoors?", options: ["twice a week", "once a month", "every day"], correctIndex: 0, explanation: "\"...twice a week...\" at the indoor centre." },
        { type: "true_false", statement: "The speaker thinks the equipment is cheap.", answer: false, explanation: "The speaker says good equipment is 'quite expensive'." }
      ]
    },

    /* ============ B2 · GIG ECONOMY (reading + vocab) ============ */

    "lvl-b2-read-gig": {
      lessonId: "lvl-b2-read-gig", level: "B2", track: "TOEFL · Reading", topic: "work", skill: "reading",
      title: "Reading: the gig economy", xpReward: 62, mascotState: "explaining",
      explanation: {
        body: "A B2 reading about today's world of work. Identify the main idea, the arguments for and against, vocabulary in context and an inference. Distinguish what the text says from your own opinion.",
        examples: [
          { en: "short-term contracts and freelance work" },
          { en: "flexibility comes at a cost" }
        ]
      },
      exercises: [
        { type: "reading", title: "Working in the Gig Economy",
          passage: "The 'gig economy' refers to a labour market based on short-term contracts and freelance work rather than permanent jobs. Driven by digital platforms, it allows people to work as drivers, delivery riders or online freelancers whenever they choose.\n\nSupporters praise the flexibility: workers can set their own hours and combine several sources of income. For students, parents and people seeking extra cash, this freedom can be genuinely valuable.\n\nCritics, however, warn that flexibility often comes at the cost of security. Gig workers rarely receive paid holidays, sick pay or pensions, and their income can be unpredictable. As the sector grows, governments are under increasing pressure to decide whether these workers should be treated as employees or as independent contractors.",
          questions: [
            { q: "What is the passage mainly about?", options: ["how to start a delivery company", "why permanent jobs no longer exist", "how digital platforms make money", "the gig economy and its advantages and drawbacks"], correctIndex: 3, explanation: "It defines the gig economy and contrasts its advantages and drawbacks." },
            { q: "According to the passage, what do gig workers rarely receive?", options: ["any income at all", "paid holidays, sick pay or pensions", "access to digital platforms", "short-term contracts"], correctIndex: 1, explanation: "\"...rarely receive paid holidays, sick pay or pensions...\"" },
            { q: "In context, \"flexibility comes at the cost of security\" means flexibility...", options: ["has no disadvantages", "increases job security", "is gained by giving up security", "is always free"], correctIndex: 2, explanation: "You gain flexibility but lose security." },
            { q: "Why does the author mention students and parents?", options: ["as examples of people for whom flexibility can be valuable", "to explain how pensions work", "to criticise digital platforms", "to prove the gig economy is bad"], correctIndex: 0, explanation: "They are examples of people who value that flexibility (rhetorical function)." },
            { q: "What can be inferred about governments?", options: ["they have already solved the problem", "they want to ban digital platforms", "they ignore the gig economy", "they face growing pressure to regulate the status of gig workers"], correctIndex: 3, explanation: "\"...under increasing pressure to decide whether these workers should be treated as employees...\"" }
          ] },
        { type: "find_error", question: "Find the mistake.",
          segments: ["Gig workers ", { u: "rarely" }, " ", { u: "receives" }, " ", { u: "paid" }, " ", { u: "holidays" }, "."],
          correctIndex: 1, correction: "receive (workers = plural)",
          explanation: "The subject 'workers' is plural: the verb is 'receive', not 'receives'." },
        { type: "multiple_choice", question: "In the text, an \"independent contractor\" is someone who...", options: ["is a permanent employee with a long-term company contract", "works for themselves rather than as an employee", "owns a digital platform", "never gets paid"], correctIndex: 1, explanation: "An independent contractor works for themselves, not as an employee." },
        { type: "true_false", statement: "According to the passage, gig workers always have a predictable income.", answer: false, explanation: "\"...their income can be unpredictable.\"" },
        {
          type: "fill_blank", sentence: "Gig workers' income can be ___, so it is hard to plan ahead.", answers: ["unpredictable"], hint: "The opposite of 'predictable'.",
          explanation: "...their income can be unpredictable."
        },
        {
          type: "translate", prompt: "Rewrite using \"at the cost of\": \"Flexibility often means less security.\"",
          answers: ["flexibility often comes at the cost of security", "flexibility often comes at the cost of job security"], explanation: "Flexibility often comes at the cost of security."
        }
      ]
    },

    "lvl-b2-vocab-collocations": {
      lessonId: "lvl-b2-vocab-collocations", level: "B2", track: "TOEFL · Vocabulary", topic: "work", skill: "vocab",
      title: "Vocabulary: make / do collocations", xpReward: 60, mascotState: "explaining",
      explanation: {
        body: "Collocations are natural word combinations. At B2 you should master make vs do and phrases like meet a deadline or take responsibility.",
        examples: [
          { en: "make a decision / do research" },
          { en: "meet a deadline" }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Match the words that go together.", pairs: [
          { l: "make", r: "a decision" }, { l: "do", r: "research" },
          { l: "take", r: "responsibility" }, { l: "meet", r: "a deadline" }
        ] },
        { type: "categorize", instruction: "Does it go with 'make' or 'do'?", buckets: [
          { id: "m", label: "make" }, { id: "d", label: "do" } ], items: [
          { t: "a mistake", bucket: "m" }, { t: "homework", bucket: "d" },
          { t: "progress", bucket: "m" }, { t: "business", bucket: "d" },
          { t: "an effort", bucket: "m" }, { t: "harm", bucket: "d" } ] },
        { type: "multiple_choice", question: "We need to ___ a decision quickly.", options: ["make", "do", "take"], correctIndex: 0, explanation: "Collocation: 'make a decision'." },
        { type: "fill_blank", sentence: "I have to ___ a deadline on Friday. (finish on time)", answers: ["meet"], hint: "meet ___ deadline.", explanation: "'meet a deadline' = finish something on time." },
        { type: "translate", prompt: "Rewrite with 'make': I got the answer wrong; it was my error.", answers: ["i made a mistake","i made an error"], explanation: "I made a mistake." }
      ]
    },

    /* ===== C1 · INTELIGENCIA ARTIFICIAL (reading + vocab) ===== */

    "lvl-c1-read-ai": {
      lessonId: "lvl-c1-read-ai", level: "C1", track: "TOEFL · Reading", topic: "tech", skill: "reading",
      title: "Reading: artificial intelligence", xpReward: 70, mascotState: "explaining",
      explanation: {
        body: "A C1 reading about AI. Follow the writer's reasoning: capabilities, risks (bias, opacity) and the conclusion about transparency. Answer detail, purpose, vocabulary, inference and paraphrase questions. Find the exact evidence.",
        examples: [
          { en: "machine learning" },
          { en: "absorb and amplify biases" }
        ]
      },
      exercises: [
        { type: "reading", title: "The Promise and Peril of AI",
          passage: "Artificial intelligence has moved from science fiction into everyday life. Systems that recommend films, translate languages or detect diseases in medical scans now rely on machine learning, in which algorithms improve by analysing vast amounts of data.\n\nYet this power raises difficult questions. Because such systems learn from historical data, they can absorb and even amplify the biases contained in it; a hiring algorithm trained on past decisions may quietly reproduce old prejudices. Moreover, the most advanced models are so complex that even their designers cannot always explain why a particular decision was made.\n\nFor this reason, many researchers argue that progress in AI must be matched by progress in transparency and accountability. The challenge is not merely to build systems that work, but systems whose reasoning we can trust and, when necessary, contest.",
          questions: [
            { q: "What is the main purpose of the passage?", options: ["to argue that AI should be banned", "to explain how to program an algorithm", "to discuss both the power and the risks of AI", "to describe the history of science fiction"], correctIndex: 2, explanation: "It presents capabilities and risks, and argues for transparency." },
            { q: "According to the passage, how do machine-learning systems improve?", options: ["by following fixed rules", "by analysing vast amounts of data", "by copying science fiction", "by reducing their complexity"], correctIndex: 1, explanation: "\"...algorithms improve by analysing vast amounts of data.\"" },
            { q: "In context, \"amplify\" the biases means to...", options: ["measure the biases", "remove the biases", "hide the biases", "make the biases stronger"], correctIndex: 3, explanation: "'Amplify' = make bigger or stronger." },
            { q: "Why does the author mention a hiring algorithm?", options: ["to give an example of how AI can reproduce old prejudices", "to prove AI is always fair", "to recommend it to companies", "to explain how to get a job"], correctIndex: 0, explanation: "It illustrates how AI can reproduce past prejudices." },
            { q: "Which best paraphrases: \"systems whose reasoning we can trust and, when necessary, contest\"?", options: ["systems that cannot be understood", "systems we must obey without question", "systems whose decisions we can rely on and also challenge when needed", "systems that never make decisions"], correctIndex: 2, explanation: "Reliable systems that we can also question when necessary." }
          ] },
        { type: "find_error", question: "Find the mistake.",
          segments: ["The most advanced models are so complex that even their designers ", { u: "cannot" }, " always ", { u: "explains" }, " ", { u: "why" }, " a decision ", { u: "was made" }, "."],
          correctIndex: 1, correction: "explain (base form after 'cannot')",
          explanation: "After a modal like 'cannot' the verb is in the base form: 'explain'." },
        { type: "multiple_choice", question: "In the passage, \"accountability\" is closest in meaning to...", options: ["speed", "responsibility for one's actions", "the complexity of a modern computer system", "profit"], correctIndex: 1, explanation: "'Accountability' = being responsible for your actions and decisions." },
        { type: "true_false", statement: "According to the passage, designers can always explain every decision made by advanced AI models.", answer: false, explanation: "\"...cannot always explain why a particular decision was made.\"" },
        {
          type: "matching", instruction: "Match each word from the passage with its meaning.",
          pairs: [
            { l: "bias", r: "an unfair preference for or against something" },
            { l: "transparency", r: "being open so others can see how something works" },
            { l: "contest", r: "formally challenge a decision" },
            { l: "vast", r: "extremely large" }
          ]
        },
        {
          type: "fill_blank", sentence: "Progress in AI must be matched by progress in transparency and ___.", answers: ["accountability"], hint: "Responsibility for one's actions.",
          explanation: "...transparency and accountability."
        }
      ]
    },

    "lvl-c1-vocab-trends": {
      lessonId: "lvl-c1-vocab-trends", level: "C1", track: "TOEFL · Vocabulary", topic: "study", skill: "vocab",
      title: "Vocabulary: describing trends", xpReward: 66, mascotState: "explaining",
      explanation: {
        body: "To talk about data and graphs at C1 you need trend verbs: rise/soar (go up), fall/plummet (go down), fluctuate (go up and down), peak (reach the highest point). Notice the intensity and the direction.",
        examples: [
          { en: "Sales soared / plummeted." },
          { en: "Prices fluctuated all year." }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Match each verb with its meaning.", pairs: [{"l":"rise","r":"go up"},{"l":"decline","r":"go down gradually"},{"l":"fluctuate","r":"go up and down"},{"l":"peak","r":"reach the highest point"}] },
        { type: "categorize", instruction: "Does the trend go up, go down or have no clear direction?", buckets: [
          { id: "u", label: "Up" }, { id: "d", label: "Down" }, { id: "n", label: "No clear direction" } ], items: [
          { t: "soar", bucket: "u" }, { t: "plummet", bucket: "d" },
          { t: "fluctuate", bucket: "n" }, { t: "surge", bucket: "u" },
          { t: "drop", bucket: "d" }, { t: "remain stable", bucket: "n" } ] },
        { type: "multiple_choice", question: "Choose the strongest word for a big, fast increase: \"Prices ___ after the news.\"", options: ["soared", "edged up", "stayed the same"], correctIndex: 0, explanation: "'Soared' = rose very fast and very high." },
        { type: "fill_blank", sentence: "Sales reached a ___ in December and then fell. (highest point)", answers: ["peak"], hint: "The highest point.", explanation: "'reach a peak' = reach the highest point." },
        { type: "translate", prompt: "Describe the trend academically with 'steadily': Sales went up a little every month, without stopping.", answers: ["sales rose steadily","sales increased steadily","sales grew steadily","sales went up steadily"], explanation: "Sales rose steadily." }
      ]
    },

    /* ===== C2 · FILOSOFÍA DE LA FELICIDAD (reading + vocab) ===== */

    "lvl-c2-read-happiness": {
      lessonId: "lvl-c2-read-happiness", level: "C2", track: "TOEFL · Reading", topic: "study", skill: "reading",
      title: "Reading: the philosophy of happiness", xpReward: 78, mascotState: "explaining",
      explanation: {
        body: "A C2 reading about happiness. The writer distinguishes concepts (hedonia vs eudaimonia), presents evidence and qualifies the conclusion. Pay attention to fine distinctions and to distractors that exaggerate the text. Identify what is claimed and what is NOT.",
        examples: [
          { en: "the relentless pursuit of pleasure" },
          { en: "self-defeating" }
        ]
      },
      exercises: [
        { type: "reading", title: "What Makes a Good Life?",
          passage: "For centuries, philosophers have debated what it means to live a good life. The ancient Greeks distinguished between hedonia, the pleasure of feeling good, and eudaimonia, a deeper sense of flourishing that comes from living in accordance with one's values.\n\nModern psychology has revived this distinction. Studies suggest that the relentless pursuit of pleasure often proves self-defeating: the more people chase momentary happiness, the more elusive it becomes. By contrast, those who devote themselves to meaningful goals, even difficult ones, frequently report greater long-term satisfaction.\n\nThis does not mean that pleasure is worthless or that suffering is noble. Rather, it suggests that a life organised solely around feeling good may be less fulfilling than one that also makes room for purpose, connection and the occasional discomfort that growth requires.",
          questions: [
            { q: "What is the central idea of the passage?", options: ["pleasure should always be avoided", "happiness is impossible to achieve", "a meaningful life may be more fulfilling than one aimed only at pleasure", "the ancient Greeks were always right"], correctIndex: 2, explanation: "It distinguishes pleasure from meaning and suggests meaning brings more lasting satisfaction." },
            { q: "According to the passage, what is the difference between hedonia and eudaimonia?", options: ["they are exactly the same", "hedonia is feeling good; eudaimonia is flourishing through living by one's values", "hedonia is suffering; eudaimonia is pleasure", "both refer only to wealth"], correctIndex: 1, explanation: "Hedonia = pleasure; eudaimonia = flourishing by living according to one's values." },
            { q: "In context, \"self-defeating\" means the pursuit of pleasure...", options: ["is morally wrong", "always succeeds", "is very cheap", "undermines its own goal"], correctIndex: 3, explanation: "'Self-defeating' = counterproductive: it undermines its own goal." },
            { q: "What does the author concede in the final paragraph?", options: ["that pleasure is not worthless and suffering is not noble", "that growth never requires discomfort", "that purpose does not matter", "that pleasure is worthless"], correctIndex: 0, explanation: "A nuance: pleasure is not worthless and suffering is not noble." },
            { q: "Which can be inferred from the passage?", options: ["chasing momentary happiness guarantees it", "discomfort should always be avoided", "values are irrelevant to happiness", "meaning and purpose contribute to long-term satisfaction"], correctIndex: 3, explanation: "People who pursue meaningful goals report greater lasting satisfaction." }
          ] },
        { type: "find_error", question: "Find the mistake.",
          segments: ["The more people ", { u: "chase" }, " momentary happiness, the more ", { u: "elusive" }, " ", { u: "it" }, " ", { u: "become" }, "."],
          correctIndex: 3, correction: "becomes ('it' is singular)",
          explanation: "The subject 'it' is singular: the verb is 'becomes', not 'become'." },
        { type: "multiple_choice", question: "In the passage, \"elusive\" describes something that is...", options: ["easy to catch, see and hold onto at any time", "hard to achieve or grasp", "extremely cheap", "clearly visible"], correctIndex: 1, explanation: "'Elusive' = hard to find, catch or achieve." },
        { type: "true_false", statement: "The author claims that suffering is noble and pleasure is worthless.", answer: false, explanation: "The writer explicitly says the opposite: pleasure is not worthless and suffering is not noble." },
        {
          type: "matching", instruction: "Match each word from the passage with its meaning.",
          pairs: [
            { l: "flourishing", r: "growing and living well" },
            { l: "relentless", r: "continuous and never stopping" },
            { l: "noble", r: "morally good and admirable" },
            { l: "fulfilling", r: "making you feel satisfied and useful" }
          ]
        },
        {
          type: "translate",
          prompt: "Rewrite using \"the more ... the more\": \"As people chase happiness more, it becomes more elusive.\"",
          answers: ["the more people chase happiness the more elusive it becomes", "the more people chase happiness the more elusive happiness becomes"],
          explanation: "The more people chase happiness, the more elusive it becomes."
        }
      ]
    },

    "lvl-c2-vocab-nuance": {
      lessonId: "lvl-c2-vocab-nuance", level: "C2", track: "TOEFL · Vocabulary", topic: "study", skill: "vocab",
      title: "Vocabulary: nuance and connotation", xpReward: 74, mascotState: "explaining",
      explanation: {
        body: "At C2 nuance matters: two words can mean the same thing but have a positive or negative connotation (thrifty vs stingy). Master precise adjectives like meticulous, candid, ambivalent or pragmatic.",
        examples: [
          { en: "thrifty (positive) vs stingy (negative)" },
          { en: "a candid, pragmatic answer" }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Match each adjective with its definition.", pairs: [
          { l: "meticulous", r: "very careful and precise" },
          { l: "candid", r: "honest and direct" },
          { l: "ambivalent", r: "having mixed feelings" },
          { l: "pragmatic", r: "practical, realistic" }
        ] },
        { type: "categorize", instruction: "Positive or negative connotation?", buckets: [
          { id: "p", label: "Positive" }, { id: "n", label: "Negative" } ], items: [
          { t: "thrifty", bucket: "p" }, { t: "stingy", bucket: "n" },
          { t: "confident", bucket: "p" }, { t: "arrogant", bucket: "n" },
          { t: "curious", bucket: "p" }, { t: "nosy", bucket: "n" } ] },
        { type: "multiple_choice", question: "Someone who is ___ has mixed feelings about something.", options: ["ambivalent", "enthusiastic", "certain"], correctIndex: 0, explanation: "'Ambivalent' = having mixed feelings." },
        { type: "fill_blank", sentence: "She gave a ___ answer: honest and direct.", answers: ["candid", "frank"], hint: "Honest and direct.", explanation: "'candid / frank' = honest and direct." },
        { type: "translate", prompt: "Describe the approach with 'pragmatic': It's a practical, realistic way of dealing with the problem.", answers: ["it's a pragmatic approach","it is a pragmatic approach","it's a pragmatic way of dealing with the problem","it is a pragmatic way of dealing with the problem"], explanation: "It's a pragmatic approach." }
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
