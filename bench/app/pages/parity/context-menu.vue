<template>
  <div class="p-4 space-y-4">
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64 h-80">
        <UContextMenu
          :items="[
            { label: 'Label', color: 'primary' }, { label: 'Label', color: 'primary', active: true },
            { label: 'Label', color: 'secondary' }, { label: 'Label', color: 'secondary', active: true },
            { label: 'Label', color: 'success' }, { label: 'Label', color: 'success', active: true },
            { label: 'Label', color: 'info' }, { label: 'Label', color: 'info', active: true },
            { label: 'Label', color: 'warning' }, { label: 'Label', color: 'warning', active: true },
            { label: 'Label', color: 'error' }, { label: 'Label', color: 'error', active: true }
          ]"
          :portal="false"
        >
          <UButton label="Label" variant="outline" />
        </UContextMenu>
      </div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64 h-80">
        <UContextMenu :items="[{ label: 'Label', color: 'error' }]" :portal="false">
          <UButton label="Label" variant="outline" />
        </UContextMenu>
      </div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64 h-80">
        <UContextMenu
          :items="[{ label: 'Home', icon: 'i-lucide-home' }, { label: 'Profile', icon: 'i-lucide-user' }, { label: 'Settings', icon: 'i-lucide-settings' }, { label: 'Favorites', icon: 'i-lucide-star' }, { label: 'Mail', icon: 'i-lucide-mail' }]"
          size="xs"
          :portal="false"
        >
          <UButton label="Label" variant="outline" />
        </UContextMenu>
      </div>
      <div class="w-64 h-80">
        <UContextMenu
          :items="[{ label: 'Home', icon: 'i-lucide-home' }, { label: 'Profile', icon: 'i-lucide-user' }, { label: 'Settings', icon: 'i-lucide-settings' }, { label: 'Favorites', icon: 'i-lucide-star' }, { label: 'Mail', icon: 'i-lucide-mail' }]"
          size="sm"
          :portal="false"
        >
          <UButton label="Label" variant="outline" />
        </UContextMenu>
      </div>
      <div class="w-64 h-80">
        <UContextMenu
          :items="[{ label: 'Home', icon: 'i-lucide-home' }, { label: 'Profile', icon: 'i-lucide-user' }, { label: 'Settings', icon: 'i-lucide-settings' }, { label: 'Favorites', icon: 'i-lucide-star' }, { label: 'Mail', icon: 'i-lucide-mail' }]"
          size="md"
          :portal="false"
        >
          <UButton label="Label" variant="outline" />
        </UContextMenu>
      </div>
      <div class="w-64 h-80">
        <UContextMenu
          :items="[{ label: 'Home', icon: 'i-lucide-home' }, { label: 'Profile', icon: 'i-lucide-user' }, { label: 'Settings', icon: 'i-lucide-settings' }, { label: 'Favorites', icon: 'i-lucide-star' }, { label: 'Mail', icon: 'i-lucide-mail' }]"
          size="lg"
          :portal="false"
        >
          <UButton label="Label" variant="outline" />
        </UContextMenu>
      </div>
      <div class="w-64 h-80">
        <UContextMenu
          :items="[{ label: 'Home', icon: 'i-lucide-home' }, { label: 'Profile', icon: 'i-lucide-user' }, { label: 'Settings', icon: 'i-lucide-settings' }, { label: 'Favorites', icon: 'i-lucide-star' }, { label: 'Mail', icon: 'i-lucide-mail' }]"
          size="xl"
          :portal="false"
        >
          <UButton label="Label" variant="outline" />
        </UContextMenu>
      </div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64 h-80">
        <UContextMenu :items="[{ label: 'Label', loading: true }]" :portal="false">
          <UButton label="Label" variant="outline" />
        </UContextMenu>
      </div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64 h-80">
        <UContextMenu
          :items="[
            [
              { label: 'Home', icon: 'i-lucide-home', kbds: ['meta', 'K'] },
              { label: 'Profile', icon: 'i-lucide-user' },
              { type: 'label', label: 'Label' },
              { type: 'separator' },
              { label: 'Settings', icon: 'i-lucide-settings', disabled: true }
            ],
            [
              { label: 'Favorites', icon: 'i-lucide-star' },
              { label: 'Mail', icon: 'i-lucide-mail' }
            ]
          ]"
          :portal="false"
        >
          <UButton label="Label" variant="outline" />
        </UContextMenu>
      </div>
    </div>
  </div>
</template>
