import axios from "axios";
import {ICategory} from "~/types";

export default defineEventHandler(async (event): Promise<ICategory[]> => {
  let url = `${process.env.API_BASE_URL}/products/categories`

  try {
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Failed to fetch categories");
  }
})