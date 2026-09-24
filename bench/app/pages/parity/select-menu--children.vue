<template>
  <div class="p-4 space-y-4">
    <!-- nuxt-ui-ds-306: безымянный слот (SelectMenu.vue:385) заменяет span[value] / span[placeholder] целиком и стоит прямо в кнопке. Первая ячейка — контроль -->
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64"><USelectMenu :items="[{ label: 'System', value: 'system' }, { label: 'Light', value: 'light' }]" model-value="system" /></div>
      <div class="w-64">
        <USelectMenu :items="[{ label: 'System', value: 'system' }, { label: 'Light', value: 'light' }]" model-value="system">
          <UKbd value="a" />
        </USelectMenu>
      </div>
    </div>
  </div>
</template>
