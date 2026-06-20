/* =====================================================================
 * VESPER · BOSS EXAMS  (bancos dedicados para el jefe de cada mundo)
 * ---------------------------------------------------------------------
 * Preguntas NUEVAS, con palabras y contextos distintos a los de las
 * lecciones: el jefe es un examen de verdad, no un repaso memorizado.
 * Cada intento muestrea el banco, así las preguntas varían.
 *
 * En C1 y C2 el examen tiene formato TOEFL (lectura académica + listening
 * + estructura/vocabulario) pero en versión CORTA (toefl:true).
 *
 * Lo consume buildBossExam() en leccion.html. Tipos de ejercicio: los que
 * ya renderiza leccion.html (reading, listening, find_error, multiple_choice,
 * fill_blank, true_false, word_order, translate).
 * ===================================================================== */
window.VESPER_BOSS_EXAMS = {

  /* ============================ A1 ============================ */
  A1: { exercises: [
    { type: "find_error", question: "Encuentra el error.",
      segments: ["My brother ", { u: "don't" }, " like ", { u: "cold" }, " ", { u: "milk" }, " in the ", { u: "morning" }, "."],
      correctIndex: 0, correction: "doesn't (he -> doesn't)", explanation: "Con 'my brother' (= he) la negación es 'doesn't'." },
    { type: "multiple_choice", question: "Choose the correct word: \"___ are my parents.\"", options: ["This", "These", "That"], correctIndex: 1, explanation: "Plural cercano: 'These'." },
    { type: "fill_blank", sentence: "There ___ three books on the table.", answers: ["are"], hint: "Sujeto plural.", explanation: "Con plural: 'There are'." },
    { type: "multiple_choice", question: "We ___ to school by bus.", options: ["go", "goes", "going"], correctIndex: 0, explanation: "Con 'we': 'go'." },
    { type: "word_order", words: ["She", "is", "reading", "a", "book"], correctOrder: ["She", "is", "reading", "a", "book"], hint: "Presente continuo: is + -ing." },
    { type: "find_error", question: "Encuentra el error.",
      segments: ["I ", { u: "has" }, " ", { u: "a" }, " ", { u: "red" }, " ", { u: "bike" }, "."],
      correctIndex: 0, correction: "have (I have)", explanation: "Con 'I' el verbo es 'have', no 'has'." },
    { type: "true_false", statement: "We use \"a\" before \"apple\".", answer: false, explanation: "'apple' empieza por sonido vocálico: 'an apple'." },
    { type: "multiple_choice", question: "\"What time is it?\" \"It's seven ___.\"", options: ["o'clock", "hour", "time"], correctIndex: 0, explanation: "\"seven o'clock\"." },
    { type: "fill_blank", sentence: "My mother ___ (cook) dinner every day.", answers: ["cooks"], hint: "she + verbo + -s.", explanation: "Con 'mother' (= she): 'cooks'." },
    { type: "multiple_choice", question: "Choose the plural: one child, two ___.", options: ["childs", "children", "childes"], correctIndex: 1, explanation: "Plural irregular: 'children'." },
    { type: "word_order", words: ["They", "don't", "live", "here"], correctOrder: ["They", "don't", "live", "here"], hint: "Negativo presente: don't + verbo." },
    { type: "multiple_choice", question: "Complete: \"I'm ___ Spain.\"", options: ["from", "in", "at"], correctIndex: 0, explanation: "Origen: 'I'm from Spain'." }
  ] },

  /* ============================ A2 ============================ */
  A2: { exercises: [
    { type: "find_error", question: "Encuentra el error.",
      segments: ["Yesterday she ", { u: "buyed" }, " a new ", { u: "dress" }, " for the ", { u: "party" }, " last ", { u: "week" }, "."],
      correctIndex: 0, correction: "bought ('buy' es irregular)", explanation: "El pasado de 'buy' es 'bought'." },
    { type: "multiple_choice", question: "He is the ___ student in the class.", options: ["tall", "taller", "tallest"], correctIndex: 2, explanation: "Superlativo: 'the tallest'." },
    { type: "fill_blank", sentence: "We ___ (not / go) to school yesterday.", answers: ["didn't go", "did not go"], hint: "Negativo en pasado.", explanation: "didn't + verbo base: 'didn't go'." },
    { type: "multiple_choice", question: "There ___ a lot of people at the concert.", options: ["was", "were", "is"], correctIndex: 1, explanation: "Plural ('people'): 'There were'." },
    { type: "word_order", words: ["What", "did", "you", "do", "yesterday"], correctOrder: ["What", "did", "you", "do", "yesterday"], hint: "Pregunta en pasado: did + sujeto + verbo." },
    { type: "find_error", question: "Encuentra el error.",
      segments: ["This book is ", { u: "more" }, " ", { u: "interesting" }, " ", { u: "that" }, " the ", { u: "other one" }, "."],
      correctIndex: 2, correction: "than (comparativo)", explanation: "El comparativo usa 'than', no 'that'." },
    { type: "multiple_choice", question: "How ___ sugar do you want?", options: ["many", "much", "few"], correctIndex: 1, explanation: "'sugar' es incontable: 'much'." },
    { type: "true_false", statement: "The comparative of \"good\" is \"gooder\".", answer: false, explanation: "Es irregular: 'better'." },
    { type: "fill_blank", sentence: "She ___ (be) at home last night.", answers: ["was"], hint: "she + pasado de 'be'.", explanation: "Con 'she': 'was'." },
    { type: "translate", prompt: "Traduce: \"Fui al cine ayer.\"", answers: ["i went to the cinema yesterday", "i went to the movies yesterday"], explanation: "I went to the cinema yesterday." },
    { type: "word_order", words: ["They", "were", "playing", "football"], correctOrder: ["They", "were", "playing", "football"], hint: "Pasado continuo: were + -ing." }
  ] },

  /* ============================ B1 ============================ */
  B1: { exercises: [
    { type: "find_error", question: "Encuentra el error.",
      segments: ["I ", { u: "have saw" }, " that film ", { u: "twice" }, " ", { u: "this" }, " ", { u: "year" }, "."],
      correctIndex: 0, correction: "have seen (participio de 'see')", explanation: "Present perfect: have + participio = 'have seen'." },
    { type: "multiple_choice", question: "If I ___ rich, I would travel the world.", options: ["am", "was", "were"], correctIndex: 2, explanation: "Segundo condicional: 'If I were rich...'." },
    { type: "fill_blank", sentence: "She has worked here ___ 2018.", answers: ["since"], hint: "Momento concreto.", explanation: "Con un punto en el tiempo: 'since 2018'." },
    { type: "multiple_choice", question: "This is the man ___ car was stolen.", options: ["who", "which", "whose"], correctIndex: 2, explanation: "Posesión: 'whose car'." },
    { type: "word_order", words: ["I", "have", "just", "finished", "my", "work"], correctOrder: ["I", "have", "just", "finished", "my", "work"], hint: "Present perfect con 'just'." },
    { type: "find_error", question: "Encuentra el error.",
      segments: ["If it ", { u: "rains" }, " tomorrow, we ", { u: "cancelled" }, " the ", { u: "trip" }, " to the ", { u: "coast" }, "."],
      correctIndex: 1, correction: "will cancel (primer condicional)", explanation: "Primer condicional: If + presente, ... will + verbo." },
    { type: "multiple_choice", question: "I've lived here ___ five years.", options: ["since", "for", "during"], correctIndex: 1, explanation: "Con una duración: 'for five years'." },
    { type: "true_false", statement: "\"I have been to Japan\" means you are in Japan now.", answer: false, explanation: "Es una experiencia pasada, no significa estar allí ahora." },
    { type: "translate", prompt: "Traduce: \"Nunca he comido sushi.\"", answers: ["i have never eaten sushi", "i've never eaten sushi"], explanation: "I have never eaten sushi." },
    { type: "multiple_choice", question: "The book ___ I read was excellent.", options: ["who", "which", "whose"], correctIndex: 1, explanation: "Para cosas: 'which' (o 'that')." },
    { type: "fill_blank", sentence: "If you heat ice, it ___ (melt).", answers: ["melts"], hint: "Condicional cero: presente.", explanation: "Verdad general: 'it melts'." },
    { type: "word_order", words: ["She", "said", "she", "was", "tired"], correctOrder: ["She", "said", "she", "was", "tired"], hint: "Estilo indirecto." }
  ] },

  /* ============================ B2 ============================ */
  B2: { exercises: [
    { type: "find_error", question: "Encuentra el error.",
      segments: ["Not only ", { u: "she sings" }, " beautifully, ", { u: "but" }, " she ", { u: "also" }, " ", { u: "dances" }, "."],
      correctIndex: 0, correction: "does she sing (inversión tras 'Not only')", explanation: "'Not only' al inicio exige inversión: 'Not only does she sing...'." },
    { type: "multiple_choice", question: "By the time we arrived, the film ___.", options: ["already started", "had already started", "has already started"], correctIndex: 1, explanation: "Pasado anterior: 'had already started'." },
    { type: "find_error", question: "Encuentra el error.",
      segments: ["The manager, ", { u: "along with" }, " his assistants, ", { u: "are" }, " ", { u: "attending" }, " the ", { u: "conference" }, "."],
      correctIndex: 1, correction: "is (el sujeto es 'the manager')", explanation: "'along with...' no cambia el número: el verbo concuerda con 'the manager' (singular)." },
    { type: "multiple_choice", question: "I'd rather you ___ smoke in here.", options: ["don't", "didn't", "not"], correctIndex: 1, explanation: "'I'd rather you didn't...' (pasado con valor de presente)." },
    { type: "word_order", words: ["Had", "I", "known", "I", "would", "have", "helped"], correctOrder: ["Had", "I", "known", "I", "would", "have", "helped"], hint: "Condicional 3 con inversión (sin 'if')." },
    { type: "find_error", question: "Encuentra el error.",
      segments: ["Despite ", { u: "of" }, " the ", { u: "rain" }, ", they ", { u: "continued" }, " the ", { u: "match" }, "."],
      correctIndex: 0, correction: "Despite (sin 'of')", explanation: "Se dice 'Despite the rain' o 'In spite of the rain', pero no 'Despite of'." },
    { type: "fill_blank", sentence: "It's high time we ___ (leave).", answers: ["left"], hint: "It's high time + pasado.", explanation: "'It's high time we left.'" },
    { type: "multiple_choice", question: "Choose the most formal option:", options: ["Gimme a hand, will ya?", "Could you possibly give me a hand?", "Help me now."], correctIndex: 1, explanation: "'Could you possibly...?' es lo más formal y cortés." },
    { type: "translate", prompt: "Traduce: \"Apenas había llegado cuando empezó a llover.\"", answers: ["i had hardly arrived when it started to rain", "hardly had i arrived when it started to rain", "i had hardly arrived when it began to rain"], explanation: "I had hardly arrived when it started to rain." },
    { type: "multiple_choice", question: "A \"downturn\" in the economy refers to a ___.", options: ["recovery", "decline", "boom"], correctIndex: 1, explanation: "'downturn' = caída/declive." },
    { type: "multiple_choice", question: "Complete with inversion: \"___ such a strange thing.\"", options: ["Never I have seen", "Never have I seen", "Never seen I have"], correctIndex: 1, explanation: "Inversión tras 'Never': 'Never have I seen...'." }
  ] },

  /* ===================== C1 · TOEFL (corto) ===================== */
  C1: { toefl: true, exercises: [
    { type: "reading", title: "The Bilingual Brain",
      passage: "Research increasingly suggests that speaking more than one language reshapes the brain. Bilingual individuals must constantly select the appropriate language while suppressing the other, a mental workout that appears to strengthen the brain's executive control system. Some studies even indicate that lifelong bilingualism can delay the onset of dementia symptoms by several years. The effect, however, is subtle and easily overstated; bilingualism is no guarantee of sharper thinking, and methodological debates continue.",
      questions: [
        { q: "What is the main idea of the passage?", options: ["Bilingualism may strengthen mental control and delay dementia, though the effect is modest", "Everyone should learn five languages", "Bilingual people never develop dementia"], correctIndex: 0, explanation: "Beneficio real pero moderado y discutido." },
        { q: "What mental task do bilinguals constantly perform?", options: ["translating word by word", "selecting one language while suppressing the other", "speaking very slowly"], correctIndex: 1, explanation: "\"...select the appropriate language while suppressing the other...\"" },
        { q: "The word \"overstated\" is closest in meaning to...", options: ["exaggerated", "ignored", "measured"], correctIndex: 0, explanation: "'overstated' = exagerado." },
        { q: "The author's attitude is best described as...", options: ["certain that bilingualism prevents dementia", "cautiously positive but aware of the limitations", "dismissive of all the research"], correctIndex: 1, explanation: "Reconoce el beneficio pero advierte que es sutil y debatido." }
      ] },
    { type: "reading", title: "Little and Often",
      passage: "A counter-intuitive finding from learning science is that we remember more when we space our study sessions out over time rather than cramming them together. Although cramming can produce a brief feeling of mastery, the knowledge fades quickly. Spaced repetition, by forcing the brain to retrieve information just as it begins to forget, builds far more durable memories. The lesson for students is clear, if unwelcome: little and often beats long and late.",
      questions: [
        { q: "What is the main idea?", options: ["Cramming is the most effective way to study", "Spacing study over time produces more durable memory", "Students should never review material"], correctIndex: 1, explanation: "La repetición espaciada crea memorias más duraderas." },
        { q: "Why is spaced repetition effective?", options: ["it makes each session longer", "it forces retrieval just as forgetting begins", "it removes all effort"], correctIndex: 1, explanation: "\"...forcing the brain to retrieve information just as it begins to forget...\"" },
        { q: "The word \"durable\" is closest in meaning to...", options: ["long-lasting", "fragile", "expensive"], correctIndex: 0, explanation: "'durable' = duradero." }
      ] },
    { type: "listening",
      text: "In today's seminar, we'll examine why eyewitness testimony, once treated as the gold standard of evidence, is now viewed with caution. Memory, it turns out, is not a recording but a reconstruction, and it can be subtly altered by the way a question is phrased.",
      question: "What is the speaker's main point?", options: ["eyewitness testimony is perfectly reliable", "memory is reconstructive and can be distorted", "cameras should replace all witnesses"], correctIndex: 1, explanation: "La memoria se reconstruye y puede alterarse." },
    { type: "listening",
      text: "Let's turn to urban planning. A well-known idea, the fifteen-minute city, proposes that residents should be able to reach work, shops and services within a short walk or cycle. Proponents say it cuts emissions and builds community; critics worry it could deepen inequality if poorer districts lack good amenities.",
      question: "What is one criticism of the fifteen-minute city?", options: ["it increases car use", "it could worsen inequality", "it is impossible to design"], correctIndex: 1, explanation: "\"...could deepen inequality if poorer districts lack good amenities.\"" },
    { type: "find_error", question: "Encuentra el error.",
      segments: ["Seldom ", { u: "we have" }, " encountered ", { u: "such" }, " a ", { u: "persuasive" }, " ", { u: "argument" }, "."],
      correctIndex: 0, correction: "have we (inversión tras 'Seldom')", explanation: "Tras un adverbio negativo inicial se invierte: 'Seldom have we encountered...'." },
    { type: "multiple_choice", question: "A \"meticulous\" researcher is one who is ___.", options: ["careless", "extremely careful and precise", "lazy"], correctIndex: 1, explanation: "'meticulous' = meticuloso." },
    { type: "multiple_choice", question: "Which best paraphrases \"the findings are inconclusive\"?", options: ["the findings clearly prove the theory", "the findings do not give a clear answer", "the findings were never published"], correctIndex: 1, explanation: "'inconclusive' = no concluyente." },
    { type: "word_order", words: ["Only", "later", "did", "they", "realize", "the", "truth"], correctOrder: ["Only", "later", "did", "they", "realize", "the", "truth"], hint: "Inversión tras 'Only later'." },
    { type: "fill_blank", sentence: "The results, ___ surprising, were consistent with the theory. (aunque)", answers: ["though", "although", "while"], hint: "Conector de concesión.", explanation: "though/although/while introducen la concesión." },
    { type: "multiple_choice", question: "\"To substantiate a claim\" means to ___ it.", options: ["weaken", "support with evidence", "merely repeat"], correctIndex: 1, explanation: "'substantiate' = respaldar con pruebas." }
  ] },

  /* ===================== C2 · TOEFL (corto) ===================== */
  C2: { toefl: true, exercises: [
    { type: "reading", title: "The Myth of Pure Objectivity",
      passage: "It is tempting to imagine science as a wholly objective enterprise, a mirror held up to nature. Yet the questions scientists choose to ask, the methods they deem legitimate, and the theories they find plausible are all shaped by the assumptions of their era. This does not mean that scientific knowledge is merely opinion; experiments still constrain what can credibly be claimed. Rather, it suggests that objectivity is best understood not as the absence of perspective, but as a disciplined, collective effort to correct for it.",
      questions: [
        { q: "What is the author's central claim?", options: ["Science is merely opinion", "Science is perfectly objective and free of assumptions", "Objectivity is a collective effort to correct for perspective, not the absence of it"], correctIndex: 2, explanation: "Define la objetividad como corrección colectiva del sesgo, no su ausencia." },
        { q: "The word \"plausible\" is closest in meaning to...", options: ["believable", "false", "complicated"], correctIndex: 0, explanation: "'plausible' = verosímil/creíble." },
        { q: "Why does the author mention \"a mirror held up to nature\"?", options: ["to define a scientific instrument", "to describe a naive view of science that he then qualifies", "to praise photography"], correctIndex: 1, explanation: "Introduce la visión ingenua que luego matiza (función retórica)." },
        { q: "The author would most likely agree that...", options: ["scientific assumptions are influenced by their era", "experiments are irrelevant to knowledge", "science can make no reliable claims at all"], correctIndex: 0, explanation: "Sostiene que las suposiciones dependen de la época, pero los experimentos siguen restringiendo." }
      ] },
    { type: "reading", title: "Language and Thought",
      passage: "Does the language we speak shape the way we think? The strong version of this claim, that language imprisons thought, has largely been discredited. Yet a weaker version endures: subtle features of a language, such as how it marks time or gender, can nudge habitual attention in measurable ways. The influence is real but modest, a gentle bias rather than a cage.",
      questions: [
        { q: "What is the main idea of the passage?", options: ["Language completely determines thought", "Language has a modest, not absolute, influence on thought", "Language has no effect on thought whatsoever"], correctIndex: 1, explanation: "Influencia real pero moderada ('a gentle bias rather than a cage')." },
        { q: "The word \"endures\" is closest in meaning to...", options: ["persists", "disappears", "weakens"], correctIndex: 0, explanation: "'endures' = perdura." },
        { q: "The \"cage\" metaphor is used to reject the idea that...", options: ["language gently biases attention", "language completely traps thought", "languages differ from one another"], correctIndex: 1, explanation: "Rechaza la versión fuerte: que el idioma 'aprisiona' el pensamiento." }
      ] },
    { type: "listening",
      text: "Consider a paradox of choice. Standard economics assumes that more options always make us better off. But experiments reveal that when faced with too many alternatives, people often feel paralysed, postpone deciding, and report less satisfaction with whatever they finally choose.",
      question: "What does the speaker suggest about having many options?", options: ["it always increases satisfaction", "it can lead to paralysis and less satisfaction", "it has no measurable effect"], correctIndex: 1, explanation: "Demasiadas opciones pueden paralizar y reducir la satisfacción." },
    { type: "listening",
      text: "Consider the tragedy of the commons. When a resource is shared and freely accessible, each individual has an incentive to take as much as possible, even though the collective result is the resource's depletion. The puzzle is not human greed but the structure of incentives, which is why solutions usually involve changing the rules rather than merely appealing to conscience.",
      question: "According to the speaker, what mainly causes the tragedy of the commons?", options: ["individual greed alone", "the structure of incentives around shared resources", "a simple lack of resources"], correctIndex: 1, explanation: "El problema es la estructura de incentivos, no solo la codicia." },
    { type: "find_error", question: "Encuentra el error.",
      segments: ["The more closely ", { u: "one examines" }, " the data, ", { u: "the more" }, " ", { u: "apparent" }, " the flaws ", { u: "becomes" }, "."],
      correctIndex: 3, correction: "become ('the flaws' es plural)", explanation: "El sujeto 'the flaws' es plural: el verbo es 'become'." },
    { type: "multiple_choice", question: "Which best paraphrases \"the argument is compelling but not conclusive\"?", options: ["it is weak and clearly false", "it is persuasive yet does not settle the matter", "it has been completely disproven"], correctIndex: 1, explanation: "Convincente pero no definitivo." },
    { type: "multiple_choice", question: "The word \"ubiquitous\" means...", options: ["found everywhere", "extremely rare", "poorly made"], correctIndex: 0, explanation: "'ubiquitous' = omnipresente." },
    { type: "word_order", words: ["Not", "until", "much", "later", "did", "the", "truth", "emerge"], correctOrder: ["Not", "until", "much", "later", "did", "the", "truth", "emerge"], hint: "Inversión tras 'Not until...'." },
    { type: "fill_blank", sentence: "___ the evidence is compelling, it remains contested. (concesión formal)", answers: ["Although", "While", "Though"], hint: "Conector de concesión.", explanation: "Although/While/Though introducen la concesión." },
    { type: "multiple_choice", question: "\"To reconcile two opposing views\" means to ___ them.", options: ["make them compatible", "reject both of them", "ignore them completely"], correctIndex: 0, explanation: "'reconcile' = conciliar/hacer compatibles." }
  ] }

};
