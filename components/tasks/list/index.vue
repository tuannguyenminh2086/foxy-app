<template>

  <Card class="bg-slate-100">
    <CardHeader class="pb-5">
      <CardTitle class="text-base font-bold">Tasks - On Progress</CardTitle>
    </CardHeader>
    <CardContent class="space-y-2">
      <TasksListItem v-for="n in 8" />
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
  const { data } = await useFetch('/api/tasks')
</script>

<style scoped>

</style>