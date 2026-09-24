# Шаблоны компонентов @nuxt/ui 4.11.1 — часть 2 из 2
Источник истины по структуре DOM. Узлы помечены `data-slot`; имя слота совпадает
с ключом в `slots` соответствующей темы из `themes.json`.


## InputMenu.vue

```vue
<script>
import theme from "#build/ui/input-menu";
</script>

<script setup>
import { computed, ref, useAttrs, useTemplateRef, toRef, onMounted, onScopeDispose, toRaw, nextTick, watch } from "vue";
import { TagsInputRoot, TagsInputItem, TagsInputItemText, TagsInputItemDelete, TagsInputInput } from "reka-ui";
import { useForwardProps } from "../composables/useForwardProps";
import { Combobox, Autocomplete } from "reka-ui/namespaced";
import { defu } from "defu";
import { isEqual } from "ohash/utils";
import { reactivePick, reactiveOmit, createReusableTemplate } from "@vueuse/core";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { useFieldGroup, FieldGroupReset } from "../composables/useFieldGroup";
import { useComponentIcons } from "../composables/useComponentIcons";
import { useFormField } from "../composables/useFormField";
import { useFilter } from "../composables/useFilter";
import { useLocale } from "../composables/useLocale";
import { usePortal } from "../composables/usePortal";
import { compare, get, getDisplayValue, isArrayOfArray, looseToNumber } from "../utils";
import { getEstimateSize } from "../utils/virtualizer";
import { tv } from "../utils/tv";
import UIcon from "./Icon.vue";
import UAvatar from "./Avatar.vue";
import UButton from "./Button.vue";
import UChip from "./Chip.vue";
defineOptions({ inheritAttrs: false });
const _props = defineProps({
  as: { type: null, required: false },
  id: { type: String, required: false },
  type: { type: null, required: false, default: "text" },
  placeholder: { type: String, required: false },
  color: { type: null, required: false },
  variant: { type: null, required: false },
  size: { type: null, required: false },
  required: { type: Boolean, required: false },
  autofocus: { type: Boolean, required: false },
  autofocusDelay: { type: Number, required: false, default: 0 },
  trailingIcon: { type: null, required: false },
  selectedIcon: { type: null, required: false },
  deleteIcon: { type: null, required: false },
  clear: { type: [Boolean, Object], required: false },
  clearIcon: { type: null, required: false },
  content: { type: Object, required: false },
  arrow: { type: [Boolean, Object], required: false },
  portal: { type: [Boolean, String], required: false, skipCheck: true, default: true },
  virtualize: { type: [Boolean, Object], required: false, default: false },
  valueKey: { type: null, required: false },
  labelKey: { type: null, required: false, default: "label" },
  descriptionKey: { type: null, required: false, default: "description" },
  items: { type: null, required: false },
  defaultValue: { type: null, required: false },
  modelValue: { type: null, required: false },
  modelModifiers: { type: null, required: false },
  multiple: { type: Boolean, required: false },
  highlight: { type: Boolean, required: false },
  fixed: { type: Boolean, required: false },
  mode: { type: String, required: false, default: "combobox" },
  createItem: { type: [Boolean, String, Object], required: false },
  filterFields: { type: Array, required: false },
  ignoreFilter: { type: Boolean, required: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false },
  open: { type: Boolean, required: false },
  defaultOpen: { type: Boolean, required: false },
  disabled: { type: Boolean, required: false },
  name: { type: String, required: false },
  resetSearchTermOnBlur: { type: Boolean, required: false, default: true },
  resetSearchTermOnSelect: { type: Boolean, required: false, default: true },
  resetModelValueOnClear: { type: Boolean, required: false, default: true },
  highlightOnHover: { type: Boolean, required: false },
  openOnClick: { type: Boolean, required: false },
  openOnFocus: { type: Boolean, required: false },
  by: { type: [String, Function], required: false },
  icon: { type: null, required: false },
  avatar: { type: Object, required: false },
  leading: { type: Boolean, required: false },
  leadingIcon: { type: null, required: false },
  trailing: { type: Boolean, required: false },
  loading: { type: Boolean, required: false },
  loadingIcon: { type: null, required: false }
});
const emits = defineEmits(["change", "blur", "focus", "create", "clear", "highlight", "remove-tag", "update:modelValue", "update:open"]);
const slots = defineSlots();
const props = useComponentProps("inputMenu", _props);
const searchTerm = defineModel("searchTerm", { type: String, ...{ default: "" } });
const { t } = useLocale();
const appConfig = useAppConfig();
const { filterGroups } = useFilter();
const isAutocomplete = computed(() => props.mode === "autocomplete");
const rootPropsPick = reactivePick(props, "as", "modelValue", "defaultValue", "open", "defaultOpen", "required", "multiple", "resetSearchTermOnBlur", "resetSearchTermOnSelect", "resetModelValueOnClear", "highlightOnHover", "openOnClick", "openOnFocus", "by");
const rootPropsOmitted = reactiveOmit(rootPropsPick, "multiple", "resetSearchTermOnSelect", "resetModelValueOnClear", "by");
const rootProps = useForwardProps(computed(() => isAutocomplete.value ? rootPropsOmitted : rootPropsPick), emits);
const Component = computed(() => isAutocomplete.value ? Autocomplete : Combobox);
const attrs = useAttrs();
const baseDataSlot = computed(() => props.multiple && !isAutocomplete.value ? attrs["data-slot"] ?? "base" : "base");
const portalProps = usePortal(toRef(() => props.portal));
const contentProps = toRef(() => defu(props.content, { side: "bottom", sideOffset: 8, collisionPadding: 8, position: "popper" }));
const arrowProps = toRef(() => defu(props.arrow, { rounded: true }));
const clearProps = computed(() => typeof props.clear === "object" ? props.clear : {});
const virtualizerProps = toRef(() => {
  if (!props.virtualize) return false;
  return defu(typeof props.virtualize === "boolean" ? {} : props.virtualize, {
    estimateSize: getEstimateSize(filteredItems.value, size.value ?? "md", props.descriptionKey, !!slots["item-description"])
  });
});
const { emitFormBlur, emitFormFocus, emitFormChange, emitFormInput, size: formFieldSize, color: formFieldColor, id, name, highlight: formFieldHighlight, disabled: formFieldDisabled, ariaAttrs } = useFormField(_props);
const { orientation, size: fieldGroupSize } = useFieldGroup(_props);
const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(computed(() => ({
  icon: props.icon,
  leading: props.leading,
  leadingIcon: props.leadingIcon,
  trailing: props.trailing,
  trailingIcon: props.trailingIcon ?? appConfig.ui.icons.chevronDown,
  loading: props.loading,
  loadingIcon: props.loadingIcon
})));
const color = computed(() => formFieldColor.value ?? props.color);
const highlight = computed(() => formFieldHighlight.value ?? props.highlight);
const size = computed(() => fieldGroupSize.value ?? formFieldSize.value ?? props.size);
const disabled = computed(() => formFieldDisabled.value ?? props.disabled);
const [DefineCreateItemTemplate, ReuseCreateItemTemplate] = createReusableTemplate();
const [DefineItemTemplate, ReuseItemTemplate] = createReusableTemplate({
  props: {
    item: {
      type: [Object, String, Number, Boolean],
      required: true
    },
    index: {
      type: Number,
      required: false
    }
  }
});
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.inputMenu || {} })({
  color: color.value,
  variant: props.variant,
  size: size.value,
  loading: props.loading,
  highlight: highlight.value,
  fixed: props.fixed,
  leading: isLeading.value || !!props.avatar || !!slots.leading,
  trailing: isTrailing.value || !!slots.trailing,
  multiple: props.multiple,
  fieldGroup: orientation.value,
  virtualize: !!props.virtualize
}));
const items = computed(() => groups.value.flatMap((group) => group));
function displayValue(value) {
  return getDisplayValue(items.value, value, {
    labelKey: props.labelKey,
    valueKey: props.valueKey,
    by: props.by
  }) ?? "";
}
const groups = computed(
  () => props.items?.length ? isArrayOfArray(props.items) ? props.items : [props.items] : []
);
const filteredGroups = computed(() => {
  if (props.ignoreFilter || !searchTerm.value) {
    return groups.value;
  }
  const fields = Array.isArray(props.filterFields) ? props.filterFields : [props.labelKey];
  return filterGroups(groups.value, searchTerm.value, {
    fields,
    isStructural: (item) => isInputItem(item) && !!item.type && ["label", "separator"].includes(item.type)
  });
});
const filteredItems = computed(() => filteredGroups.value.flatMap((group) => group));
const createItem = computed(() => {
  if (!props.createItem || !searchTerm.value) {
    return false;
  }
  const newItem = props.valueKey ? { [props.valueKey]: searchTerm.value } : searchTerm.value;
  if (typeof props.createItem === "object" && props.createItem.when === "always" || props.createItem === "always") {
    return !filteredItems.value.find((item) => compare(item, newItem, props.by ?? props.valueKey));
  }
  return !filteredItems.value.length;
});
const createItemPosition = computed(() => typeof props.createItem === "object" ? props.createItem.position : "bottom");
const inputRef = useTemplateRef("inputRef");
function autoFocus() {
  if (props.autofocus) {
    inputRef.value?.$el?.focus();
  }
}
let autofocusTimeoutId;
onMounted(() => {
  nextTick(() => {
    if (isAutocomplete.value) {
      searchTerm.value = String(props.modelValue ?? props.defaultValue ?? "");
    } else {
      searchTerm.value = "";
    }
  });
  autofocusTimeoutId = setTimeout(() => {
    autoFocus();
  }, props.autofocusDelay);
});
onScopeDispose(() => clearTimeout(autofocusTimeoutId));
watch(() => props.modelValue, (newValue) => {
  if (isAutocomplete.value) {
    searchTerm.value = String(newValue ?? "");
  }
});
function onUpdate(value) {
  if (toRaw(props.modelValue) === value) {
    return;
  }
  if (props.modelModifiers?.trim && (typeof value === "string" || value === null || value === void 0)) {
    value = value?.trim() ?? null;
  }
  if (props.modelModifiers?.number) {
    value = looseToNumber(value);
  }
  if (props.modelModifiers?.nullable) {
    value ??= null;
  }
  if (props.modelModifiers?.optional && !props.modelModifiers?.nullable && value !== null) {
    value ??= void 0;
  }
  const event = new Event("change", { target: { value } });
  emits("change", event);
  emitFormChange();
  emitFormInput();
  if (isAutocomplete.value) {
    searchTerm.value = String(value ?? "");
  } else if (props.resetSearchTermOnSelect) {
    searchTerm.value = "";
  }
}
function onInputUpdate(value) {
  if (!isAutocomplete.value) {
    searchTerm.value = value;
  }
}
function onBlur(event) {
  emits("blur", event);
  emitFormBlur();
}
function onFocus(event) {
  emits("focus", event);
  emitFormFocus();
}
const isOpen = ref(false);
let timeoutId;
onScopeDispose(() => clearTimeout(timeoutId));
function onUpdateOpen(value) {
  isOpen.value = value;
  if (!value) {
    const event = new FocusEvent("blur");
    emits("blur", event);
    emitFormBlur();
    if (!isAutocomplete.value && props.resetSearchTermOnBlur) {
      const STATE_ANIMATION_DELAY_MS = 100;
      timeoutId = setTimeout(() => {
        searchTerm.value = "";
      }, STATE_ANIMATION_DELAY_MS);
    }
  } else {
    const event = new FocusEvent("focus");
    emits("focus", event);
    emitFormFocus();
    clearTimeout(timeoutId);
  }
}
function onRemoveTag(event, modelValue) {
  if (props.multiple) {
    const filteredValue = modelValue.filter((value) => !isEqual(value, event));
    emits("update:modelValue", filteredValue);
    emits("remove-tag", event);
    onUpdate(filteredValue);
  }
}
function onCreate(e) {
  e.preventDefault();
  e.stopPropagation();
  emits("create", searchTerm.value);
}
function onSelect(e, item) {
  if (!isInputItem(item)) {
    return;
  }
  if (item.disabled) {
    e.preventDefault();
    return;
  }
  item.onSelect?.(e);
}
function isInputItem(item) {
  return typeof item === "object" && item !== null;
}
function isModelValueEmpty(modelValue) {
  if (props.multiple && Array.isArray(modelValue)) {
    return modelValue.length === 0;
  }
  return modelValue === void 0 || modelValue === null || modelValue === "";
}
function onClear() {
  emits("clear");
}
const viewportRef = useTemplateRef("viewportRef");
const comboboxRootRef = useTemplateRef("comboboxRootRef");
watch(() => props.items, async () => {
  if (!isOpen.value || !props.createItem) {
    return;
  }
  await nextTick();
  comboboxRootRef.value?.highlightFirstItem?.();
}, { flush: "post" });
defineExpose({
  inputRef: toRef(() => inputRef.value?.$el),
  viewportRef: toRef(() => viewportRef.value)
});
</script>

<template>
  <DefineCreateItemTemplate>
    <Component.Item
      data-slot="item"
      :class="ui.item({ class: props.ui?.item })"
      :value="searchTerm"
      @select="onCreate"
    >
      <span data-slot="itemLabel" :class="ui.itemLabel({ class: props.ui?.itemLabel })">
        <slot name="create-item-label" :item="searchTerm">
          {{ t("inputMenu.create", { label: searchTerm }) }}
        </slot>
      </span>
    </Component.Item>
  </DefineCreateItemTemplate>

  <DefineItemTemplate v-slot="{ item, index }">
    <Component.Label v-if="isInputItem(item) && item.type === 'label'" data-slot="label" :class="ui.label({ class: [props.ui?.label, item.ui?.label, item.class] })">
      {{ get(item, props.labelKey) }}
    </Component.Label>

    <Component.Separator v-else-if="isInputItem(item) && item.type === 'separator'" data-slot="separator" :class="ui.separator({ class: [props.ui?.separator, item.ui?.separator, item.class] })" />

    <Component.Item
      v-else
      data-slot="item"
      :class="ui.item({ class: [props.ui?.item, isInputItem(item) && item.ui?.item, isInputItem(item) && item.class] })"
      :disabled="isInputItem(item) && item.disabled"
      :value="props.valueKey && isInputItem(item) ? get(item, props.valueKey) : item"
      @select="onSelect($event, item)"
    >
      <slot name="item" :item="item" :index="index" :ui="ui">
        <slot name="item-leading" :item="item" :index="index" :ui="ui">
          <UIcon v-if="isInputItem(item) && item.icon" :name="item.icon" data-slot="itemLeadingIcon" :class="ui.itemLeadingIcon({ class: [props.ui?.itemLeadingIcon, item.ui?.itemLeadingIcon] })" />
          <UAvatar v-else-if="isInputItem(item) && item.avatar" :size="item.ui?.itemLeadingAvatarSize || props.ui?.itemLeadingAvatarSize || ui.itemLeadingAvatarSize()" v-bind="item.avatar" data-slot="itemLeadingAvatar" :class="ui.itemLeadingAvatar({ class: [props.ui?.itemLeadingAvatar, item.ui?.itemLeadingAvatar] })" />
          <UChip
            v-else-if="isInputItem(item) && item.chip"
            :size="item.ui?.itemLeadingChipSize || props.ui?.itemLeadingChipSize || ui.itemLeadingChipSize()"
            inset
            standalone
            v-bind="item.chip"
            data-slot="itemLeadingChip"
            :class="ui.itemLeadingChip({ class: [props.ui?.itemLeadingChip, item.ui?.itemLeadingChip] })"
          />
        </slot>

        <span data-slot="itemWrapper" :class="ui.itemWrapper({ class: [props.ui?.itemWrapper, isInputItem(item) && item.ui?.itemWrapper] })">
          <span data-slot="itemLabel" :class="ui.itemLabel({ class: [props.ui?.itemLabel, isInputItem(item) && item.ui?.itemLabel] })">
            <slot name="item-label" :item="item" :index="index">
              {{ isInputItem(item) ? get(item, props.labelKey) : item }}
            </slot>
          </span>

          <span v-if="isInputItem(item) && (get(item, props.descriptionKey) || !!slots['item-description'])" data-slot="itemDescription" :class="ui.itemDescription({ class: [props.ui?.itemDescription, isInputItem(item) && item.ui?.itemDescription] })">
            <slot name="item-description" :item="item" :index="index">
              {{ get(item, props.descriptionKey) }}
            </slot>
          </span>
        </span>

        <span data-slot="itemTrailing" :class="ui.itemTrailing({ class: [props.ui?.itemTrailing, isInputItem(item) && item.ui?.itemTrailing] })">
          <slot name="item-trailing" :item="item" :index="index" :ui="ui" />

          <Component.ItemIndicator v-if="!isAutocomplete" as-child>
            <UIcon :name="props.selectedIcon || appConfig.ui.icons.check" data-slot="itemTrailingIcon" :class="ui.itemTrailingIcon({ class: [props.ui?.itemTrailingIcon, isInputItem(item) && item.ui?.itemTrailingIcon] })" />
          </Component.ItemIndicator>
        </span>
      </slot>
    </Component.Item>
  </DefineItemTemplate>

  <Component.Root
    ref="comboboxRootRef"
    v-slot="{ modelValue, open }"
    v-bind="rootProps"
    :name="name"
    :disabled="disabled"
    :data-slot="$attrs['data-slot'] ?? 'root'"
    :class="ui.root({ class: [props.ui?.root, props.class] })"
    :as-child="!!props.multiple && !isAutocomplete"
    ignore-filter
    @update:model-value="onUpdate"
    @update:open="onUpdateOpen"
  >
    <Component.Anchor :as-child="!props.multiple" :data-slot="baseDataSlot" :class="ui.base({ class: props.ui?.base })">
      <TagsInputRoot
        v-if="props.multiple && !isAutocomplete"
        v-slot="{ modelValue: tags }"
        :model-value="modelValue"
        :disabled="disabled"
        :required="props.required"
        delimiter=""
        as-child
        @blur="onBlur"
        @focus="onFocus"
        @remove-tag="onRemoveTag($event, modelValue)"
      >
        <TagsInputItem v-for="(item, index) in tags" :key="index" :value="item" data-slot="tagsItem" :class="ui.tagsItem({ class: [props.ui?.tagsItem, isInputItem(item) && item.ui?.tagsItem] })">
          <TagsInputItemText data-slot="tagsItemText" :class="ui.tagsItemText({ class: [props.ui?.tagsItemText, isInputItem(item) && item.ui?.tagsItemText] })">
            <slot name="tags-item-text" :item="item" :index="index">
              {{ displayValue(item) }}
            </slot>
          </TagsInputItemText>

          <TagsInputItemDelete data-slot="tagsItemDelete" :class="ui.tagsItemDelete({ class: [props.ui?.tagsItemDelete, isInputItem(item) && item.ui?.tagsItemDelete] })" :disabled="disabled">
            <slot name="tags-item-delete" :item="item" :index="index" :ui="ui">
              <UIcon :name="props.deleteIcon || appConfig.ui.icons.close" data-slot="tagsItemDeleteIcon" :class="ui.tagsItemDeleteIcon({ class: [props.ui?.tagsItemDeleteIcon, isInputItem(item) && item.ui?.tagsItemDeleteIcon] })" />
            </slot>
          </TagsInputItemDelete>
        </TagsInputItem>

        <Component.Input v-model="searchTerm" as-child>
          <TagsInputInput
            :id="id"
            ref="inputRef"
            v-bind="{ ...$attrs, ...ariaAttrs }"
            :placeholder="props.placeholder"
            data-slot="tagsInput"
            :class="ui.tagsInput({ class: props.ui?.tagsInput })"
            @change.stop
          />
        </Component.Input>
      </TagsInputRoot>

      <Component.Input
        v-else
        :id="id"
        ref="inputRef"
        v-bind="{ ...!isAutocomplete ? { displayValue } : {}, ...$attrs, ...ariaAttrs }"
        :data-slot="props.multiple ? void 0 : 'base'"
        :type="props.type"
        :placeholder="props.placeholder"
        :required="props.required"
        @blur="onBlur"
        @focus="onFocus"
        @change.stop
        @update:model-value="onInputUpdate"
      />

      <span v-if="isLeading || !!props.avatar || !!slots.leading" data-slot="leading" :class="ui.leading({ class: props.ui?.leading })">
        <slot name="leading" :model-value="modelValue" :open="open" :ui="ui">
          <UIcon v-if="isLeading && leadingIconName" :name="leadingIconName" data-slot="leadingIcon" :class="ui.leadingIcon({ class: props.ui?.leadingIcon })" />
          <UAvatar v-else-if="!!props.avatar" :size="props.ui?.itemLeadingAvatarSize || ui.itemLeadingAvatarSize()" v-bind="props.avatar" data-slot="itemLeadingAvatar" :class="ui.itemLeadingAvatar({ class: props.ui?.itemLeadingAvatar })" />
        </slot>
      </span>

      <Component.Trigger v-if="isTrailing || !!slots.trailing || !!props.clear" data-slot="trailing" :class="ui.trailing({ class: props.ui?.trailing })">
        <slot name="trailing" :model-value="modelValue" :open="open" :ui="ui">
          <Component.Cancel v-if="!!props.clear && !isModelValueEmpty(modelValue)" as-child>
            <UButton
              as="span"
              :icon="props.clearIcon || appConfig.ui.icons.close"
              :size="size"
              variant="link"
              color="neutral"
              tabindex="-1"
              v-bind="clearProps"
              data-slot="trailingClear"
              :class="ui.trailingClear({ class: props.ui?.trailingClear })"
              @click.stop="onClear"
            />
          </Component.Cancel>

          <UIcon v-else-if="trailingIconName" :name="trailingIconName" data-slot="trailingIcon" :class="ui.trailingIcon({ class: props.ui?.trailingIcon })" />
        </slot>
      </Component.Trigger>
    </Component.Anchor>

    <Component.Portal v-bind="portalProps">
      <FieldGroupReset>
        <Component.Content data-slot="content" :class="ui.content({ class: props.ui?.content })" v-bind="contentProps" @focus-outside.prevent>
          <slot name="content-top" />

          <Component.Empty data-slot="empty" :class="ui.empty({ class: props.ui?.empty })">
            <slot name="empty" :search-term="searchTerm">
              {{ searchTerm ? t("inputMenu.noMatch", { searchTerm }) : t("inputMenu.noData") }}
            </slot>
          </Component.Empty>

          <div ref="viewportRef" role="presentation" data-slot="viewport" :class="ui.viewport({ class: props.ui?.viewport })">
            <template v-if="!!props.virtualize">
              <ReuseCreateItemTemplate v-if="createItem && createItemPosition === 'top'" />

              <Component.Virtualizer
                v-slot="{ option: item, virtualItem }"
                :options="filteredItems"
                :text-content="(item2) => isInputItem(item2) ? get(item2, props.labelKey) : String(item2)"
                v-bind="virtualizerProps"
              >
                <ReuseItemTemplate :item="item" :index="virtualItem.index" />
              </Component.Virtualizer>

              <ReuseCreateItemTemplate v-if="createItem && createItemPosition === 'bottom'" />
            </template>

            <template v-else>
              <Component.Group v-if="createItem && createItemPosition === 'top'" data-slot="group" :class="ui.group({ class: props.ui?.group })">
                <ReuseCreateItemTemplate />
              </Component.Group>

              <Component.Group v-for="(group, groupIndex) in filteredGroups" :key="`group-${groupIndex}`" data-slot="group" :class="ui.group({ class: props.ui?.group })">
                <ReuseItemTemplate v-for="(item, index) in group" :key="`group-${groupIndex}-${index}`" :item="item" :index="index" />
              </Component.Group>

              <Component.Group v-if="createItem && createItemPosition === 'bottom'" data-slot="group" :class="ui.group({ class: props.ui?.group })">
                <ReuseCreateItemTemplate />
              </Component.Group>
            </template>
          </div>

          <slot name="content-bottom" />

          <Component.Arrow v-if="!!props.arrow" v-bind="arrowProps" data-slot="arrow" :class="ui.arrow({ class: props.ui?.arrow })" />
        </Component.Content>
      </FieldGroupReset>
    </Component.Portal>
  </Component.Root>
</template>
```


## InputNumber.vue

```vue
<script>
import theme from "#build/ui/input-number";
</script>

<script setup>
import { onMounted, onScopeDispose, computed, useTemplateRef, toRef } from "vue";
import { NumberFieldRoot, NumberFieldInput, NumberFieldDecrement, NumberFieldIncrement } from "reka-ui";
import { useForwardProps } from "../composables/useForwardProps";
import { reactivePick } from "@vueuse/core";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { useFieldGroup } from "../composables/useFieldGroup";
import { useFormField } from "../composables/useFormField";
import { useLocale } from "../composables/useLocale";
import { tv } from "../utils/tv";
import UButton from "./Button.vue";
defineOptions({ inheritAttrs: false });
const _props = defineProps({
  as: { type: null, required: false },
  placeholder: { type: String, required: false },
  color: { type: null, required: false },
  variant: { type: null, required: false },
  size: { type: null, required: false },
  highlight: { type: Boolean, required: false },
  fixed: { type: Boolean, required: false },
  orientation: { type: null, required: false, default: "horizontal" },
  increment: { type: [Boolean, Object], required: false, default: true },
  incrementIcon: { type: null, required: false },
  incrementDisabled: { type: Boolean, required: false },
  decrement: { type: [Boolean, Object], required: false, default: true },
  decrementIcon: { type: null, required: false },
  decrementDisabled: { type: Boolean, required: false },
  autofocus: { type: Boolean, required: false },
  autofocusDelay: { type: Number, required: false },
  defaultValue: { type: null, required: false },
  modelValue: { type: null, required: false },
  modelModifiers: { type: null, required: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false },
  min: { type: Number, required: false },
  max: { type: Number, required: false },
  step: { type: Number, required: false },
  stepSnapping: { type: Boolean, required: false },
  disabled: { type: Boolean, required: false },
  required: { type: Boolean, required: false },
  id: { type: String, required: false },
  name: { type: String, required: false },
  formatOptions: { type: null, required: false },
  disableWheelChange: { type: Boolean, required: false },
  invertWheelChange: { type: Boolean, required: false },
  readonly: { type: Boolean, required: false },
  focusOnChange: { type: Boolean, required: false },
  locale: { type: String, required: false }
});
const emits = defineEmits(["update:modelValue", "blur", "change"]);
defineSlots();
const props = useComponentProps("inputNumber", _props);
const { t } = useLocale();
const appConfig = useAppConfig();
const rootProps = useForwardProps(reactivePick(props, "as", "stepSnapping", "formatOptions", "disableWheelChange", "invertWheelChange", "required", "readonly", "focusOnChange", "locale"));
const { emitFormBlur, emitFormFocus, emitFormChange, emitFormInput, id, color: formFieldColor, size: formFieldSize, name, highlight: formFieldHighlight, disabled: formFieldDisabled, ariaAttrs } = useFormField(_props);
const { orientation, size: fieldGroupSize } = useFieldGroup(_props);
const color = computed(() => formFieldColor.value ?? props.color);
const highlight = computed(() => formFieldHighlight.value ?? props.highlight);
const size = computed(() => fieldGroupSize.value ?? formFieldSize.value ?? props.size);
const disabled = computed(() => formFieldDisabled.value ?? props.disabled);
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.inputNumber || {} })({
  color: color.value,
  variant: props.variant,
  size: size.value,
  highlight: highlight.value,
  fixed: props.fixed,
  orientation: props.orientation,
  fieldGroup: orientation.value,
  increment: props.orientation === "vertical" ? !!props.increment || !!props.decrement : !!props.increment,
  decrement: props.orientation === "vertical" ? false : !!props.decrement
}));
const incrementIcon = computed(() => props.incrementIcon || (props.orientation === "horizontal" ? appConfig.ui.icons.plus : appConfig.ui.icons.chevronUp));
const decrementIcon = computed(() => props.decrementIcon || (props.orientation === "horizontal" ? appConfig.ui.icons.minus : appConfig.ui.icons.chevronDown));
const inputRef = useTemplateRef("inputRef");
function onUpdate(value) {
  if (props.modelModifiers?.optional) {
    value = value ?? void 0;
  }
  if (value === props.modelValue || value == null && props.modelValue == null) {
    return;
  }
  emits("update:modelValue", value);
  const event = new Event("change", { target: { value } });
  emits("change", event);
  emitFormChange();
  emitFormInput();
}
function onBlur(event) {
  emitFormBlur();
  emits("blur", event);
}
function autoFocus() {
  if (props.autofocus) {
    inputRef.value?.$el?.focus();
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
  inputRef: toRef(() => inputRef.value?.$el)
});
</script>

<template>
  <NumberFieldRoot
    v-bind="rootProps"
    :id="id"
    :default-value="props.defaultValue"
    :model-value="props.modelValue"
    :min="props.min"
    :max="props.max"
    :step="props.step"
    :data-slot="$attrs['data-slot'] ?? 'root'"
    :class="ui.root({ class: [props.ui?.root, props.class] })"
    :name="name"
    :disabled="disabled"
    @update:model-value="(val) => onUpdate(val)"
  >
    <NumberFieldInput
      v-bind="{ ...$attrs, ...ariaAttrs }"
      ref="inputRef"
      :placeholder="props.placeholder"
      :required="props.required"
      data-slot="base"
      :class="ui.base({ class: props.ui?.base })"
      @blur="onBlur"
      @focus="emitFormFocus"
    />

    <div v-if="!!props.increment" data-slot="increment" :class="ui.increment({ class: props.ui?.increment })">
      <NumberFieldIncrement as-child :disabled="disabled || props.incrementDisabled">
        <slot name="increment">
          <UButton
            :icon="incrementIcon"
            :color="color"
            :size="size"
            variant="link"
            :aria-label="t('inputNumber.increment')"
            v-bind="typeof props.increment === 'object' ? props.increment : void 0"
          />
        </slot>
      </NumberFieldIncrement>
    </div>

    <div v-if="!!props.decrement" data-slot="decrement" :class="ui.decrement({ class: props.ui?.decrement })">
      <NumberFieldDecrement as-child :disabled="disabled || props.decrementDisabled">
        <slot name="decrement">
          <UButton
            :icon="decrementIcon"
            :color="color"
            :size="size"
            variant="link"
            :aria-label="t('inputNumber.decrement')"
            v-bind="typeof props.decrement === 'object' ? props.decrement : void 0"
          />
        </slot>
      </NumberFieldDecrement>
    </div>
  </NumberFieldRoot>
</template>
```


## InputRating.vue

```vue
<script>
import theme from "#build/ui/input-rating";
</script>

<script setup>
import { computed } from "vue";
import { RatingRoot, RatingItem, RatingItemIndicator } from "reka-ui";
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
  id: { type: String, required: false },
  readonly: { type: Boolean, required: false, default: false },
  icon: { type: null, required: false },
  emptyIcon: { type: null, required: false },
  color: { type: null, required: false },
  size: { type: null, required: false },
  orientation: { type: null, required: false, default: "horizontal" },
  class: { type: null, required: false },
  ui: { type: Object, required: false },
  length: { type: Number, required: false, default: 5 },
  step: { type: Number, required: false, default: 1 },
  name: { type: String, required: false },
  disabled: { type: Boolean, required: false },
  required: { type: Boolean, required: false },
  clearable: { type: Boolean, required: false, default: false },
  hoverable: { type: Boolean, required: false, default: false },
  modelValue: { type: Number, required: false },
  defaultValue: { type: Number, required: false, default: 0 }
});
const emits = defineEmits(["change", "update:modelValue"]);
defineSlots();
const props = useComponentProps("inputRating", _props);
const appConfig = useAppConfig();
const rootProps = useForwardProps(reactivePick(props, "as", "length", "step", "hoverable", "clearable", "required", "modelValue", "defaultValue"), emits);
const { id, emitFormChange, emitFormInput, size: formFieldSize, color: formFieldColor, name, disabled: formFieldDisabled, ariaAttrs } = useFormField(_props);
const color = computed(() => formFieldColor.value ?? props.color);
const size = computed(() => formFieldSize.value ?? props.size);
const disabled = computed(() => formFieldDisabled.value ?? props.disabled);
const rootDisabled = computed(() => disabled.value || props.readonly);
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.inputRating || {} })({
  size: size.value,
  color: color.value,
  orientation: props.orientation,
  readonly: props.readonly && !disabled.value,
  disabled: disabled.value
}));
const starIcon = computed(() => props.icon ?? appConfig.ui.icons.star);
function onUpdate(value) {
  const event = new Event("change", { target: { value } });
  emits("change", event);
  emitFormChange();
  emitFormInput();
}
</script>

<template>
  <RatingRoot
    :id="id"
    v-slot="{ items }"
    data-slot="root"
    v-bind="{ ...rootProps, ...$attrs, ...ariaAttrs }"
    :name="name"
    :disabled="rootDisabled"
    :aria-readonly="props.readonly || void 0"
    :orientation="props.orientation"
    :class="ui.root({ class: [props.ui?.root, props.class] })"
    @update:model-value="onUpdate"
  >
    <RatingItem
      v-for="item in items"
      v-slot="{ steps }"
      :key="item"
      :item="item"
      data-slot="item"
      :class="ui.item({ class: props.ui?.item })"
    >
      <!-- Empty icon as background -->
      <slot name="item" :index="item" :filled="false">
        <UIcon
          :name="props.emptyIcon ?? starIcon"
          data-slot="emptyIcon"
          :class="ui.emptyIcon({ class: props.ui?.emptyIcon })"
        />
      </slot>

      <!-- Indicators overlaid for each step, clipped to the rated fraction -->
      <RatingItemIndicator
        v-for="step in steps"
        :key="step"
        :step="step"
        :aria-label="`Rate ${step} out of ${props.length}`"
        data-slot="indicator"
        :class="ui.indicator({ class: props.ui?.indicator })"
      >
        <slot name="item" :index="item" :filled="true">
          <UIcon
            :name="starIcon"
            data-slot="icon"
            :class="ui.icon({ class: props.ui?.icon })"
          />
        </slot>
      </RatingItemIndicator>
    </RatingItem>
  </RatingRoot>
</template>
```


## InputTags.vue

```vue
<script>
import theme from "#build/ui/input-tags";
</script>

<script setup>
import { computed, useTemplateRef, onMounted, onScopeDispose, toRaw, toRef } from "vue";
import { TagsInputRoot, TagsInputItem, TagsInputItemText, TagsInputItemDelete, TagsInputInput } from "reka-ui";
import { useForwardProps } from "../composables/useForwardProps";
import { reactivePick } from "@vueuse/core";
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
  placeholder: { type: String, required: false },
  maxLength: { type: Number, required: false },
  color: { type: null, required: false },
  variant: { type: null, required: false },
  size: { type: null, required: false },
  autofocus: { type: Boolean, required: false },
  autofocusDelay: { type: Number, required: false, default: 0 },
  deleteIcon: { type: null, required: false },
  highlight: { type: Boolean, required: false },
  fixed: { type: Boolean, required: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false },
  modelValue: { type: [Array, null], required: false },
  defaultValue: { type: Array, required: false },
  addOnPaste: { type: Boolean, required: false },
  addOnTab: { type: Boolean, required: false },
  addOnBlur: { type: Boolean, required: false },
  duplicate: { type: Boolean, required: false },
  disabled: { type: Boolean, required: false },
  delimiter: { type: null, required: false },
  max: { type: Number, required: false },
  id: { type: String, required: false },
  convertValue: { type: Function, required: false },
  displayValue: { type: Function, required: false },
  name: { type: String, required: false },
  required: { type: Boolean, required: false },
  icon: { type: null, required: false },
  avatar: { type: Object, required: false },
  leading: { type: Boolean, required: false },
  leadingIcon: { type: null, required: false },
  trailing: { type: Boolean, required: false },
  trailingIcon: { type: null, required: false },
  loading: { type: Boolean, required: false },
  loadingIcon: { type: null, required: false }
});
const emits = defineEmits(["change", "blur", "focus", "update:modelValue", "invalid", "addTag", "removeTag"]);
const slots = defineSlots();
const props = useComponentProps("inputTags", _props);
const appConfig = useAppConfig();
const rootProps = useForwardProps(reactivePick(props, "as", "addOnPaste", "addOnTab", "addOnBlur", "duplicate", "delimiter", "max", "convertValue", "displayValue", "required"), emits);
const { emitFormBlur, emitFormFocus, emitFormChange, emitFormInput, size: formFieldSize, color: formFieldColor, id, name, highlight: formFieldHighlight, disabled: formFieldDisabled, ariaAttrs } = useFormField(_props);
const { orientation, size: fieldGroupSize } = useFieldGroup(_props);
const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(props);
const color = computed(() => formFieldColor.value ?? props.color);
const highlight = computed(() => formFieldHighlight.value ?? props.highlight);
const size = computed(() => fieldGroupSize.value ?? formFieldSize.value ?? props.size);
const disabled = computed(() => formFieldDisabled.value ?? props.disabled);
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.inputTags || {} })({
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
function autoFocus() {
  if (props.autofocus) {
    inputRef.value?.$el?.focus();
  }
}
let autofocusTimeoutId;
onMounted(() => {
  autofocusTimeoutId = setTimeout(() => {
    autoFocus();
  }, props.autofocusDelay);
});
onScopeDispose(() => clearTimeout(autofocusTimeoutId));
function onUpdate(value) {
  if (toRaw(props.modelValue) === value) {
    return;
  }
  const event = new Event("change", { target: { value } });
  emits("change", event);
  emitFormChange();
  emitFormInput();
}
function onBlur(event) {
  emits("blur", event);
  emitFormBlur();
}
function onFocus(event) {
  emits("focus", event);
  emitFormFocus();
}
defineExpose({
  inputRef: toRef(() => inputRef.value?.$el)
});
</script>

<template>
  <TagsInputRoot
    :id="id"
    v-slot="{ modelValue: tags }"
    :model-value="props.modelValue"
    :default-value="props.defaultValue"
    :data-slot="$attrs['data-slot'] ?? 'root'"
    :class="ui.root({ class: [ui.base({ class: props.ui?.base }), props.ui?.root, props.class] })"
    v-bind="rootProps"
    :name="name"
    :disabled="disabled"
    @update:model-value="onUpdate"
  >
    <TagsInputItem
      v-for="(item, index) in tags"
      :key="index"
      :value="item"
      data-slot="item"
      :class="ui.item({ class: [props.ui?.item] })"
    >
      <TagsInputItemText data-slot="itemText" :class="ui.itemText({ class: [props.ui?.itemText] })">
        <slot v-if="!!slots['item-text']" name="item-text" :item="item" :index="index" :ui="ui" />
      </TagsInputItemText>

      <TagsInputItemDelete
        data-slot="itemDelete"
        :class="ui.itemDelete({ class: [props.ui?.itemDelete] })"
        :disabled="disabled"
      >
        <slot name="item-delete" :item="item" :index="index" :ui="ui">
          <UIcon :name="props.deleteIcon || appConfig.ui.icons.close" data-slot="itemDeleteIcon" :class="ui.itemDeleteIcon({ class: [props.ui?.itemDeleteIcon] })" />
        </slot>
      </TagsInputItemDelete>
    </TagsInputItem>

    <TagsInputInput
      ref="inputRef"
      v-bind="{ ...$attrs, ...ariaAttrs }"
      :placeholder="props.placeholder"
      :max-length="props.maxLength"
      data-slot="input"
      :class="ui.input({ class: props.ui?.input })"
      @blur="onBlur"
      @focus="onFocus"
    />

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
  </TagsInputRoot>
</template>
```


