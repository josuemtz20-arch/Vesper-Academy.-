/* ============================================================
 * test_exam_grader.mjs — pruebas de exam_grader.js SIN wrangler.
 *   node worker/test_exam_grader.mjs
 * ------------------------------------------------------------
 * Copia exam_grader.js a un archivo temporal cambiando sus dos imports
 * ("cloudflare:workers" y exam_keys.json) por un DurableObject mínimo y un
 * banco FALSO de claves (no hace falta el exam_keys.json real), y simula el
 * Durable Object, Identity Toolkit, el token de la cuenta de servicio y
 * Firestore con un fetch falso. Revisa lo que cierra la falsificación de
 * notas: el examen de nivel no filtra claves, el tope de intentos
 * calificados, el uid del intento y la calificación de los exámenes por curso.
 * ============================================================ */
import { readFileSync, writeFileSync, mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { generateKeyPairSync } from "node:crypto";
import assert from "node:assert/strict";

const here = dirname(fileURLToPath(import.meta.url));

/* ---------- banco falso ---------- */
globalThis.__KEYS = {
  version: "t1",
  exam: { A1: { pass: 60, items: {
    "e:1": { type: "multiple_choice", skill: "grammar", question: "I ___ a student.", options: ["am", "is"], correctIndex: 0, explanation: "SECRETO" },
    "e:2": { type: "true_false", skill: "reading", statement: "Sky is blue.", answer: true },
    "e:3": { type: "fill_blank", skill: "vocab", sentence: "Good ___", answers: ["morning"] }
  } }, A2: { pass: 60, items: {
    "f:1": { type: "multiple_choice", skill: "grammar", question: "x", options: ["a", "b"], correctIndex: 1 }
  } } },
  boss: { A1: { pass: 50, size: 2, items: {
    "b:1": { type: "multiple_choice", question: "q1", options: ["a", "b"], correctIndex: 1 },
    "b:2": { type: "multiple_choice", question: "q2", options: ["a", "b"], correctIndex: 0 },
    "b:3": { type: "multiple_choice", question: "q3", options: ["a", "b"], correctIndex: 0 }
  } } }
};
const src = readFileSync(join(here, "exam_grader.js"), "utf8")
  .replace(/^import \{ DurableObject \} from "cloudflare:workers";$/m,
    "class DurableObject { constructor(ctx, env) { this.ctx = ctx; this.env = env; } }")
  .replace(/^import KEYS from "\.\/exam_keys\.json";$/m, "const KEYS = globalThis.__KEYS;");
assert.ok(!/cloudflare:workers|exam_keys\.json"/.test(src.split("\n").filter((l) => l.startsWith("import")).join("\n")), "imports reemplazados");
const tmp = join(mkdtempSync(join(tmpdir(), "examg-")), "exam_grader.mjs");
writeFileSync(tmp, src);
const G = await import(pathToFileURL(tmp).href);

/* ---------- Durable Object falso ---------- */
let NOW = Date.now();
Date.now = () => NOW;
function fakeNamespace() {
  const inst = new Map();
  return {
    idFromName: (n) => n,
    get(id) {
      if (!inst.has(id)) {
        const m = new Map();
        const storage = {
          get: async (k) => (m.has(k) ? structuredClone(m.get(k)) : undefined),
          put: async (k, v) => { m.set(k, structuredClone(v)); },
          deleteAll: async () => m.clear(),
          setAlarm: async () => {}
        };
        inst.set(id, new G.ExamAttempt({ storage }, {}));
      }
      return inst.get(id);
    }
  };
}

/* ---------- Google falso ---------- */
const { privateKey } = generateKeyPairSync("rsa", { modulusLength: 2048 });
const SA = JSON.stringify({ client_email: "sa@test", token_uri: "https://oauth2.googleapis.com/token",
  private_key: privateKey.export({ type: "pkcs8", format: "pem" }) });
/* tokens: "tok-<uid>-<correo>" (siempre > 20 caracteres) */
const DB = {};      // ruta -> fields
const writes = [];
let failWrites = false;
const S = (v) => ({ stringValue: v });
globalThis.fetch = async (url, opt) => {
  url = String(url);
  const json = (status, body) => ({ ok: status < 300, status, json: async () => body, text: async () => JSON.stringify(body) });
  if (url.startsWith("https://identitytoolkit.googleapis.com/")) {
    const t = JSON.parse(opt.body).idToken, m = /^tok-([^-]+)-(.+)$/.exec(t);
    if (!m) return json(400, { error: "INVALID_ID_TOKEN" });
    return json(200, { users: [{ localId: m[1], email: m[2], emailVerified: !m[2].startsWith("unv") }] });
  }
  if (url.startsWith("https://oauth2.googleapis.com/token")) return json(200, { access_token: "sa-token", expires_in: 3600 });
  const base = "https://firestore.googleapis.com/v1/projects/vesper-academy/databases/teachermanuals/documents/";
  if (url.startsWith(base)) {
    assert.equal(opt.headers.Authorization, "Bearer sa-token");
    const path = decodeURIComponent(url.slice(base.length));
    if (opt.method === "POST") {
      if (failWrites) return json(500, { error: "boom" });
      writes.push({ path, doc: JSON.parse(opt.body) });
      return json(200, {});
    }
    return DB[path] ? json(200, { fields: DB[path] }) : json(404, {});
  }
  throw new Error("fetch inesperado " + url);
};

const mkEnv = (extra) => Object.assign({ EXAM_ATTEMPTS: fakeNamespace(), FIREBASE_SA: SA }, extra || {});
const okRate = async () => ({ ok: true });
const lim = () => 0;
const call = (env, path, body) => G.handleExam(path, body, env, okRate, lim);

let passed = 0;
async function test(name, fn) {
  try { await fn(); passed++; console.log("ok   " + name); }
  catch (e) { console.error("FAIL " + name + "\n     " + (e && e.stack || e)); process.exitCode = 1; }
}

DB["students/ana@x.com"] = { sid: S("sid-ana"), group: S("g1") };
DB["students/beto@x.com"] = { sid: S("sid-beto"), group: S("g1"), books: { arrayValue: { values: [S("other_book")] } } };
DB["teachers/profe@x.com"] = { groups: { arrayValue: { values: [S("g1")] } } };
DB["roles/jefa@x.com"] = { role: S("admin") };
DB["exams/daily_life_vol0"] = { data: S(JSON.stringify({
  title: "Daily Life 0", desc: "d", level: "A1", pass: 50,
  sections: [
    { title: "Grammar", instructions: "Pick", questions: [
      { q: "Q1", options: ["a", "b", "c"], answer: 2 }, { q: "Q2", options: ["a", "b"], answer: 0 } ] },
    { title: "Writing", type: "open", tasks: ["Write about you"] },
    { title: "Reading", passage: "<strong>Text</strong> hi", questions: [
      { q: "Q3", options: ["x", "y"], answer: 1, explanation: "SECRETO" } ] }
  ] })) };
const ANA = "tok-uidana-ana@x.com", ANA2 = "tok-uidotra-ana@x.com";

async function levelRun(env, tokStart, tokFinish, picks, level) {
  level = level || "A1";
  const s = await call(env, "/exam/start", { kind: "exam", level, version: "t1", idToken: tokStart });
  assert.equal(s[0], 200, JSON.stringify(s));
  const ids = Object.keys(__KEYS.exam[level].items);
  for (const id of ids) {
    const r = await call(env, "/exam/answer", { attemptId: s[1].attemptId, id, response: picks[id] });
    assert.equal(r[0], 200, JSON.stringify(r));
  }
  const f = await call(env, "/exam/finish", { attemptId: s[1].attemptId, idToken: tokFinish });
  assert.equal(f[0], 200);
  return { start: s[1], fin: f[1] };
}
const RIGHT = { "e:1": { choice: 0 }, "e:2": { choice: 1 }, "e:3": { text: "Morning!" }, "f:1": { choice: 1 } };
const WRONG = { "e:1": { choice: 1 }, "e:2": { choice: 0 }, "e:3": { text: "night" }, "f:1": { choice: 0 } };

await test("examen de nivel: /exam/answer no filtra clave ni veredicto", async () => {
  const env = mkEnv();
  const s = await call(env, "/exam/start", { kind: "exam", level: "A1", version: "t1" });
  const r = await call(env, "/exam/answer", { attemptId: s[1].attemptId, id: "e:1", response: { choice: 1 } });
  assert.deepEqual(r, [200, { ok: true, first: true }]);
  const r2 = await call(env, "/exam/answer", { attemptId: s[1].attemptId, id: "e:1", response: { choice: 0 } });
  assert.deepEqual(r2, [200, { ok: true, first: false }]);
  const f = await call(env, "/exam/finish", { attemptId: s[1].attemptId });
  const txt = JSON.stringify(f[1]);
  assert.ok(!/SECRETO|correctIndex|"answers?"|detail|reveal/.test(txt), txt);
  assert.equal(f[1].score, 0, "cuenta la PRIMERA respuesta");
  assert.equal(f[1].total, 3);
  assert.deepEqual(f[1].skills, { grammar: { c: 0, t: 1 }, reading: { c: 0, t: 1 }, vocab: { c: 0, t: 1 } });
  assert.equal(f[1].saved, false); assert.equal(f[1].why, "no_session");
});

await test("jefe: revela la clave y total == ids.length", async () => {
  const env = mkEnv();
  const s = await call(env, "/exam/start", { kind: "boss", level: "A1", version: "t1", ids: ["b:1", "b:3"], idToken: ANA });
  assert.equal(s[1].total, 2);
  assert.equal(s[1].graded, undefined, "el jefe no tiene tope");
  const r = await call(env, "/exam/answer", { attemptId: s[1].attemptId, id: "b:1", response: { choice: 1 } });
  assert.equal(r[1].correct, true); assert.equal(r[1].reveal.correctIndex, 1);
  await call(env, "/exam/answer", { attemptId: s[1].attemptId, id: "b:3", response: { choice: 1 } });
  const n = writes.length;
  const f = await call(env, "/exam/finish", { attemptId: s[1].attemptId, idToken: ANA });
  assert.equal(f[1].total, 2); assert.equal(f[1].score, 1); assert.equal(f[1].percent, 50);
  assert.equal(f[1].saved, true);
  assert.equal(writes.length, n + 1);
  assert.equal(writes[n].doc.fields.examType.stringValue, "boss");
});

await test("examen de nivel: guarda con el mismo uid; gradedBy worker; sid/grupo de students/", async () => {
  const env = mkEnv(), n = writes.length;
  const { start, fin } = await levelRun(env, ANA, ANA, RIGHT);
  assert.deepEqual(start.graded, { max: 3, used: 0, left: 3, resetAt: 0 });
  assert.equal(fin.score, 3); assert.equal(fin.percent, 100); assert.equal(fin.passed, true);
  assert.equal(fin.saved, true); assert.equal(fin.cap.left, 2);
  const d = writes[n].doc.fields;
  assert.equal(writes[n].path, "exam_results");
  assert.equal(d.gradedBy.stringValue, "worker"); assert.equal(d.studentUid.stringValue, "uidana");
  assert.equal(d.sid.stringValue, "sid-ana"); assert.equal(d.examId.stringValue, "exam:A1");
  assert.equal(d.detail.arrayValue.values.length, 3);
});

await test("examen de nivel: otro uid al terminar, o sin sesión al empezar -> no se guarda", async () => {
  const env = mkEnv(), n = writes.length;
  assert.equal((await levelRun(env, ANA, ANA2, RIGHT)).fin.why, "session_mismatch");
  assert.equal((await levelRun(env, undefined, ANA, RIGHT)).fin.why, "session_mismatch");
  assert.equal((await levelRun(env, "tok-uidunv-unv@x.com", "tok-uidunv-unv@x.com", RIGHT)).fin.why, "no_session");
  assert.equal(writes.length, n);
});

await test("tope: 3 intentos calificados por 7 días; el 4.º da nota pero saved:false", async () => {
  const env = mkEnv(), n = writes.length;
  for (let i = 0; i < 3; i++) assert.equal((await levelRun(env, ANA, ANA, WRONG)).fin.saved, true);
  const four = await levelRun(env, ANA, ANA, RIGHT);
  assert.equal(four.start.graded.left, 0);
  assert.equal(four.fin.score, 3, "la nota se devuelve igual");
  assert.equal(four.fin.saved, false); assert.equal(four.fin.why, "attempt_cap");
  assert.equal(writes.length, n + 3);
  /* otro nivel y otra cuenta llevan su propio contador */
  assert.equal((await levelRun(env, ANA, ANA, RIGHT, "A2")).fin.saved, true);
  assert.equal((await levelRun(env, ANA2, ANA2, RIGHT)).fin.saved, true);
  /* la ventana se desliza: 7 días después vuelve a haber lugar */
  NOW += 7 * 24 * 3600 * 1000 + 1000;
  assert.equal((await levelRun(env, ANA, ANA, RIGHT)).fin.saved, true);
});

await test("tope configurable: EXAM_CAP_MAX=1 y EXAM_CAP_MAX=0 (sin tope)", async () => {
  const one = mkEnv({ EXAM_CAP_MAX: "1" });
  assert.equal((await levelRun(one, ANA, ANA, RIGHT)).fin.saved, true);
  assert.equal((await levelRun(one, ANA, ANA, RIGHT)).fin.why, "attempt_cap");
  const off = mkEnv({ EXAM_CAP_MAX: "0" });
  for (let i = 0; i < 5; i++) assert.equal((await levelRun(off, ANA, ANA, RIGHT)).fin.saved, true);
  assert.deepEqual(G.capConf({ COURSE_EXAM_CAP_DAYS: "2" }, true), { max: 3, windowMs: 2 * 24 * 3600 * 1000 });
});

await test("tope: si Firestore falla se devuelve el lugar", async () => {
  const env = mkEnv({ EXAM_CAP_MAX: "1" });
  failWrites = true;
  assert.equal((await levelRun(env, ANA, ANA, RIGHT)).fin.why, "save_failed");
  failWrites = false;
  assert.equal((await levelRun(env, ANA, ANA, RIGHT)).fin.saved, true);
});

await test("segundo finish: misma nota, no se guarda dos veces", async () => {
  const env = mkEnv(), n = writes.length;
  const s = await call(env, "/exam/start", { kind: "exam", level: "A1", version: "t1", idToken: ANA });
  await call(env, "/exam/answer", { attemptId: s[1].attemptId, id: "e:1", response: { choice: 0 } });
  const f1 = await call(env, "/exam/finish", { attemptId: s[1].attemptId, idToken: ANA });
  const f2 = await call(env, "/exam/finish", { attemptId: s[1].attemptId, idToken: ANA });
  assert.equal(f1[1].saved, true); assert.equal(f2[1].why, "already_finished");
  assert.equal(f2[1].score, 1); assert.ok(f2[1].skills && !f2[1].detail);
  assert.equal(writes.length, n + 1);
});

async function courseRun(env, tok, answers, examId) {
  const s = await call(env, "/exam/course/start", { examId: examId || "daily_life_vol0", idToken: tok });
  if (s[0] !== 200) return { s };
  const f = await call(env, "/exam/course/finish", { attemptId: s[1].attemptId, idToken: tok, answers, alias: "Ana" });
  return { s, f };
}

await test("curso: start devuelve las preguntas SIN claves", async () => {
  const env = mkEnv();
  const s = await call(env, "/exam/course/start", { examId: "daily_life_vol0", idToken: ANA });
  assert.equal(s[0], 200, JSON.stringify(s));
  const txt = JSON.stringify(s[1]);
  assert.ok(!/"answer"|SECRETO|explanation/.test(txt), txt);
  assert.equal(s[1].total, 3);
  assert.equal(s[1].exam.sections.length, 3);
  assert.deepEqual(s[1].exam.sections[1].tasks, ["Write about you"]);
  assert.deepEqual(s[1].exam.sections[0].questions[0], { q: "Q1", options: ["a", "b", "c"] });
  assert.equal(s[1].exam.pass, 50);
  assert.equal(s[1].graded.max, 3);
});

await test("curso: acceso como studentBookAllowed() || profesor || admin", async () => {
  const env = mkEnv();
  assert.equal((await courseRun(env, "tok-uidbeto-beto@x.com", [0, 0, 0])).s[0], 403, "books sin ese curso");
  assert.equal((await courseRun(env, "tok-uidnadie-nadie@x.com", [0, 0, 0])).s[0], 403, "sin allowlist");
  assert.equal((await courseRun(env, "tok-uidprofe-profe@x.com", [0, 0, 0])).s[0], 200, "profesor");
  assert.equal((await courseRun(env, "tok-uidjefa-jefa@x.com", [0, 0, 0])).s[0], 200, "rol admin");
  assert.equal((await courseRun(env, undefined, [0, 0, 0])).s[0], 401, "sin sesión");
  assert.equal((await courseRun(env, "tok-uidunv-unv@x.com", [0, 0, 0])).s[0], 403, "correo sin verificar");
  assert.equal((await courseRun(env, ANA, [0, 0, 0], "no_existe")).s[0], 404);
  assert.equal((await courseRun(env, ANA, [0, 0, 0], "../students/x")).s[0], 400);
  DB["students/beto@x.com"].books.arrayValue.values.push(S("daily_life_vol0"));
  assert.equal((await courseRun(env, "tok-uidbeto-beto@x.com", [0, 0, 0])).s[0], 200, "books con ese curso");
});

await test("curso: califica en el servidor, desglose por sección y exam_results", async () => {
  const env = mkEnv(), n = writes.length;
  const { f } = await courseRun(env, ANA, [2, 1, 1]);
  assert.equal(f[0], 200, JSON.stringify(f));
  assert.equal(f[1].score, 2); assert.equal(f[1].total, 3); assert.equal(f[1].percent, 67);
  assert.equal(f[1].passed, true); assert.equal(f[1].threshold, 50);
  assert.deepEqual(f[1].sections, [{ c: 1, t: 2 }, null, { c: 1, t: 1 }]);
  assert.ok(!("detail" in f[1]));
  assert.equal(f[1].saved, true);
  const d = writes[n].doc.fields;
  assert.equal(d.examType.stringValue, "exam"); assert.equal(d.examId.stringValue, "exam:daily_life_vol0");
  assert.equal(d.gradedBy.stringValue, "worker"); assert.equal(d.level.stringValue, "A1");
  assert.equal(d.alias.stringValue, "Ana"); assert.equal(d.score.integerValue, "2");
});

await test("curso: respuestas inválidas, segundo finish y otro uid", async () => {
  const env = mkEnv(), n = writes.length;
  const s = await call(env, "/exam/course/start", { examId: "daily_life_vol0", idToken: ANA });
  const id = s[1].attemptId;
  assert.equal((await call(env, "/exam/course/finish", { attemptId: id, idToken: ANA, answers: [0, 0] }))[0], 400);
  assert.equal((await call(env, "/exam/course/finish", { attemptId: id, idToken: ANA, answers: [0, "1", 0] }))[0], 400);
  assert.equal((await call(env, "/exam/finish", { attemptId: id, idToken: ANA }))[0], 400, "no es un intento de nivel");
  const f = await call(env, "/exam/course/finish", { attemptId: id, idToken: ANA2, answers: [2, 0, null] });
  assert.equal(f[1].score, 2); assert.equal(f[1].why, "session_mismatch");
  const f2 = await call(env, "/exam/course/finish", { attemptId: id, idToken: ANA, answers: [2, 0, 1] });
  assert.equal(f2[1].score, 2, "la primera entrega es la que cuenta"); assert.equal(f2[1].why, "already_finished");
  assert.equal(writes.length, n);
});

await test("curso: tope de 3 intentos calificados", async () => {
  const env = mkEnv();
  for (let i = 0; i < 3; i++) assert.equal((await courseRun(env, ANA, [0, 0, 0])).f[1].saved, true);
  const four = await courseRun(env, ANA, [2, 0, 1]);
  assert.equal(four.s[1].graded.left, 0);
  assert.equal(four.f[1].score, 3); assert.equal(four.f[1].saved, false); assert.equal(four.f[1].why, "attempt_cap");
});

console.log("\n" + passed + " pruebas OK" + (process.exitCode ? " (con fallos)" : ""));
