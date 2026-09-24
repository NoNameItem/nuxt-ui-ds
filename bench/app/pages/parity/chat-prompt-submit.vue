<template>
  <div class="p-4 space-y-4">
    <div class="flex flex-wrap gap-4 items-start">
      <UChatPromptSubmit status="ready" />
      <UChatPromptSubmit status="submitted" />
      <UChatPromptSubmit status="streaming" />
      <UChatPromptSubmit status="error" />
    </div>
  </div>
</template>
