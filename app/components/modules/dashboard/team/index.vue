<template>
  <div>

  </div>
</template>

<script setup lang="ts">
  import { useOverviewStore } from '~/store/overview';
  const overviewStore = useOverviewStore()
  const { getRawData } = storeToRefs(overviewStore)

</script>

<style scoped>

</style>