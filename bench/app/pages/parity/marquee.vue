<template>
  <div class="p-4 space-y-4">
    <div class="w-full max-w-3xl flex flex-wrap gap-4 items-start">
      <div class="w-full">
        <UMarquee>
          <UBadge label="Label" />
          <UBadge label="Label" />
          <UBadge label="Label" />
          <UBadge label="Label" />
          <UBadge label="Label" />
        </UMarquee>
      </div>
    </div>
    <div class="w-full max-w-3xl flex flex-wrap gap-4 items-start">
      <div class="w-full">
        <UMarquee orientation="vertical" class="h-48">
          <UBadge label="Label" />
          <UBadge label="Label" />
          <UBadge label="Label" />
          <UBadge label="Label" />
          <UBadge label="Label" />
        </UMarquee>
      </div>
    </div>
    <div class="w-full max-w-3xl flex flex-wrap gap-4 items-start">
      <div class="w-full">
        <UMarquee overlay>
          <UBadge label="Label" />
          <UBadge label="Label" />
          <UBadge label="Label" />
          <UBadge label="Label" />
          <UBadge label="Label" />
        </UMarquee>
      </div>
    </div>
    <div class="w-full max-w-3xl flex flex-wrap gap-4 items-start">
      <div class="w-full">
        <UMarquee orientation="vertical" overlay class="h-48">
          <UBadge label="Label" />
          <UBadge label="Label" />
          <UBadge label="Label" />
          <UBadge label="Label" />
          <UBadge label="Label" />
        </UMarquee>
      </div>
    </div>
  </div>
</template>
