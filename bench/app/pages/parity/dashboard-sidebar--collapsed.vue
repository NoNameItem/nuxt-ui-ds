<template>
  <UDashboardGroup>
    <UDashboardSidebar :collapsed="true">
      <template #header>Title</template>
      <template #default="{ collapsed }">
        <UNavigationMenu
          orientation="vertical"
          :collapsed="collapsed"
          :items="[{ label: 'Home', icon: 'i-lucide-home' }, { label: 'Profile', icon: 'i-lucide-user' }, { label: 'Settings', icon: 'i-lucide-settings' }, { label: 'Favorites', icon: 'i-lucide-star' }, { label: 'Mail', icon: 'i-lucide-mail' }]"
        />
      </template>
      <template #footer><UUser name="Ada Lovelace" description="Engineer" :avatar="{ src: '/parity/demo.png' }" /></template>
    </UDashboardSidebar>
    <UDashboardPanel>
      <template #body>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</template>
    </UDashboardPanel>
  </UDashboardGroup>
</template>
