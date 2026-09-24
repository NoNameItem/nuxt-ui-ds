import React from 'react';
import { createRenderer } from '../../lib/factory.jsx';
import { Input } from './Input.jsx';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/select-menu.ts (source/themes.json -> "select-menu").
   Values are literal: no rounding, no cross-component alignment. */
export const selectMenuTheme = {
  "slots": {
    "base": [
      "relative group rounded-md inline-flex items-center disabled:cursor-not-allowed disabled:opacity-75",
      "transition-colors"
    ],
    "leading": "absolute inset-y-0 start-0 flex items-center",
    "leadingIcon": "shrink-0 text-dimmed",
    "leadingAvatar": "shrink-0",
    "leadingAvatarSize": "",
    "trailing": "absolute inset-y-0 end-0 flex items-center",
    "trailingIcon": "shrink-0 text-dimmed",
    "value": "truncate pointer-events-none",
    "placeholder": "truncate text-dimmed",
    "arrow": "fill-bg stroke-default",
    "content": [
      "max-h-[min(15rem,var(--reka-select-content-available-height,15rem))] w-(--reka-select-trigger-width) bg-default shadow-lg rounded-md ring ring-default overflow-hidden origin-(--reka-select-content-transform-origin) pointer-events-auto flex flex-col",
      "max-h-[min(15rem,var(--reka-combobox-content-available-height,15rem))] origin-(--reka-combobox-content-transform-origin) w-(--reka-combobox-trigger-width)"
    ],
    "viewport": "relative scroll-py-1 overflow-y-auto flex-1",
    "group": "p-1 isolate",
    "empty": "text-center text-muted",
    "label": "font-semibold text-highlighted",
    "separator": "-mx-1 my-1 h-px bg-border",
    "item": [
      "group relative w-full flex items-start select-none outline-none before:absolute before:z-[-1] before:inset-px before:rounded-md data-disabled:cursor-not-allowed data-disabled:opacity-75 text-default data-highlighted:not-data-disabled:text-highlighted data-highlighted:not-data-disabled:before:bg-elevated/50",
      "transition-colors before:transition-colors"
    ],
    "itemLeadingIcon": [
      "shrink-0 text-dimmed group-data-highlighted:not-group-data-disabled:text-default",
      "transition-colors"
    ],
    "itemLeadingAvatar": "shrink-0",
    "itemLeadingAvatarSize": "",
    "itemLeadingChip": "shrink-0",
    "itemLeadingChipSize": "",
    "itemTrailing": "ms-auto inline-flex gap-1.5 items-center",
    "itemTrailingIcon": "shrink-0",
    "itemWrapper": "flex-1 flex flex-col min-w-0",
    "itemLabel": "truncate",
    "itemDescription": "truncate text-muted",
    "input": "border-b border-default",
    "focusScope": "flex flex-col min-h-0",
    "trailingClear": "p-0"
  },
  "variants": {
    "fieldGroup": {
      "horizontal": "not-only:first:rounded-e-none not-only:last:rounded-s-none not-last:not-first:rounded-none focus-visible:z-[1]",
      "vertical": "not-only:first:rounded-b-none not-only:last:rounded-t-none not-last:not-first:rounded-none focus-visible:z-[1]"
    },
    "size": {
      "xs": {
        "base": "px-2 py-1 text-sm/4 gap-1",
        "leading": "ps-2",
        "trailing": "pe-2",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4",
        "label": "p-1 text-[10px]/3 gap-1",
        "item": "p-1 text-xs gap-1",
        "itemLeadingIcon": "size-4",
        "itemLeadingAvatarSize": "3xs",
        "itemLeadingChip": "size-4",
        "itemLeadingChipSize": "sm",
        "itemTrailingIcon": "size-4",
        "empty": "p-2 text-xs"
      },
      "sm": {
        "base": "px-2.5 py-1.5 text-sm/4 gap-1.5",
        "leading": "ps-2.5",
        "trailing": "pe-2.5",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs",
        "trailingIcon": "size-4",
        "label": "p-1.5 text-[10px]/3 gap-1.5",
        "item": "p-1.5 text-xs gap-1.5",
        "itemLeadingIcon": "size-4",
        "itemLeadingAvatarSize": "3xs",
        "itemLeadingChip": "size-4",
        "itemLeadingChipSize": "sm",
        "itemTrailingIcon": "size-4",
        "empty": "p-2.5 text-xs"
      },
      "md": {
        "base": "px-2.5 py-1.5 text-base/5 gap-1.5",
        "leading": "ps-2.5",
        "trailing": "pe-2.5",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5",
        "label": "p-1.5 text-xs gap-1.5",
        "item": "p-1.5 text-sm gap-1.5",
        "itemLeadingIcon": "size-5",
        "itemLeadingAvatarSize": "2xs",
        "itemLeadingChip": "size-5",
        "itemLeadingChipSize": "md",
        "itemTrailingIcon": "size-5",
        "empty": "p-2.5 text-sm"
      },
      "lg": {
        "base": "px-3 py-2 text-base/5 gap-2",
        "leading": "ps-3",
        "trailing": "pe-3",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs",
        "trailingIcon": "size-5",
        "label": "p-2 text-xs gap-2",
        "item": "p-2 text-sm gap-2",
        "itemLeadingIcon": "size-5",
        "itemLeadingAvatarSize": "2xs",
        "itemLeadingChip": "size-5",
        "itemLeadingChipSize": "md",
        "itemTrailingIcon": "size-5",
        "empty": "p-3 text-sm"
      },
      "xl": {
        "base": "px-3 py-2 text-base gap-2",
        "leading": "ps-3",
        "trailing": "pe-3",
        "leadingIcon": "size-6",
        "leadingAvatarSize": "xs",
        "trailingIcon": "size-6",
        "label": "p-2 text-sm gap-2",
        "item": "p-2 text-base gap-2",
        "itemLeadingIcon": "size-6",
        "itemLeadingAvatarSize": "xs",
        "itemLeadingChip": "size-6",
        "itemLeadingChipSize": "lg",
        "itemTrailingIcon": "size-6",
        "empty": "p-3 text-base"
      }
    },
    "variant": {
      "outline": "text-highlighted bg-default ring ring-inset ring-accented hover:bg-elevated disabled:bg-default",
      "soft": "text-highlighted bg-elevated/50 hover:bg-elevated focus:bg-elevated disabled:bg-elevated/50",
      "subtle": "text-highlighted bg-elevated ring ring-inset ring-accented hover:bg-accented/75 disabled:bg-elevated",
      "ghost": "text-highlighted bg-transparent hover:bg-elevated focus:bg-elevated disabled:bg-transparent dark:disabled:bg-transparent",
      "none": "text-highlighted bg-transparent focus:outline-none"
    },
    "color": {
      "primary": "",
      "secondary": "",
      "success": "",
      "info": "",
      "warning": "",
      "error": "",
      "neutral": ""
    },
    "leading": {
      "true": ""
    },
    "trailing": {
      "true": ""
    },
    "loading": {
      "true": ""
    },
    "highlight": {
      "true": ""
    },
    "fixed": {
      "false": ""
    },
    "type": {
      "file": "file:me-1.5 file:font-medium file:text-muted file:outline-none"
    },
    "position": {
      "popper": {
        "content": "data-[state=open]:animate-[scale-in_100ms_var(--ease-out)] data-[state=closed]:animate-[scale-out_100ms_var(--ease-out)]"
      },
      "item-aligned": {
        "content": ""
      }
    },
    "multiple": {
      "true": ""
    },
    "virtualize": {
      "true": {
        "viewport": "p-1 isolate"
      },
      "false": {
        "viewport": "divide-y divide-default"
      }
    }
  },
  "compoundVariants": [
    {
      "color": "primary",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "outline-primary/25 focus-visible:outline-3 focus-visible:ring-primary"
    },
    {
      "color": "secondary",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "outline-secondary/25 focus-visible:outline-3 focus-visible:ring-secondary"
    },
    {
      "color": "success",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "outline-success/25 focus-visible:outline-3 focus-visible:ring-success"
    },
    {
      "color": "info",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "outline-info/25 focus-visible:outline-3 focus-visible:ring-info"
    },
    {
      "color": "warning",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "outline-warning/25 focus-visible:outline-3 focus-visible:ring-warning"
    },
    {
      "color": "error",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "outline-error/25 focus-visible:outline-3 focus-visible:ring-error"
    },
    {
      "color": "primary",
      "variant": [
        "soft",
        "ghost"
      ],
      "class": "outline-primary/25 focus-visible:outline-3"
    },
    {
      "color": "secondary",
      "variant": [
        "soft",
        "ghost"
      ],
      "class": "outline-secondary/25 focus-visible:outline-3"
    },
    {
      "color": "success",
      "variant": [
        "soft",
        "ghost"
      ],
      "class": "outline-success/25 focus-visible:outline-3"
    },
    {
      "color": "info",
      "variant": [
        "soft",
        "ghost"
      ],
      "class": "outline-info/25 focus-visible:outline-3"
    },
    {
      "color": "warning",
      "variant": [
        "soft",
        "ghost"
      ],
      "class": "outline-warning/25 focus-visible:outline-3"
    },
    {
      "color": "error",
      "variant": [
        "soft",
        "ghost"
      ],
      "class": "outline-error/25 focus-visible:outline-3"
    },
    {
      "color": "primary",
      "highlight": true,
      "class": "ring ring-inset ring-primary"
    },
    {
      "color": "secondary",
      "highlight": true,
      "class": "ring ring-inset ring-secondary"
    },
    {
      "color": "success",
      "highlight": true,
      "class": "ring ring-inset ring-success"
    },
    {
      "color": "info",
      "highlight": true,
      "class": "ring ring-inset ring-info"
    },
    {
      "color": "warning",
      "highlight": true,
      "class": "ring ring-inset ring-warning"
    },
    {
      "color": "error",
      "highlight": true,
      "class": "ring ring-inset ring-error"
    },
    {
      "color": "neutral",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "outline-inverted/25 focus-visible:outline-3 focus-visible:ring-inverted"
    },
    {
      "color": "neutral",
      "variant": [
        "soft",
        "ghost"
      ],
      "class": "outline-inverted/25 focus-visible:outline-3"
    },
    {
      "color": "neutral",
      "highlight": true,
      "class": "ring ring-inset ring-inverted"
    },
    {
      "leading": true,
      "size": "xs",
      "class": "ps-7"
    },
    {
      "leading": true,
      "size": "sm",
      "class": "ps-8"
    },
    {
      "leading": true,
      "size": "md",
      "class": "ps-9"
    },
    {
      "leading": true,
      "size": "lg",
      "class": "ps-10"
    },
    {
      "leading": true,
      "size": "xl",
      "class": "ps-11"
    },
    {
      "trailing": true,
      "size": "xs",
      "class": "pe-7"
    },
    {
      "trailing": true,
      "size": "sm",
      "class": "pe-8"
    },
    {
      "trailing": true,
      "size": "md",
      "class": "pe-9"
    },
    {
      "trailing": true,
      "size": "lg",
      "class": "pe-10"
    },
    {
      "trailing": true,
      "size": "xl",
      "class": "pe-11"
    },
    {
      "loading": true,
      "leading": true,
      "class": {
        "leadingIcon": "animate-spin"
      }
    },
    {
      "loading": true,
      "leading": false,
      "trailing": true,
      "class": {
        "trailingIcon": "animate-spin"
      }
    },
    {
      "fixed": false,
      "size": "xs",
      "class": "md:text-xs"
    },
    {
      "fixed": false,
      "size": "sm",
      "class": "md:text-xs"
    },
    {
      "fixed": false,
      "size": "md",
      "class": "md:text-sm"
    },
    {
      "fixed": false,
      "size": "lg",
      "class": "md:text-sm"
    }
  ],
  "defaultVariants": {
    "size": "md",
    "color": "primary",
    "variant": "outline",
    "position": "popper"
  }
};

