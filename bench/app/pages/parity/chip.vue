<template>
  <div class="p-4 space-y-4">
    <div class="flex flex-wrap gap-4 items-start">
      <UChip inset position="top-right">
        <UAvatar src="/parity/demo.png" />
      </UChip>
      <UChip inset position="bottom-right">
        <UAvatar src="/parity/demo.png" />
      </UChip>
      <UChip inset position="top-left">
        <UAvatar src="/parity/demo.png" />
      </UChip>
      <UChip inset position="bottom-left">
        <UAvatar src="/parity/demo.png" />
      </UChip>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <UChip color="primary">
        <UAvatar src="/parity/demo.png" />
      </UChip>
      <UChip color="secondary">
        <UAvatar src="/parity/demo.png" />
      </UChip>
      <UChip color="success">
        <UAvatar src="/parity/demo.png" />
      </UChip>
      <UChip color="info">
        <UAvatar src="/parity/demo.png" />
      </UChip>
      <UChip color="warning">
        <UAvatar src="/parity/demo.png" />
      </UChip>
      <UChip color="error">
        <UAvatar src="/parity/demo.png" />
      </UChip>
      <UChip color="neutral">
        <UAvatar src="/parity/demo.png" />
      </UChip>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <UChip size="3xs">
        <UAvatar src="/parity/demo.png" />
      </UChip>
      <UChip size="2xs">
        <UAvatar src="/parity/demo.png" />
      </UChip>
      <UChip size="xs">
        <UAvatar src="/parity/demo.png" />
      </UChip>
      <UChip size="sm">
        <UAvatar src="/parity/demo.png" />
      </UChip>
      <UChip size="md">
        <UAvatar src="/parity/demo.png" />
      </UChip>
      <UChip size="lg">
        <UAvatar src="/parity/demo.png" />
      </UChip>
      <UChip size="xl">
        <UAvatar src="/parity/demo.png" />
      </UChip>
      <UChip size="2xl">
        <UAvatar src="/parity/demo.png" />
      </UChip>
      <UChip size="3xl">
        <UAvatar src="/parity/demo.png" />
      </UChip>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <UChip standalone />
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <UChip text="42">
        <UAvatar src="/parity/demo.png" />
      </UChip>
      <UChip :show="false">
        <UAvatar src="/parity/demo.png" />
      </UChip>
    </div>
  </div>
</template>
