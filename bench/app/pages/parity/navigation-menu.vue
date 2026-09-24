<template>
  <div class="p-4 space-y-4">
    <!-- 1. active×color×variant: по записям (14) — active: true у первого пункта -->
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-full max-w-3xl"><UNavigationMenu :items="[{ label: 'Home', icon: 'i-lucide-home', active: true }, { label: 'Profile', icon: 'i-lucide-user' }, { label: 'Settings', icon: 'i-lucide-settings' }]" color="primary" variant="pill" /></div>
      <div class="w-full max-w-3xl"><UNavigationMenu :items="[{ label: 'Home', icon: 'i-lucide-home', active: true }, { label: 'Profile', icon: 'i-lucide-user' }, { label: 'Settings', icon: 'i-lucide-settings' }]" color="secondary" variant="pill" /></div>
      <div class="w-full max-w-3xl"><UNavigationMenu :items="[{ label: 'Home', icon: 'i-lucide-home', active: true }, { label: 'Profile', icon: 'i-lucide-user' }, { label: 'Settings', icon: 'i-lucide-settings' }]" color="success" variant="pill" /></div>
      <div class="w-full max-w-3xl"><UNavigationMenu :items="[{ label: 'Home', icon: 'i-lucide-home', active: true }, { label: 'Profile', icon: 'i-lucide-user' }, { label: 'Settings', icon: 'i-lucide-settings' }]" color="info" variant="pill" /></div>
      <div class="w-full max-w-3xl"><UNavigationMenu :items="[{ label: 'Home', icon: 'i-lucide-home', active: true }, { label: 'Profile', icon: 'i-lucide-user' }, { label: 'Settings', icon: 'i-lucide-settings' }]" color="warning" variant="pill" /></div>
      <div class="w-full max-w-3xl"><UNavigationMenu :items="[{ label: 'Home', icon: 'i-lucide-home', active: true }, { label: 'Profile', icon: 'i-lucide-user' }, { label: 'Settings', icon: 'i-lucide-settings' }]" color="error" variant="pill" /></div>
      <div class="w-full max-w-3xl"><UNavigationMenu :items="[{ label: 'Home', icon: 'i-lucide-home', active: true }, { label: 'Profile', icon: 'i-lucide-user' }, { label: 'Settings', icon: 'i-lucide-settings' }]" color="neutral" variant="pill" /></div>
      <div class="w-full max-w-3xl"><UNavigationMenu :items="[{ label: 'Home', icon: 'i-lucide-home', active: true }, { label: 'Profile', icon: 'i-lucide-user' }, { label: 'Settings', icon: 'i-lucide-settings' }]" color="primary" variant="link" /></div>
      <div class="w-full max-w-3xl"><UNavigationMenu :items="[{ label: 'Home', icon: 'i-lucide-home', active: true }, { label: 'Profile', icon: 'i-lucide-user' }, { label: 'Settings', icon: 'i-lucide-settings' }]" color="secondary" variant="link" /></div>
      <div class="w-full max-w-3xl"><UNavigationMenu :items="[{ label: 'Home', icon: 'i-lucide-home', active: true }, { label: 'Profile', icon: 'i-lucide-user' }, { label: 'Settings', icon: 'i-lucide-settings' }]" color="success" variant="link" /></div>
      <div class="w-full max-w-3xl"><UNavigationMenu :items="[{ label: 'Home', icon: 'i-lucide-home', active: true }, { label: 'Profile', icon: 'i-lucide-user' }, { label: 'Settings', icon: 'i-lucide-settings' }]" color="info" variant="link" /></div>
      <div class="w-full max-w-3xl"><UNavigationMenu :items="[{ label: 'Home', icon: 'i-lucide-home', active: true }, { label: 'Profile', icon: 'i-lucide-user' }, { label: 'Settings', icon: 'i-lucide-settings' }]" color="warning" variant="link" /></div>
      <div class="w-full max-w-3xl"><UNavigationMenu :items="[{ label: 'Home', icon: 'i-lucide-home', active: true }, { label: 'Profile', icon: 'i-lucide-user' }, { label: 'Settings', icon: 'i-lucide-settings' }]" color="error" variant="link" /></div>
      <div class="w-full max-w-3xl"><UNavigationMenu :items="[{ label: 'Home', icon: 'i-lucide-home', active: true }, { label: 'Profile', icon: 'i-lucide-user' }, { label: 'Settings', icon: 'i-lucide-settings' }]" color="neutral" variant="link" /></div>
    </div>
    <!-- 2. active×highlight×highlightColor×level: по записям (7) — highlight, highlight-color -->
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-full max-w-3xl"><UNavigationMenu :items="[{ label: 'Home', icon: 'i-lucide-home', active: true }, { label: 'Profile', icon: 'i-lucide-user' }, { label: 'Settings', icon: 'i-lucide-settings' }]" highlight highlight-color="primary" /></div>
      <div class="w-full max-w-3xl"><UNavigationMenu :items="[{ label: 'Home', icon: 'i-lucide-home', active: true }, { label: 'Profile', icon: 'i-lucide-user' }, { label: 'Settings', icon: 'i-lucide-settings' }]" highlight highlight-color="secondary" /></div>
      <div class="w-full max-w-3xl"><UNavigationMenu :items="[{ label: 'Home', icon: 'i-lucide-home', active: true }, { label: 'Profile', icon: 'i-lucide-user' }, { label: 'Settings', icon: 'i-lucide-settings' }]" highlight highlight-color="success" /></div>
      <div class="w-full max-w-3xl"><UNavigationMenu :items="[{ label: 'Home', icon: 'i-lucide-home', active: true }, { label: 'Profile', icon: 'i-lucide-user' }, { label: 'Settings', icon: 'i-lucide-settings' }]" highlight highlight-color="info" /></div>
      <div class="w-full max-w-3xl"><UNavigationMenu :items="[{ label: 'Home', icon: 'i-lucide-home', active: true }, { label: 'Profile', icon: 'i-lucide-user' }, { label: 'Settings', icon: 'i-lucide-settings' }]" highlight highlight-color="warning" /></div>
      <div class="w-full max-w-3xl"><UNavigationMenu :items="[{ label: 'Home', icon: 'i-lucide-home', active: true }, { label: 'Profile', icon: 'i-lucide-user' }, { label: 'Settings', icon: 'i-lucide-settings' }]" highlight highlight-color="error" /></div>
      <div class="w-full max-w-3xl"><UNavigationMenu :items="[{ label: 'Home', icon: 'i-lucide-home', active: true }, { label: 'Profile', icon: 'i-lucide-user' }, { label: 'Settings', icon: 'i-lucide-settings' }]" highlight highlight-color="neutral" /></div>
    </div>
    <!-- 3. orientation и contentOrientation -->
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64">
        <UNavigationMenu
          orientation="vertical"
          :items="[{ label: 'Home', icon: 'i-lucide-home' }, { label: 'Profile', icon: 'i-lucide-user', badge: '42' }, { label: 'Settings', icon: 'i-lucide-settings', defaultOpen: true, children: [{ label: 'Label', description: 'Description text for the parity testbed.' }, { label: 'Label', description: 'Description text for the parity testbed.' }, { label: 'Label', description: 'Description text for the parity testbed.' }] }, { label: 'Favorites', icon: 'i-lucide-star' }, { label: 'Mail', icon: 'i-lucide-mail' }]"
        />
      </div>
      <div class="w-full max-w-3xl">
        <UNavigationMenu
          orientation="horizontal"
          content-orientation="horizontal"
          :model-value="'item-2'"
          :items="[{ label: 'Home', icon: 'i-lucide-home' }, { label: 'Profile', icon: 'i-lucide-user', badge: '42' }, { label: 'Settings', icon: 'i-lucide-settings', children: [{ label: 'Label', description: 'Description text for the parity testbed.' }, { label: 'Label', description: 'Description text for the parity testbed.' }, { label: 'Label', description: 'Description text for the parity testbed.' }] }, { label: 'Favorites', icon: 'i-lucide-star' }, { label: 'Mail', icon: 'i-lucide-mail' }]"
        />
      </div>
      <div class="w-full max-w-3xl">
        <UNavigationMenu
          orientation="horizontal"
          content-orientation="vertical"
          :model-value="'item-2'"
          :items="[{ label: 'Home', icon: 'i-lucide-home' }, { label: 'Profile', icon: 'i-lucide-user', badge: '42' }, { label: 'Settings', icon: 'i-lucide-settings', children: [{ label: 'Label', description: 'Description text for the parity testbed.' }, { label: 'Label', description: 'Description text for the parity testbed.' }, { label: 'Label', description: 'Description text for the parity testbed.' }] }, { label: 'Favorites', icon: 'i-lucide-star' }, { label: 'Mail', icon: 'i-lucide-mail' }]"
        />
      </div>
    </div>
    <!-- 4. highlight×orientation: highlight для horizontal и vertical -->
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-full max-w-3xl"><UNavigationMenu highlight :items="[{ label: 'Home', icon: 'i-lucide-home', active: true }, { label: 'Profile', icon: 'i-lucide-user' }, { label: 'Settings', icon: 'i-lucide-settings' }]" /></div>
      <div class="w-64">
        <UNavigationMenu
          orientation="vertical"
          highlight
          :items="[{ label: 'Settings', icon: 'i-lucide-settings', defaultOpen: true, children: [{ label: 'Label', description: 'Description text for the parity testbed.', active: true }, { label: 'Label', description: 'Description text for the parity testbed.' }] }]"
        />
      </div>
    </div>
    <!-- 5. disabled и active сочетания: по записям (7) — 4 статически проверяемых (data-[state=open]), 3 только hover: (не проверить статическим снимком) -->
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-full max-w-3xl">
        <UNavigationMenu
          orientation="horizontal"
          variant="pill"
          highlight
          :model-value="'item-1'"
          :items="[{ label: 'Home', icon: 'i-lucide-home' }, { label: 'Profile', icon: 'i-lucide-user', children: [{ label: 'Label', description: 'Description text for the parity testbed.' }] }, { label: 'Settings', icon: 'i-lucide-settings' }]"
        />
      </div>
      <div class="w-full max-w-3xl">
        <UNavigationMenu
          orientation="horizontal"
          variant="link"
          :model-value="'item-1'"
          :items="[{ label: 'Home', icon: 'i-lucide-home' }, { label: 'Profile', icon: 'i-lucide-user', children: [{ label: 'Label', description: 'Description text for the parity testbed.' }] }, { label: 'Settings', icon: 'i-lucide-settings' }]"
        />
      </div>
    </div>
    <!-- 6. контент: иконки и badge (дефолт); children раскрыты; collapsed вертикально -->
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-full max-w-3xl"><UNavigationMenu :items="[{ label: 'Home', icon: 'i-lucide-home' }, { label: 'Profile', icon: 'i-lucide-user', badge: '42' }, { label: 'Settings', icon: 'i-lucide-settings' }, { label: 'Favorites', icon: 'i-lucide-star' }, { label: 'Mail', icon: 'i-lucide-mail' }]" /></div>
      <div class="w-full max-w-3xl">
        <UNavigationMenu
          :model-value="'item-2'"
          :items="[{ label: 'Home', icon: 'i-lucide-home' }, { label: 'Profile', icon: 'i-lucide-user', badge: '42' }, { label: 'Settings', icon: 'i-lucide-settings', children: [{ label: 'Label', description: 'Description text for the parity testbed.' }, { label: 'Label', description: 'Description text for the parity testbed.' }, { label: 'Label', description: 'Description text for the parity testbed.' }] }, { label: 'Favorites', icon: 'i-lucide-star' }, { label: 'Mail', icon: 'i-lucide-mail' }]"
        />
      </div>
      <div class="w-64">
        <UNavigationMenu
          orientation="vertical"
          collapsed
          :items="[{ label: 'Home', icon: 'i-lucide-home' }, { label: 'Profile', icon: 'i-lucide-user', badge: '42' }, { label: 'Settings', icon: 'i-lucide-settings', children: [{ label: 'Label', description: 'Description text for the parity testbed.' }] }, { label: 'Favorites', icon: 'i-lucide-star' }, { label: 'Mail', icon: 'i-lucide-mail' }]"
        />
      </div>
    </div>
  </div>
</template>
