import React from 'react';
import { createRenderer } from '../../lib/factory.jsx';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/select.ts (source/themes.json -> "select").
   Values are literal: no rounding, no cross-component alignment. */
export const selectTheme = {
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
    "content": "max-h-[min(15rem,var(--reka-select-content-available-height,15rem))] w-(--reka-select-trigger-width) bg-default shadow-lg rounded-md ring ring-default overflow-hidden origin-(--reka-select-content-transform-origin) pointer-events-auto flex flex-col",
    "viewport": "relative divide-y divide-default scroll-py-1 overflow-y-auto flex-1",
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
    "itemDescription": "truncate text-muted"
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

/* DOM extracted from Select.vue — element nesting and data-slot names as shipped. */
const tree = [{"t":"SelectRoot","c":[{"t":"SelectTrigger","s":"base","c":[{"t":"span","s":"leading","if":1,"c":[{"t":"slot","c":[{"t":"UIcon","s":"leadingIcon","if":1},{"t":"UAvatar","s":"itemLeadingAvatar","if":1}]}]},{"t":"template","for":1,"c":[{"t":"RSelectValue","s":"value"}]},{"t":"span","s":"trailing","if":1,"c":[{"t":"slot","c":[{"t":"UIcon","s":"trailingIcon","if":1}]}]}]},{"t":"SelectPortal","c":[{"t":"FieldGroupReset","c":[{"t":"SelectContent","s":"content","c":[{"t":"component","s":"viewport","c":[{"t":"SelectGroup","s":"group","for":1,"c":[{"t":"template","for":1,"c":[{"t":"SelectLabel","s":"label","if":1},{"t":"SelectSeparator","s":"separator","if":1},{"t":"RSelectItem","s":"item","c":[{"t":"slot","c":[{"t":"slot","c":[{"t":"UIcon","s":"itemLeadingIcon","if":1},{"t":"UAvatar","s":"itemLeadingAvatar","if":1},{"t":"UChip","s":"itemLeadingChip","if":1}]},{"t":"span","s":"itemWrapper","c":[{"t":"SelectItemText","s":"itemLabel"},{"t":"span","s":"itemDescription","if":1}]},{"t":"span","s":"itemTrailing","c":[{"t":"SelectItemIndicator","c":[{"t":"UIcon","s":"itemTrailingIcon"}]}]}]}]}]}]}]},{"t":"SelectArrow","s":"arrow","if":1}]}]}]}]}];

const flatItems = (items) => (items || []).flatMap((x) => (Array.isArray(x) ? x : [x]));
const keyOf = (props, k, d) => props[k] || d;
function displayValue(props, value) {
  if (value === undefined || value === null) return value;
  const valueKey = keyOf(props, 'valueKey', 'value'), labelKey = keyOf(props, 'labelKey', 'label');
  const found = flatItems(props.items).find((it) => (it && typeof it === 'object' ? it[valueKey] : it) === value);
  if (found === undefined) return value;
  return found && typeof found === 'object' ? found[labelKey] : found;
}
function sameItem(props, a, b) {
  if (a === b) return true;
  if (!a || !b || typeof a !== 'object' || typeof b !== 'object') return false;
  const valueKey = keyOf(props, 'valueKey', 'value');
  return a[valueKey] !== undefined ? a[valueKey] === b[valueKey] : a.label === b.label;
}
function highlightedItem(props) {
  const valueKey = keyOf(props, 'valueKey', 'value');
  const rows = flatItems(props.items).filter((it) => !(it && typeof it === 'object' && (it.type === 'label' || it.type === 'separator')));
  const model = props.modelValue !== undefined ? props.modelValue : props.defaultValue;
  const first = Array.isArray(model) ? model[0] : model;
  const sel = first === undefined ? undefined : rows.find((it) => (it && typeof it === 'object' ? it[valueKey] : it) === first);
  return sel !== undefined ? sel : rows.find((it) => !(it && typeof it === 'object' && it.disabled));
}

const selectOptions = {
  contentNeedsOpen: true,
  /* the trigger shows one of two nodes — `v-if` the value, `v-else` the
     placeholder — and the extracted tree kept only the value node, so every
     closed select printed an empty value where the library prints a
     placeholder (value 41/1, placeholder 0/32). */
  /* the trigger's value node sits in a `template v-for` over the DISPLAYED
     values, not over the items: with the item list it printed one placeholder
     per option (2 for a two-item select, and each of them empty) */
  listFor(node, { props }) {
    const slots = [];
    (function collect(ns) { for (const n of ns || []) { if (n.s) slots.push(n.s); collect(n.c); } })(node.c);
    if (slots.includes('value') && slots.length === 1) {
      const model = props.modelValue !== undefined ? props.modelValue : props.defaultValue;
      return Array.isArray(model) ? (model.length ? model : [undefined]) : [model];
    }
    return undefined;
  },
  /* the swapped node prints the placeholder string — the value node's own
     content is the model, which is exactly what is missing here */
  slotContent(slot, { props, item, content }) {
    /* Select.vue:105-114, 207 — the trigger prints displayValue(modelValue):
       getDisplayValue(items, value, { labelKey, valueKey }), the matching
       item's label, not the raw value */
    if (slot === 'value') return displayValue(props, item);
    if (slot !== 'placeholder' || content !== undefined) return undefined;
    return props.placeholder;
  },
  slotSwap(slot, { props }) {
    if (slot !== 'value') return undefined;
    const model = props.modelValue !== undefined ? props.modelValue : props.defaultValue;
    const hasValue = model !== undefined && model !== null && model !== ''
      && !(Array.isArray(model) && !model.length);
    return hasValue ? undefined : 'placeholder';
  },
  renderIf(slot, { props, item }) {
    /* the same three mutually exclusive branches as SelectMenu: a `label` item
       is a heading, a `separator` item a divider, anything else a row */
    if (slot === 'label') return !!(item && item.type === 'label');
    if (slot === 'separator') return !!(item && item.type === 'separator');
    if (slot === 'item') return !(item && (item.type === 'label' || item.type === 'separator'));
    if (slot === 'itemTrailingIcon') return !!(item && (item.selected || item.active));
    return undefined;
  },
  slotAttrs(slot, props, variants, { item }) {
    /* reka's SelectContent (popper): its state, side and align, and the
       trigger width it reads from the popper wrapper */
    if (slot === 'content') return { 'data-state': 'open', 'data-side': props['data-side'] || 'bottom', 'data-align': 'start', style: { '--reka-select-trigger-width': 'var(--reka-popper-anchor-width)' } };
    /* the item reka highlights on open — the selected one, else the first */
    if (slot === 'item' && item !== undefined && sameItem(props, item, highlightedItem(props))) return { 'data-highlighted': '' };
    return null;
  }
};

/* the trigger and the panel are rendered apart: the panel sits in reka's fixed
   popper wrapper (placed below), not in the renderer's absolute box — that box
   resolved against the cell and gave the panel the cell's 256px */
const triggerTree = [{ ...tree[0], c: [tree[0].c[0]] }];
/* Select.vue:227 — the content carries only its own slot class. A panel tree
   with no `base` node made the renderer paint the trigger's `base` onto the
   content root; the gated-off `base` node below says the tree has one. */
const contentTree = [tree[0].c[1].c[0].c[0], { t: 'div', s: 'base', if: 1 }];
const renderTrigger = createRenderer('select', selectTheme, triggerTree, selectOptions);
const renderContent = createRenderer('select', selectTheme, contentTree, {
  ...selectOptions,
  renderIf(slot, ctx) { return slot === 'base' ? false : selectOptions.renderIf(slot, ctx); }
});

/* Select.vue:70 — content defaults { side: "bottom", sideOffset: 8,
   collisionPadding: 8, position: "popper" }; SelectContent's popper aligns
   "start". floating-ui flips, shifts, and rounds by DPR. */
const roundByDPR = (v) => { const d = (typeof window !== 'undefined' && window.devicePixelRatio) || 1; return Math.round(v * d) / d; };

function useFloating(anchorSel, open, sideOffset, collisionPadding) {
  const wrapRef = React.useRef(null);
  const [pos, setPos] = React.useState(null);
  React.useLayoutEffect(() => {
    if (!open) return undefined;
    const place = () => {
      const wrap = wrapRef.current;
      let trigger = document.querySelector(anchorSel);
      if (!trigger && wrap && wrap.previousElementSibling) {
        const prev = wrap.previousElementSibling;
        trigger = prev.matches('[data-slot="base"]') ? prev : prev.querySelector('[data-slot="base"]') || prev;
      }
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

export function Select(props) {
  const open = !!props.open;
  const raw = React.useId();
  const id = 'reka-select-' + raw.replace(/[^a-zA-Z0-9]/g, '');
  const cp = props.content || {};
  const sideOffset = cp.sideOffset ?? props.sideOffset ?? 8;
  const collisionPadding = cp.collisionPadding ?? props.collisionPadding ?? 8;
  const [wrapRef, pos] = useFloating('[data-select-anchor="' + id + '"]', open, sideOffset, collisionPadding);
  const trigger = renderTrigger({ ...props, 'data-select-anchor': id });
  if (!open) return trigger;
  const { content: _c, portal, sideOffset: _so, collisionPadding: _cp, class: _cls, className: _cn, ...rest } = props;
  const body = renderContent({ ...rest, 'data-side': pos ? pos.side : 'bottom' });
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
