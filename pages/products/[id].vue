<script setup lang="ts">
import {useCartStore} from '~/store/cart'
import {useProductStore} from "~/store/product";

const productStore = useProductStore()
const {
  product,
  error,
} = storeToRefs(productStore)
const {fetchProduct} = productStore
const {addItem} = useCartStore()

const route = useRoute()
const productId = route.params.id as string

onMounted(async () => {
  await fetchProduct(productId)
})
</script>

<template>
  <div v-if="product" class="container mx-auto px-4">
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
      <div class="aspect-square rounded">
        <img :src="product.images[0]" :alt="product.title" class="h-full w-full object-contain object-center">
      </div>
      <div class="flex flex-col items-start sm:pl-8 sm:border-l sm::border-gray-200">
        <h1 class="mb-4 heading-1">{{ product.title }}</h1>
        <p class="mb-2 text-base text-gray-900">{{ product.description }}</p>
        <p class="mb-8 heading-2">${{ product.price }}</p>
        <div class="flex items-center mb-8">
          <div class="flex items-center">
            <div class="h-5 w-5 flex-shrink-0 text-gray-900 i-ph:star-light"/>
            <span class="ml-1">{{ product.rating }}</span>
          </div>
          <p class="sr-only">{{ product.rating }} out of 5 stars</p>
          <span class="ml-3 text-sm link">
            {{ product.reviews.length }} reviews
          </span>
        </div>
        <ui-button @click="addItem(product)">Add to cart</ui-button>
      </div>
    </div>
  </div>
  <div v-else-if="error" class="text-red-500">{{ error.message }}</div>
  <div v-else>Loading...</div>
</template>

<style scoped>

</style>