/* DOM extracted from SelectMenu.vue — element nesting and data-slot names as shipped. */
const tree = [{"t":"DefineCreateItemTemplate","c":[{"t":"ComboboxItem","s":"item","c":[{"t":"span","s":"itemLabel"}]}]},{"t":"DefineItemTemplate","c":[{"t":"ComboboxLabel","s":"label","if":1},{"t":"ComboboxSeparator","s":"separator","if":1},{"t":"ComboboxItem","s":"item","c":[{"t":"slot","c":[{"t":"slot","c":[{"t":"UIcon","s":"itemLeadingIcon","if":1},{"t":"UAvatar","s":"itemLeadingAvatar","if":1},{"t":"UChip","s":"itemLeadingChip","if":1}]},{"t":"span","s":"itemWrapper","c":[{"t":"span","s":"itemLabel"},{"t":"span","s":"itemDescription","if":1}]},{"t":"span","s":"itemTrailing","c":[{"t":"ComboboxItemIndicator","c":[{"t":"UIcon","s":"itemTrailingIcon"}]}]}]}]}]},{"t":"ComboboxRoot","c":[{"t":"ComboboxAnchor","c":[{"t":"ComboboxTrigger","s":"base","c":[{"t":"span","s":"leading","if":1,"c":[{"t":"slot","c":[{"t":"UIcon","s":"leadingIcon","if":1},{"t":"UAvatar","s":"itemLeadingAvatar","if":1}]}]},{"t":"slot","c":[{"t":"template","for":1,"c":[{"t":"span","s":"value","if":1},{"t":"span","s":"placeholder"}]}]},{"t":"span","s":"trailing","if":1,"c":[{"t":"slot","c":[{"t":"ComboboxCancel","if":1,"c":[{"t":"span","s":"trailingClear"}]},{"t":"UIcon","s":"trailingIcon","if":1}]}]}]}]},{"t":"ComboboxPortal","c":[{"t":"FieldGroupReset","c":[{"t":"ComboboxContent","s":"content","c":[{"t":"FocusScope","s":"focusScope","c":[{"t":"ComboboxInput","if":1,"c":[{"t":"UInput","s":"input"}]},{"t":"ComboboxEmpty","s":"empty"},{"t":"div","s":"viewport","c":[{"t":"template","c":[{"t":"ComboboxGroup","s":"group","if":1},{"t":"ComboboxGroup","s":"group","for":1},{"t":"ComboboxGroup","s":"group","if":1}]}]}]},{"t":"ComboboxArrow","s":"arrow","if":1}]}]}]}]}];

