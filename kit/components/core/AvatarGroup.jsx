import React from 'react';
import { register } from '../../lib/registry.js';
import { createRenderer } from '../../lib/factory.jsx';
import { tvd } from '../../lib/tv.js';
import { Avatar, AvatarGroupContext } from './Avatar.jsx';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/avatar-group.ts (source/themes.json -> "avatar-group").
   Values are literal: no rounding, no cross-component alignment. */
export const avatarGroupTheme = {
  "slots": {
    "root": "inline-flex flex-row-reverse justify-end",
    "base": "relative rounded-full ring-bg first:me-0"
  },
  "variants": {
    "size": {
      "3xs": {
        "base": "ring -me-0.5"
      },
      "2xs": {
        "base": "ring -me-0.5"
      },
      "xs": {
        "base": "ring -me-0.5"
      },
      "sm": {
        "base": "ring-2 -me-1.5"
      },
      "md": {
        "base": "ring-2 -me-1.5"
      },
      "lg": {
        "base": "ring-2 -me-1.5"
      },
      "xl": {
        "base": "ring-3 -me-2"
      },
      "2xl": {
        "base": "ring-3 -me-2"
      },
      "3xl": {
        "base": "ring-3 -me-2"
      }
    },
    "color": {
      "primary": "",
      "secondary": "",
      "success": "",
      "info": "",
      "warning": "",
      "error": "",
      "neutral": ""
    }
  },
  "defaultVariants": {
    "size": "md",
    "color": "neutral"
  }
};

/* DOM extracted from AvatarGroup.vue — element nesting and data-slot names as shipped. */
const tree = [{"t":"Primitive","s":"root","c":[{"t":"UAvatar","s":"base","if":1},{"t":"component","s":"base","for":1}]}];

const render = createRenderer('avatar-group', avatarGroupTheme, tree);

const resolve = tvd('avatar-group', avatarGroupTheme);

export function AvatarGroup(props) {
  /* AvatarGroup.vue:66-68 re-slots at the USE SITE: the group's own `root` is one
     node, and every avatar inside it is given `data-slot="base"` plus the base
     class — the avatars' own `root` never surfaces. Beyond `max`, the surplus is
     replaced by a single "+N" avatar, which is where the group's one `fallback`
     comes from. Passed as children, each avatar kept its own root (root 4 / base
     0 for a group of four) and no overflow avatar existed at all. */
  const { children, max, size, ui: uiProp = {}, ...rest } = props;
  const ui = resolve({ size });
  const all = React.Children.toArray(children);
  const limit = Number(max);
  const visible = limit > 0 && all.length > limit ? all.slice(0, limit) : all;
  const hidden = all.length - visible.length;
  const baseClass = ui.base(uiProp.base);
  const slotted = visible.map((child, i) => (
    child && child.props !== undefined
      ? React.cloneElement(child, {
        key: child.key !== null && child.key !== undefined ? child.key : 'a' + i,
        'data-slot': 'base',
        size: child.props.size !== undefined ? child.props.size : size,
        class: [baseClass, child.props.class, child.props.className].filter(Boolean).join(' ')
      })
      : child
  ));
  const overflow = hidden > 0
    ? React.createElement(Avatar, { key: 'overflow', 'data-slot': 'base', text: '+' + hidden, size, class: baseClass })
    : null;
  /* AvatarGroup.vue:59-62 — `provide(avatarGroupInjectionKey, { size, color })` */
  return React.createElement(AvatarGroupContext.Provider, { value: { size, color: props.color } },
    render({ ...rest, size, ui: uiProp, children: overflow ? [overflow, ...slotted] : slotted }));
}

/* nested inside other components' DOM — the renderer mounts it by name */
register('AvatarGroup', AvatarGroup);
