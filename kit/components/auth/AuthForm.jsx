import React from 'react';
import { tvd, slotStyle } from '../../lib/tv.js';
import { renderIcon } from '../../lib/iconify.jsx';
import { ICONS } from '../../lib/icons.js';
import { Button } from '../core/Button.jsx';
import { Input } from '../forms/Input.jsx';
import { Select } from '../forms/Select.jsx';
import { Checkbox } from '../forms/Checkbox.jsx';
import { FormField } from '../forms/FormField.jsx';
import { Separator } from '../core/Separator.jsx';

/* @nuxt/ui 4.11.1 — theme copied verbatim from themes/auth-form.ts (source/themes.json -> "auth-form").
   Values are literal: no rounding, no cross-component alignment. */
export const authFormTheme = {
  "slots": {
    "root": "w-full space-y-6",
    "header": "flex flex-col text-center",
    "leading": "mb-2",
    "leadingIcon": "size-8 shrink-0 inline-block",
    "title": "text-xl text-pretty font-semibold text-highlighted",
    "description": "mt-1 text-base text-pretty text-muted",
    "body": "gap-y-6 flex flex-col",
    "providers": "space-y-3",
    "checkbox": "",
    "select": "w-full",
    "password": "w-full",
    "otp": "w-full",
    "input": "w-full",
    "separator": "",
    "form": "space-y-5",
    "footer": "text-sm text-center text-muted mt-2"
  }
};

/* AuthForm.vue composes other kit components from its `fields` / `providers`
   props — none of which survives DOM extraction, since every control is chosen
   in script by `field.type`. This is the same composition, with the auth-form
   theme's slots on the same nodes. */
const resolve = tvd('auth-form', authFormTheme);

function control(field, cls) {
  const common = { name: field.name, placeholder: field.placeholder, disabled: field.disabled, class: cls };
  if (field.type === 'checkbox') return <Checkbox {...common} label={field.label} />;
  if (field.type === 'select') return <Select {...common} items={field.items} />;
  /* AuthForm.vue:178-201 — a password field is its own branch: `data-slot="password"`,
     and its `trailing` slot holds a UButton (neutral / link / sm) rather than a
     bare icon. Visibility starts false (:56-62), so the icon is `eye`, the
     button reads "Show password" and `aria-pressed` is false. */
  if (field.type === 'password') {
    return (
      <Input {...common} type="password" data-slot="password"
        trailing={<Button color="neutral" variant="link" size="sm" icon={ICONS.eye}
          aria-label="Show password" aria-pressed="false" />} />
    );
  }
  return <Input {...common} type={field.type || 'text'} data-slot="input" />;
}

export function AuthForm(props) {
  const {
    title, description, icon, fields = [], providers = [], separator = 'or',
    submit, footer, ui: uiProp = {}, class: className, className: classNameAlt, ...rest
  } = props;
  const ui = resolve(props);
  const submitProps = typeof submit === 'object' && submit ? submit : {};

  return (
    <div {...slotStyle(ui.root(uiProp.root, className || classNameAlt))} data-ds-component="AuthForm" data-slot="root" {...rest}>
      {title || description || icon ? (
        <div {...slotStyle(ui.header(uiProp.header))} data-slot="header">
          {icon ? <div {...slotStyle(ui.leading(uiProp.leading))} data-slot="leading">{renderIcon(icon, ui.leadingIcon(uiProp.leadingIcon))}</div> : null}
          {title ? <div {...slotStyle(ui.title(uiProp.title))} data-slot="title">{title}</div> : null}
          {description ? <div {...slotStyle(ui.description(uiProp.description))} data-slot="description">{description}</div> : null}
        </div>
      ) : null}
      <div {...slotStyle(ui.body(uiProp.body))} data-slot="body">
        {providers.length ? (
          <div {...slotStyle(ui.providers(uiProp.providers))} data-slot="providers">
            {providers.map((p, i) => <Button key={i} block color="neutral" variant="subtle" {...p} />)}
          </div>
        ) : null}
        {separator && providers.length && fields.length
          ? <Separator label={typeof separator === 'string' ? separator : undefined} {...slotStyle(ui.separator(uiProp.separator))} data-slot="separator" />
          : null}
        {fields.length ? (
          <form {...slotStyle(ui.form(uiProp.form))} data-slot="form">
            {fields.map((field, i) => (
              <FormField key={field.name || i} label={field.type === 'checkbox' ? undefined : field.label}
                description={field.description} help={field.help} hint={field.hint} required={field.required} name={field.name}>
                {control(field, ui.$slot(field.type === 'checkbox' ? 'checkbox' : field.type === 'select' ? 'select' : field.type === 'password' ? 'password' : 'input'))}
              </FormField>
            ))}
            <Button type="submit" block label="Continue" {...submitProps} />
          </form>
        ) : null}
      </div>
      {footer ? <div {...slotStyle(ui.footer(uiProp.footer))} data-slot="footer">{footer}</div> : null}
    </div>
  );
}
