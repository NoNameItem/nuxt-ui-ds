<script setup lang="ts">
const files = [
  new File([''], 'demo.png', { type: 'image/png' }),
  new File([''], 'notes.txt', { type: 'text/plain' })
]
</script>

<template>
  <div class="p-4 space-y-4">
    <div class="w-full max-w-3xl flex flex-wrap gap-4 items-start">
      <div class="w-64"><UFileUpload highlight color="primary" /></div>
      <div class="w-64"><UFileUpload highlight color="secondary" /></div>
      <div class="w-64"><UFileUpload highlight color="success" /></div>
      <div class="w-64"><UFileUpload highlight color="info" /></div>
      <div class="w-64"><UFileUpload highlight color="warning" /></div>
      <div class="w-64"><UFileUpload highlight color="error" /></div>
      <div class="w-64"><UFileUpload highlight color="neutral" /></div>
    </div>
    <ClientOnly>
      <div class="w-full max-w-3xl flex flex-wrap gap-4 items-start">
        <div class="w-64"><UFileUpload layout="list" multiple :model-value="files" size="xs" /></div>
        <div class="w-64"><UFileUpload layout="list" multiple :model-value="files" size="sm" /></div>
        <div class="w-64"><UFileUpload layout="list" multiple :model-value="files" size="md" /></div>
        <div class="w-64"><UFileUpload layout="list" multiple :model-value="files" size="lg" /></div>
        <div class="w-64"><UFileUpload layout="list" multiple :model-value="files" size="xl" /></div>
      </div>
    </ClientOnly>
    <div class="w-full max-w-3xl flex flex-wrap gap-4 items-start">
      <div class="w-64"><UFileUpload variant="button" size="xs" /></div>
      <div class="w-64"><UFileUpload variant="button" size="sm" /></div>
      <div class="w-64"><UFileUpload variant="button" size="md" /></div>
      <div class="w-64"><UFileUpload variant="button" size="lg" /></div>
      <div class="w-64"><UFileUpload variant="button" size="xl" /></div>
    </div>
    <ClientOnly>
      <div class="w-full max-w-3xl flex flex-wrap gap-4 items-start">
        <div class="w-64"><UFileUpload layout="grid" multiple :model-value="files" /></div>
      </div>
    </ClientOnly>
    <div class="w-full max-w-3xl flex flex-wrap gap-4 items-start">
      <div class="w-64"><UFileUpload variant="area" /></div>
      <div class="w-64"><UFileUpload variant="button" /></div>
    </div>
    <div class="w-full max-w-3xl flex flex-wrap gap-4 items-start">
      <div class="w-64"><UFileUpload disabled /></div>
    </div>
    <div class="w-full max-w-3xl flex flex-wrap gap-4 items-start">
      <div class="w-64"><UFileUpload icon="i-lucide-rocket" label="Label" description="Description text for the parity testbed." /></div>
      <ClientOnly>
        <div class="w-64"><UFileUpload layout="list" multiple :model-value="files" /></div>
      </ClientOnly>
    </div>
    <ClientOnly>
      <div class="w-full max-w-3xl flex flex-wrap gap-4 items-start">
        <div class="w-64"><UFileUpload layout="list" multiple :model-value="files" position="inside" /></div>
        <div class="w-64"><UFileUpload layout="list" multiple :model-value="files" position="outside" /></div>
      </div>
    </ClientOnly>
    <div class="w-full max-w-3xl flex flex-wrap gap-4 items-start">
      <div class="w-64"><UFileUpload :dropzone="false" /></div>
    </div>
  </div>
</template>
