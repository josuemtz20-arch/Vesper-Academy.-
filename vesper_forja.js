/* ============================================================
 * vesper_forja.js — LA FORJA: práctica (casi) infinita.
 *
 * Problema que resuelve: el banco de lecciones es finito (~250 lecciones,
 * ~1335 ejercicios escritos a mano). Quien termina el mundo se queda sin
 * nada que hacer salvo repetir lecciones idénticas. La Forja arma rondas
 * NUEVAS en tiempo de ejecución a partir del contenido que ya existe.
 *
 * ---------------------------------------------------------------
 * REGLA DE ORO — JERARQUÍA DE DISTRACTORES
 * ---------------------------------------------------------------
 * Un ejercicio generado sólo sirve si tiene UNA respuesta correcta
 * defendible. El mayor riesgo de generar idiomas automáticamente es
 * marcar como error algo que sí es correcto ("big" vs "large"), y eso
 * destruye la confianza más rápido que cualquier otro fallo.
 *
 * Por eso los generadores están ordenados por el ORIGEN de sus
 * distractores, y los de abajo sólo se activan si los de arriba ya
 * funcionan:
 *
 *   TIER A — CERO SÍNTESIS. Los distractores son contenido que una
 *     persona ya escribió y ya afirmó que era incorrecto. El riesgo de
 *     ambigüedad no se filtra: no existe.
 *   TIER B — SÍNTESIS MEDIDA. Vocabulario del "den", con una reja de
 *     aridad: si una palabra tiene más de una traducción registrada en
 *     esa dirección, se prohíbe preguntarla en opción múltiple y se
 *     manda a respuesta escrita (donde answers[] acepta todas).
 *
 * Si un generador no puede producir un ítem seguro, devuelve null. Nunca
 * "más o menos bien".
 * ---------------------------------------------------------------
 *
 * CONTRATO DE DETERMINISMO (no negociable): el contenido de un ítem es
 * función pura de (itemKey, genId, variant). Sin Date.now(), sin
 * Math.random(), sin claves en orden variable. Motivo: vesper_srs.js
 * identifica los ejercicios por djb2(JSON.stringify(ex)); si el mismo
 * ítem se serializara distinto en cada render, cada fallo crearía una
 * tarjeta nueva y localStorage crecería sin control. Sólo el ORDEN de
 * las opciones se re-baraja por tirada, para que la respuesta nunca sea
 * "la segunda".
 *
 * window.VESPER_FORJA:
 *   buildSession(opts)  -> objeto-lección listo para leccion.html (o null)
 *   grade(itemKey, ok)  -> registra el resultado de un ítem (Leitner)
 *   dueCount()          -> ítems vencidos hoy
 *   poolSize()          -> tamaño total del banco generable
 *   roundsToday()       -> rondas jugadas hoy (para XP decreciente)
 *   noteRound(n)        -> cierra una ronda; devuelve el récord del día
 *   stats()             -> precisión por generador (debug / panel)
 *   audit(rounds)       -> autotest: valida invariantes, devuelve informe
 *
 * Todo vive en localStorage["vesper_forja"]. Degrada en silencio.
 * ============================================================ */
