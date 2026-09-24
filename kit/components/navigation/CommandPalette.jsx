import React from 'react';
import { createRenderer } from '../../lib/factory.jsx';
import { lookup } from '../../lib/registry.js';
import { ICONS } from '../../lib/icons.js';
import { tvd, twMerge } from '../../lib/tv.js';
import { inputTheme } from '../forms/Input.jsx';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/command-palette.ts (source/themes.json -> "command-palette").
   Values are literal: no rounding, no cross-component alignment. */
export const commandPaletteTheme = {
  "slots": {
    "root": "flex flex-col min-h-0 min-w-0 divide-y divide-default",
    "input": "",
    "close": "",
    "back": "p-0",
    "content": "relative overflow-hidden flex flex-col",
    "footer": "p-1",
    "viewport": "relative scroll-py-1 overflow-y-auto flex-1 focus:outline-none",
    "group": "p-1 isolate",
    "empty": "text-center text-muted",
    "label": "font-semibold text-highlighted",
    "item": "group relative w-full flex items-start select-none outline-none before:absolute before:z-[-1] before:inset-px before:rounded-md data-disabled:cursor-not-allowed data-disabled:opacity-75",
    "itemLeadingIcon": "shrink-0",
    "itemLeadingAvatar": "shrink-0",
    "itemLeadingAvatarSize": "",
    "itemLeadingChip": "shrink-0",
    "itemLeadingChipSize": "",
    "itemTrailing": "ms-auto inline-flex items-center",
    "itemTrailingIcon": "shrink-0",
    "itemTrailingHighlightedIcon": "shrink-0 text-dimmed hidden group-data-highlighted:inline-flex",
    "itemTrailingKbds": "hidden lg:inline-flex items-center shrink-0",
    "itemTrailingKbdsSize": "",
    "itemWrapper": "flex-1 flex flex-col text-start min-w-0",
    "itemLabel": "truncate space-x-1 text-dimmed",
    "itemLabelBase": "text-highlighted [&>mark]:text-primary [&>mark]:bg-primary/15",
    "itemLabelPrefix": "text-default",
    "itemLabelSuffix": "text-dimmed [&>mark]:text-primary [&>mark]:bg-primary/15",
    "itemDescription": "truncate text-muted [&>mark]:text-primary [&>mark]:bg-primary/15"
  },
  "variants": {
    "virtualize": {
      "true": {
        "viewport": "p-1 isolate"
      },
      "false": {
        "viewport": "divide-y divide-default"
      }
    },
    "size": {
      "xs": {
        "input": "[&>input]:h-10",
        "empty": "py-3 text-xs",
        "label": "p-1 text-[10px]/3 gap-1",
        "item": "p-1 text-xs gap-1",
        "itemLeadingIcon": "size-4",
        "itemLeadingAvatarSize": "3xs",
        "itemLeadingChip": "size-4",
        "itemLeadingChipSize": "sm",
        "itemTrailing": "gap-1",
        "itemTrailingIcon": "size-4",
        "itemTrailingHighlightedIcon": "size-4",
        "itemTrailingKbds": "gap-0.5",
        "itemTrailingKbdsSize": "sm"
      },
      "sm": {
        "input": "[&>input]:h-11",
        "empty": "py-4 text-xs",
        "label": "p-1.5 text-[10px]/3 gap-1.5",
        "item": "p-1.5 text-xs gap-1.5",
        "itemLeadingIcon": "size-4",
        "itemLeadingAvatarSize": "3xs",
        "itemLeadingChip": "size-4",
        "itemLeadingChipSize": "sm",
        "itemTrailing": "gap-1.5",
        "itemTrailingIcon": "size-4",
        "itemTrailingHighlightedIcon": "size-4",
        "itemTrailingKbds": "gap-0.5",
        "itemTrailingKbdsSize": "sm"
      },
      "md": {
        "input": "[&>input]:h-12",
        "empty": "py-6 text-sm",
        "label": "p-1.5 text-xs gap-1.5",
        "item": "p-1.5 text-sm gap-1.5",
        "itemLeadingIcon": "size-5",
        "itemLeadingAvatarSize": "2xs",
        "itemLeadingChip": "size-5",
        "itemLeadingChipSize": "md",
        "itemTrailing": "gap-1.5",
        "itemTrailingIcon": "size-5",
        "itemTrailingHighlightedIcon": "size-5",
        "itemTrailingKbds": "gap-0.5",
        "itemTrailingKbdsSize": "md"
      },
      "lg": {
        "input": "[&>input]:h-13",
        "empty": "py-7 text-sm",
        "label": "p-2 text-xs gap-2",
        "item": "p-2 text-sm gap-2",
        "itemLeadingIcon": "size-5",
        "itemLeadingAvatarSize": "2xs",
        "itemLeadingChip": "size-5",
        "itemLeadingChipSize": "md",
        "itemTrailing": "gap-2",
        "itemTrailingIcon": "size-5",
        "itemTrailingHighlightedIcon": "size-5",
        "itemTrailingKbds": "gap-0.5",
        "itemTrailingKbdsSize": "md"
      },
      "xl": {
        "input": "[&>input]:h-14",
        "empty": "py-8 text-base",
        "label": "p-2 text-sm gap-2",
        "item": "p-2 text-base gap-2",
        "itemLeadingIcon": "size-6",
        "itemLeadingAvatarSize": "xs",
        "itemLeadingChip": "size-6",
        "itemLeadingChipSize": "lg",
        "itemTrailing": "gap-2",
        "itemTrailingIcon": "size-6",
        "itemTrailingHighlightedIcon": "size-6",
        "itemTrailingKbds": "gap-0.5",
        "itemTrailingKbdsSize": "lg"
      }
    },
    "active": {
      "true": {
        "item": "text-highlighted before:bg-elevated",
        "itemLeadingIcon": "text-default"
      },
      "false": {
        "item": [
          "text-default data-highlighted:not-data-disabled:text-highlighted data-highlighted:not-data-disabled:before:bg-elevated/50",
          "transition-colors before:transition-colors"
        ],
        "itemLeadingIcon": [
          "text-dimmed group-data-highlighted:not-group-data-disabled:text-default",
          "transition-colors"
        ]
      }
    },
    "loading": {
      "true": {
        "itemLeadingIcon": "animate-spin"
      }
    }
  },
  "defaultVariants": {
    "size": "md"
  }
};

