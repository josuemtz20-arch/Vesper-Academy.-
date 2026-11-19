# Agentes de Vesper Academy

Todos corren con **Sonnet** (`model: sonnet` en cada definición).

| Agente | Qué hace | Cómo activarlo |
|---|---|---|
| `vesper-content-auditor` | Audita contenido pedagógico (solo lectura, reporta) | `/audit-content vesper_themes_pack.js` |
| `vesper-supervisor` | Verifica el reporte de cualquier otro agente contra el código | `/supervise` (o automático dentro de `/audit-content`) |

## Uso
- Escribe `/audit-content <archivo o nivel>` y corre auditor → supervisor solo.
- Para ver/editar agentes: `/agents`. Las definiciones viven en `.claude/agents/*.md`.
- Para sumar un agente nuevo: copia uno, cambia `name`, `description`, `tools` y el prompt; mantén `model: sonnet`.

## Reglas del sistema
- Los agentes de revisión son **solo lectura**; los cambios los aplica la sesión principal tras tu aprobación.
- Todo agente nuevo pasa por `vesper-supervisor` antes de aplicar cambios.
- Un subagente no puede lanzar a otro: la cadena auditor → supervisor la orquesta la sesión principal (los comandos de `.claude/commands/`).
- Archivos «GENERADO … NO EDITAR» se arreglan en su fuente (`_scripts/`, fuera del repo).
