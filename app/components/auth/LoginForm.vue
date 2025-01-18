<template>
  <div class="min-w-[300px]">
      <div class="mb-4 w-9 h-9 mx-auto">
        <MasterHeaderLogo />
      </div>
      <h1 class="mb-10 text-3xl font-semibold text-center">Sign in</h1>

      <!-- <form class="w-full block space-y-6" @submit="onSubmit"> -->
        <form :validation-schema="formSchema" @submit="onSubmit" class="space-y-5" :validate-on-blur="!isFieldDirty">

        <FormField v-slot="{ componentField }" name="email">
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input type="text" placeholder="foxy@xxx.com" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="password">
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input
                type="password"
                placeholder="********"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <div class="pt-5">
          <Button type="submit" class="w-full"> Submit </Button>
          <p class="text-destructive mt-6">{{ error }}</p>
        </div>

      </form>

      <!-- <p class="mt-10 text-sm">
        Don't have an account?
        <NuxtLink to="/" class="hover:underline"
          >Create an account</NuxtLink
        >
      </p> -->
  </div>
</template>

<script setup lang="ts">
  import { useForm } from 'vee-validate'
  import { toTypedSchema } from '@vee-validate/zod'
  import * as z from 'zod'

  const { loggedIn, user, fetch: refreshSession } = useUserSession()
  const error = ref<string | null>(null);
  
  const formSchema = toTypedSchema(
    z.object({
      email: z.string().email().min(2).max(50),
      password: z.string().min(6).max(50),
    })
  );

  const { isFieldDirty, handleSubmit } = useForm({
    validationSchema: formSchema,
   });

  const onSubmit = handleSubmit(async (values) => {
        error.value = "";

         $fetch('/api/login', {
          method: 'POST',
          body: values
        })
        .then(async () => {
          // Refresh the session on client-side and redirect to the home page
          await refreshSession()
          await navigateTo('/')
        })
        .catch(() => error.value = 'Bad credentials')
  
  });


</script>

<style lang="scss" scoped>

</style>