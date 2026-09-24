<template>
  <div class="p-4 space-y-4">
    <div class="flex flex-wrap gap-4 items-start">
      <UButton label="Label" color="primary" variant="solid" />
      <UButton label="Label" color="primary" variant="outline" />
      <UButton label="Label" color="primary" variant="soft" />
      <UButton label="Label" color="primary" variant="subtle" />
      <UButton label="Label" color="primary" variant="ghost" />
      <UButton label="Label" color="primary" variant="link" />
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <UButton label="Label" color="secondary" variant="solid" />
      <UButton label="Label" color="secondary" variant="outline" />
      <UButton label="Label" color="secondary" variant="soft" />
      <UButton label="Label" color="secondary" variant="subtle" />
      <UButton label="Label" color="secondary" variant="ghost" />
      <UButton label="Label" color="secondary" variant="link" />
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <UButton label="Label" color="success" variant="solid" />
      <UButton label="Label" color="success" variant="outline" />
      <UButton label="Label" color="success" variant="soft" />
      <UButton label="Label" color="success" variant="subtle" />
      <UButton label="Label" color="success" variant="ghost" />
      <UButton label="Label" color="success" variant="link" />
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <UButton label="Label" color="info" variant="solid" />
      <UButton label="Label" color="info" variant="outline" />
      <UButton label="Label" color="info" variant="soft" />
      <UButton label="Label" color="info" variant="subtle" />
      <UButton label="Label" color="info" variant="ghost" />
      <UButton label="Label" color="info" variant="link" />
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <UButton label="Label" color="warning" variant="solid" />
      <UButton label="Label" color="warning" variant="outline" />
      <UButton label="Label" color="warning" variant="soft" />
      <UButton label="Label" color="warning" variant="subtle" />
      <UButton label="Label" color="warning" variant="ghost" />
      <UButton label="Label" color="warning" variant="link" />
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <UButton label="Label" color="error" variant="solid" />
      <UButton label="Label" color="error" variant="outline" />
      <UButton label="Label" color="error" variant="soft" />
      <UButton label="Label" color="error" variant="subtle" />
      <UButton label="Label" color="error" variant="ghost" />
      <UButton label="Label" color="error" variant="link" />
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <UButton label="Label" color="neutral" variant="solid" />
      <UButton label="Label" color="neutral" variant="outline" />
      <UButton label="Label" color="neutral" variant="soft" />
      <UButton label="Label" color="neutral" variant="subtle" />
      <UButton label="Label" color="neutral" variant="ghost" />
      <UButton label="Label" color="neutral" variant="link" />
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <UButton icon="i-lucide-plus" square size="xs" />
      <UButton icon="i-lucide-plus" square size="sm" />
      <UButton icon="i-lucide-plus" square size="md" />
      <UButton icon="i-lucide-plus" square size="lg" />
      <UButton icon="i-lucide-plus" square size="xl" />
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-80">
        <UButton block label="Label" />
      </div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <UButton label="Label" icon="i-lucide-rocket" />
      <UButton label="Label" trailing-icon="i-lucide-arrow-right" />
      <UButton icon="i-lucide-plus" />
      <UButton label="Label" loading />
      <UButton label="Label" loading trailing-icon="i-lucide-arrow-right" />
      <UButton label="Label" disabled />
      <UButton label="Label" :avatar="{ src: '/parity/demo.png' }" />
    </div>
  </div>
</template>
