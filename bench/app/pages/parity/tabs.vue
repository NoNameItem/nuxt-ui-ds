<template>
  <div class="p-4 space-y-4">
    <!-- 1. orientation×variant: по записям (4) -->
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-80"><UTabs :items="[{ label: 'Label', icon: 'i-lucide-home' }, { label: 'Label', icon: 'i-lucide-user' }, { label: 'Label', icon: 'i-lucide-settings' }]" default-value="1" orientation="horizontal" variant="pill" /></div>
      <div class="w-80"><UTabs :items="[{ label: 'Label', icon: 'i-lucide-home' }, { label: 'Label', icon: 'i-lucide-user' }, { label: 'Label', icon: 'i-lucide-settings' }]" default-value="1" orientation="horizontal" variant="link" /></div>
      <div class="w-64"><UTabs :items="[{ label: 'Label', icon: 'i-lucide-home' }, { label: 'Label', icon: 'i-lucide-user' }, { label: 'Label', icon: 'i-lucide-settings' }]" default-value="1" orientation="vertical" variant="pill" /></div>
      <div class="w-64"><UTabs :items="[{ label: 'Label', icon: 'i-lucide-home' }, { label: 'Label', icon: 'i-lucide-user' }, { label: 'Label', icon: 'i-lucide-settings' }]" default-value="1" orientation="vertical" variant="link" /></div>
    </div>
    <!-- 2. color×variant: по записям (14) -->
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-80"><UTabs :items="[{ label: 'Label', icon: 'i-lucide-home' }, { label: 'Label', icon: 'i-lucide-user' }, { label: 'Label', icon: 'i-lucide-settings' }]" default-value="1" color="primary" variant="pill" /></div>
      <div class="w-80"><UTabs :items="[{ label: 'Label', icon: 'i-lucide-home' }, { label: 'Label', icon: 'i-lucide-user' }, { label: 'Label', icon: 'i-lucide-settings' }]" default-value="1" color="secondary" variant="pill" /></div>
      <div class="w-80"><UTabs :items="[{ label: 'Label', icon: 'i-lucide-home' }, { label: 'Label', icon: 'i-lucide-user' }, { label: 'Label', icon: 'i-lucide-settings' }]" default-value="1" color="success" variant="pill" /></div>
      <div class="w-80"><UTabs :items="[{ label: 'Label', icon: 'i-lucide-home' }, { label: 'Label', icon: 'i-lucide-user' }, { label: 'Label', icon: 'i-lucide-settings' }]" default-value="1" color="info" variant="pill" /></div>
      <div class="w-80"><UTabs :items="[{ label: 'Label', icon: 'i-lucide-home' }, { label: 'Label', icon: 'i-lucide-user' }, { label: 'Label', icon: 'i-lucide-settings' }]" default-value="1" color="warning" variant="pill" /></div>
      <div class="w-80"><UTabs :items="[{ label: 'Label', icon: 'i-lucide-home' }, { label: 'Label', icon: 'i-lucide-user' }, { label: 'Label', icon: 'i-lucide-settings' }]" default-value="1" color="error" variant="pill" /></div>
      <div class="w-80"><UTabs :items="[{ label: 'Label', icon: 'i-lucide-home' }, { label: 'Label', icon: 'i-lucide-user' }, { label: 'Label', icon: 'i-lucide-settings' }]" default-value="1" color="neutral" variant="pill" /></div>
      <div class="w-80"><UTabs :items="[{ label: 'Label', icon: 'i-lucide-home' }, { label: 'Label', icon: 'i-lucide-user' }, { label: 'Label', icon: 'i-lucide-settings' }]" default-value="1" color="primary" variant="link" /></div>
      <div class="w-80"><UTabs :items="[{ label: 'Label', icon: 'i-lucide-home' }, { label: 'Label', icon: 'i-lucide-user' }, { label: 'Label', icon: 'i-lucide-settings' }]" default-value="1" color="secondary" variant="link" /></div>
      <div class="w-80"><UTabs :items="[{ label: 'Label', icon: 'i-lucide-home' }, { label: 'Label', icon: 'i-lucide-user' }, { label: 'Label', icon: 'i-lucide-settings' }]" default-value="1" color="success" variant="link" /></div>
      <div class="w-80"><UTabs :items="[{ label: 'Label', icon: 'i-lucide-home' }, { label: 'Label', icon: 'i-lucide-user' }, { label: 'Label', icon: 'i-lucide-settings' }]" default-value="1" color="info" variant="link" /></div>
      <div class="w-80"><UTabs :items="[{ label: 'Label', icon: 'i-lucide-home' }, { label: 'Label', icon: 'i-lucide-user' }, { label: 'Label', icon: 'i-lucide-settings' }]" default-value="1" color="warning" variant="link" /></div>
      <div class="w-80"><UTabs :items="[{ label: 'Label', icon: 'i-lucide-home' }, { label: 'Label', icon: 'i-lucide-user' }, { label: 'Label', icon: 'i-lucide-settings' }]" default-value="1" color="error" variant="link" /></div>
      <div class="w-80"><UTabs :items="[{ label: 'Label', icon: 'i-lucide-home' }, { label: 'Label', icon: 'i-lucide-user' }, { label: 'Label', icon: 'i-lucide-settings' }]" default-value="1" color="neutral" variant="link" /></div>
    </div>
    <!-- 3. size (5) -->
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-80"><UTabs :items="[{ label: 'Label', icon: 'i-lucide-home' }, { label: 'Label', icon: 'i-lucide-user' }, { label: 'Label', icon: 'i-lucide-settings' }]" default-value="1" size="xs" /></div>
      <div class="w-80"><UTabs :items="[{ label: 'Label', icon: 'i-lucide-home' }, { label: 'Label', icon: 'i-lucide-user' }, { label: 'Label', icon: 'i-lucide-settings' }]" default-value="1" size="sm" /></div>
      <div class="w-80"><UTabs :items="[{ label: 'Label', icon: 'i-lucide-home' }, { label: 'Label', icon: 'i-lucide-user' }, { label: 'Label', icon: 'i-lucide-settings' }]" default-value="1" size="md" /></div>
      <div class="w-80"><UTabs :items="[{ label: 'Label', icon: 'i-lucide-home' }, { label: 'Label', icon: 'i-lucide-user' }, { label: 'Label', icon: 'i-lucide-settings' }]" default-value="1" size="lg" /></div>
      <div class="w-80"><UTabs :items="[{ label: 'Label', icon: 'i-lucide-home' }, { label: 'Label', icon: 'i-lucide-user' }, { label: 'Label', icon: 'i-lucide-settings' }]" default-value="1" size="xl" /></div>
    </div>
    <!-- 4. контент: иконки + badge; с content (длинный текст) -->
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-80"><UTabs :items="[{ label: 'Label', icon: 'i-lucide-home' }, { label: 'Label', icon: 'i-lucide-user', badge: '42' }, { label: 'Label', icon: 'i-lucide-settings' }]" default-value="1" /></div>
      <div class="w-80"><UTabs :items="[{ label: 'Label', icon: 'i-lucide-home' }, { label: 'Label', icon: 'i-lucide-user', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.' }, { label: 'Label', icon: 'i-lucide-settings' }]" default-value="1" /></div>
    </div>
  </div>
</template>
