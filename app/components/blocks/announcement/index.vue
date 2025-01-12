<template>
  <div class="flex items-center"> 
    <Vue3Marquee :pause-on-hover="true" :clone="true">
      <div v-for="(item, key) in events" class="px-5" :key="key">
          <h3 class="font-bold">{{  item.name }}</h3>
      </div>
    </Vue3Marquee>
  </div>
</template>

<script setup>
  const { data } = await useFetch('/api/announcement', {
    method: 'GET'
  })

  const events = ref([]);
  if(data.value) {
    events.value = data.value.data
  }

  
</script>

<style lang="scss" scoped>

</style>