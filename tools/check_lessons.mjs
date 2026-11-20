#!/usr/bin/env node
// Valida las lecciones de leccion.html cargando los packs EN EL MISMO ORDEN
// que la página (cada pack hace merge sobre window.VESPER_LESSONS).
// Uso:  node tools/check_lessons.mjs        (sale 1 si hay errores)
import { readFileSync, existsSync } from "node:fs";
import vm from "node:vm";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const html = readFileSync(join(ROOT, "leccion.html"), "utf8");
const all = [...html.matchAll(/<script[^>]+src="([^"?#]+\.js)/g)].map(m => m[1]);
// Cargar en un contexto sin DOM los scripts que leccion.html incluye antes de
// leccion_app.js. Los de datos corren sin problema; los de UI que fallan se
// ignoran, salvo que sean uno de los packs que leccion_app.js fusiona.
const before = all.slice(0, Math.max(0, all.indexOf("leccion_app.js")));
const ctx = vm.createContext({ console });
ctx.window = ctx; ctx.self = ctx;
const loaded = [], skipped = [];
for (const f of before) {
  try { vm.runInContext(readFileSync(join(ROOT, f), "utf8"), ctx, { filename: f }); loaded.push(f); }
  catch (e) { skipped.push(`${f} (${e.message.slice(0, 60)})`); }
}
const win = ctx;

// Repetir las fusiones que hace leccion_app.js al arrancar (mismas líneas, mismo orden).
const app = readFileSync(join(ROOT, "leccion_app.js"), "utf8");
const merges = app.split("\n").filter(l => /^\s*if \(window\.VESPER_[A-Z0-9_]+ && VESPER_[A-Z0-9_]+\.merge\)/.test(l));
const needed = merges.map(l => l.match(/window\.(VESPER_[A-Z0-9_]+)/)[1]);
const missing = needed.filter(n => !win[n]);
if (missing.length) { console.error(`✗ no cargaron: ${missing.join(", ")}\n  saltados: ${skipped.join("; ")}`); process.exit(2); }
if (!merges.length) { console.error("✗ no encontré las llamadas .merge() en leccion_app.js; actualiza este script"); process.exit(2); }
vm.runInContext(merges.join("\n"), ctx, { filename: "leccion_app.js (merges)" });


// Una función por tipo de ejercicio: devuelve la lista de problemas.
const mc = (opts, idx, label = "") => {
  if (!Array.isArray(opts) || opts.length < 2) return [`${label}menos de 2 opciones`];
  if (!Number.isInteger(idx) || idx < 0 || idx >= opts.length) return [`${label}correctIndex ${idx} fuera de rango (${opts.length} opciones)`];
  if (new Set(opts.map(o => String(o).trim().toLowerCase())).size !== opts.length) return [`${label}opciones duplicadas`];
  return [];
};
const nonEmpty = (a, what) => (Array.isArray(a) && a.length && a.every(x => String(x).trim()) ? [] : [`${what} vacío`]);
const bag = a => [...(a || [])].map(String).sort().join("\u0001");
const CHECKS = {
  multiple_choice: e => mc(e.options, e.correctIndex),
  word_order: e => (!e.words?.length ? ["sin words"] : bag(e.words) !== bag(e.correctOrder) ? ["correctOrder no usa exactamente las mismas palabras que words"] : []),
  fill_blank: e => [...(/_{2,}/.test(e.sentence || "") ? [] : ["sentence sin hueco ___"]), ...nonEmpty(e.answers, "answers")],
  translate: e => [...(e.prompt ? [] : ["sin prompt"]), ...nonEmpty(e.answers, "answers")],
  true_false: e => (typeof e.answer === "boolean" ? [] : [`answer no es booleano (${JSON.stringify(e.answer)})`]),
  speak: e => (String(e.text || "").trim() ? [] : ["sin text"]),
  listening: e => [
    ...(String(e.text || "").trim() ? [] : ["sin text"]),
    ...(e.options ? mc(e.options, e.correctIndex) : nonEmpty(e.answers, "answers (ni options)")),
  ],
  find_error: e => {
    const n = (e.segments || []).filter(x => x && typeof x === "object" && "u" in x).length;
    return n < 2 ? ["menos de 2 segmentos subrayables"]
      : !Number.isInteger(e.correctIndex) || e.correctIndex < 0 || e.correctIndex >= n ? [`correctIndex ${e.correctIndex} fuera de rango (${n} segmentos)`]
      : !String(e.correction || "").trim() ? ["sin correction"] : [];
  },
  matching: e => {
    const p = e.pairs || [];
    if (p.length < 2) return ["menos de 2 pares"];
    const out = [];
    if (new Set(p.map(x => String(x.l).toLowerCase())).size !== p.length) out.push("lado izquierdo repetido");
    if (new Set(p.map(x => String(x.r).toLowerCase())).size !== p.length) out.push("lado derecho repetido (dos respuestas iguales)");
    return out;
  },
  categorize: e => {
    const ids = new Set((e.buckets || []).map(b => b.id));
    if (ids.size < 2) return ["menos de 2 buckets"];
    const out = (e.items || []).filter(it => !ids.has(it.bucket)).map(it => `item "${it.t}" en bucket inexistente "${it.bucket}"`);
    for (const id of ids) if (!(e.items || []).some(it => it.bucket === id)) out.push(`bucket "${id}" sin items`);
    return out;
  },
  reading: e => [
    ...(String(e.passage || "").trim() ? [] : ["sin passage"]),
    ...(!e.questions?.length ? ["sin questions"] : e.questions.flatMap((q, j) => mc(q.options, q.correctIndex, `pregunta ${j + 1}: `))),
  ],
};

const L = win.VESPER_LESSONS || {};
const ORDER = win.VESPER_LESSONS_ORDER || [];
const errors = [], warns = [];
const err = (id, m) => errors.push(`${id}: ${m}`);
const LEVELS = new Set(["A0", "A1", "A2", "B1", "B2", "C1", "C2"]);

for (const [id, l] of Object.entries(L)) {
  if (l.lessonId !== id) err(id, `lessonId "${l.lessonId}" ≠ clave`);
  if (!LEVELS.has(l.level)) err(id, `level inválido "${l.level}"`);
  if (!l.title) err(id, "sin title");
  if (l.tipo && !["aprende", "practica"].includes(l.tipo)) err(id, `tipo inválido "${l.tipo}"`);
  if (!l.explanation?.body && !l.explanation?.sections?.length) err(id, "explanation vacía");
  if (l.nextLessonId && !L[l.nextLessonId]) err(id, `nextLessonId "${l.nextLessonId}" no existe`);
  const ex = l.exercises || [];
  if (!ex.length && l.tipo !== "aprende") warns.push(`${id}: práctica sin ejercicios`);
  ex.forEach((e, i) => {
    const at = `${id} ej${i + 1} (${e.type})`;
    const check = CHECKS[e.type];
    if (!check) return warns.push(`${at}: tipo sin validador`);
    for (const m of check(e)) err(at, m);
    if (e.audio && !existsSync(join(ROOT, e.audio))) err(at, `audio no existe: ${e.audio}`);
  });
}
const seen = new Set();
for (const id of ORDER) {
  if (!L[id]) err("ORDER", `"${id}" no existe en VESPER_LESSONS`);
  if (seen.has(id)) err("ORDER", `"${id}" repetido`);
  seen.add(id);
}
for (const id of Object.keys(L)) if (!seen.has(id)) warns.push(`${id}: no está en VESPER_LESSONS_ORDER (inalcanzable)`);

const types = {};
for (const l of Object.values(L)) for (const e of l.exercises || []) types[e.type] = (types[e.type] || 0) + 1;
console.log(`Scripts cargados: ${loaded.length} · lecciones: ${Object.keys(L).length} · ORDER: ${ORDER.length} · fusiones: ${merges.length}`);
console.log("Ejercicios por tipo: " + Object.entries(types).map(([t, n]) => `${t}=${n}`).join(", "));
warns.slice(0, 30).forEach(w => console.log("⚠ " + w));
if (warns.length > 30) console.log(`⚠ … y ${warns.length - 30} avisos más`);
errors.forEach(e => console.log("✗ " + e));
console.log(errors.length ? `\n${errors.length} errores` : "\n✓ sin errores");
process.exit(errors.length ? 1 : 0);
