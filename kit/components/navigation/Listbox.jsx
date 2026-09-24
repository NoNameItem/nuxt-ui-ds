import React from 'react';
import { createRenderer } from '../../lib/factory.jsx';
import { lookup } from '../../lib/registry.js';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/listbox.ts (source/themes.json -> "listbox").
   Values are literal: no rounding, no cross-component alignment. */
export const listboxTheme = {
  "slots": {
    "root": "flex flex-col min-h-0 min-w-0 ring ring-inset ring-default rounded-lg overflow-hidden",
    "input": "border-b border-default",
    "content": "relative overflow-y-auto flex-1 max-h-60 scroll-py-1 focus:outline-none",
    "group": "p-1 isolate",
    "label": "font-semibold text-highlighted",
    "separator": "-mx-1 my-1 h-px bg-border",
    "empty": "text-center text-muted",
    "loading": "flex items-center justify-center text-muted",
    "loadingIcon": "animate-spin shrink-0",
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
    "itemWrapper": "flex-1 flex flex-col min-w-0",
    "itemLabel": "truncate",
    "itemDescription": "truncate text-muted",
    "itemTrailing": "ms-auto inline-flex gap-1.5 items-center",
    "itemTrailingIcon": "shrink-0"
  },
  "variants": {
    "size": {
      "xs": {
        "label": "p-1 text-[10px]/3 gap-1",
        "empty": "py-3 text-xs",
        "loading": "py-3",
        "loadingIcon": "size-4",
        "item": "p-1 text-xs gap-1",
        "itemLeadingIcon": "size-4",
        "itemLeadingAvatarSize": "3xs",
        "itemLeadingChip": "size-4",
        "itemLeadingChipSize": "sm",
        "itemTrailingIcon": "size-4"
      },
      "sm": {
        "label": "p-1.5 text-[10px]/3 gap-1.5",
        "empty": "py-4 text-xs",
        "loading": "py-4",
        "loadingIcon": "size-4",
        "item": "p-1.5 text-xs gap-1.5",
        "itemLeadingIcon": "size-4",
        "itemLeadingAvatarSize": "3xs",
        "itemLeadingChip": "size-4",
        "itemLeadingChipSize": "sm",
        "itemTrailingIcon": "size-4"
      },
      "md": {
        "label": "p-1.5 text-xs gap-1.5",
        "empty": "py-6 text-sm",
        "loading": "py-6",
        "loadingIcon": "size-5",
        "item": "p-1.5 text-sm gap-1.5",
        "itemLeadingIcon": "size-5",
        "itemLeadingAvatarSize": "2xs",
        "itemLeadingChip": "size-5",
        "itemLeadingChipSize": "md",
        "itemTrailingIcon": "size-5"
      },
      "lg": {
        "label": "p-2 text-xs gap-2",
        "empty": "py-7 text-sm",
        "loading": "py-7",
        "loadingIcon": "size-5",
        "item": "p-2 text-sm gap-2",
        "itemLeadingIcon": "size-5",
        "itemLeadingAvatarSize": "2xs",
        "itemLeadingChip": "size-5",
        "itemLeadingChipSize": "md",
        "itemTrailingIcon": "size-5"
      },
      "xl": {
        "label": "p-2 text-sm gap-2",
        "empty": "py-8 text-base",
        "loading": "py-8",
        "loadingIcon": "size-6",
        "item": "p-2 text-base gap-2",
        "itemLeadingIcon": "size-6",
        "itemLeadingAvatarSize": "xs",
        "itemLeadingChip": "size-6",
        "itemLeadingChipSize": "lg",
        "itemTrailingIcon": "size-6",
        "itemDescription": "text-sm"
      }
    },
    "color": {
      "primary": {
        "root": "outline-primary/25 has-focus-visible:outline-3 has-focus-visible:ring-primary"
      },
      "secondary": {
        "root": "outline-secondary/25 has-focus-visible:outline-3 has-focus-visible:ring-secondary"
      },
      "success": {
        "root": "outline-success/25 has-focus-visible:outline-3 has-focus-visible:ring-success"
      },
      "info": {
        "root": "outline-info/25 has-focus-visible:outline-3 has-focus-visible:ring-info"
      },
      "warning": {
        "root": "outline-warning/25 has-focus-visible:outline-3 has-focus-visible:ring-warning"
      },
      "error": {
        "root": "outline-error/25 has-focus-visible:outline-3 has-focus-visible:ring-error"
      },
      "neutral": {
        "root": "outline-inverted/25 has-focus-visible:outline-3 has-focus-visible:ring-inverted"
      }
    },
    "virtualize": {
      "true": {
        "content": "p-1 isolate"
      },
      "false": {
        "content": "divide-y divide-default"
      }
    },
    "disabled": {
      "true": {
        "root": "opacity-75 cursor-not-allowed"
      }
    },
    "highlight": {
      "true": ""
    }
  },
  "compoundVariants": [
    {
      "color": "primary",
      "highlight": true,
      "class": {
        "root": "ring ring-inset ring-primary"
      }
    },
    {
      "color": "secondary",
      "highlight": true,
      "class": {
        "root": "ring ring-inset ring-secondary"
      }
    },
    {
      "color": "success",
      "highlight": true,
      "class": {
        "root": "ring ring-inset ring-success"
      }
    },
    {
      "color": "info",
      "highlight": true,
      "class": {
        "root": "ring ring-inset ring-info"
      }
    },
    {
      "color": "warning",
      "highlight": true,
      "class": {
        "root": "ring ring-inset ring-warning"
      }
    },
    {
      "color": "error",
      "highlight": true,
      "class": {
        "root": "ring ring-inset ring-error"
      }
    },
    {
      "color": "neutral",
      "highlight": true,
      "class": {
        "root": "ring ring-inset ring-inverted"
      }
    }
  ],
  "defaultVariants": {
    "color": "primary",
    "size": "md"
  }
};

