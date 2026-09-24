import React from 'react';
import { createRenderer } from '../../lib/factory.jsx';
import { ICONS } from '../../lib/icons.js';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/chat-tool.ts (source/themes.json -> "chat-tool").
   Values are literal: no rounding, no cross-component alignment. */
export const chatToolTheme = {
  "slots": {
    "root": "",
    "trigger": [
      "group flex w-full items-center gap-1.5 text-muted text-sm disabled:cursor-default disabled:hover:text-muted hover:text-default min-w-0",
      "transition-colors"
    ],
    "leading": "relative size-4 shrink-0",
    "leadingIcon": "size-4 shrink-0",
    "chevronIcon": "size-4 shrink-0 group-data-[state=open]:rotate-180 transition-transform duration-200 ease-out motion-reduce:transition-none",
    "label": "truncate",
    "suffix": "text-dimmed ms-1",
    "trailingIcon": "size-4 shrink-0 group-data-[state=open]:rotate-180 transition-transform duration-200 ease-out motion-reduce:transition-none",
    "content": "data-[state=open]:animate-[collapsible-down_200ms_var(--ease-out)] data-[state=closed]:animate-[collapsible-up_200ms_var(--ease-out)] data-[state=closed]:overflow-hidden",
    "body": "text-sm text-dimmed whitespace-pre-wrap",
    "actions": "flex items-center justify-end gap-1.5"
  },
  "variants": {
    "variant": {
      "inline": {
        "trigger": "rounded-sm outline-primary/25 focus-visible:outline-3",
        "body": "pt-2",
        "actions": "pt-2"
      },
      "card": {
        "root": "rounded-md ring ring-default overflow-hidden outline-primary/25 has-focus-visible:outline-3 has-focus-visible:ring-primary",
        "trigger": "px-2 py-1 focus:outline-none",
        "trailingIcon": "ms-auto",
        "body": "border-t border-default p-2 max-h-[200px] overflow-y-auto focus:outline-none",
        "actions": "border-t border-default p-2"
      }
    },
    "chevron": {
      "leading": "",
      "trailing": ""
    },
    "loading": {
      "true": {
        "leadingIcon": "animate-spin"
      }
    },
    "alone": {
      "false": {
        "leadingIcon": [
          "absolute inset-0 group-hover:opacity-0 group-data-[state=open]:opacity-0",
          "transition-opacity duration-200 ease-out"
        ],
        "chevronIcon": [
          "absolute inset-0 opacity-0 group-hover:opacity-100 group-data-[state=open]:opacity-100",
          "transition-[rotate,opacity] duration-200 ease-out motion-reduce:transition-none"
        ]
      }
    }
  }
};

/* DOM extracted from ChatTool.vue — element nesting and data-slot names as shipped. */
const tree = [{"t":"CollapsibleRoot","s":"root","c":[{"t":"CollapsibleTrigger","c":[{"t":"button","s":"trigger","c":[{"t":"span","s":"leading","if":1,"c":[{"t":"UIcon","s":"leadingIcon","if":1},{"t":"UIcon","s":"chevronIcon","if":1}]},{"t":"span","s":"label","c":[{"t":"span","s":"suffix","if":1}]},{"t":"UIcon","s":"trailingIcon","if":1}]}]},{"t":"CollapsibleContent","s":"content","c":[{"t":"div","s":"body"}]},{"t":"div","s":"actions","if":1}]}];

/* Same three-part shape as ChatReasoning: the chevron sits on the side
   `chevron` names (:22, default "trailing") and only when there is content to
   reveal; the trigger carries the state the theme reads from its `group`
   ancestor; and the state itself is `defaultOpen ?? false` (:43), switched on by
   a non-empty `actions` (:50-53). */
const render = createRenderer('chat-tool', chatToolTheme, tree, {
  renderIf(slot, { props }) {
    if (slot === 'trailingIcon') return hasContent(props) && chevronSide(props) === 'trailing';
    if (slot === 'chevronIcon') return hasContent(props) && chevronSide(props) === 'leading';
    /* :56,76-83 — the leading glyph is `props.loading ? loadingIcon : icon`, so
       it is drawn whenever an icon was given and only SWAPPED while loading;
       gating it on `loading` alone left four of five triggers without it and
       shifted their labels 22px left. */
    if (slot === 'leading' || slot === 'leadingIcon') {
      return !!leadingIcon(props) || (slot === 'leading' && hasContent(props) && chevronSide(props) === 'leading');
    }
    return undefined;
  },
  slotAttrs(slot, props) {
    if (slot !== 'root' && slot !== 'content' && slot !== 'trigger') return undefined;
    const state = isOpen(props) ? 'open' : 'closed';
    if (slot !== 'content') return { 'data-state': state };
    return isOpen(props)
      ? { 'data-state': state, style: { animation: 'none', height: 'auto' } }
      : { 'data-state': state, hidden: true };
  }
});

function chevronSide(props) {
  return props.chevron !== undefined ? props.chevron : 'trailing';
}

function hasContent(props) {
  return props.content !== undefined || props.text !== undefined || props.children !== undefined;
}

function leadingIcon(props) {
  /* :56 — `props.loading ? loadingIcon : props.icon` */
  if (props.loading) return props.loadingIcon || ICONS.loading;
  return props.icon || props.leadingIcon;
}

function isOpen(props) {
  if (props.open !== undefined) return props.open;
  if (props.defaultOpen !== undefined) return props.defaultOpen;
  /* :50-53 — a tool that offers actions opens itself, but only when neither
     `open` nor `defaultOpen` was given */
  return !!(props.actions && props.actions.length) && hasContent(props);
}

export function ChatTool(props) {
  const open = isOpen(props);
  const glyph = leadingIcon(props);
  /* :78-82 — `alone: !(hasContent && chevron === "leading")`. Left unset, the
     renderer resolves the boolean variant through its `"false"` branch, which
     made every leading glyph `absolute inset-0 group-data-[state=open]:opacity-0`
     — so it vanished on the two open tools. The chevron's own
     `alone: !resolvedIcon` (:88) agrees wherever both are drawn: that only
     happens with `chevron="leading"` AND an icon, where both are false. */
  const alone = !(hasContent(props) && chevronSide(props) === 'leading');
  const uiProp = props.ui || {};
  const add = (slot, extra) => ({ [slot]: [uiProp[slot] || '', extra].filter(Boolean).join(' ') });
  /* through the `ui` classes as well as the trigger's `data-state`: the theme
     reads that state from the `group` ancestor
     (`group-data-[state=open]:rotate-180`, plus `opacity-100` in the
     `alone: false` variant), and the class string is the one channel that
     reaches these nodes on every path the renderer takes */
  const ui = open
    ? { ...uiProp, ...add('chevronIcon', 'opacity-100') }
    : { ...uiProp, ...add('content', 'hidden') };
  return render({ ...props, alone, ...(glyph ? { leadingIcon: glyph } : {}), ui });
}
