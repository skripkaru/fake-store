import {defineStore} from 'pinia'
import type {Category, Product} from "~/interfaces/product";
import {useProductsService} from "~/services/products";

export const useProductsStore = defineStore('product', () => {
  const {getProducts, getProductById, getCategories, getProductsByCategory} = useProductsService()

  const products = ref<Product[]>([])
  const product = ref<Product | null>(null)
  const categories = ref<Category[]>([])
  const category = ref<string>('')
  const page = ref<number>(1)
  const limit = ref<number>(10)
  const total = ref<number>(0)
  const sortBy = ref<string>('')
  const order = ref<string>('')
  const pending = ref<boolean>(false)
  const error = ref<any>(null)

  const skip = computed(() => (page.value - 1) * limit.value)

  const setPending = (value: boolean) => {
    pending.value = value;
  }

  const setCategory = (newCategory: string) => {
    category.value = newCategory
    page.value = 1
  }

  const setPage = (newPage: number) => {
    page.value = newPage
  }

  const fetchProducts = async () => {
    setPending(true)
    try {
      const params = {
        limit: limit.value,
        skip: skip.value,
        sortBy: sortBy.value,
        order: order.value
      }
      const response = category.value
        ? await getProductsByCategory(category.value, params)
        : await getProducts(params)

      products.value = response.products
      total.value = response.total
    } catch (e) {
      error.value = e
    } finally {
      setPending(false)
    }
  }

  const fetchProduct = async (id: string) => {
    setPending(true)
    try {
      const response = await getProductById(id)

      product.value = response
    } catch (e) {
      error.value = e
    } finally {
      setPending(false)
    }
  }

  const fetchCategories = async () => {
    setPending(true)
    try {
      const response = await getCategories()

      categories.value = response
    } catch (e) {
      error.value = e
    } finally {
      setPending(false)
    }
  }

  const sortProducts = (newSortBy: string, newOrder: string) => {
    sortBy.value = newSortBy
    order.value = newOrder
    page.value = 1
  }

  watch([page, category, sortBy, order], fetchProducts, {immediate: true})

  return {
    products,
    product,
    categories,
    category,
    sortBy,
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
    setCategory,
    setPage
  }
})

