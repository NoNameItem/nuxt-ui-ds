<template>
  <div class="p-4 space-y-4">
    <!-- nuxt-ui-ds-44m: именованный слот leading (Empty.vue:42) стоит прямо в header и заменяет avatar. Первая ячейка — контроль -->
    <div class="w-full max-w-3xl flex flex-wrap gap-4 items-start">
      <div class="w-full"><UEmpty icon="i-lucide-rocket" title="Title" description="Description text for the parity testbed." /></div>
      <div class="w-full">
        <UEmpty icon="i-lucide-rocket" title="Title" description="Description text for the parity testbed.">
          <template #leading><UKbd value="a" /></template>
        </UEmpty>
      </div>
    </div>
  </div>
</template>
