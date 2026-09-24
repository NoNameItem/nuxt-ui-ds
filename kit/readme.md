# Nuxt UI 4.11.1 — Design System

A machine-faithful port of the **@nuxt/ui 4.11.1** Vue component library to React +
CSS, built for design work: every value comes from the library's own theme files,
not from a redraw of its documentation.

## Sources

| Source | Path given to me | What was taken from it |
|---|---|---|
| Nuxt UI 4.11.1 theme files (117 components) | `nuxt-ui-4.11.1-ds/themes.json` (copied to `source/themes.json`) | **Every class value.** Slots, variants, compoundVariants, defaultVariants — literal, unrounded, un-aligned between components. |
| Nuxt UI 4.11.1 component templates (124 Vue SFCs) | `nuxt-ui-4.11.1-ds/components-1.md`, `components-2.md` (copied to `source/`) | **DOM structure.** Element nesting and `data-slot` names, parsed out programmatically into `source/_trees.json`. |
| Nuxt UI 4.11.1 tokens | `nuxt-ui-4.11.1-ds/tokens.css` (copied to `source/tokens.source.css`) | `--ui-*` semantic roles, light/dark scopes, `@theme` mapping, keyframes — verbatim. |

No screenshots, no published docs, no memory of "how Nuxt UI looks" was used.

## What Nuxt UI is

Nuxt UI is the official component library for Nuxt — 117 themed components (a free
core plus the former Nuxt UI Pro set: dashboard, chat, page/marketing, pricing,
auth, changelog and blog blocks). Each component is a Vue SFC whose DOM nodes are
tagged `data-slot="<name>"`, and a theme file that maps every slot to a Tailwind
class string. Consumers restyle by overriding slot classes, never by writing CSS.
The library ships no webfont and no logo of its own.

---

## CONTENT FUNDAMENTALS

How Nuxt UI writes, taken from the props, labels and defaults in the source:

- **Nouns, not sentences.** Labels are one or two words, sentence case: `Save changes`,
  `Get started`, `No results`. Never title case, never ALL CAPS (the only uppercase in
  the whole system is `Kbd`, whose theme literally contains `uppercase`).
- **Second person, sparingly.** UI copy addresses the user as *you* only when it must
  ("You are approaching the seat limit"); most strings have no pronoun at all.
- **Imperative for actions, plain nouns for state.** Buttons: `Delete project`,
  `Invite member`. Statuses: `Active`, `Trialing`, `Churned`.
- **Empty and error states are two lines**: a short title (`No results`) and one
  explanatory sentence with a full stop (`Try another query.`). The `empty` and
  `error` themes both carry a `title` + `description` slot pair for exactly this.
- **No emoji, anywhere.** Not in labels, not in docs, not in status. Icons carry that
  weight instead.
- **Technical, unexcited tone.** The library's own descriptions read like
  "A themeable button with variants, sizes and colours" — no superlatives, no
  exclamation marks, no marketing voice inside the product surface. The marketing
  surfaces (`page-hero`, `page-cta`) allow one confident claim per section and still
  avoid hype.
- **Numbers are literal and tabular** — `$48,290`, `1.8%`, `v4.11.1`. Version strings
  always carry the `v`.

## VISUAL FOUNDATIONS

**Colour.** Seven semantic roles — `primary` (green), `secondary` (blue), `success`
(green), `info` (blue), `warning` (yellow), `error` (red), `neutral` (slate) — each an
11-step oklch scale aliased onto the Tailwind v4 palette (`tokens/palette.css`,
`tokens/semantic.css`). Components never name a palette step directly; they name a
role (`bg-primary`, `text-error`) or a surface / ink / edge alias: `bg-default / -muted /
-elevated / -accented / -inverted`, `text-dimmed / -muted / -toned / -default /
-highlighted / -inverted`, `border-default / -muted / -accented / -inverted`.
Transparency is used as a *tint of a role*, never as a new colour: `bg-primary/10`,
`bg-elevated/50`, `ring-error/50`, `outline-primary/25`.

