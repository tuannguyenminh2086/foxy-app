<template>
  <div v-if="memberPickedList" class="flex -space-x-2">
    <Avatar v-for="(item, key) in memberPickedList" class="relative border-2 w-10 h-10" key="item.id">
      <AvatarImage :src="item.avatar" :alt="item.first_name + '' +  item.last_name" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  </div>
</template>

<script setup>
  import { useOverviewStore } from '~/store/overview';
  const overviewStore = useOverviewStore()
  const { memberPickedList, selected_members } = storeToRefs(overviewStore)   
</script>

<style lang="scss" scoped>

</style>