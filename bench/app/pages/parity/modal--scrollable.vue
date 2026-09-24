<template>
  <UModal open :portal="false" scrollable title="Title" description="Description text for the parity testbed.">
    <template #body>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
    </template>
    <template #footer>
      <UButton label="Label" />
      <UButton label="Label" variant="outline" />
    </template>
  </UModal>
</template>