**Dark mode.** A single `.dark` class re-points every `--ui-*` role. Light surfaces
climb white → neutral-50 → 100 → 200; dark surfaces climb neutral-900 → 800 → 700.
Components contain no dark-specific logic beyond the handful of `dark:` classes the
themes already carry (mostly `dark:disabled:bg-transparent`).

**Type.** No webfont ships with the library — `--font-sans` is the Tailwind v4 system
stack (San Francisco / Segoe UI / Roboto), `--font-mono` the system mono stack.
Component text lives between `text-xs` (12px) and `text-base` (16px); marketing
headings jump to `text-3xl`…`text-7xl` with `tracking-tight font-bold` and
`text-pretty`. Weights used: 400 body, 500 `font-medium` for controls, 600
`font-semibold` for titles, 700 `font-bold` for hero type only.

**Radius.** One knob: `--ui-radius: 0.25rem`. Every step is a multiple (`rounded-sm`
1×, `md` 1.5×, `lg` 2×, `xl` 3×). Controls are `rounded-md`, containers `rounded-lg`,
switches and avatars `rounded-full`. Nothing is a pill unless it is round.

**Borders are rings.** Edges are drawn with `ring` (inset box-shadow) so they cost
nothing in the box model: `ring ring-default`, `ring-inset ring-accented`. `border`
appears only where the theme says so — dividers between dashboard panels, table row
separators, header bottom edges.

**Elevation.** Deliberately flat. Surfaces separate by tint (`bg-elevated/50`) plus a
ring, not by shadow. `shadow-sm` appears on dropdown/popover content, `shadow-lg` on
modals, slideovers and the switch thumb. There are no coloured or glow shadows.

**Backgrounds.** Solid role colours only — no gradients, no photography, no patterns,
no illustrations anywhere in the library. The one blur in the system is the sticky
header: `bg-default/75 backdrop-blur-sm`. Overlays dim with `bg-elevated/75`.

**Motion.** `transition-colors` at the default 150ms for interactive colour changes;
`duration-200 ease-out` for transforms (switch thumb, chevrons rotating on
`data-[state=open]`). Overlays use the shipped keyframes: `scale-in`/`scale-out`
(0.95→1 with fade) for modals and popovers, `slide-in-from-*-and-fade` (4px travel)
for menus, `accordion-down`/`collapsible-up` for disclosure, `shimmer` for loading.
Every keyframe degrades to a plain fade under `prefers-reduced-motion`. No bounces,
no springs, no easing longer than 200ms.

**States.** Hover darkens or tints the role — `hover:bg-primary/75` on solid,
`hover:bg-error/10` on outline/ghost, `hover:bg-elevated/50` on rows and list items.
Active/press repeats the hover value (`active:bg-primary/75`); nothing scales or
shrinks on press. Focus is an `outline` in the role at 25% alpha, 3px, drawn with
`focus-visible:outline-3` — plus `focus-visible:ring-2 ring-inset` on inputs.
Disabled is `opacity-75` + `cursor-not-allowed`, keeping the fill. Selected/open/
checked are expressed through data attributes (`data-[state=open]`,
`data-[state=checked]`, `data-highlighted`), never through extra classes.

**Layout.** `--ui-container: 80rem` with `px-4 sm:px-6 lg:px-8`; `--ui-header-height:
4rem` for every sticky header and dashboard navbar. Dashboard shells are full-height
flex columns (`min-h-svh`) with `overflow-y-auto` bodies. Page sections breathe on a
`py-16 sm:py-24 lg:py-32` rhythm; hero sections `py-24 sm:py-32 lg:py-40`.

**Imagery.** The library provides none. Where a kit needs an image, use a neutral
placeholder — do not introduce stock photography, gradients or generated art into
this system.

## ICONOGRAPHY

