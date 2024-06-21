export default defineEventHandler(async (event) => {
  const { search } = getQuery(event);

  if (!search) {
    return [];
  }

  const res = await fetch(`https://dummyjson.com/products/search?q=${search}`)
  const {products} = await res.json()
  return products
})