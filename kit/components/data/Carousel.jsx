import React from 'react';
import { createRenderer } from '../../lib/factory.jsx';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/carousel.ts (source/themes.json -> "carousel").
   Values are literal: no rounding, no cross-component alignment. */
export const carouselTheme = {
  "slots": {
    "root": "relative focus:outline-none",
    "viewport": "overflow-hidden",
    "container": "flex items-start",
    "item": "min-w-0 shrink-0 basis-full",
    "controls": "",
    "arrows": "",
    "prev": "absolute rounded-full",
    "next": "absolute rounded-full",
    "dots": "absolute inset-x-0 -bottom-7 flex flex-wrap items-center justify-center gap-3",
    "dot": [
      "cursor-pointer size-3 bg-accented rounded-full outline-inverted/25 focus-visible:outline-3",
      "transition"
    ]
  },
  "variants": {
    "orientation": {
      "vertical": {
        "container": "flex-col -mt-4",
        "item": "pt-4",
        "prev": "top-4 sm:-top-12 left-1/2 -translate-x-1/2 rotate-90 rtl:-rotate-90",
        "next": "bottom-4 sm:-bottom-12 left-1/2 -translate-x-1/2 rotate-90 rtl:-rotate-90"
      },
      "horizontal": {
        "container": "flex-row -ms-4",
        "item": "ps-4",
        "prev": "start-4 sm:-start-12 top-1/2 -translate-y-1/2",
        "next": "end-4 sm:-end-12 top-1/2 -translate-y-1/2"
      }
    },
    "active": {
      "true": {
        "dot": "data-[state=active]:bg-inverted"
      }
    }
  }
};

/* DOM extracted from Carousel.vue — element nesting and data-slot names as shipped. */
const tree = [{"t":"Primitive","s":"root","c":[{"t":"div","s":"viewport","c":[{"t":"div","s":"container","c":[{"t":"div","s":"item","for":1}]}]},{"t":"div","s":"controls","if":1,"c":[{"t":"div","s":"arrows","if":1,"c":[{"t":"UButton","s":"prev"},{"t":"UButton","s":"next"}]},{"t":"div","s":"dots","if":1,"c":[{"t":"template","for":1,"c":[{"t":"button","s":"dot"}]}]}]}]}];

const render = createRenderer('carousel', carouselTheme, tree, {
  /* Carousel.vue:152 renders each item as its image: an item is either the src
     itself or an object naming one, and no field mapping can produce the <img>.
     Without it every slide was an empty div and three of four carousels
     measured 0px tall. */
  slotContent(slot, { item }) {
    if (slot !== 'item' || item === undefined || item === null) return undefined;
    const src = typeof item === 'string' ? item : (item.src || item.image || item.url);
    if (!src) return undefined;
    return React.createElement('img', { src, alt: (item && item.alt) || '', className: 'w-full h-auto rounded-lg', width: item && item.width, height: item && item.height });
  }
});

/* Carousel.vue:221-258 — the arrows are disabled by `!canScrollPrev` / `!canScrollNext`
   (statically: the first slide is selected) and labelled Prev / Next, the prop's
   object bound over them; each dot is an EMPTY tab button, the selected one
   (index 0) `data-state="active"` with the theme's `active: true` class, and
   the dots row is a tablist. The caller's slot function fills `item` only. */
const ACTIVE_DOT = 'data-[state=active]:bg-inverted';
function staticState(el, props) {
  const count = Array.isArray(props.items) ? props.items.length : 0;
  let dot = 0;
  const walk = (node) => {
    if (Array.isArray(node)) return node.map(walk);
    if (!React.isValidElement(node)) return node;
    const slot = node.props['data-slot'];
    if ((slot === 'prev' || slot === 'next') && typeof node.type !== 'string') {
      const own = props[slot] && typeof props[slot] === 'object' ? props[slot] : {};
      return React.cloneElement(node, {
        disabled: slot === 'prev' ? true : count <= 1,
        'aria-label': slot === 'prev' ? 'Prev' : 'Next', ...own
      });
    }
    if (slot === 'dot') {
      const i = dot++;
      const active = i === 0;
      const cls = active ? node.props.className
        : String(node.props.className || '').split(/\s+/).filter((c) => c && c !== ACTIVE_DOT).join(' ');
      return React.cloneElement(node, {
        className: cls, role: 'tab', 'aria-label': 'Go to slide ' + (i + 1), 'aria-selected': active,
        'data-state': active ? 'active' : undefined, children: undefined
      });
    }
    const ch = node.props.children;
    const extra = slot === 'dots' ? { role: 'tablist' } : undefined;
    if (ch === undefined || ch === null) return extra ? React.cloneElement(node, extra) : node;
    const next = walk(ch);
    return React.cloneElement(node, extra, ...(Array.isArray(next) ? next : [next]));
  };
  return walk(el);
}

export function Carousel(props) {
  return staticState(render(props), props);
}
