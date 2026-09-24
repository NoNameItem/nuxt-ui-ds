<template>
  <div class="p-4 space-y-4">
    <div class="flex flex-wrap gap-4 items-start">
      <UBreadcrumb :items="[{ label: 'Label', icon: 'i-lucide-home', to: '#' }, { label: 'Label', icon: 'i-lucide-user', to: '#' }, { label: 'Label', icon: 'i-lucide-settings', to: '#' }, { label: 'Label', icon: 'i-lucide-star', to: '#', active: true }]" color="primary" />
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <UBreadcrumb :items="[{ label: 'Label', icon: 'i-lucide-home', to: '#' }, { label: 'Label', icon: 'i-lucide-user', to: '#' }, { label: 'Label', icon: 'i-lucide-settings', to: '#' }, { label: 'Label', icon: 'i-lucide-star', to: '#', active: true }]" color="secondary" />
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <UBreadcrumb :items="[{ label: 'Label', icon: 'i-lucide-home', to: '#' }, { label: 'Label', icon: 'i-lucide-user', to: '#' }, { label: 'Label', icon: 'i-lucide-settings', to: '#' }, { label: 'Label', icon: 'i-lucide-star', to: '#', active: true }]" color="success" />
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <UBreadcrumb :items="[{ label: 'Label', icon: 'i-lucide-home', to: '#' }, { label: 'Label', icon: 'i-lucide-user', to: '#' }, { label: 'Label', icon: 'i-lucide-settings', to: '#' }, { label: 'Label', icon: 'i-lucide-star', to: '#', active: true }]" color="info" />
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <UBreadcrumb :items="[{ label: 'Label', icon: 'i-lucide-home', to: '#' }, { label: 'Label', icon: 'i-lucide-user', to: '#' }, { label: 'Label', icon: 'i-lucide-settings', to: '#' }, { label: 'Label', icon: 'i-lucide-star', to: '#', active: true }]" color="warning" />
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <UBreadcrumb :items="[{ label: 'Label', icon: 'i-lucide-home', to: '#' }, { label: 'Label', icon: 'i-lucide-user', to: '#' }, { label: 'Label', icon: 'i-lucide-settings', to: '#' }, { label: 'Label', icon: 'i-lucide-star', to: '#', active: true }]" color="error" />
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <UBreadcrumb :items="[{ label: 'Label', icon: 'i-lucide-home', to: '#' }, { label: 'Label', icon: 'i-lucide-user', to: '#' }, { label: 'Label', icon: 'i-lucide-settings', to: '#' }, { label: 'Label', icon: 'i-lucide-star', to: '#', active: true }]" color="neutral" />
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <UBreadcrumb :items="[{ label: 'Label', icon: 'i-lucide-home', to: '#' }, { label: 'Label', icon: 'i-lucide-user', to: '#', disabled: true }, { label: 'Label', icon: 'i-lucide-settings', to: '#' }, { label: 'Label', icon: 'i-lucide-star', to: '#', active: true }]" />
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <UBreadcrumb :items="[{ label: 'Label', icon: 'i-lucide-home', to: '#' }, { label: 'Label', icon: 'i-lucide-user', to: '#' }, { label: 'Label', icon: 'i-lucide-settings', to: '#' }, { label: 'Label', icon: 'i-lucide-star', to: '#', active: true }]" separator-icon="i-lucide-arrow-right" />
    </div>
  </div>
</template>
