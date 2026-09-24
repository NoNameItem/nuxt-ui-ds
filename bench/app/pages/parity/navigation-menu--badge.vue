<template>
  <div class="p-4 space-y-4">
    <!-- nuxt-ui-ds-8cz: badge пункта объектом пропов — v-bind целиком, class доходит до UBadge (NavigationMenu.vue:165). Первая ячейка — контроль: badge строкой -->
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64"><UNavigationMenu orientation="vertical" :items="[{ label: 'Home', icon: 'i-lucide-home', badge: '42' }, { label: 'Profile', icon: 'i-lucide-user', badge: '7' }]" /></div>
      <div class="w-64"><UNavigationMenu orientation="vertical" :items="[{ label: 'Home', icon: 'i-lucide-home', badge: { label: '42', class: 'rounded-full' } }, { label: 'Profile', icon: 'i-lucide-user', badge: { label: '7', color: 'primary', variant: 'solid', class: 'rounded-full' } }]" /></div>
    </div>
  </div>
</template>
