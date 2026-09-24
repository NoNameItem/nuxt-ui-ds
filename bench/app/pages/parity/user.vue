<template>
  <div class="p-4 space-y-4">
    <div class="flex flex-wrap gap-4 items-start">
      <UUser name="Ada Lovelace" description="Engineer" :avatar="{ src: '/parity/demo.png' }" />
      <UUser name="Ada Lovelace" description="Engineer" :avatar="{ src: '/parity/demo.png' }" orientation="vertical" />
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <UUser name="Ada Lovelace" description="Engineer" :avatar="{ src: '/parity/demo.png' }" size="3xs" />
      <UUser name="Ada Lovelace" description="Engineer" :avatar="{ src: '/parity/demo.png' }" size="2xs" />
      <UUser name="Ada Lovelace" description="Engineer" :avatar="{ src: '/parity/demo.png' }" size="xs" />
      <UUser name="Ada Lovelace" description="Engineer" :avatar="{ src: '/parity/demo.png' }" size="sm" />
      <UUser name="Ada Lovelace" description="Engineer" :avatar="{ src: '/parity/demo.png' }" size="md" />
      <UUser name="Ada Lovelace" description="Engineer" :avatar="{ src: '/parity/demo.png' }" size="lg" />
      <UUser name="Ada Lovelace" description="Engineer" :avatar="{ src: '/parity/demo.png' }" size="xl" />
      <UUser name="Ada Lovelace" description="Engineer" :avatar="{ src: '/parity/demo.png' }" size="2xl" />
      <UUser name="Ada Lovelace" description="Engineer" :avatar="{ src: '/parity/demo.png' }" size="3xl" />
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <UUser name="Ada Lovelace" description="Engineer" :avatar="{ src: '/parity/demo.png' }" to="#" />
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <UUser name="Ada Lovelace" :avatar="{ src: '/parity/demo.png' }" />
    </div>
  </div>
</template>
