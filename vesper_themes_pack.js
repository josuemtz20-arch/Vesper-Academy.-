/* =====================================================================
 * VESPER · THEMES PACK  (lecciones temáticas A1 · A2 · B1)
 * ---------------------------------------------------------------------
 * Lecciones organizadas por TEMA. Cada tema trae una lección de
 * VOCABULARIO y una de LISTENING, con dificultad acorde al nivel:
 *   - A1: Comida y bebida · Animales
 *   - A2: Viajes y direcciones · Compras y ropa
 *   - B1: Medio ambiente · Viajes y cultura
 *
 * Las lecciones de listening usan el renderer `listening` de leccion.html
 * (el texto se reproduce con voz/TTS; no hacen falta archivos de audio).
 * Reutiliza: listening · multiple_choice · true_false · fill_blank ·
 * matching · categorize · translate.
 *
 * Se fusiona en VESPER_LESSONS via VESPER_THEMES_PACK.merge(). La
 * progresión por nivel la gestiona vesper_path.js (escaleras por destreza).
 * ===================================================================== */
window.VESPER_THEMES_PACK = (function () {

  var L = {

    /* ===================== A1 · COMIDA Y BEBIDA ===================== */

    "lvl-a1-vocab-food": {
      lessonId: "lvl-a1-vocab-food", level: "A1", track: "Vocabulario", topic: "food", skill: "vocab",
      title: "Tema: comida y bebida", xpReward: 32, mascotState: "explaining",
      explanation: {
        body: "Vocabulario A1 de comida y bebida. Aprende a distinguir lo que se come de lo que se bebe y palabras básicas del día a día. (Asocia, clasifica y completa.)",
        examples: [
          { en: "I eat an apple. I drink water.", es: "Como una manzana. Bebo agua." },
          { en: "bread, milk, cheese, juice", es: "pan, leche, queso, zumo" }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Une la palabra con su traducción.", pairs: [
          { l: "apple", r: "manzana" }, { l: "bread", r: "pan" },
          { l: "water", r: "agua" }, { l: "milk", r: "leche" }
        ] },
        { type: "categorize", instruction: "¿Se come o se bebe?", buckets: [
          { id: "e", label: "Food (eat)" }, { id: "d", label: "Drink" } ], items: [
          { t: "apple", bucket: "e" }, { t: "water", bucket: "d" },
          { t: "cheese", bucket: "e" }, { t: "juice", bucket: "d" },
          { t: "rice", bucket: "e" }, { t: "tea", bucket: "d" } ] },
        { type: "multiple_choice", question: "Which one is a drink?", options: ["bread", "water", "cheese"], correctIndex: 1, explanation: "El agua (water) se bebe." },
        { type: "fill_blank", sentence: "I'm thirsty. I want some ___.", answers: ["water"], hint: "Algo para beber.", explanation: "Si tienes sed, bebes agua (water)." },
        { type: "translate", prompt: "Traduce: \"Me gusta el pan.\"", answers: ["i like bread"], explanation: "I like bread." }
      ]
    },

    "lvl-a1-listen-cafe": {
      lessonId: "lvl-a1-listen-cafe", level: "A1", track: "Listening", topic: "food", skill: "listening",
      title: "Tema: en la cafetería", xpReward: 34, mascotState: "explaining",
      explanation: {
        body: "Escucha A1 en una cafetería. Oirás a alguien pedir comida y bebida. Reproduce el audio (puedes repetirlo y ponerlo más lento) y responde. (Escucha qué pide y cuánto cuesta.)",
        examples: [
          { en: "Can I have a coffee, please?", es: "¿Me pone un café, por favor?" },
          { en: "How much is it?", es: "¿Cuánto es?" }
        ]
      },
      exercises: [
        { type: "listening",
          text: "Hello! Can I have a coffee and a sandwich, please?",
          question: "What does the customer order?", options: ["a tea and a cake", "a coffee and a sandwich", "a juice and a salad"], correctIndex: 1, explanation: "\"...a coffee and a sandwich, please.\"" },
        { type: "listening",
          text: "That's five dollars, please.",
          question: "How much is it?", options: ["four dollars", "five dollars", "fifteen dollars"], correctIndex: 1, explanation: "\"That's five dollars...\"" },
        { type: "multiple_choice", question: "Where are they?", options: ["at a café", "at a hospital", "at school"], correctIndex: 0, explanation: "Se pide café y un sándwich: están en una cafetería." },
        { type: "true_false", statement: "The customer wants a sandwich.", answer: true, explanation: "\"...a coffee and a sandwich...\"" }
      ]
    },

    /* ========================= A1 · ANIMALES ========================= */

    "lvl-a1-vocab-animals": {
      lessonId: "lvl-a1-vocab-animals", level: "A1", track: "Vocabulario", topic: "animals", skill: "vocab",
      title: "Tema: los animales", xpReward: 32, mascotState: "explaining",
      explanation: {
        body: "Vocabulario A1 de animales. Aprende mascotas y animales de granja, y descríbelos con colores y tamaños. (Asocia, clasifica y completa.)",
        examples: [
          { en: "The dog is big. The bird is small.", es: "El perro es grande. El pájaro es pequeño." },
          { en: "dog, cat, bird, fish", es: "perro, gato, pájaro, pez" }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Une el animal con su traducción.", pairs: [
          { l: "dog", r: "perro" }, { l: "cat", r: "gato" },
          { l: "bird", r: "pájaro" }, { l: "fish", r: "pez" }
        ] },
        { type: "categorize", instruction: "¿Mascota o animal de granja?", buckets: [
          { id: "p", label: "Pet" }, { id: "f", label: "Farm animal" } ], items: [
          { t: "cat", bucket: "p" }, { t: "cow", bucket: "f" },
          { t: "dog", bucket: "p" }, { t: "horse", bucket: "f" },
          { t: "hamster", bucket: "p" }, { t: "sheep", bucket: "f" } ] },
        { type: "multiple_choice", question: "Which animal can fly?", options: ["dog", "bird", "fish"], correctIndex: 1, explanation: "El pájaro (bird) puede volar." },
        { type: "fill_blank", sentence: "A baby dog is a ___.", answers: ["puppy"], hint: "La cría del perro.", explanation: "puppy = cachorro." },
        { type: "translate", prompt: "Traduce: \"Tengo dos gatos.\"", answers: ["i have two cats"], explanation: "I have two cats." }
      ]
    },

    "lvl-a1-listen-zoo": {
      lessonId: "lvl-a1-listen-zoo", level: "A1", track: "Listening", topic: "animals", skill: "listening",
      title: "Tema: un día en el zoo", xpReward: 34, mascotState: "explaining",
      explanation: {
        body: "Escucha A1 en el zoo. Alguien describe animales con colores y tamaños. Reproduce el audio y descubre de qué animal habla. (Fíjate en cómo es cada animal.)",
        examples: [
          { en: "It is big and grey.", es: "Es grande y gris." },
          { en: "It has a long nose.", es: "Tiene una nariz larga." }
        ]
      },
      exercises: [
        { type: "listening",
          text: "Look! This is my favourite animal at the zoo. It is big and grey, and it has a long nose. It is an elephant!",
          question: "Which animal is it?", options: ["a lion", "an elephant", "a monkey"], correctIndex: 1, explanation: "Grande, gris y con nariz larga: un elefante." },
        { type: "listening",
          text: "The monkeys are very funny. They are small and brown, and they climb the trees all day.",
          question: "What do the monkeys do all day?", options: ["sleep", "climb trees", "swim"], correctIndex: 1, explanation: "\"...they climb the trees all day.\"" },
        { type: "true_false", statement: "The elephant has a long nose.", answer: true, explanation: "\"...it has a long nose.\"" },
        { type: "multiple_choice", question: "What colour is the elephant?", options: ["grey", "green", "yellow"], correctIndex: 0, explanation: "\"It is big and grey...\"" }
      ]
    },

    /* ================== A2 · VIAJES Y DIRECCIONES ================== */

    "lvl-a2-vocab-travel": {
      lessonId: "lvl-a2-vocab-travel", level: "A2", track: "Vocabulario", topic: "travel", skill: "vocab",
      title: "Tema: viajes y direcciones", xpReward: 42, mascotState: "explaining",
      explanation: {
        body: "Vocabulario A2 de viajes y cómo dar direcciones (turn left/right, go straight on). Distingue lugares de medios de transporte. (Asocia, clasifica y traduce.)",
        examples: [
          { en: "Turn left at the traffic lights.", es: "Gira a la izquierda en el semáforo." },
          { en: "station, hotel, ticket, map", es: "estación, hotel, billete, mapa" }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Une la palabra con su traducción.", pairs: [
          { l: "airport", r: "aeropuerto" }, { l: "ticket", r: "billete" },
          { l: "luggage", r: "equipaje" }, { l: "map", r: "mapa" }
        ] },
        { type: "categorize", instruction: "¿Lugar o medio de transporte?", buckets: [
          { id: "pl", label: "Place" }, { id: "tr", label: "Transport" } ], items: [
          { t: "station", bucket: "pl" }, { t: "bus", bucket: "tr" },
          { t: "hotel", bucket: "pl" }, { t: "train", bucket: "tr" },
          { t: "airport", bucket: "pl" }, { t: "taxi", bucket: "tr" } ] },
        { type: "multiple_choice", question: "You sleep here when you travel:", options: ["station", "hotel", "map"], correctIndex: 1, explanation: "Duermes en el hotel." },
        { type: "fill_blank", sentence: "Go straight on, then turn ___ at the lights. (izquierda o derecha)", answers: ["left", "right"], hint: "Una dirección.", explanation: "turn left/right = gira a la izquierda/derecha." },
        { type: "translate", prompt: "Traduce: \"¿Dónde está la estación?\"", answers: ["where is the station"], explanation: "Where is the station?" }
      ]
    },

    "lvl-a2-listen-directions": {
      lessonId: "lvl-a2-listen-directions", level: "A2", track: "Listening", topic: "travel", skill: "listening",
      title: "Tema: pedir direcciones", xpReward: 44, mascotState: "explaining",
      explanation: {
        body: "Escucha A2: alguien pide cómo llegar a un sitio. Sigue las indicaciones (straight on, second street, on the left) y responde. (Imagina el camino mientras escuchas.)",
        examples: [
          { en: "Go straight on and take the second street on the left.", es: "Sigue recto y toma la segunda calle a la izquierda." },
          { en: "It's next to the bank.", es: "Está al lado del banco." }
        ]
      },
      exercises: [
        { type: "listening",
          text: "Excuse me, how do I get to the museum? — Go straight on, then take the second street on the left. The museum is next to the bank.",
          question: "Where is the museum?", options: ["next to the bank", "next to the school", "behind the station"], correctIndex: 0, explanation: "\"The museum is next to the bank.\"" },
        { type: "listening",
          text: "It's about ten minutes on foot.",
          question: "How long does it take?", options: ["ten minutes by car", "ten minutes on foot", "one hour"], correctIndex: 1, explanation: "\"...ten minutes on foot.\"" },
        { type: "multiple_choice", question: "Which street should you take?", options: ["the first on the right", "the second on the left", "the third on the left"], correctIndex: 1, explanation: "\"...take the second street on the left.\"" },
        { type: "true_false", statement: "You can walk to the museum.", answer: true, explanation: "Está a diez minutos a pie ('on foot')." }
      ]
    },

    /* =================== A2 · COMPRAS Y ROPA =================== */

    "lvl-a2-vocab-clothes": {
      lessonId: "lvl-a2-vocab-clothes", level: "A2", track: "Vocabulario", topic: "shopping", skill: "vocab",
      title: "Tema: compras y ropa", xpReward: 42, mascotState: "explaining",
      explanation: {
        body: "Vocabulario A2 de ropa y compras. Aprende prendas y cómo preguntar precios y tallas. Clasifica la ropa por estación. (Asocia, clasifica y traduce.)",
        examples: [
          { en: "How much is this shirt?", es: "¿Cuánto cuesta esta camisa?" },
          { en: "shirt, shoes, jacket, hat", es: "camisa, zapatos, chaqueta, gorro" }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Une la prenda con su traducción.", pairs: [
          { l: "shirt", r: "camisa" }, { l: "shoes", r: "zapatos" },
          { l: "jacket", r: "chaqueta" }, { l: "hat", r: "gorro" }
        ] },
        { type: "categorize", instruction: "¿Ropa de verano o de invierno?", buckets: [
          { id: "s", label: "Summer" }, { id: "w", label: "Winter" } ], items: [
          { t: "t-shirt", bucket: "s" }, { t: "coat", bucket: "w" },
          { t: "shorts", bucket: "s" }, { t: "scarf", bucket: "w" },
          { t: "sandals", bucket: "s" }, { t: "gloves", bucket: "w" } ] },
        { type: "multiple_choice", question: "You wear these on your feet:", options: ["hat", "shoes", "gloves"], correctIndex: 1, explanation: "Los zapatos (shoes) se ponen en los pies." },
        { type: "fill_blank", sentence: "It's cold. Put on your ___. (abrigo)", answers: ["coat", "jacket"], hint: "Algo para el frío.", explanation: "coat/jacket = abrigo/chaqueta." },
        { type: "translate", prompt: "Traduce: \"¿Cuánto cuesta esta camisa?\"", answers: ["how much is this shirt", "how much does this shirt cost"], explanation: "How much is this shirt?" }
      ]
    },

    "lvl-a2-listen-shop": {
      lessonId: "lvl-a2-listen-shop", level: "A2", track: "Listening", topic: "shopping", skill: "listening",
      title: "Tema: comprar ropa", xpReward: 44, mascotState: "explaining",
      explanation: {
        body: "Escucha A2 en una tienda de ropa. Oirás al cliente pedir una prenda, una talla y preguntar el precio (¡atento a los descuentos!). (Escucha qué quiere y cuánto cuesta.)",
        examples: [
          { en: "I'm looking for a blue jacket.", es: "Busco una chaqueta azul." },
          { en: "Today there is a discount.", es: "Hoy hay un descuento." }
        ]
      },
      exercises: [
        { type: "listening",
          text: "Hi, can I help you? — Yes, I'm looking for a blue jacket, size medium. — Here you are. The changing room is over there.",
          question: "What is the customer looking for?", options: ["a red dress", "a blue jacket", "black shoes"], correctIndex: 1, explanation: "\"...a blue jacket, size medium.\"" },
        { type: "listening",
          text: "It's thirty euros, but today there is a discount: twenty-five euros.",
          question: "How much does it cost today?", options: ["thirty euros", "twenty euros", "twenty-five euros"], correctIndex: 2, explanation: "Con el descuento de hoy: 25 euros." },
        { type: "multiple_choice", question: "What size does the customer want?", options: ["small", "medium", "large"], correctIndex: 1, explanation: "\"...size medium.\"" },
        { type: "true_false", statement: "There is a discount today.", answer: true, explanation: "\"...today there is a discount...\"" }
      ]
    },

    /* ==================== B1 · MEDIO AMBIENTE ==================== */

    "lvl-b1-vocab-environment": {
      lessonId: "lvl-b1-vocab-environment", level: "B1", track: "Vocabulario", topic: "society", skill: "vocab",
      title: "Tema: el medio ambiente", xpReward: 52, mascotState: "explaining",
      explanation: {
        body: "Vocabulario B1 sobre el medio ambiente: reciclaje, contaminación, energía. Distingue lo que ayuda al planeta de lo que lo daña. (Asocia, clasifica y traduce.)",
        examples: [
          { en: "We should recycle and save energy.", es: "Deberíamos reciclar y ahorrar energía." },
          { en: "pollution, waste, energy, climate", es: "contaminación, residuos, energía, clima" }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Une la palabra con su traducción.", pairs: [
          { l: "recycle", r: "reciclar" }, { l: "pollution", r: "contaminación" },
          { l: "waste", r: "residuos" }, { l: "energy", r: "energía" }
        ] },
        { type: "categorize", instruction: "¿Bueno o malo para el planeta?", buckets: [
          { id: "g", label: "Good for the planet" }, { id: "b", label: "Harmful" } ], items: [
          { t: "recycling", bucket: "g" }, { t: "plastic waste", bucket: "b" },
          { t: "solar power", bucket: "g" }, { t: "air pollution", bucket: "b" },
          { t: "planting trees", bucket: "g" }, { t: "oil spills", bucket: "b" } ] },
        { type: "multiple_choice", question: "Using buses and bikes instead of cars helps reduce ___.", options: ["pollution", "recycling", "energy"], correctIndex: 0, explanation: "Menos coches = menos contaminación (pollution)." },
        { type: "fill_blank", sentence: "We should ___ paper and glass instead of throwing them away.", answers: ["recycle"], hint: "Volver a usar los materiales.", explanation: "recycle = reciclar." },
        { type: "translate", prompt: "Traduce: \"Debemos ahorrar energía.\"", answers: ["we should save energy", "we must save energy"], explanation: "We should save energy." }
      ]
    },

    "lvl-b1-listen-climate": {
      lessonId: "lvl-b1-listen-climate", level: "B1", track: "Listening", topic: "society", skill: "listening",
      title: "Tema: cuidar el planeta", xpReward: 54, mascotState: "explaining",
      explanation: {
        body: "Escucha B1: una breve charla con consejos para ayudar al medio ambiente. Sigue la estructura (first, second, finally) y capta la idea principal y los detalles. (Toma nota mental de cada consejo.)",
        examples: [
          { en: "First, try to use less plastic.", es: "Primero, intenta usar menos plástico." },
          { en: "Switch off lights when you don't need them.", es: "Apaga las luces cuando no las necesites." }
        ]
      },
      exercises: [
        { type: "listening",
          text: "Good morning. Today I want to give you three simple tips to help the environment. First, try to use less plastic: carry your own bag and a reusable bottle.",
          question: "What is the first tip?", options: ["use less plastic", "drive more", "buy more bags"], correctIndex: 0, explanation: "\"First, try to use less plastic...\"" },
        { type: "listening",
          text: "Second, save energy at home by switching off lights and devices when you don't need them.",
          question: "How can you save energy at home?", options: ["leave the lights on", "switch off lights and devices", "use more devices"], correctIndex: 1, explanation: "\"...switching off lights and devices when you don't need them.\"" },
        { type: "listening",
          text: "Finally, whenever you can, walk or cycle instead of taking the car. It's good for the planet and for your health.",
          question: "What does the speaker recommend instead of driving?", options: ["walking or cycling", "taking taxis", "staying at home"], correctIndex: 0, explanation: "\"...walk or cycle instead of taking the car.\"" },
        { type: "multiple_choice", question: "What is the talk mainly about?", options: ["how to save money", "simple ways to help the environment", "how to cook"], correctIndex: 1, explanation: "Son tres consejos para ayudar al medio ambiente." },
        { type: "true_false", statement: "The speaker gives three tips.", answer: true, explanation: "\"...three simple tips...\"" }
      ]
    },

    /* =================== B1 · VIAJES Y CULTURA =================== */

    "lvl-b1-vocab-travel": {
      lessonId: "lvl-b1-vocab-travel", level: "B1", track: "Vocabulario", topic: "travel", skill: "vocab",
      title: "Tema: viajar al extranjero", xpReward: 52, mascotState: "explaining",
      explanation: {
        body: "Vocabulario B1 de viajes: documentos, alojamiento y actividades. Aprende términos como abroad, sightseeing o accommodation. (Asocia, clasifica y traduce.)",
        examples: [
          { en: "I'm going to travel abroad next year.", es: "Voy a viajar al extranjero el año que viene." },
          { en: "passport, accommodation, sightseeing, souvenir", es: "pasaporte, alojamiento, turismo, recuerdo" }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Une la palabra con su significado.", pairs: [
          { l: "abroad", r: "in another country" },
          { l: "accommodation", r: "a place to stay" },
          { l: "sightseeing", r: "visiting interesting places" },
          { l: "souvenir", r: "a thing you buy to remember a trip" }
        ] },
        { type: "categorize", instruction: "¿Es un documento o una actividad del viaje?", buckets: [
          { id: "d", label: "Document" }, { id: "a", label: "Activity" } ], items: [
          { t: "passport", bucket: "d" }, { t: "sightseeing", bucket: "a" },
          { t: "visa", bucket: "d" }, { t: "trying local food", bucket: "a" },
          { t: "boarding pass", bucket: "d" }, { t: "taking photos", bucket: "a" } ] },
        { type: "multiple_choice", question: "A place where you stay on holiday:", options: ["accommodation", "departure", "currency"], correctIndex: 0, explanation: "accommodation = alojamiento." },
        { type: "fill_blank", sentence: "Don't forget your ___; you can't travel abroad without it.", answers: ["passport"], hint: "Documento para viajar.", explanation: "passport = pasaporte." },
        { type: "translate", prompt: "Traduce: \"Voy a viajar al extranjero el año que viene.\"", answers: ["i'm going to travel abroad next year", "i am going to travel abroad next year"], explanation: "I'm going to travel abroad next year." }
      ]
    },

    "lvl-b1-listen-airport": {
      lessonId: "lvl-b1-listen-airport", level: "B1", track: "Listening", topic: "travel", skill: "listening",
      title: "Tema: anuncios del aeropuerto", xpReward: 54, mascotState: "explaining",
      explanation: {
        body: "Escucha B1: anuncios típicos de aeropuerto. Capta el destino, la puerta y la información importante. Cuidado con palabras clave como 'final' o 'gate closes'. (Escucha los datos concretos.)",
        examples: [
          { en: "This is the final boarding call for flight BA245.", es: "Último aviso de embarque del vuelo BA245." },
          { en: "Please proceed to gate 12.", es: "Diríjanse a la puerta 12." }
        ]
      },
      exercises: [
        { type: "listening",
          text: "Good afternoon. This is the final boarding call for flight BA245 to Madrid. Please proceed to gate 12 immediately.",
          question: "Where is the flight going?", options: ["to Madrid", "to Paris", "to Rome"], correctIndex: 0, explanation: "\"...flight BA245 to Madrid.\"" },
        { type: "listening",
          text: "Passengers are reminded that the gate closes ten minutes before departure.",
          question: "When does the gate close?", options: ["ten minutes before departure", "at departure time", "one hour before"], correctIndex: 0, explanation: "\"...the gate closes ten minutes before departure.\"" },
        { type: "multiple_choice", question: "Which gate should passengers go to?", options: ["gate 2", "gate 12", "gate 20"], correctIndex: 1, explanation: "\"...proceed to gate 12...\"" },
        { type: "true_false", statement: "This is the first boarding call.", answer: false, explanation: "Es el ÚLTIMO aviso ('final boarding call')." }
      ]
    }

  };

  /* Orden de aparición dentro de cada mundo (se anexa al final de cada
     escalera de destreza; la progresión real la calcula vesper_path.js). */
  var ORDER = [
    /* A1 */ "lvl-a1-vocab-food", "lvl-a1-listen-cafe", "lvl-a1-vocab-animals", "lvl-a1-listen-zoo",
    /* A2 */ "lvl-a2-vocab-travel", "lvl-a2-listen-directions", "lvl-a2-vocab-clothes", "lvl-a2-listen-shop",
    /* B1 */ "lvl-b1-vocab-environment", "lvl-b1-listen-climate", "lvl-b1-vocab-travel", "lvl-b1-listen-airport"
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
