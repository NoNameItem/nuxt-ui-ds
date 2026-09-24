import React from 'react';
import { createRenderer } from '../../lib/factory.jsx';
import { register } from '../../lib/registry.js';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/avatar.ts (source/themes.json -> "avatar").
   Values are literal: no rounding, no cross-component alignment. */
export const avatarTheme = {
  "slots": {
    "root": "inline-flex items-center justify-center shrink-0 select-none rounded-full align-middle",
    "image": "h-full w-full rounded-[inherit] object-cover",
    "fallback": "font-medium truncate",
    "icon": "shrink-0"
  },
  "variants": {
    "color": {
      "primary": {
        "root": "bg-primary/10",
        "fallback": "text-primary",
        "icon": "text-primary"
      },
      "secondary": {
        "root": "bg-secondary/10",
        "fallback": "text-secondary",
        "icon": "text-secondary"
      },
      "success": {
        "root": "bg-success/10",
        "fallback": "text-success",
        "icon": "text-success"
      },
      "info": {
        "root": "bg-info/10",
        "fallback": "text-info",
        "icon": "text-info"
      },
      "warning": {
        "root": "bg-warning/10",
        "fallback": "text-warning",
        "icon": "text-warning"
      },
      "error": {
        "root": "bg-error/10",
        "fallback": "text-error",
        "icon": "text-error"
      },
      "neutral": {
        "root": "bg-elevated",
        "fallback": "text-muted",
        "icon": "text-muted"
      }
    },
    "size": {
      "3xs": {
        "root": "size-4 text-[8px]"
      },
      "2xs": {
        "root": "size-5 text-[10px]"
      },
      "xs": {
        "root": "size-6 text-xs"
      },
      "sm": {
        "root": "size-7 text-sm"
      },
      "md": {
        "root": "size-8 text-base"
      },
      "lg": {
        "root": "size-9 text-lg"
      },
      "xl": {
        "root": "size-10 text-xl"
      },
      "2xl": {
        "root": "size-11 text-[22px]"
      },
      "3xl": {
        "root": "size-12 text-2xl"
      }
    }
  },
  "defaultVariants": {
    "size": "md",
    "color": "neutral"
  }
};

/* DOM extracted from Avatar.vue — element nesting and data-slot names as shipped. */
const tree = [{"t":"component","s":"root","c":[{"t":"component","s":"image","if":1},{"t":"Slot","c":[{"t":"slot","c":[{"t":"UIcon","s":"icon","if":1},{"t":"span","s":"fallback"}]}]}]}];

const render = createRenderer('avatar', avatarTheme, tree, {
  /* Avatar.vue:38 makes the fallback the `v-else` of the icon and the image:
     with an icon present the library renders no fallback span at all, and the
     empty one showed up as a stray node on every mounted avatar */
  renderIf(slot, { props }) {
    if (slot === 'fallback') return !props.icon && !props.src;
    return undefined;
  }
});

/* Avatar.vue derives the fallback from `alt`: the initials of each word,
   capped at two ("Nuxt UI" -> "NU"). `text` overrides it outright. */
function initials(alt) {
  return String(alt).split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join('');
}

/* useAvatarGroup — AvatarGroup and Chip provide `{ size, color }`; Avatar.vue:39-42
   reads its own prop first, then the provided value */
export const AvatarGroupContext = React.createContext(null);

export function Avatar(props) {
  const { text, alt, ...rest } = props;
  const group = React.useContext(AvatarGroupContext);
  const size = props.size ?? (group ? group.size : undefined);
  const color = props.color ?? (group ? group.color : undefined);
  return render({ ...rest, size, color, alt, text: text ?? (alt ? initials(alt) : undefined) });
}

register('Avatar', Avatar);
