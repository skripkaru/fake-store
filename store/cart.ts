import {defineStore} from 'pinia'
import type {Product} from '~/interfaces/product'

export const useCartStore = defineStore('cart', () => {
  // State
  const cartItems = ref<Product[]>([])

  // Actions
  const findProductById = (productId: number) => {
    return cartItems.value.find(item => item.id === productId)
  }

  const addProductToCart = (product: Product) => {
    const existingItem = findProductById(product.id)
    if (existingItem) {
      existingItem.quantity!++
    } else {
      cartItems.value.push({...product, quantity: 1})
    }
  }

  const removeProductFromCart = (productId: number) => {
    cartItems.value = cartItems.value.filter(item => item.id !== productId)
  }

  const clearCart = () => {
    cartItems.value = []
  }

  const incrementQuantity = (productId: number) => {
    const existingItem = findProductById(productId)
    if (existingItem) {
      existingItem.quantity!++
    }
  }

  const decrementQuantity = (productId: number) => {
    const existingItem = findProductById(productId)
    if (existingItem && existingItem.quantity! > 1) {
      existingItem.quantity!--
    } else if (existingItem && existingItem.quantity! === 1) {
      removeProductFromCart(productId)
    }
  }

  // Getters
  const totalItems = computed(() => cartItems.value.reduce((acc, item) => acc + item.quantity!, 0))
  const totalPrice = computed(() => cartItems.value.reduce((acc, item) => acc + item.price * item.quantity!, 0))

  return {
    cartItems,
    totalItems,
    totalPrice,
    findProductById,
    addProductToCart,
    removeProductFromCart,
    clearCart,
    incrementQuantity,
    decrementQuantity,
  }
}, {
  persist: true,
})