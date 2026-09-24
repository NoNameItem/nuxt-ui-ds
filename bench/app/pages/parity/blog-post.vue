<template>
  <div class="p-4 space-y-4">
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-80">
        <UBlogPost variant="outline" title="Title" description="Description text for the parity testbed." :image="'/parity/demo.png'" />
      </div>
      <div class="w-80">
        <UBlogPost variant="soft" title="Title" description="Description text for the parity testbed." :image="'/parity/demo.png'" />
      </div>
      <div class="w-80">
        <UBlogPost variant="subtle" title="Title" description="Description text for the parity testbed." :image="'/parity/demo.png'" />
      </div>
      <div class="w-80">
        <UBlogPost variant="ghost" title="Title" description="Description text for the parity testbed." :image="'/parity/demo.png'" />
      </div>
      <div class="w-80">
        <UBlogPost variant="naked" title="Title" description="Description text for the parity testbed." :image="'/parity/demo.png'" />
      </div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-80">
        <UBlogPost variant="naked" orientation="vertical" title="Title" description="Description text for the parity testbed." />
      </div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-80">
        <UBlogPost variant="ghost" to="#" orientation="vertical" title="Title" description="Description text for the parity testbed." :image="'/parity/demo.png'" />
      </div>
      <div class="w-80">
        <UBlogPost variant="ghost" to="#" orientation="horizontal" title="Title" description="Description text for the parity testbed." :image="'/parity/demo.png'" />
      </div>
    </div>
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-80">
        <UBlogPost orientation="horizontal" title="Title" description="Description text for the parity testbed." :image="'/parity/demo.png'" />
      </div>
      <div class="w-80">
        <UBlogPost orientation="vertical" title="Title" description="Description text for the parity testbed." :image="'/parity/demo.png'" />
      </div>
      <div class="w-80">
        <UBlogPost badge="Label" date="2026-01-15" :authors="[{ name: 'Ada Lovelace', description: 'Engineer', avatar: { src: '/parity/demo.png' } }]" title="Title" description="Description text for the parity testbed." :image="'/parity/demo.png'" />
      </div>
    </div>
  </div>
</template>
