<template>
  <div class="p-4 space-y-4">
    <div class="flex flex-wrap gap-4 items-start">
      <UBadge label="Label" color="primary" variant="solid" />
      <UBadge label="Label" color="primary" variant="outline" />
      <UBadge label="Label" color="primary" variant="soft" />
      <UBadge label="Label" color="primary" variant="subtle" />
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <UBadge label="Label" color="secondary" variant="solid" />
      <UBadge label="Label" color="secondary" variant="outline" />
      <UBadge label="Label" color="secondary" variant="soft" />
      <UBadge label="Label" color="secondary" variant="subtle" />
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <UBadge label="Label" color="success" variant="solid" />
      <UBadge label="Label" color="success" variant="outline" />
      <UBadge label="Label" color="success" variant="soft" />
      <UBadge label="Label" color="success" variant="subtle" />
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <UBadge label="Label" color="info" variant="solid" />
      <UBadge label="Label" color="info" variant="outline" />
      <UBadge label="Label" color="info" variant="soft" />
      <UBadge label="Label" color="info" variant="subtle" />
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <UBadge label="Label" color="warning" variant="solid" />
      <UBadge label="Label" color="warning" variant="outline" />
      <UBadge label="Label" color="warning" variant="soft" />
      <UBadge label="Label" color="warning" variant="subtle" />
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <UBadge label="Label" color="error" variant="solid" />
      <UBadge label="Label" color="error" variant="outline" />
      <UBadge label="Label" color="error" variant="soft" />
      <UBadge label="Label" color="error" variant="subtle" />
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <UBadge label="Label" color="neutral" variant="solid" />
      <UBadge label="Label" color="neutral" variant="outline" />
      <UBadge label="Label" color="neutral" variant="soft" />
      <UBadge label="Label" color="neutral" variant="subtle" />
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <UBadge icon="i-lucide-plus" square size="xs" />
      <UBadge icon="i-lucide-plus" square size="sm" />
      <UBadge icon="i-lucide-plus" square size="md" />
      <UBadge icon="i-lucide-plus" square size="lg" />
      <UBadge icon="i-lucide-plus" square size="xl" />
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <UBadge label="Label" icon="i-lucide-rocket" />
      <UBadge label="Label" trailing-icon="i-lucide-arrow-right" />
      <UBadge label="Label" :avatar="{ src: '/parity/demo.png' }" />
    </div>
  </div>
</template>
