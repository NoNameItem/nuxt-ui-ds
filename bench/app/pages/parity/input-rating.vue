<template>
  <div class="p-4 space-y-4">
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64">
        <UInputRating orientation="horizontal" :model-value="3" />
      </div>
      <div class="w-64">
        <UInputRating orientation="vertical" :model-value="3" />
      </div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64">
        <UInputRating size="xs" :model-value="3" />
      </div>
      <div class="w-64">
        <UInputRating size="sm" :model-value="3" />
      </div>
      <div class="w-64">
        <UInputRating size="md" :model-value="3" />
      </div>
      <div class="w-64">
        <UInputRating size="lg" :model-value="3" />
      </div>
      <div class="w-64">
        <UInputRating size="xl" :model-value="3" />
      </div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64">
        <UInputRating color="primary" :model-value="3" />
      </div>
      <div class="w-64">
        <UInputRating color="secondary" :model-value="3" />
      </div>
      <div class="w-64">
        <UInputRating color="success" :model-value="3" />
      </div>
      <div class="w-64">
        <UInputRating color="info" :model-value="3" />
      </div>
      <div class="w-64">
        <UInputRating color="warning" :model-value="3" />
      </div>
      <div class="w-64">
        <UInputRating color="error" :model-value="3" />
      </div>
      <div class="w-64">
        <UInputRating color="neutral" :model-value="3" />
      </div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64">
        <UInputRating :model-value="3.5" />
      </div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64">
        <UInputRating disabled :model-value="3" />
      </div>
    </div>
  </div>
</template>
