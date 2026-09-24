import React from 'react';
import { createRenderer } from '../../lib/factory.jsx';
import { tvd, twMerge } from '../../lib/tv.js';
import { propDefaults } from '../../lib/defaults.js';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/input-menu.ts (source/themes.json -> "input-menu").
   Values are literal: no rounding, no cross-component alignment. */
export const inputMenuTheme = {
  "slots": {
    "root": "relative inline-flex items-center",
    "base": [
      "rounded-md",
      "transition-colors"
    ],
    "leading": "absolute inset-y-0 start-0 flex items-center",
    "leadingIcon": "shrink-0 text-dimmed",
    "leadingAvatar": "shrink-0",
    "leadingAvatarSize": "",
    "trailing": "group absolute inset-y-0 end-0 flex items-center disabled:cursor-not-allowed disabled:opacity-75 focus:outline-none",
    "trailingIcon": "shrink-0 text-dimmed",
    "trailingClear": "p-0",
    "arrow": "fill-bg stroke-default",
    "content": "max-h-[min(15rem,var(--reka-combobox-content-available-height,15rem))] w-(--reka-combobox-trigger-width) bg-default shadow-lg rounded-md ring ring-default overflow-hidden data-[state=open]:animate-[scale-in_100ms_var(--ease-out)] data-[state=closed]:animate-[scale-out_100ms_var(--ease-out)] origin-(--reka-combobox-content-transform-origin) pointer-events-auto flex flex-col",
    "viewport": "relative scroll-py-1 overflow-y-auto flex-1",
    "group": "p-1 isolate",
    "empty": "text-center text-muted",
    "label": "font-semibold text-highlighted",
    "separator": "-mx-1 my-1 h-px bg-border",
    "item": [
      "group relative w-full flex items-start gap-1.5 p-1.5 text-sm select-none outline-none before:absolute before:z-[-1] before:inset-px before:rounded-md data-disabled:cursor-not-allowed data-disabled:opacity-75 text-default data-highlighted:not-data-disabled:text-highlighted data-highlighted:not-data-disabled:before:bg-elevated/50",
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
    "tagsItem": "px-1.5 py-0.5 rounded-sm font-medium inline-flex items-center gap-0.5 ring ring-inset ring-accented bg-elevated text-default data-disabled:cursor-not-allowed data-disabled:opacity-75",
    "tagsItemText": "truncate",
    "tagsItemDelete": [
      "inline-flex items-center rounded-xs text-dimmed hover:text-default hover:bg-accented/75 disabled:pointer-events-none",
      "transition-colors"
    ],
    "tagsItemDeleteIcon": "shrink-0",
    "tagsInput": "flex-1 border-0 bg-transparent placeholder:text-dimmed focus:outline-none disabled:cursor-not-allowed disabled:opacity-75"
  },
  "variants": {
    "fieldGroup": {
      "horizontal": {
        "root": "group has-focus-visible:z-[1]",
        "base": "group-not-only:group-first:rounded-e-none group-not-only:group-last:rounded-s-none group-not-last:group-not-first:rounded-none"
      },
      "vertical": {
        "root": "group has-focus-visible:z-[1]",
        "base": "group-not-only:group-first:rounded-b-none group-not-only:group-last:rounded-t-none group-not-last:group-not-first:rounded-none"
      }
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
        "tagsItem": "text-[10px]/3",
        "tagsItemDeleteIcon": "size-3",
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
        "tagsItem": "text-[10px]/3",
        "tagsItemDeleteIcon": "size-3",
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
        "tagsItem": "text-xs",
        "tagsItemDeleteIcon": "size-3.5",
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
        "tagsItem": "text-xs",
        "tagsItemDeleteIcon": "size-3.5",
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
        "tagsItem": "text-sm",
        "tagsItemDeleteIcon": "size-4",
        "empty": "p-3 text-base"
      }
    },
    "variant": {
      "outline": "text-highlighted bg-default ring ring-inset ring-accented",
      "soft": "text-highlighted bg-elevated/50 hover:bg-elevated focus:bg-elevated disabled:bg-elevated/50",
      "subtle": "text-highlighted bg-elevated ring ring-inset ring-accented",
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
    "virtualize": {
      "true": {
        "viewport": "p-1 isolate"
      },
      "false": {
        "viewport": "divide-y divide-default"
      }
    },
    "multiple": {
      "true": {
        "root": "flex-wrap"
      },
      "false": {
        "base": "w-full border-0 placeholder:text-dimmed disabled:cursor-not-allowed disabled:opacity-75"
      }
    }
  },
  "compoundVariants": [
    {
      "variant": "soft",
      "multiple": true,
      "class": "has-focus:bg-elevated has-focus-visible:outline-3"
    },
    {
      "variant": "ghost",
      "multiple": true,
      "class": "has-focus:bg-elevated has-focus-visible:outline-3"
    },
    {
      "color": "primary",
      "multiple": true,
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "has-focus-visible:outline-3 has-focus-visible:ring-primary"
    },
    {
      "color": "secondary",
      "multiple": true,
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "has-focus-visible:outline-3 has-focus-visible:ring-secondary"
    },
    {
      "color": "success",
      "multiple": true,
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "has-focus-visible:outline-3 has-focus-visible:ring-success"
    },
    {
      "color": "info",
      "multiple": true,
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "has-focus-visible:outline-3 has-focus-visible:ring-info"
    },
    {
      "color": "warning",
      "multiple": true,
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "has-focus-visible:outline-3 has-focus-visible:ring-warning"
    },
    {
      "color": "error",
      "multiple": true,
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "has-focus-visible:outline-3 has-focus-visible:ring-error"
    },
    {
      "color": "neutral",
      "multiple": true,
      "variant": [
        "outline",
        "subtle"
      ],
      "class": "has-focus-visible:outline-3 has-focus-visible:ring-inverted"
    },
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
    "variant": "outline"
  }
};

/* DOM extracted from InputMenu.vue — element nesting and data-slot names as shipped. */
const tree = [{"t":"DefineCreateItemTemplate","c":[{"t":"Component.Item","s":"item","c":[{"t":"span","s":"itemLabel"}]}]},{"t":"DefineItemTemplate","c":[{"t":"Component.Label","s":"label","if":1},{"t":"Component.Separator","s":"separator","if":1},{"t":"Component.Item","s":"item","c":[{"t":"slot","c":[{"t":"slot","c":[{"t":"UIcon","s":"itemLeadingIcon","if":1},{"t":"UAvatar","s":"itemLeadingAvatar","if":1},{"t":"UChip","s":"itemLeadingChip","if":1}]},{"t":"span","s":"itemWrapper","c":[{"t":"span","s":"itemLabel"},{"t":"span","s":"itemDescription","if":1}]},{"t":"span","s":"itemTrailing","c":[{"t":"Component.ItemIndicator","if":1,"c":[{"t":"UIcon","s":"itemTrailingIcon"}]}]}]}]}]},{"t":"Component.Root","s":"root","c":[{"t":"Component.Anchor","s":"base","c":[{"t":"TagsInputRoot","if":1,"c":[{"t":"TagsInputItem","s":"tagsItem","for":1,"c":[{"t":"TagsInputItemText","s":"tagsItemText"},{"t":"TagsInputItemDelete","s":"tagsItemDelete","c":[{"t":"slot","c":[{"t":"UIcon","s":"tagsItemDeleteIcon"}]}]}]},{"t":"Component.Input","c":[{"t":"TagsInputInput","s":"tagsInput"}]}]},{"t":"Component.Input","s":"base"},{"t":"span","s":"leading","if":1,"c":[{"t":"slot","c":[{"t":"UIcon","s":"leadingIcon","if":1},{"t":"UAvatar","s":"itemLeadingAvatar","if":1}]}]},{"t":"Component.Trigger","s":"trailing","if":1,"c":[{"t":"slot","c":[{"t":"Component.Cancel","if":1,"c":[{"t":"span","s":"trailingClear"}]},{"t":"UIcon","s":"trailingIcon","if":1}]}]}]},{"t":"Component.Portal","c":[{"t":"FieldGroupReset","c":[{"t":"Component.Content","s":"content","c":[{"t":"Component.Empty","s":"empty"},{"t":"div","s":"viewport","c":[{"t":"template","c":[{"t":"Component.Group","s":"group","if":1},{"t":"Component.Group","s":"group","for":1},{"t":"Component.Group","s":"group","if":1}]}]},{"t":"Component.Arrow","s":"arrow","if":1}]}]}]}]}];

/* InputMenu carries the same two defines as SelectMenu (the item template and the
   "create item" row) and needs the same options: without a target the item
   template was inlined at the TOP level, so the options rendered as flex
   children of the field itself — "Alpha Beta" loose beside the input — while the
   list panel stayed an empty 20px stub. */
const inputMenuOptions = {
  contentNeedsOpen: true,
  orphanDefinesNeedOpen: true,
  inlineDefineInto: { Item: 'group', CreateItem: 'createItemRow' },
  nodeFilter(node, { props }) {
    if (node.t === 'Component.Cancel') return !!(props.modelValue || props.defaultValue || props.value);
    /* the anchor holds a v-if/v-else pair: the tags input for a MULTIPLE menu,
       a plain text input otherwise. Drawing both put two text fields in one
       144px row — 177 + 46 + 30 — so the search input ended up outside it. */
    if (node.t === 'TagsInputRoot') return !!props.multiple;
    if (node.t === 'Component.Input' && node.s === 'base') return !props.multiple;
    /* the two `v-if` groups around the real loop are the `create` branches */
    if (node.t === 'Component.Group' && node.if) return !!props.create;
    return true;
  },
  renderIf(slot, { props, item }) {
    /* the tag chips exist only for an actual multi-value selection
       (TagsInputItem v-for over the model): drawn empty they made a 177px row
       inside a 144px field and squeezed the search input to 46px, outside it */
    if (/^tagsItem/.test(slot || '')) {
      const model = props.modelValue !== undefined ? props.modelValue : props.defaultValue;
      return Array.isArray(model) && model.length > 0;
    }
    /* three branches of one v-if/v-else-if/v-else over the ITEM's type
       (SelectMenu.vue:303-317, mirrored here): a `label` item is a heading, a
       `separator` item a divider, anything else a row */
    if (slot === 'label') return !!(item && item.type === 'label');
    if (slot === 'separator') return !!(item && item.type === 'separator');
    if (slot === 'item') return !(item && (item.type === 'label' || item.type === 'separator'));
    if (slot === 'trailingClear') {
      const model = props.modelValue !== undefined ? props.modelValue : props.defaultValue;
      const hasValue = model !== undefined && model !== null && model !== '' && !(Array.isArray(model) && !model.length);
      return !!props.clear && hasValue;
    }
    if (slot === 'itemTrailingIcon') return !!(item && (item.selected || item.active));
    if (slot === 'empty') return !((props.items || props.groups || []).length);
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

/* trigger and panel rendered apart, as in SelectMenu: the panel sits in reka's
   fixed popper wrapper (InputMenu.vue:99 — side bottom, sideOffset 8,
   collisionPadding 8, position popper). The panel tree keeps the item defines
   and a gated-off `base` node so the anchor's `base` is not painted on it. */
const menuRoot = tree[2];
const triggerTree = [{ ...menuRoot, c: [menuRoot.c[0]] }];
const contentTree = [tree[0], tree[1], menuRoot.c[1].c[0].c[0], { t: 'div', s: 'base', if: 1 }];
const render = createRenderer('input-menu', inputMenuTheme, triggerTree, inputMenuOptions);
const contentOptions = {
  ...inputMenuOptions,
  renderIf(slot, ctx) { return slot === 'base' ? false : inputMenuOptions.renderIf(slot, ctx); }
};
const renderContent = createRenderer('input-menu', inputMenuTheme, contentTree, contentOptions);
/* InputMenu.vue — with `virtualize` ComboboxVirtualizer draws the rows straight
   inside `viewport` (theme: viewport "p-1 isolate"), no ComboboxGroup */
const withVirtualizer = (nodes) => nodes.map((n) => (n.s === 'viewport'
  ? { ...n, c: [{ t: 'div', s: 'virtualizer', for: 1 }] }
  : (n.c ? { ...n, c: withVirtualizer(n.c) } : n)));
const renderVirtualContent = createRenderer('input-menu', inputMenuTheme, withVirtualizer(contentTree), {
  ...contentOptions,
  inlineDefineInto: { Item: 'virtualizer', CreateItem: 'createItemRow' },
  listFor(node, ctx) {
    if (node.s === 'virtualizer') return [flatItems(ctx.props.items)];
    return undefined;
  },
  slotAttrs(slot, props, variants, ctx) {
    if (slot === 'virtualizer') return { 'data-slot': undefined };
    return inputMenuOptions.slotAttrs(slot, props, variants, ctx);
  }
});

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

/* walk a rendered element tree; `fn` may replace a node (undefined = keep, descend) */
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
function findEl(node, test) {
  if (Array.isArray(node)) { for (const n of node) { const f = findEl(n, test); if (f) return f; } return null; }
  if (!React.isValidElement(node)) return null;
  if (test(node)) return node;
  return findEl(node.props.children, test);
}
const slotIs = (name) => (n) => n.props['data-slot'] === name;
const getPath = (o, path) => String(path).split('.').reduce((a, k) => (a !== null && a !== undefined ? a[k] : undefined), o);

/* InputMenu.vue:150-156 -> utils getDisplayValue: the item whose value (valueKey,
   or the item itself) matches; its labelKey — else the raw value as text */
function displayValue(items, value, { labelKey, valueKey, by }) {
  const eq = (a, b) => (typeof by === 'string' && a && b && typeof a === 'object' && typeof b === 'object'
    ? getPath(a, by) === getPath(b, by) : a === b);
  const found = items.find((item) => eq(item !== null && typeof item === 'object' && valueKey ? getPath(item, valueKey) : item, value));
  const source = found ?? value;
  if (source === null || source === undefined) return '';
  if (typeof source !== 'object') return String(source);
  const v = labelKey ? getPath(source, labelKey) : undefined;
  return v === undefined || v === null ? '' : v;
}

const resolveTheme = tvd('input-menu', inputMenuTheme);

/* InputMenu.vue:397-420 — with `multiple` the Root is `as-child`, so the Anchor
   (data-slot="base") IS the field, carrying root + base classes; the tags (one
   per MODEL value, TagsInputItem v-for over `tags`), the tags input and the
   trailing trigger are its direct children. TagsInputItemText is a span,
   TagsInputItemDelete a button. */
function multipleField(props, el) {
  const defs = propDefaults('input-menu');
  const model = props.modelValue !== undefined ? props.modelValue : props.defaultValue;
  const values = Array.isArray(model) ? model : [];
  const rootEl = findEl(el, slotIs('root'));
  if (!rootEl) return el;
  /* the renderer wraps runs of children in Fragments (one holds tagsInput AND the
     trailing button); unwrap them so every slot is a direct child */
  const flat = (ch) => React.Children.toArray(ch).flatMap((k) => (React.isValidElement(k) && k.type === React.Fragment ? flat(k.props.children) : [k]));
  const kids = flat(rootEl.props.children).map((k, i) => (React.isValidElement(k) ? React.cloneElement(k, { key: 'k' + i }) : k));
  const tagsInput = findEl(kids, slotIs('tagsInput'));
  const tagTpl = findEl(kids, slotIs('tagsItem'));
  const textTpl = tagTpl && findEl(tagTpl.props.children, slotIs('tagsItemText'));
  const delTpl = tagTpl && findEl(tagTpl.props.children, slotIs('tagsItemDelete'));
  /* InputMenu.vue:464-481 — the trailing Trigger sits in the Anchor after the
     TagsInputRoot in BOTH branches (trailingIcon defaults to chevronDown) */
  let trailingEl = findEl(kids, slotIs('trailing'));
  const missingTrailing = !trailingEl && props.trailingIcon !== false;
  if (missingTrailing) trailingEl = findEl(render({ ...props, multiple: false, modelValue: undefined, defaultValue: undefined, 'data-combobox-anchor': undefined }), slotIs('trailing'));
  const hasTrailing = !!trailingEl;
  const hasLeading = !!findEl(kids, slotIs('leading'));
  const rest = kids.filter((k) => !(React.isValidElement(k) && (findEl(k, slotIs('tagsInput')) || findEl(k, slotIs('tagsItem')))));
  const ui = resolveTheme({ ...props, multiple: true, trailing: hasTrailing || undefined, leading: hasLeading || undefined });
  const uiProp = props.ui || {};
  const allItems = (props.items || []).flatMap((it) => (Array.isArray(it) ? it : [it]));
  const opts = { labelKey: props.labelKey ?? defs.labelKey ?? 'label', valueKey: props.valueKey ?? defs.valueKey, by: props.by };
  const strip = (p) => { const { children: _c, ...o } = p; return o; };
  const tags = tagTpl ? values.map((v, i) => React.createElement('div', { ...strip(tagTpl.props), key: 'tag' + i },
    React.createElement('span', { ...(textTpl ? strip(textTpl.props) : { 'data-slot': 'tagsItemText', className: ui.tagsItemText(uiProp.tagsItemText) }) }, displayValue(allItems, v, opts)),
    React.createElement('button', { ...(delTpl ? strip(delTpl.props) : { 'data-slot': 'tagsItemDelete', className: ui.tagsItemDelete(uiProp.tagsItemDelete) }), type: 'button', tabIndex: -1 },
      delTpl ? delTpl.props.children : null))) : [];
  const cls = twMerge([rootEl.props.className, ui.base(uiProp.base)]);
  /* TagsInputInput v-model="searchTerm" (default ""): the selection shows as tags only */
  /* controlled like the library's v-model: value + no-op onChange, defaultValue dropped
     (value and defaultValue together, or value alone, both warn in React) */
  const search = tagsInput ? (() => {
    const { defaultValue, children, ...sp } = tagsInput.props;
    return React.createElement(tagsInput.type, { ...sp, key: tagsInput.key, ref: tagsInput.ref, value: props.searchTerm ?? '', onChange: () => {} }, children);
  })() : null;
  /* the trailing Trigger may sit inside the dropped TagsInputRoot wrapper (or be
     absent from the multiple tree): append it unless a kept child already carries it */
  const kept = rest.some((k) => React.isValidElement(k) && findEl(k, slotIs('trailing')));
  const trail = trailingEl && !kept ? [React.cloneElement(trailingEl, { key: 'trailing' })] : [];
  const field = React.cloneElement(rootEl, { className: cls, 'data-slot': 'base' }, ...tags, ...(search ? [search] : []), ...rest, ...trail);
  return mapEls(el, (n) => (n === rootEl ? field : undefined));
}

export function InputMenu(props) {
  const open = !!props.open;
  const raw = React.useId();
  const id = 'reka-combobox-' + raw.replace(/[^a-zA-Z0-9]/g, '');
  const cp = props.content || {};
  const sideOffset = cp.sideOffset ?? props.sideOffset ?? 8;
  const collisionPadding = cp.collisionPadding ?? props.collisionPadding ?? 8;
  const [wrapRef, pos] = useFloating('[data-combobox-anchor="' + id + '"]', open, sideOffset, collisionPadding);
  const el = render({ ...props, 'data-combobox-anchor': id });
  const trigger = props.multiple ? multipleField(props, el) : el;
  if (!open) return trigger;
  const { content: _c, portal, sideOffset: _so, collisionPadding: _cp, class: _cls, className: _cn, ...panelProps } = props;
  const body = (props.virtualize ? renderVirtualContent : renderContent)({ ...panelProps, 'data-side': pos ? pos.side : 'bottom' });
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
