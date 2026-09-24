<template>
  <div class="p-4 space-y-4">
    <!-- nuxt-ui-ds-101: именованные слоты leading/trailing (Badge.vue:47, :58) — содержимое внутри бейджа. Первая ячейка — контроль -->
    <div class="flex flex-wrap gap-4 items-start">
      <UBadge label="Label" />
      <UBadge label="Label">
        <template #leading><UKbd value="a" size="sm" /></template>
      </UBadge>
      <UBadge label="Label">
        <template #trailing><UKbd value="b" size="sm" /></template>
      </UBadge>
    </div>
  </div>
</template>
