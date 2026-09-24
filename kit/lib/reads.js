/* How each component *reads* a variant.

   A theme's boolean variant is keyed "true"/"false", but the value the library
   hands `tv()` is almost never the raw prop — Alert.vue:39 passes
   `!!props.title || !!slots.title`, PageHero.vue:44 passes `!slots.headline`,
   Modal.vue:64 passes `props.overlay` untouched. Feeding the raw prop in means
   `String("Heads up!")` finds no "true" key, the variant never fires, and the
   description loses its `mt-1`.

   Each entry below is the form taken from the library source, with the file and
   line it came from. There is deliberately no blanket `!!` rule: the forms
   genuinely differ, and coercing every boolean variant would break the six rows
   marked `raw` / `inverted` / `off`.

   Forms
     slot      `!!props.x || !!slots.x` — in this kit a named slot IS a prop, so
               one truthiness test covers both
     truthy    `!!props.x`
     inverted  `!slots.x` — a filled slot switches the variant OFF, and a value
               passed as a plain prop does NOT fill the slot. The two channels
               are distinguishable here: content that arrived through a slot is
               marked (see `isSlotMark`), anything else is a prop
     raw       the value goes to tv() as-is, no `!!`
     off       computed from a node's index in a repeated list, not from a prop
     offStatic a runtime pointer gate — false on any static render
     drop      the key is never passed; the component sees undefined
     icons     leading/trailing come from useComponentIcons, not from the prop
               (the renderer computes these itself) */
const SLOT = 'slot', TRUTHY = 'truthy', INVERTED = 'inverted', RAW = 'raw', OFF = 'off', DROP = 'drop', ICONS = 'icons';
/* a variant the library gates on a runtime pointer position — always false on a
   static render, however the prop is set */
const OFF_STATIC = 'offStatic';

export const READS = {
  alert: { title: SLOT },                                  // Alert.vue:39
  toast: { title: SLOT },                                  // Toast.vue:46
  /* PageCard.vue:44 gates the `spotlight` variant on `elementX/elementY !== 0`,
     but useMouseInElement runs update() on mount with the pointer at (0, 0), so
     both are the card's negated page offset — non-zero for any card not at the
     page origin. The variant follows the prop; PageCard.jsx sets the offsets. */
  'page-card': { title: SLOT },                            // PageCard.vue:57 / :44,77,80
  'page-cta': { title: SLOT },                             // PageCTA.vue:33
  'page-feature': { title: SLOT },                         // PageFeature.vue:34
  'page-header': { title: SLOT },                          // PageHeader.vue:25
  'page-hero': { title: SLOT, headline: INVERTED },        // PageHero.vue:32 / :44
  'page-section': {                                        // PageSection.vue:36-38, :56
    title: SLOT, description: SLOT, body: SLOT, headline: INVERTED
  },
  'chat-message': { leading: SLOT, actions: SLOT },         // ChatMessage.vue:43-44
  page: { left: SLOT, right: SLOT },                        // Page.vue:19-20,26-27
  'blog-post': { image: TRUTHY },                           // BlogPost.vue:46
  'input-number': {                                         // InputNumber.vue:75-76
    increment: 'inputNumberIncrement', decrement: 'inputNumberDecrement'
  },
  modal: { overlay: RAW },                                  // Modal.vue:64,165
  table: { loading: RAW },                                  // Table.vue:96
  input: { leading: ICONS, trailing: ICONS },
  'input-date': { leading: ICONS, trailing: ICONS },
  'input-menu': { leading: ICONS, trailing: ICONS },
  'input-tags': { leading: ICONS, trailing: ICONS },
  'input-time': { leading: ICONS, trailing: ICONS },
  select: { leading: ICONS, trailing: ICONS },
  'select-menu': { leading: ICONS, trailing: ICONS },
  textarea: { leading: ICONS, trailing: ICONS }
};

/** Sentinel: this key must not be passed to tv() at all. */
export const OMIT = Symbol('omit');

/* Content that came in through a slot rather than as a plain prop carries a
   `$slotMark` — directly, or on a React element's props. `!slots.x` variants
   turn OFF for it and ON for an ordinary prop value. */
function isSlotMark(v) {
  if (v === null || typeof v !== 'object') return false;
  if ('$slotMark' in v) return true;
  return !!(v.props && typeof v.props === 'object' && '$slotMark' in v.props);
}

/**
 * The value `tv()` should receive for one variant key.
 * `computed` carries values the renderer works out itself (leading/trailing
 * from the icon props, a repeated node's index).
 */
export function readVariant(themeName, key, props, computed = {}) {
  const form = (READS[themeName] || {})[key];
  if (!form) return props[key];
  switch (form) {
    case SLOT:
    case TRUTHY:
      return !!props[key];
    case INVERTED:
      /* `!slots.x`: a slot-delivered value switches the variant off, a prop
         value (or nothing) leaves it on */
      return !isSlotMark(props[key]);
    case RAW:
      return props[key];
    case OFF_STATIC:
      return false;
    case DROP:
      return OMIT;
    case OFF:
      return computed.index === undefined ? OMIT : computed.index > 0;
    case ICONS:
      return computed[key];
    /* both InputNumber buttons are read through the orientation
       (InputNumber.vue:75-76): vertically the increment button stands for the
       pair and the decrement one is never rendered on its own */
    case 'inputNumberIncrement':
      return props.orientation === 'vertical'
        ? (!!props.increment || !!props.decrement) : !!props.increment;
    case 'inputNumberDecrement':
      return props.orientation === 'vertical' ? false : !!props.decrement;
    default:
      return props[key];
  }
}

export function hasRead(themeName, key) {
  return !!(READS[themeName] || {})[key];
}
