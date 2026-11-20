# Tutor prompt

El prompt de Vesper tiene versión. El que está en git es `PROMPT_V2` en `vesper_engine_data.js` (marcado VERBATIM: no se edita a la ligera). Los guardrails del chat viven en `GUARDRAILS` de `worker/vesper-chat-proxy.js` y se aplican del lado del servidor.

1. Di qué versión cambias y por qué. Un cambio = una mejora con una razón.
2. Lee el CHANGELOG, INVARIANTS y BACKLOG de la versión actual antes de editar.
3. No rompas los invariantes: casos JSON (`perfil`, `lección` con `source_lesson`), intake de 7 preguntas con "Plazo", examen de ubicación con su número de reactivos y regla de corte, formato de corrección ✅/✏️/💬 con tope de 3 errores, `schema_version`.
4. Sube la versión, agrega la entrada al CHANGELOG.
5. Corre la checklist de regresión con conversaciones reales: alumno A1 en español, alumno B2, alumno que intenta sacarlo del tema. Guarda las salidas.
6. Compara contra la versión anterior en los mismos casos. Si no mejora algo concreto, no se publica.
7. Guardrails: nunca los muevas al cliente; deben seguir aplicándose en el Worker.
