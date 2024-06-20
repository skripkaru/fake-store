export default defineEventHandler(async (event) => {
  const { id } = event.context.params as { id: string }
  const res = await fetch(`https://dummyjson.com/products/${id}`)
  const product = await res.json()
  return product
})