/* DOM extracted from CommandPalette.vue — element nesting and data-slot names as shipped. */
const tree = [{"t":"DefineItemTemplate","c":[{"t":"ULink","c":[{"t":"ListboxItem","c":[{"t":"ULinkBase","s":"item","c":[{"t":"slot","c":[{"t":"slot","c":[{"t":"UIcon","s":"itemLeadingIcon","if":1},{"t":"UIcon","s":"itemLeadingIcon","if":1},{"t":"UAvatar","s":"itemLeadingAvatar","if":1},{"t":"UChip","s":"itemLeadingChip","if":1}]},{"t":"span","s":"itemWrapper","if":1,"c":[{"t":"span","s":"itemLabel","c":[{"t":"slot","c":[{"t":"span","s":"itemLabelPrefix","if":1},{"t":"span","s":"itemLabelBase","if":1},{"t":"span","s":"itemLabelBase"},{"t":"span","s":"itemLabelSuffix","if":1},{"t":"span","s":"itemLabelSuffix","if":1}]}]},{"t":"span","s":"itemDescription","if":1},{"t":"span","s":"itemDescription","if":1}]},{"t":"span","s":"itemTrailing","c":[{"t":"slot","c":[{"t":"UIcon","s":"itemTrailingIcon","if":1},{"t":"span","s":"itemTrailingKbds","if":1},{"t":"UIcon","s":"itemTrailingHighlightedIcon","if":1}]},{"t":"ListboxItemIndicator","if":1,"c":[{"t":"UIcon","s":"itemTrailingIcon"}]}]}]}]}]}]}]},{"t":"ListboxRoot","s":"root","c":[{"t":"ListboxFilter","if":1,"c":[{"t":"UInput","s":"input","fwd":["placeholder","loading","loadingIcon"],"p":{"variant":"none","autofocus":true,"icon":"i-lucide-search"},"c":[{"t":"template","if":1,"c":[{"t":"slot","c":[{"t":"UButton","s":"back"}]}]},{"t":"template","if":1,"c":[{"t":"slot","c":[{"t":"UButton","s":"close","if":1}]}]}]}]},{"t":"ListboxContent","s":"content","c":[{"t":"div","s":"viewport","if":1,"c":[{"t":"template","c":[{"t":"ListboxGroup","s":"group","for":1,"c":[{"t":"ListboxGroupLabel","s":"label","if":1}]}]}]},{"t":"div","s":"empty"}]},{"t":"div","s":"footer","if":1}]}];

