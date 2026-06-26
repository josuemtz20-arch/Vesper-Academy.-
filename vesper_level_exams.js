/* ============================================================
 * vesper_level_exams.js — Exámenes formales por nivel CEFR (A1–C2).
 *
 * Evaluación COMPLETA de cada nivel (gramática, vocabulario, uso del inglés,
 * lectura y listening), alineada al syllabus del curso. A diferencia del jefe
 * de mundo (corto y muestreado), el examen de nivel presenta TODO el banco,
 * ordenado por destreza. Lo consume buildLevelExam() en leccion.html vía
 * ?id=exam:NIVEL y registra el resultado en el panel de calificaciones
 * (VESPER_RESULTS, examType "exam"). Mismo formato de ejercicios que las
 * lecciones y los boss exams (sin claves; el motor de leccion.html los renderiza).
 *
 * El listening usa el sintetizador de voz (TTS) del navegador: el campo "text"
 * se lee en voz alta; no hace falta archivo de audio.
 *
 * Al final, este archivo ENRIQUECE los bancos de los boss exams
 * (window.VESPER_BOSS_EXAMS) con preguntas nuevas por nivel, para más variedad
 * en cada intento. Cárgalo DESPUÉS de vesper_boss_exams.js.
 * ============================================================ */

window.VESPER_LEVEL_EXAMS = {
  "A1": { "pass": 70, "exercises": [
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "I ___ a student.",
      "options": [
        "am",
        "is",
        "are"
      ],
      "correctIndex": 0,
      "explanation": "Con 'I' usamos 'am'."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "They ___ my friends.",
      "options": [
        "am",
        "is",
        "are"
      ],
      "correctIndex": 2,
      "explanation": "Con 'they' (plural) usamos 'are'."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "My sister ___ a new dress.",
      "answers": [
        "has"
      ],
      "hint": "Tercera persona del singular (she).",
      "explanation": "Con 'my sister' (=she) el verbo 'have' cambia a 'has'."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "He ___ to school every day.",
      "options": [
        "go",
        "goes",
        "going"
      ],
      "correctIndex": 1,
      "explanation": "En presente simple, con 'he' anadimos -s/-es: 'goes'."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "She ___ like coffee.",
      "answers": [
        "doesn't",
        "does not"
      ],
      "hint": "Negativo en tercera persona del singular.",
      "explanation": "Con 'she' la negacion del presente simple es 'doesn't'."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "___ you speak English?",
      "options": [
        "Do",
        "Does",
        "Are"
      ],
      "correctIndex": 0,
      "explanation": "Para preguntar con 'you' en presente simple usamos 'Do'."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "There ___ a cat under the table.",
      "answers": [
        "is"
      ],
      "hint": "Sujeto singular (a cat).",
      "explanation": "Con un sustantivo singular usamos 'There is'."
    },
    {
      "type": "find_error",
      "skill": "grammar",
      "question": "Encuentra el error.",
      "segments": [
        "There ",
        {
          "u": "is"
        },
        " four ",
        {
          "u": "apples"
        },
        " in the bowl."
      ],
      "correctIndex": 0,
      "correction": "are (four apples -> there are)",
      "explanation": "Con un sustantivo plural ('four apples') usamos 'There are', no 'There is'."
    },
    {
      "type": "word_order",
      "skill": "grammar",
      "words": [
        "The",
        "baby",
        "is",
        "sleeping",
        "now"
      ],
      "correctOrder": [
        "The",
        "baby",
        "is",
        "sleeping",
        "now"
      ],
      "hint": "Presente continuo: sujeto + is + verbo-ing."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "Look! The children ___ in the garden.",
      "options": [
        "plays",
        "are playing",
        "play"
      ],
      "correctIndex": 1,
      "explanation": "La palabra 'Look!' y la accion en este momento piden presente continuo: 'are playing'."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "This is Tom and that is ___ dog.",
      "answers": [
        "his"
      ],
      "hint": "Adjetivo posesivo para 'Tom' (he).",
      "explanation": "Para hablar de algo de Tom (he) usamos el posesivo 'his'."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "I ___ swim very well.",
      "options": [
        "can",
        "cans",
        "am"
      ],
      "correctIndex": 0,
      "explanation": "'can' expresa habilidad y nunca lleva -s: 'I can swim'."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "Your mother's mother is your ___.",
      "options": [
        "aunt",
        "grandmother",
        "sister"
      ],
      "correctIndex": 1,
      "explanation": "La madre de tu madre es tu abuela ('grandmother')."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "Which one is a drink?",
      "options": [
        "bread",
        "milk",
        "cheese"
      ],
      "correctIndex": 1,
      "explanation": "'milk' (leche) es una bebida; 'bread' y 'cheese' son comida."
    },
    {
      "type": "true_false",
      "skill": "vocab",
      "statement": "You hear with your ears.",
      "answer": true,
      "explanation": "Oimos con las orejas/oidos ('ears'). La frase es correcta."
    },
    {
      "type": "fill_blank",
      "skill": "vocab",
      "sentence": "When it is cold, I wear a warm ___ on my body.",
      "answers": [
        "coat",
        "jacket",
        "sweater"
      ],
      "hint": "Una prenda de abrigo.",
      "explanation": "Cuando hace frio usamos un abrigo/chaqueta/sueter ('coat', 'jacket', 'sweater')."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "Which number is a 'teen'?",
      "options": [
        "thirty",
        "fifteen",
        "fifty"
      ],
      "correctIndex": 1,
      "explanation": "'fifteen' (15) termina en -teen; 'thirty' y 'fifty' son decenas (30, 50)."
    },
    {
      "type": "true_false",
      "skill": "vocab",
      "statement": "A cow is a farm animal.",
      "answer": true,
      "explanation": "La vaca ('cow') es un animal de granja. La frase es verdadera."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "We cook food in the ___.",
      "options": [
        "bathroom",
        "kitchen",
        "bedroom"
      ],
      "correctIndex": 1,
      "explanation": "Cocinamos en la cocina ('kitchen')."
    },
    {
      "type": "fill_blank",
      "skill": "use",
      "sentence": "I have one foot, but a dog has four ___.",
      "answers": [
        "feet"
      ],
      "hint": "Plural irregular de 'foot'.",
      "explanation": "El plural irregular de 'foot' es 'feet'."
    },
    {
      "type": "multiple_choice",
      "skill": "use",
      "question": "We have one child, and they have two ___.",
      "options": [
        "childs",
        "children",
        "childes"
      ],
      "correctIndex": 1,
      "explanation": "El plural irregular de 'child' es 'children'."
    },
    {
      "type": "multiple_choice",
      "skill": "use",
      "question": "I want ___ orange and ___ banana.",
      "options": [
        "an / a",
        "a / an",
        "the / a"
      ],
      "correctIndex": 0,
      "explanation": "'orange' empieza por sonido vocalico (an), 'banana' por sonido consonantico (a)."
    },
    {
      "type": "translate",
      "skill": "use",
      "prompt": "Traduce: \"El gato esta debajo de la mesa.\"",
      "answers": [
        "the cat is under the table"
      ],
      "explanation": "The cat is under the table. ('under' = debajo de)."
    },
    {
      "type": "translate",
      "skill": "use",
      "prompt": "Traduce: \"Mi hermano tiene dos perros.\"",
      "answers": [
        "my brother has two dogs"
      ],
      "explanation": "My brother has two dogs. (con 'my brother' = he, usamos 'has')."
    },
    {
      "type": "find_error",
      "skill": "use",
      "question": "Encuentra el error.",
      "segments": [
        "The book is ",
        {
          "u": "between"
        },
        " the lamp and the ",
        {
          "u": "mans"
        },
        " photo."
      ],
      "correctIndex": 1,
      "correction": "man's (posesivo: man -> man's)",
      "explanation": "Aqui se necesita el posesivo: 'the man's photo' (la foto del hombre). 'mans' no existe; el posesivo singular es 'man's'."
    },
    {
      "type": "reading",
      "skill": "reading",
      "title": "Anna's Day",
      "passage": "Anna is twenty years old. She lives in a small house in London with her mother and her brother.\nEvery morning she gets up at seven o'clock. She has breakfast in the kitchen and drinks a cup of tea.\nAnna works in a shop. She likes her job because she loves talking to people. In the evening she watches TV with her family. On Sundays she plays with her dog in the park.",
      "questions": [
        {
          "q": "How old is Anna?",
          "options": [
            "Seven",
            "Twenty",
            "Twelve",
            "Thirty"
          ],
          "correctIndex": 1,
          "explanation": "El texto dice 'Anna is twenty years old'."
        },
        {
          "q": "Where does Anna live?",
          "options": [
            "In Paris",
            "In a big house",
            "In London",
            "In a shop"
          ],
          "correctIndex": 2,
          "explanation": "El texto dice que vive en una casa pequena en Londres ('in London')."
        },
        {
          "q": "What does Anna drink at breakfast?",
          "options": [
            "Coffee",
            "Milk",
            "Water",
            "Tea"
          ],
          "correctIndex": 3,
          "explanation": "El texto dice 'drinks a cup of tea'."
        },
        {
          "q": "Where does Anna work?",
          "options": [
            "In a shop",
            "In a park",
            "At home",
            "In a school"
          ],
          "correctIndex": 0,
          "explanation": "El texto dice 'Anna works in a shop'."
        },
        {
          "q": "What does Anna do on Sundays?",
          "options": [
            "She works",
            "She watches TV",
            "She plays with her dog",
            "She drinks tea"
          ],
          "correctIndex": 2,
          "explanation": "El texto dice 'On Sundays she plays with her dog in the park'."
        }
      ]
    },
    {
      "type": "listening",
      "skill": "listening",
      "text": "Hello! My name is David. I am from Spain and I am eleven years old. I have one sister and a small dog. I like football and pizza.",
      "question": "Where is David from?",
      "options": [
        "Italy",
        "Spain",
        "England"
      ],
      "correctIndex": 1,
      "explanation": "David dice 'I am from Spain', es decir, es de Espana."
    },
    {
      "type": "listening",
      "skill": "listening",
      "text": "Excuse me. Go straight on and turn left. The supermarket is next to the bank. It is open today.",
      "question": "Where is the supermarket?",
      "options": [
        "Behind the bank",
        "Next to the bank",
        "In front of the school"
      ],
      "correctIndex": 1,
      "explanation": "La persona dice 'The supermarket is next to the bank' (al lado del banco)."
    }
  ] },
  "A2": { "pass": 70, "exercises": [
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "Last summer we ___ to Italy on holiday.",
      "options": [
        "go",
        "went",
        "goed",
        "going"
      ],
      "correctIndex": 1,
      "explanation": "El pasado simple del verbo irregular 'go' es 'went'."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "Yesterday she ___ a new dress at the shopping centre.",
      "options": [
        "buy",
        "buys",
        "bought",
        "buyed"
      ],
      "correctIndex": 2,
      "explanation": "El pasado simple irregular de 'buy' es 'bought'."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "When I was a child, I ___ very happy.",
      "answers": [
        "was"
      ],
      "hint": "Sujeto 'I' en pasado.",
      "explanation": "Con 'I' usamos 'was' en pasado del verbo 'be'."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "My parents ___ at home last night.",
      "answers": [
        "were"
      ],
      "hint": "Sujeto plural en pasado del verbo 'be'.",
      "explanation": "Con sujetos plurales ('my parents') usamos 'were'."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "My brother is ___ than me.",
      "options": [
        "tall",
        "taller",
        "tallest",
        "more tall"
      ],
      "correctIndex": 1,
      "explanation": "El comparativo de adjetivos cortos añade '-er': 'taller'. Para comparar usamos 'taller than'."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "This is ___ restaurant in the city.",
      "options": [
        "the best",
        "the better",
        "best",
        "the goodest"
      ],
      "correctIndex": 0,
      "explanation": "El superlativo irregular de 'good' es 'the best'."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "Mount Everest is the ___ mountain in the world.",
      "answers": [
        "highest",
        "tallest"
      ],
      "hint": "Superlativo de un adjetivo corto.",
      "explanation": "El superlativo de adjetivos cortos: 'the highest' (o 'the tallest')."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "How ___ water do you drink every day?",
      "options": [
        "many",
        "much",
        "any",
        "some"
      ],
      "correctIndex": 1,
      "explanation": "'Water' es incontable, por eso usamos 'much'."
    },
    {
      "type": "find_error",
      "skill": "grammar",
      "question": "Encuentra el error.",
      "segments": [
        "How ",
        {
          "u": "much"
        },
        " ",
        {
          "u": "apples"
        },
        " do you want?"
      ],
      "correctIndex": 0,
      "correction": "many (much -> many)",
      "explanation": "'Apples' es contable y plural, por eso usamos 'many', no 'much'. El error está en 'much'."
    },
    {
      "type": "word_order",
      "skill": "grammar",
      "words": [
        "Did",
        "you",
        "see",
        "the",
        "doctor",
        "yesterday"
      ],
      "correctOrder": [
        "Did",
        "you",
        "see",
        "the",
        "doctor",
        "yesterday"
      ],
      "hint": "Pregunta en pasado simple: Did + sujeto + verbo base."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "I ___ go to school last Sunday.",
      "answers": [
        "didn't",
        "did not"
      ],
      "hint": "Negativo en pasado simple + verbo base.",
      "explanation": "La negación en pasado simple es 'didn't' (did not) + verbo base."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "She ___ lived in London for two years.",
      "options": [
        "has",
        "have",
        "is",
        "was"
      ],
      "correctIndex": 0,
      "explanation": "Presente perfecto con 'she': has + participio ('lived')."
    },
    {
      "type": "true_false",
      "skill": "grammar",
      "statement": "The sentence 'Have you ever been to Paris?' is correct.",
      "answer": true,
      "explanation": "Es correcta. 'Have you ever been...?' es presente perfecto para experiencias."
    },
    {
      "type": "multiple_choice",
      "skill": "use",
      "question": "We always have lunch ___ noon.",
      "options": [
        "in",
        "on",
        "at",
        "to"
      ],
      "correctIndex": 2,
      "explanation": "Con horas exactas usamos la preposición 'at': 'at noon'."
    },
    {
      "type": "fill_blank",
      "skill": "use",
      "sentence": "My birthday is ___ July.",
      "answers": [
        "in"
      ],
      "hint": "Preposición con meses.",
      "explanation": "Con meses usamos 'in': 'in July'."
    },
    {
      "type": "multiple_choice",
      "skill": "use",
      "question": "I have an English class ___ Monday.",
      "options": [
        "in",
        "at",
        "on",
        "of"
      ],
      "correctIndex": 2,
      "explanation": "Con días de la semana usamos 'on': 'on Monday'."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "He ___ takes the bus to work; he prefers walking.",
      "options": [
        "always",
        "usually",
        "never",
        "often"
      ],
      "correctIndex": 2,
      "explanation": "Si prefiere caminar, 'never' (nunca) toma el autobús. Los adverbios de frecuencia van antes del verbo principal."
    },
    {
      "type": "word_order",
      "skill": "grammar",
      "words": [
        "She",
        "is",
        "usually",
        "late",
        "for",
        "work"
      ],
      "correctOrder": [
        "She",
        "is",
        "usually",
        "late",
        "for",
        "work"
      ],
      "hint": "El adverbio de frecuencia va después del verbo 'be'."
    },
    {
      "type": "translate",
      "skill": "use",
      "prompt": "Traduce: \"Fui al médico la semana pasada.\"",
      "answers": [
        "i went to the doctor last week",
        "i went to the doctor's last week",
        "i went to see the doctor last week"
      ],
      "explanation": "I went to the doctor last week. Pasado simple irregular de 'go' = 'went'."
    },
    {
      "type": "translate",
      "skill": "use",
      "prompt": "Traduce: \"¿Cuánto cuesta esta camiseta?\"",
      "answers": [
        "how much is this t-shirt",
        "how much does this t-shirt cost",
        "how much is this t shirt",
        "how much does this t shirt cost"
      ],
      "explanation": "How much is this t-shirt? Para preguntar precios usamos 'How much is...?'."
    },
    {
      "type": "translate",
      "skill": "use",
      "prompt": "Traduce: \"Nunca he estado en Londres.\"",
      "answers": [
        "i have never been to london",
        "i've never been to london"
      ],
      "explanation": "I have never been to London. Presente perfecto con 'never' para experiencias."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "Go straight on and ___ left at the bank.",
      "options": [
        "turn",
        "go",
        "drive",
        "walk"
      ],
      "correctIndex": 0,
      "explanation": "Para dar direcciones usamos 'turn left/right' (girar a la izquierda/derecha)."
    },
    {
      "type": "true_false",
      "skill": "vocab",
      "statement": "If you have a headache, your head hurts.",
      "answer": true,
      "explanation": "Verdadero. 'Headache' es dolor de cabeza, así que la cabeza ('head') duele."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "It's raining a lot today, so take your ___.",
      "options": [
        "sunglasses",
        "umbrella",
        "swimsuit",
        "hat"
      ],
      "correctIndex": 1,
      "explanation": "Si llueve mucho necesitas un paraguas ('umbrella')."
    },
    {
      "type": "fill_blank",
      "skill": "vocab",
      "sentence": "In winter the weather is cold and it sometimes ___.",
      "answers": [
        "snows"
      ],
      "hint": "Verbo del tiempo: cuando cae nieve.",
      "explanation": "'It snows' significa que nieva. Con 'it' añadimos '-s' al verbo."
    },
    {
      "type": "true_false",
      "skill": "vocab",
      "statement": "You usually wear shoes on your feet.",
      "answer": true,
      "explanation": "Verdadero. Los zapatos ('shoes') se llevan en los pies ('feet')."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "I want to pay, so I'll ask for the ___ in the café.",
      "options": [
        "bill",
        "ticket",
        "money",
        "card"
      ],
      "correctIndex": 0,
      "explanation": "En un café o restaurante, la cuenta se llama 'the bill'."
    },
    {
      "type": "find_error",
      "skill": "vocab",
      "question": "Encuentra el error.",
      "segments": [
        "Every morning I ",
        {
          "u": "make"
        },
        " a shower and then I ",
        {
          "u": "have"
        },
        " breakfast."
      ],
      "correctIndex": 0,
      "correction": "have/take (make -> have/take a shower)",
      "explanation": "Se dice 'have a shower' o 'take a shower', no 'make a shower'. El error está en 'make'."
    },
    {
      "type": "reading",
      "skill": "reading",
      "title": "My Trip to the Beach",
      "passage": "Last August, my family and I went to a small town near the sea. We travelled by train because my mother doesn't like flying. The journey was long, but it was fun.\n\nWe stayed in a small hotel close to the beach. Every morning we had breakfast at eight o'clock and then we walked to the sea. The water was warm and the weather was sunny all week.\n\nOne day, my father wanted to visit an old castle on a hill. My little brother didn't want to go because he was tired, so he stayed at the hotel with my mother. My father and I walked for two hours to reach the castle. It was beautiful and we took many photos.\n\nOn the last day, I bought some small gifts for my friends. I was sad to leave, but I was happy because it was the best holiday of my life.",
      "questions": [
        {
          "q": "How did the family travel to the town?",
          "options": [
            "By plane",
            "By train",
            "By car",
            "By bus"
          ],
          "correctIndex": 1,
          "explanation": "El texto dice 'We travelled by train'."
        },
        {
          "q": "What did they do every morning?",
          "options": [
            "They visited a castle",
            "They went shopping",
            "They had breakfast and walked to the sea",
            "They stayed at the hotel"
          ],
          "correctIndex": 2,
          "explanation": "El texto dice que cada mañana desayunaban y caminaban hasta el mar."
        },
        {
          "q": "Why did the little brother stay at the hotel?",
          "options": [
            "He was tired",
            "He was ill",
            "He didn't like castles",
            "He wanted to swim"
          ],
          "correctIndex": 0,
          "explanation": "El texto dice 'he was tired' (estaba cansado)."
        },
        {
          "q": "What did the writer buy on the last day?",
          "options": [
            "Photos",
            "A castle",
            "Gifts for friends",
            "Train tickets"
          ],
          "correctIndex": 2,
          "explanation": "El texto dice 'I bought some small gifts for my friends'."
        },
        {
          "q": "How did the writer feel about the holiday?",
          "options": [
            "It was boring",
            "It was the best holiday of their life",
            "It was too short",
            "It was very expensive"
          ],
          "correctIndex": 1,
          "explanation": "El texto termina diciendo que fue 'the best holiday of my life'."
        }
      ]
    },
    {
      "type": "listening",
      "skill": "listening",
      "text": "Excuse me, how do I get to the train station? Go straight on for two hundred metres. Then turn left at the supermarket. The station is on your right, next to the bank.",
      "question": "Where is the train station?",
      "options": [
        "On the left, next to the supermarket",
        "On the right, next to the bank",
        "Straight on, behind the bank"
      ],
      "correctIndex": 1,
      "explanation": "El hablante dice que la estación está a la derecha ('on your right'), al lado del banco."
    },
    {
      "type": "listening",
      "skill": "listening",
      "text": "Good morning, doctor. I don't feel well. I have a headache and a sore throat. I think I have a cold. You should drink hot water and rest at home for two days.",
      "question": "What is the patient's problem?",
      "options": [
        "A broken leg",
        "A headache and a sore throat",
        "A stomach ache"
      ],
      "correctIndex": 1,
      "explanation": "El paciente dice que tiene dolor de cabeza ('headache') y dolor de garganta ('sore throat')."
    }
  ] },
  "B1": { "pass": 70, "exercises": [
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "I ___ my homework, so I can go out now.",
      "options": [
        "have already finished",
        "already finished",
        "am finishing",
        "finish"
      ],
      "correctIndex": 0,
      "explanation": "El presente perfecto (have finished) conecta una accion pasada con el presente; 'already' refuerza que la tarea ya esta hecha ahora."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "We ___ to Italy last summer; it was wonderful.",
      "options": [
        "have gone",
        "go",
        "went",
        "have been going"
      ],
      "correctIndex": 2,
      "explanation": "Con un tiempo pasado concreto (last summer) se usa el pasado simple: 'went'."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "I have lived in this city ___ 2015.",
      "answers": [
        "since"
      ],
      "hint": "Punto de inicio en el tiempo.",
      "explanation": "Usamos 'since' con un momento concreto de inicio (2015); 'for' se usa con periodos de duracion."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "She has worked here ___ three years.",
      "answers": [
        "for"
      ],
      "hint": "Duracion, no punto de inicio.",
      "explanation": "Usamos 'for' con periodos de tiempo (three years); 'since' seria con una fecha o momento."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "If you heat ice, it ___.",
      "options": [
        "would melt",
        "melts",
        "will melt",
        "melted"
      ],
      "correctIndex": 1,
      "explanation": "Condicional cero: para hechos generales se usa presente simple en ambas partes (If + presente, presente)."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "If it rains tomorrow, we ___ the meeting online.",
      "options": [
        "have",
        "will have",
        "would have",
        "had"
      ],
      "correctIndex": 1,
      "explanation": "Primer condicional para situaciones reales futuras: If + presente, will + verbo base."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "If I had more time, I ___ learn another language.",
      "answers": [
        "would"
      ],
      "hint": "Segundo condicional, situacion hipotetica.",
      "explanation": "Segundo condicional para situaciones imaginarias: If + pasado simple, would + verbo base."
    },
    {
      "type": "find_error",
      "skill": "grammar",
      "question": "Encuentra el error.",
      "segments": [
        "The man ",
        {
          "u": "which"
        },
        " lives next door ",
        {
          "u": "works"
        },
        " at the hospital."
      ],
      "correctIndex": 0,
      "correction": "who (which -> who)",
      "explanation": "Para personas se usa el pronombre relativo 'who' (o 'that'), no 'which', que es para cosas."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "This is the restaurant ___ we had dinner last night.",
      "options": [
        "which",
        "who",
        "where",
        "what"
      ],
      "correctIndex": 2,
      "explanation": "'where' es el relativo para lugares (the restaurant = un lugar)."
    },
    {
      "type": "word_order",
      "skill": "grammar",
      "words": [
        "The",
        "bridge",
        "was",
        "built",
        "in",
        "1990"
      ],
      "correctOrder": [
        "The",
        "bridge",
        "was",
        "built",
        "in",
        "1990"
      ],
      "hint": "Voz pasiva en pasado: was + participio."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "Coffee ___ grown in Colombia.",
      "answers": [
        "is"
      ],
      "hint": "Voz pasiva en presente, sujeto singular.",
      "explanation": "Pasiva en presente: 'is' + participio (grown). El cafe recibe la accion, no la hace."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "You look tired. You ___ go to bed earlier.",
      "options": [
        "must",
        "should",
        "can't",
        "might"
      ],
      "correctIndex": 1,
      "explanation": "'should' se usa para dar consejos. 'must' seria obligacion fuerte y 'might' solo posibilidad."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "The lights are off and the car is gone. They ___ be at home.",
      "options": [
        "must",
        "should",
        "can't",
        "could"
      ],
      "correctIndex": 2,
      "explanation": "'can't' expresa deduccion de que algo es imposible segun la evidencia (no pueden estar en casa)."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "She enjoys ___ (read) before going to sleep.",
      "answers": [
        "reading"
      ],
      "hint": "Tras 'enjoy' se usa gerundio.",
      "explanation": "Despues de verbos como enjoy, stop o avoid se usa la forma en -ing: 'reading'."
    },
    {
      "type": "find_error",
      "skill": "grammar",
      "question": "Encuentra el error.",
      "segments": [
        "I ",
        {
          "u": "avoid"
        },
        " ",
        {
          "u": "to eat"
        },
        " sugar at night."
      ],
      "correctIndex": 1,
      "correction": "eating (to eat -> eating)",
      "explanation": "Tras 'avoid' se usa el gerundio: 'avoid eating', no el infinitivo."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "Could you ___ the lights when you leave the room?",
      "options": [
        "turn off",
        "look after",
        "set up",
        "get up"
      ],
      "correctIndex": 0,
      "explanation": "'turn off' significa apagar (un aparato o las luces)."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "My neighbour will ___ my dog while I'm on holiday.",
      "options": [
        "turn off",
        "look after",
        "set up",
        "get up"
      ],
      "correctIndex": 1,
      "explanation": "'look after' significa cuidar de alguien o algo."
    },
    {
      "type": "fill_blank",
      "skill": "vocab",
      "sentence": "They decided to ___ up their own company after university.",
      "answers": [
        "set"
      ],
      "hint": "Phrasal verb que significa crear o fundar.",
      "explanation": "'set up' significa montar o fundar (un negocio, una empresa)."
    },
    {
      "type": "true_false",
      "skill": "vocab",
      "statement": "If you 'download' a file, you save it from the internet to your device.",
      "answer": true,
      "explanation": "'download' significa descargar: traer un archivo de internet a tu dispositivo."
    },
    {
      "type": "true_false",
      "skill": "vocab",
      "statement": "Recycling and renewable energy are ways to harm the environment.",
      "answer": false,
      "explanation": "Reciclar y usar energias renovables ayudan a proteger el medio ambiente, no a danarlo."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "After the interview, the company offered her the ___.",
      "options": [
        "salary",
        "position",
        "colleague",
        "deadline"
      ],
      "correctIndex": 1,
      "explanation": "'position' significa puesto de trabajo, lo que una empresa ofrece tras una entrevista."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "Climate change is partly caused by greenhouse ___ from cars and factories.",
      "options": [
        "gases",
        "wildlife",
        "recycling",
        "habits"
      ],
      "correctIndex": 0,
      "explanation": "'greenhouse gases' (gases de efecto invernadero) son una causa del cambio climatico."
    },
    {
      "type": "translate",
      "skill": "use",
      "prompt": "Traduce: \"He vivido aqui durante cinco anos.\"",
      "answers": [
        "i have lived here for five years",
        "i've lived here for five years"
      ],
      "explanation": "I have lived here for five years. Presente perfecto + 'for' para duracion."
    },
    {
      "type": "translate",
      "skill": "use",
      "prompt": "Traduce: \"Si tuviera mas dinero, viajaria por el mundo.\"",
      "answers": [
        "if i had more money, i would travel around the world",
        "if i had more money i would travel around the world",
        "if i had more money, i'd travel around the world",
        "if i had more money i'd travel around the world",
        "if i had more money, i would travel the world",
        "if i had more money i would travel the world"
      ],
      "explanation": "If I had more money, I would travel around the world. Segundo condicional."
    },
    {
      "type": "word_order",
      "skill": "use",
      "words": [
        "Have",
        "you",
        "ever",
        "been",
        "to",
        "Japan",
        "?"
      ],
      "correctOrder": [
        "Have",
        "you",
        "ever",
        "been",
        "to",
        "Japan",
        "?"
      ],
      "hint": "Pregunta en presente perfecto con 'ever'."
    },
    {
      "type": "fill_blank",
      "skill": "use",
      "sentence": "I'm not sure where she is; she ___ be at work.",
      "answers": [
        "might",
        "could",
        "may"
      ],
      "hint": "Modal de posibilidad (quizas).",
      "explanation": "'might', 'could' o 'may' expresan posibilidad cuando no estamos seguros."
    },
    {
      "type": "translate",
      "skill": "use",
      "prompt": "Traduce: \"Apaga la television antes de irte a la cama.\"",
      "answers": [
        "turn off the tv before going to bed",
        "turn off the television before going to bed",
        "turn the tv off before going to bed",
        "turn the television off before going to bed",
        "switch off the tv before going to bed",
        "switch off the television before going to bed"
      ],
      "explanation": "Turn off the TV before going to bed. 'turn off' + gerundio tras 'before'."
    },
    {
      "type": "find_error",
      "skill": "use",
      "question": "Encuentra el error.",
      "segments": [
        "I ",
        {
          "u": "have seen"
        },
        " that film ",
        {
          "u": "yesterday"
        },
        "."
      ],
      "correctIndex": 0,
      "correction": "saw (have seen -> saw)",
      "explanation": "Con 'yesterday' (tiempo pasado concreto) se usa el pasado simple 'saw', no el presente perfecto."
    },
    {
      "type": "reading",
      "skill": "reading",
      "title": "Working from Home",
      "passage": "Ten years ago, very few people worked from home. Today, millions of employees around the world spend at least part of their week working in their living rooms or kitchens instead of in a traditional office. The change happened quickly, and many companies were surprised to discover that their staff could be just as productive at home.\n\nThere are clear advantages. Workers save time and money because they do not have to travel to an office every day. They can also organise their day more freely, which helps people who have children or other responsibilities. Some studies suggest that employees who work from home feel less stressed and take fewer sick days.\n\nHowever, working from home is not perfect. Some people miss the social contact of an office and feel lonely. Others find it hard to separate their work from their personal life, and they end up working too many hours. Younger employees, in particular, often say they learn more quickly when they sit next to experienced colleagues.\n\nFor this reason, many companies now prefer a 'hybrid' model. Staff come to the office two or three days a week and work from home on the other days. Experts believe this mix may be the most balanced solution for the future of work.",
      "questions": [
        {
          "q": "What is the main idea of the text?",
          "options": [
            "Offices will soon disappear completely.",
            "Working from home has both benefits and problems, and a mix may be best.",
            "Everyone prefers working from home.",
            "Companies do not trust their employees."
          ],
          "correctIndex": 1,
          "explanation": "El texto presenta ventajas y desventajas y concluye que el modelo hibrido puede ser la mejor solucion."
        },
        {
          "q": "According to the text, why do workers save money when working from home?",
          "options": [
            "They earn higher salaries.",
            "They do not pay for the internet.",
            "They do not have to travel to an office.",
            "They work fewer hours."
          ],
          "correctIndex": 2,
          "explanation": "El texto dice que ahorran tiempo y dinero porque no tienen que viajar a la oficina."
        },
        {
          "q": "What problem do younger employees mention?",
          "options": [
            "They earn less money.",
            "They learn more quickly next to experienced colleagues.",
            "They cannot use computers.",
            "They never feel lonely."
          ],
          "correctIndex": 1,
          "explanation": "El texto indica que los empleados mas jovenes dicen que aprenden mas rapido junto a colegas con experiencia."
        },
        {
          "q": "What does the 'hybrid' model mean in the text?",
          "options": [
            "Working only from home.",
            "Working only in the office.",
            "Combining office days and home days.",
            "Working at night."
          ],
          "correctIndex": 2,
          "explanation": "El modelo 'hibrido' combina dias en la oficina con dias trabajando desde casa, como explica el texto."
        },
        {
          "q": "What can we infer about the author's opinion?",
          "options": [
            "The author thinks home working is always bad.",
            "The author sees the hybrid model as a reasonable balance.",
            "The author dislikes offices.",
            "The author thinks productivity always falls at home."
          ],
          "correctIndex": 1,
          "explanation": "El tono y la conclusion sugieren que el autor ve el modelo hibrido como una solucion equilibrada."
        }
      ]
    },
    {
      "type": "listening",
      "skill": "listening",
      "text": "Hi, this is a message for Mr Daniels. This is Sarah from City Dental Clinic. I'm calling to let you know that your appointment on Thursday at three o'clock has to be moved. The dentist is not available that afternoon. Please call us back to choose a new time. Thank you.",
      "question": "Why is Sarah calling?",
      "options": [
        "To cancel the clinic permanently.",
        "To change the time of an appointment.",
        "To confirm that Thursday at three is fine."
      ],
      "correctIndex": 1,
      "explanation": "Sarah explica que la cita debe moverse porque el dentista no esta disponible, por eso pide que llamen para elegir otra hora."
    },
    {
      "type": "listening",
      "skill": "listening",
      "text": "Honestly, I was a bit disappointed with the new phone. Everyone said the camera was amazing, and yes, the photos are good. But the battery only lasts half a day, and for that price I really expected more. I'm not sure I would recommend it to a friend.",
      "question": "What is the speaker's attitude towards the phone?",
      "options": [
        "Completely satisfied and enthusiastic.",
        "Disappointed, mainly because of the battery and price.",
        "Angry because the camera is terrible."
      ],
      "correctIndex": 1,
      "explanation": "El hablante reconoce que la camara es buena pero se muestra decepcionado por la bateria y el precio, por eso duda en recomendarlo."
    }
  ] },
  "B2": { "pass": 72, "exercises": [
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "I'm exhausted because I ___ for the final exam since early this morning.",
      "options": [
        "studied",
        "have been studying",
        "had studied",
        "am studying"
      ],
      "correctIndex": 1,
      "explanation": "El present perfect continuous (have been studying) expresa una accion que comenzo en el pasado y continua, con enfasis en la duracion ('since early this morning')."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "By the time the manager arrived, the team ___ the entire report.",
      "options": [
        "finished",
        "has finished",
        "had finished",
        "was finishing"
      ],
      "correctIndex": 2,
      "explanation": "El past perfect (had finished) marca una accion anterior a otra accion pasada ('arrived')."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "If I ___ about the meeting, I would have attended it.",
      "options": [
        "knew",
        "had known",
        "would know",
        "have known"
      ],
      "correctIndex": 1,
      "explanation": "Tercer condicional: 'if + past perfect' (had known) + 'would have + participio' para una situacion irreal del pasado."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "If she had taken that job, she ___ in London now.",
      "options": [
        "would have lived",
        "would live",
        "had lived",
        "lives"
      ],
      "correctIndex": 1,
      "explanation": "Condicional mixto: condicion pasada irreal ('had taken') con resultado presente ('would live now')."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "We're getting the kitchen repainted next week because we ___ to do it ourselves.",
      "options": [
        "don't have the time",
        "aren't have time",
        "won't doing it",
        "not have time"
      ],
      "correctIndex": 0,
      "explanation": "Tras la causativa 'getting the kitchen repainted' (otra persona lo hace), la razon logica es que no se hace uno mismo; 'don't have the time to do it ourselves' es la unica opcion gramaticalmente correcta."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "Not only ___ she apologise, but she also offered to pay for the damage.",
      "answers": [
        "did"
      ],
      "hint": "Inversion tras 'Not only' con verbo en pasado simple.",
      "explanation": "Tras 'Not only' al inicio de la oracion se invierte el orden: auxiliar 'did' + sujeto + verbo base."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "The committee insisted that the new policy ___ implemented immediately.",
      "answers": [
        "be"
      ],
      "hint": "Subjuntivo tras 'insisted that'.",
      "explanation": "El subjuntivo en ingles usa la forma base del verbo ('be') tras verbos como insist/suggest/demand, sin importar el sujeto."
    },
    {
      "type": "word_order",
      "skill": "grammar",
      "words": [
        "I",
        "suggest",
        "that",
        "he",
        "arrive",
        "before",
        "noon"
      ],
      "correctOrder": [
        "I",
        "suggest",
        "that",
        "he",
        "arrive",
        "before",
        "noon"
      ],
      "hint": "Subjuntivo: forma base 'arrive' aunque el sujeto sea 'he'."
    },
    {
      "type": "find_error",
      "skill": "grammar",
      "question": "Encuentra el error en la oracion (estilo reportado).",
      "segments": [
        "She told me that she ",
        {
          "u": "will"
        },
        " finish the project ",
        {
          "u": "the following"
        },
        " week."
      ],
      "correctIndex": 0,
      "correction": "would (will -> would)",
      "explanation": "En estilo indirecto con verbo introductorio en pasado ('told'), 'will' cambia a 'would'."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "In a formal email, which word best replaces 'get' in 'We need to get permission first.'?",
      "options": [
        "grab",
        "obtain",
        "catch",
        "fetch"
      ],
      "correctIndex": 1,
      "explanation": "'Obtain' es el sinonimo de registro formal de 'get' (conseguir/obtener) adecuado en un correo profesional."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "Choose the most formal synonym: 'Could you ___ me with this task?'",
      "options": [
        "assist",
        "help out",
        "give a hand to",
        "back up"
      ],
      "correctIndex": 0,
      "explanation": "'Assist' es la opcion de registro formal equivalente a 'help'."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "She remained ___ about the new proposal, feeling both attracted to and worried about it at the same time.",
      "options": [
        "dismissive",
        "ambivalent",
        "compelling",
        "skeptical"
      ],
      "correctIndex": 1,
      "explanation": "'Ambivalent' describe tener sentimientos mezclados o contradictorios simultaneamente."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "The lawyer presented a ___ argument that convinced the entire jury.",
      "options": [
        "dismissive",
        "skeptical",
        "compelling",
        "ambivalent"
      ],
      "correctIndex": 2,
      "explanation": "'Compelling' significa convincente o persuasivo, lo que encaja con convencer al jurado."
    },
    {
      "type": "true_false",
      "skill": "vocab",
      "statement": "If someone is 'skeptical' about a claim, they tend to doubt that it is true.",
      "answer": true,
      "explanation": "'Skeptical' (esceptico) describe a quien duda o no se convence facilmente de algo."
    },
    {
      "type": "fill_blank",
      "skill": "vocab",
      "sentence": "The conference will ___ at nine o'clock sharp with the keynote speech. (formal synonym of 'begin')",
      "answers": [
        "commence"
      ],
      "hint": "Verbo formal que significa 'empezar'.",
      "explanation": "'Commence' es el sinonimo de registro formal de 'begin/start'."
    },
    {
      "type": "translate",
      "skill": "vocab",
      "prompt": "Traduce con registro formal: \"Recibimos numerosas solicitudes.\"",
      "answers": [
        "we received numerous requests",
        "we received numerous applications",
        "we have received numerous requests",
        "we have received numerous applications"
      ],
      "explanation": "'Numerous' (numerosas) y 'requests/applications' (solicitudes) son las opciones de registro formal frente a 'many' o 'lots of'."
    },
    {
      "type": "multiple_choice",
      "skill": "use",
      "question": "___ the heavy rain, the outdoor concert went ahead as planned.",
      "options": [
        "Although",
        "Despite",
        "However",
        "Whereas"
      ],
      "correctIndex": 1,
      "explanation": "'Despite' va seguido de un sustantivo o gerundio ('the heavy rain'), no de una oracion completa; por eso no se usa 'Although'."
    },
    {
      "type": "multiple_choice",
      "skill": "use",
      "question": "The first design was bold and colourful, ___ the second was minimalist and grey.",
      "options": [
        "despite",
        "however",
        "whereas",
        "although"
      ],
      "correctIndex": 2,
      "explanation": "'Whereas' contrasta dos ideas paralelas dentro de la misma oracion (uno frente al otro)."
    },
    {
      "type": "fill_blank",
      "skill": "use",
      "sentence": "The results were disappointing. ___, the team refused to give up. (connector of contrast + comma)",
      "answers": [
        "however"
      ],
      "hint": "Conector que enlaza dos oraciones separadas y suele ir seguido de coma.",
      "explanation": "'However' enlaza dos oraciones independientes para expresar contraste y va seguido de coma."
    },
    {
      "type": "translate",
      "skill": "use",
      "prompt": "Traduce: \"Llevo dos horas esperando el autobus.\"",
      "answers": [
        "i have been waiting for the bus for two hours",
        "i've been waiting for the bus for two hours"
      ],
      "explanation": "El present perfect continuous ('have been waiting ... for two hours') expresa una accion que continua desde hace dos horas."
    },
    {
      "type": "translate",
      "skill": "use",
      "prompt": "Traduce usando causativa: \"Voy a arreglar mi coche (que me lo arreglen).\"",
      "answers": [
        "i am going to have my car repaired",
        "i'm going to have my car repaired",
        "i am going to have my car fixed",
        "i'm going to have my car fixed",
        "i am going to get my car repaired",
        "i'm going to get my car repaired",
        "i am going to get my car fixed",
        "i'm going to get my car fixed"
      ],
      "explanation": "La causativa 'have/get something done' (have my car repaired) indica que otra persona realiza la accion por ti."
    },
    {
      "type": "find_error",
      "skill": "use",
      "question": "Encuentra el error en el uso del conector.",
      "segments": [
        "Despite ",
        {
          "u": "of"
        },
        " the difficult conditions, ",
        {
          "u": "they"
        },
        " completed the climb."
      ],
      "correctIndex": 0,
      "correction": "(elimina 'of': Despite of -> Despite)",
      "explanation": "'Despite' va seguido directamente de un sustantivo, sin 'of'. Lo correcto es 'Despite the difficult conditions' (o 'In spite of the difficult conditions')."
    },
    {
      "type": "word_order",
      "skill": "use",
      "words": [
        "She",
        "asked",
        "me",
        "where",
        "I",
        "had",
        "been"
      ],
      "correctOrder": [
        "She",
        "asked",
        "me",
        "where",
        "I",
        "had",
        "been"
      ],
      "hint": "Pregunta reportada: orden de afirmacion (sujeto + verbo), sin inversion."
    },
    {
      "type": "reading",
      "skill": "reading",
      "title": "The Rise of Citizen Science",
      "passage": "Over the past two decades, a quiet revolution has been reshaping the way scientific research is conducted. Known as citizen science, it involves ordinary members of the public contributing to genuine research projects, often by collecting data, classifying images, or reporting observations from their own neighbourhoods. What was once dismissed by some professionals as amateur dabbling has gradually earned considerable respect within the academic community.\n\nThe appeal of citizen science lies partly in scale. A single laboratory may employ a handful of researchers, but an online platform can mobilise tens of thousands of volunteers. These contributors have helped astronomers classify distant galaxies, enabled ecologists to track the migration of birds across entire continents, and allowed medical researchers to fold proteins through online puzzle games. Tasks that would take a small team decades can be completed in months when the effort is distributed among the many.\n\nCritics, however, raise legitimate concerns about reliability. Volunteers vary enormously in their training and motivation, and errors can creep into datasets that have not been gathered under controlled conditions. To counter this, project designers typically build in safeguards: the same observation may be checked by several independent participants, and statistical methods are used to filter out anomalies. When such measures are applied carefully, studies suggest that the quality of citizen-generated data can rival that produced by professionals.\n\nPerhaps the most significant benefit, though, is not scientific but social. By participating, ordinary people gain a deeper understanding of how knowledge is created and become more invested in the issues they study. In an age when public trust in expertise is fragile, this sense of shared ownership may prove just as valuable as the data itself.",
      "questions": [
        {
          "q": "What is the main idea of the passage?",
          "options": [
            "Citizen science has become a respected and valuable approach despite concerns about data reliability.",
            "Professional scientists are being replaced by untrained volunteers.",
            "Online games are the most effective form of scientific research.",
            "Public trust in science has declined because of citizen science."
          ],
          "correctIndex": 0,
          "explanation": "El texto explica el auge, las ventajas y las criticas de la ciencia ciudadana, concluyendo que es un enfoque valioso y respetado."
        },
        {
          "q": "According to the passage, citizen science offers all of the following benefits EXCEPT:",
          "options": [
            "the ability to process tasks at a large scale",
            "guaranteed error-free data without any safeguards",
            "greater public understanding of how knowledge is created",
            "a sense of shared ownership of research"
          ],
          "correctIndex": 1,
          "explanation": "El texto reconoce que pueden colarse errores y que se necesitan salvaguardas; nunca afirma que los datos esten libres de errores de forma garantizada."
        },
        {
          "q": "In the third paragraph, what does 'such measures' refer to?",
          "options": [
            "the concerns raised by critics",
            "the different levels of volunteer training",
            "the safeguards like independent checking and statistical filtering",
            "the tasks completed by professional teams"
          ],
          "correctIndex": 2,
          "explanation": "'Such measures' remite a las salvaguardas mencionadas justo antes: verificacion por varios participantes y metodos estadisticos para filtrar anomalias."
        },
        {
          "q": "What can be inferred about the author's attitude toward citizen science?",
          "options": [
            "It is broadly positive but acknowledges real limitations.",
            "It is entirely dismissive of its scientific value.",
            "It is uncritically enthusiastic with no reservations.",
            "It is convinced citizen science will soon disappear."
          ],
          "correctIndex": 0,
          "explanation": "El autor destaca beneficios pero tambien expone criticas legitimas y como se abordan, mostrando una postura positiva pero matizada."
        },
        {
          "q": "Which sentence best paraphrases 'this sense of shared ownership may prove just as valuable as the data itself'?",
          "options": [
            "The feeling of collective involvement could be as important as the scientific results.",
            "Owning data is more profitable than sharing it.",
            "Volunteers should be paid for the data they produce.",
            "The data is worthless without expert supervision."
          ],
          "correctIndex": 0,
          "explanation": "La frase significa que el sentido de participacion colectiva puede ser tan importante como los propios datos cientificos."
        }
      ]
    },
    {
      "type": "listening",
      "skill": "listening",
      "text": "Right, before we wrap up the meeting, I just want to flag the budget. I'm not saying we should cancel the marketing campaign, but if sales don't pick up next month, we'll have no choice but to scale it back significantly. Let's revisit this in two weeks.",
      "question": "What is the speaker's main point?",
      "options": [
        "The marketing campaign will definitely be cancelled.",
        "The campaign may have to be reduced if sales do not improve.",
        "Sales have already increased this month."
      ],
      "correctIndex": 1,
      "explanation": "El hablante advierte que, si las ventas no mejoran, tendran que reducir la campana; no afirma que vaya a cancelarse con seguridad."
    },
    {
      "type": "listening",
      "skill": "listening",
      "text": "So, Professor, are you confident this new battery technology will reach the market soon? Well, the laboratory results are certainly promising. But I'd be cautious about making predictions. We've seen plenty of breakthroughs that never made it out of the lab.",
      "question": "What is the professor's attitude toward the new technology?",
      "options": [
        "Completely certain it will succeed commercially.",
        "Cautiously optimistic but reluctant to make firm predictions.",
        "Convinced the technology will fail."
      ],
      "correctIndex": 1,
      "explanation": "La profesora dice que los resultados son prometedores ('promising') pero se muestra cauta ('cautious') sobre hacer predicciones, lo que refleja un optimismo prudente."
    }
  ] },
  "C1": { "pass": 75, "exercises": [
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "Seldom ___ such a thorough refutation of a long-accepted hypothesis.",
      "options": [
        "we have encountered",
        "have we encountered",
        "we encountered",
        "did encountered we"
      ],
      "correctIndex": 1,
      "explanation": "Cuando una oracion empieza con un adverbio negativo como 'Seldom', se aplica la inversion: auxiliar + sujeto ('have we encountered')."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "___ most about her argument is the rigour of its underlying methodology.",
      "options": [
        "What impresses me",
        "That impresses me",
        "Which impresses me",
        "It impresses me"
      ],
      "correctIndex": 0,
      "explanation": "Es una oracion hendida (cleft) con 'What': 'What impresses me most is...'. 'What' introduce la clausula nominal sujeto."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "The committee recommended that the proposal ___ submitted before the deadline, regardless of its current state.",
      "answers": [
        "be"
      ],
      "hint": "Subjuntivo en registro formal tras 'recommend that'.",
      "explanation": "Tras verbos como 'recommend that' se usa el subjuntivo: la forma base 'be' sin conjugar, valida para todos los sujetos."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "Had the authorities acted sooner, the outbreak ___ not have spread so widely across the region.",
      "answers": [
        "would"
      ],
      "hint": "Condicional invertido del tercer tipo: 'Had + sujeto...'.",
      "explanation": "'Had the authorities acted' es la inversion de 'If the authorities had acted'. La oracion principal del condicional irreal usa 'would not have spread'."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "If she had studied medicine as her parents wished, she ___ a doctor by now.",
      "options": [
        "would have been",
        "would be",
        "will be",
        "had been"
      ],
      "correctIndex": 1,
      "explanation": "Es un condicional mixto: condicion pasada ('had studied') con resultado presente ('by now'), por lo que se usa 'would be'."
    },
    {
      "type": "find_error",
      "skill": "grammar",
      "question": "Encuentra el error en esta oracion de registro formal.",
      "segments": [
        "It is imperative that every applicant ",
        {
          "u": "submits"
        },
        " the required documentation ",
        {
          "u": "in order to"
        },
        " be considered for the post."
      ],
      "correctIndex": 0,
      "correction": "submit (submits -> submit)",
      "explanation": "Tras 'It is imperative that' se usa el subjuntivo: la forma base 'submit', no 'submits'."
    },
    {
      "type": "word_order",
      "skill": "grammar",
      "words": [
        "Not",
        "only",
        "did",
        "the",
        "study",
        "lack",
        "rigour",
        "but",
        "it",
        "also",
        "ignored",
        "key",
        "data"
      ],
      "correctOrder": [
        "Not",
        "only",
        "did",
        "the",
        "study",
        "lack",
        "rigour",
        "but",
        "it",
        "also",
        "ignored",
        "key",
        "data"
      ],
      "hint": "Inversion tras 'Not only' al inicio: auxiliar 'did' antes del sujeto."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "The findings ___ in the latest report contradict several earlier assumptions.",
      "options": [
        "presenting",
        "presented",
        "which presenting",
        "were presented"
      ],
      "correctIndex": 1,
      "explanation": "Es una clausula relativa reducida en pasiva: 'the findings (that were) presented'. Se omite 'that were' y queda el participio 'presented'."
    },
    {
      "type": "true_false",
      "skill": "grammar",
      "statement": "The sentence 'Rarely has a single discovery so transformed a discipline' is grammatically correct.",
      "answer": true,
      "explanation": "Es correcta: tras el adverbio negativo 'Rarely' al inicio se aplica la inversion 'has a single discovery'."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "The reviewers asked the author to ___ her central claim with additional empirical evidence.",
      "options": [
        "substantiate",
        "speculate",
        "fabricate",
        "improvise"
      ],
      "correctIndex": 0,
      "explanation": "'Substantiate' significa respaldar o demostrar algo con evidencia, exactamente lo que piden los revisores."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "Auditors were appointed to ___ the firm's accounts after the discrepancies came to light.",
      "options": [
        "glance at",
        "scrutinize",
        "overlook",
        "skim"
      ],
      "correctIndex": 1,
      "explanation": "'Scrutinize' significa examinar minuciosamente, el sentido formal apropiado para auditores que revisan cuentas."
    },
    {
      "type": "fill_blank",
      "skill": "vocab",
      "sentence": "The instructions were so ___ that two readers reached entirely opposite interpretations.",
      "answers": [
        "ambiguous",
        "equivocal"
      ],
      "hint": "Adjetivo que describe algo con mas de un significado posible.",
      "explanation": "'Ambiguous' (o el mas formal 'equivocal') describe algo abierto a multiples interpretaciones, lo que explica las lecturas opuestas."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "Choose the most formal synonym for 'begin' in academic writing: 'The trial will ___ next month.'",
      "options": [
        "kick off",
        "commence",
        "get going",
        "start up"
      ],
      "correctIndex": 1,
      "explanation": "'Commence' es el sinonimo formal de 'begin', el unico apropiado para el registro academico."
    },
    {
      "type": "true_false",
      "skill": "vocab",
      "statement": "In formal English, 'pose a threat' is a correct collocation, as in 'Rising sea levels pose a threat to coastal cities.'",
      "answer": true,
      "explanation": "'Pose a threat' es una colocacion correcta y formal que significa representar una amenaza."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "Complete the collocation: 'Given the polls, his re-election seemed a ___ conclusion.'",
      "options": [
        "foregone",
        "forgotten",
        "forward",
        "former"
      ],
      "correctIndex": 0,
      "explanation": "'A foregone conclusion' es una colocacion fija que significa un resultado que se da por seguro de antemano."
    },
    {
      "type": "find_error",
      "skill": "vocab",
      "question": "Encuentra el error de colocacion.",
      "segments": [
        "Please ",
        {
          "u": "keep in brain"
        },
        " that the criteria ",
        {
          "u": "were"
        },
        " agreed upon in advance."
      ],
      "correctIndex": 0,
      "correction": "bear in mind (keep in brain -> bear in mind)",
      "explanation": "La colocacion correcta es 'bear in mind' (tener en cuenta), no 'keep in brain', que no existe en ingles."
    },
    {
      "type": "multiple_choice",
      "skill": "use",
      "question": "Rewrite formally using nominalization: 'They improved the system, which surprised everyone.' Choose the best version.",
      "options": [
        "The improvement of the system surprised everyone.",
        "They improving the system was a surprise to all.",
        "That they improved was surprising everyone.",
        "The system, improving it, surprised."
      ],
      "correctIndex": 0,
      "explanation": "La nominalizacion convierte el verbo 'improve' en el sustantivo 'improvement', dando un estilo mas formal: 'The improvement of the system...'."
    },
    {
      "type": "translate",
      "skill": "use",
      "prompt": "Traduce a un ingles formal con cleft sentence: \"Lo que necesitamos es mas evidencia.\"",
      "answers": [
        "what we need is more evidence"
      ],
      "explanation": "La oracion hendida 'What we need is more evidence' enfatiza el objeto y corresponde al registro formal pedido."
    },
    {
      "type": "translate",
      "skill": "use",
      "prompt": "Traduce a un ingles formal e impersonal: \"Rara vez hemos visto resultados tan consistentes.\"",
      "answers": [
        "rarely have we seen such consistent results",
        "seldom have we seen such consistent results"
      ],
      "explanation": "Con 'Rarely/Seldom' al inicio se aplica la inversion: 'Rarely have we seen such consistent results'."
    },
    {
      "type": "multiple_choice",
      "skill": "use",
      "question": "Which sentence best shifts the informal statement 'We can't really back this up' into formal academic register?",
      "options": [
        "This claim cannot be adequately substantiated.",
        "We totally can't prove this one.",
        "There's no way to back this up at all.",
        "This is something we can't really show."
      ],
      "correctIndex": 0,
      "explanation": "'This claim cannot be adequately substantiated' usa vocabulario formal y voz pasiva impersonal, propios del registro academico."
    },
    {
      "type": "fill_blank",
      "skill": "use",
      "sentence": "From the verb 'analyse', supply the noun: 'A careful ___ of the data revealed a clear trend.'",
      "answers": [
        "analysis"
      ],
      "hint": "Nominalizacion del verbo 'analyse'.",
      "explanation": "El sustantivo derivado de 'analyse' es 'analysis', necesario para la nominalizacion en registro formal."
    },
    {
      "type": "find_error",
      "skill": "use",
      "question": "Encuentra el desliz de registro: una palabra rompe el tono formal.",
      "segments": [
        "The methodology was robust, the sample representative, and the conclusions ",
        {
          "u": "pretty solid"
        },
        ", which ",
        {
          "u": "lends"
        },
        " credibility to the study."
      ],
      "correctIndex": 0,
      "correction": "well-founded / sound (pretty solid -> well-founded)",
      "explanation": "'Pretty solid' es coloquial y rompe el registro formal; una opcion adecuada seria 'well-founded' o 'sound'. 'Lends credibility' si es formal y correcto."
    },
    {
      "type": "word_order",
      "skill": "use",
      "words": [
        "The",
        "data",
        "from",
        "which",
        "these",
        "conclusions",
        "were",
        "derived",
        "remain",
        "unpublished"
      ],
      "correctOrder": [
        "The",
        "data",
        "from",
        "which",
        "these",
        "conclusions",
        "were",
        "derived",
        "remain",
        "unpublished"
      ],
      "hint": "Clausula relativa formal con preposicion adelantada: 'from which'."
    },
    {
      "type": "reading",
      "skill": "reading",
      "title": "The Replication Crisis in Science",
      "passage": "Over the past decade, a growing unease has permeated the empirical sciences, particularly psychology and biomedicine. The source of this disquiet is what has come to be known as the replication crisis: the unsettling discovery that a substantial proportion of published findings cannot be reproduced when independent researchers repeat the original experiments. What was once assumed to be the self-correcting machinery of science has, on closer inspection, proven alarmingly fragile.\n\nSeveral factors have been implicated. Foremost among them is the perverse incentive structure of academic publishing, which rewards novel, statistically significant results while showing scant interest in replications or null findings. Researchers, mindful of their careers, are thus nudged toward practices that inflate the apparent significance of their data, whether through selective reporting or the subtle manipulation of analytical choices. Such practices, though rarely fraudulent in intent, collectively erode the reliability of the published record.\n\nCritics of the alarmist framing, however, caution against overstating the crisis. They argue that failures to replicate are not, in themselves, evidence of error; rather, they may reflect legitimate variation in populations, contexts, or measurement. From this vantage point, replication failures are less a symptom of decay than a healthy, if uncomfortable, manifestation of science scrutinizing itself. To conflate irreproducibility with falsehood, they contend, is to misunderstand the probabilistic nature of empirical inquiry.\n\nWhat is beyond dispute is that the controversy has catalysed reform. Pre-registration of studies, in which hypotheses and analytical plans are lodged before data collection begins, has gained considerable traction, as has the sharing of raw data and the publication of negative results. Whether these measures will prove sufficient remains to be seen, but the very fact that the discipline is interrogating its own foundations suggests a resilience that the more pessimistic commentators may have underestimated.",
      "questions": [
        {
          "q": "What is the primary purpose of the passage?",
          "options": [
            "To present the replication crisis and the competing interpretations it has provoked",
            "To prove that most published psychology research is fraudulent",
            "To advocate exclusively for the immediate abolition of academic journals",
            "To provide step-by-step instructions for pre-registering a study"
          ],
          "correctIndex": 0,
          "explanation": "El texto expone la crisis de replicacion y las distintas interpretaciones (alarmistas y criticas), sin defender una sola postura ni dar instrucciones."
        },
        {
          "q": "According to the passage, the academic publishing system contributes to the crisis mainly because it",
          "options": [
            "favours novel significant results over replications and null findings",
            "refuses to publish any new research at all",
            "requires all data to be shared before publication",
            "pays researchers directly for each experiment"
          ],
          "correctIndex": 0,
          "explanation": "El segundo parrafo dice que el sistema premia resultados novedosos y significativos mostrando poco interes en replicaciones o resultados nulos."
        },
        {
          "q": "What attitude do the 'critics of the alarmist framing' adopt toward replication failures?",
          "options": [
            "They view them as potentially legitimate variation rather than proof of error",
            "They regard them as conclusive evidence of widespread fraud",
            "They believe they should be completely ignored",
            "They think they prove that science cannot self-correct"
          ],
          "correctIndex": 0,
          "explanation": "El tercer parrafo explica que estos criticos ven los fallos de replicacion como variacion legitima, no como prueba de error."
        },
        {
          "q": "In the final paragraph, the phrase 'gained considerable traction' most nearly means that pre-registration has",
          "options": [
            "become increasingly adopted",
            "been firmly rejected by researchers",
            "lost all of its earlier support",
            "remained entirely theoretical"
          ],
          "correctIndex": 0,
          "explanation": "'Gain traction' significa ganar aceptacion o impulso; aqui indica que el preregistro se ha adoptado cada vez mas."
        },
        {
          "q": "The closing sentence implies that the author's overall stance is",
          "options": [
            "cautiously optimistic about science's capacity for self-correction",
            "convinced that the sciences are beyond repair",
            "indifferent to the outcome of the reforms",
            "certain that the reforms have already failed"
          ],
          "correctIndex": 0,
          "explanation": "La ultima frase sugiere una 'resiliencia' subestimada por los pesimistas, lo que revela un tono de optimismo cauteloso del autor."
        }
      ]
    },
    {
      "type": "listening",
      "skill": "listening",
      "text": "In today's seminar I want to challenge a common assumption: that economic growth and environmental sustainability are necessarily at odds. The evidence is, at best, mixed. While some decoupling of emissions from output has occurred in advanced economies, the data suggest it is far too slow to meet our climate targets. So I would urge you to treat claims of effortless 'green growth' with a healthy measure of skepticism.",
      "question": "What is the speaker's main point?",
      "options": [
        "Economic growth and sustainability are completely incompatible.",
        "Claims that growth can easily be made green deserve scepticism, as decoupling is too slow.",
        "Advanced economies have already solved the problem of emissions."
      ],
      "correctIndex": 1,
      "explanation": "El ponente sostiene que, aunque existe cierto desacoplamiento, es demasiado lento, por lo que pide escepticismo ante el 'crecimiento verde' sin esfuerzo."
    },
    {
      "type": "listening",
      "skill": "listening",
      "text": "Now, the second study we'll examine had a much larger sample, and on the surface its conclusions look compelling. But I have reservations. Notice that the authors never specify how participants were recruited, and that omission, frankly, undermines my confidence in the generalisability of their findings. A larger sample does not, in itself, guarantee a representative one.",
      "question": "What is the speaker's attitude toward the second study?",
      "options": [
        "Fully convinced by its conclusions because of the large sample.",
        "Sceptical, because the recruitment method is unspecified despite the large sample.",
        "Completely dismissive, considering the study fraudulent."
      ],
      "correctIndex": 1,
      "explanation": "El ponente expresa reservas: la falta de informacion sobre el reclutamiento mina su confianza, aunque la muestra sea grande. No lo descarta por fraude."
    }
  ] },
  "C2": { "pass": 78, "exercises": [
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "___ a more persuasive case for institutional reform been articulated in recent memory.",
      "options": [
        "Never has",
        "Never have",
        "Not never has",
        "Hardly never has"
      ],
      "correctIndex": 0,
      "explanation": "Con inversion enfatica y sujeto singular ('a more persuasive case'), el auxiliar concuerda en singular: 'Never has... been articulated'. La negacion adelantada exige inversion sujeto-auxiliar."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "So ___ was the testimony that the jury reached its verdict within the hour.",
      "options": [
        "compelling",
        "compellingly",
        "the compelling",
        "compelled"
      ],
      "correctIndex": 0,
      "explanation": "La estructura enfatica 'So + adjetivo + was/were + sujeto + that...' requiere el adjetivo 'compelling' tras 'So', con inversion del verbo copulativo."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "The committee moved that the contested clause ___ struck from the final draft.",
      "options": [
        "is",
        "be",
        "was",
        "would be"
      ],
      "correctIndex": 1,
      "explanation": "Tras verbos de propuesta o mocion ('move that') se usa el subjuntivo en ingles: la forma base 'be', sin concordancia ni tiempo: 'that the clause be struck'."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "Neither the data nor the underlying methodology ___ able to withstand peer scrutiny.",
      "options": [
        "were",
        "have been",
        "was",
        "are"
      ],
      "correctIndex": 2,
      "explanation": "Con 'neither... nor...' el verbo concuerda con el elemento mas proximo. Aqui 'the underlying methodology' es singular, por lo que corresponde 'was'."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "Rarely ___ a scholar so willing to repudiate the very paradigm that established her reputation.",
      "answers": [
        "have we encountered",
        "do we encounter",
        "have we seen",
        "did we encounter"
      ],
      "hint": "Adverbio negativo al inicio: exige inversion sujeto-auxiliar.",
      "explanation": "Tras 'Rarely' en posicion inicial la oracion invierte auxiliar y sujeto, p. ej. 'have we encountered / do we encounter'. No se admite el orden normal 'we have encountered'."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "It is imperative that every delegate ___ present when the resolution is tabled.",
      "answers": [
        "be"
      ],
      "hint": "Subjuntivo tras 'It is imperative that...'.",
      "explanation": "Las construcciones con adjetivos de necesidad ('imperative', 'essential') seguidas de 'that' rigen subjuntivo: forma base 'be', sin '-s' aunque el sujeto sea singular ('every delegate be')."
    },
    {
      "type": "find_error",
      "skill": "grammar",
      "question": "Encuentra el error en el uso de la inversion enfatica.",
      "segments": [
        "Not only ",
        {
          "u": "the minister denied"
        },
        " the allegations, ",
        {
          "u": "but he also"
        },
        " threatened ",
        {
          "u": "to sue"
        },
        " the journalists."
      ],
      "correctIndex": 0,
      "correction": "did the minister deny (Not only did the minister deny...)",
      "explanation": "Tras 'Not only' en posicion inicial debe haber inversion con auxiliar: 'Not only did the minister deny...'. Mantener el orden normal 'the minister denied' es incorrecto."
    },
    {
      "type": "find_error",
      "skill": "grammar",
      "question": "Encuentra el error de concordancia con sujeto complejo.",
      "segments": [
        "The proliferation ",
        {
          "u": "of conflicting reports"
        },
        " ",
        {
          "u": "have"
        },
        " done little to ",
        {
          "u": "dispel"
        },
        " public confusion."
      ],
      "correctIndex": 1,
      "correction": "has (The proliferation ... has done)",
      "explanation": "El nucleo del sujeto es 'The proliferation' (singular); 'of conflicting reports' es un complemento que no altera la concordancia. El verbo debe ser 'has done', no 'have done'."
    },
    {
      "type": "word_order",
      "skill": "grammar",
      "words": [
        "So",
        "entrenched",
        "were",
        "the",
        "prejudices",
        "that",
        "reform",
        "proved",
        "impossible"
      ],
      "correctOrder": [
        "So",
        "entrenched",
        "were",
        "the",
        "prejudices",
        "that",
        "reform",
        "proved",
        "impossible"
      ],
      "hint": "Estructura enfatica: So + adjetivo + verbo invertido + sujeto + that...",
      "explanation": "La inversion enfatica con 'So + adjetivo' antepone el adjetivo y mueve el verbo copulativo delante del sujeto: 'So entrenched were the prejudices that...'."
    },
    {
      "type": "true_false",
      "skill": "grammar",
      "statement": "In 'Under no circumstances should the files be released', the inversion of subject and auxiliary is grammatically required.",
      "answer": true,
      "explanation": "Verdadero. Cuando una expresion negativa o restrictiva ('Under no circumstances') ocupa la posicion inicial, la inversion sujeto-auxiliar es obligatoria: 'should the files be released'."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "The new subsidy was intended to ameliorate rural poverty, but it inadvertently ___ existing inequalities.",
      "options": [
        "corroborated",
        "exacerbated",
        "discerned",
        "inhibited"
      ],
      "correctIndex": 1,
      "explanation": "'Ameliorate' (mejorar) contrasta con 'exacerbate' (agravar), que es lo que ocurrio de forma involuntaria. 'Corroborate' = confirmar, 'discern' = percibir, 'inhibit' = frenar, no encajan."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "Independent laboratory results were needed to ___ the researcher's controversial findings.",
      "options": [
        "precipitate",
        "posit",
        "corroborate",
        "inhibit"
      ],
      "correctIndex": 2,
      "explanation": "'Corroborate' significa respaldar o confirmar con evidencia, exactamente lo que aportarian resultados independientes. 'Precipitate' = desencadenar, 'posit' = postular, 'inhibit' = inhibir."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "Her argument rested on a false ___ between liberty and security, as though one necessarily excluded the other.",
      "options": [
        "catalyst",
        "nexus",
        "dichotomy",
        "paradigm"
      ],
      "correctIndex": 2,
      "explanation": "Una 'dichotomy' es una division en dos categorias presentadas como opuestas y excluyentes, justo lo que describe el enunciado. 'Catalyst', 'nexus' y 'paradigm' no expresan esa oposicion binaria."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "The evidence remains largely ___; we should therefore treat any firm conclusion with caution.",
      "options": [
        "ubiquitous",
        "speculative",
        "intractable",
        "plausible"
      ],
      "correctIndex": 1,
      "explanation": "'Speculative' (especulativo, basado en conjeturas) justifica la cautela ante conclusiones firmes. 'Ubiquitous' = omnipresente, 'intractable' = irresoluble, 'plausible' = verosimil, no encajan con la peticion de prudencia."
    },
    {
      "type": "true_false",
      "skill": "vocab",
      "statement": "To say that a problem is 'intractable' implies that it can be resolved quickly and with little effort.",
      "answer": false,
      "explanation": "Falso. 'Intractable' describe un problema dificil de manejar o resolver, persistente y resistente a soluciones; es lo contrario de algo facil y rapido de solucionar."
    },
    {
      "type": "fill_blank",
      "skill": "vocab",
      "sentence": "The assassination served as the ___ that precipitated a war already long in the making.",
      "answers": [
        "catalyst"
      ],
      "hint": "Abstracto: el agente que desencadena o acelera un proceso.",
      "explanation": "Un 'catalyst' es el elemento que desencadena o acelera un proceso, encajando con 'precipitated a war'. El uso metaforico procede de la quimica."
    },
    {
      "type": "translate",
      "skill": "vocab",
      "prompt": "Traduce al ingles con registro academico: \"Sus conclusiones son, en el mejor de los casos, tentativas.\"",
      "answers": [
        "her conclusions are tentative at best",
        "his conclusions are tentative at best",
        "their conclusions are tentative at best",
        "her findings are tentative at best",
        "his findings are tentative at best",
        "their findings are tentative at best"
      ],
      "explanation": "El marcador de matiz 'tentative' (provisional, no concluyente) y la locucion 'at best' (en el mejor de los casos) reproducen el registro academico del original."
    },
    {
      "type": "multiple_choice",
      "skill": "use",
      "question": "Which sentence uses the cohesion device most precisely? 'The funding was approved; ___, implementation was repeatedly delayed by bureaucratic inertia.'",
      "options": [
        "nevertheless",
        "therefore",
        "moreover",
        "likewise"
      ],
      "correctIndex": 0,
      "explanation": "Se necesita un conector de contraste: pese a aprobarse la financiacion, hubo retrasos. 'Nevertheless' (no obstante) lo expresa. 'Therefore' (por tanto), 'moreover' (ademas) y 'likewise' (igualmente) no marcan contraste."
    },
    {
      "type": "multiple_choice",
      "skill": "use",
      "question": "Select the most register-appropriate rewrite for an academic abstract: 'We didn't find any link between the two things.'",
      "options": [
        "We found no discernible correlation between the two variables.",
        "We couldn't really find a connection between the stuff.",
        "No way was there a link between them.",
        "There wasn't anything linking the two things up."
      ],
      "correctIndex": 0,
      "explanation": "El registro academico exige precision lexica y formalidad: 'no discernible correlation between the two variables'. Las demas opciones son coloquiales o imprecisas ('stuff', 'No way', 'linking up')."
    },
    {
      "type": "multiple_choice",
      "skill": "use",
      "question": "Choose the version where the passive voice is used deliberately to foreground the outcome rather than the agent.",
      "options": [
        "A series of safeguards was dismantled long before the crisis erupted.",
        "Someone dismantled a series of safeguards long before the crisis erupted.",
        "They dismantled a series of safeguards before the crisis.",
        "The crisis erupted after people dismantled safeguards."
      ],
      "correctIndex": 0,
      "explanation": "La pasiva 'was dismantled' pone el foco en el resultado (los mecanismos de seguridad) y relega al agente, efecto estilistico buscado. Las activas destacan al agente ('someone', 'they', 'people')."
    },
    {
      "type": "fill_blank",
      "skill": "use",
      "sentence": "The two regions pursued opposite strategies: the north invested heavily in industry; ___, the south staked everything on tourism.",
      "answers": [
        "by contrast",
        "conversely"
      ],
      "hint": "Conector que introduce una contraposicion directa entre dos casos paralelos.",
      "explanation": "Para contraponer dos casos paralelos se usa 'by contrast' o 'conversely' (por el contrario / a la inversa). Ambos marcan oposicion directa entre las dos regiones."
    },
    {
      "type": "fill_blank",
      "skill": "use",
      "sentence": "___ the objections raised by several board members, the merger proceeded as planned.",
      "answers": [
        "notwithstanding",
        "despite",
        "in spite of"
      ],
      "hint": "Preposicion formal equivalente a 'despite' / 'a pesar de'.",
      "explanation": "'Notwithstanding' es una preposicion de registro formal que significa 'a pesar de', equivalente a 'despite' o 'in spite of'. Las tres encajan con la idea concesiva del enunciado ('a pesar de las objeciones, la fusion siguio adelante')."
    },
    {
      "type": "translate",
      "skill": "use",
      "prompt": "Traduce con registro formal: \"A pesar de las pruebas, el consejo se nego a reconsiderar su postura.\"",
      "answers": [
        "notwithstanding the evidence, the board refused to reconsider its position",
        "despite the evidence, the board refused to reconsider its position",
        "in spite of the evidence, the board refused to reconsider its position",
        "notwithstanding the evidence, the council refused to reconsider its position",
        "despite the evidence, the council refused to reconsider its position",
        "in spite of the evidence, the council refused to reconsider its position"
      ],
      "explanation": "El registro formal admite 'Notwithstanding / Despite / In spite of the evidence' seguido de 'the board/council refused to reconsider its position'."
    },
    {
      "type": "find_error",
      "skill": "use",
      "question": "Encuentra el error de coherencia logica en el uso del conector.",
      "segments": [
        "The treatment showed no measurable benefit; ",
        {
          "u": "consequently"
        },
        ", the researchers ",
        {
          "u": "remained convinced"
        },
        " of ",
        {
          "u": "its efficacy"
        },
        "."
      ],
      "correctIndex": 0,
      "correction": "nevertheless (... benefit; nevertheless, the researchers remained convinced ...)",
      "explanation": "'Consequently' (en consecuencia) implica causa-efecto coherente, pero aqui el resultado contradice la conviccion: corresponderia un conector de contraste como 'nevertheless'. El conector causal es el error."
    },
    {
      "type": "reading",
      "skill": "reading",
      "title": "The Cult of Measurement",
      "passage": "It has become an article of faith in contemporary governance that whatever can be measured ought to be measured, and that whatever resists measurement is, by implication, of dubious worth. The premise is seductive precisely because it appears so reasonable. Numbers promise objectivity; they seem to strip decision-making of caprice and bias. Who, after all, would argue against evidence?\n\nYet the very persuasiveness of the metric is what should give us pause. The quantifiable is not necessarily the important; it is merely the convenient. When a hospital is judged by the speed with which it discharges patients, clinicians learn, soon enough, to discharge them swiftly, regardless of whether doing so serves their recovery. The metric, having been designed to measure quality, ends up displacing it. This is no isolated malfunction but a recurring pattern, observed across schools, police forces and universities alike: the indicator becomes the objective, and the objective quietly evaporates.\n\nDefenders of measurement will concede such excesses while insisting that the remedy lies in better metrics rather than fewer of them. There is something to this. A crudely designed target invites manipulation in a way that a subtle one may not. But the concession, however reasonable, leaves the deeper assumption untouched. It presumes that the failure is technical, a matter of calibration, when in truth it may be philosophical. For there are goods, civic trust, intellectual curiosity, the texture of a humane institution, that are not under-measured but unmeasurable, and that wither under the very attempt to render them as data.\n\nNone of this amounts to a brief against counting. To reject measurement wholesale would be its own species of dogmatism, no less rigid than the orthodoxy it opposes. The point is subtler and, for that reason, harder to act upon: that measurement is a tool whose authority we have allowed to exceed its competence. The wise administrator counts what can usefully be counted and retains the judgment to recognise when the counting has begun to lie.",
      "questions": [
        {
          "q": "Which statement best captures the author's central thesis?",
          "options": [
            "Measurement should be abandoned because it always distorts the goals it tracks.",
            "Measurement is a useful tool whose authority has been over-extended beyond what it can legitimately assess.",
            "Better-designed metrics would eliminate the problems associated with measurement.",
            "Objective numbers are the only defensible basis for sound governance."
          ],
          "correctIndex": 1,
          "explanation": "La tesis central es matizada: la medicion es util pero se le ha concedido una autoridad que excede su competencia (ultimo parrafo). No aboga por abolirla (rechaza esa postura como 'dogmatism') ni por mas metricas."
        },
        {
          "q": "In the third paragraph, how does the author treat the view that the solution is 'better metrics rather than fewer of them'?",
          "options": [
            "He fully endorses it as the correct remedy.",
            "He dismisses it as obviously absurd.",
            "He acknowledges it as partly valid but argues it leaves a deeper problem unaddressed.",
            "He ignores it in favour of his own proposal."
          ],
          "correctIndex": 2,
          "explanation": "Es una concesion ('There is something to this') seguida de refutacion: el autor reconoce parte de razon pero sostiene que el fallo no es tecnico sino filosofico, dejando intacta la suposicion mas profunda."
        },
        {
          "q": "What does the author imply with the rhetorical question 'Who, after all, would argue against evidence?'",
          "options": [
            "That opposing evidence is genuinely indefensible.",
            "That the appeal of measurement is rhetorically disarming, which is precisely why it warrants suspicion.",
            "That readers should accept metrics without further question.",
            "That evidence and measurement are entirely unrelated concepts."
          ],
          "correctIndex": 1,
          "explanation": "La pregunta retorica es ironica: el autor la usa para exponer que el atractivo de la medicion es desarmante, y enseguida advierte que 'esa misma persuasion deberia hacernos detenernos'. No es una aceptacion literal."
        },
        {
          "q": "The hospital example is used primarily to illustrate which idea?",
          "options": [
            "That hospitals are inefficient institutions.",
            "That discharging patients quickly is always harmful.",
            "That a metric designed to capture quality can come to displace the quality it was meant to measure.",
            "That clinicians routinely act in bad faith."
          ],
          "correctIndex": 2,
          "explanation": "El ejemplo ilustra que el indicador suplanta al objetivo: la metrica disenada para medir calidad acaba desplazandola ('the indicator becomes the objective, and the objective quietly evaporates'). No generaliza sobre la mala fe ni sobre la ineficiencia."
        },
        {
          "q": "What is the author's overall purpose in the essay?",
          "options": [
            "To persuade readers to reject all forms of quantification in public life.",
            "To provide a neutral, purely descriptive survey of measurement practices.",
            "To advocate a discerning middle position that values judgement alongside, and as a check on, measurement.",
            "To promote the adoption of more sophisticated statistical techniques."
          ],
          "correctIndex": 2,
          "explanation": "El proposito es defender una postura intermedia y reflexiva: contar lo que conviene contar pero conservar el juicio para detectar cuando 'el conteo ha empezado a mentir'. No es ni rechazo total ni mera descripcion neutral."
        }
      ]
    },
    {
      "type": "listening",
      "skill": "listening",
      "text": "I won't deny that markets allocate resources with remarkable efficiency. My quarrel is with the unspoken leap from that observation to the claim that whatever a market produces is therefore just. Efficiency and justice are simply different questions, and conflating them is precisely how we end up defending outcomes that no one would choose on reflection.",
      "question": "What unstated assumption is the speaker primarily challenging?",
      "options": [
        "That markets are inefficient at allocating resources.",
        "That market efficiency does not, by itself, establish that market outcomes are just.",
        "That justice is a more important goal than efficiency in all cases."
      ],
      "correctIndex": 1,
      "explanation": "El hablante concede la eficiencia del mercado y ataca el salto implicito de 'eficiente' a 'justo'. Cuestiona la suposicion de que la eficiencia baste para legitimar moralmente los resultados, no niega la eficiencia ni jerarquiza los dos valores en general."
    },
    {
      "type": "listening",
      "skill": "listening",
      "text": "Proponents of the carbon tax frame it as a neutral, technocratic fix, as if pricing emissions were merely an accounting adjustment. But every choice of price embeds a judgement about whose welfare counts and over what horizon. To present such a tax as apolitical is not to transcend politics; it is to smuggle one's politics in unexamined.",
      "question": "What is the speaker's main point about the carbon tax?",
      "options": [
        "That a carbon tax is too costly to implement effectively.",
        "That presenting the tax as a neutral technical measure conceals the value judgements it necessarily contains.",
        "That carbon taxes are the most apolitical solution available to policymakers."
      ],
      "correctIndex": 1,
      "explanation": "El hablante sostiene que presentar el impuesto como neutral y tecnocratico oculta juicios de valor inevitables ('whose welfare counts and over what horizon'). Califica esa neutralidad aparente de 'contrabando' de politica, no discute el coste ni acepta que sea apolitico."
    }
  ] }
};

