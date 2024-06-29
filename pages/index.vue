<template>
  <div>
    <h1 class="text-2xl font-bold">{{ status }}</h1>
  </div>
</template>

<script>
definePageMeta({ middleware: 'auth' })
export default {
  setup () {
    const { status, data } = useAuth();
    console.log(data.value);


    return {
      status
    }
  }
}
</script>

<style lang="scss" scoped>

</style>