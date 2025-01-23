<template>
  <ModulesWidget
    title="Productivity Statistics"
    description=""
  >

    <div class="grid grid-cols-3 mt-4 gap-4">      
      <Card  v-if="taskStateAnalysis.productivityStats.avgTimePerTask" >
        <CardHeader>
          <CardTitle>av. Hour(s)</CardTitle>
        </CardHeader>
        <CardContent class="">
          <p class="text-2xl font-bold text-primary">{{ $secondsToHours(taskStateAnalysis.productivityStats.avgTimePerTask) }}</p>
          <p class="text-xs text-muted-foreground">per Task</p>
        </CardContent>
      </Card>

      <Card  v-if="taskStateAnalysis.productivityStats.avgTimePerTask" >
        <CardHeader>
          <CardTitle>Task Completion Rate</CardTitle>
        </CardHeader>
        <CardContent class="">
          <p class="text-2xl font-bold text-primary">{{ taskStateAnalysis.productivityStats.completionRate }}%</p>
          <p class="text-xs text-muted-foreground"></p>
        </CardContent>
      </Card>

      <Card  v-if="taskStateAnalysis.productivityStats.timeEfficiency" >
        <CardHeader>
          <CardTitle>Time Efficiency</CardTitle>
        </CardHeader>
        <CardContent class="">
          <p class="text-2xl font-bold text-primary">{{ taskStateAnalysis.productivityStats.timeEfficiency }}%</p>
          <p class="text-xs text-muted-foreground"></p>
        </CardContent>
      </Card>
    </div>
  </ModulesWidget>
</template>

<script setup>
  import { useOverviewStore } from '~/store/overview';
  const overviewStore = useOverviewStore()
  const {  taskStateAnalysis } = storeToRefs(overviewStore)
</script>

<style lang="scss" scoped>

</style>