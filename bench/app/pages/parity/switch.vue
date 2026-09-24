<template>
  <div class="p-4 space-y-4">
    <div class="flex flex-wrap gap-4 items-start">
      <USwitch label="Label" highlight color="primary" />
      <USwitch label="Label" highlight color="secondary" />
      <USwitch label="Label" highlight color="success" />
      <USwitch label="Label" highlight color="info" />
      <USwitch label="Label" highlight color="warning" />
      <USwitch label="Label" highlight color="error" />
      <USwitch label="Label" highlight color="neutral" />
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <USwitch label="Label" :model-value="true" color="primary" />
      <USwitch label="Label" :model-value="true" color="secondary" />
      <USwitch label="Label" :model-value="true" color="success" />
      <USwitch label="Label" :model-value="true" color="info" />
      <USwitch label="Label" :model-value="true" color="warning" />
      <USwitch label="Label" :model-value="true" color="error" />
      <USwitch label="Label" :model-value="true" color="neutral" />
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <USwitch label="Label" size="xs" />
      <USwitch label="Label" size="sm" />
      <USwitch label="Label" size="md" />
      <USwitch label="Label" size="lg" />
      <USwitch label="Label" size="xl" />
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <USwitch label="Label" disabled />
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <USwitch label="Label" />
      <USwitch label="Label" :model-value="true" />
      <USwitch label="Label" checked-icon="i-lucide-check" unchecked-icon="i-lucide-x" />
      <USwitch label="Label" loading />
      <USwitch label="Label" description="Description text for the parity testbed." />
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <USwitch label="Label" required />
    </div>
  </div>
</template>
