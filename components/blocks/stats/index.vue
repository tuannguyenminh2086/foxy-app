<template>
  <div class="grid grid-cols-4 gap-5">
        <div class="col-span-2 ">
          <Widget title="Soon Due" :value="3" desc="tasks" />
        </div>
        <div class="col-span-2">
          <Widget title="Overdue" :value="50" desc="tasks"/>
        </div>
        <div class="col-span-2 ">
          <Widget title="Todo" :value="100" desc="tasks"/>
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
const { tasksInProgress } = storeToRefs(tasksStore)

</script>

<style scoped>

</style>