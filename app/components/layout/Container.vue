<template>
  <section class="space-y-10">
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-8 space-y-1">
        <h2 v-if="title" class="text-3xl font-bold lg:text-4xl">{{ title }}</h2>
        <div v-if="description" class="text-muted-foreground text-sm">{{ description }}</div>
      </div>
    </div>
    <div class="relative">
      <slot name="main">main</slot>
    </div>
  </section>
</template>

<script setup>
  const props = defineProps({
    title: String,
    description: String
  })
</script>

<style lang="scss" scoped>

</style>