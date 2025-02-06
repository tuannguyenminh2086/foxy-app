<template>
  <ModulesWidget
      title="Top 5 Client's projects distribution"
      >
      <div class="space-y-10">
          <ClientOnly>
            <vue-apex-charts
              :options="donutChartOptions"
              :series="donutChartSeries" 
            />
          </ClientOnly>
        <div class="grid grid-cols-2 gap-4">
          <Card  v-if="data.summary.totalProjects">
              <CardHeader>
                <CardTitle>Total Projects</CardTitle>
              </CardHeader>
              <CardContent class="pt-0">
                <p class="text-4xl font-bold text-primary">{{ data.summary.totalProjects }}</p>
                <p class="text-xs text-muted-foreground">In general</p>
              </CardContent>
            </Card> 
            <Card  v-if="data.summary.averageProjectDuration" >
              <CardHeader>
                <CardTitle>Project Duration</CardTitle>
              </CardHeader>
              <CardContent class="pt-0">
                <p class="text-2xl font-bold text-primary">{{ $secondsToHours(data.summary.averageProjectDuration) }}</p>
                <p class="text-xs text-muted-foreground">avg. hour(s)</p>
              </CardContent>
            </Card>
        </div>
    </div>
</ModulesWidget>

</template>

<script setup lang="ts">
import VueApexCharts from 'vue3-apexcharts'
import type { ProjectSummary } from '~/lib/zod/projects';
interface Props {
  data: any;
}

const props = defineProps<Props>()

const donutChartOptions = computed(() => ({
  chart: {
    type: 'donut'
  },
  labels: props.data.summary.largestProjects.map( (project:any) => project.project),
  tooltip: {
    y: {
      formatter: (val:number) => (val/3600).toFixed(2) + ' hours'
    }
  },
  legend: {
    position: 'bottom'
  },
  colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0']
}))

const donutChartSeries = computed(() => {
  return props.data.summary.largestProjects.map((project:ProjectSummary) => project.totalHours)
})
</script>

<style lang="scss" scoped>

</style>