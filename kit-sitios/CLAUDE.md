# kit-sitios — instrucciones para Claude

Este directorio es una fábrica de sitios web. Para crear uno nuevo usa la skill `nuevo-sitio`
(`.claude/skills/nuevo-sitio/SKILL.md`): brief → `sitio.json` → `scripts/crear_sitio.py` → pulir → preflight.

- El sitio generado va en su PROPIA carpeta/repo, fuera de `kit-sitios/`.
- Si cambias la plantilla (`plantilla/`) o los scripts, regenera `sitio.ejemplo.json` en el scratchpad y
  confirma 0 errores en el preflight antes de dar por buena la mejora.
- Placeholders en plantillas: `{{MAYUSCULAS}}`. Una variable desconocida detiene el generador a propósito.
