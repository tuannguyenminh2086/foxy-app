<template>
  <div>
    <ContainerFullWithTitle
      title="Resources Planning"
      description="Plan our resource"
    >
      <template #default>
        <ScheduleResources />
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
