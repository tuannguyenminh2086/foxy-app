<template>
  <div class="grid grid-cols-12 gap-3 grid-flow-row-dense justify-items-stretch">
    <div class="col-span-12">
      <LazyWidgetsTasksAnalysis />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useOverviewStore } from '~/store/overview';
  const overviewStore = useOverviewStore()
  const { taskStateAnalysis } = storeToRefs(overviewStore)

</script>

<style scoped>

</style>