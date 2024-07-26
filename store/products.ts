import {defineStore} from 'pinia'
import type {Product} from "~/interfaces/product";
import {useProductsService} from "~/services/products";
import {useDebounce} from '@vueuse/core'

export const useProductsStore = defineStore('product', () => {
  const {getProducts, getProductById} = useProductsService()

  const pending = ref<boolean>(false)
  const error = ref<any>(null)
  const products = ref<Product[]>([])
  const product = ref<Product | null>(null)
  const page = ref<number>(1)
  const limit = ref<number>(10)
  const order = ref<string>('')
  const searchQuery = ref('')
  const debouncedSearchQuery = useDebounce(searchQuery, 300)
  const priceRange = ref<[number, number]>([0, 50000])
  const categories = ref<string[]>([])
  const selectedCategories = ref<string[]>([])
  const brands = ref<string[]>([])
  const selectedBrands = ref<string[]>([])

  const fetchProducts = async () => {
    pending.value = true
    error.value = null
    try {
      const response = await getProducts()
      products.value = response.products
      extractCategories()
      extractBrands()
    } catch (e) {
      error.value = e
    } finally {
      pending.value = false
    }
  }

  const fetchProduct = async (id: string) => {
    pending.value = true
    error.value = null
    try {
      product.value = await getProductById(id)
    } catch (e) {
      error.value = e
    } finally {
      pending.value = false
    }
  }

  const extractBrands = () => {
    const brandNames = products.value
      .map(product => product.brand)
      .filter(brand => brand !== undefined && brand !== null)
      .sort()
    brands.value = Array.from(new Set(brandNames))
  }

  const extractCategories = () => {
    const categoryNames = products.value
      .map(product => product.category)
      .filter(category => category !== undefined && category !== null)
      .sort()

    categories.value = Array.from(new Set(categoryNames))
  }

  const changePage = (newPage: number) => {
    page.value = newPage
  }

  const searchedProducts = computed(() => {
    const query = debouncedSearchQuery.value.toLowerCase()

    return products.value.filter(product => product.title.toLowerCase().includes(query))
  })

  const filteredProducts = computed(() => {
    let filtered = [...searchedProducts.value]

    if (selectedBrands.value.length) {
      filtered = filtered.filter(product => selectedBrands.value.includes(product.brand))
    }

    if (selectedCategories.value.length) {
      filtered = filtered.filter(product => selectedCategories.value.includes(product.category.toLowerCase()))
    }

    if (priceRange.value) {
      const [minPrice, maxPrice] = priceRange.value
      filtered = filtered.filter(product => product.price >= minPrice && product.price <= maxPrice)
    }

    return filtered
  })

  const sortedProducts = computed(() => {
    let sortedFiltered = [...filteredProducts.value]

    if (order.value === 'asc') {
      sortedFiltered.sort((a, b) => a.price - b.price)
    } else if (order.value === 'desc') {
      sortedFiltered.sort((a, b) => b.price - a.price)
    }

    return sortedFiltered
  })

  const paginatedProducts = computed(() => {
    const start = (page.value - 1) * limit.value
    const end = start + limit.value
    return sortedProducts.value.slice(start, end)
  })

  return {
    product,
    products,
    sortedProducts,
    paginatedProducts,
    page,
    limit,
    order,
    searchQuery,
    debouncedSearchQuery,
    priceRange,
    brands,
    selectedBrands,
    categories,
    selectedCategories,
    pending,
    error,
    fetchProducts,
    fetchProduct,
    changePage
  }
})

