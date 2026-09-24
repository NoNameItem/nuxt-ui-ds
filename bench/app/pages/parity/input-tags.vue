<template>
  <div class="p-4 space-y-4">
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64">
        <UInputTags variant="outline" :model-value="['Home', 'Profile']" />
      </div>
      <div class="w-64">
        <UInputTags variant="soft" :model-value="['Home', 'Profile']" />
      </div>
      <div class="w-64">
        <UInputTags variant="subtle" :model-value="['Home', 'Profile']" />
      </div>
      <div class="w-64">
        <UInputTags variant="ghost" :model-value="['Home', 'Profile']" />
      </div>
      <div class="w-64">
        <UInputTags variant="none" :model-value="['Home', 'Profile']" />
      </div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64">
        <UInputTags highlight color="primary" :model-value="['Home', 'Profile']" />
      </div>
      <div class="w-64">
        <UInputTags highlight color="secondary" :model-value="['Home', 'Profile']" />
      </div>
      <div class="w-64">
        <UInputTags highlight color="success" :model-value="['Home', 'Profile']" />
      </div>
      <div class="w-64">
        <UInputTags highlight color="info" :model-value="['Home', 'Profile']" />
      </div>
      <div class="w-64">
        <UInputTags highlight color="warning" :model-value="['Home', 'Profile']" />
      </div>
      <div class="w-64">
        <UInputTags highlight color="error" :model-value="['Home', 'Profile']" />
      </div>
      <div class="w-64">
        <UInputTags highlight color="neutral" :model-value="['Home', 'Profile']" />
      </div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64">
        <UInputTags size="xs" :model-value="['Home', 'Profile']" />
      </div>
      <div class="w-64">
        <UInputTags size="sm" :model-value="['Home', 'Profile']" />
      </div>
      <div class="w-64">
        <UInputTags size="md" :model-value="['Home', 'Profile']" />
      </div>
      <div class="w-64">
        <UInputTags size="lg" :model-value="['Home', 'Profile']" />
      </div>
      <div class="w-64">
        <UInputTags size="xl" :model-value="['Home', 'Profile']" />
      </div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64">
        <UInputTags icon="i-lucide-rocket" size="xs" :model-value="['Home', 'Profile']" />
      </div>
      <div class="w-64">
        <UInputTags icon="i-lucide-rocket" size="sm" :model-value="['Home', 'Profile']" />
      </div>
      <div class="w-64">
        <UInputTags icon="i-lucide-rocket" size="md" :model-value="['Home', 'Profile']" />
      </div>
      <div class="w-64">
        <UInputTags icon="i-lucide-rocket" size="lg" :model-value="['Home', 'Profile']" />
      </div>
      <div class="w-64">
        <UInputTags icon="i-lucide-rocket" size="xl" :model-value="['Home', 'Profile']" />
      </div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64">
        <UInputTags trailing-icon="i-lucide-arrow-right" size="xs" :model-value="['Home', 'Profile']" />
      </div>
      <div class="w-64">
        <UInputTags trailing-icon="i-lucide-arrow-right" size="sm" :model-value="['Home', 'Profile']" />
      </div>
      <div class="w-64">
        <UInputTags trailing-icon="i-lucide-arrow-right" size="md" :model-value="['Home', 'Profile']" />
      </div>
      <div class="w-64">
        <UInputTags trailing-icon="i-lucide-arrow-right" size="lg" :model-value="['Home', 'Profile']" />
      </div>
      <div class="w-64">
        <UInputTags trailing-icon="i-lucide-arrow-right" size="xl" :model-value="['Home', 'Profile']" />
      </div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64">
        <UInputTags :model-value="['Home', 'Profile']" />
      </div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64">
        <UInputTags loading :model-value="['Home', 'Profile']" />
      </div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64">
        <UInputTags fixed :model-value="['Home', 'Profile']" />
      </div>
    </div>
  </div>
</template>
