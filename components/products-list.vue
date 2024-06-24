<script setup lang="ts">
import type {IProduct} from "~/types";

defineProps<{
  products: IProduct[];
  totalPages: number
  handleClick: (page: number) => void
}>();
</script>

<template>
  <div v-if="products" class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 sm:gap-6 xl:gap-8">
    <product-card v-for="product in products" :key="product.id" :product="product"/>
  </div>
  <ui-pagination :handle-click="handleClick" :total-pages="totalPages"/>
</template>

<style scoped>

</style>