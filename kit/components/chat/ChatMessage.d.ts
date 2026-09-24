import type { ReactNode } from 'react';

export type ChatMessageVariant = "solid" | "outline" | "soft" | "subtle" | "naked";
export type ChatMessageColor = "primary" | "secondary" | "success" | "info" | "warning" | "error" | "neutral";
export type ChatMessageSide = "left" | "right";
export type ChatMessageLeading = boolean;
export type ChatMessageActions = boolean;
export type ChatMessageCompact = boolean;

export interface ChatMessageProps {
  /** themes/chat-message.ts -> variants.variant */
  variant?: ChatMessageVariant;
  /** themes/chat-message.ts -> variants.color */
  color?: ChatMessageColor;
  /** themes/chat-message.ts -> variants.side */
  side?: ChatMessageSide;
  /** themes/chat-message.ts -> variants.leading */
  leading?: ChatMessageLeading;
  /** themes/chat-message.ts -> variants.actions */
  actions?: ChatMessageActions;
  /** themes/chat-message.ts -> variants.compact */
  compact?: ChatMessageCompact;
  /** content for data-slot="root" */
  "root"?: ReactNode;
  /** content for data-slot="header" */
  "header"?: ReactNode;
  /** content for data-slot="container" */
  "container"?: ReactNode;
  /** content for data-slot="body" */
  "body"?: ReactNode;
  /** content for data-slot="leading" */
  "leading"?: ReactNode;
  /** content for data-slot="leadingIcon" */
  "leadingIcon"?: ReactNode;
  /** content for data-slot="leadingAvatar" */
  "leadingAvatar"?: ReactNode;
  /** content for data-slot="leadingAvatarSize" */
  "leadingAvatarSize"?: ReactNode;
  /** content for data-slot="files" */
  "files"?: ReactNode;
  /** content for data-slot="content" */
  "content"?: ReactNode;
  /** content for data-slot="actions" */
  "actions"?: ReactNode;
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"root" | "header" | "container" | "body" | "leading" | "leadingIcon" | "leadingAvatar" | "leadingAvatarSize" | "files" | "content" | "actions", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
}

export function ChatMessage(props: ChatMessageProps): JSX.Element;
