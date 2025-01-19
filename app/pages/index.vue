<template>
  <LayoutContainer title="Dashboard" description="monitor performance">
    <template #main>
      <ModulesDashboard />
    </template>
  </LayoutContainer>
</template>

<script>
import { useMembersStore } from '~/store/members';
import { useOverviewStore } from '~/store/overview';

definePageMeta({
  middleware: ['authenticated'],
})

useHead({
  title: 'Overview'
})

export default {
  setup () {
    const membersStore = useMembersStore();
    const overviewStore = useOverviewStore()
    membersStore.fetchAll();
    overviewStore.initialize();
    
  }
}
</script>

<style lang="scss" scoped>

</style>