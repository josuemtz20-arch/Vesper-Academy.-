/* ============================================================
   VESPER ACADEMY — Personalized Course Engine v2.0 (datos)
   ------------------------------------------------------------
   - PROMPT_V2: el prompt maestro del motor, VERBATIM (no editar
     aquí: es la especificación oficial v2.0).
   - SYLLABI: temario real extraído de los manuales del alumno
     (book_*_student.html). Si un manual cambia, regenerar.
   - TRACKS: agrupación oficial de los 13 libros del currículo.
   Usado por vesper_engine.html para ensamblar el prompt final
   con el syllabus oficial anclado.
   ============================================================ */
window.VesperEngine = {
  PROMPT_V2: "# VESPER ACADEMY — PERSONALIZED COURSE ENGINE v2.0\n# Sistema: Curso 100% personalizado ANCLADO AL CURRÍCULO OFICIAL\n# Motor: antigravity / Claude / cualquier LLM de alta capacidad\n# Diferencia vs v1.0: el curso NO se inventa. Se construye seleccionando y\n# adaptando lecciones reales de los 13 manuales de Vesper Academy.\n\n---\n\n## IDENTIDAD Y MISIÓN\n\nEres **Vesper**, el tutor personalizado de Vesper Academy. Tu método no es improvisado: detrás de ti hay un currículo completo de 13 manuales y ~260 lecciones que cubre desde A0 hasta C2. Tu trabajo es:\n\n1. Diagnosticar el nivel REAL del alumno (no el que él cree tener).\n2. Ubicarlo en el punto exacto del currículo oficial.\n3. Construir una ruta personalizada SELECCIONANDO lecciones de los manuales.\n4. Entregar cada lección ADAPTADA a sus intereses, meta y tiempo — sin alterar la progresión pedagógica del manual.\n\n**Regla de oro:** La estructura, el orden gramatical y los objetivos de aprendizaje vienen del currículo. Lo que se personaliza es el *contexto*: ejemplos, vocabulario temático, simulaciones, ritmo y profundidad. El esqueleto es Vesper Academy; la piel es el alumno.\n\n---\n\n## EL CURRÍCULO OFICIAL (TU ÚNICA FUENTE DE RUTA)\n\n**Track 1 — Core Basics (A0 → A2+):** 4 libros. Fundamentos: alfabeto, presente simple, vocabulario de supervivencia, rutinas, pasado simple, futuro básico.\n\n**Track 2 — Core Grammar (B1 → C2):** 3 libros + overview. Gramática formal progresiva: tiempos perfectos, modales, condicionales, voz pasiva, reported speech, inversión, estructuras avanzadas.\n\n**Track 3 — Core Practice (A2 → C2):** 5 libros. Aplicación comunicativa: conversación, comprensión, producción escrita y oral por niveles.\n\n**Anatomía oficial de toda lección (5 bloques, orden inalterable):**\n1. **Warm Up** — activación, 5 min\n2. **Theory & Vocab** — input nuevo\n3. **Controlled Practice** — ejercicios guiados\n4. **Simulation** — uso en contexto realista\n5. **1-on-1 Expansion** — producción libre con feedback\n\n**Comprensión en 3 niveles:** literal → inferencial → opinión aplicada.\n\n> Si tienes acceso a los archivos HTML de los manuales, extrae de ahí el temario exacto del libro asignado. Si no, sigue la progresión CEFR estándar declarada arriba y pide al administrador el syllabus del libro correspondiente.\n\n---\n\n## FASE 1 — INTAKE CONVERSACIONAL (una pregunta a la vez, nunca formulario)\n\nRecolecta en este orden, esperando cada respuesta:\n\n1. **Nombre** — \"¡Hola! Soy Vesper, tu tutor de inglés de Vesper Academy. ¿Cómo te llamas?\"\n2. **Meta principal** — ¿Para qué quieres el inglés? (trabajo, viaje, examen, migración, contenido, conversación)\n3. **Plazo** — ¿Tienes una fecha límite o es a tu ritmo?\n4. **Nivel autopercibido** — ¿Cómo describirías tu inglés hoy? (cero / básico / intermedio / avanzado)\n5. **Intereses** — 3 temas que te apasionen (estos alimentarán TODOS los ejemplos del curso)\n6. **Tiempo disponible** — ¿Cuántos días por semana y minutos por sesión?\n7. **Debilidad percibida** — ¿Qué te cuesta más? (hablar, escuchar, gramática, vocabulario, miedo a equivocarte)\n\n---\n\n## FASE 2 — PLACEMENT TEST (verificación del nivel real)\n\nNUNCA confíes en el nivel autopercibido. Aplica un diagnóstico de 3 partes, calibrado para empezar un nivel DEBAJO de lo que el alumno declaró:\n\n**Parte A — Gramática escalonada (6 ítems):** una oración para completar por cada nivel A1→C1. Detente cuando falle 2 seguidas.\n\n**Parte B — Producción escrita:** \"Escríbeme 4-6 oraciones en inglés sobre [uno de sus intereses declarados].\" Evalúa: rango gramatical, precisión, vocabulario, cohesión.\n\n**Parte C — Comprensión:** un párrafo corto en inglés (calibrado al nivel aparente) + 3 preguntas: una literal, una inferencial, una de opinión.\n\n**Asignación de nivel y libro:**\n\n| Resultado | CEFR | Libro asignado |\n|---|---|---|\n| No produce oraciones completas | A0 | Core Basics 1 |\n| Presente simple con errores | A1 | Core Basics 2 |\n| Pasado/futuro básico funcional | A2 | Core Basics 3-4 + Practice 1 |\n| Tiempos perfectos inestables | B1 | Core Grammar 1 + Practice 2 |\n| Gramática sólida, falta naturalidad | B2 | Core Grammar 2 + Practice 3 |\n| Matices, registro, errores raros | C1 | Core Grammar 3 + Practice 4 |\n| Casi nativo, pule estilo | C2 | Core Grammar 3 (final) + Practice 5 |\n\nComunica el resultado SIEMPRE en positivo: \"Tu nivel actual es B1 — eso significa que ya tienes la base para [meta]. Tu punto de partida es el libro X, lección Y.\"\n\n---\n\n## FASE 3 — PERFIL DEL ALUMNO (genera y muestra esta ficha)\n\n```\n📋 PERFIL VESPER\nNombre: [.]\nNivel verificado: [CEFR] | Autopercibido: [.]\nMeta: [.] | Plazo: [.]\nLibro(s) asignado(s): [.]\nLección de inicio: [.]\nIntereses: [1, 2, 3]\nDisponibilidad: [X días/sem, Y min]\nDebilidad foco: [.]\nEstilo de adaptación: [ejemplos sobre sus intereses + énfasis en su debilidad]\n```\n\n---\n\n## FASE 4 — RUTA PERSONALIZADA\n\nConstruye un roadmap de las próximas 8-12 lecciones TOMADAS del syllabus del libro asignado, en su orden original, pero con títulos re-contextualizados a los intereses del alumno.\n\nEjemplo (alumno B1, le gusta el fútbol, meta: trabajo):\n- Lección 7 del manual: \"Modals of Ability or Permission\"\n- En su ruta: \"Lección 7 — Modals: lo que tu equipo *can, could y be able to* hacer (y pedir permiso en la oficina)\"\n\nReglas del roadmap:\n- Respeta el orden del manual. No saltes lecciones salvo dominio demostrado.\n- Si la meta tiene plazo, calcula cuántas lecciones por semana se necesitan y dilo con honestidad (\"con 2 sesiones/semana llegas a B2 en ~X meses\").\n- Marca cada 4 lecciones un checkpoint de evaluación.\n\n---\n\n## FASE 5 — ENTREGA DE LECCIONES\n\nCada vez que el alumno pida \"siguiente lección\", genera la lección correspondiente del manual con los 5 bloques oficiales, adaptando SOLO el contexto:\n\n- **Warm Up:** pregunta conectada a sus intereses.\n- **Theory & Vocab:** la teoría del manual intacta; los ejemplos, reescritos sobre sus temas. Vocabulario meta del manual + 3-5 palabras de su dominio de interés.\n- **Controlled Practice:** mismos tipos de ejercicio del manual, contenido tematizado.\n- **Simulation:** escenario realista ligado a su META (entrevista, viaje, llamada de trabajo).\n- **1-on-1 Expansion:** tarea de producción libre; corrige con el método sandwich (logro → corrección → reto).\n\n**Calibración por nivel (densidad del input):**\n- A0-A1: instrucciones en español, inglés mínimo y repetido.\n- A2-B1: mezcla 50/50, instrucciones simples en inglés.\n- B2+: todo en inglés; español solo para aclarar matices si lo pide.\n\n---\n\n## FASE 6 — EVALUACIÓN Y ADAPTACIÓN CONTINUA\n\n**Cada 4 lecciones:** mini-examen (10 ítems: 4 gramática, 3 vocabulario, 2 comprensión, 1 producción).\n- ≥80%: avanza; considera acelerar.\n- 60-79%: avanza con una lección de refuerzo intercalada.\n- <60%: repite el bloque con nuevos contextos (nunca los mismos ejercicios).\n\n**Reglas de adaptación en vivo:**\n- Si el alumno dice \"muy fácil\" 2 veces → sube densidad y reduce andamiaje.\n- Si comete el mismo error 3 veces → micro-lección de 5 min sobre ese punto antes de continuar.\n- Si falta >1 semana → al volver, repaso de 10 min antes de la lección nueva.\n- Si pierde motivación → conecta la siguiente lección directamente con su meta (\"esto es exactamente lo que dirás en tu entrevista\").\n\n---\n\n## COMANDOS DEL ALUMNO\n\n| Comando | Acción |\n|---|---|\n| \"siguiente lección\" | Entrega la próxima lección de la ruta |\n| \"mi progreso\" | Muestra perfil + lecciones completadas + % hacia su meta |\n| \"corrígeme\" | Modo corrección: el alumno escribe libre, tú corriges con sandwich |\n| \"examen\" | Adelanta el checkpoint de evaluación |\n| \"más difícil\" / \"más fácil\" | Recalibra densidad inmediatamente |\n| \"cambiar tema\" | Actualiza intereses del perfil y re-tematiza la ruta |\n| \"repasar [tema]\" | Micro-lección de refuerzo sin romper la ruta |\n\n---\n\n## CONDUCTA DEL TUTOR\n\n- Cálido pero exigente. Celebra logros específicos, nunca elogios vacíos.\n- Una cosa a la vez: nunca entregues dos bloques sin interacción del alumno.\n- Corrige TODOS los errores en producción, pero prioriza máximo 2 por turno para no abrumar (los demás, anótalos para la micro-lección).\n- Nunca inventes contenido fuera de la progresión del currículo: si el alumno pide un tema 3 niveles arriba, dile honestamente en qué lección de su ruta llegará a eso.\n- Si detectas frustración, valida primero, ajusta después.",
  TRACKS: [{"name": "Track 1 — Core Basics (A0 → A2+)", "books": ["core_basics_lvl1", "core_basics_lvl2", "core_basics_lvl3", "core_basics_lvl4"]}, {"name": "Track 2 — Core Grammar (B1 → C2)", "books": ["core_grammar_lvl1", "core_grammar_lvl2", "core_grammar_lvl3"]}, {"name": "Track 3 — Core Practice (A1 → C2)", "books": ["core_practice_lvl1", "core_practice_lvl2", "core_practice_lvl3", "core_practice_lvl4", "core_practice_lvl5", "core_practice_lvl6"]}],
  SYLLABI: {
  "core_basics_lvl1": {
    "name": "Core Basics · Level 1",
    "cefr": "A0",
    "desc": "To Be or Not To Be — identidad, presentaciones y lo esencial",
    "lessons": [
      {
        "n": 1,
        "t": "Who Are You?"
      },
      {
        "n": 2,
        "t": "Where Are You From?"
      },
      {
        "n": 3,
        "t": "Jobs & Professions"
      },
      {
        "n": 4,
        "t": "Adjectives (Feelings)"
      },
      {
        "n": 5,
        "t": "Family Tree"
      },
      {
        "n": 6,
        "t": "Colors & Clothing"
      },
      {
        "n": 7,
        "t": "Describing People"
      },
      {
        "n": 8,
        "t": "The Weather"
      },
      {
        "n": 9,
        "t": "Numbers 1-20"
      },
      {
        "n": 10,
        "t": "Time & Days"
      },
      {
        "n": 11,
        "t": "Rooms in House"
      },
      {
        "n": 12,
        "t": "Prepositions of Place"
      },
      {
        "n": 13,
        "t": "There is / There are"
      },
      {
        "n": 14,
        "t": "Demonstratives (This/That)"
      },
      {
        "n": 15,
        "t": "Possessive Adjectives"
      },
      {
        "n": 16,
        "t": "Nationalities"
      },
      {
        "n": 17,
        "t": "Opposites"
      },
      {
        "n": 18,
        "t": "Question Words"
      },
      {
        "n": 19,
        "t": "Yes/No Questions"
      },
      {
        "n": 20,
        "t": "Level 1 Final Exam"
      }
    ]
  },
  "core_basics_lvl2": {
    "name": "Core Basics · Level 2",
    "cefr": "A1",
    "desc": "Do I Know? — rutinas, preguntas y presente simple",
    "lessons": [
      {
        "n": 1,
        "t": "Daily Routine (Present Simple - I Do)"
      },
      {
        "n": 2,
        "t": "Third Person (He Does)"
      },
      {
        "n": 3,
        "t": "Questions (Do vs Does)"
      },
      {
        "n": 4,
        "t": "Negatives (Don't vs Doesn't)"
      },
      {
        "n": 5,
        "t": "Short Answers"
      },
      {
        "n": 6,
        "t": "Adverbs of Frequency"
      },
      {
        "n": 7,
        "t": "Object Pronouns"
      },
      {
        "n": 8,
        "t": "Hobbies (Like + ing)"
      },
      {
        "n": 9,
        "t": "Past Simple Intro (Did)"
      },
      {
        "n": 10,
        "t": "Regular Verbs (-ed)"
      },
      {
        "n": 11,
        "t": "Irregular Verbs 1"
      },
      {
        "n": 12,
        "t": "Irregular Verbs 2"
      },
      {
        "n": 13,
        "t": "Negative Past (Didn't)"
      },
      {
        "n": 14,
        "t": "Past Questions (Did you?)"
      },
      {
        "n": 15,
        "t": "Future with Will"
      },
      {
        "n": 16,
        "t": "Imperatives"
      },
      {
        "n": 17,
        "t": "Can / Can't"
      },
      {
        "n": 18,
        "t": "Let's / Why don't we"
      },
      {
        "n": 19,
        "t": "Past vs Present"
      },
      {
        "n": 20,
        "t": "Level 2 Final Exam"
      }
    ]
  },
  "core_basics_lvl3": {
    "name": "Core Basics · Level 3",
    "cefr": "A2",
    "desc": "Have I Been? — pasado, experiencias e historias",
    "lessons": [
      {
        "n": 1,
        "t": "Present Continuous"
      },
      {
        "n": 2,
        "t": "Present Simple vs Continuous"
      },
      {
        "n": 3,
        "t": "Present Perfect (Experiences)"
      },
      {
        "n": 4,
        "t": "Past Simple Review (Storytelling)"
      },
      {
        "n": 5,
        "t": "Going to (Future Plans)"
      },
      {
        "n": 6,
        "t": "Comparatives"
      },
      {
        "n": 7,
        "t": "Superlatives"
      },
      {
        "n": 8,
        "t": "Asking for Information (WH Questions)"
      },
      {
        "n": 9,
        "t": "Modal Verbs (Should / Must / Have to)"
      },
      {
        "n": 10,
        "t": "Zero and First Conditionals"
      },
      {
        "n": 11,
        "t": "Second Conditional (Hypothetical)"
      },
      {
        "n": 12,
        "t": "Passive Voice (Introduction)"
      },
      {
        "n": 13,
        "t": "Reported Speech (Introduction)"
      },
      {
        "n": 14,
        "t": "Relative Clauses"
      },
      {
        "n": 15,
        "t": "Phrasal Verbs (Common Set)"
      },
      {
        "n": 16,
        "t": "Expressing Opinions"
      },
      {
        "n": 17,
        "t": "Describing People and Places"
      },
      {
        "n": 18,
        "t": "Talking About Health"
      },
      {
        "n": 19,
        "t": "Shopping and Negotiating"
      },
      {
        "n": 20,
        "t": "Level 3 Final Review (A2 Exit)"
      }
    ]
  },
  "core_basics_lvl4": {
    "name": "Core Basics · Level 4",
    "cefr": "A2+",
    "desc": "Let's Write — primeros textos y redacción guiada",
    "lessons": [
      {
        "n": 1,
        "t": "The Mechanics (S+V) & The Pronunciation War"
      },
      {
        "n": 2,
        "t": "Punctuation Marks"
      },
      {
        "n": 3,
        "t": "Capitalization Rules"
      },
      {
        "n": 4,
        "t": "Linking Words (And, But, So)"
      },
      {
        "n": 5,
        "t": "Sequencing (First, Then)"
      },
      {
        "n": 6,
        "t": "Paragraph Structure"
      },
      {
        "n": 7,
        "t": "Writing Emails"
      },
      {
        "n": 8,
        "t": "Adjective Order"
      },
      {
        "n": 9,
        "t": "Relative Clauses (Who/Which)"
      },
      {
        "n": 10,
        "t": "Opinion Essays"
      },
      {
        "n": 11,
        "t": "Past Simple vs Continuous (Narrative)"
      },
      {
        "n": 12,
        "t": "Used To (Past Habits)"
      },
      {
        "n": 13,
        "t": "Present Perfect (For/Since)"
      },
      {
        "n": 14,
        "t": "Passives (Intro)"
      },
      {
        "n": 15,
        "t": "Second Conditional (Unreal)"
      },
      {
        "n": 16,
        "t": "Too / Enough"
      },
      {
        "n": 17,
        "t": "Indirect Questions"
      },
      {
        "n": 18,
        "t": "Future Forms Review"
      },
      {
        "n": 19,
        "t": "Prepositions of Movement"
      },
      {
        "n": 20,
        "t": "Level 4 Exam"
      }
    ]
  },
  "core_grammar_lvl1": {
    "name": "Core Grammar · Foundations",
    "cefr": "B1",
    "desc": "Drills fundamentales para consolidar la base",
    "lessons": [
      {
        "n": 1,
        "t": "The Parts of Speech"
      },
      {
        "n": 2,
        "t": "Simple Past vs Present Perfect"
      },
      {
        "n": 3,
        "t": "Narrative Tenses (Past Continuous & Perfect)"
      },
      {
        "n": 4,
        "t": "Future Forms for Predictions"
      },
      {
        "n": 5,
        "t": "Review: Paragraph Workshop"
      },
      {
        "n": 6,
        "t": "Stative vs Dynamic Verbs"
      },
      {
        "n": 7,
        "t": "Modals of Ability & Permission"
      },
      {
        "n": 8,
        "t": "Modals of Obligation & Advice"
      },
      {
        "n": 9,
        "t": "First & Second Conditionals"
      },
      {
        "n": 10,
        "t": "Mid-Term Review"
      },
      {
        "n": 11,
        "t": "The Passive Voice"
      },
      {
        "n": 12,
        "t": "Reported Speech"
      },
      {
        "n": 13,
        "t": "Relative Clauses"
      },
      {
        "n": 14,
        "t": "Used to / Be used to / Get used to"
      },
      {
        "n": 15,
        "t": "Structure Auditing"
      },
      {
        "n": 16,
        "t": "Gerunds vs Infinitives"
      },
      {
        "n": 17,
        "t": "Contrast Connectors"
      },
      {
        "n": 18,
        "t": "Quantifiers"
      },
      {
        "n": 19,
        "t": "Prepositions of Place & Time"
      },
      {
        "n": 20,
        "t": "Final Review (Structure & Cohesion)"
      }
    ]
  },
  "core_grammar_lvl2": {
    "name": "Core Grammar · In Context",
    "cefr": "B2",
    "desc": "Estructuras complejas aplicadas en contexto",
    "lessons": [
      {
        "n": 1,
        "t": "Cleft Sentences & Structural Emphasis"
      },
      {
        "n": 2,
        "t": "Mixed Conditionals (Type 1)"
      },
      {
        "n": 3,
        "t": "Mixed Conditionals (Type 2)"
      },
      {
        "n": 4,
        "t": "Advanced Future Perspectives (Perfect & Continuous)"
      },
      {
        "n": 5,
        "t": "Evaluación de Desempeño 1: Critical Analysis Workshop"
      },
      {
        "n": 6,
        "t": "Grammatical Inversion I (Negative Adverbs)"
      },
      {
        "n": 7,
        "t": "Grammatical Inversion II (Conditional Inversion)"
      },
      {
        "n": 8,
        "t": "The Subjunctive Mood"
      },
      {
        "n": 9,
        "t": "Advanced Participle Clauses"
      },
      {
        "n": 10,
        "t": "Evaluación de Desempeño 2: Stylistic Mastery"
      },
      {
        "n": 11,
        "t": "Advanced Passive Structures"
      },
      {
        "n": 12,
        "t": "Hedging & Speculative Language"
      },
      {
        "n": 13,
        "t": "Past Modals of Deduction & Regret"
      },
      {
        "n": 14,
        "t": "Relative Clauses with Prepositions"
      },
      {
        "n": 15,
        "t": "Evaluación de Desempeño 3: Hedging & Deduction"
      },
      {
        "n": 16,
        "t": "Advanced Sentence Connectors"
      },
      {
        "n": 17,
        "t": "Expressing Preferences & Hypotheses (Would rather / It's time)"
      },
      {
        "n": 18,
        "t": "Compound Adjectives & Noun Modification"
      },
      {
        "n": 19,
        "t": "Complex Gerund & Infinitive Phrases"
      },
      {
        "n": 20,
        "t": "Examen de Nivel Final: Mastery of Precision"
      }
    ]
  },
  "core_grammar_lvl3": {
    "name": "Core Grammar · Mastery",
    "cefr": "C1+",
    "desc": "Estilo, matices y excepciones del inglés avanzado",
    "lessons": [
      {
        "n": 1,
        "t": "Advanced Cleft Sentences & Fronting"
      },
      {
        "n": 2,
        "t": "Negative Inversion (Full Mastery)"
      },
      {
        "n": 3,
        "t": "Complex Prepositional Phrases"
      },
      {
        "n": 4,
        "t": "Nominalization for Abstract Thought"
      },
      {
        "n": 5,
        "t": "Evaluación de Desempeño 1: Elegant Writing Workshop"
      },
      {
        "n": 6,
        "t": "Mixed Conditionals in Professional Critique"
      },
      {
        "n": 7,
        "t": "Wishes, Regrets, and Unreal Past"
      },
      {
        "n": 8,
        "t": "Advanced Modal Deduction (C2 Focus)"
      },
      {
        "n": 9,
        "t": "The Subjunctive in Formal Agreements"
      },
      {
        "n": 10,
        "t": "Evaluación de Desempeño 2: International Negotiation Simulation"
      },
      {
        "n": 11,
        "t": "Advanced Participle Clauses (Reduced Syntax)"
      },
      {
        "n": 12,
        "t": "Discourse Markers for High-Level Logic"
      },
      {
        "n": 13,
        "t": "Substitution and Ellipsis"
      },
      {
        "n": 14,
        "t": "Advanced Punctuation & Rhetorical Flow"
      },
      {
        "n": 15,
        "t": "Evaluación de Desempeño 3: Rhetorical Speed & Rhythm"
      },
      {
        "n": 16,
        "t": "Euphemisms and Hedges in Diplomacy"
      },
      {
        "n": 17,
        "t": "Rhetorical Devices and Parallelism"
      },
      {
        "n": 18,
        "t": "Mastering The Passive of Reporting"
      },
      {
        "n": 19,
        "t": "Nuanced Adverbs of Attitude"
      },
      {
        "n": 20,
        "t": "Capstone Project: The Grand Defense"
      }
    ]
  },
  "core_practice_lvl1": {
    "name": "Core Practice · Level 1",
    "cefr": "A1–A2",
    "desc": "Listening y speaking con audio nativo",
    "lessons": [
      {
        "n": 1,
        "t": "Morning Routine"
      },
      {
        "n": 2,
        "t": "Weekend Activities"
      },
      {
        "n": 3,
        "t": "Music & Concerts"
      },
      {
        "n": 4,
        "t": "Movies & TV Shows"
      },
      {
        "n": 5,
        "t": "Playing Sports"
      },
      {
        "n": 6,
        "t": "Healthy Food"
      },
      {
        "n": 7,
        "t": "Asking for Directions"
      },
      {
        "n": 8,
        "t": "Booking a Hotel"
      },
      {
        "n": 9,
        "t": "The Job Interview"
      },
      {
        "n": 10,
        "t": "Office Emails"
      },
      {
        "n": 11,
        "t": "The Weather Forecast"
      },
      {
        "n": 12,
        "t": "Animals in the Zoo"
      },
      {
        "n": 13,
        "t": "Buying a Mobile Phone"
      },
      {
        "n": 14,
        "t": "Internet & Apps"
      },
      {
        "n": 15,
        "t": "Family Members"
      },
      {
        "n": 16,
        "t": "My Hometown"
      },
      {
        "n": 17,
        "t": "Describing a Picture"
      },
      {
        "n": 18,
        "t": "A Short Story"
      },
      {
        "n": 19,
        "t": "Plans for Tomorrow"
      },
      {
        "n": 20,
        "t": "A Party Invitation"
      }
    ]
  },
  "core_practice_lvl2": {
    "name": "Core Practice · Level 2",
    "cefr": "B1",
    "desc": "Lectura y escritura: leyendas, mitos y misterios",
    "lessons": [
      {
        "n": 1,
        "t": "Small Talk"
      },
      {
        "n": 2,
        "t": "Complaints"
      },
      {
        "n": 3,
        "t": "Negotiation"
      },
      {
        "n": 4,
        "t": "Travel Problems"
      },
      {
        "n": 5,
        "t": "Job Interviews"
      },
      {
        "n": 6,
        "t": "Technology"
      },
      {
        "n": 7,
        "t": "Environment"
      },
      {
        "n": 8,
        "t": "News & Media"
      },
      {
        "n": 9,
        "t": "Health & Fitness"
      },
      {
        "n": 10,
        "t": "Money"
      },
      {
        "n": 11,
        "t": "Social Media"
      },
      {
        "n": 12,
        "t": "Culture"
      },
      {
        "n": 13,
        "t": "Education"
      },
      {
        "n": 14,
        "t": "Relationships"
      },
      {
        "n": 15,
        "t": "Housing"
      },
      {
        "n": 16,
        "t": "Crime"
      },
      {
        "n": 17,
        "t": "Art & Music"
      },
      {
        "n": 18,
        "t": "Psychology"
      },
      {
        "n": 19,
        "t": "Future Tech"
      },
      {
        "n": 20,
        "t": "Graduation"
      }
    ]
  },
  "core_practice_lvl3": {
    "name": "Core Practice · Level 3",
    "cefr": "B1–B2",
    "desc": "Las 4 destrezas: debate y descubrimiento",
    "lessons": [
      {
        "n": 1,
        "t": "Debate Skills"
      },
      {
        "n": 2,
        "t": "Diplomacy"
      },
      {
        "n": 3,
        "t": "Crisis Management"
      },
      {
        "n": 4,
        "t": "Philosophy"
      },
      {
        "n": 5,
        "t": "Economics"
      },
      {
        "n": 6,
        "t": "Science"
      },
      {
        "n": 7,
        "t": "Literature"
      },
      {
        "n": 8,
        "t": "Psychology"
      },
      {
        "n": 9,
        "t": "Environment"
      },
      {
        "n": 10,
        "t": "Politics"
      },
      {
        "n": 11,
        "t": "History"
      },
      {
        "n": 12,
        "t": "Technology"
      },
      {
        "n": 13,
        "t": "Business"
      },
      {
        "n": 14,
        "t": "Law"
      },
      {
        "n": 15,
        "t": "Media"
      },
      {
        "n": 16,
        "t": "Culture"
      },
      {
        "n": 17,
        "t": "Education"
      },
      {
        "n": 18,
        "t": "Health"
      },
      {
        "n": 19,
        "t": "Space"
      },
      {
        "n": 20,
        "t": "The Future"
      }
    ]
  },
  "core_practice_lvl4": {
    "name": "Core Practice · Level 4",
    "cefr": "A2–B1",
    "desc": "Arte y literatura: talleres orales",
    "lessons": [
      {
        "n": 1,
        "t": "The Elements of Story"
      },
      {
        "n": 2,
        "t": "Descriptive Imagery"
      },
      {
        "n": 3,
        "t": "Spoken Word & Poetry"
      },
      {
        "n": 4,
        "t": "Character Psychology"
      },
      {
        "n": 5,
        "t": "World-building & Setting"
      },
      {
        "n": 6,
        "t": "Mastering Dialogue"
      },
      {
        "n": 7,
        "t": "The Mystery Genre"
      },
      {
        "n": 8,
        "t": "High Fantasy"
      },
      {
        "n": 9,
        "t": "Hard Sci-Fi"
      },
      {
        "n": 10,
        "t": "Historical Biographies"
      },
      {
        "n": 11,
        "t": "Stand-up Comedy & Satire"
      },
      {
        "n": 12,
        "t": "Magical Realism"
      },
      {
        "n": 13,
        "t": "Art Critique"
      },
      {
        "n": 14,
        "t": "Film Analysis"
      },
      {
        "n": 15,
        "t": "Music Journalism"
      },
      {
        "n": 16,
        "t": "Investigative Journalism"
      },
      {
        "n": 17,
        "t": "Playwriting & Theater"
      },
      {
        "n": 18,
        "t": "Graphic Novels & Comics"
      },
      {
        "n": 19,
        "t": "Digital Narratives"
      },
      {
        "n": 20,
        "t": "Literary Criticism"
      },
      {
        "n": 21,
        "t": "The Editing Process"
      },
      {
        "n": 22,
        "t": "The Publishing Industry"
      },
      {
        "n": 23,
        "t": "The Screenplay Pitch"
      },
      {
        "n": 24,
        "t": "The Final Masterpiece"
      }
    ]
  },
  "core_practice_lvl5": {
    "name": "Core Practice · Level 5",
    "cefr": "B2–C1",
    "desc": "Futuro y tecnología: lectura y escritura",
    "lessons": [
      {
        "n": 1,
        "t": "Modern Stoicism"
      },
      {
        "n": 2,
        "t": "The Architecture of Happiness"
      },
      {
        "n": 3,
        "t": "The Paradox of Choice"
      },
      {
        "n": 4,
        "t": "Video Games as High Art"
      },
      {
        "n": 5,
        "t": "The Biohacking Movement"
      },
      {
        "n": 6,
        "t": "The Medicalization of Sadness"
      },
      {
        "n": 7,
        "t": "The Philosophy of the Flâneur"
      },
      {
        "n": 8,
        "t": "Space Tourism and Inequality"
      },
      {
        "n": 9,
        "t": "The Fallacy of Infinite Growth"
      },
      {
        "n": 10,
        "t": "Automation & The Hollowed-Out Middle Class"
      },
      {
        "n": 11,
        "t": "Deep Ecology and the Rights of Nature"
      },
      {
        "n": 12,
        "t": "The Carbon Offset Illusion"
      },
      {
        "n": 13,
        "t": "The Singularity"
      },
      {
        "n": 14,
        "t": "Surveillance Capitalism"
      },
      {
        "n": 15,
        "t": "The Decline of the Nation-State"
      },
      {
        "n": 16,
        "t": "Post-Truth Politics"
      },
      {
        "n": 17,
        "t": "The Commodification of Subcultures"
      },
      {
        "n": 18,
        "t": "Cancel Culture and Nuance"
      },
      {
        "n": 19,
        "t": "Interplanetary Ethics"
      },
      {
        "n": 20,
        "t": "The Fermi Paradox"
      }
    ]
  },
  "core_practice_lvl6": {
    "name": "Core Practice · Level 6",
    "cefr": "C2",
    "desc": "Cultura pop y sociedad: dominio de las 4 destrezas",
    "lessons": [
      {
        "n": 1,
        "t": "The Viral Phenomenon (2 clases)"
      },
      {
        "n": 2,
        "t": "Reality Television (2 clases)"
      },
      {
        "n": 3,
        "t": "Celebrity Worship (2 clases)"
      },
      {
        "n": 4,
        "t": "Meme Culture (2 clases)"
      },
      {
        "n": 5,
        "t": "Streaming Wars (2 clases)"
      },
      {
        "n": 6,
        "t": "Cancel Culture (2 clases)"
      },
      {
        "n": 7,
        "t": "Nostalgia as a Product (2 clases)"
      },
      {
        "n": 8,
        "t": "True Crime Obsession (2 clases)"
      },
      {
        "n": 9,
        "t": "Beauty Standards & Filters (2 clases)"
      },
      {
        "n": 10,
        "t": "The Influencer Economy (2 clases)"
      },
      {
        "n": 11,
        "t": "Satire and Cynicism (2 clases)"
      },
      {
        "n": 12,
        "t": "Fandom and Toxicity (2 clases)"
      },
      {
        "n": 13,
        "t": "Pop Music Anatomy (2 clases)"
      },
      {
        "n": 14,
        "t": "Video Games as Art (2 clases)"
      },
      {
        "n": 15,
        "t": "The True Cost of Fast Fashion (2 clases)"
      },
      {
        "n": 16,
        "t": "The Death of Print (2 clases)"
      },
      {
        "n": 17,
        "t": "Superheroes and Modern Mythology (2 clases)"
      },
      {
        "n": 18,
        "t": "Subculture vs Mainstream (2 clases)"
      },
      {
        "n": 19,
        "t": "The Aesthetics of Dystopia (2 clases)"
      },
      {
        "n": 20,
        "t": "Pop Culture as History (2 clases)"
      }
    ]
  }
}
};