## InputTime.vue

```vue
<script>
import theme from "#build/ui/input-time";
</script>

<script setup>
import { computed, onMounted, onScopeDispose, ref } from "vue";
import { TimeRangeFieldRoot, TimeRangeFieldInput } from "reka-ui";
import { useForwardProps } from "../composables/useForwardProps";
import { TimeField as SingleTimeField } from "reka-ui/namespaced";
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
  id: { type: String, required: false },
  name: { type: String, required: false },
  required: { type: Boolean, required: false },
  isTimeUnavailable: { type: Function, required: false }
});
const emits = defineEmits(["update:modelValue", "change", "blur", "focus", "update:placeholder"]);
const slots = defineSlots();
const props = useComponentProps("inputTime", _props);
const appConfig = useAppConfig();
const rootProps = useForwardProps(reactiveOmit(props, "id", "name", "range", "modelValue", "defaultValue", "color", "variant", "size", "highlight", "fixed", "disabled", "autofocus", "autofocusDelay", "icon", "avatar", "leading", "leadingIcon", "trailing", "trailingIcon", "loading", "loadingIcon", "separatorIcon", "class", "ui"), emits);
const { emitFormBlur, emitFormFocus, emitFormChange, emitFormInput, id, color: formFieldColor, size: formFieldSize, name, highlight: formFieldHighlight, disabled: formFieldDisabled, ariaAttrs } = useFormField(_props);
const { orientation, size: fieldGroupSize } = useFieldGroup(_props);
const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(props);
const color = computed(() => formFieldColor.value ?? props.color);
const highlight = computed(() => formFieldHighlight.value ?? props.highlight);
const size = computed(() => fieldGroupSize.value ?? formFieldSize.value ?? props.size);
const disabled = computed(() => formFieldDisabled.value ?? props.disabled);
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.inputTime || {} })({
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
const [DefineSegmentsTemplate, ReuseSegmentsTemplate] = createReusableTemplate();
const inputsRef = ref([]);
const RangeTimeField = { Root: TimeRangeFieldRoot, Input: TimeRangeFieldInput };
const TimeField = computed(() => props.range ? RangeTimeField : SingleTimeField);
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
defineExpose({
  inputsRef
});
</script>

<template>
  <DefineSegmentsTemplate v-slot="{ segments, type }">
    <TimeField.Input
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
    </TimeField.Input>
  </DefineSegmentsTemplate>

  <TimeField.Root
    :id="id"
    v-slot="{ segments }"
    data-slot="base"
    v-bind="{ ...rootProps, ...$attrs, ...ariaAttrs }"
    :name="name"
    :disabled="disabled"
    :model-value="props.modelValue"
    :default-value="props.defaultValue"
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
  </TimeField.Root>
</template>
```


## Kbd.vue

```vue
<script>
import theme from "#build/ui/kbd";
</script>

<script setup>
import { computed } from "vue";
import { Primitive } from "reka-ui";
import { useAppConfig } from "#imports";
import { useKbd } from "../composables/useKbd";
import { useComponentProps } from "../composables/useComponentProps";
import { tv } from "../utils/tv";
const _props = defineProps({
  as: { type: null, required: false, default: "kbd" },
  value: { type: null, required: false },
  color: { type: null, required: false },
  variant: { type: null, required: false },
  size: { type: null, required: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false }
});
defineSlots();
const props = useComponentProps("kbd", _props);
const { getKbdKey } = useKbd();
const appConfig = useAppConfig();
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.kbd || {} }));
</script>

<template>
  <Primitive :as="props.as" :class="ui({ class: [props.ui?.base, props.class], color: props.color, variant: props.variant, size: props.size })">
    <slot>
      {{ getKbdKey(props.value) }}
    </slot>
  </Primitive>
</template>
```


## Link.vue

```vue
<script>
import theme from "#build/ui/link";
</script>

<script setup>
import { computed, getCurrentInstance, mergeProps, onMounted, onBeforeUnmount } from "vue";
import { isEqual } from "ohash/utils";
import { useForwardProps, Slot } from "reka-ui";
import { defu } from "defu";
import { hasProtocol } from "ufo";
import { reactiveOmit } from "@vueuse/core";
import { useRoute, useAppConfig, useNuxtApp, onNuxtReady } from "#imports";
import { mergeClasses } from "../utils";
import { tv } from "../utils/tv";
import { isPartiallyEqual } from "../utils/link";
import { requestIdleCallback, cancelIdleCallback, observeIntersection } from "../utils/prefetch";
import ULinkBase from "./LinkBase.vue";
defineOptions({ inheritAttrs: false });
const props = defineProps({
  as: { type: null, required: false, default: "button" },
  type: { type: null, required: false, default: "button" },
  disabled: { type: Boolean, required: false },
  active: { type: Boolean, required: false, default: void 0 },
  exact: { type: Boolean, required: false },
  exactQuery: { type: [Boolean, String], required: false },
  exactHash: { type: Boolean, required: false },
  inactiveClass: { type: String, required: false },
  custom: { type: Boolean, required: false },
  raw: { type: Boolean, required: false },
  locale: { type: [Boolean, String], required: false, default: void 0 },
  class: { type: null, required: false },
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
  ariaCurrentValue: { type: String, required: false, default: "page" },
  viewTransition: { type: Boolean, required: false },
  replace: { type: Boolean, required: false }
});
defineSlots();
const route = useRoute();
const appConfig = useAppConfig();
const nuxtApp = useNuxtApp();
const nuxtLinkProps = useForwardProps(reactiveOmit(props, "as", "type", "disabled", "active", "exact", "exactQuery", "exactHash", "activeClass", "inactiveClass", "to", "href", "raw", "custom", "locale", "class"));
const ui = computed(() => tv({
  extend: theme,
  ...defu({
    variants: {
      active: {
        true: mergeClasses(appConfig.ui?.link?.variants?.active?.true, props.activeClass),
        false: mergeClasses(appConfig.ui?.link?.variants?.active?.false, props.inactiveClass)
      }
    }
  }, appConfig.ui?.link || {})
}));
const to = computed(() => {
  const path = props.to ?? props.href;
  if (!path) return path;
  if (typeof path !== "string") return path;
  if (props.external || hasProtocol(path, { acceptRelative: true })) {
    return path;
  }
  if (props.locale === false) {
    return path;
  }
  const localePath = nuxtApp.$localePath;
  if (!localePath) {
    return path;
  }
  const i18n = nuxtApp.$i18n;
  const codes = i18n?.localeCodes?.value;
  if (codes?.length && new RegExp(`^/(${codes.join("|")})($|[/?#])`).test(path)) {
    return path;
  }
  const localizedPath = localePath(path, typeof props.locale === "string" ? props.locale : void 0);
  return localizedPath || path;
});
const isInternalLink = computed(() => {
  if (!to.value) return false;
  if (props.external) return false;
  if (typeof to.value !== "string") return true;
  if (hasProtocol(to.value, { acceptRelative: true })) return false;
  if (props.target && props.target !== "_self") return false;
  return true;
});
const rel = computed(() => {
  if (props.noRel) {
    return null;
  }
  if (props.rel !== void 0) {
    return props.rel || null;
  }
  if (!isInternalLink.value || props.target && props.target !== "_self") {
    return "noopener noreferrer";
  }
  return null;
});
function isLinkActive({ route: linkRoute, isActive, isExactActive } = {}) {
  if (props.active !== void 0) {
    return props.active;
  }
  if (!to.value) {
    return false;
  }
  if (props.exactQuery === "partial") {
    if (!isPartiallyEqual(linkRoute.query, route.query)) return false;
  } else if (props.exactQuery === true) {
    if (!isEqual(linkRoute.query, route.query)) return false;
  }
  if (props.exactHash && linkRoute.hash !== route.hash) {
    return false;
  }
  if (props.exact && isExactActive) {
    return true;
  }
  if (!props.exact && isActive) {
    return true;
  }
  return false;
}
function resolveLinkClass({ route: route2, isActive, isExactActive, prefetched } = {}) {
  const active = isLinkActive({ route: route2, isActive, isExactActive });
  const prefetchedClass = prefetched ? props.prefetchedClass : void 0;
  if (props.raw) {
    return [props.class, active ? props.activeClass : props.inactiveClass, prefetchedClass];
  }
  return ui.value({ class: prefetchedClass ? [props.class, prefetchedClass] : props.class, active, disabled: props.disabled });
}
const instance = getCurrentInstance();
let prefetchApi;
function onPrefetch() {
  prefetchApi?.prefetch?.(nuxtApp);
}
function getPrefetchListeners({ prefetch, shouldPrefetch }, attrs) {
  if (!prefetch || !shouldPrefetch) {
    return void 0;
  }
  prefetchApi = { prefetch, shouldPrefetch };
  if (!shouldPrefetch("interaction")) {
    return void 0;
  }
  return mergeProps(
    { onPointerenter: attrs.onPointerenter, onFocus: attrs.onFocus },
    { onPointerenter: onPrefetch, onFocus: onPrefetch }
  );
}
let idleId;
let unobserve = null;
let unmounted = false;
onMounted(() => {
  if (!prefetchApi?.shouldPrefetch?.("visibility")) {
    return;
  }
  const root = instance?.proxy?.$el;
  const el = root instanceof Element ? root : root?.nextElementSibling;
  if (!el) {
    return;
  }
  onNuxtReady(() => {
    if (unmounted) {
      return;
    }
    idleId = requestIdleCallback(() => {
      unobserve = observeIntersection(el, () => {
        unobserve?.();
        unobserve = null;
        onPrefetch();
      });
    });
  });
});
onBeforeUnmount(() => {
  unmounted = true;
  cancelIdleCallback(idleId);
  unobserve?.();
  unobserve = null;
});
</script>

<template>
  <NuxtLink v-if="isInternalLink" v-slot="{ href, navigate, route: linkRoute, isActive, isExactActive, ...rest }" v-bind="nuxtLinkProps" :to="to" custom>
    <Slot v-if="custom">
      <slot
        v-bind="{
  ...$attrs,
  ...exact && isExactActive ? { 'aria-current': props.ariaCurrentValue } : {},
  ...rest.prefetched && prefetchedClass ? { class: prefetchedClass } : {},
  ...getPrefetchListeners(rest, $attrs),
  as,
  type,
  disabled,
  href,
  navigate,
  rel,
  target: rest.target,
  isExternal: rest.isExternal,
  active: isLinkActive({ route: linkRoute, isActive, isExactActive })
}"
      />
    </Slot>
    <ULinkBase
      v-else
      v-bind="{
  ...$attrs,
  ...exact && isExactActive ? { 'aria-current': props.ariaCurrentValue } : {},
  as,
  type,
  disabled,
  href,
  navigate,
  rel,
  target: rest.target,
  isExternal: rest.isExternal,
  ...getPrefetchListeners(rest, $attrs)
}"
      :class="resolveLinkClass({ route: linkRoute, isActive, isExactActive, prefetched: rest.prefetched })"
    >
      <slot :active="isLinkActive({ route: linkRoute, isActive, isExactActive })" />
    </ULinkBase>
  </NuxtLink>

  <Slot v-else-if="custom">
    <slot
      v-bind="{
  ...$attrs,
  as,
  type,
  disabled,
  ...to ? { href: String(to), target: props.target, rel, isExternal: true } : {},
  active: active ?? false
}"
    />
  </Slot>
  <ULinkBase
    v-else
    v-bind="{
  ...$attrs,
  as,
  type,
  disabled,
  ...to ? { href: String(to), target: props.target, rel, isExternal: true } : {}
}"
    :class="resolveLinkClass()"
  >
    <slot :active="active ?? false" />
  </ULinkBase>
</template>
```


## LinkBase.vue

```vue
<script>

</script>

<script setup>
import { Primitive } from "reka-ui";
const props = defineProps({
  as: { type: String, required: false, default: "button" },
  type: { type: String, required: false, default: "button" },
  disabled: { type: Boolean, required: false },
  onClick: { type: [Function, Array], required: false },
  href: { type: [String, null], required: false },
  navigate: { type: Function, required: false },
  target: { type: [String, Object, null], required: false },
  rel: { type: [String, Object, null], required: false },
  active: { type: Boolean, required: false },
  isExternal: { type: Boolean, required: false }
});
function onClickWrapper(e) {
  if (props.disabled) {
    e.stopPropagation();
    e.preventDefault();
    return;
  }
  if (props.onClick) {
    for (const onClick of Array.isArray(props.onClick) ? props.onClick : [props.onClick]) {
      onClick(e);
    }
  }
  if (props.href && props.navigate && !props.isExternal) {
    props.navigate(e);
  }
}
</script>

<template>
  <Primitive
    v-bind="href ? {
  'as': 'a',
  'href': disabled ? void 0 : href,
  'aria-disabled': disabled ? 'true' : void 0,
  'role': disabled ? 'link' : void 0,
  'tabindex': disabled ? -1 : void 0
} : as === 'button' ? {
  as,
  type,
  disabled
} : {
  as
}"
    :rel="rel"
    :target="target"
    @click="onClickWrapper"
  >
    <slot />
  </Primitive>
</template>
```


## Listbox.vue

```vue
<script>
import theme from "#build/ui/listbox";
</script>

<script setup>
import { computed, toRaw, toRef } from "vue";
import { ListboxRoot, ListboxContent, ListboxGroup, ListboxGroupLabel, ListboxVirtualizer, ListboxItem as RekaListboxItem, ListboxItemIndicator, ListboxFilter } from "reka-ui";
import { useForwardProps } from "../composables/useForwardProps";
import { createReusableTemplate, reactivePick } from "@vueuse/core";
import { defu } from "defu";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { useFilter } from "../composables/useFilter";
import { useFormField } from "../composables/useFormField";
import { useLocale } from "../composables/useLocale";
import { get, isArrayOfArray, looseToNumber } from "../utils";
import { getEstimateSize } from "../utils/virtualizer";
import { tv } from "../utils/tv";
import UIcon from "./Icon.vue";
import UAvatar from "./Avatar.vue";
import UChip from "./Chip.vue";
import UInput from "./Input.vue";
defineOptions({ inheritAttrs: false });
const _props = defineProps({
  id: { type: String, required: false },
  as: { type: null, required: false },
  color: { type: null, required: false },
  size: { type: null, required: false },
  items: { type: null, required: false },
  modelValue: { type: null, required: false },
  modelModifiers: { type: null, required: false },
  defaultValue: { type: null, required: false },
  multiple: { type: Boolean, required: false },
  valueKey: { type: null, required: false },
  labelKey: { type: null, required: false, default: "label" },
  descriptionKey: { type: null, required: false, default: "description" },
  loading: { type: Boolean, required: false },
  loadingIcon: { type: null, required: false },
  filter: { type: [Boolean, Object], required: false, default: false },
  filterFields: { type: Array, required: false },
  ignoreFilter: { type: Boolean, required: false },
  selectedIcon: { type: null, required: false },
  virtualize: { type: [Boolean, Object], required: false, default: false },
  highlight: { type: Boolean, required: false },
  autofocus: { type: Boolean, required: false },
  autofocusDelay: { type: Number, required: false, default: 0 },
  class: { type: null, required: false },
  ui: { type: Object, required: false },
  by: { type: [String, Function], required: false },
  disabled: { type: Boolean, required: false },
  highlightOnHover: { type: Boolean, required: false, default: true },
  name: { type: String, required: false },
  orientation: { type: String, required: false },
  required: { type: Boolean, required: false },
  selectionBehavior: { type: String, required: false }
});
const emits = defineEmits(["entryFocus", "highlight", "leave", "change", "update:modelValue"]);
const slots = defineSlots();
const props = useComponentProps("listbox", _props);
const searchTerm = defineModel("searchTerm", { type: String, ...{ default: "" } });
const { t } = useLocale();
const appConfig = useAppConfig();
const { filterGroups } = useFilter();
const rootProps = useForwardProps(reactivePick(props, "as", "modelValue", "defaultValue", "multiple", "selectionBehavior", "highlightOnHover", "by", "orientation", "required"), emits);
const virtualizerProps = toRef(() => {
  if (!props.virtualize) return false;
  return defu(typeof props.virtualize === "boolean" ? {} : props.virtualize, {
    estimateSize: getEstimateSize(filteredItems.value, size.value ?? "md", props.descriptionKey, !!slots["item-description"])
  });
});
const inputProps = toRef(() => defu(typeof props.filter === "object" ? props.filter : {}, { placeholder: t("listbox.search"), variant: "none" }));
const { emitFormChange, emitFormInput, name, size: formFieldSize, color: formFieldColor, id, highlight: formFieldHighlight, disabled: formFieldDisabled, ariaAttrs } = useFormField(_props, { bind: false });
const color = computed(() => formFieldColor.value ?? props.color);
const highlight = computed(() => formFieldHighlight.value ?? props.highlight);
const size = computed(() => formFieldSize.value ?? props.size);
const disabled = computed(() => formFieldDisabled.value ?? props.disabled);
const [DefineItemTemplate, ReuseItemTemplate] = createReusableTemplate({
  props: {
    item: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: false
    }
  }
});
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.listbox || {} })({
  color: color.value,
  size: size.value,
  highlight: highlight.value,
  disabled: disabled.value,
  virtualize: !!props.virtualize
}));
function onUpdate(value) {
  if (toRaw(props.modelValue) === value) {
    return;
  }
  if (props.modelModifiers?.trim && (typeof value === "string" || value === null || value === void 0)) {
    value = value?.trim() ?? null;
  }
  if (props.modelModifiers?.number) {
    value = looseToNumber(value);
  }
  if (props.modelModifiers?.nullable) {
    value ??= null;
  }
  if (props.modelModifiers?.optional && !props.modelModifiers?.nullable && value !== null) {
    value ??= void 0;
  }
  const event = new Event("change", { target: { value } });
  emits("change", event);
  emitFormChange();
  emitFormInput();
}
function onSelect(e, item) {
  if (item.disabled) {
    e.preventDefault();
    return;
  }
  item.onSelect?.(e);
}
const groups = computed(
  () => props.items?.length ? isArrayOfArray(props.items) ? props.items : [props.items] : []
);
function isStructuralItem(item) {
  return !!item.type && ["label", "separator"].includes(item.type);
}
const filteredGroups = computed(() => {
  if (props.ignoreFilter || !searchTerm.value) {
    return groups.value;
  }
  const fields = Array.isArray(props.filterFields) ? props.filterFields : [props.labelKey];
  return filterGroups(groups.value, searchTerm.value, {
    fields,
    isStructural: isStructuralItem
  });
});
const filteredItems = computed(() => filteredGroups.value.flatMap((group) => group));
</script>

<template>
  <DefineItemTemplate v-slot="{ item, index }">
    <ListboxGroupLabel v-if="item.type === 'label'" data-slot="label" :class="ui.label({ class: [props.ui?.label, item.ui?.label, item.class] })">
      {{ get(item, props.labelKey) }}
    </ListboxGroupLabel>

    <div v-else-if="item.type === 'separator'" role="separator" data-slot="separator" :class="ui.separator({ class: [props.ui?.separator, item.ui?.separator, item.class] })" />

    <RekaListboxItem
      v-else
      :value="props.valueKey ? get(item, props.valueKey) : item"
      :disabled="item.disabled"
      data-slot="item"
      :class="ui.item({ class: [props.ui?.item, item.ui?.item, item.class] })"
      @select="onSelect($event, item)"
    >
      <slot name="item" :item="item" :index="index" :ui="ui">
        <slot name="item-leading" :item="item" :index="index" :ui="ui">
          <UIcon v-if="item.icon" :name="item.icon" data-slot="itemLeadingIcon" :class="ui.itemLeadingIcon({ class: [props.ui?.itemLeadingIcon, item.ui?.itemLeadingIcon] })" />
          <UAvatar v-else-if="item.avatar" :size="item.ui?.itemLeadingAvatarSize || props.ui?.itemLeadingAvatarSize || ui.itemLeadingAvatarSize()" v-bind="item.avatar" data-slot="itemLeadingAvatar" :class="ui.itemLeadingAvatar({ class: [props.ui?.itemLeadingAvatar, item.ui?.itemLeadingAvatar] })" />
          <UChip
            v-else-if="item.chip"
            :size="item.ui?.itemLeadingChipSize || props.ui?.itemLeadingChipSize || ui.itemLeadingChipSize()"
            inset
            standalone
            v-bind="item.chip"
            data-slot="itemLeadingChip"
            :class="ui.itemLeadingChip({ class: [props.ui?.itemLeadingChip, item.ui?.itemLeadingChip] })"
          />
        </slot>

        <span v-if="get(item, props.labelKey) || get(item, props.descriptionKey) || !!slots['item-label'] || !!slots['item-description']" data-slot="itemWrapper" :class="ui.itemWrapper({ class: [props.ui?.itemWrapper, item.ui?.itemWrapper] })">
          <span v-if="get(item, props.labelKey) || !!slots['item-label']" data-slot="itemLabel" :class="ui.itemLabel({ class: [props.ui?.itemLabel, item.ui?.itemLabel] })">
            <slot name="item-label" :item="item" :index="index">
              {{ get(item, props.labelKey) }}
            </slot>
          </span>

          <span v-if="get(item, props.descriptionKey) || !!slots['item-description']" data-slot="itemDescription" :class="ui.itemDescription({ class: [props.ui?.itemDescription, item.ui?.itemDescription] })">
            <slot name="item-description" :item="item" :index="index">
              {{ get(item, props.descriptionKey) }}
            </slot>
          </span>
        </span>

        <span data-slot="itemTrailing" :class="ui.itemTrailing({ class: [props.ui?.itemTrailing, item.ui?.itemTrailing] })">
          <slot name="item-trailing" :item="item" :index="index" :ui="ui" />

          <ListboxItemIndicator as-child>
            <UIcon :name="props.selectedIcon || appConfig.ui.icons.check" data-slot="itemTrailingIcon" :class="ui.itemTrailingIcon({ class: [props.ui?.itemTrailingIcon, item.ui?.itemTrailingIcon] })" />
          </ListboxItemIndicator>
        </span>
      </slot>
    </RekaListboxItem>
  </DefineItemTemplate>

  <ListboxRoot
    :id="id"
    data-slot="root"
    v-bind="{ ...rootProps, ...$attrs, ...ariaAttrs }"
    :disabled="disabled"
    :name="name"
    :class="ui.root({ class: [props.ui?.root, props.class] })"
    @update:model-value="onUpdate"
  >
    <ListboxFilter v-if="props.filter" v-model="searchTerm" as-child>
      <UInput
        :autofocus="props.autofocus"
        :autofocus-delay="props.autofocusDelay"
        :size="size"
        v-bind="inputProps"
        data-slot="input"
        :class="ui.input({ class: props.ui?.input })"
      />
    </ListboxFilter>

    <ListboxContent data-slot="content" :class="ui.content({ class: props.ui?.content })">
      <div v-if="props.loading" data-slot="loading" :class="ui.loading({ class: props.ui?.loading })">
        <slot name="loading">
          <UIcon :name="props.loadingIcon || appConfig.ui.icons.loading" data-slot="loadingIcon" :class="ui.loadingIcon({ class: props.ui?.loadingIcon })" />
        </slot>
      </div>
      <div v-else-if="!filteredItems.length" data-slot="empty" :class="ui.empty({ class: props.ui?.empty })">
        <slot name="empty" :search-term="searchTerm">
          {{ searchTerm ? t("listbox.noMatch", { searchTerm }) : t("listbox.noData") }}
        </slot>
      </div>

      <ListboxVirtualizer
        v-else-if="!!props.virtualize"
        v-slot="{ option: item, virtualItem }"
        :options="filteredItems"
        :text-content="(item2) => get(item2, props.labelKey)"
        v-bind="virtualizerProps"
      >
        <ReuseItemTemplate :item="item" :index="virtualItem.index" />
      </ListboxVirtualizer>

      <template v-else>
        <ListboxGroup v-for="(group, groupIndex) in filteredGroups" :key="`group-${groupIndex}`" data-slot="group" :class="ui.group({ class: props.ui?.group })">
          <ReuseItemTemplate v-for="(item, index) in group" :key="`group-${groupIndex}-${index}`" :item="item" :index="index" />
        </ListboxGroup>
      </template>
    </ListboxContent>
  </ListboxRoot>
</template>
```


## locale/LocaleSelect.vue

```vue
<script>

</script>

<script setup>
import { useForwardProps } from "reka-ui";
import { reactiveOmit } from "@vueuse/core";
import USelectMenu from "../SelectMenu.vue";
defineOptions({ inheritAttrs: false });
const props = defineProps({
  locales: { type: Array, required: false },
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
  valueKey: { type: String, required: false, default: "code" },
  labelKey: { type: null, required: false, default: "name" },
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
  icon: { type: null, required: false },
  avatar: { type: Object, required: false },
  leading: { type: Boolean, required: false },
  leadingIcon: { type: null, required: false },
  trailing: { type: Boolean, required: false },
  loading: { type: Boolean, required: false },
  loadingIcon: { type: null, required: false }
});
const selectMenuProps = useForwardProps(reactiveOmit(props, "locales"));
const modelValue = defineModel({ type: String, ...{ required: true } });
function getEmojiFlag(locale) {
  const languageToCountry = {
    ar: "sa",
    // Arabic -> Saudi Arabia
    be: "by",
    // Belarusian -> Belarus
    bn: "bd",
    // Bengali -> Bangladesh
    ca: "es",
    // Catalan -> Spain
    ckb: "iq",
    // Central Kurdish -> Iraq
    cs: "cz",
    // Czech -> Czech Republic (note: modern country code is actually 'cz')
    da: "dk",
    // Danish -> Denmark
    el: "gr",
    // Greek -> Greece
    en: "us",
    // English -> United States (default)
    et: "ee",
    // Estonian -> Estonia
    eu: "es",
    // Basque -> Spain
    gl: "es",
    // Galician -> Spain
    he: "il",
    // Hebrew -> Israel
    hi: "in",
    // Hindi -> India
    hy: "am",
    // Armenian -> Armenia
    is: "is",
    // Icelandic -> Iceland
    ja: "jp",
    // Japanese -> Japan
    ka: "ge",
    // Georgian -> Georgia
    kk: "kz",
    // Kazakh -> Kazakhstan
    km: "kh",
    // Khmer -> Cambodia
    ko: "kr",
    // Korean -> South Korea
    ky: "kg",
    // Kyrgyz -> Kyrgyzstan
    lb: "lu",
    // Luxembourgish -> Luxembourg
    lo: "la",
    // Lao -> Laos
    ms: "my",
    // Malay -> Malaysia
    nb: "no",
    // Norwegian Bokmål -> Norway
    sl: "si",
    // Slovenian -> Slovenia
    sq: "al",
    // Albanian -> Albania
    sv: "se",
    // Swedish -> Sweden
    uk: "ua",
    // Ukrainian -> Ukraine
    ur: "pk",
    // Urdu -> Pakistan
    vi: "vn"
    // Vietnamese -> Vietnam
  };
  if (locale.includes("-")) {
    const countryCode2 = locale.split("-")[1]?.toLowerCase();
    if (countryCode2) {
      return countryCode2.toUpperCase().split("").map((char) => String.fromCodePoint(127397 + char.charCodeAt(0))).join("");
    }
  }
  const baseLanguage = locale.split("-")[0]?.toLowerCase() || locale;
  const countryCode = languageToCountry[baseLanguage] || locale.slice(0, 2);
  return countryCode.toUpperCase().split("").map((char) => String.fromCodePoint(127397 + char.charCodeAt(0))).join("");
}
</script>

<template>
  <USelectMenu
    v-model="modelValue"
    v-bind="{ ...selectMenuProps, ...$attrs }"
    :items="locales"
  >
    <template #leading>
      <span v-if="modelValue" class="size-5 text-center">
        {{ getEmojiFlag(modelValue) }}
      </span>
    </template>

    <template #item-leading="{ item }">
      <span class="size-5 text-center">
        {{ getEmojiFlag(item.code) }}
      </span>
    </template>
  </USelectMenu>
</template>
```


## Main.vue

```vue
<script>
import theme from "#build/ui/main";
</script>

<script setup>
import { computed } from "vue";
import { Primitive } from "reka-ui";
import { useAppConfig } from "#imports";
import { tv } from "../utils/tv";
import { useComponentProps } from "../composables/useComponentProps";
const _props = defineProps({
  as: { type: null, required: false, default: "main" },
  class: { type: null, required: false },
  ui: { type: Object, required: false }
});
defineSlots();
const props = useComponentProps("main", _props);
const appConfig = useAppConfig();
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.main || {} }));
</script>

<template>
  <Primitive :as="props.as" :class="ui({ class: [props.ui?.base, props.class] })">
    <slot />
  </Primitive>
</template>
```


## Marquee.vue

```vue
<script>
import theme from "#build/ui/marquee";
</script>

<script setup>
import { computed } from "vue";
import { Primitive } from "reka-ui";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { tv } from "../utils/tv";
const _props = defineProps({
  as: { type: null, required: false },
  pauseOnHover: { type: Boolean, required: false },
  reverse: { type: Boolean, required: false },
  orientation: { type: null, required: false, default: "horizontal" },
  repeat: { type: Number, required: false, default: 4 },
  overlay: { type: Boolean, required: false, default: true },
  class: { type: null, required: false },
  ui: { type: Object, required: false }
});
defineSlots();
const props = useComponentProps("marquee", _props);
const appConfig = useAppConfig();
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.marquee || {} })({
  pauseOnHover: props.pauseOnHover,
  orientation: props.orientation,
  reverse: props.reverse,
  overlay: props.overlay
}));
</script>

<template>
  <Primitive :as="props.as" :data-orientation="props.orientation" data-slot="root" :class="ui.root({ class: [props.ui?.root, props.class] })">
    <div v-for="i in props.repeat" :key="i" data-slot="content" :class="ui.content({ class: [props.ui?.content] })">
      <slot />
    </div>
  </Primitive>
</template>
```


## Modal.vue

```vue
<script>
import theme from "#build/ui/modal";
</script>

<script setup>
import { computed, toRef } from "vue";
import { DialogRoot, DialogTrigger, DialogPortal, DialogOverlay, DialogContent, DialogTitle, DialogDescription, DialogClose, VisuallyHidden } from "reka-ui";
import { useForwardProps } from "../composables/useForwardProps";
import { reactivePick, createReusableTemplate } from "@vueuse/core";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { FieldGroupReset } from "../composables/useFieldGroup";
import { useLocale } from "../composables/useLocale";
import { usePortal } from "../composables/usePortal";
import { pointerDownOutside } from "../utils/overlay";
import { tv } from "../utils/tv";
import UButton from "./Button.vue";
const _props = defineProps({
  title: { type: String, required: false },
  description: { type: String, required: false },
  content: { type: Object, required: false },
  overlay: { type: Boolean, required: false, default: true },
  scrollable: { type: Boolean, required: false },
  transition: { type: Boolean, required: false, default: true },
  fullscreen: { type: Boolean, required: false },
  portal: { type: [Boolean, String], required: false, skipCheck: true, default: true },
  close: { type: [Boolean, Object], required: false, default: true },
  closeIcon: { type: null, required: false },
  dismissible: { type: Boolean, required: false, default: true },
  class: { type: null, required: false },
  ui: { type: Object, required: false },
  open: { type: Boolean, required: false },
  defaultOpen: { type: Boolean, required: false },
  modal: { type: Boolean, required: false, default: true },
  unmountOnHide: { type: Boolean, required: false }
});
const emits = defineEmits(["leave", "after:leave", "enter", "after:enter", "close:prevent", "update:open"]);
const slots = defineSlots();
const props = useComponentProps("modal", _props);
const { t } = useLocale();
const appConfig = useAppConfig();
const rootProps = useForwardProps(reactivePick(props, "open", "defaultOpen", "modal", "unmountOnHide"), emits);
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
    pointerDownOutside: (e) => pointerDownOutside(e, { scrollable: props.scrollable })
  };
});
const [DefineContentTemplate, ReuseContentTemplate] = createReusableTemplate();
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.modal || {} })({
  transition: props.transition,
  fullscreen: props.fullscreen,
  overlay: props.overlay,
  scrollable: props.scrollable
}));
</script>

<template>
  <DialogRoot v-slot="{ open, close }" v-bind="rootProps">
    <DefineContentTemplate>
      <DialogContent
        data-slot="content"
        :class="ui.content({ class: [!slots.default && props.class, props.ui?.content] })"
        v-bind="contentProps"
        @enter="!props.scrollable && emits('enter')"
        @after-enter="!props.scrollable && emits('after:enter')"
        @leave="!props.scrollable && emits('leave')"
        @after-leave="!props.scrollable && emits('after:leave')"
        v-on="contentEvents"
      >
        <VisuallyHidden v-if="!props.title && !slots.title || !props.description && !slots.description || !!slots.content">
          <DialogTitle v-if="!props.title && !slots.title" />
          <DialogTitle v-else-if="!!slots.content">
            <slot name="title">
              {{ props.title }}
            </slot>
          </DialogTitle>

          <DialogDescription v-if="!props.description && !slots.description" />
          <DialogDescription v-else-if="!!slots.content">
            <slot name="description">
              {{ props.description }}
            </slot>
          </DialogDescription>
        </VisuallyHidden>

        <slot name="content" :close="close">
          <div v-if="!!slots.header || (props.title || !!slots.title) || (props.description || !!slots.description) || (props.close || !!slots.close)" data-slot="header" :class="ui.header({ class: props.ui?.header })">
            <slot name="header" :close="close">
              <div v-if="props.title || !!slots.title || props.description || !!slots.description" data-slot="wrapper" :class="ui.wrapper({ class: props.ui?.wrapper })">
                <DialogTitle v-if="props.title || !!slots.title" data-slot="title" :class="ui.title({ class: props.ui?.title })">
                  <slot name="title">
                    {{ props.title }}
                  </slot>
                </DialogTitle>

                <DialogDescription v-if="props.description || !!slots.description" data-slot="description" :class="ui.description({ class: props.ui?.description })">
                  <slot name="description">
                    {{ props.description }}
                  </slot>
                </DialogDescription>
              </div>

              <slot name="actions" />

              <DialogClose v-if="props.close || !!slots.close" as-child>
                <slot name="close" :ui="ui">
                  <UButton
                    v-if="props.close"
                    :icon="props.closeIcon || appConfig.ui.icons.close"
                    color="neutral"
                    variant="ghost"
                    :aria-label="t('modal.close')"
                    v-bind="typeof props.close === 'object' ? props.close : {}"
                    data-slot="close"
                    :class="ui.close({ class: props.ui?.close })"
                  />
                </slot>
              </DialogClose>
            </slot>
          </div>

          <div v-if="!!slots.body" data-slot="body" :class="ui.body({ class: props.ui?.body })">
            <slot name="body" :close="close" />
          </div>

          <div v-if="!!slots.footer" data-slot="footer" :class="ui.footer({ class: props.ui?.footer })">
            <slot name="footer" :close="close" />
          </div>
        </slot>
      </DialogContent>
    </DefineContentTemplate>

    <DialogTrigger v-if="!!slots.default" as-child :class="props.class">
      <slot :open="open" />
    </DialogTrigger>

    <DialogPortal v-bind="portalProps" :force-mount="portalProps.disabled && props.unmountOnHide === false || void 0">
      <FieldGroupReset>
        <template v-if="props.scrollable">
          <DialogOverlay
            data-slot="overlay"
            :class="ui.overlay({ class: props.ui?.overlay })"
            @enter="emits('enter')"
            @after-enter="emits('after:enter')"
            @leave="emits('leave')"
            @after-leave="emits('after:leave')"
          >
            <ReuseContentTemplate />
          </DialogOverlay>
        </template>

        <template v-else>
          <DialogOverlay v-if="props.overlay" data-slot="overlay" :class="ui.overlay({ class: props.ui?.overlay })" />

          <ReuseContentTemplate />
        </template>
      </FieldGroupReset>
    </DialogPortal>
  </DialogRoot>
</template>
```


## NavigationMenu.vue

```vue
<script>
import theme from "#build/ui/navigation-menu";
</script>

