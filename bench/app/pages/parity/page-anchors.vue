<template>
  <div class="p-4 space-y-4">
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64">
        <UPageAnchors
          :links="[
            { label: 'Label', to: '#', icon: 'i-lucide-home' },
            { label: 'Label', to: '#', icon: 'i-lucide-user' },
            { label: 'Label', to: '#', icon: 'i-lucide-settings' }
          ]"
        />
      </div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64">
        <UPageAnchors
          :links="[
            { label: 'Label', to: '#', icon: 'i-lucide-home' },
            { label: 'Label', to: '#', icon: 'i-lucide-user', active: true },
            { label: 'Label', to: '#', icon: 'i-lucide-settings' }
          ]"
        />
      </div>
    </div>
  </div>
</template>
