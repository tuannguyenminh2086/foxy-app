<template>
  <header id="header" class="px-5 sticky z-40 top-0 border-border py-4 bg-white dark:bg-black">
    <div class="grid grid-cols-12 gap-5">
      <div class="col-span-6 lg:col-span-2 flex items-center space-x-5">
        <Button variant="outline" size="icon" class="rounded-full z-20 cursor-pointer"
         @click="toggleMenu"
        >
          <HamburgerMenuIcon class="w-4 h-4"   />
        </Button>

        <NuxtLink to="/" class="w-8 h-8">
          <NuxtImg src="/assets/img/foxy-app.svg" alt="foxy app" />
        </NuxtLink>
      </div>
      <div class="col-span-6 hidden lg:col-span-7 lg:flex lg:justify-end ">
        <BlocksAnnouncement />
      </div>
      <div class="col-span-6 lg:col-span-3 flex flex-1 md:justify-end items-center space-x-4">
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
import { HamburgerMenuIcon, PlayIcon } from '@radix-icons/vue';
import { useAppStore } from '~/store/app';

const appStore = useAppStore();

const toggleMenu = () => {
  appStore.toggleSidebar()
}

</script>

<style scoped>

</style>