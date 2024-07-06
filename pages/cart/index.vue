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
  <div class="h-full py-6 lg:py-8">

    <ui-empty
      v-if="!cartItems.length"
      title="Your cart is empty"
      description="Browse our catalog and add some items to your cart."
      link="/products"
      label="Go to shop"
    />

    <div v-else class="container">
      <div class="flex items justify-between gap-2 mb-4">
        <button class="link" @click="router.back()">
          <span class="i-ph:arrow-left-light h-4 w-4 flex-shrink-0"></span>
          Back
        </button>

        <button class="link" @click="clearCart">
          Clear cart
          <span class="i-ph:trash-light h-4 w-4 flex-shrink-0"></span>
        </button>
      </div>

      <h1 class="heading-1 mb-4">Shopping cart</h1>

      <div class="grid grid-cols-1 gap-4">
        <ul class="divide-y divide-gray-200">
          <li
            v-for="item in cartItems"
            :key="item.id"
            class="relative grid grid-cols-1 lg:grid-cols-[auto_1fr_160px] gap-4 py-4"
          >
            <nuxt-link :to="`/products/${item.id}`" class="h-24 w-24">
              <img :src="item.image" :alt="item.title" class="h-full w-full aspect-square object-contain">
            </nuxt-link>

            <div>
              <nuxt-link :to="`/products/${item.id}`" class="heading-3">{{ item.title }}</nuxt-link>
              <p class="text-sm text-gray-500">{{ item.category }}</p>
            </div>

            <p class="heading-4 lg:mt-auto lg:ml-auto">{{ item.quantity }} x ${{ item.price }}</p>

            <ui-button-icon @click="removeProductFromCart(item.id)" class="absolute right-0 top-4">
              <div class="i-ph:trash-light h-5 w-5 flex-shrink-0"></div>
            </ui-button-icon>
          </li>
        </ul>
      </div>
      <div class="border-t border-gray-200 py-6">
        <div class="flex items-center justify-end">
          <p class="heading-2">Total: ${{ Math.round(totalPrice) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>