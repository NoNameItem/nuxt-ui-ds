<template>
  <div class="p-4 space-y-4">
    <!-- Пример «Content» doc-страницы DropdownMenu: открыт, portal по умолчанию (true). Страница
         dropdown-menu везде ставит :portal="false", а приёмка тем на doc-странице пишет у этого
         примера «ни одного data-slot» — здесь сценарий doc-страницы сверяется с библиотекой. -->
    <div class="flex flex-wrap gap-4 items-start">
      <UDropdownMenu
        :items="[{ label: 'Profile', icon: 'i-lucide-user' }, { label: 'Billing', icon: 'i-lucide-credit-card' }, { label: 'Settings', icon: 'i-lucide-cog' }]"
        open
        :content="{ align: 'start', side: 'bottom', sideOffset: 8 }"
        :ui="{ content: 'w-48' }"
      >
        <UButton label="Open" icon="i-lucide-menu" color="neutral" variant="outline" />
      </UDropdownMenu>
    </div>
  </div>
</template>
