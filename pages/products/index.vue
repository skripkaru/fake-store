<script setup lang="ts">
import {useProductsStore} from '~/store/products'

const productsStore = useProductsStore()
const {
  products,
  categories,
  category,
  sort,
  pending,
} = storeToRefs(productsStore)
const {
  fetchProducts,
  fetchCategories,
  fetchProductsByCategory,
  changeSort,
} = productsStore

const router = useRouter()

await useAsyncData('products', () => fetchProducts().then(() => true))
await useAsyncData('categories', () => fetchCategories().then(() => true))

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
        <h1 class="text-base lg:text-lg">Shop</h1>
      </template>

      <template #extra>
        <el-button @click="changeSort" link>
          <div
            class="h-6 w-6"
            :class="sort === 'asc' ? 'i-ph:sort-ascending-light' : 'i-ph:sort-descending-light'"
          />
        </el-button>
      </template>
    </el-page-header>

    <div v-if="categories.length" class="flex flex-wrap items-center gap-1 mb-4">
      <el-button @click="resetCategory">
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

    <div v-if="products.length" class="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4">
      <el-card v-for="product in products" :key="product.id" shadow="hover">
        <nuxt-link :to="`/products/${product.id}`" class="block mb-4">
          <img :src="product.image" :alt="product.title" class="aspect-square object-contain">
        </nuxt-link>
        <h4 class="text-sm lg:text-lg line-clamp-1">{{ product.title }}</h4>
        <p class="mb-2 text-xs lg:text-sm text-gray-500">{{ product.category.charAt(0).toUpperCase() + product.category.slice(1) }}</p>
        <p class="text-sm lg:text-lg">${{ product.price }}</p>
      </el-card>
    </div>

  </div>
</template>

<style scoped>

</style>