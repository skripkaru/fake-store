import {defineStore} from 'pinia'
import type {Product} from "~/interfaces/product";

export const useProductStore = defineStore('product', () => {
  const runtimeConfig = useRuntimeConfig()
  const apiUrl = runtimeConfig.public.apiBase

  // State
  const products = ref<Product[]>([])
  const product = ref<Product>()
  const categories = ref<string[]>([])
  const category = ref<string>('')
  const limit = ref<number>(8)
  const sort = ref<string>('')
  const pending = ref<boolean>(true)
  const error = ref<any>(null)

  // Actions
  const fetchProducts = async () => {
    try {
      const response = await $fetch<Product[]>(`${apiUrl}/products`, {
        params: {
          limit: limit.value,
          sort: sort.value
        }
      })

      if (response) {
        products.value = response
      }
    } catch (e) {
      error.value = e
    } finally {
      pending.value = false
    }
  }

  const fetchProduct = async (id: string) => {
    try {
      const response = await $fetch<Product>(`${apiUrl}/products/${id}`)

      if (response) {
        product.value = response
      }
    } catch (e) {
      error.value = e
    } finally {
      pending.value = false
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await $fetch<string[]>(`${apiUrl}/products/categories`)

      if (response) {
        categories.value = response
      }
    } catch (e) {
      error.value = e
    } finally {
      pending.value = false
    }
  }

  const fetchProductsByCategory = async (category: string) => {
    try {
      const response = await $fetch<Product[]>(`${apiUrl}/products/category/${category}`, {
        params: {
          limit: limit.value,
          sort: sort.value
        }
      })

      if (response) {
        products.value = response
      }
    } catch (e) {
      error.value = e
    } finally {
      pending.value = false
    }
  }

  const changeSort = () => {
    sort.value = sort.value === 'desc' ? 'asc' : 'desc'
  }

  watch([limit, sort], fetchProducts)

  // Getters

  return {
    products,
    product,
    categories,
    category,
    limit,
    sort,
    pending,
    error,
    fetchProducts,
    fetchProduct,
    fetchCategories,
    fetchProductsByCategory,
    changeSort
  }
})

