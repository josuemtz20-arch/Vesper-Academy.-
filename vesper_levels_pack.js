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
        { type: "multiple_choice", question: "Choose the correct article: \"I have ___ apple.\"", options: ["an", "a", "the"], correctIndex: 0, explanation: "'apple' empieza por sonido vocálico: 'an apple'." },
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
      lessonId: "lvl-a1-vocab-everyday", level: "A1", track: "Vocabulario", topic: "countries", skill: "vocab", tipo: "aprende", title: "Países y nacionalidades", rev: 2, xpReward: 32, mascotState: "explaining",
      explanation: {
        body: "Cuando conoces a alguien, una de las primeras preguntas es: Where are you from? Aprende países y nacionalidades. En inglés las dos se escriben con mayúscula. País: I'm from Mexico. Nacionalidad (adjetivo): I'm Mexican. Siempre con mayúscula: Spain, Spanish. Terminaciones comunes: -an (Mexican), -ish (British, Spanish), -ese (Japanese, Chinese).",
        examples: [
          { en: "Where are you from, Mia?", es: "¿De dónde eres, Mia?" },
          { en: "I'm Mexican. I'm from Puebla.", es: "Soy mexicana. Soy de Puebla." },
          { en: "Cool! I'm Canadian, from Toronto.", es: "¡Genial! Soy canadiense, de Toronto." },
          { en: "My friend Yuki is Japanese.", es: "Mi amiga Yuki es japonesa." }
        ],
        sections: [
          { kind: "intro", body: "Cuando conoces a alguien, una de las primeras preguntas es: Where are you from? Aprende países y nacionalidades. En inglés las dos se escriben con mayúscula." },
          {
            kind: "regla",
            body: "País: I'm from Mexico. Nacionalidad (adjetivo): I'm Mexican. Siempre con mayúscula: Spain, Spanish. Terminaciones comunes: -an (Mexican), -ish (British, Spanish), -ese (Japanese, Chinese)."
          },
          {
            kind: "vocab",
            items: [
              { en: "Mexico / Mexican", es: "México / mexicano" },
              { en: "Spain / Spanish", es: "España / español" },
              { en: "the USA / American", es: "Estados Unidos / estadounidense" },
              { en: "Canada / Canadian", es: "Canadá / canadiense" },
              { en: "Brazil / Brazilian", es: "Brasil / brasileño" },
              { en: "Japan / Japanese", es: "Japón / japonés" },
              { en: "the UK / British", es: "Reino Unido / británico" },
              { en: "Colombia / Colombian", es: "Colombia / colombiano" }
            ]
          },
          {
            kind: "expresiones",
            items: [
              { en: "Where are you from?", es: "¿De dónde eres?" },
              { en: "I'm from...", es: "Soy de..." },
              { en: "What nationality are you?", es: "¿Qué nacionalidad tienes?" },
              { en: "Where in Mexico?", es: "¿De qué parte de México?" }
            ]
          },
          {
            kind: "ejemplos",
            items: [
              { en: "Sam: Where are you from, Mia?", es: "Sam: ¿De dónde eres, Mia?" },
              { en: "Mia: I'm Mexican. I'm from Puebla.", es: "Mia: Soy mexicana. Soy de Puebla." },
              { en: "Sam: Cool! I'm Canadian, from Toronto.", es: "Sam: ¡Genial! Soy canadiense, de Toronto." },
              { en: "Mia: My friend Yuki is Japanese.", es: "Mia: Mi amiga Yuki es japonesa." }
            ]
          },
          {
            kind: "errores",
            items: [
              { no: "I'm from Mexican.", si: "I'm Mexican. / I'm from Mexico.", pq: "from + país; la nacionalidad va sin from." },
              { no: "She is spanish.", si: "She is Spanish.", pq: "Las nacionalidades se escriben con mayúscula." },
              { no: "I'm of Colombia.", si: "I'm from Colombia.", pq: "El origen se dice con from." }
            ]
          },
          { kind: "resumen", body: "I'm from + país (I'm from Brazil). I'm + nacionalidad (I'm Brazilian). Países y nacionalidades siempre con mayúscula." },
          { kind: "puente", body: "Practica con los amigos de Mia y Sam de todo el mundo." }
        ]
      },
      exercises: [
        {
          type: "matching", instruction: "Une cada nacionalidad con su significado.",
          pairs: [
            { l: "Mexican", r: "mexicano/a" },
            { l: "Spanish", r: "español/a" },
            { l: "Canadian", r: "canadiense" },
            { l: "Brazilian", r: "brasileño/a" },
            { l: "Japanese", r: "japonés/japonesa" },
            { l: "British", r: "británico/a" }
          ]
        },
        {
          type: "categorize", instruction: "¿País o nacionalidad?",
          buckets: [{ id: "country", label: "País" }, { id: "nat", label: "Nacionalidad" }],
          items: [
            { t: "Brazil", bucket: "country" },
            { t: "Japan", bucket: "country" },
            { t: "Canada", bucket: "country" },
            { t: "Brazilian", bucket: "nat" },
            { t: "Japanese", bucket: "nat" },
            { t: "Canadian", bucket: "nat" }
          ]
        },
        { type: "multiple_choice", question: "Yuki is from Japan. She is ___.", options: ["Japanese", "Japan", "Japanish"], correctIndex: 0, explanation: "Japan → Japanese." },
        { type: "listening", text: "Hi, I'm Lucas. I'm from Brazil, but I live in Spain.", question: "¿Dónde vive Lucas?", options: ["En España", "En Brasil", "En México"], correctIndex: 0 },
        {
          type: "find_error",
          segments: ["Emma ", { u: "is" }, " from London. She ", { u: "is" }, " ", { u: "british" }, "."],
          correctIndex: 2, correction: "British", explanation: "Las nacionalidades van con mayúscula: British.", question: "Encuentra el error"
        },
        { type: "fill_blank", sentence: "Where ___ you from?", answers: ["are"], hint: "you → are", explanation: "Where are you from?" },
        { type: "true_false", statement: "\"I'm from Mexican\" es correcto.", answer: false, explanation: "Se dice I'm from Mexico o I'm Mexican." },
        { type: "translate", prompt: "Traduce: \"Soy de Colombia.\"", answers: ["i'm from colombia", "i am from colombia"], explanation: "I'm from Colombia." }
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
            { q: "Who does Ana live with?", options: ["her family", "her friends", "alone"], correctIndex: 0, explanation: "\"...with my mother, my father and my brother.\"" },
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
        { type: "multiple_choice", question: "Choose the comparative: \"She is ___ than her brother.\"", options: ["taller", "tall", "tallest"], correctIndex: 0, explanation: "Comparativo: 'taller than'." },
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
      lessonId: "lvl-a2-vocab-routines", level: "A2", track: "Expresiones", topic: "social", skill: "use", tipo: "aprende", title: "Dar tu opinión y estar de acuerdo", rev: 2, xpReward: 42,
      mascotState: "explaining",
      explanation: {
        body: "Episodio 8 · Mia y Sam ven una película y no piensan igual. Aprende a dar tu opinión y a decir si estás de acuerdo o no. Opinar: I think (that)... / I don't think... / In my opinion... Preguntar: What do you think? Estar de acuerdo: I agree. / Me too. (con una frase afirmativa) / Me neither. (con una negativa). No estar de acuerdo con amabilidad: I don't agree. / I'm not sure about that. ¡Ojo! Se dice I agree, no \"I am agree\".",
        examples: [
          { en: "What do you think of the film?", es: "¿Qué opinas de la película?" },
          { en: "I think it's boring. The ending is terrible.", es: "Creo que es aburrida. El final es terrible." },
          { en: "I don't agree. I think it's exciting!", es: "No estoy de acuerdo. ¡Creo que es emocionante!" },
          { en: "Well, I don't like scary films. — Sam: Me neither!", es: "Bueno, no me gustan las películas de miedo. — Sam: ¡A mí tampoco!" }
        ],
        sections: [
          { kind: "intro", body: "Episodio 8 · Mia y Sam ven una película y no piensan igual. Aprende a dar tu opinión y a decir si estás de acuerdo o no." },
          {
            kind: "regla",
            body: "Opinar: I think (that)... / I don't think... / In my opinion... Preguntar: What do you think? Estar de acuerdo: I agree. / Me too. (con una frase afirmativa) / Me neither. (con una negativa). No estar de acuerdo con amabilidad: I don't agree. / I'm not sure about that. ¡Ojo! Se dice I agree, no \"I am agree\"."
          },
          {
            kind: "vocab",
            items: [
              { en: "opinion", ipa: "əˈpɪnjən", es: "opinión" },
              { en: "agree", ipa: "əˈɡriː", es: "estar de acuerdo" },
              { en: "disagree", ipa: "ˌdɪsəˈɡriː", es: "no estar de acuerdo" },
              { en: "boring", ipa: "ˈbɔːrɪŋ", es: "aburrido" },
              { en: "exciting", ipa: "ɪkˈsaɪtɪŋ", es: "emocionante" },
              { en: "funny", ipa: "ˈfʌni", es: "gracioso" },
              { en: "scary", ipa: "ˈskeəri", es: "de miedo" },
              { en: "ending", ipa: "ˈendɪŋ", es: "final" }
            ]
          },
          {
            kind: "expresiones",
            items: [
              { en: "What do you think?", es: "¿Qué opinas?" },
              { en: "I think it's great.", es: "Creo que es genial." },
              { en: "Me too. / Me neither.", es: "Yo también. / Yo tampoco." },
              { en: "I don't agree.", es: "No estoy de acuerdo." }
            ]
          },
          {
            kind: "ejemplos",
            items: [
              { en: "Sam: What do you think of the film?", es: "Sam: ¿Qué opinas de la película?" },
              { en: "Mia: I think it's boring. The ending is terrible.", es: "Mia: Creo que es aburrida. El final es terrible." },
              { en: "Sam: I don't agree. I think it's exciting!", es: "Sam: No estoy de acuerdo. ¡Creo que es emocionante!" },
              { en: "Mia: Well, I don't like scary films. — Sam: Me neither!", es: "Mia: Bueno, no me gustan las películas de miedo. — Sam: ¡A mí tampoco!" }
            ]
          },
          {
            kind: "errores",
            items: [
              { no: "I am agree.", si: "I agree.", pq: "agree es un verbo; no lleva am." },
              { no: "I don't like it. — Me too.", si: "I don't like it. — Me neither.", pq: "Para coincidir con una frase negativa: Me neither." },
              { no: "I think that no.", si: "I don't think so.", pq: "Para opinar en negativo: I don't think so." }
            ]
          },
          { kind: "resumen", body: "I think... / I don't think... / In my opinion... · What do you think? · I agree / I don't agree · Me too (afirmativo) / Me neither (negativo)." },
          { kind: "puente", body: "¿Quién tiene razón, Mia o Sam? Da tu opinión." }
        ]
      },
      exercises: [
        {
          type: "multiple_choice", question: "I don't like horror films. — ___ They're too scary.", options: ["Me neither.", "Me too.", "I agree not."], correctIndex: 0,
          explanation: "Con una frase negativa: Me neither."
        },
        {
          type: "find_error",
          segments: [{ u: "I" }, " ", { u: "am agree" }, " ", { u: "with" }, " you."],
          correctIndex: 1, correction: "agree", explanation: "agree es verbo: I agree with you.", question: "Encuentra el error"
        },
        {
          type: "listening", text: "I think the book is better than the film.", question: "¿Qué opina?",
          options: ["El libro es mejor que la película", "La película es mejor que el libro", "Los dos son malos"], correctIndex: 0
        },
        {
          type: "categorize", instruction: "¿Está de acuerdo o no?",
          buckets: [{ id: "yes", label: "De acuerdo" }, { id: "no", label: "No está de acuerdo" }],
          items: [
            { t: "I agree.", bucket: "yes" },
            { t: "Me too.", bucket: "yes" },
            { t: "You're right.", bucket: "yes" },
            { t: "I don't agree.", bucket: "no" },
            { t: "I'm not sure about that.", bucket: "no" },
            { t: "I don't think so.", bucket: "no" }
          ]
        },
        { type: "fill_blank", sentence: "What do you ___ of the new café? — It's great!", answers: ["think"], hint: "¿Qué opinas de...?", explanation: "What do you think of...?" },
        {
          type: "matching", instruction: "Une cada adjetivo con su significado.",
          pairs: [{ l: "boring", r: "aburrido/a" }, { l: "exciting", r: "emocionante" }, { l: "funny", r: "gracioso/a" }, { l: "scary", r: "de miedo" }]
        },
        { type: "speak", text: "I don't agree. I think it's exciting!", es: "No estoy de acuerdo. ¡Creo que es emocionante!" },
        {
          type: "translate", prompt: "Traduce: \"Creo que es aburrido.\"",
          answers: ["i think it's boring", "i think it is boring", "i think that it's boring", "i think that it is boring"], explanation: "I think it's boring."
        }
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
            { q: "Where did the family go?", options: ["to the city", "to the beach", "to the mountains"], correctIndex: 2, explanation: "\"...went to the mountains for a week.\"" },
            { q: "How was the weather?", options: ["cold and rainy", "sunny and warm", "windy"], correctIndex: 1, explanation: "\"The weather was sunny and warm.\"" },
            { q: "What did they see one day?", options: ["a family of deer", "a bear", "a boat"], correctIndex: 0, explanation: "\"...we saw a family of deer.\"" }
          ] },
        { type: "find_error", question: "Encuentra el error.",
          segments: ["Last summer my family ", { u: "go" }, " to the ", { u: "mountains" }, " for a ", { u: "week" }, " in ", { u: "July" }, "."],
          correctIndex: 0, correction: "went (acción terminada en el pasado)",
          explanation: "'Last summer' indica pasado: el verbo debe ir en pasado ('went')." },
        { type: "multiple_choice", question: "In the text, \"cabin\" means...", options: ["a big hotel", "a tent", "a small simple house"], correctIndex: 2, explanation: "'cabin' = cabaña, casa pequeña y sencilla." },
        { type: "true_false", statement: "The family swam in the lake in the afternoon.", answer: true, explanation: "\"...in the afternoon we swam in the cold lake.\"" }
      ]
    },

    /* ============================ B1 ============================ */

    "lvl-b1-grammar-perfect": {
      lessonId: "lvl-b1-grammar-perfect", level: "B1", track: "Use of English", topic: "grammar", skill: "use",
      title: "Present perfect and the first conditional", xpReward: 54, mascotState: "explaining",
      explanation: {
        body: "B1: the present perfect (have/has + past participle) with since/for, and the first conditional (If + present simple, ... will + verb). Remember: 'since' + a specific point in time (since 2019), 'for' + a period (for five years). Pay attention to agreement and to the form of the 'if' clause.",
        examples: [
          { en: "I have lived here for five years." },
          { en: "If it rains, we will stay at home." }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "Choose the correct form: \"I ___ never ___ sushi.\"", options: ["have / eaten", "has / ate", "have / ate"], correctIndex: 0, explanation: "Present perfect: have + past participle ('eaten')." },
        { type: "find_error", question: "Find the mistake.",
          segments: ["I ", { u: "have lived" }, " in this city ", { u: "since" }, " five ", { u: "years" }, " and I ", { u: "love" }, " it."],
          correctIndex: 1, correction: "for ('for five years': a period of time)",
          explanation: "With a duration we use 'for'; 'since' is for a specific point in time." },
        { type: "find_error", question: "Find the mistake.",
          segments: ["If it ", { u: "will rain" }, " tomorrow, we ", { u: "will" }, " ", { u: "stay" }, " at ", { u: "home" }, "."],
          correctIndex: 0, correction: "rains (the 'if' clause takes the present simple)",
          explanation: "First conditional: If + present simple, ... will + verb. The 'if' clause has no 'will'." },
        { type: "fill_blank", sentence: "She has ___ (finish) her homework already.", answers: ["finished"], hint: "have/has + past participle.", explanation: "Regular past participle: 'finished'." },
        { type: "multiple_choice", question: "Complete: \"We've known each other ___ 2015.\"", options: ["for", "since", "during"], correctIndex: 1, explanation: "2015 is a specific point in time: 'since 2015'." },
        { type: "true_false", statement: "In a first conditional, the 'if' clause uses 'will' (e.g. \"If it will rain...\").", answer: false, explanation: "The 'if' clause is in the present: 'If it rains...'." },
        { type: "word_order", words: ["I", "have", "never", "been", "to", "Japan"], correctOrder: ["I", "have", "never", "been", "to", "Japan"], hint: "Present perfect with 'never'." }
      ]
    },

    "lvl-b1-vocab-money": {
      lessonId: "lvl-b1-vocab-money", level: "B1", track: "Functional English", topic: "communication", skill: "use", tipo: "aprende", title: "Asking for clarification", rev: 2, xpReward: 52,
      mascotState: "explaining",
      explanation: {
        body: "Episode 3 · Carmen has her first video call with a hotel partner in Glasgow. The connection is bad and he speaks very fast. Learn how to ask for clarification and check that you've understood. If you didn't hear: Sorry, I didn't catch that. / Could you say that again, please? If you didn't understand a word: What do you mean by...? / Sorry, what does ... mean? To check, paraphrase: So, you're saying that... / Just to confirm, ... / Let me make sure I've got this right. To slow someone down: Could you speak a bit more slowly?",
        examples: [
          { en: "We can offer twenty rooms from the fifteenth, but only on a B&B basis." },
          { en: "Sorry, I didn't catch that. Could you say it again? The line is breaking up." },
          { en: "Twenty rooms, from the fifteenth. Bed and breakfast." },
          { en: "Just to confirm: twenty rooms from the fifteenth, with breakfast included. Is that right?" }
        ],
        sections: [
          {
            kind: "intro",
            body: "Episode 3 · Carmen has her first video call with a hotel partner in Glasgow. The connection is bad and he speaks very fast. Learn how to ask for clarification and check that you've understood."
          },
          {
            kind: "regla",
            body: "If you didn't hear: Sorry, I didn't catch that. / Could you say that again, please? If you didn't understand a word: What do you mean by...? / Sorry, what does ... mean? To check, paraphrase: So, you're saying that... / Just to confirm, ... / Let me make sure I've got this right. To slow someone down: Could you speak a bit more slowly?"
          },
          {
            kind: "vocab",
            items: [
              { en: "clarify", ipa: "ˈklærəfaɪ", es: "make something easier to understand" },
              { en: "catch", ipa: "kætʃ", es: "hear and understand (informal)" },
              { en: "confirm", ipa: "kənˈfɜːm", es: "say that something is definitely true" },
              { en: "paraphrase", ipa: "ˈpærəfreɪz", es: "say the same thing in different words" },
              { en: "the line is breaking up", es: "the call connection is bad" },
              { en: "mean by", es: "intend to say with a word" },
              { en: "get (something)", es: "understand" },
              { en: "detail", ipa: "ˈdiːteɪl", es: "a small piece of information" }
            ]
          },
          {
            kind: "expresiones",
            items: [
              { en: "Sorry, I didn't catch that.", es: "you didn't hear clearly" },
              { en: "What do you mean by...?", es: "ask about a word or idea" },
              { en: "So, you're saying that...?", es: "check understanding by paraphrasing" },
              { en: "Just to confirm, ...", es: "make sure the details are right" }
            ]
          },
          {
            kind: "ejemplos",
            items: [
              { en: "Mr Reid: We can offer twenty rooms from the fifteenth, but only on a B&B basis." },
              { en: "Carmen: Sorry, I didn't catch that. Could you say it again? The line is breaking up." },
              { en: "Mr Reid: Twenty rooms, from the fifteenth. Bed and breakfast." },
              { en: "Carmen: Just to confirm: twenty rooms from the fifteenth, with breakfast included. Is that right?" }
            ]
          },
          {
            kind: "errores",
            items: [
              { no: "Repeat, please.", si: "Could you say that again, please?", pq: "A bare imperative can sound rude; use Could you...?" },
              { no: "What means 'B&B'?", si: "What does 'B&B' mean?", pq: "Use does + mean in the question." },
              { no: "I didn't catch.", si: "I didn't catch that.", pq: "catch needs an object: catch that / catch your name." }
            ]
          },
          { kind: "resumen", body: "Didn't hear → Sorry, I didn't catch that. Didn't understand → What do you mean by...? Check → So, you're saying...? / Just to confirm..." },
          { kind: "puente", body: "Help Carmen get the details right on her call." }
        ]
      },
      exercises: [
        {
          type: "listening", text: "So, you're saying that the meeting has moved to Thursday?", question: "What is the speaker doing?",
          options: ["Checking their understanding", "Disagreeing", "Cancelling the meeting"], correctIndex: 0
        },
        {
          type: "multiple_choice", question: "You didn't hear the client's name on the phone. You say:", options: ["Sorry, I didn't catch your name.", "What is you name?", "Your name again!"], correctIndex: 0,
          explanation: "I didn't catch + object is natural and polite."
        },
        {
          type: "matching", instruction: "Match each word with its meaning.",
          pairs: [
            { l: "clarify", r: "make something easier to understand" },
            { l: "confirm", r: "say that something is definitely true" },
            { l: "paraphrase", r: "say the same thing in different words" },
            { l: "catch", r: "hear and understand (informal)" },
            { l: "detail", r: "a small piece of information" }
          ]
        },
        {
          type: "find_error",
          segments: ["Sorry, what ", { u: "does" }, " 'deadline' ", { u: "means" }, " in ", { u: "this" }, " context?"],
          correctIndex: 1, correction: "mean", explanation: "After does, use the base verb: What does 'deadline' mean?", question: "Find the mistake"
        },
        {
          type: "categorize", instruction: "What is the speaker doing?",
          buckets: [{ id: "hear", label: "Didn't hear" }, { id: "meaning", label: "Didn't understand a word" }, { id: "check", label: "Checking understanding" }],
          items: [
            { t: "Sorry, I didn't catch that.", bucket: "hear" },
            { t: "Could you say that again?", bucket: "hear" },
            { t: "What do you mean by 'B&B'?", bucket: "meaning" },
            { t: "What does 'upgrade' mean?", bucket: "meaning" },
            { t: "So, you're saying that...?", bucket: "check" },
            { t: "Just to confirm, ...", bucket: "check" }
          ]
        },
        { type: "fill_blank", sentence: "Just to ___: the meeting is at three, not two?", answers: ["confirm", "check", "clarify"], hint: "Make sure the detail is right.", explanation: "Just to confirm..." },
        { type: "speak", text: "Sorry, I didn't catch that. Could you say it again?" },
        {
          type: "translate",
          prompt: "Turn this into a clarification question, starting with \"What do you mean\": \"I don't understand the word 'flexible'.\"",
          answers: ["what do you mean by flexible", "what do you mean when you say flexible"], explanation: "What do you mean by 'flexible'?"
        }
      ]
    },

    "lvl-b1-read-smartphones": {
      lessonId: "lvl-b1-read-smartphones", level: "B1", track: "Reading", topic: "tech", skill: "reading",
      title: "Reading: How phones changed us", xpReward: 54, mascotState: "explaining",
      explanation: {
        body: "A medium-length B1 reading. Identify the main idea, a detail, the meaning of a word from context and a small inference. Don't confuse your opinion with what the text says.",
        examples: [
          { en: "convenience has a downside" },
          { en: "It is difficult to concentrate." }
        ]
      },
      exercises: [
        { type: "reading", title: "Smartphones and us",
          passage: "Smartphones have changed the way we communicate. Twenty years ago, most people used their phones only to make calls or send short messages. Today, a single device lets us read the news, take photos, pay for shopping and talk to friends on the other side of the world.\n\nHowever, this convenience has a downside. Many people now find it difficult to spend even a few hours without checking their screens, and some experts worry that constant notifications make it harder to concentrate.",
          questions: [
            { q: "What is the text mainly about?", options: ["why old phones were better", "how to repair a phone", "how smartphones have changed communication, with both benefits and problems"], correctIndex: 2, explanation: "It talks about the change smartphones brought, with advantages and one drawback." },
            { q: "According to the text, what could people do with phones twenty years ago?", options: ["read the news and pay for shopping", "only make calls and send short messages", "take photos and talk to people abroad"], correctIndex: 1, explanation: "\"...used their phones only to make calls or send short messages.\"" },
            { q: "In the text, \"downside\" means...", options: ["a disadvantage", "a price", "an advantage"], correctIndex: 0, explanation: "'downside' = a disadvantage." },
            { q: "What can be inferred from the text?", options: ["Phones have no effect on concentration.", "Everyone should stop using phones.", "Spending too long on phones may be a problem for some people."], correctIndex: 2, explanation: "It can be inferred from the experts' concern about notifications and concentration." }
          ] },
        { type: "find_error", question: "Find the mistake.",
          segments: ["Many people ", { u: "finds" }, " it ", { u: "difficult" }, " to ", { u: "concentrate" }, " with constant ", { u: "notifications" }, "."],
          correctIndex: 0, correction: "find (people = plural)",
          explanation: "'people' is plural, so the verb is 'find', not 'finds'." },
        { type: "true_false", statement: "According to the text, today a smartphone can be used to pay for shopping.", answer: true, explanation: "\"...pay for shopping...\"" },
        { type: "fill_blank", sentence: "Some experts worry that constant ___ make it harder to concentrate.", answers: ["notifications"], hint: "The alerts on your phone.", explanation: "\"...constant notifications make it harder to concentrate.\"" },
        {
          type: "multiple_choice", question: "What is the writer's attitude to smartphones?",
          options: ["Positive, but aware of a problem", "Completely negative", "Completely positive"], correctIndex: 0, explanation: "Convenience, but also a downside."
        },
        {
          type: "matching", instruction: "Match each word from the text with its meaning.",
          pairs: [
            { l: "device", r: "a piece of equipment such as a phone" },
            { l: "convenience", r: "something that makes life easier" },
            { l: "concentrate", r: "give all your attention to something" },
            { l: "notification", r: "an alert on your phone" }
          ]
        }
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
