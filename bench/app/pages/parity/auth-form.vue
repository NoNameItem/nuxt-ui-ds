<template>
  <div class="p-4 space-y-4">
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-80">
        <UAuthForm
          title="Title"
          description="Description text for the parity testbed."
          icon="i-lucide-rocket"
          :providers="[{ label: 'Google', icon: 'i-lucide-chrome' }]"
          :fields="[{ name: 'email', type: 'email', label: 'Email' }, { name: 'password', type: 'password', label: 'Password' }]"
          :submit="{ label: 'Label' }"
        />
      </div>
      <div class="w-80">
        <UAuthForm
          separator="or"
          title="Title"
          description="Description text for the parity testbed."
          icon="i-lucide-rocket"
          :providers="[{ label: 'Google', icon: 'i-lucide-chrome' }]"
          :fields="[{ name: 'email', type: 'email', label: 'Email' }, { name: 'password', type: 'password', label: 'Password' }]"
          :submit="{ label: 'Label' }"
        />
      </div>
    </div>
  </div>
</template>
