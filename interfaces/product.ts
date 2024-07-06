export interface Product {
  id: number
  title: string
  price: number
  category: string
  description: string
  image: string
  rating: ProductRating
  quantity?: number
}

interface ProductRating {
  rate: number
  count: number
}