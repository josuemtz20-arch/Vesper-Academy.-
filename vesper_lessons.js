/* ============================================================
 * vesper_lessons.js — Free no-account lessons content.
 * Core Grammar ladder A1 -> B1 (15 lessons). Authored + adversarially
 * verified by a multi-agent workflow (2026-06-12), then normalized
 * (word_order always solvable; MCQ correctIndex validated).
 * Schema per lesson: { lessonId, level, track, title, tipo?,
 *   explanation:{ body, examples:[{en,es}], sections?:[...] },
 *   tipo: "aprende" | "practica" (opcional; sin campo = practica).
 *   sections (solo aprende): [{kind:"intro"|"regla"|"resumen"|"puente", body}
 *     | {kind:"vocab", items:[{en,ipa?,es}]}
 *     | {kind:"expresiones"|"ejemplos", items:[{en,es}]}
 *     | {kind:"errores", items:[{no,si,pq}]}] — leccion.html las renderiza
 *   como pantalla de ensenanza rica; body+examples quedan como fallback.
 *   exercises:[ {type:"multiple_choice",question,options,correctIndex,explanation}
 *             | {type:"word_order",words,correctOrder,hint} ],
 *   xpReward, mascotState, nextLessonId }
 * Hand-edit here, or regenerate via the workflow. Add new ids to ORDER.
 * ============================================================ */
