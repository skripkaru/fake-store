<script setup lang="ts">
useHead({
  htmlAttrs: {
    lang: 'en'
  },
  bodyAttrs: {
    class: ' font-sans',
  }
})
</script>

<template>
  <div class="h-full grid grid-rows-[auto_1fr_auto]">
    <app-header/>
    <main class="min-w-[0] py-4">
      <slot></slot>
    </main>
    <app-footer/>
  </div>
</template>

<style scoped>

</style>