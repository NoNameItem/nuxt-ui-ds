import React from 'react';
import { createRenderer } from '../../lib/factory.jsx';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/tabs.ts (source/themes.json -> "tabs").
   Values are literal: no rounding, no cross-component alignment. */
export const tabsTheme = {
  "slots": {
    "root": "flex items-center gap-2",
    "list": "relative flex p-1 group",
    "indicator": "absolute transition-[translate,width] duration-200 ease-out motion-reduce:transition-none",
    "trigger": [
      "group relative inline-flex items-center min-w-0 data-[state=inactive]:text-muted hover:data-[state=inactive]:not-disabled:text-default font-medium rounded-md disabled:cursor-not-allowed disabled:opacity-75",
      "transition-colors"
    ],
    "leadingIcon": "shrink-0",
    "leadingAvatar": "shrink-0",
    "leadingAvatarSize": "",
    "label": "truncate",
    "trailingBadge": "shrink-0",
    "trailingBadgeSize": "sm",
    "content": "w-full rounded-md focus-visible:outline-3"
  },
  "variants": {
    "color": {
      "primary": {
        "content": "outline-primary/25"
      },
      "secondary": {
        "content": "outline-secondary/25"
      },
      "success": {
        "content": "outline-success/25"
      },
      "info": {
        "content": "outline-info/25"
      },
      "warning": {
        "content": "outline-warning/25"
      },
      "error": {
        "content": "outline-error/25"
      },
      "neutral": {
        "content": "outline-inverted/25"
      }
    },
    "variant": {
      "pill": {
        "list": "bg-elevated rounded-lg",
        "trigger": [
          "grow",
          "in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:before:content-[''] in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:before:absolute in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:before:inset-0 in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:before:rounded-md in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:before:shadow-xs in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:before:-z-10 in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:isolate"
        ],
        "indicator": "rounded-md shadow-xs"
      },
      "link": {
        "list": "border-default",
        "indicator": "rounded-full",
        "trigger": "in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:after:content-[''] in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:after:absolute in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:after:rounded-full"
      }
    },
    "orientation": {
      "horizontal": {
        "root": "flex-col",
        "list": "w-full",
        "indicator": "left-0 w-(--reka-tabs-indicator-size) translate-x-(--reka-tabs-indicator-position)",
        "trigger": "justify-center"
      },
      "vertical": {
        "list": "flex-col",
        "indicator": "top-0 h-(--reka-tabs-indicator-size) translate-y-(--reka-tabs-indicator-position)"
      }
    },
    "size": {
      "xs": {
        "trigger": "px-2 py-1 text-xs gap-1",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs"
      },
      "sm": {
        "trigger": "px-2.5 py-1.5 text-xs gap-1.5",
        "leadingIcon": "size-4",
        "leadingAvatarSize": "3xs"
      },
      "md": {
        "trigger": "px-3 py-1.5 text-sm gap-1.5",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs"
      },
      "lg": {
        "trigger": "px-3 py-2 text-sm gap-2",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs"
      },
      "xl": {
        "trigger": "px-3 py-2 text-base gap-2",
        "leadingIcon": "size-6",
        "leadingAvatarSize": "xs"
      }
    }
  },
  "compoundVariants": [
    {
      "orientation": "horizontal",
      "variant": "pill",
      "class": {
        "indicator": "inset-y-1"
      }
    },
    {
      "orientation": "horizontal",
      "variant": "link",
      "class": {
        "list": "border-b -mb-px",
        "indicator": "-bottom-px h-px",
        "trigger": "in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:after:inset-x-0 in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:after:-bottom-[calc(var(--spacing)+1px)] in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:after:h-px"
      }
    },
    {
      "orientation": "vertical",
      "variant": "pill",
      "class": {
        "indicator": "inset-x-1",
        "list": "items-center",
        "trigger": "w-full justify-center"
      }
    },
    {
      "orientation": "vertical",
      "variant": "link",
      "class": {
        "list": "border-s -ms-px",
        "indicator": "-start-px w-px",
        "trigger": "in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:after:inset-y-0 in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:after:-start-[calc(var(--spacing)+1px)] in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:after:w-px"
      }
    },
    {
      "color": "primary",
      "variant": "pill",
      "class": {
        "indicator": "bg-primary",
        "trigger": [
          "data-[state=active]:text-inverted outline-primary/25 focus-visible:outline-3",
          "in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:before:bg-primary"
        ]
      }
    },
    {
      "color": "secondary",
      "variant": "pill",
      "class": {
        "indicator": "bg-secondary",
        "trigger": [
          "data-[state=active]:text-inverted outline-secondary/25 focus-visible:outline-3",
          "in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:before:bg-secondary"
        ]
      }
    },
    {
      "color": "success",
      "variant": "pill",
      "class": {
        "indicator": "bg-success",
        "trigger": [
          "data-[state=active]:text-inverted outline-success/25 focus-visible:outline-3",
          "in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:before:bg-success"
        ]
      }
    },
    {
      "color": "info",
      "variant": "pill",
      "class": {
        "indicator": "bg-info",
        "trigger": [
          "data-[state=active]:text-inverted outline-info/25 focus-visible:outline-3",
          "in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:before:bg-info"
        ]
      }
    },
    {
      "color": "warning",
      "variant": "pill",
      "class": {
        "indicator": "bg-warning",
        "trigger": [
          "data-[state=active]:text-inverted outline-warning/25 focus-visible:outline-3",
          "in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:before:bg-warning"
        ]
      }
    },
    {
      "color": "error",
      "variant": "pill",
      "class": {
        "indicator": "bg-error",
        "trigger": [
          "data-[state=active]:text-inverted outline-error/25 focus-visible:outline-3",
          "in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:before:bg-error"
        ]
      }
    },
    {
      "color": "neutral",
      "variant": "pill",
      "class": {
        "indicator": "bg-inverted",
        "trigger": [
          "data-[state=active]:text-inverted outline-inverted/25 focus-visible:outline-3",
          "in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:before:bg-inverted"
        ]
      }
    },
    {
      "color": "primary",
      "variant": "link",
      "class": {
        "indicator": "bg-primary",
        "trigger": [
          "data-[state=active]:text-primary outline-primary/25 focus-visible:outline-3",
          "in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:after:bg-primary"
        ]
      }
    },
    {
      "color": "secondary",
      "variant": "link",
      "class": {
        "indicator": "bg-secondary",
        "trigger": [
          "data-[state=active]:text-secondary outline-secondary/25 focus-visible:outline-3",
          "in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:after:bg-secondary"
        ]
      }
    },
    {
      "color": "success",
      "variant": "link",
      "class": {
        "indicator": "bg-success",
        "trigger": [
          "data-[state=active]:text-success outline-success/25 focus-visible:outline-3",
          "in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:after:bg-success"
        ]
      }
    },
    {
      "color": "info",
      "variant": "link",
      "class": {
        "indicator": "bg-info",
        "trigger": [
          "data-[state=active]:text-info outline-info/25 focus-visible:outline-3",
          "in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:after:bg-info"
        ]
      }
    },
    {
      "color": "warning",
      "variant": "link",
      "class": {
        "indicator": "bg-warning",
        "trigger": [
          "data-[state=active]:text-warning outline-warning/25 focus-visible:outline-3",
          "in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:after:bg-warning"
        ]
      }
    },
    {
      "color": "error",
      "variant": "link",
      "class": {
        "indicator": "bg-error",
        "trigger": [
          "data-[state=active]:text-error outline-error/25 focus-visible:outline-3",
          "in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:after:bg-error"
        ]
      }
    },
    {
      "color": "neutral",
      "variant": "link",
      "class": {
        "indicator": "bg-inverted",
        "trigger": [
          "data-[state=active]:text-highlighted outline-inverted/25 focus-visible:outline-3",
          "in-[[data-slot=list]:not(:has([data-slot=indicator]))]:data-[state=active]:after:bg-inverted"
        ]
      }
    }
  ],
  "defaultVariants": {
    "color": "primary",
    "variant": "pill",
    "size": "md"
  }
};

