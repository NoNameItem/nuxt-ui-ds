import type { ReactNode } from 'react';

export type EditorEmojiMenuSize = "xs" | "sm" | "md" | "lg" | "xl";
export type EditorEmojiMenuActive = boolean;

export interface EditorEmojiMenuProps {
  /** themes/editor-emoji-menu.ts -> variants.size */
  size?: EditorEmojiMenuSize;
  /** themes/editor-emoji-menu.ts -> variants.active */
  active?: EditorEmojiMenuActive;
  /** content for data-slot="content" */
  "content"?: ReactNode;
  /** content for data-slot="viewport" */
  "viewport"?: ReactNode;
  /** content for data-slot="group" */
  "group"?: ReactNode;
  /** content for data-slot="label" */
  "label"?: ReactNode;
  /** content for data-slot="separator" */
  "separator"?: ReactNode;
  /** content for data-slot="item" */
  "item"?: ReactNode;
  /** content for data-slot="itemLeadingIcon" */
  "itemLeadingIcon"?: ReactNode;
  /** content for data-slot="itemLeadingAvatar" */
  "itemLeadingAvatar"?: ReactNode;
  /** content for data-slot="itemLeadingAvatarSize" */
  "itemLeadingAvatarSize"?: ReactNode;
  /** content for data-slot="itemWrapper" */
  "itemWrapper"?: ReactNode;
  /** content for data-slot="itemLabel" */
  "itemLabel"?: ReactNode;
  /** content for data-slot="itemDescription" */
  "itemDescription"?: ReactNode;
  /** content for data-slot="itemLabelExternalIcon" */
  "itemLabelExternalIcon"?: ReactNode;
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"content" | "viewport" | "group" | "label" | "separator" | "item" | "itemLeadingIcon" | "itemLeadingAvatar" | "itemLeadingAvatarSize" | "itemWrapper" | "itemLabel" | "itemDescription" | "itemLabelExternalIcon", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
  /** repeated rows for the component's v-for slot */
  items?: Array<Record<string, any>>;
}

export function EditorEmojiMenu(props: EditorEmojiMenuProps): JSX.Element;
