<script setup lang="ts">
import {useProductStore} from "~/store/product";
import {useCartStore} from "~/store/cart";

const productStore = useProductStore()
const {
  product,
  pending,
} = storeToRefs(productStore)
const {fetchProduct} = productStore

const cartStore = useCartStore()
const {addProductToCart, incrementQuantity, decrementQuantity, findProductById} = cartStore

const router = useRouter()
const route = useRoute()
const productId = route.params.id as string

const stars = computed<number[]>(() => Array(5).fill(undefined).map((_, index) => index + 1))
const roundedRating = computed(() => Math.round(product.value?.rating.rate ?? 0));

const productQuantity = computed(() => {
  const item = findProductById(Number(productId));
  return item ? item.quantity! : 0;
});

useAsyncData(async () => {
  await fetchProduct(productId)
})

useHead({
  title: () => product.value?.title as string,
})
</script>

<template>
  <div v-loading="pending" class="container mx-auto">
    <template v-if="product">
      <el-page-header @back="router.back()" class="mb-4">
        <template #content>
          <h1>{{ product.title }}</h1>
        </template>
      </el-page-header>

      <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4">
        <img
          :src="product.image"
          :alt="product.title"
          class="w-full h-full aspect-square object-contain"
        >

        <div class="flex flex-col items-start lg:pl-8 lg:border-l lg:border-gray-200">
          <h1 class="mb-4 text-4xl">{{ product.title }}</h1>
          <div class="flex flex-col gap-4 mb-4">
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
            <p class="text-2xl">${{ product.price }}</p>
          </div>

          <div v-if="productQuantity" class="grid grid-cols-[auto_32px_auto] items-center justify-between gap-1 p-1 rounded-sm border border-gray-200">
            <el-button @click="decrementQuantity(product.id)" link>
              <div class="i-ph:minus-light h-4 w-4"></div>
            </el-button>
            <span class="text-sm text-center">{{productQuantity}}</span>
            <el-button @click="incrementQuantity(product.id)" link>
              <div class="i-ph:plus-light h-4 w-4"></div>
            </el-button>
          </div>
          <el-button v-else @click="addProductToCart(product)">
            Add to cart
          </el-button>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>

</style>