/* DOM extracted from Tabs.vue — element nesting and data-slot names as shipped. */
const tree = [{"t":"TabsRoot","s":"root","c":[{"t":"TabsList","s":"list","c":[{"t":"TabsIndicator","s":"indicator"},{"t":"TabsTrigger","s":"trigger","for":1,"c":[{"t":"slot","c":[{"t":"UIcon","s":"leadingIcon","if":1},{"t":"UAvatar","s":"leadingAvatar","if":1}]},{"t":"span","s":"label","if":1},{"t":"slot","c":[{"t":"UBadge","s":"trailingBadge","if":1}]}]}]},{"t":"template","if":1,"c":[{"t":"TabsContent","s":"content","for":1}]}]}];

const render = createRenderer('tabs', tabsTheme, tree, {
  inactiveState: 'trigger',
  /* Tabs.vue:87-96 — `<UBadge color="neutral" variant="outline"
     :size="… || ui.trailingBadgeSize()">`, theme trailingBadgeSize "sm" */
  slotProps: { trailingBadge: { color: 'neutral', variant: 'outline', size: tabsTheme.slots.trailingBadgeSize } },
  /* content panels exist only for items that carry content — and only for the
     ACTIVE item: reka's TabsContent unmounts the hidden panels, so emitting
     every panel stacked both of them on top of each other */
  renderIf(slot, { props, item }) {
    /* Tabs.vue:104 renders a panel for EVERY item (`content` defaults to true);
       the inactive ones are zero-height, which is why the library's root is 48
       and not 40. They are marked and hidden below rather than dropped — drawn
       plain, they stacked under the active one. */
    if (slot === 'content') return props.content !== false && !!(props.items || []).length;
    /* while the geometry is unknown the indicator must NOT exist: its mere
       presence satisfies the theme's `:not(:has([data-slot=indicator]))` guard
       and suppresses the ::before fallback pill, so a zero-width indicator left
       the active pill label white on light grey */
    if (slot === 'indicator') return !!props.tabsVars;
    return undefined;
  },
  /* the measured geometry is applied through the RENDER, not by touching the DOM:
     the list element's style is React-owned (it carries the theme's own custom
     properties), so every re-render wiped the two reka variables an effect had
     set directly — that is why the card's lists ended up with no style at all. */
  slotAttrs(slot, props, variants, { item }) {
    /* reka's TabsContent carries its state and hides the inactive panels */
    if (slot === 'content') {
      return (item && item.active)
        ? { 'data-state': 'active' }
        : { 'data-state': 'inactive', hidden: true };
    }
    /* reka's TabsIndicator writes the two variables on ITSELF (TabsIndicator.js:46-53) */
    if (slot !== 'indicator' || !props.tabsVars) return null;
    return {
      style: {
        '--reka-tabs-indicator-size': props.tabsVars.size + 'px',
        '--reka-tabs-indicator-position': props.tabsVars.pos + 'px'
      }
    };
  }
});

