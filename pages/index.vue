<script setup lang="ts">
import {useProductStore} from '~/store/product'
import {onMounted} from 'vue'

const productStore = useProductStore()
const {
  products,
  categories,
  totalPages,
  searchQuery,
  selectedSort,
  order,
  pending,
  error,
  page,
} = storeToRefs(productStore)
const {fetchProducts, fetchCategories, nextPage, prevPage} = productStore

onMounted(() => {
  fetchProducts()
  fetchCategories()
})
</script>

<template>
  <div class="container mx-auto px-4">
    <categories-list :categories="categories"/>

    <search-bar v-if="products.length" v-model="searchQuery" :handle-submit="fetchProducts"/>

    <sort-bar v-if="products.length" v-model:selected-sort="selectedSort" v-model:order="order" :handle-change="fetchProducts"/>

    <products-list v-if="products.length" :products="products" :total-pages="totalPages" :handle-click="fetchProducts"/>

    <ui-pagination
      v-if="products.length"
      :current-page="page"
      :total-pages="totalPages"
      :next-page="nextPage"
      :prev-page="prevPage"
    />

    <ui-error v-else-if="error">{{ error }}</ui-error>

    <ui-loading v-else :is-loading="pending"/>
  </div>
</template>

<style scoped>

</style>