<template>
  <div class="flex flex-col min-h-[100svh] h-full w-full bg-gray-50 dark:bg-black">
    <MasterHeader />
    <main id="main" class="relative p-5 pt-10 antialiased ">
      <div class="max-w-[1440px] mx-auto flex-1">
        <slot />
      </div>
    </main>
    <MasterFooter />
    <MasterSidebar />
  </div>
</template>
<script setup>

</script>

<style>
/* body {
  background-color: #f3f3f3;
} */
#main {
  font-family: 'Inter', sans-serif;
  font-optical-sizing: auto;
}
</style>