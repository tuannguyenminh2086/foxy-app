<template>
  <div class="px-5">
    <h1 class="text-2xl font-normal">
      Hello,
      <span class="block font-bold text-3xl">Mariana</span>
    </h1>
    <div>  {{ status }}</div>
    <div> {{  data  }}</div>
  </div>
</template>

<script>
definePageMeta({ middleware: 'auth' })
export default {
  setup () {
    const { data } = useAuthState()
    console.log(data.value);

    return {
      status,
      data
    }
  }
}
</script>

<style lang="scss" scoped>

</style>