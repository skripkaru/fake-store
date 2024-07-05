<script setup lang="ts">
import type {Product} from "~/interfaces/product";

defineProps<{ product: Product }>()
</script>

<template>
  <div class="flex flex-col">
    <nuxt-link :to="`/products/${product.id}`" class="mb-4">
      <img :src="product.image" :alt="product.title" class="aspect-square object-contain">
    </nuxt-link>
    <h3 class="mb-1 heading-3 line-clamp-1">{{ product.title }}</h3>
    <p class="mb-3 text-sm  text-gray-500">{{ product.category }}</p>
    <div class="flex items-center justify-between gap-2 mt-auto">
      <p class="text-xl font-medium">${{ product.price }}</p>
      <button class=" flex items-center justify-center">
        <span class="i-ph:shopping-cart h-6 w-6 flex-shrink-0"></span>
      </button>
    </div>
  </div>
</template>

<style scoped>

</style>