<template>
  <ContainerOneCol>
    <template #['col-a']>

      <BlocksWelcome />
      <BlocksTime />
      <BlocksTrackingToday />
      <BlocksStats />
     

    </template>
    <template #default>
      <div class="col-span-full">
        <BlocksTrackingWeek />
      </div>
      <div class="col-span-full">
        <TasksList :list=tasksInProgress title="Tasks: On Progress" :show-view-all="true" />
      </div>
      
    </template>
  </ContainerOneCol>
</template>

<script>
definePageMeta({ 
  middleware: 'auth'
})

useHead({
  title: 'Dashboard'
})

import { useTasksStore } from '~/store/tasks';

export default {
  setup () {
    const tasksStore = useTasksStore()
    const { tasksInProgress } = storeToRefs(tasksStore)
    tasksStore.fetchTasks();
    
    return {
      tasksInProgress
    }
  }
}
</script>

<style lang="scss" scoped>

</style>