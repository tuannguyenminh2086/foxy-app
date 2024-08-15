<template>
  <Card class="">
    <CardHeader class="pb-2">
      <CardTitle class="text-sm font-medium text-muted-foreground">Today tracked</CardTitle>
    </CardHeader>
    <CardContent>
      <div class="text-4xl font-bold">{{ display }}</div>
      <p class="text-xs text-muted-foreground">
        hours
      </p>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
  import dayjs from 'dayjs';
  import duration from 'dayjs/plugin/duration'
  dayjs.extend(duration);

  interface IResponse {
    status: string,
    data?: any
    error?: any
  }

  const display = ref('00:00:00');
  
  const { data, refresh } = await useFetch('/api/stats', {
    method: 'POST'
  })

  if (data.value) {
    const response:IResponse = data.value as IResponse
    const total_tracking_time = response.data.total_tracking_time
    display.value = dayjs.duration(total_tracking_time, 'seconds').format('HH:mm:ss').toString();
  }

  setTimeout(() => {
    refresh()
  }, 10000)
  

</script>

<style lang="scss" scoped>

</style>