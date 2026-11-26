/* ============================================================
 * exam_grader.js — el Worker califica los exámenes de nivel y los jefes.
 * ------------------------------------------------------------
 * Las respuestas NUNCA llegan al navegador antes de contestar: el sitio
 * publica las preguntas sin claves (vesper_level_exams.js /
 * vesper_boss_exams.js) y este módulo guarda las claves (exam_keys.json,
 * generado por _scripts/exams/split_exams.js y fuera de git).
 *
 * Flujo (todo POST JSON, mismo CORS que el chat):
 *   /exam/start  {kind:"exam"|"boss", level, version, idToken?}
 *        -> {attemptId, total, ids?}. El intento recuerda el uid de quien lo
 *           abre (si trae sesión). En el jefe las preguntas las SORTEA el
 *           Worker y vuelven en `ids` (2026-11-23; antes las escogía el
 *           cliente, que podía pedir justo las que ya conocía).
 *   /exam/answer {attemptId, id, response}
 *        -> jefe: {correct, first, reveal}; examen de nivel: {recorded, first}.
 *           Solo cuenta la PRIMERA respuesta de cada pregunta (queda en el
 *           Durable Object ExamAttempt). El examen de nivel es un banco fijo y
 *           chico: no devuelve ni la clave ni ✓/✗ (con el veredicto por
 *           pregunta, 3-4 intentos reconstruían la clave; 2026-11-23).
 *   /exam/finish {attemptId, idToken?, alias?}
 *        -> {score, total, percent, passed, threshold, level, saved} + en el
 *           jefe `detail` por pregunta. En el examen de nivel, solo la nota
 *           global (2026-11-25, opción A): ni `detail` ni `bySkill`; el
 *           desglose se guarda aparte en exam_results_staff (ver publicResult
 *           y toStaffDoc). Examen de nivel con preguntas sin contestar:
 *           {incomplete:true, answered, total, passed:false}, sin nota ni
 *           bySkill, y no se guarda (2026-11-25). La nota la
 *           calcula el Worker con lo registrado y la guarda él mismo en
 *           Firestore (exam_results, gradedBy "worker") con la cuenta de
 *           servicio, SOLO si el idToken es de la misma cuenta que abrió el
 *           intento. Las reglas no aceptan esas notas desde el navegador.
 *           Es IDEMPOTENTE (2026-11-25): si guardar falla (save_failed), repetir
 *           el mismo finish vuelve a intentarlo, y el documento lleva un nombre
 *           fijo por intento, así que nunca queda dos veces.
 *
 * La calificación replica EXACTAMENTE la de leccion_app.js (norm(), índices
 * originales de las opciones, orden de palabras). Si cambias una, cambia la
 * otra: _scripts/exams/test_grader.js compara ambas.
 * ============================================================ */
"use strict";

import { DurableObject } from "cloudflare:workers";
import KEYS from "./exam_keys.json";

const PROJECT_ID = "vesper-academy";
const FS_DB = "teachermanuals";
/* apiKey PÚBLICA de Firebase (la misma de vesper_auth.js): solo sirve para
   que Identity Toolkit valide el idToken del alumno. */
const FIREBASE_API_KEY = "AIzaSyAsCJW97LyNpmvey1Mo0wiGMufQIV7uxio";
const ATTEMPT_TTL_MS = 24 * 3600 * 1000;
const DETAIL_CAP = 60;            // igual que vesper_results.js y la regla
const LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"];
const SKILL_RANK = { grammar: 0, vocab: 1, use: 2, reading: 3, listening: 4 };

export const EXAM_RATE_DEFAULTS = {
  RL_EXAM_START_PER_MIN: 10, RL_EXAM_START_PER_DAY: 200,
  RL_EXAM_ANSWER_PER_MIN: 90, RL_EXAM_ANSWER_PER_DAY: 3000,
  /* examen de nivel: banco fijo; tope de intentos nuevos al día (frena la cosecha de claves).
     Con idToken verificado se cuenta por uid (moderado); sin sesión, por IP.
     2026-11-23: el tope por IP bajó de 150 a 20. Aunque /exam/answer ya no dice ✓/✗,
     la NOTA FINAL sigue siendo un oráculo (cambiar una respuesta por intento y ver si
     sube); con 150 al día la clave salía en 1-2 días, con 20 tarda semanas. Costo: una
     escuela o un NAT de operador (CGNAT en celular) comparte IP; esos alumnos deben
     entrar con su cuenta (contador por uid, no por IP). Se sube con [vars] sin tocar código. */
  RL_EXAM_LEVEL_START_PER_DAY: 12,
  RL_EXAM_LEVEL_START_PER_DAY_IP: 20,
  /* 2026-11-25: con cuenta también se cuenta por IP (antes solo por uid, y
     varias cuentas desde un equipo sumaban 12 cada una). Contador aparte del
     anónimo y más holgado: un salón de ~30 alumnos con cuenta comparte IP y no
     debe quedarse sin examen porque alguien sin cuenta gastó el cupo. */
  RL_EXAM_LEVEL_START_PER_DAY_IP_UID: 60
};