/* reka publishes the active trigger's geometry on the LIST as
   --reka-tabs-indicator-size / --reka-tabs-indicator-position, and the theme
   sizes and translates the indicator entirely from those two variables. */
export function Tabs(props) {
  /* the tree has two top-level nodes (TabsRoot and the content template), so the
     renderer may return a Fragment — a ref cloned onto it is swallowed, so a
     marker attribute finds the real element instead. */
  const id = React.useMemo(() => 'tabs-' + Math.random().toString(36).slice(2, 9), []);
  const [vars, setVars] = React.useState(null);

  /* Measured on EVERY commit, and sampled for about a second after one: a
     single measurement is taken at whatever width the layout happens to have at
     that instant, and in this environment ResizeObserver callbacks are never
     delivered, so "measure once, then watch" left the indicator holding a
     206px width under a 150px trigger for good. Sampling until the value stops
     changing costs a few getBoundingClientRect calls and cannot go stale. */
  React.useLayoutEffect(() => {
    const vertical = props.orientation === 'vertical';
    let live = true, ro = null, frame = 0, started = 0;

    const measure = () => {
      if (!live) return false;
      const root = document.querySelector('[data-tabs-instance="' + id + '"]');
      const list = root && (root.matches('[data-slot="list"]') ? root : root.querySelector('[data-slot="list"]'));
      const active = root && root.querySelector('[data-slot="trigger"][data-state="active"]');
      if (!list || !active) return false;
      /* reka reads offsetWidth / offsetLeft (offsetHeight / offsetTop when
         vertical) — integers, relative to the `relative` list */
      const size = vertical ? active.offsetHeight : active.offsetWidth;
      if (!size) return false;
      const pos = vertical ? active.offsetTop : active.offsetLeft;
      setVars((prev) => (prev && Math.abs(prev.size - size) < 0.5 && Math.abs(prev.pos - pos) < 0.5) ? prev : { size, pos });
      if (!ro && typeof ResizeObserver !== 'undefined') {
        ro = new ResizeObserver(() => measure());
        ro.observe(list);
        ro.observe(active);
        if (document.body) ro.observe(document.body);
      }
      return true;
    };

    /* keep sampling for ~1s whether or not a pass succeeded — the last sample
       wins, so a width that settles late is the one that sticks */
    const sample = (now) => {
      if (!live) return;
      if (!started) started = now || 0;
      measure();
      if (!now || now - started < 1000) frame = requestAnimationFrame(sample);
    };
    sample(0);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => measure());
    return () => { live = false; if (frame) cancelAnimationFrame(frame); if (ro) ro.disconnect(); };
  });

  return render({ ...props, tabsVars: vars, 'data-tabs-instance': id });
}
