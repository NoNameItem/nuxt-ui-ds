<template>
  <UDashboardGroup>
    <UDashboardPanel>
      <template #body>
        <div class="flex flex-wrap gap-4 items-start">
          <div class="w-full max-w-3xl">
            <UDashboardNavbar title="Title" icon="i-lucide-rocket" toggle-side="left">
              <template #right><UButton label="Label" /></template>
            </UDashboardNavbar>
          </div>
        </div>
        <div class="flex flex-wrap gap-4 items-start">
          <div class="w-full max-w-3xl">
            <UDashboardNavbar title="Title" icon="i-lucide-rocket" toggle-side="right">
              <template #right><UButton label="Label" /></template>
            </UDashboardNavbar>
          </div>
        </div>
      </template>
    </UDashboardPanel>
  </UDashboardGroup>
</template>
