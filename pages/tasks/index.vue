<template>
  <div>
    <ContainerFullWithTitle 
      title="My Tasks" 
      description="Here's a list of your tasks"
    >
      <template #default>
        <Tabs default-value="kanban">
          <TabsList class="grid w-[320px] grid-cols-2 gap-4">
            <TabsTrigger value="kanban">
              Kanban
            </TabsTrigger>
            <TabsTrigger value="list">
              List
            </TabsTrigger>
          </TabsList>
          <TabsContent value="kanban" class="pt-5 flex flex-col h-full box-border">
            <TasksKanban :tasks="tasks" />
          </TabsContent>
          <TabsContent value="list" class="pt-5">
           adsa
          </TabsContent>
        </Tabs>
      </template>
    </ContainerFullWithTitle>

  </div>
</template>

<script setup>

import { useTasksStore } from '~/store/tasks';

const tasksStore = useTasksStore()
const { tasks } = storeToRefs(tasksStore)
tasksStore.fetchTasks();
  

</script>

<style lang="scss" scoped>

</style>