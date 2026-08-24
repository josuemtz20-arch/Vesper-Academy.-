/* ============================================================================
   Vesper Academy — Listening Practice engine (audio library)
   ----------------------------------------------------------------------------
   Builds interactive activities for ANY audio track straight from the data the
   track already carries: its transcript and its vocabulary list. Nothing is
   invented — every answer is lifted from the transcript, so the key is correct
   by construction across all 236 tracks in the library.

   NOTE: this is NOT vesper_activities.js. That file is the hand-authored
   activity bank consumed by leccion.html's gamified lesson engine. This one
   only serves the audio player (lesson.html) and generates its exercises at
   runtime. The exercise types below intentionally mirror that engine's
   vocabulary so the app stays coherent:
       matching        -> Vocabulary Match
       multiple_choice -> Listen & Complete  /  Who Says It?
       word_order      -> Put It In Order
       listening       -> Dictation

   Public API
     VesperAudioPractice.mount(container, {
        transcript : HTML string (lines separated by <br>, <strong> headers ok)
        vocab      : [{term, def}]
        seed       : stable string id for this track (shuffling + saved score)
        onCount    : optional callback(activityCount)
     })  ->  number of activities mounted (0 = nothing to practise)
   ========================================================================== */
(function () {
  "use strict";

  /* ---------------------------------------------------------------- utils */

  // Deterministic PRNG: a track always shuffles the same way, so a teacher can
  // say "question 3" and every student is looking at the same question 3.
  function hashStr(s) {
    var h = 2166136261 >>> 0;
    for (var i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 16777619) >>> 0;
    }
    return h >>> 0;
  }
  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function shuffle(arr, rnd) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(rnd() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  function stripTags(s) {
    return String(s == null ? "" : s).replace(/<[^>]*>/g, "");
  }
  function decode(s) {
    var d = document.createElement("textarea");
    d.innerHTML = s;
    return d.value;
  }
  function clean(s) {
    return decode(stripTags(s)).replace(/\s+/g, " ").trim();
  }
  // Normalised comparison for dictation: case-, punctuation- and spacing-free.
  // Apostrophes are dropped too (don't = dont = don’t): the task is hearing the
  // line, not placing punctuation, and phone keyboards fight the curly quote.
  function norm(s) {
    return clean(s).toLowerCase()
      // apostrophes are DELETED, not spaced out, so "o'clock" stays one word
      // and "don't" / "dont" / "don’t" all compare equal
      .replace(/['’‘´`]/g, "")
      .replace(/[^a-z0-9 ]+/g, " ").replace(/\s+/g, " ").trim();
  }
  function words(s) { var w = norm(s).split(" "); return w[0] === "" ? [] : w; }
  function reEsc(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }

  /* ------------------------------------------------------- transcript parse */

  // Sentence splitter (no lookbehind, for older mobile browsers). Used to break
  // narration into workable units — Levels 5–6 are monologue podcasts stored as
  // three huge paragraphs, which would otherwise yield no exercises at all.
  function splitSentences(text) {
    var out = [], buf = "";
    for (var i = 0; i < text.length; i++) {
      buf += text[i];
      if (/[.!?]/.test(text[i])) {
        // look ahead: end the sentence only on whitespace + a capital / quote
        var rest = text.slice(i + 1);
        if (!rest || /^\s+["“'A-Z]/.test(rest)) {
          if (buf.trim()) out.push(buf.trim());
          buf = "";
        }
      }
    }
    if (buf.trim()) out.push(buf.trim());
    return out;
  }

  // Splits the stored transcript HTML into lines, dropping the
  // <strong>PART 1: ...</strong> style section headers. A dialogue turn stays
  // whole (it is one speech act); unlabelled narration is cut into sentences.
  var LONG_LINE = 26; // words — above this, narration is split
  function parseTranscript(html) {
    if (!html) return [];
    var raw = String(html).split(/<br\s*\/?>/i);
    var out = [];
    raw.forEach(function (chunk) {
      var isHeader = /^\s*<strong>[\s\S]*<\/strong>\s*$/i.test(chunk.trim());
      var text = clean(chunk);
      if (!text || isHeader) return;
      // "Sarah: John, wake up!"  ->  speaker + line
      var m = text.match(/^([A-Z][A-Za-z .'-]{0,24}?)\s*:\s*(.+)$/);
      var speaker = (m && m[2].length > 1) ? m[1].trim() : null;
      var body = speaker ? m[2].trim() : text;
      // A long turn is split into sentences too — the speaker still said each
      // one, and exam monologues store 30-word turns that no exercise can use.
      if (words(body).length > LONG_LINE) {
        var parts = splitSentences(body).filter(function (s) { return words(s).length >= 3; });
        if (parts.length > 1) {
          parts.forEach(function (s) { out.push({ speaker: speaker, text: s }); });
          return;
        }
      }
      out.push({ speaker: speaker, text: body });
    });
    return out;
  }

  var STOP = ("the a an and or but so if then that this these those there here of to in on at " +
    "for with from by is are was were be been being am do does did done have has had " +
    "i you he she it we they me him her us them my your his its our their not no yes " +
    "what when where who why how very just too also can could will would shall should " +
    "may might must about into over under again more most some any all one two out up " +
    "down now well okay oh hmm yeah right good time day get got go going come").split(" ");
  var STOPSET = {};
  STOP.forEach(function (w) { STOPSET[w] = 1; });
  function isContentWord(w) {
    return w.length >= 4 && !STOPSET[w] && !/^\d+$/.test(w);
  }

  /* ------------------------------------------------------------ generators */

  // 1. Vocabulary match — only words that actually carry a definition.
  function buildMatch(vocab, rnd) {
    var pool = (vocab || []).filter(function (v) {
      return v && clean(v.term) && clean(v.def) && clean(v.def).length > 2;
    });
    if (pool.length < 4) return null;
    var picked = shuffle(pool, rnd).slice(0, Math.min(6, pool.length));
    return {
      type: "matching",
      title: "Vocabulary Match",
      icon: "fa-link",
      instruction: "Tap a word, then tap its meaning.",
      pairs: picked.map(function (v, i) {
        return { id: i, term: clean(v.term), def: clean(v.def) };
      })
    };
  }

  // 2. Gap-fill. Prefers blanking a vocabulary word; falls back to a
  //    distinctive content word so tracks without vocabulary still practise.
  function buildGapFill(lines, vocab, rnd) {
    var terms = (vocab || []).map(function (v) { return clean(v.term); })
      .filter(function (t) { return t && /^[A-Za-z][A-Za-z' -]*$/.test(t) && t.length >= 3; });
    var items = [], used = {};

    shuffle(lines, rnd).forEach(function (ln) {
      if (items.length >= 6) return;
      var wc = words(ln.text).length;
      if (wc < 5 || wc > 24) return;
      for (var i = 0; i < terms.length; i++) {
        var t = terms[i];
        if (used[t.toLowerCase()]) continue;
        var re = new RegExp("\\b" + reEsc(t) + "\\b", "i");
        var m = ln.text.match(re);
        if (!m) continue;
        used[t.toLowerCase()] = 1;
        items.push({ sentence: ln.text.replace(re, " _____ "), answer: m[0], speaker: ln.speaker });
        return;
      }
    });

    if (items.length < 4) {
      shuffle(lines, rnd).forEach(function (ln) {
        if (items.length >= 5) return;
        var ws = words(ln.text);
        if (ws.length < 6 || ws.length > 24) return;
        var cands = ws.filter(isContentWord);
        if (!cands.length) return;
        var pick = cands[Math.floor(rnd() * cands.length)];
        if (used[pick]) return;
        var re = new RegExp("\\b" + reEsc(pick) + "\\b", "i");
        var m = ln.text.match(re);
        if (!m) return;
        used[pick] = 1;
        items.push({ sentence: ln.text.replace(re, " _____ "), answer: m[0], speaker: ln.speaker });
      });
    }
    if (items.length < 3) return null;

    var answersLC = items.map(function (it) { return it.answer.toLowerCase(); });
    var extra = [];
    lines.forEach(function (ln) {
      words(ln.text).forEach(function (w) {
        if (isContentWord(w) && extra.indexOf(w) < 0 && answersLC.indexOf(w) < 0) extra.push(w);
      });
    });
    extra = shuffle(extra, rnd);

    items.forEach(function (it) {
      var opts = [it.answer];
      var has = function (v) {
        return opts.some(function (o) { return o.toLowerCase() === v.toLowerCase(); });
      };
      items.forEach(function (o2) { if (opts.length < 4 && !has(o2.answer)) opts.push(o2.answer); });
      for (var k = 0; k < extra.length && opts.length < 4; k++) {
        if (!has(extra[k])) opts.push(extra[k]);
      }
      it.options = shuffle(opts, rnd);
    });

    return {
      type: "multiple_choice",
      title: "Listen &amp; Complete",
      icon: "fa-pen-to-square",
      instruction: "Play the audio, then choose the missing word.",
      items: items.slice(0, 6)
    };
  }

  // 3. Who says it? — needs a genuine multi-speaker dialogue.
  function buildWhoSaid(lines, rnd) {
    var spoken = lines.filter(function (l) { return l.speaker && words(l.text).length >= 4; });
    if (spoken.length < 4) return null;
    var counts = {}, names = [];
    spoken.forEach(function (l) {
      counts[l.speaker] = (counts[l.speaker] || 0) + 1;
      if (names.indexOf(l.speaker) < 0) names.push(l.speaker);
    });
    names = names.filter(function (n) { return counts[n] >= 2; });
    if (names.length < 2) return null;
    var opts = names.slice(0, 4);
    var picked = shuffle(spoken.filter(function (l) { return opts.indexOf(l.speaker) >= 0; }), rnd)
      .slice(0, 5);
    if (picked.length < 3) return null;
    return {
      type: "multiple_choice",
      title: "Who Says It?",
      icon: "fa-comments",
      instruction: "Who says each line?",
      items: picked.map(function (l) {
        return { sentence: "“" + l.text + "”", answer: l.speaker, options: shuffle(opts, rnd) };
      })
    };
  }

  // 4. Re-order a run of consecutive lines.
  function buildOrder(lines, rnd) {
    var idx = [];
    lines.forEach(function (l, i) {
      var n = words(l.text).length;
      if (n >= 3 && n <= 24) idx.push(i);
    });
    if (idx.length < 4) return null;
    var runs = [], cur = [idx[0]];
    for (var i = 1; i < idx.length; i++) {
      if (idx[i] === idx[i - 1] + 1) cur.push(idx[i]);
      else { runs.push(cur); cur = [idx[i]]; }
    }
    runs.push(cur);
    runs = runs.filter(function (r) { return r.length >= 4; });
    if (!runs.length) return null;
    var run = runs[Math.floor(rnd() * runs.length)];
    var start = run.length > 5 ? Math.floor(rnd() * (run.length - 5 + 1)) : 0;
    var chosen = run.slice(start, start + Math.min(5, run.length)).map(function (i2) { return lines[i2]; });
    var correct = chosen.map(function (l, i3) {
      return { pos: i3, label: (l.speaker ? l.speaker + ": " : "") + l.text };
    });
    return {
      type: "word_order",
      title: "Put It In Order",
      icon: "fa-arrow-down-1-9",
      instruction: "Tap the lines in the order you hear them, then check.",
      lines: shuffle(correct, rnd),
      total: correct.length
    };
  }

  // 5. Dictation — short lines only, so it stays achievable.
  function buildDictation(lines, rnd) {
    var pool = lines.filter(function (l) {
      var n = words(l.text).length;
      return n >= 4 && n <= 11 && /[a-z]/i.test(l.text);
    });
    if (pool.length < 2) return null;
    var picked = shuffle(pool, rnd).slice(0, 3);
    return {
      type: "listening",
      title: "Dictation",
      icon: "fa-keyboard",
      instruction: "Play the audio and type the line exactly. Spelling counts — punctuation does not.",
      items: picked.map(function (l) {
        return { answer: l.text, speaker: l.speaker, hint: words(l.text).length + " words" };
      })
    };
  }

  function build(opts) {
    var seed = String((opts && opts.seed) || "vesper");
    var rnd = mulberry32(hashStr(seed));
    var lines = parseTranscript(opts && opts.transcript);
    var vocab = (opts && opts.vocab) || [];
    var acts = [];
    [buildMatch(vocab, rnd),
     buildGapFill(lines, vocab, rnd),
     buildWhoSaid(lines, rnd),
     buildOrder(lines, rnd),
     buildDictation(lines, rnd)].forEach(function (a) { if (a) acts.push(a); });
    return acts;
  }

  /* ------------------------------------------------------------- styling */

  var CSS = [
    ".vp-wrap{display:flex;flex-direction:column;gap:18px}",
    ".vp-head{display:flex;align-items:center;justify-content:space-between;gap:14px;flex-wrap:wrap;",
    "border-bottom:1px solid var(--border,#e4e0d8);padding-bottom:14px}",
    ".vp-head h3{margin:0;font-size:1.05rem;color:var(--navy,#1B1B2F);display:flex;align-items:center;gap:9px;flex-wrap:wrap}",
    ".vp-head h3 i{color:var(--gold,#c5a059)}",
    ".vp-sub{font-weight:400;color:var(--muted,#6b7a8d);font-size:.82rem}",
    ".vp-score{display:flex;align-items:center;gap:10px;flex-wrap:wrap}",
    ".vp-chip{background:var(--navy,#1B1B2F);color:#fff;border-radius:20px;padding:5px 14px;",
    "font-size:0.74rem;font-weight:700;letter-spacing:.4px}",
    ".vp-chip b{color:var(--gold-lt,#d9bd84)}",
    ".vp-btn{border:1px solid var(--border,#e4e0d8);background:#fff;color:var(--navy,#1B1B2F);",
    "border-radius:20px;padding:6px 14px;font-size:0.74rem;font-weight:600;cursor:pointer;",
    "font-family:inherit;display:inline-flex;align-items:center;gap:7px;transition:.18s}",
    ".vp-btn:hover:not(:disabled){border-color:var(--gold,#c5a059);transform:translateY(-1px)}",
    ".vp-btn:disabled{opacity:.5;cursor:default}",
    ".vp-btn.primary{background:var(--gold,#c5a059);border-color:var(--gold,#c5a059);color:var(--navy,#1B1B2F)}",
    ".vp-btn.primary:hover:not(:disabled){background:var(--gold-lt,#d9bd84)}",
    ".vp-act{border:1px solid var(--border,#e4e0d8);border-radius:14px;padding:20px 22px;background:#fff}",
    ".vp-act.done{border-color:#2D9E75;box-shadow:0 0 0 1px rgba(45,158,117,.18)}",
    ".vp-act-h{display:flex;align-items:center;gap:10px;margin-bottom:4px;flex-wrap:wrap}",
    ".vp-n{width:26px;height:26px;border-radius:50%;background:var(--navy,#1B1B2F);color:var(--gold-lt,#d9bd84);",
    "display:flex;align-items:center;justify-content:center;font-size:0.76rem;font-weight:700;flex:0 0 auto}",
    ".vp-act-h h4{margin:0;font-size:0.95rem;color:var(--navy,#1B1B2F);font-weight:700}",
    ".vp-tally{margin-left:auto;font-size:0.74rem;color:var(--muted,#6b7a8d);font-weight:600}",
    ".vp-inst{margin:0 0 16px 36px;font-size:0.82rem;color:var(--muted,#6b7a8d)}",
    "@media(max-width:640px){.vp-inst{margin-left:0}}",
    ".vp-match{display:grid;grid-template-columns:1fr 1fr;gap:10px 18px}",
    "@media(max-width:640px){.vp-match{grid-template-columns:1fr}}",
    ".vp-col{display:flex;flex-direction:column;gap:8px}",
    ".vp-col-h{font-size:0.68rem;letter-spacing:1.4px;text-transform:uppercase;color:var(--muted,#6b7a8d);font-weight:700}",
    ".vp-tile{border:1px solid var(--border,#e4e0d8);border-radius:10px;padding:10px 13px;cursor:pointer;",
    "font-size:0.86rem;background:#fff;text-align:left;font-family:inherit;color:var(--navy,#1B1B2F);transition:.15s}",
    ".vp-tile:hover:not(.ok){border-color:var(--gold,#c5a059)}",
    ".vp-tile.sel{border-color:var(--navy,#1B1B2F);background:#f3f5f9;box-shadow:0 0 0 2px rgba(27,27,47,.08)}",
    ".vp-tile.ok{border-color:#2D9E75;background:#ecf8f0;color:#1d6d50;cursor:default}",
    ".vp-tile.bad{border-color:#C0392B;background:#fdeeec;animation:vpshake .3s}",
    "@keyframes vpshake{25%{transform:translateX(-4px)}75%{transform:translateX(4px)}}",
    ".vp-q{padding:13px 0;border-top:1px dashed var(--border,#e4e0d8)}",
    ".vp-q:first-child{border-top:0;padding-top:0}",
    ".vp-qs{font-size:0.9rem;margin:0 0 10px;color:var(--navy,#1B1B2F);line-height:1.65}",
    ".vp-who{color:var(--muted,#6b7a8d);font-weight:600}",
    ".vp-opts{display:flex;flex-wrap:wrap;gap:8px}",
    ".vp-opt{border:1px solid var(--border,#e4e0d8);background:#fff;border-radius:20px;padding:7px 15px;",
    "font-size:0.82rem;cursor:pointer;font-family:inherit;color:var(--navy,#1B1B2F);transition:.15s}",
    ".vp-opt:hover:not(:disabled){border-color:var(--gold,#c5a059)}",
    ".vp-opt.ok{border-color:#2D9E75;background:#ecf8f0;color:#1d6d50;font-weight:700}",
    ".vp-opt.bad{border-color:#C0392B;background:#fdeeec;color:#a5281b}",
    ".vp-opt:disabled{cursor:default}",
    ".vp-order{display:flex;flex-direction:column;gap:8px}",
    ".vp-oline{display:flex;align-items:flex-start;gap:11px;border:1px solid var(--border,#e4e0d8);",
    "border-radius:10px;padding:10px 13px;cursor:pointer;font-size:0.86rem;background:#fff;",
    "text-align:left;font-family:inherit;color:var(--navy,#1B1B2F);line-height:1.5;transition:.15s;width:100%}",
    ".vp-oline:hover:not(:disabled){border-color:var(--gold,#c5a059)}",
    ".vp-badge{flex:0 0 auto;width:22px;height:22px;border-radius:50%;font-size:0.7rem;font-weight:700;",
    "display:flex;align-items:center;justify-content:center;background:#eef0f4;color:var(--muted,#6b7a8d)}",
    ".vp-oline.picked .vp-badge{background:var(--navy,#1B1B2F);color:var(--gold-lt,#d9bd84)}",
    ".vp-oline.ok{border-color:#2D9E75;background:#ecf8f0}",
    ".vp-oline.bad{border-color:#C0392B;background:#fdeeec}",
    ".vp-dict{display:flex;flex-direction:column;gap:16px}",
    ".vp-dline{display:flex;flex-direction:column;gap:7px}",
    ".vp-dmeta{font-size:0.74rem;color:var(--muted,#6b7a8d);font-weight:600}",
    ".vp-in{border:1px solid var(--border,#e4e0d8);border-radius:10px;padding:10px 13px;font-size:0.88rem;",
    "font-family:inherit;color:var(--navy,#1B1B2F);width:100%}",
    ".vp-in:focus{outline:none;border-color:var(--gold,#c5a059);box-shadow:0 0 0 3px rgba(197,160,89,.15)}",
    ".vp-in.ok{border-color:#2D9E75;background:#ecf8f0}",
    ".vp-in.bad{border-color:#C0392B;background:#fdeeec}",
    ".vp-sol{font-size:0.8rem;color:#1d6d50;margin:0}",
    ".vp-sol.bad{color:#a5281b}",
    ".vp-foot{display:flex;gap:10px;align-items:center;margin-top:14px;flex-wrap:wrap}",
    ".vp-fb{font-size:0.8rem;font-weight:600}",
    ".vp-fb.ok{color:#1d6d50}.vp-fb.bad{color:#a5281b}",
    ".vp-empty{text-align:center;color:var(--muted,#6b7a8d);padding:34px 10px;font-size:0.9rem;line-height:1.7}",
    ".vp-empty i{font-size:1.8rem;color:var(--border,#e4e0d8);display:block;margin-bottom:12px}"
  ].join("");

  function injectCSS() {
    if (document.getElementById("vesper-audio-practice-css")) return;
    var s = document.createElement("style");
    s.id = "vesper-audio-practice-css";
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  /* ------------------------------------------------------------- storage */

  var SKEY = "vesper_practice_v1";
  function loadAll() {
    try { return JSON.parse(localStorage.getItem(SKEY) || "{}"); } catch (e) { return {}; }
  }
  function saveScore(seed, got, total) {
    try {
      var all = loadAll();
      var prev = all[seed];
      // keep the student's best run
      if (!prev || !prev.total || got / total >= prev.got / prev.total) {
        all[seed] = { got: got, total: total, at: Date.now() };
        localStorage.setItem(SKEY, JSON.stringify(all));
      }
    } catch (e) {}
  }
  function getScore(seed) { return loadAll()[seed] || null; }

  /* ------------------------------------------------------------ rendering */

  function mount(host, opts) {
    if (!host) return 0;
    injectCSS();
    opts = opts || {};
    var seed = String(opts.seed || "vesper");
    var acts = build(opts);
    host.innerHTML = "";

    if (!acts.length) {
      host.innerHTML = '<div class="vp-empty"><i class="fas fa-dumbbell"></i>' +
        "No practice activities for this track yet.<br>They appear automatically once the track has a transcript.</div>";
      if (opts.onCount) opts.onCount(0);
      return 0;
    }

    var totalQ = acts.reduce(function (n, a) {
      return n + (a.type === "matching" ? a.pairs.length
                : a.type === "word_order" ? 1
                : a.items.length);
    }, 0);
    var state = { got: 0, answered: 0 };

    var wrap = document.createElement("div");
    wrap.className = "vp-wrap";

    var head = document.createElement("div");
    head.className = "vp-head";
    var prev = getScore(seed);
    head.innerHTML =
      '<h3><i class="fas fa-dumbbell"></i>Practice <span class="vp-sub">' +
      acts.length + " activities · " + totalQ + " questions</span></h3>" +
      '<div class="vp-score">' +
      (prev ? '<span class="vp-chip">Best <b>' + prev.got + "/" + prev.total + "</b></span>" : "") +
      '<span class="vp-chip">Score <b><span id="vp-got">0</span>/' + totalQ + "</b></span>" +
      '<button class="vp-btn" id="vp-reset" type="button"><i class="fas fa-rotate-left"></i> Start again</button>' +
      "</div>";
    wrap.appendChild(head);

    function bump(ok) {
      state.answered++;
      if (ok) state.got++;
      var g = wrap.querySelector("#vp-got");
      if (g) g.textContent = state.got;
      if (state.answered >= totalQ) saveScore(seed, state.got, totalQ);
    }

    acts.forEach(function (a, i) {
      var box = document.createElement("div");
      box.className = "vp-act";
      var h = document.createElement("div");
      h.className = "vp-act-h";
      h.innerHTML = '<span class="vp-n">' + (i + 1) + "</span>" +
        '<h4><i class="fas ' + a.icon + '" style="color:var(--gold,#c5a059);margin-right:7px"></i>' + a.title + "</h4>" +
        '<span class="vp-tally"></span>';
      box.appendChild(h);
      var inst = document.createElement("p");
      inst.className = "vp-inst";
      inst.innerHTML = a.instruction;
      box.appendChild(inst);
      var body = document.createElement("div");
      box.appendChild(body);

      var tally = h.querySelector(".vp-tally");
      var localGot = 0, localDone = 0;
      var localTotal = a.type === "matching" ? a.pairs.length
                     : a.type === "word_order" ? 1 : a.items.length;
      function localMark(ok) {
        localDone++; if (ok) localGot++;
        tally.textContent = localGot + "/" + localTotal;
        if (localDone >= localTotal) box.classList.add("done");
        bump(ok);
      }

      if (a.type === "matching") renderMatch(body, a, localMark);
      else if (a.type === "multiple_choice") renderMCQ(body, a, localMark);
      else if (a.type === "word_order") renderOrder(body, a, localMark);
      else if (a.type === "listening") renderDictation(body, a, localMark);

      wrap.appendChild(box);
    });

    host.appendChild(wrap);
    var reset = wrap.querySelector("#vp-reset");
    if (reset) reset.addEventListener("click", function () { mount(host, opts); });
    if (opts.onCount) opts.onCount(acts.length);
    return acts.length;
  }

  function renderMatch(body, a, mark) {
    var grid = document.createElement("div");
    grid.className = "vp-match";
    var lc = document.createElement("div"); lc.className = "vp-col";
    var rc = document.createElement("div"); rc.className = "vp-col";
    lc.innerHTML = '<span class="vp-col-h">Word</span>';
    rc.innerHTML = '<span class="vp-col-h">Meaning</span>';
    var rnd = mulberry32(hashStr(a.pairs.map(function (p) { return p.term; }).join("|")));
    var defs = shuffle(a.pairs, rnd);
    var selTerm = null;

    a.pairs.forEach(function (p) {
      var b = document.createElement("button");
      b.className = "vp-tile"; b.type = "button";
      b.textContent = p.term; b.dataset.id = String(p.id);
      b.addEventListener("click", function () {
        if (b.classList.contains("ok")) return;
        lc.querySelectorAll(".vp-tile").forEach(function (x) { x.classList.remove("sel"); });
        b.classList.add("sel"); selTerm = b;
      });
      lc.appendChild(b);
    });
    defs.forEach(function (p) {
      var b = document.createElement("button");
      b.className = "vp-tile"; b.type = "button";
      b.textContent = p.def; b.dataset.id = String(p.id);
      b.addEventListener("click", function () {
        if (b.classList.contains("ok") || !selTerm) return;
        var ok = selTerm.dataset.id === b.dataset.id;
        if (ok) {
          selTerm.classList.remove("sel"); selTerm.classList.add("ok"); b.classList.add("ok");
          selTerm = null; mark(true);
        } else {
          b.classList.add("bad");
          var s = selTerm;
          setTimeout(function () { b.classList.remove("bad"); s.classList.remove("sel"); }, 350);
          selTerm = null; mark(false);
        }
      });
      rc.appendChild(b);
    });
    grid.appendChild(lc); grid.appendChild(rc);
    body.appendChild(grid);
  }

  function renderMCQ(body, a, mark) {
    a.items.forEach(function (it) {
      var q = document.createElement("div");
      q.className = "vp-q";
      var who = it.speaker ? '<span class="vp-who">' + esc(it.speaker) + ": </span>" : "";
      q.innerHTML = '<p class="vp-qs">' + who + esc(it.sentence) + "</p>";
      var opts = document.createElement("div");
      opts.className = "vp-opts";
      it.options.forEach(function (o) {
        var b = document.createElement("button");
        b.className = "vp-opt"; b.type = "button"; b.textContent = o;
        b.addEventListener("click", function () {
          if (opts.dataset.done) return;
          opts.dataset.done = "1";
          var ok = norm(o) === norm(it.answer);
          opts.querySelectorAll(".vp-opt").forEach(function (x) {
            x.disabled = true;
            if (norm(x.textContent) === norm(it.answer)) x.classList.add("ok");
          });
          if (!ok) b.classList.add("bad");
          mark(ok);
        });
        opts.appendChild(b);
      });
      q.appendChild(opts);
      body.appendChild(q);
    });
  }

  function renderOrder(body, a, mark) {
    var list = document.createElement("div");
    list.className = "vp-order";
    var picks = [];
    var check;
    a.lines.forEach(function (l) {
      var b = document.createElement("button");
      b.className = "vp-oline"; b.type = "button";
      b.innerHTML = '<span class="vp-badge"></span><span>' + esc(l.label) + "</span>";
      b.dataset.pos = String(l.pos);
      b.addEventListener("click", function () {
        if (list.dataset.done) return;
        if (b.classList.contains("picked")) {
          var at = picks.indexOf(b);
          if (at >= 0) picks.splice(at, 1);
          b.classList.remove("picked");
        } else {
          picks.push(b);
          b.classList.add("picked");
        }
        list.querySelectorAll(".vp-oline .vp-badge").forEach(function (x) { x.textContent = ""; });
        picks.forEach(function (x, i) { x.querySelector(".vp-badge").textContent = String(i + 1); });
        check.disabled = picks.length !== a.total;
      });
      list.appendChild(b);
    });
    body.appendChild(list);

    var foot = document.createElement("div");
    foot.className = "vp-foot";
    check = document.createElement("button");
    check.className = "vp-btn primary"; check.type = "button"; check.disabled = true;
    check.innerHTML = '<i class="fas fa-check"></i> Check order';
    var fb = document.createElement("span");
    fb.className = "vp-fb";
    check.addEventListener("click", function () {
      if (list.dataset.done) return;
      list.dataset.done = "1";
      check.disabled = true;
      var ok = picks.every(function (b, i) { return parseInt(b.dataset.pos, 10) === i; });
      picks.forEach(function (b, i) {
        b.classList.add(parseInt(b.dataset.pos, 10) === i ? "ok" : "bad");
      });
      if (!ok) {
        list.querySelectorAll(".vp-oline").forEach(function (b) {
          b.querySelector(".vp-badge").textContent = String(parseInt(b.dataset.pos, 10) + 1);
        });
        fb.className = "vp-fb bad";
        fb.textContent = "Not quite — the numbers now show the real order.";
      } else {
        fb.className = "vp-fb ok";
        fb.textContent = "Perfect order.";
      }
      list.querySelectorAll(".vp-oline").forEach(function (b) { b.disabled = true; });
      mark(ok);
    });
    foot.appendChild(check); foot.appendChild(fb);
    body.appendChild(foot);
  }

  function renderDictation(body, a, mark) {
    var box = document.createElement("div");
    box.className = "vp-dict";
    a.items.forEach(function (it, i) {
      var row = document.createElement("div");
      row.className = "vp-dline";
      var meta = document.createElement("span");
      meta.className = "vp-dmeta";
      meta.textContent = "Line " + (i + 1) + (it.speaker ? " · " + it.speaker : "") + " · " + it.hint;
      var inp = document.createElement("input");
      inp.className = "vp-in"; inp.type = "text";
      inp.placeholder = "Type what you hear…";
      inp.setAttribute("autocomplete", "off");
      inp.setAttribute("spellcheck", "false");
      var sol = document.createElement("p");
      sol.className = "vp-sol"; sol.style.display = "none";
      var btn = document.createElement("button");
      btn.className = "vp-btn"; btn.type = "button";
      btn.innerHTML = '<i class="fas fa-check"></i> Check';
      function doCheck() {
        if (row.dataset.done) return;
        row.dataset.done = "1";
        var ok = norm(inp.value) === norm(it.answer);
        inp.classList.add(ok ? "ok" : "bad");
        inp.disabled = true; btn.disabled = true;
        sol.style.display = "";
        sol.className = "vp-sol" + (ok ? "" : " bad");
        sol.textContent = ok ? "✓ Exactly right."
                             : "✗ The line was: “" + it.answer + "”";
        mark(ok);
      }
      btn.addEventListener("click", doCheck);
      inp.addEventListener("keydown", function (e) { if (e.key === "Enter") doCheck(); });
      var foot = document.createElement("div");
      foot.className = "vp-foot";
      foot.appendChild(btn);
      row.appendChild(meta); row.appendChild(inp); row.appendChild(foot); row.appendChild(sol);
      box.appendChild(row);
    });
    body.appendChild(box);
  }

  window.VesperAudioPractice = {
    build: build, mount: mount, getScore: getScore, parse: parseTranscript
  };
})();
