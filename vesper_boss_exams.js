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
    { type: "multiple_choice", question: "\"What time is it?\" \"It's seven ___.\"", options: ["hour", "time", "o'clock"], correctIndex: 2, explanation: "\"seven o'clock\"." },
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
    { type: "multiple_choice", question: "How ___ sugar do you want?", options: ["much", "few", "many"], correctIndex: 0, explanation: "'sugar' es incontable: 'much'." },
    { type: "true_false", statement: "The comparative of \"good\" is \"gooder\".", answer: false, explanation: "Es irregular: 'better'." },
    { type: "fill_blank", sentence: "She ___ (be) at home last night.", answers: ["was"], hint: "she + pasado de 'be'.", explanation: "Con 'she': 'was'." },
    { type: "translate", prompt: "Traduce: \"Fui al cine ayer.\"", answers: ["i went to the cinema yesterday", "i went to the movies yesterday"], explanation: "I went to the cinema yesterday." },
    { type: "word_order", words: ["They", "were", "playing", "football"], correctOrder: ["They", "were", "playing", "football"], hint: "Pasado continuo: were + -ing." }
  ] },

  /* ============================ B1 ============================ */
  B1: { exercises: [
    { type: "find_error", question: "Find the mistake.",
      segments: ["I ", { u: "have saw" }, " that film ", { u: "twice" }, " ", { u: "this" }, " ", { u: "year" }, "."],
      correctIndex: 0, correction: "have seen (past participle of 'see')", explanation: "Present perfect: have + past participle = 'have seen'." },
    { type: "multiple_choice", question: "If I ___ rich, I would travel the world.", options: ["am", "was", "were"], correctIndex: 2, explanation: "Second conditional: 'If I were rich...'." },
    { type: "fill_blank", sentence: "She has worked here ___ 2018.", answers: ["since"], hint: "A specific point in time.", explanation: "With a point in time: 'since 2018'." },
    { type: "multiple_choice", question: "This is the man ___ car was stolen.", options: ["whose", "who", "which"], correctIndex: 0, explanation: "Possession: 'whose car'." },
    { type: "word_order", words: ["I", "have", "just", "finished", "my", "work"], correctOrder: ["I", "have", "just", "finished", "my", "work"], hint: "Present perfect with 'just'." },
    { type: "find_error", question: "Find the mistake.",
      segments: ["If it ", { u: "rains" }, " tomorrow, we ", { u: "cancelled" }, " the ", { u: "trip" }, " to the ", { u: "coast" }, "."],
      correctIndex: 1, correction: "will cancel (first conditional)", explanation: "First conditional: If + present simple, ... will + verb." },
    { type: "multiple_choice", question: "I've lived here ___ five years.", options: ["since", "for", "during"], correctIndex: 1, explanation: "With a duration: 'for five years'." },
    { type: "true_false", statement: "\"I have been to Japan\" means you are in Japan now.", answer: false, explanation: "It's a past experience; it doesn't mean you are there now." },
    { type: "translate", prompt: "Write a present perfect sentence with 'never': I have no experience of eating sushi in my life.", answers: ["i have never eaten sushi","i've never eaten sushi","i have never tried sushi","i've never tried sushi"], explanation: "I have never eaten sushi." },
    { type: "multiple_choice", question: "The book ___ I read was excellent.", options: ["who", "which", "whose"], correctIndex: 1, explanation: "For things: 'which' (or 'that')." },
    { type: "fill_blank", sentence: "If you heat ice, it ___ (melt).", answers: ["melts"], hint: "Zero conditional: present simple.", explanation: "A general truth: 'it melts'." },
    { type: "word_order", words: ["She", "said", "she", "was", "tired"], correctOrder: ["She", "said", "she", "was", "tired"], hint: "Reported speech." }
  ] },

  /* ============================ B2 ============================ */
  B2: { exercises: [
    { type: "find_error", question: "Find the mistake.",
      segments: ["Not only ", { u: "she sings" }, " beautifully, ", { u: "but" }, " she ", { u: "also" }, " ", { u: "dances" }, "."],
      correctIndex: 0, correction: "does she sing (inversion after 'Not only')", explanation: "'Not only' at the start requires inversion: 'Not only does she sing...'." },
    { type: "multiple_choice", question: "By the time we arrived, the film ___.", options: ["already started", "has already started", "had already started"], correctIndex: 2, explanation: "The earlier past: 'had already started'." },
    { type: "find_error", question: "Find the mistake.",
      segments: ["The manager, ", { u: "along with" }, " his assistants, ", { u: "are" }, " ", { u: "attending" }, " the ", { u: "conference" }, "."],
      correctIndex: 1, correction: "is (the subject is 'the manager')", explanation: "'along with...' doesn't change the number: the verb agrees with 'the manager' (singular)." },
    { type: "multiple_choice", question: "I'd rather you ___ smoke in here.", options: ["don't", "didn't", "not"], correctIndex: 1, explanation: "'I'd rather you didn't...' (past form with present meaning)." },
    { type: "word_order", words: ["Had", "I", "known", "I", "would", "have", "helped"], correctOrder: ["Had", "I", "known", "I", "would", "have", "helped"], hint: "Third conditional with inversion (no 'if')." },
    { type: "find_error", question: "Find the mistake.",
      segments: ["Despite ", { u: "of" }, " the ", { u: "rain" }, ", they ", { u: "continued" }, " the ", { u: "match" }, "."],
      correctIndex: 0, correction: "Despite (no 'of')", explanation: "We say 'Despite the rain' or 'In spite of the rain', but not 'Despite of'." },
    { type: "fill_blank", sentence: "It's high time we ___ (leave).", answers: ["left"], hint: "It's high time + past simple.", explanation: "'It's high time we left.'" },
    { type: "multiple_choice", question: "Choose the most formal option:", options: ["Could you possibly give me a hand?", "Gimme a hand, will ya?", "Help me now."], correctIndex: 0, explanation: "'Could you possibly...?' is the most formal and polite." },
    { type: "translate", prompt: "Rewrite with 'hardly … when': I arrived, and almost immediately it started to rain. (I had…)", answers: ["i had hardly arrived when it started to rain", "hardly had i arrived when it started to rain", "i had hardly arrived when it began to rain"], explanation: "I had hardly arrived when it started to rain." },
    { type: "multiple_choice", question: "A \"downturn\" in the economy refers to a ___.", options: ["recovery", "boom", "decline"], correctIndex: 2, explanation: "'downturn' = a fall or decline." },
    { type: "multiple_choice", question: "Complete with inversion: \"___ such a strange thing.\"", options: ["Never have I seen", "Never I have seen", "Never seen I have"], correctIndex: 0, explanation: "Inversion after 'Never': 'Never have I seen...'." }
  ] },

  /* ===================== C1 · TOEFL (corto) ===================== */
  C1: { toefl: true, exercises: [
    { type: "reading", title: "The Bilingual Brain",
      passage: "Research increasingly suggests that speaking more than one language reshapes the brain. Bilingual individuals must constantly select the appropriate language while suppressing the other, a mental workout that appears to strengthen the brain's executive control system. Some studies even indicate that lifelong bilingualism can delay the onset of dementia symptoms by several years. The effect, however, is subtle and easily overstated; bilingualism is no guarantee of sharper thinking, and methodological debates continue.",
      questions: [
        { q: "What is the main idea of the passage?", options: ["Bilingualism may strengthen mental control and delay dementia, though the effect is modest", "Everyone should learn five languages", "Bilingual people never develop dementia"], correctIndex: 0, explanation: "A real but moderate benefit, still debated." },
        { q: "What mental task do bilinguals constantly perform?", options: ["translating word by word", "selecting one language while suppressing the other", "speaking very slowly"], correctIndex: 1, explanation: "\"...select the appropriate language while suppressing the other...\"" },
        { q: "The word \"overstated\" is closest in meaning to...", options: ["measured", "ignored", "exaggerated"], correctIndex: 2, explanation: "'overstated' = exaggerated." },
        { q: "The author's attitude is best described as...", options: ["certain that bilingualism prevents dementia", "cautiously positive but aware of the limitations", "dismissive of all the research"], correctIndex: 1, explanation: "The writer recognises the benefit but warns that it is subtle and debated." }
      ] },
    { type: "reading", title: "Little and Often",
      passage: "A counter-intuitive finding from learning science is that we remember more when we space our study sessions out over time rather than cramming them together. Although cramming can produce a brief feeling of mastery, the knowledge fades quickly. Spaced repetition, by forcing the brain to retrieve information just as it begins to forget, builds far more durable memories. The lesson for students is clear, if unwelcome: little and often beats long and late.",
      questions: [
        { q: "What is the main idea?", options: ["Spacing study over time produces more durable memory", "Cramming is the most effective way to study", "Students should never review material"], correctIndex: 0, explanation: "Spaced repetition creates longer-lasting memories." },
        { q: "Why is spaced repetition effective?", options: ["it makes each session longer", "it removes all effort", "it forces retrieval just as forgetting begins"], correctIndex: 2, explanation: "\"...forcing the brain to retrieve information just as it begins to forget...\"" },
        { q: "The word \"durable\" is closest in meaning to...", options: ["long-lasting", "fragile", "expensive"], correctIndex: 0, explanation: "'durable' = long-lasting." }
      ] },
    { type: "listening",
      text: "In today's seminar, we'll examine why eyewitness testimony, once treated as the gold standard of evidence, is now viewed with caution. Memory, it turns out, is not a recording but a reconstruction, and it can be subtly altered by the way a question is phrased.", "audio": "assets/audio/app/c1_b5a939c4ff.mp3",
      question: "What is the speaker's main point?", options: ["eyewitness testimony is perfectly reliable", "memory is reconstructive and can be distorted", "cameras should replace all witnesses"], correctIndex: 1, explanation: "Memory is reconstructed and can be altered." },
    { type: "listening",
      text: "Let's turn to urban planning. A well-known idea, the fifteen-minute city, proposes that residents should be able to reach work, shops and services within a short walk or cycle. Proponents say it cuts emissions and builds community; critics worry it could deepen inequality if poorer districts lack good amenities.", "audio": "assets/audio/app/c1_4dc134c0ee.mp3",
      question: "What is one criticism of the fifteen-minute city?", options: ["it increases car use", "it is impossible to design", "it could worsen inequality"], correctIndex: 2, explanation: "\"...could deepen inequality if poorer districts lack good amenities.\"" },
    { type: "find_error", question: "Find the mistake.",
      segments: ["Seldom ", { u: "we have" }, " encountered ", { u: "such" }, " a ", { u: "persuasive" }, " ", { u: "argument" }, "."],
      correctIndex: 0, correction: "have we (inversion after 'Seldom')", explanation: "After an initial negative adverb we invert: 'Seldom have we encountered...'." },
    { type: "multiple_choice", question: "A \"meticulous\" researcher is one who is ___.", options: ["careless and in a hurry to publish results", "extremely careful and precise", "lazy"], correctIndex: 1, explanation: "'meticulous' = extremely careful about details." },
    { type: "multiple_choice", question: "Which best paraphrases \"the findings are inconclusive\"?", options: ["the findings were never published", "the findings clearly prove the theory", "the findings do not give a clear answer"], correctIndex: 2, explanation: "'inconclusive' = not leading to a clear result." },
    { type: "word_order", words: ["Only", "later", "did", "they", "realize", "the", "truth"], correctOrder: ["Only", "later", "did", "they", "realize", "the", "truth"], hint: "Inversion after 'Only later'." },
    { type: "fill_blank", sentence: "The results, ___ surprising, were consistent with the theory. (concession)", answers: ["though", "although", "while"], hint: "A linker of concession.", explanation: "though / although / while introduce a concession." },
    { type: "multiple_choice", question: "\"To substantiate a claim\" means to ___ it.", options: ["support with evidence", "weaken", "merely repeat word for word without evidence"], correctIndex: 0, explanation: "'substantiate' = support with evidence." },
    { type: "multiple_choice", question: "A \"tentative\" conclusion is one that is ___.", options: ["provisional and uncertain", "final, proven and accepted by every expert", "completely false"], correctIndex: 0, explanation: "'tentative' = provisional, not definitive." },
    { type: "find_error", question: "Find the mistake.",
      segments: ["Not until the results were published ", { u: "the team" }, " ", { u: "could" }, " ", { u: "finally" }, " ", { u: "relax" }, "."],
      correctIndex: 0, correction: "could the team (inversion after 'Not until...')", explanation: "'Not until...' at the start requires inversion: 'Not until... could the team finally relax.'" },
    { type: "multiple_choice", question: "Choose the most academic verb: \"The study ___ a strong correlation.\"", options: ["dug up", "revealed", "spotted"], correctIndex: 1, explanation: "'revealed' is the right academic register." },
    { type: "fill_blank", sentence: "The hypothesis was ___ by the new data. (backed up)", answers: ["supported", "confirmed", "substantiated"], hint: "Back up with evidence.", explanation: "supported/confirmed by the data." },
    { type: "multiple_choice", question: "\"The two theories are not mutually exclusive\" means...", options: ["only one of them can ever be true at a time", "both must be false", "both can be true at the same time"], correctIndex: 2, explanation: "They are not exclusive: both can be true at the same time." },
    { type: "word_order", words: ["Rarely", "is", "such", "precision", "achieved"], correctOrder: ["Rarely", "is", "such", "precision", "achieved"], hint: "Inversion after 'Rarely'." }
  ] },

  /* ===================== C2 · TOEFL (corto) ===================== */
  C2: { toefl: true, exercises: [
    { type: "reading", title: "The Myth of Pure Objectivity",
      passage: "It is tempting to imagine science as a wholly objective enterprise, a mirror held up to nature. Yet the questions scientists choose to ask, the methods they deem legitimate, and the theories they find plausible are all shaped by the assumptions of their era. This does not mean that scientific knowledge is merely opinion; experiments still constrain what can credibly be claimed. Rather, it suggests that objectivity is best understood not as the absence of perspective, but as a disciplined, collective effort to correct for it.",
      questions: [
        { q: "What is the author's central claim?", options: ["Science is merely opinion", "Science is perfectly objective and free of assumptions", "Objectivity is a collective effort to correct for perspective, not the absence of it"], correctIndex: 2, explanation: "It defines objectivity as the collective correction of bias, not its absence." },
        { q: "The word \"plausible\" is closest in meaning to...", options: ["complicated", "believable", "false"], correctIndex: 1, explanation: "'plausible' = believable, likely to be true." },
        { q: "Why does the author mention \"a mirror held up to nature\"?", options: ["to describe a naive view of science that he then qualifies", "to praise photography", "to define a scientific instrument"], correctIndex: 0, explanation: "It introduces the naive view that the writer then qualifies (rhetorical function)." },
        { q: "The author would most likely agree that...", options: ["scientific assumptions are influenced by their era", "experiments are irrelevant to knowledge", "science can make no reliable claims at all"], correctIndex: 0, explanation: "The writer argues that assumptions depend on their era, but experiments still constrain them." }
      ] },
    { type: "reading", title: "Language and Thought",
      passage: "Does the language we speak shape the way we think? The strong version of this claim, that language imprisons thought, has largely been discredited. Yet a weaker version endures: subtle features of a language, such as how it marks time or gender, can nudge habitual attention in measurable ways. The influence is real but modest, a gentle bias rather than a cage.",
      questions: [
        { q: "What is the main idea of the passage?", options: ["Language completely determines thought", "Language has a modest, not absolute, influence on thought", "Language has no effect on thought whatsoever"], correctIndex: 1, explanation: "A real but moderate influence ('a gentle bias rather than a cage')." },
        { q: "The word \"endures\" is closest in meaning to...", options: ["weakens", "disappears", "persists"], correctIndex: 2, explanation: "'endures' = continues to exist." },
        { q: "The \"cage\" metaphor is used to reject the idea that...", options: ["language gently biases attention", "language completely traps thought", "languages differ from one another"], correctIndex: 1, explanation: "It rejects the strong version: that language 'imprisons' thought." }
      ] },
    { type: "listening",
      text: "Consider a paradox of choice. Standard economics assumes that more options always make us better off. But experiments reveal that when faced with too many alternatives, people often feel paralysed, postpone deciding, and report less satisfaction with whatever they finally choose.", "audio": "assets/audio/app/c2_adea27fa7e.mp3",
      question: "What does the speaker suggest about having many options?", options: ["it always increases satisfaction", "it has no measurable effect", "it can lead to paralysis and less satisfaction"], correctIndex: 2, explanation: "Too many options can paralyse us and reduce satisfaction." },
    { type: "listening",
      text: "Consider the tragedy of the commons. When a resource is shared and freely accessible, each individual has an incentive to take as much as possible, even though the collective result is the resource's depletion. The puzzle is not human greed but the structure of incentives, which is why solutions usually involve changing the rules rather than merely appealing to conscience.", "audio": "assets/audio/app/c2_7947ddb4ac.mp3",
      question: "According to the speaker, what mainly causes the tragedy of the commons?", options: ["the structure of incentives around shared resources", "a simple lack of resources", "individual greed alone"], correctIndex: 0, explanation: "The problem is the structure of incentives, not just greed." },
    { type: "find_error", question: "Find the mistake.",
      segments: ["The more closely ", { u: "one examines" }, " the data, ", { u: "the more" }, " ", { u: "apparent" }, " the flaws ", { u: "becomes" }, "."],
      correctIndex: 3, correction: "become ('the flaws' is plural)", explanation: "The subject 'the flaws' is plural: the verb is 'become'." },
    { type: "multiple_choice", question: "Which best paraphrases \"the argument is compelling but not conclusive\"?", options: ["it is weak and clearly false", "it is persuasive yet does not settle the matter", "it has been completely disproven"], correctIndex: 1, explanation: "Convincing but not definitive." },
    { type: "multiple_choice", question: "The word \"ubiquitous\" means...", options: ["found everywhere", "extremely rare and almost never seen", "poorly made"], correctIndex: 0, explanation: "'ubiquitous' = found everywhere." },
    { type: "word_order", words: ["Not", "until", "much", "later", "did", "the", "truth", "emerge"], correctOrder: ["Not", "until", "much", "later", "did", "the", "truth", "emerge"], hint: "Inversion after 'Not until...'." },
    { type: "fill_blank", sentence: "___ the evidence is compelling, it remains contested. (formal concession)", answers: ["Although", "While", "Though"], hint: "A linker of concession.", explanation: "Although / While / Though introduce a concession." },
    { type: "multiple_choice", question: "\"To reconcile two opposing views\" means to ___ them.", options: ["ignore them completely", "reject both of them", "make them compatible"], correctIndex: 2, explanation: "'reconcile' = make them compatible." },
    { type: "multiple_choice", question: "An \"intractable\" problem is one that is ___.", options: ["very hard to solve", "easily solved with a little effort", "imaginary"], correctIndex: 0, explanation: "'intractable' = very hard to solve." },
    { type: "find_error", question: "Find the mistake.",
      segments: ["So compelling ", { u: "the argument was" }, " that ", { u: "few" }, " ", { u: "dared" }, " ", { u: "to object" }, "."],
      correctIndex: 0, correction: "was the argument (inversion after 'So + adjective')", explanation: "When 'So + adjective' comes first we invert: 'So compelling was the argument that...'." },
    { type: "multiple_choice", question: "\"The findings, while suggestive, are far from definitive\" implies the findings...", options: ["settle the question for good", "hint at something but do not prove it", "are completely worthless"], correctIndex: 1, explanation: "They suggest something but don't prove it." },
    { type: "multiple_choice", question: "\"To corroborate a theory\" means to ___ it.", options: ["complicate", "contradict", "support with further evidence"], correctIndex: 2, explanation: "'corroborate' = confirm or support with evidence." },
    { type: "fill_blank", sentence: "___ compelling the data may seem, some scepticism is warranted. (concession + adjective)", answers: ["However", "No matter how"], hint: "Concession + adjective.", explanation: "'However compelling... may seem' = even though it seems very compelling." },
    { type: "word_order", words: ["Such", "was", "his", "influence", "that", "none", "objected"], correctOrder: ["Such", "was", "his", "influence", "that", "none", "objected"], hint: "Inversion after 'Such was...'." },
    { type: "multiple_choice", question: "A \"nuanced\" argument is one that is ___.", options: ["overly simple and one-sided in its reasoning", "subtle and carefully qualified", "clearly wrong"], correctIndex: 1, explanation: "'nuanced' = showing subtle differences." },
    { type: "multiple_choice", question: "\"This account, though plausible, remains speculative\" means it is ___.", options: ["a proven fact that nobody can dispute", "obviously false", "believable but unproven"], correctIndex: 2, explanation: "Believable but not proven." }
  ] }

};
