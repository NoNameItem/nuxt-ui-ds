<template>
  <div class="p-4 space-y-4">
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64">
        <UInputDate variant="outline" />
      </div>
      <div class="w-64">
        <UInputDate variant="soft" />
      </div>
      <div class="w-64">
        <UInputDate variant="subtle" />
      </div>
      <div class="w-64">
        <UInputDate variant="ghost" />
      </div>
      <div class="w-64">
        <UInputDate variant="none" />
      </div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64">
        <UInputDate highlight color="primary" />
      </div>
      <div class="w-64">
        <UInputDate highlight color="secondary" />
      </div>
      <div class="w-64">
        <UInputDate highlight color="success" />
      </div>
      <div class="w-64">
        <UInputDate highlight color="info" />
      </div>
      <div class="w-64">
        <UInputDate highlight color="warning" />
      </div>
      <div class="w-64">
        <UInputDate highlight color="error" />
      </div>
      <div class="w-64">
        <UInputDate highlight color="neutral" />
      </div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64">
        <UInputDate size="xs" />
      </div>
      <div class="w-64">
        <UInputDate size="sm" />
      </div>
      <div class="w-64">
        <UInputDate size="md" />
      </div>
      <div class="w-64">
        <UInputDate size="lg" />
      </div>
      <div class="w-64">
        <UInputDate size="xl" />
      </div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64">
        <UInputDate icon="i-lucide-rocket" size="xs" />
      </div>
      <div class="w-64">
        <UInputDate icon="i-lucide-rocket" size="sm" />
      </div>
      <div class="w-64">
        <UInputDate icon="i-lucide-rocket" size="md" />
      </div>
      <div class="w-64">
        <UInputDate icon="i-lucide-rocket" size="lg" />
      </div>
      <div class="w-64">
        <UInputDate icon="i-lucide-rocket" size="xl" />
      </div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64">
        <UInputDate trailing-icon="i-lucide-arrow-right" size="xs" />
      </div>
      <div class="w-64">
        <UInputDate trailing-icon="i-lucide-arrow-right" size="sm" />
      </div>
      <div class="w-64">
        <UInputDate trailing-icon="i-lucide-arrow-right" size="md" />
      </div>
      <div class="w-64">
        <UInputDate trailing-icon="i-lucide-arrow-right" size="lg" />
      </div>
      <div class="w-64">
        <UInputDate trailing-icon="i-lucide-arrow-right" size="xl" />
      </div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64">
        <UInputDate />
      </div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64">
        <UInputDate loading />
      </div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64">
        <UInputDate fixed />
      </div>
    </div>
  </div>
</template>