const selectMenuOptions = {
  contentNeedsOpen: true,
  orphanDefinesNeedOpen: true,
  /* the item template is reused INSIDE the group; with no target the renderer
     fell back to inlining the FIRST define — the bare "create item" row — so
     every option came out as an `item` with only a label, and the wrapper,
     leading icon and trailing indicator of all ten were missing */
  /* `CreateItem` is the "create <term>" row, drawn only when `create` is on:
     named with a slot the tree does not have, it is never inlined — left
     unclaimed, the orphan pass drew its bare item on top of every real one
     (item 10 against the library's 5). */
  inlineDefineInto: { Item: 'group', CreateItem: 'createItemRow' },
  nodeFilter(node, { props }) {
    /* the search input is `searchInput` (declared default: true) and its
       ComboboxInput wrapper is what carries the gate */
    if (node.t === 'ComboboxInput') return props.searchInput !== false;
    /* three ComboboxGroup nodes sit side by side: the `create item` row and the
       `create` hint (both v-if on `props.create`) around the real loop */
    if (node.t === 'ComboboxGroup' && node.if) return !!props.create;
    return true;
  },

  /* the value template loops over the DISPLAYED values, not over the items: with
     the item list it drew a value (or a placeholder) per option */
  listFor(node, { props }) {
    const slots = [];
    (function collect(ns) { for (const n of ns || []) { if (n.s) slots.push(n.s); collect(n.c); } })(node.c);
    if (slots.includes('value') && slots.includes('placeholder')) {
      const model = props.modelValue !== undefined ? props.modelValue : props.defaultValue;
      /* SelectMenu.vue:386 — `v-for="displayedModelValue in [displayValue(modelValue)]"`:
         ONE entry, whatever the model holds */
      return [Array.isArray(model) && !model.length ? undefined : model];
    }
    return undefined;
  },
  renderIf(slot, { props, item }) {
    /* three branches of one v-if/v-else-if/v-else over the ITEM's type
       (SelectMenu.vue:303-317): a `label` item is a heading, a `separator` item a
       divider, anything else a row. They must exclude each other — drawn
       together the kit printed a heading and a divider for every option. */
    if (slot === 'label') return !!(item && item.type === 'label');
    if (slot === 'separator') return !!(item && item.type === 'separator');
    if (slot === 'item') return !(item && (item.type === 'label' || item.type === 'separator'));
    /* `v-if="displayedModelValue !== undefined"` / `v-else` (SelectMenu.vue:387):
       exactly one of the value and the placeholder, and the kit drew both */
    const model = props.modelValue !== undefined ? props.modelValue : props.defaultValue;
    const hasValue = model !== undefined && model !== null && model !== ''
      && !(Array.isArray(model) && !model.length);
    if (slot === 'value') return hasValue;
    if (slot === 'placeholder') return !hasValue;
    /* the clear button needs BOTH a `clear` prop (declared with no default) and
       a non-empty value (SelectMenu.vue:396-410) */
    if (slot === 'trailingClear') return !!props.clear && hasValue;
    /* the search input is `searchInput` (default true), and the empty row is the
       else of a non-empty list */
    if (slot === 'input') return props.searchInput !== false;
    if (slot === 'empty') return !((props.items || props.groups || []).length);
    if (slot === 'itemTrailingIcon') return !!(item && (item.selected || item.active));
    return undefined;
  },
  slotAttrs(slot, props, variants, { item }) {
    /* reka's ComboboxContent (popper) and the item it highlights on open */
    if (slot === 'content') return { 'data-state': 'open', 'data-side': props['data-side'] || 'bottom', style: { '--reka-combobox-trigger-width': 'var(--reka-popper-anchor-width)' } };
    if (slot === 'item' && item !== undefined && sameItem(props, item, highlightedItem(props))) return { 'data-highlighted': '' };
    return null;
  }
};

