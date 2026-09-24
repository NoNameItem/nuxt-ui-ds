<template>
  <div class="p-4 space-y-4">
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64">
        <UPinInput variant="outline" />
      </div>
      <div class="w-64">
        <UPinInput variant="soft" />
      </div>
      <div class="w-64">
        <UPinInput variant="subtle" />
      </div>
      <div class="w-64">
        <UPinInput variant="ghost" />
      </div>
      <div class="w-64">
        <UPinInput variant="none" />
      </div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64">
        <UPinInput highlight color="primary" />
      </div>
      <div class="w-64">
        <UPinInput highlight color="secondary" />
      </div>
      <div class="w-64">
        <UPinInput highlight color="success" />
      </div>
      <div class="w-64">
        <UPinInput highlight color="info" />
      </div>
      <div class="w-64">
        <UPinInput highlight color="warning" />
      </div>
      <div class="w-64">
        <UPinInput highlight color="error" />
      </div>
      <div class="w-64">
        <UPinInput highlight color="neutral" />
      </div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64">
        <UPinInput size="xs" />
      </div>
      <div class="w-64">
        <UPinInput size="sm" />
      </div>
      <div class="w-64">
        <UPinInput size="md" />
      </div>
      <div class="w-64">
        <UPinInput size="lg" />
      </div>
      <div class="w-64">
        <UPinInput size="xl" />
      </div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64">
        <UPinInput :model-value="['1', '2', '3', '4', '5']" />
      </div>
      <div class="w-64">
        <UPinInput placeholder="○" />
      </div>
      <div class="w-64">
        <UPinInput disabled />
      </div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64">
        <UPinInput fixed />
      </div>
    </div>
  </div>
</template>
