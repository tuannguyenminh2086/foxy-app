<template>
  <div class="fixed py-4 px-2 top-16 left-2.5 transition-all duration-500 "
    :class="{
      'translate-x-0 opacity-100 z-50 visible': isSidebarOpen,
      '-translate-x-full opacity-0 z-0 invisible': !isSidebarOpen,
    }"
  >
    <div class="bg-slate-50 rounded-xl min-h-48 min-w-10 shadow-xl py-5 flex flex-col space-y-2" ref="target">
      <Button variant="link" >
        <NuxtLink to="/" class="">
          <DashboardIcon/>
        </NuxtLink>
      </Button>
      <Button variant="link" >
        <NuxtLink to="/tasks" class="">
          <LayoutIcon />
        </NuxtLink>
      </Button>
    </div>
  </div>
</template>

<script setup>
import { BarChartIcon, DashboardIcon, HomeIcon, LayoutIcon, StackIcon } from '@radix-icons/vue';
import { useAppStore } from '~/store/app';
import { onClickOutside } from '@vueuse/core'

const appStore = useAppStore();
const { isSidebarOpen } = storeToRefs(appStore)
const target = ref(null);

onClickOutside(target, event => appStore.closeSidebar())

</script>

<style lang="scss" scoped>

</style>