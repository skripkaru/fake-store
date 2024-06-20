<script setup lang="ts">
import type {IProduct} from "~/types";
import {useCartStore} from '~/store/cart'

const {addItem} = useCartStore()

const route = useRoute()
const {data: product, error} = await useFetch<IProduct>(`/api/products/${route.params.id}`)
</script>

<template>
  <div v-if="product" class="container mx-auto px-4">
    <!-- Image gallery -->
    <div class="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
      <div class="aspect-[3/4] hidden overflow-hidden rounded-lg lg:block">
        <img :src="product.images[0]" :alt="product.title" class="h-full w-full object-contain object-center">
      </div>
      <div class="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
        <div class="aspect-[3/2] overflow-hidden rounded-lg">
          <img :src="product.images[0]" :alt="product.title" class="h-full w-full object-contain object-center">
        </div>
        <div class="aspect-[3/2] overflow-hidden rounded-lg">
          <img :src="product.images[0]" :alt="product.title" class="h-full w-full object-contain object-center">
        </div>
      </div>
      <div class="aspect-[4/5] lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
        <img :src="product.images[0]" :alt="product.title" class="h-full w-full object-contain object-center">
      </div>
    </div>

    <!-- Product info -->
    <div
      class="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
      <div class="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
        <h1 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{{ product.title }}</h1>
      </div>

      <!-- Options -->
      <div class="mt-4 lg:row-span-3 lg:mt-0">
        <h2 class="sr-only">Product information</h2>
        <p class="text-3xl tracking-tight text-gray-900">${{ product.price }}</p>

        <!-- Reviews -->
        <div class="mt-6">
          <h3 class="sr-only">Reviews</h3>
          <div class="flex items-center">
            <div class="flex items-center">
              <!-- Active: "text-gray-900", Default: "text-gray-200" -->
              <div class="h-5 w-5 flex-shrink-0 text-gray-900 i-ph:star-light"/>
              <span class="ml-1">{{ product.rating }}</span>
            </div>
            <p class="sr-only">{{ product.rating }} out of 5 stars</p>
            <a href="#"
               class="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">{{ product.reviews.length }}
              reviews</a>
          </div>
        </div>

        <button @click="addItem(product)" type="submit"
                class="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          Add to bag
        </button>
      </div>

      <div class="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
        <!-- Description and details -->
        <div>
          <h3 class="sr-only">Description</h3>

          <div class="space-y-6">
            <p class="text-base text-gray-900">{{ product.description }}</p>
          </div>
        </div>

        <div class="mt-10">
          <h3 class="text-sm font-medium text-gray-900">Highlights</h3>

          <div class="mt-4">
            <ul role="list" class="list-disc space-y-2 pl-4 text-sm">
              <li class="text-gray-400"><span class="text-gray-600">{{ product.warrantyInformation }}</span></li>
              <li class="text-gray-400"><span class="text-gray-600">{{ product.shippingInformation }}</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else-if="error" class="text-red-500">{{ error.message }}</div>
  <div v-else>Loading...</div>
</template>

<style scoped>

</style>