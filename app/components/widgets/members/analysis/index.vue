<template>
  <div class="grid grid-cols-3 gap-4">
    <Card v-for="member in memberData" :member="member" />
  </div>
</template>

<script setup>
import Card from '~/components/members/Card.vue';
import { useMembersStore } from '~/store/members';
import { useOverviewStore } from '~/store/overview';

const overviewStore = useOverviewStore()
const { teamAnalysis, selected_members } = storeToRefs(overviewStore)

const membersStore  = useMembersStore()
const { members } = storeToRefs(membersStore)

const memberData = ref()

const teamHandle = () => {
  const filteredMembers = members.value.filter((member) => selected_members.value.includes(member.id)  )
  memberData.value = filteredMembers.map( itemA => {
    const matchingB = teamAnalysis.value.find(itemB => itemB.name === itemA.name);
    return {
      ...itemA,
      ...(matchingB ? { 
          ...matchingB } : { 
            taskCount: null,
            projectCount: null,
            totalTimeSpent: null,
            clientTimeSpent: null,
            nonProjectTimeSpent: null,
            internalTimeSpent: null
           })
    }
  })

}

teamHandle()

watch(teamAnalysis, (newValue) => {
  teamHandle()
});


</script>

<style lang="scss" scoped>

</style>