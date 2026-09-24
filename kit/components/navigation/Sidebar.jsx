import React from 'react';
import { createRenderer } from '../../lib/factory.jsx';
import { NavigationMenu } from './NavigationMenu.jsx';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/sidebar.ts (source/themes.json -> "sidebar").
   Values are literal: no rounding, no cross-component alignment. */
export const sidebarTheme = {
  "slots": {
    "root": "peer [--sidebar-width:16rem] [--sidebar-width-icon:4rem]",
    "gap": "relative w-(--sidebar-width) bg-transparent",
    "container": "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) lg:flex",
    "inner": "flex size-full flex-col overflow-hidden divide-y divide-default",
    "header": "flex items-center gap-1.5 overflow-hidden px-4 min-h-(--ui-header-height)",
    "wrapper": "min-w-0 flex-1",
    "title": "text-highlighted font-semibold truncate",
    "description": "text-muted text-sm truncate",
    "actions": "flex items-center gap-1.5 shrink-0",
    "close": "",
    "body": "flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-4",
    "footer": "flex items-center gap-1.5 overflow-hidden p-4",
    "rail": [
      "absolute inset-y-0 z-20 hidden w-4 after:absolute after:inset-y-0 after:left-1/2 after:w-px lg:flex hover:after:bg-(--ui-border-accented)",
      "after:transition-colors"
    ]
  },
  "variants": {
    "transition": {
      "true": {
        "gap": "transition-[width] duration-200 ease-out motion-reduce:transition-none",
        "container": "transition-[inset-inline-start,inset-inline-end,width] duration-200 ease-out motion-reduce:transition-none"
      }
    },
    "side": {
      "left": {
        "container": "start-0 border-e border-default",
        "rail": "end-0 translate-x-1/2 rtl:-translate-x-1/2"
      },
      "right": {
        "container": "end-0 border-s border-default",
        "rail": "-start-px -translate-x-1/2 rtl:translate-x-1/2"
      }
    },
    "collapsible": {
      "offcanvas": {
        "root": "group/sidebar hidden lg:block",
        "gap": "data-[state=collapsed]:w-0"
      },
      "icon": {
        "root": "group/sidebar hidden lg:block",
        "gap": "data-[state=collapsed]:w-(--sidebar-width-icon)",
        "container": "data-[state=collapsed]:w-(--sidebar-width-icon)",
        "actions": "group-data-[state=collapsed]/sidebar:hidden",
        "body": "group-data-[state=collapsed]/sidebar:overflow-hidden"
      },
      "none": {
        "root": "h-full w-(--sidebar-width)"
      }
    },
    "variant": {
      "sidebar": {},
      "floating": {
        "container": "p-4 border-transparent",
        "inner": "rounded-lg ring ring-default shadow-lg",
        "rail": "inset-y-4"
      },
      "inset": {
        "container": "py-4 border-transparent",
        "inner": "divide-transparent",
        "rail": "inset-y-4"
      }
    }
  },
  "compoundVariants": [
    {
      "side": "left",
      "collapsible": [
        "offcanvas",
        "icon"
      ],
      "class": {
        "rail": "cursor-w-resize rtl:cursor-e-resize data-[state=collapsed]:cursor-e-resize data-[state=collapsed]:rtl:cursor-w-resize"
      }
    },
    {
      "side": "right",
      "collapsible": [
        "offcanvas",
        "icon"
      ],
      "class": {
        "rail": "cursor-e-resize rtl:cursor-w-resize data-[state=collapsed]:cursor-w-resize data-[state=collapsed]:rtl:cursor-e-resize"
      }
    },
    {
      "side": "left",
      "collapsible": "none",
      "class": {
        "root": "border-e border-default"
      }
    },
    {
      "side": "right",
      "collapsible": "none",
      "class": {
        "root": "border-s border-default"
      }
    },
    {
      "side": "left",
      "collapsible": "offcanvas",
      "class": {
        "container": "data-[state=collapsed]:-start-(--sidebar-width)"
      }
    },
    {
      "side": "right",
      "collapsible": "offcanvas",
      "class": {
        "container": "data-[state=collapsed]:-end-(--sidebar-width)"
      }
    },
    {
      "variant": "floating",
      "collapsible": "icon",
      "class": {
        "gap": "data-[state=collapsed]:w-[calc(var(--sidebar-width-icon)+--spacing(8))]",
        "container": "data-[state=collapsed]:w-[calc(var(--sidebar-width-icon)+--spacing(8)+2px)]"
      }
    },
    {
      "variant": "floating",
      "collapsible": "none",
      "class": {
        "root": "p-4 border-0"
      }
    },
    {
      "variant": "inset",
      "collapsible": "none",
      "class": {
        "root": "py-4 border-0"
      }
    },
    {
      "variant": "floating",
      "side": "left",
      "class": {
        "rail": "end-4"
      }
    },
    {
      "variant": "floating",
      "side": "right",
      "class": {
        "rail": "start-[calc(--spacing(4)-1px)]"
      }
    }
  ]
};

