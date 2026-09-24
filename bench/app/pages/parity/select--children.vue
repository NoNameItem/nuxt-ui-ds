<template>
  <div class="p-4 space-y-4">
    <!-- nuxt-ui-ds-306: безымянный слот (Select.vue:212) стоит внутри RSelectValue — содержимое заменяет подпись внутри span[value]. Первая ячейка — контроль -->
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64"><USelect :items="[{ label: 'System', value: 'system' }, { label: 'Light', value: 'light' }]" model-value="system" /></div>
      <div class="w-64">
        <USelect :items="[{ label: 'System', value: 'system' }, { label: 'Light', value: 'light' }]" model-value="system">
          <UKbd value="a" />
        </USelect>
      </div>
    </div>
  </div>
</template>
