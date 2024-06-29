<template>
  <div>
    <h1 class="text-2xl font-bold">Authenticated</h1>
  </div>
</template>

<script>
definePageMeta({ middleware: 'auth' })
export default {
  setup () {
  
    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>