<script setup lang="ts">
import {useProductStore} from '~/store/product'

const productStore = useProductStore()
const {
  products,
  categories,
  sort,
  pending,
  error,
} = storeToRefs(productStore)
const {
  fetchProducts,
  fetchCategories,
  fetchProductsByCategory,
  changeSort,
} = productStore

const router = useRouter()

onMounted(() => {
  fetchProducts()
  fetchCategories()
})

const formattedCategories = computed(() => categories.value.map((category) => category.charAt(0).toUpperCase() + category.slice(1)))

useHead({
  title: 'Products'
})
</script>

<template>
  <div class="h-full py-6 lg:py-8">
    <ui-loading v-if="pending"/>

    <div v-else-if="products.length">
      <div class="container">

        <div class="flex items justify-between gap-2 mb-4">
          <button class="link" @click="router.back()">
            <span class="i-ph:arrow-left-light h-4 w-4 flex-shrink-0"></span>
            Back
          </button>

          <ui-button-icon @click="changeSort">
            <div
              class="h-6 w-6 flex-shrink-0"
              :class="sort === 'asc' ? 'i-ph:sort-ascending-light' : 'i-ph:sort-descending-light'"
            />
          </ui-button-icon>
        </div>

        <div v-if="categories.length" class="flex flex-wrap items-center gap-1 mb-4">
          <ui-button
            v-for="category in formattedCategories"
            :key="category"
            @click="fetchProductsByCategory(category.toLowerCase())"
            class="text-xs lg:text-sm py-2 px-4"
          >
            {{ category }}
          </ui-button>
        </div>

        <products-list :products="products"/>
      </div>
    </div>

    <ui-error-message v-else>{{ error }}</ui-error-message>
  </div>
</template>

<style scoped>

</style>