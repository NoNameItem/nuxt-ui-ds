import type { ReactNode } from 'react';

export type ChatReasoningChevron = "leading" | "trailing";
export type ChatReasoningAlone = boolean;

export interface ChatReasoningProps {
  /** themes/chat-reasoning.ts -> variants.chevron */
  chevron?: ChatReasoningChevron;
  /** themes/chat-reasoning.ts -> variants.alone */
  alone?: ChatReasoningAlone;
  /** content for data-slot="root" */
  "root"?: ReactNode;
  /** content for data-slot="trigger" */
  "trigger"?: ReactNode;
  /** content for data-slot="leading" */
  "leading"?: ReactNode;
  /** content for data-slot="leadingIcon" */
  "leadingIcon"?: ReactNode;
  /** content for data-slot="chevronIcon" */
  "chevronIcon"?: ReactNode;
  /** content for data-slot="label" */
  "label"?: ReactNode;
  /** content for data-slot="trailingIcon" */
  "trailingIcon"?: ReactNode;
  /** content for data-slot="content" */
  "content"?: ReactNode;
  /** content for data-slot="body" */
  "body"?: ReactNode;
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"root" | "trigger" | "leading" | "leadingIcon" | "chevronIcon" | "label" | "trailingIcon" | "content" | "body", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
}

export function ChatReasoning(props: ChatReasoningProps): JSX.Element;
