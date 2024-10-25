<template>
  <div>
    <ContainerFullWithTitle
      title="Resources Planning"
      description="Plan our resource"
    >
      <template #default>
        <Tabs default-value="resources" class="">
          <TabsList>
            <TabsTrigger value="resources">
              Resources
            </TabsTrigger>
            <TabsTrigger value="projects">
              Projects
            </TabsTrigger>
          </TabsList>
          <TabsContent value="resources">
            <ScheduleResources />
          </TabsContent>
          <TabsContent value="projects">
            Comming soon
          </TabsContent>
        </Tabs>
       
      </template>
    </ContainerFullWithTitle>
  </div>
</template>

<script setup lang="ts">
import { useSchedulerStore } from "~/store/schedulers";
// TODO
// A tab to switch between projects and resources
//
const schedulerStore = useSchedulerStore();
schedulerStore.getResourcesGroup();
schedulerStore.fetchResourcesItems();

</script>

<style scoped></style>
