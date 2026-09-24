<template>
  <div class="p-4 space-y-4">
    <!-- nuxt-ui-ds-ni3: SelectRoot элемента не рисует — кнопка без обёртки (Select.vue:192). Обёртка flex flex-col — отступление от правила обёрток: только в ней кнопка растягивается и лишняя обёртка видна. Первая ячейка — контроль в блочной обёртке -->
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64"><USelect :items="[{ label: 'System', value: 'system' }, { label: 'Light', value: 'light' }]" model-value="system" /></div>
      <div class="w-64 flex flex-col"><USelect :items="[{ label: 'System', value: 'system' }, { label: 'Light', value: 'light' }]" model-value="system" /></div>
    </div>
  </div>
</template>
