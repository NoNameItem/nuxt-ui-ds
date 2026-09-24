<template>
  <div class="p-4 space-y-4">
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64"><UCheckboxGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" variant="table" color="primary" /></div>
      <div class="w-64"><UCheckboxGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" variant="table" color="secondary" /></div>
      <div class="w-64"><UCheckboxGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" variant="table" color="success" /></div>
      <div class="w-64"><UCheckboxGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" variant="table" color="info" /></div>
      <div class="w-64"><UCheckboxGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" variant="table" color="warning" /></div>
      <div class="w-64"><UCheckboxGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" variant="table" color="error" /></div>
      <div class="w-64"><UCheckboxGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" variant="table" color="neutral" /></div>
      <div class="w-64"><UCheckboxGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" variant="table" color="primary" :model-value="['home']" /></div>
      <div class="w-64"><UCheckboxGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" variant="table" color="secondary" :model-value="['home']" /></div>
      <div class="w-64"><UCheckboxGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" variant="table" color="success" :model-value="['home']" /></div>
      <div class="w-64"><UCheckboxGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" variant="table" color="info" :model-value="['home']" /></div>
      <div class="w-64"><UCheckboxGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" variant="table" color="warning" :model-value="['home']" /></div>
      <div class="w-64"><UCheckboxGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" variant="table" color="error" :model-value="['home']" /></div>
      <div class="w-64"><UCheckboxGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" variant="table" color="neutral" :model-value="['home']" /></div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64"><UCheckboxGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" variant="table" size="xs" /></div>
      <div class="w-64"><UCheckboxGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" variant="table" size="sm" /></div>
      <div class="w-64"><UCheckboxGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" variant="table" size="md" /></div>
      <div class="w-64"><UCheckboxGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" variant="table" size="lg" /></div>
      <div class="w-64"><UCheckboxGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" variant="table" size="xl" /></div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64"><UCheckboxGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" variant="table" orientation="horizontal" /></div>
      <div class="w-64"><UCheckboxGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" variant="table" orientation="vertical" /></div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64"><UCheckboxGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" variant="list" /></div>
      <div class="w-64"><UCheckboxGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" variant="card" /></div>
      <div class="w-64"><UCheckboxGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" variant="table" /></div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64"><UCheckboxGroup :items="[{ label: 'Home', value: 'home', description: 'Description text for the parity testbed.' }, { label: 'Profile', value: 'profile', description: 'Description text for the parity testbed.' }, { label: 'Settings', value: 'settings', description: 'Description text for the parity testbed.' }]" /></div>
      <div class="w-64"><UCheckboxGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" :model-value="['home']" /></div>
      <div class="w-64"><UCheckboxGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" disabled /></div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64"><UCheckboxGroup legend="Legend" :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" required /></div>
    </div>
  </div>
</template>
