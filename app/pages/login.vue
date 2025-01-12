<template>
  <div>
    <AuthLoginForm />
  </div>
</template>



<script setup lang="ts">
  definePageMeta({
    layout: 'auth',
    title: 'login',
    auth: {
      unauthenticatedOnly: true,
      navigateAuthenticatedTo: '/',
    }
  })


</script>

<style lang="scss" scoped>

</style>