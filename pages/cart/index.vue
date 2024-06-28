<script setup lang="ts">
import { useCartStore } from '~/store/cart'

const cartStore = useCartStore()
const {removeItem} = cartStore
const {items, totalPrice} = storeToRefs(cartStore)
</script>

<template>
  <div class="container mx-auto px-4">
    <ui-empty
      v-if="!items.length"
      error-text="Oops"
      title="Your cart is empty"
      description="Browse our catalog and add some items to your cart."
      link="/"
      label="Go to catalog"
    />
    <div v-if="items.length" class="flex h-full flex-col overflow-y-scroll">
      <div class="flex-1 overflow-y-auto">
        <h1 class="heading-1">Shopping cart</h1>
        <ul role="list" class="my-6 divide-y divide-gray-200">
          <li v-for="item in items" :key="item.id" class="flex py-6">
            <nuxt-link :to="`/products/${item.id}`" class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
              <img :src="item.images[0]" :alt="item.title" class="h-full w-full object-cover object-center">
            </nuxt-link>
            <div class="ml-4 flex flex-1 flex-col">
              <div>
                <div class="flex justify-between text-base font-medium text-gray-900">
                  <h3>
                    <nuxt-link :to="`/products/${item.id}`">{{ item.title }}</nuxt-link>
                  </h3>
                  <p class="ml-4">${{ item.price }}</p>
                </div>
                <p class="mt-1 text-sm text-gray-500">{{item.brand}}</p>
              </div>
              <div class="flex flex-1 items-end justify-between text-sm">
                <p class="text-gray-500">Quantity: {{ item.quantity }}</p>
                <div class="flex">
                  <button @click="removeItem(item.id)" class="link">Remove</button>
                </div>
              </div>
            </div>
          </li>
        </ul>

        <div class="border-t border-gray-200 py-6">
          <div class="flex items-center justify-between  text-gray-900">
            <p class="text-xl font-medium">Total</p>
            <p class="text-2xl font-semibold">${{ Math.round(totalPrice) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>