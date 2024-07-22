export interface ProductResponse {
  limit: number
  products: Product[]
  skip: number
  total: number
}

export interface Product {
  id: number
  title: string
  description: string,
  category: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  tags: string[]
  brand: string
  sku: string
  weight: number
  dimensions: {
    width: number
    height: number
    depth: number
  },
  warrantyInformation: string
  shippingInformation: string
  availabilityStatus: string
  reviews: [
    {
      rating: number
      comment: string
      date: string
      reviewerName: string
      reviewerEmail: string
    }
  ],
  returnPolicy: string
  minimumOrderQuantity: number
  meta: {
    createdAt: string
    updatedAt: string
    barcode: string
    qrCode: string
  },
  thumbnail: string
  images: string[]
  quantity?: number
}

export interface Category {
  slug: string
  name: string
  url: string
}