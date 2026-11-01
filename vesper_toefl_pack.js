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
        body: "A TOEFL-style academic reading. Read the passage once to get the general idea, then go back to it to answer. You'll practise several question types: main idea, detail, negative fact (EXCEPT), vocabulary in context, reference, inference and rhetorical purpose. Always find the exact evidence before you choose.",
        examples: [
          { en: "main idea / detail / inference" },
          { en: "Which of the following is NOT mentioned?" },
          { en: "the word X refers to..." }
        ]
      },
      exercises: [
        { type: "reading", title: "The Growth of Cities",
          passage: "Over the past two centuries, the proportion of people living in cities has risen dramatically. In 1800, fewer than three percent of the world's population lived in urban areas; today, more than half do, and the figure continues to climb. This shift, known as urbanization, has reshaped economies, landscapes and daily life.\n\nThe principal driver of urbanization has been industrialization. As factories concentrated in towns, they drew workers away from rural agriculture in search of steady wages. Cities offered not only employment but also schools, hospitals and cultural institutions that were rarely available in the countryside. For many migrants, the move represented a genuine improvement in living standards, even when conditions were harsh.\n\nYet rapid growth has not been without costs. When populations expand faster than housing and infrastructure can accommodate them, the result is often overcrowding, pollution and strained public services. Slums emerge on the margins of prosperous districts, and the gap between rich and poor becomes painfully visible. Many modern governments therefore attempt to manage urban growth through careful planning rather than leaving it to chance.\n\nCritics of unregulated expansion argue that planning alone is insufficient. They point out that the most liveable cities tend to invest heavily in public transport and green space, treating these not as luxuries but as necessities. Whether developing nations can afford such investments while their cities are still growing remains one of the central dilemmas of the century.",
          questions: [
            { q: "What is the passage mainly about?", options: ["The causes, benefits and challenges of people moving to cities", "How factories manufacture goods efficiently", "Why agriculture has disappeared from the modern economy", "The history of public transport in Europe"], correctIndex: 0, explanation: "The text defines urbanization and covers its causes, benefits and problems: that is the main idea." },
            { q: "According to the passage, all of the following were advantages of cities EXCEPT:", options: ["steady wages", "schools and hospitals", "cultural institutions", "lower pollution levels"], correctIndex: 3, explanation: "The text links cities with MORE pollution, not less. The other three are mentioned as advantages." },
            { q: "The word \"strained\" (paragraph 3) is closest in meaning to...", options: ["relaxed", "overburdened", "abandoned", "expanded"], correctIndex: 1, explanation: "\"Strained public services\" = overloaded services, at their limit." },
            { q: "In paragraph 4, the word \"these\" refers to...", options: ["central dilemmas", "the most liveable cities", "public transport and green space", "developing nations"], correctIndex: 2, explanation: "\"...treating these not as luxuries...\": 'these' refers back to 'public transport and green space'." },
            { q: "Why does the author mention slums in paragraph 3?", options: ["To prove that planning is always successful", "To illustrate a visible cost of unmanaged urban growth", "To argue that the poor prefer to live in cities", "To describe a typical tourist district"], correctIndex: 1, explanation: "Slums illustrate a visible cost of uncontrolled growth (rhetorical function)." },
            { q: "Which sentence best expresses the essential information of the highlighted idea: \"Whether developing nations can afford such investments while their cities are still growing remains one of the central dilemmas of the century\"?", options: ["Investment in transport is unnecessary for growing cities.", "Only wealthy nations face dilemmas this century.", "Developing nations have already solved the problem of urban investment.", "It is unclear whether poorer countries can pay for good infrastructure during rapid growth."], correctIndex: 3, explanation: "The faithful paraphrase keeps the uncertainty about whether developing countries can afford those investments while they grow." }
          ] },
        { type: "multiple_choice", question: "It can be inferred from the passage that the author believes urbanization is...", options: ["entirely beneficial", "entirely harmful", "a mixed process that must be managed", "a temporary trend that will soon reverse itself"], correctIndex: 2, explanation: "The text contrasts benefits and costs and argues for planning: a nuanced view." },
        { type: "multiple_choice", question: "In context, \"drew workers away from rural agriculture\" means the factories...", options: ["attracted workers away from farming", "paid farmers to stay on the land", "forced workers to return home", "painted pictures of workers"], correctIndex: 0, explanation: "\"Draw away\" here = attract people away from something." },
        { type: "true_false", statement: "According to the passage, the most liveable cities treat public transport as a luxury rather than a necessity.", answer: false, explanation: "It's the opposite: they treat them as necessities, not luxuries." },
        { type: "matching", instruction: "Match each term from the text with its meaning.", pairs: [
          { l: "to climb (figures)", r: "to keep rising" },
          { l: "overcrowding", r: "too many people in one place" },
          { l: "liveable", r: "pleasant to live in" },
          { l: "dilemma", r: "a difficult choice" }
        ] },
        { type: "fill_blank", sentence: "Governments try to ___ urban growth through planning rather than leaving it to chance.", answers: ["manage"], hint: "Control / manage.", explanation: "\"...attempt to manage urban growth through careful planning...\"" }
      ]
    },

    "toefl-b2-listen-orientation": {
      lessonId: "toefl-b2-listen-orientation", level: "B2", track: "TOEFL · Listening", topic: "study", skill: "listening",
      title: "Listening TOEFL: Campus orientation", xpReward: 64, mascotState: "explaining",
      explanation: {
        body: "In the TOEFL you listen to an academic talk and answer several questions in a row. Listen (you can replay it and slow it down) and catch the main idea, the details and the speaker's attitude or purpose. Anticipate: detail and inference questions will follow.",
        examples: [
          { en: "Let me give you a quick overview." },
          { en: "I'd strongly recommend you..." },
          { en: "What does the speaker imply?" }
        ]
      },
      exercises: [
        { type: "listening",
          text: "Welcome, everyone. Before classes begin next week, I want to walk you through a few practical things about campus life. First, your student card is essential: you'll need it to borrow books from the library, to enter the computer labs, and even to get a discount in the cafeteria. If you lose it, report it immediately at the front desk. Second, most of your reading materials will be posted online, so make sure you can log in to the student portal before Monday.", "audio": "assets/audio/app/b2_353c711787.mp3",
          question: "What is the speaker mainly doing?", options: ["Giving new students practical information about campus life", "Describing the history of the university", "Complaining about the library rules", "Explaining a scientific theory"], correctIndex: 0, explanation: "The main purpose is to guide new students about life on campus." },
        { type: "multiple_choice", question: "According to the talk, what is the student card NOT used for?", options: ["Entering the computer labs", "Paying tuition fees", "Getting a cafeteria discount", "Borrowing library books"], correctIndex: 1, explanation: "The speaker mentions the library, labs and a discount, but NOT paying tuition." },
        { type: "listening",
          text: "One more thing about the portal: if you can't log in, don't wait until the last minute. The help desk gets very busy during the first week, so I'd strongly recommend sorting out any password problems today or tomorrow. Trust me, you don't want to be standing in a long queue when you should be in your first class.", "audio": "assets/audio/app/b2_8b98f40cef.mp3",
          question: "What does the speaker imply about the help desk?", options: ["It cannot reset passwords.", "It is closed during the first week of the semester.", "It will be crowded once classes start.", "It is located in the cafeteria."], correctIndex: 2, explanation: "The speaker implies it will be very busy in the first week ('gets very busy', 'long queue'): that's why they advise going early." },
        { type: "true_false", statement: "The speaker suggests students should solve login problems before the first week of classes.", answer: true, explanation: "\"...I'd strongly recommend sorting out any password problems today or tomorrow.\"" },
        { type: "listening",
          text: "Finally, a quick word about deadlines. Each professor sets their own, and extensions are granted only in genuine emergencies, with documentation. Planning ahead is far more reliable than hoping for sympathy the night before a paper is due.", "audio": "assets/audio/app/b2_ca17e15370.mp3",
          question: "What is the speaker's attitude toward last-minute extension requests?", options: ["Encouraging and very sympathetic", "Confused", "Indifferent", "Skeptical and discouraging"], correctIndex: 3, explanation: "The tone is sceptical: extensions only for real emergencies and with documents; planning is 'far more reliable'." },
        { type: "multiple_choice", question: "According to the talk, extensions are granted...", options: ["whenever a student asks", "only in genuine emergencies with documentation", "never, under any circumstances", "automatically for online courses"], correctIndex: 1, explanation: "\"...extensions are granted only in genuine emergencies, with documentation.\"" }
      ]
    },

    "toefl-b2-structure": {
      lessonId: "toefl-b2-structure", level: "B2", track: "TOEFL · Structure", topic: "writing", skill: "use",
      title: "Structure TOEFL: Sentence accuracy", xpReward: 62, mascotState: "explaining",
      explanation: {
        body: "The TOEFL structure section demands accurate grammar: agreement, parallelism, linkers, inversion, modifiers and verb forms. Always choose the grammatically complete option in a formal register. Spot the mistake or complete the academic sentence.",
        examples: [
          { en: "Not only did sales rise, but profits also grew." },
          { en: "The data suggest that the trend will continue." },
          { en: "Having finished the report, she submitted it." }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "Choose the grammatically correct sentence.", options: ["The number of applicants are increasing.", "The number of applicants were increased.", "The number of applicants has increased.", "The number of applicants have increased."], correctIndex: 2, explanation: "\"The number of...\" is singular: it needs 'has'." },
        { type: "multiple_choice", question: "Complete formally: \"___ the experiment failed, the researchers learned a great deal.\"", options: ["In spite", "However", "Despite", "Although"], correctIndex: 3, explanation: "For a clause (subject + verb) we use 'Although', not 'Despite'/'In spite' (prepositions) or 'However' (an adverb)." },
        { type: "multiple_choice", question: "Which sentence avoids a dangling modifier?", options: ["Walking into the lab, the students noticed the outdated equipment.", "Walking into the lab, it was outdated.", "Walking into the lab, the outdatedness was clear.", "Walking into the lab, the equipment looked outdated."], correctIndex: 0, explanation: "The opening -ing phrase must refer to the subject: the people walking are 'the students', not 'the equipment'." },
        { type: "fill_blank", sentence: "The report recommends ___ energy consumption during peak hours. (reduce)", answers: ["reducing"], hint: "recommend + -ing.", explanation: "'recommend' is followed by the -ing form: recommend reducing." },
        { type: "fill_blank", sentence: "The committee insisted that the proposal ___ submitted by Friday. (formal / subjunctive)", answers: ["be"], hint: "insist that + subject + base form.", explanation: "After 'insist that', the formal subjunctive uses the base form: '...that the proposal be submitted.'" },
        { type: "word_order", words: ["Rarely", "have", "scientists", "observed", "such", "a", "rapid", "change"],
          correctOrder: ["Rarely", "have", "scientists", "observed", "such", "a", "rapid", "change"],
          hint: "Inversion after a negative adverb: Rarely + have + subject + past participle." },
        { type: "multiple_choice", question: "Which sentence is parallel (correct)?", options: ["The course teaches reading, writing, and to speak.", "The course teaches reading, writing, and speaking.", "The course teaches to read, writing, and speaking.", "The course teaches reading, to write, and speaking."], correctIndex: 1, explanation: "Parallelism needs the same form: reading, writing, speaking." },
        { type: "multiple_choice", question: "Choose the correct conditional (formal): \"If the sample ___ contaminated, the results would be invalid.\"", options: ["were", "is", "was being", "will be"], correctIndex: 0, explanation: "Formal second conditional: 'If the sample were contaminated, ...would be invalid.'" },
        { type: "true_false", statement: "In strict academic English, \"data\" is often treated as a plural noun (e.g. \"the data suggest\").", answer: true, explanation: "In strict academic register 'data' is usually plural: 'the data suggest'." },
        { type: "find_error", question: "Find the grammatical mistake.",
          segments: ["The list of new items ", { u: "are" }, " carefully ", { u: "stored" }, " in ", { u: "the cloud" }, " every ", { u: "night" }, "."],
          correctIndex: 0, correction: "is (the head of the subject is 'the list', singular)",
          explanation: "The verb agrees with 'the list' (singular), not with 'items'." },
        { type: "find_error", question: "Find the mistake.",
          segments: ["She ", { u: "has lived" }, " in Berlin ", { u: "since" }, " three ", { u: "years" }, ", and she still ", { u: "works" }, " there."],
          correctIndex: 1, correction: "for ('for three years')",
          explanation: "'Since' marks a starting point; with a duration we use 'for'." },
        { type: "find_error", question: "Find the mistake.",
          segments: ["The new policy is ", { u: "more" }, " efficient ", { u: "but" }, " less ", { u: "costlier" }, " than ", { u: "the old one" }, "."],
          correctIndex: 2, correction: "costly ('less costly', not 'less costlier')",
          explanation: "We don't combine 'less' with an -er comparative: the correct form is 'less costly'." }
      ]
    },

    "toefl-b2-read-energy": {
      lessonId: "toefl-b2-read-energy", level: "B2", track: "TOEFL · Reading", topic: "science", skill: "reading",
      title: "Reading TOEFL: Renewable energy", xpReward: 66, mascotState: "explaining",
      explanation: {
        body: "A second B2 reading, slightly harder. It includes a very typical TOEFL question: sentence insertion (where does this sentence fit best?). Pay attention to linkers and to what pronouns refer to. Follow the logic paragraph by paragraph.",
        examples: [
          { en: "Where would the sentence best fit?" },
          { en: "intermittent" }
        ]
      },
      exercises: [
        { type: "reading", title: "Powering the Future",
          passage: "For most of the industrial era, electricity came from burning fossil fuels such as coal and gas. [A] In recent decades, however, the falling cost of solar panels and wind turbines has made renewable energy increasingly competitive. [B] In several countries, the cheapest new source of power is now the sun rather than coal. [C] This transformation has happened far faster than most analysts predicted. [D]\n\nRenewables nonetheless present a distinctive challenge: they are intermittent. The sun does not shine at night, and the wind does not always blow. Because electricity is difficult to store on a large scale, supply can fall short exactly when demand peaks. Engineers are tackling this problem with ever-larger batteries and with grids that share power across wide regions, so that a calm evening in one place can be offset by a windy night in another.\n\nThe stakes are high. If clean power becomes both cheap and reliable, the cost of cutting emissions could prove far lower than once feared. If storage lags behind, however, nations may remain dependent on fossil fuels for longer than the climate can afford.",
          questions: [
            { q: "Look at the four squares [A], [B], [C], [D]. Where would this sentence best fit? \"As a result, investment has poured into the sector.\"", options: ["[A]", "[B]", "[C]", "[D]"], correctIndex: 3, explanation: "The sentence ('as a result, investment arrived') fits after explaining that renewables have become competitive and the transition was fast: point [D] closes that line of thought." },
            { q: "What is the 'distinctive challenge' of renewables described in paragraph 2?", options: ["They are too expensive to build.", "They are intermittent and hard to store.", "They cannot be connected to a grid.", "They produce too much pollution."], correctIndex: 1, explanation: "\"...they are intermittent\" and electricity is hard to store." },
            { q: "The word \"offset\" in paragraph 2 is closest in meaning to...", options: ["switched off", "increased", "compensated for", "measured"], correctIndex: 2, explanation: "'Offset' = compensate for: a windless night in one place is compensated by wind in another." },
            { q: "According to the passage, what determines whether nations stay dependent on fossil fuels?", options: ["Whether energy storage keeps pace", "The price of coal alone", "Government advertising", "The number of analysts"], correctIndex: 0, explanation: "\"If storage lags behind... nations may remain dependent on fossil fuels...\"" }
          ] },
        { type: "multiple_choice", question: "The author's tone toward the energy transition is best described as...", options: ["completely certain", "openly hostile", "dismissive", "cautiously hopeful"], correctIndex: 3, explanation: "The writer recognises the rapid progress but warns about the storage challenge: cautious optimism." },
        { type: "true_false", statement: "According to the passage, in some countries solar power is now cheaper than coal.", answer: true, explanation: "\"...the cheapest new source of power is now the sun rather than coal.\"" },
        { type: "fill_blank", sentence: "Renewables are ___: the sun does not shine at night and the wind does not always blow.", answers: ["intermittent"], hint: "Not constant; they stop and start.", explanation: "'Intermittent' = stopping and starting, not continuous." },
        { type: "matching", instruction: "Match each word with its synonym.", pairs: [
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
        body: "A C1 scientific reading: technical vocabulary and complex sentences. Identify the function of each paragraph, distinguish facts from rhetorical purposes and answer negative-fact, reference, inference and paraphrase questions. Find the exact evidence before you answer.",
        examples: [
          { en: "convert sunlight into chemical energy" },
          { en: "by-product" },
          { en: "Which best paraphrases the sentence?" }
        ]
      },
      exercises: [
        { type: "reading", title: "How Plants Make Food",
          passage: "Photosynthesis is the process by which green plants, algae and some bacteria convert light energy into chemical energy stored in sugars. The process takes place mainly in the leaves, within tiny structures called chloroplasts that contain the green pigment chlorophyll.\n\nDuring photosynthesis, a plant absorbs carbon dioxide from the air through small pores called stomata and draws up water through its roots. Using energy captured from sunlight, the plant combines these raw materials to produce glucose, a simple sugar that fuels growth. Oxygen is released as a by-product. Crucially, the stomata that admit carbon dioxide also allow water vapour to escape, so a plant must constantly balance the need for gas exchange against the risk of drying out.\n\nThe significance of this reaction extends far beyond the individual plant. Because photosynthesis removes carbon dioxide and releases oxygen, it helps regulate the composition of the atmosphere. Indeed, nearly all of the oxygen that animals breathe ultimately originates from photosynthetic organisms. Over geological time, the gradual accumulation of this oxygen transformed the planet, making complex animal life possible in the first place.",
          questions: [
            { q: "What is the main purpose of the passage?", options: ["To compare plants with animals", "To explain how photosynthesis works and why it matters", "To describe the colour of leaves", "To argue that plants are more important than oceans"], correctIndex: 1, explanation: "It explains the process and why it matters: that is its purpose." },
            { q: "According to the passage, the stomata serve which two functions?", options: ["Admitting carbon dioxide and releasing water vapour", "Storing glucose and producing chlorophyll", "Releasing glucose and absorbing oxygen", "Absorbing sunlight and water"], correctIndex: 0, explanation: "The stomata let CO2 in and let water vapour out (hence the balance the plant must keep)." },
            { q: "The phrase \"by-product\" is closest in meaning to...", options: ["a raw material", "a harmful waste that must be removed", "the main goal of the process", "something produced in addition to the main product"], correctIndex: 3, explanation: "A by-product is produced in addition to the main product (here, glucose)." },
            { q: "Why does the author mention that animals breathe oxygen from photosynthetic organisms?", options: ["To prove animals are unnecessary", "To define chlorophyll", "To show that photosynthesis matters far beyond a single plant", "To explain how roots absorb water"], correctIndex: 2, explanation: "It illustrates the global impact of the process (the rhetorical function of the last paragraph)." },
            { q: "Which best paraphrases: \"a plant must constantly balance the need for gas exchange against the risk of drying out\"?", options: ["Plants never need to exchange gases.", "Plants must trade off taking in gases with losing water.", "Plants dry out only at night.", "Gas exchange has no effect on water."], correctIndex: 1, explanation: "There is a trade-off: to exchange gases the plant risks losing water." },
            { q: "It can be inferred that, without photosynthesis, ...", options: ["the atmosphere would contain much less oxygen", "plants would grow faster", "carbon dioxide would disappear", "the sun would stop shining"], correctIndex: 0, explanation: "If almost all oxygen comes from photosynthetic organisms, without them there would be much less oxygen." }
          ] },
        { type: "multiple_choice", question: "According to the passage, which is NOT a product or output of photosynthesis?", options: ["glucose", "oxygen", "carbon dioxide", "chemical energy in sugars"], correctIndex: 2, explanation: "CO2 is a raw material (an input), not a product. The others are outputs." },
        { type: "matching", instruction: "Match each term with its definition.", pairs: [
          { l: "chlorophyll", r: "green pigment that captures light" },
          { l: "stomata", r: "pores that let gases in and out" },
          { l: "glucose", r: "simple sugar that fuels growth" },
          { l: "chloroplast", r: "structure where photosynthesis occurs" }
        ] },
        { type: "fill_blank", sentence: "Over geological time, the build-up of oxygen made complex ___ life possible.", answers: ["animal"], hint: "What breathes oxygen.", explanation: "\"...making complex animal life possible in the first place.\"" },
        { type: "true_false", statement: "According to the passage, only green plants are capable of photosynthesis.", answer: false, explanation: "\"...green plants, algae and some bacteria...\"" }
      ]
    },

    "toefl-c1-listen-lecture": {
      lessonId: "toefl-c1-listen-lecture", level: "C1", track: "TOEFL · Listening", topic: "study", skill: "listening",
      title: "Listening TOEFL: History lecture", xpReward: 70, mascotState: "explaining",
      explanation: {
        body: "An academic lecture mixes facts with the professor's interpretation. Listen for the central idea, follow the organisation (cause and effect, examples, caveats) and catch the tone and nuance. Distinguish facts from the professor's opinion.",
        examples: [
          { en: "Let's turn our attention to..." },
          { en: "I'd urge you to be cautious." },
          { en: "What can be inferred about...?" }
        ]
      },
      exercises: [
        { type: "listening",
          text: "Today I'd like to talk about the printing press and why historians consider it one of the most transformative inventions ever made. Before the mid-fifteenth century, books in Europe were copied by hand, which made them extraordinarily expensive and rare. When Johannes Gutenberg introduced movable metal type around 1450, the cost of producing a book fell sharply. Suddenly, ideas could spread across the continent in weeks rather than decades.", "audio": "assets/audio/app/c1_726bd22287.mp3",
          question: "What is the lecture mainly about?", options: ["The biography of Johannes Gutenberg", "Why the printing press was so transformative", "How to repair and restore an old printing machine by hand", "The history of paper in China"], correctIndex: 1, explanation: "Everything revolves around the transformative impact of the printing press." },
        { type: "multiple_choice", question: "According to the lecture, how were books made in Europe before the mid-fifteenth century?", options: ["Copied by hand", "Carved into wood", "Imported from Asia", "Printed with metal type"], correctIndex: 0, explanation: "\"...books in Europe were copied by hand...\"" },
        { type: "listening",
          text: "Now, it's tempting to think the printing press alone caused these changes, but I'd urge you to be cautious. The press spread quickly only because literacy was already rising and paper had become cheaper. Technology rarely works in isolation; it amplifies forces that are already present.", "audio": "assets/audio/app/c1_5ad7d85f32.mp3",
          question: "What is the professor's main point in this part?", options: ["Paper was the only cause.", "The press was unimportant.", "Literacy fell after the press appeared.", "The press succeeded because other conditions were already in place."], correctIndex: 3, explanation: "The professor warns that technology amplifies forces that already exist (literacy, cheap paper)." },
        { type: "multiple_choice", question: "What can be inferred about the professor's view of technological change?", options: ["A single invention, on its own, usually explains most historical change.", "Inventions rarely have any effect.", "Change typically results from several factors acting together.", "Technology should be avoided."], correctIndex: 2, explanation: "'Technology rarely works in isolation' suggests multiple causes acting together." },
        { type: "listening",
          text: "Consider one striking consequence. Within a few decades, printers were producing not just bibles but pamphlets, maps, and scientific tables. Errors could now be corrected and reprinted, so knowledge began to accumulate and improve from one edition to the next, something almost impossible when every copy was unique.", "audio": "assets/audio/app/c1_e292e878e7.mp3",
          question: "According to this part, why was the ability to reprint significant?", options: ["It made books more decorative.", "It allowed errors to be corrected so knowledge could accumulate.", "It reduced literacy.", "It made every copy unique."], correctIndex: 1, explanation: "Reprinting made it possible to correct errors and to build on knowledge from one edition to the next." },
        { type: "true_false", statement: "The professor suggests that the printing press alone was responsible for spreading ideas.", answer: false, explanation: "\"...it's tempting to think the printing press alone caused these changes, but I'd urge you to be cautious.\"" }
      ]
    },

    "toefl-c1-vocab-academic": {
      lessonId: "toefl-c1-vocab-academic", level: "C1", track: "TOEFL · Vocabulary", topic: "study", skill: "vocab",
      title: "Vocabulary TOEFL: Academic Word List", xpReward: 66, mascotState: "explaining",
      explanation: {
        body: "The TOEFL rewards academic vocabulary (the AWL): verbs like analyze, indicate, derive; nouns like hypothesis, criteria; and their different forms (analyse → analysis → analytical). Practise recognising them, telling nuances apart and using them in a formal context.",
        examples: [
          { en: "The results indicate a clear trend." },
          { en: "We derived our conclusions from the data." },
          { en: "a comprehensive analysis" }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Match each academic verb with its synonym.", pairs: [
          { l: "indicate", r: "show / point to" },
          { l: "derive", r: "obtain from a source" },
          { l: "scrutinize", r: "examine very closely" },
          { l: "substantiate", r: "support with evidence" }
        ] },
        { type: "categorize", instruction: "Is the word a noun, a verb or an adjective?", buckets: [
          { id: "n", label: "Noun" }, { id: "v", label: "Verb" }, { id: "a", label: "Adjective" } ], items: [
          { t: "hypothesis", bucket: "n" }, { t: "evaluate", bucket: "v" },
          { t: "coherent", bucket: "a" }, { t: "interpret", bucket: "v" },
          { t: "analysis", bucket: "n" }, { t: "ambiguous", bucket: "a" } ] },
        { type: "fill_blank", sentence: "The findings strongly ___ that the treatment is effective. (show)", answers: ["indicate", "suggest"], hint: "An academic verb meaning 'show / point to'.", explanation: "\"The findings indicate/suggest that...\"" },
        { type: "fill_blank", sentence: "She carried out a thorough ___ of the results. (noun form of 'analyse')", answers: ["analysis"], hint: "analyse -> ___.", explanation: "The noun is 'analysis'." },
        { type: "multiple_choice", question: "Choose the most precise academic word: \"The two studies reached ___ conclusions, despite different methods.\"", options: ["consistent", "kinda similar", "okay", "samey"], correctIndex: 0, explanation: "'Consistent conclusions' is the right academic register." },
        { type: "multiple_choice", question: "Which word means 'open to more than one interpretation'?", options: ["explicit", "redundant", "ambiguous", "coherent"], correctIndex: 2, explanation: "'Ambiguous' = having more than one possible reading." },
        { type: "true_false", statement: "\"To substantiate a claim\" means to weaken it.", answer: false, explanation: "It means to support it with evidence, not to weaken it." },
        { type: "translate", prompt: "Rewrite academically, using 'support' and 'hypothesis': The numbers show that our idea is probably right.",
          answers: ["the data support the hypothesis","the data supports the hypothesis","the data support our hypothesis","the data supports our hypothesis"], explanation: "The data support the hypothesis." },
        { type: "find_error", question: "Find the mistake (academic register).",
          segments: ["Hardly ", { u: "the experiment had begun" }, " ", { u: "when" }, " the equipment ", { u: "failed" }, ", ", { u: "forcing" }, " a delay."],
          correctIndex: 0, correction: "had the experiment begun (inversion after 'Hardly')",
          explanation: "After an initial negative adverb like 'Hardly', the subject and auxiliary are inverted: 'Hardly had the experiment begun...'" },
        { type: "find_error", question: "Find the mistake.",
          segments: ["The committee ", { u: "recommended" }, " that the report ", { u: "is" }, " ", { u: "submitted" }, " ", { u: "by Friday" }, "."],
          correctIndex: 1, correction: "be ('recommended that the report be submitted')",
          explanation: "After 'recommend that', the formal subjunctive uses the base form of the verb: 'be submitted'." }
      ]
    },

    "toefl-c1-read-placebo": {
      lessonId: "toefl-c1-read-placebo", level: "C1", track: "TOEFL · Reading", topic: "science", skill: "reading",
      title: "Reading TOEFL: The placebo effect", xpReward: 72, mascotState: "explaining",
      explanation: {
        body: "A C1 reading about scientific method, with nuance and caveats. Focus on the writer's reasoning, not just the data: why experiments are designed this way and which conclusions can NOT be drawn. Watch out for distractors that exaggerate the text.",
        examples: [
          { en: "double-blind trial" },
          { en: "a control group" }
        ]
      },
      exercises: [
        { type: "reading", title: "Mind Over Medicine",
          passage: "When patients are given a treatment they believe to be effective, many improve even if the treatment itself is inactive, a phenomenon known as the placebo effect. A sugar pill, presented convincingly as medicine, can measurably reduce reported pain. The effect is real enough that it complicates the testing of genuine drugs.\n\nTo separate a drug's true effect from the placebo response, researchers rely on the randomized controlled trial. Volunteers are divided at random into two groups: one receives the actual drug, the other an identical-looking placebo. Ideally, neither the patients nor the doctors know who is receiving which, an arrangement called a double-blind design. Only by comparing the two groups can scientists be confident that any extra improvement is due to the drug rather than to expectation alone.\n\nThe placebo effect should not, however, be mistaken for proof that illness is imaginary. Expectation appears to trigger genuine physiological changes, including the release of the body's own pain-relieving chemicals. What the effect reveals is not that symptoms are fake, but that the mind's influence on the body is more substantial than once assumed.",
          questions: [
            { q: "What is the main idea of the passage?", options: ["Sugar pills are better than real drugs.", "The placebo effect is real and shapes how drugs must be tested.", "All illness is imaginary.", "Doctors should never use placebos."], correctIndex: 1, explanation: "It defines the placebo effect and explains how it forces careful trial design; it also clarifies what it does NOT mean." },
            { q: "According to the passage, why are double-blind trials used?", options: ["So that neither patients nor doctors know who gets the real drug, isolating its true effect", "To speed up recovery", "To give everyone the real drug", "To make trials cheaper"], correctIndex: 0, explanation: "Double-blind design stops patients' and doctors' expectations from contaminating the result." },
            { q: "The author states that the placebo effect should NOT be taken as evidence that...", options: ["drugs must be tested carefully", "the mind influences the body", "expectation affects the body", "illness is imaginary or fake"], correctIndex: 3, explanation: "\"...should not... be mistaken for proof that illness is imaginary.\"" },
            { q: "Which can be inferred from the final paragraph?", options: ["Placebos always outperform drugs.", "The mind has no effect on physical health.", "Mental expectation can produce measurable bodily changes.", "Pain-relieving chemicals are fictional."], correctIndex: 2, explanation: "Expectation releases the body's own painkillers: real physiological changes." },
            { q: "Why does the author mention 'the body's own pain-relieving chemicals'?", options: ["To prove placebos are dangerous", "To support the claim that the effect involves real physiology", "To recommend a specific drug", "To criticize controlled trials"], correctIndex: 1, explanation: "It is evidence that the effect has a real physiological basis, not an imaginary one." }
          ] },
        { type: "multiple_choice", question: "In context, 'inactive' (paragraph 1) describes a treatment that...", options: ["has no real medical effect of its own", "is very powerful", "is given by injection", "is illegal"], correctIndex: 0, explanation: "An 'inactive' treatment (e.g. a sugar pill) has no medical effect of its own." },
        { type: "true_false", statement: "According to the passage, in a double-blind trial the doctors know which patients receive the real drug.", answer: false, explanation: "In a double-blind trial, neither the patients nor the doctors know." },
        { type: "fill_blank", sentence: "In a trial, the group that receives the placebo serves as the ___ group.", answers: ["control"], hint: "A point of comparison.", explanation: "The placebo group is the control group." },
        { type: "matching", instruction: "Match each term with its meaning.", pairs: [
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
        body: "Proficiency level. Dense passages with concession, contrast and hypothesis. Read to identify the writer's position and the rhetorical function of each sentence; the distractors will be plausible and demand nuance. It includes a summary question (main idea vs detail). Distinguish claim, evidence and caveat.",
        examples: [
          { en: "contrary to long-held belief" },
          { en: "to a remarkable extent" },
          { en: "Select the ideas that belong in a summary." }
        ]
      },
      exercises: [
        { type: "reading", title: "The Adaptable Brain",
          passage: "For much of the twentieth century, neuroscientists assumed that the adult brain was essentially fixed: once development was complete, its structure could not meaningfully change. This assumption has since been overturned. Contrary to long-held belief, the mature brain retains, to a remarkable extent, the capacity to reorganize itself, a property now termed neuroplasticity.\n\nEvidence for neuroplasticity comes from diverse sources. Patients who have lost a limb sometimes report sensations that seem to arise from the missing part; brain imaging reveals that regions once devoted to the limb have been recruited for other functions. Likewise, studies of musicians show that intensive practice can enlarge the cortical areas associated with finger control. Such findings suggest that experience does not merely fill a static brain with information; it physically reshapes the organ itself.\n\nNevertheless, plasticity should not be romanticized. The same mechanisms that allow the brain to recover from injury can also entrench maladaptive patterns, as in chronic pain or addiction, where unwanted circuits are reinforced rather than erased. Moreover, plasticity tends to decline with age, which is why recovery from brain injury is often more complete in children than in adults. Plasticity, in short, is neither inherently beneficial nor harmful; it is simply the brain's capacity for change, for better or worse.",
          questions: [
            { q: "What is the author's central claim?", options: ["The adult brain cannot change after development.", "Neuroplasticity occurs only in musicians.", "The mature brain can reorganize itself, though this is not always beneficial.", "Brain injury is always permanent."], correctIndex: 2, explanation: "It asserts the plasticity of the adult brain and adds that it is not always positive." },
            { q: "Why does the author mention musicians?", options: ["To prove that music improves memory", "As evidence that experience can physically reshape the brain", "To criticize intensive practice", "To show music is more difficult than medicine"], correctIndex: 1, explanation: "The example is evidence of experience-driven cortical reorganisation." },
            { q: "The phrase \"should not be romanticized\" suggests the author wants readers to...", options: ["avoid an overly idealized view of plasticity", "ignore plasticity altogether", "admire plasticity without question", "view plasticity in an unrealistically positive way"], correctIndex: 0, explanation: "'Should not be romanticized' = avoid an overly positive view." },
            { q: "According to paragraph 3, why is recovery often more complete in children?", options: ["Children's brains are fully developed.", "Children have more injuries.", "Adults do not seek treatment.", "Plasticity tends to decline with age."], correctIndex: 3, explanation: "\"...plasticity tends to decline with age, which is why recovery... is often more complete in children...\"" },
            { q: "In context, 'entrench maladaptive patterns' means to...", options: ["reverse an injury", "study unusual behaviour", "remove harmful habits", "firmly establish harmful patterns"], correctIndex: 3, explanation: "'Entrench' = fix firmly in place; 'maladaptive' = harmful, badly adapted." },
            { q: "Summary task — select the statement that belongs in a summary of the passage (a main idea, not a minor detail):", options: ["Some amputees feel sensations in a missing limb.", "The adult brain can reorganize itself, with both beneficial and harmful consequences.", "Musicians practise finger control.", "Brain imaging uses scanners."], correctIndex: 1, explanation: "A summary includes the central thesis; the others are supporting details." }
          ] },
        { type: "multiple_choice", question: "Which statement best reflects the author's overall stance?", options: ["Neuroplasticity is morally neutral and can have good or bad effects.", "Neuroplasticity only harms the brain.", "Neuroplasticity is entirely positive.", "Neuroplasticity has never been proven."], correctIndex: 0, explanation: "\"...neither inherently beneficial nor harmful...\" => neutral, with effects in both directions." },
        { type: "true_false", statement: "The passage implies that experience leaves the physical structure of the brain unchanged.", answer: false, explanation: "The opposite: 'it physically reshapes the organ itself.'" },
        { type: "fill_blank", sentence: "The capacity of the brain to reorganize itself is called ___.", answers: ["neuroplasticity"], hint: "The term defined in the passage.", explanation: "\"...a property now termed neuroplasticity.\"" },
        { type: "matching", instruction: "Match each term with its meaning.", pairs: [
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
        body: "In an advanced seminar, the speaker raises a question, presents evidence and challenges the obvious interpretation. Listen for the thesis, the counter-examples, the critical attitude and what is implied without being said. Catch the argument and the nuance, not just the data.",
        examples: [
          { en: "At first glance, the answer seems obvious." },
          { en: "But the picture is more complicated than that." },
          { en: "Be wary of anyone who claims..." }
        ]
      },
      exercises: [
        { type: "listening",
          text: "Let's consider a familiar question in economics: does raising the minimum wage reduce employment? At first glance, the answer seems obvious. If labour becomes more expensive, employers should hire fewer workers. For decades, this was treated almost as a law of nature. But the picture is more complicated than that. A number of careful studies, comparing neighbouring regions with different wage laws, found little or no fall in employment after modest increases.", "audio": "assets/audio/app/c2_1e251394db.mp3",
          question: "What is the speaker mainly trying to show?", options: ["That economics cannot be studied scientifically", "That raising the minimum wage always destroys jobs, as standard theory predicts", "That the obvious prediction about minimum wage is challenged by evidence", "That wages should never rise"], correctIndex: 2, explanation: "The speaker contrasts the 'obvious' prediction with studies that challenge it." },
        { type: "multiple_choice", question: "What kind of evidence does the speaker cite?", options: ["Personal opinions of employers gathered in informal interviews across the country", "Studies comparing neighbouring regions with different wage laws", "Ancient historical records", "A single company's profits"], correctIndex: 1, explanation: "\"...comparing neighbouring regions with different wage laws...\"" },
        { type: "listening",
          text: "Now, I'm not telling you that minimum wages never affect jobs. Push the wage high enough and you will surely see consequences. The lesson is subtler: economic predictions that sound like common sense don't always survive contact with the data. So be wary of anyone who claims the answer is simple.", "audio": "assets/audio/app/c2_9baa615248.mp3",
          question: "What does the speaker imply about 'common-sense' economic claims?", options: ["They may fail when checked against evidence.", "They are irrelevant to policy.", "They are always correct.", "They should be accepted without testing."], correctIndex: 0, explanation: "The speaker implies that common sense doesn't always survive a comparison with the data." },
        { type: "multiple_choice", question: "What is the speaker's attitude overall?", options: ["Certainty that minimum wages have no effect whatsoever on employment", "Angry at all economists", "Indifferent to the question", "Cautious and critical, resisting simple answers"], correctIndex: 3, explanation: "The speaker invites us to distrust simple answers: a critical, cautious attitude." },
        { type: "listening",
          text: "There's a methodological point worth stressing here. When two neighbouring areas differ only in their wage law, comparing them is almost like running an experiment. That design is powerful precisely because it holds other factors roughly constant, so differences in employment are more plausibly linked to the wage itself.", "audio": "assets/audio/app/c2_432dadeb3c.mp3",
          question: "According to this part, why is comparing neighbouring areas a powerful method?", options: ["It relies on employers' opinions.", "It is cheaper than surveys.", "It uses very old data.", "It holds other factors roughly constant, like an experiment."], correctIndex: 3, explanation: "By holding other factors constant, differences can be attributed to the wage: a quasi-experiment." },
        { type: "true_false", statement: "The speaker concludes that minimum wages can never affect employment.", answer: false, explanation: "\"...I'm not telling you that minimum wages never affect jobs. Push the wage high enough and you will surely see consequences.\"" }
      ]
    },

    "toefl-c2-integrated-writing": {
      lessonId: "toefl-c2-integrated-writing", level: "C2", track: "TOEFL · Writing", topic: "writing", skill: "use",
      title: "Writing TOEFL: Integrated & cohesion", xpReward: 74, mascotState: "explaining",
      explanation: {
        body: "The TOEFL integrated task requires you to summarise and connect sources accurately and cohesively: exact linkers (contrast, concession, consequence), faithful paraphrase and reporting verbs. Don't copy, and choose the right nuance. Rephrase faithfully and link ideas logically.",
        examples: [
          { en: "The lecture casts doubt on the reading's claim." },
          { en: "Whereas the author argues X, the speaker counters that Y." },
          { en: "to concede a point" }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "Which verb best signals that the lecture disagrees with the reading?", options: ["The lecture confirms the reading.", "The lecture challenges the reading.", "The lecture ignores the reading.", "The lecture repeats the reading."], correctIndex: 1, explanation: "'Challenges / casts doubt on' expresses disagreement, which is typical in the integrated task." },
        { type: "multiple_choice", question: "Which verb concedes a point before disagreeing? \"The author ___ that costs are high, but argues the benefits outweigh them.\"", options: ["ignores", "denies", "concedes", "forgets"], correctIndex: 2, explanation: "'Concede' = admit a point before qualifying or rejecting the argument." },
        { type: "fill_blank", sentence: "___ the author claims the policy succeeded, the speaker provides data showing it failed. (concession)", answers: ["Whereas", "While", "Although"], hint: "A linker of contrast or concession.", explanation: "Whereas / While / Although introduce the contrast between sources." },
        { type: "categorize", instruction: "Classify each linker by its function.", buckets: [
          { id: "c", label: "Contrast" }, { id: "s", label: "Consequence" }, { id: "a", label: "Addition / Concession" } ], items: [
          { t: "however", bucket: "c" }, { t: "therefore", bucket: "s" },
          { t: "moreover", bucket: "a" }, { t: "nevertheless", bucket: "c" },
          { t: "consequently", bucket: "s" }, { t: "admittedly", bucket: "a" } ] },
        { type: "multiple_choice", question: "Which is the best paraphrase of \"The findings undermine the hypothesis\"?", options: ["The findings weaken the hypothesis.", "The findings simply restate the hypothesis.", "The findings strongly support the hypothesis.", "The findings ignore the hypothesis."], correctIndex: 0, explanation: "'Undermine' = weaken gradually." },
        { type: "multiple_choice", question: "Choose the most cohesive sentence to open a summary body paragraph.", options: ["And then more points happen.", "Stuff about jobs and machines.", "Another thing is also there too.", "First, the lecture refutes the reading's claim that automation reduces overall employment."], correctIndex: 3, explanation: "It's specific, signals order ('First') and names the relationship between the sources: academic cohesion." },
        { type: "word_order", words: ["Not", "only", "does", "the", "lecture", "rebut", "the", "reading"],
          correctOrder: ["Not", "only", "does", "the", "lecture", "rebut", "the", "reading"],
          hint: "Emphatic inversion: Not only + does + subject + verb." },
        { type: "translate", prompt: "Report the relationship between the sources with 'contradicts': The lecture says the reading's argument is wrong.",
          answers: ["the lecture contradicts the argument of the reading", "the lecture contradicts the reading's argument"], explanation: "The lecture contradicts the reading's argument." },
        { type: "find_error", question: "Find the mistake (advanced).",
          segments: ["Not only ", { u: "the results were" }, " surprising, ", { u: "but they also" }, " ", { u: "challenged" }, " ", { u: "a long-held theory" }, "."],
          correctIndex: 0, correction: "were the results (inversion after 'Not only')",
          explanation: "'Not only' at the start requires inversion: 'Not only were the results surprising...'" },
        { type: "find_error", question: "Find the mistake.",
          segments: ["The phenomenon, ", { u: "together with" }, " its many causes, ", { u: "remain" }, " ", { u: "poorly" }, " ", { u: "understood" }, "."],
          correctIndex: 1, correction: "remains (the subject 'the phenomenon' is singular)",
          explanation: "'together with...' doesn't change the number of the subject; the verb agrees with 'phenomenon'." },
        { type: "find_error", question: "Find the mistake (conditional).",
          segments: ["Had the policy been implemented earlier, ", { u: "the crisis" }, " ", { u: "may have" }, " ", { u: "been" }, " ", { u: "averted" }, "."],
          correctIndex: 1, correction: "might have ('might have been averted' in the third conditional)",
          explanation: "In the third conditional the result uses 'would/might have + past participle', not 'may have'." }
      ]
    },

    "toefl-c2-read-language": {
      lessonId: "toefl-c2-read-language", level: "C2", track: "TOEFL · Reading", topic: "language", skill: "reading",
      title: "Reading TOEFL: Language change", xpReward: 78, mascotState: "explaining",
      explanation: {
        body: "A reading of the highest difficulty, about linguistics. The writer refutes a popular idea and replaces it with a subtler explanation. Follow the argument structure (rival thesis → objection → own thesis) and distrust distractors that sound reasonable but go beyond the text. Identify exactly what the writer claims.",
        examples: [
          { en: "prescriptive vs. descriptive" },
          { en: "to lament the decline of language" }
        ]
      },
      exercises: [
        { type: "reading", title: "Is Language Decaying?",
          passage: "In every generation, someone laments that the language is decaying. New words are dismissed as ugly, dropped distinctions are mourned as losses, and the young are blamed for a supposed collapse of standards. To the linguist, however, such complaints rest on a misunderstanding of what language is.\n\nLanguages are not fixed codes handed down unaltered; they are systems in perpetual motion, reshaped by the very people who use them. The English of Shakespeare differs from that of Chaucer, and both differ from the English spoken today, yet none can sensibly be called a corrupted version of the others. Change is not decay; it is the normal condition of a living language. What one era condemns as sloppy, a later era often accepts as standard, and the words once denounced as vulgar frequently become unremarkable.\n\nThis is not to say that all judgments about language are baseless. Clarity, precision and appropriateness to context remain genuine virtues, and a writer who ignores them communicates poorly. The linguist's point is narrower: that the existence of change, by itself, is no evidence of decline. To confuse the two is to mistake the ordinary life of language for a disease.",
          questions: [
            { q: "What is the author's main argument?", options: ["Language is steadily getting worse.", "Language change is normal and is not the same as decay.", "Only Shakespeare wrote correct English.", "All judgments about good writing are worthless."], correctIndex: 1, explanation: "The thesis: language change is normal and is not the same as decay." },
            { q: "Why does the author mention Chaucer and Shakespeare?", options: ["To recommend reading classic literature", "To date the origin of English", "To show that English has always changed without being 'corrupted'", "To prove older English was superior"], correctIndex: 2, explanation: "It illustrates that English has always changed without one stage being a corruption of another." },
            { q: "In the third paragraph, the author concedes that...", options: ["language never changes", "writers should ignore context", "all complaints about language are correct", "clarity, precision and appropriateness are still real virtues"], correctIndex: 3, explanation: "The writer concedes that clarity and precision are still real virtues: a nuance to the thesis." },
            { q: "Which best paraphrases \"the existence of change, by itself, is no evidence of decline\"?", options: ["The mere fact that a language changes does not show it is getting worse.", "Change always proves a language is dying.", "Languages should never change.", "Decline causes change."], correctIndex: 0, explanation: "The fact that something changes doesn't, by itself, prove it is getting worse." },
            { q: "The author's attitude toward those who 'lament that the language is decaying' is best described as...", options: ["sympathetic agreement", "respectful but corrective", "openly mocking and dismissive of all their views", "completely neutral"], correctIndex: 1, explanation: "The writer corrects them (their complaint comes from a misunderstanding) but concedes that some judgments are valid: respectful correction, not mockery." },
            { q: "It can be inferred that the author distinguishes between...", options: ["the fact of change and a judgment of decline", "English and other languages", "spoken and written language", "grammar and vocabulary"], correctIndex: 0, explanation: "The writer separates the fact of change from the judgment of decline: confusing them is the mistake." }
          ] },
        { type: "multiple_choice", question: "In context, 'mourned as losses' (paragraph 1) describes how some people react to dropped distinctions by...", options: ["ignoring them", "celebrating them", "treating them as regrettable disappearances", "inventing new ones"], correctIndex: 2, explanation: "'Mourn' = feel sorrow for; lost distinctions are experienced as regrettable losses." },
        { type: "true_false", statement: "The author claims that no judgment about language is ever justified.", answer: false, explanation: "The writer concedes that clarity, precision and appropriateness are still virtues: some judgments are valid." },
        { type: "fill_blank", sentence: "For the linguist, change is not decay but the normal condition of a ___ language.", answers: ["living"], hint: "Alive, still in use.", explanation: "\"...the normal condition of a living language.\"" },
        { type: "matching", instruction: "Match each term with its meaning.", pairs: [
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
