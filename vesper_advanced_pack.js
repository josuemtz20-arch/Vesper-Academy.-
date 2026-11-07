/* =====================================================================
 * VESPER · ADVANCED PACK  (estructuras y vocabulario C1 · C2)
 * ---------------------------------------------------------------------
 * 2026-11-06. El dueño: "en los niveles avanzados hay muy poco contenido
 * de C1 o C2: más estructuras, más vocabulario avanzado". Antes había 36
 * lecciones C1 y 21 C2 (frente a ~50 en A1-B1) y casi ninguna de
 * gramática C2. Este paquete suma 17 lecciones de 10 ejercicios:
 *
 *   C1  pasiva impersonal (It is said that / is said to) · pasado irreal
 *       (it's time, I'd rather, as if) · alternativas a "if" · gerundio e
 *       infinitivo perfecto/pasivo · futuro en el pasado · relativos
 *       avanzados · matiz modal · phrasal verbs de ideas · formación de
 *       palabras
 *   C2  condicionales invertidas · inversión y fronting enfático ·
 *       oraciones reducidas · comparación avanzada · conectores formales ·
 *       phrasal verbs con actitud · palabras que se confunden ·
 *       colocaciones adverbio + adjetivo
 *
 * Cada lección enseña con secciones (regla, ejemplos, errores típicos) y
 * practica con 10 ejercicios de tipos distintos, incluidas
 * transformaciones con palabra clave estilo Cambridge (translate). Todo en
 * inglés: desde B1 la lección entera va en inglés (EN_UI_LEVELS).
 *
 * Se fusiona en VESPER_LESSONS vía VESPER_ADVANCED_PACK.merge(); va al final
 * de cada escalera (nivel + destreza) de vesper_path.js. Las opciones de
 * opción múltiple las equilibra _scripts/rebalance_answers.py (preflight F).
 * ===================================================================== */
