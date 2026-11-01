/* =====================================================================
 * VESPER · THEMES PACK 2  (más temas A1-B1 + listening temático B2-C2)
 * ---------------------------------------------------------------------
 * Continúa vesper_themes_pack.js con temas nuevos:
 *   - A1: La casa            (vocab + listening)
 *   - A2: Salud y el cuerpo  (vocab + listening)
 *   - B1: Tecnología y medios(vocab + listening)
 * y añade LISTENING TEMÁTICO para los niveles altos (más largo y con
 * preguntas de idea principal, detalle, actitud e inferencia):
 *   - B2: reunión de trabajo · informativo de noticias
 *   - C1: psicología (sesgos) · debate tecnología y sociedad
 *   - C2: ética (dilema del tranvía) · debate sobre ayuda al desarrollo
 *
 * El listening usa el renderer `listening` de leccion.html (voz/TTS; sin
 * archivos de audio). Se fusiona via VESPER_THEMES_PACK2.merge(); la
 * progresión por nivel la gestiona vesper_path.js.
 * ===================================================================== */
window.VESPER_THEMES_PACK2 = (function () {

  var L = {

    /* ========================= A1 · LA CASA ========================= */

    "lvl-a1-vocab-house": {
      lessonId: "lvl-a1-vocab-house", level: "A1", track: "Vocabulario", topic: "home", skill: "vocab",
      title: "Tema: la casa", xpReward: 32, mascotState: "explaining",
      explanation: {
        body: "Vocabulario A1 de la casa: las habitaciones y los muebles. Aprende dónde haces cada cosa (cocinar, dormir...). (Asocia, clasifica y completa.)",
        examples: [
          { en: "I sleep in the bedroom.", es: "Duermo en el dormitorio." },
          { en: "kitchen, bedroom, bathroom, garden", es: "cocina, dormitorio, baño, jardín" }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Une la palabra con su traducción.", pairs: [
          { l: "kitchen", r: "cocina" }, { l: "bedroom", r: "dormitorio" },
          { l: "bathroom", r: "baño" }, { l: "garden", r: "jardín" }
        ] },
        { type: "categorize", instruction: "¿Es una habitación o un mueble?", buckets: [
          { id: "r", label: "Room" }, { id: "f", label: "Furniture" } ], items: [
          { t: "kitchen", bucket: "r" }, { t: "bed", bucket: "f" },
          { t: "bathroom", bucket: "r" }, { t: "sofa", bucket: "f" },
          { t: "bedroom", bucket: "r" }, { t: "table", bucket: "f" } ] },
        { type: "multiple_choice", question: "Where do you cook?", options: ["bedroom", "kitchen", "bathroom"], correctIndex: 1, explanation: "Se cocina en la cocina (kitchen)." },
        { type: "fill_blank", sentence: "I sleep in the ___.", answers: ["bedroom"], hint: "La habitación para dormir.", explanation: "bedroom = dormitorio." },
        { type: "translate", prompt: "Traduce: \"Hay una mesa en la cocina.\"", answers: ["there is a table in the kitchen"], explanation: "There is a table in the kitchen." }
      ]
    },

    "lvl-a1-listen-house": {
      lessonId: "lvl-a1-listen-house", level: "A1", track: "Listening", topic: "home", skill: "listening",
      title: "Tema: visita a una casa", xpReward: 34, mascotState: "explaining",
      explanation: {
        body: "Escucha A1: alguien enseña su casa. Oirás las habitaciones y los muebles. Reproduce el audio y responde. (Escucha qué hay en cada sala.)",
        examples: [
          { en: "This is the living room.", es: "Este es el salón." },
          { en: "My favourite room is the kitchen.", es: "Mi habitación favorita es la cocina." }
        ]
      },
      exercises: [
        { type: "listening",
          text: "Welcome to my house! This is the living room. There is a big sofa and a television. My favourite room is the kitchen, because I love cooking.", "audio": "assets/audio/app/a1_218436c230.mp3",
          question: "What is the speaker's favourite room?", options: ["the bathroom", "the living room", "the kitchen"], correctIndex: 2, explanation: "\"My favourite room is the kitchen...\"" },
        { type: "listening",
          text: "There are two bedrooms upstairs and a small bathroom.", "audio": "assets/audio/app/a1_a50093c24f.mp3",
          question: "How many bedrooms are there?", options: ["two", "three", "one"], correctIndex: 0, explanation: "\"There are two bedrooms upstairs...\"" },
        { type: "true_false", statement: "There is a television in the living room.", answer: true, explanation: "\"There is a big sofa and a television.\"" },
        { type: "multiple_choice", question: "Why does the speaker like the kitchen?", options: ["because it is big", "because they love cooking", "because it has a sofa"], correctIndex: 1, explanation: "\"...because I love cooking.\"" }
      ]
    },

    /* ==================== A2 · SALUD Y EL CUERPO ==================== */

    "lvl-a2-vocab-health": {
      lessonId: "lvl-a2-vocab-health", level: "A2", track: "Expresiones", topic: "food", skill: "use", tipo: "aprende", title: "Quejarse con cortesía", rev: 2, xpReward: 42, mascotState: "explaining",
      explanation: {
        body: "Episodio 9 · ¡Sam consiguió el trabajo en Luigi's! Para celebrarlo, Mia y Sam cenan en otro restaurante, pero la sopa está fría y el plato no es el correcto. Aprende a quejarte sin ser grosero. Llama la atención: Excuse me... Explica el problema con suavidad: I'm sorry, but my soup is cold. / I think there's a mistake. I ordered the fish. Pide una solución: Could you bring me another one, please? Could you...? es más cortés que Can you...?",
        examples: [
          { en: "Excuse me. I'm sorry, but my soup is cold.", es: "Disculpe. Perdone, pero mi sopa está fría." },
          { en: "Oh, I'm very sorry. I'll bring you another one.", es: "Ay, lo siento mucho. Le traigo otra." },
          { en: "And I think there's a mistake. I ordered the fish, not the chicken.", es: "Y creo que hay un error. Pedí el pescado, no el pollo." },
          { en: "You're right. I'm so sorry about that.", es: "Tiene razón. Disculpe." }
        ],
        sections: [
          {
            kind: "intro",
            body: "Episodio 9 · ¡Sam consiguió el trabajo en Luigi's! Para celebrarlo, Mia y Sam cenan en otro restaurante, pero la sopa está fría y el plato no es el correcto. Aprende a quejarte sin ser grosero."
          },
          {
            kind: "regla",
            body: "Llama la atención: Excuse me... Explica el problema con suavidad: I'm sorry, but my soup is cold. / I think there's a mistake. I ordered the fish. Pide una solución: Could you bring me another one, please? Could you...? es más cortés que Can you...?"
          },
          {
            kind: "vocab",
            items: [
              { en: "complain", ipa: "kəmˈpleɪn", es: "quejarse" },
              { en: "problem", ipa: "ˈprɒbləm", es: "problema" },
              { en: "cold", ipa: "kəʊld", es: "frío" },
              { en: "dirty", ipa: "ˈdɜːti", es: "sucio" },
              { en: "wrong", ipa: "rɒŋ", es: "equivocado / incorrecto" },
              { en: "order", ipa: "ˈɔːdə", es: "pedir (en un restaurante)" },
              { en: "waiter", ipa: "ˈweɪtə", es: "mesero" },
              { en: "manager", ipa: "ˈmænɪdʒə", es: "gerente" }
            ]
          },
          {
            kind: "expresiones",
            items: [
              { en: "Excuse me, there's a problem with...", es: "Disculpe, hay un problema con..." },
              { en: "I'm sorry, but...", es: "Perdone, pero..." },
              { en: "I think there's a mistake.", es: "Creo que hay un error." },
              { en: "Could you...?", es: "¿Podría...?" }
            ]
          },
          {
            kind: "ejemplos",
            items: [
              { en: "Sam: Excuse me. I'm sorry, but my soup is cold.", es: "Sam: Disculpe. Perdone, pero mi sopa está fría." },
              { en: "Waiter: Oh, I'm very sorry. I'll bring you another one.", es: "Mesero: Ay, lo siento mucho. Le traigo otra." },
              { en: "Mia: And I think there's a mistake. I ordered the fish, not the chicken.", es: "Mia: Y creo que hay un error. Pedí el pescado, no el pollo." },
              { en: "Waiter: You're right. I'm so sorry about that.", es: "Mesero: Tiene razón. Disculpe." }
            ]
          },
          {
            kind: "errores",
            items: [
              { no: "Hey! My soup is cold!", si: "Excuse me. I'm sorry, but my soup is cold.", pq: "Empieza con Excuse me y suaviza con I'm sorry, but..." },
              { no: "Bring me other soup.", si: "Could you bring me another soup, please?", pq: "Pide con Could you...? Otro/a = another." },
              { no: "This glass is dirt.", si: "This glass is dirty.", pq: "El adjetivo es dirty." }
            ]
          },
          { kind: "resumen", body: "Excuse me... · I'm sorry, but... · I think there's a mistake · Could you...? Explica el problema con calma y pide una solución." },
          { kind: "puente", body: "Ayuda a Mia y Sam a salvar su cena de celebración." }
        ]
      },
      exercises: [
        {
          type: "reading", title: "At the restaurant",
          passage: "Sam: Excuse me. I'm sorry, but my soup is cold.\nWaiter: Oh, I'm very sorry. I'll bring you another one.\nMia: And I think there's a mistake. I ordered the fish, not the chicken.\nWaiter: You're right. I'm so sorry about that.\nWaiter: Here you are. And the manager says dessert is free tonight.\nSam: Thank you! That's very kind.",
          questions: [
            { q: "¿Cuál es el problema de Sam?", options: ["Su sopa está fría", "Su vaso está sucio", "No hay mesa"], correctIndex: 0, explanation: "My soup is cold." },
            { q: "¿Qué les regala el restaurante?", options: ["El postre", "La sopa", "Las bebidas"], correctIndex: 0, explanation: "Dessert is free tonight." }
          ]
        },
        {
          type: "multiple_choice", question: "¿Cuál es la queja más cortés?",
          options: ["Excuse me, I'm sorry, but this glass is dirty.", "This glass is dirty! Change it!", "Your glasses are terrible."], correctIndex: 0,
          explanation: "Excuse me + I'm sorry, but... suaviza la queja."
        },
        { type: "fill_blank", sentence: "Could you bring me ___ fork, please? This one is dirty.", answers: ["another"], hint: "otro / otra", explanation: "another = otro / otra (uno más o uno distinto)." },
        {
          type: "categorize", instruction: "¿Cortés o grosero?",
          buckets: [{ id: "polite", label: "Cortés" }, { id: "rude", label: "Grosero" }],
          items: [
            { t: "Could you check the bill, please?", bucket: "polite" },
            { t: "I think there's a mistake.", bucket: "polite" },
            { t: "Excuse me, my coffee is cold.", bucket: "polite" },
            { t: "This is wrong!", bucket: "rude" },
            { t: "Bring me the manager now!", bucket: "rude" },
            { t: "Your food is terrible.", bucket: "rude" }
          ]
        },
        { type: "listening", text: "I'm sorry, but I ordered a small pizza, not a large one.", question: "¿Qué pidió?", options: ["Una pizza pequeña", "Una pizza grande", "Dos pizzas"], correctIndex: 0 },
        { type: "word_order", words: ["mistake", "I", "a", "think", "there's"], correctOrder: ["I", "think", "there's", "a", "mistake"], hint: "Creo que hay un error." },
        { type: "speak", text: "Excuse me. I'm sorry, but my soup is cold.", es: "Disculpe. Perdone, pero mi sopa está fría." },
        {
          type: "translate", prompt: "Traduce: \"¿Podría traernos la cuenta, por favor?\"",
          answers: ["could you bring us the bill please", "could we have the bill please", "could you bring the bill please", "could you bring us the check please", "could we have the check please"],
          explanation: "Could you bring us the bill, please?"
        }
      ]
    },

    "lvl-a2-listen-doctor": {
      lessonId: "lvl-a2-listen-doctor", level: "A2", track: "Listening", topic: "health", skill: "listening",
      title: "Tema: en el médico", xpReward: 44, mascotState: "explaining",
      explanation: {
        body: "Escucha A2 en la consulta del médico. Oirás al paciente describir síntomas y al médico dar consejos. (Escucha qué le pasa y qué debe hacer.)",
        examples: [
          { en: "I don't feel well.", es: "No me siento bien." },
          { en: "Take this medicine twice a day.", es: "Toma esta medicina dos veces al día." }
        ]
      },
      exercises: [
        { type: "listening",
          text: "Good morning, doctor. — What's the problem? — I don't feel well. I have a sore throat and a headache, and I'm very tired.", "audio": "assets/audio/app/a2_2ded340e3f.mp3",
          question: "What's the matter with the patient?", options: ["a stomachache", "a broken leg", "a sore throat and a headache"], correctIndex: 2, explanation: "\"...a sore throat and a headache...\"" },
        { type: "listening",
          text: "You have a cold. Drink lots of water, rest, and take this medicine twice a day.", "audio": "assets/audio/app/a2_9b542d67c0.mp3",
          question: "How often should the patient take the medicine?", options: ["once a day", "twice a day", "three times a day"], correctIndex: 1, explanation: "\"...take this medicine twice a day.\"" },
        { type: "multiple_choice", question: "What does the doctor say the patient has?", options: ["a cold", "the flu", "an allergy"], correctIndex: 0, explanation: "\"You have a cold.\"" },
        { type: "true_false", statement: "The doctor tells the patient to rest.", answer: true, explanation: "\"...rest, and take this medicine...\"" }
      ]
    },

    /* ================== B1 · TECNOLOGÍA Y MEDIOS ================== */

    "lvl-b1-vocab-tech": {
      lessonId: "lvl-b1-vocab-tech", level: "B1", track: "Functional English", topic: "social", skill: "use", tipo: "aprende", title: "Giving and asking for opinions", rev: 2, xpReward: 52,
      mascotState: "explaining",
      explanation: {
        body: "Episode 4 · At lunch, Carmen suggests something surprising: Lumen Travel should allow dogs in the office. Everyone has an opinion! Learn to ask for and give opinions naturally. Ask: What do you think about...? / How do you feel about...? / What's your take on...? (informal). Give: I think / I feel / In my opinion... / If you ask me, ... (informal) / Personally, I... Soften your opinion: I'd say... / It seems to me that... Give a reason with because or since.",
        examples: [
          { en: "What's your take on having dogs in the office?" },
          { en: "If you ask me, it's a brilliant idea. It would reduce stress." },
          { en: "Personally, I'm not convinced. Some people are allergic." },
          { en: "It seems to me there are benefits and drawbacks. Why don't we try it for one day?" }
        ],
        sections: [
          {
            kind: "intro",
            body: "Episode 4 · At lunch, Carmen suggests something surprising: Lumen Travel should allow dogs in the office. Everyone has an opinion! Learn to ask for and give opinions naturally."
          },
          {
            kind: "regla",
            body: "Ask: What do you think about...? / How do you feel about...? / What's your take on...? (informal). Give: I think / I feel / In my opinion... / If you ask me, ... (informal) / Personally, I... Soften your opinion: I'd say... / It seems to me that... Give a reason with because or since."
          },
          {
            kind: "vocab",
            items: [
              { en: "opinion", ipa: "əˈpɪnjən", es: "what you think about something" },
              { en: "personally", ipa: "ˈpɜːsənəli", es: "used to give your own view" },
              { en: "take (on something)", es: "an opinion or way of seeing something (informal)" },
              { en: "view", ipa: "vjuː", es: "an opinion" },
              { en: "point of view", es: "a way of thinking about a subject" },
              { en: "convinced", ipa: "kənˈvɪnst", es: "completely sure" },
              { en: "benefit", ipa: "ˈbenɪfɪt", es: "an advantage" },
              { en: "drawback", ipa: "ˈdrɔːbæk", es: "a disadvantage" }
            ]
          },
          {
            kind: "expresiones",
            items: [
              { en: "What's your take on...?", es: "an informal way to ask for an opinion" },
              { en: "If you ask me, ...", es: "an informal way to give an opinion" },
              { en: "Personally, I think...", es: "stress that it's your own view" },
              { en: "I'm not convinced.", es: "you're not sure it's a good idea" }
            ]
          },
          {
            kind: "ejemplos",
            items: [
              { en: "Carmen: What's your take on having dogs in the office?" },
              { en: "Tom: If you ask me, it's a brilliant idea. It would reduce stress." },
              { en: "Priya: Personally, I'm not convinced. Some people are allergic." },
              { en: "Daniel: It seems to me there are benefits and drawbacks. Why don't we try it for one day?" }
            ]
          },
          {
            kind: "errores",
            items: [
              { no: "According to me, ...", si: "In my opinion, ...", pq: "\"According to\" is for other people's views, not your own." },
              { no: "What do you think? — I think yes.", si: "I think so.", pq: "The short answer is I think so / I don't think so." },
              { no: "In my opinion, I think that...", si: "In my opinion, ... / I think that...", pq: "Both phrases mean the same; using both is repetitive." }
            ]
          },
          { kind: "resumen", body: "Ask: What do you think about / How do you feel about / What's your take on...? Give: I think / Personally / If you ask me / It seems to me... + a reason." },
          { kind: "puente", body: "Should Lumen Travel have an office dog? Join the discussion." }
        ]
      },
      exercises: [
        {
          type: "multiple_choice", question: "Which phrase is NOT used to give your own opinion?", options: ["According to me, ...", "In my opinion, ...", "Personally, I think ..."], correctIndex: 0,
          explanation: "According to + another person or source: According to the report..."
        },
        {
          type: "listening", text: "Personally, I'm not convinced. It sounds expensive and complicated.", question: "What is the speaker's opinion?",
          options: ["They doubt it's a good idea", "They love the idea", "They have no opinion"], correctIndex: 0
        },
        {
          type: "matching", instruction: "Match each word with its meaning.",
          pairs: [
            { l: "drawback", r: "a disadvantage" },
            { l: "benefit", r: "an advantage" },
            { l: "convinced", r: "completely sure" },
            { l: "take", r: "an opinion (informal)" },
            { l: "point of view", r: "a way of thinking about a subject" }
          ]
        },
        {
          type: "categorize", instruction: "Asking for or giving an opinion?",
          buckets: [{ id: "ask", label: "Asking" }, { id: "give", label: "Giving" }],
          items: [
            { t: "What's your take on this?", bucket: "ask" },
            { t: "How do you feel about it?", bucket: "ask" },
            { t: "What do you think?", bucket: "ask" },
            { t: "If you ask me, ...", bucket: "give" },
            { t: "Personally, I feel ...", bucket: "give" },
            { t: "It seems to me that ...", bucket: "give" }
          ]
        },
        { type: "fill_blank", sentence: "If you ___ me, it's a great idea.", answers: ["ask"], hint: "An informal way to give your opinion.", explanation: "If you ask me, ..." },
        {
          type: "reading", title: "Team chat",
          passage: "Priya: Quick poll: what's everyone's take on an office dog day next Friday?\nTom: Count me in! If you ask me, it'll be great for team spirit.\nDaniel: I'm in, as long as the dogs stay out of the meeting room.\nCarmen: Personally, I think it's a great idea, but we should check that nobody is allergic first.\nPriya: Good point, Carmen. I'll send a quick survey.",
          questions: [
            {
              q: "What is Priya asking about?", options: ["Opinions on an office dog day", "Who owns a dog", "Where to have a meeting"], correctIndex: 0,
              explanation: "\"What's everyone's take on...\" asks for opinions."
            },
            {
              q: "What does Carmen suggest before the dog day?",
              options: ["Checking whether anyone is allergic", "Buying a dog for the office", "Cancelling the meeting"], correctIndex: 0, explanation: "...check that nobody is allergic first."
            },
            { q: "What does \"Count me in\" mean?", options: ["I want to take part.", "Please count the people.", "I'm not sure yet."], correctIndex: 0, explanation: "Count me in = include me." }
          ]
        },
        { type: "speak", text: "Personally, I'm not convinced. Some people are allergic." },
        {
          type: "translate", prompt: "Rewrite using \"If you ask me\": \"I think the idea is brilliant.\"",
          answers: ["if you ask me the idea is brilliant", "if you ask me it's a brilliant idea", "if you ask me it is a brilliant idea"], explanation: "If you ask me, the idea is brilliant."
        }
      ]
    },

    "lvl-b1-listen-podcast": {
      lessonId: "lvl-b1-listen-podcast", level: "B1", track: "Listening", topic: "tech", skill: "listening",
      title: "Topic: a technology podcast", xpReward: 54, mascotState: "explaining",
      explanation: {
        body: "B1 listening: a podcast with tips about online safety. Follow the topic, catch the details and the bonus tip. Pay attention to the host's recommendations.",
        examples: [
          { en: "A strong password should be long." },
          { en: "Turn on two-factor authentication." }
        ]
      },
      exercises: [
        { type: "listening",
          text: "Hi and welcome to Tech Tips. Today's tip is about passwords. A strong password should be long and mix letters, numbers and symbols. Never use the same password for every account.", "audio": "assets/audio/app/b1_d22abde701.mp3",
          question: "What is today's tip about?", options: ["buying a laptop", "creating strong passwords", "downloading apps safely onto a new phone"], correctIndex: 1, explanation: "Today's tip is about strong passwords." },
        { type: "listening",
          text: "And here's a bonus tip: turn on two-factor authentication. It sends a code to your phone, so even if someone knows your password, they can't log in.", "audio": "assets/audio/app/b1_8a3922da5d.mp3",
          question: "What does two-factor authentication do?", options: ["makes passwords shorter", "deletes your account", "sends a code to your phone for extra security"], correctIndex: 2, explanation: "\"It sends a code to your phone...\" for extra security." },
        { type: "multiple_choice", question: "According to the podcast, a strong password should...", options: ["mix letters, numbers and symbols", "be short and simple", "be the same on every website and app you use"], correctIndex: 0, explanation: "\"...mix letters, numbers and symbols.\"" },
        { type: "true_false", statement: "The speaker recommends using the same password for every account.", answer: false, explanation: "\"Never use the same password for every account.\"" }
      ]
    },

    /* ============ B2 · LISTENING TEMÁTICO (trabajo / noticias) ============ */

    "lvl-b2-listen-meeting": {
      lessonId: "lvl-b2-listen-meeting", level: "B2", track: "TOEFL · Listening", topic: "work", skill: "listening",
      title: "Listening: a work meeting", xpReward: 62, mascotState: "explaining",
      explanation: {
        body: "B2 listening in a work meeting. Catch the agenda topic, the instructions and the tone. At this level the speaker's attitude is also tested. Distinguish facts from intentions.",
        examples: [
          { en: "The main item on the agenda is..." },
          { en: "Please keep your comments brief." }
        ]
      },
      exercises: [
        { type: "listening",
          text: "Thanks everyone for joining today's meeting. The main item on the agenda is the launch of our new app. Sales have been slower than expected, so we need to discuss how to improve our marketing.", "audio": "assets/audio/app/b2_c50ff667ce.mp3",
          question: "What is the main topic of the meeting?", options: ["hiring new staff", "improving marketing for the new app", "moving the whole team to a new office building"], correctIndex: 1, explanation: "The main point is improving marketing for the new app." },
        { type: "listening",
          text: "Marta will present the budget, and then we'll open the floor for suggestions. Please keep your comments brief, as we only have thirty minutes.", "audio": "assets/audio/app/b2_59ba75fe2b.mp3",
          question: "What does the speaker ask people to do?", options: ["speak for a long time about every detail", "leave the meeting", "keep their comments brief"], correctIndex: 2, explanation: "\"Please keep your comments brief...\"" },
        { type: "multiple_choice", question: "Why are they discussing marketing?", options: ["sales were slower than expected", "the app is already finished and selling very well", "the budget is too big"], correctIndex: 0, explanation: "\"Sales have been slower than expected...\"" },
        { type: "multiple_choice", question: "What is the speaker's tone?", options: ["sad and worried", "angry and rude", "relaxed and informal", "focused and businesslike"], correctIndex: 3, explanation: "The speaker structures the agenda and asks people to be brief: a professional, focused tone." },
        { type: "true_false", statement: "The meeting will last about thirty minutes.", answer: true, explanation: "\"...we only have thirty minutes.\"" }
      ]
    },

    "lvl-b2-listen-news": {
      lessonId: "lvl-b2-listen-news", level: "B2", track: "TOEFL · Listening", topic: "society", skill: "listening",
      title: "Listening: a news report", xpReward: 62, mascotState: "explaining",
      explanation: {
        body: "B2 listening from a news bulletin. Catch the main story, the points of view for and against, and the specific facts. Identify who supports it and who is worried.",
        examples: [
          { en: "In tonight's headlines..." },
          { en: "Supporters say... while critics worry..." }
        ]
      },
      exercises: [
        { type: "listening",
          text: "Good evening. In tonight's headlines: the city council has approved a new plan to expand the cycling network. Over the next two years, more than fifty kilometres of bike lanes will be added across the city.", "audio": "assets/audio/app/b2_0fd3a9e9c6.mp3",
          question: "What has the city council approved?", options: ["a new shopping centre", "an expansion of the cycling network", "higher taxes"], correctIndex: 1, explanation: "\"...a new plan to expand the cycling network.\"" },
        { type: "listening",
          text: "Supporters say the plan will reduce traffic and pollution, while some local businesses worry about losing parking spaces.", "audio": "assets/audio/app/b2_ea274ea3aa.mp3",
          question: "What concern do some local businesses have?", options: ["fewer online customers", "higher rents", "losing parking spaces"], correctIndex: 2, explanation: "\"...worry about losing parking spaces.\"" },
        { type: "multiple_choice", question: "How long will the project take?", options: ["two years", "fifty years", "six months"], correctIndex: 0, explanation: "\"Over the next two years...\"" },
        { type: "true_false", statement: "Supporters believe the plan will reduce pollution.", answer: true, explanation: "\"Supporters say the plan will reduce traffic and pollution...\"" }
      ]
    },

    /* ========= C1 · LISTENING TEMÁTICO (psicología / sociedad) ========= */

    "lvl-c1-listen-psychology": {
      lessonId: "lvl-c1-listen-psychology", level: "C1", track: "TOEFL · Listening", topic: "study", skill: "listening",
      title: "Listening: psychology (biases)", xpReward: 66, mascotState: "explaining",
      explanation: {
        body: "C1 listening: a psychology lecture on cognitive biases. Catch the definition, the example and the professor's critical nuance. Distinguish the concept from the commentary.",
        examples: [
          { en: "a systematic deviation from rationality" },
          { en: "being intelligent does not make you immune" }
        ]
      },
      exercises: [
        { type: "listening",
          text: "Today we'll look at the concept of cognitive bias, the systematic ways in which our thinking deviates from rationality. A classic example is confirmation bias: our tendency to notice and remember information that supports what we already believe.", "audio": "assets/audio/app/c1_16f994942b.mp3",
          question: "What is the lecture mainly about?", options: ["how human memory is stored and later retrieved by the brain", "cognitive bias, and confirmation bias in particular", "techniques for studying"], correctIndex: 1, explanation: "It defines cognitive bias and focuses on confirmation bias." },
        { type: "listening",
          text: "Importantly, being intelligent does not make you immune. In fact, clever people are often better at constructing arguments to justify conclusions they already hold.", "audio": "assets/audio/app/c1_93dbcc7aef.mp3",
          question: "What point does the professor make about intelligent people?", options: ["they have a worse memory", "they never show bias because they reason more carefully than others", "they may be better at justifying their existing beliefs"], correctIndex: 2, explanation: "\"...better at constructing arguments to justify conclusions they already hold.\"" },
        { type: "multiple_choice", question: "'Confirmation bias' is the tendency to...", options: ["forget important facts", "trust experts more than friends", "change your mind easily", "favour information that supports your existing beliefs"], correctIndex: 3, explanation: "It is the tendency to notice what confirms what we already believe." },
        { type: "multiple_choice", question: "What can be inferred from the lecture?", options: ["bias affects people regardless of intelligence", "only uneducated people are biased, while experts are fully objective", "bias is always harmless"], correctIndex: 0, explanation: "If intelligence does not protect you, bias affects everyone." },
        { type: "true_false", statement: "The professor says intelligence makes people immune to bias.", answer: false, explanation: "\"...being intelligent does not make you immune.\"" }
      ]
    },

    "lvl-c1-listen-tech-society": {
      lessonId: "lvl-c1-listen-tech-society", level: "C1", track: "TOEFL · Listening", topic: "society", skill: "listening",
      title: "Listening: a debate on remote work", xpReward: 66, mascotState: "explaining",
      explanation: {
        body: "C1 listening: a seminar debating remote work. Catch the arguments for and against and notice that the speaker presents both sides. Distinguish advantages from drawbacks.",
        examples: [
          { en: "Proponents argue that..." },
          { en: "Critics point to the erosion of team spirit." }
        ]
      },
      exercises: [
        { type: "listening",
          text: "In this seminar we're debating remote work. Proponents argue it offers flexibility and cuts commuting time, which can improve both productivity and wellbeing.", "audio": "assets/audio/app/c1_946bac8509.mp3",
          question: "What is one argument FOR remote work?", options: ["it increases commuting time for almost all employees", "it offers flexibility and saves commuting time", "it reduces salaries"], correctIndex: 1, explanation: "\"...flexibility and cuts commuting time...\"" },
        { type: "listening",
          text: "Critics, however, point to the erosion of team spirit and the difficulty of mentoring junior staff who never meet their colleagues in person.", "audio": "assets/audio/app/c1_32b454c80d.mp3",
          question: "What concern do critics raise?", options: ["too many meetings", "higher office rents", "weaker team spirit and harder mentoring"], correctIndex: 2, explanation: "\"...the erosion of team spirit and the difficulty of mentoring...\"" },
        { type: "multiple_choice", question: "What is the seminar debating?", options: ["public transport", "salary levels", "office design", "remote work"], correctIndex: 3, explanation: "The topic is remote work." },
        { type: "multiple_choice", question: "'Erosion of team spirit' means team spirit is...", options: ["gradually weakening", "growing stronger", "completely unchanged"], correctIndex: 0, explanation: "'Erosion' = gradual weakening." },
        { type: "true_false", statement: "The speaker presents only the advantages of remote work.", answer: false, explanation: "The speaker presents arguments for (proponents) and against (critics)." }
      ]
    },

    /* ========= C2 · LISTENING TEMÁTICO (ética / desarrollo) ========= */

    "lvl-c2-listen-ethics": {
      lessonId: "lvl-c2-listen-ethics", level: "C2", track: "TOEFL · Listening", topic: "study", skill: "listening",
      title: "Listening: ethics (the trolley problem)", xpReward: 74, mascotState: "explaining",
      explanation: {
        body: "C2 listening: a moral philosophy seminar. The speaker presents a dilemma, points out an inconsistency and draws a subtle conclusion. Catch the argument, not just the facts. Follow the reasoning to the thesis.",
        examples: [
          { en: "Most people say they would pull the lever." },
          { en: "This inconsistency fascinates philosophers." }
        ]
      },
      exercises: [
        { type: "listening",
          text: "Consider the famous trolley problem. A runaway trolley will kill five people unless you divert it onto a side track, where it will kill one. Most people say they would pull the lever. Yet when asked to push a single person to their death to achieve the same outcome, most refuse.", "audio": "assets/audio/app/c2_5fc2d09b7f.mp3",
          question: "What puzzle does the speaker describe?", options: ["the prisoner's dilemma", "a mathematical theorem", "the trolley problem"], correctIndex: 2, explanation: "It describes the classic 'trolley problem'." },
        { type: "listening",
          text: "This inconsistency fascinates philosophers, because the numerical outcome is identical. It suggests our moral judgments are driven not purely by consequences, but by intuitions about action, intention and physical contact.", "audio": "assets/audio/app/c2_f8c4c5ee1a.mp3",
          question: "What does the inconsistency suggest about moral judgments?", options: ["they depend only on the numbers", "they are shaped by intuitions, not just consequences", "they are always perfectly rational calculations of outcomes"], correctIndex: 1, explanation: "It suggests that intuitions (action, intention, physical contact) matter, not just the consequences." },
        { type: "multiple_choice", question: "The speaker's main point is that human morality...", options: ["is influenced by factors beyond pure outcomes", "does not really exist", "is perfectly logical"], correctIndex: 0, explanation: "Human morality is influenced by more than outcomes." },
        { type: "multiple_choice", question: "An 'inconsistency' is...", options: ["a moral rule", "a type of trolley", "a strong proof that two ideas agree completely", "a lack of logical agreement"], correctIndex: 3, explanation: "Inconsistency = a lack of logical agreement." },
        { type: "true_false", statement: "According to the talk, most people would push a person to save five.", answer: false, explanation: "\"...most refuse\" when they have to push someone." }
      ]
    },

    "lvl-c2-listen-development": {
      lessonId: "lvl-c2-listen-development", level: "C2", track: "TOEFL · Listening", topic: "society", skill: "listening",
      title: "Listening: a debate on development aid", xpReward: 74, mascotState: "explaining",
      explanation: {
        body: "C2 listening: a debate about foreign aid. The speaker contrasts positions, resists simple slogans and qualifies when aid works. Catch the position and the nuances. Don't confuse the example with the thesis.",
        examples: [
          { en: "Advocates contend that... Skeptics counter that..." },
          { en: "The truth resists simple slogans." }
        ]
      },
      exercises: [
        { type: "listening",
          text: "Our topic today is foreign aid. Advocates contend that well-targeted aid has eradicated diseases and lifted millions out of poverty. Skeptics counter that poorly designed aid can foster dependency and prop up corrupt governments.", "audio": "assets/audio/app/c2_12f02599da.mp3",
          question: "What is the debate about?", options: ["international tourism", "the stock market", "foreign aid"], correctIndex: 2, explanation: "The topic is foreign aid." },
        { type: "listening",
          text: "The truth, as so often, resists simple slogans. The evidence suggests that aid works best when it is transparent, locally led, and tied to measurable outcomes rather than political convenience.", "audio": "assets/audio/app/c2_dcfbc0fd4b.mp3",
          question: "According to the speaker, when does aid work best?", options: ["when it is secret and centralised", "when it is transparent, locally led and tied to measurable outcomes", "when it supports any government in power, without conditions or checks"], correctIndex: 1, explanation: "\"...transparent, locally led, and tied to measurable outcomes...\"" },
        { type: "multiple_choice", question: "What is the speaker's overall stance?", options: ["aid can work under the right conditions", "aid is always beneficial, whatever the conditions on the ground", "aid is always harmful"], correctIndex: 0, explanation: "A nuanced position: aid works under certain conditions." },
        { type: "multiple_choice", question: "To 'foster dependency' means to...", options: ["reduce corruption", "share resources fairly", "put an end to all reliance", "encourage reliance on others"], correctIndex: 3, explanation: "'Foster dependency' = encourage people to rely on others." },
        { type: "true_false", statement: "The speaker says the issue can be summed up in a simple slogan.", answer: false, explanation: "\"The truth... resists simple slogans.\"" }
      ]
    }

  };

  /* Orden de aparición dentro de cada mundo (se anexa al final de cada
     escalera de destreza; la progresión real la calcula vesper_path.js). */
  var ORDER = [
    /* A1 */ "lvl-a1-vocab-house", "lvl-a1-listen-house",
    /* A2 */ "lvl-a2-vocab-health", "lvl-a2-listen-doctor",
    /* B1 */ "lvl-b1-vocab-tech", "lvl-b1-listen-podcast",
    /* B2 */ "lvl-b2-listen-meeting", "lvl-b2-listen-news",
    /* C1 */ "lvl-c1-listen-psychology", "lvl-c1-listen-tech-society",
    /* C2 */ "lvl-c2-listen-ethics", "lvl-c2-listen-development"
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
