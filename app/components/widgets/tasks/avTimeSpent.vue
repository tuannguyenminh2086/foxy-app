<template>
  <ModulesWidget
    title="Average Time Spent"
    description="by Task(s)"
  >
    <ClientOnly>
      <vue-apex-charts
        :options="options"
        :series="series"
      />
    </ClientOnly>
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
      id: 'apexchart-av-time-spent',
      type: 'bar',
      width: '100%',
      toolbar: {
        show: false
      }
    },
    xaxis: {
      categories: props.data.map( (item) => item.name)
    },
    plotOptions: {
      bar: {
        horizontal: false,
      },
    },
    grid: {
      show: false
    },
   
   
  }))

  const series = computed(() => {
    return [{
      name: 'Average Time Spent',
      data: props.data.map((item) => (Number(item.avgTimeSpent)/3600).toFixed(1))
    }]
  });


</script>

<style scoped>

</style>