/* the item template is reused INSIDE the group (CommandPalette.vue mirrors
   Listbox here), and the group loop walks `groups` — extraction lost the Reuse,
   so a palette drew one bare item and no group at all. */

/* walk a rendered element tree and let `fn` replace a node (return undefined
   to keep it and descend). Children go back as separate arguments, as the
   renderer built them, so no key is demanded of unkeyed siblings. */
function mapEls(node, fn) {
  if (Array.isArray(node)) return node.map((n) => mapEls(n, fn));
  if (!React.isValidElement(node)) return node;
  const r = fn(node);
  if (r !== undefined) return r;
  const ch = node.props.children;
  if (ch === undefined || ch === null) return node;
  const next = mapEls(ch, fn);
  return React.cloneElement(node, undefined, ...(Array.isArray(next) ? next : [next]));
}

/* the item elements anywhere under a node — the search stops at an item */
function collectItems(node, out) {
  if (Array.isArray(node)) { node.forEach((n) => collectItems(n, out)); return out; }
  if (!React.isValidElement(node)) return out;
  if (node.props['data-slot'] === 'item') { out.push(node); return out; }
  collectItems(node.props.children, out);
  return out;
}

/* reka's ListboxVirtualizer: no groups and no labels — the items of every group
   in one flat list, inside a slotless div of `position: relative; width: 100%;
   height: <sum of item heights>px`. The item heights are the theme's size
   ladder (padding + line height). */
const VIRTUAL_ITEM_HEIGHT = { xs: 24, sm: 28, md: 32, lg: 36, xl: 40 };
function virtualizeGroups(el, holderSlot, size, hasValue) {
  return mapEls(el, (n) => {
    if (n.props['data-slot'] !== holderSlot) return undefined;
    let placed = false;
    const replaceGroups = (node) => mapEls(node, (m) => {
      if (m.props['data-slot'] !== 'group') return undefined;
      if (placed) return null;
      placed = true;
      return null;
    });
    let items = collectItems(n.props.children, []).map((it, i) => React.cloneElement(it, { key: 'v' + i }));
    if (!items.length) return n;
    /* ListboxVirtualizer.js:101-120 — with no selected value, the next frame
       highlights the first item that is not disabled */
    if (!hasValue && !items.some((it) => it.props['data-highlighted'] !== undefined)) {
      const first = items.findIndex((it) => it.props['data-disabled'] === undefined || it.props['data-disabled'] === false);
      if (first >= 0) items = items.map((it, i) => (i === first ? React.cloneElement(it, { 'data-highlighted': '' }) : it));
    }
    let kids = replaceGroups(n.props.children);
    kids = (Array.isArray(kids) ? kids : [kids]).filter((k) => k !== null);
    const h = VIRTUAL_ITEM_HEIGHT[size || 'md'] || 32;
    const wrapper = React.createElement('div', { key: 'virtualizer', style: { position: 'relative', width: '100%', height: items.length * h + 'px' } }, ...items);
    return React.cloneElement(n, undefined, ...kids, wrapper);
  });
}