window.VESPER_LESSONS = {
    "core-grammar-01-to-be":  {
                                  "lessonId":  "core-grammar-01-to-be",
                                  "level":  "A1",
                                  "track":  "Core Grammar",
                                  "tipo":  "aprende",
                                  "title":  "Verb \"to be\"",
                                  "explanation":  {
                                                      "body":  "We use the verb \"to be\" to say who or what someone is. The forms are: I am, you/we/they are, he/she/it is. To make it negative, add not: I am not, he isn\u0027t, we aren\u0027t. For yes/no questions, put the verb first: Are you happy? Is she a teacher? (El verbo \"to be\" cambia segun el pronombre: am, is, are; significa \"ser\" o \"estar\".)",
                                                      "examples":  [
                                                                       {
                                                                           "en":  "I am a student.",
                                                                           "es":  "Soy estudiante."
                                                                       },
                                                                       {
                                                                           "en":  "She is happy.",
                                                                           "es":  "Ella esta feliz."
                                                                       },
                                                                       {
                                                                           "en":  "We aren\u0027t at home.",
                                                                           "es":  "No estamos en casa."
                                                                       },
                                                                       {
                                                                           "en":  "Are you from Mexico?",
                                                                           "es":  "Eres de Mexico?"
                                                                       }
                                                                   ],
                                                      "sections":  [
                                                          { "kind": "intro",
                                                            "body": "\"To be\" es el verbo mas importante del ingles: con el dices quien eres, como estas y de donde vienes. Es lo primero que necesitas para presentarte." },
                                                          { "kind": "regla",
                                                            "body": "Solo tiene 3 formas en presente: I am - he/she/it is - you/we/they are. Negativo: agrega not (isn't, aren't). Pregunta: el verbo va primero (Are you...?, Is she...?)." },
                                                          { "kind": "vocab",
                                                            "items": [
                                                                { "en": "I am (I'm)", "ipa": "aim", "es": "yo soy / estoy" },
                                                                { "en": "he / she / it is", "ipa": "iz", "es": "el / ella / eso es, esta" },
                                                                { "en": "you / we / they are", "ipa": "ar", "es": "tu eres, somos, son" },
                                                                { "en": "isn't / aren't", "ipa": "'iznt / arnt", "es": "no es / no son" }
                                                            ] },
                                                          { "kind": "expresiones",
                                                            "items": [
                                                                { "en": "How are you?", "es": "Como estas?" },
                                                                { "en": "I'm fine, thanks.", "es": "Estoy bien, gracias." },
                                                                { "en": "I'm from Mexico.", "es": "Soy de Mexico." },
                                                                { "en": "My name is...", "es": "Mi nombre es..." }
                                                            ] },
                                                          { "kind": "ejemplos",
                                                            "items": [
                                                                { "en": "I am a student.", "es": "Soy estudiante." },
                                                                { "en": "She is happy.", "es": "Ella esta feliz." },
                                                                { "en": "We aren't at home.", "es": "No estamos en casa." },
                                                                { "en": "Are you from Mexico?", "es": "Eres de Mexico?" }
                                                            ] },
                                                          { "kind": "errores",
                                                            "items": [
                                                                { "no": "I is happy.", "si": "I am happy.", "pq": "Con \"I\" siempre va \"am\"." },
                                                                { "no": "She are my friend.", "si": "She is my friend.", "pq": "he, she e it usan \"is\"." },
                                                                { "no": "I have 25 years.", "si": "I am 25 years old.", "pq": "La edad en ingles se dice con \"to be\", no con \"have\"." },
                                                                { "no": "Is very tall.", "si": "He is very tall.", "pq": "En ingles el sujeto nunca se omite." }
                                                            ] },
                                                          { "kind": "resumen",
                                                            "body": "am con I - is con he/she/it - are con you/we/they. Negativo con not; pregunta con el verbo primero. Y recuerda: la edad va con \"to be\"." },
                                                          { "kind": "puente",
                                                            "body": "Ahora te toca a ti: 5 ejercicios rapidos para dominarlo." }
                                                      ]
                                                  },
                                  "exercises":  [
                                                    {
                                                        "type":  "multiple_choice",
                                                        "question":  "Choose the correct form: She ___ my teacher.",
                                                        "options":  [
                                                                        "am",
                                                                        "is",
                                                                        "are"
                                                                    ],
                                                        "correctIndex":  1,
                                                        "explanation":  "With he, she, or it we use \"is\"."
                                                    },
                                                    {
                                                        "type":  "word_order",
                                                        "words":  [
                                                                      "I",
                                                                      "am",
                                                                      "happy",
                                                                      "today"
                                                                  ],
                                                        "correctOrder":  [
                                                                             "I",
                                                                             "am",
                                                                             "happy",
                                                                             "today"
                                                                         ],
                                                        "hint":  "Empieza con el pronombre \"I\" y usa la forma \"am\"."
                                                    },
                                                    {
                                                        "type":  "multiple_choice",
                                                        "question":  "Choose the correct question: ___ you a doctor?",
                                                        "options":  [
                                                                        "Are",
                                                                        "Is",
                                                                        "Am"
                                                                    ],
                                                        "correctIndex":  0,
                                                        "explanation":  "With \"you\" we use \"are\", and in questions the verb goes first."
                                                    },
                                                    {
                                                        "type":  "word_order",
                                                        "words":  [
                                                                      "They",
                                                                      "are",
                                                                      "at",
                                                                      "school"
                                                                  ],
                                                        "correctOrder":  [
                                                                             "They",
                                                                             "are",
                                                                             "at",
                                                                             "school"
                                                                         ],
                                                        "hint":  "Con \"they\" se usa \"are\"."
                                                    },
                                                    {
                                                        "type":  "multiple_choice",
                                                        "question":  "Choose the correct negative: He ___ at work.",
                                                        "options":  [
                                                                        "isn\u0027t",
                                                                        "aren\u0027t",
                                                                        "not is"
                                                                    ],
                                                        "correctIndex":  0,
                                                        "explanation":  "With \"he\" the negative is \"isn\u0027t\" (is + not)."
                                                    }
                                                ],
                                  "xpReward":  30,
                                  "mascotState":  "explaining",
                                  "nextLessonId":  "core-grammar-02-articles"
                              },
    "core-grammar-02-articles":  {
                                     "lessonId":  "core-grammar-02-articles",
                                     "level":  "A1",
                                     "track":  "Core Grammar",
                                     "title":  "Articles: a, an, the",
                                     "explanation":  {
                                                         "body":  "Use a and an for one thing that is not specific. Use a before a consonant sound (a cat) and an before a vowel sound (an apple). Use the for a specific thing when we both know which one (the sun, the book on the table). (En espanol: a/an son como \"un/una\" y the es como \"el/la/los/las\".)",
                                                         "examples":  [
                                                                          {
                                                                              "en":  "I have a dog.",
                                                                              "es":  "Tengo un perro."
                                                                          },
                                                                          {
                                                                              "en":  "She eats an orange.",
                                                                              "es":  "Ella come una naranja."
                                                                          },
                                                                          {
                                                                              "en":  "The teacher is here.",
                                                                              "es":  "El profesor esta aqui."
                                                                          },
                                                                          {
                                                                              "en":  "I see an elephant.",
                                                                              "es":  "Veo un elefante."
                                                                          }
                                                                      ]
                                                     },
                                     "exercises":  [
                                                       {
                                                           "type":  "multiple_choice",
                                                           "question":  "Choose the correct article: I want ___ apple.",
                                                           "options":  [
                                                                           "a",
                                                                           "an",
                                                                           "the"
                                                                       ],
                                                           "correctIndex":  1,
                                                           "explanation":  "We use an before a vowel sound, and apple starts with a vowel sound."
                                                       },
                                                       {
                                                           "type":  "word_order",
                                                           "words":  [
                                                                         "I",
                                                                         "have",
                                                                         "a",
                                                                         "cat"
                                                                     ],
                                                           "correctOrder":  [
                                                                                "I",
                                                                                "have",
                                                                                "a",
                                                                                "cat"
                                                                            ],
                                                           "hint":  "Sujeto + verbo + articulo + sustantivo."
                                                       },
                                                       {
                                                           "type":  "multiple_choice",
                                                           "question":  "Choose the correct article: ___ sun is hot.",
                                                           "options":  [
                                                                           "A",
                                                                           "An",
                                                                           "The"
                                                                       ],
                                                           "correctIndex":  2,
                                                           "explanation":  "We use the for a specific, unique thing that we both know, like the sun."
                                                       },
                                                       {
                                                           "type":  "word_order",
                                                           "words":  [
                                                                         "She",
                                                                         "eats",
                                                                         "an",
                                                                         "egg"
                                                                     ],
                                                           "correctOrder":  [
                                                                                "She",
                                                                                "eats",
                                                                                "an",
                                                                                "egg"
                                                                            ],
                                                           "hint":  "Usa an antes de un sonido de vocal (egg)."
                                                       },
                                                       {
                                                           "type":  "multiple_choice",
                                                           "question":  "Choose the correct article: He is ___ teacher.",
                                                           "options":  [
                                                                           "an",
                                                                           "a",
                                                                           "the"
                                                                       ],
                                                           "correctIndex":  1,
                                                           "explanation":  "We use a before a consonant sound, and teacher starts with a consonant sound."
                                                       }
                                                   ],
                                     "xpReward":  30,
                                     "mascotState":  "explaining",
                                     "nextLessonId":  "core-grammar-03-plurals"
                                 },
    "core-grammar-03-plurals":  {
                                    "lessonId":  "core-grammar-03-plurals",
                                    "level":  "A1",
                                    "track":  "Core Grammar",
                                    "title":  "Plural Nouns",
                                    "explanation":  {
                                                        "body":  "To make most nouns plural, we add -s (cat → cats). After s, x, ch, or sh, we add -es (box → boxes). When a word ends in a consonant + y, we change y to -ies (city → cities). Some plurals are irregular and we must learn them: man → men, child → children, foot → feet. (En español normalmente solo agregamos -s o -es, pero el inglés tiene plurales irregulares que debes memorizar.)",
                                                        "examples":  [
                                                                         {
                                                                             "en":  "I have two cats.",
                                                                             "es":  "Tengo dos gatos."
                                                                         },
                                                                         {
                                                                             "en":  "There are three boxes.",
                                                                             "es":  "Hay tres cajas."
                                                                         },
                                                                         {
                                                                             "en":  "We visit two cities.",
                                                                             "es":  "Visitamos dos ciudades."
                                                                         },
                                                                         {
                                                                             "en":  "The children play.",
                                                                             "es":  "Los niños juegan."
                                                                         }
                                                                     ]
                                                    },
                                    "exercises":  [
                                                      {
                                                          "type":  "multiple_choice",
                                                          "question":  "Choose the correct plural: I have two ___.",
                                                          "options":  [
                                                                          "dog",
                                                                          "dogs",
                                                                          "doges"
                                                                      ],
                                                          "correctIndex":  1,
                                                          "explanation":  "Most nouns just add -s, so \u0027dog\u0027 becomes \u0027dogs\u0027."
                                                      },
                                                      {
                                                          "type":  "word_order",
                                                          "words":  [
                                                                        "I",
                                                                        "have",
                                                                        "two",
                                                                        "boxes"
                                                                    ],
                                                          "correctOrder":  [
                                                                               "I",
                                                                               "have",
                                                                               "two",
                                                                               "boxes"
                                                                           ],
                                                          "hint":  "Subject + verbo + número + sustantivo. \u0027Box\u0027 termina en -x, así que el plural es \u0027boxes\u0027."
                                                      },
                                                      {
                                                          "type":  "multiple_choice",
                                                          "question":  "Choose the correct plural: She has three ___.",
                                                          "options":  [
                                                                          "babys",
                                                                          "babies",
                                                                          "babyes"
                                                                      ],
                                                          "correctIndex":  1,
                                                          "explanation":  "Consonant + y becomes -ies, so \u0027baby\u0027 becomes \u0027babies\u0027."
                                                      },
                                                      {
                                                          "type":  "word_order",
                                                          "words":  [
                                                                        "The",
                                                                        "children",
                                                                        "are",
                                                                        "here"
                                                                    ],
                                                          "correctOrder":  [
                                                                               "The",
                                                                               "children",
                                                                               "are",
                                                                               "here"
                                                                           ],
                                                          "hint":  "El plural irregular de \u0027child\u0027 es \u0027children\u0027."
                                                      },
                                                      {
                                                          "type":  "multiple_choice",
                                                          "question":  "Choose the correct plural: I have two ___.",
                                                          "options":  [
                                                                          "foots",
                                                                          "feet",
                                                                          "feets"
                                                                      ],
                                                          "correctIndex":  1,
                                                          "explanation":  "\u0027Foot\u0027 is irregular; its plural is \u0027feet\u0027, not \u0027foots\u0027."
                                                      }
                                                  ],
                                    "xpReward":  30,
                                    "mascotState":  "explaining",
                                    "nextLessonId":  "core-grammar-04-present-simple"
                                },
    "core-grammar-04-present-simple":  {
                                           "lessonId":  "core-grammar-04-present-simple",
                                           "level":  "A1",
                                           "track":  "Core Grammar",
                                           "title":  "Present Simple",
                                           "explanation":  {
                                                               "body":  "We use the present simple to talk about routines, habits, and facts. With I, you, we, and they, we use the base verb (I work). With he, she, and it, we add -s to the verb (he works). For negatives and questions, we use do or does with the base verb: I don\u0027t work, he doesn\u0027t work, Do you work?, Does he work? (Usamos do/does para negativos y preguntas, y el verbo vuelve a su forma base.)",
                                                               "examples":  [
                                                                                {
                                                                                    "en":  "I live in Mexico.",
                                                                                    "es":  "Yo vivo en Mexico."
                                                                                },
                                                                                {
                                                                                    "en":  "She works every day.",
                                                                                    "es":  "Ella trabaja todos los dias."
                                                                                },
                                                                                {
                                                                                    "en":  "They don\u0027t eat meat.",
                                                                                    "es":  "Ellos no comen carne."
                                                                                },
                                                                                {
                                                                                    "en":  "Does he speak English?",
                                                                                    "es":  "Habla el ingles?"
                                                                                }
                                                                            ]
                                                           },
                                           "exercises":  [
                                                             {
                                                                 "type":  "multiple_choice",
                                                                 "question":  "Choose the correct sentence.",
                                                                 "options":  [
                                                                                 "She work in a shop.",
                                                                                 "She works in a shop.",
                                                                                 "She to work in a shop."
                                                                             ],
                                                                 "correctIndex":  1,
                                                                 "explanation":  "With he, she, or it, the verb takes -s, so we say \"She works\"."
                                                             },
                                                             {
                                                                 "type":  "word_order",
                                                                 "words":  [
                                                                               "I",
                                                                               "drink",
                                                                               "coffee",
                                                                               "every",
                                                                               "day"
                                                                           ],
                                                                 "correctOrder":  [
                                                                                      "I",
                                                                                      "drink",
                                                                                      "coffee",
                                                                                      "every",
                                                                                      "day"
                                                                                  ],
                                                                 "hint":  "Habito diario. Empieza con \"I\"."
                                                             },
                                                             {
                                                                 "type":  "multiple_choice",
                                                                 "question":  "Complete: \"He ___ like fish.\"",
                                                                 "options":  [
                                                                                 "don\u0027t",
                                                                                 "doesn\u0027t",
                                                                                 "not"
                                                                             ],
                                                                 "correctIndex":  1,
                                                                 "explanation":  "For he, she, or it we use \"doesn\u0027t\" plus the base verb."
                                                             },
                                                             {
                                                                 "type":  "word_order",
                                                                 "words":  [
                                                                               "Do",
                                                                               "you",
                                                                               "like",
                                                                               "tea",
                                                                               "?"
                                                                           ],
                                                                 "correctOrder":  [
                                                                                      "Do",
                                                                                      "you",
                                                                                      "like",
                                                                                      "tea",
                                                                                      "?"
                                                                                  ],
                                                                 "hint":  "Pregunta con \"do\". Termina con \"?\"."
                                                             },
                                                             {
                                                                 "type":  "multiple_choice",
                                                                 "question":  "Complete: \"___ she live here?\"",
                                                                 "options":  [
                                                                                 "Do",
                                                                                 "Does",
                                                                                 "Is"
                                                                             ],
                                                                 "correctIndex":  1,
                                                                 "explanation":  "For he, she, or it, questions begin with \"Does\" plus the base verb."
                                                             }
                                                         ],
                                           "xpReward":  30,
                                           "mascotState":  "explaining",
                                           "nextLessonId":  "core-grammar-05-there-is-are"
                                       },
    "core-grammar-05-there-is-are":  {
                                         "lessonId":  "core-grammar-05-there-is-are",
                                         "level":  "A1",
                                         "track":  "Core Grammar",
                                         "title":  "There is / There are",
                                         "explanation":  {
                                                             "body":  "Use there is for one thing (singular) and there are for many things (plural). For negatives, use there isn\u0027t and there aren\u0027t; for questions, use Is there...? and Are there...? We use a/an with singular nouns, and some in positive sentences with plurals or any in negatives and questions. (Usamos \"there is\" para una cosa y \"there are\" para varias cosas; el verbo cambia segun el numero.)",
                                                             "examples":  [
                                                                              {
                                                                                  "en":  "There is a book on the table.",
                                                                                  "es":  "Hay un libro en la mesa."
                                                                              },
                                                                              {
                                                                                  "en":  "There are some apples in the bag.",
                                                                                  "es":  "Hay algunas manzanas en la bolsa."
                                                                              },
                                                                              {
                                                                                  "en":  "There isn\u0027t any milk in the fridge.",
                                                                                  "es":  "No hay leche en el refrigerador."
                                                                              },
                                                                              {
                                                                                  "en":  "Is there a bank near here?",
                                                                                  "es":  "Hay un banco cerca de aqui?"
                                                                              }
                                                                          ]
                                                         },
                                         "exercises":  [
                                                           {
                                                               "type":  "multiple_choice",
                                                               "question":  "____ a cat in the garden.",
                                                               "options":  [
                                                                               "There is",
                                                                               "There are",
                                                                               "There be"
                                                                           ],
                                                               "correctIndex":  0,
                                                               "explanation":  "We use \"There is\" with a singular noun like \"a cat.\""
                                                           },
                                                           {
                                                               "type":  "word_order",
                                                               "words":  [
                                                                             "There",
                                                                             "are",
                                                                             "three",
                                                                             "books",
                                                                             "here"
                                                                         ],
                                                               "correctOrder":  [
                                                                                    "There",
                                                                                    "are",
                                                                                    "three",
                                                                                    "books",
                                                                                    "here"
                                                                                ],
                                                               "hint":  "Habla de varios libros (plural)."
                                                           },
                                                           {
                                                               "type":  "multiple_choice",
                                                               "question":  "____ any chairs in the room?",
                                                               "options":  [
                                                                               "Is there",
                                                                               "Are there",
                                                                               "There are"
                                                                           ],
                                                               "correctIndex":  1,
                                                               "explanation":  "Questions with a plural noun use \"Are there\" at the start."
                                                           },
                                                           {
                                                               "type":  "word_order",
                                                               "words":  [
                                                                             "There",
                                                                             "isn\u0027t",
                                                                             "any",
                                                                             "water"
                                                                         ],
                                                               "correctOrder":  [
                                                                                    "There",
                                                                                    "isn\u0027t",
                                                                                    "any",
                                                                                    "water"
                                                                                ],
                                                               "hint":  "Frase negativa con algo que no se cuenta (singular)."
                                                           },
                                                           {
                                                               "type":  "multiple_choice",
                                                               "question":  "There ____ some eggs in the box.",
                                                               "options":  [
                                                                               "is",
                                                                               "are",
                                                                               "am"
                                                                           ],
                                                               "correctIndex":  1,
                                                               "explanation":  "\"Some eggs\" is plural, so we use \"are.\""
                                                           }
                                                       ],
                                         "xpReward":  30,
                                         "mascotState":  "explaining",
                                         "nextLessonId":  "core-grammar-06-present-continuous"
                                     },
    "core-grammar-06-present-continuous":  {
                                               "lessonId":  "core-grammar-06-present-continuous",
                                               "level":  "A2",
                                               "track":  "Core Grammar",
                                               "title":  "Present Continuous",
                                               "explanation":  {
                                                                   "body":  "We use the present continuous to talk about actions happening now. We make it with am, is, or are + verb-ing (for example: I am reading, she is working). For most verbs we just add -ing, but we drop a final -e (make - making) and we double a final consonant after a short vowel (run - running). We use the present simple for habits and routines, but the present continuous for things right now. (En espanol, usamos esta forma para acciones que pasan en este momento, como \"estoy leyendo\".)",
                                                                   "examples":  [
                                                                                    {
                                                                                        "en":  "I am studying English now.",
                                                                                        "es":  "Estoy estudiando ingles ahora."
                                                                                    },
                                                                                    {
                                                                                        "en":  "She is cooking dinner.",
                                                                                        "es":  "Ella esta cocinando la cena."
                                                                                    },
                                                                                    {
                                                                                        "en":  "They are playing in the park.",
                                                                                        "es":  "Ellos estan jugando en el parque."
                                                                                    },
                                                                                    {
                                                                                        "en":  "He usually walks to work, but today he is taking the bus.",
                                                                                        "es":  "El normalmente camina al trabajo, pero hoy esta tomando el autobus."
                                                                                    }
                                                                                ]
                                                               },
                                               "exercises":  [
                                                                 {
                                                                     "type":  "multiple_choice",
                                                                     "question":  "Choose the correct sentence for an action happening now.",
                                                                     "options":  [
                                                                                     "She is write a letter.",
                                                                                     "She is writing a letter.",
                                                                                     "She writing a letter."
                                                                                 ],
                                                                     "correctIndex":  1,
                                                                     "explanation":  "The present continuous needs is + verb-ing, so \"is writing\" is correct."
                                                                 },
                                                                 {
                                                                     "type":  "word_order",
                                                                     "words":  [
                                                                                   "I",
                                                                                   "am",
                                                                                   "watching",
                                                                                   "TV"
                                                                               ],
                                                                     "correctOrder":  [
                                                                                          "I",
                                                                                          "am",
                                                                                          "watching",
                                                                                          "TV"
                                                                                      ],
                                                                     "hint":  "Empieza con el sujeto: I + am + verbo-ing."
                                                                 },
                                                                 {
                                                                     "type":  "multiple_choice",
                                                                     "question":  "Complete: The children ____ in the garden right now.",
                                                                     "options":  [
                                                                                     "are playing",
                                                                                     "is playing",
                                                                                     "are play"
                                                                                 ],
                                                                     "correctIndex":  0,
                                                                     "explanation":  "\"Children\" is plural, so we use \"are\" + the -ing form \"playing\"."
                                                                 },
                                                                 {
                                                                     "type":  "word_order",
                                                                     "words":  [
                                                                                   "What",
                                                                                   "are",
                                                                                   "you",
                                                                                   "doing",
                                                                                   "?"
                                                                               ],
                                                                     "correctOrder":  [
                                                                                          "What",
                                                                                          "are",
                                                                                          "you",
                                                                                          "doing",
                                                                                          "?"
                                                                                      ],
                                                                     "hint":  "Es una pregunta: empieza con What y termina con ?."
                                                                 },
                                                                 {
                                                                     "type":  "multiple_choice",
                                                                     "question":  "Which spelling of the -ing form is correct?",
                                                                     "options":  [
                                                                                     "runing",
                                                                                     "running",
                                                                                     "runng"
                                                                                 ],
                                                                     "correctIndex":  1,
                                                                     "explanation":  "After a short vowel we double the final consonant, so \"run\" becomes \"running\"."
                                                                 }
                                                             ],
                                               "xpReward":  40,
                                               "mascotState":  "explaining",
                                               "nextLessonId":  "core-grammar-07-past-simple"
                                           },
    "core-grammar-07-past-simple":  {
                                        "lessonId":  "core-grammar-07-past-simple",
                                        "level":  "A2",
                                        "track":  "Core Grammar",
                                        "title":  "Past Simple",
                                        "explanation":  {
                                                            "body":  "We use the past simple to talk about finished actions in the past. For regular verbs, we add -ed to the base verb (work → worked, play → played). Many common verbs are irregular and change form (go → went, have → had, see → saw). For negatives and questions we use did + the base verb, and the main verb goes back to its base form (I didn\u0027t go; Did you see it?). (En negativos y preguntas usamos \"did\" + el verbo base, sin -ed ni forma irregular.)",
                                                            "examples":  [
                                                                             {
                                                                                 "en":  "I worked at home yesterday.",
                                                                                 "es":  "Trabajé en casa ayer."
                                                                             },
                                                                             {
                                                                                 "en":  "She went to the park last Sunday.",
                                                                                 "es":  "Ella fue al parque el domingo pasado."
                                                                             },
                                                                             {
                                                                                 "en":  "We didn\u0027t have breakfast this morning.",
                                                                                 "es":  "No desayunamos esta mañana."
                                                                             },
                                                                             {
                                                                                 "en":  "Did you see the film?",
                                                                                 "es":  "¿Viste la película?"
                                                                             }
                                                                         ]
                                                        },
                                        "exercises":  [
                                                          {
                                                              "type":  "multiple_choice",
                                                              "question":  "Yesterday I ____ to school by bus.",
                                                              "options":  [
                                                                              "go",
                                                                              "went",
                                                                              "goed"
                                                                          ],
                                                              "correctIndex":  1,
                                                              "explanation":  "\"Go\" is irregular, so the past simple is \"went,\" not \"goed.\""
                                                          },
                                                          {
                                                              "type":  "word_order",
                                                              "words":  [
                                                                            "She",
                                                                            "watched",
                                                                            "a",
                                                                            "movie",
                                                                            "yesterday"
                                                                        ],
                                                              "correctOrder":  [
                                                                                   "She",
                                                                                   "watched",
                                                                                   "a",
                                                                                   "movie",
                                                                                   "yesterday"
                                                                               ],
                                                              "hint":  "Sujeto + verbo en pasado (-ed) + objeto + tiempo."
                                                          },
                                                          {
                                                              "type":  "multiple_choice",
                                                              "question":  "We ____ go to the party last night.",
                                                              "options":  [
                                                                              "didn\u0027t",
                                                                              "don\u0027t",
                                                                              "didn\u0027t went"
                                                                          ],
                                                              "correctIndex":  0,
                                                              "explanation":  "Negatives in the past use \"didn\u0027t\" + the base verb \"go.\""
                                                          },
                                                          {
                                                              "type":  "word_order",
                                                              "words":  [
                                                                            "Did",
                                                                            "you",
                                                                            "see",
                                                                            "the",
                                                                            "film",
                                                                            "?"
                                                                        ],
                                                              "correctOrder":  [
                                                                                   "Did",
                                                                                   "you",
                                                                                   "see",
                                                                                   "the",
                                                                                   "film",
                                                                                   "?"
                                                                               ],
                                                              "hint":  "Pregunta en pasado: Did + sujeto + verbo base + objeto + ?"
                                                          },
                                                          {
                                                              "type":  "multiple_choice",
                                                              "question":  "They ____ a big house in 2010.",
                                                              "options":  [
                                                                              "haved",
                                                                              "had",
                                                                              "did had"
                                                                          ],
                                                              "correctIndex":  1,
                                                              "explanation":  "\"Have\" is irregular; its past simple form is \"had.\""
                                                          }
                                                      ],
                                        "xpReward":  40,
                                        "mascotState":  "explaining",
                                        "nextLessonId":  "core-grammar-08-comparatives"
                                    },
    "core-grammar-08-comparatives":  {
                                         "lessonId":  "core-grammar-08-comparatives",
                                         "level":  "A2",
                                         "track":  "Core Grammar",
                                         "title":  "Comparatives \u0026 Superlatives",
                                         "explanation":  {
                                                             "body":  "To compare two things, use the comparative. For short adjectives, add -er and use \"than\" (cheap → cheaper than). For long adjectives, use \"more ... than\" (more expensive than). To say something is number one in a group, use the superlative: \"the\" + -est for short adjectives (the cheapest), or \"the most ...\" for long adjectives (the most expensive). Some words are irregular: good/better/the best, bad/worse/the worst. (Recuerda: -er/than para comparar dos cosas; the -est o the most para el superlativo; good y bad son irregulares.)",
                                                             "examples":  [
                                                                              {
                                                                                  "en":  "My brother is taller than me.",
                                                                                  "es":  "Mi hermano es más alto que yo."
                                                                              },
                                                                              {
                                                                                  "en":  "This book is more interesting than that one.",
                                                                                  "es":  "Este libro es más interesante que ese."
                                                                              },
                                                                              {
                                                                                  "en":  "She is the best student in the class.",
                                                                                  "es":  "Ella es la mejor estudiante de la clase."
                                                                              },
                                                                              {
                                                                                  "en":  "Today is the worst day of the week.",
                                                                                  "es":  "Hoy es el peor día de la semana."
                                                                              }
                                                                          ]
                                                         },
                                         "exercises":  [
                                                           {
                                                               "type":  "multiple_choice",
                                                               "question":  "A train is _____ a bicycle.",
                                                               "options":  [
                                                                               "faster than",
                                                                               "more fast than",
                                                                               "fast than"
                                                                           ],
                                                               "correctIndex":  0,
                                                               "explanation":  "\"Fast\" is a short adjective, so we add -er and use \"than\": faster than."
                                                           },
                                                           {
                                                               "type":  "multiple_choice",
                                                               "question":  "This is _____ restaurant in the city.",
                                                               "options":  [
                                                                               "the more expensive",
                                                                               "the most expensive",
                                                                               "the expensivest"
                                                                           ],
                                                               "correctIndex":  1,
                                                               "explanation":  "\"Expensive\" is a long adjective, so the superlative is \"the most expensive.\""
                                                           },
                                                           {
                                                               "type":  "word_order",
                                                               "words":  [
                                                                             "My",
                                                                             "sister",
                                                                             "is",
                                                                             "older",
                                                                             "than",
                                                                             "me"
                                                                         ],
                                                               "correctOrder":  [
                                                                                    "My",
                                                                                    "sister",
                                                                                    "is",
                                                                                    "older",
                                                                                    "than",
                                                                                    "me"
                                                                                ],
                                                               "hint":  "Compara dos personas: usa -er + than."
                                                           },
                                                           {
                                                               "type":  "word_order",
                                                               "words":  [
                                                                             "This",
                                                                             "is",
                                                                             "the",
                                                                             "best",
                                                                             "song",
                                                                             "ever"
                                                                         ],
                                                               "correctOrder":  [
                                                                                    "This",
                                                                                    "is",
                                                                                    "the",
                                                                                    "best",
                                                                                    "song",
                                                                                    "ever"
                                                                                ],
                                                               "hint":  "Superlativo irregular de \"good\": the best."
                                                           },
                                                           {
                                                               "type":  "multiple_choice",
                                                               "question":  "My phone is _____ than yours.",
                                                               "options":  [
                                                                               "worse",
                                                                               "worst",
                                                                               "more bad"
                                                                           ],
                                                               "correctIndex":  0,
                                                               "explanation":  "The comparative of \"bad\" is the irregular form \"worse\" (not \"worst\" or \"more bad\")."
                                                           }
                                                       ],
                                         "xpReward":  40,
                                         "mascotState":  "explaining",
                                         "nextLessonId":  "core-grammar-09-countables"
                                     },
    "core-grammar-09-countables":  {
                                       "lessonId":  "core-grammar-09-countables",
                                       "level":  "A2",
                                       "track":  "Core Grammar",
                                       "title":  "Countable \u0026 Uncountable",
                                       "explanation":  {
                                                           "body":  "Countable nouns are things you can count: one apple, two apples. Uncountable nouns are things you cannot count one by one, like water, rice, or money, and they have no plural form. Use some in positive sentences and any in questions and negatives; use How many with countable nouns and How much with uncountable nouns. (En espanol: los sustantivos contables tienen plural y los incontables no.)",
                                                           "examples":  [
                                                                            {
                                                                                "en":  "I have some apples and some milk.",
                                                                                "es":  "Tengo algunas manzanas y algo de leche."
                                                                            },
                                                                            {
                                                                                "en":  "We don\u0027t have any bread.",
                                                                                "es":  "No tenemos pan."
                                                                            },
                                                                            {
                                                                                "en":  "How many eggs do you need?",
                                                                                "es":  "Cuantos huevos necesitas?"
                                                                            },
                                                                            {
                                                                                "en":  "How much water do you drink?",
                                                                                "es":  "Cuanta agua bebes?"
                                                                            }
                                                                        ]
                                                       },
                                       "exercises":  [
                                                         {
                                                             "type":  "multiple_choice",
                                                             "question":  "How ___ sugar do you want in your coffee?",
                                                             "options":  [
                                                                             "much",
                                                                             "many",
                                                                             "any"
                                                                         ],
                                                             "correctIndex":  0,
                                                             "explanation":  "Sugar is uncountable, so we use How much."
                                                         },
                                                         {
                                                             "type":  "multiple_choice",
                                                             "question":  "There aren\u0027t ___ apples in the fridge.",
                                                             "options":  [
                                                                             "some",
                                                                             "any",
                                                                             "much"
                                                                         ],
                                                             "correctIndex":  1,
                                                             "explanation":  "We use any in negative sentences, and apples is countable (so much is wrong)."
                                                         },
                                                         {
                                                             "type":  "word_order",
                                                             "words":  [
                                                                           "I",
                                                                           "have",
                                                                           "some",
                                                                           "money"
                                                                       ],
                                                             "correctOrder":  [
                                                                                  "I",
                                                                                  "have",
                                                                                  "some",
                                                                                  "money"
                                                                              ],
                                                             "hint":  "Frase afirmativa: usa \u0027some\u0027 con un sustantivo incontable."
                                                         },
                                                         {
                                                             "type":  "word_order",
                                                             "words":  [
                                                                           "How",
                                                                           "many",
                                                                           "books",
                                                                           "do",
                                                                           "you",
                                                                           "have",
                                                                           "?"
                                                                       ],
                                                             "correctOrder":  [
                                                                                  "How",
                                                                                  "many",
                                                                                  "books",
                                                                                  "do",
                                                                                  "you",
                                                                                  "have",
                                                                                  "?"
                                                                              ],
                                                             "hint":  "Pregunta con un sustantivo contable: empieza con \u0027How many\u0027."
                                                         },
                                                         {
                                                             "type":  "multiple_choice",
                                                             "question":  "We have ___ bread on the table.",
                                                             "options":  [
                                                                             "a lot of",
                                                                             "many",
                                                                             "how much"
                                                                         ],
                                                             "correctIndex":  0,
                                                             "explanation":  "A lot of works with uncountable nouns like bread; many is only for countable nouns and how much is a question word."
                                                         }
                                                     ],
                                       "xpReward":  40,
                                       "mascotState":  "explaining",
                                       "nextLessonId":  "core-grammar-10-modals-ability"
                                   },
    "core-grammar-10-modals-ability":  {
                                           "lessonId":  "core-grammar-10-modals-ability",
                                           "level":  "A2",
                                           "track":  "Core Grammar",
                                           "title":  "Modals: Ability \u0026 Permission",
                                           "explanation":  {
                                                               "body":  "We use \u0027can\u0027 and \u0027can\u0027t\u0027 to talk about ability now and \u0027could\u0027 / \u0027couldn\u0027t\u0027 for ability in the past. After these modals we use the base verb with no \u0027to\u0027 and no \u0027-s\u0027 (she can swim, NOT she can swims). To ask for permission, start the question with \u0027Can I...?\u0027. (En espanol: \u0027can\u0027 = poder/saber hacer algo; el verbo va en su forma base.)",
                                                               "examples":  [
                                                                                {
                                                                                    "en":  "I can speak English.",
                                                                                    "es":  "Yo se hablar ingles."
                                                                                },
                                                                                {
                                                                                    "en":  "He can\u0027t come today.",
                                                                                    "es":  "El no puede venir hoy."
                                                                                },
                                                                                {
                                                                                    "en":  "When she was young, she could run fast.",
                                                                                    "es":  "Cuando era joven, ella podia correr rapido."
                                                                                },
                                                                                {
                                                                                    "en":  "Can I sit here?",
                                                                                    "es":  "Puedo sentarme aqui?"
                                                                                }
                                                                            ]
                                                           },
                                           "exercises":  [
                                                             {
                                                                 "type":  "multiple_choice",
                                                                 "question":  "She ___ swim very well.",
                                                                 "options":  [
                                                                                 "can",
                                                                                 "can to",
                                                                                 "cans"
                                                                             ],
                                                                 "correctIndex":  0,
                                                                 "explanation":  "After \u0027can\u0027 we use the base verb with no \u0027to\u0027 and no \u0027-s\u0027, so \u0027can swim\u0027 is correct (not \u0027can to swim\u0027 or \u0027cans swim\u0027)."
                                                             },
                                                             {
                                                                 "type":  "word_order",
                                                                 "words":  [
                                                                               "Can",
                                                                               "I",
                                                                               "open",
                                                                               "the",
                                                                               "window",
                                                                               "?"
                                                                           ],
                                                                 "correctOrder":  [
                                                                                      "Can",
                                                                                      "I",
                                                                                      "open",
                                                                                      "the",
                                                                                      "window",
                                                                                      "?"
                                                                                  ],
                                                                 "hint":  "Pide permiso para abrir la ventana (Can I...?)."
                                                             },
                                                             {
                                                                 "type":  "multiple_choice",
                                                                 "question":  "When I was five, I ___ read.",
                                                                 "options":  [
                                                                                 "couldn\u0027t",
                                                                                 "can\u0027t",
                                                                                 "not could"
                                                                             ],
                                                                 "correctIndex":  0,
                                                                 "explanation":  "We use \u0027could/couldn\u0027t\u0027 to talk about ability in the past, so \u0027couldn\u0027t read\u0027 is correct."
                                                             },
                                                             {
                                                                 "type":  "word_order",
                                                                 "words":  [
                                                                               "I",
                                                                               "can\u0027t",
                                                                               "drive",
                                                                               "a",
                                                                               "car"
                                                                           ],
                                                                 "correctOrder":  [
                                                                                      "I",
                                                                                      "can\u0027t",
                                                                                      "drive",
                                                                                      "a",
                                                                                      "car"
                                                                                  ],
                                                                 "hint":  "Di que no sabes (no puedes) conducir un coche."
                                                             },
                                                             {
                                                                 "type":  "multiple_choice",
                                                                 "question":  "___ use your phone, please?",
                                                                 "options":  [
                                                                                 "Can I",
                                                                                 "I can",
                                                                                 "Can I to"
                                                                             ],
                                                                 "correctIndex":  0,
                                                                 "explanation":  "To ask for permission we put the modal first: \u0027Can I...?\u0027 followed by the base verb."
                                                             }
                                                         ],
                                           "xpReward":  40,
                                           "mascotState":  "explaining",
                                           "nextLessonId":  "core-grammar-11-going-to"
                                       },
    "core-grammar-11-going-to":  {
                                     "lessonId":  "core-grammar-11-going-to",
                                     "level":  "A2",
                                     "track":  "Core Grammar",
                                     "title":  "Future: be going to",
                                     "explanation":  {
                                                         "body":  "We use \"be going to\" + base verb to talk about plans and intentions for the future. Use am/is/are with the subject, then \"going to\" and the base verb (for example: I am going to travel). For negatives, add \"not\" after the verb \"be\", and for questions, put am/is/are before the subject. We can also use the present continuous (I am meeting Ana) for fixed arrangements with a clear time. (\"Be going to\" expresa planes e intenciones; el presente continuo se usa para citas o planes ya organizados.)",
                                                         "examples":  [
                                                                          {
                                                                              "en":  "I am going to buy a new phone.",
                                                                              "es":  "Voy a comprar un teléfono nuevo."
                                                                          },
                                                                          {
                                                                              "en":  "They are not going to come to the party.",
                                                                              "es":  "Ellos no van a venir a la fiesta."
                                                                          },
                                                                          {
                                                                              "en":  "Are you going to study English tonight?",
                                                                              "es":  "¿Vas a estudiar inglés esta noche?"
                                                                          },
                                                                          {
                                                                              "en":  "We are having dinner with Tom on Friday.",
                                                                              "es":  "Vamos a cenar con Tom el viernes."
                                                                          }
                                                                      ]
                                                     },
                                     "exercises":  [
                                                       {
                                                           "type":  "multiple_choice",
                                                           "question":  "Choose the correct sentence about a future plan.",
                                                           "options":  [
                                                                           "She is going to visit her family.",
                                                                           "She is going to visits her family.",
                                                                           "She going to visit her family."
                                                                       ],
                                                           "correctIndex":  0,
                                                           "explanation":  "After \"be going to\" we use the base verb (visit), and we need the verb \"is\"."
                                                       },
                                                       {
                                                           "type":  "word_order",
                                                           "words":  [
                                                                         "I",
                                                                         "am",
                                                                         "going",
                                                                         "to",
                                                                         "study",
                                                                         "tonight"
                                                                     ],
                                                           "correctOrder":  [
                                                                                "I",
                                                                                "am",
                                                                                "going",
                                                                                "to",
                                                                                "study",
                                                                                "tonight"
                                                                            ],
                                                           "hint":  "Habla de un plan para esta noche (afirmativo)."
                                                       },
                                                       {
                                                           "type":  "multiple_choice",
                                                           "question":  "Complete the question: \"___ you going to call him?\"",
                                                           "options":  [
                                                                           "Are",
                                                                           "Do",
                                                                           "Is"
                                                                       ],
                                                           "correctIndex":  0,
                                                           "explanation":  "For questions with \"be going to\" and \"you\", we use the auxiliary \"Are\"."
                                                       },
                                                       {
                                                           "type":  "word_order",
                                                           "words":  [
                                                                         "We",
                                                                         "are",
                                                                         "not",
                                                                         "going",
                                                                         "to",
                                                                         "work",
                                                                         "today"
                                                                     ],
                                                           "correctOrder":  [
                                                                                "We",
                                                                                "are",
                                                                                "not",
                                                                                "going",
                                                                                "to",
                                                                                "work",
                                                                                "today"
                                                                            ],
                                                           "hint":  "Frase negativa sobre hoy (usa \"not\")."
                                                       },
                                                       {
                                                           "type":  "multiple_choice",
                                                           "question":  "Which sentence describes a fixed arrangement (present continuous)?",
                                                           "options":  [
                                                                           "I am meeting Ana at six.",
                                                                           "I am going to meet maybe.",
                                                                           "I meet Ana at six going."
                                                                       ],
                                                           "correctIndex":  0,
                                                           "explanation":  "Present continuous (am meeting) shows a fixed arrangement with a time and a person."
                                                       }
                                                   ],
                                     "xpReward":  40,
                                     "mascotState":  "explaining",
                                     "nextLessonId":  "core-grammar-12-present-perfect"
                                 },
    "core-grammar-12-present-perfect":  {
                                            "lessonId":  "core-grammar-12-present-perfect",
                                            "level":  "B1",
                                            "track":  "Core Grammar",
                                            "title":  "Present Perfect",
                                            "explanation":  {
                                                                "body":  "We use the present perfect (have/has + past participle) to talk about life experiences without saying when, and about situations that started in the past and are still true now. We often use it with ever and never (experiences), already and yet (recent actions), and for and since (duration). Use the past simple instead when you say a finished time, like yesterday or in 2019. (En espanol: el presente perfecto conecta el pasado con el presente; el pasado simple se usa para tiempos terminados y concretos.)",
                                                                "examples":  [
                                                                                 {
                                                                                     "en":  "I have visited London twice.",
                                                                                     "es":  "He visitado Londres dos veces."
                                                                                 },
                                                                                 {
                                                                                     "en":  "She has lived here since 2020.",
                                                                                     "es":  "Ella ha vivido aqui desde 2020."
                                                                                 },
                                                                                 {
                                                                                     "en":  "Have you ever eaten sushi?",
                                                                                     "es":  "Alguna vez has comido sushi?"
                                                                                 },
                                                                                 {
                                                                                     "en":  "We saw that film yesterday.",
                                                                                     "es":  "Vimos esa pelicula ayer."
                                                                                 }
                                                                             ]
                                                            },
                                            "exercises":  [
                                                              {
                                                                  "type":  "multiple_choice",
                                                                  "question":  "Choose the correct sentence: She ___ in Madrid for ten years.",
                                                                  "options":  [
                                                                                  "has lived",
                                                                                  "have lived",
                                                                                  "has live"
                                                                              ],
                                                                  "correctIndex":  0,
                                                                  "explanation":  "With \u0027she\u0027 we use \u0027has\u0027 plus the past participle \u0027lived\u0027 for an unfinished period of time."
                                                              },
                                                              {
                                                                  "type":  "word_order",
                                                                  "words":  [
                                                                                "I",
                                                                                "have",
                                                                                "never",
                                                                                "been",
                                                                                "to",
                                                                                "Japan"
                                                                            ],
                                                                  "correctOrder":  [
                                                                                       "I",
                                                                                       "have",
                                                                                       "never",
                                                                                       "been",
                                                                                       "to",
                                                                                       "Japan"
                                                                                   ],
                                                                  "hint":  "Habla de una experiencia que nunca has tenido. Empieza con \u0027I\u0027."
                                                              },
                                                              {
                                                                  "type":  "multiple_choice",
                                                                  "question":  "Which option is correct? We finished the project ___.",
                                                                  "options":  [
                                                                                  "last week",
                                                                                  "yet",
                                                                                  "since Monday"
                                                                              ],
                                                                  "correctIndex":  0,
                                                                  "explanation":  "\u0027Finished\u0027 is past simple, so it needs a finished time expression like \u0027last week\u0027, not present perfect words."
                                                              },
                                                              {
                                                                  "type":  "word_order",
                                                                  "words":  [
                                                                                "Have",
                                                                                "you",
                                                                                "finished",
                                                                                "your",
                                                                                "homework",
                                                                                "yet",
                                                                                "?"
                                                                            ],
                                                                  "correctOrder":  [
                                                                                       "Have",
                                                                                       "you",
                                                                                       "finished",
                                                                                       "your",
                                                                                       "homework",
                                                                                       "yet",
                                                                                       "?"
                                                                                   ],
                                                                  "hint":  "Es una pregunta con \u0027yet\u0027 al final. Usa el auxiliar \u0027Have\u0027 al principio."
                                                              },
                                                              {
                                                                  "type":  "multiple_choice",
                                                                  "question":  "Complete the question: ___ you ever tried Thai food?",
                                                                  "options":  [
                                                                                  "Have",
                                                                                  "Did",
                                                                                  "Has"
                                                                              ],
                                                                  "correctIndex":  0,
                                                                  "explanation":  "For experiences with \u0027ever\u0027 and the subject \u0027you\u0027, we use the auxiliary \u0027Have\u0027."
                                                              }
                                                          ],
                                            "xpReward":  50,
                                            "mascotState":  "explaining",
                                            "nextLessonId":  "core-grammar-13-first-conditional"
                                        },
    "core-grammar-13-first-conditional":  {
                                              "lessonId":  "core-grammar-13-first-conditional",
                                              "level":  "B1",
                                              "track":  "Core Grammar",
                                              "title":  "First Conditional",
                                              "explanation":  {
                                                                  "body":  "Use the first conditional to talk about real possibilities in the future. The structure is: If + present simple, ... will + base verb. When the if-clause comes first, put a comma after it; when it comes second, no comma is needed. You can also use \"unless\" to mean \"if not.\" (\"Unless\" significa \"si no\" y reemplaza a \"if ... not\".)",
                                                                  "examples":  [
                                                                                   {
                                                                                       "en":  "If it rains tomorrow, we will stay at home.",
                                                                                       "es":  "Si llueve mañana, nos quedaremos en casa."
                                                                                   },
                                                                                   {
                                                                                       "en":  "She will pass the exam if she studies hard.",
                                                                                       "es":  "Aprobará el examen si estudia mucho."
                                                                                   },
                                                                                   {
                                                                                       "en":  "Unless you hurry, you will miss the bus.",
                                                                                       "es":  "Si no te apuras, perderás el autobús."
                                                                                   },
                                                                                   {
                                                                                       "en":  "If I have time, I will call you tonight.",
                                                                                       "es":  "Si tengo tiempo, te llamaré esta noche."
                                                                                   }
                                                                               ]
                                                              },
                                              "exercises":  [
                                                                {
                                                                    "type":  "multiple_choice",
                                                                    "question":  "If the weather is nice, we ___ to the beach.",
                                                                    "options":  [
                                                                                    "will go",
                                                                                    "go will",
                                                                                    "will to go"
                                                                                ],
                                                                    "correctIndex":  0,
                                                                    "explanation":  "The main clause needs \"will\" + the base verb, so \"will go\" is correct."
                                                                },
                                                                {
                                                                    "type":  "word_order",
                                                                    "words":  [
                                                                                  "If",
                                                                                  "you",
                                                                                  "call",
                                                                                  "me,",
                                                                                  "I",
                                                                                  "will",
                                                                                  "answer."
                                                                              ],
                                                                    "correctOrder":  [
                                                                                         "If",
                                                                                         "you",
                                                                                         "call",
                                                                                         "me,",
                                                                                         "I",
                                                                                         "will",
                                                                                         "answer."
                                                                                     ],
                                                                    "hint":  "Empieza con la cláusula \"if\" y recuerda la coma."
                                                                },
                                                                {
                                                                    "type":  "multiple_choice",
                                                                    "question":  "Unless he ___ now, he will be late.",
                                                                    "options":  [
                                                                                    "leaves",
                                                                                    "leave",
                                                                                    "will leave"
                                                                                ],
                                                                    "correctIndex":  0,
                                                                    "explanation":  "After \"unless\" we use the present simple, and with \"he\" the verb needs an -s, so \"leaves\" is correct."
                                                                },
                                                                {
                                                                    "type":  "word_order",
                                                                    "words":  [
                                                                                  "We",
                                                                                  "will",
                                                                                  "win",
                                                                                  "if",
                                                                                  "we",
                                                                                  "practise."
                                                                              ],
                                                                    "correctOrder":  [
                                                                                         "We",
                                                                                         "will",
                                                                                         "win",
                                                                                         "if",
                                                                                         "we",
                                                                                         "practise."
                                                                                     ],
                                                                    "hint":  "Aquí la cláusula \"if\" va al final, sin coma."
                                                                },
                                                                {
                                                                    "type":  "multiple_choice",
                                                                    "question":  "If she ___ early, she will catch the train.",
                                                                    "options":  [
                                                                                    "wakes up",
                                                                                    "wake up",
                                                                                    "will wake up"
                                                                                ],
                                                                    "correctIndex":  0,
                                                                    "explanation":  "The if-clause uses the present simple, and with \"she\" we add -s, so \"wakes up\" is correct."
                                                                }
                                                            ],
                                              "xpReward":  50,
                                              "mascotState":  "explaining",
                                              "nextLessonId":  "core-grammar-14-past-continuous"
                                          },
    "core-grammar-14-past-continuous":  {
                                            "lessonId":  "core-grammar-14-past-continuous",
                                            "level":  "B1",
                                            "track":  "Core Grammar",
                                            "title":  "Past Continuous",
                                            "explanation":  {
                                                                "body":  "We use the past continuous to talk about an action that was in progress at a moment in the past. We form it with was or were plus the -ing form of the verb (for example, I was reading, they were playing). We often combine it with the past simple using when and while: the past continuous shows the longer background action, and the past simple shows the shorter action that interrupted it. (Usamos el pasado continuo para una accion en progreso en el pasado, y lo contrastamos con el pasado simple usando when y while.)",
                                                                "examples":  [
                                                                                 {
                                                                                     "en":  "I was cooking dinner when she called me.",
                                                                                     "es":  "Estaba cocinando la cena cuando ella me llamo."
                                                                                 },
                                                                                 {
                                                                                     "en":  "While we were watching the film, the lights went out.",
                                                                                     "es":  "Mientras veiamos la pelicula, se fueron las luces."
                                                                                 },
                                                                                 {
                                                                                     "en":  "They were studying at eight o\u0027clock last night.",
                                                                                     "es":  "Ellos estaban estudiando a las ocho de la noche anoche."
                                                                                 },
                                                                                 {
                                                                                     "en":  "What were you doing when it started to rain?",
                                                                                     "es":  "Que estabas haciendo cuando empezo a llover?"
                                                                                 }
                                                                             ]
                                                            },
                                            "exercises":  [
                                                              {
                                                                  "type":  "multiple_choice",
                                                                  "question":  "Choose the correct sentence: an action in progress when the phone rang.",
                                                                  "options":  [
                                                                                  "I was sleeping when the phone rang.",
                                                                                  "I was sleep when the phone rang.",
                                                                                  "I were sleeping when the phone rang."
                                                                              ],
                                                                  "correctIndex":  0,
                                                                  "explanation":  "The past continuous needs was/were plus the -ing form, and with I we use was sleeping."
                                                              },
                                                              {
                                                                  "type":  "word_order",
                                                                  "words":  [
                                                                                "She",
                                                                                "was",
                                                                                "reading",
                                                                                "a",
                                                                                "book"
                                                                            ],
                                                                  "correctOrder":  [
                                                                                       "She",
                                                                                       "was",
                                                                                       "reading",
                                                                                       "a",
                                                                                       "book"
                                                                                   ],
                                                                  "hint":  "Sujeto + was + verbo en -ing (accion en progreso)."
                                                              },
                                                              {
                                                                  "type":  "multiple_choice",
                                                                  "question":  "Complete: While we ___ lunch, our friends arrived.",
                                                                  "options":  [
                                                                                  "were having",
                                                                                  "was having",
                                                                                  "were have"
                                                                              ],
                                                                  "correctIndex":  0,
                                                                  "explanation":  "With we we use were, plus the -ing form having, for the background action."
                                                              },
                                                              {
                                                                  "type":  "word_order",
                                                                  "words":  [
                                                                                "They",
                                                                                "were",
                                                                                "playing",
                                                                                "in",
                                                                                "the",
                                                                                "garden"
                                                                            ],
                                                                  "correctOrder":  [
                                                                                       "They",
                                                                                       "were",
                                                                                       "playing",
                                                                                       "in",
                                                                                       "the",
                                                                                       "garden"
                                                                                   ],
                                                                  "hint":  "Usa were + verbo en -ing para una accion en progreso."
                                                              },
                                                              {
                                                                  "type":  "multiple_choice",
                                                                  "question":  "Choose the correct question about a past action in progress.",
                                                                  "options":  [
                                                                                  "What were you doing then?",
                                                                                  "What you were doing then?",
                                                                                  "What were you do then?"
                                                                              ],
                                                                  "correctIndex":  0,
                                                                  "explanation":  "In questions the auxiliary were comes before the subject, followed by the -ing form doing."
                                                              }
                                                          ],
                                            "xpReward":  50,
                                            "mascotState":  "explaining",
                                            "nextLessonId":  "core-grammar-15-will-vs-going-to"
                                        },
    "core-grammar-15-will-vs-going-to":  {
                                             "lessonId":  "core-grammar-15-will-vs-going-to",
                                             "level":  "B1",
                                             "track":  "Core Grammar",
                                             "title":  "will vs be going to",
                                             "explanation":  {
                                                                 "body":  "Use will for instant decisions made at the moment of speaking, for predictions about the future, and for offers and promises. Use be going to for plans and intentions you decided before now, and for predictions based on present evidence you can see. Both talk about the future, but the speaker\u0027s reason for choosing each one is different. (En espanol: usamos \"will\" para decisiones del momento, predicciones, ofertas y promesas; usamos \"be going to\" para planes ya decididos e intenciones.)",
                                                                 "examples":  [
                                                                                  {
                                                                                      "en":  "The phone is ringing. I\u0027ll answer it.",
                                                                                      "es":  "El telefono esta sonando. Yo lo contesto."
                                                                                  },
                                                                                  {
                                                                                      "en":  "We are going to visit my grandma next weekend.",
                                                                                      "es":  "Vamos a visitar a mi abuela el proximo fin de semana."
                                                                                  },
                                                                                  {
                                                                                      "en":  "Look at those dark clouds. It\u0027s going to rain.",
                                                                                      "es":  "Mira esas nubes oscuras. Va a llover."
                                                                                  },
                                                                                  {
                                                                                      "en":  "Don\u0027t worry, I\u0027ll help you with your homework.",
                                                                                      "es":  "No te preocupes, te ayudare con tu tarea."
                                                                                  }
                                                                              ]
                                                             },
                                             "exercises":  [
                                                               {
                                                                   "type":  "multiple_choice",
                                                                   "question":  "The bags look heavy. ___ carry one for you.",
                                                                   "options":  [
                                                                                   "I\u0027ll",
                                                                                   "I\u0027m going to",
                                                                                   "I going to"
                                                                               ],
                                                                   "correctIndex":  0,
                                                                   "explanation":  "This is an offer decided at the moment of speaking, so we use \"will\"."
                                                               },
                                                               {
                                                                   "type":  "word_order",
                                                                   "words":  [
                                                                                 "We",
                                                                                 "are",
                                                                                 "going",
                                                                                 "to",
                                                                                 "buy",
                                                                                 "a",
                                                                                 "house"
                                                                             ],
                                                                   "correctOrder":  [
                                                                                        "We",
                                                                                        "are",
                                                                                        "going",
                                                                                        "to",
                                                                                        "buy",
                                                                                        "a",
                                                                                        "house"
                                                                                    ],
                                                                   "hint":  "Plan ya decidido: usa \"be going to\"."
                                                               },
                                                               {
                                                                   "type":  "multiple_choice",
                                                                   "question":  "Look at the sky! It ___ snow soon.",
                                                                   "options":  [
                                                                                   "is going to",
                                                                                   "will to",
                                                                                   "going to"
                                                                               ],
                                                                   "correctIndex":  0,
                                                                   "explanation":  "There is present evidence (the dark sky), so we use \"be going to\" for the prediction."
                                                               },
                                                               {
                                                                   "type":  "word_order",
                                                                   "words":  [
                                                                                 "I",
                                                                                 "think",
                                                                                 "she",
                                                                                 "will",
                                                                                 "win"
                                                                             ],
                                                                   "correctOrder":  [
                                                                                        "I",
                                                                                        "think",
                                                                                        "she",
                                                                                        "will",
                                                                                        "win"
                                                                                    ],
                                                                   "hint":  "Prediccion con opinion (I think): usa \"will\"."
                                                               },
                                                               {
                                                                   "type":  "multiple_choice",
                                                                   "question":  "I\u0027ve already decided. I ___ study medicine.",
                                                                   "options":  [
                                                                                   "am going to",
                                                                                   "will to",
                                                                                   "going to"
                                                                               ],
                                                                   "correctIndex":  0,
                                                                   "explanation":  "The decision was made before now, so we use \"be going to\" for the plan."
                                                               }
                                                           ],
                                             "xpReward":  50,
                                             "mascotState":  "explaining",
                                             "nextLessonId":  "core-grammar-16-present-perfect-continuous"
                                         },
    "core-grammar-16-present-perfect-continuous":  {
                                                       "lessonId":  "core-grammar-16-present-perfect-continuous",
                                                       "level":  "B2",
                                                       "track":  "Core Grammar",
                                                       "title":  "Present Perfect Continuous",
                                                       "explanation":  {
                                                                           "body":  "We use the present perfect continuous (have/has been + verb-ing) to talk about an activity that started in the past and is still happening now, or that has just stopped but leaves a visible result in the present. It often goes with \u0027for\u0027, \u0027since\u0027, \u0027lately\u0027 and \u0027recently\u0027 and stresses the duration or repetition of the activity. The present perfect simple, by contrast, focuses on a completed result or a finished number of things (\u0027I\u0027ve written three emails\u0027). (Usa el continuo para la duracion o el efecto reciente de una actividad; usa el simple para el resultado terminado.)",
                                                                           "examples":  [
                                                                                            {
                                                                                                "en":  "I\u0027ve been waiting for the bus for twenty minutes.",
                                                                                                "es":  "Llevo veinte minutos esperando el autobus."
                                                                                            },
                                                                                            {
                                                                                                "en":  "She\u0027s tired because she has been running.",
                                                                                                "es":  "Esta cansada porque ha estado corriendo."
                                                                                            },
                                                                                            {
                                                                                                "en":  "We\u0027ve been living in Madrid since 2019.",
                                                                                                "es":  "Vivimos en Madrid desde 2019."
                                                                                            },
                                                                                            {
                                                                                                "en":  "He has written two reports today, but I\u0027ve been writing one all day.",
                                                                                                "es":  "El ha escrito dos informes hoy, pero yo llevo todo el dia escribiendo uno."
                                                                                            }
                                                                                        ]
                                                                       },
                                                       "exercises":  [
                                                                         {
                                                                             "type":  "multiple_choice",
                                                                             "question":  "Why are your hands so dirty? — I ___ in the garden all morning.",
                                                                             "options":  [
                                                                                             "have been working",
                                                                                             "have worked",
                                                                                             "am working"
                                                                                         ],
                                                                             "correctIndex":  0,
                                                                             "explanation":  "The present perfect continuous links the ongoing activity to its visible present result (the dirty hands), so it is the natural choice here. \u0027Have worked\u0027 would stress completion and \u0027am working\u0027 wrongly uses the present continuous for something connected to a past period."
                                                                         },
                                                                         {
                                                                             "type":  "word_order",
                                                                             "words":  [
                                                                                           "She",
                                                                                           "has",
                                                                                           "been",
                                                                                           "studying",
                                                                                           "French",
                                                                                           "since",
                                                                                           "January"
                                                                                       ],
                                                                             "correctOrder":  [
                                                                                                  "She",
                                                                                                  "has",
                                                                                                  "been",
                                                                                                  "studying",
                                                                                                  "French",
                                                                                                  "since",
                                                                                                  "January"
                                                                                              ],
                                                                             "hint":  "Usa el present perfect continuous con \u0027since\u0027 para una accion que continua hasta ahora."
                                                                         },
                                                                         {
                                                                             "type":  "multiple_choice",
                                                                             "question":  "Which sentence focuses on the completed result rather than the ongoing activity?",
                                                                             "options":  [
                                                                                             "I\u0027ve read three books this week.",
                                                                                             "I\u0027ve been reading all afternoon.",
                                                                                             "I\u0027ve been reading the same chapter for an hour."
                                                                                         ],
                                                                             "correctIndex":  0,
                                                                             "explanation":  "The present perfect simple emphasises the finished quantity (three books), not the duration of the activity. The other two use the continuous to stress how long the reading has gone on."
                                                                         },
                                                                         {
                                                                             "type":  "word_order",
                                                                             "words":  [
                                                                                           "They",
                                                                                           "have",
                                                                                           "been",
                                                                                           "arguing",
                                                                                           "a",
                                                                                           "lot",
                                                                                           "lately"
                                                                                       ],
                                                                             "correctOrder":  [
                                                                                                  "They",
                                                                                                  "have",
                                                                                                  "been",
                                                                                                  "arguing",
                                                                                                  "a",
                                                                                                  "lot",
                                                                                                  "lately"
                                                                                              ],
                                                                             "hint":  "Coloca \u0027lately\u0027 al final para hablar de una tendencia reciente y repetida."
                                                                         },
                                                                         {
                                                                             "type":  "multiple_choice",
                                                                             "question":  "How long ___ you waiting for the doctor? You look exhausted.",
                                                                             "options":  [
                                                                                             "have you been",
                                                                                             "did you been",
                                                                                             "are you been"
                                                                                         ],
                                                                             "correctIndex":  0,
                                                                             "explanation":  "With \u0027How long\u0027 and an action that is still going on with a present result (looking exhausted), the present perfect continuous is formed with \u0027have/has been + verb-ing\u0027: \u0027How long have you been waiting?\u0027. \u0027Did you been\u0027 and \u0027are you been\u0027 are not possible verb forms in English."
                                                                         }
                                                                     ],
                                                       "xpReward":  60,
                                                       "mascotState":  "explaining",
                                                       "nextLessonId":  "core-grammar-17-past-perfect"
                                                   },
    "core-grammar-17-past-perfect":  {
                                         "lessonId":  "core-grammar-17-past-perfect",
                                         "level":  "B2",
                                         "track":  "Core Grammar",
                                         "title":  "Past Perfect",
                                         "explanation":  {
                                                             "body":  "We use the past perfect (had + past participle) to talk about an action that was already completed before another moment or action in the past. The more recent past action is usually in the past simple, while the earlier one takes the past perfect. Linking words like before, after, when and by the time often signal which action came first. (En español suele corresponder al pluscuamperfecto: \u0027había\u0027 + participio, p. ej. \u0027había terminado\u0027.)",
                                                             "examples":  [
                                                                              {
                                                                                  "en":  "When I got home, my family had already eaten dinner.",
                                                                                  "es":  "Cuando llegué a casa, mi familia ya había cenado."
                                                                              },
                                                                              {
                                                                                  "en":  "She felt nervous because she had never spoken in public before.",
                                                                                  "es":  "Estaba nerviosa porque nunca había hablado en público antes."
                                                                              },
                                                                              {
                                                                                  "en":  "By the time the film started, we had bought our popcorn.",
                                                                                  "es":  "Para cuando empezó la película, ya habíamos comprado nuestras palomitas."
                                                                              },
                                                                              {
                                                                                  "en":  "After the guests had left, he cleaned the whole kitchen.",
                                                                                  "es":  "Después de que los invitados se habían ido, limpió toda la cocina."
                                                                              }
                                                                          ]
                                                         },
                                         "exercises":  [
                                                           {
                                                               "type":  "multiple_choice",
                                                               "question":  "When we arrived at the station, the train ___.",
                                                               "options":  [
                                                                               "had already left",
                                                                               "has already left",
                                                                               "already left"
                                                                           ],
                                                               "correctIndex":  0,
                                                               "explanation":  "The past perfect (had left) marks the action that happened before we arrived, an earlier moment in the past. \u0027Has already left\u0027 is present perfect (wrong for a past context) and \u0027already left\u0027 lacks the auxiliary needed to show the earlier action."
                                                           },
                                                           {
                                                               "type":  "word_order",
                                                               "words":  [
                                                                             "By",
                                                                             "the",
                                                                             "time",
                                                                             "she",
                                                                             "called",
                                                                             "I",
                                                                             "had",
                                                                             "finished"
                                                                         ],
                                                               "correctOrder":  [
                                                                                    "By",
                                                                                    "the",
                                                                                    "time",
                                                                                    "she",
                                                                                    "called",
                                                                                    "I",
                                                                                    "had",
                                                                                    "finished"
                                                                                ],
                                                               "hint":  "Usa \u0027By the time\u0027 + pasado simple, y el past perfect para lo que ya estaba terminado."
                                                           },
                                                           {
                                                               "type":  "multiple_choice",
                                                               "question":  "Choose the sentence that correctly contrasts the two past actions.",
                                                               "options":  [
                                                                               "After he had locked the door, he realised he didn\u0027t have his keys.",
                                                                               "After he locked the door, he had realised he didn\u0027t have his keys.",
                                                                               "After he had locked the door, he had realised he didn\u0027t have his keys."
                                                                           ],
                                                               "correctIndex":  0,
                                                               "explanation":  "The earlier action takes the past perfect (had locked) and the later one takes the past simple (realised). Putting the past perfect on the later action (options 2 and 3) reverses or confuses the time order."
                                                           },
                                                           {
                                                               "type":  "word_order",
                                                               "words":  [
                                                                             "They",
                                                                             "had",
                                                                             "never",
                                                                             "seen",
                                                                             "snow",
                                                                             "before",
                                                                             "they",
                                                                             "moved",
                                                                             "north"
                                                                         ],
                                                               "correctOrder":  [
                                                                                    "They",
                                                                                    "had",
                                                                                    "never",
                                                                                    "seen",
                                                                                    "snow",
                                                                                    "before",
                                                                                    "they",
                                                                                    "moved",
                                                                                    "north"
                                                                                ],
                                                               "hint":  "El past perfect describe la experiencia anterior a mudarse; \u0027before\u0027 introduce la acción más reciente."
                                                           },
                                                           {
                                                               "type":  "multiple_choice",
                                                               "question":  "We couldn\u0027t get in because we ___ the tickets at home.",
                                                               "options":  [
                                                                               "had forgotten",
                                                                               "forgot had",
                                                                               "were forgetting"
                                                                           ],
                                                               "correctIndex":  0,
                                                               "explanation":  "The forgetting happened before \u0027we couldn\u0027t get in\u0027, so the past perfect (had forgotten) shows the earlier cause. \u0027Forgot had\u0027 is ungrammatical word order and \u0027were forgetting\u0027 (past continuous) does not express a completed earlier action."
                                                           }
                                                       ],
                                         "xpReward":  60,
                                         "mascotState":  "explaining",
                                         "nextLessonId":  "core-grammar-18-second-conditional"
                                     },
    "core-grammar-18-second-conditional":  {
                                               "lessonId":  "core-grammar-18-second-conditional",
                                               "level":  "B2",
                                               "track":  "Core Grammar",
                                               "title":  "Second Conditional",
                                               "explanation":  {
                                                                   "body":  "We use the second conditional to talk about unreal or hypothetical situations in the present or future. The structure is: If + past simple, ... would + base verb (e.g. \"If I had more time, I would travel more\"). With the verb \u0027to be\u0027, we often use \u0027were\u0027 for all subjects, especially in the fixed advice phrase \u0027If I were you...\u0027. You can replace \u0027would\u0027 with \u0027could\u0027 or \u0027might\u0027 to suggest ability or possibility in the result. (En espanol: hablamos de situaciones imaginarias o poco probables, no de hechos reales.)",
                                                                   "examples":  [
                                                                                    {
                                                                                        "en":  "If I had more money, I would buy a house by the sea.",
                                                                                        "es":  "Si tuviera mas dinero, compraria una casa junto al mar."
                                                                                    },
                                                                                    {
                                                                                        "en":  "If I were you, I would talk to her before deciding.",
                                                                                        "es":  "Si yo fuera tu, hablaria con ella antes de decidir."
                                                                                    },
                                                                                    {
                                                                                        "en":  "If she studied harder, she could pass the exam easily.",
                                                                                        "es":  "Si estudiara mas, podria aprobar el examen facilmente."
                                                                                    },
                                                                                    {
                                                                                        "en":  "We might travel more if we didn\u0027t have such busy jobs.",
                                                                                        "es":  "Viajariamos mas si no tuvieramos trabajos tan ocupados."
                                                                                    }
                                                                                ]
                                                               },
                                               "exercises":  [
                                                                 {
                                                                     "type":  "multiple_choice",
                                                                     "question":  "If I _____ rich, I would travel around the world.",
                                                                     "options":  [
                                                                                     "were",
                                                                                     "am",
                                                                                     "will be"
                                                                                 ],
                                                                     "correctIndex":  0,
                                                                     "explanation":  "The second conditional needs the past simple in the if-clause, and \u0027were\u0027 is standard for hypothetical situations with \u0027to be\u0027."
                                                                 },
                                                                 {
                                                                     "type":  "word_order",
                                                                     "words":  [
                                                                                   "If",
                                                                                   "I",
                                                                                   "were",
                                                                                   "you",
                                                                                   "I",
                                                                                   "would",
                                                                                   "apologise"
                                                                               ],
                                                                     "correctOrder":  [
                                                                                          "If",
                                                                                          "I",
                                                                                          "were",
                                                                                          "you",
                                                                                          "I",
                                                                                          "would",
                                                                                          "apologise"
                                                                                      ],
                                                                     "hint":  "Empieza con \u0027If\u0027 y usa la frase para dar consejos (\u0027si yo fuera tu...\u0027)."
                                                                 },
                                                                 {
                                                                     "type":  "multiple_choice",
                                                                     "question":  "If she had more confidence, she _____ apply for the manager role.",
                                                                     "options":  [
                                                                                     "might",
                                                                                     "must",
                                                                                     "should have"
                                                                                 ],
                                                                     "correctIndex":  0,
                                                                     "explanation":  "In the second conditional, \u0027might\u0027 can replace \u0027would\u0027 in the result to express possibility."
                                                                 },
                                                                 {
                                                                     "type":  "word_order",
                                                                     "words":  [
                                                                                   "If",
                                                                                   "we",
                                                                                   "left",
                                                                                   "now",
                                                                                   "we",
                                                                                   "could",
                                                                                   "catch",
                                                                                   "the",
                                                                                   "train"
                                                                               ],
                                                                     "correctOrder":  [
                                                                                          "If",
                                                                                          "we",
                                                                                          "left",
                                                                                          "now",
                                                                                          "we",
                                                                                          "could",
                                                                                          "catch",
                                                                                          "the",
                                                                                          "train"
                                                                                      ],
                                                                     "hint":  "El resultado usa \u0027could\u0027 para expresar posibilidad o capacidad."
                                                                 },
                                                                 {
                                                                     "type":  "multiple_choice",
                                                                     "question":  "What would you do if you _____ your job tomorrow?",
                                                                     "options":  [
                                                                                     "lost",
                                                                                     "would lose",
                                                                                     "lose"
                                                                                 ],
                                                                     "correctIndex":  0,
                                                                     "explanation":  "The if-clause of a second conditional takes the past simple (\u0027lost\u0027), never \u0027would\u0027 or the present."
                                                                 }
                                                             ],
                                               "xpReward":  60,
                                               "mascotState":  "explaining",
                                               "nextLessonId":  "core-grammar-19-passive-voice"
                                           },
    "core-grammar-19-passive-voice":  {
                                          "lessonId":  "core-grammar-19-passive-voice",
                                          "level":  "B2",
                                          "track":  "Core Grammar",
                                          "title":  "The Passive Voice",
                                          "explanation":  {
                                                              "body":  "We form the passive voice with the verb \"to be\" plus the past participle: \"is/are made\" in the present simple and \"was/were made\" in the past simple. We use the passive when the action or the object is more important than who does it, or when the agent is unknown or unimportant. If we want to mention who performs the action, we add it with \"by\" + agent. (En español el agente se introduce con \"por\".)",
                                                              "examples":  [
                                                                               {
                                                                                   "en":  "English is spoken all over the world.",
                                                                                   "es":  "El inglés se habla en todo el mundo."
                                                                               },
                                                                               {
                                                                                   "en":  "The letters were delivered yesterday.",
                                                                                   "es":  "Las cartas fueron entregadas ayer."
                                                                               },
                                                                               {
                                                                                   "en":  "This painting was created by a local artist.",
                                                                                   "es":  "Este cuadro fue creado por un artista local."
                                                                               },
                                                                               {
                                                                                   "en":  "The office is cleaned every morning.",
                                                                                   "es":  "La oficina se limpia todas las mañanas."
                                                                               }
                                                                           ]
                                                          },
                                          "exercises":  [
                                                            {
                                                                "type":  "multiple_choice",
                                                                "question":  "Choose the correct passive form: \"This bridge ___ in 1932.\"",
                                                                "options":  [
                                                                                "was built",
                                                                                "is built",
                                                                                "built"
                                                                            ],
                                                                "correctIndex":  0,
                                                                "explanation":  "A finished past action needs the past simple passive: was/were + past participle."
                                                            },
                                                            {
                                                                "type":  "word_order",
                                                                "words":  [
                                                                              "Coffee",
                                                                              "is",
                                                                              "grown",
                                                                              "in",
                                                                              "Colombia"
                                                                          ],
                                                                "correctOrder":  [
                                                                                     "Coffee",
                                                                                     "is",
                                                                                     "grown",
                                                                                     "in",
                                                                                     "Colombia"
                                                                                 ],
                                                                "hint":  "Presente simple pasivo: el agente no importa."
                                                            },
                                                            {
                                                                "type":  "multiple_choice",
                                                                "question":  "Complete: \"The novel ___ by a famous writer.\"",
                                                                "options":  [
                                                                                "was written",
                                                                                "was wrote",
                                                                                "wrote"
                                                                            ],
                                                                "correctIndex":  0,
                                                                "explanation":  "The passive uses the past participle (written), not the past simple form (wrote)."
                                                            },
                                                            {
                                                                "type":  "word_order",
                                                                "words":  [
                                                                              "The",
                                                                              "windows",
                                                                              "are",
                                                                              "cleaned",
                                                                              "every",
                                                                              "week"
                                                                          ],
                                                                "correctOrder":  [
                                                                                     "The",
                                                                                     "windows",
                                                                                     "are",
                                                                                     "cleaned",
                                                                                     "every",
                                                                                     "week"
                                                                                 ],
                                                                "hint":  "Presente simple pasivo para una rutina; el agente no se menciona."
                                                            },
                                                            {
                                                                "type":  "multiple_choice",
                                                                "question":  "Which sentence correctly introduces the agent?",
                                                                "options":  [
                                                                                "The cake was made by my grandmother.",
                                                                                "The cake was made for my grandmother.",
                                                                                "The cake made by my grandmother."
                                                                            ],
                                                                "correctIndex":  0,
                                                                "explanation":  "We use \"by\" to introduce the agent, and the passive needs the verb \"to be\" (was)."
                                                            }
                                                        ],
                                          "xpReward":  60,
                                          "mascotState":  "explaining",
                                          "nextLessonId":  "core-grammar-20-reported-speech"
                                      },
    "core-grammar-20-reported-speech":  {
                                            "lessonId":  "core-grammar-20-reported-speech",
                                            "level":  "B2",
                                            "track":  "Core Grammar",
                                            "title":  "Reported Speech",
                                            "explanation":  {
                                                                "body":  "When we report what someone said, we usually move the verb one step back into the past: present tenses become past, \u0027will\u0027 becomes \u0027would\u0027, and \u0027can\u0027 becomes \u0027could\u0027. Pronouns and time words also shift to match the new point of view (for example, \u0027I\u0027 may become \u0027he\u0027, and \u0027tomorrow\u0027 becomes \u0027the next day\u0027). Remember that \u0027tell\u0027 needs a person as its object (tell me, tell her), while \u0027say\u0027 does not (say that...). (En espanol: al pasar al estilo indirecto, el verbo retrocede un tiempo y cambian los pronombres y las palabras de tiempo.)",
                                                                "examples":  [
                                                                                 {
                                                                                     "en":  "\"I am tired,\" she said. -\u003e She said that she was tired.",
                                                                                     "es":  "\"Estoy cansada\", dijo. -\u003e Dijo que estaba cansada."
                                                                                 },
                                                                                 {
                                                                                     "en":  "\"We will call you tomorrow.\" -\u003e They said they would call me the next day.",
                                                                                     "es":  "\"Te llamaremos manana.\" -\u003e Dijeron que me llamarian al dia siguiente."
                                                                                 },
                                                                                 {
                                                                                     "en":  "\"I can\u0027t swim,\" he told me. -\u003e He told me he couldn\u0027t swim.",
                                                                                     "es":  "\"No se nadar\", me dijo. -\u003e Me dijo que no sabia nadar."
                                                                                 },
                                                                                 {
                                                                                     "en":  "\"I work here now.\" -\u003e She said she worked there then.",
                                                                                     "es":  "\"Trabajo aqui ahora.\" -\u003e Dijo que trabajaba alli en ese momento."
                                                                                 }
                                                                             ]
                                                            },
                                            "exercises":  [
                                                              {
                                                                  "type":  "multiple_choice",
                                                                  "question":  "\"I will help you,\" he said. -\u003e He said he ____ help me.",
                                                                  "options":  [
                                                                                  "will",
                                                                                  "would",
                                                                                  "would have"
                                                                              ],
                                                                  "correctIndex":  1,
                                                                  "explanation":  "In reported speech, \u0027will\u0027 backshifts to \u0027would\u0027."
                                                              },
                                                              {
                                                                  "type":  "word_order",
                                                                  "words":  [
                                                                                "she",
                                                                                "said",
                                                                                "she",
                                                                                "lived",
                                                                                "there"
                                                                            ],
                                                                  "correctOrder":  [
                                                                                       "she",
                                                                                       "said",
                                                                                       "she",
                                                                                       "lived",
                                                                                       "there"
                                                                                   ],
                                                                  "hint":  "Estilo indirecto: \u0027live\u0027 retrocede a pasado y \u0027here\u0027 cambia a \u0027there\u0027."
                                                              },
                                                              {
                                                                  "type":  "multiple_choice",
                                                                  "question":  "Choose the correct reporting verb: She ____ me that she was leaving.",
                                                                  "options":  [
                                                                                  "said",
                                                                                  "told",
                                                                                  "spoke"
                                                                              ],
                                                                  "correctIndex":  1,
                                                                  "explanation":  "\u0027Tell\u0027 is followed directly by a person (\u0027told me\u0027), whereas \u0027say\u0027 is not."
                                                              },
                                                              {
                                                                  "type":  "word_order",
                                                                  "words":  [
                                                                                "he",
                                                                                "told",
                                                                                "us",
                                                                                "he",
                                                                                "couldn\u0027t",
                                                                                "come"
                                                                            ],
                                                                  "correctOrder":  [
                                                                                       "he",
                                                                                       "told",
                                                                                       "us",
                                                                                       "he",
                                                                                       "couldn\u0027t",
                                                                                       "come"
                                                                                   ],
                                                                  "hint":  "Recuerda: \u0027tell\u0027 lleva persona (us) y \u0027can\u0027t\u0027 retrocede a \u0027couldn\u0027t\u0027."
                                                              },
                                                              {
                                                                  "type":  "multiple_choice",
                                                                  "question":  "\"I am studying English,\" she said. -\u003e She said she ____ English.",
                                                                  "options":  [
                                                                                  "is studying",
                                                                                  "was studying",
                                                                                  "studies"
                                                                              ],
                                                                  "correctIndex":  1,
                                                                  "explanation":  "The present continuous \u0027am studying\u0027 backshifts to the past continuous \u0027was studying\u0027."
                                                              }
                                                          ],
                                            "xpReward":  60,
                                            "mascotState":  "explaining",
                                            "nextLessonId":  "core-grammar-21-relative-clauses"
                                        },
    "core-grammar-21-relative-clauses":  {
                                             "lessonId":  "core-grammar-21-relative-clauses",
                                             "level":  "B2",
                                             "track":  "Core Grammar",
                                             "title":  "Relative Clauses",
                                             "explanation":  {
                                                                 "body":  "Relative clauses add information about a noun. Defining relative clauses identify exactly which person or thing we mean and take no commas; we use who/that for people, which/that for things, whose for possession, and where for places. Non-defining relative clauses add extra, non-essential information and are always separated by commas, and in these clauses \u0027that\u0027 is never used. Note also that you cannot use \u0027that\u0027 immediately after a preposition (say \u0027in which\u0027, not \u0027in that\u0027). (En las explicativas, separadas por comas, nunca se usa \u0027that\u0027.)",
                                                                 "examples":  [
                                                                                  {
                                                                                      "en":  "The woman who lives next door is a doctor.",
                                                                                      "es":  "La mujer que vive al lado es medica."
                                                                                  },
                                                                                  {
                                                                                      "en":  "My brother, who lives in Madrid, is visiting us.",
                                                                                      "es":  "Mi hermano, que vive en Madrid, viene a visitarnos."
                                                                                  },
                                                                                  {
                                                                                      "en":  "This is the school where I learned English.",
                                                                                      "es":  "Esta es la escuela donde aprendi ingles."
                                                                                  },
                                                                                  {
                                                                                      "en":  "She\u0027s the colleague whose car broke down yesterday.",
                                                                                      "es":  "Es la companera cuyo coche se averio ayer."
                                                                                  }
                                                                              ]
                                                             },
                                             "exercises":  [
                                                               {
                                                                   "type":  "multiple_choice",
                                                                   "question":  "My grandmother, ___ is eighty-five, still goes swimming every morning.",
                                                                   "options":  [
                                                                                   "that",
                                                                                   "who",
                                                                                   "which"
                                                                               ],
                                                                   "correctIndex":  1,
                                                                   "explanation":  "This is a non-defining clause about a person, so we use \u0027who\u0027 and never \u0027that\u0027."
                                                               },
                                                               {
                                                                   "type":  "multiple_choice",
                                                                   "question":  "Choose the correctly punctuated sentence.",
                                                                   "options":  [
                                                                                   "The book that I borrowed, was excellent.",
                                                                                   "The book, that I borrowed was excellent.",
                                                                                   "The book that I borrowed was excellent."
                                                                               ],
                                                                   "correctIndex":  2,
                                                                   "explanation":  "It is a defining clause identifying which book, so no commas are used."
                                                               },
                                                               {
                                                                   "type":  "word_order",
                                                                   "words":  [
                                                                                 "This",
                                                                                 "is",
                                                                                 "the",
                                                                                 "house",
                                                                                 "where",
                                                                                 "I",
                                                                                 "grew",
                                                                                 "up"
                                                                             ],
                                                                   "correctOrder":  [
                                                                                        "This",
                                                                                        "is",
                                                                                        "the",
                                                                                        "house",
                                                                                        "where",
                                                                                        "I",
                                                                                        "grew",
                                                                                        "up"
                                                                                    ],
                                                                   "hint":  "Usa \u0027where\u0027 para referirte a un lugar (la casa)."
                                                               },
                                                               {
                                                                   "type":  "word_order",
                                                                   "words":  [
                                                                                 "The",
                                                                                 "man",
                                                                                 "whose",
                                                                                 "wallet",
                                                                                 "was",
                                                                                 "stolen",
                                                                                 "called",
                                                                                 "the",
                                                                                 "police"
                                                                             ],
                                                                   "correctOrder":  [
                                                                                        "The",
                                                                                        "man",
                                                                                        "whose",
                                                                                        "wallet",
                                                                                        "was",
                                                                                        "stolen",
                                                                                        "called",
                                                                                        "the",
                                                                                        "police"
                                                                                    ],
                                                                   "hint":  "Usa \u0027whose\u0027 para indicar posesion (la cartera del hombre)."
                                                               },
                                                               {
                                                                   "type":  "multiple_choice",
                                                                   "question":  "Paris, ___ I visited last summer, is full of museums.",
                                                                   "options":  [
                                                                                   "which",
                                                                                   "that",
                                                                                   "where"
                                                                               ],
                                                                   "correctIndex":  0,
                                                                   "explanation":  "In a non-defining clause, \u0027that\u0027 is never used; here Paris is the object of \u0027visited\u0027, so we use \u0027which\u0027 (not \u0027where\u0027, which would need an intransitive verb like \u0027went\u0027)."
                                                               }
                                                           ],
                                             "xpReward":  60,
                                             "mascotState":  "explaining",
                                             "nextLessonId":  "core-grammar-22-gerunds-infinitives"
                                         },
    "core-grammar-22-gerunds-infinitives":  {
                                                "lessonId":  "core-grammar-22-gerunds-infinitives",
                                                "level":  "B2",
                                                "track":  "Core Grammar",
                                                "title":  "Gerunds \u0026 Infinitives",
                                                "explanation":  {
                                                                    "body":  "After certain verbs we use the gerund (-ing), and after others we use the to-infinitive. Verbs like enjoy, avoid, finish and mind are followed by -ing, while want, decide, hope and agree take a to-infinitive. We always use -ing after a preposition, and a few verbs such as stop and remember change meaning depending on which form follows. (En espanol no existe esta diferencia, asi que hay que memorizar que verbo pide cada forma.)",
                                                                    "examples":  [
                                                                                     {
                                                                                         "en":  "She enjoys learning new languages.",
                                                                                         "es":  "A ella le gusta aprender idiomas nuevos."
                                                                                     },
                                                                                     {
                                                                                         "en":  "We decided to leave early.",
                                                                                         "es":  "Decidimos salir temprano."
                                                                                     },
                                                                                     {
                                                                                         "en":  "I\u0027m interested in working abroad.",
                                                                                         "es":  "Me interesa trabajar en el extranjero."
                                                                                     },
                                                                                     {
                                                                                         "en":  "He stopped smoking last year.",
                                                                                         "es":  "Dejo de fumar el ano pasado."
                                                                                     }
                                                                                 ]
                                                                },
                                                "exercises":  [
                                                                  {
                                                                      "type":  "multiple_choice",
                                                                      "question":  "She avoids ____ junk food during the week.",
                                                                      "options":  [
                                                                                      "to eat",
                                                                                      "eating",
                                                                                      "eat"
                                                                                  ],
                                                                      "correctIndex":  1,
                                                                      "explanation":  "The verb \u0027avoid\u0027 is always followed by the gerund (-ing)."
                                                                  },
                                                                  {
                                                                      "type":  "word_order",
                                                                      "words":  [
                                                                                    "They",
                                                                                    "decided",
                                                                                    "to",
                                                                                    "postpone",
                                                                                    "the",
                                                                                    "meeting"
                                                                                ],
                                                                      "correctOrder":  [
                                                                                           "They",
                                                                                           "decided",
                                                                                           "to",
                                                                                           "postpone",
                                                                                           "the",
                                                                                           "meeting"
                                                                                       ],
                                                                      "hint":  "El verbo \u0027decide\u0027 va seguido del infinitivo con \u0027to\u0027."
                                                                  },
                                                                  {
                                                                      "type":  "multiple_choice",
                                                                      "question":  "Remember ____ the door before you leave the office.",
                                                                      "options":  [
                                                                                      "locking",
                                                                                      "to lock",
                                                                                      "lock"
                                                                                  ],
                                                                      "correctIndex":  1,
                                                                      "explanation":  "\u0027Remember + to-infinitive\u0027 refers to a task you must not forget to do in the future."
                                                                  },
                                                                  {
                                                                      "type":  "word_order",
                                                                      "words":  [
                                                                                    "I\u0027m",
                                                                                    "thinking",
                                                                                    "about",
                                                                                    "moving",
                                                                                    "to",
                                                                                    "Canada"
                                                                                ],
                                                                      "correctOrder":  [
                                                                                           "I\u0027m",
                                                                                           "thinking",
                                                                                           "about",
                                                                                           "moving",
                                                                                           "to",
                                                                                           "Canada"
                                                                                       ],
                                                                      "hint":  "Despues de una preposicion como \u0027about\u0027 siempre se usa la forma -ing."
                                                                  },
                                                                  {
                                                                      "type":  "multiple_choice",
                                                                      "question":  "We finally finished ____ the report at midnight.",
                                                                      "options":  [
                                                                                      "writing",
                                                                                      "to write",
                                                                                      "write"
                                                                                  ],
                                                                      "correctIndex":  0,
                                                                      "explanation":  "The verb \u0027finish\u0027 is followed by the gerund (-ing), not the infinitive."
                                                                  }
                                                              ],
                                                "xpReward":  60,
                                                "mascotState":  "explaining",
                                                "nextLessonId":  "core-grammar-23-third-conditional"
                                            },
    "core-grammar-23-third-conditional":  {
                                              "lessonId":  "core-grammar-23-third-conditional",
                                              "level":  "C1",
                                              "track":  "Core Grammar",
                                              "title":  "Third Conditional",
                                              "explanation":  {
                                                                  "body":  "The third conditional describes unreal or hypothetical situations in the past: things that did not actually happen. We form it with \u0027if + past perfect\u0027 in the condition and \u0027would have + past participle\u0027 in the result, and we often use it to express regret or to imagine a different outcome. To soften the result or show uncertainty, we replace \u0027would have\u0027 with \u0027could have\u0027 (possibility/ability) or \u0027might have\u0027 (a less certain outcome). (En espanol, equivale al condicional compuesto: \u0027si hubiera... habria/podria/quiza habria...\u0027, para hablar de algo irreal en el pasado.)",
                                                                  "examples":  [
                                                                                   {
                                                                                       "en":  "If she had studied harder, she would have passed the exam.",
                                                                                       "es":  "Si ella hubiera estudiado mas, habria aprobado el examen."
                                                                                   },
                                                                                   {
                                                                                       "en":  "If we had left earlier, we might have caught the train.",
                                                                                       "es":  "Si hubieramos salido antes, quiza habriamos cogido el tren."
                                                                                   },
                                                                                   {
                                                                                       "en":  "If you had told me the truth, I could have helped you.",
                                                                                       "es":  "Si me hubieras dicho la verdad, te habria podido ayudar."
                                                                                   },
                                                                                   {
                                                                                       "en":  "If they hadn\u0027t ignored the warnings, the accident wouldn\u0027t have happened.",
                                                                                       "es":  "Si no hubieran ignorado las advertencias, el accidente no habria ocurrido."
                                                                                   }
                                                                               ]
                                                              },
                                              "exercises":  [
                                                                {
                                                                    "type":  "multiple_choice",
                                                                    "question":  "Choose the correct third conditional: \"If I had known about the delay, I ____ at home.\"",
                                                                    "options":  [
                                                                                    "would have stayed",
                                                                                    "would stay",
                                                                                    "had stayed"
                                                                                ],
                                                                    "correctIndex":  0,
                                                                    "explanation":  "The third conditional result clause needs \u0027would have + past participle\u0027 to describe an unreal past outcome. \u0027Would stay\u0027 is the second conditional, and \u0027had stayed\u0027 is the past perfect used in the if-clause, not the result."
                                                                },
                                                                {
                                                                    "type":  "word_order",
                                                                    "words":  [
                                                                                  "If",
                                                                                  "they",
                                                                                  "had",
                                                                                  "warned",
                                                                                  "us",
                                                                                  "we",
                                                                                  "would",
                                                                                  "have",
                                                                                  "evacuated"
                                                                              ],
                                                                    "correctOrder":  [
                                                                                         "If",
                                                                                         "they",
                                                                                         "had",
                                                                                         "warned",
                                                                                         "us",
                                                                                         "we",
                                                                                         "would",
                                                                                         "have",
                                                                                         "evacuated"
                                                                                     ],
                                                                    "hint":  "Empieza con la oracion condicional \u0027If + pasado perfecto\u0027 y luego el resultado con \u0027would have + participio\u0027."
                                                                },
                                                                {
                                                                    "type":  "multiple_choice",
                                                                    "question":  "Which sentence correctly uses \u0027might have\u0027 to show an uncertain past outcome?",
                                                                    "options":  [
                                                                                    "If he had asked, she might have agreed.",
                                                                                    "If he had asked, she might agree.",
                                                                                    "If he would have asked, she might have agreed."
                                                                                ],
                                                                    "correctIndex":  0,
                                                                    "explanation":  "The condition takes \u0027had + past participle\u0027 and the uncertain result takes \u0027might have + past participle\u0027. \u0027Might agree\u0027 is not a past form, and \u0027would have\u0027 must never appear in the if-clause."
                                                                },
                                                                {
                                                                    "type":  "word_order",
                                                                    "words":  [
                                                                                  "If",
                                                                                  "we",
                                                                                  "had",
                                                                                  "invested",
                                                                                  "earlier",
                                                                                  "we",
                                                                                  "could",
                                                                                  "have",
                                                                                  "profited"
                                                                              ],
                                                                    "correctOrder":  [
                                                                                         "If",
                                                                                         "we",
                                                                                         "had",
                                                                                         "invested",
                                                                                         "earlier",
                                                                                         "we",
                                                                                         "could",
                                                                                         "have",
                                                                                         "profited"
                                                                                     ],
                                                                    "hint":  "Usa \u0027could have\u0027 en el resultado para expresar una posibilidad o capacidad en el pasado."
                                                                },
                                                                {
                                                                    "type":  "multiple_choice",
                                                                    "question":  "Find the error: \"If you had listened, you wouldn\u0027t have made that mistake.\"",
                                                                    "options":  [
                                                                                    "There is no error; the sentence is correct.",
                                                                                    "It should be \u0027If you would have listened\u0027.",
                                                                                    "It should be \u0027you wouldn\u0027t made that mistake\u0027."
                                                                                ],
                                                                    "correctIndex":  0,
                                                                    "explanation":  "The if-clause correctly uses the past perfect (\u0027had listened\u0027) and the result correctly uses \u0027wouldn\u0027t have + past participle\u0027 (\u0027wouldn\u0027t have made\u0027). The other options introduce errors."
                                                                }
                                                            ],
                                              "xpReward":  70,
                                              "mascotState":  "explaining",
                                              "nextLessonId":  "core-grammar-24-modals-deduction"
                                          },
    "core-grammar-24-modals-deduction":  {
                                             "lessonId":  "core-grammar-24-modals-deduction",
                                             "level":  "C1",
                                             "track":  "Core Grammar",
                                             "title":  "Modals of Deduction (Past)",
                                             "explanation":  {
                                                                 "body":  "To speculate about the past, we use a modal verb followed by \u0027have\u0027 + past participle. \u0027Must have\u0027 expresses near-certainty that something happened, while \u0027can\u0027t have\u0027 or \u0027couldn\u0027t have\u0027 expresses near-certainty that it did not. For genuine uncertainty, we use \u0027might have\u0027, \u0027may have\u0027, or \u0027could have\u0027 to suggest one of several possibilities. (Estos modales expresan deducciones o conjeturas sobre hechos pasados, no sobre el presente.)",
                                                                 "examples":  [
                                                                                  {
                                                                                      "en":  "She must have left already; her coat isn\u0027t on the hook.",
                                                                                      "es":  "Debe de haberse ido ya; su abrigo no está en el perchero."
                                                                                  },
                                                                                  {
                                                                                      "en":  "He can\u0027t have read the whole report in ten minutes.",
                                                                                      "es":  "No puede haber leído todo el informe en diez minutos."
                                                                                  },
                                                                                  {
                                                                                      "en":  "They might have missed the train, or they may have got lost.",
                                                                                      "es":  "Puede que hayan perdido el tren, o quizá se hayan perdido."
                                                                                  },
                                                                                  {
                                                                                      "en":  "I couldn\u0027t have offended her, since I never even mentioned it.",
                                                                                      "es":  "No pude haberla ofendido, ya que ni siquiera lo mencioné."
                                                                                  }
                                                                              ]
                                                             },
                                             "exercises":  [
                                                               {
                                                                   "type":  "multiple_choice",
                                                                   "question":  "The lights were off and the car was gone. They ___ home by the time we arrived.",
                                                                   "options":  [
                                                                                   "must have gone",
                                                                                   "must have went",
                                                                                   "must had gone"
                                                                               ],
                                                                   "correctIndex":  0,
                                                                   "explanation":  "After \u0027must have\u0027 we need the past participle \u0027gone\u0027, not the past simple \u0027went\u0027 or \u0027had\u0027."
                                                               },
                                                               {
                                                                   "type":  "word_order",
                                                                   "words":  [
                                                                                 "She",
                                                                                 "can\u0027t",
                                                                                 "have",
                                                                                 "seen",
                                                                                 "the",
                                                                                 "warning",
                                                                                 "sign"
                                                                             ],
                                                                   "correctOrder":  [
                                                                                        "She",
                                                                                        "can\u0027t",
                                                                                        "have",
                                                                                        "seen",
                                                                                        "the",
                                                                                        "warning",
                                                                                        "sign"
                                                                                    ],
                                                                   "hint":  "Casi certeza de que algo NO ocurrió en el pasado. Empieza con el sujeto."
                                                               },
                                                               {
                                                                   "type":  "multiple_choice",
                                                                   "question":  "I\u0027m not sure who called. It ___ been my sister, but I didn\u0027t recognise the voice.",
                                                                   "options":  [
                                                                                   "could have",
                                                                                   "must have",
                                                                                   "can\u0027t have"
                                                                               ],
                                                                   "correctIndex":  0,
                                                                   "explanation":  "The uncertainty (\u0027I\u0027m not sure\u0027) calls for the tentative \u0027could have\u0027, not the certainty of \u0027must have\u0027 or \u0027can\u0027t have\u0027."
                                                               },
                                                               {
                                                                   "type":  "word_order",
                                                                   "words":  [
                                                                                 "He",
                                                                                 "might",
                                                                                 "have",
                                                                                 "forgotten",
                                                                                 "about",
                                                                                 "the",
                                                                                 "meeting"
                                                                             ],
                                                                   "correctOrder":  [
                                                                                        "He",
                                                                                        "might",
                                                                                        "have",
                                                                                        "forgotten",
                                                                                        "about",
                                                                                        "the",
                                                                                        "meeting"
                                                                                    ],
                                                                   "hint":  "Una posibilidad incierta en el pasado. Empieza con el sujeto."
                                                               },
                                                               {
                                                                   "type":  "word_order",
                                                                   "words":  [
                                                                                 "They",
                                                                                 "must",
                                                                                 "have",
                                                                                 "been",
                                                                                 "delayed",
                                                                                 "by",
                                                                                 "the",
                                                                                 "storm"
                                                                             ],
                                                                   "correctOrder":  [
                                                                                        "They",
                                                                                        "must",
                                                                                        "have",
                                                                                        "been",
                                                                                        "delayed",
                                                                                        "by",
                                                                                        "the",
                                                                                        "storm"
                                                                                    ],
                                                                   "hint":  "Deducción casi segura sobre un hecho pasado, en voz pasiva. Empieza con el sujeto."
                                                               }
                                                           ],
                                             "xpReward":  70,
                                             "mascotState":  "explaining",
                                             "nextLessonId":  "core-grammar-25-inversion"
                                         },
    "core-grammar-25-inversion":  {
                                      "lessonId":  "core-grammar-25-inversion",
                                      "level":  "C1",
                                      "track":  "Core Grammar",
                                      "title":  "Inversion for Emphasis",
                                      "explanation":  {
                                                          "body":  "When a sentence begins with a negative or limiting adverbial for emphasis, English inverts the normal word order so that an auxiliary verb comes before the subject, exactly as in a question. This formal device follows expressions such as \u0027Never\u0027, \u0027Rarely\u0027, \u0027Not only\u0027, \u0027Hardly... when\u0027, \u0027Seldom\u0027, and \u0027Little\u0027. If there is no auxiliary, you add \u0027do\u0027, \u0027does\u0027, or \u0027did\u0027 to carry the inversion. (En español no existe esta inversión: simplemente se enfatiza con la entonación o el orden, sin invertir el auxiliar.)",
                                                          "examples":  [
                                                                           {
                                                                               "en":  "Never have I encountered such generosity.",
                                                                               "es":  "Nunca he encontrado tanta generosidad."
                                                                           },
                                                                           {
                                                                               "en":  "Rarely does the committee reach a decision so quickly.",
                                                                               "es":  "Rara vez el comité toma una decisión tan rápido."
                                                                           },
                                                                           {
                                                                               "en":  "Not only did she win the prize, but she also broke the record.",
                                                                               "es":  "No solo ganó el premio, sino que también batió el récord."
                                                                           },
                                                                           {
                                                                               "en":  "Hardly had the meeting begun when the lights went out.",
                                                                               "es":  "Apenas había empezado la reunión cuando se fue la luz."
                                                                           }
                                                                       ]
                                                      },
                                      "exercises":  [
                                                        {
                                                            "type":  "multiple_choice",
                                                            "question":  "Choose the correctly inverted sentence.",
                                                            "options":  [
                                                                            "Never I have seen such a mess.",
                                                                            "Never have I seen such a mess.",
                                                                            "Never I had seen such a mess."
                                                                        ],
                                                            "correctIndex":  1,
                                                            "explanation":  "After the negative adverbial \u0027Never\u0027, the auxiliary (have) must come before the subject (I)."
                                                        },
                                                        {
                                                            "type":  "word_order",
                                                            "words":  [
                                                                          "Rarely",
                                                                          "does",
                                                                          "she",
                                                                          "arrive",
                                                                          "late"
                                                                      ],
                                                            "correctOrder":  [
                                                                                 "Rarely",
                                                                                 "does",
                                                                                 "she",
                                                                                 "arrive",
                                                                                 "late"
                                                                             ],
                                                            "hint":  "Empieza con el adverbio limitante y usa \u0027does\u0027 antes del sujeto."
                                                        },
                                                        {
                                                            "type":  "multiple_choice",
                                                            "question":  "Complete: \u0027Not only did he apologise, ___ he offered to pay.\u0027",
                                                            "options":  [
                                                                            "but also",
                                                                            "and also",
                                                                            "so also"
                                                                        ],
                                                            "correctIndex":  0,
                                                            "explanation":  "The \u0027Not only... but also...\u0027 structure requires \u0027but also\u0027 to introduce the second clause."
                                                        },
                                                        {
                                                            "type":  "word_order",
                                                            "words":  [
                                                                          "Hardly",
                                                                          "had",
                                                                          "we",
                                                                          "sat",
                                                                          "down",
                                                                          "when",
                                                                          "it",
                                                                          "started"
                                                                      ],
                                                            "correctOrder":  [
                                                                                 "Hardly",
                                                                                 "had",
                                                                                 "we",
                                                                                 "sat",
                                                                                 "down",
                                                                                 "when",
                                                                                 "it",
                                                                                 "started"
                                                                             ],
                                                            "hint":  "Tras \u0027Hardly\u0027 invierte \u0027had\u0027 y el sujeto; la segunda parte empieza con \u0027when\u0027."
                                                        },
                                                        {
                                                            "type":  "multiple_choice",
                                                            "question":  "Which sentence uses inversion correctly?",
                                                            "options":  [
                                                                            "Little did they know the truth.",
                                                                            "Little they did know the truth.",
                                                                            "Little knew they the truth."
                                                                        ],
                                                            "correctIndex":  0,
                                                            "explanation":  "\u0027Little\u0027 is a negative adverbial, so the auxiliary \u0027did\u0027 precedes the subject \u0027they\u0027."
                                                        }
                                                    ],
                                      "xpReward":  70,
                                      "mascotState":  "explaining",
                                      "nextLessonId":  null
                                  }
};

window.VESPER_LESSONS_ORDER = [
    "core-grammar-01-to-be",
    "core-grammar-02-articles",
    "core-grammar-03-plurals",
    "core-grammar-04-present-simple",
    "core-grammar-05-there-is-are",
    "core-grammar-06-present-continuous",
    "core-grammar-07-past-simple",
    "core-grammar-08-comparatives",
    "core-grammar-09-countables",
    "core-grammar-10-modals-ability",
    "core-grammar-11-going-to",
    "core-grammar-12-present-perfect",
    "core-grammar-13-first-conditional",
    "core-grammar-14-past-continuous",
    "core-grammar-15-will-vs-going-to",
    "core-grammar-16-present-perfect-continuous",
    "core-grammar-17-past-perfect",
    "core-grammar-18-second-conditional",
    "core-grammar-19-passive-voice",
    "core-grammar-20-reported-speech",
    "core-grammar-21-relative-clauses",
    "core-grammar-22-gerunds-infinitives",
    "core-grammar-23-third-conditional",
    "core-grammar-24-modals-deduction",
    "core-grammar-25-inversion"
];
