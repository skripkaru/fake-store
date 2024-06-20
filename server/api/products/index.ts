export default defineEventHandler(async (event) => {
  const res = await fetch('https://dummyjson.com/products')
  const {products} = await res.json()
  return products
})