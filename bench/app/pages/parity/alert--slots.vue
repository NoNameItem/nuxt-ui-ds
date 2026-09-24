<template>
  <div class="p-4 space-y-4">
    <!-- nuxt-ui-ds-44m: именованный слот leading (Alert.vue:45) стоит прямо в корне и заменяет avatar/icon. Первая ячейка — контроль -->
    <div class="w-full max-w-3xl flex flex-wrap gap-4 items-start">
      <div class="w-full"><UAlert title="Title" icon="i-lucide-rocket" /></div>
      <div class="w-full">
        <UAlert title="Title" icon="i-lucide-rocket">
          <template #leading><UKbd value="a" /></template>
        </UAlert>
      </div>
    </div>
  </div>
</template>
