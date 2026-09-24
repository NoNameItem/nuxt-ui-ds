import type { ReactNode } from 'react';



export interface ChatPromptSubmitProps {

  /** content for data-slot="base" */
  "base"?: ReactNode;
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"base", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
}

export function ChatPromptSubmit(props: ChatPromptSubmitProps): JSX.Element;
