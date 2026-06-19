/* =====================================================================
 * VESPER · TOEFL PACK  (niveles avanzados B2 · C1 · C2)
 * ---------------------------------------------------------------------
 * Lecciones de estilo TOEFL para los mundos superiores del sendero:
 *   - Reading académico: pasaje largo + preguntas de comprensión
 *     (idea principal, detalle, hecho negativo/EXCEPT, vocabulario en
 *     contexto, referencia, inferencia, propósito retórico, paráfrasis,
 *     inserción de oración y resumen).
 *   - Listening académico: lecture/seminario + preguntas (idea, detalle,
 *     actitud del ponente, inferencia).
 *   - Structure / Use of English / Writing: identificación de errores,
 *     paralelismo, inversión, conectores, registro y resumen integrado.
 *
 * Reutiliza los tipos de ejercicio que ya renderiza leccion.html:
 *   reading · listening · multiple_choice · fill_blank · true_false
 *   matching · categorize · translate · word_order
 *
 * Se fusiona en VESPER_LESSONS via VESPER_TOEFL_PACK.merge() (igual que
 * vesper_content_pack.js / vesper_expansion.js). La progresión por nivel
 * la gestiona vesper_path.js (escaleras por destreza + jefe de mundo).
 *
 * Dificultad: alta y creciente con el nivel. Las lecciones se anexan al
 * final de cada escalera de destreza, así son las más exigentes del mundo.
 * ===================================================================== */
