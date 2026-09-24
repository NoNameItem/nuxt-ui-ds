<script setup>
onMounted(() => {
  const toast = useToast()
  toast.add({ title: 'Title', description: 'Description text for the parity testbed.', icon: 'i-lucide-rocket' })
  toast.add({ title: 'Title', description: 'Description text for the parity testbed.', color: 'success', icon: 'i-lucide-rocket' })
})
</script>

<template>
  <UToaster position="top-left" :duration="60000" />
</template>
