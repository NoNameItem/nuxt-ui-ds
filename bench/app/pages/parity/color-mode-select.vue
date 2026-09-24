<template>
  <div class="p-4 space-y-4">
    <!-- nuxt-ui-ds-qg2: UColorModeSelect — обёртка над USelectMenu без своей темы (color-mode/ColorModeSelect.vue). Предпочтение на стенде — system в обеих темах -->
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64"><UColorModeSelect /></div>
      <div class="w-64"><UColorModeSelect size="xs" /></div>
      <div class="w-64 flex flex-col"><UColorModeSelect size="xs" /></div>
    </div>
  </div>
</template>
