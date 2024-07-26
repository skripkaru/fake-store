<script setup lang="ts">
import {useCartStore} from '~/store/cart'

const router = useRouter()

const cartStore = useCartStore()
const {cartItems, totalPrice} = storeToRefs(cartStore)
const {removeProductFromCart, clearCart} = cartStore

useHead({
  title: 'Shopping cart'
})
</script>

<template>
  <el-empty v-if="!cartItems.length" description="Your cart is empty">
    <el-button @click="router.push('/products')">Go to shop</el-button>
  </el-empty>

  <div v-else class="container mx-auto">
    <el-page-header @back="router.back()" class="mb-4">
      <template #content>
        <h1 class="text-base lg:text-lg">Shopping cart</h1>
      </template>

      <template #extra>
        <el-button @click="clearCart">
          Clear
        </el-button>
      </template>
    </el-page-header>


    <div class="grid grid-cols-1 gap-4">
      <ul class="divide-y divide-gray-200">
        <li
          v-for="item in cartItems"
          :key="item.id"
          class="relative grid grid-cols-1 lg:grid-cols-[auto_1fr_160px] gap-4 py-4"
        >
          <nuxt-link :to="`/products/${item.id}`" class="h-24 w-24">
            <img :src="item.images[0]" :alt="item.title" class="h-full w-full aspect-square object-contain">
          </nuxt-link>

          <div>
            <nuxt-link :to="`/products/${item.id}`" class="text-base">{{ item.title }}</nuxt-link>
            <p class="text-sm text-gray-500">{{ item.brand }}</p>
          </div>

          <p class="text-base lg:mt-auto lg:ml-auto">{{ item.quantity }} x ${{ item.price }}</p>

          <el-button @click="removeProductFromCart(item.id)" class="absolute right-0 top-4" link>
            <div class="i-ph:trash-light h-5 w-5"></div>
          </el-button>
        </li>
      </ul>
    </div>
    <div class="border-t border-gray-200 py-6">
      <div class="flex items-center justify-end">
        <p class="text-base lg:text-lg">Total: ${{ totalPrice.toFixed(2) }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>