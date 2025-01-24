<template>
 <ModulesWidget
    title="Tasks in Due Date"
    description="client's projects"
  >
    <div class="">
      <vue-apex-charts
        :options="options"
        :series="series" 
      
      />
      
      <Button variant="ghost" size="icon" class="absolute top-2 right-2">
        <EyeOpenIcon class="w-4 h-4" />
      </Button>
    </div>
  </ModulesWidget>
</template>

<script setup lang="ts">
   import { EyeOpenIcon } from '@radix-icons/vue';
import VueApexCharts from 'vue3-apexcharts';
  interface Props {
    data: any
  };

  const props = defineProps<Props>();

  const options = computed(() => ({
    chart: {
      type: 'bar',
      id: 'apexchart-task-duedate',
      height: 350,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        borderRadiusApplication: 'end',
        horizontal: true,
        width: '100%',
      },
      
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: ['Overdue', 'Due Soon', 'Incoming']
    },
    legend: {
      position: 'bottom'
    },
    grid: {
      show: false
    },
  }))

  const series = computed(() => {
    return [{
      data: [{
          x: 'Overdue',
          y: props.data.overdue.length,
          fillColor: '#FF4560',
          strokeColor: '#FF4560'
        }, 
        {
          x: 'Due Soon',
          y: props.data.dueSoon.length
        }, 
        {
          x: 'Incoming',
          y: props.data.incoming.length,
          fillColor: '#00E396',
          strokeColor: '#00E396'
        }
      ]
    }]
  });

</script>

<style lang="scss" scoped>

</style>