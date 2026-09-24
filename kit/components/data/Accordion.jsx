import React from 'react';
import { createRenderer } from '../../lib/factory.jsx';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/accordion.ts (source/themes.json -> "accordion").
   Values are literal: no rounding, no cross-component alignment. */
export const accordionTheme = {
  "slots": {
    "root": "w-full",
    "item": "border-b border-default last:border-b-0",
    "header": "flex",
    "trigger": "group flex-1 flex items-center gap-1.5 font-medium text-sm py-3.5 outline-primary/25 focus-visible:outline-3 min-w-0 rounded-md",
    "content": "data-[state=open]:animate-[accordion-down_200ms_var(--ease-out)] data-[state=closed]:animate-[accordion-up_200ms_var(--ease-out)] data-[state=closed]:overflow-hidden focus:outline-none",
    "body": "text-sm pb-3.5",
    "leadingIcon": "shrink-0 size-5",
    "trailingIcon": "shrink-0 size-5 ms-auto group-data-[state=open]:rotate-180 transition-transform duration-200 ease-out motion-reduce:transition-none",
    "label": "text-start break-words"
  },
  "variants": {
    "disabled": {
      "true": {
        "trigger": "cursor-not-allowed opacity-75"
      }
    }
  }
};

/* DOM extracted from Accordion.vue — element nesting and data-slot names as shipped. */
const tree = [{"t":"AccordionRoot","s":"root","c":[{"t":"AccordionItem","s":"item","for":1,"c":[{"t":"div","s":"header","c":[{"t":"AccordionTrigger","s":"trigger","c":[{"t":"slot","c":[{"t":"UIcon","s":"leadingIcon","if":1}]},{"t":"span","s":"label","if":1},{"t":"slot","c":[{"t":"UIcon","s":"trailingIcon"}]}]}]},{"t":"AccordionContent","s":"content","if":1,"c":[{"t":"slot","c":[{"t":"div","s":"body"}]}]}]}]}];

/* AccordionRoot with no modelValue/defaultValue is fully collapsed, and type
   "single" (the default) keeps at most one item open. The open set is derived
   here so AccordionContent only exists for open items and item/trigger/content
   carry data-state=open|closed — which is what rotates the trailing chevron. */
function openSet(props) {
  const items = props.items || [];
  const key = props.valueKey || 'value';
  const raw = props.modelValue ?? props.defaultValue;
  if (raw === undefined || raw === null) return new Set();
  const many = props.type === 'multiple';
  const list = (Array.isArray(raw) ? raw : [raw]).slice(0, many ? Infinity : 1);
  const out = new Set();
  for (const v of list) {
    if (typeof v === 'number') { out.add(v); continue; }
    const i = items.findIndex((it) => it && (it[key] ?? it.label) === v);
    if (i !== -1) out.add(i);
  }
  return out;
}

const render = createRenderer('accordion', accordionTheme, tree, {
  renderIf(slot, { props, index }) {
    if (slot === 'content') return index !== undefined && openSet(props).has(index);
    return undefined;
  },
  /* Accordion.vue:67-75 — item.content is the default of the NESTED body slot,
     so it prints inside data-slot="body" (and gets its text-sm), never beside it */
  slotContent(slot, { item }) {
    if (item === undefined || item === null || typeof item !== 'object') return undefined;
    if (slot === 'content') return null;
    if (slot === 'body') return item.content ?? null;
    return undefined;
  },
  slotAttrs(slot, props, v, { index }) {
    if (index === undefined || !['item', 'trigger', 'content'].includes(slot)) return null;
    return { 'data-state': openSet(props).has(index) ? 'open' : 'closed' };
  }
});

export function Accordion(props) {
  return render(props);
}
