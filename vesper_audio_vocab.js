/* =====================================================================
 * VESPER · PALABRAS QUE SE OYEN EN CADA AUDIO (2026-11-09) — A MANO
 * ---------------------------------------------------------------------
 * El dueño: "el vocabulario no coincide con lo que la lección quiere".
 * Medido: sólo el 35 % de las palabras de la lista de cada lección de
 * Core Practice sale de verdad en su audio (niveles 2–4 casi 0 de 12).
 * Las listas vienen del LIBRO (vocab_drill de cada lección), y los
 * audios se escribieron después, con otras palabras.
 *
 * lesson.html (pestaña Vocabulary) junta dos fuentes:
 *   1. las palabras del libro que SÍ salen en lo que el alumno oye, y
 *   2. las de este archivo: palabras clave de la transcripción que el
 *      libro no tenía, escritas a mano con definición sencilla y glosa.
 * Cada ficha enseña la línea del audio donde se oye. Lo que el libro trae
 * y el audio no dice baja a "Más palabras de tu libro".
 *
 * Formato por mazo (deckKey de lesson_app.js: cp<nivel>-<n>, bas<n>-<n>
 * o el nombre del mp3):
 *   [término, categoría, definición (inglés fácil), español, forma oída?]
 * "forma oída" sólo cuando el audio la dice distinta del término
 * ("put your foot in it" → "put my foot in it").
 *
 * noMain: lecciones cuyo audio principal NO es la transcripción que
 * guardamos; ahí sólo cuenta el diálogo modelo. Vacía desde 2026-11-10:
 * los 50 audios que no cuadraban (niveles 2 y 4 pares, todo el 6) se
 * grabaron de nuevo leyendo la lectura del libro (_scripts/cp_reading_voice.py),
 * y los del nivel 3 par ya eran los clips "View 2" del libro: sólo faltaba
 * su transcripción. Si otro audio deja de cuadrar, va aquí.
 * ===================================================================== */
