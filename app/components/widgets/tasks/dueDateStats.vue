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
    
    </div>
  </ModulesWidget>
</template>

<script setup lang="ts">
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
  }))

  const series = computed(() => {
    return [{
      data: [{
          x: 'Overdue',
          y: props.data.overdue.length,
          // fillColor: '#EB8C87',
          // strokeColor: '#C23829'
        }, 
        {
          x: 'Due Soon',
          y: props.data.dueSoon.length
        }, 
        {
          x: 'Incoming',
          y: props.data.incoming.length
        }
      ]
    }]
  });

</script>

<style lang="scss" scoped>

</style>