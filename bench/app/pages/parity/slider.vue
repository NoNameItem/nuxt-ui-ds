<template>
  <div class="p-4 space-y-4">
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64"><USlider :model-value="40" size="xs" /></div>
      <div class="w-64"><USlider :model-value="40" size="sm" /></div>
      <div class="w-64"><USlider :model-value="40" size="md" /></div>
      <div class="w-64"><USlider :model-value="40" size="lg" /></div>
      <div class="w-64"><USlider :model-value="40" size="xl" /></div>
      <div class="h-32"><USlider :model-value="40" orientation="vertical" size="xs" /></div>
      <div class="h-32"><USlider :model-value="40" orientation="vertical" size="sm" /></div>
      <div class="h-32"><USlider :model-value="40" orientation="vertical" size="md" /></div>
      <div class="h-32"><USlider :model-value="40" orientation="vertical" size="lg" /></div>
      <div class="h-32"><USlider :model-value="40" orientation="vertical" size="xl" /></div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64"><USlider :model-value="40" color="primary" /></div>
      <div class="w-64"><USlider :model-value="40" color="secondary" /></div>
      <div class="w-64"><USlider :model-value="40" color="success" /></div>
      <div class="w-64"><USlider :model-value="40" color="info" /></div>
      <div class="w-64"><USlider :model-value="40" color="warning" /></div>
      <div class="w-64"><USlider :model-value="40" color="error" /></div>
      <div class="w-64"><USlider :model-value="40" color="neutral" /></div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64"><USlider :model-value="40" disabled /></div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64"><USlider :model-value="[20, 60]" /></div>
    </div>
  </div>
</template>
