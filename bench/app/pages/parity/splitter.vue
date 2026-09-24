<template>
  <div class="p-4 space-y-4">
    <div class="flex flex-wrap gap-4 items-start">
      <div class="h-48 w-full max-w-3xl">
        <USplitter :items="[{}, {}]">
          <template #panel-0><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p></template>
          <template #panel-1><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p></template>
        </USplitter>
      </div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="h-48 w-full max-w-3xl">
        <USplitter orientation="vertical" :items="[{}, {}]">
          <template #panel-0><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p></template>
          <template #panel-1><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p></template>
        </USplitter>
      </div>
    </div>
  </div>
</template>
