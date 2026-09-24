import type { ReactNode } from 'react';

export type BlogPostOrientation = "horizontal" | "vertical";
export type BlogPostVariant = "outline" | "soft" | "subtle" | "ghost" | "naked";
export type BlogPostTo = boolean;
export type BlogPostImage = boolean;

export interface BlogPostProps {
  /** themes/blog-post.ts -> variants.orientation */
  orientation?: BlogPostOrientation;
  /** themes/blog-post.ts -> variants.variant */
  variant?: BlogPostVariant;
  /** themes/blog-post.ts -> variants.to */
  to?: BlogPostTo;
  /** themes/blog-post.ts -> variants.image */
  image?: BlogPostImage;
  /** content for data-slot="root" */
  "root"?: ReactNode;
  /** content for data-slot="header" */
  "header"?: ReactNode;
  /** content for data-slot="body" */
  "body"?: ReactNode;
  /** content for data-slot="footer" */
  "footer"?: ReactNode;
  /** content for data-slot="image" */
  "image"?: ReactNode;
  /** content for data-slot="title" */
  "title"?: ReactNode;
  /** content for data-slot="description" */
  "description"?: ReactNode;
  /** content for data-slot="authors" */
  "authors"?: ReactNode;
  /** content for data-slot="avatar" */
  "avatar"?: ReactNode;
  /** content for data-slot="meta" */
  "meta"?: ReactNode;
  /** content for data-slot="date" */
  "date"?: ReactNode;
  /** content for data-slot="badge" */
  "badge"?: ReactNode;
  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<"root" | "header" | "body" | "footer" | "image" | "title" | "description" | "authors" | "avatar" | "meta" | "date" | "badge", string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
}

export function BlogPost(props: BlogPostProps): JSX.Element;
