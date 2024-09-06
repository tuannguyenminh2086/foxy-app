
<template>
  <div>
    <ContainerFullWithTitle 
        title="Schedule Planning" 
        description="Plan our resource"
    >
        <template #default>
          <Tabs default-value="resources">
          <TabsList class="grid w-[320px] grid-cols-2 gap-4">
            <TabsTrigger value="resources">
               Resources
            </TabsTrigger>
            <TabsTrigger value="projects">
              Projects
            </TabsTrigger>
          </TabsList>
          <TabsContent value="resources" class="pt-5 flex flex-col h-full box-border">
            <ScheduleResources />
          </TabsContent>
          <TabsContent value="projects" class="pt-5">
           adsa
          </TabsContent>
        </Tabs>
         
        </template>
    </ContainerFullWithTitle>
  </div>
</template>

<script setup lang="ts">
// TODO
// A tab to switch between projects and resources

</script>

<style scoped>

</style>