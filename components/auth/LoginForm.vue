<template>
  <div class="flex flex-col justify-center items-center ">
      <div>
        <NuxtImg src="/assets/img/foxy-app.svg" width="40" height="40" />
      </div>
      <h1 class="mb-10 text-3xl font-semibold">Sign in</h1>

      <form class="w-full max-w-[400px] space-y-6" @submit="onSubmit">

        <FormField v-slot="{ componentField }" name="username">
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
        
        <Button type="submit" class="w-full"> Submit </Button>
        <p class="text-destructive mt-6">{{ error }}</p>

      </form>

      <p class="mt-10 text-sm">
        Don't have an account?
        <NuxtLink to="/" class="hover:underline"
          >Create an account</NuxtLink
        >
      </p>

  </div>
</template>

<script setup lang="ts">
  import { useForm } from 'vee-validate'
  import { toTypedSchema } from '@vee-validate/zod'
  import * as z from 'zod'

  const { signIn } = useAuth()

  const error = ref<string | null>(null);

  const formSchema = toTypedSchema(
    z.object({
      username: z.string().min(2).max(50),
      password: z.string().min(6).max(50),
    })
  );

  const { handleSubmit } = useForm({
    validationSchema: formSchema,
   });

  const onSubmit = handleSubmit(async (values) => {
      error.value = "";
      console.log(values);

      const resp = await signIn('credentials', values)

      if (resp) {
        console.log(resp)
      }
    
  });


</script>

<style lang="scss" scoped>

</style>