- Nuxt UI names icons with Iconify syntax expressed as a class: `i-lucide-check`,
  `i-lucide-chevron-down`. The default set throughout 4.11.1 is **Lucide** (24px grid,
  2px stroke, round caps). Some Pro components default to `i-lucide-*` equivalents of
  the same glyph names.
- Icons are sized with `size-*` utilities — `size-4` (16px) inside xs/sm controls,
  `size-5` (20px) in navigation and md+ controls, `size-6` in feature blocks.
  They inherit `currentColor`; they are never given their own colour except
  `text-primary` on feature/leading icons and `text-dimmed` on affordances.
- **No SVG artwork ships in the repo** — icons are resolved at build time from the
  Iconify data. This design system therefore loads Lucide from the Iconify CDN
  (`iconify-icon` web component) rather than shipping copies; `components/core/Icon.jsx`
  translates `i-lucide-x` → `lucide:x`. **Flagged substitution:** the glyph data is the
  genuine Lucide set, but it is fetched from a CDN instead of bundled.
- No emoji and no unicode symbols are used as icons. Keyboard hints use `Kbd`, which
  renders characters like ⌘ and ⏎ as text inside a themed key cap.
- **No logo was provided** in the source archive and none has been drawn. Anywhere a
  mark would go — the thumbnail, kit headers — the words "Nuxt UI" (or the sample
  product name) are set in plain type. Add `assets/logo.svg` and I will use it.

---

## How a component is built here

Each component is one `.jsx` file containing:

1. `export const <name>Theme = { … }` — the theme **copied verbatim** from
   `themes/<name>.ts` (available as `source/themes.json` → key `"<name>"`). This is the
   literal left in place so the design system can be diffed against the library by
   machine.
2. `const tree = [ … ]` — the DOM extracted from `<Name>.vue`: nesting plus the
   `data-slot` name on each node.
3. `export function <Name>(props)` — resolves the theme through `lib/tv.js`
   (slots → variants → compoundVariants → defaultVariants, then `ui` and `class`
   overrides through a light tailwind-merge) and renders the tree.

Props follow the library: `variant`, `size`, `color`, `orientation`, … plus **one prop
per slot** taking arbitrary React children (`<Card header={…} footer={…}>body</Card>`),
`items` for repeated rows, `ui={{ slot: "classes" }}` for overrides, and `class` for the
root. Overlay components take `open` as a prop — the state is declarative, the
behaviour is not reproduced (per brief).

**Size scales are per component and are never aligned.** `Button` has xs sm md lg xl
(no 2xs); `Avatar` has 3xs…3xl; `Badge`, `Kbd`, `Switch` each have their own. Copying a
scale between components is a bug.

## Components

