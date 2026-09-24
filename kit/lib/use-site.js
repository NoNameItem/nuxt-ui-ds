/* Props written at the USE SITE of a nested component.

   Extraction keeps element nesting and `data-slot` names, but not the
   attributes a parent's template passes down — so every nested component fell
   back to its own defaults. Three forms appear in the library and all three
   were lost identically:

     literal        <UButton size="xs" v-bind="action">          (Toast.vue:99)
     host binding   <UButton :size="props.size" v-bind="action">  (Empty.vue:64)
     host binding   <UButton :color="props.color" …>              (Toast.vue:99)
     host theme     <UBadge :size="ui.linkTrailingBadgeSize()">   (NavigationMenu.vue:162)

   Order matters: the use-site value comes BEFORE `v-bind="item"`, so it is a
   default the item's own field overrides.

   `host('size')` reads the host component's resolved prop. Sizes that come from
   the theme's own `<slot>Size` value (Toast's avatar, NavigationMenu's
   linkLeadingAvatar) are NOT here — the renderer already reads those.

   Keyed `<theme name>` -> `<slot>` -> props. */
export const HOST = Symbol('host-prop');
const host = (name) => ({ [HOST]: name });
/* the third form: a value the host reads from ITS OWN THEME — NavigationMenu's
   badge takes `ui.linkTrailingBadgeSize()` (:162), a slot whose whole content
   is the size string */
export const THEME = Symbol('theme-slot');
const theme = (slotName) => ({ [THEME]: slotName });

/* `ui` written at the use site: the host overrides SLOT CLASSES of the nested
   component. Six places in the library, found by walking it for `:ui="{`:

     Timeline.vue:78          <UAvatar … :ui="{ icon: 'text-inherit', fallback: 'text-inherit' }">
     Pagination.vue:74        <UButton … :ui="{ label: ui.label() }">
     NavigationMenu.vue:195   <UPopover … :ui="{ content: ui.content(…) }">
     Header.vue:123           <Menu … :ui="{ overlay: …, content: … }">
     DashboardSidebar.vue:140 same pair on its Menu
     CheckboxGroup.vue:128    <UCheckbox … :ui="{ …omit(props.ui, ['root']), …item.ui }">

   The last three pass the HOST's own `ui` down (minus its root), which the
   renderer already does for a mounted child; the three literal ones are here. */
export const USE_SITE = {
  /* Alert.vue:64,164 */
  alert: { actions: { size: 'xs' } },
  /* Banner.vue:36 — the close button's own literals live in CLOSE_PROPS */
  banner: { actions: { color: 'neutral', size: 'xs' } },
  /* Empty.vue:64 */
  empty: { actions: { size: host('size') } },
  /* Toast.vue:99,109 */
  toast: { actions: { size: 'xs', color: host('color') } },
  /* ChatTool.vue */
  'chat-tool': { actions: { size: 'xs' } },
  /* ChatPrompt.vue:99-107 — `<UTextarea variant="none" fixed … :ui="transformUI(
     omit(ui, ['root','body','header','footer']), props.ui)">`. `fixed` is what
     keeps the textarea's `{ fixed: false, size: md }` compound (`md:text-sm`)
     from firing — without it the prompt's text shrank to 14px past the `md`
     breakpoint — and the surviving `base` slot (`px-0`) overrides the
     textarea's own `px-2.5`. */
  'chat-prompt': { body: { fixed: true, ui: { base: theme('base') } } },
  /* The nine places the library draws a list of buttons all write the size at
     the use site, BEFORE `v-bind="link"`, so a link may override it but the
     theme never supplies it:
       PageCTA.vue:67     size="lg"
       PageHero.vue:72    size="xl"
       PageSection.vue:95 size="lg"
       PageHeader.vue:47  no size, only the colour/variant pair */
  'page-header': { links: { color: 'neutral', variant: 'outline' } },
  'page-cta': { links: { size: 'lg' } },
  'page-hero': { links: { size: 'xl' } },
  'page-section': { links: { size: 'lg' } },
  /* User.vue:47,54 — both the avatar and the chip take the host's size */
  user: { avatar: { size: host('size') }, chip: { size: host('size') } },
  /* NavigationMenu.vue:160-168 — the trailing badge is neutral/outline, and its
     size comes from the host's own theme slot `linkTrailingBadgeSize` ("sm"),
     not from the badge's own `md` default */
  'navigation-menu': { linkTrailingBadge: { color: 'neutral', variant: 'outline', size: theme('linkTrailingBadgeSize') } },
  /* Timeline.vue:78 — the indicator's glyph inherits the indicator's colour
     instead of the avatar's own `text-muted` */
  timeline: { indicator: { ui: { icon: 'text-inherit', fallback: 'text-inherit' } } },
  /* SelectMenu.vue:425-437, 96 — `<UInput autofocus autocomplete="off" :size="size"
     v-bind="defu(props.searchInput, { placeholder, variant: 'none', fixed })">`; a
     `searchInput` object is applied over these by SelectMenu itself */
  'select-menu': { input: { autocomplete: 'off', placeholder: 'Search\u2026', variant: 'none', size: host('size'), fixed: host('fixed') } }
};

