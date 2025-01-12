<template>
  <div class="w-full flex gap-2">
      <div 
        class="bg-[#4B4ACF] transition-all duration-300 ease-in-out"
        :style="{ width: `${category1}%` }"
      ></div>
      <div 
        class="bg-[#FF7B7B] transition-all duration-300 ease-in-out"
        :style="{ width: `${category2}%` }"
      ></div>
      <div 
        class="bg-[#FFD233] transition-all duration-300 ease-in-out"
        :style="{ width: `${category3}%` }"
      ></div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'

// Props for the three category percentages
const props = defineProps({
  category1: {
    type: Number,
    default: 45
  },
  category2: {
    type: Number,
    default: 25
  },
  category3: {
    type: Number,
    default: 30
  }
})

// Validate that percentages sum to 100
watchEffect(() => {
  const total = props.category1 + props.category2 + props.category3
  if (total !== 100) {
    console.warn('Warning: Category percentages should sum to 100')
  }
})
</script>