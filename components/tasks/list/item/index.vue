<template>
  <div v-if="task" class="border px-4 py-3 grid grid-cols-12 gap-4 items-center rounded-lg hover:shadow-md transition-all">
    <div class="col-span-1"><span class="text-muted-foreground text-sm">{{ task.id }}</span></div>
    <div class="col-span-5">
      <span class="font-semibold cursor-pointer overflow-hidden block max-w-[500px] truncate" >{{ task?.name }}</span>
      <span class="text-xs block text-muted-foreground">{{  task.project?.name }}</span>
    </div>
    <div class="col-span-2">
      <TasksListItemState :state="task?.state" />
    </div>
    <div class="col-span-2">
      <span class="text-sm font-bold">{{ $duration(task.spent ?? 0) }}</span>
      <span class="text-xs block text-muted-foreground">spent</span>
    </div>
    <div class="col-span-2 flex justify-end space-x-2">
      
      <Button size="icon" class="h-8 w-8 rounded-sm " @click="quickView = true">
        <EyeOpenIcon class="w-4 h-4"  />
      </Button>
      <Button size="icon" class="h-8 w-8 rounded-sm bg-green-500 hover:bg-green-600">
        <TimerIcon class="w-4 h-4"  />
      </Button>
    </div>
  </div>

    <Teleport to="body">
      <Transition name="slide">
        <TasksDetailQuickView 
          v-if="quickView && task" 
          :tid="task.id"
          :active="quickView"
          @close="quickView = false"
        />
      </Transition>
    </Teleport>
</template>

<script setup lang="ts">
import { TimerIcon, EyeOpenIcon } from '@radix-icons/vue'
  import type { PropType } from "vue";
  import type { ITask } from "~/types/tasks";
  const { $duration } = useNuxtApp();


  defineProps({
    task: Object as PropType<ITask>
  })

  const quickView = ref(false);
  
</script>

<style scoped>
.slide-enter-active {
  transition: all 0.3s ease-out;
}

.slide-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}


</style>