import type { ReactNode } from 'react';



export interface EditorDragHandleProps {

  /** content for data-slot="root" */
  "root"?: ReactNode;
  /** content for data-slot="handle" */
  "handle"?: ReactNode;
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"root" | "handle", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
}

export function EditorDragHandle(props: EditorDragHandleProps): JSX.Element;
