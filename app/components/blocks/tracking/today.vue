<template>
  <Card class="">
    <CardHeader class="pb-2">
      <CardTitle class="text-sm font-medium text-muted-foreground">You tracked</CardTitle>
    </CardHeader>
    <CardContent>

      <div class="flex flex-col gap-4 items-baseline">
        <div>
          <span class="text-4xl font-bold text-green-500">
            {{ $duration(today) }}
          </span>
          <p class="text-xs text-muted-foreground">today</p>
        </div>
        <div>
        <span class="text-xl">{{ $duration(yesterday) }}</span>
        <p class="text-xs text-muted-foreground">yesterday</p>
        </div>
      </div>


     
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
  interface IResponse {
    status: string,
    data?: any
    error?: any
  }

  const today = ref(0);
  const yesterday = ref(0);
  const { $duration } = useNuxtApp()
  
  const { data } = await useFetch('/api/stats/today', {
    method: 'get'
  })

  if (data.value) {
    const response:IResponse = data.value as IResponse    
    today.value = response.data.today.total_tracking_time
    yesterday.value = response.data.yesterday.total_tracking_time
  }

</script>

<style lang="scss" scoped>

</style>