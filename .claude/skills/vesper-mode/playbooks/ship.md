# Ship

Push a `main` = publicar vesperacademy.com.

1. Revisa el diff completo de la rama. Nada de archivos con claves, nada generado editado a mano.
2. `git status`: confirma que cada archivo nuevo sí aparece (whitelist de `.gitignore`).
3. `node tools/check_lessons.mjs` sin errores.
4. Si cambió algo de `CORE` en `sw.js`: `python _scripts/preflight.py --fix` (el hook `pre-push` lo verifica).
5. `bash .github/pages_filter.sh _site_prueba` y confirma que no se cuela nada interno; borra `_site_prueba` después.
6. Si hay cambio de Worker o de examen, ese despliegue va antes (ver `worker`).
7. **PAUSA.** Pide confirmación a Josue antes del merge/push a `main`.
8. Después: espera el workflow "Publicar sitio" en verde y abre la página cambiada en producción.
