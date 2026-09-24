/* Generic Nuxt UI component renderer.

   Every component in this design system is (theme literal) + (DOM tree
   extracted from the library's Vue SFC template). This module turns that pair
   into a React component:

     - the theme literal is resolved by lib/tv.js -> exact Tailwind classes
       from themes/<name>.ts, including compoundVariants and defaultVariants;
     - the tree reproduces the library's DOM: same element nesting, same
       data-slot attributes, so slot classes land on the same nodes.

   What lived in each SFC's <script setup> rather than in the DOM is supplied
   here: defineProps defaults (lib/defaults.js), appConfig.ui.icons defaults
   (lib/icons.js), the leading/trailing booleans Nuxt UI computes from
   icon/loading/trailing props, and Vue's <component :is> /
   DefineTemplate + ReuseTemplate indirection.

   Content model (mirrors Nuxt UI's named Vue slots): every slot name is a
   prop that accepts arbitrary React children — <Card header={…} footer={…}>.
   `children` goes to the component's main content slot. List components take
   `items`. Overlay open/closed state is a prop (`open`), never behaviour. */
import React from 'react';
import { tv, tvr, twMerge, extractVarClasses } from './tv.js';
import { renderIcon } from './iconify.jsx';
import { propDefaults } from './defaults.js';
import { useSiteProps, CLOSE_PROPS, nbspSlot, NBSP } from './use-site.js';
import { defaultIcon } from './icons.js';
import { ICONS as ICON_MAP } from './icons.js';
import { lookup } from './registry.js';
import { CHILD_THEMES, childPaintSlots } from './child-themes.js';
import { localizeFixed } from './portal.jsx';
/* A reka primitive with no `data-slot` of its own is an `as-child` wrapper:
   the primitive hands its behaviour to its single child and renders NO element
   (`<ToastClose as-child><UButton data-slot="close" /></ToastClose>`,
   Toast.vue:114 — 55 such places in 23 files). Drawn as a div it added a
   slotless, classless box that still inherited `font-size: 16px`, so the close
   button's parent measured 20x26 instead of 20x20 and the toast 58 instead of
   52. The kit component tags (`U…`) are NOT this: those really are elements. */
const AS_CHILD = (node) => !node.s && /^[A-Z][A-Za-z]*$/.test(node.t || '') && !/^U[A-Z]/.test(node.t || '')
  && node.t !== 'Primitive' && !/^(Define|Reuse)/.test(node.t) && !/(Portal|Provider|Root|Viewport|Content|Overlay|Wrapper)$/.test(node.t)
  && !!(node.c && node.c.length);

const TRANSPARENT = new Set(['slot', 'template', 'ClientOnly', 'Transition', 'TransitionGroup', 'Teleport', 'Slot', 'FieldGroupReset',
  /* reka's Anchor is rendered `as-child` (InputMenu.vue:212): it is the wrapper
     around the real input, not an element of its own — drawn as a div it made a
     second `base` node and doubled every input-menu row's height */
  'Component.Anchor', 'ComboboxAnchor', 'PopoverAnchor']);
/* named text slots — `children` must never land inside one of these, or a
   component's default content ends up nested in its own <label> */
const NEVER_CHILDREN = new Set(['label', 'labelWrapper', 'hint', 'description', 'title', 'error', 'help', 'legend', 'caption']);
/* the slot a component's unnamed <slot /> sits in, when it has a named one */
const CHILD_SLOT_ORDER = ['body', 'content', 'default', 'text'];
/* slots that describe the single current value, never one node per item */
const SINGLE_SLOTS = new Set(['value']);
/* the slot each kit component paints itself — the renderer must never satisfy
   it by mounting that same component (Avatar's `image` is an <img>, not an
   Avatar; Chip's `base` is the dot itself) */
const OWN_SLOT = { avatar: 'image', chip: 'base' };
/* A slot whose value may be an *object of props* rather than content: in Nuxt UI
   `:close="{ color: 'primary' }"`, `:actions="[{ label: 'Action' }]"`,
   `:links="[...]"`, `:authors="[...]"` configure the component that slot paints.
   Which component that is comes from the extracted tree when the slot node is
   the component itself (`{"t":"UButton","s":"close"}`); when the node is the
   plain wrapper the v-for lived in (`{"t":"div","s":"actions"}`), the slot name
   names it. */
const NODE_COMPONENT = { UButton: 'Button', UAvatar: 'Avatar', UBadge: 'Badge', UUser: 'User', ULink: 'Link', UKbd: 'Kbd', UIcon: 'Icon' };
const SLOT_COMPONENT = {
  close: 'Button', actions: 'Button', links: 'Button', button: 'Button', buttons: 'Button',
  increment: 'Button', decrement: 'Button', submit: 'Button', cancel: 'Button',
  /* a tier's call to action is a button configured by the tier's own object */
  tierButton: 'Button',
  authors: 'User', users: 'User', badge: 'Badge', badges: 'Badge', avatar: 'Avatar', kbds: 'Kbd'
};
/* the prop a bare string fills when a slot holds an array of primitives:
   `kbds={['meta','k']}` is one Kbd per key, not the literal text */
const PRIMITIVE_PROP = { Kbd: 'value', Button: 'label', Badge: 'label', Icon: 'name' };
/* The two components whose icon is drawn by their avatar, not by an icon node:
   Timeline.vue:31 (`<UAvatar :icon="item.icon">` as the indicator) and
   Empty.vue:24. Everyone else keeps icon and avatar separate. */
const ICON_THROUGH_AVATAR = new Set(['timeline', 'empty', 'file-upload']);

/* props the renderer consumes itself — they must never reach the DOM */const CONSUMED = new Set(['ui', 'class', 'className', 'children', 'items', 'open', 'icon', 'leadingIcon', 'trailingIcon', 'avatar', 'leadingAvatar', 'trailingAvatar', 'text', 'src', 'alt', 'to', 'as', 'loading', 'trailing', 'leading', 'placeholder', 'modelValue', 'defaultValue', 'valueKey', 'labelKey', 'descriptionKey', 'portal', 'content',
  /* renderer-internal item state: the per-item `active`/`selected` flags the
     for-branch writes onto its item are spread into a mounted child's props,
     and a hand-written child forwards whatever it does not destructure to the
     DOM — React then warns "Received true for a non-boolean attribute active".
     They are still read as variants (variant keys are filtered separately). */
  'active', 'selected',
  /* names the slot that carries the open overlay's focus ring — read by the
     renderer, never an attribute */
  'focusSlot', 'stackHeights',
  /* panel/sidebar sizing: read into the `--width` variable, never an attribute */
  'defaultSize', 'unit',
  /* anchored-panel geometry: read into the portal's own style, never attributes */
  'sideOffset', 'collisionPadding']);

/* React renders strings and numbers; an object in an attribute becomes the
   literal "[object Object]", so only primitives and handlers pass through. */
function domSafe(key, value) {
  if (value === undefined || value === null) return false;
  if (key === 'style') return typeof value === 'object';
  if (typeof value === 'function') return /^on[A-Z]/.test(key);
  if (typeof value === 'object') return false;
  if (/^(data|aria)-/.test(key)) return true;
  return /^(id|role|href|target|rel|name|type|tabIndex|title|lang|dir|scope|colSpan|rowSpan|htmlFor|download|hidden)$/.test(key);
}
/* <component :is> resolves to these tags when the slot tells us what it is */
const COMPONENT_TAG = { label: 'label', link: 'a', childLink: 'a', item: 'div', linkTrailing: 'span', viewport: 'div' };

/* A child component in a tree (`{"t":"UContainer","s":"container"}`) paints its
   own theme *and* the class the wrapper hands it — Container.vue does exactly
   `ui({ class: [props.ui?.base, props.class] })`. Without this a Header's
   container loses `max-w-(--ui-container) mx-auto px-4` and the page runs edge
   to edge; a NavigationMenu badge loses everything but `shrink-0`. Generic by
   node type, so no branch per component name. */
const childCache = new Map();
function childClasses(nodeType, callProps) {
  const entry = CHILD_THEMES[nodeType];
  if (!entry) return null;
  const key = nodeType + '|' + JSON.stringify(callProps || {});
  if (childCache.has(key)) return childCache.get(key);
  const ui = tvr(entry.name, entry.theme)(callProps || {});
  const paint = childPaintSlots(entry.theme, nodeType);
  const cls = paint ? twMerge(paint.map((s) => ui.$slot(s))) : ui[ui.$primary]();
  childCache.set(key, cls);
  return cls;
}

/* reka's popper sets --reka-<name>-content-transform-origin on the floating
   panel, derived from the side it ended up on; the themes read it through
   `origin-(--reka-…-content-transform-origin)`. Undefined, that transform-origin
   is invalid at computed-value time — the same failure the tabs indicator had.
   reka's own default side is "bottom" for panels and "top" for a tooltip. */
const SIDE_ORIGIN = { top: 'center bottom', bottom: 'center top', left: 'right center', right: 'left center' };
const DEFAULT_SIDE = { tooltip: 'top' };

function originVars(cls, themeName, props) {
  if (!cls || !cls.includes('-content-transform-origin)')) return null;
  const side = props.side || DEFAULT_SIDE[themeName] || 'bottom';
  const style = {};
  for (const m of cls.matchAll(/\(--(reka-[\w-]+-content-transform-origin)\)/g)) {
    style['--' + m[1]] = SIDE_ORIGIN[side] || SIDE_ORIGIN.bottom;
  }
  return Object.keys(style).length ? style : null;
}

function mapTag(t, props, slot, isRoot) {
  if (/^(div|span|p|a|ul|ol|li|button|input|textarea|label|nav|header|footer|main|aside|section|article|table|thead|tbody|tfoot|tr|th|td|form|img|svg|h1|h2|h3|h4|h5|h6|pre|code|kbd|hr|br|dl|dt|dd|figure|figcaption|caption|colgroup|col|iframe|video|time|address|blockquote|cite|small|strong|em|mark|progress|meter|details|summary|fieldset|legend|option|select)$/.test(t)) return t;
  if (t === 'component') {
    if (isRoot && props && props.as) return props.as;
    return (slot && COMPONENT_TAG[slot]) || 'div';
  }
  /* a button must be a <button>, or it is neither focusable nor keyboard-operable */
  if (/^U?Button$/.test(t)) return props && props.to ? 'a' : 'button';
  if (/Link(Base)?$/.test(t)) return props && props.to ? 'a' : 'div';
  if (/(Trigger|CloseButton)$/.test(t)) return 'button';
  if (/Input$/.test(t) && t !== 'PinInput') return 'input';
  if (/Textarea$/.test(t)) return 'textarea';
  /* reka's *GroupLabel primitives declare `as: { default: "div" }`
     (ListboxGroupLabel.js), and no use site overrides it — a group heading is a
     block, not a form label. Drawn as `label` it stayed inline and shrank to
     its text (35px wide instead of the palette's full 760). A bare `Label`
     (FormField.vue) really is a `<label>`. */
  if (/GroupLabel$/.test(t)) return 'div';
  if (/Label$/.test(t)) return 'label';
  if (/(List|Group)$/.test(t)) return 'div';
  return 'div';
}

