import type {Product} from "~/interfaces/product";

export const useApi = () => {
  const runtimeConfig = useRuntimeConfig()
  const apiUrl = runtimeConfig.public.apiBase

  const getProducts = async (params: { limit: number; sort: string }) => {
    return await $fetch<Product[]>(`${apiUrl}/products`, { params })
  }

  const getProductById = async (id: string) => {
    return await $fetch<Product>(`${apiUrl}/products/${id}`)
  }

  const getCategories = async () => {
    return await $fetch<string[]>(`${apiUrl}/products/categories`)
  }

  const getProductByCategory = async (category: string, params: { limit: number; sort: string }) => {
    return await $fetch<Product[]>(`${apiUrl}/products/category/${category}`, { params })
  }

  return {
    getProducts,
    getProductById,
    getCategories,
    getProductByCategory,
  }
}
