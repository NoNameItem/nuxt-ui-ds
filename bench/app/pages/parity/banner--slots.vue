<template>
  <div class="p-4 space-y-4">
    <!-- nuxt-ui-ds-44m: именованный слот leading (Banner.vue:113) стоит прямо в center и заменяет icon. Первая ячейка — контроль -->
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-full"><UBanner title="Title" icon="i-lucide-rocket" /></div>
      <div class="w-full">
        <UBanner title="Title" icon="i-lucide-rocket">
          <template #leading><UKbd value="a" /></template>
        </UBanner>
      </div>
    </div>
  </div>
</template>
