<template>
  <header id="header" class="px-5 border-b sticky z-40 top-0 border-border py-2">
    <div class="grid grid-cols-12 gap-5">
      <div class="col-span-6 lg:col-span-2 flex items-center">
        <NuxtLink to="/">
          <Avatar shape="square">
            <AvatarImage src="/assets/img/icon.png" alt="@foxy-app"  />
            <AvatarFallback>FA</AvatarFallback>
          </Avatar>
        </NuxtLink>
      </div>
      <div class="col-span-6 hidden lg:block lg:col-span-6 "></div>
      <div class="col-span-6 lg:col-span-4 flex flex-1 md:justify-end items-center space-x-2">
       <AuthUserNav />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>