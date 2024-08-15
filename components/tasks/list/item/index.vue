<template>
  <div v-if="task" class="bg-white px-4 py-3 grid grid-cols-12 gap-4 items-center rounded-lg hover:shadow-md transition-all">
    <div class="col-span-1"><span class="text-muted-foreground text-sm">{{ task.id }}</span></div>
    <div class="col-span-5">
      <span class="font-semibold cursor-pointer" >{{ task?.name }}</span>
      <span class="text-xs block text-muted-foreground">{{  task.project?.name }}</span>
    </div>
    <div class="col-span-3">{{ task?.state }}</div>
    <div class="col-span-2">{{ task.spent }}</div>
    <div class="col-span-1 flex justify-end">
      <Button size="icon" class="">
        <PlayIcon class="w-4 h-4"  />
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { StopwatchIcon,  PlayIcon } from '@radix-icons/vue'
  import type { PropType } from "vue";
  import type { ITask } from "~/types/tasks";

  defineProps({
    task: Object as PropType<ITask>
  })

</script>

<style scoped>

</style>