#!/usr/bin/env node
/* Guard de SOLO LECTURA para los agentes de revisión (auditor, supervisor).
 * Se engancha como hook PreToolUse en el frontmatter de cada agente, así que
 * solo corre dentro de esos subagentes: la sesión principal sigue pudiendo
 * hacer commits.
 *
 * Política: lista BLANCA (falla cerrado). Un comando Bash pasa solo si cada
 * tramo (separado por | && || ;) empieza con un programa de lectura y no hay
 * redirecciones de escritura, sustitución de comandos ni banderas que escriban.
 * Exit 2 = bloquear (Claude Code le muestra stderr al agente).
 *
 * Límite honesto: `node -e` ejecuta código arbitrario; se filtran las APIs de
 * escritura/procesos conocidas, pero un código ofuscado podría pasar. Es una
 * barrera contra errores y desobediencia, no contra un atacante.
 *
 * Además bloquea leer la clave del eval (.claude/eval/expected*) para que el
 * auditor no pueda ver las respuestas mientras se le mide.
 */
"use strict";

function block(msg) {
  process.stderr.write("BLOQUEADO por readonly_guard: " + msg +
    "\nEres un agente de SOLO LECTURA. Usa grep/sed -n/head/node -e de lectura/git status|diff|log|show.\n");
  process.exit(2);
}

const SAFE_BIN = new Set([
  "grep", "egrep", "fgrep", "rg", "sed", "awk", "head", "tail", "wc", "cat", "ls",
  "find", "sort", "uniq", "cut", "tr", "nl", "diff", "cmp", "git", "node", "echo",
  "printf", "jq", "file", "stat", "du", "basename", "dirname", "test", "true", "pwd",
  "realpath", "column", "comm", "iconv", "base64"
]);
const GIT_OK = new Set(["status", "diff", "log", "show", "ls-files", "grep", "blame", "rev-parse", "branch", "cat-file"]);
const NODE_BAD = /\b(writeFile|appendFile|createWriteStream|unlink|rmSync|rmdir|\brm\b|mkdir|rename|copyFile|cpSync|symlink|truncate|chmod|chown|utimes|child_process|spawn|execSync|execFile|\bexec\b|fork|process\.binding|require\s*\(\s*['"](?:https?|net|dgram|child_process)['"]|fetch\s*\(|import\s*\()/;

function checkSegment(seg) {
  const words = seg.trim().split(/\s+/).filter(Boolean);
  // saltar asignaciones tipo LC_ALL=C
  while (words.length && /^[A-Za-z_][A-Za-z0-9_]*=/.test(words[0])) words.shift();
  if (!words.length) return;
  const bin = words[0].replace(/^.*\//, "");
  if (!SAFE_BIN.has(bin)) block("programa no permitido: '" + bin + "'");
  const rest = words.slice(1).join(" ");
  if (bin === "sed" && /(^|\s)-[a-zA-Z]*i|--in-place|(^|[;\s'"])w\s|\/w\s/.test(rest)) block("sed que escribe (-i o w)");
  if (bin === "awk" && /system\s*\(|print[^;]*>|getline\s*</.test(rest)) block("awk que escribe o ejecuta");
  if (bin === "find" && /-(delete|exec|execdir|ok|okdir|fprint|fprintf|fls)\b/.test(rest)) block("find con -delete/-exec/-fprint");
  if (bin === "sort" && /(^|\s)-o\b|--output/.test(rest)) block("sort -o escribe archivos");
  if (bin === "git") {
    const sub = words.slice(1).find(w => !w.startsWith("-"));
    if (!sub || !GIT_OK.has(sub)) block("git " + (sub || "") + " no permitido (solo status/diff/log/show/ls-files/grep/blame)");
    if (sub === "branch" && /\s-(d|D|m|M|c|C)\b|--delete|--move|--copy/.test(rest)) block("git branch que modifica");
    if (/--output\b|(^|\s)-o\s/.test(rest)) block("git con --output");
  }
  if (bin === "node") {
    if (!/(^|\s)(-e|-p|--eval|--print|--check|-c)(\s|$)/.test(rest)) block("node solo con -e/-p de lectura o --check (no scripts)");
    if (NODE_BAD.test(rest)) block("node -e usa una API de escritura/procesos/red");
  }
}

function checkBash(cmd) {
  if (/`|\$\(|<\(|>\(/.test(cmd)) block("sustitución de comandos ($(...), `...`, <(...))");
  // quitar redirecciones inofensivas antes de buscar escrituras
  const clean = cmd.replace(/\d?>\s*\/dev\/null/g, "").replace(/\d?>&\d/g, "").replace(/&>\s*\/dev\/null/g, "");
  // '>' fuera de comillas = redirección de escritura
  const noQuotes = clean.replace(/'[^']*'/g, "''").replace(/"(?:\\.|[^"\\])*"/g, '""');
  if (/>/.test(noQuotes)) block("redirección de escritura (>, >>)");
  if (/(^|[^|])&($|[^&])/.test(noQuotes)) block("procesos en segundo plano (&)");
  // cada tramo debe empezar con un programa de la lista blanca
  noQuotes.split(/\|\||&&|;|\||\n/).forEach(checkSegment);
  // checkSegment ve los tramos sin el texto entre comillas: revisar node -e '...' y sed aparte
  if (/(^|[|;&]\s*)node\b/.test(clean) && NODE_BAD.test(clean)) block("node -e usa una API de escritura/procesos/red");
  if (/(^|[|;&]\s*)sed\b[^|;&]*\s-[a-zA-Z]*i/.test(clean)) block("sed -i");
  if (/(^|[|;&]\s*)sed\b[^|;&]*(\bw\s+\S|\/w\s)/.test(clean)) block("sed con comando w (escribe archivo)");
  if (/(^|[|;&]\s*)awk\b/.test(clean) && /system\s*\(|print[^;'"]*>|\|\s*getline/.test(clean)) block("awk que escribe o ejecuta");
}

function mentionsKey(s) { return /\.claude[\\/]+eval[\\/]+expected/i.test(String(s || "")); }

let raw = "";
process.stdin.on("data", d => (raw += d));
process.stdin.on("end", () => {
  let input;
  try { input = JSON.parse(raw || "{}"); } catch (e) { block("entrada del hook ilegible"); }
  const tool = input.tool_name || "";
  const ti = input.tool_input || {};
  if (["Write", "Edit", "MultiEdit", "NotebookEdit"].includes(tool)) block("herramienta de escritura " + tool);
  if (mentionsKey(ti.file_path) || mentionsKey(ti.path) || mentionsKey(ti.pattern) || mentionsKey(ti.command))
    block("la clave del eval no se lee durante la medición");
  if (tool === "Grep" && /(^|[\\/])\.claude([\\/]|$)/.test(String(ti.path || "")) && !/fixtures/.test(String(ti.path || "")))
    block("Grep dentro de .claude/ (fuera de fixtures) no permitido");
  if (tool === "Bash") checkBash(String(ti.command || ""));
  process.exit(0);
});
