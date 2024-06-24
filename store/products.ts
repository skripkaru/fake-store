import {defineStore} from 'pinia'
import type {ICategory, IProduct, IProductResponse} from "~/types";

export const useProductsStore = defineStore('products', () => {
  // State
  const searchQuery = ref<string>('')
  const selectedSort = ref<string>('')

  const products = ref<IProduct[]>([])
  const categories = ref<ICategory[]>([])
  const pending = ref<boolean>(false)
  const error = ref<any>(null)

  const limit = ref<number>(8)
  const totalPages = ref<number>(0)

  // Actions
  const fetchProducts = async (page: number = 1) => {
    try {
      pending.value = true
      const response = await $fetch<IProductResponse>(`/api/products`, {
        params: {
          q: searchQuery.value,
          sortBy: selectedSort.value,
          limit: limit.value,
          skip: (page - 1) * limit.value,
          order: 'asc'
        },
      })

      if (response) {
        products.value = response.products
        totalPages.value = Math.ceil(response.total / limit.value)
      }
    } catch (e) {
      error.value = e
    } finally {
      pending.value = false
    }
  }

  const fetchCategories = async () => {
    try {
      pending.value = true
      const response = await $fetch<ICategory[]>('/api/categories')

      if (response) {
        categories.value = response
      }
    } catch (e) {
      error.value = e
    } finally {
      pending.value = false
    }
  }

  const fetchProductsByCategory = async (slug: string, page: number = 1) => {
    try {
      pending.value = true
      const response = await $fetch<IProductResponse>(`/api/categories/${slug}`, {
        params: {
          q: searchQuery.value,
          sortBy: selectedSort.value,
          limit: limit.value,
          skip: (page - 1) * limit.value,
          order: 'asc'
        },
      })

      if (response) {
        products.value = response.products
        totalPages.value = Math.ceil(response.total / limit.value)
      }
    } catch (e) {
      error.value = e
    } finally {
      pending.value = false
    }
  }

  // Автоматический вызов fetchProducts при изменении searchQuery и selectedSort
  watch([searchQuery, selectedSort], () => fetchProducts(1), { immediate: true })

  // Getters
  const getProducts = computed(() => products.value)
  const getCategories = computed(() => categories.value)
  const getTotalPages = computed(() => totalPages.value)
  const getPending = computed(() => pending.value)
  const getError = computed(() => error.value)
  const getSearchQuery = computed(() => searchQuery.value)
  const getSelectedSort = computed(() => selectedSort.value)

  return {
    searchQuery,
    selectedSort,
    products,
    pending,
    error,
    limit,
    totalPages,
    fetchProducts,
    fetchCategories,
    fetchProductsByCategory,
    getProducts,
    getCategories,
    getTotalPages,
    getPending,
    getError,
    getSearchQuery,
    getSelectedSort
  }
})

