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
        "Does",
        "Are",
        "Do"
      ],
      "correctIndex": 2,
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
        "are playing",
        "plays",
        "play"
      ],
      "correctIndex": 0,
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
        "cans",
        "can",
        "am"
      ],
      "correctIndex": 1,
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
        "milk",
        "cheese",
        "bread"
      ],
      "correctIndex": 0,
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
        "fifty",
        "fifteen"
      ],
      "correctIndex": 2,
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
        "childes",
        "children"
      ],
      "correctIndex": 2,
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
            "Twelve",
            "Thirty",
            "Twenty"
          ],
          "correctIndex": 3,
          "explanation": "El texto dice 'Anna is twenty years old'."
        },
        {
          "q": "Where does Anna live?",
          "options": [
            "In a shop",
            "In Paris",
            "In a big house",
            "In London"
          ],
          "correctIndex": 3,
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
            "At home",
            "In a park",
            "In a school",
            "In a shop"
          ],
          "correctIndex": 3,
          "explanation": "El texto dice 'Anna works in a shop'."
        },
        {
          "q": "What does Anna do on Sundays?",
          "options": [
            "She plays with her dog",
            "She drinks tea",
            "She works",
            "She watches TV"
          ],
          "correctIndex": 0,
          "explanation": "El texto dice 'On Sundays she plays with her dog in the park'."
        }
      ]
    },
    {
      "type": "listening",
      "skill": "listening",
      "text": "Hello! My name is David. I am from Spain and I am eleven years old. I have one sister and a small dog. I like football and pizza.", "audio": "assets/audio/app/a1_a694190f81.mp3",
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
      "text": "Excuse me. Go straight on and turn left. The supermarket is next to the bank. It is open today.", "audio": "assets/audio/app/a1_b79375b055.mp3",
      "question": "Where is the supermarket?",
      "options": [
        "In front of the school",
        "Behind the bank",
        "Next to the bank"
      ],
      "correctIndex": 2,
      "explanation": "La persona dice 'The supermarket is next to the bank' (al lado del banco)."
    }
  ] },
  "A2": { "pass": 70, "exercises": [
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "Last summer we ___ to Italy on holiday.",
      "options": [
        "went",
        "going",
        "goed",
        "go"
      ],
      "correctIndex": 0,
      "explanation": "El pasado simple del verbo irregular 'go' es 'went'."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "Yesterday she ___ a new dress at the shopping centre.",
      "options": [
        "buyed",
        "buy",
        "buys",
        "bought"
      ],
      "correctIndex": 3,
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
        "the goodest",
        "the better",
        "the best",
        "best"
      ],
      "correctIndex": 2,
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
        "much",
        "any",
        "some",
        "many"
      ],
      "correctIndex": 0,
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
        "have",
        "was",
        "is",
        "has"
      ],
      "correctIndex": 3,
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
        "of",
        "on",
        "in",
        "at"
      ],
      "correctIndex": 1,
      "explanation": "Con días de la semana usamos 'on': 'on Monday'."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "He ___ takes the bus to work; he prefers walking.",
      "options": [
        "often",
        "always",
        "usually",
        "never"
      ],
      "correctIndex": 3,
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
        "hat",
        "swimsuit",
        "umbrella",
        "sunglasses"
      ],
      "correctIndex": 2,
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
        "card",
        "money"
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
            "By bus",
            "By train",
            "By plane",
            "By car"
          ],
          "correctIndex": 1,
          "explanation": "El texto dice 'We travelled by train'."
        },
        {
          "q": "What did they do every morning?",
          "options": [
            "They stayed at the hotel",
            "They went shopping",
            "They visited a castle",
            "They had breakfast and walked to the sea"
          ],
          "correctIndex": 3,
          "explanation": "El texto dice que cada mañana desayunaban y caminaban hasta el mar."
        },
        {
          "q": "Why did the little brother stay at the hotel?",
          "options": [
            "He was ill",
            "He was tired",
            "He wanted to swim",
            "He didn't like castles"
          ],
          "correctIndex": 1,
          "explanation": "El texto dice 'he was tired' (estaba cansado)."
        },
        {
          "q": "What did the writer buy on the last day?",
          "options": [
            "Train tickets",
            "Photos",
            "A castle",
            "Gifts for friends"
          ],
          "correctIndex": 3,
          "explanation": "El texto dice 'I bought some small gifts for my friends'."
        },
        {
          "q": "How did the writer feel about the holiday?",
          "options": [
            "It was the best holiday of their life",
            "It was very expensive",
            "It was boring",
            "It was too short"
          ],
          "correctIndex": 0,
          "explanation": "El texto termina diciendo que fue 'the best holiday of my life'."
        }
      ]
    },
    {
      "type": "listening",
      "skill": "listening",
      "text": "Excuse me, how do I get to the train station? Go straight on for two hundred metres. Then turn left at the supermarket. The station is on your right, next to the bank.", "audio": "assets/audio/app/a2_00e68c9a5e.mp3",
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
      "text": "Good morning, doctor. I don't feel well. I have a headache and a sore throat. I think I have a cold. You should drink hot water and rest at home for two days.", "audio": "assets/audio/app/a2_4a7621bfc2.mp3",
      "question": "What is the patient's problem?",
      "options": [
        "A broken leg",
        "A stomach ache",
        "A headache and a sore throat"
      ],
      "correctIndex": 2,
      "explanation": "El paciente dice que tiene dolor de cabeza ('headache') y dolor de garganta ('sore throat')."
    }
  ] },
  "B1": { "pass": 70, "exercises": [
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "I ___ my homework, so I can go out now.",
      "options": [
        "am finishing",
        "have already finished",
        "finish",
        "already finished"
      ],
      "correctIndex": 1,
      "explanation": "The present perfect (have finished) connects a past action with the present; 'already' stresses that the homework is done now."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "We ___ to Italy last summer; it was wonderful.",
      "options": [
        "go",
        "have gone",
        "have been going",
        "went"
      ],
      "correctIndex": 3,
      "explanation": "With a specific past time (last summer) we use the past simple: 'went'."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "I have lived in this city ___ 2015.",
      "answers": [
        "since"
      ],
      "hint": "A starting point in time.",
      "explanation": "We use 'since' with a specific starting point (2015); 'for' is used with periods of time."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "She has worked here ___ three years.",
      "answers": [
        "for"
      ],
      "hint": "A duration, not a starting point.",
      "explanation": "We use 'for' with periods of time (three years); 'since' would be used with a date or moment."
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
      "explanation": "Zero conditional: for general facts we use the present simple in both parts (If + present, present)."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "If it rains tomorrow, we ___ the meeting online.",
      "options": [
        "would have",
        "had",
        "have",
        "will have"
      ],
      "correctIndex": 3,
      "explanation": "First conditional for real future situations: If + present simple, will + base verb."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "If I had more time, I ___ learn another language.",
      "answers": [
        "would"
      ],
      "hint": "Second conditional, an imaginary situation.",
      "explanation": "Second conditional for imaginary situations: If + past simple, would + base verb."
    },
    {
      "type": "find_error",
      "skill": "grammar",
      "question": "Find the mistake.",
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
      "explanation": "For people we use the relative pronoun 'who' (or 'that'), not 'which', which is for things."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "This is the restaurant ___ we had dinner last night.",
      "options": [
        "what",
        "which",
        "where",
        "who"
      ],
      "correctIndex": 2,
      "explanation": "'where' is the relative pronoun for places (the restaurant = a place)."
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
      "hint": "Past passive: was + past participle."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "Coffee ___ grown in Colombia.",
      "answers": [
        "is"
      ],
      "hint": "Present passive, singular subject.",
      "explanation": "Present passive: 'is' + past participle (grown). The coffee receives the action; it doesn't do it."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "You look tired. You ___ go to bed earlier.",
      "options": [
        "should",
        "must",
        "might",
        "can't"
      ],
      "correctIndex": 0,
      "explanation": "'should' is used to give advice. 'must' would be a strong obligation and 'might' only a possibility."
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
      "explanation": "'can't' expresses a deduction that something is impossible, based on the evidence (they can't be at home)."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "She enjoys ___ (read) before going to sleep.",
      "answers": [
        "reading"
      ],
      "hint": "After 'enjoy' we use the -ing form.",
      "explanation": "After verbs like enjoy, stop or avoid we use the -ing form: 'reading'."
    },
    {
      "type": "find_error",
      "skill": "grammar",
      "question": "Find the mistake.",
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
      "explanation": "After 'avoid' we use the -ing form: 'avoid eating', not the infinitive."
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
      "explanation": "'turn off' means to stop a device or switch off the lights."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "My neighbour will ___ my dog while I'm on holiday.",
      "options": [
        "turn off",
        "look after",
        "get up",
        "set up"
      ],
      "correctIndex": 1,
      "explanation": "'look after' means to take care of someone or something."
    },
    {
      "type": "fill_blank",
      "skill": "vocab",
      "sentence": "They decided to ___ up their own company after university.",
      "answers": [
        "set"
      ],
      "hint": "A phrasal verb that means to create or start.",
      "explanation": "'set up' means to start (a business, a company)."
    },
    {
      "type": "true_false",
      "skill": "vocab",
      "statement": "If you 'download' a file, you save it from the internet to your device.",
      "answer": true,
      "explanation": "'download' means to bring a file from the internet to your device."
    },
    {
      "type": "true_false",
      "skill": "vocab",
      "statement": "Recycling and renewable energy are ways to harm the environment.",
      "answer": false,
      "explanation": "Recycling and using renewable energy help to protect the environment, not harm it."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "After the interview, the company offered her the ___.",
      "options": [
        "salary",
        "colleague",
        "deadline",
        "position"
      ],
      "correctIndex": 3,
      "explanation": "'position' means a job, which a company offers after an interview."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "Climate change is partly caused by greenhouse ___ from cars and factories.",
      "options": [
        "wildlife",
        "habits",
        "recycling",
        "gases"
      ],
      "correctIndex": 3,
      "explanation": "'greenhouse gases' are one cause of climate change."
    },
    {
      "type": "translate",
      "skill": "use",
      "prompt": "Rewrite with the present perfect and 'for': I came to live here five years ago and I still live here.",
      "answers": [
        "i have lived here for five years",
        "i've lived here for five years"
      ],
      "explanation": "I have lived here for five years. Present perfect + 'for' for duration."
    },
    {
      "type": "translate",
      "skill": "use",
      "prompt": "Make a second conditional: I don't have much money, so I don't travel around the world. (If I had more money…)",
      "answers": [
        "if i had more money, i would travel around the world",
        "if i had more money i would travel around the world",
        "if i had more money, i'd travel around the world",
        "if i had more money i'd travel around the world",
        "if i had more money, i would travel the world",
        "if i had more money i would travel the world"
      ],
      "explanation": "If I had more money, I would travel around the world. Second conditional."
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
      "hint": "A present perfect question with 'ever'."
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
      "hint": "A modal of possibility (perhaps).",
      "explanation": "'might', 'could' or 'may' express possibility when we aren't sure."
    },
    {
      "type": "translate",
      "skill": "use",
      "prompt": "Give the instruction with the phrasal verb 'turn off': The TV must not be on when you go to bed. (… before going to bed)",
      "answers": [
        "turn off the tv before going to bed",
        "turn off the television before going to bed",
        "turn the tv off before going to bed",
        "turn the television off before going to bed",
        "switch off the tv before going to bed",
        "switch off the television before going to bed"
      ],
      "explanation": "Turn off the TV before going to bed. 'turn off' + -ing after 'before'."
    },
    {
      "type": "find_error",
      "skill": "use",
      "question": "Find the mistake.",
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
      "explanation": "With 'yesterday' (a specific past time) we use the past simple 'saw', not the present perfect."
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
            "Companies do not trust their employees.",
            "Everyone prefers working from home.",
            "Working from home has both benefits and problems, and a mix may be best.",
            "Offices will soon disappear completely."
          ],
          "correctIndex": 2,
          "explanation": "The text presents advantages and disadvantages and concludes that the hybrid model may be the best solution."
        },
        {
          "q": "According to the text, why do workers save money when working from home?",
          "options": [
            "They do not pay for the internet.",
            "They do not have to travel to an office.",
            "They earn higher salaries.",
            "They work fewer hours."
          ],
          "correctIndex": 1,
          "explanation": "The text says they save time and money because they don't have to travel to the office."
        },
        {
          "q": "What problem do younger employees mention?",
          "options": [
            "They learn more quickly next to experienced colleagues.",
            "They earn less money.",
            "They cannot use computers.",
            "They never feel lonely."
          ],
          "correctIndex": 0,
          "explanation": "The text says younger employees learn faster next to experienced colleagues."
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
          "explanation": "The 'hybrid' model combines office days with days working from home, as the text explains."
        },
        {
          "q": "What can we infer about the author's opinion?",
          "options": [
            "The author sees the hybrid model as a reasonable balance.",
            "The author thinks productivity always falls at home.",
            "The author thinks home working is always bad.",
            "The author dislikes offices."
          ],
          "correctIndex": 0,
          "explanation": "The tone and the conclusion suggest the writer sees the hybrid model as a balanced solution."
        }
      ]
    },
    {
      "type": "listening",
      "skill": "listening",
      "text": "Hi, this is a message for Mr Daniels. This is Sarah from City Dental Clinic. I'm calling to let you know that your appointment on Thursday at three o'clock has to be moved. The dentist is not available that afternoon. Please call us back to choose a new time. Thank you.", "audio": "assets/audio/app/b1_ec15f21943.mp3",
      "question": "Why is Sarah calling?",
      "options": [
        "To cancel the clinic permanently.",
        "To confirm that Thursday at three is fine.",
        "To change the time of an appointment."
      ],
      "correctIndex": 2,
      "explanation": "Sarah explains that the appointment must be moved because the dentist is not available, so she asks them to call back to choose another time."
    },
    {
      "type": "listening",
      "skill": "listening",
      "text": "Honestly, I was a bit disappointed with the new phone. Everyone said the camera was amazing, and yes, the photos are good. But the battery only lasts half a day, and for that price I really expected more. I'm not sure I would recommend it to a friend.", "audio": "assets/audio/app/b1_7dcc5d8e0e.mp3",
      "question": "What is the speaker's attitude towards the phone?",
      "options": [
        "Disappointed, mainly because of the battery and price.",
        "Angry because the camera is terrible.",
        "Completely satisfied and enthusiastic."
      ],
      "correctIndex": 0,
      "explanation": "The speaker admits the camera is good but is disappointed by the battery and the price, so hesitates to recommend it."
    }
  ] },
  "B2": { "pass": 72, "exercises": [
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "I'm exhausted because I ___ for the final exam since early this morning.",
      "options": [
        "studied",
        "had studied",
        "am studying",
        "have been studying"
      ],
      "correctIndex": 3,
      "explanation": "The present perfect continuous (have been studying) expresses an action that started in the past and continues, with emphasis on duration ('since early this morning')."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "By the time the manager arrived, the team ___ the entire report.",
      "options": [
        "had finished",
        "was finishing",
        "has finished",
        "finished"
      ],
      "correctIndex": 0,
      "explanation": "The past perfect (had finished) marks an action before another past action ('arrived')."
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
      "explanation": "Third conditional: 'if + past perfect' (had known) + 'would have + past participle' for an unreal past situation."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "If she had taken that job, she ___ in London now.",
      "options": [
        "would have lived",
        "lives",
        "would live",
        "had lived"
      ],
      "correctIndex": 2,
      "explanation": "Mixed conditional: an unreal past condition ('had taken') with a present result ('would live now')."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "We're getting the kitchen repainted next week because we ___ to do it ourselves.",
      "options": [
        "won't doing it",
        "aren't have time",
        "not have time",
        "don't have the time"
      ],
      "correctIndex": 3,
      "explanation": "After the causative 'getting the kitchen repainted' (someone else does it), the logical reason is that we don't do it ourselves; 'don't have the time to do it ourselves' is the only grammatically correct option."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "Not only ___ she apologise, but she also offered to pay for the damage.",
      "answers": [
        "did"
      ],
      "hint": "Inversion after 'Not only' with a past simple verb.",
      "explanation": "After 'Not only' at the start of a sentence the order is inverted: auxiliary 'did' + subject + base verb."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "The committee insisted that the new policy ___ implemented immediately.",
      "answers": [
        "be"
      ],
      "hint": "Subjunctive after 'insisted that'.",
      "explanation": "The English subjunctive uses the base form of the verb ('be') after verbs like insist/suggest/demand, whatever the subject."
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
      "hint": "Subjunctive: base form 'arrive' even though the subject is 'he'."
    },
    {
      "type": "find_error",
      "skill": "grammar",
      "question": "Find the mistake (reported speech).",
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
      "explanation": "In reported speech with a past reporting verb ('told'), 'will' changes to 'would'."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "In a formal email, which word best replaces 'get' in 'We need to get permission first.'?",
      "options": [
        "obtain",
        "catch",
        "fetch",
        "grab"
      ],
      "correctIndex": 0,
      "explanation": "'Obtain' is the formal synonym of 'get', suitable in a professional email."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "Choose the most formal synonym: 'Could you ___ me with this task?'",
      "options": [
        "help out",
        "give a hand to",
        "assist",
        "back up"
      ],
      "correctIndex": 2,
      "explanation": "'Assist' is the formal equivalent of 'help'."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "She remained ___ about the new proposal, feeling both attracted to and worried about it at the same time.",
      "options": [
        "compelling",
        "skeptical",
        "dismissive",
        "ambivalent"
      ],
      "correctIndex": 3,
      "explanation": "'Ambivalent' describes having mixed or contradictory feelings at the same time."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "The lawyer presented a ___ argument that convinced the entire jury.",
      "options": [
        "ambivalent",
        "compelling",
        "dismissive",
        "skeptical"
      ],
      "correctIndex": 1,
      "explanation": "'Compelling' means convincing or persuasive, which fits convincing the jury."
    },
    {
      "type": "true_false",
      "skill": "vocab",
      "statement": "If someone is 'skeptical' about a claim, they tend to doubt that it is true.",
      "answer": true,
      "explanation": "'Skeptical' describes someone who doubts or is not easily convinced."
    },
    {
      "type": "fill_blank",
      "skill": "vocab",
      "sentence": "The conference will ___ at nine o'clock sharp with the keynote speech. (formal synonym of 'begin')",
      "answers": [
        "commence"
      ],
      "hint": "A formal verb meaning 'start'.",
      "explanation": "'Commence' is the formal synonym of 'begin/start'."
    },
    {
      "type": "translate",
      "skill": "vocab",
      "prompt": "Rewrite in a formal register: \"We got lots of requests.\"",
      "answers": [
        "we received numerous requests",
        "we received numerous applications",
        "we have received numerous requests",
        "we have received numerous applications"
      ],
      "explanation": "'Numerous' and 'requests/applications' are the formal choices instead of 'many' or 'lots of'."
    },
    {
      "type": "multiple_choice",
      "skill": "use",
      "question": "___ the heavy rain, the outdoor concert went ahead as planned.",
      "options": [
        "Despite",
        "Although",
        "However",
        "Whereas"
      ],
      "correctIndex": 0,
      "explanation": "'Despite' is followed by a noun or -ing form ('the heavy rain'), not a full clause; that's why we don't use 'Although'."
    },
    {
      "type": "multiple_choice",
      "skill": "use",
      "question": "The first design was bold and colourful, ___ the second was minimalist and grey.",
      "options": [
        "although",
        "despite",
        "whereas",
        "however"
      ],
      "correctIndex": 2,
      "explanation": "'Whereas' contrasts two parallel ideas within the same sentence (one against the other)."
    },
    {
      "type": "fill_blank",
      "skill": "use",
      "sentence": "The results were disappointing. ___, the team refused to give up. (connector of contrast + comma)",
      "answers": [
        "however"
      ],
      "hint": "A linker that connects two separate sentences and is usually followed by a comma.",
      "explanation": "'However' links two independent sentences to express contrast and is followed by a comma."
    },
    {
      "type": "translate",
      "skill": "use",
      "prompt": "Rewrite with the present perfect continuous and 'for': I started waiting for the bus two hours ago, and I'm still waiting.",
      "answers": [
        "i have been waiting for the bus for two hours",
        "i've been waiting for the bus for two hours"
      ],
      "explanation": "The present perfect continuous ('have been waiting ... for two hours') expresses an action that has continued for two hours."
    },
    {
      "type": "translate",
      "skill": "use",
      "prompt": "Rewrite with a causative (have/get something done): A mechanic is going to repair my car for me. (I'm going to…)",
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
      "explanation": "The causative 'have/get something done' (have my car repaired) shows that someone else does the action for you."
    },
    {
      "type": "find_error",
      "skill": "use",
      "question": "Find the mistake in the use of the linker.",
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
      "correction": "(remove 'of': Despite of -> Despite)",
      "explanation": "'Despite' is followed directly by a noun, with no 'of'. The correct form is 'Despite the difficult conditions' (or 'In spite of the difficult conditions')."
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
      "hint": "A reported question: statement word order (subject + verb), no inversion."
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
            "Public trust in science has declined because of citizen science.",
            "Citizen science has become a respected and valuable approach despite concerns about data reliability.",
            "Professional scientists are being replaced by untrained volunteers.",
            "Online games are the most effective form of scientific research."
          ],
          "correctIndex": 1,
          "explanation": "The text explains the rise, the advantages and the criticisms of citizen science, concluding that it is a valuable, respected approach."
        },
        {
          "q": "According to the passage, citizen science offers all of the following benefits EXCEPT:",
          "options": [
            "a sense of shared ownership of research",
            "greater public understanding of how knowledge is created",
            "the ability to process tasks at a large scale",
            "guaranteed error-free data without any safeguards"
          ],
          "correctIndex": 3,
          "explanation": "The text admits that errors can slip in and that safeguards are needed; it never claims the data are guaranteed error-free."
        },
        {
          "q": "In the third paragraph, what does 'such measures' refer to?",
          "options": [
            "the safeguards like independent checking and statistical filtering",
            "the concerns raised by critics",
            "the different levels of volunteer training",
            "the tasks completed by professional teams"
          ],
          "correctIndex": 0,
          "explanation": "'Such measures' refers to the safeguards mentioned just before: checking by several participants and statistical methods to filter out anomalies."
        },
        {
          "q": "What can be inferred about the author's attitude toward citizen science?",
          "options": [
            "It is uncritically enthusiastic with no reservations.",
            "It is convinced citizen science will soon disappear.",
            "It is broadly positive but acknowledges real limitations.",
            "It is entirely dismissive of its scientific value."
          ],
          "correctIndex": 2,
          "explanation": "The writer highlights benefits but also sets out legitimate criticisms and how they are addressed: a positive but nuanced position."
        },
        {
          "q": "Which sentence best paraphrases 'this sense of shared ownership may prove just as valuable as the data itself'?",
          "options": [
            "Owning data is more profitable than sharing it.",
            "Volunteers should be paid for the data they produce.",
            "The data is worthless without expert supervision.",
            "The feeling of collective involvement could be as important as the scientific results."
          ],
          "correctIndex": 3,
          "explanation": "The sentence means that the feeling of collective participation can be as important as the scientific data themselves."
        }
      ]
    },
    {
      "type": "listening",
      "skill": "listening",
      "text": "Right, before we wrap up the meeting, I just want to flag the budget. I'm not saying we should cancel the marketing campaign, but if sales don't pick up next month, we'll have no choice but to scale it back significantly. Let's revisit this in two weeks.", "audio": "assets/audio/app/b2_ab13679418.mp3",
      "question": "What is the speaker's main point?",
      "options": [
        "The marketing campaign will definitely be cancelled.",
        "The campaign may have to be reduced if sales do not improve.",
        "Sales have already increased this month."
      ],
      "correctIndex": 1,
      "explanation": "The speaker warns that if sales don't improve they will have to reduce the campaign; they don't say it will definitely be cancelled."
    },
    {
      "type": "listening",
      "skill": "listening",
      "text": "So, Professor, are you confident this new battery technology will reach the market soon? Well, the laboratory results are certainly promising. But I'd be cautious about making predictions. We've seen plenty of breakthroughs that never made it out of the lab.", "audio": "assets/audio/app/b2_b0f60934cb.mp3",
      "question": "What is the professor's attitude toward the new technology?",
      "options": [
        "Convinced the technology will fail.",
        "Completely certain it will succeed commercially.",
        "Cautiously optimistic but reluctant to make firm predictions."
      ],
      "correctIndex": 2,
      "explanation": "The professor says the results are 'promising' but is 'cautious' about making predictions, which reflects careful optimism."
    }
  ] },
  "C1": { "pass": 75, "exercises": [
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "Seldom ___ such a thorough refutation of a long-accepted hypothesis.",
      "options": [
        "we encountered",
        "we have encountered",
        "have we encountered",
        "did encountered we"
      ],
      "correctIndex": 2,
      "explanation": "When a sentence starts with a negative adverb like 'Seldom', we use inversion: auxiliary + subject ('have we encountered')."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "___ most about her argument is the rigour of its underlying methodology.",
      "options": [
        "It impresses me",
        "Which impresses me",
        "That impresses me",
        "What impresses me"
      ],
      "correctIndex": 3,
      "explanation": "It's a cleft sentence with 'What': 'What impresses me most is...'. 'What' introduces the noun clause that acts as subject."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "The committee recommended that the proposal ___ submitted before the deadline, regardless of its current state.",
      "answers": [
        "be"
      ],
      "hint": "Formal subjunctive after 'recommend that'.",
      "explanation": "After verbs like 'recommend that' we use the subjunctive: the base form 'be', the same for all subjects."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "Had the authorities acted sooner, the outbreak ___ not have spread so widely across the region.",
      "answers": [
        "would"
      ],
      "hint": "An inverted third conditional: 'Had + subject...'.",
      "explanation": "'Had the authorities acted' is the inversion of 'If the authorities had acted'. The main clause of the unreal conditional uses 'would not have spread'."
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
      "explanation": "It's a mixed conditional: a past condition ('had studied') with a present result ('by now'), so we use 'would be'."
    },
    {
      "type": "find_error",
      "skill": "grammar",
      "question": "Find the mistake in this formal sentence.",
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
      "explanation": "After 'It is imperative that' we use the subjunctive: the base form 'submit', not 'submits'."
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
      "hint": "Inversion after an initial 'Not only': the auxiliary 'did' comes before the subject."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "The findings ___ in the latest report contradict several earlier assumptions.",
      "options": [
        "presenting",
        "which presenting",
        "presented",
        "were presented"
      ],
      "correctIndex": 2,
      "explanation": "It's a reduced passive relative clause: 'the findings (that were) presented'. 'that were' is omitted, leaving the participle 'presented'."
    },
    {
      "type": "true_false",
      "skill": "grammar",
      "statement": "The sentence 'Rarely has a single discovery so transformed a discipline' is grammatically correct.",
      "answer": true,
      "explanation": "It's correct: after the negative adverb 'Rarely' at the start, we use the inversion 'has a single discovery'."
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
      "explanation": "'Substantiate' means to support or prove something with evidence, exactly what the reviewers are asking for."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "Auditors were appointed to ___ the firm's accounts after the discrepancies came to light.",
      "options": [
        "glance at",
        "overlook",
        "skim",
        "scrutinize"
      ],
      "correctIndex": 3,
      "explanation": "'Scrutinize' means to examine very carefully, the right formal meaning for auditors checking accounts."
    },
    {
      "type": "fill_blank",
      "skill": "vocab",
      "sentence": "The instructions were so ___ that two readers reached entirely opposite interpretations.",
      "answers": [
        "ambiguous",
        "equivocal"
      ],
      "hint": "An adjective describing something with more than one possible meaning.",
      "explanation": "'Ambiguous' (or the more formal 'equivocal') describes something open to several interpretations, which explains the opposite readings."
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
      "explanation": "'Commence' is the formal synonym of 'begin', the only one suitable for academic register."
    },
    {
      "type": "true_false",
      "skill": "vocab",
      "statement": "In formal English, 'pose a threat' is a correct collocation, as in 'Rising sea levels pose a threat to coastal cities.'",
      "answer": true,
      "explanation": "'Pose a threat' is a correct, formal collocation meaning to be a danger."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "Complete the collocation: 'Given the polls, his re-election seemed a ___ conclusion.'",
      "options": [
        "former",
        "forgotten",
        "foregone",
        "forward"
      ],
      "correctIndex": 2,
      "explanation": "'A foregone conclusion' is a fixed collocation meaning a result that is certain in advance."
    },
    {
      "type": "find_error",
      "skill": "vocab",
      "question": "Find the collocation mistake.",
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
      "explanation": "The correct collocation is 'bear in mind' (remember, take into account), not 'keep in brain', which doesn't exist in English."
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
      "explanation": "Nominalisation turns the verb 'improve' into the noun 'improvement', giving a more formal style: 'The improvement of the system...'."
    },
    {
      "type": "translate",
      "skill": "use",
      "prompt": "Rewrite as a 'What' cleft sentence: We need more evidence.",
      "answers": [
        "what we need is more evidence"
      ],
      "explanation": "The cleft sentence 'What we need is more evidence' emphasises the object, as required in formal register."
    },
    {
      "type": "translate",
      "skill": "use",
      "prompt": "Rewrite with inversion, starting 'Rarely…': We have rarely seen such consistent results.",
      "answers": [
        "rarely have we seen such consistent results",
        "seldom have we seen such consistent results"
      ],
      "explanation": "With 'Rarely/Seldom' at the start we use inversion: 'Rarely have we seen such consistent results'."
    },
    {
      "type": "multiple_choice",
      "skill": "use",
      "question": "Which sentence best shifts the informal statement 'We can't really back this up' into formal academic register?",
      "options": [
        "This is something we can't really show.",
        "There's no way to back this up at all.",
        "We totally can't prove this one.",
        "This claim cannot be adequately substantiated."
      ],
      "correctIndex": 3,
      "explanation": "'This claim cannot be adequately substantiated' uses formal vocabulary and the impersonal passive, typical of academic register."
    },
    {
      "type": "fill_blank",
      "skill": "use",
      "sentence": "From the verb 'analyse', supply the noun: 'A careful ___ of the data revealed a clear trend.'",
      "answers": [
        "analysis"
      ],
      "hint": "The nominalisation of the verb 'analyse'.",
      "explanation": "The noun derived from 'analyse' is 'analysis', needed for nominalisation in formal register."
    },
    {
      "type": "find_error",
      "skill": "use",
      "question": "Find the register slip: one phrase breaks the formal tone.",
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
      "explanation": "'Pretty solid' is colloquial and breaks the formal register; a suitable option would be 'well-founded' or 'sound'. 'Lends credibility' is formal and correct."
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
      "hint": "A formal relative clause with a fronted preposition: 'from which'."
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
            "To provide step-by-step instructions for pre-registering a study",
            "To advocate exclusively for the immediate abolition of academic journals",
            "To present the replication crisis and the competing interpretations it has provoked",
            "To prove that most published psychology research is fraudulent"
          ],
          "correctIndex": 2,
          "explanation": "The text presents the replication crisis and the different interpretations (alarmist and critical), without defending a single position or giving instructions."
        },
        {
          "q": "According to the passage, the academic publishing system contributes to the crisis mainly because it",
          "options": [
            "pays researchers directly for each experiment",
            "favours novel significant results over replications and null findings",
            "requires all data to be shared before publication",
            "refuses to publish any new research at all"
          ],
          "correctIndex": 1,
          "explanation": "The second paragraph says the system rewards new, significant results and shows little interest in replications or null results."
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
          "explanation": "The third paragraph explains that these critics see replication failures as legitimate variation, not proof of error."
        },
        {
          "q": "In the final paragraph, the phrase 'gained considerable traction' most nearly means that pre-registration has",
          "options": [
            "been firmly rejected by researchers",
            "lost all of its earlier support",
            "remained entirely theoretical",
            "become increasingly adopted"
          ],
          "correctIndex": 3,
          "explanation": "'Gain traction' means to gain acceptance or momentum; here it shows that pre-registration has been increasingly adopted."
        },
        {
          "q": "The closing sentence implies that the author's overall stance is",
          "options": [
            "convinced that the sciences are beyond repair",
            "certain that the reforms have already failed",
            "cautiously optimistic about science's capacity for self-correction",
            "indifferent to the outcome of the reforms"
          ],
          "correctIndex": 2,
          "explanation": "The final sentence suggests a 'resilience' underestimated by pessimists, which reveals the writer's cautious optimism."
        }
      ]
    },
    {
      "type": "listening",
      "skill": "listening",
      "text": "In today's seminar I want to challenge a common assumption: that economic growth and environmental sustainability are necessarily at odds. The evidence is, at best, mixed. While some decoupling of emissions from output has occurred in advanced economies, the data suggest it is far too slow to meet our climate targets. So I would urge you to treat claims of effortless 'green growth' with a healthy measure of skepticism.", "audio": "assets/audio/app/c1_12ef2f11dd.mp3",
      "question": "What is the speaker's main point?",
      "options": [
        "Economic growth and sustainability are completely incompatible.",
        "Claims that growth can easily be made green deserve scepticism, as decoupling is too slow.",
        "Advanced economies have already solved the problem of emissions."
      ],
      "correctIndex": 1,
      "explanation": "The speaker argues that, although some decoupling exists, it is too slow, so they call for scepticism about effortless 'green growth'."
    },
    {
      "type": "listening",
      "skill": "listening",
      "text": "Now, the second study we'll examine had a much larger sample, and on the surface its conclusions look compelling. But I have reservations. Notice that the authors never specify how participants were recruited, and that omission, frankly, undermines my confidence in the generalisability of their findings. A larger sample does not, in itself, guarantee a representative one.", "audio": "assets/audio/app/c1_7e029c1e08.mp3",
      "question": "What is the speaker's attitude toward the second study?",
      "options": [
        "Sceptical, because the recruitment method is unspecified despite the large sample.",
        "Fully convinced by its conclusions because of the large sample.",
        "Completely dismissive, considering the study fraudulent."
      ],
      "correctIndex": 0,
      "explanation": "The speaker has reservations: the lack of information about recruitment undermines their confidence, even though the sample is large. They don't reject it as fraud."
    }
  ] },
  "C2": { "pass": 78, "exercises": [
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "___ a more persuasive case for institutional reform been articulated in recent memory.",
      "options": [
        "Hardly never has",
        "Not never has",
        "Never have",
        "Never has"
      ],
      "correctIndex": 3,
      "explanation": "With emphatic inversion and a singular subject ('a more persuasive case'), the auxiliary is singular: 'Never has... been articulated'. A fronted negative requires subject–auxiliary inversion."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "So ___ was the testimony that the jury reached its verdict within the hour.",
      "options": [
        "compellingly",
        "compelled",
        "compelling",
        "the compelling"
      ],
      "correctIndex": 2,
      "explanation": "The emphatic structure 'So + adjective + was/were + subject + that...' needs the adjective 'compelling' after 'So', with the linking verb inverted."
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
      "explanation": "After verbs of proposal ('move that') English uses the subjunctive: the base form 'be', with no agreement or tense: 'that the clause be struck'."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "Neither the data nor the underlying methodology ___ able to withstand peer scrutiny.",
      "options": [
        "was",
        "have been",
        "were",
        "are"
      ],
      "correctIndex": 0,
      "explanation": "With 'neither... nor...' the verb agrees with the nearest element. Here 'the underlying methodology' is singular, so 'was' is correct."
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
      "hint": "A negative adverb at the start requires subject–auxiliary inversion.",
      "explanation": "After an initial 'Rarely' the sentence inverts the auxiliary and subject, e.g. 'have we encountered / do we encounter'. The normal order 'we have encountered' is not accepted."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "It is imperative that every delegate ___ present when the resolution is tabled.",
      "answers": [
        "be"
      ],
      "hint": "Subjunctive after 'It is imperative that...'.",
      "explanation": "Adjectives of necessity ('imperative', 'essential') followed by 'that' take the subjunctive: the base form 'be', with no '-s' even with a singular subject ('every delegate be')."
    },
    {
      "type": "find_error",
      "skill": "grammar",
      "question": "Find the mistake in the use of emphatic inversion.",
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
      "explanation": "After an initial 'Not only' there must be inversion with an auxiliary: 'Not only did the minister deny...'. Keeping the normal order 'the minister denied' is wrong."
    },
    {
      "type": "find_error",
      "skill": "grammar",
      "question": "Find the agreement mistake with a complex subject.",
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
      "explanation": "The head of the subject is 'The proliferation' (singular); 'of conflicting reports' is a modifier that doesn't change agreement. The verb must be 'has done', not 'have done'."
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
      "hint": "Emphatic structure: So + adjective + inverted verb + subject + that...",
      "explanation": "Emphatic inversion with 'So + adjective' fronts the adjective and moves the linking verb before the subject: 'So entrenched were the prejudices that...'."
    },
    {
      "type": "true_false",
      "skill": "grammar",
      "statement": "In 'Under no circumstances should the files be released', the inversion of subject and auxiliary is grammatically required.",
      "answer": true,
      "explanation": "True. When a negative or restrictive expression ('Under no circumstances') comes first, subject–auxiliary inversion is required: 'should the files be released'."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "The new subsidy was intended to ameliorate rural poverty, but it inadvertently ___ existing inequalities.",
      "options": [
        "corroborated",
        "discerned",
        "inhibited",
        "exacerbated"
      ],
      "correctIndex": 3,
      "explanation": "'Ameliorate' (improve) contrasts with 'exacerbate' (make worse), which is what happened unintentionally. 'Corroborate' = confirm, 'discern' = perceive, 'inhibit' = hold back; they don't fit."
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
      "explanation": "'Corroborate' means to support or confirm with evidence, exactly what independent results would do. 'Precipitate' = trigger, 'posit' = propose, 'inhibit' = hold back."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "Her argument rested on a false ___ between liberty and security, as though one necessarily excluded the other.",
      "options": [
        "nexus",
        "dichotomy",
        "paradigm",
        "catalyst"
      ],
      "correctIndex": 1,
      "explanation": "A 'dichotomy' is a division into two categories presented as opposite and mutually exclusive, exactly what the sentence describes. 'Catalyst', 'nexus' and 'paradigm' don't express that binary opposition."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "The evidence remains largely ___; we should therefore treat any firm conclusion with caution.",
      "options": [
        "speculative",
        "intractable",
        "ubiquitous",
        "plausible"
      ],
      "correctIndex": 0,
      "explanation": "'Speculative' (based on guesswork) justifies caution about firm conclusions. 'Ubiquitous' = everywhere, 'intractable' = unsolvable, 'plausible' = believable; they don't fit the call for caution."
    },
    {
      "type": "true_false",
      "skill": "vocab",
      "statement": "To say that a problem is 'intractable' implies that it can be resolved quickly and with little effort.",
      "answer": false,
      "explanation": "False. 'Intractable' describes a problem that is hard to manage or solve, persistent and resistant to solutions; the opposite of something quick and easy to fix."
    },
    {
      "type": "fill_blank",
      "skill": "vocab",
      "sentence": "The assassination served as the ___ that precipitated a war already long in the making.",
      "answers": [
        "catalyst"
      ],
      "hint": "Abstract: the agent that triggers or speeds up a process.",
      "explanation": "A 'catalyst' is the element that triggers or speeds up a process, which fits 'precipitated a war'. The metaphorical use comes from chemistry."
    },
    {
      "type": "translate",
      "skill": "vocab",
      "prompt": "Rewrite in academic register with 'tentative' and 'at best': Her conclusions are, if we are generous, only provisional.",
      "answers": [
        "her conclusions are tentative at best",
        "his conclusions are tentative at best",
        "their conclusions are tentative at best",
        "her findings are tentative at best",
        "his findings are tentative at best",
        "their findings are tentative at best"
      ],
      "explanation": "The hedging word 'tentative' (provisional, not conclusive) and the phrase 'at best' (even in the most favourable view) create academic register."
    },
    {
      "type": "multiple_choice",
      "skill": "use",
      "question": "Which sentence uses the cohesion device most precisely? 'The funding was approved; ___, implementation was repeatedly delayed by bureaucratic inertia.'",
      "options": [
        "moreover",
        "therefore",
        "likewise",
        "nevertheless"
      ],
      "correctIndex": 3,
      "explanation": "We need a linker of contrast: although the funding was approved, there were delays. 'Nevertheless' expresses this. 'Therefore', 'moreover' and 'likewise' don't signal contrast."
    },
    {
      "type": "multiple_choice",
      "skill": "use",
      "question": "Select the most register-appropriate rewrite for an academic abstract: 'We didn't find any link between the two things.'",
      "options": [
        "There wasn't anything linking the two things up.",
        "No way was there a link between them.",
        "We found no discernible correlation between the two variables.",
        "We couldn't really find a connection between the stuff."
      ],
      "correctIndex": 2,
      "explanation": "Academic register requires lexical precision and formality: 'no discernible correlation between the two variables'. The other options are colloquial or imprecise ('stuff', 'No way', 'linking up')."
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
      "explanation": "The passive 'was dismantled' puts the focus on the result (the safeguards) and backgrounds the agent, the intended stylistic effect. The active versions highlight the agent ('someone', 'they', 'people')."
    },
    {
      "type": "fill_blank",
      "skill": "use",
      "sentence": "The two regions pursued opposite strategies: the north invested heavily in industry; ___, the south staked everything on tourism.",
      "answers": [
        "by contrast",
        "conversely"
      ],
      "hint": "A linker that introduces a direct contrast between two parallel cases.",
      "explanation": "To contrast two parallel cases we use 'by contrast' or 'conversely'. Both mark a direct opposition between the two regions."
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
      "hint": "A formal preposition equivalent to 'despite'.",
      "explanation": "'Notwithstanding' is a formal preposition meaning 'despite', equivalent to 'despite' or 'in spite of'. All three fit the concessive idea of the sentence."
    },
    {
      "type": "translate",
      "skill": "use",
      "prompt": "Rewrite formally with 'Notwithstanding', 'Despite' or 'In spite of': The board had the evidence, but it refused to reconsider its position.",
      "answers": [
        "notwithstanding the evidence, the board refused to reconsider its position",
        "despite the evidence, the board refused to reconsider its position",
        "in spite of the evidence, the board refused to reconsider its position",
        "notwithstanding the evidence, the council refused to reconsider its position",
        "despite the evidence, the council refused to reconsider its position",
        "in spite of the evidence, the council refused to reconsider its position"
      ],
      "explanation": "Formal register accepts 'Notwithstanding / Despite / In spite of the evidence' followed by 'the board refused to reconsider its position'."
    },
    {
      "type": "find_error",
      "skill": "use",
      "question": "Find the logical coherence mistake in the use of the linker.",
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
      "explanation": "'Consequently' implies a coherent cause–effect link, but here the result contradicts the belief: a linker of contrast like 'nevertheless' is needed. The causal linker is the mistake."
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
            "Better-designed metrics would eliminate the problems associated with measurement.",
            "Measurement is a useful tool whose authority has been over-extended beyond what it can legitimately assess.",
            "Objective numbers are the only defensible basis for sound governance.",
            "Measurement should be abandoned because it always distorts the goals it tracks."
          ],
          "correctIndex": 1,
          "explanation": "The central thesis is nuanced: measurement is useful but has been given authority beyond its competence (last paragraph). The writer doesn't argue for abolishing it (rejecting that as 'dogmatism') or for more metrics."
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
          "explanation": "It's a concession ('There is something to this') followed by a rebuttal: the writer partly agrees but argues the failure is philosophical, not technical, leaving the deeper assumption untouched."
        },
        {
          "q": "What does the author imply with the rhetorical question 'Who, after all, would argue against evidence?'",
          "options": [
            "That opposing evidence is genuinely indefensible.",
            "That readers should accept metrics without further question.",
            "That evidence and measurement are entirely unrelated concepts.",
            "That the appeal of measurement is rhetorically disarming, which is precisely why it warrants suspicion."
          ],
          "correctIndex": 3,
          "explanation": "The rhetorical question is ironic: the writer uses it to show that the appeal of measurement is disarming, and immediately warns that 'that very persuasiveness should give us pause'. It is not literal acceptance."
        },
        {
          "q": "The hospital example is used primarily to illustrate which idea?",
          "options": [
            "That hospitals are inefficient institutions.",
            "That a metric designed to capture quality can come to displace the quality it was meant to measure.",
            "That discharging patients quickly is always harmful.",
            "That clinicians routinely act in bad faith."
          ],
          "correctIndex": 1,
          "explanation": "The example shows the indicator replacing the goal: the metric designed to measure quality ends up displacing it ('the indicator becomes the objective, and the objective quietly evaporates'). It doesn't generalise about bad faith or inefficiency."
        },
        {
          "q": "What is the author's overall purpose in the essay?",
          "options": [
            "To advocate a discerning middle position that values judgement alongside, and as a check on, measurement.",
            "To provide a neutral, purely descriptive survey of measurement practices.",
            "To persuade readers to reject all forms of quantification in public life.",
            "To promote the adoption of more sophisticated statistical techniques."
          ],
          "correctIndex": 0,
          "explanation": "The purpose is to defend a thoughtful middle position: count what is worth counting, but keep the judgement to notice when 'the counting has begun to lie'. It is neither total rejection nor a neutral description."
        }
      ]
    },
    {
      "type": "listening",
      "skill": "listening",
      "text": "I won't deny that markets allocate resources with remarkable efficiency. My quarrel is with the unspoken leap from that observation to the claim that whatever a market produces is therefore just. Efficiency and justice are simply different questions, and conflating them is precisely how we end up defending outcomes that no one would choose on reflection.", "audio": "assets/audio/app/c2_8998edd02e.mp3",
      "question": "What unstated assumption is the speaker primarily challenging?",
      "options": [
        "That markets are inefficient at allocating resources.",
        "That market efficiency does not, by itself, establish that market outcomes are just.",
        "That justice is a more important goal than efficiency in all cases."
      ],
      "correctIndex": 1,
      "explanation": "The speaker concedes market efficiency and attacks the implicit jump from 'efficient' to 'just'. They question the assumption that efficiency is enough to justify outcomes morally; they don't deny efficiency or rank the two values in general."
    },
    {
      "type": "listening",
      "skill": "listening",
      "text": "Proponents of the carbon tax frame it as a neutral, technocratic fix, as if pricing emissions were merely an accounting adjustment. But every choice of price embeds a judgement about whose welfare counts and over what horizon. To present such a tax as apolitical is not to transcend politics; it is to smuggle one's politics in unexamined.", "audio": "assets/audio/app/c2_034eb18481.mp3",
      "question": "What is the speaker's main point about the carbon tax?",
      "options": [
        "That presenting the tax as a neutral technical measure conceals the value judgements it necessarily contains.",
        "That a carbon tax is too costly to implement effectively.",
        "That carbon taxes are the most apolitical solution available to policymakers."
      ],
      "correctIndex": 0,
      "explanation": "The speaker argues that presenting the tax as neutral and technocratic hides unavoidable value judgements ('whose welfare counts and over what horizon'). They call that apparent neutrality a way of smuggling in politics; they don't discuss cost or accept that it is apolitical."
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
          "goed",
          "gone",
          "go",
          "went"
        ],
        "correctIndex": 3,
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
          "on",
          "at",
          "to",
          "in"
        ],
        "correctIndex": 3,
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
          "some",
          "many",
          "much",
          "a lot"
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
          "was building",
          "has been built",
          "builds"
        ],
        "correctIndex": 2,
        "explanation": "Present perfect passive ('has been built') because 'since' links to the present and a current result."
      },
      {
        "type": "multiple_choice",
        "skill": "grammar",
        "question": "If our streaming service ___ its prices again, a lot of subscribers will cancel.",
        "options": [
          "raises",
          "raised",
          "would raise",
          "will raise"
        ],
        "correctIndex": 0,
        "explanation": "First conditional: 'if' + present simple ('raises'), and the result with 'will'."
      },
      {
        "type": "fill_blank",
        "skill": "grammar",
        "sentence": "The engineer ___ designed this app studied robotics at university.",
        "answers": [
          "who",
          "that"
        ],
        "hint": "A relative pronoun for a person.",
        "explanation": "For people we use 'who' (or 'that'): 'The engineer who/that designed...'."
      },
      {
        "type": "fill_blank",
        "skill": "grammar",
        "sentence": "I have worked for this marketing agency ___ 2019, so I know the clients well.",
        "answers": [
          "since"
        ],
        "hint": "A starting point in time (a year).",
        "explanation": "With a specific starting point we use 'since' (since 2019)."
      },
      {
        "type": "true_false",
        "skill": "vocab",
        "statement": "If you 'set up' a company, you start or establish it.",
        "answer": true,
        "explanation": "'Set up' means to create or establish something, like a company."
      },
      {
        "type": "true_false",
        "skill": "vocab",
        "statement": "To 'look after' a pet means to ignore it completely.",
        "answer": false,
        "explanation": "'Look after' means to take care of something or someone, not to ignore it."
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
        "hint": "Past passive: subject + was + past participle + by + agent."
      },
      {
        "type": "translate",
        "skill": "use",
        "prompt": "Make a second conditional: I don't have much free time, so I don't learn to code. (If I had more time…)",
        "answers": [
          "if i had more time i would learn to code",
          "if i had more time, i would learn to code",
          "if i had more time i would learn how to code",
          "if i had more time, i would learn how to code",
          "if i had more time i would learn to program",
          "if i had more time, i would learn to program"
        ],
        "explanation": "Second conditional: 'if' + past simple ('had'), result with 'would'."
      },
      {
        "type": "find_error",
        "skill": "grammar",
        "question": "Find the mistake.",
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
        "correction": "should turn off (no 'to')",
        "explanation": "After a modal like 'should' we use the infinitive without 'to': 'should turn off'."
      },
      {
        "type": "multiple_choice",
        "skill": "grammar",
        "question": "Lucy isn't answering her phone, so she ___ be in the meeting right now.",
        "options": [
          "must",
          "can't",
          "should",
          "would"
        ],
        "correctIndex": 0,
        "explanation": "A logical deduction with strong certainty: 'must' (she is very probably in the meeting)."
      },
      {
        "type": "find_error",
        "skill": "grammar",
        "question": "Find the mistake.",
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
        "explanation": "After 'avoid' we use the -ing form: 'avoid using'."
      }
    ],
    "B2": [
      {
        "type": "multiple_choice",
        "skill": "grammar",
        "question": "By the time the auditors arrived, the firm ___ all the incriminating files.",
        "options": [
          "was already shredding",
          "already shredded",
          "had already shredded",
          "has already shredded"
        ],
        "correctIndex": 2,
        "explanation": "The past perfect (had + past participle) describes an action finished before another past moment ('arrived')."
      },
      {
        "type": "multiple_choice",
        "skill": "grammar",
        "question": "___ had the conductor raised his baton than a phone began to ring in the audience.",
        "options": [
          "Scarcely than",
          "No sooner",
          "As soon",
          "Hardly when"
        ],
        "correctIndex": 1,
        "explanation": "The inversion 'No sooner... than' shows that one action happened immediately after another."
      },
      {
        "type": "fill_blank",
        "skill": "grammar",
        "sentence": "The committee insisted that the new policy ___ implemented without further delay.",
        "answers": [
          "be"
        ],
        "hint": "Subjunctive after 'insist that'.",
        "explanation": "After verbs like 'insist/suggest/demand that', we use the subjunctive: the base form 'be', whatever the subject."
      },
      {
        "type": "fill_blank",
        "skill": "grammar",
        "sentence": "We're not having the painters paint the office ourselves; we're going to have it ___ professionally next month.",
        "answers": [
          "painted",
          "done"
        ],
        "hint": "Causative: have + object + past participle.",
        "explanation": "The causative 'have something done' uses the past participle to show that someone else does the action."
      },
      {
        "type": "true_false",
        "skill": "vocab",
        "statement": "If you are 'ambivalent' about a proposal, it means you firmly support it.",
        "answer": false,
        "explanation": "'Ambivalent' means having mixed feelings or being undecided, not firmly supporting something."
      },
      {
        "type": "true_false",
        "skill": "vocab",
        "statement": "In a formal register, 'commence' is a suitable synonym for 'begin'.",
        "answer": true,
        "explanation": "'Commence' is a formal synonym of 'begin'."
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
        "hint": "Third conditional with inversion (no 'if')."
      },
      {
        "type": "translate",
        "skill": "use",
        "prompt": "Rewrite this request formally, starting 'We would appreciate it if…' or 'We would be grateful if…': Send us the documents we asked for.",
        "answers": [
          "we would appreciate it if you could provide the requested documents",
          "we would appreciate it if you could provide us with the requested documents",
          "we would be grateful if you could provide the requested documents",
          "we would be grateful if you could provide us with the requested documents"
        ],
        "explanation": "We use a polite conditional ('we would appreciate/be grateful if you could') and formal vocabulary ('provide', 'requested documents')."
      },
      {
        "type": "find_error",
        "skill": "grammar",
        "question": "Find the mistake.",
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
        "correction": "Despite (no 'of')",
        "explanation": "'Despite' is followed directly by a noun, with no 'of'. 'In spite of' does take 'of', but 'despite of' is wrong."
      },
      {
        "type": "find_error",
        "skill": "grammar",
        "question": "Find the mistake.",
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
        "explanation": "With a period of time ('three years') we use 'for'; 'since' is used with a specific starting point."
      },
      {
        "type": "multiple_choice",
        "skill": "use",
        "question": "Choose the best formal-register rewrite: 'The researchers got a lot of useful data from the survey.'",
        "options": [
          "The researchers grabbed loads of useful data from the survey.",
          "The researchers picked up tons of useful data from the survey.",
          "The researchers obtained numerous useful data from the survey.",
          "The researchers obtained a substantial amount of useful data from the survey."
        ],
        "correctIndex": 3,
        "explanation": "'Obtained' and 'a substantial amount of' are formal and correct; 'numerous' doesn't agree with the uncountable 'data', and the other options are informal."
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
        "explanation": "After an initial negative adverb (Seldom) we need inversion: auxiliary + subject. The correct form is 'has the board approved'."
      },
      {
        "type": "multiple_choice",
        "skill": "use",
        "question": "Which sentence is a correctly formed cleft that emphasises the cause?",
        "options": [
          "It was undermined the report by relying on outdated data.",
          "The thing undermines the report that outdated data.",
          "What was undermined the report its outdated data.",
          "What undermined the report was its reliance on outdated data."
        ],
        "correctIndex": 3,
        "explanation": "A cleft sentence with 'What' follows the pattern 'What + clause + was/is + complement': 'What undermined the report was its reliance on outdated data.'"
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
        "hint": "A perfect conditional in the main clause after the inversion with 'Had'.",
        "explanation": "With the inverted third conditional (Had + subject + past participle), the main clause takes a modal + 'have' + past participle: would/could/might have been avoided."
      },
      {
        "type": "fill_blank",
        "skill": "use",
        "sentence": "The dean insisted that every applicant ___ submit a coherent statement of purpose.",
        "answers": [
          "submit"
        ],
        "hint": "Formal subjunctive after 'insist that'.",
        "explanation": "After verbs of command or insistence (insist that), formal English uses the subjunctive: the base form 'submit' with no -s, for any subject."
      },
      {
        "type": "multiple_choice",
        "skill": "vocab",
        "question": "The peer reviewers asked the authors to ___ their central claim with additional empirical evidence.",
        "options": [
          "alleviate",
          "fluctuate",
          "substantiate",
          "speculate"
        ],
        "correctIndex": 2,
        "explanation": "'Substantiate' means to support or prove a claim with evidence, exactly what the reviewers are asking for."
      },
      {
        "type": "true_false",
        "skill": "vocab",
        "statement": "In academic English, 'an ambiguous finding' is one that can be interpreted in more than one way.",
        "answer": true,
        "explanation": "'Ambiguous' describes something that allows more than one interpretation, so the statement is true."
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
        "hint": "A reduced relative clause ('which was collected' -> 'collected'); remember that 'data' often takes a plural verb in academic register."
      },
      {
        "type": "find_error",
        "skill": "grammar",
        "question": "Find the register/grammar mistake in this formal academic sentence.",
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
        "correction": "was the methodology flawed (inversion after 'Not only')",
        "explanation": "After an initial 'Not only', subject–auxiliary inversion is required: 'Not only was the methodology flawed'."
      },
      {
        "type": "translate",
        "skill": "use",
        "prompt": "Rewrite as a formal 'What' cleft sentence: The rigour of her methodology impresses me most.",
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
        "explanation": "A cleft sentence with 'What': 'What impresses me most is the rigour of his/her methodology.' Both British (rigour) and American (rigor) spellings are accepted."
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
              "An emerging field argues that the acoustic character of cities, not just their loudness, shapes urban experience and demands new methods.",
              "Noise above sixty-five decibels should be banned in residential areas.",
              "Visual planning has always been more important than auditory planning.",
              "Cities have become measurably noisier over the past century."
            ],
            "correctIndex": 0,
            "explanation": "The text presents soundscape ecology and its thesis that acoustic character (not just volume) shapes urban experience and requires new methods."
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
            "explanation": "Paragraph two explains that two streets with identical decibel levels can be experienced in opposite ways; traditional mapping misses that qualitative difference."
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
            "explanation": "In the third paragraph supporters concede subjectivity but reply that the quantitative standard also hides value judgements behind an appearance of objectivity."
          },
          {
            "q": "In the final paragraph, the phrase 'composing cities as much as constructing them' is used to suggest that planners may need to",
            "options": [
              "treat the design of urban sound with the deliberate, artistic care of a composer.",
              "rely solely on musicians for city planning.",
              "abandon physical construction altogether.",
              "build cities more cheaply than before."
            ],
            "correctIndex": 0,
            "explanation": "'Composing' (as in music) rather than 'constructing' suggests that designing urban sound will require deliberate, artistic care, not just physical construction."
          },
          {
            "q": "What is the author's overall tone toward soundscape ecology?",
            "options": [
              "Openly hostile to any new methodology.",
              "Indifferent and detached from the debate.",
              "Dismissive and mocking.",
              "Cautiously favourable, presenting its arguments seriously while acknowledging the critics."
            ],
            "correctIndex": 3,
            "explanation": "The writer presents the field's arguments seriously and acknowledges the critics without ridiculing them; the tone is cautiously favourable."
          }
        ]
      },
      {
        "type": "listening",
        "skill": "listening",
        "text": "In today's seminar I want to challenge a comfortable assumption, namely that bilingual children inevitably lag behind their monolingual peers in early vocabulary. The raw counts do show a smaller word list in each single language. But when researchers tally the child's total vocabulary across both languages, the so-called deficit largely disappears. So I'd urge you to be sceptical of any study that measures only one language and then declares a delay.", "audio": "assets/audio/app/c1_aa5f66fdcf.mp3",
        "question": "What is the speaker's main point about bilingual children's vocabulary?",
        "options": [
          "Vocabulary size is irrelevant to a child's development.",
          "The apparent vocabulary gap mostly vanishes once both languages are counted together, so single-language studies can be misleading.",
          "Monolingual children should be taught a second language as early as possible.",
          "Bilingual children are permanently behind monolingual children in every language."
        ],
        "correctIndex": 1,
        "explanation": "The speaker argues that the supposed delay disappears when you add the vocabulary of both languages, so single-language studies can be misleading."
      }
    ],
    "C2": [
      {
        "type": "multiple_choice",
        "skill": "grammar",
        "question": "___ the committee anticipated such a vehement backlash, the policy would surely have been redrafted before its premature unveiling.",
        "options": [
          "Should",
          "Were",
          "If",
          "Had"
        ],
        "correctIndex": 3,
        "explanation": "It's a third conditional with inversion: 'Had the committee anticipated...' = 'If the committee had anticipated...'. The other options don't fit the past participle 'anticipated' or the hypothetical past result."
      },
      {
        "type": "multiple_choice",
        "skill": "vocab",
        "question": "Far from ameliorating the crisis, the emergency subsidies merely ___ the underlying fiscal imbalances they were meant to redress.",
        "options": [
          "corroborated",
          "posited",
          "exacerbated",
          "discerned"
        ],
        "correctIndex": 2,
        "explanation": "'Exacerbate' means to make worse, the opposite of 'ameliorate' (improve), consistent with 'Far from...'. 'Corroborate' = confirm, 'discern' = perceive and 'posit' = propose; none fits."
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
        "hint": "Emphatic inversion: 'So + adjective + was...'. You need an adjective describing irresistible rhetoric.",
        "explanation": "The structure 'So compelling was X that...' fronts the adjective for emphasis. Adjectives like 'compelling', 'persuasive' or 'eloquent' complete the idea of a speech that convinces even the critics."
      },
      {
        "type": "find_error",
        "skill": "grammar",
        "question": "Find the agreement mistake with a complex subject.",
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
        "correction": "were (neither...nor: the verb agrees with 'aides', plural)",
        "explanation": "With 'neither...nor', the verb agrees with the nearest subject; here 'aides' is plural, so 'were' is needed. 'Concede' and 'had been' are correct."
      },
      {
        "type": "multiple_choice",
        "skill": "use",
        "question": "Which sentence best expresses tentative, hedged academic register appropriate for a research abstract?",
        "options": [
          "These findings tentatively suggest that the intervention may confer modest benefits, though further corroboration is warranted.",
          "The intervention works and anyone who disagrees is simply wrong.",
          "These findings prove beyond doubt that the intervention works.",
          "Honestly, the intervention totally works, no question about it."
        ],
        "correctIndex": 0,
        "explanation": "C2 academic register favours caution: 'tentatively suggest', 'may confer' and 'further corroboration is warranted' signal provisionality. The other options are categorical or colloquial, unsuitable for an abstract."
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
        "hint": "Emphatic negative inversion: 'Never before had + subject + past participle...'.",
        "explanation": "After an initial negative adverb ('Never before') the auxiliary and subject are inverted: 'had such a paradox confronted the tribunal'. It's the typical C2 emphatic structure."
      },
      {
        "type": "translate",
        "skill": "use",
        "prompt": "Rewrite formally with the subjunctive, starting 'I move that…' or 'I propose that…': Let's postpone the motion until further notice.",
        "answers": [
          "i move that the motion be postponed until further notice",
          "i propose that the motion be postponed until further notice",
          "i move that the motion be deferred until further notice",
          "i propose that the motion be deferred until further notice"
        ],
        "explanation": "After verbs of proposal like 'move' or 'propose', formal English uses the base subjunctive ('be postponed', not 'is postponed'). 'Until further notice' = until you are told otherwise."
      },
      {
        "type": "true_false",
        "skill": "vocab",
        "statement": "If a phenomenon is described as 'ubiquitous', it is found almost everywhere.",
        "answer": true,
        "explanation": "'Ubiquitous' means present everywhere. So the statement is true."
      },
      {
        "type": "multiple_choice",
        "skill": "vocab",
        "question": "The journalist framed the reform as a ___ for systemic change, the single event that set an entire cascade of consequences in motion.",
        "options": [
          "dichotomy",
          "nexus",
          "catalyst",
          "paradigm"
        ],
        "correctIndex": 2,
        "explanation": "A 'catalyst' is what triggers or speeds up a process, exactly what the sentence describes. 'Dichotomy' is a division into two, 'nexus' a connection point and 'paradigm' a model; none fits."
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
            "explanation": "The writer argues that the institutions that criticise public credulity are the ones manufacturing certainty; blaming only the public is a 'convenient evasion'."
          },
          {
            "q": "The phrase 'a performance of concern that conveniently absolves its performers of any complicity' is best described as",
            "options": [
              "an endorsement of relativism",
              "a neutral factual observation",
              "sincere praise for the commentators",
              "ironic criticism of those who lament public credulity"
            ],
            "correctIndex": 3,
            "explanation": "The sentence is ironic and critical: it dismisses the commentators' concern as a mere 'performance' that excuses them from their own responsibility."
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
            "explanation": "It's a concession: the writer qualifies the thesis by admitting that endless indecision is also a flaw, to avoid falling into total relativism."
          },
          {
            "q": "What does the author imply is the real solution to the problem?",
            "options": [
              "Accepting that nothing can be done",
              "Reforming the incentive structures that reward stridency over caution",
              "Punishing the public for its credulity",
              "Simply urging people to be more humble"
            ],
            "correctIndex": 1,
            "explanation": "The writer rejects mere exhortation ('exhortation is cheap') and proposes addressing the incentives that reward stridency, i.e. reforming the structures."
          },
          {
            "q": "The overall tone of the passage can best be characterized as",
            "options": [
              "indignant and exhortatory",
              "celebratory and optimistic",
              "detached and indifferent",
              "measured but pointedly critical"
            ],
            "correctIndex": 3,
            "explanation": "The tone is measured and nuanced (it makes concessions and distinguishes degrees) but also sharply critical of hypocritical commentators."
          }
        ]
      },
      {
        "type": "listening",
        "skill": "listening",
        "text": "In this debate, my opponent insists that economic growth and environmental stewardship are fundamentally irreconcilable. But that framing smuggles in an assumption I simply cannot grant: that our current modes of production are the only conceivable ones. Strip away that premise, and the so-called dilemma dissolves into a mere failure of imagination.", "audio": "assets/audio/app/c2_e3bb3bb293.mp3",
        "question": "What is the speaker primarily doing in this argument?",
        "options": [
          "Proposing a specific new technology to solve the dilemma",
          "Challenging an unstated assumption underlying the opponent's claim",
          "Conceding that growth and the environment cannot coexist"
        ],
        "correctIndex": 1,
        "explanation": "The speaker neither concedes nor proposes a technology; they identify and refute the opponent's implicit assumption ('smuggles in an assumption'): that current modes of production are the only possible ones."
      }
    ]
  };
  Object.keys(EXTRA).forEach(function (lv) {
    if (B[lv] && Array.isArray(B[lv].exercises)) B[lv].exercises = B[lv].exercises.concat(EXTRA[lv]);
  });
})();
