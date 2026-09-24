<template>
  <div class="p-4 space-y-4">
    <!-- nuxt-ui-ds-101: именованные слоты leading/trailing (Button.vue:145, :156) — содержимое внутри <button> вместо иконок. Первая ячейка — контроль: trailing-icon -->
    <div class="flex flex-wrap gap-4 items-start">
      <UButton label="Label" trailing-icon="i-lucide-arrow-right" />
      <UButton label="Label">
        <template #trailing><UKbd value="d" /></template>
      </UButton>
      <UButton label="Label">
        <template #leading><UKbd value="d" /></template>
      </UButton>
      <UButton label="Label" color="neutral" variant="outline">
        <template #leading><UKbd value="a" /></template>
        <template #trailing><UKbd value="b" /></template>
      </UButton>
    </div>
  </div>
</template>