/* DOM extracted from Listbox.vue — element nesting and data-slot names as shipped. */
const tree = [{"t":"DefineItemTemplate","c":[{"t":"ListboxGroupLabel","s":"label","if":1},{"t":"div","s":"separator","if":1},{"t":"RekaListboxItem","s":"item","c":[{"t":"slot","c":[{"t":"slot","c":[{"t":"UIcon","s":"itemLeadingIcon","if":1},{"t":"UAvatar","s":"itemLeadingAvatar","if":1},{"t":"UChip","s":"itemLeadingChip","if":1}]},{"t":"span","s":"itemWrapper","if":1,"c":[{"t":"span","s":"itemLabel","if":1},{"t":"span","s":"itemDescription","if":1}]},{"t":"span","s":"itemTrailing","c":[{"t":"ListboxItemIndicator","c":[{"t":"UIcon","s":"itemTrailingIcon"}]}]}]}]}]},{"t":"ListboxRoot","s":"root","c":[{"t":"ListboxFilter","if":1,"c":[{"t":"UInput","s":"input"}]},{"t":"ListboxContent","s":"content","c":[{"t":"div","s":"loading","if":1,"c":[{"t":"slot","c":[{"t":"UIcon","s":"loadingIcon"}]}]},{"t":"div","s":"empty","if":1},{"t":"template","c":[{"t":"ListboxGroup","s":"group","for":1}]}]}]}];

/* Listbox.vue:118 reuses the item template INSIDE the group, and the group sits
   inside `content`; extraction lost the Reuse, so the body was appended at the
   root as a flat sibling list — sixteen children where the library has one, an
   empty `content`, and a root 402px tall against 168.

   Two more things the template's own guards carry: `label` and `separator` are
   the group's header and its divider (ListboxGroupLabel / the separator div,
   both `v-if`), not parts of an item — repeated per item they added five labels
   and four separators the library never draws. And the filter input exists only
   when `filter` is on (defineProps default false). */
function isSelected(props, item) {
  const model = props.modelValue !== undefined ? props.modelValue : props.defaultValue;
  if (model === undefined || model === null || item === undefined || item === null) return false;
  /* Listbox.vue:34,153 — valueKey has no default; without it the item's value is
     the whole object: `:value="props.valueKey ? get(item, props.valueKey) : item"` */
  const key = props.valueKey;
  const mine = key ? (item && typeof item === 'object' ? item[key] : undefined) : item;
  const list = Array.isArray(model) ? model : [model];
  return list.some(m => m === mine);
}


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
function virtualizeGroups(el, holderSlot, size) {
  return mapEls(el, (n) => {
    if (n.props['data-slot'] !== holderSlot) return undefined;
    let placed = false;
    const replaceGroups = (node) => mapEls(node, (m) => {
      if (m.props['data-slot'] !== 'group') return undefined;
      if (placed) return null;
      placed = true;
      return null;
    });
    const items = collectItems(n.props.children, []).map((it, i) => React.cloneElement(it, { key: 'v' + i }));
    if (!items.length) return n;
    let kids = replaceGroups(n.props.children);
    kids = (Array.isArray(kids) ? kids : [kids]).filter((k) => k !== null);
    const h = VIRTUAL_ITEM_HEIGHT[size || 'md'] || 32;
    const wrapper = React.createElement('div', { key: 'virtualizer', style: { position: 'relative', width: '100%', height: items.length * h + 'px' } }, ...items);
    return React.cloneElement(n, undefined, ...kids, wrapper);
  });
}

