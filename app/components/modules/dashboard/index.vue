<template>
  <div class="space-y-10">
    <div
      class="grid grid-cols-12 gap-3"
    >
      <div class="col-span-5">
        <WidgetsMembersPicked />
      </div>
      <div class="col-span-7 flex justify-end space-x-2">
        <DateRangePicker @select-date="selectDateHandle" />
        <MembersPicker @select-members="selectMembersHandle" />
        <Button @click.prevent="queryData">Query Data</Button>
      </div>
    </div>

    <Tabs default-value="overview" class="space-y-5">
      <TabsList>
        <TabsTrigger value="overview">
          Overview
        </TabsTrigger>
        <TabsTrigger value="team">
          Team
        </TabsTrigger>
        <!-- <TabsTrigger value="task">
          Tasks
        </TabsTrigger>
        <TabsTrigger value="project">
          Projects
        </TabsTrigger> -->
      
      </TabsList>

      <TabsContent value="overview">
        <ModulesDashboardOverview />
      </TabsContent>
      <TabsContent value="team">
        <ModulesDashboardTeam />
      </TabsContent>
      <TabsContent value="task">
        Change your password here.
      </TabsContent>
      <TabsContent value="project">
        Change your password here.
      </TabsContent>
  </Tabs>

   
    
    <!---section 3-->
    
  </div>
</template>

<script setup lang="ts">
  import { useMembersStore } from '~/store/members';
  import { useOverviewStore } from '~/store/overview';
  const overviewStore = useOverviewStore()
  const membersStore = useMembersStore();

  const selectMembersHandle = (ids:Array<number>) => {
    const _members: Array<number> = ids.includes(-1) ? membersStore.members.map(member => (member.id)) : [...ids]
    overviewStore.pickMember(_members)
  }

  const selectDateHandle = ({ start, end}: { start: string, end: string}) => {
    overviewStore.pickDate(start,end)
  }


  const queryData  = () => {
    overviewStore.fetch({})
  }

  overviewStore.fetch({})

</script>

<style lang="scss" scoped>

</style>