---
name: smart-edit
description: >
  Edita archivos de código o texto de forma quirúrgica — cambia solo las líneas necesarias sin
  reescribir el archivo completo. Úsala siempre que el usuario pida corregir un bug, ajustar
  lógica, renombrar algo, cambiar un valor, o cualquier modificación puntual en un archivo
  existente. También aplica cuando el usuario diga "arregla esto", "cambia esta línea",
  "actualiza el valor de X", "corrige el error en Y", o cualquier variante de edición
  localizada. NUNCA reescribas el archivo completo si el cambio afecta menos del 40% del
  contenido — usa siempre edición quirúrgica. Esta skill ahorra tokens significativamente.
---

# Smart Edit — Edición Quirúrgica de Archivos

El objetivo es **tocar solo lo que cambia**. Reescribir un archivo de 300 líneas para corregir
2 líneas desperdicia tokens, borra contexto del diff, y hace las revisiones más difíciles.

---

## Regla de oro

> Si el cambio afecta **menos del 40% del archivo**, usa edición quirúrgica.  
> Si el cambio afecta **más del 40%**, una reescritura completa puede ser más limpia — pero
> explícalo al usuario antes de hacerlo.

---

## Flujo de trabajo

### 1. Leer antes de editar

Antes de proponer cualquier cambio, lee el archivo actual con `view` para entender el contexto
real. No asumas que recuerdas el contenido exacto de un turno anterior.

```bash
# Ver el archivo completo
view /ruta/al/archivo.py

# Ver un rango específico si el archivo es largo
view /ruta/al/archivo.py  # con view_range: [inicio, fin]
```

### 2. Identificar el alcance del cambio

Localiza exactamente:
- Número(s) de línea afectados
- El texto **exacto** que debe cambiar (para usar como ancla en `str_replace`)
- El texto de reemplazo

Si hay múltiples cambios en el mismo archivo, agrúpalos todos antes de ejecutar — no hagas
un `str_replace` por cada línea suelta si puedes capturar un bloque contiguo.

### 3. Ejecutar con str_replace

Usa `str_replace` con el bloque mínimo que identifique unívocamente la sección:

```
str_replace(
  path = "/ruta/al/archivo",
  old_str = "<texto exacto del archivo, suficiente para ser único>",
  new_str = "<texto corregido>"
)
```

**Anclas de contexto:** Si la línea a cambiar es corta o genérica (e.g., `return None`),
incluye 1–2 líneas de contexto arriba y abajo en `old_str` para que el reemplazo sea único.

**Múltiples cambios no contiguos:** Ejecuta un `str_replace` separado por cada sección
no contigua. No intentes capturar todo el archivo con un solo bloque gigante.

### 4. Verificar el resultado

Después de cada edición, usa `view` en el rango afectado para confirmar que el cambio
quedó correcto y no introdujo problemas de indentación o contexto.

---

## Patrones comunes

### Corregir un valor o constante
```
# Antes
MAX_RETRIES = 3

# Después  
MAX_RETRIES = 5
```
→ `str_replace` de una sola línea. No toques nada más.

### Corregir lógica en una función
Incluye la firma de la función como contexto superior y cierra con la llave/indentación
correcta. El bloque `old_str` debe empezar donde cambia la lógica, no desde el inicio
del archivo.

### Renombrar una variable en múltiples lugares
Si el nombre aparece en muchos lugares, evalúa si es mejor un `sed` o find-replace:
```bash
sed -i 's/nombre_viejo/nombre_nuevo/g' /ruta/al/archivo
```
Luego verifica con `view` que no haya colisiones con nombres similares.

### Añadir imports o líneas al inicio/final
Para añadir al principio, usa `str_replace` con la primera línea actual como ancla:
```
old_str = "import os\n"
new_str = "import os\nimport sys\n"
```

Para añadir al final, usa `bash_tool` con `echo >>` o edita el último bloque conocido.

---

## Anti-patrones a evitar

| ❌ Evitar | ✅ Preferir |
|-----------|------------|
| Reescribir 200 líneas para cambiar 3 | `str_replace` en los 3 bloques afectados |
| Usar `create_file` sobre un archivo existente | `str_replace` o `bash_tool` con edición in-place |
| `old_str` de una sola palabra genérica | Incluir contexto suficiente para unicidad |
| Múltiples turnos de "ahora cambio esto, ahora esto" | Planear todos los cambios en un turno y ejecutarlos |

---

## Comunicación con el usuario

Al aplicar ediciones quirúrgicas, muestra un resumen compacto del cambio:

```
Edité `src/config.py`:
- Línea 42: MAX_RETRIES 3 → 5
- Línea 87: eliminada condición redundante `if x is not None`
```

No copies el archivo completo en el chat. Si el usuario necesita ver más contexto,
ofrece mostrar el rango de líneas relevante con `view`.

---

## Cuándo sí reescribir completo

- El archivo es corto (< 30 líneas) y más de la mitad cambia
- La refactorización es estructural (cambia el orden de funciones, reorganiza módulos)
- El usuario lo pide explícitamente

En estos casos, avisa antes: _"Este cambio afecta gran parte del archivo — lo reescribo
completo. ¿De acuerdo?"_
