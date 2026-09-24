<template>
  <div class="p-4 space-y-4">
    <!-- Позиционирование портированного меню по content: align start, align end, side right.
         Страница dropdown-menu content не передаёт, а кит его не читал (kit-popper-align-ignored). -->
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64 h-48">
        <UDropdownMenu :items="[{ label: 'Profile', icon: 'i-lucide-user' }, { label: 'Billing', icon: 'i-lucide-credit-card' }, { label: 'Settings', icon: 'i-lucide-cog' }]" open :content="{ side: 'bottom', align: 'start' }" :ui="{ content: 'w-48' }">
          <UButton label="Label" />
        </UDropdownMenu>
      </div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64 h-48 flex justify-end">
        <UDropdownMenu :items="[{ label: 'Profile', icon: 'i-lucide-user' }, { label: 'Billing', icon: 'i-lucide-credit-card' }, { label: 'Settings', icon: 'i-lucide-cog' }]" open :content="{ side: 'bottom', align: 'end' }" :ui="{ content: 'w-48' }">
          <UButton label="Label" />
        </UDropdownMenu>
      </div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64 h-48">
        <UDropdownMenu :items="[{ label: 'Profile', icon: 'i-lucide-user' }, { label: 'Billing', icon: 'i-lucide-credit-card' }, { label: 'Settings', icon: 'i-lucide-cog' }]" open :content="{ side: 'right' }" :ui="{ content: 'w-48' }">
          <UButton label="Label" />
        </UDropdownMenu>
      </div>
    </div>
  </div>
</template>
