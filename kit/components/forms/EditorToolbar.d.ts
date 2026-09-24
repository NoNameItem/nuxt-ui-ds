import type { ReactNode } from 'react';

export type EditorToolbarLayout = "bubble" | "floating" | "fixed";

export interface EditorToolbarProps {
  /** themes/editor-toolbar.ts -> variants.layout */
  layout?: EditorToolbarLayout;
  /** content for data-slot="root" */
  "root"?: ReactNode;
  /** content for data-slot="base" */
  "base"?: ReactNode;
  /** content for data-slot="group" */
  "group"?: ReactNode;
  /** content for data-slot="separator" */
  "separator"?: ReactNode;
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"root" | "base" | "group" | "separator", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
}

export function EditorToolbar(props: EditorToolbarProps): JSX.Element;
