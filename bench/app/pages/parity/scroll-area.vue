<template>
  <div class="p-4 space-y-4">
    <div class="flex flex-wrap gap-4 items-start">
      <UScrollArea class="h-32 w-64">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p>
      </UScrollArea>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <UScrollArea orientation="horizontal" class="h-32 w-64">
        <p class="whitespace-nowrap">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p>
        <p class="whitespace-nowrap">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p>
        <p class="whitespace-nowrap">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p>
        <p class="whitespace-nowrap">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p>
        <p class="whitespace-nowrap">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p>
      </UScrollArea>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div id="scroll-area-external-scroll" class="h-32 w-64 overflow-y-auto">
        <UScrollArea :items="[1, 2, 3, 4, 5]" :virtualize="{ getScrollElement: () => (typeof document !== 'undefined' ? document.getElementById('scroll-area-external-scroll') : null) }">
          <template #default>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p>
          </template>
        </UScrollArea>
      </div>
    </div>
  </div>
</template>
