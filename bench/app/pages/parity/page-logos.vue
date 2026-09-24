<template>
  <div class="p-4 space-y-4">
    <div class="w-full max-w-3xl flex flex-wrap gap-4 items-start">
      <div class="w-full">
        <UPageLogos
          title="Title"
          :items="['i-lucide-home', 'i-lucide-user', 'i-lucide-settings', 'i-lucide-star', 'i-lucide-mail']"
        />
      </div>
    </div>
    <div class="w-full max-w-3xl flex flex-wrap gap-4 items-start">
      <div class="w-full">
        <UPageLogos
          title="Title"
          marquee
          :items="['i-lucide-home', 'i-lucide-user', 'i-lucide-settings', 'i-lucide-star', 'i-lucide-mail']"
        />
      </div>
    </div>
  </div>
</template>
