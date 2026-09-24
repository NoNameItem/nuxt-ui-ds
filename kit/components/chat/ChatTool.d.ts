import type { ReactNode } from 'react';

export type ChatToolVariant = "inline" | "card";
export type ChatToolChevron = "leading" | "trailing";
export type ChatToolLoading = boolean;
export type ChatToolAlone = boolean;

export interface ChatToolProps {
  /** themes/chat-tool.ts -> variants.variant */
  variant?: ChatToolVariant;
  /** themes/chat-tool.ts -> variants.chevron */
  chevron?: ChatToolChevron;
  /** themes/chat-tool.ts -> variants.loading */
  loading?: ChatToolLoading;
  /** themes/chat-tool.ts -> variants.alone */
  alone?: ChatToolAlone;
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
  /** content for data-slot="suffix" */
  "suffix"?: ReactNode;
  /** content for data-slot="trailingIcon" */
  "trailingIcon"?: ReactNode;
  /** content for data-slot="content" */
  "content"?: ReactNode;
  /** content for data-slot="body" */
  "body"?: ReactNode;
  /** content for data-slot="actions" */
  "actions"?: ReactNode;
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"root" | "trigger" | "leading" | "leadingIcon" | "chevronIcon" | "label" | "suffix" | "trailingIcon" | "content" | "body" | "actions", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
}

export function ChatTool(props: ChatToolProps): JSX.Element;
