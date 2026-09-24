<script setup>
import { defineComponent, onMounted } from 'vue'

/* Тот же приём, что в toast--color.vue: useToast() должен вызываться из потомка
   UToaster, иначе :max не долетает через provide/inject (здесь ровно 5 тостов — на
   границе дефолтного max=5, композиция единообразна со всеми toast--* страницами). */
const ToastTrigger = defineComponent({
  setup() {
    onMounted(() => {
      const toast = useToast()
      toast.add({ title: 'Title', icon: 'i-lucide-rocket', description: 'Description text for the parity testbed.' })
      toast.add({ title: 'Title', icon: 'i-lucide-rocket', actions: [{ label: 'Label' }, { label: 'Label', variant: 'outline' }] })
      toast.add({ title: 'Title', icon: 'i-lucide-rocket', close: false })
      toast.add({ title: 'Title', avatar: { src: '/parity/demo.png' } })
      toast.add({ title: 'Title', icon: 'i-lucide-rocket', progress: false })
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
