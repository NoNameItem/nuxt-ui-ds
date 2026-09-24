<template>
  <UDrawer open :portal="false" title="Title" description="Description text for the parity testbed." direction="top">
    <template #body>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.
    </template>
    <template #footer>
      <UButton label="Label" />
      <UButton label="Label" variant="outline" />
    </template>
  </UDrawer>
</template>
