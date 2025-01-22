<template>
  <ModulesWidget
    title="Task Distribution"
    description="by State"
  >
    <div class="flex justify-center">
      <vue-apex-charts
        :options="options"
        :series="series" 
      
      />
    </div>
  </ModulesWidget>

</template>

<script setup lang="ts">
  import VueApexCharts from 'vue3-apexcharts';
  interface Item {
    name: string;
    state: number;
    count: number;
    percentage: string;
    avgTimeSpent: number;
  }

  interface Props {
    data: Item[];
  };

  const props = defineProps<Props>();

  const options = computed(() => ({
    chart: {
      type: 'donut',
      id: 'apexchart-task-distribution-by-state',
      height: 350
    },
    labels: props.data.map( (item) => item.name),
    legend: {
      position: 'bottom'
    },
    colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0'],
  
   
  }))

  const series = computed(() => {
    return props.data.map((item) => item.count)
  });

</script>

<style lang="scss" scoped>

</style>