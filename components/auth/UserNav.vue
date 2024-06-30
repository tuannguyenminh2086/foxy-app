<template>
  <div class="flex items-center space-x-2">
    <Avatar>
      <AvatarImage :src="data?.user?.image ?? ''" :alt="data?.user?.name" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
    <div class="text-sm leading-[1.5]"> 
      <span class="font-bold">{{ data?.user?.name }}</span>
      <a href="#" class="block" @click.prevent="signOutHandle">Sign Out</a>
    </div>
  </div>
</template>

<script setup lang="ts">

  const { data, signOut } = useAuth();
  const signOutHandle = async () => {
    await signOut()
  }

</script>

<style scoped>

</style>