<template>
  <div class="p-4 space-y-4">
    <div class="w-full max-w-3xl flex flex-wrap gap-4 items-start">
      <div class="w-full"><UChatMessages :messages="[{ id: '1', role: 'user', parts: [{ type: 'text', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.' }] }, { id: '2', role: 'assistant', parts: [{ type: 'text', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.' }] }]" /></div>
    </div>
    <div class="w-full max-w-3xl flex flex-wrap gap-4 items-start">
      <div class="w-full"><UChatMessages :messages="[{ id: '1', role: 'user', parts: [{ type: 'text', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.' }] }, { id: '2', role: 'assistant', parts: [{ type: 'text', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.' }] }]" compact /></div>
    </div>
  </div>
</template>
