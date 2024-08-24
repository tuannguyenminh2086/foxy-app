<template>
  <Badge :class="stateClass"> {{ stateName  }}</Badge>
</template>

<script setup>
const props = defineProps({
  state: String | undefined
})

const stateRefs = [
  {
    id: 1, label: 'To Do', color: '', class: 'bg-cyan-500'
  },
  {
    id: 2, label: 'In Progress', color: '', class: 'bg-blue-500'
  },
  {
    id: 3, label: 'Quality Check', color: '', class: 'bg-yellow-500'
  },
  {
    id: 4, label: 'Done Done', color: '', class: 'bg-green-500'
  }
]

const stateName = computed(() => {
  const _state = stateRefs.find(item => item.id === props.state)
  return _state.label
})

const stateClass = computed(() => {
  const _state = stateRefs.find(item => item.id === props.state)
  return _state.class
})


</script>

<style lang="scss" scoped>

</style>