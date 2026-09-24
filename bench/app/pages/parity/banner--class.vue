<template>
  <div class="p-4 space-y-4">
    <!-- Примеры title, icon и actions doc-страницы Banner: все с class="!p-0". Страница banner
         class не передаёт, а приёмка тем пишет у этих примеров «узлов нет: container, left,
         center, right» — здесь сценарий doc-страницы сверяется с библиотекой. -->
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-full"><UBanner title="This is a banner with an important message." class="!p-0" /></div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-full"><UBanner title="This is a banner with an icon." icon="i-lucide-info" class="!p-0" /></div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-full"><UBanner title="This is a banner with actions." :actions="[{ label: 'Action 1', variant: 'outline' }, { label: 'Action 2', trailingIcon: 'i-lucide-arrow-right' }]" class="!p-0" /></div>
    </div>
  </div>
</template>
