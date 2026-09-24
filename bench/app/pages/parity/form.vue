<template>
  <div class="p-4 space-y-4">
    <div class="flex flex-wrap gap-4 items-start">
      <div class="w-64">
        <UForm :state="{}">
          <UFormField label="Label">
            <UInput placeholder="Placeholder" />
          </UFormField>
        </UForm>
      </div>
    </div>
  </div>
</template>
