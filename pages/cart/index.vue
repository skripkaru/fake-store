<script setup lang="ts">
import { useCartStore } from '~/store/cart'

const {removeItem} = useCartStore()
const {items, totalPrice} = storeToRefs(useCartStore())
const router = useRouter()
</script>

<template>
  <div class="container mx-auto">
    <div v-if="items.length" class="flex h-full flex-col overflow-y-scroll">
      <div class="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
        <h2 class="text-2xl font-medium text-gray-900">Shopping cart</h2>
        <div class="my-8">
          <div class="flow-root">
            <ul role="list" class="-my-6 divide-y divide-gray-200">
              <li v-for="item in items" :key="item.id" class="flex py-6">
                <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img :src="item.images[0]" :alt="item.title" class="h-full w-full object-cover object-center">
                </div>

                <div class="ml-4 flex flex-1 flex-col">
                  <div>
                    <div class="flex justify-between text-base font-medium text-gray-900">
                      <h3>
                        <a href="#">{{ item.title }}</a>
                      </h3>
                      <p class="ml-4">${{ item.price }}</p>
                    </div>
                    <p class="mt-1 text-sm text-gray-500">{{item.category}}</p>
                  </div>
                  <div class="flex flex-1 items-end justify-between text-sm">
                    <p class="text-gray-500">Quantity: {{ item.quantity }}</p>

                    <div class="flex">
                      <button @click="removeItem(item.id)" type="button" class="font-medium text-indigo-600 hover:text-indigo-500">Remove</button>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div class="border-t border-gray-200 py-6">
          <div class="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>${{ totalPrice }}</p>
          </div>
          <p class="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
          <div class="mt-6">
            <NuxtLink to="/" class="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">Checkout</NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div class="text-center">
        <p class="text-base font-semibold text-indigo-600">Oops</p>
        <h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Your cart is empty.</h1>
        <div class="mt-10 flex items-center justify-center gap-x-6">
          <nuxt-link to="/products" class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Go to catalog</nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>