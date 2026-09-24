<template>
  <div class="p-4 space-y-4">
    <div class="w-full flex flex-wrap gap-4 items-start">
      <div class="w-full">
        <UPageHeader title="Title" description="Description text for the parity testbed." />
      </div>
    </div>
    <div class="w-full flex flex-wrap gap-4 items-start">
      <div class="w-full">
        <UPageHeader title="Title" description="Description text for the parity testbed." headline="Headline" />
      </div>
    </div>
    <div class="w-full flex flex-wrap gap-4 items-start">
      <div class="w-full">
        <UPageHeader
          title="Title"
          description="Description text for the parity testbed."
          :links="[
            { label: 'Label', icon: 'i-lucide-rocket' },
            { label: 'Label', variant: 'outline', trailingIcon: 'i-lucide-arrow-right' }
          ]"
        />
      </div>
    </div>
  </div>
</template>
