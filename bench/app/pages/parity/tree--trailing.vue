<template>
  <div class="p-4 space-y-4">
    <!-- nuxt-ui-ds-882: linkTrailing у листа (Tree.vue:186 — item.trailingIcon || item.children?.length || слот item-trailing). Первая ячейка — контроль: хвост только у ветки -->
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64"><UTree :items="[{ label: 'Home', icon: 'i-lucide-home', defaultExpanded: true, children: [{ label: 'Profile', icon: 'i-lucide-user' }, { label: 'Settings', icon: 'i-lucide-settings' }] }]" /></div>
      <div class="w-64"><UTree :items="[{ label: 'Home', icon: 'i-lucide-home', defaultExpanded: true, children: [{ label: 'Profile', icon: 'i-lucide-user', trailingIcon: 'i-lucide-star' }, { label: 'Settings', icon: 'i-lucide-settings', trailingIcon: 'i-lucide-lock' }] }]" /></div>
      <div class="w-64">
        <UTree :items="[{ label: 'Movies', icon: 'i-lucide-film', size: '12 GB' }, { label: 'Shows', icon: 'i-lucide-tv', size: '3 GB' }]">
          <template #item-trailing="{ item }">{{ item.size }}</template>
        </UTree>
      </div>
    </div>
  </div>
</template>
