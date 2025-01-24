<template>
  <Card class="h-full relative">
    <CardHeader v-if="title">
      <CardTitle>{{title  }}</CardTitle>
      <CardDescription v-if="description">{{  description }}</CardDescription>
    </CardHeader>
    <CardContent>
      <slot></slot>
    </CardContent>
    <CardFooter v-if="note">
      <span><small>{{ note }}</small></span>
    </CardFooter>
  </Card>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
  description?: string
  note?: string
}>()

</script>

<style lang="scss" scoped>

</style>