/* ---------- calificación (espejo de leccion_app.js) ---------- */

export function norm(s) {
  return ("" + (s == null ? "" : s)).toLowerCase()
    .replace(/[’‘'`]/g, "")
    .replace(/[.,!?;:¿¡"]/g, " ")
    .replace(/\s+/g, " ").trim();
}

function isInt(v) { return typeof v === "number" && Number.isInteger(v); }
function typedOk(answers, text) {
  if (typeof text !== "string") return null;
  const val = norm(text);
  return answers.some((a) => norm(a) === val);
}

/* Devuelve true/false, o null si la respuesta no tiene la forma esperada. */
export function grade(ex, r) {
  r = r || {};
  switch (ex.type) {
    case "multiple_choice":
    case "find_error":
      return isInt(r.choice) ? r.choice === ex.correctIndex : null;
    case "listening":
      if (Array.isArray(ex.options)) return isInt(r.choice) ? r.choice === ex.correctIndex : null;
      return typedOk(ex.answers || [ex.text], r.text);
    case "true_false":
      return (r.choice === 0 || r.choice === 1) ? ((r.choice === 1) === !!ex.answer) : null;
    case "fill_blank":
      return typedOk(ex.answers || (ex.answer != null ? [ex.answer] : []), r.text);
    case "translate":
    case "type_answer":
      return typedOk(ex.answers || [], r.text);
    case "word_order": {
      const w = r.words, c = ex.correctOrder || [];
      if (!Array.isArray(w) || w.length !== (ex.words || []).length) return null;
      for (let i = 0; i < w.length; i++) if (w[i] !== c[i]) return false;
      return true;
    }
    case "reading": {
      const qs = ex.questions || [], p = r.picks;
      if (!Array.isArray(p) || p.length !== qs.length || !p.every(isInt)) return null;
      return qs.every((q, i) => p[i] === q.correctIndex);
    }
    default:
      return null;
  }
}

/* Lo que la app necesita DESPUÉS de contestar para pintar el feedback. */
export function reveal(ex) {
  const pick = (o, ks) => { const out = {}; for (const k of ks) if (o[k] !== undefined) out[k] = o[k]; return out; };
  if (ex.type === "reading") {
    return { questions: (ex.questions || []).map((q) => pick(q, ["correctIndex", "explanation"])) };
  }
  return pick(ex, ["correctIndex", "answer", "answers", "correctOrder", "explanation", "correction"]);
}

function bankOf(kind, level) {
  const b = KEYS[kind] && KEYS[kind][level];
  return b && b.items ? b : null;
}

/* ---------- Durable Object: un intento ---------- */
export class ExamAttempt extends DurableObject {
  async init(a) {
    if (await this.ctx.storage.get("a")) return { ok: false, error: "exists" };
    /* uid: la cuenta que abrió el intento ("" si fue sin sesión). Solo esa
       cuenta puede guardar la nota en /exam/finish. */
    /* v: versión de las claves con que se abrió (2026-11-25). Los ids son
       posicionales (e:A1:007): si cambia el banco, el mismo id es OTRA
       pregunta, así que un intento abierto con otra versión no se puede seguir
       calificando (ver answer y finish). */
    await this.ctx.storage.put("a", { kind: a.kind, level: a.level, ids: a.ids, uid: a.uid || "", v: a.v || "", answered: {}, order: [], created: Date.now(), result: null });
    await this.ctx.storage.setAlarm(Date.now() + ATTEMPT_TTL_MS);
    return { ok: true };
  }
  /* registra el veredicto; si la pregunta ya se contestó, gana el primero */
  async answer(id, ok, v) {
    const a = await this.ctx.storage.get("a");
    if (!a) return { error: "no_attempt" };
    if (a.result) return { error: "finished" };
    if (a.ids.indexOf(id) < 0) return { error: "not_in_attempt" };
    /* estricta: quien llama sin versión (código viejo de un isolate que aún no
       se actualizó) tampoco califica un intento abierto con versión, y al
       revés. Solo coinciden versión con versión, o "sin" con "sin". */
    if (a.v !== v) return { error: "stale" };
    if (Object.prototype.hasOwnProperty.call(a.answered, id)) return { ok: a.answered[id], first: false };
    a.answered[id] = ok; a.order.push(id);
    await this.ctx.storage.put("a", a);
    return { ok: ok, first: true };
  }
  async state() { return (await this.ctx.storage.get("a")) || null; }
  /* "cerrado" y "guardado" son cosas distintas: `save` dice si la nota falta
     por llegar a Firestore ("pending"), ya llegó ("done") o no se va a guardar
     ("none"). Un cierre sin token queda en "none" para siempre: si no, el alumno
     podría ver su nota primero y decidir después si la manda.
     `docId` es el nombre del documento en exam_results. Nunca sale al
     navegador: las reglas dejan al alumno crear documentos, y si lo conociera
     podría ocuparlo antes y tapar su nota. */
  async close(result, wantsSave) {
    const a = await this.ctx.storage.get("a");
    if (!a) return null;
    if (a.result) return Object.assign({}, a, { first: false });   // segundo finish: misma nota, sin recalcular
    a.result = result;
    a.save = wantsSave ? "pending" : "none";
    a.docId = randomId();
    a.closedAt = new Date().toISOString();
    await this.ctx.storage.put("a", a);
    return Object.assign({}, a, { first: true });
  }
  async markSave(state) {
    const a = await this.ctx.storage.get("a");
    if (!a || a.save !== "pending") return;
    a.save = state;
    await this.ctx.storage.put("a", a);
  }
  async alarm() { await this.ctx.storage.deleteAll(); }
}

/* ---------- utilidades ---------- */

function randomId() {
  const b = new Uint8Array(16); crypto.getRandomValues(b);
  return Array.from(b, (x) => x.toString(16).padStart(2, "0")).join("");
}
/* entero uniforme en [0, n) con crypto (sin sesgo de módulo) */
function randInt(n) {
  const lim = Math.floor(0x100000000 / n) * n, b = new Uint32Array(1);
  do { crypto.getRandomValues(b); } while (b[0] >= lim);
  return b[0] % n;
}
function shuffled(a) {
  a = a.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = randInt(i + 1); const t = a[i]; a[i] = a[j]; a[j] = t; }
  return a;
}
/* Muestreo del jefe: el mismo criterio que buildBossExam() de leccion_app.js
   (TOEFL: 1 lectura + 1 listening garantizados, y el resto al azar). Lo hace
   el SERVIDOR para que el alumno no pueda escoger las preguntas que ya vio. */
function sampleBoss(bank) {
  const all = Object.keys(bank.items), size = Math.min(bank.size || 8, all.length);
  let picked;
  if (bank.toefl) {
    const one = (t) => shuffled(all.filter((id) => bank.items[id].type === t)).slice(0, 1);
    const rest = shuffled(all.filter((id) => bank.items[id].type !== "reading" && bank.items[id].type !== "listening"));
    picked = one("reading").concat(one("listening"), rest).slice(0, size);
  } else picked = shuffled(all).slice(0, size);
  return shuffled(picked);
}
/* local (wrangler dev sin cuenta de servicio): el script de pruebas necesita
   abrir el jefe con ids escogidos para recorrer TODO el banco */
function isDevEnv(env) { return env.EXAM_DEV === "1" && !env.FIREBASE_SA; }
/* attemptId = "<kind>.<level>.<hex>": el Worker sabe qué banco usar sin
   preguntarle al DO; el hex aleatorio es lo que lo hace inadivinable. */
function parseAttempt(s) {
  const m = /^(exam|boss)\.(A1|A2|B1|B2|C1|C2)\.([0-9a-f]{32})$/.exec(typeof s === "string" ? s : "");
  return m ? { kind: m[1], level: m[2], id: s } : null;
}
function attemptStub(env, attemptId) {
  return env.EXAM_ATTEMPTS.get(env.EXAM_ATTEMPTS.idFromName("att:" + attemptId));
}

function exText(ex) {
  return ex.question || ex.sentence || ex.statement || ex.prompt || ex.title
    || (ex.words ? (ex.correctOrder || ex.words).join(" ") : "") || "";
}

/* ---------- Firestore con la cuenta de servicio ---------- */

let saCache = null;   // { token, exp } por isolate

function pemToDer(pem) {
  const b64 = pem.replace(/-----[^-]+-----/g, "").replace(/\s+/g, "");
  const bin = atob(b64), out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out.buffer;
}
function b64urlStr(s) { return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""); }
function b64urlBuf(buf) {
  let bin = ""; const u = new Uint8Array(buf);
  for (let i = 0; i < u.length; i++) bin += String.fromCharCode(u[i]);
  return b64urlStr(bin);
}

export async function saAccessToken(env) {
  const now = Math.floor(Date.now() / 1000);
  if (saCache && saCache.exp - 60 > now) return saCache.token;
  if (!env.FIREBASE_SA) throw new Error("FIREBASE_SA no configurado");
  const sa = JSON.parse(env.FIREBASE_SA);
  const head = b64urlStr(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = b64urlStr(JSON.stringify({
    iss: sa.client_email, scope: "https://www.googleapis.com/auth/datastore",
    aud: sa.token_uri || "https://oauth2.googleapis.com/token", iat: now, exp: now + 3600
  }));
  const key = await crypto.subtle.importKey("pkcs8", pemToDer(sa.private_key),
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("RSASSA-PKCS1-v1_5", key, new TextEncoder().encode(head + "." + claim));
  const r = await fetch(sa.token_uri || "https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: "grant_type=" + encodeURIComponent("urn:ietf:params:oauth:grant-type:jwt-bearer") +
          "&assertion=" + head + "." + claim + "." + b64urlBuf(sig)
  });
  const j = await r.json();
  if (!r.ok || !j.access_token) throw new Error("token SA " + r.status);
  saCache = { token: j.access_token, exp: now + (j.expires_in || 3600) };
  return saCache.token;
}

export const fsBase = () => "https://firestore.googleapis.com/v1/projects/" + PROJECT_ID + "/databases/" + FS_DB + "/documents";

/* ¿quién es? Identity Toolkit valida el idToken (firma, caducidad, proyecto).
   Con `strict`, una caída de Identity Toolkit (429/5xx) lanza error en vez de
   devolver null, para no confundirla con un token malo. */
export async function lookupUser(env, idToken, strict) {
  /* tokens "dev:" solo en local: con cuenta de servicio real (producción) se
     ignoran aunque alguien deje EXAM_DEV=1 puesto por error */
  if (env.EXAM_DEV === "1" && !env.FIREBASE_SA && typeof idToken === "string" && idToken.indexOf("dev:") === 0) {
    return { uid: "dev-uid", email: idToken.slice(4).toLowerCase(), verified: true };
  }
  if (typeof idToken !== "string" || idToken.length < 20 || idToken.length > 4096) return null;
  const r = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=" + FIREBASE_API_KEY, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToken: idToken })
  });
  if (strict && (r.status === 429 || r.status >= 500)) throw new Error("lookup " + r.status);
  if (!r.ok) return null;
  const u = ((await r.json()).users || [])[0];
  if (!u || !u.localId) return null;
  const raw = String(u.email || "").trim(), email = raw.toLowerCase();
  /* Solo ASCII imprimible: toLowerCase() convierte el signo Kelvin (U+212A) en
     "k" (y hay otros casos así), y un correo con él podría caer en el doc
     students/{correo} de OTRA persona. Se mira ANTES y después de pasar a
     minúsculas: después solo, el Kelvin ya es una "k" ASCII y pasaría.
     Sin correo (cuenta sin email) sigue igual. */
  const ASCII = /^[\x21-\x7e]+$/;
  if (raw && !(ASCII.test(raw) && ASCII.test(email))) {
    const at = email.lastIndexOf("@");
    console.warn("lookupUser: correo con caracteres fuera de ASCII, se rechaza (uid " + String(u.localId).slice(0, 6)
      + "…, dominio " + (at >= 0 ? email.slice(at + 1).replace(/[^\x21-\x7e]/g, "?") : "?") + ")");
    return null;
  }
  return { uid: u.localId, email: email, verified: !!u.emailVerified };
}

async function studentIdentity(token, email) {
  const r = await fetch(fsBase() + "/students/" + encodeURIComponent(email), { headers: { Authorization: "Bearer " + token } });
  if (r.status === 404) return { sid: "", group: "" };
  if (!r.ok) throw new Error("students " + r.status);
  const f = ((await r.json()).fields) || {};
  return { sid: (f.sid && f.sid.stringValue) || "", group: (f.group && f.group.stringValue) || "" };
}

/* mismo documento que toFs() de vesper_results.js, + gradedBy.
   Examen de nivel: el alumno puede leer su propio exam_results, así que ahí
   solo va la nota global (score, total, percent, passed, nivel). Ni `detail`
   (✓/✗ por pregunta: con 4 intentos, todo A, B, C, D, salía la clave) ni,
   desde 2026-11-25 (opción A de Josue), `bySkill`: con relleno seguro-malo y
   una pregunta de prueba por destreza, cada intento completo decía el
   veredicto de 5 preguntas. El desglose va a exam_results_staff (toStaffDoc),
   que el alumno no puede leer.
   El jefe sigue guardando `detail` aquí: /exam/answer ya le revela la clave de
   cada pregunta ("Era: …") y sus preguntas se sortean, así que `detail` no le
   dice nada que no sepa ya. */
function toFsDoc(rec) {
  const S = (v) => ({ stringValue: String(v) }), I = (v) => ({ integerValue: String(v) });
  const fields = {
    studentUid: S(rec.studentUid), alias: S(rec.alias), sid: S(rec.sid), group: S(rec.group),
    examType: S(rec.examType), examId: S(rec.examId), level: S(rec.level),
    score: I(rec.score), total: I(rec.total), percent: I(rec.percent),
    passed: { booleanValue: rec.passed }, threshold: I(rec.threshold),
    createdAt: { timestampValue: rec.clientTs }, clientTs: S(rec.clientTs),
    gradedBy: S("worker")
  };
  if (rec.examType !== "exam") fields.detail = detailField(rec.detail);
  return { fields: fields };
}

function detailField(detail) {
  const S = (v) => ({ stringValue: String(v) });
  return { arrayValue: { values: (detail || []).map((d) => ({ mapValue: { fields: {
    q: S(d.q), type: S(d.type), skill: S(d.skill), correct: { booleanValue: d.correct } } } })) } };
}

/* Desglose del examen de nivel, solo para staff y el profesor del grupo
   (exam_results_staff/{el mismo id que exam_results}; las reglas no dejan
   leerlo al alumno ni escribirlo a nadie: solo esta cuenta de servicio).
   Lleva group/studentUid/sid para la regla y para buscarlo, y el desglose:
   bySkill y detail por pregunta. */
function toStaffDoc(rec) {
  const S = (v) => ({ stringValue: String(v) }), I = (v) => ({ integerValue: String(v) });
  const by = rec.bySkill || {}, m = {};
  Object.keys(by).forEach((k) => { m[k] = { mapValue: { fields: { correct: I(by[k].correct), total: I(by[k].total) } } }; });
  return { fields: {
    studentUid: S(rec.studentUid), alias: S(rec.alias), sid: S(rec.sid), group: S(rec.group),
    examType: S(rec.examType), examId: S(rec.examId), level: S(rec.level),
    score: I(rec.score), total: I(rec.total), percent: I(rec.percent),
    createdAt: { timestampValue: rec.clientTs }, clientTs: S(rec.clientTs),
    gradedBy: S("worker"),
    bySkill: { mapValue: { fields: m } },
    detail: detailField(rec.detail)
  } };
}

/* crea `col/docId`; ya existente = guardado (idempotente) */
async function createOnce(token, col, docId, doc) {
  const r = await fetch(fsBase() + "/" + col + "?documentId=" + encodeURIComponent(docId), {
    method: "POST", headers: { Authorization: "Bearer " + token, "Content-Type": "application/json" },
    body: JSON.stringify(doc)
  });
  if (r.ok) return;
  const text = await r.text();
  /* ya estaba: un intento anterior sí llegó aunque no lo supimos. Se mira el
     texto porque Firestore también usa 409 para ABORTED, que sí es un fallo */
  if (r.status === 409 && text.indexOf("ALREADY_EXISTS") >= 0) return;
  throw new Error(col + " " + r.status + " " + text.slice(0, 200));
}

async function saveResult(env, user, alias, res, docId, ts) {
  if (!user || !user.verified || !user.email) return { saved: false, why: "no_session" };
  /* en local (EXAM_DEV=1) no se escribe: sin cuenta de servicio, o con
     EXAM_DRY_WRITE=1 (entonces sí pide el token y lee students/, para probar
     la autenticación sin dejar notas falsas en producción) */
  const hasSa = !!env.FIREBASE_SA;
  const dry = env.EXAM_DEV === "1" && (!hasSa || env.EXAM_DRY_WRITE === "1");
  if (!hasSa && !dry) return { saved: false, why: "no_service_account" };
  let token = null, who = { sid: "", group: "" };
  if (hasSa) { token = await saAccessToken(env); who = await studentIdentity(token, user.email); }
  const rec = Object.assign({}, res, {
    studentUid: user.uid, alias: alias, sid: who.sid, group: who.group,
    clientTs: ts   /* la hora del cierre, no la del reintento */
  });
  const doc = toFsDoc(rec);
  const staff = rec.examType === "exam" ? toStaffDoc(rec) : null;
  if (dry) return { saved: false, why: "dry_run", doc: doc, staffDoc: staff, saChecked: hasSa };
  /* primero la nota del alumno: si el desglose falla después, la nota ya
     quedó (y un reintento la encuentra con ALREADY_EXISTS) */
  await createOnce(token, "exam_results", docId, doc);
  if (!staff) return { saved: true };
  try { await createOnce(token, "exam_results_staff", docId, staff); }
  catch (e) {
    console.error("exam save staff:", e && e.message);
    /* La nota está guardada (saved: true) pero el desglose no: se contesta
       why "save_failed" para que la app repita el mismo finish (lo hace con
       save_failed, también la versión vieja de la app) y el intento sigue
       "pending" en el DO hasta que los dos documentos estén. */
    return { saved: true, staffSaved: false, why: "save_failed" };
  }
  return { saved: true };
}

/* guarda la nota de un intento ya cerrado que sigue "pending". `first` = es el
   cierre original: solo ahí un token ajeno o sin verificar descarta la nota. */
async function saveAttempt(env, stub, att, body, first) {
  try {
    const user = await lookupUser(env, body.idToken, true);
    const out = (!user || user.uid !== att.uid)
      ? { saved: false, why: "not_owner" }
      : await saveResult(env, user, cleanAlias(body.alias), att.result, att.docId, att.closedAt);
    if (out.saved && out.staffSaved !== false) await stub.markSave("done");
    else if (first && (out.why === "not_owner" || out.why === "no_session")) await stub.markSave("none");
    return out;
  } catch (e) {
    console.error("exam save:", e && e.message);
    return { saved: false, why: "save_failed" };
  }
}

/* ---------- endpoints ---------- */

function cleanAlias(a) {
  return String(typeof a === "string" ? a : "").replace(/[\u0000-\u001f]/g, "").trim().slice(0, 24) || "Estudiante";
}

/* Valida kind/level/version antes de gastar una consulta a Identity Toolkit. */
function startCheck(body) {
  const kind = body.kind, level = body.level;
  if ((kind !== "exam" && kind !== "boss") || LEVELS.indexOf(level) < 0) return [400, { error: "Examen inválido." }];
  if (body.version !== KEYS.version) {
    return [409, { error: "Hay una versión nueva de los exámenes. Recarga la página.", code: "stale" }];
  }
  if (!bankOf(kind, level)) return [404, { error: "No hay examen para ese nivel." }];
  return null;
}

async function start(env, body, user) {
  const bad = startCheck(body);
  if (bad) return bad;
  const kind = body.kind, level = body.level, bank = bankOf(kind, level);
  const all = Object.keys(bank.items);
  let ids;
  if (kind === "exam") ids = all;
  else if (!(isDevEnv(env) && body.devIds)) {
    /* Jefe: las preguntas las sortea el Worker y se las manda a la app (que
       tiene el banco sin claves). Los `ids` que mande el cliente se ignoran:
       antes podía escoger justo las que ya había visto con su clave. */
    ids = sampleBoss(bank);
  } else {
    /* solo en local: el script de pruebas escoge (devIds) para recorrer el banco */
    ids = body.devIds;
    const want = Math.min(bank.size || 8, all.length);
    if (!Array.isArray(ids) || ids.length !== want || new Set(ids).size !== ids.length
        || !ids.every((id) => typeof id === "string" && Object.prototype.hasOwnProperty.call(bank.items, id))) {
      return [400, { error: "Selección de preguntas inválida." }];
    }
    if (bank.toefl) {
      for (const t of ["reading", "listening"]) {
        if (all.some((id) => bank.items[id].type === t) && !ids.some((id) => bank.items[id].type === t)) {
          return [400, { error: "Selección de preguntas inválida." }];
        }
      }
    }
  }
  const attemptId = kind + "." + level + "." + randomId();
  const r = await attemptStub(env, attemptId).init({ kind, level, ids, uid: (user && user.verified && user.uid) || "", v: KEYS.version });
  if (!r.ok) return [500, { error: "No se pudo abrir el examen." }];
  const out = { attemptId: attemptId, total: ids.length };
  if (kind === "boss") out.ids = ids;   // la app pinta ESTAS preguntas, en este orden
  return [200, out];
}

async function answer(env, body) {
  const at = parseAttempt(body.attemptId);
  if (!at) return [400, { error: "Intento inválido." }];
  const bank = bankOf(at.kind, at.level);
  const ex = bank && typeof body.id === "string" && Object.prototype.hasOwnProperty.call(bank.items, body.id) ? bank.items[body.id] : null;
  if (!ex) return [400, { error: "Pregunta inválida." }];
  const ok = grade(ex, body.response);
  if (ok === null) return [400, { error: "Respuesta con formato inválido." }];
  const st = await attemptStub(env, at.id).answer(body.id, ok, KEYS.version);
  if (st.error === "no_attempt") return [404, { error: "El examen caducó. Empieza de nuevo.", code: "expired" }];
  if (st.error === "stale") return [409, { error: "Hay una versión nueva de los exámenes. Recarga la página y empieza de nuevo.", code: "stale" }];
  if (st.error) return [409, { error: "Esa pregunta no es de este examen.", code: st.error }];
  /* Examen de nivel: banco fijo y chico (26–31 preguntas, todas en cada
     intento), así que NO sale ni la clave ni el veredicto: solo "registrada".
     Con ✓/✗ por pregunta bastaban 3-4 intentos (todo A, todo B, todo C…) para
     reconstruir la clave de la opción múltiple y sacar 100 con la cuenta
     (2026-11-23). La nota llega al final, con un resumen por habilidad.
     El jefe sí revela ("Era: …"): sus preguntas las sortea el Worker. */
  if (at.kind === "exam") return [200, { recorded: true, first: st.first }];
  return [200, { correct: st.ok, first: st.first, reveal: reveal(ex) }];
}

async function finish(env, body) {
  const at = parseAttempt(body.attemptId);
  if (!at) return [400, { error: "Intento inválido." }];
  const stub = attemptStub(env, at.id);
  let a = await stub.state();
  if (!a) return [404, { error: "El examen caducó.", code: "expired" }];
  /* intento abierto con otras claves (cambió el banco): sus respuestas se
     calificaron contra preguntas que ya no son esas ids; no se cierra ni se
     guarda. Uno ya cerrado conserva su nota. */
  if (!a.result && a.v !== KEYS.version) return [409, { error: "Hay una versión nueva de los exámenes. Recarga la página y empieza de nuevo.", code: "stale" }];
  const bank = bankOf(at.kind, at.level);
  let res = a.result;
  /* Examen de nivel INCOMPLETO (2026-11-25): si falta alguna pregunta, el
     resultado no lleva nota, ni bySkill, ni detail, y no se guarda. Con la nota
     o el resumen por destreza de un intento a medias, contestar UNA pregunta
     por destreza y cerrar decía si esa respuesta era buena: un oráculo de la
     clave. La app siempre contesta todas antes de cerrar (el botón Verificar
     no deja avanzar sin respuesta registrada), así que esto solo lo ve quien
     cierra a mano. */
  const incomplete = !res && at.kind === "exam" && a.ids.some((id) => !Object.prototype.hasOwnProperty.call(a.answered, id));
  if (!res && incomplete) {
    const inc = {
      examType: at.kind, examId: at.kind + ":" + at.level, level: at.level,
      incomplete: true, answered: a.order.length, total: Math.max(1, a.ids.length),
      threshold: bank.pass, passed: false
    };
    const closed = await stub.close(inc, false);
    if (!closed) return [404, { error: "El examen caducó.", code: "expired" }];
    a = closed;
    res = closed.result;
  } else if (!res) {
    /* Las no contestadas cuentan como malas: antes el jefe dividía entre las
       contestadas y bastaba UNA buena + /exam/finish para sacar 100. */
    const total = Math.max(1, a.ids.length);
    const correct = a.order.filter((id) => a.answered[id] === true).length;
    const percent = Math.round(100 * correct / Math.max(1, total));
    const threshold = bank.pass;
    let ids = at.kind === "boss" ? a.order.slice() : a.ids.slice();
    if (at.kind === "exam") {
      const pos = {}; a.ids.forEach((id, i) => { pos[id] = i; });
      const rk = (id) => { const s = bank.items[id].skill; return (s in SKILL_RANK) ? SKILL_RANK[s] : 9; };
      ids.sort((x, y) => (rk(x) - rk(y)) || (pos[x] - pos[y]));
    }
    res = {
      examType: at.kind, examId: at.kind + ":" + at.level, level: at.level,
      score: correct, total: total, percent: percent, threshold: threshold, passed: percent >= threshold,
      detail: ids.slice(0, DETAIL_CAP).map((id) => {
        const ex = bank.items[id];
        return { q: String(exText(ex)).slice(0, 200), type: ex.type || "", skill: ex.skill || "", correct: a.answered[id] === true };
      })
    };
    if (at.kind === "exam") res.bySkill = skillSummary(bank, a.ids, a.answered);
    /* el DO decide quién llegó primero (dos finish a la vez): vale la nota
       del primero */
    const closed = await stub.close(res, !!(body.idToken && a.uid));
    if (!closed) return [404, { error: "El examen caducó.", code: "expired" }];
    a = closed;
    res = closed.result;
  }
  /* guardar en Firestore solo si quien guarda es la MISMA cuenta que abrió el
     intento: un intento abierto sin sesión (o con otra cuenta) no se guarda
     nunca. Un finish repetido solo escribe si la nota sigue pendiente. */
  let save;
  if (a.first && !body.idToken) save = { saved: false, why: "no_session" };
  else if (a.first && !a.uid) save = { saved: false, why: "anonymous_start" };
  else if (res.incomplete) save = { saved: false, why: a.first ? "incomplete" : "already_finished" };
  else if (a.save === "done") save = { saved: true };
  else if (a.save === "pending" && body.idToken) save = await saveAttempt(env, stub, a, body, !!a.first);
  /* Reintento SIN token de un guardado que sigue pendiente (p. ej. la sesión
     no estaba lista al recargar): no se cierra nada y se contesta save_failed,
     que la app trata como "vuelve a intentarlo" (examRetrySave y la cola de
     pendientes). Con "already_finished" la app sacaba el intento de la cola y
     la nota o el desglose de staff no llegaban nunca. Solo existe "pending" si
     el PRIMER cierre traía token: no abre la puerta a ver la nota y decidir
     después si se guarda. En local (dry run) nada llega a guardarse y el
     intento se queda "pending" para siempre: ahí sigue already_finished. */
  else if (a.save === "pending" && !(env.EXAM_DEV === "1" && (!env.FIREBASE_SA || env.EXAM_DRY_WRITE === "1")))
    save = { saved: false, why: "save_failed", pending: true };
  else save = { saved: false, why: "already_finished" };
  return [200, Object.assign(publicResult(res), publicSave(res, save))];
}

/* Resumen por habilidad del examen de nivel: {grammar:{correct,total},…}.
   Cuenta sobre TODAS las preguntas del intento (las no contestadas, malas). */
function skillSummary(bank, ids, answered) {
  const out = {};
  ids.forEach((id) => {
    const s = (bank.items[id] && bank.items[id].skill) || "otro";
    if (!out[s]) out[s] = { correct: 0, total: 0 };
    out[s].total++;
    if (answered[id] === true) out[s].correct++;
  });
  return out;
}
/* Lo que el NAVEGADOR recibe al cerrar. Un examen de nivel incompleto no
   lleva nota ni bySkill (ver finish). En el examen de nivel se quita la
   lista por pregunta (`detail`, con `correct`): junto con un intento hecho a
   propósito (todo A, todo B…) volvía a soltar la clave. Desde 2026-11-25
   tampoco va `bySkill` (opción A: el alumno ve su nota y su nivel; el
   desglose por destreza es solo para staff, en exam_results_staff). Los
   documentos anteriores traen `bySkill` (desde 2026-11-23) o `detail`. */
function publicResult(res) {
  const out = Object.assign({}, res);
  if (res.examType === "exam") { delete out.detail; delete out.bySkill; }
  if (res.incomplete) { delete out.score; delete out.percent; }
  return out;
}
/* en local (dry_run) `save.doc` es el documento que se habría escrito: en el
   examen de nivel va sin `detail` ni `bySkill` por la misma razón, y el
   documento de staff (`staffDoc`) nunca sale al navegador: solo se dice si
   se habría escrito (`staffDoc: true`). */
function publicSave(res, save) {
  if (!save) return save;
  const out = Object.assign({}, save);
  if ("staffDoc" in out) out.staffDoc = !!out.staffDoc;
  if (res.examType !== "exam" || !out.doc || !out.doc.fields) return out;
  const fields = Object.assign({}, out.doc.fields);
  delete fields.detail; delete fields.bySkill;
  out.doc = Object.assign({}, out.doc, { fields: fields });
  return out;
}

/* punto de entrada desde el fetch del Worker. `rate(key, perMin, perDay)`
   es el contador por IP del chat (RateLimiter). */
export async function handleExam(path, body, env, rate, limitOf, rateRaw) {
  if (!env.EXAM_ATTEMPTS) return [503, { error: "Exámenes no configurados en el servidor." }];
  if (path === "/exam/start" || path === "/exam/answer") {
    const isStart = path === "/exam/start";
    const rl = await rate(isStart ? "exam-start" : "exam-answer",
      limitOf(isStart ? "RL_EXAM_START_PER_MIN" : "RL_EXAM_ANSWER_PER_MIN"),
      limitOf(isStart ? "RL_EXAM_START_PER_DAY" : "RL_EXAM_ANSWER_PER_DAY"));
    if (!rl.ok) return [429, { error: "Vas muy rápido. Espera un momento y vuelve a intentarlo.", code: "rate_limited", retryAfter: rl.retryAfter || 60 }];
    /* examen de nivel (banco fijo): tope diario de intentos nuevos. Ya no
       devuelve ni clave ni veredicto por pregunta, pero el tope sigue frenando
       que se "cosechen" notas finales con intentos a propósito. Solo cuenta
       cuando el inicio fue válido (los 400/409 no gastan cupo). */
    if (!isStart) return answer(env, body);
    /* ¿quién abre el intento? Se guarda su uid: solo esa cuenta podrá guardar la nota */
    const bad = startCheck(body);
    if (bad) return bad;
    let user = null;
    if (body.idToken) { try { user = await lookupUser(env, body.idToken); } catch (e) { user = null; } }
    /* examen de nivel: tope diario de intentos nuevos, ANTES de crear el
       intento (si no, un rechazo dejaba un ExamAttempt huérfano con su
       alarma de 24 h). startCheck ya pasó, así que los 400/409/404 no gastan
       cupo. Con uid verificado, por uid (el tope no se reinicia al cambiar de
       red) Y por IP con un contador propio más holgado (2026-11-25: muchas
       cuentas desde un mismo equipo ya no suman 12 intentos cada una); sin
       sesión, solo por IP (esos intentos no se guardan). start() no valida nada que dependa del DO:
       lo único que puede rechazar después (devIds, solo jefe en local) no
       pasa por este tope. */
    if (body.kind === "exam") {
      const rl2 = user && user.verified && user.uid
        ? await (rateRaw || rate)("exam-level-uid:" + user.uid, 0, limitOf("RL_EXAM_LEVEL_START_PER_DAY"))
        : await rate("exam-level-start", 0, limitOf("RL_EXAM_LEVEL_START_PER_DAY_IP"));
      /* con cuenta, además por IP (2026-11-25): uid primero, para que quien ya
         agotó su cupo no gaste el de su salón */
      const rl3 = rl2.ok && user && user.verified && user.uid
        ? await rate("exam-level-start-uid", 0, limitOf("RL_EXAM_LEVEL_START_PER_DAY_IP_UID"))
        : rl2;
      if (!rl2.ok) return [429, { error: "Hoy ya hiciste varios intentos del examen de nivel. Vuelve mañana.", code: "rate_limited", retryAfter: rl2.retryAfter || 3600 }];
      if (!rl3.ok) return [429, { error: "Hoy ya se hicieron varios intentos del examen de nivel desde esta red. Vuelve mañana.", code: "rate_limited", retryAfter: rl3.retryAfter || 3600 }];
    }
    return start(env, body, user);
  }
  if (path === "/exam/finish") {
    const rl = await rate("exam-finish", limitOf("RL_EXAM_START_PER_MIN"), limitOf("RL_EXAM_START_PER_DAY"));
    if (!rl.ok) return [429, { error: "Vas muy rápido. Espera un momento y vuelve a intentarlo.", code: "rate_limited", retryAfter: rl.retryAfter || 60 }];
    return finish(env, body);
  }
  return [404, { error: "No existe." }];
}
