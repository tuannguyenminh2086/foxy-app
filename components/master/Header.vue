<template>
  <header id="header" class="px-5 sticky z-40 top-0 border-border py-4 bg-[#f3f3f3]">
    <div class="grid grid-cols-12 gap-5">
      <div class="col-span-6 lg:col-span-2 flex items-center">
        <NuxtLink to="/" class="w-8 h-8">
          <NuxtImg src="/assets/img/foxy-app.svg" alt="foxy app" />
        </NuxtLink>
      </div>
      <div class="col-span-6 hidden lg:block lg:col-span-6 "></div>
      <div class="col-span-6 lg:col-span-4 flex flex-1 md:justify-end items-center space-x-4">
       <AuthUserNav />
      
       <Button variant="destructive">
          <PlayIcon class="w-4 h-4 mr-2"  /> Quick Record
       </Button>
       <MasterLightMode />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { PlayIcon } from '@radix-icons/vue';


</script>

<style scoped>

</style>