**data/** (5) — Accordion, Carousel, ScrollArea, Splitter, Table

**core/** (21) — Alert, Avatar, AvatarGroup, Badge, Banner, Button, Card, Chip, Collapsible, Container, Empty, Error, Kbd, Link, Marquee, Progress, ProgressGroup, Separator, Skeleton, Tooltip, User

**auth/** (1) — AuthForm

**page/** (17) — BlogPost, BlogPosts, Page, PageAnchors, PageAside, PageBody, PageCTA, PageCard, PageColumns, PageFeature, PageGrid, PageHeader, PageHero, PageLinks, PageList, PageLogos, PageSection, PricingPlan, PricingPlans, PricingTable

**navigation/** (16) — Breadcrumb, CommandPalette, ContextMenu, DropdownMenu, Footer, FooterColumns, Header, Listbox, Main, NavigationMenu, Pagination, Sidebar, Stepper, Tabs, Timeline, Tree

**forms/** (28) — Calendar, Checkbox, CheckboxGroup, ColorPicker, Editor, EditorDragHandle, EditorEmojiMenu, EditorMentionMenu, EditorSuggestionMenu, EditorToolbar, FieldGroup, FileUpload, Form, FormField, Input, InputDate, InputMenu, InputNumber, InputRating, InputTags, InputTime, PinInput, RadioGroup, Select, SelectMenu, Slider, Switch, Textarea

**chat/** (8) — ChatMessage, ChatMessages, ChatPalette, ChatPrompt, ChatPromptSubmit, ChatReasoning, ChatShimmer, ChatTool

**dashboard/** (10) — DashboardGroup, DashboardNavbar, DashboardPanel, DashboardResizeHandle, DashboardSearch, DashboardSearchButton, DashboardSidebar, DashboardSidebarCollapse, DashboardSidebarToggle, DashboardToolbar

**overlays/** (6) — Drawer, Modal, Popover, Slideover, Toast, Toaster

Icon (components/core) — intentional addition, no theme entry.


## UI kits

- `ui_kits/dashboard/` — Nuxt UI Pro dashboard shell: sidebar, navbar, toolbar, stat
  cards, customer table, command palette, settings and inbox views. Interactive.
- `ui_kits/marketing/` — SaaS landing page: sticky blurred header, hero, logo wall,
  feature grid, pricing, inverted CTA, footer.
- `ui_kits/docs/` — documentation site: aside navigation, prose body with a live
  component preview, on-this-page rail, prev/next links.
- `ui_kits/chat/` — AI chat app: thread rail, message list with hover actions,
  composer (type and send to see the mocked reply).

Every kit toggles light/dark from its own header.

## Files

| Path | What |
|---|---|
| `styles.css` | The only stylesheet consumers link. `@import` list, nothing else. |
| `tokens/palette.css` | Tailwind v4 oklch scales, verbatim values. |
| `tokens/semantic.css` | Role → palette aliases (`--ui-color-primary-*`, `--ui-primary`). |
| `tokens/base.css` | Verbatim from the source: `.light`/`.dark` role values, `--ui-radius`, `--ui-container`, `--ui-header-height`. |
| `tokens/theme.css` | Verbatim `@theme` mapping of roles onto Tailwind utility namespaces. |
| `tokens/keyframes.css` | Verbatim animation keyframes. |
| `tokens/utilities.css` | **Generated.** Tailwind v4 output for exactly the class strings this system uses. Regenerate per `source/regen-utilities.md`. |
| `tokens/utilities-extra.css` | **Generated.** What the themes' own strings don't cover: the kit's viewport→percent rewrites (incl. variant forms) and the standard spacing / sizing / alignment scale a hand-written artboard needs. |
| `lib/tv.js` | Theme resolver (tailwind-variants subset) + light tailwind-merge. |
| `lib/factory.jsx` | Theme + DOM tree → React component. |
| `lib/iconify.jsx` | `i-lucide-*` → Iconify `<iconify-icon>`. |
| `lib/registry.js` | Lets the renderer reach kit components that import it (Avatar inside User/Timeline). |
| `lib/reads.js` | How each component **reads** a variant before handing it to `tv()` — 40 pairs taken from the library source, with file and line. |
| `lib/use-site.js` | Props a parent's template writes at the **use site** of a nested component (`<UButton size="xs" v-bind="action">`, `:size="props.size"`) — extraction keeps nesting and slot names, not these, so without the map every nested component drew its own default. |
| `lib/child-themes.js` | **Generated.** Themes of components that appear as nodes inside other components' DOM, so a child contributes its own classes under the wrapper's slot class. |
| `lib/portal.jsx` | Rewrites `fixed`→`absolute` and viewport units→percentages on every component, so the artboard is the screen. |
| `lib/icons.js` | `appConfig.ui.icons` defaults + the slot → icon map each template reads. |
| `lib/defaults.js` | `defineProps` defaults extracted from the SFCs (applied before variants resolve). |
| `components/<group>/` | 118 components, each with `.jsx`, `.d.ts`, `.prompt.md`; one `@dsCard` HTML per group. |
| `guidelines/*.card.html` | Foundation specimen cards (colour, type, spacing, brand). |
| `ui_kits/<product>/` | Full-screen product recreations. |
| `source/` | The provided archive plus the intermediate extractions (`_trees.json`, `_classes.txt`, `_manifest.json`). |
| `SKILL.md` | Agent-skill entry point. |

## Intentional additions

- **`Icon`** (`components/core/Icon.jsx`) — `Icon.vue` exists in the source but has no
  entry in `themes.json`; every themed component depends on it, so it is exposed.
- **`Pagination`** is written by hand rather than from its tree: the shipped DOM is
  entirely reka-ui `Pagination*` primitives whose page list is computed in script.
  The static version reproduces the same button set (first/prev/pages/next/last,
  ellipsis) from `page` / `total` / `itemsPerPage` / `siblingCount` / `showEdges`.
- **`Checkbox`, `Switch`, `Slider`, `InputRating`, `Table`, `AuthForm`,
  `DashboardNavbar`, `DashboardSearchButton`** are likewise written by hand:
  their visible state (`data-state`, thumb/range geometry, item count, the
  column model, the control chosen per `field.type`) is produced in
  `<script setup>` or by a reka/TanStack primitive and is absent from the
  extracted DOM. Themes are still the verbatim literals and every slot keeps
  its `data-slot` name.
- Every subtree root carries `data-ds-component="<Name>"`, so a node can be
  attributed to its own theme — the first `data-slot="icon"` inside an Alert
  belongs to its close Button, not to the Alert. An overlay declares `overlay`
  and `content` as siblings and both are stamped; only the first also takes the
  caller's `class` and passthrough props.
- `Table` takes **`data`**, not `items`.
- A slot value can be a **props object** rather than content: `close={{ color: 'neutral' }}`,
  `actions={[{ label: 'Undo' }]}`, `links={[…]}`, `authors={[…]}`, `avatar={{ src }}`.
  The renderer mounts the component that slot paints (from the extracted tree, or
  from the slot name when the tree only kept the `v-for` wrapper). Strings and React
  elements are still content; an array of plain strings repeats the component once per
  entry (`kbds={['meta','k']}` → two `Kbd`s).
- Only props the renderer did not consume reach the DOM, and only as primitives.
- A theme's boolean variant is keyed `"true"`/`"false"`, but the value the library
  hands `tv()` is almost never the raw prop: `Alert.vue:39` passes
  `!!props.title || !!slots.title`, `PageHero.vue:44` passes `!slots.headline`,
  `Modal.vue:64` passes `props.overlay` untouched. `lib/reads.js` holds those forms
  and `tvr()` applies them, so `title="Heads up!"` still fires the variant and the
  description keeps its `mt-1`. There is deliberately no blanket `!!` rule — the
  `raw` / `inverted` / `off` rows would break under one.
- A missing boolean variant resolves through the theme's `"false"` branch, the way
  `tailwind-variants` does: `t({})` and `t({size: false})` return the same classes.
- **`modelValue` / `defaultValue` are how a value reaches a component**, as in the
  library and its examples: they set the shown value (Select, Textarea, Input,
  InputNumber), pick the selected item of a list, and drive `data-state` on
  Switch, Checkbox, RadioGroup and Progress. A bare `value` prop still works.
- A node whose type is a kit component **is** that component: the renderer mounts
  it with the call-site props recorded on the node (`"p"`), the props the parent
  forwards (`"fwd"`, the tree's record of `useForwardProps(reactivePick(…))`) and
  the wrapper's slot class. Painting one element with a copy of the child's theme
  instead left CheckboxGroup drawing 141 slot nodes against the library's 496 —
  every `item` an empty shell — and dropped the call site's props, so
  ChatPrompt's `variant="none"` textarea came out `outline`. The mount happens
  *after* the node's own gates: a mounted component is still a node with a
  `v-if`.
- A mounted child component **is** the element of the slot it stands on: it takes
  that `data-slot` and never stamps its own `root` on top (that doubled the root
  count on blog-post and every avatar before it). On a
  slotless node — a `UAvatarGroup` that is not a slot of its host — it emits no
  `data-slot` at all.
- A slot whose value is a list of objects feeds the `v-for` inside it, rather
  than becoming the node's own content.
- A mounted `Avatar` **is** its slot's element: it takes the wrapper's slot name
  (`data-slot="avatar"`), never stamping a second `root` on top, and a bare
  string value is the image `src`. Timeline and Empty draw their icon through
  that avatar (their trees have no icon node); Alert has both, so its `icon`
  never becomes an avatar.
- Nested components register themselves by name (`register('Container', Container)`
  at the foot of each file), so the renderer can mount them without depending on
  the compiled bundle's global namespace — on a surface that loads components
  without it, a nested `UContainer` used to fall back to a painted shell.
- A `group` slot on a `for` node iterates groups, not items: a flat list is one
  group (Listbox's item template lives in a Define, so there is no nested `for`
  left to infer it from).
- A `separator` between repeated items exists for every item but the last — a
  position, not a prop.
- An orphan `Define…Template` — one whose `Reuse` was lost in extraction — is
  rendered, once per item where the component has items, and **inside** the root
  element where the lost `Reuse` sat (`orphanDefinesOutside` for Modal, whose
  content really is a sibling of the overlay inside the portal). "Orphan" means
  *not drawn anywhere*, not "has no Reuse node": a body whose slots already
  appear in the tree or in a reused define, or one the component places itself
  through `inlineDefineInto`, is skipped — otherwise NavigationMenu drew every
  item twice. `inlineDefineInto` also repeats the body per entry when the node it
  lands in carries a group (Listbox's item template belongs inside
  `content > group`, not as a flat sibling list at the root). `orphanDefinesNeedOpen` holds a popup's item template back while
  the panel is closed (SelectMenu, InputMenu), the way the library renders no
  items at all until it opens.
- A child component inside another's DOM (`{"t":"UContainer","s":"container"}`)
  contributes its **own** theme under the wrapper's slot class, exactly as
  `Container.vue` does with `ui({ class: [props.ui?.base, props.class] })`. Static
  props written at the call site live on the node (`"p": {"color": "neutral"}`),
  and the incoming class lands in the slot that component's template puts it in
  (Modal → `content`, Badge → `base`), not in whichever slot its theme lists first.
  Where the library has a wrapper *plus* an inner control and the kit has one
  collapsed node, that node takes the theme's **painting** slots together
  (`PAINT_SLOTS` in `lib/child-themes.js`: Input, Textarea and Progress are
  `root` + `base`) — classing it from the class-landing slot
  alone left `relative inline-flex items-center` and no padding, ring or radius.
  Only where `base` really is the painting element directly inside the wrapper:
  Checkbox nests `root > container > base` and hangs `wrapper`/`label` off the
  same root, and merging there made CheckboxGroup's `size-4` item measure 30px —
  an intermediate slot in the theme is the test, not a per-component list.
- A node's `v-if` asks the prop named after its slot, with the component's own
  `defineProps` default behind it — `overlay`, `arrow`, `close`. Slideover and
  Drawer both default `overlay: true`, so gating an empty node purely on "has no
  children" deleted their backdrop; `overlay={false}` removes it on whichever
  branch it sits. Where the condition cannot be named (DashboardPanel guards its
  resize handle on `resizable`, not on `handle`), an empty gated node still goes.
- Two nodes carrying one slot name are the `v-if`/`v-else` branches of a single
  element — Modal declares `DialogOverlay` twice, Tree's `linkTrailingIcon` is
  the open/closed chevron — and the first one emitted wins, whether they are
  siblings under an element or under a transparent `<slot>`/`<template>`.
- `<textarea>` takes `rows` from the call site over the component's own default:
  ChatPrompt forwards 1, Textarea's own default is 3.
- A node's `v-if`, and a floating panel's open state, are gated wherever the node
  sits in the tree. Being the root of its own subtree carries attribution
  (`data-ds-component`, plus the call site's props on the first one) and nothing
  more — it used to also excuse the node from its own gates, which drew
  DashboardPanel's resize handle on every dashboard page and Select's popup while
  closed.
- A component whose tree nests loops over **different** lists answers per loop
  through `options.listFor(node, {props, item, slots})` — PageSection's feature
  rows iterate `features`, CommandPalette's groups iterate `groups`. One shared
  `items` could serve only one of them.
- Icons carry their tree slot name (`leadingIcon`, `separatorIcon`, …), not a
  blanket `data-slot="icon"`. Their box is the theme's `size-*` class; the
  element keeps its `display:inline-block; flex-shrink:0` inline style (a round
  of "the library's box is 16px, ours 20" turned out to be a reference page
  rendered with no CSS at all — the boxes match).
- Any slot whose name ends in `avatar` (`leadingAvatar`, `trailingAvatar`) is an
  avatar, and the host's matching `<slot>Size` value is the child's size token
  (`badge.size.md` → `leadingAvatarSize: "3xs"`), not the host's own `size`.
- A component's element comes from `as`, whose value usually lives in
  `defineProps` rather than the call site — Kbd is a `<kbd>`, Badge a `<span>`,
  Breadcrumb a `<nav>`, ChatPrompt a `<form>`. A `to` still wins: that is a link.
- Floating panels get `--reka-*-content-transform-origin` set inline from `side`,
  the way reka's popper does; without it the theme's `origin-(--reka-…)` is
  invalid at computed-value time.
  never `className={ui.slot(…)}` directly: arbitrary-property utilities
  (`[--gap:--spacing(16)]`) are custom properties, not classes, and have to move
  into `style` or everything reading them (`gap-(--gap)`) is invalid.
- Two mutually exclusive branches can share one slot name (ChatReasoning's
  shimmer and plain label). The branch is chosen by the component's own condition
  through `renderIf`, which receives the tree node — never by whether the slot
  happens to have content.

## Known gaps

- `ContextMenu`, `DropdownMenu` content DOM lives in `*Content.vue` sub-templates that
  are not tagged in the two template files; those components fall back to a slot tree
  synthesised from their theme (same classes, flatter nesting). Same for
  `BlogPosts, ChatPromptSubmit, DashboardGroup, DashboardResizeHandle,
  DashboardSidebarCollapse, DashboardSidebarToggle, EditorEmojiMenu, EditorMentionMenu,
  EditorSuggestionMenu, FieldGroup, Form, Kbd, Link, Main, PageBody, PageColumns,
  PageGrid, PageList, Skeleton` — most of these are single-node wrappers
  where the synthesised tree is exact.
- `ColorModeButton`, `LocaleSelect` and the `Content*` components mentioned in the brief
  have no template in the supplied `components-*.md` and no theme, so they were not
  invented.
- `tokens/utilities.css` is generated Tailwind v4 output with four post-passes so the
  stylesheet contains no design-token declarations under utility selectors:
  in-rule internals are inlined to literal values (`--tw-scale-x: 110%; scale: var(…)`
  becomes `scale: 110% 110%`), unreferenced internals are dropped, the `before:/after:`
  protection gradients are baked into literal `linear-gradient()`s, and the
  arbitrary-property utilities (`[--gap:…]`, `[--sidebar-width:16rem]`,
  `[--spotlight-color:…]`) are applied by `extractVarClasses()` in `lib/tv.js` as inline
  custom properties on the element. Rendering is unchanged; regenerating from source
  requires re-running those passes (see `source/regen-utilities.md`).
- Interactive overlay behaviour (opening menus, focus traps, toast queues) is
  intentionally not implemented — state is a prop.
