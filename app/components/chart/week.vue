<template>
  <div>
    <BarChart :chartData="testData" :options="options" />
  </div>
</template>

<script setup>
import { BarChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const options = ref({
      responsive: true,
      plugins: {
        legend: false,
        title: false
      },
    });

const testData = {
      labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      datasets: [
        {
          data: [0, 30, 40, 50, 20, 15,0],
          backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
        },
      ],
    };

</script>

<style lang="scss" scoped>

</style>