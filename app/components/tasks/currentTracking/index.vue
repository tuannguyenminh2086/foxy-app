<template>
  <div v-if="isTracking" class="p-5 border shadow bg-background">
    <div class="grid grid-cols-12 gap-5">
      <div class="col-span-2">
        <span class="text-sm leading-none">Current tracking</span>
      </div>
      <div class="col-span-3">
        <span class="text-4xl font-bold">
          <BlocksTrackingCounter :counter="counter" />
        </span>
      </div>
      <div class="col-span-5">
        <div class="text-md font-semibold" >{{ currentTask?.task.name }}</div>
        <p class="text-muted-foreground text-xs"  v-if="currentTask">
          <span>{{ currentTask.task.client?.name }}</span> / 
          <span>{{ currentTask.task.project?.name }}</span>
        </p>
      </div>
      <div class="col-span-2 flex justify-end">
        <div class="flex items-center gap-2">
          <Button variant="destructive" size="icon">
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
  const { isTracking } = storeToRefs(trackingStore);
  const counter = ref(0);


  const currentTask = reactive({
    id: 62778, 
    spent: null, 
    start_time: '2024-08-23 04:21:42', 
    end_time: null, 
    is_new_task_tracking: false,
    task: {
      name: 'You can\'t compress the program without quantifying the open-source SS',
      client: {
        name: 'xxxx'
      },
      project: {
        name: 'Project Name'
      }
    }
  })


  // const counter = computed(() => {

  //   let time = 0;   
  //     setInterval(() => { return time = time + 1000}, 1000)
  //   return time;

  //   })


  
</script>

<style scoped>

</style>