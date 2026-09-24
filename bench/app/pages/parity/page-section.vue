<template>
  <div class="p-4 space-y-4">
    <div class="w-full flex flex-wrap gap-4 items-start">
      <div class="w-full">
        <UPageSection title="Title" />
      </div>
    </div>
    <div class="w-full flex flex-wrap gap-4 items-start">
      <div class="w-full">
        <UPageSection description="Description text for the parity testbed." />
      </div>
    </div>
    <div class="w-full flex flex-wrap gap-4 items-start">
      <div class="w-full">
        <UPageSection>
          Description text for the parity testbed.
        </UPageSection>
      </div>
    </div>
    <div class="w-full flex flex-wrap gap-4 items-start">
      <div class="w-full">
        <UPageSection title="Title" description="Description text for the parity testbed." />
      </div>
    </div>
    <div class="w-full flex flex-wrap gap-4 items-start">
      <div class="w-full">
        <UPageSection reverse title="Title" description="Description text for the parity testbed." />
      </div>
    </div>
    <div class="w-full flex flex-wrap gap-4 items-start">
      <div class="w-full">
        <UPageSection headline="Headline" title="Title" description="Description text for the parity testbed." />
      </div>
    </div>
    <div class="w-full flex flex-wrap gap-4 items-start">
      <div class="w-full">
        <UPageSection
          title="Title"
          description="Description text for the parity testbed."
          :links="[
            { label: 'Label', icon: 'i-lucide-rocket' },
            { label: 'Label', variant: 'outline', trailingIcon: 'i-lucide-arrow-right' }
          ]"
        />
      </div>
    </div>
    <div class="w-full flex flex-wrap gap-4 items-start">
      <div class="w-full">
        <UPageSection
          title="Title"
          description="Description text for the parity testbed."
          :features="[
            { title: 'Title', description: 'Description text for the parity testbed.', icon: 'i-lucide-rocket' },
            { title: 'Title', description: 'Description text for the parity testbed.', icon: 'i-lucide-rocket' },
            { title: 'Title', description: 'Description text for the parity testbed.', icon: 'i-lucide-rocket' }
          ]"
        />
      </div>
    </div>
  </div>
</template>
