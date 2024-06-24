<script setup lang="ts">
import type {IProduct} from '~/types';
import {useCartStore} from '~/store/cart'

const cartStore = useCartStore();
const {addItem} = cartStore;

defineProps<{ product: IProduct }>()
</script>

<template>
  <div class="group">
    <nuxt-link  :to="`/products/${product.id}`" class="flex aspect-square w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
      <img
        :src="product.images[0]"
        :alt="product.title"
        class="h-full w-full object-contain object-center group-hover:opacity-75"
      >
    </nuxt-link>
    <h3 class="mt-4 text-sm text-gray-700">{{ product.title }}</h3>
    <p class="mt-1 text-lg font-medium text-gray-900">${{ product.price }}</p>
    <ui-button class="mt-4" @click="addItem(product)">Add to cart</ui-button>
  </div>
</template>

<style scoped>

</style>