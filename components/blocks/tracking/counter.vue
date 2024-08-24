<template>
  <div>
      {{ $duration(duration) }}
  </div>
</template>

<script setup lang="ts">
  const { $duration } = useNuxtApp();
  const props = defineProps({
    counter: Number
  })

  const intervalId = ref()
  const duration = ref(0)


  const startInterval = () => {
    intervalId.value = setInterval(() => {
      duration.value += 1
    }, 1000)
  } 

  const stopInterval = () => {
    if(intervalId.value) {
      clearInterval(intervalId.value)
    }
  }


  onMounted(() => {
    // startInterval()
  })

  onUnmounted(() => {
    stopInterval()
  })

</script>

<style scoped>

</style>