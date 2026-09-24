<template>
  <div class="p-4 space-y-4">
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64">
        <UProgressGroup
          orientation="horizontal"
          size="2xs"
          :items="[{ label: 'Home', value: 40, icon: 'i-lucide-home' }, { label: 'Profile', value: 30, icon: 'i-lucide-user' }, { label: 'Settings', value: 30, icon: 'i-lucide-settings' }]"
        />
      </div>
      <div class="w-64">
        <UProgressGroup
          orientation="horizontal"
          size="xs"
          :items="[{ label: 'Home', value: 40, icon: 'i-lucide-home' }, { label: 'Profile', value: 30, icon: 'i-lucide-user' }, { label: 'Settings', value: 30, icon: 'i-lucide-settings' }]"
        />
      </div>
      <div class="w-64">
        <UProgressGroup
          orientation="horizontal"
          size="sm"
          :items="[{ label: 'Home', value: 40, icon: 'i-lucide-home' }, { label: 'Profile', value: 30, icon: 'i-lucide-user' }, { label: 'Settings', value: 30, icon: 'i-lucide-settings' }]"
        />
      </div>
      <div class="w-64">
        <UProgressGroup
          orientation="horizontal"
          size="md"
          :items="[{ label: 'Home', value: 40, icon: 'i-lucide-home' }, { label: 'Profile', value: 30, icon: 'i-lucide-user' }, { label: 'Settings', value: 30, icon: 'i-lucide-settings' }]"
        />
      </div>
      <div class="w-64">
        <UProgressGroup
          orientation="horizontal"
          size="lg"
          :items="[{ label: 'Home', value: 40, icon: 'i-lucide-home' }, { label: 'Profile', value: 30, icon: 'i-lucide-user' }, { label: 'Settings', value: 30, icon: 'i-lucide-settings' }]"
        />
      </div>
      <div class="w-64">
        <UProgressGroup
          orientation="horizontal"
          size="xl"
          :items="[{ label: 'Home', value: 40, icon: 'i-lucide-home' }, { label: 'Profile', value: 30, icon: 'i-lucide-user' }, { label: 'Settings', value: 30, icon: 'i-lucide-settings' }]"
        />
      </div>
      <div class="w-64">
        <UProgressGroup
          orientation="horizontal"
          size="2xl"
          :items="[{ label: 'Home', value: 40, icon: 'i-lucide-home' }, { label: 'Profile', value: 30, icon: 'i-lucide-user' }, { label: 'Settings', value: 30, icon: 'i-lucide-settings' }]"
        />
      </div>
      <div class="h-32">
        <UProgressGroup
          orientation="vertical"
          size="2xs"
          :items="[{ label: 'Home', value: 40, icon: 'i-lucide-home' }, { label: 'Profile', value: 30, icon: 'i-lucide-user' }, { label: 'Settings', value: 30, icon: 'i-lucide-settings' }]"
        />
      </div>
      <div class="h-32">
        <UProgressGroup
          orientation="vertical"
          size="xs"
          :items="[{ label: 'Home', value: 40, icon: 'i-lucide-home' }, { label: 'Profile', value: 30, icon: 'i-lucide-user' }, { label: 'Settings', value: 30, icon: 'i-lucide-settings' }]"
        />
      </div>
      <div class="h-32">
        <UProgressGroup
          orientation="vertical"
          size="sm"
          :items="[{ label: 'Home', value: 40, icon: 'i-lucide-home' }, { label: 'Profile', value: 30, icon: 'i-lucide-user' }, { label: 'Settings', value: 30, icon: 'i-lucide-settings' }]"
        />
      </div>
      <div class="h-32">
        <UProgressGroup
          orientation="vertical"
          size="md"
          :items="[{ label: 'Home', value: 40, icon: 'i-lucide-home' }, { label: 'Profile', value: 30, icon: 'i-lucide-user' }, { label: 'Settings', value: 30, icon: 'i-lucide-settings' }]"
        />
      </div>
      <div class="h-32">
        <UProgressGroup
          orientation="vertical"
          size="lg"
          :items="[{ label: 'Home', value: 40, icon: 'i-lucide-home' }, { label: 'Profile', value: 30, icon: 'i-lucide-user' }, { label: 'Settings', value: 30, icon: 'i-lucide-settings' }]"
        />
      </div>
      <div class="h-32">
        <UProgressGroup
          orientation="vertical"
          size="xl"
          :items="[{ label: 'Home', value: 40, icon: 'i-lucide-home' }, { label: 'Profile', value: 30, icon: 'i-lucide-user' }, { label: 'Settings', value: 30, icon: 'i-lucide-settings' }]"
        />
      </div>
      <div class="h-32">
        <UProgressGroup
          orientation="vertical"
          size="2xl"
          :items="[{ label: 'Home', value: 40, icon: 'i-lucide-home' }, { label: 'Profile', value: 30, icon: 'i-lucide-user' }, { label: 'Settings', value: 30, icon: 'i-lucide-settings' }]"
        />
      </div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64">
        <UProgressGroup
          color="primary"
          :items="[{ label: 'Home', value: 40, icon: 'i-lucide-home' }, { label: 'Profile', value: 30, icon: 'i-lucide-user' }, { label: 'Settings', value: 30, icon: 'i-lucide-settings' }]"
        />
      </div>
      <div class="w-64">
        <UProgressGroup
          color="secondary"
          :items="[{ label: 'Home', value: 40, icon: 'i-lucide-home' }, { label: 'Profile', value: 30, icon: 'i-lucide-user' }, { label: 'Settings', value: 30, icon: 'i-lucide-settings' }]"
        />
      </div>
      <div class="w-64">
        <UProgressGroup
          color="success"
          :items="[{ label: 'Home', value: 40, icon: 'i-lucide-home' }, { label: 'Profile', value: 30, icon: 'i-lucide-user' }, { label: 'Settings', value: 30, icon: 'i-lucide-settings' }]"
        />
      </div>
      <div class="w-64">
        <UProgressGroup
          color="info"
          :items="[{ label: 'Home', value: 40, icon: 'i-lucide-home' }, { label: 'Profile', value: 30, icon: 'i-lucide-user' }, { label: 'Settings', value: 30, icon: 'i-lucide-settings' }]"
        />
      </div>
      <div class="w-64">
        <UProgressGroup
          color="warning"
          :items="[{ label: 'Home', value: 40, icon: 'i-lucide-home' }, { label: 'Profile', value: 30, icon: 'i-lucide-user' }, { label: 'Settings', value: 30, icon: 'i-lucide-settings' }]"
        />
      </div>
      <div class="w-64">
        <UProgressGroup
          color="error"
          :items="[{ label: 'Home', value: 40, icon: 'i-lucide-home' }, { label: 'Profile', value: 30, icon: 'i-lucide-user' }, { label: 'Settings', value: 30, icon: 'i-lucide-settings' }]"
        />
      </div>
      <div class="w-64">
        <UProgressGroup
          color="neutral"
          :items="[{ label: 'Home', value: 40, icon: 'i-lucide-home' }, { label: 'Profile', value: 30, icon: 'i-lucide-user' }, { label: 'Settings', value: 30, icon: 'i-lucide-settings' }]"
        />
      </div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64">
        <UProgressGroup
          status
          :items="[{ label: 'Home', value: 40, icon: 'i-lucide-home' }, { label: 'Profile', value: 30, icon: 'i-lucide-user' }, { label: 'Settings', value: 30, icon: 'i-lucide-settings' }]"
        />
      </div>
    </div>
  </div>
</template>
