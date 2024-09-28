<template>
  <div class="grid grid-cols-12 gap-5">
    <div class="col-span-full lg:col-span-4 space-y-4 2xl:col-span-3">
      <slot name="col-a"></slot>
    </div>
    <div class="col-span-full lg:col-span-8 2xl:col-span-9">
      <div class="grid grid-cols-8 gap-5">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
