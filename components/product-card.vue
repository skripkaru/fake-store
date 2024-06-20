<script setup lang="ts">
import type {IProduct} from '~/types';

const props = defineProps<{ product: IProduct }>()
const emit = defineEmits<{
  (e: 'add-to-cart', product: IProduct): void
}>()

const addToCart = (product: IProduct) => {
  emit('add-to-cart', product)
}
</script>

<template>
  <NuxtLink :to="`/products/${product.id}`" class="group relative">
    <div class="aspect-square w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75">
      <img :src="product.images[0]" :alt="product.title" class="h-full w-full object-contain object-center">
    </div>
    <div class="mt-4 flex justify-between">
      <div>
        <h3 class="text-sm text-gray-700">
          <a href="#">
            <span aria-hidden="true" class="absolute inset-0"></span>
            {{ product.title }}
          </a>
        </h3>
        <p class="mt-1 text-sm text-gray-500">{{product.category}}</p>
      </div>
      <p class="text-sm font-medium text-gray-900">${{product.price}}</p>
    </div>
  </NuxtLink>
</template>

<style scoped>

</style>