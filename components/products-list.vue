<script setup lang="ts">
import type {IProduct} from "~/types";

defineProps<{
  products: IProduct[];
  totalPages: number
  handleClick?: (page: number) => void
}>();
</script>

<template>
  <div v-if="products.length" class="grid grid-cols-2 gap-2 lg:grid-cols-4 lg:gap-4">
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