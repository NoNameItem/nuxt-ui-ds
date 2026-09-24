import React from 'react';
import { createRenderer } from '../../lib/factory.jsx';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/drawer.ts (source/themes.json -> "drawer").
   Values are literal: no rounding, no cross-component alignment. */
export const drawerTheme = {
  "slots": {
    "overlay": "fixed inset-0 bg-elevated/75",
    "content": "fixed bg-default ring ring-default flex focus:outline-none",
    "handle": [
      "shrink-0 !bg-accented",
      "transition-opacity ease-out"
    ],
    "container": "w-full flex flex-col gap-4 p-4 overflow-y-auto",
    "header": "flex items-center gap-1.5 min-h-8",
    "wrapper": "min-w-0 flex-1",
    "title": "text-highlighted font-semibold",
    "description": "mt-1 text-muted text-sm",
    "actions": "flex items-center gap-1.5 shrink-0 ms-auto",
    "body": "flex-1",
    "footer": "flex flex-col gap-1.5",
    "close": ""
  },
  "variants": {
    "direction": {
      "top": {
        "content": "mb-24 flex-col-reverse",
        "handle": "mb-4"
      },
      "right": {
        "content": "flex-row rtl:flex-row-reverse",
        "handle": "!ml-4"
      },
      "bottom": {
        "content": "mt-24 flex-col",
        "handle": "mt-4"
      },
      "left": {
        "content": "flex-row-reverse rtl:flex-row",
        "handle": "!mr-4"
      }
    },
    "inset": {
      "true": {
        "content": "rounded-lg after:hidden overflow-hidden [--initial-transform:calc(100%+1.5rem)]"
      }
    },
    "snapPoints": {
      "true": ""
    }
  },
  "compoundVariants": [
    {
      "direction": [
        "top",
        "bottom"
      ],
      "class": {
        "content": "h-auto max-h-[96%]",
        "handle": "!w-12 !h-1.5 mx-auto"
      }
    },
    {
      "direction": [
        "top",
        "bottom"
      ],
      "snapPoints": true,
      "class": {
        "content": "h-full"
      }
    },
    {
      "direction": [
        "right",
        "left"
      ],
      "class": {
        "content": "w-auto max-w-[calc(100%-2rem)]",
        "handle": "!h-12 !w-1.5 mt-auto mb-auto"
      }
    },
    {
      "direction": [
        "right",
        "left"
      ],
      "snapPoints": true,
      "class": {
        "content": "w-full"
      }
    },
    {
      "direction": "top",
      "inset": true,
      "class": {
        "content": "inset-x-4 top-4"
      }
    },
    {
      "direction": "top",
      "inset": false,
      "class": {
        "content": "inset-x-0 top-0 rounded-b-lg"
      }
    },
    {
      "direction": "bottom",
      "inset": true,
      "class": {
        "content": "inset-x-4 bottom-4"
      }
    },
    {
      "direction": "bottom",
      "inset": false,
      "class": {
        "content": "inset-x-0 bottom-0 rounded-t-lg"
      }
    },
    {
      "direction": "left",
      "inset": true,
      "class": {
        "content": "inset-y-4 left-4"
      }
    },
    {
      "direction": "left",
      "inset": false,
      "class": {
        "content": "inset-y-0 left-0 rounded-r-lg"
      }
    },
    {
      "direction": "right",
      "inset": true,
      "class": {
        "content": "inset-y-4 right-4"
      }
    },
    {
      "direction": "right",
      "inset": false,
      "class": {
        "content": "inset-y-0 right-0 rounded-l-lg"
      }
    }
  ]
};

