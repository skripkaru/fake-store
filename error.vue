<script setup>
useHead({
  title: 'Page not found'
})
</script>

<template>
  <div class="grid min-h-full place-items-center px-4 py-8">
    <div class="text-center">
      <p class="text-8xl font-medium mb-4">404</p>
      <h1 class="mb-6 heading-1">Page not found</h1>
      <p class="mb-8 text-base text-gray-500">Sorry, we couldn’t find the page you’re looking for.</p>
      <nuxt-link to="/" class="button">Go back home</nuxt-link>
    </div>
  </div>
</template>

<style scoped>

</style>