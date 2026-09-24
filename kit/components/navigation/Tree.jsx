import React from 'react';
import { createRenderer } from '../../lib/factory.jsx';
import { tvd } from '../../lib/tv.js';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/tree.ts (source/themes.json -> "tree").
   Values are literal: no rounding, no cross-component alignment. */
export const treeTheme = {
  "slots": {
    "root": "relative isolate",
    "item": "w-full",
    "listWithChildren": "border-s border-default",
    "itemWithChildren": "ps-1.5 -ms-px",
    "link": "relative group w-full flex items-center text-sm select-none before:absolute before:inset-y-px before:inset-x-0 before:z-[-1] before:rounded-md focus:outline-none focus-visible:outline-none focus-visible:before:outline-3",
    "linkLeadingIcon": "shrink-0 relative",
    "linkLabel": "truncate",
    "linkTrailing": "ms-auto inline-flex gap-1.5 items-center",
    "linkTrailingIcon": "shrink-0 transform transition-transform duration-200 ease-out motion-reduce:transition-none group-data-expanded:rotate-180"
  },
  "variants": {
    "virtualize": {
      "true": {
        "root": "overflow-y-auto"
      }
    },
    "color": {
      "primary": {
        "link": "before:outline-primary/25"
      },
      "secondary": {
        "link": "before:outline-secondary/25"
      },
      "success": {
        "link": "before:outline-success/25"
      },
      "info": {
        "link": "before:outline-info/25"
      },
      "warning": {
        "link": "before:outline-warning/25"
      },
      "error": {
        "link": "before:outline-error/25"
      },
      "neutral": {
        "link": "before:outline-inverted/25"
      }
    },
    "size": {
      "xs": {
        "listWithChildren": "ms-4",
        "link": "px-2 py-1 text-xs gap-1",
        "linkLeadingIcon": "size-4",
        "linkTrailingIcon": "size-4"
      },
      "sm": {
        "listWithChildren": "ms-4.5",
        "link": "px-2.5 py-1.5 text-xs gap-1.5",
        "linkLeadingIcon": "size-4",
        "linkTrailingIcon": "size-4"
      },
      "md": {
        "listWithChildren": "ms-5",
        "link": "px-2.5 py-1.5 text-sm gap-1.5",
        "linkLeadingIcon": "size-5",
        "linkTrailingIcon": "size-5"
      },
      "lg": {
        "listWithChildren": "ms-5.5",
        "link": "px-3 py-2 text-sm gap-2",
        "linkLeadingIcon": "size-5",
        "linkTrailingIcon": "size-5"
      },
      "xl": {
        "listWithChildren": "ms-6",
        "link": "px-3 py-2 text-base gap-2",
        "linkLeadingIcon": "size-6",
        "linkTrailingIcon": "size-6"
      }
    },
    "selected": {
      "true": {
        "link": "before:bg-elevated"
      }
    },
    "disabled": {
      "true": {
        "link": "cursor-not-allowed opacity-75"
      }
    }
  },
  "compoundVariants": [
    {
      "color": "primary",
      "selected": true,
      "class": {
        "link": "text-primary"
      }
    },
    {
      "color": "secondary",
      "selected": true,
      "class": {
        "link": "text-secondary"
      }
    },
    {
      "color": "success",
      "selected": true,
      "class": {
        "link": "text-success"
      }
    },
    {
      "color": "info",
      "selected": true,
      "class": {
        "link": "text-info"
      }
    },
    {
      "color": "warning",
      "selected": true,
      "class": {
        "link": "text-warning"
      }
    },
    {
      "color": "error",
      "selected": true,
      "class": {
        "link": "text-error"
      }
    },
    {
      "color": "neutral",
      "selected": true,
      "class": {
        "link": "text-highlighted"
      }
    },
    {
      "selected": false,
      "disabled": false,
      "class": {
        "link": [
          "hover:text-highlighted hover:before:bg-elevated/50",
          "transition-colors before:transition-colors"
        ]
      }
    }
  ],
  "defaultVariants": {
    "color": "primary",
    "size": "md"
  }
};

/* DOM extracted from Tree.vue — element nesting and data-slot names as shipped. */
const tree = [{"t":"DefineItemTemplate","c":[{"t":"li","c":[{"t":"TreeItem","c":[{"t":"slot","c":[{"t":"component","s":"link","c":[{"t":"slot","c":[{"t":"slot","c":[{"t":"UIcon","s":"linkLeadingIcon","if":1},{"t":"UIcon","s":"linkLeadingIcon","if":1}]},{"t":"span","s":"linkLabel","if":1},{"t":"span","s":"linkTrailing","if":1,"c":[{"t":"slot","c":[{"t":"UIcon","s":"linkTrailingIcon","if":1},{"t":"UIcon","s":"linkTrailingIcon","if":1}]}]}]}]}]},{"t":"ul","s":"listWithChildren","if":1}]}]}]},{"t":"TreeRoot","s":"root"}];

