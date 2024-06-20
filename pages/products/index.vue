<script setup lang="ts">
import type {IProduct} from "~/types";
import { useCartStore } from '~/store/cart'

const {addItem} = useCartStore()

const {data: products, error} = await useFetch<IProduct[]>('/api/products')

const router = useRouter()

const addToCart = (product: IProduct) => {
  addItem(product)
  router.push('/cart')
}
</script>

<template>
  <div v-if="products" class="container mx-auto px-4">
    <div class="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4 sm:gap-4 lg:gap-6">
      <product-card
        v-for="product in products"
        :key="product.id"
        :product="product"
        @add-to-cart="addToCart(product)"
      />
    </div>
  </div>
  <div v-else class="text-center py-8">Loading...</div>
  <div v-if="error" class="text-center text-red-500 py-8">{{ error.message }}</div>
</template>

<style scoped>

</style>