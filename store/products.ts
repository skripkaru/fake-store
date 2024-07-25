import {defineStore} from 'pinia'
import type {Category, Product} from "~/interfaces/product";
import {useProductsService} from "~/services/products";
import {useDebounce} from '@vueuse/core'

export const useProductsStore = defineStore('product', () => {
  const {getProducts, getProductById, getCategories, getProductsByCategory, searchProducts} = useProductsService()

  const pending = ref<boolean>(false)
  const error = ref<any>(null)
  const products = ref<Product[]>([])
  const product = ref<Product | null>(null)
  const categories = ref<Category[]>([])
  const selectedCategory = ref<string>('')
  const page = ref<number>(1)
  const limit = ref<number>(12)
  const total = ref<number>(0)
  const sortBy = ref<string>('')
  const order = ref<string>('')
  const searchQuery = ref('')
  const debouncedSearchQuery = useDebounce(searchQuery, 300)
  const sortValue = ref<any>('')
  const sortOptions = ref([
    {
      value: 'price_desc',
      label: 'Price ↑',
    },
    {
      value: 'price_asc',
      label: 'Price ↓',
    },
  ])

  const setPage = (newPage: number) => {
    page.value = newPage
  }

  const fetchProducts = async () => {
    pending.value = true
    try {
      const params = {
        limit: limit.value,
        skip: (page.value - 1) * limit.value,
        sortBy: sortBy.value,
        order: order.value,
        q: debouncedSearchQuery.value,
      }

      let response

      if (selectedCategory.value) {
        response = await getProductsByCategory(selectedCategory.value, params)
      } else if (debouncedSearchQuery.value) {
        response = await searchProducts(params)
      } else {
        response = await getProducts(params)
      }

      products.value = response.products
      total.value = response.total
    } catch (e) {
      error.value = e
    } finally {
      pending.value = false
    }
  }

  const fetchProduct = async (id: string) => {
    pending.value = true
    try {
      const response = await getProductById(id)

      product.value = response
    } catch (e) {
      error.value = e
    } finally {
      pending.value = false
    }
  }

  const fetchCategories = async () => {
    pending.value = true
    try {
      const response = await getCategories()

      categories.value = response
    } catch (e) {
      error.value = e
    } finally {
      pending.value = false
    }
  }

  const sortProducts = (sortValue: string) => {
   const [newSortBy, newOrder] = sortValue.split('_')
    sortBy.value = newSortBy
    order.value = newOrder
    page.value = 1
  }

  watch([page, sortBy, order, debouncedSearchQuery], fetchProducts, {
    immediate: true
  })

  return {
    products,
    product,
    categories,
    selectedCategory,
    searchQuery,
    sortBy,
    sortValue,
    sortOptions,
    order,
    page,
    limit,
    total,
    pending,
    error,
    fetchProducts,
    fetchProduct,
    fetchCategories,
    sortProducts,
    setPage
  }
})

