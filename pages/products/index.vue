<script setup lang="ts">
import {useProductsStore} from '~/store/products'

const productsStore = useProductsStore()
const {
  products,
  categories,
  page,
  limit,
  total,
  pending,
} = storeToRefs(productsStore)
const {
  fetchProducts,
  fetchCategories,
  setCategory,
  sortProducts,
  setPage
} = productsStore

const router = useRouter()

await useAsyncData('products', () => fetchProducts().then(() => true), {
  lazy: true,
})
await useAsyncData('categories', () => fetchCategories().then(() => true), {
  lazy: true,
})

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
        <el-button-group>
          <el-button @click="sortProducts('price', 'desc')">
            <div class="i-ph:sort-descending-light w-6 h-6"></div>
          </el-button>
          <el-button @click="sortProducts('price', 'asc')">
            <div class="i-ph:sort-ascending-light w-6 h-6"></div>
          </el-button>
        </el-button-group>
      </template>
    </el-page-header>

    <div v-if="categories.length" class="flex flex-wrap items-center gap-1 mb-4">
      <el-button @click="setCategory('')">
        All
      </el-button>

      <el-button
        v-for="category in categories"
        :key="category.slug"
        @click="setCategory(category.slug)"
      >
        {{ category.name }}
      </el-button>
    </div>

    <div v-if="products.length" class="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4 mb-4">
      <el-card v-for="product in products" :key="product.id" shadow="hover">
        <nuxt-link :to="`/products/${product.id}`" class="block mb-4">
          <img :src="product.images[0]" :alt="product.title" class="aspect-square object-contain">
        </nuxt-link>
        <h4 class="text-sm lg:text-lg line-clamp-1">{{ product.title }}</h4>
        <p class="mb-2 text-xs lg:text-sm text-gray-500">{{ product.brand }}</p>
        <p class="text-sm lg:text-lg">${{ product.price }}</p>
      </el-card>
    </div>

    <div v-if="products.length">
      <el-pagination
        layout="prev, pager, next"
        :current-page="page"
        :page-size="limit"
        :total="total"
        @current-change="setPage"
      />
    </div>

  </div>
</template>

<style scoped>

</style>