<script setup lang="ts">
import {useProductStore} from "~/store/product";

const productStore = useProductStore()
const {
  product,
  pending,
  error
} = storeToRefs(productStore)
const {fetchProduct} = productStore

const router = useRouter()
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
  <div class="h-full py-6 lg:py-8">
    <ui-loading v-if="pending"/>

    <div v-else-if="product" class="container">

      <div class="flex items justify-between gap-2 mb-4">
        <button class="link" @click="router.back()">
          <span class="i-ph:arrow-left-light h-4 w-4 flex-shrink-0"></span>
          Back
        </button>
      </div>

      <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
        <img
          :src="product.image"
          :alt="product.title"
          class="w-full h-full aspect-square object-contain"
        >

        <div class="flex flex-col items-start lg:pl-8 lg:border-l lg:border-gray-200">
          <h1 class="mb-4 lg:mb-8 heading-1">{{ product.title }}</h1>
          <div class="flex flex-col gap-4">
            <p class="text-base">{{ product.description }}</p>
            <div class="flex items-center gap-1">
              <div v-for="star in stars" :key="star">
                <div
                  v-if="roundedRating >= star"
                  class="h-5 w-5 flex-shrink-0 text-yellow-500 i-ph:star-fill"
                />
                <div v-else class="h-5 w-5 flex-shrink-0 text-yellow-500 i-ph:star-light"/>
              </div>
              <span class="text-sm">
                {{product.rating.count}} reviews
              </span>
            </div>
            <p class="heading-2">${{ product.price }}</p>
          </div>
        </div>
      </div>
    </div>

    <ui-error-message v-else>{{ error }}</ui-error-message>
  </div>
</template>

<style scoped>

</style>