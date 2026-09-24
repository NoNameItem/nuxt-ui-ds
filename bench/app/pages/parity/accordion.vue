<template>
  <div class="p-4 space-y-4">
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-80">
        <UAccordion
          :items="[{ label: 'Label', icon: 'i-lucide-rocket', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.' }, { label: 'Label', icon: 'i-lucide-rocket', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.' }, { label: 'Label', icon: 'i-lucide-rocket', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.' }]"
          default-value="0"
        />
      </div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-80">
        <UAccordion
          :items="[{ label: 'Label', icon: 'i-lucide-rocket', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.' }, { label: 'Label', icon: 'i-lucide-rocket', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.', disabled: true }, { label: 'Label', icon: 'i-lucide-rocket', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.' }]"
        />
      </div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-80">
        <UAccordion
          :items="[{ label: 'Label', icon: 'i-lucide-rocket', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.' }, { label: 'Label', icon: 'i-lucide-rocket', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.' }, { label: 'Label', icon: 'i-lucide-rocket', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.' }]"
        />
      </div>
    </div>
  </div>
</template>
