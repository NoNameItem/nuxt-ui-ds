import React from 'react';
import { register } from '../../lib/registry.js';
import { renderIcon, iconifyName } from '../../lib/iconify.jsx';

/* Icon.vue in @nuxt/ui has no entry in themes.json — it is a thin wrapper that
   renders an Iconify icon and forwards `class`. Intentional addition: every
   themed component depends on it, so it is exposed as a component too. */
export function Icon({ name, class: className, className: classNameAlt, size }) {
  const cls = [className || classNameAlt, size ? `size-${size}` : null].filter(Boolean).join(' ');
  return renderIcon(name, cls || undefined);
}

export { iconifyName };

register('Icon', Icon);
