<template>
  <div class="p-4 space-y-4">
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64">
        <UInput variant="outline" placeholder="Placeholder" />
      </div>
      <div class="w-64">
        <UInput variant="soft" placeholder="Placeholder" />
      </div>
      <div class="w-64">
        <UInput variant="subtle" placeholder="Placeholder" />
      </div>
      <div class="w-64">
        <UInput variant="ghost" placeholder="Placeholder" />
      </div>
      <div class="w-64">
        <UInput variant="none" placeholder="Placeholder" />
      </div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64">
        <UInput highlight color="primary" />
      </div>
      <div class="w-64">
        <UInput highlight color="secondary" />
      </div>
      <div class="w-64">
        <UInput highlight color="success" />
      </div>
      <div class="w-64">
        <UInput highlight color="info" />
      </div>
      <div class="w-64">
        <UInput highlight color="warning" />
      </div>
      <div class="w-64">
        <UInput highlight color="error" />
      </div>
      <div class="w-64">
        <UInput highlight color="neutral" />
      </div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64">
        <UInput size="xs" />
      </div>
      <div class="w-64">
        <UInput size="sm" />
      </div>
      <div class="w-64">
        <UInput size="md" />
      </div>
      <div class="w-64">
        <UInput size="lg" />
      </div>
      <div class="w-64">
        <UInput size="xl" />
      </div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64">
        <UInput icon="i-lucide-rocket" size="xs" />
      </div>
      <div class="w-64">
        <UInput icon="i-lucide-rocket" size="sm" />
      </div>
      <div class="w-64">
        <UInput icon="i-lucide-rocket" size="md" />
      </div>
      <div class="w-64">
        <UInput icon="i-lucide-rocket" size="lg" />
      </div>
      <div class="w-64">
        <UInput icon="i-lucide-rocket" size="xl" />
      </div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64">
        <UInput trailing-icon="i-lucide-arrow-right" size="xs" />
      </div>
      <div class="w-64">
        <UInput trailing-icon="i-lucide-arrow-right" size="sm" />
      </div>
      <div class="w-64">
        <UInput trailing-icon="i-lucide-arrow-right" size="md" />
      </div>
      <div class="w-64">
        <UInput trailing-icon="i-lucide-arrow-right" size="lg" />
      </div>
      <div class="w-64">
        <UInput trailing-icon="i-lucide-arrow-right" size="xl" />
      </div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64">
        <UInput placeholder="Placeholder" />
      </div>
      <div class="w-64">
        <UInput :model-value="'Value'" />
      </div>
      <div class="w-64">
        <UInput loading />
      </div>
      <div class="w-64">
        <UInput disabled />
      </div>
      <div class="w-64">
        <UInput type="file" />
      </div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64">
        <UInput fixed />
      </div>
    </div>
  </div>
</template>
