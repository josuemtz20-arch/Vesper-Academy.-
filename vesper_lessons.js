/* ============================================================
 * vesper_lessons.js — Free no-account lessons content.
 * Core Grammar ladder A1 -> B1 (15 lessons). Authored + adversarially
 * verified by a multi-agent workflow (2026-06-12), then normalized
 * (word_order always solvable; MCQ correctIndex validated).
 * Schema per lesson: { lessonId, level, track, title, tipo?,
 *   explanation:{ body, examples:[{en,es}], sections?:[...] },
 *   tipo: "aprende" | "practica" (opcional; sin campo = practica).
 *   sections (solo aprende): [{kind:"intro"|"regla"|"resumen"|"puente", body}
 *     | {kind:"vocab", items:[{en,ipa?,es}]}
 *     | {kind:"expresiones"|"ejemplos", items:[{en,es}]}
 *     | {kind:"errores", items:[{no,si,pq}]}] — leccion.html las renderiza
 *   como pantalla de ensenanza rica; body+examples quedan como fallback.
 *   exercises:[ {type:"multiple_choice",question,options,correctIndex,explanation}
 *             | {type:"word_order",words,correctOrder,hint} ],
 *   xpReward, mascotState, nextLessonId }
 * Hand-edit here, or regenerate via the workflow. Add new ids to ORDER.
 * ============================================================ */
