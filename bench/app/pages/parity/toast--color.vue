<script setup>
import { defineComponent, onMounted } from 'vue'

/* useToast() читает :max тостера через provide/inject (Toaster.vue:37), а inject видит
   только предков вызывающего компонента. UToaster и onMounted этой страницы были бы
   соседями в дереве — :max="20" никогда бы не долетел, и useToast() молча обрезал бы
   список до дефолтных 5 (useToast.js: `max?.value ?? 5`, `.slice(-maxValue)`). Триггер
   вынесен в дочерний компонент внутри слота UToaster, чтобы стать его потомком. */
const ToastTrigger = defineComponent({
  setup() {
    onMounted(() => {
      const toast = useToast()
      toast.add({ title: 'Title', icon: 'i-lucide-rocket', color: 'primary' })
      toast.add({ title: 'Title', icon: 'i-lucide-rocket', color: 'secondary' })
      toast.add({ title: 'Title', icon: 'i-lucide-rocket', color: 'success' })
      toast.add({ title: 'Title', icon: 'i-lucide-rocket', color: 'info' })
      toast.add({ title: 'Title', icon: 'i-lucide-rocket', color: 'warning' })
      toast.add({ title: 'Title', icon: 'i-lucide-rocket', color: 'error' })
      toast.add({ title: 'Title', icon: 'i-lucide-rocket', color: 'neutral' })
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
