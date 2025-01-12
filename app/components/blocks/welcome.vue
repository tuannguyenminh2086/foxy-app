<template>
  <div class="mb-10">
    <p class="text-sm">Hi, {{ data?.user?.name }}</p>
    <h2 class="font-bold text-4xl">{{ renderWelcomeMsg() }}</h2>
  </div>
</template>

<script setup>
  const props = defineProps(['name'])
  const { data } = useAuthState()

  const renderWelcomeMsg = (currentTime = new Date()) => {
  const currentHour = currentTime.getHours()
  const splitAfternoon = 12; // 24hr time to split the afternoon
  const splitEvening = 17; // 24hr time to split the evening

  if (currentHour >= splitAfternoon && currentHour <= splitEvening) {
    // Between 12 PM and 5PM
    return 'Good Afternoon';
  } else if (currentHour >= splitEvening) {
    // Between 5PM and Midnight
    return 'Good Evening';
  }
  // Between dawn and noon
  return 'Good Morning';
}

</script>

<style lang="scss" scoped>

</style>