/* CommandPalette.vue:282-283 — two itemLabelSuffix branches: v-html suffixHtml,
   else the plain suffix text */
const SUFFIX_NODES = [];
(function find(nodes) { for (const n of nodes || []) { if (n.s === 'itemLabelSuffix') SUFFIX_NODES.push(n); find(n.c); } })(tree);
const hasChildren = (item) => !!(item && item.children && item.children.length);
/* CommandPalette.vue:260-261 — two itemLeadingIcon branches: the spinner for
   `item.loading`, else the item's icon */
const LEAD_NODES = [];
(function find(nodes) { for (const n of nodes || []) { if (n.s === 'itemLeadingIcon') LEAD_NODES.push(n); find(n.c); } })(tree);

const render = createRenderer('command-palette', commandPaletteTheme, tree, {
  portal: true,
  /* no `contentNeedsOpen`: CommandPalette has no `open` prop at all — its list
     is always drawn, and inside DashboardSearch the openness belongs to the
     modal around it. Gating on a prop the component does not have cut the
     content, viewport, groups and every item. */
  inlineDefineInto: { Item: 'group' },
  /* CommandPalette.vue:92-95 — the root tv() gets `size`, `virtualize`; items
     resolve `active || item.active` and `loading: true` only on the loading
     branch (:257-283). The palette's `loading` goes to the input alone. */
  itemOnlyVariants: ['active', 'loading'],
  itemVariants: (item) => (item && typeof item === 'object' ? { active: !!item.active, loading: !!item.loading } : null),
  /* the palette's input IS the first focusable element of an open dialog, but
     its own theme suppresses the focus ring, so nothing is drawn there — and
     because it takes the focus, the dialog's close button does not ring either
     (DashboardSearch passes `focusSlot: 'none'` for that) */
  /* `back` is declared `default: true`, but the button only appears once there
     is navigation history to go back to — a static render has none, so it shows
     only when the caller configures it outright */
  renderIf(slot, { props, item, node }) {
    if (slot === 'back') return props.back !== null && typeof props.back === 'object';
    if (slot === 'itemLeadingIcon' && node === LEAD_NODES[0] && item !== undefined) return !!(item && item.loading);
    /* CommandPalette.vue's itemTrailing is a v-if/v-else-if over the ITEM: the
       chevron only for an item with children, otherwise its kbds — the kit had
       it backwards, a chevron on all ten rows and kbds nowhere */
    if (slot === 'itemTrailingIcon' && node && node.if) return hasChildren(item);
    /* :311-313 — ListboxItemIndicator (`v-if="!item.children?.length"`, as-child)
       holds the selectedIcon; reka draws it only for a selected item */
    if (node && node.t === 'ListboxItemIndicator') return !hasChildren(item);
    if (slot === 'itemTrailingIcon') return !!(item && item.selected) && !hasChildren(item);
    if (slot === 'itemLabelSuffix' && item !== undefined) {
      return node === SUFFIX_NODES[0] ? !!item.suffixHtml : (!item.suffixHtml && item.suffix !== undefined && item.suffix !== null && item.suffix !== '');
    }
    if (slot === 'itemTrailingKbds') return !!(item && item.kbds && item.kbds.length);
    if (slot === 'itemTrailingHighlightedIcon') return false;
    /* CommandPalette.vue:279-280 — the first itemLabelBase is the v-if for a
       search match (highlighted HTML); without a search term the plain one
       renders */
    if (slot === 'itemLabelBase' && node && node.if) return false;
    /* the viewport and its groups come from a `v-for` over the groups: an empty
       list runs no iteration at all, so a palette with `groups={[]}` has no
       group, no label and no viewport — only the empty state */
    if (slot === 'viewport' || slot === 'group' || slot === 'label') {
      const groups = props.groups || props.items || [];
      return groups.some((g) => (g && Array.isArray(g.items) ? g.items.length : 1) > 0);
    }
    /* the empty state is the else of a non-empty list */
    if (slot === 'empty') {
      const groups = props.groups || props.items || [];
      return !groups.some((g) => (g && Array.isArray(g.items) ? g.items.length : 1) > 0);
    }
    return undefined;
  },
  /* the kbds span held a `v-for` over item.kbds that extraction dropped */
  slotContent(slot, { props, item }) {
    /* CommandPalette.vue:403-407 — the default text is `searchTerm ?
       t("commandPalette.noMatch") : t("commandPalette.noData")`; en: "No
       matching data" / "No data" */
    if (slot === 'empty') return props.searchTerm ? 'No matching data' : 'No data';
    if (slot === 'itemLeadingIcon' && item && item.loading) return props.loadingIcon || ICONS.loading;
    if (slot === 'itemLabelSuffix' && item !== undefined) return item.suffixHtml ? null : item.suffix;
    /* the indicator's icon: `selectedIcon || icons.check`; an item with children
       keeps the chevron the theme's default gives it */
    if (slot === 'itemTrailingIcon' && item !== undefined && !hasChildren(item)) return props.selectedIcon || ICONS.check;
    /* CommandPalette.vue:277-283 — itemLabel carries no text of its own; the
       label is `get(item, props.labelKey)` inside itemLabelBase */
    if (slot === 'itemLabel' && item !== undefined) return null;
    if (slot === 'itemLabelBase' && item !== undefined) {
      const path = String(props.labelKey || 'label').split('.');
      const v = path.reduce((o, k) => (o !== null && o !== undefined ? o[k] : undefined), item);
      return v === undefined || v === null ? null : v;
    }
    if (slot !== 'itemTrailingKbds' || !item || !item.kbds || !item.kbds.length) return undefined;
    const Kbd = lookup('Kbd');
    if (!Kbd) return item.kbds.join(' ');
    /* CommandPalette.vue:305 — item.ui, then props.ui, then the theme's size ladder */
    const sizes = commandPaletteTheme.variants.size;
    const size = (item.ui && item.ui.itemTrailingKbdsSize) || (props.ui && props.ui.itemTrailingKbdsSize)
      || (sizes[props.size] || sizes[commandPaletteTheme.defaultVariants.size]).itemTrailingKbdsSize;
    return item.kbds.map((value, i) => React.createElement(Kbd, { key: i, size, ...(typeof value === 'string' ? { value } : value) }));
  },
  slotAttrs(slot, props, variants, { item } = {}) {
    if (slot === 'itemLabelSuffix' && item && item.suffixHtml) return { dangerouslySetInnerHTML: { __html: item.suffixHtml } };
    /* reka's ListboxItem writes data-state on every item: checked / unchecked */
    if (slot === 'item' && item && typeof item === 'object' && !item.selected && !item.active) return { 'data-state': 'unchecked' };
    return undefined;
  },
  listFor(node, { props }) {
    if (node.s === 'group') return props.groups || props.items;
    return undefined;
  }
});

