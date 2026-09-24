import React from 'react';
import { createRenderer } from '../../lib/factory.jsx';
import { ChatMessage } from './ChatMessage.jsx';
import { useCompact } from '../../lib/compact.jsx';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/chat-messages.ts (source/themes.json -> "chat-messages").
   Values are literal: no rounding, no cross-component alignment. */
export const chatMessagesTheme = {
  "slots": {
    "root": "w-full flex flex-col gap-1 flex-1 px-2.5 [&>article]:last-of-type:min-h-(--last-message-height)",
    "indicator": "h-6 flex items-center gap-1 py-3 *:size-2 *:rounded-full *:bg-elevated motion-safe:[&>*:nth-child(1)]:animate-[bounce_1s_infinite] motion-safe:[&>*:nth-child(2)]:animate-[bounce_1s_0.15s_infinite] motion-safe:[&>*:nth-child(3)]:animate-[bounce_1s_0.3s_infinite]",
    "viewport": "absolute inset-x-0 top-[86%] data-[state=open]:animate-[fade-in_200ms_var(--ease-out)] data-[state=closed]:animate-[fade-out_200ms_var(--ease-out)]",
    "autoScroll": "rounded-full absolute right-1/2 translate-x-1/2 bottom-0"
  },
  "variants": {
    "compact": {
      "true": "",
      "false": ""
    }
  }
};

/* DOM extracted from ChatMessages.vue — element nesting and data-slot names as shipped. */
const tree = [{"t":"div","s":"root","c":[{"t":"slot"},{"t":"UChatMessage","if":1,"c":[{"t":"template","c":[{"t":"slot","c":[{"t":"div","s":"indicator"}]}]}]},{"t":"Presence","c":[{"t":"div","s":"viewport","c":[{"t":"slot","c":[{"t":"UButton","s":"autoScroll","if":1}]}]}]}]}];

const render = createRenderer('chat-messages', chatMessagesTheme, tree, {
  childAnchor: true,
  nodeFilter(node, { props }) {
    /* ChatMessages.vue:34-35 — the typing indicator exists only while a reply is
       pending; extraction kept it unconditional, so a plain transcript drew a
       bouncing-dots row where its second message belonged. */
    if (node.t === 'UChatMessage') return props.status === 'submitted' || props.status === 'streaming';
    /* :232-236 — the whole viewport is inside `<Presence :present="showAutoScroll">`,
       and the button inside it needs `autoScroll` as well */
    if (node.t === 'Presence') return !!props.showAutoScroll;
    return undefined;
  },
  renderIf(slot, { props }) {
    if (slot === 'autoScroll') return !!props.autoScroll;
    return undefined;
  }
});

export function ChatMessages(props) {
  const { messages, children, user, assistant, compact: ownCompact, ...rest } = props;
  /* ChatMessages.vue:205 — the flag is the caller's when given, otherwise the
     enclosing palette's */
  const compact = useCompact(ownCompact);
  /* ChatMessages.vue:199-202 — one UChatMessage per message that has parts, with
     the role's own prop set spread in before the message itself */
  /* ChatMessages.vue:40-41,203 — the role picks a prop set, and the message's
     own fields override it: a user message is a soft bubble aligned right
     (`side: "right"` gives the theme its `max-w-[75%] ms-auto justify-end`),
     an assistant one a naked block on the left. Without them every message
     rendered full-width and unpainted. */
  const roleProps = (role) => (role === 'user'
    ? { side: 'right', variant: 'soft', ...(user || {}) }
    : { side: 'left', variant: 'naked', ...(assistant || {}) });
  const rendered = children !== undefined ? children
    : (messages || []).filter((m) => m && m.parts && m.parts.length).map((m, i) => React.createElement(ChatMessage, {
      key: m.id != null ? m.id : i, ...roleProps(m.role), ...m, compact,
      /* ChatMessage renders the message's text parts as its `content` */
      content: m.content !== undefined ? m.content
        : m.parts.filter((p) => p && p.type === 'text').map((p) => p.text).join('')
    }));
  return render({ ...rest, messages, compact, children: rendered });
}
