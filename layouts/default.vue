<template>
  <MasterHeader />
  <main id="main" class="relative box-border py-5 antialiased">
    <slot />
  </main>
</template>

<style>
body {
  background-color: #f6fafd;
}
#main {
  font-family: 'Inter', sans-serif;
  font-optical-sizing: auto;
}
</style>