<script setup>
import { computed, toRef } from "vue";
import { NavigationMenuRoot, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink, NavigationMenuIndicator, NavigationMenuViewport, AccordionRoot, AccordionItem, AccordionTrigger, AccordionContent } from "reka-ui";
import { useForwardProps } from "../composables/useForwardProps";
import { defu } from "defu";
import { reactivePick, createReusableTemplate } from "@vueuse/core";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { get, isArrayOfArray } from "../utils";
import { tv } from "../utils/tv";
import { pickLinkProps } from "../utils/link";
import ULinkBase from "./LinkBase.vue";
import ULink from "./Link.vue";
import UAvatar from "./Avatar.vue";
import UIcon from "./Icon.vue";
import UBadge from "./Badge.vue";
import UChip from "./Chip.vue";
import UPopover from "./Popover.vue";
import UTooltip from "./Tooltip.vue";
defineOptions({ inheritAttrs: false });
const _props = defineProps({
  as: { type: null, required: false },
  type: { type: null, required: false, default: "multiple" },
  modelValue: { type: null, required: false },
  defaultValue: { type: null, required: false },
  trailingIcon: { type: null, required: false },
  externalIcon: { type: [Boolean, String], required: false, skipCheck: true, default: true },
  items: { type: null, required: false },
  color: { type: null, required: false },
  variant: { type: null, required: false },
  orientation: { type: null, required: false, default: "horizontal" },
  collapsed: { type: Boolean, required: false },
  tooltip: { type: [Boolean, Object], required: false },
  popover: { type: [Boolean, Object], required: false },
  highlight: { type: Boolean, required: false },
  highlightColor: { type: null, required: false },
  content: { type: Object, required: false },
  contentOrientation: { type: null, required: false, default: "horizontal" },
  arrow: { type: Boolean, required: false },
  valueKey: { type: null, required: false, default: "value" },
  labelKey: { type: null, required: false, default: "label" },
  class: { type: null, required: false },
  ui: { type: Object, required: false },
  delayDuration: { type: Number, required: false, default: 0 },
  disableClickTrigger: { type: Boolean, required: false },
  disableHoverTrigger: { type: Boolean, required: false },
  skipDelayDuration: { type: Number, required: false },
  disablePointerLeaveClose: { type: Boolean, required: false },
  unmountOnHide: { type: Boolean, required: false, default: true },
  disabled: { type: Boolean, required: false },
  collapsible: { type: Boolean, required: false, default: true }
});
const emits = defineEmits(["update:modelValue"]);
const slots = defineSlots();
const props = useComponentProps("navigationMenu", _props);
const appConfig = useAppConfig();
const rootProps = useForwardProps(computed(() => ({
  as: props.as,
  delayDuration: props.delayDuration,
  skipDelayDuration: props.skipDelayDuration,
  orientation: props.orientation,
  disableClickTrigger: props.disableClickTrigger,
  disableHoverTrigger: props.disableHoverTrigger,
  disablePointerLeaveClose: props.disablePointerLeaveClose,
  unmountOnHide: props.unmountOnHide
})), emits);
const accordionProps = useForwardProps(reactivePick(props, "collapsible", "disabled", "type", "unmountOnHide"), emits);
const contentProps = toRef(() => props.content);
const tooltipProps = toRef(() => defu(typeof props.tooltip === "boolean" ? {} : props.tooltip, { ...props.orientation === "vertical" && { delayDuration: 0, content: { side: "right" } } }));
const popoverProps = toRef(() => defu(typeof props.popover === "boolean" ? {} : props.popover, { mode: "hover", content: { side: "right", align: "start", alignOffset: 2 } }));
const [DefineLinkTemplate, ReuseLinkTemplate] = createReusableTemplate();
const [DefineItemTemplate, ReuseItemTemplate] = createReusableTemplate({
  props: {
    item: Object,
    index: Number,
    level: Number,
    listIndex: Number
  }
});
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.navigationMenu || {} })({
  orientation: props.orientation,
  contentOrientation: props.orientation === "vertical" ? void 0 : props.contentOrientation,
  collapsed: props.collapsed,
  color: props.color,
  variant: props.variant,
  highlight: props.highlight,
  highlightColor: props.highlightColor || props.color
}));
const lists = computed(
  () => props.items?.length ? isArrayOfArray(props.items) ? props.items : [props.items] : []
);
function getItemValue(item, index, level, listIndex) {
  const prefix = lists.value.length > 1 ? `group-${listIndex}-` : "";
  return get(item, props.valueKey) ?? (level > 0 ? `${prefix}item-${level}-${index}` : `${prefix}item-${index}`);
}
function getAccordionDefaultValue(list, level = 0, listIndex = 0) {
  const indexes = list.reduce((acc, item, index) => {
    if (item.defaultOpen || item.open) {
      acc.push(getItemValue(item, index, level, listIndex));
    }
    return acc;
  }, []);
  return props.type === "single" ? indexes[0] : indexes;
}
function onLinkTrailingClick(e, item, trailingTrigger) {
  if (!item.children?.length) {
    return;
  }
  if (props.orientation === "horizontal") {
    e.preventDefault();
  } else if (props.orientation === "vertical" && !props.collapsed && trailingTrigger) {
    e.preventDefault();
    e.stopPropagation();
  }
}
</script>

<template>
  <DefineLinkTemplate v-slot="{ item, active, index, trailingTrigger }">
    <slot :name="item.slot || 'item'" :item="item" :index="index" :active="active" :ui="ui">
      <slot :name="item.slot ? `${item.slot}-leading` : 'item-leading'" :item="item" :active="active" :index="index" :ui="ui">
        <UAvatar v-if="item.avatar" :size="item.ui?.linkLeadingAvatarSize || props.ui?.linkLeadingAvatarSize || ui.linkLeadingAvatarSize()" v-bind="item.avatar" data-slot="linkLeadingAvatar" :class="ui.linkLeadingAvatar({ class: [props.ui?.linkLeadingAvatar, item.ui?.linkLeadingAvatar], active, disabled: !!item.disabled })" />
        <UChip
          v-else-if="item.icon && item.chip"
          :size="item.ui?.linkLeadingChipSize || props.ui?.linkLeadingChipSize || ui.linkLeadingChipSize()"
          inset
          v-bind="typeof item.chip === 'object' ? item.chip : {}"
          data-slot="linkLeadingChip"
        >
          <UIcon :name="item.icon" data-slot="linkLeadingIcon" :class="ui.linkLeadingIcon({ class: [props.ui?.linkLeadingIcon, item.ui?.linkLeadingIcon], active, disabled: !!item.disabled })" />
        </UChip>
        <UIcon v-else-if="item.icon" :name="item.icon" data-slot="linkLeadingIcon" :class="ui.linkLeadingIcon({ class: [props.ui?.linkLeadingIcon, item.ui?.linkLeadingIcon], active, disabled: !!item.disabled })" />
      </slot>

      <span
        v-if="get(item, props.labelKey) || !!slots[item.slot ? `${item.slot}-label` : 'item-label']"
        data-slot="linkLabel"
        :class="ui.linkLabel({ class: [props.ui?.linkLabel, item.ui?.linkLabel] })"
      >
        <slot :name="item.slot ? `${item.slot}-label` : 'item-label'" :item="item" :active="active" :index="index">
          {{ get(item, props.labelKey) }}
        </slot>

        <UIcon v-if="item.target === '_blank' && props.externalIcon !== false" :name="typeof props.externalIcon === 'string' ? props.externalIcon : appConfig.ui.icons.external" data-slot="linkLabelExternalIcon" :class="ui.linkLabelExternalIcon({ class: [props.ui?.linkLabelExternalIcon, item.ui?.linkLabelExternalIcon], active })" />
      </span>

      <component
        :is="props.orientation === 'vertical' && item.children?.length && !props.collapsed && trailingTrigger ? AccordionTrigger : 'span'"
        v-if="item.badge || item.badge === 0 || props.orientation === 'horizontal' && (item.children?.length || !!slots[item.slot ? `${item.slot}-content` : 'item-content']) || props.orientation === 'vertical' && item.children?.length || item.trailingIcon || !!slots[item.slot ? `${item.slot}-trailing` : 'item-trailing']"
        :as="props.orientation === 'vertical' && item.children?.length && !props.collapsed && trailingTrigger ? 'span' : void 0"
        data-slot="linkTrailing"
        :class="ui.linkTrailing({ class: [props.ui?.linkTrailing, item.ui?.linkTrailing] })"
        @click="(e) => onLinkTrailingClick(e, item, trailingTrigger)"
      >
        <slot :name="item.slot ? `${item.slot}-trailing` : 'item-trailing'" :item="item" :active="active" :index="index" :ui="ui">
          <UBadge
            v-if="item.badge || item.badge === 0"
            color="neutral"
            variant="outline"
            :size="item.ui?.linkTrailingBadgeSize || props.ui?.linkTrailingBadgeSize || ui.linkTrailingBadgeSize()"
            v-bind="typeof item.badge === 'string' || typeof item.badge === 'number' ? { label: item.badge } : item.badge"
            data-slot="linkTrailingBadge"
            :class="ui.linkTrailingBadge({ class: [props.ui?.linkTrailingBadge, item.ui?.linkTrailingBadge] })"
          />

          <UIcon v-if="props.orientation === 'horizontal' && (item.children?.length || !!slots[item.slot ? `${item.slot}-content` : 'item-content']) || props.orientation === 'vertical' && item.children?.length" :name="item.trailingIcon || props.trailingIcon || appConfig.ui.icons.chevronDown" data-slot="linkTrailingIcon" :class="ui.linkTrailingIcon({ class: [props.ui?.linkTrailingIcon, item.ui?.linkTrailingIcon], active })" />
          <UIcon v-else-if="item.trailingIcon" :name="item.trailingIcon" data-slot="linkTrailingIcon" :class="ui.linkTrailingIcon({ class: [props.ui?.linkTrailingIcon, item.ui?.linkTrailingIcon], active })" />
        </slot>
      </component>
    </slot>
  </DefineLinkTemplate>

  <DefineItemTemplate v-slot="{ item, index, level = 0, listIndex = 0 }">
    <component
      :is="props.orientation === 'vertical' && !props.collapsed ? AccordionItem : NavigationMenuItem"
      as="li"
      v-bind="props.orientation === 'vertical' && !props.collapsed ? { disabled: !!item.disabled } : {}"
      :value="getItemValue(item, index, level, listIndex)"
    >
      <div v-if="props.orientation === 'vertical' && item.type === 'label' && !props.collapsed" data-slot="label" :class="ui.label({ class: [props.ui?.label, item.ui?.label, item.class] })">
        <ReuseLinkTemplate :item="item" :index="index" :trailing-trigger="true" />
      </div>
      <ULink v-else-if="item.type !== 'label'" v-slot="{ active, ...slotProps }" v-bind="props.orientation === 'vertical' && item.children?.length && !props.collapsed && item.type === 'trigger' ? {} : pickLinkProps(item)" custom>
        <component
          :is="props.orientation === 'horizontal' && (item.children?.length || !!slots[item.slot ? `${item.slot}-content` : 'item-content']) ? NavigationMenuTrigger : props.orientation === 'vertical' && item.children?.length && !props.collapsed && !slotProps.href ? AccordionTrigger : NavigationMenuLink"
          as-child
          :active="active || item.active"
          :disabled="item.disabled"
          @select="item.onSelect"
        >
          <UPopover v-if="props.orientation === 'vertical' && props.collapsed && item.children?.length && (!!props.popover || !!item.popover)" v-bind="{ ...popoverProps, ...typeof item.popover === 'boolean' ? {} : item.popover || {} }" :ui="{ content: ui.content({ class: [props.ui?.content, item.ui?.content] }) }">
            <ULinkBase v-bind="slotProps" data-slot="link" :class="ui.link({ class: [props.ui?.link, item.ui?.link, item.class], active: active || item.active, disabled: !!item.disabled, level: level > 0 })">
              <ReuseLinkTemplate :item="item" :active="active || item.active" :index="index" :trailing-trigger="!!slotProps.href" />
            </ULinkBase>

            <template #content="{ close }">
              <slot
                :name="item.slot ? `${item.slot}-content` : 'item-content'"
                :item="item"
                :active="active || item.active"
                :index="index"
                :ui="ui"
                :close="close"
              >
                <ul data-slot="childList" :class="ui.childList({ class: [props.ui?.childList, item.ui?.childList] })">
                  <li data-slot="childLabel" :class="ui.childLabel({ class: [props.ui?.childLabel, item.ui?.childLabel] })">
                    {{ get(item, props.labelKey) }}
                  </li>
                  <li v-for="(childItem, childIndex) in item.children" :key="childIndex" data-slot="childItem" :class="ui.childItem({ class: [props.ui?.childItem, item.ui?.childItem] })">
                    <ULink v-slot="{ active: childActive, ...childSlotProps }" v-bind="pickLinkProps(childItem)" custom>
                      <NavigationMenuLink as-child :active="childActive" @select="childItem.onSelect">
                        <ULinkBase v-bind="childSlotProps" data-slot="childLink" :class="ui.childLink({ class: [props.ui?.childLink, item.ui?.childLink, childItem.class], active: childActive })">
                          <UIcon v-if="childItem.icon" :name="childItem.icon" data-slot="childLinkIcon" :class="ui.childLinkIcon({ class: [props.ui?.childLinkIcon, item.ui?.childLinkIcon], active: childActive })" />

                          <span data-slot="childLinkLabel" :class="ui.childLinkLabel({ class: [props.ui?.childLinkLabel, item.ui?.childLinkLabel], active: childActive })">
                            {{ get(childItem, props.labelKey) }}

                            <UIcon v-if="childItem.target === '_blank' && props.externalIcon !== false" :name="typeof props.externalIcon === 'string' ? props.externalIcon : appConfig.ui.icons.external" data-slot="childLinkLabelExternalIcon" :class="ui.childLinkLabelExternalIcon({ class: [props.ui?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon], active: childActive })" />
                          </span>
                        </ULinkBase>
                      </NavigationMenuLink>
                    </ULink>
                  </li>
                </ul>
              </slot>
            </template>
          </UPopover>
          <UTooltip v-else-if="props.orientation === 'vertical' && props.collapsed && (!!props.tooltip || !!item.tooltip) || props.orientation === 'horizontal' && !!item.tooltip" :text="get(item, props.labelKey)" v-bind="{ ...tooltipProps, ...typeof item.tooltip === 'boolean' ? {} : item.tooltip || {} }">
            <ULinkBase v-bind="slotProps" data-slot="link" :class="ui.link({ class: [props.ui?.link, item.ui?.link, item.class], active: active || item.active, disabled: !!item.disabled, level: level > 0 })">
              <ReuseLinkTemplate :item="item" :active="active || item.active" :index="index" :trailing-trigger="!!slotProps.href" />
            </ULinkBase>
          </UTooltip>
          <ULinkBase v-else v-bind="slotProps" data-slot="link" :class="ui.link({ class: [props.ui?.link, item.ui?.link, item.class], active: active || item.active, disabled: !!item.disabled, level: props.orientation === 'horizontal' || level > 0 })">
            <ReuseLinkTemplate :item="item" :active="active || item.active" :index="index" :trailing-trigger="!!slotProps.href" />
          </ULinkBase>
        </component>

        <NavigationMenuContent v-if="props.orientation === 'horizontal' && (item.children?.length || !!slots[item.slot ? `${item.slot}-content` : 'item-content'])" v-bind="contentProps" data-slot="content" :class="ui.content({ class: [props.ui?.content, item.ui?.content] })">
          <slot :name="item.slot ? `${item.slot}-content` : 'item-content'" :item="item" :active="active || item.active" :index="index" :ui="ui">
            <ul data-slot="childList" :class="ui.childList({ class: [props.ui?.childList, item.ui?.childList] })">
              <li v-for="(childItem, childIndex) in item.children" :key="childIndex" data-slot="childItem" :class="ui.childItem({ class: [props.ui?.childItem, item.ui?.childItem] })">
                <ULink v-slot="{ active: childActive, ...childSlotProps }" v-bind="pickLinkProps(childItem)" custom>
                  <NavigationMenuLink as-child :active="childActive" @select="childItem.onSelect">
                    <ULinkBase v-bind="childSlotProps" data-slot="childLink" :class="ui.childLink({ class: [props.ui?.childLink, item.ui?.childLink, childItem.class], active: childActive })">
                      <UIcon v-if="childItem.icon" :name="childItem.icon" data-slot="childLinkIcon" :class="ui.childLinkIcon({ class: [props.ui?.childLinkIcon, item.ui?.childLinkIcon], active: childActive })" />

                      <div data-slot="childLinkWrapper" :class="ui.childLinkWrapper({ class: [props.ui?.childLinkWrapper, item.ui?.childLinkWrapper] })">
                        <p data-slot="childLinkLabel" :class="ui.childLinkLabel({ class: [props.ui?.childLinkLabel, item.ui?.childLinkLabel], active: childActive })">
                          {{ get(childItem, props.labelKey) }}

                          <UIcon v-if="childItem.target === '_blank' && props.externalIcon !== false" :name="typeof props.externalIcon === 'string' ? props.externalIcon : appConfig.ui.icons.external" data-slot="childLinkLabelExternalIcon" :class="ui.childLinkLabelExternalIcon({ class: [props.ui?.childLinkLabelExternalIcon, item.ui?.childLinkLabelExternalIcon], active: childActive })" />
                        </p>
                        <p v-if="childItem.description" data-slot="childLinkDescription" :class="ui.childLinkDescription({ class: [props.ui?.childLinkDescription, item.ui?.childLinkDescription], active: childActive })">
                          {{ childItem.description }}
                        </p>
                      </div>
                    </ULinkBase>
                  </NavigationMenuLink>
                </ULink>
              </li>
            </ul>
          </slot>
        </NavigationMenuContent>
      </ULink>

      <AccordionContent v-if="props.orientation === 'vertical' && item.children?.length && !props.collapsed" data-slot="content" :class="ui.content({ class: [props.ui?.content, item.ui?.content] })">
        <AccordionRoot
          v-bind="{
  ...accordionProps,
  defaultValue: getAccordionDefaultValue(item.children, level + 1, listIndex)
}"
          as="ul"
          data-slot="childList"
          :class="ui.childList({ class: [props.ui?.childList, item.ui?.childList] })"
        >
          <ReuseItemTemplate
            v-for="(childItem, childIndex) in item.children"
            :key="childIndex"
            :item="childItem"
            :index="childIndex"
            :level="level + 1"
            :list-index="listIndex"
            data-slot="childItem"
            :class="ui.childItem({ class: [props.ui?.childItem, childItem.ui?.childItem] })"
          />
        </AccordionRoot>
      </AccordionContent>
    </component>
  </DefineItemTemplate>

  <NavigationMenuRoot
    data-slot="root"
    v-bind="{
  ...rootProps,
  ...props.orientation === 'horizontal' ? {
    modelValue: props.modelValue,
    defaultValue: props.defaultValue
  } : {},
  ...$attrs
}"
    :data-collapsed="props.collapsed"
    :class="ui.root({ class: [props.ui?.root, props.class] })"
  >
    <slot name="list-leading" />

    <template v-for="(list, listIndex) in lists" :key="`list-${listIndex}`">
      <component
        v-bind="props.orientation === 'vertical' && !props.collapsed ? {
  ...accordionProps,
  modelValue: props.modelValue,
  defaultValue: props.defaultValue ?? getAccordionDefaultValue(list, 0, listIndex)
} : {}"
        :is="props.orientation === 'vertical' ? AccordionRoot : NavigationMenuList"
        as="ul"
        data-slot="list"
        :class="ui.list({ class: props.ui?.list })"
      >
        <ReuseItemTemplate
          v-for="(item, index) in list"
          :key="`list-${listIndex}-${index}`"
          :item="item"
          :index="index"
          :list-index="listIndex"
          data-slot="item"
          :class="ui.item({ class: [props.ui?.item, item.ui?.item] })"
        />
      </component>

      <div v-if="props.orientation === 'vertical' && listIndex < lists.length - 1" data-slot="separator" :class="ui.separator({ class: props.ui?.separator })" />
    </template>

    <slot name="list-trailing" />

    <div v-if="props.orientation === 'horizontal'" data-slot="viewportWrapper" :class="ui.viewportWrapper({ class: props.ui?.viewportWrapper })">
      <NavigationMenuIndicator v-if="props.arrow" data-slot="indicator" :class="ui.indicator({ class: props.ui?.indicator })">
        <div data-slot="arrow" :class="ui.arrow({ class: props.ui?.arrow })" />
      </NavigationMenuIndicator>

      <NavigationMenuViewport data-slot="viewport" :class="ui.viewport({ class: props.ui?.viewport })" />
    </div>
  </NavigationMenuRoot>
</template>
```


## OverlayProvider.vue

```vue
<script setup>
import { computed } from "vue";
import { useOverlay } from "../composables/useOverlay";
const { overlays, unmount, close } = useOverlay();
const mountedOverlays = computed(() => overlays.filter((overlay) => overlay.isMounted));
const onAfterLeave = (id) => {
  close(id);
  unmount(id);
};
const onClose = (id, value) => {
  close(id, value);
};
</script>

<template>
  <component
    :is="overlay.component"
    v-for="overlay in mountedOverlays"
    :key="overlay.id"
    v-bind="overlay.props"
    v-model:open="overlay.isOpen"
    @close="(value) => onClose(overlay.id, value)"
    @after:leave="onAfterLeave(overlay.id)"
  />
</template>
```


## Page.vue

```vue
<script>
import theme from "#build/ui/page";
</script>

<script setup>
import { computed, onBeforeUpdate, shallowRef } from "vue";
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
const props = useComponentProps("page", _props);
const appConfig = useAppConfig();
const hasLeft = shallowRef(!!slots.left);
const hasRight = shallowRef(!!slots.right);
onBeforeUpdate(() => {
  hasLeft.value = !!slots.left;
  hasRight.value = !!slots.right;
});
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.page || {} })({
  left: hasLeft.value,
  right: hasRight.value
}));
</script>

<template>
  <Primitive :as="props.as" data-slot="root" :class="ui.root({ class: [props.ui?.root, props.class] })">
    <Slot v-if="!!slots.left" data-slot="left" :class="ui.left({ class: props.ui?.left })">
      <slot name="left" />
    </Slot>

    <div data-slot="center" :class="ui.center({ class: props.ui?.center })">
      <slot />
    </div>

    <Slot v-if="!!slots.right" data-slot="right" :class="ui.right({ class: props.ui?.right })">
      <slot name="right" />
    </Slot>
  </Primitive>
</template>
```


## PageAnchors.vue

```vue
<script>
import theme from "#build/ui/page-anchors";
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
  links: { type: Array, required: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false }
});
const slots = defineSlots();
const props = useComponentProps("pageAnchors", _props);
const appConfig = useAppConfig();
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.pageAnchors || {} })());
</script>

<template>
  <Primitive :as="props.as" data-slot="root" :class="ui.root({ class: [props.ui?.root, props.class] })">
    <ul data-slot="list" :class="ui.list({ class: props.ui?.list })">
      <li v-for="(link, index) in props.links" :key="index" data-slot="item" :class="ui.item({ class: [props.ui?.item, link.ui?.item] })">
        <ULink v-slot="{ active, ...slotProps }" v-bind="pickLinkProps(link)" custom>
          <ULinkBase v-bind="slotProps" data-slot="link" :class="ui.link({ class: [props.ui?.link, link.ui?.link, link.class], active })">
            <slot name="link" :link="link" :active="active" :ui="ui">
              <div v-if="link.icon || !!slots['link-leading']" data-slot="linkLeading" :class="ui.linkLeading({ class: [props.ui?.linkLeading, link.ui?.linkLeading], active })">
                <slot name="link-leading" :link="link" :active="active" :ui="ui">
                  <UIcon v-if="link.icon" :name="link.icon" data-slot="linkLeadingIcon" :class="ui.linkLeadingIcon({ class: [props.ui?.linkLeadingIcon, link.ui?.linkLeadingIcon], active })" />
                </slot>
              </div>

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
  </Primitive>
</template>
```


## PageAside.vue

```vue
<script>
import theme from "#build/ui/page-aside";
</script>

<script setup>
import { computed } from "vue";
import { Primitive } from "reka-ui";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { tv } from "../utils/tv";
const _props = defineProps({
  as: { type: null, required: false, default: "aside" },
  class: { type: null, required: false },
  ui: { type: Object, required: false }
});
const slots = defineSlots();
const props = useComponentProps("pageAside", _props);
const appConfig = useAppConfig();
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.pageAside || {} })());
</script>

<template>
  <Primitive :as="props.as" data-slot="root" :class="ui.root({ class: [props.ui?.root, props.class] })">
    <div data-slot="container" :class="ui.container({ class: props.ui?.container })">
      <div v-if="!!slots.top" data-slot="top" :class="ui.top({ class: props.ui?.top })">
        <div data-slot="topHeader" :class="ui.topHeader({ class: props.ui?.topHeader })" />
        <div data-slot="topBody" :class="ui.topBody({ class: props.ui?.topBody })">
          <slot name="top" />
        </div>
        <div data-slot="topFooter" :class="ui.topFooter({ class: props.ui?.topFooter })" />
      </div>

      <slot />

      <slot name="bottom" />
    </div>
  </Primitive>
</template>
```


## PageBody.vue

```vue
<script>
import theme from "#build/ui/page-body";
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
const props = useComponentProps("pageBody", _props);
const appConfig = useAppConfig();
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.pageBody || {} }));
</script>

<template>
  <Primitive :as="props.as" :class="ui({ class: [props.ui?.base, props.class] })">
    <slot />
  </Primitive>
</template>
```


## PageCard.vue

```vue
<script>
import theme from "#build/ui/page-card";
</script>

<script setup>
import { computed, ref, watch } from "vue";
import { Primitive } from "reka-ui";
import { useMouseInElement, pausableFilter } from "@vueuse/core";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { usePrefix } from "../composables/usePrefix";
import { getSlotChildrenText } from "../utils";
import { tv } from "../utils/tv";
import ULink from "./Link.vue";
import UIcon from "./Icon.vue";
defineOptions({ inheritAttrs: false });
const _props = defineProps({
  as: { type: null, required: false },
  icon: { type: null, required: false },
  title: { type: String, required: false },
  description: { type: String, required: false },
  orientation: { type: null, required: false, default: "vertical" },
  reverse: { type: Boolean, required: false },
  highlight: { type: Boolean, required: false },
  highlightColor: { type: null, required: false },
  spotlight: { type: Boolean, required: false },
  spotlightColor: { type: null, required: false },
  variant: { type: null, required: false },
  to: { type: null, required: false },
  target: { type: [String, Object, null], required: false },
  onClick: { type: Function, required: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false }
});
const slots = defineSlots();
const props = useComponentProps("pageCard", _props);
const cardRef = ref();
const motionControl = pausableFilter();
const appConfig = useAppConfig();
const { elementX, elementY } = useMouseInElement(cardRef, {
  eventFilter: motionControl.eventFilter
});
const prefix = usePrefix();
const spotlight = computed(() => props.spotlight && (elementX.value !== 0 || elementY.value !== 0));
watch(() => props.spotlight, (value) => {
  if (value) {
    motionControl.resume();
  } else {
    motionControl.pause();
  }
}, { immediate: true });
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.pageCard || {} })({
  orientation: props.orientation,
  reverse: props.reverse,
  variant: props.variant,
  to: !!props.to || !!props.onClick,
  title: !!props.title || !!slots.title,
  highlight: props.highlight,
  highlightColor: props.highlightColor,
  spotlight: spotlight.value,
  spotlightColor: props.spotlightColor
}));
const ariaLabel = computed(() => {
  const slotText = slots.title && getSlotChildrenText(slots.title());
  return (slotText || props.title || "Card link").trim();
});
</script>

<template>
  <Primitive
    ref="cardRef"
    :as="props.as"
    v-bind="!props.to ? $attrs : {}"
    :data-orientation="props.orientation"
    :data-slot="$attrs['data-slot'] ?? 'root'"
    :class="ui.root({ class: [props.ui?.root, props.class] })"
    :style="spotlight && { '--spotlight-x': `${elementX}px`, '--spotlight-y': `${elementY}px` }"
    @click="props.onClick"
  >
    <div v-if="props.spotlight" data-slot="spotlight" :class="ui.spotlight({ class: props.ui?.spotlight })" />

    <div data-slot="container" :class="ui.container({ class: props.ui?.container })">
      <div v-if="!!slots.header || (props.icon || !!slots.leading) || !!slots.body || (props.title || !!slots.title) || (props.description || !!slots.description) || !!slots.footer" data-slot="wrapper" :class="ui.wrapper({ class: props.ui?.wrapper })">
        <div v-if="!!slots.header" data-slot="header" :class="ui.header({ class: props.ui?.header })">
          <slot name="header" />
        </div>

        <div v-if="props.icon || !!slots.leading" data-slot="leading" :class="ui.leading({ class: props.ui?.leading })">
          <slot name="leading" :ui="ui">
            <UIcon v-if="props.icon" :name="props.icon" data-slot="leadingIcon" :class="ui.leadingIcon({ class: props.ui?.leadingIcon })" />
          </slot>
        </div>

        <div v-if="!!slots.body || (props.title || !!slots.title) || (props.description || !!slots.description)" data-slot="body" :class="ui.body({ class: props.ui?.body })">
          <slot name="body">
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

        <div v-if="!!slots.footer" data-slot="footer" :class="ui.footer({ class: props.ui?.footer })">
          <slot name="footer" />
        </div>
      </div>

      <slot />
    </div>

    <ULink
      v-if="props.to"
      :aria-label="ariaLabel"
      v-bind="{ 'to': props.to, 'target': props.target, ...$attrs, 'data-slot': void 0 }"
      :class="prefix('focus:outline-none peer')"
      raw
    >
      <span :class="prefix('absolute inset-0')" aria-hidden="true" />
    </ULink>
  </Primitive>
</template>
```


## PageColumns.vue

```vue
<script>
import theme from "#build/ui/page-columns";
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
const props = useComponentProps("pageColumns", _props);
const appConfig = useAppConfig();
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.pageColumns || {} }));
</script>

<template>
  <Primitive :as="props.as" :class="ui({ class: [props.ui?.base, props.class] })">
    <slot />
  </Primitive>
</template>
```


## PageCTA.vue

```vue
<script>
import theme from "#build/ui/page-cta";
</script>

<script setup>
import { computed } from "vue";
import { Primitive } from "reka-ui";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { usePrefix } from "../composables/usePrefix";
import { tv } from "../utils/tv";
import UButton from "./Button.vue";
import UContainer from "./Container.vue";
const _props = defineProps({
  as: { type: null, required: false },
  class: { type: null, required: false },
  title: { type: String, required: false },
  description: { type: String, required: false },
  orientation: { type: null, required: false, default: "vertical" },
  reverse: { type: Boolean, required: false, default: false },
  variant: { type: null, required: false },
  links: { type: Array, required: false },
  ui: { type: Object, required: false }
});
const slots = defineSlots();
const props = useComponentProps("pageCTA", _props);
const appConfig = useAppConfig();
const prefix = usePrefix();
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.pageCTA || {} })({
  variant: props.variant,
  orientation: props.orientation,
  reverse: props.reverse,
  title: !!props.title || !!slots.title
}));
</script>

<template>
  <Primitive :as="props.as" :data-orientation="props.orientation" data-slot="root" :class="ui.root({ class: [props.ui?.root, props.class] })">
    <slot name="top" />

    <UContainer data-slot="container" :class="ui.container({ class: props.ui?.container })">
      <div v-if="!!slots.header || (props.title || !!slots.title) || (props.description || !!slots.description) || !!slots.body || !!slots.footer || (props.links?.length || !!slots.links)" data-slot="wrapper" :class="ui.wrapper({ class: props.ui?.wrapper })">
        <div v-if="!!slots.header || (props.title || !!slots.title) || (props.description || !!slots.description)" data-slot="header" :class="ui.header({ class: props.ui?.header })">
          <slot name="header">
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

        <div v-if="!!slots.body" data-slot="body" :class="ui.body({ class: props.ui?.body })">
          <slot name="body" />
        </div>

        <div v-if="!!slots.footer || (props.links?.length || !!slots.links)" data-slot="footer" :class="ui.footer({ class: props.ui?.footer })">
          <slot name="footer">
            <div v-if="props.links?.length || !!slots.links" data-slot="links" :class="ui.links({ class: props.ui?.links })">
              <slot name="links">
                <UButton v-for="(link, index) in props.links" :key="index" size="lg" v-bind="link" />
              </slot>
            </div>
          </slot>
        </div>
      </div>

      <slot v-if="!!slots.default" />
      <div v-else-if="props.orientation === 'horizontal'" :class="prefix('hidden lg:block')" />
    </UContainer>

    <slot name="bottom" />
  </Primitive>
</template>
```


## PageFeature.vue

```vue
<script>
import theme from "#build/ui/page-feature";
</script>

<script setup>
import { computed } from "vue";
import { Primitive } from "reka-ui";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { usePrefix } from "../composables/usePrefix";
import { getSlotChildrenText } from "../utils";
import { tv } from "../utils/tv";
import ULink from "./Link.vue";
import UIcon from "./Icon.vue";
defineOptions({ inheritAttrs: false });
const _props = defineProps({
  as: { type: null, required: false },
  icon: { type: null, required: false },
  title: { type: String, required: false },
  description: { type: String, required: false },
  orientation: { type: null, required: false, default: "horizontal" },
  to: { type: null, required: false },
  target: { type: [String, Object, null], required: false },
  onClick: { type: Function, required: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false }
});
const slots = defineSlots();
const props = useComponentProps("pageFeature", _props);
const appConfig = useAppConfig();
const prefix = usePrefix();
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.pageFeature || {} })({
  orientation: props.orientation,
  title: !!props.title || !!slots.title,
  to: !!props.to || !!props.onClick
}));
const ariaLabel = computed(() => {
  const slotText = slots.title && getSlotChildrenText(slots.title());
  return (slotText || props.title || "Feature link").trim();
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
    <div v-if="props.icon || !!slots.leading" data-slot="leading" :class="ui.leading({ class: props.ui?.leading })">
      <slot name="leading" :ui="ui">
        <UIcon v-if="props.icon" :name="props.icon" data-slot="leadingIcon" :class="ui.leadingIcon({ class: props.ui?.leadingIcon })" />
      </slot>
    </div>

    <div data-slot="wrapper" :class="ui.wrapper({ class: props.ui?.wrapper })">
      <ULink
        v-if="props.to"
        :aria-label="ariaLabel"
        v-bind="{ 'to': props.to, 'target': props.target, ...$attrs, 'data-slot': void 0 }"
        :class="prefix('focus:outline-none peer')"
        raw
      >
        <span :class="prefix('absolute inset-0')" aria-hidden="true" />
      </ULink>

      <slot>
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
  </Primitive>
</template>
```


## PageGrid.vue

```vue
<script>
import theme from "#build/ui/page-grid";
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
const props = useComponentProps("pageGrid", _props);
const appConfig = useAppConfig();
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.pageGrid || {} }));
</script>

<template>
  <Primitive :as="props.as" :class="ui({ class: [props.ui?.base, props.class] })">
    <slot />
  </Primitive>
</template>
```


## PageHeader.vue

```vue
<script>
import theme from "#build/ui/page-header";
</script>

<script setup>
import { computed } from "vue";
import { Primitive } from "reka-ui";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { tv } from "../utils/tv";
import UButton from "./Button.vue";
const _props = defineProps({
  as: { type: null, required: false },
  headline: { type: String, required: false },
  title: { type: String, required: false },
  description: { type: String, required: false },
  links: { type: Array, required: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false }
});
const slots = defineSlots();
const props = useComponentProps("pageHeader", _props);
const appConfig = useAppConfig();
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.pageHeader || {} })({
  title: !!props.title || !!slots.title
}));
</script>

<template>
  <Primitive :as="props.as" data-slot="root" :class="ui.root({ class: [props.ui?.root, props.class] })">
    <div v-if="props.headline || !!slots.headline" data-slot="headline" :class="ui.headline({ class: props.ui?.headline })">
      <slot name="headline">
        {{ props.headline }}
      </slot>
    </div>

    <div data-slot="container" :class="ui.container({ class: props.ui?.container })">
      <div data-slot="wrapper" :class="ui.wrapper({ class: props.ui?.wrapper })">
        <h1 v-if="props.title || !!slots.title" data-slot="title" :class="ui.title({ class: props.ui?.title })">
          <slot name="title">
            {{ props.title }}
          </slot>
        </h1>

        <div v-if="props.links?.length || !!slots.links" data-slot="links" :class="ui.links({ class: props.ui?.links })">
          <slot name="links">
            <UButton v-for="(link, index) in props.links" :key="index" color="neutral" variant="outline" v-bind="link" />
          </slot>
        </div>
      </div>

      <div v-if="props.description || !!slots.description" data-slot="description" :class="ui.description({ class: props.ui?.description })">
        <slot name="description">
          {{ props.description }}
        </slot>
      </div>

      <slot />
    </div>
  </Primitive>
</template>
```


## PageHero.vue

```vue
<script>
import theme from "#build/ui/page-hero";
</script>

<script setup>
import { computed } from "vue";
import { Primitive } from "reka-ui";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { usePrefix } from "../composables/usePrefix";
import { tv } from "../utils/tv";
import UButton from "./Button.vue";
import UContainer from "./Container.vue";
const _props = defineProps({
  as: { type: null, required: false },
  headline: { type: String, required: false },
  title: { type: String, required: false },
  description: { type: String, required: false },
  links: { type: Array, required: false },
  orientation: { type: null, required: false, default: "vertical" },
  reverse: { type: Boolean, required: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false }
});
const slots = defineSlots();
const props = useComponentProps("pageHero", _props);
const appConfig = useAppConfig();
const prefix = usePrefix();
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.pageHero || {} })({
  orientation: props.orientation,
  reverse: props.reverse,
  title: !!props.title || !!slots.title
}));
</script>

