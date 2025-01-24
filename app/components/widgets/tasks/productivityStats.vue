<template>
  <ModulesWidget
    title="Productivity Statistics"
    description=""
  >

    <div class="grid grid-cols-6 mt-4 gap-4">      
      <Card  v-if="taskStateAnalysis.productivityStats.avgTimePerTask" >
        <CardHeader>
          <CardTitle>av. Hour(s)</CardTitle>
        </CardHeader>
        <CardContent class="">
          <p class="text-4xl font-bold text-primary">{{ $secondsToHours(taskStateAnalysis.productivityStats.avgTimePerTask) }}</p>
          <p class="text-xs text-muted-foreground">per Task</p>
        </CardContent>
      </Card>

      <Card  v-if="taskStateAnalysis.productivityStats.avgTimePerTask" >
        <CardHeader>
          <CardTitle>Completion Rate</CardTitle>
        </CardHeader>
        <CardContent class="">
          <p class="text-4xl font-bold text-primary">{{ taskStateAnalysis.productivityStats.completionRate }}%</p>
          <p class="text-xs text-muted-foreground">per Task</p>
        </CardContent>
      </Card>

      <Card  v-if="taskStateAnalysis.productivityStats.timeEfficiency" >
        <CardHeader>
          <CardTitle>Time Efficiency</CardTitle>
        </CardHeader>
        <CardContent class="">
          <p class="text-4xl font-bold text-primary">{{ taskStateAnalysis.productivityStats.timeEfficiency }}%</p>
          <p class="text-xs text-muted-foreground"></p>
        </CardContent>
      </Card>
      <Card  v-if="calculateTeamEfficiency.averageCycleTime">
        <CardHeader>
          <CardTitle>Cycle Time</CardTitle>
        </CardHeader>
        <CardContent class="">
          <p class="text-4xl font-bold text-primary">{{ calculateTeamEfficiency.averageCycleTime ?? 'N/A' }}%</p>
          <p class="text-xs text-muted-foreground">.Avg</p>

          <Popover>
            <PopoverTrigger class="absolute top-2 right-2">
              <QuestionMarkCircledIcon />
            </PopoverTrigger>
            <PopoverContent>
              <small>
               <b>Average Cycle Time:</b> The average time it takes for a task to go from start to completion. In our code, it's calculated as the mean total time spent on completed tasks (state 4 or 5). 
               <br/>
               <p>Tasks are taking too long (high cycle time)</p>
              </small>
            </PopoverContent>
          </Popover>
        </CardContent>
      </Card>
      <Card  v-if="calculateTeamEfficiency.estimateAccuracy" >
        <CardHeader>
          <CardTitle>Estimate Accuracy</CardTitle>
        </CardHeader>
        <CardContent class="">
          <p class="text-4xl font-bold text-primary">{{ (calculateTeamEfficiency.estimateAccuracy * 100).toFixed(1) }}%</p>
          <p class="text-xs text-muted-foreground"></p>
        </CardContent>
      </Card>
      <Card  v-if="calculateTeamEfficiency.throughput" >
        <CardHeader>
          <CardTitle>Throughput</CardTitle>
        </CardHeader>
        <CardContent class="">
          <p class="text-4xl font-bold text-primary">{{ (calculateTeamEfficiency.throughput * 100).toFixed(1) }}%</p>
          <p class="text-xs text-muted-foreground"></p>

          <Popover>
            <PopoverTrigger class="absolute top-2 right-2">
              <QuestionMarkCircledIcon />
            </PopoverTrigger>
            <PopoverContent>
              <small>
               <b>Throughput:</b> The number of tasks completed per unit of time (usually per day).
              </small>
            </PopoverContent>
          </Popover>
        </CardContent>
      </Card>
    </div>
  </ModulesWidget>
</template>

<script setup>
  import { QuestionMarkCircledIcon } from '@radix-icons/vue';
import { useOverviewStore } from '~/store/overview';
  const overviewStore = useOverviewStore()
  const {  taskStateAnalysis, calculateTeamEfficiency } = storeToRefs(overviewStore)
</script>

<style lang="scss" scoped>

</style>