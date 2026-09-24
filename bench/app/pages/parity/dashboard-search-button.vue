<template>
  <UDashboardGroup>
    <UDashboardPanel>
      <template #body>
        <div class="flex flex-wrap gap-4 items-start">
          <UDashboardSearchButton label="Label" :kbds="['meta', 'K']" />
        </div>
        <div class="flex flex-wrap gap-4 items-start">
          <UDashboardSearchButton label="Label" :kbds="['meta', 'K']" collapsed />
        </div>
      </template>
    </UDashboardPanel>
  </UDashboardGroup>
</template>
