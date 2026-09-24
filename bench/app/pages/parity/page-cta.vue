<template>
  <div class="p-4 space-y-4">
    <div class="w-full flex flex-wrap gap-4 items-start">
      <div class="w-full">
        <UPageCTA
          orientation="horizontal"
          title="Title"
          description="Description text for the parity testbed."
          :links="[
            { label: 'Label', icon: 'i-lucide-rocket' },
            { label: 'Label', variant: 'outline', trailingIcon: 'i-lucide-arrow-right' }
          ]"
        >
          <img src="/parity/demo.png" class="w-full">
        </UPageCTA>
      </div>
    </div>
    <div class="w-full flex flex-wrap gap-4 items-start">
      <div class="w-full">
        <UPageCTA
          orientation="vertical"
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
        <UPageCTA
          variant="solid"
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
        <UPageCTA
          variant="outline"
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
        <UPageCTA
          variant="soft"
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
        <UPageCTA
          variant="subtle"
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
        <UPageCTA
          variant="naked"
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
        <UPageCTA
          reverse
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
        <UPageCTA
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
