<script setup lang="ts">
import type {Product} from "~/interfaces/product";

defineProps<{
  products: Product[];
}>();
</script>

<template>
  <div v-if="products.length" class="grid grid-cols-2 xl:grid-cols-4 gap-col-4 gap-row-6 sm:gap-col-6 sm:gap-row-8 lg:gap-col-8 lg:gap-row-10">
    <product-card v-for="product in products" :key="product.id" :product="product"/>
  </div>
</template>

<style scoped>

</style>