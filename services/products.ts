import type {Product} from "~/interfaces/product";
import type {ApiError} from "~/interfaces/error";
import {handleError} from "~/utils/handle-error";

export const useProductsService = () => {
  const runtimeConfig = useRuntimeConfig()
  const apiUrl = runtimeConfig.public.apiBase

  const getProducts = async (params: { limit: number; sort: string }): Promise<Product[]> => {
    try {
      return await $fetch<Product[]>(`${apiUrl}/products`, {params}) || []
    } catch (error: unknown) {
      handleError(error as ApiError)
      return []
    }
  }

  const getProductById = async (id: string): Promise<Product | null> => {
    try {
      return await $fetch<Product>(`${apiUrl}/products/${id}`) || null
    } catch (error) {
      handleError(error as ApiError)
      return null
    }
  }

  const getCategories = async (): Promise<string[]> => {
    try {
      return await $fetch<string[]>(`${apiUrl}/products/categories`) || []
    } catch (error) {
      handleError(error as ApiError)
      return []
    }
  }

  const getProductByCategory = async (category: string, params: {
    limit: number;
    sort: string
  }): Promise<Product[]> => {
    try {
      return await $fetch<Product[]>(`${apiUrl}/products/category/${category}`, {params}) || []
    } catch (error) {
      handleError(error as ApiError)
      return []
    }
  }

  return {
    getProducts,
    getProductById,
    getCategories,
    getProductByCategory,
  }
}
