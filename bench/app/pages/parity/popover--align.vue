<template>
  <div class="p-4 space-y-4">
    <!-- Позиционирование поповера по content: align start, align end, side right. У Popover.vue
         `content` — проп положения, а содержимое идёт слотом #content; в ките то же разнесено
         на content (объект) и contentSlot (kit-popper-align-ignored, раунд 117). -->
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-80 h-40">
        <UPopover :open="true" :content="{ side: 'bottom', align: 'start' }">
          <UButton label="Label" />
          <template #content>
            <div class="p-4">Description text for the parity testbed.</div>
          </template>
        </UPopover>
      </div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-80 h-40 flex justify-end items-start">
        <UPopover :open="true" :content="{ side: 'bottom', align: 'end' }">
          <UButton label="Label" />
          <template #content>
            <div class="p-4">Description text for the parity testbed.</div>
          </template>
        </UPopover>
      </div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-80 h-40">
        <UPopover :open="true" :content="{ side: 'right' }">
          <UButton label="Label" />
          <template #content>
            <div class="p-4">Description text for the parity testbed.</div>
          </template>
        </UPopover>
      </div>
    </div>
  </div>
</template>
