<script setup lang="ts">
import {useProductsStore} from '~/store/products'
import {onMounted, computed} from 'vue'
import CategoriesList from "~/components/categories-list.vue";

const productsStore = useProductsStore()
const {
  searchQuery,
  selectedSort,
  getProducts,
  getCategories,
  getTotalPages,
  getPending,
  getError
} = storeToRefs(productsStore)
const {fetchProducts, fetchCategories, fetchProductsByCategory} = productsStore

onMounted(() => {
  fetchProducts()
  fetchCategories()
})

const products = computed(() => getProducts.value)
const categories = computed(() => getCategories.value)
const totalPages = computed(() => getTotalPages.value)
const pending = computed(() => getPending.value)
const error = computed(() => getError.value)
</script>

<template>
  <div class="container mx-auto px-4">
    <categories-list :handle-click="fetchProductsByCategory" :categories="categories"/>

    <search-bar v-model="searchQuery" :handle-submit="fetchProducts"/>

    <sort-bar v-model="selectedSort" :handle-change="fetchProducts"/>

    <products-list v-if="products" :products="products" :total-pages="totalPages" :handle-click="fetchProducts"/>

    <ui-error v-else-if="error">{{ error }}</ui-error>

    <ui-loading v-else :is-loading="pending"/>
  </div>
</template>

<style scoped>

</style>