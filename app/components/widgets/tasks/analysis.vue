<template>
  <ModulesWidget
    title="Team Workload Analysis"
  >
    <div class="grid grid-cols-12 gap-4 mt-5">
      <div class="col-span-4 space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <Card  v-if="teamWorkloadAnalysis.summary.averageProjectsPerMember" >
            <CardHeader>
              <CardTitle>Members</CardTitle>
            </CardHeader>
            <CardContent class="pt-0">
              <p class="text-2xl font-bold text-primary">{{ teamWorkloadAnalysis.summary.averageProjectsPerMember.toFixed(1) }}</p>
              <p class="text-xs text-muted-foreground">avg. project(s)</p>
            </CardContent>
          </Card>
          <Card  v-if="teamWorkloadAnalysis.summary.totalMembers" >
            <CardHeader>
              <CardTitle>Total Members</CardTitle>
            </CardHeader>
            <CardContent class="pt-0">
              <p class="text-2xl font-bold text-primary">{{ teamWorkloadAnalysis.summary.totalMembers }}</p>
              <p class="text-xs text-muted-foreground"></p>
            </CardContent>
          </Card>
       
        
        <Card  v-if="teamWorkloadAnalysis.summary.mostDiverseMembers" >
          <CardHeader>
            <CardTitle>Most Diverse Members</CardTitle>
          </CardHeader>
          <CardContent class="pt-5">
            <ol class="space-y-2">
              <li v-for="member in teamWorkloadAnalysis.summary.mostDiverseMembers" class="border-b pb-4 last:border-0">
                <p class="text-lg font-bold text-primary leading-none mb-2">{{ member.member }}</p>
                <p class="text-xs">{{ member.totalHours }} hour(s)</p>
                <p class="text-xs text-muted-foreground">{{ member.activeProjects }} project(s) </p>
              </li>
            </ol>
            
          </CardContent>
        </Card>
        <Card  v-if="teamWorkloadAnalysis.summary.mostFocusedMembers" >
          <CardHeader>
            <CardTitle>Most Focus <br/>Members</CardTitle>
          </CardHeader>
          <CardContent class="pt-5">
            <ol class="space-y-2">
              <li v-for="member in teamWorkloadAnalysis.summary.mostFocusedMembers" class="border-b pb-4 last:border-0">
                <p class="text-lg font-bold text-primary leading-none mb-2">{{ member.member }}</p>
                <p class="text-xs">{{ member.totalHours }} hour(s)</p>
                <p class="text-xs text-muted-foreground">{{ member.activeProjects }} project(s)</p>
              </li>
            </ol>
          </CardContent>
        </Card>
      </div>
      </div>
      <div class="col-span-8">
        <WidgetsTasksAnalysisTable :data="teamWorkloadAnalysis.members" />
      </div>
    </div>
  </ModulesWidget>
</template>

<script setup lang="ts">
import { useOverviewStore } from '~/store/overview';

  const overviewStore = useOverviewStore()
  const { teamWorkloadAnalysis } = storeToRefs(overviewStore)

</script>

<style scoped>

</style>