/* Tree.vue:96 reuses the item template inside TreeRoot and again inside each
   item's `listWithChildren` — that second, recursive Reuse is what extraction
   lost, so the tree came out flat with no nested lists. */
const resolveTree = tvd('tree', treeTheme);
const render = createRenderer('tree', treeTheme, tree, {
  inlineDefineInto: { Item: ['root', 'listWithChildren'] },
  /* Tree.vue:49-54 resolves its elements itself: `{ root: "ul", link: "button" }`
     unless the caller overrides them — the kit drew a div and an anchor. */
  rootTag: 'ul',
  slotTag: { link: 'button', listWithChildren: 'ul', list: 'ul', item: 'li' },
  slotAttrs(slot, props, variants, { item }) {
    if (slot !== 'link') return null;
    const out = {};
    /* `:type="as.link === 'button' ? 'button' : void 0"` (Tree.vue:140) — so the
       attribute follows the TAG: an item with a `to` renders as an anchor, and
       `type` is invalid there */
    if (!props.to && !(item && item.to)) out.type = 'button';
    /* reka TreeItem.js:145 — `data-expanded` on the expanded row; the kit draws
       every branch's children, so every branch is the expanded one */
    if (item && item.children && item.children.length) { out['data-expanded'] = ''; out['aria-expanded'] = 'true'; }
    /* Tree.vue:142-144 — `:disabled` and `ui.link({ selected, disabled })`: the
       `disabled.true` variant, and none of the `disabled: false` hover compound */
    if ((item && item.disabled) || props.disabled) {
      out.disabled = true;
      out.className = resolveTree({ color: variants.color ?? props.color, size: variants.size ?? props.size, selected: !!(item && item.selected), disabled: true }).link((props.ui || {}).link);
    }
    return out;
  },
  /* the trailing chevron belongs to a branch: Tree.vue:70 draws it only when the
     item has children (and the two UIcon nodes are its open/closed pair, not two
     icons) */
  renderIf(slot, { item }) {
    if (slot === 'linkTrailing' || slot === 'linkTrailingIcon') return !!(item && item.children && item.children.length);
    return undefined;
  },
  /* The selected row is named by a PROP, not decided by reka at runtime:
     `modelValue` / `defaultValue` (Tree.vue:28-29) is matched against the item
     by `labelKey`, and the theme paints it through `selected.true`
     (`before:bg-elevated`) plus the `color × selected` compound. Forcing the
     variant off was right only while nothing named a row — with nothing named,
     no item matches and the variant stays off on its own. */
});

/* Tree.vue:122-124 — the `li` has no data-slot but does carry a theme class:
   `!!nested && level > 1 ? ui.itemWithChildren(…) : ui.item(…)`. The level is
   read off the tree as built: an `li` inside a `listWithChildren` is below the
   root. `nested` defaults to true. */
function itemClasses(node, nestedLevel, props) {
  if (Array.isArray(node)) return node.map((n) => itemClasses(n, nestedLevel, props));
  if (!React.isValidElement(node)) return node;
  let inner = nestedLevel;
  let el = node;
  if (node.type === 'li' && !node.props['data-slot']) {
    const deep = props.nested !== false && nestedLevel;
    const ui = props.ui || {};
    const cls = deep
      ? [treeTheme.slots.itemWithChildren, ui.itemWithChildren]
      : [treeTheme.slots.item, ui.item];
    el = React.cloneElement(node, { className: cls.filter(Boolean).join(' ') });
  }
  if (node.props['data-slot'] === 'listWithChildren') inner = true;
  /* the disabled link carries the `disabled` attribute, not data-disabled */
  if (node.props['data-slot'] === 'link' && node.props.disabled && node.props['data-disabled'] !== undefined) {
    el = React.cloneElement(el, { 'data-disabled': undefined });
  }
  const ch = el.props.children;
  if (ch === undefined || ch === null) return el;
  const next = itemClasses(ch, inner, props);
  return React.cloneElement(el, undefined, ...(Array.isArray(next) ? next : [next]));
}

export function Tree(props) {
  return itemClasses(render(props), false, props);
}
