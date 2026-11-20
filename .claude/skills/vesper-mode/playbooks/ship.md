# Ship

Push a `main` = publicar vesperacademy.com.

1. Revisa el diff completo de la rama. Nada de archivos con claves, nada generado editado a mano.
2. `git status`: confirma que cada archivo nuevo sí aparece (whitelist de `.gitignore`).
3. `node tools/check_lessons.mjs` sin errores.
4. Si cambió algo de `CORE` en `sw.js`: `node tools/check_sw_version.mjs --fix` (o `python _scripts/preflight.py --fix` en local).
5. `bash .github/pages_filter.sh _site_prueba` y confirma que no se cuela nada interno; borra `_site_prueba` después.
6. Si hay cambio de Worker o de examen, ese despliegue va antes (ver `worker`).
7. Publica con `bash tools/push_main.sh --yes`: repite las revisiones, crea el tag `respaldo/main-*` y hace push a `main`. Si falla, arregla y repite; nunca lo saltes ni hagas push a mano.
8. Después: espera el workflow "Publicar sitio" en verde, abre la página cambiada en producción y borra la rama de trabajo.
9. Si producción quedó mal: revierte hasta el último tag `respaldo/main-*` (instrucciones en la cabecera de `tools/push_main.sh`).
