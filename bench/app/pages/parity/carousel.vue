<template>
  <div class="p-4 space-y-4">
    <div class="flex flex-wrap gap-4 items-start">
      <UCarousel class="w-80" :items="['/parity/demo.png', '/parity/demo.png', '/parity/demo.png']">
        <template #default="{ item }"><img :src="item" class="w-80"></template>
      </UCarousel>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <UCarousel orientation="vertical" class="h-64" :items="['/parity/demo.png', '/parity/demo.png', '/parity/demo.png']">
        <template #default="{ item }"><img :src="item" class="w-80"></template>
      </UCarousel>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <UCarousel arrows class="w-80" :items="['/parity/demo.png', '/parity/demo.png', '/parity/demo.png']">
        <template #default="{ item }"><img :src="item" class="w-80"></template>
      </UCarousel>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <UCarousel dots class="w-80" :items="['/parity/demo.png', '/parity/demo.png', '/parity/demo.png']">
        <template #default="{ item }"><img :src="item" class="w-80"></template>
      </UCarousel>
    </div>
  </div>
</template>
