<template>
  <div class="flex -space-x-5">
    <Avatar v-for="item in memberPickedList" class="border-2">
      <AvatarImage :src="item.avatar" :alt="item.first_name + '' +  item.last_name" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  </div>
</template>

<script setup>
  import { useOverviewStore } from '~/store/overview';
  const overviewStore = useOverviewStore()
  const { memberPickedList } = storeToRefs(overviewStore)   
</script>

<style lang="scss" scoped>

</style>