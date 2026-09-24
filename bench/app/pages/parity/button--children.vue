<template>
  <div class="p-4 space-y-4">
    <!-- nuxt-ui-ds-37v: безымянный слот (children) — внутри <button>, вместо span[label] (Button.vue:150). Первая ячейка — контроль: то же через label -->
    <div class="flex flex-wrap gap-4 items-start">
      <UButton label="Label" />
      <UButton>Label</UButton>
      <UButton leading-icon="i-lucide-rocket">Label</UButton>
      <UButton trailing-icon="i-lucide-arrow-right">Label</UButton>
      <UButton color="neutral" variant="outline">Label<UKbd value="d" /></UButton>
    </div>
  </div>
</template>