/* The icon-only slot button each component writes at its use site: the overlays
   ship `ghost`, Banner a `ghost` at a fixed `md`, everything else `link`. */
export const CLOSE_PROPS = {
  modal: { variant: 'ghost' },
  slideover: { variant: 'ghost' },
  drawer: { variant: 'ghost' },
  banner: { variant: 'ghost', color: 'neutral', size: 'md' },
  /* Carousel.vue:221-243 — both arrows are neutral / outline */
  carousel: { variant: 'outline' }
};

/** Resolve one slot's use-site props against the host's own props. */
export function useSiteProps(themeName, slot, props = {}, defaults = {}, ui = null) {
  const spec = (USE_SITE[themeName] || {})[slot];
  if (!spec) return null;
  const resolve = (value) => {
    if (value === null || typeof value !== 'object') return value;
    if (value[THEME] !== undefined) return ui && ui[value[THEME]] ? ui[value[THEME]]() : undefined;
    if (value[HOST] !== undefined) {
      const from = value[HOST];
      return props[from] !== undefined ? props[from] : defaults[from];
    }
    return value;
  };
  const out = {};
  for (const [name, value] of Object.entries(spec)) {
    /* a `ui` written at the use site is a map of slot -> class, and each class
       may itself come from the host's theme (ChatPrompt hands its own `base`
       to the textarea's `base`) */
    if (name === 'ui' && value !== null && typeof value === 'object' && value[THEME] === undefined && value[HOST] === undefined) {
      const nested = {};
      for (const [k, v] of Object.entries(value)) { const r = resolve(v); if (r !== undefined) nested[k] = r; }
      if (Object.keys(nested).length) out.ui = nested;
      continue;
    }
    const r = resolve(value);
    if (r !== undefined) out[name] = r;
  }
  return out;
}

/* Slots whose text falls back to a non-breaking space when there is nothing to
   show. It is not decoration: the character is what gives the line its height,
   and without it the whole control collapses — an empty `placeholder` took
   Select's trigger from 32px to 12.

   Taken from the library, one entry per `?? "\xA0"` in its templates:

     Select.vue:209-213      {{ displayedModelValue ?? (props.placeholder ?? "\xA0") }}
     SelectMenu.vue:391      {{ props.placeholder ?? "\xA0" }}
     Avatar.vue:89           {{ fallback || "\xA0" }}
     Table.vue:85            return "\xA0"
     PricingTable.vue:104    (out of comparison)
     PricingPlan.vue:67      (out of comparison) */
export const NBSP = '\xA0';

const NBSP_SLOTS = {
  select: ['value', 'placeholder'],
  'select-menu': ['value', 'placeholder'],
  avatar: ['fallback'],
  table: ['td']
};

export function nbspSlot(themeName, slot) {
  const slots = NBSP_SLOTS[themeName];
  return !!slots && slots.includes(slot);
}
