<template>
  <div class="fixed top-0 right-0 h-screen w-1/2 z-40 bg-background p-5 pt-20 shadow overflow-hidden box-border ">
    <Button variant="ghost" size="icon" class="absolute top-5 right-5 z-20"
      @click.prevent="closeHandle"
    >
      <Cross1Icon class="w-4 h-4" ></Cross1Icon>
    </Button>

    <div class="h-full overflow-hidden overflow-y-auto w-full pr-4">
      <div v-if="task" class="flex flex-col box-border w-full space-y-8">
        <div class="space-y-2">
          <span class="text-xs text-muted-foreground">#{{ props.tid }}</span>
          <h2 class="text-2xl font-bold tracking-tight mb-1">
            {{ task.name }}
          </h2>
          <div class="space-y-1">
            <p class="text-xs text-muted-foreground">
              Project: {{ task.project.name }} 
              <span v-if="task.sub_project">/ {{ task.sub_project.name }}</span>
            </p>
            <p v-if="task.client" class="text-xs text-muted-foreground">Client: {{ task.client.name }}</p>
          </div>
        </div>

        <div class="grid grid-cols-12 gap-4">
            <div class="col-span-2 lg:col-span-4">
              <div class="flex flex-col">
                <label class="text-xs text-muted-foreground">Due date</label>
                <span v-if="task.due_date" class="text-sm font-bold">{{ $formatDate(task.due_date ?? '')}}</span>
              </div> 
            </div>
            <div class="col-span-2 lg:col-span-4">
              <div class="flex flex-col">
                <label class="text-xs text-muted-foreground">Estimate</label>
                <span v-if="task.est_time" class="text-sm font-bold">{{ $duration(task.est_time ?? 0) }}</span>
              </div>
            </div>
            <div class="col-span-2 lg:col-span-4">
              <div class="flex flex-col">
                <label class="text-xs text-muted-foreground">Tracking</label>
                <span v-if="task.spent" class="text-sm font-bold">{{ $duration(task.spent ?? 0) }}</span>
              </div>
            </div>
          </div>

        <div class="space-y-1">
          <p class="text-xs text-muted-foreground">Description</p>
          <div class="text-sm tracking-tight">
            <Markdown v-if="task.description" :source="task.description"  class="prose prose-sm dark:text-white"/>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { Cross1Icon } from '@radix-icons/vue';
import { ref } from 'vue'
import Markdown from 'vue3-markdown-it';
const { $duration, $formatDate } = useNuxtApp();

const props = defineProps({
    tid: Number,
    active: Boolean
})

const emit = defineEmits(['close'])

const closeHandle = () => {
  emit('close')
}

const task = ref(null)

const { data } = await useFetch('/api/tasks', {
  method: 'POST',
  body: {
    tid: props.tid.toString()
  }
})

if (data.value) {
  task.value = Object.assign({}, {...data.value.data})
}


</script>

<style lang="scss" scoped>

</style>