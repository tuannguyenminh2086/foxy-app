<template>
  <Card v-if="task" :id="task.id"
    class="cursor-pointer"
    draggable="true"
    @dragstart="dragStart($event, task)"
  >
    <CardHeader class="relative">
      <CardTitle class="space-y-2 ">
        <div class="text-xs text-muted-foreground">#{{ task.id }}</div>
        <h4 class="font-bold overflow-hidden block max-w-[320px] truncate leading-normal">{{  task?.name }}</h4>
        <div>
          <p class="text-xs text-muted-foreground font-light">{{ task.project?.name }}</p>
        </div>

       
      </CardTitle>
      <Button v-if="task.state !== 4 " size="icon" class="h-8 w-8 rounded-sm absolute top-5 right-5 z-10 " variant="outline" >
          <LapTimerIcon class="w-4 h-4 "  />
        </Button>
    </CardHeader>
    <CardFooter>
      <div class="grid grid-cols-2 gap-4 w-full">
        <div>
          <span v-if="task.due_date" class="flex items-center text-sm">
            <CalendarIcon class="w-4 h-4 mr-1" />
            {{ $formatDate(task.due_date, 'DD MMM,YYYY') }}
          </span>
        </div>
        <div class="flex justify-end">
          <span v-if="task.spent" class="flex items-center text-sm leading-none" :class="overIndicator">
            <ClockIcon class="w-4 h-4 mr-1"  />
            {{ $duration(task.spent) }}
          </span>
        </div>
      </div>
    </CardFooter>
  </Card>
</template>

<script setup lang="ts">
import { CalendarIcon, ClockIcon, LapTimerIcon, TimerIcon } from '@radix-icons/vue';
import type { PropType } from 'vue';
import type { ITask } from '~/types/tasks';

  const props = defineProps({
    task: Object as PropType<ITask>
  })

  const overIndicator = computed(() => {

    if (props.task?.est_time && props.task.spent) {
      return props.task.spent > props.task.est_time ? 'text-red-500' : ''
    }

  })


  const dragStart = (event:any, task:ITask) => {
    event.dataTransfer.setData('text/plain', task.id);
  };
  
</script>

<style scoped>

</style>