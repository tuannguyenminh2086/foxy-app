<template>
  <!---section 2-->
  <div class="grid grid-cols-12 gap-3 grid-flow-row-dense justify-items-stretch">
    <div class="col-span-2 flex flex-col flex-1">
      <ModulesWidget
        title="Total spent on"
        description="tasks"
        note="hours">
        <span class="text-5xl font-extrabold">
          {{ $secondsToHours(totalTimeSpent ?? 0) }}
        </span>
      </ModulesWidget>

    </div>
    <div class="col-span-4 flex flex-col flex-1">
      <ModulesWidget
      title="Time Breakdown">
          <WidgetsTimetrackingCategory 
              :value1="totalTimeSpentOnClient ?? 0" 
              title1="Clients"
              :value2="totalTimeSpentOnInternal ?? 0" 
              title2="Internal"
              :value3="totalTimeSpentOnNonProjects ?? 0"
              title3="Non-projects"
              title="Time Breakdown"
            
            />
      </ModulesWidget>
    </div>
    <div class="col-span-2">
      <ModulesWidget
        title="Clients"
        description="tasks"
        note="hour(s)">
        <span class="text-4xl font-extrabold">
        {{ $secondsToHours(totalTimeSpentOnClient ?? 0) }}
      </span>
      </ModulesWidget>
    </div>
    <div class="col-span-2">
      <ModulesWidget
        title="Internal"
        description="tasks"
        note="hour(s)">
        <span class="text-4xl font-extrabold">
        {{ $secondsToHours(totalTimeSpentOnInternal ?? 0) }}
      </span>
      </ModulesWidget>
    </div>
    <div class="col-span-2">
      <ModulesWidget
        title="Non-projects"
        description="tasks"
        note="hour(s)">
        <span class="text-4xl font-extrabold">
        {{ $secondsToHours(totalTimeSpentOnNonProjects ?? 0) }}
      </span>
      </ModulesWidget>
    </div>
    <div class="col-span-6 flex flex-col flex-1">
      <ModulesWidget
      title="Project Hours Distribution"
      >
        <LazyWidgetsTimetrackingTopproject :project-data="topTenProjectByTimeSpent" />
      </ModulesWidget>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useOverviewStore } from '~/store/overview';

const overviewStore = useOverviewStore()
const { totalTimeSpent, totalTimeSpentOnClient, totalTimeSpentOnInternal,totalTimeSpentOnNonProjects, topTenProjectByTimeSpent } = storeToRefs(overviewStore)

</script>

<style scoped>

</style>