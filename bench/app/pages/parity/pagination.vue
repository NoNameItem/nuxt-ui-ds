<template>
  <div class="p-4 space-y-4">
    <div class="flex flex-wrap gap-4 items-start">
      <UPagination :total="100" :page="5" />
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <UPagination :total="100" :page="5" show-edges />
    </div>
  </div>
</template>
