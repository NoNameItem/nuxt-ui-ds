<template>
  <div class="p-4 space-y-4">
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64">
        <UProgress orientation="horizontal" size="2xs" :model-value="40" />
      </div>
      <div class="w-64">
        <UProgress orientation="horizontal" size="xs" :model-value="40" />
      </div>
      <div class="w-64">
        <UProgress orientation="horizontal" size="sm" :model-value="40" />
      </div>
      <div class="w-64">
        <UProgress orientation="horizontal" size="md" :model-value="40" />
      </div>
      <div class="w-64">
        <UProgress orientation="horizontal" size="lg" :model-value="40" />
      </div>
      <div class="w-64">
        <UProgress orientation="horizontal" size="xl" :model-value="40" />
      </div>
      <div class="w-64">
        <UProgress orientation="horizontal" size="2xl" :model-value="40" />
      </div>
      <div class="h-32">
        <UProgress orientation="vertical" size="2xs" :model-value="40" />
      </div>
      <div class="h-32">
        <UProgress orientation="vertical" size="xs" :model-value="40" />
      </div>
      <div class="h-32">
        <UProgress orientation="vertical" size="sm" :model-value="40" />
      </div>
      <div class="h-32">
        <UProgress orientation="vertical" size="md" :model-value="40" />
      </div>
      <div class="h-32">
        <UProgress orientation="vertical" size="lg" :model-value="40" />
      </div>
      <div class="h-32">
        <UProgress orientation="vertical" size="xl" :model-value="40" />
      </div>
      <div class="h-32">
        <UProgress orientation="vertical" size="2xl" :model-value="40" />
      </div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64">
        <UProgress orientation="horizontal" inverted :model-value="40" />
      </div>
      <div class="h-32">
        <UProgress orientation="vertical" inverted :model-value="40" />
      </div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64">
        <UProgress orientation="horizontal" />
      </div>
      <div class="h-32">
        <UProgress orientation="vertical" />
      </div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64">
        <UProgress color="primary" :model-value="40" />
      </div>
      <div class="w-64">
        <UProgress color="secondary" :model-value="40" />
      </div>
      <div class="w-64">
        <UProgress color="success" :model-value="40" />
      </div>
      <div class="w-64">
        <UProgress color="info" :model-value="40" />
      </div>
      <div class="w-64">
        <UProgress color="warning" :model-value="40" />
      </div>
      <div class="w-64">
        <UProgress color="error" :model-value="40" />
      </div>
      <div class="w-64">
        <UProgress color="neutral" :model-value="40" />
      </div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64">
        <UProgress status :model-value="40" />
      </div>
      <div class="w-64">
        <UProgress :max="['Waiting', 'Cloning', 'Done']" :model-value="1" />
      </div>
    </div>
  </div>
</template>
