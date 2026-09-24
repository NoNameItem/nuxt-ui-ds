<template>
  <div class="p-4 space-y-4">
    <!-- nuxt-ui-ds-ni3: подпись значения — displayValue(modelValue) через labelKey (SelectMenu.vue:386, utils getDisplayValue). Первая ячейка — контроль: без valueKey строка показывается как есть -->
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64"><USelectMenu :items="[{ label: 'System', value: 'system' }, { label: 'Light', value: 'light' }, { label: 'Dark', value: 'dark' }]" model-value="system" /></div>
      <div class="w-64"><USelectMenu :items="[{ label: 'System', value: 'system' }, { label: 'Light', value: 'light' }, { label: 'Dark', value: 'dark' }]" value-key="value" model-value="system" /></div>
      <div class="w-64"><USelectMenu :items="[{ label: 'System', value: 'system' }, { label: 'Light', value: 'light' }, { label: 'Dark', value: 'dark' }]" :model-value="{ label: 'System', value: 'system' }" /></div>
    </div>
  </div>
</template>
