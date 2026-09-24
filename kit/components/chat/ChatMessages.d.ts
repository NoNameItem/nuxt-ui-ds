import type { ReactNode } from 'react';

export type ChatMessagesCompact = boolean;

export interface ChatMessagesProps {
  /** themes/chat-messages.ts -> variants.compact */
  compact?: ChatMessagesCompact;
  /** content for data-slot="root" */
  "root"?: ReactNode;
  /** content for data-slot="indicator" */
  "indicator"?: ReactNode;
  /** content for data-slot="viewport" */
  "viewport"?: ReactNode;
  /** content for data-slot="autoScroll" */
  "autoScroll"?: ReactNode;
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"root" | "indicator" | "viewport" | "autoScroll", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
}

export function ChatMessages(props: ChatMessagesProps): JSX.Element;
