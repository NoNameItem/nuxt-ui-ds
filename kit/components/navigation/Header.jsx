import React from 'react';
import { createRenderer } from '../../lib/factory.jsx';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/header.ts (source/themes.json -> "header").
   Values are literal: no rounding, no cross-component alignment. */
export const headerTheme = {
  "slots": {
    "root": "bg-default/75 backdrop-blur-sm border-b border-default h-(--ui-header-height) sticky top-0 z-50",
    "container": "flex items-center justify-between gap-3 h-full",
    "left": "lg:flex-1 flex items-center gap-1.5",
    "center": "hidden lg:flex",
    "right": "flex items-center justify-end lg:flex-1 gap-1.5",
    "title": "shrink-0 font-bold text-xl text-highlighted flex items-end gap-1.5",
    "toggle": "lg:hidden",
    "content": "lg:hidden",
    "overlay": "lg:hidden",
    "header": "px-4 sm:px-6 h-(--ui-header-height) shrink-0 flex items-center justify-between gap-3",
    "body": "p-4 sm:p-6 overflow-y-auto"
  },
  "variants": {
    "toggleSide": {
      "left": {
        "toggle": "-ms-1.5"
      },
      "right": {
        "toggle": "-me-1.5"
      }
    }
  }
};

/* DOM extracted from Header.vue — element nesting and data-slot names as shipped. */
/* Header.vue:63-110 — the Reuse points extraction lost are restored: `left`
   first and `right` last inside `container`, the toggle inside whichever side
   `toggleSide` names (`side` is read by nodeFilter below). */
const tree = [{"t":"DefineToggleTemplate","c":[{"t":"slot","c":[{"t":"UButton","s":"toggle","if":1}]}]},{"t":"DefineLeftTemplate","c":[{"t":"div","s":"left","c":[{"t":"ReuseToggleTemplate","side":"left"},{"t":"slot","c":[{"t":"ULink","s":"title","fwd":["to"]}]}]}]},{"t":"DefineRightTemplate","c":[{"t":"div","s":"right","c":[{"t":"ReuseToggleTemplate","side":"right"}]}]},{"t":"Primitive","s":"root","c":[{"t":"UContainer","s":"container","c":[{"t":"ReuseLeftTemplate"},{"t":"div","s":"center"},{"t":"ReuseRightTemplate"}]}]},{"t":"Menu","c":[{"t":"template","c":[{"t":"slot","c":[{"t":"div","s":"header","if":1},{"t":"div","s":"body"}]}]}]}];

/* Header.vue:36, 108-139: the default slot is the `center` div; `header` and
   `body` live only in the mobile menu's content (`body` is the named #body
   slot), and that menu is closed by default (defineModel "open", false). */
const render = createRenderer('header', headerTheme, tree, {
  childSlot: 'center',
  openOnlySlots: ['header', 'body'],
  nodeFilter(node, { props }) {
    if (node.t === 'ReuseToggleTemplate') return node.side === (props.toggleSide || 'right');
    return true;
  },
  /* `<ULink :to="props.to" data-slot="title">{{ props.title }}</ULink>` — a link, to "/" by default */
  slotTag: { title: 'a' },
  slotAttrs(slot, props) {
    if (slot === 'title') return { href: props.to ?? '/' };
    return null;
  },
  slotContent(slot, { props }) {
    if (slot === 'title') return props.title ?? 'Nuxt UI';
    return undefined;
  }
});

export function Header(props) {
  return render(props);
}
