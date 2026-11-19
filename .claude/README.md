# Agentes de Vesper Academy

Todos corren con **Sonnet** (`model: sonnet` en cada definición).

| Agente | Qué hace | Cómo activarlo |
|---|---|---|
| `vesper-content-auditor` | Audita contenido pedagógico (solo lectura, reporta) | `/audit-content vesper_themes_pack.js` |
| `vesper-supervisor` | Verifica el reporte de cualquier otro agente contra el código | `/supervise` (o automático dentro de `/audit-content`) |
| (medición) | Corre el auditor contra errores plantados y calcula precisión/recall | `/eval-agents [n]` |

## Uso
- Escribe `/audit-content <archivo o nivel>` y corre auditor → supervisor solo.
- Para ver/editar agentes: `/agents`. Las definiciones viven en `.claude/agents/*.md`.
- Para sumar un agente nuevo: copia uno, cambia `name`, `description`, `tools` y el prompt; mantén `model: sonnet`.

## Reglas del sistema
- Los agentes de revisión son **solo lectura**; los cambios los aplica la sesión principal tras tu aprobación.
- Todo agente nuevo pasa por `vesper-supervisor` antes de aplicar cambios.
- Un subagente no puede lanzar a otro: la cadena auditor → supervisor la orquesta la sesión principal (los comandos de `.claude/commands/`).
- Archivos «GENERADO … NO EDITAR» se arreglan en su fuente (`_scripts/`, fuera del repo).
- **Solo lectura con control técnico, no solo de prompt**: auditor y supervisor llevan un hook `PreToolUse` en su frontmatter (`.claude/hooks/readonly_guard.js`, requiere `node`) que bloquea escrituras, `>`/`>>`, `$(...)`, `sed -i`, git que modifique y `node` con APIs de escritura. Está en el frontmatter (no en `settings.json`) para que la sesión principal siga pudiendo hacer commits. Límite: `node -e` ofuscado podría pasar; es barrera contra errores, no contra un atacante.
- Una corrida = un archivo de contenido (~400 KB máx.) leído por tramos de 300–400 líneas.

## Medición (`.claude/eval/`)
- `fixtures/eval_pack.js`: copia de prueba con 7 errores plantados y 4 falsos positivos conocidos. Nunca se planta nada en archivos reales; `.claude/` no se publica (`.github/pages_filter.sh`).
- `expected.b64`: la clave, en base64 para que un `grep` del auditor no la encuentre; el hook también bloquea leerla.
- `score.js`: `node .claude/eval/score.js reporte.txt` → precisión, recall, trampas, severidad, cobertura.
- Contaminación conocida: P4 (contracciones), P5 (id equivocado) y las trampas T1–T3 imitan casos que el prompt ya menciona; miden adherencia al prompt, no generalización. P1, P2, P3, P6, P7 y T4 son ciegos. Al agregar casos, NO los cites en los prompts.
