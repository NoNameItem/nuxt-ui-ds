import React from 'react';
import { register } from '../../lib/registry.js';
import { createRenderer } from '../../lib/factory.jsx';
import { useCompact } from '../../lib/compact.jsx';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/chat-message.ts (source/themes.json -> "chat-message").
   Values are literal: no rounding, no cross-component alignment. */
export const chatMessageTheme = {
  "slots": {
    "root": "group/message relative w-full",
    "header": "flex mb-1.5",
    "container": "relative flex items-start",
    "body": "min-w-0",
    "leading": "inline-flex items-center justify-center min-h-6",
    "leadingIcon": "shrink-0",
    "leadingAvatar": "shrink-0",
    "leadingAvatarSize": "",
    "files": "flex items-center gap-1.5",
    "content": "relative text-pretty wrap-break-word *:first:mt-0 *:last:mb-0",
    "actions": [
      "[@media(hover:hover)]:opacity-0 group-hover/message:opacity-100 absolute bottom-0 flex items-center",
      "transition-opacity ease-out"
    ]
  },
  "variants": {
    "variant": {
      "solid": "",
      "outline": "",
      "soft": "",
      "subtle": "",
      "naked": ""
    },
    "color": {
      "primary": "",
      "secondary": "",
      "success": "",
      "info": "",
      "warning": "",
      "error": "",
      "neutral": ""
    },
    "side": {
      "left": {},
      "right": {
        "container": "justify-end ms-auto max-w-[75%]",
        "header": "justify-end",
        "actions": "right-0"
      }
    },
    "leading": {
      "true": ""
    },
    "actions": {
      "true": ""
    },
    "compact": {
      "true": {
        "root": "scroll-mt-3",
        "container": "gap-1.5 pb-3",
        "content": "space-y-2",
        "leadingIcon": "size-5",
        "leadingAvatarSize": "2xs"
      },
      "false": {
        "root": "scroll-mt-4 sm:scroll-mt-6",
        "container": "gap-3 pb-8",
        "content": "space-y-4",
        "leadingIcon": "size-8",
        "leadingAvatarSize": "md"
      }
    }
  },
  "compoundVariants": [
    {
      "compact": true,
      "actions": true,
      "class": {
        "container": "pb-8"
      }
    },
    {
      "variant": [
        "solid",
        "outline",
        "soft",
        "subtle"
      ],
      "compact": false,
      "class": {
        "content": "px-4 py-3 rounded-lg min-h-12",
        "leading": "mt-2"
      }
    },
    {
      "variant": [
        "solid",
        "outline",
        "soft",
        "subtle"
      ],
      "compact": true,
      "class": {
        "content": "px-2 py-1 rounded-lg min-h-8",
        "leading": "mt-1"
      }
    },
    {
      "variant": "naked",
      "side": "left",
      "class": {
        "body": "w-full",
        "content": "w-full"
      }
    },
    {
      "color": "primary",
      "variant": "solid",
      "class": {
        "content": "bg-primary text-inverted"
      }
    },
    {
      "color": "secondary",
      "variant": "solid",
      "class": {
        "content": "bg-secondary text-inverted"
      }
    },
    {
      "color": "success",
      "variant": "solid",
      "class": {
        "content": "bg-success text-inverted"
      }
    },
    {
      "color": "info",
      "variant": "solid",
      "class": {
        "content": "bg-info text-inverted"
      }
    },
    {
      "color": "warning",
      "variant": "solid",
      "class": {
        "content": "bg-warning text-inverted"
      }
    },
    {
      "color": "error",
      "variant": "solid",
      "class": {
        "content": "bg-error text-inverted"
      }
    },
    {
      "color": "primary",
      "variant": "outline",
      "class": {
        "content": "text-primary ring ring-primary/25"
      }
    },
    {
      "color": "secondary",
      "variant": "outline",
      "class": {
        "content": "text-secondary ring ring-secondary/25"
      }
    },
    {
      "color": "success",
      "variant": "outline",
      "class": {
        "content": "text-success ring ring-success/25"
      }
    },
    {
      "color": "info",
      "variant": "outline",
      "class": {
        "content": "text-info ring ring-info/25"
      }
    },
    {
      "color": "warning",
      "variant": "outline",
      "class": {
        "content": "text-warning ring ring-warning/25"
      }
    },
    {
      "color": "error",
      "variant": "outline",
      "class": {
        "content": "text-error ring ring-error/25"
      }
    },
    {
      "color": "primary",
      "variant": "soft",
      "class": {
        "content": "bg-primary/10 text-primary"
      }
    },
    {
      "color": "secondary",
      "variant": "soft",
      "class": {
        "content": "bg-secondary/10 text-secondary"
      }
    },
    {
      "color": "success",
      "variant": "soft",
      "class": {
        "content": "bg-success/10 text-success"
      }
    },
    {
      "color": "info",
      "variant": "soft",
      "class": {
        "content": "bg-info/10 text-info"
      }
    },
    {
      "color": "warning",
      "variant": "soft",
      "class": {
        "content": "bg-warning/10 text-warning"
      }
    },
    {
      "color": "error",
      "variant": "soft",
      "class": {
        "content": "bg-error/10 text-error"
      }
    },
    {
      "color": "primary",
      "variant": "subtle",
      "class": {
        "content": "bg-primary/10 text-primary ring ring-primary/25"
      }
    },
    {
      "color": "secondary",
      "variant": "subtle",
      "class": {
        "content": "bg-secondary/10 text-secondary ring ring-secondary/25"
      }
    },
    {
      "color": "success",
      "variant": "subtle",
      "class": {
        "content": "bg-success/10 text-success ring ring-success/25"
      }
    },
    {
      "color": "info",
      "variant": "subtle",
      "class": {
        "content": "bg-info/10 text-info ring ring-info/25"
      }
    },
    {
      "color": "warning",
      "variant": "subtle",
      "class": {
        "content": "bg-warning/10 text-warning ring ring-warning/25"
      }
    },
    {
      "color": "error",
      "variant": "subtle",
      "class": {
        "content": "bg-error/10 text-error ring ring-error/25"
      }
    },
    {
      "color": "primary",
      "variant": "naked",
      "class": {
        "content": "text-primary"
      }
    },
    {
      "color": "secondary",
      "variant": "naked",
      "class": {
        "content": "text-secondary"
      }
    },
    {
      "color": "success",
      "variant": "naked",
      "class": {
        "content": "text-success"
      }
    },
    {
      "color": "info",
      "variant": "naked",
      "class": {
        "content": "text-info"
      }
    },
    {
      "color": "warning",
      "variant": "naked",
      "class": {
        "content": "text-warning"
      }
    },
    {
      "color": "error",
      "variant": "naked",
      "class": {
        "content": "text-error"
      }
    },
    {
      "color": "neutral",
      "variant": "solid",
      "class": {
        "content": "bg-inverted text-inverted"
      }
    },
    {
      "color": "neutral",
      "variant": "outline",
      "class": {
        "content": "bg-default ring ring-default"
      }
    },
    {
      "color": "neutral",
      "variant": "soft",
      "class": {
        "content": "bg-elevated/50"
      }
    },
    {
      "color": "neutral",
      "variant": "subtle",
      "class": {
        "content": "bg-elevated/50 ring ring-default"
      }
    }
  ],
  "defaultVariants": {
    "side": "left",
    "variant": "naked",
    "color": "neutral"
  }
};

/* DOM extracted from ChatMessage.vue — element nesting and data-slot names as shipped. */
const tree = [{"t":"Primitive","s":"root","c":[{"t":"div","s":"header","if":1,"c":[{"t":"slot","c":[{"t":"div","s":"files","if":1}]}]},{"t":"div","s":"container","c":[{"t":"div","s":"leading","if":1,"c":[{"t":"slot","c":[{"t":"UIcon","s":"leadingIcon","if":1},{"t":"UAvatar","s":"leadingAvatar","if":1}]}]},{"t":"div","s":"body","if":1,"c":[{"t":"slot","c":[{"t":"div","s":"content","if":1},{"t":"div","s":"actions","if":1}]}]}]}]}];

const render = createRenderer('chat-message', chatMessageTheme, tree);

export function ChatMessage(props) {
  /* ChatMessage.vue:45 — a message inside a palette is compact even when nobody
     passed the prop down to it */
  const compact = useCompact(props.compact);
  return render(compact === undefined ? props : { ...props, compact });
}

/* nested inside other components' DOM — the renderer mounts it by name */
register('ChatMessage', ChatMessage);