/* Enriquecimiento de los boss exams: añade preguntas frescas por nivel al banco
   existente (se cargan antes en vesper_boss_exams.js). */
(function () {
  var B = window.VESPER_BOSS_EXAMS;
  if (!B) return;
  var EXTRA = {
    "A1": [
      {
        "type": "multiple_choice",
        "skill": "grammar",
        "question": "Those ___ are very tall.",
        "options": [
          "man",
          "mans",
          "men"
        ],
        "correctIndex": 2,
        "explanation": "El plural irregular de 'man' es 'men'."
      },
      {
        "type": "fill_blank",
        "skill": "grammar",
        "sentence": "My grandmother ___ tea every morning.",
        "answers": [
          "drinks"
        ],
        "hint": "Tercera persona del singular (she).",
        "explanation": "Con 'my grandmother' (=she) el verbo lleva -s: 'drinks'."
      },
      {
        "type": "true_false",
        "skill": "vocab",
        "statement": "A giraffe is an animal.",
        "answer": true,
        "explanation": "La jirafa ('giraffe') es un animal."
      },
      {
        "type": "word_order",
        "skill": "grammar",
        "words": [
          "Can",
          "your",
          "sister",
          "swim",
          "?"
        ],
        "correctOrder": [
          "Can",
          "your",
          "sister",
          "swim",
          "?"
        ],
        "hint": "Pregunta con 'can'."
      },
      {
        "type": "translate",
        "skill": "use",
        "prompt": "Traduce: \"Hace frío hoy.\"",
        "answers": [
          "it is cold today",
          "it's cold today"
        ],
        "explanation": "It is cold today. Para el clima usamos 'it is'."
      },
      {
        "type": "find_error",
        "skill": "grammar",
        "question": "Encuentra el error.",
        "segments": [
          "There ",
          {
            "u": "is"
          },
          " four ",
          {
            "u": "chairs"
          },
          " in the kitchen."
        ],
        "correctIndex": 0,
        "correction": "are (four chairs -> there are)",
        "explanation": "Con un sustantivo plural ('four chairs') se usa 'there are'."
      },
      {
        "type": "multiple_choice",
        "skill": "use",
        "question": "The cat is sleeping ___ the bed.",
        "options": [
          "under",
          "between",
          "on"
        ],
        "correctIndex": 0,
        "explanation": "'under' significa 'debajo de', la posición lógica para un gato durmiendo bajo la cama."
      },
      {
        "type": "fill_blank",
        "skill": "vocab",
        "sentence": "We wear gloves on our ___ when it is cold.",
        "answers": [
          "hands"
        ],
        "hint": "Parte del cuerpo, en plural.",
        "explanation": "Los guantes ('gloves') se llevan en las manos ('hands')."
      },
      {
        "type": "true_false",
        "skill": "grammar",
        "statement": "The sentence 'He don't like fish.' is correct.",
        "answer": false,
        "explanation": "Con 'he' la negación correcta es 'doesn't': 'He doesn't like fish.'"
      },
      {
        "type": "word_order",
        "skill": "grammar",
        "words": [
          "The",
          "leaves",
          "are",
          "orange",
          "in",
          "autumn"
        ],
        "correctOrder": [
          "The",
          "leaves",
          "are",
          "orange",
          "in",
          "autumn"
        ],
        "hint": "Verbo 'to be' con sujeto plural y color."
      }
    ],
    "A2": [
      {
        "type": "multiple_choice",
        "skill": "grammar",
        "question": "Last summer we ___ to Greece for two weeks.",
        "options": [
          "go",
          "went",
          "goed",
          "gone"
        ],
        "correctIndex": 1,
        "explanation": "El pasado simple irregular de 'go' es 'went'."
      },
      {
        "type": "fill_blank",
        "skill": "grammar",
        "sentence": "Mount Everest is the ___ mountain in the world.",
        "answers": [
          "highest",
          "tallest"
        ],
        "hint": "Superlativo de un adjetivo corto.",
        "explanation": "Con adjetivos cortos el superlativo termina en -est: 'the highest/tallest'. Para montañas lo natural es 'the highest'."
      },
      {
        "type": "true_false",
        "skill": "vocab",
        "statement": "If you have a fever and a sore throat, you should see a doctor.",
        "answer": true,
        "explanation": "Tener fiebre ('fever') y dolor de garganta ('sore throat') son sintomas de enfermedad, asi que es razonable ver al medico."
      },
      {
        "type": "word_order",
        "skill": "grammar",
        "words": [
          "How",
          "much",
          "milk",
          "do",
          "we",
          "need"
        ],
        "correctOrder": [
          "How",
          "much",
          "milk",
          "do",
          "we",
          "need"
        ],
        "hint": "Con sustantivo incontable usamos 'how much'."
      },
      {
        "type": "translate",
        "skill": "use",
        "prompt": "Traduce: \"Compré una chaqueta nueva ayer.\"",
        "answers": [
          "i bought a new jacket yesterday",
          "yesterday i bought a new jacket"
        ],
        "explanation": "I bought a new jacket yesterday. ('buy' -> 'bought' en pasado simple)."
      },
      {
        "type": "find_error",
        "skill": "grammar",
        "question": "Encuentra el error.",
        "segments": [
          "We ",
          {
            "u": "didn't"
          },
          " ",
          {
            "u": "went"
          },
          " to the beach because it rained."
        ],
        "correctIndex": 1,
        "correction": "go (didn't + base verb)",
        "explanation": "Despues de 'didn't' usamos el verbo en forma base: 'didn't go', no 'didn't went'."
      },
      {
        "type": "multiple_choice",
        "skill": "grammar",
        "question": "My birthday is ___ December.",
        "options": [
          "at",
          "on",
          "in",
          "to"
        ],
        "correctIndex": 2,
        "explanation": "Con meses usamos la preposicion 'in': 'in December'."
      },
      {
        "type": "fill_blank",
        "skill": "grammar",
        "sentence": "I have never ___ snow in my city.",
        "answers": [
          "seen"
        ],
        "hint": "Present perfect: have + participio de 'see'.",
        "explanation": "El participio de 'see' es 'seen': 'I have never seen'."
      },
      {
        "type": "true_false",
        "skill": "vocab",
        "statement": "You usually wear gloves and a scarf when the weather is hot and sunny.",
        "answer": false,
        "explanation": "Los guantes ('gloves') y la bufanda ('scarf') son para el frio, no para el calor."
      },
      {
        "type": "multiple_choice",
        "skill": "grammar",
        "question": "There aren't ___ apples in the basket.",
        "options": [
          "much",
          "many",
          "a lot",
          "some"
        ],
        "correctIndex": 1,
        "explanation": "'apples' es contable plural, asi que en negativo usamos 'many': 'aren't many'."
      },
      {
        "type": "word_order",
        "skill": "grammar",
        "words": [
          "She",
          "always",
          "drinks",
          "coffee",
          "in",
          "the",
          "morning"
        ],
        "correctOrder": [
          "She",
          "always",
          "drinks",
          "coffee",
          "in",
          "the",
          "morning"
        ],
        "hint": "El adverbio de frecuencia va antes del verbo principal."
      }
    ],
    "B1": [
      {
        "type": "multiple_choice",
        "skill": "grammar",
        "question": "The new recycling plant ___ since the council approved the budget last spring.",
        "options": [
          "is built",
          "has been built",
          "was building",
          "builds"
        ],
        "correctIndex": 1,
        "explanation": "Pasiva en present perfect ('has been built') porque 'since' marca una conexión con el presente y un resultado actual."
      },
      {
        "type": "multiple_choice",
        "skill": "grammar",
        "question": "If our streaming service ___ its prices again, a lot of subscribers will cancel.",
        "options": [
          "will raise",
          "raises",
          "would raise",
          "raised"
        ],
        "correctIndex": 1,
        "explanation": "Primer condicional: 'if' + presente simple ('raises'), y la consecuencia con 'will'."
      },
      {
        "type": "fill_blank",
        "skill": "grammar",
        "sentence": "The engineer ___ designed this app studied robotics at university.",
        "answers": [
          "who",
          "that"
        ],
        "hint": "Pronombre relativo para una persona.",
        "explanation": "Para personas usamos 'who' (o 'that'): 'The engineer who/that designed...'."
      },
      {
        "type": "fill_blank",
        "skill": "grammar",
        "sentence": "I have worked for this marketing agency ___ 2019, so I know the clients well.",
        "answers": [
          "since"
        ],
        "hint": "Un punto de inicio en el tiempo (un año).",
        "explanation": "Con un momento concreto de inicio usamos 'since' (since 2019)."
      },
      {
        "type": "true_false",
        "skill": "vocab",
        "statement": "If you 'set up' a company, you start or establish it.",
        "answer": true,
        "explanation": "'Set up' significa crear/establecer algo, como una empresa."
      },
      {
        "type": "true_false",
        "skill": "vocab",
        "statement": "To 'look after' a pet means to ignore it completely.",
        "answer": false,
        "explanation": "'Look after' significa cuidar de algo o alguien, no ignorarlo."
      },
      {
        "type": "word_order",
        "skill": "grammar",
        "words": [
          "The",
          "report",
          "was",
          "written",
          "by",
          "two",
          "researchers"
        ],
        "correctOrder": [
          "The",
          "report",
          "was",
          "written",
          "by",
          "two",
          "researchers"
        ],
        "hint": "Voz pasiva en pasado: sujeto + was + participio + by + agente."
      },
      {
        "type": "translate",
        "skill": "use",
        "prompt": "Traduce: \"Si tuviera más tiempo, aprendería a programar.\"",
        "answers": [
          "if i had more time i would learn to code",
          "if i had more time, i would learn to code",
          "if i had more time i would learn how to code",
          "if i had more time, i would learn how to code",
          "if i had more time i would learn to program",
          "if i had more time, i would learn to program"
        ],
        "explanation": "Segundo condicional: 'if' + pasado simple ('had'), consecuencia con 'would'."
      },
      {
        "type": "find_error",
        "skill": "grammar",
        "question": "Encuentra el error.",
        "segments": [
          "You ",
          {
            "u": "should to turn off"
          },
          " your laptop before ",
          {
            "u": "leaving"
          },
          " the office."
        ],
        "correctIndex": 0,
        "correction": "should turn off (sin 'to')",
        "explanation": "Después de un modal como 'should' usamos el infinitivo sin 'to': 'should turn off'."
      },
      {
        "type": "multiple_choice",
        "skill": "grammar",
        "question": "Lucy isn't answering her phone, so she ___ be in the meeting right now.",
        "options": [
          "can't",
          "must",
          "should",
          "would"
        ],
        "correctIndex": 1,
        "explanation": "Deducción lógica con bastante certeza: 'must' (debe de estar en la reunión)."
      },
      {
        "type": "find_error",
        "skill": "grammar",
        "question": "Encuentra el error.",
        "segments": [
          "My colleagues ",
          {
            "u": "avoid"
          },
          " ",
          {
            "u": "to use"
          },
          " plastic cups at the office."
        ],
        "correctIndex": 1,
        "correction": "using (avoid + -ing)",
        "explanation": "Después de 'avoid' se usa gerundio: 'avoid using'."
      }
    ],
    "B2": [
      {
        "type": "multiple_choice",
        "skill": "grammar",
        "question": "By the time the auditors arrived, the firm ___ all the incriminating files.",
        "options": [
          "had already shredded",
          "has already shredded",
          "already shredded",
          "was already shredding"
        ],
        "correctIndex": 0,
        "explanation": "El past perfect (had + participio) describe una accion terminada antes de otro momento pasado ('arrived')."
      },
      {
        "type": "multiple_choice",
        "skill": "grammar",
        "question": "___ had the conductor raised his baton than a phone began to ring in the audience.",
        "options": [
          "No sooner",
          "Hardly when",
          "As soon",
          "Scarcely than"
        ],
        "correctIndex": 0,
        "explanation": "La inversion 'No sooner... than' indica que una accion ocurrio inmediatamente despues de otra."
      },
      {
        "type": "fill_blank",
        "skill": "grammar",
        "sentence": "The committee insisted that the new policy ___ implemented without further delay.",
        "answers": [
          "be"
        ],
        "hint": "Subjuntivo tras 'insist that'.",
        "explanation": "Tras verbos como 'insist/suggest/demand that', se usa el subjuntivo: forma base 'be', sin importar el sujeto."
      },
      {
        "type": "fill_blank",
        "skill": "grammar",
        "sentence": "We're not having the painters paint the office ourselves; we're going to have it ___ professionally next month.",
        "answers": [
          "painted",
          "done"
        ],
        "hint": "Causativo: have + objeto + participio.",
        "explanation": "El causativo 'have something done' usa el participio pasado para indicar que otra persona realiza la accion."
      },
      {
        "type": "true_false",
        "skill": "vocab",
        "statement": "If you are 'ambivalent' about a proposal, it means you firmly support it.",
        "answer": false,
        "explanation": "'Ambivalent' significa tener sentimientos encontrados o estar indeciso, no apoyar firmemente algo."
      },
      {
        "type": "true_false",
        "skill": "vocab",
        "statement": "In a formal register, 'commence' is a suitable synonym for 'begin'.",
        "answer": true,
        "explanation": "'Commence' es un sinonimo de registro formal de 'begin' (empezar/comenzar)."
      },
      {
        "type": "word_order",
        "skill": "grammar",
        "words": [
          "Had",
          "I",
          "known",
          "about",
          "the",
          "deadline,",
          "I",
          "would",
          "have",
          "submitted",
          "it",
          "earlier"
        ],
        "correctOrder": [
          "Had",
          "I",
          "known",
          "about",
          "the",
          "deadline,",
          "I",
          "would",
          "have",
          "submitted",
          "it",
          "earlier"
        ],
        "hint": "Tercer condicional con inversion (sin 'if')."
      },
      {
        "type": "translate",
        "skill": "use",
        "prompt": "Traduce al ingles (registro formal): \"Le agradeceriamos que nos proporcionara los documentos solicitados.\"",
        "answers": [
          "we would appreciate it if you could provide the requested documents",
          "we would appreciate it if you could provide us with the requested documents",
          "we would be grateful if you could provide the requested documents",
          "we would be grateful if you could provide us with the requested documents"
        ],
        "explanation": "Se usa un condicional cortes ('we would appreciate/be grateful if you could') y vocabulario formal ('provide', 'requested documents')."
      },
      {
        "type": "find_error",
        "skill": "grammar",
        "question": "Encuentra el error.",
        "segments": [
          "Despite ",
          {
            "u": "of"
          },
          " the heavy rain, the outdoor exhibition ",
          {
            "u": "remained"
          },
          " open to the public."
        ],
        "correctIndex": 0,
        "correction": "Despite (sin 'of')",
        "explanation": "'Despite' va seguido directamente de un sustantivo, sin 'of'. 'In spite of' si lleva 'of', pero 'despite of' es incorrecto."
      },
      {
        "type": "find_error",
        "skill": "grammar",
        "question": "Encuentra el error.",
        "segments": [
          "She ",
          {
            "u": "has been working"
          },
          " on her doctoral thesis ",
          {
            "u": "since"
          },
          " three years, yet it remains unfinished."
        ],
        "correctIndex": 1,
        "correction": "for (since -> for)",
        "explanation": "Con un periodo de duracion ('three years') se usa 'for'; 'since' se usa con un punto de inicio concreto en el tiempo."
      },
      {
        "type": "multiple_choice",
        "skill": "use",
        "question": "Choose the best formal-register rewrite: 'The researchers got a lot of useful data from the survey.'",
        "options": [
          "The researchers obtained numerous useful data from the survey.",
          "The researchers obtained a substantial amount of useful data from the survey.",
          "The researchers grabbed loads of useful data from the survey.",
          "The researchers picked up tons of useful data from the survey."
        ],
        "correctIndex": 1,
        "explanation": "'Obtained' y 'a substantial amount of' son de registro formal y correctos; 'numerous' no concuerda con el incontable 'data', y las otras opciones son informales."
      }
    ],
    "C1": [
      {
        "type": "multiple_choice",
        "skill": "grammar",
        "question": "Seldom ___ such a sweeping revision of the curriculum without consulting the teaching staff first.",
        "options": [
          "the board has approved",
          "has the board approved",
          "the board approves",
          "does the board approved"
        ],
        "correctIndex": 1,
        "explanation": "Tras un adverbio negativo en posicion inicial (Seldom) se requiere inversion: auxiliar + sujeto. La forma correcta es 'has the board approved'."
      },
      {
        "type": "multiple_choice",
        "skill": "use",
        "question": "Which sentence is a correctly formed cleft that emphasises the cause?",
        "options": [
          "What undermined the report was its reliance on outdated data.",
          "It was undermined the report by relying on outdated data.",
          "What was undermined the report its outdated data.",
          "The thing undermines the report that outdated data."
        ],
        "correctIndex": 0,
        "explanation": "Una oracion hendida (cleft) con 'What' usa el patron 'What + clausula + was/is + complemento': 'What undermined the report was its reliance on outdated data.'"
      },
      {
        "type": "fill_blank",
        "skill": "grammar",
        "sentence": "Had the committee scrutinised the budget more carefully, the deficit ___ have been avoided.",
        "answers": [
          "would",
          "could",
          "might"
        ],
        "hint": "Condicional perfecto en la oracion principal tras inversion de 'Had'.",
        "explanation": "Con la inversion del tercer condicional (Had + sujeto + participio), la principal lleva un modal + 'have' + participio: would/could/might have been avoided."
      },
      {
        "type": "fill_blank",
        "skill": "use",
        "sentence": "The dean insisted that every applicant ___ submit a coherent statement of purpose.",
        "answers": [
          "submit"
        ],
        "hint": "Subjuntivo en registro formal tras 'insist that'.",
        "explanation": "Tras verbos de mandato/insistencia (insist that) el ingles formal usa el subjuntivo: la forma base 'submit' sin -s, para cualquier sujeto."
      },
      {
        "type": "multiple_choice",
        "skill": "vocab",
        "question": "The peer reviewers asked the authors to ___ their central claim with additional empirical evidence.",
        "options": [
          "substantiate",
          "speculate",
          "fluctuate",
          "alleviate"
        ],
        "correctIndex": 0,
        "explanation": "'Substantiate' significa respaldar o demostrar una afirmacion con pruebas, exactamente lo que piden los revisores."
      },
      {
        "type": "true_false",
        "skill": "vocab",
        "statement": "In academic English, 'an ambiguous finding' is one that can be interpreted in more than one way.",
        "answer": true,
        "explanation": "'Ambiguous' describe algo que admite mas de una interpretacion, por lo que la afirmacion es verdadera."
      },
      {
        "type": "word_order",
        "skill": "grammar",
        "words": [
          "The",
          "data",
          "collected",
          "last",
          "spring",
          "remain",
          "inconclusive"
        ],
        "correctOrder": [
          "The",
          "data",
          "collected",
          "last",
          "spring",
          "remain",
          "inconclusive"
        ],
        "hint": "Clausula de relativo reducida ('which was collected' -> 'collected'); recuerda que 'data' suele tomar verbo plural en registro academico."
      },
      {
        "type": "find_error",
        "skill": "grammar",
        "question": "Encuentra el error de registro/gramatica en esta oracion academica formal.",
        "segments": [
          "Not only ",
          {
            "u": "the methodology was flawed"
          },
          ", but the conclusions ",
          {
            "u": "were"
          },
          " also ",
          {
            "u": "demonstrably"
          },
          " overstated."
        ],
        "correctIndex": 0,
        "correction": "was the methodology flawed (inversion tras 'Not only')",
        "explanation": "Tras 'Not only' en posicion inicial se requiere inversion sujeto-auxiliar: 'Not only was the methodology flawed'."
      },
      {
        "type": "translate",
        "skill": "use",
        "prompt": "Traduce al ingles en registro formal: \"Lo que mas me impresiona es el rigor de su metodologia.\"",
        "answers": [
          "what impresses me most is the rigour of his methodology",
          "what impresses me most is the rigour of her methodology",
          "what impresses me most is the rigor of his methodology",
          "what impresses me most is the rigor of her methodology",
          "what impresses me the most is the rigour of his methodology",
          "what impresses me the most is the rigour of her methodology",
          "what impresses me the most is the rigor of his methodology",
          "what impresses me the most is the rigor of her methodology"
        ],
        "explanation": "Oracion hendida con 'What': 'What impresses me most is the rigour of his/her methodology.' Se aceptan grafias britanica (rigour) y americana (rigor)."
      },
      {
        "type": "reading",
        "skill": "reading",
        "title": "The Quiet Reshaping of Urban Soundscapes",
        "passage": "For most of the twentieth century, the study of cities privileged the visual: planners spoke of skylines, sightlines, and vistas, while the auditory dimension of urban life was dismissed as mere noise to be suppressed. Recently, however, a small but growing field known as soundscape ecology has begun to argue that the acoustic environment is not an incidental by-product of urban form but a constitutive element of how people experience place. Its proponents contend that what we hear shapes our sense of safety, belonging, and even the perceived pace of a neighbourhood as profoundly as anything we see.\n\nThe methodological shift this entails is considerable. Traditional noise mapping, derived from transport engineering, reduces sound to decibels and treats every increment above a threshold as a nuisance to be mitigated. Soundscape researchers regard such a metric as reductive, for it cannot distinguish the grating drone of an idling lorry from the layered murmur of a market or the rhythmic chatter of a schoolyard. Two streets registering identical decibel readings may be experienced as entirely different places: one oppressive, the other convivial. To capture this, investigators have begun pairing acoustic measurement with interviews, asking residents not merely how loud a place is but how its sounds make them feel.\n\nCritics, predictably, are sceptical. They point out that the criteria for a pleasant soundscape are notoriously subjective, varying across cultures, ages, and individual temperaments, and they caution that policy built on such shifting ground risks privileging the preferences of the articulate few. Soundscape advocates concede the difficulty but counter that the alternative, an exclusively quantitative standard, is no more neutral; it simply hides its value judgements behind a veneer of numerical objectivity. The decision to treat all sound above sixty-five decibels as harmful is itself, they note, a value judgement.\n\nWhat is striking about the debate is how it reframes a familiar problem. The question is no longer how to make cities quieter but how to make them sound right, a far more demanding and contested ambition. If the field's claims hold, the planners of the coming decades may find themselves composing cities as much as constructing them.",
        "questions": [
          {
            "q": "What is the main idea of the passage?",
            "options": [
              "Cities have become measurably noisier over the past century.",
              "An emerging field argues that the acoustic character of cities, not just their loudness, shapes urban experience and demands new methods.",
              "Noise above sixty-five decibels should be banned in residential areas.",
              "Visual planning has always been more important than auditory planning."
            ],
            "correctIndex": 1,
            "explanation": "El texto presenta la ecologia del paisaje sonoro y su tesis de que el caracter acustico (no solo el volumen) configura la experiencia urbana y exige metodos nuevos."
          },
          {
            "q": "Why do soundscape researchers consider traditional noise mapping inadequate?",
            "options": [
              "It is too expensive to carry out in large cities.",
              "It relies on interviews rather than measurements.",
              "It reduces sound to decibels and cannot distinguish unpleasant noise from agreeable sound at the same volume.",
              "It overstates the dangers of quiet environments."
            ],
            "correctIndex": 2,
            "explanation": "El parrafo dos explica que dos calles con identicos decibeles pueden vivirse de modo opuesto; el mapeo tradicional no capta esa diferencia cualitativa."
          },
          {
            "q": "How do soundscape advocates respond to the charge that their criteria are too subjective?",
            "options": [
              "They abandon interviews in favour of decibel readings.",
              "They argue that purely quantitative standards also conceal value judgements and are not truly neutral.",
              "They admit the approach cannot inform policy at all.",
              "They claim subjectivity is irrelevant to urban planning."
            ],
            "correctIndex": 1,
            "explanation": "En el tercer parrafo los defensores conceden la subjetividad pero replican que el estandar cuantitativo tambien esconde juicios de valor tras una apariencia de objetividad."
          },
          {
            "q": "In the final paragraph, the phrase 'composing cities as much as constructing them' is used to suggest that planners may need to",
            "options": [
              "build cities more cheaply than before.",
              "treat the design of urban sound with the deliberate, artistic care of a composer.",
              "abandon physical construction altogether.",
              "rely solely on musicians for city planning."
            ],
            "correctIndex": 1,
            "explanation": "'Composing' (componer, como musica) frente a 'constructing' sugiere que disenar el sonido urbano requerira un cuidado artistico y deliberado, no solo construccion fisica."
          },
          {
            "q": "What is the author's overall tone toward soundscape ecology?",
            "options": [
              "Dismissive and mocking.",
              "Cautiously favourable, presenting its arguments seriously while acknowledging the critics.",
              "Openly hostile to any new methodology.",
              "Indifferent and detached from the debate."
            ],
            "correctIndex": 1,
            "explanation": "El autor expone con seriedad los argumentos del campo y reconoce a los criticos sin ridiculizarlos; el tono es cautelosamente favorable."
          }
        ]
      },
      {
        "type": "listening",
        "skill": "listening",
        "text": "In today's seminar I want to challenge a comfortable assumption, namely that bilingual children inevitably lag behind their monolingual peers in early vocabulary. The raw counts do show a smaller word list in each single language. But when researchers tally the child's total vocabulary across both languages, the so-called deficit largely disappears. So I'd urge you to be sceptical of any study that measures only one language and then declares a delay.",
        "question": "What is the speaker's main point about bilingual children's vocabulary?",
        "options": [
          "Bilingual children are permanently behind monolingual children in every language.",
          "The apparent vocabulary gap mostly vanishes once both languages are counted together, so single-language studies can be misleading.",
          "Monolingual children should be taught a second language as early as possible.",
          "Vocabulary size is irrelevant to a child's development."
        ],
        "correctIndex": 1,
        "explanation": "El ponente sostiene que el supuesto retraso desaparece al sumar el vocabulario de ambos idiomas, por lo que los estudios de una sola lengua pueden inducir a error."
      }
    ],
    "C2": [
      {
        "type": "multiple_choice",
        "skill": "grammar",
        "question": "___ the committee anticipated such a vehement backlash, the policy would surely have been redrafted before its premature unveiling.",
        "options": [
          "Had",
          "If",
          "Should",
          "Were"
        ],
        "correctIndex": 0,
        "explanation": "Es una condicional de tercer tipo con inversion: 'Had the committee anticipated...' equivale a 'If the committee had anticipated...'. Las demas opciones no encajan con el participio pasado 'anticipated' ni con el resultado hipotetico pasado."
      },
      {
        "type": "multiple_choice",
        "skill": "vocab",
        "question": "Far from ameliorating the crisis, the emergency subsidies merely ___ the underlying fiscal imbalances they were meant to redress.",
        "options": [
          "corroborated",
          "discerned",
          "exacerbated",
          "posited"
        ],
        "correctIndex": 2,
        "explanation": "'Exacerbate' significa agravar o empeorar, lo opuesto a 'ameliorate' (mejorar), coherente con 'Far from...'. 'Corroborate' es confirmar, 'discern' percibir y 'posit' postular, ninguno encaja."
      },
      {
        "type": "fill_blank",
        "skill": "grammar",
        "sentence": "So ___ was the keynote speaker's rhetoric that even her staunchest detractors found themselves nodding in reluctant assent.",
        "answers": [
          "compelling",
          "persuasive",
          "eloquent"
        ],
        "hint": "Inversion enfatica: 'So + adjetivo + was...'. Necesitas un adjetivo que describa una retorica irresistible.",
        "explanation": "La estructura 'So compelling was X that...' antepone el adjetivo para dar enfasis. Adjetivos como 'compelling', 'persuasive' o 'eloquent' completan el sentido de un discurso que convence hasta a los criticos."
      },
      {
        "type": "find_error",
        "skill": "grammar",
        "question": "Encuentra el error de concordancia con sujeto complejo.",
        "segments": [
          "Neither the senator nor her aides ",
          {
            "u": "was"
          },
          " willing to ",
          {
            "u": "concede"
          },
          " that the leaked memo ",
          {
            "u": "had been"
          },
          " misconstrued."
        ],
        "correctIndex": 0,
        "correction": "were (neither...nor: el verbo concuerda con 'aides', plural)",
        "explanation": "Con 'neither...nor', el verbo concuerda con el sujeto mas cercano; aqui 'aides' es plural, asi que corresponde 'were'. 'Concede' y 'had been' son correctos."
      },
      {
        "type": "multiple_choice",
        "skill": "use",
        "question": "Which sentence best expresses tentative, hedged academic register appropriate for a research abstract?",
        "options": [
          "These findings prove beyond doubt that the intervention works.",
          "These findings tentatively suggest that the intervention may confer modest benefits, though further corroboration is warranted.",
          "Honestly, the intervention totally works, no question about it.",
          "The intervention works and anyone who disagrees is simply wrong."
        ],
        "correctIndex": 1,
        "explanation": "El registro academico C2 favorece la cautela: 'tentatively suggest', 'may confer' y 'further corroboration is warranted' marcan provisionalidad. Las otras opciones son categoricas o coloquiales, impropias de un abstract."
      },
      {
        "type": "word_order",
        "skill": "grammar",
        "words": [
          "Never",
          "before",
          "had",
          "such",
          "a",
          "paradox",
          "confronted",
          "the",
          "tribunal"
        ],
        "correctOrder": [
          "Never",
          "before",
          "had",
          "such",
          "a",
          "paradox",
          "confronted",
          "the",
          "tribunal"
        ],
        "hint": "Inversion negativa enfatica: 'Never before had + sujeto + participio...'.",
        "explanation": "Tras un adverbio negativo inicial ('Never before') se invierte el auxiliar y el sujeto: 'had such a paradox confronted the tribunal'. Es la estructura de enfasis tipica del C2."
      },
      {
        "type": "translate",
        "skill": "use",
        "prompt": "Traduce al ingles con registro formal: \"Propongo que la mocion sea aplazada hasta nuevo aviso.\"",
        "answers": [
          "i move that the motion be postponed until further notice",
          "i propose that the motion be postponed until further notice",
          "i move that the motion be deferred until further notice",
          "i propose that the motion be deferred until further notice"
        ],
        "explanation": "Tras verbos de propuesta como 'move' o 'propose', el ingles formal usa el subjuntivo base ('be postponed', no 'is postponed'). 'Until further notice' traduce 'hasta nuevo aviso'."
      },
      {
        "type": "true_false",
        "skill": "vocab",
        "statement": "If a phenomenon is described as 'ubiquitous', it is found almost everywhere.",
        "answer": true,
        "explanation": "'Ubiquitous' significa omnipresente, que aparece en todas partes. Por tanto la afirmacion es verdadera."
      },
      {
        "type": "multiple_choice",
        "skill": "vocab",
        "question": "The journalist framed the reform as a ___ for systemic change, the single event that set an entire cascade of consequences in motion.",
        "options": [
          "dichotomy",
          "catalyst",
          "nexus",
          "paradigm"
        ],
        "correctIndex": 1,
        "explanation": "Un 'catalyst' es lo que desencadena o acelera un proceso, justo lo que describe la frase. 'Dichotomy' es una division en dos, 'nexus' un punto de conexion y 'paradigm' un modelo, ninguno encaja."
      },
      {
        "type": "reading",
        "skill": "reading",
        "title": "The Seduction of Certainty",
        "passage": "It has become fashionable, in certain intellectual circles, to lament the public's appetite for tidy answers. Commentators bemoan a citizenry that craves the reassurance of unambiguous verdicts and recoils from the discomfort of ambiguity. There is, admittedly, something to this complaint: the marketplace of ideas does reward the confident over the circumspect, and the pundit who hedges is seldom invited back. Yet to locate the fault entirely in the audience is to commit a convenient evasion.\n\nConsider how knowledge is packaged for consumption. The very institutions that profess to prize nuance routinely reward its opposite. Academic prestige accrues to the bold thesis, not the careful qualification; headlines are written to startle, not to temper. We have, in short, constructed an entire apparatus that manufactures certainty and then affects surprise when the public consumes it. The supposed gullibility of the masses is, in large measure, a product engineered by those who now profess to deplore it.\n\nNone of this is to suggest that all claims are equally tentative, or that conviction is inherently suspect. To posit such a thing would be to slide into the very relativism that makes serious inquiry impossible. A scientist who refuses ever to commit is not admirably humble but merely useless. The point is subtler: that the willingness to say 'we do not yet know' is a discipline, not a deficiency, and that a culture which punishes such candour will, with grim inevitability, be governed by those least troubled by their own ignorance.\n\nWhat, then, is to be done? The temptation is to call for more humility, as though humility could be legislated into existence. But exhortation is cheap. A more honest reckoning would attend to incentives: to ask why the careful voice is so reliably drowned out, and whether the structures that reward stridency might be reformed. Until that question is taken seriously, the periodic hand-wringing over public credulity will remain what it has largely been so far: a performance of concern that conveniently absolves its performers of any complicity.",
        "questions": [
          {
            "q": "What is the author's central thesis?",
            "options": [
              "The public is uniquely to blame for its craving for simple answers.",
              "The institutions that decry public credulity are themselves complicit in manufacturing certainty.",
              "All claims should be treated as equally uncertain.",
              "Humility can be successfully legislated through reform."
            ],
            "correctIndex": 1,
            "explanation": "El autor sostiene que las instituciones que critican la credulidad publica son quienes fabrican la certeza; culpar solo al publico es una 'conveniente evasion'."
          },
          {
            "q": "The phrase 'a performance of concern that conveniently absolves its performers of any complicity' is best described as",
            "options": [
              "sincere praise for the commentators",
              "ironic criticism of those who lament public credulity",
              "a neutral factual observation",
              "an endorsement of relativism"
            ],
            "correctIndex": 1,
            "explanation": "La frase es ironica y critica: tacha la preocupacion de los comentaristas de mera 'actuacion' que los exime de su propia responsabilidad."
          },
          {
            "q": "Why does the author mention 'A scientist who refuses ever to commit is not admirably humble but merely useless'?",
            "options": [
              "To concede that perpetual non-commitment is itself a failing, qualifying the argument",
              "To prove that all scientists are useless",
              "To argue that certainty is always preferable to doubt",
              "To abandon the main argument entirely"
            ],
            "correctIndex": 0,
            "explanation": "Es una concesion: el autor matiza su tesis admitiendo que la indecision perpetua tambien es un defecto, para evitar caer en el relativismo absoluto."
          },
          {
            "q": "What does the author imply is the real solution to the problem?",
            "options": [
              "Simply urging people to be more humble",
              "Reforming the incentive structures that reward stridency over caution",
              "Accepting that nothing can be done",
              "Punishing the public for its credulity"
            ],
            "correctIndex": 1,
            "explanation": "El autor descarta la mera exhortacion ('exhortation is cheap') y propone atender a los incentivos que premian la estridencia, es decir, reformar las estructuras."
          },
          {
            "q": "The overall tone of the passage can best be characterized as",
            "options": [
              "indignant and exhortatory",
              "measured but pointedly critical",
              "detached and indifferent",
              "celebratory and optimistic"
            ],
            "correctIndex": 1,
            "explanation": "El tono es mesurado y matizado (hace concesiones, distingue grados) pero a la vez incisivamente critico hacia los comentaristas hipocritas."
          }
        ]
      },
      {
        "type": "listening",
        "skill": "listening",
        "text": "In this debate, my opponent insists that economic growth and environmental stewardship are fundamentally irreconcilable. But that framing smuggles in an assumption I simply cannot grant: that our current modes of production are the only conceivable ones. Strip away that premise, and the so-called dilemma dissolves into a mere failure of imagination.",
        "question": "What is the speaker primarily doing in this argument?",
        "options": [
          "Conceding that growth and the environment cannot coexist",
          "Challenging an unstated assumption underlying the opponent's claim",
          "Proposing a specific new technology to solve the dilemma"
        ],
        "correctIndex": 1,
        "explanation": "El orador no concede ni propone tecnologia; identifica y refuta una suposicion implicita ('smuggles in an assumption') del oponente: que los modos actuales de produccion son los unicos posibles."
      }
    ]
  };
  Object.keys(EXTRA).forEach(function (lv) {
    if (B[lv] && Array.isArray(B[lv].exercises)) B[lv].exercises = B[lv].exercises.concat(EXTRA[lv]);
  });
})();
