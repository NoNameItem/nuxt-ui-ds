export interface IconProps {
  /** Iconify / Nuxt UI icon name, e.g. `i-lucide-check` or `lucide:check` */
  name: string;
  /** Tailwind classes — Nuxt UI sizes icons with `size-*` (`size-5` = 20px) */
  class?: string;
  /** shorthand for `size-{n}` */
  size?: number;
}

export function Icon(props: IconProps): JSX.Element;
