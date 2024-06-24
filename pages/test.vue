<script setup lang="ts">
import type {IProduct} from "~/types";

import { useProductsStore } from '~/store/products'
import { onMounted, computed } from 'vue'

const productsStore = useProductsStore()
const {getProducts, getTotalPages, getPending, getError} = storeToRefs(productsStore)
const {fetchProducts} = productsStore

onMounted(() => {
  fetchProducts()
})

const searchQuery = computed({
  get: () => getSearchQuery,
  set: value => searchQuery = value
})

const selectedSort = computed({
  get: () => getSelectedSort,
  set: value => selectedSort = value
})

const products = computed(() => getProducts)
const totalPages = computed(() => getTotalPages)
const pending = computed(() => getPending)
const error = computed(() => getError)


// const searchQuery = ref<string>('');
// const selectedSort = ref<string>('');
//
// const products = ref<IProduct[]>([]);
// const pending = ref<boolean>(false);
// const error = ref<any>(null);
//
// const limit = ref<number>(20);
// const totalPages = ref<number>(0);
//
// const fetchProducts = async (page: number = 1) => {
//   try {
//     pending.value = true;
//     const response = await $fetch(`/api/products`, {
//       params: {
//         q: searchQuery.value,
//         sortBy: selectedSort.value,
//         limit: limit.value,
//         skip: page - 1,
//         order: 'asc'
//       },
//       watch: [searchQuery, selectedSort],
//     });
//
//     console.log('response', response)
//
//     if(response) {
//       products.value = response.products
//       totalPages.value = Math.ceil(response.total / limit.value);
//     }
//   } catch (e) {
//     error.value = e;
//   } finally {
//     pending.value = false;
//   }
// };
//
// onMounted(fetchProducts)
</script>

<template>
  <div class="container mx-auto px-4">
    <search-bar
      v-model="searchQuery"
      :handle-submit="() => fetchProducts()"
    />
    <sort-bar
      v-model="selectedSort"
      :handle-change="() => fetchProducts()"
    />


    <products-list
      v-if="products"
      :products="products"
      :total-pages="totalPages"
      :handle-click="fetchProducts"
    />


    <ui-error v-else-if="error">{{ error }}</ui-error>
    <ui-loading v-else :is-loading="pending"/>
  </div>
</template>

<style scoped>

</style>