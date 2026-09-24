<template>
  <div class="p-4 space-y-4">
    <div class="w-full max-w-3xl flex flex-wrap gap-4 items-start">
      <div class="w-full">
        <UFooterColumns
          :columns="[
            { label: 'Title', children: [{ label: 'Label', to: '#' }, { label: 'Label', to: '#' }, { label: 'Label', to: '#' }] },
            { label: 'Title', children: [{ label: 'Label', to: '#' }, { label: 'Label', to: '#' }, { label: 'Label', to: '#' }] },
            { label: 'Title', children: [{ label: 'Label', to: '#' }, { label: 'Label', to: '#' }, { label: 'Label', to: '#' }] }
          ]"
        />
      </div>
    </div>
    <div class="w-full max-w-3xl flex flex-wrap gap-4 items-start">
      <div class="w-full">
        <UFooterColumns
          :columns="[
            { label: 'Title', children: [{ label: 'Label', to: '#', active: true }, { label: 'Label', to: '#' }, { label: 'Label', to: '#' }] },
            { label: 'Title', children: [{ label: 'Label', to: '#' }, { label: 'Label', to: '#' }, { label: 'Label', to: '#' }] },
            { label: 'Title', children: [{ label: 'Label', to: '#' }, { label: 'Label', to: '#' }, { label: 'Label', to: '#' }] }
          ]"
        />
      </div>
    </div>
  </div>
</template>
