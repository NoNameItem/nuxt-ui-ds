<template>
  <div class="p-4 space-y-4">
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64">
        <UCollapsible>
          <UButton label="Label" trailing-icon="i-lucide-chevron-down" />
          <template #content>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p>
          </template>
        </UCollapsible>
      </div>
      <div class="w-64">
        <UCollapsible default-open>
          <UButton label="Label" trailing-icon="i-lucide-chevron-down" />
          <template #content>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p>
          </template>
        </UCollapsible>
      </div>
    </div>
  </div>
</template>
