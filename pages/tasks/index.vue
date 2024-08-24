<template>
  <div>
    <Card>
      <CardHeader>
        <CardTitle>
          <h2 class="text-xl">My Tasks</h2>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div>



        </div>
      </CardContent>
    </Card>
    


  </div>
</template>

<script setup>

import { useTasksStore } from '~/store/tasks';

const tasksStore = useTasksStore()
const { tasks } = storeToRefs(tasksStore)
tasksStore.fetchTasks();
  

</script>

<style lang="scss" scoped>

</style>