<template>
  <div class="p-4 space-y-4">
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64">
        <UInputNumber variant="outline" :model-value="42" />
      </div>
      <div class="w-64">
        <UInputNumber variant="soft" :model-value="42" />
      </div>
      <div class="w-64">
        <UInputNumber variant="subtle" :model-value="42" />
      </div>
      <div class="w-64">
        <UInputNumber variant="ghost" :model-value="42" />
      </div>
      <div class="w-64">
        <UInputNumber variant="none" :model-value="42" />
      </div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64">
        <UInputNumber highlight color="primary" :model-value="42" />
      </div>
      <div class="w-64">
        <UInputNumber highlight color="secondary" :model-value="42" />
      </div>
      <div class="w-64">
        <UInputNumber highlight color="success" :model-value="42" />
      </div>
      <div class="w-64">
        <UInputNumber highlight color="info" :model-value="42" />
      </div>
      <div class="w-64">
        <UInputNumber highlight color="warning" :model-value="42" />
      </div>
      <div class="w-64">
        <UInputNumber highlight color="error" :model-value="42" />
      </div>
      <div class="w-64">
        <UInputNumber highlight color="neutral" :model-value="42" />
      </div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64">
        <UInputNumber size="xs" :model-value="42" />
      </div>
      <div class="w-64">
        <UInputNumber size="sm" :model-value="42" />
      </div>
      <div class="w-64">
        <UInputNumber size="md" :model-value="42" />
      </div>
      <div class="w-64">
        <UInputNumber size="lg" :model-value="42" />
      </div>
      <div class="w-64">
        <UInputNumber size="xl" :model-value="42" />
      </div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64">
        <UInputNumber orientation="horizontal" :model-value="42" />
      </div>
      <div class="w-64">
        <UInputNumber orientation="vertical" :model-value="42" />
      </div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64">
        <UInputNumber disabled :model-value="42" />
      </div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64">
        <UInputNumber fixed :model-value="42" />
      </div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64">
        <UInputNumber :increment="false" :model-value="42" />
      </div>
      <div class="w-64">
        <UInputNumber :decrement="false" :model-value="42" />
      </div>
    </div>
  </div>
</template>
