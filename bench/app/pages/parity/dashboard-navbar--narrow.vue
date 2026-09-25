<template>
  <UDashboardGroup>
    <UDashboardPanel>
      <template #body>
        <!-- nuxt-ui-ds-n33: кнопка toggle стоит первой внутри left (DashboardNavbar.vue:47-48) и последней внутри right (:69-72). Видна только уже lg (DashboardSidebarToggle — lg:hidden), поэтому кадр узкий: суффикс --narrow, 768 px (bench/scripts/viewport.mjs). Третий навбар без toggle — контроль -->
        <div class="flex flex-wrap gap-4 items-start">
          <div class="w-full max-w-3xl">
            <UDashboardNavbar title="Title" icon="i-lucide-rocket">
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
        <div class="flex flex-wrap gap-4 items-start">
          <div class="w-full max-w-3xl">
            <UDashboardNavbar title="Title" icon="i-lucide-rocket" :toggle="false">
              <template #right><UButton label="Label" /></template>
            </UDashboardNavbar>
          </div>
        </div>
      </template>
    </UDashboardPanel>
  </UDashboardGroup>
</template>
