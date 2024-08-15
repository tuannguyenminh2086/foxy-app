<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <div
    :class="
      cn(
        'rounded-lg bg-card border border-gray-50 text-card-foreground',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
