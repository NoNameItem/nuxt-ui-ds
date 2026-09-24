import type { ReactNode } from 'react';

export type EditorPlaceholderMode = "firstLine" | "everyLine";

export interface EditorProps {
  /** themes/editor.ts -> variants.placeholderMode */
  placeholderMode?: EditorPlaceholderMode;
  /** content for data-slot="root" */
  "root"?: ReactNode;
  /** content for data-slot="content" */
  "content"?: ReactNode;
  /** content for data-slot="base" */
  "base"?: ReactNode;
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"root" | "content" | "base", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
}

export function Editor(props: EditorProps): JSX.Element;
