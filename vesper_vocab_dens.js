/* =====================================================================
 * VESPER · VOCAB DENS  (recintos temáticos de vocabulario por mundo)
 * ---------------------------------------------------------------------
 * Cada mundo/nivel tiene un "recinto" temático (casa, cueva, puerto,
 * torre, observatorio, castillo) que se abre en RAMAS (salas). Cada
 * rama guarda un mazo de TARJETAS de vocabulario (inglés ⇄ español)
 * y una mini-actividad rápida.
 *
 *   build(L, ORDER) ->  { A1:{...den}, A2:{...}, ... }
 *
 * El contenido se compone de:
 *   1. Listas CURADAS por tema (abajo, en DENS).
 *   2. Palabras AUTO-EXTRAÍDAS de las lecciones de vocabulario ya
 *      existentes (pares de "matching"), agrupadas en ramas extra
 *      "Más palabras del mundo" — sin duplicar las curadas.
 *
 * Datos puros: los iconos/estructura visual viven en leccion.html.
 * ===================================================================== */
window.VESPER_VOCAB_DENS = (function () {

  /* estructura visual + ramas curadas por nivel.
     branch.icon = clave semántica (mapeada a SVG en leccion.html).
     branch.practice = id de lección real para "practicar" (opcional). */
  var DENS = {
    A1: {
      structure: "house", name: "La Casa del Hogar",
      intro: "Recorre las habitaciones de la casa y aprende las palabras del día a día.",
      branches: [
        { id: "kitchen", name: "La cocina", icon: "pot", hint: "Comida y bebida", practice: "lvl-a1-vocab-food",
          cards: [ {en:"apple",es:"manzana"},{en:"bread",es:"pan"},{en:"water",es:"agua"},{en:"milk",es:"leche"},
                   {en:"cheese",es:"queso"},{en:"egg",es:"huevo"},{en:"coffee",es:"café"},{en:"rice",es:"arroz"},
                   {en:"fish",es:"pescado"},{en:"chicken",es:"pollo"},{en:"butter",es:"mantequilla"},{en:"soup",es:"sopa"},
                   {en:"salt",es:"sal"},{en:"sugar",es:"azúcar"} ] },
        { id: "living", name: "La sala", icon: "sofa", hint: "Objetos de casa", practice: "lvl-a1-vocab-house",
          cards: [ {en:"table",es:"mesa"},{en:"chair",es:"silla"},{en:"door",es:"puerta"},{en:"window",es:"ventana"},
                   {en:"lamp",es:"lámpara"},{en:"book",es:"libro"},{en:"clock",es:"reloj"},{en:"key",es:"llave"},
                   {en:"sofa",es:"sofá"},{en:"wall",es:"pared"},{en:"floor",es:"suelo"},{en:"picture",es:"cuadro"},
                   {en:"shelf",es:"estante"},{en:"rug",es:"alfombra"} ] },
        { id: "bedroom", name: "El dormitorio", icon: "bed", hint: "Ropa y descanso", practice: "lvl-a1-vocab-everyday",
          cards: [ {en:"bed",es:"cama"},{en:"pillow",es:"almohada"},{en:"shirt",es:"camisa"},{en:"shoes",es:"zapatos"},
                   {en:"dress",es:"vestido"},{en:"hat",es:"sombrero"},{en:"mirror",es:"espejo"},{en:"blanket",es:"manta"},
                   {en:"sock",es:"calcetín"},{en:"coat",es:"abrigo"},{en:"sweater",es:"suéter"},{en:"drawer",es:"cajón"} ] },
        { id: "bathroom", name: "El baño", icon: "drop", hint: "Aseo diario",
          cards: [ {en:"soap",es:"jabón"},{en:"towel",es:"toalla"},{en:"toothbrush",es:"cepillo de dientes"},{en:"shower",es:"ducha"},
                   {en:"sink",es:"lavabo"},{en:"comb",es:"peine"},{en:"toilet",es:"inodoro"},{en:"brush",es:"cepillo"},
                   {en:"sponge",es:"esponja"},{en:"tap",es:"grifo"} ] },
        { id: "garden", name: "El jardín", icon: "leaf", hint: "Animales y naturaleza", practice: "lvl-a1-vocab-animals",
          cards: [ {en:"dog",es:"perro"},{en:"cat",es:"gato"},{en:"bird",es:"pájaro"},{en:"tree",es:"árbol"},
                   {en:"flower",es:"flor"},{en:"sun",es:"sol"},{en:"rain",es:"lluvia"},{en:"grass",es:"hierba"},
                   {en:"bee",es:"abeja"},{en:"cloud",es:"nube"},{en:"sky",es:"cielo"},{en:"butterfly",es:"mariposa"} ] },
        { id: "family", name: "La familia", icon: "family", hint: "Personas y parentesco",
          cards: [ {en:"mother",es:"madre"},{en:"father",es:"padre"},{en:"sister",es:"hermana"},{en:"brother",es:"hermano"},
                   {en:"baby",es:"bebé"},{en:"friend",es:"amigo"},{en:"son",es:"hijo"},{en:"daughter",es:"hija"},
                   {en:"grandmother",es:"abuela"},{en:"grandfather",es:"abuelo"} ] }
      ]
    },
    A2: {
      structure: "cave", name: "La Cueva del Sendero",
      intro: "Adéntrate en la cueva: cada galería guarda palabras para moverte por el mundo.",
      branches: [
        { id: "entrance", name: "La entrada", icon: "compass", hint: "Viajes y direcciones", practice: "lvl-a2-vocab-travel",
          cards: [ {en:"map",es:"mapa"},{en:"road",es:"camino"},{en:"left",es:"izquierda"},{en:"right",es:"derecha"},
                   {en:"north",es:"norte"},{en:"south",es:"sur"},{en:"ticket",es:"billete"},{en:"train",es:"tren"},
                   {en:"bus",es:"autobús"},{en:"station",es:"estación"},{en:"airport",es:"aeropuerto"},{en:"near",es:"cerca"},
                   {en:"far",es:"lejos"},{en:"corner",es:"esquina"} ] },
        { id: "market", name: "El mercado", icon: "bag", hint: "Compras y ropa", practice: "lvl-a2-vocab-clothes",
          cards: [ {en:"money",es:"dinero"},{en:"price",es:"precio"},{en:"shop",es:"tienda"},{en:"cheap",es:"barato"},
                   {en:"expensive",es:"caro"},{en:"size",es:"talla"},{en:"jacket",es:"chaqueta"},{en:"trousers",es:"pantalones"},
                   {en:"sale",es:"rebaja"},{en:"coin",es:"moneda"},{en:"change",es:"cambio"},{en:"receipt",es:"recibo"},
                   {en:"wallet",es:"cartera"} ] },
        { id: "spring", name: "El manantial", icon: "drop", hint: "Naturaleza",
          cards: [ {en:"river",es:"río"},{en:"mountain",es:"montaña"},{en:"forest",es:"bosque"},{en:"stone",es:"piedra"},
                   {en:"path",es:"sendero"},{en:"cave",es:"cueva"},{en:"leaf",es:"hoja"},{en:"wind",es:"viento"},
                   {en:"lake",es:"lago"},{en:"hill",es:"colina"},{en:"valley",es:"valle"},{en:"cliff",es:"acantilado"},
                   {en:"mud",es:"barro"} ] },
        { id: "depths", name: "Las profundidades", icon: "bolt", hint: "Verbos de movimiento", practice: "lvl-a2-vocab-routines",
          cards: [ {en:"to go",es:"ir"},{en:"to come",es:"venir"},{en:"to find",es:"encontrar"},{en:"to carry",es:"llevar"},
                   {en:"to climb",es:"subir"},{en:"to cross",es:"cruzar"},{en:"to rest",es:"descansar"},{en:"to arrive",es:"llegar"},
                   {en:"to follow",es:"seguir"},{en:"to return",es:"regresar"},{en:"to escape",es:"escapar"},{en:"to explore",es:"explorar"} ] },
        { id: "camp", name: "El campamento", icon: "flame", hint: "Cuerpo y salud",
          cards: [ {en:"tired",es:"cansado"},{en:"hungry",es:"hambriento"},{en:"thirsty",es:"sediento"},{en:"sick",es:"enfermo"},
                   {en:"doctor",es:"médico"},{en:"medicine",es:"medicina"},{en:"fire",es:"fuego"},{en:"tent",es:"tienda de campaña"},
                   {en:"torch",es:"linterna"},{en:"blanket",es:"manta"} ] },
        { id: "echoes", name: "Los ecos", icon: "spark", hint: "Tiempo y rutina",
          cards: [ {en:"morning",es:"mañana"},{en:"night",es:"noche"},{en:"yesterday",es:"ayer"},{en:"week",es:"semana"},
                   {en:"month",es:"mes"},{en:"hour",es:"hora"},{en:"early",es:"temprano"},{en:"late",es:"tarde"},
                   {en:"always",es:"siempre"},{en:"never",es:"nunca"} ] }
      ]
    },
    B1: {
      structure: "harbor", name: "El Puerto del Horizonte",
      intro: "Atraca en cada muelle del puerto y carga el vocabulario del mundo moderno.",
      branches: [
        { id: "dock", name: "El muelle", icon: "anchor", hint: "Ciudad",
          cards: [ {en:"street",es:"calle"},{en:"building",es:"edificio"},{en:"bridge",es:"puente"},{en:"traffic",es:"tráfico"},
                   {en:"corner",es:"esquina"},{en:"square",es:"plaza"},{en:"sidewalk",es:"acera"},{en:"neighbor",es:"vecino"},
                   {en:"crowd",es:"multitud"},{en:"suburb",es:"afueras"},{en:"district",es:"distrito"},{en:"avenue",es:"avenida"} ] },
        { id: "lighthouse", name: "El faro", icon: "flame", hint: "Medio ambiente", practice: "lvl-b1-vocab-environment",
          cards: [ {en:"weather",es:"tiempo"},{en:"climate",es:"clima"},{en:"pollution",es:"contaminación"},{en:"energy",es:"energía"},
                   {en:"waste",es:"residuos"},{en:"to recycle",es:"reciclar"},{en:"planet",es:"planeta"},{en:"nature",es:"naturaleza"},
                   {en:"drought",es:"sequía"},{en:"flood",es:"inundación"},{en:"fuel",es:"combustible"},{en:"wildlife",es:"fauna"} ] },
        { id: "warehouse", name: "El almacén", icon: "globe", hint: "Viajes y cultura", practice: "lvl-b1-vocab-travel",
          cards: [ {en:"culture",es:"cultura"},{en:"language",es:"idioma"},{en:"custom",es:"costumbre"},{en:"journey",es:"viaje"},
                   {en:"abroad",es:"extranjero"},{en:"tourist",es:"turista"},{en:"souvenir",es:"recuerdo"},{en:"border",es:"frontera"},
                   {en:"passport",es:"pasaporte"},{en:"luggage",es:"equipaje"},{en:"heritage",es:"patrimonio"},{en:"tradition",es:"tradición"} ] },
        { id: "deck", name: "La cubierta", icon: "chat", hint: "Opiniones",
          cards: [ {en:"opinion",es:"opinión"},{en:"advice",es:"consejo"},{en:"decision",es:"decisión"},{en:"reason",es:"razón"},
                   {en:"choice",es:"elección"},{en:"to agree",es:"estar de acuerdo"},{en:"doubt",es:"duda"},{en:"to suggest",es:"sugerir"},
                   {en:"to refuse",es:"rechazar"},{en:"to admit",es:"admitir"} ] },
        { id: "bridge", name: "El puente de mando", icon: "link", hint: "Tecnología",
          cards: [ {en:"screen",es:"pantalla"},{en:"device",es:"dispositivo"},{en:"network",es:"red"},{en:"password",es:"contraseña"},
                   {en:"to download",es:"descargar"},{en:"file",es:"archivo"},{en:"to update",es:"actualizar"},{en:"data",es:"datos"},
                   {en:"software",es:"programa"},{en:"online",es:"en línea"} ] },
        { id: "galley", name: "La bodega", icon: "bolt", hint: "Deporte y salud",
          cards: [ {en:"exercise",es:"ejercicio"},{en:"training",es:"entrenamiento"},{en:"team",es:"equipo"},{en:"match",es:"partido"},
                   {en:"goal",es:"gol"},{en:"fit",es:"en forma"},{en:"injury",es:"lesión"},{en:"coach",es:"entrenador"},
                   {en:"score",es:"marcador"},{en:"race",es:"carrera"} ] }
      ]
    },
    B2: {
      structure: "tower", name: "La Torre del Saber",
      intro: "Sube piso a piso por la torre: cada nivel domina un registro más formal.",
      branches: [
        { id: "hall", name: "El salón", icon: "briefcase", hint: "Negocios",
          cards: [ {en:"meeting",es:"reunión"},{en:"deadline",es:"fecha límite"},{en:"budget",es:"presupuesto"},{en:"profit",es:"beneficio"},
                   {en:"client",es:"cliente"},{en:"report",es:"informe"},{en:"manager",es:"gerente"},{en:"contract",es:"contrato"},
                   {en:"invoice",es:"factura"},{en:"deal",es:"acuerdo"},{en:"revenue",es:"ingresos"},{en:"supply",es:"suministro"},
                   {en:"demand",es:"demanda"} ] },
        { id: "library", name: "La biblioteca", icon: "book", hint: "Académico",
          cards: [ {en:"research",es:"investigación"},{en:"evidence",es:"evidencia"},{en:"theory",es:"teoría"},{en:"method",es:"método"},
                   {en:"source",es:"fuente"},{en:"summary",es:"resumen"},{en:"argument",es:"argumento"},{en:"conclusion",es:"conclusión"},
                   {en:"analysis",es:"análisis"},{en:"citation",es:"cita"},{en:"finding",es:"hallazgo"},{en:"gap",es:"vacío"} ] },
        { id: "workshop", name: "El taller", icon: "gear", hint: "Verbos de trabajo",
          cards: [ {en:"to manage",es:"gestionar"},{en:"to achieve",es:"lograr"},{en:"to improve",es:"mejorar"},{en:"to provide",es:"proporcionar"},
                   {en:"to require",es:"requerir"},{en:"to reduce",es:"reducir"},{en:"to increase",es:"aumentar"},{en:"to handle",es:"manejar"},
                   {en:"to negotiate",es:"negociar"},{en:"to launch",es:"lanzar"},{en:"to forecast",es:"pronosticar"},{en:"to outsource",es:"subcontratar"} ] },
        { id: "balcony", name: "El balcón", icon: "link", hint: "Conectores", practice: "lvl-b2-vocab-collocations",
          cards: [ {en:"however",es:"sin embargo"},{en:"therefore",es:"por lo tanto"},{en:"although",es:"aunque"},{en:"moreover",es:"además"},
                   {en:"whereas",es:"mientras que"},{en:"despite",es:"a pesar de"},{en:"thus",es:"así"},{en:"nevertheless",es:"no obstante"},
                   {en:"otherwise",es:"de lo contrario"},{en:"meanwhile",es:"mientras tanto"},{en:"consequently",es:"en consecuencia"} ] },
        { id: "vault", name: "La bóveda", icon: "gem", hint: "Finanzas",
          cards: [ {en:"loan",es:"préstamo"},{en:"interest",es:"interés"},{en:"investment",es:"inversión"},{en:"tax",es:"impuesto"},
                   {en:"savings",es:"ahorros"},{en:"debt",es:"deuda"},{en:"mortgage",es:"hipoteca"},{en:"account",es:"cuenta"},
                   {en:"currency",es:"divisa"},{en:"asset",es:"activo"} ] },
        { id: "studio", name: "El estudio", icon: "star", hint: "Vida laboral",
          cards: [ {en:"colleague",es:"colega"},{en:"career",es:"carrera"},{en:"salary",es:"salario"},{en:"promotion",es:"ascenso"},
                   {en:"interview",es:"entrevista"},{en:"resume",es:"currículum"},{en:"skill",es:"habilidad"},{en:"workload",es:"carga de trabajo"},
                   {en:"overtime",es:"horas extra"},{en:"leave",es:"permiso"} ] }
      ]
    },
    C1: {
      structure: "observatory", name: "El Observatorio del Firmamento",
      intro: "Apunta el telescopio a las ideas abstractas que definen el nivel avanzado.",
      branches: [
        { id: "dome", name: "La cúpula", icon: "star", hint: "Ideas abstractas", practice: "lvl-c1-vocab-trends",
          cards: [ {en:"insight",es:"perspicacia"},{en:"framework",es:"marco"},{en:"perception",es:"percepción"},{en:"assumption",es:"suposición"},
                   {en:"implication",es:"implicación"},{en:"perspective",es:"perspectiva"},{en:"notion",es:"noción"},{en:"paradigm",es:"paradigma"},
                   {en:"rationale",es:"fundamento"},{en:"concept",es:"concepto"} ] },
        { id: "telescope", name: "El telescopio", icon: "eye", hint: "Verbos académicos",
          cards: [ {en:"to assess",es:"evaluar"},{en:"to derive",es:"derivar"},{en:"to convey",es:"transmitir"},{en:"to undermine",es:"socavar"},
                   {en:"to foster",es:"fomentar"},{en:"to mitigate",es:"mitigar"},{en:"to highlight",es:"resaltar"},{en:"to underpin",es:"sustentar"},
                   {en:"to advocate",es:"abogar"},{en:"to refute",es:"refutar"},{en:"to entail",es:"conllevar"},{en:"to contend",es:"sostener"} ] },
        { id: "archive", name: "El archivo", icon: "scroll", hint: "Sustantivos formales",
          cards: [ {en:"criterion",es:"criterio"},{en:"phenomenon",es:"fenómeno"},{en:"consensus",es:"consenso"},{en:"bias",es:"sesgo"},
                   {en:"scope",es:"alcance"},{en:"trait",es:"rasgo"},{en:"threshold",es:"umbral"},{en:"correlation",es:"correlación"},
                   {en:"variable",es:"variable"},{en:"sample",es:"muestra"},{en:"outcome",es:"resultado"} ] },
        { id: "aurora", name: "La aurora", icon: "spark", hint: "Colocaciones",
          cards: [ {en:"to bear in mind",es:"tener en cuenta"},{en:"to take into account",es:"considerar"},
                   {en:"to draw a conclusion",es:"sacar una conclusión"},{en:"a steep learning curve",es:"una curva de aprendizaje pronunciada"},
                   {en:"to play a role",es:"desempeñar un papel"},{en:"to raise awareness",es:"concienciar"},{en:"to make progress",es:"avanzar"} ] },
        { id: "nebula", name: "La nebulosa", icon: "globe", hint: "Sociedad y tendencias",
          cards: [ {en:"trend",es:"tendencia"},{en:"impact",es:"impacto"},{en:"inequality",es:"desigualdad"},{en:"sustainability",es:"sostenibilidad"},
                   {en:"globalization",es:"globalización"},{en:"welfare",es:"bienestar"},{en:"diversity",es:"diversidad"},{en:"policy",es:"política"},
                   {en:"reform",es:"reforma"},{en:"crisis",es:"crisis"} ] },
        { id: "comet", name: "El cometa", icon: "bolt", hint: "Adjetivos avanzados",
          cards: [ {en:"inevitable",es:"inevitable"},{en:"ambiguous",es:"ambiguo"},{en:"coherent",es:"coherente"},{en:"profound",es:"profundo"},
                   {en:"subtle",es:"sutil"},{en:"robust",es:"robusto"},{en:"feasible",es:"viable"},{en:"redundant",es:"redundante"},
                   {en:"prevalent",es:"predominante"},{en:"plausible",es:"plausible"} ] }
      ]
    },
    C2: {
      structure: "castle", name: "El Castillo del Saber",
      intro: "Cruza el portón del castillo: aquí se domina el matiz y el registro culto.",
      branches: [
        { id: "gate", name: "El portón", icon: "crown", hint: "Matiz", practice: "lvl-c2-vocab-nuance",
          cards: [ {en:"nuance",es:"matiz"},{en:"eloquence",es:"elocuencia"},{en:"subtlety",es:"sutileza"},{en:"connotation",es:"connotación"},
                   {en:"rhetoric",es:"retórica"},{en:"discourse",es:"discurso"},{en:"premise",es:"premisa"},{en:"candor",es:"franqueza"},
                   {en:"allusion",es:"alusión"},{en:"irony",es:"ironía"},{en:"paradox",es:"paradoja"},{en:"undertone",es:"trasfondo"} ] },
        { id: "throne", name: "El salón del trono", icon: "scepter", hint: "Verbos avanzados",
          cards: [ {en:"to epitomize",es:"personificar"},{en:"to reconcile",es:"reconciliar"},{en:"to discern",es:"discernir"},{en:"to substantiate",es:"fundamentar"},
                   {en:"to delineate",es:"delinear"},{en:"to encompass",es:"abarcar"},{en:"to scrutinize",es:"escudriñar"},{en:"to elucidate",es:"elucidar"},
                   {en:"to relinquish",es:"renunciar"},{en:"to perpetuate",es:"perpetuar"},{en:"to consolidate",es:"consolidar"} ] },
        { id: "vault", name: "La bóveda", icon: "gem", hint: "Modismos",
          cards: [ {en:"to hit the nail on the head",es:"dar en el clavo"},{en:"to bite the bullet",es:"apechugar"},
                   {en:"a blessing in disguise",es:"no hay mal que por bien no venga"},{en:"to cut corners",es:"hacer las cosas a medias"},
                   {en:"to beat around the bush",es:"andarse por las ramas"},{en:"the last straw",es:"la gota que colma el vaso"},
                   {en:"to break the ice",es:"romper el hielo"},{en:"to cost an arm and a leg",es:"costar un ojo de la cara"} ] },
        { id: "spire", name: "La aguja", icon: "feather", hint: "Registro culto",
          cards: [ {en:"notwithstanding",es:"no obstante"},{en:"henceforth",es:"de ahora en adelante"},{en:"albeit",es:"aunque"},
                   {en:"ergo",es:"por lo tanto"},{en:"hitherto",es:"hasta ahora"},{en:"vis-à-vis",es:"respecto a"},
                   {en:"hereby",es:"por la presente"},{en:"thereby",es:"de ese modo"},{en:"wherein",es:"en donde"},{en:"insofar as",es:"en la medida en que"} ] },
        { id: "sanctum", name: "El sagrario", icon: "scroll", hint: "Sustantivos cultos",
          cards: [ {en:"erudition",es:"erudición"},{en:"sagacity",es:"sagacidad"},{en:"prudence",es:"prudencia"},{en:"integrity",es:"integridad"},
                   {en:"tenacity",es:"tenacidad"},{en:"humility",es:"humildad"},{en:"empathy",es:"empatía"},{en:"resilience",es:"resiliencia"},
                   {en:"wisdom",es:"sabiduría"},{en:"virtue",es:"virtud"} ] },
        { id: "courtyard", name: "El patio de armas", icon: "crown", hint: "Adjetivos de registro",
          cards: [ {en:"meticulous",es:"meticuloso"},{en:"astute",es:"astuto"},{en:"succinct",es:"sucinto"},{en:"lucid",es:"lúcido"},
                   {en:"cogent",es:"convincente"},{en:"articulate",es:"articulado"},{en:"scrupulous",es:"escrupuloso"},{en:"arduous",es:"arduo"},
                   {en:"candid",es:"cándido"},{en:"eloquent",es:"elocuente"} ] }
      ]
    }
  };

  var LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"];

  function normLevel(lv) {
    lv = ("" + (lv || "")).toUpperCase().replace("+", "").trim();
    if (LEVELS.indexOf(lv) >= 0) return lv;
    var c = lv.charAt(0);
    return c === "A" ? "A1" : c === "B" ? "B1" : c === "C" ? "C1" : "A1";
  }
  function isVocabLesson(l) {
    if (!l) return false;
    if (l.skill === "vocab") return true;
    var t = ("" + (l.track || "") + " " + (l.topic || "")).toLowerCase();
    return t.indexOf("vocab") >= 0;
  }
  function clean(s) { return ("" + (s == null ? "" : s)).trim(); }
  function keyOf(en) { return clean(en).toLowerCase().replace(/^to\s+/, ""); }

  /* extrae pares EN→ES de los ejercicios "matching" de una lección */
  function pairsFrom(l) {
    var out = [];
    (l.exercises || []).forEach(function (ex) {
      if (ex && ex.type === "matching" && ex.pairs) {
        ex.pairs.forEach(function (p) {
          var en = clean(p.l), es = clean(p.r);
          /* el lado inglés casi siempre es ASCII; descarta pares invertidos o vacíos */
          if (en && es && /[a-z]/i.test(en)) out.push({ en: en, es: es });
        });
      }
    });
    return out;
  }

  /* cosecha por nivel todas las palabras de lecciones de vocabulario */
  function harvest(L, ORDER) {
    var byLevel = {};
    LEVELS.forEach(function (lv) { byLevel[lv] = []; });
    (ORDER || Object.keys(L || {})).forEach(function (id) {
      var l = L[id]; if (!l || !isVocabLesson(l)) return;
      var lv = normLevel(l.level);
      pairsFrom(l).forEach(function (p) { byLevel[lv].push(p); });
    });
    return byLevel;
  }

  function build(L, ORDER) {
    L = L || {}; ORDER = ORDER || Object.keys(L);
    var harvested = harvest(L, ORDER);
    var dens = {};
    LEVELS.forEach(function (lv) {
      var src = DENS[lv]; if (!src) return;
      /* clona ramas curadas y reúne claves ya usadas para deduplicar */
      var used = {}, branches = src.branches.map(function (b) {
        var cards = b.cards.map(function (c) {
          used[keyOf(c.en)] = 1; return { en: c.en, es: c.es };
        });
        return { id: b.id, name: b.name, icon: b.icon, hint: b.hint, practice: b.practice, curated: true, cards: cards };
      });
      /* añade palabras auto-extraídas no repetidas, en bloques de 12 */
      var extra = [], seen = {};
      harvested[lv].forEach(function (p) {
        var k = keyOf(p.en);
        if (used[k] || seen[k]) return;
        seen[k] = 1; extra.push(p);
      });
      var chunk = 12, part = 1;
      for (var i = 0; i < extra.length; i += chunk) {
        var slice = extra.slice(i, i + chunk);
        if (slice.length < 4 && branches.length) {            // resto pequeño: cuélgalo de la última rama extra
          var last = branches[branches.length - 1];
          if (!last.curated) { last.cards = last.cards.concat(slice); continue; }
        }
        branches.push({
          id: "more-" + part, name: extra.length > chunk ? ("Más palabras · " + part) : "Más palabras",
          icon: "spark", hint: "Del mundo " + lv, curated: false, cards: slice
        });
        part++;
      }
      dens[lv] = { level: lv, structure: src.structure, name: src.name, intro: src.intro, branches: branches };
    });
    return dens;
  }

  return { build: build, DENS: DENS, LEVELS: LEVELS };
})();
