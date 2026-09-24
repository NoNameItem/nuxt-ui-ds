import type { ReactNode } from 'react';



export interface ChatPaletteProps {

  /** content for data-slot="root" */
  "root"?: ReactNode;
  /** content for data-slot="prompt" */
  "prompt"?: ReactNode;
  /** content for data-slot="close" */
  "close"?: ReactNode;
  /** content for data-slot="content" */
  "content"?: ReactNode;
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"root" | "prompt" | "close" | "content", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
}

export function ChatPalette(props: ChatPaletteProps): JSX.Element;
