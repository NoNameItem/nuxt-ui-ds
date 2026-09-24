<template>
  <UDashboardGroup>
    <UDashboardPanel>
      <template #body>
        <!-- nuxt-ui-ds-44m: именованные слоты leading и trailing (DashboardNavbar.vue:51, :61) стоят прямо в left; leading заменяет icon. Первый навбар — контроль -->
        <div class="flex flex-wrap gap-4 items-start">
          <div class="w-full max-w-3xl"><UDashboardNavbar title="Title" icon="i-lucide-rocket" /></div>
        </div>
        <div class="flex flex-wrap gap-4 items-start">
          <div class="w-full max-w-3xl">
            <UDashboardNavbar title="Title" icon="i-lucide-rocket">
              <template #leading><UKbd value="a" /></template>
              <template #trailing><UKbd value="b" /></template>
            </UDashboardNavbar>
          </div>
        </div>
      </template>
    </UDashboardPanel>
  </UDashboardGroup>
</template>
