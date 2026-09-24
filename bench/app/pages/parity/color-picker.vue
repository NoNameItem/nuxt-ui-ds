<template>
  <div class="p-4 space-y-4">
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64">
        <UColorPicker size="xs" :model-value="'#0ea5e9'" />
      </div>
      <div class="w-64">
        <UColorPicker size="sm" :model-value="'#0ea5e9'" />
      </div>
      <div class="w-64">
        <UColorPicker size="md" :model-value="'#0ea5e9'" />
      </div>
      <div class="w-64">
        <UColorPicker size="lg" :model-value="'#0ea5e9'" />
      </div>
      <div class="w-64">
        <UColorPicker size="xl" :model-value="'#0ea5e9'" />
      </div>
    </div>
  </div>
</template>
