import React from 'react';
import { createRenderer } from '../../lib/factory.jsx';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/chat-prompt.ts (source/themes.json -> "chat-prompt").
   Values are literal: no rounding, no cross-component alignment. */
export const chatPromptTheme = {
  "slots": {
    "root": "relative flex flex-col items-stretch gap-2 px-2.5 py-2 w-full rounded-lg backdrop-blur-sm",
    "header": "flex items-center gap-1.5",
    "body": "items-start gap-1.5",
    "footer": "flex items-center justify-between gap-1.5",
    "base": "px-0"
  },
  "variants": {
    "color": {
      "primary": "",
      "secondary": "",
      "success": "",
      "info": "",
      "warning": "",
      "error": "",
      "neutral": ""
    },
    "variant": {
      "outline": {
        "root": "bg-default/75 ring ring-default"
      },
      "soft": {
        "root": "bg-elevated/50"
      },
      "subtle": {
        "root": "bg-elevated/50 ring ring-default"
      },
      "naked": {
        "root": ""
      }
    }
  },
  "compoundVariants": [
    {
      "color": "primary",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": {
        "root": "outline-primary/25 has-[textarea:focus-visible]:outline-3 has-[textarea:focus-visible]:ring-primary has-[[contenteditable]:focus-visible]:outline-3 has-[[contenteditable]:focus-visible]:ring-primary"
      }
    },
    {
      "color": "secondary",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": {
        "root": "outline-secondary/25 has-[textarea:focus-visible]:outline-3 has-[textarea:focus-visible]:ring-secondary has-[[contenteditable]:focus-visible]:outline-3 has-[[contenteditable]:focus-visible]:ring-secondary"
      }
    },
    {
      "color": "success",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": {
        "root": "outline-success/25 has-[textarea:focus-visible]:outline-3 has-[textarea:focus-visible]:ring-success has-[[contenteditable]:focus-visible]:outline-3 has-[[contenteditable]:focus-visible]:ring-success"
      }
    },
    {
      "color": "info",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": {
        "root": "outline-info/25 has-[textarea:focus-visible]:outline-3 has-[textarea:focus-visible]:ring-info has-[[contenteditable]:focus-visible]:outline-3 has-[[contenteditable]:focus-visible]:ring-info"
      }
    },
    {
      "color": "warning",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": {
        "root": "outline-warning/25 has-[textarea:focus-visible]:outline-3 has-[textarea:focus-visible]:ring-warning has-[[contenteditable]:focus-visible]:outline-3 has-[[contenteditable]:focus-visible]:ring-warning"
      }
    },
    {
      "color": "error",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": {
        "root": "outline-error/25 has-[textarea:focus-visible]:outline-3 has-[textarea:focus-visible]:ring-error has-[[contenteditable]:focus-visible]:outline-3 has-[[contenteditable]:focus-visible]:ring-error"
      }
    },
    {
      "color": "primary",
      "variant": "soft",
      "class": {
        "root": "outline-primary/25 has-[textarea:focus-visible]:outline-3 has-[[contenteditable]:focus-visible]:outline-3"
      }
    },
    {
      "color": "secondary",
      "variant": "soft",
      "class": {
        "root": "outline-secondary/25 has-[textarea:focus-visible]:outline-3 has-[[contenteditable]:focus-visible]:outline-3"
      }
    },
    {
      "color": "success",
      "variant": "soft",
      "class": {
        "root": "outline-success/25 has-[textarea:focus-visible]:outline-3 has-[[contenteditable]:focus-visible]:outline-3"
      }
    },
    {
      "color": "info",
      "variant": "soft",
      "class": {
        "root": "outline-info/25 has-[textarea:focus-visible]:outline-3 has-[[contenteditable]:focus-visible]:outline-3"
      }
    },
    {
      "color": "warning",
      "variant": "soft",
      "class": {
        "root": "outline-warning/25 has-[textarea:focus-visible]:outline-3 has-[[contenteditable]:focus-visible]:outline-3"
      }
    },
    {
      "color": "error",
      "variant": "soft",
      "class": {
        "root": "outline-error/25 has-[textarea:focus-visible]:outline-3 has-[[contenteditable]:focus-visible]:outline-3"
      }
    },
    {
      "color": "neutral",
      "variant": [
        "outline",
        "subtle"
      ],
      "class": {
        "root": "outline-inverted/25 has-[textarea:focus-visible]:outline-3 has-[textarea:focus-visible]:ring-inverted has-[[contenteditable]:focus-visible]:outline-3 has-[[contenteditable]:focus-visible]:ring-inverted"
      }
    },
    {
      "color": "neutral",
      "variant": "soft",
      "class": {
        "root": "outline-inverted/25 has-[textarea:focus-visible]:outline-3 has-[[contenteditable]:focus-visible]:outline-3"
      }
    }
  ],
  "defaultVariants": {
    "color": "primary",
    "variant": "outline"
  }
};

/* DOM extracted from ChatPrompt.vue — element nesting and data-slot names as shipped. */
const tree = [{"t":"Primitive","s":"root","c":[{"t":"div","s":"header","if":1},{"t":"slot","c":[{"t":"UTextarea","s":"body","p":{"variant":"none"},"fwd":["rows","maxrows","autoresize","placeholder","disabled","autofocus"]}]},{"t":"div","s":"footer","if":1}]}];

const render = createRenderer('chat-prompt', chatPromptTheme, tree);

/* The field that ends up focused is a property of the DOCUMENT, not of any one
   prompt: every `ChatPrompt` has `autofocus` on by default (ChatPrompt.vue:28),
   each focuses its own field on mount, and the one that mounted LAST keeps it —
   which is why the library rings the bottom form of a 25-prompt page.

   Resolved once, after all instances have mounted, rather than by each instance
   stripping the others as it mounts: effects re-run (React invokes them twice in
   development), so a per-instance take-over can hand the focus back to an
   earlier prompt. Each instance only says "I want it" by marking its field; the
   resolver below then picks the last such field in document order.

   The marker is also what draws the ring: `:focus-visible` never matches a
   programmatic `.focus()`, so the theme's `has-[textarea:focus-visible]`
   conditional gets a static stand-in paired in tokens/utilities-extra.css. */
let resolving = false;
function resolveAutofocus() {
  if (resolving) return;
  resolving = true;
  setTimeout(() => {
    resolving = false;
    const wanting = document.querySelectorAll('textarea[data-autofocus]');
    const winner = wanting[wanting.length - 1];
    for (const held of document.querySelectorAll('textarea[data-focus-visible]')) {
      if (held !== winner) held.removeAttribute('data-focus-visible');
    }
    if (!winner) return;
    winner.setAttribute('data-focus-visible', 'true');
    winner.focus();
  }, 0);
}

export function ChatPrompt(props) {
  const { autofocus = true, ...rest } = props;
  const rootRef = React.useRef(null);
  React.useEffect(() => {
    const field = rootRef.current && rootRef.current.querySelector('textarea');
    if (!field) return undefined;
    if (autofocus === false) {
      field.removeAttribute('data-autofocus');
      return undefined;
    }
    field.setAttribute('data-autofocus', 'true');
    resolveAutofocus();
    return () => { field.removeAttribute('data-autofocus'); };
  }, [autofocus]);
  const el = render({ ...rest, autofocus: false });
  return React.isValidElement(el) ? React.cloneElement(el, { ref: rootRef }) : el;
}
