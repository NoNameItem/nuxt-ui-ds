<template>
  <div class="p-4 space-y-4">
    <!-- nuxt-ui-ds-8cz: у пункта без детей NavigationMenuLink стоит с as-child (NavigationMenu.vue:188-193): своего элемента нет, data-active и aria-current="page" ложатся на саму ссылку. Слепая пара: пиксельного следа нет, проверка — зондом -->
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64"><UNavigationMenu orientation="vertical" :items="[{ label: 'Home', icon: 'i-lucide-home', active: true }, { label: 'Profile', icon: 'i-lucide-user' }]" /></div>
      <div class="w-full max-w-3xl"><UNavigationMenu :items="[{ label: 'Home', icon: 'i-lucide-home', active: true }, { label: 'Profile', icon: 'i-lucide-user' }]" /></div>
    </div>
  </div>
</template>
