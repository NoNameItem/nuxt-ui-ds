import React from 'react';
import { createRenderer } from '../../lib/factory.jsx';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/page-logos.ts (source/themes.json -> "page-logos").
   Values are literal: no rounding, no cross-component alignment. */
export const pageLogosTheme = {
  "slots": {
    "root": "relative overflow-hidden",
    "title": "text-lg text-center font-semibold text-highlighted",
    "logos": "mt-10",
    "logo": "size-10 shrink-0"
  },
  "variants": {
    "marquee": {
      "false": {
        "logos": "flex items-center shrink-0 justify-around gap-(--gap) [--gap:--spacing(16)]"
      }
    }
  }
};

/* DOM extracted from PageLogos.vue — element nesting and data-slot names as shipped. */
const tree = [{"t":"DefineCreateItemTemplate","c":[{"t":"template","if":1,"c":[{"t":"template","for":1,"c":[{"t":"UAvatar","s":"logo","if":1},{"t":"UIcon","s":"logo"}]}]}]},{"t":"Primitive","s":"root","c":[{"t":"h2","s":"title","if":1},{"t":"UMarquee","s":"logos","if":1},{"t":"div","s":"logos"}]}];

/* PageLogos.vue:30-72: the item list is defined once (DefineCreateItemTemplate)
   and reused inside whichever `logos` wrapper renders — UMarquee when
   `marquee`, the plain div otherwise. A string item is a UIcon of that name,
   an object a UAvatar. */
const render = createRenderer('page-logos', pageLogosTheme, tree, {
  inlineDefineInto: { CreateItem: 'logos' },
  renderIf: (slot, { props, node, item }) => {
    if (slot === 'logos') return (node.t === 'UMarquee') === !!props.marquee ? true : false;
    if (slot === 'logo') {
      const isObj = item !== null && typeof item === 'object';
      return (node.t === 'UAvatar') === isObj ? true : false;
    }
    return undefined;
  },
  slotContent: (slot, { item }) => (slot === 'logo' && typeof item === 'string' ? item : undefined)
});

export function PageLogos(props) {
  return render(props);
}
