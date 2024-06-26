import {defineStore} from 'pinia'
import type {ICategory, IProduct, IProductResponse} from "~/types";

export const useProductStore = defineStore('product', () => {
  const config = useRuntimeConfig()
  const apiUrl = config.public.apiBase

  // State
  const searchQuery = ref<string>('')
  const selectedCategory = ref<string>('')
  const selectedSort = ref<string>('')
  const order = ref<string>('asc')
  const categories = ref<ICategory[]>([])
  const products = ref<IProduct[]>([])
  const product = ref<IProduct | null>(null)
  const pending = ref<boolean>(false)
  const error = ref<any>(null)
  const page = ref<number>(1)
  const limit = ref<number>(9)
  const totalPages = ref<number>(0)

  // Actions
  const fetchProducts = async () => {
    try {
      pending.value = true

      let endpoint = `${apiUrl}/products`

      const params: Record<string, any> = {
        q: searchQuery.value,
        sortBy: selectedSort.value,
        limit: limit.value,
        skip: (page.value - 1) * limit.value,
        order: order.value,
      }

      if (searchQuery.value) {
        endpoint = `${apiUrl}/products/search`
      }

      if (selectedCategory.value) {
        endpoint = `${apiUrl}/products/category/${selectedCategory.value}`
      }

      const response = await $fetch<IProductResponse>(endpoint, {params})

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
      const response = await $fetch<ICategory[]>(`${apiUrl}/products/categories`)

      if (response) {
        categories.value = response
      }
    } catch (e) {
      error.value = e
    } finally {
      pending.value = false
    }
  }

  const fetchProductsByCategory = async (slug: string) => {
    selectedCategory.value = slug
    page.value = 1  // Reset to first page when category changes
    await fetchProducts()
  }

  const fetchProduct = async (id: string) => {
    try {
      pending.value = true

      const response = await $fetch<IProduct>(`${apiUrl}/products/${id}`)

      if (response) {
        product.value = response
      }
    } catch (e) {
      error.value = e
    } finally {
      pending.value = false
    }
  }

  const nextPage = async () => {
    page.value++;
  };

  const prevPage = async () => {
    if (page.value > 1) {
      page.value--;
    }
  };

  const setPage = (currentPage: number) => {
    page.value = currentPage
  }

  const resetFilters = () => {
    selectedCategory.value = ''
    selectedSort.value = ''
    order.value = ''
  }

  watch([searchQuery, selectedCategory, selectedSort, order, page], fetchProducts)

  // Getters

  return {
    searchQuery,
    selectedSort,
    selectedCategory,
    order,
    products,
    product,
    categories,
    pending,
    error,
    limit,
    totalPages,
    page,
    fetchProducts,
    fetchCategories,
    fetchProductsByCategory,
    fetchProduct,
    nextPage,
    prevPage,
    setPage,
    resetFilters,
  }
})

