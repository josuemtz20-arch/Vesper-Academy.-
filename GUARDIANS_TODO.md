# GUARDIANS_TODO — Generar guardianes con IA (Higgsfield) al estilo del gato VESPER

Plan listo para ejecutar **en una sesión NUEVA** de Claude Code on the web (la
red sólo se abre en sesiones nuevas; la sesión donde se redactó esto tenía la
política antigua y no podía descargar resultados).

Para retomar, abre una sesión nueva sobre este repo/entorno y di:
**"continúa con los guardianes de Higgsfield siguiendo GUARDIANS_TODO.md"**.

---

## Estado / requisitos
- **Plan Higgsfield:** `starter`, ~209 créditos (suficiente). Modelo objetivo
  **`nano_banana_pro`** (respeta disfraces; requiere plan ≥ basic).
- **Red del entorno:** debe estar en **Custom** (o **Full**) con estos dominios
  permitidos (Network access → Custom → Allowed domains):
  - `*.higgsfield.ai`
  - `*.cloudfront.net`
  - `cdn.higgsfield.ai`
  (Conserva la lista por defecto para que GitHub/git siga funcionando.)
- **Conector Higgsfield** habilitado en la sesión.
- Al aparecer el permiso de **`mcp__Hiigsfield__job_status`**, dale **Allow**.
- Verifica primero que la red abre: `curl -sI https://higgsfield.ai` NO debe dar
  `host_not_allowed`. Si lo da, la sesión sigue con la política vieja.

## Referencia de estilo (el gato VESPER)
- Archivo en el repo: `assets/images/mascot/vesper_cat.png`
- Gato gris carbón, ojos ámbar, blazer azul marino de academia con ribete dorado;
  ilustración plana semirrealista con sombreado cel y contornos limpios.
- Importar como referencia (repo público, lo hace el server de Higgsfield):
  `media_import_url(url:"https://raw.githubusercontent.com/josuemtz20-arch/Vesper-Academy.-/main/assets/images/mascot/vesper_cat.png", type:"image")`
  → usar el `media_id` devuelto como `medias:[{role:"image", value:<media_id>}]`.

## Parámetros de generación (por imagen)
- `model: "nano_banana_pro"`, `params.resolution: "2k"`, `aspect_ratio: "1:1"`, `count: 1`.
- Preflight con `get_cost:true` la primera vez.
- Incluir la referencia del gato en `medias`.
- Tras enviar, recuperar resultado con `job_status` (o `show_generations`); el PNG
  sale en `results.rawUrl` (host `*.cloudfront.net`).

### Prompt base (anteponer a cada disfraz)
> Keep the EXACT same character from the reference image: a charcoal‑grey cat with
> amber/golden eyes, the Vesper Academy mascot, in a flat semi‑realistic vector
> illustration with soft cel shading and clean outlines. Same face, same fur, same
> eyes. Heroic head‑and‑shoulders portrait, centered, facing forward, plain dark
> navy background, soft rim light, no text, no watermark. Reimagine the cat as:

### Disfraz por mundo (añadir al final del prompt base)
- **A1 · El Centinela del Hogar** → `a cozy hearth guardian in a warm hooded cloak with amber-copper trim, holding a glowing lantern; warm amber and copper tones.`
- **A2 · El Guardián del Sendero** → `a forest path warden in a green hooded ranger cloak with leaf details, holding a wooden staff topped with a leaf; mossy green tones.`
- **B1 · El Vigía del Horizonte** → `a city sentinel/watchman in a steel-blue coat with epaulettes, holding a brass spyglass; sky-blue and slate tones.`
- **B2 · El Heraldo de la Torre** → `a herald in an ornate navy-and-gold tabard, holding a tall standard/banner; rich gold tones.`
- **C1 · El Custodio del Firmamento** → `a celestial custodian in a deep purple astral robe with a star-speckled cloak and a faint glowing constellation halo; cosmic violet tones.`
- **C2 · El Soberano del Saber** → `a noble KNIGHT in polished steel plate armour with navy-and-gold trim and a plumed great-helm tilted up to reveal the cat's face, holding a sword; teal and steel tones.`

## Descargar + guardar
Para cada resultado, descargar `rawUrl` a `assets/images/guardians/` con estos nombres:
`guardian_a1.png · guardian_a2.png · guardian_b1.png · guardian_b2.png · guardian_c1.png · guardian_c2.png`

```bash
mkdir -p assets/images/guardians
curl -sL "<rawUrl>" -o assets/images/guardians/guardian_c2.png
```
(`assets/` ya está en la whitelist de `.gitignore`, así que se publican solos.)
Opcional: recortar a cuadrado/círculo o `remove_background` (Higgsfield) si el
fondo no combina con la tarjeta.

## Integrar en `leccion.html`
La portada del jefe usa `bossArt(level)` dentro de `.boss-emblem`
(`renderBossCover`, ~línea 1716; resultados ~2312/2332). Plan:
1. Definir mapa de retratos:
   ```js
   var BOSS_PORTRAIT = { A1:"assets/images/guardians/guardian_a1.png", A2:"...", B1:"...", B2:"...", C1:"...", C2:"..." };
   ```
2. Helper que prefiere el PNG y cae al SVG actual si falta:
   ```js
   function bossPortrait(lv){
     var src = BOSS_PORTRAIT[lv];
     return src ? '<img class="boss-photo" src="'+src+'" alt="" loading="lazy" onerror="this.outerHTML=\''+/*fallback*/'\'">' : bossArt(lv);
   }
   ```
   (Más simple: usar `<img>` con `onerror` que reinyecte `bossArt(lv)`; o comprobar
   existencia en build. Mantener `bossArt` como respaldo.)
3. Reemplazar `bossArt(lesson.bossLevel)` por `bossPortrait(lesson.bossLevel)` en
   los 3 puntos `.boss-emblem` (portada + resultado victoria/derrota).
4. CSS sugerido:
   ```css
   .boss-emblem img.boss-photo{width:128px;height:128px;border-radius:50%;
     object-fit:cover;border:3px solid var(--w-accent,#c5a059);
     box-shadow:0 6px 16px rgba(20,18,42,.5)}
   ```
5. (Opcional) usar el retrato también en el nodo del mapa (`bossNodeHtml`, beacon).

## Verificación
- `node --check` no aplica a HTML; revisar que no rompa el `<script>`.
- Servir y capturar:
  ```bash
  http-server -p 8099 -c-1 &
  # PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers, abrir leccion.html?id=boss:C2 etc.
  ```
- Confirmar que cada portada muestra el guardián correcto y, si falta el PNG,
  cae limpio al SVG.

## Commit
- Rama: `claude/lesson-progression-levels-lk1chr`.
- Añadir `assets/images/guardians/*.png` + cambios de `leccion.html`.
- Mensaje sugerido: "Add AI-generated themed guardian portraits (Higgsfield), with SVG fallback".
