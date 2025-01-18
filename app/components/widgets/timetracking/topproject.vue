<template>
  <div>
    <vue-apex-charts
      :options="chartOptions"
      :series="series"
      
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import type { ProjectSummaryItem } from '~/lib/types';

interface Props {
  projectData: ProjectSummaryItem[];
}

const props = defineProps<Props>()

const series = computed(() => [{
  name: 'Hours',
  data: props.projectData.map(item => item.hours)
}])

const chartOptions = computed(() => ({
  chart: {
    type: 'bar',
    toolbar: {
      show: true,
      tools: {
        download: false,
        selection: false,
        zoom: false,
        zoomin: false,
        zoomout: false,
        pan: false,
        reset: false
      }
    }
  },
  plotOptions: {
    bar: {
      horizontal: false,
      dataLabels: {
        position: 'center'
      }
    }
  },
  dataLabels: {
    enabled: true,
    formatter: function(val:number) {
      return val + 'h'
    },
    style: {
      fontSize: '12px',
      colors: ['#fff']
    }
  },
  xaxis: {
    categories: props.projectData.map(item => item.name),
    labels: {
      style: {
        fontSize: '12px'
      },
      formatter: function(val:number) {
        return val.toFixed(2)
      }
    },
    title: {
      text: 'Hours'
    }
  },
  yaxis: {
    labels: {
      style: {
        fontSize: '11px'
      },
      maxWidth: 200
    }
  },
  grid: {
    xaxis: {
      lines: {
        show: false
      }
    }
  },
  colors: ['#2E93fA'],
  tooltip: {
    y: {
      formatter: function(val:number) {
        return val.toFixed(2) + ' hours'
      }
    }
  }
}))
</script>

<style scoped>

</style>