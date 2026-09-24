<template>
  <div class="p-4 space-y-4">
    <div class="w-full max-w-3xl flex flex-wrap gap-4 items-start">
      <div class="w-full"><UChatTool text="Label" icon="i-lucide-rocket" variant="inline">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</UChatTool></div>
    </div>
    <div class="w-full max-w-3xl flex flex-wrap gap-4 items-start">
      <div class="w-full"><UChatTool text="Label" icon="i-lucide-rocket" variant="card">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</UChatTool></div>
    </div>
    <div class="w-full max-w-3xl flex flex-wrap gap-4 items-start">
      <div class="w-full"><UChatTool text="Label" icon="i-lucide-rocket" default-open>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</UChatTool></div>
    </div>
    <div class="w-full max-w-3xl flex flex-wrap gap-4 items-start">
      <div class="w-full"><UChatTool text="Label" icon="i-lucide-rocket" loading>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</UChatTool></div>
    </div>
    <div class="w-full max-w-3xl flex flex-wrap gap-4 items-start">
      <div class="w-full"><UChatTool text="Label" icon="i-lucide-rocket" :actions="[{ label: 'Label', icon: 'i-lucide-rocket' }]">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</UChatTool></div>
    </div>
  </div>
</template>
