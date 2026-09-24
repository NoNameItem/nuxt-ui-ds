<script setup>
const open = ref(true)
</script>

<template>
  <UDashboardGroup>
    <UDashboardPanel />
    <UDashboardSearch
      v-model:open="open"
      :portal="false"
      fullscreen
      :groups="[{ id: 'a', label: 'Label', items: [{ label: 'Home', icon: 'i-lucide-home', kbds: ['meta', 'K'] }, { label: 'Profile', icon: 'i-lucide-user' }, { label: 'Settings', icon: 'i-lucide-settings' }, { label: 'Favorites', icon: 'i-lucide-star' }, { label: 'Mail', icon: 'i-lucide-mail' }] }]"
    />
  </UDashboardGroup>
</template>
