import React from 'react';
import { tvd } from '../../lib/tv.js';
import { ICONS } from '../../lib/icons.js';
import { Button } from '../core/Button.jsx';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/chat-prompt-submit.ts (source/themes.json -> "chat-prompt-submit").
   Values are literal: no rounding, no cross-component alignment. */
export const chatPromptSubmitTheme = {
  "slots": {
    "base": ""
  }
};

const resolve = tvd('chat-prompt-submit', chatPromptSubmitTheme);

/* ChatPromptSubmit.vue:96 is a UButton whose colour, variant and icon all come
   from the chat status (ChatPromptSubmit.vue:22-29, :60-90); the component's own
   theme contributes no classes, so the extracted DOM rendered an empty div.

   `color` / `variant` are read by the READY branch only (:63-64) — they sit in
   reactiveOmit (:58) and never reach the others, each of which has its own pair
   (submittedColor/Variant :69-70, streamingColor/Variant :77-78,
   errorColor/Variant :85-86). Inheriting them would paint a stop button or an
   error retry in primary. */
const STATUS = {
  ready: { icon: ICONS.arrowUp, color: 'primary', variant: 'solid', label: 'Send', own: [] },
  submitted: { icon: ICONS.stop, color: 'neutral', variant: 'subtle', label: 'Stop', own: ['submittedColor', 'submittedVariant'] },
  streaming: { icon: ICONS.stop, color: 'neutral', variant: 'subtle', label: 'Stop', own: ['streamingColor', 'streamingVariant'] },
  error: { icon: ICONS.reload, color: 'error', variant: 'soft', label: 'Retry', own: ['errorColor', 'errorVariant'] }
};

export function ChatPromptSubmit(props) {
  const {
    status = 'ready', icon, color, variant, label,
    submittedColor, submittedVariant, streamingColor, streamingVariant, errorColor, errorVariant,
    ui: uiProp = {}, class: className, className: classNameAlt, ...rest
  } = props;
  const s = STATUS[status] || STATUS.ready;
  const own = { submittedColor, submittedVariant, streamingColor, streamingVariant, errorColor, errorVariant };
  const ui = resolve({});
  return (
    <Button
      color={(s.own.length ? own[s.own[0]] : color) ?? s.color}
      variant={(s.own.length ? own[s.own[1]] : variant) ?? s.variant}
      square
      icon={icon ?? s.icon}
      aria-label={label ?? s.label}
      data-ds-component="ChatPromptSubmit"
      class={ui.base(uiProp.base, className || classNameAlt)}
      {...rest}
    />
  );
}
