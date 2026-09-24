<template>
  <div class="p-4 space-y-4">
    <div class="w-full max-w-3xl flex flex-wrap gap-4 items-start">
      <div class="w-full">
        <UHeader title="Title" toggle-side="left">
          <UNavigationMenu
            :items="[
              { label: 'Label', icon: 'i-lucide-home', to: '#' },
              { label: 'Label', icon: 'i-lucide-user', to: '#' },
              { label: 'Label', icon: 'i-lucide-settings', to: '#' }
            ]"
          />
          <template #right>
            <UButton label="Label" />
          </template>
        </UHeader>
      </div>
    </div>
    <div class="w-full max-w-3xl flex flex-wrap gap-4 items-start">
      <div class="w-full">
        <UHeader title="Title" toggle-side="right">
          <UNavigationMenu
            :items="[
              { label: 'Label', icon: 'i-lucide-home', to: '#' },
              { label: 'Label', icon: 'i-lucide-user', to: '#' },
              { label: 'Label', icon: 'i-lucide-settings', to: '#' }
            ]"
          />
          <template #right>
            <UButton label="Label" />
          </template>
        </UHeader>
      </div>
    </div>
  </div>
</template>
