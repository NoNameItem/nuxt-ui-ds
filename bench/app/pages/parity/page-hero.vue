<template>
  <div class="p-4 space-y-4">
    <div class="w-full flex flex-wrap gap-4 items-start">
      <div class="w-full">
        <UPageHero orientation="horizontal" title="Title" description="Description text for the parity testbed.">
          <img src="/parity/demo.png" class="w-full">
        </UPageHero>
      </div>
    </div>
    <div class="w-full flex flex-wrap gap-4 items-start">
      <div class="w-full">
        <UPageHero orientation="vertical" title="Title" description="Description text for the parity testbed." />
      </div>
    </div>
    <div class="w-full flex flex-wrap gap-4 items-start">
      <div class="w-full">
        <UPageHero orientation="horizontal" reverse title="Title" description="Description text for the parity testbed.">
          <img src="/parity/demo.png">
        </UPageHero>
      </div>
    </div>
    <div class="w-full flex flex-wrap gap-4 items-start">
      <div class="w-full">
        <UPageHero headline="Headline" title="Title" description="Description text for the parity testbed." />
      </div>
    </div>
    <div class="w-full flex flex-wrap gap-4 items-start">
      <div class="w-full">
        <UPageHero description="Description text for the parity testbed." />
      </div>
    </div>
    <div class="w-full flex flex-wrap gap-4 items-start">
      <div class="w-full">
        <UPageHero
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
        <UPageHero title="Title" description="Description text for the parity testbed.">
          <img src="/parity/demo.png" class="w-full">
        </UPageHero>
      </div>
    </div>
  </div>
</template>
