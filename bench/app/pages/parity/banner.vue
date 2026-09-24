<template>
  <div class="p-4 space-y-4">
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-full"><UBanner title="Title" icon="i-lucide-rocket" color="primary" /></div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-full"><UBanner title="Title" icon="i-lucide-rocket" color="secondary" /></div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-full"><UBanner title="Title" icon="i-lucide-rocket" color="success" /></div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-full"><UBanner title="Title" icon="i-lucide-rocket" color="info" /></div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-full"><UBanner title="Title" icon="i-lucide-rocket" color="warning" /></div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-full"><UBanner title="Title" icon="i-lucide-rocket" color="error" /></div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-full"><UBanner title="Title" icon="i-lucide-rocket" color="neutral" /></div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-full"><UBanner title="Title" icon="i-lucide-rocket" to="#" /></div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-full"><UBanner icon="i-lucide-rocket" /></div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-full"><UBanner title="Title" :actions="[{ label: 'Label' }]" /></div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-full"><UBanner title="Title" close /></div>
    </div>
  </div>
</template>
