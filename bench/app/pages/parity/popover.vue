<template>
  <div class="p-4 space-y-4">
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64 h-80">
        <UPopover :open="true" :portal="false">
          <UButton label="Label" />
          <template #content>
            <div class="p-4">Description text for the parity testbed.</div>
          </template>
        </UPopover>
      </div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64 h-80">
        <UPopover arrow :open="true" :portal="false">
          <UButton label="Label" />
          <template #content>
            <div class="p-4">Description text for the parity testbed.</div>
          </template>
        </UPopover>
      </div>
    </div>
  </div>
</template>
