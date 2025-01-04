<template>
  <MasterHeader />
  <main id="main" class="relative box-border p-5 pt-10 antialiased">
    <slot />
  </main>
  <MasterFooter />
  <MasterSidebar />
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