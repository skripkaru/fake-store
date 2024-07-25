<script setup lang="ts">
import {useProductsStore} from '~/store/products'

const productsStore = useProductsStore()
const {
  products,
  categories,
  selectedCategory,
  page,
  limit,
  total,
  pending,
  searchQuery,
  sortValue,
  sortOptions
} = storeToRefs(productsStore)
const {
  fetchProducts,
  fetchCategories,
  sortProducts,
  setPage
} = productsStore

const router = useRouter()

await useAsyncData('products', () => fetchProducts().then(() => true), {
  lazy: true
})
await useAsyncData('categories', () => fetchCategories().then(() => true), {
  lazy: true
})

const showFilters = ref(false)

const toggleFilters = () => {
  showFilters.value = !showFilters.value
}

const applyFilters = () => {
  fetchProducts()
  toggleFilters()
}

const resetFilters = () => {
  selectedCategory.value = ''
  toggleFilters()
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
        <div class="flex items-center gap-2">
          <el-select
            style="width: 96px"
            v-model="sortValue"
            placeholder="Sort by"
            @change="sortProducts(sortValue)"
          >
            <el-option
              v-for="item in sortOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>

          <el-button @click="toggleFilters" link>
            <div class="i-ph:funnel-light w-6 h-6"></div>
          </el-button>
        </div>
      </template>
    </el-page-header>

    <el-input v-model="searchQuery" placeholder="Search" class="mb-4"/>

    <el-empty v-if="!products.length" description="Products not found">
      <el-button @click="router.push('/products')">Go to shop</el-button>
    </el-empty>
    <template v-else>
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4 mb-4">
        <el-card v-for="product in products" :key="product.id" shadow="hover">
          <nuxt-link :to="`/products/${product.id}`" class="block aspect-square">
            <img v-if="product.images.length" :src="product.images[0]" :alt="product.title"
                 class="w-full h-full object-contain">
            <div v-else class="w-full h-full bg-gray-200"></div>
          </nuxt-link>
          <h4 class="text-sm lg:text-lg line-clamp-1">{{ product.title }}</h4>
          <p class="mb-2 text-xs lg:text-sm text-gray-500">{{ product.brand }}</p>
          <p class="text-sm lg:text-lg">${{ product.price }}</p>
        </el-card>
      </div>

      <el-pagination
        layout="prev, pager, next"
        :current-page="page"
        :page-size="limit"
        :total="total"
        @current-change="setPage"
      />
    </template>

    <el-drawer v-model="showFilters" title="Filters" class="!w-full !sm:w-1/2 !lg:w-1/3">
      <div class="grid gap-4">
        <div>
          <p class="mb-2">Categories</p>
          <el-radio-group v-model="selectedCategory" class="w-full flex flex-col !items-start">
            <el-radio
              v-for="category in categories"
              :key="category.slug"
              :value="category.slug"
            >
             {{category.name}}
            </el-radio>
          </el-radio-group>
        </div>
      </div>
      <template #footer>
        <div class="flex items-center justify-between gap-2">
          <el-button @click="resetFilters">
            Reset
          </el-button>
          <el-button type="primary" @click="applyFilters">
            Apply
          </el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<style scoped>

</style>