<script setup lang="ts">

</script>

<template>
  <header class="py-4 border-b border-gray-200">
    <nav class="container">
      <div class="flex items-center justify-between">
        <nuxt-link to="/" class="font-semibold text-lg sm:text-xl md:text-2xl">
          Fake Store
        </nuxt-link>
        <div class="flex items-center gap-3 sm:gap-6">
<!--          <nuxt-link to="/login" class="text-sm font-medium text-gray-700 hover:text-gray-800">-->
<!--            Sign in-->
<!--          </nuxt-link>-->
          <nuxt-link to="/" class="link text-sm">
            Home
          </nuxt-link>
          <nuxt-link to="/products" class="link text-sm">
            Shop
          </nuxt-link>

          <div class="w-px h-5 bg-gray-200"></div>

          <ui-button-icon to="/cart" class="relative">
            <div class="i-ph:bag-light h-6 w-6 flex-shrink-0"></div>
            <span class="absolute -top-2 -right-2 text-xs font-medium text-gray-700">
              0
            </span>
          </ui-button-icon>
<!--          </nuxt-link>-->
<!--          <nuxt-link class=" text-gray-400 hover:text-gray-500 cursor-pointer">-->
<!--            <div class="i-ph:sign-out-light h-6 w-6 flex-shrink-0"></div>-->
<!--          </nuxt-link>-->
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>

</style>