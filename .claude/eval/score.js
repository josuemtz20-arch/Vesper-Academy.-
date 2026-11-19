#!/usr/bin/env node
/* Califica un reporte del auditor contra la clave del eval.
 *   node .claude/eval/score.js <reporte.txt> [--json]
 * El reporte debe usar el formato del auditor (secciones CRÍTICOS / IMPORTANTES /
 * MENORES / DUDAS y viñetas "- [archivo:línea] ...").
 *
 * Métricas:
 *   precisión = hallazgos que caen en un error plantado / hallazgos reportados (sin DUDAS)
 *   recall    = errores plantados detectados (fuera de DUDAS) / errores plantados
 *   trampas   = falsos positivos conocidos que el auditor reportó como error
 * Un hallazgo que no cae en ningún caso cuenta como falso positivo; si crees que
 * es un error real nuevo del fixture, revísalo a mano y agrégalo a la clave.
 */
"use strict";
const fs = require("fs");
const path = require("path");

const file = process.argv[2];
if (!file) { console.error("uso: node .claude/eval/score.js <reporte.txt> [--json]"); process.exit(1); }
const key = JSON.parse(Buffer.from(fs.readFileSync(path.join(__dirname, "expected.b64"), "utf8"), "base64").toString("utf8"));
const report = fs.readFileSync(file, "utf8");
const fixName = path.basename(key.fixture);

const SECTIONS = [["CRÍTICOS", "CRÍTICO"], ["IMPORTANTES", "IMPORTANTE"], ["MENORES", "MENOR"], ["DUDAS", "DUDA"], ["NO CUBIERTO", null], ["COBERTURA", null], ["VALIDADORES", null]];
const findings = [];
let sev = null;
for (const raw of report.split(/\r?\n/)) {
  const line = raw.trim();
  const head = SECTIONS.find(([h]) => line.toUpperCase().startsWith(h));
  if (head && !line.startsWith("-")) { sev = head[1]; continue; }
  if (!sev || !line.startsWith("-")) continue;
  const re = new RegExp(fixName.replace(/\./g, "\\.") + ":(\\d+)(?:-(\\d+))?", "g");
  let m, refs = [];
  while ((m = re.exec(line))) refs.push([+m[1], +(m[2] || m[1])]);
  if (!refs.length) continue;
  findings.push({ sev, refs, text: line });
}

const hit = (refs, lines) => refs.some(([a, b]) => a <= lines[1] && b >= lines[0]);
const errs = findings.filter(f => f.sev !== "DUDA");
const dudas = findings.filter(f => f.sev === "DUDA");

const rows = key.planted.map(p => {
  const f = errs.find(x => hit(x.refs, p.lines));
  const d = dudas.find(x => hit(x.refs, p.lines));
  return {
    id: p.id, esperado: [].concat(p.sev).join("|"), detectado: f ? f.sev : (d ? "solo DUDA" : "NO"),
    severidadOK: !!f && [].concat(p.sev).includes(f.sev),
    validadorCitado: p.needsValidator ? !!f && /\bnorm\b/.test(f.text) && /leccion_app\.js:\d+/.test(f.text) : null,
    que: p.what
  };
});
const trapHits = key.traps.map(t => ({ id: t.id, reportadoComoError: errs.some(x => hit(x.refs, t.lines)), que: t.what }));
const tp = errs.filter(x => key.planted.some(p => hit(x.refs, p.lines))).length;
const fp = errs.length - tp;
const detected = rows.filter(r => r.detectado !== "NO" && r.detectado !== "solo DUDA").length;
const coverageDeclared = /^\s*COBERTURA:.*\d+\s*[-–]\s*\d+/m.test(report) && /^\s*VALIDADORES LE[IÍ]DOS:/m.test(report);

const out = {
  reportados: errs.length, dudas: dudas.length,
  precision: errs.length ? +(tp / errs.length).toFixed(2) : null,
  recall: +(detected / key.planted.length).toFixed(2),
  falsosPositivos: fp,
  trampasCaidas: trapHits.filter(t => t.reportadoComoError).length + "/" + key.traps.length,
  severidadCorrecta: rows.filter(r => r.severidadOK).length + "/" + detected,
  coberturaConEvidencia: coverageDeclared,
  casos: rows, trampas: trapHits
};

if (process.argv.includes("--json")) { console.log(JSON.stringify(out, null, 2)); process.exit(0); }
console.log(`PRECISIÓN ${out.precision}  (${tp}/${errs.length} hallazgos caen en errores plantados; ${fp} falsos positivos)`);
console.log(`RECALL    ${out.recall}  (${detected}/${key.planted.length} plantados detectados como error)`);
console.log(`TRAMPAS   ${out.trampasCaidas} falsos positivos conocidos reportados como error`);
console.log(`SEVERIDAD ${out.severidadCorrecta} con la severidad esperada`);
console.log(`COBERTURA + VALIDADORES en el formato exigido: ${coverageDeclared ? "sí" : "NO"}`);
console.log("");
for (const r of rows) console.log(`${r.id} esperado ${r.esperado.padEnd(10)} -> ${r.detectado.padEnd(10)}${r.validadorCitado === null ? "" : r.validadorCitado ? "  (validador citado)" : "  (SIN citar validador)"}  ${r.que}`);
for (const t of trapHits) console.log(`${t.id} trampa ${t.reportadoComoError ? "CAYÓ  " : "evitada"}  ${t.que}`);
