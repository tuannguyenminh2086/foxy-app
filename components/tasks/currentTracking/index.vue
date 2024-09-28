<template>
  <div v-if="isTracking" class="p-5 py-8 border bg-primary text-white rounded-tl-sm">
    <div class="grid grid-cols-12 gap-5">
      <div class="col-span-1">
        <span class="text-sm leading-none">Current tracking</span>
      </div>
      <div class="col-span-3">
        <span class="text-5xl font-bold">
          <BlocksTrackingCounter :counter="counter" />
        </span>
      </div>
      <div class="col-span-7 pl-5 text-black">
        <div class="text-md font-semibold max-w-[420px] truncate" >{{ currentTask?.task.name }}</div>
        <p class="text-xs"  v-if="currentTask">
          <span v-if="currentTask.task.client">{{ currentTask.task.client?.name }}</span> 
          <span v-if="currentTask.task.project">{{ currentTask.task.project?.name }}</span>
        </p>
      </div>
      <div class="col-span-1 flex justify-end">
        <div class="flex items-center gap-2">
          <Button variant="destructive" size="icon" @click.prevent="stopHandle" class="w-14 h-14">
            <StopwatchIcon class="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { StopwatchIcon } from '@radix-icons/vue'
  import { useTrackingStore } from '~/store/tracking';

  const trackingStore = useTrackingStore()
  const  {stopTracking} = trackingStore;
  const { isTracking, currentTask } = storeToRefs(trackingStore);
  const counter = ref(0);

  console.log(currentTask.value);


  

  const stopHandle = () => {

    if (currentTask.value) {
      stopTracking(currentTask.value?.id)
    }
    
  }

  
</script>

<style scoped>

</style>