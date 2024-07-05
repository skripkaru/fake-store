<script setup lang="ts">
useHead({
  htmlAttrs: {
    lang: 'en'
  },
  bodyAttrs: {
    class: ' font-sans text-gray-900',
  }
})
</script>

<template>
  <div class="h-full grid grid-rows-[auto_1fr_auto]">
    <app-header/>
    <main class="min-w-[0] py-8 sm:py-10 lg:py-12">
      <slot></slot>
    </main>
    <app-footer/>
  </div>
</template>

<style>
html,
body,
#__nuxt {
  height: 100%;
}
</style>