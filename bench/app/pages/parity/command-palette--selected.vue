<template>
  <div class="p-4 space-y-4">
    <!-- Пример «Selected Icon» doc-страницы CommandPalette без аватаров: выбран первый пункт.
         У пунктов нет ни `to`, ни `active`, поэтому библиотека рисует их неактивными
         (CommandPalette.vue:257, `active: active || item.active`; Link.vue:111 — без `to` false),
         а выбранный отмечает только selectedIcon. -->
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-full max-w-3xl">
        <UCommandPalette
          :groups="[{ id: 'users', label: 'Users', items: [{ label: 'Benjamin Canac', suffix: 'benjamincanac' }, { label: 'Romain Hamel', suffix: 'romhml' }, { label: 'Sébastien Chopin', suffix: 'atinux' }] }]"
          :model-value="[{ label: 'Benjamin Canac', suffix: 'benjamincanac' }]"
          multiple
          selected-icon="i-lucide-circle-check"
          :autofocus="false"
          placeholder="Placeholder"
        />
      </div>
    </div>
  </div>
</template>
