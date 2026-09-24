<template>
  <div class="p-4 space-y-4">
    <!-- Иконка при шевроне справа (по умолчанию). Библиотека считает
         `alone: !(hasContent && chevron === 'leading')` (ChatReasoning.vue:132, hasContent — :94),
         здесь это true, и leadingIcon остаётся обычной иконкой в потоке. Кит alone не передаёт,
         иконка получает вариант alone: false — absolute inset-0 и opacity-0 у раскрытого блока. -->
    <div class="w-full max-w-3xl flex flex-wrap gap-4 items-start">
      <div class="w-full"><UChatReasoning text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore." icon="i-lucide-brain" /></div>
    </div>
    <div class="w-full max-w-3xl flex flex-wrap gap-4 items-start">
      <div class="w-full"><UChatReasoning text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore." icon="i-lucide-brain" default-open /></div>
    </div>
  </div>
</template>
