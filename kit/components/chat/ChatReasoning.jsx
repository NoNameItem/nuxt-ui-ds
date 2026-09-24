import React from 'react';
import { createRenderer } from '../../lib/factory.jsx';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/chat-reasoning.ts (source/themes.json -> "chat-reasoning").
   Values are literal: no rounding, no cross-component alignment. */
export const chatReasoningTheme = {
  "slots": {
    "root": "",
    "trigger": [
      "group flex w-full items-center gap-1.5 text-muted text-sm disabled:cursor-default disabled:hover:text-muted hover:text-default rounded-sm outline-primary/25 focus-visible:outline-3 min-w-0",
      "transition-colors"
    ],
    "leading": "relative size-4 shrink-0",
    "leadingIcon": "size-4 shrink-0",
    "chevronIcon": "size-4 shrink-0 group-data-[state=open]:rotate-180 transition-transform duration-200 ease-out motion-reduce:transition-none",
    "label": "truncate",
    "trailingIcon": "size-4 shrink-0 group-data-[state=open]:rotate-180 transition-transform duration-200 ease-out motion-reduce:transition-none",
    "content": "data-[state=open]:animate-[collapsible-down_200ms_var(--ease-out)] data-[state=closed]:animate-[collapsible-up_200ms_var(--ease-out)] data-[state=closed]:overflow-hidden rounded-sm outline-primary/25 has-focus-visible:outline-3",
    "body": "max-h-[200px] pt-2 overflow-y-auto text-sm text-dimmed whitespace-pre-wrap focus:outline-none"
  },
  "variants": {
    "chevron": {
      "leading": {
        "leadingIcon": "group-hover:opacity-0"
      },
      "trailing": ""
    },
    "alone": {
      "false": {
        "leadingIcon": [
          "absolute inset-0 group-data-[state=open]:opacity-0",
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

/* DOM extracted from ChatReasoning.vue — element nesting and data-slot names as shipped. */
const tree = [{"t":"CollapsibleRoot","s":"root","if":1,"c":[{"t":"CollapsibleTrigger","c":[{"t":"button","s":"trigger","c":[{"t":"span","s":"leading","if":1,"c":[{"t":"UIcon","s":"leadingIcon","if":1},{"t":"UIcon","s":"chevronIcon","if":1}]},{"t":"UChatShimmer","s":"label"},{"t":"span","s":"label"},{"t":"UIcon","s":"trailingIcon","if":1}]}]},{"t":"CollapsibleContent","s":"content","c":[{"t":"div","s":"body"}]}]}];

/* ChatReasoning.vue:142-143 declares the label twice under one slot name: a
   UChatShimmer while streaming, a plain span otherwise. Which branch exists is
   `props.streaming`, never the presence of slot content. */
const render = createRenderer('chat-reasoning', chatReasoningTheme, tree, {
  slotAttrs(slot, props) {
    /* :26-27,40,80 — with no `open`, the state is `defaultOpen ?? streaming`,
       so a plain reasoning block starts COLLAPSED. reka keeps the content
       element either way and hides it, which is why `content` counts the same
       open or shut. */
    if (slot !== 'root' && slot !== 'content' && slot !== 'trigger') return undefined;
    const open = props.open !== undefined ? props.open
      : (props.defaultOpen !== undefined ? props.defaultOpen : !!props.streaming);
    const state = open ? 'open' : 'closed';
    /* :113-126 — the CollapsibleTrigger carries the state, and the theme reads
       it from there: `trigger` starts with `group`, so the chevron's
       `group-data-[state=open]:rotate-180` (and its `opacity-100` in the
       `alone: false` variant) resolve against THIS element. */
    if (slot === 'trigger') return { 'data-state': state };
    if (slot === 'root') return { 'data-state': state };
    /* open, the theme animates the height to a value reka measures at runtime;
       on a static render that keyframe would land on 0, so the panel is simply
       its own height with no animation */
    return open
      ? { 'data-state': state, style: { animation: 'none', height: 'auto' } }
      : { 'data-state': state, hidden: true };
  },
  renderIf(slot, { props, node }) {
    if (slot === 'label') return node.t === 'UChatShimmer' ? !!props.streaming : !props.streaming;
    /* :127,134,145 — the chevron is drawn on the side `chevron` names (default
       "trailing", :20) and only when there is content to reveal. The leading
       wrapper exists for an explicit icon too. */
    if (slot === 'chevronIcon') return hasContent(props) && chevronSide(props) === 'leading';
    if (slot === 'trailingIcon') return hasContent(props) && chevronSide(props) === 'trailing';
    if (slot === 'leading') return !!props.icon || (hasContent(props) && chevronSide(props) === 'leading');
    if (slot === 'leadingIcon') return !!props.icon;
    return undefined;
  },
  slotContent(slot, { props }) {
    if (slot === 'label' && props.label === undefined) return thinkingText(props);
    return undefined;
  }
});

function chevronSide(props) {
  return props.chevron !== undefined ? props.chevron : 'trailing';
}

function hasContent(props) {
  return props.content !== undefined || props.text !== undefined || props.children !== undefined;
}

function thinkingText(props) {
  /* :67-79 — the trigger's caption: "Thinking" while streaming or at zero
     duration, plain "Thought" when the duration is unknown, "Thought for Ns"
     otherwise. */
  if (props.streaming || props.duration === 0) return 'Thinking';
  if (props.duration === undefined || props.duration === null) return 'Thought';
  return `Thought for ${props.duration}s`;
}

export function ChatReasoning(props) {
  /* :26-27,40,80 — with no `open`, the state is `defaultOpen ?? streaming`, so
     a plain reasoning block starts COLLAPSED. */
  const open = props.open !== undefined ? props.open
    : (props.defaultOpen !== undefined ? props.defaultOpen : !!props.streaming);
  const uiProp = props.ui || {};
  const add = (slot, extra) => ({ [slot]: [uiProp[slot] || '', extra].filter(Boolean).join(' ') });
  /* Both halves go through the `ui` classes rather than only through the
     trigger's `data-state`: the theme reads that state from the `group` ancestor
     (`group-data-[state=open]:rotate-180`, and `opacity-100` in the
     `alone: false` variant), and the class string is the one channel that
     reaches these nodes on every path the renderer takes — a collapsed panel
     has to measure 0, and an open one's chevron has to be turned over. */
  const ui = open
    ? { ...uiProp, ...add('chevronIcon', 'opacity-100') }
    : { ...uiProp, ...add('content', 'hidden') };
  const withText = props.label !== undefined ? props : { ...props, label: thinkingText(props) };
  /* :132 leadingIcon `alone: !(hasContent && chevron === 'leading')` with
     hasContent = text || streaming (:94); :138 chevronIcon `alone: !icon`. One
     variant serves both: where both glyphs are drawn (leading chevron, content,
     icon) both are false; elsewhere only one glyph exists and its own formula
     gives true. Left unset the theme took `false` and hid the open block's icon. */
  const hasC = hasContent(props) || !!props.streaming;
  const alone = !(hasC && chevronSide(props) === 'leading' && !!props.icon);
  return render({ ...withText, alone, ui });
}
