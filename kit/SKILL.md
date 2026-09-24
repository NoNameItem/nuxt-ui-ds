---
name: nuxt-ui-design
description: Use this skill to generate well-branded interfaces and assets for Nuxt UI (@nuxt/ui 4.11.1), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for protoyping.
user-invocable: true
---

Read the README.md file within this skill, and explore the other available files.
If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.
If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.

Specific to this system:
- `readme.md` is the design guide; `source/themes.json` is the value ground truth (117 components).
- Link `styles.css` and load Iconify (`https://cdn.jsdelivr.net/npm/iconify-icon@3/dist/iconify-icon.min.js`) in any page you build.
- Utility classes come from `tokens/utilities.css`, generated for exactly the class strings this system uses. If you write markup with utilities that are not in it, regenerate per `source/regen-utilities.md`.
- Never invent a size step or realign one component's scale to another's.
- Any `.dark` container inside a light page must carry `bg-default text-default`:
  `color` is inherited already computed, so without it the dark palette's
  `--ui-text` never reaches the subtree and the content stays grey.
