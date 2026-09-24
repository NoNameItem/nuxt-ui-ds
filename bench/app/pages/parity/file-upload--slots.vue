<template>
  <div class="p-4 space-y-4">
    <!-- nuxt-ui-ds-44m: именованный слот leading (FileUpload.vue:234) стоит прямо в wrapper и заменяет avatar/icon. Первая ячейка — контроль -->
    <div class="w-full max-w-3xl flex flex-wrap gap-4 items-start">
      <div class="w-64"><UFileUpload label="Label" /></div>
      <div class="w-64">
        <UFileUpload label="Label">
          <template #leading><UKbd value="a" /></template>
        </UFileUpload>
      </div>
    </div>
  </div>
</template>
