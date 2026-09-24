## Structural invariant

`tokens/utilities.css` is one parse unit: a single unbalanced brace silently
re-parents everything after it. A scripted unwrap once left
`.peer-hover\:text-toned` and its `@media (hover: hover)` unclosed, which nested
`@layer properties` and all 62 `@property` registrations inside a style rule —
`--tw-ring-offset-width` then had no definition, so every `--tw-ring-shadow`
became invalid at computed-value time and **every ring and shadow in the kit
computed to `box-shadow: none`**. After any scripted edit to this file, count
braces (final depth 0, no negatives) and probe a ringed element for a non-`none`
`box-shadow` before shipping.

A net depth of 0 is **not** sufficient: a deleted `{` and a later orphan `}` net
out. The same unwrap also removed the opening `@media (hover: hover) {` of a
twenty-rule group-hover block while leaving its close, so `@layer utilities`
ended 3500 lines early and 677 `sm:`/`md:`/`lg:`/`focus-visible:` rules parsed as
`&`-nested descendants of a `.group-hover\:focus\:bg-accented` rule — dead, and
invisible unless you happen to probe a `sm:`-prefixed class. Check three things:
depth 0, the first return to depth 0 is the file's last `}`, and no rule in
`document.styleSheets` has a `selectorText` starting with `&`.

# Regenerating tokens/utilities.css

`tokens/utilities.css` is Tailwind CSS v4 output, generated for exactly the class
strings this design system uses — the 1,707 unique tokens in `themes.json` plus every
class written in the project's own `.html` / `.jsx` files. It is generated, not
hand-edited.

To regenerate, run a script that:

1. collects class candidates: all string values in `source/themes.json`, plus every
   `class=` / `className=` string in `components/`, `guidelines/`, `ui_kits/`;
2. builds an entry stylesheet = `@import "tailwindcss";` + `tokens/theme.css` +
   `tokens/base.css` + the `@layer base` body rule (see `source/_tw_entry.css`);
3. injects that entry as `<style type="text/tailwindcss">`, puts the candidates in a
   hidden element's class attribute, loads
   `https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4`, waits for it to compile, and
   saves the generated `<style>` text to `tokens/utilities.css`.

The palette in `tokens/palette.css` was extracted the same way from Tailwind's own
default theme, so the oklch values are the framework's, not approximations.

## Post-passes applied to the generated output

1. **Inline in-rule internals** — inside a single rule, a `--tw-*` declaration whose
   value is read by another declaration in the same rule is substituted in and removed.
   **Exception: composite shorthands built from per-axis or per-family variables.**
   `translate`, `scale` and `backdrop-filter` are single properties assembled from
   several `--tw-*` variables, and sibling utilities of the family are applied
   together. Inlining one leaves the rule reading the others from variables nobody
   assigns, so whichever rule wins the cascade zeroes the rest out. These must keep
   Tailwind's own two-step shape:
   applied together (`-translate-x-1/2 -translate-y-1/2`). Inlining one axis leaves
   the rule reading the *other* axis from a variable nobody assigns, so whichever
   rule wins the cascade zeroes the other axis out — a centred modal ends up shifted
   by half its width. These must keep Tailwind's own two-step shape:

   ```css
   .-translate-x-1\/2 { --tw-translate-x: calc(calc(1 / 2 * 100%) * -1); translate: var(--tw-translate-x) var(--tw-translate-y); }
   ```

   i.e. assign the rule's own axis variable, then compose the shorthand from all
   axes. Same for `--tw-scale-x` / `-y`. Single-valued properties (`rotate`) are
   unaffected.
2. **Drop unreferenced internals** — `--tw-*` declarations no other rule reads.
4. **Shadows and rings compose through their own properties.** Every `.shadow-*`\n   rule assigns `--tw-shadow` and every `.ring*` rule assigns `--tw-ring-shadow`,\n   then both build the same composite `box-shadow: var(--tw-inset-shadow),\n   var(--tw-inset-ring-shadow), var(--tw-ring-offset-shadow),\n   var(--tw-ring-shadow), var(--tw-shadow)`. Writing the value straight into\n   `box-shadow` instead makes `shadow-lg` and `ring` compete at equal\n   specificity — whichever comes later in the file erases the other, which is\n   how `toast.root` and `modal.content` lost their shadow. Twelve of the\n   fourteen rules read that way.\n\n   The two hover overrides (`group-hover:ring-primary`,\n   `group-hover/blog-post:shadow-none`) keep their value inline, and the\n   compiler is the reason: a custom property declared under a *descendant*\n   selector is read as an unregistered design token and fails validation —\n   written as `:is(:where(.group):hover *)`, as a plain descendant, or wrapped in\n   an `@media`, all three are rejected. The eviction defect is absent there\n   anyway: each rule interpolates the layer it does not set\n   (`var(--tw-shadow)` in the ring one, `var(--tw-ring-shadow)` in\n   `shadow-none`), so the neighbouring class shows through, and both are\n   overrides meant to win over the base class beside them.\n\n5. **Pseudo-element gradients.** The themes use marquee's and page-logos' fade:
   `before:bg-gradient-to-r before:from-default before:to-transparent`. Two
   constraints collide here. Tailwind's own `@layer properties` reset re-declares
   `--tw-gradient-*` on `*, ::before, ::after, ::backdrop`, so a stop value set on
   the originating element never reaches the pseudo-element — the stop utility has
   to be a rule on the pseudo-element itself. But a custom property under a class
   selector is read as an unregistered design token and rejected.

   Resolved without a custom property at all: the paint lives in a **compound**
   rule that names the direction and the stop pair it is for, so no colour is ever
   assumed for a pair that was not asked for.

   ```css
   .before\:bg-gradient-to-r.before\:from-default.before\:to-transparent::before {
     background-image: linear-gradient(to right in oklab, var(--ui-bg), transparent);
   }
   .before\:from-default::before { content: var(--tw-content); }  /* the box */
   .before\:bg-gradient-to-r::before { background-image: linear-gradient(to right in oklab, var(--tw-gradient-stops)); }
   ```

   A different pair (`before:from-primary`) matches no compound rule and simply
   paints nothing — visibly absent rather than silently wrong, which is what the
   old "bake the colours into the direction utility" pass got wrong. Add a
   compound rule per pair the themes actually use.
