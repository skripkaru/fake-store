<script setup lang="ts">
import {useProductStore} from '~/store/product'

const productStore = useProductStore()
const {
  products,
  categories,
  category,
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

useAsyncData(async () => {
  await fetchProducts()
  await fetchCategories()
})

const formattedCategories = computed(() => categories.value.map((category) => category.charAt(0).toUpperCase() + category.slice(1)))

const resetCategory = () => {
  category.value = ''
}

useHead({
  title: 'Products'
})
</script>

<template>
  <div v-loading="pending" class="container mx-auto">
    <el-page-header @back="router.back()" class="mb-4">
      <template #content>
        <h1>Shop</h1>
      </template>

      <template #extra>
        <el-button @click="changeSort" text>
          <div
            class="h-6 w-6"
            :class="sort === 'asc' ? 'i-ph:sort-ascending-light' : 'i-ph:sort-descending-light'"
          />
        </el-button>
      </template>
    </el-page-header>

    <div v-if="categories.length" class="flex flex-wrap items-center gap-1 mb-4">
      <el-button
        @click="resetCategory"
      >
        All
      </el-button>

      <el-button
        v-for="category in formattedCategories"
        :key="category"
        @click="fetchProductsByCategory(category.toLowerCase())"
      >
        {{ category }}
      </el-button>
    </div>

    <div v-if="products.length" class="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      <el-card v-for="product in products" :key="product.id" shadow="hover">
        <nuxt-link :to="`/products/${product.id}`" class="block mb-4">
          <img :src="product.image" :alt="product.title" class="aspect-square object-contain">
        </nuxt-link>
        <h4 class="mb-1 heading-4 line-clamp-1">{{ product.title }}</h4>
        <p class="text-sm text-gray-500">{{ product.category.charAt(0).toUpperCase() + product.category.slice(1) }}</p>
        <template #footer>
          <p class="text-xl">${{ product.price }}</p>
        </template>
      </el-card>
    </div>

  </div>
</template>

<style scoped>

</style>