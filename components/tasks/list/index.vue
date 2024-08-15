<template>

  <Card class="bg-slate-100">
    <CardHeader class="pb-5">
      <CardTitle class="text-base font-bold">{{ title }}</CardTitle>
    </CardHeader>
    <CardContent class="space-y-2">
      <TasksListItem v-for="task in list"  :task="task"/>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
  import type { PropType } from "vue";
  import type { ITask } from "~/types/tasks";

  defineProps({
    title: String,
    list: Array as PropType<ITask[]>
  })

</script>

<style scoped>

</style>