<template>
  <div class="p-4 space-y-4">
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64">
        <UFormField size="xs" label="Label" description="Description text for the parity testbed." hint="Hint" help="Help">
          <UInput placeholder="Placeholder" />
        </UFormField>
      </div>
      <div class="w-64">
        <UFormField size="sm" label="Label" description="Description text for the parity testbed." hint="Hint" help="Help">
          <UInput placeholder="Placeholder" />
        </UFormField>
      </div>
      <div class="w-64">
        <UFormField size="md" label="Label" description="Description text for the parity testbed." hint="Hint" help="Help">
          <UInput placeholder="Placeholder" />
        </UFormField>
      </div>
      <div class="w-64">
        <UFormField size="lg" label="Label" description="Description text for the parity testbed." hint="Hint" help="Help">
          <UInput placeholder="Placeholder" />
        </UFormField>
      </div>
      <div class="w-64">
        <UFormField size="xl" label="Label" description="Description text for the parity testbed." hint="Hint" help="Help">
          <UInput placeholder="Placeholder" />
        </UFormField>
      </div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64">
        <UFormField orientation="vertical" label="Label">
          <UInput placeholder="Placeholder" />
        </UFormField>
      </div>
      <div class="w-64">
        <UFormField orientation="horizontal" label="Label">
          <UInput placeholder="Placeholder" />
        </UFormField>
      </div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64">
        <UFormField required label="Label">
          <UInput placeholder="Placeholder" />
        </UFormField>
      </div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64">
        <UFormField error="Error message" label="Label">
          <UInput placeholder="Placeholder" />
        </UFormField>
      </div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64">
        <UFormField label="Label">
          <UInput placeholder="Placeholder" />
        </UFormField>
      </div>
    </div>
  </div>
</template>
