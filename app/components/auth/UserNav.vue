<template>

  <DropdownMenu v-if="user">
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="relative h-8 w-8 rounded-full">
        <Avatar class="h-8 w-8 xl:h-10 xl:w-10">
          <AvatarImage :src="user.avatar ?? ''" />
          <AvatarFallback>FX</AvatarFallback>
        </Avatar>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-56" align="end">
      <DropdownMenuLabel class="font-normal flex">
        <div class="flex flex-col space-y-1">
          <p class="text-sm font-medium leading-none">
            {{ user.first_name }} {{ user.last_name }}
          </p>
          <p class="text-xs leading-none text-muted-foreground">
            {{  user.email }}
          </p>
        </div>
      </DropdownMenuLabel>
      <!-- <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>
          Profile
        </DropdownMenuItem>
      </DropdownMenuGroup> -->
      <DropdownMenuSeparator />
      <DropdownMenuItem  @click.prevent="signOutHandle" class="cursor-pointer">
        Log out
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

<script setup lang="ts">

const { user, clear: clearSession } = useUserSession();
  const signOutHandle = async () => {
    await clearSession()
    await navigateTo('/login')
  }

</script>

<style scoped>

</style>