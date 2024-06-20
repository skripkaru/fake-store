import { defineStore } from 'pinia'
import type {IProduct} from "~/types";

export const useCartStore = defineStore('cart', () => {
  const items = ref<IProduct[]>([])

  const addItem = (product: IProduct) => {
    console.log('Added to cart:', product)
    const existingItem = items.value.find(item => item.id === product.id)
    if (existingItem) {
      existingItem.quantity!++
    } else {
      items.value.push({ ...product, quantity: 1 })
    }
  }

  const removeItem = (productId: number) => {
    console.log('Removed from cart:', productId)
    items.value = items.value.filter(item => item.id !== productId)
  }

  const clearCart = () => {
    items.value = []
  }

  const itemCount = computed(() => items.value.reduce((acc, item) => acc + item.quantity!, 0))
  const totalPrice = computed(() => items.value.reduce((acc, item) => acc + item.price * item.quantity!, 0))

  return {
    items,
    itemCount,
    totalPrice,
    addItem,
    removeItem,
    clearCart,
  }
})
