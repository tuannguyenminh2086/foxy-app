<template>
  <div class="bg-white px-4 py-3 grid grid-cols-12 gap-4 items-center rounded-lg hover:shadow-md transition-all">
    <div class="col-span-1"><span class="text-muted-foreground text-sm">#11111</span></div>
    <div class="col-span-5">
      <span class="font-semibold cursor-pointer">Task name...</span>
    </div>
    <div class="col-span-3">status</div>
    <div class="col-span-2">02:00:11</div>
    <div class="col-span-1 flex justify-end">
      <Button size="icon" class="">
        <PlayIcon class="w-4 h-4"  />
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { StopwatchIcon,  PlayIcon } from '@radix-icons/vue'
</script>

<style scoped>

</style>