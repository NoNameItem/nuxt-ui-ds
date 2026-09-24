import type { ReactNode } from 'react';

export type AccordionDisabled = boolean;

export interface AccordionProps {
  /** themes/accordion.ts -> variants.disabled */
  disabled?: AccordionDisabled;
  /** open item(s): an index, or the item's value / label */
  modelValue?: string | number | Array<string | number>;
  defaultValue?: string | number | Array<string | number>;
  /** "single" (default) keeps at most one item open */
  type?: 'single' | 'multiple';
  valueKey?: string;
  /** content for data-slot="root" */
  "root"?: ReactNode;
  /** content for data-slot="item" */
  "item"?: ReactNode;
  /** content for data-slot="header" */
  "header"?: ReactNode;
  /** content for data-slot="trigger" */
  "trigger"?: ReactNode;
  /** content for data-slot="content" */
  "content"?: ReactNode;
  /** content for data-slot="body" */
  "body"?: ReactNode;
  /** content for data-slot="leadingIcon" */
  "leadingIcon"?: ReactNode;
  /** content for data-slot="trailingIcon" */
  "trailingIcon"?: ReactNode;
  /** content for data-slot="label" */
  "label"?: ReactNode;
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"root" | "item" | "header" | "trigger" | "content" | "body" | "leadingIcon" | "trailingIcon" | "label", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
  /** repeated rows for the component's v-for slot */
  items?: Array<Record<string, any>>;
}

export function Accordion(props: AccordionProps): JSX.Element;