window.VESPER_LESSONS = {
    "core-grammar-01-to-be":  {
                                  "lessonId":  "core-grammar-01-to-be",
                                  "level":  "A1",
                                  "track":  "Core Grammar",
                                  "tipo":  "aprende",
                                  "title":  "Verb \"to be\"",
                                  "explanation":  {
                                                      "body":  "We use the verb \"to be\" to say who or what someone is. The forms are: I am, you/we/they are, he/she/it is. To make it negative, add not: I am not, he isn\u0027t, we aren\u0027t. For yes/no questions, put the verb first: Are you happy? Is she a teacher? (El verbo \"to be\" cambia segun el pronombre: am, is, are; significa \"ser\" o \"estar\".)",
                                                      "examples":  [
                                                                       {
                                                                           "en":  "I am a student.",
                                                                           "es":  "Soy estudiante."
                                                                       },
                                                                       {
                                                                           "en":  "She is happy.",
                                                                           "es":  "Ella esta feliz."
                                                                       },
                                                                       {
                                                                           "en":  "We aren\u0027t at home.",
                                                                           "es":  "No estamos en casa."
                                                                       },
                                                                       {
                                                                           "en":  "Are you from Mexico?",
                                                                           "es":  "Eres de Mexico?"
                                                                       }
                                                                   ],
                                                      "sections":  [
                                                          { "kind": "intro",
                                                            "body": "\"To be\" es el verbo mas importante del ingles: con el dices quien eres, como estas y de donde vienes. Es lo primero que necesitas para presentarte." },
                                                          { "kind": "regla",
                                                            "body": "Solo tiene 3 formas en presente: I am - he/she/it is - you/we/they are. Negativo: agrega not (isn't, aren't). Pregunta: el verbo va primero (Are you...?, Is she...?)." },
                                                          { "kind": "vocab",
                                                            "items": [
                                                                { "en": "I am (I'm)", "ipa": "aim", "es": "yo soy / estoy" },
                                                                { "en": "he / she / it is", "ipa": "iz", "es": "el / ella / eso es, esta" },
                                                                { "en": "you / we / they are", "ipa": "ar", "es": "tu eres, somos, son" },
                                                                { "en": "isn't / aren't", "ipa": "'iznt / arnt", "es": "no es / no son" }
                                                            ] },
                                                          { "kind": "expresiones",
                                                            "items": [
                                                                { "en": "How are you?", "es": "Como estas?" },
                                                                { "en": "I'm fine, thanks.", "es": "Estoy bien, gracias." },
                                                                { "en": "I'm from Mexico.", "es": "Soy de Mexico." },
                                                                { "en": "My name is...", "es": "Mi nombre es..." }
                                                            ] },
                                                          { "kind": "ejemplos",
                                                            "items": [
                                                                { "en": "I am a student.", "es": "Soy estudiante." },
                                                                { "en": "She is happy.", "es": "Ella esta feliz." },
                                                                { "en": "We aren't at home.", "es": "No estamos en casa." },
                                                                { "en": "Are you from Mexico?", "es": "Eres de Mexico?" }
                                                            ] },
                                                          { "kind": "errores",
                                                            "items": [
                                                                { "no": "I is happy.", "si": "I am happy.", "pq": "Con \"I\" siempre va \"am\"." },
                                                                { "no": "She are my friend.", "si": "She is my friend.", "pq": "he, she e it usan \"is\"." },
                                                                { "no": "I have 25 years.", "si": "I am 25 years old.", "pq": "La edad en ingles se dice con \"to be\", no con \"have\"." },
                                                                { "no": "Is very tall.", "si": "He is very tall.", "pq": "En ingles el sujeto nunca se omite." }
                                                            ] },
                                                          { "kind": "resumen",
                                                            "body": "am con I - is con he/she/it - are con you/we/they. Negativo con not; pregunta con el verbo primero. Y recuerda: la edad va con \"to be\"." },
                                                          { "kind": "puente",
                                                            "body": "Ahora te toca a ti: 5 ejercicios rapidos para dominarlo." }
                                                      ]
                                                  },
                                  "exercises":  [
                                                    {
                                                        "type":  "multiple_choice",
                                                        "question":  "Choose the correct form: She ___ my teacher.",
                                                        "options":  [
                                                                        "am",
                                                                        "is",
                                                                        "are"
                                                                    ],
                                                        "correctIndex":  1,
                                                        "explanation":  "With he, she, or it we use \"is\"."
                                                    },
                                                    {
                                                        "type":  "word_order",
                                                        "words":  [
                                                                      "I",
                                                                      "am",
                                                                      "happy",
                                                                      "today"
                                                                  ],
                                                        "correctOrder":  [
                                                                             "I",
                                                                             "am",
                                                                             "happy",
                                                                             "today"
                                                                         ],
                                                        "hint":  "Empieza con el pronombre \"I\" y usa la forma \"am\"."
                                                    },
                                                    {
                                                        "type":  "multiple_choice",
                                                        "question":  "Choose the correct question: ___ you a doctor?",
                                                        "options":  [
                                                                        "Are",
                                                                        "Is",
                                                                        "Am"
                                                                    ],
                                                        "correctIndex":  0,
                                                        "explanation":  "With \"you\" we use \"are\", and in questions the verb goes first."
                                                    },
                                                    {
                                                        "type":  "word_order",
                                                        "words":  [
                                                                      "They",
                                                                      "are",
                                                                      "at",
                                                                      "school"
                                                                  ],
                                                        "correctOrder":  [
                                                                             "They",
                                                                             "are",
                                                                             "at",
                                                                             "school"
                                                                         ],
                                                        "hint":  "Con \"they\" se usa \"are\"."
                                                    },
                                                    {
                                                        "type":  "multiple_choice",
                                                        "question":  "Choose the correct negative: He ___ at work.",
                                                        "options":  [
                                                                        "not is",
                                                                        "aren\u0027t",
                                                                        "isn\u0027t"
                                                                    ],
                                                        "correctIndex":  2,
                                                        "explanation":  "With \"he\" the negative is \"isn\u0027t\" (is + not)."
                                                    }
                                                ],
                                  "xpReward":  30,
                                  "mascotState":  "explaining",
                                  "nextLessonId":  "core-grammar-02-articles"
                              },
    "core-grammar-02-articles":  {
      lessonId: "core-grammar-02-articles", level: "A1", track: "Core Grammar", topic: "grammar", skill: "grammar", tipo: "aprende", title: "Preguntas wh- con to be", rev: 2, xpReward: 30,
      mascotState: "explaining", nextLessonId: "core-grammar-03-plurals",
      explanation: {
        body: "Para conocer a alguien necesitas preguntar: ¿cómo te llamas?, ¿de dónde eres?, ¿cuántos años tienes? En inglés estas preguntas empiezan con una palabra wh- y después va el verbo to be. Orden: palabra wh- + am/is/are + sujeto. What is your name? Where are you from? How old is she? Contracciones muy comunes: What's, Where's, Who's. Respuesta corta: I'm 25. / She's from Peru.",
        examples: [
          { en: "Hi! What's your name?", es: "¡Hola! ¿Cómo te llamas?" },
          { en: "I'm Sam. Where are you from?", es: "Soy Sam. ¿De dónde eres?" },
          { en: "I'm from Puebla, in Mexico.", es: "Soy de Puebla, en México." },
          { en: "Who's that? — Mia: That's Coco, my dog!", es: "¿Quién es ese? — Mia: ¡Es Coco, mi perro!" }
        ],
        sections: [
          {
            kind: "intro",
            body: "Para conocer a alguien necesitas preguntar: ¿cómo te llamas?, ¿de dónde eres?, ¿cuántos años tienes? En inglés estas preguntas empiezan con una palabra wh- y después va el verbo to be."
          },
          {
            kind: "regla",
            body: "Orden: palabra wh- + am/is/are + sujeto. What is your name? Where are you from? How old is she? Contracciones muy comunes: What's, Where's, Who's. Respuesta corta: I'm 25. / She's from Peru."
          },
          {
            kind: "vocab",
            items: [
              { en: "what", ipa: "wɒt", es: "qué / cuál" },
              { en: "where", ipa: "weər", es: "dónde" },
              { en: "who", ipa: "huː", es: "quién" },
              { en: "when", ipa: "wen", es: "cuándo" },
              { en: "how", ipa: "haʊ", es: "cómo" },
              { en: "how old", ipa: "haʊ əʊld", es: "cuántos años" },
              { en: "why", ipa: "waɪ", es: "por qué" }
            ]
          },
          {
            kind: "expresiones",
            items: [
              { en: "What's your name?", es: "¿Cómo te llamas?" },
              { en: "Where are you from?", es: "¿De dónde eres?" },
              { en: "How old are you?", es: "¿Cuántos años tienes?" },
              { en: "Who's that?", es: "¿Quién es esa persona?" }
            ]
          },
          {
            kind: "ejemplos",
            items: [
              { en: "Mia: Hi! What's your name?", es: "Mia: ¡Hola! ¿Cómo te llamas?" },
              { en: "Sam: I'm Sam. Where are you from?", es: "Sam: Soy Sam. ¿De dónde eres?" },
              { en: "Mia: I'm from Puebla, in Mexico.", es: "Mia: Soy de Puebla, en México." },
              { en: "Sam: Who's that? — Mia: That's Coco, my dog!", es: "Sam: ¿Quién es ese? — Mia: ¡Es Coco, mi perro!" }
            ]
          },
          {
            kind: "errores",
            items: [
              { no: "Where you are from?", si: "Where are you from?", pq: "En preguntas, el verbo to be va antes del sujeto." },
              { no: "How many years have you?", si: "How old are you?", pq: "La edad se pregunta con How old + be." },
              { no: "What is you name?", si: "What is your name?", pq: "your = tu (posesivo); you = tú." }
            ]
          },
          { kind: "resumen", body: "Palabra wh- + be + sujeto + ? → What's your name? Where are you from? How old is he? What's, Where's y Who's son contracciones normales." },
          { kind: "puente", body: "Ahora practica las preguntas que Mia y Sam se hacen el primer día." }
        ]
      },
      exercises: [
        {
          type: "matching", instruction: "Une cada palabra con su significado.",
          pairs: [{ l: "what", r: "qué" }, { l: "where", r: "dónde" }, { l: "who", r: "quién" }, { l: "when", r: "cuándo" }, { l: "how old", r: "cuántos años" }]
        },
        { type: "multiple_choice", question: "___ are you from? — I'm from Canada.", options: ["Where", "What", "Who"], correctIndex: 0, explanation: "Where = dónde (lugar de origen)." },
        { type: "word_order", words: ["name", "What", "your", "is"], correctOrder: ["What", "is", "your", "name"], hint: "Empieza con What." },
        { type: "fill_blank", sentence: "How old ___ your sister?", answers: ["is"], hint: "sister = she → ¿am, is o are?", explanation: "Con he/she/it usamos is: How old is your sister?" },
        {
          type: "find_error",
          segments: [{ u: "Where" }, " ", { u: "you are" }, " ", { u: "from" }, "?"],
          correctIndex: 1, correction: "are you", explanation: "En preguntas el verbo va antes del sujeto: Where are you from?", question: "Encuentra el error"
        },
        { type: "listening", text: "Hi, I'm Sam. I'm from Canada.", question: "¿De dónde es Sam?", options: ["De Canadá", "De México", "De Inglaterra"], correctIndex: 0 },
        { type: "true_false", statement: "\"How old are you?\" pregunta por la edad.", answer: true, explanation: "Sí: How old = cuántos años." },
        { type: "translate", prompt: "Traduce: \"¿Cuántos años tienes?\"", answers: ["how old are you", "what is your age"], explanation: "How old are you?" }
      ]
    },
    "core-grammar-03-plurals":  {
      lessonId: "core-grammar-03-plurals", level: "A1", track: "Core Grammar", topic: "grammar", skill: "grammar", tipo: "aprende", title: "Imperativos: dar instrucciones", rev: 2, xpReward: 30,
      mascotState: "explaining", nextLessonId: "core-grammar-04-present-simple",
      explanation: {
        body: "Los imperativos sirven para dar instrucciones, consejos y avisos: Open the door. Don't run. En clase, en una receta o en un letrero los vas a ver todo el tiempo. Afirmativo: verbo en forma base, sin sujeto: Sit down. Negativo: Don't + verbo: Don't touch. Para incluirte a ti: Let's + verbo: Let's go. Agrega please para sonar amable: Please close the window.",
        examples: [
          { en: "Come in, Sam! Put your bags here.", es: "¡Pasa, Sam! Pon tus maletas aquí." },
          { en: "Don't open that door. Coco is sleeping!", es: "No abras esa puerta. ¡Coco está durmiendo!" },
          { en: "OK. Let's have a coffee.", es: "Vale. Tomemos un café." },
          { en: "Please turn off the lights at night.", es: "Por favor, apaga las luces en la noche." }
        ],
        sections: [
          { kind: "intro", body: "Los imperativos sirven para dar instrucciones, consejos y avisos: Open the door. Don't run. En clase, en una receta o en un letrero los vas a ver todo el tiempo." },
          {
            kind: "regla",
            body: "Afirmativo: verbo en forma base, sin sujeto: Sit down. Negativo: Don't + verbo: Don't touch. Para incluirte a ti: Let's + verbo: Let's go. Agrega please para sonar amable: Please close the window."
          },
          {
            kind: "vocab",
            items: [
              { en: "open", ipa: "ˈəʊpən", es: "abrir" },
              { en: "close", ipa: "kləʊz", es: "cerrar" },
              { en: "sit down", ipa: "sɪt daʊn", es: "sentarse" },
              { en: "stand up", ipa: "stænd ʌp", es: "ponerse de pie" },
              { en: "listen", ipa: "ˈlɪsən", es: "escuchar" },
              { en: "look", ipa: "lʊk", es: "mirar" },
              { en: "turn off", ipa: "tɜːn ɒf", es: "apagar" },
              { en: "wait", ipa: "weɪt", es: "esperar" }
            ]
          },
          {
            kind: "expresiones",
            items: [{ en: "Come in!", es: "¡Pasa! / ¡Adelante!" }, { en: "Be careful!", es: "¡Ten cuidado!" }, { en: "Don't worry.", es: "No te preocupes." }, { en: "Let's go!", es: "¡Vamos!" }]
          },
          {
            kind: "ejemplos",
            items: [
              { en: "Mia: Come in, Sam! Put your bags here.", es: "Mia: ¡Pasa, Sam! Pon tus maletas aquí." },
              { en: "Mia: Don't open that door. Coco is sleeping!", es: "Mia: No abras esa puerta. ¡Coco está durmiendo!" },
              { en: "Sam: OK. Let's have a coffee.", es: "Sam: Vale. Tomemos un café." },
              { en: "Mia: Please turn off the lights at night.", es: "Mia: Por favor, apaga las luces en la noche." }
            ]
          },
          {
            kind: "errores",
            items: [
              { no: "You open the door.", si: "Open the door.", pq: "Para dar una instrucción, el imperativo no lleva sujeto." },
              { no: "No run!", si: "Don't run!", pq: "El negativo es Don't + verbo." },
              { no: "Let's to go.", si: "Let's go.", pq: "Después de Let's va el verbo sin to." }
            ]
          },
          { kind: "resumen", body: "Verbo solo = instrucción (Sit down). Don't + verbo = prohibición (Don't run). Let's + verbo = propuesta para los dos (Let's go). Please = más amable." },
          { kind: "puente", body: "Ahora da instrucciones como Mia el primer día de Sam en el piso." }
        ]
      },
      exercises: [
        {
          type: "categorize", instruction: "¿Es una instrucción para hacer algo o para NO hacerlo?",
          buckets: [{ id: "do", label: "Hazlo" }, { id: "dont", label: "No lo hagas" }],
          items: [
            { t: "Sit down.", bucket: "do" },
            { t: "Don't shout.", bucket: "dont" },
            { t: "Close the window.", bucket: "do" },
            { t: "Don't be late.", bucket: "dont" },
            { t: "Listen, please.", bucket: "do" },
            { t: "Don't touch that.", bucket: "dont" }
          ]
        },
        {
          type: "multiple_choice", question: "En la biblioteca. ¿Cuál es correcto?", options: ["Don't talk, please.", "No talk, please.", "Not talk, please."], correctIndex: 0,
          explanation: "El negativo del imperativo es Don't + verbo."
        },
        { type: "word_order", words: ["lights", "Please", "the", "turn", "off"], correctOrder: ["Please", "turn", "off", "the", "lights"], hint: "Empieza con Please." },
        { type: "fill_blank", sentence: "___ worry, it's OK.", answers: ["Don't", "Do not"], hint: "Negativo del imperativo.", explanation: "Don't worry = no te preocupes." },
        {
          type: "find_error",
          segments: [{ u: "Let's" }, " ", { u: "to go" }, " to ", { u: "the" }, " park!"],
          correctIndex: 1, correction: "go", explanation: "Después de Let's va el verbo sin to: Let's go to the park!", question: "Encuentra el error"
        },
        { type: "listening", text: "Sit down, please. Open your books at page ten.", question: "¿Qué tienes que abrir?", options: ["El libro", "La ventana", "La puerta"], correctIndex: 0 },
        {
          type: "matching", instruction: "Une cada instrucción con su significado.",
          pairs: [{ l: "Come in!", r: "¡Pasa!" }, { l: "Be careful!", r: "¡Ten cuidado!" }, { l: "Wait here.", r: "Espera aquí." }, { l: "Stand up.", r: "Ponte de pie." }]
        },
        { type: "translate", prompt: "Traduce: \"No abras la puerta.\"", answers: ["don't open the door", "do not open the door"], explanation: "Don't open the door." }
      ]
    },
    "core-grammar-04-present-simple":  {
                                           "lessonId":  "core-grammar-04-present-simple",
                                           "level":  "A1",
                                           "track":  "Core Grammar",
                                           "title":  "Present Simple",
                                           "explanation":  {
                                                               "body":  "We use the present simple to talk about routines, habits, and facts. With I, you, we, and they, we use the base verb (I work). With he, she, and it, we add -s to the verb (he works). For negatives and questions, we use do or does with the base verb: I don\u0027t work, he doesn\u0027t work, Do you work?, Does he work? (Usamos do/does para negativos y preguntas, y el verbo vuelve a su forma base.)",
                                                               "examples":  [
                                                                                {
                                                                                    "en":  "I live in Mexico.",
                                                                                    "es":  "Yo vivo en Mexico."
                                                                                },
                                                                                {
                                                                                    "en":  "She works every day.",
                                                                                    "es":  "Ella trabaja todos los dias."
                                                                                },
                                                                                {
                                                                                    "en":  "They don\u0027t eat meat.",
                                                                                    "es":  "Ellos no comen carne."
                                                                                },
                                                                                {
                                                                                    "en":  "Does he speak English?",
                                                                                    "es":  "Habla el ingles?"
                                                                                }
                                                                            ]
                                                           },
                                           "exercises":  [
                                                             {
                                                                 "type":  "multiple_choice",
                                                                 "question":  "Choose the correct sentence.",
                                                                 "options":  [
                                                                                 "She work in a shop.",
                                                                                 "She works in a shop.",
                                                                                 "She to work in a shop."
                                                                             ],
                                                                 "correctIndex":  1,
                                                                 "explanation":  "With he, she, or it, the verb takes -s, so we say \"She works\"."
                                                             },
                                                             {
                                                                 "type":  "word_order",
                                                                 "words":  [
                                                                               "I",
                                                                               "drink",
                                                                               "coffee",
                                                                               "every",
                                                                               "day"
                                                                           ],
                                                                 "correctOrder":  [
                                                                                      "I",
                                                                                      "drink",
                                                                                      "coffee",
                                                                                      "every",
                                                                                      "day"
                                                                                  ],
                                                                 "hint":  "Habito diario. Empieza con \"I\"."
                                                             },
                                                             {
                                                                 "type":  "multiple_choice",
                                                                 "question":  "Complete: \"He ___ like fish.\"",
                                                                 "options":  [
                                                                                 "doesn\u0027t",
                                                                                 "doesn't to",
                                                                                 "don\u0027t"
                                                                             ],
                                                                 "correctIndex":  0,
                                                                 "explanation":  "For he, she, or it we use \"doesn\u0027t\" plus the base verb."
                                                             },
                                                             {
                                                                 "type":  "word_order",
                                                                 "words":  [
                                                                               "Do",
                                                                               "you",
                                                                               "like",
                                                                               "tea",
                                                                               "?"
                                                                           ],
                                                                 "correctOrder":  [
                                                                                      "Do",
                                                                                      "you",
                                                                                      "like",
                                                                                      "tea",
                                                                                      "?"
                                                                                  ],
                                                                 "hint":  "Pregunta con \"do\". Termina con \"?\"."
                                                             },
                                                             {
                                                                 "type":  "multiple_choice",
                                                                 "question":  "Complete: \"___ she live here?\"",
                                                                 "options":  [
                                                                                 "Do",
                                                                                 "Is",
                                                                                 "Does"
                                                                             ],
                                                                 "correctIndex":  2,
                                                                 "explanation":  "For he, she, or it, questions begin with \"Does\" plus the base verb."
                                                             }
                                                         ],
                                           "xpReward":  30,
                                           "mascotState":  "explaining",
                                           "nextLessonId":  "core-grammar-05-there-is-are"
                                       },
    "core-grammar-05-there-is-are":  {
      lessonId: "core-grammar-05-there-is-are", level: "A1", track: "Core Grammar", topic: "grammar", skill: "grammar", tipo: "aprende", title: "Do / Does: preguntas y negativas", rev: 2, xpReward: 30,
      mascotState: "explaining", nextLessonId: "core-grammar-06-present-continuous",
      explanation: {
        body: "Ya sabes decir lo que haces (I work, she lives). Ahora aprende a preguntar y a negar en presente simple: Do you like coffee? She doesn't eat meat. Pregunta: Do + I/you/we/they + verbo. Does + he/she/it + verbo. Negativo: don't / doesn't + verbo. ¡Ojo! Con does y doesn't el verbo NO lleva -s: Does she work? (no works). Con palabra wh-: Where do you live? What does he do?",
        examples: [
          { en: "What do you do, Mia?", es: "¿A qué te dedicas, Mia?" },
          { en: "I'm a nurse. I work at the hospital.", es: "Soy enfermera. Trabajo en el hospital." },
          { en: "Does Coco eat a lot?", es: "¿Coco come mucho?" },
          { en: "Yes! But Coco doesn't like fish.", es: "¡Sí! Pero a Coco no le gusta el pescado." }
        ],
        sections: [
          { kind: "intro", body: "Ya sabes decir lo que haces (I work, she lives). Ahora aprende a preguntar y a negar en presente simple: Do you like coffee? She doesn't eat meat." },
          {
            kind: "regla",
            body: "Pregunta: Do + I/you/we/they + verbo. Does + he/she/it + verbo. Negativo: don't / doesn't + verbo. ¡Ojo! Con does y doesn't el verbo NO lleva -s: Does she work? (no works). Con palabra wh-: Where do you live? What does he do?"
          },
          {
            kind: "vocab",
            items: [
              { en: "do / does", ipa: "duː / dʌz", es: "auxiliar para preguntar" },
              { en: "don't (do not)", ipa: "dəʊnt", es: "no (I, you, we, they)" },
              { en: "doesn't (does not)", ipa: "ˈdʌzənt", es: "no (he, she, it)" },
              { en: "live", ipa: "lɪv", es: "vivir" },
              { en: "work", ipa: "wɜːk", es: "trabajar" },
              { en: "like", ipa: "laɪk", es: "gustar" },
              { en: "eat", ipa: "iːt", es: "comer" },
              { en: "speak", ipa: "spiːk", es: "hablar" }
            ]
          },
          {
            kind: "expresiones",
            items: [
              { en: "What do you do?", es: "¿A qué te dedicas?" },
              { en: "Where do you live?", es: "¿Dónde vives?" },
              { en: "Do you speak English?", es: "¿Hablas inglés?" },
              { en: "Yes, I do. / No, I don't.", es: "Sí. / No. (respuesta corta)" }
            ]
          },
          {
            kind: "ejemplos",
            items: [
              { en: "Sam: What do you do, Mia?", es: "Sam: ¿A qué te dedicas, Mia?" },
              { en: "Mia: I'm a nurse. I work at the hospital.", es: "Mia: Soy enfermera. Trabajo en el hospital." },
              { en: "Sam: Does Coco eat a lot?", es: "Sam: ¿Coco come mucho?" },
              { en: "Mia: Yes! But Coco doesn't like fish.", es: "Mia: ¡Sí! Pero a Coco no le gusta el pescado." }
            ]
          },
          {
            kind: "errores",
            items: [
              { no: "Does she works here?", si: "Does she work here?", pq: "Con does, el verbo va sin -s." },
              { no: "He don't like tea.", si: "He doesn't like tea.", pq: "he / she / it usan doesn't." },
              { no: "You like pizza?", si: "Do you like pizza?", pq: "La pregunta necesita do o does al inicio." }
            ]
          },
          { kind: "resumen", body: "do / don't con I, you, we, they. does / doesn't con he, she, it. Después de do o does, el verbo va sin -s." },
          { kind: "puente", body: "Practica haciendo preguntas a Sam y a Mia." }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "___ Sam speak French?", options: ["Does", "Do", "Is"], correctIndex: 0, explanation: "Sam = he → Does + verbo." },
        { type: "fill_blank", sentence: "Mia ___ like fish.", answers: ["doesn't", "does not"], hint: "Negativo con she.", explanation: "She doesn't like fish." },
        {
          type: "categorize", instruction: "¿Do o does?",
          buckets: [{ id: "do", label: "do" }, { id: "does", label: "does" }],
          items: [{ t: "you", bucket: "do" }, { t: "they", bucket: "do" }, { t: "we", bucket: "do" }, { t: "Mia", bucket: "does" }, { t: "the dog", bucket: "does" }, { t: "he", bucket: "does" }]
        },
        {
          type: "find_error",
          segments: [{ u: "Does" }, " your brother ", { u: "works" }, " ", { u: "in" }, " a bank?"],
          correctIndex: 1, correction: "work", explanation: "Con does el verbo va sin -s: Does your brother work in a bank?", question: "Encuentra el error"
        },
        { type: "word_order", words: ["live", "Where", "you", "do"], correctOrder: ["Where", "do", "you", "live"], hint: "Empieza con la palabra wh-." },
        {
          type: "listening", text: "Do you like coffee? Yes, I do. I drink it every morning.", question: "¿Le gusta el café?", options: ["Sí, lo toma cada mañana", "No, prefiere té", "Solo los fines de semana"],
          correctIndex: 0
        },
        { type: "true_false", statement: "\"What do you do?\" pregunta por tu trabajo.", answer: true, explanation: "Sí: es la forma normal de preguntar a qué te dedicas." },
        { type: "translate", prompt: "Traduce: \"¿Dónde trabaja ella?\"", answers: ["where does she work", "where does she work at"], explanation: "Where does she work?" }
      ]
    },
    "core-grammar-06-present-continuous":  {
                                               "lessonId":  "core-grammar-06-present-continuous",
                                               "level":  "A2",
                                               "track":  "Core Grammar",
                                               "tipo":  "aprende",
                                               "title":  "Present Continuous",
                                               "explanation":  {
                                                                   "body":  "We use the present continuous to talk about actions happening now. We make it with am, is, or are + verb-ing (for example: I am reading, she is working). For most verbs we just add -ing, but we drop a final -e (make - making) and we double a final consonant after a short vowel (run - running). We use the present simple for habits and routines, but the present continuous for things right now. (En espanol, usamos esta forma para acciones que pasan en este momento, como \"estoy leyendo\".)",
                                                                   "examples":  [
                                                                                    {
                                                                                        "en":  "I am studying English now.",
                                                                                        "es":  "Estoy estudiando ingles ahora."
                                                                                    },
                                                                                    {
                                                                                        "en":  "She is cooking dinner.",
                                                                                        "es":  "Ella esta cocinando la cena."
                                                                                    },
                                                                                    {
                                                                                        "en":  "They are playing in the park.",
                                                                                        "es":  "Ellos estan jugando en el parque."
                                                                                    },
                                                                                    {
                                                                                        "en":  "He usually walks to work, but today he is taking the bus.",
                                                                                        "es":  "El normalmente camina al trabajo, pero hoy esta tomando el autobus."
                                                                                    }
                                                                                ],
                                                                   "sections":  [
                                                                     {
                                                                       "kind": "intro",
                                                                       "body": "El presente continuo cuenta lo que está pasando ahora mismo: «estoy estudiando», «está lloviendo». En español lo dices sin pensar; en inglés tiene su propia forma, y si usas el presente simple en su lugar se nota enseguida."
                                                                     },
                                                                     {
                                                                       "kind": "regla",
                                                                       "body": "Se forma con am / is / are + el verbo con -ing: I am reading, she is working, they are playing. Negativo: añade not (I'm not, isn't, aren't). Pregunta: to be va primero (Are you working? Is it raining?). Ortografía del -ing: casi siempre se añade tal cual (read → reading); si el verbo acaba en -e, se quita (make → making); si acaba en vocal corta + consonante, se duplica la consonante (run → running, sit → sitting)."
                                                                     },
                                                                     {
                                                                       "kind": "vocab",
                                                                       "items": [
                                                                         {
                                                                           "en": "now",
                                                                           "ipa": "naʊ",
                                                                           "es": "ahora"
                                                                         },
                                                                         {
                                                                           "en": "right now",
                                                                           "ipa": "raɪt naʊ",
                                                                           "es": "ahora mismo"
                                                                         },
                                                                         {
                                                                           "en": "at the moment",
                                                                           "ipa": "æt ðə ˈmoʊmənt",
                                                                           "es": "en este momento"
                                                                         },
                                                                         {
                                                                           "en": "today / this week",
                                                                           "ipa": "təˈdeɪ / ðɪs wiːk",
                                                                           "es": "hoy / esta semana"
                                                                         },
                                                                         {
                                                                           "en": "Look! / Listen!",
                                                                           "ipa": "lʊk / ˈlɪsən",
                                                                           "es": "¡Mira! / ¡Escucha!"
                                                                         }
                                                                       ]
                                                                     },
                                                                     {
                                                                       "kind": "expresiones",
                                                                       "items": [
                                                                         {
                                                                           "en": "What are you doing?",
                                                                           "es": "¿Qué estás haciendo?"
                                                                         },
                                                                         {
                                                                           "en": "I'm working from home today.",
                                                                           "es": "Hoy estoy trabajando desde casa."
                                                                         },
                                                                         {
                                                                           "en": "I'm on my way!",
                                                                           "es": "¡Ya voy en camino!"
                                                                         },
                                                                         {
                                                                           "en": "Sorry, I'm driving. I'll call you later.",
                                                                           "es": "Perdón, voy manejando. Te llamo luego."
                                                                         }
                                                                       ]
                                                                     },
                                                                     {
                                                                       "kind": "ejemplos",
                                                                       "items": [
                                                                         {
                                                                           "en": "I'm learning English with Vesper right now.",
                                                                           "es": "Ahora mismo estoy aprendiendo inglés con Vesper."
                                                                         },
                                                                         {
                                                                           "en": "She isn't working today; she's at the doctor's.",
                                                                           "es": "Hoy no está trabajando; está en el médico."
                                                                         },
                                                                         {
                                                                           "en": "Are the kids playing in the garden?",
                                                                           "es": "¿Los niños están jugando en el jardín?"
                                                                         },
                                                                         {
                                                                           "en": "Look! It's raining again.",
                                                                           "es": "¡Mira! Está lloviendo otra vez."
                                                                         }
                                                                       ]
                                                                     },
                                                                     {
                                                                       "kind": "errores",
                                                                       "items": [
                                                                         {
                                                                           "no": "I reading a book.",
                                                                           "si": "I'm reading a book.",
                                                                           "pq": "El -ing solo no basta: siempre va con am, is o are."
                                                                         },
                                                                         {
                                                                           "no": "She is work now.",
                                                                           "si": "She is working now.",
                                                                           "pq": "Después de is va el verbo con -ing, no la forma base."
                                                                         },
                                                                         {
                                                                           "no": "I'm study English every day.",
                                                                           "si": "I study English every day.",
                                                                           "pq": "Para rutinas y costumbres se usa el presente simple; el continuo es para lo de ahora."
                                                                         },
                                                                         {
                                                                           "no": "I'm knowing the answer.",
                                                                           "si": "I know the answer.",
                                                                           "pq": "Los verbos de estado (know, like, want, understand) casi nunca van en continuo."
                                                                         },
                                                                         {
                                                                           "no": "He is runing.",
                                                                           "si": "He is running.",
                                                                           "pq": "Vocal corta + consonante: la consonante se duplica (run → running)."
                                                                         }
                                                                       ]
                                                                     },
                                                                     {
                                                                       "kind": "resumen",
                                                                       "body": "am / is / are + -ing para lo que pasa ahora. Rutinas, en presente simple. Cuidado con la ortografía del -ing y con los verbos de estado (know, like, want), que se quedan en presente simple."
                                                                     },
                                                                     {
                                                                       "kind": "puente",
                                                                       "body": "Ahora te toca a ti: unos ejercicios rápidos para dominarlo."
                                                                     }
                                                                   ]
                                                               },
                                               "exercises":  [
                                                                 {
                                                                     "type":  "multiple_choice",
                                                                     "question":  "Choose the correct sentence for an action happening now.",
                                                                     "options":  [
                                                                                     "She is write a letter.",
                                                                                     "She is writing a letter.",
                                                                                     "She writing a letter."
                                                                                 ],
                                                                     "correctIndex":  1,
                                                                     "explanation":  "The present continuous needs is + verb-ing, so \"is writing\" is correct."
                                                                 },
                                                                 {
                                                                     "type":  "word_order",
                                                                     "words":  [
                                                                                   "I",
                                                                                   "am",
                                                                                   "watching",
                                                                                   "TV"
                                                                               ],
                                                                     "correctOrder":  [
                                                                                          "I",
                                                                                          "am",
                                                                                          "watching",
                                                                                          "TV"
                                                                                      ],
                                                                     "hint":  "Empieza con el sujeto: I + am + verbo-ing."
                                                                 },
                                                                 {
                                                                     "type":  "multiple_choice",
                                                                     "question":  "Complete: The children ____ in the garden right now.",
                                                                     "options":  [
                                                                                     "are playing",
                                                                                     "is playing",
                                                                                     "are be playing"
                                                                                 ],
                                                                     "correctIndex":  0,
                                                                     "explanation":  "\"Children\" is plural, so we use \"are\" + the -ing form \"playing\"."
                                                                 },
                                                                 {
                                                                     "type":  "word_order",
                                                                     "words":  [
                                                                                   "What",
                                                                                   "are",
                                                                                   "you",
                                                                                   "doing",
                                                                                   "?"
                                                                               ],
                                                                     "correctOrder":  [
                                                                                          "What",
                                                                                          "are",
                                                                                          "you",
                                                                                          "doing",
                                                                                          "?"
                                                                                      ],
                                                                     "hint":  "Es una pregunta: empieza con What y termina con ?."
                                                                 },
                                                                 {
                                                                     "type":  "multiple_choice",
                                                                     "question":  "Which spelling of the -ing form is correct?",
                                                                     "options":  [
                                                                                     "runnning",
                                                                                     "runing",
                                                                                     "running"
                                                                                 ],
                                                                     "correctIndex":  2,
                                                                     "explanation":  "After a short vowel we double the final consonant, so \"run\" becomes \"running\"."
                                                                 }
                                                             ],
                                               "xpReward":  40,
                                               "mascotState":  "explaining",
                                               "nextLessonId":  "core-grammar-07-past-simple"
                                           },
    "core-grammar-07-past-simple":  {
                                        "lessonId":  "core-grammar-07-past-simple",
                                        "level":  "A2",
                                        "track":  "Core Grammar",
                                        "title":  "Past Simple",
                                        "explanation":  {
                                                            "body":  "We use the past simple to talk about finished actions in the past. For regular verbs, we add -ed to the base verb (work → worked, play → played). Many common verbs are irregular and change form (go → went, have → had, see → saw). For negatives and questions we use did + the base verb, and the main verb goes back to its base form (I didn\u0027t go; Did you see it?). (En negativos y preguntas usamos \"did\" + el verbo base, sin -ed ni forma irregular.)",
                                                            "examples":  [
                                                                             {
                                                                                 "en":  "I worked at home yesterday.",
                                                                                 "es":  "Trabajé en casa ayer."
                                                                             },
                                                                             {
                                                                                 "en":  "She went to the park last Sunday.",
                                                                                 "es":  "Ella fue al parque el domingo pasado."
                                                                             },
                                                                             {
                                                                                 "en":  "We didn\u0027t have breakfast this morning.",
                                                                                 "es":  "No desayunamos esta mañana."
                                                                             },
                                                                             {
                                                                                 "en":  "Did you see the film?",
                                                                                 "es":  "¿Viste la película?"
                                                                             }
                                                                         ]
                                                        },
                                        "exercises":  [
                                                          {
                                                              "type":  "multiple_choice",
                                                              "question":  "Yesterday I ____ to school by bus.",
                                                              "options":  [
                                                                              "go",
                                                                              "went",
                                                                              "goed"
                                                                          ],
                                                              "correctIndex":  1,
                                                              "explanation":  "\"Go\" is irregular, so the past simple is \"went,\" not \"goed.\""
                                                          },
                                                          {
                                                              "type":  "word_order",
                                                              "words":  [
                                                                            "She",
                                                                            "watched",
                                                                            "a",
                                                                            "movie",
                                                                            "yesterday"
                                                                        ],
                                                              "correctOrder":  [
                                                                                   "She",
                                                                                   "watched",
                                                                                   "a",
                                                                                   "movie",
                                                                                   "yesterday"
                                                                               ],
                                                              "hint":  "Sujeto + verbo en pasado (-ed) + objeto + tiempo."
                                                          },
                                                          {
                                                              "type":  "multiple_choice",
                                                              "question":  "We ____ go to the party last night.",
                                                              "options":  [
                                                                              "didn\u0027t",
                                                                              "don\u0027t",
                                                                              "didn\u0027t went"
                                                                          ],
                                                              "correctIndex":  0,
                                                              "explanation":  "Negatives in the past use \"didn\u0027t\" + the base verb \"go.\""
                                                          },
                                                          {
                                                              "type":  "word_order",
                                                              "words":  [
                                                                            "Did",
                                                                            "you",
                                                                            "see",
                                                                            "the",
                                                                            "film",
                                                                            "?"
                                                                        ],
                                                              "correctOrder":  [
                                                                                   "Did",
                                                                                   "you",
                                                                                   "see",
                                                                                   "the",
                                                                                   "film",
                                                                                   "?"
                                                                               ],
                                                              "hint":  "Pregunta en pasado: Did + sujeto + verbo base + objeto + ?"
                                                          },
                                                          {
                                                              "type":  "multiple_choice",
                                                              "question":  "They ____ a big house in 2010.",
                                                              "options":  [
                                                                              "did had",
                                                                              "haved",
                                                                              "had"
                                                                          ],
                                                              "correctIndex":  2,
                                                              "explanation":  "\"Have\" is irregular; its past simple form is \"had.\""
                                                          }
                                                      ],
                                        "xpReward":  40,
                                        "mascotState":  "explaining",
                                        "nextLessonId":  "core-grammar-08-comparatives"
                                    },
    "core-grammar-08-comparatives":  {
      lessonId: "core-grammar-08-comparatives", level: "A2", track: "Core Grammar", topic: "grammar", skill: "grammar", tipo: "aprende", title: "Have to, must y mustn't", rev: 2, xpReward: 40,
      mascotState: "explaining", nextLessonId: "core-grammar-09-countables",
      explanation: {
        body: "Mia y Sam escriben las reglas del piso. Para hablar de obligaciones y prohibiciones usas have to, must y mustn't. have to / has to + verbo = obligación (muchas veces por una regla externa): I have to work on Saturday. don't have to = no es necesario: You don't have to pay. must + verbo = obligación fuerte, típica de reglas escritas: You must wear a helmet. mustn't = está prohibido: You mustn't smoke here. ¡Ojo! don't have to y mustn't NO significan lo mismo.",
        examples: [
          { en: "We have to clean the kitchen every Sunday.", es: "Tenemos que limpiar la cocina cada domingo." },
          { en: "Do I have to pay for the internet?", es: "¿Tengo que pagar el internet?" },
          { en: "No, you don't have to. It's free in this building.", es: "No, no hace falta. Es gratis en este edificio." },
          { en: "But you mustn't play the guitar after 11 p.m.!", es: "¡Pero no debes tocar la guitarra después de las 11!" }
        ],
        sections: [
          { kind: "intro", body: "Mia y Sam escriben las reglas del piso. Para hablar de obligaciones y prohibiciones usas have to, must y mustn't." },
          {
            kind: "regla",
            body: "have to / has to + verbo = obligación (muchas veces por una regla externa): I have to work on Saturday. don't have to = no es necesario: You don't have to pay. must + verbo = obligación fuerte, típica de reglas escritas: You must wear a helmet. mustn't = está prohibido: You mustn't smoke here. ¡Ojo! don't have to y mustn't NO significan lo mismo."
          },
          {
            kind: "vocab",
            items: [
              { en: "have to", ipa: "ˈhæv tə", es: "tener que" },
              { en: "has to", ipa: "ˈhæz tə", es: "tiene que" },
              { en: "don't have to", ipa: "dəʊnt ˈhæv tə", es: "no hace falta" },
              { en: "must", ipa: "mʌst", es: "deber (obligación fuerte)" },
              { en: "mustn't", ipa: "ˈmʌsənt", es: "no deber (está prohibido)" },
              { en: "rule", ipa: "ruːl", es: "regla" },
              { en: "allowed", ipa: "əˈlaʊd", es: "permitido" },
              { en: "noise", ipa: "nɔɪz", es: "ruido" }
            ]
          },
          {
            kind: "expresiones",
            items: [
              { en: "Do I have to...?", es: "¿Tengo que...?" },
              { en: "You don't have to.", es: "No hace falta." },
              { en: "You mustn't...", es: "No debes... / Está prohibido..." },
              { en: "I have to go.", es: "Me tengo que ir." }
            ]
          },
          {
            kind: "ejemplos",
            items: [
              { en: "Mia: We have to clean the kitchen every Sunday.", es: "Mia: Tenemos que limpiar la cocina cada domingo." },
              { en: "Sam: Do I have to pay for the internet?", es: "Sam: ¿Tengo que pagar el internet?" },
              { en: "Mia: No, you don't have to. It's free in this building.", es: "Mia: No, no hace falta. Es gratis en este edificio." },
              { en: "Mia: But you mustn't play the guitar after 11 p.m.!", es: "Mia: ¡Pero no debes tocar la guitarra después de las 11!" }
            ]
          },
          {
            kind: "errores",
            items: [
              { no: "She have to work.", si: "She has to work.", pq: "Con he / she / it: has to." },
              { no: "You don't have to smoke here. (prohibición)", si: "You mustn't smoke here.", pq: "Prohibido = mustn't. Don't have to = no es necesario." },
              { no: "I must to go.", si: "I must go.", pq: "Después de must no va to." }
            ]
          },
          { kind: "resumen", body: "have to / has to = obligación. must = obligación fuerte. don't have to = no es necesario. mustn't = prohibido." },
          { kind: "puente", body: "Ahora ayuda a Mia y Sam con las reglas del piso." }
        ]
      },
      exercises: [
        {
          type: "categorize", instruction: "¿Está prohibido o simplemente no es necesario?",
          buckets: [{ id: "mustnt", label: "Prohibido (mustn't)" }, { id: "donthave", label: "No es necesario (don't have to)" }],
          items: [
            { t: "You ___ use your phone in the exam.", bucket: "mustnt" },
            { t: "You ___ shout in a hospital.", bucket: "mustnt" },
            { t: "You ___ touch the paintings in the museum.", bucket: "mustnt" },
            { t: "It's Sunday! You ___ get up early.", bucket: "donthave" },
            { t: "The museum is free. You ___ pay.", bucket: "donthave" },
            { t: "I can drive you. You ___ take a taxi.", bucket: "donthave" }
          ]
        },
        { type: "multiple_choice", question: "Sam ___ work on Saturdays. It's a rule at his job.", options: ["has to", "have to", "must to"], correctIndex: 0, explanation: "Sam = he → has to." },
        {
          type: "find_error",
          segments: [{ u: "You" }, " ", { u: "must to" }, " wear ", { u: "a" }, " helmet."],
          correctIndex: 1, correction: "must", explanation: "Después de must va el verbo sin to: You must wear a helmet.", question: "Encuentra el error"
        },
        { type: "fill_blank", sentence: "Do I ___ to bring food to the party? — No, you don't.", answers: ["have"], hint: "¿Tengo que...?", explanation: "Do I have to bring food?" },
        { type: "listening", text: "You mustn't park here. It's for ambulances.", question: "¿Qué está prohibido?", options: ["Estacionarse ahí", "Llamar a una ambulancia", "Caminar por ahí"], correctIndex: 0 },
        { type: "word_order", words: ["uniform", "We", "a", "don't", "wear", "have", "to"], correctOrder: ["We", "don't", "have", "to", "wear", "a", "uniform"], hint: "No es necesario llevar uniforme." },
        { type: "true_false", statement: "\"You don't have to come\" significa que está prohibido venir.", answer: false, explanation: "Significa que no es necesario venir. Prohibido sería You mustn't come." },
        { type: "translate", prompt: "Traduce: \"Me tengo que ir.\"", answers: ["i have to go", "i've got to go", "i have got to go", "i must go"], explanation: "I have to go." }
      ]
    },
    "core-grammar-09-countables":  {
                                       "lessonId":  "core-grammar-09-countables",
                                       "level":  "A2",
                                       "track":  "Core Grammar",
                                       "title":  "Countable \u0026 Uncountable",
                                       "explanation":  {
                                                           "body":  "Countable nouns are things you can count: one apple, two apples. Uncountable nouns are things you cannot count one by one, like water, rice, or money, and they have no plural form. Use some in positive sentences and any in questions and negatives; use How many with countable nouns and How much with uncountable nouns. (En espanol: los sustantivos contables tienen plural y los incontables no.)",
                                                           "examples":  [
                                                                            {
                                                                                "en":  "I have some apples and some milk.",
                                                                                "es":  "Tengo algunas manzanas y algo de leche."
                                                                            },
                                                                            {
                                                                                "en":  "We don\u0027t have any bread.",
                                                                                "es":  "No tenemos pan."
                                                                            },
                                                                            {
                                                                                "en":  "How many eggs do you need?",
                                                                                "es":  "Cuantos huevos necesitas?"
                                                                            },
                                                                            {
                                                                                "en":  "How much water do you drink?",
                                                                                "es":  "Cuanta agua bebes?"
                                                                            }
                                                                        ]
                                                       },
                                       "exercises":  [
                                                         {
                                                             "type":  "multiple_choice",
                                                             "question":  "How ___ sugar do you want in your coffee?",
                                                             "options":  [
                                                                             "much",
                                                                             "many",
                                                                             "any"
                                                                         ],
                                                             "correctIndex":  0,
                                                             "explanation":  "Sugar is uncountable, so we use How much."
                                                         },
                                                         {
                                                             "type":  "multiple_choice",
                                                             "question":  "There aren\u0027t ___ apples in the fridge.",
                                                             "options":  [
                                                                             "some",
                                                                             "any",
                                                                             "much"
                                                                         ],
                                                             "correctIndex":  1,
                                                             "explanation":  "We use any in negative sentences, and apples is countable (so much is wrong)."
                                                         },
                                                         {
                                                             "type":  "word_order",
                                                             "words":  [
                                                                           "I",
                                                                           "have",
                                                                           "some",
                                                                           "money"
                                                                       ],
                                                             "correctOrder":  [
                                                                                  "I",
                                                                                  "have",
                                                                                  "some",
                                                                                  "money"
                                                                              ],
                                                             "hint":  "Frase afirmativa: usa \u0027some\u0027 con un sustantivo incontable."
                                                         },
                                                         {
                                                             "type":  "word_order",
                                                             "words":  [
                                                                           "How",
                                                                           "many",
                                                                           "books",
                                                                           "do",
                                                                           "you",
                                                                           "have",
                                                                           "?"
                                                                       ],
                                                             "correctOrder":  [
                                                                                  "How",
                                                                                  "many",
                                                                                  "books",
                                                                                  "do",
                                                                                  "you",
                                                                                  "have",
                                                                                  "?"
                                                                              ],
                                                             "hint":  "Pregunta con un sustantivo contable: empieza con \u0027How many\u0027."
                                                         },
                                                         {
                                                             "type":  "multiple_choice",
                                                             "question":  "We have ___ bread on the table.",
                                                             "options":  [
                                                                             "many",
                                                                             "how much",
                                                                             "a lot of"
                                                                         ],
                                                             "correctIndex":  2,
                                                             "explanation":  "A lot of works with uncountable nouns like bread; many is only for countable nouns and how much is a question word."
                                                         }
                                                     ],
                                       "xpReward":  40,
                                       "mascotState":  "explaining",
                                       "nextLessonId":  "core-grammar-10-modals-ability"
                                   },
    "core-grammar-10-modals-ability":  {
                                           "lessonId":  "core-grammar-10-modals-ability",
                                           "level":  "A2",
                                           "track":  "Core Grammar",
                                           "title":  "Modals: Ability \u0026 Permission",
                                           "explanation":  {
                                                               "body":  "We use \u0027can\u0027 and \u0027can\u0027t\u0027 to talk about ability now and \u0027could\u0027 / \u0027couldn\u0027t\u0027 for ability in the past. After these modals we use the base verb with no \u0027to\u0027 and no \u0027-s\u0027 (she can swim, NOT she can swims). To ask for permission, start the question with \u0027Can I...?\u0027. (En espanol: \u0027can\u0027 = poder/saber hacer algo; el verbo va en su forma base.)",
                                                               "examples":  [
                                                                                {
                                                                                    "en":  "I can speak English.",
                                                                                    "es":  "Yo se hablar ingles."
                                                                                },
                                                                                {
                                                                                    "en":  "He can\u0027t come today.",
                                                                                    "es":  "El no puede venir hoy."
                                                                                },
                                                                                {
                                                                                    "en":  "When she was young, she could run fast.",
                                                                                    "es":  "Cuando era joven, ella podia correr rapido."
                                                                                },
                                                                                {
                                                                                    "en":  "Can I sit here?",
                                                                                    "es":  "Puedo sentarme aqui?"
                                                                                }
                                                                            ]
                                                           },
                                           "exercises":  [
                                                             {
                                                                 "type":  "multiple_choice",
                                                                 "question":  "She ___ swim very well.",
                                                                 "options":  [
                                                                                 "can",
                                                                                 "can to",
                                                                                 "cans"
                                                                             ],
                                                                 "correctIndex":  0,
                                                                 "explanation":  "After \u0027can\u0027 we use the base verb with no \u0027to\u0027 and no \u0027-s\u0027, so \u0027can swim\u0027 is correct (not \u0027can to swim\u0027 or \u0027cans swim\u0027)."
                                                             },
                                                             {
                                                                 "type":  "word_order",
                                                                 "words":  [
                                                                               "Can",
                                                                               "I",
                                                                               "open",
                                                                               "the",
                                                                               "window",
                                                                               "?"
                                                                           ],
                                                                 "correctOrder":  [
                                                                                      "Can",
                                                                                      "I",
                                                                                      "open",
                                                                                      "the",
                                                                                      "window",
                                                                                      "?"
                                                                                  ],
                                                                 "hint":  "Pide permiso para abrir la ventana (Can I...?)."
                                                             },
                                                             {
                                                                 "type":  "multiple_choice",
                                                                 "question":  "When I was five, I ___ read.",
                                                                 "options":  [
                                                                                 "can\u0027t",
                                                                                 "couldn\u0027t",
                                                                                 "not could"
                                                                             ],
                                                                 "correctIndex":  1,
                                                                 "explanation":  "We use \u0027could/couldn\u0027t\u0027 to talk about ability in the past, so \u0027couldn\u0027t read\u0027 is correct."
                                                             },
                                                             {
                                                                 "type":  "word_order",
                                                                 "words":  [
                                                                               "I",
                                                                               "can\u0027t",
                                                                               "drive",
                                                                               "a",
                                                                               "car"
                                                                           ],
                                                                 "correctOrder":  [
                                                                                      "I",
                                                                                      "can\u0027t",
                                                                                      "drive",
                                                                                      "a",
                                                                                      "car"
                                                                                  ],
                                                                 "hint":  "Di que no sabes (no puedes) conducir un coche."
                                                             },
                                                             {
                                                                 "type":  "multiple_choice",
                                                                 "question":  "___ use your phone, please?",
                                                                 "options":  [
                                                                                 "Can I to",
                                                                                 "I can",
                                                                                 "Can I"
                                                                             ],
                                                                 "correctIndex":  2,
                                                                 "explanation":  "To ask for permission we put the modal first: \u0027Can I...?\u0027 followed by the base verb."
                                                             }
                                                         ],
                                           "xpReward":  40,
                                           "mascotState":  "explaining",
                                           "nextLessonId":  "core-grammar-11-going-to"
                                       },
    "core-grammar-11-going-to":  {
      lessonId: "core-grammar-11-going-to", level: "A2", track: "Core Grammar", topic: "grammar", skill: "grammar", tipo: "aprende", title: "Will: decisiones del momento y ofrecimientos", rev: 2, xpReward: 40,
      mascotState: "explaining", nextLessonId: "core-grammar-12-present-perfect",
      explanation: {
        body: "Suena el timbre y dices: I'll get it! Usamos will cuando decidimos algo en ese momento, para ofrecer ayuda y para prometer. will + verbo (igual para todas las personas): I will help. Contracción: I'll, you'll, she'll. Negativo: won't (will not). Usos: decisión en el momento (I'll have the soup), ofrecimiento (I'll carry that), promesa (I won't tell anyone). Si el plan ya estaba decidido antes, usa going to.",
        examples: [
          { en: "The doorbell! I'll get it!", es: "¡El timbre! ¡Yo abro!" },
          { en: "Thanks! Oh, these bags are heavy.", es: "¡Gracias! Uf, estas bolsas pesan." },
          { en: "Give them to me. I'll carry them.", es: "Dámelas. Yo las llevo." },
          { en: "You're the best. I promise I'll cook dinner tonight.", es: "Eres el mejor. Te prometo que hoy hago la cena." }
        ],
        sections: [
          { kind: "intro", body: "Suena el timbre y dices: I'll get it! Usamos will cuando decidimos algo en ese momento, para ofrecer ayuda y para prometer." },
          {
            kind: "regla",
            body: "will + verbo (igual para todas las personas): I will help. Contracción: I'll, you'll, she'll. Negativo: won't (will not). Usos: decisión en el momento (I'll have the soup), ofrecimiento (I'll carry that), promesa (I won't tell anyone). Si el plan ya estaba decidido antes, usa going to."
          },
          {
            kind: "vocab",
            items: [
              { en: "I'll (I will)", ipa: "aɪl", es: "yo + futuro (lo haré)" },
              { en: "won't (will not)", ipa: "wəʊnt", es: "no + futuro (no lo haré)" },
              { en: "promise", ipa: "ˈprɒmɪs", es: "prometer" },
              { en: "offer", ipa: "ˈɒfə", es: "ofrecer" },
              { en: "carry", ipa: "ˈkæri", es: "cargar / llevar" },
              { en: "answer", ipa: "ˈɑːnsə", es: "contestar" },
              { en: "forget", ipa: "fəˈɡet", es: "olvidar" },
              { en: "heavy", ipa: "ˈhevi", es: "pesado" }
            ]
          },
          {
            kind: "expresiones",
            items: [
              { en: "I'll get it!", es: "¡Yo abro! / ¡Yo contesto!" },
              { en: "I'll have the...", es: "Para mí, el... (al pedir)" },
              { en: "I promise I won't...", es: "Te prometo que no..." },
              { en: "Don't worry, I'll do it.", es: "Tranquilo, yo lo hago." }
            ]
          },
          {
            kind: "ejemplos",
            items: [
              { en: "Sam: The doorbell! I'll get it!", es: "Sam: ¡El timbre! ¡Yo abro!" },
              { en: "Mia: Thanks! Oh, these bags are heavy.", es: "Mia: ¡Gracias! Uf, estas bolsas pesan." },
              { en: "Sam: Give them to me. I'll carry them.", es: "Sam: Dámelas. Yo las llevo." },
              { en: "Mia: You're the best. I promise I'll cook dinner tonight.", es: "Mia: Eres el mejor. Te prometo que hoy hago la cena." }
            ]
          },
          {
            kind: "errores",
            items: [
              { no: "I help you with that. (ofrecimiento)", si: "I'll help you with that.", pq: "Para ofrecer algo en el momento usa will." },
              { no: "I will to call you.", si: "I will call you.", pq: "will + verbo sin to." },
              { no: "I willn't forget.", si: "I won't forget.", pq: "will not = won't." }
            ]
          },
          { kind: "resumen", body: "will / 'll + verbo: decisiones en el momento, ofrecimientos y promesas. won't = will not. Planes ya decididos: going to." },
          { kind: "puente", body: "Practica: decide, ofrece y promete como Sam." }
        ]
      },
      exercises: [
        {
          type: "listening", text: "It's cold in here. — OK, I'll close the window.", question: "¿Qué va a hacer?", options: ["Cerrar la ventana", "Abrir la puerta", "Encender la calefacción"], correctIndex: 0
        },
        {
          type: "multiple_choice", question: "The phone is ringing! — ___", options: ["I'll answer it!", "I answer it!", "I'm answer it!"], correctIndex: 0,
          explanation: "Decisión en el momento: I'll answer it."
        },
        {
          type: "matching", instruction: "Une cada situación con el ofrecimiento lógico.",
          pairs: [
            { l: "These bags are heavy.", r: "I'll carry one." },
            { l: "I'm thirsty.", r: "I'll get you some water." },
            { l: "I don't understand this.", r: "I'll explain it." },
            { l: "It's dark in here.", r: "I'll turn on the light." }
          ]
        },
        {
          type: "find_error",
          segments: ["I ", { u: "will" }, " ", { u: "to call" }, " you ", { u: "tomorrow" }, "."],
          correctIndex: 1, correction: "call", explanation: "will + verbo sin to: I will call you tomorrow.", question: "Encuentra el error"
        },
        { type: "fill_blank", sentence: "Don't worry, I ___ tell anyone. I promise!", answers: ["won't", "will not"], hint: "Promesa en negativo.", explanation: "I won't tell anyone." },
        {
          type: "categorize", instruction: "¿Decisión del momento (will) o plan ya decidido (going to)?",
          buckets: [{ id: "will", label: "will" }, { id: "going", label: "going to" }],
          items: [
            { t: "Oh, it's raining! I'll take an umbrella.", bucket: "will" },
            { t: "The phone! I'll get it.", bucket: "will" },
            { t: "I'll have the chicken, please.", bucket: "will" },
            { t: "We're going to visit Spain in July. We have the tickets.", bucket: "going" },
            { t: "I'm going to study medicine next year.", bucket: "going" },
            { t: "She's going to start a new job on Monday.", bucket: "going" }
          ]
        },
        { type: "word_order", words: ["bags", "I'll", "your", "carry"], correctOrder: ["I'll", "carry", "your", "bags"], hint: "Un ofrecimiento con I'll." },
        { type: "translate", prompt: "Traduce: \"Yo te ayudo.\" (ofrecimiento en el momento)", answers: ["i'll help you", "i will help you"], explanation: "I'll help you." }
      ]
    },
    "core-grammar-12-present-perfect":  {
                                            "lessonId":  "core-grammar-12-present-perfect",
                                            "level":  "B1",
                                            "track":  "Core Grammar",
                                            "title":  "Present Perfect",
                                            "tipo":  "aprende",
                                            "explanation":  {
                                                                "body":  "We use the present perfect (have/has + past participle) to talk about life experiences without saying when, and about situations that started in the past and are still true now. We often use it with ever and never (experiences), already and yet (recent actions), and for and since (duration). Use the past simple instead when you say a finished time, like yesterday or in 2019.",
                                                                "examples":  [
                                                                                 {
                                                                                     "en":  "I have visited London twice."
                                                                                 },
                                                                                 {
                                                                                     "en":  "She has lived here since 2020."
                                                                                 },
                                                                                 {
                                                                                     "en":  "Have you ever eaten sushi?"
                                                                                 },
                                                                                 {
                                                                                     "en":  "We saw that film yesterday."
                                                                                 }
                                                                             ],
                                              "sections":  [
                                                {
                                                  "kind": "intro",
                                                  "body": "The present perfect connects the past with now: your experiences (\"I've been to Cancún\"), things that have just happened, and situations that started before and continue today. The golden rule: if you say WHEN it happened, you can't use it."
                                                },
                                                {
                                                  "kind": "regla",
                                                  "body": "Form: have / has + past participle: I have visited, she has lived. Negative: haven't / hasn't. Question: Have you…? Has she…? Use it for experiences with no date (ever, never), recent results (already, just, yet) and situations that started and continue (for, since). If you name a finished time (yesterday, last year, in 2019, two days ago), use the past simple."
                                                },
                                                {
                                                  "kind": "vocab",
                                                  "items": [
                                                    {
                                                      "en": "ever",
                                                      "ipa": "ˈevər",
                                                      "es": "at any time in your life (questions)"
                                                    },
                                                    {
                                                      "en": "never",
                                                      "ipa": "ˈnevər",
                                                      "es": "at no time in your life"
                                                    },
                                                    {
                                                      "en": "already",
                                                      "ipa": "ɔːlˈredi",
                                                      "es": "sooner than expected"
                                                    },
                                                    {
                                                      "en": "yet",
                                                      "ipa": "jet",
                                                      "es": "until now (negatives & questions)"
                                                    },
                                                    {
                                                      "en": "just",
                                                      "ipa": "dʒʌst",
                                                      "es": "a very short time ago"
                                                    },
                                                    {
                                                      "en": "for / since",
                                                      "ipa": "fɔːr / sɪns",
                                                      "es": "a period of time / a starting point"
                                                    }
                                                  ]
                                                },
                                                {
                                                  "kind": "expresiones",
                                                  "items": [
                                                    {
                                                      "en": "Have you ever been to…?",
                                                      "es": "ask about someone's experiences"
                                                    },
                                                    {
                                                      "en": "I've never tried it.",
                                                      "es": "a lifetime experience you don't have"
                                                    },
                                                    {
                                                      "en": "I've just finished.",
                                                      "es": "a result a moment ago"
                                                    },
                                                    {
                                                      "en": "I haven't decided yet.",
                                                      "es": "something still pending"
                                                    }
                                                  ]
                                                },
                                                {
                                                  "kind": "ejemplos",
                                                  "items": [
                                                    {
                                                      "en": "I've studied English for three years."
                                                    },
                                                    {
                                                      "en": "She has lived in Monterrey since 2020."
                                                    },
                                                    {
                                                      "en": "Have you ever travelled abroad for work?"
                                                    },
                                                    {
                                                      "en": "We saw that film yesterday."
                                                    }
                                                  ]
                                                },
                                                {
                                                  "kind": "errores",
                                                  "items": [
                                                    {
                                                      "no": "I have seen him yesterday.",
                                                      "si": "I saw him yesterday.",
                                                      "pq": "A finished time (yesterday) needs the past simple."
                                                    },
                                                    {
                                                      "no": "I live here since 2020.",
                                                      "si": "I have lived here since 2020.",
                                                      "pq": "Something that started in the past and continues today takes the present perfect, not the present simple."
                                                    },
                                                    {
                                                      "no": "She have finished.",
                                                      "si": "She has finished.",
                                                      "pq": "He, she and it take has."
                                                    },
                                                    {
                                                      "no": "I have went to Mexico City.",
                                                      "si": "I have been to Mexico City.",
                                                      "pq": "After have we use the past participle (been, gone), not the past simple (went)."
                                                    },
                                                    {
                                                      "no": "Did you ever eat sushi?",
                                                      "si": "Have you ever eaten sushi?",
                                                      "pq": "For lifetime experiences: Have you ever + past participle."
                                                    }
                                                  ]
                                                },
                                                {
                                                  "kind": "resumen",
                                                  "body": "have / has + past participle for experiences, recent results and things that continue until now. Are you saying when (yesterday, in 2019, ago)? Then use the past simple."
                                                },
                                                {
                                                  "kind": "puente",
                                                  "body": "Your turn: a few quick exercises to master it."
                                                }
                                              ]
                                            },
                                            "exercises":  [
                                                              {
                                                                  "type":  "multiple_choice",
                                                                  "question":  "Choose the correct sentence: She ___ in Madrid for ten years.",
                                                                  "options":  [
                                                                                  "has lived",
                                                                                  "have lived",
                                                                                  "has live"
                                                                              ],
                                                                  "correctIndex":  0,
                                                                  "explanation":  "With \u0027she\u0027 we use \u0027has\u0027 plus the past participle \u0027lived\u0027 for an unfinished period of time."
                                                              },
                                                              {
                                                                  "type":  "word_order",
                                                                  "words":  [
                                                                                "I",
                                                                                "have",
                                                                                "never",
                                                                                "been",
                                                                                "to",
                                                                                "Japan"
                                                                            ],
                                                                  "correctOrder":  [
                                                                                       "I",
                                                                                       "have",
                                                                                       "never",
                                                                                       "been",
                                                                                       "to",
                                                                                       "Japan"
                                                                                   ],
                                                                  "hint":  "Talk about an experience you have never had. Start with 'I'."
                                                              },
                                                              {
                                                                  "type":  "multiple_choice",
                                                                  "question":  "Which option is correct? We finished the project ___.",
                                                                  "options":  [
                                                                                  "yet",
                                                                                  "last week",
                                                                                  "since Monday"
                                                                              ],
                                                                  "correctIndex":  1,
                                                                  "explanation":  "\u0027Finished\u0027 is past simple, so it needs a finished time expression like \u0027last week\u0027, not present perfect words."
                                                              },
                                                              {
                                                                  "type":  "word_order",
                                                                  "words":  [
                                                                                "Have",
                                                                                "you",
                                                                                "finished",
                                                                                "your",
                                                                                "homework",
                                                                                "yet",
                                                                                "?"
                                                                            ],
                                                                  "correctOrder":  [
                                                                                       "Have",
                                                                                       "you",
                                                                                       "finished",
                                                                                       "your",
                                                                                       "homework",
                                                                                       "yet",
                                                                                       "?"
                                                                                   ],
                                                                  "hint":  "It's a question with 'yet' at the end. Start with the auxiliary 'Have'."
                                                              },
                                                              {
                                                                  "type":  "multiple_choice",
                                                                  "question":  "Complete the question: ___ you ever tried Thai food?",
                                                                  "options":  [
                                                                                  "Has",
                                                                                  "Did",
                                                                                  "Have"
                                                                              ],
                                                                  "correctIndex":  2,
                                                                  "explanation":  "For experiences with \u0027ever\u0027 and the subject \u0027you\u0027, we use the auxiliary \u0027Have\u0027."
                                                              }
                                                          ],
                                            "xpReward":  50,
                                            "mascotState":  "explaining",
                                            "nextLessonId":  "core-grammar-13-first-conditional"
                                        },
    "core-grammar-13-first-conditional":  {
                                              "lessonId":  "core-grammar-13-first-conditional",
                                              "level":  "B1",
                                              "track":  "Core Grammar",
                                              "title":  "First Conditional",
                                              "explanation":  {
                                                                  "body":  "Use the first conditional to talk about real possibilities in the future. The structure is: If + present simple, ... will + base verb. When the if-clause comes first, put a comma after it; when it comes second, no comma is needed. You can also use \"unless\" to mean \"if not.\"",
                                                                  "examples":  [
                                                                                   {
                                                                                       "en":  "If it rains tomorrow, we will stay at home."
                                                                                   },
                                                                                   {
                                                                                       "en":  "She will pass the exam if she studies hard."
                                                                                   },
                                                                                   {
                                                                                       "en":  "Unless you hurry, you will miss the bus."
                                                                                   },
                                                                                   {
                                                                                       "en":  "If I have time, I will call you tonight."
                                                                                   }
                                                                               ]
                                                              },
                                              "exercises":  [
                                                                {
                                                                    "type":  "multiple_choice",
                                                                    "question":  "If the weather is nice, we ___ to the beach.",
                                                                    "options":  [
                                                                                    "will go",
                                                                                    "go will",
                                                                                    "will to go"
                                                                                ],
                                                                    "correctIndex":  0,
                                                                    "explanation":  "The main clause needs \"will\" + the base verb, so \"will go\" is correct."
                                                                },
                                                                {
                                                                    "type":  "word_order",
                                                                    "words":  [
                                                                                  "If",
                                                                                  "you",
                                                                                  "call",
                                                                                  "me,",
                                                                                  "I",
                                                                                  "will",
                                                                                  "answer."
                                                                              ],
                                                                    "correctOrder":  [
                                                                                         "If",
                                                                                         "you",
                                                                                         "call",
                                                                                         "me,",
                                                                                         "I",
                                                                                         "will",
                                                                                         "answer."
                                                                                     ],
                                                                    "hint":  "Start with the \"if\" clause and remember the comma."
                                                                },
                                                                {
                                                                    "type":  "multiple_choice",
                                                                    "question":  "Unless he ___ now, he will be late.",
                                                                    "options":  [
                                                                                    "leave",
                                                                                    "will leave",
                                                                                    "leaves"
                                                                                ],
                                                                    "correctIndex":  2,
                                                                    "explanation":  "After \"unless\" we use the present simple, and with \"he\" the verb needs an -s, so \"leaves\" is correct."
                                                                },
                                                                {
                                                                    "type":  "word_order",
                                                                    "words":  [
                                                                                  "We",
                                                                                  "will",
                                                                                  "win",
                                                                                  "if",
                                                                                  "we",
                                                                                  "practise."
                                                                              ],
                                                                    "correctOrder":  [
                                                                                         "We",
                                                                                         "will",
                                                                                         "win",
                                                                                         "if",
                                                                                         "we",
                                                                                         "practise."
                                                                                     ],
                                                                    "hint":  "Here the \"if\" clause goes at the end, with no comma."
                                                                },
                                                                {
                                                                    "type":  "multiple_choice",
                                                                    "question":  "If she ___ early, she will catch the train.",
                                                                    "options":  [
                                                                                    "wake up",
                                                                                    "wakes up",
                                                                                    "will wake up"
                                                                                ],
                                                                    "correctIndex":  1,
                                                                    "explanation":  "The if-clause uses the present simple, and with \"she\" we add -s, so \"wakes up\" is correct."
                                                                }
                                                            ],
                                              "xpReward":  50,
                                              "mascotState":  "explaining",
                                              "nextLessonId":  "core-grammar-14-past-continuous"
                                          },
    "core-grammar-14-past-continuous":  {
                                            "lessonId":  "core-grammar-14-past-continuous",
                                            "level":  "B1",
                                            "track":  "Core Grammar",
                                            "title":  "Past Continuous",
                                            "explanation":  {
                                                                "body":  "We use the past continuous to talk about an action that was in progress at a moment in the past. We form it with was or were plus the -ing form of the verb (for example, I was reading, they were playing). We often combine it with the past simple using when and while: the past continuous shows the longer background action, and the past simple shows the shorter action that interrupted it.",
                                                                "examples":  [
                                                                                 {
                                                                                     "en":  "I was cooking dinner when she called me."
                                                                                 },
                                                                                 {
                                                                                     "en":  "While we were watching the film, the lights went out."
                                                                                 },
                                                                                 {
                                                                                     "en":  "They were studying at eight o\u0027clock last night."
                                                                                 },
                                                                                 {
                                                                                     "en":  "What were you doing when it started to rain?"
                                                                                 }
                                                                             ]
                                                            },
                                            "exercises":  [
                                                              {
                                                                  "type":  "multiple_choice",
                                                                  "question":  "Choose the correct sentence: an action in progress when the phone rang.",
                                                                  "options":  [
                                                                                  "I was sleeping when the phone rang.",
                                                                                  "I was sleep when the phone rang.",
                                                                                  "I were sleeping when the phone rang."
                                                                              ],
                                                                  "correctIndex":  0,
                                                                  "explanation":  "The past continuous needs was/were plus the -ing form, and with I we use was sleeping."
                                                              },
                                                              {
                                                                  "type":  "word_order",
                                                                  "words":  [
                                                                                "She",
                                                                                "was",
                                                                                "reading",
                                                                                "a",
                                                                                "book"
                                                                            ],
                                                                  "correctOrder":  [
                                                                                       "She",
                                                                                       "was",
                                                                                       "reading",
                                                                                       "a",
                                                                                       "book"
                                                                                   ],
                                                                  "hint":  "Subject + was + verb-ing (an action in progress)."
                                                              },
                                                              {
                                                                  "type":  "multiple_choice",
                                                                  "question":  "Complete: While we ___ lunch, our friends arrived.",
                                                                  "options":  [
                                                                                  "was having",
                                                                                  "were have",
                                                                                  "were having"
                                                                              ],
                                                                  "correctIndex":  2,
                                                                  "explanation":  "With we we use were, plus the -ing form having, for the background action."
                                                              },
                                                              {
                                                                  "type":  "word_order",
                                                                  "words":  [
                                                                                "They",
                                                                                "were",
                                                                                "playing",
                                                                                "in",
                                                                                "the",
                                                                                "garden"
                                                                            ],
                                                                  "correctOrder":  [
                                                                                       "They",
                                                                                       "were",
                                                                                       "playing",
                                                                                       "in",
                                                                                       "the",
                                                                                       "garden"
                                                                                   ],
                                                                  "hint":  "Use were + verb-ing for an action in progress."
                                                              },
                                                              {
                                                                  "type":  "multiple_choice",
                                                                  "question":  "Choose the correct question about a past action in progress.",
                                                                  "options":  [
                                                                                  "What were you do then?",
                                                                                  "What were you doing then?",
                                                                                  "What you were doing then?"
                                                                              ],
                                                                  "correctIndex":  1,
                                                                  "explanation":  "In questions the auxiliary were comes before the subject, followed by the -ing form doing."
                                                              }
                                                          ],
                                            "xpReward":  50,
                                            "mascotState":  "explaining",
                                            "nextLessonId":  "core-grammar-15-will-vs-going-to"
                                        },
    "core-grammar-15-will-vs-going-to":  {
                                             "lessonId":  "core-grammar-15-will-vs-going-to",
                                             "level":  "B1",
                                             "track":  "Core Grammar",
                                             "title":  "will vs be going to",
                                             "explanation":  {
                                                                 "body":  "Use will for instant decisions made at the moment of speaking, for predictions about the future, and for offers and promises. Use be going to for plans and intentions you decided before now, and for predictions based on present evidence you can see. Both talk about the future, but the speaker's reason for choosing each one is different.",
                                                                 "examples":  [
                                                                                  {
                                                                                      "en":  "The phone is ringing. I\u0027ll answer it."
                                                                                  },
                                                                                  {
                                                                                      "en":  "We are going to visit my grandma next weekend."
                                                                                  },
                                                                                  {
                                                                                      "en":  "Look at those dark clouds. It\u0027s going to rain."
                                                                                  },
                                                                                  {
                                                                                      "en":  "Don\u0027t worry, I\u0027ll help you with your homework."
                                                                                  }
                                                                              ]
                                                             },
                                             "exercises":  [
                                                               {
                                                                   "type":  "multiple_choice",
                                                                   "question":  "The bags look heavy. ___ carry one for you.",
                                                                   "options":  [
                                                                                   "I\u0027ll",
                                                                                   "I\u0027m going to",
                                                                                   "I going to"
                                                                               ],
                                                                   "correctIndex":  0,
                                                                   "explanation":  "This is an offer decided at the moment of speaking, so we use \"will\"."
                                                               },
                                                               {
                                                                   "type":  "word_order",
                                                                   "words":  [
                                                                                 "We",
                                                                                 "are",
                                                                                 "going",
                                                                                 "to",
                                                                                 "buy",
                                                                                 "a",
                                                                                 "house"
                                                                             ],
                                                                   "correctOrder":  [
                                                                                        "We",
                                                                                        "are",
                                                                                        "going",
                                                                                        "to",
                                                                                        "buy",
                                                                                        "a",
                                                                                        "house"
                                                                                    ],
                                                                   "hint":  "A plan you have already decided: use \"be going to\"."
                                                               },
                                                               {
                                                                   "type":  "multiple_choice",
                                                                   "question":  "Look at the sky! It ___ snow soon.",
                                                                   "options":  [
                                                                                   "going to",
                                                                                   "is going to",
                                                                                   "will going to"
                                                                               ],
                                                                   "correctIndex":  1,
                                                                   "explanation":  "There is present evidence (the dark sky), so we use \"be going to\" for the prediction."
                                                               },
                                                               {
                                                                   "type":  "word_order",
                                                                   "words":  [
                                                                                 "I",
                                                                                 "think",
                                                                                 "she",
                                                                                 "will",
                                                                                 "win"
                                                                             ],
                                                                   "correctOrder":  [
                                                                                        "I",
                                                                                        "think",
                                                                                        "she",
                                                                                        "will",
                                                                                        "win"
                                                                                    ],
                                                                   "hint":  "A prediction based on opinion (I think): use \"will\"."
                                                               },
                                                               {
                                                                   "type":  "multiple_choice",
                                                                   "question":  "I\u0027ve already decided. I ___ study medicine.",
                                                                   "options":  [
                                                                                   "will to",
                                                                                   "going to",
                                                                                   "am going to"
                                                                               ],
                                                                   "correctIndex":  2,
                                                                   "explanation":  "The decision was made before now, so we use \"be going to\" for the plan."
                                                               }
                                                           ],
                                             "xpReward":  50,
                                             "mascotState":  "explaining",
                                             "nextLessonId":  "core-grammar-16-present-perfect-continuous"
                                         },
    "core-grammar-16-present-perfect-continuous":  {
                                                       "lessonId":  "core-grammar-16-present-perfect-continuous",
                                                       "level":  "B2",
                                                       "track":  "Core Grammar",
                                                       "title":  "Present Perfect Continuous",
                                                       "tipo":  "aprende",
                                                       "explanation":  {
                                                                           "body":  "We use the present perfect continuous (have/has been + verb-ing) to talk about an activity that started in the past and is still happening now, or that has just stopped but leaves a visible result in the present. It often goes with 'for', 'since', 'lately' and 'recently' and stresses the duration or repetition of the activity. The present perfect simple, by contrast, focuses on a completed result or a finished number of things ('I've written three emails').",
                                                                           "examples":  [
                                                                                            {
                                                                                                "en":  "I\u0027ve been waiting for the bus for twenty minutes."
                                                                                            },
                                                                                            {
                                                                                                "en":  "She\u0027s tired because she has been running."
                                                                                            },
                                                                                            {
                                                                                                "en":  "We\u0027ve been living in Madrid since 2019."
                                                                                            },
                                                                                            {
                                                                                                "en":  "He has written two reports today, but I\u0027ve been writing one all day."
                                                                                            }
                                                                                        ],
                                                         "sections":  [
                                                           {
                                                             "kind": "intro",
                                                             "body": "The present perfect continuous zooms in on the activity: how long you've been doing something, or why it's obvious you were doing it (\"I've been waiting for an hour\", \"my hands are dirty because I've been gardening\")."
                                                           },
                                                           {
                                                             "kind": "regla",
                                                             "body": "Form: have / has been + verb-ing: I've been waiting, she's been running. Negative: haven't / hasn't been + -ing. Question: How long have you been…? It goes with for, since, all day, lately and recently. Compared with the present perfect simple: the continuous focuses on the activity and its duration; the simple focuses on the finished result or how many times (I've written three emails)."
                                                           },
                                                           {
                                                             "kind": "vocab",
                                                             "items": [
                                                               {
                                                                 "en": "lately",
                                                                 "ipa": "ˈleɪtli",
                                                                 "es": "in the last few days or weeks"
                                                               },
                                                               {
                                                                 "en": "recently",
                                                                 "ipa": "ˈriːsəntli",
                                                                 "es": "not long ago"
                                                               },
                                                               {
                                                                 "en": "all morning / all day",
                                                                 "es": "the whole morning / the whole day"
                                                               },
                                                               {
                                                                 "en": "How long…?",
                                                                 "ipa": "haʊ lɔːŋ",
                                                                 "es": "ask about duration"
                                                               },
                                                               {
                                                                 "en": "for ages",
                                                                 "ipa": "fər ˈeɪdʒɪz",
                                                                 "es": "(informal) for a very long time"
                                                               }
                                                             ]
                                                           },
                                                           {
                                                             "kind": "expresiones",
                                                             "items": [
                                                               {
                                                                 "en": "How long have you been waiting?",
                                                                 "es": "ask about duration until now"
                                                               },
                                                               {
                                                                 "en": "I've been meaning to call you.",
                                                                 "es": "you've wanted to do it for a while"
                                                               },
                                                               {
                                                                 "en": "What have you been up to?",
                                                                 "es": "a friendly 'what's new?'"
                                                               },
                                                               {
                                                                 "en": "Sorry, I've been working all day.",
                                                                 "es": "explain why you're tired / late to reply"
                                                               }
                                                             ]
                                                           },
                                                           {
                                                             "kind": "ejemplos",
                                                             "items": [
                                                               {
                                                                 "en": "I've been learning English for two years, and it's starting to feel natural."
                                                               },
                                                               {
                                                                 "en": "She's out of breath because she's been running."
                                                               },
                                                               {
                                                                 "en": "We've been living in Guadalajara since 2019."
                                                               },
                                                               {
                                                                 "en": "He has written two reports today, but I've been writing this one all day."
                                                               }
                                                             ]
                                                           },
                                                           {
                                                             "kind": "errores",
                                                             "items": [
                                                               {
                                                                 "no": "I am waiting here for an hour.",
                                                                 "si": "I've been waiting here for an hour.",
                                                                 "pq": "Duration until now: have been + -ing, not the present continuous."
                                                               },
                                                               {
                                                                 "no": "I've been knowing her for years.",
                                                                 "si": "I've known her for years.",
                                                                 "pq": "State verbs (know, have, like) take the present perfect simple."
                                                               },
                                                               {
                                                                 "no": "I've been reading three books this month.",
                                                                 "si": "I've read three books this month.",
                                                                 "pq": "If you count finished results, use the simple form."
                                                               },
                                                               {
                                                                 "no": "How long are you living here?",
                                                                 "si": "How long have you been living here?",
                                                                 "pq": "\"How long…?\" up to now needs the present perfect."
                                                               },
                                                               {
                                                                 "no": "She has been work all day.",
                                                                 "si": "She has been working all day.",
                                                                 "pq": "After been, the verb takes -ing."
                                                               }
                                                             ]
                                                           },
                                                           {
                                                             "kind": "resumen",
                                                             "body": "have / has been + -ing for the duration or the visible traces of an activity. Results and counts go in the simple form; state verbs always go in the simple form."
                                                           },
                                                           {
                                                             "kind": "puente",
                                                             "body": "Your turn: a few quick exercises to master it."
                                                           }
                                                         ]
                                                       },
                                                       "exercises":  [
                                                                         {
                                                                             "type":  "multiple_choice",
                                                                             "question":  "Why are your hands so dirty? — I ___ in the garden all morning.",
                                                                             "options":  [
                                                                                             "have been working",
                                                                                             "have worked",
                                                                                             "am working"
                                                                                         ],
                                                                             "correctIndex":  0,
                                                                             "explanation":  "The present perfect continuous links the ongoing activity to its visible present result (the dirty hands), so it is the natural choice here. \u0027Have worked\u0027 would stress completion and \u0027am working\u0027 wrongly uses the present continuous for something connected to a past period."
                                                                         },
                                                                         {
                                                                             "type":  "word_order",
                                                                             "words":  [
                                                                                           "She",
                                                                                           "has",
                                                                                           "been",
                                                                                           "studying",
                                                                                           "French",
                                                                                           "since",
                                                                                           "January"
                                                                                       ],
                                                                             "correctOrder":  [
                                                                                                  "She",
                                                                                                  "has",
                                                                                                  "been",
                                                                                                  "studying",
                                                                                                  "French",
                                                                                                  "since",
                                                                                                  "January"
                                                                                              ],
                                                                             "hint":  "Use the present perfect continuous with 'since' for an action that continues until now."
                                                                         },
                                                                         {
                                                                             "type":  "multiple_choice",
                                                                             "question":  "Which sentence focuses on the completed result rather than the ongoing activity?",
                                                                             "options":  [
                                                                                             "I\u0027ve been reading the same chapter for an hour.",
                                                                                             "I\u0027ve been reading all afternoon.",
                                                                                             "I\u0027ve read three books this week."
                                                                                         ],
                                                                             "correctIndex":  2,
                                                                             "explanation":  "The present perfect simple emphasises the finished quantity (three books), not the duration of the activity. The other two use the continuous to stress how long the reading has gone on."
                                                                         },
                                                                         {
                                                                             "type":  "word_order",
                                                                             "words":  [
                                                                                           "They",
                                                                                           "have",
                                                                                           "been",
                                                                                           "arguing",
                                                                                           "a",
                                                                                           "lot",
                                                                                           "lately"
                                                                                       ],
                                                                             "correctOrder":  [
                                                                                                  "They",
                                                                                                  "have",
                                                                                                  "been",
                                                                                                  "arguing",
                                                                                                  "a",
                                                                                                  "lot",
                                                                                                  "lately"
                                                                                              ],
                                                                             "hint":  "Put 'lately' at the end to talk about a recent, repeated trend."
                                                                         },
                                                                         {
                                                                             "type":  "multiple_choice",
                                                                             "question":  "How long ___ you waiting for the doctor? You look exhausted.",
                                                                             "options":  [
                                                                                             "have you being",
                                                                                             "have you been",
                                                                                             "did you been"
                                                                                         ],
                                                                             "correctIndex":  1,
                                                                             "explanation":  "With \u0027How long\u0027 and an action that is still going on with a present result (looking exhausted), the present perfect continuous is formed with \u0027have/has been + verb-ing\u0027: \u0027How long have you been waiting?\u0027. \u0027Did you been\u0027 and \u0027are you been\u0027 are not possible verb forms in English."
                                                                         }
                                                                     ],
                                                       "xpReward":  60,
                                                       "mascotState":  "explaining",
                                                       "nextLessonId":  "core-grammar-17-past-perfect"
                                                   },
    "core-grammar-17-past-perfect":  {
                                         "lessonId":  "core-grammar-17-past-perfect",
                                         "level":  "B2",
                                         "track":  "Core Grammar",
                                         "title":  "Past Perfect",
                                         "explanation":  {
                                                             "body":  "We use the past perfect (had + past participle) to talk about an action that was already completed before another moment or action in the past. The more recent past action is usually in the past simple, while the earlier one takes the past perfect. Linking words like before, after, when and by the time often signal which action came first.",
                                                             "examples":  [
                                                                              {
                                                                                  "en":  "When I got home, my family had already eaten dinner."
                                                                              },
                                                                              {
                                                                                  "en":  "She felt nervous because she had never spoken in public before."
                                                                              },
                                                                              {
                                                                                  "en":  "By the time the film started, we had bought our popcorn."
                                                                              },
                                                                              {
                                                                                  "en":  "After the guests had left, he cleaned the whole kitchen."
                                                                              }
                                                                          ]
                                                         },
                                         "exercises":  [
                                                           {
                                                               "type":  "multiple_choice",
                                                               "question":  "When we arrived at the station, the train ___.",
                                                               "options":  [
                                                                               "had already left",
                                                                               "has already left",
                                                                               "already left"
                                                                           ],
                                                               "correctIndex":  0,
                                                               "explanation":  "The past perfect (had left) marks the action that happened before we arrived, an earlier moment in the past. \u0027Has already left\u0027 is present perfect (wrong for a past context) and \u0027already left\u0027 lacks the auxiliary needed to show the earlier action."
                                                           },
                                                           {
                                                               "type":  "word_order",
                                                               "words":  [
                                                                             "By",
                                                                             "the",
                                                                             "time",
                                                                             "she",
                                                                             "called",
                                                                             "I",
                                                                             "had",
                                                                             "finished"
                                                                         ],
                                                               "correctOrder":  [
                                                                                    "By",
                                                                                    "the",
                                                                                    "time",
                                                                                    "she",
                                                                                    "called",
                                                                                    "I",
                                                                                    "had",
                                                                                    "finished"
                                                                                ],
                                                               "hint":  "Use 'By the time' + past simple, and the past perfect for what was already finished."
                                                           },
                                                           {
                                                               "type":  "multiple_choice",
                                                               "question":  "Choose the sentence that correctly contrasts the two past actions.",
                                                               "options":  [
                                                                               "After he locked the door, he had realised he didn\u0027t have his keys.",
                                                                               "After he had locked the door, he had realised he didn\u0027t have his keys.",
                                                                               "After he had locked the door, he realised he didn\u0027t have his keys."
                                                                           ],
                                                               "correctIndex":  2,
                                                               "explanation":  "The earlier action takes the past perfect (had locked) and the later one takes the past simple (realised). Putting the past perfect on the later action (options 2 and 3) reverses or confuses the time order."
                                                           },
                                                           {
                                                               "type":  "word_order",
                                                               "words":  [
                                                                             "They",
                                                                             "had",
                                                                             "never",
                                                                             "seen",
                                                                             "snow",
                                                                             "before",
                                                                             "they",
                                                                             "moved",
                                                                             "north"
                                                                         ],
                                                               "correctOrder":  [
                                                                                    "They",
                                                                                    "had",
                                                                                    "never",
                                                                                    "seen",
                                                                                    "snow",
                                                                                    "before",
                                                                                    "they",
                                                                                    "moved",
                                                                                    "north"
                                                                                ],
                                                               "hint":  "The past perfect describes the experience before moving; 'before' introduces the more recent action."
                                                           },
                                                           {
                                                               "type":  "multiple_choice",
                                                               "question":  "We couldn\u0027t get in because we ___ the tickets at home.",
                                                               "options":  [
                                                                               "were forgetting",
                                                                               "had forgotten",
                                                                               "forgot had"
                                                                           ],
                                                               "correctIndex":  1,
                                                               "explanation":  "The forgetting happened before \u0027we couldn\u0027t get in\u0027, so the past perfect (had forgotten) shows the earlier cause. \u0027Forgot had\u0027 is ungrammatical word order and \u0027were forgetting\u0027 (past continuous) does not express a completed earlier action."
                                                           }
                                                       ],
                                         "xpReward":  60,
                                         "mascotState":  "explaining",
                                         "nextLessonId":  "core-grammar-18-second-conditional"
                                     },
    "core-grammar-18-second-conditional":  {
      lessonId: "core-grammar-18-second-conditional", level: "B2", track: "Core Grammar", topic: "grammar", skill: "grammar", tipo: "aprende", title: "Wish and if only", rev: 2, xpReward: 60,
      mascotState: "explaining", nextLessonId: "core-grammar-19-passive-voice",
      explanation: {
        body: "Carmen's project is behind schedule, Daniel is stuck in a meeting he hates, and Tom has just spilled coffee on his laptop. Everyone at Lumen Travel is wishing for something different. Use wish and if only to talk about regrets and unreal situations. Present wishes (unreal now): wish / if only + past simple: I wish I had more time (but I don't). With be, 'were' is common in careful English: I wish I were taller ('was' is fine in conversation). Past regrets: wish / if only + past perfect: I wish I hadn't said that. Annoying behaviour you want to change: wish + would: I wish he would stop interrupting. Don't use would about yourself: I wish I could..., not I wish I would... If only is stronger and more emotional than I wish.",
        examples: [
          { en: "I wish we had another week for this project." },
          { en: "If only I hadn't agreed to join this meeting! It's been two hours." },
          { en: "I wish I hadn't put my coffee next to my laptop." },
          { en: "And I wish people would stop interrupting each other in meetings!" }
        ],
        sections: [
          {
            kind: "intro",
            body: "Carmen's project is behind schedule, Daniel is stuck in a meeting he hates, and Tom has just spilled coffee on his laptop. Everyone at Lumen Travel is wishing for something different. Use wish and if only to talk about regrets and unreal situations."
          },
          {
            kind: "regla",
            body: "Present wishes (unreal now): wish / if only + past simple: I wish I had more time (but I don't). With be, 'were' is common in careful English: I wish I were taller ('was' is fine in conversation). Past regrets: wish / if only + past perfect: I wish I hadn't said that. Annoying behaviour you want to change: wish + would: I wish he would stop interrupting. Don't use would about yourself: I wish I could..., not I wish I would... If only is stronger and more emotional than I wish."
          },
          {
            kind: "vocab",
            items: [
              { en: "wish", ipa: "wɪʃ", es: "want something that is impossible or unlikely" },
              { en: "regret", ipa: "rɪˈɡret", es: "feel sorry about something you did or didn't do" },
              { en: "if only", es: "used for a strong wish or regret" },
              { en: "behind schedule", es: "later than planned" },
              { en: "deadline", ipa: "ˈdedlaɪn", es: "the time by which something must be finished" },
              { en: "spill", ipa: "spɪl", es: "accidentally let liquid fall out of a container" },
              { en: "interrupt", ipa: "ˌɪntəˈrʌpt", es: "stop someone while they are speaking" },
              { en: "hindsight", ipa: "ˈhaɪndsaɪt", es: "understanding a situation only after it has happened" }
            ]
          },
          {
            kind: "expresiones",
            items: [
              { en: "I wish I had more time.", es: "a present wish" },
              { en: "If only I'd known!", es: "a strong past regret" },
              { en: "I wish you wouldn't do that.", es: "complain about someone's habit" },
              { en: "With hindsight, ...", es: "looking back with knowledge you have now" }
            ]
          },
          {
            kind: "ejemplos",
            items: [
              { en: "Carmen: I wish we had another week for this project." },
              { en: "Daniel: If only I hadn't agreed to join this meeting! It's been two hours." },
              { en: "Tom: I wish I hadn't put my coffee next to my laptop." },
              { en: "Priya: And I wish people would stop interrupting each other in meetings!" }
            ]
          },
          {
            kind: "errores",
            items: [
              { no: "I wish I have a car.", si: "I wish I had a car.", pq: "For a present wish, go one tense back: past simple." },
              { no: "I wish I didn't say that yesterday.", si: "I wish I hadn't said that yesterday.", pq: "Past regrets need the past perfect." },
              { no: "I wish I would be rich.", si: "I wish I were rich.", pq: "Don't use would for wishes about yourself." }
            ]
          },
          { kind: "resumen", body: "Present wish: wish + past simple. Past regret: wish + past perfect. Someone else's annoying habit: wish + would. If only = stronger." },
          { kind: "puente", body: "What does everyone at Lumen Travel wish? Practise." }
        ]
      },
      exercises: [
        {
          type: "categorize", instruction: "Present wish or past regret?",
          buckets: [{ id: "present", label: "Present wish" }, { id: "past", label: "Past regret" }],
          items: [
            { t: "I wish I lived by the sea.", bucket: "present" },
            { t: "If only I knew the answer.", bucket: "present" },
            { t: "I wish I were taller.", bucket: "present" },
            { t: "I wish I hadn't eaten so much.", bucket: "past" },
            { t: "If only we'd left earlier.", bucket: "past" },
            { t: "I wish I'd studied harder.", bucket: "past" }
          ]
        },
        {
          type: "multiple_choice", question: "I'm so tired. I wish I ___ to bed earlier last night.", options: ["had gone", "went", "would go"], correctIndex: 0,
          explanation: "A past regret: wish + past perfect."
        },
        {
          type: "find_error",
          segments: ["I wish ", { u: "I" }, " ", { u: "would have" }, " more free time ", { u: "these days" }, "."],
          correctIndex: 1, correction: "had",
          explanation: "Present wish about yourself: wish + past simple: I wish I had more free time.", question: "Find the mistake"
        },
        {
          type: "fill_blank", sentence: "My flatmate never washes the dishes. I wish she ___ do them sometimes!", answers: ["would"], hint: "Someone else's annoying habit.",
          explanation: "wish + would for behaviour you want to change."
        },
        {
          type: "listening", text: "If only I hadn't missed the train, I'd be at the interview now.", question: "What does the speaker regret?",
          options: ["Missing the train", "Going to the interview", "Taking the train"], correctIndex: 0
        },
        { type: "word_order", words: ["that", "I", "said", "wish", "hadn't", "I"], correctOrder: ["I", "wish", "I", "hadn't", "said", "that"], hint: "A past regret." },
        { type: "true_false", statement: "\"I wish I could speak Japanese\" is correct.", answer: true, explanation: "could is fine for abilities: I wish I could swim / speak Japanese." },
        {
          type: "translate", prompt: "Rewrite using \"If only\": \"I regret telling him the secret.\"",
          answers: ["if only i hadn't told him the secret", "if only i had not told him the secret", "if only i had never told him the secret", "if only i'd never told him the secret"],
          explanation: "If only I hadn't told him the secret."
        }
      ]
    },
    "core-grammar-19-passive-voice":  {
      lessonId: "core-grammar-19-passive-voice", level: "B2", track: "Core Grammar", topic: "grammar", skill: "grammar", tipo: "aprende", title: "The causative: have / get something done", rev: 2, xpReward: 60,
      mascotState: "explaining", nextLessonId: "core-grammar-20-reported-speech",
      explanation: {
        body: "Carmen's boiler is broken, her hair needs cutting and her laptop screen is cracked. She isn't going to fix any of these herself; she's going to have them done. Use the causative when someone else does a job for you. have + object + past participle: I'm having my boiler repaired. She had her hair cut yesterday. get + object + past participle means the same but is more informal: I need to get my screen fixed. All tenses are possible: I've just had my car serviced. It is also used for bad experiences: He had his phone stolen. Compare: I repaired my bike (I did it) vs I had my bike repaired (someone did it for me).",
        examples: [
          { en: "Nice haircut, Carmen! — Carmen: Thanks, I had it cut on Saturday." },
          { en: "Your screen is cracked! — Carmen: I know. I'm getting it fixed tomorrow." },
          { en: "Did you get your boiler sorted? — Carmen: Yes, I had a new one installed last week." },
          { en: "Lucky you. I had my bike stolen last month." }
        ],
        sections: [
          {
            kind: "intro",
            body: "Carmen's boiler is broken, her hair needs cutting and her laptop screen is cracked. She isn't going to fix any of these herself; she's going to have them done. Use the causative when someone else does a job for you."
          },
          {
            kind: "regla",
            body: "have + object + past participle: I'm having my boiler repaired. She had her hair cut yesterday. get + object + past participle means the same but is more informal: I need to get my screen fixed. All tenses are possible: I've just had my car serviced. It is also used for bad experiences: He had his phone stolen. Compare: I repaired my bike (I did it) vs I had my bike repaired (someone did it for me)."
          },
          {
            kind: "vocab",
            items: [
              { en: "causative", ipa: "ˈkɔːzətɪv", es: "a structure showing that someone else does an action for you" },
              { en: "repair", ipa: "rɪˈpeə", es: "fix something broken" },
              { en: "service (a car)", es: "check and maintain a machine" },
              { en: "cut", ipa: "kʌt", es: "shorten with scissors" },
              { en: "deliver", ipa: "dɪˈlɪvə", es: "take goods to a place" },
              { en: "install", ipa: "ɪnˈstɔːl", es: "put equipment in place so it works" },
              { en: "boiler", ipa: "ˈbɔɪlə", es: "a machine that heats water for a home" },
              { en: "cracked", ipa: "krækt", es: "broken, with lines on the surface" }
            ]
          },
          {
            kind: "expresiones",
            items: [
              { en: "I'm getting it fixed.", es: "someone will repair it" },
              { en: "I had my hair cut.", es: "a hairdresser did it" },
              { en: "Where do you get your ... done?", es: "ask for a recommendation" },
              { en: "I had my phone stolen.", es: "something bad happened to you" }
            ]
          },
          {
            kind: "ejemplos",
            items: [
              { en: "Tom: Nice haircut, Carmen! — Carmen: Thanks, I had it cut on Saturday." },
              { en: "Daniel: Your screen is cracked! — Carmen: I know. I'm getting it fixed tomorrow." },
              { en: "Priya: Did you get your boiler sorted? — Carmen: Yes, I had a new one installed last week." },
              { en: "Tom: Lucky you. I had my bike stolen last month." }
            ]
          },
          {
            kind: "errores",
            items: [
              { no: "I cut my hair at the hairdresser's.", si: "I had my hair cut at the hairdresser's.", pq: "If someone else did it, use have + object + past participle." },
              { no: "I had repaired my car. (a mechanic did it)", si: "I had my car repaired.", pq: "Word order: have + object + past participle." },
              { no: "She's getting her nails do.", si: "She's getting her nails done.", pq: "Use the past participle (done), not the base form." }
            ]
          },
          { kind: "resumen", body: "have / get + object + past participle = someone does it for you. Works in all tenses. Also for bad experiences: I had my wallet stolen." },
          { kind: "puente", body: "Help Carmen organise all her repairs." }
        ]
      },
      exercises: [
        {
          type: "multiple_choice", question: "Carmen didn't cut her hair herself. She ___.", options: ["had it cut", "cut it", "had cut it"], correctIndex: 0,
          explanation: "have + object + past participle: had it cut."
        },
        {
          type: "find_error",
          segments: ["We ", { u: "are having" }, " ", { u: "installed a new kitchen" }, " next ", { u: "month" }, "."],
          correctIndex: 1, correction: "a new kitchen installed", explanation: "Object before the past participle: We're having a new kitchen installed.", question: "Find the mistake"
        },
        { type: "fill_blank", sentence: "I need to get my eyes ___ (test). I can't read the board.", answers: ["tested"], hint: "get + object + past participle", explanation: "get my eyes tested" },
        {
          type: "listening", text: "My car broke down, so I'm having it repaired at a garage near the office.", question: "Who is fixing the car?",
          options: ["A mechanic at a garage", "The speaker", "A colleague"], correctIndex: 0
        },
        {
          type: "categorize", instruction: "Did they do it themselves, or did someone else do it?",
          buckets: [{ id: "self", label: "Did it themselves" }, { id: "other", label: "Someone else did it" }],
          items: [
            { t: "I painted my room.", bucket: "self" },
            { t: "She fixed her bike.", bucket: "self" },
            { t: "We cooked dinner.", bucket: "self" },
            { t: "I had my room painted.", bucket: "other" },
            { t: "She got her bike fixed.", bucket: "other" },
            { t: "We had dinner delivered.", bucket: "other" }
          ]
        },
        { type: "word_order", words: ["painted", "She's", "flat", "having", "her"], correctOrder: ["She's", "having", "her", "flat", "painted"], hint: "have + object + past participle" },
        {
          type: "matching", instruction: "Match each word with its meaning.",
          pairs: [
            { l: "install", r: "put equipment in place so it works" },
            { l: "deliver", r: "take goods to a place" },
            { l: "service", r: "check and maintain a machine" },
            { l: "cracked", r: "broken, with lines on the surface" },
            { l: "boiler", r: "a machine that heats water for a home" }
          ]
        },
        {
          type: "translate", prompt: "Rewrite using the causative with HAVE: \"A mechanic is checking my car today.\"", answers: ["i'm having my car checked today", "i am having my car checked today"],
          explanation: "I'm having my car checked today."
        }
      ]
    },
    "core-grammar-20-reported-speech":  {
      lessonId: "core-grammar-20-reported-speech", level: "B2", track: "Core Grammar", topic: "grammar", skill: "grammar", tipo: "aprende", title: "Reporting verbs: advise, refuse, suggest...", rev: 2,
      xpReward: 60, mascotState: "explaining", nextLessonId: "core-grammar-21-relative-clauses",
      explanation: {
        body: "In the weekly meeting, Priya advised the team to test the app again, Daniel refused to work at the weekend, and Tom suggested having a party. When we report what people said, verbs like advise, refuse and suggest are more precise than 'said'. Each reporting verb has its own pattern. verb + to-infinitive: agree, offer, promise, refuse (He refused to help). verb + object + to-infinitive: advise, ask, encourage, remind, tell, warn (She advised me to rest). verb + -ing: admit, deny, recommend, suggest (He admitted breaking it / Tom suggested having a party). verb + that-clause: explain, claim, insist (She explained that she was busy). Negative: warn someone not to do something.",
        examples: [{ en: "Priya advised us to test it again." }, { en: "Daniel refused to work at the weekend." }, { en: "Tom suggested having a party." }, { en: "Priya reminded us not to forget the deadline." }],
        sections: [
          {
            kind: "intro",
            body: "In the weekly meeting, Priya advised the team to test the app again, Daniel refused to work at the weekend, and Tom suggested having a party. When we report what people said, verbs like advise, refuse and suggest are more precise than 'said'."
          },
          {
            kind: "regla",
            body: "Each reporting verb has its own pattern. verb + to-infinitive: agree, offer, promise, refuse (He refused to help). verb + object + to-infinitive: advise, ask, encourage, remind, tell, warn (She advised me to rest). verb + -ing: admit, deny, recommend, suggest (He admitted breaking it / Tom suggested having a party). verb + that-clause: explain, claim, insist (She explained that she was busy). Negative: warn someone not to do something."
          },
          {
            kind: "vocab",
            items: [
              { en: "advise", ipa: "ədˈvaɪz", es: "tell someone what you think they should do" },
              { en: "refuse", ipa: "rɪˈfjuːz", es: "say you will not do something" },
              { en: "suggest", ipa: "səˈdʒest", es: "put forward an idea for others to consider" },
              { en: "admit", ipa: "ədˈmɪt", es: "agree that something bad is true" },
              { en: "deny", ipa: "dɪˈnaɪ", es: "say that something is not true" },
              { en: "remind", ipa: "rɪˈmaɪnd", es: "help someone remember" },
              { en: "warn", ipa: "wɔːn", es: "tell someone about a danger or problem" },
              { en: "insist", ipa: "ɪnˈsɪst", es: "say firmly that something must happen or is true" }
            ]
          },
          {
            kind: "expresiones",
            items: [
              { en: "She advised me to...", es: "report advice" },
              { en: "He refused to...", es: "report a strong 'no'" },
              { en: "They suggested -ing...", es: "report an idea" },
              { en: "He admitted -ing...", es: "report a confession" }
            ]
          },
          {
            kind: "ejemplos",
            items: [
              { en: "\"You should test it again,\" said Priya. → Priya advised us to test it again." },
              { en: "\"I won't work this weekend,\" said Daniel. → Daniel refused to work at the weekend." },
              { en: "\"Let's have a party,\" said Tom. → Tom suggested having a party." },
              { en: "\"Don't forget the deadline,\" said Priya. → Priya reminded us not to forget the deadline." }
            ]
          },
          {
            kind: "errores",
            items: [
              { no: "He suggested me to go.", si: "He suggested that I go. / He suggested going.", pq: "suggest is not followed by object + to-infinitive." },
              { no: "She denied to take the money.", si: "She denied taking the money.", pq: "deny + -ing." },
              { no: "They advised to me that I rest.", si: "They advised me to rest.", pq: "advise + object + to-infinitive." }
            ]
          },
          { kind: "resumen", body: "+ to: agree, offer, promise, refuse. + object + to: advise, ask, remind, tell, warn. + -ing: admit, deny, recommend, suggest. + that: explain, claim, insist." },
          { kind: "puente", body: "Report what happened in the Lumen Travel meeting." }
        ]
      },
      exercises: [
        {
          type: "listening", text: "Don't touch the screen. It's still wet.", question: "Which report is correct?",
          options: ["The technician warned us not to touch the screen.", "The technician refused to touch the screen.", "The technician admitted touching the screen."], correctIndex: 0
        },
        {
          type: "categorize", instruction: "Which pattern does each verb take?",
          buckets: [{ id: "inf", label: "+ to-infinitive" }, { id: "obj", label: "+ object + to-infinitive" }, { id: "ing", label: "+ -ing" }],
          items: [
            { t: "refuse", bucket: "inf" },
            { t: "promise", bucket: "inf" },
            { t: "advise", bucket: "obj" },
            { t: "remind", bucket: "obj" },
            { t: "warn", bucket: "obj" },
            { t: "deny", bucket: "ing" },
            { t: "suggest", bucket: "ing" },
            { t: "admit", bucket: "ing" }
          ]
        },
        {
          type: "multiple_choice", question: "\"I didn't break the printer,\" said Tom. → Tom ___ the printer.", options: ["denied breaking", "refused to break", "admitted to break"], correctIndex: 0,
          explanation: "deny + -ing = say you didn't do it."
        },
        {
          type: "find_error",
          segments: ["Priya ", { u: "suggested" }, " ", { u: "us to meet" }, " ", { u: "on" }, " Monday."],
          correctIndex: 1, correction: "meeting (or: that we meet)", explanation: "suggest + -ing or suggest + that-clause, never + object + to-infinitive.", question: "Find the mistake"
        },
        { type: "fill_blank", sentence: "The doctor advised me ___ more water.", answers: ["to drink"], hint: "advise + object + ...", explanation: "The doctor advised me to drink more water." },
        {
          type: "matching", instruction: "Match each verb with its meaning.",
          pairs: [
            { l: "deny", r: "say that something is not true" },
            { l: "admit", r: "agree that something bad is true" },
            { l: "warn", r: "tell someone about a danger or problem" },
            { l: "remind", r: "help someone remember" },
            { l: "insist", r: "say firmly that something must happen" }
          ]
        },
        { type: "word_order", words: ["today", "Daniel", "file", "promised", "the", "to", "send"], correctOrder: ["Daniel", "promised", "to", "send", "the", "file", "today"], hint: "promise + to-infinitive" },
        {
          type: "translate", prompt: "Report using REFUSE: \"I won't sign the contract,\" said the client.", answers: ["the client refused to sign the contract", "the client refused to sign it"],
          explanation: "The client refused to sign the contract."
        },
        {
          type: "translate", prompt: "Report using REMIND: \"Don't forget to lock the door,\" Priya told Tom.",
          answers: ["priya reminded tom to lock the door", "priya reminded tom not to forget to lock the door"], explanation: "Priya reminded Tom to lock the door."
        }
      ]
    },
    "core-grammar-21-relative-clauses":  {
                                             "lessonId":  "core-grammar-21-relative-clauses",
                                             "level":  "B2",
                                             "track":  "Core Grammar",
                                             "title":  "Relative Clauses",
                                             "explanation":  {
                                                                 "body":  "Relative clauses add information about a noun. Defining relative clauses identify exactly which person or thing we mean and take no commas; we use who/that for people, which/that for things, whose for possession, and where for places. Non-defining relative clauses add extra, non-essential information and are always separated by commas, and in these clauses 'that' is never used. Note also that you cannot use 'that' immediately after a preposition (say 'in which', not 'in that').",
                                                                 "examples":  [
                                                                                  {
                                                                                      "en":  "The woman who lives next door is a doctor."
                                                                                  },
                                                                                  {
                                                                                      "en":  "My brother, who lives in Madrid, is visiting us."
                                                                                  },
                                                                                  {
                                                                                      "en":  "This is the school where I learned English."
                                                                                  },
                                                                                  {
                                                                                      "en":  "She\u0027s the colleague whose car broke down yesterday."
                                                                                  }
                                                                              ]
                                                             },
                                             "exercises":  [
                                                               {
                                                                   "type":  "multiple_choice",
                                                                   "question":  "My grandmother, ___ is eighty-five, still goes swimming every morning.",
                                                                   "options":  [
                                                                                   "that",
                                                                                   "who",
                                                                                   "which"
                                                                               ],
                                                                   "correctIndex":  1,
                                                                   "explanation":  "This is a non-defining clause about a person, so we use \u0027who\u0027 and never \u0027that\u0027."
                                                               },
                                                               {
                                                                   "type":  "multiple_choice",
                                                                   "question":  "Choose the correctly punctuated sentence.",
                                                                   "options":  [
                                                                                   "The book that I borrowed was excellent.",
                                                                                   "The book, that I borrowed was excellent.",
                                                                                   "The book that I borrowed, was excellent."
                                                                               ],
                                                                   "correctIndex":  0,
                                                                   "explanation":  "It is a defining clause identifying which book, so no commas are used."
                                                               },
                                                               {
                                                                   "type":  "word_order",
                                                                   "words":  [
                                                                                 "This",
                                                                                 "is",
                                                                                 "the",
                                                                                 "house",
                                                                                 "where",
                                                                                 "I",
                                                                                 "grew",
                                                                                 "up"
                                                                             ],
                                                                   "correctOrder":  [
                                                                                        "This",
                                                                                        "is",
                                                                                        "the",
                                                                                        "house",
                                                                                        "where",
                                                                                        "I",
                                                                                        "grew",
                                                                                        "up"
                                                                                    ],
                                                                   "hint":  "Use 'where' to refer to a place (the house)."
                                                               },
                                                               {
                                                                   "type":  "word_order",
                                                                   "words":  [
                                                                                 "The",
                                                                                 "man",
                                                                                 "whose",
                                                                                 "wallet",
                                                                                 "was",
                                                                                 "stolen",
                                                                                 "called",
                                                                                 "the",
                                                                                 "police"
                                                                             ],
                                                                   "correctOrder":  [
                                                                                        "The",
                                                                                        "man",
                                                                                        "whose",
                                                                                        "wallet",
                                                                                        "was",
                                                                                        "stolen",
                                                                                        "called",
                                                                                        "the",
                                                                                        "police"
                                                                                    ],
                                                                   "hint":  "Use 'whose' to show possession (the man's wallet)."
                                                               },
                                                               {
                                                                   "type":  "multiple_choice",
                                                                   "question":  "Paris, ___ I visited last summer, is full of museums.",
                                                                   "options":  [
                                                                                   "where",
                                                                                   "that",
                                                                                   "which"
                                                                               ],
                                                                   "correctIndex":  2,
                                                                   "explanation":  "In a non-defining clause, \u0027that\u0027 is never used; here Paris is the object of \u0027visited\u0027, so we use \u0027which\u0027 (not \u0027where\u0027, which would need an intransitive verb like \u0027went\u0027)."
                                                               }
                                                           ],
                                             "xpReward":  60,
                                             "mascotState":  "explaining",
                                             "nextLessonId":  "core-grammar-22-gerunds-infinitives"
                                         },
    "core-grammar-22-gerunds-infinitives":  {
                                                "lessonId":  "core-grammar-22-gerunds-infinitives",
                                                "level":  "B2",
                                                "track":  "Core Grammar",
                                                "title":  "Gerunds \u0026 Infinitives",
                                                "explanation":  {
                                                                    "body":  "After certain verbs we use the gerund (-ing), and after others we use the to-infinitive. Verbs like enjoy, avoid, finish and mind are followed by -ing, while want, decide, hope and agree take a to-infinitive. We always use -ing after a preposition, and a few verbs such as stop and remember change meaning depending on which form follows.",
                                                                    "examples":  [
                                                                                     {
                                                                                         "en":  "She enjoys learning new languages."
                                                                                     },
                                                                                     {
                                                                                         "en":  "We decided to leave early."
                                                                                     },
                                                                                     {
                                                                                         "en":  "I\u0027m interested in working abroad."
                                                                                     },
                                                                                     {
                                                                                         "en":  "He stopped smoking last year."
                                                                                     }
                                                                                 ]
                                                                },
                                                "exercises":  [
                                                                  {
                                                                      "type":  "multiple_choice",
                                                                      "question":  "She avoids ____ junk food during the week.",
                                                                      "options":  [
                                                                                      "to eat",
                                                                                      "eating",
                                                                                      "eat"
                                                                                  ],
                                                                      "correctIndex":  1,
                                                                      "explanation":  "The verb \u0027avoid\u0027 is always followed by the gerund (-ing)."
                                                                  },
                                                                  {
                                                                      "type":  "word_order",
                                                                      "words":  [
                                                                                    "They",
                                                                                    "decided",
                                                                                    "to",
                                                                                    "postpone",
                                                                                    "the",
                                                                                    "meeting"
                                                                                ],
                                                                      "correctOrder":  [
                                                                                           "They",
                                                                                           "decided",
                                                                                           "to",
                                                                                           "postpone",
                                                                                           "the",
                                                                                           "meeting"
                                                                                       ],
                                                                      "hint":  "The verb 'decide' is followed by the infinitive with 'to'."
                                                                  },
                                                                  {
                                                                      "type":  "multiple_choice",
                                                                      "question":  "Remember ____ the door before you leave the office.",
                                                                      "options":  [
                                                                                      "locking",
                                                                                      "lock",
                                                                                      "to lock"
                                                                                  ],
                                                                      "correctIndex":  2,
                                                                      "explanation":  "\u0027Remember + to-infinitive\u0027 refers to a task you must not forget to do in the future."
                                                                  },
                                                                  {
                                                                      "type":  "word_order",
                                                                      "words":  [
                                                                                    "I\u0027m",
                                                                                    "thinking",
                                                                                    "about",
                                                                                    "moving",
                                                                                    "to",
                                                                                    "Canada"
                                                                                ],
                                                                      "correctOrder":  [
                                                                                           "I\u0027m",
                                                                                           "thinking",
                                                                                           "about",
                                                                                           "moving",
                                                                                           "to",
                                                                                           "Canada"
                                                                                       ],
                                                                      "hint":  "After a preposition like 'about' we always use the -ing form."
                                                                  },
                                                                  {
                                                                      "type":  "multiple_choice",
                                                                      "question":  "We finally finished ____ the report at midnight.",
                                                                      "options":  [
                                                                                      "writing",
                                                                                      "to write",
                                                                                      "write"
                                                                                  ],
                                                                      "correctIndex":  0,
                                                                      "explanation":  "The verb \u0027finish\u0027 is followed by the gerund (-ing), not the infinitive."
                                                                  }
                                                              ],
                                                "xpReward":  60,
                                                "mascotState":  "explaining",
                                                "nextLessonId":  "core-grammar-23-third-conditional"
                                            },
    "core-grammar-23-third-conditional":  {
      lessonId: "core-grammar-23-third-conditional", level: "C1", track: "Core Grammar", topic: "grammar", skill: "grammar", tipo: "aprende", title: "Mixed conditionals", rev: 2, xpReward: 70,
      mascotState: "explaining", nextLessonId: "core-grammar-24-modals-deduction",
      explanation: {
        body: "Real life rarely fits neatly into first, second or third conditionals. \"If I had taken that job in Singapore, I would be living there now.\" A past action, a present result. Mixed conditionals connect different times. Past condition → present result: If + past perfect, would + base verb: If I had studied medicine, I would be a doctor now. Present (or permanent) condition → past result: If + past simple, would have + past participle: If I were more organised, I wouldn't have missed the deadline. Time signals help: now, today, still (present result); yesterday, last year (past event). could and might also work: If she hadn't moved abroad, she might not speak three languages.",
        examples: [
          { en: "If I hadn't turned down that job in Singapore, I would be living there now." },
          { en: "If she weren't so stubborn, she would have accepted the compromise." },
          { en: "We wouldn't be lost if you had brought the map." },
          { en: "If he spoke Mandarin, he would have got the job in Shanghai." }
        ],
        sections: [
          {
            kind: "intro",
            body: "Real life rarely fits neatly into first, second or third conditionals. \"If I had taken that job in Singapore, I would be living there now.\" A past action, a present result. Mixed conditionals connect different times."
          },
          {
            kind: "regla",
            body: "Past condition → present result: If + past perfect, would + base verb: If I had studied medicine, I would be a doctor now. Present (or permanent) condition → past result: If + past simple, would have + past participle: If I were more organised, I wouldn't have missed the deadline. Time signals help: now, today, still (present result); yesterday, last year (past event). could and might also work: If she hadn't moved abroad, she might not speak three languages."
          },
          {
            kind: "vocab",
            items: [
              { en: "hypothetical", ipa: "ˌhaɪpəˈθetɪkəl", es: "based on an imagined situation" },
              { en: "consequence", ipa: "ˈkɒnsɪkwəns", es: "a result of an action" },
              { en: "counterfactual", ipa: "ˌkaʊntəˈfæktʃuəl", es: "describing something that did not happen" },
              { en: "in retrospect", es: "when looking back on a past event" },
              { en: "turn down", es: "refuse an offer" },
              { en: "outcome", ipa: "ˈaʊtkʌm", es: "the final result" },
              { en: "trajectory", ipa: "trəˈdʒektəri", es: "the path or direction of development" },
              { en: "contingent on", es: "depending on" }
            ]
          },
          {
            kind: "expresiones",
            items: [
              { en: "If I'd known then what I know now, ...", es: "reflect on past choices" },
              { en: "I wouldn't be here today if...", es: "link a past event to the present" },
              { en: "Had it not been for..., ...", es: "formal, inverted past condition" },
              { en: "Things might have turned out differently if...", es: "speculate about a past outcome" }
            ]
          },
          {
            kind: "ejemplos",
            items: [
              { en: "If I hadn't turned down that job in Singapore, I would be living there now." },
              { en: "If she weren't so stubborn, she would have accepted the compromise." },
              { en: "We wouldn't be lost if you had brought the map." },
              { en: "If he spoke Mandarin, he would have got the job in Shanghai." }
            ]
          },
          {
            kind: "errores",
            items: [
              { no: "If I would have studied, I would be a doctor.", si: "If I had studied, I would be a doctor.", pq: "No 'would' in the if-clause; use the past perfect for the past condition." },
              {
                no: "If she wasn't so shy, she would speak at the meeting yesterday.", si: "If she weren't so shy, she would have spoken at the meeting yesterday.",
                pq: "A past result needs would have + past participle."
              },
              { no: "If I had had breakfast, I wouldn't have been hungry now.", si: "If I had had breakfast, I wouldn't be hungry now.", pq: "'now' signals a present result: would + base verb." }
            ]
          },
          { kind: "resumen", body: "Past → present: If + had done, would do. Present → past: If + did, would have done. Let the time words guide you." },
          { kind: "puente", body: "Mix the times and see how one decision changes everything." }
        ]
      },
      exercises: [
        {
          type: "categorize", instruction: "Does the result refer to the present or the past?",
          buckets: [{ id: "now", label: "Present result" }, { id: "past", label: "Past result" }],
          items: [
            { t: "...I would be fluent now.", bucket: "now" },
            { t: "...she wouldn't be so tired today.", bucket: "now" },
            { t: "...we would still be friends.", bucket: "now" },
            { t: "...I would have called you.", bucket: "past" },
            { t: "...he wouldn't have missed the flight.", bucket: "past" },
            { t: "...they would have won the match.", bucket: "past" }
          ]
        },
        {
          type: "multiple_choice", question: "If I had saved more money last year, I ___ on holiday now.", options: ["would be", "would have been", "will be"], correctIndex: 0,
          explanation: "Past condition (last year) → present result (now): would be."
        },
        {
          type: "find_error",
          segments: ["If she ", { u: "weren't" }, " so impatient, she ", { u: "wouldn't leave" }, " the meeting ", { u: "early yesterday" }, "."],
          correctIndex: 1, correction: "wouldn't have left", explanation: "Permanent present trait → past result: would have + past participle.", question: "Find the mistake"
        },
        {
          type: "fill_blank", sentence: "If he hadn't missed the train, he ___ be here by now.", answers: ["would", "could", "might"], hint: "Past condition → present result.",
          explanation: "...he would be here by now."
        },
        {
          type: "listening", text: "If I hadn't met Ana at that conference, I wouldn't be working in Lisbon today.", question: "What is true about the speaker?",
          options: ["They met Ana and now work in Lisbon.", "They never met Ana.", "They are leaving Lisbon."], correctIndex: 0
        },
        {
          type: "word_order", words: ["her", "If", "asked", "I", "have", "were", "would", "braver", "I"], correctOrder: ["If", "I", "were", "braver", "I", "would", "have", "asked", "her"],
          hint: "Permanent present condition → past result."
        },
        { type: "true_false", statement: "\"If I had studied law, I would be a lawyer now\" combines a past condition with a present result.", answer: true, explanation: "had studied (past) → would be (now)." },
        {
          type: "translate",
          prompt: "Combine into one mixed conditional: \"I didn't learn to drive. I can't drive to work now.\"",
          answers: ["if i had learned to drive i could drive to work now", "if i had learnt to drive i could drive to work now", "if i had learned to drive i would be able to drive to work now", "if i had learnt to drive i would be able to drive to work now", "if i'd learned to drive i could drive to work now", "if i'd learnt to drive i could drive to work now"],
          explanation: "If I had learned to drive, I could drive to work now."
        }
      ]
    },
    "core-grammar-24-modals-deduction":  {
                                             "lessonId":  "core-grammar-24-modals-deduction",
                                             "level":  "C1",
                                             "track":  "Core Grammar",
                                             "title":  "Modals of Deduction (Past)",
                                             "explanation":  {
                                                                 "body":  "To speculate about the past, we use a modal verb followed by 'have' + past participle. 'Must have' expresses near-certainty that something happened, while 'can't have' or 'couldn't have' expresses near-certainty that it did not. For genuine uncertainty, we use 'might have', 'may have', or 'could have' to suggest one of several possibilities.",
                                                                 "examples":  [
                                                                                  {
                                                                                      "en":  "She must have left already; her coat isn\u0027t on the hook."
                                                                                  },
                                                                                  {
                                                                                      "en":  "He can\u0027t have read the whole report in ten minutes."
                                                                                  },
                                                                                  {
                                                                                      "en":  "They might have missed the train, or they may have got lost."
                                                                                  },
                                                                                  {
                                                                                      "en":  "I couldn\u0027t have offended her, since I never even mentioned it."
                                                                                  }
                                                                              ]
                                                             },
                                             "exercises":  [
                                                               {
                                                                   "type":  "multiple_choice",
                                                                   "question":  "The lights were off and the car was gone. They ___ home by the time we arrived.",
                                                                   "options":  [
                                                                                   "must have gone",
                                                                                   "must have went",
                                                                                   "must had gone"
                                                                               ],
                                                                   "correctIndex":  0,
                                                                   "explanation":  "After \u0027must have\u0027 we need the past participle \u0027gone\u0027, not the past simple \u0027went\u0027 or \u0027had\u0027."
                                                               },
                                                               {
                                                                   "type":  "word_order",
                                                                   "words":  [
                                                                                 "She",
                                                                                 "can\u0027t",
                                                                                 "have",
                                                                                 "seen",
                                                                                 "the",
                                                                                 "warning",
                                                                                 "sign"
                                                                             ],
                                                                   "correctOrder":  [
                                                                                        "She",
                                                                                        "can\u0027t",
                                                                                        "have",
                                                                                        "seen",
                                                                                        "the",
                                                                                        "warning",
                                                                                        "sign"
                                                                                    ],
                                                                   "hint":  "You're almost sure something did NOT happen in the past. Start with the subject."
                                                               },
                                                               {
                                                                   "type":  "multiple_choice",
                                                                   "question":  "I\u0027m not sure who called. It ___ been my sister, but I didn\u0027t recognise the voice.",
                                                                   "options":  [
                                                                                   "can\u0027t have",
                                                                                   "could have",
                                                                                   "must have"
                                                                               ],
                                                                   "correctIndex":  1,
                                                                   "explanation":  "The uncertainty (\u0027I\u0027m not sure\u0027) calls for the tentative \u0027could have\u0027, not the certainty of \u0027must have\u0027 or \u0027can\u0027t have\u0027."
                                                               },
                                                               {
                                                                   "type":  "word_order",
                                                                   "words":  [
                                                                                 "He",
                                                                                 "might",
                                                                                 "have",
                                                                                 "forgotten",
                                                                                 "about",
                                                                                 "the",
                                                                                 "meeting"
                                                                             ],
                                                                   "correctOrder":  [
                                                                                        "He",
                                                                                        "might",
                                                                                        "have",
                                                                                        "forgotten",
                                                                                        "about",
                                                                                        "the",
                                                                                        "meeting"
                                                                                    ],
                                                                   "hint":  "An uncertain possibility in the past. Start with the subject."
                                                               },
                                                               {
                                                                   "type":  "word_order",
                                                                   "words":  [
                                                                                 "They",
                                                                                 "must",
                                                                                 "have",
                                                                                 "been",
                                                                                 "delayed",
                                                                                 "by",
                                                                                 "the",
                                                                                 "storm"
                                                                             ],
                                                                   "correctOrder":  [
                                                                                        "They",
                                                                                        "must",
                                                                                        "have",
                                                                                        "been",
                                                                                        "delayed",
                                                                                        "by",
                                                                                        "the",
                                                                                        "storm"
                                                                                    ],
                                                                   "hint":  "An almost certain deduction about a past fact, in the passive voice. Start with the subject."
                                                               }
                                                           ],
                                             "xpReward":  70,
                                             "mascotState":  "explaining",
                                             "nextLessonId":  "core-grammar-25-inversion"
                                         },
    "core-grammar-25-inversion":  {
      lessonId: "core-grammar-25-inversion", level: "C1", track: "Core Grammar", topic: "grammar", skill: "grammar", tipo: "aprende", title: "Participle clauses", rev: 2, xpReward: 70, mascotState: "explaining",
      nextLessonId: null,
      explanation: {
        body: "\"Having finished the report, she left early.\" \"Written in 1949, the novel still feels modern.\" Participle clauses let you pack information into fewer words. They are typical of good written English and formal speech. Present participle (-ing) = active meaning, often at the same time or giving a reason: Walking home, I saw an accident. Feeling tired, he went to bed. Past participle = passive meaning: Built in 1900, the bridge needs repairs. Perfect participle (having + past participle) = one action completed before another: Having read the email, she called the client. Negative: Not knowing what to do, I waited. The subject of the participle clause must be the subject of the main clause; otherwise you get a 'dangling participle': ✗ Walking home, the rain started.",
        examples: [
          { en: "Having reviewed the data, the committee approved the proposal." },
          { en: "Founded in 1998, the company now employs 4,000 people." },
          { en: "Not wanting to disturb anyone, she worked from home." },
          { en: "Looking out of the window, he noticed the first snow of the year." }
        ],
        sections: [
          {
            kind: "intro",
            body: "\"Having finished the report, she left early.\" \"Written in 1949, the novel still feels modern.\" Participle clauses let you pack information into fewer words. They are typical of good written English and formal speech."
          },
          {
            kind: "regla",
            body: "Present participle (-ing) = active meaning, often at the same time or giving a reason: Walking home, I saw an accident. Feeling tired, he went to bed. Past participle = passive meaning: Built in 1900, the bridge needs repairs. Perfect participle (having + past participle) = one action completed before another: Having read the email, she called the client. Negative: Not knowing what to do, I waited. The subject of the participle clause must be the subject of the main clause; otherwise you get a 'dangling participle': ✗ Walking home, the rain started."
          },
          {
            kind: "vocab",
            items: [
              { en: "participle", ipa: "ˈpɑːtɪsɪpəl", es: "a verb form ending in -ing, or the third form (written, built)" },
              { en: "clause", ipa: "klɔːz", es: "a group of words containing a verb" },
              { en: "concise", ipa: "kənˈsaɪs", es: "short and clear" },
              { en: "dangling participle", es: "a participle clause with the wrong subject, or none" },
              { en: "subsequently", ipa: "ˈsʌbsɪkwəntli", es: "after something else" },
              { en: "secure (funding)", ipa: "sɪˈkjʊə", es: "succeed in getting something" },
              { en: "draft", ipa: "drɑːft", es: "an early version of a text" },
              { en: "unanticipated", ipa: "ˌʌnænˈtɪsɪpeɪtɪd", es: "not expected" }
            ]
          },
          {
            kind: "expresiones",
            items: [
              { en: "Having said that, ...", es: "nevertheless (fixed phrase)" },
              { en: "Generally speaking, ...", es: "in most cases" },
              { en: "Considering the circumstances, ...", es: "taking the situation into account" },
              { en: "Given the time constraints, ...", es: "because time is limited" }
            ]
          },
          {
            kind: "ejemplos",
            items: [
              { en: "Having reviewed the data, the committee approved the proposal." },
              { en: "Founded in 1998, the company now employs 4,000 people." },
              { en: "Not wanting to disturb anyone, she worked from home." },
              { en: "Looking out of the window, he noticed the first snow of the year." }
            ]
          },
          {
            kind: "errores",
            items: [
              { no: "Walking into the office, the lights were off.", si: "Walking into the office, I noticed the lights were off.", pq: "The subject must be the same in both clauses (dangling participle)." },
              { no: "Wrote in 1949, the novel is still popular.", si: "Written in 1949, the novel is still popular.", pq: "A passive meaning needs the past participle." },
              { no: "Having finish the report, she left.", si: "Having finished the report, she left.", pq: "having + past participle." }
            ]
          },
          { kind: "resumen", body: "-ing = active / simultaneous / reason. Past participle = passive. Having + past participle = earlier action. Same subject in both clauses." },
          { kind: "puente", body: "Make your sentences shorter and sharper." }
        ]
      },
      exercises: [
        {
          type: "multiple_choice", question: "___ the instructions carefully, he assembled the desk in ten minutes.", options: ["Having read", "Read", "Having reading"], correctIndex: 0,
          explanation: "having + past participle: he read first, then assembled."
        },
        {
          type: "categorize", instruction: "Active or passive meaning?",
          buckets: [{ id: "active", label: "-ing (active)" }, { id: "passive", label: "Past participle (passive)" }],
          items: [
            { t: "Walking along the beach, ...", bucket: "active" },
            { t: "Feeling unwell, ...", bucket: "active" },
            { t: "Knowing the risks, ...", bucket: "active" },
            { t: "Built in 1890, ...", bucket: "passive" },
            { t: "Seen from above, ...", bucket: "passive" },
            { t: "Written by an expert, ...", bucket: "passive" }
          ]
        },
        {
          type: "find_error",
          segments: [{ u: "Arriving" }, " at the airport, ", { u: "my flight" }, " ", { u: "had" }, " already left."],
          correctIndex: 1, correction: "I discovered that my flight",
          explanation: "Dangling participle: the flight didn't arrive at the airport, I did. Arriving at the airport, I discovered that my flight had already left.", question: "Find the mistake"
        },
        {
          type: "fill_blank", sentence: "___ (not / know) anyone at the party, Carmen stood near the door.", answers: ["not knowing"], hint: "Negative participle clause.", explanation: "Not knowing anyone, ..."
        },
        {
          type: "reading", title: "A short company history",
          passage: "Founded in a small garage in 2009, the company grew quickly. Having secured funding from two investors, it opened offices in Berlin and Toronto within three years.\n\nHowever, expanding too fast, it soon ran into financial trouble. Forced to cut costs, the board closed the Toronto office in 2014. Having learned from this experience, the company now grows more slowly.",
          questions: [
            {
              q: "What happened first?",
              options: ["The company secured funding.", "The company opened an office in Berlin.", "The board closed the Toronto office."], correctIndex: 0,
              explanation: "Having secured funding, it opened offices: the perfect participle marks the earlier action."
            },
            {
              q: "Why did the company run into trouble?",
              options: ["It was expanding too fast.", "It was founded in a garage.", "It closed an office."], correctIndex: 0, explanation: "\"expanding too fast\" gives the reason."
            },
            {
              q: "\"Forced to cut costs\" means:",
              options: ["Because the board was forced to cut costs", "Although the board wanted to cut costs", "Before the board cut costs"], correctIndex: 0,
              explanation: "Past participle with a passive, causal meaning."
            }
          ]
        },
        {
          type: "word_order", words: ["home", "Having", "went", "finished", "she", "the", "report"], correctOrder: ["Having", "finished", "the", "report", "she", "went", "home"],
          hint: "having + past participle first."
        },
        {
          type: "translate",
          prompt: "Rewrite with a participle clause: \"Because she felt nervous, she practised her speech again.\"",
          answers: ["feeling nervous she practised her speech again", "feeling nervous she practiced her speech again"], explanation: "Feeling nervous, she practised her speech again."
        },
        {
          type: "translate",
          prompt: "Rewrite with a perfect participle: \"After he had checked the figures, he sent the report.\"",
          answers: ["having checked the figures he sent the report", "having checked the numbers he sent the report"], explanation: "Having checked the figures, he sent the report."
        }
      ]
    }
};

window.VESPER_LESSONS_ORDER = [
    "core-grammar-01-to-be",
    "core-grammar-02-articles",
    "core-grammar-03-plurals",
    "core-grammar-04-present-simple",
    "core-grammar-05-there-is-are",
    "core-grammar-06-present-continuous",
    "core-grammar-07-past-simple",
    "core-grammar-08-comparatives",
    "core-grammar-09-countables",
    "core-grammar-10-modals-ability",
    "core-grammar-11-going-to",
    "core-grammar-12-present-perfect",
    "core-grammar-13-first-conditional",
    "core-grammar-14-past-continuous",
    "core-grammar-15-will-vs-going-to",
    "core-grammar-16-present-perfect-continuous",
    "core-grammar-17-past-perfect",
    "core-grammar-18-second-conditional",
    "core-grammar-19-passive-voice",
    "core-grammar-20-reported-speech",
    "core-grammar-21-relative-clauses",
    "core-grammar-22-gerunds-infinitives",
    "core-grammar-23-third-conditional",
    "core-grammar-24-modals-deduction",
    "core-grammar-25-inversion"
];
