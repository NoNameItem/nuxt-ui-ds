# Шаблоны компонентов @nuxt/ui 4.11.1 — часть 1 из 2
Источник истины по структуре DOM. Узлы помечены `data-slot`; имя слота совпадает
с ключом в `slots` соответствующей темы из `themes.json`.


## Accordion.vue

```vue
<script>
import theme from "#build/ui/accordion";
</script>

<script setup>
import { computed } from "vue";
import { AccordionRoot, AccordionItem, AccordionHeader, AccordionTrigger, AccordionContent } from "reka-ui";
import { useForwardProps } from "../composables/useForwardProps";
import { reactivePick } from "@vueuse/core";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { get } from "../utils";
import { tv } from "../utils/tv";
import UIcon from "./Icon.vue";
const _props = defineProps({
  as: { type: null, required: false },
  items: { type: Array, required: false },
  trailingIcon: { type: null, required: false },
  valueKey: { type: null, required: false, default: "value" },
  labelKey: { type: null, required: false, default: "label" },
  class: { type: null, required: false },
  ui: { type: Object, required: false },
  collapsible: { type: Boolean, required: false, default: true },
  defaultValue: { type: null, required: false },
  modelValue: { type: null, required: false },
  type: { type: String, required: false, default: "single" },
  disabled: { type: Boolean, required: false },
  unmountOnHide: { type: Boolean, required: false, default: true }
});
const emits = defineEmits(["update:modelValue"]);
const slots = defineSlots();
const props = useComponentProps("accordion", _props);
const appConfig = useAppConfig();
const rootProps = useForwardProps(reactivePick(props, "as", "collapsible", "defaultValue", "disabled", "modelValue", "unmountOnHide"), emits);
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.accordion || {} })({
  disabled: props.disabled
}));
</script>

<template>
  <AccordionRoot v-bind="rootProps" :type="props.type" data-slot="root" :class="ui.root({ class: [props.ui?.root, props.class] })">
    <AccordionItem
      v-for="(item, index) in props.items"
      v-slot="{ open }"
      :key="get(item, props.valueKey) ?? index"
      :value="get(item, props.valueKey) ?? String(index)"
      :disabled="item.disabled"
      data-slot="item"
      :class="ui.item({ class: [props.ui?.item, item.ui?.item, item.class] })"
    >
      <AccordionHeader as="div" data-slot="header" :class="ui.header({ class: [props.ui?.header, item.ui?.header] })">
        <AccordionTrigger data-slot="trigger" :class="ui.trigger({ class: [props.ui?.trigger, item.ui?.trigger], disabled: item.disabled })">
          <slot name="leading" :item="item" :index="index" :open="open" :ui="ui">
            <UIcon v-if="item.icon" :name="item.icon" data-slot="leadingIcon" :class="ui.leadingIcon({ class: [props.ui?.leadingIcon, item?.ui?.leadingIcon] })" />
          </slot>

          <span v-if="get(item, props.labelKey) || !!slots.default" data-slot="label" :class="ui.label({ class: [props.ui?.label, item.ui?.label] })">
            <slot :item="item" :index="index" :open="open">{{ get(item, props.labelKey) }}</slot>
          </span>

          <slot name="trailing" :item="item" :index="index" :open="open" :ui="ui">
            <UIcon :name="item.trailingIcon || props.trailingIcon || appConfig.ui.icons.chevronDown" data-slot="trailingIcon" :class="ui.trailingIcon({ class: [props.ui?.trailingIcon, item.ui?.trailingIcon] })" />
          </slot>
        </AccordionTrigger>
      </AccordionHeader>

      <AccordionContent v-if="item.content || !!slots.content || item.slot && !!slots[item.slot] || !!slots.body || item.slot && !!slots[`${item.slot}-body`]" data-slot="content" :class="ui.content({ class: [props.ui?.content, item.ui?.content] })">
        <slot :name="item.slot || 'content'" :item="item" :index="index" :open="open" :ui="ui">
          <div data-slot="body" :class="ui.body({ class: [props.ui?.body, item.ui?.body] })">
            <slot :name="item.slot ? `${item.slot}-body` : 'body'" :item="item" :index="index" :open="open" :ui="ui">
              {{ item.content }}
            </slot>
          </div>
        </slot>
      </AccordionContent>
    </AccordionItem>
  </AccordionRoot>
</template>
```


## Alert.vue

```vue
<script>
import theme from "#build/ui/alert";
</script>

<script setup>
import { computed } from "vue";
import { Primitive } from "reka-ui";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { useLocale } from "../composables/useLocale";
import { tv } from "../utils/tv";
import UIcon from "./Icon.vue";
import UAvatar from "./Avatar.vue";
import UButton from "./Button.vue";
const _props = defineProps({
  as: { type: null, required: false },
  title: { type: String, required: false },
  description: { type: String, required: false },
  icon: { type: null, required: false },
  avatar: { type: Object, required: false },
  color: { type: null, required: false },
  variant: { type: null, required: false },
  orientation: { type: null, required: false, default: "vertical" },
  actions: { type: Array, required: false },
  close: { type: [Boolean, Object], required: false },
  closeIcon: { type: null, required: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false }
});
const emits = defineEmits(["update:open"]);
const slots = defineSlots();
const props = useComponentProps("alert", _props);
const { t } = useLocale();
const appConfig = useAppConfig();
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.alert || {} })({
  color: props.color,
  variant: props.variant,
  orientation: props.orientation,
  title: !!props.title || !!slots.title
}));
</script>

<template>
  <Primitive :as="props.as" :data-orientation="props.orientation" data-slot="root" :class="ui.root({ class: [props.ui?.root, props.class] })">
    <slot name="leading" :ui="ui">
      <UAvatar v-if="props.avatar" :size="props.ui?.avatarSize || ui.avatarSize()" v-bind="props.avatar" data-slot="avatar" :class="ui.avatar({ class: props.ui?.avatar })" />
      <UIcon v-else-if="props.icon" :name="props.icon" data-slot="icon" :class="ui.icon({ class: props.ui?.icon })" />
    </slot>

    <div data-slot="wrapper" :class="ui.wrapper({ class: props.ui?.wrapper })">
      <div v-if="props.title || !!slots.title" data-slot="title" :class="ui.title({ class: props.ui?.title })">
        <slot name="title">
          {{ props.title }}
        </slot>
      </div>
      <div v-if="props.description || !!slots.description" data-slot="description" :class="ui.description({ class: props.ui?.description })">
        <slot name="description">
          {{ props.description }}
        </slot>
      </div>

      <div v-if="props.orientation === 'vertical' && (props.actions?.length || !!slots.actions)" data-slot="actions" :class="ui.actions({ class: props.ui?.actions })">
        <slot name="actions">
          <UButton v-for="(action, index) in props.actions" :key="index" size="xs" v-bind="action" />
        </slot>
      </div>
    </div>

    <div v-if="props.orientation === 'horizontal' && (props.actions?.length || !!slots.actions) || props.close" data-slot="actions" :class="ui.actions({ class: props.ui?.actions, orientation: 'horizontal' })">
      <template v-if="props.orientation === 'horizontal' && (props.actions?.length || !!slots.actions)">
        <slot name="actions">
          <UButton v-for="(action, index) in props.actions" :key="index" size="xs" v-bind="action" />
        </slot>
      </template>

      <slot name="close" :ui="ui">
        <UButton
          v-if="props.close"
          :icon="props.closeIcon || appConfig.ui.icons.close"
          color="neutral"
          variant="link"
          :aria-label="t('alert.close')"
          v-bind="typeof props.close === 'object' ? props.close : {}"
          data-slot="close"
          :class="ui.close({ class: props.ui?.close })"
          @click="emits('update:open', false)"
        />
      </slot>
    </div>
  </Primitive>
</template>
```


## App.vue

```vue
<script>
export default {
  name: "App"
};
</script>

<script setup>
import { toRef, useId, provide } from "vue";
import { ConfigProvider, TooltipProvider, useForwardProps } from "reka-ui";
import { reactivePick } from "@vueuse/core";
import { localeContextInjectionKey } from "../composables/useLocale";
import { portalTargetInjectionKey } from "../composables/usePortal";
import UToaster from "./Toaster.vue";
import UOverlayProvider from "./OverlayProvider.vue";
const props = defineProps({
  tooltip: { type: Object, required: false },
  toaster: { type: [Object, null], required: false },
  locale: { type: Object, required: false },
  portal: { type: [Boolean, String], required: false, skipCheck: true, default: "body" },
  dir: { type: String, required: false },
  scrollBody: { type: [Boolean, Object], required: false },
  nonce: { type: String, required: false }
});
defineSlots();
const configProviderProps = useForwardProps(reactivePick(props, "scrollBody"));
const tooltipProps = toRef(() => props.tooltip);
const toasterProps = toRef(() => props.toaster);
const locale = toRef(() => props.locale);
provide(localeContextInjectionKey, locale);
const portal = toRef(() => props.portal);
provide(portalTargetInjectionKey, portal);
</script>

<template>
  <ConfigProvider :use-id="() => useId()" :dir="props.dir || locale?.dir" :locale="locale?.code" v-bind="configProviderProps">
    <TooltipProvider v-bind="tooltipProps">
      <UToaster v-if="toaster !== null" v-bind="toasterProps">
        <slot />
      </UToaster>
      <slot v-else />

      <UOverlayProvider />
    </TooltipProvider>
  </ConfigProvider>
</template>
```


## AuthForm.vue

```vue
<script>
import theme from "#build/ui/auth-form";
</script>

<script setup>
import { reactive, shallowReactive, computed, useTemplateRef } from "vue";
import { Primitive } from "reka-ui";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { useLocale } from "../composables/useLocale";
import { omit, pick } from "../utils";
import { tv } from "../utils/tv";
import UButton from "./Button.vue";
import UIcon from "./Icon.vue";
import USeparator from "./Separator.vue";
import UForm from "./Form.vue";
import UFormField from "./FormField.vue";
import UCheckbox from "./Checkbox.vue";
import USelectMenu from "./SelectMenu.vue";
import UInput from "./Input.vue";
import UPinInput from "./PinInput.vue";
defineOptions({ inheritAttrs: false });
const _props = defineProps({
  as: { type: null, required: false },
  icon: { type: null, required: false },
  title: { type: String, required: false },
  description: { type: String, required: false },
  fields: { type: Array, required: false },
  providers: { type: Array, required: false },
  separator: { type: [String, Object], required: false, default: "or" },
  submit: { type: Object, required: false },
  schema: { type: null, required: false },
  validate: { type: Function, required: false },
  validateOn: { type: Array, required: false },
  validateOnInputDelay: { type: Number, required: false },
  disabled: { type: Boolean, required: false },
  loading: { type: Boolean, required: false },
  loadingAuto: { type: Boolean, required: false },
  class: { type: null, required: false },
  onSubmit: { type: Function, required: false },
  ui: { type: Object, required: false }
});
const state = reactive((_props.fields || []).reduce((acc, field) => {
  if (field.name) {
    acc[field.name] = field.defaultValue;
  }
  return acc;
}, {}));
defineEmits(["submit"]);
const slots = defineSlots();
const props = useComponentProps("authForm", _props);
const { t } = useLocale();
const appConfig = useAppConfig();
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.authForm || {} })());
const formRef = useTemplateRef("formRef");
const passwordVisibility = reactive(
  (_props.fields || []).reduce((acc, field) => {
    if (field.type === "password" && field.name) {
      acc[field.name] = false;
    }
    return acc;
  }, {})
);
const passwordRefs = shallowReactive({});
function pickFieldProps(field) {
  const fields = ["name", "errorPattern", "help", "error", "hint", "size", "required", "eagerValidation", "validateOnInputDelay"];
  if (field.type === "checkbox") {
    return pick(field, fields);
  }
  return pick(field, [...fields, "label", "description"]);
}
function omitFieldProps(field) {
  const fields = ["errorPattern", "help", "error", "hint", "size", "required", "eagerValidation", "validateOnInputDelay"];
  if (field.type === "checkbox" || field.type === "select" || field.type === "otp") {
    if (field.type === "checkbox") {
      return omit(field, [...fields, "type"]);
    }
    return omit(field, [...fields, "type", "label", "description"]);
  }
  return omit(field, [...fields, "label", "description"]);
}
defineExpose({
  formRef,
  state
});
</script>

<template>
  <Primitive :as="props.as" :data-slot="$attrs['data-slot'] ?? 'root'" :class="ui.root({ class: [props.ui?.root, props.class] })">
    <div v-if="props.icon || !!slots.leading || (props.title || !!slots.title) || (props.description || !!slots.description) || !!slots.header" data-slot="header" :class="ui.header({ class: props.ui?.header })">
      <slot name="header">
        <div v-if="props.icon || !!slots.leading" data-slot="leading" :class="ui.leading({ class: props.ui?.leading })">
          <slot name="leading" :ui="ui">
            <UIcon v-if="props.icon" :name="props.icon" data-slot="leadingIcon" :class="ui.leadingIcon({ class: props.ui?.leadingIcon })" />
          </slot>
        </div>

        <div v-if="props.title || !!slots.title" data-slot="title" :class="ui.title({ class: props.ui?.title })">
          <slot name="title">
            {{ props.title }}
          </slot>
        </div>

        <div v-if="props.description || !!slots.description" data-slot="description" :class="ui.description({ class: props.ui?.description })">
          <slot name="description">
            {{ props.description }}
          </slot>
        </div>
      </slot>
    </div>

    <div data-slot="body" :class="ui.body({ class: props.ui?.body })">
      <div v-if="props.providers?.length || !!slots.providers" data-slot="providers" :class="ui.providers({ class: props.ui?.providers })">
        <slot name="providers">
          <UButton
            v-for="(provider, index) in props.providers"
            :key="index"
            block
            color="neutral"
            variant="subtle"
            v-bind="provider"
          />
        </slot>
      </div>

      <slot name="separator">
        <USeparator
          v-if="props.providers?.length && props.fields?.length"
          v-bind="typeof props.separator === 'object' ? props.separator : { label: props.separator }"
          data-slot="separator"
          :class="ui.separator({ class: props.ui?.separator })"
        />
      </slot>

      <UForm
        v-if="props.fields?.length"
        ref="formRef"
        :state="state"
        :schema="props.schema"
        :validate="props.validate"
        :validate-on="props.validateOn"
        :disabled="props.disabled"
        :loading-auto="props.loadingAuto"
        :class="ui.form({ class: props.ui?.form })"
        v-bind="$attrs"
        data-slot="form"
        @submit="props.onSubmit"
      >
        <UFormField
          v-for="field in props.fields"
          :key="field.name"
          v-bind="pickFieldProps(field)"
        >
          <slot :name="`${field.name}-field`" v-bind="{ state, field }">
            <UCheckbox
              v-if="field.type === 'checkbox'"
              v-model="state[field.name]"
              data-slot="checkbox"
              :class="ui.checkbox({ class: props.ui?.checkbox })"
              v-bind="omitFieldProps(field)"
            />
            <USelectMenu
              v-else-if="field.type === 'select'"
              v-model="state[field.name]"
              data-slot="select"
              :class="ui.select({ class: props.ui?.select })"
              v-bind="omitFieldProps(field)"
            />
            <UPinInput
              v-else-if="field.type === 'otp'"
              :id="field.name"
              v-model="state[field.name]"
              data-slot="otp"
              :class="ui.otp({ class: props.ui?.otp })"
              v-bind="Object.assign({}, omitFieldProps(field), typeof field.otp === 'object' ? field.otp : {})"
              otp
            />
            <UInput
              v-else-if="field.type === 'password'"
              :ref="(el) => {
  passwordRefs[field.name] = el;
}"
              v-model="state[field.name]"
              data-slot="password"
              :class="ui.password({ class: props.ui?.password })"
              v-bind="omitFieldProps(field)"
              :type="passwordVisibility[field.name] ? 'text' : 'password'"
            >
              <template #trailing>
                <UButton
                  color="neutral"
                  variant="link"
                  size="sm"
                  :icon="passwordVisibility[field.name] ? appConfig.ui.icons.eyeOff : appConfig.ui.icons.eye"
                  :aria-label="passwordVisibility[field.name] ? t('authForm.hidePassword') : t('authForm.showPassword')"
                  :aria-pressed="!!passwordVisibility[field.name]"
                  :aria-controls="passwordRefs[field.name]?.inputRef?.id"
                  @click="passwordVisibility[field.name] = !passwordVisibility[field.name]"
                />
              </template>
            </UInput>
            <UInput
              v-else
              v-model="state[field.name]"
              data-slot="input"
              :class="ui.input({ class: props.ui?.input })"
              v-bind="omitFieldProps(field)"
            />
          </slot>

          <template v-if="!!slots[`${field.name}-label`]" #label>
            <slot :name="`${field.name}-label`" />
          </template>
          <template v-if="!!slots[`${field.name}-description`]" #description>
            <slot :name="`${field.name}-description`" />
          </template>
          <template v-if="!!slots[`${field.name}-hint`]" #hint>
            <slot :name="`${field.name}-hint`" />
          </template>
          <template v-if="!!slots[`${field.name}-help`]" #help>
            <slot :name="`${field.name}-help`" />
          </template>
          <template v-if="!!slots[`${field.name}-error`]" #error>
            <slot :name="`${field.name}-error`" />
          </template>
        </UFormField>

        <slot v-if="!!slots.validation" name="validation" />

        <slot name="submit" :loading="props.loading">
          <UButton
            type="submit"
            :label="t('authForm.submit')"
            block
            :loading="props.loading"
            :loading-auto="props.loadingAuto"
            v-bind="props.submit"
          />
        </slot>
      </UForm>
    </div>

    <div v-if="!!slots.footer" data-slot="footer" :class="ui.footer({ class: props.ui?.footer })">
      <slot name="footer" />
    </div>
  </Primitive>
</template>
```


## Avatar.vue

```vue
<script>
import theme from "#build/ui/avatar";
</script>

<script setup>
import { ref, computed, watch } from "vue";
import { Primitive, Slot } from "reka-ui";
import { defu } from "defu";
import { useAppConfig } from "#imports";
import ImageComponent from "#build/ui-image-component";
import { useComponentProps } from "../composables/useComponentProps";
import { useAvatarGroup } from "../composables/useAvatarGroup";
import { tv } from "../utils/tv";
import UIcon from "./Icon.vue";
import UChip from "./Chip.vue";
defineOptions({ inheritAttrs: false });
const _props = defineProps({
  as: { type: null, required: false },
  src: { type: String, required: false },
  alt: { type: String, required: false },
  icon: { type: null, required: false },
  text: { type: String, required: false },
  size: { type: null, required: false },
  color: { type: null, required: false },
  chip: { type: [Boolean, Object], required: false },
  class: { type: null, required: false },
  style: { type: null, required: false },
  ui: { type: Object, required: false }
});
const props = useComponentProps("avatar", _props);
const as = computed(() => {
  if (typeof props.as === "string" || typeof props.as?.render === "function") {
    return { root: props.as };
  }
  return defu(props.as, { root: "span" });
});
const fallback = computed(() => props.text || (props.alt || "").split(" ").map((word) => word.charAt(0)).join("").substring(0, 2));
const appConfig = useAppConfig();
const { size, color } = useAvatarGroup(_props);
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.avatar || {} })({
  size: size.value ?? props.size,
  color: color.value ?? props.color
}));
const rootClass = computed(() => ui.value.root({ class: [props.ui?.root, props.class] }));
const sizePx = computed(() => {
  const sizeClass = (rootClass.value || "").split(" ").find((c) => /^size-\d+$/.test(c));
  if (sizeClass) {
    const num = Number.parseFloat(sizeClass.split("-")[1] ?? "");
    if (!Number.isNaN(num)) return num * 4;
  }
  return null;
});
const error = ref(false);
watch(() => props.src, () => {
  if (error.value) {
    error.value = false;
  }
});
function onError() {
  error.value = true;
}
</script>

<template>
  <component
    :is="props.chip ? UChip : Primitive"
    :as="as.root"
    v-bind="props.chip ? typeof props.chip === 'object' ? { inset: true, ...props.chip } : { inset: true } : {}"
    :data-slot="$attrs['data-slot'] ?? 'root'"
    :class="rootClass"
    :style="props.style"
  >
    <component
      :is="as.img || ImageComponent"
      v-if="props.src && !error"
      :src="props.src"
      :alt="props.alt"
      :width="sizePx"
      :height="sizePx"
      v-bind="$attrs"
      data-slot="image"
      :class="ui.image({ class: props.ui?.image })"
      @error="onError"
    />

    <Slot v-else v-bind="{ ...$attrs, 'data-slot': void 0 }">
      <slot>
        <UIcon v-if="props.icon" :name="props.icon" data-slot="icon" :class="ui.icon({ class: props.ui?.icon })" />
        <span v-else data-slot="fallback" :class="ui.fallback({ class: props.ui?.fallback })">{{ fallback || "\xA0" }}</span>
      </slot>
    </Slot>
  </component>
</template>
```


## AvatarGroup.vue

```vue
<script>
import theme from "#build/ui/avatar-group";
</script>

<script setup>
import { computed, provide } from "vue";
import { Primitive } from "reka-ui";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { avatarGroupInjectionKey } from "../composables/useAvatarGroup";
import { tv } from "../utils/tv";
import UAvatar from "./Avatar.vue";
const _props = defineProps({
  as: { type: null, required: false },
  size: { type: null, required: false },
  color: { type: null, required: false },
  max: { type: [Number, String], required: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false }
});
const slots = defineSlots();
const props = useComponentProps("avatarGroup", _props);
const appConfig = useAppConfig();
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.avatarGroup || {} })({
  size: props.size,
  color: props.color
}));
const max = computed(() => typeof props.max === "string" ? Number.parseInt(props.max, 10) : props.max);
const children = computed(() => {
  let children2 = slots.default?.();
  if (children2?.length) {
    children2 = children2.flatMap((child) => {
      if (typeof child.type === "symbol") {
        if (typeof child.children === "string") {
          return;
        }
        return child.children;
      }
      return child;
    }).filter(Boolean);
  }
  return children2 || [];
});
const visibleAvatars = computed(() => {
  if (!children.value.length) {
    return [];
  }
  if (!max.value || max.value <= 0) {
    return [...children.value].reverse();
  }
  return [...children.value].slice(0, max.value).reverse();
});
const hiddenCount = computed(() => {
  if (!children.value.length) {
    return 0;
  }
  return children.value.length - visibleAvatars.value.length;
});
provide(avatarGroupInjectionKey, computed(() => ({
  size: props.size,
  color: props.color
})));
</script>

<template>
  <Primitive :as="props.as" data-slot="root" :class="ui.root({ class: [props.ui?.root, props.class] })">
    <UAvatar v-if="hiddenCount > 0" :text="`+${hiddenCount}`" data-slot="base" :class="ui.base({ class: props.ui?.base })" />
    <component :is="avatar" v-for="(avatar, count) in visibleAvatars" :key="count" data-slot="base" :class="ui.base({ class: props.ui?.base })" />
  </Primitive>
</template>
```


## Badge.vue

```vue
<script>
import theme from "#build/ui/badge";
</script>

<script setup>
import { computed } from "vue";
import { Primitive } from "reka-ui";
import { useAppConfig } from "#imports";
import { useFieldGroup } from "../composables/useFieldGroup";
import { useComponentIcons } from "../composables/useComponentIcons";
import { useComponentProps } from "../composables/useComponentProps";
import { tv } from "../utils/tv";
import UIcon from "./Icon.vue";
import UAvatar from "./Avatar.vue";
const _props = defineProps({
  as: { type: null, required: false, default: "span" },
  label: { type: [String, Number], required: false },
  color: { type: null, required: false },
  variant: { type: null, required: false },
  size: { type: null, required: false },
  square: { type: Boolean, required: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false },
  icon: { type: null, required: false },
  avatar: { type: Object, required: false },
  leading: { type: Boolean, required: false },
  leadingIcon: { type: null, required: false },
  trailing: { type: Boolean, required: false },
  trailingIcon: { type: null, required: false }
});
const slots = defineSlots();
const props = useComponentProps("badge", _props);
const appConfig = useAppConfig();
const { orientation, size: fieldGroupSize } = useFieldGroup(_props);
const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(props);
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.badge || {} })({
  color: props.color,
  variant: props.variant,
  size: fieldGroupSize.value ?? props.size,
  square: props.square || !slots.default && !props.label,
  fieldGroup: orientation.value
}));
</script>

<template>
  <Primitive :as="props.as" data-slot="base" :class="ui.base({ class: [props.ui?.base, props.class] })">
    <slot name="leading" :ui="ui">
      <UIcon v-if="isLeading && leadingIconName" :name="leadingIconName" data-slot="leadingIcon" :class="ui.leadingIcon({ class: props.ui?.leadingIcon })" />
      <UAvatar v-else-if="!!props.avatar" :size="props.ui?.leadingAvatarSize || ui.leadingAvatarSize()" v-bind="props.avatar" data-slot="leadingAvatar" :class="ui.leadingAvatar({ class: props.ui?.leadingAvatar })" />
    </slot>

    <slot :ui="ui">
      <span v-if="props.label !== void 0 && props.label !== null" data-slot="label" :class="ui.label({ class: props.ui?.label })">
        {{ props.label }}
      </span>
    </slot>

    <slot name="trailing" :ui="ui">
      <UIcon v-if="isTrailing && trailingIconName" :name="trailingIconName" data-slot="trailingIcon" :class="ui.trailingIcon({ class: props.ui?.trailingIcon })" />
    </slot>
  </Primitive>
</template>
```


## Banner.vue

```vue
<script>
import theme from "#build/ui/banner";
</script>

<script setup>
import { computed, ref, onMounted, useId } from "vue";
import { Primitive } from "reka-ui";
import { useHead, useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { useLocale } from "../composables/useLocale";
import { usePrefix } from "../composables/usePrefix";
import { tv } from "../utils/tv";
import ULink from "./Link.vue";
import UContainer from "./Container.vue";
import UIcon from "./Icon.vue";
import UButton from "./Button.vue";
defineOptions({ inheritAttrs: false });
const _props = defineProps({
  as: { type: null, required: false },
  id: { type: String, required: false },
  icon: { type: null, required: false },
  title: { type: String, required: false },
  actions: { type: Array, required: false },
  to: { type: null, required: false },
  target: { type: [String, Object, null], required: false },
  color: { type: null, required: false },
  close: { type: [Boolean, Object], required: false },
  closeIcon: { type: null, required: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false }
});
const slots = defineSlots();
const emits = defineEmits(["close"]);
const props = useComponentProps("banner", _props);
const { t } = useLocale();
const appConfig = useAppConfig();
const prefix = usePrefix();
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.banner || {} })({
  color: props.color,
  to: !!props.to
}));
const instanceId = useId();
const id = computed(() => {
  const rawId = props.id || instanceId;
  return `banner-${rawId.replace(/[^\w-]/g, "-")}`;
});
const isVisible = ref(true);
const hasPersistence = computed(() => !!props.id);
onMounted(() => {
  if (hasPersistence.value && typeof localStorage !== "undefined") {
    const isClosed = localStorage.getItem(id.value) === "true";
    isVisible.value = !isClosed;
  }
});
useHead(() => {
  if (!hasPersistence.value) return {};
  return {
    script: [{
      key: `prehydrate-banner-${id.value}`,
      innerHTML: `
        (function() {
          try {
            if (localStorage.getItem(${JSON.stringify(id.value)}) === 'true') {
              document.documentElement.style.setProperty('--${id.value}-display', 'none');
            }
          } catch (e) {}
        })();
      `.replace(/\s+/g, " "),
      type: "text/javascript",
      tagPosition: "head"
    }],
    style: [{
      key: `banner-style-${id.value}`,
      innerHTML: `.banner[data-banner-id="${id.value}"] { display: var(--${id.value}-display, block); }`,
      tagPosition: "head"
    }]
  };
});
function onClose() {
  if (hasPersistence.value) {
    localStorage.setItem(id.value, "true");
    document.documentElement.style.setProperty(`--${id.value}-display`, "none");
  }
  isVisible.value = false;
  emits("close");
}
</script>

<template>
  <Primitive
    v-show="isVisible"
    :as="props.as"
    v-bind="!props.to ? $attrs : {}"
    class="banner"
    :data-banner-id="id"
    :data-slot="$attrs['data-slot'] ?? 'root'"
    :class="ui.root({ class: [props.ui?.root, props.class] })"
  >
    <ULink
      v-if="props.to"
      :aria-label="props.title"
      v-bind="{ 'to': props.to, 'target': props.target, ...$attrs, 'data-slot': void 0 }"
      :class="prefix('focus:outline-none')"
      raw
    >
      <span :class="prefix('absolute inset-0')" aria-hidden="true" />
    </ULink>

    <UContainer data-slot="container" :class="ui.container({ class: props.ui?.container })">
      <div data-slot="left" :class="ui.left({ class: props.ui?.left })" />

      <div data-slot="center" :class="ui.center({ class: props.ui?.center })">
        <slot name="leading" :ui="ui">
          <UIcon v-if="props.icon" :name="props.icon" data-slot="icon" :class="ui.icon({ class: props.ui?.icon })" />
        </slot>

        <div v-if="props.title || !!slots.title" data-slot="title" :class="ui.title({ class: props.ui?.title })">
          <slot name="title">
            {{ props.title }}
          </slot>
        </div>

        <div v-if="props.actions?.length || !!slots.actions" data-slot="actions" :class="ui.actions({ class: props.ui?.actions })">
          <slot name="actions">
            <UButton v-for="(action, index) in props.actions" :key="index" color="neutral" size="xs" v-bind="action" />
          </slot>
        </div>
      </div>

      <div data-slot="right" :class="ui.right({ class: props.ui?.right })">
        <slot name="close" :ui="ui">
          <UButton
            v-if="props.close"
            :icon="props.closeIcon || appConfig.ui.icons.close"
            size="md"
            color="neutral"
            variant="ghost"
            :aria-label="t('banner.close')"
            v-bind="typeof props.close === 'object' ? props.close : {}"
            data-slot="close"
            :class="ui.close({ class: props.ui?.close })"
            @click="onClose"
          />
        </slot>
      </div>
    </UContainer>
  </Primitive>
</template>
```


## BlogPost.vue

```vue
<script>
import theme from "#build/ui/blog-post";
</script>

<script setup>
import { computed } from "vue";
import { Primitive, useDateFormatter } from "reka-ui";
import { useAppConfig } from "#imports";
import { useLocale } from "../composables/useLocale";
import { useComponentProps } from "../composables/useComponentProps";
import { usePrefix } from "../composables/usePrefix";
import ImageComponent from "#build/ui-image-component";
import { getSlotChildrenText } from "../utils";
import { tv } from "../utils/tv";
import ULink from "./Link.vue";
import UBadge from "./Badge.vue";
import UAvatar from "./Avatar.vue";
import UAvatarGroup from "./AvatarGroup.vue";
import UUser from "./User.vue";
defineOptions({ inheritAttrs: false });
const _props = defineProps({
  as: { type: null, required: false, default: "article" },
  title: { type: String, required: false },
  description: { type: String, required: false },
  date: { type: [String, Date], required: false },
  badge: { type: [String, Object], required: false },
  authors: { type: Array, required: false },
  image: { type: [String, Object], required: false },
  orientation: { type: null, required: false, default: "vertical" },
  variant: { type: null, required: false },
  to: { type: null, required: false },
  target: { type: [String, Object, null], required: false },
  onClick: { type: Function, required: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false }
});
const slots = defineSlots();
const props = useComponentProps("blogPost", _props);
const { locale } = useLocale();
const appConfig = useAppConfig();
const formatter = useDateFormatter(locale.value.code);
const prefix = usePrefix();
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.blogPost || {} })({
  orientation: props.orientation,
  variant: props.variant,
  image: !!props.image,
  to: !!props.to || !!props.onClick
}));
const date = computed(() => {
  if (!props.date) {
    return;
  }
  try {
    return formatter.custom(new Date(props.date), { dateStyle: "medium", timeZone: "UTC" });
  } catch {
    return props.date;
  }
});
const datetime = computed(() => {
  if (!props.date) {
    return;
  }
  try {
    return new Date(props.date)?.toISOString();
  } catch {
    return void 0;
  }
});
const ariaLabel = computed(() => {
  const slotText = slots.title && getSlotChildrenText(slots.title());
  return (slotText || props.title || "Post link").trim();
});
</script>

<template>
  <Primitive
    :as="props.as"
    v-bind="!props.to ? $attrs : {}"
    :data-orientation="props.orientation"
    :data-slot="$attrs['data-slot'] ?? 'root'"
    :class="ui.root({ class: [props.ui?.root, props.class] })"
    @click="props.onClick"
  >
    <ULink
      v-if="props.to"
      :aria-label="ariaLabel"
      v-bind="{ 'to': props.to, 'target': props.target, ...$attrs, 'data-slot': void 0 }"
      :class="prefix('focus:outline-none absolute inset-0')"
      raw
    />

    <div v-if="props.image || !!slots.header" data-slot="header" :class="ui.header({ class: props.ui?.header })">
      <slot name="header" :ui="ui">
        <component
          :is="ImageComponent"
          v-bind="typeof props.image === 'string' ? { src: props.image, alt: props.title } : { alt: props.title, ...props.image }"
          data-slot="image"
          :class="ui.image({ class: props.ui?.image, to: !!props.to })"
        />
      </slot>
    </div>

    <div data-slot="body" :class="ui.body({ class: props.ui?.body })">
      <slot name="body">
        <div v-if="date || !!slots.date || (props.badge || !!slots.badge)" data-slot="meta" :class="ui.meta({ class: props.ui?.meta })">
          <slot name="badge">
            <UBadge
              v-if="props.badge"
              color="neutral"
              variant="subtle"
              v-bind="typeof props.badge === 'string' ? { label: props.badge } : props.badge"
              data-slot="badge"
              :class="ui.badge({ class: props.ui?.badge })"
            />
          </slot>

          <time v-if="date || !!slots.date" :datetime="datetime" data-slot="date" :class="ui.date({ class: props.ui?.date })">
            <slot name="date">
              {{ date }}
            </slot>
          </time>
        </div>

        <h2 v-if="props.title || !!slots.title" data-slot="title" :class="ui.title({ class: props.ui?.title })">
          <slot name="title">
            {{ props.title }}
          </slot>
        </h2>

        <div v-if="props.description || !!slots.description" data-slot="description" :class="ui.description({ class: props.ui?.description })">
          <slot name="description">
            {{ props.description }}
          </slot>
        </div>

        <div v-if="props.authors?.length || !!slots.authors" data-slot="authors" :class="ui.authors({ class: props.ui?.authors })">
          <slot name="authors" :ui="ui">
            <template v-if="props.authors?.length">
              <UAvatarGroup v-if="props.authors.length > 1">
                <ULink
                  v-for="(author, index) in props.authors"
                  :key="index"
                  :to="author.to"
                  :target="author.target"
                  data-slot="avatar"
                  :class="ui.avatar({ class: props.ui?.avatar, to: !!author.to })"
                  raw
                >
                  <UAvatar v-bind="author.avatar" />
                </ULink>
              </UAvatarGroup>
              <UUser v-else v-bind="props.authors[0]" />
            </template>
          </slot>
        </div>
      </slot>
    </div>

    <div v-if="!!slots.footer" data-slot="footer" :class="ui.footer({ class: props.ui?.footer })">
      <slot name="footer" />
    </div>
  </Primitive>
</template>
```


## BlogPosts.vue

```vue
<script>
import theme from "#build/ui/blog-posts";
</script>

<script setup>
import { computed } from "vue";
import { Primitive } from "reka-ui";
import { useAppConfig } from "#imports";
import { omit } from "../utils";
import { tv } from "../utils/tv";
import { useComponentProps } from "../composables/useComponentProps";
import UBlogPost from "./BlogPost.vue";
const _props = defineProps({
  as: { type: null, required: false },
  posts: { type: Array, required: false },
  orientation: { type: null, required: false, default: "horizontal" },
  class: { type: null, required: false },
  ui: { type: Object, required: false }
});
const slots = defineSlots();
const props = useComponentProps("blogPosts", _props);
const getProxySlots = () => omit(slots, ["default"]);
const appConfig = useAppConfig();
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.blogPosts || {} }));
</script>

<template>
  <Primitive :as="props.as" :data-orientation="props.orientation" :class="ui({ orientation: props.orientation, class: [props.ui?.base, props.class] })">
    <slot>
      <UBlogPost
        v-for="(post, index) in props.posts"
        :key="index"
        :orientation="props.orientation === 'vertical' ? 'horizontal' : 'vertical'"
        v-bind="post"
      >
        <template v-for="(_, name) in getProxySlots()" #[name]="slotData">
          <slot :name="name" v-bind="slotData" :post="post" />
        </template>
      </UBlogPost>
    </slot>
  </Primitive>
</template>
```


## Breadcrumb.vue

```vue
<script>
import theme from "#build/ui/breadcrumb";
</script>

<script setup>
import { computed } from "vue";
import { Primitive } from "reka-ui";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { useLocale } from "../composables/useLocale";
import { get } from "../utils";
import { tv } from "../utils/tv";
import { pickLinkProps } from "../utils/link";
import UIcon from "./Icon.vue";
import UAvatar from "./Avatar.vue";
import ULinkBase from "./LinkBase.vue";
import ULink from "./Link.vue";
const _props = defineProps({
  as: { type: null, required: false, default: "nav" },
  items: { type: Array, required: false },
  separatorIcon: { type: null, required: false },
  color: { type: null, required: false },
  labelKey: { type: null, required: false, default: "label" },
  class: { type: null, required: false },
  ui: { type: Object, required: false }
});
const slots = defineSlots();
const props = useComponentProps("breadcrumb", _props);
const { dir } = useLocale();
const appConfig = useAppConfig();
const separatorIcon = computed(() => props.separatorIcon || (dir.value === "rtl" ? appConfig.ui.icons.chevronLeft : appConfig.ui.icons.chevronRight));
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.breadcrumb || {} })({
  color: props.color
}));
</script>

<template>
  <Primitive :as="props.as" aria-label="breadcrumb" data-slot="root" :class="ui.root({ class: [props.ui?.root, props.class] })">
    <ol data-slot="list" :class="ui.list({ class: props.ui?.list })">
      <template v-for="(item, index) in props.items" :key="index">
        <li data-slot="item" :class="ui.item({ class: [props.ui?.item, item.ui?.item] })">
          <ULink v-slot="{ active, ...slotProps }" v-bind="pickLinkProps(item)" custom>
            <ULinkBase v-bind="slotProps" as="span" :aria-current="(item.active ?? active) && index === props.items.length - 1 ? 'page' : void 0" data-slot="link" :class="ui.link({ class: [props.ui?.link, item.ui?.link, item.class], active: item.active ?? index === props.items.length - 1, disabled: !!item.disabled, to: !!item.to })">
              <slot :name="item.slot || 'item'" :item="item" :active="item.active ?? index === props.items.length - 1" :index="index" :ui="ui">
                <slot :name="item.slot ? `${item.slot}-leading` : 'item-leading'" :item="item" :active="item.active ?? index === props.items.length - 1" :index="index" :ui="ui">
                  <UIcon v-if="item.icon" :name="item.icon" data-slot="linkLeadingIcon" :class="ui.linkLeadingIcon({ class: [props.ui?.linkLeadingIcon, item.ui?.linkLeadingIcon], active: item.active ?? index === props.items.length - 1 })" />
                  <UAvatar v-else-if="item.avatar" :size="props.ui?.linkLeadingAvatarSize || ui.linkLeadingAvatarSize()" v-bind="item.avatar" data-slot="linkLeadingAvatar" :class="ui.linkLeadingAvatar({ class: [props.ui?.linkLeadingAvatar, item.ui?.linkLeadingAvatar], active: item.active ?? index === props.items.length - 1 })" />
                </slot>

                <span v-if="get(item, props.labelKey) || !!slots[item.slot ? `${item.slot}-label` : 'item-label']" data-slot="linkLabel" :class="ui.linkLabel({ class: [props.ui?.linkLabel, item.ui?.linkLabel] })">
                  <slot :name="item.slot ? `${item.slot}-label` : 'item-label'" :item="item" :active="item.active ?? index === props.items.length - 1" :index="index">
                    {{ get(item, props.labelKey) }}
                  </slot>
                </span>

                <slot :name="item.slot ? `${item.slot}-trailing` : 'item-trailing'" :item="item" :active="item.active ?? index === props.items.length - 1" :index="index" />
              </slot>
            </ULinkBase>
          </ULink>
        </li>

        <li v-if="index < props.items.length - 1" role="presentation" aria-hidden="true" data-slot="separator" :class="ui.separator({ class: [props.ui?.separator, item.ui?.separator] })">
          <slot name="separator" :ui="ui">
            <UIcon :name="separatorIcon" data-slot="separatorIcon" :class="ui.separatorIcon({ class: [props.ui?.separatorIcon, item.ui?.separatorIcon] })" />
          </slot>
        </li>
      </template>
    </ol>
  </Primitive>
</template>
```


## Button.vue

```vue
<script>
import theme from "#build/ui/button";
</script>

<script setup>
import { computed, ref, inject } from "vue";
import { defu } from "defu";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { useForwardProps } from "../composables/useForwardProps";
import { useComponentIcons } from "../composables/useComponentIcons";
import { useFieldGroup } from "../composables/useFieldGroup";
import { formLoadingInjectionKey } from "../composables/useFormField";
import { omit, mergeClasses } from "../utils";
import { tv } from "../utils/tv";
import { pickLinkProps } from "../utils/link";
import UIcon from "./Icon.vue";
import UAvatar from "./Avatar.vue";
import ULink from "./Link.vue";
import ULinkBase from "./LinkBase.vue";
const _props = defineProps({
  label: { type: String, required: false },
  color: { type: null, required: false },
  activeColor: { type: null, required: false },
  variant: { type: null, required: false },
  activeVariant: { type: null, required: false },
  size: { type: null, required: false },
  square: { type: Boolean, required: false },
  block: { type: Boolean, required: false },
  loadingAuto: { type: Boolean, required: false },
  onClick: { type: [Function, Array], required: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false },
  icon: { type: null, required: false },
  avatar: { type: Object, required: false },
  leading: { type: Boolean, required: false },
  leadingIcon: { type: null, required: false },
  trailing: { type: Boolean, required: false },
  trailingIcon: { type: null, required: false },
  loading: { type: Boolean, required: false },
  loadingIcon: { type: null, required: false },
  as: { type: null, required: false },
  type: { type: null, required: false },
  disabled: { type: Boolean, required: false },
  active: { type: Boolean, required: false },
  exact: { type: Boolean, required: false },
  exactQuery: { type: [Boolean, String], required: false },
  exactHash: { type: Boolean, required: false },
  inactiveClass: { type: String, required: false },
  locale: { type: [Boolean, String], required: false },
  to: { type: null, required: false },
  href: { type: null, required: false },
  external: { type: Boolean, required: false },
  target: { type: [String, Object, null], required: false },
  rel: { type: [String, Object, null], required: false },
  noRel: { type: Boolean, required: false },
  prefetchedClass: { type: String, required: false },
  prefetch: { type: Boolean, required: false },
  prefetchOn: { type: [String, Object], required: false },
  noPrefetch: { type: Boolean, required: false },
  trailingSlash: { type: String, required: false },
  activeClass: { type: String, required: false },
  exactActiveClass: { type: String, required: false },
  ariaCurrentValue: { type: String, required: false },
  viewTransition: { type: Boolean, required: false },
  replace: { type: Boolean, required: false }
});
const slots = defineSlots();
const props = useComponentProps("button", _props);
const appConfig = useAppConfig();
const { orientation, size: buttonSize } = useFieldGroup(_props);
const linkProps = useForwardProps(pickLinkProps(props));
const forwardedLinkProps = computed(() => omit(linkProps.value, ["type", "disabled", "onClick"]));
const loadingAutoState = ref(false);
const formLoading = inject(formLoadingInjectionKey, void 0);
async function onClickWrapper(event) {
  loadingAutoState.value = true;
  const callbacks = Array.isArray(props.onClick) ? props.onClick : [props.onClick];
  try {
    await Promise.all(callbacks.map((fn) => fn?.(event)));
  } finally {
    loadingAutoState.value = false;
  }
}
const isLoading = computed(() => {
  return props.loading || props.loadingAuto && (loadingAutoState.value || formLoading?.value && props.type === "submit");
});
const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(
  computed(() => ({
    icon: props.icon,
    leading: props.leading,
    leadingIcon: props.leadingIcon,
    trailing: props.trailing,
    trailingIcon: props.trailingIcon,
    loading: isLoading.value,
    loadingIcon: props.loadingIcon
  }))
);
const ui = computed(() => tv({
  extend: theme,
  ...defu({
    variants: {
      active: {
        true: {
          base: mergeClasses(appConfig.ui?.button?.variants?.active?.true?.base, props.activeClass)
        },
        false: {
          base: mergeClasses(appConfig.ui?.button?.variants?.active?.false?.base, props.inactiveClass)
        }
      }
    }
  }, appConfig.ui?.button || {})
})({
  color: props.color,
  variant: props.variant,
  size: buttonSize.value ?? props.size,
  loading: isLoading.value,
  block: props.block,
  square: props.square || !slots.default && !props.label,
  leading: isLeading.value,
  trailing: isTrailing.value,
  fieldGroup: orientation.value
}));
</script>

<template>
  <ULink
    v-slot="{ active, ...slotProps }"
    :type="props.type"
    :disabled="props.disabled || isLoading"
    v-bind="forwardedLinkProps"
    custom
  >
    <ULinkBase
      data-slot="base"
      v-bind="slotProps"
      :class="ui.base({
  class: [props.ui?.base, props.class],
  active,
  ...active && props.activeVariant ? { variant: props.activeVariant } : {},
  ...active && props.activeColor ? { color: props.activeColor } : {}
})"
      @click="onClickWrapper"
    >
      <slot name="leading" :ui="ui">
        <UIcon v-if="isLeading && leadingIconName" :name="leadingIconName" data-slot="leadingIcon" :class="ui.leadingIcon({ class: props.ui?.leadingIcon, active })" />
        <UAvatar v-else-if="!!props.avatar" :size="props.ui?.leadingAvatarSize || ui.leadingAvatarSize()" v-bind="props.avatar" data-slot="leadingAvatar" :class="ui.leadingAvatar({ class: props.ui?.leadingAvatar, active })" />
      </slot>

      <slot :ui="ui">
        <span v-if="props.label !== void 0 && props.label !== null" data-slot="label" :class="ui.label({ class: props.ui?.label, active })">
          {{ props.label }}
        </span>
      </slot>

      <slot name="trailing" :ui="ui">
        <UIcon v-if="isTrailing && trailingIconName" :name="trailingIconName" data-slot="trailingIcon" :class="ui.trailingIcon({ class: props.ui?.trailingIcon, active })" />
      </slot>
    </ULinkBase>
  </ULink>
</template>
```


## Calendar.vue

```vue
<script>
import { getWeekNumber } from "reka-ui/date";
import { getLocalTimeZone, today } from "@internationalized/date";
import theme from "#build/ui/calendar";
</script>

<script setup>
import { computed, ref, shallowRef, watch } from "vue";
import { useForwardProps } from "../composables/useForwardProps";
import { Calendar as SingleCalendar, RangeCalendar, MonthPicker, MonthRangePicker, YearPicker, YearRangePicker } from "reka-ui/namespaced";
import { reactiveOmit } from "@vueuse/core";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { useLocale } from "../composables/useLocale";
import { tv } from "../utils/tv";
import UButton from "./Button.vue";
const _props = defineProps({
  as: { type: null, required: false },
  type: { type: String, required: false, default: "date" },
  nextYearIcon: { type: null, required: false },
  nextYear: { type: Object, required: false },
  nextMonthIcon: { type: null, required: false },
  nextMonth: { type: Object, required: false },
  prevYearIcon: { type: null, required: false },
  prevYear: { type: Object, required: false },
  prevMonthIcon: { type: null, required: false },
  prevMonth: { type: Object, required: false },
  viewControl: { type: [Boolean, Object], required: false, default: true },
  color: { type: null, required: false },
  variant: { type: null, required: false },
  size: { type: null, required: false },
  range: { type: Boolean, required: false },
  multiple: { type: Boolean, required: false },
  monthControls: { type: Boolean, required: false, default: true },
  yearControls: { type: Boolean, required: false, default: true },
  defaultValue: { type: null, required: false },
  modelValue: { type: null, required: false },
  weekNumbers: { type: Boolean, required: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false },
  defaultPlaceholder: { type: Object, required: false },
  placeholder: { type: Object, required: false },
  allowNonContiguousRanges: { type: Boolean, required: false },
  pagedNavigation: { type: Boolean, required: false },
  preventDeselect: { type: Boolean, required: false },
  maximumDays: { type: Number, required: false },
  weekStartsOn: { type: Number, required: false },
  weekdayFormat: { type: String, required: false },
  fixedWeeks: { type: Boolean, required: false, default: true },
  maxValue: { type: Object, required: false },
  minValue: { type: Object, required: false },
  locale: { type: String, required: false },
  numberOfMonths: { type: Number, required: false },
  disabled: { type: Boolean, required: false },
  readonly: { type: Boolean, required: false },
  initialFocus: { type: Boolean, required: false },
  isDateDisabled: { type: Function, required: false },
  isDateUnavailable: { type: Function, required: false },
  isDateHighlightable: { type: Function, required: false },
  nextPage: { type: Function, required: false },
  prevPage: { type: Function, required: false },
  disableDaysOutsideCurrentView: { type: Boolean, required: false },
  fixedDate: { type: String, required: false },
  isMonthDisabled: { type: Function, required: false },
  isMonthUnavailable: { type: Function, required: false },
  isYearDisabled: { type: Function, required: false },
  isYearUnavailable: { type: Function, required: false }
});
const emits = defineEmits(["update:modelValue", "update:placeholder", "update:startValue", "update:validModelValue"]);
defineSlots();
const props = useComponentProps("calendar", _props);
const { dir, t, locale } = useLocale();
const appConfig = useAppConfig();
const VIEWS = ["day", "month", "year"];
const minView = computed(() => props.type === "year" ? "year" : props.type === "month" ? "month" : "day");
const maxView = "year";
const view = ref(minView.value);
watch(() => props.type, () => {
  view.value = minView.value;
});
const switchable = computed(() => minView.value !== maxView);
const isMinView = computed(() => view.value === minView.value);
function clampView(value) {
  const min = VIEWS.indexOf(minView.value);
  const max = VIEWS.indexOf(maxView);
  return VIEWS[Math.min(Math.max(VIEWS.indexOf(value), min), max)];
}
function setView(value) {
  view.value = clampView(value);
}
function cycleView() {
  const max = VIEWS.indexOf(maxView);
  const next = VIEWS.indexOf(view.value) >= max ? minView.value : VIEWS[VIEWS.indexOf(view.value) + 1];
  view.value = next;
}
function resolveDateValue(value) {
  if (Array.isArray(value)) {
    return value[0];
  }
  if (!value) {
    return void 0;
  }
  if ("start" in value || "end" in value) {
    const range = value;
    return range.start ?? range.end ?? void 0;
  }
  return value;
}
const placeholder = shallowRef(
  props.placeholder ?? resolveDateValue(props.modelValue) ?? resolveDateValue(props.defaultValue) ?? today(getLocalTimeZone())
);
watch(() => props.placeholder, (value) => {
  if (value) {
    placeholder.value = value;
  }
});
function setPlaceholder(date) {
  placeholder.value = date;
  emits("update:placeholder", date);
}
function onSelect(value) {
  if (isMinView.value) {
    emits("update:modelValue", value);
    return;
  }
  const resolved = resolveDateValue(value);
  if (resolved) {
    setPlaceholder(resolved);
  }
  setView(VIEWS[VIEWS.indexOf(view.value) - 1]);
}
function paginateYear(date, sign) {
  return sign === -1 ? date.subtract({ years: 1 }) : date.add({ years: 1 });
}
const Picker = computed(() => {
  const range = props.range && isMinView.value;
  if (view.value === "year") {
    return range ? YearRangePicker : YearPicker;
  }
  if (view.value === "month") {
    return range ? MonthRangePicker : MonthPicker;
  }
  return props.range ? RangeCalendar : SingleCalendar;
});
const omittedProps = ["type", "placeholder", "range", "modelValue", "defaultValue", "color", "variant", "size", "monthControls", "yearControls", "viewControl", "class", "ui"];
const dayOnlyProps = ["pagedNavigation", "weekStartsOn", "weekdayFormat", "fixedWeeks", "numberOfMonths", "isDateDisabled", "isDateUnavailable", "isDateHighlightable", "disableDaysOutsideCurrentView", "maximumDays"];
const monthOnlyProps = ["isMonthDisabled", "isMonthUnavailable"];
const yearOnlyProps = ["isYearDisabled", "isYearUnavailable"];
const rangeOnlyProps = ["allowNonContiguousRanges", "fixedDate"];
const rootProps = useForwardProps(reactiveOmit(
  props,
  (_, key) => omittedProps.includes(key) || view.value !== "day" && dayOnlyProps.includes(key) || view.value !== "month" && monthOnlyProps.includes(key) || view.value !== "year" && yearOnlyProps.includes(key) || !isMinView.value && rangeOnlyProps.includes(key)
));
function cellProps(cellDate, monthValue) {
  if (view.value === "month") {
    return { month: cellDate };
  }
  if (view.value === "year") {
    return { year: cellDate };
  }
  return { day: cellDate, month: monthValue };
}
const nextYearIcon = computed(() => props.nextYearIcon || (dir.value === "rtl" ? appConfig.ui.icons.chevronDoubleLeft : appConfig.ui.icons.chevronDoubleRight));
const nextMonthIcon = computed(() => props.nextMonthIcon || (dir.value === "rtl" ? appConfig.ui.icons.chevronLeft : appConfig.ui.icons.chevronRight));
const prevYearIcon = computed(() => props.prevYearIcon || (dir.value === "rtl" ? appConfig.ui.icons.chevronDoubleRight : appConfig.ui.icons.chevronDoubleLeft));
const prevMonthIcon = computed(() => props.prevMonthIcon || (dir.value === "rtl" ? appConfig.ui.icons.chevronRight : appConfig.ui.icons.chevronLeft));
const prevLabel = computed(() => view.value === "day" ? t("calendar.prevMonth") : t("calendar.prevYear"));
const nextLabel = computed(() => view.value === "day" ? t("calendar.nextMonth") : t("calendar.nextYear"));
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.calendar || {} })({
  color: props.color,
  size: props.size,
  variant: props.variant,
  weekNumbers: props.weekNumbers,
  view: view.value
}));
</script>

<template>
  <Picker.Root
    v-slot="{ weekDays, grid, date }"
    v-bind="rootProps"
    :model-value="isMinView ? props.modelValue : void 0"
    :default-value="isMinView ? props.defaultValue : void 0"
    :placeholder="placeholder"
    data-slot="root"
    :class="ui.root({ class: [props.ui?.root, props.class] })"
    @update:placeholder="setPlaceholder"
    @update:model-value="onSelect"
    @update:start-value="(value) => emits('update:startValue', value)"
    @update:valid-model-value="(value) => emits('update:validModelValue', value)"
  >
    <Picker.Header data-slot="header" :class="ui.header({ class: props.ui?.header })">
      <Picker.Prev v-if="view === 'day' && props.yearControls" :prev-page="(date) => paginateYear(date, -1)" :aria-label="t('calendar.prevYear')" as-child>
        <UButton :icon="prevYearIcon" :size="props.size" color="neutral" variant="ghost" v-bind="props.prevYear" />
      </Picker.Prev>
      <Picker.Prev v-if="view !== 'day' || props.monthControls" :aria-label="prevLabel" as-child>
        <UButton :icon="prevMonthIcon" :size="props.size" color="neutral" variant="ghost" v-bind="props.prevMonth" />
      </Picker.Prev>
      <Picker.Heading v-slot="{ headingValue }" data-slot="heading" :class="ui.heading({ class: props.ui?.heading })">
        <slot
          name="heading"
          :value="headingValue"
          :view="view"
          :date="date"
          :set-view="setView"
          :set-placeholder="setPlaceholder"
        >
          <UButton
            v-if="switchable && props.viewControl"
            :label="headingValue"
            :size="props.size"
            color="neutral"
            variant="ghost"
            block
            v-bind="typeof props.viewControl === 'object' ? props.viewControl : {}"
            @click="cycleView"
          />
          <span v-else data-slot="headingLabel" :class="ui.headingLabel({ class: props.ui?.headingLabel })">{{ headingValue }}</span>
        </slot>
      </Picker.Heading>
      <Picker.Next v-if="view !== 'day' || props.monthControls" :aria-label="nextLabel" as-child>
        <UButton :icon="nextMonthIcon" :size="props.size" color="neutral" variant="ghost" v-bind="props.nextMonth" />
      </Picker.Next>
      <Picker.Next v-if="view === 'day' && props.yearControls" :next-page="(date) => paginateYear(date, 1)" :aria-label="t('calendar.nextYear')" as-child>
        <UButton :icon="nextYearIcon" :size="props.size" color="neutral" variant="ghost" v-bind="props.nextYear" />
      </Picker.Next>
    </Picker.Header>
    <div data-slot="body" :class="ui.body({ class: props.ui?.body })">
      <Picker.Grid
        v-for="month in Array.isArray(grid) ? grid : [grid]"
        :key="month.value.toString()"
        data-slot="grid"
        :class="ui.grid({ class: props.ui?.grid })"
      >
        <Picker.GridHead v-if="'GridHead' in Picker">
          <Picker.GridRow data-slot="gridWeekDaysRow" :class="ui.gridWeekDaysRow({ class: props.ui?.gridWeekDaysRow })">
            <Picker.HeadCell
              v-for="day in weekDays"
              :key="day"
              data-slot="headCell"
              :class="ui.headCell({ class: props.ui?.headCell })"
            >
              <slot name="week-day" :day="day">
                {{ day }}
              </slot>
            </Picker.HeadCell>
          </Picker.GridRow>
        </Picker.GridHead>
        <Picker.GridBody data-slot="gridBody" :class="ui.gridBody({ class: props.ui?.gridBody })">
          <Picker.GridRow
            v-for="(row, index) in month.rows"
            :key="`row-${index}`"
            data-slot="gridRow"
            :class="ui.gridRow({ class: props.ui?.gridRow })"
          >
            <td
              v-if="view === 'day' && props.weekNumbers && row[0]"
              role="gridcell"
              data-slot="cellWeek"
              :class="ui.cellWeek({ class: props.ui?.cellWeek })"
            >
              {{ getWeekNumber(row[0], props.locale ?? locale.code) }}
            </td>
            <Picker.Cell
              v-for="cellDate in row"
              :key="cellDate.toString()"
              :date="cellDate"
              data-slot="cell"
              :class="ui.cell({ class: props.ui?.cell })"
            >
              <Picker.CellTrigger
                v-slot="cell"
                v-bind="cellProps(cellDate, month.value)"
                data-slot="cellTrigger"
                :class="ui.cellTrigger({ class: props.ui?.cellTrigger })"
              >
                <slot v-if="view === 'day'" name="day" :day="cellDate">
                  {{ cellDate.day }}
                </slot>
                <slot v-else-if="view === 'month'" name="month-cell" :month="cellDate" :selected="cell.selected" :disabled="cell.disabled">
                  {{ cell.monthValue }}
                </slot>
                <slot v-else name="year-cell" :year="cellDate" :selected="cell.selected" :disabled="cell.disabled">
                  {{ cell.yearValue }}
                </slot>
              </Picker.CellTrigger>
            </Picker.Cell>
          </Picker.GridRow>
        </Picker.GridBody>
      </Picker.Grid>
    </div>
  </Picker.Root>
</template>
```


## Card.vue

```vue
<script>
import theme from "#build/ui/card";
</script>

<script setup>
import { computed } from "vue";
import { Primitive } from "reka-ui";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { tv } from "../utils/tv";
const _props = defineProps({
  as: { type: null, required: false },
  title: { type: String, required: false },
  description: { type: String, required: false },
  variant: { type: null, required: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false }
});
const slots = defineSlots();
const props = useComponentProps("card", _props);
const appConfig = useAppConfig();
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.card || {} })({
  variant: props.variant
}));
</script>

<template>
  <Primitive :as="props.as" data-slot="root" :class="ui.root({ class: [props.ui?.root, props.class] })">
    <div v-if="!!slots.header || (props.title || !!slots.title) || (props.description || !!slots.description)" data-slot="header" :class="ui.header({ class: props.ui?.header })">
      <slot name="header">
        <div v-if="props.title || !!slots.title" data-slot="title" :class="ui.title({ class: props.ui?.title })">
          <slot name="title">
            {{ props.title }}
          </slot>
        </div>

        <div v-if="props.description || !!slots.description" data-slot="description" :class="ui.description({ class: props.ui?.description })">
          <slot name="description">
            {{ props.description }}
          </slot>
        </div>
      </slot>
    </div>

    <div v-if="!!slots.default" data-slot="body" :class="ui.body({ class: props.ui?.body })">
      <slot />
    </div>

    <div v-if="!!slots.footer" data-slot="footer" :class="ui.footer({ class: props.ui?.footer })">
      <slot name="footer" />
    </div>
  </Primitive>
</template>
```


## Carousel.vue

```vue
<script>
import theme from "#build/ui/carousel";
</script>

<script setup>
import { computed, ref, watch, onMounted, onBeforeUnmount } from "vue";
import useEmblaCarousel from "embla-carousel-vue";
import { Primitive } from "reka-ui";
import { reactivePick } from "@vueuse/core";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { useForwardProps } from "../composables/useForwardProps";
import { useLocale } from "../composables/useLocale";
import { tv } from "../utils/tv";
import UButton from "./Button.vue";
const _props = defineProps({
  as: { type: null, required: false },
  prev: { type: Object, required: false },
  prevIcon: { type: null, required: false },
  next: { type: Object, required: false },
  nextIcon: { type: null, required: false },
  arrows: { type: Boolean, required: false, default: false },
  dots: { type: Boolean, required: false, default: false },
  orientation: { type: null, required: false, default: "horizontal" },
  items: { type: Array, required: false },
  autoplay: { type: [Boolean, Object], required: false, default: false },
  autoScroll: { type: [Boolean, Object], required: false, default: false },
  autoHeight: { type: [Boolean, Object], required: false, default: false },
  classNames: { type: [Boolean, Object], required: false, default: false },
  fade: { type: [Boolean, Object], required: false, default: false },
  wheelGestures: { type: [Boolean, Object], required: false, default: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false },
  align: { type: [String, Function], required: false, default: "center" },
  containScroll: { type: [Boolean, String], required: false, default: "trimSnaps" },
  slidesToScroll: { type: [String, Number], required: false, default: 1 },
  dragFree: { type: Boolean, required: false, default: false },
  dragThreshold: { type: Number, required: false, default: 10 },
  inViewThreshold: { type: null, required: false, default: 0 },
  loop: { type: Boolean, required: false, default: false },
  skipSnaps: { type: Boolean, required: false, default: false },
  duration: { type: Number, required: false, default: 25 },
  startIndex: { type: Number, required: false, default: 0 },
  watchDrag: { type: [Boolean, Function], required: false, default: true },
  watchResize: { type: [Boolean, Function], required: false, default: true },
  watchSlides: { type: [Boolean, Function], required: false, default: true },
  watchFocus: { type: [Boolean, Function], required: false, default: true },
  active: { type: Boolean, required: false, default: true },
  breakpoints: { type: Object, required: false, default: () => ({}) }
});
defineSlots();
const emits = defineEmits(["select"]);
const props = useComponentProps("carousel", _props);
const { dir, t } = useLocale();
const appConfig = useAppConfig();
const rootProps = useForwardProps(reactivePick(props, "active", "align", "breakpoints", "containScroll", "dragFree", "dragThreshold", "duration", "inViewThreshold", "loop", "skipSnaps", "slidesToScroll", "startIndex", "watchDrag", "watchResize", "watchSlides", "watchFocus"));
const prevIcon = computed(() => props.prevIcon || (dir.value === "rtl" ? appConfig.ui.icons.arrowRight : appConfig.ui.icons.arrowLeft));
const nextIcon = computed(() => props.nextIcon || (dir.value === "rtl" ? appConfig.ui.icons.arrowLeft : appConfig.ui.icons.arrowRight));
const stopAutoplayOnInteraction = computed(() => {
  if (typeof props.autoplay === "boolean") {
    return true;
  }
  return props.autoplay?.stopOnInteraction ?? true;
});
const stopAutoScrollOnInteraction = computed(() => {
  if (typeof props.autoScroll === "boolean") {
    return true;
  }
  return props.autoScroll?.stopOnInteraction ?? true;
});
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.carousel || {} })({
  orientation: props.orientation
}));
const options = computed(() => ({
  ...props.fade ? { align: "center", containScroll: false } : {},
  ...rootProps.value,
  axis: props.orientation === "horizontal" ? "x" : "y",
  direction: dir.value === "rtl" ? "rtl" : "ltr"
}));
const plugins = ref([]);
async function loadPlugins() {
  const emblaPlugins = [];
  if (props.autoplay) {
    const AutoplayPlugin = await import("embla-carousel-autoplay").then((r) => r.default);
    emblaPlugins.push(AutoplayPlugin(typeof props.autoplay === "boolean" ? {} : props.autoplay));
  }
  if (props.autoScroll) {
    const AutoScrollPlugin = await import("embla-carousel-auto-scroll").then((r) => r.default);
    emblaPlugins.push(AutoScrollPlugin(typeof props.autoScroll === "boolean" ? {} : props.autoScroll));
  }
  if (props.autoHeight) {
    const AutoHeightPlugin = await import("embla-carousel-auto-height").then((r) => r.default);
    emblaPlugins.push(AutoHeightPlugin(typeof props.autoHeight === "boolean" ? {} : props.autoHeight));
  }
  if (props.classNames) {
    const ClassNamesPlugin = await import("embla-carousel-class-names").then((r) => r.default);
    emblaPlugins.push(ClassNamesPlugin(typeof props.classNames === "boolean" ? {} : props.classNames));
  }
  if (props.fade) {
    const FadePlugin = await import("embla-carousel-fade").then((r) => r.default);
    emblaPlugins.push(FadePlugin(typeof props.fade === "boolean" ? {} : props.fade));
  }
  if (props.wheelGestures) {
    const { WheelGesturesPlugin } = await import("embla-carousel-wheel-gestures");
    emblaPlugins.push(WheelGesturesPlugin(typeof props.wheelGestures === "boolean" ? {} : props.wheelGestures));
  }
  plugins.value = emblaPlugins;
}
watch(() => [props.autoplay, props.autoScroll, props.autoHeight, props.classNames, props.fade, props.wheelGestures], loadPlugins, { immediate: true });
const [emblaRef, emblaApi] = useEmblaCarousel(options, plugins);
watch(options, () => {
  emblaApi.value?.reInit(options.value, plugins.value);
}, { flush: "post" });
function stopOnInteraction() {
  if (stopAutoplayOnInteraction.value) {
    emblaApi.value?.plugins().autoplay?.stop();
  }
  if (stopAutoScrollOnInteraction.value) {
    emblaApi.value?.plugins().autoScroll?.stop();
  }
}
function scrollPrev() {
  emblaApi.value?.scrollPrev();
  stopOnInteraction();
}
function scrollNext() {
  emblaApi.value?.scrollNext();
  stopOnInteraction();
}
function scrollTo(index) {
  emblaApi.value?.scrollTo(index);
}
function onKeyDown(event) {
  let prevKey;
  let nextKey;
  if (props.orientation === "horizontal") {
    prevKey = dir.value === "ltr" ? "ArrowLeft" : "ArrowRight";
    nextKey = dir.value === "ltr" ? "ArrowRight" : "ArrowLeft";
  } else {
    prevKey = "ArrowUp";
    nextKey = "ArrowDown";
  }
  if (event.key === prevKey) {
    event.preventDefault();
    scrollPrev();
    return;
  }
  if (event.key === nextKey) {
    event.preventDefault();
    scrollNext();
  }
}
const canScrollNext = ref(false);
const canScrollPrev = ref(false);
const selectedIndex = ref(0);
const scrollSnaps = ref([]);
function onInit(api) {
  scrollSnaps.value = api?.scrollSnapList() || [];
}
function onSelect(api) {
  canScrollNext.value = api?.canScrollNext() || false;
  canScrollPrev.value = api?.canScrollPrev() || false;
  selectedIndex.value = api?.selectedScrollSnap() || 0;
  emits("select", selectedIndex.value);
}
function isCarouselItem(item) {
  return typeof item === "object" && item !== null;
}
onMounted(() => {
  if (!emblaApi.value) {
    return;
  }
  emblaApi.value.on("init", onInit);
  emblaApi.value.on("init", onSelect);
  emblaApi.value.on("reInit", onInit);
  emblaApi.value.on("reInit", onSelect);
  emblaApi.value.on("select", onSelect);
});
onBeforeUnmount(() => {
  if (!emblaApi.value) {
    return;
  }
  emblaApi.value.off("init", onInit);
  emblaApi.value.off("init", onSelect);
  emblaApi.value.off("reInit", onInit);
  emblaApi.value.off("reInit", onSelect);
  emblaApi.value.off("select", onSelect);
});
defineExpose({
  emblaRef,
  emblaApi
});
</script>

<template>
  <Primitive
    :as="props.as"
    role="region"
    aria-roledescription="carousel"
    :data-orientation="props.orientation"
    tabindex="0"
    data-slot="root"
    :class="ui.root({ class: [props.ui?.root, props.class] })"
    @keydown="onKeyDown"
  >
    <div ref="emblaRef" data-slot="viewport" :class="ui.viewport({ class: props.ui?.viewport })">
      <div data-slot="container" :class="ui.container({ class: props.ui?.container })">
        <div
          v-for="(item, index) in props.items"
          :key="index"
          v-bind="props.dots ? { role: 'tabpanel' } : { 'role': 'group', 'aria-roledescription': 'slide' }"
          data-slot="item"
          :class="ui.item({ class: [props.ui?.item, isCarouselItem(item) && item.ui?.item, isCarouselItem(item) && item.class] })"
        >
          <slot :item="item" :index="index" />
        </div>
      </div>
    </div>

    <div v-if="props.arrows || props.dots" data-slot="controls" :class="ui.controls({ class: props.ui?.controls })">
      <div v-if="props.arrows" data-slot="arrows" :class="ui.arrows({ class: props.ui?.arrows })">
        <UButton
          :disabled="!canScrollPrev"
          :icon="prevIcon"
          color="neutral"
          variant="outline"
          :aria-label="t('carousel.prev')"
          v-bind="typeof props.prev === 'object' ? props.prev : void 0"
          data-slot="prev"
          :class="ui.prev({ class: props.ui?.prev })"
          @click="scrollPrev"
        />
        <UButton
          :disabled="!canScrollNext"
          :icon="nextIcon"
          color="neutral"
          variant="outline"
          :aria-label="t('carousel.next')"
          v-bind="typeof props.next === 'object' ? props.next : void 0"
          data-slot="next"
          :class="ui.next({ class: props.ui?.next })"
          @click="scrollNext"
        />
      </div>

      <div v-if="props.dots" role="tablist" :aria-label="t('carousel.dots')" data-slot="dots" :class="ui.dots({ class: props.ui?.dots })">
        <template v-for="(_, index) in scrollSnaps" :key="index">
          <button
            type="button"
            role="tab"
            :aria-label="t('carousel.goto', { slide: index + 1 })"
            :aria-selected="selectedIndex === index"
            data-slot="dot"
            :class="ui.dot({ class: props.ui?.dot, active: selectedIndex === index })"
            :data-state="selectedIndex === index ? 'active' : void 0"
            @click="scrollTo(index)"
          />
        </template>
      </div>
    </div>
  </Primitive>
</template>
```


## ChangelogVersion.vue

```vue
<script>
import theme from "#build/ui/changelog-version";
</script>

<script setup>
import { computed } from "vue";
import { Primitive, useDateFormatter } from "reka-ui";
import { createReusableTemplate } from "@vueuse/core";
import { useAppConfig } from "#imports";
import { useLocale } from "../composables/useLocale";
import { useComponentProps } from "../composables/useComponentProps";
import { usePrefix } from "../composables/usePrefix";
import ImageComponent from "#build/ui-image-component";
import { getSlotChildrenText } from "../utils";
import { tv } from "../utils/tv";
import ULink from "./Link.vue";
import UBadge from "./Badge.vue";
import UUser from "./User.vue";
defineOptions({ inheritAttrs: false });
const _props = defineProps({
  as: { type: null, required: false, default: "article" },
  title: { type: String, required: false },
  description: { type: String, required: false },
  date: { type: [String, Date], required: false },
  badge: { type: [String, Object], required: false },
  authors: { type: Array, required: false },
  image: { type: [String, Object], required: false },
  indicator: { type: Boolean, required: false, default: true },
  to: { type: null, required: false },
  target: { type: [String, Object, null], required: false },
  onClick: { type: Function, required: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false }
});
const slots = defineSlots();
const props = useComponentProps("changelogVersion", _props);
const { locale } = useLocale();
const appConfig = useAppConfig();
const formatter = useDateFormatter(locale.value.code);
const prefix = usePrefix();
const [DefineLinkTemplate, ReuseLinkTemplate] = createReusableTemplate();
const [DefineDateTemplate, ReuseDateTemplate] = createReusableTemplate({
  props: {
    hidden: {
      type: Boolean,
      default: false
    }
  }
});
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.changelogVersion || {} })({
  to: !!props.to || !!props.onClick
}));
const date = computed(() => {
  if (!props.date) {
    return;
  }
  try {
    return formatter.custom(new Date(props.date), { dateStyle: "medium", timeZone: "UTC" });
  } catch {
    return props.date;
  }
});
const datetime = computed(() => {
  if (!props.date) {
    return;
  }
  try {
    return new Date(props.date)?.toISOString();
  } catch {
    return void 0;
  }
});
const ariaLabel = computed(() => {
  const slotText = slots.title && getSlotChildrenText(slots.title());
  return (slotText || props.title || "Version link").trim();
});
</script>

<template>
  <DefineLinkTemplate>
    <ULink
      v-if="props.to"
      :aria-label="ariaLabel"
      v-bind="{ 'to': props.to, 'target': props.target, ...$attrs, 'data-slot': void 0 }"
      :class="prefix('focus:outline-none peer')"
      raw
    >
      <span :class="prefix('absolute inset-0')" aria-hidden="true" />
    </ULink>
  </DefineLinkTemplate>

  <DefineDateTemplate v-slot="{ hidden }">
    <time v-if="date" :datetime="datetime" data-slot="date" :class="ui.date({ class: props.ui?.date, hidden })">
      <slot name="date">
        {{ date }}
      </slot>
    </time>
  </DefineDateTemplate>

  <Primitive :as="props.as" v-bind="!props.to ? $attrs : {}" :data-slot="$attrs['data-slot'] ?? 'root'" :class="ui.root({ class: [props.ui?.root, props.class] })" @click="props.onClick">
    <div v-if="!!props.indicator || !!slots.indicator" data-slot="indicator" :class="ui.indicator({ class: props.ui?.indicator })">
      <slot name="indicator" :ui="ui">
        <ReuseDateTemplate />

        <div data-slot="dot" :class="ui.dot({ class: props.ui?.dot })">
          <div data-slot="dotInner" :class="ui.dotInner({ class: props.ui?.dotInner })" />
        </div>
      </slot>
    </div>

    <div data-slot="container" :class="ui.container({ class: props.ui?.container })">
      <div v-if="!!slots.header || (date || !!slots.date) || (props.badge || !!slots.badge) || (props.title || !!slots.title) || (props.description || !!slots.description) || (props.image || !!slots.image)" data-slot="header" :class="ui.header({ class: props.ui?.header })">
        <slot name="header">
          <div v-if="date || !!slots.date || (props.badge || !!slots.badge)" data-slot="meta" :class="ui.meta({ class: props.ui?.meta, badge: !!props.badge || !!slots.badge || !props.indicator })">
            <slot name="badge" :ui="ui">
              <UBadge
                v-if="props.badge"
                color="neutral"
                variant="solid"
                v-bind="typeof props.badge === 'string' ? { label: props.badge } : props.badge"
                data-slot="badge"
                :class="ui.badge({ class: props.ui?.badge })"
              />
            </slot>

            <ReuseDateTemplate :hidden="!!props.indicator" />
          </div>

          <h2 v-if="props.title || !!slots.title" data-slot="title" :class="ui.title({ class: props.ui?.title })">
            <ReuseLinkTemplate />

            <slot name="title">
              {{ props.title }}
            </slot>
          </h2>

          <div v-if="props.description || !!slots.description" data-slot="description" :class="ui.description({ class: props.ui?.description })">
            <slot name="description">
              {{ props.description }}
            </slot>
          </div>

          <div v-if="props.image || !!slots.image" data-slot="imageWrapper" :class="ui.imageWrapper({ class: props.ui?.imageWrapper })">
            <slot name="image" :ui="ui">
              <component
                :is="ImageComponent"
                v-if="props.image"
                v-bind="typeof props.image === 'string' ? { src: props.image, alt: props.title } : { alt: props.title, ...props.image }"
                data-slot="image"
                :class="ui.image({ class: props.ui?.image, to: !!props.to })"
              />
            </slot>

            <ReuseLinkTemplate />
          </div>
        </slot>
      </div>

      <slot name="body" />

      <div v-if="!!slots.footer || (props.authors?.length || !!slots.authors) || !!slots.actions" data-slot="footer" :class="ui.footer({ class: props.ui?.footer, body: !!slots.body })">
        <slot name="footer">
          <div v-if="props.authors?.length || !!slots.authors" data-slot="authors" :class="ui.authors({ class: props.ui?.authors })">
            <slot name="authors">
              <UUser
                v-for="(author, index) in props.authors"
                :key="index"
                v-bind="author"
              />
            </slot>
          </div>

          <slot name="actions" />
        </slot>
      </div>
    </div>
  </Primitive>
</template>
```


## ChangelogVersions.vue

```vue
<script>
import theme from "#build/ui/changelog-versions";
</script>

<script setup>
import { computed } from "vue";
import { Primitive } from "reka-ui";
import { Motion, useScroll, useSpring, useTransform } from "motion-v";
import { defu } from "defu";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { omit } from "../utils";
import { tv } from "../utils/tv";
import UChangelogVersion from "./ChangelogVersion.vue";
const _props = defineProps({
  as: { type: null, required: false },
  versions: { type: Array, required: false },
  indicator: { type: [Boolean, Object], required: false, default: true },
  indicatorMotion: { type: [Boolean, Object], required: false, default: true },
  class: { type: null, required: false },
  ui: { type: Object, required: false }
});
const slots = defineSlots();
const props = useComponentProps("changelogVersions", _props);
const getProxySlots = () => omit(slots, ["default", "indicator"]);
const appConfig = useAppConfig();
const springOptions = computed(() => defu(typeof props.indicatorMotion === "object" ? props.indicatorMotion : {}, { damping: 30, restDelta: 1e-3 }));
const scrollOptions = computed(() => typeof props.indicator === "object" ? props.indicator : {});
const { scrollYProgress } = useScroll(scrollOptions.value);
const y = useSpring(scrollYProgress, springOptions);
const height = useTransform(() => `${Number(y.get()) * 100}%`);
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.changelogVersions || {} })());
</script>

<template>
  <Primitive :as="props.as" data-slot="root" :class="ui.root({ class: [props.ui?.root, props.class] })">
    <div v-if="!!props.indicator || !!slots.indicator" data-slot="indicator" :class="ui.indicator({ class: props.ui?.indicator })">
      <slot name="indicator">
        <Motion v-if="!!props.indicatorMotion" data-slot="beam" :class="ui.beam({ class: props.ui?.beam })" :style="{ height }" />
      </slot>
    </div>

    <div v-if="props.versions?.length || !!slots.default" data-slot="container" :class="ui.container({ class: props.ui?.container })">
      <slot>
        <UChangelogVersion
          v-for="(version, index) in props.versions"
          :key="index"
          :indicator="!!props.indicator"
          v-bind="version"
        >
          <template v-for="(_, name) in getProxySlots()" #[name]="slotData">
            <slot :name="name" v-bind="slotData" :version="version" />
          </template>
        </UChangelogVersion>
      </slot>
    </div>
  </Primitive>
</template>
```


## ChatMessage.vue

```vue
<script>
import theme from "#build/ui/chat-message";
</script>

<script setup>
import { computed } from "vue";
import { Primitive } from "reka-ui";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { omit } from "../utils";
import { tv } from "../utils/tv";
import UButton from "./Button.vue";
import UTooltip from "./Tooltip.vue";
import UAvatar from "./Avatar.vue";
import UIcon from "./Icon.vue";
const _props = defineProps({
  as: { type: null, required: false, default: "article" },
  icon: { type: null, required: false },
  avatar: { type: Object, required: false },
  variant: { type: null, required: false },
  color: { type: null, required: false },
  side: { type: null, required: false },
  actions: { type: Array, required: false },
  compact: { type: Boolean, required: false },
  content: { type: String, required: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false },
  id: { type: String, required: true },
  role: { type: String, required: true },
  metadata: { type: null, required: false },
  parts: { type: Array, required: true }
});
const slots = defineSlots();
const props = useComponentProps("chatMessage", _props);
const appConfig = useAppConfig();
const fileParts = computed(() => props.parts?.filter((part) => part.type === "file") ?? []);
const textParts = computed(() => props.parts?.filter((part) => part.type === "text") ?? []);
const messageProps = computed(() => omit(props, ["as", "icon", "avatar", "variant", "color", "side", "actions", "compact", "class", "ui", "content"]));
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.chatMessage || {} })({
  variant: props.variant,
  color: props.color,
  side: props.side,
  leading: !!props.icon || !!props.avatar || !!slots.leading,
  actions: !!props.actions || !!slots.actions,
  compact: props.compact
}));
</script>

<template>
  <Primitive :as="props.as" :data-role="props.role" data-slot="root" :class="ui.root({ class: [props.ui?.root, props.class] })">
    <div v-if="!!slots.files && fileParts.length || !!slots.header" data-slot="header" :class="ui.header({ class: props.ui?.header })">
      <slot name="header" v-bind="{ ...messageProps }">
        <div v-if="!!slots.files && fileParts.length" data-slot="files" :class="ui.files({ class: props.ui?.files })">
          <slot name="files" v-bind="{ ...messageProps, parts: fileParts }" />
        </div>
      </slot>
    </div>

    <div data-slot="container" :class="ui.container({ class: props.ui?.container })">
      <div v-if="props.icon || props.avatar || !!slots.leading" data-slot="leading" :class="ui.leading({ class: props.ui?.leading })">
        <slot name="leading" v-bind="{ ...messageProps, avatar: props.avatar, ui }">
          <UIcon v-if="props.icon" :name="props.icon" data-slot="leadingIcon" :class="ui.leadingIcon({ class: props.ui?.leadingIcon })" />
          <UAvatar v-else-if="props.avatar" :size="props.ui?.leadingAvatarSize || ui.leadingAvatarSize()" v-bind="props.avatar" data-slot="leadingAvatar" :class="ui.leadingAvatar({ class: props.ui?.leadingAvatar })" />
        </slot>
      </div>

      <div v-if="props.content || textParts.length || !!slots.content || props.actions || !!slots.actions || !!slots.body" data-slot="body" :class="ui.body({ class: props.ui?.body })">
        <slot name="body" v-bind="{ ...messageProps }">
          <div v-if="props.content || textParts.length || !!slots.content" data-slot="content" :class="ui.content({ class: props.ui?.content })">
            <slot name="content" v-bind="{ ...messageProps, content: props.content }">
              <template v-if="props.content">
                {{ props.content }}
              </template>
              <template v-else>
                <template v-for="(part, index) in textParts" :key="`${props.id}-${part.type}-${index}`">
                  {{ part.text }}
                </template>
              </template>
            </slot>
          </div>

          <div v-if="props.actions || !!slots.actions" data-slot="actions" :class="ui.actions({ class: props.ui?.actions })">
            <slot name="actions" v-bind="{ ...messageProps, actions: props.actions }">
              <UTooltip v-for="(action, index) in props.actions" :key="index" :text="action.label">
                <UButton
                  size="sm"
                  color="neutral"
                  variant="ghost"
                  v-bind="omit(action, ['onClick'])"
                  :label="undefined"
                  @click="typeof action.onClick === 'function' ? action.onClick($event, messageProps) : void 0"
                />
              </UTooltip>
            </slot>
          </div>
        </slot>
      </div>
    </div>
  </Primitive>
</template>
```


## ChatMessages.vue

```vue
<script>
import theme from "#build/ui/chat-messages";
</script>

<script setup>
import { ref, computed, watch, nextTick, toRef, onMounted } from "vue";
import { Presence } from "reka-ui";
import { defu } from "defu";
import { useElementBounding, useEventListener, useMutationObserver, watchThrottled } from "@vueuse/core";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { omit } from "../utils";
import { tv } from "../utils/tv";
import UChatMessage from "./ChatMessage.vue";
import UButton from "./Button.vue";
const _props = defineProps({
  messages: { type: null, required: false },
  status: { type: String, required: false },
  shouldAutoScroll: { type: Boolean, required: false, default: false },
  shouldScrollToBottom: { type: Boolean, required: false, default: true },
  autoScroll: { type: [Boolean, Object], required: false, default: true },
  autoScrollIcon: { type: null, required: false },
  user: { type: Object, required: false },
  assistant: { type: Object, required: false },
  compact: { type: Boolean, required: false },
  spacingOffset: { type: Number, required: false, default: 0 },
  class: { type: null, required: false },
  ui: { type: Object, required: false }
});
const slots = defineSlots();
const props = useComponentProps("chatMessages", _props);
const getProxySlots = () => omit(slots, ["default", "indicator", "viewport"]);
function showIndicator() {
  if (props.status === "submitted") return true;
  if (props.status !== "streaming") return false;
  const lastMessage = props.messages?.[props.messages.length - 1];
  return lastMessage?.role === "assistant" && !lastMessage.parts?.length;
}
const appConfig = useAppConfig();
const userProps = toRef(() => defu(props.user, { side: "right", variant: "soft" }));
const assistantProps = toRef(() => defu(props.assistant, { side: "left", variant: "naked" }));
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.chatMessages || {} })({
  compact: props.compact
}));
const el = ref(null);
const parent = ref(null);
const messagesRefs = ref(/* @__PURE__ */ new Map());
const showAutoScroll = ref(false);
const lastMessageHeight = ref(0);
const lastMessageSubmitted = ref(false);
const lastScrollTop = ref(0);
const userScrolledUp = ref(false);
function registerMessageRef(id, element) {
  const elInstance = element?.$el;
  if (elInstance) {
    messagesRefs.value.set(id, elInstance);
  }
}
function scrollToMessage(id) {
  const element = messagesRefs.value.get(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
function scrollToBottom(smooth = true) {
  if (!parent.value) {
    return;
  }
  if (smooth) {
    parent.value.scrollTo({ top: parent.value.scrollHeight, behavior: "smooth" });
  } else {
    parent.value.scrollTop = parent.value.scrollHeight;
  }
}
watchThrottled([() => props.messages, () => props.status], ([_, status]) => {
  if (!props.messages?.length) {
    showAutoScroll.value = false;
    userScrolledUp.value = false;
    lastScrollTop.value = 0;
    messagesRefs.value.clear();
    return;
  }
  if (status !== "streaming") {
    return;
  }
  checkScrollPosition();
}, { deep: true, throttle: 50, leading: true });
watch(() => props.status, (status) => {
  if (status !== "submitted") {
    return;
  }
  const lastMessage = props.messages?.[props.messages.length - 1];
  if (!lastMessage || lastMessage.role !== "user") {
    return;
  }
  userScrolledUp.value = false;
  nextTick(() => {
    lastMessageSubmitted.value = true;
    updateLastMessageHeight();
    nextTick(() => {
      scrollToMessage(lastMessage.id);
    });
  });
});
function checkScrollPosition() {
  if (!parent.value) {
    return;
  }
  const scrollPosition = parent.value.scrollTop + parent.value.clientHeight;
  const scrollHeight = parent.value.scrollHeight;
  const threshold = 100;
  showAutoScroll.value = scrollHeight - scrollPosition >= threshold;
  if (parent.value.scrollTop < lastScrollTop.value) {
    userScrolledUp.value = true;
  } else if (scrollHeight - scrollPosition < threshold) {
    userScrolledUp.value = false;
  }
  lastScrollTop.value = parent.value.scrollTop;
}
function onAutoScrollClick() {
  userScrolledUp.value = false;
  scrollToBottom();
}
function getScrollParent(node) {
  if (!node) {
    return document.documentElement;
  }
  const overflowRegex = /auto|scroll/;
  let current = node;
  while (current && current !== document.body && current !== document.documentElement) {
    const style = window.getComputedStyle(current);
    if (overflowRegex.test(style.overflowY)) {
      return current;
    }
    current = current.parentElement;
  }
  return document.documentElement;
}
function updateLastMessageHeight() {
  if (!el.value || !parent.value || !props.messages?.length || !lastMessageSubmitted.value) {
    return;
  }
  const { height: parentHeight } = useElementBounding(parent.value);
  const lastMessage = props.messages.findLast((m) => m.role === "user");
  if (!lastMessage) {
    return;
  }
  const lastMessageEl = messagesRefs.value.get(lastMessage.id);
  if (!lastMessageEl) {
    return;
  }
  let spacingOffset = props.spacingOffset || 0;
  const elComputedStyle = window.getComputedStyle(el.value);
  const parentComputedStyle = window.getComputedStyle(parent.value);
  spacingOffset += Number.parseFloat(elComputedStyle.rowGap) || Number.parseFloat(elComputedStyle.gap) || 0;
  spacingOffset += Number.parseFloat(parentComputedStyle.paddingTop) || 0;
  spacingOffset += Number.parseFloat(parentComputedStyle.paddingBottom) || 0;
  lastMessageHeight.value = Math.max(parentHeight.value - lastMessageEl.offsetHeight - spacingOffset, 0);
}
onMounted(() => {
  parent.value = getScrollParent(el.value);
  if (!parent.value) {
    return;
  }
  lastScrollTop.value = parent.value.scrollTop;
  if (props.shouldScrollToBottom) {
    scrollToBottom(false);
    setTimeout(() => {
      scrollToBottom(false);
    }, 100);
  } else {
    nextTick(() => {
      checkScrollPosition();
    });
  }
  useEventListener(parent, "scroll", checkScrollPosition);
  useEventListener(window, "resize", () => nextTick(updateLastMessageHeight));
  if (el.value) {
    useMutationObserver(el, () => {
      if (props.shouldAutoScroll && props.status === "streaming" && !userScrolledUp.value) {
        scrollToBottom(false);
      }
    }, { childList: true, subtree: true });
  }
});
defineExpose({
  registerMessageRef
});
</script>

<template>
  <div
    ref="el"
    :data-status="props.status"
    data-slot="root"
    :class="ui.root({ class: [props.ui?.root, props.class] })"
    :style="{ '--last-message-height': `${lastMessageHeight}px` }"
  >
    <slot :register-message-ref="registerMessageRef">
      <template v-for="message in props.messages" :key="message.id">
        <UChatMessage
          v-if="message.parts?.length"
          v-bind="{ ...message.role === 'user' ? userProps : assistantProps, ...message }"
          :ref="(el) => registerMessageRef(message.id, el)"
          :compact="props.compact"
        >
          <template v-for="(_, name) in getProxySlots()" #[name]="slotData">
            <slot :name="name" v-bind="{ ...slotData, message }" />
          </template>
        </UChatMessage>
      </template>
    </slot>

    <UChatMessage
      v-if="showIndicator()"
      id="indicator"
      role="assistant"
      v-bind="{ ...assistantProps, actions: void 0, parts: [] }"
      :compact="props.compact"
    >
      <template #content>
        <slot name="indicator" :ui="ui">
          <div data-slot="indicator" :class="ui.indicator({ class: props.ui?.indicator })">
            <span />
            <span />
            <span />
          </div>
        </slot>
      </template>
    </UChatMessage>

    <Presence :present="showAutoScroll">
      <div :data-state="showAutoScroll ? 'open' : 'closed'" data-slot="viewport" :class="ui.viewport({ class: props.ui?.viewport })">
        <slot name="viewport" :ui="ui" :on-click="onAutoScrollClick">
          <UButton
            v-if="props.autoScroll"
            :icon="props.autoScrollIcon || appConfig.ui.icons.arrowDown"
            color="neutral"
            variant="outline"
            v-bind="typeof props.autoScroll === 'object' ? props.autoScroll : {}"
            data-slot="autoScroll"
            :class="ui.autoScroll({ class: props.ui?.autoScroll })"
            @click="onAutoScrollClick"
          />
        </slot>
      </div>
    </Presence>
  </div>
</template>
```


## ChatPalette.vue

```vue
<script>
import theme from "#build/ui/chat-palette";
</script>

<script setup>
import { computed } from "vue";
import { Primitive, Slot } from "reka-ui";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { tv } from "../utils/tv";
const _props = defineProps({
  as: { type: null, required: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false }
});
const slots = defineSlots();
const props = useComponentProps("chatPalette", _props);
const appConfig = useAppConfig();
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.chatPalette || {} })());
</script>

<template>
  <Primitive :as="props.as" data-slot="root" :class="ui.root({ class: [props.ui?.root, props.class] })">
    <div data-slot="content" :class="ui.content({ class: props.ui?.content })">
      <Slot compact>
        <slot />
      </Slot>
    </div>

    <Slot v-if="!!slots.prompt" data-slot="prompt" :class="ui.prompt({ class: props.ui?.prompt })">
      <slot name="prompt" />
    </Slot>
  </Primitive>
</template>
```


## ChatPrompt.vue

```vue
<script>
import theme from "#build/ui/chat-prompt";
</script>

<script setup>
import { computed, toRef, useTemplateRef } from "vue";
import { Primitive } from "reka-ui";
import { reactivePick } from "@vueuse/core";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { useForwardProps } from "../composables/useForwardProps";
import { useIMEGuard } from "../composables/useIMEGuard";
import { useLocale } from "../composables/useLocale";
import { omit, transformUI } from "../utils";
import { tv } from "../utils/tv";
import UTextarea from "./Textarea.vue";
defineOptions({ inheritAttrs: false });
const _props = defineProps({
  as: { type: null, required: false, default: "form" },
  placeholder: { type: String, required: false },
  color: { type: null, required: false },
  variant: { type: null, required: false },
  submitOnEnter: { type: Boolean, required: false, default: true },
  error: { type: Error, required: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false },
  rows: { type: Number, required: false, default: 1 },
  autofocus: { type: Boolean, required: false, default: true },
  autofocusDelay: { type: Number, required: false },
  autoresize: { type: Boolean, required: false, default: true },
  autoresizeDelay: { type: Number, required: false },
  maxrows: { type: Number, required: false },
  icon: { type: null, required: false },
  avatar: { type: Object, required: false },
  loading: { type: Boolean, required: false },
  loadingIcon: { type: null, required: false },
  disabled: { type: Boolean, required: false }
});
const emits = defineEmits(["submit", "close"]);
const slots = defineSlots();
const props = useComponentProps("chatPrompt", _props);
const model = defineModel({ type: String, ...{ default: "" } });
const { t } = useLocale();
const appConfig = useAppConfig();
const textareaProps = useForwardProps(reactivePick(props, "rows", "autofocus", "autofocusDelay", "autoresize", "autoresizeDelay", "maxrows", "icon", "avatar", "loading", "loadingIcon"));
const getProxySlots = () => omit(slots, ["header", "footer", "body"]);
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.chatPrompt || {} })({
  color: props.color,
  variant: props.variant
}));
const textareaRef = useTemplateRef("textareaRef");
function submit(e) {
  if (model.value.trim() === "") {
    return;
  }
  emits("submit", e ?? new Event("submit"));
}
function blur(e) {
  textareaRef.value?.textareaRef?.blur();
  emits("close", e ?? new Event("close"));
}
const { onKeydown: onEnter, onCompositionEnd } = useIMEGuard((event) => {
  submit(event);
});
function handleEnter(event) {
  if (props.submitOnEnter) {
    if (event.shiftKey || event.ctrlKey || event.metaKey || event.altKey) return;
  } else {
    if (!event.ctrlKey && !event.metaKey) return;
  }
  onEnter(event);
}
function onKeydown(event) {
  if (event.key === "Enter") {
    handleEnter(event);
  } else if (event.key === "Escape") {
    blur(event);
  }
}
defineExpose({
  textareaRef: toRef(() => textareaRef.value?.textareaRef)
});
</script>

<template>
  <Primitive :as="props.as" :data-slot="$attrs['data-slot'] ?? 'root'" :class="ui.root({ class: [props.ui?.root, props.class] })" @submit.prevent="submit">
    <div v-if="!!slots.header" data-slot="header" :class="ui.header({ class: props.ui?.header })">
      <slot name="header" />
    </div>

    <slot
      name="body"
      :submit="submit"
      :close="blur"
      :placeholder="props.placeholder ?? t('chatPrompt.placeholder')"
      :disabled="Boolean(props.error) || props.disabled"
      :ui="ui"
    >
      <UTextarea
        ref="textareaRef"
        v-model="model"
        :placeholder="props.placeholder ?? t('chatPrompt.placeholder')"
        :disabled="Boolean(props.error) || props.disabled"
        variant="none"
        fixed
        v-bind="{ ...textareaProps, ...$attrs }"
        :ui="transformUI(omit(ui, ['root', 'body', 'header', 'footer']), props.ui)"
        data-slot="body"
        :class="ui.body({ class: props.ui?.body })"
        @keydown="onKeydown"
        @compositionend="onCompositionEnd"
      >
        <template v-for="(_, name) in getProxySlots()" #[name]="slotData">
          <slot :name="name" v-bind="slotData" />
        </template>
      </UTextarea>
    </slot>

    <div v-if="!!slots.footer" data-slot="footer" :class="ui.footer({ class: props.ui?.footer })">
      <slot name="footer" />
    </div>
  </Primitive>
</template>
```


## ChatPromptSubmit.vue

```vue
<script>
import theme from "#build/ui/chat-prompt-submit";
</script>

<script setup>
import { computed } from "vue";
import { reactiveOmit } from "@vueuse/core";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { useForwardProps } from "../composables/useForwardProps";
import { useLocale } from "../composables/useLocale";
import { transformUI } from "../utils";
import { tv } from "../utils/tv";
import UButton from "./Button.vue";
defineOptions({ inheritAttrs: false });
const _props = defineProps({
  status: { type: String, required: false, default: "ready" },
  icon: { type: [String, Boolean], required: false, skipCheck: true },
  color: { type: null, required: false },
  variant: { type: null, required: false },
  streamingIcon: { type: null, required: false },
  streamingColor: { type: null, required: false, default: "neutral" },
  streamingVariant: { type: null, required: false, default: "subtle" },
  submittedIcon: { type: null, required: false },
  submittedColor: { type: null, required: false, default: "neutral" },
  submittedVariant: { type: null, required: false, default: "subtle" },
  errorIcon: { type: null, required: false },
  errorColor: { type: null, required: false, default: "error" },
  errorVariant: { type: null, required: false, default: "soft" },
  ui: { type: Object, required: false },
  class: { type: null, required: false },
  label: { type: String, required: false },
  activeColor: { type: null, required: false },
  activeVariant: { type: null, required: false },
  size: { type: null, required: false },
  square: { type: Boolean, required: false },
  block: { type: Boolean, required: false },
  loadingAuto: { type: Boolean, required: false },
  onClick: { type: [Function, Array], required: false },
  avatar: { type: Object, required: false },
  leading: { type: Boolean, required: false },
  leadingIcon: { type: null, required: false },
  trailing: { type: Boolean, required: false },
  trailingIcon: { type: null, required: false },
  loading: { type: Boolean, required: false },
  loadingIcon: { type: null, required: false },
  as: { type: null, required: false },
  type: { type: null, required: false },
  disabled: { type: Boolean, required: false },
  exactActiveClass: { type: String, required: false },
  viewTransition: { type: Boolean, required: false }
});
const emits = defineEmits(["stop", "reload"]);
const slots = defineSlots();
const props = useComponentProps("chatPromptSubmit", _props);
const { t } = useLocale();
const appConfig = useAppConfig();
const buttonProps = useForwardProps(reactiveOmit(props, "icon", "color", "variant", "status", "disabled", "streamingIcon", "streamingColor", "streamingVariant", "submittedIcon", "submittedColor", "submittedVariant", "errorIcon", "errorColor", "errorVariant", "class", "ui"));
const disabled = computed(() => props.status === "ready" ? props.disabled : false);
const statusButtonProps = computed(() => ({
  ready: {
    icon: props.icon === false ? void 0 : props.icon ?? appConfig.ui.icons.arrowUp,
    color: props.color,
    variant: props.variant,
    type: "submit"
  },
  submitted: {
    icon: props.submittedIcon || appConfig.ui.icons.stop,
    color: props.submittedColor,
    variant: props.submittedVariant,
    onClick(e) {
      emits("stop", e);
    }
  },
  streaming: {
    icon: props.streamingIcon || appConfig.ui.icons.stop,
    color: props.streamingColor,
    variant: props.streamingVariant,
    onClick(e) {
      emits("stop", e);
    }
  },
  error: {
    icon: props.errorIcon || appConfig.ui.icons.reload,
    color: props.errorColor,
    variant: props.errorVariant,
    onClick(e) {
      emits("reload", e);
    }
  }
})[props.status]);
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.chatPromptSubmit || {} })());
</script>

<template>
  <UButton
    v-bind="{
  ...buttonProps,
  ...statusButtonProps,
  disabled,
  'aria-label': t('chatPromptSubmit.label'),
  ...$attrs
}"
    :class="ui.base({ class: [props.ui?.base, props.class] })"
    :ui="transformUI(ui, props.ui)"
  >
    <template v-for="(_, name) in slots" #[name]="slotData">
      <slot :name="name" v-bind="slotData" />
    </template>
  </UButton>
</template>
```


## ChatReasoning.vue

```vue
<script>
import theme from "#build/ui/chat-reasoning";
</script>

<script setup>
import { ref, computed, watch, onUnmounted, nextTick, useTemplateRef } from "vue";
import { CollapsibleRoot, CollapsibleTrigger, CollapsibleContent } from "reka-ui";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { useLocale } from "../composables/useLocale";
import { useScrollShadow } from "../composables/useScrollShadow";
import { tv } from "../utils/tv";
import UIcon from "./Icon.vue";
import UChatShimmer from "./ChatShimmer.vue";
const _props = defineProps({
  text: { type: String, required: false },
  streaming: { type: Boolean, required: false, default: false },
  duration: { type: Number, required: false },
  icon: { type: null, required: false },
  chevron: { type: String, required: false, default: "trailing" },
  chevronIcon: { type: null, required: false },
  autoCloseDelay: { type: Number, required: false, default: 500 },
  shimmer: { type: Object, required: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false },
  defaultOpen: { type: Boolean, required: false },
  open: { type: Boolean, required: false, default: void 0 },
  disabled: { type: Boolean, required: false },
  unmountOnHide: { type: Boolean, required: false, default: false }
});
const emits = defineEmits(["update:open"]);
defineSlots();
const props = useComponentProps("chatReasoning", _props);
const { t, code } = useLocale();
const appConfig = useAppConfig();
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.chatReasoning || {} })({
  chevron: props.chevron
}));
const isControlled = computed(() => props.open !== void 0);
const internalOpen = ref(props.defaultOpen ?? props.streaming);
const startTime = ref(props.streaming ? Date.now() : null);
const internalDuration = ref(void 0);
const autoCloseTimeout = ref(null);
watch(() => props.streaming, (streaming, wasStreaming) => {
  if (streaming) {
    if (autoCloseTimeout.value) {
      clearTimeout(autoCloseTimeout.value);
      autoCloseTimeout.value = null;
    }
    if (!wasStreaming) {
      setOpen(true);
      startTime.value = Date.now();
    }
  } else if (wasStreaming) {
    if (startTime.value !== null) {
      internalDuration.value = Math.ceil((Date.now() - startTime.value) / 1e3);
      startTime.value = null;
    }
    if (props.autoCloseDelay > 0) {
      autoCloseTimeout.value = setTimeout(() => {
        setOpen(false);
      }, props.autoCloseDelay);
    }
  }
}, { immediate: true });
const actualDuration = computed(() => props.duration ?? internalDuration.value);
const thinkingText = computed(() => {
  if (props.streaming || actualDuration.value === 0) {
    return t("chatReasoning.thinking");
  }
  if (actualDuration.value === void 0) {
    return t("chatReasoning.thought");
  }
  const d = actualDuration.value;
  const unit = d < 60 ? "second" : "minute";
  const value = d < 60 ? d : Math.floor(d / 60);
  const duration = new Intl.NumberFormat(code.value, { style: "unit", unit, unitDisplay: "long" }).format(value);
  return t("chatReasoning.thoughtFor", { duration });
});
const resolvedOpen = computed(() => isControlled.value ? props.open : internalOpen.value);
function setOpen(value) {
  if (autoCloseTimeout.value) {
    clearTimeout(autoCloseTimeout.value);
    autoCloseTimeout.value = null;
  }
  internalOpen.value = value;
  emits("update:open", value);
}
onUnmounted(() => {
  if (autoCloseTimeout.value) {
    clearTimeout(autoCloseTimeout.value);
  }
});
const hasContent = computed(() => !!props.text || props.streaming);
const chevronIconName = computed(() => props.chevronIcon || appConfig.ui.icons?.chevronDown);
const bodyRef = useTemplateRef("bodyRef");
const { style: scrollShadowStyle } = useScrollShadow(bodyRef);
watch(() => props.text, () => {
  if (!props.streaming || !bodyRef.value) return;
  const el = bodyRef.value;
  const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
  if (distanceFromBottom < 50) {
    nextTick(() => {
      el.scrollTop = el.scrollHeight;
    });
  }
});
</script>

<template>
  <CollapsibleRoot
    v-if="hasContent"
    v-slot="{ open: isOpen }"
    :open="resolvedOpen"
    :disabled="props.disabled"
    :unmount-on-hide="props.unmountOnHide"
    data-slot="root"
    :class="ui.root({ class: [props.ui?.root, props.class] })"
    @update:open="setOpen"
  >
    <CollapsibleTrigger as-child :disabled="!hasContent">
      <button
        type="button"
        data-slot="trigger"
        :class="ui.trigger({ class: props.ui?.trigger })"
      >
        <span v-if="props.icon || hasContent && props.chevron === 'leading'" data-slot="leading" :class="ui.leading({ class: props.ui?.leading })">
          <UIcon
            v-if="props.icon"
            :name="props.icon"
            data-slot="leadingIcon"
            :class="ui.leadingIcon({ class: props.ui?.leadingIcon, alone: !(hasContent && props.chevron === 'leading') })"
          />
          <UIcon
            v-if="hasContent && props.chevron === 'leading'"
            :name="chevronIconName"
            data-slot="chevronIcon"
            :class="ui.chevronIcon({ class: props.ui?.chevronIcon, alone: !props.icon })"
          />
        </span>

        <UChatShimmer v-if="props.streaming" :text="thinkingText" v-bind="props.shimmer" data-slot="label" :class="ui.label({ class: props.ui?.label })" />
        <span v-else data-slot="label" :class="ui.label({ class: props.ui?.label })">{{ thinkingText }}</span>

        <UIcon
          v-if="hasContent && props.chevron === 'trailing'"
          :name="chevronIconName"
          data-slot="trailingIcon"
          :class="ui.trailingIcon({ class: props.ui?.trailingIcon })"
        />
      </button>
    </CollapsibleTrigger>

    <CollapsibleContent data-slot="content" :class="ui.content({ class: props.ui?.content })">
      <div ref="bodyRef" data-slot="body" :class="ui.body({ class: props.ui?.body })" :style="scrollShadowStyle">
        <slot :open="isOpen">
          {{ props.text }}
        </slot>
      </div>
    </CollapsibleContent>
  </CollapsibleRoot>
</template>
```


## ChatShimmer.vue

```vue
<script>
import theme from "#build/ui/chat-shimmer";
</script>

<script setup>
import { computed } from "vue";
import { Primitive } from "reka-ui";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { tv } from "../utils/tv";
const _props = defineProps({
  as: { type: null, required: false, default: "span" },
  text: { type: String, required: true },
  duration: { type: Number, required: false, default: 2 },
  spread: { type: Number, required: false, default: 2 },
  class: { type: null, required: false },
  ui: { type: Object, required: false }
});
const props = useComponentProps("chatShimmer", _props);
const appConfig = useAppConfig();
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.chatShimmer || {} }));
const spread = computed(() => props.text.length * props.spread);
</script>

<template>
  <Primitive
    :as="props.as"
    :style="{
  '--spread': `${spread}px`,
  '--duration': `${props.duration}s`
}"
    data-slot="base"
    :class="ui({ class: [props.ui?.base, props.class] })"
  >
    {{ props.text }}
  </Primitive>
</template>
```


## ChatTool.vue

```vue
<script>
import theme from "#build/ui/chat-tool";
</script>

<script setup>
import { ref, computed, watch } from "vue";
import { CollapsibleRoot, CollapsibleTrigger, CollapsibleContent } from "reka-ui";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { tv } from "../utils/tv";
import UButton from "./Button.vue";
import UIcon from "./Icon.vue";
import UChatShimmer from "./ChatShimmer.vue";
const _props = defineProps({
  text: { type: String, required: false },
  suffix: { type: String, required: false },
  icon: { type: null, required: false },
  loading: { type: Boolean, required: false, default: false },
  loadingIcon: { type: null, required: false },
  streaming: { type: Boolean, required: false, default: false },
  variant: { type: null, required: false, default: "inline" },
  chevron: { type: String, required: false, default: "trailing" },
  chevronIcon: { type: null, required: false },
  shimmer: { type: Object, required: false },
  actions: { type: Array, required: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false },
  defaultOpen: { type: Boolean, required: false },
  open: { type: Boolean, required: false, default: void 0 },
  disabled: { type: Boolean, required: false },
  unmountOnHide: { type: Boolean, required: false, default: false }
});
const emits = defineEmits(["update:open"]);
const slots = defineSlots();
const props = useComponentProps("chatTool", _props);
const appConfig = useAppConfig();
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.chatTool || {} })({
  variant: props.variant,
  chevron: props.chevron,
  loading: props.loading
}));
const isControlled = computed(() => props.open !== void 0);
const internalOpen = ref(props.defaultOpen ?? false);
const resolvedOpen = computed(() => isControlled.value ? props.open : internalOpen.value);
function setOpen(value) {
  internalOpen.value = value;
  emits("update:open", value);
}
const hasContent = computed(() => !!slots.default);
watch(() => !!props.actions?.length, (hasActions) => {
  if (hasActions && hasContent.value && props.open === void 0 && props.defaultOpen === void 0) {
    internalOpen.value = true;
  }
}, { immediate: true });
const resolvedLoadingIcon = computed(() => props.loadingIcon || appConfig.ui.icons?.loading);
const resolvedIcon = computed(() => props.loading ? resolvedLoadingIcon.value : props.icon);
const chevronIconName = computed(() => props.chevronIcon || appConfig.ui.icons?.chevronDown);
</script>

<template>
  <CollapsibleRoot
    v-slot="{ open: isOpen }"
    :open="resolvedOpen"
    :disabled="props.disabled"
    :unmount-on-hide="props.unmountOnHide"
    data-slot="root"
    :class="ui.root({ class: [props.ui?.root, props.class] })"
    @update:open="setOpen"
  >
    <CollapsibleTrigger as-child :disabled="!hasContent">
      <button
        type="button"
        data-slot="trigger"
        :class="ui.trigger({ class: props.ui?.trigger })"
      >
        <span v-if="resolvedIcon || hasContent && props.chevron === 'leading'" data-slot="leading" :class="ui.leading({ class: props.ui?.leading })">
          <UIcon
            v-if="resolvedIcon"
            :name="resolvedIcon"
            data-slot="leadingIcon"
            :class="ui.leadingIcon({ class: props.ui?.leadingIcon, alone: !(hasContent && props.chevron === 'leading') })"
          />
          <UIcon
            v-if="hasContent && props.chevron === 'leading'"
            :name="chevronIconName"
            data-slot="chevronIcon"
            :class="ui.chevronIcon({ class: props.ui?.chevronIcon, alone: !resolvedIcon })"
          />
        </span>

        <span data-slot="label" :class="ui.label({ class: props.ui?.label })">
          <UChatShimmer v-if="props.streaming && props.text" :text="props.text" v-bind="props.shimmer" />
          <template v-else>{{ props.text }}</template>
          <span v-if="props.suffix" data-slot="suffix" :class="ui.suffix({ class: props.ui?.suffix })">{{ props.suffix }}</span>
        </span>

        <UIcon
          v-if="hasContent && props.chevron === 'trailing'"
          :name="chevronIconName"
          data-slot="trailingIcon"
          :class="ui.trailingIcon({ class: props.ui?.trailingIcon })"
        />
      </button>
    </CollapsibleTrigger>

    <CollapsibleContent data-slot="content" :class="ui.content({ class: props.ui?.content })">
      <div data-slot="body" :class="ui.body({ class: props.ui?.body })">
        <slot :open="isOpen" />
      </div>
    </CollapsibleContent>

    <div
      v-if="props.actions?.length || !!slots.actions"
      data-slot="actions"
      :data-state="hasContent && isOpen ? 'open' : 'closed'"
      :class="ui.actions({ class: props.ui?.actions })"
    >
      <slot name="actions">
        <UButton v-for="(action, index) in props.actions" :key="index" size="xs" v-bind="action" />
      </slot>
    </div>
  </CollapsibleRoot>
</template>
```


## Checkbox.vue

```vue
<script>
import theme from "#build/ui/checkbox";
</script>

<script setup>
import { computed, useAttrs, useId } from "vue";
import { Primitive, CheckboxRoot, CheckboxIndicator, Label } from "reka-ui";
import { reactivePick } from "@vueuse/core";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { useForwardProps } from "../composables/useForwardProps";
import { useFormField } from "../composables/useFormField";
import { tv } from "../utils/tv";
import UIcon from "./Icon.vue";
defineOptions({ inheritAttrs: false });
const _props = defineProps({
  as: { type: null, required: false },
  label: { type: String, required: false },
  description: { type: String, required: false },
  color: { type: null, required: false },
  variant: { type: null, required: false },
  size: { type: null, required: false },
  indicator: { type: null, required: false },
  highlight: { type: Boolean, required: false },
  icon: { type: null, required: false },
  indeterminateIcon: { type: null, required: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false },
  disabled: { type: Boolean, required: false },
  required: { type: Boolean, required: false },
  name: { type: String, required: false },
  value: { type: null, required: false },
  id: { type: String, required: false },
  defaultValue: { type: null, required: false },
  modelValue: { type: null, required: false },
  trueValue: { type: null, required: false },
  falseValue: { type: null, required: false }
});
const slots = defineSlots();
const emits = defineEmits(["change", "update:modelValue"]);
const props = useComponentProps("checkbox", _props);
const appConfig = useAppConfig();
const rootProps = useForwardProps(reactivePick(props, "required", "value", "defaultValue", "modelValue", "trueValue", "falseValue"), emits);
const { id: _id, emitFormChange, emitFormInput, size: formFieldSize, color: formFieldColor, highlight: formFieldHighlight, name, disabled: formFieldDisabled, ariaAttrs } = useFormField(_props);
const id = _id.value ?? useId();
const color = computed(() => formFieldColor.value ?? props.color);
const highlight = computed(() => formFieldHighlight.value ?? props.highlight);
const size = computed(() => formFieldSize.value ?? props.size);
const disabled = computed(() => formFieldDisabled.value ?? props.disabled);
const labelIcon = computed(() => props.indicator === "hidden" ? props.icon : void 0);
const attrs = useAttrs();
const forwardedAttrs = computed(() => {
  const { "data-state": _, ...rest } = attrs;
  return rest;
});
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.checkbox || {} })({
  size: size.value,
  color: color.value,
  variant: props.variant,
  indicator: props.indicator,
  highlight: highlight.value,
  required: props.required,
  disabled: disabled.value
}));
function onUpdate(value) {
  const event = new Event("change", { target: { value } });
  emits("change", event);
  emitFormChange();
  emitFormInput();
}
</script>

<template>
  <Primitive :as="!props.variant || props.variant === 'list' ? props.as : Label" :data-slot="$attrs['data-slot'] ?? 'root'" :class="ui.root({ class: [props.ui?.root, props.class] })">
    <div data-slot="container" :class="ui.container({ class: props.ui?.container })">
      <CheckboxRoot
        :id="id"
        v-bind="{ ...rootProps, ...forwardedAttrs, ...ariaAttrs }"
        :name="name"
        :disabled="disabled"
        data-slot="base"
        :class="ui.base({ class: props.ui?.base })"
        @update:model-value="onUpdate"
      >
        <template #default="{ state }">
          <CheckboxIndicator v-if="props.indicator !== 'hidden'" data-slot="indicator" :class="ui.indicator({ class: props.ui?.indicator })">
            <UIcon v-if="state === 'indeterminate'" :name="props.indeterminateIcon || appConfig.ui.icons.minus" data-slot="icon" :class="ui.icon({ class: props.ui?.icon })" />
            <UIcon v-else :name="props.icon || appConfig.ui.icons.check" data-slot="icon" :class="ui.icon({ class: props.ui?.icon })" />
          </CheckboxIndicator>
        </template>
      </CheckboxRoot>
    </div>

    <div v-if="labelIcon || (props.label || !!slots.label) || (props.description || !!slots.description)" data-slot="wrapper" :class="ui.wrapper({ class: props.ui?.wrapper })">
      <UIcon v-if="labelIcon" :name="labelIcon" data-slot="icon" :class="ui.icon({ class: props.ui?.icon })" />
      <component :is="!props.variant || props.variant === 'list' ? Label : 'p'" v-if="props.label || !!slots.label" :for="id" data-slot="label" :class="ui.label({ class: props.ui?.label })">
        <slot name="label" :label="props.label">
          {{ props.label }}
        </slot>
      </component>
      <p v-if="props.description || !!slots.description" data-slot="description" :class="ui.description({ class: props.ui?.description })">
        <slot name="description" :description="props.description">
          {{ props.description }}
        </slot>
      </p>
    </div>
  </Primitive>
</template>
```


## CheckboxGroup.vue

```vue
<script>
import theme from "#build/ui/checkbox-group";
</script>

<script setup>
import { computed, useId } from "vue";
import { CheckboxGroupRoot } from "reka-ui";
import { useForwardProps } from "../composables/useForwardProps";
import { reactivePick } from "@vueuse/core";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { useFormField } from "../composables/useFormField";
import { get, omit } from "../utils";
import { tv } from "../utils/tv";
import UCheckbox from "./Checkbox.vue";
const _props = defineProps({
  as: { type: null, required: false },
  legend: { type: String, required: false },
  valueKey: { type: null, required: false, default: "value" },
  labelKey: { type: null, required: false, default: "label" },
  descriptionKey: { type: null, required: false, default: "description" },
  items: { type: null, required: false },
  modelValue: { type: null, required: false },
  defaultValue: { type: null, required: false },
  size: { type: null, required: false },
  variant: { type: null, required: false },
  orientation: { type: null, required: false, default: "vertical" },
  class: { type: null, required: false },
  ui: { type: Object, required: false },
  disabled: { type: Boolean, required: false },
  loop: { type: Boolean, required: false },
  name: { type: String, required: false },
  required: { type: Boolean, required: false },
  color: { type: null, required: false },
  highlight: { type: Boolean, required: false },
  indicator: { type: null, required: false },
  icon: { type: null, required: false }
});
const emits = defineEmits(["change", "update:modelValue"]);
const slots = defineSlots();
const props = useComponentProps("checkboxGroup", _props);
const appConfig = useAppConfig();
const rootProps = useForwardProps(reactivePick(props, "as", "modelValue", "defaultValue", "orientation", "loop", "required"), emits);
const checkboxProps = useForwardProps(reactivePick(props, "variant", "indicator"));
const getProxySlots = () => omit(slots, ["legend"]);
const { emitFormChange, emitFormInput, color: formFieldColor, highlight: formFieldHighlight, name, size: formFieldSize, id: _id, disabled: formFieldDisabled, ariaAttrs } = useFormField(_props, { bind: false });
const id = _id.value ?? useId();
const color = computed(() => formFieldColor.value ?? props.color);
const size = computed(() => formFieldSize.value ?? props.size);
const highlight = computed(() => formFieldHighlight.value ?? props.highlight);
const disabled = computed(() => formFieldDisabled.value ?? props.disabled);
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.checkboxGroup || {} })({
  size: size.value,
  required: props.required,
  orientation: props.orientation,
  color: color.value,
  variant: props.variant,
  highlight: highlight.value,
  disabled: disabled.value
}));
function normalizeItem(item) {
  if (item === null) {
    return {
      id: `${id}:null`,
      value: void 0,
      label: void 0
    };
  }
  if (typeof item === "string" || typeof item === "number") {
    return {
      id: `${id}:${item}`,
      value: String(item),
      label: String(item)
    };
  }
  const value = get(item, props.valueKey);
  const label = get(item, props.labelKey);
  const description = get(item, props.descriptionKey);
  return {
    ...item,
    value,
    label,
    description,
    id: `${id}:${value}`
  };
}
const normalizedItems = computed(() => {
  if (!props.items) {
    return [];
  }
  return props.items.map(normalizeItem);
});
function onUpdate(value) {
  const event = new Event("change", { target: { value } });
  emits("change", event);
  emitFormChange();
  emitFormInput();
}
</script>

<template>
  <CheckboxGroupRoot
    :id="id"
    v-bind="rootProps"
    :name="name"
    :disabled="disabled"
    data-slot="root"
    :class="ui.root({ class: [props.ui?.root, props.class] })"
    @update:model-value="onUpdate"
  >
    <fieldset data-slot="fieldset" :class="ui.fieldset({ class: props.ui?.fieldset })" v-bind="ariaAttrs">
      <legend v-if="props.legend || !!slots.legend" data-slot="legend" :class="ui.legend({ class: props.ui?.legend })">
        <slot name="legend">
          {{ props.legend }}
        </slot>
      </legend>

      <UCheckbox
        v-for="item in normalizedItems"
        :key="item.value"
        v-bind="{ ...item, ...checkboxProps }"
        :icon="item.icon ?? props.icon"
        :color="color"
        :highlight="highlight"
        :size="size"
        :name="name"
        :disabled="item.disabled || disabled"
        :ui="{ ...props.ui ? omit(props.ui, ['root']) : void 0, ...item.ui || {} }"
        data-slot="item"
        :class="ui.item({ class: [props.ui?.item, item.ui?.item, item.class], disabled: item.disabled || disabled })"
      >
        <template v-for="(_, name) in getProxySlots()" #[name]>
          <slot :name="name" :item="item" />
        </template>
      </UCheckbox>
    </fieldset>
  </CheckboxGroupRoot>
</template>
```


## Chip.vue

```vue
<script>
import theme from "#build/ui/chip";
</script>

<script setup>
import { computed } from "vue";
import { Primitive, Slot } from "reka-ui";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { useAvatarGroup } from "../composables/useAvatarGroup";
import { tv } from "../utils/tv";
defineOptions({ inheritAttrs: false });
const _props = defineProps({
  as: { type: null, required: false },
  text: { type: [String, Number], required: false },
  color: { type: null, required: false },
  size: { type: null, required: false },
  position: { type: null, required: false },
  inset: { type: Boolean, required: false, default: false },
  standalone: { type: Boolean, required: false, default: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false }
});
defineSlots();
const props = useComponentProps("chip", _props);
const show = defineModel("show", { type: Boolean, ...{ default: true } });
const { size } = useAvatarGroup(_props);
const appConfig = useAppConfig();
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.chip || {} })({
  color: props.color,
  size: size.value ?? props.size,
  position: props.position,
  inset: props.inset,
  standalone: props.standalone
}));
</script>

<template>
  <Primitive :as="props.as" :data-slot="$attrs['data-slot'] ?? 'root'" :class="ui.root({ class: [props.ui?.root, props.class] })">
    <Slot v-bind="{ ...$attrs, 'data-slot': void 0 }">
      <slot />
    </Slot>

    <span v-if="show" data-slot="base" :class="ui.base({ class: props.ui?.base })">
      <slot name="content">
        {{ props.text }}
      </slot>
    </span>
  </Primitive>
</template>
```


## Collapsible.vue

```vue
<script>
import theme from "#build/ui/collapsible";
</script>

<script setup>
import { computed } from "vue";
import { CollapsibleRoot, CollapsibleTrigger, CollapsibleContent } from "reka-ui";
import { useForwardProps } from "../composables/useForwardProps";
import { reactivePick } from "@vueuse/core";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { tv } from "../utils/tv";
const _props = defineProps({
  as: { type: null, required: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false },
  defaultOpen: { type: Boolean, required: false },
  open: { type: Boolean, required: false },
  disabled: { type: Boolean, required: false },
  unmountOnHide: { type: Boolean, required: false, default: true }
});
const emits = defineEmits(["update:open"]);
const slots = defineSlots();
const props = useComponentProps("collapsible", _props);
const appConfig = useAppConfig();
const rootProps = useForwardProps(reactivePick(props, "as", "defaultOpen", "open", "disabled", "unmountOnHide"), emits);
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.collapsible || {} })());
</script>

<template>
  <CollapsibleRoot v-slot="{ open }" v-bind="rootProps" data-slot="root" :class="ui.root({ class: [props.ui?.root, props.class] })">
    <CollapsibleTrigger v-if="!!slots.default" as-child>
      <slot :open="open" />
    </CollapsibleTrigger>

    <CollapsibleContent data-slot="content" :class="ui.content({ class: props.ui?.content })">
      <slot name="content" />
    </CollapsibleContent>
  </CollapsibleRoot>
</template>
```


## color-mode/ColorModeAvatar.vue

```vue
<script>

</script>

<script setup>
import { useForwardProps } from "reka-ui";
import { reactiveOmit } from "@vueuse/core";
import { usePrefix } from "../../composables/usePrefix";
import UAvatar from "../Avatar.vue";
defineOptions({ inheritAttrs: false });
const props = defineProps({
  light: { type: String, required: true },
  dark: { type: String, required: true },
  as: { type: null, required: false },
  alt: { type: String, required: false },
  icon: { type: null, required: false },
  text: { type: String, required: false },
  size: { type: null, required: false },
  color: { type: null, required: false },
  chip: { type: [Boolean, Object], required: false },
  class: { type: null, required: false },
  style: { type: null, required: false },
  ui: { type: Object, required: false }
});
const avatarProps = useForwardProps(reactiveOmit(props, "light", "dark"));
const prefix = usePrefix();
</script>

<template>
  <UAvatar v-bind="{ ...avatarProps, ...$attrs }" :src="light" :class="prefix('dark:hidden')" />
  <UAvatar v-bind="{ ...avatarProps, ...$attrs }" :src="dark" :class="prefix('hidden dark:block')" />
</template>
```


## color-mode/ColorModeButton.vue

```vue
<script>

</script>

<script setup>
import { computed } from "vue";
import { reactiveOmit } from "@vueuse/core";
import { useColorMode, useAppConfig } from "#imports";
import { useComponentProps } from "../../composables/useComponentProps";
import { useForwardProps } from "../../composables/useForwardProps";
import { useLocale } from "../../composables/useLocale";
import { usePrefix } from "../../composables/usePrefix";
import UButton from "../Button.vue";
import UIcon from "../Icon.vue";
defineOptions({ inheritAttrs: false });
const _props = defineProps({
  color: { type: null, required: false, default: "neutral" },
  variant: { type: null, required: false, default: "ghost" },
  label: { type: String, required: false },
  activeColor: { type: null, required: false },
  activeVariant: { type: null, required: false },
  size: { type: null, required: false },
  square: { type: Boolean, required: false },
  block: { type: Boolean, required: false },
  loadingAuto: { type: Boolean, required: false },
  onClick: { type: [Function, Array], required: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false },
  icon: { type: null, required: false },
  avatar: { type: Object, required: false },
  leading: { type: Boolean, required: false },
  leadingIcon: { type: null, required: false },
  trailing: { type: Boolean, required: false },
  trailingIcon: { type: null, required: false },
  loading: { type: Boolean, required: false },
  loadingIcon: { type: null, required: false },
  as: { type: null, required: false },
  type: { type: null, required: false },
  disabled: { type: Boolean, required: false },
  exactActiveClass: { type: String, required: false },
  viewTransition: { type: Boolean, required: false }
});
const props = useComponentProps("button", _props);
const { t } = useLocale();
const colorMode = useColorMode();
const appConfig = useAppConfig();
const prefix = usePrefix();
const buttonProps = useForwardProps(reactiveOmit(props, "icon"));
const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set(_isDark) {
    colorMode.preference = _isDark ? "dark" : "light";
  }
});
</script>

<template>
  <UButton
    v-bind="{
  ...buttonProps,
  'aria-label': isDark ? t('colorMode.switchToLight') : t('colorMode.switchToDark'),
  ...$attrs
}"
    @click="isDark = !isDark"
  >
    <template #leading="{ ui }">
      <UIcon :class="ui.leadingIcon({ class: [props.ui?.leadingIcon, prefix('hidden dark:inline-block')] })" :name="appConfig.ui.icons.dark" />
      <UIcon :class="ui.leadingIcon({ class: [props.ui?.leadingIcon, prefix('dark:hidden')] })" :name="appConfig.ui.icons.light" />
    </template>
  </UButton>
</template>
```


## color-mode/ColorModeImage.vue

```vue
<script>

</script>

<script setup>
import { computed } from "vue";
import { useRuntimeConfig } from "#imports";
import ImageComponent from "#build/ui-image-component";
import { usePrefix } from "../../composables/usePrefix";
import { resolveBaseURL } from "../../utils";
defineOptions({ inheritAttrs: false });
const props = defineProps({
  dark: { type: String, required: true },
  light: { type: String, required: true }
});
const refinedLight = computed(() => resolveBaseURL(props.light, useRuntimeConfig().app.baseURL));
const refinedDark = computed(() => resolveBaseURL(props.dark, useRuntimeConfig().app.baseURL));
const prefix = usePrefix();
</script>

<template>
  <component :is="ImageComponent" :src="refinedLight" :class="prefix('dark:hidden')" v-bind="$attrs" />
  <component :is="ImageComponent" :src="refinedDark" :class="prefix('hidden dark:block')" v-bind="$attrs" />
</template>
```


## color-mode/ColorModeSelect.vue

```vue
<script>

</script>

<script setup>
import { computed } from "vue";
import { useForwardProps } from "reka-ui";
import { useColorMode, useAppConfig } from "#imports";
import { useLocale } from "../../composables/useLocale";
import USelectMenu from "../SelectMenu.vue";
defineOptions({ inheritAttrs: false });
const props = defineProps({
  id: { type: String, required: false },
  placeholder: { type: String, required: false },
  searchInput: { type: [Boolean, Object], required: false, default: false },
  color: { type: null, required: false },
  variant: { type: null, required: false },
  size: { type: null, required: false },
  required: { type: Boolean, required: false },
  trailingIcon: { type: null, required: false },
  selectedIcon: { type: null, required: false },
  clear: { type: [Boolean, Object], required: false },
  clearIcon: { type: null, required: false },
  content: { type: Object, required: false },
  arrow: { type: [Boolean, Object], required: false },
  portal: { type: [Boolean, String], required: false, skipCheck: true },
  virtualize: { type: [Boolean, Object], required: false },
  valueKey: { type: null, required: false },
  labelKey: { type: null, required: false },
  descriptionKey: { type: null, required: false },
  defaultValue: { type: null, required: false },
  modelModifiers: { type: null, required: false },
  multiple: { type: Boolean, required: false },
  highlight: { type: Boolean, required: false },
  fixed: { type: Boolean, required: false },
  createItem: { type: [Boolean, String, Object], required: false },
  filterFields: { type: Array, required: false },
  ignoreFilter: { type: Boolean, required: false },
  autofocus: { type: Boolean, required: false },
  autofocusDelay: { type: Number, required: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false },
  open: { type: Boolean, required: false },
  defaultOpen: { type: Boolean, required: false },
  disabled: { type: Boolean, required: false },
  name: { type: String, required: false },
  resetSearchTermOnBlur: { type: Boolean, required: false },
  resetSearchTermOnSelect: { type: Boolean, required: false },
  resetModelValueOnClear: { type: Boolean, required: false },
  highlightOnHover: { type: Boolean, required: false },
  by: { type: [String, Function], required: false },
  avatar: { type: Object, required: false },
  leading: { type: Boolean, required: false },
  leadingIcon: { type: null, required: false },
  trailing: { type: Boolean, required: false },
  loading: { type: Boolean, required: false },
  loadingIcon: { type: null, required: false }
});
const { t } = useLocale();
const colorMode = useColorMode();
const appConfig = useAppConfig();
const selectMenuProps = useForwardProps(props);
const items = computed(() => [
  { label: t("colorMode.system"), value: "system", icon: appConfig.ui.icons.system },
  { label: t("colorMode.light"), value: "light", icon: appConfig.ui.icons.light },
  { label: t("colorMode.dark"), value: "dark", icon: appConfig.ui.icons.dark }
]);
const preference = computed({
  get() {
    return items.value.find((option) => option.value === colorMode.preference) || items.value[0];
  },
  set(option) {
    colorMode.preference = option.value;
  }
});
</script>

<template>
  <ClientOnly v-if="!colorMode?.forced">
    <USelectMenu
      v-model="preference"
      :icon="preference?.icon"
      v-bind="{ ...selectMenuProps, ...$attrs }"
      :items="items"
    />

    <template #fallback>
      <USelectMenu
        :icon="items[0]?.icon"
        :model-value="items[0]"
        v-bind="{ ...selectMenuProps, ...$attrs }"
        :items="items"
        disabled
      />
    </template>
  </ClientOnly>
</template>
```


## color-mode/ColorModeSwitch.vue

```vue
<script>

</script>

<script setup>
import { computed } from "vue";
import { useForwardProps } from "reka-ui";
import { useColorMode, useAppConfig } from "#imports";
import { useLocale } from "../../composables/useLocale";
import USwitch from "../Switch.vue";
defineOptions({ inheritAttrs: false });
const props = defineProps({
  as: { type: null, required: false },
  color: { type: null, required: false },
  size: { type: null, required: false },
  highlight: { type: Boolean, required: false },
  loading: { type: Boolean, required: false },
  loadingIcon: { type: null, required: false },
  label: { type: String, required: false },
  description: { type: String, required: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false },
  disabled: { type: Boolean, required: false },
  id: { type: String, required: false },
  name: { type: String, required: false },
  required: { type: Boolean, required: false },
  value: { type: String, required: false },
  defaultValue: { type: null, required: false },
  trueValue: { type: null, required: false },
  falseValue: { type: null, required: false }
});
const { t } = useLocale();
const colorMode = useColorMode();
const appConfig = useAppConfig();
const switchProps = useForwardProps(props);
const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set(_isDark) {
    colorMode.preference = _isDark ? "dark" : "light";
  }
});
</script>

<template>
  <ClientOnly v-if="!colorMode?.forced">
    <USwitch
      v-model="isDark"
      :checked-icon="appConfig.ui.icons.dark"
      :unchecked-icon="appConfig.ui.icons.light"
      v-bind="{
  ...switchProps,
  'aria-label': isDark ? t('colorMode.switchToLight') : t('colorMode.switchToDark'),
  ...$attrs
}"
    />

    <template #fallback>
      <USwitch
        :checked-icon="appConfig.ui.icons.dark"
        :unchecked-icon="appConfig.ui.icons.light"
        v-bind="{
  ...switchProps,
  'aria-label': isDark ? t('colorMode.switchToLight') : t('colorMode.switchToDark'),
  ...$attrs
}"
        disabled
      />
    </template>
  </ClientOnly>
</template>
```


## ColorPicker.vue

```vue
<script>
import theme from "#build/ui/color-picker";
function HSLtoHSV(hsl) {
  const x = hsl.S * (hsl.L < 50 ? hsl.L : 100 - hsl.L);
  const v = hsl.L + x / 100;
  return {
    h: hsl.H,
    s: hsl.L === 0 ? hsl.S : 2 * x / v,
    v
  };
}
function HSVtoHSL(hsv) {
  const x = (200 - hsv.s) * hsv.v / 100;
  return {
    H: hsv.h,
    S: x === 0 || x === 200 ? 0 : Math.round(hsv.s * hsv.v / (x <= 100 ? x : 200 - x)),
    L: x / 2
  };
}
</script>

<script setup>
import { ref, nextTick, computed, toValue } from "vue";
import { Primitive } from "reka-ui";
import { useEventListener, useElementBounding, watchThrottled, watchPausable } from "@vueuse/core";
import { isClient } from "@vueuse/shared";
import { ColorTranslator } from "colortranslator";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { tv } from "../utils/tv";
const _props = defineProps({
  as: { type: null, required: false },
  throttle: { type: Number, required: false, default: 50 },
  disabled: { type: Boolean, required: false },
  defaultValue: { type: String, required: false, default: "#FFFFFF" },
  format: { type: String, required: false, default: "hex" },
  size: { type: null, required: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false }
});
const props = useComponentProps("colorPicker", _props);
const modelValue = defineModel({ type: String, ...void 0 });
const appConfig = useAppConfig();
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.colorPicker || {} })({
  size: props.size
}));
const pickedColor = computed({
  get() {
    try {
      const color = new ColorTranslator(modelValue.value || props.defaultValue);
      return HSLtoHSV(color.HSLObject);
    } catch (_) {
      return { h: 0, s: 0, v: 100 };
    }
  },
  set(value) {
    const color = new ColorTranslator(HSVtoHSL(value), {
      labUnit: "percent",
      cmykUnit: "percent",
      cmykFunction: "cmyk"
    });
    switch (props.format) {
      case "rgb":
        modelValue.value = color.RGB;
        break;
      case "hsl":
        modelValue.value = color.HSL;
        break;
      case "cmyk":
        modelValue.value = color.CMYK;
        break;
      case "lab":
        modelValue.value = color.CIELab;
        break;
      case "hex":
      default:
        modelValue.value = color.HEX;
    }
  }
});
function useColorDraggable(targetElement, containerElement, axis = "both", initialPosition = { x: 0, y: 0 }, disabled2) {
  const position = ref(initialPosition);
  const pressedDelta = ref();
  const targetRect = useElementBounding(targetElement);
  const containerRect = useElementBounding(containerElement);
  function start(event) {
    if (toValue(disabled2)) return event.preventDefault();
    const container = toValue(containerElement);
    pressedDelta.value = {
      x: event.clientX - (container ? event.clientX - containerRect.left.value + container.scrollLeft : targetRect.left.value),
      y: event.clientY - (container ? event.clientY - containerRect.top.value + container.scrollTop : targetRect.top.value)
    };
    move(event);
  }
  function move(event) {
    if (!pressedDelta.value) return;
    const container = toValue(containerElement);
    let { x, y } = position.value;
    if (container && (axis === "x" || axis === "both")) {
      x = Math.min(Math.max(0, (event.clientX - pressedDelta.value.x) / container.scrollWidth * 100), 100);
    }
    if (container && (axis === "y" || axis === "both")) {
      y = Math.min(Math.max(0, (event.clientY - pressedDelta.value.y) / container.scrollHeight * 100), 100);
    }
    position.value = { x, y };
  }
  function end() {
    if (!pressedDelta.value) {
      return;
    }
    pressedDelta.value = void 0;
  }
  if (isClient) {
    useEventListener(containerElement, "pointerdown", start);
    useEventListener(window, "pointermove", move);
    useEventListener(window, "pointerup", end);
  }
  return {
    position
  };
}
function normalizeHue(hue, dir = "left") {
  if (dir === "right") {
    return hue * 100 / 360;
  }
  return hue / 100 * 360;
}
function normalizeBrightness(brightness) {
  return 100 - brightness;
}
const selectorRef = ref(null);
const selectorThumbRef = ref(null);
const trackRef = ref(null);
const trackThumbRef = ref(null);
const disabled = computed(() => props.disabled);
const { position: selectorThumbPosition } = useColorDraggable(selectorThumbRef, selectorRef, "both", {
  x: pickedColor.value.s,
  y: normalizeBrightness(pickedColor.value.v)
}, disabled);
const { position: trackThumbPosition } = useColorDraggable(trackThumbRef, trackRef, "y", {
  x: 0,
  y: normalizeHue(pickedColor.value.h, "right")
}, disabled);
const { pause: pauseWatchColor, resume: resumeWatchColor } = watchPausable(pickedColor, (hsb) => {
  selectorThumbPosition.value = {
    x: hsb.s,
    y: normalizeBrightness(hsb.v)
  };
  trackThumbPosition.value = {
    x: 0,
    y: normalizeHue(hsb.h, "right")
  };
});
watchThrottled([selectorThumbPosition, trackThumbPosition], () => {
  pauseWatchColor();
  pickedColor.value = {
    h: normalizeHue(trackThumbPosition.value.y),
    s: selectorThumbPosition.value.x,
    v: normalizeBrightness(selectorThumbPosition.value.y)
  };
  nextTick(resumeWatchColor);
}, { throttle: () => props.throttle });
const trackThumbColor = computed(() => new ColorTranslator(HSVtoHSL({
  h: normalizeHue(trackThumbPosition.value.y),
  s: 100,
  v: 100
})).HEX);
const selectorStyle = computed(() => ({
  backgroundColor: trackThumbColor.value
}));
const selectorThumbStyle = computed(() => ({
  backgroundColor: new ColorTranslator(modelValue.value || props.defaultValue).HEX,
  left: `${selectorThumbPosition.value.x}%`,
  top: `${selectorThumbPosition.value.y}%`
}));
const trackThumbStyle = computed(() => ({
  backgroundColor: trackThumbColor.value,
  top: `${trackThumbPosition.value.y}%`
}));
</script>

<template>
  <Primitive :as="props.as" data-slot="root" :class="ui.root({ class: [props.ui?.root, props.class] })" :data-disabled="disabled ? true : void 0">
    <div data-slot="picker" :class="ui.picker({ class: props.ui?.picker })">
      <div
        ref="selectorRef"
        data-slot="selector"
        :class="ui.selector({ class: props.ui?.selector })"
        :style="selectorStyle"
      >
        <div data-slot="selectorBackground" :class="ui.selectorBackground({ class: props.ui?.selectorBackground })" data-color-picker-background>
          <div
            ref="selectorThumbRef"
            data-slot="selectorThumb"
            :class="ui.selectorThumb({ class: props.ui?.selectorThumb })"
            :style="selectorThumbStyle"
            :data-disabled="disabled ? true : void 0"
          />
        </div>
      </div>
      <div
        ref="trackRef"
        data-slot="track"
        :class="ui.track({ class: props.ui?.track })"
        data-color-picker-track
      >
        <div
          ref="trackThumbRef"
          data-slot="trackThumb"
          :class="ui.trackThumb({ class: props.ui?.trackThumb })"
          :style="trackThumbStyle"
          :data-disabled="disabled ? true : void 0"
        />
      </div>
    </div>
  </Primitive>
</template>

<style scoped>
[data-color-picker-background]{background-image:linear-gradient(0deg,#000 0,transparent),linear-gradient(90deg,#fff 0,hsla(0,0%,100%,0))}[data-color-picker-track]{background-image:linear-gradient(0deg,red,#f0f 17%,#00f 33%,#0ff 50%,#0f0 67%,#ff0 83%,red)}
</style>
```


## CommandPalette.vue

```vue
<script>
import theme from "#build/ui/command-palette";
</script>

<script setup>
import { computed, ref, useTemplateRef, toRef, watch, nextTick } from "vue";
import { ListboxRoot, ListboxFilter, ListboxContent, ListboxGroup, ListboxGroupLabel, ListboxVirtualizer, ListboxItem, ListboxItemIndicator } from "reka-ui";
import { useForwardProps } from "../composables/useForwardProps";
import { defu } from "defu";
import { reactivePick, createReusableTemplate, refDebounced, refThrottled } from "@vueuse/core";
import { useFuse } from "@vueuse/integrations/useFuse";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { useLocale } from "../composables/useLocale";
import { omit, get } from "../utils";
import { highlight } from "../utils/search";
import { pickLinkProps } from "../utils/link";
import { getEstimateSize } from "../utils/virtualizer";
import { tv } from "../utils/tv";
import UIcon from "./Icon.vue";
import UAvatar from "./Avatar.vue";
import UButton from "./Button.vue";
import UChip from "./Chip.vue";
import ULinkBase from "./LinkBase.vue";
import ULink from "./Link.vue";
import UInput from "./Input.vue";
import UKbd from "./Kbd.vue";
defineOptions({ inheritAttrs: false });
const _props = defineProps({
  as: { type: null, required: false },
  size: { type: null, required: false },
  icon: { type: [String, Boolean], required: false, skipCheck: true },
  trailingIcon: { type: null, required: false },
  selectedIcon: { type: null, required: false },
  childrenIcon: { type: null, required: false },
  placeholder: { type: String, required: false },
  autofocus: { type: Boolean, required: false, default: true },
  close: { type: [Boolean, Object], required: false },
  closeIcon: { type: null, required: false },
  back: { type: [Boolean, Object], required: false, default: true },
  backIcon: { type: null, required: false },
  input: { type: [Boolean, Object], required: false, default: true },
  groups: { type: Array, required: false },
  fuse: { type: Object, required: false },
  virtualize: { type: [Boolean, Object], required: false, default: false },
  valueKey: { type: null, required: false },
  labelKey: { type: null, required: false, default: "label" },
  descriptionKey: { type: null, required: false, default: "description" },
  preserveGroupOrder: { type: Boolean, required: false, default: false },
  searchDelay: { type: Number, required: false, default: 0 },
  class: { type: null, required: false },
  ui: { type: Object, required: false },
  multiple: { type: Boolean, required: false },
  disabled: { type: Boolean, required: false },
  modelValue: { type: null, required: false },
  defaultValue: { type: null, required: false },
  highlightOnHover: { type: Boolean, required: false, default: true },
  selectionBehavior: { type: String, required: false },
  by: { type: [String, Function], required: false },
  loading: { type: Boolean, required: false },
  loadingIcon: { type: null, required: false }
});
const emits = defineEmits(["update:modelValue", "highlight", "entryFocus", "leave", "update:open"]);
const slots = defineSlots();
const props = useComponentProps("commandPalette", _props);
const searchTerm = defineModel("searchTerm", { type: String, ...{ default: "" } });
const { t } = useLocale();
const appConfig = useAppConfig();
const rootProps = useForwardProps(reactivePick(props, "as", "disabled", "multiple", "modelValue", "defaultValue", "highlightOnHover", "by"), emits);
const virtualizerProps = toRef(() => {
  if (!props.virtualize) return false;
  return defu(typeof props.virtualize === "boolean" ? {} : props.virtualize, {
    estimateSize: getEstimateSize(filteredItems.value, "md", props.descriptionKey, !!slots["item-description"])
  });
});
const [DefineItemTemplate, ReuseItemTemplate] = createReusableTemplate({
  props: {
    item: {
      type: Object,
      required: true
    },
    group: {
      type: Object,
      required: false
    },
    index: {
      type: Number,
      required: false
    }
  }
});
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.commandPalette || {} })({
  size: props.size,
  virtualize: !!props.virtualize
}));
const fuse = computed(() => defu({}, props.fuse, {
  fuseOptions: {
    ignoreLocation: true,
    threshold: 0.1,
    keys: [props.labelKey, props.descriptionKey, "suffix"]
  },
  resultLimit: 12,
  matchAllWhenSearchEmpty: true
}));
const history = ref([]);
const placeholder = computed(() => history.value[history.value.length - 1]?.placeholder || props.placeholder || t("commandPalette.placeholder"));
const groups = computed(() => history.value?.length ? [history.value[history.value.length - 1]] : props.groups);
const items = computed(() => groups.value?.filter((group) => {
  if (!group.id) {
    console.warn(`[@nuxt/ui] CommandPalette group is missing an \`id\` property`);
    return false;
  }
  if (group.ignoreFilter) {
    return false;
  }
  return true;
})?.flatMap((group) => group.items?.map((item) => ({ ...item, group: group.id })) || []) || []);
const fuseSearchTerm = refDebounced(searchTerm, () => props.searchDelay);
const { results: fuseResults } = useFuse(fuseSearchTerm, items, fuse);
const throttledFuseResults = refThrottled(fuseResults, 16, true);
function processGroupItems(group, items2) {
  let processedItems = items2;
  if (group?.postFilter && typeof group.postFilter === "function") {
    processedItems = group.postFilter(fuseSearchTerm.value, processedItems);
  }
  return {
    ...group,
    items: processedItems.slice(0, fuse.value.resultLimit).map((item) => {
      return {
        ...item,
        labelHtml: item.labelHtml ?? highlight(item, fuseSearchTerm.value, props.labelKey, void 0, fuse.value.fuseOptions?.useTokenSearch),
        suffixHtml: item.suffixHtml ?? highlight(item, fuseSearchTerm.value, "suffix", [props.labelKey], fuse.value.fuseOptions?.useTokenSearch),
        descriptionHtml: item.descriptionHtml ?? highlight(item, fuseSearchTerm.value, props.descriptionKey, [props.labelKey, "suffix"], fuse.value.fuseOptions?.useTokenSearch)
      };
    })
  };
}
const filteredGroups = computed(() => {
  const currentGroups = groups.value;
  const groupsById = throttledFuseResults.value.reduce((acc, result2) => {
    const { item, matches } = result2;
    if (!item.group) {
      return acc;
    }
    acc[item.group] ||= [];
    acc[item.group]?.push({ ...item, matches });
    return acc;
  }, {});
  if (props.preserveGroupOrder) {
    const processedGroups = [];
    for (const group of currentGroups || []) {
      if (!group.items?.length) {
        continue;
      }
      const items2 = group.ignoreFilter ? group.items : groupsById[group.id];
      if (!items2?.length) {
        continue;
      }
      const processedGroup = processGroupItems(group, items2);
      if (processedGroup.items?.length) {
        processedGroups.push(processedGroup);
      }
    }
    return processedGroups;
  }
  const fuseGroups = Object.entries(groupsById).map(([id, items2]) => {
    const group = currentGroups?.find((group2) => group2.id === id);
    if (!group) {
      return;
    }
    const processedGroup = processGroupItems(group, items2);
    return processedGroup.items?.length ? processedGroup : void 0;
  }).filter((group) => !!group);
  const result = [...fuseGroups];
  for (const group of currentGroups || []) {
    if (!group.ignoreFilter || !group.items?.length) {
      continue;
    }
    const processedGroup = processGroupItems(group, group.items);
    if (!processedGroup.items?.length) {
      continue;
    }
    const originalIndex = currentGroups.indexOf(group);
    const precedingIds = /* @__PURE__ */ new Set();
    for (let i = 0; i < originalIndex; i++) {
      precedingIds.add(currentGroups[i].id);
    }
    let insertAfter = -1;
    for (let i = 0; i < result.length; i++) {
      if (precedingIds.has(result[i].id)) {
        insertAfter = i;
      }
    }
    result.splice(insertAfter + 1, 0, processedGroup);
  }
  return result;
});
const filteredItems = computed(() => filteredGroups.value.flatMap((group) => group.items || []));
const rootRef = useTemplateRef("rootRef");
watch(filteredGroups, () => {
  nextTick(() => {
    const root = rootRef.value;
    const rootEl = root?.$el;
    if (rootEl?.contains(document.activeElement)) {
      root?.highlightFirstItem();
    } else {
      root?.highlightSelected(void 0, false);
    }
  });
});
function navigate(item) {
  if (!item.children?.length) {
    return;
  }
  history.value.push({
    id: `history-${history.value.length}`,
    label: item.label,
    slot: item.slot,
    placeholder: item.placeholder,
    items: item.children
  });
  searchTerm.value = "";
  rootRef.value?.highlightFirstItem();
}
function navigateBack() {
  if (!history.value.length) {
    return;
  }
  history.value.pop();
  searchTerm.value = "";
  rootRef.value?.highlightFirstItem();
}
function onBackspace() {
  if (!searchTerm.value) {
    navigateBack();
  }
}
function onSelect(e, item) {
  if (item.children?.length) {
    e.preventDefault();
    navigate(item);
  } else {
    item.onSelect?.(e);
  }
}
</script>

<template>
  <DefineItemTemplate v-slot="{ item, index, group }">
    <ULink v-slot="{ active, ...slotProps }" v-bind="pickLinkProps(item)" custom>
      <ListboxItem
        :value="props.valueKey ? get(item, props.valueKey) : omit(item, ['matches', 'group', 'onSelect', 'labelHtml', 'suffixHtml', 'descriptionHtml', 'children'])"
        :disabled="item.disabled"
        as-child
        @select="onSelect($event, item)"
      >
        <ULinkBase v-bind="slotProps" data-slot="item" :class="ui.item({ class: [props.ui?.item, item.ui?.item, item.class], active: active || item.active })">
          <slot :name="item.slot || group?.slot || 'item'" :item="item" :index="index" :ui="ui">
            <slot :name="item.slot ? `${item.slot}-leading` : group?.slot ? `${group.slot}-leading` : `item-leading`" :item="item" :index="index" :ui="ui">
              <UIcon v-if="item.loading" :name="props.loadingIcon || appConfig.ui.icons.loading" data-slot="itemLeadingIcon" :class="ui.itemLeadingIcon({ class: [props.ui?.itemLeadingIcon, item.ui?.itemLeadingIcon], loading: true })" />
              <UIcon v-else-if="item.icon" :name="item.icon" data-slot="itemLeadingIcon" :class="ui.itemLeadingIcon({ class: [props.ui?.itemLeadingIcon, item.ui?.itemLeadingIcon], active: active || item.active })" />
              <UAvatar v-else-if="item.avatar" :size="item.ui?.itemLeadingAvatarSize || props.ui?.itemLeadingAvatarSize || ui.itemLeadingAvatarSize()" v-bind="item.avatar" data-slot="itemLeadingAvatar" :class="ui.itemLeadingAvatar({ class: [props.ui?.itemLeadingAvatar, item.ui?.itemLeadingAvatar], active: active || item.active })" />
              <UChip
                v-else-if="item.chip"
                :size="item.ui?.itemLeadingChipSize || props.ui?.itemLeadingChipSize || ui.itemLeadingChipSize()"
                inset
                standalone
                v-bind="item.chip"
                data-slot="itemLeadingChip"
                :class="ui.itemLeadingChip({ class: [props.ui?.itemLeadingChip, item.ui?.itemLeadingChip], active: active || item.active })"
              />
            </slot>

            <span v-if="item.prefix || (item.labelHtml || get(item, props.labelKey)) || (item.suffixHtml || item.suffix) || !!slots[item.slot ? `${item.slot}-label` : group?.slot ? `${group.slot}-label` : `item-label`] || (get(item, props.descriptionKey) || !!slots[item.slot ? `${item.slot}-description` : group?.slot ? `${group.slot}-description` : `item-description`])" data-slot="itemWrapper" :class="ui.itemWrapper({ class: [props.ui?.itemWrapper, item.ui?.itemWrapper] })">
              <span data-slot="itemLabel" :class="ui.itemLabel({ class: [props.ui?.itemLabel, item.ui?.itemLabel], active: active || item.active })">
                <slot :name="item.slot ? `${item.slot}-label` : group?.slot ? `${group.slot}-label` : `item-label`" :item="item" :index="index" :ui="ui">
                  <span v-if="item.prefix" data-slot="itemLabelPrefix" :class="ui.itemLabelPrefix({ class: [props.ui?.itemLabelPrefix, item.ui?.itemLabelPrefix] })">{{ item.prefix }}</span>

                  <span v-if="item.labelHtml" data-slot="itemLabelBase" :class="ui.itemLabelBase({ class: [props.ui?.itemLabelBase, item.ui?.itemLabelBase], active: active || item.active })" v-html="item.labelHtml" />
                  <span v-else data-slot="itemLabelBase" :class="ui.itemLabelBase({ class: [props.ui?.itemLabelBase, item.ui?.itemLabelBase], active: active || item.active })">{{ get(item, props.labelKey) }}</span>

                  <span v-if="item.suffixHtml" data-slot="itemLabelSuffix" :class="ui.itemLabelSuffix({ class: [props.ui?.itemLabelSuffix, item.ui?.itemLabelSuffix], active: active || item.active })" v-html="item.suffixHtml" />
                  <span v-else-if="item.suffix" data-slot="itemLabelSuffix" :class="ui.itemLabelSuffix({ class: [props.ui?.itemLabelSuffix, item.ui?.itemLabelSuffix], active: active || item.active })">{{ item.suffix }}</span>
                </slot>
              </span>

              <span v-if="item.descriptionHtml" data-slot="itemDescription" :class="ui.itemDescription({ class: [props.ui?.itemDescription, item.ui?.itemDescription] })" v-html="item.descriptionHtml" />
              <span v-else-if="get(item, props.descriptionKey) || !!slots[item.slot ? `${item.slot}-description` : group?.slot ? `${group.slot}-description` : `item-description`]" data-slot="itemDescription" :class="ui.itemDescription({ class: [props.ui?.itemDescription, item.ui?.itemDescription] })">
                <slot :name="item.slot ? `${item.slot}-description` : group?.slot ? `${group.slot}-description` : `item-description`" :item="item" :index="index" :ui="ui">
                  {{ get(item, props.descriptionKey) }}
                </slot>
              </span>
            </span>

            <span data-slot="itemTrailing" :class="ui.itemTrailing({ class: [props.ui?.itemTrailing, item.ui?.itemTrailing] })">
              <slot :name="item.slot ? `${item.slot}-trailing` : group?.slot ? `${group.slot}-trailing` : `item-trailing`" :item="item" :index="index" :ui="ui">
                <UIcon
                  v-if="item.children && item.children.length > 0"
                  :name="props.childrenIcon || appConfig.ui.icons.chevronRight"
                  data-slot="itemTrailingIcon"
                  :class="ui.itemTrailingIcon({ class: [props.ui?.itemTrailingIcon, item.ui?.itemTrailingIcon] })"
                />

                <span v-else-if="item.kbds?.length" data-slot="itemTrailingKbds" :class="ui.itemTrailingKbds({ class: [props.ui?.itemTrailingKbds, item.ui?.itemTrailingKbds] })">
                  <UKbd v-for="(kbd, kbdIndex) in item.kbds" :key="kbdIndex" :size="item.ui?.itemTrailingKbdsSize || props.ui?.itemTrailingKbdsSize || ui.itemTrailingKbdsSize()" v-bind="typeof kbd === 'string' ? { value: kbd } : kbd" />
                </span>

                <UIcon v-else-if="group?.highlightedIcon" :name="group.highlightedIcon" data-slot="itemTrailingHighlightedIcon" :class="ui.itemTrailingHighlightedIcon({ class: [props.ui?.itemTrailingHighlightedIcon, item.ui?.itemTrailingHighlightedIcon] })" />
              </slot>

              <ListboxItemIndicator v-if="!item.children?.length" as-child>
                <UIcon :name="props.selectedIcon || appConfig.ui.icons.check" data-slot="itemTrailingIcon" :class="ui.itemTrailingIcon({ class: [props.ui?.itemTrailingIcon, item.ui?.itemTrailingIcon] })" />
              </ListboxItemIndicator>
            </span>
          </slot>
        </ULinkBase>
      </ListboxItem>
    </ULink>
  </DefineItemTemplate>

  <ListboxRoot ref="rootRef" data-slot="root" v-bind="{ ...rootProps, ...$attrs }" :selection-behavior="props.selectionBehavior" :class="ui.root({ class: [props.ui?.root, props.class] })">
    <ListboxFilter v-if="props.input" v-model="searchTerm" as-child>
      <UInput
        variant="none"
        :size="props.size"
        :placeholder="placeholder"
        :autofocus="props.autofocus"
        :loading="props.loading"
        :loading-icon="props.loadingIcon"
        :trailing-icon="props.trailingIcon"
        :icon="props.icon === false ? void 0 : props.icon ?? appConfig.ui.icons.search"
        v-bind="typeof props.input === 'object' ? props.input : {}"
        data-slot="input"
        :class="ui.input({ class: props.ui?.input })"
        @keydown.backspace="onBackspace"
      >
        <template v-if="history?.length && (props.back || !!slots.back)" #leading>
          <slot name="back" :ui="ui">
            <UButton
              :size="props.size"
              :icon="props.backIcon || appConfig.ui.icons.arrowLeft"
              color="neutral"
              variant="link"
              :aria-label="t('commandPalette.back')"
              v-bind="typeof props.back === 'object' ? props.back : {}"
              data-slot="back"
              :class="ui.back({ class: props.ui?.back })"
              @click="navigateBack"
            />
          </slot>
        </template>

        <template v-if="props.close || !!slots.close" #trailing>
          <slot name="close" :ui="ui">
            <UButton
              v-if="props.close"
              :size="props.size"
              :icon="props.closeIcon || appConfig.ui.icons.close"
              color="neutral"
              variant="ghost"
              :aria-label="t('commandPalette.close')"
              v-bind="typeof props.close === 'object' ? props.close : {}"
              data-slot="close"
              :class="ui.close({ class: props.ui?.close })"
              @click="emits('update:open', false)"
            />
          </slot>
        </template>
      </UInput>
    </ListboxFilter>

    <ListboxContent data-slot="content" :class="ui.content({ class: props.ui?.content })">
      <div v-if="filteredGroups?.length" role="presentation" data-slot="viewport" :class="ui.viewport({ class: props.ui?.viewport })">
        <ListboxVirtualizer
          v-if="!!props.virtualize"
          v-slot="{ option: item, virtualItem }"
          :options="filteredItems"
          :text-content="(item2) => get(item2, props.labelKey)"
          v-bind="virtualizerProps"
        >
          <ReuseItemTemplate :item="item" :index="virtualItem.index" />
        </ListboxVirtualizer>

        <template v-else>
          <ListboxGroup v-for="group in filteredGroups" :key="`group-${group.id}`" data-slot="group" :class="ui.group({ class: props.ui?.group })">
            <ListboxGroupLabel v-if="get(group, props.labelKey) || !!slots[group.slot ? `${group.slot}-group-label` : 'group-label']" data-slot="label" :class="ui.label({ class: props.ui?.label })">
              <slot :name="group.slot ? `${group.slot}-group-label` : 'group-label'" :group="group" :label="get(group, props.labelKey)" :ui="ui">
                {{ get(group, props.labelKey) }}
              </slot>
            </ListboxGroupLabel>

            <ReuseItemTemplate
              v-for="(item, index) in group.items"
              :key="`group-${group.id}-${index}`"
              :item="item"
              :index="index"
              :group="group"
            />
          </ListboxGroup>
        </template>
      </div>

      <div v-else data-slot="empty" :class="ui.empty({ class: props.ui?.empty })">
        <slot name="empty" :search-term="searchTerm">
          {{ searchTerm ? t("commandPalette.noMatch", { searchTerm }) : t("commandPalette.noData") }}
        </slot>
      </div>
    </ListboxContent>

    <div v-if="!!slots.footer" data-slot="footer" :class="ui.footer({ class: props.ui?.footer })">
      <slot name="footer" :ui="ui" />
    </div>
  </ListboxRoot>
</template>
```


## Container.vue

```vue
<script>
import theme from "#build/ui/container";
</script>

<script setup>
import { computed } from "vue";
import { Primitive } from "reka-ui";
import { useAppConfig } from "#imports";
import { tv } from "../utils/tv";
import { useComponentProps } from "../composables/useComponentProps";
const _props = defineProps({
  as: { type: null, required: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false }
});
defineSlots();
const props = useComponentProps("container", _props);
const appConfig = useAppConfig();
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.container || {} }));
</script>

<template>
  <Primitive :as="props.as" :class="ui({ class: [props.ui?.base, props.class] })">
    <slot />
  </Primitive>
</template>
```


## content/ContentNavigation.vue

```vue
<script>
import theme from "#build/ui/content/content-navigation";
</script>

<script setup>
import { computed } from "vue";
import { Primitive, AccordionRoot, AccordionItem, AccordionTrigger, AccordionContent } from "reka-ui";
import { useForwardProps } from "../../composables/useForwardProps";
import { reactivePick, createReusableTemplate } from "@vueuse/core";
import { useRoute, useAppConfig } from "#imports";
import { useComponentProps } from "../../composables/useComponentProps";
import { pickLinkProps } from "../../utils/link";
import { tv } from "../../utils/tv";
import { mapContentNavigationItem } from "../../utils/content";
import UContentNavigation from "./ContentNavigation.vue";
import ULink from "../Link.vue";
import ULinkBase from "../LinkBase.vue";
import UBadge from "../Badge.vue";
import UIcon from "../Icon.vue";
defineOptions({ inheritAttrs: false });
const _props = defineProps({
  as: { type: null, required: false, default: "nav" },
  defaultOpen: { type: Boolean, required: false, default: void 0 },
  trailingIcon: { type: null, required: false },
  color: { type: null, required: false },
  variant: { type: null, required: false },
  highlight: { type: Boolean, required: false, default: false },
  highlightColor: { type: null, required: false },
  collapsible: { type: Boolean, required: false, default: true },
  level: { type: Number, required: false, default: 0 },
  navigation: { type: Array, required: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false },
  disabled: { type: Boolean, required: false },
  type: { type: String, required: false, default: "multiple" },
  unmountOnHide: { type: Boolean, required: false, default: true }
});
const emits = defineEmits(["update:modelValue"]);
const slots = defineSlots();
const props = useComponentProps("contentNavigation", _props);
const rootProps = useForwardProps(reactivePick(props, "collapsible", "type", "unmountOnHide"), emits);
const route = useRoute();
const appConfig = useAppConfig();
const [DefineLinkTemplate, ReuseLinkTemplate] = createReusableTemplate();
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.contentNavigation || {} })({
  color: props.color,
  variant: props.variant,
  highlight: props.highlight,
  highlightColor: props.highlightColor || props.color
}));
const disabled = computed(() => props.disabled || props.type === "multiple" && props.collapsible === false);
function isRouteInTree(link, routePath) {
  if (link.children?.length) {
    return link.children.some((child) => isRouteInTree(child, routePath));
  }
  return routePath === link.path;
}
const defaultValue = computed(() => {
  if (props.defaultOpen === false) {
    return void 0;
  }
  if (props.defaultOpen === void 0) {
    return props.type === "single" ? "0" : props.navigation?.map((link, index) => link.defaultOpen !== false && String(index)).filter(Boolean);
  }
  const indices = props.navigation?.reduce((acc, link, index) => {
    if (isRouteInTree(link, route.path)) {
      acc.push(String(index));
    }
    return acc;
  }, []) || [];
  return props.type === "multiple" ? indices : indices[0];
});
</script>

<template>
  <DefineLinkTemplate v-slot="{ link, active }">
    <slot name="link" :link="link" :active="active" :ui="ui">
      <slot name="link-leading" :link="link" :active="active" :ui="ui">
        <UIcon v-if="link.icon" :name="link.icon" data-slot="linkLeadingIcon" :class="ui.linkLeadingIcon({ class: [props.ui?.linkLeadingIcon, link.ui?.linkLeadingIcon], active })" />
      </slot>

      <span v-if="link.title || !!slots['link-title']" data-slot="linkTitle" :class="ui.linkTitle({ class: [props.ui?.linkTitle, link.ui?.linkTitle], active })">
        <slot name="link-title" :link="link" :active="active" :ui="ui">
          {{ link.title }}
        </slot>

        <UIcon v-if="link.target === '_blank'" :name="appConfig.ui.icons.external" data-slot="linkTitleExternalIcon" :class="ui.linkTitleExternalIcon({ class: [props.ui?.linkTitleExternalIcon, link.ui?.linkTitleExternalIcon], active })" />
      </span>

      <span v-if="link.badge || link.badge === 0 || link.children?.length && !disabled || link.trailingIcon || !!slots['link-trailing']" data-slot="linkTrailing" :class="ui.linkTrailing({ class: [props.ui?.linkTrailing, link.ui?.linkTrailing] })">
        <slot name="link-trailing" :link="link" :active="active" :ui="ui">
          <UBadge
            v-if="link.badge || link.badge === 0"
            color="neutral"
            variant="outline"
            :size="props.ui?.linkTrailingBadgeSize || ui.linkTrailingBadgeSize()"
            v-bind="typeof link.badge === 'string' || typeof link.badge === 'number' ? { label: link.badge } : link.badge"
            data-slot="linkTrailingBadge"
            :class="ui.linkTrailingBadge({ class: props.ui?.linkTrailingBadge })"
          />
          <UIcon v-if="link.children?.length && !disabled" :name="link.trailingIcon || props.trailingIcon || appConfig.ui.icons.chevronDown" data-slot="linkTrailingIcon" :class="ui.linkTrailingIcon({ class: [props.ui?.linkTrailingIcon, link.ui?.linkTrailingIcon] })" />
          <UIcon v-else-if="link.trailingIcon" :name="link.trailingIcon" data-slot="linkTrailingIcon" :class="ui.linkTrailingIcon({ class: [props.ui?.linkTrailingIcon, link.ui?.linkTrailingIcon] })" />
        </slot>
      </span>
    </slot>
  </DefineLinkTemplate>

  <Primitive :as="props.as" data-slot="root" v-bind="$attrs" :as-child="props.level > 0" :class="ui.root({ class: [props.ui?.root, props.class] })">
    <AccordionRoot
      as="ul"
      :disabled="disabled"
      v-bind="rootProps"
      :model-value="disabled ? defaultValue : void 0"
      :default-value="disabled ? void 0 : defaultValue"
      :class="props.level > 0 ? ui.listWithChildren({ class: props.ui?.listWithChildren }) : ui.list({ class: props.ui?.list })"
    >
      <template v-for="(link, index) in props.navigation" :key="`${index}-${link.path}`">
        <AccordionItem
          v-if="link.children?.length"
          as="li"
          :disabled="!!link.disabled"
          data-slot="itemWithChildren"
          :class="ui.itemWithChildren({ class: [props.ui?.itemWithChildren, link.ui?.itemWithChildren], level: props.level > 0 })"
          :value="String(index)"
        >
          <AccordionTrigger
            as="button"
            :class="[
  ui.link({ class: [props.ui?.link, link.ui?.link, link.class], active: link.active, disabled: !!link.disabled || disabled }),
  ui.trigger({ class: [props.ui?.trigger, link.ui?.trigger], disabled: !!link.disabled || disabled })
]"
          >
            <ReuseLinkTemplate :link="link" :active="link.active || false" />
          </AccordionTrigger>

          <AccordionContent data-slot="content" :class="ui.content({ class: [props.ui?.content, link.ui?.content] })">
            <UContentNavigation
              v-bind="rootProps"
              :navigation="link.children"
              :default-open="props.defaultOpen"
              :level="props.level + 1"
              :trailing-icon="props.trailingIcon"
              :color="props.color"
              :variant="props.variant"
              :highlight="props.highlight"
              :highlight-color="props.highlightColor"
              :ui="props.ui"
            >
              <template v-for="(_, name) in slots" #[name]="slotData">
                <slot :name="name" v-bind="{ ...slotData, link: slotData.link }" />
              </template>
            </UContentNavigation>
          </AccordionContent>
        </AccordionItem>

        <li v-else data-slot="item" :class="ui.item({ class: [props.ui?.item, link.ui?.item], level: props.level > 0 })">
          <ULink v-slot="{ active, ...slotProps }" v-bind="pickLinkProps(mapContentNavigationItem(link))" custom>
            <ULinkBase v-bind="slotProps" data-slot="link" :class="ui.link({ class: [props.ui?.link, link.ui?.link, link.class], active, disabled: !!link.disabled, level: props.level > 0 })">
              <ReuseLinkTemplate :link="link" :active="active" />
            </ULinkBase>
          </ULink>
        </li>
      </template>
    </AccordionRoot>
  </Primitive>
</template>
```


## content/ContentSearch.vue

```vue
<script>
import theme from "#build/ui/content/content-search";
</script>

<script setup>
import { computed, shallowRef, useTemplateRef, watch } from "vue";
import { defu } from "defu";
import { reactivePick, refDebounced } from "@vueuse/core";
import { useAppConfig, useColorMode, defineShortcuts } from "#imports";
import { useComponentProps } from "../../composables/useComponentProps";
import { useForwardProps } from "../../composables/useForwardProps";
import { useContentSearch } from "../../composables/useContentSearch";
import { useLocale } from "../../composables/useLocale";
import { omit, transformUI } from "../../utils";
import { tv } from "../../utils/tv";
import UModal from "../Modal.vue";
import UCommandPalette from "../CommandPalette.vue";
const _props = defineProps({
  size: { type: null, required: false },
  close: { type: [Boolean, Object], required: false, default: true },
  input: { type: [Boolean, Object], required: false },
  shortcut: { type: String, required: false, default: "meta_k" },
  links: { type: Array, required: false },
  navigation: { type: Array, required: false },
  files: { type: Array, required: false },
  fuse: { type: Object, required: false },
  search: { type: Function, required: false },
  searchStatus: { type: String, required: false },
  searchDelay: { type: Number, required: false, default: 100 },
  colorMode: { type: Boolean, required: false, default: true },
  class: { type: null, required: false },
  ui: { type: Object, required: false },
  title: { type: String, required: false },
  description: { type: String, required: false },
  overlay: { type: Boolean, required: false },
  transition: { type: Boolean, required: false },
  content: { type: Object, required: false },
  dismissible: { type: Boolean, required: false },
  fullscreen: { type: Boolean, required: false, default: false },
  modal: { type: Boolean, required: false },
  portal: { type: [Boolean, String], required: false, skipCheck: true },
  unmountOnHide: { type: Boolean, required: false },
  icon: { type: [String, Boolean], required: false, skipCheck: true },
  trailingIcon: { type: null, required: false },
  selectedIcon: { type: null, required: false },
  childrenIcon: { type: null, required: false },
  placeholder: { type: String, required: false },
  autofocus: { type: Boolean, required: false },
  loading: { type: Boolean, required: false },
  loadingIcon: { type: null, required: false },
  closeIcon: { type: null, required: false },
  back: { type: [Boolean, Object], required: false },
  backIcon: { type: null, required: false },
  disabled: { type: Boolean, required: false },
  highlightOnHover: { type: Boolean, required: false },
  labelKey: { type: null, required: false },
  descriptionKey: { type: null, required: false },
  preserveGroupOrder: { type: Boolean, required: false },
  virtualize: { type: [Boolean, Object], required: false },
  groups: { type: Array, required: false }
});
const slots = defineSlots();
const props = useComponentProps("contentSearch", _props);
const searchTerm = defineModel("searchTerm", { type: String, ...{ default: "" } });
const { t } = useLocale();
const { open, mapNavigationItems, mapLinks, mapSearchResults, postFilter } = useContentSearch();
const colorMode = useColorMode();
const appConfig = useAppConfig();
const commandPaletteProps = useForwardProps(reactivePick(props, "size", "icon", "trailingIcon", "selectedIcon", "childrenIcon", "placeholder", "autofocus", "loading", "loadingIcon", "close", "closeIcon", "back", "backIcon", "disabled", "highlightOnHover", "labelKey", "descriptionKey", "preserveGroupOrder", "virtualize", "searchDelay"));
const modalProps = useForwardProps(reactivePick(props, "overlay", "transition", "content", "dismissible", "fullscreen", "modal", "portal", "unmountOnHide"));
const inputProps = computed(() => {
  if (props.input === false) {
    return false;
  }
  return defu(typeof props.input === "object" ? props.input : {}, { fixed: true });
});
const getProxySlots = () => omit(slots, ["content"]);
const fuse = computed(() => defu({}, props.fuse, {
  fuseOptions: {
    includeMatches: true,
    useTokenSearch: true
  },
  resultLimit: 12
}));
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.contentSearch || {} })({
  size: props.size,
  fullscreen: props.fullscreen
}));
const commandPaletteRef = useTemplateRef("commandPaletteRef");
const debouncedSearchTerm = refDebounced(searchTerm, () => props.searchDelay);
const rawSearchResults = shallowRef([]);
const searchResults = computed(() => mapSearchResults(rawSearchResults.value, props.navigation));
let searchRequestId = 0;
async function runSearch(term) {
  const requestId = ++searchRequestId;
  if (!props.search || !term) {
    rawSearchResults.value = [];
    return;
  }
  try {
    const results = await props.search(term, {
      limit: fuse.value.resultLimit,
      snippet: { columns: ["title", "content"], around: 20 }
    });
    if (requestId !== searchRequestId) return;
    rawSearchResults.value = results;
  } catch (err) {
    if (requestId !== searchRequestId) return;
    console.error("[ContentSearch] search failed:", err);
    rawSearchResults.value = [];
  }
}
watch(debouncedSearchTerm, runSearch);
watch(() => props.search, () => {
  if (debouncedSearchTerm.value) {
    runSearch(debouncedSearchTerm.value);
  }
});
watch(() => props.searchStatus, (status) => {
  if (status === "ready" && debouncedSearchTerm.value) {
    runSearch(debouncedSearchTerm.value);
  }
});
const linksGroup = computed(() => {
  if (!props.links?.length) {
    return null;
  }
  return { id: "links", label: t("contentSearch.links"), items: mapLinks(props.links) };
});
const searchGroups = computed(() => {
  if (!searchTerm.value || !searchResults.value.length) return [];
  return [{ id: "search", label: t("contentSearch.search"), items: searchResults.value, ignoreFilter: true }];
});
const navigationGroups = computed(() => {
  if (!props.navigation?.length) {
    return [];
  }
  if (props.navigation.some((link) => !!link.children?.length)) {
    return props.navigation.map((group) => ({
      id: group.path,
      label: group.title,
      items: mapNavigationItems(group.children || [], props.files || []),
      postFilter
    }));
  } else {
    return [{ id: "docs", items: mapNavigationItems(props.navigation, props.files || []), postFilter }];
  }
});
const themeGroup = computed(() => {
  if (!props.colorMode || colorMode?.forced) {
    return null;
  }
  return {
    id: "theme",
    label: t("contentSearch.theme"),
    items: [{
      label: t("colorMode.system"),
      icon: appConfig.ui.icons.system,
      active: colorMode.preference === "system",
      onSelect: () => {
        colorMode.preference = "system";
      }
    }, {
      label: t("colorMode.light"),
      icon: appConfig.ui.icons.light,
      active: colorMode.preference === "light",
      onSelect: () => {
        colorMode.preference = "light";
      }
    }, {
      label: t("colorMode.dark"),
      icon: appConfig.ui.icons.dark,
      active: colorMode.preference === "dark",
      onSelect: () => {
        colorMode.preference = "dark";
      }
    }]
  };
});
const groups = computed(() => {
  const groups2 = [];
  if (linksGroup.value) {
    groups2.push(linksGroup.value);
  }
  if (props.search) {
    groups2.push(...searchGroups.value);
  } else {
    groups2.push(...navigationGroups.value);
  }
  groups2.push(...props.groups || []);
  if (themeGroup.value) {
    groups2.push(themeGroup.value);
  }
  return groups2;
});
function onSelect(item) {
  if (item.disabled) {
    return;
  }
  open.value = false;
  searchTerm.value = "";
}
defineShortcuts({
  [props.shortcut]: {
    usingInput: true,
    handler: () => open.value = !open.value
  }
});
defineExpose({
  commandPaletteRef
});
</script>

<template>
  <UModal
    v-model:open="open"
    :title="props.title || t('contentSearch.title')"
    :description="props.description || t('contentSearch.description')"
    v-bind="modalProps"
    data-slot="modal"
    :class="ui.modal({ class: [props.ui?.modal, props.class] })"
  >
    <template #content="contentData">
      <slot name="content" v-bind="contentData">
        <UCommandPalette
          ref="commandPaletteRef"
          v-model:search-term="searchTerm"
          v-bind="commandPaletteProps"
          :groups="groups"
          :fuse="fuse"
          :input="inputProps"
          :ui="transformUI(omit(ui, ['modal']), props.ui)"
          @update:model-value="onSelect"
          @update:open="open = $event"
        >
          <template v-for="(_, name) in getProxySlots()" #[name]="slotData">
            <slot :name="name" v-bind="slotData" />
          </template>
        </UCommandPalette>
      </slot>
    </template>
  </UModal>
</template>
```


## content/ContentSearchButton.vue

```vue
<script>
import theme from "#build/ui/content/content-search-button";
</script>

<script setup>
import { computed, toRef } from "vue";
import { defu } from "defu";
import { reactiveOmit, createReusableTemplate } from "@vueuse/core";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../../composables/useComponentProps";
import { useForwardProps } from "../../composables/useForwardProps";
import { useContentSearch } from "../../composables/useContentSearch";
import { useLocale } from "../../composables/useLocale";
import { omit, transformUI } from "../../utils";
import { tv } from "../../utils/tv";
import UButton from "../Button.vue";
import UKbd from "../Kbd.vue";
import UTooltip from "../Tooltip.vue";
defineOptions({ inheritAttrs: false });
const _props = defineProps({
  icon: { type: [String, Boolean], required: false, skipCheck: true },
  label: { type: String, required: false },
  color: { type: null, required: false, default: "neutral" },
  variant: { type: null, required: false },
  collapsed: { type: Boolean, required: false, default: true },
  tooltip: { type: [Boolean, Object], required: false, default: false },
  kbds: { type: Array, required: false, default: () => ["meta", "k"] },
  ui: { type: Object, required: false },
  class: { type: null, required: false },
  activeColor: { type: null, required: false },
  activeVariant: { type: null, required: false },
  size: { type: null, required: false },
  square: { type: Boolean, required: false },
  block: { type: Boolean, required: false },
  loadingAuto: { type: Boolean, required: false },
  onClick: { type: [Function, Array], required: false },
  avatar: { type: Object, required: false },
  leading: { type: Boolean, required: false },
  leadingIcon: { type: null, required: false },
  trailing: { type: Boolean, required: false },
  trailingIcon: { type: null, required: false },
  loading: { type: Boolean, required: false },
  loadingIcon: { type: null, required: false },
  as: { type: null, required: false },
  type: { type: null, required: false },
  disabled: { type: Boolean, required: false },
  exactActiveClass: { type: String, required: false },
  viewTransition: { type: Boolean, required: false }
});
const slots = defineSlots();
const props = useComponentProps("contentSearchButton", _props);
const [DefineButtonTemplate, ReuseButtonTemplate] = createReusableTemplate();
const getProxySlots = () => omit(slots, ["trailing"]);
const buttonProps = useForwardProps(reactiveOmit(props, "icon", "label", "variant", "collapsed", "tooltip", "kbds", "class", "ui"));
const tooltipProps = toRef(() => defu(typeof props.tooltip === "boolean" ? {} : props.tooltip, { delayDuration: 0, content: { side: "right" } }));
const { t } = useLocale();
const { open } = useContentSearch();
const appConfig = useAppConfig();
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.contentSearchButton || {} })({
  collapsed: props.collapsed
}));
</script>

<template>
  <DefineButtonTemplate>
    <UButton
      :icon="props.icon === false ? void 0 : props.icon ?? appConfig.ui.icons.search"
      :label="props.label || t('contentSearchButton.label')"
      :variant="props.variant || (props.collapsed ? 'ghost' : 'outline')"
      v-bind="{
  ...buttonProps,
  ...props.collapsed ? {
    'square': true,
    'aria-label': props.label || t('contentSearchButton.label')
  } : {},
  ...$attrs
}"
      :class="ui.base({ class: [props.ui?.base, props.class] })"
      :ui="transformUI(ui, props.ui)"
      @click="open = true"
    >
      <template v-for="(_, name) in getProxySlots()" #[name]="slotData">
        <slot :name="name" v-bind="slotData" />
      </template>

      <template #trailing="{ ui: uiProxy }">
        <div data-slot="trailing" :class="ui.trailing({ class: props.ui?.trailing })">
          <slot name="trailing" :ui="uiProxy">
            <template v-if="props.kbds?.length">
              <UKbd v-for="(kbd, index) in props.kbds" :key="index" variant="subtle" v-bind="typeof kbd === 'string' ? { value: kbd } : kbd" />
            </template>
          </slot>
        </div>
      </template>
    </UButton>
  </DefineButtonTemplate>

  <UTooltip v-if="props.collapsed && props.tooltip" :text="props.label || t('contentSearchButton.label')" v-bind="tooltipProps">
    <ReuseButtonTemplate />
  </UTooltip>
  <ReuseButtonTemplate v-else />
</template>
```


## content/ContentSurround.vue

```vue
<script>
import theme from "#build/ui/content/content-surround";
</script>

<script setup>
import { computed } from "vue";
import { Primitive } from "reka-ui";
import { createReusableTemplate } from "@vueuse/core";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../../composables/useComponentProps";
import { useLocale } from "../../composables/useLocale";
import { usePrefix } from "../../composables/usePrefix";
import { tv } from "../../utils/tv";
import ULink from "../Link.vue";
import UIcon from "../Icon.vue";
defineOptions({ inheritAttrs: false });
const _props = defineProps({
  as: { type: null, required: false },
  prevIcon: { type: null, required: false },
  nextIcon: { type: null, required: false },
  surround: { type: Array, required: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false }
});
defineSlots();
const props = useComponentProps("contentSurround", _props);
const { dir } = useLocale();
const appConfig = useAppConfig();
const prefix = usePrefix();
const [DefineLinkTemplate, ReuseLinkTemplate] = createReusableTemplate({
  props: {
    link: Object,
    icon: String,
    direction: String
  }
});
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.contentSurround || {} })());
const prevIcon = computed(() => props.prevIcon || (dir.value === "rtl" ? appConfig.ui.icons.arrowRight : appConfig.ui.icons.arrowLeft));
const nextIcon = computed(() => props.nextIcon || (dir.value === "rtl" ? appConfig.ui.icons.arrowLeft : appConfig.ui.icons.arrowRight));
</script>

<template>
  <DefineLinkTemplate v-slot="{ link, icon, direction }">
    <ULink v-if="link" :to="link.path" raw data-slot="link" :class="ui.link({ class: [props.ui?.link, link.ui?.link, link.class], direction })">
      <slot name="link" :link="link" :ui="ui">
        <div data-slot="linkLeading" :class="ui.linkLeading({ class: [props.ui?.linkLeading, link.ui?.linkLeading] })">
          <slot name="link-leading" :link="link" :ui="ui">
            <UIcon :name="link.icon || icon" data-slot="linkLeadingIcon" :class="ui.linkLeadingIcon({ class: [props.ui?.linkLeadingIcon, link.ui?.linkLeadingIcon], direction })" />
          </slot>
        </div>

        <p data-slot="linkTitle" :class="ui.linkTitle({ class: [props.ui?.linkTitle, link.ui?.linkTitle] })">
          <slot name="link-title" :link="link" :ui="ui">
            {{ link.title }}
          </slot>
        </p>

        <p data-slot="linkDescription" :class="ui.linkDescription({ class: [props.ui?.linkDescription, link.ui?.linkDescription] })">
          <slot name="link-description" :link="link" :ui="ui">
            {{ link.description }}
          </slot>
        </p>
      </slot>
    </ULink>
    <span v-else :class="prefix('hidden sm:block')">&nbsp;</span>
  </DefineLinkTemplate>

  <Primitive v-if="props.surround" :as="props.as" data-slot="root" v-bind="$attrs" :class="ui.root({ class: [props.ui?.root, props.class] })">
    <ReuseLinkTemplate :link="props.surround[0]" :icon="prevIcon" direction="left" />
    <ReuseLinkTemplate :link="props.surround[1]" :icon="nextIcon" direction="right" />
  </Primitive>
</template>
```


## content/ContentToc.vue

```vue
<script>
import theme from "#build/ui/content/content-toc";
</script>

<script setup>
import { computed, onUnmounted, useTemplateRef, watch, nextTick } from "vue";
import { CollapsibleRoot, CollapsibleTrigger, CollapsibleContent } from "reka-ui";
import { reactivePick, createReusableTemplate } from "@vueuse/core";
import { useRouter, useAppConfig, useNuxtApp } from "#imports";
import { useComponentProps } from "../../composables/useComponentProps";
import { useForwardProps } from "../../composables/useForwardProps";
import { useScrollspy } from "../../composables/useScrollspy";
import { useScrollShadow } from "../../composables/useScrollShadow";
import { useLocale } from "../../composables/useLocale";
import { usePrefix } from "../../composables/usePrefix";
import { tv } from "../../utils/tv";
import UIcon from "../Icon.vue";
defineOptions({ inheritAttrs: false });
const _props = defineProps({
  as: { type: null, required: false, default: "nav" },
  trailingIcon: { type: null, required: false },
  title: { type: String, required: false },
  color: { type: null, required: false },
  highlight: { type: Boolean, required: false },
  highlightColor: { type: null, required: false },
  highlightVariant: { type: null, required: false },
  links: { type: Array, required: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false },
  defaultOpen: { type: Boolean, required: false },
  open: { type: Boolean, required: false }
});
const emits = defineEmits(["update:open", "move"]);
const slots = defineSlots();
const props = useComponentProps("contentToc", _props);
const rootProps = useForwardProps(reactivePick(props, "as", "open", "defaultOpen"), emits);
const { t } = useLocale();
const router = useRouter();
const appConfig = useAppConfig();
const { activeHeadings, updateHeadings } = useScrollspy();
const prefix = usePrefix();
const contentRef = useTemplateRef("contentRef");
const { style: scrollShadowStyle } = useScrollShadow(contentRef);
const [DefineListTemplate, ReuseListTemplate] = createReusableTemplate({
  props: {
    links: Array,
    level: Number
  }
});
const [DefineTriggerTemplate, ReuseTriggerTemplate] = createReusableTemplate();
const [DefineContentTemplate, ReuseContentTemplate] = createReusableTemplate();
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.contentToc || {} })({
  color: props.color,
  highlight: props.highlight,
  highlightVariant: props.highlightVariant,
  highlightColor: props.highlightColor || props.color
}));
function scrollToHeading(id) {
  const encodedId = encodeURIComponent(id);
  router.push(`#${encodedId}`);
  emits("move", id);
}
function flattenLinks(links) {
  return links.flatMap((link) => [link, ...link.children ? flattenLinks(link.children) : []]);
}
function flattenLinksWithLevel(links, level = 0) {
  return links.flatMap((link) => [
    { link, level },
    ...link.children ? flattenLinksWithLevel(link.children, level + 1) : []
  ]);
}
const linkHeight = 1.75;
const activeIndex = computed(() => {
  if (!activeHeadings.value?.length) {
    return -1;
  }
  return flattenLinks(props.links || []).findIndex((link) => activeHeadings.value.includes(link.id));
});
const listStyle = computed(() => ({
  "--list-height": `${flattenLinks(props.links || []).length * linkHeight}rem`
}));
const indicatorStyle = computed(() => {
  if (!activeHeadings.value?.length) {
    return;
  }
  return {
    "--indicator-size": `${linkHeight * activeHeadings.value.length}rem`,
    "--indicator-position": activeIndex.value >= 0 ? `${activeIndex.value * linkHeight}rem` : "0rem"
  };
});
watch(activeIndex, (index) => {
  const container = contentRef.value;
  if (index < 0 || !container) {
    return;
  }
  nextTick(() => {
    const link = container.querySelectorAll('a[data-slot="link"]')[index];
    if (!link) {
      return;
    }
    const containerRect = container.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    const linkOffset = linkRect.top - containerRect.top + container.scrollTop;
    container.scrollTo({
      top: linkOffset - container.clientHeight / 2 + linkRect.height / 2,
      behavior: "smooth"
    });
  });
});
const circuitMaskStyle = computed(() => {
  if (!props.highlight || props.highlightVariant !== "circuit" || !props.links?.length) {
    return;
  }
  const flatLinks = flattenLinksWithLevel(props.links);
  const svgUnit = 16;
  const svgLinkHeight = linkHeight * svgUnit;
  const svgHeight = flatLinks.length * svgLinkHeight;
  const x0 = 0.5;
  const x1 = 10.5;
  let path = "";
  let currentX = x0;
  let y = 0;
  flatLinks.forEach((item, index) => {
    const targetX = item.level > 0 ? x1 : x0;
    const nextY = y + svgLinkHeight;
    if (index === 0) {
      path += `M${targetX} ${y}`;
      currentX = targetX;
    }
    if (targetX !== currentX) {
      path += ` L${targetX} ${y + 6}`;
      currentX = targetX;
    }
    path += ` L${currentX} ${nextY - (index < flatLinks.length - 1 && flatLinks[index + 1]?.level !== item.level ? 6 : 0)}`;
    y = nextY;
  });
  const svgPath = encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 ${svgHeight}'><path d='${path}' stroke='black' stroke-width='1' fill='none'/></svg>`);
  return {
    width: "0.75rem",
    height: `${flatLinks.length * linkHeight}rem`,
    maskImage: `url("data:image/svg+xml,${svgPath}")`
  };
});
const nuxtApp = useNuxtApp();
function refreshHeadings() {
  const flatLinks = flattenLinks(props.links || []);
  if (!flatLinks.length) {
    updateHeadings([]);
    return;
  }
  const selector = flatLinks.map((l) => `#${CSS.escape(l.id)}`).join(", ");
  const headings = Array.from(document.querySelectorAll(selector));
  updateHeadings(headings);
}
const offLoadingEnd = nuxtApp.hooks.hook("page:loading:end", refreshHeadings);
const offTransitionFinish = nuxtApp.hooks.hook("page:transition:finish", refreshHeadings);
onUnmounted(() => {
  offLoadingEnd();
  offTransitionFinish();
});
</script>

<template>
  <!-- eslint-disable-next-line vue/no-template-shadow -->
  <DefineListTemplate v-slot="{ links, level }">
    <ul :class="level > 0 ? ui.listWithChildren({ class: props.ui?.listWithChildren }) : ui.list({ class: props.ui?.list })">
      <li v-for="(link, index) in links" :key="index" :class="link.children && link.children.length > 0 ? ui.itemWithChildren({ class: [props.ui?.itemWithChildren, link.ui?.itemWithChildren] }) : ui.item({ class: [props.ui?.item, link.ui?.item] })">
        <a :href="`#${link.id}`" data-slot="link" :class="ui.link({ class: [props.ui?.link, link.ui?.link, link.class], active: activeHeadings.includes(link.id) })" @click.prevent="scrollToHeading(link.id)">
          <slot name="link" :link="link">
            <span data-slot="linkText" :class="ui.linkText({ class: [props.ui?.linkText, link.ui?.linkText] })">
              {{ link.text }}
            </span>
          </slot>
        </a>

        <ReuseListTemplate v-if="link.children?.length" :links="link.children" :level="level + 1" />
      </li>
    </ul>
  </DefineListTemplate>

  <DefineTriggerTemplate v-slot="{ open }">
    <slot name="leading" :open="open" :ui="ui" />

    <span data-slot="title" :class="ui.title({ class: props.ui?.title })">
      <slot :open="open">{{ props.title || t("contentToc.title") }}</slot>
    </span>

    <span data-slot="trailing" :class="ui.trailing({ class: props.ui?.trailing })">
      <slot name="trailing" :open="open" :ui="ui">
        <UIcon :name="props.trailingIcon || appConfig.ui.icons.chevronDown" data-slot="trailingIcon" :class="ui.trailingIcon({ class: props.ui?.trailingIcon })" />
      </slot>
    </span>
  </DefineTriggerTemplate>

  <DefineContentTemplate>
    <div v-if="props.highlight" data-slot="indicator" :class="ui.indicator({ class: props.ui?.indicator })" :style="{ ...indicatorStyle, ...circuitMaskStyle || {} }">
      <div data-slot="indicatorLine" :class="ui.indicatorLine({ class: props.ui?.indicatorLine })" />
      <div v-if="indicatorStyle" data-slot="indicatorActive" :class="ui.indicatorActive({ class: props.ui?.indicatorActive })" />
    </div>

    <slot name="content" :links="props.links">
      <ReuseListTemplate :links="props.links" :level="0" />
    </slot>
  </DefineContentTemplate>

  <CollapsibleRoot v-slot="{ open }" data-slot="root" v-bind="{ ...rootProps, ...$attrs }" :default-open="props.defaultOpen" :class="ui.root({ class: [props.ui?.root, props.class] })">
    <div data-slot="container" :class="ui.container({ class: props.ui?.container })">
      <div v-if="!!slots.top" data-slot="top" :class="ui.top({ class: props.ui?.top })">
        <slot name="top" :links="props.links" />
      </div>

      <template v-if="props.links?.length">
        <CollapsibleTrigger data-slot="trigger" :class="ui.trigger({ class: [props.ui?.trigger, prefix('lg:hidden')] })">
          <ReuseTriggerTemplate :open="open" />
        </CollapsibleTrigger>

        <CollapsibleContent data-slot="content" :class="ui.content({ class: [props.ui?.content, prefix('lg:hidden')] })">
          <ReuseContentTemplate />
        </CollapsibleContent>

        <p data-slot="trigger" :class="ui.trigger({ class: [props.ui?.trigger, prefix('hidden lg:flex')] })">
          <ReuseTriggerTemplate :open="open" />
        </p>

        <div ref="contentRef" data-slot="content" :class="ui.content({ class: [props.ui?.content, prefix('hidden lg:flex')] })" :style="[listStyle, scrollShadowStyle]">
          <ReuseContentTemplate />
        </div>
      </template>

      <div v-if="!!slots.bottom" data-slot="bottom" :class="ui.bottom({ class: props.ui?.bottom, body: !!slots.top || !!props.links?.length })">
        <slot name="bottom" :links="props.links" />
      </div>
    </div>
  </CollapsibleRoot>
</template>
```


## ContextMenu.vue

```vue
<script>
import theme from "#build/ui/context-menu";
</script>

<script setup>
import { computed, toRef } from "vue";
import { ContextMenuRoot, ContextMenuTrigger } from "reka-ui";
import { useForwardProps } from "../composables/useForwardProps";
import { reactivePick } from "@vueuse/core";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { omit } from "../utils";
import { tv } from "../utils/tv";
import UContextMenuContent from "./ContextMenuContent.vue";
const _props = defineProps({
  size: { type: null, required: false },
  items: { type: null, required: false },
  checkedIcon: { type: null, required: false },
  loadingIcon: { type: null, required: false },
  externalIcon: { type: [Boolean, String], required: false, skipCheck: true, default: true },
  content: { type: Object, required: false },
  portal: { type: [Boolean, String], required: false, skipCheck: true, default: true },
  labelKey: { type: null, required: false, default: "label" },
  descriptionKey: { type: null, required: false, default: "description" },
  disabled: { type: Boolean, required: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false },
  pressOpenDelay: { type: Number, required: false },
  modal: { type: Boolean, required: false, default: true }
});
const emits = defineEmits(["update:open"]);
const slots = defineSlots();
const props = useComponentProps("contextMenu", _props);
const appConfig = useAppConfig();
const rootProps = useForwardProps(reactivePick(props, "modal"), emits);
const contentProps = toRef(() => props.content);
const getProxySlots = () => omit(slots, ["default"]);
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.contextMenu || {} })({
  size: props.size
}));
</script>

<template>
  <ContextMenuRoot v-bind="rootProps">
    <ContextMenuTrigger v-if="!!slots.default" as-child :disabled="props.disabled" :class="props.class">
      <slot />
    </ContextMenuTrigger>

    <UContextMenuContent
      :class="ui.content({ class: [!slots.default && props.class, props.ui?.content] })"
      :ui="ui"
      :ui-override="props.ui"
      v-bind="contentProps"
      :items="props.items"
      :portal="props.portal"
      :label-key="props.labelKey"
      :description-key="props.descriptionKey"
      :checked-icon="props.checkedIcon"
      :loading-icon="props.loadingIcon"
      :external-icon="props.externalIcon"
    >
      <template v-for="(_, name) in getProxySlots()" #[name]="slotData">
        <slot :name="name" v-bind="slotData" />
      </template>
    </UContextMenuContent>
  </ContextMenuRoot>
</template>
```


## ContextMenuContent.vue

```vue
<script>

</script>

<script setup>
import { computed, toRef } from "vue";
import { ContextMenu } from "reka-ui/namespaced";
import { useForwardPropsEmits } from "reka-ui";
import { reactiveOmit, createReusableTemplate } from "@vueuse/core";
import { useAppConfig } from "#imports";
import { FieldGroupReset } from "../composables/useFieldGroup";
import { useLocale } from "../composables/useLocale";
import { usePortal } from "../composables/usePortal";
import { omit, get, isArrayOfArray } from "../utils";
import { pickLinkProps } from "../utils/link";
import ULinkBase from "./LinkBase.vue";
import ULink from "./Link.vue";
import UAvatar from "./Avatar.vue";
import UIcon from "./Icon.vue";
import UKbd from "./Kbd.vue";
import UContextMenuContent from "./ContextMenuContent.vue";
const props = defineProps({
  items: { type: null, required: false },
  portal: { type: [Boolean, String], required: false, skipCheck: true },
  sub: { type: Boolean, required: false },
  labelKey: { type: null, required: true },
  descriptionKey: { type: null, required: true },
  checkedIcon: { type: null, required: false },
  loadingIcon: { type: null, required: false },
  externalIcon: { type: [Boolean, String], required: false, skipCheck: true },
  class: { type: null, required: false },
  ui: { type: null, required: true },
  uiOverride: { type: null, required: false },
  loop: { type: Boolean, required: false },
  memoDependencies: { type: Array, required: false },
  sideFlip: { type: Boolean, required: false },
  alignOffset: { type: Number, required: false },
  alignFlip: { type: Boolean, required: false },
  avoidCollisions: { type: Boolean, required: false },
  collisionBoundary: { type: null, required: false },
  collisionPadding: { type: [Number, Object], required: false },
  hideShiftedArrow: { type: Boolean, required: false },
  sticky: { type: String, required: false },
  hideWhenDetached: { type: Boolean, required: false },
  positionStrategy: { type: String, required: false },
  disableUpdateOnLayoutShift: { type: Boolean, required: false },
  prioritizePosition: { type: Boolean, required: false },
  reference: { type: null, required: false }
});
const emits = defineEmits(["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "closeAutoFocus"]);
const slots = defineSlots();
const { dir } = useLocale();
const appConfig = useAppConfig();
const portalProps = usePortal(toRef(() => props.portal));
const contentProps = useForwardPropsEmits(reactiveOmit(props, "sub", "items", "portal", "labelKey", "descriptionKey", "checkedIcon", "loadingIcon", "externalIcon", "class", "ui", "uiOverride"), emits);
const getProxySlots = () => omit(slots, ["default"]);
const [DefineItemTemplate, ReuseItemTemplate] = createReusableTemplate();
const childrenIcon = computed(() => dir.value === "rtl" ? appConfig.ui.icons.chevronLeft : appConfig.ui.icons.chevronRight);
const groups = computed(
  () => props.items?.length ? isArrayOfArray(props.items) ? props.items : [props.items] : []
);
</script>

<template>
  <DefineItemTemplate v-slot="{ item, active, index }">
    <slot :name="item.slot || 'item'" :item="item" :index="index" :ui="ui">
      <slot :name="item.slot ? `${item.slot}-leading` : 'item-leading'" :item="item" :active="active" :index="index" :ui="ui">
        <UIcon v-if="item.loading" :name="loadingIcon || appConfig.ui.icons.loading" data-slot="itemLeadingIcon" :class="ui.itemLeadingIcon({ class: [uiOverride?.itemLeadingIcon, item.ui?.itemLeadingIcon], color: item?.color, loading: true })" />
        <UIcon v-else-if="item.icon" :name="item.icon" data-slot="itemLeadingIcon" :class="ui.itemLeadingIcon({ class: [uiOverride?.itemLeadingIcon, item.ui?.itemLeadingIcon], color: item?.color, active })" />
        <UAvatar v-else-if="item.avatar" :size="item.ui?.itemLeadingAvatarSize || uiOverride?.itemLeadingAvatarSize || ui.itemLeadingAvatarSize()" v-bind="item.avatar" data-slot="itemLeadingAvatar" :class="ui.itemLeadingAvatar({ class: [uiOverride?.itemLeadingAvatar, item.ui?.itemLeadingAvatar], active })" />
      </slot>

      <span v-if="get(item, props.labelKey) || !!slots[item.slot ? `${item.slot}-label` : 'item-label'] || (get(item, props.descriptionKey) || !!slots[item.slot ? `${item.slot}-description` : 'item-description'])" data-slot="itemWrapper" :class="ui.itemWrapper({ class: [uiOverride?.itemWrapper, item.ui?.itemWrapper] })">
        <span data-slot="itemLabel" :class="ui.itemLabel({ class: [uiOverride?.itemLabel, item.ui?.itemLabel], active })">
          <slot :name="item.slot ? `${item.slot}-label` : 'item-label'" :item="item" :active="active" :index="index">
            {{ get(item, props.labelKey) }}
          </slot>

          <UIcon v-if="item.target === '_blank' && externalIcon !== false" :name="typeof externalIcon === 'string' ? externalIcon : appConfig.ui.icons.external" data-slot="itemLabelExternalIcon" :class="ui.itemLabelExternalIcon({ class: [uiOverride?.itemLabelExternalIcon, item.ui?.itemLabelExternalIcon], color: item?.color, active })" />
        </span>

        <span v-if="get(item, props.descriptionKey) || !!slots[item.slot ? `${item.slot}-description` : 'item-description']" data-slot="itemDescription" :class="ui.itemDescription({ class: [uiOverride?.itemDescription, item.ui?.itemDescription] })">
          <slot :name="item.slot ? `${item.slot}-description` : 'item-description'" :item="item" :active="active" :index="index">
            {{ get(item, props.descriptionKey) }}
          </slot>
        </span>
      </span>

      <span data-slot="itemTrailing" :class="ui.itemTrailing({ class: [uiOverride?.itemTrailing, item.ui?.itemTrailing] })">
        <slot :name="item.slot ? `${item.slot}-trailing` : 'item-trailing'" :item="item" :active="active" :index="index" :ui="ui">
          <UIcon v-if="item.children?.length" :name="childrenIcon" data-slot="itemTrailingIcon" :class="ui.itemTrailingIcon({ class: [uiOverride?.itemTrailingIcon, item.ui?.itemTrailingIcon], color: item?.color, active })" />
          <span v-else-if="item.kbds?.length" data-slot="itemTrailingKbds" :class="ui.itemTrailingKbds({ class: [uiOverride?.itemTrailingKbds, item.ui?.itemTrailingKbds] })">
            <UKbd v-for="(kbd, kbdIndex) in item.kbds" :key="kbdIndex" :size="item.ui?.itemTrailingKbdsSize || uiOverride?.itemTrailingKbdsSize || ui.itemTrailingKbdsSize()" v-bind="typeof kbd === 'string' ? { value: kbd } : kbd" />
          </span>
        </slot>

        <ContextMenu.ItemIndicator as-child>
          <UIcon :name="checkedIcon || appConfig.ui.icons.check" data-slot="itemTrailingIcon" :class="ui.itemTrailingIcon({ class: [uiOverride?.itemTrailingIcon, item.ui?.itemTrailingIcon], color: item?.color })" />
        </ContextMenu.ItemIndicator>
      </span>
    </slot>
  </DefineItemTemplate>

  <ContextMenu.Portal v-bind="portalProps">
    <FieldGroupReset>
      <component :is="sub ? ContextMenu.SubContent : ContextMenu.Content" data-slot="content" :class="ui.content({ class: [uiOverride?.content, props.class] })" v-bind="contentProps">
        <slot name="content-top" :sub="sub ?? false" />

        <div role="presentation" data-slot="viewport" :class="ui.viewport({ class: uiOverride?.viewport })">
          <ContextMenu.Group v-for="(group, groupIndex) in groups" :key="`group-${groupIndex}`" data-slot="group" :class="ui.group({ class: uiOverride?.group })">
            <template v-for="(item, index) in group" :key="`group-${groupIndex}-${index}`">
              <ContextMenu.Label v-if="item.type === 'label'" data-slot="label" :class="ui.label({ class: [uiOverride?.label, item.ui?.label, item.class] })">
                <ReuseItemTemplate :item="item" :index="index" />
              </ContextMenu.Label>
              <ContextMenu.Separator v-else-if="item.type === 'separator'" data-slot="separator" :class="ui.separator({ class: [uiOverride?.separator, item.ui?.separator, item.class] })" />
              <ContextMenu.Sub v-else-if="item?.children?.length" :open="item.open" :default-open="item.defaultOpen">
                <ContextMenu.SubTrigger
                  as="button"
                  type="button"
                  :disabled="item.disabled"
                  :text-value="get(item, props.labelKey)"
                  data-slot="item"
                  :class="ui.item({ class: [uiOverride?.item, item.ui?.item, item.class], color: item?.color })"
                >
                  <ReuseItemTemplate :item="item" :index="index" />
                </ContextMenu.SubTrigger>

                <UContextMenuContent
                  sub
                  :class="item.ui?.content"
                  :ui="ui"
                  :ui-override="uiOverride"
                  :portal="portal"
                  :items="item.children"
                  :align-offset="-4"
                  :label-key="labelKey"
                  :description-key="descriptionKey"
                  :checked-icon="checkedIcon"
                  :loading-icon="loadingIcon"
                  :external-icon="externalIcon"
                  v-bind="item.content"
                >
                  <template v-for="(_, name) in getProxySlots()" #[name]="slotData">
                    <slot :name="name" v-bind="slotData" />
                  </template>
                </UContextMenuContent>
              </ContextMenu.Sub>
              <ContextMenu.CheckboxItem
                v-else-if="item.type === 'checkbox'"
                :model-value="item.checked"
                :disabled="item.disabled"
                :text-value="get(item, props.labelKey)"
                data-slot="item"
                :class="ui.item({ class: [uiOverride?.item, item.ui?.item, item.class], color: item?.color })"
                @update:model-value="item.onUpdateChecked"
                @select="item.onSelect"
              >
                <ReuseItemTemplate :item="item" :index="index" />
              </ContextMenu.CheckboxItem>
              <ULink v-else v-slot="{ active, ...slotProps }" v-bind="pickLinkProps(item)" custom>
                <ContextMenu.Item
                  as-child
                  :disabled="item.disabled"
                  :text-value="get(item, props.labelKey)"
                  @select="item.onSelect"
                >
                  <ULinkBase v-bind="slotProps" data-slot="item" :class="ui.item({ class: [uiOverride?.item, item.ui?.item, item.class], active, color: item?.color })">
                    <ReuseItemTemplate :item="item" :active="active" :index="index" />
                  </ULinkBase>
                </ContextMenu.Item>
              </ULink>
            </template>
          </ContextMenu.Group>
        </div>

        <slot />

        <slot name="content-bottom" :sub="sub ?? false" />
      </component>
    </FieldGroupReset>
  </ContextMenu.Portal>
</template>
```


## DashboardGroup.vue

```vue
<script>
import theme from "#build/ui/dashboard-group";
</script>

<script setup>
import { ref, computed } from "vue";
import { Primitive } from "reka-ui";
import { useNuxtApp, useAppConfig } from "#imports";
import { provideDashboardContext } from "../utils/dashboard";
import { tv } from "../utils/tv";
import { useComponentProps } from "../composables/useComponentProps";
const _props = defineProps({
  as: { type: null, required: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false },
  storage: { type: String, required: false, default: "cookie" },
  storageKey: { type: String, required: false, default: "dashboard" },
  storageOptions: { type: Object, required: false },
  persistent: { type: Boolean, required: false, default: true },
  unit: { type: String, required: false, default: "%" }
});
defineSlots();
const props = useComponentProps("dashboardGroup", _props);
const nuxtApp = useNuxtApp();
const appConfig = useAppConfig();
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.dashboardGroup || {} }));
const sidebarOpen = ref(false);
const sidebarCollapsed = ref(false);
provideDashboardContext({
  storage: props.storage,
  storageKey: props.storageKey,
  storageOptions: props.storageOptions,
  persistent: props.persistent,
  unit: props.unit,
  sidebarOpen,
  toggleSidebar: () => {
    nuxtApp.hooks.callHook("dashboard:sidebar:toggle");
  },
  sidebarCollapsed,
  collapseSidebar: (collapsed) => {
    nuxtApp.hooks.callHook("dashboard:sidebar:collapse", collapsed);
  },
  toggleSearch: () => {
    nuxtApp.hooks.callHook("dashboard:search:toggle");
  }
});
</script>

<template>
  <Primitive :as="props.as" :class="ui({ class: [props.ui?.base, props.class] })">
    <slot />
  </Primitive>
</template>
```


## DashboardNavbar.vue

```vue
<script>
import theme from "#build/ui/dashboard-navbar";
</script>

<script setup>
import { computed } from "vue";
import { Primitive } from "reka-ui";
import { createReusableTemplate } from "@vueuse/core";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { useDashboard } from "../utils/dashboard";
import { tv } from "../utils/tv";
import UDashboardSidebarToggle from "./DashboardSidebarToggle.vue";
import UIcon from "./Icon.vue";
defineOptions({ inheritAttrs: false });
const _props = defineProps({
  as: { type: null, required: false },
  icon: { type: null, required: false },
  title: { type: String, required: false },
  toggle: { type: [Boolean, Object], required: false, default: true },
  toggleSide: { type: String, required: false, default: "left" },
  class: { type: null, required: false },
  ui: { type: Object, required: false }
});
const slots = defineSlots();
const props = useComponentProps("dashboardNavbar", _props);
const appConfig = useAppConfig();
const dashboardContext = useDashboard({});
const [DefineToggleTemplate, ReuseToggleTemplate] = createReusableTemplate();
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.dashboardNavbar || {} })());
</script>

<template>
  <DefineToggleTemplate>
    <slot name="toggle" v-bind="{ ...dashboardContext, ui }">
      <UDashboardSidebarToggle
        v-if="props.toggle"
        v-bind="typeof props.toggle === 'object' ? props.toggle : {}"
        :side="props.toggleSide"
        data-slot="toggle"
        :class="ui.toggle({ class: props.ui?.toggle, toggleSide: props.toggleSide })"
      />
    </slot>
  </DefineToggleTemplate>

  <Primitive :as="props.as" data-slot="root" v-bind="$attrs" :class="ui.root({ class: [props.ui?.root, props.class] })">
    <div data-slot="left" :class="ui.left({ class: props.ui?.left })">
      <ReuseToggleTemplate v-if="props.toggleSide === 'left'" />

      <slot name="left" v-bind="dashboardContext">
        <slot name="leading" v-bind="{ ...dashboardContext, ui }">
          <UIcon v-if="props.icon" :name="props.icon" data-slot="icon" :class="ui.icon({ class: props.ui?.icon })" />
        </slot>

        <h1 data-slot="title" :class="ui.title({ class: props.ui?.title })">
          <slot name="title">
            {{ props.title }}
          </slot>
        </h1>

        <slot name="trailing" v-bind="{ ...dashboardContext, ui }" />
      </slot>
    </div>

    <div v-if="!!slots.default" data-slot="center" :class="ui.center({ class: props.ui?.center })">
      <slot v-bind="dashboardContext" />
    </div>

    <div data-slot="right" :class="ui.right({ class: props.ui?.right })">
      <slot name="right" v-bind="dashboardContext" />

      <ReuseToggleTemplate v-if="props.toggleSide === 'right'" />
    </div>
  </Primitive>
</template>
```


## DashboardPanel.vue

```vue
<script>
import theme from "#build/ui/dashboard-panel";
</script>

<script setup>
import { computed, useId, toRef } from "vue";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { useResizable } from "../composables/useResizable";
import { useDashboard } from "../utils/dashboard";
import { tv } from "../utils/tv";
import UDashboardResizeHandle from "./DashboardResizeHandle.vue";
defineOptions({ inheritAttrs: false });
const _props = defineProps({
  class: { type: null, required: false },
  ui: { type: Object, required: false },
  id: { type: String, required: false },
  minSize: { type: Number, required: false, default: 15 },
  maxSize: { type: Number, required: false },
  defaultSize: { type: Number, required: false },
  resizable: { type: Boolean, required: false, default: false }
});
defineSlots();
const props = useComponentProps("dashboardPanel", _props);
const appConfig = useAppConfig();
const dashboardContext = useDashboard({ storageKey: "dashboard", unit: "%" });
const id = `${dashboardContext.storageKey}-panel-${props.id || useId()}`;
const { el, size, isDragging, onMouseDown, onTouchStart, onDoubleClick } = useResizable(id, toRef(() => ({ ...dashboardContext, ...props })));
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.dashboardPanel || {} })({
  size: !!size.value
}));
</script>

<template>
  <div
    :id="id"
    ref="el"
    data-slot="root"
    v-bind="$attrs"
    :data-dragging="isDragging"
    :class="ui.root({ class: [props.ui?.root, props.class] })"
    :style="[size ? { '--width': `${size}${dashboardContext.unit}` } : void 0]"
  >
    <slot>
      <slot name="header" />

      <div data-slot="body" :class="ui.body({ class: props.ui?.body })">
        <slot name="body" />
      </div>

      <slot name="footer" />
    </slot>
  </div>

  <slot name="resize-handle" :on-mouse-down="onMouseDown" :on-touch-start="onTouchStart" :on-double-click="onDoubleClick">
    <UDashboardResizeHandle
      v-if="props.resizable"
      :aria-controls="id"
      data-slot="handle"
      :class="ui.handle({ class: props.ui?.handle })"
      @mousedown="onMouseDown"
      @touchstart="onTouchStart"
      @dblclick="onDoubleClick"
    />
  </slot>
</template>
```


## DashboardResizeHandle.vue

```vue
<script>
import theme from "#build/ui/dashboard-resize-handle";
</script>

<script setup>
import { computed } from "vue";
import { Primitive } from "reka-ui";
import { useAppConfig } from "#imports";
import { tv } from "../utils/tv";
import { useComponentProps } from "../composables/useComponentProps";
const _props = defineProps({
  as: { type: null, required: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false }
});
defineSlots();
const props = useComponentProps("dashboardResizeHandle", _props);
const appConfig = useAppConfig();
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.dashboardResizeHandle || {} }));
</script>

<template>
  <Primitive
    :as="props.as"
    role="separator"
    :class="ui({ class: [props.ui?.base, props.class] })"
  >
    <slot />
  </Primitive>
</template>
```


## DashboardSearch.vue

```vue
<script>
import theme from "#build/ui/dashboard-search";
</script>

<script setup>
import { computed, useTemplateRef } from "vue";
import { defu } from "defu";
import { reactivePick } from "@vueuse/core";
import { useAppConfig, useColorMode, defineShortcuts, useRuntimeHook } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { useForwardProps } from "../composables/useForwardProps";
import { useLocale } from "../composables/useLocale";
import { omit, transformUI } from "../utils";
import { tv } from "../utils/tv";
import UCommandPalette from "./CommandPalette.vue";
import UModal from "./Modal.vue";
const _props = defineProps({
  size: { type: null, required: false },
  close: { type: [Boolean, Object], required: false, default: true },
  input: { type: [Boolean, Object], required: false },
  shortcut: { type: String, required: false, default: "meta_k" },
  fuse: { type: Object, required: false },
  searchDelay: { type: Number, required: false, default: 100 },
  colorMode: { type: Boolean, required: false, default: true },
  class: { type: null, required: false },
  ui: { type: Object, required: false },
  title: { type: String, required: false },
  description: { type: String, required: false },
  overlay: { type: Boolean, required: false },
  transition: { type: Boolean, required: false },
  content: { type: Object, required: false },
  dismissible: { type: Boolean, required: false },
  fullscreen: { type: Boolean, required: false, default: false },
  modal: { type: Boolean, required: false },
  portal: { type: [Boolean, String], required: false, skipCheck: true },
  unmountOnHide: { type: Boolean, required: false },
  icon: { type: [String, Boolean], required: false, skipCheck: true },
  trailingIcon: { type: null, required: false },
  selectedIcon: { type: null, required: false },
  childrenIcon: { type: null, required: false },
  placeholder: { type: String, required: false },
  autofocus: { type: Boolean, required: false },
  loading: { type: Boolean, required: false },
  loadingIcon: { type: null, required: false },
  closeIcon: { type: null, required: false },
  back: { type: [Boolean, Object], required: false },
  backIcon: { type: null, required: false },
  disabled: { type: Boolean, required: false },
  highlightOnHover: { type: Boolean, required: false },
  labelKey: { type: null, required: false },
  descriptionKey: { type: null, required: false },
  preserveGroupOrder: { type: Boolean, required: false },
  virtualize: { type: [Boolean, Object], required: false },
  groups: { type: Array, required: false }
});
const slots = defineSlots();
const props = useComponentProps("dashboardSearch", _props);
const open = defineModel("open", { type: Boolean, ...{ default: false } });
const searchTerm = defineModel("searchTerm", { type: String, ...{ default: "" } });
useRuntimeHook("dashboard:search:toggle", () => {
  open.value = !open.value;
});
const { t } = useLocale();
const colorMode = useColorMode();
const appConfig = useAppConfig();
const commandPaletteProps = useForwardProps(reactivePick(props, "size", "icon", "trailingIcon", "selectedIcon", "childrenIcon", "placeholder", "autofocus", "loading", "loadingIcon", "close", "closeIcon", "back", "backIcon", "disabled", "highlightOnHover", "labelKey", "descriptionKey", "preserveGroupOrder", "virtualize", "searchDelay"));
const modalProps = useForwardProps(reactivePick(props, "overlay", "transition", "content", "dismissible", "fullscreen", "modal", "portal", "unmountOnHide"));
const inputProps = computed(() => {
  if (props.input === false) {
    return false;
  }
  return defu(typeof props.input === "object" ? props.input : {}, { fixed: true });
});
const getProxySlots = () => omit(slots, ["content"]);
const fuse = computed(() => defu({}, props.fuse, {
  fuseOptions: {
    useTokenSearch: true
  }
}));
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.dashboardSearch || {} })({
  size: props.size,
  fullscreen: props.fullscreen
}));
const groups = computed(() => {
  const groups2 = [];
  groups2.push(...props.groups || []);
  if (props.colorMode && !colorMode?.forced) {
    groups2.push({
      id: "theme",
      label: t("dashboardSearch.theme"),
      items: [{
        label: t("colorMode.system"),
        icon: appConfig.ui.icons.system,
        active: colorMode.preference === "system",
        onSelect: () => {
          colorMode.preference = "system";
        }
      }, {
        label: t("colorMode.light"),
        icon: appConfig.ui.icons.light,
        active: colorMode.preference === "light",
        onSelect: () => {
          colorMode.preference = "light";
        }
      }, {
        label: t("colorMode.dark"),
        icon: appConfig.ui.icons.dark,
        active: colorMode.preference === "dark",
        onSelect: () => {
          colorMode.preference = "dark";
        }
      }]
    });
  }
  return groups2;
});
const commandPaletteRef = useTemplateRef("commandPaletteRef");
function onSelect(item) {
  if (item.disabled) {
    return;
  }
  open.value = false;
  searchTerm.value = "";
}
defineShortcuts({
  [props.shortcut]: {
    usingInput: true,
    handler: () => open.value = !open.value
  }
});
defineExpose({
  commandPaletteRef
});
</script>

<template>
  <UModal
    v-model:open="open"
    :title="props.title || t('dashboardSearch.title')"
    :description="props.description || t('dashboardSearch.description')"
    v-bind="modalProps"
    data-slot="modal"
    :class="ui.modal({ class: [props.ui?.modal, props.class] })"
  >
    <template #content="contentData">
      <slot name="content" v-bind="contentData">
        <UCommandPalette
          ref="commandPaletteRef"
          v-model:search-term="searchTerm"
          v-bind="commandPaletteProps"
          :groups="groups"
          :fuse="fuse"
          :input="inputProps"
          :ui="transformUI(omit(ui, ['modal']), props.ui)"
          @update:model-value="onSelect"
          @update:open="open = $event"
        >
          <template v-for="(_, name) in getProxySlots()" #[name]="slotData">
            <slot :name="name" v-bind="slotData" />
          </template>
        </UCommandPalette>
      </slot>
    </template>
  </UModal>
</template>
```


## DashboardSearchButton.vue

```vue
<script>
import theme from "#build/ui/dashboard-search-button";
</script>

<script setup>
import { computed, toRef } from "vue";
import { defu } from "defu";
import { reactiveOmit, createReusableTemplate } from "@vueuse/core";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { useForwardProps } from "../composables/useForwardProps";
import { useLocale } from "../composables/useLocale";
import { useDashboard } from "../utils/dashboard";
import { omit, transformUI } from "../utils";
import { tv } from "../utils/tv";
import UButton from "./Button.vue";
import UKbd from "./Kbd.vue";
import UTooltip from "./Tooltip.vue";
defineOptions({ inheritAttrs: false });
const _props = defineProps({
  icon: { type: [String, Boolean], required: false, skipCheck: true },
  label: { type: String, required: false },
  color: { type: null, required: false, default: "neutral" },
  variant: { type: null, required: false },
  collapsed: { type: Boolean, required: false, default: false },
  tooltip: { type: [Boolean, Object], required: false, default: false },
  kbds: { type: Array, required: false, default: () => ["meta", "k"] },
  ui: { type: Object, required: false },
  class: { type: null, required: false },
  activeColor: { type: null, required: false },
  activeVariant: { type: null, required: false },
  size: { type: null, required: false },
  square: { type: Boolean, required: false },
  block: { type: Boolean, required: false },
  loadingAuto: { type: Boolean, required: false },
  onClick: { type: [Function, Array], required: false },
  avatar: { type: Object, required: false },
  leading: { type: Boolean, required: false },
  leadingIcon: { type: null, required: false },
  trailing: { type: Boolean, required: false },
  trailingIcon: { type: null, required: false },
  loading: { type: Boolean, required: false },
  loadingIcon: { type: null, required: false },
  as: { type: null, required: false },
  type: { type: null, required: false },
  disabled: { type: Boolean, required: false },
  exactActiveClass: { type: String, required: false },
  viewTransition: { type: Boolean, required: false }
});
const slots = defineSlots();
const props = useComponentProps("dashboardSearchButton", _props);
const [DefineButtonTemplate, ReuseButtonTemplate] = createReusableTemplate();
const getProxySlots = () => omit(slots, ["trailing"]);
const buttonProps = useForwardProps(reactiveOmit(props, "icon", "label", "variant", "collapsed", "tooltip", "kbds", "class", "ui"));
const tooltipProps = toRef(() => defu(typeof props.tooltip === "boolean" ? {} : props.tooltip, { delayDuration: 0, content: { side: "right" } }));
const { t } = useLocale();
const appConfig = useAppConfig();
const { toggleSearch } = useDashboard({ toggleSearch: () => {
} });
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.dashboardSearchButton || {} })({
  collapsed: props.collapsed
}));
</script>

<template>
  <DefineButtonTemplate>
    <UButton
      :icon="props.icon === false ? void 0 : props.icon ?? appConfig.ui.icons.search"
      :label="props.label || t('dashboardSearchButton.label')"
      :variant="props.variant || (props.collapsed ? 'ghost' : 'outline')"
      v-bind="{
  ...buttonProps,
  ...props.collapsed ? {
    'square': true,
    'aria-label': props.label || t('dashboardSearchButton.label')
  } : {},
  ...$attrs
}"
      :class="ui.base({ class: [props.ui?.base, props.class] })"
      :ui="transformUI(ui, props.ui)"
      @click="toggleSearch"
    >
      <template v-for="(_, name) in getProxySlots()" #[name]="slotData">
        <slot :name="name" v-bind="slotData" />
      </template>

      <template #trailing="{ ui: uiProxy }">
        <span data-slot="trailing" :class="ui.trailing({ class: props.ui?.trailing })">
          <slot name="trailing" :ui="uiProxy">
            <template v-if="props.kbds?.length">
              <UKbd v-for="(kbd, index) in props.kbds" :key="index" variant="subtle" v-bind="typeof kbd === 'string' ? { value: kbd } : kbd" />
            </template>
          </slot>
        </span>
      </template>
    </UButton>
  </DefineButtonTemplate>

  <UTooltip v-if="props.collapsed && props.tooltip" :text="props.label || t('dashboardSearchButton.label')" v-bind="tooltipProps">
    <ReuseButtonTemplate />
  </UTooltip>
  <ReuseButtonTemplate v-else />
</template>
```


## DashboardSidebar.vue

```vue
<script>
import theme from "#build/ui/dashboard-sidebar";
</script>

<script setup>
import { ref, computed, toRef, useId, watch } from "vue";
import { defu } from "defu";
import { createReusableTemplate } from "@vueuse/core";
import { useAppConfig, useRuntimeHook, useRoute } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { useResizable } from "../composables/useResizable";
import { useLocale } from "../composables/useLocale";
import { useDashboard } from "../utils/dashboard";
import { tv } from "../utils/tv";
import UDashboardResizeHandle from "./DashboardResizeHandle.vue";
import UDashboardSidebarToggle from "./DashboardSidebarToggle.vue";
import USlideover from "./Slideover.vue";
import UModal from "./Modal.vue";
import UDrawer from "./Drawer.vue";
defineOptions({ inheritAttrs: false });
const _props = defineProps({
  mode: { type: null, required: false, default: "slideover" },
  menu: { type: null, required: false },
  toggle: { type: [Boolean, Object], required: false, default: true },
  toggleSide: { type: String, required: false, default: "left" },
  autoClose: { type: Boolean, required: false, default: true },
  class: { type: null, required: false },
  ui: { type: Object, required: false },
  id: { type: String, required: false },
  side: { type: String, required: false, default: "left" },
  minSize: { type: Number, required: false, default: 10 },
  maxSize: { type: Number, required: false, default: 20 },
  defaultSize: { type: Number, required: false, default: 15 },
  resizable: { type: Boolean, required: false, default: false },
  collapsible: { type: Boolean, required: false, default: false },
  collapsedSize: { type: Number, required: false, default: 0 }
});
const slots = defineSlots();
const props = useComponentProps("dashboardSidebar", _props);
const open = defineModel("open", { type: Boolean, ...{ default: false } });
const collapsed = defineModel("collapsed", { type: Boolean, ...{ default: false } });
const route = useRoute();
const { t } = useLocale();
const appConfig = useAppConfig();
const dashboardContext = useDashboard({
  storageKey: "dashboard",
  unit: "%",
  sidebarOpen: ref(false),
  sidebarCollapsed: ref(false)
});
const id = `${dashboardContext.storageKey}-sidebar-${props.id || useId()}`;
const { el, size, collapse, isCollapsed, isDragging, onMouseDown, onTouchStart, onDoubleClick } = useResizable(id, toRef(() => ({ ...dashboardContext, ...props })), { collapsed });
const [DefineToggleTemplate, ReuseToggleTemplate] = createReusableTemplate();
const [DefineResizeHandleTemplate, ReuseResizeHandleTemplate] = createReusableTemplate();
useRuntimeHook("dashboard:sidebar:toggle", () => {
  open.value = !open.value;
});
useRuntimeHook("dashboard:sidebar:collapse", (value) => {
  isCollapsed.value = value;
});
watch(open, () => dashboardContext.sidebarOpen.value = open.value, { immediate: true });
watch(isCollapsed, () => dashboardContext.sidebarCollapsed.value = isCollapsed.value, { immediate: true });
watch(() => route.fullPath, () => {
  if (!props.autoClose) return;
  open.value = false;
});
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.dashboardSidebar || {} })({
  side: props.side
}));
const Menu = computed(() => ({
  slideover: USlideover,
  modal: UModal,
  drawer: UDrawer
})[props.mode]);
const menuProps = toRef(() => defu(props.menu, {}, props.mode === "modal" ? { fullscreen: true, transition: false } : props.mode === "slideover" ? { side: "left" } : {}));
function toggleOpen() {
  open.value = !open.value;
}
</script>

<template>
  <DefineToggleTemplate>
    <slot name="toggle" :open="open" :toggle="toggleOpen" :ui="ui">
      <UDashboardSidebarToggle
        v-if="props.toggle"
        v-bind="typeof props.toggle === 'object' ? props.toggle : {}"
        :side="props.toggleSide"
        data-slot="toggle"
        :class="ui.toggle({ class: props.ui?.toggle, toggleSide: props.toggleSide })"
      />
    </slot>
  </DefineToggleTemplate>

  <DefineResizeHandleTemplate>
    <slot name="resize-handle" :on-mouse-down="onMouseDown" :on-touch-start="onTouchStart" :on-double-click="onDoubleClick" :ui="ui">
      <UDashboardResizeHandle
        v-if="props.resizable"
        :aria-controls="id"
        data-slot="handle"
        :class="ui.handle({ class: props.ui?.handle })"
        @mousedown="onMouseDown"
        @touchstart="onTouchStart"
        @dblclick="onDoubleClick"
      />
    </slot>
  </DefineResizeHandleTemplate>

  <ReuseResizeHandleTemplate v-if="props.side === 'right'" />

  <div
    :id="id"
    ref="el"
    data-slot="root"
    v-bind="$attrs"
    :data-collapsed="isCollapsed"
    :data-dragging="isDragging"
    :class="ui.root({ class: [props.ui?.root, props.class] })"
    :style="{ '--width': `${size || 0}${dashboardContext.unit}` }"
  >
    <div v-if="!!slots.header" data-slot="header" :class="ui.header({ class: props.ui?.header })">
      <slot name="header" :collapsed="isCollapsed" :collapse="collapse" />
    </div>

    <div data-slot="body" :class="ui.body({ class: props.ui?.body })">
      <slot :collapsed="isCollapsed" :collapse="collapse" />
    </div>

    <div v-if="!!slots.footer" data-slot="footer" :class="ui.footer({ class: props.ui?.footer })">
      <slot name="footer" :collapsed="isCollapsed" :collapse="collapse" />
    </div>
  </div>

  <ReuseResizeHandleTemplate v-if="props.side === 'left'" />

  <Menu
    v-model:open="open"
    :title="t('dashboardSidebar.title')"
    :description="t('dashboardSidebar.description')"
    v-bind="menuProps"
    :ui="{
  overlay: ui.overlay({ class: props.ui?.overlay }),
  content: ui.content({ class: props.ui?.content })
}"
  >
    <template #content="contentData">
      <slot name="content" v-bind="contentData">
        <div v-if="!!slots.header || props.mode !== 'drawer'" data-slot="header" :class="ui.header({ class: props.ui?.header, menu: true })">
          <ReuseToggleTemplate v-if="props.mode !== 'drawer' && props.toggleSide === 'left'" />

          <slot name="header" :collapsed="false" :collapse="() => {
}" />

          <ReuseToggleTemplate v-if="props.mode !== 'drawer' && props.toggleSide === 'right'" />
        </div>

        <div data-slot="body" :class="ui.body({ class: props.ui?.body, menu: true })">
          <slot :collapsed="false" :collapse="() => {
}" />
        </div>

        <div v-if="!!slots.footer" data-slot="footer" :class="ui.footer({ class: props.ui?.footer, menu: true })">
          <slot name="footer" :collapsed="false" :collapse="() => {
}" />
        </div>
      </slot>
    </template>
  </Menu>
</template>
```


## DashboardSidebarCollapse.vue

```vue
<script>
import theme from "#build/ui/dashboard-sidebar-collapse";
</script>

<script setup>
import { ref, computed } from "vue";
import { reactiveOmit } from "@vueuse/core";
import { useAppConfig } from "#imports";
import { useLocale } from "../composables/useLocale";
import { useComponentProps } from "../composables/useComponentProps";
import { useForwardProps } from "../composables/useForwardProps";
import { useDashboard } from "../utils/dashboard";
import { tv } from "../utils/tv";
import UButton from "./Button.vue";
const _props = defineProps({
  color: { type: null, required: false, default: "neutral" },
  variant: { type: null, required: false, default: "ghost" },
  side: { type: String, required: false, default: "left" },
  ui: { type: Object, required: false },
  label: { type: String, required: false },
  activeColor: { type: null, required: false },
  activeVariant: { type: null, required: false },
  size: { type: null, required: false },
  square: { type: Boolean, required: false },
  block: { type: Boolean, required: false },
  loadingAuto: { type: Boolean, required: false },
  onClick: { type: [Function, Array], required: false },
  class: { type: null, required: false },
  icon: { type: null, required: false },
  avatar: { type: Object, required: false },
  leading: { type: Boolean, required: false },
  leadingIcon: { type: null, required: false },
  trailing: { type: Boolean, required: false },
  trailingIcon: { type: null, required: false },
  loading: { type: Boolean, required: false },
  loadingIcon: { type: null, required: false },
  as: { type: null, required: false },
  type: { type: null, required: false },
  disabled: { type: Boolean, required: false },
  exactActiveClass: { type: String, required: false },
  viewTransition: { type: Boolean, required: false }
});
const props = useComponentProps("dashboardSidebarCollapse", _props);
const buttonProps = useForwardProps(reactiveOmit(props, "icon", "side", "class"));
const { t } = useLocale();
const appConfig = useAppConfig();
const { sidebarCollapsed, collapseSidebar } = useDashboard({ sidebarCollapsed: ref(false), collapseSidebar: () => {
} });
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.dashboardSidebarCollapse || {} }));
</script>

<template>
  <UButton
    v-bind="{
  ...buttonProps,
  'icon': props.icon || (sidebarCollapsed ? appConfig.ui.icons.panelOpen : appConfig.ui.icons.panelClose),
  'aria-label': sidebarCollapsed ? t('dashboardSidebarCollapse.expand') : t('dashboardSidebarCollapse.collapse'),
  ...$attrs
}"
    :class="ui({ class: [props.ui?.base, props.class], side: props.side })"
    @click="collapseSidebar?.(!sidebarCollapsed)"
  />
</template>
```


## DashboardSidebarToggle.vue

```vue
<script>
import theme from "#build/ui/dashboard-sidebar-toggle";
</script>

<script setup>
import { ref, computed } from "vue";
import { reactiveOmit } from "@vueuse/core";
import { useAppConfig } from "#imports";
import { useLocale } from "../composables/useLocale";
import { useComponentProps } from "../composables/useComponentProps";
import { useForwardProps } from "../composables/useForwardProps";
import { useDashboard } from "../utils/dashboard";
import { tv } from "../utils/tv";
import UButton from "./Button.vue";
defineOptions({ inheritAttrs: false });
const _props = defineProps({
  color: { type: null, required: false, default: "neutral" },
  variant: { type: null, required: false, default: "ghost" },
  side: { type: String, required: false, default: "left" },
  ui: { type: Object, required: false },
  label: { type: String, required: false },
  activeColor: { type: null, required: false },
  activeVariant: { type: null, required: false },
  size: { type: null, required: false },
  square: { type: Boolean, required: false },
  block: { type: Boolean, required: false },
  loadingAuto: { type: Boolean, required: false },
  onClick: { type: [Function, Array], required: false },
  class: { type: null, required: false },
  icon: { type: null, required: false },
  avatar: { type: Object, required: false },
  leading: { type: Boolean, required: false },
  leadingIcon: { type: null, required: false },
  trailing: { type: Boolean, required: false },
  trailingIcon: { type: null, required: false },
  loading: { type: Boolean, required: false },
  loadingIcon: { type: null, required: false },
  as: { type: null, required: false },
  type: { type: null, required: false },
  disabled: { type: Boolean, required: false },
  exactActiveClass: { type: String, required: false },
  viewTransition: { type: Boolean, required: false }
});
const props = useComponentProps("dashboardSidebarToggle", _props);
const buttonProps = useForwardProps(reactiveOmit(props, "icon", "side", "class"));
const { t } = useLocale();
const appConfig = useAppConfig();
const { sidebarOpen, toggleSidebar } = useDashboard({ sidebarOpen: ref(false), toggleSidebar: () => {
} });
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.dashboardSidebarToggle || {} }));
</script>

<template>
  <UButton
    v-bind="{
  ...buttonProps,
  'icon': props.icon || (sidebarOpen ? appConfig.ui.icons.close : appConfig.ui.icons.menu),
  'aria-label': sidebarOpen ? t('dashboardSidebarToggle.close') : t('dashboardSidebarToggle.open'),
  ...$attrs
}"
    :class="ui({ class: [props.ui?.base, props.class], side: props.side })"
    @click="toggleSidebar"
  />
</template>
```


## DashboardToolbar.vue

```vue
<script>
import theme from "#build/ui/dashboard-toolbar";
</script>

<script setup>
import { computed } from "vue";
import { Primitive } from "reka-ui";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { tv } from "../utils/tv";
const _props = defineProps({
  as: { type: null, required: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false }
});
defineSlots();
const props = useComponentProps("dashboardToolbar", _props);
const appConfig = useAppConfig();
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.dashboardToolbar || {} })());
</script>

<template>
  <Primitive :as="props.as" data-slot="root" :class="ui.root({ class: [props.ui?.root, props.class] })">
    <slot>
      <div data-slot="left" :class="ui.left({ class: [props.ui?.left] })">
        <slot name="left" />
      </div>

      <div data-slot="right" :class="ui.right({ class: [props.ui?.right] })">
        <slot name="right" />
      </div>
    </slot>
  </Primitive>
</template>
```


## Drawer.vue

```vue
<script>
import theme from "#build/ui/drawer";
</script>

<script setup>
import { computed, toRef } from "vue";
import { VisuallyHidden } from "reka-ui";
import { useForwardProps } from "../composables/useForwardProps";
import { DrawerRoot, DrawerRootNested, DrawerTrigger, DrawerPortal, DrawerOverlay, DrawerContent, DrawerTitle, DrawerDescription, DrawerHandle, DrawerClose } from "vaul-vue";
import { reactivePick } from "@vueuse/core";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { FieldGroupReset } from "../composables/useFieldGroup";
import { useLocale } from "../composables/useLocale";
import { usePortal } from "../composables/usePortal";
import { pointerDownOutside } from "../utils/overlay";
import { tv } from "../utils/tv";
import UButton from "./Button.vue";
const _props = defineProps({
  as: { type: null, required: false },
  title: { type: String, required: false },
  description: { type: String, required: false },
  inset: { type: Boolean, required: false },
  content: { type: Object, required: false },
  overlay: { type: Boolean, required: false, default: true },
  handle: { type: Boolean, required: false, default: true },
  portal: { type: [Boolean, String], required: false, skipCheck: true, default: true },
  nested: { type: Boolean, required: false },
  close: { type: [Boolean, Object], required: false },
  closeIcon: { type: null, required: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false },
  activeSnapPoint: { type: [Number, String, null], required: false },
  closeThreshold: { type: Number, required: false },
  shouldScaleBackground: { type: Boolean, required: false },
  setBackgroundColorOnScale: { type: Boolean, required: false },
  scrollLockTimeout: { type: Number, required: false },
  fixed: { type: Boolean, required: false },
  dismissible: { type: Boolean, required: false, default: true },
  modal: { type: Boolean, required: false, default: true },
  open: { type: Boolean, required: false },
  defaultOpen: { type: Boolean, required: false },
  direction: { type: String, required: false, default: "bottom" },
  noBodyStyles: { type: Boolean, required: false },
  handleOnly: { type: Boolean, required: false },
  preventScrollRestoration: { type: Boolean, required: false },
  snapPoints: { type: Array, required: false }
});
const emits = defineEmits(["close:prevent", "drag", "release", "close", "update:open", "update:activeSnapPoint", "animationEnd"]);
const slots = defineSlots();
const props = useComponentProps("drawer", _props);
const { t } = useLocale();
const appConfig = useAppConfig();
const rootProps = useForwardProps(reactivePick(props, "activeSnapPoint", "closeThreshold", "shouldScaleBackground", "setBackgroundColorOnScale", "scrollLockTimeout", "fixed", "dismissible", "modal", "open", "defaultOpen", "nested", "direction", "noBodyStyles", "handleOnly", "preventScrollRestoration", "snapPoints"), emits);
const portalProps = usePortal(toRef(() => props.portal));
const contentProps = toRef(() => props.content);
const contentEvents = computed(() => {
  if (!props.dismissible) {
    const events = ["interactOutside", "escapeKeyDown"];
    return events.reduce((acc, curr) => {
      acc[curr] = (e) => {
        e.preventDefault();
        emits("close:prevent");
      };
      return acc;
    }, {});
  }
  return {
    pointerDownOutside
  };
});
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.drawer || {} })({
  direction: props.direction,
  inset: props.inset,
  snapPoints: props.snapPoints && props.snapPoints.length > 0
}));
</script>

<template>
  <component :is="props.nested ? DrawerRootNested : DrawerRoot" v-bind="rootProps">
    <DrawerTrigger v-if="!!slots.default" as-child :class="props.class">
      <slot />
    </DrawerTrigger>

    <DrawerPortal v-bind="portalProps">
      <FieldGroupReset>
        <DrawerOverlay v-if="props.overlay" data-slot="overlay" :class="ui.overlay({ class: props.ui?.overlay })" />

        <DrawerContent data-slot="content" :class="ui.content({ class: [!slots.default && props.class, props.ui?.content] })" v-bind="contentProps" v-on="contentEvents">
          <DrawerHandle v-if="props.handle" data-slot="handle" :class="ui.handle({ class: props.ui?.handle })" />

          <VisuallyHidden v-if="!props.title && !slots.title || !props.description && !slots.description || !!slots.content">
            <DrawerTitle v-if="!props.title && !slots.title" />
            <DrawerTitle v-else-if="!!slots.content">
              <slot name="title">
                {{ props.title }}
              </slot>
            </DrawerTitle>

            <DrawerDescription v-if="!props.description && !slots.description" />
            <DrawerDescription v-else-if="!!slots.content">
              <slot name="description">
                {{ props.description }}
              </slot>
            </DrawerDescription>
          </VisuallyHidden>

          <slot name="content">
            <div data-slot="container" :class="ui.container({ class: props.ui?.container })">
              <div v-if="!!slots.header || (props.title || !!slots.title) || (props.description || !!slots.description) || (props.close || !!slots.close) || !!slots.actions" data-slot="header" :class="ui.header({ class: props.ui?.header })">
                <slot name="header">
                  <div v-if="props.title || !!slots.title || props.description || !!slots.description" data-slot="wrapper" :class="ui.wrapper({ class: props.ui?.wrapper })">
                    <DrawerTitle v-if="props.title || !!slots.title" data-slot="title" :class="ui.title({ class: props.ui?.title })">
                      <slot name="title">
                        {{ props.title }}
                      </slot>
                    </DrawerTitle>

                    <DrawerDescription v-if="props.description || !!slots.description" data-slot="description" :class="ui.description({ class: props.ui?.description })">
                      <slot name="description">
                        {{ props.description }}
                      </slot>
                    </DrawerDescription>
                  </div>

                  <div v-if="!!slots.actions || props.close || !!slots.close" data-slot="actions" :class="ui.actions({ class: props.ui?.actions })">
                    <slot name="actions" />

                    <DrawerClose v-if="props.close || !!slots.close" as-child>
                      <slot name="close" :ui="ui">
                        <UButton
                          v-if="props.close"
                          :icon="props.closeIcon || appConfig.ui.icons.close"
                          color="neutral"
                          variant="ghost"
                          :aria-label="t('drawer.close')"
                          v-bind="typeof props.close === 'object' ? props.close : {}"
                          data-slot="close"
                          :class="ui.close({ class: props.ui?.close })"
                        />
                      </slot>
                    </DrawerClose>
                  </div>
                </slot>
              </div>

              <div v-if="!!slots.body" data-slot="body" :class="ui.body({ class: props.ui?.body })">
                <slot name="body" />
              </div>

              <div v-if="!!slots.footer" data-slot="footer" :class="ui.footer({ class: props.ui?.footer })">
                <slot name="footer" />
              </div>
            </div>
          </slot>
        </DrawerContent>
      </FieldGroupReset>
    </DrawerPortal>
  </component>
</template>
```


## DropdownMenu.vue

```vue
<script>
import theme from "#build/ui/dropdown-menu";
</script>

<script setup>
import { computed, toRef } from "vue";
import { defu } from "defu";
import { DropdownMenuRoot, DropdownMenuTrigger, DropdownMenuArrow } from "reka-ui";
import { reactivePick } from "@vueuse/core";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { useForwardProps } from "../composables/useForwardProps";
import { omit } from "../utils";
import { tv } from "../utils/tv";
import UDropdownMenuContent from "./DropdownMenuContent.vue";
const _props = defineProps({
  size: { type: null, required: false },
  items: { type: null, required: false },
  checkedIcon: { type: null, required: false },
  loadingIcon: { type: null, required: false },
  externalIcon: { type: [Boolean, String], required: false, skipCheck: true, default: true },
  content: { type: Object, required: false },
  arrow: { type: [Boolean, Object], required: false },
  portal: { type: [Boolean, String], required: false, skipCheck: true, default: true },
  labelKey: { type: null, required: false, default: "label" },
  descriptionKey: { type: null, required: false, default: "description" },
  filter: { type: [Boolean, Object], required: false, default: false },
  filterFields: { type: Array, required: false },
  ignoreFilter: { type: Boolean, required: false, default: false },
  disabled: { type: Boolean, required: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false },
  defaultOpen: { type: Boolean, required: false },
  open: { type: Boolean, required: false },
  modal: { type: Boolean, required: false, default: true }
});
const emits = defineEmits(["update:open"]);
const slots = defineSlots();
const searchTerm = defineModel("searchTerm", { type: String, ...{ default: "" } });
const props = useComponentProps("dropdownMenu", _props);
const appConfig = useAppConfig();
const rootProps = useForwardProps(reactivePick(props, "defaultOpen", "open", "modal"), emits);
const contentProps = toRef(() => defu(props.content, { side: "bottom", sideOffset: 8, collisionPadding: 8 }));
const arrowProps = toRef(() => defu(props.arrow, { rounded: true }));
const getProxySlots = () => omit(slots, ["default"]);
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.dropdownMenu || {} })({
  size: props.size
}));
</script>

<template>
  <DropdownMenuRoot v-slot="{ open }" v-bind="rootProps">
    <DropdownMenuTrigger v-if="!!slots.default" as-child :class="props.class" :disabled="props.disabled">
      <slot :open="open" />
    </DropdownMenuTrigger>

    <UDropdownMenuContent
      v-model:search-term="searchTerm"
      :class="ui.content({ class: [!slots.default && props.class, props.ui?.content] })"
      :ui="ui"
      :ui-override="props.ui"
      v-bind="contentProps"
      :items="props.items"
      :portal="props.portal"
      :label-key="props.labelKey"
      :description-key="props.descriptionKey"
      :checked-icon="props.checkedIcon"
      :loading-icon="props.loadingIcon"
      :external-icon="props.externalIcon"
      :size="props.size"
      :filter="props.filter"
      :filter-fields="props.filterFields"
      :ignore-filter="props.ignoreFilter"
    >
      <template v-for="(_, name) in getProxySlots()" #[name]="slotData">
        <slot :name="name" v-bind="slotData" />
      </template>

      <DropdownMenuArrow v-if="!!props.arrow" v-bind="arrowProps" data-slot="arrow" :class="ui.arrow({ class: props.ui?.arrow })" />
    </UDropdownMenuContent>
  </DropdownMenuRoot>
</template>
```


## DropdownMenuContent.vue

```vue
<script>

</script>

<script setup>
import { computed, ref, toRef } from "vue";
import { defu } from "defu";
import { DropdownMenu } from "reka-ui/namespaced";
import { useForwardPropsEmits } from "reka-ui";
import { reactiveOmit, createReusableTemplate } from "@vueuse/core";
import { useAppConfig } from "#imports";
import { FieldGroupReset } from "../composables/useFieldGroup";
import { useFilter } from "../composables/useFilter";
import { useLocale } from "../composables/useLocale";
import { usePortal } from "../composables/usePortal";
import { omit, get, isArrayOfArray } from "../utils";
import { pickLinkProps } from "../utils/link";
import ULinkBase from "./LinkBase.vue";
import ULink from "./Link.vue";
import UAvatar from "./Avatar.vue";
import UIcon from "./Icon.vue";
import UInput from "./Input.vue";
import UKbd from "./Kbd.vue";
import UDropdownMenuContent from "./DropdownMenuContent.vue";
const props = defineProps({
  items: { type: null, required: false },
  portal: { type: [Boolean, String], required: false, skipCheck: true },
  sub: { type: Boolean, required: false },
  labelKey: { type: null, required: true },
  descriptionKey: { type: null, required: true },
  checkedIcon: { type: null, required: false },
  loadingIcon: { type: null, required: false },
  externalIcon: { type: [Boolean, String], required: false, skipCheck: true },
  size: { type: null, required: false },
  filter: { type: [Boolean, Object], required: false },
  filterFields: { type: Array, required: false },
  ignoreFilter: { type: Boolean, required: false },
  searchTerm: { type: String, required: false },
  class: { type: null, required: false },
  ui: { type: null, required: true },
  uiOverride: { type: null, required: false },
  loop: { type: Boolean, required: false },
  memoDependencies: { type: Array, required: false },
  side: { type: null, required: false },
  sideOffset: { type: Number, required: false },
  sideFlip: { type: Boolean, required: false },
  align: { type: null, required: false },
  alignOffset: { type: Number, required: false },
  alignFlip: { type: Boolean, required: false },
  avoidCollisions: { type: Boolean, required: false },
  collisionBoundary: { type: null, required: false },
  collisionPadding: { type: [Number, Object], required: false },
  arrowPadding: { type: Number, required: false },
  hideShiftedArrow: { type: Boolean, required: false },
  sticky: { type: String, required: false },
  hideWhenDetached: { type: Boolean, required: false },
  positionStrategy: { type: String, required: false },
  updatePositionStrategy: { type: String, required: false },
  disableUpdateOnLayoutShift: { type: Boolean, required: false },
  prioritizePosition: { type: Boolean, required: false },
  reference: { type: null, required: false }
});
const emits = defineEmits(["update:searchTerm", "escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "closeAutoFocus"]);
const slots = defineSlots();
const { t, dir } = useLocale();
const appConfig = useAppConfig();
const { filterGroups } = useFilter();
const _searchTerm = ref("");
const searchTerm = computed({
  get: () => props.searchTerm ?? _searchTerm.value,
  set: (value) => {
    _searchTerm.value = value;
    emits("update:searchTerm", value);
  }
});
const inputProps = toRef(() => defu(props.filter, { placeholder: t("dropdownMenu.search"), variant: "none" }));
const portalProps = usePortal(toRef(() => props.portal));
const contentProps = useForwardPropsEmits(reactiveOmit(props, "sub", "items", "portal", "labelKey", "descriptionKey", "checkedIcon", "loadingIcon", "externalIcon", "size", "filter", "filterFields", "ignoreFilter", "searchTerm", "class", "ui", "uiOverride"), emits);
const getProxySlots = () => omit(slots, ["default"]);
const [DefineItemTemplate, ReuseItemTemplate] = createReusableTemplate();
const childrenIcon = computed(() => dir.value === "rtl" ? appConfig.ui.icons.chevronLeft : appConfig.ui.icons.chevronRight);
const groups = computed(() => {
  if (!props.items?.length) return [];
  return isArrayOfArray(props.items) ? props.items : [props.items];
});
const isStructuralItem = (item) => !!item.type && ["label", "separator"].includes(item.type);
const filteredGroups = computed(() => {
  if (!props.filter || props.ignoreFilter || !searchTerm.value) {
    return groups.value;
  }
  const fields = Array.isArray(props.filterFields) && props.filterFields.length ? props.filterFields : [props.labelKey];
  return filterGroups(groups.value, searchTerm.value, {
    fields,
    isStructural: isStructuralItem
  });
});
const hasFilteredItems = computed(() => filteredGroups.value.some((group) => group.some((item) => !isStructuralItem(item))));
</script>

<template>
  <DefineItemTemplate v-slot="{ item, active, index }">
    <slot :name="item.slot || 'item'" :item="item" :index="index" :ui="ui">
      <slot :name="item.slot ? `${item.slot}-leading` : 'item-leading'" :item="item" :active="active" :index="index" :ui="ui">
        <UIcon v-if="item.loading" :name="loadingIcon || appConfig.ui.icons.loading" data-slot="itemLeadingIcon" :class="ui.itemLeadingIcon({ class: [uiOverride?.itemLeadingIcon, item.ui?.itemLeadingIcon], color: item?.color, loading: true })" />
        <UIcon v-else-if="item.icon" :name="item.icon" data-slot="itemLeadingIcon" :class="ui.itemLeadingIcon({ class: [uiOverride?.itemLeadingIcon, item.ui?.itemLeadingIcon], color: item?.color, active })" />
        <UAvatar v-else-if="item.avatar" :size="item.ui?.itemLeadingAvatarSize || uiOverride?.itemLeadingAvatarSize || ui.itemLeadingAvatarSize()" v-bind="item.avatar" data-slot="itemLeadingAvatar" :class="ui.itemLeadingAvatar({ class: [uiOverride?.itemLeadingAvatar, item.ui?.itemLeadingAvatar], active })" />
      </slot>

      <span v-if="get(item, props.labelKey) || !!slots[item.slot ? `${item.slot}-label` : 'item-label'] || (get(item, props.descriptionKey) || !!slots[item.slot ? `${item.slot}-description` : 'item-description'])" data-slot="itemWrapper" :class="ui.itemWrapper({ class: [uiOverride?.itemWrapper, item.ui?.itemWrapper] })">
        <span data-slot="itemLabel" :class="ui.itemLabel({ class: [uiOverride?.itemLabel, item.ui?.itemLabel], active })">
          <slot :name="item.slot ? `${item.slot}-label` : 'item-label'" :item="item" :active="active" :index="index">
            {{ get(item, props.labelKey) }}
          </slot>

          <UIcon v-if="item.target === '_blank' && externalIcon !== false" :name="typeof externalIcon === 'string' ? externalIcon : appConfig.ui.icons.external" data-slot="itemLabelExternalIcon" :class="ui.itemLabelExternalIcon({ class: [uiOverride?.itemLabelExternalIcon, item.ui?.itemLabelExternalIcon], color: item?.color, active })" />
        </span>

        <span v-if="get(item, props.descriptionKey) || !!slots[item.slot ? `${item.slot}-description` : 'item-description']" data-slot="itemDescription" :class="ui.itemDescription({ class: [uiOverride?.itemDescription, item.ui?.itemDescription] })">
          <slot :name="item.slot ? `${item.slot}-description` : 'item-description'" :item="item" :active="active" :index="index">
            {{ get(item, props.descriptionKey) }}
          </slot>
        </span>
      </span>

      <span data-slot="itemTrailing" :class="ui.itemTrailing({ class: [uiOverride?.itemTrailing, item.ui?.itemTrailing] })">
        <slot :name="item.slot ? `${item.slot}-trailing` : 'item-trailing'" :item="item" :active="active" :index="index" :ui="ui">
          <UIcon v-if="item.children?.length" :name="childrenIcon" data-slot="itemTrailingIcon" :class="ui.itemTrailingIcon({ class: [uiOverride?.itemTrailingIcon, item.ui?.itemTrailingIcon], color: item?.color, active })" />
          <span v-else-if="item.kbds?.length" data-slot="itemTrailingKbds" :class="ui.itemTrailingKbds({ class: [uiOverride?.itemTrailingKbds, item.ui?.itemTrailingKbds] })">
            <UKbd v-for="(kbd, kbdIndex) in item.kbds" :key="kbdIndex" :size="item.ui?.itemTrailingKbdsSize || uiOverride?.itemTrailingKbdsSize || ui.itemTrailingKbdsSize()" v-bind="typeof kbd === 'string' ? { value: kbd } : kbd" />
          </span>
        </slot>

        <DropdownMenu.ItemIndicator as-child>
          <UIcon :name="checkedIcon || appConfig.ui.icons.check" data-slot="itemTrailingIcon" :class="ui.itemTrailingIcon({ class: [uiOverride?.itemTrailingIcon, item.ui?.itemTrailingIcon], color: item?.color })" />
        </DropdownMenu.ItemIndicator>
      </span>
    </slot>
  </DefineItemTemplate>

  <DropdownMenu.Portal v-bind="portalProps">
    <FieldGroupReset>
      <component :is="sub ? DropdownMenu.SubContent : DropdownMenu.Content" data-slot="content" :class="ui.content({ class: [uiOverride?.content, props.class] })" v-bind="contentProps">
        <DropdownMenu.Filter v-if="!!filter" v-model="searchTerm" as-child>
          <UInput
            autofocus
            autocomplete="off"
            :size="size"
            v-bind="inputProps"
            data-slot="input"
            :class="ui.input({ class: uiOverride?.input })"
            @change.stop
          />
        </DropdownMenu.Filter>

        <slot name="content-top" :sub="sub ?? false" />

        <div v-if="!searchTerm || hasFilteredItems" role="presentation" data-slot="viewport" :class="ui.viewport({ class: uiOverride?.viewport })">
          <DropdownMenu.Group v-for="(group, groupIndex) in filteredGroups" :key="`group-${groupIndex}`" data-slot="group" :class="ui.group({ class: uiOverride?.group })">
            <template v-for="(item, index) in group" :key="`group-${groupIndex}-${index}`">
              <DropdownMenu.Label v-if="item.type === 'label'" data-slot="label" :class="ui.label({ class: [uiOverride?.label, item.ui?.label, item.class] })">
                <ReuseItemTemplate :item="item" :index="index" />
              </DropdownMenu.Label>
              <DropdownMenu.Separator v-else-if="item.type === 'separator'" data-slot="separator" :class="ui.separator({ class: [uiOverride?.separator, item.ui?.separator, item.class] })" />
              <DropdownMenu.Sub v-else-if="item?.children?.length" :open="item.open" :default-open="item.defaultOpen">
                <DropdownMenu.SubTrigger
                  as="button"
                  type="button"
                  :disabled="item.disabled"
                  :text-value="get(item, props.labelKey)"
                  data-slot="item"
                  :class="ui.item({ class: [uiOverride?.item, item.ui?.item, item.class], color: item?.color })"
                >
                  <ReuseItemTemplate :item="item" :index="index" />
                </DropdownMenu.SubTrigger>

                <UDropdownMenuContent
                  sub
                  :class="item.ui?.content"
                  :ui="ui"
                  :ui-override="uiOverride"
                  :portal="portal"
                  :items="item.children"
                  align="start"
                  :align-offset="-4"
                  :side-offset="3"
                  :label-key="labelKey"
                  :description-key="descriptionKey"
                  :checked-icon="checkedIcon"
                  :loading-icon="loadingIcon"
                  :external-icon="externalIcon"
                  :size="size"
                  :filter="item.filter"
                  :filter-fields="item.filterFields || filterFields"
                  :ignore-filter="item.ignoreFilter ?? ignoreFilter"
                  v-bind="item.content"
                >
                  <template v-for="(_, name) in getProxySlots()" #[name]="slotData">
                    <slot :name="name" v-bind="slotData" />
                  </template>
                </UDropdownMenuContent>
              </DropdownMenu.Sub>
              <DropdownMenu.CheckboxItem
                v-else-if="item.type === 'checkbox'"
                :model-value="item.checked"
                :disabled="item.disabled"
                :text-value="get(item, props.labelKey)"
                data-slot="item"
                :class="ui.item({ class: [uiOverride?.item, item.ui?.item, item.class], color: item?.color })"
                @update:model-value="item.onUpdateChecked"
                @select="item.onSelect"
              >
                <ReuseItemTemplate :item="item" :index="index" />
              </DropdownMenu.CheckboxItem>
              <ULink v-else v-slot="{ active, ...slotProps }" v-bind="pickLinkProps(item)" custom>
                <DropdownMenu.Item
                  as-child
                  :disabled="item.disabled"
                  :text-value="get(item, props.labelKey)"
                  @select="item.onSelect"
                >
                  <ULinkBase v-bind="slotProps" data-slot="item" :class="ui.item({ class: [uiOverride?.item, item.ui?.item, item.class], color: item?.color, active })">
                    <ReuseItemTemplate :item="item" :active="active" :index="index" />
                  </ULinkBase>
                </DropdownMenu.Item>
              </ULink>
            </template>
          </DropdownMenu.Group>
        </div>

        <div v-if="searchTerm && !hasFilteredItems" data-slot="empty" :class="ui.empty({ class: uiOverride?.empty })">
          <slot name="empty" :search-term="searchTerm">
            {{ t("dropdownMenu.noMatch", { searchTerm }) }}
          </slot>
        </div>

        <slot />

        <slot name="content-bottom" :sub="sub ?? false" />
      </component>
    </FieldGroupReset>
  </DropdownMenu.Portal>
</template>
```


## Editor.vue

```vue
<script>
import theme from "#build/ui/editor";
</script>

<script setup>
import { computed, provide, useAttrs, watch } from "vue";
import { defu } from "defu";
import { Primitive } from "reka-ui";
import { mergeAttributes } from "@tiptap/core";
import Code from "@tiptap/extension-code";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Image from "@tiptap/extension-image";
import Mention from "@tiptap/extension-mention";
import Placeholder from "@tiptap/extension-placeholder";
import { Markdown } from "@tiptap/markdown";
import StarterKit from "@tiptap/starter-kit";
import { useEditor, EditorContent } from "@tiptap/vue-3";
import { reactiveOmit } from "@vueuse/core";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { useForwardProps } from "../composables/useForwardProps";
import { omit } from "../utils";
import { createHandlers } from "../utils/editor";
import { tv } from "../utils/tv";
defineOptions({ inheritAttrs: false });
const _props = defineProps({
  as: { type: null, required: false },
  modelValue: { type: null, required: false },
  contentType: { type: String, required: false },
  starterKit: { type: [Boolean, Object], required: false, default: true },
  placeholder: { type: [String, Object], required: false },
  markdown: { type: Object, required: false },
  image: { type: [Boolean, Object], required: false, default: true },
  mention: { type: [Boolean, Object], required: false, default: true },
  handlers: { type: null, required: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false },
  extensions: { type: Array, required: false },
  injectCSS: { type: Boolean, required: false },
  injectNonce: { type: null, required: false },
  autofocus: { type: [String, Number, Boolean, null], required: false },
  editable: { type: Boolean, required: false },
  textDirection: { type: String, required: false },
  editorProps: { type: Object, required: false },
  parseOptions: { type: Object, required: false },
  coreExtensionOptions: { type: Object, required: false },
  enableInputRules: { type: [Array, Boolean], required: false },
  enablePasteRules: { type: [Array, Boolean], required: false },
  enableCoreExtensions: { type: [Boolean, Object], required: false },
  enableContentCheck: { type: Boolean, required: false },
  emitContentError: { type: Boolean, required: false },
  onBeforeCreate: { type: Function, required: false },
  onCreate: { type: Function, required: false },
  onMount: { type: Function, required: false },
  onUnmount: { type: Function, required: false },
  onContentError: { type: Function, required: false },
  onUpdate: { type: Function, required: false },
  onSelectionUpdate: { type: Function, required: false },
  onTransaction: { type: Function, required: false },
  onFocus: { type: Function, required: false },
  onBlur: { type: Function, required: false },
  onDestroy: { type: Function, required: false },
  onPaste: { type: Function, required: false },
  onDrop: { type: Function, required: false },
  onDelete: { type: Function, required: false },
  enableExtensionDispatchTransaction: { type: Boolean, required: false }
});
const emits = defineEmits(["update:modelValue"]);
defineSlots();
const props = useComponentProps("editor", _props);
const attrs = useAttrs();
const appConfig = useAppConfig();
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.editor || {} })({
  placeholderMode: typeof props.placeholder === "object" ? props.placeholder.mode : void 0
}));
const rootProps = useForwardProps(reactiveOmit(props, "starterKit", "extensions", "editorProps", "contentType", "class", "placeholder", "markdown", "image", "mention", "handlers"));
const editorProps = computed(() => defu(props.editorProps, {
  attributes: {
    autocomplete: "off",
    autocorrect: "off",
    autocapitalize: "off",
    ...omit(attrs, ["data-slot"]),
    class: ui.value.base({ class: props.ui?.base })
  }
}));
const contentType = computed(() => props.contentType || (typeof props.modelValue === "string" ? "html" : "json"));
const starterKit = computed(() => {
  const options = typeof props.starterKit === "boolean" ? {} : props.starterKit ?? {};
  const plainText = props.starterKit === false ? {
    blockquote: false,
    bold: false,
    bulletList: false,
    code: false,
    codeBlock: false,
    dropcursor: false,
    gapcursor: false,
    heading: false,
    horizontalRule: false,
    italic: false,
    listItem: false,
    listKeymap: false,
    link: false,
    orderedList: false,
    strike: false,
    underline: false,
    trailingNode: false
  } : {};
  return defu(options, plainText, {
    code: false,
    horizontalRule: false,
    dropcursor: {
      color: "var(--ui-primary)",
      width: 2
    },
    link: {
      openOnClick: false
    }
  });
});
const placeholder = computed(() => {
  const options = typeof props.placeholder === "string" ? { placeholder: props.placeholder } : props.placeholder;
  const { mode, ...rest } = options || {};
  return defu(rest, {
    showOnlyWhenEditable: false,
    showOnlyCurrent: true
  });
});
const markdown = computed(() => defu(props.markdown, {
  markedOptions: {
    gfm: true
  }
}));
const image = computed(() => typeof props.image === "boolean" ? {} : props.image);
const mention = computed(() => defu(typeof props.mention === "boolean" ? {} : props.mention, {
  HTMLAttributes: {
    class: "mention"
  },
  renderText({ node }) {
    return `${node.attrs.mentionSuggestionChar ?? "@"}${node.attrs.label ?? node.attrs.id}`;
  },
  renderHTML({ options, node }) {
    return [
      "span",
      mergeAttributes({ "data-type": "mention" }, options.HTMLAttributes),
      `${node.attrs.mentionSuggestionChar ?? "@"}${node.attrs.label ?? node.attrs.id}`
    ];
  }
}));
const extensions = computed(() => [
  contentType.value === "markdown" && Markdown.configure(markdown.value),
  StarterKit.configure(starterKit.value),
  props.starterKit !== false && Code.extend({
    excludes: "code"
  }),
  props.starterKit !== false && HorizontalRule.extend({
    renderHTML() {
      return [
        "div",
        mergeAttributes(this.options.HTMLAttributes, { "data-type": this.name }),
        ["hr"]
      ];
    }
  }),
  props.image !== false && Image.configure(image.value),
  props.mention !== false && Mention.configure(mention.value),
  props.placeholder && Placeholder.configure(placeholder.value),
  ...props.extensions || []
].filter((extension) => !!extension));
const editor = useEditor({
  ...rootProps.value,
  content: props.modelValue,
  contentType: contentType.value,
  extensions: extensions.value,
  editorProps: editorProps.value,
  onCreate: ({ editor: editor2 }) => {
    if (props.placeholder) {
      editor2.view.dispatch(editor2.state.tr);
    }
  },
  onUpdate: ({ editor: editor2, transaction, appendedTransactions }) => {
    if (!transaction.docChanged && !appendedTransactions.some((tr) => tr.docChanged)) {
      return;
    }
    let value;
    try {
      if (contentType.value === "html") {
        value = editor2.getHTML();
      } else if (contentType.value === "json") {
        value = editor2.getJSON();
      } else if (contentType.value === "markdown") {
        value = editor2.getMarkdown();
      }
    } catch (error) {
      value = editor2.getText();
    }
    emits("update:modelValue", value);
  }
});
watch(() => props.modelValue, (newVal) => {
  if (!editor.value || newVal == null) {
    return;
  }
  const currentContent = contentType.value === "html" ? editor.value.getHTML() : contentType.value === "json" ? JSON.stringify(editor.value.getJSON()) : contentType.value === "markdown" ? editor.value.getMarkdown() : editor.value.getText();
  const newContent = contentType.value === "json" && typeof newVal === "object" ? JSON.stringify(newVal) : String(newVal);
  if (currentContent !== newContent) {
    const currentSelection = editor.value.state.selection;
    const currentPos = currentSelection.from;
    editor.value.commands.setContent(newVal, { contentType: contentType.value });
    const newDoc = editor.value.state.doc;
    if (currentPos <= newDoc.content.size) {
      editor.value.commands.setTextSelection(currentPos);
    }
  }
});
const handlers = computed(() => ({
  ...createHandlers(),
  ...props.handlers
}));
provide("editorHandlers", handlers);
defineExpose({
  editor
});
</script>

<template>
  <Primitive :as="props.as" :data-slot="$attrs['data-slot'] ?? 'root'" :class="ui.root({ class: [props.ui?.root, props.class] })">
    <template v-if="editor">
      <slot :editor="editor" :handlers="handlers" />

      <EditorContent
        role="presentation"
        :editor="editor"
        data-slot="content"
        :class="ui.content({ class: props.ui?.content })"
      />
    </template>
  </Primitive>
</template>
```


## EditorDragHandle.vue

```vue
<script>
import theme from "#build/ui/editor-drag-handle";
</script>

<script setup>
import { computed, ref } from "vue";
import DragHandle from "@tiptap/extension-drag-handle-vue-3";
import { reactiveOmit, reactivePick } from "@vueuse/core";
import { defu } from "defu";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { useForwardProps } from "../composables/useForwardProps";
import { buildFloatingUIMiddleware } from "../utils/editor";
import { transformUI } from "../utils";
import { tv } from "../utils/tv";
import UButton from "./Button.vue";
defineOptions({ inheritAttrs: false });
const _props = defineProps({
  icon: { type: null, required: false },
  color: { type: null, required: false, default: "neutral" },
  variant: { type: null, required: false, default: "ghost" },
  options: { type: Object, required: false },
  editor: { type: Object, required: true },
  ui: { type: Object, required: false },
  pluginKey: { type: [Object, String], required: false },
  nestedOptions: { type: Object, required: false },
  onElementDragStart: { type: Function, required: false },
  onElementDragEnd: { type: Function, required: false },
  getReferencedVirtualElement: { type: Function, required: false },
  dragImageProperties: { type: Array, required: false },
  nested: { type: [Boolean, Object], required: false },
  label: { type: String, required: false },
  activeColor: { type: null, required: false },
  activeVariant: { type: null, required: false },
  size: { type: null, required: false, default: "sm" },
  square: { type: Boolean, required: false },
  block: { type: Boolean, required: false },
  loadingAuto: { type: Boolean, required: false },
  onClick: { type: [Function, Array], required: false },
  class: { type: null, required: false },
  avatar: { type: Object, required: false },
  leading: { type: Boolean, required: false },
  leadingIcon: { type: null, required: false },
  trailing: { type: Boolean, required: false },
  trailingIcon: { type: null, required: false },
  loading: { type: Boolean, required: false },
  loadingIcon: { type: null, required: false },
  as: { type: null, required: false },
  type: { type: null, required: false },
  disabled: { type: Boolean, required: false },
  exactActiveClass: { type: String, required: false },
  viewTransition: { type: Boolean, required: false }
});
defineSlots();
const emit = defineEmits(["nodeChange", "hover"]);
const props = useComponentProps("editorDragHandle", _props);
const dragHandleProps = useForwardProps(reactivePick(props, "pluginKey", "nested", "nestedOptions", "onElementDragEnd", "onElementDragStart", "getReferencedVirtualElement"));
const buttonProps = useForwardProps(reactiveOmit(props, "icon", "options", "editor", "pluginKey", "nested", "nestedOptions", "onElementDragEnd", "onElementDragStart", "getReferencedVirtualElement", "class", "ui"));
const appConfig = useAppConfig();
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.editorDragHandle || {} })());
const floatingUIOptions = computed(() => defu(props.options, {
  strategy: "absolute",
  placement: "left-start",
  offset: ({ rects }) => {
    const blockHeight = rects.reference.height;
    const handleHeight = rects.floating.height;
    if (blockHeight > 40) {
      return {
        alignmentAxis: 0,
        mainAxis: 8
      };
    }
    return {
      alignmentAxis: (blockHeight - handleHeight) / 2,
      mainAxis: 8
    };
  },
  flip: {},
  shift: {},
  size: false,
  autoPlacement: false,
  hide: false,
  inline: false
}));
const middleware = computed(() => buildFloatingUIMiddleware(floatingUIOptions.value));
const computePositionConfig = computed(() => ({
  placement: floatingUIOptions.value.placement,
  strategy: floatingUIOptions.value.strategy,
  middleware: middleware.value
}));
const currentNodePos = ref();
function onNodeChange({ pos }) {
  currentNodePos.value = pos;
  if (pos == null || pos < 0) return;
  const node = props.editor.state.doc.nodeAt(pos);
  if (node) {
    emit("hover", { node: node.toJSON(), pos });
  }
}
function onClick() {
  if (!props.editor) return;
  const pos = currentNodePos.value;
  if (pos == null || pos < 0) return;
  const node = props.editor.state.doc.nodeAt(pos);
  if (node) {
    const selectedNode = { node: node.toJSON(), pos };
    emit("nodeChange", selectedNode);
    props.editor.chain().setNodeSelection(pos).run();
    return selectedNode;
  }
}
</script>

<template>
  <DragHandle
    v-bind="dragHandleProps"
    :compute-position-config="computePositionConfig"
    :editor="props.editor"
    :on-node-change="onNodeChange"
    :data-slot="$attrs['data-slot'] ?? 'root'"
    :class="ui.root({ class: [props.ui?.root, props.class] })"
    @click="onClick"
  >
    <slot :ui="ui" :on-click="onClick">
      <UButton
        v-bind="{
  ...buttonProps,
  icon: props.icon || appConfig.ui.icons.drag,
  ...$attrs
}"
        data-slot="handle"
        :class="ui.handle({ class: [props.ui?.handle, props.class] })"
        :ui="transformUI(ui, props.ui)"
      />
    </slot>
  </DragHandle>
</template>
```


## EditorEmojiMenu.vue

```vue
<script>
import theme from "#build/ui/editor-emoji-menu";
</script>

<script setup>
import { computed, h, onMounted, onBeforeUnmount, nextTick, toRef } from "vue";
import { useAppConfig } from "#imports";
import { useEditorMenu } from "../composables/useEditorMenu";
import { tv } from "../utils/tv";
defineOptions({ inheritAttrs: false });
const props = defineProps({
  size: { type: null, required: false },
  items: { type: Array, required: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false },
  editor: { type: Object, required: false },
  char: { type: String, required: false, default: ":" },
  pluginKey: { type: String, required: false, default: "emojiMenu" },
  filterFields: { type: Array, required: false, default: () => ["name", "shortcodes", "tags"] },
  limit: { type: Number, required: false },
  options: { type: Object, required: false },
  suggestion: { type: Object, required: false },
  appendTo: { type: Function, required: false, skipCheck: true }
});
const appConfig = useAppConfig();
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.editorEmojiMenu || {} })({
  size: props.size
}));
let menu = null;
onMounted(async () => {
  await nextTick();
  if (!props.editor || props.editor.isDestroyed) {
    return;
  }
  menu = useEditorMenu({
    editor: props.editor,
    char: props.char,
    pluginKey: props.pluginKey,
    items: toRef(() => props.items),
    filterFields: props.filterFields,
    limit: props.limit,
    options: props.options,
    suggestion: props.suggestion,
    appendTo: props.appendTo,
    ui,
    onSelect: (editor, range, item) => {
      if (!item.emoji) return;
      editor.chain().focus().deleteRange(range).insertContent(item.emoji).run();
    },
    renderItem: (item, styles) => {
      const content = item.emoji || item.shortcodes[0] || item.name;
      return [
        h("span", { class: styles.value.itemLeadingIcon() }, content),
        h("span", { class: styles.value.itemWrapper() }, [
          h("span", { class: styles.value.itemLabel() }, item.name)
        ])
      ];
    }
  });
  props.editor.registerPlugin(menu.plugin);
});
onBeforeUnmount(() => {
  if (menu) {
    menu.destroy();
    menu = null;
  }
  if (props.editor && !props.editor.isDestroyed) {
    props.editor.unregisterPlugin(props.pluginKey);
  }
});
</script>

<template>
  <div />
</template>
```


## EditorMentionMenu.vue

```vue
<script>
import theme from "#build/ui/editor-mention-menu";
</script>

<script setup>
import { computed, h, onMounted, onBeforeUnmount, nextTick, toRef } from "vue";
import { useAppConfig } from "#imports";
import { useEditorMenu } from "../composables/useEditorMenu";
import { tv } from "../utils/tv";
import UIcon from "./Icon.vue";
import UAvatar from "./Avatar.vue";
defineOptions({ inheritAttrs: false });
const props = defineProps({
  size: { type: null, required: false },
  items: { type: Array, required: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false },
  editor: { type: Object, required: false },
  char: { type: String, required: false, default: "@" },
  pluginKey: { type: String, required: false, default: "mentionMenu" },
  filterFields: { type: Array, required: false },
  limit: { type: Number, required: false },
  options: { type: Object, required: false },
  suggestion: { type: Object, required: false },
  appendTo: { type: Function, required: false, skipCheck: true },
  ignoreFilter: { type: Boolean, required: false }
});
const searchTerm = defineModel("searchTerm", { type: String, ...{ default: "" } });
const appConfig = useAppConfig();
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.editorMentionMenu || {} })({
  size: props.size
}));
let menu = null;
onMounted(async () => {
  await nextTick();
  if (!props.editor || props.editor.isDestroyed) {
    return;
  }
  menu = useEditorMenu({
    editor: props.editor,
    char: props.char,
    pluginKey: props.pluginKey,
    items: toRef(() => props.items),
    filterFields: props.filterFields,
    ignoreFilter: props.ignoreFilter,
    limit: props.limit,
    options: props.options,
    suggestion: props.suggestion,
    appendTo: props.appendTo,
    searchTerm,
    ui,
    onSelect: (editor, range, item) => {
      editor.chain().focus().deleteRange(range).insertContent({
        type: "mention",
        attrs: {
          ...item,
          mentionSuggestionChar: props.char
        }
      }).run();
    },
    renderItem: (item, styles) => [
      item.avatar ? h(UAvatar, { ...item.avatar, size: styles.value.itemLeadingAvatarSize(), class: styles.value.itemLeadingAvatar() }) : item.icon ? h(UIcon, { name: item.icon, class: styles.value.itemLeadingIcon() }) : null,
      h("span", { class: styles.value.itemWrapper() }, [
        h("span", { class: styles.value.itemLabel() }, item.label),
        item.description ? h("span", { class: styles.value.itemDescription() }, item.description) : null
      ])
    ]
  });
  props.editor.registerPlugin(menu.plugin);
});
onBeforeUnmount(() => {
  if (menu) {
    menu.destroy();
    menu = null;
  }
  if (props.editor && !props.editor.isDestroyed) {
    props.editor.unregisterPlugin(props.pluginKey);
  }
});
</script>

<template>
  <div />
</template>
```


## EditorSuggestionMenu.vue

```vue
<script>
import theme from "#build/ui/editor-suggestion-menu";
</script>

<script setup>
import { computed, h, inject, onMounted, onBeforeUnmount, nextTick, toRef } from "vue";
import { useAppConfig } from "#imports";
import { useEditorMenu } from "../composables/useEditorMenu";
import { createHandlers } from "../utils/editor";
import { tv } from "../utils/tv";
import UIcon from "./Icon.vue";
defineOptions({ inheritAttrs: false });
const props = defineProps({
  size: { type: null, required: false },
  items: { type: Array, required: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false },
  editor: { type: Object, required: false },
  char: { type: String, required: false, default: "/" },
  pluginKey: { type: String, required: false, default: "suggestionMenu" },
  filterFields: { type: Array, required: false },
  limit: { type: Number, required: false },
  options: { type: Object, required: false },
  suggestion: { type: Object, required: false },
  appendTo: { type: Function, required: false, skipCheck: true }
});
const appConfig = useAppConfig();
const handlers = inject("editorHandlers", computed(() => createHandlers()));
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.editorSuggestionMenu || {} })({
  size: props.size
}));
let menu = null;
onMounted(async () => {
  await nextTick();
  if (!props.editor || props.editor.isDestroyed) {
    return;
  }
  menu = useEditorMenu({
    editor: props.editor,
    char: props.char,
    pluginKey: props.pluginKey,
    items: toRef(() => props.items),
    filterFields: props.filterFields,
    limit: props.limit,
    options: props.options,
    suggestion: props.suggestion,
    appendTo: props.appendTo,
    ui,
    onSelect: (editor, range, item) => {
      if (item.type === "label" || item.type === "separator") return;
      editor.chain().focus().deleteRange(range).run();
      const handler = handlers?.value?.[item.kind];
      if (handler) {
        handler.execute(editor, item).run();
      }
    },
    renderItem: (item, styles) => {
      if (item.type === "label") {
        return [h("span", {}, item.label)];
      }
      return [
        item.icon ? h(UIcon, { name: item.icon, class: styles.value.itemLeadingIcon() }) : null,
        h("span", { class: styles.value.itemWrapper() }, [
          h("span", { class: styles.value.itemLabel() }, item.label),
          item.description ? h("span", { class: styles.value.itemDescription() }, item.description) : null
        ])
      ];
    }
  });
  props.editor.registerPlugin(menu.plugin);
});
onBeforeUnmount(() => {
  if (menu) {
    menu.destroy();
    menu = null;
  }
  if (props.editor && !props.editor.isDestroyed) {
    props.editor.unregisterPlugin(props.pluginKey);
  }
});
</script>

<template>
  <div />
</template>
```


## EditorToolbar.vue

```vue
<script>
import theme from "#build/ui/editor-toolbar";
</script>

<script setup>
import { computed, inject } from "vue";
import { Primitive, Separator } from "reka-ui";
import { defu } from "defu";
import { BubbleMenu, FloatingMenu } from "@tiptap/vue-3/menus";
import { reactiveOmit } from "@vueuse/core";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { useForwardProps } from "../composables/useForwardProps";
import { isArrayOfArray, pick, omit } from "../utils";
import { createHandlers } from "../utils/editor";
import { tv } from "../utils/tv";
import UButton from "./Button.vue";
import UDropdownMenu from "./DropdownMenu.vue";
import UTooltip from "./Tooltip.vue";
defineOptions({ inheritAttrs: false });
const _props = defineProps({
  as: { type: null, required: false },
  color: { type: null, required: false, default: "neutral" },
  variant: { type: null, required: false, default: "ghost" },
  activeColor: { type: null, required: false, default: "primary" },
  activeVariant: { type: null, required: false, default: "soft" },
  size: { type: null, required: false, default: "sm" },
  items: { type: null, required: false },
  editor: { type: Object, required: true },
  class: { type: null, required: false },
  ui: { type: Object, required: false },
  layout: { type: String, required: false, default: "fixed" },
  pluginKey: { type: [Object, String], required: false },
  updateDelay: { type: Number, required: false },
  resizeDelay: { type: Number, required: false },
  shouldShow: { type: [Function, null], required: false },
  appendTo: { type: Function, required: false, skipCheck: true },
  getReferencedVirtualElement: { type: Function, required: false },
  options: { type: Object, required: false }
});
defineSlots();
const props = useComponentProps("editorToolbar", _props);
const appConfig = useAppConfig();
const handlers = inject("editorHandlers", computed(() => createHandlers()));
const Component = computed(() => {
  return {
    bubble: BubbleMenu,
    floating: FloatingMenu,
    fixed: "template"
  }[props.layout];
});
const rootProps = useForwardProps(reactiveOmit(props, "as", "color", "variant", "activeColor", "activeVariant", "size", "items", "layout", "editor", "class", "ui"));
const options = computed(() => defu(props.options, {
  offset: 8,
  shift: { padding: 8 }
}));
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.editorToolbar || {} })({
  layout: props.layout
}));
const groups = computed(
  () => props.items?.length ? isArrayOfArray(props.items) ? props.items : [props.items] : []
);
function isActive(item) {
  if (!props.editor?.isEditable) {
    return false;
  }
  if ("items" in item && item.items?.length) {
    return item.items?.some((item2) => isActive(item2)) || false;
  }
  if (!("kind" in item)) {
    return item.active ?? false;
  }
  const handler = handlers?.value?.[item.kind];
  return handler?.isActive(props.editor, item) || false;
}
function isDisabled(item) {
  if (!props.editor?.isEditable) {
    return true;
  }
  if ("items" in item && item.items?.length) {
    const items = isArrayOfArray(item.items) ? item.items.flat() : item.items;
    const actionableItems = items.filter((item2) => item2.type !== "separator" && item2.type !== "label");
    if (actionableItems.length === 0) {
      return true;
    }
    return actionableItems.every((item2) => isDisabled(item2));
  }
  if (!("kind" in item)) {
    return item.disabled ?? false;
  }
  const handler = handlers?.value?.[item.kind];
  if (!handler) {
    return false;
  }
  if (handler.isDisabled?.(props.editor, item)) {
    return true;
  }
  return !handler.canExecute(props.editor, item);
}
function onClick(e, item) {
  if (!props.editor?.isEditable || isDisabled(item)) {
    return;
  }
  if ("items" in item || !("kind" in item)) {
    if ("onClick" in item) {
      for (const onClick2 of Array.isArray(item.onClick) ? item.onClick : [item.onClick]) {
        onClick2?.(e);
      }
    }
    return;
  }
  const handler = handlers?.value?.[item.kind];
  if (handler) {
    handler.execute(props.editor, item).run();
  }
}
function getActiveChildItem(item) {
  if (!item.items) {
    return void 0;
  }
  const items = isArrayOfArray(item.items) ? item.items.flat() : item.items;
  return items.find((childItem) => {
    if (!("kind" in childItem)) {
      return false;
    }
    return isActive(childItem);
  });
}
function getButtonProps(item) {
  const baseProps = omit(item, ["kind", "mark", "align", "level", "href", "src", "pos", "items", "slot", "checkedIcon", "loadingIcon", "externalIcon", "content", "arrow", "portal", "modal", "tooltip", "onClick"]);
  if ("items" in item && item.items?.length) {
    const activeChild = getActiveChildItem(item);
    if (activeChild?.icon) {
      baseProps.icon = activeChild.icon;
    }
    if (activeChild?.label && baseProps.label !== void 0) {
      baseProps.label = activeChild.label;
    }
  }
  return defu(baseProps, {
    color: props.color,
    activeColor: props.activeColor,
    activeVariant: props.activeVariant,
    variant: props.variant,
    size: props.size
  });
}
function getDropdownProps(item) {
  const baseProps = pick(item, ["size", "checkedIcon", "loadingIcon", "externalIcon", "content", "arrow", "portal", "modal", "ui"]);
  return defu(baseProps, {
    modal: false,
    size: props.size
  });
}
function mapDropdownItem(item) {
  const children = "children" in item && Array.isArray(item.children) ? item.children.map(mapDropdownItem) : void 0;
  if (!("kind" in item)) {
    return children ? { ...item, children } : item;
  }
  const editorToolbarItem = item;
  return {
    ...editorToolbarItem,
    ...children && { children },
    active: isActive(editorToolbarItem),
    disabled: isDisabled(editorToolbarItem),
    onSelect: (e) => onClick(e, editorToolbarItem)
  };
}
function getDropdownItems(item) {
  if (!item.items) {
    return [];
  }
  return isArrayOfArray(item.items) ? item.items.map((group) => group.map(mapDropdownItem)) : [item.items.map(mapDropdownItem)];
}
</script>

<template>
  <Primitive
    :as="Component"
    v-bind="Component !== 'template' ? {
  editor: props.editor,
  tabindex: -1,
  class: ui.root({ class: props.ui?.root }),
  ...rootProps,
  options,
  ...$attrs
} : {
  ...$attrs
}"
  >
    <Primitive :as="props.as" role="toolbar" data-slot="base" :class="ui.base({ class: [props.ui?.base, props.class] })">
      <template v-for="(group, groupIndex) in groups" :key="`group-${groupIndex}`">
        <div role="group" data-slot="group" :class="ui.group({ class: props.ui?.group })">
          <template v-for="(item, index) in group" :key="`group-${groupIndex}-${index}`">
            <slot
              :name="item.slot || 'item'"
              :item="item"
              :index="index"
              :is-active="isActive"
              :is-disabled="isDisabled"
              :on-click="onClick"
            >
              <UDropdownMenu
                v-if="'items' in item && item.items?.length"
                v-bind="getDropdownProps(item)"
                :items="getDropdownItems(item)"
              >
                <UTooltip v-if="item.tooltip" :disabled="isDisabled(item)" v-bind="{ ...item.tooltip || {} }">
                  <UButton :active="isActive(item)" :disabled="isDisabled(item)" v-bind="getButtonProps(item)" @click="onClick($event, item)" />
                </UTooltip>

                <UButton v-else :active="isActive(item)" :disabled="isDisabled(item)" v-bind="getButtonProps(item)" @click="onClick($event, item)" />
              </UDropdownMenu>

              <UTooltip v-else-if="item.tooltip" :disabled="isDisabled(item)" v-bind="{ ...item.tooltip || {} }">
                <UButton
                  :active="isActive(item)"
                  :disabled="isDisabled(item)"
                  v-bind="getButtonProps(item)"
                  :ui="item.ui"
                  @click="onClick($event, item)"
                />
              </UTooltip>

              <UButton
                v-else
                :active="isActive(item)"
                :disabled="isDisabled(item)"
                v-bind="getButtonProps(item)"
                :ui="item.ui"
                @click="onClick($event, item)"
              />
            </slot>
          </template>
        </div>

        <Separator
          v-if="groupIndex < groups.length - 1"
          data-slot="separator"
          :class="ui.separator({ class: props.ui?.separator })"
          orientation="vertical"
        />
      </template>
    </Primitive>
  </Primitive>
</template>
```


## Empty.vue

```vue
<script>
import theme from "#build/ui/empty";
</script>

<script setup>
import { computed } from "vue";
import { Primitive } from "reka-ui";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { tv } from "../utils/tv";
import UAvatar from "./Avatar.vue";
import UButton from "./Button.vue";
const _props = defineProps({
  as: { type: null, required: false },
  icon: { type: null, required: false },
  avatar: { type: Object, required: false },
  loading: { type: Boolean, required: false },
  loadingIcon: { type: null, required: false },
  title: { type: String, required: false },
  description: { type: String, required: false },
  actions: { type: Array, required: false },
  variant: { type: null, required: false },
  size: { type: null, required: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false }
});
const slots = defineSlots();
const props = useComponentProps("empty", _props);
const appConfig = useAppConfig();
const iconName = computed(() => props.loading ? props.loadingIcon || appConfig.ui.icons.loading : props.icon);
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.empty || {} })({
  variant: props.variant,
  size: props.size,
  loading: props.loading
}));
</script>

<template>
  <Primitive :as="props.as" :aria-busy="props.loading ? 'true' : void 0" data-slot="root" :class="ui.root({ class: [props.ui?.root, props.class] })">
    <div v-if="!!slots.header || (iconName || props.avatar || !!slots.leading) || (props.title || !!slots.title) || (props.description || !!slots.description)" data-slot="header" :class="ui.header({ class: props.ui?.header })">
      <slot name="header">
        <slot name="leading" :ui="ui">
          <UAvatar v-if="iconName || props.avatar" :icon="iconName" v-bind="typeof props.avatar === 'object' ? props.avatar : {}" data-slot="avatar" :class="ui.avatar({ class: props.ui?.avatar })" />
        </slot>

        <h2 v-if="props.title || !!slots.title" data-slot="title" :class="ui.title({ class: props.ui?.title })">
          <slot name="title">
            {{ props.title }}
          </slot>
        </h2>

        <div v-if="props.description || !!slots.description" data-slot="description" :class="ui.description({ class: props.ui?.description })">
          <slot name="description">
            {{ props.description }}
          </slot>
        </div>
      </slot>
    </div>

    <div v-if="!!slots.body || (props.actions?.length || !!slots.actions)" data-slot="body" :class="ui.body({ class: props.ui?.body })">
      <slot name="body">
        <div v-if="props.actions?.length || !!slots.actions" data-slot="actions" :class="ui.actions({ class: props.ui?.actions })">
          <slot name="actions">
            <UButton v-for="(action, index) in props.actions" :key="index" :size="props.size" v-bind="action" />
          </slot>
        </div>
      </slot>
    </div>

    <div v-if="!!slots.footer" data-slot="footer" :class="ui.footer({ class: props.ui?.footer })">
      <slot name="footer" />
    </div>
  </Primitive>
</template>
```


## Error.vue

```vue
<script>
import theme from "#build/ui/error";
</script>

<script setup>
import { computed } from "vue";
import { Primitive } from "reka-ui";
import { clearError, useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { useLocale } from "../composables/useLocale";
import { tv } from "../utils/tv";
import UButton from "./Button.vue";
import UIcon from "./Icon.vue";
const _props = defineProps({
  as: { type: null, required: false, default: "main" },
  icon: { type: null, required: false },
  error: { type: Object, required: false },
  redirect: { type: String, required: false, default: "/" },
  clear: { type: [Boolean, Object], required: false, default: true },
  class: { type: null, required: false },
  ui: { type: Object, required: false }
});
const slots = defineSlots();
const props = useComponentProps("error", _props);
const { t } = useLocale();
const appConfig = useAppConfig();
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.error || {} })());
function handleError() {
  clearError({ redirect: props.redirect });
}
</script>

<template>
  <Primitive :as="props.as" data-slot="root" :class="ui.root({ class: [props.ui?.root, props.class] })">
    <div v-if="props.icon || !!slots.leading" data-slot="leading" :class="ui.leading({ class: props.ui?.leading })">
      <slot name="leading" :ui="ui">
        <UIcon v-if="props.icon" :name="props.icon" data-slot="leadingIcon" :class="ui.leadingIcon({ class: props.ui?.leadingIcon })" />
      </slot>
    </div>
    <p v-if="!!props.error?.statusCode || !!props.error?.status || !!slots.statusCode" data-slot="statusCode" :class="ui.statusCode({ class: props.ui?.statusCode })">
      <slot name="statusCode">
        {{ props.error?.statusCode || props.error?.status }}
      </slot>
    </p>
    <h1 v-if="!!props.error?.statusMessage || !!props.error?.statusText || !!slots.statusMessage" data-slot="statusMessage" :class="ui.statusMessage({ class: props.ui?.statusMessage })">
      <slot name="statusMessage">
        {{ props.error?.statusMessage || props.error?.statusText }}
      </slot>
    </h1>
    <p v-if="props.error?.message && props.error.message !== (props.error.statusMessage || props.error.statusText) || !!slots.message" data-slot="message" :class="ui.message({ class: props.ui?.message })">
      <slot name="message">
        {{ props.error?.message }}
      </slot>
    </p>
    <div v-if="!!props.clear || !!slots.links" data-slot="links" :class="ui.links({ class: props.ui?.links })">
      <slot name="links">
        <UButton
          v-if="props.clear"
          size="lg"
          color="primary"
          variant="solid"
          :label="t('error.clear')"
          v-bind="typeof props.clear === 'object' ? props.clear : {}"
          @click="handleError"
        />
      </slot>
    </div>
  </Primitive>
</template>
```


## FieldGroup.vue

```vue
<script>
import theme from "#build/ui/field-group";
</script>

<script setup>
import { provide, computed } from "vue";
import { Primitive } from "reka-ui";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { fieldGroupInjectionKey } from "../composables/useFieldGroup";
import { tv } from "../utils/tv";
const _props = defineProps({
  as: { type: null, required: false },
  size: { type: null, required: false },
  orientation: { type: null, required: false, default: "horizontal" },
  class: { type: null, required: false },
  ui: { type: Object, required: false }
});
defineSlots();
const props = useComponentProps("fieldGroup", _props);
const appConfig = useAppConfig();
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.fieldGroup || {} }));
provide(fieldGroupInjectionKey, computed(() => ({
  orientation: props.orientation,
  size: props.size
})));
</script>

<template>
  <Primitive :as="props.as" :data-orientation="props.orientation" :class="ui({ orientation: props.orientation, class: [props.ui?.base, props.class] })">
    <slot />
  </Primitive>
</template>
```


## FileUpload.vue

```vue
<script>
import theme from "#build/ui/file-upload";
</script>

<script setup>
import { computed, toRef, toRefs, watch } from "vue";
import { Primitive, VisuallyHidden } from "reka-ui";
import { createReusableTemplate } from "@vueuse/core";
import { useAppConfig } from "#imports";
import { useLocale } from "../composables/useLocale";
import { useComponentProps } from "../composables/useComponentProps";
import { useFormField } from "../composables/useFormField";
import { useFileUpload } from "../composables/useFileUpload";
import { tv } from "../utils/tv";
import UAvatar from "./Avatar.vue";
import UButton from "./Button.vue";
import UIcon from "./Icon.vue";
defineOptions({ inheritAttrs: false });
const _props = defineProps({
  as: { type: null, required: false },
  id: { type: String, required: false },
  name: { type: String, required: false },
  icon: { type: [String, Boolean], required: false, skipCheck: true },
  label: { type: String, required: false },
  description: { type: String, required: false },
  color: { type: null, required: false },
  variant: { type: null, required: false },
  size: { type: null, required: false },
  layout: { type: null, required: false, default: "grid" },
  position: { type: null, required: false, default: "outside" },
  highlight: { type: Boolean, required: false },
  accept: { type: String, required: false, default: "*" },
  multiple: { type: Boolean, required: false, default: false },
  reset: { type: Boolean, required: false, default: false },
  dropzone: { type: Boolean, required: false, default: true },
  interactive: { type: Boolean, required: false, default: true },
  required: { type: Boolean, required: false },
  disabled: { type: Boolean, required: false },
  fileIcon: { type: null, required: false },
  fileImage: { type: Boolean, required: false, default: true },
  fileDelete: { type: [Boolean, Object], required: false, default: true },
  fileDeleteIcon: { type: null, required: false },
  preview: { type: Boolean, required: false, default: true },
  class: { type: null, required: false },
  ui: { type: Object, required: false }
});
const emits = defineEmits(["change"]);
const slots = defineSlots();
const modelValue = defineModel({ type: null });
const props = useComponentProps("fileUpload", _props);
const appConfig = useAppConfig();
const { t } = useLocale();
const [DefineFilesTemplate, ReuseFilesTemplate] = createReusableTemplate();
const { accept, multiple, reset } = toRefs(_props);
const { isDragging, open, inputRef, dropzoneRef } = useFileUpload({
  accept,
  reset,
  multiple,
  dropzone: props.dropzone,
  onUpdate
});
const { emitFormInput, emitFormChange, id, name, size: formFieldSize, color: formFieldColor, highlight: formFieldHighlight, disabled: formFieldDisabled, ariaAttrs } = useFormField(_props);
const color = computed(() => formFieldColor.value ?? props.color);
const highlight = computed(() => formFieldHighlight.value ?? props.highlight);
const size = computed(() => formFieldSize.value ?? props.size);
const disabled = computed(() => formFieldDisabled.value ?? props.disabled);
const variant = computed(() => props.multiple ? "area" : props.variant);
const layout = computed(() => props.variant === "button" && !props.multiple ? "grid" : props.layout);
const position = computed(() => {
  if (layout.value === "grid" && props.multiple) {
    return "inside";
  }
  if (variant.value === "button") {
    return "outside";
  }
  return props.position;
});
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.fileUpload || {} })({
  dropzone: props.dropzone,
  interactive: props.interactive,
  color: color.value,
  size: size.value,
  variant: variant.value,
  layout: layout.value,
  position: position.value,
  multiple: props.multiple,
  highlight: highlight.value,
  disabled: disabled.value
}));
function createObjectUrl(file) {
  if (!props.fileImage) return void 0;
  return URL.createObjectURL(file);
}
function formatFileSize(bytes) {
  if (bytes === 0) {
    return "0B";
  }
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const value = bytes / Math.pow(k, i);
  const formattedSize = i === 0 ? value.toString() : value.toFixed(0);
  return `${formattedSize}${sizes[i]}`;
}
function onUpdate(files, reset2 = false) {
  if (disabled.value) {
    return;
  }
  if (props.multiple) {
    if (reset2) {
      modelValue.value = files;
    } else {
      const existingFiles = modelValue.value || [];
      modelValue.value = [...existingFiles, ...files || []];
    }
  } else {
    modelValue.value = files?.[0] ?? null;
  }
  const event = new Event("change", { target: { value: modelValue.value } });
  emits("change", event);
  emitFormChange();
  emitFormInput();
}
function removeFile(index) {
  if (!modelValue.value) {
    return;
  }
  if (!props.multiple || index === void 0) {
    onUpdate([], true);
    dropzoneRef.value?.focus();
    return;
  }
  const files = [...modelValue.value];
  files.splice(index, 1);
  onUpdate(files, true);
  dropzoneRef.value?.focus();
}
watch(modelValue, (newValue) => {
  const hasModelReset = props.multiple ? !newValue?.length : !newValue;
  if (hasModelReset && inputRef.value?.$el) {
    inputRef.value.$el.value = "";
  }
});
defineExpose({
  inputRef: toRef(() => inputRef.value?.$el),
  dropzoneRef
});
</script>

<template>
  <DefineFilesTemplate>
    <template v-if="props.preview && modelValue && (Array.isArray(modelValue) ? modelValue.length : true)">
      <slot name="files-top" :files="modelValue" :open="open" :remove-file="removeFile" />

      <div data-slot="files" :class="ui.files({ class: props.ui?.files })">
        <slot name="files" :files="modelValue" :remove-file="removeFile">
          <div v-for="(file, index) in Array.isArray(modelValue) ? modelValue : [modelValue]" :key="file.name" data-slot="file" :class="ui.file({ class: props.ui?.file })">
            <slot name="file" :file="file" :index="index" :remove-file="removeFile">
              <slot name="file-leading" :file="file" :index="index" :ui="ui">
                <UAvatar
                  :as="{ img: 'img' }"
                  :src="createObjectUrl(file)"
                  :icon="props.fileIcon || appConfig.ui.icons.file"
                  :size="size"
                  data-slot="fileLeadingAvatar"
                  :class="ui.fileLeadingAvatar({ class: props.ui?.fileLeadingAvatar })"
                />
              </slot>

              <div data-slot="fileWrapper" :class="ui.fileWrapper({ class: props.ui?.fileWrapper })">
                <span data-slot="fileName" :class="ui.fileName({ class: props.ui?.fileName })">
                  <slot name="file-name" :file="file" :index="index">
                    {{ file.name }}
                  </slot>
                </span>

                <span data-slot="fileSize" :class="ui.fileSize({ class: props.ui?.fileSize })">
                  <slot name="file-size" :file="file" :index="index">
                    {{ formatFileSize(file.size) }}
                  </slot>
                </span>
              </div>

              <slot name="file-trailing" :file="file" :index="index" :ui="ui" :remove-file="removeFile">
                <UButton
                  v-if="props.fileDelete"
                  color="neutral"
                  v-bind="{
  ...layout === 'grid' ? {
    variant: 'solid',
    size: 'xs'
  } : {
    variant: 'link',
    size
  },
  ...typeof props.fileDelete === 'object' ? props.fileDelete : void 0
}"
                  :aria-label="t('fileUpload.removeFile', { filename: file.name })"
                  :trailing-icon="props.fileDeleteIcon || appConfig.ui.icons.close"
                  data-slot="fileTrailingButton"
                  :class="ui.fileTrailingButton({ class: props.ui?.fileTrailingButton })"
                  @click.stop.prevent="removeFile(index)"
                />
              </slot>
            </slot>
          </div>
        </slot>
      </div>

      <slot name="files-bottom" :files="modelValue" :open="open" :remove-file="removeFile" />
    </template>
  </DefineFilesTemplate>

  <Primitive :as="props.as" :data-slot="$attrs['data-slot'] ?? 'root'" :class="ui.root({ class: [props.ui?.root, props.class] })">
    <slot :open="open" :remove-file="removeFile" :ui="ui">
      <component
        :is="variant === 'button' ? 'button' : 'div'"
        ref="dropzoneRef"
        :type="variant === 'button' ? 'button' : void 0"
        :role="variant === 'button' ? void 0 : 'button'"
        :disabled="variant === 'button' ? disabled : void 0"
        :aria-disabled="variant === 'button' ? void 0 : disabled || void 0"
        :data-dragging="isDragging"
        data-slot="base"
        :class="ui.base({ class: props.ui?.base })"
        :tabindex="props.interactive && !disabled ? 0 : -1"
        @click="props.interactive && !disabled && open()"
        @keydown.space.prevent
        @keyup.enter.space="props.interactive && !disabled && open()"
      >
        <ReuseFilesTemplate v-if="position === 'inside'" />

        <div v-if="position === 'inside' ? !props.preview || (multiple ? !modelValue?.length : !modelValue) : true" data-slot="wrapper" :class="ui.wrapper({ class: props.ui?.wrapper })">
          <slot name="leading" :ui="ui">
            <template v-if="props.icon !== false">
              <UIcon v-if="variant === 'button'" :name="props.icon ?? appConfig.ui.icons.upload" data-slot="icon" :class="ui.icon({ class: props.ui?.icon })" />
              <UAvatar v-else :icon="props.icon ?? appConfig.ui.icons.upload" :size="size" data-slot="avatar" :class="ui.avatar({ class: props.ui?.avatar })" />
            </template>
          </slot>

          <template v-if="variant !== 'button'">
            <div v-if="props.label || !!slots.label" data-slot="label" :class="ui.label({ class: props.ui?.label })">
              <slot name="label">
                {{ props.label }}
              </slot>
            </div>
            <div v-if="props.description || !!slots.description" data-slot="description" :class="ui.description({ class: props.ui?.description })">
              <slot name="description">
                {{ props.description }}
              </slot>
            </div>

            <div v-if="!!slots.actions" data-slot="actions" :class="ui.actions({ class: props.ui?.actions })">
              <slot name="actions" :files="modelValue" :open="open" :remove-file="removeFile" />
            </div>
          </template>
        </div>
      </component>

      <ReuseFilesTemplate v-if="position === 'outside'" />
    </slot>

    <VisuallyHidden
      :id="id"
      ref="inputRef"
      as="input"
      type="file"
      feature="fully-hidden"
      :name="name"
      :accept="accept"
      :multiple="multiple"
      :required="props.required"
      :disabled="disabled"
      v-bind="{ ...$attrs, ...ariaAttrs, 'data-slot': void 0 }"
    />
  </Primitive>
</template>
```


## Footer.vue

```vue
<script>
import theme from "#build/ui/footer";
</script>

<script setup>
import { computed } from "vue";
import { Primitive } from "reka-ui";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { tv } from "../utils/tv";
import UContainer from "./Container.vue";
const _props = defineProps({
  as: { type: null, required: false, default: "footer" },
  class: { type: null, required: false },
  ui: { type: Object, required: false }
});
const slots = defineSlots();
const props = useComponentProps("footer", _props);
const appConfig = useAppConfig();
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.footer || {} })());
</script>

<template>
  <Primitive :as="props.as" data-slot="root" :class="ui.root({ class: [props.ui?.root, props.class] })">
    <div v-if="!!slots.top" data-slot="top" :class="ui.top({ class: props.ui?.top })">
      <slot name="top" />
    </div>

    <UContainer data-slot="container" :class="ui.container({ class: props.ui?.container })">
      <div data-slot="right" :class="ui.right({ class: props.ui?.right })">
        <slot name="right" />
      </div>

      <div data-slot="center" :class="ui.center({ class: props.ui?.center })">
        <slot />
      </div>

      <div data-slot="left" :class="ui.left({ class: props.ui?.left })">
        <slot name="left" />
      </div>
    </UContainer>

    <div v-if="!!slots.bottom" data-slot="bottom" :class="ui.bottom({ class: props.ui?.bottom })">
      <slot name="bottom" />
    </div>
  </Primitive>
</template>
```


## FooterColumns.vue

```vue
<script>
import theme from "#build/ui/footer-columns";
</script>

<script setup>
import { computed } from "vue";
import { Primitive } from "reka-ui";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { pickLinkProps } from "../utils/link";
import { tv } from "../utils/tv";
import ULink from "./Link.vue";
import ULinkBase from "./LinkBase.vue";
import UIcon from "./Icon.vue";
const _props = defineProps({
  as: { type: null, required: false, default: "nav" },
  class: { type: null, required: false },
  columns: { type: Array, required: false },
  ui: { type: Object, required: false }
});
const slots = defineSlots();
const props = useComponentProps("footerColumns", _props);
const appConfig = useAppConfig();
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.footerColumns || {} })());
</script>

<template>
  <Primitive :as="props.as" data-slot="root" :class="ui.root({ class: [props.ui?.root, props.class] })">
    <div v-if="!!slots.left" data-slot="left" :class="ui.left({ class: props.ui?.left })">
      <slot name="left" />
    </div>

    <div v-if="!!slots.default || props.columns?.length" data-slot="center" :class="ui.center({ class: props.ui?.center })">
      <slot>
        <div v-for="(column, index) in props.columns" :key="index">
          <h3 data-slot="label" :class="ui.label({ class: props.ui?.label })">
            <slot name="column-label" :column="column">
              {{ column.label }}
            </slot>
          </h3>

          <ul data-slot="list" :class="ui.list({ class: props.ui?.list })">
            <li v-for="(link, linkIndex) in column.children" :key="linkIndex" data-slot="item" :class="ui.item({ class: [props.ui?.item, link.ui?.item] })">
              <ULink v-slot="{ active, ...slotProps }" v-bind="pickLinkProps(link)" custom>
                <ULinkBase v-bind="slotProps" data-slot="link" :class="ui.link({ class: [props.ui?.link, link.ui?.link, link.class], active })">
                  <slot name="link" :link="link" :active="active" :ui="ui">
                    <slot name="link-leading" :link="link" :active="active" :ui="ui">
                      <UIcon v-if="link.icon" :name="link.icon" data-slot="linkLeadingIcon" :class="ui.linkLeadingIcon({ class: [props.ui?.linkLeadingIcon, link.ui?.linkLeadingIcon], active })" />
                    </slot>

                    <span v-if="link.label || !!slots['link-label']" data-slot="linkLabel" :class="ui.linkLabel({ class: [props.ui?.linkLabel, link.ui?.linkLabel], active })">
                      <slot name="link-label" :link="link" :active="active">
                        {{ link.label }}
                      </slot>

                      <UIcon v-if="link.target === '_blank'" :name="appConfig.ui.icons.external" data-slot="linkLabelExternalIcon" :class="ui.linkLabelExternalIcon({ class: [props.ui?.linkLabelExternalIcon, link.ui?.linkLabelExternalIcon], active })" />
                    </span>

                    <slot name="link-trailing" :link="link" :active="active" />
                  </slot>
                </ULinkBase>
              </ULink>
            </li>
          </ul>
        </div>
      </slot>
    </div>

    <div v-if="!!slots.right" data-slot="right" :class="ui.right({ class: props.ui?.right })">
      <slot name="right" />
    </div>
  </Primitive>
</template>
```


## Form.vue

```vue
<script>
import theme from "#build/ui/form";
</script>

<script setup>
import { provide, inject, nextTick, ref, onUnmounted, onMounted, computed, useId, readonly, reactive, useTemplateRef } from "vue";
import { useEventBus } from "@vueuse/core";
import { useAppConfig } from "#imports";
import { formOptionsInjectionKey, formInputsInjectionKey, formBusInjectionKey, formLoadingInjectionKey, formErrorsInjectionKey, formStateInjectionKey } from "../composables/useFormField";
import { tv } from "../utils/tv";
import { useComponentProps } from "../composables/useComponentProps";
import { validateSchema, getAtPath, setAtPath } from "../utils/form";
import { FormValidationException } from "../types/form";
const _props = defineProps({
  id: { type: [String, Number], required: false },
  schema: { type: null, required: false },
  state: { type: null, required: false },
  validate: { type: Function, required: false },
  validateOn: { type: Array, required: false, default() {
    return ["input", "blur", "change"];
  } },
  disabled: { type: Boolean, required: false },
  name: { type: String, required: false },
  validateOnInputDelay: { type: Number, required: false, default: 300 },
  transform: { type: null, required: false, default: () => true },
  nested: { type: Boolean, required: false },
  loadingAuto: { type: Boolean, required: false, default: true },
  class: { type: null, required: false },
  ui: { type: Object, required: false },
  onSubmit: { type: Function, required: false }
});
const emits = defineEmits(["submit", "error"]);
defineSlots();
const props = useComponentProps("form", _props);
const appConfig = useAppConfig();
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.form || {} }));
const formId = props.id ?? useId();
const formRef = useTemplateRef("formRef");
const bus = useEventBus(`form-${formId}`);
const parentBus = props.nested === true && inject(
  formBusInjectionKey,
  void 0
);
const parentState = props.nested === true ? inject(formStateInjectionKey, void 0) : void 0;
const state = computed(() => {
  if (parentState?.value) {
    return props.name ? getAtPath(parentState.value, props.name) : parentState.value;
  }
  return props.state;
});
provide(formBusInjectionKey, bus);
provide(formStateInjectionKey, state);
const nestedForms = ref(/* @__PURE__ */ new Map());
onMounted(async () => {
  if (parentBus) {
    await nextTick();
    parentBus.emit({ type: "attach", validate: _validate, formId, name: props.name, api });
  }
});
onUnmounted(() => {
  bus.reset();
  if (parentBus) {
    parentBus.emit({ type: "detach", formId });
  }
});
onMounted(async () => {
  bus.on(async (event) => {
    if (event.type === "attach") {
      nestedForms.value.set(event.formId, { validate: event.validate, name: event.name, api: event.api });
    } else if (event.type === "detach") {
      nestedForms.value.delete(event.formId);
    } else if (props.validateOn?.includes(event.type) && !loading.value) {
      if (event.type !== "input") {
        await _validate({ name: event.name, silent: true, nested: false });
      } else if (event.eager || blurredFields.has(event.name)) {
        await _validate({ name: event.name, silent: true, nested: false });
      }
    }
    if (event.type === "blur") {
      blurredFields.add(event.name);
    }
    if (event.type === "change" || event.type === "input" || event.type === "blur" || event.type === "focus") {
      touchedFields.add(event.name);
    }
    if (event.type === "change" || event.type === "input") {
      dirtyFields.add(event.name);
    }
  });
});
const errors = ref([]);
provide(formErrorsInjectionKey, errors);
const inputs = ref({});
provide(formInputsInjectionKey, inputs);
const dirtyFields = reactive(/* @__PURE__ */ new Set());
const touchedFields = reactive(/* @__PURE__ */ new Set());
const blurredFields = reactive(/* @__PURE__ */ new Set());
function resolveErrorIds(errs) {
  return errs.map((err) => ({
    ...err,
    id: err?.name ? inputs.value[err.name]?.id : void 0
  }));
}
const transformedState = ref(null);
async function getErrors() {
  let errs = props.validate ? await props.validate(state.value) ?? [] : [];
  if (props.schema) {
    const { errors: errors2, result } = await validateSchema(state.value, props.schema);
    if (errors2) {
      errs = errs.concat(errors2);
    } else {
      transformedState.value = result;
    }
  }
  return resolveErrorIds(errs);
}
async function _validate(opts = { silent: false, nested: false, transform: false }) {
  const names = opts.name && !Array.isArray(opts.name) ? [opts.name] : opts.name;
  let nestedResults = [];
  let nestedErrors = [];
  if (!names && opts.nested) {
    const validations = Array.from(nestedForms.value.values()).map(
      (form) => validateNestedForm(form, opts)
    );
    const results = await Promise.all(validations);
    nestedErrors = results.filter((r) => r.error).flatMap((r) => r.error.errors.map((e) => addFormPath(e, r.name)));
    nestedResults = results.filter((r) => r.output !== void 0);
  }
  const currentErrors = await getErrors();
  const allErrors = [...currentErrors, ...nestedErrors];
  if (names) {
    errors.value = filterErrorsByNames(allErrors, names);
  } else {
    errors.value = allErrors;
  }
  if (errors.value?.length) {
    if (opts.silent) return false;
    throw new FormValidationException(formId, errors.value);
  }
  if (opts.transform) {
    nestedResults.forEach((result) => {
      if (result.name) {
        setAtPath(transformedState.value, result.name, result.output);
      } else {
        Object.assign(transformedState.value, result.output);
      }
    });
    return transformedState.value ?? state.value;
  }
  return state.value;
}
const loading = ref(false);
provide(formLoadingInjectionKey, readonly(loading));
async function onSubmitWrapper(payload) {
  loading.value = !!props.loadingAuto;
  const event = payload;
  try {
    event.data = await _validate({ nested: true, transform: props.transform });
    await props.onSubmit?.(event);
    dirtyFields.clear();
  } catch (error) {
    if (!(error instanceof FormValidationException)) {
      throw error;
    }
    const errorEvent = {
      ...event,
      errors: error.errors
    };
    emits("error", errorEvent);
  } finally {
    loading.value = false;
  }
}
const disabled = computed(() => props.disabled || loading.value);
provide(formOptionsInjectionKey, computed(() => ({
  disabled: disabled.value,
  validateOnInputDelay: props.validateOnInputDelay
})));
async function validateNestedForm(form, opts) {
  try {
    const result = await form.validate({ ...opts, silent: false });
    return { name: form.name, output: result };
  } catch (error) {
    if (!(error instanceof FormValidationException)) throw error;
    return { name: form.name, error };
  }
}
function addFormPath(error, formPath) {
  if (!formPath || !error.name) return error;
  return { ...error, name: formPath + "." + error.name };
}
function stripFormPath(error, formPath) {
  const prefix = formPath + ".";
  const name = error?.name?.startsWith(prefix) ? error.name.substring(prefix.length) : error.name;
  return { ...error, name };
}
function filterFormErrors(errors2, formPath) {
  if (!formPath) return errors2;
  return errors2.filter((e) => e?.name?.startsWith(formPath + ".")).map((e) => stripFormPath(e, formPath));
}
function getFormErrors(form) {
  return form.api.getErrors().map(
    (e) => form.name ? { ...e, name: form.name + "." + e.name } : e
  );
}
function matchesTarget(target, path) {
  if (!target || !path) return true;
  if (target instanceof RegExp) return target.test(path);
  return path === target || typeof target === "string" && target.startsWith(path + ".");
}
function getNestedTarget(target, formPath) {
  if (!target || target instanceof RegExp) return target;
  if (formPath === target) return void 0;
  if (typeof target === "string" && target.startsWith(formPath + ".")) {
    return target.substring(formPath.length + 1);
  }
  return target;
}
function filterErrorsByNames(allErrors, names) {
  const nameSet = new Set(names);
  const patterns = names.map((name) => inputs.value?.[name]?.pattern).filter(Boolean);
  const matchesNames = (error) => {
    if (!error.name) return false;
    if (nameSet.has(error.name)) return true;
    return patterns.some((pattern) => pattern.test(error.name));
  };
  const keepErrors = errors.value.filter((error) => !matchesNames(error));
  const newErrors = allErrors.filter(matchesNames);
  return [...keepErrors, ...newErrors];
}
function filterErrorsByTarget(currentErrors, target) {
  return currentErrors.filter(
    (err) => target instanceof RegExp ? !(err.name && target.test(err.name)) : !err.name || err.name !== target
  );
}
function isLocalError(error) {
  return !error.name || !!inputs.value[error.name];
}
const api = {
  validate: _validate,
  errors,
  setErrors(errs, name) {
    const localErrors = resolveErrorIds(errs.filter(isLocalError));
    const nestedErrors = [];
    for (const form of nestedForms.value.values()) {
      if (matchesTarget(name, form.name)) {
        const formErrors = filterFormErrors(errs, form.name);
        form.api.setErrors(formErrors, getNestedTarget(name, form.name || ""));
        nestedErrors.push(...getFormErrors(form));
      }
    }
    if (name) {
      const keepErrors = filterErrorsByTarget(errors.value, name);
      errors.value = [...keepErrors, ...localErrors, ...nestedErrors];
    } else {
      errors.value = [...localErrors, ...nestedErrors];
    }
  },
  async submit() {
    if (formRef.value instanceof HTMLFormElement && formRef.value.reportValidity() === false) {
      return;
    }
    await onSubmitWrapper(new Event("submit"));
  },
  getErrors(name) {
    if (!name) return errors.value;
    return errors.value.filter(
      (err) => name instanceof RegExp ? err.name && name.test(err.name) : err.name === name
    );
  },
  clear(name) {
    const localErrors = name ? errors.value.filter(
      (err) => isLocalError(err) && (name instanceof RegExp ? !(err.name && name.test(err.name)) : err.name !== name)
    ) : [];
    const nestedErrors = [];
    for (const form of nestedForms.value.values()) {
      if (matchesTarget(name, form.name)) form.api.clear();
      nestedErrors.push(...getFormErrors(form));
    }
    errors.value = [...localErrors, ...nestedErrors];
  },
  disabled,
  loading,
  dirty: computed(() => !!dirtyFields.size),
  dirtyFields: readonly(dirtyFields),
  blurredFields: readonly(blurredFields),
  touchedFields: readonly(touchedFields)
};
defineExpose(api);
</script>

<template>
  <component
    :is="parentBus ? 'div' : 'form'"
    :id="formId"
    ref="formRef"
    :name="parentBus ? void 0 : props.name"
    :method="parentBus ? void 0 : 'post'"
    :class="ui({ class: [props.ui?.base, props.class] })"
    @submit.prevent="onSubmitWrapper"
  >
    <slot :errors="errors" :loading="loading" />
  </component>
</template>
```


## FormField.vue

```vue
<script>
import theme from "#build/ui/form-field";
</script>

<script setup>
import { computed, ref, inject, provide, useId, watch } from "vue";
import { Primitive, Label } from "reka-ui";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { formFieldInjectionKey, inputIdInjectionKey, formErrorsInjectionKey, formInputsInjectionKey } from "../composables/useFormField";
import { tv } from "../utils/tv";
const _props = defineProps({
  as: { type: null, required: false },
  name: { type: String, required: false },
  errorPattern: { type: null, required: false },
  label: { type: String, required: false },
  description: { type: String, required: false },
  help: { type: String, required: false },
  error: { type: [Boolean, String], required: false, default: void 0 },
  hint: { type: String, required: false },
  size: { type: null, required: false },
  required: { type: Boolean, required: false },
  eagerValidation: { type: Boolean, required: false },
  validateOnInputDelay: { type: Number, required: false },
  orientation: { type: null, required: false, default: "vertical" },
  class: { type: null, required: false },
  ui: { type: Object, required: false }
});
const slots = defineSlots();
const props = useComponentProps("formField", _props);
const appConfig = useAppConfig();
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.formField || {} })({
  size: props.size,
  required: props.required,
  orientation: props.orientation
}));
const formErrors = inject(formErrorsInjectionKey, null);
const error = computed(() => props.error || formErrors?.value?.find((error2) => error2.name === props.name || props.errorPattern && error2.name?.match(props.errorPattern))?.message);
const id = ref(useId());
const ariaId = id.value;
const formInputs = inject(formInputsInjectionKey, void 0);
watch(id, () => {
  if (formInputs && props.name) {
    formInputs.value[props.name] = { id: id.value, pattern: props.errorPattern };
  }
}, { immediate: true });
provide(inputIdInjectionKey, id);
provide(formFieldInjectionKey, computed(() => ({
  error: error.value,
  name: props.name,
  size: props.size,
  eagerValidation: props.eagerValidation,
  validateOnInputDelay: props.validateOnInputDelay,
  errorPattern: props.errorPattern,
  hint: props.hint,
  description: props.description,
  help: props.help,
  ariaId
})));
</script>

<template>
  <Primitive :as="props.as" :data-orientation="props.orientation" data-slot="root" :class="ui.root({ class: [props.ui?.root, props.class] })">
    <div data-slot="wrapper" :class="ui.wrapper({ class: props.ui?.wrapper })">
      <div v-if="props.label || !!slots.label" data-slot="labelWrapper" :class="ui.labelWrapper({ class: props.ui?.labelWrapper })">
        <Label :for="id" data-slot="label" :class="ui.label({ class: props.ui?.label })">
          <slot name="label" :label="props.label">
            {{ props.label }}
          </slot>
        </Label>
        <span v-if="props.hint || !!slots.hint" :id="`${ariaId}-hint`" data-slot="hint" :class="ui.hint({ class: props.ui?.hint })">
          <slot name="hint" :hint="props.hint">
            {{ props.hint }}
          </slot>
        </span>
      </div>

      <p v-if="props.description || !!slots.description" :id="`${ariaId}-description`" data-slot="description" :class="ui.description({ class: props.ui?.description })">
        <slot name="description" :description="props.description">
          {{ props.description }}
        </slot>
      </p>
    </div>

    <div :class="[(props.label || !!slots.label || props.description || !!slots.description) && ui.container({ class: props.ui?.container })]">
      <slot :error="error" />
      <div v-if="props.error !== false && (typeof error === 'string' && error || !!slots.error)" :id="`${ariaId}-error`" data-slot="error" :class="ui.error({ class: props.ui?.error })">
        <slot name="error" :error="error">
          {{ error }}
        </slot>
      </div>
      <div v-else-if="props.help || !!slots.help" :id="`${ariaId}-help`" data-slot="help" :class="ui.help({ class: props.ui?.help })">
        <slot name="help" :help="props.help">
          {{ props.help }}
        </slot>
      </div>
    </div>
  </Primitive>
</template>
```


## Header.vue

```vue
<script>
import theme from "#build/ui/header";
</script>

<script setup>
import { computed, watch, toRef } from "vue";
import { Primitive } from "reka-ui";
import { defu } from "defu";
import { createReusableTemplate } from "@vueuse/core";
import { useAppConfig, useRoute } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { useLocale } from "../composables/useLocale";
import { getSlotChildrenText } from "../utils";
import { tv } from "../utils/tv";
import UButton from "./Button.vue";
import ULink from "./Link.vue";
import UContainer from "./Container.vue";
import USlideover from "./Slideover.vue";
import UModal from "./Modal.vue";
import UDrawer from "./Drawer.vue";
defineOptions({ inheritAttrs: false });
const _props = defineProps({
  as: { type: null, required: false, default: "header" },
  title: { type: String, required: false, default: "Nuxt UI" },
  to: { type: String, required: false, default: "/" },
  mode: { type: null, required: false, default: "modal" },
  menu: { type: null, required: false },
  toggle: { type: [Boolean, Object], required: false, default: true },
  toggleSide: { type: String, required: false, default: "right" },
  autoClose: { type: Boolean, required: false, default: true },
  class: { type: null, required: false },
  ui: { type: Object, required: false }
});
const slots = defineSlots();
const props = useComponentProps("header", _props);
const open = defineModel("open", { type: Boolean, ...{ default: false } });
const route = useRoute();
const { t } = useLocale();
const appConfig = useAppConfig();
const [DefineLeftTemplate, ReuseLeftTemplate] = createReusableTemplate();
const [DefineRightTemplate, ReuseRightTemplate] = createReusableTemplate();
const [DefineToggleTemplate, ReuseToggleTemplate] = createReusableTemplate();
const ariaLabel = computed(() => {
  const slotText = slots.title && getSlotChildrenText(slots.title());
  return (slotText || props.title || "Nuxt UI").trim();
});
watch(() => route.fullPath, () => {
  if (!props.autoClose) return;
  open.value = false;
});
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.header || {} })());
const Menu = computed(() => ({
  slideover: USlideover,
  modal: UModal,
  drawer: UDrawer
})[props.mode]);
const menuProps = toRef(() => defu(props.menu, {}, props.mode === "modal" ? { fullscreen: true, transition: false } : {}));
function toggleOpen() {
  open.value = !open.value;
}
</script>

<template>
  <DefineToggleTemplate>
    <slot name="toggle" :open="open" :toggle="toggleOpen" :ui="ui">
      <UButton
        v-if="props.toggle"
        color="neutral"
        variant="ghost"
        :aria-label="open ? t('header.close') : t('header.open')"
        :icon="open ? appConfig.ui.icons.close : appConfig.ui.icons.menu"
        v-bind="typeof props.toggle === 'object' ? props.toggle : {}"
        data-slot="toggle"
        :class="ui.toggle({ class: props.ui?.toggle, toggleSide: props.toggleSide })"
        @click="toggleOpen"
      />
    </slot>
  </DefineToggleTemplate>

  <DefineLeftTemplate>
    <div data-slot="left" :class="ui.left({ class: props.ui?.left })">
      <ReuseToggleTemplate v-if="props.toggleSide === 'left'" />

      <slot name="left">
        <ULink :to="props.to" :aria-label="ariaLabel" data-slot="title" :class="ui.title({ class: props.ui?.title })">
          <slot name="title">
            {{ props.title }}
          </slot>
        </ULink>
      </slot>
    </div>
  </DefineLeftTemplate>

  <DefineRightTemplate>
    <div data-slot="right" :class="ui.right({ class: props.ui?.right })">
      <slot name="right" />

      <ReuseToggleTemplate v-if="props.toggleSide === 'right'" />
    </div>
  </DefineRightTemplate>

  <Primitive :as="props.as" data-slot="root" v-bind="$attrs" :class="ui.root({ class: [props.ui?.root, props.class] })">
    <slot name="top" />

    <UContainer data-slot="container" :class="ui.container({ class: props.ui?.container })">
      <ReuseLeftTemplate />

      <div data-slot="center" :class="ui.center({ class: props.ui?.center })">
        <slot />
      </div>

      <ReuseRightTemplate />
    </UContainer>

    <slot name="bottom" />
  </Primitive>

  <Menu
    v-model:open="open"
    :title="t('header.title')"
    :description="t('header.description')"
    v-bind="menuProps"
    :ui="{
  overlay: ui.overlay({ class: props.ui?.overlay }),
  content: ui.content({ class: props.ui?.content })
}"
  >
    <template #content="contentData">
      <slot name="content" v-bind="contentData">
        <div v-if="props.mode !== 'drawer'" data-slot="header" :class="ui.header({ class: props.ui?.header })">
          <ReuseLeftTemplate />

          <ReuseRightTemplate />
        </div>

        <div data-slot="body" :class="ui.body({ class: props.ui?.body })">
          <slot name="body" />
        </div>
      </slot>
    </template>
  </Menu>
</template>
```


## Icon.vue

```vue
<script>

</script>

<script setup>
import { useForwardProps } from "reka-ui";
import { reactivePick } from "@vueuse/core";
import NuxtIcon from "@nuxt/icon/runtime/components/index.js";
const props = defineProps({
  name: { type: null, required: true },
  mode: { type: String, required: false },
  size: { type: [String, Number], required: false },
  customize: { type: [Function, Boolean, null], required: false }
});
const iconProps = useForwardProps(reactivePick(props, "mode", "size", "customize"));
</script>

<template>
  <NuxtIcon v-if="typeof name === 'string'" :name="name" v-bind="iconProps" />
  <component :is="name" v-else />
</template>
```


## Input.vue

```vue
<script>
import theme from "#build/ui/input";
</script>

<script setup>
import { useTemplateRef, computed, onMounted, onScopeDispose } from "vue";
import { Primitive } from "reka-ui";
import { useVModel } from "@vueuse/core";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { useFieldGroup } from "../composables/useFieldGroup";
import { useComponentIcons } from "../composables/useComponentIcons";
import { useFormField } from "../composables/useFormField";
import { looseToNumber } from "../utils";
import { tv } from "../utils/tv";
import UIcon from "./Icon.vue";
import UAvatar from "./Avatar.vue";
defineOptions({ inheritAttrs: false });
const _props = defineProps({
  as: { type: null, required: false },
  id: { type: String, required: false },
  name: { type: String, required: false },
  type: { type: null, required: false, default: "text" },
  placeholder: { type: String, required: false },
  color: { type: null, required: false },
  variant: { type: null, required: false },
  size: { type: null, required: false },
  required: { type: Boolean, required: false },
  autocomplete: { type: [String, Object], required: false, default: "off" },
  autofocus: { type: Boolean, required: false },
  autofocusDelay: { type: Number, required: false, default: 0 },
  disabled: { type: Boolean, required: false },
  highlight: { type: Boolean, required: false },
  fixed: { type: Boolean, required: false },
  modelValue: { type: null, required: false },
  defaultValue: { type: null, required: false },
  modelModifiers: { type: null, required: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false },
  icon: { type: null, required: false },
  avatar: { type: Object, required: false },
  leading: { type: Boolean, required: false },
  leadingIcon: { type: null, required: false },
  trailing: { type: Boolean, required: false },
  trailingIcon: { type: null, required: false },
  loading: { type: Boolean, required: false },
  loadingIcon: { type: null, required: false }
});
const emits = defineEmits(["update:modelValue", "blur", "change"]);
const slots = defineSlots();
const props = useComponentProps("input", _props);
const modelValue = useVModel(props, "modelValue", emits, { defaultValue: props.defaultValue });
const appConfig = useAppConfig();
const { emitFormBlur, emitFormInput, emitFormChange, size: formFieldSize, color: formFieldColor, id, name, highlight: formFieldHighlight, disabled: formFieldDisabled, emitFormFocus, ariaAttrs } = useFormField(_props, { deferInputValidation: true });
const { orientation, size: fieldGroupSize } = useFieldGroup(_props);
const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(props);
const color = computed(() => formFieldColor.value ?? props.color);
const highlight = computed(() => formFieldHighlight.value ?? props.highlight);
const size = computed(() => fieldGroupSize.value ?? formFieldSize.value ?? props.size);
const disabled = computed(() => formFieldDisabled.value ?? props.disabled);
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.input || {} })({
  type: props.type,
  color: color.value,
  variant: props.variant,
  size: size.value,
  loading: props.loading,
  highlight: highlight.value,
  fixed: props.fixed,
  leading: isLeading.value || !!props.avatar || !!slots.leading,
  trailing: isTrailing.value || !!slots.trailing,
  fieldGroup: orientation.value
}));
const inputRef = useTemplateRef("inputRef");
function updateInput(value) {
  if (props.modelModifiers?.trim && (typeof value === "string" || value === null || value === void 0)) {
    value = value?.trim() ?? null;
  }
  if (props.modelModifiers?.number || props.type === "number") {
    value = looseToNumber(value);
  }
  if (props.modelModifiers?.nullable) {
    value ||= null;
  }
  if (props.modelModifiers?.optional && !props.modelModifiers?.nullable && value !== null) {
    value ||= void 0;
  }
  modelValue.value = value;
  emitFormInput();
}
function onInput(event) {
  if (!props.modelModifiers?.lazy) {
    updateInput(event.target.value);
  }
}
function onChange(event) {
  const value = event.target.value;
  if (props.modelModifiers?.lazy) {
    updateInput(value);
  }
  if (props.modelModifiers?.trim) {
    event.target.value = value.trim();
  }
  emitFormChange();
  emits("change", event);
}
function onBlur(event) {
  emitFormBlur();
  emits("blur", event);
}
function autoFocus() {
  if (props.autofocus) {
    inputRef.value?.focus();
  }
}
let autofocusTimeoutId;
onMounted(() => {
  autofocusTimeoutId = setTimeout(() => {
    autoFocus();
  }, props.autofocusDelay);
});
onScopeDispose(() => clearTimeout(autofocusTimeoutId));
defineExpose({
  inputRef
});
</script>

<template>
  <Primitive :as="props.as" :data-slot="$attrs['data-slot'] ?? 'root'" :class="ui.root({ class: [props.ui?.root, props.class] })">
    <input
      :id="id"
      ref="inputRef"
      :type="props.type"
      :value="modelValue"
      :name="name"
      :placeholder="props.placeholder"
      :class="ui.base({ class: props.ui?.base })"
      :disabled="disabled"
      :required="props.required"
      :autocomplete="props.autocomplete"
      v-bind="{ ...$attrs, ...ariaAttrs }"
      data-slot="base"
      @input="onInput"
      @blur="onBlur"
      @change="onChange"
      @focus="emitFormFocus"
    >

    <slot :ui="ui" />

    <span v-if="isLeading || !!props.avatar || !!slots.leading" data-slot="leading" :class="ui.leading({ class: props.ui?.leading })">
      <slot name="leading" :ui="ui">
        <UIcon v-if="isLeading && leadingIconName" :name="leadingIconName" data-slot="leadingIcon" :class="ui.leadingIcon({ class: props.ui?.leadingIcon })" />
        <UAvatar v-else-if="!!props.avatar" :size="props.ui?.leadingAvatarSize || ui.leadingAvatarSize()" v-bind="props.avatar" data-slot="leadingAvatar" :class="ui.leadingAvatar({ class: props.ui?.leadingAvatar })" />
      </slot>
    </span>

    <span v-if="isTrailing || !!slots.trailing" data-slot="trailing" :class="ui.trailing({ class: props.ui?.trailing })">
      <slot name="trailing" :ui="ui">
        <UIcon v-if="trailingIconName" :name="trailingIconName" data-slot="trailingIcon" :class="ui.trailingIcon({ class: props.ui?.trailingIcon })" />
      </slot>
    </span>
  </Primitive>
</template>
```


## InputDate.vue

```vue
<script>
import theme from "#build/ui/input-date";
</script>

<script setup>
import { computed, onMounted, onScopeDispose, ref } from "vue";
import { useForwardProps } from "../composables/useForwardProps";
import { DateField as SingleDateField, DateRangeField as RangeDateField } from "reka-ui/namespaced";
import { reactiveOmit, createReusableTemplate } from "@vueuse/core";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { useFieldGroup } from "../composables/useFieldGroup";
import { useComponentIcons } from "../composables/useComponentIcons";
import { useFormField } from "../composables/useFormField";
import { tv } from "../utils/tv";
import UIcon from "./Icon.vue";
import UAvatar from "./Avatar.vue";
defineOptions({ inheritAttrs: false });
const _props = defineProps({
  as: { type: null, required: false },
  color: { type: null, required: false },
  variant: { type: null, required: false },
  size: { type: null, required: false },
  highlight: { type: Boolean, required: false },
  fixed: { type: Boolean, required: false },
  autofocus: { type: Boolean, required: false },
  autofocusDelay: { type: Number, required: false, default: 0 },
  separatorIcon: { type: null, required: false },
  range: { type: Boolean, required: false },
  defaultValue: { type: null, required: false },
  modelValue: { type: null, required: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false },
  icon: { type: null, required: false },
  avatar: { type: Object, required: false },
  leading: { type: Boolean, required: false },
  leadingIcon: { type: null, required: false },
  trailing: { type: Boolean, required: false },
  trailingIcon: { type: null, required: false },
  loading: { type: Boolean, required: false },
  loadingIcon: { type: null, required: false },
  defaultPlaceholder: { type: Object, required: false },
  placeholder: { type: Object, required: false },
  hourCycle: { type: null, required: false },
  step: { type: Object, required: false },
  stepSnapping: { type: Boolean, required: false },
  granularity: { type: String, required: false },
  hideTimeZone: { type: Boolean, required: false },
  maxValue: { type: Object, required: false },
  minValue: { type: Object, required: false },
  locale: { type: String, required: false },
  disabled: { type: Boolean, required: false },
  readonly: { type: Boolean, required: false },
  isDateUnavailable: { type: Function, required: false },
  id: { type: String, required: false },
  name: { type: String, required: false },
  required: { type: Boolean, required: false }
});
const emits = defineEmits(["update:modelValue", "change", "blur", "focus", "update:placeholder"]);
const slots = defineSlots();
const props = useComponentProps("inputDate", _props);
const appConfig = useAppConfig();
const rootProps = useForwardProps(reactiveOmit(props, "id", "name", "range", "modelValue", "defaultValue", "color", "variant", "size", "highlight", "fixed", "disabled", "autofocus", "autofocusDelay", "icon", "avatar", "leading", "leadingIcon", "trailing", "trailingIcon", "loading", "loadingIcon", "separatorIcon", "class", "ui"), emits);
const { emitFormBlur, emitFormFocus, emitFormChange, emitFormInput, size: formFieldSize, color: formFieldColor, id, name, highlight: formFieldHighlight, disabled: formFieldDisabled, ariaAttrs } = useFormField(_props);
const { orientation, size: fieldGroupSize } = useFieldGroup(_props);
const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(props);
const [DefineSegmentsTemplate, ReuseSegmentsTemplate] = createReusableTemplate();
const color = computed(() => formFieldColor.value ?? props.color);
const highlight = computed(() => formFieldHighlight.value ?? props.highlight);
const size = computed(() => fieldGroupSize.value ?? formFieldSize.value ?? props.size);
const disabled = computed(() => formFieldDisabled.value ?? props.disabled);
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.inputDate || {} })({
  color: color.value,
  variant: props.variant,
  size: size.value,
  highlight: highlight.value,
  fixed: props.fixed,
  loading: props.loading,
  leading: isLeading.value || !!props.avatar || !!slots.leading,
  trailing: isTrailing.value || !!slots.trailing,
  fieldGroup: orientation.value
}));
const inputsRef = ref([]);
function setInputRef(index, el) {
  inputsRef.value[index] = el;
}
function onUpdate(value) {
  const event = new Event("change", { target: { value } });
  emits("change", event);
  emitFormChange();
  emitFormInput();
}
function onBlur(event) {
  emitFormBlur();
  emits("blur", event);
}
function onFocus(event) {
  emitFormFocus();
  emits("focus", event);
}
function autoFocus() {
  if (props.autofocus) {
    inputsRef.value[0]?.$el?.focus();
  }
}
let autofocusTimeoutId;
onMounted(() => {
  autofocusTimeoutId = setTimeout(() => {
    autoFocus();
  }, props.autofocusDelay);
});
onScopeDispose(() => clearTimeout(autofocusTimeoutId));
const DateField = computed(() => props.range ? RangeDateField : SingleDateField);
defineExpose({
  inputsRef
});
</script>

<template>
  <DefineSegmentsTemplate v-slot="{ segments, type }">
    <DateField.Input
      v-for="(segment, index) in segments"
      :key="`${segment.part}-${index}`"
      :ref="(el) => setInputRef(index, el)"
      :type="type"
      :part="segment.part"
      data-slot="segment"
      :class="ui.segment({ class: props.ui?.segment })"
      :data-segment="segment.part"
    >
      {{ segment.value.trim() }}
    </DateField.Input>
  </DefineSegmentsTemplate>

  <DateField.Root
    :id="id"
    v-slot="{ segments }"
    data-slot="base"
    v-bind="{ ...rootProps, ...$attrs, ...ariaAttrs }"
    :model-value="props.modelValue"
    :default-value="props.defaultValue"
    :name="name"
    :disabled="disabled"
    :class="ui.base({ class: [props.ui?.base, props.class] })"
    @update:model-value="onUpdate"
    @blur="onBlur"
    @focus="onFocus"
  >
    <template v-if="Array.isArray(segments)">
      <ReuseSegmentsTemplate :segments="segments" />
    </template>
    <template v-else>
      <ReuseSegmentsTemplate :segments="segments.start" type="start" />
      <slot name="separator" :ui="ui">
        <UIcon :name="props.separatorIcon || appConfig.ui.icons.minus" data-slot="separatorIcon" :class="ui.separatorIcon({ class: props.ui?.separatorIcon })" />
      </slot>
      <ReuseSegmentsTemplate :segments="segments.end" type="end" />
    </template>

    <slot :ui="ui" />

    <span v-if="isLeading || !!props.avatar || !!slots.leading" data-slot="leading" :class="ui.leading({ class: props.ui?.leading })">
      <slot name="leading" :ui="ui">
        <UIcon v-if="isLeading && leadingIconName" :name="leadingIconName" data-slot="leadingIcon" :class="ui.leadingIcon({ class: props.ui?.leadingIcon })" />
        <UAvatar v-else-if="!!props.avatar" :size="props.ui?.leadingAvatarSize || ui.leadingAvatarSize()" v-bind="props.avatar" data-slot="leadingAvatar" :class="ui.leadingAvatar({ class: props.ui?.leadingAvatar })" />
      </slot>
    </span>

    <span v-if="isTrailing || !!slots.trailing" data-slot="trailing" :class="ui.trailing({ class: props.ui?.trailing })">
      <slot name="trailing" :ui="ui">
        <UIcon v-if="trailingIconName" :name="trailingIconName" data-slot="trailingIcon" :class="ui.trailingIcon({ class: props.ui?.trailingIcon })" />
      </slot>
    </span>
  </DateField.Root>
</template>
```
