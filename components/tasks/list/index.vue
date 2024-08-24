<template>

  <Card>
    <CardHeader class="pb-5 flex-row items-center">
      <CardTitle class="text-base font-bold">{{ title }}</CardTitle>
      <div v-if="showViewAll" class="ml-auto text-xs">
        <NuxtLink to="/tasks" class="text-muted-foreground hover:underline hover:text-black flex space-x-1">
          <span>View All</span> <ArrowRight class="w-4 h-4"/>
        </NuxtLink>
      </div>
    </CardHeader>
    <CardContent class="space-y-2">
      <TasksListItem v-for="task in list"  :task="task"/>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
  import { ArrowRight } from "lucide-vue-next";
  import type { PropType } from "vue";
  import type { ITask } from "~/types/tasks";

  defineProps({
    title: String,
    list: Array as PropType<ITask[]>,
    showViewAll: Boolean
  })

</script>

<style scoped>

</style>