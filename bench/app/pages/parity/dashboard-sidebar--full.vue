<template>
  <UDashboardGroup>
    <UDashboardSidebar>
      <template #header>Title</template>
      <UNavigationMenu
        orientation="vertical"
        :items="[{ label: 'Home', icon: 'i-lucide-home' }, { label: 'Profile', icon: 'i-lucide-user' }, { label: 'Settings', icon: 'i-lucide-settings' }, { label: 'Favorites', icon: 'i-lucide-star' }, { label: 'Mail', icon: 'i-lucide-mail' }]"
      />
      <template #footer><UUser name="Ada Lovelace" description="Engineer" :avatar="{ src: '/parity/demo.png' }" /></template>
    </UDashboardSidebar>
    <UDashboardPanel>
      <template #header><UDashboardNavbar title="Title" /></template>
      <template #body>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</template>
      <template #footer><UDashboardToolbar><template #left><UButton label="Label" /></template></UDashboardToolbar></template>
    </UDashboardPanel>
  </UDashboardGroup>
</template>