/* Listbox.vue: `filteredItems` is every group's items in one list — `items` is
   T[] or T[][] */
function flatItems(props) {
  const items = props.items || [];
  return items.some(Array.isArray) ? items.flatMap((g) => (Array.isArray(g) ? g : [g])) : items;
}

const render = createRenderer('listbox', listboxTheme, tree, {
  inlineDefineInto: { Item: 'group' },
  nodeFilter(node, { props }) {
    if (node.t === 'ListboxFilter') return !!props.filter;
    return true;
  },
  renderIf(slot, { props, item }) {
    if ((slot === 'label' || slot === 'separator') && item !== undefined) return false;
    /* Listbox.vue:190 wraps the icon in a ListboxItemIndicator, which reka draws
       only for the SELECTED item — the kit drew a check on all five rows */
    /* selection comes only from the PASSED modelValue/defaultValue: with
       neither, nothing is selected and no indicator is drawn */
    if (slot === 'itemTrailingIcon') return isSelected(props, item);
    /* Listbox.vue:225 — `v-else-if="!filteredItems.length"` after the loading
       branch: the empty state exists exactly when there is nothing to list */
    if (slot === 'empty') return !props.loading && flatItems(props).length === 0;
    /* Listbox.vue:160-172 — icon, avatar, chip is one v-if / v-else-if chain,
       each on its own field of the item */
    if (slot === 'itemLeadingAvatar') return !!(item && !item.icon && item.avatar);
    if (slot === 'itemLeadingChip') return !!(item && !item.icon && !item.avatar && item.chip);
    return undefined;
  },
  slotContent(slot, { props, item }) {
    /* the default text is `searchTerm ? t("listbox.noMatch") : t("listbox.noData")`
       — en: "No matching data" / "No data" */
    if (slot === 'empty') return props.searchTerm ? 'No matching data' : 'No data';
    /* the renderer has no component for a UChip node — an object of props there
       came out as nothing. The Chip is built here; the renderer wraps it in a
       span carrying the slot's class, and realChips() below unwraps it */
    if (slot === 'itemLeadingChip' && item && item.chip) {
      const Chip = lookup('Chip');
      if (!Chip) return undefined;
      const sizes = listboxTheme.variants.size;
      const chipSize = (sizes[props.size] || sizes[listboxTheme.defaultVariants.size]).itemLeadingChipSize;
      return React.createElement(Chip, { ...(typeof item.chip === 'object' ? item.chip : {}), inset: true, standalone: true, size: chipSize });
    }
    return undefined;
  }
});

/* `<UChip inset standalone v-bind="item.chip" :size="ui.itemLeadingChipSize()">` */
function realChips(el) {
  const Chip = lookup('Chip');
  if (!Chip) return el;
  return mapEls(el, (n) => {
    if (n.props['data-slot'] !== 'itemLeadingChip') return undefined;
    const kids = React.Children.toArray(n.props.children);
    const chip = kids.length === 1 && React.isValidElement(kids[0]) && kids[0].type === Chip ? kids[0] : null;
    if (!chip) return undefined;
    return React.createElement(Chip, { ...chip.props, key: n.key, 'data-slot': 'itemLeadingChip', class: n.props.className });
  });
}

/* reka ListboxRoot.js:257-283 — on mount `highlightSelected` highlights the
   checked item, or else the FIRST item of the collection */
function highlightFirst(el) {
  const items = collectItems(el, []);
  if (!items.length) return el;
  const target = items.find((it) => it.props['data-state'] === 'checked') || items[0];
  return mapEls(el, (n) => (n === target ? React.cloneElement(n, { 'data-highlighted': '' }) : undefined));
}

/* a disabled listbox: reka marks the root and every item `data-disabled`, and
   the mount highlight only considers enabled items (ListboxRoot.js:133-134),
   so nothing is highlighted */
function disableAll(el) {
  const marked = mapEls(el, (n) => (n.props['data-slot'] === 'item' ? React.cloneElement(n, { 'data-disabled': '' }) : undefined));
  return React.isValidElement(marked) && marked.props['data-disabled'] === undefined
    ? React.cloneElement(marked, { 'data-disabled': '' }) : marked;
}

export function Listbox(props) {
  let el = realChips(render(props));
  if (props.virtualize) el = virtualizeGroups(el, 'content', props.size);
  return props.disabled ? disableAll(el) : highlightFirst(el);
}
