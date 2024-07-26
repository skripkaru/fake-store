<script setup lang="ts">
import {useProductsStore} from '~/store/products'

const productsStore = useProductsStore()
const {
  debouncedSearchQuery,
  sortedProducts,
  paginatedProducts,
  categories,
  selectedCategories,
  brands,
  selectedBrands,
  priceRange,
  order,
  page,
  limit,
  pending,
} = storeToRefs(productsStore)
const {
  fetchProducts,
  changePage
} = productsStore

const router = useRouter()

await useAsyncData('products', () => fetchProducts().then(() => true), {
  lazy: true
})

const showFilters = ref<boolean>(false)

const tempSelectedCategories = ref<string[]>([])
const tempSelectedBrands = ref<string[]>([])
const tempPriceRange = ref<[number, number]>([0, 100000])

const openFilters = () => {
  showFilters.value = true
}

const closeFilters = () => {
  showFilters.value = false
}

const applyFilters = () => {
  selectedCategories.value = [...tempSelectedCategories.value]
  selectedBrands.value = [...tempSelectedBrands.value]
  priceRange.value = [...tempPriceRange.value]
  closeFilters()
}

const resetFilters = () => {
  selectedCategories.value = []
  selectedBrands.value = []
  priceRange.value = [0, 50000]
  closeFilters()
}

const sortOptions = [
  {
    value: 'asc',
    label: 'Price ↓',
  },
  {
    value: 'desc',
    label: 'Price ↑',
  },
]

const showAllCategories = ref<boolean>(false)
const popularCategories = ref<string[]>(['motorcycle', 'vehicle', 'smartphones', 'laptops', 'fragrances'])
const allCategories = ref<string[]>(popularCategories.value)

const showAllBrands = ref<boolean>(false)
const popularBrands = ref<string[]>(['Apple', 'Gucci', 'Nike', 'Prada', 'Rolex'])
const allBrands = ref<string[]>(popularBrands.value)

watch(showAllCategories, (newValue) => {
  if(newValue) {
    allCategories.value = categories.value
  } else {
    allCategories.value = popularCategories.value
  }
})

watch(showAllBrands, (newValue) => {
  if(newValue) {
    allBrands.value = brands.value
  } else {
    allBrands.value = popularBrands.value
  }
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
        <div class="flex items-center gap-2">
          <el-select
            style="width: 96px"
            v-model="order"
            placeholder="Sort by"
          >
            <el-option
              v-for="item in sortOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>

          <el-button @click="openFilters" link>
            <div class="i-ph:funnel-light w-6 h-6"></div>
          </el-button>
        </div>
      </template>
    </el-page-header>

    <el-input v-model="debouncedSearchQuery" placeholder="Search" class="mb-4"/>

    <el-empty v-if="!paginatedProducts.length" description="Products not found">
      <el-button @click="resetFilters">Go to shop</el-button>
    </el-empty>
    <template v-else>
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4 mb-4">
        <el-card v-for="product in paginatedProducts" :key="product.id" shadow="hover">
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
        :total="sortedProducts.length"
        @current-change="changePage"
        hide-on-single-page
      />
    </template>

    <el-drawer v-model="showFilters" title="Filters" class="!w-full !sm:w-1/2 !lg:w-1/3">
      <div class="grid gap-4">
        <div>
          <p class="mb-2">Price</p>
          <el-slider v-model="tempPriceRange" :max="50000" :step="100" range/>
        </div>

        <div>
          <p class="mb-2">Categories</p>
          <el-checkbox-group v-model="tempSelectedCategories" class="w-full flex flex-col !items-start">
            <el-checkbox
              v-for="category in allCategories"
              :key="category"
              :label="category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')"
              :value="category"
            />
          </el-checkbox-group>
          <el-button @click="showAllCategories = !showAllCategories"  type="primary" link>
            {{showAllCategories ? 'Hide all' : 'Show all'}}
          </el-button>
        </div>

        <div>
          <p class="mb-2">Brands</p>
          <el-checkbox-group v-model="tempSelectedBrands" class="w-full flex flex-col !items-start">
            <el-checkbox
              v-for="brand in allBrands"
              :key="brand"
              :label="brand"
              :value="brand"
            />
          </el-checkbox-group>
          <el-button @click="showAllBrands = !showAllBrands" type="primary" link>
            {{showAllBrands ? 'Hide all' : 'Show all'}}
          </el-button>
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