<template>
  <div class="p-4 space-y-4">
    <!-- Позиционирование подсказки по content: align start, align end, side right. Страница
         tooltip content не передаёт; по коду кита Tooltip его не читает (kit-popper-align-ignored). -->
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64 h-24"><UTooltip text="Description text for the parity testbed." :open="true" :content="{ side: 'bottom', align: 'start' }"><UButton label="Label" /></UTooltip></div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64 h-24 flex justify-end"><UTooltip text="Description text for the parity testbed." :open="true" :content="{ side: 'bottom', align: 'end' }"><UButton label="Label" /></UTooltip></div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64 h-24"><UTooltip text="Description text for the parity testbed." :open="true" :content="{ side: 'right' }"><UButton label="Label" /></UTooltip></div>
    </div>
  </div>
</template>
