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
        'rounded-sm bg-card border text-card-foreground relative',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
