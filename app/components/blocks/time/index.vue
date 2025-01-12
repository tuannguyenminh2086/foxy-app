<template>
  <Card class="">
    <CardHeader>
      <p class="text-sm leading-none">{{ $dayjs().utc().format('dddd').toString() }}</p>
      <h2 class="text-2xl font-semibold leading-tight">{{ $dayjs().utc().format('DD MMMM').toString() }} </h2>
    </CardHeader>
    <CardContent>
      <div class="grid grid-cols-6 gap-5">
        <div class="col-span-3">
         <BlocksTimeItem 
          label="Ho Chi Minh City" 
          tz="Asia/Ho_Chi_Minh"
          locale="en"
        />
          
        </div>
        <div class="col-span-3">
          <BlocksTimeItem 
            label="St. Gallen" 
            tz="Europe/Zurich" 
            locale="de"
          />
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup>
</script>

<style lang="scss" scoped>

</style>