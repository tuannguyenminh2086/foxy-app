<template>
  <Card>
    <CardHeader class="pb-2">
      <CardTitle class="text-sm font-medium text-muted-foreground">{{  title  }}</CardTitle>
    </CardHeader>
    <CardContent>
      <div class="text-3xl font-bold">{{ value }}</div>
      <p v-if="desc" class="text-xs text-muted-foreground">
        {{ desc }}
      </p>
    </CardContent>
  </Card>
</template>

<script setup>
const props = defineProps(
  {
    title: String,
    value: Number,
    desc: String
  }
)
</script>

<style lang="scss" scoped>

</style>