<template>
  <Primitive :as="props.as" :data-orientation="props.orientation" data-slot="root" :class="ui.root({ class: [props.ui?.root, props.class] })">
    <slot name="top" />

    <UContainer data-slot="container" :class="ui.container({ class: props.ui?.container })">
      <div v-if="!!slots.header || (props.headline || !!slots.headline) || (props.title || !!slots.title) || (props.description || !!slots.description) || !!slots.body || !!slots.footer || (props.links?.length || !!slots.links)" data-slot="wrapper" :class="ui.wrapper({ class: props.ui?.wrapper })">
        <div v-if="!!slots.header || (props.headline || !!slots.headline) || (props.title || !!slots.title) || (props.description || !!slots.description)" data-slot="header" :class="ui.header({ class: props.ui?.header })">
          <slot name="header">
            <div v-if="props.headline || !!slots.headline" data-slot="headline" :class="ui.headline({ class: props.ui?.headline, headline: !slots.headline })">
              <slot name="headline">
                {{ props.headline }}
              </slot>
            </div>

            <h1 v-if="props.title || !!slots.title" data-slot="title" :class="ui.title({ class: props.ui?.title })">
              <slot name="title">
                {{ props.title }}
              </slot>
            </h1>

            <div v-if="props.description || !!slots.description" data-slot="description" :class="ui.description({ class: props.ui?.description })">
              <slot name="description">
                {{ props.description }}
              </slot>
            </div>
          </slot>
        </div>

        <div v-if="!!slots.body" data-slot="body" :class="ui.body({ class: props.ui?.body })">
          <slot name="body" />
        </div>

        <div v-if="!!slots.footer || (props.links?.length || !!slots.links)" data-slot="footer" :class="ui.footer({ class: props.ui?.footer })">
          <slot name="footer">
            <div v-if="props.links?.length || !!slots.links" data-slot="links" :class="ui.links({ class: props.ui?.links })">
              <slot name="links">
                <UButton v-for="(link, index) in props.links" :key="index" size="xl" v-bind="link" />
              </slot>
            </div>
          </slot>
        </div>
      </div>

      <slot v-if="!!slots.default" />
      <div v-else-if="props.orientation === 'horizontal'" :class="prefix('hidden lg:block')" />
    </UContainer>

    <slot name="bottom" />
  </Primitive>
</template>
```


## PageLinks.vue

```vue
<script>
import theme from "#build/ui/page-links";
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
  title: { type: String, required: false },
  links: { type: Array, required: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false }
});
const slots = defineSlots();
const props = useComponentProps("pageLinks", _props);
const appConfig = useAppConfig();
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.pageLinks || {} })());
</script>

<template>
  <Primitive :as="props.as" data-slot="root" :class="ui.root({ class: [props.ui?.root, props.class] })">
    <p v-if="props.title || !!slots.title" data-slot="title" :class="ui.title({ class: props.ui?.title })">
      <slot name="title">
        {{ props.title }}
      </slot>
    </p>

    <ul data-slot="list" :class="ui.list({ class: props.ui?.list })">
      <li v-for="(link, index) in props.links" :key="index" data-slot="item" :class="ui.item({ class: [props.ui?.item, link.ui?.item] })">
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
  </Primitive>
</template>
```


## PageList.vue

```vue
<script>
import theme from "#build/ui/page-list";
</script>

<script setup>
import { computed } from "vue";
import { Primitive } from "reka-ui";
import { useAppConfig } from "#imports";
import { tv } from "../utils/tv";
import { useComponentProps } from "../composables/useComponentProps";
const _props = defineProps({
  as: { type: null, required: false },
  divide: { type: Boolean, required: false, default: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false }
});
defineSlots();
const props = useComponentProps("pageList", _props);
const appConfig = useAppConfig();
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.pageList || {} }));
</script>

<template>
  <Primitive :as="props.as" role="list" :class="ui({ class: [props.ui?.base, props.class], divide: props.divide })">
    <slot />
  </Primitive>
</template>
```


## PageLogos.vue

```vue
<script>
import theme from "#build/ui/page-logos";
</script>

<script setup>
import { computed } from "vue";
import { Primitive } from "reka-ui";
import { createReusableTemplate } from "@vueuse/core";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { tv } from "../utils/tv";
import UMarquee from "./Marquee.vue";
import UAvatar from "./Avatar.vue";
import UIcon from "./Icon.vue";
defineOptions({ inheritAttrs: false });
const [DefineCreateItemTemplate, ReuseCreateItemTemplate] = createReusableTemplate();
const _props = defineProps({
  as: { type: null, required: false },
  title: { type: String, required: false },
  items: { type: Array, required: false },
  marquee: { type: [Boolean, Object], required: false, default: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false }
});
const slots = defineSlots();
const props = useComponentProps("pageLogos", _props);
const appConfig = useAppConfig();
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.pageLogos || {} })());
</script>

<template>
  <DefineCreateItemTemplate>
    <slot v-if="!!slots.default" />
    <template v-else-if="props.items?.length">
      <template v-for="(item, index) in props.items" :key="index">
        <UAvatar
          v-if="typeof item === 'object'"
          :src="item.src"
          :alt="item.alt"
          data-slot="logo"
          :class="ui.logo({ class: props.ui?.logo })"
        />
        <UIcon
          v-else
          :name="item"
          data-slot="logo"
          :class="ui.logo({ class: props.ui?.logo })"
        />
      </template>
    </template>
  </DefineCreateItemTemplate>

  <Primitive :as="props.as" data-slot="root" v-bind="$attrs" :class="ui.root({ class: [props.ui?.root, props.class] })">
    <h2 v-if="props.title" data-slot="title" :class="ui.title({ class: props.ui?.title })">
      {{ props.title }}
    </h2>

    <UMarquee
      v-if="props.marquee"
      v-bind="typeof props.marquee === 'object' ? props.marquee : {}"
      data-slot="logos"
      :class="ui.logos({ class: props.ui?.logos, marquee: true })"
    >
      <ReuseCreateItemTemplate :items="props.items" />
    </UMarquee>
    <div v-else data-slot="logos" :class="ui.logos({ class: props.ui?.logos })">
      <ReuseCreateItemTemplate :items="props.items" />
    </div>
  </Primitive>
</template>
```


## PageSection.vue

```vue
<script>
import theme from "#build/ui/page-section";
</script>

<script setup>
import { computed } from "vue";
import { Primitive } from "reka-ui";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { usePrefix } from "../composables/usePrefix";
import { tv } from "../utils/tv";
import UPageFeature from "./PageFeature.vue";
import UContainer from "./Container.vue";
import UIcon from "./Icon.vue";
import UButton from "./Button.vue";
const _props = defineProps({
  as: { type: null, required: false, default: "section" },
  headline: { type: String, required: false },
  icon: { type: null, required: false },
  title: { type: String, required: false },
  description: { type: String, required: false },
  links: { type: Array, required: false },
  features: { type: Array, required: false },
  orientation: { type: null, required: false, default: "vertical" },
  reverse: { type: Boolean, required: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false }
});
const slots = defineSlots();
const props = useComponentProps("pageSection", _props);
const appConfig = useAppConfig();
const prefix = usePrefix();
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.pageSection || {} })({
  orientation: props.orientation,
  reverse: props.reverse,
  title: !!props.title || !!slots.title,
  description: !!props.description || !!slots.description,
  body: !!slots.body || (!!props.features?.length || !!slots.features)
}));
</script>

<template>
  <Primitive :as="props.as" :data-orientation="props.orientation" data-slot="root" :class="ui.root({ class: [props.ui?.root, props.class] })">
    <slot name="top" />

    <UContainer data-slot="container" :class="ui.container({ class: props.ui?.container })">
      <div v-if="!!slots.header || (props.icon || !!slots.leading) || (props.headline || !!slots.headline) || (props.title || !!slots.title) || (props.description || !!slots.description) || !!slots.body || (props.features?.length || !!slots.features) || !!slots.footer || (props.links?.length || !!slots.links)" data-slot="wrapper" :class="ui.wrapper({ class: props.ui?.wrapper })">
        <div v-if="!!slots.header || (props.icon || !!slots.leading) || (props.headline || !!slots.headline) || (props.title || !!slots.title) || (props.description || !!slots.description)" data-slot="header" :class="ui.header({ class: props.ui?.header })">
          <slot name="header">
            <div v-if="props.icon || !!slots.leading" data-slot="leading" :class="ui.leading({ class: props.ui?.leading })">
              <slot name="leading" :ui="ui">
                <UIcon v-if="props.icon" :name="props.icon" data-slot="leadingIcon" :class="ui.leadingIcon({ class: props.ui?.leadingIcon })" />
              </slot>
            </div>

            <div v-if="props.headline || !!slots.headline" data-slot="headline" :class="ui.headline({ class: props.ui?.headline, headline: !slots.headline })">
              <slot name="headline">
                {{ props.headline }}
              </slot>
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
          </slot>
        </div>

        <div v-if="!!slots.body || (props.features?.length || !!slots.features)" data-slot="body" :class="ui.body({ class: props.ui?.body })">
          <slot name="body">
            <ul v-if="props.features?.length || !!slots.features" data-slot="features" :class="ui.features({ class: props.ui?.features })">
              <slot name="features">
                <UPageFeature
                  v-for="(feature, index) in props.features"
                  :key="index"
                  as="li"
                  v-bind="feature"
                />
              </slot>
            </ul>
          </slot>
        </div>

        <div v-if="!!slots.footer || (props.links?.length || !!slots.links)" data-slot="footer" :class="ui.footer({ class: props.ui?.footer })">
          <slot name="footer">
            <div v-if="props.links?.length || !!slots.links" data-slot="links" :class="ui.links({ class: props.ui?.links })">
              <slot name="links">
                <UButton v-for="(link, index) in props.links" :key="index" size="lg" v-bind="link" />
              </slot>
            </div>
          </slot>
        </div>
      </div>

      <slot v-if="!!slots.default" />
      <div v-else-if="props.orientation === 'horizontal'" :class="prefix('hidden lg:block')" />
    </UContainer>

    <slot name="bottom" />
  </Primitive>
</template>
```


## Pagination.vue

```vue
<script>
import theme from "#build/ui/pagination";
</script>

<script setup>
import { computed } from "vue";
import { PaginationRoot, PaginationList, PaginationListItem, PaginationFirst, PaginationPrev, PaginationEllipsis, PaginationNext, PaginationLast } from "reka-ui";
import { useForwardProps } from "../composables/useForwardProps";
import { reactivePick } from "@vueuse/core";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { useLocale } from "../composables/useLocale";
import { tv } from "../utils/tv";
import UButton from "./Button.vue";
const _props = defineProps({
  as: { type: null, required: false },
  firstIcon: { type: null, required: false },
  prevIcon: { type: null, required: false },
  nextIcon: { type: null, required: false },
  lastIcon: { type: null, required: false },
  ellipsisIcon: { type: null, required: false },
  color: { type: null, required: false, default: "neutral" },
  variant: { type: null, required: false, default: "outline" },
  activeColor: { type: null, required: false, default: "primary" },
  activeVariant: { type: null, required: false, default: "solid" },
  showControls: { type: Boolean, required: false, default: true },
  size: { type: null, required: false },
  to: { type: Function, required: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false },
  defaultPage: { type: Number, required: false },
  disabled: { type: Boolean, required: false },
  itemsPerPage: { type: Number, required: false, default: 10 },
  page: { type: Number, required: false },
  showEdges: { type: Boolean, required: false, default: false },
  siblingCount: { type: Number, required: false, default: 2 },
  total: { type: Number, required: false, default: 0 }
});
const emits = defineEmits(["update:page"]);
const slots = defineSlots();
const props = useComponentProps("pagination", _props);
const { dir } = useLocale();
const appConfig = useAppConfig();
const rootProps = useForwardProps(reactivePick(props, "as", "defaultPage", "disabled", "itemsPerPage", "page", "showEdges", "siblingCount", "total"), emits);
const firstIcon = computed(() => props.firstIcon || (dir.value === "rtl" ? appConfig.ui.icons.chevronDoubleRight : appConfig.ui.icons.chevronDoubleLeft));
const prevIcon = computed(() => props.prevIcon || (dir.value === "rtl" ? appConfig.ui.icons.chevronRight : appConfig.ui.icons.chevronLeft));
const nextIcon = computed(() => props.nextIcon || (dir.value === "rtl" ? appConfig.ui.icons.chevronLeft : appConfig.ui.icons.chevronRight));
const lastIcon = computed(() => props.lastIcon || (dir.value === "rtl" ? appConfig.ui.icons.chevronDoubleLeft : appConfig.ui.icons.chevronDoubleRight));
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.pagination || {} })());
</script>

<template>
  <PaginationRoot v-slot="{ page, pageCount }" v-bind="rootProps" data-slot="root" :class="ui.root({ class: [props.ui?.root, props.class] })">
    <PaginationList v-slot="{ items }" data-slot="list" :class="ui.list({ class: props.ui?.list })">
      <PaginationFirst v-if="props.showControls || !!slots.first" as-child data-slot="first" :class="ui.first({ class: props.ui?.first })">
        <slot name="first">
          <UButton :color="props.color" :variant="props.variant" :size="props.size" :icon="firstIcon" :to="props.to?.(1)" />
        </slot>
      </PaginationFirst>
      <PaginationPrev v-if="props.showControls || !!slots.prev" as-child data-slot="prev" :class="ui.prev({ class: props.ui?.prev })">
        <slot name="prev">
          <UButton :color="props.color" :variant="props.variant" :size="props.size" :icon="prevIcon" :to="page > 1 ? props.to?.(page - 1) : void 0" />
        </slot>
      </PaginationPrev>

      <template v-for="(item, index) in items" :key="index">
        <PaginationListItem v-if="item.type === 'page'" as-child :value="item.value" data-slot="item" :class="ui.item({ class: props.ui?.item })">
          <slot name="item" v-bind="{ item, index, page, pageCount }">
            <UButton
              :color="page === item.value ? props.activeColor : props.color"
              :variant="page === item.value ? props.activeVariant : props.variant"
              :size="props.size"
              :label="String(item.value)"
              :ui="{ label: ui.label() }"
              :to="props.to?.(item.value)"
              square
            />
          </slot>
        </PaginationListItem>

        <PaginationEllipsis v-else as-child data-slot="ellipsis" :class="ui.ellipsis({ class: props.ui?.ellipsis })">
          <slot name="ellipsis" :ui="ui">
            <UButton as="div" :color="props.color" :variant="props.variant" :size="props.size" :icon="props.ellipsisIcon || appConfig.ui.icons.ellipsis" />
          </slot>
        </PaginationEllipsis>
      </template>

      <PaginationNext v-if="props.showControls || !!slots.next" as-child data-slot="next" :class="ui.next({ class: props.ui?.next })">
        <slot name="next">
          <UButton :color="props.color" :variant="props.variant" :size="props.size" :icon="nextIcon" :to="page < pageCount ? props.to?.(page + 1) : void 0" />
        </slot>
      </PaginationNext>
      <PaginationLast v-if="props.showControls || !!slots.last" as-child data-slot="last" :class="ui.last({ class: props.ui?.last })">
        <slot name="last">
          <UButton :color="props.color" :variant="props.variant" :size="props.size" :icon="lastIcon" :to="props.to?.(pageCount)" />
        </slot>
      </PaginationLast>
    </PaginationList>
  </PaginationRoot>
</template>
```


## PinInput.vue

```vue
<script>
import theme from "#build/ui/pin-input";
</script>

<script setup>
import { ref, computed, onMounted, onScopeDispose } from "vue";
import { PinInputInput, PinInputRoot } from "reka-ui";
import { useForwardProps } from "../composables/useForwardProps";
import { reactivePick } from "@vueuse/core";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { useFormField } from "../composables/useFormField";
import { looseToNumber } from "../utils";
import { tv } from "../utils/tv";
const _props = defineProps({
  as: { type: null, required: false },
  color: { type: null, required: false },
  variant: { type: null, required: false },
  size: { type: null, required: false },
  length: { type: [Number, String], required: false, default: 5 },
  autofocus: { type: Boolean, required: false },
  autofocusDelay: { type: Number, required: false, default: 0 },
  highlight: { type: Boolean, required: false },
  fixed: { type: Boolean, required: false },
  separator: { type: [Number, Array], required: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false },
  defaultValue: { type: null, required: false },
  disabled: { type: Boolean, required: false },
  id: { type: String, required: false },
  mask: { type: Boolean, required: false },
  modelValue: { type: null, required: false },
  name: { type: String, required: false },
  otp: { type: Boolean, required: false },
  placeholder: { type: String, required: false },
  required: { type: Boolean, required: false },
  type: { type: null, required: false, default: "text" }
});
const emits = defineEmits(["update:modelValue", "complete", "change", "blur"]);
defineSlots();
const props = useComponentProps("pinInput", _props);
const appConfig = useAppConfig();
const rootProps = useForwardProps(reactivePick(props, "disabled", "id", "mask", "name", "otp", "required", "type"), emits);
const { emitFormInput, emitFormFocus, emitFormChange, emitFormBlur, size: formFieldSize, color: formFieldColor, id, name, highlight: formFieldHighlight, disabled: formFieldDisabled, ariaAttrs } = useFormField(_props);
const color = computed(() => formFieldColor.value ?? props.color);
const highlight = computed(() => formFieldHighlight.value ?? props.highlight);
const size = computed(() => formFieldSize.value ?? props.size);
const disabled = computed(() => formFieldDisabled.value ?? props.disabled);
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.pinInput || {} })({
  color: color.value,
  variant: props.variant,
  size: size.value,
  highlight: highlight.value,
  fixed: props.fixed
}));
const inputsRef = ref([]);
function setInputRef(index, el) {
  inputsRef.value[index] = el;
}
function onComplete(value) {
  const event = new Event("change", { target: { value } });
  emits("change", event);
  emitFormChange();
}
function onBlur(event) {
  if (!event.relatedTarget) {
    emits("blur", event);
    emitFormBlur();
  }
}
function autoFocus() {
  if (props.autofocus) {
    inputsRef.value[0]?.$el?.focus();
  }
}
function shouldInsertSeparator(index) {
  if (props.separator === void 0) {
    return false;
  }
  const position = index + 1;
  if (position >= looseToNumber(props.length)) {
    return false;
  }
  if (Array.isArray(props.separator)) {
    return props.separator.includes(position);
  }
  const separator = looseToNumber(props.separator);
  return Number.isInteger(separator) && separator > 0 && position % separator === 0;
}
let autofocusTimeoutId;
onMounted(() => {
  autofocusTimeoutId = setTimeout(() => {
    autoFocus();
  }, props.autofocusDelay);
});
onScopeDispose(() => clearTimeout(autofocusTimeoutId));
defineExpose({
  inputsRef
});
</script>

<template>
  <PinInputRoot
    v-bind="{ ...rootProps, ...ariaAttrs }"
    :id="id"
    :name="name"
    :placeholder="props.placeholder"
    :model-value="props.modelValue"
    :default-value="props.defaultValue"
    data-slot="root"
    :class="ui.root({ class: [props.ui?.root, props.class] })"
    @update:model-value="emitFormInput()"
    @complete="onComplete"
  >
    <template v-for="(ids, index) in looseToNumber(props.length)" :key="ids">
      <PinInputInput
        :ref="(el) => setInputRef(index, el)"
        :index="index"
        data-slot="base"
        :class="ui.base({ class: props.ui?.base })"
        :disabled="disabled"
        @blur="onBlur"
        @focus="emitFormFocus"
      />
      <span
        v-if="shouldInsertSeparator(index)"
        data-slot="separator"
        role="presentation"
        aria-hidden="true"
        :class="ui.separator({ class: props.ui?.separator })"
      >
        <slot name="separator" :index="index">•</slot>
      </span>
    </template>
  </PinInputRoot>
</template>
```


## Popover.vue

```vue
<script>
import theme from "#build/ui/popover";
</script>

<script setup>
import { computed, toRef } from "vue";
import { defu } from "defu";
import { useForwardProps } from "../composables/useForwardProps";
import { Popover, HoverCard } from "reka-ui/namespaced";
import { reactivePick } from "@vueuse/core";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { FieldGroupReset } from "../composables/useFieldGroup";
import { usePortal } from "../composables/usePortal";
import { pointerDownOutside } from "../utils/overlay";
import { tv } from "../utils/tv";
const _props = defineProps({
  mode: { type: null, required: false, default: "click" },
  content: { type: Object, required: false },
  arrow: { type: [Boolean, Object], required: false },
  portal: { type: [Boolean, String], required: false, skipCheck: true, default: true },
  reference: { type: null, required: false },
  dismissible: { type: Boolean, required: false, default: true },
  class: { type: null, required: false },
  ui: { type: null, required: false },
  defaultOpen: { type: Boolean, required: false },
  open: { type: Boolean, required: false },
  modal: { type: Boolean, required: false },
  openDelay: { type: Number, required: false, default: 0 },
  closeDelay: { type: Number, required: false, default: 0 },
  enableTouch: { type: Boolean, required: false }
});
const emits = defineEmits(["close:prevent", "update:open"]);
const slots = defineSlots();
const props = useComponentProps("popover", _props);
const appConfig = useAppConfig();
const pick = props.mode === "hover" ? reactivePick(props, "defaultOpen", "open", "openDelay", "closeDelay", "enableTouch") : reactivePick(props, "defaultOpen", "open", "modal");
const rootProps = useForwardProps(pick, emits);
const portalProps = usePortal(toRef(() => props.portal));
const contentProps = toRef(() => defu(props.content, { side: "bottom", sideOffset: 8, collisionPadding: 8 }));
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
const arrowProps = toRef(() => defu(props.arrow, { rounded: true }));
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.popover || {} })({
  side: contentProps.value.side
}));
const Component = computed(() => props.mode === "hover" ? HoverCard : Popover);
</script>

<template>
  <Component.Root v-slot="{ open, close }" v-bind="rootProps">
    <Component.Trigger v-if="!!slots.default" as-child :class="props.class">
      <slot :open="open" />
    </Component.Trigger>

    <Component.Anchor v-if="'Anchor' in Component && !!slots.anchor" as-child>
      <slot name="anchor" v-bind="close ? { close } : {}" />
    </Component.Anchor>

    <Component.Portal v-bind="portalProps">
      <FieldGroupReset>
        <Component.Content v-bind="contentProps" :reference="props.reference ?? props.content?.reference" data-slot="content" :class="ui.content({ class: [!slots.default && props.class, props.ui?.content] })" v-on="contentEvents">
          <slot name="content" v-bind="close ? { close } : {}" />

          <Component.Arrow v-if="!!props.arrow" v-bind="arrowProps" data-slot="arrow" :class="ui.arrow({ class: props.ui?.arrow })" />
        </Component.Content>
      </FieldGroupReset>
    </Component.Portal>
  </Component.Root>
</template>
```


## PricingPlan.vue

```vue
<script>
import theme from "#build/ui/pricing-plan";
</script>

<script setup>
import { computed } from "vue";
import { Primitive } from "reka-ui";
import { createReusableTemplate } from "@vueuse/core";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { tv } from "../utils/tv";
import UBadge from "./Badge.vue";
import UButton from "./Button.vue";
import UIcon from "./Icon.vue";
defineOptions({ inheritAttrs: false });
const _props = defineProps({
  as: { type: null, required: false },
  title: { type: String, required: false },
  description: { type: String, required: false },
  badge: { type: [String, Object], required: false },
  billingCycle: { type: String, required: false },
  billingPeriod: { type: String, required: false },
  price: { type: String, required: false },
  discount: { type: String, required: false },
  features: { type: Array, required: false },
  button: { type: Object, required: false },
  tagline: { type: String, required: false },
  terms: { type: String, required: false },
  orientation: { type: null, required: false, default: "vertical" },
  variant: { type: null, required: false },
  highlight: { type: Boolean, required: false },
  scale: { type: Boolean, required: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false }
});
const slots = defineSlots();
const props = useComponentProps("pricingPlan", _props);
const appConfig = useAppConfig();
const [DefinePriceTemplate, ReusePriceTemplate] = createReusableTemplate();
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.pricingPlan || {} })({
  orientation: props.orientation,
  variant: props.variant,
  highlight: props.highlight,
  scale: props.scale
}));
const features = computed(() => props.features?.map((feature) => typeof feature === "string" ? { title: feature } : feature));
</script>

<template>
  <DefinePriceTemplate>
    <div v-if="props.discount || props.price || !!slots.discount || !!slots.price || props.billingCycle || props.billingPeriod || !!slots.billing" data-slot="priceWrapper" :class="ui.priceWrapper({ class: props.ui?.priceWrapper })">
      <div v-if="props.discount && props.price || !!slots.discount" data-slot="discount" :class="ui.discount({ class: props.ui?.discount })">
        <slot name="discount">
          {{ props.price }}
        </slot>
      </div>

      <div v-if="props.discount || props.price || !!slots.price" data-slot="price" :class="ui.price({ class: props.ui?.price })">
        <slot name="price">
          {{ props.discount || props.price }}
        </slot>
      </div>

      <div v-if="props.billingCycle || props.billingPeriod || !!slots.billing" data-slot="billing" :class="ui.billing({ class: props.ui?.billing })">
        <slot name="billing" :ui="ui">
          <span data-slot="billingPeriod" :class="ui.billingPeriod({ class: props.ui?.billingPeriod })">
            {{ props.billingPeriod || "\xA0" }}
          </span>

          <span v-if="props.billingCycle" data-slot="billingCycle" :class="ui.billingCycle({ class: props.ui?.billingCycle })">
            {{ props.billingCycle }}
          </span>
        </slot>
      </div>
    </div>
  </DefinePriceTemplate>

  <Primitive :as="props.as" data-slot="root" v-bind="$attrs" :data-orientation="props.orientation" :class="ui.root({ class: [props.ui?.root, props.class] })">
    <div v-if="!!slots.header && props.orientation === 'vertical'" data-slot="header" :class="ui.header({ class: props.ui?.header })">
      <slot name="header" />
    </div>

    <div data-slot="body" :class="ui.body({ class: props.ui?.body })">
      <slot name="body">
        <div data-slot="titleWrapper" :class="ui.titleWrapper({ class: props.ui?.titleWrapper })">
          <div v-if="props.title || !!slots.title" data-slot="title" :class="ui.title({ class: props.ui?.title })">
            <slot name="title">
              {{ props.title }}
            </slot>
          </div>

          <slot name="badge" :ui="ui">
            <UBadge
              v-if="props.badge"
              color="primary"
              variant="subtle"
              v-bind="typeof props.badge === 'string' ? { label: props.badge } : props.badge"
              data-slot="badge"
              :class="ui.badge({ class: props.ui?.badge })"
            />
          </slot>
        </div>

        <div v-if="props.description || !!slots.description" data-slot="description" :class="ui.description({ class: props.ui?.description })">
          <slot name="description">
            {{ props.description }}
          </slot>
        </div>

        <ReusePriceTemplate v-if="props.orientation === 'vertical'" />

        <ul v-if="features?.length || !!slots.features" data-slot="features" :class="ui.features({ class: props.ui?.features })">
          <slot name="features">
            <li v-for="(feature, index) in features" :key="index" data-slot="feature" :class="ui.feature({ class: props.ui?.feature })">
              <UIcon :name="feature.icon || appConfig.ui.icons.success" data-slot="featureIcon" :class="ui.featureIcon({ class: props.ui?.featureIcon })" />

              <span data-slot="featureTitle" :class="ui.featureTitle({ class: props.ui?.featureTitle })">{{ feature.title }}</span>
            </li>
          </slot>
        </ul>
      </slot>
    </div>

    <div v-if="props.terms || !!slots.terms || (props.button || !!slots.button) || props.orientation === 'horizontal' || (props.tagline || !!slots.tagline) || !!slots.footer" data-slot="footer" :class="ui.footer({ class: props.ui?.footer })">
      <slot name="footer">
        <div v-if="props.tagline || !!slots.tagline" data-slot="tagline" :class="ui.tagline({ class: props.ui?.tagline })">
          <slot name="tagline">
            {{ props.tagline }}
          </slot>
        </div>

        <ReusePriceTemplate v-if="props.orientation === 'horizontal'" />

        <slot name="button" :ui="ui">
          <UButton v-if="props.button" v-bind="{ block: true, size: 'lg', ...props.button }" data-slot="button" :class="ui.button({ class: props.ui?.button })" @click="props.button?.onClick" />
        </slot>

        <div v-if="props.terms || !!slots.terms" data-slot="terms" :class="ui.terms({ class: props.ui?.terms })">
          <slot name="terms">
            {{ props.terms }}
          </slot>
        </div>
      </slot>
    </div>
  </Primitive>
</template>
```


## PricingPlans.vue

```vue
<script>
import theme from "#build/ui/pricing-plans";
</script>

<script setup>
import { computed } from "vue";
import { Primitive } from "reka-ui";
import { useAppConfig } from "#imports";
import { omit } from "../utils";
import { tv } from "../utils/tv";
import { useComponentProps } from "../composables/useComponentProps";
import UPricingPlan from "./PricingPlan.vue";
const _props = defineProps({
  as: { type: null, required: false },
  plans: { type: Array, required: false },
  orientation: { type: null, required: false, default: "horizontal" },
  compact: { type: Boolean, required: false, default: false },
  scale: { type: Boolean, required: false, default: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false }
});
const slots = defineSlots();
const props = useComponentProps("pricingPlans", _props);
const getProxySlots = () => omit(slots, ["default"]);
const appConfig = useAppConfig();
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.pricingPlans || {} }));
const count = computed(() => props.plans?.length || slots.default?.()?.flatMap(mapSlot).filter(Boolean)?.length || 3);
function mapSlot(slot) {
  if (typeof slot.type === "symbol") {
    if (slot.children && Array.isArray(slot.children)) {
      return slot.children.map(mapSlot);
    }
    return;
  }
  return slot;
}
</script>

<template>
  <Primitive :as="props.as" :data-orientation="props.orientation" :class="ui({ class: [props.ui?.base, props.class], compact: props.compact, scale: props.scale, orientation: props.orientation })" :style="{ '--count': count }">
    <slot>
      <UPricingPlan
        v-for="(plan, index) in props.plans"
        :key="index"
        :orientation="props.orientation === 'vertical' ? 'horizontal' : 'vertical'"
        v-bind="plan"
      >
        <template v-for="(_, name) in getProxySlots()" #[name]="slotData">
          <slot :name="name" v-bind="slotData" :plan="plan" />
        </template>
      </UPricingPlan>
    </slot>
  </Primitive>
</template>
```


## PricingTable.vue

```vue
<script>
import theme from "#build/ui/pricing-table";
</script>

<script setup>
import { computed } from "vue";
import { Primitive } from "reka-ui";
import { createReusableTemplate } from "@vueuse/core";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { useLocale } from "../composables/useLocale";
import { tv } from "../utils/tv";
import UBadge from "./Badge.vue";
import UButton from "./Button.vue";
import UIcon from "./Icon.vue";
defineOptions({ inheritAttrs: false });
const _props = defineProps({
  as: { type: null, required: false },
  caption: { type: String, required: false },
  tiers: { type: Array, required: true },
  sections: { type: Array, required: true },
  class: { type: null, required: false },
  ui: { type: Object, required: false }
});
const slots = defineSlots();
const props = useComponentProps("pricingTable", _props);
const { t } = useLocale();
const appConfig = useAppConfig();
const formatSlotName = (item) => {
  if (item.id) return item.id;
  return item.title.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
};
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.pricingTable || {} })());
const [DefineTierTemplate, ReuseTierTemplate] = createReusableTemplate({
  props: {
    tier: Object
  }
});
const [DefineFeatureTemplate, ReuseFeatureTemplate] = createReusableTemplate({
  props: {
    tier: Object,
    feature: Object
  }
});
</script>

<template>
  <DefineTierTemplate v-slot="{ tier }">
    <div data-slot="tierWrapper" :class="ui.tierWrapper({ class: props.ui?.tierWrapper })">
      <slot :name="tier.id" :tier="tier">
        <slot name="tier" :tier="tier">
          <div data-slot="tierTitleWrapper" :class="ui.tierTitleWrapper({ class: props.ui?.tierTitleWrapper })">
            <div data-slot="tierTitle" :class="ui.tierTitle({ class: props.ui?.tierTitle })">
              <slot :name="`${tier.id}-title`" :tier="tier">
                <slot name="tier-title" :tier="tier">
                  {{ tier.title }}
                </slot>
              </slot>
            </div>

            <slot :name="`${tier.id}-badge`" :tier="tier">
              <slot name="tier-badge" :tier="tier">
                <UBadge
                  v-if="tier.badge"
                  color="primary"
                  variant="subtle"
                  v-bind="typeof tier.badge === 'string' ? { label: tier.badge } : tier.badge"
                  data-slot="tierBadge"
                  :class="ui.tierBadge({ class: props.ui?.tierBadge })"
                />
              </slot>
            </slot>
          </div>

          <div data-slot="tierDescription" :class="ui.tierDescription({ class: props.ui?.tierDescription })">
            <slot :name="`${tier.id}-description`" :tier="tier">
              <slot name="tier-description" :tier="tier">
                {{ tier.description }}
              </slot>
            </slot>
          </div>

          <div data-slot="tierPriceWrapper" :class="ui.tierPriceWrapper({ class: props.ui?.tierPriceWrapper })">
            <div v-if="tier.discount && tier.price || !!slots[`${tier.id}-discount`] || !!slots['tier-discount']" data-slot="tierDiscount" :class="ui.tierDiscount({ class: props.ui?.tierDiscount })">
              <slot :name="`${tier.id}-discount`" :tier="tier">
                <slot name="tier-discount" :tier="tier">
                  {{ tier.price }}
                </slot>
              </slot>
            </div>

            <div v-if="tier.discount || tier.price || !!slots[`${tier.id}-price`] || !!slots['tier-price']" data-slot="tierPrice" :class="ui.tierPrice({ class: props.ui?.tierPrice })">
              <slot :name="`${tier.id}-price`" :tier="tier">
                <slot name="tier-price" :tier="tier">
                  {{ tier.discount || tier.price }}
                </slot>
              </slot>
            </div>

            <div v-if="tier.billingCycle || tier.billingPeriod || !!slots[`${tier.id}-billing`] || !!slots['tier-billing']" data-slot="tierBilling" :class="ui.tierBilling({ class: props.ui?.tierBilling })">
              <slot :name="`${tier.id}-billing`" :tier="tier">
                <slot name="tier-billing" :tier="tier">
                  <span data-slot="tierBillingPeriod" :class="ui.tierBillingPeriod({ class: props.ui?.tierBillingPeriod })">
                    {{ tier.billingPeriod || "\xA0" }}
                  </span>

                  <span v-if="tier.billingCycle" data-slot="tierBillingCycle" :class="ui.tierBillingCycle({ class: props.ui?.tierBillingCycle })">
                    {{ tier.billingCycle }}
                  </span>
                </slot>
              </slot>
            </div>
          </div>

          <div v-if="!!slots[`${tier.id}-button`] || !!slots['tier-button'] || tier.button" data-slot="tierButton" :class="ui.tierButton({ class: props.ui?.tierButton })">
            <slot :name="`${tier.id}-button`" :tier="tier">
              <slot name="tier-button" :tier="tier">
                <UButton v-if="tier.button" block size="lg" v-bind="tier.button" />
              </slot>
            </slot>
          </div>
        </slot>
      </slot>
    </div>
  </DefineTierTemplate>

  <DefineFeatureTemplate v-slot="{ feature, tier }">
    <template v-if="feature.tiers?.[tier.id]">
      <UIcon v-if="typeof feature.tiers[tier.id] === 'boolean'" :name="appConfig.ui.icons.success" data-slot="tierFeatureIcon" :class="ui.tierFeatureIcon({ class: props.ui?.tierFeatureIcon, active: true })" />
      <template v-else>
        {{ feature.tiers[tier.id] }}
      </template>
    </template>

    <UIcon v-else :name="appConfig.ui.icons.minus" data-slot="tierFeatureIcon" :class="ui.tierFeatureIcon({ class: props.ui?.tierFeatureIcon })" />
  </DefineFeatureTemplate>

  <Primitive :as="props.as" data-slot="root" v-bind="$attrs" :class="ui.root({ class: [props.ui?.root, props.class] })">
    <table data-slot="table" :class="ui.table({ class: props.ui?.table })">
      <caption v-if="props.caption || !!slots.caption" data-slot="caption" :class="ui.caption({ class: [props.ui?.caption] })">
        <slot name="caption">
          {{ props.caption || t("pricingTable.caption") }}
        </slot>
      </caption>

      <thead data-slot="thead" :class="ui.thead({ class: props.ui?.thead })">
        <tr data-slot="tr" :class="ui.tr({ class: props.ui?.tr })">
          <td />

          <th
            v-for="(tier, index) in props.tiers"
            :key="index"
            scope="col"
            data-slot="tier"
            :class="ui.tier({ class: props.ui?.tier, highlight: tier.highlight })"
          >
            <ReuseTierTemplate :tier="tier" />
          </th>
        </tr>
      </thead>

      <tbody data-slot="tbody" :class="ui.tbody({ class: props.ui?.tbody })">
        <template v-for="(section, sectionIndex) in props.sections" :key="sectionIndex">
          <tr data-slot="tr" :class="ui.tr({ class: props.ui?.tr, section: sectionIndex > 0 })">
            <th scope="row" data-slot="th" :class="ui.th({ class: props.ui?.th })">
              <div v-if="section.title || !!slots['section-title'] || !!slots[`section-${formatSlotName(section)}-title`]" data-slot="sectionTitle" :class="ui.sectionTitle({ class: props.ui?.sectionTitle })">
                <slot :name="`section-${formatSlotName(section)}-title`" :section="section">
                  <slot name="section-title" :section="section">
                    {{ section.title }}
                  </slot>
                </slot>
              </div>
            </th>

            <td
              v-for="(tier, index) in props.tiers"
              :key="`${sectionIndex}-tier-${index}`"
              data-slot="td"
              :class="ui.td({ class: props.ui?.td, highlight: tier.highlight })"
            />
          </tr>

          <tr v-for="(feature, featureIndex) in section.features" :key="`${sectionIndex}-feature-${featureIndex}`">
            <th scope="row" data-slot="th" :class="ui.th({ class: props.ui?.th })">
              <div data-slot="featureTitle" :class="ui.featureTitle({ class: props.ui?.featureTitle })">
                <slot :name="`feature-${formatSlotName(feature)}-title`" :feature="feature" :section="section">
                  <slot name="feature-title" :feature="feature" :section="section">
                    {{ feature.title }}
                  </slot>
                </slot>
              </div>
            </th>

            <td
              v-for="(tier, index) in props.tiers"
              :key="`${sectionIndex}-feature-${featureIndex}-tier-${index}`"
              data-slot="td"
              :class="ui.td({ class: props.ui?.td, highlight: tier.highlight })"
            >
              <div data-slot="featureValue" :class="ui.featureValue({ class: props.ui?.featureValue })">
                <slot :name="`feature-${formatSlotName(feature)}-value`" :feature="feature" :tier="tier" :section="section">
                  <slot name="feature-value" :feature="feature" :tier="tier" :section="section">
                    <ReuseFeatureTemplate :tier="tier" :feature="feature" />
                  </slot>
                </slot>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>

    <ul data-slot="list" :class="ui.list({ class: props.ui?.list })">
      <li v-for="(tier, index) in props.tiers" :key="index" data-slot="item" :class="ui.item({ class: props.ui?.item, highlight: tier.highlight })">
        <ReuseTierTemplate :tier="tier" />

        <div v-for="(section, sectionIndex) in props.sections" :key="`section-${sectionIndex}`" data-slot="section" :class="ui.section({ class: props.ui?.section })">
          <div v-if="section.title" data-slot="sectionTitle" :class="ui.sectionTitle({ class: props.ui?.sectionTitle })">
            <slot :name="`section-${formatSlotName(section)}-title`" :section="section">
              <slot name="section-title" :section="section">
                {{ section.title }}
              </slot>
            </slot>
          </div>

          <div v-for="(feature, featureIndex) in section.features" :key="`section-${sectionIndex}-feature-${featureIndex}`" data-slot="feature" :class="ui.feature({ class: props.ui?.feature })">
            <div data-slot="featureTitle" :class="ui.featureTitle({ class: props.ui?.featureTitle })">
              <slot :name="`feature-${formatSlotName(feature)}-title`" :feature="feature" :section="section">
                <slot name="feature-title" :feature="feature" :section="section">
                  {{ feature.title }}
                </slot>
              </slot>
            </div>

            <div data-slot="featureValue" :class="ui.featureValue({ class: props.ui?.featureValue })">
              <slot :name="`feature-${formatSlotName(feature)}-value`" :feature="feature" :tier="tier" :section="section">
                <slot name="feature-value" :feature="feature" :tier="tier" :section="section">
                  <ReuseFeatureTemplate :tier="tier" :feature="feature" />
                </slot>
              </slot>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </Primitive>
