<template>
  <div class="p-4 space-y-4">
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64"><USelectMenu variant="outline" placeholder="Placeholder" /></div>
      <div class="w-64"><USelectMenu variant="soft" placeholder="Placeholder" /></div>
      <div class="w-64"><USelectMenu variant="subtle" placeholder="Placeholder" /></div>
      <div class="w-64"><USelectMenu variant="ghost" placeholder="Placeholder" /></div>
      <div class="w-64"><USelectMenu variant="none" placeholder="Placeholder" /></div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64"><USelectMenu highlight color="primary" /></div>
      <div class="w-64"><USelectMenu highlight color="secondary" /></div>
      <div class="w-64"><USelectMenu highlight color="success" /></div>
      <div class="w-64"><USelectMenu highlight color="info" /></div>
      <div class="w-64"><USelectMenu highlight color="warning" /></div>
      <div class="w-64"><USelectMenu highlight color="error" /></div>
      <div class="w-64"><USelectMenu highlight color="neutral" /></div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64"><USelectMenu size="xs" /></div>
      <div class="w-64"><USelectMenu size="sm" /></div>
      <div class="w-64"><USelectMenu size="md" /></div>
      <div class="w-64"><USelectMenu size="lg" /></div>
      <div class="w-64"><USelectMenu size="xl" /></div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64"><USelectMenu icon="i-lucide-rocket" size="xs" /></div>
      <div class="w-64"><USelectMenu icon="i-lucide-rocket" size="sm" /></div>
      <div class="w-64"><USelectMenu icon="i-lucide-rocket" size="md" /></div>
      <div class="w-64"><USelectMenu icon="i-lucide-rocket" size="lg" /></div>
      <div class="w-64"><USelectMenu icon="i-lucide-rocket" size="xl" /></div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64"><USelectMenu trailing-icon="i-lucide-arrow-right" size="xs" /></div>
      <div class="w-64"><USelectMenu trailing-icon="i-lucide-arrow-right" size="sm" /></div>
      <div class="w-64"><USelectMenu trailing-icon="i-lucide-arrow-right" size="md" /></div>
      <div class="w-64"><USelectMenu trailing-icon="i-lucide-arrow-right" size="lg" /></div>
      <div class="w-64"><USelectMenu trailing-icon="i-lucide-arrow-right" size="xl" /></div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64"><USelectMenu placeholder="Placeholder" /></div>
      <div class="w-64"><USelectMenu :items="[{ label: 'Home', value: 'home', icon: 'i-lucide-home' }, { label: 'Profile', value: 'profile', icon: 'i-lucide-user' }, { label: 'Settings', value: 'settings', icon: 'i-lucide-settings' }, { label: 'Favorites', value: 'favorites', icon: 'i-lucide-star' }, { label: 'Mail', value: 'mail', icon: 'i-lucide-mail' }]" model-value="home" /></div>
      <div class="w-64 h-80"><USelectMenu :items="[{ label: 'Home', value: 'home', icon: 'i-lucide-home' }, { label: 'Profile', value: 'profile', icon: 'i-lucide-user' }, { label: 'Settings', value: 'settings', icon: 'i-lucide-settings' }, { label: 'Favorites', value: 'favorites', icon: 'i-lucide-star' }, { label: 'Mail', value: 'mail', icon: 'i-lucide-mail' }]" open :portal="false" /></div>
      <div class="w-64"><USelectMenu multiple :items="[{ label: 'Home', value: 'home', icon: 'i-lucide-home' }, { label: 'Profile', value: 'profile', icon: 'i-lucide-user' }, { label: 'Settings', value: 'settings', icon: 'i-lucide-settings' }, { label: 'Favorites', value: 'favorites', icon: 'i-lucide-star' }, { label: 'Mail', value: 'mail', icon: 'i-lucide-mail' }]" :model-value="['home', 'profile']" /></div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64"><USelectMenu loading /></div>
      <div class="w-64"><USelectMenu size="xs" fixed /></div>
      <div class="w-64 h-80"><USelectMenu :items="[{ label: 'Home', value: 'home', icon: 'i-lucide-home' }, { label: 'Profile', value: 'profile', icon: 'i-lucide-user' }, { label: 'Settings', value: 'settings', icon: 'i-lucide-settings' }, { label: 'Favorites', value: 'favorites', icon: 'i-lucide-star' }, { label: 'Mail', value: 'mail', icon: 'i-lucide-mail' }]" open :portal="false" virtualize /></div>
    </div>
  </div>
</template>
