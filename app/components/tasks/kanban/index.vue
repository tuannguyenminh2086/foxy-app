<template>
  <div className="flex gap-4 overflow-hidden overflow-x-auto h-full">
    <TasksKanbanColumn title="To Do" :status="1" @moveCard="moveTaskHandle" />
    <TasksKanbanColumn title="In Progress" :status="2" @moveCard="moveTaskHandle"/>
    <TasksKanbanColumn title="QC" :status="3" @moveCard="moveTaskHandle"/>
    <TasksKanbanColumn title="Done Done" :status="4" @moveCard="moveTaskHandle"/>
  </div>
</template>

<script setup>
import { useTasksStore } from '~/store/tasks';


  const tasksStore = useTasksStore();
  const { updateTask } = tasksStore;
  
  const moveTaskHandle = async (tId, newStatus) => {
    const payload = Object.assign({},{state: newStatus});
    await updateTask(tId, payload);
  }

</script>

<style lang="scss" scoped>

</style>