const flatItems = (items) => (items || []).flatMap((x) => (Array.isArray(x) ? x : [x]));
const isRow = (it) => !(it && typeof it === 'object' && (it.type === 'label' || it.type === 'separator'));
const valueOf = (props, it) => (it && typeof it === 'object' ? it[props.valueKey || 'value'] : it);
function sameItem(props, a, b) {
  if (a === b) return true;
  if (!a || !b || typeof a !== 'object' || typeof b !== 'object') return false;
  const k = props.valueKey || 'value';
  return a[k] !== undefined ? a[k] === b[k] : a.label === b.label;
}
function highlightedItem(props) {
  const rows = flatItems(props.items).filter(isRow);
  const model = props.modelValue !== undefined ? props.modelValue : props.defaultValue;
  const first = Array.isArray(model) ? model[0] : model;
  const sel = first === undefined ? undefined : rows.find((it) => valueOf(props, it) === first);
  return sel !== undefined ? sel : rows.find((it) => !(it && typeof it === 'object' && it.disabled));
}

/* trigger and panel rendered apart, as in Select: the panel sits in reka's
   fixed popper wrapper. The panel tree keeps the item defines, and a gated-off
   `base` node so the trigger's `base` is not painted onto the content. */
const comboRoot = tree[2];
const triggerTree = [{ ...comboRoot, c: [comboRoot.c[0]] }];
const contentTree = [tree[0], tree[1], comboRoot.c[1].c[0].c[0], { t: 'div', s: 'base', if: 1 }];
const renderTrigger = createRenderer('select-menu', selectMenuTheme, triggerTree, selectMenuOptions);
const contentOptions = {
  ...selectMenuOptions,
  renderIf(slot, ctx) { return slot === 'base' ? false : selectMenuOptions.renderIf(slot, ctx); }
};
const renderContent = createRenderer('select-menu', selectMenuTheme, contentTree, contentOptions);

