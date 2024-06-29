<template>
  <div>header</div>
  <main id="main" class="relative box-border">
    <slot />
  </main>
</template>

<style>
#main {
  font-family: 'Inter', sans-serif;
  font-optical-sizing: auto;
}
</style>