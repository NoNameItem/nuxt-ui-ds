import type { ReactNode } from 'react';

export type ChatPromptColor = "primary" | "secondary" | "success" | "info" | "warning" | "error" | "neutral";
export type ChatPromptVariant = "outline" | "soft" | "subtle" | "naked";

export interface ChatPromptProps {
  /** themes/chat-prompt.ts -> variants.color */
  color?: ChatPromptColor;
  /** themes/chat-prompt.ts -> variants.variant */
  variant?: ChatPromptVariant;
  /** content for data-slot="root" */
  "root"?: ReactNode;
  /** content for data-slot="header" */
  "header"?: ReactNode;
  /** content for data-slot="body" */
  "body"?: ReactNode;
  /** content for data-slot="footer" */
  "footer"?: ReactNode;
  /** content for data-slot="base" */
  "base"?: ReactNode;
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"root" | "header" | "body" | "footer" | "base", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
}

export function ChatPrompt(props: ChatPromptProps): JSX.Element;
