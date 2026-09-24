<template>
  <div class="p-4 space-y-4">
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64 h-24"><UTooltip text="Label" :open="true" :portal="false"><UButton label="Label" /></UTooltip></div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64 h-24"><UTooltip text="Label" :kbds="['meta', 'K']" :open="true" :portal="false"><UButton label="Label" /></UTooltip></div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64 h-24"><UTooltip text="Label" arrow :open="true" :portal="false"><UButton label="Label" /></UTooltip></div>
    </div>
  </div>
</template>
