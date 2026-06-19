/* =====================================================================
 * VESPER · TOEFL PACK  (niveles avanzados B2 · C1 · C2)
 * ---------------------------------------------------------------------
 * Lecciones de estilo TOEFL para los mundos superiores del sendero:
 *   - Reading académico: pasaje largo + preguntas de comprensión
 *     (idea principal, detalle, vocabulario en contexto, inferencia).
 *   - Listening académico: lecture/seminario + preguntas.
 *   - Structure / Use of English: identificación de errores, conectores,
 *     registro formal y resumen (integrated writing).
 *
 * Reutiliza los tipos de ejercicio que ya renderiza leccion.html:
 *   reading · listening · multiple_choice · fill_blank · true_false
 *   matching · categorize · translate · word_order
 *
 * Se fusiona en VESPER_LESSONS via VESPER_TOEFL_PACK.merge() (igual que
 * vesper_content_pack.js / vesper_expansion.js). Pobla además el mundo C2,
 * que hasta ahora no tenía lecciones. La progresión por nivel ya la
 * gestiona vesper_path.js (escaleras por destreza + jefe de mundo).
 * ===================================================================== */
window.VESPER_TOEFL_PACK = (function () {

  var L = {

    /* ===================== B2 · TOEFL FOUNDATIONS ===================== */

    "toefl-b2-read-urbanization": {
      lessonId: "toefl-b2-read-urbanization", level: "B2", track: "TOEFL · Reading", topic: "society", skill: "reading",
      title: "Reading TOEFL: Urbanization", xpReward: 60, mascotState: "explaining",
      explanation: {
        body: "Práctica de lectura académica al estilo TOEFL. Lee el pasaje una vez para captar la idea general y vuelve a él para responder cada pregunta. Verás cuatro tipos clásicos: idea principal, detalle, vocabulario en contexto e inferencia. (Lee con calma y localiza la evidencia en el texto.)",
        examples: [
          { en: "main idea", es: "idea principal" },
          { en: "vocabulary in context", es: "vocabulario en contexto" },
          { en: "to infer", es: "inferir" }
        ]
      },
      exercises: [
        { type: "reading", title: "The Growth of Cities",
          passage: "Over the past two centuries, the proportion of people living in cities has risen dramatically. In 1800, fewer than three percent of the world's population lived in urban areas; today, more than half do, and the figure continues to climb. This shift, known as urbanization, has reshaped economies, landscapes and daily life.\n\nThe principal driver of urbanization has been industrialization. As factories concentrated in towns, they drew workers away from rural agriculture in search of steady wages. Cities offered not only employment but also schools, hospitals and cultural institutions that were rarely available in the countryside.\n\nYet rapid growth has not been without costs. When populations expand faster than housing and infrastructure can accommodate them, the result is often overcrowding, pollution and strained public services. Many modern governments therefore attempt to manage urban growth through careful planning rather than leaving it to chance.",
          questions: [
            { q: "What is the passage mainly about?", options: ["The history and effects of people moving to cities", "How factories produce goods", "Why agriculture is declining worldwide"], correctIndex: 0, explanation: "El texto define la urbanización y describe sus causas y consecuencias: la idea principal." },
            { q: "According to the passage, what was the main cause of urbanization?", options: ["Better weather in cities", "Industrialization", "A fall in the rural birth rate"], correctIndex: 1, explanation: "\"The principal driver of urbanization has been industrialization.\"" },
            { q: "The word \"strained\" in the last paragraph is closest in meaning to...", options: ["relaxed", "overburdened", "abandoned"], correctIndex: 1, explanation: "\"Strained public services\" = servicios sobrecargados/al límite." },
            { q: "It can be inferred from the passage that urbanization...", options: ["has stopped in recent years", "brings both benefits and problems", "only affects poor countries"], correctIndex: 1, explanation: "El texto contrasta empleo/servicios (beneficios) con hacinamiento/contaminación (problemas): se infiere que tiene ambas caras." }
          ] },
        { type: "multiple_choice", question: "In the passage, \"drew workers away from rural agriculture\" means the factories...", options: ["painted pictures of workers", "attracted workers away from farming", "paid farmers to stay"], correctIndex: 1, explanation: "\"Draw away\" aquí = atraer/llevarse a la gente lejos de algo." },
        { type: "true_false", statement: "According to the passage, most modern governments leave urban growth entirely to chance.", answer: false, explanation: "\"...attempt to manage urban growth through careful planning rather than leaving it to chance.\"" },
        { type: "fill_blank", sentence: "More than half of the world's population now lives in ___ areas.", answers: ["urban"], hint: "Lo contrario de rural.", explanation: "\"...today, more than half do\" (live in urban areas)." }
      ]
    },

    "toefl-b2-listen-orientation": {
      lessonId: "toefl-b2-listen-orientation", level: "B2", track: "TOEFL · Listening", topic: "study", skill: "listening",
      title: "Listening TOEFL: Campus orientation", xpReward: 60, mascotState: "explaining",
      explanation: {
        body: "En el TOEFL escuchas una charla académica y respondes varias preguntas. Escucha el audio (puedes repetirlo y ponerlo más lento) y luego responde sobre la idea principal y los detalles. (Toma notas mentales mientras escuchas.)",
        examples: [
          { en: "Let me give you a quick overview.", es: "Permítanme darles un resumen rápido." },
          { en: "I'd recommend you arrive early.", es: "Les recomendaría llegar temprano." }
        ]
      },
      exercises: [
        { type: "listening",
          text: "Welcome, everyone. Before classes begin next week, I want to walk you through a few practical things about campus life. First, your student card is essential: you'll need it to borrow books from the library, to enter the computer labs, and even to get a discount in the cafeteria. If you lose it, report it immediately at the front desk. Second, most of your reading materials will be posted online, so make sure you can log in to the student portal before Monday.",
          question: "What is the speaker mainly doing?", options: ["Explaining a scientific theory", "Giving new students practical information about campus life", "Complaining about the library rules"], correctIndex: 1, explanation: "La intención principal es orientar a estudiantes nuevos sobre la vida en el campus." },
        { type: "multiple_choice", question: "According to the talk, what is the student card NOT used for?", options: ["Borrowing library books", "Entering the computer labs", "Paying tuition fees"], correctIndex: 2, explanation: "Menciona biblioteca, laboratorios y descuento en la cafetería, pero no el pago de matrícula." },
        { type: "listening",
          text: "One more thing about the portal: if you can't log in, don't wait until the last minute. The help desk gets very busy during the first week, so I'd strongly recommend sorting out any password problems today or tomorrow.",
          question: "What does the speaker advise students to do?", options: ["Wait until the first week of classes", "Fix any login problems early", "Avoid using the student portal"], correctIndex: 1, explanation: "\"I'd strongly recommend sorting out any password problems today or tomorrow.\"" },
        { type: "true_false", statement: "The speaker says most reading materials will be posted online.", answer: true, explanation: "\"...most of your reading materials will be posted online...\"" }
      ]
    },

    "toefl-b2-structure": {
      lessonId: "toefl-b2-structure", level: "B2", track: "TOEFL · Structure", topic: "writing", skill: "use",
      title: "Structure TOEFL: Sentence accuracy", xpReward: 58, mascotState: "explaining",
      explanation: {
        body: "La sección de estructura del TOEFL evalúa gramática precisa: concordancia, paralelismo, conectores y formas verbales. Elige siempre la opción gramaticalmente completa y formal. (Busca el error o completa la oración académica.)",
        examples: [
          { en: "Not only did sales rise, but profits also grew.", es: "No solo subieron las ventas, sino que también crecieron las ganancias." },
          { en: "The data suggest that the trend will continue.", es: "Los datos sugieren que la tendencia continuará." }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "Choose the grammatically correct sentence.", options: ["The number of applicants have increased.", "The number of applicants has increased.", "The number of applicants are increasing."], correctIndex: 1, explanation: "\"The number of...\" es singular: requiere \"has\"." },
        { type: "multiple_choice", question: "Complete formally: \"___ the experiment failed, the researchers learned a great deal.\"", options: ["Despite", "Although", "However"], correctIndex: 1, explanation: "Para introducir una cláusula (sujeto + verbo) se usa \"Although\", no \"Despite\" (preposición) ni \"However\" (adverbio)." },
        { type: "fill_blank", sentence: "The report recommends ___ energy consumption during peak hours. (reducir)", answers: ["reducing"], hint: "recommend + gerundio.", explanation: "\"recommend\" va seguido de gerundio: recommend reducing." },
        { type: "word_order", words: ["Rarely", "have", "scientists", "observed", "such", "a", "rapid", "change"],
          correctOrder: ["Rarely", "have", "scientists", "observed", "such", "a", "rapid", "change"],
          hint: "Inversión tras un adverbio negativo: Rarely + have + sujeto + participio." },
        { type: "multiple_choice", question: "Which sentence is parallel (correct)?", options: ["The course teaches reading, writing, and to speak.", "The course teaches reading, writing, and speaking.", "The course teaches to read, writing, and speaking."], correctIndex: 1, explanation: "El paralelismo exige la misma forma: reading, writing, speaking." },
        { type: "true_false", statement: "\"The data suggests\" and \"the data suggest\" are both accepted in formal academic English.", answer: true, explanation: "Ambas se aceptan; en registro académico estricto \"data\" suele tratarse como plural (suggest)." }
      ]
    },

    /* ======================= C1 · TOEFL ACADEMIC ======================= */

    "toefl-c1-read-photosynthesis": {
      lessonId: "toefl-c1-read-photosynthesis", level: "C1", track: "TOEFL · Reading", topic: "science", skill: "reading",
      title: "Reading TOEFL: Photosynthesis", xpReward: 64, mascotState: "explaining",
      explanation: {
        body: "Lectura científica de nivel C1. Los pasajes del TOEFL incluyen vocabulario técnico y oraciones complejas. Identifica la función de cada párrafo y distingue hechos de propósitos retóricos. (Localiza la evidencia exacta antes de responder.)",
        examples: [
          { en: "convert sunlight into chemical energy", es: "convertir la luz solar en energía química" },
          { en: "by-product", es: "subproducto" }
        ]
      },
      exercises: [
        { type: "reading", title: "How Plants Make Food",
          passage: "Photosynthesis is the process by which green plants, algae and some bacteria convert light energy into chemical energy stored in sugars. The process takes place mainly in the leaves, within tiny structures called chloroplasts that contain the green pigment chlorophyll.\n\nDuring photosynthesis, a plant absorbs carbon dioxide from the air through small pores called stomata and draws up water through its roots. Using energy captured from sunlight, the plant combines these raw materials to produce glucose, a simple sugar that fuels growth. Oxygen is released as a by-product.\n\nThe significance of this reaction extends far beyond the individual plant. Because photosynthesis removes carbon dioxide and releases oxygen, it helps regulate the composition of the atmosphere. Indeed, nearly all of the oxygen that animals breathe ultimately originates from photosynthetic organisms.",
          questions: [
            { q: "What is the main purpose of the passage?", options: ["To explain how and why photosynthesis occurs", "To compare plants with animals", "To describe the structure of a leaf in detail"], correctIndex: 0, explanation: "El pasaje explica el proceso y su importancia: ese es su propósito principal." },
            { q: "According to the passage, where does photosynthesis mainly occur?", options: ["In the roots", "In the chloroplasts of the leaves", "In the stomata of the stem"], correctIndex: 1, explanation: "\"...within tiny structures called chloroplasts...\" en las hojas." },
            { q: "The word \"by-product\" is closest in meaning to...", options: ["the main goal", "something produced in addition to the main product", "a harmful waste that is removed"], correctIndex: 1, explanation: "Un subproducto se genera además del producto principal (aquí, la glucosa)." },
            { q: "Why does the author mention that animals breathe oxygen from photosynthetic organisms?", options: ["To show that photosynthesis has importance beyond the single plant", "To prove that animals are more important than plants", "To explain how roots absorb water"], correctIndex: 0, explanation: "Sirve de ejemplo del impacto global del proceso (función retórica del último párrafo)." }
          ] },
        { type: "matching", instruction: "Une cada término con su definición.", pairs: [
          { l: "chlorophyll", r: "green pigment that captures light" },
          { l: "stomata", r: "pores that let gases in and out" },
          { l: "glucose", r: "simple sugar that fuels growth" },
          { l: "chloroplast", r: "structure where photosynthesis occurs" }
        ] },
        { type: "fill_blank", sentence: "Plants absorb carbon dioxide and release ___ during photosynthesis.", answers: ["oxygen"], hint: "El gas que respiramos.", explanation: "\"Oxygen is released as a by-product.\"" },
        { type: "true_false", statement: "According to the passage, only plants are capable of photosynthesis.", answer: false, explanation: "\"...green plants, algae and some bacteria...\" también lo hacen." }
      ]
    },

    "toefl-c1-listen-lecture": {
      lessonId: "toefl-c1-listen-lecture", level: "C1", track: "TOEFL · Listening", topic: "study", skill: "listening",
      title: "Listening TOEFL: History lecture", xpReward: 64, mascotState: "explaining",
      explanation: {
        body: "Una lecture académica del TOEFL puede durar varios minutos y mezclar datos con la opinión del profesor. Escucha la idea central, sigue la organización (causa-efecto, ejemplos) y capta el tono. (Distingue el dato del comentario del profesor.)",
        examples: [
          { en: "Let's turn our attention to...", es: "Centrémonos en..." },
          { en: "This brings me to my main point.", es: "Esto me lleva a mi idea principal." }
        ]
      },
      exercises: [
        { type: "listening",
          text: "Today I'd like to talk about the printing press and why historians consider it one of the most transformative inventions ever made. Before the mid-fifteenth century, books in Europe were copied by hand, which made them extraordinarily expensive and rare. When Johannes Gutenberg introduced movable metal type around 1450, the cost of producing a book fell sharply. Suddenly, ideas could spread across the continent in weeks rather than decades.",
          question: "What is the lecture mainly about?", options: ["The biography of Johannes Gutenberg", "Why the printing press was so transformative", "How to repair an old printing machine"], correctIndex: 1, explanation: "El profesor enmarca todo en torno al impacto transformador de la imprenta." },
        { type: "multiple_choice", question: "According to the lecture, how were books made in Europe before the mid-fifteenth century?", options: ["Printed with metal type", "Copied by hand", "Imported from Asia"], correctIndex: 1, explanation: "\"...books in Europe were copied by hand...\"" },
        { type: "listening",
          text: "Now, it's tempting to think the printing press alone caused these changes, but I'd urge you to be cautious. The press was important, certainly, but it spread quickly only because literacy was already rising and paper had become cheaper. Technology rarely works in isolation.",
          question: "What is the professor's main point in this part?", options: ["The printing press was unimportant.", "The press succeeded partly because of other existing conditions.", "Paper was more important than the press."], correctIndex: 1, explanation: "Advierte que la tecnología no actúa aislada: la alfabetización y el papel barato ya estaban en marcha." },
        { type: "true_false", statement: "The professor suggests that the printing press alone was responsible for spreading ideas.", answer: false, explanation: "\"...it's tempting to think the printing press alone caused these changes, but I'd urge you to be cautious.\"" }
      ]
    },

    "toefl-c1-vocab-academic": {
      lessonId: "toefl-c1-vocab-academic", level: "C1", track: "TOEFL · Vocabulary", topic: "study", skill: "vocab",
      title: "Vocabulary TOEFL: Academic Word List", xpReward: 60, mascotState: "explaining",
      explanation: {
        body: "El TOEFL premia el vocabulario académico de la Academic Word List (AWL): verbos como analyze, indicate, derive y nombres como hypothesis o criteria. Practica reconocerlos y usarlos en contexto formal. (Asocia, clasifica y completa.)",
        examples: [
          { en: "The results indicate a clear trend.", es: "Los resultados indican una tendencia clara." },
          { en: "We derived our conclusions from the data.", es: "Derivamos nuestras conclusiones de los datos." }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Une el verbo académico con su sinónimo.", pairs: [
          { l: "indicate", r: "show / point to" },
          { l: "derive", r: "obtain from a source" },
          { l: "analyze", r: "examine in detail" },
          { l: "demonstrate", r: "prove clearly" }
        ] },
        { type: "categorize", instruction: "¿La palabra es un nombre (noun) o un verbo (verb)?", buckets: [
          { id: "n", label: "Noun" }, { id: "v", label: "Verb" } ], items: [
          { t: "hypothesis", bucket: "n" }, { t: "evaluate", bucket: "v" },
          { t: "criteria", bucket: "n" }, { t: "interpret", bucket: "v" },
          { t: "analysis", bucket: "n" }, { t: "establish", bucket: "v" } ] },
        { type: "fill_blank", sentence: "The findings strongly ___ that the treatment is effective. (sugerir/indicar)", answers: ["indicate", "suggest"], hint: "Verbo académico para 'mostrar/apuntar'.", explanation: "\"The findings indicate/suggest that...\"" },
        { type: "multiple_choice", question: "Choose the most academic option: \"The two studies reached ___ conclusions.\"", options: ["the same kinda", "consistent", "okay"], correctIndex: 1, explanation: "\"Consistent conclusions\" es el registro académico adecuado." },
        { type: "translate", prompt: "Traduce al inglés (académico): \"Los datos respaldan la hipótesis.\"",
          answers: ["the data support the hypothesis", "the data supports the hypothesis"], explanation: "The data support the hypothesis." }
      ]
    },

    /* ======================== C2 · TOEFL MASTERY ======================== */
    /* (Pobla el mundo C2, que hasta ahora aparecía como "Próximamente".)   */

    "toefl-c2-read-neuroscience": {
      lessonId: "toefl-c2-read-neuroscience", level: "C2", track: "TOEFL · Reading", topic: "science", skill: "reading",
      title: "Reading TOEFL: Neuroplasticity", xpReward: 70, mascotState: "explaining",
      explanation: {
        body: "Nivel de dominio. Los pasajes más exigentes del TOEFL combinan densidad conceptual con matices (concesión, contraste, hipótesis). Lee identificando la postura del autor y las funciones retóricas de cada oración. (Distingue afirmación, evidencia y matiz.)",
        examples: [
          { en: "contrary to long-held belief", es: "en contra de una creencia arraigada" },
          { en: "to a remarkable extent", es: "en una medida notable" }
        ]
      },
      exercises: [
        { type: "reading", title: "The Adaptable Brain",
          passage: "For much of the twentieth century, neuroscientists assumed that the adult brain was essentially fixed: once development was complete, its structure could not meaningfully change. This assumption has since been overturned. Contrary to long-held belief, the mature brain retains, to a remarkable extent, the capacity to reorganize itself, a property now termed neuroplasticity.\n\nEvidence for neuroplasticity comes from diverse sources. Patients who have lost a limb, for instance, sometimes report sensations that seem to arise from the missing part; brain imaging reveals that the regions once devoted to the limb have been recruited for other functions. Likewise, studies of musicians show that intensive practice can enlarge the cortical areas associated with finger control.\n\nNevertheless, plasticity should not be romanticized. The same mechanisms that allow the brain to recover from injury can also entrench maladaptive patterns, as in chronic pain or addiction. Plasticity, in short, is neither inherently beneficial nor harmful; it is simply the brain's capacity for change, for better or worse.",
          questions: [
            { q: "What is the author's central claim?", options: ["The adult brain cannot change after development.", "The mature brain can reorganize itself, though this is not always beneficial.", "Neuroplasticity only occurs in musicians."], correctIndex: 1, explanation: "El autor afirma la plasticidad del cerebro adulto y matiza que no siempre es positiva." },
            { q: "Why does the author mention musicians?", options: ["To prove that music improves memory", "As evidence that experience can physically reshape the brain", "To criticize intensive practice"], correctIndex: 1, explanation: "El ejemplo de los músicos es evidencia de reorganización cortical (función retórica)." },
            { q: "The phrase \"should not be romanticized\" suggests the author wants readers to...", options: ["admire plasticity without question", "view plasticity in an unrealistically positive way", "avoid an overly idealized view of plasticity"], correctIndex: 2, explanation: "\"No debe idealizarse/romantizarse\": evitar una visión demasiado positiva." },
            { q: "Which statement best reflects the author's overall stance?", options: ["Neuroplasticity is entirely positive.", "Neuroplasticity is morally neutral and can have good or bad effects.", "Neuroplasticity has never been proven."], correctIndex: 1, explanation: "\"...neither inherently beneficial nor harmful...\" => neutral, con efectos en ambos sentidos." }
          ] },
        { type: "multiple_choice", question: "In context, \"entrench maladaptive patterns\" means to...", options: ["remove harmful habits", "firmly establish harmful patterns", "study unusual behaviour"], correctIndex: 1, explanation: "\"Entrench\" = afianzar/arraigar; \"maladaptive\" = perjudicial/desadaptativo." },
        { type: "true_false", statement: "According to the passage, twentieth-century neuroscientists initially believed the adult brain could not meaningfully change.", answer: true, explanation: "\"...neuroscientists assumed that the adult brain was essentially fixed...\"" },
        { type: "fill_blank", sentence: "The capacity of the brain to reorganize itself is called ___.", answers: ["neuroplasticity"], hint: "El término definido en el pasaje.", explanation: "\"...a property now termed neuroplasticity.\"" }
      ]
    },

    "toefl-c2-listen-seminar": {
      lessonId: "toefl-c2-listen-seminar", level: "C2", track: "TOEFL · Listening", topic: "study", skill: "listening",
      title: "Listening TOEFL: Economics seminar", xpReward: 70, mascotState: "explaining",
      explanation: {
        body: "En un seminario de nivel avanzado, el ponente plantea una pregunta, presenta evidencia y a menudo cuestiona la interpretación obvia. Escucha la tesis, los contraejemplos y la actitud crítica del ponente. (Capta el argumento, no solo los datos.)",
        examples: [
          { en: "At first glance, the answer seems obvious.", es: "A primera vista, la respuesta parece obvia." },
          { en: "But the picture is more complicated than that.", es: "Pero el panorama es más complejo que eso." }
        ]
      },
      exercises: [
        { type: "listening",
          text: "Let's consider a familiar question in economics: does raising the minimum wage reduce employment? At first glance, the answer seems obvious. If labour becomes more expensive, employers should hire fewer workers. For decades, this was treated almost as a law of nature. But the picture is more complicated than that. A number of careful studies, comparing neighbouring regions with different wage laws, found little or no fall in employment after modest increases.",
          question: "What is the speaker mainly trying to show?", options: ["That raising the minimum wage always destroys jobs", "That the obvious prediction about minimum wage is challenged by evidence", "That economics cannot be studied scientifically"], correctIndex: 1, explanation: "El ponente contrasta la predicción 'obvia' con estudios que la cuestionan." },
        { type: "multiple_choice", question: "What kind of evidence does the speaker cite?", options: ["Personal opinions of employers", "Studies comparing neighbouring regions with different wage laws", "Ancient historical records"], correctIndex: 1, explanation: "\"...comparing neighbouring regions with different wage laws...\"" },
        { type: "listening",
          text: "Now, I'm not telling you that minimum wages never affect jobs. Push the wage high enough and you will surely see consequences. The lesson is subtler: economic predictions that sound like common sense don't always survive contact with the data. So be wary of anyone who claims the answer is simple.",
          question: "What attitude does the speaker express?", options: ["Certainty that minimum wages have no effect", "Caution about accepting 'common-sense' economic claims", "Anger at economists"], correctIndex: 1, explanation: "Invita a desconfiar de las respuestas 'de sentido común': actitud crítica/cautelosa." },
        { type: "true_false", statement: "The speaker concludes that minimum wages can never affect employment.", answer: false, explanation: "\"...I'm not telling you that minimum wages never affect jobs. Push the wage high enough and you will surely see consequences.\"" }
      ]
    },

    "toefl-c2-integrated-writing": {
      lessonId: "toefl-c2-integrated-writing", level: "C2", track: "TOEFL · Writing", topic: "writing", skill: "use",
      title: "Writing TOEFL: Integrated & cohesion", xpReward: 68, mascotState: "explaining",
      explanation: {
        body: "La tarea integrada del TOEFL pide resumir y relacionar ideas con precisión y cohesión. Domina los conectores de contraste, concesión y consecuencia, y reformula sin copiar. (Elige el conector exacto y parafrasea con fidelidad.)",
        examples: [
          { en: "The lecture casts doubt on the reading's claim.", es: "La conferencia pone en duda la afirmación del texto." },
          { en: "Whereas the author argues X, the speaker counters that Y.", es: "Mientras el autor sostiene X, el ponente replica que Y." }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "In an integrated essay, which verb best signals that the lecture disagrees with the reading?", options: ["The lecture confirms the reading.", "The lecture challenges the reading.", "The lecture ignores the reading."], correctIndex: 1, explanation: "\"Challenges/casts doubt on\" expresa desacuerdo, lo habitual en la tarea integrada." },
        { type: "fill_blank", sentence: "___ the author claims the policy succeeded, the speaker provides data showing it failed. (concesión)", answers: ["Whereas", "While", "Although"], hint: "Conector de contraste/concesión.", explanation: "Whereas / While / Although introducen el contraste entre fuentes." },
        { type: "categorize", instruction: "Clasifica cada conector por su función.", buckets: [
          { id: "c", label: "Contrast" }, { id: "s", label: "Consequence" }, { id: "a", label: "Addition" } ], items: [
          { t: "however", bucket: "c" }, { t: "therefore", bucket: "s" },
          { t: "moreover", bucket: "a" }, { t: "nevertheless", bucket: "c" },
          { t: "consequently", bucket: "s" }, { t: "furthermore", bucket: "a" } ] },
        { type: "multiple_choice", question: "Which is the best paraphrase of \"The findings undermine the hypothesis\"?", options: ["The findings strongly support the hypothesis.", "The findings weaken the hypothesis.", "The findings repeat the hypothesis."], correctIndex: 1, explanation: "\"Undermine\" = debilitar/socavar." },
        { type: "word_order", words: ["Not", "only", "does", "the", "lecture", "rebut", "the", "reading"],
          correctOrder: ["Not", "only", "does", "the", "lecture", "rebut", "the", "reading"],
          hint: "Inversión enfática: Not only + does + sujeto + verbo." },
        { type: "translate", prompt: "Traduce (académico): \"La conferencia contradice el argumento del texto.\"",
          answers: ["the lecture contradicts the argument of the reading", "the lecture contradicts the reading's argument"], explanation: "The lecture contradicts the reading's argument." }
      ]
    }

  };

  /* Orden de aparición dentro de cada mundo (se anexa al final de cada
     escalera de destreza; la progresión real la calcula vesper_path.js). */
  var ORDER = [
    /* B2 */ "toefl-b2-read-urbanization", "toefl-b2-listen-orientation", "toefl-b2-structure",
    /* C1 */ "toefl-c1-read-photosynthesis", "toefl-c1-listen-lecture", "toefl-c1-vocab-academic",
    /* C2 */ "toefl-c2-read-neuroscience", "toefl-c2-listen-seminar", "toefl-c2-integrated-writing"
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
