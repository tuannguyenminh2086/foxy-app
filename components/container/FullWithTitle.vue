<template>
  <div class="space-y-10">
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-8 space-y-2">
        <h2 v-if="title" class="text-3xl font-bold">{{ title }}</h2>
        <div v-if="description" class="text-muted-foreground text-sm">{{ description }}</div>
      </div>
      <div class="col-span-4">
        
      </div>
    </div>
    <div>
      <slot name="top"></slot>
    </div>
    <div class="box-border relative">
      <slot></slot>
    </div>
    <div>
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup>
  const props = defineProps({
    title: String,
    description: String
  })
</script>

<style lang="scss" scoped>

</style>