/* bytes as the library prints them (FileUpload.vue:118 uses the same 1024-step
   scale) */
function formatBytes(n) {
  if (!n && n !== 0) return undefined;
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let i = 0, v = Number(n);
  while (v >= 1024 && i < units.length - 1) { v /= 1024; i++; }
  return (i === 0 ? v : Math.round(v * 10) / 10) + ' ' + units[i];
}

const ITEM_FIELD = {  label: (it) => it.label, title: (it) => it.title ?? it.label, description: (it) => it.description,
  leadingIcon: (it) => it.icon, icon: (it) => it.icon, trailingIcon: (it) => it.trailingIcon,
  trailingBadge: (it) => it.badge, content: (it) => it.content ?? it.children,
  value: (it) => it.value, avatar: (it) => it.avatar, kbds: (it) => it.kbds,
  /* link/item slot families: the slot name is prefixed, the item field is not */
  linkLabel: (it) => it.label, linkLeadingIcon: (it) => it.icon, linkTrailingIcon: (it) => it.trailingIcon,
  linkTrailingBadge: (it) => it.badge, linkDescription: (it) => it.description,
  childLinkLabel: (it) => it.label, childLinkIcon: (it) => it.icon, childLinkDescription: (it) => it.description,
  childLabel: (it) => it.label,
  itemLabel: (it) => it.label, itemLeadingIcon: (it) => it.icon, itemDescription: (it) => it.description,
  itemTrailingIcon: (it) => it.trailingIcon, itemText: (it) => it.text ?? it.label,
  /* PricingTable's tier family (PricingTable.vue:64-116): same rule, `tier`
     prefix — without these the price, discount and billing lines rendered as
     empty gated nodes and the whole price block came out blank */
  tierTitle: (it) => it.title, tierDescription: (it) => it.description,
  tierPrice: (it) => it.price, tierDiscount: (it) => it.discount,
  tierBadge: (it) => it.badge, tierButton: (it) => it.button,
  tierBillingPeriod: (it) => it.billingPeriod, tierBillingCycle: (it) => it.billingCycle,
  tierFeatureIcon: (it) => it.icon,
  /* a feature line is titled by the item itself — the plans pass plain strings.
     Only the *Title slots: the `feature` wrapper holding them must stay empty,
     or the text prints twice (once bare in the <li>, once in its span). */
  featureTitle: (it) => it.title ?? it.label, tierFeatureTitle: (it) => it.title ?? it.label,
  /* a file row is named and sized by the File it stands for (FileUpload.vue:150
     prints `file.name` and a formatted `file.size`) */
  fileName: (it) => it.name ?? it.label,
  fileSize: (it) => (typeof it.size === 'number' ? formatBytes(it.size) : it.size),
  /* a section's own heading row */
  sectionTitle: (it) => it.title ?? it.label
};

function itemContent(slot, item) {
  /* a primitive item IS its own text for the slots that carry a line's text */
  if (item === null || typeof item !== 'object') return /^(label|linkLabel|itemLabel|itemText|featureTitle|tierFeatureTitle)$/.test(slot) ? item : undefined;
  const f = ITEM_FIELD[slot];
  if (f) return f(item);
  return item[slot];
}

/* Vue's DefineTemplate / ReuseTemplate pair: pull the bodies out of the tree
   and keep them keyed by name so Reuse* nodes render the real markup. */
function collectDefines(nodes, defines) {
  const out = [];
  for (const n of nodes || []) {
    const m = /^Define(\w+)Template$/.exec(n.t);
    if (m) { defines[m[1]] = collectDefines(n.c || [], defines); continue; }
    out.push(n.c ? { ...n, c: collectDefines(n.c, defines) } : n);
  }
  return out;
}

function subtreeSlots(node, acc = []) {
  if (node.s) acc.push(node.s);
  for (const c of node.c || []) subtreeSlots(c, acc);
  return acc;
}

function hasNestedFor(node) {
  for (const c of node.c || []) { if (c.for || hasNestedFor(c)) return true; }
  return false;
}

/* Where a component's `children` go: the template's unnamed <slot /> — an empty
   `slot` node, since a named slot always carries its fallback content. Failing
   that, the first element with no data-slot, which is the container the unnamed
   slot sits in; never a named text slot. */
function markChildAnchor(nodes) {
  let done = false;
  const pass = (list, test) => list.map((n) => {
    if (done) return n;
    if (test(n)) { done = true; return { ...n, _kids: 1 }; }
    const c = n.c && !NEVER_CHILDREN.has(n.s) ? pass(n.c, test) : n.c;
    return c === n.c ? n : { ...n, c };
  });
  let out = pass(nodes, (n) => n.t === 'slot' && !n.c);
  if (!done) out = pass(nodes, (n) => !n.s && !TRANSPARENT.has(n.t) && !/^Define|^Reuse/.test(n.t));
  return done ? out : null;
}

