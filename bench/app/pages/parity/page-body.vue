<template>
  <div class="p-4 space-y-4">
    <div class="w-full max-w-3xl flex flex-wrap gap-4 items-start">
      <div class="w-full">
        <!-- Три блока, а не один абзац: тема несёт `mt-8 pb-24 space-y-12`, и при одном
             ребёнке `space-y-12` нечего разносить, а при странице короче окна (800px)
             `pb-24` не входит в высоту кадра — оба класса нулём не проверяются
             (nuxt-ui-ds-w9w). Три блока по 16rem дают два зазора по 48px и высоту
             документа около 1024px, то есть больше кадра: потерянный нижний отступ
             изменит размер снимка. -->
        <UPageBody>
          <div class="bg-elevated h-64" />
          <div class="bg-elevated h-64" />
          <div class="bg-elevated h-64" />
        </UPageBody>
      </div>
    </div>
  </div>
</template>
