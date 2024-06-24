import axios from "axios";
import {IProductResponse} from "~/types";

export default defineEventHandler(async (event): Promise<IProductResponse> => {
  const query = getQuery(event);

  const searchQuery = query.q ? `q=${query.q}` : '';
  const sortQuery = query.sortBy ? `&sortBy=${query.sortBy}` : '';
  const orderQuery = query.order ? `&order=${query.order}` : '';
  const limitQuery = query.limit ? `&limit=${query.limit}` : '';
  const skipQuery = query.skip ? `&skip=${query.skip}` : '';

  let url = `https://dummyjson.com/products`;

  if (searchQuery) {
    url += `/search?${searchQuery}${sortQuery}${orderQuery}${limitQuery}${skipQuery}`;
  } else {
    url += `?${sortQuery}${orderQuery}${limitQuery}${skipQuery}`;
  }

  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
});
