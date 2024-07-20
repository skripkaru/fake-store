import {defineStore} from 'pinia'
import type {Product} from "~/interfaces/product";
import {useProductsService} from "~/services/products";

export const useProductsStore = defineStore('product', () => {
  const {getProducts, getProductById, getCategories, getProductByCategory} = useProductsService()

  const products = ref<Product[]>([])
  const product = ref<Product | null>(null)
  const categories = ref<string[]>([])
  const category = ref<string>('')
  const limit = ref<number>(12)
  const sort = ref<string>('')
  const pending = ref<boolean>(true)
  const error = ref<any>(null)

  const fetchProducts = async () => {
    try {
      products.value = await getProducts({
        limit: limit.value,
        sort: sort.value
      })
    } catch (e) {
      error.value = e
    } finally {
      pending.value = false
    }
  }

  const fetchProduct = async (id: string) => {
    try {
      product.value = await getProductById(id)
    } catch (e) {
      error.value = e
    } finally {
      pending.value = false
    }
  }

  const fetchCategories = async () => {
    try {
      categories.value = await getCategories()
    } catch (e) {
      error.value = e
    } finally {
      pending.value = false
    }
  }

  const fetchProductsByCategory = async (selectedCategory: string) => {
    try {
      category.value = selectedCategory
      products.value = await getProductByCategory(selectedCategory, {
        limit: limit.value,
        sort: sort.value
      })
    } catch (e) {
      error.value = e
    } finally {
      pending.value = false
    }
  }

  const changeSort = async () => {
    sort.value = sort.value === 'desc' ? 'asc' : 'desc'
  }

  watchEffect(async () => {
    if (category.value) {
      await fetchProductsByCategory(category.value);
    } else {
      await fetchProducts();
    }
  });

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
    changeSort,
  }
})

