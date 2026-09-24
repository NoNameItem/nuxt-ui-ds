import React from 'react';
import { tvd, slotStyle } from '../../lib/tv.js';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/page-aside.ts (source/themes.json -> "page-aside").
   Values are literal: no rounding, no cross-component alignment. */
export const pageAsideTheme = {
  "slots": {
    "root": "hidden overflow-y-auto lg:block lg:max-h-[calc(100vh-var(--ui-header-height))] lg:sticky lg:top-(--ui-header-height) py-8 lg:ps-4 lg:-ms-4 lg:pe-6.5",
    "container": "relative",
    "top": "sticky -top-8 -mt-8 pointer-events-none z-[1]",
    "topHeader": "h-8 bg-default -mx-4 px-4",
    "topBody": "bg-default relative pointer-events-auto flex flex-col -mx-4 px-4",
    "topFooter": "h-8 bg-gradient-to-b from-default -mx-4 px-4"
  }
};

/* PageAside.vue:24-36, drawn directly: the renderer's child anchoring sends
   children to the first slot node in the tree (the named `top` slot), which
   put the links inside topBody and printed `top` twice.
   <aside root><div container>
     [v-if slots.top] <div top><div topHeader/><div topBody>{top}</div><div topFooter/></div>
     {children}{bottom}
   </div></aside> */
const resolve = tvd('page-aside', pageAsideTheme);
const has = (v) => v !== undefined && v !== null && v !== false;

export function PageAside(props) {
  const { as, top, bottom, children, ui: uiProp = {}, class: className, className: classNameAlt, ...rest } = props;
  const ui = resolve({});
  const el = (slot, extra, ...kids) => React.createElement('div', { ...slotStyle(ui[slot](uiProp[slot])), 'data-slot': slot, ...(extra || {}) }, ...kids);
  const topBlock = has(top)
    ? el('top', null, el('topHeader'), el('topBody', null, top), el('topFooter'))
    : null;
  return React.createElement(as || 'aside', {
    ...slotStyle(ui.root(uiProp.root, className || classNameAlt)), 'data-slot': 'root', 'data-ds-component': 'PageAside', ...rest
  }, el('container', null, topBlock, children, has(bottom) ? bottom : null));
}
