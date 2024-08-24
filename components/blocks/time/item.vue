<template>
  <ClientOnly fallback-tag="span" fallback="Loading comments...">
    <div>
      <h4 class="text-xs text-muted-foreground leading-tight mb-1">{{ label }}</h4>
      <div class="relative">
        <span class="text-2xl font-bold leading-none">
          {{  $dayjs().tz(tz).format('HH:mm').toString()  }}
        </span>
        <sup class="pl-1"> {{ $dayjs().tz(tz).format('a').toString()  }}</sup>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup>
  const props = defineProps(['label', 'tz', 'locale'])

</script>

<style lang="scss" scoped>

</style>