export function createRenderer(themeName, theme, tree, options = {}) {
  const resolve = tvr(themeName, theme);
  /* `Avatar` from `avatar`, `NavigationMenu` from `navigation-menu` — stamped on
     the root so a node can be attributed to its own theme. Without it a nested
     component's slot is indistinguishable from the outer one's: the first
     data-slot="icon" inside an Alert belongs to its close Button. */
  const componentName = options.componentName
    || themeName.split('-').map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join('');
  const variants = theme.variants || {};
  const slotNames = Object.keys(theme.slots || {});
  const defaults = propDefaults(themeName);
  const hostSlotUi = options.hostSlot ? tv(options.hostSlot.theme)({}) : null;
  const defines = {};
  const roots = collectDefines(tree, defines);
  const reused = JSON.stringify(tree).match(/Reuse(\w+)Template/g) || [];
  /* a DefineTemplate whose ReuseTemplate was lost when the DOM was extracted
     (Modal's content lives in one) still has to render — it is appended inside
     the root, after the overlay, which is where the portal puts it. */
  const orphanDefines = Object.keys(defines).filter((n) => !reused.includes('Reuse' + n + 'Template'));
  const treeSlots = [];
  (function collect(nodes) { for (const n of nodes || []) { if (n.s) treeSlots.push(n.s); collect(n.c); } })(roots);
  /* Slots that already get drawn somewhere. `treeSlots` alone is not that set:
     collectDefines strips every Define…Template body out of `roots`, so the 24
     correctly-nested linkLabels NavigationMenu draws through its reused Item
     template are invisible to it — and the Link define then looked lost and was
     inlined a second time at top level. Reused defines can Reuse one another, so
     walk them transitively. */
  const drawnSlots = new Set(treeSlots);
  {
    const seen = new Set();
    const add = (name) => {
      if (seen.has(name) || !defines[name]) return;
      seen.add(name);
      (function collect(nodes) {
        for (const n of nodes || []) {
          if (n.s) drawnSlots.add(n.s);
          const reuse = /^Reuse(\w+)Template$/.exec(n.t);
          if (reuse) add(reuse[1]);
          collect(n.c);
        }
      })(defines[name]);
    };
    for (const name of Object.keys(defines)) if (!orphanDefines.includes(name)) add(name);
  }
  const anchored = options.childSlot ? null : markChildAnchor(roots);
  const body = anchored || roots;
  /* the slot a host's children go into may live inside a Define…Template, whose
     body collectDefines has already moved out of `roots` — searching `treeSlots`
     alone answered `null` for Sidebar's `body`, and the children fell into the
     root as a sibling of `inner` instead (165 + 160 against the library's one
     325-tall child). Same correction `drawnSlots` makes below. */
  const allTreeSlots = treeSlots.slice();
  for (const bodyNodes of Object.values(defines)) {
    (function collect(nodes) { for (const n of nodes || []) { if (n.s) allTreeSlots.push(n.s); collect(n.c); } })(bodyNodes);
  }
  /* `childAnchor` says the tree's own bare `<slot />` is where children go, so the
     "first named slot" guess is off: PageCard.vue:115 puts one directly in
     `container` after `wrapper` closes, and the guess (`body`) put the card's
     image above its own title. Opt-in, because in trees where the anchor renders
     nothing the guess is the only thing that places children at all. */
  const childSlot = (options.childSlot === false || (options.childAnchor && anchored)) ? null
    : (options.childSlot || CHILD_SLOT_ORDER.find((s) => allTreeSlots.includes(s)) || null);
  /* A theme whose `base` slot no node in the tree carries: extraction lost the
     painting element, and with it every size variant's padding, ring and
     background (InputTags came out as a 24px line at every size). The theme is
     the truth, so those classes go on the root — the same "root is layout, base
     is paint" recovery PAINT_SLOTS does for nested components. */
  /* a component whose portal is anchored under its trigger needs its own root to
     be the containing block: without one, `top:100%` and `width:100%` resolved
     against the document and SelectMenu's panel came out 924px wide, spanning
     the whole card */
  const anchorsPortal = (function scan(nodes) {
    for (const n of nodes || []) {
      if (/Portal$/.test(n.t) && n.c && n.c.length) {
        const overlayInside = (function look(ns) {
          for (const x of ns || []) { if (x.s === 'overlay' || look(x.c)) return true; }
          return false;
        })(n.c);
        if (!overlayInside) return true;
      }
      if (scan(n.c)) return true;
    }
    return false;
  })(tree);
  const portalTarget = anchorsPortal ? (treeSlots.includes('base') ? 'base' : 'root') : null;
  const paintOnRoot = (theme.slots || {}).base !== undefined && !treeSlots.includes('base');
  /* a define named for several slots is recursive only when its own body can
     re-enter one of them (Tree's item holds the `listWithChildren` it goes into);
     otherwise the several names are alternatives and it is inserted once */
  const recursiveDefines = new Set();
  for (const [name, target] of Object.entries(options.inlineDefineInto || {})) {
    if (!Array.isArray(target)) continue;
    const own = [];
    (function collect(nodes) { for (const n of nodes || []) { if (n.s) own.push(n.s); collect(n.c); } })(defines[name]);
    if (target.some((t) => own.includes(t))) recursiveDefines.add(name);
  }

  return function render(props) {
    const { ui: uiProp = {}, class: className, className: classNameAlt, children, items, open, ...rest } = props;
    /* a function child IS the library's scoped slot: called once per repeated
       item, never placed as an element */
    const itemRender = typeof children === 'function' ? children : null;
    /* every Nuxt UI component with a value is controlled through modelValue (or
       defaultValue); the docs' examples are written that way. Ignoring it left
       Select's value slot empty, Textarea's box blank and Progress stuck on the
       indeterminate animation. */
    const model = props.modelValue !== undefined ? props.modelValue : props.defaultValue;
    /* an item is selected when the model names it, which is how the library
       marks the chosen row of a Select / Listbox / menu / tree. Reka falls back
       to the item's INDEX when the item has no value of its own, and the model
       may name the item by OBJECT rather than by value
       (`default-value="{ label: 'Label' }"` is how Tree marks its chosen row). */
    const itemPick = (item, i) => {
      if (!item || typeof item !== 'object' || model === undefined) return { picked: false, sel: item && item.selected };
      const idKey = (props.valueKey || defaults.valueKey || 'value');
      const labelKey = (props.labelKey || defaults.labelKey || 'label');
      const ident = item[idKey] !== undefined ? item[idKey] : (item.value !== undefined ? item.value : String(i));
      const same = (v) => (v !== null && typeof v === 'object')
        ? ((v[labelKey] !== undefined && v[labelKey] === item[labelKey]) || (v[idKey] !== undefined && v[idKey] === item[idKey]))
        : (v === ident || String(v) === String(ident) || v === item.value || v === item.label);
      const picked = (Array.isArray(model) ? model : [model]).some(same);
      return { picked, sel: item.selected !== undefined ? item.selected : (picked || undefined) };
    };
    const variantProps = {};
    /* `itemOnlyVariants`: keys the library's root tv() call never receives —
       each item computes them itself (`itemVariants`), so a same-named prop on
       the component must not reach the items' classes */
    const itemOnly = options.itemOnlyVariants || [];
    for (const k of Object.keys(variants)) {
      if (itemOnly.includes(k)) continue;
      if (props[k] !== undefined) variantProps[k] = props[k];
      else if (defaults[k] !== undefined) variantProps[k] = defaults[k];
    }
    /* leading / trailing come from useComponentIcons (useComponentIcons.js:5-11),
       not from a prop: the variant is on when an icon will actually be rendered,
       and `loading` counts as one — `<UButton loading>` is a button with a
       spinner. An explicit `trailing={false}` hides the chevron, so the space
       reserved for it (`pe-9`) must go too; InputNumber hides its leading button
       when it is laid out vertically. */
    const hasIcon = !!props.icon, wantsTrailing = props.trailing === true, loading = !!props.loading;
    /* an element in `leading`/`trailing` is that slot's content and turns its
       variant on — the space it needs (`pe-9`) has to be reserved for it */
    const leadEl = React.isValidElement(props.leading), trailEl = React.isValidElement(props.trailing);
    let lead = leadEl || (hasIcon && (props.leading === true || !wantsTrailing)) || (loading && !wantsTrailing) || !!props.leadingIcon || !!props.avatar || !!props.leadingAvatar;
    let trail = props.trailing === false ? false
      : (trailEl || (hasIcon && wantsTrailing) || (loading && wantsTrailing) || !!props.trailingIcon || !!defaultIcon(themeName, 'trailingIcon'));
    if (themeName === 'input-number' && variantProps.orientation === 'vertical') lead = false;
    /* the spinner replaces whichever icon is showing (Button.vue:145 reads
       loadingIconName first) */
    const loadingIconName = loading ? (props.loadingIcon || ICON_MAP.loading) : null;
    const computed = { leading: lead, trailing: trail, loadingIcon: loadingIconName };
    if (variants.leading) variantProps.leading = lead;
    if (variants.trailing) variantProps.trailing = trail;
    /* variants reka decides at runtime (Tree's `selected` comes from TreeItem):
       a static render always resolves them the same way */
    if (options.variantOverrides) Object.assign(variantProps, options.variantOverrides);
    const baseUi = resolve(variantProps, computed);
    /* `primarySeen` is per render, but root-ness is per subtree: an overlay
       declares overlay *and* content as siblings, and each is the root of its
       own subtree. Every such root is stamped with the component marker; only
       the first one also takes the caller's class and passthrough props. */
    let primarySeen = false;
    /* slot names already filled in this render — see the duplicate-branch note
       where content is read */
    const renderedSlots = new Set();
    /* slot names already emitted as an ELEMENT — a later v-if branch of the same
       element is spent (see the gate where node.if is read) */
    const emittedSlots = new Set();
    /* slots the library renders into ANOTHER container than the one they sit in
       in the extracted tree: NavigationMenu's per-item content panels live in
       the positioned viewport after the list, not inside the item — emitted in
       place, their `absolute top-0 start-0` painted them over the triggers */
    const stashed = [];
    /* a define named for SEVERAL possible slots goes into the first of them that
       renders (Sidebar's two root branches), not into each */
    const usedInto = new Set();
    /* a define whose address the component itself refused for these props
       (Modal's content belongs beside the overlay unless `scrollable`) — it then
       falls to the orphan path, unlike one whose target simply did not render.
       A refusal at ONE address says nothing when another accepted it:
       PricingPlan addresses its price block to `body` or `footer` by
       orientation, so the unused address was refused every render and the block
       was ALSO inlined as an orphan — once per feature, four copies of five
       slots. */
    const intoRefused = new Set();

    const walk = (node, key, ctx) => {
      /* v-if wrappers that are components, not slots (UPopover / UTooltip
         branches): whether they exist is script state, not content */
      if (options.nodeFilter && options.nodeFilter(node, { props, item: ctx.item, index: ctx.index, count: ctx.count, open }) === false) return null;
      const reuse = /^Reuse(\w+)Template$/.exec(node.t);

      // repeat over items — before anything else, `for` also sits on <template>
      if (node.for) {
        /* some `for` loops are not over items at all: Marquee duplicates its
           content div `repeat` times, each copy holding the same children, and
           that duplication is what makes the scroll seamless */
        if (options.repeatSlot && options.repeatSlot === node.s) {
          const n = Math.max(1, Number(props[options.repeatProp || 'repeat'] ?? defaults[options.repeatProp || 'repeat'] ?? 4));
          return React.createElement(React.Fragment, { key },
            ...Array.from({ length: n }, (_, i) => walk({ ...node, for: 0 }, `${key}.${i}`, { ...ctx, copy: i })).filter(Boolean));
        }
        let list;
        if (ctx.item) list = Array.isArray(ctx.item) ? ctx.item : (ctx.item.children || ctx.item.items || []);
        else list = ctx.items || [];
        /* A component whose tree nests several loops over DIFFERENT data cannot
           be served by one `items`: PricingTable's tbody iterates sections, the
           row inside it iterates that section's features, and the cells iterate
           tiers. `listFor` lets the component answer per loop; anything it does
           not answer keeps the default above. */
        let explicitList = false;
        if (options.listFor) {
          const picked = options.listFor(node, { props, item: ctx.item, items: ctx.items, slots: subtreeSlots(node) });
          if (Array.isArray(picked)) { list = picked; explicitList = true; }
        }
        const inSubtree = subtreeSlots(node);
        /* A `for` whose subtree holds only single-value slots is usually not a
           repetition at all (one avatar, one label) — but only while there is
           nothing to repeat over: BlogPost's author loop is exactly this shape,
           and taking the shortcut with a real list rendered one avatar with no
           item in context, so every author disappeared. A list the component
           named itself is never collapsed: PricingTable's single section row
           collapsed this way, and its features then had no section in context. */
        if (!explicitList && list.length <= 1 && inSubtree.length && inSubtree.every((s) => SINGLE_SLOTS.has(s))) {
          return walk({ ...node, for: 0 }, key, ctx);
        }
        /* an outer loop that contains another loop iterates *groups*
           (NavigationMenuItem[][], SelectItem[][]); a flat array is one group.
           A `group` slot says the same thing on its own: Listbox's ListboxGroup
           carries the group, and its item template was extracted into a Define,
           so there is no nested `for` left to detect — one group per item gave
           108 groups against the library's 21.

           Not when the component named the list itself: CommandPalette's
           `listFor` hands over real groups, and wrapping them made one group
           holding the first group's items (group 1, item 2 against 2 and 5). */
        if (!explicitList && !ctx.item && (hasNestedFor(node) || node.s === 'group') && list.length && !Array.isArray(list[0])) list = [list];
        const count = list.length;
        return React.createElement(React.Fragment, { key },
          list.map((item, i) => {
            /* an item is selected when the model names it, which is how the
               library marks the chosen row of a Select / Listbox / menu.
               Reka falls back to the item's INDEX when the item has no value of
               its own — that is how `default-value="1"` marks the second tab and
               the second timeline step; matching on value alone left Tabs with
               no active node, no indicator and one content panel. */
            const { picked, sel } = itemPick(item, i);
            /* the model's pick is also the ACTIVE item: reka puts
               `data-state="active"` on the chosen TabsTrigger and marks the
               timeline step reached, and the theme's `active` variant hangs off
               the same thing */
            const act = item && item.active !== undefined ? item.active : (picked || undefined);
            const ownV = options.itemVariants && !Array.isArray(item) ? options.itemVariants(item, { index: i, count, props }) : null;
            const itemUi = resolve({ ...variantProps, ...(act !== undefined ? { active: act } : {}), ...(item && item.disabled !== undefined ? { disabled: item.disabled } : {}), ...(sel !== undefined ? { selected: sel } : {}), ...(ownV || {}), ...(options.variantOverrides || {}) }, { ...computed, index: i });
            const withState = item && typeof item === 'object' && (sel !== undefined || act !== undefined)
              ? { ...item, ...(sel !== undefined ? { selected: sel } : {}), ...(act !== undefined ? { active: act } : {}) }
              : item;
            return walk({ ...node, for: 0 }, `${key}.${i}`, { ...ctx, ui: itemUi, parentItem: ctx.item, item: withState, index: i, count });
          }).filter(Boolean));
      }

      if (reuse) {
        /* an item template reuses itself for nested children — stop when the
           nesting runs deeper than any real item tree does */
        const depth = (ctx.depth || 0) + 1;
        if (depth > 3) return null;
        ctx = { ...ctx, depth };
        let body = defines[reuse[1]] || [];
        if (node.s && body.length === 1 && !body[0].s) body = [{ ...body[0], s: node.s }];
        const kids = body.map((c, i) => walk(c, `${key}.${i}`, ctx)).filter(Boolean);
        return kids.length ? React.createElement(React.Fragment, { key }, ...kids) : null;
      }

      /* a slotless reka `*Input` wrapper rendered `as-child` (ComboboxInput
         around SelectMenu's UInput) is a passthrough too — and it MUST be one:
         mapTag sends anything ending in `Input` to the void tag <input>, which
         cannot hold children, so the real UInput it wraps was discarded and the
         search field came out as a classless 23px box with no `input` slot. */
      /* reka positions portal content with floating-ui inline styles at runtime.
         Rendered as an ordinary child it became a flex ITEM of the field:
         InputMenu's 192px row had to hold a 63px panel too, which collapsed the
         input to 46px, overlapped the trailing button, and made the panel's
         `w-(--reka-*-trigger-width, 100%)` resolve against a 63px auto-width
         wrapper instead of the trigger. So a `*Portal` node is an overlay
         anchored under the trigger — the artboard equivalent of that runtime
         positioning. */
      if (/Portal$/.test(node.t) && node.c && node.c.length) {
        /* …except a portal whose content positions ITSELF against the artboard:
           Modal, Slideover and Drawer do it with an `overlay`, and Toaster with
           its `viewport` (`fixed bottom-4 right-4`). Wrapping those in the
           anchored box made the box their containing block — a zero-sized one at
           the trigger's origin, so a bottom-anchored toast stack resolved
           `bottom-4` against nothing and landed 184px ABOVE the frame. */
        const hasOverlay = (function look(ns) {
          for (const n of ns || []) { if (n.s === 'overlay' || look(n.c)) return true; }
          return false;
        })(node.c)
          /* a viewport that IS the portal's own child is the self-positioning
             case (Toaster); the `viewport` deeper inside a menu's `content` is a
             scroll box and still wants the anchored wrapper */
          || (node.c || []).some((n) => n.s === 'viewport');
        if (!hasOverlay) {
          const kids = (node.c || []).map((ch, i) => walk(ch, `${key}.${i}`, ctx)).filter(Boolean);
          if (!kids.length) return null;
          /* absolute, anchored under the trigger — and the element that PARENTS
             this wrapper is marked `position: relative` below, which is the part
             that was missing: without it the percentages resolved against the
             initial containing block (a 924px panel), and in flow the wrapper
             became a flex item of the field's own inline-flex row (a 63px panel
             beside the input). */
          /* the wrapper's width follows what the component's root actually IS:
             for the select family the root is the field, so 100% makes the panel
             match it (which is what `--reka-*-trigger-width` means); a menu's
             root is a bare wrapper around a caller-supplied trigger, and 100%
             there stretched the panel to the whole container instead of letting
             its own `min-w-32` size it. */
          /* Popover.vue:40, DropdownMenu.vue:43 and Select.vue:70 all default
             their content to `{ side: "bottom", sideOffset: 8, collisionPadding: 8 }`:
             8px of air between trigger and panel, and 8px kept clear of the
             viewport edge. Both were missing — panels sat flush against the
             trigger and against the window. */
          const sideOffset = props.sideOffset !== undefined ? props.sideOffset : 8;
          const collisionPadding = props.collisionPadding !== undefined ? props.collisionPadding : 8;
          return React.createElement('div', {
            key, 'data-portal': '',
            style: {
              position: 'absolute', top: `calc(100% + ${sideOffset}px)`, left: 0, zIndex: 50,
              /* `collisionPadding` is the gap the panel keeps from the window:
                 as a static rule that is a cap on its width, not a margin — a
                 margin would shift every panel sideways whether it collides or
                 not */
              maxWidth: `calc(100vw - ${collisionPadding * 2}px)`,
              width: treeSlots.includes('base') ? '100%' : 'max-content'
            }
          }, ...kids);
        }
      }
      if (TRANSPARENT.has(node.t) || (!node.s && /^U?Link(Base)?$/.test(node.t) && node.c)
        || (!node.s && /Input$/.test(node.t) && node.c && node.c.length)
        || AS_CHILD(node)) {
        /* a slotless ULink / ULinkBase wrapper only re-exposes the same `to` its
           child already gets — rendering it would nest an <a> inside an <a>
           (invalid, and the outer one swallows the click target) or wrap every
           Button in a bare <div>. It is a passthrough. */
        const seenT = new Set();
        const kids = (node.c || []).map((ch, i) => {
          /* same v-if/v-else pair rule as for real elements: a transparent
             wrapper (<slot>, <template>) does not make two nodes with one slot
             name two elements — Alert's icon and Tree's chevron each appear
             twice in the tree as exclusive branches */
          if (ch && ch.s && ch.if && seenT.has(ch.s)) return null;
          const out = walk(ch, `${key}.${i}`, ctx);
          if (out && ch && ch.s) seenT.add(ch.s);
          return out;
        }).filter(Boolean);
        /* a NAMED bare <slot name="header" /> emits its content and no element
           of its own (DashboardPanel.vue:45, :51). reka's <Slot> (capital) is
           the same passthrough — Page.vue:26 declares `left` and `right` that
           way, and reading only the lowercase one left both of them empty */
        if ((node.t === 'slot' || node.t === 'Slot') && node.s && props[node.s] !== undefined) kids.unshift(props[node.s]);
        /* reka's <Slot> MERGES its attributes into that child rather than
           wrapping it: `<Slot data-slot="prompt" :class="ui.prompt(…)">`
           (ChatPalette.vue:29) makes the prompt's own root carry the name and
           the class. Dropped, the palette had no `prompt` node at all and its
           `ui.prompt` padding went missing. */
        if (node.t === 'Slot' && node.s && kids.length === 1 && React.isValidElement(kids[0])) {
          const cls = ctx.ui.$slot(node.s, uiProp[node.s]);
          const only = kids[0];
          return React.cloneElement(only, {
            key, 'data-slot': node.s,
            className: twMerge([only.props.className || only.props.class || '', cls || ''])
          });
        }
        if (node._kids && children !== undefined && !itemRender && !childSlot) kids.push(children);
        return kids.length ? React.createElement(React.Fragment, { key }, ...kids) : null;
      }

      const ui = ctx.ui;
      let slot = node.s;
      /* Two separate questions used to share one flag.

         `isRoot` answers "is this node the root of its own subtree" — a node
         whose ancestors are all transparent or slotless. An overlay declares
         overlay *and* content as siblings, and each is the root of its own
         subtree, so several nodes legitimately answer yes; that is what carries
         `data-ds-component` (and, for the first of them, the call site's
         passthrough props).

         It must NOT also excuse a node from its own gates. A node's `v-if` and
         a floating panel's open state are properties of the node, not of its
         depth in the tree: exempting roots left eleven components drawing a
         gated node unconditionally — DashboardPanel's resize handle on every
         dashboard page, Select's and SelectMenu's popup while closed. The gates
         below therefore no longer test `isRoot`. */
      const isRoot = !!slot && !ctx.rooted;
      /* the node the caller's class and passthrough props belong to. Normally
         the first root, but Modal.vue puts `props.class` on its DialogContent —
         its first root node is the overlay, so mounting it as `data-slot="modal"`
         renamed the overlay away and the search modal lost its scrim. */
      const isPrimary = options.primarySlot
        ? (slot === options.primarySlot && !primarySeen)
        : (isRoot && !primarySeen);
      if (isPrimary) primarySeen = true;
      if (isRoot) ctx = { ...ctx, rooted: true };

      /* floating panels and viewports exist only in the open state */
      if (slot && !open && ((slot === 'content' && options.contentNeedsOpen) || (options.openOnlySlots || []).includes(slot))) return null;

      /* what reka primitives decide in script: whether this node exists at all.
         The node itself is in the context because two branches can share one
         slot name — ChatReasoning.vue:142-143 has UChatShimmer and span both as
         `label`, picked by `props.streaming`. */
      const gate = options.renderIf ? options.renderIf(slot, { props, node, item: ctx.item, index: ctx.index, count: ctx.count, variants: variantProps }) : undefined;
      if (gate === false) return null;

      /* a slot this very component owns: mounting the kit component named after
       it here would mount this component inside itself, forever */
      /* a component may swap a node's slot for its v-else counterpart: Select's
         trigger holds ONE node in the extracted tree where the library has a
         value/placeholder pair */
      if (options.slotSwap && slot) {
        const swapped = options.slotSwap(slot, { props, item: ctx.item });
        if (swapped && swapped !== slot) { slot = swapped; }
      }
      const ownSlot = !!slot && slotNames.includes(slot) && OWN_SLOT[themeName] === slot;

      let content = slot ? (ctx.item !== undefined ? itemContent(slot, ctx.item) : props[slot]) : undefined;
      /* A REPEATED slot is a scoped slot in the library — Carousel.vue:212-216 is
         `<div data-slot="item"><slot :item="item" :index="index" /></div>`, with
         no markup of its own — so a caller cannot fill it with an ordinary child:
         one child cannot be three slides. A function child is that scoped slot:
         it is called per item, and what it returns is the item's content. When it
         answers, the component's own invention (`slotContent`) steps aside. */
      let renderedByCaller = false;
      if (itemRender && slot && ctx.item !== undefined && !(node.c && node.c.length)) {
        const given = itemRender({ item: ctx.item, index: ctx.index, count: ctx.count, slot });
        if (given !== undefined && given !== null && given !== false) { content = given; renderedByCaller = true; }
      }
      /* a component may build a slot's content itself — Carousel.vue:152 renders
         each item as the image it names, which no field mapping can express */
      if (options.slotContent && !renderedByCaller) {
        const given = options.slotContent(slot, { props, node, item: ctx.item, parentItem: ctx.parentItem, index: ctx.index, count: ctx.count, content });
        if (given !== undefined) content = given;
      }
      /* A wrapper whose slot IS a button, with the button itself lost in
         extraction: InputNumber's tree is `div s="increment"` with no child, and
         the theme's classes only position it — so the stepper came out as two
         empty 4px boxes. The slot names the component (SLOT_COMPONENT) and the
         appConfig icon map names its glyph, which is all the library needs. */
      if (content === undefined && !(node.c && node.c.length) && slot
        && SLOT_COMPONENT[slot] === 'Button' && defaultIcon(themeName, slot)
        && props[slot] !== false && ctx.item === undefined) {
        const Btn = lookup('Button');
        const iconName = defaultIcon(themeName, slot);
        content = Btn
          ? React.createElement(Btn, {
            key: `${key}.btn`, square: true, color: 'neutral', variant: 'link',
            'aria-label': slot, icon: iconName, size: variantProps.size
          })
          /* same fallback the UButton branch keeps: a plain button with the glyph,
             so the stepper exists even where the kit's Button is not reachable */
          : React.createElement('button', {
            key: `${key}.btn`, type: 'button', 'aria-label': slot, 'data-ds-component': 'Button',
            className: 'inline-flex items-center justify-center'
          }, renderIcon(iconName, 'shrink-0 size-5', `${key}.btn.i`));
      }
      if (slot === 'value' && (content === undefined || content === null || content === '')) {
        const shown = Array.isArray(model) ? model.join(', ') : model;
        content = (shown === undefined || shown === null || shown === '') ? props.placeholder : shown;
      }
      if (slot === 'fallback' && content === undefined) content = props.text ?? props.alt;
      /* the last link of the library's `??` chains is a non-breaking space
         (Select.vue:209-213, SelectMenu.vue:391, Avatar.vue:89, Table.vue:85):
         the character is what gives the line its height, and an empty
         placeholder collapsed Select's trigger from 32px to 12 */
      if (nbspSlot(themeName, slot) && !(node.c && node.c.length)
        && (content === undefined || content === null || content === '')) content = NBSP;
      /* A slot name can appear on two mutually exclusive v-if branches — Alert
         and Toast declare `actions` both inside `wrapper` and directly in
         `root`, the library picking one by whether a title is present. The
         content belongs to the first branch only; the later node still renders
         if it holds other slots (the close button), and its own `if` guard
         drops it when it does not. */
      if (slot && content !== undefined && ctx.item === undefined) {
        if (renderedSlots.has(slot)) content = undefined;
        else renderedSlots.add(slot);
      }
      /* One slot name, two v-if branches, DIFFERENT theme variants: Alert's
         vertical `actions` sits inside `wrapper`, and the horizontal one is a
         sibling resolved with `orientation: 'horizontal'` — that variant is what
         drops the vertical branch's `mt-2.5`. `node.sv` carries those literals. */
      const nodeUi = node.sv ? resolve({ ...variantProps, ...node.sv }, computed) : ui;
      /* An OPEN dialog holds the focus inside it: reka's DialogContent moves it
         there and the first focusable node is the close button, so the theme's
         `focus-visible:outline-3` ring belongs to the open state, not to an
         interaction. Applied on the slot class so it lands whichever path
         builds the button (Modal's goes through the orphan-define path). */
      /* reka moves the focus to the FIRST FOCUSABLE element of an open overlay,
         and the theme rings it through `focus-visible`. Which element that is
         depends on the overlay's content — a bare Modal's close button, a
         search dialog's input — so the component names the slot and a caller
         can override it (`focusSlot`, or `null` to hand the focus to a child). */
      const focusSlot = props.focusSlot !== undefined ? props.focusSlot : options.focusOnOpen;
      const focusRing = !!focusSlot && open && slot === focusSlot;
      /* A component the library ALWAYS mounts inside a host renames its root
         slot there and takes the host theme's class for it: Toaster.vue:97 mounts
         every toast as `<UToast data-slot="base" :class="ui.base(…)">`, which is
         why a toast never carries `root` anywhere in the library — the same
         renaming AvatarGroup does to an Avatar. `options.hostSlot` names that
         host, so the component comes out right whether the host renders it or a
         caller does. */
      let slotName = slot;
      let hostCls = '';
      if (options.hostSlot && isRoot && slot === 'root') {
        slotName = options.hostSlot.slot;
        hostCls = hostSlotUi ? hostSlotUi.$slot(options.hostSlot.slot, (uiProp || {})[options.hostSlot.slot]) : '';
      }
      const cls0 = slot ? twMerge([hostCls, nodeUi.$slot(slot, uiProp[slot], isPrimary ? (className || classNameAlt) : null) || '', focusRing ? 'outline-3' : '']) : undefined;
      const cls = (isPrimary && paintOnRoot) ? twMerge([ui.$slot('base', uiProp.base), cls0 || '']) : cls0;
      /* Props written at the USE SITE of a nested component — extraction keeps
         element nesting and slot names, but not the attributes the parent's
         template passes down, so the child fell back to its own defaults.
         Alert.vue:64-66 renders its actions as `<UButton size="xs" v-bind="action">`:
         a default the item's own field can override, which is why they go in
         BEFORE the item's props. */
      const useProps = slot
        ? { ...useSiteProps(themeName, slot, props, defaults, ctx.ui), ...((options.slotProps && options.slotProps[slot]) || null) }
        : null;
      /* A node whose type is a kit component IS that component: mount it, with
         the props written at the CALL SITE (node.p) and the wrapper's slot class,
         instead of painting one element with a copy of its theme.

         Painting one element meant a nested component had no insides at all —
         CheckboxGroup drew 141 slot nodes against the library's 496, each `item`
         an empty shell with no container/base/wrapper/label — and no props, so
         ChatPrompt's `variant="none"` textarea came out `outline` and Toast's
         `size="sm"` progress bar came out `md`. Mounting also makes `root` and
         `base` two elements again, which is what PAINT_SLOTS was compensating
         for when the kit had one. */
      /* …except when this node is where the host's own children go: a mounted
         component receives them as React children and its own internals decide
         where to put them, and for UContainer they were dropped outright
         (PageHero's image vanished). Painting the node with the child's theme
         keeps the children in the host's hands. */
      /* a node named after a kit component mounts that component — the
         CHILD_THEMES map only carries the ones whose theme the renderer also
         needs to paint, and PageSection's UPageFeature is not in it, so its
         features list came out empty */
      const namedChild = /^U[A-Z]/.test(node.t) ? node.t.replace(/^U/, '') : null;
      const childComp = (CHILD_THEMES[node.t] || namedChild) && !ownSlot
        && !(slot && childSlot === slot && children !== undefined && !itemRender && !ctx.item)
        ? lookup(node.t.replace(/^U/, '')) : null;
      /* the mount is deferred past the gates below: a mounted component is
         still a node with a v-if — DashboardPanel's resize handle is a
         UDashboardResizeHandle, and mounting it before its gate drew it on
         every dashboard page again. */
      const mountChild = childComp ? (kids) => {
        /* A slot that names ONE FIELD of the item binds that field, not the
           whole item: NavigationMenu.vue:164 writes
           `v-bind="typeof item.badge === 'string' || 'number' ? { label: item.badge } : item.badge"`.
           Spreading the item instead handed the badge the link's `icon`, so a
           25px "42" badge came out 51px wide with a glyph inside it. */
        const fieldOf = slot && ITEM_FIELD[slot];
        const fieldVal = fieldOf && ctx.item !== null && typeof ctx.item === 'object' ? fieldOf(ctx.item) : undefined;
        const fieldProp = PRIMITIVE_PROP[(CHILD_THEMES[node.t] || {}).name || node.t.replace(/^U/, '')] || 'label';
        let itemProps = fieldOf
          ? (fieldVal === null || fieldVal === undefined ? null
            : (typeof fieldVal === 'object' && !React.isValidElement(fieldVal) ? fieldVal : { [fieldProp]: fieldVal }))
          : ((ctx.item !== null && typeof ctx.item === 'object') ? ctx.item
            : (ctx.item !== undefined ? { label: ctx.item } : null));
        /* the per-item `active`/`selected` flags are the renderer's own state, not
           the child's props: spread into a hand-written component they ride its
           `...rest` onto the DOM and React warns "Received true for a
           non-boolean attribute active". The child learns its state through the
           props the host sets explicitly (CheckboxGroup passes `checked`). */
        if (itemProps && (itemProps.active !== undefined || itemProps.selected !== undefined)) {
          const { active: _a, selected: _s, ...restItem } = itemProps;
          itemProps = restItem;
        }
        /* `node.fwd` are the props the parent forwards into the child —
           ChatPrompt.vue:45 does it with useForwardProps(reactivePick(props,
           'rows', …)), which is how the textarea gets rows=1 instead of the
           browser's 2 */
        const fwd = {};
        /* the host's RESOLVED prop wins: `useForwardProps(reactivePick(props,…))`
           passes the host's own default, which is how ChatPrompt's `rows: 1`
           beats Textarea's `rows: 3`. A host prop with no `default:` is
           undefined and forwards nothing, leaving the child's default — so the
           fix for dashboard-search's phantom `overlay: false` belongs in
           PROP_DEFAULTS, not in this order. */
        for (const name of node.fwd || []) {
          const v = props[name] !== undefined ? props[name] : defaults[name];
          if (v !== undefined) fwd[name] = v;
        }
        /* the slot's own value configures the mounted component: an object is
           its props (`badge={{ label: 'New', color: 'primary' }}`), a string or
           number its label, a list one component per entry */
        const plain = (v) => v !== null && typeof v === 'object' && !React.isValidElement(v) && !Array.isArray(v) && !('$slotMark' in v);
        /* only when the node has no children of its own: BlogPost's `authors`
           node is a UAvatarGroup with a v-for *inside* it, so splitting the list
           here built eleven avatar groups instead of one holding eleven avatars */
        const splittable = !(node.c && node.c.length);
        const list = splittable && Array.isArray(content) && content.length && content.every(plain) ? content
          : (splittable && plain(content) ? [content] : null);
        /* size travels into the child only where the child has one — passing it
           to a Container would ride through its rest props onto a <div> */
        const childTheme = (CHILD_THEMES[node.t] || {}).theme || {};
        const takesSize = !!(childTheme.variants && childTheme.variants.size);
        /* the empty-slot signal is for a slotless WRAPPER node only. A component
           mounted per ITEM is a row of its own (PageSection renders each feature
           as a UPageFeature `li`), so it keeps the slot its own theme gives its
           root — sending the signal there left those rows with no slot at all. */
        /* …and only where the library hands that row its own element: PageSection
           mounts each feature as `UPageFeature as="li"`, which is a row with its
           own `root`. A per-item avatar (ChangelogVersion's authors) is not —
           keeping its slot there added a root per author. */
        const perItem = ctx.item !== undefined && !slot && !!(node.p && node.p.as);
        /* the props written where the host mounts this child (lib/use-site.js):
           after the item's own fields, because the library writes them on the
           tag itself — `<UAvatar v-bind="item.avatar" :ui="{ icon: … }">` — where
           the literal wins over the spread */
        const base = { ...(takesSize ? { size: variantProps.size } : {}), ...(itemProps || {}), ...fwd, ...(useProps || {}), ...(node.p || {}), class: cls, ...(perItem ? {} : { 'data-slot': slot || '' }) };
        /* per-mount inline style the host writes on each child: Toaster.vue:99-104
           puts the stacking variables (`--index`, `--before`, `--offset`,
           `--scale`, `--translate`, `--transform`) on every toast, and the toast's
           own theme reads them — `slotAttrs` cannot, it only sees element nodes. */
        const mountStyle = options.mountStyle
          ? options.mountStyle(slot, { props, index: ctx.index, count: ctx.count, item: ctx.item })
          : null;
        if (mountStyle) base.style = { ...(base.style || {}), ...mountStyle };
        if (list) {
          const built = list.map((p, i) => React.createElement(childComp, { ...base, key: `${key}.${i}`, ...p, class: i === 0 ? cls : undefined }));
          return built.length === 1 ? built[0] : React.createElement(React.Fragment, { key }, ...built);
        }
        return React.createElement(childComp, {
          ...base, key,
          ...(content !== undefined && !kids.length && (typeof content === 'string' || typeof content === 'number') ? { label: content } : {})
        }, ...kids);
      } : null;
      /* a child component still known only by its theme (no component to mount)
         contributes that theme under the wrapper's class */
      const childCls = CHILD_THEMES[node.t]
        ? childClasses(node.t, { size: variantProps.size, ...(node.p || {}) })
        : null;
      const ownCls = childCls ? twMerge([childCls, cls || '']) : cls;

      /* An icon-only button the theme styles through its own slot (close,
         carousel arrows). The tree guards it with v-if="props.close", so it
         exists when the slot was *requested* — not when it was left empty — and
         a props-object value configures it. */
      if (node.t === 'UButton' && slot && defaultIcon(themeName, slot)) {
        /* `v-if="props.close"` with `close` declared `default: true`: the button
           exists unless the caller turns it off. Testing truthiness of the raw
           prop removed the close button from every Modal and Slideover, which
           declare that default — and Drawer, which declares none, correctly has
           no close button either. */
        const asked = props[slot] !== undefined ? props[slot] : defaults[slot];
        if (node.if && !asked) return null;
        const given = content !== null && typeof content === 'object' && !React.isValidElement(content) && !Array.isArray(content) ? content : null;
        const Button = lookup('Button');
        const iconName = (given && given.icon) || defaultIcon(themeName, slot);
        if (Button) {
          return React.createElement(Button, {
            key, square: true, color: 'neutral',
            /* the variant is written at the USE SITE, and the overlays differ from
               the inline components: Modal.vue:121-126 (and Slideover, Drawer)
               pass `variant="ghost"`, which is why their close button is
               `text-default hover:bg-elevated` and not the `link` variant's
               `text-muted`. */
            variant: 'link', ...CLOSE_PROPS[themeName],
            'aria-label': slot,
            class: cls, ...(focusRing ? { 'data-focus-visible': 'true' } : null),
            ...(given || {}), icon: iconName, 'data-slot': slot
          });
        }
        const iconCls = slotNames.includes(slot + 'Icon') ? ui.$slot(slot + 'Icon', uiProp[slot + 'Icon'])
          : (slotNames.includes('icon') ? ui.$slot('icon', uiProp.icon) : 'shrink-0 size-5');
        return React.createElement('button', {
          key, type: 'button', 'data-slot': slot, 'data-ds-component': 'Button', className: cls, 'aria-label': slot
        }, renderIcon(iconName, iconCls, key + '.i'));
      }

      /* a slot value given as props for the component the slot paints */
      const asProps = (v) => v !== null && typeof v === 'object' && !React.isValidElement(v) && !Array.isArray(v) && !('$slotMark' in v);
      /* a bare slot-mark object is content, not a component config */
      if (content !== null && typeof content === 'object' && !React.isValidElement(content) && !Array.isArray(content) && '$slotMark' in content) {
        content = content.children !== undefined ? content.children : content.$slotMark;
      }
      const objectValue = slot && !ownSlot && (asProps(content) || (Array.isArray(content) && content.length && content.every(asProps)));
      /* …or as a list of primitives the slot repeats a component over */
      const primitiveList = slot && !ownSlot && !objectValue && Array.isArray(content) && content.length
        && content.every((v) => typeof v === 'string' || typeof v === 'number');
      if (primitiveList) {
        const Comp = lookup(NODE_COMPONENT[node.t] || SLOT_COMPONENT[slot]);
        const prop = Comp && PRIMITIVE_PROP[NODE_COMPONENT[node.t] || SLOT_COMPONENT[slot]];
        if (Comp && prop) content = content.map((v, i) => React.createElement(Comp, { key: i, ...useProps, [prop]: v }));
      }
      if (objectValue) {
        const list = Array.isArray(content) ? content : [content];
        const Comp = lookup(NODE_COMPONENT[node.t] || SLOT_COMPONENT[slot]);
        if (Comp && NODE_COMPONENT[node.t]) {
          /* the slot node *is* the component — the object configures it, and it
             takes the wrapper's slot name: stamping its own `root` on top
             doubled every root on blog-post, blog-posts and changelog-version,
             exactly as it did for the avatar before round 6.
             The host's `<slot>Size` value is the child's size token
             (badge.size.md gives leadingAvatarSize "3xs"); without it a size-8
             avatar sat in a size-4 slot. */
          const sizeSlot = slot && slotNames.includes(slot + 'Size') ? String(ui.$slot(slot + 'Size') || '').trim() : '';
          const built = list.map((p, i) => React.createElement(Comp, {
            key: `${key}.${i}`, 'data-slot': slot,
            ...(sizeSlot ? { size: sizeSlot } : {}), ...useProps, ...p, class: i === 0 ? cls : undefined
          }));
          return built.length === 1 ? built[0] : React.createElement(React.Fragment, { key }, ...built);
        }
        /* the node is the wrapper the v-for lived in — the objects go inside.
           `options.linkSize` is the size the host gives those buttons:
           PageHero.vue:56 renders its links at `lg`, and without it they came
           out at the button's default (px-2.5 py-1.5 text-sm, size-5 icons). */
        const hostSize = options.linkSize && /^(links|actions|buttons)$/.test(slot || '') ? options.linkSize : undefined;
        content = Comp ? list.map((p, i) => React.createElement(Comp, { key: i, ...(hostSize ? { size: hostSize } : {}), ...useProps, ...p })) : undefined;
      }

      // icons
      if (node.t === 'UIcon' || (slot && /icon$/i.test(slot))) {
        let name = typeof content === 'string' ? content : null;
        /* while loading, the leading (or trailing, when leading is off) icon IS
           the spinner, whatever the icon props say */
        if (!name && computed.loadingIcon && !ctx.item) {
          if (slot === 'leadingIcon' && lead) name = computed.loadingIcon;
          else if (slot === 'trailingIcon' && !lead && trail) name = computed.loadingIcon;
          else if (slot === 'icon') name = computed.loadingIcon;
        }
        if (!name && slot === 'leadingIcon') name = ctx.item ? ctx.item.icon : (props.leadingIcon || (props.trailing ? null : props.icon));
        if (!name && slot === 'trailingIcon') name = ctx.item ? ctx.item.trailingIcon : (props.trailingIcon || (props.trailing ? props.icon : null));
        if (!name && slot === 'icon') name = ctx.item ? ctx.item.icon : props.icon;
        if (!name) name = node.icon;
        if (!name) name = defaultIcon(themeName, slot);
        /* a feature list marks each line with the check icon
           (PricingPlan.vue:113 reads appConfig.ui.icons.check) — items that are
           plain strings carry no icon of their own */
        if (!name && /^(feature|tierFeature)Icon$/.test(slot || '')) name = ICON_MAP.check;
        /* the slot's real name, not a blanket "icon": the tree knows whether this
           is leadingIcon, separatorIcon, linkTrailingIcon … and the theme styles
           each one differently */
        return renderIcon(name, ownCls, key, slot || 'icon');
      }
      if (node.t === 'UAvatar' || node.t === 'UChip' || /avatar$/i.test(slot || '') || slot === 'image') {
        let av = content || (slot && props[slot]) || (ctx.item ? (ctx.item.avatar || ctx.item.user) : props.avatar) || (slot === 'image' && props.src ? { src: props.src, alt: props.alt } : null);
        /* Timeline.vue:31 and Empty.vue:24 draw their icon THROUGH the avatar
           (`<UAvatar :icon="icon">`), and they are the only two that do. Named
           outright rather than inferred: a tree-shape test read Alert's icon
           node wrongly and every Alert mounted an Avatar it never asked for —
           70 roots against 35, a grey circle with a duplicated icon. */
        if (!av && (slot === 'indicator' || slot === 'avatar') && ICON_THROUGH_AVATAR.has(themeName)) {
          const icon = (ctx.item ? ctx.item.icon : props.icon) || defaultIcon(themeName, slot) || defaultIcon(themeName, 'icon');
          if (icon) av = { icon };
        }
        /* in a list of avatars the item IS the avatar (BlogPost.vue:96 iterates
           `authors`, each one `{ src, alt }`) — there is no `avatar` field to
           look for, and requiring one dropped every author */
        if (!av && ctx.item && typeof ctx.item === 'object' && (ctx.item.src || ctx.item.alt)) av = ctx.item;
        if (!av) return null;
        if (React.isValidElement(av)) return React.createElement('span', { key, 'data-slot': slot, className: cls }, av);
        /* `<UAvatar v-bind="props.avatar" />` is the Avatar component with those
           props — not a bare span, so initials keep the rounded-full chrome.
           Never inside the component that owns the slot, though: Avatar's own
           `image` slot must paint an <img>, or it would mount itself forever.
           And an `image` slot is a picture, not an avatar: BlogPost.vue:94 puts
           one `<component :is="ImageComponent" data-slot="image">` in its
           header, so mounting an Avatar there produced two `image` nodes — the
           wrapper and the avatar's own — and 16px of extra height per post. */
        const Avatar = (ownSlot || slot === 'image') ? null : lookup('Avatar');
        if (Avatar && (typeof av === 'object' || typeof av === 'string')) {
          const conf = typeof av === 'string' ? { src: av } : av;
          /* the host's `<slot>Size` value IS the child avatar's size token:
             badge.size.md gives leadingAvatarSize "3xs", and reading the host's
             own `size` instead rendered a size-8 avatar inside a size-4 slot */
          const sizeSlot = slot && slotNames.includes(slot + 'Size') ? String(ui.$slot(slot + 'Size') || '').trim() : '';
          /* …plus whatever the host writes at the mount (lib/use-site.js):
             Timeline.vue:78 gives its indicator avatar
             `:ui="{ icon: 'text-inherit', fallback: 'text-inherit' }"`, without
             which the glyph kept the avatar's own `text-muted` */
          return React.createElement(Avatar, { key, 'data-slot': slot, size: conf.size || sizeSlot || options.avatarSize || variantProps.size, ...conf, ...(useProps || {}), class: cls });
        }
        const src = typeof av === 'string' ? av : av.src;
        if (!src) return React.createElement('span', { key, 'data-slot': slot, className: cls }, typeof av === 'object' ? av.alt : null);
        return React.createElement('img', { key, 'data-slot': slot, className: cls, src, alt: (av && av.alt) || '' });
      }
      /* A slot whose value is a list of objects FEEDS the v-for inside it: the
         `authors` div in BlogPost.vue:96 holds `<UAvatar v-for="author in
         authors">`, and with the list left as the node's own content the loop
         had nothing to iterate and every author avatar went missing. */
      const listForInner = Array.isArray(content) && content.length && hasNestedFor({ c: node.c })
        /* the list feeds the loop inside, whether its entries are objects or
           plain strings: left as content, an array of strings printed itself as
           a bare text node above the <li>s it was meant to fill */
        && content.every((o) => (o !== null && typeof o === 'object' && !React.isValidElement(o))
          || typeof o === 'string' || typeof o === 'number') ? content : null;
      /* Two sibling nodes with one slot name are a v-if/v-else pair of the same
         element — Tree's linkTrailingIcon is the open/closed chevron, not two
         chevrons — so the first one that renders takes the slot. */
      const seenSiblings = new Set();
      /* the slot names on the way down: a child repeating its parent's slot name
         is the element the wrapper is for (InputNumber's increment wrapper holds
         the increment UButton), not a spent v-if/v-else branch */
      const kidCtxBase = slot ? { ...ctx, ancestorSlots: [...(ctx.ancestorSlots || []), slot] } : ctx;
      let kids = (node.c || []).map((ch, i) => {
        if (ch && ch.s && ch.if && seenSiblings.has(ch.s)) return null;
        const out = walk(ch, `${key}.${i}`, listForInner ? { ...kidCtxBase, items: listForInner } : kidCtxBase);
        if (out && ch && ch.s) seenSiblings.add(ch.s);
        return out;
      }).filter(Boolean);
      if (listForInner && kids.length) content = undefined;
      /* a DefineTemplate body whose Reuse node was lost belongs inside this slot */
      let into = options.inlineDefineInto && slot ? Object.keys(options.inlineDefineInto).find((n) => {
        const target = options.inlineDefineInto[n];
        return Array.isArray(target) ? target.includes(slot) : target === slot;
      }) : null;
      /* several candidate slots are usually alternatives resolved by "the first
         that renders"; a component that knows WHICH one applies says so
         (PricingPlan's price sits in the body or in the footer by orientation) */
      if (into && options.inlineDefineIntoPick) {
        const pick = options.inlineDefineIntoPick(into, slot, props);
        if (pick === false) { intoRefused.add(into); into = null; }
      }
      /* a define with SEVERAL reuse points is inserted in each of them, not in
         the first: ChangelogVersion.vue reuses its date template twice — inside
         the indicator and inside the container (the second `hidden` when an
         indicator exists) — and inserting once put the date beside the
         container as a third root child instead. */
      const intoAll = options.inlineDefineIntoAll && slot
        ? Object.keys(options.inlineDefineIntoAll).find((n) => options.inlineDefineIntoAll[n].includes(slot)) : null;
      if (intoAll && defines[intoAll]) {
        const built = defines[intoAll].map((c, i) => walk(c, `${key}.a${i}`, { ...ctx, intoSlot: slot })).filter(Boolean);
        kids = kids.concat(built);
      }
      if (into && defines[into] && !(usedInto.has(into) && Array.isArray(options.inlineDefineInto[into]) && !recursiveDefines.has(into))) {
        usedInto.add(into);
        /* the group's item is the group itself — an array of entries — and the
           template it holds is the per-entry body (Listbox.vue:118 reuses it in
           a v-for inside the group). At the root the entries are the component's
           own items, and on a `listWithChildren` they are the item's children:
           that recursion is what Tree lost, leaving a flat list. */
        const depth = (ctx.depth || 0) + 1;
        /* a recursive target (several slots for one template) exists only where
           there are entries to fill it: rendering the body anyway re-entered the
           same slot forever. A single target repeats only over a group array —
           PricingPlan's price block is one block inside `body`, not one per
           feature. */
        /* An array target names SEVERAL possible slots (Sidebar's two root
           branches), not a repetition. It is recursive only when the body can
           re-enter one of those slots itself — Tree's item template holds the
           `listWithChildren` it is placed into. */
        const target = options.inlineDefineInto[into];
        const recursive = recursiveDefines.has(into);
        /* same rule as the orphan loop: a body that carries its own loop is
           rendered once, and the list reaches that inner `for` */
        const bodyLoops = defines[into].some((n) => n.for || hasNestedFor(n));
        const groupEntries = !bodyLoops && Array.isArray(ctx.item) ? ctx.item
          : (!bodyLoops && ctx.item && !Array.isArray(ctx.item) && typeof ctx.item === 'object' && Array.isArray(ctx.item.items) ? ctx.item.items : null);
        const entries = recursive
          ? (groupEntries
            || (ctx.item && Array.isArray(ctx.item.children) ? ctx.item.children
              : (ctx.item && Array.isArray(ctx.item.items) ? ctx.item.items
                : (ctx.item === undefined && ctx.items && ctx.items.length ? ctx.items : null))))
          : groupEntries;
        const built = (entries && depth <= 4)
          ? entries.flatMap((item, i) => {
            /* the same per-item state the plain `for` derives: a template
               reused per item (Tree's rows) is still a repetition, and without
               this its selected row never resolved the `selected` variant */
            const { picked, sel } = itemPick(item, i);
            const act = item && item.active !== undefined ? item.active : (picked || undefined);
            const ownV = options.itemVariants && !Array.isArray(item) ? options.itemVariants(item, { index: i, count: entries.length, props }) : null;
            const itemUi = (sel !== undefined || act !== undefined || ownV)
              ? resolve({ ...variantProps, ...(sel !== undefined ? { selected: sel } : {}), ...(act !== undefined ? { active: act } : {}), ...(ownV || {}), ...(options.variantOverrides || {}) }, { ...computed, index: i })
              : ctx.ui;
            const withState = sel !== undefined ? { ...item, selected: sel } : item;
            return defines[into].map((c, j) => walk(c, `${key}.d${i}.${j}`, { ...ctx, ui: itemUi, inlined: true, item: withState, index: i, count: entries.length, depth })).filter(Boolean);
          })
          : (recursive ? [] : defines[into].map((c, i) => walk(c, `${key}.d${i}`, { ...ctx, inlined: true })).filter(Boolean));
        /* position matters: PricingPlan.vue:74 reuses the price block ABOVE the
           feature list, and appending it after everything left each card 44px
           taller than the library's. The anchor lives in the RENDERED tree, and
           possibly several levels down — `body`'s only tree child is a
           transparent <slot> wrapper holding title, description and features —
           so the insert walks the built elements and rebuilds the branch it
           lands in. */
        const insertBefore = (nodes) => {
          const arr = React.Children.toArray(nodes);
          for (let i = 0; i < arr.length; i++) {
            const el = arr[i];
            if (!el || typeof el !== 'object' || !el.props) continue;
            if (el.props['data-slot'] === 'features') return arr.slice(0, i).concat(built, arr.slice(i));
            const inner = React.Children.toArray(el.props.children || []);
            if (inner.length) {
              const rebuilt = insertBefore(inner);
              if (rebuilt) return arr.slice(0, i).concat([React.cloneElement(el, { key: el.key }, ...rebuilt)], arr.slice(i + 1));
            }
          }
          return null;
        };
        const placed = built.length ? insertBefore(kids) : null;
        kids = placed || kids.concat(built);
      }
      const inner = [];
      if (content !== undefined && content !== null && content !== false) inner.push(content);
      inner.push(...kids);
      /* flush whatever was relocated here (stashed while walking earlier nodes) */
      if (options.slotInto && slot && Object.values(options.slotInto).includes(slot) && stashed.length) {
        inner.push(...stashed.splice(0, stashed.length));
      }
      if (node._kids && children !== undefined && !itemRender && !childSlot) inner.push(children);
      if (isPrimary && children !== undefined && !itemRender && !anchored && !childSlot) inner.push(children);
      /* the host's children go into the child-slot node: at its start by
         default, at its end where the template puts them after its own content
         (PageHero's image is the grid's SECOND column — prepended, it landed on
         the left at x=48 against the library's x=672) */
      if (slot && childSlot === slot && children !== undefined && !itemRender && !ctx.item) {
        if (options.childSlotAt === 'end') inner.push(children);
        else inner.unshift(children);
      }

      const hasInner = inner.some((c) => c !== null && c !== undefined && c !== false && c !== '');
      /* `node.if` is a `v-if` from the library template, and its condition is
         almost always the prop named after the slot: `v-if="props.overlay"`,
         `v-if="props.arrow"`, `v-if="props.close"`. Ask that prop, falling back
         to the component's own defineProps default — Slideover and Drawer both
         default `overlay: true`, and dropping the node for want of children
         deleted their backdrop entirely.

         Where the condition cannot be named (DashboardPanel guards its resize
         handle on `resizable`, not on `handle`), an empty gated node still goes:
         a node drawn unconditionally is a defect we can see, a missing one looks
         like the design. A silent `renderIf` means "I don't know", not "drop". */
      /* two nodes sharing one slot name are the v-if / v-else branches of one
         element (Modal.vue:151 declares DialogOverlay twice); once a branch has
         been emitted the other is spent, whatever the prop says. Inside a
         repeated item this does not apply — every item has its own separator,
         and treating the set as global left Timeline with one separator for
         three items. */
      if (node.if && slot && !hasInner && ctx.item === undefined && emittedSlots.has(slot)
        && ctx.intoSlot === undefined
        && !(ctx.ancestorSlots || []).includes(slot) && gate !== true) return null;
      /* …and a subtree ROOT whose slot was already emitted is the other branch of
         the same root: Sidebar declares `root` twice (plain and railed) at the
         top level, one of them inside a <template>, so no sibling test could see
         the pair — the component came out with two roots and two `inner`s. */
      if (isRoot && slot && emittedSlots.has(slot) && ctx.item === undefined
        && !options.keepRootBranches && !(ctx.ancestorSlots || []).includes(slot)) return null;
      /* a backdrop exists because it was asked for, on whichever branch it sits:
         Modal declares one DialogOverlay without a v-if, so `overlay={false}`
         would otherwise still dim the page */
      if (slot === 'overlay' && (props.overlay !== undefined ? !props.overlay : defaults.overlay === false)) return null;
      if (node.if && gate !== true) {
        /* a separator sits BETWEEN repeated items: it exists for every item but
           the last, which is a position, not a prop (Timeline, Stepper) */
        if (slot === 'separator' && ctx.index !== undefined && ctx.count !== undefined) {
          if (ctx.index >= ctx.count - 1) return null;
        } else {
          /* `leading` and `trailing` are not raw props: the renderer derives
             them from the icon/avatar/loading props above (Input.vue:96 does the
             same with useComponentIcons). Reading `props[slot] ?? defaults[slot]`
             found the `leading: false` defineProps default and dropped the
             wrapper for every Input that passed an `icon` — no icons anywhere in
             the input family, and no `ps-9` to go with them. */
          /* …unless the caller passed real CONTENT for that slot: AuthForm puts
             a reveal Button into the password input's `trailing`, and an element
             there is the slot's children, not the boolean variant */
          const named = (slot === 'leading' || slot === 'trailing')
            ? (React.isValidElement(props[slot]) ? true : computed[slot])
            : (slot && (props[slot] !== undefined || defaults[slot] !== undefined)
              ? (props[slot] !== undefined ? props[slot] : defaults[slot]) : undefined);
          if (named !== undefined) { if (!named) return null; }
          else if (!hasInner) return null;
        }
      }
      if (mountChild) {
        if (slot) emittedSlots.add(slot);
        return mountChild(kids);
      }

      let tag;
      if (isPrimary) {
        /* `as` is how a Nuxt UI component chooses its element, and its value
           usually comes from defineProps rather than the call site — Kbd is a
           <kbd>, Badge a <span>, Breadcrumb a <nav>, ChatPrompt a <form>.
           Honouring only an explicitly passed `as` shipped 22 components as
           semantically empty divs. A `to` still wins: that is a link. */
        tag = props.to ? mapTag(node.t, props, slot, true)
          : (props.as || defaults.as || options.rootTag || mapTag(node.t, props, slot, true));
      } else {
        tag = mapTag(node.t, props, slot, false);
      }
      /* the ULink wrapper above a link slot is a passthrough, so the slot node
         itself is the anchor — and a link slot is a link whether or not this
         particular item carries a `to` */
      if (/^(link|childLink)$|Link$/.test(slot || '') && /^(span|div|p)$/.test(tag)
        && !/(Label|Icon|Avatar|Badge|Wrapper|Trailing|Leading|Description)$/.test(slot)) tag = 'a';
      /* …unless the component resolves that slot's element itself: Tree.vue:49-54
         computes `{ root: "ul", link: "button" }`, so its rows are buttons and
         its lists are real lists, whatever the extracted node type says */
      if (options.slotTag && slot && options.slotTag[slot] && !(props.to || (ctx.item && ctx.item.to))) {
        tag = options.slotTag[slot];
      }
      let [clsClean, varStyle] = extractVarClasses(ownCls);
      /* every component, not just overlays: `min-h-svh` on a dashboard shell is
         as much a viewport assumption as an overlay's `fixed inset-0` */
      /* …except a slot the component declares as staying pinned to the window:
         the toaster's viewport is `fixed … right-4 top-4`, and localized to
         `absolute` its `right-4` resolved against whatever ancestor happened to
         be positioned — the whole stack landed at x = -16, outside the frame. */
      if (!(options.keepFixed && slot && options.keepFixed.includes(slot))) {
        const [local, localStyle] = localizeFixed(clsClean);
        clsClean = local;
        if (localStyle) varStyle = { ...(varStyle || {}), ...localStyle };
      }
      const origin = originVars(clsClean, themeName, props);
      if (origin) varStyle = { ...(varStyle || {}), ...origin };
      /* plain DOM tags take `className` — React 18 warns once per element for
         `class`, which buries real errors on a page with many instances */
      const attrs = { key, className: clsClean };
      if (varStyle) attrs.style = varStyle;
      /* the trigger IS the containing block for an anchored portal */
      /* whatever element ends up PARENTING an anchored portal is its containing
         block — marking the primary root or `base` was useless, since neither is
         the portal's parent in these trees */
      if (kids.some((k) => k && k.props && k.props['data-portal'] !== undefined)) {
        attrs.style = { position: 'relative', ...(attrs.style || {}) };
      }
      if (slotName) attrs['data-slot'] = slotName;
      if (options.slotAttrs) {
        let extra = options.slotAttrs(slot, props, variantProps, { item: ctx.item, index: ctx.index, count: ctx.count, intoSlot: ctx.intoSlot });
        if (extra) {
          if (extra.style) extra.style = { ...(attrs.style || {}), ...extra.style };
          /* `addClass` appends to the class the theme computed, instead of
             replacing it: ChangelogVersion's second date carries the theme's own
             `hidden` variant (lg:hidden), which no attribute can express */
          if (extra.addClass) {
            attrs.className = twMerge([attrs.className || '', extra.addClass]);
            extra = { ...extra }; delete extra.addClass;
          }
          Object.assign(attrs, extra);
        }
      }
      if (isRoot) {
        /* every subtree root is attributable to its own theme — except a define
           body inlined into the component (FileUpload's files template): it is
           not a subtree of its own, and marking it made
           `[data-ds-component="FileUpload"]` answer 3 for two components. */
        if (ctx.intoSlot === undefined && !ctx.inlined) attrs['data-ds-component'] = componentName;
        /* …unless the component named its own: Sidebar's states are
           `expanded`/`collapsed` (Sidebar.vue:78) and its whole collapsed
           layout hangs off them, so the generic open/closed pair must not
           overwrite what `slotAttrs` wrote */
        if (open !== undefined && attrs['data-state'] === undefined) attrs['data-state'] = open ? 'open' : 'closed';
      }
      if (slot) emittedSlots.add(slot);
      /* Textarea.vue:117 assigns `rows` to the element; ChatPrompt.vue:45
         forwards its own `rows` (default 1) into the Textarea, whose own
         default is 3 — so this is the call site's value over this component's
         default, never a constant */
      if (tag === 'textarea') {
        const rows = props.rows !== undefined ? props.rows : defaults.rows;
        if (rows !== undefined) attrs.rows = rows;
      }
      if (isPrimary) {
        /* only props the renderer did not consume reach the DOM, and only as
           primitives — an object attribute renders as "[object Object]" */
        const passthrough = Object.fromEntries(Object.entries(rest).filter(([k, v]) =>
          !slotNames.includes(k) && !(k in variants) && !CONSUMED.has(k) && domSafe(k, v)));
        if (passthrough.style && attrs.style) passthrough.style = { ...attrs.style, ...passthrough.style };
        /* a host slot name renames only a child's generic wrapper (`root`,
           `base`): Modal's class-bearing node is its `content`, and letting
           dashboard-search's `data-slot="modal"` rename that lost a real slot
           on both sides of the diff */
        if (passthrough['data-slot'] !== undefined && attrs['data-slot']
          && attrs['data-slot'] !== 'root' && attrs['data-slot'] !== 'base') {
          delete passthrough['data-slot'];
        }
        Object.assign(attrs, passthrough);
        /* an empty `data-slot` says "you are mounted on a slotless node": it must
           not RENAME the child's slot, but it must not erase it either — the
           child keeps whatever slot its own theme gives that element. Deleting
           it left PageSection's mounted features as `li` with no slot at all
           (root 8 where the library counts 11). */
        /* an empty `data-slot` says "you are mounted on a slotless node" — the
           child must not stamp its own `root` there (a UAvatarGroup inside
           BlogPost is not a slot of BlogPost, and counted as one it doubled the
           root count on every post) */
        if (attrs['data-slot'] === '') delete attrs['data-slot'];
        if (props.to) attrs.href = props.to;
      }
      if (ctx.copy !== undefined && ctx.copy > 0) attrs['aria-hidden'] = 'true';
      if (ctx.item && typeof ctx.item === 'object') {
        if (ctx.item.active && attrs['data-state'] === undefined) attrs['data-state'] = 'active';
        else if (options.inactiveState && slot === options.inactiveState && attrs['data-state'] === undefined) attrs['data-state'] = 'inactive';
        if (ctx.item.disabled) attrs['data-disabled'] = 'true';
        if (ctx.item.selected) attrs['data-state'] = attrs['data-state'] || 'checked';
        /* only the anchor gets the href — on an li, div or span it is invalid
           and inert, and it was landing on every node in the item's subtree */
        if (ctx.item.to && tag === 'a') attrs.href = ctx.item.to;
      }
      if (tag === 'input' || tag === 'textarea') {
        /* ChatPrompt.vue:28 declares `autofocus` with `default: true` and
           forwards it (:45) — the field is focused from the start. The ring the
           form draws around it is NOT set here: it depends on which field ends
           up holding the document's single focus (see ChatPrompt.jsx). */
        if (props.autofocus !== undefined ? props.autofocus : defaults.autofocus) attrs.autoFocus = true;
        if (props.placeholder !== undefined) attrs.placeholder = props.placeholder;
        if (props.value !== undefined) attrs.value = props.value;
        else if (props.defaultValue !== undefined || props.modelValue !== undefined) attrs.defaultValue = model;
        if (props.onChange) attrs.onChange = props.onChange;
        if (props.disabled) attrs.disabled = true;
        if (props.type && tag === 'input') attrs.type = props.type;
        if (tag === 'input') return React.createElement('input', attrs);
        return React.createElement('textarea', attrs, undefined);
      }
      if (tag === 'button') { attrs.type = attrs.type || 'button'; if (props.disabled) attrs.disabled = true; }
      if (tag === 'a' && !attrs.href && props.to) attrs.href = props.to;
      if (tag === 'img') return React.createElement('img', attrs);
      if (/^(hr|br|col)$/.test(tag)) return React.createElement(tag, attrs);
      /* children are spread as separate arguments, not handed over as one
         array: an array child would demand a `key` on every element a caller
         passed into a slot, which no caller can reasonably supply */
      const built = React.createElement(tag, attrs, ...(hasInner ? inner : []));
      /* a relocated node is held back and flushed into its real container. Keyed
         by NODE TYPE, not by slot name: NavigationMenu's two content branches
         share the slot `content`, and only the horizontal one (a
         NavigationMenuContent) belongs in the viewport — the vertical
         AccordionContent sits in flow inside its item. */
      if (options.slotInto && options.slotInto[node.t]) { stashed.push(built); return null; }
      return built;
    };

    const ctx = { ui: baseUi, items: items || [] };
    /* two top-level nodes with one slot name are the v-if/v-else branches of the
       component's root (Sidebar declares `root` twice — the plain one and the
       railed one); the first that renders is the component */
    const seenRoots = new Set();
    const nodes = body.map((n, i) => {
      if (n && n.s && seenRoots.has(n.s)) return null;
      const before = primarySeen;
      const out = walk(n, `n${i}`, ctx);
      /* a v-if branch that dropped out must not take the caller's class and
         passthrough props with it: Sidebar's first root branch is empty, and it
         was swallowing `class` before the branch that actually renders */
      if (!out && !before && primarySeen) primarySeen = false;
      if (out && n && n.s) seenRoots.add(n.s);
      return out;
    }).filter(Boolean);
    /* An orphan Define…Template is a template whose Reuse was lost when the tree
       was extracted, not dead code: sixteen components (CommandPalette's Item,
       Tree's Item, PricingTable's Tier, Listbox's Item, NavigationMenu's Link, …)
       had their entire repeated body built and thrown away, which is why
       command-palette drew 22 slot nodes against the library's 374. Rendering
       them is the default; `orphanDefinesNeedOpen` still holds a floating panel's
       body back until it opens. */
    const orphanBuilt = [];
    for (const name of orphanDefines) {
      if (options.inlineOrphanDefines === false) continue;
      if (options.orphanDefinesNeedOpen && !open) continue;
      const body = defines[name] || [];
      /* "no Reuse node in the tree" is not the same as "not drawn": for
         NavigationMenu (Link), PricingPlan (Price) and friends the tree's own
         `for` node draws that body already, and inlining it appended a second,
         unstyled copy as a sibling of the component root — 42 linkLabels against
         24 links. Only a define whose slots appear nowhere in the tree is a
         genuinely lost one (Modal's content). */
      const bodySlots = [];
      (function collect(nodes) { for (const n of nodes || []) { if (n.s) bodySlots.push(n.s); collect(n.c); } })(body);
      if (bodySlots.some((s) => drawnSlots.has(s))) continue;
      /* a define the component addresses to a slot (inlineDefineInto:
         NavigationMenu puts Link inside `link`) is drawn there, not here — even
         when that slot did not render this time: SelectMenu's `CreateItem` has
         no row to sit in unless `create` is asked for, and inlining it as an
         orphan drew every list item a second time. The exception is a define the
         component REFUSED the address for (Modal's content beside the overlay in
         the plain branch) — that one is a genuine orphan. */
      if (options.inlineDefineInto && options.inlineDefineInto[name]
        && (usedInto.has(name) || !intoRefused.has(name))) continue;
      /* the lost Reuse almost always sat inside a v-for (`<ReuseItemTemplate
         v-for="item in items">`), so the template is the repeated body, not a
         one-off block: render it once per item where there are items, once where
         there are none (Modal's content).

         Unless the body carries its own loop: FileUpload's Files template is a
         single `files` wrapper with a `file` v-for inside it, and repeating the
         whole body gave one empty wrapper per file — the dropzone's height never
         moved, for three rounds. */
      const bodyLoops = body.some((n) => n.for || hasNestedFor(n));
      const list = !bodyLoops && ctx.items && ctx.items.length ? ctx.items : null;
      const built = list
        ? list.flatMap((item, i) => body.map((n, j) => walk(n, `d${name}${i}.${j}`, { ...ctx, item, index: i, count: list.length, inlined: true })).filter(Boolean))
        : body.map((n, i) => walk(n, `d${name}${i}`, { ...ctx, inlined: true })).filter(Boolean);
      orphanBuilt.push(...built);
    }
    /* The lost Reuse sat INSIDE the component, so its body belongs inside the
       root element, not after it: appended as a sibling, PricingPlan's price
       block rendered outside the plan card. Modal is the exception — its
       content is a sibling of the overlay inside the portal — and says so with
       `orphanDefinesOutside`. */
    if (orphanBuilt.length) {
      const rootIdx = nodes.findIndex((n) => n && typeof n === 'object' && n.props);
      if (options.orphanDefinesOutside || rootIdx === -1) nodes.push(...orphanBuilt);
      else {
        const root = nodes[rootIdx];
        const existing = React.Children.toArray(root.props.children);
        nodes[rootIdx] = React.cloneElement(root, { key: root.key }, ...existing, ...orphanBuilt);
      }
    }
    return nodes.length === 1 ? nodes[0] : React.createElement(React.Fragment, null, nodes);  };
}
