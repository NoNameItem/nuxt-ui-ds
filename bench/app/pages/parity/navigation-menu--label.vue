<template>
  <div class="p-4 space-y-4">
    <!-- nuxt-ui-ds-g7z: пункт type:'label' — div[label] только вертикально без collapsed, ссылка не рисуется никогда (NavigationMenu.vue:184, :187). Первая ячейка — контроль без лейблов -->
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64"><UNavigationMenu orientation="vertical" :items="[{ label: 'Home', icon: 'i-lucide-home' }, { label: 'Profile', icon: 'i-lucide-user' }]" /></div>
      <div class="w-64"><UNavigationMenu orientation="vertical" :items="[{ label: 'Run', type: 'label' }, { label: 'Home', icon: 'i-lucide-home' }, { label: 'Findings', type: 'label' }, { label: 'Profile', icon: 'i-lucide-user' }]" /></div>
      <div class="w-64"><UNavigationMenu orientation="vertical" collapsed :items="[{ label: 'Run', type: 'label' }, { label: 'Home', icon: 'i-lucide-home' }, { label: 'Findings', type: 'label' }, { label: 'Profile', icon: 'i-lucide-user' }]" /></div>
      <div class="w-full max-w-3xl"><UNavigationMenu :items="[{ label: 'Run', type: 'label' }, { label: 'Home', icon: 'i-lucide-home' }, { label: 'Findings', type: 'label' }, { label: 'Profile', icon: 'i-lucide-user' }]" /></div>
    </div>
  </div>
</template>
