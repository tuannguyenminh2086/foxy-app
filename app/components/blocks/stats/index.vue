<template>
  <div class="grid grid-cols-4 gap-4">
        <div class="col-span-2 ">
          <Widget title="Soon Due" :value="tasksDueDate.length" desc="tasks" />
        </div>
        <div class="col-span-2">
          <Widget title="Overdue" :value="0" desc="tasks"/>
        </div>
        <div class="col-span-2 ">
          <Widget title="Todo" :value="tasksTodo.length"  desc="tasks"/>
        </div>
        <div class="col-span-2 ">
          <Widget title="In Progress" :value="tasksInProgress.length" desc="tasks"/>
        </div>
       
      </div>
</template>

<script setup lang="ts">
import { useTasksStore } from '~/store/tasks';
import Widget from '../widget.vue';
const tasksStore = useTasksStore()
const { tasksInProgress, tasksTodo, tasksDueDate } = storeToRefs(tasksStore)

</script>

<style scoped>

</style>