/* SelectMenu.vue:447-458 — with `virtualize` the rows are drawn by
   ComboboxVirtualizer straight inside `viewport`: one plain div (no slot) and
   no ComboboxGroup around them. */
const withVirtualizer = (nodes) => nodes.map((n) => (n.s === 'viewport'
  ? { ...n, c: [{ t: 'div', s: 'virtualizer', for: 1 }] }
  : (n.c ? { ...n, c: withVirtualizer(n.c) } : n)));
const renderVirtualContent = createRenderer('select-menu', selectMenuTheme, withVirtualizer(contentTree), {
  ...contentOptions,
  inlineDefineInto: { Item: 'virtualizer', CreateItem: 'createItemRow' },
  listFor(node, ctx) {
    if (node.s === 'virtualizer') return [flatItems(ctx.props.items)];
    return selectMenuOptions.listFor(node, ctx);
  },
  slotAttrs(slot, props, variants, ctx) {
    if (slot === 'virtualizer') return { 'data-slot': undefined };
    return selectMenuOptions.slotAttrs(slot, props, variants, ctx);
  }
});

/* SelectMenu.vue:87 — content { side: "bottom", sideOffset: 8, collisionPadding: 8,
   position: "popper" }, align "start"; floating-ui flips and rounds by DPR */
