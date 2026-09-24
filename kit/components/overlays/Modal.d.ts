import type { ReactNode } from 'react';

export type ModalTransition = boolean;
export type ModalFullscreen = boolean;
export type ModalOverlay = boolean;
export type ModalScrollable = boolean;

export interface ModalProps {
  /** themes/modal.ts -> variants.transition */
  transition?: ModalTransition;
  /** themes/modal.ts -> variants.fullscreen */
  fullscreen?: ModalFullscreen;
  /** themes/modal.ts -> variants.overlay */
  overlay?: ModalOverlay;
  /** themes/modal.ts -> variants.scrollable */
  scrollable?: ModalScrollable;
  /** content for data-slot="overlay" */
  "overlay"?: ReactNode;
  /** content for data-slot="content" */
  "content"?: ReactNode;
  /** content for data-slot="header" */
  "header"?: ReactNode;
  /** content for data-slot="wrapper" */
  "wrapper"?: ReactNode;
  /** content for data-slot="body" */
  "body"?: ReactNode;
  /** content for data-slot="footer" */
  "footer"?: ReactNode;
  /** content for data-slot="title" */
  "title"?: ReactNode;
  /** content for data-slot="description" */
  "description"?: ReactNode;
  /** content for data-slot="close" */
  "close"?: ReactNode;
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"overlay" | "content" | "header" | "wrapper" | "body" | "footer" | "title" | "description" | "close", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
}

export function Modal(props: ModalProps): JSX.Element;
