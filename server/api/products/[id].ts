import axios from "axios";
import {IProduct} from "~/types";

export default defineEventHandler(async (event): Promise<IProduct> => {
  const { id } = event.context.params as { id: string }

  let url = `${process.env.API_BASE_URL}/products/${id}`

  try {
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    console.error("Error fetching product:", error);
    throw new Error("Failed to fetch product");
  }
})