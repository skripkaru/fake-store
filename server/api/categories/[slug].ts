import axios from "axios";
import {IProductResponse} from "~/types";

export default defineEventHandler(async (event): Promise<IProductResponse> => {
  const { slug } = event.context.params as { slug: string }

  let url = `${process.env.API_BASE_URL}/products/category/${slug}`

  try {
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    console.error("Error fetching products by category:", error);
    throw new Error("Failed to fetch products by category");
  }
})