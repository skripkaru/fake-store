import {defineStore} from 'pinia'
import type {Product} from "~/interfaces/product";

export const useProductStore = defineStore('product', () => {
  const runtimeConfig = useRuntimeConfig()
  const apiUrl = runtimeConfig.public.apiBase

  // State
  const products = ref<Product[]>([])
  const product = ref<Product>()
  const pending = ref<boolean>(true)
  const error = ref<any>(null)
  const limit = ref<number>(9)

  // Actions
  const fetchProducts = async () => {
    try {
      const response = await $fetch<Product[]>(`${apiUrl}/products`)

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

  // Getters

  return {
    products,
    product,
    pending,
    error,
    limit,
    fetchProducts,
    fetchProduct
  }
})

