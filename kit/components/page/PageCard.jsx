import React from 'react';
import { createRenderer } from '../../lib/factory.jsx';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/page-card.ts (source/themes.json -> "page-card").
   Values are literal: no rounding, no cross-component alignment. */
export const pageCardTheme = {
  "slots": {
    "root": "relative flex rounded-lg",
    "spotlight": "absolute inset-0 rounded-[inherit] pointer-events-none bg-default/90",
    "container": "relative flex flex-col flex-1 lg:grid gap-x-8 gap-y-4 p-4 sm:p-6",
    "wrapper": "flex flex-col flex-1 items-start",
    "header": "mb-4",
    "body": "flex-1",
    "footer": "pt-4 mt-auto",
    "leading": "inline-flex items-center mb-2.5",
    "leadingIcon": "size-5 shrink-0 text-primary",
    "title": "text-base text-pretty font-semibold text-highlighted",
    "description": "text-[15px] text-pretty"
  },
  "variants": {
    "orientation": {
      "horizontal": {
        "container": "lg:grid-cols-2 lg:items-center"
      },
      "vertical": {
        "container": ""
      }
    },
    "reverse": {
      "true": {
        "wrapper": "order-last"
      }
    },
    "variant": {
      "solid": {
        "root": "bg-inverted text-inverted",
        "title": "text-inverted",
        "description": "text-dimmed"
      },
      "outline": {
        "root": "bg-default ring ring-default",
        "description": "text-muted"
      },
      "soft": {
        "root": "bg-elevated/50",
        "description": "text-toned"
      },
      "subtle": {
        "root": "bg-elevated/50 ring ring-default",
        "description": "text-toned"
      },
      "ghost": {
        "description": "text-muted"
      },
      "naked": {
        "container": "p-0 sm:p-0",
        "description": "text-muted"
      }
    },
    "to": {
      "true": {
        "root": [
          "outline-primary/25 has-[>a:focus-visible]:outline-3",
          "transition"
        ]
      }
    },
    "title": {
      "true": {
        "description": "mt-1"
      }
    },
    "highlight": {
      "true": {
        "root": "ring-2"
      }
    },
    "highlightColor": {
      "primary": "",
      "secondary": "",
      "success": "",
      "info": "",
      "warning": "",
      "error": "",
      "neutral": ""
    },
    "spotlight": {
      "true": {
        "root": "[--spotlight-size:400px] before:absolute before:-inset-px before:pointer-events-none before:rounded-[inherit] before:bg-[radial-gradient(var(--spotlight-size)_var(--spotlight-size)_at_calc(var(--spotlight-x,0px))_calc(var(--spotlight-y,0px)),var(--spotlight-color),transparent_70%)]"
      }
    },
    "spotlightColor": {
      "primary": "",
      "secondary": "",
      "success": "",
      "info": "",
      "warning": "",
      "error": "",
      "neutral": ""
    }
  },
  "compoundVariants": [
    {
      "variant": "solid",
      "to": true,
      "class": {
        "root": "hover:bg-inverted/90"
      }
    },
    {
      "variant": "outline",
      "to": true,
      "class": {
        "root": "hover:bg-elevated/50"
      }
    },
    {
      "variant": "soft",
      "to": true,
      "class": {
        "root": "hover:bg-elevated"
      }
    },
    {
      "variant": "subtle",
      "to": true,
      "class": {
        "root": "hover:bg-elevated"
      }
    },
    {
      "variant": "subtle",
      "to": true,
      "highlight": false,
      "class": {
        "root": "hover:ring-accented"
      }
    },
    {
      "variant": [
        "outline",
        "subtle"
      ],
      "to": true,
      "highlight": false,
      "class": {
        "root": "has-[>a:focus-visible]:ring-primary"
      }
    },
    {
      "variant": "ghost",
      "to": true,
      "class": {
        "root": "hover:bg-elevated/50"
      }
    },
    {
      "highlightColor": "primary",
      "highlight": true,
      "class": {
        "root": "ring-primary"
      }
    },
    {
      "highlightColor": "secondary",
      "highlight": true,
      "class": {
        "root": "ring-secondary"
      }
    },
    {
      "highlightColor": "success",
      "highlight": true,
      "class": {
        "root": "ring-success"
      }
    },
    {
      "highlightColor": "info",
      "highlight": true,
      "class": {
        "root": "ring-info"
      }
    },
    {
      "highlightColor": "warning",
      "highlight": true,
      "class": {
        "root": "ring-warning"
      }
    },
    {
      "highlightColor": "error",
      "highlight": true,
      "class": {
        "root": "ring-error"
      }
    },
    {
      "highlightColor": "neutral",
      "highlight": true,
      "class": {
        "root": "ring-inverted"
      }
    },
    {
      "spotlightColor": "primary",
      "spotlight": true,
      "class": {
        "root": "[--spotlight-color:var(--ui-primary)]"
      }
    },
    {
      "spotlightColor": "secondary",
      "spotlight": true,
      "class": {
        "root": "[--spotlight-color:var(--ui-secondary)]"
      }
    },
    {
      "spotlightColor": "success",
      "spotlight": true,
      "class": {
        "root": "[--spotlight-color:var(--ui-success)]"
      }
    },
    {
      "spotlightColor": "info",
      "spotlight": true,
      "class": {
        "root": "[--spotlight-color:var(--ui-info)]"
      }
    },
    {
      "spotlightColor": "warning",
      "spotlight": true,
      "class": {
        "root": "[--spotlight-color:var(--ui-warning)]"
      }
    },
    {
      "spotlightColor": "error",
      "spotlight": true,
      "class": {
        "root": "[--spotlight-color:var(--ui-error)]"
      }
    },
    {
      "spotlightColor": "neutral",
      "spotlight": true,
      "class": {
        "root": "[--spotlight-color:var(--ui-bg-inverted)]"
      }
    }
  ],
  "defaultVariants": {
    "variant": "outline",
    "highlightColor": "primary",
    "spotlightColor": "primary"
  }
};