4. **Hoist the `*-reverse` flags** to `:root` and annotate uncategorizable tokens with
   `/* @kind other */` (only inside `:root`, `.dark`, `.light` or a plain class scope).

Arbitrary-property utilities are NOT emitted as CSS at all — `extractVarClasses()` in
`lib/tv.js` turns `[--gap:--spacing(16)]` into an inline `--gap` on the element.

## tokens/utilities-extra.css

Generating from the themes' own class strings covers the components but not an
artboard. `tokens/utilities-extra.css` (imported after `utilities.css`) supplies the
rest, and is regenerated the same way — by script, never by hand:

1. **Classes the kit itself produces.** `lib/portal.jsx` rewrites viewport units to
   percentages and `fixed` to `absolute` so an artboard frames a component the way a
   window would — named forms (`min-h-svh` → `min-h-full`) and arbitrary ones
   (`min-h-[calc(100vh-var(--ui-header-height))]` → `…100%…`) alike. Walk *every*
   sizing token in `themes.json`, including variant-prefixed forms, apply the same
   rewrite, and emit a rule for each result `utilities.css` lacks (variant forms
   inside their `@media (width >= …)` block). `calc()` operators must be spaced in
   the emitted value — `calc(100%-2rem)` is invalid CSS — while the selector keeps
   the unspaced class name.
2. **The standard spacing / sizing / alignment scale, and the important (`!`) form of
   every class in it.** The library's own examples style components with
   `class: 'w-96'`, `class: '!p-0'`, `class: '!justify-start'`, and a person laying
   out an artboard writes the same — whether or not a theme happens to use that step.
   Dedupe each class under its **own** escaped name: `.p-0` existing says nothing
   about `.\!p-0`, and comparing the two silently drops every important form whose
   plain form is already present. Negative forms only for the margin and inset
   families. Tailwind's own internals (`--tw-gradient-*`) need a
   `/* @kind other */` annotation.


## Reka runtime custom properties

Reka publishes some sizes at runtime — `--reka-combobox-trigger-width`,
`--reka-select-trigger-width`, `--reka-*-content-available-height`,
`--reka-tabs-indicator-*`. In a static render nothing sets them, and
`width: var(--reka-combobox-trigger-width)` is then an invalid declaration: the
element falls back to shrink-to-fit, which made every menu panel 63px wide under
a 192px field.

So the generated `w-(--reka-*-trigger-width)` rules carry a **100% fallback** —
the panel's positioned ancestor is the field itself, so 100% *is* the trigger's
width. The `max-h-[min(15rem,var(--reka-*-content-available-height,15rem))]`
rules already ship their own fallback in the theme string. The tabs indicator is
the exception: its two variables are measured in `components/navigation/Tabs.jsx`
and written through the render, because no static fallback can express "the
active trigger's width".

## Line-height tokens are NUMBERS, not the source expression

Tailwind's own build emits each `--text-*--line-height` as a number rounded to
six significant digits (trailing zeros dropped), not the ratio it was written
as. The difference is real in pixels: `14px × 1.42857` truncates to 19.984375
(1279/64), while the exact `calc(1.25 / 0.875)` gives a flat 20 — a 1/64px gain
per line that accumulates into whole pixels down a long document.

    --text-xs--line-height: 1.33333;   /* not calc(1 / 0.75)     */
    --text-sm--line-height: 1.42857;   /* not calc(1.25 / 0.875) */
    --text-base--line-height: 1.5;     /* not calc(1.5 / 1)      */
    --text-lg--line-height: 1.55556;   /* not calc(1.75 / 1.125) */
    --text-xl--line-height: 1.4;
    --text-2xl--line-height: 1.33333;
    --text-3xl--line-height: 1.2;
    --text-4xl--line-height: 1.11111;

Keep the literals when regenerating: the kit is compared against what Tailwind
actually ships, and the exact quotient — though mathematically truer — is not
what any real build produces.
