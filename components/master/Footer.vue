<template>
  <div>

    <Teleport to="body">
      <div class="fixed bottom-4 right-5 w-1/2 z-50 box-border">
        <TasksCurrentTracking />
      </div>
    </Teleport>
  </div>
</template>

<script setup>
  import { useTasksStore } from '~/store/tasks';
  import { useTrackingStore } from '~/store/tracking';
  import { useMemberStore } from '~/store/member';
  const { $echo, $listen } = useNuxtApp();

  const { data, status } = useAuth();
  const trackingStore = useTrackingStore()
  const tasksStore = useTasksStore()
  const membersStore = useMemberStore()

  const _user = data.value.user

  if ( status.value === 'authenticated' && data.value) {

   
    await useAsyncData('members', () =>  membersStore.fetchMembers())

    // time tracking 
    $listen($echo, 'time-tracking', '.time-tracking.started', async (e) => {
      await useAsyncData('task', () => trackingStore.fetchCurrentTracking())
    });

    $listen($echo, 'time-tracking','.time-tracking.stopped', (e) => {
      console.log(e, 'time-tracking: stopped');
    });


    // my task
    $listen($echo, `mytasks.${_user.id}`, '.TaskCreated', (e) => {
      console.log(e, 'task: created');
    })

    $listen($echo, `mytasks.${_user.id}`, '.TaskUpdated', async (e) => {
      console.log(e, 'task: updated');
      await useAsyncData('task update', () => tasksStore.fetchTasks())
    });


    // user activity
    $listen($echo, `users.wakeup.${_user.id}`, '.users.wakeup', (e) => {
      console.log(e, 'user: wakeup');
    })

    $listen($echo, 'user.activity', '.user.activity', (e) => {
      console.log(e, 'user: activity');
    })
  }


  onUnmounted( () => {
    console.log('leave the channel')
  })
  
  
  // time tracking data
  // {id: 62778, spent: null, start_time: '2024-08-23 04:21:42', end_time: null, is_new_task_tracking: false }

</script>

<style lang="scss" scoped>

</style>