/* DOM extracted from Sidebar.vue — element nesting and data-slot names as shipped. */
const tree = [{"t":"DefineContentTemplate","c":[{"t":"div","s":"header","if":1,"c":[{"t":"slot","c":[{"t":"div","s":"wrapper","if":1,"c":[{"t":"p","s":"title","if":1},{"t":"p","s":"description","if":1}]},{"t":"div","s":"actions","if":1,"c":[{"t":"slot","c":[{"t":"UButton","s":"close","if":1}]}]}]}]},{"t":"div","s":"body"},{"t":"div","s":"footer","if":1}]},{"t":"DefineInnerTemplate","c":[{"t":"div","s":"inner"}]},{"t":"Primitive","s":"root","if":1},{"t":"template","c":[{"t":"Primitive","s":"root","c":[{"t":"div","s":"gap"},{"t":"div","s":"container","c":[{"t":"slot","if":1,"c":[{"t":"button","s":"rail"}]}]}]}]}];

/* Sidebar.vue:96,104 reuses its Inner template inside the root and its Content
   template inside that inner div; extraction lost both Reuse nodes, so header,
   body and footer came out as flat siblings of an empty `inner` — five children
   where the library has one. */
const render = createRenderer('sidebar', sidebarTheme, tree, {
  inlineDefineInto: { Inner: ['root', 'container'], Content: 'inner' },
  /* Sidebar.vue's two roots are a v-if / v-else pair on a COMPARISON, not on a
     boolean prop: `props.collapsible === 'none'` picks the plain inline sidebar,
     anything else the fixed one with its gap spacer, container and rail. The
     tree's `if` flag cannot express that, so both branches were drawn — three
     roots in the library against four here, and on every page with a real
     collapsible mode the plain branch came FIRST and the gap/container one
     landed as a fourth root after the footer. */
  /* Sidebar.vue:78 — the state is `open ? "expanded" : "collapsed"`, and the
     collapsed LAYOUT is written entirely through it: thirteen
     `data-[state=collapsed]:…` rules in the theme, among them the gap's `w-0`
     and the container's `-start-(--sidebar-width)`. The generic open/closed
     attribute the renderer writes matches none of them, so a collapsed sidebar
     stayed on screen at full width. */
  slotAttrs(slot, props) {
    if (!/^(root|gap|container|rail)$/.test(slot || '')) return null;
    const state = props.open === false ? 'collapsed' : 'expanded';
    if (slot !== 'root') return { 'data-state': state };
    return {
      'data-state': state,
      /* :175 — only while collapsed */
      ...(state === 'collapsed' ? { 'data-collapsible': props.collapsible || 'offcanvas' } : null),
      'data-variant': props.variant || 'sidebar',
      'data-side': props.side || 'left'
    };
  },
  nodeFilter(node, { props }) {
    const plain = (props.collapsible !== undefined ? props.collapsible : 'offcanvas') === 'none';
    if (node.t === 'Primitive' && node.s === 'root' && node.if) return plain;
    if (node.t === 'template' && (node.c || []).some((c) => c.s === 'root')) return !plain;
    /* the mobile Menu branch hangs off `isMobile`, which a static render never is */
    if (node.t === 'Menu') return false;
    /* the rail is `<slot v-if="props.rail">`, and its own node carries no gate */
    if (node.s === 'rail') return !!props.rail;
    return true;
  }
});

/* Sidebar.vue:151 fills the body with a vertical UNavigationMenu built from
   `items`; extraction kept the `body` div but lost the menu inside it, so the
   sidebar rendered a blank scroll box. Same class of defect as the lost stepper
   buttons — the node's content is a whole component, not a slot value.

   Given as the `body` slot's value rather than through a renderer hook: a slot
   value is the plainest path the factory has (`content = props[slot]`), and it
   stays correct whichever branch of the tree ends up drawing `body`. */

export function Sidebar(props) {
  const { items, body, ...rest } = props;
  const nav = body !== undefined ? body
    : (items && items.length
      ? React.createElement(NavigationMenu, { orientation: 'vertical', items, collapsed: props.collapsed, ui: { link: 'gap-1.5' } })
      : undefined);
  return render({ ...rest, items, ...(nav !== undefined ? { body: nav } : {}) });
}
