<template>
  <Card class="">
    <CardHeader class="pb-2">
      <CardTitle class="text-3xl font-bold">{{ $duration(state.total??0) }}</CardTitle>
      <div class="text-sm text-muted-foreground"> hours / This Week</div>
    </CardHeader>
    <CardContent>
      <ChartWeek />
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
  interface IResponse {
    status: string,
    data?: any
    error?: any
  }

  const { $duration } = useNuxtApp()
  const state = reactive ({
    details: [],
    total: 0
  })
  
  const { data } = await useFetch('/api/stats/week', {
    method: 'get'
  })

  if (data.value) {
    const response:IResponse = data.value as IResponse;
    state.details = response.data.week.details
    state.total = response.data.week.total_tracking_time

  }

</script>

<style lang="scss" scoped>

</style>