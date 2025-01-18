<template>
  <header id="header" class="px-5 sticky z-40 top-0 border-b border-gray-200 py-4 bg-white dark:bg-black dark:border-gray-800">
    <div class="grid grid-cols-12 gap-5">
      <div class="col-span-6 lg:col-span-2 flex items-center space-x-5">
        <!-- <Button variant="ghost" size="icon" class="z-20 cursor-pointer"
         @click="toggleMenu"
        >
          <HamburgerMenuIcon class="w-4 h-4"   />
        </Button> -->
        <MasterHeaderLogo class="w-6 h-6" />
      </div>
      <div class="col-span-6 hidden lg:col-span-8 lg:flex lg:justify-end ">
        <BlocksAnnouncement />
      </div>
      <div class="col-span-6 lg:col-span-2 flex flex-1 md:justify-end items-center space-x-4">
        <AuthUserNav />
        <MasterHeaderLightMode />
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