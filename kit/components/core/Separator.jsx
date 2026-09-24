import React from 'react';
import { tvd, slotStyle, domRest } from '../../lib/tv.js';
import { renderIcon } from '../../lib/iconify.jsx';
import { lookup } from '../../lib/registry.js';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/separator.ts (source/themes.json -> "separator").
   Values are literal: no rounding, no cross-component alignment. */
export const separatorTheme = {
  "slots": {
    "root": "flex items-center align-center text-center",
    "border": "",
    "container": "font-medium text-default flex",
    "icon": "shrink-0 size-5",
    "avatar": "shrink-0",
    "avatarSize": "2xs",
    "label": "text-sm"
  },
  "variants": {
    "color": {
      "primary": {
        "border": "border-primary"
      },
      "secondary": {
        "border": "border-secondary"
      },
      "success": {
        "border": "border-success"
      },
      "info": {
        "border": "border-info"
      },
      "warning": {
        "border": "border-warning"
      },
      "error": {
        "border": "border-error"
      },
      "neutral": {
        "border": "border-default"
      }
    },
    "orientation": {
      "horizontal": {
        "root": "w-full flex-row",
        "border": "w-full",
        "container": "whitespace-nowrap"
      },
      "vertical": {
        "root": "h-full flex-col",
        "border": "h-full",
        "container": ""
      }
    },
    "size": {
      "xs": "",
      "sm": "",
      "md": "",
      "lg": "",
      "xl": ""
    },
    "position": {
      "start": "",
      "center": "",
      "end": ""
    },
    "type": {
      "solid": {
        "border": "border-solid"
      },
      "dashed": {
        "border": "border-dashed"
      },
      "dotted": {
        "border": "border-dotted"
      }
    }
  },
  "compoundVariants": [
    {
      "orientation": "horizontal",
      "position": "start",
      "class": {
        "container": "me-3"
      }
    },
    {
      "orientation": "horizontal",
      "position": "center",
      "class": {
        "container": "mx-3"
      }
    },
    {
      "orientation": "horizontal",
      "position": "end",
      "class": {
        "container": "ms-3"
      }
    },
    {
      "orientation": "vertical",
      "position": "start",
      "class": {
        "container": "mb-2"
      }
    },
    {
      "orientation": "vertical",
      "position": "center",
      "class": {
        "container": "my-2"
      }
    },
    {
      "orientation": "vertical",
      "position": "end",
      "class": {
        "container": "mt-2"
      }
    },
    {
      "orientation": "horizontal",
      "size": "xs",
      "class": {
        "border": "border-t"
      }
    },
    {
      "orientation": "horizontal",
      "size": "sm",
      "class": {
        "border": "border-t-[2px]"
      }
    },
    {
      "orientation": "horizontal",
      "size": "md",
      "class": {
        "border": "border-t-[3px]"
      }
    },
    {
      "orientation": "horizontal",
      "size": "lg",
      "class": {
        "border": "border-t-[4px]"
      }
    },
    {
      "orientation": "horizontal",
      "size": "xl",
      "class": {
        "border": "border-t-[5px]"
      }
    },
    {
      "orientation": "vertical",
      "size": "xs",
      "class": {
        "border": "border-s"
      }
    },
    {
      "orientation": "vertical",
      "size": "sm",
      "class": {
        "border": "border-s-[2px]"
      }
    },
    {
      "orientation": "vertical",
      "size": "md",
      "class": {
        "border": "border-s-[3px]"
      }
    },
    {
      "orientation": "vertical",
      "size": "lg",
      "class": {
        "border": "border-s-[4px]"
      }
    },
    {
      "orientation": "vertical",
      "size": "xl",
      "class": {
        "border": "border-s-[5px]"
      }
    }
  ],
  "defaultVariants": {
    "color": "neutral",
    "size": "xs",
    "type": "solid"
  }
};

/* Separator.vue has three mutually exclusive branches on `position`
   (default "center"): start -> container, border; center -> border, container,
   border; end -> border, container. With no content it is a single border. */
const resolve = tvd('separator', separatorTheme);

export function Separator(props) {
  const {
    label, icon, avatar, position = 'center',
    ui: uiProp = {}, class: className, className: classNameAlt, children, ...rest
  } = props;
  const ui = resolve({ ...props, position });
  const content = label ?? children;
  const hasContent = content !== undefined || !!icon || !!avatar;
  const border = (k) => <div key={k} {...slotStyle(ui.border(uiProp.border))} data-slot="border"></div>;
  /* Separator.vue:49-51 is ONE v-if chain in this order: label, else icon, else
     avatar — the third branch was missing, so a separator configured with an
     avatar had no content at all, no `container`, and its two borders ran the
     full width instead of parting around a 20px mark. */
  const Avatar = lookup('Avatar');
  const container = hasContent ? (
    <div key="c" {...slotStyle(ui.container(uiProp.container))} data-slot="container">
      {content !== undefined
        ? <span {...slotStyle(ui.label(uiProp.label))} data-slot="label">{content}</span>
        : icon ? renderIcon(icon, ui.icon(uiProp.icon))
        : (avatar && Avatar)
          ? <Avatar {...avatar} size={uiProp.avatarSize || ui.avatarSize()} data-slot="avatar" class={ui.avatar(uiProp.avatar)} />
          : null}
    </div>
  ) : null;

  const parts = !hasContent ? [border('b')]
    : position === 'start' ? [container, border('b')]
    : position === 'end' ? [border('b'), container]
    : [border('b1'), container, border('b2')];

  return <div {...slotStyle(ui.root(uiProp.root, className || classNameAlt))} data-ds-component="Separator" data-slot="root" {...domRest(rest, separatorTheme)}>{parts}</div>;
}
