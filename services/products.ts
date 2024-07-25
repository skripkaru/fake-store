import type {ProductResponse, Product, Category} from "~/interfaces/product";
import type {ApiError} from "~/interfaces/error";
import {handleError} from "~/utils/handle-error";

export const useProductsService = () => {
  const runtimeConfig = useRuntimeConfig()
  const apiUrl = runtimeConfig.public.apiBase

  const getProducts = async (params: {
    limit: number;
    skip: number,
    sortBy: string,
    order: string
  }): Promise<ProductResponse> => {
    try {
      return await $fetch<ProductResponse>(`${apiUrl}/products`, {
        params
      })
    } catch (error: unknown) {
      handleError(error as ApiError)
      throw error;
    }
  }

  const getProductById = async (id: string): Promise<Product> => {
    try {
      return await $fetch<Product>(`${apiUrl}/products/${id}`)
    } catch (error) {
      handleError(error as ApiError)
      throw error;
    }
  }

  const getCategories = async (): Promise<Category[]> => {
    try {
      return await $fetch<Category[]>(`${apiUrl}/products/categories`)
    } catch (error) {
      handleError(error as ApiError)
      throw error;
    }
  }

  const getProductsByCategory = async (category: string, params: {
    limit: number;
    skip: number,
    sortBy: string,
    order: string
  }): Promise<ProductResponse> => {
    try {
      return await $fetch<ProductResponse>(`${apiUrl}/products/category/${category}`, {params})
    } catch (error) {
      handleError(error as ApiError)
      throw error;
    }
  }

  const searchProducts = async (params: {
    limit: number;
    skip: number,
    sortBy: string,
    order: string
    q: string
  }): Promise<ProductResponse> => {
    try {
      return await $fetch<ProductResponse>(`${apiUrl}/products/search`, {params})
    } catch (error) {
      handleError(error as ApiError)
      throw error;
    }
  }

  return {
    getProducts,
    getProductById,
    getCategories,
    getProductsByCategory,
    searchProducts
  }
}
