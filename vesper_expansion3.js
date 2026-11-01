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
      lessonId: "x3-a1-vocab-body", level: "A1", track: "Vocabulario", topic: "body", skill: "vocab",
      title: "Vocabulario: el cuerpo", xpReward: 32, mascotState: "explaining",
      explanation: {
        body: "Las partes del cuerpo son vocabulario esencial de A1. Te sirven para el médico, el deporte y describir personas. (Recuerda: el plural de 'foot' es 'feet'.)",
        examples: [
          { en: "I have two eyes and one nose.", es: "Tengo dos ojos y una nariz." },
          { en: "My hands are cold.", es: "Mis manos están frías." }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Une la parte del cuerpo con su traducción.", pairs: [
          { l: "head", r: "cabeza" }, { l: "hand", r: "mano" },
          { l: "eye", r: "ojo" }, { l: "foot", r: "pie" },
          { l: "mouth", r: "boca" }, { l: "ear", r: "oreja" } ] },
        { type: "multiple_choice", question: "You see with your...", options: ["eyes", "feet", "ears"], correctIndex: 0, explanation: "Ves con los ojos (eyes)." },
        { type: "fill_blank", sentence: "I walk with my two ___.", answers: ["feet", "legs"], hint: "Plural irregular de 'foot'.", explanation: "feet = pies (plural de foot)." },
        { type: "true_false", statement: "We hear with our ears.", answer: true, explanation: "Oímos con las orejas/oídos (ears)." },
        { type: "word_order", words: ["She", "has", "long", "hair"], correctOrder: ["She", "has", "long", "hair"], hint: "Sujeto + has + adjetivo + sustantivo." }
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
      lessonId: "x3-a2-vocab-weather", level: "A2", track: "Vocabulario", topic: "weather", skill: "vocab",
      title: "Vocabulario: el tiempo y las estaciones", xpReward: 42, mascotState: "explaining",
      explanation: {
        body: "Aprende a hablar del clima y las estaciones. Para el tiempo usamos 'It's': It's sunny, It's raining. (Une, clasifica y completa.)",
        examples: [
          { en: "It's sunny and warm today.", es: "Hoy hace sol y calor." },
          { en: "In winter it's cold and it snows.", es: "En invierno hace frío y nieva." }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Une la palabra del tiempo con su traducción.", pairs: [
          { l: "sunny", r: "soleado" }, { l: "rainy", r: "lluvioso" },
          { l: "cloudy", r: "nublado" }, { l: "windy", r: "ventoso" },
          { l: "snowy", r: "nevado" }, { l: "foggy", r: "con niebla" } ] },
        { type: "categorize", instruction: "¿Clima cálido o frío?", buckets: [
          { id: "h", label: "Hot/Warm" }, { id: "c", label: "Cold" } ], items: [
          { t: "summer", bucket: "h" }, { t: "winter", bucket: "c" },
          { t: "beach", bucket: "h" }, { t: "snow", bucket: "c" } ] },
        { type: "multiple_choice", question: "Choose: \"It ___ a lot in spring.\"", options: ["rains", "rain", "raining"], correctIndex: 0, explanation: "Presente simple con 'it': it rains." },
        { type: "fill_blank", sentence: "Take an umbrella, it's ___ today.", answers: ["raining", "rainy"], hint: "Llueve.", explanation: "It's raining = está lloviendo." },
        { type: "true_false", statement: "We say \"It's snow today.\"", answer: false, explanation: "Correcto: 'It's snowing' o 'It's snowy'." }
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
      lessonId: "x3-a2-grammar-adverbs-freq", level: "A2", track: "Gramática", topic: "grammar", skill: "grammar",
      title: "Adverbios de frecuencia", xpReward: 42, mascotState: "explaining",
      explanation: {
        body: "Los adverbios de frecuencia (always, usually, often, sometimes, never) van ANTES del verbo principal, pero DESPUÉS del verbo 'to be': 'I always study' / 'She is always late'. (Orden: sujeto + adverbio + verbo.)",
        examples: [
          { en: "I usually have breakfast at eight.", es: "Normalmente desayuno a las ocho." },
          { en: "He is never late for work.", es: "Él nunca llega tarde al trabajo." }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "Choose the correct order.", options: ["I go always to the gym.", "I always go to the gym.", "Always I go to the gym."], correctIndex: 1, explanation: "El adverbio va antes del verbo principal: I always go." },
        { type: "multiple_choice", question: "Choose: \"She ___ tired after work.\"", options: ["is oftens", "often is", "is often"], correctIndex: 2, explanation: "Con 'be' el adverbio va después: is often." },
        { type: "find_error", question: "Encuentra el error.",
          segments: ["They ", { u: "watch" }, " ", { u: "never" }, " ", { u: "TV" }, " in the ", { u: "morning" }, "."],
          correctIndex: 1, correction: "never watch (adverbio antes del verbo)",
          explanation: "El adverbio va antes del verbo: 'They never watch TV'." },
        { type: "categorize", instruction: "¿Frecuencia alta o baja?", buckets: [
          { id: "h", label: "High (often)" }, { id: "l", label: "Low (rarely)" } ], items: [
          { t: "always", bucket: "h" }, { t: "never", bucket: "l" },
          { t: "usually", bucket: "h" }, { t: "seldom", bucket: "l" } ] },
        { type: "fill_blank", sentence: "We ___ go to the cinema on Fridays. (90%)", answers: ["usually", "often", "always"], hint: "Frecuencia alta.", explanation: "usually/often = casi siempre." }
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
      lessonId: "x3-b1-grammar-passive", level: "B1", track: "Grammar", topic: "grammar", skill: "grammar",
      title: "The passive voice (present and past)", xpReward: 54, mascotState: "explaining",
      explanation: {
        body: "The passive is formed with 'be' + past participle. We use it when the action matters more than who does it: 'English is spoken here'. Past: 'The bridge was built in 1900'. The agent is added with 'by'.",
        examples: [
          { en: "Coffee is grown in Brazil." },
          { en: "The letter was written by Ana." }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "Choose the passive: \"The house ___ in 1990.\"", options: ["was built", "built", "is build"], correctIndex: 0, explanation: "Past passive: was + past participle (built)." },
        { type: "find_error", question: "Find the mistake.",
          segments: ["The ", { u: "windows" }, " ", { u: "are" }, " ", { u: "cleaned" }, " ", { u: "by" }, " a robot."],
          correctIndex: 3, correction: "(the sentence is correct) — a mistake would be 'cleaning'",
          explanation: "Actually, the sentence is correct: 'are cleaned by a robot' is a valid passive." },
        { type: "fill_blank", sentence: "This book ___ (write) by a famous author.", answers: ["was written"], hint: "Past passive.", explanation: "was written = past passive of write." },
        { type: "multiple_choice", question: "Make passive: \"People speak English here.\"", options: ["English is speak here.", "English speaks here.", "English is spoken here."], correctIndex: 2, explanation: "is + past participle (spoken)." },
        { type: "translate", prompt: "Rewrite in the passive: A mechanic repaired the car yesterday. (Don't mention the mechanic.)", answers: ["the car was repaired yesterday", "the car was fixed yesterday"], explanation: "The car was repaired yesterday." },
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
        { type: "true_false", statement: "According to the text, small actions are useless on their own.", answer: false, explanation: "The text says that together they make a difference." }
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
      lessonId: "x3-b1-use-phrasal-verbs", level: "B1", track: "Practical English", topic: "grammar", skill: "use",
      title: "Everyday phrasal verbs", xpReward: 54, mascotState: "explaining",
      explanation: {
        body: "Phrasal verbs combine a verb with a particle, and the meaning changes: 'get up' (leave your bed), 'turn on' (start a device), 'look for' (try to find). They are very common in spoken English. Learn them as complete chunks.",
        examples: [
          { en: "I get up at seven every day." },
          { en: "Can you turn off the TV?" }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Match each phrasal verb with its meaning.", pairs: [{"l":"get up","r":"leave your bed"},{"l":"turn on","r":"start a machine or light"},{"l":"look for","r":"try to find"},{"l":"give up","r":"stop trying"},{"l":"find out","r":"discover information"},{"l":"put on","r":"start wearing (clothes)"}] },
        { type: "multiple_choice", question: "Choose: \"It's dark. Can you ___ the light?\"", options: ["turn on", "turn up", "turn into"], correctIndex: 0, explanation: "turn on = start a device or light." },
        { type: "fill_blank", sentence: "I can't find my keys. I'm ___ them.", answers: ["looking for"], hint: "buscar (phrasal verb).", explanation: "look for = buscar." },
        { type: "find_error", question: "Find the mistake.",
          segments: ["Please ", { u: "turn" }, " ", { u: "of" }, " the ", { u: "computer" }, " ", { u: "now" }, "."],
          correctIndex: 1, correction: "off (turn off = stop a device)",
          explanation: "It's 'turn off' (with double f), not 'turn of'." },
        { type: "translate", prompt: "Rewrite with 'give up': I always keep trying; I never stop.", answers: ["i never give up", "i never give up.", "i don't give up"], explanation: "I never give up." }
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
        { type: "true_false", statement: "The author believes remote work is entirely positive.", answer: false, explanation: "The writer calls it 'a double-edged sword'." }
      ]
    },

    "x3-b2-use-linkers": {
      lessonId: "x3-b2-use-linkers", level: "B2", track: "Practical English", topic: "grammar", skill: "use",
      title: "Linkers for better writing", xpReward: 60, mascotState: "explaining",
      explanation: {
        body: "Linkers give cohesion to your writing: contrast (however, although), cause (because, since), consequence (therefore, so), addition (moreover, in addition). Watch the punctuation: 'However,' takes a comma; 'although' joins two clauses.",
        examples: [
          { en: "It was raining; however, we went out." },
          { en: "Although it was late, she kept working." }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Match each linker with its function.", pairs: [{"l":"however","r":"contrast"},{"l":"therefore","r":"consequence"},{"l":"moreover","r":"addition"},{"l":"because","r":"cause"}] },
        { type: "multiple_choice", question: "Choose: \"___ it was expensive, he bought it.\"", options: ["Although", "Therefore", "Moreover"], correctIndex: 0, explanation: "Although introduces a contrast by joining two clauses." },
        { type: "fill_blank", sentence: "The data was incomplete; ___, the report was delayed.", answers: ["therefore", "thus", "consequently"], hint: "A consequence.", explanation: "therefore = for this reason, as a result." },
        { type: "find_error", question: "Find the mistake.",
          segments: ["She studied ", { u: "hard" }, ", ", { u: "however" }, " ", { u: "she" }, " ", { u: "failed" }, "."],
          correctIndex: 1, correction: "; however, (punctuation)",
          explanation: "'however' as a linker needs a semicolon before and a comma after: '...hard; however, she failed.'" },
        { type: "translate", prompt: "Join the sentences with 'Although': She was tired. She finished the work.", answers: ["although she was tired she finished the work", "although she was tired, she finished the work"], explanation: "Although she was tired, she finished the work." }
      ]
    },

    /* ============================================================
     * ============================ C1 ============================
     * ============================================================ */

    "x3-c1-vocab-academic": {
      lessonId: "x3-c1-vocab-academic", level: "C1", track: "Vocabulary", topic: "academic", skill: "vocab",
      title: "Academic vocabulary", xpReward: 68, mascotState: "explaining",
      explanation: {
        body: "C1 academic vocabulary for essays and formal presentations. Verbs like 'demonstrate', 'illustrate' or 'highlight' and nouns like 'implication' or 'criterion' raise your register. (Notice irregular plurals: criterion → criteria.)",
        examples: [
          { en: "The study highlights a key trend." },
          { en: "There are several implications." }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Match each word with its meaning.", pairs: [{"l":"to highlight","r":"to draw attention to"},{"l":"implication","r":"a possible future effect"},{"l":"to illustrate","r":"to explain with examples"},{"l":"framework","r":"a basic structure of ideas"},{"l":"criteria","r":"standards used to judge"},{"l":"to assess","r":"to judge or evaluate"}] },
        { type: "multiple_choice", question: "Choose the more formal verb for \"to show\".", options: ["do", "get", "demonstrate"], correctIndex: 2, explanation: "'demonstrate' is more formal than 'show'." },
        { type: "multiple_choice", question: "What is the singular of \"criteria\"?", options: ["criterias", "criterion", "criteri"], correctIndex: 1, explanation: "criterion (sing.) → criteria (pl.)." },
        { type: "fill_blank", sentence: "The findings ___ a significant change in behaviour.", answers: ["highlight", "demonstrate", "reveal", "suggest"], hint: "An academic verb meaning 'show'.", explanation: "highlight / demonstrate / reveal are all appropriate." },
        { type: "translate", prompt: "Rewrite with 'implications': These results could have important effects in the future.", answers: ["these results have important implications","these findings have important implications","these results could have important implications","these results may have important implications"], explanation: "These results have important implications." }
      ]
    },

    "x3-c1-vocab-idioms": {
      lessonId: "x3-c1-vocab-idioms", level: "C1", track: "Vocabulary", topic: "idioms", skill: "vocab",
      title: "Common idioms", xpReward: 68, mascotState: "explaining",
      explanation: {
        body: "Idioms are expressions whose meaning isn't literal. Mastering them makes your English sound natural: 'to break the ice', 'once in a blue moon', 'the ball is in your court'. Learn them as whole chunks and notice the context.",
        examples: [
          { en: "Let's break the ice with a game." },
          { en: "It happens once in a blue moon." }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Match each idiom with its meaning.", pairs: [{"l":"break the ice","r":"make people relax at the start"},{"l":"piece of cake","r":"very easy"},{"l":"under the weather","r":"feeling a bit ill"},{"l":"hit the books","r":"start studying hard"},{"l":"cost an arm and a leg","r":"be extremely expensive"},{"l":"call it a day","r":"stop working for today"}] },
        { type: "multiple_choice", question: "\"The exam was a piece of cake\" means it was...", options: ["very difficult", "very easy", "very long"], correctIndex: 1, explanation: "piece of cake = very easy." },
        { type: "fill_blank", sentence: "I'm feeling a bit ___ the weather today.", answers: ["under"], hint: "An idiom: feeling a bit ill.", explanation: "under the weather = feeling slightly ill." },
        { type: "multiple_choice", question: "\"It cost an arm and a leg\" means it was...", options: ["very cheap", "free", "very expensive"], correctIndex: 2, explanation: "It means very expensive." },
        { type: "true_false", statement: "Idioms usually have a literal, word-for-word meaning.", answer: false, explanation: "Their meaning is figurative, not literal." }
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
        { type: "true_false", statement: "The author fully agrees with the dystopian fear that AI makes human work obsolete.", answer: false, explanation: "The writer defends a nuanced view of complementarity." }
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
      lessonId: "x3-c2-vocab-idioms-advanced", level: "C2", track: "Vocabulary", topic: "idioms", skill: "vocab",
      title: "Advanced idioms and register", xpReward: 76, mascotState: "explaining",
      explanation: {
        body: "Sophisticated idioms found in the press and in educated speech: 'a blessing in disguise', 'to bite the bullet', 'the elephant in the room'. Use them with judgement: they suit informal-to-neutral register, rarely very formal writing.",
        examples: [
          { en: "Losing that job was a blessing in disguise." },
          { en: "We must address the elephant in the room." }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Match each idiom with its meaning.", pairs: [{"l":"a blessing in disguise","r":"a problem that turns out well"},{"l":"to bite the bullet","r":"to face something with courage"},{"l":"the elephant in the room","r":"the issue everyone avoids"},{"l":"to cut corners","r":"to save effort by lowering quality"},{"l":"to jump on the bandwagon","r":"to join a popular trend"},{"l":"to be on thin ice","r":"to be in a risky position"}] },
        { type: "multiple_choice", question: "\"To bite the bullet\" means to...", options: ["avoid a problem forever", "face something difficult with courage", "eat very quickly"], correctIndex: 1, explanation: "It means to face something difficult with determination." },
        { type: "fill_blank", sentence: "Nobody wanted to mention it, but it was the ___ in the room.", answers: ["elephant"], hint: "The obvious issue nobody mentions.", explanation: "the elephant in the room." },
        { type: "multiple_choice", question: "If a company \"cuts corners\", it...", options: ["does careful, thorough work and never rushes a job", "expands quickly", "saves time or money by lowering quality"], correctIndex: 2, explanation: "cut corners = save time or money at the expense of quality." },
        { type: "true_false", statement: "Highly idiomatic expressions are usually best avoided in very formal academic writing.", answer: true, explanation: "In very formal register it is better to limit them." }
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
        { type: "true_false", statement: "The author argues that choice should be completely abolished.", answer: false, explanation: "It clarifies: 'This is not an argument for abolishing choice.'" }
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
      lessonId: "x3-a1-grammar-articles", level: "A1", track: "Gramática", topic: "grammar", skill: "grammar",
      title: "Artículos: a / an / the", xpReward: 34, mascotState: "explaining",
      explanation: {
        body: "Usamos A/AN (un/una) para algo no específico y singular: 'a' antes de consonante (a book), 'an' antes de sonido vocálico (an apple, an hour). THE (el/la/los/las) para algo concreto o ya mencionado. No se usa artículo con ideas generales en plural: 'I like dogs' (los perros en general).",
        examples: [
          { en: "I have a dog. The dog is black.", es: "Tengo un perro. El perro es negro." },
          { en: "She is an engineer.", es: "Ella es ingeniera." }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "Choose: \"I want ___ orange.\"", options: ["a", "the", "an"], correctIndex: 2, explanation: "'orange' empieza por sonido vocálico → an." },
        { type: "multiple_choice", question: "Choose: \"She plays ___ guitar very well.\"", options: ["the", "a", "an"], correctIndex: 0, explanation: "Con instrumentos: the guitar." },
        { type: "categorize", instruction: "¿'a' o 'an'?", buckets: [
          { id: "a", label: "a" }, { id: "an", label: "an" } ], items: [
          { t: "house", bucket: "a" }, { t: "apple", bucket: "an" },
          { t: "egg", bucket: "an" }, { t: "car", bucket: "a" },
          { t: "hour", bucket: "an" }, { t: "book", bucket: "a" } ] },
        { type: "find_error", question: "Encuentra el error.",
          segments: ["He ", { u: "is" }, " ", { u: "a" }, " ", { u: "honest" }, " ", { u: "man" }, "."],
          correctIndex: 1, correction: "an (honest empieza por sonido vocálico, la h es muda)",
          explanation: "'honest' tiene h muda → sonido vocálico → 'an honest man'." },
        { type: "fill_blank", sentence: "I like music. ___ music in this film is great.", answers: ["the", "The"], hint: "Algo concreto (la de esta película).", explanation: "The music = la música concreta del film." },
        { type: "true_false", statement: "We say \"an university\".", answer: false, explanation: "'university' empieza por sonido /ju/ (consonante): 'a university'." }
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
