<template>
  <UDashboardGroup>
    <UDashboardPanel>
      <template #body>
        <div class="flex flex-wrap gap-4 items-start">
          <div class="w-full max-w-3xl">
            <UDashboardToolbar>
              <template #left><UButton label="Label" /></template>
              <template #right><UButton label="Label" /></template>
            </UDashboardToolbar>
          </div>
        </div>
      </template>
    </UDashboardPanel>
  </UDashboardGroup>
</template>