window.VESPER_TOEFL_PACK = (function () {

  var L = {

    /* ===================== B2 · TOEFL FOUNDATIONS ===================== */

    "toefl-b2-read-urbanization": {
      lessonId: "toefl-b2-read-urbanization", level: "B2", track: "TOEFL · Reading", topic: "society", skill: "reading",
      title: "Reading TOEFL: Urbanization", xpReward: 64, mascotState: "explaining",
      explanation: {
        body: "Lectura académica al estilo TOEFL. Lee el pasaje una vez para captar la idea general y vuelve a él para responder. Practicarás varios tipos de pregunta: idea principal, detalle, hecho negativo (EXCEPT), vocabulario en contexto, referencia, inferencia y propósito retórico. (Localiza siempre la evidencia exacta antes de elegir.)",
        examples: [
          { en: "main idea / detail / inference", es: "idea principal / detalle / inferencia" },
          { en: "Which of the following is NOT mentioned?", es: "¿Cuál de los siguientes NO se menciona?" },
          { en: "the word X refers to...", es: "la palabra X se refiere a..." }
        ]
      },
      exercises: [
        { type: "reading", title: "The Growth of Cities",
          passage: "Over the past two centuries, the proportion of people living in cities has risen dramatically. In 1800, fewer than three percent of the world's population lived in urban areas; today, more than half do, and the figure continues to climb. This shift, known as urbanization, has reshaped economies, landscapes and daily life.\n\nThe principal driver of urbanization has been industrialization. As factories concentrated in towns, they drew workers away from rural agriculture in search of steady wages. Cities offered not only employment but also schools, hospitals and cultural institutions that were rarely available in the countryside. For many migrants, the move represented a genuine improvement in living standards, even when conditions were harsh.\n\nYet rapid growth has not been without costs. When populations expand faster than housing and infrastructure can accommodate them, the result is often overcrowding, pollution and strained public services. Slums emerge on the margins of prosperous districts, and the gap between rich and poor becomes painfully visible. Many modern governments therefore attempt to manage urban growth through careful planning rather than leaving it to chance.\n\nCritics of unregulated expansion argue that planning alone is insufficient. They point out that the most liveable cities tend to invest heavily in public transport and green space, treating these not as luxuries but as necessities. Whether developing nations can afford such investments while their cities are still growing remains one of the central dilemmas of the century.",
          questions: [
            { q: "What is the passage mainly about?", options: ["The causes, benefits and challenges of people moving to cities", "How factories manufacture goods efficiently", "Why agriculture has disappeared from the modern economy", "The history of public transport in Europe"], correctIndex: 0, explanation: "El texto define la urbanización y recorre sus causas, beneficios y problemas: esa es la idea principal." },
            { q: "According to the passage, all of the following were advantages of cities EXCEPT:", options: ["steady wages", "schools and hospitals", "cultural institutions", "lower pollution levels"], correctIndex: 3, explanation: "El texto asocia las ciudades con MÁS contaminación, no menos. Los otros tres sí se mencionan como ventajas." },
            { q: "The word \"strained\" (paragraph 3) is closest in meaning to...", options: ["relaxed", "overburdened", "abandoned", "expanded"], correctIndex: 1, explanation: "\"Strained public services\" = servicios sobrecargados / al límite." },
            { q: "In paragraph 4, the word \"these\" refers to...", options: ["the most liveable cities", "public transport and green space", "developing nations", "central dilemmas"], correctIndex: 1, explanation: "\"...treating these not as luxuries...\": 'these' retoma 'public transport and green space'." },
            { q: "Why does the author mention slums in paragraph 3?", options: ["To prove that planning is always successful", "To illustrate a visible cost of unmanaged urban growth", "To argue that the poor prefer to live in cities", "To describe a typical tourist district"], correctIndex: 1, explanation: "Los barrios marginales ejemplifican un coste visible del crecimiento sin control (función retórica)." },
            { q: "Which sentence best expresses the essential information of the highlighted idea: \"Whether developing nations can afford such investments while their cities are still growing remains one of the central dilemmas of the century\"?", options: ["Developing nations have already solved the problem of urban investment.", "It is unclear whether poorer countries can pay for good infrastructure during rapid growth.", "Investment in transport is unnecessary for growing cities.", "Only wealthy nations face dilemmas this century."], correctIndex: 1, explanation: "La paráfrasis fiel conserva la incertidumbre sobre si los países en desarrollo pueden costear esas inversiones mientras crecen." }
          ] },
        { type: "multiple_choice", question: "It can be inferred from the passage that the author believes urbanization is...", options: ["entirely beneficial", "entirely harmful", "a mixed process that must be managed", "a temporary trend that will reverse"], correctIndex: 2, explanation: "El texto contrasta beneficios y costes y defiende la planificación: una visión matizada." },
        { type: "multiple_choice", question: "In context, \"drew workers away from rural agriculture\" means the factories...", options: ["painted pictures of workers", "attracted workers away from farming", "paid farmers to stay on the land", "forced workers to return home"], correctIndex: 1, explanation: "\"Draw away\" aquí = atraer/llevarse a la gente lejos de algo." },
        { type: "true_false", statement: "According to the passage, the most liveable cities treat public transport as a luxury rather than a necessity.", answer: false, explanation: "Es justo lo contrario: las tratan como necesidades, no lujos." },
        { type: "matching", instruction: "Une cada término del texto con su significado.", pairs: [
          { l: "to climb (figures)", r: "to keep rising" },
          { l: "overcrowding", r: "too many people in one place" },
          { l: "liveable", r: "pleasant to live in" },
          { l: "dilemma", r: "a difficult choice" }
        ] },
        { type: "fill_blank", sentence: "Governments try to ___ urban growth through planning rather than leaving it to chance.", answers: ["manage"], hint: "Controlar/gestionar.", explanation: "\"...attempt to manage urban growth through careful planning...\"" }
      ]
    },

    "toefl-b2-listen-orientation": {
      lessonId: "toefl-b2-listen-orientation", level: "B2", track: "TOEFL · Listening", topic: "study", skill: "listening",
      title: "Listening TOEFL: Campus orientation", xpReward: 64, mascotState: "explaining",
      explanation: {
        body: "En el TOEFL escuchas una charla académica y respondes varias preguntas seguidas. Escucha (puedes repetir y poner más lento), capta la idea principal, los detalles y la actitud o intención del ponente. (Anticipa: tras escuchar vendrán preguntas de detalle e inferencia.)",
        examples: [
          { en: "Let me give you a quick overview.", es: "Permítanme un resumen rápido." },
          { en: "I'd strongly recommend you...", es: "Les recomendaría encarecidamente que..." },
          { en: "What does the speaker imply?", es: "¿Qué da a entender el ponente?" }
        ]
      },
      exercises: [
        { type: "listening",
          text: "Welcome, everyone. Before classes begin next week, I want to walk you through a few practical things about campus life. First, your student card is essential: you'll need it to borrow books from the library, to enter the computer labs, and even to get a discount in the cafeteria. If you lose it, report it immediately at the front desk. Second, most of your reading materials will be posted online, so make sure you can log in to the student portal before Monday.",
          question: "What is the speaker mainly doing?", options: ["Explaining a scientific theory", "Giving new students practical information about campus life", "Complaining about the library rules", "Describing the history of the university"], correctIndex: 1, explanation: "La intención principal es orientar a estudiantes nuevos sobre la vida en el campus." },
        { type: "multiple_choice", question: "According to the talk, what is the student card NOT used for?", options: ["Borrowing library books", "Entering the computer labs", "Paying tuition fees", "Getting a cafeteria discount"], correctIndex: 2, explanation: "Menciona biblioteca, laboratorios y descuento, pero NO el pago de matrícula." },
        { type: "listening",
          text: "One more thing about the portal: if you can't log in, don't wait until the last minute. The help desk gets very busy during the first week, so I'd strongly recommend sorting out any password problems today or tomorrow. Trust me, you don't want to be standing in a long queue when you should be in your first class.",
          question: "What does the speaker imply about the help desk?", options: ["It is closed during the first week.", "It will be crowded once classes start.", "It cannot reset passwords.", "It is located in the cafeteria."], correctIndex: 1, explanation: "Da a entender que estará saturado en la primera semana ('gets very busy', 'long queue'): por eso aconseja adelantarse." },
        { type: "true_false", statement: "The speaker suggests students should solve login problems before the first week of classes.", answer: true, explanation: "\"...I'd strongly recommend sorting out any password problems today or tomorrow.\"" },
        { type: "listening",
          text: "Finally, a quick word about deadlines. Each professor sets their own, and extensions are granted only in genuine emergencies, with documentation. Planning ahead is far more reliable than hoping for sympathy the night before a paper is due.",
          question: "What is the speaker's attitude toward last-minute extension requests?", options: ["Encouraging", "Skeptical and discouraging", "Indifferent", "Confused"], correctIndex: 1, explanation: "El tono es escéptico: las prórrogas solo en emergencias reales y con documentos; planificar es 'far more reliable'." },
        { type: "multiple_choice", question: "According to the talk, extensions are granted...", options: ["whenever a student asks", "only in genuine emergencies with documentation", "never, under any circumstances", "automatically for online courses"], correctIndex: 1, explanation: "\"...extensions are granted only in genuine emergencies, with documentation.\"" }
      ]
    },

    "toefl-b2-structure": {
      lessonId: "toefl-b2-structure", level: "B2", track: "TOEFL · Structure", topic: "writing", skill: "use",
      title: "Structure TOEFL: Sentence accuracy", xpReward: 62, mascotState: "explaining",
      explanation: {
        body: "La sección de estructura del TOEFL exige gramática precisa: concordancia, paralelismo, conectores, inversión, modificadores y formas verbales. Elige siempre la opción gramaticalmente completa y de registro formal. (Detecta el error o completa la oración académica.)",
        examples: [
          { en: "Not only did sales rise, but profits also grew.", es: "No solo subieron las ventas, sino que crecieron las ganancias." },
          { en: "The data suggest that the trend will continue.", es: "Los datos sugieren que la tendencia continuará." },
          { en: "Having finished the report, she submitted it.", es: "Tras terminar el informe, lo entregó." }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "Choose the grammatically correct sentence.", options: ["The number of applicants have increased.", "The number of applicants has increased.", "The number of applicants are increasing.", "The number of applicants were increased."], correctIndex: 1, explanation: "\"The number of...\" es singular: requiere 'has'." },
        { type: "multiple_choice", question: "Complete formally: \"___ the experiment failed, the researchers learned a great deal.\"", options: ["Despite", "Although", "However", "In spite"], correctIndex: 1, explanation: "Para una cláusula (sujeto + verbo) se usa 'Although', no 'Despite'/'In spite' (preposiciones) ni 'However' (adverbio)." },
        { type: "multiple_choice", question: "Which sentence avoids a dangling modifier?", options: ["Walking into the lab, the equipment looked outdated.", "Walking into the lab, the students noticed the outdated equipment.", "Walking into the lab, it was outdated.", "Walking into the lab, the outdatedness was clear."], correctIndex: 1, explanation: "El gerundio inicial debe referirse al sujeto: quienes caminan son 'the students', no 'the equipment'." },
        { type: "fill_blank", sentence: "The report recommends ___ energy consumption during peak hours. (reducir)", answers: ["reducing"], hint: "recommend + gerundio.", explanation: "'recommend' va seguido de gerundio: recommend reducing." },
        { type: "fill_blank", sentence: "The committee insisted that the proposal ___ submitted by Friday. (formal / subjuntivo)", answers: ["be"], hint: "insist that + sujeto + verbo en forma base.", explanation: "Tras 'insist that' el subjuntivo formal usa la forma base: '...that the proposal be submitted.'" },
        { type: "word_order", words: ["Rarely", "have", "scientists", "observed", "such", "a", "rapid", "change"],
          correctOrder: ["Rarely", "have", "scientists", "observed", "such", "a", "rapid", "change"],
          hint: "Inversión tras adverbio negativo: Rarely + have + sujeto + participio." },
        { type: "multiple_choice", question: "Which sentence is parallel (correct)?", options: ["The course teaches reading, writing, and to speak.", "The course teaches reading, writing, and speaking.", "The course teaches to read, writing, and speaking.", "The course teaches reading, to write, and speaking."], correctIndex: 1, explanation: "El paralelismo exige la misma forma: reading, writing, speaking." },
        { type: "multiple_choice", question: "Choose the correct conditional (formal): \"If the sample ___ contaminated, the results would be invalid.\"", options: ["were", "is", "was being", "will be"], correctIndex: 0, explanation: "Segundo condicional formal: 'If the sample were contaminated, ...would be invalid.'" },
        { type: "true_false", statement: "In strict academic English, \"data\" is often treated as a plural noun (e.g. \"the data suggest\").", answer: true, explanation: "En registro académico estricto 'data' suele ser plural: 'the data suggest'." }
      ]
    },

    "toefl-b2-read-energy": {
      lessonId: "toefl-b2-read-energy", level: "B2", track: "TOEFL · Reading", topic: "science", skill: "reading",
      title: "Reading TOEFL: Renewable energy", xpReward: 66, mascotState: "explaining",
      explanation: {
        body: "Segunda lectura B2, un punto más difícil. Incluye un tipo de pregunta muy del TOEFL: la inserción de oración (¿dónde encaja mejor esta frase?). Fíjate en los conectores y en a qué se refieren los pronombres. (Sigue el hilo lógico párrafo a párrafo.)",
        examples: [
          { en: "Where would the sentence best fit?", es: "¿Dónde encajaría mejor la oración?" },
          { en: "intermittent", es: "intermitente" }
        ]
      },
      exercises: [
        { type: "reading", title: "Powering the Future",
          passage: "For most of the industrial era, electricity came from burning fossil fuels such as coal and gas. [A] In recent decades, however, the falling cost of solar panels and wind turbines has made renewable energy increasingly competitive. [B] In several countries, the cheapest new source of power is now the sun rather than coal. [C] This transformation has happened far faster than most analysts predicted. [D]\n\nRenewables nonetheless present a distinctive challenge: they are intermittent. The sun does not shine at night, and the wind does not always blow. Because electricity is difficult to store on a large scale, supply can fall short exactly when demand peaks. Engineers are tackling this problem with ever-larger batteries and with grids that share power across wide regions, so that a calm evening in one place can be offset by a windy night in another.\n\nThe stakes are high. If clean power becomes both cheap and reliable, the cost of cutting emissions could prove far lower than once feared. If storage lags behind, however, nations may remain dependent on fossil fuels for longer than the climate can afford.",
          questions: [
            { q: "Look at the four squares [A], [B], [C], [D]. Where would this sentence best fit? \"As a result, investment has poured into the sector.\"", options: ["[A]", "[B]", "[C]", "[D]"], correctIndex: 3, explanation: "La frase ('como resultado, llegó la inversión') encaja tras explicar que las renovables se han vuelto competitivas y la transición fue rápida: el punto [D] cierra ese hilo." },
            { q: "What is the 'distinctive challenge' of renewables described in paragraph 2?", options: ["They are too expensive to build.", "They are intermittent and hard to store.", "They cannot be connected to a grid.", "They produce too much pollution."], correctIndex: 1, explanation: "\"...they are intermittent\" y la electricidad es difícil de almacenar." },
            { q: "The word \"offset\" in paragraph 2 is closest in meaning to...", options: ["increased", "compensated for", "switched off", "measured"], correctIndex: 1, explanation: "'Offset' = compensar: una noche sin viento en un sitio se compensa con viento en otro." },
            { q: "According to the passage, what determines whether nations stay dependent on fossil fuels?", options: ["The price of coal alone", "Whether energy storage keeps pace", "The number of analysts", "Government advertising"], correctIndex: 1, explanation: "\"If storage lags behind... nations may remain dependent on fossil fuels...\"" }
          ] },
        { type: "multiple_choice", question: "The author's tone toward the energy transition is best described as...", options: ["dismissive", "cautiously hopeful", "openly hostile", "completely certain"], correctIndex: 1, explanation: "Reconoce el rápido progreso pero advierte del reto del almacenamiento: optimismo cauto." },
        { type: "true_false", statement: "According to the passage, in some countries solar power is now cheaper than coal.", answer: true, explanation: "\"...the cheapest new source of power is now the sun rather than coal.\"" },
        { type: "fill_blank", sentence: "Renewables are ___: the sun does not shine at night and the wind does not always blow.", answers: ["intermittent"], hint: "No constantes; se interrumpen.", explanation: "'Intermittent' = intermitente." },
        { type: "matching", instruction: "Une la palabra con su sinónimo.", pairs: [
          { l: "competitive", r: "able to compete on price" },
          { l: "to tackle", r: "to deal with" },
          { l: "to lag behind", r: "to fall behind" },
          { l: "stakes", r: "what can be won or lost" }
        ] }
      ]
    },

    /* ======================= C1 · TOEFL ACADEMIC ======================= */

    "toefl-c1-read-photosynthesis": {
      lessonId: "toefl-c1-read-photosynthesis", level: "C1", track: "TOEFL · Reading", topic: "science", skill: "reading",
      title: "Reading TOEFL: Photosynthesis", xpReward: 70, mascotState: "explaining",
      explanation: {
        body: "Lectura científica C1: vocabulario técnico y oraciones complejas. Identifica la función de cada párrafo, distingue hechos de propósitos retóricos y resuelve preguntas de hecho negativo, referencia, inferencia y paráfrasis. (Localiza la evidencia exacta antes de responder.)",
        examples: [
          { en: "convert sunlight into chemical energy", es: "convertir la luz solar en energía química" },
          { en: "by-product", es: "subproducto" },
          { en: "Which best paraphrases the sentence?", es: "¿Cuál parafrasea mejor la oración?" }
        ]
      },
      exercises: [
        { type: "reading", title: "How Plants Make Food",
          passage: "Photosynthesis is the process by which green plants, algae and some bacteria convert light energy into chemical energy stored in sugars. The process takes place mainly in the leaves, within tiny structures called chloroplasts that contain the green pigment chlorophyll.\n\nDuring photosynthesis, a plant absorbs carbon dioxide from the air through small pores called stomata and draws up water through its roots. Using energy captured from sunlight, the plant combines these raw materials to produce glucose, a simple sugar that fuels growth. Oxygen is released as a by-product. Crucially, the stomata that admit carbon dioxide also allow water vapour to escape, so a plant must constantly balance the need for gas exchange against the risk of drying out.\n\nThe significance of this reaction extends far beyond the individual plant. Because photosynthesis removes carbon dioxide and releases oxygen, it helps regulate the composition of the atmosphere. Indeed, nearly all of the oxygen that animals breathe ultimately originates from photosynthetic organisms. Over geological time, the gradual accumulation of this oxygen transformed the planet, making complex animal life possible in the first place.",
          questions: [
            { q: "What is the main purpose of the passage?", options: ["To explain how photosynthesis works and why it matters", "To compare plants with animals", "To describe the colour of leaves", "To argue that plants are more important than oceans"], correctIndex: 0, explanation: "Explica el proceso y su importancia: ese es el propósito." },
            { q: "According to the passage, the stomata serve which two functions?", options: ["Storing glucose and producing chlorophyll", "Admitting carbon dioxide and releasing water vapour", "Absorbing sunlight and water", "Releasing glucose and absorbing oxygen"], correctIndex: 1, explanation: "Las estomas dejan entrar CO2 y dejan escapar vapor de agua (de ahí el equilibrio que debe mantener la planta)." },
            { q: "The phrase \"by-product\" is closest in meaning to...", options: ["the main goal of the process", "something produced in addition to the main product", "a harmful waste that must be removed", "a raw material"], correctIndex: 1, explanation: "Un subproducto se genera además del producto principal (aquí, la glucosa)." },
            { q: "Why does the author mention that animals breathe oxygen from photosynthetic organisms?", options: ["To prove animals are unnecessary", "To show that photosynthesis matters far beyond a single plant", "To explain how roots absorb water", "To define chlorophyll"], correctIndex: 1, explanation: "Ejemplifica el impacto global del proceso (función retórica del último párrafo)." },
            { q: "Which best paraphrases: \"a plant must constantly balance the need for gas exchange against the risk of drying out\"?", options: ["Plants never need to exchange gases.", "Plants must trade off taking in gases with losing water.", "Plants dry out only at night.", "Gas exchange has no effect on water."], correctIndex: 1, explanation: "Hay un compromiso: para intercambiar gases la planta arriesga perder agua." },
            { q: "It can be inferred that, without photosynthesis, ...", options: ["the atmosphere would contain much less oxygen", "plants would grow faster", "carbon dioxide would disappear", "the sun would stop shining"], correctIndex: 0, explanation: "Si casi todo el oxígeno proviene de organismos fotosintéticos, sin ellos habría mucho menos oxígeno." }
          ] },
        { type: "multiple_choice", question: "According to the passage, which is NOT a product or output of photosynthesis?", options: ["glucose", "oxygen", "carbon dioxide", "chemical energy in sugars"], correctIndex: 2, explanation: "El CO2 es materia prima (entrada), no producto. Los demás son salidas." },
        { type: "matching", instruction: "Une cada término con su definición.", pairs: [
          { l: "chlorophyll", r: "green pigment that captures light" },
          { l: "stomata", r: "pores that let gases in and out" },
          { l: "glucose", r: "simple sugar that fuels growth" },
          { l: "chloroplast", r: "structure where photosynthesis occurs" }
        ] },
        { type: "fill_blank", sentence: "Over geological time, the build-up of oxygen made complex ___ life possible.", answers: ["animal"], hint: "Lo que respira oxígeno.", explanation: "\"...making complex animal life possible in the first place.\"" },
        { type: "true_false", statement: "According to the passage, only green plants are capable of photosynthesis.", answer: false, explanation: "\"...green plants, algae and some bacteria...\"" }
      ]
    },

    "toefl-c1-listen-lecture": {
      lessonId: "toefl-c1-listen-lecture", level: "C1", track: "TOEFL · Listening", topic: "study", skill: "listening",
      title: "Listening TOEFL: History lecture", xpReward: 70, mascotState: "explaining",
      explanation: {
        body: "Una lecture académica mezcla datos con la interpretación del profesor. Escucha la idea central, sigue la organización (causa-efecto, ejemplos, salvedades) y capta el tono y los matices. (Distingue el dato de la opinión del profesor.)",
        examples: [
          { en: "Let's turn our attention to...", es: "Centrémonos en..." },
          { en: "I'd urge you to be cautious.", es: "Les insto a ser cautos." },
          { en: "What can be inferred about...?", es: "¿Qué se puede inferir sobre...?" }
        ]
      },
      exercises: [
        { type: "listening",
          text: "Today I'd like to talk about the printing press and why historians consider it one of the most transformative inventions ever made. Before the mid-fifteenth century, books in Europe were copied by hand, which made them extraordinarily expensive and rare. When Johannes Gutenberg introduced movable metal type around 1450, the cost of producing a book fell sharply. Suddenly, ideas could spread across the continent in weeks rather than decades.",
          question: "What is the lecture mainly about?", options: ["The biography of Johannes Gutenberg", "Why the printing press was so transformative", "How to repair an old printing machine", "The history of paper in China"], correctIndex: 1, explanation: "Todo gira en torno al impacto transformador de la imprenta." },
        { type: "multiple_choice", question: "According to the lecture, how were books made in Europe before the mid-fifteenth century?", options: ["Printed with metal type", "Copied by hand", "Imported from Asia", "Carved into wood"], correctIndex: 1, explanation: "\"...books in Europe were copied by hand...\"" },
        { type: "listening",
          text: "Now, it's tempting to think the printing press alone caused these changes, but I'd urge you to be cautious. The press spread quickly only because literacy was already rising and paper had become cheaper. Technology rarely works in isolation; it amplifies forces that are already present.",
          question: "What is the professor's main point in this part?", options: ["The press was unimportant.", "The press succeeded because other conditions were already in place.", "Paper was the only cause.", "Literacy fell after the press appeared."], correctIndex: 1, explanation: "Advierte que la tecnología amplifica fuerzas ya presentes (alfabetización, papel barato)." },
        { type: "multiple_choice", question: "What can be inferred about the professor's view of technological change?", options: ["A single invention usually explains historical change.", "Inventions rarely have any effect.", "Change typically results from several factors acting together.", "Technology should be avoided."], correctIndex: 2, explanation: "'Technology rarely works in isolation' sugiere causas múltiples que se combinan." },
        { type: "listening",
          text: "Consider one striking consequence. Within a few decades, printers were producing not just bibles but pamphlets, maps, and scientific tables. Errors could now be corrected and reprinted, so knowledge began to accumulate and improve from one edition to the next, something almost impossible when every copy was unique.",
          question: "According to this part, why was the ability to reprint significant?", options: ["It made books more decorative.", "It allowed errors to be corrected so knowledge could accumulate.", "It reduced literacy.", "It made every copy unique."], correctIndex: 1, explanation: "Reimprimir permitía corregir errores y acumular/mejorar el conocimiento entre ediciones." },
        { type: "true_false", statement: "The professor suggests that the printing press alone was responsible for spreading ideas.", answer: false, explanation: "\"...it's tempting to think the printing press alone caused these changes, but I'd urge you to be cautious.\"" }
      ]
    },

    "toefl-c1-vocab-academic": {
      lessonId: "toefl-c1-vocab-academic", level: "C1", track: "TOEFL · Vocabulary", topic: "study", skill: "vocab",
      title: "Vocabulary TOEFL: Academic Word List", xpReward: 66, mascotState: "explaining",
      explanation: {
        body: "El TOEFL premia el vocabulario académico (AWL): verbos como analyze, indicate, derive; nombres como hypothesis, criteria; y sus distintas formas (analyse → analysis → analytical). Practica reconocerlos, distinguir matices y usarlos en contexto formal. (Asocia, clasifica, transforma y completa.)",
        examples: [
          { en: "The results indicate a clear trend.", es: "Los resultados indican una tendencia clara." },
          { en: "We derived our conclusions from the data.", es: "Derivamos nuestras conclusiones de los datos." },
          { en: "a comprehensive analysis", es: "un análisis exhaustivo" }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Une el verbo académico con su sinónimo.", pairs: [
          { l: "indicate", r: "show / point to" },
          { l: "derive", r: "obtain from a source" },
          { l: "scrutinize", r: "examine very closely" },
          { l: "substantiate", r: "support with evidence" }
        ] },
        { type: "categorize", instruction: "¿La palabra es nombre, verbo o adjetivo?", buckets: [
          { id: "n", label: "Noun" }, { id: "v", label: "Verb" }, { id: "a", label: "Adjective" } ], items: [
          { t: "hypothesis", bucket: "n" }, { t: "evaluate", bucket: "v" },
          { t: "coherent", bucket: "a" }, { t: "interpret", bucket: "v" },
          { t: "analysis", bucket: "n" }, { t: "ambiguous", bucket: "a" } ] },
        { type: "fill_blank", sentence: "The findings strongly ___ that the treatment is effective. (indicar)", answers: ["indicate", "suggest"], hint: "Verbo académico para 'mostrar/apuntar'.", explanation: "\"The findings indicate/suggest that...\"" },
        { type: "fill_blank", sentence: "She carried out a thorough ___ of the results. (forma sustantiva de 'analyse')", answers: ["analysis"], hint: "analyse -> ___.", explanation: "El sustantivo es 'analysis'." },
        { type: "multiple_choice", question: "Choose the most precise academic word: \"The two studies reached ___ conclusions, despite different methods.\"", options: ["kinda similar", "consistent", "okay", "samey"], correctIndex: 1, explanation: "'Consistent conclusions' es el registro académico adecuado." },
        { type: "multiple_choice", question: "Which word means 'open to more than one interpretation'?", options: ["coherent", "ambiguous", "explicit", "redundant"], correctIndex: 1, explanation: "'Ambiguous' = ambiguo, con más de una lectura." },
        { type: "true_false", statement: "\"To substantiate a claim\" means to weaken it.", answer: false, explanation: "Significa respaldarla con pruebas, no debilitarla." },
        { type: "translate", prompt: "Traduce al inglés (académico): \"Los datos respaldan la hipótesis.\"",
          answers: ["the data support the hypothesis", "the data supports the hypothesis"], explanation: "The data support the hypothesis." }
      ]
    },

    "toefl-c1-read-placebo": {
      lessonId: "toefl-c1-read-placebo", level: "C1", track: "TOEFL · Reading", topic: "science", skill: "reading",
      title: "Reading TOEFL: The placebo effect", xpReward: 72, mascotState: "explaining",
      explanation: {
        body: "Lectura C1 sobre metodología científica, con matices y salvedades. Atiende al razonamiento del autor, no solo a los datos: por qué se diseñan así los experimentos y qué conclusiones NO se pueden sacar. (Cuidado con los distractores que exageran el texto.)",
        examples: [
          { en: "double-blind trial", es: "ensayo doble ciego" },
          { en: "a control group", es: "un grupo de control" }
        ]
      },
      exercises: [
        { type: "reading", title: "Mind Over Medicine",
          passage: "When patients are given a treatment they believe to be effective, many improve even if the treatment itself is inactive, a phenomenon known as the placebo effect. A sugar pill, presented convincingly as medicine, can measurably reduce reported pain. The effect is real enough that it complicates the testing of genuine drugs.\n\nTo separate a drug's true effect from the placebo response, researchers rely on the randomized controlled trial. Volunteers are divided at random into two groups: one receives the actual drug, the other an identical-looking placebo. Ideally, neither the patients nor the doctors know who is receiving which, an arrangement called a double-blind design. Only by comparing the two groups can scientists be confident that any extra improvement is due to the drug rather than to expectation alone.\n\nThe placebo effect should not, however, be mistaken for proof that illness is imaginary. Expectation appears to trigger genuine physiological changes, including the release of the body's own pain-relieving chemicals. What the effect reveals is not that symptoms are fake, but that the mind's influence on the body is more substantial than once assumed.",
          questions: [
            { q: "What is the main idea of the passage?", options: ["Sugar pills are better than real drugs.", "The placebo effect is real and shapes how drugs must be tested.", "All illness is imaginary.", "Doctors should never use placebos."], correctIndex: 1, explanation: "Define el efecto placebo y explica cómo obliga a diseñar bien los ensayos; además aclara qué NO significa." },
            { q: "According to the passage, why are double-blind trials used?", options: ["To make trials cheaper", "So that neither patients nor doctors know who gets the real drug, isolating its true effect", "To give everyone the real drug", "To speed up recovery"], correctIndex: 1, explanation: "El doble ciego evita que las expectativas de pacientes y médicos contaminen el resultado." },
            { q: "The author states that the placebo effect should NOT be taken as evidence that...", options: ["expectation affects the body", "illness is imaginary or fake", "drugs must be tested carefully", "the mind influences the body"], correctIndex: 1, explanation: "\"...should not... be mistaken for proof that illness is imaginary.\"" },
            { q: "Which can be inferred from the final paragraph?", options: ["The mind has no effect on physical health.", "Mental expectation can produce measurable bodily changes.", "Pain-relieving chemicals are fictional.", "Placebos always outperform drugs."], correctIndex: 1, explanation: "La expectativa libera analgésicos propios del cuerpo: cambios fisiológicos reales." },
            { q: "Why does the author mention 'the body's own pain-relieving chemicals'?", options: ["To prove placebos are dangerous", "To support the claim that the effect involves real physiology", "To recommend a specific drug", "To criticize controlled trials"], correctIndex: 1, explanation: "Es evidencia de que el efecto tiene base fisiológica real, no imaginaria." }
          ] },
        { type: "multiple_choice", question: "In context, 'inactive' (paragraph 1) describes a treatment that...", options: ["is very powerful", "has no real medical effect of its own", "is given by injection", "is illegal"], correctIndex: 1, explanation: "Un tratamiento 'inactive' (p. ej. una pastilla de azúcar) carece de efecto médico propio." },
        { type: "true_false", statement: "According to the passage, in a double-blind trial the doctors know which patients receive the real drug.", answer: false, explanation: "En el doble ciego ni pacientes ni médicos lo saben." },
        { type: "fill_blank", sentence: "In a trial, the group that receives the placebo serves as the ___ group.", answers: ["control"], hint: "Punto de comparación.", explanation: "El grupo placebo es el grupo de control." },
        { type: "matching", instruction: "Une el término con su significado.", pairs: [
          { l: "placebo", r: "an inactive treatment" },
          { l: "double-blind", r: "neither side knows who gets what" },
          { l: "physiological", r: "relating to how the body works" },
          { l: "expectation", r: "what one believes will happen" }
        ] }
      ]
    },

    /* ======================== C2 · TOEFL MASTERY ======================== */

    "toefl-c2-read-neuroscience": {
      lessonId: "toefl-c2-read-neuroscience", level: "C2", track: "TOEFL · Reading", topic: "science", skill: "reading",
      title: "Reading TOEFL: Neuroplasticity", xpReward: 78, mascotState: "explaining",
      explanation: {
        body: "Nivel de dominio. Pasajes densos con concesión, contraste e hipótesis. Lee identificando la postura del autor y la función retórica de cada oración; los distractores serán plausibles y exigirán matiz. Incluye una pregunta de resumen (idea principal vs. detalle). (Distingue afirmación, evidencia y salvedad.)",
        examples: [
          { en: "contrary to long-held belief", es: "en contra de una creencia arraigada" },
          { en: "to a remarkable extent", es: "en una medida notable" },
          { en: "Select the ideas that belong in a summary.", es: "Elige las ideas que van en un resumen." }
        ]
      },
      exercises: [
        { type: "reading", title: "The Adaptable Brain",
          passage: "For much of the twentieth century, neuroscientists assumed that the adult brain was essentially fixed: once development was complete, its structure could not meaningfully change. This assumption has since been overturned. Contrary to long-held belief, the mature brain retains, to a remarkable extent, the capacity to reorganize itself, a property now termed neuroplasticity.\n\nEvidence for neuroplasticity comes from diverse sources. Patients who have lost a limb sometimes report sensations that seem to arise from the missing part; brain imaging reveals that regions once devoted to the limb have been recruited for other functions. Likewise, studies of musicians show that intensive practice can enlarge the cortical areas associated with finger control. Such findings suggest that experience does not merely fill a static brain with information; it physically reshapes the organ itself.\n\nNevertheless, plasticity should not be romanticized. The same mechanisms that allow the brain to recover from injury can also entrench maladaptive patterns, as in chronic pain or addiction, where unwanted circuits are reinforced rather than erased. Moreover, plasticity tends to decline with age, which is why recovery from brain injury is often more complete in children than in adults. Plasticity, in short, is neither inherently beneficial nor harmful; it is simply the brain's capacity for change, for better or worse.",
          questions: [
            { q: "What is the author's central claim?", options: ["The adult brain cannot change after development.", "The mature brain can reorganize itself, though this is not always beneficial.", "Neuroplasticity occurs only in musicians.", "Brain injury is always permanent."], correctIndex: 1, explanation: "Afirma la plasticidad del cerebro adulto y matiza que no siempre es positiva." },
            { q: "Why does the author mention musicians?", options: ["To prove that music improves memory", "As evidence that experience can physically reshape the brain", "To criticize intensive practice", "To show music is more difficult than medicine"], correctIndex: 1, explanation: "El ejemplo es evidencia de reorganización cortical inducida por la experiencia." },
            { q: "The phrase \"should not be romanticized\" suggests the author wants readers to...", options: ["admire plasticity without question", "view plasticity in an unrealistically positive way", "avoid an overly idealized view of plasticity", "ignore plasticity altogether"], correctIndex: 2, explanation: "'No idealizar/romantizar' = evitar una visión demasiado positiva." },
            { q: "According to paragraph 3, why is recovery often more complete in children?", options: ["Children have more injuries.", "Plasticity tends to decline with age.", "Adults do not seek treatment.", "Children's brains are fully developed."], correctIndex: 1, explanation: "\"...plasticity tends to decline with age, which is why recovery... is often more complete in children...\"" },
            { q: "In context, 'entrench maladaptive patterns' means to...", options: ["remove harmful habits", "firmly establish harmful patterns", "study unusual behaviour", "reverse an injury"], correctIndex: 1, explanation: "'Entrench' = afianzar/arraigar; 'maladaptive' = perjudicial." },
            { q: "Summary task — select the statement that belongs in a summary of the passage (a main idea, not a minor detail):", options: ["Some amputees feel sensations in a missing limb.", "The adult brain can reorganize itself, with both beneficial and harmful consequences.", "Musicians practise finger control.", "Brain imaging uses scanners."], correctIndex: 1, explanation: "El resumen recoge la tesis central; las otras son detalles de apoyo." }
          ] },
        { type: "multiple_choice", question: "Which statement best reflects the author's overall stance?", options: ["Neuroplasticity is entirely positive.", "Neuroplasticity is morally neutral and can have good or bad effects.", "Neuroplasticity has never been proven.", "Neuroplasticity only harms the brain."], correctIndex: 1, explanation: "\"...neither inherently beneficial nor harmful...\" => neutral, con efectos en ambos sentidos." },
        { type: "true_false", statement: "The passage implies that experience leaves the physical structure of the brain unchanged.", answer: false, explanation: "Al contrario: 'it physically reshapes the organ itself.'" },
        { type: "fill_blank", sentence: "The capacity of the brain to reorganize itself is called ___.", answers: ["neuroplasticity"], hint: "El término definido en el pasaje.", explanation: "\"...a property now termed neuroplasticity.\"" },
        { type: "matching", instruction: "Une el término con su significado.", pairs: [
          { l: "to overturn (a belief)", r: "to reverse / disprove it" },
          { l: "to recruit (a region)", r: "to put it to a new use" },
          { l: "maladaptive", r: "harmful, poorly adapted" },
          { l: "inherently", r: "by its very nature" }
        ] }
      ]
    },

    "toefl-c2-listen-seminar": {
      lessonId: "toefl-c2-listen-seminar", level: "C2", track: "TOEFL · Listening", topic: "study", skill: "listening",
      title: "Listening TOEFL: Economics seminar", xpReward: 76, mascotState: "explaining",
      explanation: {
        body: "En un seminario avanzado, el ponente plantea una pregunta, presenta evidencia y cuestiona la interpretación obvia. Escucha la tesis, los contraejemplos, la actitud crítica y lo que da a entender sin decirlo. (Capta el argumento y el matiz, no solo los datos.)",
        examples: [
          { en: "At first glance, the answer seems obvious.", es: "A primera vista, la respuesta parece obvia." },
          { en: "But the picture is more complicated than that.", es: "Pero el panorama es más complejo." },
          { en: "Be wary of anyone who claims...", es: "Desconfíen de quien afirme..." }
        ]
      },
      exercises: [
        { type: "listening",
          text: "Let's consider a familiar question in economics: does raising the minimum wage reduce employment? At first glance, the answer seems obvious. If labour becomes more expensive, employers should hire fewer workers. For decades, this was treated almost as a law of nature. But the picture is more complicated than that. A number of careful studies, comparing neighbouring regions with different wage laws, found little or no fall in employment after modest increases.",
          question: "What is the speaker mainly trying to show?", options: ["That raising the minimum wage always destroys jobs", "That the obvious prediction about minimum wage is challenged by evidence", "That economics cannot be studied scientifically", "That wages should never rise"], correctIndex: 1, explanation: "Contrasta la predicción 'obvia' con estudios que la cuestionan." },
        { type: "multiple_choice", question: "What kind of evidence does the speaker cite?", options: ["Personal opinions of employers", "Studies comparing neighbouring regions with different wage laws", "Ancient historical records", "A single company's profits"], correctIndex: 1, explanation: "\"...comparing neighbouring regions with different wage laws...\"" },
        { type: "listening",
          text: "Now, I'm not telling you that minimum wages never affect jobs. Push the wage high enough and you will surely see consequences. The lesson is subtler: economic predictions that sound like common sense don't always survive contact with the data. So be wary of anyone who claims the answer is simple.",
          question: "What does the speaker imply about 'common-sense' economic claims?", options: ["They are always correct.", "They should be accepted without testing.", "They may fail when checked against evidence.", "They are irrelevant to policy."], correctIndex: 2, explanation: "Da a entender que el sentido común no siempre sobrevive al contraste con los datos." },
        { type: "multiple_choice", question: "What is the speaker's attitude overall?", options: ["Certainty that minimum wages have no effect", "Cautious and critical, resisting simple answers", "Angry at all economists", "Indifferent to the question"], correctIndex: 1, explanation: "Invita a desconfiar de respuestas simples: actitud crítica y cautelosa." },
        { type: "listening",
          text: "There's a methodological point worth stressing here. When two neighbouring areas differ only in their wage law, comparing them is almost like running an experiment. That design is powerful precisely because it holds other factors roughly constant, so differences in employment are more plausibly linked to the wage itself.",
          question: "According to this part, why is comparing neighbouring areas a powerful method?", options: ["It is cheaper than surveys.", "It holds other factors roughly constant, like an experiment.", "It uses very old data.", "It relies on employers' opinions."], correctIndex: 1, explanation: "Al mantener constantes otros factores, las diferencias se atribuyen mejor al salario: cuasi-experimento." },
        { type: "true_false", statement: "The speaker concludes that minimum wages can never affect employment.", answer: false, explanation: "\"...I'm not telling you that minimum wages never affect jobs. Push the wage high enough and you will surely see consequences.\"" }
      ]
    },

    "toefl-c2-integrated-writing": {
      lessonId: "toefl-c2-integrated-writing", level: "C2", track: "TOEFL · Writing", topic: "writing", skill: "use",
      title: "Writing TOEFL: Integrated & cohesion", xpReward: 74, mascotState: "explaining",
      explanation: {
        body: "La tarea integrada del TOEFL exige resumir y relacionar fuentes con precisión y cohesión: conectores exactos (contraste, concesión, consecuencia), paráfrasis fiel y verbos de citación. Evita copiar y elige el matiz correcto. (Reformula con fidelidad y enlaza con lógica.)",
        examples: [
          { en: "The lecture casts doubt on the reading's claim.", es: "La conferencia pone en duda la afirmación del texto." },
          { en: "Whereas the author argues X, the speaker counters that Y.", es: "Mientras el autor sostiene X, el ponente replica Y." },
          { en: "to concede a point", es: "conceder/admitir un punto" }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "Which verb best signals that the lecture disagrees with the reading?", options: ["The lecture confirms the reading.", "The lecture challenges the reading.", "The lecture ignores the reading.", "The lecture repeats the reading."], correctIndex: 1, explanation: "'Challenges/casts doubt on' expresa desacuerdo, lo habitual en la tarea integrada." },
        { type: "multiple_choice", question: "Which verb concedes a point before disagreeing? \"The author ___ that costs are high, but argues the benefits outweigh them.\"", options: ["denies", "concedes", "ignores", "forgets"], correctIndex: 1, explanation: "'Concede' = admite un punto antes de matizar o rebatir." },
        { type: "fill_blank", sentence: "___ the author claims the policy succeeded, the speaker provides data showing it failed. (concesión)", answers: ["Whereas", "While", "Although"], hint: "Conector de contraste/concesión.", explanation: "Whereas / While / Although introducen el contraste entre fuentes." },
        { type: "categorize", instruction: "Clasifica cada conector por su función.", buckets: [
          { id: "c", label: "Contrast" }, { id: "s", label: "Consequence" }, { id: "a", label: "Addition / Concession" } ], items: [
          { t: "however", bucket: "c" }, { t: "therefore", bucket: "s" },
          { t: "moreover", bucket: "a" }, { t: "nevertheless", bucket: "c" },
          { t: "consequently", bucket: "s" }, { t: "admittedly", bucket: "a" } ] },
        { type: "multiple_choice", question: "Which is the best paraphrase of \"The findings undermine the hypothesis\"?", options: ["The findings strongly support the hypothesis.", "The findings weaken the hypothesis.", "The findings simply restate the hypothesis.", "The findings ignore the hypothesis."], correctIndex: 1, explanation: "'Undermine' = debilitar/socavar." },
        { type: "multiple_choice", question: "Choose the most cohesive sentence to open a summary body paragraph.", options: ["Another thing is also there too.", "First, the lecture refutes the reading's claim that automation reduces overall employment.", "Stuff about jobs and machines.", "And then more points happen."], correctIndex: 1, explanation: "Es específica, marca orden ('First') y nombra la relación entre fuentes: cohesión académica." },
        { type: "word_order", words: ["Not", "only", "does", "the", "lecture", "rebut", "the", "reading"],
          correctOrder: ["Not", "only", "does", "the", "lecture", "rebut", "the", "reading"],
          hint: "Inversión enfática: Not only + does + sujeto + verbo." },
        { type: "translate", prompt: "Traduce (académico): \"La conferencia contradice el argumento del texto.\"",
          answers: ["the lecture contradicts the argument of the reading", "the lecture contradicts the reading's argument"], explanation: "The lecture contradicts the reading's argument." }
      ]
    },

    "toefl-c2-read-language": {
      lessonId: "toefl-c2-read-language", level: "C2", track: "TOEFL · Reading", topic: "language", skill: "reading",
      title: "Reading TOEFL: Language change", xpReward: 78, mascotState: "explaining",
      explanation: {
        body: "Lectura de máxima dificultad sobre lingüística. El autor refuta una idea popular y la sustituye por una explicación más sutil. Sigue la estructura argumentativa (tesis rival → objeción → tesis propia) y desconfía de los distractores que suenan razonables pero exceden el texto. (Identifica qué afirma exactamente el autor.)",
        examples: [
          { en: "prescriptive vs. descriptive", es: "prescriptivo vs. descriptivo" },
          { en: "to lament the decline of language", es: "lamentar la decadencia del idioma" }
        ]
      },
      exercises: [
        { type: "reading", title: "Is Language Decaying?",
          passage: "In every generation, someone laments that the language is decaying. New words are dismissed as ugly, dropped distinctions are mourned as losses, and the young are blamed for a supposed collapse of standards. To the linguist, however, such complaints rest on a misunderstanding of what language is.\n\nLanguages are not fixed codes handed down unaltered; they are systems in perpetual motion, reshaped by the very people who use them. The English of Shakespeare differs from that of Chaucer, and both differ from the English spoken today, yet none can sensibly be called a corrupted version of the others. Change is not decay; it is the normal condition of a living language. What one era condemns as sloppy, a later era often accepts as standard, and the words once denounced as vulgar frequently become unremarkable.\n\nThis is not to say that all judgments about language are baseless. Clarity, precision and appropriateness to context remain genuine virtues, and a writer who ignores them communicates poorly. The linguist's point is narrower: that the existence of change, by itself, is no evidence of decline. To confuse the two is to mistake the ordinary life of language for a disease.",
          questions: [
            { q: "What is the author's main argument?", options: ["Language is steadily getting worse.", "Language change is normal and is not the same as decay.", "Only Shakespeare wrote correct English.", "All judgments about good writing are worthless."], correctIndex: 1, explanation: "La tesis: el cambio lingüístico es normal y no equivale a decadencia." },
            { q: "Why does the author mention Chaucer and Shakespeare?", options: ["To prove older English was superior", "To show that English has always changed without being 'corrupted'", "To recommend reading classic literature", "To date the origin of English"], correctIndex: 1, explanation: "Ilustra que el inglés siempre ha cambiado sin que una etapa sea corrupción de otra." },
            { q: "In the third paragraph, the author concedes that...", options: ["language never changes", "clarity, precision and appropriateness are still real virtues", "all complaints about language are correct", "writers should ignore context"], correctIndex: 1, explanation: "Concede que la claridad y la precisión siguen siendo virtudes reales: matiza su tesis." },
            { q: "Which best paraphrases \"the existence of change, by itself, is no evidence of decline\"?", options: ["Change always proves a language is dying.", "The mere fact that a language changes does not show it is getting worse.", "Languages should never change.", "Decline causes change."], correctIndex: 1, explanation: "Que algo cambie no demuestra, en sí, que empeore." },
            { q: "The author's attitude toward those who 'lament that the language is decaying' is best described as...", options: ["sympathetic agreement", "respectful but corrective", "openly mocking and dismissive of all their views", "completely neutral"], correctIndex: 1, explanation: "Los corrige (su queja parte de un malentendido) pero concede que ciertos juicios sí son válidos: corrección respetuosa, no burla total." },
            { q: "It can be inferred that the author distinguishes between...", options: ["spoken and written language", "the fact of change and a judgment of decline", "English and other languages", "grammar and vocabulary"], correctIndex: 1, explanation: "Distingue el hecho del cambio de la valoración de decadencia: confundirlos es el error." }
          ] },
        { type: "multiple_choice", question: "In context, 'mourned as losses' (paragraph 1) describes how some people react to dropped distinctions by...", options: ["celebrating them", "treating them as regrettable disappearances", "inventing new ones", "ignoring them"], correctIndex: 1, explanation: "'Mourn' = lamentar; las distinciones perdidas se viven como pérdidas lamentables." },
        { type: "true_false", statement: "The author claims that no judgment about language is ever justified.", answer: false, explanation: "Concede que claridad, precisión y adecuación siguen siendo virtudes: algunos juicios sí valen." },
        { type: "fill_blank", sentence: "For the linguist, change is not decay but the normal condition of a ___ language.", answers: ["living"], hint: "Vivo, en uso.", explanation: "\"...the normal condition of a living language.\"" },
        { type: "matching", instruction: "Une el término con su significado.", pairs: [
          { l: "to lament", r: "to express grief or regret" },
          { l: "to mourn", r: "to feel/show sorrow for a loss" },
          { l: "corrupted", r: "spoiled, degraded" },
          { l: "baseless", r: "without foundation" }
        ] }
      ]
    }

  };

  /* Orden de aparición dentro de cada mundo (se anexa al final de cada
     escalera de destreza; la progresión real la calcula vesper_path.js). */
  var ORDER = [
    /* B2 */ "toefl-b2-read-urbanization", "toefl-b2-read-energy", "toefl-b2-listen-orientation", "toefl-b2-structure",
    /* C1 */ "toefl-c1-read-photosynthesis", "toefl-c1-read-placebo", "toefl-c1-listen-lecture", "toefl-c1-vocab-academic",
    /* C2 */ "toefl-c2-read-neuroscience", "toefl-c2-read-language", "toefl-c2-listen-seminar", "toefl-c2-integrated-writing"
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
