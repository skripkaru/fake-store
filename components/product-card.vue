<script setup lang="ts">
import type {Product} from "~/interfaces/product";

const props = defineProps<{ product: Product }>()

const productCategory = computed(() => props.product.category.charAt(0).toUpperCase() + props.product.category.slice(1))
</script>

<template>
  <div class="group flex flex-col border border-gray-100 shadow-sm p-4 lg:p-8">
    <nuxt-link :to="`/products/${product.id}`" class="mb-4">
      <img :src="product.image" :alt="product.title" class="aspect-square object-contain">
    </nuxt-link>
    <h4 class="mb-1 heading-3 line-clamp-1">{{ product.title }}</h4>
    <p class="mb-2 text-sm  text-gray-500">{{ productCategory }}</p>
    <div class="flex items-center justify-between gap-1 mb-4">
      <p class="heading-4">${{ product.price }}</p>
      <div class="flex items-center gap-1">
        <div class="h-5 w-5 flex-shrink-0 text-yellow-500 i-ph:star-fill"/>
        {{ product.rating.rate }}
      </div>
    </div>
    <div class="flex items-center justify-between gap-1 mt-auto">
      <div>Counter</div>
      <ui-button-icon>
        <div class="i-ph:shopping-cart-light h-6 w-6 flex-shrink-0"></div>
      </ui-button-icon>
    </div>
  </div>
</template>

<style scoped>

</style>