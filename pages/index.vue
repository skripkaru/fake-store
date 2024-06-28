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
  selectedCategory,
  order,
  pending,
  error,
  page,
} = storeToRefs(productStore)
const {
  fetchProducts,
  fetchCategories,
  fetchProductsByCategory,
  nextPage,
  prevPage,
  setPage,
  resetFilters
} = productStore


onMounted(() => {
  fetchProducts()
  fetchCategories()
})
</script>

<template>
  <div class="container mx-auto px-4">
    <div v-if="products.length" class="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-4">

      <div class="flex flex-col gap-4">
        <ui-input v-model="searchQuery" type="text" name="search" placeholder="Search"/>

        <div class="grid grid-cols-2 gap-2">
          <select class="w-full" v-model="selectedSort">
            <option value="" disabled>Sort by</option>
            <option value="title">Title</option>
            <option value="price">Price</option>
          </select>
          <select class="w-full" v-model="order">
            <option value="" disabled>Order</option>
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
        </div>

        <div v-if="categories.length">
          <span class="inline-block font-semibold text-sm mb-2">Categories</span>
          <div class="flex flex-wrap gap-2">
            <div
              v-for="category in categories"
              :key="category.slug"
              class="text-xs whitespace-nowrap py-1 px-2 bg-gray-300 text-white rounded cursor-pointer"
              :class="{'bg-gray-500': selectedCategory === category.slug}"
              @click="fetchProductsByCategory(category.slug)"
            >
              {{ category.name }}
            </div>
          </div>
        </div>

        <ui-button @click="resetFilters">Reset</ui-button>
      </div>

      <div>
        <products-list
          :products="products"
          :total-pages="totalPages"
          :handle-click="fetchProducts"
        />

        <ui-pagination
          :current-page="page"
          :total-pages="totalPages"
          :next-page="nextPage"
          :prev-page="prevPage"
          :set-page="setPage"
        />
      </div>
    </div>

    <ui-error v-else-if="error">{{ error }}</ui-error>

    <ui-loading v-else :is-loading="pending"/>
  </div>
</template>

<style scoped>

</style>