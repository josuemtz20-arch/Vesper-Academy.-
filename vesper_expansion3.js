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
        { type: "multiple_choice", question: "You see with your...", options: ["ears", "eyes", "feet"], correctIndex: 1, explanation: "Ves con los ojos (eyes)." },
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
        { type: "multiple_choice", question: "Choose: \"___ a cat in the garden.\"", options: ["There is", "There are", "There be"], correctIndex: 0, explanation: "'a cat' es singular -> there is." },
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
        { type: "multiple_choice", question: "Choose the correct sentence.", options: ["He can plays the guitar.", "He can play the guitar.", "He cans play the guitar."], correctIndex: 1, explanation: "Tras 'can' va el infinitivo sin 's' ni 'to': can play." },
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
            { q: "What time does Tom finish work?", options: ["at five o'clock", "at one o'clock", "in the afternoon"], correctIndex: 1, explanation: "\"He finishes work at one o'clock.\"" }
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
        { type: "listening", text: "Hello, my name is Sarah.", question: "¿Qué escuchaste?",
          options: ["Hello, my name is Sarah.", "Yellow, my name is Sarah.", "Hello, my game is Sarah."], correctIndex: 0, explanation: "Hello, my name is Sarah." },
        { type: "listening", text: "Nice to meet you.", question: "¿Qué escuchaste?",
          options: ["Nice to meet you.", "Nice to eat you.", "Nice to see you."], correctIndex: 0, explanation: "Nice to meet you = Encantado de conocerte." },
        { type: "listening", text: "Where are you from?", question: "Escribe lo que escuchaste:", answers: ["where are you from", "where are you from?"], explanation: "Where are you from?" },
        { type: "multiple_choice", question: "Someone says \"Nice to meet you.\" A good reply is...", options: ["Nice to meet you too.", "You are welcome.", "See you yesterday."], correctIndex: 0, explanation: "Se responde 'Nice to meet you too.'" },
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
        { type: "multiple_choice", question: "Choose: \"It ___ a lot in spring.\"", options: ["rain", "rains", "raining"], correctIndex: 1, explanation: "Presente simple con 'it': it rains." },
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
        { type: "multiple_choice", question: "Choose: \"She ___ going to study tonight.\"", options: ["am", "is", "are"], correctIndex: 1, explanation: "Con 'she' usamos 'is going to'." },
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
        { type: "multiple_choice", question: "Choose: \"She ___ tired after work.\"", options: ["often is", "is often", "is oftens"], correctIndex: 1, explanation: "Con 'be' el adverbio va después: is often." },
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
            { q: "When does Maria go to the market?", options: ["every Sunday", "every Saturday", "every morning"], correctIndex: 1, explanation: "\"Every Saturday, Maria goes to the market...\"" },
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
        { type: "listening", text: "Go straight and turn left.", question: "¿Qué escuchaste?",
          options: ["Go straight and turn left.", "Go straight and turn right.", "Go back and turn left."], correctIndex: 0, explanation: "Go straight and turn left." },
        { type: "listening", text: "The station is next to the park.", question: "¿Qué escuchaste?",
          options: ["The station is next to the park.", "The station is opposite the park.", "The station is near the bank."], correctIndex: 0, explanation: "next to = al lado de." },
        { type: "listening", text: "Excuse me, where is the bank?", question: "Escribe lo que escuchaste:", answers: ["excuse me where is the bank", "excuse me, where is the bank?"], explanation: "Excuse me, where is the bank?" },
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
      lessonId: "x3-b1-vocab-health", level: "B1", track: "Vocabulario", topic: "health", skill: "vocab",
      title: "Vocabulario: salud y bienestar", xpReward: 52, mascotState: "explaining",
      explanation: {
        body: "Vocabulario de salud para hablar de síntomas, hábitos y consejos. Recuerda la estructura 'I have a headache' (un dolor) y los consejos con 'should': 'You should rest'.",
        examples: [
          { en: "I have a sore throat and a cough.", es: "Tengo dolor de garganta y tos." },
          { en: "You should drink more water.", es: "Deberías beber más agua." }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Une el síntoma con su traducción.", pairs: [
          { l: "headache", r: "dolor de cabeza" }, { l: "cough", r: "tos" },
          { l: "fever", r: "fiebre" }, { l: "sore throat", r: "dolor de garganta" },
          { l: "sneeze", r: "estornudar" }, { l: "rest", r: "descansar" } ] },
        { type: "multiple_choice", question: "Best advice for a cold:", options: ["You should rest and drink fluids.", "You should run a marathon.", "You should not sleep."], correctIndex: 0, explanation: "'should' da un consejo razonable." },
        { type: "categorize", instruction: "¿Hábito saludable o no saludable?", buckets: [
          { id: "h", label: "Healthy" }, { id: "u", label: "Unhealthy" } ], items: [
          { t: "exercise", bucket: "h" }, { t: "smoking", bucket: "u" },
          { t: "sleep well", bucket: "h" }, { t: "junk food", bucket: "u" } ] },
        { type: "fill_blank", sentence: "I feel ill. I think I have a ___.", answers: ["fever", "cold", "headache"], hint: "Síntoma común.", explanation: "have a fever/cold/headache." },
        { type: "translate", prompt: "Traduce: \"Deberías ir al médico.\"", answers: ["you should go to the doctor", "you should see a doctor"], explanation: "You should go to the doctor." }
      ]
    },

    "x3-b1-vocab-technology": {
      lessonId: "x3-b1-vocab-technology", level: "B1", track: "Vocabulario", topic: "tech", skill: "vocab",
      title: "Vocabulario: tecnología e internet", xpReward: 52, mascotState: "explaining",
      explanation: {
        body: "Vocabulario actual de tecnología e internet. Aparecen verbos comunes (download, upload, log in) y sustantivos (device, screen, password). (Une y clasifica para fijarlos.)",
        examples: [
          { en: "I need to download the app.", es: "Necesito descargar la aplicación." },
          { en: "Don't forget your password.", es: "No olvides tu contraseña." }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Une la palabra con su traducción.", pairs: [
          { l: "screen", r: "pantalla" }, { l: "password", r: "contraseña" },
          { l: "download", r: "descargar" }, { l: "device", r: "dispositivo" },
          { l: "to share", r: "compartir" }, { l: "settings", r: "ajustes" } ] },
        { type: "categorize", instruction: "¿Acción (verbo) u objeto (sustantivo)?", buckets: [
          { id: "v", label: "Verb" }, { id: "n", label: "Noun" } ], items: [
          { t: "upload", bucket: "v" }, { t: "keyboard", bucket: "n" },
          { t: "click", bucket: "v" }, { t: "browser", bucket: "n" },
          { t: "log in", bucket: "v" }, { t: "website", bucket: "n" } ] },
        { type: "multiple_choice", question: "Choose: \"I can't ___ in; I forgot my password.\"", options: ["log", "logs", "logging"], correctIndex: 0, explanation: "log in = iniciar sesión." },
        { type: "fill_blank", sentence: "Please ___ the file and send it to me.", answers: ["upload", "download", "attach"], hint: "Subir/adjuntar.", explanation: "upload = subir; attach = adjuntar." },
        { type: "true_false", statement: "A 'password' is a secret word to access an account.", answer: true, explanation: "password = contraseña." }
      ]
    },

    "x3-b1-grammar-second-conditional": {
      lessonId: "x3-b1-grammar-second-conditional", level: "B1", track: "Gramática", topic: "grammar", skill: "grammar",
      title: "Segundo condicional", xpReward: 54, mascotState: "explaining",
      explanation: {
        body: "El segundo condicional habla de situaciones imaginarias o improbables en el presente/futuro: If + pasado simple, + would + infinitivo. Con 'be' se usa 'were' para todos: 'If I were you...'. (No mezcles: no se usa 'would' en la parte del 'if'.)",
        examples: [
          { en: "If I had more money, I would travel the world.", es: "Si tuviera más dinero, viajaría por el mundo." },
          { en: "If I were you, I would study harder.", es: "Yo que tú, estudiaría más." }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "Choose: \"If I ___ rich, I would buy a house.\"", options: ["am", "were", "will be"], correctIndex: 1, explanation: "Segundo condicional: If + pasado (were para todos)." },
        { type: "find_error", question: "Encuentra el error.",
          segments: ["If she ", { u: "would" }, " ", { u: "have" }, " time, she ", { u: "would" }, " ", { u: "help" }, " us."],
          correctIndex: 0, correction: "(quita 'would') If she had time...",
          explanation: "En la parte del 'if' va el pasado simple ('had'), no 'would'." },
        { type: "fill_blank", sentence: "If I ___ (know) the answer, I would tell you.", answers: ["knew"], hint: "Pasado simple de 'know'.", explanation: "If I knew the answer, I would tell you." },
        { type: "word_order", words: ["If", "I", "were", "you", "I", "would", "wait"], correctOrder: ["If", "I", "were", "you", "I", "would", "wait"], hint: "If I were you, I would..." },
        { type: "translate", prompt: "Traduce: \"Si tuviera un coche, conduciría al trabajo.\"", answers: ["if i had a car i would drive to work", "if i had a car, i would drive to work"], explanation: "If I had a car, I would drive to work." },
        { type: "true_false", statement: "The second conditional talks about real, certain facts.", answer: false, explanation: "Habla de situaciones imaginarias o improbables." }
      ]
    },

    "x3-b1-grammar-passive": {
      lessonId: "x3-b1-grammar-passive", level: "B1", track: "Gramática", topic: "grammar", skill: "grammar",
      title: "La voz pasiva (presente y pasado)", xpReward: 54, mascotState: "explaining",
      explanation: {
        body: "La pasiva se forma con 'be' + participio pasado. La usamos cuando lo importante es la acción, no quién la hace: 'English is spoken here'. Pasado: 'The bridge was built in 1900'. El agente se añade con 'by'.",
        examples: [
          { en: "Coffee is grown in Brazil.", es: "El café se cultiva en Brasil." },
          { en: "The letter was written by Ana.", es: "La carta fue escrita por Ana." }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "Choose the passive: \"The house ___ in 1990.\"", options: ["built", "was built", "is build"], correctIndex: 1, explanation: "Pasiva en pasado: was + participio (built)." },
        { type: "find_error", question: "Encuentra el error.",
          segments: ["The ", { u: "windows" }, " ", { u: "are" }, " ", { u: "cleaned" }, " ", { u: "by" }, " a robot."],
          correctIndex: 3, correction: "(correcto) — el error sería 'cleaning'",
          explanation: "En realidad la frase es correcta: 'are cleaned by a robot' es pasiva válida." },
        { type: "fill_blank", sentence: "This book ___ (write) by a famous author.", answers: ["was written"], hint: "Pasiva en pasado.", explanation: "was written = fue escrito." },
        { type: "multiple_choice", question: "Make passive: \"People speak English here.\"", options: ["English speaks here.", "English is spoken here.", "English is speak here."], correctIndex: 1, explanation: "is + participio (spoken)." },
        { type: "translate", prompt: "Traduce: \"El coche fue reparado ayer.\"", answers: ["the car was repaired yesterday", "the car was fixed yesterday"], explanation: "The car was repaired yesterday." },
        { type: "true_false", statement: "In the passive, the agent can be added with \"by\".", answer: true, explanation: "Sí: '...by Ana', '...by a robot'." }
      ]
    },

    "x3-b1-read-environment": {
      lessonId: "x3-b1-read-environment", level: "B1", track: "Lectura", topic: "environment", skill: "reading",
      title: "Lectura: Small changes, big effect", xpReward: 54, mascotState: "explaining",
      explanation: {
        body: "Lectura de B1 sobre medio ambiente. Identifica idea principal, detalles y significado por contexto. (Distingue lo que dice el texto de tu opinión.)",
        examples: [
          { en: "reduce, reuse, recycle", es: "reducir, reutilizar, reciclar" },
          { en: "It makes a difference.", es: "Marca la diferencia." }
        ]
      },
      exercises: [
        { type: "reading", title: "Everyday choices",
          passage: "Many people think that protecting the environment is the job of governments and big companies. While these have an important role, our daily choices also matter. Small actions, repeated by millions of people, can have a big effect.\n\nFor example, using a reusable bottle instead of buying plastic ones saves hundreds of bottles a year. Turning off lights, taking shorter showers and cycling instead of driving all reduce the energy we use. None of these actions is difficult, but together they make a real difference.",
          questions: [
            { q: "What is the main idea of the text?", options: ["Only governments can protect the environment.", "Individual daily choices can also make a real difference.", "Plastic bottles are cheap and useful."], correctIndex: 1, explanation: "El texto defiende que las decisiones diarias importan." },
            { q: "What example does the text give to save plastic?", options: ["cycling to work", "using a reusable bottle", "turning off lights"], correctIndex: 1, explanation: "\"...using a reusable bottle instead of buying plastic ones...\"" },
            { q: "In the text, \"reduce\" means...", options: ["to make smaller / use less", "to throw away", "to sell"], correctIndex: 0, explanation: "reduce = reducir, usar menos." },
            { q: "What can be inferred?", options: ["The author thinks personal effort is useless.", "The author believes small actions add up.", "The author wants to ban all cars."], correctIndex: 1, explanation: "\"...together they make a real difference.\"" }
          ] },
        { type: "matching", instruction: "Une la palabra con su traducción.", pairs: [
          { l: "reusable", r: "reutilizable" }, { l: "to save", r: "ahorrar" },
          { l: "to reduce", r: "reducir" }, { l: "energy", r: "energía" } ] },
        { type: "true_false", statement: "According to the text, small actions are useless on their own.", answer: false, explanation: "El texto dice que juntas marcan la diferencia." }
      ]
    },

    "x3-b1-listen-interview": {
      lessonId: "x3-b1-listen-interview", level: "B1", track: "Listening", topic: "work", skill: "listening",
      title: "Escucha: una entrevista de trabajo", xpReward: 52, mascotState: "explaining",
      explanation: {
        body: "Escucha frases típicas de una entrevista de trabajo. Aprende a entender preguntas sobre experiencia y fortalezas. (Reproduce y, si quieres, escucha más lento.)",
        examples: [
          { en: "Tell me about your experience.", es: "Háblame de tu experiencia." },
          { en: "What are your strengths?", es: "¿Cuáles son tus puntos fuertes?" }
        ]
      },
      exercises: [
        { type: "listening", text: "Why do you want this job?", question: "¿Qué escuchaste?",
          options: ["Why do you want this job?", "Where do you want this job?", "Why do you want this dog?"], correctIndex: 0, explanation: "Why do you want this job?" },
        { type: "listening", text: "I have three years of experience.", question: "¿Qué escuchaste?",
          options: ["I have three years of experience.", "I have free years of experience.", "I have three years of experiments."], correctIndex: 0, explanation: "experience = experiencia." },
        { type: "listening", text: "Can you tell me about yourself?", question: "Escribe lo que escuchaste:", answers: ["can you tell me about yourself", "can you tell me about yourself?"], explanation: "Can you tell me about yourself?" },
        { type: "matching", instruction: "Une el término con su traducción.", pairs: [
          { l: "strengths", r: "fortalezas" }, { l: "weakness", r: "debilidad" },
          { l: "experience", r: "experiencia" }, { l: "skills", r: "habilidades" } ] },
        { type: "multiple_choice", question: "Good answer to \"What are your strengths?\"", options: ["I am hardworking and organised.", "I don't know, maybe nothing.", "I am always late."], correctIndex: 0, explanation: "Destaca cualidades positivas." }
      ]
    },

    "x3-b1-use-phrasal-verbs": {
      lessonId: "x3-b1-use-phrasal-verbs", level: "B1", track: "Inglés práctico", topic: "grammar", skill: "use",
      title: "Phrasal verbs del día a día", xpReward: 54, mascotState: "explaining",
      explanation: {
        body: "Los phrasal verbs combinan un verbo con una partícula y cambian de significado: 'get up' (levantarse), 'turn on' (encender), 'look for' (buscar). Son muy comunes en el inglés hablado. (Apréndelos como bloques completos.)",
        examples: [
          { en: "I get up at seven every day.", es: "Me levanto a las siete cada día." },
          { en: "Can you turn off the TV?", es: "¿Puedes apagar la tele?" }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Une el phrasal verb con su significado.", pairs: [
          { l: "get up", r: "levantarse" }, { l: "turn on", r: "encender" },
          { l: "look for", r: "buscar" }, { l: "give up", r: "rendirse" },
          { l: "find out", r: "averiguar" }, { l: "put on", r: "ponerse (ropa)" } ] },
        { type: "multiple_choice", question: "Choose: \"It's dark. Can you ___ the light?\"", options: ["turn on", "turn up", "turn into"], correctIndex: 0, explanation: "turn on = encender." },
        { type: "fill_blank", sentence: "I can't find my keys. I'm ___ them.", answers: ["looking for"], hint: "buscar (phrasal verb).", explanation: "look for = buscar." },
        { type: "find_error", question: "Encuentra el error.",
          segments: ["Please ", { u: "turn" }, " ", { u: "of" }, " the ", { u: "computer" }, " ", { u: "now" }, "."],
          correctIndex: 1, correction: "off (turn off = apagar)",
          explanation: "Es 'turn off' (con doble f), no 'turn of'." },
        { type: "translate", prompt: "Traduce: \"Nunca me rindo.\"", answers: ["i never give up", "i never give up.", "i don't give up"], explanation: "I never give up." }
      ]
    },

    /* ============================================================
     * ============================ B2 ============================
     * ============================================================ */

    "x3-b2-vocab-work": {
      lessonId: "x3-b2-vocab-work", level: "B2", track: "Vocabulario", topic: "work", skill: "vocab",
      title: "Vocabulario: el mundo laboral", xpReward: 60, mascotState: "explaining",
      explanation: {
        body: "Vocabulario de B2 sobre el trabajo: contratación, ascensos, plazos y reuniones. Muchas son colocaciones fijas: 'meet a deadline', 'apply for a job'. (Aprende los bloques, no solo las palabras sueltas.)",
        examples: [
          { en: "She applied for a managerial position.", es: "Solicitó un puesto directivo." },
          { en: "We need to meet the deadline.", es: "Tenemos que cumplir el plazo." }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Une el término con su traducción.", pairs: [
          { l: "deadline", r: "fecha límite" }, { l: "to hire", r: "contratar" },
          { l: "promotion", r: "ascenso" }, { l: "salary", r: "salario" },
          { l: "colleague", r: "colega" }, { l: "to resign", r: "dimitir" } ] },
        { type: "matching", instruction: "Une el verbo con su complemento (colocación).", pairs: [
          { l: "meet", r: "a deadline" }, { l: "apply for", r: "a job" },
          { l: "attend", r: "a meeting" }, { l: "give", r: "a presentation" } ] },
        { type: "multiple_choice", question: "Choose: \"He was ___ after only six months.\"", options: ["promoted", "promotion", "promote"], correctIndex: 0, explanation: "Pasiva: was promoted (fue ascendido)." },
        { type: "fill_blank", sentence: "I'd like to ___ for the marketing job.", answers: ["apply"], hint: "Solicitar (apply ___).", explanation: "apply for a job = solicitar un trabajo." },
        { type: "translate", prompt: "Traduce: \"Tenemos que cumplir el plazo el viernes.\"", answers: ["we have to meet the deadline on friday", "we must meet the deadline on friday"], explanation: "We have to meet the deadline on Friday." }
      ]
    },

    "x3-b2-vocab-media": {
      lessonId: "x3-b2-vocab-media", level: "B2", track: "Vocabulario", topic: "media", skill: "vocab",
      title: "Vocabulario: medios y noticias", xpReward: 60, mascotState: "explaining",
      explanation: {
        body: "Vocabulario de B2 sobre medios de comunicación, noticias y redes sociales. Incluye términos como 'headline', 'source', 'bias' y 'misinformation', clave para hablar de información hoy.",
        examples: [
          { en: "Always check your sources.", es: "Comprueba siempre tus fuentes." },
          { en: "The headline was misleading.", es: "El titular era engañoso." }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Une el término con su traducción.", pairs: [
          { l: "headline", r: "titular" }, { l: "source", r: "fuente" },
          { l: "bias", r: "sesgo" }, { l: "misinformation", r: "desinformación" },
          { l: "broadcast", r: "emisión" }, { l: "to go viral", r: "hacerse viral" } ] },
        { type: "categorize", instruction: "¿Información fiable o no fiable?", buckets: [
          { id: "r", label: "Reliable" }, { id: "u", label: "Unreliable" } ], items: [
          { t: "verified source", bucket: "r" }, { t: "rumour", bucket: "u" },
          { t: "fact-checked", bucket: "r" }, { t: "clickbait", bucket: "u" } ] },
        { type: "multiple_choice", question: "'Bias' in the news means...", options: ["a balanced view", "an unfair preference for one side", "breaking news"], correctIndex: 1, explanation: "bias = sesgo, parcialidad." },
        { type: "fill_blank", sentence: "Before sharing news, you should check the ___.", answers: ["source", "sources", "facts"], hint: "De dónde viene la información.", explanation: "source = fuente." },
        { type: "true_false", statement: "'Misinformation' means false or inaccurate information.", answer: true, explanation: "misinformation = información falsa o inexacta." }
      ]
    },

    "x3-b2-grammar-reported-speech": {
      lessonId: "x3-b2-grammar-reported-speech", level: "B2", track: "Gramática", topic: "grammar", skill: "grammar",
      title: "Estilo indirecto (reported speech)", xpReward: 62, mascotState: "explaining",
      explanation: {
        body: "En estilo indirecto, los tiempos suelen retroceder un paso: present simple → past simple, will → would, can → could. También cambian pronombres y referencias de tiempo (today → that day). Tras 'said' no se usa 'to'; tras 'told' sí va un objeto.",
        examples: [
          { en: "\"I am tired.\" → She said she was tired.", es: "\"Estoy cansada.\" → Dijo que estaba cansada." },
          { en: "\"I will call you.\" → He said he would call me.", es: "\"Te llamaré.\" → Dijo que me llamaría." }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "Report: \"I am busy.\" → She said she ___ busy.", options: ["is", "was", "will be"], correctIndex: 1, explanation: "present → past: is → was." },
        { type: "multiple_choice", question: "Report: \"I will help.\" → He said he ___ help.", options: ["will", "would", "won't"], correctIndex: 1, explanation: "will → would." },
        { type: "find_error", question: "Encuentra el error.",
          segments: ["She ", { u: "said" }, " ", { u: "me" }, " that she ", { u: "was" }, " ", { u: "leaving" }, "."],
          correctIndex: 1, correction: "told me / said to me",
          explanation: "'said' no lleva objeto directo: usa 'told me' o 'said that...'." },
        { type: "fill_blank", sentence: "\"I can swim.\" → He said he ___ swim.", answers: ["could"], hint: "can retrocede a...", explanation: "can → could." },
        { type: "translate", prompt: "Reporta: \"They live here.\" → They said they ___ here.", answers: ["lived"], explanation: "live → lived." },
        { type: "true_false", statement: "In reported speech, \"today\" often changes to \"that day\".", answer: true, explanation: "Las referencias de tiempo también cambian." }
      ]
    },

    "x3-b2-grammar-third-conditional": {
      lessonId: "x3-b2-grammar-third-conditional", level: "B2", track: "Gramática", topic: "grammar", skill: "grammar",
      title: "Tercer condicional", xpReward: 62, mascotState: "explaining",
      explanation: {
        body: "El tercer condicional habla del pasado imaginario (cosas que NO pasaron): If + past perfect (had + participio), + would have + participio. Sirve para arrepentimientos e hipótesis sobre el pasado.",
        examples: [
          { en: "If I had studied, I would have passed.", es: "Si hubiera estudiado, habría aprobado." },
          { en: "If she had left earlier, she wouldn't have missed the train.", es: "Si hubiera salido antes, no habría perdido el tren." }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "Choose: \"If we ___ left earlier, we would have arrived on time.\"", options: ["have", "had", "would have"], correctIndex: 1, explanation: "If + past perfect: had left." },
        { type: "find_error", question: "Encuentra el error.",
          segments: ["If I ", { u: "would" }, " ", { u: "have" }, " ", { u: "known" }, ", I would have ", { u: "helped" }, "."],
          correctIndex: 0, correction: "(quita 'would') If I had known",
          explanation: "En la parte del 'if' va 'had known', no 'would have'." },
        { type: "fill_blank", sentence: "If they had asked me, I ___ helped them.", answers: ["would have", "would've"], hint: "would + have + participio.", explanation: "would have helped." },
        { type: "word_order", words: ["If", "he", "had", "called", "I", "would", "have", "answered"], correctOrder: ["If", "he", "had", "called", "I", "would", "have", "answered"], hint: "If + had + participio, would have + participio." },
        { type: "translate", prompt: "Traduce: \"Si lo hubiera sabido, te lo habría dicho.\"", answers: ["if i had known i would have told you", "if i had known, i would have told you"], explanation: "If I had known, I would have told you." },
        { type: "true_false", statement: "The third conditional refers to imaginary situations in the past.", answer: true, explanation: "Habla de pasados que no ocurrieron." }
      ]
    },

    "x3-b2-read-remote-work": {
      lessonId: "x3-b2-read-remote-work", level: "B2", track: "Lectura", topic: "work", skill: "reading",
      title: "Lectura: The rise of remote work", xpReward: 62, mascotState: "explaining",
      explanation: {
        body: "Lectura de B2 sobre el teletrabajo. Practica idea principal, detalle, inferencia y vocabulario por contexto. El texto presenta ventajas y desventajas de forma equilibrada.",
        examples: [
          { en: "a double-edged sword", es: "un arma de doble filo" },
          { en: "work-life balance", es: "equilibrio entre vida y trabajo" }
        ]
      },
      exercises: [
        { type: "reading", title: "Working from home",
          passage: "Over the last few years, remote work has moved from being a rare privilege to a common arrangement. For many employees, the benefits are clear: no daily commute, more flexible hours and, often, a better work-life balance.\n\nHowever, remote work is something of a double-edged sword. Some workers report feeling isolated from their colleagues, and the line between professional and personal life can become blurred. Companies, meanwhile, worry about maintaining a strong team culture when staff rarely meet in person. The challenge for the future is not whether remote work will continue, but how to keep its advantages while reducing its drawbacks.",
          questions: [
            { q: "What is the main purpose of the text?", options: ["to argue that remote work should be banned", "to present both the benefits and the drawbacks of remote work", "to explain how to set up a home office"], correctIndex: 1, explanation: "Presenta ventajas y desventajas de forma equilibrada." },
            { q: "In the text, \"a double-edged sword\" suggests that remote work...", options: ["is completely positive", "has both good and bad sides", "is very dangerous"], correctIndex: 1, explanation: "Idiom: tiene ventajas e inconvenientes." },
            { q: "What worries companies according to the text?", options: ["the cost of office rent", "maintaining a strong team culture", "the price of computers"], correctIndex: 1, explanation: "\"...maintaining a strong team culture...\"" },
            { q: "What does the author suggest about the future?", options: ["Remote work will probably disappear.", "The question is how to keep the benefits and reduce the problems.", "Everyone will return to the office full time."], correctIndex: 1, explanation: "\"...how to keep its advantages while reducing its drawbacks.\"" }
          ] },
        { type: "matching", instruction: "Une la expresión con su traducción.", pairs: [
          { l: "commute", r: "desplazamiento al trabajo" }, { l: "drawback", r: "inconveniente" },
          { l: "blurred", r: "difuso" }, { l: "isolated", r: "aislado" } ] },
        { type: "true_false", statement: "The author believes remote work is entirely positive.", answer: false, explanation: "Lo describe como 'a double-edged sword'." }
      ]
    },

    "x3-b2-use-linkers": {
      lessonId: "x3-b2-use-linkers", level: "B2", track: "Inglés práctico", topic: "grammar", skill: "use",
      title: "Conectores para escribir mejor", xpReward: 60, mascotState: "explaining",
      explanation: {
        body: "Los conectores dan cohesión a tus textos: contraste (however, although), causa (because, since), consecuencia (therefore, so), adición (moreover, in addition). Cuidado con la puntuación: 'However,' va con coma; 'although' une dos oraciones.",
        examples: [
          { en: "It was raining; however, we went out.", es: "Llovía; sin embargo, salimos." },
          { en: "Although it was late, she kept working.", es: "Aunque era tarde, siguió trabajando." }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Une el conector con su función.", pairs: [
          { l: "however", r: "contraste" }, { l: "therefore", r: "consecuencia" },
          { l: "moreover", r: "adición" }, { l: "because", r: "causa" } ] },
        { type: "multiple_choice", question: "Choose: \"___ it was expensive, he bought it.\"", options: ["Although", "Therefore", "Moreover"], correctIndex: 0, explanation: "Although introduce contraste uniendo dos oraciones." },
        { type: "fill_blank", sentence: "The data was incomplete; ___, the report was delayed.", answers: ["therefore", "thus", "consequently"], hint: "Consecuencia.", explanation: "therefore = por lo tanto." },
        { type: "find_error", question: "Encuentra el error.",
          segments: ["She studied ", { u: "hard" }, ", ", { u: "however" }, " ", { u: "she" }, " ", { u: "failed" }, "."],
          correctIndex: 1, correction: "; however, (puntuación)",
          explanation: "'however' como conector necesita punto y coma antes y coma después: '...hard; however, she failed.'" },
        { type: "translate", prompt: "Traduce: \"Aunque estaba cansada, terminó el trabajo.\"", answers: ["although she was tired she finished the work", "although she was tired, she finished the work"], explanation: "Although she was tired, she finished the work." }
      ]
    },

    /* ============================================================
     * ============================ C1 ============================
     * ============================================================ */

    "x3-c1-vocab-academic": {
      lessonId: "x3-c1-vocab-academic", level: "C1", track: "Vocabulario", topic: "academic", skill: "vocab",
      title: "Vocabulario académico", xpReward: 68, mascotState: "explaining",
      explanation: {
        body: "Léxico académico de C1 para ensayos y presentaciones formales. Verbos como 'demonstrate', 'illustrate' o 'highlight' y sustantivos como 'implication' o 'criterion' elevan el registro. (Fíjate en plurales irregulares: criterion → criteria.)",
        examples: [
          { en: "The study highlights a key trend.", es: "El estudio destaca una tendencia clave." },
          { en: "There are several implications.", es: "Hay varias implicaciones." }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Une la palabra con su traducción.", pairs: [
          { l: "to highlight", r: "destacar" }, { l: "implication", r: "implicación" },
          { l: "to illustrate", r: "ilustrar" }, { l: "framework", r: "marco" },
          { l: "criteria", r: "criterios" }, { l: "to assess", r: "evaluar" } ] },
        { type: "multiple_choice", question: "Choose the more formal verb for \"to show\".", options: ["demonstrate", "do", "get"], correctIndex: 0, explanation: "demonstrate eleva el registro frente a 'show'." },
        { type: "multiple_choice", question: "What is the singular of \"criteria\"?", options: ["criterias", "criterion", "criteri"], correctIndex: 1, explanation: "criterion (sing.) → criteria (pl.)." },
        { type: "fill_blank", sentence: "The findings ___ a significant change in behaviour.", answers: ["highlight", "demonstrate", "reveal", "suggest"], hint: "Verbo académico para 'mostrar/indicar'.", explanation: "highlight/demonstrate/reveal son apropiados." },
        { type: "translate", prompt: "Traduce: \"Estos resultados tienen implicaciones importantes.\"", answers: ["these results have important implications", "these findings have important implications"], explanation: "These results have important implications." }
      ]
    },

    "x3-c1-vocab-idioms": {
      lessonId: "x3-c1-vocab-idioms", level: "C1", track: "Vocabulario", topic: "idioms", skill: "vocab",
      title: "Modismos comunes (idioms)", xpReward: 68, mascotState: "explaining",
      explanation: {
        body: "Los idioms son expresiones cuyo significado no es literal. Dominarlos hace que tu inglés suene natural: 'to break the ice', 'once in a blue moon', 'the ball is in your court'. (Apréndelos enteros y observa el contexto.)",
        examples: [
          { en: "Let's break the ice with a game.", es: "Rompamos el hielo con un juego." },
          { en: "It happens once in a blue moon.", es: "Pasa muy de vez en cuando." }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Une el modismo con su significado.", pairs: [
          { l: "break the ice", r: "romper el hielo" }, { l: "piece of cake", r: "muy fácil" },
          { l: "under the weather", r: "indispuesto" }, { l: "hit the books", r: "ponerse a estudiar" },
          { l: "cost an arm and a leg", r: "costar un ojo de la cara" }, { l: "call it a day", r: "dar por terminado" } ] },
        { type: "multiple_choice", question: "\"The exam was a piece of cake\" means it was...", options: ["very difficult", "very easy", "very long"], correctIndex: 1, explanation: "piece of cake = pan comido, muy fácil." },
        { type: "fill_blank", sentence: "I'm feeling a bit ___ the weather today.", answers: ["under"], hint: "Modismo: indispuesto.", explanation: "under the weather = sentirse mal." },
        { type: "multiple_choice", question: "\"It cost an arm and a leg\" means it was...", options: ["very cheap", "free", "very expensive"], correctIndex: 2, explanation: "Significa muy caro." },
        { type: "true_false", statement: "Idioms usually have a literal, word-for-word meaning.", answer: false, explanation: "Su significado es figurado, no literal." }
      ]
    },

    "x3-c1-grammar-inversion": {
      lessonId: "x3-c1-grammar-inversion", level: "C1", track: "Gramática", topic: "grammar", skill: "grammar",
      title: "Inversión enfática", xpReward: 70, mascotState: "explaining",
      explanation: {
        body: "Cuando una oración empieza por un adverbio negativo o restrictivo (Never, Rarely, Not only, No sooner, Hardly), se invierte el orden sujeto-auxiliar, como en una pregunta: 'Never have I seen such a thing'. Aporta énfasis y registro formal.",
        examples: [
          { en: "Never have I seen such a mess.", es: "Nunca he visto semejante desorden." },
          { en: "Not only did she sing, but she also danced.", es: "No solo cantó, sino que también bailó." }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "Choose: \"Never ___ I heard such a beautiful song.\"", options: ["have", "I have", "did have"], correctIndex: 0, explanation: "Inversión: Never have I heard..." },
        { type: "find_error", question: "Encuentra el error.",
          segments: ["Rarely ", { u: "she" }, " ", { u: "does" }, " ", { u: "complain" }, " about ", { u: "anything" }, "."],
          correctIndex: 0, correction: "does she (inversión)",
          explanation: "Tras 'Rarely' se invierte: 'Rarely does she complain'." },
        { type: "fill_blank", sentence: "Not only ___ he apologise, but he also paid for the damage.", answers: ["did"], hint: "Auxiliar para inversión en pasado.", explanation: "Not only did he apologise..." },
        { type: "word_order", words: ["No", "sooner", "had", "we", "arrived", "than", "it", "rained"], correctOrder: ["No", "sooner", "had", "we", "arrived", "than", "it", "rained"], hint: "No sooner + had + sujeto + participio + than..." },
        { type: "translate", prompt: "Traduce: \"Nunca había visto algo así.\" (con inversión)", answers: ["never had i seen anything like that", "never had i seen something like that"], explanation: "Never had I seen anything like that." },
        { type: "true_false", statement: "Inversion after negative adverbs adds emphasis and formality.", answer: true, explanation: "Sí, es un recurso enfático y formal." }
      ]
    },

    "x3-c1-grammar-cleft": {
      lessonId: "x3-c1-grammar-cleft", level: "C1", track: "Gramática", topic: "grammar", skill: "grammar",
      title: "Oraciones enfáticas (cleft sentences)", xpReward: 70, mascotState: "explaining",
      explanation: {
        body: "Las cleft sentences dividen una idea para enfatizar una parte. Con 'It is/was... that/who...': 'It was John who broke it'. Con 'What...': 'What I need is time'. Realzan información sin cambiar el significado básico.",
        examples: [
          { en: "It was in 2020 that everything changed.", es: "Fue en 2020 cuando todo cambió." },
          { en: "What surprised me was her honesty.", es: "Lo que me sorprendió fue su honestidad." }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "Emphasise the subject: \"Ana solved the problem.\"", options: ["It was Ana who solved the problem.", "It was the problem Ana solved.", "What Ana was the problem."], correctIndex: 0, explanation: "It was + sujeto + who: It was Ana who solved it." },
        { type: "fill_blank", sentence: "___ I really want is a holiday.", answers: ["What"], hint: "Cleft con 'What'.", explanation: "What I really want is a holiday." },
        { type: "find_error", question: "Encuentra el error.",
          segments: ["It ", { u: "was" }, " the ", { u: "noise" }, " ", { u: "what" }, " woke ", { u: "me" }, "."],
          correctIndex: 2, correction: "that (no 'what')",
          explanation: "Con 'It was...' se usa 'that': 'It was the noise that woke me.'" },
        { type: "word_order", words: ["What", "matters", "is", "your", "effort"], correctOrder: ["What", "matters", "is", "your", "effort"], hint: "What + verbo + is + ..." },
        { type: "translate", prompt: "Traduce con énfasis: \"Fue ella quien me ayudó.\"", answers: ["it was her who helped me", "it was she who helped me"], explanation: "It was she/her who helped me." },
        { type: "true_false", statement: "Cleft sentences are used to emphasise part of a sentence.", answer: true, explanation: "Sí, realzan una parte concreta." }
      ]
    },

    "x3-c1-read-ai": {
      lessonId: "x3-c1-read-ai", level: "C1", track: "Lectura", topic: "tech", skill: "reading",
      title: "Lectura: Artificial intelligence at work", xpReward: 70, mascotState: "explaining",
      explanation: {
        body: "Lectura de C1 sobre la inteligencia artificial en el trabajo. Texto argumentativo: identifica tesis, argumentos, matices y vocabulario por contexto. (Distingue afirmación de concesión.)",
        examples: [
          { en: "to augment rather than replace", es: "complementar en lugar de sustituir" },
          { en: "a nuanced view", es: "una visión matizada" }
        ]
      },
      exercises: [
        { type: "reading", title: "Augment, not replace",
          passage: "Debate about artificial intelligence often falls into two extremes: utopian promises that machines will solve all our problems, and dystopian fears that they will make human work obsolete. A more nuanced view, however, is gaining ground among researchers.\n\nAccording to this perspective, the most promising applications of AI are those that augment human capabilities rather than replace them. A doctor assisted by an algorithm that flags unusual scans, for instance, may reach more accurate diagnoses than either the doctor or the machine working alone. The key, advocates argue, lies not in automation for its own sake, but in thoughtful collaboration between human judgement and computational power.",
          questions: [
            { q: "What is the main argument of the text?", options: ["AI will inevitably replace human workers.", "AI is most valuable when it augments, rather than replaces, human abilities.", "AI is too dangerous to use at work."], correctIndex: 1, explanation: "La tesis es que la IA debe complementar al ser humano." },
            { q: "The phrase \"a more nuanced view\" contrasts with...", options: ["the two extreme positions mentioned before", "the opinion of doctors", "the use of algorithms"], correctIndex: 0, explanation: "Se opone a los dos extremos (utópico y distópico)." },
            { q: "In the text, \"augment\" most nearly means...", options: ["to replace completely", "to enhance or add to", "to ignore"], correctIndex: 1, explanation: "augment = mejorar, ampliar." },
            { q: "What does the doctor example illustrate?", options: ["that machines are always right", "that humans and AI together can outperform either alone", "that doctors should not use technology"], correctIndex: 1, explanation: "Ilustra la colaboración humano-máquina." }
          ] },
        { type: "matching", instruction: "Une la expresión con su traducción.", pairs: [
          { l: "nuanced", r: "matizado" }, { l: "to flag", r: "señalar" },
          { l: "obsolete", r: "obsoleto" }, { l: "judgement", r: "criterio" } ] },
        { type: "true_false", statement: "The author fully agrees with the dystopian fear that AI makes human work obsolete.", answer: false, explanation: "Defiende una visión matizada de complementariedad." }
      ]
    },

    "x3-c1-listen-lecture": {
      lessonId: "x3-c1-listen-lecture", level: "C1", track: "Listening", topic: "academic", skill: "listening",
      title: "Escucha: fragmentos de una conferencia", xpReward: 68, mascotState: "explaining",
      explanation: {
        body: "Escucha frases propias de una conferencia académica y señales del discurso (signposting): 'to begin with', 'in other words', 'to sum up'. Te ayudan a seguir la estructura de una charla.",
        examples: [
          { en: "To sum up, there are three key points.", es: "En resumen, hay tres puntos clave." },
          { en: "In other words, it depends on context.", es: "En otras palabras, depende del contexto." }
        ]
      },
      exercises: [
        { type: "listening", text: "To begin with, let me outline the main idea.", question: "¿Qué escuchaste?",
          options: ["To begin with, let me outline the main idea.", "To begin with, let me outline the main aim.", "To begin width, let me outline the main idea."], correctIndex: 0, explanation: "To begin with = para empezar." },
        { type: "listening", text: "In other words, the results were inconclusive.", question: "¿Qué escuchaste?",
          options: ["In other words, the results were inconclusive.", "In other words, the results were conclusive.", "In other worlds, the results were inconclusive."], correctIndex: 0, explanation: "inconclusive = no concluyente." },
        { type: "listening", text: "To sum up, further research is needed.", question: "Escribe lo que escuchaste:", answers: ["to sum up further research is needed", "to sum up, further research is needed"], explanation: "To sum up, further research is needed." },
        { type: "matching", instruction: "Une la señal del discurso con su función.", pairs: [
          { l: "to begin with", r: "introducir" }, { l: "in other words", r: "reformular" },
          { l: "to sum up", r: "resumir" }, { l: "for instance", r: "ejemplificar" } ] },
        { type: "multiple_choice", question: "Which phrase introduces a summary?", options: ["to sum up", "for instance", "to begin with"], correctIndex: 0, explanation: "to sum up = en resumen." }
      ]
    },

    /* ============================================================
     * ============================ C2 ============================
     * ============================================================ */

    "x3-c2-vocab-nuance": {
      lessonId: "x3-c2-vocab-nuance", level: "C2", track: "Vocabulario", topic: "nuance", skill: "vocab",
      title: "Vocabulario: matices y precisión", xpReward: 76, mascotState: "explaining",
      explanation: {
        body: "En C2 la clave es la precisión léxica: elegir la palabra exacta entre sinónimos cercanos. 'Meticulous' no es solo 'careful'; 'ubiquitous' va más allá de 'common'. Dominar estos matices distingue a un hablante experto.",
        examples: [
          { en: "a meticulous, painstaking analysis", es: "un análisis meticuloso y minucioso" },
          { en: "smartphones are now ubiquitous", es: "los smartphones son ahora omnipresentes" }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Une la palabra con su traducción precisa.", pairs: [
          { l: "meticulous", r: "meticuloso" }, { l: "ubiquitous", r: "omnipresente" },
          { l: "ephemeral", r: "efímero" }, { l: "candid", r: "franco" },
          { l: "tenacious", r: "tenaz" }, { l: "scrupulous", r: "escrupuloso" } ] },
        { type: "multiple_choice", question: "Which word best fits: \"a ___ remark\" (brutally honest)?", options: ["candid", "ubiquitous", "ephemeral"], correctIndex: 0, explanation: "candid = franco, sincero." },
        { type: "multiple_choice", question: "\"Ephemeral\" describes something that...", options: ["lasts forever", "lasts a very short time", "is extremely large"], correctIndex: 1, explanation: "ephemeral = efímero, breve." },
        { type: "fill_blank", sentence: "Plastic waste has become almost ___ in the oceans.", answers: ["ubiquitous"], hint: "Está por todas partes.", explanation: "ubiquitous = omnipresente." },
        { type: "translate", prompt: "Traduce: \"Hizo un trabajo meticuloso.\"", answers: ["she did a meticulous job", "he did a meticulous job", "they did a meticulous job"], explanation: "She/He did a meticulous job." }
      ]
    },

    "x3-c2-vocab-idioms-advanced": {
      lessonId: "x3-c2-vocab-idioms-advanced", level: "C2", track: "Vocabulario", topic: "idioms", skill: "vocab",
      title: "Modismos avanzados y registro", xpReward: 76, mascotState: "explaining",
      explanation: {
        body: "Modismos sofisticados que aparecen en prensa y discurso culto: 'a blessing in disguise', 'to bite the bullet', 'the elephant in the room'. Úsalos con criterio: encajan en registro informal-neutro, rara vez en escritura muy formal.",
        examples: [
          { en: "Losing that job was a blessing in disguise.", es: "Perder ese trabajo fue una bendición disfrazada." },
          { en: "We must address the elephant in the room.", es: "Debemos abordar el tema que todos evitan." }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Une el modismo con su significado.", pairs: [
          { l: "a blessing in disguise", r: "un mal que resulta bueno" }, { l: "to bite the bullet", r: "armarse de valor" },
          { l: "the elephant in the room", r: "el tema que todos evitan" }, { l: "to cut corners", r: "hacer chapuzas/atajos" },
          { l: "to jump on the bandwagon", r: "sumarse a la moda" }, { l: "to be on thin ice", r: "estar en terreno peligroso" } ] },
        { type: "multiple_choice", question: "\"To bite the bullet\" means to...", options: ["avoid a problem forever", "face something difficult with courage", "eat very quickly"], correctIndex: 1, explanation: "Significa afrontar algo difícil con decisión." },
        { type: "fill_blank", sentence: "Nobody wanted to mention it, but it was the ___ in the room.", answers: ["elephant"], hint: "El tema evidente que nadie menciona.", explanation: "the elephant in the room." },
        { type: "multiple_choice", question: "If a company \"cuts corners\", it...", options: ["does careful, thorough work", "saves time or money by lowering quality", "expands quickly"], correctIndex: 1, explanation: "cut corners = ahorrar a costa de la calidad." },
        { type: "true_false", statement: "Highly idiomatic expressions are usually best avoided in very formal academic writing.", answer: true, explanation: "En registro muy formal conviene moderarlos." }
      ]
    },

    "x3-c2-grammar-subjunctive": {
      lessonId: "x3-c2-grammar-subjunctive", level: "C2", track: "Gramática", topic: "grammar", skill: "grammar",
      title: "El subjuntivo y estructuras formales", xpReward: 78, mascotState: "explaining",
      explanation: {
        body: "El subjuntivo en inglés es sutil. Tras verbos de exigencia o sugerencia (demand, suggest, insist, recommend) se usa el infinitivo sin 'to' para todas las personas: 'I suggest that he be present'. También aparece en expresiones fijas: 'Be that as it may', 'If I were you'.",
        examples: [
          { en: "The board demanded that he resign.", es: "La junta exigió que dimitiera." },
          { en: "It is essential that she be informed.", es: "Es esencial que sea informada." }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "Choose: \"I suggest that he ___ on time.\"", options: ["is", "be", "will be"], correctIndex: 1, explanation: "Subjuntivo tras 'suggest that': base form 'be'." },
        { type: "find_error", question: "Encuentra el error.",
          segments: ["The doctor ", { u: "recommended" }, " that she ", { u: "takes" }, " the ", { u: "medicine" }, " ", { u: "daily" }, "."],
          correctIndex: 1, correction: "take (subjuntivo, sin -s)",
          explanation: "Tras 'recommend that' se usa la forma base 'take', sin -s." },
        { type: "fill_blank", sentence: "It is vital that every student ___ aware of the rules.", answers: ["be"], hint: "Subjuntivo tras 'It is vital that...'.", explanation: "...that every student be aware..." },
        { type: "multiple_choice", question: "Complete the fixed expression: \"___ that as it may, we must continue.\"", options: ["Be", "Is", "Was"], correctIndex: 0, explanation: "Expresión fija: 'Be that as it may'." },
        { type: "translate", prompt: "Traduce: \"Insistieron en que estuviera presente.\"", answers: ["they insisted that he be present", "they insisted that she be present"], explanation: "They insisted that he/she be present." },
        { type: "true_false", statement: "After \"demand that\", the verb takes its base form for all persons.", answer: true, explanation: "Sí: 'demand that he resign' (no 'resigns')." }
      ]
    },

    "x3-c2-grammar-discourse": {
      lessonId: "x3-c2-grammar-discourse", level: "C2", track: "Gramática", topic: "grammar", skill: "grammar",
      title: "Marcadores del discurso y matiz", xpReward: 78, mascotState: "explaining",
      explanation: {
        body: "En C2 importa el matiz: marcadores como 'admittedly' (hay que reconocerlo), 'conversely' (a la inversa), 'notwithstanding' (a pesar de) y 'arguably' (posiblemente, se podría decir) afinan tu postura y suenan a hablante experto.",
        examples: [
          { en: "Admittedly, the plan has flaws.", es: "Hay que reconocer que el plan tiene fallos." },
          { en: "It is, arguably, the best solution.", es: "Es, podría decirse, la mejor solución." }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Une el marcador con su matiz.", pairs: [
          { l: "admittedly", r: "hay que reconocerlo" }, { l: "conversely", r: "a la inversa" },
          { l: "arguably", r: "podría decirse" }, { l: "notwithstanding", r: "a pesar de" },
          { l: "by and large", r: "en general" }, { l: "nonetheless", r: "no obstante" } ] },
        { type: "multiple_choice", question: "Choose: \"___, the policy did reduce costs, though not by much.\"", options: ["Admittedly", "Conversely", "Notwithstanding"], correctIndex: 0, explanation: "Admittedly concede un punto." },
        { type: "fill_blank", sentence: "Sales rose in the north; ___, they fell in the south.", answers: ["conversely"], hint: "Indica lo contrario.", explanation: "conversely = a la inversa." },
        { type: "multiple_choice", question: "\"Arguably the finest novel of the decade\" suggests the claim is...", options: ["an undisputed fact", "a defensible opinion", "definitely false"], correctIndex: 1, explanation: "arguably matiza: opinión defendible." },
        { type: "translate", prompt: "Traduce: \"A pesar de las críticas, el proyecto siguió adelante.\"", answers: ["notwithstanding the criticism the project went ahead", "despite the criticism the project went ahead"], explanation: "Notwithstanding the criticism, the project went ahead." },
        { type: "true_false", statement: "\"Arguably\" softens a claim into a defensible opinion.", answer: true, explanation: "Sí, indica que algo se puede sostener, sin afirmarlo como hecho." }
      ]
    },

    "x3-c2-read-philosophy": {
      lessonId: "x3-c2-read-philosophy", level: "C2", track: "Lectura", topic: "society", skill: "reading",
      title: "Lectura: The paradox of choice", xpReward: 78, mascotState: "explaining",
      explanation: {
        body: "Lectura densa de C2 sobre la paradoja de la elección. Texto argumentativo con vocabulario abstracto. Identifica tesis, contraintuición, evidencia y matiz. (Atención a la ironía y a las concesiones.)",
        examples: [
          { en: "counterintuitive findings", es: "hallazgos contraintuitivos" },
          { en: "diminishing returns", es: "rendimientos decrecientes" }
        ]
      },
      exercises: [
        { type: "reading", title: "When more is less",
          passage: "We tend to assume that more choice is always better: the wider the range of options, the more likely we are to find what suits us, and the freer we feel. Yet a body of research in psychology suggests a more counterintuitive conclusion. Beyond a certain point, an abundance of options can paralyse rather than liberate.\n\nWhen confronted with dozens of nearly identical alternatives, consumers often experience what has been termed 'choice overload': they postpone deciding, feel less satisfied with whatever they eventually pick, and are more prone to regret. This is not an argument for abolishing choice, but a reminder that freedom and well-being do not increase indefinitely with the number of options. There are, it seems, diminishing returns even to liberty.",
          questions: [
            { q: "Which statement best captures the author's thesis?", options: ["More choice always makes people happier.", "Beyond a point, more choice can reduce satisfaction and well-being.", "Choice should be abolished entirely."], correctIndex: 1, explanation: "La tesis es que el exceso de opciones puede reducir el bienestar." },
            { q: "The word \"counterintuitive\" signals that the conclusion...", options: ["confirms what we expect", "goes against our usual assumptions", "is impossible to prove"], correctIndex: 1, explanation: "counterintuitive = contrario a la intuición." },
            { q: "What is 'choice overload' according to the text?", options: ["the joy of having many options", "a state where too many options hinder decision and satisfaction", "a lack of any options at all"], correctIndex: 1, explanation: "Es la parálisis y menor satisfacción ante demasiadas opciones." },
            { q: "The phrase \"diminishing returns even to liberty\" implies that...", options: ["liberty has no value", "the benefits of more freedom eventually level off or decline", "liberty always increases happiness"], correctIndex: 1, explanation: "Los beneficios adicionales de más libertad decrecen." }
          ] },
        { type: "matching", instruction: "Une la expresión con su traducción.", pairs: [
          { l: "counterintuitive", r: "contraintuitivo" }, { l: "to paralyse", r: "paralizar" },
          { l: "abundance", r: "abundancia" }, { l: "prone to", r: "propenso a" } ] },
        { type: "true_false", statement: "The author argues that choice should be completely abolished.", answer: false, explanation: "Aclara: 'This is not an argument for abolishing choice.'" }
      ]
    },

    "x3-c2-use-register": {
      lessonId: "x3-c2-use-register", level: "C2", track: "Inglés práctico", topic: "style", skill: "use",
      title: "Registro y estilo: formal vs. informal", xpReward: 78, mascotState: "explaining",
      explanation: {
        body: "Un hablante de C2 ajusta el registro al contexto. Lo formal evita contracciones y phrasal verbs, prefiere latinismos ('purchase' vs 'buy', 'require' vs 'need') y voz pasiva. Lo informal es directo y coloquial. La clave es la coherencia: no mezclar registros.",
        examples: [
          { en: "Formal: We regret to inform you that...", es: "Lamentamos comunicarle que..." },
          { en: "Informal: Sorry, but...", es: "Lo siento, pero..." }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Une la palabra informal con su equivalente formal.", pairs: [
          { l: "buy", r: "purchase" }, { l: "need", r: "require" },
          { l: "get", r: "obtain" }, { l: "help", r: "assist" },
          { l: "ask for", r: "request" }, { l: "find out", r: "ascertain" } ] },
        { type: "categorize", instruction: "¿Registro formal o informal?", buckets: [
          { id: "f", label: "Formal" }, { id: "i", label: "Informal" } ], items: [
          { t: "Furthermore,", bucket: "f" }, { t: "Anyway,", bucket: "i" },
          { t: "We regret to inform you", bucket: "f" }, { t: "Gonna grab a coffee", bucket: "i" },
          { t: "Should you require assistance", bucket: "f" }, { t: "No worries", bucket: "i" } ] },
        { type: "multiple_choice", question: "Choose the more formal option.", options: ["I want to ask for a refund.", "I would like to request a refund.", "Gimme my money back."], correctIndex: 1, explanation: "'would like to request' es lo más formal." },
        { type: "find_error", question: "Encuentra la incoherencia de registro.",
          segments: ["We ", { u: "regret" }, " to ", { u: "inform" }, " you that we ", { u: "can't" }, " ", { u: "help" }, "."],
          correctIndex: 2, correction: "cannot / are unable to (evita contracción en formal)",
          explanation: "En registro formal se evita la contracción 'can't': usa 'cannot' o 'are unable to'." },
        { type: "translate", prompt: "Reescribe en formal: \"We need to get your details.\"", answers: ["we require your details", "we are required to obtain your details", "we need to obtain your details"], explanation: "P. ej.: 'We require your details.'" }
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
        { type: "multiple_choice", question: "You hit your finger. You say:", options: ["Hooray!", "Ouch!", "Yuck!"], correctIndex: 1, explanation: "'Ouch!' expresa dolor (¡Ay!)." },
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
        { type: "multiple_choice", question: "Choose: \"I was hungry, ___ I made a sandwich.\"", options: ["because", "but", "so"], correctIndex: 2, explanation: "Consecuencia: tenía hambre, por eso (so) hice un sándwich." },
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
      lessonId: "x3-b1-grammar-conjunctions", level: "B1", track: "Gramática", topic: "grammar", skill: "grammar",
      title: "Conjunciones subordinantes", xpReward: 54, mascotState: "explaining",
      explanation: {
        body: "Las conjunciones subordinantes conectan una oración principal con una subordinada: although/though (aunque), while (mientras/aunque), unless (a menos que), since/as (ya que), so that (para que), as soon as (en cuanto). Pueden ir al principio (con coma) o en medio: 'Although it was late, she worked' = 'She worked although it was late'.",
        examples: [
          { en: "Although it was raining, we went out.", es: "Aunque llovía, salimos." },
          { en: "I'll wait unless you tell me to leave.", es: "Esperaré a menos que me digas que me vaya." },
          { en: "Call me as soon as you arrive.", es: "Llámame en cuanto llegues." }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Une la conjunción con su traducción.", pairs: [
          { l: "although", r: "aunque" }, { l: "unless", r: "a menos que" },
          { l: "while", r: "mientras" }, { l: "since", r: "ya que" },
          { l: "so that", r: "para que" }, { l: "as soon as", r: "en cuanto" } ] },
        { type: "multiple_choice", question: "Choose: \"___ he was tired, he finished the report.\"", options: ["Although", "So that", "Unless"], correctIndex: 0, explanation: "Contraste: aunque estaba cansado (Although)." },
        { type: "multiple_choice", question: "Choose: \"You'll miss the bus ___ you hurry.\"", options: ["although", "unless", "since"], correctIndex: 1, explanation: "unless = a menos que (condición negativa)." },
        { type: "fill_blank", sentence: "She spoke slowly ___ everyone could understand.", answers: ["so that"], hint: "Indica propósito (para que).", explanation: "so that = para que (propósito)." },
        { type: "find_error", question: "Encuentra el error.",
          segments: ["Although ", { u: "it" }, " ", { u: "was" }, " expensive, ", { u: "but" }, " he ", { u: "bought" }, " it."],
          correctIndex: 2, correction: "(quita 'but')",
          explanation: "Con 'although' NO se usa 'but' en la misma frase: o 'Although... , he bought it' o 'It was expensive, but he bought it'." },
        { type: "translate", prompt: "Traduce: \"En cuanto termine, te llamaré.\"", answers: ["as soon as i finish i'll call you", "as soon as i finish, i'll call you", "as soon as i finish i will call you"], explanation: "As soon as I finish, I'll call you." }
      ]
    },

    /* ---------- Preposiciones dependientes (B1) ---------- */
    "x3-b1-grammar-dependent-prep": {
      lessonId: "x3-b1-grammar-dependent-prep", level: "B1", track: "Gramática", topic: "grammar", skill: "grammar",
      title: "Preposiciones dependientes (good at, interested in...)", xpReward: 54, mascotState: "explaining",
      explanation: {
        body: "Muchos adjetivos y verbos van seguidos SIEMPRE de una preposición fija que hay que memorizar: good at (bueno en), interested in (interesado en), afraid of (asustado de), depend on (depender de), listen to (escuchar), look for (buscar). Si va un verbo después, se usa la forma -ing: 'interested in learning'.",
        examples: [
          { en: "She is good at maths.", es: "Es buena en matemáticas." },
          { en: "I'm interested in learning Japanese.", es: "Me interesa aprender japonés." },
          { en: "It depends on the weather.", es: "Depende del tiempo." }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Une la expresión con su preposición correcta.", pairs: [
          { l: "good ___ (skilled)", r: "at" }, { l: "interested ___", r: "in" },
          { l: "afraid ___", r: "of" }, { l: "depend ___", r: "on" },
          { l: "listen ___", r: "to" }, { l: "married ___", r: "to" } ] },
        { type: "multiple_choice", question: "Choose: \"He is afraid ___ spiders.\"", options: ["of", "to", "at"], correctIndex: 0, explanation: "afraid of = tener miedo de." },
        { type: "multiple_choice", question: "Choose: \"I'm interested ___ history.\"", options: ["on", "in", "at"], correctIndex: 1, explanation: "interested in = interesado en." },
        { type: "fill_blank", sentence: "Are you good ___ playing the guitar?", answers: ["at"], hint: "good ___ (habilidad).", explanation: "good at + -ing = bueno en hacer algo." },
        { type: "find_error", question: "Encuentra el error.",
          segments: ["Success ", { u: "depends" }, " ", { u: "of" }, " ", { u: "hard" }, " ", { u: "work" }, "."],
          correctIndex: 1, correction: "on (depend on)",
          explanation: "Es 'depend ON', no 'depend of'." },
        { type: "translate", prompt: "Traduce: \"Estoy buscando mis llaves.\"", answers: ["i'm looking for my keys", "i am looking for my keys"], explanation: "I'm looking for my keys (look for = buscar)." }
      ]
    },

    /* ---------- Interjecciones de reacción (B1) ---------- */
    "x3-b1-vocab-interjections2": {
      lessonId: "x3-b1-vocab-interjections2", level: "B1", track: "Vocabulario", topic: "social", skill: "vocab",
      title: "Interjecciones en conversación", xpReward: 52, mascotState: "explaining",
      explanation: {
        body: "En la conversación real usamos interjecciones para reaccionar con naturalidad: No way! (¡No me digas!), You're kidding! (¡Es broma!), Phew! (¡uf!, alivio), Ugh! (fastidio), Yikes! (susto), Oh well (qué le vamos a hacer), Well... (para dudar/empezar). Suenan muy naturales y propias de hablantes nativos.",
        examples: [
          { en: "No way! I can't believe it!", es: "¡No me digas! ¡No me lo puedo creer!" },
          { en: "Phew! That was close.", es: "¡Uf! Por poco." },
          { en: "Oh well, maybe next time.", es: "Bueno, será la próxima." }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Une la interjección con su sentido.", pairs: [
          { l: "No way!", r: "¡No me digas!" }, { l: "Phew!", r: "alivio (¡uf!)" },
          { l: "Yikes!", r: "susto" }, { l: "Ugh!", r: "fastidio/asco" },
          { l: "Oh well", r: "resignación" }, { l: "You're kidding!", r: "¡es broma!" } ] },
        { type: "multiple_choice", question: "You just avoided an accident. You say:", options: ["Phew!", "Hooray!", "Ugh!"], correctIndex: 0, explanation: "'Phew!' expresa alivio." },
        { type: "multiple_choice", question: "A friend shares shocking news. You react:", options: ["Oh well.", "No way!", "Shh!"], correctIndex: 1, explanation: "'No way!' expresa sorpresa o incredulidad." },
        { type: "fill_blank", sentence: "___ well, we can try again tomorrow.", answers: ["oh"], hint: "Resignación: '___ well'.", explanation: "Oh well = expresa resignación ('qué le vamos a hacer')." },
        { type: "categorize", instruction: "¿Reacción de sorpresa o de alivio/resignación?", buckets: [
          { id: "s", label: "Surprise" }, { id: "r", label: "Relief/Resignation" } ], items: [
          { t: "No way!", bucket: "s" }, { t: "Phew!", bucket: "r" },
          { t: "You're kidding!", bucket: "s" }, { t: "Oh well", bucket: "r" } ] },
        { type: "true_false", statement: "Interjections like \"No way!\" make spoken English sound more natural.", answer: true, explanation: "Sí, son muy típicas del habla cotidiana." }
      ]
    }

  };

  /* Orden de aparición por nivel (la progresión real la calcula vesper_path.js). */
  var ORDER = [
    /* A1 */ "x3-a1-vocab-food", "x3-a1-vocab-body", "x3-a1-grammar-there-is",
             "x3-a1-grammar-can", "x3-a1-read-myday", "x3-a1-listen-greetings", "x3-a1-vocab-time",
             "x3-a1-grammar-prep-place", "x3-a1-vocab-interjections",
    /* A2 */ "x3-a2-vocab-jobs", "x3-a2-vocab-weather", "x3-a2-grammar-going-to",
             "x3-a2-grammar-adverbs-freq", "x3-a2-read-market", "x3-a2-listen-directions", "x3-a2-use-restaurant",
             "x3-a2-grammar-prep-time", "x3-a2-grammar-conjunctions",
    /* B1 */ "x3-b1-vocab-health", "x3-b1-vocab-technology", "x3-b1-grammar-second-conditional",
             "x3-b1-grammar-passive", "x3-b1-read-environment", "x3-b1-listen-interview", "x3-b1-use-phrasal-verbs",
             "x3-b1-grammar-conjunctions", "x3-b1-grammar-dependent-prep", "x3-b1-vocab-interjections2",
    /* B2 */ "x3-b2-vocab-work", "x3-b2-vocab-media", "x3-b2-grammar-reported-speech",
             "x3-b2-grammar-third-conditional", "x3-b2-read-remote-work", "x3-b2-use-linkers",
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
