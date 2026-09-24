<template>
  <div class="p-4 space-y-4">
    <div class="flex flex-wrap gap-4 items-start">
      <UCheckbox label="Label" variant="card" indicator="start" />
      <UCheckbox label="Label" variant="card" indicator="end" />
      <UCheckbox label="Label" variant="card" indicator="hidden" />
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <UCheckbox label="Label" indicator="hidden" size="xs" />
      <UCheckbox label="Label" indicator="hidden" size="sm" />
      <UCheckbox label="Label" indicator="hidden" size="md" />
      <UCheckbox label="Label" indicator="hidden" size="lg" />
      <UCheckbox label="Label" indicator="hidden" size="xl" />
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <UCheckbox label="Label" variant="card" size="xs" />
      <UCheckbox label="Label" variant="card" size="sm" />
      <UCheckbox label="Label" variant="card" size="md" />
      <UCheckbox label="Label" variant="card" size="lg" />
      <UCheckbox label="Label" variant="card" size="xl" />
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <UCheckbox label="Label" variant="card" color="primary" />
      <UCheckbox label="Label" variant="card" color="secondary" />
      <UCheckbox label="Label" variant="card" color="success" />
      <UCheckbox label="Label" variant="card" color="info" />
      <UCheckbox label="Label" variant="card" color="warning" />
      <UCheckbox label="Label" variant="card" color="error" />
      <UCheckbox label="Label" variant="card" color="neutral" />
      <UCheckbox label="Label" variant="card" color="primary" :model-value="true" />
      <UCheckbox label="Label" variant="card" color="secondary" :model-value="true" />
      <UCheckbox label="Label" variant="card" color="success" :model-value="true" />
      <UCheckbox label="Label" variant="card" color="info" :model-value="true" />
      <UCheckbox label="Label" variant="card" color="warning" :model-value="true" />
      <UCheckbox label="Label" variant="card" color="error" :model-value="true" />
      <UCheckbox label="Label" variant="card" color="neutral" :model-value="true" />
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <UCheckbox label="Label" indicator="start" color="primary" />
      <UCheckbox label="Label" indicator="end" color="primary" />
      <UCheckbox label="Label" indicator="start" color="secondary" />
      <UCheckbox label="Label" indicator="end" color="secondary" />
      <UCheckbox label="Label" indicator="start" color="success" />
      <UCheckbox label="Label" indicator="end" color="success" />
      <UCheckbox label="Label" indicator="start" color="info" />
      <UCheckbox label="Label" indicator="end" color="info" />
      <UCheckbox label="Label" indicator="start" color="warning" />
      <UCheckbox label="Label" indicator="end" color="warning" />
      <UCheckbox label="Label" indicator="start" color="error" />
      <UCheckbox label="Label" indicator="end" color="error" />
      <UCheckbox label="Label" indicator="start" color="neutral" />
      <UCheckbox label="Label" indicator="end" color="neutral" />
      <UCheckbox label="Label" indicator="hidden" color="primary" />
      <UCheckbox label="Label" indicator="hidden" color="secondary" />
      <UCheckbox label="Label" indicator="hidden" color="success" />
      <UCheckbox label="Label" indicator="hidden" color="info" />
      <UCheckbox label="Label" indicator="hidden" color="warning" />
      <UCheckbox label="Label" indicator="hidden" color="error" />
      <UCheckbox label="Label" indicator="hidden" color="neutral" />
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <UCheckbox label="Label" indicator="hidden" highlight color="primary" />
      <UCheckbox label="Label" indicator="hidden" highlight color="secondary" />
      <UCheckbox label="Label" indicator="hidden" highlight color="success" />
      <UCheckbox label="Label" indicator="hidden" highlight color="info" />
      <UCheckbox label="Label" indicator="hidden" highlight color="warning" />
      <UCheckbox label="Label" indicator="hidden" highlight color="error" />
      <UCheckbox label="Label" indicator="hidden" highlight color="neutral" />
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <UCheckbox label="Label" highlight color="primary" />
      <UCheckbox label="Label" highlight color="secondary" />
      <UCheckbox label="Label" highlight color="success" />
      <UCheckbox label="Label" highlight color="info" />
      <UCheckbox label="Label" highlight color="warning" />
      <UCheckbox label="Label" highlight color="error" />
      <UCheckbox label="Label" highlight color="neutral" />
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <UCheckbox label="Label" :model-value="true" color="primary" />
      <UCheckbox label="Label" :model-value="true" color="secondary" />
      <UCheckbox label="Label" :model-value="true" color="success" />
      <UCheckbox label="Label" :model-value="true" color="info" />
      <UCheckbox label="Label" :model-value="true" color="warning" />
      <UCheckbox label="Label" :model-value="true" color="error" />
      <UCheckbox label="Label" :model-value="true" color="neutral" />
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <UCheckbox label="Label" />
      <UCheckbox label="Label" :model-value="true" />
      <UCheckbox label="Label" model-value="indeterminate" />
      <UCheckbox label="Label" description="Description text for the parity testbed." />
      <UCheckbox label="Label" disabled />
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <UCheckbox label="Label" required />
    </div>
  </div>
</template>