</template>
```


## Progress.vue

```vue
<script>
import theme from "#build/ui/progress";
</script>

<script setup>
import { computed } from "vue";
import { Primitive, ProgressRoot, ProgressIndicator } from "reka-ui";
import { useForwardProps } from "../composables/useForwardProps";
import { reactivePick } from "@vueuse/core";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { useLocale } from "../composables/useLocale";
import { tv } from "../utils/tv";
const _props = defineProps({
  as: { type: null, required: false },
  max: { type: [Number, Array], required: false },
  status: { type: Boolean, required: false },
  inverted: { type: Boolean, required: false, default: false },
  size: { type: null, required: false },
  color: { type: null, required: false },
  orientation: { type: null, required: false, default: "horizontal" },
  animation: { type: null, required: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false },
  getValueLabel: { type: Function, required: false },
  getValueText: { type: Function, required: false },
  modelValue: { type: [Number, null], required: false, default: null }
});
const emits = defineEmits(["update:modelValue", "update:max"]);
const slots = defineSlots();
const props = useComponentProps("progress", _props);
const { dir } = useLocale();
const appConfig = useAppConfig();
const rootProps = useForwardProps(reactivePick(props, "getValueLabel", "getValueText", "modelValue"), emits);
const isIndeterminate = computed(() => rootProps.value.modelValue === null);
const hasSteps = computed(() => Array.isArray(props.max));
const realMax = computed(() => {
  if (isIndeterminate.value || !props.max) {
    return void 0;
  }
  if (Array.isArray(props.max)) {
    return props.max.length - 1;
  }
  return Number(props.max);
});
const percent = computed(() => {
  if (isIndeterminate.value) {
    return void 0;
  }
  switch (true) {
    case rootProps.value.modelValue < 0:
      return 0;
    case rootProps.value.modelValue > (realMax.value ?? 100):
      return 100;
    default:
      return Math.round(rootProps.value.modelValue / (realMax.value ?? 100) * 100);
  }
});
const indicatorStyle = computed(() => {
  if (percent.value === void 0) {
    return;
  }
  if (props.orientation === "vertical") {
    return {
      transform: `translateY(${props.inverted ? "" : "-"}${100 - percent.value}%)`
    };
  } else {
    if (dir.value === "rtl") {
      return {
        transform: `translateX(${props.inverted ? "-" : ""}${100 - percent.value}%)`
      };
    } else {
      return {
        transform: `translateX(${props.inverted ? "" : "-"}${100 - percent.value}%)`
      };
    }
  }
});
const statusStyle = computed(() => ({ "--percent": `${Math.max(percent.value ?? 0, 0)}%` }));
function isActive(index) {
  return index === Number(props.modelValue);
}
function isFirst(index) {
  return index === 0;
}
function isLast(index) {
  return index === realMax.value;
}
function stepVariant(index) {
  index = Number(index);
  if (isActive(index) && !isFirst(index)) {
    return "active";
  }
  if (isFirst(index) && isActive(index)) {
    return "first";
  }
  if (isLast(index) && isActive(index)) {
    return "last";
  }
  return "other";
}
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.progress || {} })({
  animation: props.animation,
  size: props.size,
  color: props.color,
  orientation: props.orientation,
  inverted: props.inverted
}));
const themeColors = computed(() => Object.keys({ ...theme.variants?.color, ...appConfig.ui?.progress?.variants?.color }));
const customColor = computed(() => props.color && !themeColors.value.includes(props.color) ? props.color : void 0);
</script>

<template>
  <Primitive :as="props.as" :data-orientation="props.orientation" data-slot="root" :class="ui.root({ class: [props.ui?.root, props.class] })">
    <div v-if="!isIndeterminate && (props.status || !!slots.status)" data-slot="status" :class="ui.status({ class: props.ui?.status })" :style="statusStyle">
      <slot name="status" :percent="percent">
        {{ percent }}%
      </slot>
    </div>

    <ProgressRoot v-bind="rootProps" :max="realMax" data-slot="base" :class="ui.base({ class: props.ui?.base })" style="transform: translateZ(0)">
      <ProgressIndicator data-slot="indicator" :class="ui.indicator({ class: props.ui?.indicator })" :style="[indicatorStyle, customColor ? { backgroundColor: customColor } : void 0]" />
    </ProgressRoot>

    <div v-if="hasSteps" data-slot="steps" :class="ui.steps({ class: props.ui?.steps })" :style="customColor ? { color: customColor } : void 0">
      <div v-for="(step, index) in props.max" :key="index" data-slot="step" :class="ui.step({ class: props.ui?.step, step: stepVariant(index) })">
        <slot :name="`step-${index}`" :step="step">
          {{ step }}
        </slot>
      </div>
    </div>
  </Primitive>
</template>
```


## ProgressGroup.vue

```vue
<script>
import theme from "#build/ui/progress-group";
</script>

<script setup>
import { computed } from "vue";
import { Primitive, ProgressRoot, ProgressIndicator } from "reka-ui";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { tv } from "../utils/tv";
import UIcon from "./Icon.vue";
const _props = defineProps({
  as: { type: null, required: false },
  items: { type: Array, required: false },
  max: { type: Number, required: false, default: 100 },
  status: { type: Boolean, required: false },
  size: { type: null, required: false },
  color: { type: null, required: false },
  orientation: { type: null, required: false, default: "horizontal" },
  class: { type: null, required: false },
  ui: { type: Object, required: false }
});
const slots = defineSlots();
const props = useComponentProps("progressGroup", _props);
const appConfig = useAppConfig();
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.progressGroup || {} })({
  size: props.size,
  color: props.color,
  orientation: props.orientation
}));
const max = computed(() => {
  const value = Number(props.max);
  return Number.isFinite(value) && value > 0 ? value : 100;
});
const values = computed(() => (props.items ?? []).map((item) => Math.min(Math.max(Number(item.value) || 0, 0), max.value)));
const percents = computed(() => values.value.map((value) => value / max.value * 100));
const percent = computed(() => Math.min(100, Math.round(percents.value.reduce((total, value) => total + value, 0))));
const statusStyle = computed(() => ({ "--percent": `${percent.value}%` }));
const themeColors = computed(() => Object.keys({ ...theme.variants?.color, ...appConfig.ui?.progressGroup?.variants?.color }));
const itemColors = computed(() => (props.items ?? []).map((item) => item.color || props.color));
const customColors = computed(() => itemColors.value.map((color) => color && !themeColors.value.includes(color) ? color : void 0));
const hasList = computed(() => !!props.items?.length && (props.items.some((item) => item.label || item.icon || item.slot) || !!slots.item || !!slots["item-leading"] || !!slots["item-label"] || !!slots["item-trailing"]));
function segmentStyle(index) {
  const value = `${percents.value[index] ?? 0}%`;
  return props.orientation === "vertical" ? { height: value } : { width: value };
}
const valueLabels = computed(() => (props.items ?? []).map((item) => {
  const label = item.label;
  return label ? () => label : void 0;
}));
</script>

<template>
  <Primitive :as="props.as" :data-orientation="props.orientation" data-slot="root" :class="ui.root({ class: [props.ui?.root, props.class] })">
    <div v-if="props.status || !!slots.status" data-slot="status" :class="ui.status({ class: props.ui?.status })" :style="statusStyle">
      <slot name="status" :percent="percent">
        {{ percent }}%
      </slot>
    </div>

    <div data-slot="base" :class="ui.base({ class: props.ui?.base })">
      <ProgressRoot
        v-for="(item, index) in props.items"
        :key="index"
        :model-value="values[index]"
        :max="max"
        :get-value-label="valueLabels[index]"
        data-slot="segment"
        :class="ui.segment({ class: [props.ui?.segment, item.ui?.segment] })"
        :style="segmentStyle(index)"
      >
        <ProgressIndicator data-slot="indicator" :class="ui.indicator({ color: itemColors[index], class: [props.ui?.indicator, item.ui?.indicator] })" :style="customColors[index] ? { backgroundColor: customColors[index] } : void 0" />
      </ProgressRoot>
    </div>

    <ul v-if="hasList" data-slot="list" :class="ui.list({ class: props.ui?.list })">
      <li v-for="(item, index) in props.items" :key="index" data-slot="item" :class="ui.item({ class: [props.ui?.item, item.ui?.item, item.class] })">
        <slot :name="item.slot || 'item'" :item="item" :index="index" :percent="percents[index] ?? 0">
          <slot :name="item.slot ? `${item.slot}-leading` : 'item-leading'" :item="item" :index="index" :percent="percents[index] ?? 0">
            <UIcon v-if="item.icon" :name="item.icon" data-slot="itemLeadingIcon" :class="ui.itemLeadingIcon({ color: itemColors[index], class: [props.ui?.itemLeadingIcon, item.ui?.itemLeadingIcon] })" :style="customColors[index] ? { color: customColors[index] } : void 0" />
            <span v-else data-slot="itemLeadingDot" :class="ui.itemLeadingDot({ color: itemColors[index], class: [props.ui?.itemLeadingDot, item.ui?.itemLeadingDot] })" :style="customColors[index] ? { backgroundColor: customColors[index] } : void 0" />
          </slot>

          <span v-if="item.label || !!slots[item.slot ? `${item.slot}-label` : 'item-label']" data-slot="itemLabel" :class="ui.itemLabel({ class: [props.ui?.itemLabel, item.ui?.itemLabel] })">
            <slot :name="item.slot ? `${item.slot}-label` : 'item-label'" :item="item" :index="index" :percent="percents[index] ?? 0">
              {{ item.label }}
            </slot>
          </span>

          <span data-slot="itemTrailing" :class="ui.itemTrailing({ class: [props.ui?.itemTrailing, item.ui?.itemTrailing] })">
            <slot :name="item.slot ? `${item.slot}-trailing` : 'item-trailing'" :item="item" :index="index" :percent="percents[index] ?? 0">
              {{ Math.round(percents[index] ?? 0) }}%
            </slot>
          </span>
        </slot>
      </li>
    </ul>
  </Primitive>
</template>
```


## RadioGroup.vue

```vue
<script>
import theme from "#build/ui/radio-group";
</script>

<script setup>
import { computed, useId } from "vue";
import { RadioGroupRoot, RadioGroupItem as RRadioGroupItem, RadioGroupIndicator, Label } from "reka-ui";
import { reactivePick } from "@vueuse/core";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { useForwardProps } from "../composables/useForwardProps";
import { useFormField } from "../composables/useFormField";
import { get } from "../utils";
import { tv } from "../utils/tv";
import UIcon from "./Icon.vue";
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
  color: { type: null, required: false },
  highlight: { type: Boolean, required: false },
  orientation: { type: null, required: false, default: "vertical" },
  indicator: { type: null, required: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false },
  disabled: { type: Boolean, required: false },
  loop: { type: Boolean, required: false },
  name: { type: String, required: false },
  required: { type: Boolean, required: false }
});
const emits = defineEmits(["change", "update:modelValue"]);
const slots = defineSlots();
const props = useComponentProps("radioGroup", _props);
const appConfig = useAppConfig();
const rootProps = useForwardProps(reactivePick(props, "as", "loop", "required"), emits);
const { emitFormChange, emitFormInput, color: formFieldColor, name, size: formFieldSize, highlight: formFieldHighlight, id: _id, disabled: formFieldDisabled, ariaAttrs } = useFormField(_props, { bind: false });
const id = _id.value ?? useId();
const color = computed(() => formFieldColor.value ?? props.color);
const highlight = computed(() => formFieldHighlight.value ?? props.highlight);
const size = computed(() => formFieldSize.value ?? props.size);
const disabled = computed(() => formFieldDisabled.value ?? props.disabled);
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.radioGroup || {} })({
  size: size.value,
  color: color.value,
  highlight: highlight.value,
  disabled: disabled.value,
  required: props.required,
  orientation: props.orientation,
  variant: props.variant,
  indicator: props.indicator
}));
function normalizeItem(item) {
  if (item === null) {
    return {
      id: `${id}:null`,
      value: void 0,
      label: void 0
    };
  }
  if (typeof item === "string" || typeof item === "number" || typeof item === "bigint") {
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
function labelIcon(item) {
  return props.indicator === "hidden" ? item.icon : void 0;
}
function onUpdate(value) {
  const event = new Event("change", { target: { value } });
  emits("change", event);
  emitFormChange();
  emitFormInput();
}
</script>

<template>
  <RadioGroupRoot
    :id="id"
    v-bind="rootProps"
    :model-value="props.modelValue"
    :default-value="props.defaultValue"
    :orientation="props.orientation"
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

      <component :is="!props.variant || props.variant === 'list' ? 'div' : Label" v-for="item in normalizedItems" :key="item.value" data-slot="item" :class="ui.item({ class: [props.ui?.item, item.ui?.item, item.class], disabled: item.disabled || disabled })">
        <div data-slot="container" :class="ui.container({ class: [props.ui?.container, item.ui?.container] })">
          <RRadioGroupItem
            :id="item.id"
            :value="item.value"
            :disabled="item.disabled || disabled"
            data-slot="base"
            :class="ui.base({ class: [props.ui?.base, item.ui?.base], disabled: item.disabled || disabled })"
          >
            <RadioGroupIndicator data-slot="indicator" :class="ui.indicator({ class: [props.ui?.indicator, item.ui?.indicator] })" />
          </RRadioGroupItem>
        </div>

        <div v-if="labelIcon(item) || (item.label || !!slots.label) || (item.description || !!slots.description)" data-slot="wrapper" :class="ui.wrapper({ class: [props.ui?.wrapper, item.ui?.wrapper] })">
          <UIcon v-if="labelIcon(item)" :name="labelIcon(item)" data-slot="icon" :class="ui.icon({ class: [props.ui?.icon, item.ui?.icon] })" />
          <component :is="!props.variant || props.variant === 'list' ? Label : 'p'" v-if="item.label || !!slots.label" :for="item.id" data-slot="label" :class="ui.label({ class: [props.ui?.label, item.ui?.label], disabled: item.disabled || disabled })">
            <slot name="label" :item="item" :model-value="props.modelValue">
              {{ item.label }}
            </slot>
          </component>
          <p v-if="item.description || !!slots.description" data-slot="description" :class="ui.description({ class: [props.ui?.description, item.ui?.description], disabled: item.disabled || disabled })">
            <slot name="description" :item="item" :model-value="props.modelValue">
              {{ item.description }}
            </slot>
          </p>
        </div>
      </component>
    </fieldset>
  </RadioGroupRoot>
</template>
```


## ScrollArea.vue

```vue
<script>
import theme from "#build/ui/scroll-area";
</script>

<script setup>
import { computed, onUnmounted, toRef, useTemplateRef, watch } from "vue";
import { Primitive } from "reka-ui";
import { defu } from "defu";
import { useVirtualizer } from "@tanstack/vue-virtual";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { tv } from "../utils/tv";
import { useLocale } from "../composables/useLocale";
import { useScrollShadow } from "../composables/useScrollShadow";
const _props = defineProps({
  as: { type: null, required: false },
  orientation: { type: null, required: false, default: "vertical" },
  items: { type: Array, required: false },
  virtualize: { type: [Boolean, Object], required: false, default: false },
  shadow: { type: [Boolean, Object], required: false, default: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false }
});
defineSlots();
const emits = defineEmits(["scroll"]);
const props = useComponentProps("scrollArea", _props);
const { dir } = useLocale();
const appConfig = useAppConfig();
const isExternalScroll = computed(() => typeof props.virtualize === "object" && !!props.virtualize.getScrollElement);
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.scrollArea || {} })({
  orientation: props.orientation,
  externalScroll: isExternalScroll.value
}));
const rootRef = useTemplateRef("rootRef");
const scrollShadowStyle = props.shadow ? useScrollShadow(
  computed(() => rootRef.value?.$el),
  {
    orientation: () => props.orientation ?? "vertical",
    size: typeof props.shadow === "object" ? props.shadow.size : void 0
  }
).style : void 0;
const isRtl = computed(() => dir.value === "rtl");
const isHorizontal = computed(() => props.orientation === "horizontal");
const isVertical = computed(() => !isHorizontal.value);
const getScrollElement = () => (isExternalScroll.value ? virtualizerProps.value.getScrollElement?.() : rootRef.value?.$el) ?? null;
const virtualizerProps = toRef(() => {
  const options = typeof props.virtualize === "boolean" ? {} : props.virtualize;
  return defu(options, {
    estimateSize: 100,
    overscan: 12,
    gap: 0,
    paddingStart: 0,
    paddingEnd: 0,
    scrollMargin: 0
  });
});
const lanes = computed(() => {
  const value = virtualizerProps.value.lanes;
  return typeof value === "number" ? value : void 0;
});
const skipMeasurement = computed(() => {
  return typeof props.virtualize === "object" && props.virtualize.skipMeasurement === true;
});
const virtualizer = !!props.virtualize && useVirtualizer({
  ...virtualizerProps.value,
  get overscan() {
    return virtualizerProps.value.overscan;
  },
  get gap() {
    return virtualizerProps.value.gap;
  },
  get paddingStart() {
    return virtualizerProps.value.paddingStart;
  },
  get paddingEnd() {
    return virtualizerProps.value.paddingEnd;
  },
  get scrollMargin() {
    return virtualizerProps.value.scrollMargin;
  },
  get lanes() {
    return lanes.value;
  },
  get isRtl() {
    return isRtl.value;
  },
  get count() {
    return props.items?.length || 0;
  },
  getScrollElement,
  get horizontal() {
    return isHorizontal.value;
  },
  estimateSize: (index) => {
    const estimate = virtualizerProps.value.estimateSize;
    return typeof estimate === "function" ? estimate(index) : estimate;
  }
});
const virtualItems = computed(() => virtualizer ? virtualizer.value.getVirtualItems() : []);
const totalSize = computed(() => virtualizer ? virtualizer.value.getTotalSize() : 0);
const virtualViewportStyle = computed(() => ({
  position: "relative",
  inlineSize: isHorizontal.value ? `${totalSize.value}px` : "100%",
  blockSize: isVertical.value ? `${totalSize.value}px` : "100%"
}));
function getVirtualItemStyle(virtualItem) {
  const hasLanes = lanes.value !== void 0 && lanes.value > 1;
  const lane = virtualItem.lane;
  const gap = virtualizerProps.value.gap ?? 0;
  const offset = virtualItem.start - virtualizerProps.value.scrollMargin;
  const laneSize = hasLanes ? `calc((100% - ${(lanes.value - 1) * gap}px) / ${lanes.value})` : "100%";
  const lanePosition = hasLanes && lane !== void 0 ? `calc(${lane} * ((100% - ${(lanes.value - 1) * gap}px) / ${lanes.value} + ${gap}px))` : 0;
  return {
    position: "absolute",
    insetBlockStart: isHorizontal.value && hasLanes ? lanePosition : 0,
    insetInlineStart: isVertical.value && hasLanes ? lanePosition : 0,
    blockSize: isHorizontal.value ? hasLanes ? laneSize : "100%" : void 0,
    inlineSize: isVertical.value ? hasLanes ? laneSize : "100%" : void 0,
    transform: isHorizontal.value ? `translateX(${isRtl.value ? -offset : offset}px)` : `translateY(${offset}px)`
  };
}
let resizeObserver = null;
let rafId = null;
watch(
  getScrollElement,
  (el) => {
    resizeObserver?.disconnect();
    resizeObserver = null;
    if (!virtualizer || !el) return;
    resizeObserver = new ResizeObserver(() => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        virtualizer.value.measure();
      });
    });
    resizeObserver.observe(el);
  },
  { immediate: true }
);
onUnmounted(() => {
  if (rafId !== null) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
  resizeObserver?.disconnect();
});
function measureElement(el) {
  if (el && virtualizer && !skipMeasurement.value) {
    const element = el instanceof Element ? el : el.$el;
    virtualizer.value.measureElement(element);
  }
}
watch(
  () => virtualizer ? virtualizer.value.isScrolling : false,
  (isScrolling) => emits("scroll", isScrolling)
);
function getItemKey(item, index) {
  if (virtualizerProps.value.getItemKey) {
    return virtualizerProps.value.getItemKey(index);
  }
  if (item && typeof item === "object" && "id" in item) {
    return item.id;
  }
  return index;
}
defineExpose({
  get $el() {
    return rootRef.value?.$el;
  },
  virtualizer: virtualizer || void 0
});
</script>

<template>
  <Primitive
    ref="rootRef"
    :as="props.as"
    data-slot="root"
    :data-orientation="props.orientation"
    :class="ui.root({ class: [props.ui?.root, props.class] })"
    :style="scrollShadowStyle"
  >
    <template v-if="virtualizer">
      <div
        data-slot="viewport"
        :class="ui.viewport({ class: props.ui?.viewport })"
        :style="virtualViewportStyle"
      >
        <div
          v-for="virtualItem in virtualItems"
          :key="String(virtualItem.key)"
          :ref="measureElement"
          :data-index="virtualItem.index"
          data-slot="item"
          :class="ui.item({ class: props.ui?.item })"
          :style="getVirtualItemStyle(virtualItem)"
        >
          <slot
            :item="props.items?.[virtualItem.index]"
            :index="virtualItem.index"
            :virtual-item="virtualItem"
          />
        </div>
      </div>
    </template>

    <template v-else>
      <div data-slot="viewport" :class="ui.viewport({ class: props.ui?.viewport })">
        <template v-if="props.items">
          <div
            v-for="(item, index) in props.items"
            :key="getItemKey(item, index)"
            data-slot="item"
            :class="ui.item({ class: props.ui?.item })"
          >
            <slot :item="item" :index="index" />
          </div>
        </template>

        <template v-else>
          <slot :item="{}" :index="0" />
        </template>
      </div>
    </template>
  </Primitive>
</template>
```


## Select.vue

```vue
<script>
import theme from "#build/ui/select";
</script>

<script setup>
import { useTemplateRef, computed, onMounted, onScopeDispose, toRef } from "vue";
import { SelectRoot, SelectArrow, SelectTrigger, SelectPortal, SelectContent, SelectViewport, SelectValue as RSelectValue, SelectLabel, SelectGroup, SelectItem as RSelectItem, SelectItemIndicator, SelectItemText, SelectSeparator } from "reka-ui";
import { defu } from "defu";
import { reactivePick } from "@vueuse/core";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { useForwardProps } from "../composables/useForwardProps";
import { useFieldGroup, FieldGroupReset } from "../composables/useFieldGroup";
import { useComponentIcons } from "../composables/useComponentIcons";
import { useFormField } from "../composables/useFormField";
import { usePortal } from "../composables/usePortal";
import { get, getDisplayValue, isArrayOfArray, looseToNumber } from "../utils";
import { tv } from "../utils/tv";
import UIcon from "./Icon.vue";
import UAvatar from "./Avatar.vue";
import UChip from "./Chip.vue";
defineOptions({ inheritAttrs: false });
const _props = defineProps({
  id: { type: String, required: false },
  placeholder: { type: String, required: false },
  color: { type: null, required: false },
  variant: { type: null, required: false },
  size: { type: null, required: false },
  trailingIcon: { type: null, required: false },
  selectedIcon: { type: null, required: false },
  content: { type: Object, required: false },
  arrow: { type: [Boolean, Object], required: false },
  portal: { type: [Boolean, String], required: false, skipCheck: true, default: true },
  valueKey: { type: null, required: false, default: "value" },
  labelKey: { type: null, required: false, default: "label" },
  descriptionKey: { type: null, required: false, default: "description" },
  items: { type: null, required: false },
  defaultValue: { type: null, required: false },
  modelValue: { type: null, required: false },
  modelModifiers: { type: null, required: false },
  multiple: { type: Boolean, required: false },
  highlight: { type: Boolean, required: false },
  fixed: { type: Boolean, required: false },
  autofocus: { type: Boolean, required: false },
  autofocusDelay: { type: Number, required: false, default: 0 },
  class: { type: null, required: false },
  ui: { type: Object, required: false },
  open: { type: Boolean, required: false },
  defaultOpen: { type: Boolean, required: false },
  nullableValue: { type: String, required: false },
  autocomplete: { type: String, required: false },
  disabled: { type: Boolean, required: false },
  name: { type: String, required: false },
  required: { type: Boolean, required: false },
  icon: { type: null, required: false },
  avatar: { type: Object, required: false },
  leading: { type: Boolean, required: false },
  leadingIcon: { type: null, required: false },
  trailing: { type: Boolean, required: false },
  loading: { type: Boolean, required: false },
  loadingIcon: { type: null, required: false }
});
const emits = defineEmits(["change", "blur", "focus", "update:modelValue", "update:open"]);
const slots = defineSlots();
const props = useComponentProps("select", _props);
const appConfig = useAppConfig();
const rootProps = useForwardProps(reactivePick(props, "open", "defaultOpen", "disabled", "autocomplete", "required", "multiple", "nullableValue"), emits);
const portalProps = usePortal(toRef(() => props.portal));
const position = computed(() => props.content?.position ?? appConfig.ui?.select?.defaultVariants?.position ?? theme.defaultVariants?.position);
const contentProps = toRef(() => defu(props.content, { side: "bottom", sideOffset: 8, collisionPadding: 8, position: position.value }));
const arrowProps = toRef(() => defu(props.arrow, { rounded: true }));
const { emitFormChange, emitFormInput, emitFormBlur, emitFormFocus, size: formFieldSize, color: formFieldColor, id, name, highlight: formFieldHighlight, disabled: formFieldDisabled, ariaAttrs } = useFormField(_props);
const { orientation, size: fieldGroupSize } = useFieldGroup(_props);
const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(computed(() => ({
  icon: props.icon,
  leading: props.leading,
  leadingIcon: props.leadingIcon,
  trailing: props.trailing,
  trailingIcon: props.trailingIcon ?? appConfig.ui.icons.chevronDown,
  loading: props.loading,
  loadingIcon: props.loadingIcon
})));
const color = computed(() => formFieldColor.value ?? props.color);
const highlight = computed(() => formFieldHighlight.value ?? props.highlight);
const size = computed(() => fieldGroupSize.value ?? formFieldSize.value ?? props.size);
const disabled = computed(() => formFieldDisabled.value ?? props.disabled);
const isItemAligned = computed(() => position.value === "item-aligned");
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.select || {} })({
  color: color.value,
  variant: props.variant,
  size: size.value,
  loading: props.loading,
  highlight: highlight.value,
  fixed: props.fixed,
  leading: isLeading.value || !!props.avatar || !!slots.leading,
  trailing: isTrailing.value || !!slots.trailing,
  fieldGroup: orientation.value,
  position: position.value,
  multiple: props.multiple
}));
const groups = computed(
  () => props.items?.length ? isArrayOfArray(props.items) ? props.items : [props.items] : []
);
const items = computed(() => groups.value.flatMap((group) => group));
function displayValue(value) {
  if (props.multiple && Array.isArray(value)) {
    const displayedValues = value.map((item) => getDisplayValue(items.value, item, {
      labelKey: props.labelKey,
      valueKey: props.valueKey
    })).filter((v) => v != null && v !== "");
    return displayedValues.length > 0 ? displayedValues.join(", ") : void 0;
  }
  return getDisplayValue(items.value, value, {
    labelKey: props.labelKey,
    valueKey: props.valueKey
  });
}
const triggerRef = useTemplateRef("triggerRef");
function autoFocus() {
  if (props.autofocus) {
    triggerRef.value?.$el?.focus({
      focusVisible: true
    });
  }
}
let autofocusTimeoutId;
onMounted(() => {
  autofocusTimeoutId = setTimeout(() => {
    autoFocus();
  }, props.autofocusDelay);
});
onScopeDispose(() => clearTimeout(autofocusTimeoutId));
function onUpdate(value) {
  if (props.modelModifiers?.trim && (typeof value === "string" || value === null || value === void 0)) {
    value = value?.trim() ?? null;
  }
  if (props.modelModifiers?.number) {
    value = looseToNumber(value);
  }
  if (props.modelModifiers?.nullable) {
    value ??= null;
  }
  if (props.modelModifiers?.optional && !props.modelModifiers?.nullable && value !== null) {
    value ??= void 0;
  }
  const event = new Event("change", { target: { value } });
  emits("change", event);
  emitFormChange();
  emitFormInput();
}
function onUpdateOpen(value) {
  if (!value) {
    const event = new FocusEvent("blur");
    emits("blur", event);
    emitFormBlur();
  } else {
    const event = new FocusEvent("focus");
    emits("focus", event);
    emitFormFocus();
  }
}
function isSelectItem(item) {
  return typeof item === "object" && item !== null;
}
function onTriggerClick(open) {
  if (!open) {
    triggerRef.value?.$el?.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, button: 0 }));
  }
}
const viewportRef = useTemplateRef("viewportRef");
defineExpose({
  triggerRef: toRef(() => triggerRef.value?.$el),
  viewportRef: toRef(() => {
    const instance = viewportRef.value;
    return instance && typeof instance === "object" && "$el" in instance ? instance.$el : instance;
  })
});
</script>

<template>
  <SelectRoot
    v-slot="{ modelValue, open }"
    :name="name"
    v-bind="rootProps"
    :autocomplete="props.autocomplete"
    :disabled="disabled"
    :default-value="props.defaultValue"
    :model-value="modelValue"
    @update:model-value="onUpdate"
    @update:open="onUpdateOpen"
  >
    <SelectTrigger
      :id="id"
      ref="triggerRef"
      data-slot="base"
      :class="ui.base({ class: [props.ui?.base, props.class] })"
      v-bind="{ ...$attrs, ...ariaAttrs }"
      @click="onTriggerClick(open)"
    >
      <span v-if="isLeading || !!props.avatar || !!slots.leading" data-slot="leading" :class="ui.leading({ class: props.ui?.leading })">
        <slot name="leading" :model-value="modelValue" :open="open" :ui="ui">
          <UIcon v-if="isLeading && leadingIconName" :name="leadingIconName" data-slot="leadingIcon" :class="ui.leadingIcon({ class: props.ui?.leadingIcon })" />
          <UAvatar v-else-if="!!props.avatar" :size="props.ui?.itemLeadingAvatarSize || ui.itemLeadingAvatarSize()" v-bind="props.avatar" data-slot="itemLeadingAvatar" :class="ui.itemLeadingAvatar({ class: props.ui?.itemLeadingAvatar })" />
        </slot>
      </span>

      <template v-for="displayedModelValue in [displayValue(modelValue)]" :key="displayedModelValue">
        <RSelectValue
          :data-slot="displayedModelValue != null ? 'value' : 'placeholder'"
          :class="displayedModelValue != null ? ui.value({ class: props.ui?.value }) : ui.placeholder({ class: props.ui?.placeholder })"
        >
          <slot :model-value="modelValue" :open="open" :ui="ui">
            {{ displayedModelValue ?? (props.placeholder ?? "\xA0") }}
          </slot>
        </RSelectValue>
      </template>

      <span v-if="isTrailing || !!slots.trailing" data-slot="trailing" :class="ui.trailing({ class: props.ui?.trailing })">
        <slot name="trailing" :model-value="modelValue" :open="open" :ui="ui">
          <UIcon v-if="trailingIconName" :name="trailingIconName" data-slot="trailingIcon" :class="ui.trailingIcon({ class: props.ui?.trailingIcon })" />
        </slot>
      </span>
    </SelectTrigger>

    <SelectPortal v-bind="portalProps">
      <FieldGroupReset>
        <SelectContent data-slot="content" :class="ui.content({ class: props.ui?.content })" v-bind="contentProps">
          <slot name="content-top" />

          <component :is="isItemAligned ? SelectViewport : 'div'" ref="viewportRef" role="presentation" data-slot="viewport" :class="ui.viewport({ class: props.ui?.viewport })">
            <SelectGroup v-for="(group, groupIndex) in groups" :key="`group-${groupIndex}`" data-slot="group" :class="ui.group({ class: props.ui?.group })">
              <template v-for="(item, index) in group" :key="`group-${groupIndex}-${index}`">
                <SelectLabel v-if="isSelectItem(item) && item.type === 'label'" data-slot="label" :class="ui.label({ class: [props.ui?.label, item.ui?.label, item.class] })">
                  {{ get(item, props.labelKey) }}
                </SelectLabel>

                <SelectSeparator v-else-if="isSelectItem(item) && item.type === 'separator'" data-slot="separator" :class="ui.separator({ class: [props.ui?.separator, item.ui?.separator, item.class] })" />

                <RSelectItem
                  v-else
                  data-slot="item"
                  :class="ui.item({ class: [props.ui?.item, isSelectItem(item) && item.ui?.item, isSelectItem(item) && item.class] })"
                  :disabled="isSelectItem(item) && item.disabled"
                  :value="isSelectItem(item) ? get(item, props.valueKey) : item"
                  @select="isSelectItem(item) && item.onSelect?.($event)"
                >
                  <slot name="item" :item="item" :index="index" :ui="ui">
                    <slot name="item-leading" :item="item" :index="index" :ui="ui">
                      <UIcon v-if="isSelectItem(item) && item.icon" :name="item.icon" data-slot="itemLeadingIcon" :class="ui.itemLeadingIcon({ class: [props.ui?.itemLeadingIcon, item.ui?.itemLeadingIcon] })" />
                      <UAvatar v-else-if="isSelectItem(item) && item.avatar" :size="item.ui?.itemLeadingAvatarSize || props.ui?.itemLeadingAvatarSize || ui.itemLeadingAvatarSize()" v-bind="item.avatar" data-slot="itemLeadingAvatar" :class="ui.itemLeadingAvatar({ class: [props.ui?.itemLeadingAvatar, item.ui?.itemLeadingAvatar] })" />
                      <UChip
                        v-else-if="isSelectItem(item) && item.chip"
                        :size="item.ui?.itemLeadingChipSize || props.ui?.itemLeadingChipSize || ui.itemLeadingChipSize()"
                        inset
                        standalone
                        v-bind="item.chip"
                        data-slot="itemLeadingChip"
                        :class="ui.itemLeadingChip({ class: [props.ui?.itemLeadingChip, item.ui?.itemLeadingChip] })"
                      />
                    </slot>

                    <span data-slot="itemWrapper" :class="ui.itemWrapper({ class: [props.ui?.itemWrapper, isSelectItem(item) && item.ui?.itemWrapper] })">
                      <SelectItemText data-slot="itemLabel" :class="ui.itemLabel({ class: [props.ui?.itemLabel, isSelectItem(item) && item.ui?.itemLabel] })">
                        <slot name="item-label" :item="item" :index="index">
                          {{ isSelectItem(item) ? get(item, props.labelKey) : item }}
                        </slot>
                      </SelectItemText>

                      <span v-if="isSelectItem(item) && (get(item, props.descriptionKey) || !!slots['item-description'])" data-slot="itemDescription" :class="ui.itemDescription({ class: [props.ui?.itemDescription, isSelectItem(item) && item.ui?.itemDescription] })">
                        <slot name="item-description" :item="item" :index="index">
                          {{ get(item, props.descriptionKey) }}
                        </slot>
                      </span>
                    </span>

                    <span data-slot="itemTrailing" :class="ui.itemTrailing({ class: [props.ui?.itemTrailing, isSelectItem(item) && item.ui?.itemTrailing] })">
                      <slot name="item-trailing" :item="item" :index="index" :ui="ui" />

                      <SelectItemIndicator as-child>
                        <UIcon :name="props.selectedIcon || appConfig.ui.icons.check" data-slot="itemTrailingIcon" :class="ui.itemTrailingIcon({ class: [props.ui?.itemTrailingIcon, isSelectItem(item) && item.ui?.itemTrailingIcon] })" />
                      </SelectItemIndicator>
                    </span>
                  </slot>
                </RSelectItem>
              </template>
            </SelectGroup>
          </component>

          <slot name="content-bottom" />

          <SelectArrow v-if="!!props.arrow" v-bind="arrowProps" data-slot="arrow" :class="ui.arrow({ class: props.ui?.arrow })" />
        </SelectContent>
      </FieldGroupReset>
    </SelectPortal>
  </SelectRoot>
