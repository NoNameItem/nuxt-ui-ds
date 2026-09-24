<template>
  <div class="p-4 space-y-4">
    <div class="w-full max-w-3xl flex flex-wrap gap-4 items-start">
      <div class="w-full">
        <UBlogPosts orientation="horizontal">
          <UBlogPost title="Title" description="Description text for the parity testbed." :image="'/parity/demo.png'" />
          <UBlogPost title="Title" description="Description text for the parity testbed." :image="'/parity/demo.png'" />
        </UBlogPosts>
      </div>
    </div>
    <div class="w-full max-w-3xl flex flex-wrap gap-4 items-start">
      <div class="w-full">
        <UBlogPosts orientation="vertical">
          <UBlogPost title="Title" description="Description text for the parity testbed." :image="'/parity/demo.png'" />
          <UBlogPost title="Title" description="Description text for the parity testbed." :image="'/parity/demo.png'" />
        </UBlogPosts>
      </div>
    </div>
  </div>
</template>
