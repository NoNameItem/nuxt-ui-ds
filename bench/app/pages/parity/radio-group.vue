<template>
  <div class="p-4 space-y-4">
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" variant="card" indicator="start" /></div>
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" variant="card" indicator="end" /></div>
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" variant="card" indicator="hidden" /></div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" indicator="hidden" size="xs" /></div>
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" indicator="hidden" size="sm" /></div>
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" indicator="hidden" size="md" /></div>
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" indicator="hidden" size="lg" /></div>
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" indicator="hidden" size="xl" /></div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" variant="card" size="xs" /></div>
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" variant="card" size="sm" /></div>
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" variant="card" size="md" /></div>
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" variant="card" size="lg" /></div>
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" variant="card" size="xl" /></div>
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" variant="table" size="xs" /></div>
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" variant="table" size="sm" /></div>
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" variant="table" size="md" /></div>
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" variant="table" size="lg" /></div>
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" variant="table" size="xl" /></div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" variant="table" orientation="horizontal" /></div>
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" variant="table" orientation="vertical" /></div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" variant="card" color="primary" /></div>
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" variant="card" color="secondary" /></div>
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" variant="card" color="success" /></div>
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" variant="card" color="info" /></div>
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" variant="card" color="warning" /></div>
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" variant="card" color="error" /></div>
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" variant="card" color="neutral" /></div>
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" variant="table" color="primary" /></div>
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" variant="table" color="secondary" /></div>
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" variant="table" color="success" /></div>
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" variant="table" color="info" /></div>
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" variant="table" color="warning" /></div>
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" variant="table" color="error" /></div>
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" variant="table" color="neutral" /></div>
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" variant="card" color="primary" model-value="home" /></div>
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" variant="card" color="secondary" model-value="home" /></div>
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" variant="card" color="success" model-value="home" /></div>
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" variant="card" color="info" model-value="home" /></div>
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" variant="card" color="warning" model-value="home" /></div>
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" variant="card" color="error" model-value="home" /></div>
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" variant="card" color="neutral" model-value="home" /></div>
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" variant="table" color="primary" model-value="home" /></div>
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" variant="table" color="secondary" model-value="home" /></div>
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" variant="table" color="success" model-value="home" /></div>
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" variant="table" color="info" model-value="home" /></div>
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" variant="table" color="warning" model-value="home" /></div>
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" variant="table" color="error" model-value="home" /></div>
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" variant="table" color="neutral" model-value="home" /></div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" indicator="start" color="primary" /></div>
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" indicator="end" color="primary" /></div>
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" indicator="start" color="secondary" /></div>
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" indicator="end" color="secondary" /></div>
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" indicator="start" color="success" /></div>
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" indicator="end" color="success" /></div>
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" indicator="start" color="info" /></div>
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" indicator="end" color="info" /></div>
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" indicator="start" color="warning" /></div>
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" indicator="end" color="warning" /></div>
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" indicator="start" color="error" /></div>
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" indicator="end" color="error" /></div>
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" indicator="start" color="neutral" /></div>
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" indicator="end" color="neutral" /></div>
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" indicator="hidden" color="primary" /></div>
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" indicator="hidden" color="secondary" /></div>
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" indicator="hidden" color="success" /></div>
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" indicator="hidden" color="info" /></div>
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" indicator="hidden" color="warning" /></div>
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" indicator="hidden" color="error" /></div>
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" indicator="hidden" color="neutral" /></div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" indicator="hidden" highlight color="primary" /></div>
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" indicator="hidden" highlight color="secondary" /></div>
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" indicator="hidden" highlight color="success" /></div>
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" indicator="hidden" highlight color="info" /></div>
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" indicator="hidden" highlight color="warning" /></div>
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" indicator="hidden" highlight color="error" /></div>
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" indicator="hidden" highlight color="neutral" /></div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" highlight color="primary" /></div>
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" highlight color="secondary" /></div>
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" highlight color="success" /></div>
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" highlight color="info" /></div>
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" highlight color="warning" /></div>
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" highlight color="error" /></div>
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" highlight color="neutral" /></div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" disabled /></div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home', description: 'Description text for the parity testbed.' }, { label: 'Profile', value: 'profile', description: 'Description text for the parity testbed.' }, { label: 'Settings', value: 'settings', description: 'Description text for the parity testbed.' }]" /></div>
      <div class="w-64"><URadioGroup :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" model-value="home" /></div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64"><URadioGroup legend="Legend" :items="[{ label: 'Home', value: 'home' }, { label: 'Profile', value: 'profile' }, { label: 'Settings', value: 'settings' }]" required /></div>
    </div>
  </div>
</template>