</template>
```


## SelectMenu.vue

```vue
<script>
import theme from "#build/ui/select-menu";
</script>

<script setup>
import { useTemplateRef, computed, ref, onMounted, onScopeDispose, toRef, toRaw, watch, nextTick } from "vue";
import { ComboboxRoot, ComboboxArrow, ComboboxAnchor, ComboboxInput, ComboboxTrigger, ComboboxCancel, ComboboxPortal, ComboboxContent, ComboboxEmpty, ComboboxGroup, ComboboxVirtualizer, ComboboxLabel, ComboboxSeparator, ComboboxItem, ComboboxItemIndicator, FocusScope } from "reka-ui";
import { useForwardProps } from "../composables/useForwardProps";
import { defu } from "defu";
import { reactivePick, createReusableTemplate } from "@vueuse/core";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { useFieldGroup, FieldGroupReset } from "../composables/useFieldGroup";
import { useComponentIcons } from "../composables/useComponentIcons";
import { useFormField } from "../composables/useFormField";
import { useFilter } from "../composables/useFilter";
import { useLocale } from "../composables/useLocale";
import { usePortal } from "../composables/usePortal";
import { compare, get, getDisplayValue, isArrayOfArray, looseToNumber } from "../utils";
import { getEstimateSize } from "../utils/virtualizer";
import { tv } from "../utils/tv";
import UIcon from "./Icon.vue";
import UAvatar from "./Avatar.vue";
import UButton from "./Button.vue";
import UChip from "./Chip.vue";
import UInput from "./Input.vue";
defineOptions({ inheritAttrs: false });
const _props = defineProps({
  id: { type: String, required: false },
  placeholder: { type: String, required: false },
  searchInput: { type: [Boolean, Object], required: false, default: true },
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
  portal: { type: [Boolean, String], required: false, skipCheck: true, default: true },
  virtualize: { type: [Boolean, Object], required: false, default: false },
  valueKey: { type: null, required: false },
  labelKey: { type: null, required: false, default: "label" },
  descriptionKey: { type: null, required: false, default: "description" },
  items: { type: null, required: false },
  defaultValue: { type: null, required: false },
  modelValue: { type: null, required: false },
  modelModifiers: { type: null, required: false },
  multiple: { type: Boolean, required: false },
  highlight: { type: Boolean, required: false },
  fixed: { type: Boolean, required: false },
  createItem: { type: [Boolean, String, Object], required: false },
  filterFields: { type: Array, required: false },
  ignoreFilter: { type: Boolean, required: false },
  autofocus: { type: Boolean, required: false },
  autofocusDelay: { type: Number, required: false, default: 0 },
  class: { type: null, required: false },
  ui: { type: Object, required: false },
  open: { type: Boolean, required: false },
  defaultOpen: { type: Boolean, required: false },
  disabled: { type: Boolean, required: false },
  name: { type: String, required: false },
  resetSearchTermOnBlur: { type: Boolean, required: false, default: true },
  resetSearchTermOnSelect: { type: Boolean, required: false, default: true },
  resetModelValueOnClear: { type: Boolean, required: false, default: true },
  highlightOnHover: { type: Boolean, required: false },
  by: { type: [String, Function], required: false },
  icon: { type: null, required: false },
  avatar: { type: Object, required: false },
  leading: { type: Boolean, required: false },
  leadingIcon: { type: null, required: false },
  trailing: { type: Boolean, required: false },
  loading: { type: Boolean, required: false },
  loadingIcon: { type: null, required: false }
});
const emits = defineEmits(["change", "blur", "focus", "create", "clear", "highlight", "update:modelValue", "update:open"]);
const slots = defineSlots();
const props = useComponentProps("selectMenu", _props);
const searchTerm = defineModel("searchTerm", { type: String, ...{ default: "" } });
const { t } = useLocale();
const appConfig = useAppConfig();
const { filterGroups } = useFilter();
const rootProps = useForwardProps(reactivePick(props, "modelValue", "defaultValue", "open", "defaultOpen", "required", "multiple", "resetSearchTermOnBlur", "resetSearchTermOnSelect", "resetModelValueOnClear", "highlightOnHover", "by"), emits);
const portalProps = usePortal(toRef(() => props.portal));
const contentProps = toRef(() => defu(props.content, { side: "bottom", sideOffset: 8, collisionPadding: 8, position: "popper" }));
const arrowProps = toRef(() => defu(props.arrow, { rounded: true }));
const clearProps = computed(() => typeof props.clear === "object" ? props.clear : {});
const virtualizerProps = toRef(() => {
  if (!props.virtualize) return false;
  return defu(typeof props.virtualize === "boolean" ? {} : props.virtualize, {
    estimateSize: getEstimateSize(filteredItems.value, size.value ?? "md", props.descriptionKey, !!slots["item-description"])
  });
});
const searchInputProps = toRef(() => defu(props.searchInput, { placeholder: t("selectMenu.search"), variant: "none", fixed: props.fixed }));
const { emitFormBlur, emitFormFocus, emitFormInput, emitFormChange, size: formFieldSize, color: formFieldColor, id, name, highlight: formFieldHighlight, disabled: formFieldDisabled, ariaAttrs } = useFormField(_props);
const { orientation, size: fieldGroupSize } = useFieldGroup(_props);
const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(computed(() => ({
  icon: props.icon,
  leading: props.leading,
  leadingIcon: props.leadingIcon,
  trailing: props.trailing,
  trailingIcon: props.trailingIcon ?? appConfig.ui.icons.chevronDown,
  loading: props.loading,
  loadingIcon: props.loadingIcon
})));
const color = computed(() => formFieldColor.value ?? props.color);
const highlight = computed(() => formFieldHighlight.value ?? props.highlight);
const size = computed(() => fieldGroupSize.value ?? formFieldSize.value ?? props.size);
const disabled = computed(() => formFieldDisabled.value ?? props.disabled);
const [DefineCreateItemTemplate, ReuseCreateItemTemplate] = createReusableTemplate();
const [DefineItemTemplate, ReuseItemTemplate] = createReusableTemplate({
  props: {
    item: {
      type: [Object, String, Number, Boolean],
      required: true
    },
    index: {
      type: Number,
      required: false
    }
  }
});
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.selectMenu || {} })({
  color: color.value,
  variant: props.variant,
  size: size.value,
  loading: props.loading,
  highlight: highlight.value,
  fixed: props.fixed,
  leading: isLeading.value || !!props.avatar || !!slots.leading,
  trailing: isTrailing.value || !!slots.trailing,
  fieldGroup: orientation.value,
  virtualize: !!props.virtualize,
  multiple: props.multiple
}));
function displayValue(value) {
  if (props.multiple && Array.isArray(value)) {
    const displayedValues = value.map((item) => getDisplayValue(items.value, item, {
      labelKey: props.labelKey,
      valueKey: props.valueKey,
      by: props.by
    })).filter((v) => v != null && v !== "");
    return displayedValues.length > 0 ? displayedValues.join(", ") : void 0;
  }
  return getDisplayValue(items.value, value, {
    labelKey: props.labelKey,
    valueKey: props.valueKey,
    by: props.by
  });
}
const groups = computed(
  () => props.items?.length ? isArrayOfArray(props.items) ? props.items : [props.items] : []
);
const items = computed(() => groups.value.flatMap((group) => group));
const filteredGroups = computed(() => {
  if (props.ignoreFilter || !searchTerm.value) {
    return groups.value;
  }
  const fields = Array.isArray(props.filterFields) ? props.filterFields : [props.labelKey];
  return filterGroups(groups.value, searchTerm.value, {
    fields,
    isStructural: (item) => isSelectItem(item) && !!item.type && ["label", "separator"].includes(item.type)
  });
});
const filteredItems = computed(() => filteredGroups.value.flatMap((group) => group));
const createItem = computed(() => {
  if (!props.createItem || !searchTerm.value) {
    return false;
  }
  const newItem = props.valueKey ? { [props.valueKey]: searchTerm.value } : searchTerm.value;
  if (typeof props.createItem === "object" && props.createItem.when === "always" || props.createItem === "always") {
    return !filteredItems.value.find((item) => compare(item, newItem, props.by ?? props.valueKey));
  }
  return !filteredItems.value.length;
});
const createItemPosition = computed(() => typeof props.createItem === "object" ? props.createItem.position : "bottom");
const triggerRef = useTemplateRef("triggerRef");
function autoFocus() {
  if (props.autofocus) {
    triggerRef.value?.$el?.focus({
      focusVisible: true
    });
  }
}
let autofocusTimeoutId;
onMounted(() => {
  autofocusTimeoutId = setTimeout(() => {
    autoFocus();
  }, props.autofocusDelay);
});
onScopeDispose(() => clearTimeout(autofocusTimeoutId));
function onUpdate(value) {
  if (toRaw(props.modelValue) === value) {
    return;
  }
  if (props.modelModifiers?.trim && (typeof value === "string" || value === null || value === void 0)) {
    value = value?.trim() ?? null;
  }
  if (props.modelModifiers?.number) {
    value = looseToNumber(value);
  }
  if (props.modelModifiers?.nullable) {
    value ??= null;
  }
  if (props.modelModifiers?.optional && !props.modelModifiers?.nullable && value !== null) {
    value ??= void 0;
  }
  const event = new Event("change", { target: { value } });
  emits("change", event);
  emitFormChange();
  emitFormInput();
  if (props.resetSearchTermOnSelect) {
    searchTerm.value = "";
  }
}
const isOpen = ref(false);
let timeoutId;
onScopeDispose(() => clearTimeout(timeoutId));
function onUpdateOpen(value) {
  isOpen.value = value;
  if (!value) {
    const event = new FocusEvent("blur");
    emits("blur", event);
    emitFormBlur();
    if (props.resetSearchTermOnBlur) {
      const STATE_ANIMATION_DELAY_MS = 100;
      timeoutId = setTimeout(() => {
        searchTerm.value = "";
      }, STATE_ANIMATION_DELAY_MS);
    }
  } else {
    const event = new FocusEvent("focus");
    emits("focus", event);
    emitFormFocus();
    clearTimeout(timeoutId);
  }
}
function onCreate(e) {
  e.preventDefault();
  e.stopPropagation();
  emits("create", searchTerm.value);
}
function onSelect(e, item) {
  if (!isSelectItem(item)) {
    return;
  }
  if (item.disabled) {
    e.preventDefault();
    return;
  }
  item.onSelect?.(e);
}
function isSelectItem(item) {
  return typeof item === "object" && item !== null;
}
function isModelValueEmpty(modelValue) {
  if (props.multiple && Array.isArray(modelValue)) {
    return modelValue.length === 0;
  }
  return modelValue === void 0 || modelValue === null || modelValue === "";
}
function onClear() {
  emits("clear");
}
function onMountAutoFocus(event) {
  if (searchInputProps.value.autofocus === false) {
    event.preventDefault();
  }
}
const viewportRef = useTemplateRef("viewportRef");
const comboboxRootRef = useTemplateRef("comboboxRootRef");
watch(() => props.items, async () => {
  if (!isOpen.value || !props.createItem) {
    return;
  }
  await nextTick();
  comboboxRootRef.value?.highlightFirstItem?.();
}, { flush: "post" });
defineExpose({
  triggerRef: toRef(() => triggerRef.value?.$el),
  viewportRef: toRef(() => viewportRef.value)
});
</script>

<template>
  <DefineCreateItemTemplate>
    <ComboboxItem
      data-slot="item"
      :class="ui.item({ class: props.ui?.item })"
      :value="searchTerm"
      @select="onCreate"
    >
      <span data-slot="itemLabel" :class="ui.itemLabel({ class: props.ui?.itemLabel })">
        <slot name="create-item-label" :item="searchTerm">
          {{ t("selectMenu.create", { label: searchTerm }) }}
        </slot>
      </span>
    </ComboboxItem>
  </DefineCreateItemTemplate>

  <DefineItemTemplate v-slot="{ item, index }">
    <ComboboxLabel v-if="isSelectItem(item) && item.type === 'label'" data-slot="label" :class="ui.label({ class: [props.ui?.label, item.ui?.label, item.class] })">
      {{ get(item, props.labelKey) }}
    </ComboboxLabel>

    <ComboboxSeparator v-else-if="isSelectItem(item) && item.type === 'separator'" data-slot="separator" :class="ui.separator({ class: [props.ui?.separator, item.ui?.separator, item.class] })" />

    <ComboboxItem
      v-else
      data-slot="item"
      :class="ui.item({ class: [props.ui?.item, isSelectItem(item) && item.ui?.item, isSelectItem(item) && item.class] })"
      :disabled="isSelectItem(item) && item.disabled"
      :value="props.valueKey && isSelectItem(item) ? get(item, props.valueKey) : item"
      @select="onSelect($event, item)"
    >
      <slot name="item" :item="item" :index="index" :ui="ui">
        <slot name="item-leading" :item="item" :index="index" :ui="ui">
          <UIcon v-if="isSelectItem(item) && item.icon" :name="item.icon" data-slot="itemLeadingIcon" :class="ui.itemLeadingIcon({ class: [props.ui?.itemLeadingIcon, item.ui?.itemLeadingIcon] })" />
          <UAvatar v-else-if="isSelectItem(item) && item.avatar" :size="item.ui?.itemLeadingAvatarSize || props.ui?.itemLeadingAvatarSize || ui.itemLeadingAvatarSize()" v-bind="item.avatar" data-slot="itemLeadingAvatar" :class="ui.itemLeadingAvatar({ class: [props.ui?.itemLeadingAvatar, item.ui?.itemLeadingAvatar] })" />
          <UChip
            v-else-if="isSelectItem(item) && item.chip"
            :size="item.ui?.itemLeadingChipSize || props.ui?.itemLeadingChipSize || ui.itemLeadingChipSize()"
            inset
            standalone
            v-bind="item.chip"
            data-slot="itemLeadingChip"
            :class="ui.itemLeadingChip({ class: [props.ui?.itemLeadingChip, item.ui?.itemLeadingChip] })"
          />
        </slot>

        <span data-slot="itemWrapper" :class="ui.itemWrapper({ class: [props.ui?.itemWrapper, isSelectItem(item) && item.ui?.itemWrapper] })">
          <span data-slot="itemLabel" :class="ui.itemLabel({ class: [props.ui?.itemLabel, isSelectItem(item) && item.ui?.itemLabel] })">
            <slot name="item-label" :item="item" :index="index">
              {{ isSelectItem(item) ? get(item, props.labelKey) : item }}
            </slot>
          </span>

          <span v-if="isSelectItem(item) && (get(item, props.descriptionKey) || !!slots['item-description'])" data-slot="itemDescription" :class="ui.itemDescription({ class: [props.ui?.itemDescription, isSelectItem(item) && item.ui?.itemDescription] })">
            <slot name="item-description" :item="item" :index="index">
              {{ get(item, props.descriptionKey) }}
            </slot>
          </span>
        </span>

        <span data-slot="itemTrailing" :class="ui.itemTrailing({ class: [props.ui?.itemTrailing, isSelectItem(item) && item.ui?.itemTrailing] })">
          <slot name="item-trailing" :item="item" :index="index" :ui="ui" />

          <ComboboxItemIndicator as-child>
            <UIcon :name="props.selectedIcon || appConfig.ui.icons.check" data-slot="itemTrailingIcon" :class="ui.itemTrailingIcon({ class: [props.ui?.itemTrailingIcon, isSelectItem(item) && item.ui?.itemTrailingIcon] })" />
          </ComboboxItemIndicator>
        </span>
      </slot>
    </ComboboxItem>
  </DefineItemTemplate>

  <ComboboxRoot
    ref="comboboxRootRef"
    v-slot="{ modelValue, open }"
    v-bind="rootProps"
    ignore-filter
    as-child
    :name="name"
    :disabled="disabled"
    @update:model-value="onUpdate"
    @update:open="onUpdateOpen"
  >
    <ComboboxAnchor as-child>
      <ComboboxTrigger
        :id="id"
        ref="triggerRef"
        data-slot="base"
        :class="ui.base({ class: [props.ui?.base, props.class] })"
        tabindex="0"
        v-bind="{ ...$attrs, ...ariaAttrs }"
      >
        <span v-if="isLeading || !!props.avatar || !!slots.leading" data-slot="leading" :class="ui.leading({ class: props.ui?.leading })">
          <slot name="leading" :model-value="modelValue" :open="open" :ui="ui">
            <UIcon v-if="isLeading && leadingIconName" :name="leadingIconName" data-slot="leadingIcon" :class="ui.leadingIcon({ class: props.ui?.leadingIcon })" />
            <UAvatar v-else-if="!!props.avatar" :size="props.ui?.itemLeadingAvatarSize || ui.itemLeadingAvatarSize()" v-bind="props.avatar" data-slot="itemLeadingAvatar" :class="ui.itemLeadingAvatar({ class: props.ui?.itemLeadingAvatar })" />
          </slot>
        </span>

        <slot :model-value="modelValue" :open="open" :ui="ui">
          <template v-for="displayedModelValue in [displayValue(modelValue)]" :key="displayedModelValue">
            <span v-if="displayedModelValue !== void 0 && displayedModelValue !== null" data-slot="value" :class="ui.value({ class: props.ui?.value })">
              {{ displayedModelValue }}
            </span>
            <span v-else data-slot="placeholder" :class="ui.placeholder({ class: props.ui?.placeholder })">
              {{ props.placeholder ?? "\xA0" }}
            </span>
          </template>
        </slot>

        <span v-if="isTrailing || !!slots.trailing || !!props.clear" data-slot="trailing" :class="ui.trailing({ class: props.ui?.trailing })">
          <slot name="trailing" :model-value="modelValue" :open="open" :ui="ui">
            <ComboboxCancel v-if="!!props.clear && !isModelValueEmpty(modelValue)" as-child>
              <UButton
                as="span"
                :icon="props.clearIcon || appConfig.ui.icons.close"
                :size="size"
                variant="link"
                color="neutral"
                tabindex="-1"
                v-bind="clearProps"
                data-slot="trailingClear"
                :class="ui.trailingClear({ class: props.ui?.trailingClear })"
                @click.stop="onClear"
              />
            </ComboboxCancel>

            <UIcon v-else-if="trailingIconName" :name="trailingIconName" data-slot="trailingIcon" :class="ui.trailingIcon({ class: props.ui?.trailingIcon })" />
          </slot>
        </span>
      </ComboboxTrigger>
    </ComboboxAnchor>

    <ComboboxPortal v-bind="portalProps">
      <FieldGroupReset>
        <ComboboxContent data-slot="content" :class="ui.content({ class: props.ui?.content })" v-bind="contentProps">
          <FocusScope trapped data-slot="focusScope" :class="ui.focusScope({ class: props.ui?.focusScope })" @mount-auto-focus="onMountAutoFocus">
            <slot name="content-top" />

            <ComboboxInput v-if="!!props.searchInput" v-model="searchTerm" :display-value="() => searchTerm" as-child>
              <UInput
                autofocus
                autocomplete="off"
                :size="size"
                v-bind="searchInputProps"
                :model-modifiers="{
  trim: props.modelModifiers?.trim
}"
                data-slot="input"
                :class="ui.input({ class: props.ui?.input })"
                @change.stop
              />
            </ComboboxInput>

            <ComboboxEmpty data-slot="empty" :class="ui.empty({ class: props.ui?.empty })">
              <slot name="empty" :search-term="searchTerm">
                {{ searchTerm ? t("selectMenu.noMatch", { searchTerm }) : t("selectMenu.noData") }}
              </slot>
            </ComboboxEmpty>

            <div ref="viewportRef" role="presentation" data-slot="viewport" :class="ui.viewport({ class: props.ui?.viewport })">
              <template v-if="!!props.virtualize">
                <ReuseCreateItemTemplate v-if="createItem && createItemPosition === 'top'" />

                <ComboboxVirtualizer
                  v-slot="{ option: item, virtualItem }"
                  :options="filteredItems"
                  :text-content="(item2) => isSelectItem(item2) ? get(item2, props.labelKey) : String(item2)"
                  v-bind="virtualizerProps"
                >
                  <ReuseItemTemplate :item="item" :index="virtualItem.index" />
                </ComboboxVirtualizer>

                <ReuseCreateItemTemplate v-if="createItem && createItemPosition === 'bottom'" />
              </template>

              <template v-else>
                <ComboboxGroup v-if="createItem && createItemPosition === 'top'" data-slot="group" :class="ui.group({ class: props.ui?.group })">
                  <ReuseCreateItemTemplate />
                </ComboboxGroup>

                <ComboboxGroup v-for="(group, groupIndex) in filteredGroups" :key="`group-${groupIndex}`" data-slot="group" :class="ui.group({ class: props.ui?.group })">
                  <ReuseItemTemplate v-for="(item, index) in group" :key="`group-${groupIndex}-${index}`" :item="item" :index="index" />
                </ComboboxGroup>

                <ComboboxGroup v-if="createItem && createItemPosition === 'bottom'" data-slot="group" :class="ui.group({ class: props.ui?.group })">
                  <ReuseCreateItemTemplate />
                </ComboboxGroup>
              </template>
            </div>

            <slot name="content-bottom" />
          </FocusScope>

          <ComboboxArrow v-if="!!props.arrow" v-bind="arrowProps" data-slot="arrow" :class="ui.arrow({ class: props.ui?.arrow })" />
        </ComboboxContent>
      </FieldGroupReset>
    </ComboboxPortal>
  </ComboboxRoot>
</template>
```


## Separator.vue

```vue
<script>
import theme from "#build/ui/separator";
</script>

<script setup>
import { computed } from "vue";
import { Separator } from "reka-ui";
import { reactivePick, createReusableTemplate } from "@vueuse/core";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { useForwardProps } from "../composables/useForwardProps";
import { tv } from "../utils/tv";
import UIcon from "./Icon.vue";
import UAvatar from "./Avatar.vue";
defineOptions({ inheritAttrs: false });
const _props = defineProps({
  as: { type: null, required: false },
  label: { type: String, required: false },
  icon: { type: null, required: false },
  avatar: { type: Object, required: false },
  color: { type: null, required: false },
  size: { type: null, required: false },
  type: { type: null, required: false },
  orientation: { type: null, required: false, default: "horizontal" },
  position: { type: null, required: false, default: "center" },
  class: { type: null, required: false },
  ui: { type: null, required: false },
  decorative: { type: Boolean, required: false }
});
const slots = defineSlots();
const props = useComponentProps("separator", _props);
const appConfig = useAppConfig();
const rootProps = useForwardProps(reactivePick(props, "as", "decorative", "orientation"));
const [DefineContainer, ReuseContainer] = createReusableTemplate();
const hasContent = computed(() => !!(props.label || props.icon || props.avatar || slots.default));
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.separator || {} })({
  color: props.color,
  orientation: props.orientation,
  size: props.size,
  position: props.position,
  type: props.type
}));
</script>

<template>
  <DefineContainer>
    <div data-slot="container" :class="ui.container({ class: props.ui?.container })">
      <slot :ui="ui">
        <span v-if="props.label" data-slot="label" :class="ui.label({ class: props.ui?.label })">{{ props.label }}</span>
        <UIcon v-else-if="props.icon" :name="props.icon" data-slot="icon" :class="ui.icon({ class: props.ui?.icon })" />
        <UAvatar v-else-if="props.avatar" :size="props.ui?.avatarSize || ui.avatarSize()" v-bind="props.avatar" data-slot="avatar" :class="ui.avatar({ class: props.ui?.avatar })" />
      </slot>
    </div>
  </DefineContainer>

  <Separator data-slot="root" v-bind="{ ...rootProps, ...$attrs }" :class="ui.root({ class: [props.ui?.root, props.class] })">
    <ReuseContainer v-if="hasContent && props.position === 'start'" />

    <div data-slot="border" :class="ui.border({ class: props.ui?.border })" />

    <template v-if="hasContent && props.position === 'center'">
      <ReuseContainer />

      <div data-slot="border" :class="ui.border({ class: props.ui?.border })" />
    </template>

    <ReuseContainer v-if="hasContent && props.position === 'end'" />
  </Separator>
</template>
```


## Sidebar.vue

```vue
<script>
import theme from "#build/ui/sidebar";
</script>

<script setup>
import { computed, onMounted, ref, toRef, watch } from "vue";
import { Primitive } from "reka-ui";
import { defu } from "defu";
import { createReusableTemplate, useMediaQuery } from "@vueuse/core";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { useLocale } from "../composables/useLocale";
import { tv } from "../utils/tv";
import UButton from "./Button.vue";
import USlideover from "./Slideover.vue";
import UModal from "./Modal.vue";
import UDrawer from "./Drawer.vue";
defineOptions({ inheritAttrs: false });
const _props = defineProps({
  as: { type: null, required: false, default: "aside" },
  variant: { type: null, required: false, default: "sidebar" },
  collapsible: { type: null, required: false, default: "offcanvas" },
  side: { type: null, required: false, default: "left" },
  title: { type: String, required: false },
  description: { type: String, required: false },
  close: { type: [Boolean, Object], required: false, default: false },
  closeIcon: { type: null, required: false },
  rail: { type: Boolean, required: false, default: false },
  transition: { type: Boolean, required: false, default: true },
  mode: { type: null, required: false, default: "slideover" },
  menu: { type: null, required: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false }
});
const slots = defineSlots();
const props = useComponentProps("sidebar", _props);
const [DefineInnerTemplate, ReuseInnerTemplate] = createReusableTemplate();
const [DefineContentTemplate, ReuseContentTemplate] = createReusableTemplate();
const mediaQuery = useMediaQuery("(max-width: 1023px)");
const isMounted = ref(false);
onMounted(() => {
  isMounted.value = true;
});
const isMobile = computed(() => isMounted.value && mediaQuery.value);
const modelOpen = defineModel("open", { type: Boolean, ...{ default: true } });
const openMobile = ref(false);
const desktopOpen = ref(modelOpen.value);
const open = computed({
  get: () => isMobile.value ? openMobile.value : modelOpen.value,
  set: (value) => {
    if (isMobile.value) {
      openMobile.value = value;
    } else {
      modelOpen.value = value;
    }
  }
});
watch(isMobile, (mobile) => {
  if (mobile) {
    desktopOpen.value = modelOpen.value;
    modelOpen.value = false;
  } else {
    modelOpen.value = desktopOpen.value;
  }
}, { immediate: true });
watch(modelOpen, (value) => {
  if (isMobile.value) {
    openMobile.value = value;
  }
});
watch(openMobile, (value) => {
  if (isMobile.value) {
    modelOpen.value = value;
  }
});
const { t } = useLocale();
const appConfig = useAppConfig();
const state = computed(() => open.value ? "expanded" : "collapsed");
const canClose = computed(() => props.close && props.collapsible !== "none" || isMobile.value);
function closeSidebar() {
  open.value = false;
}
const hasHeader = computed(() => !!slots.header || props.title || !!slots.title || props.description || !!slots.description || !!slots.actions || canClose.value || !!slots.close);
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.sidebar || {} })({
  side: props.side,
  variant: props.variant,
  collapsible: props.collapsible,
  transition: props.transition
}));
const Menu = computed(() => ({
  slideover: USlideover,
  modal: UModal,
  drawer: UDrawer
})[props.mode]);
const menuProps = toRef(() => defu(props.menu, {
  title: props.title,
  description: props.description,
  close: props.close,
  closeIcon: props.closeIcon
}, props.mode === "modal" ? {} : props.mode === "slideover" ? { side: props.side, inset: props.variant === "inset" } : {}));
</script>

<template>
  <DefineContentTemplate>
    <div v-if="hasHeader" data-slot="header" :class="ui.header({ class: props.ui?.header })">
      <slot name="header" :state="state" :open="open" :close="closeSidebar">
        <div v-if="props.title || !!slots.title || props.description || !!slots.description" data-slot="wrapper" :class="ui.wrapper({ class: props.ui?.wrapper })">
          <p v-if="props.title || !!slots.title" data-slot="title" :class="ui.title({ class: props.ui?.title })">
            <slot name="title" :state="state">
              {{ props.title }}
            </slot>
          </p>

          <p v-if="props.description || !!slots.description" data-slot="description" :class="ui.description({ class: props.ui?.description })">
            <slot name="description" :state="state">
              {{ props.description }}
            </slot>
          </p>
        </div>

        <div v-if="!!slots.actions || canClose" data-slot="actions" :class="ui.actions({ class: props.ui?.actions })">
          <slot name="actions" :state="state" />

          <slot name="close" :state="state" :ui="ui">
            <UButton
              v-if="canClose"
              :icon="props.closeIcon || appConfig.ui.icons.close"
              color="neutral"
              variant="ghost"
              :aria-label="t('sidebar.close')"
              v-bind="typeof props.close === 'object' ? props.close : {}"
              data-slot="close"
              :class="ui.close({ class: props.ui?.close })"
              @click="closeSidebar"
            />
          </slot>
        </div>
      </slot>
    </div>

    <div data-slot="body" :class="ui.body({ class: props.ui?.body })">
      <slot :state="state" :open="open" :close="closeSidebar" />
    </div>

    <div v-if="!!slots.footer" data-slot="footer" :class="ui.footer({ class: props.ui?.footer })">
      <slot name="footer" :state="state" :open="open" :close="closeSidebar" />
    </div>
  </DefineContentTemplate>

  <DefineInnerTemplate>
    <div data-slot="inner" :class="ui.inner({ class: props.ui?.inner })">
      <ReuseContentTemplate />
    </div>
  </DefineInnerTemplate>

  <!-- Non-collapsible: simple inline sidebar -->
  <Primitive
    v-if="props.collapsible === 'none'"
    :as="props.as"
    data-slot="root"
    v-bind="$attrs"
    :data-variant="props.variant"
    :class="ui.root({ class: [props.ui?.root, props.class] })"
  >
    <ReuseInnerTemplate />
  </Primitive>

  <!-- Collapsible: fixed sidebar with gap spacer + mobile menu -->
  <template v-else>
    <Primitive
      :as="props.as"
      data-slot="root"
      v-bind="$attrs"
      :data-state="state"
      :data-collapsible="state === 'collapsed' ? props.collapsible : void 0"
      :data-variant="props.variant"
      :data-side="props.side"
      :class="ui.root({ class: [props.ui?.root, props.class] })"
    >
      <!-- Gap spacer: reserves layout space for the fixed sidebar -->
      <div
        data-slot="gap"
        :data-state="state"
        :class="ui.gap({ class: props.ui?.gap })"
      />

      <!-- Fixed container: the actual visible sidebar -->
      <div
        data-slot="container"
        :data-state="state"
        :class="ui.container({ class: props.ui?.container })"
      >
        <ReuseInnerTemplate />

        <slot v-if="props.rail" name="rail" :state="state" :ui="ui">
          <button
            data-slot="rail"
            :data-state="state"
            :aria-label="t('sidebar.toggle')"
            :tabindex="-1"
            :class="ui.rail({ class: props.ui?.rail })"
            @click="open = !open"
          />
        </slot>
      </div>
    </Primitive>

    <!-- Mobile menu -->
    <Menu
      v-if="isMobile"
      v-model:open="openMobile"
      v-bind="menuProps"
    >
      <template #content="contentData">
        <slot name="content" v-bind="contentData" :close="closeSidebar">
          <ReuseContentTemplate />
        </slot>
      </template>
    </Menu>
  </template>
</template>
```


## Skeleton.vue

```vue
<script>
import theme from "#build/ui/skeleton";
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
const props = useComponentProps("skeleton", _props);
const appConfig = useAppConfig();
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.skeleton || {} }));
</script>

<template>
  <Primitive
    :as="props.as"
    aria-busy="true"
    aria-label="loading"
    aria-live="polite"
    role="alert"
    :class="ui({ class: [props.ui?.base, props.class] })"
  >
    <slot />
  </Primitive>
</template>
```


## Slideover.vue

```vue
<script>
import theme from "#build/ui/slideover";
</script>

<script setup>
import { computed, toRef } from "vue";
import { DialogRoot, DialogTrigger, DialogPortal, DialogOverlay, DialogContent, DialogTitle, DialogDescription, DialogClose, VisuallyHidden } from "reka-ui";
import { useForwardProps } from "../composables/useForwardProps";
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
  title: { type: String, required: false },
  description: { type: String, required: false },
  content: { type: Object, required: false },
  overlay: { type: Boolean, required: false, default: true },
  transition: { type: Boolean, required: false, default: true },
  side: { type: null, required: false, default: "right" },
  inset: { type: Boolean, required: false },
  portal: { type: [Boolean, String], required: false, skipCheck: true, default: true },
  close: { type: [Boolean, Object], required: false, default: true },
  closeIcon: { type: null, required: false },
  dismissible: { type: Boolean, required: false, default: true },
  class: { type: null, required: false },
  ui: { type: Object, required: false },
  open: { type: Boolean, required: false },
  defaultOpen: { type: Boolean, required: false },
  modal: { type: Boolean, required: false, default: true },
  unmountOnHide: { type: Boolean, required: false }
});
const emits = defineEmits(["leave", "after:leave", "enter", "after:enter", "close:prevent", "update:open"]);
const slots = defineSlots();
const props = useComponentProps("slideover", _props);
const { t } = useLocale();
const appConfig = useAppConfig();
const rootProps = useForwardProps(reactivePick(props, "open", "defaultOpen", "modal", "unmountOnHide"), emits);
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
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.slideover || {} })({
  transition: props.transition,
  side: props.side,
  inset: props.inset
}));
</script>

<template>
  <DialogRoot v-slot="{ open, close }" v-bind="rootProps">
    <DialogTrigger v-if="!!slots.default" as-child :class="props.class">
      <slot :open="open" />
    </DialogTrigger>

    <DialogPortal v-bind="portalProps" :force-mount="portalProps.disabled && props.unmountOnHide === false || void 0">
      <FieldGroupReset>
        <DialogOverlay v-if="props.overlay" data-slot="overlay" :class="ui.overlay({ class: props.ui?.overlay })" />

        <DialogContent
          :data-side="props.side"
          data-slot="content"
          :class="ui.content({ class: [!slots.default && props.class, props.ui?.content] })"
          v-bind="contentProps"
          @enter="emits('enter')"
          @after-enter="emits('after:enter')"
          @leave="emits('leave')"
          @after-leave="emits('after:leave')"
          v-on="contentEvents"
        >
          <VisuallyHidden v-if="!props.title && !slots.title || !props.description && !slots.description || !!slots.content">
            <DialogTitle v-if="!props.title && !slots.title" />
            <DialogTitle v-else-if="!!slots.content">
              <slot name="title">
                {{ props.title }}
              </slot>
            </DialogTitle>

            <DialogDescription v-if="!props.description && !slots.description" />
            <DialogDescription v-else-if="!!slots.content">
              <slot name="description">
                {{ props.description }}
              </slot>
            </DialogDescription>
          </VisuallyHidden>

          <slot name="content" :close="close">
            <div v-if="!!slots.header || (props.title || !!slots.title) || (props.description || !!slots.description) || (props.close || !!slots.close)" data-slot="header" :class="ui.header({ class: props.ui?.header })">
              <slot name="header" :close="close">
                <div v-if="props.title || !!slots.title || props.description || !!slots.description" data-slot="wrapper" :class="ui.wrapper({ class: props.ui?.wrapper })">
                  <DialogTitle v-if="props.title || !!slots.title" data-slot="title" :class="ui.title({ class: props.ui?.title })">
                    <slot name="title">
                      {{ props.title }}
                    </slot>
                  </DialogTitle>

                  <DialogDescription v-if="props.description || !!slots.description" data-slot="description" :class="ui.description({ class: props.ui?.description })">
                    <slot name="description">
                      {{ props.description }}
                    </slot>
                  </DialogDescription>
                </div>

                <slot name="actions" />

                <DialogClose v-if="props.close || !!slots.close" as-child>
                  <slot name="close" :ui="ui">
                    <UButton
                      v-if="props.close"
                      :icon="props.closeIcon || appConfig.ui.icons.close"
                      color="neutral"
                      variant="ghost"
                      :aria-label="t('slideover.close')"
                      v-bind="typeof props.close === 'object' ? props.close : {}"
                      data-slot="close"
                      :class="ui.close({ class: props.ui?.close })"
                    />
                  </slot>
                </DialogClose>
              </slot>
            </div>

            <div data-slot="body" :class="ui.body({ class: props.ui?.body })">
              <slot name="body" :close="close" />
            </div>

            <div v-if="!!slots.footer" data-slot="footer" :class="ui.footer({ class: props.ui?.footer })">
              <slot name="footer" :close="close" />
            </div>
          </slot>
        </DialogContent>
      </FieldGroupReset>
    </DialogPortal>
  </DialogRoot>
</template>
```


## Slider.vue

```vue
<script>
import theme from "#build/ui/slider";
</script>

