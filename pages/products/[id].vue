<script setup lang="ts">
import {useProductStore} from "~/store/product";

const productStore = useProductStore()
const {
  product,
  pending,
  error
} = storeToRefs(productStore)
const {fetchProduct} = productStore

const route = useRoute()
const productId = route.params.id as string

const stars = computed<number[]>(() => Array(5).fill(undefined).map((_, index) => index + 1))
const roundedRating = computed(() => Math.round(product.value?.rating.rate ?? 0));

onMounted(async () => {
  await fetchProduct(productId)
})

useHead({
  title: () => product.value?.title as string,
})
</script>

<template>
  <ui-loading v-if="pending"/>

  <div v-else-if="product" class="container">
    <div class="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
      <img :src="product.image" :alt="product.title" class="aspect-square object-contain">

      <div class="flex flex-col items-start sm:pl-6 lg:pl-8 sm:border-l sm:border-gray-200">
        <h1 class="mb-4 sm:mb-6 lg:mb-8 heading-1">{{ product.title }}</h1>
        <div class="flex flex-col gap-4">
          <p class="text-base">{{ product.description }}</p>
          <p class="font-medium text-2xl">${{ product.price }}</p>
          <div class="flex items-center gap-1">
            <div v-for="star in stars" :key="star">
              <div v-if="roundedRating >= star"
                   class="h-5 w-5 flex-shrink-0 text-yellow-500 i-ph:star-fill"/>
              <div v-else class="h-5 w-5 flex-shrink-0 text-yellow-500 i-ph:star-light"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <ui-error-message v-else>{{ error }}</ui-error-message>
</template>

<style scoped>

</style>