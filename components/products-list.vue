<script setup lang="ts">
import type {Product} from "~/interfaces/product";

defineProps<{
  products: Product[];
}>();
</script>

<template>
  <div v-if="products.length" class="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
    <product-card v-for="product in products" :key="product.id" :product="product"/>
  </div>
</template>

<style scoped>

</style>