window.VESPER_FORJA = (function () {
  "use strict";

  var KEY = "vesper_forja";
  var VERSION = 1;
  var INTERVALS = [0, 1, 3, 7, 16, 30];   /* mismos intervalos que vesper_srs.js */
  var GRADUATE = INTERVALS.length;
  var ROUND = 12;                          /* ejercicios por ronda */
  var SEEN_CAP = 3000;                     /* tope del registro de vistos */
  var QUAR_MIN_OBS = 20;                   /* observaciones antes de poder vetar */
  var QUAR_MAX_ACC = 0.25;                 /* precisión bajo la cual se veta */

  /* ---------------- utilidades puras ---------------- */

  function djb2(str) {
    var h = 5381, i;
    for (i = 0; i < str.length; i++) h = ((h << 5) + h + str.charCodeAt(i)) | 0;
    return h >>> 0;
  }
  /* PRNG determinista y barato (mulberry32) */
  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function rngFor(key, gen, variant) { return mulberry32(djb2(key + "#" + gen + "#" + variant)); }

  function shuf(arr, rnd) {
    var a = arr.slice(), i, j, t;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(rnd() * (i + 1));
      t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function dayKey(d) { d = d || new Date(); return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
  function addDays(key, n) {
    var p = key.split("-"), d = new Date(+p[0], +p[1] - 1, +p[2]);
    d.setDate(d.getDate() + n);
    return dayKey(d);
  }

  /* normalización igual a la del motor (leccion.html norm()): minúsculas,
     sin apóstrofos ni puntuación. OJO: no pliega acentos — por eso jamás
     pedimos español escrito. */
  function norm(s) {
    return ("" + (s == null ? "" : s)).toLowerCase()
      .replace(/[’‘'`]/g, "")
      .replace(/[.,!?;:¿¡"]/g, " ")
      .replace(/\s+/g, " ").trim();
  }
  /* clave de comparación: además pliega acentos, para comparar español
     entre sí (no para calificar). */
  function fold(s) {
    s = norm(s);
    return s.replace(/[áàäâ]/g, "a").replace(/[éèëê]/g, "e")
      .replace(/[íìïî]/g, "i").replace(/[óòöô]/g, "o")
      .replace(/[úùüû]/g, "u").replace(/ñ/g, "n");
  }

  function lev(a, b) {
    a = a || ""; b = b || "";
    if (a === b) return 0;
    if (!a.length) return b.length;
    if (!b.length) return a.length;
    var prev = [], cur = [], i, j;
    for (j = 0; j <= b.length; j++) prev[j] = j;
    for (i = 1; i <= a.length; i++) {
      cur[0] = i;
      for (j = 1; j <= b.length; j++) {
        cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a.charAt(i - 1) === b.charAt(j - 1) ? 0 : 1));
      }
      for (j = 0; j <= b.length; j++) prev[j] = cur[j];
    }
    return prev[b.length];
  }

  /* ¿son dos opciones demasiado parecidas para distinguirlas con justicia? */
  function tooClose(a, b) {
    var x = fold(a), y = fold(b);
    if (!x || !y) return true;
    if (x === y) return true;
    if (x.indexOf(y) === 0 || y.indexOf(x) === 0) return true;          /* una es prefijo de la otra */
    if (x.length >= 5 && y.length >= 5 && x.slice(0, 5) === y.slice(0, 5)) return true;  /* misma raíz */
    if (lev(x, y) <= 2) return true;
    return false;
  }

  /* ---------------- almacén ---------------- */

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      var s = raw ? JSON.parse(raw) : null;
      if (!s || typeof s !== "object") s = {};
      if (s.v !== VERSION) { s = { v: VERSION }; }
      if (!s.items) s.items = {};
      if (!s.gen) s.gen = {};
      if (!s.day) s.day = dayKey();
      if (typeof s.rounds !== "number") s.rounds = 0;
      if (typeof s.best !== "number") s.best = 0;
      return s;
    } catch (e) { return { v: VERSION, items: {}, gen: {}, day: dayKey(), rounds: 0, best: 0 }; }
  }
  function save(s) { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {} }

  /* poda LRU cuando el registro crece demasiado */
  function prune(s) {
    var keys = Object.keys(s.items);
    if (keys.length <= SEEN_CAP) return;
    keys.sort(function (a, b) {
      var A = s.items[a], B = s.items[b];
      return (A.seen || "") < (B.seen || "") ? -1 : 1;   /* más antiguos primero */
    });
    var drop = keys.length - SEEN_CAP;
    for (var i = 0; i < drop; i++) {
      /* nunca tires algo que aún está en caja baja: es lo que falta por aprender */
      if ((s.items[keys[i]].b || 0) >= 2) delete s.items[keys[i]];
    }
  }

  function rollDay(s) {
    var today = dayKey();
    if (s.day !== today) { s.day = today; s.rounds = 0; s.best = 0; }
    return s;
  }

  function grade(itemKey, ok) {
    if (!itemKey) return;
    var s = rollDay(load());
    var today = dayKey();
    var it = s.items[itemKey];
    if (!it) it = s.items[itemKey] = { b: 0, d: today, n: 0, o: 0, c: 0 };
    it.n = (it.n || 0) + 1;
    it.o = (it.o || 0) + 1;
    it.seen = today;
    if (ok) {
      it.c = (it.c || 0) + 1;
      it.b = Math.min(GRADUATE, (it.b || 0) + 1);
      it.d = addDays(today, INTERVALS[Math.min(it.b, INTERVALS.length - 1)]);
    } else {
      it.b = 0;
      it.d = today;
    }
    /* estadística por generador + auto-cuarentena */
    var gid = itemKey.split("|")[0];
    var g = s.gen[gid] || (s.gen[gid] = { o: 0, c: 0 });
    g.o++; if (ok) g.c++;
    if (it.o >= QUAR_MIN_OBS && (it.c / it.o) < QUAR_MAX_ACC) it.q = 1;   /* ítem vetado */
    prune(s);
    save(s);
  }

  function dueCount() {
    var s = load(), today = dayKey(), n = 0, k;
    for (k in s.items) { var it = s.items[k]; if (!it.q && (it.d || today) <= today && (it.b || 0) < GRADUATE) n++; }
    return n;
  }
  function roundsToday() { var s = rollDay(load()); save(s); return s.rounds; }
  function noteRound(correct) {
    var s = rollDay(load());
    s.rounds++;
    if (correct > s.best) s.best = correct;
    save(s);
    return { rounds: s.rounds, best: s.best };
  }
  function bestToday() { var s = rollDay(load()); return s.best; }

  /* ============================================================
   * CORPUS — se construye una vez, perezosamente, y se cachea.
   * Nunca se llama desde el hub: el índice ya paga VESPER_PATH.build.
   * ============================================================ */

  var _corpus = null;

  var DIRECTIVE = /^\s*(choose|elige|escoge|completa|complete|pick|selecciona|select)\s*:?\s*/i;
  var BINARY_INSTR = /^\s*¿?[^?]+\s+o\s+[^?]+\?\s*$/i;   /* "¿make o do?" -> no sirve de enunciado */
  var META_OPTION = /todas las anteriores|ninguna de las anteriores|all of the above|none of the above|both a and b|a y b/i;
  /* adverbios que se pueden mover al principio o al final sin volverse
     incorrectos: hacen que "ordena las palabras" tenga más de una solución */
  var FRONTABLE = ("today yesterday tomorrow now then sometimes always usually often never rarely "
    + "tonight first finally suddenly maybe perhaps please here there daily").split(" ");

  function isEnglishish(s) {
    /* rechaza texto con marcas claras de español; barato y suficiente */
    if (/[ñáéíóú¿¡]/.test(s)) return false;
    if (/\b(el|la|los|las|que|para|con|una|del|por|como|usamos|se|es|un)\b/i.test(s)) return false;
    return true;
  }
  function looksLikeSentence(s) {
    if (!s) return false;
    if (s.length < 6 || s.length > 90) return false;
    if (s.indexOf("(") >= 0 || s.indexOf("=") >= 0 || s.indexOf("/") >= 0) return false;
    return true;
  }
  /* extrae el fragmento entre comillas de un prompt tipo:
     Traduce al ingles: "Me levanto a las siete."  */
  function quoted(s) {
    var m = ("" + s).match(/["“”«]([^"“”»]+)["”“»]/);
    return m ? m[1].trim() : "";
  }
  function stripEnd(s) { return ("" + s).replace(/[.!?\s]+$/, ""); }

  function tokens(s) { return stripEnd(s).split(/\s+/).filter(function (t) { return !!t; }); }

  function buildCorpus() {
    if (_corpus) return _corpus;
    var L = window.VESPER_LESSONS || {};
    var ORDER = window.VESPER_LESSONS_ORDER || Object.keys(L);
    var c = {
      a1: [], a2: [], a3: [], a4: [], a5: [], a6: [], a7: [],
      b1: [], b2: [], b3: [], b4: [],
      esPool: [],       /* frases en español, para distractores de a6 */
      lex: [], enIdx: {}, esIdx: {}
    };

    /* ---------- recorrido del banco de lecciones (TIER A) ---------- */
    ORDER.forEach(function (lid) {
      var les = L[lid];
      if (!les || !les.exercises || !les.exercises.length) return;
      var lv = les.level || "A1";

      /* frases correctas de los ejemplos de la explicación: material
         verdadero y auténtico para el juicio de gramaticalidad (a5) */
      var exp = les.explanation;
      if (exp && exp.examples && exp.examples.length) {
        exp.examples.forEach(function (e, j) {
          if (!e || !e.en) return;
          var t = ("" + e.en).trim();
          if (!looksLikeSentence(t) || !isEnglishish(t)) return;
          c.a5.push({ k: "a5|" + lid + "|e" + j, lv: lv, text: t, ok: true });
        });
      }

      les.exercises.forEach(function (ex, i) {
        if (!ex || !ex.type) return;
        var base = lid + "|" + i;

        /* ---- A1 · rebarajar opción múltiple ya escrita ---- */
        if (ex.type === "multiple_choice" && ex.options && ex.options.length >= 3
          && typeof ex.correctIndex === "number"
          && ex.correctIndex >= 0 && ex.correctIndex < ex.options.length) {
          /* Se descartan: opciones tipo "todas las anteriores" (dejan de tener
             sentido al reordenar), opciones vacías, y ejercicios con dos
             opciones IDÉNTICAS —los hay en el banco, p. ej. "carefuly" repetido
             en x3-a2-grammar-adverbs-manner— porque ahí la respuesta correcta
             deja de ser única. */
          var meta = false, seenOpt = {};
          for (var m = 0; m < ex.options.length; m++) {
            var ov = ("" + ex.options[m]).trim();
            if (META_OPTION.test(ov) || !ov || seenOpt[ov]) meta = true;
            seenOpt[ov] = 1;
          }
          if (!meta) c.a1.push({ k: "a1|" + base, lv: lv, lid: lid, i: i });

          /* ---- A4 · una opción + su hueco = verdadero/falso ----
             El autor ya afirmó cuál opción es correcta: las demás son,
             por construcción, frases falsas. Cero síntesis. */
          /* El enunciado suele traer una consigna delante ("Choose the correct
             form: She ___ my teacher."). Como aquí la frase se convierte en
             una AFIRMACIÓN suelta, nos quedamos sólo con lo que va después
             de los dos puntos; si no, saldría "The correct form: She am my
             teacher.", que no se puede juzgar como frase. */
          var q = "" + (ex.question || "");
          if (q.indexOf(":") >= 0) q = q.slice(q.lastIndexOf(":") + 1);
          q = q.replace(DIRECTIVE, "").trim();
          /* El hueco se escribe con un número variable de guiones bajos
             ("___", "_____"). Se normaliza a un único token antes de contar y
             de sustituir; si no, "A train is _____ a bicycle." dejaba restos:
             "A train is fast than__ a bicycle." */
          q = q.replace(/_{2,}/g, "___");
          if (q.split("___").length === 2 && isEnglishish(q) && q.length <= 90) {
            for (var oi = 0; oi < ex.options.length; oi++) {
              var opt = ("" + ex.options[oi]).trim();
              if (!opt || opt.length > 24) continue;
              c.a4.push({ k: "a4|" + base + "|" + oi, lv: lv, lid: lid, i: i, oi: oi, q: q });
            }
          }
        }

        /* ---- A2 · cada ítem de "clasifica" es una pregunta suelta ----
           Convierte un muro de todo-o-nada en ítems calificables uno a uno. */
        if (ex.type === "categorize" && ex.buckets && ex.buckets.length >= 2 && ex.items && ex.items.length) {
          var labels = {}, dup = false;
          ex.buckets.forEach(function (b) {
            var f = fold(b.label || b.id);
            if (labels[f]) dup = true;
            labels[f] = 1;
          });
          if (!dup) {
            ex.items.forEach(function (it, j) {
              if (!it || !it.t) return;
              var found = false;
              for (var bi = 0; bi < ex.buckets.length; bi++) if (ex.buckets[bi].id === it.bucket) found = true;
              if (found) c.a2.push({ k: "a2|" + base + "|" + j, lv: lv, lid: lid, i: i, j: j });
            });
          }
        }

        /* ---- A3 · un par de "une con su pareja" = opción múltiple ----
           Los distractores son las OTRAS columnas derechas del mismo
           ejercicio: mismo campo semántico y 1:1 por construcción.
           Se cita la instrucción tal cual; nunca se adivina la relación. */
        if (ex.type === "matching" && ex.pairs && ex.pairs.length >= 4) {
          var instr = ("" + (ex.instruction || "")).trim();
          if (!BINARY_INSTR.test(instr)) {
            var rs = {}, bad = false;
            ex.pairs.forEach(function (p) {
              if (!p || !p.l || !p.r) { bad = true; return; }
              var f = fold(p.r);
              if (rs[f]) bad = true;
              rs[f] = 1;
            });
            if (!bad) {
              ex.pairs.forEach(function (p, j) {
                c.a3.push({ k: "a3|" + base + "|" + j, lv: lv, lid: lid, i: i, j: j });
              });
            }
          }
        }

        /* ---- A5 · juicio de gramaticalidad ----
           La mitad FALSA sale de find_error: el autor ya marcó que la
           frase tiene un error. (La mitad VERDADERA sale de los ejemplos
           y de las traducciones; `correction` NO sirve: es un fragmento
           con notas -> "are (four apples = plural)".) */
        if (ex.type === "find_error" && ex.segments && ex.segments.length) {
          var joined = "";
          for (var si = 0; si < ex.segments.length; si++) {
            var sg = ex.segments[si];
            joined += (sg && typeof sg === "object") ? ("" + (sg.u || "")) : ("" + sg);
          }
          joined = joined.replace(/\s+/g, " ").trim();
          if (looksLikeSentence(joined)) {
            c.a5.push({ k: "a5|" + base, lv: lv, text: joined, ok: false, why: ex.explanation || "" });
          }
        }

        /* ---- A6 / A7 · traducciones con inglés canónico ----
           `explanation` guarda la frase inglesa bien escrita ("I get up at
           seven."). Sólo la aceptamos si de verdad coincide con una de las
           `answers`: así garantizamos que es la respuesta y no un comentario. */
        if (ex.type === "translate" && ex.answers && ex.answers.length && ex.explanation) {
          var en = stripEnd(("" + ex.explanation).trim());
          var nen = norm(en), match = false;
          for (var ai = 0; ai < ex.answers.length; ai++) if (norm(ex.answers[ai]) === nen) match = true;
          var es = quoted(ex.prompt);
          /* Ojo con la dirección: hay traducciones al revés ("Traduce al
             español: \"Can you help me?\""), donde lo entrecomillado es
             INGLÉS. Si coláramos esas, el banco de distractores españoles
             acabaría con frases en inglés dentro. Exigimos que la parte
             entrecomillada NO parezca inglés. */
          if (match && es && !isEnglishish(es) && looksLikeSentence(en) && isEnglishish(en)) {
            c.a6.push({ k: "a6|" + base, lv: lv, en: en, es: es });
            c.esPool.push({ es: es, lv: lv, n: tokens(es).length });

            /* A7 · ordenar palabras. Sólo frases de una sola solución:
               tokens únicos, sin conjunciones que permitan reordenar y sin
               adverbios que se puedan mover de sitio. */
            var tk = tokens(en);
            if (tk.length >= 3 && tk.length <= 9 && en.indexOf(",") < 0) {
              var uniq = {}, rep = false, conj = false;
              for (var ti = 0; ti < tk.length; ti++) {
                var lw = tk[ti].toLowerCase();
                if (uniq[lw]) rep = true;
                uniq[lw] = 1;
                if (lw === "and" || lw === "or" || lw === "but") conj = true;
              }
              var f0 = tk[0].toLowerCase(), fn = tk[tk.length - 1].toLowerCase();
              var movable = FRONTABLE.indexOf(f0) >= 0 || FRONTABLE.indexOf(fn) >= 0;
              if (!rep && !conj && !movable) {
                c.a7.push({ k: "a7|" + base, lv: lv, en: en, es: es, tk: tk });
              }
            }
          }
        }
      });
    });

    /* ---------- léxico del den (TIER B) ---------- */
    try {
      var DENS = window.VESPER_VOCAB_DENS;
      if (DENS && DENS.build) {
        var dens = DENS.build(L, ORDER);
        var levels = DENS.LEVELS || ["A1", "A2", "B1", "B2", "C1", "C2"];
        levels.forEach(function (lv) {
          var den = dens[lv];
          if (!den || !den.branches) return;
          den.branches.forEach(function (br) {
            (br.cards || []).forEach(function (card) {
              if (!card || !card.en || !card.es) return;
              var en = ("" + card.en).trim(), es = ("" + card.es).trim();
              if (!en || !es) return;
              var ne = fold(en), ns = fold(es);
              c.lex.push({ en: en, es: es, ne: ne, ns: ns, lv: lv, br: br.id || "", pos: card.pos || "" });
              (c.enIdx[ne] || (c.enIdx[ne] = []))[c.enIdx[ne].length] = ns;
              (c.esIdx[ns] || (c.esIdx[ns] = []))[c.esIdx[ns].length] = ne;
            });
          });
        });
        /* dedup de los índices */
        function dedup(idx) {
          for (var k in idx) {
            var out = [], seen = {};
            for (var i = 0; i < idx[k].length; i++) if (!seen[idx[k][i]]) { seen[idx[k][i]] = 1; out.push(idx[k][i]); }
            idx[k] = out;
          }
        }
        dedup(c.enIdx); dedup(c.esIdx);

        /* deduplica el propio léxico por (en,es) */
        var seenCard = {}, lex2 = [];
        c.lex.forEach(function (x) {
          var kk = x.ne + "\u0000" + x.ns;
          if (seenCard[kk]) return;
          seenCard[kk] = 1; lex2.push(x);
        });
        c.lex = lex2;

        /* REJA DE ARIDAD: en cada dirección, sólo se pregunta en opción
           múltiple lo que tiene exactamente UNA traducción registrada.
           Lo ambiguo se manda a b3 (escrito), donde answers[] las acepta
           todas y por tanto deja de ser un problema. */
        c.lex.forEach(function (x, i) {
          if (c.esIdx[x.ns] && c.esIdx[x.ns].length === 1) c.b1.push({ k: "b1|" + x.ns, lv: x.lv, li: i });
          if (c.enIdx[x.ne] && c.enIdx[x.ne].length === 1) {
            c.b2.push({ k: "b2|" + x.ne, lv: x.lv, li: i });
            c.b4.push({ k: "b4|" + x.ne, lv: x.lv, li: i });
          }
          c.b3.push({ k: "b3|" + x.ns, lv: x.lv, li: i });
        });
      }
    } catch (e) { /* sin den: la Forja sigue con Tier A */ }

    _corpus = c;
    return c;
  }

  /* ---------------- selección de distractores de vocabulario ---------------- */

  /* Devuelve n distractores válidos para la tarjeta `card`, leyendo el
     campo `field` ("en" o "es"). Prefiere hermanos de la misma rama
     (contraste difícil), luego del mismo nivel, luego de cualquiera. */
  function vocabDistractors(c, card, field, n, rnd) {
    var want = field === "en" ? "ne" : "ns";
    var other = field === "en" ? "ns" : "ne";
    var oppIdx = field === "en" ? c.enIdx : c.esIdx;   /* opción -> sus glosas */
    var mine = card[other];                            /* la clave del enunciado */

    function usable(d) {
      if (d === card) return false;
      if (d[want] === card[want]) return false;
      if (tooClose(d[field], card[field])) return false;
      /* comprobación bidireccional real: si la opción también es una
         traducción válida del enunciado, sería una segunda respuesta
         correcta. Fuera. */
      var gl = oppIdx[d[want]];
      if (gl) for (var i = 0; i < gl.length; i++) if (gl[i] === mine) return false;
      return true;
    }

    function collect(list, posMatch) {
      var out = [];
      for (var i = 0; i < list.length; i++) {
        var d = list[i];
        if (posMatch && card.pos && d.pos && d.pos !== card.pos) continue;
        if (!usable(d)) continue;
        out.push(d);
      }
      return out;
    }

    var sameBranch = [], sameLevel = [], rest = [];
    for (var i = 0; i < c.lex.length; i++) {
      var d = c.lex[i];
      if (d.br === card.br && d.lv === card.lv) sameBranch.push(d);
      else if (d.lv === card.lv) sameLevel.push(d);
      else rest.push(d);
    }

    var picked = [], used = {};
    var tiers = [collect(sameBranch, true), collect(sameBranch, false),
                 collect(sameLevel, true), collect(sameLevel, false),
                 collect(rest, true)];
    for (var t = 0; t < tiers.length && picked.length < n; t++) {
      var pool = shuf(tiers[t], rnd);
      for (var j = 0; j < pool.length && picked.length < n; j++) {
        var cand = pool[j];
        if (used[cand[want]]) continue;
        /* tampoco deben parecerse ENTRE SÍ */
        var clash = false;
        for (var p = 0; p < picked.length; p++) if (tooClose(picked[p][field], cand[field])) clash = true;
        if (clash) continue;
        used[cand[want]] = 1;
        picked.push(cand);
      }
    }
    return picked.length === n ? picked : null;
  }

  /* ============================================================
   * GENERADORES
   * Cada uno: make(cand, variant, c) -> ejercicio | null
   * El orden de inserción de claves es FIJO (contrato de determinismo).
   * ============================================================ */

  /* Une la consigna con el ítem sin encadenar signos: una instrucción que ya
     acaba en "?" no debe quedar como "...noche?: \"wake up\"". */
  function join(stem) { return /[?!]$/.test(stem) ? " " : ": "; }

  function mcq(question, options, correctIndex, explanation, skill) {
    return { type: "multiple_choice", question: question, options: options,
             correctIndex: correctIndex, explanation: explanation || "", skill: skill || "vocab" };
  }

  var GENS = {
    /* ---- A1 · misma pregunta, opciones en otro orden ---- */
    a1: {
      tier: "A", weight: 12, label: "Repaso mezclado",
      make: function (cand, variant, c) {
        var L = window.VESPER_LESSONS || {};
        var les = L[cand.lid]; if (!les) return null;
        var ex = les.exercises[cand.i]; if (!ex || !ex.options) return null;
        var rnd = rngFor(cand.k, "a1", variant);
        var idx = shuf(ex.options.map(function (_, i) { return i; }), rnd);
        var opts = idx.map(function (i) { return ex.options[i]; });
        var ci = idx.indexOf(ex.correctIndex);
        if (ci < 0) return null;
        return mcq(ex.question || "Elige la opción correcta", opts, ci, ex.explanation || "", ex.skill || "grammar");
      }
    },

    /* ---- A2 · un ítem de "clasifica" ---- */
    a2: {
      tier: "A", weight: 10, label: "Clasifica",
      make: function (cand, variant, c) {
        var L = window.VESPER_LESSONS || {};
        var les = L[cand.lid]; if (!les) return null;
        var ex = les.exercises[cand.i]; if (!ex || !ex.buckets || !ex.items) return null;
        var it = ex.items[cand.j]; if (!it) return null;
        var rnd = rngFor(cand.k, "a2", variant);
        var bs = shuf(ex.buckets, rnd);
        var ci = -1;
        for (var i = 0; i < bs.length; i++) if (bs[i].id === it.bucket) ci = i;
        if (ci < 0) return null;
        var stem = ("" + (ex.instruction || "¿A qué grupo pertenece?")).replace(/\s*[.:]\s*$/, "");
        return mcq(stem + join(stem) + '"' + it.t + '"',
          bs.map(function (b) { return b.label || b.id; }), ci, ex.explanation || "", ex.skill || "use");
      }
    },

    /* ---- A3 · un par de "une con su pareja" ---- */
    a3: {
      tier: "A", weight: 12, label: "Parejas",
      make: function (cand, variant, c) {
        var L = window.VESPER_LESSONS || {};
        var les = L[cand.lid]; if (!les) return null;
        var ex = les.exercises[cand.i]; if (!ex || !ex.pairs) return null;
        var p = ex.pairs[cand.j]; if (!p) return null;
        var rnd = rngFor(cand.k, "a3", variant);
        var others = [];
        for (var i = 0; i < ex.pairs.length; i++) {
          if (i === cand.j) continue;
          var q = ex.pairs[i];
          if (q && q.r && !tooClose(q.r, p.r)) others.push(q.r);
        }
        if (others.length < 3) return null;
        var picked = shuf(others, rnd).slice(0, 3);
        /* los distractores tampoco deben confundirse entre sí */
        for (var a = 0; a < picked.length; a++)
          for (var b = a + 1; b < picked.length; b++)
            if (tooClose(picked[a], picked[b])) return null;
        var opts = shuf(picked.concat([p.r]), rnd);
        var ci = opts.indexOf(p.r);
        var stem = ("" + (ex.instruction || "Elige la pareja correcta")).replace(/\s*[.:]\s*$/, "");
        return mcq(stem + join(stem) + '"' + p.l + '"', opts, ci, ex.explanation || "", ex.skill || "vocab");
      }
    },

    /* ---- A4 · opción rellenada = verdadero o falso ---- */
    a4: {
      tier: "A", weight: 9, label: "¿Correcta o no?",
      make: function (cand, variant, c) {
        var L = window.VESPER_LESSONS || {};
        var les = L[cand.lid]; if (!les) return null;
        var ex = les.exercises[cand.i]; if (!ex || !ex.options) return null;
        var opt = ex.options[cand.oi]; if (opt == null) return null;
        var stmt = cand.q.replace("___", ("" + opt).trim());
        stmt = stmt.charAt(0).toUpperCase() + stmt.slice(1);
        return { type: "true_false", statement: stmt, answer: cand.oi === ex.correctIndex,
                 explanation: ex.explanation || "", skill: ex.skill || "grammar" };
      }
    },

    /* ---- A5 · ¿la frase está bien escrita? ---- */
    a5: {
      tier: "A", weight: 9, label: "Caza el error",
      make: function (cand, variant, c) {
        return { type: "true_false", statement: cand.text, answer: !!cand.ok,
                 explanation: cand.ok ? "La frase es correcta." : ("" + (cand.why || "La frase tiene un error.")),
                 skill: "grammar" };
      }
    },

    /* ---- A6 · del inglés al español, en opción múltiple ----
       (nunca español escrito: norm() no pliega acentos) */
    a6: {
      tier: "A", weight: 7, label: "¿Qué significa?",
      make: function (cand, variant, c) {
        var rnd = rngFor(cand.k, "a6", variant);
        var n = tokens(cand.es).length;
        var pool = [];
        for (var i = 0; i < c.esPool.length; i++) {
          var e = c.esPool[i];
          if (fold(e.es) === fold(cand.es)) continue;
          if (e.n < Math.max(2, Math.round(n * 0.6)) || e.n > Math.round(n * 1.6) + 1) continue;
          if (tooClose(e.es, cand.es)) continue;
          pool.push(e.es);
        }
        if (pool.length < 3) return null;
        var picked = shuf(pool, rnd).slice(0, 3);
        for (var a = 0; a < picked.length; a++)
          for (var b = a + 1; b < picked.length; b++)
            if (tooClose(picked[a], picked[b])) return null;
        var opts = shuf(picked.concat([cand.es]), rnd);
        return mcq('¿Qué significa: "' + cand.en + '"?', opts, opts.indexOf(cand.es), "", "vocab");
      }
    },

    /* ---- A7 · ordenar las palabras ----
       El motor vuelve a barajar `words` contra `correctOrder`, así que
       pasamos el mismo arreglo: garantiza que los tokens coinciden
       exactamente y la comparación posicional siempre tiene solución. */
    a7: {
      tier: "A", weight: 4, label: "Ordena la frase",
      make: function (cand, variant, c) {
        return { type: "word_order", words: cand.tk.slice(), correctOrder: cand.tk.slice(),
                 hint: cand.es, skill: "grammar" };
      }
    },

    /* ---- B1 · español -> inglés (opción múltiple) ---- */
    b1: {
      tier: "B", weight: 10, label: "Vocabulario",
      make: function (cand, variant, c) {
        var card = c.lex[cand.li]; if (!card) return null;
        var rnd = rngFor(cand.k, "b1", variant);
        var ds = vocabDistractors(c, card, "en", 3, rnd);
        if (!ds) return null;
        var opts = shuf(ds.map(function (d) { return d.en; }).concat([card.en]), rnd);
        return mcq('¿Cómo se dice "' + card.es + '" en inglés?', opts, opts.indexOf(card.en), "", "vocab");
      }
    },

    /* ---- B2 · inglés -> español (opción múltiple) ---- */
    b2: {
      tier: "B", weight: 10, label: "Vocabulario",
      make: function (cand, variant, c) {
        var card = c.lex[cand.li]; if (!card) return null;
        var rnd = rngFor(cand.k, "b2", variant);
        var ds = vocabDistractors(c, card, "es", 3, rnd);
        if (!ds) return null;
        var opts = shuf(ds.map(function (d) { return d.es; }).concat([card.es]), rnd);
        return mcq('"' + card.en + '" significa...', opts, opts.indexOf(card.es), "", "vocab");
      }
    },

    /* ---- B3 · recuerdo escrito (sólo inglés) ----
       Aquí viven las palabras con varias traducciones: answers[] las
       acepta todas, así que la ambigüedad deja de ser un defecto. */
    b3: {
      tier: "B", weight: 6, label: "Escribe en inglés",
      make: function (cand, variant, c) {
        var card = c.lex[cand.li]; if (!card) return null;
        var gl = c.esIdx[card.ns] || [card.ne];
        var ans = [], seen = {};
        function push(a) { a = norm(a); if (a && !seen[a]) { seen[a] = 1; ans.push(a); } }
        for (var i = 0; i < c.lex.length; i++) {
          if (c.lex[i].ns !== card.ns) continue;
          var w = c.lex[i].en;
          push(w);
          /* El infinitivo se acepta con y sin "to", pero SÓLO en verbos:
             añadirlo a todo daba respuestas válidas absurdas ("to apple"). */
          if (/^to\s+/i.test(w)) push(w.replace(/^to\s+/i, ""));
          else if (c.lex[i].pos === "verb") push("to " + w);
          if (/^(a|an|the)\s+/i.test(w)) push(w.replace(/^(a|an|the)\s+/i, ""));
        }
        if (!ans.length) return null;
        return { type: "translate", prompt: '¿Cómo se dice "' + card.es + '" en inglés?',
                 answers: ans, explanation: "Se escribe: " + card.en, skill: "vocab" };
      }
    },

    /* ---- B4 · escucha y reconoce la palabra ----
       Cubre un hueco real: 0 de los 1335 ejercicios escritos a mano trae
       audio, y listening escasea en los niveles altos. Va por TTS. */
    b4: {
      tier: "B", weight: 7, label: "Escucha",
      make: function (cand, variant, c) {
        var card = c.lex[cand.li]; if (!card) return null;
        var rnd = rngFor(cand.k, "b4", variant);
        var ds = vocabDistractors(c, card, "en", 3, rnd);
        if (!ds) return null;
        var opts = shuf(ds.map(function (d) { return d.en; }).concat([card.en]), rnd);
        return { type: "listening", text: card.en, question: "¿Qué palabra escuchaste?",
                 options: opts, correctIndex: opts.indexOf(card.en),
                 explanation: card.en + " = " + card.es, skill: "listening" };
      }
    }
  };

  var GEN_IDS = ["a1", "a2", "a3", "a4", "a5", "a6", "a7", "b1", "b2", "b3", "b4"];

  /* ---------------- armado de la ronda ---------------- */

  var LEVEL_ORDER = ["A1", "A2", "B1", "B2", "C1", "C2"];

  function candidatesFor(c, opts) {
    var out = [];
    GEN_IDS.forEach(function (gid) {
      var g = GENS[gid];
      if (!g || g.off) return;
      if (opts.gens && opts.gens.indexOf(gid) < 0) return;
      if (opts.skill === "listening" && gid !== "b4") return;
      var list = c[gid] || [];
      for (var i = 0; i < list.length; i++) {
        var cand = list[i];
        if (opts.level && cand.lv !== opts.level) continue;
        out.push({ gid: gid, cand: cand, w: g.weight });
      }
    });
    return out;
  }

  /* Plan de huecos: 3 vencidos + 2 fallados recientes + el resto sin ver.
     Cada tramo cae en cascada al siguiente si no llena su cuota. */
  function planSlots(all, store, n) {
    var today = dayKey();
    var due = [], missed = [], fresh = [], old = [];
    for (var i = 0; i < all.length; i++) {
      var e = all[i], it = store.items[e.cand.k];
      if (it && it.q) continue;                             /* en cuarentena */
      if (!it) { fresh.push(e); continue; }
      if ((it.b || 0) >= GRADUATE) { old.push(e); continue; }  /* dominado */
      if ((it.d || today) <= today) due.push(e);
      else if ((it.n || 0) - (it.c || 0) > 0) missed.push(e);
      else old.push(e);
    }
    return { due: due, missed: missed, fresh: fresh, old: old };
  }

  function buildSession(opts) {
    opts = opts || {};
    var c = buildCorpus();
    var store = rollDay(load());
    var n = opts.n || ROUND;
    var all = candidatesFor(c, opts);
    if (!all.length) return null;

    /* semilla de la ronda: cambia con cada ronda del día, pero es estable
       dentro de la ronda (no se usa para el CONTENIDO, sólo para elegir). */
    var seed = djb2(dayKey() + "#" + store.rounds + "#" + (opts.mode || "mixto") + "#" + (opts.level || "*"));
    var rnd = mulberry32(seed);

    var buckets = planSlots(all, store, n);
    var quota = [
      { list: buckets.due, take: Math.min(3, buckets.due.length) },
      { list: buckets.missed, take: 2 },
      { list: buckets.fresh, take: n },
      { list: buckets.old, take: n }
    ];

    /* Tope de variedad: ningún generador acapara la ronda. Pero el tope se
       calcula sobre los generadores REALMENTE disponibles: en un modo de un
       solo generador (p. ej. "escucha") un tope de n/3 dejaba rondas de 4. */
    var distinct = 0, seenGid = {};
    for (var gi = 0; gi < all.length; gi++) if (!seenGid[all[gi].gid]) { seenGid[all[gi].gid] = 1; distinct++; }
    var genCap = Math.max(2, Math.ceil(n / Math.min(3, Math.max(1, distinct))));

    var chosen = [], usedKey = {}, usedGen = {};
    function tryTake(list, take) {
      var pool = shuf(list, rnd);
      for (var i = 0; i < pool.length && take > 0 && chosen.length < n; i++) {
        var e = pool[i];
        if (usedKey[e.cand.k]) continue;
        if ((usedGen[e.gid] || 0) >= genCap) continue;
        var st = store.items[e.cand.k];
        var variant = ((st && st.n) || 0) % 4;
        var ex = null;
        try { ex = GENS[e.gid].make(e.cand, variant, c); } catch (err) { ex = null; }
        if (!ex) continue;
        usedKey[e.cand.k] = 1;
        usedGen[e.gid] = (usedGen[e.gid] || 0) + 1;
        chosen.push({ ex: ex, k: e.cand.k, gid: e.gid });
        take--;
      }
    }
    for (var q = 0; q < quota.length && chosen.length < n; q++) tryTake(quota[q].list, quota[q].take);
    if (chosen.length < 4) return null;

    /* mezcla final del orden de presentación */
    var order = shuf(chosen, rnd);
    var lvl = opts.level || "A1";
    return {
      lessonId: "review:forja",           /* prefijo "review:" -> no infla los logros de lecciones */
      level: lvl,
      track: "La Forja",
      isReview: true,                     /* salta la barrera del 70% */
      isForja: true,
      forjaMode: opts.mode || "mixto",
      forjaIds: order.map(function (o) { return o.k; }),
      forjaGens: order.map(function (o) { return o.gid; }),
      title: opts.title || "La Forja",
      explanation: {
        body: opts.body || ("Práctica sin final: cada ronda se arma con ejercicios distintos, "
          + "sacados de todo lo que has visto. Lo que fallas vuelve pronto; lo que dominas se espacia."),
        examples: []
      },
      exercises: order.map(function (o) { return o.ex; }),
      xpReward: 20,
      mascotState: "thinking",
      nextLessonId: null
    };
  }

  function poolSize() {
    var c = buildCorpus(), n = 0;
    GEN_IDS.forEach(function (g) { n += (c[g] || []).length; });
    return n;
  }

  function stats() {
    var s = load(), out = [];
    GEN_IDS.forEach(function (g) {
      var st = s.gen[g];
      out.push({ id: g, label: GENS[g].label, tier: GENS[g].tier,
                 obs: (st && st.o) || 0, acc: st && st.o ? Math.round(100 * st.c / st.o) : null });
    });
    return out;
  }

  /* ============================================================
   * AUDITORÍA — la única verificación posible sin ojos: genera muchas
   * rondas y comprueba las invariantes una por una.
   * ============================================================ */
  /* Generadores que INVENTAN el juego de opciones. Sólo a ellos se les exige
     que dos opciones sean distinguibles entre sí: cuando las opciones son las
     que escribió el autor (a1, a2), los pares mínimos —am/is/are, a/an— son
     justo el objetivo del ejercicio, no un defecto. */
  var SYNTH_OPTS = { a3: 1, a6: 1, b1: 1, b2: 1, b4: 1 };

  function audit(rounds) {
    rounds = rounds || 200;
    var c = buildCorpus();
    var errs = [], counts = {}, total = 0, byGen = {};
    function err(gid, msg) { errs.push(msg); byGen[gid] = (byGen[gid] || 0) + 1; }

    GEN_IDS.forEach(function (gid) {
      var list = c[gid] || [];
      counts[gid] = list.length;
      var step = Math.max(1, Math.floor(list.length / Math.max(1, rounds)));
      for (var i = 0; i < list.length; i += step) {
        for (var v = 0; v < 4; v++) {
          var ex;
          try { ex = GENS[gid].make(list[i], v, c); } catch (e) { err(gid, gid + " lanzó: " + e.message); continue; }
          if (!ex) continue;
          total++;
          var tag = gid + " " + list[i].k + " v" + v;

          /* determinismo: dos generaciones idénticas deben serializar igual */
          var again = GENS[gid].make(list[i], v, c);
          if (JSON.stringify(again) !== JSON.stringify(ex)) err(gid, "NO DETERMINISTA: " + tag);

          if (ex.question && ex.question.indexOf("_") >= 0 && gid !== "a1")
            err(gid, "hueco sin rellenar en el enunciado (" + ex.question + "): " + tag);
          if (ex.type === "multiple_choice" || (ex.type === "listening" && ex.options)) {
            /* mínimo de opciones: los generadores que inventan distractores
               siempre arman 4; los que reusan opciones del autor pueden traer
               un contraste binario legítimo ("¿make o do?"). */
            var minOpts = SYNTH_OPTS[gid] ? 3 : 2;
            if (!ex.options || ex.options.length < minOpts) err(gid, "pocas opciones: " + tag);
            else {
              if (typeof ex.correctIndex !== "number" || ex.correctIndex < 0 || ex.correctIndex >= ex.options.length)
                err(gid, "correctIndex fuera de rango: " + tag);
              /* Duplicados: en opciones sintetizadas se compara plegando
                 acentos y puntuación (más estricto). En opciones del autor se
                 compara el texto tal cual: hay ejercicios donde la ÚNICA
                 diferencia es la puntuación ("'s" / "'" / "s'", o dónde va la
                 coma en una oración de relativo) y plegarlas las colapsaría. */
              var seen = {};
              for (var o = 0; o < ex.options.length; o++) {
                var raw = ("" + ex.options[o]).trim();
                var f = SYNTH_OPTS[gid] ? fold(ex.options[o]) : raw;
                if (!raw) err(gid, "opción vacía: " + tag);
                if (seen[f]) err(gid, "opciones repetidas (" + ex.options[o] + "): " + tag);
                seen[f] = 1;
              }
              if (SYNTH_OPTS[gid]) {
                for (var x = 0; x < ex.options.length; x++)
                  for (var y = x + 1; y < ex.options.length; y++)
                    if (tooClose(ex.options[x], ex.options[y]))
                      err(gid, "opciones indistinguibles (" + ex.options[x] + "/" + ex.options[y] + "): " + tag);
              }
            }
          }
          if (ex.type === "true_false") {
            if (typeof ex.answer !== "boolean") err(gid, "answer no booleano: " + tag);
            if (!ex.statement) err(gid, "statement vacío: " + tag);
            /* ni un solo guión bajo debe sobrevivir: sería un hueco a medio rellenar */
            if (ex.statement && ex.statement.indexOf("_") >= 0) err(gid, "hueco sin rellenar (" + ex.statement + "): " + tag);
          }
          if (ex.type === "word_order") {
            if (!ex.words || !ex.correctOrder || ex.words.length !== ex.correctOrder.length)
              err(gid, "word_order descuadrado: " + tag);
            else {
              var bag = {}, w;
              for (w = 0; w < ex.words.length; w++) bag[ex.words[w]] = (bag[ex.words[w]] || 0) + 1;
              for (w = 0; w < ex.correctOrder.length; w++) {
                if (!bag[ex.correctOrder[w]]) { err(gid, "word_order irresoluble: " + tag); break; }
                bag[ex.correctOrder[w]]--;
              }
            }
          }
          if (ex.type === "translate") {
            if (!ex.answers || !ex.answers.length) err(gid, "translate sin respuestas: " + tag);
            /* jamás pedir español escrito: norm() no pliega acentos */
            for (var ai = 0; ai < (ex.answers || []).length; ai++)
              if (/[ñáéíóú]/.test(ex.answers[ai]))
                err(gid, "respuesta escrita con acentos (imposible de acertar): " + tag);
          }
        }
      }
    });

    /* la reja de aridad se cumple */
    for (var i2 = 0; i2 < c.b1.length; i2++) {
      var cd = c.lex[c.b1[i2].li];
      if (c.esIdx[cd.ns].length !== 1) err("b1", "reja rota b1: " + cd.es);
    }
    for (var i3 = 0; i3 < c.b2.length; i3++) {
      var cd2 = c.lex[c.b2[i3].li];
      if (c.enIdx[cd2.ne].length !== 1) err("b2", "reja rota b2: " + cd2.en);
    }

    return { generados: total, porGenerador: counts, erroresPorGenerador: byGen, poolTotal: poolSize(),
             lexico: c.lex.length, errores: errs.length, detalle: errs.slice(0, 80) };
  }

  return {
    buildSession: buildSession,
    grade: grade,
    dueCount: dueCount,
    poolSize: poolSize,
    roundsToday: roundsToday,
    noteRound: noteRound,
    bestToday: bestToday,
    stats: stats,
    audit: audit,
    GENS: GENS,
    _corpus: function () { return buildCorpus(); }
  };
})();