window.AUDIO_VOCAB = {
  noMain: [],
  decks: {
    /* ---------- Core Practice · Nivel 1 (huecos) ---------- */
    "cp1-9": [
      ["have a seat", "expression", "sit down (a polite way to say it)", "toma asiento"],
      ["strength", "noun", "something you are very good at", "fortaleza, punto fuerte"],
      ["weakness", "noun", "something you are not very good at", "debilidad, punto débil"],
      ["organised", "adjective", "tidy and good at planning", "organizado"],
      ["deadline", "noun", "the last day or time to finish something", "fecha límite"],
      ["under pressure", "expression", "when there is a lot of stress", "bajo presión"],
      ["fluent", "adjective", "able to speak a language easily and well", "con fluidez"],
      ["give notice", "expression", "tell your boss you are leaving, some time before you go", "avisar con anticipación", "give two weeks' notice"],
      ["look forward to", "phrasal verb", "feel happy about something that will happen", "esperar con gusto"]
    ],
    "cp1-14": [
      ["smartphone", "noun", "a phone that works like a small computer", "teléfono inteligente"],
      ["screen", "noun", "the glass part of a phone, TV or computer", "pantalla"],
      ["scroll", "verb", "move up and down on a screen with your finger", "deslizar, hacer scroll", "scrolling"],
      ["face to face", "expression", "in person, not on a screen", "cara a cara"],
      ["tutorial", "noun", "a video or lesson that shows you how to do something", "tutorial"],
      ["website", "noun", "a place on the internet with pages you can visit", "sitio web"],
      ["social media", "noun", "apps where people share photos and messages", "redes sociales"],
      ["addiction", "noun", "when you cannot stop doing something", "adicción"],
      ["compromise", "noun", "an agreement where both people give a little", "acuerdo, término medio"],
      ["put away", "phrasal verb", "put something back in its place", "guardar", "put it away"]
    ],
    "cp1-18": [
      ["once upon a time", "expression", "the words that start a fairy tale", "había una vez"],
      ["fisherman", "noun", "a person who catches fish as a job", "pescador"],
      ["net", "noun", "a fishing tool made of string with holes", "red"],
      ["golden", "adjective", "made of gold, or the colour of gold", "dorado"],
      ["wish", "noun", "something you want very much, sometimes by magic", "deseo"],
      ["boat", "noun", "a small ship", "barco, lancha"],
      ["jealous", "adjective", "unhappy because someone has what you want", "celoso, envidioso"],
      ["loyal", "adjective", "always there to help and protect you", "leal, fiel"],
      ["share", "verb", "give part of what you have to other people", "compartir"],
      ["greedy", "adjective", "always wanting more and more", "codicioso, avaro"]
    ],

    /* ---------- Core Practice · Nivel 2 ---------- */
    "cp2-1": [
      ["Is this seat taken?", "expression", "a polite way to ask if a chair is free", "¿Está ocupado este asiento?", "is this seat taken"],
      ["What are the chances?", "expression", "said when a surprising coincidence happens", "¡Qué casualidad!", "what are the chances"],
      ["How have you been?", "expression", "a friendly question when you meet someone again", "¿Cómo has estado?", "how have you been"],
      ["put your foot in it", "idiom", "say something embarrassing by accident", "meter la pata", "put my foot in it"],
      ["call off", "phrasal verb", "cancel something that was planned", "cancelar", "called off"],
      ["change the subject", "expression", "start talking about something different", "cambiar de tema", "changing the subject"],
      ["by the way", "expression", "used to start talking about a new topic", "por cierto"],
      ["grab lunch", "expression", "have a quick, informal lunch together", "ir a comer algo"]
    ],
    "cp2-2": [
      ["return", "verb", "take something back to the shop", "devolver"],
      ["stop working", "expression", "break; not work any more", "dejar de funcionar", "stopped working"],
      ["receipt", "noun", "the paper that shows you paid for something", "recibo, ticket"],
      ["replacement", "noun", "a new one that you get instead of the old one", "reemplazo, cambio"],
      ["I'd rather", "expression", "I prefer to", "preferiría"],
      ["fail", "verb", "stop working or not do what it should", "fallar", "failed"],
      ["frustrating", "adjective", "making you feel annoyed because things go wrong", "frustrante"],
      ["quality", "noun", "how good something is", "calidad"],
      ["process", "verb", "do the official steps to complete something", "tramitar, procesar"],
      ["apologise", "verb", "say you are sorry", "disculparse"]
    ],
    "cp2-3": [
      ["budget", "noun", "the amount of money you can spend", "presupuesto"],
      ["meet someone halfway", "idiom", "accept a point in the middle of two positions", "llegar a un punto medio", "meet you halfway"],
      ["final offer", "noun", "the last price you are willing to pay or accept", "oferta final"],
      ["take it or leave it", "idiom", "accept this offer or say no; there is no more negotiation", "lo tomas o lo dejas"],
      ["throw in", "phrasal verb", "add something extra for free", "dar de pilón, incluir gratis"],
      ["bluff", "verb", "pretend something to get a better deal", "blofear, fingir", "bluffing"],
      ["genuine", "adjective", "real, not fake", "auténtico"],
      ["handmade", "adjective", "made by a person's hands, not by a machine", "hecho a mano"]
    ],
    "cp2-4": [
      ["miss a connection", "expression", "arrive too late to take your next flight", "perder la conexión", "missed my connection"],
      ["land", "verb", "come down to the ground (for a plane)", "aterrizar", "landed"],
      ["disaster", "noun", "a very bad situation", "desastre"],
      ["rebook", "verb", "change your ticket to another flight or time", "cambiar la reservación"],
      ["suitcase", "noun", "a bag with a handle for your clothes when you travel", "maleta"],
      ["transfer", "verb", "move from one place to another", "transferir, pasar", "transferred"],
      ["meal voucher", "noun", "a ticket you can use to get free food", "vale de comida"],
      ["gate", "noun", "the door at the airport where you get on the plane", "puerta de embarque"],
      ["boarding", "noun", "getting on the plane", "abordaje, embarque"]
    ],
    "cp2-5": [
      ["resume", "noun", "a document with your studies and work history (also CV)", "currículum"],
      ["candidate", "noun", "a person who applies for a job", "candidato"],
      ["supplier", "noun", "a company that sells you products or materials", "proveedor"],
      ["anticipate", "verb", "see that something will happen before it happens", "anticipar, prever", "anticipated"],
      ["perfectionist", "noun", "a person who wants everything to be perfect", "perfeccionista"],
      ["overwhelming", "adjective", "too much to deal with", "abrumador"],
      ["implement", "verb", "start using a plan or system", "implementar", "implemented"],
      ["hire", "verb", "give someone a job", "contratar"]
    ],
    "cp2-6": [
      ["tablet", "noun", "a flat computer with a touch screen", "tableta"],
      ["technical support", "noun", "help with computers and devices", "soporte técnico"],
      ["get on with", "phrasal verb", "make progress with something", "irle (bien o mal) con algo", "getting on with"],
      ["video-call", "verb", "talk to someone on a call where you can see each other", "hacer videollamada", "video-calls"],
      ["update", "verb", "install the newest version", "actualizar"],
      ["refuse", "verb", "say no; not agree to do something", "negarse", "refuses"],
      ["patience", "noun", "staying calm when something takes a long time", "paciencia"],
      ["step-by-step", "adjective", "one small part at a time, in order", "paso a paso"],
      ["thumb", "noun", "the short, thick finger on your hand", "pulgar"]
    ],
    "cp2-7": [
      ["glacier", "noun", "a huge river of ice in the mountains", "glaciar"],
      ["tipping point", "noun", "the moment when a small change causes a big, permanent one", "punto de no retorno", "tipping points"],
      ["recycling", "noun", "using old bottles, paper, etc. again to make new things", "reciclaje"],
      ["a drop in the ocean", "idiom", "too small to make a real difference", "una gota en el mar"]
    ],
    "cp2-8": [
      ["headline", "noun", "the title of a news story", "titular, encabezado"],
      ["fake", "adjective", "not real or not true", "falso"],
      ["share", "noun", "one time someone posts something again on social media", "compartido (en redes)", "shares"],
      ["source", "noun", "the place where information comes from", "fuente"],
      ["study", "noun", "a piece of scientific research", "estudio"],
      ["author", "noun", "the person who wrote something", "autor"],
      ["research", "noun", "careful work to find out facts", "investigación"],
      ["journalist", "noun", "a person who writes the news", "periodista"],
      ["spread", "verb", "send something to many people", "difundir", "spreading"],
      ["nonsense", "noun", "something silly or not true", "tonterías"]
    ],
    "cp2-9": [
      ["sign up for", "phrasal verb", "join or register for something", "inscribirse", "signed up for"],
      ["cumulative", "adjective", "growing a little at a time", "acumulativo"],
      ["misinformation", "noun", "information that is wrong", "desinformación"],
      ["brisk", "adjective", "quick and full of energy (a walk)", "a paso rápido, enérgico"],
      ["misconception", "noun", "an idea that many people have but is wrong", "idea equivocada"]
    ],
    "cp2-10": [
      ["salary", "noun", "the money you earn from your job", "sueldo"],
      ["food delivery", "noun", "food that a restaurant brings to your home", "comida a domicilio"],
      ["painfully accurate", "expression", "so true that it hurts", "dolorosamente cierto"],
      ["needs", "noun", "things you must have, like food and rent", "necesidades"],
      ["wants", "noun", "things you would like but don't need", "gustos, caprichos"],
      ["savings", "noun", "money you keep and don't spend", "ahorros"],
      ["automatically", "adverb", "by itself, without you doing anything", "automáticamente"],
      ["get paid", "expression", "receive your salary", "cobrar"],
      ["start small", "expression", "begin with a little and grow later", "empezar poco a poco"]
    ],
    "cp2-11": [
      ["highlight reel", "noun", "only the best moments, not the full story", "solo lo mejor, la versión editada"],
      ["comments section", "noun", "the place under a post where people write", "sección de comentarios"],
      ["detox", "noun", "a break from something that is bad for you", "desintoxicación"],
      ["notifications", "noun", "messages your phone shows to tell you something new", "notificaciones"],
      ["baby steps", "idiom", "very small steps when you start something", "pasitos, poco a poco"]
    ],
    "cp2-12": [
      ["confuse", "verb", "make someone not understand", "confundir", "confused"],
      ["stranger", "noun", "a person you don't know", "desconocido", "strangers"],
      ["platform", "noun", "the place where you wait for a train", "andén"],
      ["stare", "verb", "look at someone for a long time", "quedarse mirando", "stared"],
      ["take off", "phrasal verb", "remove clothes or shoes", "quitarse", "taking off"],
      ["indoors", "adverb", "inside a building", "adentro, en interiores"],
      ["shock", "verb", "surprise someone very much", "impactar, sorprender", "shocked"],
      ["be used to", "expression", "know something well because it is normal for you", "estar acostumbrado a", "used to"],
      ["habit", "noun", "something you do often, almost without thinking", "hábito", "habits"]
    ],
    "cp2-13": [
      ["lecture", "noun", "a talk that a teacher gives to a class at university", "clase, cátedra"],
      ["standardized test", "noun", "the same exam for every student", "examen estandarizado"],
      ["obedient", "adjective", "doing what you are told", "obediente"],
      ["debt", "noun", "money that you owe", "deuda"],
      ["skyrocket", "verb", "go up very fast", "dispararse", "skyrocketed"],
      ["overhaul", "noun", "a complete change to make a system work better", "reforma total"]
    ],
    "cp2-14": [
      ["anniversary", "noun", "the same date as an important day in the past", "aniversario"],
      ["forget", "verb", "not remember", "olvidar", "forgot"],
      ["apologise", "verb", "say you are sorry", "disculparse", "apologised"],
      ["excuse", "noun", "a reason you give to explain a mistake", "excusa", "excuses"],
      ["mess up", "phrasal verb", "make a mistake", "regarla, echarlo a perder", "messed up"],
      ["surprise", "noun", "something nice that someone doesn't expect", "sorpresa"],
      ["thoughtful", "adjective", "kind and thinking about other people", "detallista, considerado"],
      ["communication", "noun", "talking and listening to each other", "comunicación"]
    ],
    "cp2-15": [
      ["flat", "noun", "an apartment (British English)", "departamento"],
      ["renewal", "noun", "making a contract continue for more time", "renovación"],
      ["rent increase", "noun", "when the monthly rent goes up", "aumento de renta"],
      ["outrageous", "adjective", "very unfair and shocking", "indignante, escandaloso"],
      ["inflation", "noun", "when prices go up over time", "inflación"],
      ["maintenance", "noun", "repairs and care for a building", "mantenimiento"],
      ["plumbing", "noun", "the water pipes in a building", "plomería"],
      ["leak", "verb", "let water escape through a hole", "gotear", "leaks"],
      ["reliable", "adjective", "you can trust them", "confiable, cumplido"],
      ["make an offer", "expression", "say the price you will pay", "hacer una oferta"]
    ],
    "cp2-16": [
      ["report", "verb", "tell the police about a crime", "denunciar, reportar"],
      ["stolen", "adjective", "taken by a thief", "robado"],
      ["describe", "verb", "say what something looks like", "describir"],
      ["lock", "verb", "close with a key or a lock", "poner candado", "locked"],
      ["witness", "noun", "a person who saw what happened", "testigo", "witnesses"],
      ["footage", "noun", "video from a camera", "grabación, video"],
      ["fill in", "phrasal verb", "write the information in a form", "llenar (un formulario)"],
      ["officer", "noun", "a police officer", "oficial, agente"]
    ],
    "cp2-17": [
      ["exhibition", "noun", "a show of art in a museum or gallery", "exposición"],
      ["gallery", "noun", "a building where people go to see art", "galería"],
      ["uneducated", "adjective", "without much education", "inculto"],
      ["isolation", "noun", "the feeling of being alone, apart from others", "aislamiento"]
    ],
    "cp2-18": [
      ["procrastination", "noun", "leaving tasks for later again and again", "procrastinación"],
      ["laziness", "noun", "not wanting to work", "flojera, pereza"],
      ["emotion management", "noun", "controlling how you feel", "manejo de emociones"],
      ["due", "adjective", "must be finished or delivered (at a time)", "para entregar"],
      ["essay", "noun", "a short piece of writing for school", "ensayo, redacción"],
      ["anxious", "adjective", "worried and nervous", "ansioso"],
      ["relief", "noun", "the good feeling when stress stops", "alivio"],
      ["comfort", "noun", "a nice, easy feeling", "comodidad, consuelo"]
    ],
    "cp2-19": [
      ["language model", "noun", "an AI that writes by predicting the next word", "modelo de lenguaje"],
      ["illusion", "noun", "something that seems real but is not", "ilusión, apariencia"],
      ["sentience", "noun", "the ability to feel and be aware", "conciencia, capacidad de sentir"],
      ["pull the plug", "idiom", "stop something by cutting its power", "desconectar, ponerle fin"],
      ["replace", "verb", "take the place of someone or something", "reemplazar"],
      ["consciousness", "noun", "being awake and aware of yourself", "conciencia"]
    ],
    "cp2-20": [
      ["proud", "adjective", "happy about something you did well", "orgulloso"],
      ["certification exam", "noun", "an official exam that proves your level", "examen de certificación"],
      ["CV", "noun", "a document with your studies and work history", "currículum"],
      ["aim for", "phrasal verb", "try to get or reach", "apuntar a", "aiming for"],
      ["advanced course", "noun", "a course for a high level", "curso avanzado"],
      ["brave", "adjective", "not afraid to do something difficult", "valiente"],
      ["keep practising", "expression", "continue to practise", "seguir practicando"],
      ["translator app", "noun", "an app that translates words for you", "app de traducción", "translator apps"]
    ],

    /* ---------- Core Practice · Nivel 3 ----------
       Ojo: el audio principal de las lecciones impares NO trata el tema
       del título: es la reacción a la historia del libro (rescate en la
       montaña, el detective, la lotería…). La lista sigue a lo que se oye. */
    "cp3-1": [
      ["correlation isn't causation", "expression", "two things happening together does not prove one causes the other", "correlación no implica causalidad"],
      ["evidence", "noun", "facts that show something is true", "evidencia, pruebas"],
      ["cite", "verb", "mention something as proof", "citar"],
      ["counter", "noun", "an answer against someone's argument", "contraargumento"],
      ["rescue", "noun", "saving someone from danger", "rescate"],
      ["trapped", "adjective", "not able to escape", "atrapado"],
      ["avoidable", "adjective", "possible to stop from happening", "evitable"],
      ["prevent", "verb", "stop something before it happens", "prevenir, evitar", "prevented"],
      ["ignore", "verb", "pay no attention to something", "ignorar", "ignored"],
      ["forecast", "noun", "a report that says what the weather will be", "pronóstico"],
      ["preparation", "noun", "getting ready before you do something", "preparación"]
    ],
    "cp3-2": [
      ["dam", "noun", "a wall built across a river to hold back water", "presa"],
      ["water supply", "noun", "the water a place can get and use", "suministro de agua"],
      ["unacceptable", "adjective", "too bad to accept", "inaceptable"],
      ["switch off", "phrasal verb", "turn off", "apagar", "switch it off"],
      ["guarantee", "verb", "promise firmly that something will happen", "garantizar", "guaranteed"],
      ["dry season", "noun", "the part of the year with little rain", "temporada de secas"],
      ["fixed price", "noun", "a price that does not change", "precio fijo"],
      ["energy security", "noun", "having enough reliable energy", "seguridad energética"],
      ["draft", "verb", "write a first version of something", "redactar (un borrador)"],
      ["agreement", "noun", "a decision that both sides accept", "acuerdo"]
    ],
    "cp3-3": [
      ["recall", "noun", "when a company asks buyers to return a faulty product", "retiro del mercado"],
      ["fault", "noun", "a problem that stops something working properly", "falla, defecto"],
      ["admit guilt", "expression", "accept that you did something wrong", "admitir culpa", "admits guilt"],
      ["cover-up", "noun", "an attempt to hide the truth", "encubrimiento", "cover-ups"],
      ["on our own terms", "expression", "in the way we decide, not others", "en nuestros propios términos"],
      ["robbery", "noun", "stealing from a place or a person", "robo, asalto", "robberies"],
      ["brag", "verb", "talk proudly about what you did", "presumir"],
      ["fingerprints", "noun", "the marks your fingers leave on things", "huellas digitales"],
      ["show off", "phrasal verb", "do something to impress people", "presumir, lucirse", "showing off"],
      ["mastermind", "noun", "the clever person who plans a crime", "el cerebro (de un plan)"]
    ],
    "cp3-4": [
      ["dilemma", "noun", "a hard choice between two bad options", "dilema"],
      ["divert", "verb", "make something change direction", "desviar"],
      ["outweigh", "verb", "be more important than", "pesar más que"],
      ["outcome", "noun", "the result of something", "resultado", "outcomes"],
      ["utilitarian", "noun", "a person who judges actions by their results for the most people", "utilitarista", "utilitarians"],
      ["deontologist", "noun", "a person who judges actions by rules and duties", "deontologista", "deontologists"],
      ["crudely", "adverb", "in a simple, rough way", "a grandes rasgos"]
    ],
    "cp3-5": [
      ["demand", "noun", "how much of something people want to buy", "demanda"],
      ["supply chain", "noun", "the companies that make and move a product", "cadena de suministro", "supply chains"],
      ["interest rate", "noun", "the price of borrowing money", "tasa de interés", "interest rates"],
      ["credit", "noun", "money you borrow", "crédito"],
      ["cool", "verb", "make less hot or less strong", "enfriar", "cools"],
      ["bank teller", "noun", "a person who works at the counter of a bank", "cajero de banco"],
      ["retrain", "verb", "learn the skills for a new job", "volver a capacitarse"],
      ["warehouse", "noun", "a big building for storing goods", "almacén, bodega"],
      ["repetitive", "adjective", "doing the same thing again and again", "repetitivo"],
      ["pessimist", "noun", "a person who expects bad things", "pesimista", "pessimists"]
    ],
    "cp3-6": [
      ["journal", "noun", "a magazine for scientific research", "revista científica"],
      ["funded by", "expression", "paid for by", "financiado por"],
      ["manufacturer", "noun", "a company that makes products", "fabricante"],
      ["review", "verb", "check something carefully", "revisar", "reviewed"],
      ["replicate", "verb", "repeat an experiment to see if you get the same result", "replicar", "replicated"],
      ["anecdote", "noun", "a short story about one person's experience", "anécdota"],
      ["independent", "adjective", "not controlled by anyone else", "independiente"],
      ["consensus", "noun", "what most people agree on", "consenso"]
    ],
    "cp3-7": [
      ["novel", "noun", "a long book that tells a story", "novela", "novels"],
      ["fiction", "noun", "stories that are invented", "ficción"],
      ["grief", "noun", "deep sadness, especially after a death", "duelo, pena"],
      ["widow", "noun", "a woman whose husband has died", "viuda"],
      ["empathy", "noun", "understanding how other people feel", "empatía"],
      ["recurring", "adjective", "happening again and again", "recurrente"],
      ["unprepared", "adjective", "not ready", "sin prepararse"],
      ["corridor", "noun", "a long passage inside a building", "pasillo", "corridors"],
      ["anxiety", "noun", "a feeling of worry and nervousness", "ansiedad"],
      ["rehearse", "verb", "practise before you perform", "ensayar", "rehearsed"]
    ],
    "cp3-8": [
      ["comfort zone", "noun", "situations where you feel safe and relaxed", "zona de confort"],
      ["moderate", "adjective", "not too much and not too little", "moderado"],
      ["performance", "noun", "how well you do something", "desempeño, rendimiento"],
      ["panic", "noun", "sudden, very strong fear", "pánico"],
      ["paralysed", "adjective", "unable to move or act", "paralizado"],
      ["challenge", "noun", "something difficult that tests you", "reto, desafío"],
      ["royalties", "noun", "money you get each time your work is sold", "regalías"]
    ],
    "cp3-9": [
      ["environmentalist", "noun", "a person who works to protect nature", "ambientalista"],
      ["nuclear power", "noun", "energy made by splitting atoms", "energía nuclear"],
      ["low-carbon", "adjective", "producing little CO2", "bajo en carbono"],
      ["waste", "noun", "material that is left over and thrown away", "residuos, desechos"],
      ["grid", "noun", "the network that carries electricity", "red eléctrica"],
      ["talentless", "adjective", "without any talent", "sin talento"],
      ["insulting", "adjective", "rude and offensive", "ofensivo"],
      ["follower", "noun", "a person who follows an account on social media", "seguidor", "followers"],
      ["consistency", "noun", "doing something regularly, without stopping", "constancia"],
      ["snobbery", "noun", "thinking you are better than others", "esnobismo"]
    ],
    "cp3-10": [
      ["fine", "verb", "make someone pay money as a punishment", "multar", "fines"],
      ["consent", "noun", "agreement or permission", "consentimiento"],
      ["turnout", "noun", "the number of people who vote", "participación electoral"],
      ["court", "verb", "try to win someone's support", "buscar el apoyo de"],
      ["ballot", "noun", "the paper you use to vote", "boleta", "ballots"],
      ["spoil the ballot", "expression", "make your vote not count, on purpose", "anular el voto"],
      ["jury service", "noun", "the duty to be on a jury in court", "servicio de jurado"],
      ["civic", "adjective", "related to the duties of citizens", "cívico"]
    ],
    "cp3-11": [
      ["explorer", "noun", "a person who travels to unknown places", "explorador", "explorers"],
      ["colonised", "adjective", "ruled by another country that took the land", "colonizado"],
      ["source", "noun", "a document or person that gives information", "fuente", "sources"],
      ["discipline", "noun", "an area of study", "disciplina"],
      ["lottery", "noun", "a game where you buy a ticket to win money", "lotería"],
      ["sudden", "adjective", "happening quickly and unexpectedly", "repentino"],
      ["overnight", "adverb", "very suddenly, in one night", "de la noche a la mañana"],
      ["investment", "noun", "money you put into something to make more", "inversión"],
      ["reveal", "verb", "show something that was hidden", "revelar", "reveals"],
      ["amplify", "verb", "make something bigger or stronger", "amplificar", "amplifies"]
    ],
    "cp3-12": [
      ["feed", "noun", "the list of posts you see in an app", "feed, muro"],
      ["coincidence", "noun", "when two things happen together by chance", "coincidencia"],
      ["signal", "noun", "a piece of information a system can use", "señal", "signals"],
      ["overhear", "verb", "hear something you were not meant to hear", "escuchar sin querer", "overheard"],
      ["terms", "noun", "the rules you accept to use a service", "términos y condiciones"],
      ["regulation", "noun", "official rules made by the government", "regulación"],
      ["permissions", "noun", "what an app is allowed to do on your phone", "permisos"],
      ["personalised ads", "noun", "adverts chosen for you from your data", "anuncios personalizados"]
    ],
    "cp3-13": [
      ["pivot", "verb", "change the direction of a business", "cambiar de rumbo"],
      ["feature", "noun", "one part or function of a product", "función, característica"],
      ["layoffs", "noun", "when a company makes workers leave their jobs", "despidos"],
      ["submersible", "noun", "a small vehicle that goes deep under the sea", "sumergible"],
      ["creature", "noun", "a living animal", "criatura", "creatures"],
      ["funding", "noun", "money given for a project", "financiamiento"],
      ["pressure", "noun", "the force of water pressing on something", "presión"],
      ["trench", "noun", "a very deep, long hole in the ocean floor", "fosa marina"],
      ["species", "noun", "a group of animals or plants of the same type", "especie"],
      ["frontier", "noun", "the edge of what we know or have explored", "frontera"]
    ],
    "cp3-14": [
      ["intent", "noun", "what you plan to do", "intención (dolo)"],
      ["theft", "noun", "stealing", "robo"],
      ["counsel", "noun", "a lawyer (how you address one in court)", "abogado (en un juicio)"],
      ["prove", "verb", "show that something is true", "probar, demostrar", "proved"],
      ["reasonable", "adjective", "sensible and fair", "razonable"],
      ["jury", "noun", "a group of people who decide a case in court", "jurado", "juries"],
      ["see you in court", "expression", "we will settle this in front of a judge", "nos vemos en el tribunal"]
    ],
    "cp3-15": [
      ["headline", "noun", "the title of a news story", "titular"],
      ["outrage", "noun", "a strong feeling of anger", "indignación"],
      ["business model", "noun", "the way a company makes money", "modelo de negocio"],
      ["paragraph", "noun", "a group of sentences in a text", "párrafo"],
      ["smoke", "noun", "the grey cloud that comes from a fire", "humo"],
      ["burning", "adjective", "on fire", "en llamas"],
      ["scars", "noun", "marks left on the skin after an injury", "cicatrices"],
      ["double shift", "noun", "two work periods one after the other", "doble turno", "double shifts"],
      ["courage", "noun", "the ability to do something that frightens you", "valor, valentía"],
      ["exhausted", "adjective", "extremely tired", "agotado"]
    ],
    "cp3-16": [
      ["reinvent", "verb", "change something so it seems new", "reinventar", "reinvented"],
      ["furious", "adjective", "very angry", "furioso"],
      ["appropriation", "noun", "taking something from another culture without respect or credit", "apropiación"],
      ["appreciation", "noun", "respectful admiration", "aprecio, apreciación"],
      ["credit", "verb", "say who something came from", "dar crédito"],
      ["cash in on", "phrasal verb", "make money from something", "sacar provecho de"],
      ["erasure", "noun", "making something or someone disappear from the story", "borrado, invisibilización"],
      ["cuisine", "noun", "a style of cooking", "cocina, gastronomía"],
      ["compensation", "noun", "money paid for something you used or took", "compensación"]
    ],
    "cp3-17": [
      ["top marks", "noun", "the highest grades", "las mejores calificaciones"],
      ["applicant", "noun", "a person who applies for a place or a job", "aspirante", "applicants"],
      ["criteria", "noun", "the standards used to judge something", "criterios"],
      ["excel", "verb", "be very good at something", "destacar, sobresalir"],
      ["curse", "noun", "words that are believed to bring bad luck", "maldición", "curses"],
      ["conspiracy theory", "noun", "a belief that a secret group is behind events", "teoría de la conspiración", "conspiracy theories"],
      ["ritual", "noun", "an action you always repeat in the same way", "ritual", "rituals"],
      ["pattern", "noun", "something that repeats in a regular way", "patrón"],
      ["superstition", "noun", "a belief in luck or magic without proof", "superstición"],
      ["ancestor", "noun", "a family member who lived long ago", "antepasado"]
    ],
    "cp3-18": [
      ["grind", "verb", "work very hard for a long time", "matarse trabajando"],
      ["ship", "verb", "finish and deliver a product", "entregar, lanzar", "ships"],
      ["sleep debt", "noun", "the sleep you need but did not get", "deuda de sueño"],
      ["focus", "noun", "the ability to pay attention", "concentración"],
      ["consolidate", "verb", "make something strong and fixed", "consolidar", "consolidates"],
      ["all-nighter", "noun", "a night when you stay awake to work or study", "desvelada"],
      ["productivity hack", "noun", "a trick to get more done", "truco de productividad"]
    ],
    "cp3-19": [
      ["unexplored", "adjective", "not explored yet", "inexplorado"],
      ["priorities", "noun", "the things that are most important", "prioridades"],
      ["finite", "adjective", "limited; it can run out", "finito, limitado"],
      ["rover", "noun", "a vehicle that explores another planet", "vehículo explorador"],
      ["spin off", "phrasal verb", "produce something new as a side result", "generar como derivado", "spins off"],
      ["bankroll", "verb", "pay for something", "financiar"],
      ["runaway", "adjective", "out of control", "desbocado, sin control"],
      ["lever", "noun", "a bar you pull to make a machine work", "palanca"],
      ["selfish", "adjective", "thinking only about yourself", "egoísta"],
      ["identical", "adjective", "exactly the same", "idéntico"]
    ],
    "cp3-20": [
      ["judge", "verb", "form an opinion about someone", "juzgar"],
      ["harshly", "adverb", "in a severe, unkind way", "con dureza"],
      ["habit", "noun", "something you do often", "hábito", "habits"],
      ["horror story", "noun", "a frightening story", "historia de terror"],
      ["my money's on", "expression", "I bet on", "yo apuesto por"],
      ["the cloud", "noun", "online storage on the internet", "la nube"],
      ["extinction", "noun", "when something disappears forever", "extinción"]
    ],

    /* ---------- Core Practice · Nivel 4 (pares: sólo el diálogo modelo) ---------- */
    "cp4-2": [
      ["mood", "noun", "the feeling of a place or a moment", "ambiente, estado de ánimo"],
      ["evidence", "noun", "details that prove something", "evidencia"],
      ["kettle", "noun", "a pot for boiling water", "tetera, hervidor"],
      ["disuse", "noun", "not being used for a long time", "desuso"],
      ["grief", "noun", "deep sadness after a loss", "duelo"],
      ["artifact", "noun", "an object that tells a story", "objeto, artefacto", "artifacts"],
      ["frame", "verb", "put a picture in a frame to keep it", "enmarcar"]
    ],
    "cp4-4": [
      ["villain", "noun", "the bad character in a story", "villano"],
      ["scene", "noun", "one part of a story in one place and time", "escena"],
      ["evil", "adjective", "very bad and cruel", "malvado"],
      ["costume", "noun", "clothes to look like someone else; a fake surface", "disfraz"],
      ["chaos", "noun", "complete disorder", "caos"],
      ["cruelty", "noun", "behaviour that causes pain on purpose", "crueldad"],
      ["mercy", "noun", "kindness to someone you could punish", "misericordia, piedad"],
      ["plot", "noun", "the events of a story", "trama"]
    ],
    "cp4-6": [
      ["dialogue", "noun", "the words characters say", "diálogo"],
      ["ex", "noun", "a former partner", "ex (pareja)", "exes"],
      ["funeral", "noun", "the ceremony after someone dies", "funeral"],
      ["resent", "verb", "feel angry about something unfair", "guardar rencor"],
      ["affair", "noun", "a secret romantic relationship", "aventura (amorosa)"],
      ["surface", "verb", "come up and become visible", "salir a la superficie", "surfaces"],
      ["subtext", "noun", "the meaning under the words", "subtexto"],
      ["iceberg", "noun", "a huge piece of ice, mostly under water", "iceberg"]
    ],
    "cp4-8": [
      ["capital", "noun", "the main city of a country", "capital"],
      ["kingdom", "noun", "a country ruled by a king or queen", "reino"],
      ["granary", "noun", "a building where grain is stored", "granero", "granaries"],
      ["consequences", "noun", "the results of an action", "consecuencias"],
      ["aftermath", "noun", "the period after a big event", "secuelas"],
      ["succession", "noun", "who becomes the next ruler", "sucesión"],
      ["famine", "noun", "a time when there is not enough food", "hambruna"],
      ["prophecy", "noun", "a prediction about the future", "profecía"],
      ["throne", "noun", "the chair of a king or queen; royal power", "trono", "thrones"]
    ],
    "cp4-10": [
      ["diary", "noun", "a book where you write about your days", "diario"],
      ["contradict", "verb", "say the opposite of", "contradecir", "contradicts"],
      ["eyewitness", "noun", "a person who saw something happen", "testigo presencial", "eyewitnesses"],
      ["shrug", "noun", "lifting your shoulders to show you don't know", "encogerse de hombros"],
      ["verdict", "noun", "the final decision in a trial", "veredicto"],
      ["transcript", "noun", "a written copy of what was said", "transcripción"],
      ["certainty", "noun", "being completely sure", "certeza"],
      ["harbour", "noun", "a place where boats stay safe", "puerto"],
      ["gap", "noun", "a missing part", "hueco, vacío", "gaps"]
    ],
    "cp4-12": [
      ["grieve", "verb", "feel deep sadness after a loss", "estar de luto", "grieves"],
      ["indoors", "adverb", "inside a building", "adentro"],
      ["editor", "noun", "the person who checks and improves a text", "editor"],
      ["wiring", "noun", "the hidden wires; how something works inside", "el cableado"],
      ["neighbours", "noun", "people who live near you", "vecinos"],
      ["precise", "adjective", "exact", "preciso"],
      ["miracle", "noun", "an amazing event that seems impossible", "milagro"],
      ["bureaucratic", "adjective", "full of official details and rules", "burocrático"],
      ["believable", "adjective", "easy to believe", "creíble"]
    ],
    "cp4-14": [
      ["unbroken", "adjective", "continuous, without stopping", "ininterrumpido"],
      ["shot", "noun", "one continuous piece of filming", "toma"],
      ["gimmick", "noun", "a trick to get attention", "truco, artificio"],
      ["cut", "noun", "a change from one shot to another", "corte", "cuts"],
      ["mirror", "verb", "be very similar to", "reflejar", "mirrors"],
      ["vanity", "noun", "too much pride in yourself", "vanidad"],
      ["decoration", "noun", "something added only to look nice", "adorno, decoración"],
      ["suffocation", "noun", "the feeling of not being able to breathe", "asfixia"],
      ["thesis", "noun", "the main idea someone argues", "tesis"]
    ],
    "cp4-16": [
      ["confirm", "verb", "say that something is true", "confirmar"],
      ["charity", "noun", "an organisation that helps people", "organización benéfica"],
      ["firm", "noun", "a company", "empresa, firma"],
      ["invoice", "noun", "a document that asks for payment", "factura", "invoices"],
      ["insider", "noun", "a person inside an organisation", "fuente interna"],
      ["on record", "expression", "speaking officially, with your name", "de manera oficial"],
      ["anonymous", "adjective", "without a name", "anónimo"],
      ["witch hunt", "noun", "an unfair attack on someone", "cacería de brujas"],
      ["leak", "verb", "give secret information to the press", "filtrar"],
      ["verbatim", "adverb", "using exactly the same words", "textualmente"]
    ],
    "cp4-18": [
      ["panel", "noun", "one picture box in a comic", "viñeta"],
      ["crowned", "adjective", "given a crown; made king", "coronado"],
      ["gutter", "noun", "the space between comic panels", "espacio entre viñetas"],
      ["outsource", "verb", "give a job to someone outside", "subcontratar"],
      ["seam", "noun", "the line where two pieces join", "costura, unión", "seams"],
      ["cliffhanger", "noun", "an exciting moment that stops before the ending", "final de suspenso"],
      ["revelation", "noun", "a surprising fact that is shown", "revelación"],
      ["blueprint", "noun", "a detailed plan of a building", "plano", "blueprints"]
    ],
    "cp4-20": [
      ["publish", "verb", "make a text available to the public", "publicar", "published"],
      ["intention", "noun", "what you plan or mean to do", "intención"],
      ["trench", "noun", "a long ditch that soldiers fight from", "trinchera", "trenches"],
      ["barbed", "adjective", "with sharp points (like barbed wire)", "con púas"],
      ["armistice", "noun", "an agreement to stop fighting", "armisticio"],
      ["smuggle in", "phrasal verb", "bring in secretly", "meter a escondidas", "smuggled in"],
      ["confess", "verb", "admit something", "confesar", "confessing"],
      ["quotation", "noun", "words copied from a text", "cita textual", "quotations"],
      ["convict", "verb", "decide officially that someone is guilty", "condenar"]
    ],

    /* ---------- Core Practice · Nivel 5 ---------- */
    "cp5-1": [
      ["expiry date", "noun", "the last day you should eat a food", "fecha de caducidad", "expiry dates"],
      ["convenience", "noun", "something that makes life easier", "comodidad, practicidad"],
      ["food waste", "noun", "food that is thrown away", "desperdicio de comida"],
      ["firmware update", "noun", "new internal software for a device", "actualización del firmware"],
      ["out of spite", "expression", "to annoy someone on purpose", "por despecho"],
      ["splash out", "phrasal verb", "spend a lot of money on something", "darse un lujo", "splashed out"],
      ["smitten", "adjective", "suddenly in love with something", "encantado, flechado"],
      ["groceries", "noun", "food and things you buy at the supermarket", "el mandado, la despensa"],
      ["wilt", "verb", "become soft and weak (a plant)", "marchitarse"],
      ["disable", "verb", "turn off a function", "desactivar", "disabled"]
    ],
    "cp5-2": [
      ["deploy", "verb", "start using something", "implementar", "deployed"],
      ["plausibly", "adverb", "in a way that seems true", "de manera creíble"],
      ["accountability", "noun", "being responsible for what you do", "rendición de cuentas"],
      ["scepticism", "noun", "doubting that something is true", "escepticismo"],
      ["rung", "noun", "one step of a ladder", "peldaño"],
      ["turmoil", "noun", "great confusion and trouble", "caos, agitación"],
      ["lay off", "phrasal verb", "make workers leave their jobs", "despedir", "laid off"],
      ["overhead costs", "noun", "the regular costs of running a business", "gastos generales"],
      ["hollow", "adjective", "empty, without real feeling", "hueco, vacío"],
      ["plagiarize", "verb", "copy someone else's work and call it yours", "plagiar", "plagiarizes"],
      ["copyright lawsuit", "noun", "a legal case about using someone's work", "demanda por derechos de autor", "copyright lawsuits"]
    ],
    "cp5-3": [
      ["fulfilment centre", "noun", "a warehouse that packs and sends online orders", "centro de distribución"],
      ["collision", "noun", "a crash", "choque, colisión", "collisions"],
      ["fragile", "adjective", "easy to break", "frágil"],
      ["grasp", "verb", "hold something firmly", "agarrar", "grasping"],
      ["staff", "noun", "the workers of a company", "personal"],
      ["briefing", "noun", "a meeting to give instructions", "sesión informativa"],
      ["adhere to", "phrasal verb", "follow rules exactly", "apegarse a"],
      ["perimeter", "noun", "the outer edge of an area", "perímetro"],
      ["breach", "verb", "break through a limit", "traspasar", "breaches"],
      ["calibrate", "verb", "adjust a machine so it measures correctly", "calibrar"],
      ["unjam", "verb", "free something that is stuck", "destrabar"]
    ],
    "cp5-4": [
      ["volunteer", "verb", "offer to do something without being forced", "ofrecerse como voluntario", "volunteered"],
      ["frontier", "noun", "the edge of the known world", "frontera"],
      ["radiation", "noun", "dangerous energy, like in space", "radiación"],
      ["settler", "noun", "a person who goes to live in a new place", "colono", "settlers"],
      ["mission control", "noun", "the team on Earth that directs a space flight", "control de misión"],
      ["propulsion", "noun", "the force that moves a rocket", "propulsión"],
      ["life support", "noun", "the systems that keep astronauts alive", "soporte vital"],
      ["anomaly", "noun", "something unusual", "anomalía"],
      ["parameters", "noun", "the limits for safe operation", "parámetros"],
      ["trajectory", "noun", "the path something follows through the air", "trayectoria"],
      ["countdown", "noun", "counting backwards to a launch", "cuenta regresiva"]
    ],
    "cp5-5": [
      ["gene therapy", "noun", "treatment that changes a person's genes", "terapia génica"],
      ["enhancement", "noun", "making something better than normal", "mejora"],
      ["predisposition", "noun", "a natural tendency to get an illness", "predisposición"],
      ["trial", "noun", "a test of a new medicine on people", "ensayo clínico", "trials"],
      ["degenerative", "adjective", "getting worse over time", "degenerativo"],
      ["symptom", "noun", "a sign of an illness", "síntoma", "symptoms"],
      ["eradicate", "verb", "destroy completely", "erradicar"],
      ["root cause", "noun", "the main reason for a problem", "causa raíz"],
      ["mutated", "adjective", "changed in its genes", "mutado"],
      ["autoimmune response", "noun", "when the body attacks itself", "respuesta autoinmune"],
      ["preliminary", "adjective", "coming first, before the main part", "preliminar"]
    ],
    "cp5-6": [
      ["isolate", "verb", "separate something from the rest", "aislar"],
      ["preserve the evidence", "expression", "keep the proof safe", "preservar la evidencia"],
      ["notify", "verb", "tell someone officially", "notificar"],
      ["intruder", "noun", "a person who enters without permission", "intruso"],
      ["impostor", "noun", "a person who pretends to be someone else", "impostor", "impostors"],
      ["multi-factor authentication", "noun", "logging in with two or more checks", "autenticación multifactor"],
      ["spear-phishing", "noun", "a fake email made for one person to steal data", "phishing dirigido"],
      ["keylogger", "noun", "a program that records everything you type", "registrador de teclas"],
      ["credentials", "noun", "your username and password", "credenciales"],
      ["exfiltration", "noun", "secretly copying data out of a system", "exfiltración (robo de datos)"],
      ["backup", "noun", "a copy of your files", "respaldo", "backups"]
    ],
    "cp5-7": [
      ["turbulence", "noun", "sudden shaking during a flight", "turbulencia"],
      ["presence", "noun", "the feeling of really being somewhere", "presencia"],
      ["exposure therapy", "noun", "treating a fear by slowly facing it", "terapia de exposición"],
      ["phobia", "noun", "a very strong, unreasonable fear", "fobia", "phobias"],
      ["immersion", "noun", "the feeling of being completely inside an experience", "inmersión"],
      ["dosage", "noun", "how much of a treatment you get", "dosis"],
      ["motion sickness", "noun", "feeling ill because of movement", "mareo"],
      ["headset", "noun", "a device you wear on your head", "visor"],
      ["kaleidoscope", "noun", "a changing pattern of many colours", "caleidoscopio"],
      ["weightlessly", "adverb", "as if without weight", "ingrávidamente"],
      ["haptic suit", "noun", "a suit that lets you feel touch in VR", "traje háptico"]
    ],
    "cp5-8": [
      ["batteries", "noun", "devices that store electricity", "baterías"],
      ["variability", "noun", "the fact that something changes a lot", "variabilidad"],
      ["baseload", "noun", "the minimum power that is always needed", "carga base"],
      ["storage", "noun", "keeping energy to use later", "almacenamiento"],
      ["demand response", "noun", "paying users to use less power at busy times", "respuesta a la demanda"],
      ["push back", "phrasal verb", "disagree with an idea", "rebatir, objetar"],
      ["peak", "adjective", "the highest", "pico, máximo"],
      ["mismatch", "noun", "when two things don't fit together", "desajuste"],
      ["abundance", "noun", "a large amount", "abundancia"],
      ["breakthrough", "noun", "an important new discovery", "avance decisivo", "breakthroughs"]
    ],
    "cp5-9": [
      ["pilot", "noun", "a small test before a big project", "piloto, prueba"],
      ["sensor", "noun", "a device that detects things", "sensor", "sensors"],
      ["vendor", "noun", "a company that sells a product", "proveedor"],
      ["commute", "noun", "the journey to and from work", "trayecto al trabajo", "commutes"],
      ["sceptical", "adjective", "doubtful", "escéptico"],
      ["pedestrian", "noun", "a person walking", "peatón", "pedestrians"],
      ["gridlock", "noun", "traffic so heavy that nothing moves", "embotellamiento"],
      ["exhaust", "noun", "gas from a car engine", "gases del escape"],
      ["noise pollution", "noun", "harmful amounts of noise", "contaminación auditiva"],
      ["hydroponic", "adjective", "growing plants in water without soil", "hidropónico"],
      ["produce", "noun", "fruit and vegetables", "productos frescos"]
    ],
    "cp5-10": [
      ["robotaxi", "noun", "a taxi with no driver", "robotaxi"],
      ["edge case", "noun", "an unusual situation at the limit", "caso límite", "edge cases"],
      ["hype", "noun", "too much excitement and promotion", "bombo, exageración"],
      ["drowsiness", "noun", "feeling sleepy", "somnolencia"],
      ["liable", "adjective", "legally responsible", "responsable legal"],
      ["premiums", "noun", "the money you pay for insurance", "primas de seguro"],
      ["refrain from", "phrasal verb", "not do something", "abstenerse de"],
      ["intervention", "noun", "getting involved to change something", "intervención"],
      ["predictive", "adjective", "able to say what will happen", "predictivo"],
      ["collision", "noun", "a crash", "choque"],
      ["deploy", "verb", "open or spread out quickly (like an airbag)", "desplegarse, activarse"]
    ],
    "cp5-11": [
      ["nanoparticle", "noun", "a tiny particle, much smaller than a cell", "nanopartícula", "nanoparticles"],
      ["tumour", "noun", "a lump of cells that grows in the body", "tumor"],
      ["press release", "noun", "an official announcement for journalists", "comunicado de prensa"],
      ["peer review", "noun", "when experts check research before it is published", "revisión por pares"],
      ["fine print", "noun", "small text with important details", "letra pequeña"],
      ["hypothesis", "noun", "an idea that has not been proved", "hipótesis"],
      ["doomsday", "noun", "the end of the world", "el fin del mundo"],
      ["self-replicating", "adjective", "able to make copies of itself", "autorreplicante"],
      ["consume", "verb", "eat or use up", "consumir"],
      ["relentless", "adjective", "never stopping", "implacable"],
      ["swarm", "noun", "a huge moving group", "enjambre"]
    ],
    "cp5-12": [
      ["deny", "verb", "say no to a request", "negar, rechazar", "denied"],
      ["loan", "noun", "money borrowed from a bank", "préstamo"],
      ["prejudice", "noun", "an unfair opinion about a group", "prejuicio"],
      ["bias", "noun", "an unfair preference for or against something", "sesgo"],
      ["appeal", "noun", "a request to change a decision", "apelación", "appeals"],
      ["audit", "noun", "an official check", "auditoría", "audits"],
      ["loyalty card", "noun", "a card that gives you points at a shop", "tarjeta de lealtad"],
      ["profile", "noun", "a description of someone", "perfil"],
      ["uncanny", "adjective", "strange in a slightly scary way", "inquietante"],
      ["coupon", "noun", "a ticket that gives you a discount", "cupón", "coupons"]
    ],
    "cp5-13": [
      ["screen time", "noun", "time spent looking at a screen", "tiempo en pantalla"],
      ["autoplay", "noun", "when the next video starts by itself", "reproducción automática"],
      ["streak", "noun", "doing something many days in a row", "racha", "streaks"],
      ["attention capture", "noun", "designs that grab and keep your attention", "captura de atención"],
      ["incentive", "noun", "something that encourages you to act", "incentivo"],
      ["engagement metrics", "noun", "numbers that measure how much people interact", "métricas de interacción"],
      ["moral outrage", "noun", "anger at something you think is wrong", "indignación moral"],
      ["polarizing", "adjective", "dividing people into opposite groups", "polarizante"],
      ["malice", "noun", "the wish to hurt someone", "malicia"],
      ["ad revenue", "noun", "money earned from adverts", "ingresos por publicidad"]
    ],
    "cp5-14": [
      ["season pass", "noun", "a ticket to future content of a game", "pase de temporada"],
      ["live-service", "adjective", "a game that keeps getting updates", "de servicio continuo"],
      ["patch", "verb", "fix a program with a small update", "parchar", "patching"],
      ["roadmap", "noun", "a plan of future steps", "hoja de ruta"],
      ["crunch culture", "noun", "making workers do long extra hours", "cultura del sobretrabajo"],
      ["immersion", "noun", "feeling completely inside the experience", "inmersión"],
      ["threshold", "noun", "the point where something begins", "umbral"],
      ["heads-up display", "noun", "the numbers and bars shown over a game", "interfaz en pantalla (HUD)"],
      ["limp", "verb", "walk badly because of an injury", "cojear", "limps"],
      ["landmark", "noun", "a place that is easy to recognize", "punto de referencia", "landmarks"]
    ],
    "cp5-15": [
      ["hybrid", "noun", "partly at home, partly at the office", "híbrido"],
      ["landlord", "noun", "a person or company that rents out property", "arrendador", "landlords"],
      ["mentorship", "noun", "help from a more experienced person", "mentoría"],
      ["trade-off", "noun", "giving up one thing to get another", "sacrificio, concesión"],
      ["onboarding", "noun", "helping new workers start", "incorporación"],
      ["automation", "noun", "machines doing work that people used to do", "automatización"],
      ["displace", "verb", "take the place of", "desplazar", "displaces"],
      ["blue-collar", "adjective", "doing physical work", "obrero"],
      ["white-collar", "adjective", "doing office work", "de oficina"],
      ["unemployment", "noun", "not having a job", "desempleo"],
      ["stipend", "noun", "a regular fixed payment", "estipendio"]
    ],
    "cp5-16": [
      ["visa", "noun", "permission to stay in a country", "visa", "visas"],
      ["flat tax", "noun", "the same tax rate for everyone", "impuesto fijo", "flat taxes"],
      ["gentrification", "noun", "when richer people move in and prices rise", "gentrificación"],
      ["expense", "verb", "charge a cost to your company", "cargar como gasto"],
      ["hammock", "noun", "a hanging bed made of cloth", "hamaca"],
      ["backache", "noun", "pain in your back", "dolor de espalda"],
      ["unstable", "adjective", "not steady; changing", "inestable"],
      ["pitch", "noun", "a talk to sell an idea", "presentación de venta"],
      ["humidity", "noun", "water in the air", "humedad"],
      ["time zone", "noun", "an area with the same time", "zona horaria", "time zones"]
    ],
    "cp5-17": [
      ["intermediary", "noun", "a person or company in the middle of a deal", "intermediario", "intermediaries"],
      ["remittance", "noun", "money sent to family in another country", "remesa", "remittances"],
      ["escrow", "noun", "money held by a third party until a deal is done", "depósito en garantía"],
      ["speculation", "noun", "buying something to sell it quickly for profit", "especulación"],
      ["ledger", "noun", "a book of financial records", "libro de contabilidad"],
      ["centralized", "adjective", "controlled from one place", "centralizado"],
      ["distributed", "adjective", "spread across many places", "distribuido"],
      ["node", "noun", "one computer in a network", "nodo"],
      ["transaction", "noun", "an exchange of money", "transacción"],
      ["forgery", "noun", "a fake copy", "falsificación"]
    ],
    "cp5-18": [
      ["fitting room", "noun", "a room in a shop to try on clothes", "probador", "fitting rooms"],
      ["landfill", "noun", "a place where rubbish is buried", "relleno sanitario"],
      ["margin", "noun", "the profit left after costs", "margen"],
      ["unit economics", "noun", "profit or loss on each item sold", "economía por unidad"],
      ["sizing", "noun", "how clothes sizes are measured", "tallas"],
      ["dropshipping", "noun", "selling products that a factory sends straight to buyers", "dropshipping"],
      ["inventory", "noun", "the products a business keeps in stock", "inventario"],
      ["upfront", "adjective", "paid at the beginning", "por adelantado"],
      ["middleman", "noun", "a person between the maker and the buyer", "intermediario"],
      ["refund", "noun", "money given back", "reembolso", "refunds"],
      ["profit margin", "noun", "the profit you keep from each sale", "margen de ganancia", "profit margins"]
    ],
    "cp5-19": [
      ["infer", "verb", "guess from the information you have", "inferir, deducir"],
      ["consent", "verb", "agree to something", "consentir"],
      ["legally grey", "expression", "not clearly legal or illegal", "en zona gris legal"],
      ["oversight", "noun", "supervision", "supervisión"],
      ["surveillance", "noun", "watching people closely", "vigilancia"],
      ["flinch", "verb", "move back because something is unpleasant", "estremecerse"],
      ["facial recognition", "noun", "technology that identifies faces", "reconocimiento facial"],
      ["unprecedented", "adjective", "never happened before", "sin precedentes"],
      ["false positive", "noun", "a result that wrongly says yes", "falso positivo", "false-positive"],
      ["chilling effect", "noun", "when people stop speaking because they feel watched", "efecto inhibidor"],
      ["dissent", "noun", "disagreement with those in power", "disidencia"]
    ],
    "cp5-20": [
      ["overestimate", "verb", "think something is bigger than it is", "sobreestimar"],
      ["underestimate", "verb", "think something is smaller than it is", "subestimar"],
      ["queue", "verb", "wait in a line", "hacer fila", "queueing"],
      ["maintenance", "noun", "keeping things in good condition", "mantenimiento"],
      ["climate refugee", "noun", "a person forced to move by climate change", "refugiado climático"],
      ["uninhabitable", "adjective", "impossible to live in", "inhabitable"],
      ["sobering", "adjective", "making you feel serious", "que da que pensar"],
      ["longevity", "noun", "long life", "longevidad"],
      ["life expectancy", "noun", "how long people usually live", "esperanza de vida"],
      ["inequality", "noun", "unfair differences between people", "desigualdad"]
    ],

    /* ---------- Core Practice · Nivel 6 (sólo el diálogo modelo) ---------- */
    "cp6-1": [
      ["talent agent", "noun", "a person who finds work for performers", "agente de talentos"],
      ["novelty", "noun", "the quality of being new", "novedad"],
      ["low stakes", "expression", "with not much to lose", "poco en juego"],
      ["virality", "noun", "how fast something spreads online", "viralidad"],
      ["half-life", "noun", "the time it takes to lose half its power", "vida media"],
      ["monetise", "verb", "make money from something", "monetizar", "monetising"],
      ["merchandise", "noun", "products sold with a name or image on them", "mercancía"],
      ["revenue", "noun", "money a business earns", "ingresos"]
    ],
    "cp6-2": [
      ["unscripted", "adjective", "without a written script", "sin guion"],
      ["three-act structure", "noun", "a story with a beginning, a middle and an end", "estructura de tres actos"],
      ["producer", "noun", "the person who organises a show", "productor", "producers"],
      ["cast", "verb", "choose the people for a show", "elegir el reparto"],
      ["contestant", "noun", "a person who takes part in a competition", "concursante"],
      ["artifice", "noun", "clever tricks to deceive", "artificio"],
      ["premise", "noun", "the basic idea of a story", "premisa"],
      ["paradox", "noun", "something that seems impossible but is true", "paradoja"],
      ["surveillance", "noun", "watching people closely", "vigilancia"],
      ["intimacy", "noun", "a close, personal connection", "intimidad"]
    ],
    "cp6-3": [
      ["betrayal", "noun", "breaking someone's trust", "traición"],
      ["entitlement", "noun", "believing you deserve something", "sentirse con derecho a todo"],
      ["parasocial", "adjective", "describing a one-sided relationship with a famous person", "parasocial"],
      ["broadcast", "noun", "something sent out to many people", "transmisión"],
      ["predate", "verb", "exist before something else", "ser anterior a", "predates"],
      ["shrine", "noun", "a holy place for worship", "santuario, altar"],
      ["role model", "noun", "a person others want to copy", "modelo a seguir", "role models"],
      ["pathology", "noun", "an unhealthy condition", "patología"],
      ["subscription fee", "noun", "money paid regularly for a service", "cuota de suscripción", "subscription fees"]
    ],
    "cp6-4": [
      ["thesis", "noun", "the main idea you argue in an essay", "tesis"],
      ["folklore", "noun", "the traditional stories of a community", "folclor"],
      ["anonymous", "adjective", "made by an unknown person", "anónimo"],
      ["mutating", "adjective", "changing form", "que muta"],
      ["communal", "adjective", "shared by a group", "comunitario"],
      ["remix", "noun", "a new version made from an old one", "nueva versión, remix"],
      ["brevity", "noun", "being short", "brevedad"],
      ["nuance", "noun", "a small but important difference in meaning", "matiz"],
      ["propaganda", "noun", "information used to push a political view", "propaganda"]
    ],
    "cp6-5": [
      ["subscription", "noun", "a regular payment for a service", "suscripción", "subscriptions"],
      ["rewatch", "verb", "watch again", "volver a ver", "rewatched"],
      ["choice fatigue", "noun", "being tired from having too many options", "fatiga de decisión"],
      ["licence", "verb", "pay for the right to use something", "adquirir los derechos"],
      ["casualty", "noun", "a victim", "víctima", "casualties"],
      ["tentpole", "noun", "a huge film that a studio depends on", "superproducción", "tentpoles"],
      ["bundle", "noun", "several products sold together", "paquete", "bundles"],
      ["disrupt", "verb", "change an industry completely", "revolucionar, trastocar", "disrupted"]
    ],
    "cp6-6": [
      ["accountability", "noun", "accepting responsibility for what you did", "rendición de cuentas"],
      ["calcify", "verb", "become hard and fixed", "anquilosarse", "calcified"],
      ["contrition", "noun", "feeling sorry for something wrong", "arrepentimiento"],
      ["overdue", "adjective", "late; it should have happened before", "que se hacía esperar"],
      ["harassment", "noun", "repeated attacks or threats", "acoso"],
      ["obscure", "verb", "make unclear", "ocultar, oscurecer", "obscures"],
      ["proportion", "noun", "the right size or amount for something", "proporción"],
      ["due process", "noun", "fair legal steps", "debido proceso"],
      ["redemption", "noun", "being forgiven after doing wrong", "redención"]
    ],
    "cp6-7": [
      ["reboot", "verb", "make a new version of an old show", "rehacer (reboot)", "rebooted"],
      ["growth sector", "noun", "an area of business that is growing", "sector en crecimiento"],
      ["pre-sold", "adjective", "already wanted before it is sold", "prevendido"],
      ["precarious", "adjective", "not safe or stable", "precario"],
      ["homesickness", "noun", "sadness from missing home", "añoranza"],
      ["engineered", "adjective", "carefully designed", "diseñado, fabricado"],
      ["curated", "adjective", "carefully chosen", "seleccionado con cuidado"],
      ["business model", "noun", "the way a company makes money", "modelo de negocio"]
    ],
    "cp6-8": [
      ["podcast queue", "noun", "the list of episodes you plan to listen to", "lista de episodios"],
      ["lineage", "noun", "a long line of things that come from each other", "linaje, tradición"],
      ["execution", "noun", "killing someone as a legal punishment", "ejecución", "executions"],
      ["overwhelmingly", "adverb", "by a very large majority", "abrumadoramente"],
      ["victim", "noun", "a person harmed by a crime", "víctima", "victims"],
      ["fault line", "noun", "the point where people disagree", "línea divisoria"],
      ["cold case", "noun", "a crime that was never solved", "caso sin resolver", "cold cases"],
      ["voyeurism", "noun", "enjoying watching other people's pain or private life", "voyerismo"],
      ["audit", "noun", "an honest check", "revisión, auditoría"]
    ],
    "cp6-9": [
      ["dermatologist", "noun", "a skin doctor", "dermatólogo", "dermatologists"],
      ["selfie", "noun", "a photo you take of yourself", "selfi"],
      ["dysmorphia", "noun", "worrying too much about how you look", "dismorfia"],
      ["constructed", "adjective", "made by society, not natural", "construido"],
      ["feedback loop", "noun", "when results feed back and repeat", "círculo de retroalimentación"],
      ["optimised", "adjective", "made as good as possible", "optimizado"],
      ["jurisdiction", "noun", "a place with its own laws", "jurisdicción", "jurisdictions"],
      ["authenticity", "noun", "being real and true", "autenticidad"],
      ["moving target", "noun", "something that keeps changing", "blanco móvil"]
    ],
    "cp6-10": [
      ["power law", "noun", "when a few people get almost everything", "ley de potencia"],
      ["median", "adjective", "in the middle of all the values", "mediano"],
      ["minimum wage", "noun", "the lowest pay allowed by law", "salario mínimo"],
      ["diversify", "verb", "spread your work or money across different things", "diversificar"],
      ["patronage", "noun", "support and money from fans", "mecenazgo"],
      ["burnout", "noun", "extreme tiredness from working too much", "agotamiento (burnout)"],
      ["occupational disease", "noun", "an illness caused by your job", "enfermedad laboral"],
      ["deprecate", "verb", "make old and no longer used", "volver obsoleto"]
    ],
    "cp6-11": [
      ["sincerity", "noun", "being honest about your feelings", "sinceridad"],
      ["transgressive", "adjective", "breaking the rules", "transgresor"],
      ["armour", "noun", "protection", "armadura"],
      ["detachment", "noun", "not getting emotionally involved", "desapego"],
      ["cynicism", "noun", "believing people only act for themselves", "cinismo"],
      ["earnestness", "noun", "being very serious and sincere", "seriedad, franqueza"],
      ["naive", "adjective", "too trusting; lacking experience", "ingenuo"],
      ["satire", "noun", "using humour to criticise", "sátira"],
      ["solvent", "noun", "a liquid that dissolves things", "solvente"]
    ],
    "cp6-12": [
      ["crowdfund", "verb", "raise money from many people online", "financiar colectivamente", "crowdfunded"],
      ["harass", "verb", "attack or bother someone again and again", "acosar", "harassed"],
      ["possessive", "adjective", "wanting to own or control", "posesivo"],
      ["curdle", "verb", "turn sour or bad", "agriarse", "curdling"],
      ["mob", "noun", "an angry crowd", "turba"],
      ["moderation", "noun", "checking and removing harmful content", "moderación"],
      ["self-police", "verb", "control your own behaviour as a group", "autorregularse"],
      ["norm", "noun", "an accepted rule of behaviour", "norma", "norms"]
    ],
    "cp6-13": [
      ["focus group", "noun", "a small group asked for its opinions", "grupo focal", "focus groups"],
      ["effortless", "adjective", "seeming to need no effort", "natural, sin esfuerzo"],
      ["chorus", "noun", "the part of a song that repeats", "coro, estribillo"],
      ["spontaneity", "noun", "doing things naturally, without planning", "espontaneidad"],
      ["assembly line", "noun", "a factory system where each worker does one step", "línea de ensamblaje"],
      ["hook", "noun", "a catchy part of a song", "gancho", "hooks"],
      ["royalty", "noun", "money paid to an artist for each use of a work", "regalía"],
      ["skip button", "noun", "the button to jump to the next song", "botón de saltar"]
    ],
    "cp6-14": [
      ["acquire", "verb", "get or buy", "adquirir", "acquired"],
      ["permanent collection", "noun", "the art a museum keeps forever", "colección permanente"],
      ["adjudicate", "verb", "judge and decide", "dictaminar, arbitrar"],
      ["agency", "noun", "the power to choose and act", "capacidad de decisión"],
      ["brushstroke", "noun", "one mark made by a paintbrush", "pincelada"],
      ["counterargument", "noun", "an argument against another one", "contraargumento"],
      ["commissioned", "adjective", "ordered and paid for by someone", "por encargo"],
      ["canon", "noun", "the works accepted as the most important", "canon"],
      ["sneer", "noun", "a look or remark that shows no respect", "desprecio", "sneers"]
    ],
    "cp6-15": [
      ["haul", "noun", "a large amount of things you bought", "compras (haul)"],
      ["garment", "noun", "a piece of clothing", "prenda", "garments"],
      ["gleeful", "adjective", "very happy", "eufórico"],
      ["wages", "noun", "money paid for work", "salarios"],
      ["seamstress", "noun", "a woman who sews clothes", "costurera"],
      ["externalities", "noun", "costs that someone else pays", "externalidades"],
      ["capsule collection", "noun", "a small collection of clothes", "colección cápsula"],
      ["ledger", "noun", "a book of accounts", "libro de cuentas"]
    ],
    "cp6-16": [
      ["edition", "noun", "one printed version of a newspaper", "edición"],
      ["eulogist", "noun", "a person who speaks to praise someone who died", "quien da el elogio fúnebre"],
      ["mourn", "verb", "feel sad because someone or something is gone", "llorar, lamentar"],
      ["subsidise", "verb", "pay part of the cost", "subsidiar", "subsidised"],
      ["classifieds", "noun", "small adverts in a newspaper", "anuncios clasificados"],
      ["zoning board", "noun", "the local office that decides how land is used", "junta de uso de suelo"],
      ["non-profit", "noun", "an organisation that does not seek profit", "organización sin fines de lucro", "non-profits"],
      ["accountability", "noun", "making powerful people answer for what they do", "rendición de cuentas"],
      ["infrastructure", "noun", "the basic systems a society needs", "infraestructura"]
    ],
    "cp6-17": [
      ["pantheon", "noun", "all the gods of a religion", "panteón"],
      ["refine", "verb", "improve by making small changes", "afinar, pulir"],
      ["refute", "verb", "prove something is wrong", "refutar"],
      ["public domain", "noun", "free for anyone to use", "dominio público"],
      ["copyrighted", "adjective", "legally owned by someone", "con derechos de autor"],
      ["shareholder", "noun", "a person who owns part of a company", "accionista", "shareholders"],
      ["sequel", "noun", "the next film in a series", "secuela"],
      ["fatigue", "noun", "great tiredness", "cansancio, fatiga"],
      ["molt", "verb", "lose an old skin and grow a new one", "mudar de piel"]
    ],
    "cp6-18": [
      ["boutique", "noun", "a small, fashionable shop", "boutique", "boutiques"],
      ["anthem", "noun", "a famous, important song", "himno"],
      ["strip-mine", "verb", "take everything valuable and leave", "explotar hasta agotar", "strip-mines"],
      ["aesthetic", "noun", "a style or look", "estética"],
      ["stakes", "noun", "what you can win or lose", "lo que está en juego"],
      ["exclusion", "noun", "keeping people out", "exclusión"],
      ["illegible", "adjective", "impossible to read or understand", "ilegible"],
      ["ethnographer", "noun", "a person who studies cultures", "etnógrafo"],
      ["obscurity", "noun", "being unknown", "anonimato"]
    ],
    "cp6-19": [
      ["dystopian", "adjective", "showing a bad, frightening future", "distópico"],
      ["photogenic", "adjective", "looking good in photos", "fotogénico"],
      ["catastrophe", "noun", "a terrible disaster", "catástrofe"],
      ["mood board", "noun", "a collection of images that shows a style", "tablero de inspiración"],
      ["backdrop", "noun", "the background of a scene", "telón de fondo"],
      ["resignation", "noun", "accepting something bad without fighting", "resignación"],
      ["civic duty", "noun", "what a citizen should do", "deber cívico"],
      ["sewage", "noun", "dirty water from toilets and drains", "aguas residuales"],
      ["competent", "adjective", "able to do something well", "competente"]
    ],
    "cp6-20": [
      ["primary source", "noun", "original evidence from the time", "fuente primaria"],
      ["demolish", "verb", "destroy completely; prove totally wrong", "echar abajo"],
      ["asterisk", "noun", "a star symbol for a note; a condition", "asterisco"],
      ["assumption", "noun", "something you believe without proof", "suposición", "assumptions"],
      ["anthropological", "adjective", "about the study of human cultures", "antropológico"],
      ["survivorship", "noun", "the idea that only what survives gets remembered", "sesgo de supervivencia"],
      ["fragile", "adjective", "easily broken", "frágil"],
      ["excavate", "verb", "dig up; study the past", "excavar", "excavating"],
      ["syllabus", "noun", "the list of topics for a course", "temario"]
    ]
  }
};
