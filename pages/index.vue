<template>
  <ContainerOneCol>
    <template #['col-a']>

      <BlocksWelcome />
      <BlocksTime />
      <BlocksTrackingToday />
      <BlocksStats />
     

    </template>
    <template #default>
      <TasksCurrentTracking />
      <TasksList />
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

import { useQuery } from '@tanstack/vue-query'
import { useTasksStore } from '~/store/tasks';

export default {
  setup () {
    const messages = ref([])
  
    // const fetcher = async () =>
    //   await fetch('https://jsonplaceholder.typicode.com/posts').then((response) =>
    //     response.json(),
    //   )

    
    // onMounted(async () => {
    //   const { data, suspense } = useQuery({ queryKey: ['test'], queryFn: fetcher })
    //   await suspense()
    // })

    const tasksStore = useTasksStore()

    console.log(tasksStore.tasks)
    tasksStore.fetchTasks();


    return {
      messages
    }
  }
}
</script>

<style lang="scss" scoped>

</style>