<template>
  <div class="p-4 space-y-4">
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64"><UInputMenu variant="outline" placeholder="Placeholder" /></div>
      <div class="w-64"><UInputMenu variant="soft" placeholder="Placeholder" /></div>
      <div class="w-64"><UInputMenu variant="subtle" placeholder="Placeholder" /></div>
      <div class="w-64"><UInputMenu variant="ghost" placeholder="Placeholder" /></div>
      <div class="w-64"><UInputMenu variant="none" placeholder="Placeholder" /></div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64"><UInputMenu highlight color="primary" /></div>
      <div class="w-64"><UInputMenu highlight color="secondary" /></div>
      <div class="w-64"><UInputMenu highlight color="success" /></div>
      <div class="w-64"><UInputMenu highlight color="info" /></div>
      <div class="w-64"><UInputMenu highlight color="warning" /></div>
      <div class="w-64"><UInputMenu highlight color="error" /></div>
      <div class="w-64"><UInputMenu highlight color="neutral" /></div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64"><UInputMenu size="xs" /></div>
      <div class="w-64"><UInputMenu size="sm" /></div>
      <div class="w-64"><UInputMenu size="md" /></div>
      <div class="w-64"><UInputMenu size="lg" /></div>
      <div class="w-64"><UInputMenu size="xl" /></div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64"><UInputMenu icon="i-lucide-rocket" size="xs" /></div>
      <div class="w-64"><UInputMenu icon="i-lucide-rocket" size="sm" /></div>
      <div class="w-64"><UInputMenu icon="i-lucide-rocket" size="md" /></div>
      <div class="w-64"><UInputMenu icon="i-lucide-rocket" size="lg" /></div>
      <div class="w-64"><UInputMenu icon="i-lucide-rocket" size="xl" /></div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64"><UInputMenu trailing-icon="i-lucide-arrow-right" size="xs" /></div>
      <div class="w-64"><UInputMenu trailing-icon="i-lucide-arrow-right" size="sm" /></div>
      <div class="w-64"><UInputMenu trailing-icon="i-lucide-arrow-right" size="md" /></div>
      <div class="w-64"><UInputMenu trailing-icon="i-lucide-arrow-right" size="lg" /></div>
      <div class="w-64"><UInputMenu trailing-icon="i-lucide-arrow-right" size="xl" /></div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64"><UInputMenu :items="[{ label: 'Home', value: 'home', icon: 'i-lucide-home' }, { label: 'Profile', value: 'profile', icon: 'i-lucide-user' }, { label: 'Settings', value: 'settings', icon: 'i-lucide-settings' }, { label: 'Favorites', value: 'favorites', icon: 'i-lucide-star' }, { label: 'Mail', value: 'mail', icon: 'i-lucide-mail' }]" model-value="home" /></div>
      <div class="w-64 h-80"><UInputMenu :items="[{ label: 'Home', value: 'home', icon: 'i-lucide-home' }, { label: 'Profile', value: 'profile', icon: 'i-lucide-user' }, { label: 'Settings', value: 'settings', icon: 'i-lucide-settings' }, { label: 'Favorites', value: 'favorites', icon: 'i-lucide-star' }, { label: 'Mail', value: 'mail', icon: 'i-lucide-mail' }]" open :portal="false" /></div>
      <div class="w-64"><UInputMenu multiple :items="[{ label: 'Home', value: 'home', icon: 'i-lucide-home' }, { label: 'Profile', value: 'profile', icon: 'i-lucide-user' }, { label: 'Settings', value: 'settings', icon: 'i-lucide-settings' }, { label: 'Favorites', value: 'favorites', icon: 'i-lucide-star' }, { label: 'Mail', value: 'mail', icon: 'i-lucide-mail' }]" :model-value="['home', 'profile']" /></div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64"><UInputMenu loading /></div>
      <div class="w-64"><UInputMenu size="xs" fixed /></div>
      <div class="w-64 h-80"><UInputMenu :items="[{ label: 'Home', value: 'home', icon: 'i-lucide-home' }, { label: 'Profile', value: 'profile', icon: 'i-lucide-user' }, { label: 'Settings', value: 'settings', icon: 'i-lucide-settings' }, { label: 'Favorites', value: 'favorites', icon: 'i-lucide-star' }, { label: 'Mail', value: 'mail', icon: 'i-lucide-mail' }]" open :portal="false" virtualize /></div>
    </div>
  </div>
</template>
