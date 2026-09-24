<template>
  <div class="p-4 space-y-4">
    <div class="flex flex-wrap gap-4 items-start">
      <UFieldGroup orientation="horizontal">
        <UButton label="Label" variant="outline" />
        <UButton label="Label" variant="outline" />
      </UFieldGroup>
      <UFieldGroup orientation="vertical">
        <UButton label="Label" variant="outline" />
        <UButton label="Label" variant="outline" />
      </UFieldGroup>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <UFieldGroup orientation="horizontal">
        <UInput placeholder="Placeholder" />
        <UButton icon="i-lucide-plus" />
      </UFieldGroup>
    </div>
  </div>
</template>
