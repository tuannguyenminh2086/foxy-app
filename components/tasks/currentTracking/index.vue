<template>
  <div class="bg-slate-100 p-5 rounded-lg ">
    <div class="grid grid-cols-12 gap-5">
      <div class="col-span-2"><span class="text-sm leading-none">Current tracking</span></div>
      <div class="col-span-3">
        <span class="text-4xl font-bold">10:00:44</span>
      </div>
      <div class="col-span-5">
        <div class="text-base font-semibold">Update contract agreement</div>
        <div>Project name xxxx</div>
      </div>
      <div class="col-span-2 flex justify-end">
        <div class="flex items-center gap-2">
          <Button variant="destructive" size="icon"><PauseIcon class="w-4 h-4" /></Button>
          <Button size="icon"><StopwatchIcon class="w-4 h-4" /></Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { PauseIcon, StopwatchIcon } from '@radix-icons/vue'

</script>

<style scoped>

</style>