const roundByDPR = (v) => { const d = (typeof window !== 'undefined' && window.devicePixelRatio) || 1; return Math.round(v * d) / d; };
function useFloating(anchorSel, open, sideOffset, collisionPadding) {
  const wrapRef = React.useRef(null);
  const [pos, setPos] = React.useState(null);
  React.useLayoutEffect(() => {
    if (!open) return undefined;
    const place = () => {
      const wrap = wrapRef.current;
      const trigger = document.querySelector(anchorSel);
      if (!wrap || !trigger) return;
      const t = trigger.getBoundingClientRect();
      const r = wrap.getBoundingClientRect();
      const vw = document.documentElement.clientWidth, vh = window.innerHeight;
      const x = Math.max(collisionPadding, Math.min(t.left, vw - collisionPadding - r.width));
      const yBottom = t.bottom + sideOffset, yTop = t.top - sideOffset - r.height;
      const overBottom = yBottom + r.height - (vh - collisionPadding), overTop = collisionPadding - yTop;
      const side = overBottom > 0 && (overTop <= 0 || overTop < overBottom) ? 'top' : 'bottom';
      const next = { x: roundByDPR(x), y: roundByDPR(side === 'top' ? yTop : yBottom), side, w: t.width };
      setPos((p) => (p && p.x === next.x && p.y === next.y && p.side === next.side && p.w === next.w ? p : next));
    };
    place();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(place) : null;
    if (ro && wrapRef.current) ro.observe(wrapRef.current);
    window.addEventListener('resize', place);
    return () => { if (ro) ro.disconnect(); window.removeEventListener('resize', place); };
  }, [anchorSel, open, sideOffset, collisionPadding]);
  return [wrapRef, pos];
}

function overrideSearch(node, extra) {
  if (Array.isArray(node)) return node.map((n) => overrideSearch(n, extra));
  if (!React.isValidElement(node)) return node;
  if (node.props['data-slot'] === 'input' && typeof node.type !== 'string') return React.cloneElement(node, extra);
  const ch = node.props.children;
  if (ch === undefined || ch === null) return node;
  const next = overrideSearch(ch, extra);
  return React.cloneElement(node, undefined, ...(Array.isArray(next) ? next : [next]));
}

export function SelectMenu(props) {
  /* the search field is a UInput (SelectMenu.vue:349), built here and handed to
     the slot; SelectMenu.vue:96 defaults its placeholder to t("selectMenu.search") */
  const { input, searchInput = true, ...rest } = props;
  /* given as PROPS, not as a built element: the tree's `UInput` node mounts the
     Input itself (with the menu's size) and takes a props object as its
     configuration — a built element never reached the panel, and the field came
     out `outline` with no placeholder. SelectMenu.vue:96 —
     defu(props.searchInput, { placeholder, variant: "none", fixed }). */
  /* the defaults are use-site props (lib/use-site.js, 'select-menu'.input); a
     `searchInput` object is bound over them on the mounted Input */
  const override = searchInput && typeof searchInput === 'object' ? searchInput
    : (input && typeof input === 'object' && !React.isValidElement(input) ? input : null);
  const open = !!props.open;
  const raw = React.useId();
  const id = 'reka-combobox-' + raw.replace(/[^a-zA-Z0-9]/g, '');
  const cp = props.content || {};
  const sideOffset = cp.sideOffset ?? props.sideOffset ?? 8;
  const collisionPadding = cp.collisionPadding ?? props.collisionPadding ?? 8;
  const [wrapRef, pos] = useFloating('[data-combobox-anchor="' + id + '"]', open, sideOffset, collisionPadding);
  const trigger = renderTrigger({ ...rest, searchInput, 'data-combobox-anchor': id });
  if (!open) return trigger;
  const { content: _c, portal, sideOffset: _so, collisionPadding: _cp, class: _cls, className: _cn, ...panelProps } = rest;
  const body0 = (props.virtualize ? renderVirtualContent : renderContent)({ ...panelProps, searchInput, 'data-side': pos ? pos.side : 'bottom' });
  const body = override ? overrideSearch(body0, override) : body0;
  const wrapper = React.createElement('div', {
    ref: wrapRef,
    'data-reka-popper-content-wrapper': '',
    style: {
      position: 'fixed', left: 0, top: 0, minWidth: 'max-content', zIndex: 50,
      transform: pos ? 'translate(' + pos.x + 'px, ' + pos.y + 'px)' : 'translate(0, -200%)',
      visibility: pos ? undefined : 'hidden',
      ...(pos ? { '--reka-popper-anchor-width': pos.w + 'px' } : {})
    }
  }, body);
  const RD = typeof window !== 'undefined' ? window.ReactDOM : null;
  const panel = portal !== false && RD && RD.createPortal && typeof document !== 'undefined' ? RD.createPortal(wrapper, document.body) : wrapper;
  return React.createElement(React.Fragment, null, trigger, panel);
}
