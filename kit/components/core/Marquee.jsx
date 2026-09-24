import React from 'react';
import { register } from '../../lib/registry.js';
import { createRenderer } from '../../lib/factory.jsx';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/marquee.ts (source/themes.json -> "marquee").
   Values are literal: no rounding, no cross-component alignment. */
export const marqueeTheme = {
  "slots": {
    "root": "group relative flex items-center overflow-hidden gap-(--gap) [--gap:--spacing(16)] [--duration:20s]",
    "content": "flex items-center shrink-0 justify-around gap-(--gap) min-w-max"
  },
  "variants": {
    "orientation": {
      "horizontal": {
        "content": "w-full"
      },
      "vertical": {
        "content": "h-full"
      }
    },
    "pauseOnHover": {
      "true": {
        "content": "group-hover:[animation-play-state:paused]"
      }
    },
    "reverse": {
      "true": {
        "content": "![animation-direction:reverse]"
      }
    },
    "overlay": {
      "true": {
        "root": "before:absolute before:pointer-events-none before:content-[\"\"] before:z-2 before:from-default before:to-transparent after:absolute after:pointer-events-none after:content-[\"\"] after:z-2 after:from-default after:to-transparent"
      }
    }
  },
  "compoundVariants": [
    {
      "orientation": "horizontal",
      "class": {
        "root": "flex-row",
        "content": "flex-row motion-safe:animate-[marquee_var(--duration)_linear_infinite] motion-safe:rtl:animate-[marquee-rtl_var(--duration)_linear_infinite] backface-hidden"
      }
    },
    {
      "orientation": "horizontal",
      "overlay": true,
      "class": {
        "root": "before:inset-y-0 before:start-0 before:h-full before:w-1/3 before:bg-gradient-to-r rtl:before:bg-gradient-to-l after:inset-y-0 after:end-0 after:h-full after:w-1/3 after:bg-gradient-to-l rtl:after:bg-gradient-to-r backface-hidden"
      }
    },
    {
      "orientation": "vertical",
      "class": {
        "root": "flex-col",
        "content": "flex-col motion-safe:animate-[marquee-vertical_var(--duration)_linear_infinite] h-[fit-content] backface-hidden"
      }
    },
    {
      "orientation": "vertical",
      "overlay": true,
      "class": {
        "root": "before:inset-x-0 before:top-0 before:w-full before:h-1/3 before:bg-gradient-to-b after:inset-x-0 after:bottom-0 after:w-full after:h-1/3 after:bg-gradient-to-t backface-hidden"
      }
    }
  ]
};

/* DOM extracted from Marquee.vue — element nesting and data-slot names as shipped.
   The `for` on the content div is not a loop over items: Marquee.vue repeats the
   content div `repeat` times (defineProps default 4), each copy holding the SAME
   default slot, and that duplication is what makes the scroll seamless. */
const tree = [{"t":"Primitive","s":"root","c":[{"t":"div","s":"content","for":1}]}];

const render = createRenderer('marquee', marqueeTheme, tree, {
  repeatSlot: 'content',
  repeatProp: 'repeat',
  childSlot: 'content'
});

export function Marquee(props) {
  const { items, children, ...rest } = props;
  /* a list of strings is the convenience form of the default slot */
  const inner = children !== undefined ? children
    : (items || []).map((it, i) => React.createElement('span', { key: i }, it && typeof it === 'object' ? it.label : it));
  return render({ ...rest, children: inner });
}

/* nested inside other components' DOM — the renderer mounts it by name */
register('Marquee', Marquee);
