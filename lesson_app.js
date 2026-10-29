// lesson_app.js — el reproductor de lesson.html. Salio del <script> en
// linea el 2026-10-29 para cachearse; lo carga el cargador por ruta de
// lesson.html, despues de los datos que esa ruta necesita.
        // ── PARAMS ────────────────────────────────────────────────────
        const params = new URLSearchParams(location.search);
        const isDiag = params.get("diag") !== null;
        const lvl = parseInt(params.get("level") || "1", 10);
        const les = parseInt(params.get("lesson") || "1", 10);
        const DATA = window.VESPER_DATA || {};

        const isBasics = params.get("basics") !== null;  // Core Basics dialogue lessons
        const isCustom = !isBasics && params.get("audio") !== null;   // generic audio (e.g. Business English)
        let title, bannerTag, icon, vocab, audioSrc, crumbText, aSub, coverSeed, showPhoto = false;
        // Identifica la lista de vocabulario que se esta mostrando. Sirve para
        // pedir el ejemplo correcto cuando un mismo termino aparece en dos
        // cursos con sentidos distintos ("step down" en Basics no es el "step
        // down" de un ministro). Vease vesper_vocab_examples.js.
        let deckKey = "";
        let basicsLesson = null;
        let customVariants = [], curKey = "", practiceModel = null;
        if (isBasics) {
            const bl = parseInt(params.get("basics") || "1", 10);
            const bn = parseInt(params.get("lesson") || "1", 10);
            const BD = window.BASICS_LESSONS || {};
            const blv = BD[bl] || BD[String(bl)];
            basicsLesson = blv ? (blv.lessons[bn] || blv.lessons[String(bn)]) : null;
            title = basicsLesson ? basicsLesson.title : `Lesson ${bn}`;
            bannerTag = `Core Basics ${bl} · ${blv ? blv.tag : ""}`;
            // same themed icon + cover seed the audio hub card uses, so art matches
            icon = window.VesperCovers ? VesperCovers.iconFor(title, blv ? blv.icon : "fa-seedling") : (blv ? blv.icon : "fa-seedling");
            coverSeed = `B${bl}-${bn}`;
            vocab = basicsLesson ? (basicsLesson.vocab || []) : [];
            deckKey = `bas${bl}-${bn}`;
            audioSrc = `assets/audio/core_basics_level_${bl}_lesson_${bn}.mp3`;
            crumbText = `Basics ${bl} · Lesson ${bn}`;
            aSub = `${blv ? blv.tag : "Core Basics"} · Lesson ${bn} — dialogue (~1 min)`;
        } else if (isCustom) {
            // optional A/B versions for one lesson: ?variants=<JSON [{label,file},...]>
            try { customVariants = JSON.parse(params.get("variants") || "[]") || []; } catch(e) { customVariants = []; }
            if (!Array.isArray(customVariants)) customVariants = [];
            const f = params.get("audio") || (customVariants[0] && customVariants[0].file) || "";
            curKey = f.split("/").pop();
            title = params.get("title") || "Audio";
            bannerTag = params.get("sub") || "Vesper Audio";
            icon = params.get("icon") || "fa-headphones";
            vocab = (window.BUSINESS_VOCAB || {})[curKey] || [];
            deckKey = curKey;
            audioSrc = f.includes("/") ? f : `assets/audio/${f}`;
            crumbText = params.get("crumb") || bannerTag;
            aSub = bannerTag;
            coverSeed = curKey;
        } else if (isDiag) {
            const k = parseInt(params.get("diag") || "1", 10);
            title = `Diagnostic Track ${k}`; bannerTag = "Diagnostics"; icon = "fa-stethoscope";
            vocab = []; audioSrc = `assets/audio/exam/diagnostic_track${k}.mp3`;
            crumbText = `Diagnostics · Track ${k}`; aSub = "Diagnostic audio";
            coverSeed = `DIAG-${k}`;
        } else {
            const lv = DATA[lvl] || DATA[String(lvl)];
            const lesson = lv ? lv.lessons[les - 1] : null;
            title = lesson ? lesson.title : `Lesson ${les}`;
            const tag = lv ? lv.tag : "";
            icon = lesson ? lesson.icon : "fa-headphones";
            vocab = lesson ? (lesson.vocab || []) : [];
            deckKey = `cp${lvl}-${les}`;
            audioSrc = `assets/audio/core_practice_level_${lvl}_lesson_${les}.mp3`;
            curKey = audioSrc.split("/").pop();
            // every Practice lesson ships a second audio: the model roleplay dialogue
            if (lesson && lesson.model) {
                practiceModel = lesson.model;
                customVariants = [
                    { label: "Listening",      file: curKey },
                    { label: "Model dialogue", file: `core_practice_level_${lvl}_lesson_${les}_model.mp3` }
                ];
            }
            crumbText = `Level ${lvl} · ${tag} · Lesson ${les}`;
            bannerTag = `Level ${lvl} · ${tag}`;
            aSub = `Level ${lvl} · Lesson ${les} — full listening track`;
            coverSeed = `L${lvl}-${les}`;
            showPhoto = true;
        }

        // ── BANNER ────────────────────────────────────────────────────
        // URL params are untrusted: escape text and whitelist icon names before touching the DOM
        const esc = s => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
        if (!/^fa-[a-z0-9-]+$/.test(icon)) icon = "fa-headphones";
        document.title = `Vesper Academy | ${title}`;
        document.getElementById("crumb").innerHTML = esc(crumbText).replace(/(Level \d+)/, "<b>$1</b>");
        document.getElementById("banner-title").textContent = title;
        // Alimenta el héroe "Hoy" del portal: esta lección queda como última actividad.
        try {
            localStorage.setItem("vesper_last", JSON.stringify({
                href: "lesson.html" + location.search, title: title, kind: "lesson", ts: Date.now()
            }));
        } catch (e) {}
        const bannerTagIcon = isDiag ? "fa-stethoscope" : (isCustom ? icon : "fa-layer-group");
        document.getElementById("banner-tag").innerHTML = `<i class="fas ${bannerTagIcon}"></i> ${esc(bannerTag)}`;
        // player album art = the same deterministic cover the audio hub shows
        // (the banner keeps the brand navy background with the Vesper logo)
        if (window.VesperCovers && coverSeed) {
            const cov = VesperCovers.coverStyle(coverSeed);
            document.getElementById("a-art").style.cssText += cov.css;
            document.getElementById("a-eq").style.color = cov.accent;
            document.getElementById("a-art-medal").style.color = cov.accent;
        }
        document.getElementById("a-art-ghost").className = `fas ${icon} a-art-ghost`;
        document.getElementById("a-art-medal").innerHTML = `<i class="fas ${icon}"></i>`;
        document.getElementById("a-art-label").textContent = bannerTag;
        const themeArt = window.VesperCovers ? VesperCovers.artFor(coverSeed) : null;
        // optional real photo for the banner: assets/images/lessons/L{lvl}_lesson{les}.jpg
        // vesper_lesson_photos.js lista las que existen (lo genera
        // _scripts/build_lesson_photos.py y preflight lo vigila): sin la lista,
        // cada leccion pedia su foto y casi todas respondian 404.
        const photoName = `L${lvl}_lesson${les}.jpg`;
        if (showPhoto && (window.VESPER_LESSON_PHOTOS || []).indexOf(photoName) !== -1) {
            const photo = document.getElementById("banner-photo");
            photo.onload = () => { photo.style.display = "block"; };
            photo.onerror = () => { photo.remove(); };
            photo.src = `assets/images/lessons/${photoName}`;
        } else {
            document.getElementById("banner-photo").remove();
        }
        // player album art uses the same themed image (gradient shows if it fails)
        if (themeArt) {
            const card = document.getElementById("audio-card");
            const im = document.createElement("img");
            // eager, not lazy: this is the card's ground, not an illustration
            // further down the page, and a fade-in under the controls reads as
            // a glitch. `has-art` retires the placeholder glyph underneath.
            im.className = "a-art-img"; im.alt = ""; im.loading = "eager";
            im.onload = () => card.classList.add("has-art");
            im.onerror = () => { im.remove(); card.classList.remove("has-art"); };
            im.src = themeArt;
            document.getElementById("a-art").insertBefore(im, document.getElementById("a-eq"));
        }

        // ── TABS ──────────────────────────────────────────────────────
        function gotoTab(name){
            document.querySelectorAll(".tab").forEach(t => t.classList.toggle("active", t.dataset.panel === name));
            document.querySelectorAll(".panel").forEach(p => p.classList.toggle("active", p.id === "panel-" + name));
            document.body.classList.toggle("reading-mode", name === "reading");
            try{ if(window.speechSynthesis) speechSynthesis.cancel(); }catch(e){}
            if (name !== "practice" && window.VesperAudioPractice && VesperAudioPractice.stopClip) VesperAudioPractice.stopClip();
            var rsb = document.getElementById("r-speak");
            if(rsb){ rsb.classList.remove("speaking"); rsb.innerHTML = '<i class="fas fa-volume-high"></i> Escuchar'; }
            if (name === "board") {
                fitBoard();
                var wbf = document.getElementById("wb-frame");
                if (wbf && !wbf.src) wbf.src = "whiteboard/?embed=1"; // carga diferida de la Pizarra Virtual
            }
            if (name === "reading") layoutReading();
        }
        document.querySelectorAll(".tab").forEach(tab =>
            tab.addEventListener("click", () => gotoTab(tab.dataset.panel)));
        // ?tab=board abre la lección directamente en esa pestaña. Lo usa el
        // botón "Dar clase" de la biblioteca de audio: el profesor llega con la
        // Pizarra ya cargada en vez de buscarla delante de los alumnos.
        // El setTimeout NO es cosmético: gotoTab() llama a fitBoard(), que lee
        // el `const canvas` declarado más abajo en este mismo script. Llamarla
        // aquí mismo lanza un ReferenceError de zona muerta y se lleva por
        // delante TODO el resto del script de la lección.
        setTimeout(function(){
            const want = new URLSearchParams(location.search).get("tab");
            if (want && document.querySelector('.tab[data-panel="' + want + '"]')) gotoTab(want);
        }, 0);
        // hide the Vocabulary tab when this audio has no vocabulary list (diagnostics / business)
        if (!vocab.length) {
            const vt = document.querySelector('.tab[data-panel="vocab"]');
            if (vt) vt.style.display = "none";
        }

        // ── READING (paginated presentation view) ─────────────────────
        const readingTab = document.querySelector('.tab[data-panel="reading"]');
        const readingBody = document.getElementById("reading-body");
        const readingNav = document.getElementById("reading-nav");
        const pageInd = document.getElementById("r-page");
        let hasReading = false, chunks = [], pages = [], curPage = 0, readSize = 1.3;

        function buildChunks(html, label){
            const out = [];
            if (label) out.push({ type: "h", html: `<strong>${label}</strong>` });
            const lines = (html || "").split(/<br\s*\/?>/i);
            let para = [];
            const flush = () => { if (para.length){ out.push({ type: "p", html: para.join(" ") }); para = []; } };
            lines.forEach(ln => {
                const t = ln.trim();
                if (!t) { flush(); return; }
                if (/^<strong>[\s\S]*<\/strong>$/i.test(t)) { flush(); out.push({ type: "h", html: t }); }
                else para.push(t);
            });
            flush();
            return out;
        }
        function setupReading(){
            chunks = [];
            if (isBasics) {
                if (basicsLesson && basicsLesson.transcript)
                    chunks = chunks.concat(buildChunks(basicsLesson.transcript, null));
            } else if (isCustom) {
                // Business / Certification tracks: transcript keyed by mp3 filename
                const CT = window.CUSTOM_TRANSCRIPTS || {};
                if (CT[curKey]) chunks = chunks.concat(buildChunks(CT[curKey], null));
            } else if (practiceModel && /_model\.mp3$/.test(curKey)) {
                chunks = chunks.concat(buildChunks(practiceModel.transcript, null));
            } else {
                const RD = window.VESPER_READING || {};
                const entry = (!isDiag) ? ((RD[lvl] || RD[String(lvl)] || {})[les] || (RD[lvl] || {})[String(les)]) : null;
                if (entry && entry.reading)    chunks = chunks.concat(buildChunks(entry.reading, null));
                if (entry && entry.transcript) chunks = chunks.concat(buildChunks(entry.transcript, "Audio Transcript"));
            }
            hasReading = chunks.length > 0;
            readingTab.style.display = hasReading ? "" : "none";
        }
        setupReading();

        // ── PRACTICE (auto-generated activities) ──────────────────────
        // Same three sources as setupReading(), but we hand the raw transcript
        // HTML to the generator instead of paginating it. The dialogue is what
        // the exercises are built from, so it wins over the reading article.
        function currentTranscript(){
            if (isBasics) return (basicsLesson && basicsLesson.transcript) || "";
            if (isCustom) return (window.CUSTOM_TRANSCRIPTS || {})[curKey] || "";
            if (isDiag)   return "";
            const RD = window.VESPER_READING || {};
            const entry = (RD[lvl] || RD[String(lvl)] || {})[les] || (RD[lvl] || {})[String(les)];
            if (!entry) return "";
            return entry.transcript || entry.reading || "";
        }
        const practiceTab = document.querySelector('.tab[data-panel="practice"]');
        function setupPractice(){
            const host = document.getElementById("practice-host");
            if (!host || !window.VesperAudioPractice) {
                if (practiceTab) practiceTab.style.display = "none";
                return;
            }
            // Tracks with per-line timings (vesper_practice_clips.js) get
            // clip-based exercises: each question plays only its own line(s).
            // Always the Listening track, whichever A/B version is selected.
            const clipKey = (!isBasics && !isCustom && !isDiag)
                ? `core_practice_level_${lvl}_lesson_${les}.mp3` : "";
            const clips = clipKey ? (window.PRACTICE_CLIPS || {})[clipKey] : null;
            const n = VesperAudioPractice.mount(host, {
                transcript: currentTranscript(),
                vocab: vocab || [],
                seed: coverSeed || crumbText || title,
                clips: clips || null,
                clipSrc: clips ? `assets/audio/${clipKey}` : "",
                // a clip and the full track never talk over each other
                onClipStart: () => { try { audio.pause(); } catch (e) {} }
            });
            if (practiceTab) practiceTab.style.display = n > 0 ? "" : "none";
        }
        setupPractice();

        const renderChunk = c => c.type === "h" ? c.html : `<p>${c.html}</p>`;
        function paginate(){
            pages = []; if (!hasReading) { pages = [[]]; return; }
            let pc = [];
            for (const ch of chunks){
                pc.push(ch);
                readingBody.innerHTML = pc.map(renderChunk).join("");
                if (readingBody.scrollHeight > readingBody.clientHeight && pc.length > 1){
                    pc.pop(); pages.push(pc); pc = [ch];
                    readingBody.innerHTML = renderChunk(ch);
                }
            }
            if (pc.length) pages.push(pc);
            if (!pages.length) pages = [[]];
        }
        function renderPage(i){
            curPage = Math.max(0, Math.min(i, pages.length - 1));
            readingBody.innerHTML = pages[curPage].map(renderChunk).join("");
            pageInd.textContent = `Page ${curPage + 1} / ${pages.length}`;
            document.getElementById("r-prev").disabled = curPage === 0;
            document.getElementById("r-next").disabled = curPage === pages.length - 1;
            readingNav.style.display = pages.length > 1 ? "flex" : "none";
        }
        function layoutReading(){
            if (!hasReading) return;
            readingBody.style.setProperty("--read-size", readSize.toFixed(2) + "rem");
            const keep = curPage;
            // force reflow so clientHeight reflects the flex layout, then paginate
            void readingBody.offsetHeight;
            paginate();
            renderPage(Math.min(keep, pages.length - 1));
        }
        document.getElementById("r-prev").addEventListener("click", () => renderPage(curPage - 1));
        document.getElementById("r-next").addEventListener("click", () => renderPage(curPage + 1));
        document.getElementById("r-bigger").addEventListener("click", () => { readSize = Math.min(2.4, readSize + 0.15); curPage = 0; layoutReading(); });
        document.getElementById("r-smaller").addEventListener("click", () => { readSize = Math.max(0.9, readSize - 0.15); curPage = 0; layoutReading(); });
        document.addEventListener("keydown", e => {
            if (!document.getElementById("panel-reading").classList.contains("active")) return;
            if (e.key === "ArrowRight" || e.key === "PageDown") { e.preventDefault(); renderPage(curPage + 1); }
            if (e.key === "ArrowLeft"  || e.key === "PageUp")   { e.preventDefault(); renderPage(curPage - 1); }
        });
        let rzTimer; window.addEventListener("resize", () => {
            if (!document.getElementById("panel-reading").classList.contains("active")) return;
            clearTimeout(rzTimer); rzTimer = setTimeout(layoutReading, 150);
        });

        // ── NATURAL VOICE (read-aloud + fallback when no MP3) ─────────
        let _voices = null, _bestVoice = null;
        function loadVoices(){
            try{
                if(!window.speechSynthesis) return;
                _voices = speechSynthesis.getVoices() || [];
                _bestVoice = pickBestVoice(_voices);
            }catch(e){}
        }
        function pickBestVoice(voices){
            if(!voices || !voices.length) return null;
            let en = voices.filter(v => /^en(-|_|$)/i.test(v.lang||""));
            if(!en.length) en = voices;
            const prefs = [/natural/i,/neural/i,/\bgoogle\b/i,/microsoft .*online/i,/\bsiri\b/i,
                /\b(samantha|aria|jenny|guy|libby|sonia|ryan|emma|ava|allison|nathan)\b/i,/\b(en-US|en-GB)\b/i];
            for(const p of prefs){
                const m = en.filter(v => p.test(v.name||"") || p.test(v.voiceURI||""));
                const us = m.filter(v => /en-?US/i.test(v.lang||""));
                if(us.length) return us[0];
                if(m.length) return m[0];
            }
            const anyUS = en.filter(v => /en-?US/i.test(v.lang||""));
            return anyUS[0] || en[0];
        }
        function speakText(text, rate){
            try{
                if(!window.speechSynthesis || !text) return;
                if(!_voices) loadVoices();
                speechSynthesis.cancel();
                const u = new SpeechSynthesisUtterance(text);
                if(_bestVoice){ u.voice = _bestVoice; u.lang = _bestVoice.lang || "en-US"; } else u.lang = "en-US";
                u.rate = rate || 0.95; u.pitch = 1;
                speechSynthesis.speak(u);
            }catch(e){}
        }
        function stopSpeak(){ try{ if(window.speechSynthesis) speechSynthesis.cancel(); }catch(e){} }
        if(window.speechSynthesis){ loadVoices(); try{ speechSynthesis.onvoiceschanged = loadVoices; }catch(e){} }

        const rSpeakBtn = document.getElementById("r-speak");
        if(rSpeakBtn){
            rSpeakBtn.addEventListener("click", () => {
                if(window.speechSynthesis && speechSynthesis.speaking){
                    stopSpeak(); rSpeakBtn.classList.remove("speaking");
                    rSpeakBtn.innerHTML = '<i class="fas fa-volume-high"></i> Escuchar'; return;
                }
                const txt = (readingBody.textContent || "").trim();
                if(!txt) return;
                const rate = Math.max(0.6, Math.min(1.2, (typeof audio !== "undefined" && audio.playbackRate) ? audio.playbackRate * 0.97 : 0.95));
                speakText(txt, rate);
                rSpeakBtn.classList.add("speaking");
                rSpeakBtn.innerHTML = '<i class="fas fa-stop"></i> Detener';
            });
            // al pasar de página o cambiar de pestaña, corta la lectura
            ["r-prev","r-next"].forEach(id => { const b=document.getElementById(id); if(b) b.addEventListener("click", () => { stopSpeak(); rSpeakBtn.classList.remove("speaking"); rSpeakBtn.innerHTML='<i class="fas fa-volume-high"></i> Escuchar'; }); });
        }

        // ── AUDIO PLAYER ──────────────────────────────────────────────
        const audio = new Audio(); audio.src = audioSrc;
        document.getElementById("a-title").textContent = title;
        document.getElementById("a-sub").textContent = aSub;
        const bigPlay = document.getElementById("big-play"), bpIc = bigPlay.querySelector("i");
        const aCur = document.getElementById("a-cur"), aDur = document.getElementById("a-dur");
        const aBar = document.getElementById("a-bar"), aFill = document.getElementById("a-fill");
        const fmt = s => { if(!isFinite(s)) return "0:00"; const m=Math.floor(s/60),x=Math.floor(s%60); return `${m}:${x.toString().padStart(2,"0")}`; };

        // ── SEEK ──────────────────────────────────────────────────────
        // The bar used to be a read-out that accepted one click. Listening
        // practice is mostly going back over a clause you missed, so it is a
        // real scrubber now: drag it, tap ±10 s, or hold an arrow key. Pointer
        // events (not mouse) so a finger and a mouse take the same path, and
        // pointer capture so a drag survives leaving the 7px groove.
        const aBuf = document.getElementById("a-buf"), aBubble = document.getElementById("a-bubble");
        let scrubbing = false;
        // 0 until metadata lands, and Infinity on a live stream: every caller
        // treats "no duration yet" as "there is nothing to seek".
        const dur = () => (isFinite(audio.duration) && audio.duration > 0) ? audio.duration : 0;
        function paint(t) {
            const d = dur();
            aFill.style.width = (d ? t / d * 100 : 0) + "%";
            aCur.textContent = fmt(t);
            aBar.setAttribute("aria-valuemax", Math.floor(d));
            aBar.setAttribute("aria-valuenow", Math.floor(t));
            aBar.setAttribute("aria-valuetext", `${fmt(t)} of ${fmt(d)}`);
            markCue(t);          // hoisted; see SUBTITLES below
        }
        function paintBuffered() {
            const d = dur(); let end = 0;
            for (let i = 0; i < audio.buffered.length; i++) {
                // only the range the playhead actually sits in: after a seek
                // the buffer is disjoint and the far island is not "loaded up to"
                if (audio.buffered.start(i) <= audio.currentTime + 0.5) end = Math.max(end, audio.buffered.end(i));
            }
            aBuf.style.width = (d ? Math.min(1, end / d) * 100 : 0) + "%";
        }
        function seekTo(t) {
            const d = dur(); if (!d) return;
            audio.currentTime = Math.max(0, Math.min(d, t));
            paint(audio.currentTime);
        }
        const skip = s => seekTo(audio.currentTime + s);
        const timeAt = clientX => {
            const r = aBar.getBoundingClientRect();
            return dur() * Math.max(0, Math.min(1, (clientX - r.left) / r.width));
        };
        function bubbleAt(clientX, t) {
            const r = aBar.getBoundingClientRect();
            aBubble.style.left = Math.max(0, Math.min(r.width, clientX - r.left)) + "px";
            aBubble.textContent = fmt(t);
        }
        aBar.addEventListener("pointerdown", e => {
            if (!dur()) return;
            scrubbing = true; aBar.classList.add("scrubbing");
            try { aBar.setPointerCapture(e.pointerId); } catch (err) {}
            const t = timeAt(e.clientX); seekTo(t); bubbleAt(e.clientX, t);
            e.preventDefault();          // no text selection dragged along with it
        });
        aBar.addEventListener("pointermove", e => {
            if (!dur()) return;
            const t = timeAt(e.clientX);
            bubbleAt(e.clientX, t);
            if (scrubbing) seekTo(t);
        });
        const endScrub = e => {
            if (!scrubbing) return;
            scrubbing = false; aBar.classList.remove("scrubbing");
            try { aBar.releasePointerCapture(e.pointerId); } catch (err) {}
        };
        aBar.addEventListener("pointerup", endScrub);
        aBar.addEventListener("pointercancel", endScrub);
        aBar.addEventListener("keydown", e => {
            const step = { ArrowLeft:-5, ArrowRight:5, ArrowDown:-10, ArrowUp:10, PageDown:-30, PageUp:30 }[e.key];
            if (step !== undefined) { skip(step); e.preventDefault(); return; }
            if (e.key === "Home") { seekTo(0); e.preventDefault(); return; }
            if (e.key === "End")  { seekTo(dur()); e.preventDefault(); return; }
            if (e.key === " " || e.key === "Enter") {
                if (audio.paused) audio.play().catch(()=>{}); else audio.pause();
                e.preventDefault();
            }
        });
        document.getElementById("a-back").addEventListener("click", () => skip(-10));
        document.getElementById("a-fwd").addEventListener("click",  () => skip(10));

        // ── SUBTITLES ─────────────────────────────────────────────────
        // Cue lists are keyed by mp3 filename (vesper_political_cues.js), whose
        // timings were recovered from the shipped audio rather than estimated —
        // see _scripts/political/build_political_cues.py. Only Political has
        // them today, so for every other course cues is empty, the panel stays
        // hidden and each function below returns immediately.
        const cuesWrap = document.getElementById("cues-wrap");
        const cuesBox  = document.getElementById("cues");
        const cuesBtn  = document.getElementById("cues-toggle");
        const cuesLbl  = document.getElementById("cues-label");
        const CUES_PREF = "vesper_cues_open";
        let cues = [], cueEls = [], cueAt = -1;

        function setCuesOpen(open) {
            cuesBtn.setAttribute("aria-expanded", open ? "true" : "false");
            cuesBox.hidden = !open;
            cuesLbl.innerHTML = open ? "Ocultar subt&iacute;tulos" : "Ver subt&iacute;tulos";
            try { localStorage.setItem(CUES_PREF, open ? "1" : "0"); } catch (e) {}
            if (open) { cueAt = -1; markCue(audio.currentTime); }
        }
        function buildCues(key) {
            cues = (window.POLITICAL_CUES || {})[key] || [];
            cueAt = -1; cueEls = [];
            cuesWrap.hidden = !cues.length;
            if (!cues.length) { cuesBox.innerHTML = ""; return; }
            cuesBox.innerHTML = cues.map((c, i) =>
                '<button class="cue" type="button" data-i="' + i + '">' +
                    '<span class="cue-sp">' + esc(c.s) + '</span>' +
                    '<span class="cue-tx">' + esc(c.x) + '</span>' +
                '</button>').join("");
            cueEls = Array.prototype.slice.call(cuesBox.querySelectorAll(".cue"));
            let open = false;
            try { open = localStorage.getItem(CUES_PREF) === "1"; } catch (e) {}
            setCuesOpen(open);
        }
        function inCueView(el) {
            if (!el) return true;
            const top = el.offsetTop, bottom = top + el.offsetHeight;
            return bottom > cuesBox.scrollTop &&
                   top < cuesBox.scrollTop + cuesBox.clientHeight;
        }
        function markCue(t) {
            if (!cues.length) return;
            let i = -1;
            for (let k = 0; k < cues.length; k++) {
                if (t >= cues[k].t && t < cues[k].e) { i = k; break; }
            }
            if (i === cueAt) return;
            // Follow the audio only while the reader is still watching where we
            // last put them. If they have scrolled off to re-read an earlier
            // turn, the outgoing line is out of view and we leave them alone —
            // scrolling back resumes following on its own, no timers, no flags.
            const follow = cueAt < 0 || inCueView(cueEls[cueAt]);
            cueAt = i;
            cueEls.forEach((el, k) => el.classList.toggle("on", k === i));
            if (i >= 0 && !cuesBox.hidden && follow) {
                const el = cueEls[i];
                cuesBox.scrollTop = Math.max(0,
                    el.offsetTop - cuesBox.clientHeight / 2 + el.offsetHeight / 2);
            }
        }
        cuesBtn.addEventListener("click", () => setCuesOpen(cuesBox.hidden));
        cuesBox.addEventListener("click", e => {
            const b = e.target.closest(".cue");
            if (!b) return;
            const c = cues[+b.dataset.i];
            // land just inside the turn: seeking to its exact first frame can
            // settle a hair short and flash the previous speaker
            if (c) seekTo(c.t + 0.05);
        });
        buildCues(curKey);   // curKey is "" for courses without cue timings

        bigPlay.addEventListener("click", () => { if (audio.paused) audio.play().catch(()=>{}); else audio.pause(); });
        const audioCard = document.getElementById("audio-card");
        audio.addEventListener("play",  () => {
            bpIc.className = "fas fa-pause"; audioCard.classList.add("playing");
            if (window.VesperAudioPractice && VesperAudioPractice.stopClip) VesperAudioPractice.stopClip();
        });
        audio.addEventListener("pause", () => { bpIc.className = "fas fa-play"; audioCard.classList.remove("playing"); });
        audio.addEventListener("ended", () => { bpIc.className = "fas fa-play"; audioCard.classList.remove("playing"); });
        audio.addEventListener("loadedmetadata", () => {
            aDur.textContent = fmt(audio.duration); paint(audio.currentTime); paintBuffered();
        });
        audio.addEventListener("timeupdate", () => {
            // while a drag is in flight the pointer owns the fill, not the clock
            if (!scrubbing) paint(audio.currentTime);
            paintBuffered();
        });
        audio.addEventListener("progress", paintBuffered);
        audio.addEventListener("error", () => {
            document.getElementById("a-error").style.display = "block";
            // no audio for this lesson — fall back to the Reading view automatically
            if (hasReading) {
                document.querySelector('.tab[data-panel="audio"]').style.display = "none";
                gotoTab("reading");
            }
        });
        document.querySelectorAll(".speed-btn").forEach(b => b.addEventListener("click", () => {
            b.parentElement.querySelectorAll(".speed-btn").forEach(x => x.classList.remove("active"));
            b.classList.add("active"); audio.playbackRate = parseFloat(b.dataset.rate);
        }));

        // ── A/B VERSION SELECTOR (lessons that ship more than one audio) ──
        const variantRow = document.getElementById("variant-row");
        function selectVariant(file){
            const k = file.split("/").pop();
            if (k === curKey) return;
            curKey = k;
            audioSrc = `assets/audio/${curKey}`;
            const wasPlaying = !audio.paused;
            audio.pause(); audio.currentTime = 0; audio.src = audioSrc;
            aFill.style.width = "0%"; aBuf.style.width = "0%";
            aCur.textContent = "0:00"; aDur.textContent = "0:00";
            aBar.setAttribute("aria-valuemax", 0); aBar.setAttribute("aria-valuenow", 0);
            aBar.setAttribute("aria-valuetext", "0:00");
            document.getElementById("a-error").style.display = "none";
            variantRow.querySelectorAll(".variant-btn").forEach(b =>
                b.classList.toggle("active", b.dataset.file.split("/").pop() === curKey));
            buildCues(curKey);
            curPage = 0; setupReading();
            if (document.getElementById("panel-reading").classList.contains("active")) layoutReading();
            if (wasPlaying) audio.play().catch(()=>{});
        }
        if (customVariants.length > 1) {
            variantRow.innerHTML = '<span>Version</span>';
            customVariants.forEach(v => {
                const b = document.createElement("button");
                b.className = "speed-btn variant-btn" + (v.file.split("/").pop() === curKey ? " active" : "");
                b.dataset.file = v.file;
                b.textContent = v.label;
                b.addEventListener("click", () => selectVariant(v.file));
                variantRow.appendChild(b);
            });
            variantRow.style.display = "flex";
        }

        // ── WHITEBOARD (object model: movable shapes, text, stickers) ──
        const canvas = document.getElementById("board");
        const ctx = canvas.getContext("2d");
        const textInput = document.getElementById("wb-text-input");
        const boardPanel = document.getElementById("panel-board");

        let tool = "pen";              // select|pen|marker|eraser|text|line|arrow|rect|ellipse|tri|sticker
        let color = "#1B1B2F", size = 4, pendingSticker = null;
        let fillMode = false, dashMode = false;
        let dpr = 1, cssW = 0, cssH = 0;
        let objects = [];              // every drawn item, in z-order
        let boardBg = "#fff";          // board background (set by JSON lesson renderer)
        const imgCache = {};           // src -> Image() (for rendered image objects)
        let selected = null;
        const undoStack = []; const MAX_UNDO = 50;
        const redoStack = [];

        // faint centered logo, painted as background only — never selectable/erasable
        const wmark = new Image();
        wmark.src = "assets/images/vesper_logo.png";
        wmark.onload = () => redraw();

        function clone(arr){ return arr.map(o => JSON.parse(JSON.stringify(o))); }
        function pushUndo(){ undoStack.push(clone(objects)); if (undoStack.length > MAX_UNDO) undoStack.shift(); redoStack.length = 0; }
        function pos(e){ const r = canvas.getBoundingClientRect(); return { x:e.clientX-r.left, y:e.clientY-r.top }; }

        function fitBoard(){
            const rect = canvas.getBoundingClientRect();
            if (!rect.width || !rect.height) return;
            dpr = window.devicePixelRatio || 1; cssW = rect.width; cssH = rect.height;
            canvas.width = Math.round(cssW * dpr); canvas.height = Math.round(cssH * dpr);
            redraw();
        }

        function redraw(){
            ctx.setTransform(dpr,0,0,dpr,0,0);
            ctx.clearRect(0,0,cssW,cssH);
            ctx.fillStyle = boardBg || "#fff"; ctx.fillRect(0,0,cssW,cssH);
            if (wmark.complete && wmark.naturalWidth){
                const base = Math.min(cssW, cssH) * 0.42;
                const ratio = wmark.naturalWidth / wmark.naturalHeight;
                const w = ratio >= 1 ? base : base * ratio, h = ratio >= 1 ? base / ratio : base;
                ctx.globalAlpha = 0.06;
                ctx.drawImage(wmark, (cssW - w) / 2, (cssH - h) / 2, w, h);
                ctx.globalAlpha = 1;
            }
            ctx.lineCap = "round"; ctx.lineJoin = "round";
            const idMap = {};
            for (const o of objects) if (o.id) idMap[o.id] = o;
            for (const o of objects){ if (o.type === "connector") drawConnector(o, idMap); else drawObj(o); }
            if (selected) drawSelection(selected);
        }

        // ── premium drawing primitives (shared by hand tools + JSON renderer) ──
        function roundRectPath(c,x,y,w,h,r){
            r = Math.max(0, Math.min(r||0, Math.abs(w)/2, Math.abs(h)/2));
            const x2=x+w, y2=y+h;
            c.beginPath();
            c.moveTo(x+r,y); c.lineTo(x2-r,y); c.arcTo(x2,y,x2,y+r,r);
            c.lineTo(x2,y2-r); c.arcTo(x2,y2,x2-r,y2,r);
            c.lineTo(x+r,y2); c.arcTo(x,y2,x,y2-r,r);
            c.lineTo(x,y+r); c.arcTo(x,y,x+r,y,r);
            c.closePath();
        }
        function applyShadow(o){ if (o && o.shadow){ ctx.shadowColor = "rgba(20,26,46,0.20)"; ctx.shadowBlur = Math.max(10,(o.width||2)*4); ctx.shadowOffsetX = 0; ctx.shadowOffsetY = 5; } }
        function clearShadow(){ ctx.shadowColor = "transparent"; ctx.shadowBlur = 0; ctx.shadowOffsetY = 0; }
        function shapeAlpha(o){ return (o.alpha != null) ? o.alpha : 1; }
        function dashArr(o){ return o.dash ? [Math.max(6,(o.width||2)*3), Math.max(5,(o.width||2)*2.2)] : []; }
        function drawArrowHead(p, dir, w){
            const ang = Math.atan2(dir.y, dir.x), ah = Math.max(11, w*3.5);
            ctx.setLineDash([]);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.x - ah*Math.cos(ang-0.42), p.y - ah*Math.sin(ang-0.42));
            ctx.lineTo(p.x - ah*Math.cos(ang+0.42), p.y - ah*Math.sin(ang+0.42));
            ctx.closePath(); ctx.fill();
        }

        function fillShape(o){
            // legacy translucent fill (hand-drawn shapes with the Fill toggle on)
            if (!o.fill) return;
            ctx.save(); ctx.globalAlpha = shapeAlpha(o) * 0.3; ctx.fill(); ctx.restore();
        }
        // premium fill + stroke for rect/ellipse/tri — back-compatible with hand-drawn shapes
        function paintShape(o, pathFn){
            ctx.save();
            applyShadow(o); pathFn();
            if (o.fillColor && o.fillColor !== "transparent"){ ctx.globalAlpha = shapeAlpha(o); ctx.fillStyle = o.fillColor; ctx.fill(); }
            else if (o.fill){ ctx.globalAlpha = shapeAlpha(o) * 0.3; ctx.fillStyle = o.color || "#1B1B2F"; ctx.fill(); }
            clearShadow();
            if (o.stroke !== "none"){
                ctx.globalAlpha = shapeAlpha(o);
                ctx.strokeStyle = o.stroke || o.color || "#1B1B2F";
                ctx.lineWidth = o.width || 2;
                ctx.setLineDash(dashArr(o));
                pathFn(); ctx.stroke();
            }
            ctx.restore(); ctx.setLineDash([]); ctx.globalAlpha = 1;
        }

        function drawObj(o){
            ctx.globalAlpha = shapeAlpha(o);
            ctx.strokeStyle = o.color || "#1B1B2F"; ctx.fillStyle = o.color || "#1B1B2F";
            ctx.lineWidth = o.width || 2;
            ctx.setLineDash(dashArr(o));
            if (o.type === "path"){
                ctx.beginPath();
                o.pts.forEach((p,i) => i ? ctx.lineTo(p.x,p.y) : ctx.moveTo(p.x,p.y));
                if (o.pts.length === 1) ctx.lineTo(o.pts[0].x+0.01, o.pts[0].y+0.01);
                ctx.stroke();
            } else if (o.type === "line"){
                ctx.beginPath(); ctx.moveTo(o.x1,o.y1); ctx.lineTo(o.x2,o.y2); ctx.stroke();
            } else if (o.type === "arrow"){
                ctx.beginPath(); ctx.moveTo(o.x1,o.y1); ctx.lineTo(o.x2,o.y2); ctx.stroke();
                drawArrowHead({x:o.x2,y:o.y2}, {x:o.x2-o.x1, y:o.y2-o.y1}, o.width||2);
            } else if (o.type === "rect"){
                paintShape(o, () => roundRectPath(ctx, o.x, o.y, o.w, o.h, o.radius||0));
            } else if (o.type === "ellipse"){
                paintShape(o, () => { ctx.beginPath(); ctx.ellipse(o.x+o.w/2, o.y+o.h/2, Math.abs(o.w/2), Math.abs(o.h/2), 0, 0, Math.PI*2); });
            } else if (o.type === "tri"){
                paintShape(o, () => { ctx.beginPath(); ctx.moveTo(o.x+o.w/2, o.y); ctx.lineTo(o.x+o.w, o.y+o.h); ctx.lineTo(o.x, o.y+o.h); ctx.closePath(); });
            } else if (o.type === "text"){
                drawText(o);
            } else if (o.type === "image"){
                drawImageObj(o);
            } else if (o.type === "sticker"){
                ctx.font = `${o.fs}px serif`; ctx.textBaseline = "top"; ctx.fillText(o.char, o.x, o.y);
            }
            ctx.setLineDash([]);
            ctx.globalAlpha = 1;
        }

        // ── rich text: markdown **bold**, word-wrap (max_width), alignment ──
        function textWeight(o){ return (o.weight===700||o.weight==="bold") ? 700 : (typeof o.weight==="number" ? o.weight : 600); }
        function parseInline(str){
            const out=[]; const re=/\*\*([^*]+)\*\*/g; let last=0, m;
            while((m=re.exec(str))){ if(m.index>last) out.push({t:str.slice(last,m.index),b:false}); out.push({t:m[1],b:true}); last=re.lastIndex; }
            if(last<str.length) out.push({t:str.slice(last),b:false});
            return out.length ? out : [{t:str,b:false}];
        }
        function wrapText(text, maxW, fs, w){
            const paras = String(text).split("\n");
            if(!maxW) return paras;
            ctx.font = `${w} ${fs}px Inter, sans-serif`;
            const lines=[];
            for(const para of paras){
                const words = para.split(/\s+/); let cur="";
                for(const word of words){
                    const test = cur ? cur+" "+word : word;
                    if(ctx.measureText(test.replace(/\*\*/g,"")).width > maxW && cur){ lines.push(cur); cur=word; }
                    else cur = test;
                }
                lines.push(cur);
            }
            return lines;
        }
        function drawText(o){
            const w = textWeight(o), fs = o.fs || 16, col = o.color || "#2b2b3a";
            ctx.textBaseline = "top"; ctx.setLineDash([]); ctx.textAlign = "left";
            const lines = wrapText(o.text, o.maxW, fs, w), lh = fs*1.35;
            lines.forEach((ln,i) => {
                const segs = parseInline(ln);
                let total = 0;
                for(const s of segs){ ctx.font = `${s.b?800:w} ${fs}px Inter, sans-serif`; total += ctx.measureText(s.t).width; }
                let x = o.align==="center" ? o.x-total/2 : o.align==="right" ? o.x-total : o.x;
                const y = o.y + i*lh;
                for(const s of segs){ ctx.font = `${s.b?800:w} ${fs}px Inter, sans-serif`; ctx.fillStyle = col; ctx.fillText(s.t, x, y); x += ctx.measureText(s.t).width; }
            });
        }

        // ── images (cover-fit, rounded, optional caption) ──
        function drawImageObj(o){
            const r = o.radius || 0;
            ctx.save();
            applyShadow(o);
            roundRectPath(ctx, o.x, o.y, o.w, o.h, r);
            ctx.fillStyle = "#ece7db"; ctx.fill();
            clearShadow();
            ctx.save(); roundRectPath(ctx, o.x, o.y, o.w, o.h, r); ctx.clip();
            const img = imgCache[o.src];
            if (img === undefined && o.src){
                const im = new Image(); im.crossOrigin = "anonymous"; imgCache[o.src] = im;
                im.onload = () => redraw(); im.onerror = () => { imgCache[o.src] = null; redraw(); }; im.src = o.src;
            } else if (img && img.complete && img.naturalWidth){
                const ir = img.naturalWidth/img.naturalHeight, br = o.w/o.h; let dw, dh;
                if (ir > br){ dh = o.h; dw = dh*ir; } else { dw = o.w; dh = dw/ir; }
                ctx.drawImage(img, o.x+(o.w-dw)/2, o.y+(o.h-dh)/2, dw, dh);
            } else {
                ctx.fillStyle = "#c9c2b4"; ctx.font = `${Math.min(o.w,o.h)*0.22}px 'Font Awesome 6 Free', serif`;
                ctx.textAlign = "center"; ctx.textBaseline = "middle";
                ctx.fillText("", o.x+o.w/2, o.y+o.h/2); ctx.textAlign = "left"; ctx.textBaseline = "top";
            }
            ctx.restore();
            roundRectPath(ctx, o.x, o.y, o.w, o.h, r);
            ctx.strokeStyle = "#d9d2c4"; ctx.lineWidth = 1.5; ctx.setLineDash([]); ctx.stroke();
            ctx.restore();
            if (o.caption){
                ctx.fillStyle = "#6b7280"; ctx.textAlign = "center"; ctx.textBaseline = "top";
                ctx.font = `500 ${Math.max(11, Math.min(15, o.h*0.09))}px Inter, sans-serif`;
                ctx.fillText(o.caption, o.x+o.w/2, o.y+o.h+8); ctx.textAlign = "left";
            }
        }

        // ── connectors: auto-route between two rendered objects by id ──
        function connAnchor(b, tx, ty){
            const cx=b.x+b.w/2, cy=b.y+b.h/2, dx=tx-cx, dy=ty-cy;
            if(!dx && !dy) return {x:cx, y:cy};
            const hw=b.w/2+8, hh=b.h/2+8;
            const k = 1/Math.max(Math.abs(dx)/hw || 1e-6, Math.abs(dy)/hh || 1e-6);
            return { x:cx+dx*k, y:cy+dy*k };
        }
        function drawConnector(o, idMap){
            const a=idMap[o.from], b=idMap[o.to]; if(!a || !b) return;
            const ba=bbox(a), bb=bbox(b);
            const ca={x:ba.x+ba.w/2, y:ba.y+ba.h/2}, cb={x:bb.x+bb.w/2, y:bb.y+bb.h/2};
            const p1=connAnchor(ba, cb.x, cb.y), p2=connAnchor(bb, ca.x, ca.y);
            o._p1=p1; o._p2=p2;
            ctx.save();
            const col = o.color || "#6b7280";
            ctx.strokeStyle=col; ctx.fillStyle=col; ctx.lineWidth=o.width||2; ctx.lineCap="round"; ctx.setLineDash([]);
            let mid, tan;
            ctx.beginPath();
            if(o.ctype==="curved"){
                const dx=p2.x-p1.x, dy=p2.y-p1.y, len=Math.hypot(dx,dy)||1, off=Math.min(70, len*0.22);
                const mx=(p1.x+p2.x)/2 - dy/len*off, my=(p1.y+p2.y)/2 + dx/len*off;
                ctx.moveTo(p1.x,p1.y); ctx.quadraticCurveTo(mx,my,p2.x,p2.y);
                mid={x:0.25*p1.x+0.5*mx+0.25*p2.x, y:0.25*p1.y+0.5*my+0.25*p2.y};
                tan={x:p2.x-mx, y:p2.y-my};
            } else if(o.ctype==="elbow"){
                ctx.moveTo(p1.x,p1.y); ctx.lineTo(p1.x,p2.y); ctx.lineTo(p2.x,p2.y);
                mid={x:(p1.x+p2.x)/2, y:p2.y}; tan={x:p2.x-p1.x, y:0};
            } else {
                ctx.moveTo(p1.x,p1.y); ctx.lineTo(p2.x,p2.y);
                mid={x:(p1.x+p2.x)/2, y:(p1.y+p2.y)/2}; tan={x:p2.x-p1.x, y:p2.y-p1.y};
            }
            ctx.stroke();
            if(o.startMarker==="dot"){ ctx.beginPath(); ctx.arc(p1.x,p1.y,Math.max(3,(o.width||2)*1.7),0,Math.PI*2); ctx.fill(); }
            if(o.endMarker!=="none"){ drawArrowHead(p2, tan, o.width||2); }
            if(o.label){
                ctx.font = `600 13px Inter, sans-serif`; ctx.textBaseline="middle"; ctx.textAlign="center";
                const tw=ctx.measureText(o.label).width, pw=tw+16, ph=22;
                ctx.save();
                ctx.shadowColor="rgba(20,26,46,0.14)"; ctx.shadowBlur=6; ctx.shadowOffsetY=2;
                roundRectPath(ctx, mid.x-pw/2, mid.y-ph/2, pw, ph, 8); ctx.fillStyle="#fff"; ctx.fill();
                ctx.restore();
                roundRectPath(ctx, mid.x-pw/2, mid.y-ph/2, pw, ph, 8); ctx.strokeStyle="#d9d2c4"; ctx.lineWidth=1; ctx.stroke();
                ctx.fillStyle="#1B1B2F"; ctx.fillText(o.label, mid.x, mid.y+1);
                ctx.textAlign="left"; ctx.textBaseline="top";
            }
            ctx.restore();
        }

        function bbox(o){
            if (o.type === "path"){
                const xs = o.pts.map(p=>p.x), ys = o.pts.map(p=>p.y);
                const x = Math.min(...xs), y = Math.min(...ys);
                return { x, y, w: Math.max(...xs)-x, h: Math.max(...ys)-y };
            } else if (o.type === "line" || o.type === "arrow"){
                return { x:Math.min(o.x1,o.x2), y:Math.min(o.y1,o.y2), w:Math.abs(o.x2-o.x1), h:Math.abs(o.y2-o.y1) };
            } else if (o.type === "rect" || o.type === "ellipse" || o.type === "tri" || o.type === "image"){
                return { x:Math.min(o.x,o.x+o.w), y:Math.min(o.y,o.y+o.h), w:Math.abs(o.w), h:Math.abs(o.h) };
            } else if (o.type === "text"){
                const w = textWeight(o), fs = o.fs || 16;
                const lines = wrapText(o.text, o.maxW, fs, w);
                ctx.font = `${w} ${fs}px Inter, sans-serif`;
                let tw=0; for(const l of lines) tw=Math.max(tw, ctx.measureText(l.replace(/\*\*/g,"")).width);
                const th = lines.length*fs*1.35;
                let x = o.align==="center" ? o.x-tw/2 : o.align==="right" ? o.x-tw : o.x;
                return { x, y:o.y, w:tw, h:th };
            } else if (o.type === "sticker"){
                return { x:o.x, y:o.y, w:o.fs, h:o.fs };
            } else if (o.type === "connector"){
                const p1=o._p1, p2=o._p2;
                if(!p1 || !p2) return { x:0, y:0, w:0, h:0 };
                return { x:Math.min(p1.x,p2.x), y:Math.min(p1.y,p2.y), w:Math.abs(p2.x-p1.x), h:Math.abs(p2.y-p1.y) };
            }
            return { x:0, y:0, w:0, h:0 };
        }

        function drawSelection(o){
            const b = bbox(o), pad = 6;
            ctx.save(); ctx.strokeStyle = "#c5a059"; ctx.lineWidth = 1.5; ctx.setLineDash([6,4]);
            ctx.strokeRect(b.x-pad, b.y-pad, b.w+pad*2, b.h+pad*2);
            ctx.setLineDash([]); ctx.restore();
        }

        function hitTest(p){
            for (let i = objects.length-1; i >= 0; i--){
                if (objects[i].type === "connector") continue; // auto-routed, not directly grabbable
                const b = bbox(objects[i]), pad = 8;
                if (p.x >= b.x-pad && p.x <= b.x+b.w+pad && p.y >= b.y-pad && p.y <= b.y+b.h+pad) return objects[i];
            }
            return null;
        }

        function moveObj(o, nx, ny){
            const b = bbox(o), dx = nx - b.x, dy = ny - b.y;
            if (o.type === "path") o.pts.forEach(pt => { pt.x += dx; pt.y += dy; });
            else if (o.type === "line" || o.type === "arrow"){ o.x1+=dx; o.y1+=dy; o.x2+=dx; o.y2+=dy; }
            else { o.x += dx; o.y += dy; if (o._sx != null){ o._sx += dx; o._sy += dy; } }
        }

        // ── interaction ──
        let action = null, current = null, moveOff = null;
        canvas.addEventListener("pointerdown", e => {
            const p = pos(e);
            if (tool === "text"){ placeText(p); return; }
            if (tool === "sticker" && pendingSticker){
                pushUndo(); const fs = Math.max(30, size*7);
                objects.push({ type:"sticker", x:p.x-fs/2, y:p.y-fs/2, char:pendingSticker, fs });
                redraw(); return;
            }
            if (tool === "select"){
                const hit = hitTest(p); selected = hit; redraw();
                if (hit){ pushUndo(); action = "move"; const b = bbox(hit); moveOff = { dx:p.x-b.x, dy:p.y-b.y }; try { canvas.setPointerCapture(e.pointerId); } catch(_){} }
                return;
            }
            if (tool === "eraser"){
                const hit = hitTest(p);
                if (hit){ pushUndo(); objects = objects.filter(o => o !== hit); selected = null; redraw(); }
                action = "erase"; try { canvas.setPointerCapture(e.pointerId); } catch(_){} return;
            }
            // drawing / shape tools
            pushUndo(); try { canvas.setPointerCapture(e.pointerId); } catch(_){} selected = null;
            if (tool === "pen" || tool === "marker"){
                action = "draw";
                current = { type:"path", pts:[{x:p.x,y:p.y}], color, width: tool==="marker"? size*3 : size, alpha: tool==="marker"? 0.4 : 1, dash:dashMode };
            } else if (tool === "line" || tool === "arrow"){
                action = "shape"; current = { type:tool, x1:p.x, y1:p.y, x2:p.x, y2:p.y, color, width:size, dash:dashMode };
            } else if (tool === "rect" || tool === "ellipse" || tool === "tri"){
                action = "shape"; current = { type:tool, x:p.x, y:p.y, w:0, h:0, color, width:size, fill:fillMode, dash:dashMode, _sx:p.x, _sy:p.y };
            }
            if (current){ objects.push(current); redraw(); }
        });
        canvas.addEventListener("pointermove", e => {
            const p = pos(e);
            if (action === "draw" && current){ current.pts.push({x:p.x,y:p.y}); redraw(); }
            else if (action === "shape" && current){
                if (current.type === "line" || current.type === "arrow"){ current.x2 = p.x; current.y2 = p.y; }
                else { current.x = Math.min(current._sx,p.x); current.y = Math.min(current._sy,p.y); current.w = Math.abs(p.x-current._sx); current.h = Math.abs(p.y-current._sy); }
                redraw();
            } else if (action === "move" && selected){ moveObj(selected, p.x-moveOff.dx, p.y-moveOff.dy); redraw(); }
            else if (action === "erase"){ const hit = hitTest(p); if (hit){ objects = objects.filter(o => o !== hit); redraw(); } }
        });
        function endAction(){ action = null; current = null; moveOff = null; }
        canvas.addEventListener("pointerup", endAction);
        canvas.addEventListener("pointercancel", endAction);

        // ── text tool ──
        let textPos = null;
        function placeText(p){
            textPos = p; const fs = Math.max(16, size*5);
            textInput.style.left = p.x + "px"; textInput.style.top = p.y + "px";
            textInput.style.display = "block"; textInput.style.color = color;
            textInput.style.fontSize = fs + "px"; textInput.value = "";
            setTimeout(() => textInput.focus(), 10);
        }
        function commitText(){
            const val = textInput.value.trim();
            if (val && textPos){ pushUndo(); objects.push({ type:"text", x:textPos.x, y:textPos.y, text:val, color, fs:Math.max(16,size*5) }); redraw(); }
            textInput.style.display = "none"; textInput.value = ""; textPos = null;
        }
        textInput.addEventListener("keydown", e => { e.stopPropagation(); if (e.key==="Enter"){ e.preventDefault(); commitText(); } if (e.key==="Escape"){ textInput.style.display="none"; textPos=null; } });
        textInput.addEventListener("blur", commitText);

        // ── tools ──
        const TOOL_BTNS = { "t-select":"select","t-pen":"pen","t-marker":"marker","t-eraser":"eraser","t-text":"text","t-line":"line","t-arrow":"arrow","t-rect":"rect","t-ellipse":"ellipse","t-tri":"tri" };
        function setTool(t){
            tool = t; pendingSticker = null;
            // fill/dash are style toggles, not tools — keep their pressed state
            document.querySelectorAll(".wb-toolbar .tool-btn").forEach(b => { if (b.id !== "t-fill" && b.id !== "t-dash") b.classList.remove("active"); });
            document.querySelectorAll(".sticker-pick").forEach(s => s.classList.remove("active"));
            const id = Object.keys(TOOL_BTNS).find(k => TOOL_BTNS[k] === t);
            if (id) document.getElementById(id).classList.add("active");
            canvas.style.cursor = t==="text" ? "text" : t==="select" ? "move" : t==="eraser" ? "cell" : "crosshair";
            if (t !== "select") { selected = null; redraw(); }
        }
        Object.keys(TOOL_BTNS).forEach(id => document.getElementById(id).addEventListener("click", () => setTool(TOOL_BTNS[id])));

        document.querySelectorAll(".sticker-pick").forEach(s => s.addEventListener("click", () => {
            setTool("sticker"); pendingSticker = s.dataset.st;
            s.classList.add("active"); canvas.style.cursor = "copy";
        }));

        document.querySelectorAll(".swatch").forEach(s => s.addEventListener("click", () => {
            document.querySelectorAll(".swatch").forEach(x => x.classList.remove("active"));
            s.classList.add("active"); color = s.dataset.color; document.getElementById("color-pick").value = color;
            if (selected){ pushUndo(); selected.color = color; redraw(); }
        }));
        document.getElementById("color-pick").addEventListener("input", e => {
            color = e.target.value; document.querySelectorAll(".swatch").forEach(x => x.classList.remove("active"));
            if (selected){ pushUndo(); selected.color = color; redraw(); }
        });
        document.getElementById("size").addEventListener("input", e => size = parseInt(e.target.value,10));

        document.getElementById("t-fill").addEventListener("click", e => {
            fillMode = !fillMode; e.currentTarget.classList.toggle("active", fillMode);
            if (selected && (selected.type === "rect" || selected.type === "ellipse" || selected.type === "tri")){ pushUndo(); selected.fill = fillMode; redraw(); }
        });
        document.getElementById("t-dash").addEventListener("click", e => {
            dashMode = !dashMode; e.currentTarget.classList.toggle("active", dashMode);
            if (selected && selected.type !== "text" && selected.type !== "sticker"){ pushUndo(); selected.dash = dashMode; redraw(); }
        });

        function undo(){ if (!undoStack.length) return; redoStack.push(clone(objects)); objects = undoStack.pop(); selected = null; redraw(); }
        function redo(){ if (!redoStack.length) return; undoStack.push(clone(objects)); objects = redoStack.pop(); selected = null; redraw(); }
        function deleteSelected(){ if (selected){ pushUndo(); objects = objects.filter(o => o !== selected); selected = null; redraw(); } }
        function duplicateSelected(){
            if (!selected) return;
            pushUndo();
            const copy = JSON.parse(JSON.stringify(selected));
            const b = bbox(copy);
            moveObj(copy, b.x + 16, b.y + 16);
            objects.push(copy); selected = copy; redraw();
        }
        document.getElementById("t-undo").addEventListener("click", undo);
        document.getElementById("t-redo").addEventListener("click", redo);
        document.getElementById("t-dup").addEventListener("click", duplicateSelected);
        document.getElementById("t-delete").addEventListener("click", deleteSelected);
        document.getElementById("t-clear").addEventListener("click", () => { pushUndo(); objects = []; boardBg = "#fff"; showNarration(""); selected = null; redraw(); });
        document.getElementById("t-save").addEventListener("click", () => {
            selected = null; redraw();
            let url;
            try { url = canvas.toDataURL("image/png"); }
            catch(err){ alert("No se puede descargar: una imagen externa en la pizarra bloquea la exportación (canvas 'tainted'). Quítala e intenta de nuevo."); return; }
            const a = document.createElement("a");
            a.download = `vesper_whiteboard_L${lvl}_lesson${les}.png`;
            a.href = url; a.click();
        });
        document.addEventListener("keydown", e => {
            if (!boardPanel.classList.contains("active")) return;
            if (textPos) return; // typing text
            if ((e.ctrlKey||e.metaKey) && e.key.toLowerCase()==="z" && e.shiftKey){ e.preventDefault(); redo(); }
            else if ((e.ctrlKey||e.metaKey) && e.key.toLowerCase()==="z"){ e.preventDefault(); undo(); }
            else if ((e.ctrlKey||e.metaKey) && e.key.toLowerCase()==="y"){ e.preventDefault(); redo(); }
            else if ((e.key === "Delete" || e.key === "Backspace") && selected){ e.preventDefault(); deleteSelected(); }
        });
        window.addEventListener("resize", () => { if (boardPanel.classList.contains("active")) fitBoard(); });

        // ── PREMIUM LESSON RENDERER: JSON (canvas_state) → editable board objects ──
        const narrBox = document.getElementById("wb-narration");
        function showNarration(text){
            if (!narrBox) return;
            if (text){ narrBox.querySelector(".wb-narr-text").textContent = text; narrBox.hidden = false; }
            else { narrBox.hidden = true; }
        }

        function renderLessonJSON(spec){
            const cs = spec && spec.canvas_state;
            const list = cs && Array.isArray(cs.objects) ? cs.objects
                        : (Array.isArray(spec && spec.objects) ? spec.objects : null);
            if (!list) throw new Error("No encuentro canvas_state.objects (debe ser un arreglo).");
            if (!cssW || !cssH) fitBoard();
            const sx = cssW/1000, sy = cssH/1000, s = (sx+sy)/2;
            const accent = (spec.meta && spec.meta.style_guide && spec.meta.style_guide.accent_color) || "#c5a059";
            const sorted = list.slice().sort((a,b) => (a.layer||0) - (b.layer||0));
            const out = [];
            let autoId = 0;
            for (const it of sorted){
                if (!it || !it.type) continue;
                const d = it.data || {};
                const id = it.id || ("obj_"+(autoId++));
                const px = ((it.position && it.position.x) || 0) * sx;
                const py = ((it.position && it.position.y) || 0) * sy;
                if (it.type === "text"){
                    out.push({ id, type:"text", x:px, y:py, text:String(d.value != null ? d.value : ""),
                        fs:Math.round((d.font_size || 18) * s), color:d.color || "#2b2b3a",
                        weight:d.weight==="bold" ? 700 : (d.weight==="regular" ? 400 : (d.weight || 600)),
                        align:d.align || "left", maxW:d.max_width ? d.max_width*sx : 0 });
                } else if (it.type === "geometric"){
                    const dim = d.dimensions || {};
                    const strokeW = Math.max(1, Math.round((d.stroke_width || 2) * s));
                    if (d.shape === "circle"){
                        const r = dim.radius || 40;
                        out.push({ id, type:"ellipse", x:px-r*sx, y:py-r*sy, w:2*r*sx, h:2*r*sy,
                            color:d.stroke_color || "#555", stroke:d.stroke_color || "#555",
                            fillColor:(d.fill_color && d.fill_color!=="transparent") ? d.fill_color : null,
                            width:strokeW, shadow:!!d.drop_shadow, dash:!!d.dash });
                    } else if (d.shape === "line" || d.shape === "arrow"){
                        out.push({ id, type:d.shape, x1:px, y1:py, x2:px+(dim.w||100)*sx, y2:py+(dim.h||0)*sy,
                            color:d.stroke_color || "#555", width:strokeW, dash:!!d.dash });
                    } else { // rect (default)
                        out.push({ id, type:"rect", x:px, y:py, w:(dim.w||120)*sx, h:(dim.h||80)*sy,
                            radius:(d.radius != null ? d.radius : 12) * s,
                            color:d.stroke_color || "#555", stroke:d.stroke_color || "#555",
                            fillColor:(d.fill_color && d.fill_color!=="transparent") ? d.fill_color : null,
                            width:strokeW, shadow:!!d.drop_shadow, dash:!!d.dash });
                    }
                } else if (it.type === "image"){
                    const dim = d.dimensions || {};
                    let w = (dim.w || d.width || 220) * sx, h;
                    if (dim.h) h = dim.h*sy; else if (d.aspect_ratio) h = w/d.aspect_ratio; else h = w*0.66;
                    out.push({ id, type:"image", x:px, y:py, w, h, src:d.source_url || d.src || "",
                        radius:(d.border_radius != null ? d.border_radius : 8) * s,
                        caption:d.caption || "", shadow:d.drop_shadow !== false });
                } else if (it.type === "connector"){
                    const lbl = d.label ? (typeof d.label === "string" ? d.label : d.label.value) : "";
                    out.push({ id, type:"connector", from:d.from_obj_id, to:d.to_obj_id, ctype:d.type || "straight",
                        startMarker:d.start_marker || "none", endMarker:(d.end_marker==="none" ? "none" : "arrow"),
                        color:d.color || accent, width:Math.max(1, Math.round((d.stroke_width || 2) * s)), label:lbl || "" });
                }
            }
            pushUndo();
            objects = out;
            boardBg = (cs && cs.background_color) || "#fff";
            selected = null;
            redraw();
            showNarration(spec.pedagogical_narration || (spec.meta && spec.meta.pedagogical_narration) || "");
            return out.length;
        }

        // ── render modal wiring ──
        const rOverlay = document.getElementById("wb-render-overlay");
        const rJson = document.getElementById("wb-render-json");
        const rErr = document.getElementById("wb-render-err");
        function openRender(){ rErr.textContent = ""; rOverlay.hidden = false; setTimeout(() => rJson.focus(), 30); }
        function closeRender(){ rOverlay.hidden = true; }
        document.getElementById("t-render").addEventListener("click", openRender);
        document.getElementById("wb-render-close").addEventListener("click", closeRender);
        document.getElementById("wb-render-cancel").addEventListener("click", closeRender);
        rOverlay.addEventListener("click", e => { if (e.target === rOverlay) closeRender(); });
        document.addEventListener("keydown", e => { if (!rOverlay.hidden && e.key === "Escape"){ e.preventDefault(); closeRender(); } });
        document.getElementById("wb-render-sample").addEventListener("click", () => { rJson.value = VESPER_SAMPLE_JSON; rErr.textContent = ""; });
        document.getElementById("wb-render-go").addEventListener("click", () => {
            rErr.textContent = "";
            let spec;
            try { spec = JSON.parse(rJson.value); }
            catch(err){ rErr.textContent = "JSON inválido: " + err.message; return; }
            try {
                const n = renderLessonJSON(spec);
                closeRender();
                if (!n) rErr.textContent = "El JSON no tenía objetos que dibujar.";
            } catch(err){ rErr.textContent = err.message; }
        });

        // sample lesson (Present Simple — third person -s) showcasing every object type
        const VESPER_SAMPLE_JSON = JSON.stringify({
            meta: { lesson_id:"present_simple_3rd", version:"1.0",
                style_guide:{ primary_font:"Inter, sans-serif", accent_color:"#c5a059", stroke_width:2 } },
            canvas_state: {
                background_color:"#ffffff",
                objects: [
                    { id:"title", type:"text", layer:3, position:{x:500,y:40},
                      data:{ value:"Present Simple — **he / she / it**", font_size:34, weight:"bold", color:"#1B1B2F", align:"center" } },
                    { id:"subtitle", type:"text", layer:3, position:{x:500,y:100},
                      data:{ value:"Add **-s** to the verb for third person singular", font_size:16, color:"#6b7a8d", align:"center" } },

                    { id:"he", type:"geometric", layer:2, position:{x:120,y:190},
                      data:{ shape:"rect", dimensions:{w:170,h:80}, radius:16, fill_color:"#eef2f8", stroke_color:"#1e5fa8", stroke_width:2, drop_shadow:true } },
                    { id:"she", type:"geometric", layer:2, position:{x:415,y:190},
                      data:{ shape:"rect", dimensions:{w:170,h:80}, radius:16, fill_color:"#fdeef0", stroke_color:"#b02a2a", stroke_width:2, drop_shadow:true } },
                    { id:"it", type:"geometric", layer:2, position:{x:710,y:190},
                      data:{ shape:"rect", dimensions:{w:170,h:80}, radius:16, fill_color:"#eef6f0", stroke_color:"#2d7a4f", stroke_width:2, drop_shadow:true } },
                    { id:"verb", type:"geometric", layer:2, position:{x:335,y:465},
                      data:{ shape:"rect", dimensions:{w:330,h:110}, radius:18, fill_color:"#1B1B2F", stroke_color:"#1B1B2F", stroke_width:2, drop_shadow:true } },

                    { type:"text", layer:3, position:{x:205,y:213}, data:{ value:"He", font_size:26, weight:"bold", color:"#1e5fa8", align:"center" } },
                    { type:"text", layer:3, position:{x:500,y:213}, data:{ value:"She", font_size:26, weight:"bold", color:"#b02a2a", align:"center" } },
                    { type:"text", layer:3, position:{x:795,y:213}, data:{ value:"It", font_size:26, weight:"bold", color:"#2d7a4f", align:"center" } },
                    { type:"text", layer:3, position:{x:500,y:500}, data:{ value:"work → work**s**", font_size:30, weight:"bold", color:"#ffffff", align:"center" } },

                    { type:"connector", layer:1, data:{ from_obj_id:"he", to_obj_id:"verb", type:"curved", end_marker:"arrow", color:"#c5a059", stroke_width:2, label:{ value:"+s" } } },
                    { type:"connector", layer:1, data:{ from_obj_id:"she", to_obj_id:"verb", type:"curved", end_marker:"arrow", color:"#c5a059", stroke_width:2, label:{ value:"+s" } } },
                    { type:"connector", layer:1, data:{ from_obj_id:"it", to_obj_id:"verb", type:"curved", end_marker:"arrow", color:"#c5a059", stroke_width:2, label:{ value:"+s" } } },

                    { type:"text", layer:3, position:{x:500,y:625}, max_width:760, data:{ value:"**Tip:** I, you, we and they use the **base** verb — no -s.", font_size:17, color:"#2b2b3a", align:"center", max_width:760 } }
                ]
            },
            pedagogical_narration:"Presenta la regla: con he, she e it añadimos -s al verbo. Muestra los tres sujetos apuntando al verbo 'works'. Luego recuerda que I/you/we/they mantienen el verbo base. Pide al alumno 3 ejemplos propios con he/she/it."
        }, null, 2);

        // ── CATEGORIA GRAMATICAL ──────────────────────────────────────
        // Sustituye a la transcripcion fonetica, que se pedia palabra por
        // palabra a api.dictionaryapi.dev: una peticion por termino, en serie,
        // contra una API comunitaria sin garantia de CORS ni de servicio. En
        // cuanto fallaba -- y fallaba -- las fichas se llenaban de guiones.
        //
        // Esto no consulta nada: deduce la categoria del propio material. Las
        // definiciones de Vesper estan escritas con un patron muy marcado
        // ("to establish a connection" / "a clock that makes a loud noise"), y
        // el termino a menudo se marca solo ("to break the ice", "a key
        // player"). Medido sobre las 2346 entradas del catalogo: etiqueta el
        // 75 % con ~2 % de error.
        //
        // REGLA DE ORO: ante la duda NO se etiqueta. Una ficha sin categoria
        // no le quita nada al alumno; una categoria equivocada le ensena algo
        // falso. Por eso hay senales deliberadamente fuera: el sufijo -ish
        // (embellish, publish, finish son verbos), -al (arrival, proposal), y
        // la lista de verbos desnudos en terminos de una sola palabra ("open",
        // "close", "near" encabezan tantas definiciones de adjetivo como de
        // verbo). Si anades reglas, mide antes: mas cobertura no vale un error.
        const POS = (function () {
            const PARTICLES = new Set("up down out in off on over back away through around along across apart aside forward together".split(" "));
            const PREPS = new Set("into onto for with at about from after as".split(" "));
            // Verbos que encabezan definiciones. Solo se consultan en terminos
            // de VARIAS palabras ("draft an email" -> "write an early version").
            const VERBS = new Set(("stop start leave wash clean make take give get put keep let move say tell ask talk speak write " +
                "read walk run buy sell pay send meet find look feel think know want need use show help work play watch listen " +
                "open close turn call bring wear cook eat drink sleep wake travel drive fly arrive return begin finish choose " +
                "decide agree refuse allow avoid prepare practise practice organize organise manage lead build create design " +
                "plan check test fix repair share join follow reduce increase improve solve explain describe compare discuss " +
                "report suggest recommend accept reject cancel confirm change become remain seem investigate introduce withdraw " +
                "provide offer act deliver present announce request demand insist admit deny claim argue persuade convince " +
                "negotiate arrange schedule postpone delay attend visit invite welcome greet thank apologise apologize complain " +
                "praise blame warn remind teach learn study review revise repeat translate pronounce spell count measure " +
                "calculate estimate predict assume expect hope wish prefer enjoy hate dislike love like miss forget remember " +
                "recognise recognize notice observe realise realize understand clarify summarise summarize outline highlight " +
                "emphasise emphasize stress support oppose defend attack protect prevent cause affect influence control limit " +
                "expand grow shrink rise fall drop climb jump push pull carry lift hold catch throw hit break connect link " +
                "separate divide combine mix add remove insert delete copy paste save load print upload download install " +
                "update upgrade restart reset switch enable disable adjust set apply assign allocate distribute collect gather " +
                "store record track monitor evaluate assess judge rank rate score grade mark correct edit publish release " +
                "launch ship deploy sign approve authorise authorize register enrol enroll hire fire promote train coach " +
                "mentor supervise delegate shut " +
                "prioritise prioritize handle process complete achieve reach earn win lose spend invest borrow lend budget " +
                "charge bill refund exchange order pack unpack lock unlock enter exit board land depart transfer wait queue " +
                "book reserve " +
                // Verbos de todos los dias. Encabezan las definiciones de los
                // niveles basicos, que es justo donde la etiqueta hace mas falta.
                "go come do put sit stand live wash brush comb dress cut tie fold carry hang pour fill boil fry bake knock " +
                "wave smile laugh cry shout whisper breathe swim ride climb throw kick dance sing draw paint spell borrow " +
                "lend owe earn waste mend sweep feed plant dig sew scan click type browse search").split(" "));
            const SUBJ = new Set("i we you they he she it let's that's there's it's i'd i've i'm what how would could don't doesn't".split(" "));
            const PREP_HEAD = new Set("on in at by under over with without from off out".split(" "));
            const DET = new Set("a an the your his her their its one's most".split(" "));

            // La definicion describe una FORMULA, no una cosa: "a polite way to
            // say sorry". Solo cabeceras que siempre son formula -- "response",
            // "comment" o "line" tambien son sustantivos (rebuttal, icebreaker).
            const EXPR_DEF = /^(a|an|the) (\w+ )?(phrase|expression|formula|opener|saying|greeting|softener|hedge|closing)\b/;
            const EXPR_WAY = /^(a|an|the) (\w+ )?way to (say|ask|tell|start|open|close|end|decline|agree|disagree|greet|apologi[sz]e|suggest|propose|request|answer|reply|introduce|interrupt|refuse|accept)\b/;
            const ADJ_DEF  = /^(not|relating|able|willing|describes|describing|feeling|having|full of|used to describe|showing|providing|causing|lacking|involving|expressing|marked by|characteri[sz]ed by)/;
            // Definicion que arranca en un sustantivo generico: "Things you do
            // every day". Fuera "place", "part", "list" y "number": tambien son
            // verbos corrientes ("Place or study in context" = contextualize).
            const NOUN_DEF = /^(thing|things|person|people|amount|group|piece|period|member|worker|building|room|area|event|word|machine)\b/;
            // Un verbo desnudo seguido de "to", "and" u "or" no esta tomando
            // complemento directo: es un adjetivo disfrazado. "Close TO
            // something" (near), "Open AND honest" (candor), "Open TO
            // interpretation" (ambiguous). "Wash your body" si es un verbo.
            const LOOSE = new Set(["to", "and", "or", "but"]);
            // Participios sueltos: Tired, Bored, Excited -- salvo los -ed que
            // son sustantivos de pleno derecho.
            const ED_NOUNS = new Set("speed need seed bed red hundred thousand method period record shed weed feed breed creed".split(" "));
            const NOUN_SUF = /(tion|sion|ment|ness|ity|ship|hood|ance|ence|ancy|ency|ism|ist|ology|acy|ure|dom)$/;
            // -ive queda fuera tras r/v: arrive, derive, drive, thrive, revive.
            const ADJ_SUF  = /(ous|ful|able|ible|less|ical)$|(?:[^rv])ive$/;
            const VERB_SUF = /(ise|ize|ify)$/;
            const ADV_NOT  = /(friend|dai|week|month|year|ear|love|like|ug|cost|light|si|on|ho)ly$/;

            function of(term, def) {
                const raw = String(term || "").trim().toLowerCase();
                const d = String(def || "").trim().toLowerCase();
                if (!raw) return "";
                const t = raw.replace(/\([^)]*\)/g, " ").split("/")[0].replace(/[^a-z' \-]/g, " ").trim();
                const w = t.split(/\s+/).filter(Boolean);
                if (!w.length) return "";

                if (raw.endsWith("?") || raw.indexOf("…") >= 0 || raw.indexOf("...") >= 0) return "expression";
                if (SUBJ.has(w[0])) return "expression";
                if (w.length >= 5) return "expression";
                // "on the same page", "in the loop", "under pressure": locucion,
                // no adjetivo, aunque su definicion empiece por gerundio.
                if (w.length >= 3 && PREP_HEAD.has(w[0])) return "expression";
                if (EXPR_DEF.test(d) || EXPR_WAY.test(d)) return "expression";

                if (w[0] === "to") {
                    const rest = w.slice(1);
                    const last = rest[rest.length - 1];
                    return (rest.length >= 2 && (PARTICLES.has(last) || PREPS.has(last)))
                        ? "phrasal verb" : "verb";
                }
                if (w[0] === "a" || w[0] === "an" || w[0] === "the") return "noun";

                const dw = d.split(/\s+/);
                // "Set of rules in code": el "of" delata un sintagma nominal.
                // Salvo tras participio ("Deserted of people"), que es adjetivo.
                const nounPhrase = dw.length > 1 && dw[1] === "of" && !/ed$/.test(dw[0]);
                const bare = dw.length ? VERBS.has(dw[0].replace(/[^a-z']/g, "")) : false;
                const loose = dw.length > 1 && LOOSE.has(dw[1]);
                const verbish = /^to /.test(d) ||
                                (bare && !nounPhrase && (w.length > 1 || !loose));

                const last = w[w.length - 1];
                if ((w.length === 2 || w.length === 3) && (PARTICLES.has(last) || PREPS.has(last)) &&
                    (verbish || VERBS.has(w[0]))) return "phrasal verb";
                if (w.length >= 2 && VERBS.has(w[0]) && (verbish || DET.has(w[1]))) return "verb";

                if (/^to /.test(d)) return "verb";
                if (NOUN_DEF.test(d)) return "noun";
                if (ADJ_DEF.test(d)) return "adjective";
                if (/^(a|an|the) /.test(d)) return "noun";

                if (w.length === 1) {
                    const x = w[0];
                    if (/ed$/.test(x) && !ED_NOUNS.has(x)) return "adjective";
                    if (NOUN_SUF.test(x)) return "noun";
                    if (ADJ_SUF.test(x)) return "adjective";
                    if (VERB_SUF.test(x)) return "verb";
                    if (/ly$/.test(x) && !ADV_NOT.test(x)) return "adverb";
                }
                if (nounPhrase) return "noun";
                if (verbish) return "verb";
                return "";                       // sin senal fiable: en blanco
            }
            return { of };
        })();

        // ── EJEMPLOS DE USO ───────────────────────────────────────────
        // Una definicion dice que significa una palabra; no dice como se pone
        // en una frase. Para un alumno eso es la mitad del trabajo: "fall
        // within someone's remit" se entiende leyendola y aun asi se coloca
        // mal en cuanto hay que decirla. Por eso cada ficha lleva una frase
        // de ejemplo escrita a mano.
        //
        // Los ejemplos NO viven en los ficheros de datos: esos cuatro estan
        // auto-generados desde cuatro fuentes distintas (HTML de los libros,
        // .py de Core Practice, lessons.json de Political...) y meter el
        // ejemplo en cada una obligaria a tocar cuatro build scripts. Viven
        // aparte, en vesper_vocab_examples.js, indexados por termino.
        //
        // Dos capas, y la especifica gana: `byDeck[deckKey][termino]` para los
        // 356 terminos que significan cosas distintas segun el curso, y
        // `byTerm[termino]` para el resto. Si no hay ejemplo no se imprime
        // nada -- misma regla de oro que la categoria gramatical.
        const EXAMPLES = window.VOCAB_EXAMPLES || {};
        const exKey = t => String(t).trim().toLowerCase().replace(/\s+/g, " ");
        function exFor(term){
            const k = exKey(term);
            const scoped = (EXAMPLES.byDeck || {})[deckKey];
            return (scoped && scoped[k]) || (EXAMPLES.byTerm || {})[k] || "";
        }

        // ── VOCABULARY ────────────────────────────────────────────────
        const vgrid = document.getElementById("vocab-grid");
        const vempty = document.getElementById("vocab-empty");
        const vtools = document.querySelector(".vocab-tools");
        const vresults = document.getElementById("vocab-results");
        if (!vocab.length) {
            vgrid.style.display = "none"; vempty.style.display = "block"; vtools.style.display = "none";
        } else {
            document.getElementById("vocab-count").textContent = vocab.length + (vocab.length === 1 ? " word" : " words");
            vocab.forEach(v => {
                const pos = POS.of(v.term, v.def);
                const ex = exFor(v.term);
                const card = document.createElement("div");
                card.className = "vcard";
                card.dataset.term = v.term.toLowerCase();
                card.dataset.def = (v.def || "").toLowerCase();
                card.dataset.pos = pos;
                card.dataset.ex = ex.toLowerCase();
                card.innerHTML = `
                    <div class="vhead">
                        <div class="vhead-main">
                            <p class="term">${v.term}</p>
                            ${pos ? `<p class="pos">${pos}</p>` : ""}
                        </div>
                        <i class="fas fa-chevron-down vchev"></i>
                    </div>
                    <div class="vbody">
                        <p class="def"><span class="deflabel">Definition</span>${v.def || "—"}</p>
                        ${ex ? `<p class="ex"><span class="exlabel">In use</span>${esc(ex)}</p>` : ""}
                    </div>`;
                card.addEventListener("click", () => card.classList.toggle("open"));
                vgrid.appendChild(card);
            });
        }
        document.getElementById("vocab-search").addEventListener("input", e => {
            const q = e.target.value.trim().toLowerCase();
            let shown = 0;
            document.querySelectorAll(".vcard").forEach(c => {
                // La categoria entra en la busqueda: "phrasal" o "adjective"
                // dejan a la vista solo esas fichas, que es como un profesor
                // arma una tanda de practica en clase.
                const hit = !q || c.dataset.term.includes(q) || c.dataset.def.includes(q) ||
                            (c.dataset.pos || "").includes(q) || (c.dataset.ex || "").includes(q);
                c.style.display = hit ? "" : "none";
                if (hit) shown++;
            });
            if (!q) { vresults.style.display = "none"; return; }
            vresults.style.display = "block";
            vresults.textContent = shown
                ? `${shown} of ${vocab.length} words match “${e.target.value.trim()}”`
                : `No words match “${e.target.value.trim()}” — check the spelling or clear the filter.`;
        });
        document.getElementById("v-expand").addEventListener("click", () =>
            document.querySelectorAll(".vcard").forEach(c => { if (c.style.display !== "none") c.classList.add("open"); }));
        document.getElementById("v-collapse").addEventListener("click", () =>
            document.querySelectorAll(".vcard").forEach(c => c.classList.remove("open")));

        // ── FLASHCARD STUDY MODE ──────────────────────────────────────
        const flashWrap = document.getElementById("flash-wrap");
        const flashCardEl = document.getElementById("flash-card");
        const flashStage = document.getElementById("flash-stage");
        const flashNav = document.getElementById("flash-nav");
        const flashSummary = document.getElementById("flash-summary");
        const flashTop = flashWrap.querySelector(".flash-top");
        let deck = [], deckPos = 0, marks = [];

        function posFor(term){
            const c = vgrid.querySelector(`.vcard[data-term="${CSS.escape(String(term).toLowerCase())}"]`);
            return c ? (c.dataset.pos || "") : "";
        }
        function shuffleArr(a){
            for (let i = a.length - 1; i > 0; i--){ const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
            return a;
        }
        function startStudy(list){
            deck = list.slice(); deckPos = 0; marks = new Array(deck.length).fill(null);
            vgrid.style.display = "none"; vtools.style.display = "none"; vresults.style.display = "none";
            flashWrap.style.display = "block";
            flashSummary.style.display = "none"; flashStage.style.display = ""; flashNav.style.display = ""; flashTop.style.display = "";
            showCard();
        }
        function exitStudy(){
            flashWrap.style.display = "none";
            vgrid.style.display = ""; vtools.style.display = "";
        }
        function showCard(){
            const c = deck[deckPos];
            const apply = () => {
                document.getElementById("flash-term").textContent = c.term;
                document.getElementById("flash-pos").textContent = posFor(c.term);
                document.getElementById("flash-def").textContent = c.def || "—";
                const exEl = document.getElementById("flash-ex");
                const ex = exFor(c.term);
                exEl.style.display = ex ? "" : "none";
                exEl.innerHTML = "";
                if (ex){
                    const lab = document.createElement("span");
                    lab.className = "exlabel"; lab.textContent = "In use";
                    exEl.appendChild(lab);
                    exEl.appendChild(document.createTextNode(ex));
                }
            };
            // if the card is flipped, let it rotate back before swapping content
            if (flashCardEl.classList.contains("flipped")){ flashCardEl.classList.remove("flipped"); setTimeout(apply, 240); }
            else apply();
            document.getElementById("flash-progress").textContent = `Card ${deckPos + 1} / ${deck.length}`;
            document.getElementById("f-prev").disabled = deckPos === 0;
        }
        function nextCard(){ if (deckPos < deck.length - 1){ deckPos++; showCard(); } else showSummary(); }
        function prevCard(){ if (deckPos > 0){ deckPos--; showCard(); } }
        function markCard(val){ marks[deckPos] = val; nextCard(); }
        function showSummary(){
            const known = marks.filter(m => m === "yes").length;
            const missed = deck.length - known;
            document.getElementById("fs-known").textContent = known;
            document.getElementById("fs-review").textContent = missed;
            document.getElementById("f-review-missed").style.display = missed ? "" : "none";
            flashStage.style.display = "none"; flashNav.style.display = "none"; flashTop.style.display = "none";
            flashSummary.style.display = "block";
        }
        document.getElementById("v-study").addEventListener("click", () => startStudy(vocab));
        document.getElementById("f-exit").addEventListener("click", exitStudy);
        document.getElementById("f-exit2").addEventListener("click", exitStudy);
        document.getElementById("f-shuffle").addEventListener("click", () => startStudy(shuffleArr(deck.slice())));
        document.getElementById("f-restart").addEventListener("click", () => startStudy(shuffleArr(deck.slice())));
        document.getElementById("f-review-missed").addEventListener("click", () => startStudy(deck.filter((_, i) => marks[i] !== "yes")));
        flashCardEl.addEventListener("click", () => flashCardEl.classList.toggle("flipped"));
        document.getElementById("f-next").addEventListener("click", nextCard);
        document.getElementById("f-prev").addEventListener("click", prevCard);
        document.getElementById("f-yes").addEventListener("click", () => markCard("yes"));
        document.getElementById("f-no").addEventListener("click", () => markCard("no"));
        document.addEventListener("keydown", e => {
            if (!document.getElementById("panel-vocab").classList.contains("active")) return;
            if (flashWrap.style.display === "none") return;
            if (e.target.tagName === "INPUT") return;
            if (e.key === " " || e.key === "Enter"){ e.preventDefault(); flashCardEl.classList.toggle("flipped"); }
            else if (e.key === "ArrowRight"){ e.preventDefault(); nextCard(); }
            else if (e.key === "ArrowLeft"){ e.preventDefault(); prevCard(); }
        });

        // initial board sizing if board tab opened later handled; size now in case
        fitBoard();
