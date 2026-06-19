/* =====================================================================
 * VESPER · LEVELS PACK  (refuerzo de niveles base A1 · A2 · B1)
 * ---------------------------------------------------------------------
 * Amplía los mundos inferiores del sendero con lecciones nuevas de
 * gramática, vocabulario y lectura, con dificultad acorde a cada nivel:
 *   - A1: verbo to be, artículos, plurales, presente simple. Frases muy
 *         cortas; lecturas de 4-5 oraciones.
 *   - A2: pasado simple, was/were, comparativos, much/many. Lecturas
 *         breves en pasado.
 *   - B1: present perfect, since/for, primer condicional, relativos.
 *         Lecturas de longitud media con vocabulario en contexto.
 *
 * Incluye el nuevo tipo de ejercicio `find_error` (encontrar el error),
 * con errores apropiados a cada nivel. Reutiliza los renderers que ya
 * tiene leccion.html: reading · multiple_choice · fill_blank · true_false
 * matching · categorize · translate · word_order · find_error.
 *
 * Se fusiona en VESPER_LESSONS via VESPER_LEVELS_PACK.merge(). La
 * progresión por nivel la gestiona vesper_path.js (escaleras por destreza).
 * ===================================================================== */
window.VESPER_LEVELS_PACK = (function () {

  var L = {

    /* ============================ A1 ============================ */

    "lvl-a1-grammar-basics": {
      lessonId: "lvl-a1-grammar-basics", level: "A1", track: "Gramática", topic: "grammar", skill: "grammar",
      title: "Gramática básica: to be y presente", xpReward: 34, mascotState: "explaining",
      explanation: {
        body: "Lo esencial de A1: el verbo 'to be' (am/is/are), los artículos a/an y el presente simple. Recuerda: con he/she/it el verbo lleva -s (he plays). (Lee la frase con calma y elige la forma correcta.)",
        examples: [
          { en: "I am a student. She is happy.", es: "Soy estudiante. Ella está feliz." },
          { en: "He plays football every day.", es: "Él juega al fútbol todos los días." },
          { en: "an apple / a book", es: "una manzana / un libro" }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "Choose the correct form: \"She ___ my teacher.\"", options: ["am", "is", "are"], correctIndex: 1, explanation: "Con he/she/it usamos 'is'." },
        { type: "multiple_choice", question: "Choose the correct article: \"I have ___ apple.\"", options: ["a", "an", "the"], correctIndex: 1, explanation: "'apple' empieza por sonido vocálico: 'an apple'." },
        { type: "find_error", question: "Encuentra el error.",
          segments: ["My sister ", { u: "have" }, " a ", { u: "small" }, " ", { u: "dog" }, " at ", { u: "home" }, "."],
          correctIndex: 0, correction: "has (he/she/it -> has)",
          explanation: "Con 'my sister' (= she) el verbo es 'has', no 'have'." },
        { type: "find_error", question: "Encuentra el error.",
          segments: ["He ", { u: "go" }, " to ", { u: "school" }, " ", { u: "every" }, " ", { u: "day" }, "."],
          correctIndex: 0, correction: "goes (he/she/it + -es)",
          explanation: "En presente simple, con 'he' el verbo lleva -es: 'goes'." },
        { type: "fill_blank", sentence: "I ___ from Mexico.", answers: ["am"], hint: "I + ___.", explanation: "Con 'I' usamos 'am'." },
        { type: "true_false", statement: "We say \"an apple\" because \"apple\" starts with a vowel sound.", answer: true, explanation: "Antes de sonido vocálico se usa 'an'." },
        { type: "word_order", words: ["They", "are", "my", "friends"], correctOrder: ["They", "are", "my", "friends"], hint: "Sujeto + are + ..." }
      ]
    },

    "lvl-a1-vocab-everyday": {
      lessonId: "lvl-a1-vocab-everyday", level: "A1", track: "Vocabulario", topic: "dailylife", skill: "vocab",
      title: "Vocabulario: familia y colores", xpReward: 32, mascotState: "explaining",
      explanation: {
        body: "Vocabulario cotidiano de A1: la familia y los colores. Practica reconocer las palabras y agruparlas. (Asocia, clasifica y completa.)",
        examples: [
          { en: "mother, father, brother, sister", es: "madre, padre, hermano, hermana" },
          { en: "red, blue, green, yellow", es: "rojo, azul, verde, amarillo" }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Une la palabra con su traducción.", pairs: [
          { l: "mother", r: "madre" }, { l: "brother", r: "hermano" },
          { l: "daughter", r: "hija" }, { l: "grandfather", r: "abuelo" }
        ] },
        { type: "categorize", instruction: "¿Es una persona de la familia o un color?", buckets: [
          { id: "f", label: "Family" }, { id: "c", label: "Colour" } ], items: [
          { t: "sister", bucket: "f" }, { t: "green", bucket: "c" },
          { t: "father", bucket: "f" }, { t: "yellow", bucket: "c" },
          { t: "uncle", bucket: "f" }, { t: "purple", bucket: "c" } ] },
        { type: "multiple_choice", question: "What colour do you get from blue + yellow?", options: ["red", "green", "black"], correctIndex: 1, explanation: "Azul + amarillo = verde (green)." },
        { type: "fill_blank", sentence: "My father's father is my ___.", answers: ["grandfather", "grandpa"], hint: "El padre de tu padre.", explanation: "grandfather = abuelo." },
        { type: "translate", prompt: "Traduce: \"Mi hermana tiene un gato negro.\"", answers: ["my sister has a black cat"], explanation: "My sister has a black cat." }
      ]
    },

    "lvl-a1-read-ana": {
      lessonId: "lvl-a1-read-ana", level: "A1", track: "Lectura", topic: "dailylife", skill: "reading",
      title: "Lectura: My family", xpReward: 34, mascotState: "explaining",
      explanation: {
        body: "Tu primera lectura de A1: un texto muy corto en presente. Léelo dos veces y responde preguntas sencillas de detalle. (Las respuestas están en el texto.)",
        examples: [
          { en: "I live with my family.", es: "Vivo con mi familia." },
          { en: "Its name is Luna.", es: "Se llama Luna." }
        ]
      },
      exercises: [
        { type: "reading", title: "My name is Ana",
          passage: "My name is Ana. I am ten years old. I live in a small house with my mother, my father and my brother. We have a cat. Its name is Luna. Luna is white and very friendly. Every evening, I play with Luna in the garden.",
          questions: [
            { q: "How old is Ana?", options: ["eight", "ten", "twelve"], correctIndex: 1, explanation: "\"I am ten years old.\"" },
            { q: "Who does Ana live with?", options: ["her friends", "her family", "alone"], correctIndex: 1, explanation: "\"...with my mother, my father and my brother.\"" },
            { q: "What colour is the cat?", options: ["black", "grey", "white"], correctIndex: 2, explanation: "\"Luna is white...\"" }
          ] },
        { type: "find_error", question: "Encuentra el error.",
          segments: ["Ana ", { u: "play" }, " with ", { u: "her" }, " ", { u: "cat" }, " every ", { u: "evening" }, "."],
          correctIndex: 0, correction: "plays (Ana = she -> plays)",
          explanation: "Con 'Ana' (= she) el verbo lleva -s: 'plays'." },
        { type: "true_false", statement: "Luna the cat is friendly.", answer: true, explanation: "\"Luna is white and very friendly.\"" },
        { type: "fill_blank", sentence: "Ana plays with Luna in the ___.", answers: ["garden"], hint: "El lugar al final del texto.", explanation: "\"...in the garden.\"" }
      ]
    },

    /* ============================ A2 ============================ */

    "lvl-a2-grammar-past": {
      lessonId: "lvl-a2-grammar-past", level: "A2", track: "Gramática", topic: "grammar", skill: "grammar",
      title: "Pasado simple y comparativos", xpReward: 44, mascotState: "explaining",
      explanation: {
        body: "A2: el pasado simple (regular: -ed; irregular: go->went) y los comparativos (tall->taller, big->bigger). Recuerda: 'was' para I/he/she/it y 'were' para you/we/they. (Cuidado con los verbos irregulares.)",
        examples: [
          { en: "Yesterday I went to the cinema.", es: "Ayer fui al cine." },
          { en: "She is taller than her brother.", es: "Ella es más alta que su hermano." },
          { en: "There were many people.", es: "Había mucha gente." }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "Choose the past simple: \"Yesterday I ___ to the cinema.\"", options: ["go", "went", "gone"], correctIndex: 1, explanation: "Pasado de 'go' = 'went'." },
        { type: "multiple_choice", question: "Choose the comparative: \"She is ___ than her brother.\"", options: ["tall", "taller", "tallest"], correctIndex: 1, explanation: "Comparativo: 'taller than'." },
        { type: "find_error", question: "Encuentra el error.",
          segments: ["Last weekend we ", { u: "goed" }, " to the ", { u: "beach" }, " and ", { u: "swam" }, " in the ", { u: "sea" }, "."],
          correctIndex: 0, correction: "went ('go' es irregular)",
          explanation: "'go' es irregular: su pasado es 'went', no 'goed'." },
        { type: "find_error", question: "Encuentra el error.",
          segments: ["There ", { u: "was" }, " many ", { u: "people" }, " at the ", { u: "party" }, " last ", { u: "night" }, "."],
          correctIndex: 0, correction: "were (many people = plural)",
          explanation: "Con un sujeto plural ('many people') se usa 'There were'." },
        { type: "fill_blank", sentence: "She ___ (be) very happy yesterday.", answers: ["was"], hint: "she + pasado de 'be'.", explanation: "Con 'she' en pasado: 'was'." },
        { type: "true_false", statement: "The past simple of \"buy\" is \"buyed\".", answer: false, explanation: "Es irregular: el pasado de 'buy' es 'bought'." },
        { type: "word_order", words: ["I", "did", "not", "see", "him", "yesterday"], correctOrder: ["I", "did", "not", "see", "him", "yesterday"], hint: "Negativo en pasado: did + not + verbo base." }
      ]
    },

    "lvl-a2-vocab-routines": {
      lessonId: "lvl-a2-vocab-routines", level: "A2", track: "Vocabulario", topic: "dailylife", skill: "vocab",
      title: "Vocabulario: rutina y comida", xpReward: 42, mascotState: "explaining",
      explanation: {
        body: "Vocabulario de A2: la rutina diaria y la comida. Aprende colocaciones útiles como 'have breakfast' o 'go to bed'. (Asocia, clasifica y traduce.)",
        examples: [
          { en: "I have breakfast at seven.", es: "Desayuno a las siete." },
          { en: "She goes to bed late.", es: "Ella se acuesta tarde." }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Une el verbo con la palabra que lo acompaña.", pairs: [
          { l: "have", r: "breakfast" }, { l: "brush", r: "your teeth" },
          { l: "go", r: "to bed" }, { l: "take", r: "a shower" }
        ] },
        { type: "categorize", instruction: "¿Es comida o una actividad diaria?", buckets: [
          { id: "fd", label: "Food" }, { id: "ac", label: "Daily activity" } ], items: [
          { t: "rice", bucket: "fd" }, { t: "get up", bucket: "ac" },
          { t: "cheese", bucket: "fd" }, { t: "wash the dishes", bucket: "ac" },
          { t: "bread", bucket: "fd" }, { t: "go to work", bucket: "ac" } ] },
        { type: "multiple_choice", question: "Which verb fits: \"I ___ a shower in the morning.\"", options: ["do", "take", "make"], correctIndex: 1, explanation: "Colocación: 'take a shower'." },
        { type: "fill_blank", sentence: "We have ___ at 8 a.m. before work. (la primera comida del día)", answers: ["breakfast"], hint: "El desayuno.", explanation: "'have breakfast' = desayunar." },
        { type: "translate", prompt: "Traduce: \"Ella se acuesta tarde.\"", answers: ["she goes to bed late"], explanation: "She goes to bed late." }
      ]
    },

    "lvl-a2-read-holiday": {
      lessonId: "lvl-a2-read-holiday", level: "A2", track: "Lectura", topic: "travel", skill: "reading",
      title: "Lectura: A holiday in the mountains", xpReward: 44, mascotState: "explaining",
      explanation: {
        body: "Lectura de A2 en pasado. Fíjate en los verbos en pasado y responde sobre los detalles de la historia. (Busca la evidencia en el texto.)",
        examples: [
          { en: "We stayed in a small cabin.", es: "Nos quedamos en una cabaña pequeña." },
          { en: "It was the best holiday of my life.", es: "Fueron las mejores vacaciones de mi vida." }
        ]
      },
      exercises: [
        { type: "reading", title: "Our trip to the mountains",
          passage: "Last summer, my family went to the mountains for a week. The weather was sunny and warm. We stayed in a small wooden cabin near a lake. Every morning we walked in the forest, and in the afternoon we swam in the cold lake. One day, we saw a family of deer. It was the best holiday of my life.",
          questions: [
            { q: "Where did the family go?", options: ["to the beach", "to the mountains", "to the city"], correctIndex: 1, explanation: "\"...went to the mountains for a week.\"" },
            { q: "How was the weather?", options: ["cold and rainy", "sunny and warm", "windy"], correctIndex: 1, explanation: "\"The weather was sunny and warm.\"" },
            { q: "What did they see one day?", options: ["a family of deer", "a bear", "a boat"], correctIndex: 0, explanation: "\"...we saw a family of deer.\"" }
          ] },
        { type: "find_error", question: "Encuentra el error.",
          segments: ["Last summer my family ", { u: "go" }, " to the ", { u: "mountains" }, " for a ", { u: "week" }, " in ", { u: "July" }, "."],
          correctIndex: 0, correction: "went (acción terminada en el pasado)",
          explanation: "'Last summer' indica pasado: el verbo debe ir en pasado ('went')." },
        { type: "multiple_choice", question: "In the text, \"cabin\" means...", options: ["a small simple house", "a big hotel", "a tent"], correctIndex: 0, explanation: "'cabin' = cabaña, casa pequeña y sencilla." },
        { type: "true_false", statement: "The family swam in the lake in the afternoon.", answer: true, explanation: "\"...in the afternoon we swam in the cold lake.\"" }
      ]
    },

    /* ============================ B1 ============================ */

    "lvl-b1-grammar-perfect": {
      lessonId: "lvl-b1-grammar-perfect", level: "B1", track: "Uso del inglés", topic: "grammar", skill: "use",
      title: "Present perfect y primer condicional", xpReward: 54, mascotState: "explaining",
      explanation: {
        body: "B1: el present perfect (have/has + participio) con since/for, y el primer condicional (If + presente, ... will + verbo). Recuerda: 'since' + momento concreto (since 2019), 'for' + periodo (for five years). (Atiende a la concordancia y a la forma del 'if'.)",
        examples: [
          { en: "I have lived here for five years.", es: "He vivido aquí cinco años." },
          { en: "If it rains, we will stay at home.", es: "Si llueve, nos quedaremos en casa." }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "Choose the correct form: \"I ___ never ___ sushi.\"", options: ["have / eaten", "has / ate", "have / ate"], correctIndex: 0, explanation: "Present perfect: have + participio ('eaten')." },
        { type: "find_error", question: "Encuentra el error.",
          segments: ["I ", { u: "have lived" }, " in this city ", { u: "since" }, " five ", { u: "years" }, " and I ", { u: "love" }, " it."],
          correctIndex: 1, correction: "for ('for five years': periodo de tiempo)",
          explanation: "Con una duración se usa 'for'; 'since' es para un momento concreto." },
        { type: "find_error", question: "Encuentra el error.",
          segments: ["If it ", { u: "will rain" }, " tomorrow, we ", { u: "will" }, " ", { u: "stay" }, " at ", { u: "home" }, "."],
          correctIndex: 0, correction: "rains (en la cláusula 'if' va el presente)",
          explanation: "Primer condicional: If + presente simple, ... will + verbo. El 'if' no lleva 'will'." },
        { type: "fill_blank", sentence: "She has ___ (finish) her homework already.", answers: ["finished"], hint: "have/has + participio.", explanation: "Participio regular: 'finished'." },
        { type: "multiple_choice", question: "Complete: \"We've known each other ___ 2015.\"", options: ["for", "since", "during"], correctIndex: 1, explanation: "2015 es un momento concreto: 'since 2015'." },
        { type: "true_false", statement: "In a first conditional, the 'if' clause uses 'will' (e.g. \"If it will rain...\").", answer: false, explanation: "El 'if' va en presente: 'If it rains...'." },
        { type: "word_order", words: ["I", "have", "never", "been", "to", "Japan"], correctOrder: ["I", "have", "never", "been", "to", "Japan"], hint: "Present perfect con 'never'." }
      ]
    },

    "lvl-b1-vocab-money": {
      lessonId: "lvl-b1-vocab-money", level: "B1", track: "Vocabulario", topic: "business", skill: "vocab",
      title: "Vocabulario: dinero y trabajo", xpReward: 52, mascotState: "explaining",
      explanation: {
        body: "Vocabulario de B1 sobre dinero y trabajo, con colocaciones frecuentes (earn money, save up, apply for a job). Distingue matices como 'borrow' (pedir prestado) vs 'lend' (prestar). (Asocia, clasifica y traduce con precisión.)",
        examples: [
          { en: "She applied for a new job.", es: "Solicitó un nuevo empleo." },
          { en: "Can you lend me ten euros?", es: "¿Me puedes prestar diez euros?" }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Une el verbo con su significado.", pairs: [
          { l: "earn", r: "to get money for work" },
          { l: "save", r: "to keep money for later" },
          { l: "lend", r: "to give money temporarily" },
          { l: "borrow", r: "to take money temporarily" }
        ] },
        { type: "categorize", instruction: "¿La palabra se relaciona con el dinero o con el empleo?", buckets: [
          { id: "m", label: "Money" }, { id: "j", label: "Job" } ], items: [
          { t: "salary", bucket: "j" }, { t: "discount", bucket: "m" },
          { t: "interview", bucket: "j" }, { t: "budget", bucket: "m" },
          { t: "colleague", bucket: "j" }, { t: "currency", bucket: "m" } ] },
        { type: "multiple_choice", question: "Choose the correct word: \"Can you ___ me your pen? I'll give it back.\"", options: ["borrow", "lend", "earn"], correctIndex: 1, explanation: "Tú das algo temporalmente: 'lend' (prestar)." },
        { type: "fill_blank", sentence: "I want to ___ for that job; I'll send my CV tomorrow.", answers: ["apply"], hint: "apply ___ a job.", explanation: "'apply for a job' = solicitar un empleo." },
        { type: "translate", prompt: "Traduce: \"Ella ahorra dinero cada mes.\"", answers: ["she saves money every month"], explanation: "She saves money every month." }
      ]
    },

    "lvl-b1-read-smartphones": {
      lessonId: "lvl-b1-read-smartphones", level: "B1", track: "Lectura", topic: "tech", skill: "reading",
      title: "Lectura: How phones changed us", xpReward: 54, mascotState: "explaining",
      explanation: {
        body: "Lectura de B1 de longitud media. Identifica la idea principal, un detalle, el significado de una palabra por contexto y una pequeña inferencia. (No confundas tu opinión con lo que dice el texto.)",
        examples: [
          { en: "convenience has a downside", es: "la comodidad tiene un inconveniente" },
          { en: "It is difficult to concentrate.", es: "Es difícil concentrarse." }
        ]
      },
      exercises: [
        { type: "reading", title: "Smartphones and us",
          passage: "Smartphones have changed the way we communicate. Twenty years ago, most people used their phones only to make calls or send short messages. Today, a single device lets us read the news, take photos, pay for shopping and talk to friends on the other side of the world.\n\nHowever, this convenience has a downside. Many people now find it difficult to spend even a few hours without checking their screens, and some experts worry that constant notifications make it harder to concentrate.",
          questions: [
            { q: "What is the text mainly about?", options: ["how to repair a phone", "how smartphones have changed communication, with both benefits and problems", "why old phones were better"], correctIndex: 1, explanation: "Habla del cambio que trajeron, con ventajas y un inconveniente." },
            { q: "According to the text, what could people do with phones twenty years ago?", options: ["read the news and pay for shopping", "only make calls and send short messages", "take photos and talk to people abroad"], correctIndex: 1, explanation: "\"...used their phones only to make calls or send short messages.\"" },
            { q: "In the text, \"downside\" means...", options: ["an advantage", "a disadvantage", "a price"], correctIndex: 1, explanation: "'downside' = inconveniente, desventaja." },
            { q: "What can be inferred from the text?", options: ["Phones have no effect on concentration.", "Spending too long on phones may be a problem for some people.", "Everyone should stop using phones."], correctIndex: 1, explanation: "Se infiere de la preocupación de los expertos por las notificaciones y la concentración." }
          ] },
        { type: "find_error", question: "Encuentra el error.",
          segments: ["Many people ", { u: "finds" }, " it ", { u: "difficult" }, " to ", { u: "concentrate" }, " with constant ", { u: "notifications" }, "."],
          correctIndex: 0, correction: "find (people = plural)",
          explanation: "'people' es plural, así que el verbo es 'find', no 'finds'." },
        { type: "true_false", statement: "According to the text, today a smartphone can be used to pay for shopping.", answer: true, explanation: "\"...pay for shopping...\"" },
        { type: "fill_blank", sentence: "Some experts worry that constant ___ make it harder to concentrate.", answers: ["notifications"], hint: "Los avisos del teléfono.", explanation: "\"...constant notifications make it harder to concentrate.\"" }
      ]
    }

  };

  /* Orden de aparición dentro de cada mundo (se anexa al final de cada
     escalera de destreza; la progresión real la calcula vesper_path.js). */
  var ORDER = [
    /* A1 */ "lvl-a1-grammar-basics", "lvl-a1-vocab-everyday", "lvl-a1-read-ana",
    /* A2 */ "lvl-a2-grammar-past", "lvl-a2-vocab-routines", "lvl-a2-read-holiday",
    /* B1 */ "lvl-b1-grammar-perfect", "lvl-b1-vocab-money", "lvl-b1-read-smartphones"
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
