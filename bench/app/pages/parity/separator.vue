<template>
  <div class="p-4 space-y-4">
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64">
        <USeparator orientation="horizontal" position="start" label="Label" />
      </div>
      <div class="w-64">
        <USeparator orientation="horizontal" position="center" label="Label" />
      </div>
      <div class="w-64">
        <USeparator orientation="horizontal" position="end" label="Label" />
      </div>
      <div class="h-32">
        <USeparator orientation="vertical" position="start" label="Label" />
      </div>
      <div class="h-32">
        <USeparator orientation="vertical" position="center" label="Label" />
      </div>
      <div class="h-32">
        <USeparator orientation="vertical" position="end" label="Label" />
      </div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64">
        <USeparator orientation="horizontal" size="xs" />
      </div>
      <div class="w-64">
        <USeparator orientation="horizontal" size="sm" />
      </div>
      <div class="w-64">
        <USeparator orientation="horizontal" size="md" />
      </div>
      <div class="w-64">
        <USeparator orientation="horizontal" size="lg" />
      </div>
      <div class="w-64">
        <USeparator orientation="horizontal" size="xl" />
      </div>
      <div class="h-32">
        <USeparator orientation="vertical" size="xs" />
      </div>
      <div class="h-32">
        <USeparator orientation="vertical" size="sm" />
      </div>
      <div class="h-32">
        <USeparator orientation="vertical" size="md" />
      </div>
      <div class="h-32">
        <USeparator orientation="vertical" size="lg" />
      </div>
      <div class="h-32">
        <USeparator orientation="vertical" size="xl" />
      </div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64">
        <USeparator orientation="horizontal" color="primary" />
      </div>
      <div class="w-64">
        <USeparator orientation="horizontal" color="secondary" />
      </div>
      <div class="w-64">
        <USeparator orientation="horizontal" color="success" />
      </div>
      <div class="w-64">
        <USeparator orientation="horizontal" color="info" />
      </div>
      <div class="w-64">
        <USeparator orientation="horizontal" color="warning" />
      </div>
      <div class="w-64">
        <USeparator orientation="horizontal" color="error" />
      </div>
      <div class="w-64">
        <USeparator orientation="horizontal" color="neutral" />
      </div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64">
        <USeparator orientation="horizontal" type="solid" />
      </div>
      <div class="w-64">
        <USeparator orientation="horizontal" type="dashed" />
      </div>
      <div class="w-64">
        <USeparator orientation="horizontal" type="dotted" />
      </div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64">
        <USeparator orientation="horizontal" label="Label" />
      </div>
      <div class="w-64">
        <USeparator orientation="horizontal" icon="i-lucide-rocket" />
      </div>
      <div class="w-64">
        <USeparator orientation="horizontal" :avatar="{ src: '/parity/demo.png' }" />
      </div>
    </div>
  </div>
</template>
