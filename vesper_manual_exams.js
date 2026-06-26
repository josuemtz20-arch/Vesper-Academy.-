/* ============================================================
 * vesper_manual_exams.js — Examen de fin de manual por libro.
 *
 * Un examen por cada libro del alumno (los del portal materiales.html),
 * alineado al temario real del manual (SYLLABI de vesper_engine_data.js) o a
 * su temática. Mismo formato de ejercicios que las lecciones / los boss exams.
 * Lo consume buildManualExam() en leccion.html vía ?id=mexam:BOOKID y registra
 * el resultado en el panel de calificaciones (VESPER_RESULTS, examType "manual").
 *
 * El listening usa el sintetizador de voz (TTS) del navegador: el campo "text"
 * se lee en voz alta; no hace falta archivo de audio. Contenido autorado y
 * verificado adversarialmente; sin claves nuevas.
 * ============================================================ */

window.VESPER_MANUAL_EXAMS = {
  "core_basics_lvl1": { "name": "Core Basics · Level 1", "cefr": "A0", "pass": 70, "exercises": [
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
      "question": "She ___ my teacher.",
      "options": [
        "am",
        "is",
        "are"
      ],
      "correctIndex": 1,
      "explanation": "Con 'she' usamos 'is'."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "They ___ from Spain.",
      "options": [
        "am",
        "is",
        "are"
      ],
      "correctIndex": 2,
      "explanation": "Con 'they' usamos 'are'."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "He ___ a doctor.",
      "answers": [
        "is"
      ],
      "hint": "Tercera persona singular.",
      "explanation": "Con 'he' el verbo to be es 'is'."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "We ___ happy today.",
      "answers": [
        "are"
      ],
      "hint": "Sujeto plural 'we'.",
      "explanation": "Con 'we' usamos 'are'."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "___ this your book?",
      "options": [
        "Am",
        "Is",
        "Are"
      ],
      "correctIndex": 1,
      "explanation": "En preguntas Yes/No con 'this' usamos 'Is' al inicio."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "___ is your name?",
      "options": [
        "What",
        "Where",
        "Who"
      ],
      "correctIndex": 0,
      "explanation": "Para preguntar el nombre usamos 'What is your name?'."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "___ are you from?",
      "options": [
        "What",
        "Where",
        "When"
      ],
      "correctIndex": 1,
      "explanation": "Para preguntar el origen usamos 'Where are you from?'."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "This is ___ apple.",
      "options": [
        "a",
        "an",
        "the"
      ],
      "correctIndex": 1,
      "explanation": "Antes de sonido vocálico ('apple') usamos 'an'."
    },
    {
      "type": "find_error",
      "skill": "grammar",
      "question": "Encuentra el error.",
      "segments": [
        "My sister ",
        {
          "u": "are"
        },
        " ",
        {
          "u": "tall"
        },
        "."
      ],
      "correctIndex": 0,
      "correction": "is (my sister -> is)",
      "explanation": "Con 'my sister' (=she) el verbo to be es 'is', no 'are'."
    },
    {
      "type": "word_order",
      "skill": "grammar",
      "words": [
        "What",
        "is",
        "your",
        "name"
      ],
      "correctOrder": [
        "What",
        "is",
        "your",
        "name"
      ],
      "hint": "Pregunta con palabra interrogativa + to be."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "___ book over there is red. (far)",
      "options": [
        "This",
        "That",
        "Am"
      ],
      "correctIndex": 1,
      "explanation": "'That' se usa para algo que está lejos ('over there')."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "___ are two cats in the house.",
      "answers": [
        "there"
      ],
      "hint": "Estructura para decir que algo existe.",
      "explanation": "Con plural: 'There are two cats'."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "What is the color of the sky on a clear day?",
      "options": [
        "green",
        "blue",
        "brown"
      ],
      "correctIndex": 1,
      "explanation": "El cielo despejado es 'blue' (azul)."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "A person who teaches students is a ___.",
      "options": [
        "doctor",
        "teacher",
        "driver"
      ],
      "correctIndex": 1,
      "explanation": "Quien enseña es un 'teacher' (profesor)."
    },
    {
      "type": "true_false",
      "skill": "vocab",
      "statement": "Your mother's mother is your grandmother.",
      "answer": true,
      "explanation": "La madre de tu madre es tu 'grandmother' (abuela)."
    },
    {
      "type": "true_false",
      "skill": "vocab",
      "statement": "The number after nineteen is twenty.",
      "answer": true,
      "explanation": "Después de 'nineteen' (19) viene 'twenty' (20)."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "The opposite of 'big' is ___.",
      "options": [
        "small",
        "tall",
        "old"
      ],
      "correctIndex": 0,
      "explanation": "El opuesto de 'big' (grande) es 'small' (pequeño)."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "When it is cold and white outside, the weather is ___.",
      "options": [
        "sunny",
        "snowy",
        "hot"
      ],
      "correctIndex": 1,
      "explanation": "Cuando hace frío y cae nieve, está 'snowy' (nevado)."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "A person from Japan is ___.",
      "options": [
        "Japanese",
        "Japan",
        "Japon"
      ],
      "correctIndex": 0,
      "explanation": "La nacionalidad de Japón es 'Japanese'."
    },
    {
      "type": "translate",
      "skill": "use",
      "prompt": "Traduce: \"Soy de México.\"",
      "answers": [
        "i am from mexico",
        "i'm from mexico"
      ],
      "explanation": "I am from Mexico."
    },
    {
      "type": "translate",
      "skill": "use",
      "prompt": "Traduce: \"Ella es mi hermana.\"",
      "answers": [
        "she is my sister",
        "she's my sister"
      ],
      "explanation": "She is my sister."
    },
    {
      "type": "translate",
      "skill": "use",
      "prompt": "Traduce: \"¿Cuál es tu trabajo?\"",
      "answers": [
        "what is your job",
        "what's your job"
      ],
      "explanation": "What is your job?"
    },
    {
      "type": "fill_blank",
      "skill": "use",
      "sentence": "A: How old are you? B: I ___ ten years old.",
      "answers": [
        "am"
      ],
      "hint": "Con 'I' usamos el verbo to be.",
      "explanation": "Con 'I' usamos 'am': I am ten years old."
    },
    {
      "type": "reading",
      "skill": "reading",
      "title": "My Family",
      "passage": "Hello! My name is Ana. I am from Mexico.\nI am a teacher. My brother is a doctor.\nMy mother is happy. My family is big.",
      "questions": [
        {
          "q": "Where is Ana from?",
          "options": [
            "Spain",
            "Mexico",
            "Japan",
            "Italy"
          ],
          "correctIndex": 1,
          "explanation": "El texto dice 'I am from Mexico'."
        },
        {
          "q": "What is Ana's job?",
          "options": [
            "doctor",
            "teacher",
            "driver",
            "student"
          ],
          "correctIndex": 1,
          "explanation": "Ana dice 'I am a teacher'."
        },
        {
          "q": "What is her brother's job?",
          "options": [
            "teacher",
            "doctor",
            "cook",
            "pilot"
          ],
          "correctIndex": 1,
          "explanation": "El texto dice 'My brother is a doctor'."
        },
        {
          "q": "How is her family?",
          "options": [
            "small",
            "sad",
            "big",
            "old"
          ],
          "correctIndex": 2,
          "explanation": "El texto dice 'My family is big'."
        }
      ]
    },
    {
      "type": "listening",
      "skill": "listening",
      "text": "Hi, I am Tom. I am from Canada. I am a student. I am twelve years old.",
      "question": "Where is Tom from?",
      "options": [
        "Canada",
        "Mexico",
        "Spain"
      ],
      "correctIndex": 0,
      "explanation": "Tom dice 'I am from Canada'."
    }
  ] },
  "core_basics_lvl2": { "name": "Core Basics · Level 2", "cefr": "A1", "pass": 70, "exercises": [
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "I ___ to school every day.",
      "options": [
        "go",
        "goes",
        "going"
      ],
      "correctIndex": 0,
      "explanation": "Con 'I' el presente simple usa la forma base: 'go'."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "She ___ breakfast at 7 o'clock.",
      "options": [
        "have",
        "has",
        "haves"
      ],
      "correctIndex": 1,
      "explanation": "Con 'she' (tercera persona) usamos 'has'."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "___ he play football?",
      "options": [
        "Do",
        "Does",
        "Is"
      ],
      "correctIndex": 1,
      "explanation": "Con 'he' (tercera persona) las preguntas usan 'Does'."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "My sister ___ not like fish.",
      "answers": [
        "does"
      ],
      "hint": "Tercera persona: he/she/it.",
      "explanation": "Con 'my sister' (=she) la negación es 'does not' / 'doesn't'."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "Do you like pizza? - Yes, I ___.",
      "options": [
        "do",
        "does",
        "am"
      ],
      "correctIndex": 0,
      "explanation": "La respuesta corta a 'Do you...?' es 'Yes, I do'."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "He ___ always late for class.",
      "answers": [
        "is"
      ],
      "hint": "Adverbio de frecuencia con el verbo 'to be'.",
      "explanation": "Con 'always' y el verbo 'to be', el adverbio va después: 'He is always late'."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "Can you help ___? I need it now.",
      "options": [
        "I",
        "me",
        "my"
      ],
      "correctIndex": 1,
      "explanation": "Después del verbo usamos el pronombre objeto: 'me'."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "I like ___ books in my free time.",
      "options": [
        "read",
        "reading",
        "reads"
      ],
      "correctIndex": 1,
      "explanation": "Después de 'like' para hablar de hobbies usamos verbo + -ing: 'reading'."
    },
    {
      "type": "word_order",
      "skill": "grammar",
      "words": [
        "She",
        "likes",
        "playing",
        "the",
        "guitar"
      ],
      "correctOrder": [
        "She",
        "likes",
        "playing",
        "the",
        "guitar"
      ],
      "hint": "Like + verbo en -ing para hobbies."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "Yesterday I ___ to the park.",
      "options": [
        "go",
        "went",
        "goes"
      ],
      "correctIndex": 1,
      "explanation": "'go' es irregular; su pasado es 'went'."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "Last night we ___ a movie at home.",
      "answers": [
        "watched"
      ],
      "hint": "Verbo regular: watch + -ed.",
      "explanation": "El pasado regular de 'watch' es 'watched'."
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
        " to school yesterday."
      ],
      "correctIndex": 1,
      "correction": "go (didn't + verbo base)",
      "explanation": "Después de 'didn't' se usa el verbo en forma base: 'didn't go'."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "___ you visit your grandmother last week?",
      "options": [
        "Do",
        "Did",
        "Does"
      ],
      "correctIndex": 1,
      "explanation": "Para preguntas en pasado simple usamos el auxiliar 'Did'."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "Tomorrow I ___ call you.",
      "options": [
        "will",
        "did",
        "do"
      ],
      "correctIndex": 0,
      "explanation": "Para el futuro usamos 'will' + verbo base: 'will call'."
    },
    {
      "type": "true_false",
      "skill": "grammar",
      "statement": "'Close the door, please.' is an imperative.",
      "answer": true,
      "explanation": "Empieza con el verbo base para dar una orden o instrucción: es un imperativo."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "In the morning I ___ up and brush my teeth.",
      "options": [
        "wake",
        "sleep",
        "cook"
      ],
      "correctIndex": 0,
      "explanation": "'wake up' (despertarse) es parte de la rutina diaria de la mañana."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "My favorite hobby is ___ music.",
      "options": [
        "listening to",
        "eating",
        "washing"
      ],
      "correctIndex": 0,
      "explanation": "'listening to music' (escuchar música) es un hobby."
    },
    {
      "type": "true_false",
      "skill": "vocab",
      "statement": "'breakfast' is a meal you eat in the morning.",
      "answer": true,
      "explanation": "'breakfast' es el desayuno, la comida de la mañana."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "I ___ my homework every evening.",
      "options": [
        "do",
        "make",
        "play"
      ],
      "correctIndex": 0,
      "explanation": "Se dice 'do homework' (hacer la tarea)."
    },
    {
      "type": "true_false",
      "skill": "vocab",
      "statement": "'always' means 100% of the time.",
      "answer": true,
      "explanation": "'always' (siempre) indica el 100% de la frecuencia."
    },
    {
      "type": "translate",
      "skill": "use",
      "prompt": "Traduce: \"Yo no como carne.\"",
      "answers": [
        "i don't eat meat",
        "i do not eat meat"
      ],
      "explanation": "I don't eat meat. Con 'I' la negación es 'don't' + verbo base."
    },
    {
      "type": "translate",
      "skill": "use",
      "prompt": "Traduce: \"Fui al cine ayer.\"",
      "answers": [
        "i went to the cinema yesterday",
        "i went to the movies yesterday"
      ],
      "explanation": "I went to the cinema yesterday. 'go' en pasado es 'went'."
    },
    {
      "type": "translate",
      "skill": "use",
      "prompt": "Traduce: \"Ella juega tenis los sábados.\"",
      "answers": [
        "she plays tennis on saturdays",
        "she plays tennis on saturday"
      ],
      "explanation": "She plays tennis on Saturdays. Con 'she' añadimos -s al verbo: 'plays'."
    },
    {
      "type": "multiple_choice",
      "skill": "use",
      "question": "It's hot. ___ go to the beach!",
      "options": [
        "Let's",
        "Do",
        "Does"
      ],
      "correctIndex": 0,
      "explanation": "'Let's' + verbo base se usa para sugerencias: 'Let's go'."
    },
    {
      "type": "translate",
      "skill": "use",
      "prompt": "Traduce: \"No puedo nadar.\"",
      "answers": [
        "i can't swim",
        "i cannot swim",
        "i can not swim"
      ],
      "explanation": "I can't swim. La negación de 'can' es 'can't' (cannot)."
    },
    {
      "type": "reading",
      "skill": "reading",
      "title": "Maria's Day",
      "passage": "Maria is a student. She wakes up at seven o'clock every day. She eats breakfast and goes to school by bus.\nIn the afternoon, she does her homework. She likes reading books and playing the piano. On weekends, she does not go to school. She visits her grandmother and they cook together.",
      "questions": [
        {
          "q": "What time does Maria wake up?",
          "options": [
            "At six o'clock",
            "At seven o'clock",
            "At eight o'clock",
            "At nine o'clock"
          ],
          "correctIndex": 1,
          "explanation": "El texto dice 'She wakes up at seven o'clock'."
        },
        {
          "q": "How does Maria go to school?",
          "options": [
            "By car",
            "By bike",
            "By bus",
            "On foot"
          ],
          "correctIndex": 2,
          "explanation": "El texto dice 'goes to school by bus'."
        },
        {
          "q": "What does Maria like doing?",
          "options": [
            "Reading and playing the piano",
            "Swimming",
            "Watching TV",
            "Running"
          ],
          "correctIndex": 0,
          "explanation": "El texto dice 'She likes reading books and playing the piano'."
        },
        {
          "q": "What does Maria do on weekends?",
          "options": [
            "She goes to school",
            "She visits her grandmother",
            "She works",
            "She sleeps all day"
          ],
          "correctIndex": 1,
          "explanation": "El texto dice 'She visits her grandmother' los fines de semana."
        }
      ]
    },
    {
      "type": "listening",
      "skill": "listening",
      "text": "Hi, my name is Tom. I get up at six o'clock every morning. I drink coffee and read the news. Then I go to work by train.",
      "question": "How does Tom go to work?",
      "options": [
        "By car",
        "By train",
        "By bus"
      ],
      "correctIndex": 1,
      "explanation": "Tom dice 'I go to work by train' (en tren)."
    }
  ] },
  "core_basics_lvl3": { "name": "Core Basics · Level 3", "cefr": "A2", "pass": 70, "exercises": [
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "Look! The children ___ in the garden right now.",
      "options": [
        "play",
        "are playing",
        "plays"
      ],
      "correctIndex": 1,
      "explanation": "Con 'right now' usamos presente continuo: are + playing."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "I usually ___ coffee, but today I ___ tea.",
      "options": [
        "am drinking / drink",
        "drink / am drinking",
        "drink / drinks"
      ],
      "correctIndex": 1,
      "explanation": "'usually' indica rutina (presente simple) y 'today' una accion del momento (presente continuo)."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "I have never ___ sushi in my life.",
      "answers": [
        "eaten"
      ],
      "hint": "Present perfect: have + participio.",
      "explanation": "El participio de 'eat' es 'eaten'."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "___ you ever ___ to London?",
      "options": [
        "Did / been",
        "Have / been",
        "Have / go"
      ],
      "correctIndex": 1,
      "explanation": "Para experiencias usamos present perfect: Have you ever been...?"
    },
    {
      "type": "find_error",
      "skill": "grammar",
      "question": "Encuentra el error.",
      "segments": [
        "She ",
        {
          "u": "have"
        },
        " visited ",
        {
          "u": "three"
        },
        " countries."
      ],
      "correctIndex": 0,
      "correction": "has (she -> has)",
      "explanation": "Con 'she' el auxiliar del present perfect es 'has', no 'have'."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "We ___ to the beach last summer.",
      "answers": [
        "went"
      ],
      "hint": "Pasado simple de 'go'.",
      "explanation": "El pasado simple irregular de 'go' es 'went'."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "Next weekend I ___ visit my grandparents.",
      "options": [
        "am going to",
        "go to",
        "went to"
      ],
      "correctIndex": 0,
      "explanation": "Para planes futuros usamos 'be going to' + verbo: am going to visit."
    },
    {
      "type": "word_order",
      "skill": "grammar",
      "words": [
        "They",
        "are",
        "going",
        "to",
        "buy",
        "a",
        "car"
      ],
      "correctOrder": [
        "They",
        "are",
        "going",
        "to",
        "buy",
        "a",
        "car"
      ],
      "hint": "Futuro con 'going to' para planes."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "This book is ___ than that one.",
      "options": [
        "interesting",
        "more interesting",
        "most interesting"
      ],
      "correctIndex": 1,
      "explanation": "Adjetivos largos forman el comparativo con 'more': more interesting than."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "My sister is ___ than me.",
      "answers": [
        "taller"
      ],
      "hint": "Comparativo corto de 'tall'.",
      "explanation": "Adjetivos cortos anaden '-er': tall -> taller."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "Mount Everest is the ___ mountain in the world.",
      "options": [
        "higher",
        "highest",
        "high"
      ],
      "correctIndex": 1,
      "explanation": "Superlativo de adjetivo corto: the highest."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "___ does the supermarket open?",
      "options": [
        "What time",
        "How many",
        "Whose"
      ],
      "correctIndex": 0,
      "explanation": "Para preguntar por la hora usamos 'What time'."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "You look tired. You ___ go to bed early.",
      "options": [
        "should",
        "shouldn't",
        "must not"
      ],
      "correctIndex": 0,
      "explanation": "'should' da un consejo: deberias acostarte temprano."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "In my country you ___ to wear a seatbelt in the car.",
      "answers": [
        "have"
      ],
      "hint": "Obligacion: 'have to'.",
      "explanation": "'have to' expresa obligacion: you have to wear..."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "If you heat ice, it ___.",
      "options": [
        "will melt",
        "melts",
        "melted"
      ],
      "correctIndex": 1,
      "explanation": "Condicional cero (hechos generales): if + presente, presente. 'it melts'."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "If it rains tomorrow, we ___ at home.",
      "options": [
        "stay",
        "will stay",
        "stayed"
      ],
      "correctIndex": 1,
      "explanation": "Primer condicional: if + presente, will + verbo. 'we will stay'."
    },
    {
      "type": "find_error",
      "skill": "grammar",
      "question": "Encuentra el error.",
      "segments": [
        "I ",
        {
          "u": "have",
          "correct": "have"
        },
        " already ",
        {
          "u": "finish"
        },
        " my homework."
      ],
      "correctIndex": 1,
      "correction": "finished (finish -> finished)",
      "explanation": "En present perfect se usa el participio: have finished, no 'have finish'."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "She ___ TV yesterday evening.",
      "options": [
        "watch",
        "watched",
        "is watching"
      ],
      "correctIndex": 1,
      "explanation": "Con 'yesterday' usamos pasado simple: watched."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "Have you finished your work ___?",
      "answers": [
        "yet"
      ],
      "hint": "Adverbio del present perfect en preguntas.",
      "explanation": "En preguntas del present perfect usamos 'yet' al final: ...finished your work yet?"
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "I can't hear the music. Can you turn it ___?",
      "options": [
        "up",
        "off",
        "into"
      ],
      "correctIndex": 0,
      "explanation": "'turn up' significa subir el volumen."
    },
    {
      "type": "true_false",
      "skill": "vocab",
      "statement": "'Give up' means to stop doing something.",
      "answer": true,
      "explanation": "'give up' significa rendirse o dejar de hacer algo."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "I have a bad cough and a sore throat. I think I have a ___.",
      "options": [
        "cold",
        "headache",
        "leg"
      ],
      "correctIndex": 0,
      "explanation": "Tos y dolor de garganta son sintomas de un resfriado ('a cold')."
    },
    {
      "type": "true_false",
      "skill": "vocab",
      "statement": "If something is 'on sale', it costs more than usual.",
      "answer": false,
      "explanation": "'on sale' significa rebajado: cuesta menos de lo normal."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "At the market, you can try to get a lower price. This is called ___.",
      "options": [
        "bargaining",
        "borrowing",
        "spending"
      ],
      "correctIndex": 0,
      "explanation": "'bargaining' (regatear) es intentar conseguir un precio mas bajo."
    },
    {
      "type": "translate",
      "skill": "use",
      "prompt": "Traduce: \"En mi opinion, es la mejor pelicula.\"",
      "answers": [
        "in my opinion, it is the best film",
        "in my opinion it is the best film",
        "in my opinion, it's the best film",
        "in my opinion it's the best film",
        "in my opinion it's the best movie",
        "in my opinion, it's the best movie",
        "in my opinion, it is the best movie",
        "in my opinion it is the best movie"
      ],
      "explanation": "Para opinar: In my opinion, it's the best film/movie."
    },
    {
      "type": "translate",
      "skill": "use",
      "prompt": "Traduce: \"He estado en Italia dos veces.\"",
      "answers": [
        "i have been to italy twice",
        "i've been to italy twice",
        "i have been to italy two times",
        "i've been to italy two times"
      ],
      "explanation": "Para experiencias: I have been to Italy twice."
    },
    {
      "type": "word_order",
      "skill": "use",
      "words": [
        "How",
        "much",
        "is",
        "this",
        "shirt",
        "?"
      ],
      "correctOrder": [
        "How",
        "much",
        "is",
        "this",
        "shirt",
        "?"
      ],
      "hint": "Preguntar el precio en una tienda."
    },
    {
      "type": "translate",
      "skill": "use",
      "prompt": "Traduce: \"Deberias ver a un medico.\"",
      "answers": [
        "you should see a doctor",
        "you should go to the doctor",
        "you should visit a doctor"
      ],
      "explanation": "Consejo con 'should': You should see a doctor."
    },
    {
      "type": "reading",
      "skill": "reading",
      "title": "Lucy's Trip Plans",
      "passage": "Lucy is a 22-year-old student from Spain. She has never travelled outside Europe, so this summer she is going to visit Japan with her best friend, Mia.\nThey are saving money now because the flight is expensive. Lucy thinks Japan is the most interesting country in Asia, and she really wants to try real Japanese food.\nMia is a little nervous because she has never been on such a long flight. Lucy told her, \"If you feel scared, you should sleep on the plane.\" They both believe it will be the best trip of their lives.",
      "questions": [
        {
          "q": "What is the text mainly about?",
          "options": [
            "Lucy's job",
            "Lucy and Mia's plan to visit Japan",
            "A flight that was cancelled",
            "Japanese cooking lessons"
          ],
          "correctIndex": 1,
          "explanation": "El texto trata sobre el plan de Lucy y Mia de viajar a Japon."
        },
        {
          "q": "Why are they saving money now?",
          "options": [
            "Because the food is expensive",
            "Because the flight is expensive",
            "Because the hotel is cheap",
            "Because they lost their money"
          ],
          "correctIndex": 1,
          "explanation": "El texto dice que ahorran porque el vuelo es caro ('the flight is expensive')."
        },
        {
          "q": "Has Lucy travelled outside Europe before?",
          "options": [
            "Yes, many times",
            "No, never",
            "Only to Asia",
            "Only with Mia"
          ],
          "correctIndex": 1,
          "explanation": "El texto dice 'She has never travelled outside Europe'."
        },
        {
          "q": "What advice did Lucy give Mia?",
          "options": [
            "To eat more food",
            "To sleep on the plane if she feels scared",
            "To stay at home",
            "To buy a cheaper ticket"
          ],
          "correctIndex": 1,
          "explanation": "Lucy le aconseja dormir en el avion si tiene miedo ('you should sleep on the plane')."
        }
      ]
    },
    {
      "type": "listening",
      "skill": "listening",
      "text": "Hi, I'm Tom. Last weekend I went shopping with my brother. The shops were very busy, but I found a great jacket on sale. It was cheaper than all the others, so I bought it.",
      "question": "Why did Tom buy the jacket?",
      "options": [
        "Because it was the most expensive one",
        "Because it was on sale and cheaper than the others",
        "Because his brother chose it"
      ],
      "correctIndex": 1,
      "explanation": "Tom dice que la chaqueta estaba rebajada y era mas barata que las demas."
    }
  ] },
  "core_basics_lvl4": { "name": "Core Basics · Level 4", "cefr": "A2+", "pass": 70, "exercises": [
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "Every sentence needs a subject and a verb. Which one is a complete sentence?",
      "options": [
        "Runs fast every morning.",
        "My sister runs every morning.",
        "Every morning in the park."
      ],
      "correctIndex": 1,
      "explanation": "Una oración completa necesita sujeto (My sister) y verbo (runs). Las otras opciones no tienen sujeto u oración completa."
    },
    {
      "type": "multiple_choice",
      "skill": "use",
      "question": "Choose the correctly punctuated sentence.",
      "options": [
        "where do you live?",
        "Where do you live.",
        "Where do you live?"
      ],
      "correctIndex": 2,
      "explanation": "Empieza con mayúscula y termina con signo de interrogación al ser una pregunta."
    },
    {
      "type": "find_error",
      "skill": "use",
      "question": "Encuentra el error de mayúsculas.",
      "segments": [
        "i ",
        {
          "u": "visited"
        },
        " ",
        {
          "u": "london"
        },
        " in July."
      ],
      "correctIndex": 1,
      "correction": "London (nombre propio -> mayúscula)",
      "explanation": "Los nombres propios de ciudades se escriben con mayúscula: 'London'. ('i' también debería ser 'I', pero el error subrayado es 'london'.)"
    },
    {
      "type": "fill_blank",
      "skill": "use",
      "sentence": "I like tea ___ I don't like coffee.",
      "answers": [
        "but"
      ],
      "hint": "Contraste entre dos ideas opuestas.",
      "explanation": "'but' conecta dos ideas que se contrastan (me gusta el té / no me gusta el café)."
    },
    {
      "type": "multiple_choice",
      "skill": "use",
      "question": "It was raining, ___ we stayed at home.",
      "options": [
        "but",
        "so",
        "and"
      ],
      "correctIndex": 1,
      "explanation": "'so' expresa consecuencia: llovía, por eso (resultado) nos quedamos en casa."
    },
    {
      "type": "word_order",
      "skill": "use",
      "words": [
        "First",
        ",",
        "boil",
        "the",
        "water",
        "."
      ],
      "correctOrder": [
        "First",
        ",",
        "boil",
        "the",
        "water",
        "."
      ],
      "hint": "Secuencia: empieza con la palabra de orden y una coma."
    },
    {
      "type": "fill_blank",
      "skill": "use",
      "sentence": "First, mix the flour and sugar. ___, add the eggs.",
      "answers": [
        "then",
        "next",
        "after that"
      ],
      "hint": "Palabra de secuencia que indica el siguiente paso.",
      "explanation": "Para indicar el siguiente paso usamos 'Then', 'Next' o 'After that'."
    },
    {
      "type": "multiple_choice",
      "skill": "use",
      "question": "Which sentence is the best topic sentence to START a paragraph about your weekend?",
      "options": [
        "For example, I watched a film.",
        "Last weekend was very relaxing.",
        "Finally, I went to bed early."
      ],
      "correctIndex": 1,
      "explanation": "La oración temática (topic sentence) presenta la idea principal del párrafo. Las otras son detalles o cierres."
    },
    {
      "type": "multiple_choice",
      "skill": "use",
      "question": "In a formal email, which is the best opening?",
      "options": [
        "Hey!",
        "Dear Mr. Brown,",
        "What's up,"
      ],
      "correctIndex": 1,
      "explanation": "En un correo formal el saludo apropiado es 'Dear Mr. Brown,'. Los otros son demasiado informales."
    },
    {
      "type": "word_order",
      "skill": "grammar",
      "words": [
        "a",
        "beautiful",
        "old",
        "wooden",
        "table"
      ],
      "correctOrder": [
        "a",
        "beautiful",
        "old",
        "wooden",
        "table"
      ],
      "hint": "Orden de adjetivos: opinión, edad, material."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "Choose the correct adjective order: She bought a ___ bag.",
      "options": [
        "leather small black",
        "small black leather",
        "black small leather"
      ],
      "correctIndex": 1,
      "explanation": "El orden es tamaño + color + material: 'small black leather'."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "That's the man ___ lives next door.",
      "answers": [
        "who",
        "that"
      ],
      "hint": "Pronombre relativo para personas.",
      "explanation": "Usamos 'who' (o 'that') para referirnos a personas en cláusulas relativas."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "This is the book ___ won the prize.",
      "options": [
        "who",
        "which",
        "where"
      ],
      "correctIndex": 1,
      "explanation": "Usamos 'which' para cosas en cláusulas relativas."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "While I ___ dinner, the phone rang.",
      "options": [
        "was cooking",
        "cooked",
        "cook"
      ],
      "correctIndex": 0,
      "explanation": "En narraciones, la acción larga en progreso va en pasado continuo ('was cooking') y la acción corta que la interrumpe en pasado simple ('rang')."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "When I was a child, I ___ live in a small village.",
      "answers": [
        "used to"
      ],
      "hint": "Hábito del pasado que ya no ocurre.",
      "explanation": "'used to' describe hábitos o estados del pasado que ya no son ciertos."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "I have known her ___ 2015.",
      "answers": [
        "since"
      ],
      "hint": "Punto de inicio en el tiempo.",
      "explanation": "Con present perfect usamos 'since' para un punto de inicio (2015) y 'for' para una duración."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "We have lived here ___ ten years.",
      "options": [
        "since",
        "for",
        "ago"
      ],
      "correctIndex": 1,
      "explanation": "Usamos 'for' con una duración o periodo de tiempo (ten years)."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "The Mona Lisa ___ by Leonardo da Vinci.",
      "options": [
        "painted",
        "was painted",
        "is painting"
      ],
      "correctIndex": 1,
      "explanation": "La voz pasiva en pasado: 'was painted' (be + participio)."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "If I ___ rich, I would travel the world.",
      "answers": [
        "were",
        "was"
      ],
      "hint": "Segundo condicional: situación irreal.",
      "explanation": "En el segundo condicional usamos pasado simple en la cláusula 'if'. Se acepta 'were' (más formal) o 'was'."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "This coffee is ___ hot to drink.",
      "options": [
        "too",
        "enough",
        "very much"
      ],
      "correctIndex": 0,
      "explanation": "'too' + adjetivo expresa un exceso (demasiado caliente para beberlo)."
    },
    {
      "type": "find_error",
      "skill": "grammar",
      "question": "Encuentra el error con 'enough'.",
      "segments": [
        "He is not ",
        {
          "u": "enough tall"
        },
        " to reach the ",
        {
          "u": "shelf"
        },
        "."
      ],
      "correctIndex": 0,
      "correction": "tall enough (adjetivo + enough)",
      "explanation": "'enough' va DESPUÉS del adjetivo: 'tall enough'."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "Choose the correct indirect question.",
      "options": [
        "Can you tell me where is the station?",
        "Can you tell me where the station is?",
        "Can you tell me where does the station is?"
      ],
      "correctIndex": 1,
      "explanation": "En preguntas indirectas el orden es como una afirmación: 'where the station is'."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "Look at those clouds! It ___ rain.",
      "options": [
        "is going to",
        "will",
        "used to"
      ],
      "correctIndex": 0,
      "explanation": "Con evidencia presente (las nubes) usamos 'be going to' para una predicción."
    },
    {
      "type": "fill_blank",
      "skill": "vocab",
      "sentence": "The cat jumped ___ the table onto the floor.",
      "answers": [
        "off"
      ],
      "hint": "Preposición de movimiento: salir de una superficie.",
      "explanation": "'off' indica movimiento desde una superficie hacia abajo."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "She walked ___ the bridge to the other side.",
      "options": [
        "across",
        "into",
        "under"
      ],
      "correctIndex": 0,
      "explanation": "'across' indica movimiento de un lado a otro de una superficie (el puente)."
    },
    {
      "type": "reading",
      "skill": "reading",
      "title": "Writing a Good Paragraph",
      "passage": "A good paragraph has three main parts. First, there is a topic sentence. It tells the reader the main idea.\nNext come the supporting sentences. These sentences give details, examples, and reasons that explain the main idea. Good writers use linking words like 'and', 'but', and 'so' to connect their ideas.\nFinally, many paragraphs end with a closing sentence. This sentence repeats the main idea in different words. With these three parts, a paragraph is clear and easy to read.",
      "questions": [
        {
          "q": "What is the main idea of the passage?",
          "options": [
            "How to write an email",
            "The three parts of a good paragraph",
            "Why reading is important",
            "How to use a dictionary"
          ],
          "correctIndex": 1,
          "explanation": "El texto explica las tres partes de un buen párrafo."
        },
        {
          "q": "What does the topic sentence do?",
          "options": [
            "It gives examples.",
            "It ends the paragraph.",
            "It tells the main idea.",
            "It connects ideas."
          ],
          "correctIndex": 2,
          "explanation": "El texto dice que la topic sentence presenta la idea principal."
        },
        {
          "q": "Which linking words does the passage mention?",
          "options": [
            "first, next, finally",
            "and, but, so",
            "who, which, where",
            "too, enough"
          ],
          "correctIndex": 1,
          "explanation": "Menciona 'and', 'but' y 'so' como conectores."
        },
        {
          "q": "What does the closing sentence usually do?",
          "options": [
            "It adds new information.",
            "It repeats the main idea in different words.",
            "It asks a question.",
            "It starts the paragraph."
          ],
          "correctIndex": 1,
          "explanation": "El texto dice que la oración de cierre repite la idea principal con otras palabras."
        }
      ]
    },
    {
      "type": "listening",
      "skill": "listening",
      "text": "Hi Tom. I'm writing to invite you to my birthday party on Saturday. It starts at six o'clock at my house. Please bring your swimsuit because we have a pool. Let me know if you can come!",
      "question": "Why is the speaker writing the message?",
      "options": [
        "To cancel a party",
        "To invite Tom to a party",
        "To ask for directions"
      ],
      "correctIndex": 1,
      "explanation": "El mensaje es una invitación a una fiesta de cumpleaños el sábado."
    }
  ] },
  "core_grammar_lvl1": { "name": "Grammar Foundations", "cefr": "B1", "pass": 70, "exercises": [
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "I ___ to Japan three times, but I didn't go there last year.",
      "options": [
        "went",
        "have been",
        "was going",
        "have gone"
      ],
      "correctIndex": 1,
      "explanation": "Para una experiencia de vida ('three times') usamos present perfect: 'have been to' (haber estado/visitado). 'have gone to' implicaría que sigue allí; 'went' sería pasado simple con tiempo terminado."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "While I ___ (cook) dinner, the phone rang.",
      "answers": [
        "was cooking"
      ],
      "hint": "Acción larga interrumpida en el pasado.",
      "explanation": "El past continuous ('was cooking') describe la acción en progreso interrumpida por una acción corta en pasado simple ('rang')."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "By the time we arrived, the film ___ already ___.",
      "options": [
        "has / started",
        "had / started",
        "was / starting",
        "did / start"
      ],
      "correctIndex": 1,
      "explanation": "El past perfect ('had started') indica que una acción ocurrió antes de otra acción en el pasado ('arrived')."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "Look at those dark clouds! It ___ rain.",
      "options": [
        "will",
        "is going to",
        "would",
        "used to"
      ],
      "correctIndex": 1,
      "explanation": "'be going to' se usa para predicciones basadas en evidencia presente (las nubes). 'will' sería para predicciones sin evidencia."
    },
    {
      "type": "true_false",
      "skill": "grammar",
      "statement": "The sentence 'I am understanding this lesson now' is correct in standard English.",
      "answer": false,
      "explanation": "'understand' es un verbo estativo y normalmente no se usa en continuo. Lo correcto es 'I understand this lesson now'."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "When I was a child, I ___ swim, but now I can.",
      "answers": [
        "couldn't",
        "could not"
      ],
      "hint": "Habilidad en el pasado (negativa).",
      "explanation": "Para hablar de habilidad en el pasado usamos 'could'; en negativo, 'couldn't' / 'could not'."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "You ___ wear a helmet on a motorbike; it's the law.",
      "options": [
        "should",
        "must",
        "might",
        "can"
      ],
      "correctIndex": 1,
      "explanation": "'must' expresa obligación fuerte, especialmente reglas o leyes. 'should' sería solo un consejo."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "If it ___ tomorrow, we will stay at home.",
      "options": [
        "rains",
        "will rain",
        "would rain",
        "rained"
      ],
      "correctIndex": 0,
      "explanation": "En el primer condicional, la cláusula 'if' va en presente simple ('rains') y la principal con 'will'."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "If I ___ rich, I would travel around the world.",
      "options": [
        "am",
        "was",
        "were",
        "will be"
      ],
      "correctIndex": 2,
      "explanation": "En el segundo condicional (situación hipotética/irreal) se usa el pasado; con 'be' se prefiere 'were' para todas las personas."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "The Mona Lisa ___ (paint) by Leonardo da Vinci.",
      "answers": [
        "was painted"
      ],
      "hint": "Voz pasiva en pasado simple.",
      "explanation": "La voz pasiva en pasado simple se forma con 'was/were + participio': 'was painted'."
    },
    {
      "type": "find_error",
      "skill": "grammar",
      "question": "Encuentra el error en el estilo indirecto.",
      "segments": [
        "She said ",
        {
          "u": "that"
        },
        " she ",
        {
          "u": "will"
        },
        " call me later."
      ],
      "correctIndex": 1,
      "correction": "would (will -> would)",
      "explanation": "En reported speech, tras un verbo introductorio en pasado ('said'), 'will' cambia a 'would'."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "The man ___ lives next door is a doctor.",
      "options": [
        "which",
        "who",
        "whose",
        "where"
      ],
      "correctIndex": 1,
      "explanation": "'who' es el pronombre relativo para personas. 'which' es para cosas y 'whose' indica posesión."
    },
    {
      "type": "word_order",
      "skill": "grammar",
      "words": [
        "She",
        "told",
        "me",
        "that",
        "she",
        "was",
        "tired"
      ],
      "correctOrder": [
        "She",
        "told",
        "me",
        "that",
        "she",
        "was",
        "tired"
      ],
      "hint": "Estilo indirecto: 'told + persona + that...' con el verbo desplazado al pasado."
    },
    {
      "type": "fill_blank",
      "skill": "use",
      "sentence": "I ___ live in London, but I moved to Madrid last year.",
      "answers": [
        "used to"
      ],
      "hint": "Hábito o estado del pasado que ya no ocurre.",
      "explanation": "'used to' describe un hábito o estado pasado que ya no es cierto. No confundir con 'be used to' (estar acostumbrado a)."
    },
    {
      "type": "multiple_choice",
      "skill": "use",
      "question": "She is used to ___ early because she has worked night shifts for years.",
      "options": [
        "get up",
        "got up",
        "getting up",
        "gets up"
      ],
      "correctIndex": 2,
      "explanation": "Tras 'be used to' (estar acostumbrado a) usamos un gerundio: 'getting up'."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "I enjoy ___ books, but I want ___ a film tonight.",
      "options": [
        "to read / watching",
        "reading / to watch",
        "read / watch",
        "reading / watch"
      ],
      "correctIndex": 1,
      "explanation": "'enjoy' va seguido de gerundio ('reading'); 'want' va seguido de infinitivo con 'to' ('to watch')."
    },
    {
      "type": "fill_blank",
      "skill": "use",
      "sentence": "He kept working ___ he was very tired.",
      "answers": [
        "although",
        "even though",
        "though"
      ],
      "hint": "Conector de contraste seguido de sujeto + verbo.",
      "explanation": "'although', 'even though' y 'though' introducen una cláusula de contraste. 'despite/in spite of' irían con sustantivo o gerundio."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "There isn't ___ milk left; we need to buy some.",
      "options": [
        "many",
        "much",
        "a few",
        "few"
      ],
      "correctIndex": 1,
      "explanation": "'milk' es incontable, así que usamos 'much' en frases negativas. 'many' se usa con contables."
    },
    {
      "type": "true_false",
      "skill": "vocab",
      "statement": "'A few' and 'a little' have the same meaning and can be used with the same nouns.",
      "answer": false,
      "explanation": "'a few' se usa con sustantivos contables (a few books) y 'a little' con incontables (a little water)."
    },
    {
      "type": "fill_blank",
      "skill": "vocab",
      "sentence": "The keys are ___ the table, next to the lamp.",
      "answers": [
        "on"
      ],
      "hint": "Preposición de lugar para una superficie.",
      "explanation": "Usamos 'on' para una superficie. 'in' sería dentro y 'at' para un punto concreto."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "The meeting is ___ Monday ___ 9 o'clock.",
      "options": [
        "in / at",
        "on / at",
        "at / on",
        "on / in"
      ],
      "correctIndex": 1,
      "explanation": "Usamos 'on' con días (Monday) y 'at' con horas concretas (9 o'clock)."
    },
    {
      "type": "true_false",
      "skill": "vocab",
      "statement": "We use 'in' to talk about being inside a building, as in 'in the box'.",
      "answer": true,
      "explanation": "Para 'dentro de' usamos 'in' (in the box). 'at' indica un punto o lugar (at the door, at school)."
    },
    {
      "type": "translate",
      "skill": "vocab",
      "prompt": "Traduce: \"Hay demasiada gente aquí.\"",
      "answers": [
        "there are too many people here",
        "there're too many people here"
      ],
      "explanation": "'people' es plural contable, por eso usamos 'too many': There are too many people here."
    },
    {
      "type": "translate",
      "skill": "use",
      "prompt": "Traduce: \"Si tuviera más tiempo, aprendería italiano.\"",
      "answers": [
        "if i had more time, i would learn italian",
        "if i had more time i would learn italian",
        "i would learn italian if i had more time"
      ],
      "explanation": "Segundo condicional: 'if + pasado simple, would + infinitivo' para una situación hipotética: If I had more time, I would learn Italian."
    },
    {
      "type": "reading",
      "skill": "reading",
      "title": "A Change of Plans",
      "passage": "Last summer, Maria had planned to spend her holidays at the beach with her family. However, a week before the trip, she got a phone call from a company where she had applied for a job months earlier. They offered her an interview, and it was scheduled for the exact week of the holiday.\n\nAlthough Maria was disappointed about missing the beach, she knew this was an opportunity she could not refuse. She told her parents that she would join them later if everything went well. The interview was difficult, but she felt confident because she had prepared carefully.\n\nTwo days afterwards, the company called again. Maria had got the job, and she was going to start the following month. In the end, she travelled to the beach for the last few days of the holiday, and this time she had something wonderful to celebrate with her family.",
      "questions": [
        {
          "q": "What was Maria's original plan for the summer?",
          "options": [
            "To start a new job",
            "To go to the beach with her family",
            "To prepare for an interview",
            "To travel abroad alone"
          ],
          "correctIndex": 1,
          "explanation": "El texto dice que ella 'had planned to spend her holidays at the beach with her family'."
        },
        {
          "q": "Why did Maria change her plans?",
          "options": [
            "She was offered a job interview",
            "Her family cancelled the trip",
            "She felt ill before the holiday",
            "The beach was closed"
          ],
          "correctIndex": 0,
          "explanation": "Recibió una llamada de una empresa que le ofreció una entrevista la misma semana de las vacaciones."
        },
        {
          "q": "How did Maria feel during the interview, and why?",
          "options": [
            "Nervous, because she had not studied",
            "Confident, because she had prepared carefully",
            "Bored, because it was easy",
            "Angry, because she missed the beach"
          ],
          "correctIndex": 1,
          "explanation": "El texto dice 'she felt confident because she had prepared carefully'."
        },
        {
          "q": "What happened at the end of the story?",
          "options": [
            "She failed the interview",
            "She decided not to take the job",
            "She got the job and still joined her family at the beach",
            "She stayed home for the whole summer"
          ],
          "correctIndex": 2,
          "explanation": "Consiguió el trabajo y viajó a la playa los últimos días para celebrarlo con su familia."
        }
      ]
    },
    {
      "type": "listening",
      "skill": "listening",
      "text": "When I was younger, I used to be terrified of speaking in public. I would shake and forget my words. But after taking a course and practising every week, I have got used to it. Now I actually enjoy giving presentations at work.",
      "question": "What is the speaker's main point?",
      "options": [
        "He still hates public speaking",
        "He has overcome his fear of public speaking through practice",
        "He has never spoken in public",
        "He took a course but it did not help"
      ],
      "correctIndex": 1,
      "explanation": "El hablante antes temía hablar en público, pero tras un curso y práctica se acostumbró y ahora disfruta haciéndolo."
    }
  ] },
  "core_grammar_lvl2": { "name": "Grammar in Context", "cefr": "B2", "pass": 72, "exercises": [
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "___ that he forgot to lock the door, not his careless attitude in general.",
      "options": [
        "It was the fact",
        "There was the fact",
        "What it was",
        "That was fact"
      ],
      "correctIndex": 0,
      "explanation": "Es una cleft sentence con 'It was... that...' para enfatizar 'the fact'. La estructura es 'It + be + elemento enfatizado + that...'."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "If you ___ harder last year, you ___ in this difficult situation now.",
      "options": [
        "studied / wouldn't be",
        "had studied / wouldn't be",
        "had studied / wouldn't have been",
        "studied / weren't"
      ],
      "correctIndex": 1,
      "explanation": "Es un condicional mixto: condición en el pasado (Type 3: 'had studied') con resultado en el presente (Type 2: 'wouldn't be now')."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "By the time the conference ends, the delegates ___ for over ten hours.",
      "options": [
        "will negotiate",
        "will have been negotiating",
        "have negotiated",
        "would have negotiated"
      ],
      "correctIndex": 1,
      "explanation": "El future perfect continuous ('will have been negotiating') expresa la duración de una acción hasta un punto futuro ('by the time')."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "Not only ___ the deadline, but she also exceeded every target.",
      "options": [
        "she met",
        "did she meet",
        "she did meet",
        "met she"
      ],
      "correctIndex": 1,
      "explanation": "Tras un adverbio negativo al inicio ('Not only') se aplica la inversión: auxiliar + sujeto ('did she meet')."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "The committee insists that every report ___ submitted before Friday.",
      "options": [
        "is",
        "be",
        "will be",
        "being"
      ],
      "correctIndex": 1,
      "explanation": "Tras verbos como 'insist' se usa el subjuntivo: forma base del verbo ('be'), sin importar el sujeto."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "___ in a hurry, she left her laptop on the train.",
      "options": [
        "Being",
        "Been",
        "To be",
        "Be"
      ],
      "correctIndex": 0,
      "explanation": "Es una participle clause: 'Being in a hurry' equivale a 'Because she was in a hurry'. Se usa el participio presente."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "The new policy ___ to have reduced waiting times significantly.",
      "options": [
        "is said",
        "says",
        "is saying",
        "said"
      ],
      "correctIndex": 0,
      "explanation": "Es una pasiva impersonal avanzada: 'is said to have reduced' expresa lo que se dice de algo, con infinitivo perfecto para acción anterior."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "He ___ the meeting; his phone shows he was online the whole afternoon.",
      "options": [
        "must have forgotten",
        "can't have forgotten",
        "should have forgotten",
        "might forget"
      ],
      "correctIndex": 1,
      "explanation": "'Can't have + participio' expresa deducción de que algo pasado es imposible, justificado por la evidencia del teléfono."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "The colleague ___ I shared the project is now leading the department.",
      "options": [
        "who",
        "with whom",
        "that",
        "which"
      ],
      "correctIndex": 1,
      "explanation": "Tras preposición en relativas formales se usa 'with whom' para personas: 'the colleague with whom I shared...'."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "I'd rather you ___ anything to her until the deal is confirmed.",
      "options": [
        "don't say",
        "didn't say",
        "not say",
        "won't say"
      ],
      "correctIndex": 1,
      "explanation": "Tras 'I'd rather' con un sujeto diferente se usa el pasado simple con valor hipotético ('didn't say')."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "It's high time we ___ this outdated system.",
      "answers": [
        "replaced",
        "updated",
        "changed"
      ],
      "hint": "Tras 'It's high time' se usa pasado simple con valor presente/futuro.",
      "explanation": "La estructura 'It's (high) time + sujeto + pasado simple' expresa que algo debería ya estar hecho: 'we replaced'."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "Had I known about the risks, I ___ have invested.",
      "answers": [
        "wouldn't",
        "would not",
        "never would"
      ],
      "hint": "Inversión condicional del tercer condicional.",
      "explanation": "'Had I known' es la forma invertida de 'If I had known'; el resultado lleva 'wouldn't have invested'."
    },
    {
      "type": "find_error",
      "skill": "grammar",
      "question": "Encuentra el error en esta oración con inversión.",
      "segments": [
        "Seldom ",
        {
          "u": "we have seen"
        },
        " ",
        {
          "u": "such"
        },
        " a remarkable performance."
      ],
      "correctIndex": 0,
      "correction": "have we seen (we have seen -> have we seen)",
      "explanation": "Tras el adverbio negativo 'Seldom' al inicio hay inversión: auxiliar + sujeto, es decir 'have we seen', no 'we have seen'."
    },
    {
      "type": "find_error",
      "skill": "grammar",
      "question": "Encuentra el error en esta cláusula de participio.",
      "segments": [
        "Having ",
        {
          "u": "finishing"
        },
        " the report, she ",
        {
          "u": "submitted"
        },
        " it immediately."
      ],
      "correctIndex": 0,
      "correction": "finished (finishing -> finished)",
      "explanation": "La cláusula de participio perfecto es 'Having + participio pasado': 'Having finished', no 'Having finishing'."
    },
    {
      "type": "word_order",
      "skill": "grammar",
      "words": [
        "Were",
        "I",
        "you",
        "I",
        "would",
        "accept",
        "the",
        "offer"
      ],
      "correctOrder": [
        "Were",
        "I",
        "you",
        "I",
        "would",
        "accept",
        "the",
        "offer"
      ],
      "hint": "Inversión condicional de 'If I were you'."
    },
    {
      "type": "word_order",
      "skill": "grammar",
      "words": [
        "It",
        "was",
        "in",
        "Paris",
        "that",
        "they",
        "first",
        "met"
      ],
      "correctOrder": [
        "It",
        "was",
        "in",
        "Paris",
        "that",
        "they",
        "first",
        "met"
      ],
      "hint": "Cleft sentence que enfatiza el lugar."
    },
    {
      "type": "true_false",
      "skill": "vocab",
      "statement": "A 'last-minute' decision is one made well in advance of a deadline.",
      "answer": false,
      "explanation": "Falso. El adjetivo compuesto 'last-minute' significa hecho en el último momento, no con antelación."
    },
    {
      "type": "true_false",
      "skill": "vocab",
      "statement": "The hedging phrase 'it would appear that' makes a statement sound more cautious and less certain.",
      "answer": true,
      "explanation": "Verdadero. 'It would appear that' es lenguaje de hedging que suaviza la afirmación y reduce el compromiso con su certeza."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "Choose the correct compound adjective: a project that lasts three years is a ___ project.",
      "options": [
        "three-years",
        "three-year",
        "three years'",
        "three-yearly"
      ],
      "correctIndex": 1,
      "explanation": "En adjetivos compuestos numéricos el sustantivo va en singular: 'a three-year project'."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "Which connector best signals a concession: 'The plan is risky; ___, it could pay off enormously.'",
      "options": [
        "therefore",
        "nonetheless",
        "consequently",
        "hence"
      ],
      "correctIndex": 1,
      "explanation": "'Nonetheless' introduce una concesión/contraste. Los demás expresan consecuencia."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "Pick the most appropriate speculative phrase: '___ the data, sales may have peaked.'",
      "options": [
        "Judging by",
        "Regardless of",
        "In spite of",
        "On account of"
      ],
      "correctIndex": 0,
      "explanation": "'Judging by' introduce una deducción basada en evidencia, propia del lenguaje especulativo."
    },
    {
      "type": "fill_blank",
      "skill": "vocab",
      "sentence": "She gave a ___ reply, neither confirming nor denying the rumour.",
      "answers": [
        "noncommittal",
        "non-committal",
        "vague",
        "evasive"
      ],
      "hint": "Adjetivo que describe una respuesta que no se compromete.",
      "explanation": "'Noncommittal' describe una respuesta deliberadamente evasiva que no toma partido."
    },
    {
      "type": "translate",
      "skill": "vocab",
      "prompt": "Traduce: \"Es una solución a corto plazo.\"",
      "answers": [
        "it's a short-term solution",
        "it is a short-term solution",
        "this is a short-term solution"
      ],
      "explanation": "'Short-term' es un adjetivo compuesto: 'It's a short-term solution.'"
    },
    {
      "type": "translate",
      "skill": "use",
      "prompt": "Traduce: \"No fue hasta medianoche cuando llamaron.\"",
      "answers": [
        "it wasn't until midnight that they called",
        "it was not until midnight that they called"
      ],
      "explanation": "Cleft con énfasis temporal negativo: 'It wasn't until midnight that they called.'"
    },
    {
      "type": "translate",
      "skill": "use",
      "prompt": "Traduce: \"Deberías haberme dicho la verdad.\"",
      "answers": [
        "you should have told me the truth",
        "you ought to have told me the truth"
      ],
      "explanation": "Modal del pasado de arrepentimiento: 'You should have told me the truth.'"
    },
    {
      "type": "reading",
      "skill": "reading",
      "title": "The Rise of Remote Work",
      "passage": "When offices closed almost overnight, few managers anticipated that the shift to remote work would become permanent. What had originally been framed as a temporary emergency measure soon hardened into a structural change that companies could not easily reverse.\nSupporters argue that, had firms not embraced flexibility, they would now be struggling to retain talent in an increasingly competitive market. Productivity, they claim, appears to have remained stable or even improved, although critics caution that such figures may have been inflated by employees working longer, unmeasured hours.\nWhat remains contested is the long-term effect on collaboration. Seldom do spontaneous conversations occur over video calls, and it is precisely those informal exchanges that many believe drive innovation. Were companies to abandon the office entirely, they might find that something intangible had been lost along the way.",
      "questions": [
        {
          "q": "According to the passage, what was the original intention behind remote work?",
          "options": [
            "A permanent restructuring of companies",
            "A temporary emergency measure",
            "A strategy to cut office costs",
            "A way to boost innovation"
          ],
          "correctIndex": 1,
          "explanation": "El texto dice que se planteó como 'a temporary emergency measure' antes de volverse permanente."
        },
        {
          "q": "What do critics say about the productivity figures?",
          "options": [
            "They are definitely false",
            "They may have been inflated by unmeasured extra hours",
            "They prove remote work fails",
            "They were measured incorrectly on purpose"
          ],
          "correctIndex": 1,
          "explanation": "Los críticos advierten que las cifras 'may have been inflated by employees working longer, unmeasured hours'."
        },
        {
          "q": "What concern is raised about long-term collaboration?",
          "options": [
            "Video calls are too expensive",
            "Informal, spontaneous exchanges rarely happen remotely",
            "Employees refuse to use video",
            "Innovation has already collapsed"
          ],
          "correctIndex": 1,
          "explanation": "El texto señala que rara vez ocurren conversaciones espontáneas en videollamadas, y esos intercambios informales impulsan la innovación."
        },
        {
          "q": "The phrase 'appears to have remained stable' is an example of which feature?",
          "options": [
            "A strong factual claim",
            "Hedging / speculative language",
            "A direct command",
            "A cleft sentence"
          ],
          "correctIndex": 1,
          "explanation": "'Appears to have remained' es hedging: suaviza la afirmación expresando cautela sobre su certeza."
        }
      ]
    },
    {
      "type": "listening",
      "skill": "listening",
      "text": "Honestly, I'd rather we postponed the launch than rush it. Had we tested the software more thoroughly, we wouldn't be facing these complaints now. It's high time the team prioritised quality over speed.",
      "question": "What is the speaker's main point?",
      "options": [
        "The launch should happen as soon as possible",
        "Rushing led to problems, and quality should now come first",
        "The software has no issues at all",
        "The team should be replaced immediately"
      ],
      "correctIndex": 1,
      "explanation": "El hablante prefiere posponer, lamenta no haber probado más el software y pide priorizar la calidad sobre la velocidad."
    }
  ] },
  "core_grammar_lvl3": { "name": "Grammar Mastery", "cefr": "C1+", "pass": 75, "exercises": [
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "Choose the correct cleft structure: ___ the lack of funding that ultimately doomed the project, not the team's competence.",
      "options": [
        "It was",
        "What was",
        "There was",
        "That was"
      ],
      "correctIndex": 0,
      "explanation": "Una oración hendida (cleft) con 'it' se forma 'It was + elemento enfatizado + that...'. Aquí enfatizamos 'the lack of funding', así que 'It was the lack of funding that...' es lo correcto."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "What the committee failed to grasp ___ the long-term consequences of the merger.",
      "answers": [
        "was",
        "were"
      ],
      "hint": "Oración hendida con 'what'; el verbo concuerda con el predicado.",
      "explanation": "En las wh-cleft ('What ... was/were ...'), el verbo es normalmente singular 'was', aunque 'were' se acepta cuando el complemento es plural ('the consequences')."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "Complete the negative inversion: Not only ___ the deadline, but he also exceeded every quality benchmark.",
      "options": [
        "he met",
        "did he meet",
        "he did meet",
        "met he"
      ],
      "correctIndex": 1,
      "explanation": "Tras un adverbio negativo en posición inicial ('Not only') se requiere inversión auxiliar-sujeto: 'did he meet'. No se invierte el verbo léxico directamente."
    },
    {
      "type": "find_error",
      "skill": "grammar",
      "question": "Encuentra el error en esta inversión negativa.",
      "segments": [
        "Under no circumstances ",
        {
          "u": "you should"
        },
        " disclose the figures ",
        {
          "u": "before"
        },
        " the embargo lifts."
      ],
      "correctIndex": 0,
      "correction": "should you (inversión auxiliar-sujeto)",
      "explanation": "Con un sintagma negativo inicial ('Under no circumstances') hay que invertir el auxiliar y el sujeto: 'should you disclose', no 'you should'."
    },
    {
      "type": "word_order",
      "skill": "grammar",
      "words": [
        "Rarely",
        "have",
        "we",
        "encountered",
        "such",
        "resistance"
      ],
      "correctOrder": [
        "Rarely",
        "have",
        "we",
        "encountered",
        "such",
        "resistance"
      ],
      "hint": "Inversión negativa con 'Rarely' al inicio: adverbio + auxiliar + sujeto + participio.",
      "explanation": "'Rarely' en posición inicial fuerza la inversión: 'Rarely have we encountered...'."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "Select the correct mixed conditional in a professional critique: 'If the analyst had verified the data, the report ___ flawed now.'",
      "options": [
        "wouldn't be",
        "wouldn't have been",
        "won't be",
        "isn't"
      ],
      "correctIndex": 0,
      "explanation": "Condicional mixto: condición pasada irreal ('had verified') con resultado presente ('now'). El resultado usa 'would + infinitivo': 'wouldn't be flawed now'."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "If she were less risk-averse, she ___ accepted the partnership offer last spring.",
      "answers": [
        "would have"
      ],
      "hint": "Condicional mixto: condición presente/general con resultado pasado.",
      "explanation": "Condición presente irreal ('If she were') con resultado pasado ('last spring'): 'would have accepted'."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "Choose the regret/unreal-past form: 'I wish I ___ the contract more carefully before signing it.'",
      "options": [
        "had read",
        "would read",
        "read",
        "have read"
      ],
      "correctIndex": 0,
      "explanation": "Para lamentar una acción pasada se usa 'wish + past perfect': 'I wish I had read'."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "Advanced modal deduction: 'The lights are off and the car's gone; they ___ already left for the airport.'",
      "options": [
        "must have",
        "should have",
        "can't have",
        "needn't have"
      ],
      "correctIndex": 0,
      "explanation": "La evidencia indica una deducción casi segura sobre el pasado: 'must have left'. 'Can't have' expresaría imposibilidad, lo contrario a la evidencia."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "Subjunctive in a formal agreement: 'The board insists that each director ___ the confidentiality clause without exception.'",
      "options": [
        "sign",
        "signs",
        "signed",
        "is signing"
      ],
      "correctIndex": 0,
      "explanation": "Tras verbos de mandato/exigencia ('insist that') se usa el subjuntivo en su forma base: 'each director sign', sin -s."
    },
    {
      "type": "find_error",
      "skill": "grammar",
      "question": "Encuentra el error en el subjuntivo formal.",
      "segments": [
        "It is imperative that the proposal ",
        {
          "u": "is"
        },
        " submitted ",
        {
          "u": "before"
        },
        " the fiscal year closes."
      ],
      "correctIndex": 0,
      "correction": "be (subjuntivo: be submitted)",
      "explanation": "Tras 'It is imperative that' se usa el subjuntivo base 'be submitted', no el indicativo 'is submitted'."
    },
    {
      "type": "word_order",
      "skill": "grammar",
      "words": [
        "Having",
        "reviewed",
        "the",
        "evidence",
        "the",
        "jury",
        "retired"
      ],
      "correctOrder": [
        "Having",
        "reviewed",
        "the",
        "evidence",
        "the",
        "jury",
        "retired"
      ],
      "hint": "Cláusula de participio perfecto reducida que precede a la principal.",
      "explanation": "Una cláusula de participio perfecto ('Having reviewed the evidence') reduce 'After the jury had reviewed the evidence' y precede a la oración principal."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "Passive of reporting: 'The CEO ___ to have misled investors during the earnings call.'",
      "options": [
        "is alleged",
        "is alleging",
        "alleges",
        "has alleged"
      ],
      "correctIndex": 0,
      "explanation": "La pasiva de reporte impersonal usa 'subject + is + past participle + to-infinitive': 'is alleged to have misled'."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "It ___ widely believed that the policy will be repealed before the next session.",
      "answers": [
        "is"
      ],
      "hint": "Pasiva de reporte con 'it' anticipador.",
      "explanation": "La estructura 'It is + past participle + that...' ('It is widely believed that...') es una pasiva de reporte estándar."
    },
    {
      "type": "true_false",
      "skill": "vocab",
      "statement": "The euphemism 'let go' is commonly used to mean 'dismissed from employment'.",
      "answer": true,
      "explanation": "'To be let go' es un eufemismo habitual para 'ser despedido', suavizando la connotación negativa."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "Which discourse marker best signals a concession before a counter-argument? 'The strategy was costly; ___, it secured long-term market share.'",
      "options": [
        "that said",
        "for instance",
        "in other words",
        "as a result"
      ],
      "correctIndex": 0,
      "explanation": "'That said' introduce una concesión seguida de un contraargumento, equivalente a 'dicho esto / aun así'."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "Choose the best hedge for an academic claim: 'The findings ___ that early intervention reduces relapse.'",
      "options": [
        "suggest",
        "prove",
        "guarantee",
        "establish beyond doubt"
      ],
      "correctIndex": 0,
      "explanation": "'Suggest' es un hedge (atenuador) apropiado en lenguaje académico; las demás opciones afirman certeza absoluta, poco prudente."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "Identify the rhetorical device: 'We must dare to dream, dare to build, and dare to lead.'",
      "options": [
        "anaphora",
        "litotes",
        "oxymoron",
        "metonymy"
      ],
      "correctIndex": 0,
      "explanation": "La anáfora es la repetición de una palabra al inicio de cláusulas sucesivas ('dare to...'), reforzada aquí por el paralelismo."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "Which adverb of attitude conveys the speaker's reluctant acknowledgement? '___, the criticism was not entirely unfounded.'",
      "options": [
        "Admittedly",
        "Frankly",
        "Surprisingly",
        "Hopefully"
      ],
      "correctIndex": 0,
      "explanation": "'Admittedly' señala que el hablante reconoce algo a regañadientes, matiz de concesión propio de los adverbios de actitud."
    },
    {
      "type": "true_false",
      "skill": "vocab",
      "statement": "The phrase 'not without merit' uses litotes to express, with understatement, that something has merit.",
      "answer": true,
      "explanation": "La litote afirma mediante la negación de lo contrario; 'not without merit' equivale a 'tiene cierto mérito', un understatement."
    },
    {
      "type": "fill_blank",
      "skill": "vocab",
      "sentence": "Nominalize the verb 'to implement': The committee oversaw the ___ of the new protocol.",
      "answers": [
        "implementation"
      ],
      "hint": "Nominalización del verbo 'implement'.",
      "explanation": "La nominalización de 'implement' es 'implementation', sustantivo abstracto típico del registro formal."
    },
    {
      "type": "translate",
      "skill": "use",
      "prompt": "Traduce con énfasis (cleft): \"Fue su honestidad lo que le ganó nuestro respeto.\"",
      "answers": [
        "it was his honesty that earned him our respect",
        "it was her honesty that earned her our respect",
        "it was his honesty that won him our respect",
        "it was her honesty that won her our respect"
      ],
      "explanation": "La oración hendida 'It was his honesty that earned him our respect' enfatiza 'his honesty'."
    },
    {
      "type": "translate",
      "skill": "use",
      "prompt": "Traduce (inversión negativa): \"En ningún momento se nos informó del riesgo.\"",
      "answers": [
        "at no point were we informed of the risk",
        "at no time were we informed of the risk",
        "at no point were we informed about the risk",
        "at no time were we informed about the risk"
      ],
      "explanation": "El sintagma negativo inicial 'At no point' fuerza la inversión: 'were we informed'."
    },
    {
      "type": "find_error",
      "skill": "use",
      "question": "Encuentra el error de cohesión (elipsis verbal).",
      "segments": [
        "Some delegates supported the motion, ",
        {
          "u": "but others didn't supported"
        },
        {
          "u": "it"
        },
        "."
      ],
      "correctIndex": 0,
      "correction": "but others didn't (tras el auxiliar 'didn't' no se repite el verbo léxico)",
      "explanation": "Tras el auxiliar 'didn't' no se usa el participio/forma flexionada del verbo: lo correcto es 'but others didn't', con elipsis del verbo léxico ('support')."
    },
    {
      "type": "multiple_choice",
      "skill": "use",
      "question": "Choose the punctuation that best creates rhetorical pause and emphasis: 'There was only one thing left to do ___ resign.'",
      "options": [
        "— ",
        ", ",
        "; ",
        "... and"
      ],
      "correctIndex": 0,
      "explanation": "La raya (em dash) introduce una pausa enfática y una revelación, ideal para el flujo retórico antes del clímax 'resign'."
    },
    {
      "type": "reading",
      "skill": "reading",
      "title": "The Rhetoric of Restraint",
      "passage": "It is often assumed that persuasion at the highest level depends on force of expression — on the marshalling of vivid imagery and emphatic claims. Yet seasoned orators know otherwise. What distinguishes truly compelling discourse is frequently not what is asserted but what is withheld. The deliberate use of understatement, the strategic hedge, the carefully placed concession: these are the instruments by which a speaker signals both confidence and respect for the audience's judgement.\nConsider the litotes 'not unsympathetic'. Where a blunt 'sympathetic' would invite scrutiny, the doubled negative cushions the claim, leaving room for nuance. Similarly, a hedge such as 'one might argue' transfers a measure of agency to the listener, who is thereby flattered into agreement rather than coerced. Rhetoricians call this the paradox of restraint: by claiming less, the speaker is often believed more.\nNone of this should be mistaken for timidity. Restraint, properly deployed, is itself a display of mastery. The novice overstates because he fears being overlooked; the expert understates because he trusts the weight of his evidence to carry the argument. In an age saturated with hyperbole, it is the measured voice — calm, qualified, and quietly certain — that increasingly commands attention.",
      "questions": [
        {
          "q": "What is the central claim of the passage?",
          "options": [
            "Persuasion depends mainly on vivid imagery.",
            "Restraint and understatement can be more persuasive than emphatic assertion.",
            "Hedging is a sign of a weak argument.",
            "Audiences prefer speakers who make absolute claims."
          ],
          "correctIndex": 1,
          "explanation": "La tesis es que la contención (understatement, hedges, concesiones) suele persuadir más que la afirmación enfática."
        },
        {
          "q": "According to the text, why does the hedge 'one might argue' work?",
          "options": [
            "It hides the speaker's true opinion.",
            "It transfers agency to the listener, flattering them into agreement.",
            "It proves the claim with evidence.",
            "It exaggerates the speaker's confidence."
          ],
          "correctIndex": 1,
          "explanation": "El texto dice que el hedge transfiere agencia al oyente, que se siente halagado y accede en vez de sentirse coaccionado."
        },
        {
          "q": "What does the author mean by 'the paradox of restraint'?",
          "options": [
            "Speakers who claim more are believed more.",
            "By claiming less, a speaker is often believed more.",
            "Restraint always indicates timidity.",
            "Evidence is irrelevant to persuasion."
          ],
          "correctIndex": 1,
          "explanation": "La paradoja consiste en que al afirmar menos ('claiming less') el orador resulta más creíble."
        },
        {
          "q": "How does the author contrast the novice and the expert?",
          "options": [
            "The novice understates; the expert overstates.",
            "Both rely on hyperbole equally.",
            "The novice overstates out of fear; the expert understates out of trust in the evidence.",
            "Neither uses rhetorical devices."
          ],
          "correctIndex": 2,
          "explanation": "El novato exagera por miedo a ser ignorado; el experto atenúa porque confía en el peso de sus pruebas."
        },
        {
          "q": "The phrase 'not unsympathetic' is offered as an example of which device?",
          "options": [
            "Anaphora",
            "Litotes",
            "Hyperbole",
            "Metaphor"
          ],
          "correctIndex": 1,
          "explanation": "'Not unsympathetic' es una litote: doble negación que afirma de forma atenuada."
        }
      ]
    },
    {
      "type": "listening",
      "skill": "listening",
      "text": "I won't pretend the rollout went smoothly; that said, the setbacks were largely logistical rather than strategic. Had we secured the vendor contracts a quarter earlier, much of the disruption could have been avoided. On balance, though, the underlying model remains sound, and I'd caution against reading too much into the early figures.",
      "question": "What is the speaker's overall stance on the rollout?",
      "options": [
        "The rollout was a strategic failure and the model is flawed.",
        "The rollout had logistical problems, but the underlying model is still sound.",
        "The rollout went smoothly with no setbacks.",
        "The early figures prove the project should be abandoned."
      ],
      "correctIndex": 1,
      "explanation": "El hablante admite contratiempos logísticos ('logistical rather than strategic') pero defiende que el modelo sigue siendo sólido y advierte contra sobreinterpretar las cifras iniciales."
    }
  ] },
  "core_practice_lvl1": { "name": "Core Practice · Level 1", "cefr": "A1–A2", "pass": 70, "exercises": [
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "I usually ___ up at seven o'clock.",
      "options": [
        "get",
        "gets",
        "getting"
      ],
      "correctIndex": 0,
      "explanation": "Con 'I' en presente simple usamos la forma base: 'get'."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "On the weekend I like to ___ my friends in the park.",
      "options": [
        "meet",
        "wash",
        "cook"
      ],
      "correctIndex": 0,
      "explanation": "'meet' (encontrarse con) es lo correcto para ver a los amigos."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "She ___ to rock music every morning.",
      "answers": [
        "listens"
      ],
      "hint": "Tercera persona singular (she).",
      "explanation": "Con 'she' añadimos -s: 'listens'."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "We bought two ___ for the concert tonight.",
      "options": [
        "tickets",
        "menus",
        "tables"
      ],
      "correctIndex": 0,
      "explanation": "Para entrar a un concierto necesitas 'tickets' (entradas)."
    },
    {
      "type": "true_false",
      "skill": "vocab",
      "statement": "A 'comedy' is a movie that makes you laugh.",
      "answer": true,
      "explanation": "Una 'comedy' es una película que te hace reír."
    },
    {
      "type": "word_order",
      "skill": "grammar",
      "words": [
        "Do",
        "you",
        "play",
        "tennis",
        "?"
      ],
      "correctOrder": [
        "Do",
        "you",
        "play",
        "tennis",
        "?"
      ],
      "hint": "Pregunta en presente simple con 'Do'."
    },
    {
      "type": "multiple_choice",
      "skill": "use",
      "question": "Choose the best reply: 'How often do you play soccer?'",
      "options": [
        "Twice a week.",
        "In the park.",
        "With my brother."
      ],
      "correctIndex": 0,
      "explanation": "'How often' pregunta por la frecuencia, así que respondemos 'Twice a week' (dos veces por semana)."
    },
    {
      "type": "fill_blank",
      "skill": "vocab",
      "sentence": "Apples and bananas are healthy ___.",
      "answers": [
        "fruit",
        "fruits"
      ],
      "hint": "Manzanas y plátanos son...",
      "explanation": "Las manzanas y los plátanos son 'fruit' (fruta)."
    },
    {
      "type": "multiple_choice",
      "skill": "use",
      "question": "You are lost. What do you say to ask for directions?",
      "options": [
        "Excuse me, how do I get to the station?",
        "I am very hungry.",
        "See you tomorrow!"
      ],
      "correctIndex": 0,
      "explanation": "Para pedir indicaciones preguntamos 'How do I get to...?'."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "Go straight and ___ left at the bank.",
      "answers": [
        "turn"
      ],
      "hint": "Verbo de instrucción (imperativo).",
      "explanation": "Damos indicaciones con el imperativo: 'turn left'."
    },
    {
      "type": "multiple_choice",
      "skill": "use",
      "question": "At the hotel reception you say:",
      "options": [
        "I'd like to book a room for two nights, please.",
        "Can I have the bill, waiter?",
        "Turn right at the corner."
      ],
      "correctIndex": 0,
      "explanation": "Para reservar habitación decimos 'I'd like to book a room'."
    },
    {
      "type": "find_error",
      "skill": "grammar",
      "question": "Encuentra el error.",
      "segments": [
        "My sister ",
        {
          "u": "don't"
        },
        " ",
        {
          "u": "work"
        },
        " on Sundays."
      ],
      "correctIndex": 0,
      "correction": "doesn't (she -> doesn't)",
      "explanation": "Con 'my sister' (=she) la negación en presente simple es 'doesn't': 'My sister doesn't work on Sundays.'"
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "In a job interview, the manager asks about your work ___.",
      "options": [
        "experience",
        "weather",
        "breakfast"
      ],
      "correctIndex": 0,
      "explanation": "'work experience' es la experiencia laboral, tema típico de una entrevista."
    },
    {
      "type": "fill_blank",
      "skill": "use",
      "sentence": "At the start of an email we write 'Dear Mr. Smith,' and at the end 'Best ___,'.",
      "answers": [
        "regards"
      ],
      "hint": "Despedida formal en un correo.",
      "explanation": "Una despedida formal habitual es 'Best regards'."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "Tomorrow it ___ be sunny and warm.",
      "options": [
        "will",
        "did",
        "was"
      ],
      "correctIndex": 0,
      "explanation": "Para el pronóstico del tiempo futuro usamos 'will': 'it will be sunny'."
    },
    {
      "type": "true_false",
      "skill": "vocab",
      "statement": "A lion is an animal you can see at the zoo.",
      "answer": true,
      "explanation": "El león ('lion') es un animal que se ve en el zoológico."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "I want to buy a new mobile phone with a good ___.",
      "options": [
        "camera",
        "kitchen",
        "garden"
      ],
      "correctIndex": 0,
      "explanation": "Un teléfono móvil tiene 'camera' (cámara)."
    },
    {
      "type": "fill_blank",
      "skill": "vocab",
      "sentence": "I use this ___ on my phone to send messages to my friends.",
      "answers": [
        "app"
      ],
      "hint": "Programa del teléfono (Internet & Apps).",
      "explanation": "Una 'app' es una aplicación del teléfono."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "My mother's brother is my ___.",
      "options": [
        "uncle",
        "aunt",
        "cousin"
      ],
      "correctIndex": 0,
      "explanation": "El hermano de tu madre es tu 'uncle' (tío)."
    },
    {
      "type": "translate",
      "skill": "use",
      "prompt": "Traduce: \"Mi ciudad es pequeña pero bonita.\"",
      "answers": [
        "my town is small but beautiful",
        "my city is small but beautiful",
        "my hometown is small but beautiful",
        "my town is small but nice",
        "my city is small but nice",
        "my town is small but pretty",
        "my city is small but pretty"
      ],
      "explanation": "My town is small but beautiful."
    },
    {
      "type": "word_order",
      "skill": "grammar",
      "words": [
        "There",
        "is",
        "a",
        "dog",
        "in",
        "the",
        "picture"
      ],
      "correctOrder": [
        "There",
        "is",
        "a",
        "dog",
        "in",
        "the",
        "picture"
      ],
      "hint": "Describir una imagen con 'There is'."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "Tomorrow I ___ going to visit my grandmother.",
      "options": [
        "am",
        "is",
        "are"
      ],
      "correctIndex": 0,
      "explanation": "Con 'I' usamos 'am': 'I am going to visit'."
    },
    {
      "type": "multiple_choice",
      "skill": "use",
      "question": "Your friend invites you to a party. The best reply is:",
      "options": [
        "Thanks! I'd love to come.",
        "Turn left at the bank.",
        "It will rain tomorrow."
      ],
      "correctIndex": 0,
      "explanation": "Aceptamos una invitación con 'I'd love to come' (me encantaría ir)."
    },
    {
      "type": "reading",
      "skill": "reading",
      "title": "My Saturday",
      "passage": "On Saturday, Anna gets up late, at ten o'clock. First, she has a big breakfast with eggs and orange juice.\nIn the afternoon, she plays tennis with her sister in the park. They love sports.\nIn the evening, Anna and her family watch a movie at home. It is a fun comedy. After the movie, she goes to bed at eleven.",
      "questions": [
        {
          "q": "What time does Anna get up on Saturday?",
          "options": [
            "At seven o'clock.",
            "At ten o'clock.",
            "At eleven o'clock.",
            "At one o'clock."
          ],
          "correctIndex": 1,
          "explanation": "El texto dice 'Anna gets up late, at ten o'clock'."
        },
        {
          "q": "Where does Anna play tennis?",
          "options": [
            "At home.",
            "At school.",
            "In the park.",
            "At the zoo."
          ],
          "correctIndex": 2,
          "explanation": "Juega al tenis 'in the park' (en el parque)."
        },
        {
          "q": "What kind of movie do they watch?",
          "options": [
            "A comedy.",
            "A horror movie.",
            "A documentary.",
            "A cartoon."
          ],
          "correctIndex": 0,
          "explanation": "El texto dice 'a fun comedy'."
        },
        {
          "q": "Who does Anna play tennis with?",
          "options": [
            "Her mother.",
            "Her sister.",
            "Her friend.",
            "Her uncle."
          ],
          "correctIndex": 1,
          "explanation": "Juega con 'her sister' (su hermana)."
        }
      ]
    },
    {
      "type": "listening",
      "skill": "listening",
      "text": "Good morning! Here is the weather for today. It is cloudy and cold this morning. In the afternoon it will rain, so please take an umbrella.",
      "question": "What should you take this afternoon?",
      "options": [
        "Sunglasses",
        "An umbrella",
        "A hat"
      ],
      "correctIndex": 1,
      "explanation": "El locutor dice que lloverá por la tarde, así que debes llevar 'an umbrella' (un paraguas)."
    }
  ] },
  "core_practice_lvl2": { "name": "Core Practice · Level 2", "cefr": "B1", "pass": 70, "exercises": [
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "If the train ___ late again, I'll ask for a refund.",
      "options": [
        "will be",
        "is",
        "was",
        "would be"
      ],
      "correctIndex": 1,
      "explanation": "En el primer condicional, tras 'if' usamos presente simple: 'if the train is late'."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "I've been learning German ___ three years.",
      "options": [
        "since",
        "for",
        "ago",
        "during"
      ],
      "correctIndex": 1,
      "explanation": "Con un periodo de tiempo (three years) usamos 'for'; 'since' se usa con un punto de inicio."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "She asked me where I ___ from.",
      "options": [
        "come",
        "am coming",
        "came",
        "will come"
      ],
      "correctIndex": 2,
      "explanation": "En estilo indirecto el presente 'come' retrocede a pasado 'came'."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "The new app ___ by millions of people every day.",
      "options": [
        "uses",
        "is used",
        "is using",
        "use"
      ],
      "correctIndex": 1,
      "explanation": "Voz pasiva en presente: 'is used' porque la acción la reciben los usuarios."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "During the job interview, try to show your main ___ and skills.",
      "options": [
        "weaknesses",
        "strengths",
        "complaints",
        "delays"
      ],
      "correctIndex": 1,
      "explanation": "En una entrevista quieres destacar tus 'strengths' (fortalezas)."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "I'd like to make a ___ about the dirty room and the broken air conditioning.",
      "options": [
        "compliment",
        "reservation",
        "complaint",
        "discount"
      ],
      "correctIndex": 2,
      "explanation": "'Make a complaint' = presentar una queja, lo apropiado para problemas en el hotel."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "We need to reduce pollution to protect the ___.",
      "options": [
        "environment",
        "advertisement",
        "headline",
        "interview"
      ],
      "correctIndex": 0,
      "explanation": "'Environment' = medio ambiente, el tema relacionado con la contaminación."
    },
    {
      "type": "multiple_choice",
      "skill": "use",
      "question": "Choose the most polite way to negotiate a lower price.",
      "options": [
        "Give me a discount now.",
        "Would you be able to lower the price a little?",
        "The price is too high, change it.",
        "I won't pay that."
      ],
      "correctIndex": 1,
      "explanation": "'Would you be able to...?' es la forma educada y tipica de negociar en B1."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "My flight was cancelled, ___ I had to book a new one.",
      "answers": [
        "so"
      ],
      "hint": "Conector de consecuencia.",
      "explanation": "'So' introduce la consecuencia: el vuelo se cancelo, por eso reservo otro."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "If I ___ more money, I would travel around the world.",
      "answers": [
        "had"
      ],
      "hint": "Segundo condicional, situacion imaginaria.",
      "explanation": "En el segundo condicional usamos pasado simple tras 'if': 'if I had'."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "She's the doctor ___ helped me last year.",
      "answers": [
        "who",
        "that"
      ],
      "hint": "Pronombre relativo para personas.",
      "explanation": "Para personas usamos 'who' (o 'that') como pronombre relativo."
    },
    {
      "type": "fill_blank",
      "skill": "vocab",
      "sentence": "I can't afford a new car right now; I need to ___ money first.",
      "answers": [
        "save",
        "save up"
      ],
      "hint": "Lo contrario de 'spend'.",
      "explanation": "'Save (up) money' = ahorrar dinero, opuesto a gastar."
    },
    {
      "type": "fill_blank",
      "skill": "vocab",
      "sentence": "You should make your social media account ___ so strangers cannot see your posts.",
      "answers": [
        "private"
      ],
      "hint": "Lo contrario de 'public'; protege tu informacion.",
      "explanation": "'Make your account private' = poner la cuenta en privado para proteger tu privacidad en redes sociales."
    },
    {
      "type": "true_false",
      "skill": "vocab",
      "statement": "A 'headline' is the short title at the top of a news story.",
      "answer": true,
      "explanation": "'Headline' es el titular, el titulo corto de una noticia."
    },
    {
      "type": "true_false",
      "skill": "grammar",
      "statement": "'I have visited Paris in 2019.' is correct English.",
      "answer": false,
      "explanation": "Con un tiempo pasado terminado (in 2019) se usa pasado simple: 'I visited Paris in 2019'."
    },
    {
      "type": "true_false",
      "skill": "vocab",
      "statement": "If you 'get on well with' someone, you have a bad relationship.",
      "answer": false,
      "explanation": "'Get on well with' significa llevarse bien, una buena relacion."
    },
    {
      "type": "word_order",
      "skill": "grammar",
      "words": [
        "I",
        "have",
        "never",
        "been",
        "abroad"
      ],
      "correctOrder": [
        "I",
        "have",
        "never",
        "been",
        "abroad"
      ],
      "hint": "Presente perfecto con 'never' entre el auxiliar y el participio."
    },
    {
      "type": "word_order",
      "skill": "grammar",
      "words": [
        "What",
        "time",
        "does",
        "the",
        "museum",
        "open"
      ],
      "correctOrder": [
        "What",
        "time",
        "does",
        "the",
        "museum",
        "open"
      ],
      "hint": "Pregunta en presente simple con 'does'."
    },
    {
      "type": "word_order",
      "skill": "use",
      "words": [
        "Could",
        "you",
        "tell",
        "me",
        "the",
        "way",
        "please"
      ],
      "correctOrder": [
        "Could",
        "you",
        "tell",
        "me",
        "the",
        "way",
        "please"
      ],
      "hint": "Peticion educada para pedir indicaciones."
    },
    {
      "type": "find_error",
      "skill": "grammar",
      "question": "Encuentra el error.",
      "segments": [
        "The internet ",
        {
          "u": "have"
        },
        " changed how we ",
        {
          "u": "communicate"
        },
        " with friends."
      ],
      "correctIndex": 0,
      "correction": "has (the internet -> has)",
      "explanation": "'The internet' es singular (it), por eso el presente perfecto es 'has changed'."
    },
    {
      "type": "find_error",
      "skill": "grammar",
      "question": "Encuentra el error.",
      "segments": [
        "If you ",
        {
          "u": "will exercise"
        },
        " regularly, you ",
        {
          "u": "will feel"
        },
        " healthier."
      ],
      "correctIndex": 0,
      "correction": "exercise (if + presente simple)",
      "explanation": "En el primer condicional la clausula con 'if' va en presente simple: 'if you exercise'."
    },
    {
      "type": "translate",
      "skill": "use",
      "prompt": "Traduce: \"Me gustaría hacer una reserva para dos personas.\"",
      "answers": [
        "i would like to make a reservation for two people",
        "i'd like to make a reservation for two people",
        "i would like to book a table for two people",
        "i'd like to book a table for two people",
        "i'd like to book a table for two"
      ],
      "explanation": "I'd like to make a reservation for two people."
    },
    {
      "type": "translate",
      "skill": "use",
      "prompt": "Traduce: \"He estado estudiando inglés desde el año pasado.\"",
      "answers": [
        "i have been studying english since last year",
        "i've been studying english since last year"
      ],
      "explanation": "I have been studying English since last year (presente perfecto continuo con 'since')."
    },
    {
      "type": "reading",
      "skill": "reading",
      "title": "Moving to the City",
      "passage": "Last September, Marta moved from a small town to a big city to start university. At first, everything felt difficult. The flat she rented was small and noisy, and her neighbours often played loud music late at night. She also found it hard to make new friends because everyone seemed busy.\nAfter a few weeks, things slowly improved. Marta joined a photography club at the university, where she met people who shared her interests. She also learned to use the city's public transport, which saved her a lot of money compared to taking taxis. Although she still misses the quiet streets of her home town, she now feels that moving to the city was the right decision for her future.",
      "questions": [
        {
          "q": "Why did Marta move to the city?",
          "options": [
            "To find a quieter place",
            "To start university",
            "To live with her family",
            "To open a photography shop"
          ],
          "correctIndex": 1,
          "explanation": "El texto dice que se mudo 'to start university'."
        },
        {
          "q": "What problem did Marta have at the beginning?",
          "options": [
            "Her flat was small and noisy",
            "She had no money for university",
            "She could not find a flat",
            "Her club was too far away"
          ],
          "correctIndex": 0,
          "explanation": "El piso era pequeno y ruidoso y los vecinos ponian musica alta."
        },
        {
          "q": "How did Marta make new friends?",
          "options": [
            "Through her neighbours",
            "By taking taxis",
            "By joining a photography club",
            "At her old town"
          ],
          "correctIndex": 2,
          "explanation": "Conocio gente con sus intereses en el club de fotografia."
        },
        {
          "q": "How does Marta feel about her decision now?",
          "options": [
            "She regrets it completely",
            "She thinks it was right for her future",
            "She wants to move back immediately",
            "She is still unsure"
          ],
          "correctIndex": 1,
          "explanation": "Al final siente que mudarse fue la decision correcta para su futuro."
        }
      ]
    },
    {
      "type": "listening",
      "skill": "listening",
      "text": "Good afternoon, passengers. The 3 o'clock train to Manchester has been delayed by about forty minutes because of a technical problem. We are very sorry for the inconvenience. If you have a connecting train, please speak to a member of staff at the information desk.",
      "question": "What is the main message of the announcement?",
      "options": [
        "The train has been cancelled completely",
        "The train is delayed and staff can help with connections",
        "The train will leave forty minutes early",
        "Passengers must change platforms"
      ],
      "correctIndex": 1,
      "explanation": "El tren tiene un retraso de 40 minutos y el personal ayuda con las conexiones."
    }
  ] },
  "core_practice_lvl3": { "name": "Core Practice · Level 3", "cefr": "B1–B2", "pass": 72, "exercises": [
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "In a debate, a good speaker always considers the other side. If the data ___ different, our whole argument would collapse.",
      "options": [
        "is",
        "were",
        "was being",
        "will be"
      ],
      "correctIndex": 1,
      "explanation": "Es un condicional irreal (segundo condicional); con 'if' usamos 'were' para hipotesis poco probables: 'If the data were different'."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "The minister insisted that the treaty ___ signed before the summit ended.",
      "options": [
        "is",
        "be",
        "was being",
        "will be"
      ],
      "correctIndex": 1,
      "explanation": "Tras verbos de mandato como 'insist that', se usa el subjuntivo en ingles: la forma base 'be'."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "Diplomats often use cautious language. 'This proposal ___ lead to a lasting agreement' sounds more tentative than 'will'.",
      "options": [
        "must",
        "could",
        "should have",
        "is going to"
      ],
      "correctIndex": 1,
      "explanation": "'could' expresa posibilidad de forma cauta, tipica del lenguaje diplomatico para no comprometerse."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "By the time the crisis team arrived, the situation ___ already worse.",
      "options": [
        "has got",
        "had got",
        "was getting got",
        "gets"
      ],
      "correctIndex": 1,
      "explanation": "El pasado perfecto 'had got' indica una accion anterior a otro momento pasado ('by the time ... arrived')."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "If economists had predicted the recession earlier, governments ___ have acted sooner.",
      "answers": [
        "would",
        "could",
        "might"
      ],
      "hint": "Tercer condicional: resultado hipotetico en el pasado.",
      "explanation": "En el tercer condicional el resultado usa 'would/could/might + have + participio'."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "The philosopher argued that happiness ___ not be measured only in money.",
      "answers": [
        "should",
        "can",
        "could"
      ],
      "hint": "Verbo modal que expresa recomendacion o posibilidad.",
      "explanation": "'should/can/could not be measured' encaja con el sentido argumentativo de la frase."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "Scientists are still debating ___ climate models can fully predict the future.",
      "answers": [
        "whether",
        "if"
      ],
      "hint": "Introduce una pregunta indirecta de si/no.",
      "explanation": "'whether' (o 'if') introduce una pregunta indirecta de si o no."
    },
    {
      "type": "find_error",
      "skill": "grammar",
      "question": "Encuentra el error en este argumento.",
      "segments": [
        "",
        {
          "u": "Despite of"
        },
        " the strong evidence, many people ",
        {
          "u": "still refuse"
        },
        " to change their minds."
      ],
      "correctIndex": 0,
      "correction": "Despite of -> Despite (o 'In spite of')",
      "explanation": "'Despite' no lleva 'of'; lo correcto es 'Despite the strong evidence' o 'In spite of the strong evidence'."
    },
    {
      "type": "find_error",
      "skill": "grammar",
      "question": "Encuentra el error en esta oracion sobre tecnologia.",
      "segments": [
        "The new policy will affect ",
        {
          "u": "less"
        },
        " workers than ",
        {
          "u": "expected"
        },
        ", critics say."
      ],
      "correctIndex": 0,
      "correction": "less -> fewer",
      "explanation": "'workers' es contable y plural, asi que se usa 'fewer', no 'less'."
    },
    {
      "type": "word_order",
      "skill": "grammar",
      "words": [
        "Not",
        "only",
        "did",
        "she",
        "win",
        "the",
        "debate",
        "but",
        "she",
        "also",
        "changed",
        "minds"
      ],
      "correctOrder": [
        "Not",
        "only",
        "did",
        "she",
        "win",
        "the",
        "debate",
        "but",
        "she",
        "also",
        "changed",
        "minds"
      ],
      "hint": "Inversion con 'Not only ... but also'."
    },
    {
      "type": "word_order",
      "skill": "grammar",
      "words": [
        "The",
        "more",
        "you",
        "practise",
        "arguing",
        "the",
        "easier",
        "it",
        "becomes"
      ],
      "correctOrder": [
        "The",
        "more",
        "you",
        "practise",
        "arguing",
        "the",
        "easier",
        "it",
        "becomes"
      ],
      "hint": "Estructura comparativa 'The more ... the easier ...'."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "In a balanced essay you should acknowledge the opposing view before you ___ it.",
      "options": [
        "refute",
        "confuse",
        "postpone",
        "translate"
      ],
      "correctIndex": 0,
      "explanation": "'refute' significa rebatir o refutar un argumento, lo opuesto a aceptarlo."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "A claim that has no real evidence behind it is often called ___.",
      "options": [
        "groundless",
        "grounded",
        "downhill",
        "outspoken"
      ],
      "correctIndex": 0,
      "explanation": "'groundless' significa infundado, sin base ni pruebas."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "During the negotiation, both sides had to make ___ to reach a deal.",
      "options": [
        "compromises",
        "compliments",
        "commutes",
        "components"
      ],
      "correctIndex": 0,
      "explanation": "'compromises' (concesiones) es lo que se hace para llegar a un acuerdo; no confundir con 'compromiso' personal."
    },
    {
      "type": "true_false",
      "skill": "vocab",
      "statement": "If an argument is 'compelling', it is weak and unconvincing.",
      "answer": false,
      "explanation": "'compelling' significa convincente o persuasivo, justo lo contrario de debil."
    },
    {
      "type": "true_false",
      "skill": "vocab",
      "statement": "A 'bias' is a tendency to favour one side unfairly.",
      "answer": true,
      "explanation": "'bias' es un sesgo o prejuicio que inclina a favor de un lado de forma injusta."
    },
    {
      "type": "true_false",
      "skill": "vocab",
      "statement": "In economics, 'sustainable' growth is growth that cannot continue over time.",
      "answer": false,
      "explanation": "'sustainable' significa sostenible, es decir, que SI puede mantenerse en el tiempo."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "Choose the best linking phrase: 'The plan is cheap; ___, it may harm the environment.'",
      "options": [
        "therefore",
        "however",
        "for example",
        "in short"
      ],
      "correctIndex": 1,
      "explanation": "'however' introduce un contraste entre lo barato y el dano ambiental."
    },
    {
      "type": "translate",
      "skill": "use",
      "prompt": "Traduce: \"Por un lado, la tecnologia ahorra tiempo; por otro lado, crea dependencia.\"",
      "answers": [
        "on the one hand, technology saves time; on the other hand, it creates dependence",
        "on one hand, technology saves time; on the other hand, it creates dependency",
        "on the one hand technology saves time on the other hand it creates dependence",
        "on the one hand, technology saves time; on the other hand, it creates dependency"
      ],
      "explanation": "'On the one hand ... on the other hand ...' es la estructura para contrastar dos puntos de vista."
    },
    {
      "type": "translate",
      "skill": "use",
      "prompt": "Traduce: \"Estoy totalmente de acuerdo con tu argumento.\"",
      "answers": [
        "i totally agree with your argument",
        "i completely agree with your argument",
        "i fully agree with your argument"
      ],
      "explanation": "'I totally/completely agree with your argument' expresa acuerdo total."
    },
    {
      "type": "translate",
      "skill": "use",
      "prompt": "Traduce: \"Deberiamos tener en cuenta el impacto a largo plazo.\"",
      "answers": [
        "we should take into account the long-term impact",
        "we should consider the long-term impact",
        "we should take the long-term impact into account"
      ],
      "explanation": "'take into account' = tener en cuenta; 'long-term impact' = impacto a largo plazo."
    },
    {
      "type": "multiple_choice",
      "skill": "use",
      "question": "Complete the concession: 'Admittedly, the new law is costly, ___ it protects public health.'",
      "options": [
        "but",
        "because",
        "so that",
        "unless"
      ],
      "correctIndex": 0,
      "explanation": "Tras 'Admittedly' (se admite que...) usamos 'but' para introducir la ventaja que compensa."
    },
    {
      "type": "fill_blank",
      "skill": "use",
      "sentence": "To sum ___, the benefits of the reform clearly outweigh the risks.",
      "answers": [
        "up"
      ],
      "hint": "Phrasal verb para concluir un argumento.",
      "explanation": "'To sum up' significa 'en resumen / para concluir'."
    },
    {
      "type": "reading",
      "skill": "reading",
      "title": "Should Social Media Be Regulated?",
      "passage": "The debate over regulating social media has grown louder in recent years. Supporters of regulation argue that platforms spread misinformation quickly and can damage democracy. They believe governments should force companies to remove false content and protect users' data.\nOpponents, however, warn that strict rules could limit free speech. They point out that deciding what is 'false' is not always simple, and that governments might abuse such power to silence critics. Instead, they prefer that companies regulate themselves.\nMost experts agree that some balance is needed. They suggest clear rules against clearly harmful content, combined with transparency about how platforms decide what users see. The challenge, they say, is protecting both safety and freedom at the same time.",
      "questions": [
        {
          "q": "What is the main topic of the passage?",
          "options": [
            "How to create a social media account",
            "Whether social media should be regulated",
            "Why social media is free to use",
            "How to gain followers online"
          ],
          "correctIndex": 1,
          "explanation": "El texto trata el debate sobre si las redes sociales deben regularse."
        },
        {
          "q": "Why do supporters want regulation?",
          "options": [
            "Because platforms spread misinformation and can harm democracy",
            "Because companies make too much money",
            "Because they dislike new technology",
            "Because users want more advertising"
          ],
          "correctIndex": 0,
          "explanation": "El segundo parrafo dice que difunden desinformacion y pueden danar la democracia."
        },
        {
          "q": "What is the opponents' main concern?",
          "options": [
            "That regulation could limit free speech",
            "That platforms are too slow",
            "That users pay too much",
            "That there are too few platforms"
          ],
          "correctIndex": 0,
          "explanation": "Los oponentes temen que reglas estrictas limiten la libertad de expresion."
        },
        {
          "q": "According to most experts, what is the real challenge?",
          "options": [
            "Making platforms more profitable",
            "Removing all content immediately",
            "Balancing safety and freedom at the same time",
            "Banning social media completely"
          ],
          "correctIndex": 2,
          "explanation": "El ultimo parrafo dice que el reto es proteger seguridad y libertad a la vez."
        }
      ]
    },
    {
      "type": "listening",
      "skill": "listening",
      "text": "Welcome to today's discussion on the future of work. Many people fear that automation will destroy jobs. However, history shows that new technologies usually create new kinds of work as old ones disappear. The real question is not whether jobs will change, but whether workers will get the training they need to adapt.",
      "question": "What is the speaker's main point?",
      "options": [
        "Automation will destroy all jobs permanently",
        "The key issue is whether workers can be retrained to adapt",
        "New technology should be banned",
        "Jobs in the future will stay exactly the same"
      ],
      "correctIndex": 1,
      "explanation": "El hablante dice que el verdadero problema es si los trabajadores recibiran la formacion necesaria para adaptarse."
    }
  ] },
  "core_practice_lvl4": { "name": "Core Practice · Level 4", "cefr": "A2–B1", "pass": 70, "exercises": [
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "In a story, the sequence of events that make up the action is called the ___.",
      "options": [
        "plot",
        "cover",
        "author"
      ],
      "correctIndex": 0,
      "explanation": "El 'plot' (la trama) es la secuencia de eventos de una historia."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "The novel ___ by a famous writer in 1850.",
      "options": [
        "was written",
        "wrote",
        "is writing"
      ],
      "correctIndex": 0,
      "explanation": "Voz pasiva en pasado: 'was' + participio 'written'."
    },
    {
      "type": "fill_blank",
      "skill": "vocab",
      "sentence": "The main character of a story is called the ___.",
      "answers": [
        "protagonist",
        "main character"
      ],
      "hint": "El personaje central.",
      "explanation": "El 'protagonist' es el personaje principal de la historia."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "A 'mystery' novel usually contains a crime and a ___ who solves it.",
      "options": [
        "detective",
        "painter",
        "dancer"
      ],
      "correctIndex": 0,
      "explanation": "En el género de misterio, un 'detective' resuelve el crimen."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "If I ___ more time, I would read more poetry.",
      "answers": [
        "had"
      ],
      "hint": "Segundo condicional, pasado simple.",
      "explanation": "En el segundo condicional usamos 'if + past simple': 'If I had'."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "This is the writer ___ wrote my favourite fantasy novel.",
      "options": [
        "who",
        "which",
        "where"
      ],
      "correctIndex": 0,
      "explanation": "Para personas usamos el pronombre relativo 'who'."
    },
    {
      "type": "true_false",
      "skill": "vocab",
      "statement": "'Setting' refers to the time and place where a story happens.",
      "answer": true,
      "explanation": "El 'setting' es el lugar y el tiempo donde ocurre la historia."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "High fantasy stories often take place in an imaginary ___ with magic and other creatures.",
      "options": [
        "world",
        "office",
        "supermarket"
      ],
      "correctIndex": 0,
      "explanation": "La alta fantasía ocurre en un 'world' (mundo) imaginario."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "She has ___ three graphic novels since January.",
      "answers": [
        "written"
      ],
      "hint": "Present perfect, participio de 'write'.",
      "explanation": "Present perfect: 'has' + participio 'written'."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "The director said the film ___ shot in Italy.",
      "options": [
        "had been",
        "have been",
        "has being"
      ],
      "correctIndex": 0,
      "explanation": "Pasado perfecto en pasiva: 'had been' + participio 'shot'."
    },
    {
      "type": "word_order",
      "skill": "grammar",
      "words": [
        "The",
        "poem",
        "is",
        "full",
        "of",
        "vivid",
        "imagery"
      ],
      "correctOrder": [
        "The",
        "poem",
        "is",
        "full",
        "of",
        "vivid",
        "imagery"
      ],
      "hint": "Describe la 'imagery' del poema."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "A piece of writing that reviews and judges a book or film is called a ___.",
      "options": [
        "review",
        "recipe",
        "ticket"
      ],
      "correctIndex": 0,
      "explanation": "Un 'review' (reseña) analiza y valora una obra; es el término más natural en este nivel."
    },
    {
      "type": "fill_blank",
      "skill": "vocab",
      "sentence": "In a play, the words spoken by characters are called the ___.",
      "answers": [
        "dialogue",
        "dialog"
      ],
      "hint": "Lo que dicen los personajes.",
      "explanation": "El 'dialogue' es la conversación entre personajes."
    },
    {
      "type": "find_error",
      "skill": "grammar",
      "question": "Encuentra el error.",
      "segments": [
        "The story ",
        {
          "u": "were"
        },
        " written ",
        {
          "u": "by"
        },
        " a young author."
      ],
      "correctIndex": 0,
      "correction": "was (the story -> was)",
      "explanation": "Con 'the story' (singular) la pasiva es 'was written'."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "While the actor ___ his lines, the lights suddenly went out.",
      "options": [
        "was reading",
        "reads",
        "read"
      ],
      "correctIndex": 0,
      "explanation": "Pasado continuo para una acción en progreso: 'was reading'."
    },
    {
      "type": "translate",
      "skill": "use",
      "prompt": "Traduce: \"El libro fue escrito por ella.\"",
      "answers": [
        "the book was written by her"
      ],
      "explanation": "Voz pasiva: 'The book was written by her.'"
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "Magical realism mixes ordinary life with ___ events that seem normal to the characters.",
      "options": [
        "magical",
        "boring",
        "cheap"
      ],
      "correctIndex": 0,
      "explanation": "El realismo mágico combina la vida cotidiana con sucesos 'magical'."
    },
    {
      "type": "fill_blank",
      "skill": "use",
      "sentence": "The plot was confusing; ___, the characters were unforgettable.",
      "answers": [
        "however",
        "nevertheless"
      ],
      "hint": "Conector de contraste.",
      "explanation": "'However' introduce un contraste entre las dos ideas."
    },
    {
      "type": "true_false",
      "skill": "vocab",
      "statement": "An 'editor' is the person who corrects and improves a text before publishing.",
      "answer": true,
      "explanation": "El 'editor' revisa y mejora el texto antes de publicarlo."
    },
    {
      "type": "translate",
      "skill": "use",
      "prompt": "Traduce: \"Acabo de terminar de leer una novela de misterio.\"",
      "answers": [
        "i have just finished reading a mystery novel",
        "i've just finished reading a mystery novel"
      ],
      "explanation": "Present perfect con 'just': 'I have just finished reading a mystery novel.'"
    },
    {
      "type": "multiple_choice",
      "skill": "use",
      "question": "Choose the best connector: \"He pitched the screenplay, ___ the studio rejected it.\"",
      "options": [
        "but",
        "because",
        "so"
      ],
      "correctIndex": 0,
      "explanation": "'But' marca el contraste: presentó el guion, pero lo rechazaron."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "The journalist asked the witness what he ___ seen that night.",
      "answers": [
        "had"
      ],
      "hint": "Estilo indirecto, pasado perfecto.",
      "explanation": "En reported speech el present perfect cambia a 'had seen'."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "Stand-up comedy and satire are mainly used to make people ___ while criticizing society.",
      "options": [
        "laugh",
        "cry",
        "sleep"
      ],
      "correctIndex": 0,
      "explanation": "La comedia y la sátira buscan hacer 'laugh' (reír) a la vez que critican."
    },
    {
      "type": "reading",
      "skill": "reading",
      "title": "The First Detective Story",
      "passage": "Many readers love mystery novels, but few know how the genre began. In 1841, the American writer Edgar Allan Poe published a short story about a clever detective named Auguste Dupin. In the story, Dupin solves a strange crime that the police cannot explain.\nPoe's idea was new. He created a smart hero who uses logic and small clues to find the truth. Later writers, such as Arthur Conan Doyle with Sherlock Holmes, followed Poe's example.\nToday, the mystery genre is one of the most popular in the world. Books, films, and series all use the same basic idea that Poe invented almost two hundred years ago.",
      "questions": [
        {
          "q": "What is the main idea of the text?",
          "options": [
            "How the mystery genre began",
            "How to become a detective",
            "Why people stopped reading",
            "Where Poe was born"
          ],
          "correctIndex": 0,
          "explanation": "El texto explica el origen del género de misterio."
        },
        {
          "q": "Who was Auguste Dupin?",
          "options": [
            "A detective in Poe's story",
            "A real policeman",
            "Poe's brother",
            "A film director"
          ],
          "correctIndex": 0,
          "explanation": "Dupin es el detective del relato de Poe."
        },
        {
          "q": "How does Dupin solve the crime?",
          "options": [
            "By using logic and clues",
            "By using magic",
            "By asking the police",
            "By guessing"
          ],
          "correctIndex": 0,
          "explanation": "Dupin usa la lógica y las pequeñas pistas ('clues')."
        },
        {
          "q": "What does the text say about the mystery genre today?",
          "options": [
            "It is very popular worldwide",
            "It has disappeared",
            "Only Poe writes it",
            "It is only on the radio"
          ],
          "correctIndex": 0,
          "explanation": "El texto dice que hoy es uno de los géneros más populares del mundo."
        }
      ]
    },
    {
      "type": "listening",
      "skill": "listening",
      "text": "Welcome to our poetry workshop. Tonight, each student will read one short poem aloud. Remember that spoken word is not only about the words, but also about your voice and your emotions. Speak slowly and feel every line.",
      "question": "What is the speaker's main advice for the poetry reading?",
      "options": [
        "Read fast and quietly",
        "Use your voice and emotions, and speak slowly",
        "Write a new poem now"
      ],
      "correctIndex": 1,
      "explanation": "El hablante aconseja usar la voz y las emociones y hablar despacio."
    }
  ] },
  "core_practice_lvl5": { "name": "Core Practice · Level 5", "cefr": "B2–C1", "pass": 75, "exercises": [
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "Modern Stoicism encourages us to distinguish between what we can control and what we cannot; this practice is often summarised as cultivating ___.",
      "options": [
        "equanimity",
        "complacency",
        "indignation",
        "extravagance"
      ],
      "correctIndex": 0,
      "explanation": "'Equanimity' (ecuanimidad, calma mental) es justamente lo que cultiva el estoicismo. 'Complacency' es autocomplacencia, 'indignation' indignacion y 'extravagance' derroche."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "The Paradox of Choice suggests that, ___ more options consumers are given, the less satisfied they tend to feel.",
      "options": [
        "the more",
        "the most",
        "as more",
        "by more"
      ],
      "correctIndex": 0,
      "explanation": "Estructura comparativa correlativa 'the more... the less'. Se usa 'the + comparativo' en ambas mitades."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "Had architects considered emotional wellbeing, the building ___ have felt far less oppressive.",
      "answers": [
        "would"
      ],
      "hint": "Tercer condicional con inversion (Had + sujeto...).",
      "explanation": "Tras la inversion condicional 'Had architects considered...', la oracion principal usa 'would have + participio'."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "Critics of biohacking warn that treating the body as a system to be ___ can erode our sense of being more than mere machines.",
      "options": [
        "optimised",
        "demolished",
        "narrated",
        "befriended"
      ],
      "correctIndex": 0,
      "explanation": "El biohacking gira en torno a 'optimise' (optimizar) el rendimiento corporal. Las demas no encajan con la metafora del cuerpo como sistema."
    },
    {
      "type": "true_false",
      "skill": "vocab",
      "statement": "In the debate on the 'medicalization of sadness', the term 'medicalization' refers to framing ordinary human emotions as medical conditions requiring treatment.",
      "answer": true,
      "explanation": "Correcto: 'medicalization' describe el proceso de convertir experiencias normales (como la tristeza) en problemas medicos a tratar."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "The figure of the flaneur is best described as someone who ___ the city, observing urban life with detached curiosity.",
      "options": [
        "strolls through",
        "presides over",
        "barricades",
        "demolishes"
      ],
      "correctIndex": 0,
      "explanation": "El flaneur 'strolls through' (deambula por) la ciudad observandola. Los demas verbos implican autoridad o destruccion, ajenos al concepto."
    },
    {
      "type": "find_error",
      "skill": "grammar",
      "question": "Encuentra el error en esta frase sobre el turismo espacial.",
      "segments": [
        "Space tourism ",
        {
          "u": "is often criticised"
        },
        " for ",
        {
          "u": "deepen"
        },
        " existing inequalities between rich and poor."
      ],
      "correctIndex": 1,
      "correction": "deepening (for + gerundio)",
      "explanation": "Tras la preposicion 'for' se necesita un gerundio: 'for deepening', no el infinitivo 'deepen'."
    },
    {
      "type": "multiple_choice",
      "skill": "use",
      "question": "Choose the option that best completes the sentence: 'The notion of infinite growth on a finite planet is, ___, a logical contradiction.'",
      "options": [
        "by all accounts",
        "if anything",
        "for the most part",
        "in essence"
      ],
      "correctIndex": 3,
      "explanation": "'In essence' (en esencia) introduce la idea central. Las demas expresiones no senalan que se esta dando la definicion fundamental de la contradiccion."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "Were automation ___ to replace half of all jobs, societies would need to rethink how income is distributed.",
      "answers": [
        "ever"
      ],
      "hint": "Adverbio que refuerza una condicion hipotetica poco probable.",
      "explanation": "'Were automation ever to replace...' es una condicional formal con inversion; 'ever' enfatiza el caracter hipotetico."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "Deep ecology argues that nature possesses ___ value, independent of any usefulness it may have to humans.",
      "options": [
        "intrinsic",
        "marginal",
        "negotiable",
        "provisional"
      ],
      "correctIndex": 0,
      "explanation": "La ecologia profunda defiende el valor 'intrinsic' (intrinseco) de la naturaleza, no dependiente de su utilidad. Los demas terminos lo subordinan o relativizan."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "Carbon offsets are frequently described as an illusion, ___ allow polluters to continue emitting while claiming to be green.",
      "options": [
        "in that they",
        "in which",
        "whereby it",
        "for they"
      ],
      "correctIndex": 0,
      "explanation": "'In that they' (en el sentido de que) introduce la razon explicativa con sujeto plural 'they' concordando con 'offsets' y el verbo finito 'allow'. Las otras opciones rompen la concordancia o el sentido."
    },
    {
      "type": "true_false",
      "skill": "vocab",
      "statement": "Within discussions of the Singularity, 'exponential' growth means a rate of increase that itself keeps accelerating over time.",
      "answer": true,
      "explanation": "Correcto: el crecimiento 'exponential' se acelera continuamente, una idea central en los argumentos sobre la Singularidad tecnologica."
    },
    {
      "type": "find_error",
      "skill": "grammar",
      "question": "Encuentra el error en esta frase sobre el capitalismo de vigilancia.",
      "segments": [
        "Surveillance capitalism depends on ",
        {
          "u": "harvest"
        },
        " personal data, ",
        {
          "u": "which"
        },
        " is then sold to advertisers."
      ],
      "correctIndex": 0,
      "correction": "harvesting (on + gerundio)",
      "explanation": "Tras 'depends on' se requiere gerundio: 'harvesting'. La clausula relativa 'which' es correcta."
    },
    {
      "type": "multiple_choice",
      "skill": "use",
      "question": "Select the most natural completion: 'Far from strengthening democracy, post-truth politics ___ public trust in shared facts.'",
      "options": [
        "erodes",
        "rehearses",
        "compiles",
        "delegates"
      ],
      "correctIndex": 0,
      "explanation": "'Erodes' (erosiona) describe el desgaste de la confianza publica. Los demas verbos no se colocan con 'trust' en este sentido."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "Some argue that the nation-state, ___ relevance was once unquestioned, is gradually losing its authority.",
      "answers": [
        "whose"
      ],
      "hint": "Relativo posesivo.",
      "explanation": "Se necesita el relativo posesivo 'whose' para vincular 'the nation-state' con 'relevance'."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "Defenders of subcultures argue that they offer a sense of belonging to those who feel ___ from the mainstream.",
      "options": [
        "estranged",
        "endorsed",
        "reconciled",
        "indebted"
      ],
      "correctIndex": 0,
      "explanation": "'Estranged' (alienado, distanciado) describe a quienes no encajan en la corriente dominante. Las demas opciones implican aceptacion u obligacion."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "Those who call for more nuance in debates about cancel culture insist that public figures ___ be judged solely on a single decontextualised remark.",
      "options": [
        "should not",
        "must not have",
        "needn't to",
        "won't to"
      ],
      "correctIndex": 0,
      "explanation": "'Should not be judged' expresa la recomendacion/consejo de forma correcta. Las demas formas modales son agramaticales."
    },
    {
      "type": "translate",
      "skill": "use",
      "prompt": "Traduce: \"La medicalizacion de la tristeza convierte una emocion normal en una enfermedad.\"",
      "answers": [
        "the medicalization of sadness turns a normal emotion into an illness",
        "the medicalization of sadness turns a normal emotion into a disease",
        "the medicalisation of sadness turns a normal emotion into an illness",
        "the medicalization of sadness turns a normal emotion into a sickness",
        "the medicalisation of sadness turns a normal emotion into a disease"
      ],
      "explanation": "The medicalization of sadness turns a normal emotion into an illness. 'Turn ... into' equivale a 'convertir en'."
    },
    {
      "type": "translate",
      "skill": "use",
      "prompt": "Traduce: \"Cuantas mas opciones tenemos, mas dificil resulta elegir.\"",
      "answers": [
        "the more options we have, the harder it is to choose",
        "the more options we have the harder it is to choose",
        "the more choices we have, the harder it is to choose",
        "the more options we have, the more difficult it is to choose"
      ],
      "explanation": "The more options we have, the harder it is to choose. Estructura comparativa correlativa 'the more... the harder'."
    },
    {
      "type": "word_order",
      "skill": "grammar",
      "words": [
        "Only",
        "by",
        "questioning",
        "infinite",
        "growth",
        "can",
        "we",
        "imagine",
        "a",
        "sustainable",
        "future"
      ],
      "correctOrder": [
        "Only",
        "by",
        "questioning",
        "infinite",
        "growth",
        "can",
        "we",
        "imagine",
        "a",
        "sustainable",
        "future"
      ],
      "hint": "Inversion tras 'Only by + gerundio' (auxiliar antes del sujeto)."
    },
    {
      "type": "word_order",
      "skill": "grammar",
      "words": [
        "Not",
        "only",
        "does",
        "automation",
        "displace",
        "workers",
        "but",
        "it",
        "also",
        "reshapes",
        "society"
      ],
      "correctOrder": [
        "Not",
        "only",
        "does",
        "automation",
        "displace",
        "workers",
        "but",
        "it",
        "also",
        "reshapes",
        "society"
      ],
      "hint": "Inversion enfatica 'Not only does + sujeto + verbo... but ... also'."
    },
    {
      "type": "multiple_choice",
      "skill": "use",
      "question": "Choose the linker that best fits: 'Space tourism dazzles the wealthy; ___, millions still lack clean water.'",
      "options": [
        "meanwhile",
        "thereby",
        "henceforth",
        "insofar"
      ],
      "correctIndex": 0,
      "explanation": "'Meanwhile' contrasta dos realidades simultaneas. 'Thereby', 'henceforth' e 'insofar' no establecen ese contraste temporal."
    },
    {
      "type": "true_false",
      "skill": "vocab",
      "statement": "The phrase 'a double-edged sword', often applied to artificial intelligence, means something that has only beneficial consequences.",
      "answer": false,
      "explanation": "Falso: 'a double-edged sword' (arma de doble filo) describe algo con consecuencias tanto positivas como negativas."
    },
    {
      "type": "reading",
      "skill": "reading",
      "title": "The Fermi Paradox and Our Cosmic Silence",
      "passage": "The Fermi Paradox poses a deceptively simple question: if the universe is vast and ancient, teeming with billions of potentially habitable worlds, where is everybody? Given the sheer number of stars, the probabilistic case for extraterrestrial civilisations seems overwhelming, yet our skies remain stubbornly silent. This tension between high expectation and empty observation has spawned a constellation of explanations, each with sobering implications.\nSome thinkers invoke the so-called Great Filter, an obstacle so formidable that almost no civilisation survives it. The filter might lie in our past, suggesting that the emergence of complex life is staggeringly rare and that we are improbable survivors. Alternatively, and more disquietingly, it might lie ahead of us, implying that technological societies tend to annihilate themselves before they can spread among the stars. Under this reading, our very silence becomes a warning.\nOthers reject the premise that we should hear anything at all. Advanced civilisations may communicate through means we cannot detect, may deliberately conceal themselves, or may simply have no interest in announcing their presence to a young and volatile species. The paradox, in this light, says less about the cosmos than about the parochial assumptions we project onto it. Whatever the resolution, the question endures precisely because it forces us to confront the fragility, and perhaps the loneliness, of our own existence.",
      "questions": [
        {
          "q": "What central tension does the Fermi Paradox describe?",
          "options": [
            "A conflict between religion and astronomy",
            "The gap between the high probability of alien life and the lack of any evidence for it",
            "A disagreement over how old the universe really is",
            "The cost of space exploration versus its benefits"
          ],
          "correctIndex": 1,
          "explanation": "El texto define la paradoja como la tension entre la alta expectativa de vida extraterrestre y la observacion vacia ('high expectation and empty observation')."
        },
        {
          "q": "According to the passage, why is the possibility that the Great Filter lies 'ahead of us' described as 'more disquieting'?",
          "options": [
            "It would mean alien life never existed",
            "It would suggest that technological civilisations tend to destroy themselves before spreading",
            "It would prove the universe is younger than thought",
            "It would confirm we have already been contacted"
          ],
          "correctIndex": 1,
          "explanation": "El pasaje dice que si el filtro esta por delante, las sociedades tecnologicas tienden a autodestruirse, lo cual es mas inquietante para nosotros."
        },
        {
          "q": "What alternative view does the third paragraph present?",
          "options": [
            "That aliens are definitely hostile",
            "That we may simply be unable to detect or recognise advanced civilisations' signals",
            "That the Great Filter has already been crossed",
            "That space tourism will solve the paradox"
          ],
          "correctIndex": 1,
          "explanation": "El tercer parrafo plantea que civilizaciones avanzadas podrian comunicarse de formas indetectables u ocultarse, por lo que quiza no oigamos nada."
        },
        {
          "q": "The word 'parochial' in the third paragraph most nearly means:",
          "options": [
            "narrow or limited in perspective",
            "religious or sacred",
            "ancient and forgotten",
            "scientifically precise"
          ],
          "correctIndex": 0,
          "explanation": "'Parochial' significa de miras estrechas o limitadas; el texto critica las suposiciones limitadas que proyectamos sobre el cosmos."
        },
        {
          "q": "What does the author suggest is the lasting value of the Fermi Paradox?",
          "options": [
            "It has finally been solved by modern telescopes",
            "It forces us to reflect on the fragility and loneliness of human existence",
            "It proves that humans are the only intelligent species",
            "It encourages governments to fund weapons research"
          ],
          "correctIndex": 1,
          "explanation": "El cierre afirma que la pregunta perdura porque nos obliga a enfrentar la fragilidad, y tal vez la soledad, de nuestra existencia."
        }
      ]
    },
    {
      "type": "listening",
      "skill": "listening",
      "text": "Some people praise video games as a legitimate art form, comparable to film or literature. They argue that the best games combine narrative, music, and interactivity in ways no other medium can match. Yet critics counter that commercial pressures and addictive design often undermine any genuine artistic ambition.",
      "question": "What is the speaker's main point?",
      "options": [
        "Video games are universally accepted as superior to film",
        "There is a genuine debate about whether video games qualify as art, with arguments on both sides",
        "Video games have no artistic value whatsoever",
        "Commercial games always achieve great artistic ambition"
      ],
      "correctIndex": 1,
      "explanation": "El hablante presenta ambos lados: quienes defienden los videojuegos como arte y los criticos que lo cuestionan, mostrando un debate genuino."
    }
  ] },
  "core_practice_lvl6": { "name": "Core Practice · Level 6", "cefr": "C2", "pass": 75, "exercises": [
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "Had the streaming platform not slashed its prices, subscriber churn ___ catastrophic that quarter.",
      "options": [
        "would have been",
        "will be",
        "would be",
        "had been"
      ],
      "correctIndex": 0,
      "explanation": "Tras la inversión condicional 'Had... not', la oración principal del tercer condicional exige 'would have been' (pasado irreal)."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "So pervasive ___ the cult of celebrity become that whole economies now orbit a single public figure.",
      "options": [
        "did",
        "has",
        "had",
        "was"
      ],
      "correctIndex": 1,
      "explanation": "La inversión enfática con 'So + adjetivo' requiere el auxiliar concordando con 'has become' (present perfect): 'So pervasive has the cult... become'."
    },
    {
      "type": "find_error",
      "skill": "grammar",
      "question": "Encuentra el error en este comentario sobre la cultura del meme.",
      "segments": [
        "Scarcely ",
        {
          "u": "the meme had"
        },
        " gone viral ",
        {
          "u": "when"
        },
        " a corporation ",
        {
          "u": "co-opted"
        },
        " it for ",
        {
          "u": "advertising"
        },
        "."
      ],
      "correctIndex": 0,
      "correction": "had the meme (Scarcely + inversión: Scarcely had the meme gone viral when...)",
      "explanation": "Tras un adverbio negativo en posición inicial ('Scarcely') se requiere inversión sujeto-auxiliar: 'Scarcely had the meme gone viral when...'."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "Were it not for the algorithm's relentless amplification, no such phenomenon ___ ever have surfaced.",
      "answers": [
        "would",
        "could"
      ],
      "hint": "Condicional irreal con inversión 'Were it not for...'.",
      "explanation": "La estructura 'Were it not for...' introduce un condicional irreal; la principal lleva 'would/could have surfaced'."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "The docuseries treats the murders with a detachment ___ borders on the voyeuristic.",
      "options": [
        "whose",
        "that",
        "what",
        "which it"
      ],
      "correctIndex": 1,
      "explanation": "Se necesita un relativo restrictivo de sujeto que se refiere a 'detachment'; 'that' (o 'which') es correcto. 'whose', 'what' y 'which it' son agramaticales aquí."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "Not only ___ the influencer monetise her outrage, but she also rebranded contrition as content.",
      "answers": [
        "did"
      ],
      "hint": "Inversión tras 'Not only' en pasado simple.",
      "explanation": "'Not only' en posición inicial fuerza inversión con auxiliar; en pasado simple del verbo léxico 'monetise' el auxiliar es 'did'."
    },
    {
      "type": "find_error",
      "skill": "grammar",
      "question": "Encuentra el error en esta frase sobre el revival nostálgico.",
      "segments": [
        "The reboot, ",
        {
          "u": "that"
        },
        " critics dismissed ",
        {
          "u": "as"
        },
        " shameless nostalgia-bait, ",
        {
          "u": "went on"
        },
        " to ",
        {
          "u": "outgross"
        },
        " the original."
      ],
      "correctIndex": 0,
      "correction": "which (cláusula relativa no restrictiva: usar 'which', no 'that')",
      "explanation": "En cláusulas relativas no restrictivas (entre comas) no se admite 'that'; debe emplearse 'which'."
    },
    {
      "type": "word_order",
      "skill": "grammar",
      "words": [
        "Little",
        "did",
        "fans",
        "realise",
        "how",
        "toxic",
        "the",
        "fandom",
        "had",
        "become"
      ],
      "correctOrder": [
        "Little",
        "did",
        "fans",
        "realise",
        "how",
        "toxic",
        "the",
        "fandom",
        "had",
        "become"
      ],
      "hint": "Adverbio negativo inicial 'Little' con inversión."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "Filters have become so normalised that few users, ___, can distinguish the edited self from the real one.",
      "options": [
        "if any",
        "if some",
        "if much",
        "if more"
      ],
      "correctIndex": 0,
      "explanation": "La fórmula concesiva fija es 'few..., if any' (pocos, si es que alguno). Las demás combinaciones no existen como colocación idiomática."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "It is high time the industry ___ the human cost of fast fashion seriously.",
      "options": [
        "takes",
        "took",
        "has taken",
        "would take"
      ],
      "correctIndex": 1,
      "explanation": "Tras 'It is high time' se usa el subjuntivo en pasado (past subjunctive): 'took', expresando algo que debería ocurrir ya."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "The pundit spoke as though print ___ already dead, dismissing every counterargument with a smirk.",
      "answers": [
        "were",
        "was"
      ],
      "hint": "'as though' + situación hipotética.",
      "explanation": "Tras 'as though' para una situación contraria a la realidad se prefiere el subjuntivo 'were' (aunque 'was' se acepta coloquialmente)."
    },
    {
      "type": "word_order",
      "skill": "grammar",
      "words": [
        "Only",
        "by",
        "weaponising",
        "irony",
        "could",
        "the",
        "satirist",
        "evade",
        "censure"
      ],
      "correctOrder": [
        "Only",
        "by",
        "weaponising",
        "irony",
        "could",
        "the",
        "satirist",
        "evade",
        "censure"
      ],
      "hint": "'Only by + -ing' inicial obliga inversión."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "A celebrity feud described as 'manufactured' is best understood as one that is:",
      "options": [
        "spontaneous and heartfelt",
        "deliberately staged for publicity",
        "legally adjudicated",
        "resolved off the record"
      ],
      "correctIndex": 1,
      "explanation": "'Manufactured' (en este registro) implica algo fabricado o escenificado deliberadamente, no espontáneo, típicamente para generar publicidad."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "A film described as 'derivative' is one that:",
      "options": [
        "breaks bold new ground",
        "leans heavily on imitating what came before",
        "appeals only to critics",
        "was made on a small budget"
      ],
      "correctIndex": 1,
      "explanation": "'Derivative' (peyorativo) describe una obra poco original que imita material previo."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "When a backlash against a celebrity 'snowballs', it:",
      "options": [
        "quietly fizzles out",
        "grows rapidly and uncontrollably",
        "freezes all debate",
        "is settled in court"
      ],
      "correctIndex": 1,
      "explanation": "'To snowball' significa crecer rápidamente y descontroladamente, como una bola de nieve."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "Choose the most precise synonym for 'parasocial' in 'parasocial relationship'.",
      "options": [
        "mutual and reciprocal",
        "one-sided and illusory intimacy with a media figure",
        "professional and contractual",
        "hostile and adversarial"
      ],
      "correctIndex": 1,
      "explanation": "Una relación 'parasocial' es la intimidad unilateral e ilusoria que un seguidor siente hacia una figura mediática que no le conoce."
    },
    {
      "type": "true_false",
      "skill": "vocab",
      "statement": "To call a nostalgic product 'cynically commodified' is to praise its artistic sincerity.",
      "answer": false,
      "explanation": "'Cynically commodified' es despectivo: implica que la nostalgia se mercantilizó de forma calculada y oportunista, no sincera."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "An aesthetic that is 'dystopian' evokes:",
      "options": [
        "an idyllic, harmonious future",
        "a bleak, oppressive imagined society",
        "a nostalgic pastoral past",
        "a neutral, documentary realism"
      ],
      "correctIndex": 1,
      "explanation": "Lo 'dystopian' evoca una sociedad imaginada sombría y opresiva, opuesta a la utopía."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "A music critic who calls a chorus 'saccharine' finds it:",
      "options": [
        "dissonant and abrasive",
        "cloyingly sweet to the point of being insincere",
        "minimalist and sparse",
        "technically virtuosic"
      ],
      "correctIndex": 1,
      "explanation": "'Saccharine' describe algo empalagosamente dulce, hasta resultar falso o sensiblero."
    },
    {
      "type": "true_false",
      "skill": "vocab",
      "statement": "Describing a subculture as having been 'co-opted by the mainstream' suggests it has retained its original subversive edge.",
      "answer": false,
      "explanation": "'Co-opted' implica que el mainstream absorbió y neutralizó la subcultura, despojándola de su filo subversivo."
    },
    {
      "type": "translate",
      "skill": "use",
      "prompt": "Traduce con registro C2: \"La indignación, lejos de ser espontánea, había sido cuidadosamente orquestada.\"",
      "answers": [
        "the outrage, far from being spontaneous, had been carefully orchestrated",
        "the outrage, far from spontaneous, had been carefully orchestrated",
        "far from being spontaneous, the outrage had been carefully orchestrated"
      ],
      "explanation": "Se valora 'far from being spontaneous' (concesivo) y la voz pasiva en pluscuamperfecto 'had been carefully orchestrated'."
    },
    {
      "type": "translate",
      "skill": "use",
      "prompt": "Traduce: \"Cuanto más viral se vuelve un fenómeno, más rápido se agota su novedad.\"",
      "answers": [
        "the more viral a phenomenon becomes, the faster its novelty wears off",
        "the more viral a phenomenon becomes, the quicker its novelty wears off",
        "the more viral a phenomenon becomes, the faster its novelty fades",
        "the more viral a phenomenon becomes, the quicker its novelty fades"
      ],
      "explanation": "Estructura comparativa correlativa 'the more... the faster...' con 'wears off/fades' para la novedad que se agota."
    },
    {
      "type": "translate",
      "skill": "use",
      "prompt": "Traduce: \"Por mucho que lo nieguen, los superhéroes funcionan como la mitología moderna.\"",
      "answers": [
        "much as they may deny it, superheroes function as modern mythology",
        "however much they deny it, superheroes function as modern mythology",
        "much as they deny it, superheroes function as modern mythology",
        "however much they may deny it, superheroes function as modern mythology"
      ],
      "explanation": "Se acepta la concesiva 'Much as they may deny it' o 'However much they deny it' con 'function as modern mythology'."
    },
    {
      "type": "multiple_choice",
      "skill": "use",
      "question": "Choose the option that best preserves the cynical register: 'The brand's apology was ___ an exercise in damage control.'",
      "options": [
        "merely",
        "nothing but",
        "anything but",
        "a far cry from"
      ],
      "correctIndex": 1,
      "explanation": "'Nothing but' = 'nada más que', reduce la disculpa a mero control de daños, manteniendo el tono cínico. 'Anything but' y 'a far cry from' significarían justo lo contrario; 'merely' encaja en sentido pero no completa la colocación enfática buscada."
    },
    {
      "type": "fill_blank",
      "skill": "use",
      "sentence": "The essay argues that reality TV manufactures conflict; ___, the participants are less performers than products.",
      "answers": [
        "in other words",
        "put differently",
        "that is to say"
      ],
      "hint": "Conector de reformulación (en otras palabras).",
      "explanation": "Se requiere un conector de reformulación: 'in other words' / 'put differently' / 'that is to say'."
    },
    {
      "type": "reading",
      "skill": "reading",
      "title": "The Half-Life of Outrage",
      "passage": "Cancel culture, for all the polemical heat it generates, is less a coherent ideology than a symptom of an attention economy that rewards velocity over verdict. A transgression surfaces, the algorithm amplifies it, and within hours a consensus calcifies that no subsequent nuance can easily dislodge. What is striking is not the severity of the sanction but its evanescence: the same publics that demand permanent exile rarely sustain their indignation beyond the next cycle, and the supposedly cancelled frequently re-emerge, their notoriety quietly monetised.\n\nCritics on the right decry an illiberal mob; critics on the left counter that accountability has merely been redistributed away from the powerful. Both readings, however, mistake the mechanism for the motive. The platform does not care whether a denunciation is just; it cares only that it is engaging. Outrage, in this sense, is not a moral position but a renewable resource, harvested and discarded with industrial efficiency.\n\nWhat gets lost, the more sober commentators insist, is proportionality. A clumsy joke and a genuine abuse of power are flattened onto the same scale of condemnation, because the medium cannot encode degree, only valence. The result is a public sphere fluent in fury yet curiously incapable of forgiveness or, for that matter, of forgetting on any humane timescale.",
      "questions": [
        {
          "q": "What is the author's central claim about cancel culture?",
          "options": [
            "It is a rigorously consistent moral philosophy.",
            "It is chiefly a by-product of an attention economy that prizes speed over judgement.",
            "It reliably delivers permanent consequences to wrongdoers.",
            "It originates exclusively from one end of the political spectrum."
          ],
          "correctIndex": 1,
          "explanation": "El autor sostiene que la cancelación es un síntoma de una economía de la atención que premia la velocidad sobre el veredicto, no una ideología coherente."
        },
        {
          "q": "The word 'evanescence' (paragraph 1) most nearly conveys that the sanction is:",
          "options": [
            "disproportionately harsh",
            "short-lived and quick to fade",
            "legally binding",
            "globally coordinated"
          ],
          "correctIndex": 1,
          "explanation": "'Evanescence' alude a lo efímero; el castigo se desvanece pronto, contrastando con la demanda de exilio permanente."
        },
        {
          "q": "According to the author, what error do both right- and left-wing critics share?",
          "options": [
            "They overestimate the platforms' indifference.",
            "They confuse the underlying mechanism with the motive behind it.",
            "They agree the powerful are unfairly targeted.",
            "They deny that any consensus ever forms."
          ],
          "correctIndex": 1,
          "explanation": "El texto dice que ambas lecturas 'mistake the mechanism for the motive': confunden el mecanismo (engagement) con el motivo moral."
        },
        {
          "q": "What does the author mean by saying the medium 'cannot encode degree, only valence'?",
          "options": [
            "It records the date but not the content of offences.",
            "It registers whether something is good or bad but not how serious it is.",
            "It privileges visual content over text.",
            "It measures audience size with great precision."
          ],
          "correctIndex": 1,
          "explanation": "'Valence' = signo positivo/negativo; 'degree' = grado de gravedad. El medio sólo marca si algo es condenable, no cuán grave es, aplanando broma y abuso."
        },
        {
          "q": "Which phrase best captures the tone of the final paragraph?",
          "options": [
            "Triumphant and celebratory",
            "Resigned and quietly critical",
            "Neutral and purely descriptive",
            "Nostalgic and sentimental"
          ],
          "correctIndex": 1,
          "explanation": "El cierre es resignado y críticamente sobrio: lamenta una esfera pública 'fluent in fury yet... incapable of forgiveness'."
        }
      ]
    },
    {
      "type": "listening",
      "skill": "listening",
      "text": "What we call an influencer's authenticity is, more often than not, a meticulously engineered performance of spontaneity. The unfiltered confession, the candid mess in the background, the trembling apology video: each is a genre with its own conventions, and audiences reward fluency in them. The paradox is that the more seamlessly authenticity is manufactured, the more authentic it is perceived to be.",
      "question": "What is the speaker's main point about influencer authenticity?",
      "options": [
        "Influencers are genuinely more candid than traditional celebrities.",
        "Perceived authenticity is itself a carefully constructed performance.",
        "Audiences are wholly indifferent to whether content feels authentic.",
        "Apology videos are the only authentic genre online."
      ],
      "correctIndex": 1,
      "explanation": "El hablante sostiene que la 'autenticidad' del influencer es una actuación de espontaneidad cuidadosamente diseñada; cuanto mejor se fabrica, más auténtica parece."
    }
  ] },
  "daily_life_vol0": { "name": "Daily Life · Vol. 0", "cefr": "A0", "pass": 70, "exercises": [
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "Hi! ___ name is Ana.",
      "options": [
        "My",
        "I",
        "You"
      ],
      "correctIndex": 0,
      "explanation": "Usamos 'My' (mi) para decir nuestro nombre: My name is Ana."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "She ___ my teacher.",
      "options": [
        "am",
        "is",
        "are"
      ],
      "correctIndex": 1,
      "explanation": "Con 'she' usamos 'is'."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "I ___ from Spain.",
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
      "skill": "vocab",
      "question": "What number is 'eight'?",
      "options": [
        "6",
        "8",
        "10"
      ],
      "correctIndex": 1,
      "explanation": "'eight' es el numero 8."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "Choose the correct greeting in the morning.",
      "options": [
        "Good night",
        "Good morning",
        "Goodbye"
      ],
      "correctIndex": 1,
      "explanation": "Por la manana decimos 'Good morning' (buenos dias)."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "Which day comes after Monday?",
      "options": [
        "Sunday",
        "Friday",
        "Tuesday"
      ],
      "correctIndex": 2,
      "explanation": "Despues de Monday (lunes) viene Tuesday (martes)."
    },
    {
      "type": "multiple_choice",
      "skill": "use",
      "question": "Your friend says 'Thank you.' You answer:",
      "options": [
        "You're welcome.",
        "Good night.",
        "My name is Tom."
      ],
      "correctIndex": 0,
      "explanation": "Respondemos a 'Thank you' con 'You're welcome' (de nada)."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "Which letter comes first in the alphabet?",
      "options": [
        "B",
        "A",
        "C"
      ],
      "correctIndex": 1,
      "explanation": "La letra 'A' es la primera del alfabeto."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "There ___ three books.",
      "answers": [
        "are"
      ],
      "hint": "El sujeto es plural (three books).",
      "explanation": "Con plural usamos 'There are'."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "He ___ a student.",
      "answers": [
        "is"
      ],
      "hint": "Con 'he' usamos el verbo to be.",
      "explanation": "Con 'he' usamos 'is': He is a student."
    },
    {
      "type": "fill_blank",
      "skill": "use",
      "sentence": "___ are you? I'm fine, thank you.",
      "answers": [
        "how"
      ],
      "hint": "Pregunta por el estado de la persona.",
      "explanation": "'How are you?' significa '¿Como estas?'."
    },
    {
      "type": "fill_blank",
      "skill": "vocab",
      "sentence": "The day after Friday is ___.",
      "answers": [
        "saturday"
      ],
      "hint": "Un dia de la semana en ingles.",
      "explanation": "Despues de Friday (viernes) viene Saturday (sabado)."
    },
    {
      "type": "true_false",
      "skill": "vocab",
      "statement": "We use 'an' before 'apple'.",
      "answer": true,
      "explanation": "'apple' empieza por sonido vocalico, por eso usamos 'an'."
    },
    {
      "type": "true_false",
      "skill": "vocab",
      "statement": "The word 'red' is a color.",
      "answer": true,
      "explanation": "'red' significa rojo, es un color."
    },
    {
      "type": "true_false",
      "skill": "grammar",
      "statement": "We say 'I are happy.'",
      "answer": false,
      "explanation": "Con 'I' usamos 'am': I am happy."
    },
    {
      "type": "true_false",
      "skill": "vocab",
      "statement": "'Goodbye' is what you say when you leave.",
      "answer": true,
      "explanation": "'Goodbye' significa adios, lo decimos al irnos."
    },
    {
      "type": "word_order",
      "skill": "grammar",
      "words": [
        "My",
        "name",
        "is",
        "John"
      ],
      "correctOrder": [
        "My",
        "name",
        "is",
        "John"
      ],
      "hint": "Decir tu nombre: My name is..."
    },
    {
      "type": "word_order",
      "skill": "grammar",
      "words": [
        "I",
        "am",
        "ten",
        "years",
        "old"
      ],
      "correctOrder": [
        "I",
        "am",
        "ten",
        "years",
        "old"
      ],
      "hint": "Decir tu edad: I am ... years old."
    },
    {
      "type": "word_order",
      "skill": "use",
      "words": [
        "Can",
        "I",
        "go",
        "to",
        "the",
        "toilet"
      ],
      "correctOrder": [
        "Can",
        "I",
        "go",
        "to",
        "the",
        "toilet"
      ],
      "hint": "Pedir permiso en clase para ir al bano."
    },
    {
      "type": "translate",
      "skill": "use",
      "prompt": "Traduce: \"Hola, ¿como estas?\"",
      "answers": [
        "hello, how are you?",
        "hello how are you",
        "hi, how are you?",
        "hi how are you"
      ],
      "explanation": "Hello, how are you?"
    },
    {
      "type": "translate",
      "skill": "use",
      "prompt": "Traduce: \"Me llamo Pedro.\"",
      "answers": [
        "my name is pedro",
        "i am pedro",
        "i'm pedro"
      ],
      "explanation": "My name is Pedro."
    },
    {
      "type": "translate",
      "skill": "use",
      "prompt": "Traduce: \"Tengo dos hermanos.\"",
      "answers": [
        "i have two brothers",
        "i have got two brothers",
        "i've got two brothers"
      ],
      "explanation": "I have two brothers."
    },
    {
      "type": "find_error",
      "skill": "grammar",
      "question": "Encuentra el error.",
      "segments": [
        "She ",
        {
          "u": "are"
        },
        " a ",
        {
          "u": "teacher"
        },
        "."
      ],
      "correctIndex": 0,
      "correction": "is (she -> is)",
      "explanation": "Con 'she' usamos 'is', no 'are': She is a teacher."
    },
    {
      "type": "reading",
      "skill": "reading",
      "title": "My Friend Sam",
      "passage": "Hello! This is my friend Sam.\nSam is ten years old. He is from Canada.\nHis favorite day is Saturday. He likes red and blue.",
      "questions": [
        {
          "q": "How old is Sam?",
          "options": [
            "Eight",
            "Ten",
            "Twelve",
            "Six"
          ],
          "correctIndex": 1,
          "explanation": "El texto dice 'Sam is ten years old' (tiene diez anos)."
        },
        {
          "q": "Where is Sam from?",
          "options": [
            "Spain",
            "Mexico",
            "Canada",
            "France"
          ],
          "correctIndex": 2,
          "explanation": "El texto dice 'He is from Canada'."
        },
        {
          "q": "What is Sam's favorite day?",
          "options": [
            "Monday",
            "Sunday",
            "Friday",
            "Saturday"
          ],
          "correctIndex": 3,
          "explanation": "El texto dice 'His favorite day is Saturday'."
        },
        {
          "q": "Which colors does Sam like?",
          "options": [
            "Red and blue",
            "Green and black",
            "Yellow and white",
            "Pink and gray"
          ],
          "correctIndex": 0,
          "explanation": "El texto dice 'He likes red and blue'."
        }
      ]
    },
    {
      "type": "listening",
      "skill": "listening",
      "text": "Hello. My name is Maria. I am from Mexico. I am nine years old.",
      "question": "Where is Maria from?",
      "options": [
        "Spain",
        "Mexico",
        "Canada"
      ],
      "correctIndex": 1,
      "explanation": "Maria dice 'I am from Mexico' (soy de Mexico)."
    }
  ] },
  "daily_life_vol1": { "name": "Daily Life · Vol. 1", "cefr": "A1–A2", "pass": 70, "exercises": [
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "At the supermarket, you pay at the ___.",
      "options": [
        "kitchen",
        "checkout",
        "garage"
      ],
      "correctIndex": 1,
      "explanation": "El 'checkout' (caja) es donde pagas en el supermercado."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "How ___ does this T-shirt cost?",
      "options": [
        "many",
        "much",
        "old"
      ],
      "correctIndex": 1,
      "explanation": "Para preguntar precios usamos 'How much...?'."
    },
    {
      "type": "multiple_choice",
      "skill": "use",
      "question": "Shop assistant: \"Can I help you?\" — You want to buy shoes. You say:",
      "options": [
        "Yes, I'm looking for some shoes.",
        "No, I am a shoe.",
        "Yes, I help you too."
      ],
      "correctIndex": 0,
      "explanation": "\"I'm looking for...\" es la forma natural de pedir algo en una tienda."
    },
    {
      "type": "fill_blank",
      "skill": "vocab",
      "sentence": "I'd like to pay by ___ card, not in cash.",
      "answers": [
        "credit",
        "debit"
      ],
      "hint": "Una tarjeta para pagar.",
      "explanation": "Se paga 'by credit/debit card' (con tarjeta) o 'in cash' (en efectivo)."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "You are at the airport. You show this to get on the plane:",
      "options": [
        "a menu",
        "a boarding pass",
        "a receipt"
      ],
      "correctIndex": 1,
      "explanation": "El 'boarding pass' (tarjeta de embarque) sirve para subir al avión."
    },
    {
      "type": "multiple_choice",
      "skill": "use",
      "question": "You are lost. The best way to ask for directions is:",
      "options": [
        "Excuse me, where is the station?",
        "Give me the station now.",
        "I am the station, please."
      ],
      "correctIndex": 0,
      "explanation": "\"Excuse me, where is...?\" es educado y correcto para pedir direcciones."
    },
    {
      "type": "fill_blank",
      "skill": "vocab",
      "sentence": "Go straight on and ___ left at the bank.",
      "answers": [
        "turn"
      ],
      "hint": "Verbo para cambiar de dirección.",
      "explanation": "'Turn left/right' significa girar a la izquierda/derecha."
    },
    {
      "type": "word_order",
      "skill": "grammar",
      "words": [
        "The",
        "bank",
        "is",
        "next",
        "to",
        "the",
        "park"
      ],
      "correctOrder": [
        "The",
        "bank",
        "is",
        "next",
        "to",
        "the",
        "park"
      ],
      "hint": "Preposición de lugar 'next to' (al lado de)."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "Which one is public transport?",
      "options": [
        "a bus",
        "a sofa",
        "a fridge"
      ],
      "correctIndex": 0,
      "explanation": "El 'bus' (autobús) es transporte público."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "We usually go to work ___ train.",
      "options": [
        "by",
        "in",
        "on foot"
      ],
      "correctIndex": 0,
      "explanation": "Con medios de transporte usamos 'by': by train, by bus, by car."
    },
    {
      "type": "true_false",
      "skill": "vocab",
      "statement": "A 'single ticket' is for going and coming back.",
      "answer": false,
      "explanation": "'Single' es solo de ida; 'return' es de ida y vuelta."
    },
    {
      "type": "multiple_choice",
      "skill": "use",
      "question": "At the doctor's, the doctor asks: \"What's the matter?\" A good answer is:",
      "options": [
        "I have a headache.",
        "I am a doctor.",
        "It is ten o'clock."
      ],
      "correctIndex": 0,
      "explanation": "\"What's the matter?\" pregunta qué te pasa; respondes con tu síntoma."
    },
    {
      "type": "fill_blank",
      "skill": "vocab",
      "sentence": "My throat hurts and I can't stop coughing. I think I have a ___.",
      "answers": [
        "cold",
        "sore throat"
      ],
      "hint": "Una enfermedad común de invierno.",
      "explanation": "'A cold' (un resfriado) causa tos y dolor de garganta."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "I feel sick. I ___ go to the doctor.",
      "options": [
        "should",
        "shouldn't",
        "am"
      ],
      "correctIndex": 0,
      "explanation": "'Should' se usa para dar consejos: deberías ir al médico."
    },
    {
      "type": "multiple_choice",
      "skill": "use",
      "question": "In a restaurant, the waiter says: \"Are you ready to order?\" You say:",
      "options": [
        "Yes, I'd like the chicken, please.",
        "Yes, I am a waiter.",
        "No, the table is hungry."
      ],
      "correctIndex": 0,
      "explanation": "\"I'd like...\" (me gustaría) es la forma educada de pedir comida."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "Can I ___ the bill, please?",
      "answers": [
        "have",
        "get"
      ],
      "hint": "Verbo para pedir algo educadamente.",
      "explanation": "\"Can I have the bill?\" es como se pide la cuenta."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "There ___ some milk in the fridge, but there ___ any eggs.",
      "options": [
        "is / aren't",
        "are / isn't",
        "is / isn't"
      ],
      "correctIndex": 0,
      "explanation": "'Milk' es incontable (is); 'eggs' es plural contable (aren't)."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "How ___ apples do you want?",
      "options": [
        "much",
        "many",
        "long"
      ],
      "correctIndex": 1,
      "explanation": "Con nombres contables en plural (apples) usamos 'many'."
    },
    {
      "type": "find_error",
      "skill": "grammar",
      "question": "Encuentra el error.",
      "segments": [
        "How much ",
        {
          "u": "are"
        },
        " this ",
        {
          "u": "jacket"
        },
        "?"
      ],
      "correctIndex": 0,
      "correction": "is (this jacket = singular)",
      "explanation": "'This jacket' es singular, por eso se usa 'is', no 'are'."
    },
    {
      "type": "find_error",
      "skill": "grammar",
      "question": "Encuentra el error.",
      "segments": [
        "I'd like ",
        {
          "u": "a"
        },
        " water and ",
        {
          "u": "two"
        },
        " coffees."
      ],
      "correctIndex": 0,
      "correction": "some / a glass of (water es incontable)",
      "explanation": "'Water' es incontable; no se usa 'a water'. Mejor 'some water' o 'a glass of water'."
    },
    {
      "type": "translate",
      "skill": "use",
      "prompt": "Traduce: \"¿Cuánto cuesta?\"",
      "answers": [
        "how much is it",
        "how much does it cost",
        "how much is it?",
        "how much does it cost?"
      ],
      "explanation": "How much is it? / How much does it cost?"
    },
    {
      "type": "translate",
      "skill": "use",
      "prompt": "Traduce: \"Quisiera un billete de ida y vuelta a Londres.\"",
      "answers": [
        "i'd like a return ticket to london",
        "i would like a return ticket to london",
        "i'd like a return to london",
        "i'd like a round trip ticket to london"
      ],
      "explanation": "I'd like a return ticket to London."
    },
    {
      "type": "word_order",
      "skill": "grammar",
      "words": [
        "I",
        "have",
        "an",
        "appointment",
        "with",
        "the",
        "doctor"
      ],
      "correctOrder": [
        "I",
        "have",
        "an",
        "appointment",
        "with",
        "the",
        "doctor"
      ],
      "hint": "Vocabulario del médico: 'an appointment' (una cita)."
    },
    {
      "type": "reading",
      "skill": "reading",
      "title": "A Day in Town",
      "passage": "Maria needs new shoes. She goes to a shop in the city center. The shoes cost 30 dollars, and she pays with her credit card.\nAfter shopping, Maria is hungry. She goes to a small café and orders a sandwich and a coffee. The food is cheap and very good.\nThen she takes the bus home. The bus ticket is only two dollars.",
      "questions": [
        {
          "q": "Why does Maria go to the shop?",
          "options": [
            "To buy a coffee",
            "To buy new shoes",
            "To take the bus",
            "To see the doctor"
          ],
          "correctIndex": 1,
          "explanation": "El texto dice 'Maria needs new shoes' y va a una tienda."
        },
        {
          "q": "How does Maria pay for the shoes?",
          "options": [
            "In cash",
            "With her credit card",
            "With a ticket",
            "She does not pay"
          ],
          "correctIndex": 1,
          "explanation": "'she pays with her credit card' (con tarjeta de crédito)."
        },
        {
          "q": "What does Maria order at the café?",
          "options": [
            "Shoes and a bus ticket",
            "A sandwich and a coffee",
            "Two coffees",
            "Nothing"
          ],
          "correctIndex": 1,
          "explanation": "Pide 'a sandwich and a coffee'."
        },
        {
          "q": "How does Maria go home?",
          "options": [
            "By car",
            "On foot",
            "By bus",
            "By train"
          ],
          "correctIndex": 2,
          "explanation": "'she takes the bus home' (vuelve a casa en autobús)."
        }
      ]
    },
    {
      "type": "listening",
      "skill": "listening",
      "text": "Excuse me, how do I get to the train station? Go straight on for two minutes. Then turn left at the bank. The station is next to the supermarket.",
      "question": "Where is the train station?",
      "options": [
        "Next to the bank",
        "Next to the supermarket",
        "Inside the train"
      ],
      "correctIndex": 1,
      "explanation": "El hablante dice 'The station is next to the supermarket'."
    }
  ] },
  "daily_life_vol2": { "name": "Daily Life · Vol. 2", "cefr": "B1–B2", "pass": 72, "exercises": [
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "If I ___ more time, I would learn to paint.",
      "options": [
        "have",
        "had",
        "will have",
        "would have"
      ],
      "correctIndex": 1,
      "explanation": "Es un condicional tipo 2 (situacion hipotetica): 'If + pasado simple, would + verbo'. Por eso usamos 'had'."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "She's been feeling down ___ her best friend moved abroad.",
      "options": [
        "for",
        "since",
        "during",
        "while"
      ],
      "correctIndex": 1,
      "explanation": "'Since' introduce el momento en que empezo algo (un punto en el tiempo). 'For' se usa con duracion."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "By the time we arrived, the meeting ___ already.",
      "options": [
        "has started",
        "had started",
        "was starting",
        "starts"
      ],
      "correctIndex": 1,
      "explanation": "Una accion terminada antes de otra accion pasada pide pasado perfecto: 'had started'."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "He told me that he ___ tired and wanted to go home.",
      "options": [
        "is",
        "was",
        "has been",
        "will be"
      ],
      "correctIndex": 1,
      "explanation": "En estilo indirecto, el presente 'is' pasa a 'was' (back-shift) porque el verbo introductor 'told' esta en pasado."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "I'm not used to ___ in such a noisy environment.",
      "options": [
        "work",
        "working",
        "to work",
        "worked"
      ],
      "correctIndex": 1,
      "explanation": "Tras 'be used to' va un gerundio (-ing): 'used to working'."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "The film was ___ boring that half the audience left.",
      "options": [
        "such",
        "too",
        "so",
        "very"
      ],
      "correctIndex": 2,
      "explanation": "'so + adjetivo + that' expresa consecuencia. 'such' iria con un sustantivo."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "I wish I ___ spoken to her before she left; now it's too late.",
      "answers": [
        "had"
      ],
      "hint": "Arrepentimiento sobre el pasado.",
      "explanation": "Para lamentar algo del pasado usamos 'wish + pasado perfecto': 'I wish I had spoken'."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "She apologised ___ shouting at her colleagues during the argument.",
      "answers": [
        "for"
      ],
      "hint": "Preposicion que sigue a 'apologise'.",
      "explanation": "'Apologise for + -ing' es la combinacion correcta para disculparse por hacer algo."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "The more you bottle up your feelings, the ___ it becomes to cope.",
      "answers": [
        "harder",
        "more difficult"
      ],
      "hint": "Estructura comparativa doble 'the more... the...'.",
      "explanation": "La estructura 'the + comparativo..., the + comparativo' relaciona dos cambios: 'the harder it becomes'."
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
        " feeling anxious, she ",
        {
          "u": "managed to"
        },
        " give the speech."
      ],
      "correctIndex": 0,
      "correction": "of -> (nada) / 'Despite feeling'",
      "explanation": "'Despite' va seguido directamente de un sustantivo o gerundio, sin 'of'. Lo correcto es 'Despite feeling'."
    },
    {
      "type": "find_error",
      "skill": "grammar",
      "question": "Encuentra el error.",
      "segments": [
        "If she ",
        {
          "u": "would have"
        },
        " listened, the misunderstanding ",
        {
          "u": "wouldn't have"
        },
        " happened."
      ],
      "correctIndex": 0,
      "correction": "would have -> had",
      "explanation": "En el condicional tipo 3, la clausula 'if' lleva 'had + participio', no 'would have'. Lo correcto es 'If she had listened'."
    },
    {
      "type": "word_order",
      "skill": "grammar",
      "words": [
        "You",
        "should",
        "have",
        "told",
        "me",
        "how",
        "you",
        "felt"
      ],
      "correctOrder": [
        "You",
        "should",
        "have",
        "told",
        "me",
        "how",
        "you",
        "felt"
      ],
      "hint": "Critica sobre el pasado: 'should have + participio'."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "When someone is 'open-minded', they are willing to ___.",
      "options": [
        "judge others quickly",
        "consider new ideas",
        "keep secrets",
        "avoid people"
      ],
      "correctIndex": 1,
      "explanation": "'Open-minded' describe a alguien dispuesto a considerar ideas y opiniones nuevas."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "Choose the best word: After the loss, he felt completely ___ and couldn't get out of bed.",
      "options": [
        "overwhelmed",
        "outgoing",
        "ambitious",
        "reliable"
      ],
      "correctIndex": 0,
      "explanation": "'Overwhelmed' significa abrumado, sin fuerzas para afrontar algo. Las demas no describen ese estado emocional."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "A 'close-knit' family is one that is ___.",
      "options": [
        "very wealthy",
        "always arguing",
        "emotionally connected and supportive",
        "large in number"
      ],
      "correctIndex": 2,
      "explanation": "'Close-knit' describe un grupo muy unido emocionalmente y que se apoya entre si."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "Which phrasal verb means 'to recover from a difficult experience'?",
      "options": [
        "get over",
        "get on",
        "get up",
        "get by"
      ],
      "correctIndex": 0,
      "explanation": "'Get over (something)' significa superar o recuperarse de una experiencia dificil."
    },
    {
      "type": "true_false",
      "skill": "vocab",
      "statement": "If you 'see eye to eye' with someone, you disagree strongly with them.",
      "answer": false,
      "explanation": "'See eye to eye' significa estar de acuerdo con alguien, no en desacuerdo."
    },
    {
      "type": "true_false",
      "skill": "vocab",
      "statement": "A 'breakthrough' is a sudden, important discovery or progress.",
      "answer": true,
      "explanation": "'Breakthrough' es un avance o descubrimiento importante y repentino."
    },
    {
      "type": "fill_blank",
      "skill": "vocab",
      "sentence": "I can't put up ___ his constant complaining any longer.",
      "answers": [
        "with"
      ],
      "hint": "Phrasal verb que significa 'tolerar'.",
      "explanation": "'Put up with' significa tolerar o aguantar algo molesto."
    },
    {
      "type": "translate",
      "skill": "use",
      "prompt": "Traduce: \"Cuanto mas lo pienso, mas me preocupo.\"",
      "answers": [
        "the more i think about it, the more i worry",
        "the more i think about it the more i worry",
        "the more i think about it, the more worried i get",
        "the more i think about it the more worried i get"
      ],
      "explanation": "The more I think about it, the more I worry. Usa la estructura comparativa doble 'the more..., the more...'."
    },
    {
      "type": "translate",
      "skill": "use",
      "prompt": "Traduce: \"Ojala hubiera estudiado psicologia.\"",
      "answers": [
        "i wish i had studied psychology",
        "i wish i'd studied psychology"
      ],
      "explanation": "I wish I had studied psychology. Para lamentar algo del pasado se usa 'wish + pasado perfecto'."
    },
    {
      "type": "translate",
      "skill": "use",
      "prompt": "Traduce: \"En mi opinion, las redes sociales afectan nuestra salud mental.\"",
      "answers": [
        "in my opinion, social media affects our mental health",
        "in my opinion social media affects our mental health"
      ],
      "explanation": "In my opinion, social media affects our mental health. 'In my opinion' introduce un punto de vista personal; 'social media' se trata como singular, por eso 'affects'."
    },
    {
      "type": "multiple_choice",
      "skill": "use",
      "question": "Choose the most appropriate way to disagree politely in a discussion.",
      "options": [
        "You're completely wrong.",
        "I see your point, but I'm not sure I agree.",
        "That's a stupid idea.",
        "Whatever, I don't care."
      ],
      "correctIndex": 1,
      "explanation": "'I see your point, but I'm not sure I agree' reconoce la otra opinion antes de discrepar, que es lo cortes en una conversacion B1-B2."
    },
    {
      "type": "multiple_choice",
      "skill": "use",
      "question": "Which connector best completes: 'I was exhausted; ___, I finished the project on time.'",
      "options": [
        "therefore",
        "nevertheless",
        "because",
        "for example"
      ],
      "correctIndex": 1,
      "explanation": "'Nevertheless' (sin embargo) introduce un contraste: a pesar del cansancio, termino a tiempo."
    },
    {
      "type": "reading",
      "skill": "reading",
      "title": "The Art of Small Talk",
      "passage": "For many people, making small talk with strangers feels awkward and even pointless. Why discuss the weather or the weekend with someone you may never meet again? Yet psychologists argue that these brief, light conversations play a surprisingly important role in our well-being.\nResearch suggests that even short exchanges with strangers, such as chatting with a cashier or a fellow commuter, can lift our mood and make us feel more connected to the world around us. In one well-known study, people who were asked to talk to a stranger on their morning train reported feeling happier afterwards than those who sat in silence, even though most had predicted the opposite.\nThe key, experts say, is not the depth of the conversation but the simple act of acknowledging another human being. Small talk acts as a social bridge: it helps us practise empathy, read emotions, and build the trust that deeper relationships are eventually based on. So the next time a casual chat feels like a waste of time, remember that it may be doing more good than you think.",
      "questions": [
        {
          "q": "What is the main idea of the passage?",
          "options": [
            "Small talk is a waste of time for most people.",
            "Brief casual conversations can improve our well-being and social connection.",
            "People should only talk to strangers on trains.",
            "Deep conversations are the only ones that matter."
          ],
          "correctIndex": 1,
          "explanation": "El texto defiende que las conversaciones breves y casuales benefician nuestro bienestar y conexion social."
        },
        {
          "q": "According to the study mentioned, how did people feel after talking to a stranger on the train?",
          "options": [
            "Worse than they expected",
            "Exactly as they had predicted",
            "Happier than those who stayed silent",
            "Too tired to notice any difference"
          ],
          "correctIndex": 2,
          "explanation": "El estudio mostro que quienes hablaron se sintieron mas felices que quienes permanecieron en silencio, al contrario de lo que esperaban."
        },
        {
          "q": "What does the writer say is the 'key' to small talk?",
          "options": [
            "Discussing serious topics",
            "The depth of the conversation",
            "Acknowledging another human being",
            "Avoiding strangers"
          ],
          "correctIndex": 2,
          "explanation": "Segun el texto, lo importante no es la profundidad sino el simple acto de reconocer a otra persona."
        },
        {
          "q": "What does the word 'bridge' suggest in 'Small talk acts as a social bridge'?",
          "options": [
            "A physical structure",
            "Something that connects people",
            "A barrier between people",
            "A type of conversation topic"
          ],
          "correctIndex": 1,
          "explanation": "Aqui 'bridge' (puente) se usa en sentido figurado: algo que conecta a las personas."
        }
      ]
    },
    {
      "type": "listening",
      "skill": "listening",
      "text": "I used to think that being busy all the time meant I was being productive. But last year I burned out completely. Now I've learned that taking real breaks and saying no to extra work isn't lazy at all; it's how I protect my mental health.",
      "question": "What has the speaker learned?",
      "options": [
        "That staying busy is the best way to be productive",
        "That taking breaks and setting limits protects their mental health",
        "That they should take on more extra work",
        "That burning out improved their career"
      ],
      "correctIndex": 1,
      "explanation": "El hablante explica que, tras agotarse, aprendio que descansar de verdad y decir que no protege su salud mental."
    }
  ] },
  "cabin_crew": { "name": "Aviation English (Cabin Crew)", "cefr": "A2–B1", "pass": 70, "exercises": [
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "Ladies and gentlemen, please ___ your seat belts.",
      "options": [
        "fasten",
        "fastening",
        "to fasten"
      ],
      "correctIndex": 0,
      "explanation": "Tras 'please' en una instruccion usamos el verbo en forma base: 'please fasten'."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "Could you ___ your tray table, please?",
      "options": [
        "stow",
        "stowed",
        "stowing"
      ],
      "correctIndex": 0,
      "explanation": "Despues de 'Could you' usamos el verbo en forma base: 'Could you stow...'."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "Before take-off, crew must check that all ___ are in the upright position.",
      "options": [
        "seat backs",
        "overhead bins",
        "life vests"
      ],
      "correctIndex": 0,
      "explanation": "Los respaldos de los asientos ('seat backs') deben estar verticales para el despegue."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "In an emergency, the ___ will drop automatically from the panel above your seat.",
      "options": [
        "oxygen mask",
        "boarding pass",
        "trolley"
      ],
      "correctIndex": 0,
      "explanation": "La mascarilla de oxigeno ('oxygen mask') cae del panel superior en una emergencia."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "Would you like chicken ___ pasta for your meal?",
      "options": [
        "or",
        "and",
        "but"
      ],
      "correctIndex": 0,
      "explanation": "Al ofrecer dos opciones usamos 'or': '...chicken or pasta?'."
    },
    {
      "type": "multiple_choice",
      "skill": "use",
      "question": "A passenger says: 'Excuse me, I feel sick.' What is the most professional reply?",
      "options": [
        "Of course, sir. Let me bring you a sick bag right away.",
        "That's not my problem.",
        "You should not have eaten."
      ],
      "correctIndex": 0,
      "explanation": "La respuesta cortes y profesional ofrece ayuda inmediata al pasajero."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "We ___ now beginning our descent into London.",
      "answers": [
        "are"
      ],
      "hint": "Presente continuo con 'we'.",
      "explanation": "Con 'we' en presente continuo: 'We are now beginning...'."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "Please remain seated ___ the seat belt sign is switched off.",
      "answers": [
        "until"
      ],
      "hint": "Conjuncion de tiempo (hasta que).",
      "explanation": "'until' indica el momento hasta el cual hay que permanecer sentado."
    },
    {
      "type": "fill_blank",
      "skill": "vocab",
      "sentence": "Smoking is not ___ anywhere on board, including the lavatories.",
      "answers": [
        "allowed",
        "permitted"
      ],
      "hint": "Permitido (participio).",
      "explanation": "'Smoking is not allowed/permitted' = no esta permitido fumar."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "Could you please ___ off all electronic devices during take-off?",
      "answers": [
        "turn",
        "switch"
      ],
      "hint": "Phrasal verb: apagar (turn/switch ___ off).",
      "explanation": "'turn off' o 'switch off' significan apagar los dispositivos."
    },
    {
      "type": "fill_blank",
      "skill": "use",
      "sentence": "Passenger: 'Can I have some water?' Crew: 'Yes, of ___, sir. Here you are.'",
      "answers": [
        "course"
      ],
      "hint": "Expresion de cortesia: 'of ___'.",
      "explanation": "'Of course' es una forma educada de acceder a una peticion."
    },
    {
      "type": "true_false",
      "skill": "vocab",
      "statement": "A 'life vest' is located under your seat and is used in case of a landing on water.",
      "answer": true,
      "explanation": "El chaleco salvavidas ('life vest') esta bajo el asiento y se usa en un amerizaje."
    },
    {
      "type": "true_false",
      "skill": "vocab",
      "statement": "'Cabin crew, doors to manual' means the slides are now armed for an emergency.",
      "answer": false,
      "explanation": "'Doors to manual' significa desarmar los toboganes; 'doors to automatic/armed' los arma."
    },
    {
      "type": "true_false",
      "skill": "grammar",
      "statement": "The polite request 'Would you mind turning off your phone?' is more formal than 'Turn off your phone.'",
      "answer": true,
      "explanation": "'Would you mind...?' es una peticion mas cortes y formal que el imperativo directo."
    },
    {
      "type": "word_order",
      "skill": "grammar",
      "words": [
        "Please",
        "keep",
        "your",
        "seat",
        "belt",
        "fastened"
      ],
      "correctOrder": [
        "Please",
        "keep",
        "your",
        "seat",
        "belt",
        "fastened"
      ],
      "hint": "Instruccion: 'Please keep your...'."
    },
    {
      "type": "word_order",
      "skill": "grammar",
      "words": [
        "Would",
        "you",
        "like",
        "something",
        "to",
        "drink"
      ],
      "correctOrder": [
        "Would",
        "you",
        "like",
        "something",
        "to",
        "drink"
      ],
      "hint": "Pregunta de ofrecimiento con 'Would you like...?'."
    },
    {
      "type": "word_order",
      "skill": "vocab",
      "words": [
        "The",
        "nearest",
        "exit",
        "may",
        "be",
        "behind",
        "you"
      ],
      "correctOrder": [
        "The",
        "nearest",
        "exit",
        "may",
        "be",
        "behind",
        "you"
      ],
      "hint": "Frase tipica de la demostracion de seguridad."
    },
    {
      "type": "translate",
      "skill": "use",
      "prompt": "Traduce: \"Por favor, abroche su cinturon de seguridad.\"",
      "answers": [
        "please fasten your seat belt",
        "please fasten your seatbelt"
      ],
      "explanation": "Please fasten your seat belt."
    },
    {
      "type": "translate",
      "skill": "use",
      "prompt": "Traduce: \"Estamos a punto de aterrizar.\"",
      "answers": [
        "we are about to land",
        "we're about to land"
      ],
      "explanation": "We are about to land."
    },
    {
      "type": "translate",
      "skill": "use",
      "prompt": "Traduce: \"Bienvenidos a bordo.\"",
      "answers": [
        "welcome on board",
        "welcome aboard"
      ],
      "explanation": "Welcome on board / Welcome aboard."
    },
    {
      "type": "find_error",
      "skill": "grammar",
      "question": "Encuentra el error.",
      "segments": [
        "Please ",
        {
          "u": "returns"
        },
        " your seat ",
        {
          "u": "to"
        },
        " the upright position."
      ],
      "correctIndex": 0,
      "correction": "return (please + base form)",
      "explanation": "Tras 'please' en una instruccion va el verbo en forma base: 'please return'."
    },
    {
      "type": "find_error",
      "skill": "grammar",
      "question": "Encuentra el error.",
      "segments": [
        "The captain ",
        {
          "u": "have"
        },
        " turned ",
        {
          "u": "on"
        },
        " the seat belt sign."
      ],
      "correctIndex": 0,
      "correction": "has (the captain = he/she)",
      "explanation": "Con 'the captain' (tercera persona singular) el presente perfecto usa 'has'."
    },
    {
      "type": "find_error",
      "skill": "vocab",
      "question": "Encuentra el error.",
      "segments": [
        "In an emergency, please ",
        {
          "u": "leave"
        },
        " all your ",
        {
          "u": "luggages"
        },
        " behind."
      ],
      "correctIndex": 1,
      "correction": "luggage (incontable, sin 's')",
      "explanation": "'luggage' es un sustantivo incontable; no se usa en plural con 's'."
    },
    {
      "type": "reading",
      "skill": "reading",
      "title": "The Safety Demonstration",
      "passage": "Good evening, ladies and gentlemen. Before we take off, please give us your attention for a short safety demonstration.\nThere are eight emergency exits on this aircraft: two at the front, four over the wings, and two at the rear. Take a moment to locate the exit nearest to you. Remember that the nearest exit may be behind you.\nIn the event of a loss of cabin pressure, an oxygen mask will drop down automatically. Pull the mask towards you, place it over your nose and mouth, and breathe normally. Please secure your own mask before helping others.\nYour life vest is located under your seat. Do not inflate it inside the aircraft. We wish you a pleasant flight.",
      "questions": [
        {
          "q": "How many emergency exits are there over the wings?",
          "options": [
            "two",
            "four",
            "eight",
            "six"
          ],
          "correctIndex": 1,
          "explanation": "El texto dice 'four over the wings' (cuatro sobre las alas)."
        },
        {
          "q": "What should you do FIRST with the oxygen mask?",
          "options": [
            "Inflate it",
            "Help others first",
            "Secure your own mask",
            "Leave it on the panel"
          ],
          "correctIndex": 2,
          "explanation": "Indica asegurar tu propia mascarilla antes de ayudar a otros."
        },
        {
          "q": "Where is the life vest located?",
          "options": [
            "In the overhead bin",
            "Under your seat",
            "At the rear exit",
            "In the lavatory"
          ],
          "correctIndex": 1,
          "explanation": "'Your life vest is located under your seat' (bajo el asiento)."
        },
        {
          "q": "What does the announcement say about the nearest exit?",
          "options": [
            "It is always at the front",
            "It may be behind you",
            "It is over the wings only",
            "There is no nearest exit"
          ],
          "correctIndex": 1,
          "explanation": "Advierte que la salida mas cercana puede estar detras de ti."
        }
      ]
    },
    {
      "type": "listening",
      "skill": "listening",
      "text": "Ladies and gentlemen, the captain has turned on the seat belt sign. We are expecting some turbulence ahead. Please return to your seats and fasten your seat belts. The lavatories are now closed until further notice.",
      "question": "Why are passengers asked to return to their seats?",
      "options": [
        "Because the meal service is starting",
        "Because of expected turbulence",
        "Because the plane has landed"
      ],
      "correctIndex": 1,
      "explanation": "El anuncio menciona 'expecting some turbulence', por eso deben sentarse."
    }
  ] },
  "political_english": { "name": "Political English", "cefr": "B2–C1", "pass": 75, "exercises": [
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "The summit ___ have been postponed had the two delegations not reached a last-minute compromise.",
      "options": [
        "will",
        "would",
        "should",
        "might"
      ],
      "correctIndex": 1,
      "explanation": "Es un condicional tercero invertido (Had the delegations not reached...). La oración principal usa 'would have been'."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "Not only ___ the treaty unprecedented, but it also redefined the balance of power in the region.",
      "options": [
        "was",
        "it was",
        "were",
        "it were"
      ],
      "correctIndex": 0,
      "explanation": "Tras 'Not only' al inicio hay inversión: auxiliar/verbo antes del sujeto: 'was the treaty'."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "The minister insisted that the report ___ published without further delay.",
      "options": [
        "is",
        "be",
        "was",
        "would be"
      ],
      "correctIndex": 1,
      "explanation": "Tras verbos de mandato como 'insist that' se usa el subjuntivo: 'be published'."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "After months of tension, both sides finally agreed to ___ hostilities and return to the negotiating table.",
      "options": [
        "escalate",
        "cease",
        "provoke",
        "incite"
      ],
      "correctIndex": 1,
      "explanation": "'cease hostilities' = cesar las hostilidades. Las otras significan intensificar o provocar."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "The ambassador's remarks were widely seen as a ___ gesture intended to ease tensions.",
      "options": [
        "belligerent",
        "conciliatory",
        "inflammatory",
        "divisive"
      ],
      "correctIndex": 1,
      "explanation": "'conciliatory' = conciliador, busca calmar tensiones. Las otras son hostiles o divisivas."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "The new sanctions are designed to ___ pressure on the regime without harming civilians.",
      "options": [
        "exert",
        "expel",
        "exempt",
        "exhaust"
      ],
      "correctIndex": 0,
      "explanation": "Colocación 'exert pressure' = ejercer presión."
    },
    {
      "type": "multiple_choice",
      "skill": "use",
      "question": "Choose the most formal alternative: 'We need to talk about this issue right now.'",
      "options": [
        "We gotta sort this out now.",
        "This matter must be addressed without delay.",
        "Let's deal with it quick.",
        "We should chat about it soon."
      ],
      "correctIndex": 1,
      "explanation": "El registro diplomático prefiere 'This matter must be addressed without delay': impersonal y formal."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "___ the ongoing crisis, the delegates remained committed to dialogue.",
      "options": [
        "Despite of",
        "In spite",
        "Notwithstanding",
        "Although"
      ],
      "correctIndex": 2,
      "explanation": "'Notwithstanding' (a pesar de) es preposición de registro formal seguida de sustantivo. 'Despite of' es incorrecto, 'In spite' va con 'of', y 'Although' requiere oración."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "Were the council ___ reject the proposal, the consequences would be severe.",
      "answers": [
        "to"
      ],
      "hint": "Condicional formal invertido con 'Were ... to'.",
      "explanation": "'Were the council to reject' es la inversión formal de 'If the council were to reject'."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "The resolution was passed ___ a narrow margin after a heated debate.",
      "answers": [
        "by"
      ],
      "hint": "Preposición que indica margen.",
      "explanation": "'passed by a narrow margin' = aprobada por un estrecho margen."
    },
    {
      "type": "fill_blank",
      "skill": "vocab",
      "sentence": "The opposition accused the government of ___ democratic norms during the election.",
      "answers": [
        "undermining",
        "eroding"
      ],
      "hint": "Verbo en -ing: debilitar/socavar.",
      "explanation": "'undermining' o 'eroding democratic norms' = socavar/erosionar las normas democráticas."
    },
    {
      "type": "fill_blank",
      "skill": "vocab",
      "sentence": "In her keynote address, the president called for global ___ to tackle climate change.",
      "answers": [
        "cooperation",
        "solidarity"
      ],
      "hint": "Sustantivo: trabajar juntos a nivel mundial.",
      "explanation": "'global cooperation' (o 'solidarity') = cooperación/solidaridad mundial."
    },
    {
      "type": "fill_blank",
      "skill": "use",
      "sentence": "The spokesperson refused to comment, ___ that the matter was still under review.",
      "answers": [
        "stating",
        "noting",
        "claiming"
      ],
      "hint": "Verbo en -ing que introduce una explicación.",
      "explanation": "Cláusula participial: 'stating/noting that...' añade la razón de forma fluida y formal."
    },
    {
      "type": "true_false",
      "skill": "vocab",
      "statement": "A 'unilateral' decision is one made jointly by several countries.",
      "answer": false,
      "explanation": "'Unilateral' significa que una sola parte decide; lo conjunto sería 'multilateral'."
    },
    {
      "type": "true_false",
      "skill": "vocab",
      "statement": "To 'ratify' a treaty means to formally approve and confirm it.",
      "answer": true,
      "explanation": "'ratify' = ratificar, dar aprobación oficial a un tratado."
    },
    {
      "type": "true_false",
      "skill": "vocab",
      "statement": "A 'rhetorical question' is asked in order to receive a detailed factual answer.",
      "answer": false,
      "explanation": "Una pregunta retórica busca efecto persuasivo, no una respuesta; es un recurso de oratoria."
    },
    {
      "type": "word_order",
      "skill": "grammar",
      "words": [
        "Under",
        "no",
        "circumstances",
        "will",
        "we",
        "abandon",
        "our",
        "allies"
      ],
      "correctOrder": [
        "Under",
        "no",
        "circumstances",
        "will",
        "we",
        "abandon",
        "our",
        "allies"
      ],
      "hint": "Expresión negativa al inicio que exige inversión sujeto-auxiliar."
    },
    {
      "type": "word_order",
      "skill": "grammar",
      "words": [
        "The",
        "delegation",
        "is",
        "determined",
        "to",
        "reach",
        "a",
        "lasting",
        "agreement"
      ],
      "correctOrder": [
        "The",
        "delegation",
        "is",
        "determined",
        "to",
        "reach",
        "a",
        "lasting",
        "agreement"
      ],
      "hint": "'be determined to' + infinitivo."
    },
    {
      "type": "find_error",
      "skill": "grammar",
      "question": "Encuentra el error en esta frase de registro formal.",
      "segments": [
        "Should the talks ",
        {
          "u": "will collapse"
        },
        ", the international community ",
        {
          "u": "would intervene"
        },
        " immediately."
      ],
      "correctIndex": 0,
      "correction": "collapse (Should + verbo en infinitivo sin 'will')",
      "explanation": "En el condicional invertido con 'Should', el verbo va en infinitivo sin 'will': 'Should the talks collapse'."
    },
    {
      "type": "find_error",
      "skill": "use",
      "question": "Encuentra el error de colocación.",
      "segments": [
        "After lengthy talks, the two sides finally ",
        {
          "u": "arrived to"
        },
        " a ",
        {
          "u": "compromise"
        },
        " acceptable to everyone."
      ],
      "correctIndex": 0,
      "correction": "reached / arrived at (arrived to -> reached a compromise / arrived at a compromise)",
      "explanation": "La colocación correcta es 'reach a compromise' o 'arrive at a compromise'; 'arrived to' es incorrecto. 'compromise' está bien usado."
    },
    {
      "type": "translate",
      "skill": "use",
      "prompt": "Traduce al inglés en registro formal: \"Las negociaciones se rompieron debido a profundos desacuerdos.\"",
      "answers": [
        "the negotiations broke down due to deep disagreements",
        "the talks broke down due to deep disagreements",
        "the negotiations broke down because of deep disagreements",
        "the negotiations collapsed due to deep disagreements"
      ],
      "explanation": "'break down' o 'collapse' = romperse/fracasar; 'due to' = debido a."
    },
    {
      "type": "translate",
      "skill": "use",
      "prompt": "Traduce al inglés: \"El presidente pidió un alto el fuego inmediato.\"",
      "answers": [
        "the president called for an immediate ceasefire",
        "the president called for an immediate cease-fire",
        "the president demanded an immediate ceasefire"
      ],
      "explanation": "'call for' = pedir/exigir; 'ceasefire' = alto el fuego."
    },
    {
      "type": "reading",
      "skill": "reading",
      "title": "The Language of Diplomacy",
      "passage": "Diplomatic language is often described as deliberately ambiguous, and for good reason. When a foreign ministry states that talks were \"frank and constructive,\" seasoned observers understand that the parties disagreed sharply but agreed to keep negotiating. This carefully calibrated vocabulary allows governments to signal disapproval without slamming the door on future cooperation.\n\nCritics argue that such euphemism breeds public distrust, since citizens struggle to decode what their leaders actually mean. Defenders counter that vagueness is a feature, not a flaw: it preserves the flexibility required to de-escalate crises and grants each side room to retreat without losing face. A blunt communiqué, by contrast, can harden positions and make compromise politically impossible.\n\nIn an era of instant media, however, this tradition is under strain. Soundbites travel faster than context, and a phrase intended for fellow diplomats may be quoted out of context to a domestic audience hungry for decisive rhetoric. The challenge for modern diplomats is to remain precise enough to be understood, yet measured enough to keep every option open.",
      "questions": [
        {
          "q": "What does the passage suggest the phrase 'frank and constructive' typically conceals?",
          "options": [
            "Complete agreement between the parties",
            "Serious disagreement combined with a willingness to continue",
            "A formal end to all negotiations",
            "An accidental misunderstanding"
          ],
          "correctIndex": 1,
          "explanation": "El texto dice que la frase implica que las partes discreparon con dureza pero acordaron seguir negociando."
        },
        {
          "q": "According to defenders of diplomatic vagueness, what is its main advantage?",
          "options": [
            "It makes leaders more popular",
            "It allows sides to back down without losing face",
            "It speeds up media coverage",
            "It eliminates the need for negotiation"
          ],
          "correctIndex": 1,
          "explanation": "Los defensores dicen que la vaguedad da margen para retroceder sin perder prestigio ('without losing face')."
        },
        {
          "q": "Why is this diplomatic tradition described as 'under strain' today?",
          "options": [
            "Diplomats no longer receive training",
            "Soundbites spread quickly and may be quoted out of context",
            "Governments have banned ambiguous language",
            "Citizens have stopped following the news"
          ],
          "correctIndex": 1,
          "explanation": "El texto señala que los soundbites viajan más rápido que el contexto y pueden citarse fuera de contexto."
        },
        {
          "q": "What does the word 'euphemism' most nearly mean as used in the passage?",
          "options": [
            "A direct insult",
            "A mild or vague expression used instead of a blunt one",
            "A grammatical error",
            "A type of formal treaty"
          ],
          "correctIndex": 1,
          "explanation": "'Euphemism' es una expresión suave o vaga que sustituye a una más directa o dura."
        },
        {
          "q": "What is the author's overall stance on diplomatic language?",
          "options": [
            "It is purely harmful and should be abolished",
            "It is outdated and irrelevant",
            "It is a balancing act with both costs and benefits",
            "It is only useful for the media"
          ],
          "correctIndex": 2,
          "explanation": "El autor presenta críticas y defensas, y concluye que es un equilibrio entre precisión y prudencia."
        }
      ]
    },
    {
      "type": "listening",
      "skill": "listening",
      "text": "Honourable delegates, we did not gather here to assign blame for the failures of the past. We gathered to build the institutions that will prevent those failures from being repeated. Let us therefore measure our success not by the speeches we deliver today, but by the commitments we are willing to keep tomorrow.",
      "question": "What is the speaker's main point?",
      "options": [
        "The conference should focus on punishing those responsible for past mistakes",
        "Success depends on future commitments rather than today's speeches",
        "The delegates should deliver more impressive speeches",
        "Past institutions were perfectly adequate"
      ],
      "correctIndex": 1,
      "explanation": "El orador dice que el éxito debe medirse por los compromisos que se mantendrán mañana, no por los discursos de hoy."
    }
  ] },
  "cci1": { "name": "Curso Intensivo (CCI 1)", "cefr": "A1–A2", "pass": 70, "exercises": [
    {
      "type": "multiple_choice",
      "skill": "use",
      "question": "You meet someone for the first time. What do you say?",
      "options": [
        "Nice to meet you.",
        "See you later.",
        "I'm fine, thanks."
      ],
      "correctIndex": 0,
      "explanation": "Al conocer a alguien por primera vez se dice 'Nice to meet you.'"
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "Hello! My name ___ Anna.",
      "options": [
        "am",
        "is",
        "are"
      ],
      "correctIndex": 1,
      "explanation": "Con 'name' (=it/she) usamos 'is'."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "___ are you from? I'm from Mexico.",
      "answers": [
        "where"
      ],
      "hint": "Pregunta por el lugar de origen.",
      "explanation": "Para preguntar el origen usamos 'Where are you from?'"
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "He ___ coffee every morning.",
      "options": [
        "drink",
        "drinks",
        "drinking"
      ],
      "correctIndex": 1,
      "explanation": "En presente simple, con 'he' se añade -s: 'drinks'."
    },
    {
      "type": "find_error",
      "skill": "grammar",
      "question": "Encuentra el error.",
      "segments": [
        "My sister ",
        {
          "u": "don't"
        },
        " ",
        {
          "u": "like"
        },
        " tea."
      ],
      "correctIndex": 0,
      "correction": "doesn't (she -> doesn't)",
      "explanation": "Con 'my sister' (=she) la negación es 'doesn't'; 'like' es correcto."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "They ___ not from England.",
      "answers": [
        "are"
      ],
      "hint": "Verbo 'to be' con 'they'.",
      "explanation": "Con 'they' usamos 'are': 'They are not'."
    },
    {
      "type": "word_order",
      "skill": "grammar",
      "words": [
        "I",
        "get",
        "up",
        "at",
        "seven"
      ],
      "correctOrder": [
        "I",
        "get",
        "up",
        "at",
        "seven"
      ],
      "hint": "Rutina diaria en presente simple."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "___ you like pizza? Yes, I do.",
      "options": [
        "Do",
        "Does",
        "Are"
      ],
      "correctIndex": 0,
      "explanation": "Para preguntas en presente simple con 'you' usamos 'Do'."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "She ___ to school by bus.",
      "answers": [
        "goes"
      ],
      "hint": "Presente simple con 'she'.",
      "explanation": "El verbo 'go' con 'she' es 'goes'."
    },
    {
      "type": "word_order",
      "skill": "grammar",
      "words": [
        "Does",
        "he",
        "work",
        "on",
        "Sunday"
      ],
      "correctOrder": [
        "Does",
        "he",
        "work",
        "on",
        "Sunday"
      ],
      "hint": "Pregunta en presente simple con 'he'."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "Yesterday I ___ to the park.",
      "options": [
        "go",
        "goes",
        "went"
      ],
      "correctIndex": 2,
      "explanation": "El pasado simple de 'go' es 'went'."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "We ___ a film last night.",
      "answers": [
        "watched"
      ],
      "hint": "Pasado simple de 'watch'.",
      "explanation": "El pasado simple regular de 'watch' es 'watched'."
    },
    {
      "type": "true_false",
      "skill": "grammar",
      "statement": "The past simple of 'eat' is 'eated'.",
      "answer": false,
      "explanation": "'eat' es irregular; su pasado es 'ate', no 'eated'."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "Which word is a family member?",
      "options": [
        "kitchen",
        "brother",
        "yellow"
      ],
      "correctIndex": 1,
      "explanation": "'brother' (hermano) es un miembro de la familia."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "Which word is a greeting?",
      "options": [
        "Goodbye",
        "Hello",
        "Sorry"
      ],
      "correctIndex": 1,
      "explanation": "'Hello' es un saludo."
    },
    {
      "type": "true_false",
      "skill": "vocab",
      "statement": "'Breakfast' is the meal you eat in the morning.",
      "answer": true,
      "explanation": "'Breakfast' es la comida de la mañana."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "I brush my ___ after breakfast.",
      "options": [
        "teeth",
        "shoes",
        "homework"
      ],
      "correctIndex": 0,
      "explanation": "Se dice 'brush my teeth' (lavarse los dientes)."
    },
    {
      "type": "true_false",
      "skill": "vocab",
      "statement": "We use 'an' before 'apple'.",
      "answer": true,
      "explanation": "'apple' empieza por sonido vocálico, por eso usamos 'an'."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "What is the opposite of 'big'?",
      "options": [
        "tall",
        "small",
        "long"
      ],
      "correctIndex": 1,
      "explanation": "El opuesto de 'big' es 'small'."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "At night, before sleeping, I ___.",
      "options": [
        "go to bed",
        "wake up",
        "get up"
      ],
      "correctIndex": 0,
      "explanation": "'go to bed' significa irse a dormir."
    },
    {
      "type": "translate",
      "skill": "use",
      "prompt": "Traduce: \"Me llamo Pedro.\"",
      "answers": [
        "my name is pedro",
        "i am pedro",
        "i'm pedro"
      ],
      "explanation": "My name is Pedro. / I'm Pedro."
    },
    {
      "type": "translate",
      "skill": "use",
      "prompt": "Traduce: \"Fui al cine ayer.\"",
      "answers": [
        "i went to the cinema yesterday",
        "i went to the movies yesterday"
      ],
      "explanation": "I went to the cinema yesterday."
    },
    {
      "type": "multiple_choice",
      "skill": "use",
      "question": "Someone says 'How are you?'. A good answer is:",
      "options": [
        "I'm from Spain.",
        "I'm fine, thank you.",
        "It's three o'clock."
      ],
      "correctIndex": 1,
      "explanation": "'I'm fine, thank you' responde a '¿Cómo estás?'"
    },
    {
      "type": "translate",
      "skill": "use",
      "prompt": "Traduce: \"Ella se levanta a las seis.\"",
      "answers": [
        "she gets up at six",
        "she gets up at six o'clock"
      ],
      "explanation": "She gets up at six."
    },
    {
      "type": "reading",
      "skill": "reading",
      "title": "My Day",
      "passage": "Hi! I am Tom. I am a student. Every day I get up at seven o'clock.\nI have breakfast with my family. Then I go to school by bus.\nIn the evening I do my homework and watch TV. I go to bed at ten.",
      "questions": [
        {
          "q": "What time does Tom get up?",
          "options": [
            "At six o'clock",
            "At seven o'clock",
            "At ten o'clock"
          ],
          "correctIndex": 1,
          "explanation": "El texto dice 'I get up at seven o'clock.'"
        },
        {
          "q": "How does Tom go to school?",
          "options": [
            "By bus",
            "By car",
            "On foot"
          ],
          "correctIndex": 0,
          "explanation": "Dice 'I go to school by bus.'"
        },
        {
          "q": "What does Tom do in the evening?",
          "options": [
            "He plays football",
            "He does his homework and watches TV",
            "He cooks dinner"
          ],
          "correctIndex": 1,
          "explanation": "Dice 'I do my homework and watch TV.'"
        },
        {
          "q": "What is the text mainly about?",
          "options": [
            "Tom's daily routine",
            "Tom's holidays",
            "Tom's family trip"
          ],
          "correctIndex": 0,
          "explanation": "El texto describe la rutina diaria de Tom."
        }
      ]
    },
    {
      "type": "listening",
      "skill": "listening",
      "text": "Hello, my name is Sara. I am from Italy. I am twelve years old. I like music and football.",
      "question": "Where is Sara from?",
      "options": [
        "Spain",
        "Italy",
        "England"
      ],
      "correctIndex": 1,
      "explanation": "Sara dice 'I am from Italy.'"
    }
  ] },
  "exam_prep": { "name": "Exam Prep · Vol. 1", "cefr": "B2–C1", "pass": 75, "exercises": [
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "Not until she had read the contract twice ___ what she was agreeing to.",
      "options": [
        "she realised",
        "did she realise",
        "she did realise",
        "had she realised"
      ],
      "correctIndex": 1,
      "explanation": "Tras una expresion negativa al inicio ('Not until...') se aplica inversion: auxiliar + sujeto + verbo ('did she realise')."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "Complete the sentence transformation. Original: 'It's possible that he missed the train.' He ___ the train.",
      "options": [
        "must have missed",
        "may have missed",
        "should have missed",
        "can't have missed"
      ],
      "correctIndex": 1,
      "explanation": "'It's possible' expresa posibilidad pasada, equivalente a 'may/might have + participio'. 'must have' seria certeza."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "Hardly ___ the meeting when the fire alarm went off.",
      "options": [
        "we had started",
        "had we started",
        "we started",
        "did we start"
      ],
      "correctIndex": 1,
      "explanation": "'Hardly' en posicion inicial fuerza inversion con el pasado perfecto: 'Hardly had we started ... when ...'."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "I'd rather you ___ anything to her about the surprise party.",
      "options": [
        "don't say",
        "didn't say",
        "wouldn't say",
        "haven't said"
      ],
      "correctIndex": 1,
      "explanation": "'I'd rather + sujeto' pide pasado subjuntivo para el presente/futuro: 'I'd rather you didn't say'."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "Choose the correct cleft sentence. ___ that finally convinced the board to approve the budget.",
      "options": [
        "It was her presentation",
        "It was her presentation what",
        "That was her presentation",
        "Her presentation was it"
      ],
      "correctIndex": 0,
      "explanation": "En las oraciones enfaticas (cleft) la estructura es 'It was + elemento enfatizado + that...'. No se usa 'what' aqui."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "No sooner ___ the door than the phone started ringing.",
      "answers": [
        "had i closed",
        "had i shut"
      ],
      "hint": "Inversion tras 'No sooner' + pasado perfecto.",
      "explanation": "'No sooner' al inicio exige inversion y pasado perfecto: 'No sooner had I closed the door than...'."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "Were it ___ for your help, we would never have finished on time.",
      "answers": [
        "not"
      ],
      "hint": "Condicional formal invertido equivalente a 'If it were not for...'.",
      "explanation": "La forma invertida de 'If it were not for' es 'Were it not for', sin 'if'."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "She insisted ___ paying for the entire meal herself.",
      "answers": [
        "on"
      ],
      "hint": "Verbo + preposicion fija seguido de gerundio.",
      "explanation": "'Insist' rige la preposicion 'on' + gerundio: 'insisted on paying'."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "Rephrase keeping the meaning: 'You needn't have bought milk; we already had some.' It ___ necessary to buy milk.",
      "answers": [
        "wasn't",
        "was not"
      ],
      "hint": "Algo que se hizo pero no hacia falta en el pasado.",
      "explanation": "'Needn't have bought' indica una accion innecesaria ya realizada; 'It wasn't necessary' refleja ese matiz."
    },
    {
      "type": "find_error",
      "skill": "grammar",
      "question": "Encuentra el error de gramatica avanzada.",
      "segments": [
        "Despite ",
        {
          "u": "of"
        },
        " the heavy rain, the match ",
        {
          "u": "went ahead"
        },
        " as ",
        {
          "u": "scheduled"
        },
        "."
      ],
      "correctIndex": 0,
      "correction": "Despite (sin 'of')",
      "explanation": "'Despite' va seguido directamente de un sustantivo o gerundio, nunca de 'of'. Solo 'in spite of' lleva 'of'."
    },
    {
      "type": "find_error",
      "skill": "grammar",
      "question": "Encuentra el error en esta tarea de correccion.",
      "segments": [
        "If I ",
        {
          "u": "would have known"
        },
        " about the delay, I ",
        {
          "u": "would have left"
        },
        " ",
        {
          "u": "earlier"
        },
        "."
      ],
      "correctIndex": 0,
      "correction": "had known",
      "explanation": "En el tercer condicional la clausula 'if' usa pasado perfecto ('had known'), no 'would have'."
    },
    {
      "type": "find_error",
      "skill": "grammar",
      "question": "Encuentra el error.",
      "segments": [
        "The chairman of the committee ",
        {
          "u": "have"
        },
        " not yet ",
        {
          "u": "reached"
        },
        " ",
        {
          "u": "a decision"
        },
        "."
      ],
      "correctIndex": 0,
      "correction": "has",
      "explanation": "El sujeto singular 'The chairman' (=he) exige verbo en singular: 'The chairman ... has not yet reached'. El nucleo del sujeto es 'chairman', no 'committee'."
    },
    {
      "type": "word_order",
      "skill": "grammar",
      "words": [
        "Only",
        "after",
        "the",
        "results",
        "came",
        "in",
        "did",
        "we",
        "celebrate"
      ],
      "correctOrder": [
        "Only",
        "after",
        "the",
        "results",
        "came",
        "in",
        "did",
        "we",
        "celebrate"
      ],
      "hint": "Inversion tras 'Only after...': auxiliar + sujeto + verbo."
    },
    {
      "type": "word_order",
      "skill": "grammar",
      "words": [
        "Such",
        "was",
        "her",
        "determination",
        "that",
        "nobody",
        "could",
        "stop",
        "her"
      ],
      "correctOrder": [
        "Such",
        "was",
        "her",
        "determination",
        "that",
        "nobody",
        "could",
        "stop",
        "her"
      ],
      "hint": "Estructura enfatica 'Such + be + sustantivo + that...'."
    },
    {
      "type": "true_false",
      "skill": "vocab",
      "statement": "In a formal essay, 'nevertheless' and 'however' can both introduce a contrasting idea.",
      "answer": true,
      "explanation": "Ambos son conectores de contraste validos en registro formal."
    },
    {
      "type": "true_false",
      "skill": "vocab",
      "statement": "The phrasal verb 'to put off' means 'to encourage someone to do something'.",
      "answer": false,
      "explanation": "'To put off' significa 'posponer' o 'disuadir/desanimar', nunca 'animar'."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "Choose the word that best fits: 'The new policy had a profound ___ on staff morale.'",
      "options": [
        "affect",
        "effect",
        "impact of",
        "affection"
      ],
      "correctIndex": 1,
      "explanation": "Se necesita el sustantivo 'effect' ('efecto'). 'Affect' es normalmente verbo."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "Which collocation is correct?",
      "options": [
        "make a research",
        "do a research",
        "carry out research",
        "perform a research"
      ],
      "correctIndex": 2,
      "explanation": "'Research' es incontable y colocaciona con 'carry out / do research', sin articulo 'a'."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "Complete the idiom: 'The exam was a piece of ___; I finished in twenty minutes.'",
      "options": [
        "pie",
        "cake",
        "bread",
        "luck"
      ],
      "correctIndex": 1,
      "explanation": "'A piece of cake' es un modismo que significa 'muy facil'."
    },
    {
      "type": "fill_blank",
      "skill": "vocab",
      "sentence": "Word formation: He showed great ___ (PATIENT) while waiting for the results.",
      "answers": [
        "patience"
      ],
      "hint": "Forma el sustantivo del adjetivo 'patient'.",
      "explanation": "El sustantivo de 'patient' es 'patience'."
    },
    {
      "type": "fill_blank",
      "skill": "vocab",
      "sentence": "Word formation: Her argument was completely ___ (CONVINCE), so we all agreed.",
      "answers": [
        "convincing"
      ],
      "hint": "Adjetivo derivado del verbo 'convince'.",
      "explanation": "El adjetivo correcto es 'convincing' (convincente)."
    },
    {
      "type": "translate",
      "skill": "use",
      "prompt": "Traduce manteniendo el registro formal: \"De no ser por tu consejo, habria cometido un grave error.\"",
      "answers": [
        "had it not been for your advice, i would have made a serious mistake",
        "if it had not been for your advice, i would have made a serious mistake",
        "if it weren't for your advice, i would have made a serious mistake",
        "but for your advice, i would have made a serious mistake"
      ],
      "explanation": "'Had it not been for your advice, I would have made a serious mistake' usa el condicional invertido formal."
    },
    {
      "type": "translate",
      "skill": "use",
      "prompt": "Traduce usando voz pasiva: \"Se cree que el sospechoso ha huido del pais.\"",
      "answers": [
        "the suspect is believed to have fled the country",
        "it is believed that the suspect has fled the country",
        "the suspect is believed to have left the country"
      ],
      "explanation": "La pasiva de informe: 'The suspect is believed to have fled the country' o 'It is believed that...'."
    },
    {
      "type": "translate",
      "skill": "use",
      "prompt": "Transforma a estilo indirecto y traduce: \"Ella dijo: 'Terminare el informe manana'.\"",
      "answers": [
        "she said she would finish the report the next day",
        "she said she would finish the report the following day",
        "she said that she would finish the report the next day"
      ],
      "explanation": "En estilo indirecto 'will' pasa a 'would' y 'tomorrow' a 'the next/following day'."
    },
    {
      "type": "multiple_choice",
      "skill": "use",
      "question": "Open cloze — choose the word that fits the gap: 'Little ___ they know that the decision had already been made.'",
      "options": [
        "do",
        "did",
        "have",
        "were"
      ],
      "correctIndex": 1,
      "explanation": "Tras 'Little' inicial hay inversion; el contexto pasado pide el auxiliar 'did': 'Little did they know'."
    },
    {
      "type": "reading",
      "skill": "reading",
      "title": "The Strategy Behind Exam Success",
      "passage": "Many candidates approach a high-level English exam as though raw vocabulary alone will carry them through. In reality, examiners consistently report that the difference between a competent and an outstanding script lies not in the number of advanced words deployed, but in the precision with which structures are controlled. A single misplaced auxiliary in an inverted sentence, or an unnecessary preposition after 'despite', can quietly undermine an otherwise sophisticated answer.\nReading tasks reward a similar discipline. Skilled test-takers rarely read every line at the same pace. Instead, they skim first to grasp the overall argument, then scan for the specific detail a question demands. Crucially, they pay attention to signposting words such as 'however', 'consequently' and 'nevertheless', which reveal how the writer's ideas connect and often point directly to the answer a question is testing.\nPerhaps the most overlooked skill, however, is time management. A candidate who spends fifteen minutes perfecting a single transformation may produce a flawless sentence yet leave three questions blank. The strongest performers treat the clock as part of the test itself, allocating their minutes deliberately and returning to difficult items only once the easier marks have been secured.",
      "questions": [
        {
          "q": "According to the first paragraph, what most distinguishes an outstanding script?",
          "options": [
            "The quantity of advanced vocabulary used",
            "The precise control of grammatical structures",
            "The length of the answers",
            "The use of rare idioms"
          ],
          "correctIndex": 1,
          "explanation": "El parrafo afirma que la diferencia esta en la precision con que se controlan las estructuras, no en la cantidad de vocabulario."
        },
        {
          "q": "What does the writer suggest skilled readers do FIRST when tackling a reading task?",
          "options": [
            "Read every line at the same careful pace",
            "Scan for specific details",
            "Skim to grasp the overall argument",
            "Memorise the signposting words"
          ],
          "correctIndex": 2,
          "explanation": "El texto dice que primero hacen 'skim' para captar el argumento general y luego 'scan' para detalles."
        },
        {
          "q": "Why are words like 'however' and 'consequently' described as important?",
          "options": [
            "They are difficult to spell",
            "They show how ideas connect and point to answers",
            "They must be avoided in formal writing",
            "They are examples of inversion"
          ],
          "correctIndex": 1,
          "explanation": "El texto explica que estos conectores revelan como se enlazan las ideas y a menudo senalan la respuesta."
        },
        {
          "q": "What does the writer imply about a candidate who perfects one transformation for fifteen minutes?",
          "options": [
            "They will certainly pass",
            "They manage time well",
            "They risk leaving other questions unanswered",
            "They impress the examiner most"
          ],
          "correctIndex": 2,
          "explanation": "El ejemplo ilustra el mal manejo del tiempo: una respuesta perfecta pero tres preguntas sin contestar."
        },
        {
          "q": "What is the main idea of the passage as a whole?",
          "options": [
            "Vocabulary is the only thing examiners value",
            "Exam success depends on strategy, accuracy and time management, not just vocabulary",
            "Reading tasks should always be done slowly",
            "Inversion is the hardest grammar point"
          ],
          "correctIndex": 1,
          "explanation": "El pasaje sostiene que el exito combina control gramatical, estrategia de lectura y gestion del tiempo, mas alla del vocabulario."
        }
      ]
    },
    {
      "type": "listening",
      "skill": "listening",
      "text": "When I mark transformation tasks, the most common mistake I see is candidates changing the meaning of the original sentence just to fit a structure they feel comfortable with. My advice is simple: never sacrifice meaning for grammar. Identify the key idea first, then choose a structure that preserves it exactly, even if that structure feels less familiar to you.",
      "question": "What is the speaker's main piece of advice?",
      "options": [
        "Always use the most familiar structure",
        "Keep the original meaning rather than forcing a comfortable structure",
        "Avoid sentence transformation tasks entirely",
        "Spend as long as possible on each item"
      ],
      "correctIndex": 1,
      "explanation": "El hablante aconseja no sacrificar el significado por la gramatica: primero el sentido, luego una estructura que lo conserve."
    }
  ] },
  "exam_prep_vol2": { "name": "Exam Prep · Vol. 2", "cefr": "B2–C1", "pass": 75, "exercises": [
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "After years of research, the team finally managed to ___ a breakthrough in cancer treatment.",
      "options": [
        "do",
        "make",
        "reach",
        "take"
      ],
      "correctIndex": 1,
      "explanation": "La colocación correcta es 'make a breakthrough'. 'do/take' no se combinan con 'breakthrough' y 'reach' no es idiomático aquí."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "The new policy is expected to have a profound ___ on the local economy.",
      "options": [
        "affect",
        "impact",
        "result",
        "outcome"
      ],
      "correctIndex": 1,
      "explanation": "'have an impact on' es la colocación habitual. 'affect' es verbo, no sustantivo; 'result/outcome' no admiten 'have a profound ___ on'."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "The committee raised a number of ___ objections to the proposal during the debate.",
      "options": [
        "strong",
        "heavy",
        "big",
        "large"
      ],
      "correctIndex": 0,
      "explanation": "La colocación natural es 'strong objections'. 'heavy/big/large objections' no son colocaciones correctas en inglés."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "The negotiations broke ___ when neither side was willing to compromise.",
      "options": [
        "off",
        "down",
        "up",
        "out"
      ],
      "correctIndex": 1,
      "explanation": "'break down' = fracasar/colapsar (negociaciones). 'break off' sería interrumpir, pero el contexto de fracaso pide 'down'."
    },
    {
      "type": "multiple_choice",
      "skill": "vocab",
      "question": "I can't ___ why anyone would behave so irrationally.",
      "options": [
        "work out",
        "make up",
        "take in",
        "put off"
      ],
      "correctIndex": 0,
      "explanation": "'work out' = entender/descifrar. 'make up' = inventar, 'take in' = comprender/asimilar (suele requerir otro objeto), 'put off' = posponer."
    },
    {
      "type": "fill_blank",
      "skill": "vocab",
      "sentence": "The company had to ___ back on spending after the disappointing quarterly results.",
      "answers": [
        "cut"
      ],
      "hint": "Phrasal verb que significa 'reducir'.",
      "explanation": "'cut back on' = reducir (gastos). El verbo que falta es 'cut'."
    },
    {
      "type": "fill_blank",
      "skill": "vocab",
      "sentence": "You should always ___ up your work in case the computer crashes.",
      "answers": [
        "back"
      ],
      "hint": "Phrasal verb relacionado con copias de seguridad.",
      "explanation": "'back up' = hacer una copia de seguridad. El verbo es 'back'."
    },
    {
      "type": "true_false",
      "skill": "vocab",
      "statement": "In the collocation 'pay attention', 'pay' is the correct verb, not 'make' or 'do'.",
      "answer": true,
      "explanation": "La colocación fija es 'pay attention'. No se dice 'make/do attention'."
    },
    {
      "type": "true_false",
      "skill": "vocab",
      "statement": "The phrasal verb 'put up with' means to tolerate or endure something unpleasant.",
      "answer": true,
      "explanation": "'put up with' significa tolerar/soportar. La afirmación es correcta."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "The scientist's latest ___ has been widely praised by the academic community.",
      "answers": [
        "discovery"
      ],
      "hint": "Formación de palabras: sustantivo derivado de 'discover'.",
      "explanation": "De 'discover' (verbo) se forma el sustantivo 'discovery'."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "His ___ to detail makes him an excellent editor.",
      "answers": [
        "attention",
        "attentiveness"
      ],
      "hint": "Sustantivo derivado de 'attend/attentive'.",
      "explanation": "El sustantivo 'attention' (o 'attentiveness') completa la colocación 'attention to detail'."
    },
    {
      "type": "fill_blank",
      "skill": "grammar",
      "sentence": "The instructions were so ___ that nobody could follow them.",
      "answers": [
        "unclear",
        "confusing",
        "incomprehensible"
      ],
      "hint": "Adjetivo con prefijo negativo de 'clear', o sinónimo.",
      "explanation": "Word formation con prefijo negativo: 'unclear'. También valen sinónimos como 'confusing/incomprehensible'."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "Choose the correct word-formation: 'The government introduced a series of measures to reduce unemployment and boost economic ___.'",
      "options": [
        "grow",
        "growing",
        "growth",
        "grew"
      ],
      "correctIndex": 2,
      "explanation": "Se necesita el sustantivo 'growth' (de 'grow'). 'economic growth' es además una colocación habitual."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "Not until the meeting ended ___ that the deal had collapsed.",
      "options": [
        "we realised",
        "did we realise",
        "we did realise",
        "had we realised"
      ],
      "correctIndex": 1,
      "explanation": "Tras un adverbio negativo al inicio ('Not until...') hay inversión: 'did we realise'."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "If I ___ about the traffic, I would have left earlier.",
      "options": [
        "knew",
        "had known",
        "would know",
        "have known"
      ],
      "correctIndex": 1,
      "explanation": "Tercer condicional (situación pasada irreal): 'If I had known...'."
    },
    {
      "type": "multiple_choice",
      "skill": "grammar",
      "question": "By the time we arrive, the film ___ already.",
      "options": [
        "will start",
        "starts",
        "will have started",
        "is starting"
      ],
      "correctIndex": 2,
      "explanation": "Futuro perfecto para una acción completada antes de un momento futuro: 'will have started'."
    },
    {
      "type": "find_error",
      "skill": "grammar",
      "question": "Encuentra el error en la oración.",
      "segments": [
        "The report ",
        {
          "u": "was wrote"
        },
        " by a team of experts who ",
        {
          "u": "had been working"
        },
        " on it for months."
      ],
      "correctIndex": 0,
      "correction": "was written (pasiva con participio)",
      "explanation": "La pasiva requiere el participio: 'was written', no 'was wrote'. La segunda parte ('had been working') es correcta."
    },
    {
      "type": "find_error",
      "skill": "grammar",
      "question": "Encuentra el error en la oración.",
      "segments": [
        "She is one of the ",
        {
          "u": "most talented"
        },
        " musicians ",
        {
          "u": "that"
        },
        " I have ",
        {
          "u": "never"
        },
        " heard."
      ],
      "correctIndex": 2,
      "correction": "ever (en oraciones afirmativas con present perfect se usa 'ever')",
      "explanation": "En 'I have ___ heard', con sentido afirmativo tras un superlativo, se usa 'ever', no 'never'."
    },
    {
      "type": "word_order",
      "skill": "grammar",
      "words": [
        "Rarely",
        "have",
        "I",
        "seen",
        "such",
        "a",
        "powerful",
        "performance"
      ],
      "correctOrder": [
        "Rarely",
        "have",
        "I",
        "seen",
        "such",
        "a",
        "powerful",
        "performance"
      ],
      "hint": "Inversión tras adverbio negativo al inicio de la frase."
    },
    {
      "type": "word_order",
      "skill": "grammar",
      "words": [
        "No",
        "sooner",
        "had",
        "they",
        "left",
        "than",
        "it",
        "started",
        "to",
        "rain"
      ],
      "correctOrder": [
        "No",
        "sooner",
        "had",
        "they",
        "left",
        "than",
        "it",
        "started",
        "to",
        "rain"
      ],
      "hint": "Estructura 'No sooner... than' con inversión y past perfect."
    },
    {
      "type": "translate",
      "skill": "use",
      "prompt": "Traduce al inglés: \"Vale la pena considerar todas las opciones antes de decidir.\"",
      "answers": [
        "it is worth considering all the options before deciding",
        "it's worth considering all the options before deciding",
        "it is worth considering all options before deciding",
        "it's worth considering all options before deciding"
      ],
      "explanation": "'It's worth + -ing' = 'vale la pena + infinitivo'. Tras 'before' se usa gerundio: 'before deciding'."
    },
    {
      "type": "translate",
      "skill": "use",
      "prompt": "Traduce al inglés: \"Cuanto más practicas, mejor te vuelves.\"",
      "answers": [
        "the more you practise the better you get",
        "the more you practise, the better you get",
        "the more you practice the better you get",
        "the more you practice, the better you get",
        "the more you practise the better you become",
        "the more you practice the better you become",
        "the more you practise, the better you become",
        "the more you practice, the better you become"
      ],
      "explanation": "Estructura comparativa doble: 'The more..., the better...'. Tanto 'practise' (UK) como 'practice' (US) son válidos."
    },
    {
      "type": "multiple_choice",
      "skill": "use",
      "question": "Complete with the best 'use of English' option: 'Hardly ___ the door when the phone rang.'",
      "options": [
        "I had opened",
        "had I opened",
        "I opened",
        "did I open"
      ],
      "correctIndex": 1,
      "explanation": "Tras 'Hardly' al inicio se produce inversión con past perfect: 'Hardly had I opened... when...'."
    },
    {
      "type": "multiple_choice",
      "skill": "use",
      "question": "Rewrite using the keyword: 'They think the CEO resigned.' = 'The CEO is ___ to have resigned.'",
      "options": [
        "thought",
        "thinking",
        "think",
        "being thought"
      ],
      "correctIndex": 0,
      "explanation": "Estructura pasiva impersonal: 'The CEO is thought to have resigned.'"
    },
    {
      "type": "reading",
      "skill": "reading",
      "title": "The Rise of Remote Work",
      "passage": "When offices around the world closed almost overnight, few employers imagined that the shift to remote work would prove so durable. What began as an emergency measure quickly hardened into a permanent feature of corporate life, forcing companies to rethink long-held assumptions about productivity and presence.\nProponents argue that remote arrangements have democratised opportunity, allowing talented people in remote regions to compete for jobs once confined to expensive city centres. Employees, for their part, report reclaiming hours previously lost to commuting and gaining greater control over how they structure their days.\nYet the picture is far from uniformly rosy. Critics point to the erosion of spontaneous collaboration, the blurring of boundaries between work and home, and a creeping sense of isolation among junior staff who lack the informal mentoring that an office naturally provides. Some firms have responded with hybrid models, though these often satisfy no one entirely.\nWhat is clear is that the genie cannot easily be put back in the bottle. The challenge now is not whether remote work will survive, but how organisations can capture its benefits while mitigating its very real costs.",
      "questions": [
        {
          "q": "What is the main idea of the passage?",
          "options": [
            "Remote work has completely replaced office work everywhere.",
            "Remote work has become a lasting change whose benefits and drawbacks must now be balanced.",
            "Remote work is universally disliked by employees.",
            "Hybrid models have solved all the problems of remote work."
          ],
          "correctIndex": 1,
          "explanation": "El texto sostiene que el teletrabajo se ha vuelto duradero y que el reto es equilibrar sus ventajas y costes."
        },
        {
          "q": "According to the passage, what is one advantage of remote work mentioned by its proponents?",
          "options": [
            "It guarantees higher salaries for everyone.",
            "It allows people in remote regions to compete for jobs previously limited to city centres.",
            "It eliminates all forms of isolation.",
            "It removes the need for any collaboration."
          ],
          "correctIndex": 1,
          "explanation": "El texto dice que ha 'democratizado la oportunidad', permitiendo a personas de regiones remotas competir por empleos antes confinados a las grandes ciudades."
        },
        {
          "q": "What concern do critics raise about junior staff?",
          "options": [
            "They earn too much money.",
            "They commute too far.",
            "They miss the informal mentoring that an office provides.",
            "They refuse to work from home."
          ],
          "correctIndex": 2,
          "explanation": "Los críticos señalan que el personal junior carece del 'mentoring' informal que ofrece la oficina."
        },
        {
          "q": "What does the phrase 'the genie cannot easily be put back in the bottle' suggest?",
          "options": [
            "The change is essentially irreversible.",
            "Remote work was a magical mistake.",
            "Companies want to return fully to the office.",
            "The trend will disappear soon."
          ],
          "correctIndex": 0,
          "explanation": "La expresión idiomática indica que el cambio es difícilmente reversible: ha llegado para quedarse."
        },
        {
          "q": "What is the author's overall tone toward remote work?",
          "options": [
            "Completely enthusiastic and uncritical.",
            "Dismissive and hostile.",
            "Balanced, acknowledging both benefits and costs.",
            "Indifferent and uninformed."
          ],
          "correctIndex": 2,
          "explanation": "El autor adopta un tono equilibrado: reconoce tanto las ventajas como los 'very real costs'."
        }
      ]
    },
    {
      "type": "listening",
      "skill": "listening",
      "text": "Good afternoon, everyone. I know many of you are anxious about the proposed changes to our shift patterns. Let me be clear: nothing will be finalised until we have consulted every department and weighed your feedback carefully. Rushing this decision would do far more harm than good.",
      "question": "What is the speaker's main point?",
      "options": [
        "The shift changes have already been finalised.",
        "No decision will be made until staff have been properly consulted.",
        "The speaker is ignoring employee feedback.",
        "The changes will be implemented immediately."
      ],
      "correctIndex": 1,
      "explanation": "El hablante subraya que nada se decidirá hasta consultar a todos los departamentos y valorar las opiniones del personal."
    }
  ] }
};
