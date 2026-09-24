<template>
  <div class="p-4 space-y-4">
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64">
        <UTextarea variant="outline" placeholder="Placeholder" />
      </div>
      <div class="w-64">
        <UTextarea variant="soft" placeholder="Placeholder" />
      </div>
      <div class="w-64">
        <UTextarea variant="subtle" placeholder="Placeholder" />
      </div>
      <div class="w-64">
        <UTextarea variant="ghost" placeholder="Placeholder" />
      </div>
      <div class="w-64">
        <UTextarea variant="none" placeholder="Placeholder" />
      </div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64">
        <UTextarea highlight color="primary" />
      </div>
      <div class="w-64">
        <UTextarea highlight color="secondary" />
      </div>
      <div class="w-64">
        <UTextarea highlight color="success" />
      </div>
      <div class="w-64">
        <UTextarea highlight color="info" />
      </div>
      <div class="w-64">
        <UTextarea highlight color="warning" />
      </div>
      <div class="w-64">
        <UTextarea highlight color="error" />
      </div>
      <div class="w-64">
        <UTextarea highlight color="neutral" />
      </div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64">
        <UTextarea size="xs" />
      </div>
      <div class="w-64">
        <UTextarea size="sm" />
      </div>
      <div class="w-64">
        <UTextarea size="md" />
      </div>
      <div class="w-64">
        <UTextarea size="lg" />
      </div>
      <div class="w-64">
        <UTextarea size="xl" />
      </div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64">
        <UTextarea icon="i-lucide-rocket" size="xs" />
      </div>
      <div class="w-64">
        <UTextarea icon="i-lucide-rocket" size="sm" />
      </div>
      <div class="w-64">
        <UTextarea icon="i-lucide-rocket" size="md" />
      </div>
      <div class="w-64">
        <UTextarea icon="i-lucide-rocket" size="lg" />
      </div>
      <div class="w-64">
        <UTextarea icon="i-lucide-rocket" size="xl" />
      </div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64">
        <UTextarea trailing-icon="i-lucide-arrow-right" size="xs" />
      </div>
      <div class="w-64">
        <UTextarea trailing-icon="i-lucide-arrow-right" size="sm" />
      </div>
      <div class="w-64">
        <UTextarea trailing-icon="i-lucide-arrow-right" size="md" />
      </div>
      <div class="w-64">
        <UTextarea trailing-icon="i-lucide-arrow-right" size="lg" />
      </div>
      <div class="w-64">
        <UTextarea trailing-icon="i-lucide-arrow-right" size="xl" />
      </div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64">
        <UTextarea placeholder="Placeholder" />
      </div>
      <div class="w-64">
        <UTextarea :model-value="'Value'" />
      </div>
      <div class="w-64">
        <UTextarea :rows="5" />
      </div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64">
        <UTextarea loading />
      </div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64">
        <UTextarea autoresize />
      </div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64">
        <UTextarea fixed />
      </div>
    </div>
  </div>
</template>
