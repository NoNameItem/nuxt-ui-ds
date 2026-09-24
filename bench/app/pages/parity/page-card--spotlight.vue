<template>
  <div class="p-4 space-y-4">
    <!-- Подсветка у карточки в левом верхнем углу страницы. useMouseInElement на монтировании
         даёт elementX = 0 − rect.left, elementY = 0 − rect.top (VueUse 14.4, tryOnMounted(update)),
         то есть не ноль, и вариант spotlight включён (PageCard.vue:44) с центром градиента в
         (−16, −16). На странице page-card карточки с подсветкой стоят ниже y 1700, центр уходит
         далеко вверх, и свечения не видно ни у кого — поэтому там пара в ноль при разном DOM. -->
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-80">
        <UPageCard spotlight spotlight-color="primary" title="Title" description="Description text for the parity testbed." icon="i-lucide-rocket" />
      </div>
    </div>
  </div>
</template>