/* DOM extracted from Drawer.vue — element nesting and data-slot names as shipped. */
const tree = [{"t":"component","c":[{"t":"DrawerPortal","c":[{"t":"FieldGroupReset","c":[{"t":"DrawerOverlay","s":"overlay","if":1},{"t":"DrawerContent","s":"content","c":[{"t":"DrawerHandle","s":"handle","if":1},{"t":"slot","c":[{"t":"div","s":"container","c":[{"t":"div","s":"header","if":1,"c":[{"t":"slot","c":[{"t":"div","s":"wrapper","if":1,"c":[{"t":"DrawerTitle","s":"title","if":1},{"t":"DrawerDescription","s":"description","if":1}]},{"t":"div","s":"actions","if":1,"c":[{"t":"DrawerClose","if":1,"c":[{"t":"slot","c":[{"t":"UButton","s":"close","if":1}]}]}]}]}]},{"t":"div","s":"body","if":1},{"t":"div","s":"footer","if":1}]}]}]}]}]}]}];

const render = createRenderer('drawer', drawerTheme, tree, {
  portal: true,
  /* vaul marks its handle with this attribute and styles it from its own
     injected stylesheet (`opacity: .7`, `border-radius: 1rem`); Nuxt UI
     overrides only the background and the size */
  /* the theme's `fixed` stays fixed: vaul's `:after` (left:100%/width:200%)
     on an absolute content stretched the page */
  keepFixed: ['content'],
  slotAttrs(slot, props) {
    if (slot === 'handle') return { 'data-vaul-handle': '' };
    if (slot === 'content') {
      /* vaul-vue's DrawerContent attributes; the inset variable written with
         the spaces Tailwind gives calc() — without them the first keyframe is
         invalid and no layer is created */
      return {
        'data-vaul-drawer': '', 'data-vaul-drawer-direction': props.direction || 'bottom',
        'data-vaul-snap-points': 'false', 'data-vaul-delayed-snap-points': 'false', 'data-state': 'open',
        ...(props.inset ? { style: { '--initial-transform': 'calc(100% + 1.5rem)' } } : {})
      };
    }
    return null;
  }, openOnlySlots: ['overlay', 'content'], /* like Modal: the caller's class lands on the content, not the overlay */ primarySlot: 'content' });

/* vaul-vue/dist/index.js:1 puts one <style> in <head> on import — the rules for
   the open state, verbatim */
const VAUL_CSS = '[data-vaul-drawer]{touch-action:none;will-change:transform;transition:transform .5s cubic-bezier(.32,.72,0,1);animation-duration:.5s;animation-timing-function:cubic-bezier(.32,.72,0,1)}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=bottom][data-state=open]{animation-name:slideFromBottom}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=top][data-state=open]{animation-name:slideFromTop}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=left][data-state=open]{animation-name:slideFromLeft}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=right][data-state=open]{animation-name:slideFromRight}[data-vaul-drawer]:not([data-vaul-custom-container=true]):after{content:"";position:absolute;background:inherit;background-color:inherit}[data-vaul-drawer][data-vaul-drawer-direction=top]:after{top:initial;bottom:100%;left:0;right:0;height:200%}[data-vaul-drawer][data-vaul-drawer-direction=bottom]:after{top:100%;bottom:initial;left:0;right:0;height:200%}[data-vaul-drawer][data-vaul-drawer-direction=left]:after{left:initial;right:100%;top:0;bottom:0;width:200%}[data-vaul-drawer][data-vaul-drawer-direction=right]:after{left:100%;right:initial;top:0;bottom:0;width:200%}@keyframes slideFromBottom{0%{transform:translate3d(0,var(--initial-transform, 100%),0)}to{transform:translateZ(0)}}@keyframes slideFromTop{0%{transform:translate3d(0,calc(var(--initial-transform, 100%) * -1),0)}to{transform:translateZ(0)}}@keyframes slideFromLeft{0%{transform:translate3d(calc(var(--initial-transform, 100%) * -1),0,0)}to{transform:translateZ(0)}}@keyframes slideFromRight{0%{transform:translate3d(var(--initial-transform, 100%),0,0)}to{transform:translateZ(0)}}';
if (typeof document !== 'undefined' && !document.getElementById('vaul-drawer-style')) {
  const el = document.createElement('style');
  el.id = 'vaul-drawer-style';
  el.textContent = VAUL_CSS;
  document.head.appendChild(el);
}

export function Drawer(props) {
  return render(props);
}