window.VESPER_ADVANCED_PACK = (function () {

  var L = {

    /* ============================ C1 ============================ */

    "adv-c1-impersonal-passive": {
      lessonId: "adv-c1-impersonal-passive", level: "C1", track: "Grammar", topic: "grammar", skill: "grammar",
      title: "Distancing: It is said that… / He is said to…", tipo: "aprende", xpReward: 70, mascotState: "explaining",
      explanation: {
        body: "News reports and academic writing often report beliefs without saying who holds them. Pattern 1: It + passive reporting verb + that-clause (It is said that he is rich). Pattern 2: subject + passive reporting verb + to-infinitive (He is said to be rich). For an earlier action use the perfect infinitive: He is believed to have left.",
        examples: [
          { en: "It is believed that the painting was stolen in 1990." },
          { en: "The painting is believed to have been stolen in 1990." },
          { en: "Prices are expected to rise next year." }
        ],
        sections: [
          { kind: "intro", body: "News reports and academic texts often report what people think without saying WHO thinks it. The impersonal passive gives you that distance: the information is presented as a widely held belief, not your own claim." },
          { kind: "regla", body: "Pattern 1 — It + is/was + reporting verb (past participle) + that-clause: It is said that the CEO will resign.\nPattern 2 — Subject + is/was + reporting verb + to-infinitive: The CEO is said to be resigning.\nTime: same time → to do / to be doing; earlier → to have done / to have been done.\nCommon verbs: say, believe, think, report, expect, know, consider, claim, allege, estimate." },
          { kind: "ejemplos", items: [
            { en: "It is believed that the painting was stolen in 1990.", es: "Pattern 1: It + passive + that-clause" },
            { en: "The painting is believed to have been stolen in 1990.", es: "Pattern 2: earlier event → to have been + participle" },
            { en: "She is said to be the best surgeon in the country.", es: "same time → to be" },
            { en: "Prices are expected to rise next year.", es: "future → to + base form" },
            { en: "It has been reported that two people were injured.", es: "present perfect passive of 'report'" }
          ] },
          { kind: "errores", items: [
            { no: "He is said to has left.", si: "He is said to have left.", pq: "After 'to' always use the base form: to have + participle." },
            { no: "It is said him to be rich.", si: "He is said to be rich. / It is said that he is rich.", pq: "Don't mix the two patterns." },
            { no: "They are thought to leave yesterday.", si: "They are thought to have left yesterday.", pq: "An earlier action needs the perfect infinitive." }
          ] },
          { kind: "resumen", body: "It is said that + clause  ·  Subject + is said + to do / to be doing / to have done." },
          { kind: "puente" }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "People say that the company is losing money. → The company ___ money.", options: ["is said to be losing", "is said to lose", "is being said that it loses", "says to be losing"], correctIndex: 0, explanation: "An action in progress now → continuous infinitive: is said to be losing." },
        { type: "multiple_choice", question: "People think the thieves escaped through the roof. → The thieves ___ through the roof.", options: ["are thought to escape", "are thought that they have escaped", "are thought to have escaped", "think to have escaped"], correctIndex: 2, explanation: "The escape happened before → perfect infinitive: to have escaped." },
        { type: "fill_blank", sentence: "The president is expected ___ a speech tomorrow.", answers: ["to give", "to make", "to deliver"], hint: "to + base form", explanation: "is expected to give a speech (a future event)." },
        { type: "fill_blank", sentence: "It ___ reported that the bridge will reopen in May.", answers: ["is", "has been", "was"], hint: "Passive of 'report' with 'It'.", explanation: "It is / has been reported that…" },
        { type: "find_error", question: "Find the mistake.",
          segments: ["The suspect ", { u: "is believed" }, " ", { u: "to have" }, " ", { u: "leave" }, " the country ", { u: "last week" }, "."],
          correctIndex: 2, correction: "left (to have + past participle)",
          explanation: "The perfect infinitive is to have + past participle: to have left." },
        { type: "word_order", words: ["It", "is", "widely", "thought", "that", "prices", "will", "fall"], correctOrder: ["It", "is", "widely", "thought", "that", "prices", "will", "fall"], hint: "It + is + adverb + participle + that…" },
        { type: "translate", prompt: "Rewrite using BELIEVED: \"People believe that he was born in Italy.\" → He …", answers: ["He is believed to have been born in Italy.", "is believed to have been born in Italy", "is believed to have been born"], explanation: "Earlier event + passive verb 'be born' → to have been born." },
        { type: "true_false", statement: "\"She is said to be living in Paris\" means people say that she lives in Paris now.", answer: true, explanation: "To be living = at the present time." },
        { type: "categorize", instruction: "When does the reported action happen?", buckets: [{ id: "now", label: "Now / in the future" }, { id: "before", label: "Before (perfect infinitive)" }],
          items: [{ t: "is said to be working", bucket: "now" }, { t: "is said to have worked", bucket: "before" }, { t: "is thought to know", bucket: "now" }, { t: "is thought to have known", bucket: "before" }, { t: "are reported to have died", bucket: "before" }, { t: "is expected to win", bucket: "now" }] },
        { type: "multiple_choice", question: "Which sentence is NOT correct?", options: ["It is known that smoking causes cancer.", "Smoking is known that it causes cancer.", "Smoking is known to cause cancer.", "It is a well-known fact that smoking causes cancer."], correctIndex: 1, explanation: "Pattern 2 needs a to-infinitive: Smoking is known to cause cancer." }
      ]
    },

    "adv-c1-unreal-past": {
      lessonId: "adv-c1-unreal-past", level: "C1", track: "Grammar", topic: "grammar", skill: "grammar",
      title: "Unreal past: it's time, I'd rather, as if", tipo: "aprende", xpReward: 70, mascotState: "explaining",
      explanation: {
        body: "After some expressions a past form talks about the present or future, because the situation is unreal or desired: It's time we left. I'd rather you didn't smoke. He talks as if he were the boss. Suppose you lost your job… For the past, use the past perfect: I'd rather you hadn't told her.",
        examples: [
          { en: "It's high time we went home." },
          { en: "I'd rather you didn't call me after ten." },
          { en: "She looked as if she had seen a ghost." }
        ],
        sections: [
          { kind: "intro", body: "Some expressions take a PAST form even when we talk about now or the future. The past here doesn't mean time: it signals that the situation is unreal, wished for, or not happening yet." },
          { kind: "regla", body: "It's (high / about) time + subject + past: It's time we left.\nwould rather + another subject + past: I'd rather you stayed.  (Same subject → base form: I'd rather stay.)\nas if / as though + past (unreal now): He acts as if he owned the place.\nSuppose / Supposing / What if + past: Suppose you lost your job?\nFor the past → past perfect: I'd rather you hadn't told her. She looked as if she had cried." },
          { kind: "ejemplos", items: [
            { en: "It's high time the government did something about housing.", es: "it hasn't done it yet" },
            { en: "I'd rather you didn't use my phone.", es: "different subject → past" },
            { en: "I'd rather stay at home tonight.", es: "same subject → base form" },
            { en: "He talks as if he were an expert.", es: "he isn't one: unreal" },
            { en: "What if we missed the last train?", es: "a hypothetical situation" }
          ] },
          { kind: "errores", items: [
            { no: "It's time we go.", si: "It's time we went.", pq: "After 'It's time + subject' use the past." },
            { no: "I'd rather you don't call me.", si: "I'd rather you didn't call me.", pq: "Different subject → past form." },
            { no: "I'd rather to stay.", si: "I'd rather stay.", pq: "No 'to' after would rather." }
          ] },
          { kind: "resumen", body: "Unreal now → past. Unreal past → past perfect. Same subject after 'would rather' → base form." },
          { kind: "puente" }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "It's high time the government ___ something about housing.", options: ["will be doing", "has done", "does", "did"], correctIndex: 3, explanation: "It's (high) time + subject + past simple." },
        { type: "multiple_choice", question: "I'd rather you ___ my phone without asking.", options: ["don't use", "haven't been using", "didn't use", "not use"], correctIndex: 2, explanation: "would rather + different subject + past: I'd rather you didn't use…" },
        { type: "fill_blank", sentence: "He spends money as if he ___ a millionaire.", answers: ["were", "was"], hint: "Unreal past of 'be'.", explanation: "as if + past (unreal): as if he were / was a millionaire." },
        { type: "fill_blank", sentence: "I'd rather ___ (stay) at home tonight, if you don't mind.", answers: ["stay"], hint: "Same subject (I … I).", explanation: "Same subject → base form without 'to': I'd rather stay." },
        { type: "find_error", question: "Find the mistake.",
          segments: ["It's ", { u: "about time" }, " you ", { u: "start" }, " ", { u: "looking" }, " for ", { u: "a job" }, "."],
          correctIndex: 1, correction: "started",
          explanation: "It's about time + subject + past: It's about time you started looking." },
        { type: "word_order", words: ["I'd", "rather", "you", "didn't", "tell", "anyone"], correctOrder: ["I'd", "rather", "you", "didn't", "tell", "anyone"], hint: "would rather + subject + past" },
        { type: "translate", prompt: "Rewrite: \"Please don't tell her.\" → I'd rather you …", answers: ["I'd rather you didn't tell her.", "I would rather you didn't tell her.", "I'd rather you did not tell her.", "I would rather you did not tell her.", "you didn't tell her", "you did not tell her"], explanation: "I'd rather you didn't tell her." },
        { type: "true_false", statement: "\"Suppose you won the lottery…\" talks about a real, likely situation.", answer: false, explanation: "The past form makes it hypothetical, not likely." },
        { type: "multiple_choice", question: "She looked as if she ___ all night. (She probably hadn't.)", options: ["hasn't slept", "hadn't slept", "didn't sleep", "wouldn't have been sleeping"], correctIndex: 1, explanation: "Unreal about an earlier time → past perfect: as if she hadn't slept." },
        { type: "categorize", instruction: "Past form (went) or base form (go)?", buckets: [{ id: "past", label: "Past form: went" }, { id: "base", label: "Base form: go" }],
          items: [{ t: "I'd rather you ___", bucket: "past" }, { t: "I'd rather ___", bucket: "base" }, { t: "It's time we ___", bucket: "past" }, { t: "We'd better ___", bucket: "base" }, { t: "Suppose he ___", bucket: "past" }, { t: "Would you rather ___?", bucket: "base" }] }
      ]
    },

    "adv-c1-if-alternatives": {
      lessonId: "adv-c1-if-alternatives", level: "C1", track: "Grammar", topic: "grammar", skill: "grammar",
      title: "Beyond \"if\": unless, provided, in case, but for", tipo: "aprende", xpReward: 70, mascotState: "explaining",
      explanation: {
        body: "Precise speakers choose the conditional word that matches their meaning: unless (= if not), provided / as long as / on condition that (= only if), in case (= as a precaution), otherwise (= if not, referring back), but for + noun (= if it hadn't been for).",
        examples: [
          { en: "You can borrow my car provided you bring it back by six." },
          { en: "Take a jacket in case it gets cold." },
          { en: "But for your help, we would have failed." }
        ],
        sections: [
          { kind: "intro", body: "\"If\" is not the only way to build a condition. C1 speakers choose the word that says exactly what they mean: a warning, a strict condition, or a precaution." },
          { kind: "regla", body: "unless = if… not: Unless you hurry, you'll miss it.\nprovided (that) / providing / as long as / on condition that = only if: You can go as long as you're back by ten.\nin case = as a precaution (≠ if): Take an umbrella in case it rains.\notherwise / or (else) = if not, referring to the previous sentence: Hurry up, otherwise we'll be late.\nbut for + noun = if it hadn't been for: But for the rain, we'd have won.\nAfter these words use a present tense for the future: provided you pay (not 'will pay')." },
          { kind: "ejemplos", items: [
            { en: "We'll miss the train unless we leave now.", es: "= if we don't leave now" },
            { en: "As long as you're honest, I'll help you.", es: "= only if you're honest" },
            { en: "I'll write it down in case I forget.", es: "a precaution" },
            { en: "Call me if you need anything; otherwise, I'll see you on Monday.", es: "= if you don't call" },
            { en: "But for the bad weather, the match would have gone ahead.", es: "= if it hadn't been for" }
          ] },
          { kind: "errores", items: [
            { no: "Unless you don't hurry, you'll miss it.", si: "Unless you hurry, you'll miss it.", pq: "'Unless' already contains 'not'." },
            { no: "Provided that you will pay, we'll start.", si: "Provided that you pay, we'll start.", pq: "Present tense after condition words." },
            { no: "Take an umbrella if it rains. (meaning: just in case)", si: "Take an umbrella in case it rains.", pq: "'In case' = before it happens, as a precaution." }
          ] },
          { kind: "resumen", body: "unless = if not · provided / as long as = only if · in case = as a precaution · but for + noun = if it weren't / hadn't been for." },
          { kind: "puente" }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "You can borrow my car ___ you bring it back by six.", options: ["provided", "unless", "in case", "otherwise"], correctIndex: 0, explanation: "provided = only if (a strict condition)." },
        { type: "multiple_choice", question: "Take a jacket ___ it gets cold later.", options: ["as long as", "provided", "unless", "in case"], correctIndex: 3, explanation: "in case = as a precaution." },
        { type: "fill_blank", sentence: "We'll miss the train ___ we leave right now.", answers: ["unless"], hint: "= if we don't", explanation: "unless = if… not." },
        { type: "fill_blank", sentence: "Hurry up, ___ we'll be late.", answers: ["otherwise", "or", "or else"], hint: "= if you don't", explanation: "otherwise / or (else) refers back to the first sentence." },
        { type: "find_error", question: "Find the mistake.",
          segments: ["You ", { u: "won't" }, " pass the exam ", { u: "unless" }, " you ", { u: "don't" }, " ", { u: "study" }, " harder."],
          correctIndex: 2, correction: "unless you study (remove 'don't')",
          explanation: "'Unless' already means 'if not', so the verb after it is positive." },
        { type: "word_order", words: ["But", "for", "your", "help", "we", "would", "have", "failed"], correctOrder: ["But", "for", "your", "help", "we", "would", "have", "failed"], hint: "But for + noun, would have + participle" },
        { type: "translate", prompt: "Rewrite with UNLESS: \"If you don't apologise, she won't speak to you.\"", answers: ["Unless you apologise, she won't speak to you.", "Unless you apologize, she won't speak to you.", "Unless you apologise, she will not speak to you.", "Unless you apologize, she will not speak to you.", "She won't speak to you unless you apologise.", "She won't speak to you unless you apologize.", "She will not speak to you unless you apologise.", "She will not speak to you unless you apologize."], explanation: "Unless you apologise, she won't speak to you." },
        { type: "true_false", statement: "\"As long as\" and \"provided that\" can both mean \"only if\".", answer: true, explanation: "Both introduce a strict condition." },
        { type: "multiple_choice", question: "___ the bad weather, the match would have gone ahead.", options: ["Unless", "Otherwise than", "But for", "Provided"], correctIndex: 2, explanation: "But for + noun = if it hadn't been for." },
        { type: "categorize", instruction: "What does each one mean?", buckets: [{ id: "only", label: "only if" }, { id: "not", label: "if not" }],
          items: [{ t: "provided that", bucket: "only" }, { t: "as long as", bucket: "only" }, { t: "on condition that", bucket: "only" }, { t: "unless", bucket: "not" }, { t: "otherwise", bucket: "not" }, { t: "or else", bucket: "not" }] }
      ]
    },

    "adv-c1-gerund-infinitive": {
      lessonId: "adv-c1-gerund-infinitive", level: "C1", track: "Grammar", topic: "grammar", skill: "grammar",
      title: "Gerunds and infinitives: perfect, passive and meaning changes", tipo: "aprende", xpReward: 70, mascotState: "explaining",
      explanation: {
        body: "Use the perfect form for an earlier action (He denied having taken it; She seems to have forgotten) and the passive when the subject receives the action (I hate being interrupted). Some verbs change meaning: remember / forget / stop / try / regret / go on + -ing or + to.",
        examples: [
          { en: "He denied having taken the money." },
          { en: "Nobody likes being criticised in public." },
          { en: "We stopped to buy some bread." }
        ],
        sections: [
          { kind: "intro", body: "At C1 the question is not just -ing or to: it is also WHEN the action happened and WHO does it. And a few verbs change their meaning completely depending on the form." },
          { kind: "regla", body: "Earlier action → perfect: having done / to have done (He admitted having lied. She seems to have left.)\nPassive → being done / to be done (I hate being interrupted. He wants to be promoted.)\nMeaning changes:\n• remember / forget doing = a memory · remember / forget to do = a task\n• stop doing = quit · stop to do = pause in order to do\n• try doing = experiment · try to do = make an effort\n• regret doing = feel sorry about the past · regret to tell / inform = formal bad news\n• go on doing = continue · go on to do = the next step" },
          { kind: "ejemplos", items: [
            { en: "I'll never forget seeing the ocean for the first time.", es: "a memory" },
            { en: "Don't forget to lock the door.", es: "a task" },
            { en: "She seems to have forgotten our meeting.", es: "earlier action → perfect infinitive" },
            { en: "He hates being told what to do.", es: "passive gerund" },
            { en: "After university, she went on to start her own company.", es: "the next step" }
          ] },
          { kind: "errores", items: [
            { no: "She seems to forget our meeting yesterday.", si: "She seems to have forgotten our meeting yesterday.", pq: "A past action needs the perfect infinitive." },
            { no: "I don't like to be interrupting.", si: "I don't like being interrupted.", pq: "The subject receives the action → passive." },
            { no: "We stopped buying bread on the way. (meaning: to buy it)", si: "We stopped to buy bread on the way.", pq: "stop to do = stop in order to do it." }
          ] },
          { kind: "resumen", body: "Perfect = earlier · passive = done to the subject · remember/forget/stop/try/regret/go on change meaning." },
          { kind: "puente" }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "I'll never forget ___ the Pacific for the first time.", options: ["to see", "seeing", "to have been seen", "see"], correctIndex: 1, explanation: "forget + -ing = a memory of something that happened." },
        { type: "multiple_choice", question: "On the way home, we stopped ___ some bread.", options: ["for buying it", "buy", "buying", "to buy"], correctIndex: 3, explanation: "stop + to = stop in order to do something." },
        { type: "fill_blank", sentence: "He denied ___ (take) the money.", answers: ["taking", "having taken"], hint: "deny + -ing", explanation: "deny + gerund; 'having taken' stresses that it was earlier." },
        { type: "fill_blank", sentence: "Nobody likes ___ (criticise) in public.", answers: ["being criticised", "being criticized"], hint: "Passive gerund: being + participle.", explanation: "The subject receives the action → being criticised." },
        { type: "find_error", question: "Find the mistake.",
          segments: ["She ", { u: "seems" }, " ", { u: "to forget" }, " our meeting ", { u: "yesterday" }, " — she ", { u: "didn't come" }, "."],
          correctIndex: 1, correction: "to have forgotten",
          explanation: "A past action after 'seem' needs the perfect infinitive: seems to have forgotten." },
        { type: "word_order", words: ["We", "regret", "to", "inform", "you", "that", "the", "flight", "is", "cancelled"], correctOrder: ["We", "regret", "to", "inform", "you", "that", "the", "flight", "is", "cancelled"], hint: "regret to inform = formal bad news" },
        { type: "translate", prompt: "Rewrite using REGRET: \"I'm sorry that I shouted at you.\"", answers: ["I regret shouting at you.", "I regret having shouted at you.", "regret shouting at you", "regret having shouted at you"], explanation: "regret + -ing (or having + participle) = sorry about the past." },
        { type: "true_false", statement: "\"I tried taking an aspirin\" means I took one as an experiment, to see if it helped.", answer: true, explanation: "try + -ing = experiment; try + to = make an effort." },
        { type: "multiple_choice", question: "After university, she went on ___ her own company.", options: ["starting", "start", "to start", "to have been starting"], correctIndex: 2, explanation: "go on + to = the next step in a sequence." },
        { type: "matching", instruction: "Match each form with its meaning.", pairs: [
          { l: "remember to lock", r: "don't forget the task" }, { l: "remember locking", r: "have a memory of it" },
          { l: "stop to talk", r: "pause in order to talk" }, { l: "stop talking", r: "be quiet; quit" }
        ], explanation: "The form changes the meaning." }
      ]
    },

    "adv-c1-future-in-past": {
      lessonId: "adv-c1-future-in-past", level: "C1", track: "Grammar", topic: "grammar", skill: "grammar",
      title: "Future in the past and advanced futures", tipo: "aprende", xpReward: 70, mascotState: "explaining",
      explanation: {
        body: "To talk about the future seen from the past: was going to (a plan that changed), was about to (very soon), was to (arranged or destined), would (reported future). Advanced futures: will have done (completed by then), will have been doing (duration up to then), be bound / set / due to.",
        examples: [
          { en: "I was going to call you, but my phone died." },
          { en: "We were about to leave when the phone rang." },
          { en: "By June, she will have been working here for ten years." }
        ],
        sections: [
          { kind: "intro", body: "Stories and reports often look at the future FROM the past: a plan that never happened, something that was just about to happen, a destiny. C1 English has a precise form for each." },
          { kind: "regla", body: "was / were going to = a plan (often one that didn't happen)\nwas / were about to = very near in time\nwas / were to (have done) = arranged or destined: Little did I know I was to meet her again.\nwould = the future seen from the past: She said she would help.\nwill have done = completed before a future time\nwill have been doing = duration up to a future time\nbe bound to = certain · be set to = planned / expected · be due to = scheduled" },
          { kind: "ejemplos", items: [
            { en: "I was going to call you, but my phone died.", es: "a plan that changed" },
            { en: "We were about to leave when the phone rang.", es: "very near in time" },
            { en: "By the time we arrive, the film will have started.", es: "completed before then" },
            { en: "By June, she will have been working here for ten years.", es: "duration up to then" },
            { en: "The meeting is due to start at nine.", es: "scheduled" }
          ] },
          { kind: "errores", items: [
            { no: "By 2030, they will finish the bridge.", si: "By 2030, they will have finished the bridge.", pq: "'By + future time' → future perfect." },
            { no: "She said she will help us the next day.", si: "She said she would help us the next day.", pq: "Future seen from the past → would." },
            { no: "We were about leaving.", si: "We were about to leave.", pq: "be about + to-infinitive." }
          ] },
          { kind: "resumen", body: "was going to · was about to · was to · would · will have done · will have been doing · bound / set / due to." },
          { kind: "puente" }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "I ___ call you, but my phone died.", options: ["will", "was going to", "am going to", "would have been"], correctIndex: 1, explanation: "was going to = a plan in the past that didn't happen." },
        { type: "multiple_choice", question: "By June, she ___ here for ten years.", options: ["will have been working", "has been working", "is working", "would be going to work"], correctIndex: 0, explanation: "Duration up to a future point → future perfect continuous." },
        { type: "fill_blank", sentence: "We were ___ to leave when the phone rang.", answers: ["about"], hint: "Very near future, seen from the past.", explanation: "was / were about to = just before something happened." },
        { type: "fill_blank", sentence: "According to experts, prices are ___ to rise again next month.", answers: ["set", "expected", "likely", "bound", "due"], hint: "be ___ to = planned / expected", explanation: "be set / expected / likely to = expected to happen." },
        { type: "find_error", question: "Find the mistake.",
          segments: ["By the time ", { u: "we arrive" }, ", the film ", { u: "will" }, " ", { u: "already" }, " ", { u: "start" }, "."],
          correctIndex: 3, correction: "have started (will already have started)",
          explanation: "Completed before a future time → future perfect: will have started." },
        { type: "word_order", words: ["Little", "did", "I", "know", "that", "I", "was", "to", "meet", "her", "again"], correctOrder: ["Little", "did", "I", "know", "that", "I", "was", "to", "meet", "her", "again"], hint: "was to = destined" },
        { type: "translate", prompt: "Rewrite using BOUND: \"It is certain that he will be late.\"", answers: ["He is bound to be late.", "He's bound to be late.", "is bound to be late"], explanation: "be bound to = be certain to." },
        { type: "true_false", statement: "\"The meeting is due to start at nine\" means it is scheduled to start at nine.", answer: true, explanation: "be due to = scheduled." },
        { type: "multiple_choice", question: "She said she ___ help us the next day.", options: ["is going", "will", "can be going to", "would"], correctIndex: 3, explanation: "Reported future → would." },
        { type: "matching", instruction: "Match each form with its meaning.", pairs: [
          { l: "was about to", r: "very close in time" }, { l: "was going to (but…)", r: "a plan that changed" },
          { l: "was to", r: "arranged or destined" }, { l: "will have done", r: "completed before a future time" }
        ], explanation: "Each form looks at the future in a different way." }
      ]
    },

    "adv-c1-relatives-advanced": {
      lessonId: "adv-c1-relatives-advanced", level: "C1", track: "Grammar", topic: "grammar", skill: "grammar",
      title: "Advanced relative clauses: whom, whereby, none of which", tipo: "aprende", xpReward: 70, mascotState: "explaining",
      explanation: {
        body: "Formal relative clauses put the preposition first (the person to whom I spoke), use quantifier + of whom / which (many of whom), whereby (= by which), in which case, at which point, whose for things, and 'which' to refer to a whole clause (He failed, which surprised everyone).",
        examples: [
          { en: "She has three brothers, all of whom live abroad." },
          { en: "They introduced a system whereby staff can work from home." },
          { en: "He didn't apologise, which made her even angrier." }
        ],
        sections: [
          { kind: "intro", body: "Relative clauses let you pack a lot of information into one elegant sentence. In formal writing they get more precise: prepositions move to the front and quantifiers join 'whom' and 'which'." },
          { kind: "regla", body: "Preposition + whom / which (formal): the colleague with whom I share an office.\nQuantifier + of whom / which: some of which, most of whom, none of which, both of whom.\nwhereby = by which / through which: a scheme whereby…\nin which case = if that happens · at which point = at that moment\nwhose can refer to things: a company whose profits doubled.\nwhich can refer to a whole clause: She passed, which surprised us. (Never 'what'.)\nthe extent to which · the way in which" },
          { kind: "ejemplos", items: [
            { en: "This is the colleague with whom I shared an office.", es: "preposition + whom" },
            { en: "We tried several solutions, none of which worked.", es: "quantifier + of which" },
            { en: "The bus might be late, in which case we'll take a taxi.", es: "= if that happens" },
            { en: "The company whose profits doubled is now hiring.", es: "whose for things" },
            { en: "It's hard to measure the extent to which the policy worked.", es: "the extent to which" }
          ] },
          { kind: "errores", items: [
            { no: "He didn't apologise, what made her angrier.", si: "He didn't apologise, which made her angrier.", pq: "Use 'which' for a whole clause." },
            { no: "She has three brothers, all of them live abroad.", si: "She has three brothers, all of whom live abroad.", pq: "'all of them' needs a new sentence or 'and'." },
            { no: "The man to who I spoke…", si: "The man to whom I spoke…", pq: "After a preposition use 'whom'." }
          ] },
          { kind: "resumen", body: "preposition + whom/which · some/all/none of whom/which · whereby · in which case · whose · clause + which." },
          { kind: "puente" }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "She has three brothers, ___ live abroad.", options: ["all who", "which all of them", "all of whom", "all of them"], correctIndex: 2, explanation: "Quantifier + of whom (people): all of whom." },
        { type: "multiple_choice", question: "The bus might be late, ___ we'll take a taxi.", options: ["in which case", "which case", "in that case which", "whereby"], correctIndex: 0, explanation: "in which case = if that happens." },
        { type: "fill_blank", sentence: "This is the colleague with ___ I shared an office.", answers: ["whom"], hint: "After a preposition, for a person.", explanation: "with whom (formal)." },
        { type: "fill_blank", sentence: "They introduced a system ___ employees can work from home two days a week.", answers: ["whereby", "by which", "in which", "under which"], hint: "= by which", explanation: "whereby = by which / through which." },
        { type: "find_error", question: "Find the mistake.",
          segments: ["He ", { u: "didn't" }, " apologise, ", { u: "what" }, " made ", { u: "her" }, " even ", { u: "angrier" }, "."],
          correctIndex: 1, correction: "which",
          explanation: "To refer to a whole clause, use 'which', never 'what'." },
        { type: "word_order", words: ["The", "company", "whose", "profits", "doubled", "is", "hiring"], correctOrder: ["The", "company", "whose", "profits", "doubled", "is", "hiring"], hint: "whose for things" },
        { type: "translate", prompt: "Combine with \"none of which\": \"We tried several solutions. None of them worked.\"", answers: ["We tried several solutions, none of which worked.", "We tried several solutions none of which worked.", "none of which worked"], explanation: "We tried several solutions, none of which worked." },
        { type: "true_false", statement: "\"The man to who I spoke\" is correct formal English.", answer: false, explanation: "After a preposition use 'whom': the man to whom I spoke." },
        { type: "multiple_choice", question: "It's hard to measure the extent ___ the policy has worked.", options: ["which", "to which", "to that", "in what way that"], correctIndex: 1, explanation: "the extent to which = how much." },
        { type: "matching", instruction: "Match each expression with its meaning.", pairs: [
          { l: "whereby", r: "by which; by means of which" }, { l: "in which case", r: "if that happens" },
          { l: "at which point", r: "at that moment" }, { l: "many of whom", r: "a large number of those people" }
        ], explanation: "Formal relative expressions." }
      ]
    },

    "adv-c1-modal-nuance": {
      lessonId: "adv-c1-modal-nuance", level: "C1", track: "Grammar", topic: "grammar", skill: "grammar",
      title: "Modal nuance: needn't have, might well, may as well", tipo: "aprende", xpReward: 70, mascotState: "explaining",
      explanation: {
        body: "Modals carry fine shades of meaning. needn't have done = you did it, but it wasn't necessary; didn't need to = it wasn't necessary (maybe you didn't). might / could well = quite likely. may / might as well = there's no better option. can't have = impossible in the past. should have = criticism of the past. be bound to = certain.",
        examples: [
          { en: "I needn't have cooked so much: only two people came." },
          { en: "The museum is closed, so we may as well go home." },
          { en: "She can't have left already: her coat is still here." }
        ],
        sections: [
          { kind: "intro", body: "Two sentences can look almost the same and mean opposite things. 'You needn't have come' and 'You didn't need to come' are a classic C1 test." },
          { kind: "regla", body: "needn't have + participle = it happened, but it was unnecessary.\ndidn't need to + base = it wasn't necessary (we don't know if it happened).\nmight well / could well = quite likely.\nmay as well / might as well = there's no better alternative.\ncan't have / couldn't have + participle = impossible in the past.\nshould / ought to have + participle = criticism or regret.\nbe bound to = certain · there's no point in + -ing = it's useless." },
          { kind: "ejemplos", items: [
            { en: "You needn't have brought food: we had plenty.", es: "you brought it — unnecessary" },
            { en: "We didn't need to wait, so we went straight in.", es: "not necessary, and we didn't" },
            { en: "Take an umbrella; it might well rain later.", es: "quite likely" },
            { en: "You should have told me earlier.", es: "criticism of the past" },
            { en: "There's no point in waiting any longer.", es: "it's useless" }
          ] },
          { kind: "errores", items: [
            { no: "You should tell me earlier — now it's too late.", si: "You should have told me earlier.", pq: "Criticism of the past → should have + participle." },
            { no: "She mustn't have left: her coat is here.", si: "She can't have left: her coat is here.", pq: "Impossibility in the past → can't have." },
            { no: "There's no point to wait.", si: "There's no point in waiting.", pq: "no point in + -ing." }
          ] },
          { kind: "resumen", body: "needn't have done ≠ didn't need to · might well = likely · may as well = no better option · can't have = impossible." },
          { kind: "puente" }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "I ___ cooked so much — only two people came!", options: ["couldn't have", "mustn't have", "needn't have", "didn't need to"], correctIndex: 2, explanation: "I cooked, but it was unnecessary → needn't have cooked." },
        { type: "multiple_choice", question: "The museum is closed, so we ___ go home.", options: ["can't have", "might well have", "needn't have", "may as well"], correctIndex: 3, explanation: "may as well = there's no better option." },
        { type: "fill_blank", sentence: "Take an umbrella; it might ___ rain later.", answers: ["well"], hint: "= quite likely", explanation: "might well = quite likely." },
        { type: "fill_blank", sentence: "She ___ have left already; her coat is still here.", answers: ["can't", "cannot", "couldn't", "can not"], hint: "Impossible in the past.", explanation: "can't have + participle = it's impossible that she left." },
        { type: "find_error", question: "Find the mistake.",
          segments: ["You ", { u: "should" }, " ", { u: "tell" }, " me ", { u: "earlier" }, " — now ", { u: "it's" }, " too late."],
          correctIndex: 1, correction: "have told (should have told)",
          explanation: "Criticism of a past action → should have + past participle." },
        { type: "word_order", words: ["There's", "no", "point", "in", "waiting", "any", "longer"], correctOrder: ["There's", "no", "point", "in", "waiting", "any", "longer"], hint: "no point in + -ing" },
        { type: "translate", prompt: "Rewrite using NEEDN'T: \"It wasn't necessary for you to bring food, but you did.\"", answers: ["You needn't have brought food.", "You need not have brought food.", "needn't have brought food", "need not have brought food"], explanation: "You needn't have brought food." },
        { type: "true_false", statement: "\"We didn't need to wait\" always means that we waited.", answer: false, explanation: "It only says waiting wasn't necessary; usually we didn't wait." },
        { type: "multiple_choice", question: "Prices ___ rise again; the forecast is clear.", options: ["are bound to", "are bound", "bind to", "are binding to"], correctIndex: 0, explanation: "be bound to = be certain to." },
        { type: "categorize", instruction: "How sure is the speaker?", buckets: [{ id: "sure", label: "Certain" }, { id: "maybe", label: "Possible" }, { id: "no", label: "Impossible" }],
          items: [{ t: "must have seen it", bucket: "sure" }, { t: "is bound to win", bucket: "sure" }, { t: "might well rain", bucket: "maybe" }, { t: "could have missed it", bucket: "maybe" }, { t: "can't have heard", bucket: "no" }, { t: "couldn't have been him", bucket: "no" }] }
      ]
    },

    "adv-c1-phrasal-ideas": {
      lessonId: "adv-c1-phrasal-ideas", level: "C1", track: "Vocabulary", topic: "vocab", skill: "vocab",
      title: "Phrasal verbs for ideas, plans and change", tipo: "aprende", xpReward: 70, mascotState: "explaining",
      explanation: {
        body: "At C1, phrasal verbs describe abstract processes: plans that fall through, changes that are brought about, ideas that are put forward, risks that are weighed up. These are the same verbs you'll find in the Constellation room of the C1 vocabulary den, with their conjugation.",
        examples: [
          { en: "The internet has brought about huge changes." },
          { en: "The deal fell through at the last minute." },
          { en: "You need to weigh up the risks before you invest." }
        ],
        sections: [
          { kind: "intro", body: "Meetings, reports and debates are full of phrasal verbs that describe ideas and change. Learn them as whole units: the particle changes the meaning completely." },
          { kind: "vocab", items: [
            { en: "account for", es: "explain; form a part of a total" },
            { en: "bring about", es: "cause something to happen" },
            { en: "draw on", es: "use knowledge or experience" },
            { en: "fall through", es: "fail to happen" },
            { en: "live up to", es: "be as good as expected" },
            { en: "phase out", es: "stop using gradually" },
            { en: "put forward", es: "suggest for discussion" },
            { en: "weigh up", es: "consider pros and cons" },
            { en: "back up", es: "support with evidence" },
            { en: "zero in on", es: "focus closely on" }
          ] },
          { kind: "ejemplos", items: [
            { en: "Tourism accounts for a third of the region's income.", es: "forms a part of a total" },
            { en: "She put forward a proposal to cut costs.", es: "suggested" },
            { en: "The hotel did not live up to our expectations.", es: "wasn't as good as expected" }
          ] },
          { kind: "puente" }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Match each phrasal verb with its meaning.", pairs: [
          { l: "account for", r: "explain; form a part of" }, { l: "bring about", r: "cause to happen" },
          { l: "draw on", r: "use knowledge or experience" }, { l: "weigh up", r: "consider the pros and cons" }
        ], explanation: "Abstract phrasal verbs." },
        { type: "matching", instruction: "Match each phrasal verb with its meaning.", pairs: [
          { l: "phase out", r: "stop using gradually" }, { l: "fall through", r: "fail to happen" },
          { l: "live up to", r: "be as good as expected" }, { l: "zero in on", r: "focus closely on" }
        ], explanation: "More abstract phrasal verbs." },
        { type: "multiple_choice", question: "The deal ___ at the last minute because the bank withdrew.", options: ["fell behind", "fell down on", "fell out", "fell through"], correctIndex: 3, explanation: "fall through = fail to happen." },
        { type: "multiple_choice", question: "Social media has ___ a revolution in how news spreads.", options: ["brought up", "brought about", "brought round", "brought off"], correctIndex: 1, explanation: "bring about = cause to happen." },
        { type: "fill_blank", sentence: "Before investing, you should weigh ___ the risks.", answers: ["up"], hint: "Consider pros and cons.", explanation: "weigh up = consider carefully." },
        { type: "fill_blank", sentence: "The government plans to phase ___ petrol cars by 2035.", answers: ["out"], hint: "Stop gradually.", explanation: "phase out = stop using gradually." },
        { type: "find_error", question: "Find the mistake.",
          segments: ["The new restaurant ", { u: "didn't" }, " ", { u: "live up" }, " ", { u: "our" }, " ", { u: "expectations" }, "."],
          correctIndex: 1, correction: "live up to",
          explanation: "The phrasal verb is 'live up to': it didn't live up to our expectations." },
        { type: "fill_blank", sentence: "Can you back ___ your claim with evidence?", answers: ["up"], hint: "Support.", explanation: "back up a claim = support it." },
        { type: "true_false", statement: "\"To take on staff\" means to employ new people.", answer: true, explanation: "take on = employ; also accept work or responsibility." },
        { type: "fill_blank", sentence: "How do you ___ for the missing money?", answers: ["account"], hint: "= explain", explanation: "account for = explain the reason for." }
      ]
    },

    "adv-c1-word-formation": {
      lessonId: "adv-c1-word-formation", level: "C1", track: "Use of English", topic: "grammar", skill: "use",
      title: "Word formation: prefixes and suffixes", tipo: "aprende", xpReward: 70, mascotState: "explaining",
      explanation: {
        body: "Advanced exams test whether you can build the right form of a word. Nouns: -tion, -ity, -ness, -ment, -ance/-ence. Adjectives: -ive, -able/-ible, -ous, -al. Verbs: -ise/-ize, -en, -ify. Negative prefixes: un-, in-, im-, il-, ir-, dis-; mis- = wrongly; over- / under- = too much / too little.",
        examples: [
          { en: "The construction of the bridge took three years." },
          { en: "The handwriting was completely illegible." },
          { en: "We underestimated the cost." }
        ],
        sections: [
          { kind: "intro", body: "One root, many words: able → ability, unable, enable, disability. Knowing the families multiplies your vocabulary and helps you understand words you've never seen." },
          { kind: "regla", body: "Nouns: construct → construction · able → ability · aware → awareness · develop → development · signify → significance\nAdjectives: create → creative · rely → reliable · fame → famous · nation → national\nVerbs: wide → widen · modern → modernise · simple → simplify\nNegatives: il- before l (illegal), im- before m/p (impossible), ir- before r (irregular), in-, un-, dis-\nmis- = wrongly (misunderstand) · over- / under- = too much / too little (overestimate, underpaid)" },
          { kind: "ejemplos", items: [
            { en: "Her ability to adapt impressed everyone.", es: "able → ability" },
            { en: "We need to widen the road.", es: "wide → widen" },
            { en: "That decision was completely irresponsible.", es: "ir- before r" },
            { en: "I think you misunderstood me.", es: "mis- = wrongly" }
          ] },
          { kind: "errores", items: [
            { no: "The government took several measurements to reduce crime.", si: "The government took several measures to reduce crime.", pq: "measures = actions; measurements = sizes." },
            { no: "It's unpossible.", si: "It's impossible.", pq: "im- before p." }
          ] },
          { kind: "puente" }
        ]
      },
      exercises: [
        { type: "fill_blank", sentence: "The ___ of the bridge took three years. (CONSTRUCT)", answers: ["construction"], hint: "A noun.", explanation: "construct → construction." },
        { type: "fill_blank", sentence: "Her ___ to adapt impressed everyone. (ABLE)", answers: ["ability"], hint: "A noun.", explanation: "able → ability." },
        { type: "fill_blank", sentence: "The handwriting was completely ___. (LEGIBLE)", answers: ["illegible"], hint: "A negative adjective.", explanation: "il- before l: illegible." },
        { type: "fill_blank", sentence: "We need to ___ the road to reduce traffic. (WIDE)", answers: ["widen"], hint: "A verb.", explanation: "wide → widen." },
        { type: "fill_blank", sentence: "The report ___ the cost: it was 20% higher in the end. (ESTIMATE)", answers: ["underestimated"], hint: "It guessed too low.", explanation: "under- = too little: underestimated." },
        { type: "multiple_choice", question: "Which prefix makes the opposite of \"responsible\"?", options: ["un-", "dis-", "ir-", "in-"], correctIndex: 2, explanation: "ir- before r: irresponsible." },
        { type: "multiple_choice", question: "Choose the noun: \"There is no ___ between the two results.\"", options: ["comparison", "comparement", "comparation", "compareness"], correctIndex: 0, explanation: "compare → comparison." },
        { type: "categorize", instruction: "Noun or adjective?", buckets: [{ id: "n", label: "Noun" }, { id: "a", label: "Adjective" }],
          items: [{ t: "reliability", bucket: "n" }, { t: "reliable", bucket: "a" }, { t: "awareness", bucket: "n" }, { t: "aware", bucket: "a" }, { t: "significance", bucket: "n" }, { t: "significant", bucket: "a" }] },
        { type: "find_error", question: "Find the mistake.",
          segments: ["The ", { u: "government" }, " has taken ", { u: "several" }, " ", { u: "measurements" }, " to reduce ", { u: "unemployment" }, "."],
          correctIndex: 2, correction: "measures (actions)",
          explanation: "measures = actions taken to solve a problem; measurements = sizes." },
        { type: "true_false", statement: "The prefix \"mis-\" means \"wrongly\", as in \"misunderstand\".", answer: true, explanation: "mis- = wrongly: mislead, misjudge, misunderstand." }
      ]
    },

    /* ============================ C2 ============================ */

    "adv-c2-conditional-inversion": {
      lessonId: "adv-c2-conditional-inversion", level: "C2", track: "Grammar", topic: "grammar", skill: "grammar",
      title: "Inverted conditionals: Had I known, Should you, Were it not for", tipo: "aprende", xpReward: 75, mascotState: "explaining",
      explanation: {
        body: "Formal English can drop 'if' and invert the subject and auxiliary: Had I known (= if I had known), Should you need help (= if you happen to need), Were she to resign (= if she resigned), Were it not for / Had it not been for. The negative is Had I not…, never 'Hadn't I…'.",
        examples: [
          { en: "Had I known about the strike, I would have taken the car." },
          { en: "Should you require further information, please contact us." },
          { en: "Were it not for her support, I would still be unemployed." }
        ],
        sections: [
          { kind: "intro", body: "Contracts, formal letters and speeches love inverted conditionals. They sound polished and precise, and at C2 you're expected to use them, not just recognise them." },
          { kind: "regla", body: "Had + subject + past participle = If + past perfect: Had we left earlier, we'd have caught it.\nShould + subject + base form = If (by any chance): Should you need help, call me.\nWere + subject + to-infinitive = If (hypothetical): Were the bank to collapse, …\nWere + subject + noun/adjective = If … were: Were I you, I'd accept.\nWere it not for / Had it not been for + noun = If it weren't / hadn't been for.\nNegative: Had I not seen it… / Should you not wish… (no contractions)." },
          { kind: "ejemplos", items: [
            { en: "Had they invested earlier, they would be rich now.", es: "mixed conditional, inverted" },
            { en: "Should you see Tom, tell him to call me.", es: "= if you happen to see Tom" },
            { en: "Were the company to collapse, thousands would lose their jobs.", es: "a hypothetical future" },
            { en: "Had it not been for the warning, we would have crossed the bridge.", es: "= if it hadn't been for" }
          ] },
          { kind: "errores", items: [
            { no: "Hadn't she missed the bus, she would have arrived.", si: "Had she not missed the bus, she would have arrived.", pq: "Negative inversion: Had + subject + not." },
            { no: "If had I known…", si: "Had I known…", pq: "Inversion replaces 'if'; never use both." },
            { no: "Were I to knew…", si: "Were I to know…", pq: "Were + subject + to + base form." }
          ] },
          { kind: "resumen", body: "Had I done · Should you do · Were she to do · Were it not for · Had it not been for." },
          { kind: "puente" }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "___ the warning, we would have crossed the bridge.", options: ["Hadn't we heard", "Had we not heard", "If we hadn't heard of", "Didn't we hear"], correctIndex: 1, explanation: "Negative inversion: Had we not heard (= if we hadn't heard)." },
        { type: "multiple_choice", question: "___ you require any further information, please contact us.", options: ["Were", "Had", "Should", "Would"], correctIndex: 2, explanation: "Should you require = if you (happen to) require." },
        { type: "fill_blank", sentence: "___ it not for her support, I would still be unemployed.", answers: ["Were"], hint: "= If it weren't for", explanation: "Were it not for + noun." },
        { type: "fill_blank", sentence: "___ I known about the strike, I would have taken the car.", answers: ["Had"], hint: "= If I had known", explanation: "Had + subject + past participle." },
        { type: "find_error", question: "Find the mistake.",
          segments: [{ u: "Hadn't" }, " she ", { u: "missed" }, " the bus, she ", { u: "would have" }, " ", { u: "arrived" }, " on time."],
          correctIndex: 0, correction: "Had she not missed",
          explanation: "In negative inversion the 'not' goes after the subject: Had she not missed…" },
        { type: "word_order", words: ["Were", "the", "company", "to", "collapse", "thousands", "would", "lose", "their", "jobs"], correctOrder: ["Were", "the", "company", "to", "collapse", "thousands", "would", "lose", "their", "jobs"], hint: "Were + subject + to + base form" },
        { type: "translate", prompt: "Rewrite starting with \"Should\": \"If you see Tom, tell him to call me.\"", answers: ["Should you see Tom, tell him to call me.", "Should you see Tom, please tell him to call me."], explanation: "Should you see Tom, tell him to call me." },
        { type: "translate", prompt: "Rewrite starting with \"Had\": \"If they had invested earlier, they would be rich now.\"", answers: ["Had they invested earlier, they would be rich now.", "Had they invested earlier, they'd be rich now."], explanation: "Had they invested earlier, they would be rich now." },
        { type: "true_false", statement: "\"Were I you, I would accept\" is a formal way of saying \"If I were you, I would accept\".", answer: true, explanation: "Were + subject replaces 'if + subject + were'." },
        { type: "matching", instruction: "Match each inversion with its meaning.", pairs: [
          { l: "Had I known…", r: "If I had known…" }, { l: "Should you need…", r: "If you happen to need…" },
          { l: "Were she to leave…", r: "If she left (hypothetically)…" }, { l: "Were it not for…", r: "If it weren't for…" }
        ], explanation: "Each inversion replaces an if-clause." }
      ]
    },

    "adv-c2-fronting": {
      lessonId: "adv-c2-fronting", level: "C2", track: "Grammar", topic: "grammar", skill: "grammar",
      title: "Fronting and inversion for effect", tipo: "aprende", xpReward: 75, mascotState: "explaining",
      explanation: {
        body: "Putting an element first changes the rhythm and the emphasis. Negative and limiting adverbials invert the verb (No sooner had we left than…, Not until…did, Hardly…when). So + adjective and Such + be invert too (So loud was the music that…; Such was the demand that…). Place adverbials can front an intransitive verb (Into the room walked a stranger).",
        examples: [
          { en: "No sooner had we left the house than it started to rain." },
          { en: "Such was the demand that tickets sold out in minutes." },
          { en: "Gone are the days when phones had cords." }
        ],
        sections: [
          { kind: "intro", body: "Writers and speakers move words to the front of the sentence for drama and emphasis. At C2, these structures turn correct English into memorable English." },
          { kind: "regla", body: "No sooner + had + subject + participle … than: No sooner had I arrived than…\nHardly / Scarcely + had + subject + participle … when: Hardly had she sat down when…\nNot until + time/clause + auxiliary + subject: Not until the end did I realise…\nUnder no circumstances / At no time / Only after… + auxiliary + subject.\nLittle did + subject + base form: Little did I know…\nSo + adjective + be + subject + that: So severe was the storm that…\nSuch + be + noun + that: Such was his anger that…\nPlace adverbial + intransitive verb + subject: Into the room walked a tall stranger. Here comes the bus.\nGone are the days when…" },
          { kind: "ejemplos", items: [
            { en: "Hardly had she sat down when the phone rang.", es: "hardly … when" },
            { en: "Not until the end of the film did I realise who the killer was.", es: "Not until … + did + subject" },
            { en: "So loud was the music that nobody could sleep.", es: "So + adjective + be + subject" },
            { en: "Under no circumstances should you open the door.", es: "negative adverbial + should" }
          ] },
          { kind: "errores", items: [
            { no: "No sooner we had left than it rained.", si: "No sooner had we left than it rained.", pq: "Invert: had + subject." },
            { no: "Hardly had she sat down than the phone rang.", si: "Hardly had she sat down when the phone rang.", pq: "No sooner … than · Hardly … when." },
            { no: "So the music was loud that…", si: "So loud was the music that…", pq: "So + adjective + verb + subject." }
          ] },
          { kind: "resumen", body: "Negative / limiting word first → auxiliary + subject. So + adj + be + subject · Such + be + noun." },
          { kind: "puente" }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "No sooner ___ the house than it started to rain.", options: ["had we left", "did we leave", "we left", "we had left"], correctIndex: 0, explanation: "No sooner + had + subject + past participle … than." },
        { type: "multiple_choice", question: "So ___ that nobody could sleep.", options: ["the music was loud", "loud the music was", "was loud the music", "loud was the music"], correctIndex: 3, explanation: "So + adjective + verb + subject: So loud was the music…" },
        { type: "fill_blank", sentence: "___ was the demand that the tickets sold out in minutes.", answers: ["Such"], hint: "+ be + noun", explanation: "Such was the demand that…" },
        { type: "fill_blank", sentence: "Hardly had she sat down ___ the phone rang.", answers: ["when", "before"], hint: "Hardly … ___", explanation: "Hardly / Scarcely … when (No sooner … than)." },
        { type: "find_error", question: "Find the mistake.",
          segments: ["Not until ", { u: "the end" }, " of the film ", { u: "I realised" }, " who the ", { u: "killer" }, " ", { u: "was" }, "."],
          correctIndex: 1, correction: "did I realise",
          explanation: "Not until + time + auxiliary + subject: Not until the end did I realise…" },
        { type: "word_order", words: ["Gone", "are", "the", "days", "when", "phones", "had", "cords"], correctOrder: ["Gone", "are", "the", "days", "when", "phones", "had", "cords"], hint: "Gone are the days when…" },
        { type: "translate", prompt: "Rewrite starting with \"Little\": \"I had no idea that she was lying.\"", answers: ["Little did I know that she was lying.", "Little did I know she was lying.", "Little did I realise that she was lying.", "Little did I realize that she was lying.", "Little did I realise she was lying.", "Little did I realize she was lying."], explanation: "Little did I know that she was lying." },
        { type: "translate", prompt: "Rewrite starting with \"Such\": \"The noise was so loud that we left.\"", answers: ["Such was the noise that we left.", "Such was the noise we left."], explanation: "Such was the noise that we left." },
        { type: "true_false", statement: "\"Into the room walked a tall stranger\" is a correct, literary sentence.", answer: true, explanation: "Place adverbial + intransitive verb + subject." },
        { type: "multiple_choice", question: "Under no circumstances ___ the door to strangers.", options: ["you should open", "should you open", "you open", "open you"], correctIndex: 1, explanation: "Negative adverbial first → auxiliary + subject: should you open." }
      ]
    },

    "adv-c2-reduced-clauses": {
      lessonId: "adv-c2-reduced-clauses", level: "C2", track: "Grammar", topic: "grammar", skill: "grammar",
      title: "Reduced clauses and the dangling participle", tipo: "aprende", xpReward: 75, mascotState: "explaining",
      explanation: {
        body: "Elegant English removes what is obvious. Adverbial clauses lose subject + be (Once completed, the form…; When asked, he refused; If necessary, call me). Participle clauses replace whole clauses (Having finished, she left; Being a doctor, she knew…). The trap: the participle must share the subject of the main clause. 'Walking home, the rain started' is wrong.",
        examples: [
          { en: "Once completed, the form must be signed." },
          { en: "Having finished the report, she sent it to her boss." },
          { en: "Walking to work, I got caught in the rain." }
        ],
        sections: [
          { kind: "intro", body: "C2 writing is economical: why say 'When he was asked' if 'When asked' is enough? But economy has one strict rule, and breaking it produces comic sentences." },
          { kind: "regla", body: "Conjunction + participle / adjective (same subject): When asked, … · Once completed, … · Although tired, … · If necessary, … · If in doubt, …\nParticiple clause: -ing = active or simultaneous; having + participle = earlier; past participle = passive.\nReduced relatives: the man standing there (who is standing) · the documents signed yesterday (that were signed).\nRULE: the implied subject of the participle = the subject of the main clause.\n✗ Walking home, the rain started.  ✓ Walking home, I got caught in the rain." },
          { kind: "ejemplos", items: [
            { en: "When asked about the delay, the minister refused to comment.", es: "= when he was asked" },
            { en: "Although exhausted, the runners kept going.", es: "= although they were exhausted" },
            { en: "Being a doctor, she knew what to do.", es: "= because she was a doctor" },
            { en: "The letters written by the poet were sold last year.", es: "passive meaning → past participle" }
          ] },
          { kind: "errores", items: [
            { no: "Having been told the news, the phone rang.", si: "Having been told the news, I called my sister.", pq: "The phone wasn't told: the subject must match." },
            { no: "The letters writing by the poet…", si: "The letters written by the poet…", pq: "Passive meaning → past participle." },
            { no: "Finished the report, she left.", si: "Having finished the report, she left.", pq: "Earlier action → having + participle." }
          ] },
          { kind: "resumen", body: "Drop subject + be when it's the same subject. -ing = active · having done = earlier · done = passive." },
          { kind: "puente" }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "Which sentence is correct?", options: ["Walking to work, the rain started.", "Walking to work, it started to rain.", "Walking to work, I got caught in the rain.", "Walking to work, the rain caught me by surprise."], correctIndex: 2, explanation: "Only 'I' can be walking: the participle must share the main subject." },
        { type: "multiple_choice", question: "___ the report, she sent it to her boss.", options: ["Having finished", "Having been finished", "Finished", "To finish"], correctIndex: 0, explanation: "Earlier, active action → having + past participle." },
        { type: "fill_blank", sentence: "___ asked about the delay, the minister refused to comment.", answers: ["When", "If", "Once"], hint: "Conjunction + participle.", explanation: "When asked = when he was asked." },
        { type: "fill_blank", sentence: "Once ___ (complete), the form must be signed by a manager.", answers: ["completed"], hint: "Passive meaning.", explanation: "Once completed = once it has been completed." },
        { type: "find_error", question: "Find the mistake.",
          segments: ["The ", { u: "letters" }, " ", { u: "writing" }, " by the poet ", { u: "were" }, " ", { u: "sold" }, " last year."],
          correctIndex: 1, correction: "written",
          explanation: "The letters were written by the poet → passive → past participle." },
        { type: "word_order", words: ["If", "in", "doubt", "ask", "a", "member", "of", "staff"], correctOrder: ["If", "in", "doubt", "ask", "a", "member", "of", "staff"], hint: "If in doubt, …" },
        { type: "translate", prompt: "Reduce the clause: \"Because she was a doctor, she knew what to do.\" → Being …", answers: ["Being a doctor, she knew what to do.", "Being a doctor she knew what to do."], explanation: "Being a doctor, she knew what to do." },
        { type: "true_false", statement: "\"Having been told the news, the phone rang\" is correct.", answer: false, explanation: "Dangling participle: the phone wasn't told the news." },
        { type: "multiple_choice", question: "The people ___ in the queue had been there since dawn.", options: ["who waiting", "waited", "were waiting", "waiting"], correctIndex: 3, explanation: "Reduced relative, active meaning: the people waiting (= who were waiting)." },
        { type: "categorize", instruction: "Active or passive meaning?", buckets: [{ id: "act", label: "Active (-ing)" }, { id: "pas", label: "Passive (past participle)" }],
          items: [{ t: "the man sitting next to me", bucket: "act" }, { t: "a car made in Japan", bucket: "pas" }, { t: "students taking the exam", bucket: "act" }, { t: "the money stolen last night", bucket: "pas" }, { t: "a girl wearing red", bucket: "act" }, { t: "the problems discussed today", bucket: "pas" }] }
      ]
    },

    "adv-c2-comparison": {
      lessonId: "adv-c2-comparison", level: "C2", track: "Grammar", topic: "grammar", skill: "grammar",
      title: "Advanced comparison: the more…, nowhere near, every bit as", tipo: "aprende", xpReward: 75, mascotState: "explaining",
      explanation: {
        body: "C2 comparisons are graded and idiomatic: the + comparative, the + comparative (The more you practise, the better you get); nowhere near / not nearly as (much less); every bit as (just as); far and away / by far (by a large margin); not so much X as Y; no more … than (equally not); marginally / considerably + comparative.",
        examples: [
          { en: "The more you practise, the better you get." },
          { en: "Her second novel is nowhere near as good as her first." },
          { en: "It wasn't so much the price as the service that annoyed me." }
        ],
        sections: [
          { kind: "intro", body: "'Better' and 'more expensive' are B1. At C2 you say HOW MUCH better, compare two things in balance, or say that one thing grows as another does." },
          { kind: "regla", body: "The + comparative …, the + comparative: The sooner, the better.\nnowhere near / not nearly as … as = much less · every bit as … as = just as\nfar and away / by far + superlative = by a large margin\nnot so much X as Y = Y rather than X\nno more … than = both are equally not: He's no more a doctor than I am.\ntwice / three times as … as\nmarginally / slightly / considerably / a great deal + comparative" },
          { kind: "ejemplos", items: [
            { en: "The harder you work, the more money you will earn.", es: "the …, the …" },
            { en: "The sequel is every bit as exciting as the original.", es: "just as" },
            { en: "This is far and away the best film of the year.", es: "by a large margin" },
            { en: "Her flat is three times as big as mine.", es: "multiples" }
          ] },
          { kind: "errores", items: [
            { no: "The harder you work, more money you earn.", si: "The harder you work, the more money you earn.", pq: "Both halves need 'the'." },
            { no: "It's nowhere near so good than the first.", si: "It's nowhere near as good as the first.", pq: "as … as." },
            { no: "This is the more better option.", si: "This is by far the better option.", pq: "Never 'more better'." }
          ] },
          { kind: "resumen", body: "the …, the … · nowhere near as · every bit as · far and away · not so much … as · no more … than." },
          { kind: "puente" }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "The more you practise, ___ you get.", options: ["the best", "more better", "the better", "better"], correctIndex: 2, explanation: "The + comparative, the + comparative." },
        { type: "multiple_choice", question: "Her second novel is ___ as good as her first: it's far worse.", options: ["every bit", "nowhere near", "just", "by far"], correctIndex: 1, explanation: "nowhere near as … as = much less … than." },
        { type: "fill_blank", sentence: "It wasn't so much the price ___ the service that annoyed me.", answers: ["as"], hint: "not so much X ___ Y", explanation: "not so much X as Y = Y rather than X." },
        { type: "fill_blank", sentence: "This is far ___ away the best film of the year.", answers: ["and"], hint: "far ___ away", explanation: "far and away = by a large margin." },
        { type: "find_error", question: "Find the mistake.",
          segments: ["The ", { u: "harder" }, " you work, ", { u: "more" }, " money you ", { u: "will" }, " ", { u: "earn" }, "."],
          correctIndex: 1, correction: "the more",
          explanation: "Both halves need 'the': The harder…, the more…" },
        { type: "word_order", words: ["Her", "flat", "is", "three", "times", "as", "big", "as", "mine"], correctOrder: ["Her", "flat", "is", "three", "times", "as", "big", "as", "mine"], hint: "three times as … as" },
        { type: "translate", prompt: "Rewrite using EVERY: \"The sequel is just as exciting as the original.\"", answers: ["The sequel is every bit as exciting as the original.", "is every bit as exciting as the original", "every bit as exciting as"], explanation: "every bit as … as = just as … as." },
        { type: "true_false", statement: "\"He is no more a doctor than I am\" means he is definitely not a doctor.", answer: true, explanation: "no more … than = equally not (and I'm not a doctor either)." },
        { type: "multiple_choice", question: "Prices are ___ higher than last year: only 0.5% more.", options: ["far", "considerably", "a great deal", "marginally"], correctIndex: 3, explanation: "marginally = by a very small amount." },
        { type: "matching", instruction: "Match each expression with its meaning.", pairs: [
          { l: "nowhere near as", r: "much less" }, { l: "every bit as", r: "just as; equally" },
          { l: "by far", r: "by a large margin" }, { l: "not so much X as Y", r: "Y rather than X" }
        ], explanation: "Graded comparison." }
      ]
    },

    "adv-c2-formal-linking": {
      lessonId: "adv-c2-formal-linking", level: "C2", track: "Use of English", topic: "grammar", skill: "use",
      title: "Formal connectors: albeit, notwithstanding, insofar as, lest", tipo: "aprende", xpReward: 75, mascotState: "explaining",
      explanation: {
        body: "Formal writing uses compact connectors: albeit (= although it is) + adjective or phrase; notwithstanding (= despite), before or after its noun; insofar as / inasmuch as (= to the extent that); lest (= so that … not, very formal); hence (= that is why); thereby (= by doing this); whereupon (= after which).",
        examples: [
          { en: "It was a slow, albeit steady, recovery." },
          { en: "The project went ahead, notwithstanding the objections." },
          { en: "She cut costs, thereby saving the company." }
        ],
        sections: [
          { kind: "intro", body: "Reports, essays and legal texts depend on connectors that say a lot in very few words. Used well, they make your writing sound authoritative; used wrongly, they jump out." },
          { kind: "regla", body: "albeit + adjective / adverb / noun phrase (no verb): a small, albeit important, change.\nnotwithstanding + noun (no 'of'), or noun + notwithstanding: notwithstanding the costs / the costs notwithstanding.\ninsofar as / inasmuch as = to the extent that.\nlest + (should) + base form = so that … not: He wrote it down lest he (should) forget.\nhence + noun = that is why: The road was icy, hence the delay.\nthereby + -ing = by doing this · whereupon = after which · hitherto = until now." },
          { kind: "ejemplos", items: [
            { en: "The results were positive, albeit limited to a small sample.", es: "albeit + phrase" },
            { en: "The plan is fair insofar as everyone pays the same rate.", es: "to the extent that" },
            { en: "He spoke quietly lest anyone should hear.", es: "so that nobody would hear" },
            { en: "She signed the contract, whereupon she left without a word.", es: "after which" }
          ] },
          { kind: "errores", items: [
            { no: "notwithstanding of the objections", si: "notwithstanding the objections", pq: "No 'of' after notwithstanding." },
            { no: "albeit it was expensive", si: "albeit expensive", pq: "albeit takes an adjective or phrase, not a clause." },
            { no: "lest he doesn't forget", si: "lest he forget / lest he should forget", pq: "lest is already negative." }
          ] },
          { kind: "resumen", body: "albeit = although · notwithstanding = despite · insofar as = to the extent that · lest = so that … not · hence = that's why · thereby = by doing this." },
          { kind: "puente" }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "The results were positive, ___ limited to a small sample.", options: ["notwithstanding", "albeit", "lest", "hence"], correctIndex: 1, explanation: "albeit = although (it was)." },
        { type: "multiple_choice", question: "He wrote it down ___ he forget.", options: ["unless", "albeit", "lest", "whereby"], correctIndex: 2, explanation: "lest = so that … not (formal)." },
        { type: "fill_blank", sentence: "The plan is fair ___ as everyone pays the same rate.", answers: ["insofar", "inasmuch", "in so far"], hint: "= to the extent that", explanation: "insofar as / inasmuch as." },
        { type: "fill_blank", sentence: "The company cut costs, ___ avoiding redundancies.", answers: ["thereby"], hint: "= by doing this", explanation: "thereby + -ing = by doing this." },
        { type: "find_error", question: "Find the mistake.",
          segments: ["The project went ahead, ", { u: "notwithstanding" }, " ", { u: "of" }, " ", { u: "the" }, " ", { u: "objections" }, "."],
          correctIndex: 1, correction: "remove 'of': notwithstanding the objections",
          explanation: "notwithstanding takes a noun directly, like 'despite'." },
        { type: "word_order", words: ["The", "road", "was", "icy", "hence", "the", "delay"], correctOrder: ["The", "road", "was", "icy", "hence", "the", "delay"], hint: "hence + noun" },
        { type: "translate", prompt: "Rewrite with ALBEIT: \"It was a successful trip, although it was expensive.\"", answers: ["It was a successful, albeit expensive, trip.", "It was a successful albeit expensive trip.", "It was a successful trip, albeit an expensive one.", "It was a successful trip, albeit expensive."], explanation: "It was a successful, albeit expensive, trip." },
        { type: "true_false", statement: "\"Lest\" is common in informal spoken English.", answer: false, explanation: "It is very formal or literary." },
        { type: "multiple_choice", question: "She signed the contract, ___ she left the room without a word.", options: ["whereupon", "whereby", "whereas", "wherein"], correctIndex: 0, explanation: "whereupon = after which." },
        { type: "matching", instruction: "Match each connector with its meaning.", pairs: [
          { l: "albeit", r: "although" }, { l: "notwithstanding", r: "despite" },
          { l: "hence", r: "that is why" }, { l: "hitherto", r: "until now" }
        ], explanation: "Formal connectors." }
      ]
    },

    "adv-c2-phrasal-attitude": {
      lessonId: "adv-c2-phrasal-attitude", level: "C2", track: "Vocabulary", topic: "vocab", skill: "vocab",
      title: "Phrasal verbs with attitude: gloss over, fob off, stave off", tipo: "aprende", xpReward: 75, mascotState: "explaining",
      explanation: {
        body: "Some phrasal verbs carry judgement: they say not only what happened but what the speaker thinks of it. gloss over (hide a problem by mentioning it briefly), talk down to (patronise), fob off (get rid of someone with excuses), butter up (flatter), egg on (encourage something foolish), rein in (control), root out (find and remove), stave off (prevent for a while), wriggle out of (avoid a duty), chip in (contribute), bow out (withdraw gracefully).",
        examples: [
          { en: "The report glosses over the safety problems." },
          { en: "Don't let them fob you off with excuses." },
          { en: "Emergency loans helped them stave off bankruptcy." }
        ],
        sections: [
          { kind: "intro", body: "Native speakers judge as they describe. 'He mentioned the problem' is neutral; 'He glossed over the problem' accuses him of hiding it. These verbs give your English that edge." },
          { kind: "vocab", items: [
            { en: "gloss over", es: "mention briefly to hide a problem" },
            { en: "talk down to", es: "speak as if someone were stupid" },
            { en: "fob off", es: "get rid of someone with excuses" },
            { en: "butter up", es: "flatter to get something" },
            { en: "egg on", es: "encourage to do something risky" },
            { en: "rein in", es: "bring under control" },
            { en: "root out", es: "find and remove" },
            { en: "stave off", es: "keep away for a while" },
            { en: "wriggle out of", es: "avoid a duty cleverly" },
            { en: "chip in", es: "contribute money or ideas" },
            { en: "bow out", es: "withdraw gracefully" }
          ] },
          { kind: "puente" }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Match each phrasal verb with its meaning.", pairs: [
          { l: "gloss over", r: "mention briefly to hide problems" }, { l: "talk down to", r: "speak as if someone were stupid" },
          { l: "bow out", r: "withdraw gracefully" }, { l: "chip in", r: "contribute money or ideas" }
        ], explanation: "Phrasal verbs with attitude." },
        { type: "matching", instruction: "Match each phrasal verb with its meaning.", pairs: [
          { l: "fob off", r: "get rid of someone with excuses" }, { l: "butter up", r: "flatter to get something" },
          { l: "rein in", r: "bring under control" }, { l: "stave off", r: "keep away for a while" }
        ], explanation: "More phrasal verbs with attitude." },
        { type: "multiple_choice", question: "The report ___ the safety problems, which is worrying.", options: ["bows out", "chips in", "butters up", "glosses over"], correctIndex: 3, explanation: "gloss over = deal with briefly to hide something." },
        { type: "multiple_choice", question: "Everyone ___ ten dollars for her present.", options: ["fobbed off", "reined in", "chipped in", "egged on"], correctIndex: 2, explanation: "chip in = contribute." },
        { type: "fill_blank", sentence: "The new CEO promised to root ___ corruption.", answers: ["out"], hint: "Find and remove.", explanation: "root out = find and remove completely." },
        { type: "fill_blank", sentence: "Don't let them fob you ___ with excuses.", answers: ["off"], hint: "Get rid of you.", explanation: "fob someone off (with excuses)." },
        { type: "fill_blank", sentence: "He tried to wriggle ___ of doing the washing-up.", answers: ["out"], hint: "Avoid a duty.", explanation: "wriggle out of = avoid something you should do." },
        { type: "find_error", question: "Find the mistake.",
          segments: ["She ", { u: "never" }, " ", { u: "talks" }, " ", { u: "down" }, " ", { u: "at" }, " her students."],
          correctIndex: 3, correction: "to (talk down to someone)",
          explanation: "The phrasal verb is 'talk down to'." },
        { type: "true_false", statement: "If friends \"egg you on\", they encourage you to do something risky or foolish.", answer: true, explanation: "egg on = urge someone to do something unwise." },
        { type: "multiple_choice", question: "Emergency loans helped the company ___ bankruptcy for another year.", options: ["bow out", "stave off", "chip in", "gloss over"], correctIndex: 1, explanation: "stave off = prevent something bad for a while." }
      ]
    },

    "adv-c2-confusables": {
      lessonId: "adv-c2-confusables", level: "C2", track: "Vocabulary", topic: "vocab", skill: "vocab",
      title: "Easily confused words: affect/effect, imply/infer, flout/flaunt", tipo: "aprende", xpReward: 75, mascotState: "explaining",
      explanation: {
        body: "C2 precision means never mixing near-twins: affect (verb) / effect (noun); imply (suggest) / infer (conclude); disinterested (impartial) / uninterested (bored); flout (break a rule) / flaunt (show off); complement (go well with) / compliment (praise); principal (main) / principle (rule); economic (of the economy) / economical (saving money); historic (important in history) / historical (about the past); eminent (respected) / imminent (about to happen); discreet (tactful) / discrete (separate); continual (repeated) / continuous (without a break).",
        examples: [
          { en: "The new law will affect thousands of families." },
          { en: "Are you implying that I'm lying?" },
          { en: "A judge must be disinterested, not uninterested." }
        ],
        sections: [
          { kind: "intro", body: "Even educated native speakers mix these pairs up, which is exactly why getting them right marks you out at C2." },
          { kind: "vocab", items: [
            { en: "affect / effect", es: "verb: influence / noun: result" },
            { en: "imply / infer", es: "suggest (speaker) / conclude (listener)" },
            { en: "disinterested / uninterested", es: "impartial / not interested" },
            { en: "flout / flaunt", es: "break a rule openly / show off" },
            { en: "complement / compliment", es: "go well with / praise" },
            { en: "principal / principle", es: "main / a rule or belief" },
            { en: "economic / economical", es: "of the economy / saving money" },
            { en: "historic / historical", es: "important in history / about the past" },
            { en: "eminent / imminent", es: "famous and respected / about to happen" },
            { en: "discreet / discrete", es: "tactful / separate" },
            { en: "continual / continuous", es: "repeated / without a break" }
          ] },
          { kind: "puente" }
        ]
      },
      exercises: [
        { type: "multiple_choice", question: "The new law will ___ thousands of families.", options: ["effect", "infect", "effectuate", "affect"], correctIndex: 3, explanation: "affect = verb (influence); effect = noun (result)." },
        { type: "multiple_choice", question: "Are you ___ that I'm lying?", options: ["inferring", "implying", "inferencing", "imploring"], correctIndex: 1, explanation: "The speaker implies; the listener infers." },
        { type: "multiple_choice", question: "A judge must be ___: she cannot gain anything from the result.", options: ["uninterested", "uninteresting", "disinterested", "desinterested"], correctIndex: 2, explanation: "disinterested = impartial; uninterested = bored." },
        { type: "multiple_choice", question: "Drivers who ___ the rules will be fined.", options: ["flout", "flaunted", "float", "flaunt"], correctIndex: 0, explanation: "flout = break a rule openly; flaunt = show off." },
        { type: "fill_blank", sentence: "That wine is the perfect ___ to fish.", answers: ["complement", "accompaniment"], hint: "Something that goes well with.", explanation: "complement = something that completes; compliment = praise." },
        { type: "fill_blank", sentence: "It was a ___ moment: the first woman ever elected president.", answers: ["historic"], hint: "Important in history.", explanation: "historic = important in history; historical = about the past." },
        { type: "categorize", instruction: "economic (of the economy) or economical (saves money)?", buckets: [{ id: "eco", label: "economic" }, { id: "ecl", label: "economical" }],
          items: [{ t: "a small, fuel-saving car", bucket: "ecl" }, { t: "the country's growth figures", bucket: "eco" }, { t: "a cheap way to travel", bucket: "ecl" }, { t: "trade and inflation policy", bucket: "eco" }, { t: "a shower that uses less water", bucket: "ecl" }, { t: "a deep recession", bucket: "eco" }] },
        { type: "matching", instruction: "Match each word with its meaning.", pairs: [
          { l: "discreet", r: "careful not to embarrass anyone" }, { l: "discrete", r: "separate; distinct" },
          { l: "continual", r: "happening again and again" }, { l: "continuous", r: "without a break" }
        ], explanation: "Near-twins with different meanings." },
        { type: "true_false", statement: "\"Imminent\" means \"famous and respected\".", answer: false, explanation: "That's 'eminent'. Imminent = about to happen." },
        { type: "find_error", question: "Find the mistake.",
          segments: ["The ", { u: "principle" }, " reason ", { u: "for" }, " the delay ", { u: "was" }, " ", { u: "a lack" }, " of staff."],
          correctIndex: 0, correction: "principal (main)",
          explanation: "principal = main; principle = a rule or belief." }
      ]
    },

    "adv-c2-intensifiers": {
      lessonId: "adv-c2-intensifiers", level: "C2", track: "Vocabulary", topic: "vocab", skill: "vocab",
      title: "Strong collocations: adverb + adjective", tipo: "aprende", xpReward: 75, mascotState: "explaining",
      explanation: {
        body: "'Very' is invisible at C2. Natural English pairs specific adverbs with specific adjectives: bitterly disappointed, acutely aware, blissfully unaware, deeply rooted, fiercely competitive, utterly convinced, highly controversial, wholly inadequate, painfully slow, vastly superior, sorely missed, strongly worded.",
        examples: [
          { en: "The fans were bitterly disappointed by the defeat." },
          { en: "She is acutely aware of the risks." },
          { en: "Corruption is deeply rooted in the system." }
        ],
        sections: [
          { kind: "intro", body: "Collocations are the words that 'like' each other. Swapping 'very' for the right adverb is one of the fastest ways to sound fluent and precise." },
          { kind: "vocab", items: [
            { en: "bitterly disappointed", es: "extremely disappointed" },
            { en: "acutely aware", es: "very conscious of" },
            { en: "blissfully unaware", es: "happily ignorant" },
            { en: "deeply rooted", es: "firmly established" },
            { en: "fiercely competitive", es: "extremely competitive" },
            { en: "utterly convinced", es: "completely sure" },
            { en: "highly controversial", es: "causing much disagreement" },
            { en: "wholly inadequate", es: "not at all enough" },
            { en: "painfully slow", es: "annoyingly slow" },
            { en: "vastly superior", es: "much better" },
            { en: "sorely missed", es: "greatly missed" },
            { en: "strongly worded", es: "very direct and critical" }
          ] },
          { kind: "puente" }
        ]
      },
      exercises: [
        { type: "matching", instruction: "Which adverb goes with each adjective?", pairs: [
          { l: "bitterly", r: "disappointed" }, { l: "acutely", r: "aware" },
          { l: "fiercely", r: "competitive" }, { l: "sorely", r: "missed" }
        ], explanation: "Fixed adverb + adjective collocations." },
        { type: "matching", instruction: "Which adverb goes with each adjective?", pairs: [
          { l: "blissfully", r: "unaware" }, { l: "deeply", r: "rooted" },
          { l: "vastly", r: "superior" }, { l: "highly", r: "controversial" }
        ], explanation: "More adverb + adjective collocations." },
        { type: "multiple_choice", question: "The fans were ___ disappointed by the defeat.", options: ["bitterly", "highly", "vastly", "blissfully"], correctIndex: 0, explanation: "bitterly disappointed." },
        { type: "multiple_choice", question: "She is ___ aware of the risks; she thinks about them all the time.", options: ["vastly", "sorely", "acutely", "wholly"], correctIndex: 2, explanation: "acutely aware = very conscious of." },
        { type: "fill_blank", sentence: "The old teacher will be ___ missed by everyone.", answers: ["sorely", "greatly", "deeply", "sadly", "much"], hint: "s _ _ _ _ _", explanation: "sorely missed." },
        { type: "fill_blank", sentence: "The government's response was wholly ___: it solved nothing.", answers: ["inadequate", "insufficient"], hint: "Not enough.", explanation: "wholly inadequate." },
        { type: "find_error", question: "Find the mistake.",
          segments: ["He was ", { u: "strongly" }, " ", { u: "unaware" }, " of the danger ", { u: "until" }, " it ", { u: "was" }, " too late."],
          correctIndex: 0, correction: "blissfully / completely unaware",
          explanation: "We say 'blissfully unaware' or 'completely unaware', not 'strongly unaware'." },
        { type: "categorize", instruction: "Positive or negative?", buckets: [{ id: "pos", label: "Positive" }, { id: "neg", label: "Negative" }],
          items: [{ t: "blissfully happy", bucket: "pos" }, { t: "bitterly disappointed", bucket: "neg" }, { t: "deeply grateful", bucket: "pos" }, { t: "painfully slow", bucket: "neg" }, { t: "thoroughly enjoyable", bucket: "pos" }, { t: "wholly inadequate", bucket: "neg" }] },
        { type: "true_false", statement: "\"A strongly worded letter\" is a letter that expresses criticism very directly.", answer: true, explanation: "strongly worded = direct and critical." },
        { type: "word_order", words: ["Corruption", "is", "deeply", "rooted", "in", "the", "system"], correctOrder: ["Corruption", "is", "deeply", "rooted", "in", "the", "system"], hint: "deeply rooted" }
      ]
    }

  };

  /* Orden de aparición: se anexa al final de cada escalera (nivel + destreza). */
  var ORDER = [
    "adv-c1-impersonal-passive", "adv-c1-unreal-past", "adv-c1-if-alternatives",
    "adv-c1-gerund-infinitive", "adv-c1-future-in-past", "adv-c1-relatives-advanced",
    "adv-c1-modal-nuance", "adv-c1-phrasal-ideas", "adv-c1-word-formation",
    "adv-c2-conditional-inversion", "adv-c2-fronting", "adv-c2-reduced-clauses",
    "adv-c2-comparison", "adv-c2-formal-linking", "adv-c2-phrasal-attitude",
    "adv-c2-confusables", "adv-c2-intensifiers"
  ];

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
