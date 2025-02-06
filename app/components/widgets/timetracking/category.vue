<template>
  <div>
    <ClientOnly>
      <vue-apex-charts
        type="bar"
        height="180"
        :options="chartOptions"
        :series="series"
      />
    </ClientOnly>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

const props = defineProps({
  value1: {
    type: Number,
    required: true,
    default: 0
  },
  value2: {
    type: Number,
    required: true,
    default: 0
  },
  value3: {
    type: Number,
    required: true,
    default: 0
  },
  title1: {
    type: String,
    required: true,
    default: 'Value 1'
  },
  title2: {
    type: String,
    required: true,
    default: 'Value 2'
  },
  title3: {
    type: String,
    required: true,
    default: 'Value 3'
  },
  chartTitle: {
    type: String,
    default: 'Stacked Bar Chart'
  }
})

const series = computed(() => [
  {
    name: props.title1,
    data: [props.value1]
  },
  {
    name: props.title2,
    data: [props.value2]
  },
  {
    name: props.title3,
    data: [props.value3]
  }
])

const chartOptions = computed(() => ({
  chart: {
    type: 'bar',
    stacked: true,
    stackType: '100%',
    toolbar: {
      show: false
    },
    width: 10
  },
 
  plotOptions: {
    bar: {
      horizontal: true,
      columnWidth: '100%',
      dataLabels: {
        total: {
          style: {
            fontSize: '18px',
            fontWeight: 900
          }
        }
      },
      
    }
  },
  grid: {
    show: false,
    yaxis: {
      lines: {
          show: false
      }
    },
  },
  stroke: {
    width: 0,
  },
  fill: {
    opacity: 1
  },
  yaxis: {
    show: false
  },
  xaxis: {
    categories: ['Time Breakdown'],
  },
  legend: {
    position: 'bottom',
    horizontalAlign: 'center'
  },
  colors: ['#008FFB', '#00E396', '#FEB019'],
  dataLabels: {
    enabled: true,
    formatter: function (val) {
      return val.toFixed(1) + '%'
    }
  }
}))
</script>