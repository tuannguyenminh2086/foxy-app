<template>
  <!---section 2-->

  <div class="grid grid-cols-12 gap-5 grid-flow-row-dense justify-items-stretch">
    <div class="col-span-2 flex flex-col flex-1">
      <ModulesWidget
        title="Total hours"
        note="in general">
        <span class="text-5xl font-bold text-primary">
          {{ $secondsToHours(totalTimeSpent ?? 0) }}
        </span>
        <p class="text-xs text-muted-foreground">hour(s)</p>
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
        note="in general"
      >
        <span class="text-5xl font-bold text-primary">
          {{ $secondsToHours(totalTimeSpentOnClient ?? 0) }}
        </span>
        <p class="text-xs text-muted-foreground">hour(s)</p>
      </ModulesWidget>
    </div>
    <div class="col-span-2">
      <ModulesWidget
        title="Internal"
        note="in general"
      >
        <span class="text-5xl font-bold text-primary">
          {{ $secondsToHours(totalTimeSpentOnInternal ?? 0) }}
        </span>
        <p class="text-xs text-muted-foreground">hour(s)</p>
      </ModulesWidget>
    </div>
    <div class="col-span-2">
      <ModulesWidget
        title="Non-projects"
        note="in general"
      >
        <span class="text-5xl font-bold text-primary">
        {{ $secondsToHours(totalTimeSpentOnNonProjects ?? 0) }}
      </span>
      <p class="text-xs text-muted-foreground">hour(s)</p>
      </ModulesWidget>
    </div>
    
    
    <div class="col-span-4">
      <LazyWidgetsTasksDistributionByState :data="taskStateAnalysis.stateResults" />
    </div>
    <div class="col-span-4">
       <LazyWidgetsTasksDueDateStats :data="dueDateAnalysis" />
    </div>
    <div class="col-span-4">
      <LazyWidgetsTasksAvTimeSpent :data="taskStateAnalysis.stateResults" />
    </div>
    <div class="col-span-12">
      <LazyWidgetsTasksProductivityStats />
    </div>
    
    <div class="col-span-8 flex flex-col flex-1">
    
        <WidgetsProjectsSummaryTable :data="projectsAnalysis.projects"/>
  
    </div>
    <div class="col-span-4 flex flex-col flex-1">
     
        <LazyWidgetsTimetrackingTopprojectbyhours :data="projectsAnalysis" />
    
    </div>    

  </div>
</template>

<script setup lang="ts">
import { useOverviewStore } from '~/store/overview';

const overviewStore = useOverviewStore()
const { totalTimeSpent, totalTimeSpentOnClient, totalTimeSpentOnInternal,totalTimeSpentOnNonProjects, projectsAnalysis, taskStateAnalysis, dueDateAnalysis } = storeToRefs(overviewStore)

</script>

<style scoped>

</style>