/* CommandPalette.vue:106 — the placeholder is a computed CHAIN, not a prop: the
   current history frame's, else the prop, else the localized default. Left to
   the bare prop the input carried no `placeholder` attribute at all wherever
   the caller set none — which is every DashboardSearch.
   en.json -> commandPalette.placeholder */
const DEFAULT_PLACEHOLDER = 'Type a command or search…';

/* Input.vue — a filled #trailing slot draws span[trailing] and sets the base's
   `trailing` variant (`!!slots.trailing`), while the icon stays leading */
const resolveInput = tvd('input', inputTheme);
const TRAILING_PAD = { xs: 'pe-7', sm: 'pe-8', md: 'pe-9', lg: 'pe-10', xl: 'pe-11' };
function SlottedInput(allProps) {
  const { $input: Comp, $trailing: cross, ...p } = allProps;
  const el = Comp(p);
  if (!React.isValidElement(el)) return el;
  const size = p.size || inputTheme.defaultVariants.size;
  const ui = resolveInput({ ...p, size, trailing: true });
  const uiProp = p.ui || {};
  const withPad = mapEls(el, (n) => (n.props['data-slot'] === 'base'
    ? React.cloneElement(n, { className: twMerge([n.props.className, TRAILING_PAD[size] || '']) }) : undefined));
  const span = React.createElement('span', { key: 'trailing', 'data-slot': 'trailing', className: ui.trailing(uiProp.trailing) }, cross);
  return React.cloneElement(withPad, undefined, ...React.Children.toArray(withPad.props.children), span);
}

