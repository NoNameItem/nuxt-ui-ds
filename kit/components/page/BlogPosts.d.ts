import type { ReactNode } from 'react';

export type BlogPostsOrientation = "horizontal" | "vertical";

export interface BlogPostsProps {
  /** themes/blog-posts.ts -> variants.orientation */
  orientation?: BlogPostsOrientation;

  /** per-slot class overrides, merged after the theme */
  ui?: Partial<Record<string, string>>;
  /** extra classes on the root slot */
  class?: string;
  children?: ReactNode;
}

export function BlogPosts(props: BlogPostsProps): JSX.Element;
