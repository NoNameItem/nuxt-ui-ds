<template>
  <USidebar side="left" variant="floating" rail>
    <template #header>Title</template>
    <UNavigationMenu
      orientation="vertical"
      :items="[{ label: 'Home', icon: 'i-lucide-home' }, { label: 'Profile', icon: 'i-lucide-user' }, { label: 'Settings', icon: 'i-lucide-settings' }, { label: 'Favorites', icon: 'i-lucide-star' }, { label: 'Mail', icon: 'i-lucide-mail' }]"
    />
    <template #footer><UUser name="Ada Lovelace" description="Engineer" :avatar="{ src: '/parity/demo.png' }" /></template>
  </USidebar>
  <UMain><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p></UMain>
</template>
