/* ============================================================
 * vesper_expansion3.js — Gran expansión de contenido de Vesper.
 *
 * +42 lecciones nuevas (A1–C2) en todas las destrezas, con mucho
 * vocabulario nuevo. Las lecciones de vocabulario llevan
 * skill:"vocab" y ejercicios "matching", así que sus pares EN→ES
 * se cosechan automáticamente en los recintos de vocabulario
 * (vesper_vocab_dens.js).
 *
 * Reutiliza SOLO los tipos de ejercicio que ya soporta el motor de
 * leccion.html:
 *   multiple_choice · word_order · true_false · fill_blank
 *   translate · matching · listening · categorize · reading · find_error
 *
 * Patrón idéntico a vesper_content_pack.js / vesper_expansion.js:
 *   window.VESPER_EXPANSION3 = { lessons, order, merge }
 * y se fusiona en VESPER_LESSONS via VESPER_EXPANSION3.merge().
 *
 * Prefijo de id "x3-" para que ningún lessonId colisione con los
 * packs existentes. Las lecciones de listening no traen 'audio':
 * el motor usa la voz del dispositivo (Web Speech API).
 * ============================================================ */
window.VESPER_EXPANSION3 = (function () {

  var L = {

    /* ============================================================
     * ============================ A1 ============================
     * ============================================================ */

    "x3-a1-vocab-food": {
      lessonId: "x3-a1-vocab-food", level: "A1", track: "Vocabulario", topic: "food", skill: "vocab",
      title: "Vocabulario: comida y bebida", xpReward: 34, mascotState: "explaining",
      explanation: {
        body: "Aprende palabras básicas de comida y bebida. Son palabras que usarás todos los días: en casa, en la tienda y en un restaurante. (Une, clasifica y completa para fijarlas.)",
        examples: [
          { en: "I drink water and milk.", es: "Bebo agua y leche." },
          { en: "She eats bread and an apple.", es: "Ella come pan y una manzana." }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Une la palabra con su traducción.", pairs: [
          { l: "apple", r: "manzana" }, { l: "bread", r: "pan" },
          { l: "water", r: "agua" }, { l: "milk", r: "leche" },
          { l: "cheese", r: "queso" }, { l: "egg", r: "huevo" } ] },
        { type: "categorize", instruction: "¿Es comida o bebida?", buckets: [
          { id: "f", label: "Food" }, { id: "d", label: "Drink" } ], items: [
          { t: "rice", bucket: "f" }, { t: "juice", bucket: "d" },
          { t: "chicken", bucket: "f" }, { t: "coffee", bucket: "d" },
          { t: "fish", bucket: "f" }, { t: "tea", bucket: "d" } ] },
        { type: "multiple_choice", question: "Which one is a fruit?", options: ["bread", "banana", "cheese"], correctIndex: 1, explanation: "'banana' es una fruta (plátano)." },
        { type: "fill_blank", sentence: "In the morning I eat ___ with butter.", answers: ["bread", "toast"], hint: "Se hace con harina.", explanation: "bread = pan." },
        { type: "translate", prompt: "Traduce: \"Quiero un vaso de agua.\"", answers: ["i want a glass of water"], explanation: "I want a glass of water." }
      ]
    },

    "x3-a1-vocab-body": {
      lessonId: "x3-a1-vocab-body", level: "A1", track: "Vocabulario", topic: "feelings", skill: "vocab", tipo: "aprende", title: "¿Cómo te sientes? Sentimientos y estados", rev: 2, xpReward: 32,
      mascotState: "explaining",
      explanation: {
        body: "Para decir cómo estás usas to be + adjetivo: I'm tired, she's happy. En español decimos \"tengo hambre\" o \"tengo frío\", pero en inglés se usa be. be + adjetivo: I'm hungry (tengo hambre), I'm cold (tengo frío), I'm thirsty (tengo sed). Pregunta: How are you? / Are you OK? Para intensificar usa very (very tired); para suavizar, a bit (a bit sad).",
        examples: [
          { en: "Are you OK, Mia? You look tired.", es: "¿Estás bien, Mia? Te ves cansada." },
          { en: "I'm very tired. I work at night this week.", es: "Estoy muy cansada. Esta semana trabajo de noche." },
          { en: "Are you hungry? There's pizza.", es: "¿Tienes hambre? Hay pizza." },
          { en: "Yes, I'm really hungry. Thanks!", es: "Sí, tengo mucha hambre. ¡Gracias!" }
        ],
        sections: [
          { kind: "intro", body: "Para decir cómo estás usas to be + adjetivo: I'm tired, she's happy. En español decimos \"tengo hambre\" o \"tengo frío\", pero en inglés se usa be." },
          {
            kind: "regla",
            body: "be + adjetivo: I'm hungry (tengo hambre), I'm cold (tengo frío), I'm thirsty (tengo sed). Pregunta: How are you? / Are you OK? Para intensificar usa very (very tired); para suavizar, a bit (a bit sad)."
          },
          {
            kind: "vocab",
            items: [
              { en: "happy", ipa: "ˈhæpi", es: "feliz" },
              { en: "sad", ipa: "sæd", es: "triste" },
              { en: "tired", ipa: "ˈtaɪəd", es: "cansado/a" },
              { en: "hungry", ipa: "ˈhʌŋɡri", es: "con hambre" },
              { en: "thirsty", ipa: "ˈθɜːsti", es: "con sed" },
              { en: "cold", ipa: "kəʊld", es: "con frío" },
              { en: "hot", ipa: "hɒt", es: "con calor" },
              { en: "bored", ipa: "bɔːd", es: "aburrido/a" }
            ]
          },
          {
            kind: "expresiones",
            items: [{ en: "How are you?", es: "¿Cómo estás?" }, { en: "Are you OK?", es: "¿Estás bien?" }, { en: "I'm a bit tired.", es: "Estoy un poco cansado/a." }, { en: "What's wrong?", es: "¿Qué pasa?" }]
          },
          {
            kind: "ejemplos",
            items: [
              { en: "Sam: Are you OK, Mia? You look tired.", es: "Sam: ¿Estás bien, Mia? Te ves cansada." },
              { en: "Mia: I'm very tired. I work at night this week.", es: "Mia: Estoy muy cansada. Esta semana trabajo de noche." },
              { en: "Sam: Are you hungry? There's pizza.", es: "Sam: ¿Tienes hambre? Hay pizza." },
              { en: "Mia: Yes, I'm really hungry. Thanks!", es: "Mia: Sí, tengo mucha hambre. ¡Gracias!" }
            ]
          },
          {
            kind: "errores",
            items: [
              { no: "I have hungry.", si: "I'm hungry.", pq: "Hambre, sed, frío y calor van con be." },
              { no: "I'm boring.", si: "I'm bored.", pq: "bored = aburrido/a (cómo te sientes). boring = algo que aburre." },
              { no: "She is very tired?", si: "Is she very tired?", pq: "En preguntas, is va primero." }
            ]
          },
          { kind: "resumen", body: "be + adjetivo para cómo te sientes: I'm happy, I'm hungry, I'm cold. very = muy; a bit = un poco. bored (te sientes) ≠ boring (algo aburrido)." },
          { kind: "puente", body: "Practica las palabras y di cómo te sientes hoy." }
        ]
      },
      exercises: [
        { type: "listening", text: "I'm cold. Can you close the window, please?", question: "¿Cómo se siente?", options: ["Tiene frío", "Tiene calor", "Tiene sed"], correctIndex: 0 },
        {
          type: "matching", instruction: "Une cada palabra con su significado.",
          pairs: [{ l: "happy", r: "feliz" }, { l: "sad", r: "triste" }, { l: "tired", r: "cansado/a" }, { l: "thirsty", r: "con sed" }, { l: "bored", r: "aburrido/a" }, { l: "hot", r: "con calor" }]
        },
        { type: "multiple_choice", question: "¿Cómo se dice \"Tengo hambre\"?", options: ["I'm hungry.", "I have hungry.", "I'm hunger."], correctIndex: 0, explanation: "Hambre va con be: I'm hungry." },
        {
          type: "find_error",
          segments: [{ u: "I" }, " ", { u: "have" }, " very ", { u: "cold" }, " today."],
          correctIndex: 1, correction: "am (I'm very cold)", explanation: "El frío se expresa con be: I'm very cold.", question: "Encuentra el error"
        },
        {
          type: "categorize", instruction: "¿Es una sensación buena o mala?",
          buckets: [{ id: "good", label: "Bien" }, { id: "bad", label: "Mal" }],
          items: [{ t: "happy", bucket: "good" }, { t: "great", bucket: "good" }, { t: "fine", bucket: "good" }, { t: "sad", bucket: "bad" }, { t: "tired", bucket: "bad" }, { t: "bored", bucket: "bad" }]
        },
        { type: "fill_blank", sentence: "This film is very boring. I'm ___.", answers: ["bored"], hint: "Cómo te sientes tú: termina en -ed.", explanation: "I'm bored = estoy aburrido/a." },
        { type: "speak", text: "Are you OK? You look tired.", es: "¿Estás bien? Te ves cansado/a." },
        { type: "true_false", statement: "\"I'm thirsty\" significa \"tengo sed\".", answer: true, explanation: "thirsty = con sed." }
      ]
    },

    "x3-a1-grammar-there-is": {
      lessonId: "x3-a1-grammar-there-is", level: "A1", track: "Gramática", topic: "grammar", skill: "grammar",
      title: "There is / There are", xpReward: 34, mascotState: "explaining",
      explanation: {
        body: "Usamos 'there is' (singular) y 'there are' (plural) para decir que algo existe. Con incontables se usa 'there is some'. Para preguntar: 'Is there...? / Are there...?'. (Negativo: there isn't / there aren't.)",
        examples: [
          { en: "There is a book on the table.", es: "Hay un libro en la mesa." },
          { en: "There are three chairs in the room.", es: "Hay tres sillas en la habitación." },
          { en: "Is there a bank near here?", es: "¿Hay un banco cerca de aquí?" }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "Choose: \"___ a cat in the garden.\"", options: ["There are", "There be", "There is"], correctIndex: 2, explanation: "'a cat' es singular -> there is." },
        { type: "multiple_choice", question: "Choose: \"___ many people at the party.\"", options: ["There is", "There are", "There has"], correctIndex: 1, explanation: "'many people' es plural -> there are." },
        { type: "find_error", question: "Encuentra el error.",
          segments: ["There ", { u: "is" }, " four ", { u: "apples" }, " ", { u: "on" }, " the ", { u: "table" }, "."],
          correctIndex: 0, correction: "are (four apples = plural)",
          explanation: "Con un plural ('four apples') usamos 'there are'." },
        { type: "fill_blank", sentence: "___ there any milk in the fridge?", answers: ["is"], hint: "'milk' es incontable (singular).", explanation: "Con incontable: 'Is there any milk?'." },
        { type: "true_false", statement: "We say \"There are a problem.\"", answer: false, explanation: "'a problem' es singular: 'There is a problem.'" },
        { type: "translate", prompt: "Traduce: \"Hay dos ventanas en mi cuarto.\"", answers: ["there are two windows in my room"], explanation: "There are two windows in my room." }
      ]
    },

    "x3-a1-grammar-can": {
      lessonId: "x3-a1-grammar-can", level: "A1", track: "Gramática", topic: "grammar", skill: "grammar",
      title: "Can / Can't (habilidad)", xpReward: 34, mascotState: "explaining",
      explanation: {
        body: "'Can' expresa habilidad o permiso y nunca cambia: I/you/he/she can. Después siempre va el verbo en infinitivo sin 'to' (can swim, NO can to swim). Negativo: can't (cannot). Pregunta: 'Can you...?'.",
        examples: [
          { en: "I can swim, but I can't drive.", es: "Sé nadar, pero no sé conducir." },
          { en: "Can you help me, please?", es: "¿Puedes ayudarme, por favor?" }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "Choose the correct sentence.", options: ["He can play the guitar.", "He can plays the guitar.", "He cans play the guitar."], correctIndex: 0, explanation: "Tras 'can' va el infinitivo sin 's' ni 'to': can play." },
        { type: "find_error", question: "Encuentra el error.",
          segments: ["My sister ", { u: "can" }, " ", { u: "to" }, " ", { u: "speak" }, " three ", { u: "languages" }, "."],
          correctIndex: 1, correction: "(quita 'to') can speak",
          explanation: "Después de 'can' no se usa 'to': 'can speak'." },
        { type: "fill_blank", sentence: "I ___ cook, so I eat in restaurants.", answers: ["can't", "cannot"], hint: "No sé cocinar.", explanation: "can't = no poder/no saber." },
        { type: "true_false", statement: "\"Can you swim?\" is a correct question.", answer: true, explanation: "En preguntas, 'can' va primero: Can you swim?" },
        { type: "word_order", words: ["Can", "you", "open", "the", "window"], correctOrder: ["Can", "you", "open", "the", "window"], hint: "Can + sujeto + verbo + ..." },
        { type: "multiple_choice", question: "What is the negative of \"can\"?", options: ["don't can", "can not have", "can't"], correctIndex: 2, explanation: "El negativo es can't (cannot)." }
      ]
    },

    "x3-a1-read-myday": {
      lessonId: "x3-a1-read-myday", level: "A1", track: "Lectura", topic: "dailylife", skill: "reading",
      title: "Lectura: A normal day", xpReward: 34, mascotState: "explaining",
      explanation: {
        body: "Lectura corta de A1 sobre la rutina diaria, en presente simple. Lee con calma y busca los datos en el texto. (Las respuestas están en el texto.)",
        examples: [
          { en: "He gets up at seven.", es: "Él se levanta a las siete." },
          { en: "She goes to work by bus.", es: "Ella va al trabajo en autobús." }
        ]
      },
      exercises: [
        { type: "reading", title: "Tom's day",
          passage: "Tom is a baker. He gets up at five o'clock every morning. First, he drinks a coffee. Then he goes to work by bike. At the bakery, Tom makes bread and cakes. He finishes work at one o'clock. In the afternoon, he sleeps and reads books. Tom is happy with his job.",
          questions: [
            { q: "What is Tom's job?", options: ["a teacher", "a baker", "a driver"], correctIndex: 1, explanation: "\"Tom is a baker.\"" },
            { q: "How does Tom go to work?", options: ["by bus", "by car", "by bike"], correctIndex: 2, explanation: "\"...he goes to work by bike.\"" },
            { q: "What time does Tom finish work?", options: ["at one o'clock", "at five o'clock", "in the afternoon"], correctIndex: 0, explanation: "\"He finishes work at one o'clock.\"" }
          ] },
        { type: "true_false", statement: "Tom drinks tea in the morning.", answer: false, explanation: "Bebe café (coffee), no té." },
        { type: "fill_blank", sentence: "Tom makes bread and ___ at the bakery.", answers: ["cakes"], hint: "Algo dulce.", explanation: "\"...makes bread and cakes.\"" },
        { type: "matching", instruction: "Une la palabra del texto con su traducción.", pairs: [
          { l: "baker", r: "panadero" }, { l: "morning", r: "mañana" },
          { l: "afternoon", r: "tarde" }, { l: "bike", r: "bicicleta" } ] }
      ]
    },

    "x3-a1-listen-greetings": {
      lessonId: "x3-a1-listen-greetings", level: "A1", track: "Listening", topic: "social", skill: "listening",
      title: "Escucha: saludos y presentaciones", xpReward: 32, mascotState: "explaining",
      explanation: {
        body: "Practica el listening con saludos y presentaciones básicas. Toca 'Reproducir' y escucha con atención; puedes repetir las veces que quieras. (Si no traes audio, el dispositivo lee la frase.)",
        examples: [
          { en: "Hello, nice to meet you.", es: "Hola, encantado de conocerte." },
          { en: "What's your name?", es: "¿Cómo te llamas?" }
        ]
      },
      exercises: [
        { type: "listening", text: "Hello, my name is Sarah.", "audio": "assets/audio/app/a1_742968ebfb.mp3", question: "¿Qué escuchaste?",
          options: ["Hello, my name is Sarah.", "Yellow, my name is Sarah.", "Hello, my game is Sarah."], correctIndex: 0, explanation: "Hello, my name is Sarah." },
        { type: "listening", text: "Nice to meet you.", "audio": "assets/audio/app/a1_5f3519c078.mp3", question: "¿Qué escuchaste?",
          options: ["Nice to eat you.", "Nice to meet you.", "Nice to see you."], correctIndex: 1, explanation: "Nice to meet you = Encantado de conocerte." },
        { type: "listening", text: "Where are you from?", "audio": "assets/audio/app/a1_7f3ae9f273.mp3", question: "Escribe lo que escuchaste:", answers: ["where are you from", "where are you from?"], explanation: "Where are you from?" },
        { type: "multiple_choice", question: "Someone says \"Nice to meet you.\" A good reply is...", options: ["See you yesterday, my friend.", "You are welcome.", "Nice to meet you too."], correctIndex: 2, explanation: "Se responde 'Nice to meet you too.'" },
        { type: "fill_blank", sentence: "\"How are you?\" — \"I'm ___, thanks.\"", answers: ["fine", "good", "ok", "okay"], hint: "Respuesta positiva.", explanation: "I'm fine, thanks." }
      ]
    },

    "x3-a1-vocab-time": {
      lessonId: "x3-a1-vocab-time", level: "A1", track: "Vocabulario", topic: "time", skill: "vocab",
      title: "Vocabulario: la hora y los días", xpReward: 34, mascotState: "explaining",
      explanation: {
        body: "Aprende a decir la hora y los días de la semana. Usamos 'o'clock' para las horas en punto y 'on' con los días (on Monday). (Lee y practica con los ejercicios.)",
        examples: [
          { en: "It's seven o'clock.", es: "Son las siete en punto." },
          { en: "I have English on Tuesday.", es: "Tengo inglés el martes." }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Une el día con su traducción.", pairs: [
          { l: "Monday", r: "lunes" }, { l: "Wednesday", r: "miércoles" },
          { l: "Friday", r: "viernes" }, { l: "Sunday", r: "domingo" } ] },
        { type: "multiple_choice", question: "Choose: \"I get up ___ 6 o'clock.\"", options: ["in", "on", "at"], correctIndex: 2, explanation: "Con horas usamos 'at': at 6 o'clock." },
        { type: "multiple_choice", question: "Choose: \"We have a class ___ Monday.\"", options: ["at", "on", "in"], correctIndex: 1, explanation: "Con días usamos 'on': on Monday." },
        { type: "categorize", instruction: "¿Es parte del día o un día de la semana?", buckets: [
          { id: "p", label: "Part of day" }, { id: "d", label: "Weekday" } ], items: [
          { t: "morning", bucket: "p" }, { t: "Thursday", bucket: "d" },
          { t: "evening", bucket: "p" }, { t: "Saturday", bucket: "d" },
          { t: "night", bucket: "p" }, { t: "Tuesday", bucket: "d" } ] },
        { type: "fill_blank", sentence: "There are seven days in a ___.", answers: ["week"], hint: "Lunes a domingo.", explanation: "week = semana." }
      ]
    },

    /* ============================================================
     * ============================ A2 ============================
     * ============================================================ */

    "x3-a2-vocab-jobs": {
      lessonId: "x3-a2-vocab-jobs", level: "A2", track: "Vocabulario", topic: "work", skill: "vocab",
      title: "Vocabulario: trabajos y lugares", xpReward: 42, mascotState: "explaining",
      explanation: {
        body: "Vocabulario de profesiones y lugares de trabajo. Recuerda usar el artículo: 'She is a nurse' (con profesión siempre va a/an). (Une la profesión con su lugar de trabajo.)",
        examples: [
          { en: "A doctor works in a hospital.", es: "Un médico trabaja en un hospital." },
          { en: "She is an engineer.", es: "Ella es ingeniera." }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Une la profesión con su traducción.", pairs: [
          { l: "nurse", r: "enfermera" }, { l: "lawyer", r: "abogado" },
          { l: "waiter", r: "camarero" }, { l: "engineer", r: "ingeniero" },
          { l: "farmer", r: "granjero" }, { l: "chef", r: "cocinero" } ] },
        { type: "matching", instruction: "Une la profesión con su lugar de trabajo.", pairs: [
          { l: "teacher", r: "school" }, { l: "doctor", r: "hospital" },
          { l: "cook", r: "kitchen" }, { l: "pilot", r: "plane" } ] },
        { type: "multiple_choice", question: "A person who flies planes is a...", options: ["driver", "pilot", "sailor"], correctIndex: 1, explanation: "pilot = piloto." },
        { type: "fill_blank", sentence: "She works in a hospital. She is a ___.", answers: ["nurse", "doctor"], hint: "Cuida a los enfermos.", explanation: "nurse = enfermera; doctor = médico." },
        { type: "translate", prompt: "Traduce: \"Mi padre es profesor.\"", answers: ["my father is a teacher"], explanation: "My father is a teacher (con artículo 'a')." }
      ]
    },

    "x3-a2-vocab-weather": {
      lessonId: "x3-a2-vocab-weather", level: "A2", track: "Vocabulario", topic: "home", skill: "vocab", tipo: "aprende", title: "Tareas de la casa", rev: 2, xpReward: 42, mascotState: "explaining",
      explanation: {
        body: "En el piso de Mia y Sam hay que repartir las tareas. Aprende a nombrar las tareas de la casa con el verbo correcto. Cada tarea va con un verbo fijo: do the dishes (lavar los platos), do the laundry (lavar la ropa), make the bed (tender la cama), take out the rubbish (sacar la basura), vacuum (aspirar), tidy up (ordenar). No traduzcas palabra por palabra: en inglés no se \"hace\" la cama con do.",
        examples: [
          { en: "Whose turn is it to do the dishes?", es: "¿A quién le toca lavar los platos?" },
          { en: "It's my turn. I'll do them after dinner.", es: "Me toca a mí. Los lavo después de cenar." },
          { en: "OK. I'll take out the rubbish and water the plants.", es: "Vale. Yo saco la basura y riego las plantas." },
          { en: "And who walks Coco? — Mia: We both do!", es: "¿Y quién pasea a Coco? — Mia: ¡Los dos!" }
        ],
        sections: [
          { kind: "intro", body: "En el piso de Mia y Sam hay que repartir las tareas. Aprende a nombrar las tareas de la casa con el verbo correcto." },
          {
            kind: "regla",
            body: "Cada tarea va con un verbo fijo: do the dishes (lavar los platos), do the laundry (lavar la ropa), make the bed (tender la cama), take out the rubbish (sacar la basura), vacuum (aspirar), tidy up (ordenar). No traduzcas palabra por palabra: en inglés no se \"hace\" la cama con do."
          },
          {
            kind: "vocab",
            items: [
              { en: "do the dishes", es: "lavar los platos" },
              { en: "do the laundry", es: "lavar la ropa" },
              { en: "make the bed", es: "tender / hacer la cama" },
              { en: "take out the rubbish", es: "sacar la basura" },
              { en: "vacuum the floor", es: "aspirar el piso" },
              { en: "tidy up", es: "ordenar / recoger" },
              { en: "cook dinner", es: "hacer la cena" },
              { en: "water the plants", es: "regar las plantas" }
            ]
          },
          {
            kind: "expresiones",
            items: [
              { en: "Whose turn is it?", es: "¿A quién le toca?" },
              { en: "It's your turn.", es: "Te toca a ti." },
              { en: "I'll do it later.", es: "Lo hago luego." },
              { en: "Can you give me a hand?", es: "¿Me echas una mano?" }
            ]
          },
          {
            kind: "ejemplos",
            items: [
              { en: "Mia: Whose turn is it to do the dishes?", es: "Mia: ¿A quién le toca lavar los platos?" },
              { en: "Sam: It's my turn. I'll do them after dinner.", es: "Sam: Me toca a mí. Los lavo después de cenar." },
              { en: "Mia: OK. I'll take out the rubbish and water the plants.", es: "Mia: Vale. Yo saco la basura y riego las plantas." },
              { en: "Sam: And who walks Coco? — Mia: We both do!", es: "Sam: ¿Y quién pasea a Coco? — Mia: ¡Los dos!" }
            ]
          },
          {
            kind: "errores",
            items: [
              { no: "make the dishes", si: "do the dishes", pq: "Los platos van con do." },
              { no: "do the bed", si: "make the bed", pq: "La cama va con make." },
              { no: "take off the rubbish", si: "take out the rubbish", pq: "Sacar la basura = take out." }
            ]
          },
          { kind: "resumen", body: "do the dishes / do the laundry · make the bed · take out the rubbish · vacuum · tidy up · water the plants. Whose turn is it? → It's my / your turn." },
          { kind: "puente", body: "Reparte las tareas del piso con Mia y Sam." }
        ]
      },
      exercises: [
        {
          type: "matching", instruction: "Une cada tarea con su significado.",
          pairs: [
            { l: "do the dishes", r: "lavar los platos" },
            { l: "do the laundry", r: "lavar la ropa" },
            { l: "make the bed", r: "tender la cama" },
            { l: "take out the rubbish", r: "sacar la basura" },
            { l: "vacuum the floor", r: "aspirar el piso" },
            { l: "water the plants", r: "regar las plantas" }
          ]
        },
        {
          type: "categorize", instruction: "¿Do o make?",
          buckets: [{ id: "do", label: "do" }, { id: "make", label: "make" }],
          items: [
            { t: "the dishes", bucket: "do" },
            { t: "the laundry", bucket: "do" },
            { t: "the ironing", bucket: "do" },
            { t: "the bed", bucket: "make" },
            { t: "a cake", bucket: "make" },
            { t: "breakfast", bucket: "make" }
          ]
        },
        {
          type: "listening", text: "It's your turn to take out the rubbish. I did it yesterday.", question: "¿Qué tiene que hacer?", options: ["Sacar la basura", "Lavar los platos", "Regar las plantas"],
          correctIndex: 0
        },
        { type: "multiple_choice", question: "I always ___ my bed in the morning.", options: ["make", "do", "take"], correctIndex: 0, explanation: "La cama: make the bed." },
        { type: "fill_blank", sentence: "Can you give me a ___? This box is heavy.", answers: ["hand"], hint: "echar una mano", explanation: "give someone a hand = echar una mano." },
        {
          type: "find_error",
          segments: ["Sam ", { u: "makes" }, " the dishes ", { u: "every" }, " ", { u: "evening" }, "."],
          correctIndex: 0, correction: "does", explanation: "Los platos van con do: Sam does the dishes.", question: "Encuentra el error"
        },
        { type: "speak", text: "Whose turn is it to do the dishes?", es: "¿A quién le toca lavar los platos?" },
        { type: "true_false", statement: "\"Whose turn is it?\" significa \"¿A quién le toca?\".", answer: true, explanation: "turn = turno." }
      ]
    },

    "x3-a2-grammar-going-to": {
      lessonId: "x3-a2-grammar-going-to", level: "A2", track: "Gramática", topic: "grammar", skill: "grammar",
      title: "Futuro con 'going to'", xpReward: 44, mascotState: "explaining",
      explanation: {
        body: "Usamos 'be going to' para planes e intenciones futuras: am/is/are + going to + verbo. También para predicciones con pruebas (Look at the clouds! It's going to rain). (Cuidado: el verbo 'be' concuerda con el sujeto.)",
        examples: [
          { en: "I'm going to visit my grandmother.", es: "Voy a visitar a mi abuela." },
          { en: "They are going to buy a car.", es: "Van a comprar un coche." }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "Choose: \"She ___ going to study tonight.\"", options: ["is", "am", "are"], correctIndex: 0, explanation: "Con 'she' usamos 'is going to'." },
        { type: "find_error", question: "Encuentra el error.",
          segments: ["We ", { u: "is" }, " going to ", { u: "watch" }, " a ", { u: "film" }, " ", { u: "tonight" }, "."],
          correctIndex: 0, correction: "are (we -> are)",
          explanation: "Con 'we' el verbo be es 'are': We are going to..." },
        { type: "fill_blank", sentence: "Look at those clouds! It ___ going to rain.", answers: ["is", "'s"], hint: "Con 'it'.", explanation: "It is going to rain (predicción con prueba)." },
        { type: "word_order", words: ["I", "am", "going", "to", "call", "you"], correctOrder: ["I", "am", "going", "to", "call", "you"], hint: "Sujeto + am + going to + verbo + ..." },
        { type: "translate", prompt: "Traduce: \"Vamos a viajar a España.\"", answers: ["we are going to travel to spain", "we're going to travel to spain"], explanation: "We are going to travel to Spain." },
        { type: "true_false", statement: "\"going to\" is used for future plans.", answer: true, explanation: "Sí, expresa planes e intenciones futuras." }
      ]
    },

    "x3-a2-grammar-adverbs-freq": {
      lessonId: "x3-a2-grammar-adverbs-freq", level: "A2", track: "Expresiones", topic: "social", skill: "use", tipo: "aprende", title: "Hacer sugerencias", rev: 2, xpReward: 42, mascotState: "explaining",
      explanation: {
        body: "Episodio 7 · Es sábado, llueve y Mia y Sam no saben qué hacer. Aprende a hacer sugerencias y a responder a ellas. Sugerir: Let's + verbo (Let's watch a film). How about / What about + verbo-ing (How about going to the museum?). Why don't we + verbo? (Why don't we cook something?). Shall we + verbo? (Shall we go?). Responder: Good idea! / Sounds great! / I'm not sure... / I'd rather not.",
        examples: [
          { en: "It's raining. Why don't we stay in?", es: "Está lloviendo. ¿Por qué no nos quedamos en casa?" },
          { en: "Good idea. How about playing a board game?", es: "Buena idea. ¿Qué tal si jugamos un juego de mesa?" },
          { en: "Hmm, I'm not sure. Let's bake a cake!", es: "Mmm, no sé. ¡Hagamos un pastel!" },
          { en: "Sounds great! Shall we invite Mrs Park?", es: "¡Suena genial! ¿Invitamos a la señora Park?" }
        ],
        sections: [
          { kind: "intro", body: "Episodio 7 · Es sábado, llueve y Mia y Sam no saben qué hacer. Aprende a hacer sugerencias y a responder a ellas." },
          {
            kind: "regla",
            body: "Sugerir: Let's + verbo (Let's watch a film). How about / What about + verbo-ing (How about going to the museum?). Why don't we + verbo? (Why don't we cook something?). Shall we + verbo? (Shall we go?). Responder: Good idea! / Sounds great! / I'm not sure... / I'd rather not."
          },
          {
            kind: "vocab",
            items: [
              { en: "suggest", ipa: "səˈdʒest", es: "sugerir" },
              { en: "idea", ipa: "aɪˈdɪə", es: "idea" },
              { en: "museum", ipa: "mjuːˈziːəm", es: "museo" },
              { en: "board game", ipa: "bɔːd ɡeɪm", es: "juego de mesa" },
              { en: "bake", ipa: "beɪk", es: "hornear" },
              { en: "stay in", ipa: "steɪ ɪn", es: "quedarse en casa" },
              { en: "go out", ipa: "ɡəʊ aʊt", es: "salir" },
              { en: "rainy", ipa: "ˈreɪni", es: "lluvioso" }
            ]
          },
          {
            kind: "expresiones",
            items: [
              { en: "How about...?", es: "¿Qué tal si...?" },
              { en: "Why don't we...?", es: "¿Por qué no...?" },
              { en: "Sounds great!", es: "¡Suena genial!" },
              { en: "I'm not sure. Maybe...", es: "No sé. Tal vez..." }
            ]
          },
          {
            kind: "ejemplos",
            items: [
              { en: "Sam: It's raining. Why don't we stay in?", es: "Sam: Está lloviendo. ¿Por qué no nos quedamos en casa?" },
              { en: "Mia: Good idea. How about playing a board game?", es: "Mia: Buena idea. ¿Qué tal si jugamos un juego de mesa?" },
              { en: "Sam: Hmm, I'm not sure. Let's bake a cake!", es: "Sam: Mmm, no sé. ¡Hagamos un pastel!" },
              { en: "Mia: Sounds great! Shall we invite Mrs Park?", es: "Mia: ¡Suena genial! ¿Invitamos a la señora Park?" }
            ]
          },
          {
            kind: "errores",
            items: [
              { no: "How about go to the cinema?", si: "How about going to the cinema?", pq: "How about + verbo-ing." },
              { no: "Why we don't go out?", si: "Why don't we go out?", pq: "El orden es Why don't we...?" },
              { no: "Let's to stay in.", si: "Let's stay in.", pq: "Let's + verbo sin to." }
            ]
          },
          { kind: "resumen", body: "Let's + verbo · How about / What about + -ing · Why don't we + verbo? · Shall we + verbo? Responde con Good idea! / Sounds great! / I'm not sure..." },
          { kind: "puente", body: "¿Qué hacen Mia y Sam este sábado? ¡Sugiere tú!" }
        ]
      },
      exercises: [
        { type: "listening", text: "It's a sunny day. How about going to the beach?", question: "¿Qué sugiere?", options: ["Ir a la playa", "Quedarse en casa", "Ir al museo"], correctIndex: 0 },
        {
          type: "categorize", instruction: "¿Es correcta la sugerencia?",
          buckets: [{ id: "ok", label: "Correcta" }, { id: "wrong", label: "Incorrecta" }],
          items: [
            { t: "Let's go out.", bucket: "ok" },
            { t: "How about going out?", bucket: "ok" },
            { t: "Why don't we go out?", bucket: "ok" },
            { t: "Let's going out.", bucket: "wrong" },
            { t: "How about go out?", bucket: "wrong" },
            { t: "Why we don't go out?", bucket: "wrong" }
          ]
        },
        { type: "multiple_choice", question: "___ we watch a film tonight?", options: ["Shall", "Let's", "How about"], correctIndex: 0, explanation: "Shall we + verbo? para proponer." },
        { type: "fill_blank", sentence: "How about ___ (bake) a cake?", answers: ["baking"], hint: "How about + -ing", explanation: "How about baking a cake?" },
        {
          type: "matching", instruction: "Une cada sugerencia con una buena respuesta.",
          pairs: [
            { l: "Let's go for a walk.", r: "Good idea! I'll get my coat." },
            { l: "How about pizza tonight?", r: "Sounds great! I love pizza." },
            { l: "Why don't we invite Ana?", r: "Yes! I'll call her now." },
            { l: "Shall we stay in?", r: "OK, let's watch a film." }
          ]
        },
        { type: "word_order", words: ["in", "Why", "stay", "don't", "we"], correctOrder: ["Why", "don't", "we", "stay", "in"], hint: "¿Por qué no nos quedamos en casa?" },
        { type: "speak", text: "It's raining. Why don't we stay in?", es: "Está lloviendo. ¿Por qué no nos quedamos en casa?" },
        {
          type: "translate", prompt: "Traduce: \"¿Qué tal si vamos al museo?\"",
          answers: ["how about going to the museum", "what about going to the museum", "why don't we go to the museum", "shall we go to the museum"], explanation: "How about going to the museum?"
        }
      ]
    },

    "x3-a2-read-market": {
      lessonId: "x3-a2-read-market", level: "A2", track: "Lectura", topic: "shopping", skill: "reading",
      title: "Lectura: At the market", xpReward: 44, mascotState: "explaining",
      explanation: {
        body: "Lectura breve de A2 sobre ir al mercado. Aparece vocabulario de compras y cantidades. Lee dos veces y responde. (Atención a los precios y cantidades.)",
        examples: [
          { en: "How much is it?", es: "¿Cuánto cuesta?" },
          { en: "I'd like a kilo of tomatoes.", es: "Quisiera un kilo de tomates." }
        ]
      },
      exercises: [
        { type: "reading", title: "Saturday market",
          passage: "Every Saturday, Maria goes to the market in her town. She likes the market because the food is fresh and cheap. This morning she buys a kilo of tomatoes, some oranges and a loaf of bread. The tomatoes cost two euros and the oranges cost three euros. Maria pays the seller and puts everything in her bag. Then she walks home and makes a big salad for lunch.",
          questions: [
            { q: "When does Maria go to the market?", options: ["every Sunday", "every morning", "every Saturday"], correctIndex: 2, explanation: "\"Every Saturday, Maria goes to the market...\"" },
            { q: "Why does she like the market?", options: ["it is near her house", "the food is fresh and cheap", "her friends are there"], correctIndex: 1, explanation: "\"...the food is fresh and cheap.\"" },
            { q: "How much do the tomatoes cost?", options: ["two euros", "three euros", "five euros"], correctIndex: 0, explanation: "\"The tomatoes cost two euros...\"" }
          ] },
        { type: "matching", instruction: "Une la palabra del texto con su traducción.", pairs: [
          { l: "market", r: "mercado" }, { l: "fresh", r: "fresco" },
          { l: "cheap", r: "barato" }, { l: "seller", r: "vendedor" } ] },
        { type: "true_false", statement: "Maria makes a salad for lunch.", answer: true, explanation: "\"...makes a big salad for lunch.\"" },
        { type: "fill_blank", sentence: "Maria buys a ___ of bread.", answers: ["loaf"], hint: "Una pieza entera de pan.", explanation: "a loaf of bread = una barra/hogaza de pan." }
      ]
    },

    "x3-a2-listen-directions": {
      lessonId: "x3-a2-listen-directions", level: "A2", track: "Listening", topic: "travel", skill: "listening",
      title: "Escucha: pedir direcciones", xpReward: 42, mascotState: "explaining",
      explanation: {
        body: "Escucha instrucciones para llegar a un sitio. Vocabulario clave: turn left/right, go straight, next to, opposite. (Toca reproducir y repite si lo necesitas.)",
        examples: [
          { en: "Turn left at the corner.", es: "Gira a la izquierda en la esquina." },
          { en: "It's opposite the bank.", es: "Está enfrente del banco." }
        ]
      },
      exercises: [
        { type: "listening", text: "Go straight and turn left.", "audio": "assets/audio/app/a2_c00363eb03.mp3", question: "¿Qué escuchaste?",
          options: ["Go straight and turn left.", "Go straight and turn right.", "Go back and turn left."], correctIndex: 0, explanation: "Go straight and turn left." },
        { type: "listening", text: "The station is next to the park.", "audio": "assets/audio/app/a2_e383b455a2.mp3", question: "¿Qué escuchaste?",
          options: ["The station is near the bank.", "The station is opposite the park.", "The station is next to the park."], correctIndex: 2, explanation: "next to = al lado de." },
        { type: "listening", text: "Excuse me, where is the bank?", "audio": "assets/audio/app/a2_a7bf4c8a78.mp3", question: "Escribe lo que escuchaste:", answers: ["excuse me where is the bank", "excuse me, where is the bank?"], explanation: "Excuse me, where is the bank?" },
        { type: "matching", instruction: "Une la instrucción con su traducción.", pairs: [
          { l: "turn right", r: "gira a la derecha" }, { l: "go straight", r: "sigue recto" },
          { l: "opposite", r: "enfrente de" }, { l: "next to", r: "al lado de" } ] },
        { type: "multiple_choice", question: "\"It's opposite the bank\" means it is...", options: ["next to the bank", "in front of / across from the bank", "behind you"], correctIndex: 1, explanation: "opposite = enfrente, al otro lado." }
      ]
    },

    "x3-a2-use-restaurant": {
      lessonId: "x3-a2-use-restaurant", level: "A2", track: "Inglés práctico", topic: "food", skill: "use",
      title: "Uso: en un restaurante", xpReward: 44, mascotState: "explaining",
      explanation: {
        body: "Frases útiles para pedir en un restaurante. Para pedir con cortesía usamos 'I'd like...' (= I would like) y 'Could I have...?'. Para pagar: 'Can I have the bill, please?'.",
        examples: [
          { en: "I'd like a coffee, please.", es: "Quisiera un café, por favor." },
          { en: "Could I have the menu?", es: "¿Me podría dar la carta?" }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "How do you order politely?", options: ["Give me a pizza.", "I'd like a pizza, please.", "I want pizza now."], correctIndex: 1, explanation: "'I'd like... please' es la forma cortés." },
        { type: "matching", instruction: "Une la palabra con su traducción.", pairs: [
          { l: "menu", r: "carta" }, { l: "bill", r: "cuenta" },
          { l: "waiter", r: "camarero" }, { l: "dish", r: "plato" },
          { l: "starter", r: "entrante" }, { l: "dessert", r: "postre" } ] },
        { type: "fill_blank", sentence: "At the end of the meal: \"Can I have the ___, please?\"", answers: ["bill", "check"], hint: "Lo que pagas.", explanation: "the bill (UK) / the check (US) = la cuenta." },
        { type: "word_order", words: ["Could", "I", "have", "some", "water"], correctOrder: ["Could", "I", "have", "some", "water"], hint: "Could + I + have + ...?" },
        { type: "translate", prompt: "Traduce: \"Quisiera la cuenta, por favor.\"", answers: ["i'd like the bill please", "i would like the bill please", "i'd like the bill, please"], explanation: "I'd like the bill, please." }
      ]
    },

    /* ============================================================
     * ============================ B1 ============================
     * ============================================================ */

    "x3-b1-vocab-health": {
      lessonId: "x3-b1-vocab-health", level: "B1", track: "Vocabulary", topic: "health", skill: "vocab",
      title: "Vocabulary: health and well-being", xpReward: 52, mascotState: "explaining",
      explanation: {
        body: "Health vocabulary to talk about symptoms, habits and advice. Remember the structure 'I have a headache' (a pain) and advice with 'should': 'You should rest'.",
        examples: [
          { en: "I have a sore throat and a cough." },
          { en: "You should drink more water." }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Match each word with its meaning.", pairs: [{"l":"headache","r":"a pain in your head"},{"l":"cough","r":"air forced noisily from the throat"},{"l":"fever","r":"a high body temperature"},{"l":"sore throat","r":"pain when you swallow"},{"l":"sneeze","r":"air suddenly out of your nose: 'Achoo!'"},{"l":"rest","r":"relax and do nothing tiring"}] },
        { type: "multiple_choice", question: "Best advice for a cold:", options: ["You should not sleep.", "You should run a marathon.", "You should rest and drink fluids."], correctIndex: 2, explanation: "'should' gives sensible advice." },
        { type: "categorize", instruction: "Healthy or unhealthy habit?", buckets: [
          { id: "h", label: "Healthy" }, { id: "u", label: "Unhealthy" } ], items: [
          { t: "exercise", bucket: "h" }, { t: "smoking", bucket: "u" },
          { t: "sleep well", bucket: "h" }, { t: "junk food", bucket: "u" } ] },
        { type: "fill_blank", sentence: "I feel ill. I think I have a ___.", answers: ["fever", "cold", "headache"], hint: "A common symptom.", explanation: "have a fever/cold/headache." },
        { type: "translate", prompt: "Give advice with 'should': My friend feels terrible. It's a good idea for her to visit a doctor. → You…", answers: ["you should go to the doctor","you should see a doctor","you should go to a doctor","you should see the doctor","you should visit a doctor","you should visit the doctor"], explanation: "You should go to the doctor." }
      ]
    },

    "x3-b1-vocab-technology": {
      lessonId: "x3-b1-vocab-technology", level: "B1", track: "Vocabulary", topic: "tech", skill: "vocab",
      title: "Vocabulary: technology and the internet", xpReward: 52, mascotState: "explaining",
      explanation: {
        body: "Up-to-date technology and internet vocabulary. You'll see common verbs (download, upload, log in) and nouns (device, screen, password).",
        examples: [
          { en: "I need to download the app." },
          { en: "Don't forget your password." }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Match each word with its meaning.", pairs: [{"l":"screen","r":"the part of a device you look at"},{"l":"password","r":"a secret word to enter an account"},{"l":"download","r":"copy a file from the internet"},{"l":"device","r":"a phone, tablet or computer"},{"l":"to share","r":"let other people see or use it"},{"l":"settings","r":"options you can change in an app"}] },
        { type: "categorize", instruction: "Action (verb) or object (noun)?", buckets: [
          { id: "v", label: "Verb" }, { id: "n", label: "Noun" } ], items: [
          { t: "upload", bucket: "v" }, { t: "keyboard", bucket: "n" },
          { t: "click", bucket: "v" }, { t: "browser", bucket: "n" },
          { t: "log in", bucket: "v" }, { t: "website", bucket: "n" } ] },
        { type: "multiple_choice", question: "Choose: \"I can't ___ in; I forgot my password.\"", options: ["log", "logs", "logging"], correctIndex: 0, explanation: "log in = enter your account." },
        { type: "fill_blank", sentence: "Please ___ the file and send it to me.", answers: ["upload", "download", "attach"], hint: "Send a file / add it to an email.", explanation: "upload = send to the internet; attach = add a file to an email." },
        { type: "true_false", statement: "A 'password' is a secret word to access an account.", answer: true, explanation: "password = a secret word to access an account." }
      ]
    },

    "x3-b1-grammar-second-conditional": {
      lessonId: "x3-b1-grammar-second-conditional", level: "B1", track: "Grammar", topic: "grammar", skill: "grammar",
      title: "The second conditional", xpReward: 54, mascotState: "explaining",
      explanation: {
        body: "The second conditional talks about imaginary or unlikely situations in the present or future: If + past simple, + would + infinitive. With 'be' we use 'were' for everyone: 'If I were you...'. (Don't mix them: no 'would' in the 'if' part.)",
        examples: [
          { en: "If I had more money, I would travel the world." },
          { en: "If I were you, I would study harder." }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "Choose: \"If I ___ rich, I would buy a house.\"", options: ["am", "were", "will be"], correctIndex: 1, explanation: "Second conditional: If + past simple (were for everyone)." },
        { type: "find_error", question: "Find the mistake.",
          segments: ["If she ", { u: "would" }, " ", { u: "have" }, " time, she ", { u: "would" }, " ", { u: "help" }, " us."],
          correctIndex: 0, correction: "(remove 'would') If she had time...",
          explanation: "The 'if' part takes the past simple ('had'), not 'would'." },
        { type: "fill_blank", sentence: "If I ___ (know) the answer, I would tell you.", answers: ["knew"], hint: "The past simple of 'know'.", explanation: "If I knew the answer, I would tell you." },
        { type: "word_order", words: ["If", "I", "were", "you", "I", "would", "wait"], correctOrder: ["If", "I", "were", "you", "I", "would", "wait"], hint: "If I were you, I would..." },
        { type: "translate", prompt: "Make a second conditional: I don't have a car, so I don't drive to work. (If I…)", answers: ["if i had a car i would drive to work","if i had a car, i would drive to work","if i had a car i'd drive to work"], explanation: "If I had a car, I would drive to work." },
        { type: "true_false", statement: "The second conditional talks about real, certain facts.", answer: false, explanation: "It talks about imaginary or unlikely situations." }
      ]
    },

    "x3-b1-grammar-passive": {
      lessonId: "x3-b1-grammar-passive", level: "B1", track: "Grammar", topic: "grammar", skill: "grammar", title: "The passive voice (present and past)", xpReward: 54, mascotState: "explaining",
      explanation: {
        body: "The passive is formed with 'be' + past participle. We use it when the action matters more than who does it: 'English is spoken here'. Past: 'The bridge was built in 1900'. The agent is added with 'by'.",
        examples: [{ en: "Coffee is grown in Brazil." }, { en: "The letter was written by Ana." }]
      },
      exercises: [
        {
          type: "multiple_choice", question: "Choose the passive: \"The house ___ in 1990.\"", options: ["was built", "built", "is build"], correctIndex: 0,
          explanation: "Past passive: was + past participle (built)."
        },
        {
          type: "find_error", question: "Find the mistake.",
          segments: ["The windows ", { u: "are" }, " ", { u: "cleaning" }, " by a robot ", { u: "every" }, " ", { u: "week" }, "."],
          correctIndex: 1, correction: "are cleaned",
          explanation: "The passive needs be + past participle: the windows are cleaned (by a robot)."
        },
        { type: "fill_blank", sentence: "This book ___ (write) by a famous author.", answers: ["was written"], hint: "Past passive.", explanation: "was written = past passive of write." },
        {
          type: "multiple_choice", question: "Make passive: \"People speak English here.\"", options: ["English is speak here.", "English speaks here.", "English is spoken here."], correctIndex: 2,
          explanation: "is + past participle (spoken)."
        },
        {
          type: "translate",
          prompt: "Rewrite in the passive: A mechanic repaired the car yesterday. (Don't mention the mechanic.)", answers: ["the car was repaired yesterday", "the car was fixed yesterday"],
          explanation: "The car was repaired yesterday."
        },
        { type: "true_false", statement: "In the passive, the agent can be added with \"by\".", answer: true, explanation: "Yes: '...by Ana', '...by a robot'." }
      ]
    },

    "x3-b1-read-environment": {
      lessonId: "x3-b1-read-environment", level: "B1", track: "Reading", topic: "environment", skill: "reading",
      title: "Reading: Small changes, big effect", xpReward: 54, mascotState: "explaining",
      explanation: {
        body: "A B1 reading about the environment. Identify the main idea, the details and the meaning of words from context. Distinguish what the text says from your own opinion.",
        examples: [
          { en: "reduce, reuse, recycle" },
          { en: "It makes a difference." }
        ]
      },
      exercises: [
        { type: "reading", title: "Everyday choices",
          passage: "Many people think that protecting the environment is the job of governments and big companies. While these have an important role, our daily choices also matter. Small actions, repeated by millions of people, can have a big effect.\n\nFor example, using a reusable bottle instead of buying plastic ones saves hundreds of bottles a year. Turning off lights, taking shorter showers and cycling instead of driving all reduce the energy we use. None of these actions is difficult, but together they make a real difference.",
          questions: [
            { q: "What is the main idea of the text?", options: ["Only governments can protect the environment.", "Individual daily choices can also make a real difference.", "Plastic bottles are cheap and useful."], correctIndex: 1, explanation: "The text argues that daily choices matter." },
            { q: "What example does the text give to save plastic?", options: ["using a reusable bottle", "cycling to work", "turning off lights"], correctIndex: 0, explanation: "\"...using a reusable bottle instead of buying plastic ones...\"" },
            { q: "In the text, \"reduce\" means...", options: ["to throw away", "to sell", "to make smaller / use less"], correctIndex: 2, explanation: "reduce = use less." },
            { q: "What can be inferred?", options: ["The author thinks personal effort is useless.", "The author believes small actions add up.", "The author wants to ban all cars."], correctIndex: 1, explanation: "\"...together they make a real difference.\"" }
          ] },
        { type: "matching", instruction: "Match each word with its meaning.", pairs: [{"l":"reusable","r":"can be used many times"},{"l":"to save","r":"keep, not waste"},{"l":"to reduce","r":"make smaller or less"},{"l":"energy","r":"power that makes machines work"}] },
        { type: "true_false", statement: "According to the text, small actions are useless on their own.", answer: false, explanation: "The text says that together they make a difference." },
        {
          type: "fill_blank", sentence: "Small actions, repeated by millions of people, can have a big ___.", answers: ["effect", "impact"], hint: "A word from the first paragraph.",
          explanation: "...can have a big effect."
        },
        {
          type: "multiple_choice", question: "Which action is NOT mentioned in the text?", options: ["Recycling paper", "Taking shorter showers", "Cycling instead of driving"], correctIndex: 0,
          explanation: "The text doesn't mention recycling paper."
        },
        {
          type: "find_error",
          segments: ["Using a reusable bottle ", { u: "save" }, " hundreds of ", { u: "bottles" }, " ", { u: "a year" }, "."],
          correctIndex: 0, correction: "saves", explanation: "The subject 'using a reusable bottle' is singular → saves.", question: "Find the mistake"
        }
      ]
    },

    "x3-b1-listen-interview": {
      lessonId: "x3-b1-listen-interview", level: "B1", track: "Listening", topic: "work", skill: "listening",
      title: "Listening: a job interview", xpReward: 52, mascotState: "explaining",
      explanation: {
        body: "Listen to typical phrases from a job interview. Learn to understand questions about experience and strengths. Play the audio and, if you like, listen more slowly.",
        examples: [
          { en: "Tell me about your experience." },
          { en: "What are your strengths?" }
        ]
      },
      exercises: [
        { type: "listening", text: "Why do you want this job?", "audio": "assets/audio/app/b1_7aea1c96a6.mp3", question: "What did you hear?",
          options: ["Why do you want this job?", "Where do you want this job?", "Why do you want this dog?"], correctIndex: 0, explanation: "Why do you want this job?" },
        { type: "listening", text: "I have three years of experience.", "audio": "assets/audio/app/b1_64a0b75bba.mp3", question: "What did you hear?",
          options: ["I have free years of experience.", "I have three years of experiments.", "I have three years of experience."], correctIndex: 2, explanation: "experience = knowledge from doing a job." },
        { type: "listening", text: "Can you tell me about yourself?", "audio": "assets/audio/app/b1_c5ca84c64c.mp3", question: "Write what you heard:", answers: ["can you tell me about yourself", "can you tell me about yourself?"], explanation: "Can you tell me about yourself?" },
        { type: "matching", instruction: "Match each word with its meaning.", pairs: [{"l":"strengths","r":"things you are good at"},{"l":"weakness","r":"something you are not good at"},{"l":"experience","r":"knowledge from doing a job"},{"l":"skills","r":"abilities you have learned"}] },
        { type: "multiple_choice", question: "Good answer to \"What are your strengths?\"", options: ["I am always late.", "I am hardworking and organised.", "I don't know, maybe nothing."], correctIndex: 1, explanation: "It highlights positive qualities." }
      ]
    },

    "x3-b1-use-phrasal-verbs": {
      lessonId: "x3-b1-use-phrasal-verbs", level: "B1", track: "Functional English", topic: "social", skill: "use", tipo: "aprende", title: "Agreeing and disagreeing", rev: 2, xpReward: 54,
      mascotState: "explaining",
      explanation: {
        body: "Episode 2 · The team is choosing a name for a new feature in the app. Everyone has an idea, and not everyone agrees! Learn to agree and disagree without sounding rude. Strong agreement: Absolutely. / I couldn't agree more. / Exactly! Partial agreement: I see your point, but... / That's true, but... Polite disagreement: I'm not sure about that. / I'm afraid I disagree. / I see it differently. Avoid a flat \"No!\" or \"You're wrong.\" Adding a reason makes disagreement sound respectful.",
        examples: [
          { en: "Let's call it TripBuddy. It's fun and easy to remember." },
          { en: "I couldn't agree more. It sounds friendly." },
          { en: "I see your point, but I think it sounds a bit childish." },
          { en: "That's a fair point. Why don't we test both names with users?" }
        ],
        sections: [
          { kind: "intro", body: "Episode 2 · The team is choosing a name for a new feature in the app. Everyone has an idea, and not everyone agrees! Learn to agree and disagree without sounding rude." },
          {
            kind: "regla",
            body: "Strong agreement: Absolutely. / I couldn't agree more. / Exactly! Partial agreement: I see your point, but... / That's true, but... Polite disagreement: I'm not sure about that. / I'm afraid I disagree. / I see it differently. Avoid a flat \"No!\" or \"You're wrong.\" Adding a reason makes disagreement sound respectful."
          },
          {
            kind: "vocab",
            items: [
              { en: "agree", ipa: "əˈɡriː", es: "have the same opinion" },
              { en: "disagree", ipa: "ˌdɪsəˈɡriː", es: "have a different opinion" },
              { en: "point", ipa: "pɔɪnt", es: "an idea or opinion someone expresses" },
              { en: "exactly", ipa: "ɪɡˈzæktli", es: "used to say something is completely right" },
              { en: "absolutely", ipa: "ˌæbsəˈluːtli", es: "completely (strong agreement)" },
              { en: "on the other hand", es: "introduces an opposite idea" },
              { en: "compromise", ipa: "ˈkɒmprəmaɪz", es: "an agreement where both sides accept less than they wanted" },
              { en: "fair", ipa: "feə", es: "reasonable and acceptable" }
            ]
          },
          {
            kind: "expresiones",
            items: [
              { en: "I couldn't agree more.", es: "strong agreement" },
              { en: "I see your point, but...", es: "partial agreement" },
              { en: "I'm not sure about that.", es: "soft disagreement" },
              { en: "That's a fair point.", es: "accept part of someone's argument" }
            ]
          },
          {
            kind: "ejemplos",
            items: [
              { en: "Tom: Let's call it TripBuddy. It's fun and easy to remember." },
              { en: "Priya: I couldn't agree more. It sounds friendly." },
              { en: "Daniel: I see your point, but I think it sounds a bit childish." },
              { en: "Carmen: That's a fair point. Why don't we test both names with users?" }
            ]
          },
          {
            kind: "errores",
            items: [
              { no: "I am agree with you.", si: "I agree with you.", pq: "agree is a verb; don't add be." },
              { no: "I couldn't agree less. (meaning strong agreement)", si: "I couldn't agree more.", pq: "\"I couldn't agree less\" means total disagreement." },
              { no: "You are wrong. (in a meeting)", si: "I see it differently.", pq: "Very direct statements can sound rude; soften them." }
            ]
          },
          {
            kind: "resumen",
            body: "Agree: Absolutely / Exactly / I couldn't agree more. Partly agree: I see your point, but... Disagree politely: I'm not sure about that / I'm afraid I disagree. Give a reason."
          },
          { kind: "puente", body: "Help the team find a name everyone can accept." }
        ]
      },
      exercises: [
        {
          type: "matching", instruction: "Match each phrase with its function.",
          pairs: [
            { l: "I couldn't agree more.", r: "strong agreement" },
            { l: "I see your point, but...", r: "partial agreement" },
            { l: "I'm afraid I disagree.", r: "polite disagreement" },
            { l: "That's a fair point.", r: "accepting part of an argument" }
          ]
        },
        {
          type: "listening", text: "That's true, but on the other hand, it's very expensive.", question: "How does the speaker feel?",
          options: ["They partly agree but have a concern", "They completely agree", "They have no opinion"], correctIndex: 0
        },
        {
          type: "categorize", instruction: "Agree or disagree?",
          buckets: [{ id: "agree", label: "Agree" }, { id: "disagree", label: "Disagree" }],
          items: [
            { t: "Absolutely.", bucket: "agree" },
            { t: "Exactly!", bucket: "agree" },
            { t: "I couldn't agree more.", bucket: "agree" },
            { t: "I'm not sure about that.", bucket: "disagree" },
            { t: "I see it differently.", bucket: "disagree" },
            { t: "I'm afraid I disagree.", bucket: "disagree" }
          ]
        },
        {
          type: "multiple_choice",
          question: "Your colleague says: \"We should have meetings every day.\" You partly agree. You say:",
          options: ["I see your point, but maybe twice a week is enough.", "You're totally wrong.", "Exactly! Every day, all day."], correctIndex: 0, explanation: "Partial agreement + a reason or alternative."
        },
        {
          type: "find_error",
          segments: ["I ", { u: "am" }, " ", { u: "agree" }, " ", { u: "with" }, " Daniel's idea."],
          correctIndex: 0, correction: "(delete am) I agree with Daniel's idea.", explanation: "agree is a verb, so it doesn't need am.", question: "Find the mistake"
        },
        { type: "fill_blank", sentence: "I couldn't agree ___. That's exactly what I think.", answers: ["more"], hint: "Strong agreement.", explanation: "I couldn't agree more." },
        { type: "speak", text: "I see your point, but I think it sounds a bit childish." },
        {
          type: "translate", prompt: "Rewrite more politely using \"afraid\": \"I disagree.\"",
          answers: ["i'm afraid i disagree", "i am afraid i disagree", "i'm afraid i don't agree", "i am afraid i do not agree"], explanation: "I'm afraid I disagree."
        }
      ]
    },

    /* ============================================================
     * ============================ B2 ============================
     * ============================================================ */

    "x3-b2-vocab-work": {
      lessonId: "x3-b2-vocab-work", level: "B2", track: "Vocabulary", topic: "work", skill: "vocab",
      title: "Vocabulary: the world of work", xpReward: 60, mascotState: "explaining",
      explanation: {
        body: "B2 vocabulary about work: hiring, promotions, deadlines and meetings. Many are fixed collocations: 'meet a deadline', 'apply for a job'. Learn the chunks, not just the single words.",
        examples: [
          { en: "She applied for a managerial position." },
          { en: "We need to meet the deadline." }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Match each term with its meaning.", pairs: [{"l":"deadline","r":"the latest time to finish"},{"l":"to hire","r":"to give someone a job"},{"l":"promotion","r":"a move to a higher position"},{"l":"salary","r":"fixed pay for a job"},{"l":"colleague","r":"a person you work with"},{"l":"to resign","r":"to leave your job by choice"}] },
        { type: "matching", instruction: "Match each verb with its collocation.", pairs: [
          { l: "meet", r: "a deadline" }, { l: "apply for", r: "a job" },
          { l: "attend", r: "a meeting" }, { l: "give", r: "a presentation" } ] },
        { type: "multiple_choice", question: "Choose: \"He was ___ after only six months.\"", options: ["promoted", "promotion", "promote"], correctIndex: 0, explanation: "Passive: was promoted (got a higher position)." },
        { type: "fill_blank", sentence: "I'd like to ___ for the marketing job.", answers: ["apply"], hint: "apply ___ a job.", explanation: "apply for a job = formally ask for a job." },
        { type: "translate", prompt: "Rewrite with 'meet' and 'deadline': We must finish everything by Friday.", answers: ["we have to meet the deadline on friday","we must meet the deadline on friday","we have to meet the friday deadline","we must meet the friday deadline","we need to meet the deadline on friday"], explanation: "We have to meet the deadline on Friday." }
      ]
    },

    "x3-b2-vocab-media": {
      lessonId: "x3-b2-vocab-media", level: "B2", track: "Vocabulary", topic: "media", skill: "vocab",
      title: "Vocabulary: media and news", xpReward: 60, mascotState: "explaining",
      explanation: {
        body: "B2 vocabulary about the media, news and social networks. It includes terms like 'headline', 'source', 'bias' and 'misinformation', key to talking about information today.",
        examples: [
          { en: "Always check your sources." },
          { en: "The headline was misleading." }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Match each term with its meaning.", pairs: [{"l":"headline","r":"the title of a news story"},{"l":"source","r":"where information comes from"},{"l":"bias","r":"an unfair preference for one side"},{"l":"misinformation","r":"false or inaccurate information"},{"l":"broadcast","r":"a programme on TV or radio"},{"l":"to go viral","r":"to spread very fast online"}] },
        { type: "categorize", instruction: "Reliable or unreliable information?", buckets: [
          { id: "r", label: "Reliable" }, { id: "u", label: "Unreliable" } ], items: [
          { t: "verified source", bucket: "r" }, { t: "rumour", bucket: "u" },
          { t: "fact-checked", bucket: "r" }, { t: "clickbait", bucket: "u" } ] },
        { type: "multiple_choice", question: "'Bias' in the news means...", options: ["a balanced view", "breaking news", "an unfair preference for one side"], correctIndex: 2, explanation: "bias = an unfair preference for one side." },
        { type: "fill_blank", sentence: "Before sharing news, you should check the ___.", answers: ["source", "sources", "facts"], hint: "Where the information comes from.", explanation: "source = where information comes from." },
        { type: "true_false", statement: "'Misinformation' means false or inaccurate information.", answer: true, explanation: "misinformation = false or inaccurate information." }
      ]
    },

    "x3-b2-grammar-reported-speech": {
      lessonId: "x3-b2-grammar-reported-speech", level: "B2", track: "Grammar", topic: "grammar", skill: "grammar",
      title: "Reported speech", xpReward: 62, mascotState: "explaining",
      explanation: {
        body: "In reported speech, tenses usually move one step back: present simple → past simple, will → would, can → could. Pronouns and time references also change (today → that day). After 'said' we don't use a person directly; after 'told' we need an object.",
        examples: [
          { en: "\"I am tired.\" → She said she was tired." },
          { en: "\"I will call you.\" → He said he would call me." }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "Report: \"I am busy.\" → She said she ___ busy.", options: ["is", "was", "will be"], correctIndex: 1, explanation: "present → past: is → was." },
        { type: "multiple_choice", question: "Report: \"I will help.\" → He said he ___ help.", options: ["won't", "will", "would"], correctIndex: 2, explanation: "will → would." },
        { type: "find_error", question: "Find the mistake.",
          segments: ["She ", { u: "said" }, " ", { u: "me" }, " that she ", { u: "was" }, " ", { u: "leaving" }, "."],
          correctIndex: 1, correction: "told me / said to me",
          explanation: "'said' doesn't take a direct object: use 'told me' or 'said that...'." },
        { type: "fill_blank", sentence: "\"I can swim.\" → He said he ___ swim.", answers: ["could"], hint: "can moves back to...", explanation: "can → could." },
        { type: "translate", prompt: "Report it: \"They live here.\" → They said they ___ here. (Write the whole sentence.)", answers: ["lived"], explanation: "live → lived." },
        { type: "true_false", statement: "In reported speech, \"today\" often changes to \"that day\".", answer: true, explanation: "Time references also change." }
      ]
    },

    "x3-b2-grammar-third-conditional": {
      lessonId: "x3-b2-grammar-third-conditional", level: "B2", track: "Grammar", topic: "grammar", skill: "grammar",
      title: "The third conditional", xpReward: 62, mascotState: "explaining",
      explanation: {
        body: "The third conditional talks about an imaginary past (things that did NOT happen): If + past perfect (had + past participle), + would have + past participle. It's used for regrets and hypotheses about the past.",
        examples: [
          { en: "If I had studied, I would have passed." },
          { en: "If she had left earlier, she wouldn't have missed the train." }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "Choose: \"If we ___ left earlier, we would have arrived on time.\"", options: ["have", "had", "would have"], correctIndex: 1, explanation: "If + past perfect: had left." },
        { type: "find_error", question: "Find the mistake.",
          segments: ["If I ", { u: "would" }, " ", { u: "have" }, " ", { u: "known" }, ", I would have ", { u: "helped" }, "."],
          correctIndex: 0, correction: "(remove 'would') If I had known",
          explanation: "The 'if' part takes 'had known', not 'would have'." },
        { type: "fill_blank", sentence: "If they had asked me, I ___ helped them.", answers: ["would have", "would've"], hint: "would + have + past participle.", explanation: "would have helped." },
        { type: "word_order", words: ["If", "he", "had", "called", "I", "would", "have", "answered"], correctOrder: ["If", "he", "had", "called", "I", "would", "have", "answered"], hint: "If + had + past participle, would have + past participle." },
        { type: "translate", prompt: "Make a third conditional: I didn't know, so I didn't tell you. (If I had…)", answers: ["if i had known i would have told you","if i had known, i would have told you","if i had known i'd have told you","if i'd known i would have told you","if i'd known i'd have told you"], explanation: "If I had known, I would have told you." },
        { type: "true_false", statement: "The third conditional refers to imaginary situations in the past.", answer: true, explanation: "It talks about pasts that didn't happen." }
      ]
    },

    "x3-b2-read-remote-work": {
      lessonId: "x3-b2-read-remote-work", level: "B2", track: "Reading", topic: "work", skill: "reading",
      title: "Reading: The rise of remote work", xpReward: 62, mascotState: "explaining",
      explanation: {
        body: "A B2 reading about remote work. Practise main idea, detail, inference and vocabulary in context. The text presents advantages and disadvantages in a balanced way.",
        examples: [
          { en: "a double-edged sword" },
          { en: "work-life balance" }
        ]
      },
      exercises: [
        { type: "reading", title: "Working from home",
          passage: "Over the last few years, remote work has moved from being a rare privilege to a common arrangement. For many employees, the benefits are clear: no daily commute, more flexible hours and, often, a better work-life balance.\n\nHowever, remote work is something of a double-edged sword. Some workers report feeling isolated from their colleagues, and the line between professional and personal life can become blurred. Companies, meanwhile, worry about maintaining a strong team culture when staff rarely meet in person. The challenge for the future is not whether remote work will continue, but how to keep its advantages while reducing its drawbacks.",
          questions: [
            { q: "What is the main purpose of the text?", options: ["to argue that remote work should be banned", "to present both the benefits and the drawbacks of remote work", "to explain how to set up a home office"], correctIndex: 1, explanation: "It presents advantages and disadvantages in a balanced way." },
            { q: "In the text, \"a double-edged sword\" suggests that remote work...", options: ["has both good and bad sides", "is very dangerous", "is completely positive"], correctIndex: 0, explanation: "Idiom: it has advantages and disadvantages." },
            { q: "What worries companies according to the text?", options: ["the price of computers", "the cost of office rent", "maintaining a strong team culture"], correctIndex: 2, explanation: "\"...maintaining a strong team culture...\"" },
            { q: "What does the author suggest about the future?", options: ["The question is how to keep the benefits and reduce the problems.", "Remote work will probably disappear.", "Everyone will return to the office full time."], correctIndex: 0, explanation: "\"...how to keep its advantages while reducing its drawbacks.\"" }
          ] },
        { type: "matching", instruction: "Match each word with its meaning.", pairs: [{"l":"commute","r":"the journey to and from work"},{"l":"drawback","r":"a disadvantage"},{"l":"blurred","r":"not clear or separate"},{"l":"isolated","r":"alone, far from others"}] },
        { type: "true_false", statement: "The author believes remote work is entirely positive.", answer: false, explanation: "The writer calls it 'a double-edged sword'." },
        {
          type: "multiple_choice", question: "In the text, \"blurred\" most nearly means...", options: ["less clear", "completely removed", "more important"], correctIndex: 0,
          explanation: "blurred = not clearly separated."
        },
        {
          type: "fill_blank", sentence: "Remote work has moved from being a rare ___ to a common arrangement.", answers: ["privilege"], hint: "A special advantage only some people have.",
          explanation: "...a rare privilege..."
        },
        {
          type: "translate",
          prompt: "Rewrite using \"not whether ... but how\": \"The question is how remote work will continue, not if it will.\"",
          answers: ["the question is not whether remote work will continue but how", "the challenge is not whether remote work will continue but how"],
          explanation: "The question is not whether remote work will continue, but how."
        }
      ]
    },

    "x3-b2-use-linkers": {
      lessonId: "x3-b2-use-linkers", level: "B2", track: "Functional English", topic: "work", skill: "use", tipo: "aprende", title: "Apologising and giving bad news", rev: 2, xpReward: 60,
      mascotState: "explaining",
      explanation: {
        body: "Episode 8 · The beta launch went well, but Carmen made a mistake: she sent the customer survey to the wrong mailing list. And now she has to tell the CEO that the full launch will be delayed. Learn to apologise professionally and deliver bad news with tact. A professional apology: take responsibility (That was my mistake. / I take full responsibility.), apologise sincerely (I'm really sorry for any confusion this caused.) and explain the fix (I've already contacted... / It won't happen again because...). Avoid excuses like 'It wasn't really my fault'. Bad news: prepare the listener (I'm afraid I have some bad news. / Unfortunately, ...), be clear and brief, then move to solutions (The good news is... / What we can do is...).",
        examples: [
          { en: "I'm afraid I have some bad news. The full launch will be delayed by three weeks." },
          { en: "Three weeks? What happened?" },
          { en: "A few payment bugs need fixing. Also, I sent the survey to the wrong list. That was my mistake, and I take full responsibility." },
          { en: "The good news is that the beta users love the app, and I've already sent the survey to the right people." }
        ],
        sections: [
          {
            kind: "intro",
            body: "Episode 8 · The beta launch went well, but Carmen made a mistake: she sent the customer survey to the wrong mailing list. And now she has to tell the CEO that the full launch will be delayed. Learn to apologise professionally and deliver bad news with tact."
          },
          {
            kind: "regla",
            body: "A professional apology: take responsibility (That was my mistake. / I take full responsibility.), apologise sincerely (I'm really sorry for any confusion this caused.) and explain the fix (I've already contacted... / It won't happen again because...). Avoid excuses like 'It wasn't really my fault'. Bad news: prepare the listener (I'm afraid I have some bad news. / Unfortunately, ...), be clear and brief, then move to solutions (The good news is... / What we can do is...)."
          },
          {
            kind: "vocab",
            items: [
              { en: "take responsibility", es: "accept that something is your fault" },
              { en: "confusion", ipa: "kənˈfjuːʒən", es: "a situation where people don't understand what's happening" },
              { en: "unfortunately", ipa: "ʌnˈfɔːtʃənətli", es: "used to introduce bad news" },
              { en: "delay", ipa: "dɪˈleɪ", es: "a situation where something happens later than planned" },
              { en: "tactful", ipa: "ˈtæktfəl", es: "careful not to upset people" },
              { en: "reassure", ipa: "ˌriːəˈʃʊə", es: "make someone feel less worried" },
              { en: "setback", ipa: "ˈsetbæk", es: "a problem that delays progress" },
              { en: "make up for", es: "do something good to correct a bad situation" }
            ]
          },
          {
            kind: "expresiones",
            items: [
              { en: "That was my mistake, and I take full responsibility.", es: "accept blame professionally" },
              { en: "I'm afraid I have some bad news.", es: "prepare the listener" },
              { en: "Unfortunately, ...", es: "introduce bad news neutrally" },
              { en: "The good news is...", es: "move to a positive point or solution" }
            ]
          },
          {
            kind: "ejemplos",
            items: [
              { en: "Carmen: I'm afraid I have some bad news. The full launch will be delayed by three weeks." },
              { en: "CEO: Three weeks? What happened?" },
              { en: "Carmen: A few payment bugs need fixing. Also, I sent the survey to the wrong list. That was my mistake, and I take full responsibility." },
              { en: "Carmen: The good news is that the beta users love the app, and I've already sent the survey to the right people." }
            ]
          },
          {
            kind: "errores",
            items: [
              { no: "Sorry, but it wasn't really my fault.", si: "I'm sorry. That was my mistake.", pq: "Excuses weaken an apology; take responsibility first." },
              { no: "I apologise for the confusing.", si: "I apologise for the confusion.", pq: "Use the noun 'confusion'." },
              { no: "The launch will delay three weeks.", si: "The launch will be delayed by three weeks.", pq: "Use the passive (be delayed) and 'by' for the amount of time." }
            ]
          },
          { kind: "resumen", body: "Apology: responsibility + sincere apology + the fix. Bad news: prepare (I'm afraid... / Unfortunately...) + be clear + move to solutions (The good news is...)." },
          { kind: "puente", body: "Help Carmen handle the toughest conversation of her week." }
        ]
      },
      exercises: [
        {
          type: "multiple_choice", question: "Which apology sounds the most professional?",
          options: ["I'm sorry. That was my mistake, and I've already fixed it.", "Sorry, but everyone makes mistakes.", "It wasn't my fault. The system is confusing."], correctIndex: 0,
          explanation: "Responsibility + apology + the fix."
        },
        {
          type: "listening",
          text: "Unfortunately, the order won't arrive until next week. The good news is that we can offer free express delivery on your next order.", question: "What is the bad news?",
          options: ["The order is late", "The order was cancelled", "Delivery is expensive"], correctIndex: 0
        },
        {
          type: "categorize", instruction: "A good or bad way to give bad news?",
          buckets: [{ id: "good", label: "Good" }, { id: "bad", label: "Bad" }],
          items: [
            { t: "I'm afraid I have some bad news.", bucket: "good" },
            { t: "Unfortunately, the project is delayed.", bucket: "good" },
            { t: "What we can do is extend the deadline.", bucket: "good" },
            { t: "Bad news: you're not getting it.", bucket: "bad" },
            { t: "It's not my problem.", bucket: "bad" },
            { t: "Don't blame me, but it's late.", bucket: "bad" }
          ]
        },
        {
          type: "find_error",
          segments: ["The meeting ", { u: "will" }, " ", { u: "delay" }, " ", { u: "by" }, " two hours."],
          correctIndex: 1, correction: "be delayed", explanation: "Use the passive: The meeting will be delayed by two hours.", question: "Find the mistake"
        },
        {
          type: "matching", instruction: "Match each word with its meaning.",
          pairs: [
            { l: "setback", r: "a problem that delays progress" },
            { l: "reassure", r: "make someone feel less worried" },
            { l: "tactful", r: "careful not to upset people" },
            { l: "make up for", r: "do something good to correct a bad situation" },
            { l: "confusion", r: "a situation where people don't understand what's happening" }
          ]
        },
        { type: "fill_blank", sentence: "I take full ___ for the mistake.", answers: ["responsibility"], hint: "accept that it's your fault", explanation: "I take full responsibility." },
        { type: "speak", text: "I'm afraid I have some bad news. The launch will be delayed by three weeks." },
        {
          type: "translate",
          prompt: "Rewrite as bad news, starting with \"Unfortunately\": \"We can't deliver your order on time.\"",
          answers: ["unfortunately we can't deliver your order on time", "unfortunately we cannot deliver your order on time", "unfortunately we won't be able to deliver your order on time", "unfortunately we will not be able to deliver your order on time"],
          explanation: "Unfortunately, we can't deliver your order on time."
        }
      ]
    },

    /* ============================================================
     * ============================ C1 ============================
     * ============================================================ */

    "x3-c1-vocab-academic": {
      lessonId: "x3-c1-vocab-academic", level: "C1", track: "Vocabulary", topic: "academic", skill: "vocab", tipo: "aprende", title: "Verbs that show stance: claim, concede, dismiss", rev: 2, xpReward: 68,
      mascotState: "explaining",
      explanation: {
        body: "\"The minister said the plan was working.\" Did she prove it? Admit a problem? Reject criticism? C1 writers choose reporting verbs that show attitude: claim suggests doubt, concede shows a reluctant admission, dismiss shows rejection. One verb can change the meaning of a whole sentence. Neutral: state, note, report, explain. The writer doubts it: claim, allege. Firm, repeated belief: maintain, insist, contend. Reluctant admission: concede, acknowledge, admit. Rejection: dismiss, reject, refute (= prove wrong), deny (= say it isn't true). Patterns: claim / maintain / concede + that-clause; dismiss + noun + as + adjective (She dismissed the idea as unrealistic); acknowledge + noun or that-clause.",
        examples: [
          { en: "The company claims that its product is completely natural." },
          { en: "The minister conceded that mistakes had been made." },
          { en: "He dismissed the criticism as politically motivated." },
          { en: "New data appears to refute the original theory." }
        ],
        sections: [
          {
            kind: "intro",
            body: "\"The minister said the plan was working.\" Did she prove it? Admit a problem? Reject criticism? C1 writers choose reporting verbs that show attitude: claim suggests doubt, concede shows a reluctant admission, dismiss shows rejection. One verb can change the meaning of a whole sentence."
          },
          {
            kind: "regla",
            body: "Neutral: state, note, report, explain. The writer doubts it: claim, allege. Firm, repeated belief: maintain, insist, contend. Reluctant admission: concede, acknowledge, admit. Rejection: dismiss, reject, refute (= prove wrong), deny (= say it isn't true). Patterns: claim / maintain / concede + that-clause; dismiss + noun + as + adjective (She dismissed the idea as unrealistic); acknowledge + noun or that-clause."
          },
          {
            kind: "vocab",
            items: [
              { en: "claim", ipa: "kleɪm", es: "say something is true without proving it" },
              { en: "concede", ipa: "kənˈsiːd", es: "admit, often reluctantly, that something is true" },
              { en: "dismiss", ipa: "dɪsˈmɪs", es: "refuse to consider something seriously" },
              { en: "acknowledge", ipa: "əkˈnɒlɪdʒ", es: "accept that something exists or is true" },
              { en: "maintain", ipa: "meɪnˈteɪn", es: "continue to say firmly that something is true" },
              { en: "refute", ipa: "rɪˈfjuːt", es: "prove that something is wrong" },
              { en: "allege", ipa: "əˈledʒ", es: "say someone has done wrong without giving proof" },
              { en: "contend", ipa: "kənˈtend", es: "argue that something is true" }
            ]
          },
          {
            kind: "expresiones",
            items: [
              { en: "Critics claim that...", es: "introduce a view you may not share" },
              { en: "She conceded that...", es: "report a reluctant admission" },
              { en: "He dismissed the report as...", es: "report a rejection" },
              { en: "It is widely acknowledged that...", es: "introduce an accepted fact" }
            ]
          },
          {
            kind: "ejemplos",
            items: [
              { en: "The company claims that its product is completely natural." },
              { en: "The minister conceded that mistakes had been made." },
              { en: "He dismissed the criticism as politically motivated." },
              { en: "New data appears to refute the original theory." }
            ]
          },
          {
            kind: "errores",
            items: [
              {
                no: "She refuted the accusation, but she couldn't prove it was false.", si: "She denied the accusation, but she couldn't prove it was false.",
                pq: "refute means to prove something wrong; deny just says it isn't true."
              },
              { no: "He dismissed the idea like unrealistic.", si: "He dismissed the idea as unrealistic.", pq: "The pattern is dismiss + something + as + adjective." },
              { no: "The CEO conceded the company to have made mistakes.", si: "The CEO conceded that the company had made mistakes.", pq: "concede + that-clause." }
            ]
          },
          { kind: "resumen", body: "Doubt: claim, allege. Firm belief: maintain, contend. Reluctant admission: concede, acknowledge. Rejection: dismiss, refute, deny." },
          { kind: "puente", body: "Choose verbs that say what you really think." }
        ]
      },
      exercises: [
        {
          type: "matching", instruction: "Match each verb with its meaning.",
          pairs: [
            { l: "claim", r: "say something is true without proving it" },
            { l: "concede", r: "admit, often reluctantly, that something is true" },
            { l: "dismiss", r: "refuse to consider something seriously" },
            { l: "acknowledge", r: "accept that something exists or is true" },
            { l: "refute", r: "prove that something is wrong" },
            { l: "allege", r: "say someone has done wrong without proof" }
          ]
        },
        {
          type: "categorize", instruction: "What does the verb show about the writer's or speaker's attitude?",
          buckets: [{ id: "doubt", label: "Doubt" }, { id: "admit", label: "Reluctant admission" }, { id: "reject", label: "Rejection" }],
          items: [
            { t: "claim", bucket: "doubt" },
            { t: "allege", bucket: "doubt" },
            { t: "concede", bucket: "admit" },
            { t: "acknowledge", bucket: "admit" },
            { t: "dismiss", bucket: "reject" },
            { t: "refute", bucket: "reject" }
          ]
        },
        {
          type: "multiple_choice", question: "After weeks of denial, the company finally ___ that the data had been lost.", options: ["conceded", "claimed", "dismissed"], correctIndex: 0,
          explanation: "A reluctant admission after denial: conceded."
        },
        {
          type: "find_error",
          segments: ["The scientist ", { u: "dismissed" }, " the theory ", { u: "like" }, " ", { u: "completely" }, " unfounded."],
          correctIndex: 1, correction: "as", explanation: "dismiss + something + as + adjective.", question: "Find the mistake"
        },
        {
          type: "fill_blank",
          sentence: "The new study appears to ___ the claim that coffee causes heart disease; it proves the opposite.", answers: ["refute", "disprove"], hint: "prove that something is wrong",
          explanation: "refute = prove wrong."
        },
        {
          type: "listening", text: "Critics claim the new policy will save money, but so far there's no evidence.", question: "What is the speaker's attitude to the claim?",
          options: ["Doubtful", "Completely convinced", "Neutral and uninterested"], correctIndex: 0
        },
        { type: "true_false", statement: "\"Refute\" and \"deny\" mean exactly the same.", answer: false, explanation: "refute = prove something is wrong; deny = say it isn't true." },
        {
          type: "translate",
          prompt: "Rewrite using \"conceded\": \"The coach admitted, reluctantly, that the team had played badly.\"",
          answers: ["the coach conceded that the team had played badly", "the coach conceded the team had played badly"], explanation: "The coach conceded that the team had played badly."
        }
      ]
    },

    "x3-c1-vocab-idioms": {
      lessonId: "x3-c1-vocab-idioms", level: "C1", track: "Vocabulary", topic: "idioms", skill: "vocab", tipo: "aprende", title: "Idioms for everyday conversation", rev: 2, xpReward: 68,
      mascotState: "explaining",
      explanation: {
        body: "Idioms are fixed expressions whose meaning isn't literal: if a test is 'a piece of cake', nobody is eating. Used well, they make your English sound natural and relaxed. This lesson gives you twelve high-frequency idioms for everyday conversation. Learn idioms as complete chunks, with every word in place: cost an arm and a leg (not 'an arm and leg'). Don't translate them word for word, and don't swap words or prepositions: under the weather, not 'on the weather'. Most are informal: perfect for conversation and emails to friends, usually too casual for academic essays.",
        examples: [
          { en: "We played a quick game to break the ice." },
          { en: "Losing that job was a blessing in disguise; I found a much better one." },
          { en: "She only calls once in a blue moon." },
          { en: "When the printer jammed again, it was the last straw." }
        ],
        sections: [
          {
            kind: "intro",
            body: "Idioms are fixed expressions whose meaning isn't literal: if a test is 'a piece of cake', nobody is eating. Used well, they make your English sound natural and relaxed. This lesson gives you twelve high-frequency idioms for everyday conversation."
          },
          {
            kind: "regla",
            body: "Learn idioms as complete chunks, with every word in place: cost an arm and a leg (not 'an arm and leg'). Don't translate them word for word, and don't swap words or prepositions: under the weather, not 'on the weather'. Most are informal: perfect for conversation and emails to friends, usually too casual for academic essays."
          },
          {
            kind: "vocab",
            items: [
              { en: "break the ice", es: "make people feel relaxed at the start" },
              { en: "a piece of cake", es: "very easy" },
              { en: "under the weather", es: "feeling slightly ill" },
              { en: "hit the books", es: "start studying hard" },
              { en: "cost an arm and a leg", es: "be extremely expensive" },
              { en: "once in a blue moon", es: "very rarely" },
              { en: "a blessing in disguise", es: "something that seems bad but turns out well" },
              { en: "the last straw", es: "the final problem that makes a situation unbearable" }
            ]
          },
          {
            kind: "expresiones",
            items: [
              { en: "Let me sleep on it.", es: "give me time before I decide" },
              { en: "He got cold feet before the wedding.", es: "suddenly became too nervous to do it" },
              { en: "I'm still on the fence.", es: "I haven't decided yet" },
              { en: "She's still learning the ropes.", es: "learning how to do a new job" }
            ]
          },
          {
            kind: "ejemplos",
            items: [
              { en: "We played a quick game to break the ice." },
              { en: "Losing that job was a blessing in disguise; I found a much better one." },
              { en: "She only calls once in a blue moon." },
              { en: "When the printer jammed again, it was the last straw." }
            ]
          },
          {
            kind: "errores",
            items: [
              { no: "It costs an arm and leg.", si: "It costs an arm and a leg.", pq: "Idioms are fixed: keep every word." },
              { no: "I'm on the weather today.", si: "I'm under the weather today.", pq: "The preposition is under." },
              { no: "It was a cake piece.", si: "It was a piece of cake.", pq: "Never change the word order of an idiom." }
            ]
          },
          {
            kind: "resumen",
            body: "12 idioms: break the ice, a piece of cake, under the weather, hit the books, cost an arm and a leg, once in a blue moon, a blessing in disguise, the last straw, sleep on it, get cold feet, on the fence, learn the ropes. Fixed chunks, informal register."
          },
          { kind: "puente", body: "Use them in conversation, not in your next essay!" }
        ]
      },
      exercises: [
        {
          type: "matching", instruction: "Match each idiom with its meaning.",
          pairs: [
            { l: "break the ice", r: "make people feel relaxed at the start" },
            { l: "a piece of cake", r: "very easy" },
            { l: "under the weather", r: "feeling slightly ill" },
            { l: "hit the books", r: "start studying hard" },
            { l: "cost an arm and a leg", r: "be extremely expensive" },
            { l: "once in a blue moon", r: "very rarely" }
          ]
        },
        {
          type: "multiple_choice",
          question: "\"I failed my driving test, but it was a blessing in disguise.\" What does the speaker mean?",
          options: ["Failing turned out to be good.", "Failing was a terrible disaster.", "They actually passed the test."], correctIndex: 0,
          explanation: "a blessing in disguise = something bad that turns out well."
        },
        {
          type: "listening", text: "I'm still on the fence about the job offer. Let me sleep on it.", question: "What does the speaker want?",
          options: ["Time to decide", "To accept immediately", "To reject the offer"], correctIndex: 0
        },
        {
          type: "matching", instruction: "More idioms: match each one with its meaning.",
          pairs: [
            { l: "a blessing in disguise", r: "something bad that turns out well" },
            { l: "the last straw", r: "the final problem that makes things unbearable" },
            { l: "sleep on it", r: "take time before deciding" },
            { l: "get cold feet", r: "become too nervous to do something" },
            { l: "learn the ropes", r: "learn how to do a job" },
            { l: "on the fence", r: "undecided" }
          ]
        },
        { type: "fill_blank", sentence: "My exams start on Monday, so this weekend I really need to hit the ___.", answers: ["books"], hint: "start studying hard", explanation: "hit the books" },
        {
          type: "find_error",
          segments: ["The hotel was lovely, but it ", { u: "cost" }, " ", { u: "an arm and leg" }, " ", { u: "for" }, " three nights."],
          correctIndex: 1, correction: "an arm and a leg", explanation: "Keep every word of the idiom: cost an arm and a leg.", question: "Find the mistake"
        },
        {
          type: "categorize", instruction: "Positive or negative situation?",
          buckets: [{ id: "pos", label: "Positive" }, { id: "neg", label: "Negative" }],
          items: [
            { t: "a piece of cake", bucket: "pos" },
            { t: "a blessing in disguise", bucket: "pos" },
            { t: "break the ice", bucket: "pos" },
            { t: "the last straw", bucket: "neg" },
            { t: "under the weather", bucket: "neg" },
            { t: "cost an arm and a leg", bucket: "neg" }
          ]
        },
        {
          type: "true_false",
          statement: "Idioms like \"hit the books\" are usually appropriate in a formal academic essay.", answer: false, explanation: "They are informal; in an essay, use 'study intensively'."
        },
        {
          type: "translate", prompt: "Replace the words in brackets with an idiom: \"She visits us (very rarely).\"", answers: ["she visits us once in a blue moon", "she only visits us once in a blue moon"],
          explanation: "She visits us once in a blue moon."
        }
      ]
    },

    "x3-c1-grammar-inversion": {
      lessonId: "x3-c1-grammar-inversion", level: "C1", track: "Grammar", topic: "grammar", skill: "grammar",
      title: "Emphatic inversion", xpReward: 70, mascotState: "explaining",
      explanation: {
        body: "When a sentence starts with a negative or restrictive adverb (Never, Rarely, Not only, No sooner, Hardly), the subject-auxiliary order is inverted, as in a question: 'Never have I seen such a thing'. It adds emphasis and a formal register.",
        examples: [
          { en: "Never have I seen such a mess." },
          { en: "Not only did she sing, but she also danced." }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "Choose: \"Never ___ I heard such a beautiful song.\"", options: ["have", "I have", "did have"], correctIndex: 0, explanation: "Inversion: Never have I heard..." },
        { type: "find_error", question: "Find the mistake.",
          segments: ["Rarely ", { u: "she" }, " ", { u: "does" }, " ", { u: "complain" }, " about ", { u: "anything" }, "."],
          correctIndex: 0, correction: "does she (inversion)",
          explanation: "After 'Rarely' we invert: 'Rarely does she complain'." },
        { type: "fill_blank", sentence: "Not only ___ he apologise, but he also paid for the damage.", answers: ["did"], hint: "The auxiliary for inversion in the past.", explanation: "Not only did he apologise..." },
        { type: "word_order", words: ["No", "sooner", "had", "we", "arrived", "than", "it", "rained"], correctOrder: ["No", "sooner", "had", "we", "arrived", "than", "it", "rained"], hint: "No sooner + had + subject + past participle + than..." },
        { type: "translate", prompt: "Rewrite with inversion, starting 'Never…': I had never seen anything like that before.", answers: ["never had i seen anything like that","never had i seen something like that","never had i seen anything like that before","never before had i seen anything like that"], explanation: "Never had I seen anything like that." },
        { type: "true_false", statement: "Inversion after negative adverbs adds emphasis and formality.", answer: true, explanation: "Yes, it is an emphatic, formal device." }
      ]
    },

    "x3-c1-grammar-cleft": {
      lessonId: "x3-c1-grammar-cleft", level: "C1", track: "Grammar", topic: "grammar", skill: "grammar",
      title: "Cleft sentences (emphasis)", xpReward: 70, mascotState: "explaining",
      explanation: {
        body: "Cleft sentences split an idea to emphasise one part. With 'It is/was... that/who...': 'It was John who broke it'. With 'What...': 'What I need is time'. They highlight information without changing the basic meaning.",
        examples: [
          { en: "It was in 2020 that everything changed." },
          { en: "What surprised me was her honesty." }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "Emphasise the subject: \"Ana solved the problem.\"", options: ["It was Ana who solved the problem.", "It was the problem Ana solved.", "What Ana was the problem."], correctIndex: 0, explanation: "It was + subject + who: It was Ana who solved it." },
        { type: "fill_blank", sentence: "___ I really want is a holiday.", answers: ["What"], hint: "A cleft with 'What'.", explanation: "What I really want is a holiday." },
        { type: "find_error", question: "Find the mistake.",
          segments: ["It ", { u: "was" }, " the ", { u: "noise" }, " ", { u: "what" }, " woke ", { u: "me" }, "."],
          correctIndex: 2, correction: "that (not 'what')",
          explanation: "With 'It was...' we use 'that': 'It was the noise that woke me.'" },
        { type: "word_order", words: ["What", "matters", "is", "your", "effort"], correctOrder: ["What", "matters", "is", "your", "effort"], hint: "What + verb + is + ..." },
        { type: "translate", prompt: "Emphasise the person with an 'It was…' cleft: She helped me (not someone else).", answers: ["it was her who helped me","it was she who helped me","it was her that helped me","it was she that helped me"], explanation: "It was she/her who helped me." },
        { type: "true_false", statement: "Cleft sentences are used to emphasise part of a sentence.", answer: true, explanation: "Yes, they highlight a specific part." }
      ]
    },

    "x3-c1-read-ai": {
      lessonId: "x3-c1-read-ai", level: "C1", track: "Reading", topic: "tech", skill: "reading",
      title: "Reading: Artificial intelligence at work", xpReward: 70, mascotState: "explaining",
      explanation: {
        body: "A C1 reading about artificial intelligence at work. It's an argumentative text: identify the thesis, the arguments, the nuances and vocabulary in context. Distinguish claims from concessions.",
        examples: [
          { en: "to augment rather than replace" },
          { en: "a nuanced view" }
        ]
      },
      exercises: [
        { type: "reading", title: "Augment, not replace",
          passage: "Debate about artificial intelligence often falls into two extremes: utopian promises that machines will solve all our problems, and dystopian fears that they will make human work obsolete. A more nuanced view, however, is gaining ground among researchers.\n\nAccording to this perspective, the most promising applications of AI are those that augment human capabilities rather than replace them. A doctor assisted by an algorithm that flags unusual scans, for instance, may reach more accurate diagnoses than either the doctor or the machine working alone. The key, advocates argue, lies not in automation for its own sake, but in thoughtful collaboration between human judgement and computational power.",
          questions: [
            { q: "What is the main argument of the text?", options: ["AI will inevitably replace human workers.", "AI is most valuable when it augments, rather than replaces, human abilities.", "AI is too dangerous to use at work."], correctIndex: 1, explanation: "The thesis is that AI should complement humans." },
            { q: "The phrase \"a more nuanced view\" contrasts with...", options: ["the opinion of doctors", "the use of algorithms", "the two extreme positions mentioned before"], correctIndex: 2, explanation: "It contrasts with the two extremes (utopian and dystopian)." },
            { q: "In the text, \"augment\" most nearly means...", options: ["to enhance or add to", "to ignore", "to replace completely"], correctIndex: 0, explanation: "augment = improve, make bigger." },
            { q: "What does the doctor example illustrate?", options: ["that machines are always right", "that humans and AI together can outperform either alone", "that doctors should not use technology"], correctIndex: 1, explanation: "It illustrates human–machine collaboration." }
          ] },
        { type: "matching", instruction: "Match each word with its meaning.", pairs: [{"l":"nuanced","r":"showing subtle differences"},{"l":"to flag","r":"to point out a possible problem"},{"l":"obsolete","r":"no longer useful or needed"},{"l":"judgement","r":"the ability to decide wisely"}] },
        { type: "true_false", statement: "The author fully agrees with the dystopian fear that AI makes human work obsolete.", answer: false, explanation: "The writer defends a nuanced view of complementarity." },
        {
          type: "multiple_choice", question: "In the first paragraph, \"obsolete\" means...", options: ["no longer needed or used", "extremely valuable", "dangerous"], correctIndex: 0,
          explanation: "obsolete = out of date, no longer used."
        },
        {
          type: "fill_blank",
          sentence: "The key lies not in automation for its own ___, but in thoughtful collaboration.", answers: ["sake"], hint: "for its own ___ = just for itself", explanation: "for its own sake"
        },
        {
          type: "find_error",
          segments: ["A doctor ", { u: "assisted" }, " by an algorithm ", { u: "may reaches" }, " more ", { u: "accurate" }, " diagnoses."],
          correctIndex: 1, correction: "may reach", explanation: "Modal + base verb: may reach.", question: "Find the mistake"
        }
      ]
    },

    "x3-c1-listen-lecture": {
      lessonId: "x3-c1-listen-lecture", level: "C1", track: "Listening", topic: "academic", skill: "listening",
      title: "Listening: extracts from a lecture", xpReward: 68, mascotState: "explaining",
      explanation: {
        body: "Listen to phrases typical of an academic lecture and its signposting: 'to begin with', 'in other words', 'to sum up'. They help you follow the structure of a talk.",
        examples: [
          { en: "To sum up, there are three key points." },
          { en: "In other words, it depends on context." }
        ]
      },
      exercises: [
        { type: "listening", text: "To begin with, let me outline the main idea.", "audio": "assets/audio/app/c1_455e26172e.mp3", question: "What did you hear?",
          options: ["To begin with, let me outline the main aim.", "To begin width, let me outline the main idea.", "To begin with, let me outline the main idea."], correctIndex: 2, explanation: "To begin with = first of all." },
        { type: "listening", text: "In other words, the results were inconclusive.", "audio": "assets/audio/app/c1_1b2bfaf495.mp3", question: "What did you hear?",
          options: ["In other words, the results were inconclusive.", "In other words, the results were conclusive.", "In other worlds, the results were inconclusive."], correctIndex: 0, explanation: "inconclusive = not leading to a clear result." },
        { type: "listening", text: "To sum up, further research is needed.", "audio": "assets/audio/app/c1_af8115fba1.mp3", question: "Write what you heard:", answers: ["to sum up further research is needed", "to sum up, further research is needed"], explanation: "To sum up, further research is needed." },
        { type: "matching", instruction: "Match each signpost with its function.", pairs: [{"l":"to begin with","r":"introducing"},{"l":"in other words","r":"rephrasing"},{"l":"to sum up","r":"summarising"},{"l":"for instance","r":"giving an example"}] },
        { type: "multiple_choice", question: "Which phrase introduces a summary?", options: ["to begin with", "to sum up", "for instance"], correctIndex: 1, explanation: "to sum up = in summary." }
      ]
    },

    /* ============================================================
     * ============================ C2 ============================
     * ============================================================ */

    "x3-c2-vocab-nuance": {
      lessonId: "x3-c2-vocab-nuance", level: "C2", track: "Vocabulary", topic: "nuance", skill: "vocab",
      title: "Vocabulary: nuance and precision", xpReward: 76, mascotState: "explaining",
      explanation: {
        body: "At C2 the key is lexical precision: choosing the exact word among close synonyms. 'Meticulous' isn't just 'careful'; 'ubiquitous' goes beyond 'common'. Mastering these nuances is what sets an expert speaker apart.",
        examples: [
          { en: "a meticulous, painstaking analysis" },
          { en: "smartphones are now ubiquitous" }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Match each word with its precise meaning.", pairs: [{"l":"meticulous","r":"extremely careful about details"},{"l":"ubiquitous","r":"found everywhere"},{"l":"ephemeral","r":"lasting a very short time"},{"l":"candid","r":"honest and direct"},{"l":"tenacious","r":"refusing to give up"},{"l":"scrupulous","r":"morally careful and honest"}] },
        { type: "multiple_choice", question: "Which word best fits: \"a ___ remark\" (brutally honest)?", options: ["candid", "ubiquitous", "ephemeral"], correctIndex: 0, explanation: "candid = honest and direct." },
        { type: "multiple_choice", question: "\"Ephemeral\" describes something that...", options: ["lasts forever", "is extremely large", "lasts a very short time"], correctIndex: 2, explanation: "ephemeral = lasting a very short time." },
        { type: "fill_blank", sentence: "Plastic waste has become almost ___ in the oceans.", answers: ["ubiquitous"], hint: "It's everywhere.", explanation: "ubiquitous = present everywhere." },
        { type: "translate", prompt: "Rewrite with 'meticulous': She did the job with extreme care for every detail.", answers: ["she did a meticulous job","he did a meticulous job","they did a meticulous job","she did the job meticulously"], explanation: "She/He did a meticulous job." }
      ]
    },

    "x3-c2-vocab-idioms-advanced": {
      lessonId: "x3-c2-vocab-idioms-advanced", level: "C2", track: "Vocabulary", topic: "nuance", skill: "vocab", tipo: "aprende", title: "Understatement, irony and tact", rev: 2, xpReward: 76,
      mascotState: "explaining",
      explanation: {
        body: "\"The weather was not ideal\" (it was a hurricane). \"He's a bit of a perfectionist\" (he's impossible to work with). Understatement is everywhere in English, especially British English. Understanding it, and using it, is a mark of real fluency. Understatement softens or hides strong feelings: not exactly + positive adjective (not exactly cheap = very expensive); not the most... (not the most reliable = unreliable); a bit of a / somewhat / rather (a bit of a problem = a big problem). Litotes negates the opposite: not bad (= good), not unhelpful. Tactful phrases replace blunt words: economical with the truth (= lying), between jobs (= unemployed). Irony says the opposite: \"Lovely weather!\" in the rain. Tone and context decide the meaning.",
        examples: [
          { en: "The hotel was not exactly cheap: £400 a night." },
          { en: "Our presentation could have gone better; the client walked out." },
          { en: "With all due respect, I'm not entirely convinced by your figures." },
          { en: "He was a little economical with the truth about his experience." }
        ],
        sections: [
          {
            kind: "intro",
            body: "\"The weather was not ideal\" (it was a hurricane). \"He's a bit of a perfectionist\" (he's impossible to work with). Understatement is everywhere in English, especially British English. Understanding it, and using it, is a mark of real fluency."
          },
          {
            kind: "regla",
            body: "Understatement softens or hides strong feelings: not exactly + positive adjective (not exactly cheap = very expensive); not the most... (not the most reliable = unreliable); a bit of a / somewhat / rather (a bit of a problem = a big problem). Litotes negates the opposite: not bad (= good), not unhelpful. Tactful phrases replace blunt words: economical with the truth (= lying), between jobs (= unemployed). Irony says the opposite: \"Lovely weather!\" in the rain. Tone and context decide the meaning."
          },
          {
            kind: "vocab",
            items: [
              { en: "not exactly cheap", es: "very expensive" },
              { en: "a bit of a problem", es: "a serious problem" },
              { en: "economical with the truth", es: "not completely honest; lying" },
              { en: "not the sharpest tool in the box", es: "not very intelligent" },
              { en: "between jobs", es: "unemployed" },
              { en: "have a lot on one's plate", es: "have many things to deal with" },
              { en: "not bad at all", es: "very good" },
              { en: "could have gone better", es: "went badly" }
            ]
          },
          {
            kind: "expresiones",
            items: [
              { en: "That's not ideal.", es: "that's a problem" },
              { en: "With all due respect, ...", es: "I'm about to disagree strongly" },
              { en: "I'm not entirely convinced.", es: "I don't believe it at all" },
              { en: "That's one way of looking at it.", es: "I think you're wrong" }
            ]
          },
          {
            kind: "ejemplos",
            items: [
              { en: "The hotel was not exactly cheap: £400 a night." },
              { en: "Our presentation could have gone better; the client walked out." },
              { en: "With all due respect, I'm not entirely convinced by your figures." },
              { en: "He was a little economical with the truth about his experience." }
            ]
          },
          {
            kind: "errores",
            items: [
              { no: "'Not exactly cheap' means a little bit expensive.", si: "'Not exactly cheap' usually means very expensive.", pq: "Understatement says less than it means." },
              { no: "With all my respect, you're wrong.", si: "With all due respect, I see it differently.", pq: "The fixed phrase is 'with all due respect', followed by tactful disagreement." },
              { no: "He's economic with the truth.", si: "He's economical with the truth.", pq: "economical (careful, saving), not economic (about the economy)." }
            ]
          },
          {
            kind: "resumen",
            body: "Understatement says less than it means (not exactly, a bit of, could have gone better). Tactful phrases hide blunt truths (economical with the truth, between jobs). Read the tone and context."
          },
          { kind: "puente", body: "Learn to hear what people really mean." }
        ]
      },
      exercises: [
        {
          type: "matching", instruction: "Match each expression with what it really means.",
          pairs: [
            { l: "not exactly cheap", r: "very expensive" },
            { l: "a bit of a problem", r: "a serious problem" },
            { l: "economical with the truth", r: "not completely honest" },
            { l: "between jobs", r: "unemployed" },
            { l: "have a lot on one's plate", r: "have many things to deal with" },
            { l: "could have gone better", r: "went badly" }
          ]
        },
        {
          type: "multiple_choice",
          question: "A British colleague says: \"The meeting could have gone better.\" What do they most likely mean?",
          options: ["The meeting went badly.", "The meeting was perfect.", "The meeting was cancelled."], correctIndex: 0, explanation: "Understatement: could have gone better = went badly."
        },
        {
          type: "categorize", instruction: "What does the speaker really mean?",
          buckets: [{ id: "pos", label: "Something positive" }, { id: "neg", label: "Something negative" }],
          items: [
            { t: "Not bad at all.", bucket: "pos" },
            { t: "I can't complain.", bucket: "pos" },
            { t: "That's not ideal.", bucket: "neg" },
            { t: "It's a bit of a problem.", bucket: "neg" },
            { t: "I'm not entirely convinced.", bucket: "neg" },
            { t: "Well, that could have gone better.", bucket: "neg" }
          ]
        },
        {
          type: "listening",
          text: "Well, the new manager isn't exactly the most organised person I've ever worked with.", question: "What is the speaker saying?",
          options: ["The manager is very disorganised.", "The manager is very organised.", "The speaker has never worked with the manager."], correctIndex: 0
        },
        {
          type: "find_error",
          segments: ["He ", { u: "was" }, " a little ", { u: "economic" }, " with ", { u: "the truth" }, " about his salary."],
          correctIndex: 1, correction: "economical", explanation: "The idiom is 'economical with the truth'.", question: "Find the mistake"
        },
        { type: "fill_blank", sentence: "With all ___ respect, I don't think those figures are accurate.", answers: ["due"], hint: "a fixed phrase before disagreeing", explanation: "With all due respect, ..." },
        { type: "speak", text: "With all due respect, I'm not entirely convinced by your figures." },
        {
          type: "translate", prompt: "Make this more tactful using \"not exactly\": \"The film was boring.\"",
          answers: ["the film wasn't exactly exciting", "the film was not exactly exciting", "the film wasn't exactly thrilling", "the film was not exactly thrilling", "the film wasn't exactly interesting", "the film was not exactly interesting", "the film wasn't exactly gripping", "the film was not exactly gripping"],
          explanation: "The film wasn't exactly exciting."
        }
      ]
    },

    "x3-c2-grammar-subjunctive": {
      lessonId: "x3-c2-grammar-subjunctive", level: "C2", track: "Grammar", topic: "grammar", skill: "grammar",
      title: "The subjunctive and formal structures", xpReward: 78, mascotState: "explaining",
      explanation: {
        body: "The subjunctive in English is subtle. After verbs of demand or suggestion (demand, suggest, insist, recommend) we use the base form without 'to' for all persons: 'I suggest that he be present'. It also appears in fixed expressions: 'Be that as it may', 'If I were you'.",
        examples: [
          { en: "The board demanded that he resign." },
          { en: "It is essential that she be informed." }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "Choose: \"I suggest that he ___ on time.\"", options: ["is", "be", "will be"], correctIndex: 1, explanation: "Subjunctive after 'suggest that': base form 'be'." },
        { type: "find_error", question: "Find the mistake.",
          segments: ["The doctor ", { u: "recommended" }, " that she ", { u: "takes" }, " the ", { u: "medicine" }, " ", { u: "daily" }, "."],
          correctIndex: 1, correction: "take (subjunctive, no -s)",
          explanation: "After 'recommend that' we use the base form 'take', with no -s." },
        { type: "fill_blank", sentence: "It is vital that every student ___ aware of the rules.", answers: ["be"], hint: "Subjunctive after 'It is vital that...'.", explanation: "...that every student be aware..." },
        { type: "multiple_choice", question: "Complete the fixed expression: \"___ that as it may, we must continue.\"", options: ["Be", "Is", "Was"], correctIndex: 0, explanation: "A fixed expression: 'Be that as it may'." },
        { type: "translate", prompt: "Rewrite with the subjunctive: They insisted: \"He must be present.\" (They insisted that…)", answers: ["they insisted that he be present", "they insisted that she be present"], explanation: "They insisted that he/she be present." },
        { type: "true_false", statement: "After \"demand that\", the verb takes its base form for all persons.", answer: true, explanation: "Yes: 'demand that he resign' (not 'resigns')." }
      ]
    },

    "x3-c2-grammar-discourse": {
      lessonId: "x3-c2-grammar-discourse", level: "C2", track: "Grammar", topic: "grammar", skill: "grammar",
      title: "Discourse markers and nuance", xpReward: 78, mascotState: "explaining",
      explanation: {
        body: "At C2 nuance matters: markers like 'admittedly' (I accept this is true), 'conversely' (the opposite is also true), 'notwithstanding' (in spite of) and 'arguably' (it could be argued) sharpen your position and make you sound like an expert speaker.",
        examples: [
          { en: "Admittedly, the plan has flaws." },
          { en: "It is, arguably, the best solution." }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Match each marker with its nuance.", pairs: [{"l":"admittedly","r":"I accept this is true"},{"l":"conversely","r":"in the opposite way"},{"l":"arguably","r":"it could be argued"},{"l":"notwithstanding","r":"in spite of"},{"l":"by and large","r":"in general"},{"l":"nonetheless","r":"however, even so"}] },
        { type: "multiple_choice", question: "Choose: \"___, the policy did reduce costs, though not by much.\"", options: ["Admittedly", "Conversely", "Notwithstanding"], correctIndex: 0, explanation: "Admittedly concedes a point." },
        { type: "fill_blank", sentence: "Sales rose in the north; ___, they fell in the south.", answers: ["conversely"], hint: "It signals the opposite.", explanation: "conversely = in the opposite way." },
        { type: "multiple_choice", question: "\"Arguably the finest novel of the decade\" suggests the claim is...", options: ["an undisputed fact", "a defensible opinion", "definitely false"], correctIndex: 1, explanation: "arguably hedges: it is a defensible opinion." },
        { type: "translate", prompt: "Rewrite with 'Notwithstanding' or 'Despite': The project was criticised, but it went ahead.", answers: ["notwithstanding the criticism the project went ahead","despite the criticism the project went ahead","notwithstanding the criticism, the project went ahead","despite the criticism, the project went ahead","in spite of the criticism the project went ahead"], explanation: "Notwithstanding the criticism, the project went ahead." },
        { type: "true_false", statement: "\"Arguably\" softens a claim into a defensible opinion.", answer: true, explanation: "Yes, it signals that something can be defended, without stating it as fact." }
      ]
    },

    "x3-c2-read-philosophy": {
      lessonId: "x3-c2-read-philosophy", level: "C2", track: "Reading", topic: "society", skill: "reading",
      title: "Reading: The paradox of choice", xpReward: 78, mascotState: "explaining",
      explanation: {
        body: "A dense C2 reading on the paradox of choice. An argumentative text with abstract vocabulary. Identify the thesis, the counterintuitive claim, the evidence and the nuance. Watch for irony and concessions.",
        examples: [
          { en: "counterintuitive findings" },
          { en: "diminishing returns" }
        ]
      },
      exercises: [
        { type: "reading", title: "When more is less",
          passage: "We tend to assume that more choice is always better: the wider the range of options, the more likely we are to find what suits us, and the freer we feel. Yet a body of research in psychology suggests a more counterintuitive conclusion. Beyond a certain point, an abundance of options can paralyse rather than liberate.\n\nWhen confronted with dozens of nearly identical alternatives, consumers often experience what has been termed 'choice overload': they postpone deciding, feel less satisfied with whatever they eventually pick, and are more prone to regret. This is not an argument for abolishing choice, but a reminder that freedom and well-being do not increase indefinitely with the number of options. There are, it seems, diminishing returns even to liberty.",
          questions: [
            { q: "Which statement best captures the author's thesis?", options: ["More choice always makes people happier.", "Choice should be abolished entirely.", "Beyond a point, more choice can reduce satisfaction and well-being."], correctIndex: 2, explanation: "The thesis is that too many options can reduce well-being." },
            { q: "The word \"counterintuitive\" signals that the conclusion...", options: ["confirms what we expect", "goes against our usual assumptions", "is impossible to prove"], correctIndex: 1, explanation: "counterintuitive = against what you would naturally expect." },
            { q: "What is 'choice overload' according to the text?", options: ["a state where too many options hinder decision and satisfaction", "the joy of having many options", "a lack of any options at all"], correctIndex: 0, explanation: "It is the paralysis and lower satisfaction caused by too many options." },
            { q: "The phrase \"diminishing returns even to liberty\" implies that...", options: ["liberty always increases happiness", "liberty has no value", "the benefits of more freedom eventually level off or decline"], correctIndex: 2, explanation: "The extra benefits of more freedom get smaller." }
          ] },
        { type: "matching", instruction: "Match each word with its meaning.", pairs: [{"l":"counterintuitive","r":"the opposite of what you'd expect"},{"l":"to paralyse","r":"to make unable to act"},{"l":"abundance","r":"a very large quantity"},{"l":"prone to","r":"likely to do or suffer"}] },
        { type: "true_false", statement: "The author argues that choice should be completely abolished.", answer: false, explanation: "It clarifies: 'This is not an argument for abolishing choice.'" },
        {
          type: "multiple_choice", question: "\"Prone to regret\" means...", options: ["likely to feel regret", "unable to feel regret", "protected from regret"], correctIndex: 0,
          explanation: "prone to = likely to suffer from."
        },
        {
          type: "fill_blank", sentence: "Beyond a certain point, an abundance of options can ___ rather than liberate.", answers: ["paralyse", "paralyze"], hint: "The opposite of 'liberate' here.",
          explanation: "...can paralyse rather than liberate."
        },
        {
          type: "listening",
          text: "This is not an argument for abolishing choice, but a reminder that freedom does not increase indefinitely.", question: "What is the speaker's position on choice?",
          options: ["Choice is good, but more is not always better", "Choice should be abolished", "More choice always means more freedom"], correctIndex: 0
        }
      ]
    },

    "x3-c2-use-register": {
      lessonId: "x3-c2-use-register", level: "C2", track: "Practical English", topic: "style", skill: "use",
      title: "Register and style: formal vs informal", xpReward: 78, mascotState: "explaining",
      explanation: {
        body: "A C2 speaker adapts register to the context. Formal English avoids contractions and phrasal verbs, prefers Latin-based words ('purchase' vs 'buy', 'require' vs 'need') and the passive voice. Informal English is direct and colloquial. The key is consistency: don't mix registers.",
        examples: [
          { en: "Formal: We regret to inform you that..." },
          { en: "Informal: Sorry, but..." }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Match each informal word with its formal equivalent.", pairs: [
          { l: "buy", r: "purchase" }, { l: "need", r: "require" },
          { l: "get", r: "obtain" }, { l: "help", r: "assist" },
          { l: "ask for", r: "request" }, { l: "find out", r: "ascertain" } ] },
        { type: "categorize", instruction: "Formal or informal register?", buckets: [
          { id: "f", label: "Formal" }, { id: "i", label: "Informal" } ], items: [
          { t: "Furthermore,", bucket: "f" }, { t: "Anyway,", bucket: "i" },
          { t: "We regret to inform you", bucket: "f" }, { t: "Gonna grab a coffee", bucket: "i" },
          { t: "Should you require assistance", bucket: "f" }, { t: "No worries", bucket: "i" } ] },
        { type: "multiple_choice", question: "Choose the more formal option.", options: ["I want to ask for a refund.", "I would like to request a refund.", "Gimme my money back."], correctIndex: 1, explanation: "'would like to request' is the most formal." },
        { type: "find_error", question: "Find the register inconsistency.",
          segments: ["We ", { u: "regret" }, " to ", { u: "inform" }, " you that we ", { u: "can't" }, " ", { u: "help" }, "."],
          correctIndex: 2, correction: "cannot / are unable to (avoid contractions in formal English)",
          explanation: "In formal register we avoid the contraction 'can't': use 'cannot' or 'are unable to'." },
        { type: "translate", prompt: "Rewrite formally: \"We need to get your details.\"", answers: ["we require your details", "we are required to obtain your details", "we need to obtain your details"], explanation: "For example: 'We require your details.'" }
      ]
    },

    /* ============================================================
     * ===== CLASES DE PALABRAS: preposiciones · conjunciones ·====
     * ===== interjecciones (en el nivel adecuado a cada una) =====
     * ============================================================ */

    /* ---------- Preposiciones de lugar (A1) ---------- */
    "x3-a1-grammar-prep-place": {
      lessonId: "x3-a1-grammar-prep-place", level: "A1", track: "Gramática", topic: "grammar", skill: "grammar",
      title: "Preposiciones de lugar", xpReward: 34, mascotState: "explaining",
      explanation: {
        body: "Las preposiciones de lugar dicen DÓNDE está algo: in (dentro), on (sobre), under (debajo), next to (al lado de), behind (detrás), in front of (delante), between (entre). Van antes del sustantivo: 'The cat is under the table'.",
        examples: [
          { en: "The book is on the table.", es: "El libro está sobre la mesa." },
          { en: "The ball is under the chair.", es: "La pelota está debajo de la silla." },
          { en: "The shop is next to the bank.", es: "La tienda está al lado del banco." }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Une la preposición con su traducción.", pairs: [
          { l: "in", r: "dentro de" }, { l: "on", r: "sobre" },
          { l: "under", r: "debajo de" }, { l: "behind", r: "detrás de" },
          { l: "next to", r: "al lado de" }, { l: "between", r: "entre" } ] },
        { type: "multiple_choice", question: "Choose: \"The keys are ___ the bag.\" (inside)", options: ["in", "on", "under"], correctIndex: 0, explanation: "'in' = dentro de." },
        { type: "multiple_choice", question: "Choose: \"The cat is sleeping ___ the bed.\" (under it)", options: ["on", "under", "next to"], correctIndex: 1, explanation: "'under' = debajo de." },
        { type: "find_error", question: "Encuentra el error.",
          segments: ["The ", { u: "lamp" }, " ", { u: "is" }, " ", { u: "in" }, " the ", { u: "table" }, "."],
          correctIndex: 2, correction: "on (sobre la mesa)",
          explanation: "Algo encima de una superficie va con 'on': 'on the table'." },
        { type: "fill_blank", sentence: "The bank is ___ to the supermarket.", answers: ["next"], hint: "Al lado de = ___ to.", explanation: "next to = al lado de." },
        { type: "translate", prompt: "Traduce: \"El perro está detrás del coche.\"", answers: ["the dog is behind the car"], explanation: "The dog is behind the car." }
      ]
    },

    /* ---------- Interjecciones básicas (A1) ---------- */
    "x3-a1-vocab-interjections": {
      lessonId: "x3-a1-vocab-interjections", level: "A1", track: "Vocabulario", topic: "social", skill: "vocab",
      title: "Interjecciones: expresar emociones", xpReward: 32, mascotState: "explaining",
      explanation: {
        body: "Las interjecciones son palabras cortas que expresan una emoción o reacción: Wow! (asombro), Ouch! (dolor), Oops! (error pequeño), Yuck! (asco), Hooray! (alegría), Shh! (silencio). Suelen ir solas y con signo de exclamación.",
        examples: [
          { en: "Wow! That's amazing!", es: "¡Guau! ¡Es increíble!" },
          { en: "Ouch! That hurts!", es: "¡Ay! ¡Eso duele!" },
          { en: "Oops! I dropped it.", es: "¡Uy! Se me cayó." }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Une la interjección con la emoción que expresa.", pairs: [
          { l: "Wow!", r: "asombro" }, { l: "Ouch!", r: "dolor" },
          { l: "Oops!", r: "error pequeño" }, { l: "Yuck!", r: "asco" },
          { l: "Hooray!", r: "alegría" }, { l: "Shh!", r: "silencio" } ] },
        { type: "multiple_choice", question: "You hit your finger. You say:", options: ["Hooray!", "Yuck!", "Ouch!"], correctIndex: 2, explanation: "'Ouch!' expresa dolor (¡Ay!)." },
        { type: "multiple_choice", question: "You see something disgusting. You say:", options: ["Yuck!", "Wow!", "Shh!"], correctIndex: 0, explanation: "'Yuck!' expresa asco (¡Puaj!)." },
        { type: "fill_blank", sentence: "___! I forgot my keys. (small mistake)", answers: ["oops", "oops!"], hint: "Reacción a un error pequeño.", explanation: "Oops! = ¡Uy!" },
        { type: "categorize", instruction: "¿Emoción positiva o negativa?", buckets: [
          { id: "p", label: "Positive" }, { id: "n", label: "Negative" } ], items: [
          { t: "Wow!", bucket: "p" }, { t: "Ouch!", bucket: "n" },
          { t: "Hooray!", bucket: "p" }, { t: "Yuck!", bucket: "n" } ] },
        { type: "true_false", statement: "Interjections often express a sudden feeling or reaction.", answer: true, explanation: "Sí: sorpresa, dolor, alegría, asco, etc." }
      ]
    },

    /* ---------- Preposiciones de tiempo (A2) ---------- */
    "x3-a2-grammar-prep-time": {
      lessonId: "x3-a2-grammar-prep-time", level: "A2", track: "Gramática", topic: "grammar", skill: "grammar",
      title: "Preposiciones de tiempo: in / on / at", xpReward: 44, mascotState: "explaining",
      explanation: {
        body: "Tres preposiciones para el tiempo: AT para horas y momentos puntuales (at 6 o'clock, at night), ON para días y fechas (on Monday, on 5 May), IN para periodos largos: meses, estaciones, años (in July, in summer, in 2025). Regla rápida: at < on < in (de lo más concreto a lo más amplio).",
        examples: [
          { en: "The class starts at nine o'clock.", es: "La clase empieza a las nueve." },
          { en: "We meet on Friday.", es: "Nos vemos el viernes." },
          { en: "My birthday is in May.", es: "Mi cumpleaños es en mayo." }
        ]
      },
      exercises: [
        { type: "categorize", instruction: "¿Con qué preposición de tiempo va?", buckets: [
          { id: "at", label: "at" }, { id: "on", label: "on" }, { id: "in", label: "in" } ], items: [
          { t: "7 o'clock", bucket: "at" }, { t: "Monday", bucket: "on" },
          { t: "summer", bucket: "in" }, { t: "night", bucket: "at" },
          { t: "my birthday", bucket: "on" }, { t: "2025", bucket: "in" } ] },
        { type: "multiple_choice", question: "Choose: \"I get up ___ 6 o'clock.\"", options: ["in", "on", "at"], correctIndex: 2, explanation: "Con horas usamos 'at'." },
        { type: "multiple_choice", question: "Choose: \"We have a party ___ Saturday.\"", options: ["at", "on", "in"], correctIndex: 1, explanation: "Con días usamos 'on'." },
        { type: "find_error", question: "Encuentra el error.",
          segments: ["My ", { u: "holiday" }, " ", { u: "is" }, " ", { u: "on" }, " ", { u: "August" }, "."],
          correctIndex: 2, correction: "in (con meses: in August)",
          explanation: "Con meses usamos 'in': 'in August'." },
        { type: "fill_blank", sentence: "The shop opens ___ the morning.", answers: ["in"], hint: "in the morning/afternoon/evening.", explanation: "Partes del día: in the morning (excepto 'at night')." },
        { type: "translate", prompt: "Traduce: \"La reunión es el lunes a las diez.\"", answers: ["the meeting is on monday at ten", "the meeting is on monday at ten o'clock"], explanation: "The meeting is on Monday at ten." }
      ]
    },

    /* ---------- Conjunciones coordinantes (A2) ---------- */
    "x3-a2-grammar-conjunctions": {
      lessonId: "x3-a2-grammar-conjunctions", level: "A2", track: "Gramática", topic: "grammar", skill: "grammar",
      title: "Conjunciones: and, but, or, so, because", xpReward: 44, mascotState: "explaining",
      explanation: {
        body: "Las conjunciones unen ideas. AND añade, BUT contrasta, OR da alternativa, SO expresa consecuencia, BECAUSE da la causa. Ejemplo: 'I was tired, so I went to bed' / 'I went to bed because I was tired'. (so = por eso; because = porque.)",
        examples: [
          { en: "I like tea and coffee.", es: "Me gusta el té y el café." },
          { en: "It's cheap but good.", es: "Es barato pero bueno." },
          { en: "I stayed home because it was raining.", es: "Me quedé en casa porque llovía." }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Une la conjunción con su función.", pairs: [
          { l: "and", r: "añadir" }, { l: "but", r: "contrastar" },
          { l: "or", r: "alternativa" }, { l: "so", r: "consecuencia" },
          { l: "because", r: "causa" } ] },
        { type: "multiple_choice", question: "Choose: \"She is small ___ very strong.\"", options: ["and", "but", "or"], correctIndex: 1, explanation: "Hay contraste (pequeña pero fuerte): 'but'." },
        { type: "multiple_choice", question: "Choose: \"I was hungry, ___ I made a sandwich.\"", options: ["so", "because", "but"], correctIndex: 0, explanation: "Consecuencia: tenía hambre, por eso (so) hice un sándwich." },
        { type: "fill_blank", sentence: "We didn't go out ___ it was raining.", answers: ["because"], hint: "Indica la causa.", explanation: "because = porque (introduce la causa)." },
        { type: "find_error", question: "Encuentra el error.",
          segments: ["I ", { u: "stayed" }, " ", { u: "home" }, " ", { u: "so" }, " I was ", { u: "tired" }, "."],
          correctIndex: 2, correction: "because (la causa va con 'because')",
          explanation: "La causa (estar cansado) va con 'because': 'I stayed home because I was tired'." },
        { type: "translate", prompt: "Traduce: \"¿Quieres té o café?\"", answers: ["do you want tea or coffee", "would you like tea or coffee", "do you want tea or coffee?"], explanation: "Do you want tea or coffee?" }
      ]
    },

    /* ---------- Conjunciones subordinantes (B1) ---------- */
    "x3-b1-grammar-conjunctions": {
      lessonId: "x3-b1-grammar-conjunctions", level: "B1", track: "Grammar", topic: "grammar", skill: "grammar",
      title: "Subordinating conjunctions", xpReward: 54, mascotState: "explaining",
      explanation: {
        body: "Subordinating conjunctions connect a main clause with a subordinate clause: although/though (contrast), while (at the same time / contrast), unless (if not), since/as (because), so that (purpose), as soon as (immediately after). They can go at the start (with a comma) or in the middle: 'Although it was late, she worked' = 'She worked although it was late'.",
        examples: [
          { en: "Although it was raining, we went out." },
          { en: "I'll wait unless you tell me to leave." },
          { en: "Call me as soon as you arrive." }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Match each conjunction with its meaning.", pairs: [{"l":"although","r":"contrast: even if it's true"},{"l":"unless","r":"except if; if not"},{"l":"while","r":"during the time that"},{"l":"since","r":"because"},{"l":"so that","r":"with the purpose that"},{"l":"as soon as","r":"immediately after"}] },
        { type: "multiple_choice", question: "Choose: \"___ he was tired, he finished the report.\"", options: ["Although", "So that", "Unless"], correctIndex: 0, explanation: "Contrast: even though he was tired (Although)." },
        { type: "multiple_choice", question: "Choose: \"You'll miss the bus ___ you hurry.\"", options: ["since", "although", "unless"], correctIndex: 2, explanation: "unless = if not (a negative condition)." },
        { type: "fill_blank", sentence: "She spoke slowly ___ everyone could understand.", answers: ["so that"], hint: "It shows purpose.", explanation: "so that = with the purpose that." },
        { type: "find_error", question: "Find the mistake.",
          segments: ["Although ", { u: "it" }, " ", { u: "was" }, " expensive, ", { u: "but" }, " he ", { u: "bought" }, " it."],
          correctIndex: 2, correction: "(remove 'but')",
          explanation: "With 'although' we do NOT use 'but' in the same sentence: either 'Although..., he bought it' or 'It was expensive, but he bought it'." },
        { type: "translate", prompt: "Join with 'As soon as': I'll finish. Then I'll call you immediately.", answers: ["as soon as i finish i'll call you", "as soon as i finish, i'll call you", "as soon as i finish i will call you"], explanation: "As soon as I finish, I'll call you." }
      ]
    },

    /* ---------- Preposiciones dependientes (B1) ---------- */
    "x3-b1-grammar-dependent-prep": {
      lessonId: "x3-b1-grammar-dependent-prep", level: "B1", track: "Grammar", topic: "grammar", skill: "grammar",
      title: "Dependent prepositions (good at, interested in...)", xpReward: 54, mascotState: "explaining",
      explanation: {
        body: "Many adjectives and verbs are ALWAYS followed by a fixed preposition that you need to memorise: good at, interested in, afraid of, depend on, listen to, look for. If a verb follows, use the -ing form: 'interested in learning'.",
        examples: [
          { en: "She is good at maths." },
          { en: "I'm interested in learning Japanese." },
          { en: "It depends on the weather." }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Match each expression with the correct preposition.", pairs: [
          { l: "good ___ (skilled)", r: "at" }, { l: "interested ___", r: "in" },
          { l: "afraid ___", r: "of" }, { l: "depend ___", r: "on" },
          { l: "listen ___", r: "to" }, {"l":"worried ___","r":"about"} ] },
        { type: "multiple_choice", question: "Choose: \"He is afraid ___ spiders.\"", options: ["of", "to", "at"], correctIndex: 0, explanation: "afraid of = frightened by." },
        { type: "multiple_choice", question: "Choose: \"I'm interested ___ history.\"", options: ["at", "on", "in"], correctIndex: 2, explanation: "interested in = wanting to know more about." },
        { type: "fill_blank", sentence: "Are you good ___ playing the guitar?", answers: ["at"], hint: "good ___ (ability).", explanation: "good at + -ing = able to do something well." },
        { type: "find_error", question: "Find the mistake.",
          segments: ["Success ", { u: "depends" }, " ", { u: "of" }, " ", { u: "hard" }, " ", { u: "work" }, "."],
          correctIndex: 1, correction: "on (depend on)",
          explanation: "It's 'depend ON', not 'depend of'." },
        { type: "translate", prompt: "Rewrite with 'look for' (present continuous): I'm trying to find my keys.", answers: ["i'm looking for my keys", "i am looking for my keys"], explanation: "I'm looking for my keys (look for = try to find)." }
      ]
    },

    /* ---------- Interjecciones de reacción (B1) ---------- */
    "x3-b1-vocab-interjections2": {
      lessonId: "x3-b1-vocab-interjections2", level: "B1", track: "Vocabulary", topic: "social", skill: "vocab",
      title: "Interjections in conversation", xpReward: 52, mascotState: "explaining",
      explanation: {
        body: "In real conversation we use interjections to react naturally: No way! (I can't believe it!), You're kidding! (Are you joking?), Phew! (relief), Ugh! (annoyance or disgust), Yikes! (fright), Oh well (acceptance), Well... (to hesitate or start). They sound very natural and native-like.",
        examples: [
          { en: "No way! I can't believe it!" },
          { en: "Phew! That was close." },
          { en: "Oh well, maybe next time." }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Match each interjection with its meaning.", pairs: [{"l":"No way!","r":"I can't believe it!"},{"l":"Phew!","r":"relief"},{"l":"Yikes!","r":"fright"},{"l":"Ugh!","r":"annoyance or disgust"},{"l":"Oh well","r":"accepting a bad situation"},{"l":"You're kidding!","r":"Are you joking?"}] },
        { type: "multiple_choice", question: "You just avoided an accident. You say:", options: ["Hooray!", "Phew!", "Ugh!"], correctIndex: 1, explanation: "'Phew!' expresses relief." },
        { type: "multiple_choice", question: "A friend shares shocking news. You react:", options: ["Oh well.", "Shh!", "No way!"], correctIndex: 2, explanation: "'No way!' expresses surprise or disbelief." },
        { type: "fill_blank", sentence: "___ well, we can try again tomorrow.", answers: ["oh"], hint: "Resignation: '___ well'.", explanation: "Oh well = accepting something you can't change." },
        { type: "categorize", instruction: "A reaction of surprise or of relief/resignation?", buckets: [
          { id: "s", label: "Surprise" }, { id: "r", label: "Relief/Resignation" } ], items: [
          { t: "No way!", bucket: "s" }, { t: "Phew!", bucket: "r" },
          { t: "You're kidding!", bucket: "s" }, { t: "Oh well", bucket: "r" } ] },
        { type: "true_false", statement: "Interjections like \"No way!\" make spoken English sound more natural.", answer: true, explanation: "Yes, they are very typical of everyday speech." }
      ]
    },

    /* ============================================================
     * ===== TODAS LAS CLASES GRAMATICALES (partes de la oración) =
     * ===== sustantivos · pronombres · adjetivos · adverbios ·  ==
     * ===== artículos/determinantes · cuantificadores · verbos  ==
     * ============================================================ */

    /* ---------- SUSTANTIVOS: plurales (A1) ---------- */
    "x3-a1-grammar-nouns-plural": {
      lessonId: "x3-a1-grammar-nouns-plural", level: "A1", track: "Gramática", topic: "grammar", skill: "grammar",
      title: "Sustantivos: el plural", xpReward: 34, mascotState: "explaining",
      explanation: {
        body: "El plural regular añade -s (book → books). Si la palabra acaba en -s, -ss, -sh, -ch, -x se añade -es (box → boxes). Si acaba en consonante + y, se cambia a -ies (city → cities). Hay plurales irregulares: man → men, woman → women, child → children, foot → feet.",
        examples: [
          { en: "one car, two cars", es: "un coche, dos coches" },
          { en: "one box, two boxes", es: "una caja, dos cajas" },
          { en: "one child, two children", es: "un niño, dos niños" }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "What is the plural of \"box\"?", options: ["boxs", "boxes", "boxies"], correctIndex: 1, explanation: "Tras -x se añade -es: boxes." },
        { type: "multiple_choice", question: "What is the plural of \"city\"?", options: ["cities", "citys", "cityes"], correctIndex: 0, explanation: "Consonante + y → -ies: cities." },
        { type: "categorize", instruction: "¿Plural regular o irregular?", buckets: [
          { id: "r", label: "Regular" }, { id: "i", label: "Irregular" } ], items: [
          { t: "dogs", bucket: "r" }, { t: "children", bucket: "i" },
          { t: "tables", bucket: "r" }, { t: "feet", bucket: "i" },
          { t: "books", bucket: "r" }, { t: "men", bucket: "i" } ] },
        { type: "fill_blank", sentence: "I have two ___ (woman) in my team.", answers: ["women"], hint: "Plural irregular de 'woman'.", explanation: "woman → women." },
        { type: "find_error", question: "Encuentra el error.",
          segments: ["There ", { u: "are" }, " ", { u: "three" }, " ", { u: "childs" }, " in the ", { u: "park" }, "."],
          correctIndex: 2, correction: "children (plural irregular)",
          explanation: "El plural de 'child' es 'children', no 'childs'." },
        { type: "translate", prompt: "Traduce: \"Tengo cinco libros.\"", answers: ["i have five books"], explanation: "I have five books." }
      ]
    },

    /* ---------- SUSTANTIVOS: contables/incontables (A2) ---------- */
    "x3-a2-grammar-nouns-countable": {
      lessonId: "x3-a2-grammar-nouns-countable", level: "A2", track: "Gramática", topic: "grammar", skill: "grammar",
      title: "Sustantivos contables e incontables", xpReward: 44, mascotState: "explaining",
      explanation: {
        body: "Los contables se pueden contar y tienen plural (apple → apples). Los incontables NO se cuentan ni llevan plural ni 'a/an' (water, money, rice, information). Para cantidades de incontables usamos 'some' o medidas: 'a glass of water', 'a piece of advice'. Con contables: many; con incontables: much.",
        examples: [
          { en: "I'd like some water.", es: "Quisiera un poco de agua." },
          { en: "How much money do you have?", es: "¿Cuánto dinero tienes?" },
          { en: "There are many apples.", es: "Hay muchas manzanas." }
        ]
      },
      exercises: [
        { type: "categorize", instruction: "¿Contable o incontable?", buckets: [
          { id: "c", label: "Countable" }, { id: "u", label: "Uncountable" } ], items: [
          { t: "apple", bucket: "c" }, { t: "water", bucket: "u" },
          { t: "book", bucket: "c" }, { t: "money", bucket: "u" },
          { t: "chair", bucket: "c" }, { t: "rice", bucket: "u" } ] },
        { type: "multiple_choice", question: "Choose: \"How ___ sugar do you want?\"", options: ["many", "much", "any"], correctIndex: 1, explanation: "'sugar' es incontable → much." },
        { type: "multiple_choice", question: "Choose: \"There aren't ___ chairs.\"", options: ["many", "a", "much"], correctIndex: 0, explanation: "'chairs' es contable plural → many." },
        { type: "find_error", question: "Encuentra el error.",
          segments: ["I ", { u: "need" }, " ", { u: "an" }, " ", { u: "information" }, " ", { u: "please" }, "."],
          correctIndex: 1, correction: "(quita 'an') some information",
          explanation: "'information' es incontable: no lleva 'a/an'. Di 'some information'." },
        { type: "fill_blank", sentence: "Can I have a ___ of water, please?", answers: ["glass", "bottle"], hint: "Un recipiente para medir incontables.", explanation: "a glass/bottle of water." },
        { type: "true_false", statement: "Uncountable nouns usually have no plural form.", answer: true, explanation: "Correcto: no se dice 'waters', 'moneys', etc." }
      ]
    },

    /* ---------- SUSTANTIVOS: el genitivo sajón (A2) ---------- */
    "x3-a2-grammar-possessive-s": {
      lessonId: "x3-a2-grammar-possessive-s", level: "A2", track: "Gramática", topic: "grammar", skill: "grammar",
      title: "El posesivo: el genitivo sajón ('s)", xpReward: 42, mascotState: "explaining",
      explanation: {
        body: "Para indicar posesión con personas usamos 's: 'Ana's car' (el coche de Ana). Con plurales que ya acaban en -s solo se añade el apóstrofo: 'my parents' house'. Con cosas se suele preferir 'of': 'the door of the car'. No confundas: 'It's' = it is; 'its' = su (posesivo).",
        examples: [
          { en: "This is Tom's bike.", es: "Esta es la bici de Tom." },
          { en: "The students' books are here.", es: "Los libros de los estudiantes están aquí." }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "How do you say \"the dog of Maria\"?", options: ["the Maria's dog", "Maria dog's", "Maria's dog"], correctIndex: 2, explanation: "Persona + 's + objeto: Maria's dog." },
        { type: "multiple_choice", question: "Plural ending in -s: \"my friends ___ party\".", options: ["'s", "'", "s'"], correctIndex: 1, explanation: "Plural en -s: solo apóstrofo → friends' party." },
        { type: "fill_blank", sentence: "Where is ___ (the office of the manager)?", answers: ["the manager's office"], hint: "persona + 's + cosa.", explanation: "the manager's office." },
        { type: "find_error", question: "Encuentra el error.",
          segments: ["The ", { u: "cat" }, " is ", { u: "playing" }, " with ", { u: "it's" }, " ", { u: "ball" }, "."],
          correctIndex: 2, correction: "its (posesivo, sin apóstrofo)",
          explanation: "'its' (su) es posesivo; 'it's' = it is. Aquí va 'its ball'." },
        { type: "translate", prompt: "Traduce: \"Es la casa de mis padres.\"", answers: ["it's my parents' house", "it is my parents' house", "this is my parents' house"], explanation: "It's my parents' house." }
      ]
    },

    /* ---------- PRONOMBRES: sujeto y objeto (A1) ---------- */
    "x3-a1-grammar-pronouns": {
      lessonId: "x3-a1-grammar-pronouns", level: "A1", track: "Gramática", topic: "grammar", skill: "grammar",
      title: "Pronombres de sujeto y de objeto", xpReward: 34, mascotState: "explaining",
      explanation: {
        body: "Los pronombres de SUJETO hacen la acción y van antes del verbo: I, you, he, she, it, we, they. Los de OBJETO la reciben y van después del verbo o preposición: me, you, him, her, it, us, them. Ejemplo: 'She loves him' (Ella lo quiere).",
        examples: [
          { en: "I see her every day.", es: "La veo cada día." },
          { en: "They help us.", es: "Ellos nos ayudan." },
          { en: "Give it to me.", es: "Dámelo a mí." }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Une el pronombre de sujeto con el de objeto.", pairs: [
          { l: "I", r: "me" }, { l: "he", r: "him" },
          { l: "she", r: "her" }, { l: "we", r: "us" },
          { l: "they", r: "them" } ] },
        { type: "multiple_choice", question: "Choose: \"Can you help ___?\" (a mí)", options: ["my", "I", "me"], correctIndex: 2, explanation: "Tras el verbo va el pronombre objeto: me." },
        { type: "multiple_choice", question: "Choose: \"___ are my friends.\"", options: ["Them", "They", "Their"], correctIndex: 1, explanation: "Sujeto → They." },
        { type: "find_error", question: "Encuentra el error.",
          segments: ["My sister and ", { u: "me" }, " ", { u: "like" }, " ", { u: "pizza" }, " ", { u: "together" }, "."],
          correctIndex: 0, correction: "I (como sujeto: ...and I)",
          explanation: "Como sujeto se dice 'My sister and I', no '...and me'." },
        { type: "fill_blank", sentence: "I don't know that man. Do you know ___?", answers: ["him"], hint: "Pronombre objeto masculino.", explanation: "him = lo/le (objeto)." },
        { type: "translate", prompt: "Traduce: \"Nosotros los conocemos.\"", answers: ["we know them"], explanation: "We know them." }
      ]
    },

    /* ---------- PRONOMBRES: posesivos (A2) ---------- */
    "x3-a2-grammar-possessives": {
      lessonId: "x3-a2-grammar-possessives", level: "A2", track: "Gramática", topic: "grammar", skill: "grammar",
      title: "Adjetivos y pronombres posesivos", xpReward: 42, mascotState: "explaining",
      explanation: {
        body: "Los ADJETIVOS posesivos van antes del sustantivo: my, your, his, her, its, our, their ('my car'). Los PRONOMBRES posesivos van solos, sin sustantivo: mine, yours, his, hers, ours, theirs ('It's mine'). Ejemplo: 'This is my book and that one is yours'.",
        examples: [
          { en: "This is my house.", es: "Esta es mi casa." },
          { en: "The blue car is hers.", es: "El coche azul es suyo (de ella)." }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Une el adjetivo posesivo con su pronombre.", pairs: [
          { l: "my", r: "mine" }, { l: "your", r: "yours" },
          { l: "her", r: "hers" }, { l: "our", r: "ours" },
          { l: "their", r: "theirs" } ] },
        { type: "multiple_choice", question: "Choose: \"This pen is ___.\" (de mí, solo)", options: ["mine", "my", "me"], correctIndex: 0, explanation: "Pronombre posesivo (va solo): mine." },
        { type: "multiple_choice", question: "Choose: \"___ house is very big.\"", options: ["Theirs", "Them", "Their"], correctIndex: 2, explanation: "Antes del sustantivo va el adjetivo: Their house." },
        { type: "find_error", question: "Encuentra el error.",
          segments: ["Is ", { u: "this" }, " bag ", { u: "your" }, " or ", { u: "hers" }, "?"],
          correctIndex: 1, correction: "yours (pronombre, va solo)",
          explanation: "Sin sustantivo detrás se usa el pronombre 'yours', no 'your'." },
        { type: "fill_blank", sentence: "We love ___ new flat. (de nosotros)", answers: ["our"], hint: "Adjetivo posesivo, antes del sustantivo.", explanation: "our flat = nuestro piso." },
        { type: "translate", prompt: "Traduce: \"Este es mi coche y aquel es suyo (de ella).\"", answers: ["this is my car and that one is hers", "this is my car and that is hers"], explanation: "This is my car and that one is hers." }
      ]
    },

    /* ---------- PRONOMBRES: reflexivos (B1) ---------- */
    "x3-b1-grammar-reflexive": {
      lessonId: "x3-b1-grammar-reflexive", level: "B1", track: "Grammar", topic: "grammar", skill: "grammar",
      title: "Reflexive pronouns", xpReward: 52, mascotState: "explaining",
      explanation: {
        body: "Reflexive pronouns (myself, yourself, himself, herself, itself, ourselves, yourselves, themselves) are used when the subject and the object are the same person: 'I hurt myself'. Also for emphasis ('I did it myself') and with 'by + reflexive' = alone, without help ('She lives by herself').",
        examples: [
          { en: "He cut himself while cooking." },
          { en: "We enjoyed ourselves at the party." },
          { en: "She did it by herself." }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Match each pronoun with its reflexive form.", pairs: [
          { l: "I", r: "myself" }, { l: "he", r: "himself" },
          { l: "they", r: "themselves" }, { l: "we", r: "ourselves" },
          { l: "you (sing.)", r: "yourself" } ] },
        { type: "multiple_choice", question: "Choose: \"The children dressed ___.\"", options: ["themselves", "theirselves", "themself"], correctIndex: 0, explanation: "Plural: themselves (the correct form)." },
        { type: "fill_blank", sentence: "Be careful with the knife or you'll hurt ___.", answers: ["yourself"], hint: "The reflexive of singular 'you'.", explanation: "yourself." },
        { type: "find_error", question: "Find the mistake.",
          segments: ["She ", { u: "lives" }, " ", { u: "by" }, " ", { u: "herselves" }, " in the ", { u: "city" }, "."],
          correctIndex: 2, correction: "herself (singular)",
          explanation: "The reflexive of 'she' is 'herself' (not 'herselves')." },
        { type: "multiple_choice", question: "\"I made this cake myself\" emphasises that...", options: ["someone helped me", "I did it without help", "I bought it"], correctIndex: 1, explanation: "The reflexive emphasises that I did it without help." },
        { type: "translate", prompt: "Rewrite with 'enjoy' + a reflexive pronoun: We had a great time at the party.", answers: ["we enjoyed ourselves","we really enjoyed ourselves","we enjoyed ourselves at the party","we really enjoyed ourselves at the party"], explanation: "We enjoyed ourselves." }
      ]
    },

    /* ---------- PRONOMBRES: relativos (B1) ---------- */
    "x3-b1-grammar-relative": {
      lessonId: "x3-b1-grammar-relative", level: "B1", track: "Grammar", topic: "grammar", skill: "grammar",
      title: "Relative pronouns (who, which, that...)", xpReward: 54, mascotState: "explaining",
      explanation: {
        body: "Relative pronouns join information about a noun: WHO for people, WHICH for things, THAT for both, WHERE for places, WHOSE for possession. Examples: 'The man who lives next door' / 'the book which I bought' / 'the city where I was born'.",
        examples: [
          { en: "That's the woman who helped me." },
          { en: "This is the house where I grew up." }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Match each relative pronoun with its use.", pairs: [{"l":"who","r":"people"},{"l":"which","r":"things"},{"l":"where","r":"places"},{"l":"whose","r":"possession"}] },
        { type: "multiple_choice", question: "Choose: \"The car ___ is parked outside is mine.\"", options: ["who", "which", "where"], correctIndex: 1, explanation: "For things: which (or that)." },
        { type: "multiple_choice", question: "Choose: \"She's the teacher ___ son is in my class.\"", options: ["who", "which", "whose"], correctIndex: 2, explanation: "Possession: whose (her son = the teacher's son)." },
        { type: "fill_blank", sentence: "This is the restaurant ___ we had dinner.", answers: ["where"], hint: "A relative pronoun for places.", explanation: "where = in which place." },
        { type: "find_error", question: "Find the mistake.",
          segments: ["The ", { u: "people" }, " ", { u: "which" }, " ", { u: "live" }, " ", { u: "here" }, " are kind."],
          correctIndex: 1, correction: "who (people)",
          explanation: "For people we use 'who' (or 'that'), not 'which'." },
        { type: "translate", prompt: "Join with a relative pronoun: That's the man. He helped me.", answers: ["that's the man who helped me","that is the man who helped me","that's the man that helped me","that is the man that helped me"], explanation: "That's the man who helped me." }
      ]
    },

    /* ---------- ADJETIVOS: básicos y posición (A1) ---------- */
    "x3-a1-grammar-adjectives": {
      lessonId: "x3-a1-grammar-adjectives", level: "A1", track: "Gramática", topic: "grammar", skill: "grammar",
      title: "Adjetivos: descripción y posición", xpReward: 34, mascotState: "explaining",
      explanation: {
        body: "Los adjetivos describen al sustantivo y NUNCA cambian (no tienen plural): 'a red car', 'two red cars'. Van ANTES del sustantivo ('a big house') o DESPUÉS del verbo 'be' ('the house is big'). En inglés no se dice 'a car red'.",
        examples: [
          { en: "She has a beautiful garden.", es: "Tiene un jardín bonito." },
          { en: "The dogs are happy.", es: "Los perros están felices." }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Une el adjetivo con su traducción.", pairs: [
          { l: "big", r: "grande" }, { l: "small", r: "pequeño" },
          { l: "happy", r: "feliz" }, { l: "expensive", r: "caro" },
          { l: "old", r: "viejo" }, { l: "beautiful", r: "bonito" } ] },
        { type: "multiple_choice", question: "Choose the correct order.", options: ["a house big", "a big house", "big a house"], correctIndex: 1, explanation: "El adjetivo va antes del sustantivo: a big house." },
        { type: "find_error", question: "Encuentra el error.",
          segments: ["They ", { u: "have" }, " two ", { u: "reds" }, " ", { u: "cars" }, " ", { u: "outside" }, "."],
          correctIndex: 1, correction: "red (los adjetivos no llevan plural)",
          explanation: "Los adjetivos no tienen plural: 'red cars', no 'reds cars'." },
        { type: "word_order", words: ["She", "has", "a", "small", "dog"], correctOrder: ["She", "has", "a", "small", "dog"], hint: "artículo + adjetivo + sustantivo." },
        { type: "fill_blank", sentence: "The film was very ___. I didn't like it. (negativo)", answers: ["boring", "bad", "long"], hint: "Adjetivo negativo.", explanation: "boring/bad = aburrido/malo." },
        { type: "true_false", statement: "In English, adjectives change for plural (e.g. \"bigs\").", answer: false, explanation: "Los adjetivos en inglés son invariables." }
      ]
    },

    /* ---------- ADJETIVOS: comparativos y superlativos (A2) ---------- */
    "x3-a2-grammar-comparatives": {
      lessonId: "x3-a2-grammar-comparatives", level: "A2", track: "Gramática", topic: "grammar", skill: "grammar",
      title: "Comparativos y superlativos", xpReward: 44, mascotState: "explaining",
      explanation: {
        body: "Adjetivos cortos: comparativo -er + than (taller than), superlativo the ___-est (the tallest). Adjetivos largos: more/the most (more interesting, the most interesting). Irregulares: good → better → the best; bad → worse → the worst.",
        examples: [
          { en: "She is taller than me.", es: "Es más alta que yo." },
          { en: "This is the most expensive shop.", es: "Esta es la tienda más cara." },
          { en: "My phone is better than yours.", es: "Mi teléfono es mejor que el tuyo." }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "Comparative of \"big\": \"An elephant is ___ a dog.\"", options: ["bigger than", "more big than", "the biggest"], correctIndex: 0, explanation: "Adjetivo corto: bigger than (se dobla la g)." },
        { type: "multiple_choice", question: "Superlative of \"interesting\":", options: ["more interesting", "the interestingest", "the most interesting"], correctIndex: 2, explanation: "Adjetivo largo: the most interesting." },
        { type: "fill_blank", sentence: "Today is ___ (good) than yesterday.", answers: ["better"], hint: "Comparativo irregular de 'good'.", explanation: "good → better." },
        { type: "find_error", question: "Encuentra el error.",
          segments: ["This ", { u: "book" }, " is ", { u: "more" }, " ", { u: "cheap" }, " ", { u: "than" }, " that one."],
          correctIndex: 1, correction: "cheaper (adjetivo corto)",
          explanation: "'cheap' es corto: 'cheaper than', no 'more cheap'." },
        { type: "categorize", instruction: "¿Comparativo con -er o con 'more'?", buckets: [
          { id: "er", label: "-er" }, { id: "more", label: "more" } ], items: [
          { t: "fast", bucket: "er" }, { t: "beautiful", bucket: "more" },
          { t: "old", bucket: "er" }, { t: "expensive", bucket: "more" } ] },
        { type: "translate", prompt: "Traduce: \"Es el día más feliz de mi vida.\"", answers: ["it's the happiest day of my life", "it is the happiest day of my life"], explanation: "It's the happiest day of my life." }
      ]
    },

    /* ---------- ADJETIVOS: orden (B2) ---------- */
    "x3-b2-grammar-adjective-order": {
      lessonId: "x3-b2-grammar-adjective-order", level: "B2", track: "Grammar", topic: "grammar", skill: "grammar",
      title: "The order of adjectives", xpReward: 60, mascotState: "explaining",
      explanation: {
        body: "When there are several adjectives before a noun, they follow a fixed order: Opinion → Size → Age → Shape → Colour → Origin → Material → Purpose. Example: 'a lovely small old round red Italian wooden table'. We don't usually use more than three in a row.",
        examples: [
          { en: "a beautiful old wooden table" },
          { en: "a small black leather bag" }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "Choose the natural order.", options: ["a big red car", "a car big red", "a red big car"], correctIndex: 0, explanation: "Size before colour: big (size) + red (colour)." },
        { type: "multiple_choice", question: "Choose the natural order.", options: ["an old lovely house", "a lovely old house", "a house lovely old"], correctIndex: 1, explanation: "Opinion (lovely) before age (old)." },
        { type: "word_order", words: ["a", "small", "black", "bag"], correctOrder: ["a", "small", "black", "bag"], hint: "size + colour + noun." },
        { type: "find_error", question: "Find the word-order mistake.",
          segments: ["She ", { u: "bought" }, " a ", { u: "Italian" }, " ", { u: "beautiful" }, " ", { u: "scarf" }, "."],
          correctIndex: 1, correction: "beautiful Italian (opinion before origin)",
          explanation: "Opinion goes before origin: 'a beautiful Italian scarf'." },
        { type: "fill_blank", sentence: "Order: a ___ (round / nice / wooden) bowl.", answers: ["nice round wooden", "a nice round wooden"], hint: "Opinion → shape → material.", explanation: "a nice round wooden bowl." },
        { type: "true_false", statement: "Opinion adjectives usually come before fact adjectives (size, colour...).", answer: true, explanation: "Yes: opinion first, then the objective facts." }
      ]
    },

    /* ---------- ADVERBIOS: de modo y formación (A2) ---------- */
    "x3-a2-grammar-adverbs-manner": {
      lessonId: "x3-a2-grammar-adverbs-manner", level: "A2", track: "Gramática", topic: "grammar", skill: "grammar",
      title: "Adverbios de modo (-ly)", xpReward: 42, mascotState: "explaining",
      explanation: {
        body: "Los adverbios de modo dicen CÓMO se hace algo y suelen formarse con adjetivo + -ly: slow → slowly, careful → carefully. Si acaba en -y, pasa a -ily (happy → happily). Cuidado con los irregulares: good → well; fast → fast; hard → hard. El adverbio modifica al verbo, no al sustantivo.",
        examples: [
          { en: "She speaks English fluently.", es: "Habla inglés con fluidez." },
          { en: "He drives carefully.", es: "Conduce con cuidado." },
          { en: "They sing well.", es: "Cantan bien." }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "Adverb of \"careful\":", options: ["carefuly", "carefully", "carefulely"], correctIndex: 1, explanation: "careful + -ly = carefully." },
        { type: "multiple_choice", question: "Adverb of \"good\":", options: ["goodly", "gooder", "well"], correctIndex: 2, explanation: "Irregular: good → well." },
        { type: "fill_blank", sentence: "Please speak ___ (slow); I don't understand.", answers: ["slowly"], hint: "slow + -ly.", explanation: "slowly = despacio." },
        { type: "find_error", question: "Encuentra el error.",
          segments: ["She ", { u: "sings" }, " ", { u: "very" }, " ", { u: "good" }, " ", { u: "today" }, "."],
          correctIndex: 2, correction: "well (adverbio)",
          explanation: "Tras el verbo va el adverbio 'well', no el adjetivo 'good'." },
        { type: "categorize", instruction: "¿Adjetivo o adverbio?", buckets: [
          { id: "adj", label: "Adjective" }, { id: "adv", label: "Adverb" } ], items: [
          { t: "quick", bucket: "adj" }, { t: "quickly", bucket: "adv" },
          { t: "happy", bucket: "adj" }, { t: "carefully", bucket: "adv" } ] },
        { type: "translate", prompt: "Traduce: \"Él trabaja muy duro.\"", answers: ["he works very hard"], explanation: "He works very hard ('hard' es adverbio, no 'hardly')." }
      ]
    },

    /* ---------- ADVERBIOS: tipos (B1) ---------- */
    "x3-b1-grammar-adverbs-types": {
      lessonId: "x3-b1-grammar-adverbs-types", level: "B1", track: "Grammar", topic: "grammar", skill: "grammar",
      title: "Types of adverbs and their position", xpReward: 52, mascotState: "explaining",
      explanation: {
        body: "There are adverbs of manner (quickly), place (here, outside), time (yesterday, soon), frequency (always, often) and degree (very, quite, too). Usual order at the end: manner + place + time ('She sang beautifully at the theatre last night'). Degree adverbs go before the adjective or adverb they modify (very tired, too fast).",
        examples: [
          { en: "He ran quickly to the station this morning." },
          { en: "The film was quite good." }
        ]
      },
      exercises: [
        { type: "categorize", instruction: "What type of adverb is it?", buckets: [
          { id: "p", label: "Place" }, { id: "t", label: "Time" }, { id: "d", label: "Degree" } ], items: [
          { t: "here", bucket: "p" }, { t: "yesterday", bucket: "t" },
          { t: "very", bucket: "d" }, { t: "outside", bucket: "p" },
          { t: "soon", bucket: "t" }, { t: "too", bucket: "d" } ] },
        { type: "multiple_choice", question: "Choose the natural order (manner-place-time).", options: ["She worked yesterday hard at home.", "She worked hard at home yesterday.", "She worked at home yesterday hard."], correctIndex: 1, explanation: "manner (hard) + place (at home) + time (yesterday)." },
        { type: "multiple_choice", question: "Choose: \"This coffee is ___ hot to drink.\"", options: ["too", "very much", "enough"], correctIndex: 0, explanation: "'too + adjective' = more than is good (negative meaning)." },
        { type: "fill_blank", sentence: "I'm ___ tired to go out tonight. (excessively)", answers: ["too"], hint: "A degree adverb: more than is acceptable.", explanation: "too tired = so tired that I can't do it." },
        { type: "find_error", question: "Find the word-order mistake.",
          segments: ["He ", { u: "speaks" }, " ", { u: "fluently" }, " ", { u: "very" }, " ", { u: "French" }, "."],
          correctIndex: 2, correction: "very fluently (degree before the adverb)",
          explanation: "The degree adverb goes first: 'He speaks French very fluently'." },
        { type: "true_false", statement: "Degree adverbs like \"very\" go before the word they modify.", answer: true, explanation: "Yes: very tired, too fast, quite good." }
      ]
    },

    /* ---------- ARTÍCULOS / DETERMINANTES: a / an / the (A1) ---------- */
    "x3-a1-grammar-articles": {
      lessonId: "x3-a1-grammar-articles", level: "A1", track: "Gramática", topic: "freetime", skill: "grammar", tipo: "aprende", title: "Like, love, hate + -ing", rev: 2, xpReward: 34, mascotState: "explaining",
      explanation: {
        body: "Para hablar de lo que te gusta hacer usas like, love o hate seguidos de un verbo con -ing: I love dancing. I don't like running. Estructura: love / like / enjoy / don't like / hate + verbo-ing. Ortografía: dance → dancing (quita la e), swim → swimming (dobla la consonante), play → playing. Con he/she: She likes reading. Pregunta: Do you like cooking?",
        examples: [
          { en: "What do you like doing at the weekend?", es: "¿Qué te gusta hacer el fin de semana?" },
          { en: "I love walking on the beach with Coco.", es: "Me encanta caminar por la playa con Coco." },
          { en: "I enjoy cooking, but I hate cleaning!", es: "Disfruto cocinar, ¡pero odio limpiar!" },
          { en: "Me too. I don't like washing the dishes.", es: "Yo también. No me gusta lavar los platos." }
        ],
        sections: [
          { kind: "intro", body: "Para hablar de lo que te gusta hacer usas like, love o hate seguidos de un verbo con -ing: I love dancing. I don't like running." },
          {
            kind: "regla",
            body: "Estructura: love / like / enjoy / don't like / hate + verbo-ing. Ortografía: dance → dancing (quita la e), swim → swimming (dobla la consonante), play → playing. Con he/she: She likes reading. Pregunta: Do you like cooking?"
          },
          {
            kind: "vocab",
            items: [
              { en: "love", ipa: "lʌv", es: "encantar" },
              { en: "like", ipa: "laɪk", es: "gustar" },
              { en: "enjoy", ipa: "ɪnˈdʒɔɪ", es: "disfrutar" },
              { en: "don't mind", ipa: "dəʊnt maɪnd", es: "no me molesta" },
              { en: "don't like", ipa: "dəʊnt laɪk", es: "no gustar" },
              { en: "hate", ipa: "heɪt", es: "odiar" },
              { en: "cooking", ipa: "ˈkʊkɪŋ", es: "cocinar" },
              { en: "swimming", ipa: "ˈswɪmɪŋ", es: "nadar" }
            ]
          },
          {
            kind: "expresiones",
            items: [{ en: "I love it!", es: "¡Me encanta!" }, { en: "Me too.", es: "Yo también." }, { en: "Not really.", es: "La verdad, no mucho." }, { en: "What do you like doing?", es: "¿Qué te gusta hacer?" }]
          },
          {
            kind: "ejemplos",
            items: [
              { en: "Sam: What do you like doing at the weekend?", es: "Sam: ¿Qué te gusta hacer el fin de semana?" },
              { en: "Mia: I love walking on the beach with Coco.", es: "Mia: Me encanta caminar por la playa con Coco." },
              { en: "Sam: I enjoy cooking, but I hate cleaning!", es: "Sam: Disfruto cocinar, ¡pero odio limpiar!" },
              { en: "Mia: Me too. I don't like washing the dishes.", es: "Mia: Yo también. No me gusta lavar los platos." }
            ]
          },
          {
            kind: "errores",
            items: [
              { no: "I like swim.", si: "I like swimming.", pq: "Después de like, usa el verbo con -ing." },
              { no: "She love reading.", si: "She loves reading.", pq: "Con she, el verbo lleva -s." },
              { no: "I hate runing.", si: "I hate running.", pq: "run dobla la n: running." }
            ]
          },
          { kind: "resumen", body: "love / like / enjoy / don't mind / don't like / hate + verbo-ing. Cuidado con la ortografía: dancing, swimming, running." },
          { kind: "puente", body: "Ahora habla de los gustos de Mia y Sam." }
        ]
      },
      exercises: [
        {
          type: "matching", instruction: "Une cada verbo con su forma -ing.",
          pairs: [{ l: "swim", r: "swimming" }, { l: "dance", r: "dancing" }, { l: "play", r: "playing" }, { l: "run", r: "running" }, { l: "write", r: "writing" }]
        },
        { type: "multiple_choice", question: "I love ___ to music.", options: ["listening", "listen", "to listening"], correctIndex: 0, explanation: "love + verbo-ing: I love listening to music." },
        {
          type: "find_error",
          segments: ["My sister ", { u: "love" }, " ", { u: "dancing" }, " ", { u: "at" }, " parties."],
          correctIndex: 0, correction: "loves", explanation: "Con she (my sister), el verbo lleva -s: loves.", question: "Encuentra el error"
        },
        { type: "fill_blank", sentence: "Do you enjoy ___ (cook)?", answers: ["cooking"], hint: "enjoy + -ing", explanation: "Do you enjoy cooking?" },
        {
          type: "categorize", instruction: "¿Le gusta o no le gusta?",
          buckets: [{ id: "yes", label: "Le gusta" }, { id: "no", label: "No le gusta" }],
          items: [
            { t: "I love it.", bucket: "yes" },
            { t: "I enjoy it.", bucket: "yes" },
            { t: "I like it.", bucket: "yes" },
            { t: "I hate it.", bucket: "no" },
            { t: "I don't like it.", bucket: "no" },
            { t: "Not really.", bucket: "no" }
          ]
        },
        { type: "listening", text: "I like playing football, but I hate running in the rain.", question: "¿Qué odia hacer?", options: ["Correr bajo la lluvia", "Jugar fútbol", "Nadar"], correctIndex: 0 },
        { type: "word_order", words: ["dishes", "Sam", "the", "doesn't", "washing", "like"], correctOrder: ["Sam", "doesn't", "like", "washing", "the", "dishes"], hint: "Negativo con he: doesn't." },
        { type: "speak", text: "I love walking on the beach.", es: "Me encanta caminar por la playa." },
        { type: "translate", prompt: "Traduce: \"Me gusta leer.\"", answers: ["i like reading", "i like to read", "i enjoy reading"], explanation: "I like reading. (También: I like to read.)" }
      ]
    },

    /* ---------- DETERMINANTES: demostrativos (A2) ---------- */
    "x3-a2-grammar-demonstratives": {
      lessonId: "x3-a2-grammar-demonstratives", level: "A2", track: "Gramática", topic: "grammar", skill: "grammar",
      title: "Demostrativos: this / that / these / those", xpReward: 42, mascotState: "explaining",
      explanation: {
        body: "Los demostrativos señalan: THIS (este/esta, cerca, singular), THESE (estos/estas, cerca, plural), THAT (ese/aquel, lejos, singular), THOSE (esos/aquellos, lejos, plural). Pueden ir con sustantivo ('this book') o solos ('I like these').",
        examples: [
          { en: "This is my friend Ana.", es: "Esta es mi amiga Ana." },
          { en: "Those shoes are expensive.", es: "Aquellos zapatos son caros." }
        ]
      },
      exercises: [
        { type: "categorize", instruction: "¿Cerca o lejos?", buckets: [
          { id: "near", label: "Near (this/these)" }, { id: "far", label: "Far (that/those)" } ], items: [
          { t: "this", bucket: "near" }, { t: "that", bucket: "far" },
          { t: "these", bucket: "near" }, { t: "those", bucket: "far" } ] },
        { type: "multiple_choice", question: "Choose: \"___ apples here are fresh.\" (near, plural)", options: ["This", "These", "Those"], correctIndex: 1, explanation: "Cerca + plural → These." },
        { type: "multiple_choice", question: "Choose: \"Look at ___ mountains far away.\"", options: ["these", "this", "those"], correctIndex: 2, explanation: "Lejos + plural → those." },
        { type: "fill_blank", sentence: "___ is my house, right here. (singular, near)", answers: ["this", "This"], hint: "Cerca, singular.", explanation: "This is my house." },
        { type: "find_error", question: "Encuentra el error.",
          segments: ["I ", { u: "want" }, " ", { u: "this" }, " ", { u: "shoes" }, " ", { u: "please" }, "."],
          correctIndex: 1, correction: "these (plural)",
          explanation: "'shoes' es plural: 'these shoes' (cerca) o 'those shoes' (lejos)." },
        { type: "translate", prompt: "Traduce: \"Esos coches son rápidos.\"", answers: ["those cars are fast"], explanation: "Those cars are fast." }
      ]
    },

    /* ---------- CUANTIFICADORES (A2) ---------- */
    "x3-a2-grammar-quantifiers": {
      lessonId: "x3-a2-grammar-quantifiers", level: "A2", track: "Gramática", topic: "grammar", skill: "grammar",
      title: "Cuantificadores: some, any, much, many...", xpReward: 44, mascotState: "explaining",
      explanation: {
        body: "Cuantificadores expresan cantidad. SOME en afirmativas, ANY en negativas y preguntas. MANY + contables, MUCH + incontables. A LOT OF / LOTS OF sirve para ambos. A FEW (algunos, contables), A LITTLE (un poco, incontables). Ejemplo: 'I have some money but not many coins'.",
        examples: [
          { en: "There are some apples in the bowl.", es: "Hay algunas manzanas en el bol." },
          { en: "I don't have any milk.", es: "No tengo nada de leche." },
          { en: "We have a lot of homework.", es: "Tenemos muchos deberes." }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "Choose: \"Is there ___ sugar?\"", options: ["some", "any", "many"], correctIndex: 1, explanation: "En preguntas se usa 'any'." },
        { type: "multiple_choice", question: "Choose: \"How ___ people came?\"", options: ["a little", "much", "many"], correctIndex: 2, explanation: "'people' es contable → many." },
        { type: "multiple_choice", question: "Choose: \"I have ___ time before the train. (un poco)\"", options: ["a little", "many", "a few"], correctIndex: 0, explanation: "'time' es incontable → a little." },
        { type: "fill_blank", sentence: "There aren't ___ eggs left.", answers: ["any", "many"], hint: "Negativa, contable.", explanation: "any/many con negativa + contable." },
        { type: "categorize", instruction: "¿Con contables o incontables?", buckets: [
          { id: "c", label: "Countable (many)" }, { id: "u", label: "Uncountable (much)" } ], items: [
          { t: "books", bucket: "c" }, { t: "water", bucket: "u" },
          { t: "friends", bucket: "c" }, { t: "money", bucket: "u" } ] },
        { type: "translate", prompt: "Traduce: \"Hay algunos libros pero no mucho tiempo.\"", answers: ["there are some books but not much time", "there are some books, but not much time"], explanation: "There are some books but not much time." }
      ]
    },

    /* ---------- VERBOS: regulares e irregulares (A2) ---------- */
    "x3-a2-grammar-irregular-verbs": {
      lessonId: "x3-a2-grammar-irregular-verbs", level: "A2", track: "Gramática", topic: "grammar", skill: "grammar",
      title: "Verbos: regulares e irregulares", xpReward: 44, mascotState: "explaining",
      explanation: {
        body: "Los verbos son la clase de palabra que expresa acciones o estados. En pasado, los REGULARES añaden -ed (work → worked). Los IRREGULARES cambian de forma y hay que aprenderlos: go → went → gone; see → saw → seen; have → had → had. El participio (3ª forma) se usa en perfectos y pasiva.",
        examples: [
          { en: "I worked yesterday. (regular)", es: "Trabajé ayer." },
          { en: "She went home early. (irregular)", es: "Se fue a casa pronto." }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Une el infinitivo con su pasado simple.", pairs: [
          { l: "go", r: "went" }, { l: "see", r: "saw" },
          { l: "buy", r: "bought" }, { l: "take", r: "took" },
          { l: "eat", r: "ate" }, { l: "make", r: "made" } ] },
        { type: "categorize", instruction: "¿Pasado regular o irregular?", buckets: [
          { id: "r", label: "Regular (-ed)" }, { id: "i", label: "Irregular" } ], items: [
          { t: "played", bucket: "r" }, { t: "went", bucket: "i" },
          { t: "watched", bucket: "r" }, { t: "saw", bucket: "i" },
          { t: "lived", bucket: "r" }, { t: "took", bucket: "i" } ] },
        { type: "fill_blank", sentence: "Yesterday I ___ (buy) a new jacket.", answers: ["bought"], hint: "Pasado irregular de 'buy'.", explanation: "buy → bought." },
        { type: "find_error", question: "Encuentra el error.",
          segments: ["She ", { u: "goed" }, " to the ", { u: "shop" }, " ", { u: "and" }, " ", { u: "bought" }, " milk."],
          correctIndex: 0, correction: "went (irregular)",
          explanation: "El pasado de 'go' es 'went', no 'goed'." },
        { type: "multiple_choice", question: "Past participle of \"eat\" (used in 'have ___'):", options: ["ate", "eaten", "eated"], correctIndex: 1, explanation: "eat → ate → eaten." },
        { type: "translate", prompt: "Traduce: \"Vi una buena película anoche.\"", answers: ["i saw a good film last night", "i saw a good movie last night"], explanation: "I saw a good film last night." }
      ]
    }

  };

  /* Orden de aparición por nivel (la progresión real la calcula vesper_path.js). */
  var ORDER = [
    /* A1 */ "x3-a1-vocab-food", "x3-a1-vocab-body", "x3-a1-grammar-there-is",
             "x3-a1-grammar-can", "x3-a1-read-myday", "x3-a1-listen-greetings", "x3-a1-vocab-time",
             "x3-a1-grammar-prep-place", "x3-a1-vocab-interjections",
             "x3-a1-grammar-nouns-plural", "x3-a1-grammar-pronouns", "x3-a1-grammar-adjectives", "x3-a1-grammar-articles",
    /* A2 */ "x3-a2-vocab-jobs", "x3-a2-vocab-weather", "x3-a2-grammar-going-to",
             "x3-a2-grammar-adverbs-freq", "x3-a2-read-market", "x3-a2-listen-directions", "x3-a2-use-restaurant",
             "x3-a2-grammar-prep-time", "x3-a2-grammar-conjunctions",
             "x3-a2-grammar-nouns-countable", "x3-a2-grammar-possessive-s", "x3-a2-grammar-possessives",
             "x3-a2-grammar-comparatives", "x3-a2-grammar-adverbs-manner", "x3-a2-grammar-demonstratives",
             "x3-a2-grammar-quantifiers", "x3-a2-grammar-irregular-verbs",
    /* B1 */ "x3-b1-vocab-health", "x3-b1-vocab-technology", "x3-b1-grammar-second-conditional",
             "x3-b1-grammar-passive", "x3-b1-read-environment", "x3-b1-listen-interview", "x3-b1-use-phrasal-verbs",
             "x3-b1-grammar-conjunctions", "x3-b1-grammar-dependent-prep", "x3-b1-vocab-interjections2",
             "x3-b1-grammar-reflexive", "x3-b1-grammar-relative", "x3-b1-grammar-adverbs-types",
    /* B2 */ "x3-b2-vocab-work", "x3-b2-vocab-media", "x3-b2-grammar-reported-speech",
             "x3-b2-grammar-third-conditional", "x3-b2-read-remote-work", "x3-b2-use-linkers",
             "x3-b2-grammar-adjective-order",
    /* C1 */ "x3-c1-vocab-academic", "x3-c1-vocab-idioms", "x3-c1-grammar-inversion",
             "x3-c1-grammar-cleft", "x3-c1-read-ai", "x3-c1-listen-lecture",
    /* C2 */ "x3-c2-vocab-nuance", "x3-c2-vocab-idioms-advanced", "x3-c2-grammar-subjunctive",
             "x3-c2-grammar-discourse", "x3-c2-read-philosophy", "x3-c2-use-register"
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
