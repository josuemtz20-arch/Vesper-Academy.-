# Firestore rules

La seguridad real vive aquí. Base `teachermanuals`. Docs: `FIRESTORE_*_RULES.md`.

1. Lee el `FIRESTORE_*_RULES.md` del área (escuela, boleta, resultados, liga) antes de cambiar nada.
2. Escribe quién puede leer y escribir qué, como tabla, antes de tocar la regla.
3. Orden de despliegue: primero los datos (campos como `allowedBooks`, roles, inscripciones, en modo plan y luego `--apply`), después las reglas. Publicar reglas que exigen campos aún inexistentes deja fuera a alumnos.
4. Edita las reglas y actualiza el `.md` correspondiente en el mismo cambio.
5. Prueba sin publicar: `python _scripts/check_rules.py`. Incluye un caso que debe ser rechazado (alumno leyendo libro que no tiene, alumno escribiendo su propia nota del profesor).
6. **PAUSA.** Pide confirmación a Josue antes de publicar en la consola o correr `--apply`.
7. Tras publicar, prueba con una cuenta de alumno y una de profesor reales.
