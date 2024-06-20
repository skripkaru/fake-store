<script setup lang="ts">
import type {IProduct} from '~/types';

defineProps<{ product: IProduct }>()
</script>

<template>
  <nuxt-link :to="`/products/${product.id}`" class="group">
    <div class="aspect-square w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
      <img
        :src="product.images[0]"
        :alt="product.title"
        class="h-full w-full object-contain object-center group-hover:opacity-75"
      >
    </div>
    <h3 class="mt-4 text-sm text-gray-700">{{ product.title }}</h3>
    <p class="mt-1 text-lg font-medium text-gray-900">${{ product.price }}</p>
  </nuxt-link>
</template>

<style scoped>

</style>