/* DOM extracted from PageCard.vue. The bare `<slot />` at PageCard.vue:115 —
   a direct child of `container`, AFTER `wrapper` closes — carries no
   `data-slot` and was dropped in extraction, so the card's own children fell
   through to the first named slot instead (`body`) and pushed the title and
   description 163px down. */
const tree = [{"t":"Primitive","s":"root","c":[{"t":"div","s":"spotlight","if":1},{"t":"div","s":"container","c":[{"t":"div","s":"wrapper","if":1,"c":[{"t":"div","s":"header","if":1},{"t":"div","s":"leading","if":1,"c":[{"t":"slot","c":[{"t":"UIcon","s":"leadingIcon","if":1}]}]},{"t":"div","s":"body","if":1,"c":[{"t":"slot","c":[{"t":"div","s":"title","if":1},{"t":"div","s":"description","if":1}]}]},{"t":"div","s":"footer","if":1}]},{"t":"slot"}]}]}];

const render = createRenderer('page-card', pageCardTheme, tree, {
  /* the bare `<slot />` restored in the tree above is where children belong */
  childAnchor: true
});

/* PageCard.vue:44,77 — useMouseInElement updates on mount with the pointer at
   (0, 0): elementX = -(rect.left + scrollX), elementY = -(rect.top + scrollY),
   written to the root as --spotlight-x / --spotlight-y until the mouse moves */
export function PageCard(props) {
  const ref = React.useRef(null);
  const [pos, setPos] = React.useState(null);
  React.useLayoutEffect(() => {
    if (!props.spotlight || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setPos({ x: -(r.left + window.scrollX), y: -(r.top + window.scrollY) });
  }, [props.spotlight]);
  const el = render(props);
  if (!props.spotlight || !React.isValidElement(el) || typeof el.type !== 'string') return el;
  const style = pos ? { ...(el.props.style || {}), '--spotlight-x': pos.x + 'px', '--spotlight-y': pos.y + 'px' } : el.props.style;
  return React.cloneElement(el, { ref, style });
}
