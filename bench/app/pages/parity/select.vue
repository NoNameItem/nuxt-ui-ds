<template>
  <div class="p-4 space-y-4">
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64"><USelect variant="outline" placeholder="Placeholder" /></div>
      <div class="w-64"><USelect variant="soft" placeholder="Placeholder" /></div>
      <div class="w-64"><USelect variant="subtle" placeholder="Placeholder" /></div>
      <div class="w-64"><USelect variant="ghost" placeholder="Placeholder" /></div>
      <div class="w-64"><USelect variant="none" placeholder="Placeholder" /></div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64"><USelect highlight color="primary" /></div>
      <div class="w-64"><USelect highlight color="secondary" /></div>
      <div class="w-64"><USelect highlight color="success" /></div>
      <div class="w-64"><USelect highlight color="info" /></div>
      <div class="w-64"><USelect highlight color="warning" /></div>
      <div class="w-64"><USelect highlight color="error" /></div>
      <div class="w-64"><USelect highlight color="neutral" /></div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64"><USelect size="xs" /></div>
      <div class="w-64"><USelect size="sm" /></div>
      <div class="w-64"><USelect size="md" /></div>
      <div class="w-64"><USelect size="lg" /></div>
      <div class="w-64"><USelect size="xl" /></div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64"><USelect icon="i-lucide-rocket" size="xs" /></div>
      <div class="w-64"><USelect icon="i-lucide-rocket" size="sm" /></div>
      <div class="w-64"><USelect icon="i-lucide-rocket" size="md" /></div>
      <div class="w-64"><USelect icon="i-lucide-rocket" size="lg" /></div>
      <div class="w-64"><USelect icon="i-lucide-rocket" size="xl" /></div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64"><USelect trailing-icon="i-lucide-arrow-right" size="xs" /></div>
      <div class="w-64"><USelect trailing-icon="i-lucide-arrow-right" size="sm" /></div>
      <div class="w-64"><USelect trailing-icon="i-lucide-arrow-right" size="md" /></div>
      <div class="w-64"><USelect trailing-icon="i-lucide-arrow-right" size="lg" /></div>
      <div class="w-64"><USelect trailing-icon="i-lucide-arrow-right" size="xl" /></div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64"><USelect placeholder="Placeholder" /></div>
      <div class="w-64"><USelect :items="[{ label: 'Home', value: 'home', icon: 'i-lucide-home' }, { label: 'Profile', value: 'profile', icon: 'i-lucide-user' }, { label: 'Settings', value: 'settings', icon: 'i-lucide-settings' }, { label: 'Favorites', value: 'favorites', icon: 'i-lucide-star' }, { label: 'Mail', value: 'mail', icon: 'i-lucide-mail' }]" model-value="home" /></div>
      <div class="w-64"><USelect placeholder="Placeholder" disabled /></div>
      <div class="w-64 h-80"><USelect :items="[{ label: 'Home', value: 'home', icon: 'i-lucide-home' }, { label: 'Profile', value: 'profile', icon: 'i-lucide-user' }, { label: 'Settings', value: 'settings', icon: 'i-lucide-settings' }, { label: 'Favorites', value: 'favorites', icon: 'i-lucide-star' }, { label: 'Mail', value: 'mail', icon: 'i-lucide-mail' }]" open :portal="false" /></div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64"><USelect loading /></div>
      <div class="w-64"><USelect size="xs" fixed /></div>
    </div>
  </div>
</template>
