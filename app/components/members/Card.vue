<template>
  <Card>
    <CardHeader>
      <div class="flex items-center space-x-5">
        <Avatar class="relative w-14 h-14" key="item.id">
            <AvatarImage :src="member.avatar" :alt="member.name" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

        <CardTitle class="items-center text-lg">
          {{ member.name }}
        </CardTitle>
      </div>
    </CardHeader>
    <CardContent class="space-y-5 py-5">

      
      
      <div className="space-y-2 border-t py-4">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>Total:</div>
          <div class="font-bold text-base">{{ member.totalTimeSpent ? $secondsToHours(member.totalTimeSpent) : '0'}}</div>
          
          <div>Client's tasks:</div>
          <div class="font-bold">{{ member.clientTimeSpent ? $secondsToHours(member.clientTimeSpent) : '0'}}</div>
          
          <div>Internal's tasks:</div>
          <div class="font-bold">{{ member.internalTimeSpent ? $secondsToHours(member.internalTimeSpent) : '0'}}</div>
          
          <div>Non-Project's tasks:</div>
          <div class="font-bold">{{ member.nonProjectTimeSpent ? $secondsToHours(member.nonProjectTimeSpent ) : '0'}}</div>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-2 text-sm">
        <Card>
          <CardHeader>
            <CardTitle class="text-sm font-normal">Number of Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div class="text-2xl font-bold">{{member.taskCount ?? '0'}}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle class="text-sm font-normal">Number of Projects </CardTitle>
          </CardHeader>
          <CardContent>
            <div  class="text-2xl font-bold">{{  member.projectCount ?? '0' }}</div>
          </CardContent>
        </Card>
      </div>

    </CardContent>
  </Card>
</template>

<script setup>
  defineProps(['member'])
</script>

<style lang="scss" scoped>

</style>