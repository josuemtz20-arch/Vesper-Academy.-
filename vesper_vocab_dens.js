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
                   {en:"salt",es:"sal"},{en:"sugar",es:"azúcar"},{en:"tea",es:"té"},{en:"juice",es:"zumo"},
                   {en:"meat",es:"carne"},{en:"fruit",es:"fruta"},{en:"plate",es:"plato"},{en:"cup",es:"taza"},
                   {en:"spoon",es:"cuchara"},{en:"fork",es:"tenedor"},{en:"knife",es:"cuchillo"},{en:"glass",es:"vaso"} ] },
        { id: "living", name: "La sala", icon: "sofa", hint: "Objetos de casa", practice: "lvl-a1-vocab-house",
          cards: [ {en:"table",es:"mesa"},{en:"chair",es:"silla"},{en:"door",es:"puerta"},{en:"window",es:"ventana"},
                   {en:"lamp",es:"lámpara"},{en:"book",es:"libro"},{en:"clock",es:"reloj"},{en:"key",es:"llave"},
                   {en:"sofa",es:"sofá"},{en:"wall",es:"pared"},{en:"floor",es:"suelo"},{en:"picture",es:"cuadro"},
                   {en:"shelf",es:"estante"},{en:"rug",es:"alfombra"},{en:"television",es:"televisión"},{en:"phone",es:"teléfono"},
                   {en:"curtain",es:"cortina"},{en:"cushion",es:"cojín"},{en:"candle",es:"vela"},{en:"vase",es:"jarrón"},
                   {en:"ceiling",es:"techo"},{en:"stairs",es:"escaleras"} ] },
        { id: "bedroom", name: "El dormitorio", icon: "bed", hint: "Ropa y descanso", practice: "lvl-a1-vocab-everyday",
          cards: [ {en:"bed",es:"cama"},{en:"pillow",es:"almohada"},{en:"shirt",es:"camisa"},{en:"shoes",es:"zapatos"},
                   {en:"dress",es:"vestido"},{en:"hat",es:"sombrero"},{en:"mirror",es:"espejo"},{en:"blanket",es:"manta"},
                   {en:"sock",es:"calcetín"},{en:"coat",es:"abrigo"},{en:"sweater",es:"suéter"},{en:"drawer",es:"cajón"},
                   {en:"trousers",es:"pantalones"},{en:"skirt",es:"falda"},{en:"glove",es:"guante"},{en:"scarf",es:"bufanda"},
                   {en:"belt",es:"cinturón"},{en:"button",es:"botón"},{en:"closet",es:"armario"},{en:"sheet",es:"sábana"} ] },
        { id: "bathroom", name: "El baño", icon: "drop", hint: "Aseo diario",
          cards: [ {en:"soap",es:"jabón"},{en:"towel",es:"toalla"},{en:"toothbrush",es:"cepillo de dientes"},{en:"shower",es:"ducha"},
                   {en:"sink",es:"lavabo"},{en:"comb",es:"peine"},{en:"toilet",es:"inodoro"},{en:"brush",es:"cepillo"},
                   {en:"sponge",es:"esponja"},{en:"tap",es:"grifo"},{en:"mirror",es:"espejo"},{en:"shampoo",es:"champú"},
                   {en:"razor",es:"navaja"},{en:"bath",es:"bañera"},{en:"tissue",es:"pañuelo"},{en:"toothpaste",es:"pasta de dientes"} ] },
        { id: "garden", name: "El jardín", icon: "leaf", hint: "Animales y naturaleza", practice: "lvl-a1-vocab-animals",
          cards: [ {en:"dog",es:"perro"},{en:"cat",es:"gato"},{en:"bird",es:"pájaro"},{en:"tree",es:"árbol"},
                   {en:"flower",es:"flor"},{en:"sun",es:"sol"},{en:"rain",es:"lluvia"},{en:"grass",es:"hierba"},
                   {en:"bee",es:"abeja"},{en:"cloud",es:"nube"},{en:"sky",es:"cielo"},{en:"butterfly",es:"mariposa"},
                   {en:"horse",es:"caballo"},{en:"rabbit",es:"conejo"},{en:"duck",es:"pato"},{en:"frog",es:"rana"},
                   {en:"leaf",es:"hoja"},{en:"seed",es:"semilla"},{en:"snail",es:"caracol"},{en:"moon",es:"luna"} ] },
        { id: "family", name: "La familia", icon: "family", hint: "Personas y parentesco",
          cards: [ {en:"mother",es:"madre"},{en:"father",es:"padre"},{en:"sister",es:"hermana"},{en:"brother",es:"hermano"},
                   {en:"baby",es:"bebé"},{en:"friend",es:"amigo"},{en:"son",es:"hijo"},{en:"daughter",es:"hija"},
                   {en:"grandmother",es:"abuela"},{en:"grandfather",es:"abuelo"},{en:"aunt",es:"tía"},{en:"uncle",es:"tío"},
                   {en:"cousin",es:"primo"},{en:"husband",es:"esposo"},{en:"wife",es:"esposa"},{en:"child",es:"niño"},
                   {en:"parents",es:"padres"},{en:"neighbor",es:"vecino"} ] }
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
                   {en:"far",es:"lejos"},{en:"corner",es:"esquina"},{en:"straight",es:"recto"},{en:"to turn",es:"girar"},
                   {en:"plane",es:"avión"},{en:"car",es:"coche"},{en:"bike",es:"bicicleta"},{en:"boat",es:"barco"},
                   {en:"east",es:"este"},{en:"west",es:"oeste"} ] },
        { id: "market", name: "El mercado", icon: "bag", hint: "Compras y ropa", practice: "lvl-a2-vocab-clothes",
          cards: [ {en:"money",es:"dinero"},{en:"price",es:"precio"},{en:"shop",es:"tienda"},{en:"cheap",es:"barato"},
                   {en:"expensive",es:"caro"},{en:"size",es:"talla"},{en:"jacket",es:"chaqueta"},{en:"trousers",es:"pantalones"},
                   {en:"sale",es:"rebaja"},{en:"coin",es:"moneda"},{en:"change",es:"cambio"},{en:"receipt",es:"recibo"},
                   {en:"wallet",es:"cartera"},{en:"to buy",es:"comprar"},{en:"to sell",es:"vender"},{en:"to pay",es:"pagar"},
                   {en:"customer",es:"cliente"},{en:"market",es:"mercado"},{en:"bargain",es:"ganga"},{en:"basket",es:"cesta"} ] },
        { id: "spring", name: "El manantial", icon: "drop", hint: "Naturaleza",
          cards: [ {en:"river",es:"río"},{en:"mountain",es:"montaña"},{en:"forest",es:"bosque"},{en:"stone",es:"piedra"},
                   {en:"path",es:"sendero"},{en:"cave",es:"cueva"},{en:"leaf",es:"hoja"},{en:"wind",es:"viento"},
                   {en:"lake",es:"lago"},{en:"hill",es:"colina"},{en:"valley",es:"valle"},{en:"cliff",es:"acantilado"},
                   {en:"mud",es:"barro"},{en:"sand",es:"arena"},{en:"waterfall",es:"cascada"},{en:"branch",es:"rama"},
                   {en:"root",es:"raíz"},{en:"island",es:"isla"},{en:"sea",es:"mar"},{en:"shore",es:"orilla"} ] },
        { id: "depths", name: "Las profundidades", icon: "bolt", hint: "Verbos de movimiento", practice: "lvl-a2-vocab-routines",
          cards: [ {en:"to go",es:"ir"},{en:"to come",es:"venir"},{en:"to find",es:"encontrar"},{en:"to carry",es:"llevar"},
                   {en:"to climb",es:"subir"},{en:"to cross",es:"cruzar"},{en:"to rest",es:"descansar"},{en:"to arrive",es:"llegar"},
                   {en:"to follow",es:"seguir"},{en:"to return",es:"regresar"},{en:"to escape",es:"escapar"},{en:"to explore",es:"explorar"},
                   {en:"to jump",es:"saltar"},{en:"to run",es:"correr"},{en:"to walk",es:"caminar"},{en:"to fall",es:"caer"},
                   {en:"to push",es:"empujar"},{en:"to pull",es:"tirar"},{en:"to enter",es:"entrar"},{en:"to leave",es:"salir"} ] },
        { id: "camp", name: "El campamento", icon: "flame", hint: "Cuerpo y salud",
          cards: [ {en:"tired",es:"cansado"},{en:"hungry",es:"hambriento"},{en:"thirsty",es:"sediento"},{en:"sick",es:"enfermo"},
                   {en:"doctor",es:"médico"},{en:"medicine",es:"medicina"},{en:"fire",es:"fuego"},{en:"tent",es:"tienda de campaña"},
                   {en:"torch",es:"linterna"},{en:"blanket",es:"manta"},{en:"pain",es:"dolor"},{en:"fever",es:"fiebre"},
                   {en:"rest",es:"descanso"},{en:"sleep",es:"sueño"},{en:"healthy",es:"sano"},{en:"strong",es:"fuerte"},
                   {en:"weak",es:"débil"},{en:"cold",es:"frío"} ] },
        { id: "echoes", name: "Los ecos", icon: "spark", hint: "Tiempo y rutina",
          cards: [ {en:"morning",es:"mañana"},{en:"night",es:"noche"},{en:"yesterday",es:"ayer"},{en:"week",es:"semana"},
                   {en:"month",es:"mes"},{en:"hour",es:"hora"},{en:"early",es:"temprano"},{en:"late",es:"tarde"},
                   {en:"always",es:"siempre"},{en:"never",es:"nunca"},{en:"today",es:"hoy"},{en:"tomorrow",es:"mañana"},
                   {en:"often",es:"a menudo"},{en:"sometimes",es:"a veces"},{en:"year",es:"año"},{en:"minute",es:"minuto"},
                   {en:"weekend",es:"fin de semana"},{en:"soon",es:"pronto"} ] }
      ]
    },
    B1: {
      structure: "harbor", name: "El Puerto del Horizonte",
      intro: "Atraca en cada muelle del puerto y carga el vocabulario del mundo moderno.",
      branches: [
        { id: "dock", name: "El muelle", icon: "anchor", hint: "Ciudad",
          cards: [ {en:"street",es:"calle",def:"a public road in a town, with buildings along the sides"},
                   {en:"building",es:"edificio",def:"a structure with walls and a roof, like a house or office"},
                   {en:"bridge",es:"puente",def:"a structure built over a river or road so people can cross"},
                   {en:"traffic",es:"tráfico",def:"the cars and vehicles moving along the roads"},
                   {en:"corner",es:"esquina",def:"the point where two streets or two edges meet"},
                   {en:"square",es:"plaza",def:"an open public space in a town, often with shops around it"},
                   {en:"sidewalk",es:"acera",def:"the path beside a road where people walk"},
                   {en:"neighbor",es:"vecino",def:"a person who lives next to or near you"},
                   {en:"crowd",es:"multitud",def:"a large group of people gathered in one place"},
                   {en:"suburb",es:"afueras",def:"a residential area on the edge of a city"},
                   {en:"district",es:"distrito",def:"a particular area or part of a city or country"},
                   {en:"avenue",es:"avenida",def:"a wide street, often lined with trees"},
                   {en:"crossing",es:"cruce",def:"a place where you can safely cross the street"},
                   {en:"signal",es:"semáforo",def:"a traffic light that tells cars and people when to stop or go"},
                   {en:"pavement",es:"pavimento",def:"the hard surface of a road or path"},
                   {en:"landmark",es:"punto de referencia",def:"a famous place that is easy to recognize"},
                   {en:"downtown",es:"centro",def:"the central, busiest part of a city"},
                   {en:"resident",es:"residente",def:"a person who lives in a particular place"} ] },
        { id: "lighthouse", name: "El faro", icon: "flame", hint: "Medio ambiente", practice: "lvl-b1-vocab-environment",
          cards: [ {en:"weather",es:"tiempo",def:"the conditions outside, like sun, rain or wind, at a certain time"},
                   {en:"climate",es:"clima",def:"the usual weather in a place over a long period"},
                   {en:"pollution",es:"contaminación",def:"harmful dirt or chemicals in the air, water or land"},
                   {en:"energy",es:"energía",def:"the power used to make machines work or give heat and light"},
                   {en:"waste",es:"residuos",def:"things you throw away because they are no longer useful"},
                   {en:"to recycle",es:"reciclar",def:"to treat used things so they can be used again"},
                   {en:"planet",es:"planeta",def:"a large round object in space that moves around a star, like Earth"},
                   {en:"nature",es:"naturaleza",def:"all the plants, animals and land not made by people"},
                   {en:"drought",es:"sequía",def:"a long period with little or no rain"},
                   {en:"flood",es:"inundación",def:"a large amount of water covering land that is usually dry"},
                   {en:"fuel",es:"combustible",def:"material like gas or oil that is burned to produce energy"},
                   {en:"wildlife",es:"fauna",def:"the wild animals and plants living in nature"},
                   {en:"forest",es:"bosque",def:"a large area covered with trees"},
                   {en:"ocean",es:"océano",def:"a very large area of salt water that covers much of the Earth"},
                   {en:"species",es:"especie",def:"a group of animals or plants of the same kind"},
                   {en:"to pollute",es:"contaminar",def:"to make air, water or land dirty and harmful"},
                   {en:"renewable",es:"renovable",def:"able to be replaced naturally, like wind or solar power"},
                   {en:"emission",es:"emisión",def:"gas or another substance sent out into the air"} ] },
        { id: "warehouse", name: "El almacén", icon: "globe", hint: "Viajes y cultura", practice: "lvl-b1-vocab-travel",
          cards: [ {en:"culture",es:"cultura",def:"the way of life, beliefs and customs of a group of people"},
                   {en:"language",es:"idioma",def:"the system of words people use to speak and write"},
                   {en:"custom",es:"costumbre",def:"a traditional way of doing something in a society"},
                   {en:"journey",es:"viaje",def:"an act of travelling from one place to another"},
                   {en:"abroad",es:"extranjero",def:"in or to a foreign country"},
                   {en:"tourist",es:"turista",def:"a person who travels and visits places for pleasure"},
                   {en:"souvenir",es:"recuerdo",def:"an object you keep to remember a place or trip"},
                   {en:"border",es:"frontera",def:"the line that divides two countries"},
                   {en:"passport",es:"pasaporte",def:"an official document you need to travel between countries"},
                   {en:"luggage",es:"equipaje",def:"the bags and cases you take when you travel"},
                   {en:"heritage",es:"patrimonio",def:"traditions and culture passed down from the past"},
                   {en:"tradition",es:"tradición",def:"a custom passed from one generation to the next"},
                   {en:"festival",es:"festival",def:"a special time when people celebrate, often with events"},
                   {en:"landscape",es:"paisaje",def:"the natural features of an area of land you can see"},
                   {en:"local",es:"local",def:"relating to the area where you live or are"},
                   {en:"foreign",es:"extranjero",def:"belonging to or coming from another country"},
                   {en:"guide",es:"guía",def:"a person who shows tourists around a place"},
                   {en:"sightseeing",es:"turismo",def:"visiting interesting places as a tourist"} ] },
        { id: "deck", name: "La cubierta", icon: "chat", hint: "Opiniones",
          cards: [ {en:"opinion",es:"opinión",def:"what you think or believe about something"},
                   {en:"advice",es:"consejo",def:"an idea you offer to help someone decide what to do"},
                   {en:"decision",es:"decisión",def:"a choice you make after thinking about it"},
                   {en:"reason",es:"razón",def:"the cause or explanation for something"},
                   {en:"choice",es:"elección",def:"the act of picking one thing among several"},
                   {en:"to agree",es:"estar de acuerdo",def:"to have the same opinion as someone"},
                   {en:"doubt",es:"duda",def:"a feeling of not being sure about something"},
                   {en:"to suggest",es:"sugerir",def:"to offer an idea or plan for others to consider"},
                   {en:"to refuse",es:"rechazar",def:"to say firmly that you will not do or accept something"},
                   {en:"to admit",es:"admitir",def:"to accept that something is true, often unwillingly"},
                   {en:"to disagree",es:"discrepar",def:"to have a different opinion from someone"},
                   {en:"point of view",es:"punto de vista",def:"a particular way of thinking about something"},
                   {en:"to believe",es:"creer",def:"to feel sure that something is true"},
                   {en:"to argue",es:"discutir",def:"to give reasons for or against something, or to quarrel"},
                   {en:"fair",es:"justo",def:"treating everyone equally and in the right way"},
                   {en:"true",es:"verdadero",def:"based on facts; not false"} ] },
        { id: "bridge", name: "El puente de mando", icon: "link", hint: "Tecnología",
          cards: [ {en:"screen",es:"pantalla",def:"the flat surface of a device where images and text appear"},
                   {en:"device",es:"dispositivo",def:"a machine or tool made for a particular purpose"},
                   {en:"network",es:"red",def:"a system of connected computers or people"},
                   {en:"password",es:"contraseña",def:"a secret word or code you use to access something"},
                   {en:"to download",es:"descargar",def:"to copy data from the internet onto your device"},
                   {en:"file",es:"archivo",def:"a collection of data stored under one name on a computer"},
                   {en:"to update",es:"actualizar",def:"to add the latest information or make something more modern"},
                   {en:"data",es:"datos",def:"facts and information, often stored or used by computers"},
                   {en:"software",es:"programa",def:"the programs that tell a computer what to do"},
                   {en:"online",es:"en línea",def:"connected to the internet"},
                   {en:"app",es:"aplicación",def:"a program you use on a phone or computer"},
                   {en:"keyboard",es:"teclado",def:"the set of keys you press to type on a device"},
                   {en:"browser",es:"navegador",def:"a program used to look at websites on the internet"},
                   {en:"to install",es:"instalar",def:"to add a program or device so it is ready to use"},
                   {en:"link",es:"enlace",def:"text or an image you click to go to another page"},
                   {en:"settings",es:"ajustes",def:"the options you change to control how a device works"} ] },
        { id: "galley", name: "La bodega", icon: "bolt", hint: "Deporte y salud",
          cards: [ {en:"exercise",es:"ejercicio",def:"physical activity you do to stay fit and healthy"},
                   {en:"training",es:"entrenamiento",def:"practice and preparation to improve a skill or fitness"},
                   {en:"team",es:"equipo",def:"a group of people who play or work together"},
                   {en:"match",es:"partido",def:"a sports game between two players or teams"},
                   {en:"goal",es:"gol",def:"a point scored in sports like football; also an aim"},
                   {en:"fit",es:"en forma",def:"healthy and strong, especially from exercise"},
                   {en:"injury",es:"lesión",def:"harm or damage done to your body"},
                   {en:"coach",es:"entrenador",def:"a person who trains a sports team or player"},
                   {en:"score",es:"marcador",def:"the number of points each side has in a game"},
                   {en:"race",es:"carrera",def:"a competition to see who is fastest"},
                   {en:"strength",es:"fuerza",def:"the quality of being physically strong"},
                   {en:"workout",es:"entrenamiento",def:"a session of physical exercise"},
                   {en:"to stretch",es:"estirar",def:"to extend your muscles to make them longer and looser"},
                   {en:"victory",es:"victoria",def:"a win in a game, battle or competition"},
                   {en:"referee",es:"árbitro",def:"the official who controls a match and applies the rules"},
                   {en:"stadium",es:"estadio",def:"a large sports ground with seats for spectators"} ] }
      ]
    },
    B2: {
      structure: "tower", name: "La Torre del Saber",
      intro: "Sube piso a piso por la torre: cada nivel domina un registro más formal.",
      branches: [
        { id: "hall", name: "El salón", icon: "briefcase", hint: "Negocios",
          cards: [ {en:"meeting",es:"reunión",def:"an event where people gather to discuss work or ideas"},
                   {en:"deadline",es:"fecha límite",def:"the latest time by which something must be finished"},
                   {en:"budget",es:"presupuesto",def:"a plan of how much money you can spend"},
                   {en:"profit",es:"beneficio",def:"the money you gain after the costs are paid"},
                   {en:"client",es:"cliente",def:"a person or company that pays for a service"},
                   {en:"report",es:"informe",def:"a written document that gives information about something"},
                   {en:"manager",es:"gerente",def:"a person who leads a team or runs part of a business"},
                   {en:"contract",es:"contrato",def:"a formal written agreement between two or more parties"},
                   {en:"invoice",es:"factura",def:"a bill listing goods or services and the amount owed"},
                   {en:"deal",es:"acuerdo",def:"a business agreement between two or more sides"},
                   {en:"revenue",es:"ingresos",def:"the total income a business earns"},
                   {en:"supply",es:"suministro",def:"the amount of a product available to buy"},
                   {en:"demand",es:"demanda",def:"how much of a product customers want to buy"},
                   {en:"stakeholder",es:"parte interesada",def:"anyone with an interest in a business or project"},
                   {en:"strategy",es:"estrategia",def:"a long-term plan to reach a goal"},
                   {en:"merger",es:"fusión",def:"the joining of two companies into one"},
                   {en:"shareholder",es:"accionista",def:"a person who owns part of a company"},
                   {en:"turnover",es:"facturación",def:"the total sales of a business over a period"} ] },
        { id: "library", name: "La biblioteca", icon: "book", hint: "Académico",
          cards: [ {en:"research",es:"investigación",def:"careful study to discover new facts or information"},
                   {en:"evidence",es:"evidencia",def:"facts that show whether something is true"},
                   {en:"theory",es:"teoría",def:"an idea that explains how or why something happens"},
                   {en:"method",es:"método",def:"a planned, organized way of doing something"},
                   {en:"source",es:"fuente",def:"a place or text where information comes from"},
                   {en:"summary",es:"resumen",def:"a short statement of the main points"},
                   {en:"argument",es:"argumento",def:"a set of reasons given to support an idea"},
                   {en:"conclusion",es:"conclusión",def:"the final judgement reached after thinking it through"},
                   {en:"analysis",es:"análisis",def:"a detailed study of something to understand it"},
                   {en:"citation",es:"cita",def:"a reference to the source of information used"},
                   {en:"finding",es:"hallazgo",def:"a fact or result discovered through research"},
                   {en:"gap",es:"vacío",def:"a missing part where more knowledge is needed"},
                   {en:"hypothesis",es:"hipótesis",def:"an idea suggested as a starting point for testing"},
                   {en:"data",es:"datos",def:"facts and figures collected for analysis"},
                   {en:"survey",es:"encuesta",def:"a set of questions used to gather opinions or facts"},
                   {en:"abstract",es:"resumen",def:"a short summary at the start of an academic paper"},
                   {en:"peer review",es:"revisión por pares",def:"the checking of research by other experts before publishing"},
                   {en:"journal",es:"revista científica",def:"a regular publication of academic articles"} ] },
        { id: "workshop", name: "El taller", icon: "gear", hint: "Verbos de trabajo",
          cards: [ {en:"to manage",es:"gestionar",def:"to be in charge of and control something"},
                   {en:"to achieve",es:"lograr",def:"to succeed in reaching a goal through effort"},
                   {en:"to improve",es:"mejorar",def:"to make or become better"},
                   {en:"to provide",es:"proporcionar",def:"to give or supply what is needed"},
                   {en:"to require",es:"requerir",def:"to need something, or to make it necessary"},
                   {en:"to reduce",es:"reducir",def:"to make something smaller or less"},
                   {en:"to increase",es:"aumentar",def:"to make or become greater in size or amount"},
                   {en:"to handle",es:"manejar",def:"to deal with a task or situation"},
                   {en:"to negotiate",es:"negociar",def:"to discuss something in order to reach an agreement"},
                   {en:"to launch",es:"lanzar",def:"to start or introduce something new, like a product"},
                   {en:"to forecast",es:"pronosticar",def:"to predict what will happen in the future"},
                   {en:"to outsource",es:"subcontratar",def:"to give work to an outside company"},
                   {en:"to allocate",es:"asignar",def:"to give a share of money or resources for a purpose"},
                   {en:"to streamline",es:"agilizar",def:"to make a process simpler and more efficient"},
                   {en:"to oversee",es:"supervisar",def:"to watch and direct work to make sure it is done well"},
                   {en:"to implement",es:"implementar",def:"to put a plan or decision into action"},
                   {en:"to delegate",es:"delegar",def:"to give a task to someone else to do"},
                   {en:"to assess",es:"evaluar",def:"to judge the value or quality of something"} ] },
        { id: "balcony", name: "El balcón", icon: "link", hint: "Conectores", practice: "lvl-b2-vocab-collocations",
          cards: [ {en:"however",es:"sin embargo",def:"used to add a contrasting idea; similar to 'but'"},
                   {en:"therefore",es:"por lo tanto",def:"for that reason; as a result"},
                   {en:"although",es:"aunque",def:"used to introduce a contrast; 'even though'"},
                   {en:"moreover",es:"además",def:"in addition to what has been said; 'also'"},
                   {en:"whereas",es:"mientras que",def:"used to compare two different facts"},
                   {en:"despite",es:"a pesar de",def:"without being affected by; 'in spite of'"},
                   {en:"thus",es:"así",def:"as a result; in this way"},
                   {en:"nevertheless",es:"no obstante",def:"in spite of that; still"},
                   {en:"otherwise",es:"de lo contrario",def:"if not; or else"},
                   {en:"meanwhile",es:"mientras tanto",def:"at the same time; while something else happens"},
                   {en:"consequently",es:"en consecuencia",def:"as a result of something"},
                   {en:"furthermore",es:"además",def:"in addition; what is more"},
                   {en:"in addition",es:"adicionalmente",def:"as an extra point; also"},
                   {en:"on the other hand",es:"por otro lado",def:"used to give a different or opposite view"},
                   {en:"as a result",es:"como resultado",def:"because of this; consequently"},
                   {en:"for instance",es:"por ejemplo",def:"used to give an example; 'for example'"} ] },
        { id: "vault", name: "La bóveda", icon: "gem", hint: "Finanzas",
          cards: [ {en:"loan",es:"préstamo",def:"money that is borrowed and must be paid back"},
                   {en:"interest",es:"interés",def:"the extra money paid for borrowing, or earned on savings"},
                   {en:"investment",es:"inversión",def:"money put into something to gain a profit later"},
                   {en:"tax",es:"impuesto",def:"money people pay to the government"},
                   {en:"savings",es:"ahorros",def:"money kept aside for future use"},
                   {en:"debt",es:"deuda",def:"money that you owe to someone"},
                   {en:"mortgage",es:"hipoteca",def:"a loan used to buy a house, paid back over years"},
                   {en:"account",es:"cuenta",def:"an arrangement to keep money at a bank"},
                   {en:"currency",es:"divisa",def:"the money used in a particular country"},
                   {en:"asset",es:"activo",def:"something valuable that a person or company owns"},
                   {en:"budget",es:"presupuesto",def:"a plan for how to spend money"},
                   {en:"income",es:"ingreso",def:"the money you receive, usually from work"},
                   {en:"expense",es:"gasto",def:"money spent on something"},
                   {en:"profit",es:"beneficio",def:"the financial gain after costs are subtracted"},
                   {en:"wealth",es:"riqueza",def:"a large amount of money and valuable possessions"},
                   {en:"insurance",es:"seguro",def:"a payment plan that protects you against future loss"} ] },
        { id: "studio", name: "El estudio", icon: "star", hint: "Vida laboral",
          cards: [ {en:"colleague",es:"colega",def:"a person you work with"},
                   {en:"career",es:"carrera",def:"the series of jobs a person has over their working life"},
                   {en:"salary",es:"salario",def:"fixed money paid regularly for a job"},
                   {en:"promotion",es:"ascenso",def:"a move to a higher position at work"},
                   {en:"interview",es:"entrevista",def:"a formal meeting to decide if someone is right for a job"},
                   {en:"resume",es:"currículum",def:"a document listing your education and work experience"},
                   {en:"skill",es:"habilidad",def:"the ability to do something well"},
                   {en:"workload",es:"carga de trabajo",def:"the amount of work a person has to do"},
                   {en:"overtime",es:"horas extra",def:"extra hours worked beyond the normal time"},
                   {en:"leave",es:"permiso",def:"time away from work that is allowed"},
                   {en:"deadline",es:"fecha límite",def:"the time by which work must be done"},
                   {en:"teamwork",es:"trabajo en equipo",def:"the combined effort of a group working well together"},
                   {en:"raise",es:"aumento",def:"an increase in your salary"},
                   {en:"to resign",es:"dimitir",def:"to officially leave your job"},
                   {en:"to hire",es:"contratar",def:"to give someone a job"},
                   {en:"benefits",es:"prestaciones",def:"extra advantages from a job, like health care"} ] }
      ]
    },
    C1: {
      structure: "observatory", name: "El Observatorio del Firmamento",
      intro: "Apunta el telescopio a las ideas abstractas que definen el nivel avanzado.",
      branches: [
        { id: "dome", name: "La cúpula", icon: "star", hint: "Ideas abstractas", practice: "lvl-c1-vocab-trends",
          cards: [ {en:"insight",es:"perspicacia",def:"a deep and clear understanding of something"},
                   {en:"framework",es:"marco",def:"a basic structure of ideas used to plan or decide"},
                   {en:"perception",es:"percepción",def:"the way you notice or interpret something"},
                   {en:"assumption",es:"suposición",def:"something accepted as true without proof"},
                   {en:"implication",es:"implicación",def:"a likely effect or result that is not stated directly"},
                   {en:"perspective",es:"perspectiva",def:"a particular way of viewing things"},
                   {en:"notion",es:"noción",def:"an idea or belief about something"},
                   {en:"paradigm",es:"paradigma",def:"a typical model or pattern of thought"},
                   {en:"rationale",es:"fundamento",def:"the reasons or logic behind a decision"},
                   {en:"concept",es:"concepto",def:"an abstract idea or general notion"},
                   {en:"premise",es:"premisa",def:"a statement assumed true as the basis of an argument"},
                   {en:"inference",es:"inferencia",def:"a conclusion reached from evidence and reasoning"},
                   {en:"abstraction",es:"abstracción",def:"an idea considered apart from concrete examples"},
                   {en:"construct",es:"constructo",def:"an idea or theory built from smaller parts"} ] },
        { id: "telescope", name: "El telescopio", icon: "eye", hint: "Verbos académicos",
          cards: [ {en:"to assess",es:"evaluar",def:"to evaluate the nature or quality of something"},
                   {en:"to derive",es:"derivar",def:"to obtain something from a particular source"},
                   {en:"to convey",es:"transmitir",def:"to communicate an idea or feeling"},
                   {en:"to undermine",es:"socavar",def:"to weaken something gradually"},
                   {en:"to foster",es:"fomentar",def:"to encourage the development of something"},
                   {en:"to mitigate",es:"mitigar",def:"to make something less severe or harmful"},
                   {en:"to highlight",es:"resaltar",def:"to draw attention to something important"},
                   {en:"to underpin",es:"sustentar",def:"to support or form the basis of something"},
                   {en:"to advocate",es:"abogar",def:"to publicly support a cause or idea"},
                   {en:"to refute",es:"refutar",def:"to prove that a statement is wrong"},
                   {en:"to entail",es:"conllevar",def:"to involve something as a necessary part"},
                   {en:"to contend",es:"sostener",def:"to argue firmly that something is the case"},
                   {en:"to discern",es:"discernir",def:"to recognize or perceive something clearly"},
                   {en:"to substantiate",es:"fundamentar",def:"to provide evidence to support a claim"},
                   {en:"to elicit",es:"suscitar",def:"to draw out a response or reaction"},
                   {en:"to reconcile",es:"conciliar",def:"to make two different ideas agree"},
                   {en:"to scrutinize",es:"escudriñar",def:"to examine something closely and critically"},
                   {en:"to deduce",es:"deducir",def:"to reach a conclusion by reasoning"} ] },
        { id: "archive", name: "El archivo", icon: "scroll", hint: "Sustantivos formales",
          cards: [ {en:"criterion",es:"criterio",def:"a standard used to judge or decide something"},
                   {en:"phenomenon",es:"fenómeno",def:"a fact or event that can be observed"},
                   {en:"consensus",es:"consenso",def:"general agreement among a group"},
                   {en:"bias",es:"sesgo",def:"an unfair preference for or against something"},
                   {en:"scope",es:"alcance",def:"the range of what something deals with"},
                   {en:"trait",es:"rasgo",def:"a particular feature of a person's character"},
                   {en:"threshold",es:"umbral",def:"the level at which something begins to happen"},
                   {en:"correlation",es:"correlación",def:"a connection between two things that change together"},
                   {en:"variable",es:"variable",def:"a factor that can change in an experiment"},
                   {en:"sample",es:"muestra",def:"a small part chosen to represent the whole"},
                   {en:"outcome",es:"resultado",def:"the result or effect of an action or event"},
                   {en:"discrepancy",es:"discrepancia",def:"a difference between things that should match"},
                   {en:"benchmark",es:"referencia",def:"a standard point used for comparison"},
                   {en:"magnitude",es:"magnitud",def:"the great size or importance of something"},
                   {en:"tendency",es:"tendencia",def:"a likelihood to behave in a particular way"} ] },
        { id: "aurora", name: "La aurora", icon: "spark", hint: "Colocaciones",
          cards: [ {en:"to bear in mind",es:"tener en cuenta",def:"to remember and consider something when deciding"},
                   {en:"to take into account",es:"considerar",def:"to consider a factor when making a judgement"},
                   {en:"to draw a conclusion",es:"sacar una conclusión",def:"to form a final opinion from the evidence"},
                   {en:"a steep learning curve",es:"una curva de aprendizaje pronunciada",def:"a situation where you must learn a lot very quickly"},
                   {en:"to play a role",es:"desempeñar un papel",def:"to have an effect or part in something"},
                   {en:"to raise awareness",es:"concienciar",def:"to make more people know about an issue"},
                   {en:"to make progress",es:"avanzar",def:"to move forward toward a goal"},
                   {en:"to shed light on",es:"arrojar luz sobre",def:"to make something easier to understand"},
                   {en:"to pose a threat",es:"suponer una amenaza",def:"to be a possible danger"},
                   {en:"to set a precedent",es:"sentar un precedente",def:"to create an example that others may follow"},
                   {en:"to strike a balance",es:"lograr un equilibrio",def:"to find a fair middle point between two things"} ] },
        { id: "nebula", name: "La nebulosa", icon: "globe", hint: "Sociedad y tendencias",
          cards: [ {en:"trend",es:"tendencia",def:"a general direction in which things are changing"},
                   {en:"impact",es:"impacto",def:"a strong effect on someone or something"},
                   {en:"inequality",es:"desigualdad",def:"an unfair difference between groups in society"},
                   {en:"sustainability",es:"sostenibilidad",def:"the ability to continue without harming the future"},
                   {en:"globalization",es:"globalización",def:"the process of the world becoming more connected"},
                   {en:"welfare",es:"bienestar",def:"people's health and well-being, often as state support"},
                   {en:"diversity",es:"diversidad",def:"a range of different people or things"},
                   {en:"policy",es:"política",def:"a plan of action agreed by a government or group"},
                   {en:"reform",es:"reforma",def:"a change made to improve a system"},
                   {en:"crisis",es:"crisis",def:"a time of great danger or difficulty"},
                   {en:"poverty",es:"pobreza",def:"the state of being very poor"},
                   {en:"migration",es:"migración",def:"the movement of people to live in another place"},
                   {en:"infrastructure",es:"infraestructura",def:"the basic systems a country needs, like roads and power"},
                   {en:"governance",es:"gobernanza",def:"the way a country or organization is controlled"} ] },
        { id: "comet", name: "El cometa", icon: "bolt", hint: "Adjetivos avanzados",
          cards: [ {en:"inevitable",es:"inevitable",def:"certain to happen and impossible to avoid"},
                   {en:"ambiguous",es:"ambiguo",def:"having more than one possible meaning"},
                   {en:"coherent",es:"coherente",def:"clear, logical and well organized"},
                   {en:"profound",es:"profundo",def:"very great or deeply felt"},
                   {en:"subtle",es:"sutil",def:"delicate and not obvious"},
                   {en:"robust",es:"robusto",def:"strong and unlikely to fail"},
                   {en:"feasible",es:"viable",def:"possible to do easily or conveniently"},
                   {en:"redundant",es:"redundante",def:"not needed because it repeats something"},
                   {en:"prevalent",es:"predominante",def:"common or widespread"},
                   {en:"plausible",es:"plausible",def:"seeming reasonable or probably true"},
                   {en:"compelling",es:"convincente",def:"so convincing that you must pay attention"},
                   {en:"intricate",es:"intrincado",def:"very detailed and complicated"},
                   {en:"nuanced",es:"matizado",def:"showing subtle differences in meaning"},
                   {en:"arbitrary",es:"arbitrario",def:"based on chance or whim, not on reason"} ] }
      ]
    },
    C2: {
      structure: "castle", name: "El Castillo del Saber",
      intro: "Cruza el portón del castillo: aquí se domina el matiz y el registro culto.",
      branches: [
        { id: "gate", name: "El portón", icon: "crown", hint: "Matiz", practice: "lvl-c2-vocab-nuance",
          cards: [ {en:"nuance",es:"matiz",def:"a very slight difference in meaning, feeling or tone"},
                   {en:"eloquence",es:"elocuencia",def:"the skill of speaking or writing fluently and persuasively"},
                   {en:"subtlety",es:"sutileza",def:"a fine, delicate distinction that is not easily noticed"},
                   {en:"connotation",es:"connotación",def:"an idea a word suggests beyond its literal meaning"},
                   {en:"rhetoric",es:"retórica",def:"the art of persuasive speaking or writing"},
                   {en:"discourse",es:"discurso",def:"formal, extended discussion of a subject"},
                   {en:"premise",es:"premisa",def:"a proposition on which an argument is based"},
                   {en:"candor",es:"franqueza",def:"honesty and openness in what you say"},
                   {en:"allusion",es:"alusión",def:"an indirect reference to something"},
                   {en:"irony",es:"ironía",def:"saying the opposite of what you mean, often for effect"},
                   {en:"paradox",es:"paradoja",def:"a statement that seems contradictory yet may be true"},
                   {en:"undertone",es:"trasfondo",def:"a quality or meaning that lies beneath the surface"},
                   {en:"innuendo",es:"insinuación",def:"an indirect hint, usually critical or suggestive"},
                   {en:"euphemism",es:"eufemismo",def:"a mild word used in place of a harsher one"},
                   {en:"ambiguity",es:"ambigüedad",def:"the quality of having more than one meaning"},
                   {en:"inflection",es:"inflexión",def:"a change in the pitch or tone of the voice"} ] },
        { id: "throne", name: "El salón del trono", icon: "scepter", hint: "Verbos avanzados",
          cards: [ {en:"to epitomize",es:"personificar",def:"to be a perfect example of something"},
                   {en:"to reconcile",es:"reconciliar",def:"to make conflicting ideas or people compatible"},
                   {en:"to discern",es:"discernir",def:"to perceive or recognize something subtle"},
                   {en:"to substantiate",es:"fundamentar",def:"to support a claim with solid evidence"},
                   {en:"to delineate",es:"delinear",def:"to describe or outline something precisely"},
                   {en:"to encompass",es:"abarcar",def:"to include a wide range of things"},
                   {en:"to scrutinize",es:"escudriñar",def:"to inspect something closely and critically"},
                   {en:"to elucidate",es:"elucidar",def:"to make something clear by explaining it"},
                   {en:"to relinquish",es:"renunciar",def:"to give up or let go of something"},
                   {en:"to perpetuate",es:"perpetuar",def:"to make something continue indefinitely"},
                   {en:"to consolidate",es:"consolidar",def:"to combine things into a single, stronger whole"},
                   {en:"to galvanize",es:"galvanizar",def:"to shock or excite people into action"},
                   {en:"to circumvent",es:"eludir",def:"to find a clever way around an obstacle or rule"},
                   {en:"to vindicate",es:"reivindicar",def:"to prove that someone is right or free from blame"},
                   {en:"to supersede",es:"reemplazar",def:"to take the place of something older"} ] },
        { id: "vault", name: "La bóveda", icon: "gem", hint: "Modismos",
          cards: [ {en:"to hit the nail on the head",es:"dar en el clavo",def:"to describe exactly what is causing a situation"},
                   {en:"to bite the bullet",es:"apechugar",def:"to accept something difficult and do it bravely"},
                   {en:"a blessing in disguise",es:"no hay mal que por bien no venga",def:"a misfortune that turns out to be good"},
                   {en:"to cut corners",es:"hacer las cosas a medias",def:"to do something cheaply or quickly, ignoring quality"},
                   {en:"to beat around the bush",es:"andarse por las ramas",def:"to avoid saying something directly"},
                   {en:"the last straw",es:"la gota que colma el vaso",def:"the final problem that makes a situation unbearable"},
                   {en:"to break the ice",es:"romper el hielo",def:"to ease tension and start a conversation"},
                   {en:"to cost an arm and a leg",es:"costar un ojo de la cara",def:"to be extremely expensive"},
                   {en:"once in a blue moon",es:"de vez en cuando",def:"very rarely"},
                   {en:"to spill the beans",es:"descubrir el pastel",def:"to reveal a secret"},
                   {en:"to be on the same page",es:"estar de acuerdo",def:"to share the same understanding"},
                   {en:"to get cold feet",es:"acobardarse",def:"to lose your nerve before doing something"} ] },
        { id: "spire", name: "La aguja", icon: "feather", hint: "Registro culto",
          cards: [ {en:"notwithstanding",es:"no obstante",def:"in spite of; despite"},
                   {en:"henceforth",es:"de ahora en adelante",def:"from this time on"},
                   {en:"albeit",es:"aunque",def:"although; even though"},
                   {en:"ergo",es:"por lo tanto",def:"therefore; for that reason"},
                   {en:"hitherto",es:"hasta ahora",def:"until now; up to this point"},
                   {en:"vis-à-vis",es:"respecto a",def:"in relation to; compared with"},
                   {en:"hereby",es:"por la presente",def:"by this means, as a formal result of this act"},
                   {en:"thereby",es:"de ese modo",def:"by that means; with that result"},
                   {en:"wherein",es:"en donde",def:"in which; in what way"},
                   {en:"insofar as",es:"en la medida en que",def:"to the extent that"},
                   {en:"heretofore",es:"hasta ahora",def:"before now; until this time"},
                   {en:"whereby",es:"por lo cual",def:"by which; through which"},
                   {en:"forthwith",es:"de inmediato",def:"immediately; at once"},
                   {en:"aforementioned",es:"antes mencionado",def:"mentioned earlier in the text"} ] },
        { id: "sanctum", name: "El sagrario", icon: "scroll", hint: "Sustantivos cultos",
          cards: [ {en:"erudition",es:"erudición",def:"deep, wide knowledge gained from study"},
                   {en:"sagacity",es:"sagacidad",def:"keen judgement and wisdom"},
                   {en:"prudence",es:"prudencia",def:"careful good judgement in practical matters"},
                   {en:"integrity",es:"integridad",def:"the quality of being honest and morally upright"},
                   {en:"tenacity",es:"tenacidad",def:"determination and persistence"},
                   {en:"humility",es:"humildad",def:"a modest view of one's own importance"},
                   {en:"empathy",es:"empatía",def:"the ability to understand another person's feelings"},
                   {en:"resilience",es:"resiliencia",def:"the ability to recover quickly from difficulty"},
                   {en:"wisdom",es:"sabiduría",def:"good judgement gained from experience and knowledge"},
                   {en:"virtue",es:"virtud",def:"behaviour showing high moral standards"},
                   {en:"fortitude",es:"fortaleza",def:"courage in pain or difficulty"},
                   {en:"benevolence",es:"benevolencia",def:"kindness and the wish to do good"},
                   {en:"diligence",es:"diligencia",def:"careful and persistent effort in work"},
                   {en:"discretion",es:"discreción",def:"the ability to act and speak carefully and tactfully"} ] },
        { id: "courtyard", name: "El patio de armas", icon: "crown", hint: "Adjetivos de registro",
          cards: [ {en:"meticulous",es:"meticuloso",def:"showing great attention to detail"},
                   {en:"astute",es:"astuto",def:"clever and quick to see how to gain an advantage"},
                   {en:"succinct",es:"sucinto",def:"expressed clearly in very few words"},
                   {en:"lucid",es:"lúcido",def:"clear and easy to understand"},
                   {en:"cogent",es:"convincente",def:"clear, logical and convincing"},
                   {en:"articulate",es:"articulado",def:"able to express ideas clearly and fluently"},
                   {en:"scrupulous",es:"escrupuloso",def:"very careful to do what is right and exact"},
                   {en:"arduous",es:"arduo",def:"demanding great effort; difficult and tiring"},
                   {en:"candid",es:"cándido",def:"honest and direct in a frank way"},
                   {en:"eloquent",es:"elocuente",def:"fluent and persuasive in speech or writing"},
                   {en:"sagacious",es:"sagaz",def:"showing keen judgement and wisdom"},
                   {en:"prudent",es:"prudente",def:"acting with care and good sense"},
                   {en:"tenacious",es:"tenaz",def:"holding firmly to a purpose; persistent"},
                   {en:"erudite",es:"erudito",def:"having or showing deep learning"} ] }
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

  /* agrupa las palabras extra por CONTENIDO (tipo gramatical + tema) para
     nombrar las salas según lo que contienen, en vez de "Más palabras · N" */
  var EXTRA_BUCKETS = [
    { key: "verbs",   name: "Más verbos",        icon: "bolt" },
    { key: "phrases", name: "Más expresiones",   icon: "chat" },
    { key: "food",    name: "Comida y bebida",   icon: "pot",
      kw: ["comida","comer","beber","fruta","verdura","carne","pan","leche","queso","plato","postre","dulce","sabor","bebida","cocinar","food","eat","drink","fruit","meat","bread","meal","taste","dish","cook"] },
    { key: "nature",  name: "Naturaleza",        icon: "leaf",
      kw: ["árbol","flor","planta","animal","río","mar","montaña","cielo","clima","lluvia","viento","bosque","tierra","nature","tree","flower","plant","animal","river","sea","mountain","sky","rain","wind","forest","weather"] },
    { key: "travel",  name: "Ciudad y viajes",   icon: "compass",
      kw: ["ciudad","calle","viaje","viajar","tren","coche","avión","hotel","mapa","turista","carretera","city","street","travel","train","car","plane","hotel","map","tourist","road","trip"] },
    { key: "work",    name: "Trabajo y dinero",  icon: "briefcase",
      kw: ["trabajo","trabajar","dinero","empresa","oficina","negocio","banco","pagar","precio","sueldo","jefe","work","money","business","office","company","bank","pay","price","job","salary","boss"] },
    { key: "tech",    name: "Tecnología",        icon: "link",
      kw: ["ordenador","computadora","internet","pantalla","teléfono","datos","programa","aplicación","digital","computer","internet","screen","phone","data","network","software","online","digital","app"] },
    { key: "people",  name: "Personas y trato",  icon: "family",
      kw: ["amigo","familia","persona","gente","feliz","triste","amor","miedo","sentir","amistad","friend","family","person","people","happy","sad","love","fear","feel","emotion"] },
    { key: "body",    name: "Cuerpo y salud",    icon: "flame",
      kw: ["cuerpo","salud","médico","enfermo","dolor","mano","cabeza","ojo","brazo","pierna","body","health","doctor","sick","pain","hand","head","eye","arm","leg"] },
    { key: "time",    name: "Tiempo y rutina",   icon: "spark",
      kw: ["día","hora","semana","mes","año","mañana","noche","tarde","minuto","day","hour","week","month","year","morning","night","minute"] }
  ];
  function extraBucketOf(en, es) {
    en = ("" + en).toLowerCase(); es = ("" + es).toLowerCase();
    if (/^to\s/.test(en)) return "verbs";
    if (/\s/.test(en.replace(/^to\s/, ""))) return "phrases";   // expresión / colocación
    for (var i = 2; i < EXTRA_BUCKETS.length; i++) {
      var b = EXTRA_BUCKETS[i]; if (!b.kw) continue;
      for (var j = 0; j < b.kw.length; j++) {
        if (en.indexOf(b.kw[j]) >= 0 || es.indexOf(b.kw[j]) >= 0) return b.key;
      }
    }
    return "other";
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
          used[keyOf(c.en)] = 1; return { en: c.en, es: c.es, def: c.def };
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
      /* agrupa las extra por contenido y nombra cada sala según su tema */
      var grouped = {};
      extra.forEach(function (p) {
        var k = extraBucketOf(p.en, p.es);
        (grouped[k] = grouped[k] || []).push(p);
      });
      /* fusiona temas demasiado pequeños (<4) en "otras palabras" */
      Object.keys(grouped).forEach(function (k) {
        if (k !== "other" && grouped[k].length < 4) {
          grouped.other = (grouped.other || []).concat(grouped[k]);
          delete grouped[k];
        }
      });
      var meta = { other: { name: "Más vocabulario", icon: "spark" } };
      EXTRA_BUCKETS.forEach(function (b) { meta[b.key] = { name: b.name, icon: b.icon }; });
      var order = EXTRA_BUCKETS.map(function (b) { return b.key; }).concat(["other"]);
      var chunk = 14;
      order.forEach(function (k) {
        var arr = grouped[k]; if (!arr || !arr.length) return;
        var nChunks = Math.ceil(arr.length / chunk), part = 1;
        for (var i = 0; i < arr.length; i += chunk) {
          branches.push({
            id: "more-" + k + (part > 1 ? ("-" + part) : ""),
            name: meta[k].name + (nChunks > 1 ? (" · " + part) : ""),
            icon: meta[k].icon, hint: "Del mundo " + lv, curated: false, cards: arr.slice(i, i + chunk)
          });
          part++;
        }
      });
      dens[lv] = { level: lv, structure: src.structure, name: src.name, intro: src.intro, branches: branches };
    });
    return dens;
  }

  return { build: build, DENS: DENS, LEVELS: LEVELS };
})();
