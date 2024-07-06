<script setup lang="ts">
import type {Product} from "~/interfaces/product";
import {useCartStore} from "~/store/cart";

const props = defineProps<{ product: Product }>()

const cartStore = useCartStore()
const {addProductToCart, incrementQuantity, decrementQuantity, findProductById} = cartStore

const productCategory = computed(() => props.product.category.charAt(0).toUpperCase() + props.product.category.slice(1))

const productQuantity = computed(() => {
  const item = findProductById(props.product.id);
  return item ? item.quantity! : 0;
});
</script>

<template>
  <div class="group flex flex-col border border-gray-100 shadow-sm p-4 lg:p-6">
    <nuxt-link :to="`/products/${product.id}`" class="mb-4">
      <img :src="product.image" :alt="product.title" class="aspect-square object-contain">
    </nuxt-link>
    <h4 class="mb-1 heading-3 line-clamp-1">{{ product.title }}</h4>
    <p class="mb-2 text-sm  text-gray-500">{{ productCategory }}</p>
    <div class="flex items-center justify-between gap-1 mb-4">
      <p class="heading-4">${{ product.price }}</p>
      <div class="flex items-center gap-1">
        <div class="h-5 w-5 flex-shrink-0 text-yellow-500 i-ph:star-fill"/>
        {{ product.rating.rate }}
      </div>
    </div>
    <div v-if="productQuantity" class="flex items-center justify-between gap-1">
      <div class="w-full grid grid-cols-[auto_1fr_auto] items-center gap-1 border border-gray-200 rounded-sm p-2">
        <ui-button-icon @click="decrementQuantity(product.id)">
          <div class="i-ph:minus-light h-4 w-4 flex-shrink-0"></div>
        </ui-button-icon>
        <span class="text-sm text-center">{{productQuantity}}</span>
        <ui-button-icon @click="incrementQuantity(product.id)">
          <div class="i-ph:plus-light h-4 w-4 flex-shrink-0"></div>
        </ui-button-icon>
      </div>
    </div>
    <ui-button v-else @click="addProductToCart(product)" class="p-2 text-sm">
      Add to cart
      <div class="i-ph:shopping-cart-light h-5 w-5 flex-shrink-0 hidden lg:block"></div>
    </ui-button>
  </div>
</template>

<style scoped>

</style>