<template>
  <div className='h-full flex-1 min-w-[300px]'
    @dragover.prevent
    @drop="drop($event)"
  >
    <div className='px-4 py-2 mb-5 flex space-x-2 items-center'>
      <span class="w-3 h-3 rounded-full block" :class="indicatorClass"></span>
      <h4 class="text-base font-semibold">{{ title }}</h4>
      <Badge :class="indicatorClass">{{ filteredTasks.length }}</Badge>
    </div>

    <div
      className='mt-3.5 h-full w-full p-0 overflow-hidden overflow-y-auto pb-40 no-scrollbar'
    >
      <div className='flex flex-col gap-4'
        
      >
        <TasksCard v-for="task in filteredTasks" :task="task" :key="task.id" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import { useTasksStore } from '~/store/tasks';
import type { TState } from '~/types/tasks';

 const props = defineProps({
  title: String,
  status: Number as PropType<TState>
 })

 const emit = defineEmits(['moveCard'])

 const tasksStore = useTasksStore()
 const { tasks } = storeToRefs(tasksStore)

 const filteredTasks = computed(() => {
  return tasks.value.filter( task => task.state === props.status)
 })

 const drop = (event:any) => {
    const cardId = event.dataTransfer.getData('text/plain');
    emit('moveCard', parseInt(cardId, 10), props.status);
  };

  const indicatorClass =  computed(() => {
    switch (props.status) {
      case 1:
        return 'bg-emerald-500'
      case 2:
        return 'bg-sky-500'
      case 3:
        return 'bg-orange-500'
      case 4:
        return 'bg-green-500'
    
      default:
        return '';
    }
  })


</script>

<style lang="scss" scoped>

</style>