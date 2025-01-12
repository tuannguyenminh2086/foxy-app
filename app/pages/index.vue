<template>
  <LayoutContainer title="Overview" description="Team Performance">
    <template #main>
      <ModulesOverview />
    </template>
  </LayoutContainer>
</template>

<script>
import { useMembersStore } from '~/store/members';
import { useOverviewStore } from '~/store/overview';

definePageMeta({ 
  middleware: 'auth'
})

useHead({
  title: 'Overview'
})

export default {
  setup () {
    const membersStore = useMembersStore();
    membersStore.fetchAll()
    
  }
}
</script>

<style lang="scss" scoped>

</style>