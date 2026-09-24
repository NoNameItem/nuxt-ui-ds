<script setup>
import { defineComponent, onMounted } from 'vue'

/* Тот же приём, что в toast--color.vue: useToast() должен вызываться из потомка
   UToaster, иначе :max не долетает через provide/inject (здесь не критично — тостов
   меньше дефолтного max=5 — но композиция единообразна со всеми toast--* страницами). */
const ToastTrigger = defineComponent({
  setup() {
    onMounted(() => {
      const toast = useToast()
      toast.add({ description: 'Description text for the parity testbed.', icon: 'i-lucide-rocket', orientation: 'horizontal', actions: [{ label: 'Label' }, { label: 'Label', variant: 'outline' }] })
      toast.add({ description: 'Description text for the parity testbed.', icon: 'i-lucide-rocket', orientation: 'vertical', actions: [{ label: 'Label' }, { label: 'Label', variant: 'outline' }] })
    })
    return () => null
  }
})
</script>

<template>
  <UToaster position="top-right" :duration="60000" :max="20" :expand="true">
    <ToastTrigger />
  </UToaster>
</template>