export function CommandPalette(props) {
  const history = props.history;
  const fromHistory = Array.isArray(history) && history.length
    ? history[history.length - 1] && history[history.length - 1].placeholder : undefined;
  /* CommandPalette.vue:257 — `active: active || item.active`, where ULink's
     `active` is false for an item without `to` (Link.vue:111). Selection never
     sets the variant; pinning `active: false` stops the renderer inferring it
     from the model. */
  const pin = (list) => (Array.isArray(list) ? list.map((g) => (g && Array.isArray(g.items)
    ? { ...g, items: g.items.map((it) => (it && typeof it === 'object' && it.active === undefined ? { ...it, active: false } : it)) }
    : g)) : list);
  const el0 = render({ ...props, groups: pin(props.groups), ...(props.items ? { items: pin(props.items) } : {}), placeholder: fromHistory || props.placeholder || DEFAULT_PLACEHOLDER });
  /* CommandPalette.vue:353-366 — with `close` the cross is the input's
     `#trailing` slot: a UButton at the palette's size, neutral / ghost,
     `closeIcon || icons.close`, data-slot="close" */
  const el = props.close ? mapEls(el0, (n) => {
    if (n.props['data-slot'] !== 'input') return undefined;
    const Button = lookup('Button');
    if (!Button) return undefined;
    const dropClose = (k) => mapEls(k, (c) => (c.props['data-slot'] === 'close' ? null : undefined));
    const kids = React.Children.toArray(dropClose(n.props.children));
    const cross = React.createElement(Button, {
      size: props.size, color: 'neutral', variant: 'ghost', 'aria-label': 'Close',
      ...(typeof props.close === 'object' ? props.close : {}),
      icon: props.closeIcon || ICONS.close, 'data-slot': 'close',
      class: (props.ui && props.ui.close) || undefined
    });
    /* the cross is the CONTENT of Input's #trailing slot, not its boolean
       `trailing` prop: given as the prop it moved the search icon to the right
       (useComponentIcons: icon && trailing) */
    if (typeof n.type !== 'function') return React.cloneElement(n, { trailing: cross }, ...kids);
    return React.createElement(SlottedInput, { ...n.props, key: n.key, $input: n.type, $trailing: cross }, ...kids);
  }) : el0;
  /* CommandPalette.vue:373-398 — with `virtualize` the groups are flattened
     (`filteredGroups.flatMap(group => group.items)`) into the virtualizer */
  const out = props.virtualize ? virtualizeGroups(el, 'viewport', props.size,
    props.modelValue !== undefined && props.modelValue !== null) : el;
  /* reka highlights the (first) selected item on mount */
  const items = collectItems(out, []);
  if (items.some((it) => it.props['data-highlighted'] !== undefined)) return out;
  const first = items.find((it) => it.props['data-state'] === 'checked');
  return first ? mapEls(out, (n) => (n === first ? React.cloneElement(n, { 'data-highlighted': '' }) : undefined)) : out;
}
