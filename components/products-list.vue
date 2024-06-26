<script setup lang="ts">
import type {IProduct} from "~/types";

defineProps<{
  products: IProduct[];
  totalPages: number
  handleClick?: (page: number) => void
}>();
</script>

<template>
  <div v-if="products.length" class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 sm:gap-6 xl:gap-8">
    <product-card v-for="product in products" :key="product.id" :product="product"/>
  </div>
  <ui-empty
    v-else
    error-text="Oops"
    title="Products not found"
  />
</template>

<style scoped>

</style>