<script setup>
import { computed } from "vue";
import { SliderRoot, SliderRange, SliderTrack, SliderThumb } from "reka-ui";
import { useForwardProps } from "../composables/useForwardProps";
import { reactivePick } from "@vueuse/core";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { useFormField } from "../composables/useFormField";
import { pick, omit } from "../utils";
import { tv } from "../utils/tv";
import UTooltip from "./Tooltip.vue";
const _props = defineProps({
  as: { type: null, required: false },
  size: { type: null, required: false },
  color: { type: null, required: false },
  orientation: { type: null, required: false, default: "horizontal" },
  tooltip: { type: [Boolean, Object], required: false },
  defaultValue: { type: [Number, Array], required: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false },
  name: { type: String, required: false },
  disabled: { type: Boolean, required: false },
  inverted: { type: Boolean, required: false },
  min: { type: Number, required: false, default: 0 },
  max: { type: Number, required: false, default: 100 },
  step: { type: Number, required: false, default: 1 },
  minStepsBetweenThumbs: { type: Number, required: false }
});
const emits = defineEmits(["change"]);
defineOptions({ inheritAttrs: false });
const props = useComponentProps("slider", _props);
const modelValue = defineModel({ type: null });
const appConfig = useAppConfig();
const rootProps = useForwardProps(reactivePick(props, "as", "orientation", "min", "max", "step", "minStepsBetweenThumbs", "inverted"));
const { id, emitFormChange, emitFormInput, size: formFieldSize, color: formFieldColor, name, disabled: formFieldDisabled, ariaAttrs } = useFormField(_props);
const color = computed(() => formFieldColor.value ?? props.color);
const size = computed(() => formFieldSize.value ?? props.size);
const disabled = computed(() => formFieldDisabled.value ?? props.disabled);
const defaultSliderValue = computed(() => {
  if (typeof props.defaultValue === "number") {
    return [props.defaultValue];
  }
  return props.defaultValue;
});
const sliderValue = computed({
  get() {
    if (typeof modelValue.value === "number") {
      return [modelValue.value];
    }
    return modelValue.value ?? defaultSliderValue.value;
  },
  set(value) {
    modelValue.value = value?.length !== 1 ? value : value[0];
  }
});
const thumbs = computed(() => sliderValue.value?.length ?? 1);
const thumbAttrs = ["aria-label", "aria-labelledby", "aria-describedby", "aria-valuetext", "aria-invalid", "aria-errormessage"];
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.slider || {} })({
  disabled: disabled.value,
  size: size.value,
  color: color.value,
  orientation: props.orientation
}));
function onChange(value) {
  const event = new Event("change", { target: { value } });
  emits("change", event);
  emitFormChange();
}
</script>

<template>
  <SliderRoot
    :id="id"
    v-model="sliderValue"
    data-slot="root"
    :role="thumbs > 1 && ($attrs['aria-label'] || $attrs['aria-labelledby']) ? 'group' : void 0"
    v-bind="{ ...rootProps, ...thumbs > 1 ? $attrs : omit($attrs, thumbAttrs) }"
    :name="name"
    :disabled="disabled"
    :class="ui.root({ class: [props.ui?.root, props.class] })"
    :default-value="defaultSliderValue"
    @update:model-value="emitFormInput()"
    @value-commit="onChange"
  >
    <SliderTrack data-slot="track" :class="ui.track({ class: props.ui?.track })">
      <SliderRange data-slot="range" :class="ui.range({ class: props.ui?.range })" />
    </SliderTrack>

    <template v-for="thumb in thumbs" :key="thumb">
      <UTooltip
        v-if="!!props.tooltip"
        :text="thumbs > 1 ? String(sliderValue?.[thumb - 1]) : String(sliderValue)"
        disable-closing-trigger
        v-bind="typeof props.tooltip === 'object' ? props.tooltip : {}"
      >
        <SliderThumb data-slot="thumb" :class="ui.thumb({ class: props.ui?.thumb })" v-bind="{ ...thumbs === 1 ? pick($attrs, thumbAttrs) : {}, ...ariaAttrs }" :aria-label="thumbs > 1 || $attrs['aria-labelledby'] ? void 0 : $attrs['aria-label'] ?? 'Thumb'" />
      </UTooltip>
      <SliderThumb v-else data-slot="thumb" :class="ui.thumb({ class: props.ui?.thumb })" v-bind="{ ...thumbs === 1 ? pick($attrs, thumbAttrs) : {}, ...ariaAttrs }" :aria-label="thumbs > 1 || $attrs['aria-labelledby'] ? void 0 : $attrs['aria-label'] ?? 'Thumb'" />
    </template>
  </SliderRoot>
</template>
```


## Splitter.vue

```vue
<script>
import theme from "#build/ui/splitter";
</script>

<script setup>
import { ref, computed, onBeforeUpdate } from "vue";
import { SplitterGroup, SplitterPanel, SplitterResizeHandle } from "reka-ui";
import { reactivePick } from "@vueuse/core";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { useForwardProps } from "../composables/useForwardProps";
import { tv } from "../utils/tv";
const _props = defineProps({
  as: { type: null, required: false },
  id: { type: String, required: false },
  orientation: { type: null, required: false, default: "horizontal" },
  items: { type: Array, required: false },
  disabled: { type: Boolean, required: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false },
  autoSaveId: { type: [String, null], required: false },
  keyboardResizeBy: { type: [Number, null], required: false },
  storage: { type: Object, required: false },
  hitAreaMargins: { type: Object, required: false }
});
const emits = defineEmits(["layout", "collapse", "expand", "resize", "dragging"]);
defineSlots();
const props = useComponentProps("splitter", _props);
const appConfig = useAppConfig();
const rootProps = useForwardProps(reactivePick(props, "as", "id", "autoSaveId", "keyboardResizeBy", "storage"));
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.splitter || {} })({
  orientation: props.orientation
}));
const panelsRef = ref([]);
onBeforeUpdate(() => {
  panelsRef.value.length = 0;
});
function getPanelId(item, index) {
  return item.id ?? (props.id ? `${props.id}-panel-${index}` : void 0);
}
function getHandleId(index) {
  return props.id ? `${props.id}-handle-${index}` : void 0;
}
function setPanelRef(index, el) {
  if (el) {
    panelsRef.value[index] = el;
  }
}
defineExpose({
  panelsRef
});
</script>

<template>
  <SplitterGroup v-bind="rootProps" :direction="props.orientation" data-slot="root" :class="ui.root({ class: [props.ui?.root, props.class] })" @layout="emits('layout', $event)">
    <template v-for="(item, index) in props.items" :key="item.id ?? index">
      <SplitterPanel
        :id="getPanelId(item, index)"
        :ref="(el) => setPanelRef(index, el)"
        v-slot="{ isCollapsed, collapse, expand, resize }"
        :default-size="item.defaultSize"
        :min-size="item.minSize"
        :max-size="item.maxSize"
        :collapsible="item.collapsible"
        :collapsed-size="item.collapsedSize"
        :size-unit="item.sizeUnit"
        :order="item.order"
        data-slot="panel"
        :class="ui.panel({ class: [props.ui?.panel, item.ui?.panel, item.class] })"
        @collapse="emits('collapse', index)"
        @expand="emits('expand', index)"
        @resize="(size, prevSize) => emits('resize', index, size, prevSize)"
      >
        <slot
          :name="item.slot || `panel-${index}`"
          :item="item"
          :index="index"
          :collapsed="isCollapsed"
          :collapse="collapse"
          :expand="expand"
          :resize="resize"
          :ui="ui"
        />
      </SplitterPanel>

      <SplitterResizeHandle
        v-if="index < props.items.length - 1"
        :id="getHandleId(index)"
        :disabled="props.disabled"
        :hit-area-margins="props.hitAreaMargins"
        data-slot="handle"
        :class="ui.handle({ class: props.ui?.handle })"
        @dragging="(dragging) => emits('dragging', index, dragging)"
      >
        <slot name="resize-handle" :index="index" :ui="ui" />
      </SplitterResizeHandle>
    </template>
  </SplitterGroup>
</template>
```


## Stepper.vue

```vue
<script>
import theme from "#build/ui/stepper";
</script>

<script setup>
import { computed } from "vue";
import { StepperRoot, StepperItem, StepperTrigger, StepperIndicator, StepperSeparator, StepperTitle, StepperDescription } from "reka-ui";
import { reactivePick } from "@vueuse/core";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { useForwardProps } from "../composables/useForwardProps";
import { tv } from "../utils/tv";
import { get } from "../utils";
import UIcon from "./Icon.vue";
const _props = defineProps({
  as: { type: null, required: false },
  items: { type: Array, required: true },
  size: { type: null, required: false },
  color: { type: null, required: false },
  orientation: { type: null, required: false, default: "horizontal" },
  valueKey: { type: null, required: false, default: "value" },
  defaultValue: { type: [String, Number], required: false },
  disabled: { type: Boolean, required: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false },
  linear: { type: Boolean, required: false, default: true }
});
const emits = defineEmits(["next", "prev"]);
const slots = defineSlots();
const props = useComponentProps("stepper", _props);
const modelValue = defineModel({ type: [String, Number] });
const appConfig = useAppConfig();
const rootProps = useForwardProps(reactivePick(props, "as", "linear"));
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.stepper || {} })({
  orientation: props.orientation,
  size: props.size,
  color: props.color
}));
const currentStepIndex = computed({
  get() {
    const value = modelValue.value ?? props.defaultValue;
    return (typeof value === "string" ? props.items.findIndex((item) => get(item, props.valueKey) === value) : value) ?? 0;
  },
  set(value) {
    modelValue.value = get(props.items?.[value], props.valueKey) ?? value;
  }
});
const currentStep = computed(() => props.items?.[currentStepIndex.value]);
const hasNext = computed(() => currentStepIndex.value < props.items?.length - 1);
const hasPrev = computed(() => currentStepIndex.value > 0);
defineExpose({
  next() {
    if (hasNext.value) {
      currentStepIndex.value += 1;
      emits("next", currentStep.value);
    }
  },
  prev() {
    if (hasPrev.value) {
      currentStepIndex.value -= 1;
      emits("prev", currentStep.value);
    }
  },
  hasNext,
  hasPrev
});
</script>

<template>
  <StepperRoot v-bind="rootProps" v-model="currentStepIndex" :orientation="props.orientation" data-slot="root" :class="ui.root({ class: [props.ui?.root, props.class] })">
    <div data-slot="header" :class="ui.header({ class: props.ui?.header })">
      <StepperItem
        v-for="(item, count) in props.items"
        :key="count"
        :step="count"
        :disabled="item.disabled || props.disabled"
        data-slot="item"
        :class="ui.item({ class: [props.ui?.item, item.ui?.item, item.class] })"
      >
        <div data-slot="container" :class="ui.container({ class: [props.ui?.container, item.ui?.container] })">
          <StepperTrigger data-slot="trigger" :class="ui.trigger({ class: [props.ui?.trigger, item.ui?.trigger] })">
            <StepperIndicator data-slot="indicator" :class="ui.indicator({ class: [props.ui?.indicator, item.ui?.indicator] })">
              <slot name="indicator" :item="item" :ui="ui">
                <UIcon v-if="item.icon" :name="item.icon" data-slot="icon" :class="ui.icon({ class: [props.ui?.icon, item.ui?.icon] })" />
                <template v-else>
                  {{ count + 1 }}
                </template>
              </slot>
            </StepperIndicator>
          </StepperTrigger>

          <StepperSeparator
            v-if="count < props.items.length - 1"
            data-slot="separator"
            :class="ui.separator({ class: [props.ui?.separator, item.ui?.separator] })"
          />
        </div>

        <div data-slot="wrapper" :class="ui.wrapper({ class: [props.ui?.wrapper, item.ui?.wrapper] })">
          <slot :name="item.slot ? `${item.slot}-wrapper` : 'wrapper'" :item="item">
            <StepperTitle v-if="item.title || !!slots[item.slot ? `${item.slot}-title` : 'title']" as="div" data-slot="title" :class="ui.title({ class: [props.ui?.title, item.ui?.title] })">
              <slot :name="item.slot ? `${item.slot}-title` : 'title'" :item="item">
                {{ item.title }}
              </slot>
            </StepperTitle>
            <StepperDescription v-if="item.description || !!slots[item.slot ? `${item.slot}-description` : 'description']" as="div" data-slot="description" :class="ui.description({ class: [props.ui?.description, item.ui?.description] })">
              <slot :name="item.slot ? `${item.slot}-description` : 'description'" :item="item">
                {{ item.description }}
              </slot>
            </StepperDescription>
          </slot>
        </div>
      </StepperItem>
    </div>

    <div v-if="currentStep?.content || !!slots.content || currentStep?.slot && !!slots[currentStep.slot]" data-slot="content" :class="ui.content({ class: props.ui?.content })">
      <slot
        :name="currentStep?.slot || 'content'"
        :item="currentStep"
      >
        {{ currentStep?.content }}
      </slot>
    </div>
  </StepperRoot>
</template>
```


## Switch.vue

```vue
<script>
import theme from "#build/ui/switch";
</script>

<script setup>
import { computed, useAttrs, useId } from "vue";
import { Primitive, SwitchRoot, SwitchThumb, Label } from "reka-ui";
import { useForwardProps } from "../composables/useForwardProps";
import { reactivePick } from "@vueuse/core";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { useFormField } from "../composables/useFormField";
import { tv } from "../utils/tv";
import UIcon from "./Icon.vue";
defineOptions({ inheritAttrs: false });
const _props = defineProps({
  as: { type: null, required: false },
  color: { type: null, required: false },
  size: { type: null, required: false },
  highlight: { type: Boolean, required: false },
  loading: { type: Boolean, required: false },
  loadingIcon: { type: null, required: false },
  checkedIcon: { type: null, required: false },
  uncheckedIcon: { type: null, required: false },
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
  modelValue: { type: null, required: false },
  trueValue: { type: null, required: false },
  falseValue: { type: null, required: false }
});
const slots = defineSlots();
const emits = defineEmits(["change", "update:modelValue"]);
const props = useComponentProps("switch", _props);
const appConfig = useAppConfig();
const rootProps = useForwardProps(reactivePick(props, "required", "value", "defaultValue", "modelValue", "trueValue", "falseValue"), emits);
const { id: _id, emitFormChange, emitFormInput, size: formFieldSize, color: formFieldColor, highlight: formFieldHighlight, name, disabled: formFieldDisabled, ariaAttrs } = useFormField(_props);
const id = _id.value ?? useId();
const color = computed(() => formFieldColor.value ?? props.color);
const highlight = computed(() => formFieldHighlight.value ?? props.highlight);
const size = computed(() => formFieldSize.value ?? props.size);
const disabled = computed(() => formFieldDisabled.value ?? props.disabled);
const attrs = useAttrs();
const forwardedAttrs = computed(() => {
  const { "data-state": _, ...rest } = attrs;
  return rest;
});
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.switch || {} })({
  size: size.value,
  color: color.value,
  highlight: highlight.value,
  required: props.required,
  loading: props.loading,
  disabled: disabled.value || props.loading
}));
function onUpdate(value) {
  const event = new Event("change", { target: { value } });
  emits("change", event);
  emitFormChange();
  emitFormInput();
}
</script>

<template>
  <Primitive :as="props.as" :data-slot="$attrs['data-slot'] ?? 'root'" :class="ui.root({ class: [props.ui?.root, props.class] })">
    <div data-slot="container" :class="ui.container({ class: props.ui?.container })">
      <SwitchRoot
        :id="id"
        v-bind="{ ...rootProps, ...forwardedAttrs, ...ariaAttrs }"
        :name="name"
        :disabled="disabled || props.loading"
        data-slot="base"
        :class="ui.base({ class: props.ui?.base })"
        @update:model-value="onUpdate"
      >
        <SwitchThumb data-slot="thumb" :class="ui.thumb({ class: props.ui?.thumb })">
          <UIcon v-if="props.loading" :name="props.loadingIcon || appConfig.ui.icons.loading" data-slot="icon" :class="ui.icon({ class: props.ui?.icon, checked: true, unchecked: true })" />
          <template v-else>
            <UIcon v-if="props.checkedIcon" :name="props.checkedIcon" data-slot="icon" :class="ui.icon({ class: props.ui?.icon, checked: true })" />
            <UIcon v-if="props.uncheckedIcon" :name="props.uncheckedIcon" data-slot="icon" :class="ui.icon({ class: props.ui?.icon, unchecked: true })" />
          </template>
        </SwitchThumb>
      </SwitchRoot>
    </div>
    <div v-if="props.label || !!slots.label || (props.description || !!slots.description)" data-slot="wrapper" :class="ui.wrapper({ class: props.ui?.wrapper })">
      <Label v-if="props.label || !!slots.label" :for="id" data-slot="label" :class="ui.label({ class: props.ui?.label })">
        <slot name="label" :label="props.label">
          {{ props.label }}
        </slot>
      </Label>
      <p v-if="props.description || !!slots.description" data-slot="description" :class="ui.description({ class: props.ui?.description })">
        <slot name="description" :description="props.description">
          {{ props.description }}
        </slot>
      </p>
    </div>
  </Primitive>
</template>
```


## Table.vue

```vue
<script>
import theme from "#build/ui/table";
</script>

<script setup>
import { computed, useTemplateRef, watch, toRef } from "vue";
import { Primitive } from "reka-ui";
import { upperFirst } from "scule";
import { defu } from "defu";
import { FlexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, getExpandedRowModel, useVueTable } from "@tanstack/vue-table";
import { useVirtualizer } from "@tanstack/vue-virtual";
import { reactivePick, createReusableTemplate, createRef } from "@vueuse/core";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { useForwardProps } from "../composables/useForwardProps";
import { useLocale } from "../composables/useLocale";
import { tv } from "../utils/tv";
defineOptions({ inheritAttrs: false });
const _props = defineProps({
  as: { type: null, required: false },
  data: { type: Array, required: false },
  columns: { type: Array, required: false },
  caption: { type: String, required: false },
  meta: { type: Object, required: false },
  virtualize: { type: [Boolean, Object], required: false, default: false },
  empty: { type: String, required: false },
  sticky: { type: [Boolean, String], required: false },
  loading: { type: Boolean, required: false },
  loadingColor: { type: null, required: false },
  loadingAnimation: { type: null, required: false },
  watchOptions: { type: Object, required: false, default: () => ({
    deep: true
  }) },
  globalFilterOptions: { type: Object, required: false },
  columnFiltersOptions: { type: Object, required: false },
  columnPinningOptions: { type: Object, required: false },
  columnSizingOptions: { type: Object, required: false },
  visibilityOptions: { type: Object, required: false },
  sortingOptions: { type: Object, required: false },
  groupingOptions: { type: Object, required: false },
  expandedOptions: { type: Object, required: false },
  rowSelectionOptions: { type: Object, required: false },
  rowPinningOptions: { type: Object, required: false },
  paginationOptions: { type: Object, required: false },
  facetedOptions: { type: Object, required: false },
  onSelect: { type: Function, required: false },
  onHover: { type: Function, required: false },
  onContextmenu: { type: [Function, Array], required: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false },
  state: { type: Object, required: false },
  onStateChange: { type: Function, required: false },
  renderFallbackValue: { type: null, required: false },
  _features: { type: Array, required: false },
  autoResetAll: { type: Boolean, required: false },
  debugAll: { type: Boolean, required: false },
  debugCells: { type: Boolean, required: false },
  debugColumns: { type: Boolean, required: false },
  debugHeaders: { type: Boolean, required: false },
  debugRows: { type: Boolean, required: false },
  debugTable: { type: Boolean, required: false },
  defaultColumn: { type: Object, required: false },
  getRowId: { type: Function, required: false },
  getSubRows: { type: Function, required: false },
  initialState: { type: Object, required: false },
  mergeOptions: { type: Function, required: false }
});
const slots = defineSlots();
const props = useComponentProps("table", _props);
const { t } = useLocale();
const appConfig = useAppConfig();
const data = createRef(props.data ?? [], props.watchOptions?.deep !== false);
const meta = computed(() => props.meta ?? {});
const columns = computed(() => processColumns(props.columns ?? Object.keys(data.value[0] ?? {}).map((accessorKey) => ({ accessorKey, header: upperFirst(accessorKey) }))));
function processColumns(columns2) {
  return columns2.map((column) => {
    const col = { ...column };
    if ("columns" in col && col.columns) {
      col.columns = processColumns(col.columns);
    }
    if (!col.cell) {
      col.cell = ({ getValue }) => {
        const value = getValue();
        if (value === "" || value === null || value === void 0) {
          return "\xA0";
        }
        return String(value);
      };
    }
    return col;
  });
}
const isExternalScroll = computed(() => typeof props.virtualize === "object" && !!props.virtualize.getScrollElement);
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.table || {} })({
  sticky: props.sticky,
  loading: props.loading,
  loadingColor: props.loadingColor,
  loadingAnimation: props.loadingAnimation,
  externalScroll: isExternalScroll.value
}));
const [DefineTableTemplate, ReuseTableTemplate] = createReusableTemplate();
const [DefineRowTemplate, ReuseRowTemplate] = createReusableTemplate({
  props: {
    row: {
      type: Object,
      required: true
    },
    style: {
      type: Object,
      required: false
    }
  }
});
const hasFooter = computed(() => {
  function hasFooterRecursive(columns2) {
    for (const column of columns2) {
      if ("footer" in column) {
        return true;
      }
      if ("columns" in column && hasFooterRecursive(column.columns)) {
        return true;
      }
    }
    return false;
  }
  return hasFooterRecursive(columns.value);
});
const globalFilterState = defineModel("globalFilter", { type: String });
const columnFiltersState = defineModel("columnFilters", { type: Array });
const columnOrderState = defineModel("columnOrder", { type: Array });
const columnVisibilityState = defineModel("columnVisibility", { type: Object });
const columnPinningState = defineModel("columnPinning", { type: Object });
const columnSizingState = defineModel("columnSizing", { type: Object });
const columnSizingInfoState = defineModel("columnSizingInfo", { type: Object });
const rowSelectionState = defineModel("rowSelection", { type: Object });
const rowPinningState = defineModel("rowPinning", { type: Object });
const sortingState = defineModel("sorting", { type: Array });
const groupingState = defineModel("grouping", { type: Array });
const expandedState = defineModel("expanded", { type: [Boolean, Object] });
const paginationState = defineModel("pagination", { type: Object });
const rootRef = useTemplateRef("rootRef");
const tableRef = useTemplateRef("tableRef");
const tableProps = useForwardProps(reactivePick(props, "_features", "autoResetAll", "debugAll", "debugCells", "debugColumns", "debugHeaders", "debugRows", "debugTable", "defaultColumn", "getRowId", "getSubRows", "initialState", "mergeOptions", "renderFallbackValue"));
const tableApi = useVueTable({
  ...tableProps.value,
  get data() {
    return data.value;
  },
  get columns() {
    return columns.value;
  },
  meta: meta.value,
  getCoreRowModel: getCoreRowModel(),
  ...props.globalFilterOptions || {},
  ...globalFilterState.value !== void 0 && { onGlobalFilterChange: (updaterOrValue) => valueUpdater(updaterOrValue, globalFilterState) },
  ...props.columnFiltersOptions || {},
  getFilteredRowModel: getFilteredRowModel(),
  ...columnFiltersState.value !== void 0 && { onColumnFiltersChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnFiltersState) },
  ...columnOrderState.value !== void 0 && { onColumnOrderChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnOrderState) },
  ...props.visibilityOptions || {},
  ...columnVisibilityState.value !== void 0 && { onColumnVisibilityChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnVisibilityState) },
  ...props.columnPinningOptions || {},
  ...columnPinningState.value !== void 0 && { onColumnPinningChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnPinningState) },
  ...props.columnSizingOptions || {},
  ...columnSizingState.value !== void 0 && { onColumnSizingChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnSizingState) },
  ...columnSizingInfoState.value !== void 0 && { onColumnSizingInfoChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnSizingInfoState) },
  ...props.rowSelectionOptions || {},
  ...rowSelectionState.value !== void 0 && { onRowSelectionChange: (updaterOrValue) => valueUpdater(updaterOrValue, rowSelectionState) },
  ...props.rowPinningOptions || {},
  ...rowPinningState.value !== void 0 && { onRowPinningChange: (updaterOrValue) => valueUpdater(updaterOrValue, rowPinningState) },
  ...props.sortingOptions || {},
  getSortedRowModel: getSortedRowModel(),
  ...sortingState.value !== void 0 && { onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sortingState) },
  ...props.groupingOptions || {},
  ...groupingState.value !== void 0 && { onGroupingChange: (updaterOrValue) => valueUpdater(updaterOrValue, groupingState) },
  ...props.expandedOptions || {},
  getExpandedRowModel: getExpandedRowModel(),
  ...expandedState.value !== void 0 && { onExpandedChange: (updaterOrValue) => valueUpdater(updaterOrValue, expandedState) },
  ...props.paginationOptions || {},
  ...paginationState.value !== void 0 && { onPaginationChange: (updaterOrValue) => valueUpdater(updaterOrValue, paginationState) },
  ...props.facetedOptions || {},
  state: {
    get globalFilter() {
      return globalFilterState.value;
    },
    get columnFilters() {
      return columnFiltersState.value;
    },
    get columnOrder() {
      return columnOrderState.value;
    },
    get columnVisibility() {
      return columnVisibilityState.value;
    },
    get columnPinning() {
      return columnPinningState.value;
    },
    get expanded() {
      return expandedState.value;
    },
    get rowSelection() {
      return rowSelectionState.value;
    },
    get sorting() {
      return sortingState.value;
    },
    get grouping() {
      return groupingState.value;
    },
    get rowPinning() {
      return rowPinningState.value;
    },
    get columnSizing() {
      return columnSizingState.value;
    },
    get columnSizingInfo() {
      return columnSizingInfoState.value;
    },
    get pagination() {
      return paginationState.value;
    }
  }
});
const rows = computed(() => tableApi.getRowModel().rows);
const topRows = computed(() => props.virtualize ? [] : tableApi.getTopRows());
const bottomRows = computed(() => props.virtualize ? [] : tableApi.getBottomRows());
const centerRows = computed(() => topRows.value.length || bottomRows.value.length ? tableApi.getCenterRows() : rows.value);
const virtualizerProps = toRef(() => defu(typeof props.virtualize === "boolean" ? {} : props.virtualize, {
  estimateSize: 65,
  overscan: 12
}));
const getScrollElement = () => (isExternalScroll.value ? virtualizerProps.value.getScrollElement?.() : rootRef.value?.$el) ?? null;
const scrollMargin = computed(() => virtualizerProps.value.scrollMargin ?? 0);
const virtualizer = !!props.virtualize && useVirtualizer({
  ...virtualizerProps.value,
  get count() {
    return centerRows.value.length;
  },
  get scrollMargin() {
    return scrollMargin.value;
  },
  getScrollElement,
  estimateSize: (index) => {
    const estimate = virtualizerProps.value.estimateSize;
    return typeof estimate === "function" ? estimate(index) : estimate;
  }
});
const virtualItems = computed(() => virtualizer ? virtualizer.value.getVirtualItems() : []);
const virtualPaddingTop = computed(() => (virtualItems.value[0]?.start ?? 0) - scrollMargin.value);
const virtualPaddingBottom = computed(() => {
  if (!virtualizer || !virtualItems.value.length) return 0;
  return virtualizer.value.getTotalSize() - (virtualItems.value[virtualItems.value.length - 1]?.end ?? 0) + scrollMargin.value;
});
function valueUpdater(updaterOrValue, ref) {
  ref.value = typeof updaterOrValue === "function" ? updaterOrValue(ref.value) : updaterOrValue;
}
function onRowSelect(e, row) {
  if (!props.onSelect) {
    return;
  }
  const target = e.target;
  const isInteractive = target.closest("button") || target.closest("a");
  if (isInteractive) {
    return;
  }
  e.preventDefault();
  e.stopPropagation();
  props.onSelect(e, row);
}
function onRowHover(e, row) {
  if (!props.onHover) {
    return;
  }
  props.onHover(e, row);
}
function onRowContextmenu(e, row) {
  if (!props.onContextmenu) {
    return;
  }
  if (Array.isArray(props.onContextmenu)) {
    props.onContextmenu.forEach((fn) => fn(e, row));
  } else {
    props.onContextmenu(e, row);
  }
}
function resolveValue(prop, arg) {
  if (typeof prop === "function") {
    return prop(arg);
  }
  return prop;
}
function getColumnStyles(column) {
  const styles = {};
  const pinned = column.getIsPinned();
  if (pinned === "left") {
    styles.left = `${column.getStart("left")}px`;
  } else if (pinned === "right") {
    styles.right = `${column.getAfter("right")}px`;
  }
  return styles;
}
watch(() => props.data, () => {
  data.value = props.data ? [...props.data] : [];
}, props.watchOptions);
defineExpose({
  get $el() {
    return rootRef.value?.$el;
  },
  tableRef,
  tableApi
});
</script>

<template>
  <DefineRowTemplate v-slot="{ row, style }">
    <tr
      :data-selected="row.getIsSelected()"
      :data-selectable="!!props.onSelect || !!props.onHover || !!props.onContextmenu"
      :data-expanded="row.getIsExpanded()"
      :data-pinned="row.getIsPinned() || void 0"
      :role="props.onSelect ? 'button' : void 0"
      :tabindex="props.onSelect ? 0 : void 0"
      data-slot="tr"
      :class="ui.tr({
  class: [
    props.ui?.tr,
    resolveValue(tableApi.options.meta?.class?.tr, row)
  ]
})"
      :style="[resolveValue(tableApi.options.meta?.style?.tr, row), style]"
      @click="onRowSelect($event, row)"
      @pointerenter="onRowHover($event, row)"
      @pointerleave="onRowHover($event, null)"
      @contextmenu="onRowContextmenu($event, row)"
    >
      <td
        v-for="cell in row.getVisibleCells()"
        :key="cell.id"
        :data-pinned="cell.column.getIsPinned()"
        :colspan="resolveValue(cell.column.columnDef.meta?.colspan?.td, cell)"
        :rowspan="resolveValue(cell.column.columnDef.meta?.rowspan?.td, cell)"
        data-slot="td"
        :class="ui.td({
  class: [
    props.ui?.td,
    resolveValue(cell.column.columnDef.meta?.class?.td, cell)
  ],
  pinned: !!cell.column.getIsPinned()
})"
        :style="[
  getColumnStyles(cell.column),
  resolveValue(cell.column.columnDef.meta?.style?.td, cell)
]"
      >
        <slot :name="`${cell.column.id}-cell`" v-bind="cell.getContext()">
          <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
        </slot>
      </td>
    </tr>

    <tr v-if="row.getIsExpanded()" data-slot="tr" :class="ui.tr({ class: [props.ui?.tr] })">
      <td :colspan="row.getVisibleCells().length" data-slot="td" :class="ui.td({ class: [props.ui?.td] })">
        <slot name="expanded" :row="row" />
      </td>
    </tr>
  </DefineRowTemplate>

  <DefineTableTemplate>
    <table ref="tableRef" data-slot="base" :class="ui.base({ class: [props.ui?.base] })">
      <caption v-if="props.caption || !!slots.caption" data-slot="caption" :class="ui.caption({ class: [props.ui?.caption] })">
        <slot name="caption">
          {{ props.caption }}
        </slot>
      </caption>

      <thead data-slot="thead" :class="ui.thead({ class: [props.ui?.thead] })">
        <tr v-for="headerGroup in tableApi.getHeaderGroups()" :key="headerGroup.id" data-slot="tr" :class="ui.tr({ class: [props.ui?.tr] })">
          <th
            v-for="header in headerGroup.headers"
            :key="header.id"
            :data-pinned="header.column.getIsPinned()"
            :scope="header.colSpan > 1 ? 'colgroup' : 'col'"
            :colspan="header.colSpan > 1 ? header.colSpan : void 0"
            :rowspan="header.rowSpan > 1 ? header.rowSpan : void 0"
            data-slot="th"
            :class="ui.th({
  class: [
    props.ui?.th,
    resolveValue(header.column.columnDef.meta?.class?.th, header)
  ],
  pinned: !!header.column.getIsPinned()
})"
            :style="[
  getColumnStyles(header.column),
  resolveValue(header.column.columnDef.meta?.style?.th, header)
]"
          >
            <slot :name="`${header.id}-header`" v-bind="header.getContext()">
              <FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.header" :props="header.getContext()" />
            </slot>
          </th>
        </tr>

        <tr data-slot="separator" :class="ui.separator({ class: [props.ui?.separator] })" />
      </thead>

      <tbody data-slot="tbody" :class="ui.tbody({ class: [props.ui?.tbody] })">
        <slot name="body-top" />

        <template v-if="rows.length">
          <ReuseRowTemplate v-for="row in topRows" :key="row.id" :row="row" />

          <template v-if="virtualizer">
            <tr v-if="virtualPaddingTop > 0" :style="{ height: `${virtualPaddingTop}px` }" aria-hidden="true">
              <td :colspan="tableApi.getVisibleLeafColumns().length" />
            </tr>
            <template v-for="virtualRow in virtualItems" :key="centerRows[virtualRow.index]?.id ?? `virtual-${virtualRow.index}`">
              <ReuseRowTemplate
                v-if="centerRows[virtualRow.index]"
                :row="centerRows[virtualRow.index]"
                :style="{ height: `${virtualRow.size}px` }"
              />
            </template>
            <tr v-if="virtualPaddingBottom > 0" :style="{ height: `${virtualPaddingBottom}px` }" aria-hidden="true">
              <td :colspan="tableApi.getVisibleLeafColumns().length" />
            </tr>
          </template>

          <template v-else>
            <ReuseRowTemplate v-for="row in centerRows" :key="row.id" :row="row" />
          </template>

          <ReuseRowTemplate v-for="row in bottomRows" :key="row.id" :row="row" />
        </template>

        <tr v-else-if="props.loading && !!slots['loading']">
          <td :colspan="tableApi.getVisibleLeafColumns().length" data-slot="loading" :class="ui.loading({ class: props.ui?.loading })">
            <slot name="loading" />
          </td>
        </tr>

        <tr v-else>
          <td :colspan="tableApi.getVisibleLeafColumns().length" data-slot="empty" :class="ui.empty({ class: props.ui?.empty })">
            <slot name="empty">
              {{ props.empty || t("table.noData") }}
            </slot>
          </td>
        </tr>

        <slot name="body-bottom" />
      </tbody>

      <tfoot
        v-if="hasFooter"
        data-slot="tfoot"
        :class="ui.tfoot({ class: [props.ui?.tfoot] })"
      >
        <tr data-slot="separator" :class="ui.separator({ class: [props.ui?.separator] })" />

        <tr v-for="footerGroup in tableApi.getFooterGroups()" :key="footerGroup.id" data-slot="tr" :class="ui.tr({ class: [props.ui?.tr] })">
          <th
            v-for="header in footerGroup.headers"
            :key="header.id"
            :data-pinned="header.column.getIsPinned()"
            :colspan="header.colSpan > 1 ? header.colSpan : void 0"
            :rowspan="header.rowSpan > 1 ? header.rowSpan : void 0"
            data-slot="th"
            :class="ui.th({
  class: [
    props.ui?.th,
    resolveValue(header.column.columnDef.meta?.class?.th, header)
  ],
  pinned: !!header.column.getIsPinned()
})"
            :style="[
  getColumnStyles(header.column),
  resolveValue(header.column.columnDef.meta?.style?.th, header)
]"
          >
            <slot :name="`${header.id}-footer`" v-bind="header.getContext()">
              <FlexRender v-if="!header.isPlaceholder" :render="header.column.columnDef.footer" :props="header.getContext()" />
            </slot>
          </th>
        </tr>
      </tfoot>
    </table>
  </DefineTableTemplate>

  <Primitive ref="rootRef" :as="props.as" data-slot="root" v-bind="$attrs" :class="ui.root({ class: [props.ui?.root, props.class] })">
    <ReuseTableTemplate />
  </Primitive>
</template>
```


## Tabs.vue

```vue
<script>
import theme from "#build/ui/tabs";
</script>

<script setup>
import { ref, computed } from "vue";
import { TabsRoot, TabsList, TabsIndicator, TabsTrigger, TabsContent } from "reka-ui";
import { useForwardProps } from "../composables/useForwardProps";
import { reactivePick } from "@vueuse/core";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { get } from "../utils";
import { tv } from "../utils/tv";
import UIcon from "./Icon.vue";
import UAvatar from "./Avatar.vue";
import UBadge from "./Badge.vue";
const _props = defineProps({
  as: { type: null, required: false },
  items: { type: Array, required: false },
  color: { type: null, required: false },
  variant: { type: null, required: false },
  size: { type: null, required: false },
  orientation: { type: null, required: false, default: "horizontal" },
  content: { type: Boolean, required: false, default: true },
  valueKey: { type: null, required: false, default: "value" },
  labelKey: { type: null, required: false, default: "label" },
  class: { type: null, required: false },
  ui: { type: Object, required: false },
  defaultValue: { type: [String, Number], required: false, default: "0" },
  modelValue: { type: [String, Number], required: false },
  activationMode: { type: String, required: false },
  unmountOnHide: { type: Boolean, required: false, default: true }
});
const emits = defineEmits(["update:modelValue"]);
const slots = defineSlots();
const props = useComponentProps("tabs", _props);
const appConfig = useAppConfig();
const rootProps = useForwardProps(reactivePick(props, "as", "unmountOnHide"), emits);
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.tabs || {} })({
  color: props.color,
  variant: props.variant,
  size: props.size,
  orientation: props.orientation
}));
const triggersRef = ref([]);
function setTriggerRef(index, el) {
  triggersRef.value[index] = el;
}
defineExpose({
  triggersRef
});
</script>

