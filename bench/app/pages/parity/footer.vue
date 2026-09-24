<template>
  <div class="p-4 space-y-4">
    <div class="w-full max-w-3xl flex flex-wrap gap-4 items-start">
      <div class="w-full">
        <UFooter>
          <template #left>
            Title
          </template>
          <UNavigationMenu
            :items="[
              { label: 'Label', icon: 'i-lucide-home', to: '#' },
              { label: 'Label', icon: 'i-lucide-user', to: '#' },
              { label: 'Label', icon: 'i-lucide-settings', to: '#' }
            ]"
          />
          <template #right>
            <UButton icon="i-lucide-plus" square />
          </template>
        </UFooter>
      </div>
    </div>
  </div>
</template>
