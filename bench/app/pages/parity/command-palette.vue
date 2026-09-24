<template>
  <div class="p-4 space-y-4">
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-full max-w-3xl">
        <UCommandPalette
          :groups="[{ id: 'a', label: 'Label', items: [{ label: 'Home', icon: 'i-lucide-home', kbds: ['meta', 'K'] }, { label: 'Profile', icon: 'i-lucide-user' }, { label: 'Settings', icon: 'i-lucide-settings' }, { label: 'Favorites', icon: 'i-lucide-star' }, { label: 'Mail', icon: 'i-lucide-mail' }] }]"
          placeholder="Placeholder"
          size="xs"
        />
      </div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-full max-w-3xl">
        <UCommandPalette
          :groups="[{ id: 'a', label: 'Label', items: [{ label: 'Home', icon: 'i-lucide-home', kbds: ['meta', 'K'] }, { label: 'Profile', icon: 'i-lucide-user' }, { label: 'Settings', icon: 'i-lucide-settings' }, { label: 'Favorites', icon: 'i-lucide-star' }, { label: 'Mail', icon: 'i-lucide-mail' }] }]"
          placeholder="Placeholder"
          size="sm"
        />
      </div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-full max-w-3xl">
        <UCommandPalette
          :groups="[{ id: 'a', label: 'Label', items: [{ label: 'Home', icon: 'i-lucide-home', kbds: ['meta', 'K'] }, { label: 'Profile', icon: 'i-lucide-user' }, { label: 'Settings', icon: 'i-lucide-settings' }, { label: 'Favorites', icon: 'i-lucide-star' }, { label: 'Mail', icon: 'i-lucide-mail' }] }]"
          placeholder="Placeholder"
          size="md"
        />
      </div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-full max-w-3xl">
        <UCommandPalette
          :groups="[{ id: 'a', label: 'Label', items: [{ label: 'Home', icon: 'i-lucide-home', kbds: ['meta', 'K'] }, { label: 'Profile', icon: 'i-lucide-user' }, { label: 'Settings', icon: 'i-lucide-settings' }, { label: 'Favorites', icon: 'i-lucide-star' }, { label: 'Mail', icon: 'i-lucide-mail' }] }]"
          placeholder="Placeholder"
          size="lg"
        />
      </div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-full max-w-3xl">
        <UCommandPalette
          :groups="[{ id: 'a', label: 'Label', items: [{ label: 'Home', icon: 'i-lucide-home', kbds: ['meta', 'K'] }, { label: 'Profile', icon: 'i-lucide-user' }, { label: 'Settings', icon: 'i-lucide-settings' }, { label: 'Favorites', icon: 'i-lucide-star' }, { label: 'Mail', icon: 'i-lucide-mail' }] }]"
          placeholder="Placeholder"
          size="xl"
        />
      </div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-full max-w-3xl">
        <UCommandPalette
          :groups="[{ id: 'a', label: 'Label', items: [{ label: 'Home', icon: 'i-lucide-home', kbds: ['meta', 'K'] }, { label: 'Profile', icon: 'i-lucide-user', active: true }, { label: 'Settings', icon: 'i-lucide-settings' }, { label: 'Favorites', icon: 'i-lucide-star' }, { label: 'Mail', icon: 'i-lucide-mail' }] }]"
          placeholder="Placeholder"
        />
      </div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-full max-w-3xl">
        <UCommandPalette
          :groups="[{ id: 'a', label: 'Label', items: [{ label: 'Home', icon: 'i-lucide-home', kbds: ['meta', 'K'] }, { label: 'Profile', icon: 'i-lucide-user' }, { label: 'Settings', icon: 'i-lucide-settings' }, { label: 'Favorites', icon: 'i-lucide-star' }, { label: 'Mail', icon: 'i-lucide-mail' }] }]"
          placeholder="Placeholder"
        />
      </div>
      <div class="w-full max-w-3xl">
        <UCommandPalette :groups="[]" placeholder="Placeholder" />
      </div>
      <div class="w-full max-w-3xl">
        <UCommandPalette
          :groups="[{ id: 'a', label: 'Label', items: [{ label: 'Home', icon: 'i-lucide-home', kbds: ['meta', 'K'] }, { label: 'Profile', icon: 'i-lucide-user' }, { label: 'Settings', icon: 'i-lucide-settings' }, { label: 'Favorites', icon: 'i-lucide-star' }, { label: 'Mail', icon: 'i-lucide-mail' }] }]"
          placeholder="Placeholder"
          loading
        />
      </div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-full max-w-3xl">
        <UCommandPalette
          :groups="[{ id: 'a', label: 'Label', items: [{ label: 'Home', icon: 'i-lucide-home', kbds: ['meta', 'K'] }, { label: 'Profile', icon: 'i-lucide-user' }, { label: 'Settings', icon: 'i-lucide-settings' }, { label: 'Favorites', icon: 'i-lucide-star' }, { label: 'Mail', icon: 'i-lucide-mail' }] }]"
          placeholder="Placeholder"
          :virtualize="false"
        />
      </div>
      <div class="w-full max-w-3xl">
        <UCommandPalette
          :groups="[{ id: 'a', label: 'Label', items: [{ label: 'Home', icon: 'i-lucide-home', kbds: ['meta', 'K'] }, { label: 'Profile', icon: 'i-lucide-user' }, { label: 'Settings', icon: 'i-lucide-settings' }, { label: 'Favorites', icon: 'i-lucide-star' }, { label: 'Mail', icon: 'i-lucide-mail' }] }]"
          placeholder="Placeholder"
          virtualize
        />
      </div>
    </div>
  </div>
</template>