<template>
  <TabsRoot
    v-bind="rootProps"
    :model-value="props.modelValue"
    :default-value="props.defaultValue"
    :orientation="props.orientation"
    :activation-mode="props.activationMode"
    data-slot="root"
    :class="ui.root({ class: [props.ui?.root, props.class] })"
  >
    <TabsList data-slot="list" :class="ui.list({ class: props.ui?.list })">
      <TabsIndicator data-slot="indicator" :class="ui.indicator({ class: props.ui?.indicator })" />

      <slot name="list-leading" />

      <TabsTrigger
        v-for="(item, index) of props.items"
        :key="get(item, props.valueKey) ?? index"
        :ref="(el) => setTriggerRef(index, el)"
        :value="get(item, props.valueKey) ?? String(index)"
        :disabled="item.disabled"
        data-slot="trigger"
        :class="ui.trigger({ class: [props.ui?.trigger, item.ui?.trigger] })"
      >
        <slot name="leading" :item="item" :index="index" :ui="ui">
          <UIcon v-if="item.icon" :name="item.icon" data-slot="leadingIcon" :class="ui.leadingIcon({ class: [props.ui?.leadingIcon, item.ui?.leadingIcon] })" />
          <UAvatar v-else-if="item.avatar" :size="item.ui?.leadingAvatarSize || props.ui?.leadingAvatarSize || ui.leadingAvatarSize()" v-bind="item.avatar" data-slot="leadingAvatar" :class="ui.leadingAvatar({ class: [props.ui?.leadingAvatar, item.ui?.leadingAvatar] })" />
        </slot>

        <span v-if="get(item, props.labelKey) || !!slots.default" data-slot="label" :class="ui.label({ class: [props.ui?.label, item.ui?.label] })">
          <slot :item="item" :index="index">{{ get(item, props.labelKey) }}</slot>
        </span>

        <slot name="trailing" :item="item" :index="index" :ui="ui">
          <UBadge
            v-if="item.badge || item.badge === 0"
            color="neutral"
            variant="outline"
            :size="item.ui?.trailingBadgeSize || props.ui?.trailingBadgeSize || ui.trailingBadgeSize()"
            v-bind="typeof item.badge === 'string' || typeof item.badge === 'number' ? { label: item.badge } : item.badge"
            data-slot="trailingBadge"
            :class="ui.trailingBadge({ class: [props.ui?.trailingBadge, item.ui?.trailingBadge] })"
          />
        </slot>
      </TabsTrigger>

      <slot name="list-trailing" />
    </TabsList>

    <template v-if="!!props.content">
      <TabsContent v-for="(item, index) of props.items" :key="get(item, props.valueKey) ?? index" :value="get(item, props.valueKey) ?? String(index)" data-slot="content" :class="ui.content({ class: [props.ui?.content, item.ui?.content, item.class] })">
        <slot :name="item.slot || 'content'" :item="item" :index="index" :ui="ui">
          {{ item.content }}
        </slot>
      </TabsContent>
    </template>
  </TabsRoot>
</template>
```


## Textarea.vue

```vue
<script>
import theme from "#build/ui/textarea";
</script>

<script setup>
import { useTemplateRef, computed, onMounted, onScopeDispose, nextTick, watch } from "vue";
import { Primitive } from "reka-ui";
import { useVModel } from "@vueuse/core";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
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
  placeholder: { type: String, required: false },
  color: { type: null, required: false },
  variant: { type: null, required: false },
  size: { type: null, required: false },
  required: { type: Boolean, required: false },
  autofocus: { type: Boolean, required: false },
  autofocusDelay: { type: Number, required: false, default: 0 },
  autoresize: { type: Boolean, required: false },
  autoresizeDelay: { type: Number, required: false, default: 0 },
  disabled: { type: Boolean, required: false },
  rows: { type: Number, required: false, default: 3 },
  maxrows: { type: Number, required: false, default: 0 },
  highlight: { type: Boolean, required: false },
  fixed: { type: Boolean, required: false },
  defaultValue: { type: null, required: false },
  modelValue: { type: null, required: false },
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
const props = useComponentProps("textarea", _props);
const modelValue = useVModel(props, "modelValue", emits, { defaultValue: props.defaultValue });
const appConfig = useAppConfig();
const { emitFormFocus, emitFormBlur, emitFormInput, emitFormChange, size: formFieldSize, color: formFieldColor, id, name, highlight: formFieldHighlight, disabled: formFieldDisabled, ariaAttrs } = useFormField(_props, { deferInputValidation: true });
const color = computed(() => formFieldColor.value ?? props.color);
const highlight = computed(() => formFieldHighlight.value ?? props.highlight);
const size = computed(() => formFieldSize.value ?? props.size);
const disabled = computed(() => formFieldDisabled.value ?? props.disabled);
const { isLeading, isTrailing, leadingIconName, trailingIconName } = useComponentIcons(props);
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.textarea || {} })({
  color: color.value,
  variant: props.variant,
  size: size.value,
  loading: props.loading,
  highlight: highlight.value,
  fixed: props.fixed,
  autoresize: props.autoresize,
  leading: isLeading.value || !!props.avatar || !!slots.leading,
  trailing: isTrailing.value || !!slots.trailing
}));
const textareaRef = useTemplateRef("textareaRef");
function updateInput(value) {
  if (props.modelModifiers?.trim && (typeof value === "string" || value === null || value === void 0)) {
    value = value?.trim() ?? null;
  }
  if (props.modelModifiers?.number) {
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
  autoResize();
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
    textareaRef.value?.focus();
  }
}
function autoResize() {
  if (props.autoresize && textareaRef.value) {
    textareaRef.value.rows = props.rows;
    const overflow = textareaRef.value.style.overflow;
    textareaRef.value.style.overflow = "hidden";
    const styles = window.getComputedStyle(textareaRef.value);
    const paddingTop = Number.parseInt(styles.paddingTop);
    const paddingBottom = Number.parseInt(styles.paddingBottom);
    const padding = paddingTop + paddingBottom;
    const lineHeight = Number.parseInt(styles.lineHeight);
    const { scrollHeight } = textareaRef.value;
    const newRows = (scrollHeight - padding) / lineHeight;
    if (newRows > props.rows) {
      textareaRef.value.rows = props.maxrows ? Math.min(newRows, props.maxrows) : newRows;
    }
    textareaRef.value.style.overflow = overflow;
  }
}
watch(modelValue, () => {
  nextTick(autoResize);
});
let autofocusTimeoutId;
let autoresizeTimeoutId;
onMounted(() => {
  autofocusTimeoutId = setTimeout(() => {
    autoFocus();
  }, props.autofocusDelay);
  autoresizeTimeoutId = setTimeout(async () => {
    await nextTick();
    autoResize();
  }, props.autoresizeDelay);
});
onScopeDispose(() => {
  clearTimeout(autofocusTimeoutId);
  clearTimeout(autoresizeTimeoutId);
});
defineExpose({
  textareaRef,
  autoResize
});
</script>

<template>
  <Primitive :as="props.as" :data-slot="$attrs['data-slot'] ?? 'root'" :class="ui.root({ class: [props.ui?.root, props.class] })">
    <textarea
      :id="id"
      ref="textareaRef"
      :value="modelValue"
      :name="name"
      :rows="props.rows"
      :placeholder="props.placeholder"
      :class="ui.base({ class: props.ui?.base })"
      :disabled="disabled"
      :required="props.required"
      v-bind="{ ...$attrs, ...ariaAttrs }"
      data-slot="base"
      @input="onInput"
      @blur="onBlur"
      @change="onChange"
      @focus="emitFormFocus"
    />

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


## Theme.vue

```vue
<script>

</script>

<script setup>
import { computed } from "vue";
import defu from "defu";
import { injectThemeContext, provideThemeContext } from "../composables/useComponentProps";
const _props = defineProps({
  props: { type: Object, required: false },
  ui: { type: null, required: false }
});
defineSlots();
const parent = injectThemeContext();
const NAMESPACES = /* @__PURE__ */ new Set(["prose"]);
function normalizeUi(ui) {
  if (!ui) return {};
  const result = {};
  for (const [key, value] of Object.entries(ui)) {
    if (!value || typeof value !== "object") continue;
    if (NAMESPACES.has(key)) {
      const nested = {};
      for (const [childKey, childValue] of Object.entries(value)) {
        if (childValue && typeof childValue === "object") {
          nested[childKey] = { ui: childValue };
        }
      }
      result[key] = nested;
    } else {
      result[key] = { ui: value };
    }
  }
  return result;
}
provideThemeContext({
  defaults: computed(() => defu(
    _props.props ?? {},
    normalizeUi(_props.ui),
    parent.defaults.value
  ))
});
</script>

<template>
  <slot />
</template>
```


## Timeline.vue

```vue
<script>
import theme from "#build/ui/timeline";
</script>

<script setup>
import { computed } from "vue";
import { Primitive, Separator } from "reka-ui";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { tv } from "../utils/tv";
import { get } from "../utils";
import UAvatar from "./Avatar.vue";
const _props = defineProps({
  as: { type: null, required: false },
  items: { type: Array, required: true },
  size: { type: null, required: false },
  color: { type: null, required: false },
  orientation: { type: null, required: false, default: "vertical" },
  valueKey: { type: null, required: false, default: "value" },
  defaultValue: { type: [String, Number], required: false },
  reverse: { type: Boolean, required: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false }
});
const emits = defineEmits(["select"]);
const slots = defineSlots();
const props = useComponentProps("timeline", _props);
const modelValue = defineModel({ type: [String, Number] });
const appConfig = useAppConfig();
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.timeline || {} })({
  orientation: props.orientation,
  size: props.size,
  color: props.color,
  reverse: props.reverse
}));
const currentStepIndex = computed(() => {
  const value = modelValue.value ?? props.defaultValue;
  if (typeof value === "string") {
    return props.items.findIndex((item) => get(item, props.valueKey) === value) ?? -1;
  }
  if (props.reverse) {
    return value != null ? props.items.length - 1 - value : -1;
  } else {
    return value ?? -1;
  }
});
function getItemState(index) {
  if (currentStepIndex.value === -1) return void 0;
  if (index === currentStepIndex.value) return "active";
  if (props.reverse) {
    return index > currentStepIndex.value ? "completed" : void 0;
  } else {
    return index < currentStepIndex.value ? "completed" : void 0;
  }
}
function onSelect(event, item) {
  emits("select", event, item);
}
</script>

<template>
  <Primitive :as="props.as" :data-orientation="props.orientation" data-slot="root" :class="ui.root({ class: [props.ui?.root, props.class] })">
    <div
      v-for="(item, index) in props.items"
      :key="index"
      data-slot="item"
      :class="ui.item({ class: [props.ui?.item, item.ui?.item, item.class] })"
      :data-state="getItemState(index)"
      @click="onSelect($event, item)"
    >
      <div data-slot="container" :class="ui.container({ class: [props.ui?.container, item.ui?.container] })">
        <UAvatar
          :size="props.size"
          :icon="item.icon"
          v-bind="typeof item.avatar === 'object' ? item.avatar : {}"
          data-slot="indicator"
          :class="ui.indicator({ class: [props.ui?.indicator, item.ui?.indicator] })"
          :ui="{ icon: 'text-inherit', fallback: 'text-inherit' }"
        >
          <slot :name="item.slot ? `${item.slot}-indicator` : 'indicator'" :item="item" />
        </UAvatar>

        <Separator
          v-if="index < props.items.length - 1"
          data-slot="separator"
          :class="ui.separator({ class: [props.ui?.separator, item.ui?.separator] })"
          :orientation="props.orientation"
        />
      </div>

      <div data-slot="wrapper" :class="ui.wrapper({ class: [props.ui?.wrapper, item.ui?.wrapper] })">
        <slot :name="item.slot ? `${item.slot}-wrapper` : 'wrapper'" :item="item">
          <div v-if="item.date || !!slots[item.slot ? `${item.slot}-date` : 'date']" data-slot="date" :class="ui.date({ class: [props.ui?.date, item.ui?.date] })">
            <slot :name="item.slot ? `${item.slot}-date` : 'date'" :item="item">
              {{ item.date }}
            </slot>
          </div>
          <div v-if="item.title || !!slots[item.slot ? `${item.slot}-title` : 'title']" data-slot="title" :class="ui.title({ class: [props.ui?.title, item.ui?.title] })">
            <slot :name="item.slot ? `${item.slot}-title` : 'title'" :item="item">
              {{ item.title }}
            </slot>
          </div>
          <div v-if="item.description || !!slots[item.slot ? `${item.slot}-description` : 'description']" data-slot="description" :class="ui.description({ class: [props.ui?.description, item.ui?.description] })">
            <slot :name="item.slot ? `${item.slot}-description` : 'description'" :item="item">
              {{ item.description }}
            </slot>
          </div>
        </slot>
      </div>
    </div>
  </Primitive>
</template>
```


## Toast.vue

```vue
<script>
import theme from "#build/ui/toast";
</script>

<script setup>
import { ref, computed, onMounted, useTemplateRef } from "vue";
import { ToastRoot, ToastTitle, ToastDescription, ToastAction, ToastClose } from "reka-ui";
import { useForwardProps } from "../composables/useForwardProps";
import { reactivePick } from "@vueuse/core";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { useLocale } from "../composables/useLocale";
import { tv } from "../utils/tv";
import UIcon from "./Icon.vue";
import UAvatar from "./Avatar.vue";
import UButton from "./Button.vue";
import UProgress from "./Progress.vue";
const _props = defineProps({
  as: { type: null, required: false },
  title: { type: [String, Object, Function], required: false },
  description: { type: [String, Object, Function], required: false },
  icon: { type: null, required: false },
  avatar: { type: Object, required: false },
  color: { type: null, required: false },
  orientation: { type: null, required: false, default: "vertical" },
  close: { type: [Boolean, Object], required: false, default: true },
  closeIcon: { type: null, required: false },
  actions: { type: Array, required: false },
  duration: { type: Number, required: false },
  progress: { type: [Boolean, Object], required: false, default: true },
  class: { type: null, required: false },
  ui: { type: Object, required: false },
  defaultOpen: { type: Boolean, required: false },
  open: { type: Boolean, required: false },
  type: { type: String, required: false }
});
const emits = defineEmits(["escapeKeyDown", "pause", "resume", "swipeStart", "swipeMove", "swipeCancel", "swipeEnd", "update:open"]);
const slots = defineSlots();
const props = useComponentProps("toast", _props);
const { t } = useLocale();
const appConfig = useAppConfig();
const rootProps = useForwardProps(reactivePick(props, "as", "defaultOpen", "open", "duration", "type"), emits);
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.toast || {} })({
  color: props.color,
  orientation: props.orientation,
  title: !!props.title || !!slots.title
}));
const rootRef = useTemplateRef("rootRef");
const height = ref(0);
onMounted(() => {
  if (!rootRef.value?.$el?.getBoundingClientRect) {
    return;
  }
  height.value = rootRef.value.$el.getBoundingClientRect().height;
});
defineExpose({
  height
});
</script>

<template>
  <ToastRoot
    ref="rootRef"
    v-slot="{ remaining, duration: totalDuration, open }"
    v-bind="rootProps"
    :data-orientation="props.orientation"
    data-slot="root"
    :class="ui.root({ class: [props.ui?.root, props.class] })"
    :style="{ '--height': height }"
  >
    <slot name="leading" :ui="ui">
      <UAvatar v-if="props.avatar" :size="props.ui?.avatarSize || ui.avatarSize()" v-bind="props.avatar" data-slot="avatar" :class="ui.avatar({ class: props.ui?.avatar })" />
      <UIcon v-else-if="props.icon" :name="props.icon" data-slot="icon" :class="ui.icon({ class: props.ui?.icon })" />
    </slot>

    <div data-slot="wrapper" :class="ui.wrapper({ class: props.ui?.wrapper })">
      <ToastTitle v-if="props.title || !!slots.title" data-slot="title" :class="ui.title({ class: props.ui?.title })">
        <slot name="title">
          <component :is="props.title()" v-if="typeof props.title === 'function'" />
          <component :is="props.title" v-else-if="typeof props.title === 'object'" />
          <template v-else>
            {{ props.title }}
          </template>
        </slot>
      </ToastTitle>
      <ToastDescription v-if="props.description || !!slots.description" data-slot="description" :class="ui.description({ class: props.ui?.description })">
        <slot name="description">
          <component :is="props.description()" v-if="typeof props.description === 'function'" />
          <component :is="props.description" v-else-if="typeof props.description === 'object'" />
          <template v-else>
            {{ props.description }}
          </template>
        </slot>
      </ToastDescription>

      <div v-if="props.orientation === 'vertical' && (props.actions?.length || !!slots.actions)" data-slot="actions" :class="ui.actions({ class: props.ui?.actions })">
        <slot name="actions">
          <ToastAction v-for="(action, index) in props.actions" :key="index" :alt-text="action.label || 'Action'" as-child @click.stop>
            <UButton size="xs" :color="props.color" v-bind="action" />
          </ToastAction>
        </slot>
      </div>
    </div>

    <div v-if="props.orientation === 'horizontal' && (props.actions?.length || !!slots.actions) || props.close" data-slot="actions" :class="ui.actions({ class: props.ui?.actions, orientation: 'horizontal' })">
      <template v-if="props.orientation === 'horizontal' && (props.actions?.length || !!slots.actions)">
        <slot name="actions">
          <ToastAction v-for="(action, index) in props.actions" :key="index" :alt-text="action.label || 'Action'" as-child @click.stop>
            <UButton size="xs" :color="props.color" v-bind="action" />
          </ToastAction>
        </slot>
      </template>

      <ToastClose v-if="props.close || !!slots.close" as-child>
        <slot name="close" :ui="ui">
          <UButton
            v-if="props.close"
            :icon="props.closeIcon || appConfig.ui.icons.close"
            color="neutral"
            variant="link"
            :aria-label="t('toast.close')"
            v-bind="typeof props.close === 'object' ? props.close : {}"
            data-slot="close"
            :class="ui.close({ class: props.ui?.close })"
            @click.stop
          />
        </slot>
      </ToastClose>
    </div>

    <UProgress
      v-if="props.progress && open && remaining > 0 && totalDuration"
      :model-value="remaining / totalDuration * 100"
      :color="props.color"
      v-bind="typeof props.progress === 'object' ? props.progress : {}"
      size="sm"
      data-slot="progress"
      :class="ui.progress({ class: props.ui?.progress })"
    />
  </ToastRoot>
</template>
```


## Toaster.vue

```vue
<script>
import theme from "#build/ui/toaster";
export default {
  name: "Toaster"
};
</script>

<script setup>
import { ref, computed, toRef, provide } from "vue";
import { ToastProvider, ToastViewport, ToastPortal } from "reka-ui";
import { reactivePick } from "@vueuse/core";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { useForwardProps } from "../composables/useForwardProps";
import { useToast, toastMaxInjectionKey } from "../composables/useToast";
import { usePortal } from "../composables/usePortal";
import { omit } from "../utils";
import { tv } from "../utils/tv";
import UToast from "./Toast.vue";
const _props = defineProps({
  position: { type: null, required: false },
  expand: { type: Boolean, required: false, default: true },
  progress: { type: Boolean, required: false, default: true },
  portal: { type: [Boolean, String], required: false, skipCheck: true, default: true },
  max: { type: Number, required: false, default: 5 },
  class: { type: null, required: false },
  ui: { type: Object, required: false },
  label: { type: String, required: false },
  duration: { type: Number, required: false, default: 5e3 },
  disableSwipe: { type: Boolean, required: false },
  swipeThreshold: { type: Number, required: false }
});
defineSlots();
const props = useComponentProps("toaster", _props);
const { toasts, remove } = useToast();
const appConfig = useAppConfig();
provide(toastMaxInjectionKey, toRef(() => props.max));
const providerProps = useForwardProps(reactivePick(props, "duration", "label", "swipeThreshold", "disableSwipe"));
const portalProps = usePortal(toRef(() => props.portal));
const swipeDirection = computed(() => {
  switch (props.position) {
    case "top-center":
      return "up";
    case "top-right":
    case "bottom-right":
      return "right";
    case "bottom-center":
      return "down";
    case "top-left":
    case "bottom-left":
      return "left";
  }
  return "right";
});
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.toaster || {} })({
  position: props.position,
  swipeDirection: swipeDirection.value
}));
function onUpdateOpen(value, id) {
  if (value) {
    return;
  }
  remove(id);
}
const hovered = ref(false);
const expanded = computed(() => props.expand || hovered.value);
const refs = ref([]);
const height = computed(() => refs.value.reduce((acc, { height: height2 }) => acc + height2 + 16, 0));
const frontHeight = computed(() => refs.value[refs.value.length - 1]?.height || 0);
function getOffset(index) {
  return refs.value.slice(index + 1).reduce((acc, { height: height2 }) => acc + height2 + 16, 0);
}
</script>

<template>
  <ToastProvider :swipe-direction="swipeDirection" v-bind="providerProps">
    <slot />

    <UToast
      v-for="(toast, index) of toasts"
      :key="toast.id"
      ref="refs"
      :progress="props.progress"
      v-bind="omit(toast, ['id', 'close', '_duplicate', '_updated'])"
      :close="toast.close"
      :data-expanded="expanded"
      :data-front="!expanded && index === toasts.length - 1"
      :data-pulsing="toast._duplicate ? toast._duplicate % 2 === 0 ? 'even' : 'odd' : void 0"
      :style="{
  '--index': index - toasts.length + toasts.length,
  '--before': toasts.length - 1 - index,
  '--offset': getOffset(index),
  '--scale': expanded ? '1' : 'calc(1 - var(--before) * var(--scale-factor))',
  '--translate': expanded ? 'calc(var(--offset) * var(--translate-factor))' : 'calc(var(--before) * var(--gap))',
  '--transform': 'translateY(var(--translate)) scale(var(--scale))'
}"
      data-slot="base"
      :class="ui.base({ class: [props.ui?.base, toast.onClick ? 'cursor-pointer' : void 0] })"
      @update:open="onUpdateOpen($event, toast.id)"
      @click="toast.onClick && toast.onClick(toast)"
    />

    <ToastPortal v-bind="portalProps">
      <ToastViewport
        :data-expanded="expanded"
        data-slot="viewport"
        :class="ui.viewport({ class: [props.ui?.viewport, props.class] })"
        :style="{
  '--scale-factor': '0.05',
  '--translate-factor': props.position?.startsWith('top') ? '1px' : '-1px',
  '--gap': props.position?.startsWith('top') ? '16px' : '-16px',
  '--front-height': `${frontHeight}px`,
  '--height': `${height}px`
}"
        @mouseenter="hovered = true"
        @mouseleave="hovered = false"
      />
    </ToastPortal>
  </ToastProvider>
</template>
```


## Tooltip.vue

```vue
<script>
import theme from "#build/ui/tooltip";
</script>

<script setup>
import { computed, toRef } from "vue";
import { defu } from "defu";
import { TooltipRoot, TooltipTrigger, TooltipPortal, TooltipContent, TooltipArrow, injectTooltipProviderContext } from "reka-ui";
import { reactivePick } from "@vueuse/core";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { useForwardProps } from "../composables/useForwardProps";
import { FieldGroupReset } from "../composables/useFieldGroup";
import { usePortal } from "../composables/usePortal";
import { tv } from "../utils/tv";
import UKbd from "./Kbd.vue";
const _props = defineProps({
  text: { type: String, required: false },
  kbds: { type: Array, required: false },
  content: { type: Object, required: false },
  arrow: { type: [Boolean, Object], required: false },
  portal: { type: [Boolean, String], required: false, skipCheck: true, default: true },
  reference: { type: null, required: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false },
  defaultOpen: { type: Boolean, required: false },
  open: { type: Boolean, required: false },
  delayDuration: { type: Number, required: false },
  disableHoverableContent: { type: Boolean, required: false },
  disableClosingTrigger: { type: Boolean, required: false },
  disabled: { type: Boolean, required: false },
  ignoreNonKeyboardFocus: { type: Boolean, required: false }
});
const emits = defineEmits(["update:open"]);
const slots = defineSlots();
const props = useComponentProps("tooltip", _props);
const appConfig = useAppConfig();
const providerContext = injectTooltipProviderContext();
const rootProps = useForwardProps(reactivePick(props, "defaultOpen", "open", "delayDuration", "disableHoverableContent", "disableClosingTrigger", "ignoreNonKeyboardFocus"), emits);
const portalProps = usePortal(toRef(() => props.portal));
const contentProps = toRef(() => defu(props.content, providerContext.content.value, { side: "bottom", sideOffset: 8, collisionPadding: 8 }));
const arrowProps = toRef(() => defu(props.arrow, { rounded: true }));
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.tooltip || {} })({
  side: contentProps.value.side
}));
</script>

<template>
  <TooltipRoot v-slot="{ open }" v-bind="rootProps" :disabled="!(props.text || props.kbds?.length || !!slots.content) || props.disabled">
    <TooltipTrigger v-if="!!slots.default || !!props.reference" v-bind="$attrs" as-child :reference="props.reference" :class="props.class">
      <slot :open="open" />
    </TooltipTrigger>

    <TooltipPortal v-bind="portalProps">
      <FieldGroupReset>
        <TooltipContent v-bind="contentProps" data-slot="content" :class="ui.content({ class: [!slots.default && props.class, props.ui?.content] })">
          <slot name="content" :ui="ui">
            <span v-if="props.text" data-slot="text" :class="ui.text({ class: props.ui?.text })">{{ props.text }}</span>

            <span v-if="props.kbds?.length" data-slot="kbds" :class="ui.kbds({ class: props.ui?.kbds })">
              <UKbd v-for="(kbd, index) in props.kbds" :key="index" :size="props.ui?.kbdsSize || ui.kbdsSize()" v-bind="typeof kbd === 'string' ? { value: kbd } : kbd" />
            </span>
          </slot>

          <TooltipArrow v-if="!!props.arrow" v-bind="arrowProps" data-slot="arrow" :class="ui.arrow({ class: props.ui?.arrow })" />
        </TooltipContent>
      </FieldGroupReset>
    </TooltipPortal>
  </TooltipRoot>
</template>
```


## Tree.vue

```vue
<script>
import theme from "#build/ui/tree";
</script>

<script setup>
import { computed, toRef, useTemplateRef } from "vue";
import { TreeRoot, TreeItem, TreeVirtualizer } from "reka-ui";
import { useForwardProps } from "../composables/useForwardProps";
import { reactivePick, createReusableTemplate } from "@vueuse/core";
import { defu } from "defu";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { get } from "../utils";
import { getEstimateSize } from "../utils/virtualizer";
import { tv } from "../utils/tv";
import UIcon from "./Icon.vue";
defineOptions({ inheritAttrs: false });
const _props = defineProps({
  as: { type: null, required: false },
  color: { type: null, required: false },
  size: { type: null, required: false },
  getKey: { type: Function, required: false },
  labelKey: { type: null, required: false, default: "label" },
  trailingIcon: { type: null, required: false },
  expandedIcon: { type: null, required: false },
  collapsedIcon: { type: null, required: false },
  items: { type: null, required: false },
  modelValue: { type: null, required: false },
  defaultValue: { type: null, required: false },
  multiple: { type: Boolean, required: false },
  nested: { type: Boolean, required: false, default: true },
  virtualize: { type: [Boolean, Object], required: false, default: false },
  onSelect: { type: Function, required: false },
  onToggle: { type: Function, required: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false },
  expanded: { type: Array, required: false },
  defaultExpanded: { type: Array, required: false },
  selectionBehavior: { type: String, required: false },
  propagateSelect: { type: Boolean, required: false },
  disabled: { type: Boolean, required: false },
  bubbleSelect: { type: Boolean, required: false }
});
const emits = defineEmits(["update:modelValue", "update:expanded"]);
const slots = defineSlots();
const props = useComponentProps("tree", _props);
const appConfig = useAppConfig();
const rootProps = useForwardProps(reactivePick(props, "items", "multiple", "expanded", "disabled", "propagateSelect", "bubbleSelect"), emits);
const as = computed(() => {
  if (typeof props.as === "string" || typeof props.as?.render === "function") {
    return { root: props.as, link: "button" };
  }
  return defu(props.as, { root: "ul", link: "button" });
});
const nested = computed(() => props.virtualize ? false : props.nested);
const flattenedPaddingFormula = computed(() => {
  const sizeConfig = {
    xs: { base: 2, perLevel: 5.5 },
    // px-2, ms-4 + ps-1.5
    sm: { base: 2.5, perLevel: 6 },
    // px-2.5, ms-4.5 + ps-1.5
    md: { base: 2.5, perLevel: 6.5 },
    // px-2.5, ms-5 + ps-1.5
    lg: { base: 3, perLevel: 7 },
    // px-3, ms-5.5 + ps-1.5
    xl: { base: 3, perLevel: 7.5 }
    // px-3, ms-6 + ps-1.5
  };
  const config = sizeConfig[props.size || "md"];
  return (level) => `calc(var(--spacing) * ${(level - 1) * config.perLevel + config.base})`;
});
const virtualizerProps = toRef(() => {
  if (!props.virtualize) return false;
  return defu(typeof props.virtualize === "boolean" ? {} : props.virtualize, {
    estimateSize: getEstimateSize(props.items || [], props.size || "md")
  });
});
const [DefineTreeTemplate, ReuseTreeTemplate] = createReusableTemplate();
const [DefineItemTemplate, ReuseItemTemplate] = createReusableTemplate({
  props: {
    item: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    level: {
      type: Number,
      required: true
    }
  }
});
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.tree || {} })({
  color: props.color,
  size: props.size,
  virtualize: !!props.virtualize
}));
const rootRef = useTemplateRef("rootRef");
function getItemLabel(item) {
  return get(item, props.labelKey);
}
function getItemKey(item) {
  return props.getKey ? props.getKey(item) || getItemLabel(item) : getItemLabel(item);
}
function getDefaultOpenedItems(item) {
  const currentItem = item.defaultExpanded ? getItemKey(item) : null;
  const childItems = item.children?.flatMap((child) => getDefaultOpenedItems(child)) ?? [];
  return [currentItem, ...childItems].filter(Boolean);
}
const defaultExpanded = computed(() => props.defaultExpanded ?? props.items?.flatMap((item) => getDefaultOpenedItems(item)));
defineExpose({
  get $el() {
    return rootRef.value?.$el;
  }
});
</script>

<template>
  <DefineItemTemplate v-slot="{ item, index, level }">
    <li
      role="presentation"
      :class="!!nested && level > 1 ? ui.itemWithChildren({ class: [props.ui?.itemWithChildren, item.ui?.itemWithChildren] }) : ui.item({ class: [props.ui?.item, item.ui?.item] })"
    >
      <TreeItem
        v-slot="{ isExpanded, isSelected, isIndeterminate, handleSelect, handleToggle }"
        :level="level"
        :value="item"
        as-child
        @toggle="(item.onToggle ?? props.onToggle)?.($event, item)"
        @select="(item.onSelect ?? props.onSelect)?.($event, item)"
      >
        <slot
          :name="item.slot ? `${item.slot}-wrapper` : 'item-wrapper'"
          v-bind="{ index, level, expanded: isExpanded, selected: isSelected, indeterminate: isIndeterminate, handleSelect, handleToggle, ui }"
          :item="item"
        >
          <component
            :is="as.link"
            :type="as.link === 'button' ? 'button' : void 0"
            :disabled="item.disabled || props.disabled"
            data-slot="link"
            :class="ui.link({ class: [props.ui?.link, item.ui?.link, item.class], selected: isSelected, disabled: item.disabled || props.disabled })"
            :style="!nested && level > 1 ? { paddingInlineStart: flattenedPaddingFormula(level) } : void 0"
          >
            <slot
              :name="item.slot || 'item'"
              v-bind="{ index, level, expanded: isExpanded, selected: isSelected, indeterminate: isIndeterminate, handleSelect, handleToggle, ui }"
              :item="item"
            >
              <slot
                :name="item.slot ? `${item.slot}-leading` : 'item-leading'"
                v-bind="{ index, level, expanded: isExpanded, selected: isSelected, indeterminate: isIndeterminate, handleSelect, handleToggle, ui }"
                :item="item"
              >
                <UIcon
                  v-if="item.icon"
                  :name="item.icon"
                  data-slot="linkLeadingIcon"
                  :class="ui.linkLeadingIcon({ class: [props.ui?.linkLeadingIcon, item.ui?.linkLeadingIcon] })"
                />
                <UIcon
                  v-else-if="item.children?.length"
                  :name="isExpanded ? props.expandedIcon ?? appConfig.ui.icons.folderOpen : props.collapsedIcon ?? appConfig.ui.icons.folder"
                  data-slot="linkLeadingIcon"
                  :class="ui.linkLeadingIcon({ class: [props.ui?.linkLeadingIcon, item.ui?.linkLeadingIcon] })"
                />
              </slot>

              <span
                v-if="getItemLabel(item) || !!slots[item.slot ? `${item.slot}-label` : 'item-label']"
                data-slot="linkLabel"
                :class="ui.linkLabel({ class: [props.ui?.linkLabel, item.ui?.linkLabel] })"
              >
                <slot
                  :name="item.slot ? `${item.slot}-label` : 'item-label'"
                  v-bind="{ index, level, expanded: isExpanded, selected: isSelected, indeterminate: isIndeterminate, handleSelect, handleToggle, ui }"
                  :item="item"
                >
                  {{ getItemLabel(item) }}
                </slot>
              </span>

              <span
                v-if="item.trailingIcon || item.children?.length || !!slots[item.slot ? `${item.slot}-trailing` : 'item-trailing']"
                data-slot="linkTrailing"
                :class="ui.linkTrailing({ class: [props.ui?.linkTrailing, item.ui?.linkTrailing] })"
              >
                <slot
                  :name="item.slot ? `${item.slot}-trailing` : 'item-trailing'"
                  v-bind="{ index, level, expanded: isExpanded, selected: isSelected, indeterminate: isIndeterminate, handleSelect, handleToggle, ui }"
                  :item="item"
                >
                  <UIcon
                    v-if="item.trailingIcon"
                    :name="item.trailingIcon"
                    data-slot="linkTrailingIcon"
                    :class="ui.linkTrailingIcon({ class: [props.ui?.linkTrailingIcon, item.ui?.linkTrailingIcon] })"
                  />
                  <UIcon
                    v-else-if="item.children?.length"
                    :name="props.trailingIcon ?? appConfig.ui.icons.chevronDown"
                    data-slot="linkTrailingIcon"
                    :class="ui.linkTrailingIcon({ class: [props.ui?.linkTrailingIcon, item.ui?.linkTrailingIcon] })"
                  />
                </slot>
              </span>
            </slot>
          </component>
        </slot>

        <ul
          v-if="nested && item.children?.length && isExpanded"
          role="group"
          data-slot="listWithChildren"
          :class="ui.listWithChildren({ class: [props.ui?.listWithChildren, item.ui?.listWithChildren] })"
        >
          <ReuseTreeTemplate :items="item.children" :level="level + 1" />
        </ul>
      </TreeItem>
    </li>
  </DefineItemTemplate>

  <DefineTreeTemplate v-slot="{ items, level }">
    <ReuseItemTemplate v-for="(item, index) in items" :key="`${level}-${index}`" :item="item" :index="index" :level="level" />
  </DefineTreeTemplate>

  <TreeRoot
    ref="rootRef"
    v-slot="{ flattenItems }"
    data-slot="root"
    v-bind="{ ...rootProps, ...$attrs }"
    :as="as.root"
    :model-value="props.modelValue"
    :default-value="props.defaultValue"
    :class="ui.root({ class: [props.ui?.root, props.class] })"
    :get-key="getItemKey"
    :default-expanded="defaultExpanded"
    :selection-behavior="props.selectionBehavior"
  >
    <TreeVirtualizer
      v-if="!!props.virtualize"
      v-slot="{ item, virtualItem }"
      :text-content="(item2) => getItemLabel(item2.value)"
      v-bind="virtualizerProps"
    >
      <ReuseItemTemplate :item="item.value" :index="virtualItem.index" :level="item.level" />
    </TreeVirtualizer>

    <template v-else-if="!nested">
      <ReuseItemTemplate
        v-for="(item, index) in flattenItems"
        :key="item._id"
        :item="item.value"
        :index="index"
        :level="item.level"
      />
    </template>

    <ReuseTreeTemplate v-else :items="props.items" :level="1" />
  </TreeRoot>
</template>
```


## User.vue

```vue
<script>
import theme from "#build/ui/user";
</script>

<script setup>
import { computed } from "vue";
import { Primitive } from "reka-ui";
import { useAppConfig } from "#imports";
import { useComponentProps } from "../composables/useComponentProps";
import { usePrefix } from "../composables/usePrefix";
import { tv } from "../utils/tv";
import UChip from "./Chip.vue";
import UAvatar from "./Avatar.vue";
import ULink from "./Link.vue";
defineOptions({ inheritAttrs: false });
const _props = defineProps({
  as: { type: null, required: false },
  name: { type: String, required: false },
  description: { type: String, required: false },
  avatar: { type: Object, required: false },
  chip: { type: [Boolean, Object], required: false },
  size: { type: null, required: false },
  orientation: { type: null, required: false, default: "horizontal" },
  to: { type: null, required: false },
  target: { type: [String, Object, null], required: false },
  onClick: { type: Function, required: false },
  class: { type: null, required: false },
  ui: { type: Object, required: false }
});
const slots = defineSlots();
const props = useComponentProps("user", _props);
const appConfig = useAppConfig();
const prefix = usePrefix();
const ui = computed(() => tv({ extend: theme, ...appConfig.ui?.user || {} })({
  size: props.size,
  orientation: props.orientation,
  to: !!props.to || !!props.onClick
}));
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
    <slot name="avatar" :ui="ui">
      <UChip v-if="props.chip && props.avatar" inset v-bind="typeof props.chip === 'object' ? props.chip : {}" :size="props.size">
        <UAvatar :alt="props.name" v-bind="props.avatar" :size="props.size" data-slot="avatar" :class="ui.avatar({ class: props.ui?.avatar })" />
      </UChip>
      <UAvatar
        v-else-if="props.avatar"
        :alt="props.name"
        v-bind="props.avatar"
        :size="props.size"
        data-slot="avatar"
        :class="ui.avatar({ class: props.ui?.avatar })"
      />
    </slot>

    <div data-slot="wrapper" :class="ui.wrapper({ class: props.ui?.wrapper })">
      <ULink
        v-if="props.to"
        :aria-label="props.name"
        v-bind="{ 'to': props.to, 'target': props.target, ...$attrs, 'data-slot': void 0 }"
        :class="prefix('focus:outline-none peer')"
        raw
      >
        <span :class="prefix('absolute inset-0')" aria-hidden="true" />
      </ULink>

      <slot>
        <p v-if="props.name || !!slots.name" data-slot="name" :class="ui.name({ class: props.ui?.name })">
          <slot name="name">
            {{ props.name }}
          </slot>
        </p>
        <p v-if="props.description || !!slots.description" data-slot="description" :class="ui.description({ class: props.ui?.description })">
          <slot name="description">
            {{ props.description }}
          </slot>
        </p>
      </slot>
    </div>
  </Primitive>
</template>
```
